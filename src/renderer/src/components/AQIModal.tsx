import { useState, useMemo } from 'react';
import { X, Filter, Wind } from 'lucide-react';
import { Province } from '../data/regions';
import { getRecords, useMockCSVGenerator } from '../utils/csvDb';

interface AQIModalProps {
  isOpen: boolean;
  onClose: () => void;
  regionName: string;
  provinces: Province[];
}

const getAQILevel = (aqi: number) => {
  if (aqi <= 50) return { label: 'Good (ฟ้า)', color: '#38bdf8', min: 0, max: 50 };
  if (aqi <= 100) return { label: 'Moderate (เขียว)', color: '#4ade80', min: 51, max: 100 };
  if (aqi <= 200) return { label: 'Unhealthy for Sensitive (เหลือง)', color: '#facc15', min: 101, max: 200 };
  if (aqi <= 300) return { label: 'Unhealthy (ส้ม)', color: '#fb923c', min: 201, max: 300 };
  return { label: 'Hazardous (แดง)', color: '#ef4444', min: 301, max: 999 };
};

export const AQIModal = ({ isOpen, onClose, regionName, provinces }: AQIModalProps) => {
  // Generate mock past/future data if doesn't exist
  useMockCSVGenerator(provinces.map(p => ({id: p.id, name: p.name})));

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const aqiDataList = useMemo(() => {
    if (!isOpen) return [];
    
    // Get newest record for today
    const allRecords = getRecords();
    const todayStr = new Date().toISOString().split('T')[0];
    
    const data = provinces.map(prov => {
      // Pick record for today
      let record = allRecords.find(r => r.id === prov.id && r.date === todayStr);
      // fallback to mock current if none matching
      if (!record) {
          record = { id: prov.id, date: todayStr, temperature: 30, aqi: 20 + Math.random() * 150 };
      }
      return {
        ...prov,
        aqi: Math.round(record.aqi),
        level: getAQILevel(record.aqi)
      };
    });
    return data.sort((a, b) => b.aqi - a.aqi);
  }, [isOpen, provinces]);

  const filteredData = useMemo(() => {
    if (!activeFilter) return aqiDataList;
    return aqiDataList.filter(d => {
        if (activeFilter === 'good') return d.aqi <= 50;
        if (activeFilter === 'moderate') return d.aqi > 50 && d.aqi <= 100;
        if (activeFilter === 'unhealthy+') return d.aqi > 100;
        return true;
    });
  }, [aqiDataList, activeFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f1115] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Wind size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Air Quality (PM2.5)</h2>
              <p className="text-sm text-slate-400">Current AQI Index for {regionName} Region</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-white/5 flex gap-2 overflow-x-auto">
            <span className="flex items-center gap-1 text-sm text-slate-400 mr-2"><Filter size={14}/> Filter:</span>
            <button onClick={() => setActiveFilter(null)} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${!activeFilter ? 'bg-cyan-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>All</button>
            <button onClick={() => setActiveFilter('good')} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${activeFilter === 'good' ? 'bg-[#38bdf8] text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Good (0-50)</button>
            <button onClick={() => setActiveFilter('moderate')} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${activeFilter === 'moderate' ? 'bg-[#4ade80] text-black' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Moderate (51-100)</button>
            <button onClick={() => setActiveFilter('unhealthy+')} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${activeFilter === 'unhealthy+' ? 'bg-[#facc15] text-black' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Unhealthy (101+)</button>
        </div>

        {/* Content - Bar Chart */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          <div className="space-y-4">
            {filteredData.map((item, idx) => (
              <div key={item.id} className="flex flex-col gap-1.5 group">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">{idx + 1}. {item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: item.level.color }}>{item.level.label}</span>
                    <span className="font-bold w-12 text-right">{item.aqi}</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ 
                        width: `${Math.min(100, (item.aqi / 300) * 100)}%`,
                        backgroundColor: item.level.color
                    }}
                  />
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
                <div className="text-center py-10 text-slate-400">No provinces match this AQI level.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
