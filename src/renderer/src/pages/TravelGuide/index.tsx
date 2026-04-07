import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Navigation2, Search, ExternalLink, MapPin,
  CloudRain, Thermometer,
  Lightbulb, AlertTriangle, Landmark, Fuel, BanknoteIcon,
  Bath, PawPrint, Leaf, Mountain
} from 'lucide-react';
import { regionTheme, type RegionId } from '../../data/regionTheme';
import { toRgba } from '../../utils/color';
import { getProvincePortal, getCurrentSeason } from './data/portalData';
import { regionBriefs } from './data/regionBriefs';
import { calculateTripCost, budgetLabels, type BudgetTier } from './data/regionExpenses';
import { getTravelConditionForDate } from './data/calendarHelpers';
import { ThailandMap } from '../../components/ThailandMap';
import { getRecords } from '../../utils/csvDb';

import { getEcoEntities, expandEcoTags, type EcoEntity } from './data/ecoDb';
import { WeatherHistoryModal } from '../../components/WeatherHistoryModal';

// Header Gradient Pair logic
const regionGradientPairs: Record<string, string> = {
  central: '#f59e0b', north: '#d946ef', northeast: '#ef4444', 
  west: '#84cc16', east: '#a16207', south: '#3b82f6',
};

const provincesByRegion: Record<string, string[]> = {
  north: ['Chiang Mai','Chiang Rai','Lampang','Lamphun','Mae Hong Son','Nan','Phayao','Phrae','Uttaradit'],
  northeast: ['Amnat Charoen','Bueng Kan','Buri Ram','Chaiyaphum','Kalasin','Khon Kaen','Loei','Maha Sarakham','Mukdahan','Nakhon Phanom','Nakhon Ratchasima','Nong Bua Lam Phu','Nong Khai','Roi Et','Sakon Nakhon','Si Sa Ket','Surin','Ubon Ratchathani','Udon Thani','Yasothon'],
  central: ['Ang Thong','Bangkok Metropolis','Chai Nat','Kamphaeng Phet','Lop Buri','Nakhon Nayok','Nakhon Pathom','Nakhon Sawan','Nonthaburi','Pathum Thani','Phetchabun','Phichit','Phitsanulok','Phra Nakhon Si Ayutthaya','Samut Prakan','Samut Sakhon','Samut Songkhram','Saraburi','Sing Buri','Sukhothai','Suphan Buri','Uthai Thani'],
  west: ['Kanchanaburi','Phetchaburi','Prachuap Khiri Khan','Ratchaburi','Tak'],
  east: ['Chachoengsao','Chanthaburi','Chon Buri','Prachin Buri','Rayong','Sa Kaeo','Trat'],
  south: ['Chumphon','Krabi','Nakhon Si Thammarat','Narathiwat','Pattani','Phangnga','Phatthalung','Phuket','Ranong','Satun','Songkhla','Surat Thani','Trang','Yala'],
};

const provinceToRegion: Record<string, string> = {};
Object.entries(provincesByRegion).forEach(([r, ps]) => ps.forEach(p => provinceToRegion[p] = r));

const defaultProvincePerRegion: Record<string, string> = {
  north: 'Chiang Mai', northeast: 'Khon Kaen', central: 'Bangkok Metropolis',
  west: 'Kanchanaburi', east: 'Chon Buri', south: 'Phuket',
};

const provinceThaiNames: Record<string, string> = {
  'Bangkok Metropolis':'กรุงเทพมหานคร','Chiang Mai':'เชียงใหม่','Chiang Rai':'เชียงราย',
  'Lampang':'ลำปาง','Lamphun':'ลำพูน','Mae Hong Son':'แม่ฮ่องสอน','Nan':'น่าน',
  'Phayao':'พะเยา','Phrae':'แพร่','Uttaradit':'อุตรดิทถ์','Khon Kaen':'ขอนแก่น','Nakhon Ratchasima':'นครราชสีมา','Udon Thani':'อุดรธานี','Ubon Ratchathani':'อุบลราชธานี','Buri Ram':'บุรีรัมย์','Surin':'สุรินทร์','Kanchanaburi':'กาญจนบุรี','Ratchaburi':'ราชบุรี','Tak':'ตาก','Phetchaburi':'เพชรบุรี','Prachuap Khiri Khan':'ประจวบคีรีขันธ์','Chon Buri':'ชลบุรี','Rayong':'ระยอง','Chanthaburi':'จันทบุรี','Trat':'ตราด','Phuket':'ภูเก็ต','Surat Thani':'สุราษฎร์ธานี','Songkhla':'สงขลา','Krabi':'กระบี่','Nakhon Pathom':'นครปฐม','Nonthaburi':'นนทบุรี','Pathum Thani':'ปทุมธานี','Samut Prakan':'สมุทรปราการ','Phra Nakhon Si Ayutthaya':'พระนครศรีอยุธยา','Amnat Charoen':'อำนาจเจริญ','Bueng Kan':'บึงกาฬ','Chaiyaphum':'ชัยภูมิ','Kalasin':'กาฬสินธุ์','Loei':'เลย','Maha Sarakham':'มหาสารคาม','Mukdahan':'มุกดาหาร','Nakhon Phanom':'นครพนม','Nong Bua Lam Phu':'หนองบัวลำภู','Nong Khai':'หนองคาย','Roi Et':'ร้อยเอ็ด','Sakon Nakhon':'สกลนคร','Si Sa Ket':'ศรีสะเกษ','Yasothon':'ยโสธร','Ang Thong':'อ่างทอง','Chai Nat':'ชัยนาท','Kamphaeng Phet':'กำแพงเพชร',
  'Lop Buri':'ลพบุรี','Nakhon Nayok':'นครนายก','Nakhon Sawan':'นครสวรรค์','Phetchabun':'เพชรบูรณ์','Phichit':'พิจิตร','Phitsanulok':'พิษณุโลก','Samut Sakhon':'สมุทรสาคร','Samut Songkhram':'สมุทรสงคราม','Saraburi':'สระบุรี','Sing Buri':'สิงห์บุรี','Sukhothai':'สุโขทัย','Suphan Buri':'สุพรรณบุรี','Uthai Thani':'อุทัยธานี','Chachoengsao':'ฉะเชิงเทรา','Prachin Buri':'ปราจีนบุรี','Sa Kaeo':'สระแก้ว','Chumphon':'ชุมพร','Nakhon Si Thammarat':'นครศรีธรรมราช','Narathiwat':'นราธิวาส','Pattani':'ปัตตานี','Phangnga':'พังงา','Phatthalung':'พัทลุง','Ranong':'ระนอง','Satun':'สตูล','Trang':'ตรัง','Yala':'ยะลา',
};

export function TravelGuidePage() {
  const { regionId: paramRegionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();

  const [activeRegion, setActiveRegion] = useState<string>(paramRegionId || 'central');
  const region = regionTheme[activeRegion as RegionId] || regionTheme.central;
  const brief = regionBriefs[activeRegion as RegionId] || regionBriefs.central;
  const accent = region.accentHex;
  const accentSecondary = regionGradientPairs[activeRegion] || region.toneRamp[1];
  const season = getCurrentSeason();

  const [selectedProvinceName, setSelectedProvinceName] = useState<string>(defaultProvincePerRegion[paramRegionId || 'central'] || '');
  const displayName = provinceThaiNames[selectedProvinceName] || selectedProvinceName;

  const [activeTransportTab, setActiveTransportTab] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [destText, setDestText] = useState('');
  const [tripDate, setTripDate] = useState(new Date().toISOString().split('T')[0]);
  const [tripBudgetLevel, setTripBudgetLevel] = useState<BudgetTier>('mid');
  const [confirmedTrip, setConfirmedTrip] = useState<{ dest: string; budgetLevel: BudgetTier; date: string } | null>(null);

  const [syncedAqiMap, setSyncedAqiMap] = useState<Record<string, number>>({});
  const [syncedTempMap, setSyncedTempMap] = useState<Record<string, number>>({});
  const [provinceIndex, setProvinceIndex] = useState<Array<{ id: string; name: string }>>([]);

  const normalizeKey = useCallback((value: string) => value.toLowerCase().replace(/[^a-z]/g, ''), []);

  const provinceNameToId = useMemo(() => {
    const map = new Map<string, string>();
    provinceIndex.forEach((p) => {
      map.set(p.name, p.id);
      map.set(normalizeKey(p.name), p.id);
    });
    return map;
  }, [provinceIndex, normalizeKey]);

  const selectedProvinceId = useMemo(() => {
    const byName = provinceNameToId.get(selectedProvinceName) || provinceNameToId.get(normalizeKey(selectedProvinceName));
    if (byName) return byName;
    // Fallback: legacy normalization
    let dbId = normalizeKey(selectedProvinceName);
    if (dbId === 'bangkokmetropolis') dbId = 'bangkok';
    if (dbId === 'phranakhonsiayutthaya') dbId = 'ayutthaya';
    return dbId;
  }, [provinceNameToId, selectedProvinceName, normalizeKey]);

  useEffect(() => {
    const api = (window as any).api;
    if (!api?.db?.getProvinceIndex) return;
    api.db.getProvinceIndex()
      .then((rows: Array<{ id: string; name: string }>) => setProvinceIndex(Array.isArray(rows) ? rows : []))
      .catch((e: unknown) => console.warn('[TravelGuide] getProvinceIndex failed', e));
  }, []);

  const [previewEco, setPreviewEco] = useState<EcoEntity | null>(null);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [portalData, setPortalData] = useState<any>(null);

  useEffect(() => {
    const syncData = () => {
      const rows = getRecords();
      if (!Array.isArray(rows) || rows.length === 0) return;

      const groupedByProvince = new Map<string, Array<{ date: string; aqi: number; temperature: number }>>();
      rows.forEach((r) => {
        if (!r) return;
        const normalizedId = normalizeKey(r.id);
        const date = typeof r.date === 'string' ? r.date : '';
        const aqi = typeof r.aqi === 'number' && Number.isFinite(r.aqi) ? r.aqi : NaN;
        const temperature = typeof r.temperature === 'number' && Number.isFinite(r.temperature) ? r.temperature : NaN;
        if (isNaN(aqi) && isNaN(temperature)) return;

        const list = groupedByProvince.get(normalizedId) || [];
        list.push({ date, aqi, temperature });
        groupedByProvince.set(normalizedId, list);
      });

      const aqiMap: Record<string, number> = {};
      const tempMap: Record<string, number> = {};
      groupedByProvince.forEach((list, id) => {
        const sorted = [...list].sort((a, b) => b.date.localeCompare(a.date));
        const latestTemp = sorted.find((value) => !isNaN(value.temperature));
        const preferredAqi = sorted.find((value) => !isNaN(value.aqi) && value.aqi !== 50)
          || sorted.find((value) => !isNaN(value.aqi));

        if (preferredAqi) aqiMap[id] = preferredAqi.aqi;
        if (latestTemp) tempMap[id] = latestTemp.temperature;
      });

      // Do not overwrite with empty maps (prevents rollback to static fallback)
      if (Object.keys(aqiMap).length > 0) setSyncedAqiMap(aqiMap);
      if (Object.keys(tempMap).length > 0) setSyncedTempMap(tempMap);
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === 'locus_weather_aqi_csv_db') syncData();
    };

    syncData();
    const interval = setInterval(syncData, 3000);
    window.addEventListener('storage', onStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, [showWeatherModal, normalizeKey]);
  
  // Fetch portal data: try DB first, always fallback to static data
  useEffect(() => {
    const fetchPortal = async () => {
      try {
        const dbData = await (window as any).api.db.getProvincePortal(selectedProvinceId);
        // DB returns transport as an array – only use if we actually have rows
        if (dbData && Array.isArray(dbData.transport) && dbData.transport.length > 0) {
          setPortalData(dbData);
          return;
        }
      } catch (e) {
        console.warn('[TravelGuide] DB portal fetch failed, using static data:', e);
      }
      // Fallback: always use static data from portalData.ts
      const pName = displayName.toLowerCase();
      const staticData = getProvincePortal(pName === 'กรุงเทพมหานคร' ? 'bangkok' : pName);
      setPortalData(staticData);
    };
    fetchPortal();
  }, [selectedProvinceId, selectedProvinceName, displayName]);

  const portal = portalData || getProvincePortal('default');


  const transportTabs = portal.transport?.tabs || [
    { id: 'bus', label: 'รถเมล์/บขส.' }, { id: 'train', label: 'รถไฟ' }, { id: 'van', label: 'รถตู้' }
  ];
  const currentTab = activeTransportTab || transportTabs[0]?.id || '';
  const currentTabCompanies = currentTab === '__others'
    ? (portal.transport?.others || [])
    : (portal.transport?.companies ? (portal.transport.companies[currentTab] || []) : (portal.transport || []));

  const currentProvinces = provincesByRegion[activeRegion] || [];
  const weatherModalProvinces = useMemo(() => {
    return currentProvinces.map((name) => {
      const id = provinceNameToId.get(name) || provinceNameToId.get(normalizeKey(name)) || normalizeKey(name);
      return { id, name: provinceThaiNames[name] || name };
    });
  }, [currentProvinces, provinceNameToId, normalizeKey]);

  const switchToRegion = useCallback((regionId: string, province?: string) => {
    setActiveRegion(regionId);
    setSelectedProvinceName(province || defaultProvincePerRegion[regionId] || '');
    setActiveTransportTab('');
    setConfirmedTrip(null);
    navigate(`/travel-guide/${regionId}`, { replace: true });
  }, [navigate]);

  const handleMapSelectRegion = useCallback((id: string) => switchToRegion(id), [switchToRegion]);
  const handleMapSelectProvince = useCallback((name: string) => {
    const provRegion = provinceToRegion[name];
    if (provRegion && provRegion !== activeRegion) {
      switchToRegion(provRegion, name);
    } else {
      setSelectedProvinceName(name);
      setActiveTransportTab('');
      setConfirmedTrip(null);
    }
  }, [activeRegion, switchToRegion]);

  const handleConfirmSearch = () => {
    if (!destText) return;
    setConfirmedTrip({ dest: destText, budgetLevel: tripBudgetLevel, date: tripDate });
    setShowSearchPopup(false);
  };

  const condition = confirmedTrip ? getTravelConditionForDate(confirmedTrip.date, activeRegion) : null;
  const costResult = confirmedTrip ? calculateTripCost(activeRegion as RegionId, confirmedTrip.budgetLevel, 1, 1, 0) : null;

  if (!region) return null;
  
  // Helper: temp label
  const getTempLabel = (t: number) => {
    if (t <= 15) return { label: 'เย็นมาก', color: 'text-blue-400' };
    if (t <= 22) return { label: 'เย็น', color: 'text-cyan-400' };
    if (t <= 28) return { label: 'ปานกลาง', color: 'text-emerald-400' };
    if (t <= 35) return { label: 'ร้อน', color: 'text-amber-400' };
    return { label: 'ร้อนมาก', color: 'text-red-400' };
  };

  const regionAvgAqi = useMemo(() => {
    const values = (provincesByRegion[activeRegion] || [])
      .map((name) => {
        const id = provinceNameToId.get(name) || provinceNameToId.get(normalizeKey(name)) || normalizeKey(name);
        const value = syncedAqiMap[normalizeKey(id)];
        return typeof value === 'number' && Number.isFinite(value) ? value : null;
      })
      .filter((value): value is number => value !== null);

    if (values.length === 0) return null;
    const total = values.reduce((sum, value) => sum + value, 0);
    return Math.round(total / values.length);
  }, [activeRegion, provinceNameToId, normalizeKey, syncedAqiMap]);

  const normalizedSelectedProvinceId = normalizeKey(selectedProvinceId);
  const currentAqi = syncedAqiMap[normalizedSelectedProvinceId] ?? regionAvgAqi ?? brief.avgAqi;
  const currentTemp = syncedTempMap[normalizedSelectedProvinceId] ?? null; // null = ไม่มีข้อมูลวันนี้
  const tempInfo = currentTemp !== null ? getTempLabel(currentTemp) : null;

  return (
    <div className="h-full w-full flex-1 min-w-0 flex flex-col bg-[#020305] overflow-hidden relative">
      <div className="shrink-0 flex items-center pr-[120px] pl-4 py-3 gap-3"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accentSecondary} 80%, #000 100%)` }}>
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-black/30 backdrop-blur flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all shrink-0"><ArrowLeft size={18} /></button>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/15 backdrop-blur shadow-inner"><Navigation2 size={20} className="text-white drop-shadow-md" /></div>
        <h1 className="text-lg font-black text-white drop-shadow-md tracking-tight mr-1 shrink-0">Travel Guide</h1>
        <select value={activeRegion} onChange={(e) => switchToRegion(e.target.value)} className="bg-black/40 backdrop-blur border border-white/10 rounded-lg px-3 py-2 text-sm text-white min-w-[120px] cursor-pointer ml-1">
          {Object.entries(regionTheme).map(([id, r]) => (<option key={id} value={id} className="bg-[#0f1115] text-white">{r.label}</option>))}
        </select>
        <select value={selectedProvinceName} onChange={(e) => setSelectedProvinceName(e.target.value)} className="bg-black/40 backdrop-blur border border-white/10 rounded-lg px-3 py-2 text-sm text-white min-w-[150px] cursor-pointer">
          {currentProvinces.map(p => (<option key={p} value={p} className="bg-[#0f1115] text-white">{provinceThaiNames[p] || p}</option>))}
        </select>
        <button onClick={() => setShowSearchPopup(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-sm text-white hover:bg-white/20 transition-all flex-1 max-w-[260px] justify-start shadow-sm"><Search size={16} /><span className="truncate">{confirmedTrip?.dest || 'ค้นหาสถานที่...'}</span></button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[300px] shrink-0 border-r flex flex-col relative" style={{ borderColor: toRgba(accent, 0.1), background: '#050608' }}>
          <ThailandMap activeId={activeRegion} onSelectRegion={handleMapSelectRegion} viewMode="province" selectedProvince={{ name: selectedProvinceName, id: selectedProvinceName } as any} onSelectProvince={() => {}} onSelectProvinceByName={handleMapSelectProvince} />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
          <div className="rounded-xl border p-4" style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-white">{displayName}</h2>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white shadow-sm shrink-0">
                  <CloudRain size={13} className="text-black/70" />
                  <div className="text-xs text-left">
                    <div className="font-bold text-black leading-tight">{season.label}</div>
                    <div className="text-black/50 text-[9px]">{season.range}</div>
                  </div>
                </div>
                <button onClick={() => setShowWeatherModal(true)} className="group flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 shadow-sm shrink-0 transition-all hover:scale-105 active:scale-100">
                  <Thermometer size={13} className="text-amber-400 group-hover:scale-110 transition-transform" />
                  <div className="text-xs text-left">
                    <div className="font-bold text-white leading-tight">{currentTemp !== null ? `${Math.round(currentTemp)}°C` : brief.climate.split(',')[0].replace('อุณหภูมิ ', '')}</div>
                    <div className={`text-[9px] font-bold ${tempInfo ? tempInfo.color : 'text-white/50'}`}>{tempInfo ? tempInfo.label : 'Weather Forecast'}</div>
                  </div>
                </button>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/10 shadow-sm shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${currentAqi <= 50 ? 'bg-emerald-400' : currentAqi <= 100 ? 'bg-amber-400' : currentAqi <= 150 ? 'bg-orange-400' : 'bg-red-500'}`} />
                  <div className="text-xs text-left">
                    <div className={`font-bold leading-tight ${currentAqi <= 50 ? 'text-emerald-400' : currentAqi <= 100 ? 'text-amber-400' : currentAqi <= 150 ? 'text-orange-400' : 'text-red-400'}`}>AQI {currentAqi}</div>
                    <div className="text-white/50 text-[9px] font-bold">{currentAqi <= 50 ? 'คุณภาพดี (Good)' : currentAqi <= 100 ? 'ปานกลาง (Moderate)' : currentAqi <= 150 ? 'มีผลต่อกลุ่มเสี่ยง' : currentAqi <= 200 ? 'ไม่ดีต่อสุขภาพ' : 'อันตราย (Hazardous)'}</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 flex-wrap">
                {transportTabs.map((tab: { id: string; label: string }) => (<button key={tab.id} onClick={() => setActiveTransportTab(tab.id)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentTab === tab.id ? 'text-black shadow-md' : 'text-slate-400 bg-white/5 hover:bg-white/10'}`} style={currentTab === tab.id ? { background: accent } : {}}>{tab.label}</button>))}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {currentTabCompanies.map((co: any, i: number) => (
                <div key={i} className="rounded-lg border p-3 flex items-center gap-2.5 group hover:border-opacity-80 transition-all" style={{ borderColor: `${co.color || '#fff'}25`, background: `${co.color || '#fff'}08` }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black shrink-0" style={{ background: `${co.color || '#fff'}18`, color: co.color || '#fff' }}>{co.logoText || 'TR'}</div>
                  <div className="min-w-0 flex-1"><div className="text-xs font-bold text-white truncate">{co.shortName || co.name}</div><div className="text-[10px] text-slate-500 line-clamp-2">{co.description}</div></div>
                  {co.warpUrl && (<button onClick={() => window.open(co.warpUrl, '_blank')} className="w-8 h-8 rounded-md flex items-center justify-center bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white shrink-0"><ExternalLink size={14} /></button>)}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Environment / Ecology with toggle categories */}
            <DashCard title="Environment / Ecology" icon={<CloudRain size={14} />} accent="#10b981">
               <div className="space-y-2 relative">
                 {[
                   { id: 'fauna', label: 'สัตว์ (Fauna)', icon: <PawPrint size={14} /> },
                   { id: 'flora', label: 'พืช (Flora)', icon: <Leaf size={14} /> },
                   { id: 'terrain', label: 'พื้นที่ (Terrain)', icon: <Mountain size={14} /> },
                   { id: 'climate', label: 'สภาพอากาศ (Climate)', icon: <Thermometer size={14} /> }
                 ].map(cat => {
                   const items = getEcoEntities(brief.ecoIds || []).filter(e => e.category === cat.id);
                   if (items.length === 0) return null;
                   return (
                     <details key={cat.id} className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-all">
                      <summary className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-white/10 transition-colors list-none [&::-webkit-details-marker]:hidden">
                        <div className="flex items-center gap-2 text-emerald-400">{cat.icon} <span className="text-[10px] font-bold text-white uppercase">{cat.label}</span></div>
                        <span className="text-xs text-slate-500 opacity-50 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="bg-black/40 p-2 space-y-1.5 border-t border-white/5">
                        {items.map(e => (
                          <div key={e.id} onClick={() => setPreviewEco(e)} className="w-full flex items-center justify-between p-2 rounded-md hover:bg-white/10 text-left transition-colors cursor-pointer group/item relative overflow-hidden">
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover/item:bg-emerald-500/50 transition-colors" />
                             <div className="min-w-0 pr-1">
                               <div className="text-[10px] text-slate-200 font-bold truncate flex-wrap items-center gap-1.5">
                                 {e.name}
                                 {e.tags.slice(0, 1).map(t => {
                                   const tg = expandEcoTags([t])[0];
                                   return <span key={t} className={`ml-1 text-[8px] px-1 py-0.5 rounded border ${tg.color}`}>{tg.label}</span>
                                 })}
                               </div>
                             </div>
                             <ExternalLink size={12} className="text-slate-500 shrink-0 group-hover/item:text-emerald-400 transition-colors" />
                          </div>
                        ))}
                      </div>
                     </details>
                   );
                 })}
               </div>
            </DashCard>

            {/* Knowledge / Tips */}
             <DashCard title="Knowledge / Tips" icon={<Lightbulb size={14} />} accent={accent}>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {portal.knowledge?.map((k: any, i: number) => (
                  <li key={i}><div className="font-bold text-white text-[11px]">{k.title}</div><div className="text-[10px] text-slate-400">{k.content}</div></li>
                )) || <li className="text-slate-500">ยังไม่มีข้อมูลแนะนำ</li>}
              </ul>
            </DashCard>

            {/* Destination Panel */}
            <div className="rounded-xl border p-4 flex flex-col items-center justify-center bg-white/5" style={{ borderColor: toRgba(accent, 0.12) }}>
              {!confirmedTrip ? (<><MapPin size={24} style={{ color: accent }} className="mb-2 opacity-50" /><button onClick={() => setShowSearchPopup(true)} className="px-4 py-2 rounded-lg text-xs font-bold text-white shadow-md" style={{ background: accent }}>กำหนดแผนเที่ยว</button></>) : (
                <div className="w-full text-left">
                  <div className="text-[10px] font-bold text-slate-500 mb-1">{budgetLabels[confirmedTrip.budgetLevel]} BUDGET</div>
                  <div className="text-base font-black text-white truncate mb-3">{confirmedTrip.dest}</div>
                  {condition && (<div className="bg-black/30 p-2.5 rounded-lg border border-white/5 space-y-2">
                    <div className="flex flex-wrap gap-1">{condition.isHoliday && <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30">Holiday</span>}{condition.isRaining && <span className="text-[9px] bg-sky-500/20 text-sky-400 px-1.5 py-0.5 rounded border border-sky-500/30">Rain</span>}</div>
                    <div className="text-[10px] text-slate-300 leading-tight italic">{condition.advice}</div>
                  </div>)}
                  {costResult && (<div className="mt-4 flex items-center justify-between"><div className="text-lg font-black" style={{ color: accent }}>฿{costResult.perDay.toLocaleString()}</div><button onClick={() => navigate('/intelligence')} className="px-2 py-1 bg-white/10 rounded text-[9px] text-white">Ask AI</button></div>)}
                </div>
              )}
            </div>
          </div>

          {/* ROW 4: Danger Zones + Supply */}
          <div className="grid grid-cols-2 gap-3 pb-4">
             <DashCard title="จุดเสี่ยง/อันตราย" icon={<AlertTriangle size={14} />} accent="#ef4444">
              {portal.dangerZones?.length > 0 ? (
                 <ul className="space-y-1.5 text-xs">
                   {portal.dangerZones.map((d: any, i: number) => (
                     <li key={i} className="flex items-start gap-1.5">
                       <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${d.severity === 'high' ? 'bg-red-500' : d.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                       <div><span className="text-white font-bold">{d.label}</span><span className="text-slate-400"> — {d.note}</span></div>
                     </li>
                   ))}
                 </ul>
               ) : <p className="text-xs text-slate-500">ไม่มีข้อมูล</p>}
            </DashCard>
            
            <DashCard title="Supply / Facilities" icon={<Landmark size={14} />} accent={accent}>
              <div className="space-y-2 relative">
                {['bank', 'gas', 'other'].map(sType => {
                  const items = (portal.supply || []).filter((s: any) => sType === 'other' ? (s.type !== 'bank' && s.type !== 'gas') : s.type === sType);
                  if (items.length === 0) return null;
                  
                  const sIcon = sType === 'bank' ? <BanknoteIcon size={14} /> : sType === 'gas' ? <Fuel size={14} /> : <Bath size={14} />;
                  const labels: Record<string, string> = { bank: 'ธนาคาร / ATM', gas: 'ปั๊มน้ำมัน', other: 'ห้องน้ำ / จุดพัก' };
                  
                  return (
                    <details key={sType} className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-all">
                      <summary className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-white/10 transition-colors list-none [&::-webkit-details-marker]:hidden">
                        <div className="flex items-center gap-2">
                           <span className="text-slate-400 bg-black/20 p-1.5 rounded-md">{sIcon}</span>
                           <span className="text-xs font-bold text-white">{labels[sType] || 'อื่นๆ'}</span>
                        </div>
                        <span className="text-xs text-slate-500 opacity-50 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="bg-black/40 p-2 space-y-1.5 border-t border-white/5">
                        {items.map((s: any, i: number) => (
                          <div key={i} className="w-full flex items-center justify-between p-2 rounded-md hover:bg-white/10 text-left transition-colors group/item relative overflow-hidden">
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover/item:bg-white/20 transition-colors" />
                              <div className="text-[11px] text-slate-200 font-bold truncate pl-1">{s.label}</div>
                              <div className="text-[9px] text-slate-500 shrink-0 ml-2">{s.note}</div>
                          </div>
                        ))}
                      </div>
                    </details>
                  );
                })}
              </div>
            </DashCard>
          </div>
        </div>
      </div>

      {showSearchPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowSearchPopup(false)}><div className="w-full max-w-[400px] bg-[#0e1116] border border-white/10 rounded-2xl p-5 shadow-2xl" onClick={e => e.stopPropagation()}><h3 className="text-lg font-black text-white mb-4">จัดแผนเดินทาง</h3><div className="space-y-3">
          <input value={destText} onChange={e => setDestText(e.target.value)} placeholder="ไปที่ไหนดี?" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none" />
          <input type="date" value={tripDate} onChange={e => setTripDate(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" style={{ colorScheme: 'dark' }} />
          <div className="flex gap-2">{(['budget','mid', 'luxury'] as BudgetTier[]).map(t => (<button key={t} onClick={() => setTripBudgetLevel(t)} className={`flex-1 py-2 rounded-xl text-xs font-bold ${tripBudgetLevel === t ? 'text-black' : 'bg-white/5 text-slate-400'}`} style={tripBudgetLevel === t ? { background: accent } : {}}>{budgetLabels[t]}</button>))}</div>
          <button onClick={handleConfirmSearch} className="w-full py-3 rounded-xl font-black text-white mt-2" style={{ background: accent }}>ยืนยันแผน</button>
        </div></div></div>
      )}

      {previewEco && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setPreviewEco(null)}><div className="w-full max-w-[360px] bg-[#0e1116] border border-white/10 rounded-2xl p-5" onClick={e => e.stopPropagation()}>
           <div className="text-[10px] text-emerald-400 font-bold mb-1 uppercase tracking-widest">{previewEco.category}</div><h3 className="text-xl font-black text-white mb-3">{previewEco.name}</h3>
           <div className="text-sm text-slate-400 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">{previewEco.desc}</div>
           <button onClick={() => setPreviewEco(null)} className="w-full py-2.5 rounded-xl bg-white/5 text-xs text-white font-bold mt-4 hover:bg-white/10">ปิดหน้าต่าง</button>
        </div></div>
      )}

      <WeatherHistoryModal
        isOpen={showWeatherModal}
        onClose={() => setShowWeatherModal(false)}
        provinceName={provinceThaiNames[selectedProvinceName] || selectedProvinceName}
        provinces={weatherModalProvinces}
        regionId={activeRegion}
      />
    </div>
  );
}

function DashCard({ title, icon, accent, children }: { title: string; icon: React.ReactNode; accent: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-3 flex flex-col transition-all hover:bg-white/[0.02]" style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5"><span style={{ color: accent }}>{icon}</span><span className="text-[10px] font-bold text-white uppercase tracking-wider">{title}</span></div>
      <div className="flex-1 overflow-y-auto custom-scrollbar max-h-[140px]">{children}</div>
    </div>
  );
}
