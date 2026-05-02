import { useState, useEffect, useMemo, useRef, useDeferredValue, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThailandMap } from '../components/ThailandMap';
import { RegionDashboard } from '../components/RegionDashboard';
import { Region, Province, regionsData } from '../data/regions';
import { regionTheme, type RegionId } from '../data/regionTheme';
import { searchProvince, getThaiProvinceName } from '../data/thaiProvinceNames';
import { Search, Users, Maximize, Building, MapPin } from 'lucide-react';
import { measureAsync } from '../utils/perf';
import { mixHex, toRgba } from '../utils/color';

const normalizeSearchText = (text: string) =>
  text
    .toLowerCase()
    .replace(/[\s\-_/.,()]+/g, '')
    .trim();

const isLooseMatch = (query: string, candidate: string) => {
  const q = normalizeSearchText(query);
  const c = normalizeSearchText(candidate);
  if (!q || !c) return false;
  if (c.includes(q) || q.includes(c)) return true;

  // Subsequence match (handles incomplete typing like "สยามพารากอ")
  let qi = 0;
  for (let i = 0; i < c.length && qi < q.length; i += 1) {
    if (c[i] === q[qi]) qi += 1;
  }
  return qi / q.length >= 0.8;
};

const hasPolygonGeo = (geojson: unknown): boolean => {
  if (!geojson || typeof geojson !== 'object') return false;
  const geoType = (geojson as { type?: string }).type;
  return geoType === 'Polygon' || geoType === 'MultiPolygon';
};

const POPULAR_PLACE_CANDIDATES = [
  { name: 'สยามพารากอน', keywords: 'siam paragon สยามพารากอน สยามพารากอ สยามพา', provinceName: 'Bangkok Metropolis', lat: 13.7466, lng: 100.5347 },
  { name: 'สยามสแควร์', keywords: 'siam square สยามสแควร์ สยาม', provinceName: 'Bangkok Metropolis', lat: 13.7449, lng: 100.5335 },
  { name: 'เซ็นทรัลเวิลด์', keywords: 'central world centralworld เซ็นทรัลเวิลด์', provinceName: 'Bangkok Metropolis', lat: 13.7467, lng: 100.5393 },
  { name: 'เยาวราช', keywords: 'yaowarat chinatown เยาวราช', provinceName: 'Bangkok Metropolis', lat: 13.7396, lng: 100.5104 },
  { name: 'จตุจักร', keywords: 'chatuchak จตุจักร jj market', provinceName: 'Bangkok Metropolis', lat: 13.7998, lng: 100.5510 },
  { name: 'วัดอรุณ', keywords: 'wat arun วัดอรุณ temple', provinceName: 'Bangkok Metropolis', lat: 13.7437, lng: 100.4888 },
];

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
  const [remotePlaceSuggestions, setRemotePlaceSuggestions] = useState<Array<{
    id: string;
    name: string;
    displayName: string;
    lat: number;
    lng: number;
    regionId: string;
    provinceId: string;
    provinceName: string;
    osmClass?: string;
    osmType?: string;
    importance?: number;
    boundingbox?: string[];
    geojson?: unknown;
  }>>([]);
  const [isRemoteSearching, setIsRemoteSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const loadedRegionIdsRef = useRef<Set<string>>(new Set());
  const regionsRef = useRef<Region[]>([]);
  const [searchHighlight, setSearchHighlight] = useState(false);

  // ─── OPTIMIZED SEARCH HELPERS ───────────────────────────────────────────────
  // Pre-compute normalized province data once
  const normalizedProvinceCache = useMemo(() => {
    return provinceIndex.map(p => ({
      ...p,
      normalizedName: normalizeSearchText(p.name),
      normalizedThaiName: normalizeSearchText(getThaiProvinceName(p.name)),
    }));
  }, [provinceIndex]);

  const quickSearch = useCallback((query: string) => {
    const q = normalizeSearchText(query);
    if (!q || q.length < 1) return [];
    return normalizedProvinceCache
      .filter(p => p.normalizedName.includes(q) || p.normalizedThaiName.includes(q))
      .slice(0, 6);
  }, [normalizedProvinceCache]);

  const scoreAndSort = useCallback((
    localPlaces: ReturnType<typeof createLocalPlace>[],
    remotePlaces: typeof remotePlaceSuggestions,
    provinces: ReturnType<typeof quickSearch>,
    queryNorm: string
  ) => {
    const byKey = new Map<string, typeof provinces[0] | typeof localPlaces[0]>();

    const processPlace = (item: typeof localPlaces[0]) => {
      const key = `place-${normalizeSearchText(item.name)}-${item.provinceId}`;
      const existing = byKey.get(key);
      const score = item.importance + (item.osmType?.toLowerCase().includes('landmark') ? 2 : 0);
      if (!existing || score > (existing as typeof item).importance) {
        byKey.set(key, item);
      }
    };

    localPlaces.forEach(processPlace);
    remotePlaces.forEach(p => {
      const key = `place-${normalizeSearchText(p.name)}-${p.provinceId}`;
      const existing = byKey.get(key);
      const hasPoly = hasPolygonGeo(p.geojson);
      if (!existing || (hasPoly && !hasPolygonGeo((existing as typeof p).geojson))) {
        byKey.set(key, p);
      }
    });

    provinces.forEach(p => {
      const key = `province-${p.id}`;
      byKey.set(key, p);
    });

    return Array.from(byKey.values()).slice(0, 8);
  }, []);

  // Pre-compute local places once
  const localPlacesData = useMemo(() => {
    return POPULAR_PLACE_CANDIDATES.map((place, idx) => {
      const matched = normalizedProvinceCache.find(p =>
        p.name === place.provinceName || p.normalizedThaiName === normalizeSearchText(place.provinceName)
      );
      if (!matched) return null;
      return {
        kind: 'place' as const,
        id: `local-place-${idx}`,
        name: place.name,
        displayName: `${place.name}, ${getThaiProvinceName(matched.name)}`,
        regionId: matched.regionId,
        provinceId: matched.id,
        provinceName: matched.name,
        osmClass: 'landmark-local',
        osmType: 'landmark',
        lat: place.lat,
        lng: place.lng,
        importance: 1,
        keywordsNorm: normalizeSearchText(place.keywords),
      };
    }).filter(Boolean) as Array<ReturnType<typeof createLocalPlace>>;
  }, []);

  // Create helper function outside useMemo to avoid recreation
  const createLocalPlace = (place: typeof POPULAR_PLACE_CANDIDATES[0], idx: number) => {
    const matched = normalizedProvinceCache.find(p =>
      p.name === place.provinceName || p.normalizedThaiName === normalizeSearchText(place.provinceName)
    );
    if (!matched) return null;
    return {
      kind: 'place' as const,
      id: `local-place-${idx}`,
      name: place.name,
      displayName: `${place.name}, ${getThaiProvinceName(matched.name)}`,
      regionId: matched.regionId,
      provinceId: matched.id,
      provinceName: matched.name,
      osmClass: 'landmark-local',
      osmType: 'landmark',
      lat: place.lat,
      lng: place.lng,
      importance: 1,
      keywordsNorm: normalizeSearchText(place.keywords),
    };
  };

  // Handle focusSearch state from Explore page navigation
  const location = useLocation();
  useEffect(() => {
    const state = location.state as { focusSearch?: boolean; regionId?: string } | null;
    if (state?.focusSearch) {
      // Delay focus slightly to let mount complete
      setTimeout(() => {
        searchInputRef.current?.focus();
        setSearchHighlight(true);
        // Remove highlight after animation
        setTimeout(() => setSearchHighlight(false), 3000);
      }, 300);
      // Clear the state so refresh doesn't re-trigger
      window.history.replaceState({}, document.title);
    }
    if (state?.regionId) {
      setSelectedRegionId(state.regionId);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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

    // Get all provinces for search (cached reference)
  const allProvinces = useMemo(() => provinceIndex, [provinceIndex]);

  // Filter provinces using optimized cache
  const filteredProvinces = useMemo(() => {
    if (!deferredSearchQuery.trim()) return [];
    return quickSearch(deferredSearchQuery);
  }, [deferredSearchQuery, quickSearch]);

    const searchSuggestions = useMemo(() => {
    const queryNorm = normalizeSearchText(deferredSearchQuery);
    if (!queryNorm) return [];

    // Province matches
    const provinceSuggestions = filteredProvinces.map((prov) => ({
      kind: 'province' as const,
      id: prov.id,
      name: prov.name,
      regionId: prov.regionId,
      regionName: prov.regionName,
    }));

    // Local place matches (pre-computed + fast filter)
    const localMatched = localPlacesData.filter(p =>
      isLooseMatch(deferredSearchQuery, p.name) ||
      (p.keywordsNorm && p.keywordsNorm.includes(queryNorm))
    );

    // Remote place matches (use existing state, already fetched)
    const placeSuggestions = remotePlaceSuggestions.map((place) => ({
      kind: 'place' as const,
      id: place.id,
      name: place.name,
      displayName: place.displayName,
      regionId: place.regionId,
      provinceId: place.provinceId,
      provinceName: place.provinceName,
      osmClass: place.osmClass,
      osmType: place.osmType,
      lat: place.lat,
      lng: place.lng,
      boundingbox: place.boundingbox,
      geojson: place.geojson,
    }));

    return scoreAndSort(localMatched, placeSuggestions, provinceSuggestions, queryNorm);
  }, [filteredProvinces, remotePlaceSuggestions, deferredSearchQuery, localPlacesData, scoreAndSort]);

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchSuggestions.length]);

    // Remote search using optimized province cache
  useEffect(() => {
    const query = deferredSearchQuery.trim();
    if (query.length < 2) {
      setRemotePlaceSuggestions([]);
      setIsRemoteSearching(false);
      return;
    }

    const timerId = window.setTimeout(async () => {
      setIsRemoteSearching(true);
      const controller = new AbortController();
      const cancelTimer = window.setTimeout(() => controller.abort(), 4000);

      try {
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=8&accept-language=th,en&countrycodes=th&addressdetails=1&polygon_geojson=1&q=${encodeURIComponent(query)}`;
        const response = await fetch(url, {
          signal: controller.signal,
          headers: { Accept: 'application/json', 'Accept-Language': 'th,en' },
        });

        if (!response.ok) throw new Error('search failed');
        const data = await response.json();

        const mapped = (data as any[])
          .map((item) => {
            const haystack = ([
              item.display_name, item.name,
              item.address?.state, item.address?.province,
              item.address?.county, item.address?.city,
            ].filter(Boolean).join(' ')).toLowerCase();

            // Use pre-computed cache for faster matching
            const matched = normalizedProvinceCache.find(p =>
              haystack.includes(p.normalizedName) || haystack.includes(p.normalizedThaiName)
            );
            if (!matched) return null;

            return {
              id: `place-${item.place_id}`,
              name: item.name || item.display_name?.split(',')[0] || matched.name,
              displayName: item.display_name,
              lat: Number(item.lat),
              lng: Number(item.lon),
              regionId: matched.regionId,
              provinceId: matched.id,
              provinceName: matched.name,
              osmClass: item.class,
              osmType: item.type,
              importance: item.importance,
              boundingbox: item.boundingbox,
              geojson: item.geojson,
            };
          })
          .filter((item): item is NonNullable<typeof item> =>
            Boolean(item) && Number.isFinite(item.lat) && Number.isFinite(item.lng)
          );

        const byKey = new Map<string, typeof mapped[0]>();
        mapped.forEach((item) => {
          const key = `${normalizeSearchText(item.name)}-${item.provinceId}`;
          const existing = byKey.get(key);
          const hasPoly = hasPolygonGeo(item.geojson);
          const existingHasPoly = existing && hasPolygonGeo(existing.geojson);
          if (!existing || (hasPoly && !existingHasPoly) || ((item.importance || 0) > (existing?.importance || 0))) {
            byKey.set(key, item);
          }
        });

        setRemotePlaceSuggestions(Array.from(byKey.values()));
      } catch {
        setRemotePlaceSuggestions([]);
      } finally {
        window.clearTimeout(cancelTimer);
        setIsRemoteSearching(false);
      }
    }, 420);

    return () => window.clearTimeout(timerId);
  }, [deferredSearchQuery, normalizedProvinceCache]);

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

  const handleSearchSelect = useCallback(async (suggestion: {
    kind: 'province' | 'place';
    id: string;
    name: string;
    regionId: string;
    regionName?: string;
    provinceId?: string;
    provinceName?: string;
    lat?: number;
    lng?: number;
    boundingbox?: string[];
    geojson?: unknown;
  }) => {
    if (suggestion.kind === 'place' && suggestion.provinceId && Number.isFinite(suggestion.lat) && Number.isFinite(suggestion.lng)) {
      navigate(`/province/${suggestion.regionId}/${suggestion.provinceId}`, {
        state: {
          focusPlace: {
            lat: suggestion.lat,
            lng: suggestion.lng,
            title: suggestion.name,
            boundingbox: suggestion.boundingbox,
            geojson: suggestion.geojson,
          },
        },
      });
      setSearchQuery('');
      setShowSuggestions(false);
      return;
    }

    setSelectedRegionId(suggestion.regionId);
    setMapMode('province');
    const provinces = await loadRegionProvinces(suggestion.regionId);
    const fullProvince = provinces.find((p) => p.id === suggestion.id) || provinces.find((p) => p.name === suggestion.name) || null;
    setSelectedProvince(fullProvince);
    setSearchQuery('');
    setShowSuggestions(false);
  }, [loadRegionProvinces, navigate]);

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
      setSelectedIndex(prev => Math.min(prev + 1, Math.max(searchSuggestions.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && searchSuggestions.length > 0) {
      e.preventDefault();
      handleSearchSelect(searchSuggestions[selectedIndex]);
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
    const normalizedName = normalizeSearchText(name);
    const provInfo = normalizedProvinceCache.find(p =>
      p.normalizedName === normalizedName || p.normalizedThaiName === normalizedName
    );
    if (provInfo) {
      handleSearchSelect({
        kind: 'province',
        id: provInfo.id,
        name: provInfo.name,
        regionId: provInfo.regionId,
        regionName: provInfo.regionName,
      });
    }
  }, [normalizedProvinceCache, handleSearchSelect]);

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
            {showSuggestions && searchQuery.trim().length > 0 && (
              <div className="absolute bottom-full left-0 right-0 mb-1.5 bg-[#0f1115] border border-white/10 rounded-t-xl rounded-b-none overflow-hidden shadow-2xl animate-in fade-in duration-150 z-50" style={{ animationFillMode: 'both' }}>
                {searchSuggestions.length > 0 ? (
                  searchSuggestions.map((item, index) => (
                    <button
                      key={`${item.kind}-${item.id}`}
                      onClick={() => handleSearchSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${index === selectedIndex ? 'bg-cyan-500/20' : 'hover:bg-white/5'}`}
                    >
                        <MapPin size={16} className={`flex-shrink-0 ${index === selectedIndex ? 'text-cyan-300' : 'text-slate-500'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{item.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {item.kind === 'province'
                            ? `${getThaiProvinceName(item.name)} • ${item.regionName}`
                            : `${((item.osmType || '').toLowerCase() === 'landmark' || hasPolygonGeo('geojson' in item ? item.geojson : undefined)) ? 'landmark' : (item.osmType || 'place')} • ${item.provinceName || ''}`}
                        </div>
                      </div>
                      {item.kind === 'place' && (
                        <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] text-cyan-300">Open Detail</span>
                      )}
                      {index === selectedIndex && (
                        <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded">Enter</span>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-slate-400">
                    {isRemoteSearching ? 'กำลังค้นหาสถานที่...' : 'ไม่พบผลลัพธ์'}
                  </div>
                )}
              </div>
            )}

            <div className={`absolute -inset-0.5 rounded-xl blur transition-opacity duration-500 ${searchHighlight ? 'opacity-80 animate-pulse' : 'opacity-0 group-hover:opacity-40'}`} style={{ background: 'linear-gradient(90deg, rgba(6,182,212,0.5), rgba(59,130,246,0.45))' }}></div>
            <div className={`relative border rounded-xl flex items-center p-3.5 shadow-xl transition-all duration-300 will-change-auto w-full ${searchHighlight ? 'bg-[#0c1018] border-cyan-500/50' : 'bg-[#0f1115] border-white/10'}`}>
              <Search className="text-slate-400 ml-2 mr-3 group-focus-within:text-cyan-300 transition-colors" size={20} />
              <input 
                ref={searchInputRef}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="map-search-input bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 text-sm text-cyan-300 caret-cyan-300 w-full placeholder:text-slate-500 font-medium"
                placeholder="ค้นหาจังหวัดหรือสถานที่ แล้วกด Enter..."
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
        provinceIndex={provinceIndex}
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
