// Parses already-past-us.md into front matter, sections, blocks and footnotes.
// Pure ESM with no Vite or DOM dependencies, so scripts/check-manuscript.mjs can reuse it.

export const TAGS = {
  'Verified': { key: 'verified', label: 'Verified', blurb: 'Measured or checked by a party independent of the model maker.' },
  'Vendor-reported': { key: 'vendor', label: 'Vendor-reported', blurb: 'Comes from the company that makes the model.' },
  'Estimate': { key: 'estimate', label: 'Estimate', blurb: 'A forecast or modelled estimate by a named party.' },
  'Our calculation': { key: 'calc', label: 'Our calculation', blurb: 'Computed by us from the cited data.' },
}

const FN_DEF = /^\[\^([^\]]+)\]:\s*(.*)$/
const HEADING = /^##\s+(.*?)\s*\{#([\w-]+)\}\s*$/
const CHART = /^<!--\s*CHART:\s*([\w-]+)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*-->\s*$/
const TAG_PREFIX = /^\*\*(Verified|Vendor-reported|Estimate|Our calculation)\.\*\*\s*/
const FN_REF = /\[\^([^\]]+)\]/g
const EXPERT = /^\*\*Expert note:(?:\s+([^*]+?))?\.?\*\*\s*([\s\S]*)$/

function parseFrontMatter(lines) {
  const meta = {}
  if (lines[0]?.trim() !== '---') return { meta, rest: lines }
  let i = 1
  for (; i < lines.length && lines[i].trim() !== '---'; i++) {
    const m = lines[i].match(/^(\w+):\s*(.*)$/)
    if (!m) continue
    let v = m[2].trim()
    if (v.startsWith('"') && v.endsWith('"')) {
      try { v = JSON.parse(v) } catch { v = v.slice(1, -1) }
    }
    meta[m[1]] = v
  }
  return { meta, rest: lines.slice(i + 1) }
}

function toBlocks(lines, problems = [], where = '') {
  const blocks = []
  let md = []
  const flush = () => {
    const text = md.join('\n').trim()
    if (text) blocks.push({ type: 'md', text })
    md = []
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const chart = line.match(CHART)
    if (chart) {
      flush()
      blocks.push({ type: 'chart', id: chart[1], description: chart[2], data: chart[3] })
      continue
    }
    if (line.startsWith('>')) {
      flush()
      const quote = []
      while (i < lines.length && lines[i].startsWith('>')) {
        quote.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      // Markdown would treat a non-blank line straight after a quote as part of it ("lazy
      // continuation"); this parser would not, so flag it instead of silently splitting.
      if (i < lines.length && lines[i].trim() !== '' && !CHART.test(lines[i])) {
        problems.push(`line directly after a > block (add a blank line): "${lines[i].slice(0, 60)}" (${where})`)
      }
      i--
      const text = quote.join('\n').trim()
      // "**Expert note: Label.** body", or the older unlabelled "**Expert note:** body".
      const expert = text.match(EXPERT)
      if (expert) blocks.push({ type: 'expert', label: expert[1]?.trim() || undefined, text: expert[2].trim() })
      else blocks.push({ type: 'md', text: quote.map(q => '> ' + q).join('\n') })
      continue
    }
    md.push(line)
  }
  flush()
  return blocks
}

export function parseManuscript(source) {
  const all = source.replace(/\r\n/g, '\n').split('\n')
  const { meta, rest } = parseFrontMatter(all)

  // Pull out footnote definitions first; they can sit anywhere in a section.
  const footnotes = {}
  const body = []
  const problems = []
  for (const line of rest) {
    const def = line.match(FN_DEF)
    if (!def) { body.push(line); continue }
    const [, id, raw] = def
    if (!/^[\w-]+$/.test(id)) problems.push(`footnote id must be letters, digits, _ or -: ${id}`)
    if (footnotes[id]) problems.push(`duplicate footnote definition: ${id}`)
    const tagMatch = raw.match(TAG_PREFIX)
    if (!tagMatch) problems.push(`footnote without provenance tag: ${id}`)
    footnotes[id] = {
      id,
      tag: tagMatch ? tagMatch[1] : null,
      text: tagMatch ? raw.slice(tagMatch[0].length).trim() : raw.trim(),
      n: null,
      section: null,
    }
  }

  // Split into sections.
  const sections = []
  let current = null
  for (const line of body) {
    const h = line.match(HEADING)
    if (h) {
      const title = h[1]
      const numbered = title.match(/^(\d+)\.\s+(.*)$/)
      current = { id: h[2], num: numbered ? numbered[1] : null, title: numbered ? numbered[2] : title, lines: [] }
      sections.push(current)
      continue
    }
    if (current) current.lines.push(line)
  }

  // Number footnotes in order of first reference; record their home section.
  let n = 0
  for (const s of sections) {
    s.blocks = toBlocks(s.lines, problems, s.id)
    delete s.lines
    s.notes = []
    for (const b of s.blocks) {
      if (b.type === 'chart') continue
      for (const m of b.text.matchAll(FN_REF)) {
        const fn = footnotes[m[1]]
        if (!fn) { problems.push(`reference to undefined footnote: ${m[1]} (${s.id})`); continue }
        if (fn.n == null) {
          fn.n = ++n
          fn.section = s.id
          s.notes.push(fn.id)
        }
      }
    }
  }
  for (const fn of Object.values(footnotes)) {
    if (fn.n == null) problems.push(`footnote defined but never referenced: ${fn.id}`)
  }

  return { meta, sections, footnotes, problems }
}

// Turn [^id] references into links the renderer can recognise.
export function linkFootnoteRefs(text) {
  return text.replace(FN_REF, (_, id) => `[${id}](#fn-${id})`)
}

export function wordCount(text) {
  return (text.replace(FN_REF, '').match(/[A-Za-z0-9$%][\w$%.,'’-]*/g) || []).length
}
