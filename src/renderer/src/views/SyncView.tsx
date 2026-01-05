import { Cloud, Database, RefreshCw, Check, AlertCircle } from 'lucide-react'

export function SyncView(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Database size={24} className="text-blue-500" />
        <h1 className="text-xl font-bold text-white">CLOUD SYNC</h1>
      </div>

      {/* Connection Status */}
      <div className="bg-tactical-card border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-zinc-400">FIREBASE STATUS</h2>
          <div className="flex items-center space-x-2 text-green-400">
            <Check size={14} />
            <span className="text-xs font-bold">CONNECTED</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase block mb-1">Project ID</span>
            <span className="text-sm text-white font-mono">locus-agent-prod</span>
          </div>
          <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase block mb-1">Last Sync</span>
            <span className="text-sm text-white font-mono">2 minutes ago</span>
          </div>
        </div>
      </div>

      {/* Sync Actions */}
      <div className="bg-tactical-card border border-zinc-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-zinc-400">SYNC ACTIONS</h2>

        <button className="w-full bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/30 text-blue-500 py-4 rounded-xl font-bold text-sm flex items-center justify-center transition-all space-x-2">
          <RefreshCw size={18} />
          <span>FORCE SYNC NOW</span>
        </button>

        <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 py-4 rounded-xl font-bold text-sm flex items-center justify-center transition-all space-x-2">
          <Cloud size={18} />
          <span>EXPORT TO CLOUD</span>
        </button>
      </div>

      {/* Warning */}
      <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 flex items-start space-x-3">
        <AlertCircle size={18} className="text-orange-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-orange-400">Network Required</h3>
          <p className="text-xs text-zinc-500 mt-1">
            Sync operations require an active internet connection via Ngrok tunnel.
          </p>
        </div>
      </div>
    </div>
  )
}
