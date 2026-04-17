import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Utensils, 
  AlertTriangle,
  Loader2,
  Bed,
  Compass,
  Navigation,
  Shield
} from 'lucide-react';
import { Province, Region } from '../../data/regions';
import { regionTheme, RegionId } from '../../data/regionTheme';
import ProvinceMap, { ProvinceMapHandle } from '../../components/ProvinceMap';
import { measureAsync } from '../../utils/perf';
import { generateProvinceData } from './data';
import { ExploreTab } from './tabs/ExploreTab';
import { StayTab } from './tabs/StayTab';
import { EatTab } from './tabs/EatTab';
import { TravelTab } from './tabs/TravelTab';
import { EssentialsTab } from './tabs/EssentialsTab';

/**
 * Province Tactical Detail Page - REDESIGNED
 * เน้นสิ่งที่ผู้ใช้ต้องการจริงๆ พร้อมแผนที่ Interactive
 */
export const ProvinceTacticalPage = () => {
  const { regionId, provinceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'explore' | 'stay' | 'eat' | 'travel' | 'essentials'>('explore');
  const [region, setRegion] = useState<Region | null>(null);
  const [province, setProvince] = useState<Province | null>(null);
  const [liveWeather, setLiveWeather] = useState<{temp: number, aqi: number} | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Ref for ProvinceMap to trigger fly animations
  const mapRef = useRef<ProvinceMapHandle>(null);
  
  // Handler to fly to a specific location on the map
  const handleFlyToLocation = (lat: number, lng: number, title?: string) => {
    if (mapRef.current) {
      console.log(`[ProvinceTactical] handleFlyToLocation called: ${title} (${lat}, ${lng})`);
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
          if (regionId && provinceId && window.api.db.getRegion) {
            const [regionData, provinceData, weatherData] = await measureAsync(
              'db:getRegion+Province@ProvinceTacticalPage',
              () => Promise.all([
                window.api.db.getRegion(regionId),
                window.api.db.getProvince(provinceId),
                window.api.db.getWeatherAqi ? window.api.db.getWeatherAqi(provinceId) : Promise.resolve([])
              ])
            );
            if (regionData) setRegion(regionData);
            if (provinceData) setProvince(provinceData);
            if (weatherData && weatherData.length > 0) {
              setLiveWeather({ temp: weatherData[0].temperature, aqi: weatherData[0].aqi });
            }
          } else {
            const regions = await measureAsync('db:getRegions@ProvinceTacticalPage', () => window.api.db.getRegions());
            const foundRegion = regions.find((r: Region) => r.id === regionId);
            if (foundRegion) {
              setRegion(foundRegion);
              const foundProvince = foundRegion.subProvinces?.find((p: Province) => p.id === provinceId);
              if (foundProvince) {
                setProvince(foundProvince);
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

  const provinceData = useMemo(() => {
    if (!region || !province) return null;
    const baseData = generateProvinceData(province, region);
    if (liveWeather) {
       baseData.weather.temp = `${liveWeather.temp.toFixed(1)}°`;
       baseData.weather.aqi = liveWeather.aqi;
    }
    return baseData;
  }, [province, region, liveWeather]);

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
    } | null;
    if (!state?.focusPlace || loading) return;

    const timerId = window.setTimeout(() => {
      const geometryType = state.focusPlace!.geojson && typeof state.focusPlace!.geojson === 'object'
        ? (state.focusPlace!.geojson as { type?: string }).type
        : undefined;
      const hasPolygon = geometryType === 'Polygon' || geometryType === 'MultiPolygon';

      if (hasPolygon) {
        mapRef.current?.focusSearchResult({
          lat: state.focusPlace!.lat,
          lng: state.focusPlace!.lng,
          title: state.focusPlace!.title,
          zoom: 16,
          boundingbox: state.focusPlace!.boundingbox,
          geojson: state.focusPlace!.geojson,
        });
      } else {
        // Fallback: run search flow first, then guaranteed area highlight around original target.
        mapRef.current?.searchAndFocus(
          state.focusPlace!.title || `${state.focusPlace!.lat},${state.focusPlace!.lng}`,
          {
            lat: state.focusPlace!.lat,
            lng: state.focusPlace!.lng,
            radiusMeters: 700,
          },
          { autoFocus: state.focusPlace!.autoFocus !== false }
        );
      }
      console.log(`Flying to: ${state.focusPlace!.title || 'location'} (${state.focusPlace!.lat}, ${state.focusPlace!.lng})`);
    }, 500);

    window.history.replaceState({}, document.title);
    return () => window.clearTimeout(timerId);
  }, [location.state, loading]);

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
    <div className="flex-1 flex bg-[#050608] overflow-hidden">
      {/* LEFT: MAP SECTION */}
      <div className="w-1/2 relative">
        {/* Back Button Overlay */}
        <button 
            onClick={() => navigate('/map')}
          className="absolute top-4 left-4 z-[1000] flex items-center gap-2 px-3 py-2 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-lg border border-white/10 text-white transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Thai map</span>
        </button>

        {/* Interactive Map */}
        <ProvinceMap 
          ref={mapRef}
          provinceName={province.name}
          markers={provinceData.mapMarkers}
          zoom={12}
          regionColor={regionTheme[region.id as RegionId]?.accentHex}
        />
      </div>

      {/* RIGHT: CONTENT SECTION */}
      <div className="w-1/2 flex flex-col border-l border-white/10">
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
          {activeTab === 'explore' && <ExploreTab data={provinceData} onFlyTo={handleFlyToLocation} provinceInfo={{ displayName: displayProvinceName, thaiName: provinceData.thaiName, regionCode: region.code, regionEngName: region.engName, slogan: provinceData.slogan, regionColor: regionTheme[region.id as RegionId]?.accentHex || '#06b6d4' }} />}
          {activeTab === 'stay' && <StayTab data={provinceData} onFlyTo={handleFlyToLocation} />}
          {activeTab === 'eat' && <EatTab data={provinceData} onFlyTo={handleFlyToLocation} />}
          {activeTab === 'travel' && <TravelTab data={provinceData} onFlyTo={handleFlyToLocation} />}
          {activeTab === 'essentials' && <EssentialsTab data={provinceData} province={province} onFlyTo={handleFlyToLocation} />}
        </div>
      </div>
    </div>
  );
};
