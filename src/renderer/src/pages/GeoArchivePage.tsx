import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFuelPricesWithRefresh, refreshFuelPrices } from '../services/fuelPricesService';
import { getRecords } from '../utils/csvDb';
import { AQI_SYNC_EVENT } from '../utils/aqi';
import { CachedImage } from '../components/CachedImage';
import { TrendingPlacesCard } from '../components/TrendingPlacesCard';
import { WeatherHistoryModal } from '../components/WeatherHistoryModal';
import { AQIModal } from '../components/AQIModal';
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
  Filter,
  Info,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Thermometer,
  Wind,
  RefreshCw
} from 'lucide-react';
import KohKradan from '../../../Image/koh_kradan.png';

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
  const location = useLocation();
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
  const [selectedRegionFilters, setSelectedRegionFilters] = useState<string[]>([]);
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
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [isAQIModalOpen, setIsAQIModalOpen] = useState(false);
  const [selectedRegionForWeather, setSelectedRegionForWeather] = useState<{ id: string; name: string } | null>(null);
  const [provinceIndexForModal, setProvinceIndexForModal] = useState<Array<{ id: string; name: string; regionId?: string }>>([]);
  const [fuelSort, setFuelSort] = useState<'asc' | 'desc' | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

  const handleShowRegionWeather = useCallback(async (id: string, name: string) => {
    try {
      const rows = await (window as any).api?.db?.getProvinceIndex?.() || [];
      setProvinceIndexForModal(Array.isArray(rows) ? rows : []);
    } catch { 
      setProvinceIndexForModal([]); 
    }
    setSelectedRegionForWeather({ id, name });
    if (statsViewMode === 'temp') {
      setIsWeatherModalOpen(true);
    } else {
      setIsAQIModalOpen(true);
    }
  }, [statsViewMode]);

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

  // Handle focusFuel from chat deep links
  useEffect(() => {
    const state = location.state as { focusFuel?: string } | null;
    if (state?.focusFuel) {
      const title = state.focusFuel;
      // Extract type from title (e.g., "แก๊สโซฮอล์ 95" -> "95")
      let fuelType = '';
      if (title.includes('95')) fuelType = '95';
      else if (title.includes('91')) fuelType = '91';
      else if (title.includes('E20')) fuelType = 'E20';
      else if (title.includes('E85')) fuelType = 'E85';
      else if (title.includes('98')) fuelType = '98+';
      else if (title.includes('B7')) fuelType = 'B7';
      else if (title.includes('B20')) fuelType = 'B20';
      else if (title.includes('ดีเซล') || title.includes('Diesel')) fuelType = 'Diesel';
      else if (title.includes('Premium')) fuelType = 'Premium';

      if (fuelType) {
        setShowAllFuelPrices(true);
        setOpenFuelType(fuelType);
        // Clear state to avoid re-triggering on refresh
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state]);

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
          if (selectedRegionFilters.length > 0) {
            filtered = filtered.filter((p: ExploreResultItem) => p.regionId && selectedRegionFilters.includes(p.regionId));
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
  }, [selectedChips, selectedRegionFilters, ratingSort]);

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

        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
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

        const provinceToRegion: Record<string, string> = {
          'chiangmai': 'north', 'chiangrai': 'north', 'phayao': 'north', 'nan': 'north',
          'phrae': 'north', 'uttaradit': 'north', 'sukhothai': 'north', 'tak': 'north',
          'khonkaen': 'northeast', 'korat': 'northeast', 'udonthani': 'northeast',
          'nakhonphanom': 'northeast', 'sakonakhon': 'northeast', 'yasothon': 'northeast',
          'amnatcharoen': 'northeast', 'maha': 'northeast', 'loei': 'northeast',
          'chaiyaphum': 'northeast', 'roiet': 'northeast',
          'bangkok': 'central', 'ayutthaya': 'central', 'lopburi': 'central',
          'sara': 'central', 'nakhonnayok': 'central', 'phetchaburi': 'central',
          'chumphon': 'central',
          'phuket': 'south', 'krabi': 'south', 'phangnga': 'south',
          'surat': 'south', 'nakhorn': 'south', 'ranong': 'south',
          'chachoengsao': 'east', 'chonburi': 'east', 'rayong': 'east',
          'trad': 'east',
          'kanchanaburi': 'west', 'ratchaburi': 'west', 'prachuap': 'west'
        };

        
        // Group by region
        const regionData: Record<string, { temps: number[]; aqis: number[] }> = {};
        
        // 1. First, try to get ONLY today's data for a clean "Live" average
        const todayRows = Object.entries(groupedByProvince).map(([provinceId, records]) => {
          const today = records.find((r) => r.date === todayStr);
          return today ? { provinceId, temperature: today.temperature, aqi: today.aqi } : null;
        }).filter((row): row is { provinceId: string; temperature: number; aqi: number } => Boolean(row));

        todayRows.forEach((row) => {
          const normalizedId = normalizeProvinceId(row.provinceId);
          const mappedRegionId = provinceIdToRegionId[normalizedId];
          const fallbackRegionId = Object.entries(provinceToRegion).find(([prov]) =>
            normalizedId.includes(prov) || prov.includes(normalizedId)
          )?.[1];
          const regionId = mappedRegionId || fallbackRegionId;

          if (regionId) {
            if (!regionData[regionId]) regionData[regionId] = { temps: [], aqis: [] };
            if (Number.isFinite(row.temperature)) regionData[regionId].temps.push(row.temperature);
            if (Number.isFinite(row.aqi)) regionData[regionId].aqis.push(row.aqi);
          }
        });

        // 2. If a region has NO today data, fall back to latest past data (but mark as not live if we had the UI for it)
        REGIONS.forEach(r => {
          if (!regionData[r.id] || (regionData[r.id].temps.length === 0 && regionData[r.id].aqis.length === 0)) {
            const fallbackRows = Object.entries(groupedByProvince).map(([provinceId, records]) => {
              const normalizedId = normalizeProvinceId(provinceId);
              const mappedRegionId = provinceIdToRegionId[normalizedId];
              const fallbackRegionId = Object.entries(provinceToRegion).find(([prov]) =>
                normalizedId.includes(prov) || prov.includes(normalizedId)
              )?.[1];
              const regId = mappedRegionId || fallbackRegionId;
              
              if (regId !== r.id) return null;
              
              const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));
              const latest = sorted.find((r) => r.date <= todayStr) || sorted[0];
              return latest ? { temperature: latest.temperature, aqi: latest.aqi } : null;
            }).filter(Boolean);

            if (fallbackRows.length > 0) {
              regionData[r.id] = { temps: [], aqis: [] };
              fallbackRows.forEach(row => {
                if (row && Number.isFinite(row.temperature)) regionData[r.id].temps.push(row.temperature);
                if (row && Number.isFinite(row.aqi)) regionData[r.id].aqis.push(row.aqi);
              });
            }
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
              dataPoints: data ? Math.max(data.temps.length, data.aqis.length) : 0,
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
    // Trending places are now fetched from database in TrendingPlacesCard component
    // No longer need mock data

    const visibleGas = gasPrices; // Show all 3 rows (9 types) by default
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
        {/* Background Image disabled as requested */}
        {/* 
        <div 
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.75)), url(${KohKradan})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        */}
        
        <div className="relative z-10 mx-auto max-w-[1500px] px-10 py-10">
          {/* ─── Main Grid Layout ─── */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-4 items-start">
            {/* Top Row - Left: Intent Cards (6 cols) */}
            <div className="col-span-6 space-y-3">
              <IntentCard
                icon={<MapPin size={36} />}
                title="มีที่ในใจแล้ว"
                subtitle="ระบุพิกัดที่คุณอยากไป แล้วให้เราจัดการเส้นทางให้"
                gradient="from-blue-600/60 via-indigo-500/30 to-violet-500/10"
                border="border-blue-400/40 shadow-[0_0_30px_rgba(37,99,235,0.2)]"
                iconBg="bg-blue-600/40"
                iconColor="text-blue-100"
                onClick={() => navigate('/map', { state: { focusSearch: true } })}
              />
              <IntentCard
                icon={<Compass size={34} />}
                title="สำรวจตามความสนใจ"
                subtitle="เลือกหมวดหมู่ที่ชอบ — ป่าไม้, ทะเล, ของกิน หรือ สถานบันเทิง"
                gradient="from-purple-600/60 via-fuchsia-500/30 to-rose-400/10"
                border="border-purple-400/40 shadow-[0_0_30px_rgba(147,51,234,0.2)]"
                iconBg="bg-purple-600/40"
                iconColor="text-purple-100"
                onClick={() => setMode('explore')}
              >
                <div className="mt-4 flex gap-2">
                  {DISCOVERY_CHIPS.map((chip) => (
                    <div 
                      key={chip.label}
                      className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black text-white/80 border border-white/5 transition-all hover:bg-amber-500/40 hover:text-white hover:border-amber-400/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMode('explore');
                        setSelectedChips([chip.label]);
                      }}
                    >
                      <span className="scale-75 opacity-90">{chip.icon}</span>
                      {chip.label}
                    </div>
                  ))}
                </div>
              </IntentCard>
              <IntentCard
                icon={<Sparkles size={36} />}
                title="ช่วยเลือกให้หน่อย"
                subtitle="ตอบคำถามสั้นๆ แล้ว Locus จะค้นหาจุดหมายที่ใช่ที่สุดสำหรับคุณ"
                isAi={true}
                gradient="from-red-600/60 via-orange-500/30 to-yellow-400/10"
                border="border-red-500/40 shadow-[0_0_30px_rgba(220,38,38,0.25)]"
                iconBg="bg-red-600/40"
                iconColor="text-red-50"
                onClick={() => setMode('help')}
              />
            </div>

            {/* Top Row - Right: Regional Histogram (6 cols) - MOVED HERE */}
            <div className="col-span-6">
              <div className="h-[400px] self-start rounded-[2.5rem] border border-white/20 bg-black/20 backdrop-blur-xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col">
                <div className="relative flex w-full mb-8 rounded-[1.5rem] bg-black/60 border border-white/10 p-1.5 backdrop-blur-md shadow-inner overflow-hidden">
                  {/* Sliding Indicator */}
                  <div 
                    className="absolute top-1.5 bottom-1.5 transition-all duration-500 ease-out bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
                    style={{ 
                      left: statsViewMode === 'temp' ? '6px' : 'calc(50% + 3px)', 
                      width: 'calc(50% - 9px)' 
                    }}
                  />

                  <button
                    onClick={() => setStatsViewMode('temp')}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl text-[13px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${
                      statsViewMode === 'temp' ? 'text-black' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Thermometer size={18} className={`transition-transform duration-500 ${statsViewMode === 'temp' ? 'scale-110 text-cyan-600' : 'text-slate-600'}`} />
                    AVG อุณหภูมิ
                  </button>
                  <button
                    onClick={() => setStatsViewMode('aqi')}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl text-[13px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${
                      statsViewMode === 'aqi' ? 'text-black' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Wind size={18} className={`transition-transform duration-500 ${statsViewMode === 'aqi' ? 'scale-110 text-cyan-600' : 'text-slate-600'}`} />
                    AVG AQI
                  </button>
                </div>

                {regionStats.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-end">
                    <div className="grid grid-cols-6 gap-6 items-end">
                      {displayStats.map((region) => {
                        const regionMeta = REGIONS.find((item) => item.id === region.id);
                        const value = statsViewMode === 'temp' ? region.avgTemp : region.avgAqi;
                        const valueLabel = statsViewMode === 'temp'
                          ? `${value.toFixed(1)}°C`
                          : `${value.toFixed(0)}`;
                        
                        const normalized = valueRange > 0 ? (value - minValue) / valueRange : 0.5;
                        const barHeight = 40 + normalized * (140 - 40); // Scale bar from 40px to 140px

                        return (
                          <div 
                            key={`col-${region.id}`} 
                            className="flex flex-col items-center group cursor-pointer"
                            onClick={() => handleShowRegionWeather(region.id, region.name)}
                            title={`คลิกเพื่อดูรายละเอียด ${statsViewMode === 'temp' ? 'อุณหภูมิ' : 'AQI'} ของ${region.name}`}
                          >
                            {/* Bar Container */}
                            <div className="h-44 w-full flex items-end justify-center px-1 mb-6">
                              <div 
                                className={`w-full max-w-[42px] rounded-t-xl transition-all duration-700 ease-out group-hover:scale-x-110 group-hover:scale-y-105 group-hover:brightness-125 border-x border-t border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${regionMeta?.barClass || 'bg-cyan-500'}`}
                                style={{ 
                                  height: `${barHeight}px`,
                                  boxShadow: `0 0 30px ${regionMeta?.color || '#0ea5e9'}40`
                                }}
                              />
                            </div>

                            {/* Labels */}
                            <div className={`text-xl font-black tracking-tighter ${regionMeta?.colorClass || 'text-slate-300'} drop-shadow-md`}>
                              {valueLabel}
                            </div>
                            <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 truncate w-full text-center mt-2 group-hover:text-slate-300 transition-colors">
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

            {/* Bottom Row - Left: Trending week (6 cols) - MOVED HERE */}
            <div className="col-span-6">
              <div className="h-[400px]">
                <TrendingPlacesCard 
                  limit={4}
                  onClick={(place) => navigate(`/province/${place.regionId}/${place.provinceId}`, { 
                    state: { 
                      focusPlace: {
                        title: place.title,
                        lat: (place as any).lat,
                        lng: (place as any).lng,
                        autoFocus: true
                      }
                    } 
                  })}
                />
              </div>
            </div>

            {/* Bottom Row - Right: Gas Price (6 cols) */}
            <div className="col-span-6">
              <div className="h-[400px] rounded-[2rem] border border-white/20 bg-white/[0.03] backdrop-blur-xl p-8 shadow-xl relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl -mr-24 -mt-24"></div>
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <div className="flex flex-col">
                    <h3 className="text-l font-black text-white tracking-tight">สรุปค่าใช้จ่ายเชื้อเพลิง</h3>
                    <a 
                      href="https://oil-price.bangchak.co.th/BcpOilPrice2/th" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-slate-500 hover:text-amber-500 uppercase tracking-widest font-bold transition-colors"
                    >
                      Bangchak Market Insights ↗
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFuelSort(prev => prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc')}
                      className={`p-2 rounded-xl border transition-all ${
                        fuelSort ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                      title="เรียงตามราคา"
                    >
                      {fuelSort === 'asc' ? <ArrowDownNarrowWide size={14} /> : fuelSort === 'desc' ? <ArrowUpNarrowWide size={14} /> : <Filter size={14} />}
                    </button>
                    <button
                      onClick={handleRefreshFuelPrices}
                      disabled={isRefreshingFuel}
                      className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all disabled:opacity-50 text-slate-400 hover:text-white"
                    >
                      <RefreshCw size={14} className={isRefreshingFuel ? 'animate-spin' : ''} />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 space-y-2 pr-1">
                  <div className="grid grid-cols-12 px-4 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <div className="col-span-5">ประเภทเชื้อเพลิง</div>
                    <div className="col-span-4 text-right">บ./กม. (เฉลี่ย)</div>
                    <div className="col-span-3 text-right">ราคาต่อลิตร</div>
                  </div>
                
                  {(() => {
                    const sortedGas = [...visibleGas];
                    if (fuelSort === 'asc') sortedGas.sort((a, b) => a.price - b.price);
                    else if (fuelSort === 'desc') sortedGas.sort((a, b) => b.price - a.price);
                    
                    return sortedGas.map((gas) => {
                      const details = FUEL_TYPE_DETAILS[gas.type] || { label: gas.type, motorcycle: true, car: true };
                      const isOpen = openFuelType === gas.type;
                      
                      const isGasohol = gas.type.includes('9') || gas.type.includes('E');
                      const fuelColor = isGasohol ? 'bg-emerald-500' : 'bg-amber-500';
                      const fuelGlow = isGasohol ? 'rgba(16,185,129,0.5)' : 'rgba(245,158,11,0.5)';
                      const fuelText = isGasohol ? 'text-emerald-400' : 'text-amber-400';
                      const fuelBorder = isGasohol ? 'border-emerald-500' : 'border-amber-500';
                      const fuelBg = isGasohol ? 'bg-emerald-500/10' : 'bg-amber-500/10';

                      const motoCostKm = gas.price / FUEL_EFFICIENCY.motorcycle;
                      const carCostKm = gas.price / FUEL_EFFICIENCY.car;
                      // Logic: If not for motorcycle, avg is just car cost. If both, average them.
                      const avgCostKm = details.motorcycle ? (motoCostKm + carCostKm) / 2 : carCostKm;
                      
                      // Mock trend for UI
                      const trend = gas.price % 2 === 0 ? 'up' : 'down';

                      return (
                        <div key={gas.type} className="flex flex-col">
                          <div 
                            onClick={() => setOpenFuelType(isOpen ? null : gas.type)}
                            className={`grid grid-cols-12 items-center px-4 py-3 rounded-xl transition-all cursor-pointer border-l-2 ${
                              isOpen 
                                ? `${fuelBg} ${fuelBorder} shadow-lg` 
                                : 'bg-white/[0.02] border-transparent hover:bg-white/[0.05] hover:border-white/10'
                            }`}
                          >
                            <div className="col-span-5 flex items-center gap-3">
                              <div className={`w-1.5 h-1.5 rounded-full ${fuelColor} shadow-[0_0_8px_${fuelGlow}]`}></div>
                              <span className={`text-xs font-bold transition-colors ${isOpen ? fuelText : 'text-slate-300'}`}>
                                {details.label}
                              </span>
                            </div>
                            
                            <div className="col-span-4 text-right">
                              <span className="text-base font-black text-white">{avgCostKm.toFixed(2)}</span>
                              <span className="text-[8px] text-slate-600 font-bold ml-1">฿/KM</span>
                            </div>

                            <div className="col-span-3 flex items-center justify-end gap-2">
                              <div className="text-right">
                                <span className="text-xs font-medium text-slate-400">{gas.price.toFixed(2)}</span>
                                <span className="text-[8px] text-slate-600 font-bold ml-1">฿/L</span>
                              </div>
                              <div className={`flex items-center transition-transform ${trend === 'up' ? 'text-rose-500' : 'text-emerald-500'}`}>
                                {trend === 'up' ? <ArrowUpNarrowWide size={12} /> : <ArrowDownNarrowWide size={12} />}
                              </div>
                            </div>
                          </div>

                          {isOpen && (
                            <div className="mx-2 mt-1 mb-2 p-3 rounded-b-xl border-x border-b border-amber-500/20 bg-amber-500/[0.03] animate-in slide-in-from-top-1 duration-200">
                              <div className="flex justify-between items-center gap-4">
                                <div className={`flex-1 flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/5 ${!details.motorcycle ? 'opacity-30 grayscale' : ''}`}>
                                  <div className="flex items-center gap-2">
                                    <Bike size={14} className="text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Bike</span>
                                  </div>
                                  <span className="text-xs font-black text-amber-200">
                                    {details.motorcycle ? motoCostKm.toFixed(2) : 'N/A'} 
                                    <span className="text-[8px] opacity-50 ml-1">฿/KM</span>
                                  </span>
                                </div>
                                <div className="flex-1 flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                                  <div className="flex items-center gap-2">
                                    <Car size={14} className="text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Sedan</span>
                                  </div>
                                  <span className="text-xs font-black text-amber-200">{carCostKm.toFixed(2)} <span className="text-[8px] opacity-50 ml-1">฿/KM</span></span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather History Modal - reused from ThailandMap */}
        <WeatherHistoryModal
          isOpen={isWeatherModalOpen}
          onClose={() => setIsWeatherModalOpen(false)}
          provinceName={selectedRegionForWeather?.id === 'all' ? "สภาพอากาศทั้งหมด" : `${selectedRegionForWeather?.name}`}
          provinces={(() => {
            if (!selectedRegionForWeather || selectedRegionForWeather.id === 'all') return provinceIndexForModal;
            return provinceIndexForModal.filter(p => p.regionId === selectedRegionForWeather.id);
          })()}
          regionId={selectedRegionForWeather?.id === 'all' ? undefined : selectedRegionForWeather?.id}
          targetProvinceId={selectedRegionForWeather?.id === 'all' ? 'all' : undefined}
          chartScope="region-average"
        />

        {isAQIModalOpen && (
          <AQIModal
            isOpen={isAQIModalOpen}
            onClose={() => setIsAQIModalOpen(false)}
            regionName={selectedRegionForWeather?.id === 'all' ? "ประเทศไทย" : `${selectedRegionForWeather?.name}`}
            provinces={(() => {
              if (!selectedRegionForWeather || selectedRegionForWeather.id === 'all') return provinceIndexForModal;
              return provinceIndexForModal.filter(p => p.regionId === selectedRegionForWeather.id);
            })()}
          />
        )}
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
                      : selectedRegionFilters.length > 0
                        ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <Filter size={16} />
                  <span className="text-xs font-bold">
                    {selectedRegionFilters.length > 0
                      ? selectedRegionFilters.length === 1 
                        ? REGIONS.find(r => r.id === selectedRegionFilters[0])?.name
                        : `เลือกแล้ว ${selectedRegionFilters.length} ภูมิภาค`
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
                            setSelectedRegionFilters([]);
                            // Keep open for multi-select convenience or close if user prefers
                            // setShowRegionFilter(false); 
                          }}
                          className={`flex w-full items-center gap-3 rounded-lg p-2.5 text-left text-xs font-medium transition-colors ${
                            selectedRegionFilters.length === 0 ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <div className="h-2 w-2 rounded-full bg-slate-400" />
                          ทั้งหมด
                        </button>
                        {REGIONS.map((r) => {
                          const isSelected = selectedRegionFilters.includes(r.id);
                          return (
                            <button
                              key={r.id}
                              onClick={() => {
                                setSelectedRegionFilters(prev => 
                                  prev.includes(r.id) 
                                    ? prev.filter(id => id !== r.id)
                                    : [...prev, r.id]
                                );
                              }}
                              className={`flex w-full items-center gap-3 rounded-lg p-2.5 text-left text-xs font-medium transition-colors ${
                                isSelected ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              <div
                                className="h-2 w-2 rounded-full"
                                style={{ 
                                  backgroundColor: r.color, 
                                  boxShadow: isSelected ? `0 0 8px ${r.color}80` : `0 0 8px ${r.color}30` 
                                }}
                              />
                              <div className="flex-1">{r.name}</div>
                              {isSelected && (
                                <div className="text-[10px] text-cyan-400 font-bold">✓</div>
                              )}
                            </button>
                          );
                        })}
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
                {(selectedRegionFilters.length > 0 || ratingSort) && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                    {selectedRegionFilters.map(regionId => (
                      <span key={regionId} className="flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-emerald-300">
                        <span className="text-[8px]">●</span>
                        {REGIONS.find(r => r.id === regionId)?.name}
                      </span>
                    ))}
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
    className={`group relative w-full overflow-hidden rounded-[2rem] border ${border} bg-[#0a0c10] p-5 text-left transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] active:scale-[0.99]`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 transition-opacity group-hover:opacity-60`} />
    <div className="relative z-10 flex items-center gap-6">
      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg} ${iconColor} shadow-inner transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-black tracking-tight text-white">{title}</h3>
          {isAi && (
            <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-black uppercase tracking-tighter text-red-600 shadow-lg shadow-red-500/40">
              Guide agent
            </span>
          )}
        </div>
        <p className="mt-2 text-base font-medium text-slate-400">{subtitle}</p>
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
