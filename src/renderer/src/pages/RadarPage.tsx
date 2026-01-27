import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThailandMap } from '../components/ThailandMap';
import { RegionDashboard } from '../components/RegionDashboard';
import { Region, Province } from '../data/regions';
import { Search, Users, Maximize, Building } from 'lucide-react';

/**
 * Radar Page - Main Map View (หน้าแรก)
 * แสดงแผนที่ประเทศไทย + Region Dashboard
 */
export const RadarPage = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>('central');
  const [mapMode, setMapMode] = useState<'region' | 'province'>('region');
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.api && window.api.db) {
          const data = await window.api.db.getRegions();
          setRegions(data);
        } else {
          console.warn('DB API not found, running in browser mode.');
        }
      } catch (error) {
        console.error('Failed to load regions:', error);
      }
    };
    fetchData();
  }, []);

  const activeData = regions.find(r => r.id === selectedRegionId);

  const handleRegionSelect = (id: string) => {
    setSelectedRegionId(id);
    setSelectedProvince(null);
  };

  const handleProvinceSelect = (prov: Province) => {
    setSelectedProvince(prov);
    setMapMode('province');
  };

  // Navigate to Province Tactical Detail page
  const handleViewProvinceDetail = (regionId: string, provinceId: string) => {
    navigate(`/province/${regionId}/${provinceId}`);
  };

  return (
    <>
      {/* LEFT: RADAR MAP */}
      <section className="flex-[2] relative bg-[#050608] flex flex-col border-r border-white/5 z-10 overflow-hidden">
        <div className="flex-1 relative flex items-center justify-center">
          <ThailandMap 
            activeId={selectedRegionId} 
            onSelectRegion={handleRegionSelect} 
            viewMode={mapMode} 
            selectedProvince={selectedProvince} 
            onSelectProvince={handleProvinceSelect} 
          />
        </div>

        {/* SUMMARY STATS - Positioned higher to avoid search bar */}
        {activeData && (
          <div className="absolute bottom-24 right-6 z-30 flex flex-col gap-2.5 animate-in fade-in slide-in-from-right-4 duration-500 items-end">
            <StatCard 
              icon={<Users size={18} />}
              value={activeData.summary.pop}
              label="Population"
              colorClass="yellow"
            />
            <StatCard 
              icon={<Maximize size={18} />}
              value={activeData.summary.area}
              label="Area km²"
              colorClass="orange"
            />
            <StatCard 
              icon={<Building size={18} />}
              value={String(activeData.summary.provinces)}
              label="Provinces"
              colorClass="amber"
            />
          </div>
        )}

        {/* SEARCH BAR */}
        <div className="absolute bottom-6 left-6 right-6 z-30">
          <div className="relative group w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-600/50 rounded-xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-[#0f1115] border border-white/10 rounded-xl flex items-center p-3.5 shadow-xl focus-within:ring-2 focus-within:ring-cyan-500/50 transition-all w-full">
              <Search className="text-slate-400 ml-2 mr-3 group-focus-within:text-cyan-400 transition-colors" size={20} />
              <input 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-500 font-medium"
                placeholder={mapMode === 'province' ? "Search province..." : "Search region..."}
              />
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT: DASHBOARD */}
      <RegionDashboard 
        regions={regions}
        selectedRegionId={selectedRegionId} 
        onSelectRegion={handleRegionSelect}
        mapMode={mapMode}
        setMapMode={setMapMode}
        selectedProvince={selectedProvince}
        onSelectProvince={handleProvinceSelect}
        onViewProvinceDetail={handleViewProvinceDetail}
      />
    </>
  );
};

// Helper Component
interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  colorClass: 'yellow' | 'orange' | 'amber';
}

const StatCard = ({ icon, value, label, colorClass }: StatCardProps) => {
  const colors = {
    yellow: { border: 'border-yellow-500', bg: 'bg-yellow-500', text: 'text-yellow-400', iconText: 'text-black' },
    orange: { border: 'border-orange-500', bg: 'bg-orange-500', text: 'text-orange-400', iconText: 'text-white' },
    amber: { border: 'border-amber-700', bg: 'bg-amber-700', text: 'text-amber-500', iconText: 'text-white' },
  };
  const c = colors[colorClass];

  return (
    <div className={`flex items-center gap-3 bg-[#0f1115]/90 backdrop-blur-sm p-2.5 pr-5 pl-2.5 rounded-l-xl border-r-[3px] ${c.border} shadow-lg pointer-events-auto hover:-translate-x-2 transition-transform cursor-default group min-w-[160px] justify-between`}>
      <div className={`${c.bg} p-2 rounded-lg shadow-lg ${c.iconText}`}>{icon}</div>
      <div className="text-right">
        <div className="text-xl font-black text-white leading-none">{value}</div>
        <div className={`text-[10px] font-bold ${c.text} uppercase tracking-wider`}>{label}</div>
      </div>
    </div>
  );
};
