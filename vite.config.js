import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import manuscript from './scripts/manuscript-plugin.mjs'

export default defineConfig({
  // manuscript: compiles already-past-us.md into 'virtual:manuscript' and serves /already-past-us.md.
  plugins: [react(), manuscript()],
  // scripts/build.mjs sets APU_BUILD_STAMP once for both the client and the SSR build.
  define: { __BUILD_STAMP__: JSON.stringify(process.env.APU_BUILD_STAMP ?? new Date().toISOString().slice(0, 10)) },
  server: { port: 5181 },
  // One long page that needs all of its code at once; splitting would only add round trips.
  build: { chunkSizeWarningLimit: 900 },
})
