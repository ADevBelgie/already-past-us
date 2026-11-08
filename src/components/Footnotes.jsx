import { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { TAGS } from '../lib/manuscript.js'
import { revealId } from '../lib/reveal.js'
import { Md } from './Md.jsx'

export const FootnoteContext = createContext({ footnotes: {} })

const tagKey = tag => TAGS[tag]?.key ?? 'none'
const EDGE = 16
const SHEET_MAX = 640 // at or below this width the popover is a bottom sheet (CSS)
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'

const isShown = el => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden'

/** The first focusable element after `from` in document order, ignoring anything inside `skip`. */
function nextFocusable(from, skip) {
  const all = document.querySelectorAll(FOCUSABLE)
  for (const el of all) {
    if (from.contains(el) || skip?.contains(el)) continue
    if (!(from.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)) continue
    if (isShown(el)) return el
  }
  return null
}

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
  const closeBtn = useRef(null)
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

  // Opening (by click or keyboard) moves focus into the popover, to its close button.
  useEffect(() => { if (open) closeBtn.current?.focus({ preventScroll: true }) }, [open])

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

  // The popover is portalled to <body>, so the natural tab order would jump to the end of the page.
  // Tabbing out of it closes it and continues from the chip instead.
  const onPopKey = e => {
    if (e.key !== 'Tab' || !pop.current) return
    const items = [...pop.current.querySelectorAll(FOCUSABLE)].filter(isShown)
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      close(true)
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      const target = nextFocusable(btn.current, pop.current)
      setOpen(false)
      if (target) target.focus()
      else btn.current?.focus()
    }
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
          aria-modal="false"
          aria-label={`Source ${fn.n}`}
          onKeyDown={onPopKey}
          /* Before the first measurement it sits off-screen (not visibility: hidden, which would block focus). */
          style={pos ? { left: pos.left, top: pos.top } : window.innerWidth <= SHEET_MAX ? undefined : { left: -9999, top: 0 }}
        >
          <span className="fn-pop__head">
            <span className={`tag-chip tag-chip--${key}`}>{fn.tag}</span>
            <span className="fn-pop__blurb">{TAGS[fn.tag]?.blurb}</span>
            <button ref={closeBtn} type="button" className="fn-pop__close" aria-label="Close source" onClick={() => close(true)}>
              <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </span>
          <span className="fn-pop__body"><Md tree={fn.tree} inline /></span>
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
              {fn.claim && <span className="notes__claim">“{fn.claim}”</span>}
              <span className={`tag-chip tag-chip--${tagKey(fn.tag)}`}>{fn.tag}</span>{' '}
              <Md tree={fn.tree} inline />
            </li>
          )
        })}
      </ol>
    </details>
  )
}
