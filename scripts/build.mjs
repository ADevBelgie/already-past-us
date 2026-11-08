// Production build: client bundle, SSR bundle, pre-render into dist/index.html, pre-render check.
// Both Vite builds run in this one process with the same APU_BUILD_STAMP, so the footer's build
// date is identical in the server HTML and the client bundle (a mismatch would break hydration).
import { build } from 'vite'

process.env.APU_BUILD_STAMP ??= new Date().toISOString().slice(0, 10)

await build()
await build({ build: { ssr: 'src/entry-server.jsx', outDir: 'dist-ssr' } })
await import('./prerender.mjs')
await import('./check-prerender.mjs')
