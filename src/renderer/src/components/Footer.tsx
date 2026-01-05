interface FooterProps {
  hasResult: boolean
}

export function Footer({ hasResult }: FooterProps): JSX.Element {
  return (
    <footer className="h-10 border-t border-zinc-800 bg-tactical-surface flex items-center justify-between px-8 text-[10px] text-zinc-600">
      <div className="flex space-x-4">
        <span>LAT: {hasResult ? '51.4045' : '---'}</span>
        <span>LONG: {hasResult ? '30.0542' : '---'}</span>
        <span>ALT: 122M</span>
      </div>
      <div>CPE311 - AI LAB AGENT SYSTEM v1.0.4-BETA</div>
    </footer>
  )
}
