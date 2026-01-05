import { History, MapPin, Clock, AlertTriangle } from 'lucide-react'

const mockLogs = [
  {
    id: 1,
    timestamp: '2026-01-05 12:30:00',
    location: 'Prypiat, Ukraine',
    threatLevel: 'Moderate',
    status: 'complete'
  },
  {
    id: 2,
    timestamp: '2026-01-04 15:45:22',
    location: 'Hashima Island, Japan',
    threatLevel: 'Low',
    status: 'complete'
  },
  {
    id: 3,
    timestamp: '2026-01-03 09:12:08',
    location: 'Area 51 Perimeter, Nevada',
    threatLevel: 'High',
    status: 'complete'
  }
]

export function HistoryView(): JSX.Element {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <History size={24} className="text-amber-500" />
          <h1 className="text-xl font-bold text-white">EXPLORATION LOGS</h1>
        </div>
        <span className="text-xs text-zinc-500">{mockLogs.length} Records</span>
      </div>

      <div className="space-y-4">
        {mockLogs.map((log) => (
          <div
            key={log.id}
            className="bg-tactical-card border border-zinc-800 rounded-xl p-4 flex items-center justify-between hover:border-zinc-700 transition-colors cursor-pointer card-hover"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <MapPin size={20} className="text-amber-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{log.location}</h3>
                <div className="flex items-center space-x-2 text-[10px] text-zinc-500 mt-1">
                  <Clock size={10} />
                  <span>{log.timestamp}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  log.threatLevel === 'High'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : log.threatLevel === 'Moderate'
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      : 'bg-green-500/10 text-green-400 border border-green-500/20'
                }`}
              >
                <AlertTriangle size={10} className="inline mr-1" />
                {log.threatLevel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
