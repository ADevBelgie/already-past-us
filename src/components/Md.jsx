import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { linkFootnoteRefs } from '../lib/manuscript.js'
import { FootnoteRef } from './Footnotes.jsx'

const components = {
  a({ href = '', children }) {
    if (href.startsWith('#fn-')) return <FootnoteRef id={href.slice(4)} />
    if (href.startsWith('#') || href.startsWith('/')) return <a href={href}>{children}</a>
    return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  },
  table({ children }) {
    return <div className="table-wrap"><table>{children}</table></div>
  },
}

const inlineComponents = {
  ...components,
  p: ({ children }) => <>{children}</>,
}

/** Renders a manuscript markdown chunk; [^id] references become provenance chips. */
export function Md({ text, inline = false }) {
  // Bare URLs in footnotes read better as links.
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={inline ? inlineComponents : components}>
      {linkFootnoteRefs(text)}
    </ReactMarkdown>
  )
}
