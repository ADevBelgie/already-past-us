// Scroll to an element by id, opening any collapsed <details> that holds it.
// Shared by hash navigation (App) and the "Show in this section's sources" link (Footnotes).
export function revealId(id) {
  if (!id) return
  const el = document.getElementById(id)
  if (!el) return
  const details = el.closest('details')
  if (details && !details.open) details.open = true
  // Sections align to the top (scroll-padding clears the sticky bar); single notes are centred.
  el.scrollIntoView({ block: id.startsWith('fn-') ? 'center' : 'start' })
  if (id.startsWith('fn-')) {
    el.classList.add('is-flash')
    setTimeout(() => el.classList.remove('is-flash'), 1600)
  }
}

export function hashId() {
  try {
    return decodeURIComponent(window.location.hash.slice(1))
  } catch {
    return '' // malformed escape such as "#%": ignore rather than crash
  }
}
