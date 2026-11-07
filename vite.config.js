import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: { __BUILD_STAMP__: JSON.stringify(new Date().toISOString().slice(0, 10)) },
  server: { port: 5181 },
  // One long page that needs all of its code at once; splitting would only add round trips.
  build: { chunkSizeWarningLimit: 900 },
})
