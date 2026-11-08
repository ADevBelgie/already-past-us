// Shared building blocks for every chart. Charts are plain SVG drawn with d3-scale/d3-shape.
// Colours always come from CSS custom properties (see src/styles.css) so light and dark mode
// both work without any chart-specific code.
import { useEffect, useRef, useState } from 'react'
import { FootnoteRef } from '../components/Footnotes.jsx'

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

/** Measures the width of a container element; re-renders on resize. */
export function useWidth(initial = 640) {
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
 * Standard figure wrapper.
 * - title: one-line takeaway (sentence case, says what the chart shows)
 * - subtitle: what is plotted, units
 * - notes: array of footnote ids from the manuscript, rendered as provenance chips in the source line
 * - source: plain-text source line (short)
 * - caveat: optional one-sentence caveat shown under the chart
 * - wide: break out of the text column on large screens
 * - children: function (width) => ReactNode, or a ReactNode
 */
export function Figure({ id, title, subtitle, legend, notes = [], source, caveat, wide = true, children }) {
  const [ref, width] = useWidth()
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
 */
export function Tooltip({ x, y, width, children }) {
  if (x == null) return null
  // Keep the tooltip inside the chart: cap its width to the chart and clamp its left edge.
  const maxW = Math.min(256, width - 8)
  const flip = x > width * 0.6
  const left = flip ? undefined : Math.max(0, Math.min(x + 12, width - maxW))
  const right = flip ? Math.max(0, Math.min(width - x + 12, width - maxW)) : undefined
  return (
    <div className="chart-tooltip" role="status" style={{ left, right, top: Math.max(0, y - 10), maxWidth: maxW }}>
      {children}
    </div>
  )
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
