interface StatusIndicatorProps {
  label: string
  status: string
  color: string
}

const StatusIndicator = ({ label, status, color }: StatusIndicatorProps): JSX.Element => (
  <div className="flex items-center space-x-2">
    <span className="text-zinc-600">{label}:</span>
    <span className="text-zinc-300 font-bold">{status}</span>
    <div className={`w-1.5 h-1.5 rounded-full ${color} animate-pulse`} />
  </div>
)

interface HeaderProps {
  currentTime: string
}

export function Header({ currentTime }: HeaderProps): JSX.Element {
  return (
    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-tactical-surface/50 backdrop-blur-md titlebar-drag">
      <div className="flex items-center space-x-3 titlebar-no-drag">
        <span className="text-xs tracking-[0.3em] text-zinc-500">PROJECT</span>
        <span className="text-xl font-bold tracking-tighter text-white">LOCUS</span>
        <div className="h-4 w-[1px] bg-zinc-700 mx-2" />
        <span className="text-xs text-amber-500/80 animate-pulse uppercase">Tactical AI Active</span>
      </div>

      <div className="flex items-center space-x-6 text-[10px] titlebar-no-drag">
        <StatusIndicator label="SYSTEM" status="OPTIMAL" color="bg-green-500" />
        <StatusIndicator label="NETWORK" status="NGROK-TUNNEL" color="bg-blue-500" />
        <StatusIndicator label="FIREBASE" status="SYNCED" color="bg-green-500" />
        <div className="bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800 text-zinc-400 font-mono">
          {currentTime}
        </div>
      </div>
    </header>
  )
}
