// s4-jagged-map: where AI stands against people, one row per domain, on the five steps of the
// section 4 headings. Dot colour = provenance tag of the row's main footnote; a hollow dashed dot
// marks a company claim that has not been officially confirmed (IMO 2026), and a diamond marks a
// row where AI was compared with another computer model rather than with people. Each row also says
// who AI was compared with, because several right-hand dots are not comparisons with the best humans.
// Data: src/data/jagged_map.json, built and checked against the manuscript by
// scripts/data/build_jagged_map.mjs.
import { useContext, useEffect, useRef, useState } from 'react'
import { Figure, C, PROVENANCE, LegendItem, TagChip, svgSize } from './kit.jsx'
import { FootnoteContext, FootnoteRef } from '../components/Footnotes.jsx'
import data from '../data/jagged_map.json'
import './JaggedMap.css'

const ROWS = data.rows
const TIERS = data.meta.tiers
/** Compared with another computer model, not people. */
const vsMachine = r => r.vs_machine === true
const LEVEL = 2 // "Level with the best"
const NOTE_IDS = [...new Set(ROWS.flatMap(r => r.footnote_ids))]
const LINE = 14 // px between text lines

/** Greedy word wrap by an approximate character budget. */
function wrap(text, maxChars) {
  const words = String(text).split(/\s+/)
  const lines = []
  let line = ''
  for (const w of words) {
    if (line && (line + ' ' + w).length > maxChars) {
      lines.push(line)
      line = w
    } else {
      line = line ? line + ' ' + w : w
    }
  }
  if (line) lines.push(line)
  return lines
}

/** "average drivers (people in general)", dropping the group when it would just repeat the label. */
const groupNote = r => {
  const g = r.compared_group_label.toLowerCase()
  return g.includes(r.compared_with.toLowerCase()) ? '' : ` (${g})`
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

/** Wide SVG layout (rendered at every width; CSS hides it below 600px, see JaggedMap.css). */
function layout(width) {
  const labelW = Math.round(clamp(width * 0.25, 150, 220))
  const cmpW = Math.round(clamp(width * 0.17, 110, 150))
  const x0 = labelW + 12
  const x1 = width - cmpW - 12
  const colW = (x1 - x0) / TIERS.length
  const cx = i => x0 + colW * (i + 0.5)
  const tierLines = TIERS.map(t => wrap(t.label, Math.max(7, Math.floor((colW - 6) / 5.6))))
  const headH = Math.max(...tierLines.map(l => l.length)) * LINE + 12
  let y = headH
  const rows = ROWS.map(r => {
    const domain = wrap(r.domain, Math.floor(labelW / 6.6))
    const vs = wrap(r.compared_with, Math.floor(cmpW / 6.1))
    const h = Math.max(34, Math.max(domain.length, vs.length) * LINE + 14)
    const row = { r, top: y, h, mid: y + h / 2, dotX: cx(r.tier), domain, vs }
    y += h
    return row
  })
  return { width, x0, x1, colW, cx, headH, tierLines, cmpX: x1 + 12, rows, height: y + 6 }
}

// Narrow layout (container width < 600px) is HTML rows laid out by CSS, so its height comes from
// native text wrapping and is the same in the server HTML and after hydration. Its columns mirror
// .jm-n__row in JaggedMap.css: text column max(150px, 52%), 10px gap, track, 6px right margin.
// Tier positions on the track are percentages; JS only needs the dot's x to anchor the card.
const NARROW = 600
const tierPct = i => `${((i + 0.5) / TIERS.length) * 100}%`
function narrowDotX(width, tier) {
  const x0 = Math.max(150, width * 0.52) + 10
  const x1 = width - 6
  return x0 + ((x1 - x0) / TIERS.length) * (tier + 0.5)
}

/** Diamond path centred on (0, 0) with the same area as a circle of radius `size`. */
const diamond = size => {
  const s = +(size * 1.25).toFixed(2)
  return `M0,${-s}L${s},0L0,${s}L${-s},0Z`
}

function Dot({ r, x, y, size = 6.5 }) {
  const color = PROVENANCE[r.provenance]?.color ?? C.ink3
  const style = r.confirmed
    ? { fill: color, stroke: C.paper, strokeWidth: 1.5 }
    : { fill: C.paper, stroke: color, strokeWidth: 1.8, strokeDasharray: '2.6 2' }
  if (!vsMachine(r)) return <circle cx={x} cy={y} r={size} {...style} />
  const shape = <path d={diamond(size)} strokeLinejoin="round" {...style} />
  // The narrow layout positions marks with percentages, which a transform cannot take: a nested,
  // non-clipping <svg> moves the origin there instead.
  if (typeof x === 'string') return <svg x={x} y={y} overflow="visible">{shape}</svg>
  return <g transform={`translate(${x},${y})`}>{shape}</g>
}

function TextLines({ lines, x, y, size, fill, weight, anchor = 'start' }) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} fontWeight={weight} textAnchor={anchor}>
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : LINE}>{l}</tspan>
      ))}
    </text>
  )
}

function summary() {
  const byTier = TIERS.map(t => ROWS.filter(r => r.tier === t.key))
  const parts = byTier.map((rows, i) => {
    if (!rows.length) return null
    const names = rows.map(r => {
      const notes = [!r.confirmed && 'if confirmed', vsMachine(r) && 'compared with a computer model'].filter(Boolean)
      return notes.length ? `${r.domain} (${notes.join(', ')})` : r.domain
    }).join(', ')
    return `${TIERS[i].label.toLowerCase()}: ${names}`
  }).filter(Boolean)
  return `Dot plot placing ${ROWS.length} tests of AI on five steps, from far below humans to beyond the best humans; ${parts.join('; ')}.`
}

function rowLabel(r) {
  return `${r.domain}: ${r.tier_label}. Compared with ${r.compared_with}. ${PROVENANCE[r.provenance]?.label ?? ''}${r.confirmed ? '' : ', not officially confirmed'}${r.baseline_provenance && r.baseline_provenance !== r.provenance ? `; human baseline ${PROVENANCE[r.baseline_provenance]?.label ?? ''}` : ''}. ${r.date_label}.`
}

function Chart({ width }) {
  const L = layout(width)
  // Which layout is on screen. CSS decides that (container query on .figure__body); JS mirrors it
  // only to anchor the details card and return focus, which happen after hydration, when width is
  // the measured container width. The first render never shows a card, so SSR output is unaffected.
  const narrow = width < NARROW
  const [active, setActive] = useState(null)
  const [pinned, setPinned] = useState(false)
  const [focusCard, setFocusCard] = useState(false)
  const rowRefs = useRef({}) // `w:${id}` wide SVG row, `n:${id}` narrow HTML row
  const cardRef = useRef(null)
  const closeRef = useRef(null)

  const close = (returnFocus = false) => {
    const id = active
    setPinned(false)
    setActive(null)
    if (returnFocus && id) rowRefs.current[`${narrow ? 'n' : 'w'}:${id}`]?.focus()
  }

  useEffect(() => {
    if (pinned || active == null) return
    const onKey = e => { if (e.key === 'Escape') setActive(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  useEffect(() => {
    if (!pinned) return
    const onDoc = e => {
      if (cardRef.current?.contains(e.target)) return
      // A footnote popover opened from the card is portalled to <body>; pressing inside it (its
      // "Show in this section's sources" link, say) must not close the card under it (as kit.jsx).
      if (e.target.closest?.('.jm-row, .fn-pop')) return
      setPinned(false)
      setActive(null)
    }
    const onKey = e => {
      if (e.key !== 'Escape') return
      // Let an open footnote popover inside the card close first. This listener runs in the capture
      // phase, so it always sees the popover before the popover's own (bubble-phase) Escape handler
      // closes it, whatever order the two were registered in.
      if (cardRef.current?.querySelector('.fn[aria-expanded="true"]')) return
      if (document.activeElement?.closest?.('.fn-pop')) return
      close(true)
    }
    document.addEventListener('pointerdown', onDoc)
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('pointerdown', onDoc)
      document.removeEventListener('keydown', onKey, true)
    }
  })

  useEffect(() => {
    if (pinned && focusCard) {
      closeRef.current?.focus()
      setFocusCard(false)
    }
  }, [pinned, focusCard])

  const toggle = (id, byKey) => {
    if (pinned && active === id) {
      close(byKey)
      return
    }
    setActive(id)
    setPinned(true)
    if (byKey) setFocusCard(true)
  }

  /** The same handlers on both layouts' rows; `prefix` is 'w' (wide SVG) or 'n' (narrow HTML). */
  const rowProps = (r, prefix) => ({
    className: prefix === 'n' ? `jm-row jm-nrow${active === r.id ? ' is-active' : ''}` : 'jm-row',
    role: 'button',
    tabIndex: 0,
    'aria-label': rowLabel(r),
    'aria-expanded': pinned && active === r.id,
    ref: el => { rowRefs.current[`${prefix}:${r.id}`] = el },
    onMouseEnter: () => { if (!pinned) setActive(r.id) },
    onFocus: () => { if (!pinned) setActive(r.id) },
    onBlur: e => { if (!pinned && !e.currentTarget.contains(e.relatedTarget)) setActive(null) },
    onClick: () => toggle(r.id, false),
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggle(r.id, true)
      }
    },
  })

  const cur = active == null ? null : L.rows.find(row => row.r.id === active)
  // Wide: positioned in the SVG's pixel coordinates (relative to .jm). Narrow: positioned relative
  // to the active row's wrapper (.jm-n__item), so it follows the natively wrapped row height.
  let cardStyle = null
  if (cur && !narrow) {
    if (cur.dotX > width / 2) cardStyle = { right: width - cur.dotX + 16, top: Math.max(0, cur.top - 4) }
    else cardStyle = { left: cur.dotX + 16, top: Math.max(0, cur.top - 4) }
  } else if (cur) {
    const dotX = narrowDotX(width, cur.r.tier)
    if (width < 520) cardStyle = { left: 0, right: 0, width: 'auto', maxWidth: 'none', top: 'calc(100% + 2px)' }
    else if (dotX > width / 2) cardStyle = { right: width - dotX + 16, top: -4 }
    else cardStyle = { left: dotX + 16, top: -4 }
  }

  const card = cur && (
    <div
      ref={cardRef}
      className={`chart-tooltip jm-tip${pinned ? ' jm-tip--pinned' : ''}`}
      style={cardStyle}
      role={pinned ? 'dialog' : undefined}
      aria-label={pinned ? `Details: ${cur.r.domain}` : undefined}
      aria-live={pinned ? undefined : 'polite'}
    >
      <div className="jm-tip__head">
        <strong>{cur.r.domain}</strong>
        {pinned && (
          <button ref={closeRef} type="button" className="jm-tip__close" aria-label="Close details" onClick={() => close(true)}>
            ×
          </button>
        )}
      </div>
      <p className="jm-tip__tier">
        <span className={cur.r.tier === LEVEL ? 'jm-tip__level' : undefined}>{cur.r.tier_label}</span>
        {' · vs '}{cur.r.compared_with}
        <span className="jm-tip__group">{groupNote(cur.r)}</span>
      </p>
      <p className="jm-tip__text">{cur.r.comparison_text}</p>
      <p className="jm-tip__meta">
        <TagChip tag={cur.r.provenance} />
        {!cur.r.confirmed && <span className="jm-tip__unconfirmed">not officially confirmed</span>}
        {cur.r.baseline_provenance && cur.r.baseline_provenance !== cur.r.provenance && (
          <span className="jm-tip__baseline">human baseline <TagChip tag={cur.r.baseline_provenance} /></span>
        )}
        <span>{cur.r.date_label}</span>
        <span className="jm-tip__sources">
          {cur.r.footnote_ids.map(id => <FootnoteRef key={id} id={id} />)}
        </span>
      </p>
      {!pinned && <p className="jm-tip__hint">Click or press Enter to keep this open and read the sources.</p>}
    </div>
  )

  return (
    <div className="jm" onMouseLeave={() => { if (!pinned) setActive(null) }}>
      {/* Wide layout: hidden by CSS when the figure is narrower than 600px (JaggedMap.css). */}
      <svg className="jm-wide" {...svgSize(width, L.height)} role="group" aria-label={summary()}>
        {/* Header */}
        <g aria-hidden="true">
          {TIERS.map((t, i) => {
            const lines = L.tierLines[i]
            const y = L.headH - 10 - (lines.length - 1) * LINE
            return (
              <TextLines
                key={t.key}
                lines={lines}
                x={L.cx(i)}
                y={y}
                size={11}
                fill={i === LEVEL ? C.accent : C.ink2}
                weight={i === LEVEL ? 600 : 400}
                anchor="middle"
              />
            )
          })}
          <text x={L.cmpX} y={L.headH - 10} fontSize={11} fill={C.ink3}>Compared with</text>
        </g>
        <line x1={0} x2={width} y1={L.headH - 0.5} y2={L.headH - 0.5} stroke={C.rule} aria-hidden="true" />

        {/* "Level with the best" reference: header stub here, one segment per row below */}
        <line
          x1={L.cx(LEVEL)} x2={L.cx(LEVEL)} y1={L.headH - 4} y2={L.headH}
          stroke={C.accent} strokeWidth={1} aria-hidden="true"
        />

        {/* Rows */}
        {L.rows.map(row => {
          const { r } = row
          const isActive = active === r.id
          return (
            <g key={r.id} {...rowProps(r, 'w')}>
              <rect
                className="jm-row__band"
                x={0} y={row.top + 1} width={width} height={row.h - 2} rx={4}
                fill={isActive ? C.grid : 'transparent'}
              />
              <TextLines
                lines={row.domain}
                x={2} y={row.mid + 4 - ((row.domain.length - 1) * LINE) / 2}
                size={12} fill={C.ink}
              />
              <TextLines
                lines={row.vs}
                x={L.cmpX} y={row.mid + 4 - ((row.vs.length - 1) * LINE) / 2}
                size={11.5} fill={C.ink2}
              />
              <line
                x1={L.cx(LEVEL)} x2={L.cx(LEVEL)} y1={row.top} y2={row.top + row.h}
                stroke={C.accent} strokeWidth={1}
              />
              {/* Track with the five steps */}
              <line x1={L.cx(0)} x2={L.cx(TIERS.length - 1)} y1={row.mid} y2={row.mid} stroke={C.rule} strokeWidth={1} />
              {TIERS.map(t => (
                <circle key={t.key} cx={L.cx(t.key)} cy={row.mid} r={1.8} fill={C.ink3} opacity={0.5} />
              ))}
              <Dot r={r} x={row.dotX} y={row.mid} size={isActive ? 7.5 : 6.5} />
            </g>
          )
        })}
      </svg>

      {/* Narrow layout: HTML rows whose text wraps natively, so CSS alone sets the height and the
          server HTML matches the hydrated page. Shown instead of the SVG below 600px. */}
      <div className="jm-n" role="group" aria-label={summary()} style={{ '--jm-level': tierPct(LEVEL) }}>
        <div className="jm-n__head" aria-hidden="true">
          <div className="jm-n__track">
            {/* Right-aligned on the first step so it uses the empty space above the text column
                and cannot run into the right-hand label on a narrow track. */}
            <span className="jm-n__end jm-n__end--low">Far below<br />humans</span>
            <span className="jm-n__end jm-n__end--high">Beyond the<br />best humans</span>
          </div>
        </div>
        {ROWS.map(r => {
          const isActive = active === r.id
          return (
            <div key={r.id} className="jm-n__item">
              <div {...rowProps(r, 'n')}>
                <div className="jm-n__text">
                  <span className="jm-n__domain">{r.domain}</span>
                  <span className={`jm-n__tier${r.tier === LEVEL ? ' jm-n__tier--level' : ''}`}>{r.tier_label}</span>
                  <span className="jm-n__vs">{`vs ${r.compared_with}`}</span>
                </div>
                <div className="jm-n__track">
                  <svg className="jm-n__svg" width="100%" height="20" aria-hidden="true">
                    <line x1={tierPct(0)} x2={tierPct(TIERS.length - 1)} y1={10} y2={10} stroke={C.rule} strokeWidth={1} />
                    {TIERS.map(t => (
                      <circle key={t.key} cx={tierPct(t.key)} cy={10} r={1.8} fill={C.ink3} opacity={0.5} />
                    ))}
                    <Dot r={r} x={tierPct(r.tier)} y={10} size={isActive ? 7.5 : 6.5} />
                  </svg>
                </div>
              </div>
              {narrow && isActive && card}
            </div>
          )
        })}
      </div>

      {!narrow && card}
    </div>
  )
}

function DataTable() {
  return (
    <details className="chart-data">
      <summary>Show the data</summary>
      <div className="table-wrap" tabIndex={0} role="region" aria-label="Data table: AI against people, by domain">
        <table>
          <thead>
            <tr>
              <th scope="col">Domain</th>
              <th scope="col">Where AI stands</th>
              <th scope="col">Compared with</th>
              <th scope="col">AI result</th>
              <th scope="col">Human or baseline result</th>
              <th scope="col">Date</th>
              <th scope="col">Source</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(r => (
              <tr key={r.id}>
                <td className="jm-data__domain">{r.domain}</td>
                <td>{r.tier_label}</td>
                <td>{r.compared_with}{groupNote(r)}</td>
                <td>{r.ai_value}</td>
                <td>
                  {r.human_value}
                  {r.baseline_provenance && r.baseline_provenance !== r.provenance && (
                    <> <TagChip tag={r.baseline_provenance} /></>
                  )}
                </td>
                <td>{r.date_label}</td>
                <td>
                  <span className="jm-data__src">
                    <TagChip tag={r.provenance} />
                    {r.footnote_ids.map(id => <FootnoteRef key={id} id={id} />)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}

function DiamondItem({ label }) {
  return (
    <span className="legend-item">
      <svg width="18" height="12" aria-hidden="true">
        <path d="M9,0.5L14.5,6L9,11.5L3.5,6Z" fill={C.ink3} strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  )
}

function HollowDashedItem({ label }) {
  return (
    <span className="legend-item">
      <svg width="18" height="12" aria-hidden="true">
        <circle cx="9" cy="6" r="4.5" fill="none" stroke={C.vendor} strokeWidth="1.6" strokeDasharray="2.2 1.6" />
      </svg>
      {label}
    </span>
  )
}

export default function JaggedMap() {
  // Source chips in reading order (footnote number), not row order.
  const { footnotes } = useContext(FootnoteContext)
  const notes = [...NOTE_IDS].sort((a, b) => (footnotes[a]?.n ?? 1e9) - (footnotes[b]?.n ?? 1e9))
  return (
    <Figure
      id="s4-jagged-map"
      title="AI leads mostly on short tasks with an answer key, and lags on long, open-ended or physical work"
      subtitle="Twelve tests of AI, placed on five steps from far below humans to beyond the best humans. Dot colour shows who checked each result. Each row also says who or what AI was compared with."
      legend={
        <>
          <LegendItem color={C.verified} label="Verified" />
          <LegendItem color={C.vendor} label="Vendor-reported" />
          <HollowDashedItem label="Company claim, not officially confirmed" />
          <DiamondItem label="Compared with a computer model, not people" />
          <LegendItem color={C.accent} shape="line" label="Level with the best humans" />
        </>
      }
      caveat="Several right-hand dots compare AI with trained experts, average drivers or another computer model, not with the best humans. The IMO 2026 perfect scores are company reports the IMO has not confirmed. The hurricane result is known through press coverage of the National Hurricane Center's report."
      source="section 4 footnotes; the ICPC and Erdős rows come from the opening section"
      notes={notes}
    >
      {width => (
        <>
          <Chart width={width} />
          <DataTable />
        </>
      )}
    </Figure>
  )
}
