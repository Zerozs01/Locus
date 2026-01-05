import { Camera, Map as MapIcon, History, Database, Settings } from 'lucide-react'
import { Zap } from 'lucide-react'

type TabType = 'scan' | 'map' | 'history' | 'sync' | 'settings'

interface SidebarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

interface NavButtonProps {
  icon: React.ReactNode
  active: boolean
  onClick: () => void
  label: string
}

const NavButton = ({ icon, active, onClick, label }: NavButtonProps): JSX.Element => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 transition-all group titlebar-no-drag ${
      active ? 'text-amber-500' : 'text-zinc-600 hover:text-zinc-400'
    }`}
  >
    <div
      className={`p-3 rounded-xl transition-all ${
        active ? 'bg-amber-500/10' : 'bg-transparent group-hover:bg-zinc-800/50'
      }`}
    >
      {icon}
    </div>
    <span className="text-[8px] font-bold tracking-widest">{label}</span>
  </button>
)

export function Sidebar({ activeTab, onTabChange }: SidebarProps): JSX.Element {
  return (
    <aside className="w-20 border-r border-zinc-800 flex flex-col items-center py-6 space-y-8 bg-tactical-surface">
      {/* Logo */}
      <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500 mb-4 glow-amber-sm">
        <Zap size={28} strokeWidth={2.5} />
      </div>

      {/* Navigation */}
      <NavButton
        icon={<Camera size={22} />}
        active={activeTab === 'scan'}
        onClick={() => onTabChange('scan')}
        label="SCAN"
      />
      <NavButton
        icon={<MapIcon size={22} />}
        active={activeTab === 'map'}
        onClick={() => onTabChange('map')}
        label="MAP"
      />
      <NavButton
        icon={<History size={22} />}
        active={activeTab === 'history'}
        onClick={() => onTabChange('history')}
        label="LOGS"
      />
      <NavButton
        icon={<Database size={22} />}
        active={activeTab === 'sync'}
        onClick={() => onTabChange('sync')}
        label="SYNC"
      />

      <div className="flex-grow" />

      <NavButton
        icon={<Settings size={22} />}
        active={activeTab === 'settings'}
        onClick={() => onTabChange('settings')}
        label="SET"
      />
    </aside>
  )
}
