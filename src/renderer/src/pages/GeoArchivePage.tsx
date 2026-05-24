import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFuelPricesWithRefresh, refreshFuelPrices } from '../services/fuelPricesService';
import { getRecords } from '../utils/csvDb';
import { AQI_SYNC_EVENT } from '../utils/aqi';
import { HOLIDAYS } from '../data/holidayData';
import { appendTravelPlanHistory, saveTravelPlanSnapshot } from '../utils/travelPlans';
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
  ChevronLeft,
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
  RefreshCw,
  Search,
  Bell,
  Globe,
  X,
  Clock,
  Video,
  AlignLeft,
  ChevronDown
} from 'lucide-react';
import KohKradan from '../../../Image/koh_kradan.png';
import { PremiumCalendarCard } from '../components/PremiumCalendarCard';

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
  id?: number;
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
  fullImageUrl?: string | null;
}

// ─── Data ───────────────────────────────────────────
const DISCOVERY_CHIPS: DiscoveryChip[] = [
  { label: 'ทั้งหมด', icon: <Compass size={14} />, keywords: ['all'] },
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
// Constants & Mock Data
// ═══════════════════════════════════════════════════════
const HOME_SUGGESTIONS = ['เชียงใหม่', 'ภูเก็ต', 'ทะเล', 'คาเฟ่ธรรมชาติ'];

type ProvinceIndexItem = {
  id: string;
  name: string;
  regionId?: string;
  regionName?: string;
};

type HomeSuggestionItem = {
  kind: 'province' | 'place';
  id: string;
  label: string;
  subtitle: string;
  regionId?: string;
  provinceId?: string;
  score: number;
};

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

  let qi = 0;
  for (let i = 0; i < c.length && qi < q.length; i += 1) {
    if (c[i] === q[qi]) qi += 1;
  }
  return qi / q.length >= 0.8;
};

const matchesProvinceIndex = (query: string, province: ProvinceIndexItem) =>
  isLooseMatch(query, province.name) ||
  isLooseMatch(query, province.id) ||
  isLooseMatch(query, province.regionName || '');

const scoreTextMatch = (query: string, candidate: string) => {
  const q = normalizeSearchText(query);
  const c = normalizeSearchText(candidate);
  if (!q || !c) return 0;
  if (c === q) return 100;
  if (c.startsWith(q)) return 90;
  if (c.includes(q)) return 80 - Math.min(Math.max(c.indexOf(q), 0), 20);

  let qi = 0;
  for (let i = 0; i < c.length && qi < q.length; i += 1) {
    if (c[i] === q[qi]) qi += 1;
  }
  return qi / q.length >= 0.8 ? 60 : 0;
};

const buildHomeSuggestions = (
  query: string,
  provinces: ProvinceIndexItem[],
  places: Array<{ id: number; title: string; locationName: string | null; regionId: string | null; provinceId: string | null; category: string | null; tags: string[] | null }>,
) => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const provinceItems: HomeSuggestionItem[] = provinces
    .map((province) => ({
      kind: 'province' as const,
      id: province.id,
      label: province.name,
      subtitle: province.regionName || province.regionId || 'จังหวัด',
      regionId: province.regionId,
      score: Math.max(
        scoreTextMatch(trimmed, province.name),
        scoreTextMatch(trimmed, province.id),
        scoreTextMatch(trimmed, province.regionName || ''),
      ),
    }))
    .filter((item) => item.score > 0);

  const placeItems: HomeSuggestionItem[] = places
    .map((place) => ({
      kind: 'place' as const,
      id: String(place.id),
      label: place.title,
      subtitle: [place.locationName, place.category].filter(Boolean).join(' · ') || 'สถานที่',
      regionId: place.regionId || undefined,
      provinceId: place.provinceId || undefined,
      score: Math.max(
        scoreTextMatch(trimmed, place.title),
        scoreTextMatch(trimmed, place.locationName || ''),
        scoreTextMatch(trimmed, place.category || ''),
        ...(place.tags || []).map((tag) => scoreTextMatch(trimmed, tag)),
      ),
    }))
    .filter((item) => item.score > 0);

  return [...provinceItems, ...placeItems]
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label, 'th'))
    .slice(0, 8);
};

const TRAVEL_CHECKLIST_ITEMS = [
  {
    id: 'plan-destination',
    title: 'ล็อกปลายทางและจุดแวะ',
    detail: 'ยืนยันจังหวัดหลัก จุดพัก และสถานที่สำรอง',
    when: 'วันนี้',
    date: '09:00',
    category: 'Plan',
    done: true,
  },
  {
    id: 'book-stay',
    title: 'จองที่พัก / เช็คอิน',
    detail: 'เลือกที่พักให้ใกล้แผนเดินทางที่สุด',
    when: 'ก่อนเดินทาง 3 วัน',
    date: '18:00',
    category: 'Booking',
    done: false,
  },
  {
    id: 'check-weather',
    title: 'เช็คอากาศและ AQI',
    detail: 'ดูฝน ลม และช่วงที่เหมาะออกเดินทาง',
    when: 'ก่อนออก 1 วัน',
    date: '07:00',
    category: 'Weather',
    done: false,
  },
  {
    id: 'prepare-gear',
    title: 'เตรียมของจำเป็น',
    detail: 'เสื้อผ้า ยา พาวเวอร์แบงก์ และเอกสาร',
    when: 'คืนนี้',
    date: '20:30',
    category: 'Packing',
    done: false,
  },
  {
    id: 'route-check',
    title: 'เช็คเส้นทางและเวลาออก',
    detail: 'ตั้งเวลาออกจากบ้านและเผื่อรถติด',
    when: 'เช้าวันเดินทาง',
    date: '06:30',
    category: 'Route',
    done: true,
  },
];

const RECENT_SEARCHES = ['น่าน', 'พัทยา', 'ดอยอินทนนท์', 'ร้านอาหาร เชียงใหม่'];

const getProgressClass = (percent: number) => {
  if (percent === 100) return 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]';
  if (percent >= 50) return 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]';
  return 'bg-rose-400 shadow-[0_0_10px_rgba(251,113,113,0.5)]';
};

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
  const [homeSearch, setHomeSearch] = useState('');
  const [homeProvinceIndex, setHomeProvinceIndex] = useState<ProvinceIndexItem[]>([]);
  const [homeExplorePlaces, setHomeExplorePlaces] = useState<Array<{ id: number; title: string; locationName: string | null; regionId: string | null; provinceId: string | null; category: string | null; tags: string[] | null }>>([]);
  const [planChecklist, setPlanChecklist] = useState<Record<string, boolean>>(() => Object.fromEntries(TRAVEL_CHECKLIST_ITEMS.map((task) => [task.id, task.done])));
  const [customDraftItems, setCustomDraftItems] = useState<any[]>(() => {
    try {
      const snap = JSON.parse(window.localStorage.getItem('locus_travel_plan_snapshot') || 'null');
      if (snap && Array.isArray(snap.items)) {
        const baseIds = new Set(TRAVEL_CHECKLIST_ITEMS.map(t => t.id));
        return snap.items.filter((i: any) => !baseIds.has(i.id));
      }
    } catch {}
    return [];
  });
  const [showPlanEditor, setShowPlanEditor] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);
  const [userEvents, setUserEvents] = useState<Holiday[]>([]);
  const [calendarActiveTab, setCalendarActiveTab] = useState<'plan' | 'activity'>('plan');
  const [newEventCategory, setNewEventCategory] = useState('Plan');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [showEventTimeInput, setShowEventTimeInput] = useState(false);
  const [showEventGuestInput, setShowEventGuestInput] = useState(false);
  const [showEventLocationInput, setShowEventLocationInput] = useState(false);
  const [showEventDescInput, setShowEventDescInput] = useState(false);
  const [newEventTimeStart, setNewEventTimeStart] = useState('09:00');
  const [newEventTimeEnd, setNewEventTimeEnd] = useState('10:00');
  const [newEventGuests, setNewEventGuests] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [planDraft, setPlanDraft] = useState({
    title: '',
    detail: '',
    when: 'วันนี้',
    date: '09:00',
    category: 'Plan',
  });

  // Checklist is rendered as a scrollable list (max 4 visible) — no windowing required.

  useEffect(() => {
    const baseItems = TRAVEL_CHECKLIST_ITEMS.map((task) => ({
      id: task.id,
      title: task.title,
      detail: task.detail,
      when: task.when,
      date: task.date,
      category: task.category,
      completed: planChecklist[task.id] ?? task.done,
    }));
    saveTravelPlanSnapshot([...baseItems, ...customDraftItems]);
  }, [planChecklist, customDraftItems]);

  const handleHomeSearch = (queryOverride?: string) => {
    const query = (queryOverride ?? homeSearch).trim();
    if (!query) return;

    const directMatch = homeProvinceIndex.find((province) => matchesProvinceIndex(query, province));
    if (directMatch?.regionId) {
      const cleanId = directMatch.id.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      navigate(`/province/${directMatch.regionId}/${cleanId}`, {
        state: {
          focusPlace: {
            title: directMatch.name,
            autoFocus: true,
          },
        },
      });
      return;
    }

    const bestSuggestion = buildHomeSuggestions(query, homeProvinceIndex, homeExplorePlaces)[0];
    if (bestSuggestion) {
      handleHomeSuggestionPick(bestSuggestion);
      return;
    }

    navigate('/map', { state: { focusSearch: true, searchQuery: query } });
  };

  const handleHomeSuggestionPick = (suggestion: HomeSuggestionItem) => {
    setHomeSearch(suggestion.label);
    if (suggestion.kind === 'province' && suggestion.regionId) {
      const cleanId = suggestion.id.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      navigate(`/province/${suggestion.regionId}/${cleanId}`, {
        state: {
          focusPlace: {
            title: suggestion.label,
            autoFocus: true,
          },
        },
      });
      return;
    }

    if (suggestion.kind === 'place' && suggestion.regionId && suggestion.provinceId) {
      navigate(`/province/${suggestion.regionId}/${suggestion.provinceId}`, {
        state: {
          focusPlace: {
            title: suggestion.label,
            autoFocus: true,
          },
        },
      });
      return;
    }

    handleHomeSearch(suggestion.label);
  };

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
  const [fuelVehicleType, setFuelVehicleType] = useState<'car' | 'motorcycle'>('car');
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const [isSyncingPlace, setIsSyncingPlace] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isFullscreenViewerOpen, setIsFullscreenViewerOpen] = useState(false);

  // Auto-sync Google Maps gallery photos when place detail is opened
  useEffect(() => {
    setActiveImageIdx(0); // Reset index on place change!

    if (!selectedPlace) return;

    let hasMultipleImages = false;
    try {
      if (selectedPlace.fullImageUrl) {
        if (selectedPlace.fullImageUrl.startsWith('[')) {
          const arr = JSON.parse(selectedPlace.fullImageUrl);
          if (Array.isArray(arr) && arr.length > 1) {
            hasMultipleImages = true;
          }
        }
      }
    } catch (e) {}

    // Only auto-trigger if we don't have multiple images, have an ID, and are not currently syncing
    if (!hasMultipleImages && selectedPlace.id && !isSyncingPlace) {
      console.log(`[Auto-Sync] Triggering background enrichment for: ${selectedPlace.title}`);
      
      const autoSync = async () => {
        setIsSyncingPlace(true);
        try {
          const api = (window as any).api;
          const result = await api.explorePlaces.scrapeSinglePlace(selectedPlace.id);
          if (result) {
            const updatedPlace = {
              id: result.id,
              title: result.title,
              location: result.locationName || '',
              category: result.category || '',
              iconName: result.iconName || null,
              tags: result.tags || undefined,
              regionId: result.regionId || undefined,
              provinceId: result.provinceId || undefined,
              rating: result.rating,
              description: result.description,
              thumbnailUrl: result.thumbnailUrl,
              sourceUrl: result.sourceUrl,
              openingHours: result.openingHours,
              fullImageUrl: result.fullImageUrl,
            };
            setSelectedPlace(updatedPlace);
            setExploreResults(prev => prev.map(p => p.id === selectedPlace.id ? updatedPlace : p));
          }
        } catch (err) {
          console.error('[Auto-Sync] Failed:', err);
        } finally {
          setIsSyncingPlace(false);
        }
      };

      autoSync();
    }
  }, [selectedPlace?.id]);

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

    const loadProvinceIndex = async () => {
      try {
        const api = (window as any).api;
        const rows = api?.db?.getProvinceIndex ? await api.db.getProvinceIndex() : [];
        if (!isMounted) return;
        setHomeProvinceIndex(Array.isArray(rows) ? rows : []);
      } catch {
        if (isMounted) setHomeProvinceIndex([]);
      }
    };

    const loadExplorePlaces = async () => {
      try {
        const api = (window as any).api;
        const rows = api?.explorePlaces?.getAll ? await api.explorePlaces.getAll() : [];
        if (!isMounted) return;
        setHomeExplorePlaces(Array.isArray(rows) ? rows : []);
      } catch {
        if (isMounted) setHomeExplorePlaces([]);
      }
    };

    void loadProvinceIndex();
    void loadExplorePlaces();

    const loadFuelPrices = async () => {
      try {
        const colorMap: Record<string, string> = {
          '95': 'bg-blue-500', '91': 'bg-teal-500', 'E20': 'bg-emerald-500',
          'E85': 'bg-rose-500', 'B7': 'bg-amber-500', 'B20': 'bg-orange-500',
          'Diesel': 'bg-slate-500', 'Premium': 'bg-purple-600', '98+': 'bg-red-600'
        };

        // 1. Optimistic load from cache instantly
        const api = (window as any).api;
        if (api?.fuelPrices?.get) {
          try {
            const cached = await api.fuelPrices.get();
            if (cached && cached.length > 0 && isMounted) {
              setGasPrices(cached.map((p: any) => ({
                type: p.fuelType,
                price: p.price,
                color: colorMap[p.fuelType] || 'bg-slate-500'
              })));
            }
          } catch (e) {
            console.warn('[GeoArchive] Failed to load cached fuel prices:', e);
          }
        }

        // 2. Fetch fresh data in the background
        setIsRefreshingFuel(true);
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
      } finally {
        if (isMounted) setIsRefreshingFuel(false);
      }
    };
    loadFuelPrices();

    // Load custom user events
    try {
      const storedEvents = localStorage.getItem('locus_custom_events');
      if (storedEvents && isMounted) {
        setUserEvents(JSON.parse(storedEvents));
      }
    } catch (e) {
      console.warn('Failed to load custom events', e);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Pre-fill modal data when opening a calendar date
  useEffect(() => {
    if (selectedCalendarDate) {
      const customEventObj = userEvents.find((e) => e.date === selectedCalendarDate && e.type === 'custom') as any;
      if (customEventObj) {
        setNewEventTitle(customEventObj.name || '');
        setNewEventTimeStart(customEventObj.timeStart || '09:00');
        setNewEventTimeEnd(customEventObj.timeEnd || '10:00');
        setNewEventGuests(customEventObj.guests || '');
        setNewEventLocation(customEventObj.location || '');
        setNewEventDesc(customEventObj.description || '');
        
        setShowEventTimeInput(!!customEventObj.timeStart);
        setShowEventGuestInput(!!customEventObj.guests);
        setShowEventLocationInput(!!customEventObj.location);
        setShowEventDescInput(!!customEventObj.description);
      } else {
        const publicEvent = HOLIDAYS.find((e) => e.date === selectedCalendarDate);
        setNewEventTitle(publicEvent ? publicEvent.name : '');
        setNewEventTimeStart('09:00');
        setNewEventTimeEnd('10:00');
        setNewEventGuests('');
        setNewEventLocation('');
        setNewEventDesc('');
        
        setShowEventTimeInput(false);
        setShowEventGuestInput(false);
        setShowEventLocationInput(false);
        setShowEventDescInput(false);
      }
    }
  }, [selectedCalendarDate]); // Intentionally omitting userEvents so it doesn't re-run on save unless date changes

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
        let places = [];
        if (selectedChips.includes('ทั้งหมด')) {
          places = api?.explorePlaces?.getAll
            ? await api.explorePlaces.getAll()
            : [];
        } else {
          // Map chip labels to DB category names
          const categories = selectedChips.flatMap(chip => CHIP_TO_CATEGORIES[chip] || [chip]);
          const uniqueCategories = [...new Set(categories)];
          places = api?.explorePlaces?.getByCategories
            ? await api.explorePlaces.getByCategories(uniqueCategories)
            : [];
        }
        if (!isMounted) return;
        if (places && places.length > 0) {
          let filtered = places.map((p: any) => ({
            id: p.id,
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
            fullImageUrl: p.fullImageUrl,
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
    setSelectedChips((prev) => {
      if (label === 'ทั้งหมด') {
        return prev.includes('ทั้งหมด') ? [] : ['ทั้งหมด'];
      } else {
        const withoutAll = prev.filter((c) => c !== 'ทั้งหมด');
        return withoutAll.includes(label)
          ? withoutAll.filter((c) => c !== label)
          : [...withoutAll, label];
      }
    });
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
      travelPlanChecklist: TRAVEL_CHECKLIST_ITEMS.map((task) => ({
        id: task.id,
        title: task.title,
        detail: task.detail,
        when: task.when,
        date: task.date,
        category: task.category,
        completed: planChecklist[task.id] ?? task.done,
      })),
    };

    return JSON.stringify(payload, null, 2);
  };

  const buildReadableSummary = () => {
    const checklistSummary = TRAVEL_CHECKLIST_ITEMS.map((task) => {
      const checked = planChecklist[task.id] ?? task.done;
      return `- [${checked ? 'x' : ' '}] ${task.title} (${task.when} · ${task.date})`;
    }).join('\n');

    return HELP_QUESTIONS.map((q) => {
      const details = getQuestionDetails(q.id);
      const detailText = details.length > 0 ? `\n- ${details.join('\n- ')}` : '';
      return `${q.question} ${getAnswerLabel(q.id)}${detailText}`;
    }).join('\n') + '\n\nTravel checklist:\n' + checklistSummary;
  };

  // ─── Intent Selection (Home) ──────────────────────
  if (mode === null) {
    const displayStats = regionStats
      .slice()
      .sort((a, b) => (statsViewMode === 'temp' ? b.avgTemp - a.avgTemp : b.avgAqi - a.avgAqi));
    const topStats = displayStats.slice(0, 6);
    const maxValue = topStats.length > 0 ? Math.max(...topStats.map(s => statsViewMode === 'temp' ? s.avgTemp : s.avgAqi)) : 1;
    const minValue = topStats.length > 0 ? Math.min(...topStats.map(s => statsViewMode === 'temp' ? s.avgTemp : s.avgAqi)) : 0;
    const valueRange = Math.max(maxValue - minValue, 1);
    const visibleGas = gasPrices.slice(0, 5);
    const suggestionQuery = homeSearch.trim();
    const homeSuggestionItems = buildHomeSuggestions(suggestionQuery, homeProvinceIndex, homeExplorePlaces);
    const showHomeSuggestions = suggestionQuery.length > 0;

    return (
      <div className="flex-1 overflow-hidden relative bg-[#050608] flex">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-indigo-500/8 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-purple-500/8 blur-3xl" />
        </div>

        {/* Rainbow header banner */}
        <div className="absolute top-0 left-0 right-0 z-30">
          <div className="h-14 w-full overflow-hidden rounded-b-2xl shadow-[0_6px_30px_rgba(0,0,0,0.6)]">
            <div className="h-full bg-[linear-gradient(90deg,#38bdf8_0%,#2563eb_16%,#7c3aed_32%,#ef4444_50%,#f97316_68%,#facc15_84%,#22c55e_100%)]" />
          </div>
        </div>

        {/* ══ LEFT MAIN COLUMN ══ */}
        <div className="relative z-10 flex-1 flex flex-col justify-start overflow-y-auto px-8 pt-20 pb-10 gap-6">
          {/* Search Hero */}
          <div className="flex justify-center mt-14">
            <div className="w-full max-w-2xl relative flex items-center gap-4 rounded-[1.5rem] border border-white bg-white/[0.03] px-6 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all hover:border-white/90 focus-within:border-white focus-within:bg-white/[0.05] focus-within:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.9),0_0_34px_rgba(99,102,241,0.22)]">
              <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-r from-cyan-400/0 via-sky-400/0 to-fuchsia-400/0 opacity-0 transition-opacity duration-300 focus-within:opacity-100" />
              <Search size={20} className="flex-shrink-0 text-slate-500" />
              <input
                value={homeSearch}
                onChange={(e) => setHomeSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleHomeSearch(); }}
                placeholder="ค้นหาสถานที่ที่คุณอยากไป..."
                className="relative z-10 flex-1 appearance-none border-0 bg-transparent text-[16px] font-medium text-white outline-none ring-0 shadow-none caret-white placeholder:text-slate-600 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              />
              <button
                onClick={() => setMode('help')}
                className="flex-shrink-0 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-2.5 text-[12px] font-black text-white shadow-[0_8px_20px_rgba(99,102,241,0.3)] transition-all hover:shadow-[0_8px_30px_rgba(99,102,241,0.5)] hover:scale-[1.02] active:scale-95"
              >
                <Sparkles size={14} className="animate-pulse" />
                Locus Agent
              </button>
              {showHomeSuggestions && (
                <div className="absolute left-0 right-0 top-full z-40 mt-3 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a0c10]/95 shadow-[0_28px_70px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
                  <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">Suggestions</div>
                      <div className="text-[11px] text-slate-600">จังหวัด / สถานที่ที่ใกล้เคียง</div>
                    </div>
                    <div className="text-[10px] font-bold text-slate-500">Enter to search</div>
                  </div>
                  <div className="max-h-72 overflow-y-auto custom-scrollbar p-2">
                    {homeSuggestionItems.length > 0 ? homeSuggestionItems.map((item) => (
                      <button
                        key={`${item.kind}-${item.id}`}
                        type="button"
                        onClick={() => handleHomeSuggestionPick(item)}
                        className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all hover:bg-white/5"
                      >
                        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.kind === 'place' ? 'bg-fuchsia-500/10 text-fuchsia-300' : 'bg-cyan-500/10 text-cyan-300'}`}>
                          <MapPin size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-bold text-white">{item.label}</div>
                          <div className="truncate text-[11px] text-slate-500">{item.subtitle}</div>
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Enter</div>
                      </button>
                    )) : (
                      <div className="px-4 py-8 text-center text-sm text-slate-500">
                        ไม่พบผลลัพธ์ที่ใกล้เคียง
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Three Cards Row — moved down to use more vertical space */}
          <div className="flex-shrink-0 grid grid-cols-3 gap-6 mt-16">

            {/* Card 1 — สำรวจตามความสนใจ */}
            <div className="group rounded-[1.5rem] border border-purple-500/10 bg-gradient-to-br from-purple-600/10 via-indigo-500/5 to-transparent p-5 flex flex-col gap-4 transition-all hover:border-purple-500/30 hover:bg-purple-500/5">
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-black uppercase tracking-wider text-slate-300">สำรวจตามความสนใจ</h3>
                <button onClick={() => { setSelectedChips(['ทั้งหมด']); setMode('explore'); }} className="text-[10px] font-bold text-purple-400 hover:text-purple-200 transition-colors">EXPLORE ALL</button>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {DISCOVERY_CHIPS.slice(0, 4).map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => { setSelectedChips([chip.label]); setMode('explore'); }}
                    className="flex items-center gap-2.5 rounded-[1rem] border border-white/5 bg-white/[0.03] px-3 py-3 text-[11px] text-slate-400 font-bold transition-all hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-white hover:scale-[1.03]"
                  >
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity">{chip.icon}</span>
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Card 2 — ราคาน้ำมัน */}
            <div className="group rounded-[1.5rem] border border-amber-500/10 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-5 flex flex-col gap-4 transition-all hover:border-amber-500/30 hover:bg-amber-500/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[13px] font-black uppercase tracking-wider text-slate-300">ราคาน้ำมันวันนี้</h3>
                  <a href="https://oil-price.bangchak.co.th/BcpOilPrice2/th" target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-amber-600/80 hover:text-amber-400 transition-colors">SOURCE: BANGCHAK</a>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAllFuelPrices(true)}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-500 hover:text-white"
                    title="Open full fuel price popup"
                    aria-label="Open full fuel price popup"
                  >
                    <Info size={12} />
                  </button>
                  <button onClick={handleRefreshFuelPrices} disabled={isRefreshingFuel} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all disabled:opacity-50 text-slate-500 hover:text-white" title="Refresh fuel prices" aria-label="Refresh fuel prices">
                    <RefreshCw size={12} className={isRefreshingFuel ? 'animate-spin' : ''} />
                  </button>
                </div>
              </div>

              {/* Vehicle Type Toggle */}
              <div className="flex bg-white/[0.03] p-0.5 rounded-xl border border-white/5 gap-1">
                <button
                  type="button"
                  onClick={() => setFuelVehicleType('car')}
                  className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all text-center ${
                    fuelVehicleType === 'car'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/20 shadow-md font-black'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  รถยนต์ 
                </button>
                <button
                  type="button"
                  onClick={() => setFuelVehicleType('motorcycle')}
                  className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all text-center ${
                    fuelVehicleType === 'motorcycle'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/20 shadow-md font-black'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  มอเตอร์ไซค์ 
                </button>
              </div>

              <div className="flex-1 space-y-2">
                {(() => {
                  const sorted = [...visibleGas];
                  if (fuelSort === 'asc') sorted.sort((a, b) => a.price - b.price);
                  else if (fuelSort === 'desc') sorted.sort((a, b) => b.price - a.price);
                  return sorted.slice(0, 6).map((gas) => {
                    const det = FUEL_TYPE_DETAILS[gas.type] || { label: gas.type, motorcycle: true, car: true };
                    const costKm = gas.price / FUEL_EFFICIENCY[fuelVehicleType];
                    const isGasohol = gas.type.includes('9') || gas.type.includes('E');
                    return (
                      <div key={gas.type} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-white/[0.02] hover:border-white/[0.05]">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-2 h-2 flex-shrink-0 rounded-full ${isGasohol ? 'bg-emerald-500' : 'bg-amber-500'} shadow-[0_0_8px_rgba(16,185,129,0.4)]`} />
                          <span className="text-[12px] font-bold text-slate-400 truncate">{det.label}</span>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0 ml-2">
                          <div className="text-right">
                            <span className="block text-[13px] font-black text-amber-400 tracking-tight">{gas.price.toFixed(2)}<span className="text-[9px] text-slate-600 font-bold ml-1">฿/L</span></span>
                            <span className="block text-[9px] font-bold text-slate-500">~{costKm.toFixed(2)} ฿/km</span>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {showAllFuelPrices && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm">
                <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0a0c10] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-300">Fuel details</div>
                      <h4 className="mt-1 text-lg font-bold text-white">ราคาน้ำมันทั้งหมด</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAllFuelPrices(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/10 hover:text-white"
                      aria-label="Close fuel price popup"
                    >
                      <ChevronRight size={16} className="rotate-45" />
                    </button>
                  </div>

                  {/* Vehicle Type Toggle inside modal */}
                  <div className="mt-4 flex bg-white/[0.03] p-0.5 rounded-xl border border-white/5 gap-1">
                    <button
                      type="button"
                      onClick={() => setFuelVehicleType('car')}
                      className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all text-center ${
                        fuelVehicleType === 'car'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/20 shadow-md font-black'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                       รถยนต์ (~14 km/L)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFuelVehicleType('motorcycle')}
                      className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all text-center ${
                        fuelVehicleType === 'motorcycle'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/20 shadow-md font-black'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                       มอเตอร์ไซค์ (~35 km/L)
                    </button>
                  </div>

                  <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1 space-y-2">
                    {[...visibleGas].map((gas) => {
                      const detail = FUEL_TYPE_DETAILS[gas.type] || { label: gas.type, motorcycle: true, car: true };
                      const isActive = openFuelType ? openFuelType === gas.type : false;
                      const costKm = gas.price / FUEL_EFFICIENCY[fuelVehicleType];
                      return (
                        <div
                          key={gas.type}
                          className={`rounded-2xl border px-4 py-3 transition-colors ${isActive ? 'border-amber-400/40 bg-amber-500/10' : 'border-white/5 bg-white/[0.02]'}`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <div className="text-sm font-bold text-white">{detail.label}</div>
                              <div className="mt-1 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
                                {detail.motorcycle ? 'Motorcycle ok' : 'Car only'} · {detail.car ? 'Car ok' : 'No car'}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-black text-amber-300">{gas.price.toFixed(2)}</div>
                              <div className="text-[10px] font-bold text-slate-500">฿/L</div>
                              <div className="mt-1 text-[10px] font-bold text-slate-500">~{costKm.toFixed(2)} ฿/km</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Card 3 — Checklist + Upcoming Event */}
            <div className="group rounded-[1.5rem] border border-cyan-500/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent p-5 flex flex-col gap-4 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[13px] font-black uppercase tracking-wider text-slate-300">แผนการเดินทาง</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/travel-plans')}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                    title="Open travel plan history"
                  >
                    History
                  </button>
                  <button
                    onClick={() => {
                      setPlanDraft({
                        title: '',
                        detail: '',
                        when: new Date().toISOString().split('T')[0], // YYYY-MM-DD for date input picker
                        date: '09:00 - 10:00', // start - end time initial value
                        category: 'Plan',
                      });
                      setShowPlanEditor(true);
                    }}
                    className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-all hover:scale-110"
                    title="Create plan"
                  >
                    <span className="text-lg font-black leading-none">+</span>
                  </button>
                </div>
              </div>

              {/* Next Upcoming Event (compact mini version) */}
              {(() => {
                const now = new Date();
                const todayStr = now.toISOString().split('T')[0];
                const nextEvent = HOLIDAYS.filter(h => h.date >= todayStr).sort((a, b) => a.date.localeCompare(b.date))[0];
                
                if (!nextEvent) return null;
                
                const diffTime = new Date(nextEvent.date).getTime() - now.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                return (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Bell size={14} className="flex-shrink-0 text-amber-400 animate-pulse" />
                        <div className="min-w-0 flex-1">
                          <div className="text-[9px] font-black uppercase tracking-[0.15em] text-amber-300">Next event</div>
                          <div className="text-xs font-bold text-white truncate">{nextEvent.name}</div>
                          <div className="text-[8px] font-medium text-amber-300/70">{diffDays === 0 ? 'วันนี้!' : `อีก ${diffDays} วัน`}</div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-[9px] font-bold text-slate-400">{nextEvent.date}</div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-3 py-2">
                <div className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">Plan progress</div>
                <div className="text-[11px] font-black text-white">
                  {TRAVEL_CHECKLIST_ITEMS.filter((task) => planChecklist[task.id] ?? task.done).length}/{TRAVEL_CHECKLIST_ITEMS.length}
                </div>
              </div>
              {/* Compact checklist: show up to 4 items and allow vertical scrolling for extras */}
              <div className="flex-1 space-y-2 max-h-56 overflow-y-auto pr-2">
                {TRAVEL_CHECKLIST_ITEMS.filter((task) => !(planChecklist[task.id] ?? task.done)).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 mb-3">
                      <span className="text-xl text-emerald-400">✓</span>
                    </div>
                    <div className="text-sm font-bold text-white">ยอดเยี่ยม! จัดการครบแล้ว</div>
                    <div className="text-[10px] text-slate-500 mt-1">ดูประวัติทั้งหมดได้ที่หน้า History</div>
                  </div>
                ) : (
                  TRAVEL_CHECKLIST_ITEMS.filter((task) => !(planChecklist[task.id] ?? task.done)).map((task) => {
                    const done = planChecklist[task.id] ?? task.done;
                    return (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => {
                          const nextDone = !done;
                          setPlanChecklist((prev) => ({ ...prev, [task.id]: nextDone }));
                          appendTravelPlanHistory({
                            type: 'checklist-toggle',
                            title: task.title,
                            detail: task.detail,
                            when: task.when,
                            date: task.date,
                            category: task.category,
                            completed: nextDone,
                          });
                        }}
                        className="flex w-full items-start gap-3 rounded-xl border border-white/[0.02] bg-white/[0.02] px-3 py-2.5 text-left transition-all hover:border-cyan-500/20 hover:bg-white/[0.05]"
                      >
                        <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-lg border transition-colors ${done ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-400' : 'border-white/10 bg-white/5 text-slate-600'}`}>
                          {done ? <span className="text-[10px] font-black">✓</span> : <div className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`text-[12px] font-bold transition-colors ${done ? 'text-slate-300 line-through decoration-slate-500/60' : 'text-slate-200'}`}>{task.title}</div>
                          <div className="text-[10px] font-medium text-slate-600">{task.detail}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1 text-right">
                          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">{task.category}</span>
                          <div className="text-[10px] font-bold text-cyan-300">{task.when}</div>
                          <div className="text-[9px] font-medium text-slate-600">{task.date}</div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {showPlanEditor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#0a0c10] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.65)] flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300">Create plan</div>
                    <h4 className="mt-1 text-lg font-bold text-white">กำหนดรายละเอียด checklist ใหม่</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPlanEditor(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#e8eaed] hover:bg-white/10 hover:text-white transition-all text-xs font-bold"
                    aria-label="Close plan editor"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid gap-4">
                  {/* Title */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">ชื่อกิจกรรมหลัก</label>
                    <input
                      value={planDraft.title}
                      onChange={(event) => setPlanDraft((prev) => ({ ...prev, title: event.target.value }))}
                      placeholder="เช่น จองโรงแรมสไตล์ลอฟท์, ล็อกจุดเช็คอินดอยสุเทพ"
                      className="rounded-2xl border border-white/10 bg-[#06080c] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/50 transition-colors"
                    />
                  </div>

                  {/* Detail */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">รายละเอียดกิจกรรม</label>
                    <textarea
                      value={planDraft.detail}
                      onChange={(event) => setPlanDraft((prev) => ({ ...prev, detail: event.target.value }))}
                      rows={3}
                      placeholder="ใส่รายละเอียดที่ช่วยให้จำได้ดีขึ้น เช่น จองเตียงคู่, ใกล้รถไฟฟ้า, เช็คฝุ่นละออง"
                      className="resize-none rounded-2xl border border-white/10 bg-[#06080c] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/50 transition-colors"
                    />
                  </div>

                  {/* Date & Time Picker */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {/* Date Picker (when) */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">เลือกวันที่จัดทริป</label>
                      <input
                        type="date"
                        value={planDraft.when}
                        onClick={(event) => {
                          try {
                            event.currentTarget.showPicker();
                          } catch (err) {
                            console.warn(err);
                          }
                        }}
                        onFocus={(event) => {
                          try {
                            event.currentTarget.showPicker();
                          } catch (err) {
                            console.warn(err);
                          }
                        }}
                        onChange={(event) => setPlanDraft((prev) => ({ ...prev, when: event.target.value }))}
                        className="rounded-2xl border border-white/10 bg-[#06080c] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50 transition-colors cursor-pointer"
                      />
                    </div>

                    {/* Time Picker (Start & End Times merged into date) */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">กำหนดช่วงเวลา (เริ่ม - จบ)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          list="popular-times"
                          value={planDraft.date.split(' - ')[0] || '09:00'}
                          onClick={(event) => {
                            try {
                              event.currentTarget.showPicker();
                            } catch (err) {}
                          }}
                          onFocus={(event) => {
                            try {
                              event.currentTarget.showPicker();
                            } catch (err) {}
                          }}
                          onChange={(event) => {
                            const endTime = planDraft.date.split(' - ')[1] || '10:00';
                            setPlanDraft((prev) => ({ ...prev, date: `${event.target.value} - ${endTime}` }));
                          }}
                          className="flex-1 rounded-xl border border-white/10 bg-[#06080c] px-2 py-2 text-center text-xs text-white outline-none focus:border-cyan-400/50"
                        />
                        <span className="text-slate-500 text-xs">-</span>
                        <input
                          type="time"
                          list="popular-times"
                          value={planDraft.date.split(' - ')[1] || '10:00'}
                          onClick={(event) => {
                            try {
                              event.currentTarget.showPicker();
                            } catch (err) {}
                          }}
                          onFocus={(event) => {
                            try {
                              event.currentTarget.showPicker();
                            } catch (err) {}
                          }}
                          onChange={(event) => {
                            const startTime = planDraft.date.split(' - ')[0] || '09:00';
                            setPlanDraft((prev) => ({ ...prev, date: `${startTime} - ${event.target.value}` }));
                          }}
                          className="flex-1 rounded-xl border border-white/10 bg-[#06080c] px-2 py-2 text-center text-xs text-white outline-none focus:border-cyan-400/50"
                        />
                      </div>
                      <datalist id="popular-times">
                        {Array.from({ length: 48 }).map((_, i) => {
                          const hour = Math.floor(i / 2).toString().padStart(2, '0');
                          const min = (i % 2 === 0) ? '00' : '30';
                          return <option key={`${hour}:${min}`} value={`${hour}:${min}`} />;
                        })}
                      </datalist>
                    </div>
                  </div>

                  {/* Category Dropdown (Category) */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">หมวดหมู่ / แท็กประเภทข้อมูล</label>
                    <select
                      value={planDraft.category}
                      onChange={(event) => setPlanDraft((prev) => ({ ...prev, category: event.target.value }))}
                      className="rounded-2xl border border-white/10 bg-[#06080c] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50 cursor-pointer transition-colors"
                    >
                      <option value="Plan">Plan (การกำหนดแผนการเดินทางย่อย)</option>
                      <option value="Booking">Booking (การจองที่พัก / ยานพาหนะ)</option>
                      <option value="Weather">Weather (การวิเคราะห์สภาพดินฟ้าอากาศ/AQI)</option>
                      <option value="Packing">Packing (การจัดเป้/สัมภาระและยาสามัญ)</option>
                      <option value="Route">Route (การวางเส้นทางและค่าน้ำมันเฉลี่ย)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-3 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPlanEditor(false)}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const newDraft = {
                        type: 'draft-saved' as const,
                        title: planDraft.title.trim() || 'เช็คอินทริปเดินทางใหม่',
                        detail: planDraft.detail.trim() || 'บันทึกแผนกิจกรรมย่อยเพิ่มเติม',
                        when: planDraft.when.trim() || new Date().toISOString().split('T')[0],
                        date: planDraft.date.trim() || '09:00 - 10:00',
                        category: planDraft.category.trim() || 'Plan',
                        completed: false,
                      };
                      const appendedEntry = appendTravelPlanHistory(newDraft);
                      
                      setCustomDraftItems(prev => [...prev, {
                        ...newDraft,
                        id: appendedEntry.id
                      }]);

                      setShowPlanEditor(false);
                    }}
                    className="rounded-2xl border border-cyan-500/30 bg-cyan-500/20 px-6 py-2.5 text-xs font-black text-cyan-200 hover:bg-cyan-500/35 hover:scale-[1.02] active:scale-95 shadow-md shadow-cyan-500/10 transition-all"
                  >
                    บันทึก draft
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedCalendarDate && (() => {
            const allSelectedEvents = [...HOLIDAYS, ...userEvents].filter((holiday) => holiday.date === selectedCalendarDate);
            const eventObj = allSelectedEvents[0];
            const defaultTitle = eventObj ? eventObj.name : '';
            const selectedDateLabel = new Date(`${selectedCalendarDate}T00:00:00`).toLocaleDateString('th-TH', {
              weekday: 'long',
              day: 'numeric',
              month: 'short'
            });

            const closeModal = () => {
              setNewEventTitle('');
              setShowEventTimeInput(false);
              setShowEventGuestInput(false);
              setShowEventLocationInput(false);
              setShowEventDescInput(false);
              setSelectedCalendarDate(null);
              setCalendarActiveTab('plan');
              setNewEventCategory('Plan');
            };

            const handleSaveEvent = () => {
              const titleToSave = newEventTitle.trim() || defaultTitle || 'New Event';
              const newEvent = {
                date: selectedCalendarDate,
                name: titleToSave,
                nameEn: titleToSave,
                type: 'custom' as const,
                timeStart: showEventTimeInput ? newEventTimeStart : '',
                timeEnd: showEventTimeInput ? newEventTimeEnd : '',
                guests: showEventGuestInput ? newEventGuests : '',
                location: showEventLocationInput ? newEventLocation : '',
                description: showEventDescInput ? newEventDesc : '',
                category: newEventCategory,
              };
              
              setUserEvents(prev => {
                const updated = [...prev.filter(e => !(e.date === selectedCalendarDate && e.type === 'custom')), newEvent];
                localStorage.setItem('locus_custom_events', JSON.stringify(updated));
                return updated;
              });
              
              closeModal();
            };

            const handleDeleteEvent = () => {
              setUserEvents(prev => {
                const updated = prev.filter(e => !(e.date === selectedCalendarDate && e.type === 'custom'));
                localStorage.setItem('locus_custom_events', JSON.stringify(updated));
                return updated;
              });
              closeModal();
            };

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm">
                <div className="w-full max-w-lg rounded-xl border border-[#3c4043] bg-[#202124] text-[#e8eaed] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                  {/* Header */}
                  <div className="flex items-center justify-between bg-[#303134] px-2 py-1 cursor-move">
                    <button className="p-2 text-[#9aa0a6] hover:bg-white/10 rounded-full transition-colors flex flex-col gap-1 items-center justify-center opacity-70">
                      <div className="w-3.5 h-[1.5px] bg-current"></div>
                      <div className="w-3.5 h-[1.5px] bg-current"></div>
                    </button>
                    <button
                      onClick={closeModal}
                      className="p-2 text-[#9aa0a6] hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4 pr-6 pl-14 relative flex flex-col gap-4">
                    {/* Title Input */}
                    <div className="mb-1">
                      <input 
                        type="text" 
                        placeholder="เพิ่มชื่อและเวลา (Add title)" 
                        defaultValue={defaultTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        autoFocus
                        className="w-full bg-transparent text-[22px] text-white outline-none border-b-2 border-[#8ab4f8] pb-1 placeholder:text-[#9aa0a6]"
                      />
                    </div>
                    
                    {/* Time */}
                    <div className="flex items-start gap-4 -ml-10">
                      <div className="mt-1 flex items-center justify-center w-6 text-[#9aa0a6]">
                        <Clock size={20} />
                      </div>
                      <div className="flex-1 flex flex-col items-start mt-0.5">
                        <div className="text-[14px] text-[#e8eaed]">{selectedDateLabel}</div>
                        {showEventTimeInput ? (
                          <div className="flex items-center gap-2 mt-2 w-full pr-4">
                            <input 
                              type="time" 
                              list="calendar-popular-times"
                              value={newEventTimeStart} 
                              onClick={(e) => { try { e.currentTarget.showPicker() } catch(err){} }}
                              onFocus={(e) => { try { e.currentTarget.showPicker() } catch(err){} }}
                              onChange={(e) => setNewEventTimeStart(e.target.value)} 
                              className="bg-[#303134] text-white px-2 py-1.5 rounded text-[13px] border border-[#5f6368] outline-none focus:border-[#8ab4f8] flex-1 cursor-pointer" 
                            />
                            <span className="text-[#9aa0a6]">-</span>
                            <input 
                              type="time" 
                              list="calendar-popular-times"
                              value={newEventTimeEnd} 
                              onClick={(e) => { try { e.currentTarget.showPicker() } catch(err){} }}
                              onFocus={(e) => { try { e.currentTarget.showPicker() } catch(err){} }}
                              onChange={(e) => setNewEventTimeEnd(e.target.value)} 
                              className="bg-[#303134] text-white px-2 py-1.5 rounded text-[13px] border border-[#5f6368] outline-none focus:border-[#8ab4f8] flex-1 cursor-pointer" 
                            />
                            <datalist id="calendar-popular-times">
                              {Array.from({ length: 48 }).map((_, i) => {
                                const hour = Math.floor(i / 2).toString().padStart(2, '0');
                                const min = (i % 2 === 0) ? '00' : '30';
                                return <option key={`${hour}:${min}`} value={`${hour}:${min}`} />;
                              })}
                            </datalist>
                          </div>
                        ) : (
                          <div className="text-[12px] text-[#9aa0a6] mt-0.5">ไม่เกิดซ้ำ (Doesn't repeat)</div>
                        )}
                      </div>
                      {!showEventTimeInput && (
                        <button onClick={() => setShowEventTimeInput(true)} className="border border-[#5f6368] text-[#8ab4f8] px-4 py-1.5 rounded-full text-[13px] font-medium hover:bg-white/5 transition-colors shrink-0">
                          เพิ่มเวลา
                        </button>
                      )}
                    </div>

                    {/* Guests */}
                    <div 
                      onClick={() => !showEventGuestInput && setShowEventGuestInput(true)}
                      className="flex items-center gap-4 -ml-10 hover:bg-white/5 px-2 py-2.5 -my-2 rounded-md transition-colors cursor-text"
                    >
                      <div className="flex items-center justify-center w-6 text-[#9aa0a6]">
                        <Users size={20} />
                      </div>
                      {showEventGuestInput ? (
                        <input type="text" autoFocus placeholder="ระบุจำนวน หรือชื่อผู้ร่วมเดินทาง..." value={newEventGuests} onChange={(e) => setNewEventGuests(e.target.value)} className="flex-1 bg-transparent text-[14px] text-white outline-none border-b border-[#8ab4f8] pb-1" />
                      ) : (
                        <div className="text-[14px] text-[#e8eaed] flex-1">เพิ่มผู้ร่วมเดินทาง</div>
                      )}
                    </div>

                    {/* Location */}
                    <div 
                      onClick={() => !showEventLocationInput && setShowEventLocationInput(true)}
                      className="flex items-center gap-4 -ml-10 hover:bg-white/5 px-2 py-2.5 -my-2 rounded-md transition-colors cursor-text"
                    >
                      <div className="flex items-center justify-center w-6 text-[#9aa0a6]">
                        <MapPin size={20} />
                      </div>
                      {showEventLocationInput ? (
                        <input type="text" autoFocus placeholder="ค้นหาสถานที่..." value={newEventLocation} onChange={(e) => setNewEventLocation(e.target.value)} className="flex-1 bg-transparent text-[14px] text-white outline-none border-b border-[#8ab4f8] pb-1" />
                      ) : (
                        <div className="text-[14px] text-[#e8eaed] flex-1">เพิ่มสถานที่ (Location)</div>
                      )}
                    </div>

                    {/* Description */}
                    <div 
                      onClick={() => !showEventDescInput && setShowEventDescInput(true)}
                      className={`flex ${showEventDescInput ? 'items-start' : 'items-center'} gap-4 -ml-10 hover:bg-white/5 px-2 py-2.5 -my-2 rounded-md transition-colors cursor-text`}
                    >
                      <div className="flex items-center justify-center w-6 text-[#9aa0a6] mt-1">
                        <AlignLeft size={20} />
                      </div>
                      {showEventDescInput ? (
                        <textarea autoFocus placeholder="เพิ่มรายละเอียดที่นี่..." rows={3} value={newEventDesc} onChange={(e) => setNewEventDesc(e.target.value)} className="flex-1 bg-[#303134] text-[14px] text-white outline-none border border-[#5f6368] rounded-md p-2 resize-none focus:border-[#8ab4f8]" />
                      ) : (
                        <div className="text-[14px] text-[#e8eaed] flex-1">เพิ่มรายละเอียด หรือแนบไฟล์</div>
                      )}
                    </div>

                    {/* Category Selection */}
                    <div className="flex items-center gap-4 -ml-10 hover:bg-white/5 px-2 py-2.5 -my-2 rounded-md transition-colors cursor-pointer">
                      <div className="flex items-center justify-center w-6 text-[#9aa0a6]">
                        <div className="w-3 h-3 rounded-full bg-[#009688]" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-[14px] text-[#e8eaed]">
                          หมวดหมู่ / แท็กประเภทข้อมูล
                        </div>
                        <select
                          value={newEventCategory}
                          onChange={(e) => setNewEventCategory(e.target.value)}
                          className="mt-1 bg-transparent text-[13px] text-[#9aa0a6] outline-none border-b border-[#5f6368] focus:border-[#8ab4f8] pb-1 w-full"
                        >
                          <option value="Plan">Plan (การกำหนดแผนการเดินทางย่อย)</option>
                          <option value="Booking">Booking (การจองที่พัก / ยานพาหนะ)</option>
                          <option value="Weather">Weather (การวิเคราะห์สภาพดินฟ้าอากาศ/AQI)</option>
                          <option value="Packing">Packing (การจัดเป้/สัมภาระและยาสามัญ)</option>
                          <option value="Route">Route (การวางเส้นทางและค่าน้ำมันเฉลี่ย)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-2 px-4 py-3 bg-[#202124]">
                    <div>
                      {userEvents.find(e => e.date === selectedCalendarDate && e.type === 'custom') && (
                        <button onClick={handleDeleteEvent} className="text-[#f28b82] hover:bg-red-400/10 px-3 py-2 rounded-md text-[14px] font-medium transition-colors">
                          ลบ (Delete)
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-[#8ab4f8] hover:bg-blue-400/10 px-3 py-2 rounded-md text-[14px] font-medium transition-colors">
                        ตัวเลือกเพิ่มเติม
                      </button>
                      <button 
                        onClick={handleSaveEvent}
                        className="bg-[#8ab4f8] text-[#202124] hover:bg-[#9ebff9] px-6 py-2 rounded-full text-[14px] font-medium transition-colors shadow-sm"
                      >
                        บันทึก (Save)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Trending Places removed from main column — moved to sidebar */}
        </div>

          {/* Right Sidebar - Analytics Overlay */}
          <div className="relative z-10 w-[300px] flex-shrink-0 flex flex-col gap-3 border-l border-white/5 bg-black/10 backdrop-blur-3xl px-6 py-8 overflow-y-auto custom-scrollbar">

            {/* Calendar / Schedule - Premium Component */}
            <PremiumCalendarCard
              customEvents={userEvents}
              onDateClick={(date) => {
                setSelectedCalendarDate(date);
              }}
            />

            {/* Stats View Toggle */}
            <div className="flex-shrink-0 flex flex-col gap-1.5">
              
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-1.5 flex gap-1.5">
                <button
                  onClick={() => setStatsViewMode('temp')}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-[11px] font-black transition-all ${
                    statsViewMode === 'temp' ? 'bg-white text-black shadow-xl scale-[1.02]' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Thermometer size={14} className={statsViewMode === 'temp' ? 'text-indigo-600' : ''} />
                  TEMP
                </button>
                <button
                  onClick={() => setStatsViewMode('aqi')}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-[11px] font-black transition-all ${
                    statsViewMode === 'aqi' ? 'bg-white text-black shadow-xl scale-[1.02]' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Wind size={14} className={statsViewMode === 'aqi' ? 'text-indigo-600' : ''} />
                  AQI
                </button>
              </div>
            </div>

            {/* Regional Bar Chart - Premium */}
            <div className="flex-1 min-h-0 rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-5 flex flex-col shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Temp | AQI Bar Chart</div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              
              {topStats.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full border border-dashed border-white/10 flex items-center justify-center text-slate-700">?</div>
                  <div className="text-[10px] text-slate-700 font-bold">NO DATA SYNCED</div>
                </div>
              ) : (
                <div className="flex-1 flex items-end gap-2.5 h-full pb-2">
                  {topStats.map((region) => {
                    const regionMeta = REGIONS.find((r) => r.id === region.id);
                    const value = statsViewMode === 'temp' ? region.avgTemp : region.avgAqi;
                    const label = statsViewMode === 'temp' ? `${value.toFixed(0)}°` : `${value.toFixed(0)}`;
                    const normalized = valueRange > 0 ? (value - minValue) / valueRange : 0.5;
                    const barPct = Math.round(20 + normalized * 75);
                    return (
                      <div
                        key={region.id}
                        className="flex-1 flex flex-col items-center gap-2 h-full justify-end cursor-pointer group"
                        onClick={() => handleShowRegionWeather(region.id, region.name)}
                      >
                        <span className="text-[10px] font-black text-slate-500 group-hover:text-white group-hover:scale-110 transition-all">{label}</span>
                        <div
                          className="w-full rounded-t-xl transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) group-hover:brightness-150 relative overflow-hidden"
                          style={{
                            height: `${barPct}%`,
                            background: regionMeta?.color ? `linear-gradient(to top, ${regionMeta.color}44, ${regionMeta.color}cc)` : '#38bdf8',
                            boxShadow: `0 0 20px ${regionMeta?.color || '#38bdf8'}22`,
                          }}
                        >
                          {/* Inner Shine Effect */}
                          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[8px] font-black text-slate-600 uppercase text-center truncate w-full group-hover:text-slate-400 transition-colors">
                          {region.name.replace('ภาค', '')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        {/* Modals */}
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
        <>
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
        </>
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
        <div className="mx-auto max-w-6xl px-6 py-12 flex gap-6">
          
          {/* Main Left Section: Grouped content together */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header / Title & Filter Dropdowns */}
            <div className="mb-8 flex items-start justify-between relative">
              <div>
                <BackButton onClick={handleBack} />
                <h2 className="text-2xl font-bold text-white">สำรวจตามความสนใจ</h2>
              </div>

              {/* Filters (Rating & Region) */}
              <div className="flex items-center gap-2 pt-2">
                {/* Rating Filter Dropdown */}
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

                {/* Region Filter Dropdown */}
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

            {/* Discovery Chips (Horizontal row inside left column) */}
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
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
                  <div className="relative h-72 bg-slate-950 shrink-0 overflow-hidden flex items-center justify-center group">
                    {/* Auto-Sync Indicator Spinner */}
                    {isSyncingPlace && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs gap-3">
                        <RefreshCw size={24} className="text-yellow-400 animate-spin" />
                        <span className="text-[10px] font-bold tracking-wider text-yellow-200 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20 shadow-md">
                          กำลังขุดภาพความละเอียดสูง...
                        </span>
                      </div>
                    )}

                    {(() => {
                      let images: string[] = [];
                      try {
                        if (selectedPlace.fullImageUrl) {
                          if (selectedPlace.fullImageUrl.startsWith('[')) {
                            images = JSON.parse(selectedPlace.fullImageUrl);
                          } else {
                            images = selectedPlace.fullImageUrl.split(',').map((u: string) => u.trim());
                          }
                        }
                      } catch (e) {}
                      if (images.length === 0 && selectedPlace.thumbnailUrl) {
                        images = [selectedPlace.thumbnailUrl];
                      }

                      if (images.length > 0) {
                        const currentImg = images[activeImageIdx] || images[0];
                        return (
                          <div 
                            className="relative h-full w-full cursor-pointer overflow-hidden"
                            onClick={() => setIsFullscreenViewerOpen(true)}
                          >
                            <CachedImage 
                              src={currentImg} 
                              alt={`${selectedPlace.title}`} 
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md flex items-center gap-1.5 border border-white/10 shadow-xl translate-y-2 group-hover:translate-y-0">
                                <Search size={14} /> ดูภาพขยาย
                              </span>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 w-full">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-slate-400">
                            {selectedPlace.iconName ? ICON_MAP[selectedPlace.iconName] || <MapPin size={32} /> : <MapPin size={32} />}
                          </div>
                        </div>
                      );
                    })()}
                    
                    {/* Navigation Arrows */}
                    {(() => {
                      try {
                        let count = 1;
                        if (selectedPlace.fullImageUrl && selectedPlace.fullImageUrl.startsWith('[')) {
                          count = JSON.parse(selectedPlace.fullImageUrl).length;
                        }
                        if (count > 1) {
                          return (
                            <>
                              {activeImageIdx > 0 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveImageIdx(prev => prev - 1);
                                  }}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 hover:scale-105 border border-white/10 transition-all backdrop-blur-md shadow-lg"
                                  aria-label="Previous image"
                                >
                                  <ChevronLeft size={14} />
                                </button>
                              )}
                              {activeImageIdx < count - 1 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveImageIdx(prev => prev + 1);
                                  }}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 hover:scale-105 border border-white/10 transition-all backdrop-blur-md shadow-lg"
                                  aria-label="Next image"
                                >
                                  <ChevronRight size={14} />
                                </button>
                              )}
                            </>
                          );
                        }
                      } catch (e) {}
                      return null;
                    })()}

                    <button 
                      onClick={() => setSelectedPlace(null)}
                      className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-md"
                    >
                      ✕
                    </button>
                    <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                      <span className="rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white border border-white/10 shadow-lg">
                        {selectedPlace.category}
                      </span>
                    </div>
                    {/* Image Indicators */}
                    {(() => {
                      try {
                        let count = 1;
                        if (selectedPlace.fullImageUrl && selectedPlace.fullImageUrl.startsWith('[')) {
                          count = JSON.parse(selectedPlace.fullImageUrl).length;
                        }
                        if (count > 1) {
                          return (
                            <div className="absolute bottom-4 right-4 z-10 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white border border-white/10 shadow-lg">
                              {activeImageIdx + 1} / {count} Photos
                            </div>
                          );
                        }
                      } catch (e) {}
                      return null;
                    })()}
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
                    
                    {(() => {
                      if (!selectedPlace.description) {
                        return (
                          <p className="text-sm text-slate-500 italic leading-relaxed mb-8">
                            ไม่มีรายละเอียดเพิ่มเติม
                          </p>
                        );
                      }
                      
                      const desc = selectedPlace.description;
                      const websiteMatch = desc.match(/(.*?)\s*Website:\s*(https?:\/\/[^\s]+)(.*)/is);
                      
                      if (websiteMatch) {
                        const [, mainDesc, url, restDesc] = websiteMatch;
                        const finalDesc = (mainDesc + (restDesc || '')).trim();
                        return (
                          <div className="flex flex-col gap-3 mb-8">
                            {finalDesc && (
                              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                                {finalDesc}
                              </p>
                            )}
                            <a 
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-500/10 self-start px-3 py-1.5 rounded-lg border border-cyan-500/20"
                            >
                              <Globe size={14} />
                              เข้าสู่เว็บไซต์
                            </a>
                          </div>
                        );
                      }
                      
                      return (
                        <p className="text-sm text-slate-300 leading-relaxed mb-8 whitespace-pre-line">
                          {desc}
                        </p>
                      );
                    })()}
                    
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

                      {/* Sync Intel Action */}
                      {selectedPlace.id && (
                        <button
                          disabled={isSyncingPlace}
                          onClick={async () => {
                            setIsSyncingPlace(true);
                            try {
                              const api = (window as any).api;
                              const result = await api.explorePlaces.scrapeSinglePlace(selectedPlace.id);
                              if (result) {
                                const updatedPlace = {
                                  id: result.id,
                                  title: result.title,
                                  location: result.locationName || '',
                                  category: result.category || '',
                                  iconName: result.iconName || null,
                                  tags: result.tags || undefined,
                                  regionId: result.regionId || undefined,
                                  provinceId: result.provinceId || undefined,
                                  rating: result.rating,
                                  description: result.description,
                                  thumbnailUrl: result.thumbnailUrl,
                                  sourceUrl: result.sourceUrl,
                                  openingHours: result.openingHours,
                                  fullImageUrl: result.fullImageUrl,
                                };
                                setSelectedPlace(updatedPlace);
                                setExploreResults(prev => prev.map(p => p.id === selectedPlace.id ? updatedPlace : p));
                              }
                            } catch (err) {
                              console.error('Failed to sync place details:', err);
                            } finally {
                              setIsSyncingPlace(false);
                            }
                          }}
                          className={`flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black transition-all ${
                            isSyncingPlace
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-gradient-to-r from-amber-500/20 to-yellow-500/10 hover:from-amber-500/30 hover:to-yellow-500/20 text-yellow-300 border border-yellow-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-[1.02]'
                          }`}
                        >
                          <RefreshCw size={14} className={isSyncingPlace ? 'animate-spin' : ''} />
                          {isSyncingPlace ? 'กำลังขุดข้อมูลล่าสุด...' : 'SYNC INTEL (ดึงภาพ Gallery)'}
                        </button>
                      )}

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

            {/* Fullscreen Lightbox */}
            {selectedPlace && isFullscreenViewerOpen && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
                <button 
                  onClick={() => setIsFullscreenViewerOpen(false)}
                  className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md"
                >
                  ✕
                </button>
                
                {(() => {
                  let images: string[] = [];
                  try {
                    if (selectedPlace.fullImageUrl) {
                      if (selectedPlace.fullImageUrl.startsWith('[')) {
                        images = JSON.parse(selectedPlace.fullImageUrl);
                      } else {
                        images = selectedPlace.fullImageUrl.split(',').map((u: string) => u.trim());
                      }
                    }
                  } catch (e) {}
                  if (images.length === 0 && selectedPlace.thumbnailUrl) {
                    images = [selectedPlace.thumbnailUrl];
                  }

                  if (images.length > 0) {
                    const currentImg = images[activeImageIdx] || images[0];
                    return (
                      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
                        <CachedImage 
                          src={currentImg} 
                          alt={`${selectedPlace.title}`} 
                          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300" 
                        />
                        
                        {/* Lightbox Navigation */}
                        {images.length > 1 && (
                          <>
                            {activeImageIdx > 0 && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImageIdx(prev => prev - 1);
                                }}
                                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-110 border border-white/10 transition-all backdrop-blur-md shadow-2xl"
                              >
                                <ChevronLeft size={24} />
                              </button>
                            )}
                            {activeImageIdx < images.length - 1 && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImageIdx(prev => prev + 1);
                                }}
                                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-110 border border-white/10 transition-all backdrop-blur-md shadow-2xl"
                              >
                                <ChevronRight size={24} />
                              </button>
                            )}
                            
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-full bg-black/60 backdrop-blur-md px-5 py-2 text-sm font-bold text-white border border-white/10 shadow-2xl tracking-widest">
                              {activeImageIdx + 1} / {images.length}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            )}
          </div>

          {/* Explore Sidebar: Trending places card only (Calendar removed) */}
          <aside className="w-80 flex-shrink-0 flex flex-col gap-6">
            <div className="flex-shrink-0 rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Trending</div>
                <div className="text-[10px] text-slate-400 font-bold">แยก: วันนี้/สัปดาห์/เดือน</div>
              </div>
              <TrendingPlacesCard
                limit={6}
                onClick={(place) => navigate(`/province/${place.regionId}/${place.provinceId}`, {
                  state: { focusPlace: { title: place.title, lat: (place as any).lat, lng: (place as any).lng, autoFocus: true } }
                })}
              />
            </div>
          </aside>
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
