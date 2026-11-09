// Build gate: the manuscript must parse cleanly before the site is built.
// Checks footnote integrity, provenance tags, section anchors, internal links and chart ids.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { parseManuscript, SIGNPOST_SECTION, UPDATE_LABEL, UPDATE_LINE, UPDATE_STATUSES, longDateToIso } from '../src/lib/manuscript.js'

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

// Expert notes are folded in Brief mode, so each needs a short label saying what it covers.
for (const s of sections) {
  const seen = new Set()
  for (const b of s.blocks) {
    // A malformed note (e.g. "*" in the label, or no colon) silently becomes a quote that shows in Brief mode.
    if (b.type === 'md' && /^>\s*\*\*Expert note/m.test(b.text)) {
      problems.push(`looks like an expert note but did not parse (the label must have no "*" and end with ".**"): "${b.text.slice(0, 60)}" (${s.id})`)
      continue
    }
    if (b.type !== 'expert') continue
    if (!b.label) { problems.push(`expert note without a label: "${b.text.slice(0, 50)}" (${s.id})`); continue }
    if (b.label.length > 60) problems.push(`expert note label longer than 60 characters: "${b.label}" (${s.id})`)
    if (seen.has(b.label)) problems.push(`duplicate expert note label in section: "${b.label}" (${s.id})`)
    seen.add(b.label)
  }
}

// Signpost updates: "- **Update, 9 November 2026 (claimed).** text[^source]". A malformed label
// would silently render as an ordinary bullet with no date or status.
const dataDate = longDateToIso((meta.data_as_of || '').replace(/^Data as of /, ''))
for (const line of md.split(/\r?\n/)) {
  const open = line.match(UPDATE_LINE)
  if (!open) continue
  const short = line.trim().slice(0, 60)
  const label = `Update${open[1]}`.match(UPDATE_LABEL)
  if (!label) { problems.push(`update label must read "**Update, 9 November 2026.**" or "**Update, 9 November 2026 (claimed).**": "${short}"`); continue }
  const iso = longDateToIso(label[1])
  if (!iso) problems.push(`update has an invalid date "${label[1]}": "${short}"`)
  else if (dataDate && iso < dataDate) problems.push(`update is dated before the data date: "${short}"`)
  if (label[2] != null && !UPDATE_STATUSES.includes(label[2])) problems.push(`update status must be one of ${UPDATE_STATUSES.join(', ')} (got "${label[2]}"): "${short}"`)
  if (!/\[\^[^\]]+\]/.test(line)) problems.push(`update has no source footnote: "${short}"`)
}
const signpostSection = sections.find(s => s.id === SIGNPOST_SECTION)
if (/^\s*[-*]\s+\*\*Update\b/m.test(md) && !signpostSection) problems.push(`updates found but there is no signpost section #${SIGNPOST_SECTION}`)

if (!meta.title) problems.push('front matter has no title')
if (sections.length === 0) problems.push('no sections found (headings must look like "## 1. Title {#s1}")')
if (/\[link to add before launch\]/.test(md)) problems.push('placeholder link still present')

const counts = {}
for (const f of Object.values(footnotes)) counts[f.tag] = (counts[f.tag] || 0) + 1

if (problems.length) {
  console.error('Manuscript check failed:\n- ' + problems.join('\n- '))
  process.exit(1)
}
console.log(`Manuscript OK: ${sections.length} sections, ${Object.keys(footnotes).length} footnotes`, counts)
