import { useState, useEffect, useMemo, useRef, useDeferredValue } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThailandMap } from '../components/ThailandMap';
import { RegionDashboard } from '../components/RegionDashboard';
import { Region, Province, regionsData } from '../data/regions';
import { searchProvince, getThaiProvinceName } from '../data/thaiProvinceNames';
import { Search, Users, Maximize, Building, MapPin } from 'lucide-react';
import { measureAsync } from '../utils/perf';

// Local image mapping for regions (override DB URLs)
const regionImageMap: Record<string, string> = regionsData.reduce((acc, r) => {
  acc[r.id] = r.image;
  return acc;
}, {} as Record<string, string>);

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
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const deferredSearchQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.api && window.api.db) {
          const data = await measureAsync('db:getRegions@RadarPage', () => window.api.db.getRegions());
          // Override images with local files
          const dataWithLocalImages = data.map((region: Region) => ({
            ...region,
            image: regionImageMap[region.id] || region.image
          }));
          setRegions(dataWithLocalImages);
        } else {
          console.warn('DB API not found, running in browser mode.');
          // Use static data as fallback
          setRegions(regionsData);
        }
      } catch (error) {
        console.error('Failed to load regions:', error);
      }
    };
    fetchData();
  }, []);

  const activeData = regions.find(r => r.id === selectedRegionId);

  // Get all provinces for search
  const allProvinces = useMemo(() => {
    return regions.flatMap(region => 
      (region.subProvinces || []).map(prov => ({
        ...prov,
        regionId: region.id,
        regionName: region.name
      }))
    );
  }, [regions]);

  // Filter provinces based on search (supports Thai and English)
  const filteredProvinces = useMemo(() => {
    if (!deferredSearchQuery.trim()) return [];
    return allProvinces.filter(p => 
      searchProvince(deferredSearchQuery, p.name)
    ).slice(0, 6);
  }, [deferredSearchQuery, allProvinces]);

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredProvinces.length]);

  // Handle search selection
  const handleSearchSelect = (prov: typeof allProvinces[0]) => {
    setSelectedRegionId(prov.regionId);
    setSelectedProvince(prov);
    setMapMode('province');
    setSearchQuery('');
    setShowSuggestions(false);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
    setSelectedIndex(0);
  };

  // Handle keyboard navigation
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredProvinces.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filteredProvinces.length > 0) {
      e.preventDefault();
      handleSearchSelect(filteredProvinces[selectedIndex]);
    } else if (e.key === 'Escape') {
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

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

        {/* SEARCH BAR WITH UPWARD SUGGESTIONS */}
        <div className="absolute bottom-6 left-6 right-6 z-30">
          <div className="relative group w-full">
            {/* Suggestions Overlay - Above search bar */}
            {showSuggestions && filteredProvinces.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#0f1115] border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
                {filteredProvinces.map((prov, index) => (
                  <button
                    key={prov.id}
                    onClick={() => handleSearchSelect(prov)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${index === selectedIndex ? 'bg-cyan-500/20' : 'hover:bg-white/5'}`}
                  >
                    <MapPin size={16} className={`flex-shrink-0 ${index === selectedIndex ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">{prov.name}</div>
                      <div className="text-[10px] text-slate-500">{getThaiProvinceName(prov.name)} • {prov.regionName}</div>
                    </div>
                    {index === selectedIndex && (
                      <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded">Enter</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-[#0f1115] border border-white/10 rounded-xl flex items-center p-3.5 shadow-xl transition-all w-full">
              <Search className="text-slate-400 ml-2 mr-3 group-focus-within:text-cyan-400 transition-colors" size={20} />
              <input 
                ref={searchInputRef}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="bg-transparent border-none outline-none text-sm text-yellow-400 w-full placeholder:text-slate-500 font-medium"
                placeholder="ค้นหาจังหวัด (TH/EN)..."
              />
              {searchQuery && (
                <button 
                  onClick={() => { setSearchQuery(''); setShowSuggestions(false); }}
                  className="text-slate-500 hover:text-white transition-colors mr-2"
                >
                  ✕
                </button>
              )}
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
