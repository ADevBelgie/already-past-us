import { memo, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
// The manuscript, parsed and compiled to a compact tree at build time (scripts/manuscript-plugin.mjs).
import doc from 'virtual:manuscript'
import { TAGS } from './lib/manuscript.js'
import { DATA_AS_OF_LABEL, decayTier, useDaysSince } from './lib/dates.js'
import { FootnoteContext, SectionNotes } from './components/Footnotes.jsx'
import { Md } from './components/Md.jsx'
import { CHARTS } from './charts/registry.js'
import { hashId, revealId } from './lib/reveal.js'

// The page is pre-rendered at build time and hydrated, so the first render must not depend on the
// URL, storage, media queries or the clock. Those are read after mount (readMode, readTheme, sys).
function readMode() {
  const m = new URLSearchParams(window.location.search).get('mode')
  return m === 'expert' ? 'expert' : 'brief'
}

function readTheme() {
  try {
    const t = localStorage.getItem('apu-theme')
    return t === 'light' || t === 'dark' ? t : 'auto'
  } catch { return 'auto' }
}

const DARK_QUERY = '(prefers-color-scheme: dark)'
const systemTheme = () => (window.matchMedia?.(DARK_QUERY).matches ? 'dark' : 'light')

/** The operating-system colour preference, kept live ('light' until mounted). */
function useSystemTheme() {
  const [sys, setSys] = useState('light')
  useEffect(() => {
    setSys(systemTheme())
    const mq = window.matchMedia?.(DARK_QUERY)
    if (!mq) return
    const on = () => setSys(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return sys
}

/**
 * Keeps the browser chrome colour (<meta name="theme-color"> in index.html) in step with the visible
 * theme. The two metas carry media queries for the OS preference; a manual theme overrides both with
 * that theme's paper colour, read from the meta for that scheme, and 'auto' restores the originals.
 */
function useThemeColor(theme) {
  useEffect(() => {
    const metas = [...document.querySelectorAll('meta[name="theme-color"]')]
    for (const m of metas) m.dataset.auto ??= m.content
    const paper = scheme => metas.find(m => m.media.includes(scheme))?.dataset.auto
    for (const m of metas) m.content = (theme !== 'auto' && paper(theme)) || m.dataset.auto
  }, [theme])
}

const sectionLabel = s => (s ? (s.num ? `${s.num}. ${s.title}` : s.title) : '')

function DecayBanner() {
  const days = useDaysSince()
  const tier = decayTier(days)
  return (
    <div className={`decay decay--${tier}`} role="region" aria-label="Data freshness">
      <span className="decay__inner">
        Data as of {DATA_AS_OF_LABEL}
        {days > 0 && <> · {days} {days === 1 ? 'day' : 'days'} old</>}
        {tier === 'warn' && <>. Leaderboards move every few weeks: re-check a figure before quoting it.</>}
        {tier === 'alarm' && <>. Treat leaderboard figures here as historical.</>}
      </span>
    </div>
  )
}

function TopBar({ mode, setMode, theme, setTheme, active }) {
  const sys = useSystemTheme()
  const shown = theme === 'auto' ? sys : theme
  const next = shown === 'dark' ? 'light' : 'dark'
  // One click always flips what the reader sees; landing back on the OS preference returns to 'auto'.
  const flipTheme = () => setTheme(next === sys ? 'auto' : next)
  const label = sectionLabel(doc.sections.find(s => s.id === active))
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <a className="topbar__title" href="#top">Already Past Us</a>
        <div className="topbar__where">
          <span className="topbar__where-text">{label}</span>
          <ContentsMenu active={active} label={label} />
        </div>
        <div className="topbar__controls">
          <div className="segmented segmented--mode" role="group" aria-label="Reading mode">
            <button type="button" aria-pressed={mode === 'brief'} className={mode === 'brief' ? 'is-active' : ''} onClick={() => setMode('brief')}>Brief</button>
            <button type="button" aria-pressed={mode === 'expert'} className={mode === 'expert' ? 'is-active' : ''} onClick={() => setMode('expert')}>Expert</button>
          </div>
          <button type="button" className="theme-btn" onClick={flipTheme} aria-label={`Switch to ${next} theme`} title={`Switch to ${next} theme`}>
            <ThemeIcon theme={shown} />
          </button>
        </div>
      </div>
    </header>
  )
}

/** Below 1180px the sidebar contents list is hidden; the top bar label opens the same list as a menu. */
function ContentsMenu({ active, label }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  const btn = useRef(null)
  const menu = useRef(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const m = menu.current
    const current = m?.querySelector('[aria-current]') ?? m?.querySelector('a')
    current?.focus({ preventScroll: true })
    // Scroll only the menu (not the page) so the current item is in view; the nav is its offsetParent.
    if (m && current) m.scrollTop = Math.max(0, current.offsetTop - (m.clientHeight - current.offsetHeight) / 2)
    const onDoc = e => { if (!wrap.current?.contains(e.target)) setOpen(false) }
    const onKey = e => {
      if (e.key !== 'Escape') return
      setOpen(false)
      if (wrap.current?.contains(document.activeElement)) btn.current?.focus()
    }
    document.addEventListener('pointerdown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // The chosen link is hidden with the menu, so move focus to the section heading instead of <body>;
  // the hash navigation that follows does the scrolling.
  const choose = id => {
    setOpen(false)
    document.getElementById(`${id}-h`)?.focus({ preventScroll: true })
  }

  // Close when keyboard focus moves out of the button and menu.
  const onBlur = e => {
    const to = e.relatedTarget
    if (to && !wrap.current?.contains(to)) setOpen(false)
  }

  return (
    <div className="topbar__menu" ref={wrap} onBlur={onBlur}>
      <button ref={btn} type="button" className="topbar__menu-btn" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(o => !o)}>
        <span className="topbar__menu-kicker">Contents</span>
        <span className="topbar__menu-current">{label}</span>
        <svg className="topbar__menu-chev" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <nav className="topbar-menu" id={menuId} ref={menu} aria-label="Contents" hidden={!open}>
        <ol>
          {doc.sections.map(s => (
            <li key={s.id} className={s.id === active ? 'is-active' : ''}>
              <a href={`#${s.id}`} aria-current={s.id === active ? 'location' : undefined} onClick={() => choose(s.id)}>
                <span className="toc__num">{s.num}</span>
                <span>{s.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

function ThemeIcon({ theme }) {
  if (theme === 'light') return <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="4" fill="currentColor" /><g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">{[0, 45, 90, 135, 180, 225, 270, 315].map(a => <line key={a} x1="10" y1="2" x2="10" y2="4" transform={`rotate(${a} 10 10)`} />)}</g></svg>
  if (theme === 'dark') return <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M14.5 13.5A6.5 6.5 0 0 1 7 4a6.5 6.5 0 1 0 7.5 9.5z" fill="currentColor" /></svg>
  return <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M10 3a7 7 0 0 1 0 14z" fill="currentColor" /></svg>
}

function Toc({ active }) {
  return (
    <nav className="toc" aria-label="Contents">
      <p className="toc__label">Contents</p>
      <ol>
        {doc.sections.map(s => (
          <li key={s.id} className={s.id === active ? 'is-active' : ''}>
            <a href={`#${s.id}`} aria-current={s.id === active ? 'location' : undefined}>
              {s.num && <span className="toc__num">{s.num}</span>}
              <span>{s.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function ExpertNote({ label, tree, mode }) {
  return (
    <details className="expert" open={mode === 'expert'}>
      {/* aria-label: the visible separator is aria-hidden and the spans have no whitespace between them. */}
      <summary aria-label={label ? `Expert note: ${label}` : undefined}>
        <span className="expert__kicker">Expert note</span>
        {label && <><span className="expert__sep" aria-hidden="true">·</span><span className="expert__label">{label}</span></>}
      </summary>
      <div className="expert__body"><Md tree={tree} /></div>
    </details>
  )
}

function Block({ block, mode }) {
  if (block.type === 'md') return <Md tree={block.tree} />
  if (block.type === 'expert') return <ExpertNote key={mode} label={block.label} tree={block.tree} mode={mode} />
  if (block.type === 'chart') {
    const Chart = CHARTS[block.id]
    return Chart ? <Chart /> : null
  }
  return null
}

/** A provenance chip in the hero legend that shows its one-line definition on hover, focus or tap. */
function LegendChip({ tag }) {
  // Hover, focus and tap are tracked separately so losing one does not hide a tip another still holds.
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [tapped, setTapped] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const shown = (hovered || focused || tapped) && !dismissed
  const wrap = useRef(null)
  const tip = useRef(null)
  const tipId = useId()
  const { key, label, blurb } = TAGS[tag]

  // Escape dismisses the tip without moving hover or focus; a tap elsewhere hides it on touch screens.
  useEffect(() => {
    if (!shown) return
    const onKey = e => { if (e.key === 'Escape') setDismissed(true) }
    const onDoc = e => { if (!wrap.current?.contains(e.target)) { setTapped(false); setDismissed(true) } }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDoc)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDoc)
    }
  }, [shown])

  // The chips wrap, so pick the tip's horizontal offset from where it actually lands: keep it
  // inside the viewport, one gutter (16px) from each edge.
  useLayoutEffect(() => {
    const el = tip.current
    if (!shown || !el) return
    const place = () => {
      el.style.transform = ''
      const r = el.getBoundingClientRect()
      const max = document.documentElement.clientWidth - 16
      let dx = 0
      if (r.right > max) dx = max - r.right
      if (r.left + dx < 16) dx = 16 - r.left
      if (dx) el.style.transform = `translateX(${Math.round(dx)}px)`
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [shown])

  // A new hover or focus brings back a tip that Escape or an outside tap dismissed.
  const enter = set => () => { set(true); setDismissed(false) }

  return (
    <span className="legend-chip" ref={wrap} onMouseEnter={enter(setHovered)} onMouseLeave={() => setHovered(false)}>
      <button
        type="button"
        className={`tag-chip tag-chip--${key} legend-chip__btn`}
        aria-describedby={tipId}
        onFocus={enter(setFocused)}
        onBlur={() => { setFocused(false); setTapped(false) }}
        // A second tap (or click, or Enter) hides the tip again.
        onClick={() => {
          if (tapped) { setTapped(false); setDismissed(true) } else { setTapped(true); setDismissed(false) }
        }}
      >
        {label}
      </button>
      <span role="tooltip" id={tipId} ref={tip} className={`legend-chip__tip${shown ? ' is-shown' : ''}`}>{blurb}</span>
    </span>
  )
}

// Memoised: scrolling updates the active section in App, which must not re-parse every block.
const Section = memo(function Section({ section, mode }) {
  const isLead = section.id === 's0'
  return (
    <section className={`section${isLead ? ' section--lead' : ''}`} id={section.id} aria-labelledby={`${section.id}-h`}>
      <h2 id={`${section.id}-h`} className="section__title" tabIndex={-1}>
        {/* Hidden from screen readers so the heading is not read as "01Progress"; the contents list keeps the number. */}
        {section.num && <span className="section__num" aria-hidden="true">{section.num.padStart(2, '0')}</span>}
        {section.title}
      </h2>
      {section.blocks.map((b, i) => <Block key={`${b.type}-${i}`} block={b} mode={mode} />)}
      <SectionNotes ids={section.notes} />
    </section>
  )
})

export default function App() {
  const [mode, setModeState] = useState('brief')
  const [theme, setThemeState] = useState('auto')
  const [active, setActive] = useState(doc.sections[0]?.id)

  // After hydration: apply ?mode=expert and the saved theme (the inline script in index.html
  // has already set data-theme on <html> before first paint).
  useEffect(() => {
    const m = readMode()
    if (m !== 'brief') setModeState(m)
    setThemeState(readTheme())
  }, [])

  const setMode = m => {
    setModeState(m)
    const url = new URL(window.location.href)
    if (m === 'expert') url.searchParams.set('mode', 'expert')
    else url.searchParams.delete('mode')
    window.history.replaceState(null, '', url)
  }
  // Applied here rather than in an effect, so mounting with the default 'auto' never clears
  // the data-theme that the inline script set from storage.
  const setTheme = t => {
    setThemeState(t)
    const root = document.documentElement
    if (t === 'auto') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', t)
    try { localStorage.setItem('apu-theme', t) } catch { /* storage unavailable */ }
  }
  useThemeColor(theme)

  // Track the section in view for the contents list and top bar.
  useEffect(() => {
    const els = doc.sections.map(s => document.getElementById(s.id)).filter(Boolean)
    const io = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-15% 0px -70% 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // A #fn-… or #sN link opens the collapsed source list that holds it and scrolls there.
  // On a cold load, wait for fonts and chart sizing to settle so the target does not drift.
  useEffect(() => {
    const reveal = () => revealId(hashId())
    let cancelled = false
    if (hashId()) {
      document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(() => { if (!cancelled) reveal() })))
    }
    window.addEventListener('hashchange', reveal)
    return () => { cancelled = true; window.removeEventListener('hashchange', reveal) }
  }, [])

  // Printing: closed <details> (expert notes, source lists) cannot be forced open by CSS alone.
  useEffect(() => {
    const opened = []
    const before = () => document.querySelectorAll('details:not([open])').forEach(d => { d.open = true; opened.push(d) })
    const after = () => { opened.forEach(d => { d.open = false }); opened.length = 0 }
    window.addEventListener('beforeprint', before)
    window.addEventListener('afterprint', after)
    return () => { window.removeEventListener('beforeprint', before); window.removeEventListener('afterprint', after) }
  }, [])

  const { meta, minutes } = doc
  const ctx = useMemo(() => ({ footnotes: doc.footnotes }), [])

  return (
    <FootnoteContext.Provider value={ctx}>
      <a className="skip" href="#s0">Skip to the briefing</a>
      <DecayBanner />
      <TopBar mode={mode} setMode={setMode} theme={theme} setTheme={setTheme} active={active} />
      <div className="layout" id="top">
        <aside className="layout__aside"><Toc active={active} /></aside>
        <main className="layout__main">
          <header className="hero">
            <p className="hero__kicker">A data briefing · November 2026</p>
            <h1 className="hero__title">{meta.title}</h1>
            <p className="hero__subtitle">{meta.subtitle}</p>
            <p className="hero__meta">
              <span>{meta.byline}</span>
              <span aria-hidden="true">·</span>
              <span>{meta.data_as_of}</span>
              <span aria-hidden="true">·</span>
              <span>{minutes} min read</span>
            </p>
            <div className="hero__legend" role="group" aria-labelledby="legend-label">
              <span className="hero__legend-label" id="legend-label">Every number is tagged by who measured it:</span>
              {Object.keys(TAGS).map(tag => <LegendChip key={tag} tag={tag} />)}
            </div>
            <p className="hero__mode-hint">
              {mode === 'brief'
                ? <>You are reading the <strong>Brief</strong>. Expert notes are folded away; open any of them, or switch to <button type="button" className="linklike" onClick={() => setMode('expert')}>Expert</button> to show them all.</>
                : <>You are reading the <strong>Expert</strong> version: every expert note is open. <button type="button" className="linklike" onClick={() => setMode('brief')}>Back to Brief</button>.</>}
            </p>
          </header>
          {doc.sections.map(s => <Section key={s.id} section={s} mode={mode} />)}
        </main>
        <footer className="footer">
            <p>
              <strong>Already Past Us</strong> · {meta.byline} · {meta.data_as_of}. Built from a single source manuscript; every figure links to its source.
              Previous briefing: <a href="https://measuring-the-end-of-measurement.vercel.app" target="_blank" rel="noopener noreferrer">Measuring the End of Measurement</a> (July 2026).
            </p>
            <p className="footer__links">
              <a href="/already-past-us.md">Read the manuscript (Markdown)</a>
              <span aria-hidden="true"> · </span>
              <a href="https://github.com/ADevBelgie/already-past-us" target="_blank" rel="noopener noreferrer">Source, research and data on GitHub</a>
            </p>
            <p className="footer__stamp">Build {__BUILD_STAMP__}</p>
        </footer>
      </div>
    </FootnoteContext.Provider>
  )
}
