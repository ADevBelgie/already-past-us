// Compile one chart component in isolation (library build, deps external) to catch syntax and
// import errors without touching other charts or the shared dist/ folder.
// Usage: node scripts/check-chart.mjs src/charts/FrontierSnapshots.jsx
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve, basename } from 'node:path'

const file = process.argv[2]
if (!file) { console.error('usage: node scripts/check-chart.mjs <component.jsx>'); process.exit(2) }
const out = mkdtempSync(join(tmpdir(), 'apu-chart-'))
try {
  await build({
    configFile: false,
    logLevel: 'warn',
    plugins: [react()],
    define: { __BUILD_STAMP__: '"check"' },
    build: {
      outDir: out,
      emptyOutDir: true,
      lib: { entry: resolve(file), formats: ['es'], fileName: basename(file, '.jsx') },
      rolldownOptions: { external: id => /^(react|react-dom|d3-.*)(\/|$)/.test(id) },
    },
  })
  console.log(`OK: ${file} compiles`)
} catch (e) {
  console.error(`FAIL: ${file}\n${e.message}`)
  process.exitCode = 1
} finally {
  rmSync(out, { recursive: true, force: true })
}
