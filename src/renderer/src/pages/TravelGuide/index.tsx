import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Navigation2, Search, ExternalLink, MapPin,
  CloudRain, Thermometer,
  Lightbulb, AlertTriangle, Landmark, Fuel, BanknoteIcon,
  Bath, PawPrint, Leaf, Mountain, LocateFixed
} from 'lucide-react';
import { regionTheme, type RegionId } from '../../data/regionTheme';
import { toRgba } from '../../utils/color';
import { getProvincePortal, getCurrentSeason } from './data/portalData';
import { regionBriefs } from './data/regionBriefs';
import { calculateTripCost, budgetLabels, type BudgetTier } from './data/regionExpenses';
import { getTravelConditionForDate } from './data/calendarHelpers';
import { ThailandMap } from '../../components/ThailandMap';
import { getRecords } from '../../utils/csvDb';
import { provinceCoordinates } from '../../components/ProvinceMap';

import { getEcoEntities, expandEcoTags, type EcoEntity, type EcoTag } from './data/ecoDb';
import { WeatherHistoryModal } from '../../components/WeatherHistoryModal';

const WEATHER_AQI_UPDATED_EVENT = 'locus:weather-aqi-updated';

type TripPlan = {
  origin: string;
  dest: string;
  budgetLevel: BudgetTier;
  date: string;
};

type SupplyType = 'bank' | 'gas' | 'other';

const transportTypeOrder = ['rail', 'bus', 'van', 'plane', 'boat', 'songthaew', 'tuk_tuk', 'bike', 'other'];
const transportTypeLabels: Record<string, string> = {
  rail: 'รถไฟ',
  bus: 'รถเมล์/บขส.',
  van: 'รถตู้',
  plane: 'เครื่องบิน',
  boat: 'เรือ',
  songthaew: 'สองแถว',
  tuk_tuk: 'ตุ๊กตุ๊ก',
  bike: 'มอเตอร์ไซค์',
  other: 'อื่นๆ',
};

const normalizeTransportType = (rawType: string) => {
  const type = (rawType || '').toLowerCase();
  if (type === 'train') return 'rail';
  if (type === 'coach') return 'bus';
  if (type === 'ferry') return 'boat';
  return transportTypeLabels[type] ? type : 'other';
};

const inferEcoCategoryFromId = (id: string): 'fauna' | 'flora' | 'terrain' | 'climate' => {
  if (id.startsWith('fl_')) return 'flora';
  if (id.startsWith('t_')) return 'terrain';
  if (id.startsWith('c_')) return 'climate';
  return 'fauna';
};

const prettifyEcoId = (id: string) => id.replace(/^[a-z]+_/, '').replace(/_/g, ' ');

const allowedEcoTags: EcoTag[] = ['danger', 'edible', 'medicinal', 'common', 'rare', 'protected', 'seasonal', 'extreme'];
const allowedEcoTagSet = new Set<EcoTag>(allowedEcoTags);

const sanitizeEcoTags = (tags: unknown): EcoTag[] => {
  if (!Array.isArray(tags)) return ['common'];
  const normalized = tags
    .map((tag) => String(tag).trim().toLowerCase())
    .filter((tag): tag is EcoTag => allowedEcoTagSet.has(tag as EcoTag));
  return normalized.length > 0 ? normalized : ['common'];
};

// Header Gradient Pair logic
const regionGradientPairs: Record<string, string> = {
  central: '#f59e0b', north: '#d946ef', northeast: '#ef4444', 
  west: '#84cc16', east: '#a16207', south: '#3b82f6',
};

const transportContrastPalettesByRegion: Record<string, string[]> = {
  north: ['#14532d', '#15803d', '#65a30d', '#facc15'],
  northeast: ['#1e3a8a', '#1d4ed8', '#0ea5e9', '#67e8f9'],
  central: ['#1e3a8a', '#1d4ed8', '#0ea5e9', '#22c55e'],
  west: ['#7f1d1d', '#dc2626', '#f97316', '#facc15'],
  east: ['#1e3a8a', '#1d4ed8', '#0ea5e9', '#22c55e'],
  south: ['#7c2d12', '#ea580c', '#f59e0b', '#fde047'],
};

const transportIntensityCycle = [0.62, 0.5, 0.4, 0.3];
const getTransportIntensity = (index: number) => transportIntensityCycle[index % transportIntensityCycle.length];

const knowledgeToneScaleByRegion: Record<RegionId, [string, string, string, string]> = {
  north: ['text-violet-200', 'text-violet-300', 'text-violet-400', 'text-violet-500'],
  northeast: ['text-red-200', 'text-red-300', 'text-red-400', 'text-red-500'],
  central: ['text-orange-200', 'text-orange-300', 'text-orange-400', 'text-orange-500'],
  west: ['text-emerald-200', 'text-emerald-300', 'text-emerald-400', 'text-emerald-500'],
  east: ['text-yellow-200', 'text-yellow-300', 'text-yellow-400', 'text-yellow-500'],
  south: ['text-blue-200', 'text-blue-300', 'text-blue-400', 'text-blue-500'],
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
  const [originText, setOriginText] = useState('');
  const [destText, setDestText] = useState('');
  const [tripDate, setTripDate] = useState(new Date().toISOString().split('T')[0]);
  const [tripBudgetLevel, setTripBudgetLevel] = useState<BudgetTier>('mid');
  const [confirmedTrip, setConfirmedTrip] = useState<TripPlan | null>(null);
  const [activeSupplyType, setActiveSupplyType] = useState<SupplyType>('bank');
  const [originSearchOptions, setOriginSearchOptions] = useState<string[]>([]);
  const [destSearchOptions, setDestSearchOptions] = useState<string[]>([]);
  const [isLocatingOrigin, setIsLocatingOrigin] = useState(false);
  const [originLocationError, setOriginLocationError] = useState('');
  const [originLocationHint, setOriginLocationHint] = useState('');

  const [syncedAqiMap, setSyncedAqiMap] = useState<Record<string, number>>({});
  const [syncedTempMap, setSyncedTempMap] = useState<Record<string, number>>({});
  const [provinceIndex, setProvinceIndex] = useState<Array<{ id: string; name: string }>>([]);

  const normalizeKey = useCallback((value: string) => value.toLowerCase().replace(/[^a-z0-9_-]/g, ''), []);

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
    const syncFromDb = async () => {
      const api = (window as any).api;
      if (!api?.db?.getWeatherAqi) {
        // Fallback: try legacy csvDb if IPC not available
        const rows = getRecords();
        if (!Array.isArray(rows) || rows.length === 0) return;
        const aqiMap: Record<string, number> = {};
        const tempMap: Record<string, number> = {};
        rows.forEach((r) => {
          if (!r) return;
          const nid = normalizeKey(r.id);
          if (typeof r.aqi === 'number' && Number.isFinite(r.aqi)) aqiMap[nid] = r.aqi;
          if (typeof r.temperature === 'number' && Number.isFinite(r.temperature)) tempMap[nid] = r.temperature;
        });
        if (Object.keys(aqiMap).length > 0) setSyncedAqiMap(aqiMap);
        if (Object.keys(tempMap).length > 0) setSyncedTempMap(tempMap);
        return;
      }

      try {
        // Fetch ALL weather records from SQLite (no province filter = get everything)
        // console.log('[TravelGuide] Fetching weather from SQLite...');
        const dbRows: { provinceId: string; date: string; temperature: number; aqi: number }[] =
          await api.db.getWeatherAqi();

        // console.log('[TravelGuide] DB Rows fetched:', dbRows?.length || 0);
        if (!Array.isArray(dbRows) || dbRows.length === 0) return;

        // Group by provinceId, pick latest date per province
        const groupedByProvince = new Map<string, { date: string; aqi: number; temperature: number }[]>();
        dbRows.forEach((r) => {
          const nid = normalizeKey(r.provinceId);
          const list = groupedByProvince.get(nid) || [];
          list.push({ date: r.date, aqi: r.aqi, temperature: r.temperature });
          groupedByProvince.set(nid, list);
        });

        const aqiMap: Record<string, number> = {};
        const tempMap: Record<string, number> = {};
        groupedByProvince.forEach((list, id) => {
          const sorted = [...list].sort((a, b) => b.date.localeCompare(a.date));
          const latestTemp = sorted.find((v) => typeof v.temperature === 'number' && Number.isFinite(v.temperature));
          const preferredAqi = sorted.find((v) => typeof v.aqi === 'number' && Number.isFinite(v.aqi) && v.aqi !== 50)
            || sorted.find((v) => typeof v.aqi === 'number' && Number.isFinite(v.aqi));

          if (preferredAqi) aqiMap[id] = preferredAqi.aqi;
          if (latestTemp) tempMap[id] = latestTemp.temperature;
        });

        // console.log('[TravelGuide] aqiMap constructed:', aqiMap);
        if (Object.keys(aqiMap).length > 0) setSyncedAqiMap(aqiMap);
        if (Object.keys(tempMap).length > 0) setSyncedTempMap(tempMap);

        // Also add a debug log for selected province matching
        // console.log('[TravelGuide] Current selected province map:', {
        //   selectedProvinceId,
        //   normalizedSelectedProvinceId: normalizeKey(selectedProvinceId)
        // });
      } catch (e) {
        console.error('[TravelGuide] DB weather fetch failed totally:', e);
        // Fallback to csvDb
        const rows = getRecords();
        if (!Array.isArray(rows) || rows.length === 0) return;
        const aqiMap: Record<string, number> = {};
        const tempMap: Record<string, number> = {};
        rows.forEach((r) => {
          if (!r) return;
          const nid = normalizeKey(r.id);
          if (typeof r.aqi === 'number' && Number.isFinite(r.aqi)) aqiMap[nid] = r.aqi;
          if (typeof r.temperature === 'number' && Number.isFinite(r.temperature)) tempMap[nid] = r.temperature;
        });
        if (Object.keys(aqiMap).length > 0) setSyncedAqiMap(aqiMap);
        if (Object.keys(tempMap).length > 0) setSyncedTempMap(tempMap);
      }
    };

    syncFromDb();
    const interval = setInterval(syncFromDb, 10000); // Re-sync every 10s
    const onWeatherUpdated = () => {
      void syncFromDb();
    };

    window.addEventListener(WEATHER_AQI_UPDATED_EVENT, onWeatherUpdated as EventListener);

    return () => {
      clearInterval(interval);
      window.removeEventListener(WEATHER_AQI_UPDATED_EVENT, onWeatherUpdated as EventListener);
    };
  }, [showWeatherModal, normalizeKey]);
  
  // Fetch portal data: try DB first, always fallback to static data
  useEffect(() => {
    const fetchPortal = async () => {
      const pName = displayName.toLowerCase();
      const staticData = getProvincePortal(pName === 'กรุงเทพมหานคร' ? 'bangkok' : pName);

      try {
        const dbData = await (window as any).api.db.getProvincePortal(selectedProvinceId);
        // DB returns transport as an array – only use if we actually have rows
        if (dbData && Array.isArray(dbData.transport) && dbData.transport.length > 0) {
          setPortalData({
            ...dbData,
            supply: Array.isArray(dbData.supply) && dbData.supply.length > 0 ? dbData.supply : staticData.supply,
            knowledge: Array.isArray((dbData as any).knowledge) && (dbData as any).knowledge.length > 0
              ? (dbData as any).knowledge
              : (Array.isArray(dbData.tips) && dbData.tips.length > 0 ? dbData.tips : staticData.knowledge),
            environment: (dbData as any).environment || staticData.environment,
            emergencyNumbers: Array.isArray((dbData as any).emergencyNumbers) && (dbData as any).emergencyNumbers.length > 0
              ? (dbData as any).emergencyNumbers
              : staticData.emergencyNumbers,
            localFoods: Array.isArray((dbData as any).localFoods) && (dbData as any).localFoods.length > 0
              ? (dbData as any).localFoods
              : (Array.isArray((dbData as any).localFood) ? (dbData as any).localFood : staticData.localFoods),
          });
          return;
        }
      } catch (e) {
        console.warn('[TravelGuide] DB portal fetch failed, using static data:', e);
      }

      // Fallback: always use static data from portalData.ts
      setPortalData(staticData);
    };
    fetchPortal();
  }, [selectedProvinceId, selectedProvinceName, displayName]);

  const portal = portalData || getProvincePortal('default');

  const normalizedTransport = useMemo(() => {
    const source = portal?.transport;

    if (Array.isArray(source)) {
      const grouped: Record<string, any[]> = {};
      source.forEach((item: any) => {
        const type = normalizeTransportType(String(item?.type || 'other'));
        if (!grouped[type]) grouped[type] = [];
        grouped[type].push(item);
      });

      const tabs = transportTypeOrder
        .filter((type) => Array.isArray(grouped[type]) && grouped[type].length > 0)
        .map((type) => ({ id: type, label: transportTypeLabels[type] || type }));

      return {
        tabs,
        companies: grouped,
        others: grouped.other || []
      };
    }

    if (source && typeof source === 'object') {
      const companies = source.companies || {};
      const tabs = Array.isArray(source.tabs)
        ? source.tabs
        : Object.keys(companies).map((id) => ({ id, label: transportTypeLabels[id] || id }));

      return {
        tabs,
        companies,
        others: source.others || []
      };
    }

    return {
      tabs: [] as Array<{ id: string; label: string }>,
      companies: {} as Record<string, any[]>,
      others: [] as any[]
    };
  }, [portal]);

  const transportTabs = normalizedTransport.tabs.length > 0
    ? normalizedTransport.tabs
    : [
      { id: 'bus', label: 'รถเมล์/บขส.' },
      { id: 'rail', label: 'รถไฟ' },
      { id: 'van', label: 'รถตู้' }
    ];

  const currentTab = activeTransportTab || transportTabs[0]?.id || '';
  const currentTabCompanies = currentTab === '__others'
    ? (normalizedTransport.others || [])
    : (normalizedTransport.companies[currentTab]
      || normalizedTransport.companies[normalizeTransportType(currentTab)]
      || []);

  const currentProvinces = provincesByRegion[activeRegion] || [];
  const weatherModalProvinces = useMemo(() => {
    return currentProvinces.map((name) => {
      const id = provinceNameToId.get(name) || provinceNameToId.get(normalizeKey(name)) || normalizeKey(name);
      return { id, name: provinceThaiNames[name] || name };
    });
  }, [currentProvinces, provinceNameToId, normalizeKey]);

  const plannerEndpointOptions = useMemo(() => {
    const options = new Set<string>();
    options.add('กรุงเทพฯ');
    options.add(displayName);

    const plannerHints = (portal as any)?.plannerHints;
    const hintedOrigins = Array.isArray(plannerHints?.commonOrigins) ? plannerHints.commonOrigins : [];
    const hintedDestinations = Array.isArray(plannerHints?.commonDestinations) ? plannerHints.commonDestinations : [];
    const hintedHubs = Array.isArray(plannerHints?.transitHubs) ? plannerHints.transitHubs : [];

    hintedOrigins.forEach((origin: unknown) => {
      if (typeof origin === 'string' && origin.trim()) options.add(origin.trim());
    });
    hintedDestinations.forEach((destination: unknown) => {
      if (typeof destination === 'string' && destination.trim()) options.add(destination.trim());
    });
    hintedHubs.forEach((hub: unknown) => {
      if (typeof hub === 'string' && hub.trim()) options.add(hub.trim());
    });

    const routeRows = Array.isArray((portal as any)?.transportRoutes) ? (portal as any).transportRoutes : [];
    routeRows.forEach((route: any) => {
      if (typeof route?.from === 'string' && route.from.trim()) options.add(route.from.trim());
      if (typeof route?.to === 'string' && route.to.trim()) options.add(route.to.trim());
      if (Array.isArray(route?.via)) {
        route.via.forEach((viaNode: any) => {
          if (typeof viaNode === 'string' && viaNode.trim()) options.add(viaNode.trim());
        });
      }
    });

    return Array.from(options).sort((a, b) => a.localeCompare(b));
  }, [displayName, portal]);

  const fetchPlannerSearchOptions = useCallback(async (query: string, signal?: AbortSignal) => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return [] as string[];

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=8&accept-language=th,en&countrycodes=th&addressdetails=1&namedetails=1&q=${encodeURIComponent(trimmed)}&email=locus.app.contact@gmail.com`;
      const response = await fetch(url, {
        signal,
        headers: { 'Accept-Language': 'th,en', 'Accept': 'application/json' }
      });
      if (!response.ok) return [];

      const rows: Array<{ display_name?: string; namedetails?: Record<string, string>; name?: string; address?: Record<string, string> }> = await response.json();
      const options: string[] = [];
      const seen = new Set<string>();

      rows.forEach((row) => {
        const primary = (row.namedetails?.['name:th'] || row.namedetails?.name || row.name || row.display_name?.split(',')[0] || '').trim();
        const province = (row.address?.state || row.address?.province || '').trim();
        const fallbackDisplay = typeof row.display_name === 'string' ? row.display_name.split(',').slice(0, 2).join(',').trim() : '';

        let label = primary;
        if (primary && province && !primary.includes(province)) {
          label = `${primary} ${province}`;
        }
        if (!label) label = fallbackDisplay;
        if (!label) return;

        const key = label.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        options.push(label);
      });

      return options.slice(0, 8);
    } catch (error: any) {
      if (error?.name !== 'AbortError') {
        console.warn('[TravelGuide] planner search failed', error);
      }
      return [];
    }
  }, []);

  useEffect(() => {
    if (!showSearchPopup) {
      setOriginSearchOptions([]);
      return;
    }

    const q = originText.trim();
    if (q.length < 2) {
      setOriginSearchOptions([]);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetchPlannerSearchOptions(q, controller.signal)
        .then((options) => setOriginSearchOptions(options))
        .catch(() => setOriginSearchOptions([]));
    }, 240);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [fetchPlannerSearchOptions, originText, showSearchPopup]);

  useEffect(() => {
    if (!showSearchPopup) {
      setDestSearchOptions([]);
      return;
    }

    const q = destText.trim();
    if (q.length < 2) {
      setDestSearchOptions([]);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetchPlannerSearchOptions(q, controller.signal)
        .then((options) => setDestSearchOptions(options))
        .catch(() => setDestSearchOptions([]));
    }, 240);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [destText, fetchPlannerSearchOptions, showSearchPopup]);

  const plannerOriginOptions = useMemo(() => {
    const set = new Set<string>(plannerEndpointOptions);
    originSearchOptions.forEach((option) => set.add(option));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [originSearchOptions, plannerEndpointOptions]);

  const plannerDestinationOptions = useMemo(() => {
    const set = new Set<string>(plannerEndpointOptions);
    destSearchOptions.forEach((option) => set.add(option));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [destSearchOptions, plannerEndpointOptions]);

  const reverseGeocodeCurrentLocation = useCallback(async (lat: number, lng: number) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=th,en&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1&email=locus.app.contact@gmail.com`;
      const response = await fetch(url, { headers: { 'Accept-Language': 'th,en', 'Accept': 'application/json' } });
      if (!response.ok) return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

      const data: { display_name?: string; address?: Record<string, string> } = await response.json();
      const district = data.address?.suburb || data.address?.city_district || data.address?.city || data.address?.town || data.address?.village || '';
      const province = data.address?.state || data.address?.province || '';

      const label = [district, province].filter(Boolean).join(' ').trim();
      if (label) return label;

      if (typeof data.display_name === 'string' && data.display_name.trim()) {
        return data.display_name.split(',').slice(0, 2).join(',').trim();
      }
      return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    } catch {
      return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
  }, []);

  const fetchApproxLocationFromIp = useCallback(async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data: { latitude?: number; longitude?: number; city?: string; region?: string } = await response.json();
        if (Number.isFinite(data.latitude) && Number.isFinite(data.longitude)) {
          return { lat: Number(data.latitude), lng: Number(data.longitude), city: data.city || '', region: data.region || '' };
        }
      }
    } catch {
      // Try secondary provider below.
    }

    try {
      const response = await fetch('https://ipwho.is/');
      if (!response.ok) return null;
      const data: { success?: boolean; latitude?: number; longitude?: number; city?: string; region?: string } = await response.json();
      if (data.success !== false && Number.isFinite(data.latitude) && Number.isFinite(data.longitude)) {
        return { lat: Number(data.latitude), lng: Number(data.longitude), city: data.city || '', region: data.region || '' };
      }
    } catch {
      return null;
    }

    return null;
  }, []);

  const handleUseCurrentLocation = useCallback(async () => {
    setOriginLocationError('');
    setOriginLocationHint('');

    const applyApproxLocationFallback = async () => {
      const approx = await fetchApproxLocationFromIp();
      if (!approx) return false;
      const label = await reverseGeocodeCurrentLocation(approx.lat, approx.lng);
      setOriginText(label);
      setOriginLocationHint('ใช้ตำแหน่งโดยประมาณจากเครือข่าย (IP Location)');
      return true;
    };

    if (!navigator.geolocation) {
      const applied = await applyApproxLocationFallback();
      if (!applied) setOriginLocationError('อุปกรณ์นี้ไม่รองรับตำแหน่งปัจจุบัน');
      return;
    }

    setIsLocatingOrigin(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 12000,
          maximumAge: 30000,
        });
      });

      const label = await reverseGeocodeCurrentLocation(position.coords.latitude, position.coords.longitude);
      setOriginText(label);
      setOriginLocationHint('');
    } catch (error: any) {
      const rawMessage = String(error?.message || '').toLowerCase();
      const shouldTryApproxFallback = error?.code !== 1 || rawMessage.includes('googleapis') || rawMessage.includes('403');

      if (shouldTryApproxFallback) {
        const applied = await applyApproxLocationFallback();
        if (applied) return;
      }

      if (error?.code === 1) {
        setOriginLocationError('ยังไม่ได้อนุญาตให้เข้าถึงตำแหน่งปัจจุบัน');
      } else if (error?.code === 2) {
        setOriginLocationError('ไม่สามารถอ่านตำแหน่งปัจจุบันได้');
      } else if (error?.code === 3) {
        setOriginLocationError('หมดเวลาในการค้นหาตำแหน่งปัจจุบัน');
      } else {
        setOriginLocationError('เกิดข้อผิดพลาดในการค้นหาตำแหน่งปัจจุบัน');
      }
    } finally {
      setIsLocatingOrigin(false);
    }
  }, [fetchApproxLocationFromIp, reverseGeocodeCurrentLocation]);

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
    const origin = originText.trim();
    const dest = destText.trim();
    if (!origin || !dest) return;
    setConfirmedTrip({ origin, dest, budgetLevel: tripBudgetLevel, date: tripDate });
    setShowSearchPopup(false);
  };

  const openProvinceDetail = useCallback(() => {
    if (!selectedProvinceId) return;
    navigate(`/province/${activeRegion}/${selectedProvinceId}`);
  }, [activeRegion, navigate, selectedProvinceId]);

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

  const effectiveEcoIds = useMemo(() => {
    const portalIds = Array.isArray((portal as any)?.ecoIds) ? (portal as any).ecoIds : [];
    return portalIds.length > 0 ? portalIds : (brief.ecoIds || []);
  }, [brief.ecoIds, portal]);

  const ecoEntities = useMemo(() => {
    const known = getEcoEntities(effectiveEcoIds);
    const knownIds = new Set(known.map((entity) => entity.id));

    const fallbackUnknown = effectiveEcoIds
      .filter((id) => !knownIds.has(id))
      .map((id) => ({
        id,
        name: prettifyEcoId(id),
        category: inferEcoCategoryFromId(id),
        tags: ['common'] as EcoTag[],
        desc: 'ข้อมูลสิ่งแวดล้อมจากชุดวิจัยจังหวัด'
      } as EcoEntity));

    const dynamicProvinceEco = Array.isArray((portal as any)?.newEcoEntities)
      ? (portal as any).newEcoEntities.map((entity: any, index: number) => {
        const rawId = typeof entity?.id === 'string' && entity.id.trim()
          ? entity.id.trim()
          : `dynamic_eco_${index}`;
        const rawCategory = String(entity?.category || '').toLowerCase();
        const normalizedCategory = (rawCategory === 'fauna' || rawCategory === 'flora' || rawCategory === 'terrain' || rawCategory === 'climate')
          ? rawCategory
          : inferEcoCategoryFromId(rawId);

        return {
          id: rawId,
          name: entity?.name || prettifyEcoId(rawId),
          category: normalizedCategory,
          tags: sanitizeEcoTags(entity?.tags),
          desc: entity?.desc || 'ข้อมูลสิ่งแวดล้อมเฉพาะจังหวัด'
        } as EcoEntity;
      })
      : [];

    const merged = new Map<string, EcoEntity>();
    // Prioritize dynamic (research data), then known (master DB), then fallback
    [...dynamicProvinceEco, ...known, ...fallbackUnknown].forEach((entity) => {
      if (!merged.has(entity.id)) {
        merged.set(entity.id, entity);
      }
    });

    return Array.from(merged.values());
  }, [effectiveEcoIds, portal]);

  const knowledgeTips = useMemo(() => {
    const directKnowledge = Array.isArray((portal as any)?.knowledge) ? (portal as any).knowledge : [];
    if (directKnowledge.length > 0) {
      return directKnowledge
        .map((item: any, index: number) => {
          if (typeof item === 'string') {
            return { title: `Tip ${index + 1}`, content: item };
          }
          return {
            title: item?.title || `Tip ${index + 1}`,
            content: item?.content || item?.note || ''
          };
        })
        .filter((item: { title: string; content: string }) => item.content)
        .slice(0, 6);
    }

    const directTips = Array.isArray((portal as any)?.tips) ? (portal as any).tips : [];
    if (directTips.length > 0) {
      return directTips
        .map((item: any, index: number) => {
          if (typeof item === 'string') {
            return { title: `Tip ${index + 1}`, content: item };
          }
          return {
            title: item?.title || `Tip ${index + 1}`,
            content: item?.content || item?.note || ''
          };
        })
        .filter((item: { title: string; content: string }) => item.content)
        .slice(0, 6);
    }

    const derived: Array<{ title: string; content: string }> = [];

    if ((portal as any)?.bestSeason) {
      derived.push({ title: 'ช่วงเที่ยวแนะนำ', content: `จังหวัดนี้เหมาะเที่ยวช่วง ${(portal as any).bestSeason}` });
    }

    const firstDanger = Array.isArray((portal as any)?.dangerZones) ? (portal as any).dangerZones[0] : null;
    if (firstDanger?.label && firstDanger?.note) {
      derived.push({ title: 'จุดต้องระวัง', content: `${firstDanger.label}: ${firstDanger.note}` });
    }

    const firstRoute = Array.isArray((portal as any)?.transportRoutes) ? (portal as any).transportRoutes[0] : null;
    if (firstRoute?.from && firstRoute?.to) {
      derived.push({ title: 'เส้นทางนิยม', content: `${firstRoute.from} → ${firstRoute.to} (${firstRoute.duration || 'ดูเวลาหน้างาน'})` });
    }

    const foods = Array.isArray((portal as any)?.localFoods)
      ? (portal as any).localFoods
      : (Array.isArray((portal as any)?.localFood) ? (portal as any).localFood : []);
    const firstFood = foods[0];
    if (firstFood?.name) {
      derived.push({ title: 'เมนูท้องถิ่น', content: `ลอง ${firstFood.name}${firstFood.priceRange ? ` (${firstFood.priceRange})` : ''}` });
    }

    if (derived.length === 0 && brief?.seasonAdvice) {
      derived.push({ title: 'คำแนะนำการเดินทาง', content: brief.seasonAdvice });
    }

    return derived.slice(0, 5);
  }, [brief.seasonAdvice, portal]);

  const supplyItems = useMemo(() => {
    const direct = Array.isArray((portal as any)?.supply) ? (portal as any).supply : [];
    if (direct.length > 0) return direct;

    return [
      { type: 'bank', label: 'ธนาคาร / ATM', note: 'มีในเขตอำเภอเมืองและศูนย์การค้า' },
      { type: 'gas', label: 'ปั๊มน้ำมัน', note: 'อยู่ตามทางหลวงและถนนสายหลักของจังหวัด' },
      { type: 'other', label: 'ห้องน้ำ / จุดพัก', note: 'ปั๊มน้ำมันและร้านสะดวกซื้อส่วนใหญ่มีบริการ' }
    ];
  }, [portal]);

  const ecoCategoryConfigs = useMemo(() => {
    const shades: Record<'fauna' | 'flora' | 'terrain' | 'climate', number> = {
      fauna: 0.12,
      flora: 0.26,
      terrain: 0.4,
      climate: 0.56,
    };

    return [
      { id: 'fauna' as const, label: 'สัตว์ (Fauna)', icon: <PawPrint size={14} className="text-white" />, shade: shades.fauna },
      { id: 'flora' as const, label: 'พืช (Flora)', icon: <Leaf size={14} className="text-white" />, shade: shades.flora },
      { id: 'terrain' as const, label: 'พื้นที่ (Terrain)', icon: <Mountain size={14} className="text-white" />, shade: shades.terrain },
      { id: 'climate' as const, label: 'สภาพอากาศ (Climate)', icon: <Thermometer size={14} className="text-white" />, shade: shades.climate },
    ];
  }, []);

  const supplyLabels: Record<SupplyType, string> = {
    bank: 'ธนาคาร / ATM',
    gas: 'ปั๊มน้ำมัน',
    other: 'ห้องน้ำ / จุดพัก',
  };

  const supplyTypes: SupplyType[] = ['bank', 'gas', 'other'];

  const supplyItemsByType = useMemo(() => {
    return {
      bank: supplyItems.filter((s: any) => s.type === 'bank'),
      gas: supplyItems.filter((s: any) => s.type === 'gas'),
      other: supplyItems.filter((s: any) => s.type !== 'bank' && s.type !== 'gas'),
    } as Record<SupplyType, any[]>;
  }, [supplyItems]);

  const activeSupplyItems = supplyItemsByType[activeSupplyType] || [];
  const visibleSupplyItems = activeSupplyItems.slice(0, 5);

  const transportContrastPalette = useMemo(() => {
    return transportContrastPalettesByRegion[activeRegion] || transportContrastPalettesByRegion.central;
  }, [activeRegion]);

  const transportTabOrderMap = useMemo(() => {
    const map = new Map<string, number>();
    transportTabs.forEach((tab, index) => {
      map.set(tab.id, index);
    });
    return map;
  }, [transportTabs]);

  const getTransportContrastColor = useCallback((transportType: string) => {
    const rank = transportTabOrderMap.get(transportType) ?? 0;
    return transportContrastPalette[rank % transportContrastPalette.length];
  }, [transportContrastPalette, transportTabOrderMap]);

  const getTransportRank = useCallback((transportType: string) => {
    return transportTabOrderMap.get(transportType) ?? 0;
  }, [transportTabOrderMap]);

  const sectionHeaderStyle = useMemo(() => {
    return {
      background: `linear-gradient(90deg, ${toRgba('#6b7280', 0.28)} 0%, ${toRgba('#4b5563', 0.38)} 100%)`,
      borderBottom: `1px solid ${toRgba('#9ca3af', 0.42)}`,
      boxShadow: `inset 0 1px 0 ${toRgba('#e5e7eb', 0.12)}`,
    };
  }, []);

  const knowledgeToneScale = useMemo(() => {
    return knowledgeToneScaleByRegion[activeRegion as RegionId] || knowledgeToneScaleByRegion.central;
  }, [activeRegion]);

  const getTransportTabActiveStyle = useCallback((transportType: string) => {
    const color = getTransportContrastColor(transportType);
    const rank = getTransportRank(transportType);
    const intensity = getTransportIntensity(rank);
    return {
      background: `linear-gradient(90deg, ${toRgba(color, Math.min(0.9, intensity + 0.2))} 0%, ${toRgba(color, Math.max(0.4, intensity))} 100%)`,
      border: `1px solid ${toRgba(color, 0.95)}`,
    };
  }, [getTransportContrastColor, getTransportRank]);

  useEffect(() => {
    if (supplyItemsByType[activeSupplyType].length > 0) return;
    const fallback = supplyTypes.find((type) => supplyItemsByType[type].length > 0);
    if (fallback && fallback !== activeSupplyType) {
      setActiveSupplyType(fallback);
    }
  }, [activeSupplyType, supplyItemsByType]);

  return (
    <div className="h-full w-full flex-1 min-w-0 flex flex-col bg-[#020305] overflow-hidden relative">
      <div className="shrink-0 flex items-center pr-[120px] pl-4 py-3 gap-3"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accentSecondary} 80%, #000 100%)` }}>
        <button title="ย้อนกลับ" onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-black/30 backdrop-blur flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all shrink-0"><ArrowLeft size={18} /></button>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/15 backdrop-blur shadow-inner"><Navigation2 size={20} className="text-white drop-shadow-md" /></div>
        <h1 className="text-lg font-black text-white drop-shadow-md tracking-tight mr-1 shrink-0">Travel Guide</h1>
        <select title="เลือกภูมิภาค" value={activeRegion} onChange={(e) => switchToRegion(e.target.value)} className="bg-black/40 backdrop-blur border border-white/10 rounded-lg px-3 py-2 text-sm text-white min-w-[120px] cursor-pointer ml-1">
          {Object.entries(regionTheme).map(([id, r]) => (<option key={id} value={id} className="bg-[#0f1115] text-white">{r.label}</option>))}
        </select>
        <select title="เลือกจังหวัด" value={selectedProvinceName} onChange={(e) => setSelectedProvinceName(e.target.value)} className="bg-black/40 backdrop-blur border border-white/10 rounded-lg px-3 py-2 text-sm text-white min-w-[150px] cursor-pointer">
          {currentProvinces.map(p => (<option key={p} value={p} className="bg-[#0f1115] text-white">{provinceThaiNames[p] || p}</option>))}
        </select>
        <button onClick={() => setShowSearchPopup(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-sm text-white hover:bg-white/20 transition-all flex-1 max-w-[320px] justify-start shadow-sm"><Search size={16} /><span className="truncate">{confirmedTrip ? `${confirmedTrip.origin} → ${confirmedTrip.dest}` : 'ค้นหาสถานที่...'}</span></button>
        <button
          onClick={openProvinceDetail}
          title={`เปิด Province Detail ของ ${displayName}`}
          className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/35 text-cyan-100 hover:bg-cyan-500/30 hover:text-white transition-all shadow-sm"
        >
          <MapPin size={14} />
          <span className="text-xs font-bold">Open Province Detail</span>
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[300px] shrink-0 border-r flex flex-col relative" style={{ borderColor: toRgba(accent, 0.1), background: '#050608' }}>
          <ThailandMap activeId={activeRegion} onSelectRegion={handleMapSelectRegion} viewMode="province" selectedProvince={{ name: selectedProvinceName, id: selectedProvinceName } as any} onSelectProvince={() => {}} onSelectProvinceByName={handleMapSelectProvince} />
        </div>

        <div className="flex-1 overflow-hidden p-4 flex flex-col gap-3">
          <div className="rounded-xl border p-4 shrink-0" style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
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
                <button onClick={() => setShowWeatherModal(true)} className="group flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-500/28 hover:bg-slate-400/32 border border-slate-200/38 shadow-[0_0_0_1px_rgba(248,250,252,0.12)] shrink-0 transition-all hover:scale-105 active:scale-100 backdrop-blur-sm">
                  <Thermometer size={13} className="text-amber-400 group-hover:scale-110 transition-transform" />
                  <div className="text-xs text-left">
                    <div className="font-bold text-white leading-tight">{currentTemp !== null ? `${Math.round(currentTemp)}°C` : brief.climate.split(',')[0].replace('อุณหภูมิ ', '')}</div>
                    <div className={`text-[9px] font-bold ${tempInfo ? tempInfo.color : 'text-white/50'}`}>{tempInfo ? tempInfo.label : 'Weather Forecast'}</div>
                  </div>
                </button>
                <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-500/28 shadow-[0_0_0_1px_rgba(248,250,252,0.12)] shrink-0 backdrop-blur-sm ${currentAqi <= 50 ? 'border border-emerald-300/45' : currentAqi <= 100 ? 'border border-amber-300/45' : currentAqi <= 150 ? 'border border-orange-300/50' : 'border border-red-400/50'}`}>
                  <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${currentAqi <= 50 ? 'bg-emerald-400' : currentAqi <= 100 ? 'bg-amber-400' : currentAqi <= 150 ? 'bg-orange-400' : 'bg-red-500'}`} />
                  <div className="text-xs text-left">
                    <div className={`font-bold leading-tight ${currentAqi <= 50 ? 'text-emerald-400' : currentAqi <= 100 ? 'text-amber-400' : currentAqi <= 150 ? 'text-orange-400' : 'text-red-400'}`}>AQI {currentAqi}</div>
                    <div className="text-slate-300/85 text-[9px] font-bold">{currentAqi <= 50 ? 'คุณภาพดี (Good)' : currentAqi <= 100 ? 'ปานกลาง (Moderate)' : currentAqi <= 150 ? 'มีผลต่อกลุ่มเสี่ยง' : currentAqi <= 200 ? 'ไม่ดีต่อสุขภาพ' : 'อันตราย (Hazardous)'}</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 flex-wrap">
                {transportTabs.map((tab: { id: string; label: string }) => {
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTransportTab(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentTab === tab.id ? 'text-white shadow-md' : 'text-slate-400 bg-white/5 hover:bg-white/10'}`}
                      style={currentTab === tab.id ? getTransportTabActiveStyle(tab.id) : {}}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {currentTabCompanies.map((co: any, i: number) => {
                const contrastColor = getTransportContrastColor(currentTab);
                const scaleLevel = getTransportIntensity(i);
                const cardPrimaryAlpha = Math.max(0.16, scaleLevel * 0.72);
                const cardSecondaryAlpha = Math.max(0.08, cardPrimaryAlpha - 0.14);
                return (
                  <div
                    key={i}
                    className="rounded-lg border p-3 flex items-center gap-2.5 group transition-all"
                    style={{
                      borderColor: toRgba(contrastColor, Math.min(0.66, cardPrimaryAlpha + 0.2)),
                      background: `linear-gradient(120deg, ${toRgba(contrastColor, cardPrimaryAlpha)} 0%, ${toRgba(contrastColor, cardSecondaryAlpha)} 100%)`
                    }}
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black shrink-0" style={{ background: toRgba(contrastColor, 0.58), color: '#ffffff', border: `1px solid ${toRgba('#ffffff', 0.16)}` }}>{co.logoText || 'TR'}</div>
                    <div className="min-w-0 flex-1"><div className="text-xs font-bold text-white truncate">{co.shortName || co.name}</div><div className="text-[10px] text-slate-100/80 line-clamp-2">{co.description}</div></div>
                    {co.warpUrl && (<button title={`เปิดลิงก์ ${co.shortName || co.name || 'ผู้ให้บริการ'}`} onClick={() => window.open(co.warpUrl, '_blank')} className="w-8 h-8 rounded-md flex items-center justify-center bg-black/20 hover:bg-black/35 text-white/80 hover:text-white shrink-0 border border-white/15"><ExternalLink size={14} /></button>)}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="shrink-0 grid grid-cols-1 xl:grid-cols-3 gap-3 items-stretch">
            {/* Environment / Ecology with toggle categories */}
            <DashCard title="Environment / Ecology" icon={<CloudRain size={14} />} accent={accent} className="h-[228px]" contentClassName="overflow-y-auto custom-scrollbar pr-1" headerStyle={sectionHeaderStyle} fullBleedHeader>
               <div className="space-y-2 relative">
                 {ecoCategoryConfigs.map(cat => {
                   const items = ecoEntities.filter(e => e.category === cat.id);
                   if (items.length === 0) return null;
                   return (
                     <details
                       key={cat.id}
                       className="group border rounded-lg overflow-hidden transition-all"
                       style={{
                         borderColor: toRgba(accent, Math.min(0.82, cat.shade + 0.22)),
                         background: `linear-gradient(90deg, ${toRgba(accent, cat.shade)} 0%, ${toRgba(accentSecondary, Math.min(0.78, cat.shade + 0.2))} 100%)`
                       }}
                     >
                      <summary
                        className="flex items-center justify-between p-2.5 cursor-pointer transition-colors list-none [&::-webkit-details-marker]:hidden"
                        style={{ background: `linear-gradient(90deg, ${toRgba(accent, Math.min(0.44, cat.shade + 0.18))} 0%, ${toRgba('#000000', 0.12)} 100%)` }}
                      >
                        <div className="flex items-center gap-2">{cat.icon} <span className="text-[10px] font-bold text-white uppercase tracking-wide">{cat.label}</span></div>
                        <span className="text-xs text-slate-500 opacity-50 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="bg-black/45 p-2 space-y-1.5 border-t border-white/10">
                        {items.map(e => (
                          <div key={e.id} onClick={() => setPreviewEco(e)} className="w-full flex items-center justify-between p-2 rounded-md hover:bg-white/10 text-left transition-colors cursor-pointer group/item relative overflow-hidden">
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent transition-colors" style={{ background: toRgba(accent, 0.38) }} />
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
                 {ecoEntities.length === 0 && (
                   <div className="text-xs text-slate-500">ยังไม่มีข้อมูลสิ่งแวดล้อมเฉพาะจังหวัด</div>
                 )}
               </div>
            </DashCard>

            {/* Knowledge / Tips */}
             <DashCard title="Knowledge / Tips" icon={<Lightbulb size={14} />} accent={accent} className="h-[228px]" contentClassName="overflow-y-auto custom-scrollbar pr-1" headerStyle={sectionHeaderStyle} fullBleedHeader>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {knowledgeTips.length > 0 ? knowledgeTips.map((k: any, i: number) => (
                    <li key={i}><div className={`font-bold text-[11px] ${knowledgeToneScale[i % knowledgeToneScale.length]}`}>{k.title}</div><div className="text-[10px] text-slate-300">{k.content}</div></li>
                )) : <li className="text-slate-500">ยังไม่มีข้อมูลแนะนำ</li>}
              </ul>
            </DashCard>

            <DashCard title="Supply / Facilities" icon={<Landmark size={14} />} accent={accent} className="h-[228px]" contentClassName="overflow-hidden" headerStyle={sectionHeaderStyle} fullBleedHeader>
              <div className="h-full min-h-0 flex flex-col gap-2.5">
                <div className="grid grid-cols-3 gap-2">
                  {supplyTypes.map((type) => {
                    const icon = type === 'bank' ? <BanknoteIcon size={13} className="text-white" /> : type === 'gas' ? <Fuel size={13} className="text-white" /> : <Bath size={13} className="text-white" />;
                    const isActive = activeSupplyType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setActiveSupplyType(type)}
                        className={`rounded-lg border px-2 py-2 text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 ${isActive ? 'text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
                        style={isActive
                          ? { background: `linear-gradient(90deg, ${toRgba(accent, 0.48)} 0%, ${toRgba(accentSecondary, 0.36)} 100%)`, borderColor: toRgba(accent, 0.58) }
                          : { background: toRgba('#ffffff', 0.04), borderColor: toRgba(accent, 0.22) }}
                      >
                        {icon}
                        <span className="truncate">{supplyLabels[type]}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-black/40 p-2 space-y-1.5 border border-white/10 rounded-lg flex-1 min-h-0 overflow-hidden">
                  {visibleSupplyItems.map((s: any, i: number) => {
                    let cleanLabel = s.label.replace(/ในตัวอำเภอ.*$|ในตัวเมือง.*$|ในเขต.*$|บริเวณ.*$/, '');
                    cleanLabel = cleanLabel.replace(/ธนาคารพาณิชย์/g, 'ธนาคาร');

                    const searchKeyword = cleanLabel.split(/(?:\sสาขา|สาขา| ภายใน| จุดพัก)/)[0].trim();
                    const provinceSuffix = displayName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const hasProvinceInKeyword = new RegExp(`\\s${provinceSuffix}$`, 'i').test(searchKeyword) || new RegExp(`^${provinceSuffix}$`, 'i').test(searchKeyword);
                    const warpQuery = hasProvinceInKeyword ? searchKeyword : `${searchKeyword} ${displayName}`.trim();

                    return (
                      <div key={i} className="w-full flex items-center justify-between p-2 rounded-md hover:bg-white/10 text-left transition-colors group/item relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover/item:bg-white/20 transition-colors" />
                        <div className="flex-1 min-w-0 flex items-center justify-between pl-1 pr-2">
                          <div className="text-[11px] text-slate-200 font-bold truncate flex-1">{s.label}</div>
                          <div className="text-[9px] text-slate-500 shrink-0 ml-2 max-w-[180px] truncate">{s.note}</div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(`/province/${activeRegion}/${selectedProvinceId}`, {
                              state: {
                                focusPlace: {
                                  title: warpQuery,
                                  autoFocus: false,
                                  lat: provinceCoordinates[selectedProvinceName]?.lat || provinceCoordinates[displayName]?.lat || 13.7563,
                                  lng: provinceCoordinates[selectedProvinceName]?.lng || provinceCoordinates[displayName]?.lng || 100.5018
                                }
                              }
                            });
                          }}
                          title={`Warp ไปดูแผนที่ ${s.label}`}
                          className="shrink-0 w-6 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/30 transition-all opacity-0 group-hover/item:opacity-100"
                        >
                          <MapPin size={11} />
                        </button>
                      </div>
                    );
                  })}
                  {activeSupplyItems.length === 0 && (
                    <div className="text-xs text-slate-500 px-1 py-2">ยังไม่มีข้อมูลหมวดนี้</div>
                  )}
                  {activeSupplyItems.length > visibleSupplyItems.length && (
                    <div className="text-[10px] text-slate-500 px-1 pt-1">แสดง {visibleSupplyItems.length} จาก {activeSupplyItems.length} รายการ</div>
                  )}
                </div>
              </div>
            </DashCard>
          </div>

          {/* ROW 4: Danger Zones + Planner */}
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 pb-1 items-stretch flex-1 min-h-0">
            <DashCard title="จุดเสี่ยง/อันตราย" icon={<AlertTriangle size={14} />} accent="#ef4444" className="h-full min-h-0" contentClassName="overflow-y-auto custom-scrollbar pr-1" headerStyle={sectionHeaderStyle} fullBleedHeader>
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
            
            <div className="rounded-xl border p-4 flex flex-col items-center justify-center bg-white/5 h-full min-h-0" style={{ borderColor: toRgba(accent, 0.12) }}>
              {!confirmedTrip ? (
                <>
                  <MapPin size={24} style={{ color: accent }} className="mb-2 opacity-50" />
                  <button onClick={() => setShowSearchPopup(true)} className="px-4 py-2 rounded-lg text-xs font-bold text-white shadow-md" style={{ background: accent }}>กำหนดแผนเที่ยว</button>
                </>
              ) : (
                <div className="w-full text-left overflow-y-auto custom-scrollbar pr-1">
                  <div className="text-[10px] font-bold text-slate-500 mb-1">{budgetLabels[confirmedTrip.budgetLevel]} BUDGET</div>
                  <div className="text-base font-black text-white truncate">{confirmedTrip.origin} → {confirmedTrip.dest}</div>
                  <div className="text-[10px] text-slate-500 mb-3">วันที่เดินทาง: {confirmedTrip.date}</div>
                  {condition && (
                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {condition.isHoliday && <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30">Holiday</span>}
                        {condition.isRaining && <span className="text-[9px] bg-sky-500/20 text-sky-400 px-1.5 py-0.5 rounded border border-sky-500/30">Rain</span>}
                      </div>
                      <div className="text-[10px] text-slate-300 leading-tight italic">{condition.advice}</div>
                    </div>
                  )}
                  {costResult && (
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-lg font-black" style={{ color: accent }}>฿{costResult.perDay.toLocaleString()}</div>
                      <button onClick={() => navigate('/intelligence')} className="px-2 py-1 bg-white/10 rounded text-[9px] text-white">Ask AI</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSearchPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowSearchPopup(false)}>
          <div className="w-full max-w-[420px] bg-[#0e1116] border border-white/10 rounded-2xl p-5 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-black text-white mb-4">จัดแผนเดินทาง</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-400 font-semibold">ต้นทาง</div>
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={isLocatingOrigin}
                    className="inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-lg border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <LocateFixed size={12} className={isLocatingOrigin ? 'animate-spin' : ''} />
                    {isLocatingOrigin ? 'กำลังหา...' : 'Current Location'}
                  </button>
                </div>
                <input
                  list="trip-origin-options"
                  value={originText}
                  onChange={e => setOriginText(e.target.value)}
                  placeholder="ต้นทาง เช่น บางนา, เชียงใหม่ หรือใช้ตำแหน่งปัจจุบัน"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                />
                {originLocationError && (
                  <div className="text-[10px] text-rose-400">{originLocationError}</div>
                )}
                {originLocationHint && !originLocationError && (
                  <div className="text-[10px] text-cyan-300">{originLocationHint}</div>
                )}
                <datalist id="trip-origin-options">
                  {plannerOriginOptions.map((option) => (
                    <option key={`origin-${option}`} value={option} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] text-slate-400 font-semibold">ปลายทาง</div>
                <input
                  list="trip-destination-options"
                  value={destText}
                  onChange={e => setDestText(e.target.value)}
                  placeholder="ไปที่ไหนดี?"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                />
                <datalist id="trip-destination-options">
                  {plannerDestinationOptions.map((option) => (
                    <option key={`destination-${option}`} value={option} />
                  ))}
                </datalist>
              </div>

              <input title="เลือกวันที่เดินทาง" type="date" value={tripDate} onChange={e => setTripDate(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" style={{ colorScheme: 'dark' }} />
              <div className="flex gap-2">{(['budget','mid', 'luxury'] as BudgetTier[]).map(t => (<button key={t} onClick={() => setTripBudgetLevel(t)} className={`flex-1 py-2 rounded-xl text-xs font-bold ${tripBudgetLevel === t ? 'text-black' : 'bg-white/5 text-slate-400'}`} style={tripBudgetLevel === t ? { background: accent } : {}}>{budgetLabels[t]}</button>))}</div>
              <button onClick={handleConfirmSearch} disabled={!originText.trim() || !destText.trim()} className="w-full py-3 rounded-xl font-black text-white mt-2 disabled:opacity-60 disabled:cursor-not-allowed" style={{ background: accent }}>ยืนยันแผน</button>
            </div>
          </div>
        </div>
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

function DashCard({ title, icon, accent, children, className = '', contentClassName = 'overflow-y-auto custom-scrollbar pr-1', headerStyle, fullBleedHeader = false }: { title: string; icon: React.ReactNode; accent: string; children: React.ReactNode; className?: string; contentClassName?: string; headerStyle?: React.CSSProperties; fullBleedHeader?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 flex flex-col transition-all hover:bg-white/[0.02] ${fullBleedHeader ? 'overflow-hidden' : ''} ${className}`} style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
      <div className={`${fullBleedHeader ? '-mx-3 -mt-3 px-3 py-2 mb-3' : 'mb-3 pb-2 border-b border-white/5'} flex items-center gap-2`} style={headerStyle}><span style={{ color: accent }}>{icon}</span><span className="text-[10px] font-bold text-white uppercase tracking-wider">{title}</span></div>
      <div className={`flex-1 min-h-0 ${contentClassName}`}>{children}</div>
    </div>
  );
}
