import { Map as MapIcon } from 'lucide-react'

interface MapToolProps {
  label: string
  active?: boolean
}

const MapTool = ({ label, active }: MapToolProps): JSX.Element => (
  <div
    className={`w-10 h-10 flex items-center justify-center rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${
      active
        ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20'
        : 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700'
    }`}
  >
    {label}
  </div>
)

export function MapView(): JSX.Element {
  return (
    <div className="h-full w-full bg-zinc-900 rounded-3xl border border-zinc-800 flex items-center justify-center relative overflow-hidden min-h-[500px]">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />
      <div className="text-center">
        <MapIcon size={64} className="mx-auto mb-4 text-zinc-700" />
        <h2 className="text-xl font-bold text-zinc-500">TACTICAL MAP VIEW</h2>
        <p className="text-sm text-zinc-600 mt-2">Integrating Leaflet.js / Mapbox API in Phase 2</p>
      </div>

      {/* Map Overlay Elements */}
      <div className="absolute top-6 right-6 space-y-2">
        <MapTool label="SAT" />
        <MapTool label="TER" active />
        <MapTool label="POI" />
      </div>
    </div>
  )
}
