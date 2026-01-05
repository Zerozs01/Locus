import { Settings, Cpu, Monitor, Globe, Key } from 'lucide-react'

interface SettingItemProps {
  label: string
  value: string
  icon: React.ReactNode
}

const SettingItem = ({ label, value, icon }: SettingItemProps): JSX.Element => (
  <div className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400">
        {icon}
      </div>
      <span className="text-sm text-zinc-300">{label}</span>
    </div>
    <span className="text-xs text-zinc-500 font-mono">{value}</span>
  </div>
)

export function SettingsView(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Settings size={24} className="text-zinc-400" />
        <h1 className="text-xl font-bold text-white">SETTINGS</h1>
      </div>

      {/* System Info */}
      <div className="bg-tactical-card border border-zinc-800 rounded-xl p-6">
        <h2 className="text-sm font-bold text-zinc-400 mb-4">SYSTEM INFORMATION</h2>
        <div className="space-y-1">
          <SettingItem label="Agent Version" value="v1.0.4-BETA" icon={<Cpu size={16} />} />
          <SettingItem label="Electron" value="v33.3.1" icon={<Monitor size={16} />} />
          <SettingItem label="n8n Webhook" value="NGROK_TUNNEL" icon={<Globe size={16} />} />
          <SettingItem label="AI Model" value="Gemini 1.5 Flash" icon={<Cpu size={16} />} />
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-tactical-card border border-zinc-800 rounded-xl p-6">
        <h2 className="text-sm font-bold text-zinc-400 mb-4">API CONFIGURATION</h2>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] text-zinc-500 uppercase block mb-2">Ngrok URL</label>
            <input
              type="text"
              placeholder="https://your-tunnel.ngrok.io"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] text-zinc-500 uppercase block mb-2">Firebase Project ID</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="your-project-id"
                className="flex-grow bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none transition-colors"
              />
              <button className="bg-zinc-800 hover:bg-zinc-700 px-4 rounded-lg border border-zinc-700 transition-colors">
                <Key size={16} className="text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full bg-amber-500 hover:bg-amber-600 text-black py-4 rounded-xl font-bold text-sm transition-colors glow-amber">
        SAVE CONFIGURATION
      </button>
    </div>
  )
}
