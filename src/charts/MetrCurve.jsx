// s3-metr-curve: METR 50% (optionally 80%) time horizon of frontier models, 2019 to April 2026.
// Data: src/data/metrCurve.json, built by scripts/data/metr_curve.mjs from research/data/metr_points.json
// and METR's raw data file. Horizons are in MINUTES of skilled-human working time.
import { useEffect, useRef, useState } from 'react'
import { scaleLog, scaleUtc } from 'd3-scale'
import { Figure, C, LegendItem, Tooltip, Segmented, utc, svgSize, usePinnableTip } from './kit.jsx'
import data from '../data/metrCurve.json'
import './MetrCurve.css'

const NOTES = ['s3-arc', 's3-mythos', 's3-others', 's3-doubling', 's3-16h', 's3-frozen', 's3-p80', 's3-sol']
const LIMIT = data.reliabilityLimitMinutes // 960 min = 16 h
const Y_DOMAIN = [0.0015, 8000] // minutes (0.09 s to 133 h); covers every plotted value and interval in both modes
const X_DOMAIN = [new Date(Date.UTC(2019, 0, 1)), new Date(Date.UTC(2027, 0, 1))]
const toDate = iso => new Date(iso + 'T00:00:00Z')

/** Minutes to a short human duration: 3 s, 4.0 min, 2.0 h, 17.4 h. */
function dur(min) {
  if (min < 1) { const s = min * 60; return `${s < 10 ? s.toFixed(1) : Math.round(s)} s` }
  if (min < 60) return `${min < 10 ? min.toFixed(1) : Math.round(min)} min`
  const h = min / 60
  return `${h < 100 ? h.toFixed(1) : Math.round(h)} h`
}
/** Minutes with enough decimals to keep sub-minute values readable (table only). */
const mins = v => (v < 1 ? v.toFixed(3) : v < 10 ? v.toFixed(2) : v.toFixed(1))
const dayFmt = iso => utc.dayMonthYear(toDate(iso))

// y ticks, in minutes
const TICKS = [
  { v: 1 / 60, wide: '1 sec', narrow: '1 s' },
  { v: 10 / 60, wide: '10 sec', narrow: '10 s' },
  { v: 1, wide: '1 min', narrow: '1 min' },
  { v: 10, wide: '10 min', narrow: '10 min' },
  { v: 60, wide: '1 hour', narrow: '1 h' },
  { v: 480, wide: '8 hours', narrow: '8 h', sub: 'work day', subNarrow: 'day' },
  { v: 2400, wide: '40 hours', narrow: '40 h', sub: 'work week', subNarrow: 'week' },
]

// Direct labels for the five models the manuscript names. pos is relative to the point's mark.
const LABELS = {
  p50: {
    gpt_4: { pos: 'left', wide: ['GPT-4'], narrow: ['GPT-4'] },
    o3_inspect: { pos: 'left', wide: ['o3'], narrow: ['o3'] },
    gpt_5_2025_08_07_inspect: { pos: 'below', wide: ['GPT-5'], narrow: ['GPT-5'] },
    claude_opus_4_6_inspect: { pos: 'leftAt', at: 1700, wide: ['Claude Opus 4.6'], narrow: ['Opus 4.6'] },
    claude_mythos_preview_early_inspect: { pos: 'leftAt', at: 4600, wide: ['Claude Mythos Preview (early)'], narrow: ['Mythos (early)'] },
  },
  p80: {
    gpt_4: { pos: 'left', wide: ['GPT-4'], narrow: ['GPT-4'] },
    o3_inspect: { pos: 'left', wide: ['o3'], narrow: ['o3'] },
    gpt_5_2025_08_07_inspect: { pos: 'below', wide: ['GPT-5'], narrow: ['GPT-5'] },
    claude_opus_4_6_inspect: { pos: 'leftAt', at: 270, wide: ['Claude Opus 4.6'], narrow: ['Opus 4.6'] },
    claude_mythos_preview_early_inspect: { pos: 'leftAt', at: 640, wide: ['Claude Mythos Preview (early)'], narrow: ['Mythos (early)'] },
  },
}

// Invisible hit circle radius: a 24px touch target around every point.
const HIT_R = 12

function Chart({ width, metric }) {
  // Hover, focus and tap-to-pin (kit.jsx). `width` starts at SSR_WIDE (Figure) on the server.
  const pt = usePinnableTip()
  // Switching between 50% and 80% drops any pin, hover or focus state: the pinned point may not be
  // plotted in the new view (GPT-5.6 Sol is 50% only), and a hidden pin would also block hover
  // tooltips there. A pointer press on the toggle already clears the pin; this covers the keyboard.
  const lastMetric = useRef(metric)
  useEffect(() => {
    if (lastMetric.current === metric) return
    lastMetric.current = metric
    pt.clear()
  }, [metric]) // eslint-disable-line react-hooks/exhaustive-deps
  const w = Math.max(280, width)
  const narrow = w < 560
  const tiny = w < 420
  const h = Math.round(Math.min(540, Math.max(380, w * 0.58)))
  const m = { top: 10, right: narrow ? 8 : 14, bottom: 26, left: narrow ? 42 : 66 }
  const x = scaleUtc().domain(X_DOMAIN).range([m.left, w - m.right])
  const y = scaleLog().domain(Y_DOMAIN).range([h - m.bottom, m.top])
  const isP50 = metric === 'p50'
  const val = d => (isP50 ? d.p50 : d.p80)
  const lo = d => (isP50 ? d.p50Lo : d.p80Lo)
  const hi = d => (isP50 ? d.p50Hi : d.p80Hi)
  const sota = data.models.filter(d => d.sota)
  const others = data.models.filter(d => !d.sota)
  const sol = data.sol
  const pre = data.trends.pre2024
  const post = data.trends.from2024
  const xFrozen = x(toDate(data.frozenDate))
  const years = []
  for (let yr = 2019; yr <= 2026; yr++) if (!tiny || yr % 2 === 1) years.push(yr)
  const fs = narrow ? 11 : 12

  // The Sol annotation is drawn in the 50% view only, so its tooltip is too (this also covers the one
  // render between a metric switch and the effect above clearing the pin).
  const hover = pt.datum && !(pt.datum.kind === 'sol' && !isP50) ? pt.datum : null

  // label geometry
  function labelProps(d, cfg) {
    const px = x(toDate(d.date)), py = y(val(d))
    const lines = narrow ? cfg.narrow : cfg.wide
    const n = lines.length
    switch (cfg.pos) {
      case 'left': return { x: px - 8, y: py + 4 - (n - 1) * 6.5, anchor: 'end', lines }
      case 'right': return { x: px + 8, y: py + 4 - (n - 1) * 6.5, anchor: 'start', lines }
      case 'above': return { x: px, y: y(hi(d)) - 6 - (n - 1) * 13, anchor: 'middle', lines }
      case 'below': return { x: px, y: y(lo(d)) + 14, anchor: 'middle', lines }
      case 'leftAt': return { x: px - 6, y: y(cfg.at) + 4, anchor: 'end', lines }
      default: return null
    }
  }

  const ariaLabel = isP50
    ? 'Log-scale chart of METR 50% time horizons for frontier AI models from 2019 to April 2026, rising from about 4 minutes for GPT-4 (March 2023) to 12 hours for Claude Opus 4.6 and 17 hours for an early Claude Mythos Preview; our fitted doubling time shortens from about 260 days before 2024 to about 105 days from 2024 on.'
    : 'Log-scale chart of METR 80% time horizons for the same frontier AI models, from GPT-4 (March 2023) to about 70 minutes for Claude Opus 4.6 and about 3 hours for an early Claude Mythos Preview.'

  const tip = hover && (() => {
    if (hover.kind === 'sol') {
      return {
        x: x(toDate(sol.date)), y: y(sol.p50),
        body: (
          <>
            <strong>{sol.name}</strong>
            <span className="metr-tip-row metr-tip-muted">Evaluated June 2026, released {dayFmt(sol.date)}</span>
            <span className="metr-tip-row">About 11.3 h (95% CI 5–40 h) if cheating counts as failure; over 270 h if it counts as success.</span>
            <span className="metr-tip-row metr-tip-muted">METR: not a robust measurement. Not in any fit.</span>
          </>
        ),
      }
    }
    const d = hover.d
    return {
      x: x(toDate(d.date)), y: y(val(d)),
      body: (
        <>
          <strong>{d.name}</strong>
          <span className="metr-tip-row metr-tip-muted">Release date {dayFmt(d.date)}{d.sota ? ' · state of the art' : ' · not state of the art'}</span>
          <span className="metr-tip-row">50% horizon: {dur(d.p50)} <span className="metr-tip-muted">({dur(d.p50Lo)}–{dur(d.p50Hi)})</span></span>
          <span className="metr-tip-row">80% horizon: {dur(d.p80)} <span className="metr-tip-muted">({dur(d.p80Lo)}–{dur(d.p80Hi)})</span></span>
          {d.date < '2023-01-01' && <span className="metr-tip-row metr-tip-muted">Older-suite (TH1.0) value that METR stitched into this series.</span>}
          {d.p50 > LIMIT && <span className="metr-tip-row metr-tip-muted">Above 16 h, where METR says scores are unreliable.</span>}
        </>
      ),
    }
  })()

  const legend = (
    <div className="metr-legend">
      <LegendItem color={C.ink} label={isP50 ? 'State of the art, with 95% interval' : 'State of the art at 50% (METR flag), with 95% interval'} />
      <LegendItem color={C.ink3} hollow label="Other models" />
      {/* Trend-line keys: always in the markup (so the server HTML has the same legend at every width);
          MetrCurve.css shows them only below 560px, where the plot drops its in-SVG trend labels. */}
      {isP50 && (
        <span className="metr-legend-trends">
          <LegendItem color={C.ink2} shape="line" dashed label="Trend before 2024: doubles every ~260 days" />
          <LegendItem color={C.accent} shape="line" label="Trend from 2024: doubles every ~105 days" />
        </span>
      )}
      {!isP50 && <span>Trend lines are fitted to 50% horizons only, so they are not shown here. Before Mythos Preview, Gemini 3.1 Pro (about 90 min) had the longest 80% horizon of the public models.</span>}
    </div>
  )

  return (
    <>
      {legend}
      <div className="metr-plot">
      <svg {...svgSize(w, h)} role="group" aria-label={ariaLabel}>
        {/* unreliable band above 16 h */}
        <rect x={m.left} y={y(Y_DOMAIN[1])} width={w - m.left - m.right} height={y(LIMIT) - y(Y_DOMAIN[1])} fill={C.grid} fillOpacity="0.7" />
        <line x1={m.left} x2={w - m.right} y1={y(LIMIT)} y2={y(LIMIT)} stroke={C.ink3} strokeWidth="1" strokeDasharray="3 3" />
        <text x={m.left + 6} y={y(LIMIT) - 7} fontSize={fs} fill={C.ink2}>
          {tiny ? 'Not reliable above 16 h' : 'METR: not reliable above 16 hours'}
        </text>

        {/* y grid + ticks */}
        {TICKS.map(t => (
          <g key={t.v}>
            <line x1={m.left} x2={w - m.right} y1={y(t.v)} y2={y(t.v)} stroke={C.grid} strokeWidth="1" />
            <text x={m.left - 6} y={y(t.v) + (t.sub ? 0 : 4)} textAnchor="end" fontSize="11" fill={C.ink3}>{narrow ? t.narrow : t.wide}</text>
            {t.sub && <text x={m.left - 6} y={y(t.v) + 12} textAnchor="end" fontSize="11" fill={C.ink3}>{narrow ? t.subNarrow : t.sub}</text>}
          </g>
        ))}

        {/* x axis */}
        <line x1={m.left} x2={w - m.right} y1={h - m.bottom} y2={h - m.bottom} stroke={C.rule} />
        {years.map(yr => {
          const xx = x(new Date(Date.UTC(yr, 0, 1)))
          return (
            <g key={yr}>
              <line x1={xx} x2={xx} y1={h - m.bottom} y2={h - m.bottom + 4} stroke={C.rule} />
              <text x={xx} y={h - m.bottom + 16} textAnchor={yr === 2019 ? 'start' : 'middle'} fontSize="11" fill={C.ink3}>{yr}</text>
            </g>
          )
        })}

        {/* METR stops updating */}
        <line x1={xFrozen} x2={xFrozen} y1={m.top} y2={h - m.bottom} stroke={C.ink3} strokeWidth="1" strokeDasharray="2 3" />
        <text x={xFrozen - 5} y={h - m.bottom - 22} textAnchor="end" fontSize={fs} fill={C.ink2} className="metr-halo">METR: no longer</text>
        <text x={xFrozen - 5} y={h - m.bottom - 8} textAnchor="end" fontSize={fs} fill={C.ink2} className="metr-halo">updated (8 Sep 2026)</text>

        {/* trend lines (fitted to 50% horizons only) */}
        {isP50 && (
          <g>
            <line x1={x(toDate(pre.start.date))} y1={y(pre.start.minutes)} x2={x(toDate(pre.end.date))} y2={y(pre.end.minutes)} stroke={C.ink2} strokeWidth="1.5" strokeDasharray="5 4" />
            <line x1={x(toDate(post.start.date))} y1={y(post.start.minutes)} x2={x(toDate(post.end.date))} y2={y(post.end.minutes)} stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" />
            {!narrow && (
              <>
                <text x={x(toDate('2020-09-01'))} y={y(0.045)} fontSize="12" fill={C.ink2}>
                  <tspan x={x(toDate('2020-09-01'))}>Before 2024: doubles</tspan>
                  <tspan x={x(toDate('2020-09-01'))} dy="15">every ~260 days</tspan>
                </text>
                <text x={x(toDate('2024-03-01'))} y={y(1.6)} fontSize="12" fill={C.accent} fontWeight="600">
                  <tspan x={x(toDate('2024-03-01'))}>From 2024: doubles</tspan>
                  <tspan x={x(toDate('2024-03-01'))} dy="15">every ~105 days</tspan>
                </text>
                <text x={x(toDate('2024-03-01'))} y={y(1.6) + 30} fontSize="11" fill={C.ink3}>our fit, points up to 16 h</text>
              </>
            )}
          </g>
        )}

        {/* other (non-state-of-the-art) models: faint, no whiskers */}
        {others.map(d => (
          <g key={d.key} {...pt.bind(d.key, { d, kind: 'pt' }, { label: d.name })} className="metr-pt"
            aria-label={`${d.name} (not state of the art), ${dayFmt(d.date)}: ${isP50 ? '50%' : '80%'} horizon ${dur(val(d))}, 95% interval ${dur(lo(d))} to ${dur(hi(d))}`}>
            <circle cx={x(toDate(d.date))} cy={y(val(d))} r={narrow ? 2.5 : 3} fill="none" stroke={C.ink3} strokeWidth="1" opacity="0.8" />
            <circle className="metr-ring" cx={x(toDate(d.date))} cy={y(val(d))} r="6" />
            <circle cx={x(toDate(d.date))} cy={y(val(d))} r={HIT_R} fill="transparent" />
          </g>
        ))}

        {/* state-of-the-art points with 95% intervals */}
        {sota.map(d => {
          const px = x(toDate(d.date))
          return (
            <g key={d.key} {...pt.bind(d.key, { d, kind: 'pt' }, { label: d.name })} className="metr-pt"
              aria-label={`${d.name}, ${dayFmt(d.date)}: ${isP50 ? '50%' : '80%'} horizon ${dur(val(d))}, 95% interval ${dur(lo(d))} to ${dur(hi(d))}`}>
              <line x1={px} x2={px} y1={y(lo(d))} y2={y(hi(d))} stroke={C.ink2} strokeWidth="1" />
              <circle cx={px} cy={y(val(d))} r={narrow ? 3 : 3.5} fill={C.ink} />
              <circle className="metr-ring" cx={px} cy={y(val(d))} r="7" />
              <circle cx={px} cy={y(val(d))} r={HIT_R} fill="transparent" />
            </g>
          )
        })}

        {/* GPT-5.6 Sol: hand-entered annotation, not a robust measurement (s3-sol) */}
        {isP50 && (() => {
          const sx = x(toDate(sol.date))
          const top = narrow ? y(0.6) : y(30)
          const lines = tiny ? ['GPT-5.6 Sol: ~11 h', 'if cheating fails;', 'not robust'] : ['GPT-5.6 Sol: ~11 h if', 'cheating counts as', 'failure (not robust)']
          return (
            <g {...pt.bind('sol', { d: null, kind: 'sol' }, { label: sol.name })} className="metr-pt" aria-label="GPT-5.6 Sol, evaluated June 2026: about 11.3 hours (95% interval 5 to 40 hours) if cheating counts as failure, over 270 hours if it counts as success; METR says neither is robust.">
              <line x1={sx} x2={sx} y1={y(sol.p50Lo)} y2={y(sol.p50Hi)} stroke={C.ink3} strokeWidth="1" strokeDasharray="2 2" />
              <circle cx={sx} cy={y(sol.p50)} r="3.5" fill={C.paper} stroke={C.ink2} strokeWidth="1.4" />
              <circle className="metr-ring" cx={sx} cy={y(sol.p50)} r="7" />
              <circle cx={sx} cy={y(sol.p50)} r={HIT_R} fill="transparent" />
              <line x1={sx} x2={sx} y1={y(sol.p50Lo) + 3} y2={top - 12} stroke={C.ink3} strokeWidth="0.75" />
              <text x={sx + 4} y={top} textAnchor="end" fontSize="11" fill={C.ink2} className="metr-halo">
                {lines.map((l, i) => <tspan key={i} x={sx + 4} dy={i === 0 ? 0 : 13}>{l}</tspan>)}
              </text>
            </g>
          )
        })()}

        {/* direct labels */}
        {sota.filter(d => d.label).map(d => {
          const cfg = LABELS[metric][d.key]
          const p = labelProps(d, cfg)
          const px = x(toDate(d.date))
          // leader from a label set above the whisker top down to the whisker
          const lead = cfg.pos === 'leftAt' && y(cfg.at) < y(hi(d)) - 2
          return (
            <g key={d.key} aria-hidden="true">
              {lead && <line x1={p.x + 2} y1={p.y - 4} x2={px} y2={y(hi(d)) - 2} stroke={C.ink3} strokeWidth="0.75" />}
              <text x={p.x} y={p.y} textAnchor={p.anchor} fontSize={fs} fill={C.ink} fontWeight="600" className="metr-halo">
                {p.lines.map((l, i) => <tspan key={i} x={p.x} dy={i === 0 ? 0 : 13}>{l}</tspan>)}
              </text>
            </g>
          )
        })}
      </svg>
      {tip && <Tooltip x={tip.x} y={tip.y} width={w} {...pt.tipProps}>{tip.body}</Tooltip>}
      </div>
    </>
  )
}

function DataTable() {
  const rows = [...data.models].sort((a, b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name))
  return (
    <details className="chart-data">
      <summary>Show the data</summary>
      <div className="table-wrap" tabIndex={0} role="region" aria-label="Data table: METR time horizons">
        <table className="metr-table">
          <thead>
            <tr><th>Model</th><th>Release date</th><th>50% horizon, min (95% CI)</th><th>80% horizon, min (95% CI)</th><th>State of the art</th><th>Source</th></tr>
          </thead>
          <tbody>
            {rows.map(d => (
              <tr key={d.key}>
                <td>{d.name}</td>
                <td className="metr-num">{d.date}</td>
                <td className="metr-num">{mins(d.p50)} ({mins(d.p50Lo)}–{mins(d.p50Hi)}) ≈ {dur(d.p50)}</td>
                <td className="metr-num">{mins(d.p80)} ({mins(d.p80Lo)}–{mins(d.p80Hi)}) ≈ {dur(d.p80)}</td>
                <td>{d.sota ? 'Yes' : 'No'} (METR flag, 50%)</td>
                <td>METR file [{d.source}, {d.sourceP80}]</td>
              </tr>
            ))}
            <tr>
              <td>{data.sol.name} (annotation only)</td>
              <td>{data.sol.date} (evaluated June 2026)</td>
              <td>about 11.3 h (5–40 h), cheating scored as failure; over 270 h if scored as success (the 270 h figure is not plotted)</td>
              <td>not published</td>
              <td>n/a</td>
              <td>METR, 26 Jun 2026: not robust [{data.sol.source}]</td>
            </tr>
            <tr>
              <td>Trend before 2024 (our fit)</td>
              <td>{data.trends.pre2024.start.date} to {data.trends.pre2024.end.date}</td>
              <td>doubling every {data.trends.pre2024.doublingDays.toFixed(1)} days (n={data.trends.pre2024.n})</td>
              <td>not fitted</td>
              <td>State-of-the-art points up to 16 h</td>
              <td>Our calculation [{data.trends.pre2024.source}]</td>
            </tr>
            <tr>
              <td>Trend from 2024 (our fit)</td>
              <td>{data.trends.from2024.start.date} to {data.trends.from2024.end.date}</td>
              <td>doubling every {data.trends.from2024.doublingDays.toFixed(1)} days (n={data.trends.from2024.n})</td>
              <td>not fitted</td>
              <td>State-of-the-art points up to 16 h</td>
              <td>Our calculation [{data.trends.from2024.source}]</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
  )
}

export default function MetrCurve() {
  const [metric, setMetric] = useState('p50')
  return (
    <Figure
      id="s3-metr-curve"
      title="From 2024 to early 2026, the length of task AI agents can finish half the time doubled about every 3½ months, faster than the 8½ months before 2024"
      subtitle={metric === 'p50'
        ? 'METR time horizon: the length of a software task, in a skilled person\'s working time, that each model completes half the time. By release date, with 95% uncertainty ranges. Each step up the time axis is a multiple, not a fixed amount. Trend lines are our fit.'
        : 'METR 80% time horizon: the length of a software task, in a skilled person\'s working time, that each model completes four times in five. By release date, with 95% uncertainty ranges. Each step up the time axis is a multiple, not a fixed amount.'}
      notes={NOTES}
      source="METR Time Horizon 1.1 data file (last model added 8 May 2026); trend lines our calculation"
      caveat="METR says scores above 16 hours are unreliable. It added its last model in May 2026, and on 8 September 2026 it marked its leaderboard as no longer updated. So no model newer than April 2026 has a reliable public time horizon. Our fits treat points with wide uncertainty ranges as exact."
    >
      {width => (
        <>
          <div className="metr-controls">
            <Segmented
              label="Success rate shown"
              options={[{ value: 'p50', label: '50% success' }, { value: 'p80', label: '80% success' }]}
              value={metric}
              onChange={setMetric}
            />
          </div>
          <Chart width={width} metric={metric} />
          <DataTable />
        </>
      )}
    </Figure>
  )
}
