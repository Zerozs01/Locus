import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Utensils, 
  AlertTriangle,
  Loader2,
  Bed,
  Compass,
  Navigation,
  Shield,
  GripVertical
} from 'lucide-react';
import { Province, Region, regionsData } from '../../data/regions';
import { regionTheme, RegionId } from '../../data/regionTheme';
import { getThaiProvinceName } from '../../data/thaiProvinceNames';
import ProvinceMap, { ProvinceMapHandle } from '../../components/ProvinceMap';
import { measureAsync } from '../../utils/perf';
import { generateProvinceData } from './data';
import { ExploreTab } from './tabs/ExploreTab';
import { StayTab } from './tabs/StayTab';
import { EatTab } from './tabs/EatTab';
import { TravelTab } from './tabs/TravelTab';
import { EssentialsTab } from './tabs/EssentialsTab';
import { AQI_SYNC_EVENT } from '../../utils/aqi';

type ProvinceMapTheme = 'voyager' | 'positron' | 'dark' | 'osm' | 'satellite' | 'terrain' | 'admin';
type ProvinceDataLayer = 'traffic' | 'gistdaAqi' | 'aqicnAqi' | 'rainRadar' | 'floodRecurrent' | 'evCharger' | 'slope';

const defaultMapDataLayers: Record<ProvinceDataLayer, boolean> = {
  traffic: false,
  gistdaAqi: false,
  aqicnAqi: false,
  rainRadar: false,
  floodRecurrent: false,
  evCharger: false,
  slope: false,
};

const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Province Tactical Detail Page - REDESIGNED
 * เน้นสิ่งที่ผู้ใช้ต้องการจริงๆ พร้อมแผนที่ Interactive
 */
const MIN_SIDEBAR_WIDTH = 350;
const MAX_SIDEBAR_WIDTH = 600;
const DEFAULT_SIDEBAR_WIDTH = 500;

export const ProvinceTacticalPage = () => {
  const { regionId, provinceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'explore' | 'stay' | 'eat' | 'travel' | 'essentials'>('explore');
  const [region, setRegion] = useState<Region | null>(null);
  const [province, setProvince] = useState<Province | null>(null);
  const [liveWeather, setLiveWeather] = useState<{temp: number, aqi: number} | null>(null);
  const [provinceIndex, setProvinceIndex] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [mapTheme, setMapTheme] = useState<ProvinceMapTheme>('voyager');
  const [mapDataLayers, setMapDataLayers] = useState<Record<ProvinceDataLayer, boolean>>(defaultMapDataLayers);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizeKey = useCallback((value: string) => value.toLowerCase().replace(/[^a-z0-9_-]/g, ''), []);
  const normalizeWeatherProvinceId = useCallback((value: string) => {
    let normalized = String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalized === 'bangkokmetropolis') normalized = 'bangkok';
    if (normalized === 'phranakhonsiayutthaya') normalized = 'ayutthaya';
    return normalized;
  }, []);

  const provinceNameToId = useMemo(() => {
    const map = new Map<string, string>();
    provinceIndex.forEach((p) => {
      map.set(p.name, p.id);
      map.set(normalizeKey(p.name), p.id);
    });
    return map;
  }, [provinceIndex, normalizeKey]);

  const selectedWeatherKeyCandidates = useMemo(() => {
    const provinceName = province?.name || '';
    const candidates = [
      provinceId || '',
      province?.id || '',
      provinceName,
      provinceNameToId.get(provinceName) || '',
      provinceNameToId.get(normalizeKey(provinceName)) || '',
      provinceName === 'Bangkok Metropolis' ? 'Bangkok' : '',
    ];

    const normalized = candidates
      .map((value) => normalizeWeatherProvinceId(value))
      .filter((value) => value.length > 0);

    return Array.from(new Set(normalized));
  }, [normalizeKey, normalizeWeatherProvinceId, province?.id, province?.name, provinceId, provinceNameToId]);
  
  // Ref for ProvinceMap to trigger fly animations
  const mapRef = useRef<ProvinceMapHandle>(null);
  
  // Handler to fly to a specific location on the map
  const handleFlyToLocation = (lat: number, lng: number, title?: string) => {
    if (mapRef.current) {
      console.log(`[ProvinceTactical] handleFlyToLocation called: ${title} (${lat}, ${lng})`);
      
      // เมื่อกดวาร์ป ให้ถือว่าสถานที่นั้นเป็น "ปลายทาง" (End Point) ทันที
      mapRef.current.setRoutePoint('end', lat, lng, title);

      if (title && title.trim()) {
        // Prefer real geometry from search pipeline; fallback remains available if no polygon/bbox.
        mapRef.current.searchAndFocus(title, { lat, lng, radiusMeters: 600 });
      } else {
        mapRef.current.flyToWithFallback(lat, lng, 16, title, 600);
      }
      console.log(`Flying to: ${title || 'location'} (${lat}, ${lng})`);
    }
  };
  
  // Fetch data from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.api && window.api.db) {
          let resolvedProvinceId = provinceId;
          let resolvedRegionId = regionId;

          // Sanitization: If provinceId looks like a Thai name or contains "province"
          const isThai = /[\u0e00-\u0e7f]/.test(provinceId || '');
          if (isThai || provinceId?.toLowerCase().includes('province')) {
            const cleanName = (provinceId || '').replace(/จังหวัด|province/gi, '').trim();
            const index = await window.api.db.getProvinceIndex?.() || [];
            const found = index.find((p: any) => p.name === cleanName || getThaiProvinceName(p.name) === cleanName);
            if (found) {
              resolvedProvinceId = found.id;
              resolvedRegionId = found.regionId || regionId;
            }
          }

          if (resolvedRegionId && resolvedProvinceId && window.api.db.getRegion) {
            const [regionData, provinceData] = await measureAsync(
              'db:getRegion+Province@ProvinceTacticalPage',
              () => Promise.all([
                window.api.db.getRegion(resolvedRegionId),
                window.api.db.getProvince(resolvedProvinceId)
              ])
            );
            if (regionData) setRegion(regionData);
            if (provinceData) {
              // Force sync image from static data
              const staticProv = regionsData.find(r => r.id === resolvedRegionId)?.subProvinces?.find(p => p.id === resolvedProvinceId);
              const updatedProvince = staticProv ? { ...provinceData, image: staticProv.image } : provinceData;
              setProvince(updatedProvince);
            }
          } else {
            const regions = await measureAsync('db:getRegions@ProvinceTacticalPage', () => window.api.db.getRegions());
            const foundRegion = regions.find((r: Region) => r.id === resolvedRegionId);
            if (foundRegion) {
              setRegion(foundRegion);
              const foundProvince = foundRegion.subProvinces?.find((p: Province) => p.id === resolvedProvinceId);
              if (foundProvince) {
                // Force sync image from static data
                const staticProv = regionsData.find(r => r.id === resolvedRegionId)?.subProvinces?.find(p => p.id === resolvedProvinceId);
                const updatedProvince = staticProv ? { ...foundProvince, image: staticProv.image } : foundProvince;
                setProvince(updatedProvince);
              }
            }
          }
        }
      } catch (error) {
        console.error('Failed to load province data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [regionId, provinceId]);

  useEffect(() => {
    if (!window.api?.db?.getProvinceIndex) return;
    window.api.db.getProvinceIndex()
      .then((rows) => {
        const safeRows = Array.isArray(rows) ? rows : [];
        setProvinceIndex(safeRows.map((row) => ({ id: row.id, name: row.name })));
      })
      .catch((error) => {
        console.warn('[ProvinceTactical] getProvinceIndex failed', error);
      });
  }, []);

  useEffect(() => {
    if (!window.api?.db?.getWeatherAqi || selectedWeatherKeyCandidates.length === 0) return;

    let mounted = true;

    const resolveLatestWeather = async () => {
      try {
        const dbRows = await window.api.db.getWeatherAqi();
        if (!mounted || !Array.isArray(dbRows) || dbRows.length === 0) return;

        const todayStr = getLocalDateKey();
        const groupedByProvince = new Map<string, { date: string; aqi: number; temperature: number }[]>();

        dbRows.forEach((row) => {
          const nid = normalizeWeatherProvinceId(row.provinceId);
          const list = groupedByProvince.get(nid) || [];
          list.push({ date: row.date, aqi: row.aqi, temperature: row.temperature });
          groupedByProvince.set(nid, list);
        });

        for (const key of selectedWeatherKeyCandidates) {
          const list = groupedByProvince.get(key);
          if (!Array.isArray(list) || list.length === 0) continue;

          const sorted = [...list].sort((a, b) => b.date.localeCompare(a.date));
          const today = sorted.find((v) => v.date === todayStr);
          const latestPast = sorted.find((v) => v.date <= todayStr);
          const latest = sorted[0];
          const resolved = today || latestPast || latest;

          if (!resolved) continue;
          if (!Number.isFinite(resolved.temperature) || !Number.isFinite(resolved.aqi)) continue;

          setLiveWeather({ temp: resolved.temperature, aqi: resolved.aqi });
          return;
        }
      } catch (error) {
        console.warn('[ProvinceTactical] Weather sync failed', error);
      }
    };

    void resolveLatestWeather();
    const interval = window.setInterval(resolveLatestWeather, 10000);
    const onWeatherUpdated = () => {
      void resolveLatestWeather();
    };

        window.addEventListener(AQI_SYNC_EVENT, onWeatherUpdated as EventListener);
    return () => {
      mounted = false;
      window.clearInterval(interval);
      window.removeEventListener(AQI_SYNC_EVENT, onWeatherUpdated as EventListener);
    };
  }, [normalizeWeatherProvinceId, selectedWeatherKeyCandidates]);

  const [dbPlaces, setDbPlaces] = useState<any[]>([]);

  // Fetch real places from DB
  useEffect(() => {
    if (!provinceId) return;
    const fetchDbPlaces = async () => {
      try {
        const places = await (window as any).api.explorePlaces.getAll();
        // Filter by provinceId (normalized)
        const filtered = places.filter((p: any) => p.provinceId === provinceId);
        setDbPlaces(filtered);
      } catch (err) {
        console.error('[ProvinceTactical] Failed to fetch DB places:', err);
      }
    };
    fetchDbPlaces();
  }, [provinceId]);

  const provinceData = useMemo(() => {
    if (!region || !province) return null;
    const baseData = generateProvinceData(province, region, dbPlaces);
    if (liveWeather) {
       baseData.weather.temp = `${liveWeather.temp.toFixed(1)}°`;
       baseData.weather.aqi = Math.round(liveWeather.aqi);
     } else {
       baseData.weather.temp = '--';
       baseData.weather.aqi = undefined;
    }
    return baseData;
  }, [province, region, liveWeather, dbPlaces]);

  const activeDataLayers = useMemo(
    () => (Object.entries(mapDataLayers)
      .filter(([, isEnabled]) => isEnabled)
      .map(([layer]) => layer as ProvinceDataLayer)),
    [mapDataLayers]
  );

  const handleToggleDataLayer = (layer: ProvinceDataLayer) => {
    setMapDataLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Resize handlers for drag-to-resize sidebar
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newSidebarWidth = containerRect.right - e.clientX;
    const clampedWidth = Math.min(Math.max(newSidebarWidth, MIN_SIDEBAR_WIDTH), MAX_SIDEBAR_WIDTH);
    setSidebarWidth(clampedWidth);
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Attach global mouse events when resizing
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const state = location.state as {
      focusPlace?: {
        lat: number;
        lng: number;
        title?: string;
        boundingbox?: string[];
        geojson?: unknown;
        autoFocus?: boolean;
      };
      focusRoute?: {
        from: string;
        to: string;
        lat: number;
        lng: number;
      };
    } | null;
    if (loading || (!state?.focusPlace && !state?.focusRoute)) return;

    const timerId = window.setTimeout(() => {
      if (state.focusRoute) {
        const geocode = async (query: string) => {
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ' Thailand')}&limit=1`);
            const data = await res.json();
            if (data && data.length > 0) {
              return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), title: query };
            }
          } catch (e) {
            console.error(e);
          }
          // Fallback to rough offset near province center
          return { lat: state.focusRoute!.lat + (Math.random() - 0.5) * 0.05, lng: state.focusRoute!.lng + (Math.random() - 0.5) * 0.05, title: query };
        };

        Promise.all([geocode(state.focusRoute.from), geocode(state.focusRoute.to)]).then(([startPos, endPos]) => {
          if (startPos && endPos) {
            mapRef.current?.setRouteAndCalculate(
              startPos.lat, startPos.lng, startPos.title,
              endPos.lat, endPos.lng, endPos.title
            );
          }
        });
        return;
      }

      if (!state.focusPlace) return;

      const normalizeFocusName = (value?: string) =>
        (value || '')
          .toLowerCase()
          .replace(/metropolis/g, '')
          .replace(/province/g, '')
          .replace(/จังหวัด/g, '')
          .replace(/[^a-z0-9ก-๙]+/gi, ' ')
          .trim();

      const focusTitleNorm = normalizeFocusName(state.focusPlace!.title);
      const provinceNameNorm = normalizeFocusName(province?.name);
      const provinceAliasNorm = normalizeFocusName(province?.name === 'Bangkok Metropolis' ? 'Bangkok' : province?.name);
      const provinceThaiNorm = normalizeFocusName(province?.name ? getThaiProvinceName(province.name) : '');
      const isProvinceLevelFocus = !!focusTitleNorm && [provinceNameNorm, provinceAliasNorm].some(
        (name) => !!name && (focusTitleNorm === name || focusTitleNorm.includes(name) || name.includes(focusTitleNorm))
      );
      const isProvinceLevelFocusByThai = !!focusTitleNorm && !!provinceThaiNorm
        && (focusTitleNorm === provinceThaiNorm || focusTitleNorm.includes(provinceThaiNorm) || provinceThaiNorm.includes(focusTitleNorm));

      const geometryType = state.focusPlace!.geojson && typeof state.focusPlace!.geojson === 'object'
        ? (state.focusPlace!.geojson as { type?: string }).type
        : undefined;
      const hasPolygon = geometryType === 'Polygon' || geometryType === 'MultiPolygon';

      if (hasPolygon) {
        const suppressProvincePolygonHighlight = isProvinceLevelFocus || isProvinceLevelFocusByThai;
        mapRef.current?.focusSearchResult({
          lat: state.focusPlace!.lat,
          lng: state.focusPlace!.lng,
          title: state.focusPlace!.title,
          zoom: 16,
          boundingbox: suppressProvincePolygonHighlight ? undefined : state.focusPlace!.boundingbox,
          geojson: suppressProvincePolygonHighlight ? undefined : state.focusPlace!.geojson,
        });
      } else {
        // Fallback: run search flow first, then guaranteed area highlight around original target.
        const hasCoords = typeof state.focusPlace!.lat === 'number' && typeof state.focusPlace!.lng === 'number';
        mapRef.current?.searchAndFocus(
          state.focusPlace!.title || `${state.focusPlace!.lat},${state.focusPlace!.lng}`,
          hasCoords ? {
            lat: state.focusPlace!.lat,
            lng: state.focusPlace!.lng,
            radiusMeters: 700,
          } : undefined,
          { autoFocus: state.focusPlace!.autoFocus !== false }
        );
      }
      console.log(`Flying to: ${state.focusPlace!.title || 'location'} (${state.focusPlace!.lat}, ${state.focusPlace!.lng})`);
    }, 500);

    window.history.replaceState({}, document.title);
    return () => window.clearTimeout(timerId);
  }, [location.state, loading, province?.name]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#050608]">
        <div className="text-center">
          <Loader2 size={48} className="text-cyan-500 mx-auto mb-4 animate-spin" />
          <p className="text-slate-400">Loading province data...</p>
        </div>
      </div>
    );
  }

  if (!region || !province || !provinceData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#050608]">
        <div className="text-center">
          <AlertTriangle size={48} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Province Not Found</h2>
          <p className="text-slate-400 mb-4">The requested province data is unavailable.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-medium transition-colors"
          >
            Back to Radar
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'explore', label: 'Overview', icon: <Compass size={18} />, color: 'text-teal-400' },
    { id: 'stay', label: 'Stay', icon: <Bed size={18} />, color: 'text-violet-400' },
    { id: 'eat', label: 'Food & Supply', icon: <Utensils size={18} />, color: 'text-amber-400' },
    { id: 'travel', label: 'Transit', icon: <Navigation size={18} />, color: 'text-blue-400' },
    { id: 'essentials', label: 'Critical', icon: <Shield size={18} />, color: 'text-red-400' },
  ] as const;

  const displayProvinceName = province.name === 'Bangkok Metropolis' ? 'Bangkok' : province.name;

  return (
    <div ref={containerRef} className="flex-1 flex bg-[#050608] overflow-hidden">
      {/* LEFT: MAP SECTION */}
      <div 
        className="relative transition-all" 
        style={{ width: `calc(100% - ${sidebarWidth}px)` }}
      >
        {/* Back Button Overlay */}
        <button 
            onClick={() => navigate('/map')}
          className="absolute top-4 left-4 z-[1000] flex items-center justify-center p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg border border-white/10 text-white transition-all group"
          title="Back to Thai map"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* Interactive Map */}
        <ProvinceMap 
          ref={mapRef}
          provinceName={province.name}
          provinceId={province.id}
          markers={provinceData.mapMarkers}
          zoom={12}
          theme={mapTheme}
          externalDataLayers={activeDataLayers}
          regionColor={regionTheme[region.id as RegionId]?.accentHex}
          onChangeTheme={setMapTheme}
          onToggleLayer={handleToggleDataLayer}
          mapDataLayers={mapDataLayers}
        />
      </div>

      {/* RESIZE HANDLE */}
      <div
        onMouseDown={handleMouseDown}
        className={`w-1 flex-shrink-0 bg-transparent hover:bg-cyan-500/50 cursor-col-resize transition-colors relative group ${isResizing ? 'bg-cyan-500/70' : ''}`}
        style={{ cursor: isResizing ? 'col-resize' : 'col-resize' }}
      >
        <div className={`absolute inset-y-0 -left-1 -right-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${isResizing ? 'opacity-100' : ''}`}>
          <GripVertical size={16} className="text-cyan-400 drop-shadow-lg" />
        </div>
      </div>

      {/* RIGHT: CONTENT SECTION */}
      <div 
        className="flex flex-col border-l border-white/10 transition-all"
        style={{ width: sidebarWidth }}
      >
        {/* Tab Navigation */}
        <div className="flex-shrink-0 border-b border-white/10 bg-[#08090c]">
          <div className="flex px-2 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1 py-2 sm:px-3 sm:py-3 text-[10px] sm:text-xs font-bold uppercase transition-all border-b-2 whitespace-nowrap min-w-0 ${
                  activeTab === tab.id 
                    ? `${tab.color} border-current bg-white/5` 
                    : 'text-slate-500 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="shrink-0">{React.cloneElement(tab.icon, { size: 14 })}</div>
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'explore' && (
            <ExploreTab
              data={provinceData}
              onFlyTo={handleFlyToLocation}
              provinceImage={province.image}
              provinceInfo={{
                displayName: displayProvinceName,
                thaiName: provinceData.thaiName,
                regionId: region.id,
                regionCode: region.code,
                regionEngName: region.engName,
                slogan: provinceData.slogan,
                regionColor: regionTheme[region.id as RegionId]?.accentHex || '#06b6d4',
              }}
              mapTheme={mapTheme}
              mapDataLayers={mapDataLayers}
              onChangeMapTheme={setMapTheme}
              onToggleDataLayer={handleToggleDataLayer}
            />
          )}
          {activeTab === 'stay' && <StayTab data={provinceData} onFlyTo={handleFlyToLocation} />}
          {activeTab === 'eat' && <EatTab data={provinceData} onFlyTo={handleFlyToLocation} />}
          {activeTab === 'travel' && <TravelTab data={provinceData} onFlyTo={handleFlyToLocation} />}
          {activeTab === 'essentials' && <EssentialsTab data={provinceData} province={province} onFlyTo={handleFlyToLocation} />}
        </div>
      </div>
    </div>
  );
};
