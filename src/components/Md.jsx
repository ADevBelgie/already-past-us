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

function table(n, key, inl) {
  const [head, ...body] = n.c
  const cells = (row, Tag) => row.map((cell, i) => (
    <Tag key={i} style={n.a[i] ? { textAlign: n.a[i] } : undefined}>{nodes(cell, inl)}</Tag>
  ))
  return (
    <div key={key} className="table-wrap">
      <table>
        <thead><tr>{cells(head, 'th')}</tr></thead>
        {body.length > 0 && <tbody>{body.map((row, i) => <tr key={i}>{cells(row, 'td')}</tr>)}</tbody>}
      </table>
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
    case 'ol': return <ol key={key} start={n.s}>{nodes(n.c, inl)}</ol>
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
