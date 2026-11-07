import { memo, useEffect, useMemo, useState } from 'react'
import source from '../already-past-us.md?raw'
import { parseManuscript, wordCount } from './lib/manuscript.js'
import { DATA_AS_OF_LABEL, daysSince, decayTier } from './lib/dates.js'
import { FootnoteContext, SectionNotes } from './components/Footnotes.jsx'
import { Md } from './components/Md.jsx'
import { CHARTS } from './charts/registry.js'
import { hashId, revealId } from './lib/reveal.js'

const doc = parseManuscript(source)

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

function DecayBanner() {
  const days = daysSince()
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
  const nextTheme = { auto: 'light', light: 'dark', dark: 'auto' }[theme]
  const activeSection = doc.sections.find(s => s.id === active)
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <a className="topbar__title" href="#top">Already Past Us</a>
        <span className="topbar__where">
          {activeSection && activeSection.num ? `${activeSection.num}. ${activeSection.title}` : ''}
        </span>
        <div className="topbar__controls">
          <div className="segmented segmented--mode" role="group" aria-label="Reading mode">
            <button type="button" aria-pressed={mode === 'brief'} className={mode === 'brief' ? 'is-active' : ''} onClick={() => setMode('brief')}>Brief</button>
            <button type="button" aria-pressed={mode === 'expert'} className={mode === 'expert' ? 'is-active' : ''} onClick={() => setMode('expert')}>Expert</button>
          </div>
          <button type="button" className="theme-btn" onClick={() => setTheme(nextTheme)} aria-label={`Colour theme: ${theme}. Switch to ${nextTheme}.`} title={`Theme: ${theme}`}>
            <ThemeIcon theme={theme} />
          </button>
        </div>
      </div>
    </header>
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

function ExpertNote({ text, mode }) {
  return (
    <details className="expert" open={mode === 'expert'}>
      <summary>Expert note</summary>
      <div className="expert__body"><Md text={text} /></div>
    </details>
  )
}

function Block({ block, mode }) {
  if (block.type === 'md') return <Md text={block.text} />
  if (block.type === 'expert') return <ExpertNote key={mode} text={block.text} mode={mode} />
  if (block.type === 'chart') {
    const Chart = CHARTS[block.id]
    return Chart ? <Chart /> : null
  }
  return null
}

// Memoised: scrolling updates the active section in App, which must not re-parse every block.
const Section = memo(function Section({ section, mode }) {
  const isLead = section.id === 's0'
  return (
    <section className={`section${isLead ? ' section--lead' : ''}`} id={section.id} aria-labelledby={`${section.id}-h`}>
      <h2 id={`${section.id}-h`} className="section__title">
        {section.num && <span className="section__num">{section.num.padStart(2, '0')}</span>}
        {section.title}
      </h2>
      {section.blocks.map((b, i) => <Block key={`${b.type}-${i}`} block={b} mode={mode} />)}
      <SectionNotes ids={section.notes} />
    </section>
  )
})

export default function App() {
  const [mode, setModeState] = useState(readMode)
  const [theme, setThemeState] = useState(readTheme)
  const [active, setActive] = useState(doc.sections[0]?.id)

  const setMode = m => {
    setModeState(m)
    const url = new URL(window.location.href)
    if (m === 'expert') url.searchParams.set('mode', 'expert')
    else url.searchParams.delete('mode')
    window.history.replaceState(null, '', url)
  }
  const setTheme = t => {
    setThemeState(t)
    try { localStorage.setItem('apu-theme', t) } catch { /* storage unavailable */ }
  }

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'auto') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
  }, [theme])

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

  const minutes = useMemo(() => {
    const words = doc.sections.flatMap(s => s.blocks).filter(b => b.type === 'md').reduce((n, b) => n + wordCount(b.text), 0)
    return Math.round(words / 230)
  }, [])

  const { meta } = doc
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
              <span className="tag-chip tag-chip--verified">Verified</span>
              <span className="tag-chip tag-chip--vendor">Vendor-reported</span>
              <span className="tag-chip tag-chip--estimate">Estimate</span>
              <span className="tag-chip tag-chip--calc">Our calculation</span>
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
            <p className="footer__stamp">Build {__BUILD_STAMP__}</p>
        </footer>
      </div>
    </FootnoteContext.Provider>
  )
}
