import { Component } from 'react'

// Last-resort guard: if anything throws while rendering, show a readable message instead of a blank page.
export class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <main style={{ maxWidth: '40rem', margin: '4rem auto', padding: '0 16px', fontFamily: 'var(--font-sans)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}>Already Past Us</h1>
        <p>Something went wrong while drawing this page. Reloading usually fixes it.</p>
        <p><a href="/">Reload the briefing</a></p>
      </main>
    )
  }
}
