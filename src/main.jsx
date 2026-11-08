import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'

// Must stay identical to the tree in entry-server.jsx, or hydration (and useId) will not match.
const app = (
  <StrictMode>
    <ErrorBoundary><App /></ErrorBoundary>
  </StrictMode>
)

const root = document.getElementById('root')
// Production pages arrive pre-rendered (scripts/prerender.mjs) and are hydrated; dev renders from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
