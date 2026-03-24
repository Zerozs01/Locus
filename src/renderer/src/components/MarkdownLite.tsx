import { Fragment, ReactNode } from 'react'

interface MarkdownLiteProps {
  text: string
  className?: string
}

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/

const renderInline = (text: string): ReactNode[] =>
  text.split(INLINE_PATTERN).filter(Boolean).map((segment, index) => {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      return (
        <strong key={`strong-${index}`} className="font-semibold text-white">
          {segment.slice(2, -2)}
        </strong>
      )
    }

    if (segment.startsWith('*') && segment.endsWith('*')) {
      return (
        <em key={`em-${index}`} className="italic text-slate-100">
          {segment.slice(1, -1)}
        </em>
      )
    }

    if (segment.startsWith('`') && segment.endsWith('`')) {
      return (
        <code key={`code-${index}`} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-cyan-200">
          {segment.slice(1, -1)}
        </code>
      )
    }

    return <Fragment key={`text-${index}`}>{segment}</Fragment>
  })

const normalizeMarkdown = (text: string) => text.replace(/\\n/g, '\n').replace(/\r\n/g, '\n').trim()

export const MarkdownLite = ({ text, className = '' }: MarkdownLiteProps) => {
  const normalized = normalizeMarkdown(text)
  const lines = normalized.split('\n')
  const blocks: ReactNode[] = []

  let currentParagraph: string[] = []
  let currentList: string[] = []

  const flushParagraph = () => {
    if (currentParagraph.length === 0) return
    const paragraphText = currentParagraph.join(' ')
    blocks.push(
      <p key={`p-${blocks.length}`} className="leading-relaxed text-slate-200">
        {renderInline(paragraphText)}
      </p>
    )
    currentParagraph = []
  }

  const flushList = () => {
    if (currentList.length === 0) return
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="ml-5 list-disc space-y-2 text-slate-200">
        {currentList.map((item, index) => (
          <li key={`li-${index}`} className="leading-relaxed">
            {renderInline(item)}
          </li>
        ))}
      </ul>
    )
    currentList = []
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim()

    if (!line) {
      flushParagraph()
      flushList()
      return
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph()
      flushList()
      const level = headingMatch[1].length
      const headingClass =
        level === 1 ? 'text-lg font-bold text-white' : level === 2 ? 'text-base font-semibold text-white' : 'text-sm font-semibold text-slate-100'
      blocks.push(
        <div key={`h-${blocks.length}`} className={headingClass}>
          {renderInline(headingMatch[2])}
        </div>
      )
      return
    }

    const listMatch = line.match(/^[-*]\s+(.+)$/)
    if (listMatch) {
      flushParagraph()
      currentList.push(listMatch[1])
      return
    }

    flushList()
    currentParagraph.push(line)
  })

  flushParagraph()
  flushList()

  if (blocks.length === 0) {
    return <div className={className}>{text}</div>
  }

  return <div className={`space-y-4 whitespace-pre-wrap ${className}`}>{blocks}</div>
}
