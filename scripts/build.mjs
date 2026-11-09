// Production build: client bundle, SSR bundle, pre-render into dist/index.html, pre-render check.
// Both Vite builds run in this one process with the same APU_BUILD_STAMP, so the footer's build
// date is identical in the server HTML and the client bundle (a mismatch would break hydration).
import { build } from 'vite'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'

process.env.APU_BUILD_STAMP ??= new Date().toISOString().slice(0, 10)

await build()
await build({ build: { ssr: 'src/entry-server.jsx', outDir: 'dist-ssr' } })
await import('./prerender.mjs')
// Link previews (Discord, Slack, X) cache og:image by URL; stamp the image's hash into the URL so a
// redrawn public/og.png (scripts/og/render-og.mjs) shows up instead of the cached copy.
{
  const v = createHash('sha256').update(readFileSync('public/og.png')).digest('hex').slice(0, 10)
  const html = readFileSync('dist/index.html', 'utf8')
  const stamped = html.replaceAll('/og.png"', `/og.png?v=${v}"`)
  if (stamped === html) throw new Error('build: no og.png URL found in dist/index.html')
  writeFileSync('dist/index.html', stamped)
}
await import('./check-prerender.mjs')
