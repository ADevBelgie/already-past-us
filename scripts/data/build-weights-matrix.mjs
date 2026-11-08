// Builds src/data/weightsMatrix.json for the s7 "weights matrix" figure.
// Usage (from the project root): node scripts/data/build-weights-matrix.mjs
//
// The figure is a taxonomy, not a measurement chart. Every sentence placed in a cell is a
// short paraphrase of the s7 manuscript text or its footnotes, or of
// research/topics/r2-selfweights_landscape.md. To keep it honest, each entry lists the exact
// passages it rests on ("evidence"); the script fails if any passage is missing from the named
// file, or if any footnote id is not defined in the manuscript. The provenance tag of each
// footnote is read from the manuscript, never typed by hand.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { parseManuscript } from '../../src/lib/manuscript.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const FILES = {
  ms: 'already-past-us.md',
  r2: 'research/topics/r2-selfweights_landscape.md',
  r3c: 'research/topics/r3-sourcecheck-c.md',
}
const norm = s => s.replace(/\s+/g, ' ')
const text = Object.fromEntries(Object.entries(FILES).map(([k, f]) => [k, norm(readFileSync(join(root, f), 'utf8'))]))
const { footnotes } = parseManuscript(readFileSync(join(root, FILES.ms), 'utf8'))

const columns = [
  { id: 'own', label: 'Its own weights', short: 'Own weights' },
  { id: 'other', label: "Another model's weights", short: "Another model's" },
]
const rows = [
  { id: 'training', label: 'Through training', sub: 'Ordinary training on data updates the weights' },
  { id: 'edit', label: 'Through a direct edit', sub: 'The weights are changed without training' },
]

// evidence: [fileKey, exact passage]
const cells = [
  {
    row: 'training', col: 'own', kind: 'filled',
    lead: 'The genuinely "self" kind: a model trains on material it wrote, so ordinary training updates its own weights.',
    leadEvidence: [['ms', 'Training on its own output: a model trains on material it wrote.']],
    entries: [
      {
        id: 'seal', name: 'SEAL', who: 'MIT', when: '2025',
        text: 'Writes its own training material, then is trained on it. Earlier tasks get worse as these self-edits pile up.',
        footnotes: ['s7-self'],
        evidence: [['ms', 'SEAL (MIT, 2025)'], ['ms', 'performance on earlier tasks gradually declines as the number of edits increases'], ['r2', 'the model generates its own fine-tuning data/directives']],
      },
      {
        id: 'mass', name: 'MASS', who: 'Sakana AI and UC Berkeley', when: 'October 2026',
        text: 'Two rounds of add-on (LoRA) training on material it produced. Its gains of 1.2–1.6x are in score per output token. Coding tests were flat or slightly down.',
        footnotes: ['s7-self'],
        evidence: [['ms', 'MASS (Sakana AI and UC Berkeley, October 2026)'], ['ms', 'A model trains on material it wrote'], ['ms', 'MASS ran two LoRA cycles on Qwen3.6-27B'], ['ms', 'with no gain on SWE-bench Verified or Terminal-Bench 2.0'], ['r2', 'then is fine-tuned on its own best trajectories'], ['ms', 'Its gains of 1.2–1.6x are score per output token'], ['ms', 'Scores on SWE-bench Verified and Terminal-Bench 2.0 were flat or slightly down']],
      },
      {
        id: 'earlier-self', name: 'Earlier work', who: null, when: null,
        text: 'STaR (2022) and Self-Rewarding Language Models (2024) belong to the same family.',
        footnotes: ['s7-self'],
        evidence: [['ms', 'Earlier members of this family: STaR (2022) and Self-Rewarding Language Models (ICML 2024']],
      },
    ],
  },
  {
    row: 'training', col: 'other', kind: 'plain',
    lead: 'Ordinary training, run by people. The data can come from users or from another model; the model being trained does not direct it.',
    leadEvidence: [['ms', 'the company runs it; the model does not edit itself'], ['ms', 'SEAL scores below GPT-4.1-generated synthetic data']],
    entries: [
      {
        id: 'gpt41-data', name: 'Model-written training data', who: null, when: null,
        text: 'GPT-4.1 writes training data for a different model. In some of the SEAL paper’s tests, training on GPT-4.1’s data beat SEAL’s self-written data.',
        footnotes: ['s7-self'],
        evidence: [['ms', 'in its continued-pretraining settings SEAL scores below GPT-4.1-generated synthetic data'], ['r2', 'GPT-4.1 synthetic 46.3%']],
      },
      {
        id: 'cursor-tab', name: 'Cursor Tab', who: 'Cursor', when: 'September 2025',
        text: 'Cursor says it retrains its code-completion model on user data in cycles of about 1.5 to 2 hours. No frontier chatbot is publicly known to do this.',
        footnotes: ['s7-live'],
        evidence: [['ms', 'Cursor retrains its code-completion model (Cursor Tab) with online reinforcement learning on user data'], ['ms', 'Each checkpoint-and-data cycle takes about 1.5 to 2 hours'], ['ms', 'No publicly known frontier chatbot updates its weights as people use it.'], ['ms', 'Cursor blog, 12 September 2025']],
      },
    ],
  },
  {
    row: 'edit', col: 'own', kind: 'empty',
    lead: 'No public demonstration found',
    leadEvidence: [['ms', 'We found no public demonstration of a model working out and applying a direct edit to its own weights.']],
    entries: [
      {
        id: 'none-found', name: 'No public demonstration found', who: null, when: null,
        text: 'The MIT authors describe a model that improves its own weights only as a future direction.',
        footnotes: ['s7-post'],
        evidence: [['ms', 'the MIT authors describe an LLM that improves its own weights only as a future direction'], ['r2', "Has anyone tried LLM-authored direct edits to the editing model's OWN weights (the SELF + direct-edit cell)? Nothing found"]],
      },
    ],
  },
  {
    row: 'edit', col: 'other', kind: 'filled',
    lead: 'Weights written directly, with no training of the model that changes.',
    leadEvidence: [['ms', 'Direct edits: algorithms that write facts straight into another model']],
    entries: [
      {
        id: 'rome-memit', name: 'ROME and MEMIT', who: 'Algorithms, not AI models', when: 'since 2022',
        text: 'Write facts straight into a model’s weights. MEMIT handles thousands at once.',
        footnotes: ['s7-edit'],
        evidence: [['ms', "Direct edits: algorithms that write facts straight into another model's weights, since 2022."], ['ms', 'The fact-writing algorithms are ROME and MEMIT, from 2022.'], ['ms', 'What was new is that an AI worked out the edit'],['ms', 'It scales to "thousands of associations"']],
      },
      {
        id: 'text-to-lora', name: 'Text-to-LoRA', who: 'Charakorn et al.', when: '2025',
        text: 'A network built to generate add-on weights for another model from a task description. The list above treats weight generators as their own kind. They sit here because the model receiving the weights is not trained.',
        footnotes: ['s7-gen'],
        evidence: [['ms', 'Weight generators: networks that produce weights for other models.'], ['ms', 'The best-known weight generator is Text-to-LoRA'], ['r2', 'Text-to-LoRA (Sakana AI): a hypernetwork generates LoRA adapters for an LLM from a natural-language task description in one forward pass'], ['r2', 'OTHER + learned weight generator.'], ['ms', 'Charakorn et al., "Text-to-LoRA: Instant Transformer Adaption", ICML 2025']],
      },
      {
        id: 'mit-csail', name: 'GPT-6 Astra edits Qwen3.5-0.8B', who: 'MIT CSAIL', when: '2 November 2026',
        highlight: 'The November story is here',
        text: 'With Python and no training, OpenAI’s model worked out an edit to about 0.016% of the weights of a far smaller open model. On the largest of three test-run budgets, the small model’s maths score rose from 8% to 48%. Most of the gain came from fixing a fault that made it repeat itself. A blog post, not peer-reviewed.',
        footnotes: ['s7-post', 's7-qwen', 's7-loops'],
        evidence: [['ms', 'published on 2 November and not peer-reviewed'], ['ms', "They gave OpenAI's GPT-6 Astra a far smaller, freely available model with under a billion weights"], ['ms', "The small model is Alibaba's Qwen3.5-0.8B"], ['ms', 'plus Python'], ['ms', 'Reasoning about the weights, with no training, Astra edited about 0.016% of them'], ['ms', 'rose from 8% to 48%'], ['ms', 'The headline Qwen result is a single run with the largest budget, 50 forward passes'], ['ms', 'in separate runs allowed 10, 25 and 50 forward passes, one run per budget'], ['ms', 'Most of that gain was a repair. The small model is known to get stuck repeating itself'], ['r3c', 'MATH-500 accuracy: 7.9 unedited; 12.3, 14.1 and 48.1 at 10, 25 and 50 passes.']],
      },
    ],
  },
]

const strip = {
  label: 'Rewrites its own code, not its weights',
  lead: 'Agents that change their own code and leave the model’s weights alone.',
  leadEvidence: [['ms', 'Code rewriting: agents that rewrite code, including code used to train them, but leave weights alone']],
  entries: [
    {
      id: 'dgm', name: 'Darwin Gödel Machine', who: 'Research preprint', when: 'May 2025',
      text: 'An agent rewrites its own code while the model underneath stays frozen.',
      footnotes: ['s7-code'],
      evidence: [['ms', 'is the Darwin Gödel Machine (2025)'], ['ms', 'The agent rewrites its own code, with the underlying model frozen.'], ['ms', 'arXiv 2505.22954, May 2025']],
    },
    {
      id: 'alphaevolve', name: 'AlphaEvolve', who: 'Google DeepMind', when: 'May 2025',
      text: 'Google DeepMind says AlphaEvolve found a faster kernel, a piece of low-level code, that cut Gemini training time by about 1%. That is an indirect loop through code, not weight editing.',
      footnotes: ['s7-alphaevolve'],
      evidence: [['ms', 'A 23% faster kernel cut Gemini training time by about 1%'], ['ms', 'This is an indirect loop through code, not weight editing.'], ['ms', '14 May 2025']],
    },
  ],
}

// ---- verification ----
const problems = []
const check = (ev, where) => {
  for (const [k, passage] of ev) {
    if (!text[k]) problems.push(`${where}: unknown file key ${k}`)
    else if (!text[k].includes(norm(passage))) problems.push(`${where}: passage not found in ${FILES[k]}: "${passage}"`)
  }
}
const tagged = e => {
  check(e.evidence, e.id)
  const sources = e.footnotes.map(id => {
    const fn = footnotes[id]
    if (!fn) { problems.push(`${e.id}: footnote ${id} is not defined in the manuscript`); return { id, tag: null } }
    return { id, tag: fn.tag }
  })
  const { evidence, ...rest } = e
  return { ...rest, sources, evidence: evidence.map(([k, p]) => ({ file: FILES[k], passage: p })) }
}
const outCells = cells.map(c => {
  check(c.leadEvidence, `${c.row}/${c.col} lead`)
  const { leadEvidence, ...rest } = c
  return { ...rest, leadEvidence: leadEvidence.map(([k, p]) => ({ file: FILES[k], passage: p })), entries: c.entries.map(tagged) }
})
check(strip.leadEvidence, 'strip lead')
const { leadEvidence: stripLead, ...stripRest } = strip
const outStrip = { ...stripRest, leadEvidence: stripLead.map(([k, p]) => ({ file: FILES[k], passage: p })), entries: strip.entries.map(tagged) }

if (problems.length) {
  console.error('build-weights-matrix failed:\n- ' + problems.join('\n- '))
  process.exit(1)
}

const out = {
  id: 's7-weights-matrix',
  note: 'Generated by scripts/data/build-weights-matrix.mjs from the s7 manuscript text and footnotes, research/topics/r2-selfweights_landscape.md and research/topics/r3-sourcecheck-c.md. Do not edit by hand.',
  columns, rows, cells: outCells, strip: outStrip,
}
mkdirSync(join(root, 'src/data'), { recursive: true })
writeFileSync(join(root, 'src/data/weightsMatrix.json'), JSON.stringify(out, null, 2) + '\n')
const n = outCells.reduce((a, c) => a + c.entries.length, 0) + outStrip.entries.length
console.log(`OK: wrote src/data/weightsMatrix.json (${outCells.length} cells, ${n} entries, all passages and footnotes verified)`)
