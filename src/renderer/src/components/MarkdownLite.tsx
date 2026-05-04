import { Fragment, ReactNode } from 'react'
import { MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { regionsData } from '../data/regions'
import { getThaiProvinceName } from '../data/thaiProvinceNames'

interface MarkdownLiteProps {
  text: string
  className?: string
}

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

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/;
const INLINE_PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/;

// navigate is passed in so hooks can stay at the component level
const renderInline = (text: string, inListItem = false, navigate?: ReturnType<typeof useNavigate>): ReactNode[] => {
  return text.split(INLINE_PATTERN).filter(Boolean).map((segment, index) => {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      return (
        <strong
          key={`strong-${index}`}
          className="font-semibold"
          style={inListItem ? LIST_STRONG_STYLE : STRONG_STYLE}
        >
          {renderInline(segment.slice(2, -2), inListItem, navigate)}
        </strong>
      );
    }

    if (segment.startsWith('*') && segment.endsWith('*')) {
      return (
        <em key={`em-${index}`} className="italic" style={ITALIC_STYLE}>
          {renderInline(segment.slice(1, -1), inListItem, navigate)}
        </em>
      );
    }

    if (segment.startsWith('`') && segment.endsWith('`')) {
      return (
        <code key={`code-${index}`} className="rounded px-1.5 py-0.5 font-mono text-[0.9em]" style={CODE_STYLE}>
          {segment.slice(1, -1)}
        </code>
      );
    }

    // Handle Links
    const linkMatch = segment.match(LINK_PATTERN);
    if (linkMatch) {
      const [_, linkText, url] = linkMatch;
      
      // Custom Locus Deep Link - navigate to map with auto-warp + auto-search
      if (url.startsWith('locus://location')) {
        return (
          <button
            key={`locus-link-${index}`}
            onClick={() => {
              try {
                // More robust parsing for Thai characters and various formats
                const getParam = (name: string) => {
                  try {
                    const regex = new RegExp(`[?&]${name}=([^&]*)`);
                    const match = url.match(regex);
                    if (!match) return null;
                    const val = match[1];
                    // Try to decode, but if it fails (e.g. raw Thai), just return raw
                    try {
                      return decodeURIComponent(val);
                    } catch {
                      return val;
                    }
                  } catch {
                    return null;
                  }
                };

                const latStr = getParam('lat');
                const lngStr = getParam('lng');
                const lat = latStr ? parseFloat(latStr) : null;
                const lng = lngStr ? parseFloat(lngStr) : null;
                const title = getParam('title') || getParam('q') || linkText || 'Location';
                
                if (navigate) {
                  // 1. Handle Fuel Buttons -> Warp to Home (/) and Toggle Fuel
                  const fuelKeywords = ['95', '91', 'E20', 'E85', 'B7', 'B20', 'Diesel', 'ดีเซล', 'แก๊สโซฮอล์'];
                  const isFuel = fuelKeywords.some(k => title.includes(k));
                  
                  if (isFuel) {
                    navigate('/', { state: { focusFuel: title } });
                    return;
                  }

                  // 2. Handle Province Buttons -> Warp to Province Detail Page
                  const cleanTitle = title.replace(/จังหวัด/g, '').trim();
                  let provMatch: { id: string, region: string } | null = null;
                  
                  for (const r of regionsData) {
                    const p = r.subProvinces?.find(sp => 
                      sp.name.toLowerCase() === cleanTitle.toLowerCase() || 
                      getThaiProvinceName(sp.name) === cleanTitle ||
                      // Add fuzzy/partial matching for Thai names
                      getThaiProvinceName(sp.name).includes(cleanTitle) ||
                      cleanTitle.includes(getThaiProvinceName(sp.name))
                    );
                    if (p) {
                      provMatch = { id: p.id, region: r.id };
                      break;
                    }
                  }
                  
                  if (provMatch) {
                    navigate(`/province/${provMatch.region}/${provMatch.id}`, {
                      state: { autoWarp: (lat && lng) ? { lat, lng, title } : undefined }
                    });
                  } else {
                    // 3. Handle Place Buttons -> Warp to Map and Auto Search
                    navigate('/map', {
                      state: {
                        autoWarp: (lat && lng) ? { lat, lng, title } : undefined,
                        autoSearch: title,
                        autoSelectFirst: true
                      }
                    });
                  }
                }
              } catch (e) {
                console.error('Invalid locus link:', url, e);
              }
            }}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded hover:bg-cyan-500/20 transition-colors font-bold text-[0.9em] align-baseline mx-1 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
          >
            <MapPin size={12} className="text-cyan-400" />
            {linkText}
          </button>
        );
      }

      return (
        <a 
          key={`link-${index}`} 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-cyan-400 underline underline-offset-4 decoration-cyan-500/30 hover:text-cyan-300 transition-colors"
        >
          {linkText}
        </a>
      );
    }

    return <Fragment key={`text-${index}`}>{segment}</Fragment>;
  });
};

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
  const navigate = useNavigate()
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
        {renderInline(paragraphText, false, navigate)}
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
              {renderInline(item, true, navigate)}
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
              {renderInline(item, true, navigate)}
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
            {renderInline(line, false, navigate)}
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
                  {renderInline(header, false, navigate)}
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
                    {renderInline(cell, false, navigate)}
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
          {renderInline(headingMatch[2], false, navigate)}
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
