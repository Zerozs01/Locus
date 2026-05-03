import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFuelPricesWithRefresh, refreshFuelPrices } from '../services/fuelPricesService';
import { getRecords } from '../utils/csvDb';
import { AQI_SYNC_EVENT } from '../utils/aqi';
import { CachedImage } from '../components/CachedImage';
import {
  MapPin,
  Compass,
  Sparkles,
  TreePine,
  UtensilsCrossed,
  Bed,
  PartyPopper,
  Landmark,
  Car,
  Coffee,
  Users,
  CalendarDays,
  ArrowRight,
  ChevronRight,
  Mountain,
  Waves,
  Camera,
  Heart,
  Zap,
  Map,
  Pencil,
  Settings,
  Bus,
  Train,
  CarTaxiFront,
  Bike,
  TrendingUp,
  BarChart3,
  Filter,
  Info,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Thermometer,
  Wind
} from 'lucide-react';
import KohKradan from '../../../Image/เกาะกระดาน.png';

// ─── Types ──────────────────────────────────────────
type IntentMode = null | 'help' | 'explore';

interface DiscoveryChip {
  label: string;
  icon: React.ReactNode;
  keywords: string[];
}

interface RegionStats {
  id: string;
  name: string;
  color: string;
  avgAqi: number;
  avgTemp: number;
  dataPoints: number;
}

interface ExploreResultItem {
  title: string;
  location: string;
  category: string;
  iconName: string | null;
  tags?: string[];
  regionId?: string;
  provinceId?: string;
  rating?: number | null;
  description?: string | null;
  thumbnailUrl?: string | null;
  sourceUrl?: string | null;
  openingHours?: string | null;
}

// ─── Data ───────────────────────────────────────────
const DISCOVERY_CHIPS: DiscoveryChip[] = [
  { label: 'ธรรมชาติ', icon: <TreePine size={14} />, keywords: ['nature', 'forest', 'mountain'] },
  { label: 'ทะเล', icon: <Waves size={14} />, keywords: ['beach', 'sea'] },
  { label: 'อาหาร', icon: <UtensilsCrossed size={14} />, keywords: ['food', 'restaurant'] },
  { label: 'คาเฟ่', icon: <Coffee size={14} />, keywords: ['cafe', 'coffee'] },
  { label: 'วัฒนธรรม', icon: <Landmark size={14} />, keywords: ['culture', 'temple', 'history'] },
  { label: 'สถานบันเทิง', icon: <PartyPopper size={14} />, keywords: ['nightlife', 'party'] },
];

const REGIONS = [
  { id: 'northeast', name: 'ภาคอีสาน', eng: 'Isan', color: '#ef4444', colorClass: 'text-red-400', barClass: 'bg-gradient-to-t from-red-800 to-red-500' },
  { id: 'central', name: 'ภาคกลาง', eng: 'Central', color: '#f97316', colorClass: 'text-orange-400', barClass: 'bg-gradient-to-t from-orange-700 to-orange-400' },
  { id: 'south', name: 'ภาคใต้', eng: 'South', color: '#2563eb', colorClass: 'text-blue-400', barClass: 'bg-gradient-to-t from-blue-800 to-sky-400' },
  { id: 'north', name: 'ภาคเหนือ', eng: 'North', color: '#a855f7', colorClass: 'text-purple-400', barClass: 'bg-gradient-to-t from-violet-800 to-purple-400' },
  { id: 'east', name: 'ตะวันออก', eng: 'East', color: '#facc15', colorClass: 'text-yellow-400', barClass: 'bg-gradient-to-t from-amber-600 to-yellow-400' },
  { id: 'west', name: 'ตะวันตก', eng: 'West', color: '#22c55e', colorClass: 'text-emerald-400', barClass: 'bg-gradient-to-t from-emerald-800 to-lime-500' },
];

const FUEL_EFFICIENCY = {
  motorcycle: 35,
  car: 14,
};

const FUEL_TYPE_DETAILS: Record<string, { label: string; motorcycle: boolean; car: boolean }> = {
  '95': { label: 'แก๊สโซฮอล์ 95', motorcycle: true, car: true },
  '91': { label: 'แก๊สโซฮอล์ 91', motorcycle: true, car: true },
  'E20': { label: 'แก๊สโซฮอล์ E20', motorcycle: true, car: true },
  'E85': { label: 'แก๊สโซฮอล์ E85', motorcycle: false, car: true },
  '98+': { label: 'แก๊ซโซฮอร์ 98+', motorcycle: true, car: true },
  'B7': { label: 'ไฮดีเซล', motorcycle: false, car: true },
  'B20': { label: 'ดีเซล B20', motorcycle: false, car: true },
  'Diesel': { label: 'ดีเซล', motorcycle: false, car: true },
  'Premium': { label: 'ดีเซล High Premium+', motorcycle: false, car: true },
};

const FUEL_INFO_THEME: Record<string, { bg: string; border: string }> = {
  '95': { bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  '91': { bg: 'bg-teal-500/10', border: 'border-teal-500/30' },
  'E20': { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  'E85': { bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
  '98+': { bg: 'bg-red-500/10', border: 'border-red-500/30' },
  'B7': { bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  'B20': { bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  'Diesel': { bg: 'bg-slate-500/10', border: 'border-slate-500/30' },
  'Premium': { bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
};

// ─── Theme Colors per Question ──────────────────────
// Each question has its own accent color to make selections feel distinct
interface QuestionTheme {
  accent: string;       // e.g. '#a855f7'
  accentBg: string;     // selected bg
  accentBorder: string; // selected border
  progressColor: string;
  labelColor: string;
}

const QUESTION_THEMES: QuestionTheme[] = [
  // Q1: อยากเที่ยวแบบไหน → ม่วง
  { accent: '#a855f7', accentBg: 'rgba(168,85,247,0.12)', accentBorder: 'rgba(168,85,247,0.5)', progressColor: '#a855f7', labelColor: 'text-purple-400' },
  // Q2: ไปกี่วัน → น้ำเงิน
  { accent: '#3b82f6', accentBg: 'rgba(59,130,246,0.12)', accentBorder: 'rgba(59,130,246,0.5)', progressColor: '#3b82f6', labelColor: 'text-blue-400' },
  // Q3: มีรถไหม → เขียว
  { accent: '#22c55e', accentBg: 'rgba(34,197,94,0.12)', accentBorder: 'rgba(34,197,94,0.5)', progressColor: '#22c55e', labelColor: 'text-emerald-400' },
  // Q4: ไปกับใคร → ชมพู
  { accent: '#ec4899', accentBg: 'rgba(236,72,153,0.12)', accentBorder: 'rgba(236,72,153,0.5)', progressColor: '#ec4899', labelColor: 'text-pink-400' },
  // Q5: งบประมาณ → เหลืองทอง
  { accent: '#eab308', accentBg: 'rgba(234,179,8,0.12)', accentBorder: 'rgba(234,179,8,0.5)', progressColor: '#eab308', labelColor: 'text-yellow-400' },
];

// ─── Questions ──────────────────────────────────────
interface HelpQuestion {
  id: string;
  question: string;
  options: { label: string; value: string; icon?: React.ReactNode }[];
}

const HELP_QUESTIONS: HelpQuestion[] = [
  {
    id: 'style',
    question: 'อยากเที่ยวแบบไหน?',
    options: [
      { label: 'พักผ่อน ชิลล์ๆ', value: 'chill', icon: <Bed size={16} /> },
      { label: 'ผจญภัย ลุยๆ', value: 'adventure', icon: <Zap size={16} /> },
      { label: 'ธรรมชาติ ป่าเขา', value: 'nature', icon: <TreePine size={16} /> },
      { label: 'วัฒนธรรม ประวัติศาสตร์', value: 'culture', icon: <Landmark size={16} /> },
    ],
  },
  {
    id: 'duration',
    question: 'ไปกี่วัน?',
    options: [
      { label: 'เช้าไป-เย็นกลับ', value: '1day' },
      { label: '2 วัน 1 คืน', value: '2d1n' },
      { label: '3-4 วัน', value: '3-4d' },
      { label: '5 วัน+', value: '5d+' },
    ],
  },
  {
    id: 'transport',
    question: 'มีรถส่วนตัวไหม?',
    options: [
      { label: 'ขับรถไป', value: 'car', icon: <Car size={16} /> },
      { label: 'ไม่มีรถ (ขนส่งสาธารณะ)', value: 'public', icon: <Map size={16} /> },
    ],
  },
  {
    id: 'companion',
    question: 'ไปกับใคร?',
    options: [
      { label: 'คนเดียว', value: 'solo' },
      { label: 'คู่รัก', value: 'couple', icon: <Heart size={16} /> },
      { label: 'เพื่อน / กลุ่ม', value: 'friends', icon: <Users size={16} /> },
      { label: 'ครอบครัว', value: 'family', icon: <Users size={16} /> },
    ],
  },
  {
    id: 'budget',
    question: 'Budget รวม?',
    options: [
      { label: 'ประหยัด (< 1,000/วัน)', value: 'low' },
      { label: 'ปานกลาง (1,000-3,000/วัน)', value: 'mid' },
      { label: 'สบายๆ (3,000+/วัน)', value: 'high' },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════
export const GeoArchivePage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<IntentMode>(null);
  const [helpStep, setHelpStep] = useState(0);
  const [helpAnswers, setHelpAnswers] = useState<Record<string, string>>({});
  const [helpOthers, setHelpOthers] = useState<Record<string, string>>({});
  const [showCarSettings, setShowCarSettings] = useState(false);
  const [transportMeta, setTransportMeta] = useState({
    carModel: '',
    fuelPercent: '',
    fuelType: '',
    publicModes: [] as string[],
    publicOther: '',
  });
  const [companionMeta, setCompanionMeta] = useState({
    groupTotal: '',
    male: '',
    female: '',
    lgbtq: '',
    lgbtqType: '',
    familyTotal: '',
    familyAdults: '',
    familyChildren: '',
    familyAdultAges: '',
    familyChildAges: '',
  });
  const [budgetMeta, setBudgetMeta] = useState({
    totalBudget: '',
    budgetNote: '',
  });
  const [finalSuggestion, setFinalSuggestion] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [exploreResults, setExploreResults] = useState<ExploreResultItem[]>([]);

  const [showRegionFilter, setShowRegionFilter] = useState(false);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string | null>(null);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [ratingSort, setRatingSort] = useState<'desc' | 'asc' | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [showAllFuelPrices, setShowAllFuelPrices] = useState(false);
  const [openFuelType, setOpenFuelType] = useState<string | null>(null);
  const [isRefreshingFuel, setIsRefreshingFuel] = useState(false);
  const [gasPrices, setGasPrices] = useState<Array<{ type: string; price: number; color: string }>>([
    { type: '95', price: 42.45, color: 'bg-blue-500' },
    { type: '91', price: 42.08, color: 'bg-teal-500' },
    { type: 'E20', price: 35.45, color: 'bg-emerald-500' },
    { type: 'E85', price: 31.39, color: 'bg-rose-500' },
    { type: 'B7', price: 32.94, color: 'bg-amber-500' },
    { type: 'B20', price: 33.20, color: 'bg-orange-500' },
    { type: 'Diesel', price: 40.20, color: 'bg-slate-500' },
    { type: 'Premium', price: 62.10, color: 'bg-purple-600' },
    { type: '98+', price: 56.04, color: 'bg-red-600' },
  ]);
  const [regionStats, setRegionStats] = useState<RegionStats[]>([]);
  const [statsViewMode, setStatsViewMode] = useState<'temp' | 'aqi'>('temp');
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

  // Load fuel prices from database on mount
  useEffect(() => {
    let isMounted = true;
    const loadFuelPrices = async () => {
      try {
        const colorMap: Record<string, string> = {
          '95': 'bg-blue-500', '91': 'bg-teal-500', 'E20': 'bg-emerald-500',
          'E85': 'bg-rose-500', 'B7': 'bg-amber-500', 'B20': 'bg-orange-500',
          'Diesel': 'bg-slate-500', 'Premium': 'bg-purple-600', '98+': 'bg-red-600'
        };
        const prices = await getFuelPricesWithRefresh();
        if (!isMounted) return;
        
        if (prices && prices.length > 0) {
          setGasPrices(prices.map(p => ({
            type: p.fuelType,
            price: p.price,
            color: colorMap[p.fuelType] || 'bg-slate-500'
          })));
        }
      } catch (err) {
        console.error('[GeoArchive] Failed to load fuel prices:', err);
      }
    };
    loadFuelPrices();
    return () => {
      isMounted = false;
    };
  }, []);

  // ─── Icon Name → React Component mapping ──────────
  const ICON_MAP: Record<string, React.ReactNode> = {
    Mountain: <Mountain size={16} />,
    TreePine: <TreePine size={16} />,
    Waves: <Waves size={16} />,
    UtensilsCrossed: <UtensilsCrossed size={16} />,
    Coffee: <Coffee size={16} />,
    Landmark: <Landmark size={16} />,
    Car: <Car size={16} />,
    Users: <Users size={16} />,
    Camera: <Camera size={16} />,
    Bed: <Bed size={16} />,
    CalendarDays: <CalendarDays size={16} />,
    Heart: <Heart size={16} />,
    MapPin: <MapPin size={16} />,
    Compass: <Compass size={16} />,
    PartyPopper: <PartyPopper size={16} />,
  };

  // ─── Chip → category mapping for DB lookup ──────────
  const CHIP_TO_CATEGORIES: Record<string, string[]> = {
    'ธรรมชาติ': ['ธรรมชาติ', 'ป่าไม้'],
    'ทะเล': ['ทะเล'],
    'อาหาร': ['อาหาร', 'ของกิน'],
    'คาเฟ่': ['คาเฟ่'],
    'วัฒนธรรม': ['วัฒนธรรม'],
    'สถานบันเทิง': ['สถานบันเทิง'],
  };

  // Fetch explore results from SQLite when chips change
  useEffect(() => {
    if (selectedChips.length === 0) {
      setExploreResults([]);
      return;
    }
    let isMounted = true;
    const fetchPlaces = async () => {
      try {
        const api = (window as any).api;
        // Map chip labels to DB category names
        const categories = selectedChips.flatMap(chip => CHIP_TO_CATEGORIES[chip] || [chip]);
        const uniqueCategories = [...new Set(categories)];
        const places = api?.explorePlaces?.getByCategories
          ? await api.explorePlaces.getByCategories(uniqueCategories)
          : [];
        if (!isMounted) return;
        if (places && places.length > 0) {
          let filtered = places.map((p: any) => ({
            title: p.title,
            location: p.locationName || '',
            category: p.category || '',
            iconName: p.iconName || null,
            tags: p.tags || undefined,
            regionId: p.regionId || undefined,
            provinceId: p.provinceId || undefined,
            rating: p.rating,
            description: p.description,
            thumbnailUrl: p.thumbnailUrl,
            sourceUrl: p.sourceUrl,
            openingHours: p.openingHours,
          }));

          // Apply region filter
          if (selectedRegionFilter) {
            filtered = filtered.filter((p: ExploreResultItem) => p.regionId === selectedRegionFilter);
          }

          // Apply rating sort
          if (ratingSort === 'desc') {
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          } else if (ratingSort === 'asc') {
            filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
          }

    setExploreResults(filtered);
        } else {
          setExploreResults([]);
        }
      } catch (err) {
        console.error('[GeoArchive] Failed to fetch explore places:', err);
      }
    };
    fetchPlaces();
    return () => { isMounted = false; };
  }, [selectedChips, selectedRegionFilter, ratingSort]);

  // Manual refresh fuel prices
  const handleRefreshFuelPrices = async () => {
    if (isRefreshingFuel) return;
    setIsRefreshingFuel(true);
    try {
      const colorMap: Record<string, string> = {
        '95': 'bg-blue-500', '91': 'bg-teal-500', 'E20': 'bg-emerald-500',
        'E85': 'bg-rose-500', 'B7': 'bg-amber-500', 'B20': 'bg-orange-500',
        'Diesel': 'bg-slate-500', 'Premium': 'bg-purple-600', '98+': 'bg-red-600'
      };
      const prices = await refreshFuelPrices();
      if (prices && prices.length > 0) {
        setGasPrices(prices.map(p => ({
          type: p.fuelType,
          price: p.price,
          color: colorMap[p.fuelType] || 'bg-slate-500'
        })));
      }
    } catch (err) {
      console.error('[GeoArchive] Failed to refresh fuel prices:', err);
    } finally {
      setIsRefreshingFuel(false);
    }
  };

  // Load regional stats (AQI & Temperature averages)
  useEffect(() => {
    let isMounted = true;

    const loadRegionalStats = async () => {
      try {
        const api = (window as any).api;
        const dbRows = api?.db?.getWeatherAqi ? await api.db.getWeatherAqi() : [];
        const csvRows = getRecords().map((row) => ({
          provinceId: row.id,
          date: row.date,
          temperature: row.temperature,
          aqi: row.aqi
        }));
        const provinceIndexRows = api?.db?.getProvinceIndex ? await api.db.getProvinceIndex() : [];

        const normalizeProvinceId = (value: string) => {
          let normalized = value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
          if (normalized === 'bangkokmetropolis') normalized = 'bangkok';
          if (normalized === 'phranakhonsiayutthaya') normalized = 'ayutthaya';
          return normalized;
        };

        const provinceIdToRegionId: Record<string, string> = {};
        if (Array.isArray(provinceIndexRows)) {
          provinceIndexRows.forEach((row: any) => {
            const regionId = String(row?.regionId || '').trim();
            if (!regionId) return;
            const idKey = normalizeProvinceId(String(row?.id || ''));
            const nameKey = normalizeProvinceId(String(row?.name || ''));
            if (idKey) provinceIdToRegionId[idKey] = regionId;
            if (nameKey) provinceIdToRegionId[nameKey] = regionId;
          });
        }

        const dbMaxDate = Array.isArray(dbRows) && dbRows.length > 0
          ? dbRows.reduce((max: string, r: any) => (r?.date > max ? r.date : max), '')
          : '';
        const csvMaxDate = csvRows.length > 0
          ? csvRows.reduce((max, r) => (r.date > max ? r.date : max), '')
          : '';
        const shouldSyncFromCsv = csvRows.length > 0 && (!dbMaxDate || csvMaxDate > dbMaxDate);

        if (shouldSyncFromCsv && api?.db?.saveWeatherAqi) {
          await api.db.saveWeatherAqi(csvRows);
        }

        const weatherRows = csvRows.length > 0
          ? csvRows
          : (Array.isArray(dbRows) ? dbRows : []);

        if (!Array.isArray(weatherRows) || weatherRows.length === 0) {
          console.log('[GeoArchive] No weather data available');
          return;
        }

        const todayStr = new Date().toISOString().split('T')[0];
        const groupedByProvince: Record<string, Array<{ date: string; temperature: number; aqi: number }>> = {};
        weatherRows.forEach((row: any) => {
          const normalizedId = normalizeProvinceId(String(row?.provinceId || ''));
          const date = typeof row?.date === 'string' ? row.date : '';
          if (!normalizedId || !date) return;
          if (!groupedByProvince[normalizedId]) groupedByProvince[normalizedId] = [];
          groupedByProvince[normalizedId].push({
            date,
            temperature: Number(row.temperature),
            aqi: Number(row.aqi)
          });
        });

        const resolvedRows = Object.entries(groupedByProvince).map(([provinceId, records]) => {
          const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));
          const today = sorted.find((r) => r.date === todayStr);
          const latestPast = sorted.find((r) => r.date <= todayStr);
          const latest = sorted[0];
          const resolved = today || latestPast || latest;
          return resolved ? { provinceId, temperature: resolved.temperature, aqi: resolved.aqi } : null;
        }).filter((row): row is { provinceId: string; temperature: number; aqi: number } => Boolean(row));

        // Build province to region mapping
        const provinceToRegion: Record<string, string> = {
          // North
          'chiangmai': 'north', 'chiangrai': 'north', 'phayao': 'north', 'nan': 'north',
          'phrae': 'north', 'uttaradit': 'north', 'sukhothai': 'north', 'tak': 'north',
          // Northeast
          'khonkaen': 'northeast', 'korat': 'northeast', 'udonthani': 'northeast',
          'nakhonphanom': 'northeast', 'sakonakhon': 'northeast', 'yasothon': 'northeast',
          'amnatcharoen': 'northeast', 'maha': 'northeast', 'loei': 'northeast',
          'chaiyaphum': 'northeast', 'roiet': 'northeast',
          // Central
          'bangkok': 'central', 'ayutthaya': 'central', 'lopburi': 'central',
          'sara': 'central', 'nakhonnayok': 'central', 'phetchaburi': 'central',
          'chumphon': 'central',
          // South
          'phuket': 'south', 'krabi': 'south', 'phangnga': 'south',
          'surat': 'south', 'nakhorn': 'south', 'ranong': 'south',
          // East
          'chachoengsao': 'east', 'chonburi': 'east', 'rayong': 'east',
          'trad': 'east',
          // West
          'kanchanaburi': 'west', 'ratchaburi': 'west', 'prachuap': 'west'
        };

        // Group by region
        const regionData: Record<string, { temps: number[]; aqis: number[] }> = {};
        
        resolvedRows.forEach((row) => {
          const normalizedId = normalizeProvinceId(row.provinceId);
          const mappedRegionId = provinceIdToRegionId[normalizedId];
          const fallbackRegionId = Object.entries(provinceToRegion).find(([prov]) =>
            normalizedId.includes(prov) || prov.includes(normalizedId)
          )?.[1];
          const regionId = mappedRegionId || fallbackRegionId;

          if (regionId) {
            if (!regionData[regionId]) {
              regionData[regionId] = { temps: [], aqis: [] };
            }
            const data = regionData[regionId];
            if (Number.isFinite(row.temperature)) data.temps.push(row.temperature);
            if (Number.isFinite(row.aqi)) data.aqis.push(row.aqi);
          }
        });

        // Calculate averages for each region
        const stats: RegionStats[] = REGIONS
          .map(r => {
            const data = regionData[r.id];
            const avgTemp = data && data.temps.length > 0
              ? Math.round(data.temps.reduce((a: number, b: number) => a + b, 0) / data.temps.length * 10) / 10
              : 0;
            const avgAqi = data && data.aqis.length > 0
              ? Math.round(data.aqis.reduce((a: number, b: number) => a + b, 0) / data.aqis.length)
              : 0;

            return {
              id: r.id,
              name: r.name,
              color: r.color,
              avgTemp,
              avgAqi,
              dataPoints: data ? Math.min(data.temps.length, data.aqis.length) : 0,
            };
          })
          .filter(s => s.dataPoints > 0);

        if (isMounted) {
          setRegionStats(stats);
        }
      } catch (err) {
        console.error('[GeoArchive] Failed to load regional stats:', err);
      }
    };

    loadRegionalStats();
    const onWeatherUpdated = () => {
      void loadRegionalStats();
    };
    window.addEventListener(AQI_SYNC_EVENT, onWeatherUpdated as EventListener);
    return () => {
      isMounted = false;
      window.removeEventListener(AQI_SYNC_EVENT, onWeatherUpdated as EventListener);
    };
  }, []);

  const handleBack = useCallback(() => {
    if (mode === 'help' && helpStep > 0) {
      setHelpStep((s) => s - 1);
    } else {
      setMode(null);
      setHelpStep(0);
      setHelpAnswers({});
      setHelpOthers({});
      setShowCarSettings(false);
      setTransportMeta({
        carModel: '',
        fuelPercent: '',
        fuelType: '',
        publicModes: [],
        publicOther: '',
      });
      setCompanionMeta({
        groupTotal: '',
        male: '',
        female: '',
        lgbtq: '',
        lgbtqType: '',
        familyTotal: '',
        familyAdults: '',
        familyChildren: '',
        familyAdultAges: '',
        familyChildAges: '',
      });
      setBudgetMeta({
        totalBudget: '',
        budgetNote: '',
      });
      setFinalSuggestion('');
      setSelectedChips([]);
      setEditingQuestion(null);
    }
  }, [mode, helpStep]);

  const toggleChip = (label: string) => {
    setSelectedChips((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  const togglePublicMode = (value: string) => {
    setTransportMeta((prev) => ({
      ...prev,
      publicModes: prev.publicModes.includes(value)
        ? prev.publicModes.filter((mode) => mode !== value)
        : [...prev.publicModes, value],
    }));
  };

  const getAnswerLabel = (questionId: string) => {
    const question = HELP_QUESTIONS.find((q) => q.id === questionId);
    if (!question) return 'ไม่ระบุ';
    const selected = question.options.find((option) => option.value === helpAnswers[questionId]);
    if (selected) return selected.label;
    if ((questionId === 'style' || questionId === 'duration') && helpOthers[questionId]?.trim()) {
      return 'อื่นๆ';
    }
    return 'ไม่ระบุ';
  };

  const getQuestionDetails = (questionId: string) => {
    const details: string[] = [];
    const otherText = helpOthers[questionId]?.trim();

    if (otherText) {
      details.push(`อื่นๆ: ${otherText}`);
    }

    if (questionId === 'transport') {
      if (helpAnswers.transport === 'car') {
        if (transportMeta.carModel.trim()) details.push(`รถ: ${transportMeta.carModel.trim()}`);
        if (transportMeta.fuelPercent.trim()) details.push(`น้ำมันคงเหลือ: ${transportMeta.fuelPercent.trim()}%`);
        if (transportMeta.fuelType.trim()) details.push(`ชนิดน้ำมัน: ${transportMeta.fuelType.trim()}`);
      }

      if (helpAnswers.transport === 'public') {
        if (transportMeta.publicModes.length > 0) {
          details.push(`ขนส่งที่สนใจ: ${transportMeta.publicModes.join(', ')}`);
        }
        if (transportMeta.publicOther.trim()) {
          details.push(`ขนส่งอื่นๆ: ${transportMeta.publicOther.trim()}`);
        }
      }
    }

    if (questionId === 'companion') {
      if (helpAnswers.companion === 'friends') {
        if (companionMeta.groupTotal.trim()) details.push(`จำนวนกลุ่ม: ${companionMeta.groupTotal.trim()} คน`);
        if (companionMeta.male.trim()) details.push(`ชาย: ${companionMeta.male.trim()} คน`);
        if (companionMeta.female.trim()) details.push(`หญิง: ${companionMeta.female.trim()} คน`);
        if (companionMeta.lgbtq.trim()) details.push(`LGBTQ+: ${companionMeta.lgbtq.trim()} คน`);
        if (companionMeta.lgbtqType.trim()) details.push(`ประเภท LGBTQ+: ${companionMeta.lgbtqType.trim()}`);
      }

      if (helpAnswers.companion === 'family') {
        if (companionMeta.familyTotal.trim()) details.push(`สมาชิกครอบครัว: ${companionMeta.familyTotal.trim()} คน`);
        if (companionMeta.familyAdults.trim()) details.push(`ผู้ใหญ่: ${companionMeta.familyAdults.trim()} คน`);
        if (companionMeta.familyChildren.trim()) details.push(`เด็ก: ${companionMeta.familyChildren.trim()} คน`);
        if (companionMeta.familyAdultAges.trim()) details.push(`อายุผู้ใหญ่ (รายคน): ${companionMeta.familyAdultAges.trim()}`);
        if (companionMeta.familyChildAges.trim()) details.push(`อายุเด็ก (รายคน): ${companionMeta.familyChildAges.trim()}`);
      }
    }

    if (questionId === 'budget') {
      if (budgetMeta.totalBudget.trim()) details.push(`งบรวมทริป: ${budgetMeta.totalBudget.trim()} บาท`);
      if (budgetMeta.budgetNote.trim()) details.push(`หมายเหตุงบ: ${budgetMeta.budgetNote.trim()}`);
    }

    return details;
  };

  // Build structured payload text for AI chat context
  const buildStructuredTravelInfo = () => {
    const payload = {
      travel_style: {
        selection: helpAnswers.style || 'other_only',
        selectionLabel: getAnswerLabel('style'),
        other: (helpOthers.style || '').trim(),
      },
      duration: {
        selection: helpAnswers.duration || 'other_only',
        selectionLabel: getAnswerLabel('duration'),
        other: (helpOthers.duration || '').trim(),
      },
      transport: {
        selection: helpAnswers.transport || 'unspecified',
        selectionLabel: getAnswerLabel('transport'),
        other: (helpOthers.transport || '').trim(),
        car: {
          model: transportMeta.carModel.trim(),
          fuelPercent: transportMeta.fuelPercent.trim(),
          fuelType: transportMeta.fuelType.trim(),
        },
        publicTransport: {
          preferredModes: transportMeta.publicModes,
          other: transportMeta.publicOther.trim(),
        },
      },
      companion: {
        selection: helpAnswers.companion || 'unspecified',
        selectionLabel: getAnswerLabel('companion'),
        other: (helpOthers.companion || '').trim(),
        friendsGroup: {
          total: companionMeta.groupTotal.trim(),
          male: companionMeta.male.trim(),
          female: companionMeta.female.trim(),
          lgbtq: companionMeta.lgbtq.trim(),
          lgbtqType: companionMeta.lgbtqType.trim(),
        },
        family: {
          total: companionMeta.familyTotal.trim(),
          adults: companionMeta.familyAdults.trim(),
          children: companionMeta.familyChildren.trim(),
          adultAges: companionMeta.familyAdultAges.trim(),
          childAges: companionMeta.familyChildAges.trim(),
        },
      },
      budget: {
        selection: helpAnswers.budget || 'unspecified',
        selectionLabel: getAnswerLabel('budget'),
        other: (helpOthers.budget || '').trim(),
        tripTotalBudget: budgetMeta.totalBudget.trim(),
        note: budgetMeta.budgetNote.trim(),
      },
    };

    return JSON.stringify(payload, null, 2);
  };

  const buildReadableSummary = () => {
    return HELP_QUESTIONS.map((q) => {
      const details = getQuestionDetails(q.id);
      const detailText = details.length > 0 ? `\n- ${details.join('\n- ')}` : '';
      return `${q.question} ${getAnswerLabel(q.id)}${detailText}`;
    }).join('\n');
  };

  // ─── Intent Selection (Home) ──────────────────────
  if (mode === null) {
    // Mock data for widgets
    const trendingLocations = [
      { name: 'แม่กำปอง', province: 'เชียงใหม่', temp: 18, status: 'กำลังฮิต', image: 'https://images.unsplash.com/photo-1528181304800-2f190854b798?auto=format&fit=crop&q=80&w=200' },
      { name: 'เกาะกูด', province: 'ตราด', temp: 28, status: 'สงบ', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=200' },
      { name: 'เขาค้อ', province: 'เพชรบูรณ์', temp: 22, status: 'มีหมอก', image: 'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?auto=format&fit=crop&q=80&w=200' },
      { name: 'บ้านนา', province: 'นครนายก', temp: 26, status: 'ใกล้กรุง', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=200' },
    ];

    const visibleGas = showAllFuelPrices ? gasPrices : gasPrices.slice(0, 3);
    const displayStats = regionStats
      .slice()
      .sort((a, b) => (statsViewMode === 'temp' ? b.avgTemp - a.avgTemp : b.avgAqi - a.avgAqi));
    const maxValue = displayStats.length > 0
      ? Math.max(...displayStats.map((stat) => (statsViewMode === 'temp' ? stat.avgTemp : stat.avgAqi)))
      : 0;
    const minValue = displayStats.length > 0
      ? Math.min(...displayStats.map((stat) => (statsViewMode === 'temp' ? stat.avgTemp : stat.avgAqi)))
      : 0;
    const valueRange = Math.max(maxValue - minValue, 1);
    const minBar = 12;
    const maxBar = 48;


    return (
      <div className="flex-1 overflow-y-auto relative bg-[#050608]">
        {/* Background Image with Overlay */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.75)), url(${KohKradan})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative z-10 mx-auto max-w-6xl px-8 py-10">
          {/* ─── Main Grid Layout ─── */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-4">
            {/* Top Row - Left: Intent Cards (7 cols) */}
            <div className="col-span-7 space-y-3">
              <IntentCard
                icon={<MapPin size={32} />}
                title="มีที่ในใจแล้ว"
                subtitle="ระบุพิกัดที่คุณอยากไป แล้วให้เราจัดการเส้นทางให้"
                gradient="from-emerald-500/20 to-teal-600/10"
                border="border-emerald-500/30"
                iconBg="bg-emerald-500/20"
                iconColor="text-emerald-400"
                onClick={() => navigate('/map', { state: { focusSearch: true } })}
              />
              <IntentCard
                icon={<Compass size={30} />}
                title="สำรวจตามความสนใจ"
                subtitle="เลือกหมวดหมู่ที่ชอบ — ป่าไม้, ทะเล, ของกิน หรือ สถานบันเทิง"
                gradient="from-amber-500/20 to-orange-600/10"
                border="border-amber-500/30"
                iconBg="bg-amber-500/20"
                iconColor="text-amber-400"
                onClick={() => setMode('explore')}
              >
                <div className="mt-4 flex gap-2">
                  {DISCOVERY_CHIPS.map((chip) => (
                    <div 
                      key={chip.label}
                      className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/70 transition-all hover:bg-amber-500/30 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMode('explore');
                        setSelectedChips([chip.label]);
                      }}
                    >
                      <span className="scale-75 opacity-70">{chip.icon}</span>
                      {chip.label}
                    </div>
                  ))}
                </div>
              </IntentCard>
              <IntentCard
                icon={<Sparkles size={32} />}
                title="ช่วยเลือกให้หน่อย"
                subtitle="ตอบคำถามสั้นๆ แล้ว Locus จะค้นหาจุดหมายที่ใช่ที่สุดสำหรับคุณ"
                isAi={true}
                gradient="from-purple-500/20 to-indigo-600/10"
                border="border-purple-500/30"
                iconBg="bg-purple-500/20"
                iconColor="text-purple-400"
                onClick={() => setMode('help')}
              />
            </div>

            {/* Top Row - Right: Trending (5 cols) */}
            <div className="col-span-5">
              <div className="h-full rounded-2xl border border-white/20 bg-black/20 backdrop-blur-xl overflow-hidden flex flex-col shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-5 py-2.5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp size={16} className="text-cyan-400" />
                    กำลังฮิตในสัปดาห์นี้
                  </h3>
                  <button className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider">ดูเพิ่มเติม</button>
                </div>
                <div className="p-3 space-y-2 flex-1">
                  {trendingLocations.map((loc, i) => (
                    <div
                      key={i}
                      className="group flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-all hover:bg-white/5"
                      onClick={() => navigate('/map', { state: { searchQuery: loc.name } })}
                    >
                      <div className="relative">
                        <img
                          src={loc.image}
                          alt={loc.name}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-black">
                          {i + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                          {loc.name}
                        </div>
                        <div className="text-xs text-slate-500">{loc.province}</div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs text-slate-400">{loc.temp}°C</span>
                          <span className="text-xs text-cyan-400/70">• {loc.status}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

              {/* Bottom Row - Left: Regional Histogram (7 cols) */}
              <div className="col-span-7">
                <div className="h-fit self-start rounded-2xl border border-white/20 bg-black/20 backdrop-blur-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col">
                  <div className="relative flex w-full mb-5 rounded-2xl bg-black/60 border border-white/10 p-1 backdrop-blur-md shadow-inner overflow-hidden">
                    {/* Sliding Indicator */}
                    <div 
                      className="absolute top-1 bottom-1 transition-all duration-500 ease-out bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
                      style={{ 
                        left: statsViewMode === 'temp' ? '4px' : 'calc(50% + 2px)', 
                        width: 'calc(50% - 6px)' 
                      }}
                    />

                    <button
                      onClick={() => setStatsViewMode('temp')}
                      className={`relative z-10 flex-1 flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all duration-300 ${
                        statsViewMode === 'temp' ? 'text-black' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Thermometer size={14} className={`transition-transform duration-500 ${statsViewMode === 'temp' ? 'scale-110 text-cyan-600' : 'text-slate-600'}`} />
                      AVG อุณหภูมิ
                    </button>
                    <button
                      onClick={() => setStatsViewMode('aqi')}
                      className={`relative z-10 flex-1 flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all duration-300 ${
                        statsViewMode === 'aqi' ? 'text-black' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Wind size={14} className={`transition-transform duration-500 ${statsViewMode === 'aqi' ? 'scale-110 text-cyan-600' : 'text-slate-600'}`} />
                      AVG AQI
                    </button>
                  </div>

                  {regionStats.length > 0 ? (
                    <div className="flex-1 flex flex-col justify-end">
                      <div className="grid grid-cols-6 gap-2">
                        {displayStats.map((region) => {
                          const regionMeta = REGIONS.find((item) => item.id === region.id);
                          const value = statsViewMode === 'temp' ? region.avgTemp : region.avgAqi;
                          const valueLabel = statsViewMode === 'temp'
                            ? `${value.toFixed(1)}°C`
                            : `${value.toFixed(0)}`;
                          
                          const normalized = valueRange > 0 ? (value - minValue) / valueRange : 0.5;
                          const barHeight = minBar + normalized * (maxBar - minBar);

                          return (
                            <div key={`col-${region.id}`} className="flex flex-col items-center group cursor-help">
                              {/* Bar - Back at the Top */}
                              <div className="h-14 w-full flex items-end justify-center px-1 mb-3">
                                <div 
                                  className={`w-full max-w-[16px] rounded-sm transition-all duration-700 ease-out group-hover:scale-x-110 shadow-lg shadow-black/20 ${regionMeta?.barClass || 'bg-cyan-500'}`}
                                  style={{ height: `${barHeight}px` }}
                                />
                              </div>

                              {/* Labels - At the Bottom */}
                              <div className={`text-[11px] font-black tracking-tight ${regionMeta?.colorClass || 'text-slate-300'}`}>
                                {valueLabel}
                              </div>
                              <div className="text-[10px] font-medium text-slate-500 truncate w-full text-center">
                                {region.name}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
                      <div className="text-center">
                        <p className="text-xs text-slate-600">ไม่พบข้อมูล</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            {/* Bottom Row - Right: Gas Price (5 cols) */}
            <div className="col-span-5">
              <div className="h-full rounded-2xl border border-white/20 bg-white/[0.03] backdrop-blur-xl p-5 shadow-xl relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex flex-col">
                    <h3 className="text-sm text-white">ราคาน้ำมันวันนี้</h3>
                    <a 
                      href="https://oil-price.bangchak.co.th/BcpOilPrice2/th" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-teal-500 uppercase tracking-tighter hover:underline"
                    >
                      From: Bangchak Corporation
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRefreshFuelPrices}
                      disabled={isRefreshingFuel}
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all disabled:opacity-50"
                      title="รีเฟรชราคาน้ำมัน"
                    >
                      <svg className={`w-3.5 h-3.5 text-slate-400 ${isRefreshingFuel ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setShowAllFuelPrices(!showAllFuelPrices)}
                      className={`flex items-center justify-center p-1.5 rounded-lg border transition-all ${
                        showAllFuelPrices 
                        ? 'bg-teal-500/20 border-teal-500/30 text-teal-400' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                      title={showAllFuelPrices ? 'แสดงน้อยลง' : 'แสดงทั้งหมด'}
                    >
                      <BarChart3 size={14} className={showAllFuelPrices ? 'rotate-90 transition-transform' : 'transition-transform'} />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  {(() => {
                    // Explicit class mapping to ensure Tailwind JIT includes them
                    const FUEL_THEMES: Record<string, { text: string; border: string; glow: string }> = {
                      'bg-blue-500':    { text: 'text-blue-500',    border: 'border-blue-500',    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' },
                      'bg-teal-500':    { text: 'text-teal-500',    border: 'border-teal-500',    glow: 'shadow-[0_0_15px_rgba(20,184,166,0.3)]' },
                      'bg-emerald-500': { text: 'text-emerald-500', border: 'border-emerald-500', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]' },
                      'bg-rose-500':    { text: 'text-rose-500',    border: 'border-rose-500',    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.3)]' },
                      'bg-amber-500':   { text: 'text-amber-500',   border: 'border-amber-500',   glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]' },
                      'bg-orange-500':  { text: 'text-orange-500',  border: 'border-orange-500',  glow: 'shadow-[0_0_15px_rgba(249,115,22,0.3)]' },
                      'bg-slate-500':   { text: 'text-slate-500',   border: 'border-slate-500',   glow: 'shadow-[0_0_15px_rgba(100,116,139,0.3)]' },
                      'bg-purple-600':  { text: 'text-purple-600',  border: 'border-purple-600',  glow: 'shadow-[0_0_15px_rgba(147,51,234,0.3)]' },
                      'bg-red-600':     { text: 'text-red-600',     border: 'border-red-600',     glow: 'shadow-[0_0_15px_rgba(220,38,38,0.3)]' },
                    };

                    const chunks = [];
                    for (let i = 0; i < visibleGas.length; i += 3) {
                      chunks.push(visibleGas.slice(i, i + 3));
                    }
                    return chunks.map((chunk, chunkIdx) => {
                      const openInThisChunk = chunk.find(g => g.type === openFuelType);
                      return (
                        <React.Fragment key={chunkIdx}>
                          {chunk.map((gas) => {
                            const details = FUEL_TYPE_DETAILS[gas.type] || { label: gas.type, motorcycle: true, car: true };
                            const isOpen = openFuelType === gas.type;
                            const fuelTheme = FUEL_THEMES[gas.color] || { 
                              text: 'text-slate-400', 
                              border: 'border-white/20', 
                              glow: 'shadow-none' 
                            };

                            return (
                              <div key={gas.type} className="flex flex-col gap-2">
                                <div className={`p-2.5 rounded-xl border transition-all h-full ${
                                  isOpen 
                                    ? `bg-white/[0.08] ${fuelTheme.border}/50 ${fuelTheme.glow}` 
                                    : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06]'
                                }`}>
                                  <div className="flex items-start justify-between mb-1">
                                    <div className="flex items-center gap-1.5">
                                      <div className={`w-1.5 h-1.5 rounded-full ${gas.color} shadow-[0_0_8px_rgba(255,255,255,0.2)]`}></div>
                                      <span className="text-[9px] text-slate-500 font-bold tracking-tight">{details.label}</span>
                                    </div>
                                    <button
                                      onClick={() => setOpenFuelType(isOpen ? null : gas.type)}
                                      className={`p-1 rounded-md border transition-all ${
                                        isOpen
                                          ? `bg-slate-800 border-slate-700 ${fuelTheme.text}`
                                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                                      }`}
                                      title={isOpen ? 'ซ่อนข้อมูลคำนวณ' : 'ดูข้อมูลคำนวณ'}
                                    >
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                                    </button>
                                  </div>
                                  <div className="flex items-baseline gap-0.5">
                                    <span className="text-sm font-black text-white leading-none">{gas.price.toFixed(2)}</span>
                                    <span className="text-[8px] text-slate-600 font-bold uppercase">฿/L</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          {openInThisChunk && (
                            <div className="col-span-3 rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-4 text-[11px] text-white mt-1 mb-2 animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xl">
                              <div className={`mb-3 text-[10px] font-bold uppercase tracking-widest ${
                                FUEL_THEMES[openInThisChunk.color]?.text || 'text-cyan-400'
                              } border-b border-white/10 pb-2`}>
                                {FUEL_TYPE_DETAILS[openInThisChunk.type]?.label || openInThisChunk.type} — คำนวณโดยประมาณ
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                {(() => {
                                  const gas = openInThisChunk;
                                  const details = FUEL_TYPE_DETAILS[gas.type] || { label: gas.type, motorcycle: true, car: true };
                                  const motoCostKm = gas.price / FUEL_EFFICIENCY.motorcycle;
                                  const carCostKm = gas.price / FUEL_EFFICIENCY.car;
                                  return (
                                    <>
                                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">รถจักรยานยนต์</div>
                                        {details.motorcycle ? (
                                          <>
                                            <div className="text-sm font-black text-white">{motoCostKm.toFixed(2)} บ./กม</div>
                                            <div className="text-[10px] text-slate-500">{(motoCostKm * 10).toFixed(1)} บ./10กม</div>
                                          </>
                                        ) : (
                                          <div className="text-[10px] text-slate-600">ไม่แนะนำ</div>
                                        )}
                                      </div>
                                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">รถยนต์</div>
                                        {details.car ? (
                                          <>
                                            <div className="text-sm font-black text-white">{carCostKm.toFixed(2)} บ./กม</div>
                                            <div className="text-[10px] text-slate-500">{(carCostKm * 10).toFixed(1)} บ./10กม</div>
                                          </>
                                        ) : (
                                          <div className="text-[10px] text-slate-600">ไม่แนะนำ</div>
                                        )}
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Mode: "ช่วยเลือกให้หน่อย" ───────────────────
  if (mode === 'help') {
    const currentQ = HELP_QUESTIONS[helpStep];
    const theme = QUESTION_THEMES[helpStep] || QUESTION_THEMES[0];
    const isLastStep = helpStep >= HELP_QUESTIONS.length - 1;
    const currentOther = currentQ ? (helpOthers[currentQ.id] || '').trim() : '';
    const hasPrimaryAnswer = Boolean(currentQ && helpAnswers[currentQ.id]);
    const allowOtherOnly = Boolean(currentQ && (currentQ.id === 'style' || currentQ.id === 'duration'));
    const hasBudgetTotal = Boolean(currentQ?.id === 'budget' && budgetMeta.totalBudget.trim());
    const hasAnswered = hasPrimaryAnswer || (allowOtherOnly && currentOther.length > 0) || hasBudgetTotal;

    // All questions answered → show editable summary
    if (helpStep >= HELP_QUESTIONS.length) {
      return (
        <div className="flex-1 bg-[#050608] overflow-y-auto">
          <div className="mx-auto max-w-3xl px-6 py-12">
            <BackButton onClick={handleBack} />
            <h2 className="mb-2 text-2xl font-bold text-white">
              <Sparkles size={24} className="mr-2 inline text-purple-400" />
              สรุปความต้องการของคุณ
            </h2>
            <p className="mb-8 text-sm text-slate-500">
              กดปุ่ม ✏️ เพื่อแก้ไขคำตอบได้ ก่อนส่งให้ AI วิเคราะห์
            </p>

            {/* Editable Summary */}
            <div className="mb-8 rounded-2xl border border-white/10 bg-[#0a0c10] p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {HELP_QUESTIONS.map((q, idx) => {
                  const qTheme = QUESTION_THEMES[idx];
                  const isEditing = editingQuestion === q.id;
                  const detailLines = getQuestionDetails(q.id);
                  return (
                    <div
                      key={q.id}
                      className="relative rounded-xl p-3 transition-all"
                      style={{
                        backgroundColor: isEditing ? qTheme.accentBg : 'rgba(255,255,255,0.03)',
                        border: isEditing ? `1px solid ${qTheme.accentBorder}` : '1px solid transparent',
                      }}
                    >
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {q.question}
                      </div>

                      {isEditing ? (
                        <div className="mt-2 space-y-1.5">
                          {q.options.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => {
                                setHelpAnswers((prev) => ({ ...prev, [q.id]: opt.value }));
                                setEditingQuestion(null);
                              }}
                              className="block w-full rounded-lg px-3 py-1.5 text-left text-xs transition-all"
                              style={{
                                backgroundColor: helpAnswers[q.id] === opt.value ? qTheme.accentBg : 'rgba(255,255,255,0.05)',
                                border: helpAnswers[q.id] === opt.value ? `1px solid ${qTheme.accentBorder}` : '1px solid transparent',
                                color: helpAnswers[q.id] === opt.value ? '#fff' : '#94a3b8',
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-white">
                              {getAnswerLabel(q.id) || '—'}
                            </div>
                            <button
                              onClick={() => setEditingQuestion(q.id)}
                              className="ml-2 rounded-lg p-1 text-slate-600 transition-colors hover:bg-white/10 hover:text-white"
                              title="แก้ไข"
                            >
                              <Pencil size={12} />
                            </button>
                          </div>
                          {detailLines.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {detailLines.map((line) => (
                                <div key={line} className="text-[11px] text-slate-400">
                                  • {line}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Send to AI — auto-send on Intelligence page */}
            <div className="mb-4 rounded-2xl border border-white/10 bg-[#0a0c10] p-4">
              <label className="mb-2 block text-sm font-semibold text-slate-200">อยากถามอะไรเพิ่มกับ AI? (Optional)</label>
              <textarea
                value={finalSuggestion}
                onChange={(event) => setFinalSuggestion(event.target.value)}
                rows={3}
                placeholder="เช่น เน้นจังหวัดปลอดภัย คนไม่พลุกพล่าน หรือแผนเที่ยวเชิงนิเวศ"
                className="w-full resize-none rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-purple-500/40"
              />
            </div>

            <button
              onClick={() => {
                const structuredInfo = buildStructuredTravelInfo();
                const readableSummary = buildReadableSummary();
                const userAsk = finalSuggestion.trim() || 'ช่วยแนะนำจังหวัดที่เหมาะกับความต้องการนี้';
                navigate('/intelligence', {
                  state: {
                    autoSendMessage:
                      `${userAsk}\n\n` +
                      `สรุปความต้องการ:\n${readableSummary}`,
                    autoSendSystemContext:
                      'TRAVEL_PROFILE_JSON:\n' + structuredInfo,
                  },
                });
              }}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
            >
              <Sparkles size={18} className="text-purple-400" />
              ส่งให้ AI วิเคราะห์แนะนำ
              <ArrowRight size={16} className="text-purple-400 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      );
    }

    // ─── Question Flow ──────────────────────────────
    return (
      <div className="flex-1 bg-[#050608] overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <BackButton onClick={handleBack} />

          {/* Progress bar with theme colors */}
          <div className="mb-8 flex items-center gap-3">
            {HELP_QUESTIONS.map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor:
                    i < helpStep
                      ? QUESTION_THEMES[i].progressColor
                      : i === helpStep
                        ? theme.progressColor
                        : 'rgba(255,255,255,0.07)',
                  opacity: i <= helpStep ? 1 : 0.3,
                }}
              />
            ))}
          </div>
          <div className={`mb-2 text-xs font-medium ${theme.labelColor}`}>
            คำถามที่ {helpStep + 1} / {HELP_QUESTIONS.length}
          </div>
          <h2 className="mb-8 text-2xl font-bold text-white">{currentQ.question}</h2>

          {currentQ.id === 'budget' && (
            <div className="mb-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <h3 className="mb-3 text-sm font-semibold text-yellow-300">Budget รวม (ใส่อย่างเดียวก็ไปต่อได้)</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={budgetMeta.totalBudget}
                  onChange={(event) => setBudgetMeta((prev) => ({ ...prev, totalBudget: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="งบรวมทั้งทริป (บาท)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-yellow-400/40"
                />
                <input
                  value={budgetMeta.budgetNote}
                  onChange={(event) => setBudgetMeta((prev) => ({ ...prev, budgetNote: event.target.value }))}
                  placeholder="ข้อจำกัดงบเพิ่มเติม เช่น กินหรูได้ 1 มื้อ"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-yellow-400/40"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">ตัวเลือกงบต่อวันด้านล่างเป็นตัวช่วยเสริม (ไม่บังคับ)</p>
            </div>
          )}

          <div className="grid gap-3">
            {currentQ.options.map((opt) => {
              const isSelected = helpAnswers[currentQ.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    setHelpAnswers((prev) => ({ ...prev, [currentQ.id]: opt.value }));
                    if (currentQ.id === 'transport' && opt.value !== 'car') {
                      setShowCarSettings(false);
                    }
                  }}
                  className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
                    isSelected
                      ? 'shadow-[0_8px_24px_rgba(0,0,0,0.35)]'
                      : 'border-white/10 bg-[#0a0c10] hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.04]'
                  }`}
                  style={
                    isSelected
                      ? {
                          borderColor: theme.accentBorder,
                          backgroundColor: theme.accentBg,
                        }
                      : undefined
                  }
                >
                  {opt.icon && (
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors"
                      style={{
                        borderColor: isSelected ? theme.accentBorder : 'rgba(255,255,255,0.1)',
                        backgroundColor: isSelected ? theme.accentBg : 'rgba(255,255,255,0.03)',
                        color: isSelected ? theme.accent : '#94a3b8',
                      }}
                    >
                      {opt.icon}
                    </div>
                  )}
                  <span
                    className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}
                  >
                    {opt.label}
                  </span>
                  {currentQ.id === 'transport' && opt.value === 'car' && isSelected && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(event) => {
                        event.stopPropagation();
                        setShowCarSettings((prev) => !prev);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          event.stopPropagation();
                          setShowCarSettings((prev) => !prev);
                        }
                      }}
                      className="ml-auto inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-xs text-slate-200 transition-colors hover:bg-white/10"
                      aria-label="ตั้งค่าข้อมูลรถส่วนตัว"
                    >
                      <Settings size={14} />
                      ตั้งค่ารถ
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Optional free text for every question */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-[#0a0c10] p-4">
            <label className="mb-2 block text-xs font-medium text-slate-400">อื่นๆ (พิมพ์เพิ่มได้)</label>
            <textarea
              value={helpOthers[currentQ.id] || ''}
              onChange={(event) => {
                const value = event.target.value;
                setHelpOthers((prev) => ({ ...prev, [currentQ.id]: value }));
              }}
              rows={2}
              placeholder="เช่น โฟกัสความปลอดภัย อยากเลี่ยงคนเยอะ หรือรายละเอียดเฉพาะที่อยากบอก AI"
              className="w-full resize-none rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-500/40"
            />
          </div>

          {/* Transport details */}
          {currentQ.id === 'transport' && helpAnswers.transport === 'car' && (
            <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-emerald-300">ตั้งค่าข้อมูลรถส่วนตัว (เพื่อช่วยคำนวณค่าน้ำมัน)</h3>
                <button
                  type="button"
                  onClick={() => setShowCarSettings((prev) => !prev)}
                  className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300 transition-colors hover:bg-white/10"
                >
                  {showCarSettings ? 'ซ่อนรายละเอียด' : 'แสดงรายละเอียด'}
                </button>
              </div>

              {showCarSettings && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={transportMeta.carModel}
                    onChange={(event) => setTransportMeta((prev) => ({ ...prev, carModel: event.target.value }))}
                    placeholder="รุ่นรถ เช่น Civic, Hilux"
                    className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-400/40"
                  />
                  <input
                    value={transportMeta.fuelPercent}
                    onChange={(event) => setTransportMeta((prev) => ({ ...prev, fuelPercent: event.target.value.replace(/[^0-9]/g, '') }))}
                    placeholder="น้ำมันคงเหลือ (%)"
                    className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-400/40"
                  />
                  <input
                    value={transportMeta.fuelType}
                    onChange={(event) => setTransportMeta((prev) => ({ ...prev, fuelType: event.target.value }))}
                    placeholder="ชนิดน้ำมัน เช่น แก๊สโซฮอล์ 95 / ดีเซล"
                    className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-400/40 sm:col-span-2"
                  />
                </div>
              )}
            </div>
          )}

          {currentQ.id === 'transport' && helpAnswers.transport === 'public' && (
            <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
              <h3 className="mb-3 text-sm font-semibold text-cyan-300">เลือกขนส่งสาธารณะที่อยากใช้ (เลือกได้หลายแบบ)</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { label: 'รถบัส', value: 'รถบัส', icon: <Bus size={14} /> },
                  { label: 'รถตู้', value: 'รถตู้', icon: <Train size={14} /> },
                  { label: 'Grab / Taxi ส่วนตัว', value: 'Grab / Taxi', icon: <CarTaxiFront size={14} /> },
                  { label: 'มอเตอร์ไซค์รับจ้าง', value: 'มอเตอร์ไซค์รับจ้าง', icon: <Bike size={14} /> },
                  { label: 'ไม่มีรถสาธารณะในใจ', value: 'ไม่ระบุ', icon: <Map size={14} /> },
                ].map((option) => {
                  const selected = transportMeta.publicModes.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => togglePublicMode(option.value)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${
                        selected
                          ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-200'
                          : 'border-white/10 bg-[#07090d] text-slate-300 hover:border-cyan-500/40 hover:text-white'
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  );
                })}
              </div>
              <input
                value={transportMeta.publicOther}
                onChange={(event) => setTransportMeta((prev) => ({ ...prev, publicOther: event.target.value }))}
                placeholder="ขนส่งอื่นๆ ที่อยากใช้ (ถ้ามี)"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-500/40"
              />
            </div>
          )}

          {/* Companion details */}
          {currentQ.id === 'companion' && helpAnswers.companion === 'friends' && (
            <div className="mt-4 rounded-2xl border border-pink-500/20 bg-pink-500/5 p-4">
              <h3 className="mb-3 text-sm font-semibold text-pink-300">รายละเอียดกลุ่มเพื่อน (ไม่บังคับ)</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={companionMeta.groupTotal}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, groupTotal: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="จำนวนทั้งหมด (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.male}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, male: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="ชาย (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.female}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, female: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="หญิง (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.lgbtq}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, lgbtq: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="LGBTQ+ (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <select
                  value={companionMeta.lgbtqType}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, lgbtqType: event.target.value }))}
                  aria-label="ประเภท LGBTQ+"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none focus:border-pink-400/40 sm:col-span-2"
                >
                  <option value="">ประเภท LGBTQ+ (ไม่ระบุได้)</option>
                  <option value="สาว">สาว</option>
                  <option value="แมน">แมน</option>
                  <option value="หลากหลาย">หลากหลาย</option>
                </select>
              </div>
            </div>
          )}

          {currentQ.id === 'companion' && helpAnswers.companion === 'family' && (
            <div className="mt-4 rounded-2xl border border-pink-500/20 bg-pink-500/5 p-4">
              <h3 className="mb-3 text-sm font-semibold text-pink-300">รายละเอียดครอบครัว (ไม่บังคับ)</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={companionMeta.familyTotal}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, familyTotal: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="สมาชิกทั้งหมด (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.familyAdults}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, familyAdults: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="ผู้ใหญ่ (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.familyChildren}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, familyChildren: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="เด็ก (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.familyAdultAges}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, familyAdultAges: event.target.value }))}
                  placeholder="อายุผู้ใหญ่รายคน เช่น 38,35"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.familyChildAges}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, familyChildAges: event.target.value }))}
                  placeholder="อายุเด็กรายคน เช่น 4,7"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40 sm:col-span-2"
                />
              </div>
            </div>
          )}

          {/* Next Button — uses current question's theme */}
          {hasAnswered && (
            <button
              onClick={() => setHelpStep((s) => s + 1)}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border py-3 text-sm font-bold text-white transition-all hover:brightness-110"
              style={{
                borderColor: theme.accentBorder,
                backgroundColor: theme.accentBg,
              }}
            >
              {isLastStep ? 'ดูสรุป' : 'ถัดไป'}
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── Mode: "สำรวจตามความสนใจ" ─────────────────────
  if (mode === 'explore') {
    return (
      <div className="flex-1 bg-[#050608] overflow-y-auto">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="mb-8 flex items-start justify-between relative">
            <div>
              <BackButton onClick={handleBack} />
              <h2 className="text-2xl font-bold text-white">สำรวจตามความสนใจ</h2>
            </div>

            {/* Region Filter Dropdown */}
            <div className="flex items-center gap-2 pt-2">
              <div className="relative">
                <button
                  onClick={() => setShowRatingFilter(!showRatingFilter)}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2 transition-all ${
                    showRatingFilter
                      ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300'
                      : ratingSort
                        ? 'border-yellow-500/50 bg-yellow-500/15 text-yellow-300'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {ratingSort === 'desc' ? <ArrowDownNarrowWide size={14} className="text-yellow-400" /> : 
                   ratingSort === 'asc' ? <ArrowUpNarrowWide size={14} className="text-yellow-400" /> : 
                   <span className="text-yellow-400">★</span>}
                  <span className="text-xs font-bold">
                    {ratingSort === 'desc' ? 'Rating: มาก → น้อย' : 
                     ratingSort === 'asc' ? 'Rating: น้อย → มาก' : 'เรียงตาม rating'}
                  </span>
                </button>

                {showRatingFilter && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowRatingFilter(false)} />
                    <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c10] p-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        การเรียงลำดับ
                      </div>
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            setRatingSort('desc');
                            setShowRatingFilter(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                            ratingSort === 'desc'
                              ? 'bg-cyan-500/15 text-cyan-300'
                              : 'text-slate-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <ArrowDownNarrowWide size={14} />
                          เรียงจาก Rating มากไปน้อย
                        </button>
                        <button
                          onClick={() => {
                            setRatingSort('asc');
                            setShowRatingFilter(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                            ratingSort === 'asc'
                              ? 'bg-cyan-500/15 text-cyan-300'
                              : 'text-slate-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <ArrowUpNarrowWide size={14} />
                          เรียงจาก Rating น้อยไปมาก
                        </button>
                        <button
                          onClick={() => {
                            setRatingSort(null);
                            setShowRatingFilter(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                            ratingSort === null
                              ? 'bg-white/10 text-white'
                              : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                          }`}
                        >
                          ล้างการเรียงลำดับ
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowRegionFilter(!showRegionFilter)}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2 transition-all ${
                    showRegionFilter
                      ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300'
                      : selectedRegionFilter
                        ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <Filter size={16} />
                  <span className="text-xs font-bold">
                    {selectedRegionFilter
                      ? REGIONS.find(r => r.id === selectedRegionFilter)?.name || 'กรองตามภูมิภาค'
                      : 'กรองตามภูมิภาค'}
                  </span>
                </button>

                {showRegionFilter && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowRegionFilter(false)} />
                    <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c10] p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            setSelectedRegionFilter(null);
                            setShowRegionFilter(false);
                          }}
                          className={`flex w-full items-center gap-3 rounded-lg p-2.5 text-left text-xs font-medium transition-colors ${
                            selectedRegionFilter === null ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <div className="h-2 w-2 rounded-full bg-slate-400" />
                          ทั้งหมด
                        </button>
                        {REGIONS.map((r) => (
                          <button
                            key={r.id}
                            onClick={() => {
                              setSelectedRegionFilter(r.id);
                              setShowRegionFilter(false);
                            }}
                            className={`flex w-full items-center gap-3 rounded-lg p-2.5 text-left text-xs font-medium transition-colors ${
                              selectedRegionFilter === r.id ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: r.color, boxShadow: `0 0 8px ${r.color}60` }}
                            />
                            {r.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Discovery Chips */}
          <div className="mb-8 flex flex-wrap gap-2">
            {DISCOVERY_CHIPS.map((chip) => {
              const isSelected = selectedChips.includes(chip.label);
              return (
                <button
                  key={chip.label}
                  onClick={() => toggleChip(chip.label)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {chip.icon}
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Region Filter was here */}

          {/* Explore Results */}
          {selectedChips.length > 0 ? (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  ผลลัพธ์สำหรับ: {selectedChips.join(', ')}
                </h3>
                {(selectedRegionFilter || ratingSort) && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {selectedRegionFilter && (
                      <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-emerald-300">
                        <span className="text-[8px]">●</span>
                        {REGIONS.find(r => r.id === selectedRegionFilter)?.name}
                      </span>
                    )}
                    {ratingSort && (
                      <span className="flex items-center gap-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 text-yellow-300">
                        {ratingSort === 'desc' ? 'Rating: มาก → น้อย' : 'Rating: น้อย → มาก'}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {exploreResults.map((item, i) => (
                  <div
                    key={i}
                    className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0a0c10] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/5 flex flex-col"
                    onClick={() => setSelectedPlace(item)}
                  >
                    {/* Thumbnail Section */}
                    <div className="relative h-32 w-full bg-slate-900 overflow-hidden shrink-0">
                      {item.thumbnailUrl && (
                        <CachedImage
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      {/* Fallback Icon */}
                      <div className={`fallback-icon absolute inset-0 flex items-center justify-center bg-slate-800 ${item.thumbnailUrl ? 'hidden' : ''}`}>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-400 shadow-inner">
                          {item.iconName ? (ICON_MAP[item.iconName] || <MapPin size={24} />) : <MapPin size={24} />}
                        </div>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 right-2 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 shadow-lg">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="mb-1 text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1" title={item.title}>
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1 mb-2">{item.location || 'ไม่ระบุตำแหน่ง'}</div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        {item.rating ? (
                          <div className="flex items-center gap-1 rounded-md bg-yellow-500/10 px-1.5 py-0.5 border border-yellow-500/20">
                            <span className="text-[10px] text-yellow-400 leading-none">★</span>
                            <span className="text-[10px] font-bold text-yellow-400 leading-none">{item.rating.toFixed(1)}</span>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex items-center gap-1 overflow-hidden">
                            <span className="truncate text-[9px] text-slate-500">
                              {item.tags.slice(0, 2).join(' • ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  navigate('/intelligence', {
                    state: {
                      context: { type: 'explore', name: selectedChips.join(', ') },
                      prefillInput: `แนะนำสถานที่ท่องเที่ยวในไทยที่เกี่ยวกับ: ${selectedChips.join(', ')} หน่อยครับ`,
                    },
                  });
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 py-3 text-sm font-medium text-cyan-300 transition-all hover:bg-cyan-500/20"
              >
                <Sparkles size={16} />
                ให้ AI แนะนำเพิ่มเติม
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#0a0c10] py-16 text-center">
              <PartyPopper size={32} className="mb-4 text-slate-600" />
              <p className="text-sm text-slate-500">เลือกหมวดด้านบนเพื่อเริ่มสำรวจ</p>
            </div>
          )}

          {/* Place Detail Popup */}
          {selectedPlace && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0c10] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
                <div className="relative h-56 bg-slate-900 shrink-0">
                  {selectedPlace.thumbnailUrl ? (
                    <CachedImage src={selectedPlace.thumbnailUrl} alt={selectedPlace.title} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-slate-400">
                        {selectedPlace.iconName ? ICON_MAP[selectedPlace.iconName] || <MapPin size={32} /> : <MapPin size={32} />}
                      </div>
                    </div>
                  )}
                  <button 
                    onClick={() => setSelectedPlace(null)}
                    className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-md"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white border border-white/10 shadow-lg">
                      {selectedPlace.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 overflow-y-auto">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white leading-tight">{selectedPlace.title}</h3>
                    {selectedPlace.rating && (
                      <div className="flex items-center gap-1 rounded-md bg-yellow-500/10 px-1.5 py-1 text-[11px] font-bold text-yellow-400 border border-yellow-500/20 shrink-0">
                        ★ {selectedPlace.rating.toFixed(1)}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-slate-400 mb-6 flex items-center gap-1.5">
                    <MapPin size={14} className="text-slate-500" />
                    {selectedPlace.location || 'ไม่ระบุตำแหน่ง'}
                  </div>
                  
                  {selectedPlace.description ? (
                    <p className="text-sm text-slate-300 leading-relaxed mb-8">
                      {selectedPlace.description}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-500 italic leading-relaxed mb-8">
                      ไม่มีรายละเอียดเพิ่มเติม
                    </p>
                  )}
                  
                  <div className="flex flex-col gap-3 mt-auto">
                    {/* Primary Actions */}
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          if (selectedPlace.regionId && selectedPlace.provinceId) {
                            const cleanId = selectedPlace.provinceId.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                            navigate(`/province/${selectedPlace.regionId}/${cleanId}`, {
                              state: {
                                focusPlace: {
                                  title: selectedPlace.title,
                                  autoFocus: true
                                }
                              }
                            });
                          }
                        }}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(8,145,178,0.4)]"
                      >
                        <MapPin size={18} />
                        เปิดแผนที่ Locus
                      </button>
                    </div>

                    {/* Secondary Actions */}
                    {selectedPlace.sourceUrl && (
                      <a 
                        href={selectedPlace.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                      >
                        <Map size={14} />
                        Open with Google Maps
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

// ═══════════════════════════════════════════════════════
// Sub Components
// ═══════════════════════════════════════════════════════
interface IntentCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  gradient: string;
  border: string;
  iconBg: string;
  iconColor: string;
  onClick: () => void;
  isAi?: boolean;
  children?: React.ReactNode;
}

const IntentCard = ({ icon, title, subtitle, gradient, border, iconBg, iconColor, onClick, isAi, children }: any) => (
  <button
    onClick={onClick}
    className={`group relative w-full overflow-hidden rounded-[2rem] border ${border} bg-[#0a0c10] p-6 text-left transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] active:scale-[0.99]`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 transition-opacity group-hover:opacity-60`} />
    <div className="relative z-10 flex items-center gap-6">
      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg} ${iconColor} shadow-inner transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-black tracking-tight text-white">{title}</h3>
          {isAi && (
            <span className="rounded-full bg-indigo-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter text-white shadow-lg shadow-indigo-500/30">
              Guide agent
            </span>
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-slate-400">{subtitle}</p>
        {children}
      </div>
      <div className="translate-x-2 text-slate-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
        <ChevronRight size={24} />
      </div>
    </div>
  </button>
);

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="mb-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 transition-all hover:bg-white/10 hover:text-white"
  >
    ← กลับ
  </button>
);

// ─── Icon mapping helper (iconName → lucide component) ───
// Icon mapping is now done inline via ICON_MAP in the component
