// Builds a review copy of the Brief for wording feedback, published as a private claude.ai artifact.
//
// Usage: npm run build && node scripts/review/make-review-page.mjs
// Output: review/already-past-us-review.html (gitignored), published with the Artifact tool and the
// `comments` capability ({comments: {composer_only: true}}).
//
// The copy is the site's own pre-rendered HTML (dist/index.html) with the site's CSS and fonts inlined
// and no site JavaScript: the text, charts and folded expert notes look as they do on the site in
// Brief mode. A small script adds a "Comment on selection" button that opens claude.ai's comment
// composer on the selected words, so each comment carries the exact quote it is about.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { execSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const dist = join(root, 'dist')
const html = readFileSync(join(dist, 'index.html'), 'utf8')

const start = html.indexOf('<div id="root">')
const end = html.lastIndexOf('</body>')
if (start < 0 || end < start) throw new Error('dist/index.html has no #root; run npm run build first')
let body = html.slice(start, end).trim()
if (/<script/i.test(body)) body = body.replace(/<script[\s\S]*?<\/script>/gi, '')
// Root-relative links would point inside claude.ai; send them to the live site.
body = body.replace(/href="\/(?!\/)/g, 'href="https://already-past-us.vercel.app/')

const cssFile = readdirSync(join(dist, 'assets')).find(f => f.endsWith('.css'))
let css = readFileSync(join(dist, 'assets', cssFile), 'utf8')
css = css.replace(/url\(\/fonts\/([\w.-]+\.woff2)\)/g, (_, f) =>
  `url(data:font/woff2;base64,${readFileSync(join(dist, 'fonts', f)).toString('base64')})`)

let commit = 'uncommitted'
try { commit = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim() } catch {}
const built = new Date().toISOString().slice(0, 16).replace('T', ' ')

const reviewCss = `
/* Review copy: the site's controls need its JavaScript, which this copy does not run. */
.skip, .decay, .topbar, .layout__aside, .hero__mode-hint, .footer__stamp { display: none !important; }
.layout { display: block; }
.review-bar {
  position: sticky; top: env(safe-area-inset-top, 0px); z-index: 30;
  background: var(--paper-2); border-bottom: 1px solid var(--rule);
  font: 400 0.82rem/1.45 var(--font-sans); color: var(--ink-2);
  padding-block: 10px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px));
}
body::before { content: ""; position: fixed; inset: 0 0 auto; height: env(safe-area-inset-top, 0px); z-index: 31; background: var(--paper-2); }
.review-bar__inner { max-width: 44rem; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 4px 12px; align-items: baseline; }
.review-bar strong { color: var(--ink); font-weight: 600; }
.review-bar__stamp { color: var(--ink-3); font-family: var(--font-mono); font-size: 0.72rem; }
.review-fab {
  position: fixed; z-index: 40; left: 50%; transform: translateX(-50%);
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  display: inline-flex; align-items: center; gap: 8px;
  border: 0; border-radius: 999px; padding: 12px 20px; min-height: 44px;
  background: var(--ink); color: var(--paper); font: 600 0.92rem var(--font-sans);
  box-shadow: 0 6px 24px rgb(0 0 0 / 0.25); cursor: pointer; white-space: nowrap;
}
.review-fab:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
.review-fab svg { width: 18px; height: 18px; }
.review-toast {
  position: fixed; z-index: 40; left: max(16px, env(safe-area-inset-left, 0px)); right: max(16px, env(safe-area-inset-right, 0px));
  bottom: calc(76px + env(safe-area-inset-bottom, 0px)); max-width: 30rem; margin: 0 auto;
  background: var(--card); color: var(--ink); border: 1px solid var(--rule); border-radius: 10px;
  padding: 10px 14px; font: 400 0.85rem/1.45 var(--font-sans); box-shadow: var(--shadow);
}
@media print { .review-bar, .review-fab, .review-toast { display: none !important; } }
`

const bar = `
<div class="review-bar" data-uncommentable>
  <div class="review-bar__inner">
    <span><strong>Review copy of the Brief.</strong> Select any words and tap <strong>Comment</strong> to mark them for a rewrite; add a direction in the comment if you have one. Expert notes and source lists open as on the site.</span>
    <span class="review-bar__stamp">Built ${built} · commit ${commit}</span>
  </div>
</div>`

const ui = `
<button type="button" class="review-fab" id="review-fab" hidden data-uncommentable>
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 4h12v9H8l-4 3V4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
  Comment on selection
</button>
<div class="review-toast" id="review-toast" role="status" hidden data-uncommentable></div>
<script>
(() => {
  const fab = document.getElementById('review-fab')
  const toast = document.getElementById('review-toast')
  const article = document.getElementById('root')
  let saved = null
  let comments = null
  let off = false

  const say = (text, ms = 5000) => {
    toast.textContent = text
    toast.hidden = false
    clearTimeout(say.t)
    say.t = setTimeout(() => { toast.hidden = true }, ms)
  }

  // Keep the last selection inside the article: on phones, tapping the button can clear it.
  document.addEventListener('selectionchange', () => {
    const sel = document.getSelection()
    if (sel && sel.rangeCount && !sel.isCollapsed && article.contains(sel.getRangeAt(0).commonAncestorContainer)) {
      saved = sel.getRangeAt(0).cloneRange()
      if (!off) fab.hidden = false
    } else if (!fab.matches(':hover, :focus')) {
      setTimeout(() => { const s = document.getSelection(); if (!s || s.isCollapsed) fab.hidden = true }, 400)
    }
  })

  // Keep the selection when the button is pressed (mouse and touch).
  fab.addEventListener('pointerdown', e => e.preventDefault())

  fab.addEventListener('click', async () => {
    if (!saved) return
    if (!comments) {
      say('Comments are not available in this view. Open the copy on claude.ai, signed in, to comment.')
      return
    }
    try {
      const r = await comments.openComposer({ range: saved })
      if (!r.opened) say('Finish or close the comment that is already open, then try again.')
      else fab.hidden = true
    } catch (err) {
      if (err && (err.code === 'unavailable' || err.code === 'not_granted' || err.code === 'capability_disabled' || err.code === 'capability_removed')) {
        off = true
        fab.hidden = true
        say('Commenting from the page is off here. Use the comment button in the artifact toolbar instead.', 8000)
      } else if (err && err.code === 'rate_limited') {
        say('Too many comments at once. Wait a moment and try again.')
      } else {
        say('The comment box did not open. Try again, or use the comment button in the artifact toolbar.')
      }
    }
  })

  window.claude?.use?.('comments').then(c => { comments = c; if (!c) off = true }).catch(() => { off = true })
})()
</script>`

const page = `<title>Already Past Us Review</title>
<style>${css}
${reviewCss}</style>
${bar}
${body}
${ui}
`
mkdirSync(join(root, 'review'), { recursive: true })
const out = join(root, 'review', 'already-past-us-review.html')
writeFileSync(out, page)
console.log(`Wrote ${out} (${Math.round(page.length / 1024)} KB, commit ${commit})`)
