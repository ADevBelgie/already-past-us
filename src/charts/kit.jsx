// Shared building blocks for every chart. Charts are plain SVG drawn with d3-scale/d3-shape.
// Colours always come from CSS custom properties (see src/styles.css) so light and dark mode
// both work without any chart-specific code.
//
// Pre-render contract (see README): the page is rendered in Node at build time and hydrated in
// the browser, so a chart's first render must not depend on the real screen.
// - Width. <Figure> passes children(width) a width that starts at SSR_WIDE (960, the desktop width
//   of a wide figure) or SSR_NARROW (640, the text column) and becomes the measured width after
//   mount. A chart that calls useWidth itself passes the same constant: useWidth(SSR_WIDE).
// - Scaling until hydration. Give every chart <svg> a viewBox matching its pixel size, e.g.
//   <svg {...svgSize(width, height)}>. styles.css lets any `.figure__body svg[viewBox]` shrink to
//   its container (max-width: 100%; height: auto), so the 960px server SVG fits a phone before
//   JavaScript runs; after hydration width equals the container and the scaling is a no-op.
//   Proportional scaling gets the height wrong whenever the hydrated height is not width * 540/960,
//   so a chart should also reserve its hydrated height in CSS: an inline style={{ height }} when the
//   height does not depend on width, a clamp() in cqw for a height that is a share of the width, or
//   CSS variables plus @container figure for a layout switch (see MetrCurve, ForecastDumbbell,
//   RsiDashboard). Until hydration the scaled drawing is centred in that box.
// - Layout that changes with width belongs in CSS: .figure__body is a size container named
//   `figure`, so chart CSS can use @container figure (width >= 520px) { ... } and the server HTML
//   is right at every width (see StatCards.css).
// - Tooltips. usePinnableTip() gives one behaviour for mouse, keyboard and touch (hover or focus
//   shows, click/tap/Enter pins, Escape or a tap elsewhere clears); pass its tipProps to <Tooltip>.
import { useEffect, useId, useRef, useState } from 'react'
import { FootnoteRef } from '../components/Footnotes.jsx'

/** Server / first-render widths: a wide figure on desktop (var(--wide)) and the text column (var(--measure)). */
export const SSR_WIDE = 960
export const SSR_NARROW = 640

/** CSS colour tokens for use in SVG fill/stroke attributes. */
export const C = {
  ink: 'var(--ink)',
  ink2: 'var(--ink-2)',
  ink3: 'var(--ink-3)',
  rule: 'var(--rule)',
  grid: 'var(--grid)',
  paper: 'var(--paper)',
  card: 'var(--card)',
  accent: 'var(--accent)',
  accentSoft: 'var(--accent-soft)',
  // Three snapshot colours, oldest to newest (used by the frontier chart and any time series).
  snap1: 'var(--snap-1)',
  snap2: 'var(--snap-2)',
  snap3: 'var(--snap-3)',
  // Provenance tag colours.
  verified: 'var(--tag-verified)',
  vendor: 'var(--tag-vendor)',
  estimate: 'var(--tag-estimate)',
  calc: 'var(--tag-calc)',
}

/** Provenance tags as used in the manuscript, with their colour token. */
export const PROVENANCE = {
  verified: { label: 'Verified', color: C.verified },
  vendor: { label: 'Vendor-reported', color: C.vendor },
  estimate: { label: 'Estimate', color: C.estimate },
  calc: { label: 'Our calculation', color: C.calc },
}

/**
 * Measures the width of a container element; re-renders on resize.
 * `initial` is the width used on the server and in the first client render (SSR_WIDE or
 * SSR_NARROW); it must be a constant so the hydrated HTML matches the pre-rendered HTML.
 */
export function useWidth(initial = SSR_NARROW) {
  const ref = useRef(null)
  const [width, setWidth] = useState(initial)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
    ro.observe(el)
    setWidth(Math.round(el.getBoundingClientRect().width))
    return () => ro.disconnect()
  }, [])
  return [ref, width]
}

/**
 * Size props for a chart <svg>: pixel width/height plus a matching viewBox, so the server-rendered
 * SVG scales down to its container until hydration measures the real width.
 * Usage: <svg {...svgSize(width, height)} role="img" aria-label="...">
 */
export function svgSize(width, height) {
  return { width, height, viewBox: `0 0 ${width} ${height}` }
}

/**
 * Standard figure wrapper.
 * - title: one-line takeaway (sentence case, says what the chart shows)
 * - subtitle: what is plotted, units
 * - notes: array of footnote ids from the manuscript, rendered as provenance chips in the source line
 * - source: plain-text source line (short)
 * - caveat: optional one-sentence caveat shown under the chart
 * - wide: break out of the text column on large screens (first-render width SSR_WIDE, else SSR_NARROW)
 * - children: function (width) => ReactNode, or a ReactNode
 */
export function Figure({ id, title, subtitle, legend, notes = [], source, caveat, wide = true, children }) {
  const [ref, width] = useWidth(wide ? SSR_WIDE : SSR_NARROW)
  return (
    <figure className={`figure${wide ? ' figure--wide' : ''}`} id={id ? `fig-${id}` : undefined}>
      {(title || subtitle) && (
        <header className="figure__head">
          {title && <h3 className="figure__title">{title}</h3>}
          {subtitle && <p className="figure__subtitle">{subtitle}</p>}
        </header>
      )}
      {legend && <div className="figure__legend">{legend}</div>}
      <div className="figure__body" ref={ref}>
        {typeof children === 'function' ? children(width) : children}
      </div>
      {(caveat || source || notes.length > 0) && (
        <figcaption className="figure__caption">
          {caveat && <p className="figure__caveat">{caveat}</p>}
          {(source || notes.length > 0) && (
            <p className="figure__source">
              {source && <span>Source: {source}</span>}
              {notes.map(n => <FootnoteRef key={n} id={n} />)}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  )
}

/** Legend item: a swatch (dot, line or square) plus label. */
export function LegendItem({ color, label, shape = 'dot', dashed = false, hollow = false }) {
  return (
    <span className="legend-item">
      <svg width="18" height="12" aria-hidden="true">
        {shape === 'line' && <line x1="1" x2="17" y1="6" y2="6" stroke={color} strokeWidth="2.5" strokeDasharray={dashed ? '4 3' : undefined} />}
        {shape === 'dot' && <circle cx="9" cy="6" r="4.5" fill={hollow ? 'none' : color} stroke={color} strokeWidth={hollow ? 1.8 : 0} />}
        {shape === 'square' && <rect x="3" y="1" width="12" height="10" rx="2" fill={color} />}
      </svg>
      {label}
    </span>
  )
}

/** Small coloured chip naming a provenance tag (key: verified | vendor | estimate | calc). */
export function TagChip({ tag }) {
  const t = PROVENANCE[tag]
  if (!t) return null
  return <span className={`tag-chip tag-chip--${tag}`}>{t.label}</span>
}

/**
 * Tooltip positioned inside the figure body. Render it as a sibling of the <svg>,
 * passing x/y in the svg's pixel coordinates. It flips to stay inside `width`.
 * Pinned (optional, usually from usePinnableTip's tipProps):
 * - pinned: the tooltip takes pointer events (links and footnote chips work) and, with onClose,
 *   shows a close button
 * - onClose: called by the close button
 * - focusClose: truthy to move focus to the close button when the tooltip opens pinned (keyboard
 *   pins); a new truthy value moves it again
 * - label: accessible name of the pinned tooltip (e.g. "Details: GPT-5")
 */
export function Tooltip({ x, y, width, children, pinned = false, onClose, focusClose = false, label, closeLabel = 'Close details', className }) {
  const closeRef = useRef(null)
  useEffect(() => {
    if (pinned && focusClose) closeRef.current?.focus()
  }, [pinned, focusClose])
  if (x == null) return null
  // Keep the tooltip inside the chart: cap its width to the chart and clamp its left edge.
  const maxW = Math.min(256, width - 8)
  const flip = x > width * 0.6
  const left = flip ? undefined : Math.max(0, Math.min(x + 12, width - maxW))
  const right = flip ? Math.max(0, Math.min(width - x + 12, width - maxW)) : undefined
  const closable = pinned && onClose
  const cls = ['chart-tooltip', pinned && 'chart-tooltip--pinned', closable && 'chart-tooltip--closable', className].filter(Boolean).join(' ')
  return (
    <div
      className={cls}
      role={pinned ? (label ? 'dialog' : 'group') : 'status'}
      aria-label={pinned ? label : undefined}
      style={{ left, right, top: Math.max(0, y - 10), maxWidth: maxW }}
    >
      {closable && (
        <button ref={closeRef} type="button" className="chart-tooltip__close" aria-label={closeLabel} onClick={onClose}>
          ×
        </button>
      )}
      {children}
    </div>
  )
}

const NATIVE_ACTIVATION = new Set(['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA', 'SUMMARY'])

/**
 * One tooltip behaviour for mouse, keyboard and touch.
 * - Mouse hover shows the tooltip for a datum (touch pointers are ignored for hover).
 * - Keyboard focus shows it.
 * - Click / tap / Enter / Space toggles a pinned tooltip for that datum; activating another datum
 *   moves the pin. The pin wins over hover and focus.
 * - Escape, or a pointer press anywhere outside this chart's marks and outside a .chart-tooltip,
 *   clears it (an open footnote popover inside the tooltip gets the first Escape).
 *
 *   const tip = usePinnableTip()
 *   <circle {...tip.bind(key, d)} ... />                  // role="button", tabIndex 0, handlers
 *   {tip.datum && <Tooltip x={..} y={..} width={width} {...tip.tipProps}>...</Tooltip>}
 *
 * Returns { active, datum, pinned, bind, clear, tipProps }:
 * - active: key of the datum shown (pinned, else hovered, else focused), or null
 * - datum: the datum passed to bind() for that key, or null
 * - pinned: true when the shown tooltip is pinned
 * - bind(key, datum, { label }?): props to spread on the mark; spread first, so the chart can
 *   override role/tabIndex. `label` becomes the pinned tooltip's accessible name.
 * - clear(returnFocus?): drop the pin and any hover/focus state
 * - tipProps: { pinned, onClose, focusClose, label } for <Tooltip>
 * Options: { focusOnKeyPin = false } moves focus into the pinned tooltip (its close button) when
 * the pin came from the keyboard, as JaggedMap does for a card with links.
 * SSR-safe: document listeners are attached in effects only, never during render.
 */
export function usePinnableTip({ focusOnKeyPin = false } = {}) {
  const owner = useId()
  const [pin, setPin] = useState(null) // { key, datum, label, byKey }
  const [hover, setHover] = useState(null) // { key, datum, label }
  const [focus, setFocus] = useState(null)
  const markRef = useRef(null) // element that made the pin, for returning focus
  const quietFocus = useRef(false) // true while clear() hands focus back, so onFocus does not reopen
  const shown = pin ?? hover ?? focus
  const anyShown = shown != null

  const clear = (returnFocus = false) => {
    const el = markRef.current
    setPin(null)
    setHover(null)
    setFocus(null)
    markRef.current = null
    if (returnFocus && el?.isConnected) {
      // focus() fires the mark's onFocus synchronously; without the flag the tooltip that was just
      // closed would reappear (unpinned) on the mark.
      quietFocus.current = true
      try { el.focus?.({ preventScroll: true }) } finally { quietFocus.current = false }
    }
  }

  useEffect(() => {
    if (!anyShown) return
    const onKey = e => {
      if (e.key !== 'Escape') return
      // Let an open footnote popover inside a pinned tooltip close first.
      if (document.querySelector('.chart-tooltip--pinned .fn[aria-expanded="true"]')) return
      const inTip = document.activeElement?.closest?.('.chart-tooltip')
      clear(Boolean(inTip))
    }
    const onDown = e => {
      if (!pin) return
      const t = e.target
      // .fn-pop: a footnote popover opened from inside the tooltip is portalled to <body>.
      if (t?.closest?.('.chart-tooltip, .fn-pop')) return
      if (t?.closest?.('[data-tip-owner]')?.getAttribute('data-tip-owner') === owner) return
      clear(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  })

  const toggle = (entry, el, byKey) => {
    if (pin && pin.key === entry.key) {
      // Unpinning also drops hover/focus so a tap on a phone really closes it.
      clear(false)
      return
    }
    markRef.current = el
    setPin({ ...entry, byKey })
  }

  const bind = (key, datum, { label } = {}) => {
    const entry = { key, datum, label }
    const same = s => s && s.key === key
    return {
      role: 'button',
      tabIndex: 0,
      'data-tip-owner': owner,
      'aria-expanded': Boolean(pin && pin.key === key),
      onPointerEnter: e => { if (e.pointerType !== 'touch') setHover(entry) },
      onPointerLeave: e => { if (e.pointerType !== 'touch') setHover(h => (same(h) ? null : h)) },
      onFocus: () => { if (!quietFocus.current) setFocus(entry) },
      onBlur: () => setFocus(f => (same(f) ? null : f)),
      // detail === 0: a click synthesised by the keyboard on a native button.
      onClick: e => toggle(entry, e.currentTarget, e.detail === 0),
      onKeyDown: e => {
        if (e.key !== 'Enter' && e.key !== ' ') return
        if (NATIVE_ACTIVATION.has(e.currentTarget.tagName)) return // native click follows
        e.preventDefault()
        toggle(entry, e.currentTarget, true)
      },
    }
  }

  return {
    active: shown?.key ?? null,
    datum: shown?.datum ?? null,
    pinned: pin != null,
    bind,
    clear,
    tipProps: {
      pinned: pin != null,
      onClose: () => clear(true),
      // A per-datum string so moving a keyboard pin to another datum re-focuses the close button.
      focusClose: pin?.byKey && focusOnKeyPin ? `pin:${pin.key}` : false,
      label: pin?.label,
    },
  }
}

/** Accessible toggle group used for chart controls (e.g. switching snapshots). */
export function Segmented({ label, options, value, onChange }) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map(o => (
        <button
          key={o.value}
          type="button"
          className={o.value === value ? 'is-active' : ''}
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

// Dates are formatted by hand, not with toLocaleDateString: the page is pre-rendered in Node and
// hydrated in the browser, and the two can ship different locale data. These match en-GB (CLDR 42+).
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
export const utc = {
  month: d => MONTHS[d.getUTCMonth()],
  monthYear: d => `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
  dayMonthYear: d => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
}

export const fmt = {
  usd: v => (v >= 10 ? `$${v.toFixed(0)}` : v >= 1 ? `$${v.toFixed(2)}` : `$${v.toFixed(2)}`),
  pct: (v, d = 0) => `${v.toFixed(d)}%`,
  hours: h => (h < 1 ? `${Math.round(h * 60)} min` : h < 10 ? `${h.toFixed(1)} h` : `${Math.round(h)} h`),
  date: iso => utc.monthYear(new Date(iso + 'T00:00:00Z')),
}

/** True when the viewer prefers reduced motion. */
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}
