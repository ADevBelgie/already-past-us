// s4-jagged-map: where AI stands against people, one row per domain, on the five steps of the
// section 4 headings. Dot colour = provenance tag of the row's main footnote; a hollow dashed dot
// marks a company claim that has not been officially confirmed (IMO 2026). Each row also says who
// AI was compared with, because several right-hand dots are not comparisons with the best humans.
// Data: src/data/jagged_map.json, built and checked against the manuscript by
// scripts/data/build_jagged_map.mjs.
import { useContext, useEffect, useRef, useState } from 'react'
import { Figure, C, PROVENANCE, LegendItem, TagChip } from './kit.jsx'
import { FootnoteContext, FootnoteRef } from '../components/Footnotes.jsx'
import data from '../data/jagged_map.json'
import './JaggedMap.css'

const ROWS = data.rows
const TIERS = data.meta.tiers
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

function layout(width) {
  const narrow = width < 600
  if (narrow) {
    const textW = Math.max(150, Math.round(width * 0.52))
    const x0 = textW + 10
    const x1 = width - 6
    const colW = (x1 - x0) / TIERS.length
    const cx = i => x0 + colW * (i + 0.5)
    const headH = LINE * 2 + 12
    let y = headH
    const rows = ROWS.map(r => {
      const domain = wrap(r.domain, Math.floor(textW / 7.1))
      const tier = wrap(r.tier_label, Math.floor(textW / 6.3))
      const vs = wrap(`vs ${r.compared_with}`, Math.floor(textW / 6))
      const h = 12 + (domain.length + tier.length + vs.length) * LINE
      const row = { r, top: y, h, mid: y + h / 2, dotX: cx(r.tier), domain, tier, vs }
      y += h
      return row
    })
    return { narrow, width, x0, x1, colW, cx, headH, rows, height: y + 6 }
  }
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
  return { narrow, width, x0, x1, colW, cx, headH, tierLines, cmpX: x1 + 12, rows, height: y + 6 }
}

function Dot({ r, x, y, size = 6.5 }) {
  const color = PROVENANCE[r.provenance]?.color ?? C.ink3
  if (!r.confirmed) {
    return <circle cx={x} cy={y} r={size} fill={C.paper} stroke={color} strokeWidth={1.8} strokeDasharray="2.6 2" />
  }
  return <circle cx={x} cy={y} r={size} fill={color} stroke={C.paper} strokeWidth={1.5} />
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
    const names = rows.map(r => (r.confirmed ? r.domain : `${r.domain} (if confirmed)`)).join(', ')
    return `${TIERS[i].label.toLowerCase()}: ${names}`
  }).filter(Boolean)
  return `Dot plot placing ${ROWS.length} tests of AI on five steps, from far below humans to beyond the best humans; ${parts.join('; ')}.`
}

function Chart({ width }) {
  const L = layout(width)
  const [active, setActive] = useState(null)
  const [pinned, setPinned] = useState(false)
  const [focusCard, setFocusCard] = useState(false)
  const rowRefs = useRef({})
  const cardRef = useRef(null)
  const closeRef = useRef(null)

  const close = (returnFocus = false) => {
    const id = active
    setPinned(false)
    setActive(null)
    if (returnFocus && id) rowRefs.current[id]?.focus()
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
      if (e.target.closest?.('.jm-row')) return
      setPinned(false)
      setActive(null)
    }
    const onKey = e => {
      if (e.key !== 'Escape') return
      // Let an open footnote popover inside the card close first.
      if (cardRef.current?.querySelector('.fn[aria-expanded="true"]')) return
      close(true)
    }
    document.addEventListener('pointerdown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDoc)
      document.removeEventListener('keydown', onKey)
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

  const cur = L.rows.find(row => row.r.id === active)
  let cardStyle = null
  if (cur) {
    if (width < 520) cardStyle = { left: 0, right: 0, width: 'auto', maxWidth: 'none', top: cur.top + cur.h + 2 }
    else if (cur.dotX > width / 2) cardStyle = { right: width - cur.dotX + 16, top: Math.max(0, cur.top - 4) }
    else cardStyle = { left: cur.dotX + 16, top: Math.max(0, cur.top - 4) }
  }

  return (
    <div className="jm" onMouseLeave={() => { if (!pinned) setActive(null) }}>
      <svg width={width} height={L.height} role="group" aria-label={summary()}>
        {/* Header */}
        {L.narrow ? (
          <g aria-hidden="true">
            {/* Right-aligned on the first step so it uses the empty space above the text column
                and cannot run into the right-hand label on a narrow track. */}
            <TextLines lines={['Far below', 'humans']} x={L.cx(0) + 6} y={12} size={11} fill={C.ink3} anchor="end" />
            <TextLines lines={['Beyond the', 'best humans']} x={L.x1} y={12} size={11} fill={C.ink3} anchor="end" />
          </g>
        ) : (
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
        )}
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
          const label = `${r.domain}: ${r.tier_label}. Compared with ${r.compared_with}. ${PROVENANCE[r.provenance]?.label ?? ''}${r.confirmed ? '' : ', not officially confirmed'}${r.baseline_provenance && r.baseline_provenance !== r.provenance ? `; human baseline ${PROVENANCE[r.baseline_provenance]?.label ?? ''}` : ''}. ${r.date_label}.`
          return (
            <g
              key={r.id}
              className="jm-row"
              role="button"
              tabIndex={0}
              aria-label={label}
              aria-expanded={pinned && isActive}
              ref={el => { rowRefs.current[r.id] = el }}
              onMouseEnter={() => { if (!pinned) setActive(r.id) }}
              onFocus={() => { if (!pinned) setActive(r.id) }}
              onBlur={e => { if (!pinned && !e.currentTarget.contains(e.relatedTarget)) setActive(null) }}
              onClick={() => toggle(r.id, false)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggle(r.id, true)
                }
              }}
            >
              <rect
                className="jm-row__band"
                x={0} y={row.top + 1} width={width} height={row.h - 2} rx={4}
                fill={isActive ? C.grid : 'transparent'}
              />
              {L.narrow ? (
                <>
                  <TextLines lines={row.domain} x={2} y={row.top + 18} size={12.5} fill={C.ink} weight={600} />
                  <TextLines
                    lines={row.tier}
                    x={2} y={row.top + 18 + row.domain.length * LINE}
                    size={11.5} fill={r.tier === LEVEL ? C.accent : C.ink2}
                  />
                  <TextLines
                    lines={row.vs}
                    x={2} y={row.top + 18 + (row.domain.length + row.tier.length) * LINE}
                    size={11} fill={C.ink3}
                  />
                </>
              ) : (
                <>
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
                </>
              )}
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

      {cur && (
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
      )}
    </div>
  )
}

function DataTable() {
  return (
    <details className="chart-data">
      <summary>Show the data</summary>
      <div className="table-wrap">
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
      title="AI's leads are mostly on short tasks with an answer key; its gaps are in long, open-ended or physical work"
      subtitle="Twelve tests of AI, placed on five steps from far below humans to beyond the best humans. Dot colour shows who checked the result; each row also says who or what AI was compared with."
      legend={
        <>
          <LegendItem color={C.verified} label="Verified" />
          <LegendItem color={C.vendor} label="Vendor-reported" />
          <HollowDashedItem label="Company claim, not officially confirmed" />
          <LegendItem color={C.accent} shape="line" label="Level with the best humans" />
        </>
      }
      caveat="Several right-hand dots compare AI with trained experts, average drivers or another computer model, not with the best humans. The IMO 2026 perfect scores are company reports the IMO has not confirmed, and the hurricane result is known through press coverage of NHC's report."
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
