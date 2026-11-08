// Build gate: dist/index.html must carry the pre-rendered article, with every section s0..s9.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const html = readFileSync(join(root, 'dist', 'index.html'), 'utf8')
const problems = []

const open = html.indexOf('<div id="root">')
if (open === -1) problems.push('no <div id="root"> in dist/index.html')
else if (html.startsWith('<div id="root"></div>', open)) problems.push('#root is empty: the pre-render did not run')

const body = open === -1 ? '' : html.slice(open)
for (let i = 0; i <= 9; i++) {
  if (!new RegExp(`<section[^>]*\\sid="s${i}"`).test(body)) problems.push(`#root has no section with id="s${i}"`)
}
if (!/class="hero"/.test(body)) problems.push('#root has no hero header')

if (problems.length) {
  console.error('Pre-render check failed:\n- ' + problems.join('\n- '))
  process.exit(1)
}
console.log('Pre-render OK: #root holds the hero and sections s0..s9')
