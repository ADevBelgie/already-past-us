import { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { TAGS } from '../lib/manuscript.js'
import { revealId } from '../lib/reveal.js'
import { Md } from './Md.jsx'

export const FootnoteContext = createContext({ footnotes: {} })

const tagKey = tag => TAGS[tag]?.key ?? 'none'
const EDGE = 16
const SHEET_MAX = 640 // at or below this width the popover is a bottom sheet (CSS)

/**
 * Inline footnote reference: a small numbered chip coloured by provenance tag.
 * The popover is portalled to <body> with fixed positioning so that no overflow
 * container (tables, figures) can clip it, and it is clamped inside the viewport.
 */
export function FootnoteRef({ id }) {
  const { footnotes } = useContext(FootnoteContext)
  const fn = footnotes[id]
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState(null)
  const btn = useRef(null)
  const pop = useRef(null)
  const popId = useId()

  const place = useCallback(() => {
    if (!btn.current || !pop.current) return
    if (window.innerWidth <= SHEET_MAX) { setPos(null); return }
    const r = btn.current.getBoundingClientRect()
    const w = pop.current.offsetWidth
    const h = pop.current.offsetHeight
    const left = Math.min(Math.max(EDGE, r.left + r.width / 2 - w / 2), window.innerWidth - EDGE - w)
    const below = r.bottom + 8
    const top = below + h > window.innerHeight - EDGE && r.top - 8 - h > EDGE ? r.top - 8 - h : below
    setPos({ left, top })
  }, [])

  useLayoutEffect(() => { if (open) place() }, [open, place])

  const close = useCallback((refocus = false) => {
    setOpen(false)
    if (refocus) btn.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const inside = node => btn.current?.contains(node) || pop.current?.contains(node)
    const onDoc = e => { if (!inside(e.target)) close() }
    const onKey = e => { if (e.key === 'Escape') close(inside(document.activeElement)) }
    document.addEventListener('pointerdown', onDoc)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', place, { passive: true })
    window.addEventListener('resize', place)
    return () => {
      document.removeEventListener('pointerdown', onDoc)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', place)
      window.removeEventListener('resize', place)
    }
  }, [open, place, close])

  if (!fn) return <sup className="fn fn--missing" title={`Missing source: ${id}`}>?</sup>
  const key = tagKey(fn.tag)

  // Close when keyboard focus leaves both the chip and the popover (React events bubble through portals).
  const onBlur = e => {
    const next = e.relatedTarget
    if (next && (btn.current?.contains(next) || pop.current?.contains(next))) return
    if (next) setOpen(false)
  }

  return (
    <span className="fn-wrap" onBlur={onBlur}>
      <button
        ref={btn}
        type="button"
        className={`fn fn--${key}`}
        aria-expanded={open}
        aria-controls={open ? popId : undefined}
        aria-label={`Source ${fn.n}: ${fn.tag}`}
        onClick={() => setOpen(o => !o)}
      >
        {fn.n}
      </button>
      {open && createPortal(
        <span
          ref={pop}
          className="fn-pop"
          id={popId}
          role="dialog"
          aria-label={`Source ${fn.n}`}
          style={pos ? { left: pos.left, top: pos.top } : { visibility: window.innerWidth <= SHEET_MAX ? 'visible' : 'hidden' }}
        >
          <span className="fn-pop__head">
            <span className={`tag-chip tag-chip--${key}`}>{fn.tag}</span>
            <span className="fn-pop__blurb">{TAGS[fn.tag]?.blurb}</span>
          </span>
          <span className="fn-pop__body"><Md text={fn.text} inline /></span>
          <a
            className="fn-pop__more"
            href={`#fn-${id}`}
            onClick={e => {
              e.preventDefault()
              window.history.pushState(null, '', `#fn-${id}`)
              setOpen(false)
              revealId(`fn-${id}`)
            }}
          >
            Show in this section's sources
          </a>
        </span>,
        document.body,
      )}
    </span>
  )
}

/** The collapsible list of sources at the end of each section. */
export function SectionNotes({ ids }) {
  const { footnotes } = useContext(FootnoteContext)
  if (!ids.length) return null
  return (
    <details className="notes">
      <summary>Sources for this section <span className="notes__count">({ids.length})</span></summary>
      <ol className="notes__list">
        {ids.map(id => {
          const fn = footnotes[id]
          return (
            <li key={id} id={`fn-${id}`} value={fn.n}>
              <span className={`tag-chip tag-chip--${tagKey(fn.tag)}`}>{fn.tag}</span>{' '}
              <Md text={fn.text} inline />
            </li>
          )
        })}
      </ol>
    </details>
  )
}
