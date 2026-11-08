// s7: a 2x2 explanatory matrix of AI-driven weight changes.
// Columns: whose weights change. Rows: how. Plus a strip for code-level self-modification.
// Content is built and source-checked by scripts/data/build-weights-matrix.mjs.
import { Figure, TagChip } from './kit.jsx'
import { FootnoteRef } from '../components/Footnotes.jsx'
import { TAGS } from '../lib/manuscript.js'
import data from '../data/weightsMatrix.json'
import './WeightsMatrix.css'

const colById = Object.fromEntries(data.columns.map(c => [c.id, c]))
const rowById = Object.fromEntries(data.rows.map(r => [r.id, r]))
const cellAt = (row, col) => data.cells.find(c => c.row === row && c.col === col)

const NOTE_IDS = [...new Set([...data.cells, data.strip].flatMap(c => c.entries.flatMap(e => e.footnotes)))]

function Chips({ ids }) {
  return <span className="wm-chips">{ids.map(id => <FootnoteRef key={id} id={id} />)}</span>
}

function Entry({ e }) {
  const meta = [e.who, e.when].filter(Boolean).join(', ')
  return (
    <li className={`wm-entry${e.highlight ? ' wm-entry--hl' : ''}`}>
      {e.highlight && <span className="wm-entry__flag">{e.highlight}</span>}
      <span className="wm-entry__head">
        <strong className="wm-entry__name">{e.name}</strong>
        {meta && <span className="wm-entry__meta">{meta}</span>}
        <Chips ids={e.footnotes} />
      </span>
      <span className="wm-entry__text">{e.text}</span>
    </li>
  )
}

function Cell({ cell }) {
  const col = colById[cell.col]
  const row = rowById[cell.row]
  // Shown on the stacked cards; visually hidden (still read out) where the grid has headers.
  const axes = (
    <span className="wm-axes">
      <span className="wm-axes__item"><span className="wm-axes__k">Whose:</span> {col.label}</span>
      <span className="wm-axes__item"><span className="wm-axes__k">How:</span> {row.label.replace(/^Through /, '').replace(/^./, s => s.toUpperCase())}</span>
    </span>
  )
  if (cell.kind === 'empty') {
    const e = cell.entries[0]
    return (
      <div className="wm-cell wm-cell--empty">
        {axes}
        <p className="wm-empty__title">{cell.lead}</p>
        <p className="wm-empty__text">{e.text} <Chips ids={e.footnotes} /></p>
      </div>
    )
  }
  return (
    <div className={`wm-cell wm-cell--${cell.kind}`}>
      {axes}
      <p className="wm-cell__lead">{cell.lead}</p>
      <ul className="wm-entries">{cell.entries.map(e => <Entry key={e.id} e={e} />)}</ul>
    </div>
  )
}

function Strip() {
  const s = data.strip
  return (
    <aside className="wm-strip" aria-label={s.label}>
      <p className="wm-strip__label">{s.label}</p>
      <p className="wm-strip__lead">{s.lead}</p>
      <ul className="wm-entries">{s.entries.map(e => <Entry key={e.id} e={e} />)}</ul>
    </aside>
  )
}

function Matrix() {
  const [own, other] = data.columns
  const summary =
    'A two-by-two grid. A model changing its own weights through training: SEAL and MASS. ' +
    "Another model's weights changed through training: ordinary training run by people, on data written by another model such as GPT-4.1 or on user data as with Cursor Tab. " +
    'A model directly editing its own weights: no public demonstration found. ' +
    "Another model's weights directly edited: ROME and MEMIT, weight generators such as Text-to-LoRA, and the November 2026 MIT CSAIL result in which GPT-6 Astra edited Qwen3.5-0.8B. " +
    'Separately, agents that rewrite their own code but not their weights: Darwin Gödel Machine and AlphaEvolve.'

  // One markup at every width; WeightsMatrix.css switches between the stacked cards (< 640px),
  // the 2x2 grid (640-879px) and the grid with the strip beside it (>= 880px) with container
  // queries, so the pre-rendered HTML is right on any screen before hydration.
  return (
    <div className="wm">
      <p className="sr-only">{summary}</p>
      <div className="wm-grid">
        <div className="wm-corner" aria-hidden="true">
          <span>Whose weights change →</span>
          <span>How ↓</span>
        </div>
        <div className="wm-colhead">{own.label}</div>
        <div className="wm-colhead">{other.label}</div>
        {data.rows.map(r => [
          <div key={`${r.id}-h`} className="wm-rowhead">
            <span className="wm-rowhead__label">{r.label}</span>
            <span className="wm-rowhead__sub">{r.sub}</span>
          </div>,
          ...data.columns.map(c => <Cell key={`${r.id}-${c.id}`} cell={cellAt(r.id, c.id)} />),
        ])}
      </div>
      <Strip />
    </div>
  )
}

function DataTable() {
  const rowsOut = [
    ...data.rows.flatMap(r => data.columns.map(c => ({ where: `${c.label} · ${r.label.toLowerCase()}`, cell: cellAt(r.id, c.id) }))),
    { where: data.strip.label, cell: data.strip },
  ].flatMap(({ where, cell }) => cell.entries.map(e => ({ where, e })))
  return (
    <details className="chart-data">
      <summary>Show the data</summary>
      <div className="table-wrap" tabIndex={0} role="region" aria-label="Data table: changes to model weights">
        <table>
          <thead>
            <tr><th>Cell</th><th>Example</th><th>What it is</th><th>Source</th></tr>
          </thead>
          <tbody>
            {rowsOut.map(({ where, e }) => (
              <tr key={e.id}>
                <td>{where}</td>
                <td>{e.name}{(e.who || e.when) && <><br />{[e.who, e.when].filter(Boolean).join(', ')}</>}</td>
                <td>{e.text}</td>
                <td>
                  {e.sources.map(s => (
                    <span key={s.id} className="wm-src">
                      <FootnoteRef id={s.id} /> <TagChip tag={TAGS[s.tag]?.key} />
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}

export default function WeightsMatrix() {
  return (
    <Figure
      id="s7-weights-matrix"
      title="In public work, models change their own weights only by training on material they wrote"
      subtitle="Every direct edit we found was to another model. Published examples, sorted by whose weights change (columns) and how (rows). A grouping, not a measurement."
      notes={NOTE_IDS}
      source="Section 7 sources; grouping from our research notes"
      caveat="The MIT result is a blog post, not peer-reviewed. Most of its gain came from repairing a fault that made the small model repeat itself."
    >
      <Matrix />
      <DataTable />
    </Figure>
  )
}
