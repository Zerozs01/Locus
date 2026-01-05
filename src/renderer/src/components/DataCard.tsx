interface DataCardProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

export function DataCard({ title, icon, children }: DataCardProps): JSX.Element {
  return (
    <div className="bg-tactical-card border border-zinc-800 rounded-2xl p-5 shadow-xl card-hover">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-1.5 bg-zinc-800 rounded-md text-zinc-400">{icon}</div>
        <h3 className="text-[10px] font-black tracking-[0.2em] text-zinc-500">{title}</h3>
      </div>
      {children}
    </div>
  )
}

interface PlaceholderProps {
  text: string
}

export function Placeholder({ text }: PlaceholderProps): JSX.Element {
  return (
    <div className="py-6 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
      <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full animate-pulse mb-2" />
      <span className="text-[10px] text-zinc-600 italic">{text}</span>
    </div>
  )
}

interface LogItemProps {
  time: string
  msg: string
  color: string
}

export function LogItem({ time, msg, color }: LogItemProps): JSX.Element {
  return (
    <div className="flex space-x-3 items-start leading-tight">
      <span className="text-zinc-600 shrink-0 font-bold tracking-tighter">{time}</span>
      <span className={color}>{msg}</span>
    </div>
  )
}
