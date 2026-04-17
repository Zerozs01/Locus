import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Navigation2, Search, ExternalLink, MapPin,
  CloudRain, Thermometer,
  Lightbulb, AlertTriangle, Landmark, Fuel, BanknoteIcon,
  Bath, PawPrint, Leaf, Mountain, LocateFixed, Info, RefreshCw
} from 'lucide-react';
import { regionTheme, type RegionId } from '../../data/regionTheme';
import { toRgba } from '../../utils/color';
import { getProvincePortal, getCurrentSeason } from './data/portalData';
import { regionBriefs } from './data/regionBriefs';
import { getTravelConditionForDate } from './data/calendarHelpers';
import { ThailandMap } from '../../components/ThailandMap';
import { getRecords } from '../../utils/csvDb';
import { provinceCoordinates } from '../../components/ProvinceMap';

import { getEcoEntities, expandEcoTags, type EcoEntity, type EcoTag } from './data/ecoDb';
import { WeatherHistoryModal } from '../../components/WeatherHistoryModal';

const WEATHER_AQI_UPDATED_EVENT = 'locus:weather-aqi-updated';

type SupplyType = 'bank' | 'gas' | 'other';

type TravelGuideNewsItem = {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  tag: string;
  impact: 'low' | 'medium' | 'high';
  summary: string;
};

const parseDurationToMinutes = (duration: unknown): number | null => {
  const text = String(duration || '').trim().toLowerCase();
  if (!text) return null;

  const hourMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:h|hr|hrs|hour|hours|ช\.?ม\.?|ชม|ชั่วโมง)/i);
  const minuteMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:m|min|mins|minute|minutes|นาที|น\.)/i);

  if (hourMatch || minuteMatch) {
    const hours = hourMatch ? Number(hourMatch[1]) : 0;
    const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;
    const total = Math.round(hours * 60 + minutes);
    return Number.isFinite(total) && total > 0 ? total : null;
  }

  const bareNumber = text.match(/(\d+(?:\.\d+)?)/);
  if (!bareNumber) return null;
  const fallbackMinutes = Math.round(Number(bareNumber[1]));
  return Number.isFinite(fallbackMinutes) && fallbackMinutes > 0 ? fallbackMinutes : null;
};

const formatRouteDeparture = (route: any) => {
  const times = Array.isArray(route?.departureTimes)
    ? route.departureTimes
    : Array.isArray(route?.departureTime)
      ? route.departureTime
      : [];

  const normalized = times
    .map((value: unknown) => String(value || '').trim())
    .filter((value: string) => value.length > 0);

  if (normalized.length === 0) {
    const frequency = String(route?.frequency || '').trim();
    return frequency ? `ทุก ${frequency}` : 'ไม่ระบุเวลาออก';
  }

  if (normalized.length <= 2) return normalized.join(', ');
  return `${normalized[0]}, ${normalized[1]} +${normalized.length - 2}`;
};

const resolveNewsEndpoint = async (): Promise<string> => {
  if (window.api?.config?.get) {
    try {
      const config = await window.api.config.get();
      if (config.news_api_url) return String(config.news_api_url);
    } catch {
      return '';
    }
  }
  return import.meta.env.VITE_NEWS_API_URL || '';
};

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

const regionOppositeColors: Record<string, string> = {
  central: '#2563eb',
  north: '#16a34a',
  northeast: '#0891b2',
  west: '#dc2626',
  east: '#0ea5e9',
  south: '#f59e0b',
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

const knowledgeToneScaleByRegion: Record<RegionId, [string, string, string, string, string]> = {
  north: ['text-violet-200', 'text-violet-300', 'text-violet-400', 'text-violet-500', 'text-violet-600'],
  northeast: ['text-red-200', 'text-red-300', 'text-red-400', 'text-red-500', 'text-red-600'],
  central: ['text-orange-200', 'text-orange-300', 'text-orange-400', 'text-orange-500', 'text-orange-600'],
  west: ['text-emerald-200', 'text-emerald-300', 'text-emerald-400', 'text-emerald-500', 'text-emerald-600'],
  east: ['text-yellow-200', 'text-yellow-300', 'text-yellow-400', 'text-yellow-500', 'text-yellow-600'],
  south: ['text-blue-200', 'text-blue-300', 'text-blue-400', 'text-blue-500', 'text-blue-600'],
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
  const [originText, setOriginText] = useState('');
  const [destText, setDestText] = useState('');
  const [tripDate, setTripDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeSupplyType, setActiveSupplyType] = useState<SupplyType>('bank');
  const [originSearchOptions, setOriginSearchOptions] = useState<string[]>([]);
  const [destSearchOptions, setDestSearchOptions] = useState<string[]>([]);
  const [isLocatingOrigin, setIsLocatingOrigin] = useState(false);
  const [isLocatingDestination, setIsLocatingDestination] = useState(false);
  const [originLocationError, setOriginLocationError] = useState('');
  const [originLocationHint, setOriginLocationHint] = useState('');
  const [destinationLocationError, setDestinationLocationError] = useState('');
  const [destinationLocationHint, setDestinationLocationHint] = useState('');
  const [speedSortDirection, setSpeedSortDirection] = useState<'fast' | 'slow'>('fast');
  const [priceSortDirection, setPriceSortDirection] = useState<'low' | 'high'>('low');
  const [activePlannerFilter, setActivePlannerFilter] = useState<'speed' | 'price'>('speed');
  const [showPlannerInfoPopup, setShowPlannerInfoPopup] = useState(false);
  const [dangerInfoState, setDangerInfoState] = useState<{ danger: any; index: number } | null>(null);
  const [isNewsPanelOpen, setIsNewsPanelOpen] = useState(false);
  const [isLoadingNewsBriefings, setIsLoadingNewsBriefings] = useState(false);
  const [newsBriefingError, setNewsBriefingError] = useState('');
  const [newsBriefings, setNewsBriefings] = useState<TravelGuideNewsItem[]>([]);
  const [hasLoadedNewsBriefings, setHasLoadedNewsBriefings] = useState(false);
  const [newsLastSyncedAt, setNewsLastSyncedAt] = useState('');
  const [showNewsSyncPopup, setShowNewsSyncPopup] = useState(false);
  const [newsDetailItem, setNewsDetailItem] = useState<TravelGuideNewsItem | null>(null);

  const [syncedAqiMap, setSyncedAqiMap] = useState<Record<string, number>>({});
  const [syncedTempMap, setSyncedTempMap] = useState<Record<string, number>>({});
  const [provinceIndex, setProvinceIndex] = useState<Array<{ id: string; name: string }>>([]);

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
          const nid = normalizeWeatherProvinceId(r.id);
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

        // Group by provinceId and resolve current metrics (prefer today, then latest available)
        const todayStr = new Date().toISOString().split('T')[0];
        const groupedByProvince = new Map<string, { date: string; aqi: number; temperature: number }[]>();
        dbRows.forEach((r) => {
          const nid = normalizeWeatherProvinceId(r.provinceId);
          const list = groupedByProvince.get(nid) || [];
          list.push({ date: r.date, aqi: r.aqi, temperature: r.temperature });
          groupedByProvince.set(nid, list);
        });

        const aqiMap: Record<string, number> = {};
        const tempMap: Record<string, number> = {};
        groupedByProvince.forEach((list, id) => {
          const sorted = [...list].sort((a, b) => b.date.localeCompare(a.date));
          const todayAqi = sorted.find((v) => v.date === todayStr && typeof v.aqi === 'number' && Number.isFinite(v.aqi));
          const latestAqi = sorted.find((v) => typeof v.aqi === 'number' && Number.isFinite(v.aqi));

          const todayTemp = sorted.find((v) => v.date === todayStr && typeof v.temperature === 'number' && Number.isFinite(v.temperature));
          const latestPastTemp = sorted.find((v) => v.date <= todayStr && typeof v.temperature === 'number' && Number.isFinite(v.temperature));
          const latestTemp = sorted.find((v) => typeof v.temperature === 'number' && Number.isFinite(v.temperature));

          const resolvedAqi = todayAqi || latestAqi;
          const resolvedTemp = todayTemp || latestPastTemp || latestTemp;

          if (resolvedAqi) aqiMap[id] = resolvedAqi.aqi;
          if (resolvedTemp) tempMap[id] = resolvedTemp.temperature;
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
          const nid = normalizeWeatherProvinceId(r.id);
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
  }, [showWeatherModal, normalizeWeatherProvinceId]);
  
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

  const selectedWeatherKeyCandidates = useMemo(() => {
    const candidates = [
      selectedProvinceId,
      selectedProvinceName,
      displayName,
      provinceNameToId.get(selectedProvinceName) || '',
      provinceNameToId.get(displayName) || ''
    ];

    const normalized = candidates
      .map((value) => normalizeWeatherProvinceId(value || ''))
      .filter((value) => value.length > 0);

    return Array.from(new Set(normalized));
  }, [displayName, normalizeWeatherProvinceId, provinceNameToId, selectedProvinceId, selectedProvinceName]);

  const getProvinceMetricValue = useCallback((metricMap: Record<string, number>) => {
    for (const key of selectedWeatherKeyCandidates) {
      const value = metricMap[key];
      if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
      }
    }
    return null;
  }, [selectedWeatherKeyCandidates]);

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
  }, [fetchPlannerSearchOptions, originText]);

  useEffect(() => {
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
  }, [destText, fetchPlannerSearchOptions]);

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
      const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
      if (response.ok) {
        const data: {
          latitude?: number | string;
          longitude?: number | string;
          city?: string;
          region?: string;
          region_name?: string;
        } = await response.json();
        const lat = typeof data.latitude === 'string' ? Number(data.latitude) : data.latitude;
        const lng = typeof data.longitude === 'string' ? Number(data.longitude) : data.longitude;
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
          return { lat: Number(lat), lng: Number(lng), city: data.city || '', region: data.region_name || data.region || '' };
        }
      }
    } catch {
      // Ignore and return null below.
      return null;
    }

    return null;
  }, []);

  const applyCurrentLocationToField = useCallback(async (target: 'origin' | 'destination') => {
    const setFieldText = target === 'origin' ? setOriginText : setDestText;
    const setFieldError = target === 'origin' ? setOriginLocationError : setDestinationLocationError;
    const setFieldHint = target === 'origin' ? setOriginLocationHint : setDestinationLocationHint;
    const setFieldLocating = target === 'origin' ? setIsLocatingOrigin : setIsLocatingDestination;

    setFieldError('');
    setFieldHint('');

    const applyApproxLocationFallback = async () => {
      const approx = await fetchApproxLocationFromIp();
      if (!approx) return false;
      const label = await reverseGeocodeCurrentLocation(approx.lat, approx.lng);
      setFieldText(label);
      setFieldHint('ใช้ตำแหน่งโดยประมาณจากเครือข่าย (IP Location)');
      return true;
    };

    if (!navigator.geolocation) {
      const applied = await applyApproxLocationFallback();
      if (!applied) setFieldError('อุปกรณ์นี้ไม่รองรับตำแหน่งปัจจุบัน');
      return;
    }

    setFieldLocating(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 12000,
          maximumAge: 30000,
        });
      });

      const label = await reverseGeocodeCurrentLocation(position.coords.latitude, position.coords.longitude);
      setFieldText(label);
      setFieldHint('');
    } catch (error: any) {
      const rawMessage = String(error?.message || '').toLowerCase();
      const shouldTryApproxFallback = error?.code !== 1 || rawMessage.includes('googleapis') || rawMessage.includes('403');

      if (shouldTryApproxFallback) {
        const applied = await applyApproxLocationFallback();
        if (applied) return;
      }

      if (error?.code === 1) {
        setFieldError('ยังไม่ได้อนุญาตให้เข้าถึงตำแหน่งปัจจุบัน');
      } else if (error?.code === 2) {
        setFieldError('ไม่สามารถอ่านตำแหน่งปัจจุบันได้');
      } else if (error?.code === 3) {
        setFieldError('หมดเวลาในการค้นหาตำแหน่งปัจจุบัน');
      } else {
        setFieldError('เกิดข้อผิดพลาดในการค้นหาตำแหน่งปัจจุบัน');
      }
    } finally {
      setFieldLocating(false);
    }
  }, [fetchApproxLocationFromIp, reverseGeocodeCurrentLocation]);

  const handleUseCurrentOriginLocation = useCallback(async () => {
    await applyCurrentLocationToField('origin');
  }, [applyCurrentLocationToField]);

  const handleUseCurrentDestinationLocation = useCallback(async () => {
    await applyCurrentLocationToField('destination');
  }, [applyCurrentLocationToField]);

  const handleOriginInputChange = useCallback((value: string) => {
    setOriginText(value);
    if (originLocationHint) setOriginLocationHint('');
    if (originLocationError) setOriginLocationError('');
  }, [originLocationError, originLocationHint]);

  const handleDestinationInputChange = useCallback((value: string) => {
    setDestText(value);
    if (destinationLocationHint) setDestinationLocationHint('');
    if (destinationLocationError) setDestinationLocationError('');
  }, [destinationLocationError, destinationLocationHint]);

  const switchToRegion = useCallback((regionId: string, province?: string) => {
    setActiveRegion(regionId);
    setSelectedProvinceName(province || defaultProvincePerRegion[regionId] || '');
    setActiveTransportTab('');
    setOriginLocationHint('');
    setDestinationLocationHint('');
    setOriginLocationError('');
    setDestinationLocationError('');
    setIsNewsPanelOpen(false);
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
      setOriginLocationHint('');
      setDestinationLocationHint('');
      setOriginLocationError('');
      setDestinationLocationError('');
      setIsNewsPanelOpen(false);
    }
  }, [activeRegion, switchToRegion]);

  useEffect(() => {
    setHasLoadedNewsBriefings(false);
    setNewsBriefings([]);
    setNewsBriefingError('');
    setNewsLastSyncedAt('');
  }, [selectedProvinceId]);

  const openProvinceDetail = useCallback(() => {
    if (!selectedProvinceId) return;
    navigate(`/province/${activeRegion}/${selectedProvinceId}`);
  }, [activeRegion, navigate, selectedProvinceId]);

  const plannerOrigin = originText.trim();
  const plannerDestination = destText.trim();
  const hasPlannerEndpoints = plannerOrigin.length > 0 && plannerDestination.length > 0;

  const condition = useMemo(() => {
    return getTravelConditionForDate(tripDate, activeRegion);
  }, [activeRegion, tripDate]);

  const routeRecommendations = useMemo(() => {
    const rawRoutes = Array.isArray((portal as any)?.transportRoutes) ? (portal as any).transportRoutes : [];
    if (rawRoutes.length === 0) return [] as any[];

    const normalize = (value: unknown) => String(value || '').trim().toLowerCase();
    const normalizedOrigin = normalize(plannerOrigin);
    const normalizedDestination = normalize(plannerDestination);

    const endpointMatchedRoutes = rawRoutes.filter((route: any) => {
      const from = normalize(route?.from);
      const to = normalize(route?.to);
      const via = Array.isArray(route?.via) ? route.via.map((v: unknown) => normalize(v)) : [];

      if (!normalizedOrigin || !normalizedDestination) return true;

      const directHit = (from.includes(normalizedOrigin) && to.includes(normalizedDestination))
        || (from.includes(normalizedDestination) && to.includes(normalizedOrigin));
      if (directHit) return true;

      const viaHit = via.some((node: string) => node.includes(normalizedOrigin) || node.includes(normalizedDestination));
      return viaHit;
    });

    const candidateRoutes = endpointMatchedRoutes.length > 0 ? endpointMatchedRoutes : rawRoutes;

    const trafficPenaltyByType: Record<string, number> = {
      rail: 0,
      plane: 0,
      boat: condition.trafficRisk === 'high' ? 1 : 0,
      bus: condition.trafficRisk === 'high' ? 3 : 1,
      van: condition.trafficRisk === 'high' ? 2 : 1,
      bike: condition.isRaining ? 3 : 1,
      other: 2,
    };

    const normalizedRoutes = candidateRoutes.map((route: any) => {
      const fare = Number(route?.baseFare);
      const normalizedType = normalizeTransportType(String(route?.type || 'other'));
      const durationMin = parseDurationToMinutes(route?.duration);
      const trafficPenalty = trafficPenaltyByType[normalizedType] ?? 2;
      const effectiveDuration = durationMin === null ? Number.POSITIVE_INFINITY : durationMin + (trafficPenalty * 8);
      return {
        ...route,
        __type: normalizedType,
        __fare: Number.isFinite(fare) ? fare : null,
        __durationMin: durationMin,
        __effectiveDuration: effectiveDuration,
      };
    });

    return [...normalizedRoutes]
      .sort((a: any, b: any) => {
        const speedSort = speedSortDirection === 'fast'
          ? a.__effectiveDuration - b.__effectiveDuration
          : b.__effectiveDuration - a.__effectiveDuration;

        const priceSort = priceSortDirection === 'low'
          ? (a.__fare ?? Number.POSITIVE_INFINITY) - (b.__fare ?? Number.POSITIVE_INFINITY)
          : (b.__fare ?? Number.NEGATIVE_INFINITY) - (a.__fare ?? Number.NEGATIVE_INFINITY);

        if (activePlannerFilter === 'speed') {
          if (speedSort !== 0) return speedSort;
          if (priceSort !== 0) return priceSort;
        } else {
          if (priceSort !== 0) return priceSort;
          if (speedSort !== 0) return speedSort;
        }

        const rawDurationSort = speedSortDirection === 'fast'
          ? (a.__durationMin ?? Number.POSITIVE_INFINITY) - (b.__durationMin ?? Number.POSITIVE_INFINITY)
          : (b.__durationMin ?? Number.NEGATIVE_INFINITY) - (a.__durationMin ?? Number.NEGATIVE_INFINITY);
        if (rawDurationSort !== 0) return rawDurationSort;

        return String(a.name || '').localeCompare(String(b.name || ''));
      })
      .slice(0, 6);
  }, [activePlannerFilter, condition.isRaining, condition.trafficRisk, plannerDestination, plannerOrigin, portal, priceSortDirection, speedSortDirection]);

  const plannerOppositeColor = regionOppositeColors[activeRegion] || '#38bdf8';
  const trafficToneByRisk = condition.trafficRisk === 'high' ? 0.36 : condition.trafficRisk === 'medium' ? 0.28 : 0.22;

  const speedFilterActiveStyle: React.CSSProperties = {
    background: `linear-gradient(90deg, ${toRgba(accent, 0.72)} 0%, ${toRgba(accent, 0.5)} 100%)`,
    border: `1px solid ${toRgba(accent, 0.82)}`,
    color: '#ffffff',
  };

  const priceFilterActiveStyle: React.CSSProperties = {
    background: `linear-gradient(90deg, ${toRgba(accentSecondary, 0.56)} 0%, ${toRgba(accent, 0.42)} 100%)`,
    border: `1px solid ${toRgba(accentSecondary, 0.72)}`,
    color: '#ffffff',
  };

  const plannerFilterInactiveStyle: React.CSSProperties = {
    background: toRgba('#9ca3af', 0.14),
    border: `1px solid ${toRgba('#9ca3af', 0.36)}`,
    color: '#94a3b8',
  };

  const trafficBadgeStyle: React.CSSProperties = {
    background: toRgba(plannerOppositeColor, trafficToneByRisk),
    border: `1px solid ${toRgba(plannerOppositeColor, 0.75)}`,
    color: '#f8fafc',
  };

  const plannerInfoButtonStyle: React.CSSProperties = {
    background: toRgba(plannerOppositeColor, 0.14),
    border: `1px solid ${toRgba(plannerOppositeColor, 0.42)}`,
    color: '#e2e8f0',
  };

  const dangerNewsHeaderActiveStyle: React.CSSProperties = {
    border: `1px solid ${toRgba('#9ca3af', 0.52)}`,
    background: `linear-gradient(90deg, ${toRgba('#6b7280', 0.3)} 0%, ${toRgba('#4b5563', 0.4)} 100%)`,
    color: '#f8fafc',
  };

  const dangerNewsHeaderInactiveStyle: React.CSSProperties = {
    border: `1px solid ${toRgba('#1f2937', 0.9)}`,
    background: 'rgba(4, 8, 14, 0.98)',
    color: '#64748b',
  };

  const provinceDetailButtonStyle: React.CSSProperties = {
    background: 'rgba(0, 0, 0, 0.82)',
    borderColor: toRgba(accent, 0.58),
    color: accent,
  };

  const openPlannerWarpLocation = useCallback(() => {
    navigate(`/province/${activeRegion}/${selectedProvinceId}`, {
      state: {
        focusPlace: {
          title: plannerDestination || displayName,
          autoFocus: false,
          lat: provinceCoordinates[selectedProvinceName]?.lat || provinceCoordinates[displayName]?.lat || 13.7563,
          lng: provinceCoordinates[selectedProvinceName]?.lng || provinceCoordinates[displayName]?.lng || 100.5018,
        }
      }
    });
    setShowPlannerInfoPopup(false);
  }, [activeRegion, displayName, navigate, plannerDestination, selectedProvinceId, selectedProvinceName]);

  const plannerLocationStatus = useMemo(() => {
    if (originLocationHint) return originLocationHint;
    if (destinationLocationHint) return destinationLocationHint;
    return '';
  }, [destinationLocationHint, originLocationHint]);

  const provinceBaseCoordinate = useMemo(() => {
    return provinceCoordinates[selectedProvinceName] || provinceCoordinates[displayName] || { lat: 13.7563, lng: 100.5018 };
  }, [displayName, selectedProvinceName]);

  const getDangerHotspot = useCallback((index: number) => {
    const offsetLat = [0.08, -0.05, 0.03, -0.07][index % 4];
    const offsetLng = [0.07, -0.04, -0.06, 0.05][index % 4];
    return {
      lat: provinceBaseCoordinate.lat + offsetLat,
      lng: provinceBaseCoordinate.lng + offsetLng,
      radiusKm: 4 + (index % 3) * 2,
    };
  }, [provinceBaseCoordinate.lat, provinceBaseCoordinate.lng]);

  const buildLongdoMapUrl = useCallback((lat: number, lng: number, keyword: string) => {
    return `https://map.longdo.com/?lat=${lat}&lon=${lng}&zoom=12&keyword=${encodeURIComponent(keyword)}`;
  }, []);

  const normalizeProvinceNewsId = useCallback((value: string) => {
    return normalizeWeatherProvinceId(value || '');
  }, [normalizeWeatherProvinceId]);

  const buildMockProvinceNews = useCallback((): TravelGuideNewsItem[] => {
    const baseTitle = plannerDestination || displayName;
    const now = new Date();
    const mkDate = (daysAgo: number) => {
      const d = new Date(now);
      d.setDate(now.getDate() - daysAgo);
      return d.toISOString();
    };

    return [
      {
        id: `${selectedProvinceId}-news-1`,
        title: `อัปเดตจราจรช่วงเร่งด่วนรอบ ${baseTitle}`,
        source: 'Province News',
        url: '',
        publishedAt: mkDate(2),
        tag: 'การจราจร',
        impact: 'medium',
        summary: `มีการจราจรหนาแน่นบางช่วงเวลาในพื้นที่ใกล้ ${baseTitle} ควรหลีกเลี่ยงจุดคอขวดช่วง 07:00-09:00 และ 17:00-19:00`,
      },
      {
        id: `${selectedProvinceId}-news-2`,
        title: `เตือนฝนสะสมในบางจุดของจังหวัด${displayName}`,
        source: 'Province News',
        url: '',
        publishedAt: mkDate(5),
        tag: 'สภาพอากาศ',
        impact: 'high',
        summary: 'ควรตรวจสอบสภาพอากาศก่อนเดินทางและเตรียมเวลาเผื่ออย่างน้อย 20-30 นาทีในเส้นทางหลัก',
      },
      {
        id: `${selectedProvinceId}-news-3`,
        title: `สรุปความปลอดภัยเส้นทางหลักของจังหวัด${displayName}`,
        source: 'Province News',
        url: '',
        publishedAt: mkDate(18),
        tag: 'ความปลอดภัย',
        impact: 'medium',
        summary: 'มีการเพิ่มจุดตรวจและกำชับการใช้ความเร็วในเส้นทางที่เกิดอุบัติเหตุซ้ำซ้อนบ่อย',
      },
      {
        id: `${selectedProvinceId}-news-4`,
        title: `หน่วยงานท้องถิ่นปรับแผนรับนักท่องเที่ยวช่วงเทศกาล`,
        source: 'Province News',
        url: '',
        publishedAt: mkDate(47),
        tag: 'การท่องเที่ยว',
        impact: 'low',
        summary: 'เน้นการกระจายคนออกจากแหล่งท่องเที่ยวหลักไปจุดรอง เพื่อลดความแออัด',
      },
      {
        id: `${selectedProvinceId}-news-5`,
        title: `รายงานสถิติพื้นที่เสี่ยงในช่วง 3 เดือนที่ผ่านมา`,
        source: 'Province News',
        url: '',
        publishedAt: mkDate(91),
        tag: 'สถิติ',
        impact: 'medium',
        summary: 'จุดเสี่ยงหลักยังอยู่ในพื้นที่ทางร่วมทางแยกและเส้นทางขนส่งหลักของจังหวัด',
      },
    ];
  }, [displayName, plannerDestination, selectedProvinceId]);

  const loadProvinceNewsBriefings = useCallback(async (forceSync = false) => {
    setIsLoadingNewsBriefings(true);
    setNewsBriefingError('');

    try {
      let stories: TravelGuideNewsItem[] = [];
      const endpoint = await resolveNewsEndpoint();

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'GET',
          cache: forceSync ? 'no-store' : 'default',
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`โหลดข่าวไม่สำเร็จ (${response.status})`);
        }

        const payload = await response.json();
        const summaries = Array.isArray(payload) ? payload : [];

        const provinceCandidates = new Set([
          normalizeProvinceNewsId(selectedProvinceId),
          normalizeProvinceNewsId(selectedProvinceName),
          normalizeProvinceNewsId(displayName),
        ]);

        const matched = summaries.find((summary: any) => {
          const id = normalizeProvinceNewsId(String(summary?.id || summary?.name || ''));
          return provinceCandidates.has(id);
        });

        const sourceStories = Array.isArray(matched?.topStories)
          ? matched.topStories
          : [];

        stories = sourceStories.map((story: any, index: number) => ({
          id: String(story?.id || `${selectedProvinceId}-api-${index}`),
          title: String(story?.title || 'ไม่มีหัวข้อข่าว'),
          source: String(story?.source || 'News API'),
          url: String(story?.url || ''),
          publishedAt: String(story?.publishedAt || new Date().toISOString()),
          tag: String(story?.tag || 'ทั่วไป'),
          impact: (story?.impact === 'low' || story?.impact === 'medium' || story?.impact === 'high') ? story.impact : 'medium',
          summary: String(story?.summary || story?.title || 'ไม่มีสรุปข่าว'),
        }));
      }

      const fallbackStories = buildMockProvinceNews();
      const allStories = stories.length > 0 ? stories : fallbackStories;

      const now = Date.now();
      const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
      const oneYearAgo = now - (365 * 24 * 60 * 60 * 1000);

      const normalized = allStories
        .map((item) => {
          const time = new Date(item.publishedAt).getTime();
          return { item, time: Number.isFinite(time) ? time : 0 };
        })
        .filter((entry) => entry.time >= oneYearAgo)
        .sort((a, b) => b.time - a.time);

      const weekSet = normalized.filter((entry) => entry.time >= sevenDaysAgo).map((entry) => entry.item);
      const yearSet = normalized.map((entry) => entry.item);
      const prioritized = (weekSet.length >= 2 ? weekSet : yearSet).slice(0, 5);

      setNewsBriefings(prioritized.length > 0 ? prioritized : fallbackStories);
      setHasLoadedNewsBriefings(true);
      setNewsLastSyncedAt(new Date().toISOString());
    } catch (error: any) {
      setNewsBriefings(buildMockProvinceNews());
      setHasLoadedNewsBriefings(true);
      setNewsLastSyncedAt(new Date().toISOString());
      setNewsBriefingError(String(error?.message || 'ไม่สามารถโหลดข่าวได้'));
    } finally {
      setIsLoadingNewsBriefings(false);
    }
  }, [buildMockProvinceNews, displayName, normalizeProvinceNewsId, selectedProvinceId, selectedProvinceName]);

  useEffect(() => {
    if (!isNewsPanelOpen || hasLoadedNewsBriefings || isLoadingNewsBriefings) return;
    void loadProvinceNewsBriefings(false);
  }, [hasLoadedNewsBriefings, isLoadingNewsBriefings, isNewsPanelOpen, loadProvinceNewsBriefings]);

  const handleSyncProvinceNews = useCallback(async () => {
    await loadProvinceNewsBriefings(true);
    setIsNewsPanelOpen(true);
    setShowNewsSyncPopup(false);
  }, [loadProvinceNewsBriefings]);

  const handleShowDangerPanel = useCallback(() => {
    setIsNewsPanelOpen(false);
  }, []);

  const handleShowNewsPanel = useCallback(() => {
    setDangerInfoState(null);
    setIsNewsPanelOpen(true);
  }, []);

  const dangerInfoHotspot = useMemo(() => {
    if (!dangerInfoState) return null;
    return getDangerHotspot(dangerInfoState.index);
  }, [dangerInfoState, getDangerHotspot]);

  const dangerInfoLongdoUrl = useMemo(() => {
    if (!dangerInfoState || !dangerInfoHotspot) return '';
    return buildLongdoMapUrl(dangerInfoHotspot.lat, dangerInfoHotspot.lng, `${displayName} ${dangerInfoState.danger?.label || ''}`);
  }, [buildLongdoMapUrl, dangerInfoHotspot, dangerInfoState, displayName]);

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
        const value = syncedAqiMap[normalizeWeatherProvinceId(id)];
        return typeof value === 'number' && Number.isFinite(value) ? value : null;
      })
      .filter((value): value is number => value !== null);

    if (values.length === 0) return null;
    const total = values.reduce((sum, value) => sum + value, 0);
    return Math.round(total / values.length);
  }, [activeRegion, normalizeKey, normalizeWeatherProvinceId, provinceNameToId, syncedAqiMap]);

  const currentAqi = getProvinceMetricValue(syncedAqiMap) ?? regionAvgAqi ?? brief.avgAqi;
  const currentTemp = getProvinceMetricValue(syncedTempMap); // null = ไม่มีข้อมูลวันนี้
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
      <div className="shrink-0 flex items-center pr-[120px] pl-4 py-3 gap-3 relative"
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
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-sm text-white/90 flex-1 max-w-[340px] justify-start shadow-sm">
          <Search size={16} />
          <span className="truncate">{hasPlannerEndpoints ? `${plannerOrigin} → ${plannerDestination}` : 'กำหนดต้นทาง/ปลายทางที่การ์ดแผนเที่ยวด้านล่าง'}</span>
        </div>
        <button
          onClick={openProvinceDetail}
          title={`เปิด Province Detail ของ ${displayName}`}
          className="absolute right-[132px] top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-black/95 transition-all shadow-sm"
          style={provinceDetailButtonStyle}
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
                    <div className="font-bold text-white leading-tight">{currentTemp !== null ? `${currentTemp.toFixed(1)}°C` : brief.climate.split(',')[0].replace('อุณหภูมิ ', '')}</div>
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
            <DashCard title="Environment / Ecology" icon={<CloudRain size={14} />} accent={accent} className="h-[232px]" contentClassName="overflow-y-auto custom-scrollbar pr-1" headerStyle={sectionHeaderStyle} fullBleedHeader>
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
             <DashCard title="Knowledge / Tips" icon={<Lightbulb size={14} />} accent={accent} className="h-[232px]" contentClassName="overflow-y-auto custom-scrollbar pr-1" headerStyle={sectionHeaderStyle} fullBleedHeader>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {knowledgeTips.length > 0 ? knowledgeTips.map((k: any, i: number) => (
                    <li key={i}><div className={`font-bold text-[11px] ${knowledgeToneScale[i % knowledgeToneScale.length]}`}>{k.title}</div><div className="text-[10px] text-slate-300">{k.content}</div></li>
                )) : <li className="text-slate-500">ยังไม่มีข้อมูลแนะนำ</li>}
              </ul>
            </DashCard>

            <DashCard title="Supply / Facilities" icon={<Landmark size={14} />} accent={accent} className="h-[232px]" contentClassName="overflow-hidden" headerStyle={sectionHeaderStyle} fullBleedHeader>
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
                          <div className={`text-[11px] font-bold truncate flex-1 ${knowledgeToneScale[i % knowledgeToneScale.length]}`}>{s.label}</div>
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
            <DashCard
              title=""
              icon={<AlertTriangle size={14} />}
              accent="#ef4444"
              className="h-full min-h-0"
              contentClassName="overflow-hidden"
              headerStyle={sectionHeaderStyle}
              fullBleedHeader
              headerLeft={(
                <div className="-my-2 min-w-0 w-[calc(100%+24px)] -mx-3">
                  <div className="flex min-w-0 w-full h-9">
                    <button
                      type="button"
                      onClick={handleShowDangerPanel}
                      className="flex-1 h-full px-2 rounded-none text-[10px] font-bold flex items-center justify-center gap-1.5 truncate"
                      style={isNewsPanelOpen ? dangerNewsHeaderInactiveStyle : dangerNewsHeaderActiveStyle}
                    >
                      <AlertTriangle size={12} className="text-white shrink-0" />
                      จุดเสี่ยง/อันตราย
                    </button>
                    <button
                      type="button"
                      onClick={handleShowNewsPanel}
                      className="flex-1 h-full px-2 rounded-none text-[10px] font-bold truncate"
                      style={isNewsPanelOpen ? dangerNewsHeaderActiveStyle : dangerNewsHeaderInactiveStyle}
                    >
                      Province News
                    </button>
                  </div>
                </div>
              )}
            >
              <div className="h-full min-h-0 flex flex-col gap-0">
                {!isNewsPanelOpen ? (
                  <>
                    <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar pr-1">
                      {portal.dangerZones?.length > 0 ? (
                        <ul className="space-y-1.5 text-xs">
                          {portal.dangerZones.map((d: any, i: number) => (
                            <li key={i} className="flex items-start justify-between gap-2 rounded-md px-1 py-1 hover:bg-white/[0.03]">
                              <div className="flex items-start gap-1.5 min-w-0">
                                <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${d.severity === 'high' ? 'bg-red-500' : d.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                                <div className="min-w-0">
                                  <span className="text-white font-bold">{d.label}</span>
                                  <span className="text-slate-400"> — {d.note}</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                title={`ดูจุดเสี่ยงของ ${d.label}`}
                                onClick={() => setDangerInfoState({ danger: d, index: i })}
                                className="w-5 h-5 rounded border border-slate-500/35 bg-slate-500/12 text-slate-400 hover:bg-slate-500/20 hover:text-slate-300 flex items-center justify-center shrink-0"
                              >
                                <Info size={10} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : <p className="text-xs text-slate-500">ไม่มีข้อมูล</p>}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="min-h-0 flex-1 flex flex-col">
                      <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-1.5">
                        {isLoadingNewsBriefings ? (
                          <div className="text-[10px] text-slate-400">กำลังดึงข่าวล่าสุด...</div>
                        ) : newsBriefings.length > 0 ? (
                          newsBriefings.map((item, i) => (
                            <div key={item.id} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
                              <div className="flex items-start justify-between gap-2">
                                <div className={`text-[10px] font-bold leading-tight ${knowledgeToneScale[i % knowledgeToneScale.length]}`}>{item.title}</div>
                                <button
                                  type="button"
                                  title="เปิดสรุปข่าว"
                                  onClick={() => setNewsDetailItem(item)}
                                  className="w-5 h-5 rounded border border-sky-400/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 flex items-center justify-center shrink-0"
                                >
                                  <Info size={10} />
                                </button>
                              </div>
                              <div className="text-[9px] text-slate-500 mt-0.5">
                                {item.source} • {new Date(item.publishedAt).toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-[10px] text-slate-500">ไม่พบข่าวล่าสุดสำหรับจังหวัดนี้</div>
                        )}

                        {newsBriefingError && (
                          <div className="text-[10px] text-amber-300">{newsBriefingError}</div>
                        )}
                        {newsLastSyncedAt && (
                          <div className="text-[9px] text-slate-500">อัปเดตล่าสุด: {new Date(newsLastSyncedAt).toLocaleString('th-TH')}</div>
                        )}
                      </div>
                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          title="Sync ข่าวล่าสุดแบบเรียลไทม์"
                          onClick={() => setShowNewsSyncPopup(true)}
                          className="w-6 h-6 rounded border border-sky-400/35 bg-sky-500/12 text-sky-300 hover:bg-sky-500/20 flex items-center justify-center"
                        >
                          <RefreshCw size={11} className={isLoadingNewsBriefings ? 'animate-spin' : ''} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </DashCard>
            
            <div className="rounded-xl border p-3 flex flex-col bg-white/5 h-full min-h-0" style={{ borderColor: toRgba(accent, 0.12) }}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="grid grid-cols-2 gap-2.5 flex-1 text-[10px] text-slate-400 font-semibold">
                  <div>ต้นทาง</div>
                  <div>ปลายทาง</div>
                </div>
                {plannerLocationStatus && (
                  <div className="text-[9px] text-slate-400/90 truncate max-w-[48%]">{plannerLocationStatus}</div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <input
                      list="trip-origin-options"
                      value={originText}
                      onChange={e => handleOriginInputChange(e.target.value)}
                      placeholder="ต้นทาง เช่น บางนา, เชียงใหม่"
                      className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                    <button
                      type="button"
                      title="ใช้ตำแหน่งปัจจุบันเป็นต้นทาง"
                      onClick={handleUseCurrentOriginLocation}
                      disabled={isLocatingOrigin}
                      className="w-9 h-9 rounded-lg border border-slate-400/30 bg-slate-500/10 text-slate-300 hover:bg-slate-500/20 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <LocateFixed size={14} className={isLocatingOrigin ? 'animate-spin' : ''} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <input
                      list="trip-destination-options"
                      value={destText}
                      onChange={e => handleDestinationInputChange(e.target.value)}
                      placeholder="ปลายทาง เช่น วัดอรุณ, BTS สยาม"
                      className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                    <button
                      type="button"
                      title="ใช้ตำแหน่งปัจจุบันเป็นปลายทาง"
                      onClick={handleUseCurrentDestinationLocation}
                      disabled={isLocatingDestination}
                      className="w-9 h-9 rounded-lg border border-slate-400/30 bg-slate-500/10 text-slate-300 hover:bg-slate-500/20 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <LocateFixed size={14} className={isLocatingDestination ? 'animate-spin' : ''} />
                    </button>
                  </div>
                </div>
              </div>

              <datalist id="trip-origin-options">
                {plannerOriginOptions.map((option) => (
                  <option key={`origin-${option}`} value={option} />
                ))}
              </datalist>
              <datalist id="trip-destination-options">
                {plannerDestinationOptions.map((option) => (
                  <option key={`destination-${option}`} value={option} />
                ))}
              </datalist>

              {originLocationError && (
                <div className="mt-1 text-[10px] text-rose-400">{originLocationError}</div>
              )}
              {destinationLocationError && (
                <div className="mt-1 text-[10px] text-rose-400">{destinationLocationError}</div>
              )}

              <div className="mt-2 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 items-center">
                <input
                  title="เลือกวันที่เดินทาง"
                  type="date"
                  value={tripDate}
                  onChange={e => setTripDate(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                  style={{ colorScheme: 'dark' }}
                />
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSpeedSortDirection((prev) => prev === 'fast' ? 'slow' : 'fast');
                      setActivePlannerFilter('speed');
                    }}
                    className="px-2.5 py-2 rounded-lg text-[10px] font-bold transition-all"
                    style={activePlannerFilter === 'speed' ? speedFilterActiveStyle : plannerFilterInactiveStyle}
                  >
                    {speedSortDirection === 'fast' ? 'เร็วสุด' : 'ช้าสุด'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPriceSortDirection((prev) => prev === 'low' ? 'high' : 'low');
                      setActivePlannerFilter('price');
                    }}
                    className="px-2.5 py-2 rounded-lg text-[10px] font-bold transition-all"
                    style={activePlannerFilter === 'price' ? priceFilterActiveStyle : plannerFilterInactiveStyle}
                  >
                    {priceSortDirection === 'low' ? 'ถูกสุด' : 'แพงสุด'}
                  </button>
                </div>
              </div>

              <div className="mt-2.5 flex-1 min-h-0 rounded-lg border border-white/10 bg-black/30 p-2.5 overflow-y-auto custom-scrollbar pr-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="text-[10px] text-slate-400">วันที่เดินทาง: {tripDate}</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] px-1.5 py-0.5 rounded border font-bold" style={trafficBadgeStyle}>
                      Traffic: {condition.trafficRisk.toUpperCase()}
                    </span>
                    <button
                      type="button"
                      title="ดูคำแนะนำการเดินทาง"
                      onClick={() => setShowPlannerInfoPopup(true)}
                      className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center"
                      style={plannerInfoButtonStyle}
                    >
                      <Info size={12} />
                    </button>
                  </div>
                </div>

                {routeRecommendations.length > 0 ? (
                  <div className="space-y-1.5">
                    {routeRecommendations.map((route: any, index: number) => {
                      const routeKey = route.id || `${route.from}-${route.to}-${route.name}`;
                      const departureText = formatRouteDeparture(route);
                      const shade = [0.16, 0.24, 0.32, 0.4][index % 4];
                      const durationText = route.__durationMin === null
                        ? (route.duration || 'ไม่ระบุเวลาเดินทาง')
                        : `${route.__durationMin} นาที`;

                      return (
                        <div
                          key={routeKey}
                          className="rounded-md border overflow-hidden"
                          style={{
                            borderColor: toRgba(plannerOppositeColor, Math.min(0.72, shade + 0.24)),
                            background: toRgba('#05080d', 0.94),
                          }}
                        >
                          <div
                            className="flex items-center justify-between gap-2 px-2 py-1.5 border-b"
                            style={{
                              background: `linear-gradient(90deg, ${toRgba(plannerOppositeColor, Math.min(0.62, shade + 0.18))} 0%, ${toRgba(plannerOppositeColor, Math.max(0.18, shade - 0.02))} 100%)`,
                              borderColor: toRgba(plannerOppositeColor, 0.42),
                            }}
                          >
                            <div className="text-[10px] font-bold text-white truncate">{route.name || `${route.from} → ${route.to}`}</div>
                            <div className="flex items-center gap-1">
                              {index === 0 && (
                                <span
                                  className="text-[8px] px-1 py-0.5 rounded border font-bold"
                                  style={{
                                    borderColor: toRgba('#ffffff', 0.45),
                                    background: toRgba('#ffffff', 0.16),
                                    color: '#f8fafc',
                                  }}
                                >
                                  แนะนำ
                                </span>
                              )}
                            </div>
                          </div>
                          <div
                            className="text-[9px] text-slate-300 truncate px-2 py-1"
                            style={{ background: toRgba(plannerOppositeColor, Math.max(0.08, shade - 0.1)) }}
                          >
                            {departureText} • {durationText} • {route.__fare === null ? 'ไม่ระบุราคา' : `฿${Number(route.__fare).toLocaleString()}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-[10px] text-slate-500">ยังไม่มีเส้นทางจากฐานข้อมูลสำหรับจังหวัดนี้</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPlannerInfoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowPlannerInfoPopup(false)}>
          <div className="w-full max-w-[420px] bg-[#0e1116] border border-white/10 rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-black text-white">คำแนะนำการเดินทาง</h3>
              <span className="text-[10px] px-2 py-1 rounded border font-bold" style={trafficBadgeStyle}>
                Traffic: {condition.trafficRisk.toUpperCase()}
              </span>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed bg-white/5 border border-white/10 rounded-xl p-3">
              {condition.advice}
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {condition.isHoliday && (
                <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
                  วันหยุด/เทศกาล: รถอาจติดมากกว่าปกติ
                </span>
              )}
              {condition.isRaining && (
                <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded border border-sky-500/30">
                  มีโอกาสฝนตก: ควรเผื่อเวลาเดินทางเพิ่ม
                </span>
              )}
              {!condition.isHoliday && !condition.isRaining && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  สภาพการเดินทางปกติ: เลือกเส้นทางตาม filter ได้เลย
                </span>
              )}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
              <div className="text-[10px] text-slate-400 mb-1">ปลายทางที่ต้องการโฟกัสบนแผนที่จังหวัด</div>
              <div className="text-sm font-bold text-white truncate">{plannerDestination || displayName}</div>
              <button
                type="button"
                onClick={openPlannerWarpLocation}
                className="mt-3 w-full py-2 rounded-lg text-xs font-bold text-white"
                style={{
                  background: toRgba(plannerOppositeColor, 0.32),
                  border: `1px solid ${toRgba(plannerOppositeColor, 0.55)}`,
                }}
              >
                Warp to that location
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowPlannerInfoPopup(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-white/5 text-xs text-white font-bold hover:bg-white/10"
            >
              ปิด
            </button>
          </div>
        </div>
      )}

      {dangerInfoState && dangerInfoHotspot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm" onClick={() => setDangerInfoState(null)}>
          <div className="w-full max-w-[520px] bg-[#0e1116] border border-white/10 rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-base font-black text-white">จุดเสี่ยง: {dangerInfoState.danger?.label || 'ไม่ระบุ'}</h3>
              <button
                type="button"
                onClick={() => setDangerInfoState(null)}
                className="text-[10px] px-2 py-1 rounded border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
              >
                ปิด
              </button>
            </div>

            <div className="text-[11px] text-slate-300 mb-3">{dangerInfoState.danger?.note || 'ไม่มีรายละเอียดเพิ่มเติม'}</div>

            <div className="rounded-xl border border-white/10 bg-[#070a11] p-3">
              <div className="text-[10px] text-slate-400 mb-2">Longdo Map Mockup + พื้นที่เสี่ยงแบบสถิติ</div>
              <div className="relative h-44 rounded-lg border border-white/10 overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_70%_65%,rgba(248,113,113,0.14),transparent_55%),#05070d]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute left-[26%] top-[30%] w-28 h-28 rounded-full border-2 border-dashed border-rose-300/80 bg-rose-500/12" />
                <div className="absolute left-[35%] top-[39%] w-2 h-2 rounded-full bg-rose-300 shadow-[0_0_0_8px_rgba(244,63,94,0.24)]" />
                <div className="absolute bottom-2 right-2 text-[9px] text-slate-300 bg-black/45 px-2 py-1 rounded">Lat {dangerInfoHotspot.lat.toFixed(4)}, Lng {dangerInfoHotspot.lng.toFixed(4)}</div>
              </div>
              <div className="mt-2 text-[10px] text-slate-500">รัศมีจุดเสี่ยงโดยประมาณ: {dangerInfoHotspot.radiusKm} กม.</div>
            </div>

            <a
              href={dangerInfoLongdoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-cyan-400/40 bg-cyan-500/15 py-2 text-xs font-bold text-cyan-100 hover:bg-cyan-500/25"
            >
              เปิด Longdo Map
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}

      {newsDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setNewsDetailItem(null)}>
          <div className="w-full max-w-[520px] bg-[#0e1116] border border-white/10 rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-black text-white">สรุปข่าวจังหวัด</h3>
              <button
                type="button"
                onClick={() => setNewsDetailItem(null)}
                className="text-[10px] px-2 py-1 rounded border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
              >
                ปิด
              </button>
            </div>

            <div className="text-sm font-bold text-white leading-snug">{newsDetailItem.title}</div>
            <div className="mt-1 text-[10px] text-slate-500">
              {newsDetailItem.source} • {new Date(newsDetailItem.publishedAt).toLocaleString('th-TH')}
            </div>
            <div className="mt-3 text-xs text-slate-300 leading-relaxed rounded-xl border border-white/10 bg-white/5 p-3">
              {newsDetailItem.summary}
            </div>

            {newsDetailItem.url && (
              <a
                href={newsDetailItem.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-cyan-300 hover:text-cyan-200"
              >
                เปิดข่าวต้นฉบับ
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      )}

      {showNewsSyncPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowNewsSyncPopup(false)}>
          <div className="w-full max-w-[420px] bg-[#0e1116] border border-white/10 rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-black text-white mb-2">Sync Province News</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              ระบบจะเรียก API ข่าวแบบเรียลไทม์เมื่อคุณกดยืนยัน เพื่อหลีกเลี่ยงการโหลดค้างไว้ตลอดเวลาและลดภาระทรัพยากรเครื่อง.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowNewsSyncPopup(false)}
                className="flex-1 py-2 rounded-lg border border-white/15 bg-white/5 text-xs text-slate-200 hover:bg-white/10"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleSyncProvinceNews}
                className="flex-1 py-2 rounded-lg border border-sky-400/40 bg-sky-500/20 text-xs font-bold text-sky-100 hover:bg-sky-500/30"
              >
                Sync Now
              </button>
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

function DashCard({ title, icon, accent, children, className = '', contentClassName = 'overflow-y-auto custom-scrollbar pr-1', headerStyle, fullBleedHeader = false, headerLeft, headerRight }: { title: string; icon: React.ReactNode; accent: string; children: React.ReactNode; className?: string; contentClassName?: string; headerStyle?: React.CSSProperties; fullBleedHeader?: boolean; headerLeft?: React.ReactNode; headerRight?: React.ReactNode }) {
  const hasHeaderRight = Boolean(headerRight);

  return (
    <div className={`rounded-xl border p-3 flex flex-col transition-all hover:bg-white/[0.02] ${fullBleedHeader ? 'overflow-hidden' : ''} ${className}`} style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
      <div className={`${fullBleedHeader ? '-mx-3 -mt-3 px-3 py-2 mb-3' : 'mb-3 pb-2 border-b border-white/5'} flex items-center ${hasHeaderRight ? 'justify-between gap-2' : 'justify-start'}`} style={headerStyle}>
        {headerLeft ? (
          <div className={hasHeaderRight ? 'min-w-0 flex-1' : 'w-full'}>{headerLeft}</div>
        ) : (
          <div className="flex items-center gap-2 min-w-0">
            <span style={{ color: accent }}>{icon}</span>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{title}</span>
          </div>
        )}
        {headerRight && <div className="shrink-0">{headerRight}</div>}
      </div>
      <div className={`flex-1 min-h-0 ${contentClassName}`}>{children}</div>
    </div>
  );
}
