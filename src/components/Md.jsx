import { Fragment, createElement } from 'react'
import { FootnoteRef } from './Footnotes.jsx'

// Renders the compact markdown tree compiled at build time by scripts/manuscript-plugin.mjs
// (node shapes are documented there). No markdown parser ships to the browser.

const SIMPLE = { em: 'em', strong: 'strong', del: 'del', blockquote: 'blockquote', li: 'li', ul: 'ul' }

function link(n, key, inl) {
  const { h: href, ti: title } = n
  const children = n.c ? nodes(n.c, inl) : href
  if (href.startsWith('#') || href.startsWith('/')) return <a key={key} href={href} title={title}>{children}</a>
  return <a key={key} href={href} title={title} target="_blank" rel="noopener noreferrer">{children}</a>
}

/** Plain text of a compact tree (footnote chips dropped), for accessible names. */
function plain(list) {
  if (!list) return ''
  return list.map(n => {
    if (typeof n === 'string') return n
    if (n.t === 'f') return ''
    if (n.t === 'br') return ' '
    if (n.t === 'a' && !n.c) return n.h
    return n.v ?? plain(n.c)
  }).join('')
}

function table(n, key, inl) {
  const [head, ...body] = n.c
  const cells = (row, Tag) => row.map((cell, i) => (
    <Tag key={i} style={n.a[i] ? { textAlign: n.a[i] } : undefined}>{nodes(cell, inl)}</Tag>
  ))
  const columns = head.map(cell => plain(cell).replace(/\s+/g, ' ').trim()).filter(Boolean)
  // The wrapper scrolls sideways on narrow screens, so keyboard users must be able to focus it;
  // the region is named after its columns.
  return (
    <div key={key} className="table-wrap" tabIndex={0} role="region" aria-label={columns.length ? `Table: ${columns.join(', ')}` : 'Table'}>
      <table>
        <thead><tr>{cells(head, 'th')}</tr></thead>
        {body.length > 0 && <tbody>{body.map((row, i) => <tr key={i}>{cells(row, 'td')}</tr>)}</tbody>}
      </table>
    </div>
  )
}

// Signposts ("What to watch"): each numbered item carries a status chip, and dated updates sit
// under the original wording. Statuses and the manuscript markup are in src/lib/manuscript.js.
const STATUS = { open: 'Open', claimed: 'Claimed, not confirmed', resolved: 'Resolved' }
const STATUS_SHORT = { claimed: 'Claimed', resolved: 'Resolved' }

function signposts(n, key, inl) {
  return (
    <ol key={key} className="signposts" start={n.s}>
      {n.c.map((li, i) => {
        const st = li.st ?? 'open'
        return (
          <li key={i} className={`signpost signpost--${st}`}>
            <span className={`tag-chip status-chip status-chip--${st}`}>{STATUS[st]}</span>{' '}
            {nodes(li.c, inl)}
          </li>
        )
      })}
    </ol>
  )
}

function updates(n, key, inl) {
  return (
    <div key={key} className="sp-updates">
      {n.c.map((u, i) => (
        <div key={i} className={`sp-update${u.st ? ` sp-update--${u.st}` : ''}`}>
          <p className="sp-update__head">
            Update · {u.d}
            {u.st && <> · <span className="sp-update__status">{STATUS_SHORT[u.st]}</span></>}
          </p>
          <p className="sp-update__body">{nodes(u.c, inl)}</p>
        </div>
      ))}
    </div>
  )
}

// `inl` (inline mode, used for footnote bodies) unwraps paragraphs, as before.
function node(n, key, inl) {
  if (typeof n === 'string') return n
  switch (n.t) {
    case 'p': return inl ? <Fragment key={key}>{nodes(n.c, inl)}</Fragment> : <p key={key}>{nodes(n.c, inl)}</p>
    case 'f': return <FootnoteRef key={key} id={n.i} />
    case 'a': return link(n, key, inl)
    case 'code': return <code key={key}>{n.v}</code>
    case 'br': return <br key={key} />
    case 'hr': return <hr key={key} />
    case 'h': return createElement(`h${n.d}`, { key }, nodes(n.c, inl))
    case 'ol': return n.sp ? signposts(n, key, inl) : <ol key={key} start={n.s}>{nodes(n.c, inl)}</ol>
    case 'ups': return updates(n, key, inl)
    case 'pre': return <pre key={key}><code className={n.lang ? `language-${n.lang}` : undefined}>{n.v}</code></pre>
    case 'img': return <img key={key} src={n.src} alt={n.alt ?? ''} title={n.ti} />
    case 'table': return table(n, key, inl)
    default:
      return SIMPLE[n.t] ? createElement(SIMPLE[n.t], { key }, nodes(n.c, inl)) : null
  }
}

function nodes(list, inl) {
  if (!list || !list.length) return null
  return list.length === 1 ? node(list[0], 0, inl) : list.map((n, i) => node(n, i, inl))
}

/** Renders a precompiled manuscript chunk; footnote references become provenance chips. */
export function Md({ tree, inline = false }) {
  return <>{nodes(tree, inline)}</>
}
