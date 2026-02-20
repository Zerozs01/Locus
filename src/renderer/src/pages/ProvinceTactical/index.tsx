import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Shield, 
  Building2, 
  Utensils, 
  Car, 
  Plane,
  Bus,
  Train,
  AlertTriangle,
  ChevronRight,
  Star,
  Wallet,
  Loader2,
  Bed,
  Coffee,
  Camera,
  Navigation,
  Clock,
  Thermometer,
  Wifi,
  MapPinned,
  Hospital,
  GraduationCap,
  ShoppingBag,
  Zap,
  Landmark,
  Fuel,
  Pill,
  ExternalLink,
  Copy,
  ChevronDown,
  Crosshair
} from 'lucide-react';
import { Province, Region } from '../data/regions';
import ProvinceMap, { ProvinceMapHandle } from '../components/ProvinceMap';
import { measureAsync } from '../utils/perf';
import { ProvinceData } from './types';
import { generateProvinceData } from './data';
import { ExploreTab } from './tabs/ExploreTab';
import { StayTab } from './tabs/StayTab';
import { EatTab } from './tabs/EatTab';
import { TravelTab } from './tabs/TravelTab';
import { EssentialsTab } from './tabs/EssentialsTab';
import * as Helpers from './components/HelperComponents';

/**
 * Province Tactical Detail Page - REDESIGNED
 * เน้นสิ่งที่ผู้ใช้ต้องการจริงๆ พร้อมแผนที่ Interactive
 */
export const ProvinceTacticalPage = () => {
  const { regionId, provinceId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'explore' | 'stay' | 'eat' | 'travel' | 'essentials'>('explore');
  const [region, setRegion] = useState<Region | null>(null);
  const [province, setProvince] = useState<Province | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Ref for ProvinceMap to trigger fly animations
  const mapRef = useRef<ProvinceMapHandle>(null);
  
  // Handler to fly to a specific location on the map
  const handleFlyToLocation = (lat: number, lng: number, title?: string) => {
    if (mapRef.current) {
      mapRef.current.flyTo(lat, lng, 16);
      console.log(`Flying to: ${title || 'location'} (${lat}, ${lng})`);
    }
  };
  
  // Fetch data from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.api && window.api.db) {
          if (regionId && provinceId && window.api.db.getRegion) {
            const [regionData, provinceData] = await measureAsync(
              'db:getRegion+Province@ProvinceTacticalPage',
              () => Promise.all([
                window.api.db.getRegion(regionId),
                window.api.db.getProvince(provinceId)
              ])
            );
            if (regionData) setRegion(regionData);
            if (provinceData) setProvince(provinceData);
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
    return generateProvinceData(province, region);
  }, [province, region]);

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
    { id: 'explore', label: 'Explore', icon: <Camera size={18} />, color: 'text-teal-400' },
    { id: 'stay', label: 'Stay', icon: <Bed size={18} />, color: 'text-violet-400' },
    { id: 'eat', label: 'Eat & Drink', icon: <Utensils size={18} />, color: 'text-amber-400' },
    { id: 'travel', label: 'Getting Around', icon: <Navigation size={18} />, color: 'text-blue-400' },
    { id: 'essentials', label: 'Essentials', icon: <Shield size={18} />, color: 'text-red-400' },
  ] as const;

  return (
    <div className="flex-1 flex bg-[#050608] overflow-hidden">
      {/* LEFT: MAP SECTION */}
      <div className="w-1/2 relative">
        {/* Back Button Overlay */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 z-[1000] flex items-center gap-2 px-3 py-2 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-lg border border-white/10 text-white transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Radar</span>
        </button>

        {/* Province Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-[1000] p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 text-xs font-mono rounded ${region.color} bg-white/10 border border-white/20`}>
              {region.code}
            </span>
            <span className="text-slate-400 text-sm">{region.engName} Region</span>
          </div>
          <h1 className="text-3xl font-black text-white">{province.name}</h1>
          <p className="text-lg text-slate-300">{provinceData.thaiName}</p>
          {provinceData.slogan && (
            <p className="text-sm text-cyan-400 italic mt-1">"{provinceData.slogan}"</p>
          )}
        </div>

        {/* Interactive Map */}
        <ProvinceMap 
          ref={mapRef}
          provinceName={province.name}
          markers={provinceData.mapMarkers}
          zoom={12}
        />
      </div>

      {/* RIGHT: CONTENT SECTION */}
      <div className="w-1/2 flex flex-col border-l border-white/10">
        {/* Quick Stats Bar */}
        <div className="flex-shrink-0 p-4 bg-[#0a0c10] border-b border-white/10">
          <div className="flex items-center gap-4">
            <Helpers.QuickBadge icon={<Thermometer size={16} />} value={provinceData.weather.temp} label={provinceData.weather.condition} color="amber" />
            <Helpers.QuickBadge icon={<Shield size={16} />} value={`${provinceData.safetyIndex}%`} label="Safe" color="emerald" />
            <Helpers.QuickBadge icon={<Wallet size={16} />} value={provinceData.dailyCost} label="/day" color="cyan" />
            <Helpers.QuickBadge icon={<Phone size={16} />} value="191" label="Police" color="red" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex-shrink-0 border-b border-white/10 bg-[#08090c]">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.id 
                    ? `${tab.color} border-current bg-white/5` 
                    : 'text-slate-500 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span className="hidden xl:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'explore' && <ExploreTab data={provinceData} onFlyTo={handleFlyToLocation} />}
          {activeTab === 'stay' && <StayTab data={provinceData} onFlyTo={handleFlyToLocation} />}
          {activeTab === 'eat' && <EatTab data={provinceData} onFlyTo={handleFlyToLocation} />}
          {activeTab === 'travel' && <TravelTab data={provinceData} onFlyTo={handleFlyToLocation} />}
          {activeTab === 'essentials' && <EssentialsTab data={provinceData} province={province} onFlyTo={handleFlyToLocation} />}
        </div>
      </div>
    </div>
  );
};
