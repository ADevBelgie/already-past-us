// s6 "AI building AI": small multiples of AI-improving-AI indicators, grouped by who measured them.
// Data: src/data/rsi_series.json, built by scripts/data/build_rsi_series.py from research/.
// Company self-reports each get their own panel and axis; they are never joined or overlaid.
import { scaleLinear, scaleLog, scaleUtc } from 'd3-scale'
import { line } from 'd3-shape'
import { extent } from 'd3-array'
import { Figure, C, TagChip, Tooltip, svgSize, usePinnableTip, utc } from './kit.jsx'
import { FootnoteRef } from '../components/Footnotes.jsx'
import data from '../data/rsi_series.json'
import './RsiDashboard.css'

const ROWS = data.rows.filter(r => r.in_chart)
const panelRows = id => ROWS.filter(r => r.panel === id)
const points = id => panelRows(id).filter(r => r.kind === 'point' || r.kind === 'interval')
const reference = id => panelRows(id).find(r => r.kind === 'reference')
const find = (id, pred) => panelRows(id).find(pred)

const GAP = 24
// Invisible hit circle around each point: 12px radius gives a 24x24px touch target.
const HIT_R = 12
// Single-column ("compact") layout below this figure width: one panel per row, shorter charts and
// tighter spacing. The same breakpoint is the `@container figure (width < 640px)` rules in
// RsiDashboard.css, so the server HTML (rendered at 960px) already has the compact heights on phones.
const COMPACT_BELOW = 640
// Chart heights do not depend on the exact width, only on the layout: each chart SVG carries both
// heights as CSS variables and RsiDashboard.css picks one with the container query above. That keeps
// the height while the server-rendered SVG (drawn at 960px) is scaled down to a phone, so hydration
// does not move the page; the class beats the kit's `height: auto` for svg[viewBox] (styles.css).
const heightVars = (full, compact) => ({ '--rsi-h': `${full}px`, '--rsi-h-compact': `${compact}px` })
// TimeChart heights (full, compact). The compact one trims the top margin and keeps a 60px plot.
const TIME_H = { full: 140, compact: 100 }
// BarChart row heights (full, compact).
const BAR_ROW_H = { full: 44, compact: 36 }
// AccelChart row height, wide and narrow (under 480px) layouts.
const ACCEL_ROW_H = { wide: 40, narrow: 52 }

// 'YYYY-MM-DD', or 'YYYY-MM' (month only in the source: placed mid-month).
const toDate = s => new Date((s.length === 7 ? `${s}-15` : s) + 'T00:00:00Z')
const monthYear = s => utc.monthYear(new Date((s.length === 7 ? `${s}-01` : s) + 'T00:00:00Z'))
const shortMonth = s => {
  const d = toDate(s)
  return `${utc.month(d)} ’${String(d.getUTCFullYear()).slice(2)}`
}
const when = r => r.date_label || (r.date ? monthYear(r.date) : '')

const minutes = v => (v < 60 ? `${Math.round(v)} min` : `${(v / 60).toFixed(1)} h`)
const BOUND = { gt: 'more than ', gte: 'at least ', lt: 'below ', approx: 'about ' }

/** Value text for labels and the data table, keeping the source's own qualifiers. */
function valueText(r, { exact = false } = {}) {
  const b = BOUND[r.bound] ?? ''
  const v = r.value
  let s
  switch (r.unit) {
    case 'minutes': s = exact ? `${v.toLocaleString('en-GB')} min${v >= 60 ? ` (${(v / 60).toFixed(1)} h)` : ''}` : minutes(v); break
    case 'ECI points': s = exact ? v.toFixed(2) : String(Math.round(v)); break
    case 'percent': s = `${v}%`; break
    case 'x speedup':
    case 'x earlier pace': s = `${v}x`; break
    default: s = String(v)
  }
  if (r.kind === 'interval') s += ` (95% CI ${r.ci_low}–${r.ci_high}x)`
  return b + s
}

/* ── Shared panel shell ───────────────────────────────────────────────── */

function Panel({ title, measure, who, tag, footnote, note, children, wide }) {
  return (
    <section className={`rsi-panel${wide ? ' rsi-panel--wide' : ''}`} aria-label={title}>
      <header className="rsi-panel__head">
        <h4 className="rsi-panel__title">{title}</h4>
        <p className="rsi-panel__measure">{measure}</p>
        <p className="rsi-panel__who">
          <span className="rsi-panel__who-label">Who measured this:</span> <TagChip tag={tag} />{' '}
          <span className="rsi-panel__who-name">{who}</span>
          <FootnoteRef id={footnote} />
        </p>
      </header>
      {children}
      {note && <p className="rsi-panel__note">{note}</p>}
    </section>
  )
}

/* ── Time-series small multiple (one company or one independent group) ── */

// `tip` is one usePinnableTip() shared by every panel of the dashboard, so at most one tooltip is
// pinned per figure; keys are `${panel}:${index}` and each panel shows only its own.
// `compactH` overrides TIME_H.compact for a chart whose labels need more room.
function TimeChart({ w, compact, compactH = TIME_H.compact, rows, tip, makeY, yTicks, refLine, label, aria, xTicks = 'years', connect = true }) {
  const pid = rows[0].panel
  const h = compact ? compactH : TIME_H.full
  const m = { t: compact ? 18 : 22, r: 10, b: 22, l: 42 }
  const dates = rows.map(r => toDate(r.date))
  const [d0, d1] = extent(dates)
  const pad = (d1 - d0) * 0.05
  const x = scaleUtc().domain([new Date(+d0 - pad), new Date(+d1 + pad)]).range([m.l, w - m.r])
  const y = makeY().range([h - m.b, m.t])
  const narrow = w < 330
  const path = line().x(r => x(toDate(r.date))).y(r => y(r.value))(rows)

  let ticks
  if (xTicks === 'points') {
    ticks = rows.map(r => ({ x: x(toDate(r.date)), text: shortMonth(r.date) }))
  } else if (xTicks === 'ends') {
    const ends = [rows[0], rows[rows.length - 1]].map(r => ({ x: x(toDate(r.date)), text: shortMonth(r.date) }))
    ticks = [ends[0]]
    for (let yr = d0.getUTCFullYear() + 1; yr <= d1.getUTCFullYear(); yr++) {
      const tx = x(new Date(Date.UTC(yr, 0, 1)))
      if (tx - ends[0].x > 44 && ends[1].x - tx > 44) ticks.push({ x: tx, text: String(yr) })
    }
    ticks.push(ends[1])
  } else {
    ticks = []
    for (let yr = d0.getUTCFullYear(); yr <= d1.getUTCFullYear() + 1; yr++) {
      const t = new Date(Date.UTC(yr, 0, 1))
      if (t >= x.domain()[0] && t <= x.domain()[1]) ticks.push({ x: x(t), text: narrow ? `’${String(yr).slice(2)}` : String(yr) })
    }
  }

  const a = tip.active?.startsWith(`${pid}:`) ? tip.datum : null
  return (
    <div className="rsi-chart">
      <svg {...svgSize(w, h)} className="rsi-svg" style={heightVars(TIME_H.full, compactH)} role="group" aria-label={aria}>
        {yTicks.map(t => (
          <g key={t.v}>
            <line x1={m.l} x2={w - m.r} y1={y(t.v)} y2={y(t.v)} stroke={C.grid} />
            <text x={m.l - 6} y={y(t.v)} dy="0.32em" textAnchor="end" fontSize="11" fill={C.ink3}>{t.text}</text>
          </g>
        ))}
        <line x1={m.l} x2={w - m.r} y1={h - m.b} y2={h - m.b} stroke={C.rule} />
        {ticks.map(t => (
          <g key={t.text}>
            <line x1={t.x} x2={t.x} y1={h - m.b} y2={h - m.b + 4} stroke={C.rule} />
            <text x={t.x} y={h - 5} textAnchor="middle" fontSize="11" fill={C.ink3}>{t.text}</text>
          </g>
        ))}
        {refLine && (
          <g>
            <line x1={m.l} x2={w - m.r} y1={y(refLine.v)} y2={y(refLine.v)} stroke={C.ink3} strokeDasharray="4 3" />
            <text
              x={refLine.anchor === 'end' ? w - m.r : m.l + 4}
              y={y(refLine.v) + (refLine.below ? 13 : -5)}
              textAnchor={refLine.anchor || 'start'}
              fontSize="11"
              fill={C.ink2}
              className="rsi-halo"
            >
              {narrow && refLine.short ? refLine.short : refLine.text}
            </text>
          </g>
        )}
        {connect && <path d={path} fill="none" stroke={C.ink2} strokeWidth="1.6" strokeLinejoin="round" />}
        {rows.map((r, i) => {
          const cx = x(toDate(r.date))
          const cy = y(r.value)
          const lab = label?.(r, i, rows.length, narrow)
          const key = `${pid}:${i}`
          const desc = `${r.label}, ${when(r)}: ${valueText(r)}`
          return (
            <g key={r.date + r.label}>
              {r.bound === 'gt' && (
                <path d={`M${cx - 3.5} ${cy - 6} L${cx} ${cy - 9.5} L${cx + 3.5} ${cy - 6}`} fill="none" stroke={C.ink} strokeWidth="1.4" />
              )}
              {lab && (
                <text
                  x={cx + (lab.dx ?? 0)}
                  y={cy + (lab.dy ?? (r.bound === 'gt' ? -14 : -9))}
                  textAnchor={lab.anchor || 'middle'}
                  fontSize="12"
                  fill={C.ink}
                  className="rsi-halo"
                >
                  {lab.text}
                </text>
              )}
              <g
                {...tip.bind(key, r, { label: `Details: ${r.label}, ${when(r)}` })}
                className={`rsi-pt${tip.active === key ? ' is-active' : ''}`}
                aria-label={desc}
              >
                <circle cx={cx} cy={cy} r={HIT_R} fill="transparent" />
                <circle className="rsi-pt__dot" cx={cx} cy={cy} r="3.2" fill={C.ink} stroke={C.paper} strokeWidth="1" />
              </g>
            </g>
          )
        })}
      </svg>
      {a && (
        <Tooltip x={x(toDate(a.date))} y={y(a.value)} width={w} {...tip.tipProps}>
          <strong>{a.label}</strong>
          <br />
          {when(a)}: {valueText(a)}
          {a.note && <><br />{a.note}</>}
        </Tooltip>
      )}
    </div>
  )
}

/* ── Horizontal bars for statements that are not a time series ─────────── */

function BarChart({ w, compact, rows, max, ticks, tickText, refLine, aria }) {
  const m = { t: refLine ? 20 : 6, r: 104, b: 20, l: 0 }
  const barH = rowH => m.t + rows.length * rowH + m.b
  const rowH = compact ? BAR_ROW_H.compact : BAR_ROW_H.full
  const h = barH(rowH)
  const x = scaleLinear().domain([0, max]).range([m.l, w - m.r])
  const narrow = w < 330
  return (
    <div className="rsi-chart">
      <svg {...svgSize(w, h)} className="rsi-svg" style={heightVars(barH(BAR_ROW_H.full), barH(BAR_ROW_H.compact))} role="img" aria-label={aria}>
        {ticks.map(t => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={m.t} y2={h - m.b} stroke={C.grid} />
            <text x={x(t)} y={h - 5} textAnchor={t === 0 ? 'start' : 'middle'} fontSize="11" fill={C.ink3}>{tickText(t)}</text>
          </g>
        ))}
        {refLine && (
          <g>
            <line x1={x(refLine.v)} x2={x(refLine.v)} y1={m.t - 4} y2={h - m.b} stroke={C.ink3} strokeDasharray="4 3" />
            <text x={x(refLine.v) + 4} y={m.t - 8} fontSize="11" fill={C.ink2}>{narrow && refLine.short ? refLine.short : refLine.text}</text>
          </g>
        )}
        {rows.map((r, i) => {
          const top = m.t + i * rowH
          const by = top + 20
          const end = x(r.value)
          const bound = r.kind === 'bound'
          return (
            <g key={r.label + i}>
              <text x={m.l} y={top + 13} fontSize="12" fill={C.ink2} className="rsi-halo">{r.rowLabel}</text>
              {bound ? (
                <rect x={m.l} y={by} width={end - m.l} height="12" fill="none" stroke={C.ink2} strokeDasharray="3 2.5" />
              ) : (
                <rect x={m.l} y={by} width={end - m.l} height="12" fill={C.ink2} />
              )}
              {r.bound === 'gt' && (
                <path d={`M${end + 3} ${by} L${end + 9} ${by + 6} L${end + 3} ${by + 12}`} fill="none" stroke={C.ink} strokeWidth="1.4" />
              )}
              <text x={end + (r.bound === 'gt' ? 13 : 6)} y={by + 6} dy="0.34em" fontSize="12" fill={C.ink} fontWeight="600">
                {r.valueLabel}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ── Tier B: METR's interval estimate ──────────────────────────────────── */

function AccelChart({ w }) {
  const anth = find('accel', r => r.kind === 'interval')
  const all = find('accel', r => r.kind === 'point')
  const ref = reference('accel')
  const narrow = w < 480
  const m = { t: 26, r: 14, b: 22, l: narrow ? 0 : 150 }
  const rowH = narrow ? ACCEL_ROW_H.narrow : ACCEL_ROW_H.wide
  const h = m.t + 2 * rowH + m.b
  // Both layouts' heights, for the container query in RsiDashboard.css (narrow under 480px).
  const sizeVars = { '--rsi-accel-h': `${m.t + 2 * ACCEL_ROW_H.wide + m.b}px`, '--rsi-accel-h-narrow': `${m.t + 2 * ACCEL_ROW_H.narrow + m.b}px` }
  const x = scaleLinear().domain([0.8, 3]).range([m.l + 6, w - m.r])
  const rows = [
    { r: anth, color: C.accent, label: 'Anthropic’s models' },
    { r: all, color: C.ink2, label: 'All developers’ models' },
  ]
  return (
    <div className="rsi-chart">
      <svg
        {...svgSize(w, h)}
        className="rsi-accel__svg"
        style={sizeVars}
        role="img"
        aria-label={`Interval chart: METR estimates Anthropic's models gained capability ${anth.value} times as fast after October 2025 as before (95% interval ${anth.ci_low} to ${anth.ci_high}), and ${all.value} times as fast across all developers' models.`}
      >
        {[1, 1.5, 2, 2.5, 3].map(t => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={m.t} y2={h - m.b} stroke={t === ref.value ? 'none' : C.grid} />
            <text x={x(t)} y={h - 5} textAnchor="middle" fontSize="11" fill={C.ink3}>{`${t}x`}</text>
          </g>
        ))}
        <line x1={x(ref.value)} x2={x(ref.value)} y1={m.t - 6} y2={h - m.b} stroke={C.ink3} strokeDasharray="4 3" />
        <text x={x(ref.value) + 4} y={m.t - 10} fontSize="11" fill={C.ink2}>{narrow ? 'Earlier pace' : 'Same pace as before October 2025'}</text>
        {rows.map(({ r, color, label }, i) => {
          const cy = m.t + i * rowH + rowH / 2 + (narrow ? 10 : 0)
          return (
            <g key={label}>
              <text
                x={narrow ? x(0.8) : m.l}
                y={narrow ? cy - 26 : cy}
                dy={narrow ? 0 : '0.32em'}
                textAnchor={narrow ? 'start' : 'end'}
                dx={narrow ? 0 : -8}
                fontSize="12"
                fill={C.ink2}
                className="rsi-halo"
              >
                {label}
              </text>
              {r.ci_low != null && (
                <g stroke={color} strokeWidth="2">
                  <line x1={x(r.ci_low)} x2={x(r.ci_high)} y1={cy} y2={cy} />
                  <line x1={x(r.ci_low)} x2={x(r.ci_low)} y1={cy - 5} y2={cy + 5} />
                  <line x1={x(r.ci_high)} x2={x(r.ci_high)} y1={cy - 5} y2={cy + 5} />
                </g>
              )}
              <circle cx={x(r.value)} cy={cy} r="5" fill={color} stroke={C.paper} strokeWidth="1.2" />
              <text
                x={x(r.value)}
                y={cy - 11}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={C.ink}
                className="rsi-halo"
              >
                {`${r.value}x`}
              </text>
              {r.ci_low != null && !narrow && (
                <>
                  <text x={x(r.ci_low) - 6} y={cy} dy="0.32em" textAnchor="end" fontSize="11" fill={C.ink3}>{`${r.ci_low}x`}</text>
                  <text x={x(r.ci_high) + 6} y={cy} dy="0.32em" fontSize="11" fill={C.ink3}>{`${r.ci_high}x`}</text>
                </>
              )}
              {r.ci_low == null && (
                <text x={x(r.value) + 15} y={cy} dy="0.32em" fontSize="11" fill={C.ink3}>no interval given</text>
              )}
            </g>
          )
        })}
      </svg>
      {/* Stands in for the interval end labels, which the narrow layout drops. Always rendered and
          shown by a container query (RsiDashboard.css, under 480px like `narrow`), so the
          pre-rendered HTML already has this line on phones and hydration does not add it. */}
      <p className="rsi-chart__aside">Bar: 95% interval, {anth.ci_low}x to {anth.ci_high}x.</p>
    </div>
  )
}

/* ── Threshold strip ───────────────────────────────────────────────────── */

// Meter heights (full, compact); the compact one tightens the gaps around the bar.
const METER_H = { full: 46, compact: 40 }

function CoBenchMeter({ w, compact }) {
  const score = find('thresholds', r => r.kind === 'point')
  const line85 = find('thresholds', r => r.kind === 'reference')
  const h = compact ? METER_H.compact : METER_H.full
  // Vertical positions: labels above the bar, bar, end labels below.
  const v = compact ? { lab: 12, bar: 16, tickTop: 13, tickBot: 29, ends: 38 } : { lab: 13, bar: 18, tickTop: 14, tickBot: 32, ends: 43 }
  const x = scaleLinear().domain([0, 100]).range([0, w - 2])
  return (
    <svg
      {...svgSize(w, h)}
      className="rsi-svg"
      style={heightVars(METER_H.full, METER_H.compact)}
      role="img"
      aria-label={`Bar: ${score.label} scored ${score.value}% on CoBench 2.1; Anthropic puts a model able to replace its research staff at ${line85.value}% or more, a line set on the earlier version of the test.`}
    >
      <rect x="0" y={v.bar} width={x(100)} height="10" fill="none" stroke={C.rule} />
      <rect x="0" y={v.bar} width={x(score.value)} height="10" fill={C.ink2} />
      <text x={x(score.value) - 4} y={v.lab} textAnchor="end" fontSize="12" fontWeight="600" fill={C.ink}>{`${score.value}%`}</text>
      <line x1={x(line85.value)} x2={x(line85.value)} y1={v.tickTop} y2={v.tickBot} stroke={C.ink} strokeWidth="1.6" />
      <text x={x(line85.value)} y={v.lab} textAnchor="middle" fontSize="11" fill={C.ink2}>{`${line85.value}% line`}</text>
      <text x="0" y={v.ends} fontSize="11" fill={C.ink3}>0%</text>
      <text x={x(100)} y={v.ends} textAnchor="end" fontSize="11" fill={C.ink3}>100%</text>
    </svg>
  )
}

function Thresholds({ width }) {
  const cols = width >= 680 ? 3 : 1
  const cellW = cols === 3 ? (width - GAP * 2) / 3 : width
  const oa = find('thresholds', r => r.footnote === 's6-openai-th')
  const gg = find('thresholds', r => r.footnote === 's6-google-th')
  const co = find('thresholds', r => r.kind === 'point')
  const s1 = find('thresholds', r => r.footnote === 's6-s1')
  return (
    <div className="rsi-strip">
      <h4 className="rsi-strip__head">Each lab&rsquo;s own threshold for AI speeding up its research: none says it has been crossed</h4>
      {/* Columns come from @container figure queries in RsiDashboard.css (3 from 680px; below that
          OpenAI and Google side by side with Anthropic across both columns), so the pre-rendered
          HTML is laid out right at every width; `cols` here only sizes the meter. */}
      <div className="rsi-strip__grid">
        <div className="rsi-cell">
          <p className="rsi-cell__lab">OpenAI</p>
          <p className="rsi-cell__model">{oa.label}, {oa.date_label}</p>
          <p className="rsi-cell__status">Below &ldquo;High&rdquo;</p>
          <p className="rsi-cell__text">For AI self-improvement. The system card gives no numeric threshold.</p>
          <p className="rsi-cell__who"><TagChip tag="vendor" /><FootnoteRef id="s6-openai-th" /></p>
        </div>
        <div className="rsi-cell">
          <p className="rsi-cell__lab">Google DeepMind</p>
          <p className="rsi-cell__model">{gg.label}, {gg.date_label}</p>
          <p className="rsi-cell__status">Not reached</p>
          <p className="rsi-cell__text">Machine-learning research acceleration and automation, level 1 of each.</p>
          <p className="rsi-cell__who"><TagChip tag="vendor" /><FootnoteRef id="s6-google-th" /></p>
        </div>
        <div className="rsi-cell rsi-cell--anthropic">
          <p className="rsi-cell__lab">Anthropic</p>
          <p className="rsi-cell__model">{co.label}, {co.date_label}</p>
          <p className="rsi-cell__text">Score on an internal research-engineering test (CoBench 2.1) against the level Anthropic says a model able to replace its research staff would reach. Anthropic set that line on the earlier version of the test.</p>
          <CoBenchMeter w={Math.floor(Math.min(cellW, 420))} compact={width < COMPACT_BELOW} />
          <p className="rsi-cell__who"><TagChip tag="vendor" /><FootnoteRef id="s6-cobench" /></p>
          <p className="rsi-cell__text rsi-cell__text--filing">
            Yet its amended IPO filing ({s1.date_label}) says that, judging by its internal estimates and expectations for future models, it &ldquo;may
            imminently meet&rdquo; its threshold. No current model has been designated as exceeding it.
            <FootnoteRef id="s6-s1" />
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Data table ────────────────────────────────────────────────────────── */

const PANEL_NAMES = {
  metr: 'A. METR time horizon (frontier)',
  eci: 'A. Epoch Capabilities Index (frontier)',
  accel: 'B. METR assessment of Anthropic',
  google: 'C. Google: AI share of new code',
  'anthro-code': 'C. Anthropic: code written by Claude',
  speedup: 'C. Anthropic: training-code speedup test',
  openai: 'C. OpenAI: agent-workdays per human workday',
  thresholds: 'Thresholds',
}

function DataTable() {
  return (
    <details className="chart-data">
      <summary>Show the data</summary>
      <div className="table-wrap" tabIndex={0} role="region" aria-label="Data table: AI research acceleration indicators">
        <table>
          <thead>
            <tr>
              <th scope="col">Panel</th>
              <th scope="col">Item</th>
              <th scope="col">Date</th>
              <th scope="col">Value</th>
              <th scope="col">Who measured</th>
              <th scope="col">Source</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={i}>
                <td>{PANEL_NAMES[r.panel]}</td>
                <td>{r.kind === 'reference' ? `Reference line: ${r.label}` : r.label}</td>
                <td>{when(r)}</td>
                <td>{r.kind === 'status' ? r.note : valueText(r, { exact: true })}{r.kind !== 'status' && r.note ? ` (${r.note})` : ''}</td>
                <td>{r.measured_by}</td>
                <td><FootnoteRef id={r.footnote} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}

/* ── Main ──────────────────────────────────────────────────────────────── */

function Tier({ letter, title, desc, children }) {
  return (
    <div className="rsi-tier">
      <div className="rsi-tier__head">
        <span className="rsi-tier__letter" aria-hidden="true">{letter}</span>
        <div>
          <h4 className="rsi-tier__title"><span className="sr-only">Tier {letter}: </span>{title}</h4>
          <p className="rsi-tier__desc">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

// Columns come from @container figure queries in RsiDashboard.css (2 from 640px, matching `cols`
// in Dashboard), so the pre-rendered HTML stacks on phones before hydration.
function Grid({ children }) {
  return (
    <div className="rsi-grid">
      {children}
    </div>
  )
}

function Dashboard({ width }) {
  const w = Math.max(240, width)
  const compact = w < COMPACT_BELOW
  const cols = compact ? 1 : 2
  const pw = Math.floor(cols === 2 ? (w - GAP) / 2 : w)
  const tip = usePinnableTip()

  const metr = points('metr')
  const metrRef = reference('metr')
  const eci = points('eci')
  const google = points('google')
  const code = points('anthro-code')
  const speed = points('speedup')
  const speedRef = reference('speedup')
  const oaBound = find('openai', r => r.kind === 'bound')
  const oaPoint = find('openai', r => r.kind === 'point')
  const oaRef = reference('openai')
  const first = a => a[0]
  const last = a => a[a.length - 1]

  return (
    <div className="rsi">
      <Tier letter="A" title="Independent measurements" desc="Groups that do not sell models, publishing their own measurements.">
        <Grid>
          <Panel
            title="METR time horizon, best model"
            measure={<>Length of task, in skilled-human working time, that the best model completes half the time. Each step up the scale multiplies the length, so a straight line means it keeps doubling at a steady pace. Details in <a href="#s3">section 3</a>.</>}
            who="METR"
            tag="verified"
            footnote="s6-metr"
            note="Scores above 16 hours are unreliable, and no model newer than April 2026 has a reliable public time horizon."
          >
            <TimeChart
              w={pw}
              compact={compact}
              rows={metr}
              tip={tip}
              makeY={() => scaleLog().domain([2.5, 2400])}
              yTicks={[{ v: 10, text: '10 min' }, { v: 60, text: '1 h' }, { v: 480, text: '8 h' }]}
              refLine={{ v: metrRef.value, text: 'Above 16 h: unreliable', short: '16 h limit', below: true }}
              aria={`Line chart: METR's frontier time horizon rose from about ${minutes(first(metr).value)} (${first(metr).label}, ${monthYear(first(metr).date)}) to about ${minutes(last(metr).value)} (${last(metr).label}, ${monthYear(last(metr).date)}), past the 16-hour limit of reliable measurement.`}
              label={(r, i, n, narrow) =>
                i === 0 ? { text: narrow ? minutes(r.value) : `${minutes(r.value)} · ${r.label}`, anchor: 'start', dx: -3 }
                : i === n - 1 ? { text: narrow ? minutes(r.value) : `${minutes(r.value)} · Mythos Preview`, anchor: 'end', dx: 4, dy: -9 }
                : null}
            />
          </Panel>
          <Panel
            title="Epoch Capabilities Index, best model"
            measure="Best score on Epoch AI's index that combines many benchmarks, by model release date. Points on Epoch's own scale."
            who="Epoch AI"
            tag="verified"
            footnote="s6-eci"
            note={`About 14 points a year since September 2024, in a straight line (Epoch's fit). No public model has beaten ${last(eci).label}'s ${Math.round(last(eci).value)}.`}
          >
            <TimeChart
              w={pw}
              compact={compact}
              rows={eci}
              tip={tip}
              makeY={() => scaleLinear().domain([115, 175])}
              yTicks={[{ v: 120, text: '120' }, { v: 140, text: '140' }, { v: 160, text: '160' }]}
              aria={`Line chart: the best Epoch Capabilities Index score rose from GPT-4 (${monthYear(first(eci).date)}) to ${Math.round(last(eci).value)} (${last(eci).label}, ${monthYear(last(eci).date)}).`}
              label={(r, i, n, narrow) =>
                i === 0 ? { text: 'GPT-4', anchor: 'start', dx: -3 }
                : i === n - 1 ? { text: narrow ? String(Math.round(r.value)) : `${Math.round(r.value)} · ${r.label}`, anchor: 'end', dx: 4 }
                : null}
            />
          </Panel>
        </Grid>
      </Tier>

      <Tier
        letter="B"
        title="Independent analysis of private lab data"
        desc="An outside group's estimate from data the lab supplied. The lab redacted most of the evidence the outside group found most informative."
      >
        <Panel
          wide
          title="METR's assessment of Anthropic"
          measure="How fast Anthropic's models gained capability after October 2025, on Anthropic's own version of Epoch's index, as a multiple of the earlier pace (2x would be twice as fast). Dot: central estimate. Bar: 95% interval."
          who="METR, using Anthropic's partly redacted data"
          tag="estimate"
          footnote="s6-accel"
          note={<>Anthropic redacted a majority of the evidence METR found most informative. Other reasonable methods give as little as 1.1x (<a href="#s3">section 3</a>).</>}
        >
          <AccelChart w={w} />
        </Panel>
      </Tier>

      <Tier
        letter="C"
        title="Lab self-reports"
        desc="Unchecked by outsiders. Each company counts something different, so no two share an axis or a line."
      >
        <Grid>
          <Panel
            title="Google: AI share of new code"
            measure="Share of new code at Google that is AI-generated and approved by engineers."
            who="Google"
            tag="vendor"
            footnote="s6-google"
            note="New code is not the whole codebase."
          >
            <TimeChart
              w={pw}
              compact={compact}
              rows={google}
              tip={tip}
              xTicks="points"
              makeY={() => scaleLinear().domain([0, 100])}
              yTicks={[{ v: 0, text: '0%' }, { v: 50, text: '50%' }, { v: 100, text: '100%' }]}
              aria={`Line chart: Google says the AI-generated share of its new code went from more than a quarter (October 2024) to nearly half (October 2025) to 75% (April 2026).`}
              label={(r, i, n) => ({
                text: r.bound === 'gt' ? `>${r.value}%` : r.bound === 'approx' ? `~${r.value}%` : `${r.value}%`,
                anchor: i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle',
                dx: i === 0 ? -3 : i === n - 1 ? 3 : 0,
              })}
            />
          </Panel>
          <Panel
            title="Anthropic: code written by Claude"
            measure="Share of code written by Claude, on two different measures."
            who="Anthropic"
            tag="vendor"
            footnote="s6-anthro-code"
            note="&ldquo;Merged code&rdquo; and &ldquo;contributions&rdquo; are different measures that Anthropic does not define, so they are not joined. Before February 2025 the share was in the &ldquo;low single digits&rdquo;."
          >
            <BarChart
              w={pw}
              compact={compact}
              max={100}
              ticks={[0, 50, 100]}
              tickText={t => `${t}%`}
              aria={`Bar chart: Anthropic says Claude wrote more than ${code[0].value}% of code merged in May 2026, and more than ${code[1].value}% of contributions to its codebase in September 2026 (IPO filing).`}
              rows={[
                { ...code[0], rowLabel: 'May 2026: merged code', valueLabel: `more than ${code[0].value}%` },
                { ...code[1], rowLabel: pw < 330 ? 'Sep 2026: contributions (S-1)' : 'Sep 2026: contributions (IPO filing)', valueLabel: `more than ${code[1].value}%` },
              ]}
            />
          </Panel>
          <Panel
            title="Anthropic: training-code speedup test"
            measure="How many times faster Claude made model-training code run, on an internal test, by model release date."
            who="Anthropic"
            tag="vendor"
            footnote="s6-speedup"
            note="Anthropic calls the test saturated. A model found a way to game the timer; Anthropic says such runs were excluded from the scores. Not a real-world training speedup."
          >
            <TimeChart
              w={pw}
              compact={compact}
              rows={speed}
              tip={tip}
              xTicks="ends"
              compactH={124}
              makeY={() => scaleLinear().domain([0, 60])}
              yTicks={[{ v: 0, text: '0x' }, { v: 20, text: '20x' }, { v: 40, text: '40x' }, { v: 60, text: '60x' }]}
              refLine={{ v: speedRef.value, text: 'Skilled human, 4–8 h: about 4x', short: 'Human: ~4x', anchor: 'end', below: false }}
              aria={`Line chart: on Anthropic's internal test, its models went from making training code run about ${first(speed).value} times faster (${first(speed).label}, May 2025) to about ${Math.round(last(speed).value)} times faster (${last(speed).label}, April 2026), against about 4 times for a skilled human in four to eight hours.`}
              label={(r, i, n, narrow) =>
                i === 0 ? { text: narrow ? '~3x' : `~${r.value}x · Opus 4`, anchor: 'start', dx: -2, dy: -20 }
                : i === n - 1 ? { text: narrow ? `~${Math.round(r.value)}x` : `~${Math.round(r.value)}x · Mythos Preview`, anchor: 'end', dx: 4 }
                : null}
            />
          </Panel>
          <Panel
            title="OpenAI: agent time per human workday"
            measure="Agent working time logged across OpenAI's research organisation for every human workday (8-hour days)."
            who="OpenAI"
            tag="vendor"
            footnote="s6-openai"
            note="Counts how long agents run, many at once, not the quality of their work. Over half of successful 4–8 hour tasks still needed a human to step in."
          >
            <BarChart
              w={pw}
              compact={compact}
              max={3.5}
              ticks={[0, 1, 2, 3]}
              tickText={t => String(t)}
              refLine={{ v: oaRef.value, text: '1 = equal to human time', short: '1 = equal' }}
              aria={`Bar chart: OpenAI says agent runtime was below one workday per human workday before June 2026 and reached ${oaPoint.value} by mid-August 2026.`}
              rows={[
                { ...oaBound, rowLabel: 'Before June 2026 (upper bound)', valueLabel: 'below 1' },
                { ...oaPoint, rowLabel: 'Mid-August 2026', valueLabel: `${oaPoint.value}` },
              ]}
            />
          </Panel>
        </Grid>
      </Tier>

      <Thresholds width={w} />
    </div>
  )
}

export default function RsiDashboard() {
  return (
    <Figure
      id="s6-rsi-dashboard"
      title="The steepest curves come from the labs' own, unchecked numbers"
      subtitle="Signs that AI is speeding up the building of AI, grouped by who measured them. Each panel has its own scale and dates."
      notes={['s6-metr', 's6-eci', 's6-accel', 's6-google', 's6-anthro-code', 's6-speedup', 's6-openai', 's6-openai-th', 's6-google-th', 's6-cobench', 's6-s1']}
      source={<>METR; Epoch AI; Google; Anthropic; OpenAI. <a href="/data/rsi_series.csv">Download the data (CSV)</a>.</>}
      caveat="Code share and agent hours count activity, not research value. Each lab uses its own measure, some undefined. The labs' figures cannot be compared with one another."
    >
      {width => (
        <>
          <Dashboard width={width} />
          <DataTable />
        </>
      )}
    </Figure>
  )
}
