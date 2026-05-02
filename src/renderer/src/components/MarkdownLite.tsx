import { Fragment, ReactNode } from 'react'

interface MarkdownLiteProps {
  text: string
  className?: string
}

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/
const TEXT_STYLE = { color: 'var(--chat-md-text)' }
const MUTED_STYLE = { color: 'var(--chat-md-muted)' }
const STRONG_STYLE = { color: 'var(--chat-md-strong)' }
const LIST_STRONG_STYLE = { color: 'var(--chat-md-list-strong)' }
const ITALIC_STYLE = { color: 'var(--chat-md-italic)' }
const CODE_STYLE = {
  color: 'var(--chat-md-code-text)',
  backgroundColor: 'var(--chat-md-code-bg)'
}
const QUOTE_STYLE = {
  color: 'var(--chat-md-text)',
  borderColor: 'var(--chat-accent-soft-border)',
  backgroundColor: 'var(--chat-accent-soft)'
}
const TABLE_CELL_STYLE = {
  color: 'var(--chat-md-text)',
  borderColor: 'var(--chat-md-divider)'
}
const TABLE_HEADER_STYLE = {
  color: 'var(--chat-md-h3)',
  borderColor: 'var(--chat-md-divider)',
  backgroundColor: 'rgba(255,255,255,0.03)'
}

const renderInline = (text: string, inListItem = false): ReactNode[] =>
  text.split(INLINE_PATTERN).filter(Boolean).map((segment, index) => {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      return (
        <strong
          key={`strong-${index}`}
          className="font-semibold"
          style={inListItem ? LIST_STRONG_STYLE : STRONG_STYLE}
        >
          {segment.slice(2, -2)}
        </strong>
      )
    }

    if (segment.startsWith('*') && segment.endsWith('*')) {
      return (
        <em key={`em-${index}`} className="italic" style={ITALIC_STYLE}>
          {segment.slice(1, -1)}
        </em>
      )
    }

    if (segment.startsWith('`') && segment.endsWith('`')) {
      return (
        <code key={`code-${index}`} className="rounded px-1.5 py-0.5 font-mono text-[0.9em]" style={CODE_STYLE}>
          {segment.slice(1, -1)}
        </code>
      )
    }

    return <Fragment key={`text-${index}`}>{segment}</Fragment>
  })

const normalizeMarkdown = (text: string) => text.replace(/\\n/g, '\n').replace(/\r\n/g, '\n').trim()

const isTableLine = (line: string) => line.includes('|')
const isTableSeparatorLine = (line: string) => /^\|?[\s:-]+(\|[\s:-]+)+\|?$/.test(line.trim())
const parseTableCells = (line: string) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())

export const MarkdownLite = ({ text, className = '' }: MarkdownLiteProps) => {
  const normalized = normalizeMarkdown(text)
  const lines = normalized.split('\n')
  const blocks: ReactNode[] = []

  let currentParagraph: string[] = []
  let currentList: string[] = []
  let currentOrderedList: string[] = []
  let currentQuote: string[] = []
  let currentTable: string[] = []
  let currentCodeFence: { language: string; lines: string[] } | null = null

  const flushParagraph = () => {
    if (currentParagraph.length === 0) return
    const paragraphText = currentParagraph.join(' ')
    blocks.push(
      <p key={`p-${blocks.length}`} className="leading-relaxed" style={TEXT_STYLE}>
        {renderInline(paragraphText)}
      </p>
    )
    currentParagraph = []
  }

  const flushList = () => {
    if (currentList.length === 0) return
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="space-y-2">
        {currentList.map((item, index) => (
          <li key={`li-${index}`} className="flex items-start gap-3 leading-relaxed">
            <span className="mt-[0.45rem] text-xs" style={{ color: 'var(--chat-md-bullet)' }}>
              •
            </span>
            <span className="min-w-0 flex-1" style={TEXT_STYLE}>
              {renderInline(item, true)}
            </span>
          </li>
        ))}
      </ul>
    )
    currentList = []
  }

  const flushOrderedList = () => {
    if (currentOrderedList.length === 0) return
    blocks.push(
      <ol key={`ol-${blocks.length}`} className="space-y-2">
        {currentOrderedList.map((item, index) => (
          <li key={`oli-${index}`} className="grid grid-cols-[1.5rem_1fr] gap-3 leading-relaxed">
            <span className="text-sm font-semibold text-right" style={{ color: 'var(--chat-md-h3)' }}>
              {index + 1}.
            </span>
            <span className="min-w-0" style={TEXT_STYLE}>
              {renderInline(item, true)}
            </span>
          </li>
        ))}
      </ol>
    )
    currentOrderedList = []
  }

  const flushQuote = () => {
    if (currentQuote.length === 0) return
    blocks.push(
      <blockquote
        key={`quote-${blocks.length}`}
        className="rounded-r-xl border-l-4 px-4 py-3 text-sm leading-relaxed"
        style={QUOTE_STYLE}
      >
        {currentQuote.map((line, index) => (
          <p key={`quote-line-${index}`} className={index === 0 ? '' : 'mt-2'} style={TEXT_STYLE}>
            {renderInline(line)}
          </p>
        ))}
      </blockquote>
    )
    currentQuote = []
  }

  const flushTable = () => {
    if (currentTable.length < 2) return
    const [headerLine, separatorLine, ...rowLines] = currentTable
    if (!headerLine || !separatorLine || !isTableSeparatorLine(separatorLine)) {
      currentParagraph.push(...currentTable)
      currentTable = []
      return
    }

    const headers = parseTableCells(headerLine)
    const rows = rowLines.map(parseTableCells).filter((row) => row.some(Boolean))

    blocks.push(
      <div key={`table-${blocks.length}`} className="overflow-x-auto rounded-xl border border-white/5">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={`th-${index}`}
                  className="border-b px-3 py-2 text-left font-semibold"
                  style={TABLE_HEADER_STYLE}
                >
                  {renderInline(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`tr-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={`td-${rowIndex}-${cellIndex}`}
                    className="border-t px-3 py-2 align-top leading-relaxed"
                    style={TABLE_CELL_STYLE}
                  >
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
    currentTable = []
  }

  const flushCodeFence = () => {
    if (!currentCodeFence) return
    blocks.push(
      <div key={`codefence-${blocks.length}`} className="overflow-hidden rounded-xl border border-white/5 bg-[#0b0d11]">
        {currentCodeFence.language && (
          <div className="border-b border-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--chat-md-h3)' }}>
            {currentCodeFence.language}
          </div>
        )}
        <pre className="overflow-x-auto px-4 py-3 text-sm leading-relaxed" style={{ color: 'var(--chat-md-code-text)' }}>
          <code>{currentCodeFence.lines.join('\n')}</code>
        </pre>
      </div>
    )
    currentCodeFence = null
  }

  const flushAll = () => {
    flushParagraph()
    flushList()
    flushOrderedList()
    flushQuote()
    flushTable()
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim()

    const codeFenceMatch = rawLine.trim().match(/^```(\w+)?\s*$/)
    if (codeFenceMatch) {
      if (currentCodeFence) {
        flushCodeFence()
      } else {
        flushAll()
        currentCodeFence = { language: codeFenceMatch[1] || '', lines: [] }
      }
      return
    }

    if (currentCodeFence) {
      currentCodeFence.lines.push(rawLine)
      return
    }

    if (!line) {
      flushAll()
      return
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/)
    if (headingMatch) {
      flushAll()
      const level = headingMatch[1].length
      const headingClass = level === 1 ? 'text-lg font-bold' : level === 2 ? 'text-base font-semibold' : 'text-sm font-semibold'
      const headingStyle =
        level === 1
          ? { color: 'var(--chat-md-h1)' }
          : level === 2
            ? { color: 'var(--chat-md-h2)' }
            : { color: 'var(--chat-md-h3)' }
      blocks.push(
        <div key={`h-${blocks.length}`} className={`${headingClass} leading-relaxed`} style={headingStyle}>
          {renderInline(headingMatch[2])}
        </div>
      )
      return
    }

    if (isTableLine(line)) {
      flushParagraph()
      flushList()
      flushOrderedList()
      flushQuote()
      currentTable.push(line)
      return
    }

    flushTable()

    const quoteMatch = line.match(/^>\s?(.+)$/)
    if (quoteMatch) {
      flushParagraph()
      flushList()
      flushOrderedList()
      currentQuote.push(quoteMatch[1])
      return
    }

    flushQuote()

    const listMatch = line.match(/^[-*]\s+(.+)$/)
    if (listMatch) {
      flushParagraph()
      flushOrderedList()
      currentList.push(listMatch[1])
      return
    }

    const orderedListMatch = line.match(/^\d+\.\s+(.+)$/)
    if (orderedListMatch) {
      flushParagraph()
      flushList()
      currentOrderedList.push(orderedListMatch[1])
      return
    }

    flushList()
    flushOrderedList()
    currentParagraph.push(line)
  })

  flushCodeFence()
  flushAll()

  if (blocks.length === 0) {
    return <div className={className.trim()} style={TEXT_STYLE}>{text}</div>
  }

  return <div className={`space-y-4 whitespace-pre-wrap ${className}`.trim()} style={MUTED_STYLE}>{blocks}</div>
}
