import { Camera, Zap, Maximize2, History, Search, Shield, Info, Cloud, Navigation } from 'lucide-react'
import { DataCard, Placeholder, LogItem } from '../components/DataCard'
import { MOCK_ANALYSIS } from '../App'

interface ScanViewProps {
  isScanning: boolean
  hasResult: boolean
  onStartScan: () => void
}

export function ScanView({ isScanning, hasResult, onStartScan }: ScanViewProps): JSX.Element {
  return (
    <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
      {/* Left Side: Upload & Vision */}
      <div className="col-span-12 lg:col-span-7 space-y-6">
        <section className="bg-tactical-card border border-zinc-800 rounded-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />

          {/* Image Display Area */}
          <div className="aspect-video w-full bg-zinc-900 flex items-center justify-center relative">
            {!hasResult && !isScanning ? (
              <div className="text-center z-20 space-y-4">
                <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto border border-zinc-700 group-hover:scale-110 transition-transform cursor-pointer">
                  <Camera size={32} className="text-zinc-500" />
                </div>
                <p className="text-sm text-zinc-400">
                  Drag imagery here or <span className="text-amber-500 cursor-pointer hover:underline">browse file</span>
                </p>
              </div>
            ) : (
              <img
                src="https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=2070&auto=format&fit=crop"
                alt="Scanned Area"
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  isScanning ? 'blur-sm grayscale' : 'grayscale-0'
                }`}
              />
            )}

            {isScanning && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
                <div className="w-full h-[2px] bg-amber-500/50 absolute animate-scan-line shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                <div className="bg-black/60 backdrop-blur-md px-6 py-3 border border-amber-500/30 rounded-lg flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-amber-500 text-sm font-bold tracking-widest uppercase">
                    Analyzing Geospatial Data...
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-6 left-6 z-20 flex space-x-4">
            <button
              onClick={onStartScan}
              disabled={isScanning}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-black px-6 py-2.5 rounded-lg font-bold text-xs flex items-center space-x-2 transition-colors glow-amber"
            >
              <Zap size={16} fill="black" />
              <span>INITIALIZE AGENT</span>
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg font-bold text-xs backdrop-blur-md border border-white/10 transition-colors">
              <Maximize2 size={16} />
            </button>
          </div>
        </section>

        {/* Agent Insight Log */}
        <section className="bg-tactical-card border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-xs font-bold text-zinc-500 mb-4 flex items-center">
            <History size={14} className="mr-2" /> AGENT COGNITIVE LOG
          </h3>
          <div className="space-y-3 font-sans text-sm">
            <LogItem time="T-00:01" msg="Neural network initialized. Listening on port 5678." color="text-zinc-500" />
            <LogItem
              time="T-00:02"
              msg="Visual input received. Extracting environmental features..."
              color="text-zinc-400"
            />
            {hasResult && (
              <>
                <LogItem
                  time="T-00:03"
                  msg="Patterns match Pripyat, Northern Ukraine (98.4% confidence)."
                  color="text-amber-400"
                />
                <LogItem
                  time="T-00:04"
                  msg="Situational awareness: Structural risk detected in proximity."
                  color="text-red-400"
                />
              </>
            )}
          </div>
        </section>
      </div>

      {/* Right Side: Data Panels */}
      <div className="col-span-12 lg:col-span-5 space-y-6">
        {/* Meta Clues Panel */}
        <DataCard title="GEOGUESSR META" icon={<Search size={16} />}>
          {hasResult ? (
            <div className="space-y-4">
              {MOCK_ANALYSIS.analysis.geoguessr_meta.map((item, idx) => (
                <div key={idx} className="flex flex-col space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase">{item.label}</span>
                  <span className="text-sm text-zinc-200 border-l-2 border-amber-500/50 pl-3">{item.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <Placeholder text="Waiting for image analysis..." />
          )}
        </DataCard>

        {/* Survival Intelligence */}
        <DataCard title="SITUATIONAL AWARENESS" icon={<Shield size={16} />}>
          {hasResult ? (
            <div className="grid grid-cols-1 gap-4">
              {MOCK_ANALYSIS.analysis.survival_intel.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 flex justify-between items-center"
                >
                  <span className="text-xs text-zinc-400 uppercase">{item.label}</span>
                  <span className={`text-xs font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <Placeholder text="Tactical assessment pending..." />
          )}
        </DataCard>

        {/* Cultural Context / Lore */}
        <DataCard title="LORE & CONTEXT" icon={<Info size={16} />}>
          {hasResult ? (
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              {MOCK_ANALYSIS.analysis.historical_lore}
            </p>
          ) : (
            <Placeholder text="Background intel required..." />
          )}
        </DataCard>

        {/* Action Footer */}
        <div className="flex space-x-3">
          <button className="flex-grow bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/30 text-blue-500 py-3 rounded-xl font-bold text-xs flex items-center justify-center transition-all">
            <Cloud className="mr-2" size={16} /> SYNC TO FIRESTORE
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-xl border border-zinc-700 transition-colors">
            <Navigation size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
