// Redraws public/og.png (the 1200x630 link-preview image) from the same data as the section 2 chart.
// Usage: node scripts/og/render-og.mjs, then open http://127.0.0.1:5199/ in a browser; the page draws
// on a canvas and posts the PNG back here, and the server exits after writing the file.
// Run it whenever src/data/frontier_snapshots.json changes. The build stamps og.png's hash into the
// og:image URL, so link previews (Discord, Slack, X) fetch the new image instead of a cached one.
import http from 'node:http'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const html = readFileSync(new URL('./og.html', import.meta.url))
const out = root + 'public/og.png'

function data() {
  const d = JSON.parse(readFileSync(root + 'src/data/frontier_snapshots.json', 'utf8'))
  const lines = d.snapshots.map(s => ({
    date: s.date,
    label: s.key === 'snap2' ? '6 months ago' : s.label,
    points: d.models
      .filter(m => m.snapshot === s.date && m.frontier)
      .map(m => [m.blended, m.eci])
      .sort((a, b) => a[0] - b[0]),
  }))
  const last = d.snapshots.at(-1).long.replace(/^(\d+) (\w{3})\w* (\d{4})$/, '$1 $2 $3')
  return { lines, asOf: `Data as of ${last}` }
}

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save') {
    let b = ''
    req.on('data', c => (b += c))
    req.on('end', () => {
      writeFileSync(out, Buffer.from(b.replace(/^data:image\/png;base64,/, ''), 'base64'))
      res.end('ok')
      console.log('wrote', out)
      setTimeout(() => process.exit(0), 200)
    })
    return
  }
  if (req.url === '/data') { res.setHeader('content-type', 'application/json'); return res.end(JSON.stringify(data())) }
  res.setHeader('content-type', 'text/html; charset=utf-8')
  res.end(html)
}).listen(5199, '127.0.0.1', () => console.log('og server on http://127.0.0.1:5199/'))
