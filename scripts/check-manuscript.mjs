// Build gate: the manuscript must parse cleanly before the site is built.
// Checks footnote integrity, provenance tags, section anchors, internal links and chart ids.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { parseManuscript } from '../src/lib/manuscript.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const md = readFileSync(join(root, 'already-past-us.md'), 'utf8')
const { meta, sections, footnotes, problems } = parseManuscript(md)

const anchors = new Set(sections.map(s => s.id))
for (const m of md.matchAll(/\]\(#([\w-]+)\)/g)) {
  if (!anchors.has(m[1])) problems.push(`link to missing anchor: #${m[1]}`)
}

const registrySrc = readFileSync(join(root, 'src/charts/registry.js'), 'utf8')
// Registry keys, read from the source so this script needs no JSX loader.
const registryKeys = new Set([...registrySrc.matchAll(/^\s*'([\w-]+)':/gm)].map(m => m[1]))
for (const s of sections) {
  for (const b of s.blocks) {
    if (b.type === 'chart' && !registryKeys.has(b.id)) problems.push(`chart id not in registry: ${b.id}`)
  }
}

// Footnote ids cited inside chart components or chart data must exist in the manuscript,
// otherwise the chip silently renders as "?".
const chartIds = new Set(Object.values(sections).flatMap(s => s.blocks).filter(b => b.type === 'chart').map(b => b.id))
for (const dir of ['src/charts', 'src/data']) {
  for (const f of readdirSync(join(root, dir))) {
    if (!/\.(jsx|js|json)$/.test(f)) continue
    const src = readFileSync(join(root, dir, f), 'utf8')
    for (const m of src.matchAll(/["'`](s\d-[a-z0-9-]+)["'`]/g)) {
      const id = m[1]
      if (!footnotes[id] && !chartIds.has(id)) problems.push(`${dir}/${f} cites unknown footnote id: ${id}`)
    }
  }
}

if (!meta.title) problems.push('front matter has no title')
if (/\[link to add before launch\]/.test(md)) problems.push('placeholder link still present')

const counts = {}
for (const f of Object.values(footnotes)) counts[f.tag] = (counts[f.tag] || 0) + 1

if (problems.length) {
  console.error('Manuscript check failed:\n- ' + problems.join('\n- '))
  process.exit(1)
}
console.log(`Manuscript OK: ${sections.length} sections, ${Object.keys(footnotes).length} footnotes`, counts)
