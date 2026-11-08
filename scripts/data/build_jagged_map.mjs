// Builds src/data/jagged_map.json for the s4 "jagged map" chart (src/charts/JaggedMap.jsx).
//
// Usage (from the project root):  node scripts/data/build_jagged_map.mjs
//
// Every row is taken from section 4 of the manuscript (and, for ICPC and the Erdős result, from
// the opening section that section 4 points back to). The script does not trust its own row
// table: it re-reads the manuscript and fails loudly if
//   - a cited footnote does not exist,
//   - a row's tier does not match the bold heading of the s4 paragraph that cites its footnote,
//   - any number written in a row's text does not appear in the manuscript text it rests on.
// Provenance (Verified / Vendor-reported / ...) is read from the footnote's tag, never typed here.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseManuscript, TAGS } from '../../src/lib/manuscript.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const manuscriptPath = resolve(root, 'already-past-us.md')
const outPath = resolve(root, 'src', 'data', 'jagged_map.json')

// The five steps, in the order and words of the s4 headings.
const TIERS = [
  { key: 0, label: 'Far below humans', heading: 'Far below humans' },
  { key: 1, label: 'Below humans', heading: 'Below humans' },
  { key: 2, label: 'Level with the best', heading: 'Level with the best' },
  // "Typical" because Waymo (compared with average drivers) sits on this step. The label is the
  // chart's column name; the heading keeps the manuscript's "with caveats".
  { key: 3, label: 'Ahead of trained or typical people', heading: 'Ahead of trained or typical people, with caveats' },
  { key: 4, label: 'Beyond the best humans', heading: 'Beyond the best humans' },
]
const UNCONFIRMED_HEADING = 'Level with the best, if confirmed'
// GenCast sits in the rightmost column but under its own s4 heading: it was compared with a
// physics-based computer model, not with people. A row's `heading` becomes its tier_label and is
// the heading its footnote must sit under; `vs_machine` marks a comparison with a machine.
const MACHINE_HEADING = 'Improving on the best known algorithms'

// Who AI was compared with. The manuscript and its expert notes stress that several right-hand
// dots are not comparisons with the best humans.
const GROUPS = {
  best: 'Best humans',
  trained: 'Trained experts',
  people: 'People in general',
  machine: 'Another computer model',
}

// Row table. footnote_ids[0] is the row's main footnote (it sets the dot colour).
// `section` is the manuscript section whose text the row's numbers are checked against.
const ROWS = [
  {
    id: 'robotics',
    domain: 'Robotics',
    tier: 0,
    compared_with: 'people',
    compared_group: 'people',
    comparison_text:
      "Epoch AI's review found robots typically 3 to 10 times slower than people. No robot has yet been shown doing every part of cleaning a kitchen.",
    ai_value: '3 to 10 times slower',
    human_value: 'people (baseline)',
    date: '2026-02-10',
    date_label: '10 February 2026',
    footnote_ids: ['s4-robots'],
    section: 's4',
  },
  {
    id: 'arc-agi-3',
    domain: 'ARC-AGI-3 puzzle games',
    tier: 1,
    compared_with: 'people',
    compared_group: 'people',
    comparison_text:
      "People have solved every game. Every frontier model scored under 1% at launch in March 2026; by September GPT-6 Astra reached a verified 62.7% on ARC Prize's standard setup.",
    ai_value: '62.7% (standard setup)',
    human_value: '100% of games solved by people',
    date: '2026-09-03',
    date_label: '3 September 2026',
    footnote_ids: ['s4-arc-astra', 's4-arc-launch'],
    section: 's4',
  },
  {
    id: 'freelance',
    domain: 'Real freelance work',
    tier: 1,
    compared_with: 'human freelancers',
    compared_group: 'trained',
    comparison_text:
      "On the Remote Labor Index, the best agent's work was judged as good as a human freelancer's on about 21% of 240 real paid projects.",
    ai_value: '21.25% of projects',
    human_value: "the human freelancer's deliverable",
    date: '2026-11-07',
    date_label: 'accessed 7 November 2026',
    footnote_ids: ['s4-rli'],
    section: 's4',
  },
  {
    id: 'forecasting',
    domain: 'Forecasting',
    tier: 2,
    compared_with: 'superforecasters',
    compared_group: 'best',
    comparison_text:
      "The Forecasting Research Institute found the best AI forecasters statistically indistinguishable from superforecasters on its questions. The superforecaster baseline was collected in 2024 and is extrapolated.",
    ai_value: 'not distinguishable (p = 0.41)',
    human_value: 'superforecasters',
    date: '2026-07-16',
    date_label: '16 July 2026',
    footnote_ids: ['s4-forecast'],
    section: 's4',
  },
  {
    id: 'imo-2026',
    domain: 'Math olympiad (IMO 2026)',
    tier: 2,
    confirmed: false,
    compared_with: 'top contestants',
    compared_group: 'best',
    comparison_text:
      'Huawei, Xiaohongshu and others reported perfect scores of 42 out of 42. The IMO has confirmed none of them. 7 of the 666 human contestants also got full marks, so even if true it is a tie with the best.',
    ai_value: '42/42 (company-reported)',
    human_value: '42/42 for 7 of 666 contestants',
    date: '2026-07-23',
    date_label: 'July 2026',
    footnote_ids: ['s4-imo'],
    section: 's4',
  },
  {
    id: 'waymo',
    domain: 'Driving (Waymo)',
    tier: 3,
    compared_with: 'average drivers',
    compared_group: 'people',
    comparison_text:
      "Waymo says its driverless cars had 95% fewer serious-injury crashes than human drivers over 270 million miles. That is Waymo's own analysis, against average drivers in the same places.",
    ai_value: '95% fewer serious-injury crashes',
    human_value: 'average human drivers, same places',
    date: '2026-09-24',
    date_label: '24 September 2026',
    footnote_ids: ['s4-waymo', 's4-waymo-recall'],
    section: 's4',
  },
  {
    id: 'diagnosis',
    domain: 'Diagnosis on written cases',
    tier: 3,
    compared_with: 'doctors',
    compared_group: 'trained',
    comparison_text:
      'In a randomised trial in Pakistan using written clinical cases, not real patients, GPT-4o alone scored 82.9%, doctors using GPT-4o 71.4% and doctors using ordinary references 42.6%. AI alone versus doctors with AI is an exploratory finding.',
    ai_value: '82.9% (GPT-4o alone)',
    human_value: '71.4% doctors with GPT-4o; 42.6% with ordinary references',
    date: '2026-02-06',
    date_label: '6 February 2026',
    footnote_ids: ['s4-pakistan'],
    section: 's4',
  },
  {
    id: 'gpqa',
    domain: 'GPQA Diamond science questions',
    tier: 3,
    compared_with: 'PhD experts',
    compared_group: 'trained',
    comparison_text:
      "In Epoch AI's testing, Grok 4 scored 87% (July 2025). PhD experts scored about 70%, a baseline OpenAI measured. The questions are multiple-choice.",
    ai_value: '87% (Grok 4)',
    human_value: 'about 70% (PhD experts)',
    date: '2025-07-09',
    date_label: 'July 2025',
    footnote_ids: ['s4-gpqa-ai', 's4-gpqa-human'],
    // The ~70% PhD baseline rests on a different footnote with its own (weaker) tag.
    baseline_footnote_id: 's4-gpqa-human',
    section: 's4',
  },
  {
    id: 'hurricanes',
    domain: 'Hurricane tracks',
    tier: 4,
    compared_with: 'official forecasts',
    compared_group: 'trained',
    comparison_text:
      "According to press coverage of the US National Hurricane Center's review of the 2025 season, Google DeepMind's model did slightly better than the official Atlantic track forecasts at some lead times.",
    ai_value: 'slightly better at some lead times',
    human_value: 'official NHC Atlantic track forecasts',
    date: '2026-03-01',
    date_label: 'report March 2026 (2025 season)',
    footnote_ids: ['s4-nhc'],
    section: 's4',
  },
  {
    id: 'weather',
    domain: 'Weather ensembles',
    tier: 4,
    heading: MACHINE_HEADING,
    vs_machine: true,
    compared_with: 'a physics model',
    compared_group: 'machine',
    comparison_text:
      "Google DeepMind's GenCast beat Europe's leading physics-based forecast ensemble on 97.2% of 1,320 test targets. That comparison is with another computer model, not with human forecasters.",
    ai_value: 'better on 97.2% of 1,320 targets',
    human_value: 'ECMWF ENS physics ensemble (not people)',
    date: '2024-12-04',
    date_label: 'December 2024',
    footnote_ids: ['s4-gencast'],
    section: 's4',
  },
  {
    id: 'research-math',
    domain: 'Research math (Erdős)',
    tier: 4,
    compared_with: 'an open problem',
    compared_group: 'best',
    comparison_text:
      "An OpenAI model disproved Paul Erdős's 1946 unit distance conjecture. Nine mathematicians checked it. Humans improved on the AI's construction within weeks.",
    ai_value: 'disproof of a 1946 conjecture',
    human_value: 'open since 1946',
    date: '2026-05-20',
    date_label: 'May 2026',
    footnote_ids: ['s0-erdos', 's0-erdos-context'],
    section: 's0',
  },
  {
    id: 'icpc',
    domain: 'Programming finals (ICPC)',
    tier: 4,
    compared_with: 'best human team',
    compared_group: 'best',
    comparison_text:
      "On OpenAI's own account, its system solved all 12 problems at the 2025 world finals. The best human team solved 11. We found no ICPC statement on it.",
    ai_value: '12 of 12 problems (OpenAI-reported)',
    human_value: '11 of 12 (best human team)',
    date: '2025-09-04',
    date_label: '4 September 2025',
    footnote_ids: ['s0-icpc'],
    section: 's0',
  },
]

// ── Checks against the manuscript ───────────────────────────────────────────
const doc = parseManuscript(readFileSync(manuscriptPath, 'utf8'))
const problems = []
const section = id => doc.sections.find(s => s.id === id)
const bodyText = id => section(id).blocks.filter(b => b.type !== 'chart').map(b => b.text).join('\n\n')

// Map each footnote cited in an s4 headed paragraph to that paragraph's bold heading.
const s4Paragraphs = section('s4').blocks
  .filter(b => b.type === 'md')
  .flatMap(b => b.text.split(/\n\s*\n/))
const headingOf = {}
const beyondParagraph = s4Paragraphs.find(p => p.startsWith('**Beyond the best humans.**')) ?? ''
for (const p of s4Paragraphs) {
  const h = p.match(/^\*\*(.+?)\.\*\*/)
  if (!h) continue
  for (const m of p.matchAll(/\[\^([^\]]+)\]/g)) headingOf[m[1]] ??= h[1]
}

const numbersIn = s => (s.match(/\d[\d,.]*/g) || []).map(n => n.replace(/[.,]+$/, ''))

const rows = ROWS.map(r => {
  const fns = r.footnote_ids.map(id => doc.footnotes[id])
  fns.forEach((fn, i) => { if (!fn) problems.push(`${r.id}: footnote ${r.footnote_ids[i]} not found`) })
  const main = fns[0]
  const provenance = main ? TAGS[main.tag]?.key : null
  if (!provenance) problems.push(`${r.id}: main footnote has no provenance tag`)

  // Tier must match the s4 heading that cites the main footnote.
  const confirmed = r.confirmed !== false
  const expected = r.heading ?? (confirmed ? TIERS[r.tier].heading : UNCONFIRMED_HEADING)
  if (r.section === 's4') {
    const got = headingOf[r.footnote_ids[0]]
    if (got !== expected) problems.push(`${r.id}: tier heading is "${got}", row says "${expected}"`)
  } else {
    // ICPC and Erdős: s4 places "the opening's two results" in the Beyond paragraph.
    const cue = r.id === 'icpc' ? 'programming world finals' : 'Erdős disproof'
    if (r.tier !== 4 || !beyondParagraph.includes(cue)) problems.push(`${r.id}: not placed in the s4 Beyond paragraph`)
  }

  // Every number we write must appear in the manuscript text the row rests on.
  const evidence = [bodyText(r.section), ...fns.filter(Boolean).map(f => f.text)].join('\n')
  for (const field of ['comparison_text', 'ai_value', 'human_value', 'date_label']) {
    for (const n of numbersIn(r[field])) {
      if (!evidence.includes(n)) problems.push(`${r.id}.${field}: number "${n}" not found in ${r.section} text or its footnotes`)
    }
  }
  if (!GROUPS[r.compared_group]) problems.push(`${r.id}: unknown compared_group`)
  if ((r.vs_machine === true) !== (r.compared_group === 'machine')) problems.push(`${r.id}: vs_machine and compared_group disagree`)

  // When the human baseline comes from another footnote, carry that footnote's tag too.
  let baseline_provenance = null
  if (r.baseline_footnote_id) {
    const bf = doc.footnotes[r.baseline_footnote_id]
    if (!r.footnote_ids.includes(r.baseline_footnote_id)) problems.push(`${r.id}: baseline footnote not in footnote_ids`)
    baseline_provenance = bf ? TAGS[bf.tag]?.key ?? null : null
    if (!baseline_provenance) problems.push(`${r.id}: baseline footnote ${r.baseline_footnote_id} missing or untagged`)
  }

  return {
    id: r.id,
    domain: r.domain,
    tier: r.tier,
    tier_label: r.heading ?? (confirmed ? TIERS[r.tier].label : UNCONFIRMED_HEADING),
    confirmed,
    vs_machine: r.vs_machine === true,
    compared_with: r.compared_with,
    compared_group: r.compared_group,
    compared_group_label: GROUPS[r.compared_group],
    comparison_text: r.comparison_text,
    ai_value: r.ai_value,
    human_value: r.human_value,
    date: r.date,
    date_label: r.date_label,
    provenance,
    baseline_provenance,
    footnote_id: r.footnote_ids[0],
    footnote_ids: r.footnote_ids,
    manuscript_section: r.section,
  }
})

// ── Past views: each row as it stood on 7 Nov 2025 and 7 May 2026 ──────────────
// research/data/jagged_history.json holds, per row and date, either {same_as_today: true}, null (no
// comparable result yet) or an entry with the evidence published by that date (expert note "The map 6
// and 12 months ago" and its s4-h-* footnotes). The same checks apply: every number must appear in the
// entry's footnotes, and each footnote must carry a provenance tag.
const HISTORY_DATES = ['2025-11-07', '2026-05-07']
const history = JSON.parse(readFileSync(resolve(root, 'research', 'data', 'jagged_history.json'), 'utf8'))
const s4Text = bodyText('s4')
for (const row of rows) {
  const h = history[row.id]
  if (!h) { problems.push(`${row.id}: no history entry`); continue }
  row.history = {}
  for (const d of HISTORY_DATES) {
    const e = h[d]
    if (e === undefined) { problems.push(`${row.id}: history missing ${d}`); continue }
    if (e === null || e.same_as_today) { row.history[d] = e === null ? null : { same_as_today: true }; continue }
    const fns = e.footnote_ids.map(id => doc.footnotes[id])
    fns.forEach((fn, i) => { if (!fn) problems.push(`${row.id}@${d}: footnote ${e.footnote_ids[i]} not found`) })
    for (const id of e.footnote_ids) if (!s4Text.includes(`[^${id}]`)) problems.push(`${row.id}@${d}: footnote ${id} not cited in section 4`)
    const provenance = fns[0] ? TAGS[fns[0].tag]?.key : null
    if (!provenance) problems.push(`${row.id}@${d}: main footnote has no provenance tag`)
    const evidence = fns.filter(Boolean).map(f => f.text).join(' ')
    for (const field of ['comparison_text', 'ai_value', 'human_value', 'evidence_date_label']) {
      for (const n of numbersIn(e[field])) {
        if (!evidence.includes(n)) problems.push(`${row.id}@${d}.${field}: number "${n}" not found in its footnotes`)
      }
    }
    if (!(e.tier >= 0 && e.tier < TIERS.length)) problems.push(`${row.id}@${d}: bad tier`)
    if (e.evidence_date > d) problems.push(`${row.id}@${d}: evidence dated after the view date`)
    const confirmed = e.confirmed !== false
    row.history[d] = {
      tier: e.tier,
      tier_label: row.vs_machine ? row.tier_label : TIERS[e.tier].label + (confirmed ? '' : ', if confirmed'),
      confirmed,
      compared_with: e.compared_with ?? row.compared_with,
      comparison_text: e.comparison_text,
      ai_value: e.ai_value,
      human_value: e.human_value,
      date: e.evidence_date,
      date_label: e.evidence_date_label,
      provenance,
      baseline_provenance: null,
      footnote_id: e.footnote_ids[0],
      footnote_ids: e.footnote_ids,
    }
  }
}

if (problems.length) {
  console.error('build_jagged_map: FAILED\n  ' + problems.join('\n  '))
  process.exit(1)
}

const out = {
  meta: {
    description: 'Section 4 jagged map: where AI stands against people, one row per domain, on the five steps of the s4 headings.',
    built_by: 'scripts/data/build_jagged_map.mjs',
    source: 'already-past-us.md, section 4 (rows icpc and research-math from section 0, which section 4 places at the far right)',
    as_of: doc.meta.data_as_of ?? null,
    tiers: TIERS.map(({ key, label }) => ({ key, label })),
    groups: GROUPS,
    history_dates: HISTORY_DATES,
  },
  rows,
}
writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n')
console.log(`build_jagged_map: wrote ${rows.length} rows to ${outPath}`)
