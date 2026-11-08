// s1-forecast-dumbbell: forecasts against outcomes for a set of AI questions.
// Data: src/data/forecast_vs_actual.json, built by scripts/data/build_forecast_vs_actual.py
// from research/topics/r1-perception.md and the s1 footnotes.
import { scaleLinear } from 'd3-scale'
import { Figure, C, LegendItem, Tooltip, svgSize, usePinnableTip } from './kit.jsx'
import { FootnoteRef } from '../components/Footnotes.jsx'
import data from '../data/forecast_vs_actual.json'
import './ForecastDumbbell.css'

// Short plain-English descriptions for the row labels (wording only, no values).
const SHORT = {
  'livecodebench-pro-hard': 'Hard contest coding',
  cybench: 'Cybersecurity tasks',
  'frontiermath-leap': 'Very hard maths',
  osworld: 'Everyday computer tasks',
  'frontiermath-aidigest': 'Very hard maths',
  'swe-bench-verified': 'Fixing real software bugs',
  'bio-uplift': 'Students finishing 3 tasks',
  'metr-80-horizon': 'Task length at 80% success',
}
const panelShort = p => (p.startsWith('FRI LEAP') ? 'FRI panel' : p.startsWith('AI Digest') ? 'AI Digest' : 'FRI')
const SOURCE_NAME = {
  'https://forecastingresearch.org/research/ai-progress-accuracy-update': 'FRI, 22 Sep 2026',
  'https://theaidigest.org/2025-forecast-results': 'AI Digest, 16 Jan 2026',
}
const DIR = {
  above: { color: C.accent, heading: 'Outcome above the forecast', word: 'Above forecast' },
  below: { color: C.ink, heading: 'Outcome below the forecast', word: 'Below forecast' },
  unresolved: { color: C.ink3, heading: 'Not yet resolved (measured in hours)', word: 'Unresolved' },
}

const v = (x, unit) => `${x}${unit === 'h' ? ' h' : '%'}`
const values = r => r.forecasts.map(f => f.value)
const nearest = r => values(r).reduce((a, b) => (Math.abs(b - r.actual) < Math.abs(a - r.actual) ? b : a))
const gap = r => Math.abs(r.actual - nearest(r))
// The row's change label: outcome minus the closest forecast, '+40 points' or '−0.3 h'.
const gapText = r => {
  const d = r.actual - nearest(r)
  const a = Math.abs(d)
  const n = a >= 10 ? Math.round(a) : Math.round(a * 10) / 10
  return `${d >= 0 ? '+' : '−'}${n}${r.unit === 'h' ? ' h' : ' points'}`
}
const textW = (s, px) => s.length * px * 0.56
// Lower-case only the first letter, so month names such as 'May' keep their capital.
const lowerFirst = s => s.charAt(0).toLowerCase() + s.slice(1)
// 'experts 14%, superforecasters 12%' for several groups; just '62%' for a single survey forecast.
const forecastList = r => (r.forecasts.length === 1
  ? v(r.forecasts[0].value, r.unit)
  : r.forecasts.map(f => `${lowerFirst(f.group)} ${v(f.value, r.unit)}`).join(', '))
const rowName = r => `${r.label} (${panelShort(r.panel)})`
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']

const above = data.rows.filter(r => r.direction === 'above').sort((a, b) => gap(b) - gap(a))
const below = data.rows.filter(r => r.direction === 'below').sort((a, b) => gap(b) - gap(a))
const unresolved = data.unresolved

export default function ForecastDumbbell() {
  return (
    <Figure
      id="s1-forecast-dumbbell"
      title="Most of these forecasts underestimated AI progress, but not all of them"
      subtitle={`What forecasters predicted for ${WORDS[data.rows.length] ?? data.rows.length} AI questions, and what happened. Most rows are test scores; the biosecurity row is the share of students who finished the tasks with AI help.`}
      legend={<>
        <LegendItem color={C.ink2} hollow label="Forecast (where groups differed, the closest one)" />
        <LegendItem color={C.accent} label="Outcome above forecast" />
        <LegendItem color={C.ink} label="Outcome below forecast" />
        <span className="legend-item">+/− points: how far the outcome landed from the forecast</span>
      </>}
      notes={data.notes}
      source="Forecasting Research Institute (22 September 2026); AI Digest with Epoch AI (16 January 2026)"
      caveat="These are selected questions. Forecasts that were too low show up sooner than ones that were too high, and the AI Digest forecasters leaned optimistic."
    >
      {width => <Chart width={width} />}
    </Figure>
  )
}

// Row height in the side-by-side (wide) and stacked layouts.
const ROW_H = { wide: 46, stacked: 66 }

function Chart({ width }) {
  // Hover or focus shows a row's details; click, tap, Enter or Space pins them (see kit.jsx).
  const tip = usePinnableTip()
  const w = Math.max(240, width) // never wider than the column (a 300px screen leaves 268px)
  const stacked = w < 640
  const labelW = stacked ? 0 : 248
  const rowH = stacked ? ROW_H.stacked : ROW_H.wide
  const markDy = stacked ? 47 : 23 // dumbbell y within a row
  const headH = 30
  const axisH = 30
  const x0 = labelW + (stacked ? 0 : 12) + 34
  const x1 = w - 16

  const xPct = scaleLinear().domain([0, 100]).range([x0, x1])
  const xHrs = scaleLinear().domain([0, 4]).range([x0, x1])

  // Vertical layout
  let y = 0
  const blocks = []
  const place = (rows, dir, scale) => {
    const head = y
    y += headH
    const items = rows.map(r => {
      const top = y
      y += rowH
      return { r, top, cy: top + markDy, dir, scale }
    })
    return { head, items, dir }
  }
  const pctTop = y
  blocks.push(place(above, 'above', xPct))
  blocks.push(place(below, 'below', xPct))
  const pctBottom = y + 4
  y += 4
  const pctAxisY = y
  y += axisH + 14
  const hrsTop = y
  blocks.push(place(unresolved, 'unresolved', xHrs))
  const hrsBottom = y + 4
  y += 4
  const hrsAxisY = y
  y += axisH
  const height = y

  const all = blocks.flatMap(b => b.items)
  const act = tip.datum
  // Height of both layouts (only the row height differs), so ForecastDumbbell.css can reserve the
  // hydrated height before JavaScript runs: the server draws the wide layout, phones get stacked.
  const baseH = height - all.length * rowH
  const sizeVars = { '--fdb-h': `${baseH + all.length * ROW_H.wide}px`, '--fdb-h-stacked': `${baseH + all.length * ROW_H.stacked}px` }

  const nAbove = above.length, nBelow = below.length
  const ties = all.filter(it => it.r.nearTie).map(it => it.r)
  const tieText = ties.length ? `, though ${ties.map(r => `${rowName(r)} was ${r.note}`).join(' and ')}` : ''
  const aria = `Dumbbell chart comparing forecasts with outcomes for ${nAbove + nBelow} AI questions: the outcome came in above the forecast for ${nAbove} (${above.map(rowName).join(', ')})${tieText}, and below it for ${nBelow} (${below.map(rowName).join(', ')}); a separate ${unresolved.map(r => r.label).join(', ')} question, measured in hours, is not yet resolved.`

  return (
    <>
      {/* role="group", not "img": the rows inside are buttons, which an img would hide. */}
      <svg {...svgSize(w, height)} className="fdb-svg" style={sizeVars} role="group" aria-label={aria}>
        <Axis scale={xPct} ticks={[0, 25, 50, 75, 100]} unit="%" axisY={pctAxisY}
          spans={stacked ? spansFor(blocks.slice(0, 2), rowH, pctBottom) : [[pctTop + headH - 6, pctBottom]]} />
        <Axis scale={xHrs} ticks={[0, 1, 2, 3, 4]} unit="h" axisY={hrsAxisY}
          spans={stacked ? spansFor(blocks.slice(2), rowH, hrsBottom) : [[hrsTop + headH - 6, hrsBottom]]} />

        {blocks.map(b => (
          <g key={b.dir}>
            <text x={0} y={b.head + 19} fontSize={12} fontWeight={600} fill={DIR[b.dir].color}>
              {DIR[b.dir].heading}
              {b.dir !== 'unresolved' && <tspan dx={8} fill={C.ink3} fontWeight={400}>{`${b.items.length} questions`}</tspan>}
            </text>
            {b.items.map(it => (
              <Row key={it.r.id} it={it} w={w} rowH={rowH} stacked={stacked} x0={x0}
                active={tip.active === it.r.id}
                bindProps={tip.bind(it.r.id, it, { label: `Details: ${rowName(it.r)}` })} />
            ))}
          </g>
        ))}
      </svg>
      {act && (
        <Tooltip x={act.scale(act.r.actual)} y={act.cy} width={w} {...tip.tipProps}>
          <TipBody r={act.r} />
        </Tooltip>
      )}
      <DataTable />
    </>
  )
}

// In the stacked (narrow) layout the row labels sit above the marks, so guide lines are drawn
// only in the band under each label instead of running through the text.
function spansFor(blocks, rowH, bottom) {
  const items = blocks.flatMap(b => b.items)
  return items.map((it, i) => [it.top + 35, i === items.length - 1 ? bottom : Math.min(it.top + rowH, items[i + 1].top + 2)])
}

function Axis({ scale, ticks, unit, spans, axisY }) {
  const bottom = spans[spans.length - 1][1]
  return (
    <g aria-hidden="true">
      {ticks.map(t => (
        <g key={t}>
          {spans.map(([a, b]) => (
            <line key={a} x1={scale(t)} x2={scale(t)} y1={a} y2={b} stroke={t === 0 ? C.rule : C.grid} strokeWidth={1} />
          ))}
          <text x={scale(t)} y={axisY + 14} fontSize={11} fill={C.ink3} textAnchor="middle">
            {unit === '%' ? `${t}%` : `${t} h`}
          </text>
        </g>
      ))}
      <line x1={scale(ticks[0])} x2={scale(ticks[ticks.length - 1])} y1={bottom} y2={bottom} stroke={C.rule} strokeWidth={1} />
    </g>
  )
}

function Row({ it, w, rowH, stacked, x0, active, bindProps }) {
  const { r, top, cy, dir, scale } = it
  const color = DIR[dir].color
  // One forecast mark per row: where forecaster groups differed, the one closest to the outcome
  // (the smallest miss). Every group's forecast is in the tooltip and the data table.
  const near = nearest(r)
  const xa = scale(r.actual)
  const xn = scale(near)
  const actualRight = r.actual >= near
  const fText = v(near, r.unit)
  const aText = `${v(r.actual, r.unit)} · ${gapText(r)}`

  // Forecast label on the outer side of the forecast marks, outcome label on the outer side of its dot.
  let fx = actualRight ? xn - 8 : xn + 8
  let fAnchor = actualRight ? 'end' : 'start'
  let fy = cy + 4
  // Not enough room beside the marks: put the forecast label under them instead.
  if ((!actualRight && fx + textW(fText, 11) > w) || (actualRight && fx - textW(fText, 11) < x0 - 26)) {
    fx = xn; fAnchor = 'middle'; fy = cy + 19
  }
  let ax = actualRight ? xa + 10 : xa - 10
  let aAnchor = actualRight ? 'start' : 'end'
  let ay = cy + 4
  if (!actualRight && ax - textW(aText, 12) < x0 - 26) { ax = xa; aAnchor = 'middle'; ay = cy + 20 }
  if (actualRight && ax + textW(aText, 12) > w) { ax = xa; aAnchor = 'middle'; ay = cy + 20 }

  const labelX = 0
  const nameY = stacked ? top + 15 : cy - 3
  const subY = stacked ? top + 29 : cy + 11
  const sub = `${SHORT[r.id] ?? r.what}, ${r.deadline}`
  const summary = `${r.label}, ${r.panel}, ${r.deadline}: forecast ${forecastList(r)}; ${dir === 'unresolved' ? 'measured so far' : 'outcome'} ${v(r.actual, r.unit)}${r.asOf ? `, ${r.asOf}` : ''} (${lowerFirst(r.actualNote)})${r.nearTie ? `, ${r.note}` : ''}. ${r.status}.`

  return (
    <g {...bindProps} className="fdb-row" aria-label={summary}>
      {/* Full-row hit area (at least 42px tall), so a tap anywhere on the row pins its details. */}
      <rect className="fdb-hit" x={-4} y={top + 2} width={w + 4} height={rowH - 4} rx={4}
        fill={active ? C.grid : 'transparent'} fillOpacity={active ? 0.7 : 0} />
      <text x={labelX} y={nameY} fontSize={12} fontWeight={600} fill={C.ink}>
        {r.label}
        <tspan dx={6} fontWeight={400} fontSize={11} fill={C.ink3}>{panelShort(r.panel)}</tspan>
      </text>
      <text x={labelX} y={subY} fontSize={11} fill={C.ink3}>{sub}</text>

      {/* connector from the nearest forecast to the outcome */}
      <line x1={xn} x2={xa} y1={cy} y2={cy} stroke={color} strokeWidth={2}
        strokeDasharray={dir === 'unresolved' ? '3 3' : undefined} />
      <circle cx={xn} cy={cy} r={4.5} fill={C.paper} stroke={C.ink2} strokeWidth={1.5} />
      <circle cx={xa} cy={cy} r={6} fill={color} />

      <text x={fx} y={fy} fontSize={11} fill={C.ink2} textAnchor={fAnchor}>{fText}</text>
      <text x={ax} y={ay} fontSize={12} fontWeight={600} fill={color} textAnchor={aAnchor}>{aText}</text>
    </g>
  )
}

function TipBody({ r }) {
  return (
    <>
      <strong className="fdb-tip-line">{r.label}</strong>
      <span className="fdb-tip-line fdb-tip-muted">{r.what}, {r.deadline}</span>
      <span className="fdb-tip-line fdb-tip-muted">Forecasters: {r.panel}</span>
      <span className="fdb-tip-line">
        Forecast: {forecastList(r)}
      </span>
      <span className="fdb-tip-line">{r.direction === 'unresolved' ? 'Measured so far' : 'Outcome'}: <strong>{v(r.actual, r.unit)}</strong> ({lowerFirst(r.actualNote)}), {gapText(r)} from the {r.forecasts.length > 1 ? 'closest forecast' : 'forecast'}</span>
      {r.nearTie && <span className="fdb-tip-line fdb-tip-muted">Near tie: {r.note}.</span>}
      {r.status !== 'Resolved' && <span className="fdb-tip-line fdb-tip-muted">{r.status}.</span>}
    </>
  )
}

function DataTable() {
  const rows = [...above, ...below, ...unresolved]
  return (
    <details className="chart-data">
      <summary>Show the data</summary>
      <div className="table-wrap" tabIndex={0} role="region" aria-label="Data table: forecasts and outcomes">
        <table className="fdb-table">
          <thead>
            <tr>
              <th scope="col">Question</th>
              <th scope="col">Forecaster, deadline</th>
              <th scope="col" className="fdb-num">Forecast</th>
              <th scope="col" className="fdb-num">Outcome or latest</th>
              <th scope="col">Result</th>
              <th scope="col">Source</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.label}<br /><span className="fdb-tip-muted">{r.what}</span></td>
                <td>{r.panel}, {r.deadline}</td>
                <td className="fdb-num fdb-wrap">
                  {r.forecasts.map(f => <div key={f.group}>{f.group}: {v(f.value, r.unit)}</div>)}
                </td>
                <td className="fdb-num">{v(r.actual, r.unit)}<br /><span className="fdb-tip-muted">{r.actualNote}</span></td>
                <td>{r.direction === 'unresolved' ? `${r.status}.` : `${DIR[r.direction].word}${r.nearTie ? `, ${r.note}` : ''}.${r.status === 'Resolved' ? '' : ` ${r.status}.`}`}</td>
                <td className="fdb-src">
                  <a href={r.url}>{SOURCE_NAME[r.url] ?? r.url}</a>
                  {r.footnote && <FootnoteRef id={r.footnote} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}
