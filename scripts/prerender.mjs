// Build step: render the app to HTML with the SSR bundle and put it inside dist/index.html's
// #root, so the article is readable before (and without) JavaScript. main.jsx then hydrates it.
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ssrDir = join(root, 'dist-ssr')
const htmlPath = join(root, 'dist', 'index.html')
const entry = join(ssrDir, 'entry-server.js')

if (!existsSync(entry)) { console.error(`prerender: ${entry} not found (run vite build --ssr first)`); process.exit(1) }

const { render } = await import(pathToFileURL(entry).href)
const app = render()
const html = readFileSync(htmlPath, 'utf8')
const slot = '<div id="root"></div>'
if (!html.includes(slot)) { console.error(`prerender: ${slot} not found in dist/index.html`); process.exit(1) }
// A function replacement, so "$&"-style sequences in the article are not treated as patterns.
writeFileSync(htmlPath, html.replace(slot, () => `<div id="root">${app}</div>`))
rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerender: wrote ${(app.length / 1024).toFixed(0)} KB of HTML into dist/index.html`)
