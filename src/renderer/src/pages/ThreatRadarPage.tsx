import { useState, useEffect, useMemo, useRef, useDeferredValue, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThailandMap } from '../components/ThailandMap';
import { RegionDashboard } from '../components/RegionDashboard';
import { Region, Province, regionsData } from '../data/regions';
import { regionTheme, type RegionId } from '../data/regionTheme';
import { searchProvince, getThaiProvinceName } from '../data/thaiProvinceNames';
import { Search, Users, Maximize, Building, MapPin } from 'lucide-react';
import { measureAsync } from '../utils/perf';
import { mixHex, toRgba } from '../utils/color';

// Local image mapping for regions (override DB URLs)
const regionImageMap: Record<string, string> = regionsData.reduce((acc, r) => {
  acc[r.id] = r.image;
  return acc;
}, {} as Record<string, string>);

/**
 * Threat Radar Page - Survival Mode
 * แสดงแผนที่ประเทศไทย + Region Dashboard (Threat Assessment)
 */
export const ThreatRadarPage = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>('central');
  const [mapMode, setMapMode] = useState<'region' | 'province'>('region');
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [provinceIndex, setProvinceIndex] = useState<Array<{ id: string; name: string; regionId: string; regionName: string }>>([]);
  const [loadingProvinceRegionId, setLoadingProvinceRegionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const loadedRegionIdsRef = useRef<Set<string>>(new Set());
  const regionsRef = useRef<Region[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.api && window.api.db) {
          const [regionSummaries, provinceSearchIndex] = await Promise.all([
            window.api.db.getRegionSummaries
              ? measureAsync('db:getRegionSummaries@RadarPage', () => window.api.db.getRegionSummaries())
              : measureAsync('db:getRegions@RadarPage', () => window.api.db.getRegions()),
            window.api.db.getProvinceIndex
              ? measureAsync('db:getProvinceIndex@RadarPage', () => window.api.db.getProvinceIndex())
              : Promise.resolve([])
          ]);
          const dataWithLocalImages = regionSummaries.map((region: Region) => ({
            ...region,
            image: regionImageMap[region.id] || region.image
          }));
          setRegions(dataWithLocalImages);
          if (provinceSearchIndex.length > 0) {
            setProvinceIndex(provinceSearchIndex);
          } else {
            const fallbackIndex = dataWithLocalImages.flatMap((region: Region) =>
              (region.subProvinces || []).map((prov: Province) => ({
                id: prov.id,
                name: prov.name,
                regionId: region.id,
                regionName: region.name
              }))
            );
            setProvinceIndex(fallbackIndex);
          }
        } else {
          console.warn('DB API not found, running in browser mode.');
          setRegions(regionsData);
          const fallbackIndex = regionsData.flatMap((region) =>
            (region.subProvinces || []).map((prov) => ({
              id: prov.id,
              name: prov.name,
              regionId: region.id,
              regionName: region.name
            }))
          );
          setProvinceIndex(fallbackIndex);
        }
      } catch (error) {
        console.error('Failed to load regions:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    regionsRef.current = regions;
  }, [regions]);

  const activeData = regions.find(r => r.id === selectedRegionId);
  const activeTheme = selectedRegionId ? regionTheme[selectedRegionId as RegionId] || regionTheme.central : regionTheme.central;
  const summaryToneRamp = activeTheme.toneRamp;
  const isProvinceFocus = mapMode === 'province' && !!selectedProvince;
  const getProvincePopulation = (prov: Province | null) => {
    if (!prov) return null;
    if (prov.population) return prov.population;
    if (typeof prov.populationValue === 'number') return prov.populationValue.toLocaleString();
    return null;
  };
  const getProvinceArea = (prov: Province | null) => {
    if (!prov) return null;
    if (prov.area) return prov.area;
    if (typeof prov.areaValue === 'number') return prov.areaValue.toLocaleString();
    return null;
  };

  // Get all provinces for search
  const allProvinces = useMemo(() => provinceIndex, [provinceIndex]);

  // Filter provinces based on search (supports Thai and English)
  const filteredProvinces = useMemo(() => {
    if (!deferredSearchQuery.trim()) return [];
    return allProvinces
      .filter(p => searchProvince(deferredSearchQuery, p.name))
      .slice(0, 6);
  }, [deferredSearchQuery, allProvinces]);

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredProvinces.length]);

  // Handle search selection
  const loadRegionProvinces = useCallback(async (regionId: string) => {
    if (!window.api?.db?.getProvincesByRegion) {
      return regionsRef.current.find((region) => region.id === regionId)?.subProvinces || [];
    }
    if (loadedRegionIdsRef.current.has(regionId)) {
      return regionsRef.current.find((region) => region.id === regionId)?.subProvinces || [];
    }
    setLoadingProvinceRegionId(regionId);
    try {
      const provinces = await measureAsync(`db:getProvincesByRegion@RadarPage:${regionId}`, () =>
        window.api.db.getProvincesByRegion(regionId)
      );
      setRegions((prev) =>
        prev.map((region) => (region.id === regionId ? { ...region, subProvinces: provinces } : region))
      );
      loadedRegionIdsRef.current.add(regionId);
      return provinces;
    } finally {
      setLoadingProvinceRegionId((prev) => (prev === regionId ? null : prev));
    }
  }, []);

  const handleSearchSelect = useCallback(async (prov: typeof allProvinces[0]) => {
    setSelectedRegionId(prov.regionId);
    setMapMode('province');
    const provinces = await loadRegionProvinces(prov.regionId);
    const fullProvince = provinces.find((p) => p.id === prov.id) || provinces.find((p) => p.name === prov.name) || null;
    setSelectedProvince(fullProvince);
    setSearchQuery('');
    setShowSuggestions(false);
  }, [loadRegionProvinces]);

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

  const handleRegionSelect = useCallback((id: string) => {
    setSelectedRegionId(id);
    setSelectedProvince(null);
  }, []);

  const handleProvinceSelect = useCallback((prov: Province) => {
    setSelectedProvince((prev) => (prev?.id === prov.id ? null : prov));
    setMapMode('province');
  }, []);

  const handleClearProvince = useCallback(() => {
    setSelectedProvince(null);
  }, []);

  const handleSelectProvinceByName = useCallback((name: string) => {
    const provInfo = allProvinces.find(p => p.name === name || getThaiProvinceName(p.name) === name);
    if (provInfo) {
      handleSearchSelect(provInfo);
    }
  }, [allProvinces, handleSearchSelect]);

  useEffect(() => {
    if (mapMode === 'province' && selectedRegionId) {
      loadRegionProvinces(selectedRegionId);
    }
  }, [mapMode, selectedRegionId, loadRegionProvinces]);

  // Navigate to Province Tactical Detail page
  const handleViewProvinceDetail = useCallback((regionId: string, provinceId: string) => {
    navigate(`/province/${regionId}/${provinceId}`);
  }, [navigate]);

  return (
    <>
      {/* LEFT: RADAR MAP */}
      <section
        className="relative z-10 flex flex-[2] flex-col overflow-hidden border-r border-white/5"
        style={{
          background: 'linear-gradient(180deg, rgba(13, 16, 20, 1) 0%, rgba(6, 8, 12, 1) 100%)'
        }}
      >
        <div className="flex-1 relative flex items-center justify-center will-change-auto">
          <ThailandMap 
            activeId={selectedRegionId} 
            onSelectRegion={handleRegionSelect} 
            viewMode={mapMode} 
            selectedProvince={selectedProvince} 
            onSelectProvince={handleProvinceSelect} 
            onClearProvince={handleClearProvince}
            onSelectProvinceByName={handleSelectProvinceByName}
          />
        </div>

        {/* SUMMARY STATS - Positioned higher to avoid search bar */}
        {activeData && (
          <div className="absolute bottom-24 right-5 z-30 flex flex-col gap-2 animate-in fade-in slide-in-from-right-2 duration-200 items-end" style={{ animationFillMode: 'both' }}>
            <StatCard 
              icon={<Users size={15} />}
              value={isProvinceFocus ? (getProvincePopulation(selectedProvince) || activeData.summary.pop) : activeData.summary.pop}
              label="Living Targets"
              toneColor={summaryToneRamp[0]}
            />
            <StatCard 
              icon={<Maximize size={15} />}
              value={isProvinceFocus ? (getProvinceArea(selectedProvince) || activeData.summary.area) : activeData.summary.area}
              label="Hotzone Area"
              toneColor={summaryToneRamp[1]}
            />
            {!isProvinceFocus && (
              <StatCard 
                icon={<Building size={15} />}
                value={String(activeData.summary.provinces)}
                label="Provinces"
                toneColor={summaryToneRamp[2]}
              />
            )}
          </div>
        )}

        {/* SEARCH BAR WITH UPWARD SUGGESTIONS */}
        <div className="absolute bottom-6 left-6 right-6 z-30">
          <div className="relative group w-full">
            {/* Suggestions Overlay - Above search bar */}
            {showSuggestions && filteredProvinces.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 mb-1.5 bg-[#0f1115] border border-white/10 rounded-t-xl rounded-b-none overflow-hidden shadow-2xl animate-in fade-in duration-150 z-50" style={{ animationFillMode: 'both' }}>
                {filteredProvinces.map((prov, index) => (
                  <button
                    key={prov.id}
                    onClick={() => handleSearchSelect(prov)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${index === selectedIndex ? 'bg-red-500/20' : 'hover:bg-white/5'}`}
                  >
                    <MapPin size={16} className={`flex-shrink-0 ${index === selectedIndex ? 'text-red-400' : 'text-slate-500'}`} />
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

            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/30 to-orange-600/30 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
            <div className="relative bg-[#0f1115] border border-white/10 rounded-xl flex items-center p-3.5 shadow-xl transition-colors duration-150 will-change-auto w-full">
              <Search className="text-slate-400 ml-2 mr-3 group-focus-within:text-red-500 transition-colors" size={20} />
              <input 
                ref={searchInputRef}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="bg-transparent border-none outline-none text-sm text-red-400 w-full placeholder:text-slate-500 font-medium"
                placeholder="สแกนหาพื้นที่เป้าหมาย (TH/EN)..."
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
        loadingProvinceRegionId={loadingProvinceRegionId}
      />
    </>
  );
};

// Helper Component
interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  toneColor: string;
}

const StatCard = ({ icon, value, label, toneColor }: StatCardProps) => {
  const darkTone = mixHex(toneColor, '#000000', 0.42);
  const deeperTone = mixHex(toneColor, '#000000', 0.62);
  const labelTone = mixHex(toneColor, '#ffffff', 0.14);

  return (
    <div
      className="group pointer-events-auto flex min-w-[132px] cursor-default items-center justify-between gap-2 rounded-l-lg border-r-2 bg-[#0f1115]/90 px-2.5 py-1.5 pr-3.5 shadow-lg backdrop-blur-sm transition-transform duration-200 will-change-transform hover:-translate-x-1"
      style={{
        borderColor: toneColor,
        background: `linear-gradient(135deg, rgba(15,17,21,0.96) 0%, ${toRgba(darkTone, 0.26)} 58%, ${toRgba(toneColor, 0.2)} 100%)`,
        boxShadow: `0 10px 20px ${toRgba(darkTone, 0.12)}`
      }}
    >
      <div
        className="rounded-md p-1.5 text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${deeperTone} 0%, ${darkTone} 56%, ${toneColor} 100%)` }}
      >
        {icon}
      </div>
      <div className="text-right">
        <div className="text-lg font-black text-white leading-none">{value}</div>
        <div className="text-[9px] font-bold uppercase tracking-wide" style={{ color: labelTone }}>
          {label}
        </div>
      </div>
    </div>
  );
};
