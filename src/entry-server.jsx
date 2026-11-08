// Server entry for the build-time pre-render (scripts/prerender.mjs). Not used in dev.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'

// Must stay identical to the tree in main.jsx.
export function render() {
  return renderToString(
    <StrictMode>
      <ErrorBoundary><App /></ErrorBoundary>
    </StrictMode>,
  )
}
