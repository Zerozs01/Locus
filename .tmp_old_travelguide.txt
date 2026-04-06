import { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Navigation2, Search, ExternalLink, MapPin,
  CloudRain, Thermometer, Wind,
  Lightbulb, AlertTriangle, Landmark, Fuel, BanknoteIcon,
  Bath, MessageSquare, MapPinned, X,
  CalendarDays, CheckCircle2, PawPrint, Leaf, Mountain
} from 'lucide-react';
import { regionTheme, type RegionId } from '../../data/regionTheme';
import { toRgba } from '../../utils/color';
import { getProvincePortal, getCurrentSeason } from './data/portalData';
import { regionBriefs } from './data/regionBriefs';
import { calculateTripCost, budgetLabels, type BudgetTier } from './data/regionExpenses';
import { getTravelConditionForDate } from './data/calendarHelpers';
import { ThailandMap } from '../../components/ThailandMap';
import { generateProvinceData } from '../ProvinceTactical/data';
import { getEcoEntities, expandEcoTags, type EcoEntity } from './data/ecoDb';
import { WeatherHistoryModal } from '../../components/WeatherHistoryModal';

// Header Gradient Pair logic
const regionGradientPairs: Record<string, string> = {
  central: '#f59e0b', // main is orange, mix with yellow
  north: '#d946ef',   // main is purple, mix with fuchsia
  northeast: '#ef4444',// main is red, mix with light red
  west: '#84cc16',    // main is emerald, mix with lime
  east: '#a16207',    // main is yellow, mix with dark brown
  south: '#3b82f6',   // main is blue, mix with lighter blue
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
  'Phayao':'พะเยา','Phrae':'แพร่','Uttaradit':'อุตรดิตถ์',
  'Khon Kaen':'ขอนแก่น','Nakhon Ratchasima':'นครราชสีมา','Udon Thani':'อุดรธานี',
  'Ubon Ratchathani':'อุบลราชธานี','Buri Ram':'บุรีรัมย์','Surin':'สุรินทร์',
  'Kanchanaburi':'กาญจนบุรี','Ratchaburi':'ราชบุรี','Tak':'ตาก',
  'Phetchaburi':'เพชรบุรี','Prachuap Khiri Khan':'ประจวบคีรีขันธ์',
  'Chon Buri':'ชลบุรี','Rayong':'ระยอง','Chanthaburi':'จันทบุรี','Trat':'ตราด',
  'Phuket':'ภูเก็ต','Surat Thani':'สุราษฎร์ธานี','Songkhla':'สงขลา','Krabi':'กระบี่',
  'Nakhon Pathom':'นครปฐม','Nonthaburi':'นนทบุรี','Pathum Thani':'ปทุมธานี',
  'Samut Prakan':'สมุทรปราการ','Phra Nakhon Si Ayutthaya':'พระนครศรีอยุธยา',
  'Amnat Charoen':'อำนาจเจริญ','Bueng Kan':'บึงกาฬ','Chaiyaphum':'ชัยภูมิ',
  'Kalasin':'กาฬสินธุ์','Loei':'เลย','Maha Sarakham':'มหาสารคาม',
  'Mukdahan':'มุกดาหาร','Nakhon Phanom':'นครพนม','Nong Bua Lam Phu':'หนองบัวลำภู',
  'Nong Khai':'หนองคาย','Roi Et':'ร้อยเอ็ด','Sakon Nakhon':'สกลนคร',
  'Si Sa Ket':'ศรีสะเกษ','Yasothon':'ยโสธร',
  'Ang Thong':'อ่างทอง','Chai Nat':'ชัยนาท','Kamphaeng Phet':'กำแพงเพชร',
  'Lop Buri':'ลพบุรี','Nakhon Nayok':'นครนายก','Nakhon Sawan':'นครสวรรค์',
  'Phetchabun':'เพชรบูรณ์','Phichit':'พิจิตร','Phitsanulok':'พิษณุโลก',
  'Samut Sakhon':'สมุทรสาคร','Samut Songkhram':'สมุทรสงคราม',
  'Saraburi':'สระบุรี','Sing Buri':'สิงห์บุรี','Sukhothai':'สุโขทัย',
  'Suphan Buri':'สุพรรณบุรี','Uthai Thani':'อุทัยธานี',
  'Chachoengsao':'ฉะเชิงเทรา','Prachin Buri':'ปราจีนบุรี','Sa Kaeo':'สระแก้ว',
  'Chumphon':'ชุมพร','Nakhon Si Thammarat':'นครศรีธรรมราช','Narathiwat':'นราธิวาส',
  'Pattani':'ปัตตานี','Phangnga':'พังงา','Phatthalung':'พัทลุง','Ranong':'ระนอง',
  'Satun':'สตูล','Trang':'ตรัง','Yala':'ยะลา',
};

// Flatten to easy text array for search suggestions
const allProvinceThaiNamesArray = Object.entries(provinceThaiNames).map(([en, th]) => ({ en, th }));

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

  // Search popup
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [destText, setDestText] = useState('');
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  
  // Replace trip days with date picking
  const defaultDateStr = new Date().toISOString().split('T')[0];
  const [tripDate, setTripDate] = useState(defaultDateStr);
  const [tripTime, setTripTime] = useState('12:00'); // Time preference
  const [tripBudgetLevel, setTripBudgetLevel] = useState<BudgetTier>('mid');
  const [tripBudgetAmount, setTripBudgetAmount] = useState<string>(''); // Custom budget
  const [confirmedTrip, setConfirmedTrip] = useState<{ dest: string; budgetLevel: BudgetTier; budgetAmount: number; date: string; time: string } | null>(null);

  // AQI Sync logic
  const [syncedAqiMap, setSyncedAqiMap] = useState<Record<string, number>>({});
  const [isSyncingAqi, setIsSyncingAqi] = useState(false);

  useEffect(() => {
    import("../../utils/csvDb").then(({ getRecords }) => {
      const allRecs = getRecords();
      const todayStr = new Date().toISOString().split('T')[0];
      const aqiMap: Record<string, number> = {};
      allRecs.forEach(r => {
        if (r.date === todayStr && !isNaN(r.aqi)) {
          aqiMap[r.id] = r.aqi;
        }
      });
      setSyncedAqiMap(prev => ({ ...prev, ...aqiMap }));
    }).catch(console.warn);
  }, []);
  
  // Eco Preview Modal
  const [previewEco, setPreviewEco] = useState<EcoEntity | null>(null);
  
  // Weather Modal
  const [showWeatherModal, setShowWeatherModal] = useState(false);

  const portal = useMemo(() => {
    const pName = displayName.toLowerCase();
    return getProvincePortal(pName === 'กรุงเทพมหานคร' ? 'bangkok' : pName);
  }, [displayName]);

  // Origin Input
  const [originText, setOriginText] = useState('');

  // Destination Suggestions (Regex match from provinces and tactical data)
  const provinceTacticalData = useMemo(() => {
    try {
      const p = { id: selectedProvinceName, name: selectedProvinceName };
      const r = { id: activeRegion };
      return generateProvinceData(p as any, r as any);
    } catch(e) { return null; }
  }, [selectedProvinceName, activeRegion]);

  const placeSuggestions = useMemo(() => {
    const results: { label: string, desc: string }[] = [];
    allProvinceThaiNamesArray.forEach(p => results.push({ label: p.th, desc: p.en }));
    
    if (provinceTacticalData) {
      if (provinceTacticalData.attractions) provinceTacticalData.attractions.forEach(a => results.push({ label: a.name, desc: `จุดท่องเที่ยวใน ${displayName}` }));
      if (provinceTacticalData.malls) provinceTacticalData.malls.forEach(m => results.push({ label: m.name, desc: `ห้างสรรพสินค้าใน ${displayName}` }));
      if (provinceTacticalData.gasStations) provinceTacticalData.gasStations.forEach(g => results.push({ label: g.name, desc: `ปั๊มน้ำมันใน ${displayName}` }));
      if (provinceTacticalData.stayAreas) provinceTacticalData.stayAreas.forEach(sa => results.push({ label: sa.name, desc: `ย่านที่พักใน ${displayName}` }));
      if (provinceTacticalData.pharmacies) provinceTacticalData.pharmacies.forEach(ph => results.push({ label: ph.name, desc: `ร้านขายยาใน ${displayName}` }));
      if (provinceTacticalData.hospitals) provinceTacticalData.hospitals.forEach(h => results.push({ label: h.name, desc: `โรงพยาบาลใน ${displayName}` }));
      if (provinceTacticalData.banks) provinceTacticalData.banks.forEach(b => results.push({ label: b.name, desc: `ธนาคารใน ${displayName}` }));
    }

    portal.supply.forEach(s => results.push({ label: s.label, desc: `สถานที่ใน ${displayName}` }));
    portal.transport.tabs.forEach(t => {
      portal.transport.companies[t.id]?.forEach(c => {
         if (c.shortName) results.push({ label: c.shortName, desc: `จุดเดินทางใน ${displayName}` });
         if (c.name) results.push({ label: c.name, desc: `จุดเดินทางใน ${displayName}` });
      });
    });
    
    // Deduplicate logic by label
    const uniqueMap = new Map();
    results.forEach(val => uniqueMap.set(val.label, val));
    return Array.from(uniqueMap.values());
  }, [provinceTacticalData, portal, displayName]);

  const destSuggestions = useMemo(() => {
    if (!destText || destText.length < 2) return [];
    try {
      const regex = new RegExp(destText, 'i');
      return placeSuggestions.filter(s => regex.test(s.label)).slice(0, 8);
    } catch(e) { return []; } // handle invalid regex input gracefully
  }, [destText, placeSuggestions]);

  // Transport tabs logic
  const transportTabs = portal.transport.tabs;
  const currentTab = activeTransportTab || transportTabs[0]?.id || '';
  const currentTabCompanies = currentTab === '__others'
    ? (portal.transport.others || [])
    : (portal.transport.companies[currentTab] || []);

  const currentProvinces = provincesByRegion[activeRegion] || [];

  // ====== Handlers ======
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

  const handleProvinceDropdown = (provName: string) => {
    setSelectedProvinceName(provName);
    setActiveTransportTab('');
    setConfirmedTrip(null);
  };

  const warp = (url: string) => {
    if (!url) return;
    if ((window as any).api?.shell?.openExternal) {
      (window as any).api.shell.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const handleConfirmSearch = () => {
    if (!destText) return;
    setConfirmedTrip({ dest: destText, budgetLevel: tripBudgetLevel, budgetAmount: parseInt(tripBudgetAmount) || 0, date: tripDate, time: tripTime });
    setShowSearchPopup(false);
  };

  const syncAQI = async () => {
    try {
      setIsSyncingAqi(true);
      const conf = (window as any).api?.config?.get ? await (window as any).api.config.get() : {};
      const provider = conf.aqi_provider || 'openweather';
      const key = provider === 'aqicn' ? conf.aqicn : conf.openweather;
      
      if (!key) {
        alert(provider === 'aqicn' ? 'กรุณาตั้งค่า AQICN API Token ใน Settings' : 'กรุณาตั้งค่า OpenWeather API Key ใน Settings ก่อน');
        setIsSyncingAqi(false);
        return;
      }

      const todayStr = new Date().toISOString().split('T')[0];
      const allProvs = currentProvinces; // all provinces in this region
      console.log(`[TravelGuide AQI] Syncing ${allProvs.length} provinces for ${activeRegion} using ${provider}...`);

      for (const prov of allProvs) {
        try {
          const cleanName = (provinceThaiNames[prov] || prov).replace(' Metropolis', '').replace(' (Pattaya)', '').trim();
          console.log(`[TravelGuide AQI] Fetching AQI for ${cleanName} (${prov})...`);

          let aqiVal = 50;
          let success = false;

          if (provider === 'aqicn') {
            const res = await fetch(`https://api.waqi.info/feed/${encodeURIComponent(cleanName)}/?token=${key}`);
            const data = await res.json();
            if (data.status === 'ok' && data.data?.aqi && !isNaN(Number(data.data.aqi))) {
              aqiVal = Number(data.data.aqi);
              success = true;
            }
          } else {
            // 1. Geocode
            const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cleanName)},th&limit=1&appid=${key}`);
            const geoData = await geoRes.json();
            let lat = 13.75, lon = 100.5;
            if (geoData && geoData.length > 0) {
              lat = geoData[0].lat;
              lon = geoData[0].lon;
            }

            // 2. Air Pollution
            const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`);
            const data = await res.json();

            if (data && data.list && data.list[0]) {
              const pm25 = data.list[0].components.pm2_5;
              if (pm25 != null) {
                if (pm25 <= 12.0) aqiVal = Math.round((50 / 12) * pm25);
                else if (pm25 <= 35.4) aqiVal = Math.round(((49) / 23.4) * (pm25 - 12) + 51);
                else if (pm25 <= 55.4) aqiVal = Math.round(((49) / 20) * (pm25 - 35.5) + 101);
                else if (pm25 <= 150.4) aqiVal = Math.round(((49) / 95) * (pm25 - 55.5) + 151);
                else if (pm25 <= 250.4) aqiVal = Math.round(((99) / 100) * (pm25 - 150.5) + 201);
                else aqiVal = Math.round(((199) / 249.5) * (pm25 - 250.5) + 301);
              }
              success = true;
            }
          }

          if (success) {
            console.log(`[TravelGuide AQI] ${prov} => AQI=${aqiVal}`);

            // Update in-memory map for this page
            setSyncedAqiMap(prev => ({ ...prev, [prov]: aqiVal }));

            // Also persist to csvDb so ThaiMap AQIModal can read the same data
            const { getRecords, saveRecord } = await import("../../utils/csvDb");
            const allRecs = getRecords();
            const existingRec = allRecs.find((r: any) => r.id === prov && r.date === todayStr);
            saveRecord({
              id: prov,
              date: todayStr,
              temperature: existingRec ? existingRec.temperature : 30,
              aqi: aqiVal
            });
          }
        } catch (e) {
          console.warn(`[TravelGuide AQI] Failed for ${prov}:`, e);
        }
        // Small delay to respect rate limit
        await new Promise(r => setTimeout(r, provider === 'aqicn' ? 1000 : 250));
      }
      console.log('[TravelGuide AQI] Sync complete for all provinces.');
    } catch (e) {
      console.error('[TravelGuide AQI] Top-level sync error:', e);
    } finally {
      setIsSyncingAqi(false);
    }
  };

  // Conditions derived from confirmed trip
  const condition = confirmedTrip ? getTravelConditionForDate(confirmedTrip.date, activeRegion) : null;
  const costResult = confirmedTrip ? calculateTripCost(activeRegion as RegionId, confirmedTrip.budgetLevel, 1, 1, 0) : null;

  // Flatten companies to find suggestions
  const allCompanies = useMemo(() => {
    const list: any[] = [];
    Object.values(portal.transport.companies).forEach(arr => list.push(...arr));
    if (portal.transport.others) list.push(...portal.transport.others);
    return list;
  }, [portal]);

  if (!region) return null;

  return (
    <div className="h-full w-full flex-1 min-w-0 flex flex-col bg-[#020305] overflow-hidden relative">

      {/* ===== HEADER ===== */}
      <div className="shrink-0 flex items-center pr-[120px] pl-4 py-3 gap-3"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accentSecondary} 80%, #000 100%)` }}>
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-black/30 backdrop-blur flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all shrink-0">
          <ArrowLeft size={18} />
        </button>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/15 backdrop-blur shadow-inner">
          <Navigation2 size={20} className="text-white drop-shadow-md" />
        </div>
        <h1 className="text-lg font-black text-white drop-shadow-md tracking-tight mr-1 shrink-0">Travel Guide</h1>

        {/* Season - Moved Left! */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur border border-white/10 shrink-0">
          <CloudRain size={14} className="text-white/70" />
          <div className="text-xs"><div className="font-bold text-white leading-tight">{season.label}</div><div className="text-white/60 text-[9px]">{season.range}</div></div>
        </div>

        {/* Region dropdown */}
        <select value={activeRegion} onChange={(e) => switchToRegion(e.target.value)}
          className="bg-black/40 backdrop-blur border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none min-w-[120px] cursor-pointer ml-1">
          {Object.entries(regionTheme).map(([id, r]) => (
            <option key={id} value={id} className="bg-[#0f1115] text-white">{r.label}</option>
          ))}
        </select>

        {/* Province dropdown */}
        <select value={selectedProvinceName} onChange={(e) => handleProvinceDropdown(e.target.value)}
          className="bg-black/40 backdrop-blur border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none min-w-[150px] cursor-pointer">
          {currentProvinces.map(p => (
             <option key={p} value={p} className="bg-[#0f1115] text-white">{provinceThaiNames[p] || p}</option>
          ))}
        </select>

        {/* Search */}
        <button onClick={() => setShowSearchPopup(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-sm text-white hover:bg-white/20 transition-all flex-1 max-w-[260px] justify-start shadow-sm">
          <Search size={16} />
          <span className="truncate">{confirmedTrip?.dest || 'ค้นหาสถานที่ / คำนวณเที่ยว...'}</span>
        </button>
      </div>

      {/* ===== BODY ===== */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT: MAP */}
        <div className="w-[300px] shrink-0 border-r flex flex-col relative" style={{ borderColor: toRgba(accent, 0.1), background: '#050608' }}>
          <div className="flex-1 relative overflow-hidden">
            <ThailandMap
              activeId={activeRegion}
              onSelectRegion={handleMapSelectRegion}
              viewMode="province"
              selectedProvince={{ name: selectedProvinceName, id: selectedProvinceName } as any}
              onSelectProvince={() => {}}
              onSelectProvinceByName={handleMapSelectProvince}
            />
            {/* OVERLAY AQI & TEMP on bottom left inside map */}
            <div className="absolute bottom-4 left-4 z-10 space-y-1.5 pointer-events-none w-[260px]">
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border shadow-xl pointer-events-auto" style={{ borderColor: toRgba(accent, 0.2) }}>
                <div className="flex items-center gap-2">
                  <Wind size={13} className="text-cyan-400 shrink-0" />
                  <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">AQI:</span>
                  <span className={`text-sm font-black ${(syncedAqiMap[selectedProvinceName] ?? brief.avgAqi) <= 50 ? 'text-emerald-400' : (syncedAqiMap[selectedProvinceName] ?? brief.avgAqi) <= 100 ? 'text-amber-400' : 'text-red-400'}`}>
                    {syncedAqiMap[selectedProvinceName] ?? brief.avgAqi}
                  </span>
                </div>
                <button onClick={syncAQI} disabled={isSyncingAqi} className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-white transition-colors uppercase font-bold border border-white/5 shadow-inner">
                  {isSyncingAqi ? '...' : 'Sync'}
                </button>
              </div>
              <button 
                onClick={() => setShowWeatherModal(true)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border shadow-xl pointer-events-auto hover:bg-black/90 transition-all cursor-pointer group" 
                style={{ borderColor: toRgba(accent, 0.2) }}
                title="ดูประวัติและพยากรณ์อากาศ"
              >
                <div className="flex items-center gap-2">
                  <Thermometer size={13} className="text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] text-slate-300 font-bold truncate">{brief.climate}</span>
                </div>
                <div className="text-[9px] text-amber-500/80 px-1.5 py-0.5 rounded border border-amber-500/20 bg-amber-500/10">7-Day</div>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: DASHBOARD */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
          
          {/* ROW 1: Province + Transport Tabs + Cards */}
          <div className="rounded-xl border p-4" style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-black text-white">{displayName}</h2>
              <div className="flex gap-1 flex-wrap">
                {transportTabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTransportTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentTab === tab.id ? 'text-black shadow-md' : 'text-slate-400 bg-white/5 hover:bg-white/10'}`}
                    style={currentTab === tab.id ? { background: accent } : {}}>{tab.label}</button>
                ))}
                {portal.transport.others && portal.transport.others.length > 0 && (
                  <button onClick={() => setActiveTransportTab('__others')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentTab === '__others' ? 'text-black shadow-md' : 'text-slate-400 bg-white/5 hover:bg-white/10'}`}
                    style={currentTab === '__others' ? { background: accent } : {}}>อื่นๆที่เกี่ยวข้อง</button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {currentTabCompanies.map((co, i) => (
                <div key={i} className="rounded-lg border p-3 flex items-center gap-2.5 group hover:border-opacity-80 transition-all"
                  style={{ borderColor: `${co.color}25`, background: `${co.color}08` }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black shrink-0" style={{ background: `${co.color}18`, color: co.color }}>
                    {co.logoText}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">{co.shortName}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-2">{co.description}</div>
                  </div>
                  {co.warpUrl && (
                    <button onClick={() => warp(co.warpUrl)} className="w-8 h-8 rounded-md flex items-center justify-center bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-all shrink-0" title={`เปิดเว็บ ${co.shortName}`}>
                      <ExternalLink size={14} />
                    </button>
                  )}
                </div>
              ))}
              {currentTabCompanies.length === 0 && <div className="col-span-full text-center py-6 text-slate-500 text-sm">ไม่มีข้อมูลในหมวดนี้</div>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Environment */}
            {/* Environment / Ecology DB */}
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

            {/* Knowledge */}
             <DashCard title="Knowledge / Tips" icon={<Lightbulb size={14} />} accent={accent}>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {portal.knowledge.map((k, i) => (
                  <li key={i}><div className="font-bold text-white text-[11px]">{k.title}</div><div className="text-[10px] text-slate-400">{k.content}</div></li>
                ))}
              </ul>
            </DashCard>

            {/* Destination Panel (New layout based on date condition) */}
            <div className="rounded-xl border p-4 flex flex-col items-center justify-center relative overflow-hidden" 
                 style={{ borderColor: toRgba(accent, 0.12), background: confirmedTrip ? toRgba(accent, 0.05) : 'rgba(15,17,21,0.8)' }}>
              
              {!confirmedTrip ? (
                <>
                  <div className="w-12 h-12 rounded-full border-2 border-dashed flex items-center justify-center mb-3 text-slate-400 group-hover:text-white transition-colors cursor-pointer"
                       style={{ borderColor: toRgba(accent, 0.3) }} onClick={() => setShowSearchPopup(true)}>
                    <MapPin size={20} style={{ color: accent }} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-300 mb-1">ยังไม่ระบุแผนเดินทาง</h3>
                  <p className="text-[10px] text-slate-500 text-center px-4">ค้นหาสถานที่และระบุวันที่ด้านบน <br/>เพื่อประเมินความเสี่ยงและพาหนะที่เหมาะสม</p>
                  <button onClick={() => setShowSearchPopup(true)} className="mt-4 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all shadow-md" style={{ background: accent }}>กำหนดแผนเที่ยว</button>
                </>
              ) : (
                <div className="w-full text-left self-start relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-md flex items-center justify-center bg-white/10"><MapPin size={12} style={{ color: accent }}/></span>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{budgetLabels[confirmedTrip.budgetLevel]} BUDGET PLAN</div>
                      <div className="text-base font-black text-white leading-tight truncate px-1">{confirmedTrip.dest}</div>
                    </div>
                  </div>
                  
                  {condition && (
                    <div className="space-y-3 mt-4 bg-black/20 p-3 rounded-lg border border-white/5">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="flex items-center gap-1.5 text-xs text-white">
                          <CalendarDays size={13} style={{ color: accent }}/> {new Date(confirmedTrip.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })} <span className="text-slate-400">@ {confirmedTrip.time} น.</span>
                        </div>
                        {condition.isHoliday && <div className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold border border-red-500/30">{condition.holidayName}</div>}
                        {condition.isRaining && <div className="text-[9px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-bold border border-sky-500/30">โอกาสมีฝน</div>}
                      </div>
                      
                      <div>
                        {condition.trafficRisk === 'high' ? (
                          <div className="text-[11px] text-amber-400 flex items-start gap-1"><AlertTriangle size={12} className="shrink-0 mt-0.5" /> <span>{condition.advice}</span></div>
                        ) : (
                          <div className="text-[11px] text-emerald-400 flex items-start gap-1"><CheckCircle2 size={12} className="shrink-0 mt-0.5" /> <span>{condition.advice}</span></div>
                        )}
                      </div>

                      <div className="pt-2">
                        <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">พาหนะแนะนำ</div>
                        <div className="flex flex-wrap gap-1">
                          {condition.suggestedTransports.map(tName => {
                             const foundIcon = allCompanies.find(c => c.shortName.toLowerCase().includes(tName.toLowerCase()) || (c.name && c.name.toLowerCase().includes(tName.toLowerCase())));
                             return (
                               <span key={tName} className="px-2 py-1 rounded bg-white/10 text-[10px] font-bold border" style={{ borderColor: foundIcon?.color || '#ffffff33', color: foundIcon?.color || '#fff' }}>
                                 {tName}
                               </span>
                             )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {costResult && (
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <div className="text-[9px] text-slate-500">ค่าครองชีพ/วัน (ประเมิน vs งบที่มี)</div>
                        <div className="text-lg font-black" style={{ color: accent }}>฿{costResult.perDay.toLocaleString()} <span className="text-xs text-slate-400">/ ฿{confirmedTrip.budgetAmount > 0 ? confirmedTrip.budgetAmount.toLocaleString() : '-'}</span></div>
                      </div>
                      <button onClick={() => navigate('/intelligence')} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-bold text-white transition-all bg-white/10 hover:bg-white/20"><MessageSquare size={12} /> ถาม AI</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

           {/* ROW 4: Environment Database, Supply */}
          <div className="grid grid-cols-2 gap-3 pb-4">
             <DashCard title="จุดเสี่ยง/อันตราย" icon={<AlertTriangle size={14} />} accent="#ef4444">
              {portal.dangerZones.length > 0 ? (
                 <ul className="space-y-1.5 text-xs">
                   {portal.dangerZones.map((d, i) => (
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
                  const items = portal.supply.filter(s => sType === 'other' ? (s.type !== 'bank' && s.type !== 'gas') : s.type === sType);
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
                        {items.map((s, i) => (
                          <button key={i} onClick={() => navigate(`/province/${activeRegion}/${selectedProvinceName}`)}
                            className="w-full flex items-center justify-between p-2 rounded-md hover:bg-white/10 text-left transition-colors group/item relative overflow-hidden"
                            title={`Warp ไปยัง Province Detail เพื่อดูตำแหน่ง`}>
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover/item:bg-white/20 transition-colors" />
                              <div className="text-[11px] text-slate-200 font-bold truncate pl-1">{s.label}</div>
                              <ExternalLink size={12} className="text-slate-500 shrink-0 group-hover/item:text-white transition-colors" />
                          </button>
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

      {/* ===== SEARCH POPUP ===== */}
      {showSearchPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowSearchPopup(false)}>
          <div className="w-full max-w-[450px] rounded-2xl border p-5 space-y-4 shadow-2xl" style={{ borderColor: toRgba(accent, 0.2), background: '#0e1116' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white flex items-center gap-2"><MapPinned size={18} style={{ color: accent }} /> ระบุแผนการเดินทาง</h3>
              <button onClick={() => setShowSearchPopup(false)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white"><X size={14} /></button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 relative">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between font-bold">
                  <span>ต้นทาง / จุดเริ่มต้น</span>
                  <button onClick={() => setOriginText('Current Location')} className="text-[9px] text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors">
                    ใช้ตำแหน่งปัจจุบัน
                  </button>
                </label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" value={originText} onChange={e => setOriginText(e.target.value)}
                    placeholder="พิมพ์จุดเริ่มต้น..." className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5 block font-bold">ชื่อสถานที่ / ปลายทาง</label>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" value={destText} onChange={e => { setDestText(e.target.value); setShowDestSuggestions(true); }}
                    onFocus={() => setShowDestSuggestions(true)}
                    placeholder="พิมพ์ชื่อสถานที่, ห้าง, วัด..." className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-colors" />
                </div>
                
                {/* Regex Suggestions Dropdown */}
                {showDestSuggestions && destSuggestions.length > 0 && (
                  <div className="absolute top-full right-0 mt-1 w-full sm:w-[210px] bg-[#151921] border border-white/10 rounded-lg shadow-xl overflow-hidden z-20 max-h-48 overflow-y-auto custom-scrollbar">
                    {destSuggestions.map((s, idx) => (
                      <button key={idx} onClick={() => { setDestText(s.label); setShowDestSuggestions(false); }}
                        className="w-full text-left px-3 py-2.5 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-colors border-b border-white/5 last:border-0 flex flex-col gap-0.5">
                         <div className="flex items-center gap-2"><MapPin size={12} className="text-slate-500 shrink-0"/> <span className="font-bold truncate text-white">{s.label}</span></div>
                         <div className="text-[9px] text-slate-500 truncate pl-5">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5 block font-bold">วันที่เดินทาง</label>
                  <input type="date" value={tripDate} onChange={e => setTripDate(e.target.value)} min={defaultDateStr}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                    style={{ colorScheme: 'dark' }} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5 block font-bold">เวลาที่ต้องการถึง</label>
                  <input type="time" value={tripTime} onChange={e => setTripTime(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                    style={{ colorScheme: 'dark' }} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 block font-bold">กรอกงบทั้งหมด (บาท)</label>
                  <div className="relative">
                    <BanknoteIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="number" value={tripBudgetAmount} onChange={e => setTripBudgetAmount(e.target.value)} placeholder="เช่น 5000"
                      className="w-full bg-black/50 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white focus:outline-none focus:border-white/30" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5 block font-bold">ระดับงบต่อวัน</label>
                  <div className="flex rounded-lg border border-white/10 overflow-hidden bg-black/50 p-0.5">
                    {(['budget','mid', 'luxury'] as BudgetTier[]).map(t => (
                      <button key={t} onClick={() => setTripBudgetLevel(t)}
                        className={`flex-1 px-1 py-1 text-[11px] font-bold rounded-md transition-all ${tripBudgetLevel === t ? 'text-black shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        style={tripBudgetLevel === t ? { background: accent } : {}}>{budgetLabels[t] || 'สูง'}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleConfirmSearch} disabled={!destText}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all mt-2 ${destText ? 'text-white hover:brightness-110 shadow-lg' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
              style={destText ? { background: accent } : {}}>ประเมินแผนเดินทาง</button>
          </div>
        </div>
      )}

      {/* Eco Preview Modal */}
      {previewEco && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setPreviewEco(null)}>
          <div className="w-full max-w-[400px] bg-[#0e1116] border border-white/10 rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-white/5 flex items-start justify-between bg-black/20">
               <div>
                 <div className="text-[10px] uppercase tracking-widest text-emerald-500 mb-1 font-bold">{previewEco.category}</div>
                 <h3 className="text-lg font-black text-white">{previewEco.name}</h3>
               </div>
               <button onClick={() => setPreviewEco(null)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white"><X size={14} /></button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                {expandEcoTags(previewEco.tags).map(tg => (
                  <span key={tg.id} className={`text-xs px-2 py-1 rounded-full border ${tg.color} font-bold`}>{tg.label}</span>
                ))}
                {previewEco.season && <span className="text-xs px-2 py-1 rounded-full border border-slate-500/30 text-slate-300 bg-slate-500/20 font-bold">{previewEco.season}</span>}
              </div>
              <div className="text-sm text-slate-300 leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">
                {previewEco.desc}
              </div>
            </div>
          </div>
        </div>
      )}

      <WeatherHistoryModal 
        isOpen={showWeatherModal} 
        onClose={() => setShowWeatherModal(false)}
        provinceName={provinceThaiNames[selectedProvinceName] || selectedProvinceName}
        provinces={currentProvinces.map(p => ({id: p, name: provinceThaiNames[p] || p}))}
        regionId={activeRegion}
      />
    </div>
  );
}

function DashCard({ title, icon, accent, children }: { title: string; icon: React.ReactNode; accent: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-3 flex flex-col" style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5"><span style={{ color: accent }}>{icon}</span><span className="text-xs font-bold text-white uppercase tracking-wider">{title}</span></div>
      <div className="flex-1 overflow-y-auto custom-scrollbar max-h-[160px]">{children}</div>
    </div>
  );
}
