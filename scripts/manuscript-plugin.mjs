// Build-time manuscript compiler and the Vite plugin that serves it.
//
// The browser no longer ships a markdown parser. At build (and dev) time this file:
//   1. runs parseManuscript (src/lib/manuscript.js) on already-past-us.md,
//   2. parses every markdown chunk (md blocks, expert notes, footnote bodies) with
//      unified + remark-parse + remark-gfm,
//   3. emits a compact tree that src/components/Md.jsx turns into React elements.
// It is exposed as the virtual module 'virtual:manuscript'. The raw file is also served
// (dev) and emitted (build) at /already-past-us.md.
//
// Compact node shapes (text is a plain string):
//   { t: 'p' | 'em' | 'strong' | 'del' | 'blockquote' | 'li' | 'br' | 'hr', c?: [...] }
//   { t: 'h', d: depth, c }            heading
//   { t: 'a', h: href, ti?: title, c? } link (no c: the text is the href itself)
//   { t: 'f', i: id }                  footnote reference (a '#fn-id' link)
//   { t: 'ul', c } | { t: 'ol', s?: start, c }   (tight lists: paragraphs already unwrapped)
//   { t: 'code', v }                   inline code
//   { t: 'pre', v, lang? }             fenced code
//   { t: 'img', src, alt?, ti? }
//   { t: 'table', a: [align|null...], c: [[cellChildren...]...] }   first row is the header
// Raw HTML becomes plain text, as react-markdown did without rehype-raw.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import { parseManuscript, linkFootnoteRefs, wordCount } from '../src/lib/manuscript.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
export const MANUSCRIPT_PATH = join(ROOT, 'already-past-us.md')
const PUBLIC_NAME = 'already-past-us.md'
const VIRTUAL_ID = 'virtual:manuscript'
const RESOLVED_ID = '\0' + VIRTUAL_ID

const processor = unified().use(remarkParse).use(remarkGfm)

// Same rule as react-markdown's defaultUrlTransform: keep relative URLs and safe protocols only.
const SAFE_PROTOCOL = /^(https?|ircs?|mailto|xmpp)$/i
function safeUrl(value) {
  const colon = value.indexOf(':')
  const q = value.indexOf('?')
  const hash = value.indexOf('#')
  const slash = value.indexOf('/')
  if (
    colon === -1 ||
    (slash !== -1 && colon > slash) ||
    (q !== -1 && colon > q) ||
    (hash !== -1 && colon > hash) ||
    SAFE_PROTOCOL.test(value.slice(0, colon))
  ) return value
  return ''
}

// mdast-util-to-hast trims spaces and tabs around line endings inside text.
const trimLines = s => s.replace(/[ \t]*(\r?\n|\r)[ \t]*/g, '$1')

const isLoose = list => list.spread || list.children.some(li => (li.spread == null ? li.children.length > 1 : li.spread))

function kids(node, ctx) {
  const out = []
  for (const child of node.children || []) {
    const c = compact(child, ctx)
    if (c == null) continue
    if (Array.isArray(c)) out.push(...c)
    else out.push(c)
  }
  // Merge adjacent strings to keep the tree small.
  const merged = []
  for (const c of out) {
    if (typeof c === 'string' && typeof merged[merged.length - 1] === 'string') merged[merged.length - 1] += c
    else merged.push(c)
  }
  return merged
}

function compact(node, ctx = {}) {
  switch (node.type) {
    case 'root': return kids(node, ctx)
    case 'text': return trimLines(node.value)
    case 'html': return node.value
    case 'paragraph': {
      const c = kids(node, ctx)
      return ctx.tight ? c : { t: 'p', c }
    }
    case 'emphasis': return { t: 'em', c: kids(node, {}) }
    case 'strong': return { t: 'strong', c: kids(node, {}) }
    case 'delete': return { t: 'del', c: kids(node, {}) }
    case 'inlineCode': return { t: 'code', v: node.value }
    case 'break': return { t: 'br' }
    case 'thematicBreak': return { t: 'hr' }
    case 'blockquote': return { t: 'blockquote', c: kids(node, {}) }
    case 'heading': return { t: 'h', d: node.depth, c: kids(node, {}) }
    case 'link': {
      // Footnote references ([^id], already turned into #fn-id links) become provenance chips.
      if (node.url.startsWith('#fn-')) return { t: 'f', i: node.url.slice(4) }
      const n = { t: 'a', h: safeUrl(node.url) }
      const c = kids(node, {})
      // Bare URLs (autolinks) show their own address: omit the duplicate children.
      if (!(c.length === 1 && c[0] === n.h)) n.c = c
      if (node.title) n.ti = node.title
      return n
    }
    case 'image': {
      const n = { t: 'img', src: safeUrl(node.url) }
      if (node.alt) n.alt = node.alt
      if (node.title) n.ti = node.title
      return n
    }
    case 'list': {
      const tight = !isLoose(node)
      const n = { t: node.ordered ? 'ol' : 'ul', c: node.children.map(li => {
        if (typeof li.checked === 'boolean') throw new Error('task list items are not supported by the manuscript renderer')
        return { t: 'li', c: kids(li, { tight }) }
      }) }
      if (node.ordered && typeof node.start === 'number' && node.start !== 1) n.s = node.start
      return n
    }
    case 'code': {
      const n = { t: 'pre', v: node.value }
      if (node.lang) n.lang = node.lang
      return n
    }
    case 'table': {
      const width = node.align?.length ?? 0
      return {
        t: 'table',
        a: (node.align || []).map(x => x || null),
        // Rows are padded to the column count, as mdast-util-to-hast does.
        c: node.children.map(row => {
          const cells = row.children.map(cell => kids(cell, {}))
          while (cells.length < width) cells.push([])
          return cells
        }),
      }
    }
    case 'footnoteReference':
    case 'footnoteDefinition':
    case 'definition':
      return null
    default:
      throw new Error(`manuscript renderer: unsupported markdown node "${node.type}"`)
  }
}

/** Markdown text to the compact tree (an array of top-level nodes). */
export function compileMarkdown(text) {
  return compact(processor.runSync(processor.parse(linkFootnoteRefs(text))))
}

/** The whole manuscript, parsed and compiled, ready to serialise. */
export function compileManuscript(source) {
  const { meta, sections, footnotes, problems } = parseManuscript(source)
  let words = 0
  const outSections = sections.map(s => ({
    id: s.id,
    num: s.num,
    title: s.title,
    notes: s.notes,
    blocks: s.blocks.map(b => {
      if (b.type === 'chart') return { type: 'chart', id: b.id }
      if (b.type === 'md') words += wordCount(b.text)
      const out = { type: b.type, tree: compileMarkdown(b.text) }
      if (b.type === 'expert' && b.label) out.label = b.label
      return out
    }),
  }))
  const outNotes = {}
  for (const [id, fn] of Object.entries(footnotes)) {
    outNotes[id] = { tag: fn.tag, n: fn.n, tree: compileMarkdown(fn.text) }
  }
  return { meta, sections: outSections, footnotes: outNotes, minutes: Math.round(words / 230), problems }
}

export default function manuscriptPlugin() {
  let isSsr = false
  return {
    name: 'apu-manuscript',
    configResolved(config) { isSsr = !!config.build.ssr },
    resolveId(id) { if (id === VIRTUAL_ID) return RESOLVED_ID },
    load(id) {
      if (id !== RESOLVED_ID) return
      this.addWatchFile(MANUSCRIPT_PATH)
      const { problems, ...doc } = compileManuscript(readFileSync(MANUSCRIPT_PATH, 'utf8'))
      if (problems.length) this.warn(`manuscript problems (npm run check for details):\n- ${problems.join('\n- ')}`)
      // JSON.parse of a string is faster to load than an equivalent object literal. Single quotes
      // keep the JSON's double quotes unescaped; JSON.stringify leaves no raw line breaks.
      const literal = JSON.stringify(doc).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
      return { code: `export default JSON.parse('${literal}')`, map: { mappings: '' } }
    },
    // Editing the manuscript in dev re-runs the virtual module; App.jsx hot-updates from it.
    handleHotUpdate({ file, server }) {
      if (resolve(file).toLowerCase() !== MANUSCRIPT_PATH.toLowerCase()) return
      const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
      if (!mod) { server.ws.send({ type: 'full-reload' }); return [] }
      server.moduleGraph.invalidateModule(mod)
      return [mod]
    },
    // Dev: serve the raw manuscript at /already-past-us.md.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if ((req.url || '').split('?')[0] !== '/' + PUBLIC_NAME) return next()
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
        res.end(readFileSync(MANUSCRIPT_PATH))
      })
    },
    // Build: copy it into dist/ (client build only).
    generateBundle() {
      if (isSsr) return
      this.emitFile({ type: 'asset', fileName: PUBLIC_NAME, source: readFileSync(MANUSCRIPT_PATH) })
    },
  }
}
