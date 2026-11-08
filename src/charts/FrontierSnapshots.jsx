// Section 2 signature chart: price-capability frontier at three dates.
// Data: src/data/frontier_snapshots.json, built by scripts/data/build_frontier_snapshots.py from
// research/data/frontier_snapshots.csv (+ ECI credible intervals from research/data/raw/eci_scores.csv).
import { useEffect, useMemo, useRef, useState } from 'react'
import { scaleLinear, scaleLog } from 'd3-scale'
import data from '../data/frontier_snapshots.json'
import { C, Figure, LegendItem, Segmented, Tooltip, fmt, svgSize, usePinnableTip, utc } from './kit.jsx'
import './FrontierSnapshots.css'

const SNAPS = data.snapshots // [{date, key, label, long}], oldest first
const SNAP_BY_DATE = Object.fromEntries(SNAPS.map(s => [s.date, s]))
const H = data.headlines
const ECI_TEST = H.eci_test // 150
const PRICE_TEST = H.price_test // 4

const X_DOMAIN = [0.05, 100]
const Y_DOMAIN = [130, 172]

const VIEW_OPTIONS = [
  { value: '2025-11-07', label: 'A year ago', short: 'Year ago' },
  { value: '2026-05-07', label: 'Six months ago', short: '6 months' },
  { value: '2026-11-07', label: 'Today', short: 'Today' },
  { value: 'all', label: 'All three', short: 'All three' },
]

// Models named in the manuscript's two tests (s2-cheaper, s2-better) or as the top model (s2-top).
// Positions are hand-placed for the "All three" view; elsewhere they are used when the model is visible.
const KEY_LABELS = {
  '2025-11-07|GPT-5': { pos: 'below-right', narrow: true },
  '2025-11-07|GPT-5 Pro': { pos: 'above' },
  '2026-05-07|Gemini 3 Flash': { pos: 'left', narrowPos: 'above', narrow: true },
  '2026-05-07|Grok 4.20': { pos: 'above', hideCompact: true },
  '2026-05-07|GPT-5.5 Pro': { pos: 'above' },
  '2026-11-07|GPT-6 Luna': { pos: 'right', singlePos: 'left', narrow: true },
  '2026-11-07|Claude Haiku 5.5': { pos: 'above', narrow: true },
  '2026-11-07|GPT-6.1 Sol': { pos: 'left-high', narrow: true },
  '2026-11-07|GPT-6.1 Terra': { pos: 'left' },
  '2026-11-07|GPT-6 Astra': { pos: 'above' },
}
// Label positions for single-snapshot views where the default (left of the dot) collides.
const SINGLE_POS = { '2025-11-07|gpt-oss-120b': 'above-start' }
// Non-frontier models still drawn in the "All three" view because the manuscript names them.
const ALWAYS_SHOWN = new Set(['2026-11-07|GPT-6 Luna'])

const keyOf = m => `${m.snapshot}|${m.model}`
const usdExact = v => `$${+v.toFixed(4)}`
const dateLong = iso => utc.dayMonthYear(new Date(iso + 'T00:00:00Z'))
const textWidth = (s, px = 11) => s.length * px * 0.56

const BY_SNAP = Object.fromEntries(SNAPS.map(s => [s.date, data.models.filter(m => m.snapshot === s.date)]))
const FRONTIER = Object.fromEntries(
  SNAPS.map(s => [s.date, BY_SNAP[s.date].filter(m => m.frontier).sort((a, b) => a.blended - b.blended)]),
)
// Where each snapshot's frontier crosses the two test lines (taken from the derivation script's checks).
const CROSS_150 = Object.fromEntries(H.cheaper.map(c => [c.snapshot, c]))
const CROSS_4 = Object.fromEntries(H.better.map(b => [b.snapshot, b]))

function stepPath(points, x, y) {
  if (!points.length) return ''
  let d = `M${x(points[0].blended)},${y(points[0].eci)}`
  for (let i = 1; i < points.length; i++) d += `H${x(points[i].blended)}V${y(points[i].eci)}`
  return d + `H${x(X_DOMAIN[1])}`
}

function labelGeom(pos, cx, cy, r) {
  switch (pos) {
    case 'left': return { x: cx - r - 4, y: cy + 4, anchor: 'end' }
    case 'left-high': return { x: cx - r - 4, y: cy - 3, anchor: 'end' }
    case 'right': return { x: cx + r + 4, y: cy + 4, anchor: 'start' }
    case 'below-right': return { x: cx + r + 2, y: cy + r + 12, anchor: 'start' }
    case 'below': return { x: cx, y: cy + r + 12, anchor: 'middle' }
    case 'above-start': return { x: cx - r, y: cy - r - 6, anchor: 'start' }
    case 'above-end': return { x: cx + r, y: cy - r - 6, anchor: 'end' }
    case 'above':
    default: return { x: cx, y: cy - r - 6, anchor: 'middle' }
  }
}
// Fallback order when a label's preferred position collides with another label or a dot.
const FALLBACK_POS = ['left', 'left-high', 'above', 'above-start', 'above-end', 'right', 'below', 'below-right']

// Approximate box of an 11px text label (baseline y), padded by the halo.
function textBox(x, y, anchor, text, px = 11) {
  const w = textWidth(text, px)
  const x0 = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x
  return { x0: x0 - 2, x1: x0 + w + 2, y0: y - px * 0.9, y1: y + px * 0.3 }
}
const overlaps = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1

function TooltipBody({ m }) {
  const s = SNAP_BY_DATE[m.snapshot]
  return (
    <>
      <strong>{m.model}</strong>
      <div className="fs-tip__meta">{m.developer}{m.open_weights ? ', open weights' : ''} · released {dateLong(m.release_date)}</div>
      <div>
        ECI <strong>{m.eci.toFixed(2)}</strong>
        {m.eci_lo != null ? ` (interval ${m.eci_lo.toFixed(2)}-${m.eci_hi.toFixed(2)})` : ' (scale anchor, no interval)'}
      </div>
      <div>{usdExact(m.price_in)} input / {usdExact(m.price_out)} output per million tokens</div>
      <div>Blended <strong>{fmt.usd(m.blended)}</strong> per million tokens</div>
      <div className="fs-tip__meta">
        Price on {s.long}{m.frontier ? '; on that date’s frontier' : ''}
      </div>
    </>
  )
}

function Chart({ width, view }) {
  // Hover, focus and tap/click/Enter/Space to pin (kit.jsx); Escape or a press elsewhere clears.
  const tip = usePinnableTip()
  // A snapshot switch can remove the pinned or focused dot from the plot: drop it (a pointer press
  // on the toggle already clears the pin; this also covers the keyboard).
  const lastView = useRef(view)
  useEffect(() => {
    if (lastView.current === view) return
    lastView.current = view
    tip.clear()
  }, [view]) // eslint-disable-line react-hooks/exhaustive-deps
  const narrow = width < 560
  const tiny = width < 400
  const compact = width < 760 // annotation layout switches before the axis layout does
  const height = Math.round(Math.max(360, Math.min(540, width * 0.6)))
  const m = { top: 30, right: narrow ? 14 : 104, bottom: 44, left: narrow ? 30 : 38 }
  const iw = Math.max(10, width - m.left - m.right)
  const ih = height - m.top - m.bottom

  const x = useMemo(() => scaleLog().domain(X_DOMAIN).range([0, iw]), [iw])
  const y = useMemo(() => scaleLinear().domain(Y_DOMAIN).range([ih, 0]), [ih])

  const all = view === 'all'
  const shownSnaps = all ? SNAPS : SNAPS.filter(s => s.date === view)
  const ghostSnaps = all ? [] : SNAPS.filter(s => s.date !== view)
  const r = narrow ? 4.5 : 4
  const hitR = narrow ? 13 : 9

  // Dots: in "All three" only frontier models (plus any named non-frontier model); otherwise every model.
  const dots = useMemo(() => {
    const out = []
    for (const s of shownSnaps) {
      for (const d of BY_SNAP[s.date]) {
        if (all && !d.frontier && !ALWAYS_SHOWN.has(keyOf(d))) continue
        out.push(d)
      }
    }
    // draw non-frontier first, then older snapshots under newer ones
    return out.sort((a, b) => (a.frontier - b.frontier) || a.snapshot.localeCompare(b.snapshot))
  }, [view]) // eslint-disable-line react-hooks/exhaustive-deps

  const yTicks = (narrow ? [130, 140, 150, 160, 170] : [130, 135, 140, 145, 150, 155, 160, 165, 170]).filter(t => t !== ECI_TEST)
  const xTicks = tiny ? [0.1, 1, 10, 100] : [0.1, 0.3, 1, 3, 10, 30, 100]
  const xTickLabel = t => (t < 1 ? `$${t.toFixed(2)}` : `$${t}`)

  const x150 = [CROSS_150[SNAPS[0].date].price, CROSS_150[SNAPS[2].date].price]
  const y4 = [CROSS_4[SNAPS[0].date].eci, CROSS_4[SNAPS[2].date].eci]
  const arrowLabel = `${tiny ? '~' : 'about '}${Math.round(H.cheaper_ratio)}x cheaper`
  const eciLabel = compact ? `ECI ${ECI_TEST}` : `GPT-5 level (ECI ${ECI_TEST})`
  const eciLabelY = y(ECI_TEST) + (compact ? 15 : -6)

  // Direct labels. Candidates are tried in order (hand-placed position first) and the first one that
  // stays inside the svg and clears every other text label wins; overlapping a dot only costs a penalty.
  // A label that cannot be placed is dropped (its dot keeps its tooltip).
  const obstacles = [
    textBox(-m.left, -14, 'start', narrow ? 'ECI score' : 'Epoch Capabilities Index (higher is better)'),
    textBox(x(PRICE_TEST), -6, 'middle', '$4'),
    textBox(4, eciLabelY, 'start', eciLabel),
    ...yTicks.map(t => textBox(-6, y(t) + 4, 'end', String(t))),
  ]
  if (all) obstacles.push(textBox(x(x150[1]) + 8, y(ECI_TEST) + 15, 'start', arrowLabel, 12.5))
  if (all && !compact) {
    const by = y((y4[0] + y4[1]) / 2 - 2.5)
    obstacles.push(textBox(x(PRICE_TEST) - 6, by, 'end', 'best score', 12.5), textBox(x(PRICE_TEST) - 6, by + 14, 'end', 'for $4 or less', 12.5))
  }
  if (!narrow) {
    for (const s of shownSnaps) {
      const last = FRONTIER[s.date][FRONTIER[s.date].length - 1]
      obstacles.push(textBox(iw + 6, y(last.eci) + 4, 'start', s.label, 12))
    }
  }
  const dotBoxes = dots.map(d => ({ k: keyOf(d), x0: x(d.blended) - r, x1: x(d.blended) + r, y0: y(d.eci) - r, y1: y(d.eci) + r }))
  const bounds = { x0: -m.left, x1: iw + m.right, y0: -m.top, y1: ih }
  const inside = b => b.x0 >= bounds.x0 && b.x1 <= bounds.x1 && b.y0 >= bounds.y0 && b.y1 <= bounds.y1

  const wanted = []
  for (const d of dots) {
    const k = keyOf(d)
    const preset = KEY_LABELS[k]
    if (all && !preset) continue
    if (all && compact && preset.hideCompact) continue
    if (narrow && !(preset && preset.narrow)) {
      // on narrow single-snapshot views keep only the snapshot's top model as an extra
      const top = BY_SNAP[d.snapshot].reduce((a, b) => (b.eci > a.eci ? b : a))
      if (all || tiny || top !== d) continue
    }
    if (!all && !preset && !d.frontier) continue
    const pref = (!all && (preset?.singlePos || SINGLE_POS[k])) || (compact && preset?.narrowPos) || preset?.pos || 'left'
    wanted.push({ d, k, pref, rank: preset ? 0 : 1 })
  }
  // named models first, then the rest from the expensive end (top models matter more than cheap ones)
  wanted.sort((a, b) => a.rank - b.rank || b.d.blended - a.d.blended)
  const labels = []
  const placed = obstacles.slice()
  for (const { d, k, pref } of wanted) {
    const cx = x(d.blended), cy = y(d.eci)
    let best = null
    for (const [i, pos] of [pref, ...FALLBACK_POS.filter(p => p !== pref)].entries()) {
      const g = labelGeom(pos, cx, cy, r)
      const box = textBox(g.x, g.y, g.anchor, d.model)
      if (!inside(box) || placed.some(o => overlaps(o, box))) continue
      const score = i + 10 * dotBoxes.filter(o => o.k !== k && overlaps(o, box)).length
      if (!best || score < best.score) best = { score, g, box }
      if (score === i) break
    }
    if (!best) continue
    placed.push(best.box)
    labels.push({ k, text: d.model, ...best.g })
  }

  // Only a dot plotted in the current view can show a tooltip.
  const activeDot = tip.active ? dots.find(d => keyOf(d) === tip.active) ?? null : null
  const halo = { stroke: C.paper, strokeWidth: 3, paintOrder: 'stroke', strokeLinejoin: 'round' }

  const summary =
    `Step lines show the highest Epoch Capabilities Index score available at or below each blended list price on ${SNAPS.map(s => s.long).join(', ')}; ` +
    `the cheapest model scoring ${ECI_TEST} or more fell from ${fmt.usd(x150[0])} to ${fmt.usd(x150[1])}, ` +
    `and the best score at $${PRICE_TEST} or less rose from ${Math.round(y4[0])} to ${Math.round(y4[1])}.`

  return (
    <div className="fs-chart">
      <svg {...svgSize(width, height)} role="group" aria-label={summary}>
        <defs>
          <marker id="fs-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,1 L9,5 L0,9" fill="none" stroke={C.ink} strokeWidth="1.6" />
          </marker>
        </defs>
        <g transform={`translate(${m.left},${m.top})`}>
          {/* y grid + labels */}
          {yTicks.map(t => (
            <g key={t}>
              <line x1={0} x2={iw} y1={y(t)} y2={y(t)} stroke={C.grid} strokeWidth={1} />
              <text x={-6} y={y(t) + 4} textAnchor="end" fontSize={11} fill={C.ink3}>{t}</text>
            </g>
          ))}
          <text x={-m.left} y={-14} fontSize={11} fill={C.ink3}>
            {narrow ? 'ECI score' : 'Epoch Capabilities Index (higher is better)'}
          </text>

          {/* x axis */}
          <line x1={0} x2={iw} y1={ih} y2={ih} stroke={C.rule} />
          {xTicks.map(t => (
            <g key={t} transform={`translate(${x(t)},${ih})`}>
              <line y1={0} y2={4} stroke={C.rule} />
              <text y={17} textAnchor="middle" fontSize={11} fill={C.ink3}>{xTickLabel(t)}</text>
            </g>
          ))}
          <text x={iw / 2} y={ih + 36} textAnchor="middle" fontSize={11} fill={C.ink3}>
            {narrow ? 'Blended price per million tokens (log scale)' : 'Blended list price, dollars per million tokens (3 input : 1 output, log scale)'}
          </text>

          {/* reference lines: ECI 150 and $4 */}
          <line x1={0} x2={iw} y1={y(ECI_TEST)} y2={y(ECI_TEST)} stroke={C.ink3} strokeDasharray="3 3" />
          <text x={4} y={eciLabelY} fontSize={11} fill={C.ink2} {...halo}>
            {eciLabel}
          </text>
          <line x1={x(PRICE_TEST)} x2={x(PRICE_TEST)} y1={0} y2={ih} stroke={C.ink3} strokeDasharray="3 3" />
          <text x={x(PRICE_TEST)} y={-6} textAnchor="middle" fontSize={11} fill={C.ink2}>$4</text>

          {/* ghost frontiers for context in single-snapshot views */}
          {ghostSnaps.map(s => (
            <path key={s.date} d={stepPath(FRONTIER[s.date], x, y)} fill="none" stroke={C.rule} strokeWidth={1} strokeDasharray="2 3" />
          ))}

          {/* frontier step lines */}
          {shownSnaps.map(s => (
            <path
              key={s.date}
              d={stepPath(FRONTIER[s.date], x, y)}
              fill="none"
              stroke={C[s.key]}
              strokeWidth={s.key === 'snap3' ? 2.5 : 2}
            />
          ))}

          {/* direct line labels at the right edge (wide screens) */}
          {!narrow && shownSnaps.map(s => {
            const last = FRONTIER[s.date][FRONTIER[s.date].length - 1]
            return (
              <text key={s.date} x={iw + 6} y={y(last.eci) + 4} fontSize={12} fill={C.ink2} fontWeight={s.key === 'snap3' ? 600 : 400}>
                {s.label}
              </text>
            )
          })}

          {/* the two tests: arrows in "All three", crossing markers always */}
          {all && (
            <g aria-hidden="true">
              <line
                x1={x(x150[0]) - r - 2} x2={x(x150[1]) + r + 3} y1={y(ECI_TEST)} y2={y(ECI_TEST)}
                stroke={C.ink} strokeWidth={1.5} markerEnd="url(#fs-arrow)"
              />
              <text x={x(x150[1]) + 8} y={y(ECI_TEST) + 15} fontSize={12} fill={C.ink} fontWeight={600} {...halo}>
                {arrowLabel}
              </text>
              <line
                x1={x(PRICE_TEST)} x2={x(PRICE_TEST)} y1={y(y4[0]) - r - 2} y2={y(y4[1]) + r + 3}
                stroke={C.ink} strokeWidth={1.5} markerEnd="url(#fs-arrow)"
              />
              {!compact && (
                <text x={x(PRICE_TEST) - 6} y={y((y4[0] + y4[1]) / 2 - 2.5)} textAnchor="end" fontSize={12} fill={C.ink} fontWeight={600} {...halo}>
                  <tspan x={x(PRICE_TEST) - 6}>best score</tspan>
                  <tspan x={x(PRICE_TEST) - 6} dy={14}>for $4 or less</tspan>
                </text>
              )}
            </g>
          )}
          {shownSnaps.map(s => (
            <g key={s.date} aria-hidden="true">
              <circle cx={x(CROSS_150[s.date].price)} cy={y(ECI_TEST)} r={3} fill={C.paper} stroke={C[s.key]} strokeWidth={1.75} />
              <circle cx={x(PRICE_TEST)} cy={y(CROSS_4[s.date].eci)} r={3} fill={C.paper} stroke={C[s.key]} strokeWidth={1.75} />
            </g>
          ))}

          {/* model dots */}
          {dots.map(d => {
            const s = SNAP_BY_DATE[d.snapshot]
            const cx = x(d.blended), cy = y(d.eci)
            return d.frontier || ALWAYS_SHOWN.has(keyOf(d)) ? (
              <circle key={keyOf(d)} cx={cx} cy={cy} r={r} fill={d.frontier ? C[s.key] : C.paper} stroke={d.frontier ? C.paper : C[s.key]} strokeWidth={d.frontier ? 1.5 : 1.75} />
            ) : (
              <circle key={keyOf(d)} cx={cx} cy={cy} r={r - 0.5} fill="none" stroke={C.ink3} strokeWidth={1.1} />
            )
          })}

          {/* labels */}
          {labels.map(l => (
            <text key={l.k} x={l.x} y={l.y} textAnchor={l.anchor} fontSize={11} fill={C.ink2} {...halo}>{l.text}</text>
          ))}

          {/* active ring */}
          {activeDot && (
            <circle cx={x(activeDot.blended)} cy={y(activeDot.eci)} r={r + 4} fill="none" stroke={C.ink} strokeWidth={1.5} pointerEvents="none" />
          )}

          {/* hit targets (pointer + keyboard), in reading order: date, then price */}
          {dots.slice().sort((p, q) => p.snapshot.localeCompare(q.snapshot) || p.blended - q.blended || q.eci - p.eci).map(d => {
            const k = keyOf(d)
            const s = SNAP_BY_DATE[d.snapshot]
            return (
              <circle
                key={k}
                {...tip.bind(k, d, { label: `Details: ${d.model}, ${s.long}` })}
                className="fs-hit"
                cx={x(d.blended)} cy={y(d.eci)} r={hitR}
                fill="transparent"
                aria-label={`${d.model}, ${s.long}: ECI ${d.eci.toFixed(2)}, blended ${fmt.usd(d.blended)} per million tokens`}
              />
            )
          })}
        </g>
      </svg>
      {activeDot && (
        <Tooltip x={x(activeDot.blended) + m.left} y={y(activeDot.eci) + m.top} width={width} {...tip.tipProps}>
          <TooltipBody m={activeDot} />
        </Tooltip>
      )}
    </div>
  )
}

function Readout() {
  const [c1, c2, c3] = H.cheaper
  const [b1, b2, b3] = H.better
  const may = BY_SNAP[b2.snapshot]
  const tie = may.find(m => m.model === c2.models[0]) // Gemini 3 Flash, 152.25 (s2-better: a statistical tie)
  const sw = s => <span className="fs-sw" style={{ background: C[SNAP_BY_DATE[s].key] }} aria-hidden="true" />
  return (
    // Layout follows the figure's own width (not the viewport) through @container figure queries in
    // FrontierSnapshots.css, so the pre-rendered HTML is right at every width before hydration.
    <div className="fs-readout">
      <div className="fs-readout__item">
        <p className="fs-readout__head">Same capability, less money</p>
        <p className="fs-readout__q">Cheapest model at ECI {ECI_TEST} or above</p>
        <ol className="fs-readout__steps">
          {[c1, c2, c3].map(c => (
            <li key={c.snapshot}>
              {sw(c.snapshot)}
              <span className="fs-readout__when">{SNAP_BY_DATE[c.snapshot].label}</span>
              <strong>{fmt.usd(c.price)}</strong>
              <span className="fs-readout__who">{c.models.slice().reverse().join(' or ')}</span>
            </li>
          ))}
        </ol>
        <p className="fs-readout__result">About {Math.round(H.cheaper_ratio)} times cheaper in a year.</p>
      </div>
      <div className="fs-readout__item">
        <p className="fs-readout__head">Same money, more capability</p>
        <p className="fs-readout__q">Best ECI at ${PRICE_TEST} or less (blended)</p>
        <ol className="fs-readout__steps">
          {[b1, b2, b3].map(b => (
            <li key={b.snapshot}>
              {sw(b.snapshot)}
              <span className="fs-readout__when">{SNAP_BY_DATE[b.snapshot].label}</span>
              <strong>{b === b2 ? `about ${Math.round(b.eci)}` : Math.round(b.eci)}</strong>
              <span className="fs-readout__who">
                {b.model}
                {b === b2 && tie ? ` (${b.eci.toFixed(2)}; ${tie.model} ${tie.eci.toFixed(2)} ties)` : ''}
              </span>
            </li>
          ))}
        </ol>
        <p className="fs-readout__result">GPT-6.1 Sol sits at exactly $4.00.</p>
      </div>
    </div>
  )
}

function DataTable() {
  return (
    <details className="chart-data">
      <summary>Show the data</summary>
      <div className="table-wrap" tabIndex={0} role="region" aria-label="Data table: price-capability frontier">
        <table>
          <thead>
            <tr>
              <th>Snapshot</th>
              <th>Model</th>
              <th>Developer</th>
              <th>Released</th>
              <th>ECI (interval)</th>
              <th>Input / output $ per M</th>
              <th>Blended $ per M</th>
              <th>Frontier</th>
              <th>Price basis and source</th>
            </tr>
          </thead>
          <tbody>
            {SNAPS.flatMap(s =>
              BY_SNAP[s.date]
                .slice()
                .sort((a, b) => a.blended - b.blended || b.eci - a.eci)
                .map(d => (
                  <tr key={keyOf(d)}>
                    <td>{s.long}</td>
                    <td>{d.model}{d.open_weights ? ' (open weights)' : ''}</td>
                    <td>{d.developer}</td>
                    <td>{d.release_date}</td>
                    <td>{d.eci.toFixed(2)}{d.eci_lo != null ? ` (${d.eci_lo.toFixed(2)}-${d.eci_hi.toFixed(2)})` : ' (anchor)'}</td>
                    <td>{usdExact(d.price_in)} / {usdExact(d.price_out)}</td>
                    <td>{usdExact(d.blended)}</td>
                    <td>{d.frontier ? 'Yes' : ''}</td>
                    <td>{d.price_basis}; {d.source}; notes {d.footnotes.join(', ')}</td>
                  </tr>
                )),
            )}
          </tbody>
        </table>
      </div>
    </details>
  )
}

export default function FrontierSnapshots() {
  const [view, setView] = useState('all')
  const legend = (
    <div className="fs-legend">
      <SegmentedResponsive value={view} onChange={setView} />
      <div className="fs-keys">
        {(view === 'all' ? SNAPS : SNAPS.filter(s => s.date === view)).map(s => (
          <LegendItem key={s.date} color={C[s.key]} shape="line" label={`${s.long} (${s.label.toLowerCase()})`} />
        ))}
        {view !== 'all' && <LegendItem color={C.ink3} hollow label="Other models that date" />}
        {view !== 'all' && <LegendItem color={C.rule} shape="line" dashed label="Other dates" />}
      </div>
    </div>
  )
  return (
    <Figure
      id="s2-frontier-snapshots"
      title="A year on, GPT-5-level AI costs about 17 times less, and $4 per million tokens buys a score of 169 instead of 150"
      subtitle="Each line shows the best Epoch Capabilities Index (ECI) score you could buy at or below each price on that date. Prices are the list prices then, in dollars per million tokens (log scale)."
      legend={legend}
      notes={['s2-cheaper', 's2-better', 's2-top', 's2-hist', 's2-tokenizer', 's2-eci', 's2-blend']}
      source="Epoch AI, Epoch Capabilities Index (scores as of 7 Nov 2026); company list prices (some open-weight prices appear to be third-party host prices); our calculation"
      caveat="All three dates use Epoch's 7 November 2026 scores; gaps under about 3 points are noise. Price per token ignores how many tokens a model uses to reach an answer."
    >
      {width => (
        <>
          <Chart width={width} view={view} />
          <Readout />
          <DataTable />
        </>
      )}
    </Figure>
  )
}

function SegmentedResponsive({ value, onChange }) {
  return (
    <div className="fs-controls">
      <span className="fs-controls__wide">
        <Segmented label="Choose a date" options={VIEW_OPTIONS.map(o => ({ value: o.value, label: o.label }))} value={value} onChange={onChange} />
      </span>
      <span className="fs-controls__narrow">
        <Segmented label="Choose a date" options={VIEW_OPTIONS.map(o => ({ value: o.value, label: o.short }))} value={value} onChange={onChange} />
      </span>
    </div>
  )
}
