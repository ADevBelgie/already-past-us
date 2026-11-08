// Section 0: three stat cards. Two results past the best humans (ICPC 2025, the Erdős
// unit-distance disproof) and one that is not (Remote Labor Index). Each card gives its
// headline and a small unit visual; the two past-the-best cards end with the fact that limits
// them, the RLI card with its growth since launch.
// Data: src/data/s0-cards.json, built by scripts/data/build_s0_cards.py from the s0 footnotes.
import { Figure, C, TagChip, PROVENANCE } from './kit.jsx'
import { FootnoteRef } from '../components/Footnotes.jsx'
import data from '../data/s0-cards.json'
import './StatCards.css'

const rec = metric => {
  const r = data.records.find(d => d.metric === metric)
  if (!r) throw new Error(`s0-cards: missing record ${metric}`)
  return r
}

const NOTE_IDS = ['s0-icpc', 's0-ioi', 's0-erdos', 's0-erdos-context', 's0-rli', 's0-rli-growth']

const TAG_KEY = Object.fromEntries(Object.entries(PROVENANCE).map(([k, v]) => [v.label, k]))

const aiSolved = rec('ai_solved')
const humanSolved = rec('best_human_solved')
const ioi = rec('ioi_humans_ahead')
const year = rec('conjecture_year')
const checkers = rec('checkers')
// Its footnote (s0-erdos-context) also sources the human improvement on the AI's construction.
const falseClaims = rec('false_claim_oct_2025')
const rliBest = rec('best_rate_pct')
const rliProjects = rec('projects')
const rliMatched = rec('projects_matched')
const rliNot = rec('projects_not_matched')
const rliLaunch = rec('launch_rate_pct')
const rliRatio = rec('growth_ratio')

const NUM_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']
const word = n => NUM_WORDS[n] ?? String(n)
const cap = s => s.charAt(0).toUpperCase() + s.slice(1)

/** One row of solved / unsolved squares out of `of`. */
function SolvedRow({ label, value, of, color, sourceTag }) {
  const size = 12
  const gap = 3
  const w = of * (size + gap) - gap
  return (
    <div className="sc-row">
      <div className="sc-row__label">
        <span>{label}</span>
        <span className="sc-row__val">{value} of {of}</span>
      </div>
      <svg
        className="sc-row__svg"
        viewBox={`0 0 ${w} ${size}`}
        role="img"
        aria-label={`${label}: ${value} of ${of} problems solved (${sourceTag}).`}
      >
        {Array.from({ length: of }, (_, i) => (
          <rect
            key={i}
            x={i * (size + gap)}
            y={0}
            width={size}
            height={size}
            rx={1.5}
            fill={i < value ? color : 'none'}
            stroke={i < value ? 'none' : C.ink3}
            strokeWidth={i < value ? 0 : 1}
            strokeDasharray={i < value ? undefined : '2 2'}
          />
        ))}
      </svg>
    </div>
  )
}

/** 240 small squares, one per Remote Labor Index project; the matched ones filled. */
function ProjectGrid() {
  const total = rliProjects.value
  const filled = rliMatched.value
  const cols = 24
  const rows = Math.ceil(total / cols)
  const cell = 10
  const gap = 2
  const w = cols * (cell + gap) - gap
  const h = rows * (cell + gap) - gap
  return (
    <svg
      className="sc-grid"
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={`${total} squares, one per freelance project; ${filled} are filled for the projects where the best AI agent's work was judged as good as a human freelancer's (${rliBest.value}% of ${total}), and ${total - filled} are empty.`}
    >
      {Array.from({ length: total }, (_, i) => (
        <rect
          key={i}
          x={(i % cols) * (cell + gap)}
          y={Math.floor(i / cols) * (cell + gap)}
          width={cell}
          height={cell}
          rx={1}
          fill={i < filled ? C.accent : C.rule}
        />
      ))}
    </svg>
  )
}

function Card({ variant, event, big, children, visual, butLabel, but }) {
  return (
    <article className={`sc-card sc-card--${variant}`}>
      <div className="sc-card__text">
        <p className="sc-card__event">{event}</p>
        <p className="sc-card__big">{big}</p>
        <p className="sc-card__line">{children}</p>
      </div>
      <div className="sc-card__visual">{visual}</div>
      <p className="sc-card__but">
        <span className="sc-card__butlab">{butLabel}</span> {but}
      </p>
    </article>
  )
}

function DataTable() {
  const rows = data.records
  return (
    <details className="chart-data">
      <summary>Show the data</summary>
      <div className="table-wrap" tabIndex={0} role="region" aria-label="Data table: opening stat cards">
        <table>
          <thead>
            <tr><th>Card</th><th>Measure</th><th>Value</th><th>Provenance</th><th>Source</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.metric}>
                <td>{r.metric === 'ioi_humans_ahead' ? 'ICPC 2025 (counter-fact: IOI 2025)' : { icpc: 'ICPC 2025', erdos: 'Erdős conjecture', rli: 'Remote Labor Index' }[r.card]}</td>
                <td>{r.label}{r.names ? ` (${r.names.join(', ')}; ${r.preprint}, ${r.date})` : ''}</td>
                <td>
                  {r.metric.endsWith('_pct') ? `${r.value.toFixed(2)}%` : r.metric === 'growth_ratio' ? `${r.value}x` : r.value}
                  {r.of != null && !r.metric.endsWith('_pct') ? ` of ${r.of}` : ''}
                </td>
                <td>{r.tag}</td>
                <td><FootnoteRef id={r.source} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}

export default function StatCards() {
  return (
    <Figure
      id="s0-cards"
      subtitle="Two results where AI has beaten the best humans, and one where it still falls well short. Each card ends with the catch, or with how fast it is changing."
      caveat="The ICPC result is OpenAI's own account; we found no ICPC statement on it. The Remote Labor Index publishes no confidence intervals."
      source="OpenAI researchers (ICPC, IOI); arXiv:2605.20695; Scale AI and Center for AI Safety, Remote Labor Index"
      notes={NOTE_IDS}
    >
      {/* Layout (stacked, rows, columns) is chosen by container queries in StatCards.css, so the
          pre-rendered HTML is the same as the hydrated HTML at every width. */}
      <div className="sc">
        <section className="sc-group sc-group--past" aria-label="Past the best humans">
          <h3 className="sc-group__head">Past the best humans</h3>
          <div className="sc-group__cards">
            <Card
              variant="past"
              event="World finals of the top university programming contest (ICPC), 2025"
              big={`${aiSolved.value} of ${aiSolved.of}`}
              visual={
                <div className="sc-rows">
                  <SolvedRow label="OpenAI system" value={aiSolved.value} of={aiSolved.of} color={C.accent} sourceTag={aiSolved.tag} />
                  <SolvedRow label="Best human team" value={humanSolved.value} of={humanSolved.of} color={C.ink3} sourceTag={humanSolved.tag} />
                </div>
              }
              butLabel="But"
              but={<>The top {(ioi.value / ioi.of * 100).toFixed(1)}% of human contestants ({ioi.value} of {ioi.of}) still beat OpenAI's entry at a different contest: the 2025 International Olympiad in Informatics, for secondary-school students.<FootnoteRef id={ioi.source} /></>}
            >
              problems solved by an OpenAI system. The best human team solved {humanSolved.value}.{' '}
              <span className="sc-prov"><TagChip tag={TAG_KEY[aiSolved.tag]} /><FootnoteRef id={aiSolved.source} /></span>
            </Card>
            <Card
              variant="past"
              event={`Paul Erdős's ${year.value} unit-distance conjecture in geometry`}
              big="Disproved"
              visual={
                <div className="sc-checkers">
                  <p className="sc-checkers__head">{cap(word(checkers.value))} mathematicians published a simpler version</p>
                  <ul className="sc-checkers__list" aria-label={`The ${checkers.value} mathematicians: ${checkers.names.join(', ')}`}>
                    {checkers.names.map(n => (
                      <li key={n}>
                        <svg width="8" height="8" aria-hidden="true"><circle cx="4" cy="4" r="3.5" fill={C.ink2} /></svg>
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              }
              butLabel="But"
              but={<>Within weeks, humans improved on the AI's construction.<FootnoteRef id={falseClaims.source} /></>}
            >
              by an OpenAI model in May 2026. Mathematicians have since built on it.{' '}
              <span className="sc-prov"><TagChip tag={TAG_KEY[checkers.tag]} /><FootnoteRef id={checkers.source} /></span>
            </Card>
          </div>
        </section>
        <section className="sc-group sc-group--not" aria-label="Not past us">
          <h3 className="sc-group__head">Not past us</h3>
          <div className="sc-group__cards">
            <Card
              variant="not"
              event={`Remote Labor Index: ${rliProjects.value} real paid freelance projects`}
              big={`About ${Math.round(rliBest.value)}%`}
              visual={
                <div className="sc-rli">
                  <ProjectGrid />
                  <p className="sc-rli__key">
                    <span className="sc-key sc-key--on" aria-hidden="true" />
                    {rliMatched.value} projects matched a human
                    <span className="sc-key sc-key--off" aria-hidden="true" />
                    {rliNot.value} did not
                    <span className="sc-rli__calc"> ({rliBest.value.toFixed(2)}% of {rliProjects.value}, our arithmetic)</span>
                  </p>
                </div>
              }
              butLabel="October 2025"
              but={<>Just {rliLaunch.value.toFixed(1)}% when the index launched. In 12 months the best score grew about {rliRatio.value.toFixed(1).replace(/\.0$/, '')} times, to {Math.round(rliBest.value)}%.<FootnoteRef id={rliRatio.source} /></>}
            >
              of projects where the best AI agent, working on its own, was judged as good as a human freelancer, as of {data.rli_accessed}.{' '}
              <span className="sc-prov"><TagChip tag={TAG_KEY[rliBest.tag]} /><FootnoteRef id={rliBest.source} /></span>
            </Card>
          </div>
        </section>
      </div>
      <DataTable />
    </Figure>
  )
}
