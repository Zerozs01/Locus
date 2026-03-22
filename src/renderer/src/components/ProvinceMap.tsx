import { useEffect, useRef, useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2, WifiOff, RefreshCw, CheckSquare, Square } from 'lucide-react';
import thailandGeo from '../data/thailand-geo.json';

// Fix Leaflet default marker icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Export handle type for ref usage
export interface ProvinceMapHandle {
  flyTo: (lat: number, lng: number, zoom?: number) => void;
  panTo: (lat: number, lng: number) => void;
  highlightMarker: (lat: number, lng: number) => void;
}

interface ProvinceMapProps {
  provinceName: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    title: string;
    type: 'attraction' | 'restaurant' | 'hotel' | 'hospital' | 'transport';
  }>;
  className?: string;
  theme?: 'voyager' | 'positron' | 'dark' | 'osm';
  onMarkerClick?: (marker: { lat: number; lng: number; title: string; type: string }) => void;
}

// Map tile providers - สีสันที่ดีกว่า
const tileProviders = {
  // CartoDB Voyager - สีสันสวย มองง่าย (แนะนำ)
  voyager: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  // CartoDB Positron - สีอ่อน minimal
  positron: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  // CartoDB Dark - สีเข้ม
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  // OpenStreetMap Default - สีมาตรฐาน
  osm: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
};

const markerIcons: Record<string, L.DivIcon> = {
  attraction: L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: linear-gradient(135deg, #14b8a6, #0d9488); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 10px rgba(20,184,166,0.4);">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
    </div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  }),
  restaurant: L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: linear-gradient(135deg, #f59e0b, #d97706); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 10px rgba(245,158,11,0.4);">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>
    </div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  }),
  hotel: L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 10px rgba(139,92,246,0.4);">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>
    </div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  }),
  hospital: L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: linear-gradient(135deg, #ef4444, #dc2626); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 10px rgba(239,68,68,0.4);">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
    </div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  }),
  transport: L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: linear-gradient(135deg, #3b82f6, #2563eb); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 10px rgba(59,130,246,0.4);">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg>
    </div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  }),
};

const markerTypeColors: Record<string, string> = {
  attraction: '#14b8a6',
  restaurant: '#f59e0b',
  hotel: '#8b5cf6',
  hospital: '#ef4444',
  transport: '#3b82f6',
};

const markerTypeLabels: Record<string, string> = {
  attraction: '🎯 Attraction',
  restaurant: '🍜 Restaurant',
  hotel: '🏨 Hotel',
  hospital: '🏥 Hospital',
  transport: '🚌 Transport',
};

const centerMarkerIcon = L.divIcon({
  className: 'custom-marker province-center',
  html: `<div style="background: linear-gradient(135deg, #06b6d4, #0891b2); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 4px solid white; box-shadow: 0 4px 15px rgba(6,182,212,0.5); animation: pulse 2s infinite;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
  </div>`,
  iconSize: [44, 44],
  iconAnchor: [22, 44],
});

// Province coordinates (lat, lng) - ข้อมูลพิกัดจังหวัดไทย
const provinceCoordinates: Record<string, { lat: number; lng: number }> = {
  // ภาคเหนือ
  'Chiang Mai': { lat: 18.7883, lng: 98.9853 },
  'Chiang Rai': { lat: 19.9105, lng: 99.8406 },
  'Nan': { lat: 18.7756, lng: 100.7730 },
  'Phrae': { lat: 18.1445, lng: 100.1403 },
  'Mae Hong Son': { lat: 19.3020, lng: 97.9654 },
  'Lamphun': { lat: 18.5744, lng: 99.0087 },
  'Lampang': { lat: 18.2888, lng: 99.4907 },
  'Phayao': { lat: 19.1664, lng: 99.9019 },
  'Uttaradit': { lat: 17.6200, lng: 100.0993 },
  // ภาคอีสาน
  'Khon Kaen': { lat: 16.4322, lng: 102.8236 },
  'Korat': { lat: 14.9799, lng: 102.0978 },
  'Nakhon Ratchasima': { lat: 14.9799, lng: 102.0978 },
  'Ubon': { lat: 15.2287, lng: 104.8564 },
  'Ubon Ratchathani': { lat: 15.2287, lng: 104.8564 },
  'Udon Thani': { lat: 17.4156, lng: 102.7872 },
  'Amnat Charoen': { lat: 15.8656, lng: 104.6258 },
  'Buriram': { lat: 14.9930, lng: 103.1029 },
  'Chaiyaphum': { lat: 15.8068, lng: 102.0316 },
  'Kalasin': { lat: 16.4314, lng: 103.5058 },
  'Loei': { lat: 17.4860, lng: 101.7223 },
  'Maha Sarakham': { lat: 16.1847, lng: 103.3009 },
  'Mukdahan': { lat: 16.5425, lng: 104.7235 },
  'Nakhon Phanom': { lat: 17.3920, lng: 104.7695 },
  'Nong Bua Lam Phu': { lat: 17.2218, lng: 102.4260 },
  'Nong Khai': { lat: 17.8783, lng: 102.7420 },
  'Roi Et': { lat: 16.0538, lng: 103.6520 },
  'Sakon Nakhon': { lat: 17.1545, lng: 104.1348 },
  'Si Sa Ket': { lat: 15.1186, lng: 104.3220 },
  'Surin': { lat: 14.8818, lng: 103.4936 },
  'Yasothon': { lat: 15.7944, lng: 104.1459 },
  'Bueng Kan': { lat: 18.3609, lng: 103.6466 },
  // กรุงเทพและปริมณฑล
  'Bangkok': { lat: 13.7563, lng: 100.5018 },
  'Bangkok Metropolis': { lat: 13.7563, lng: 100.5018 },
  'Nonthaburi': { lat: 13.8621, lng: 100.5144 },
  'Pathum Thani': { lat: 14.0208, lng: 100.5250 },
  'Samut Prakan': { lat: 13.5990, lng: 100.5998 },
  'Samut Sakhon': { lat: 13.5475, lng: 100.2744 },
  'Nakhon Pathom': { lat: 13.8196, lng: 100.0445 },
  // ภาคกลาง
  'Ayutthaya': { lat: 14.3532, lng: 100.5683 },
  'Phra Nakhon Si Ayutthaya': { lat: 14.3532, lng: 100.5683 },
  'Ang Thong': { lat: 14.5896, lng: 100.4549 },
  'Chai Nat': { lat: 15.1851, lng: 100.1251 },
  'Lop Buri': { lat: 14.7995, lng: 100.6534 },
  'Nakhon Nayok': { lat: 14.2069, lng: 101.2131 },
  'Nakhon Sawan': { lat: 15.7030, lng: 100.1371 },
  'Phetchabun': { lat: 16.4190, lng: 101.1591 },
  'Phichit': { lat: 16.4419, lng: 100.3488 },
  'Phitsanulok': { lat: 16.8211, lng: 100.2659 },
  'Saraburi': { lat: 14.5289, lng: 100.9102 },
  'Sing Buri': { lat: 14.8936, lng: 100.3967 },
  'Sukhothai': { lat: 17.0070, lng: 99.8237 },
  'Suphan Buri': { lat: 14.4744, lng: 100.1177 },
  'Uthai Thani': { lat: 15.3835, lng: 100.0245 },
  'Kamphaeng Phet': { lat: 16.4827, lng: 99.5226 },
  'Tak': { lat: 16.8840, lng: 99.1258 },
  // ภาคตะวันออก
  'Chon Buri': { lat: 13.3611, lng: 100.9847 },
  'Rayong': { lat: 12.6833, lng: 101.2833 },
  'Chanthaburi': { lat: 12.6103, lng: 102.1028 },
  'Trat': { lat: 12.2428, lng: 102.5177 },
  'Chachoengsao': { lat: 13.6904, lng: 101.0779 },
  'Prachin Buri': { lat: 14.0509, lng: 101.3660 },
  'Sa Kaeo': { lat: 13.8240, lng: 102.0645 },
  // ภาคตะวันตก
  'Kanchanaburi': { lat: 14.0227, lng: 99.5328 },
  'Ratchaburi': { lat: 13.5283, lng: 99.8134 },
  'Phetchaburi': { lat: 13.1119, lng: 99.9397 },
  'Prachuap Khiri Khan': { lat: 11.8126, lng: 99.7957 },
  'Samut Songkhram': { lat: 13.4098, lng: 100.0023 },
  // ภาคใต้
  'Phuket': { lat: 7.8804, lng: 98.3923 },
  'Krabi': { lat: 8.0863, lng: 98.9063 },
  'Surat Thani': { lat: 9.1382, lng: 99.3217 },
  'Nakhon Si Thammarat': { lat: 8.4324, lng: 99.9631 },
  'Songkhla': { lat: 7.1756, lng: 100.6143 },
  'Pattani': { lat: 6.8691, lng: 101.2508 },
  'Yala': { lat: 6.5400, lng: 101.2803 },
  'Narathiwat': { lat: 6.4318, lng: 101.8232 },
  'Chumphon': { lat: 10.4930, lng: 99.1800 },
  'Ranong': { lat: 9.9528, lng: 98.6085 },
  'Phang Nga': { lat: 8.4510, lng: 98.5256 },
  'Trang': { lat: 7.5563, lng: 99.6114 },
  'Satun': { lat: 6.6238, lng: 100.0673 },
  'Phatthalung': { lat: 7.6167, lng: 100.0743 },
};

// Default Thailand center
const defaultCoords = { lat: 13.7563, lng: 100.5018 };

type SearchPlace = {
  lat: number;
  lng: number;
  title: string;
  type: string;
  subtitle?: string;
  keywords?: string;
  source: 'local' | 'geocode';
  boundingbox?: string[];
  geojson?: any;
};

const bangkokFallbackPlaces: SearchPlace[] = [
  { title: 'สยาม', subtitle: 'Siam', lat: 13.7466, lng: 100.5347, type: 'district', keywords: 'siam สยาม square สยามสแควร์', source: 'local' },
  { title: 'จตุจักร', subtitle: 'Chatuchak', lat: 13.7998, lng: 100.5510, type: 'district', keywords: 'chatuchak จตุจักร weekend market ตลาดนัด', source: 'local' },
  { title: 'อโศก', subtitle: 'Asok', lat: 13.7374, lng: 100.5603, type: 'district', keywords: 'asok อโศก สุขุมวิท', source: 'local' },
  { title: 'เยาวราช', subtitle: 'Yaowarat', lat: 13.7397, lng: 100.5101, type: 'district', keywords: 'yaowarat เยาวราช ไชน่าทาวน์ chinatown', source: 'local' },
  { title: 'สีลม', subtitle: 'Silom', lat: 13.7279, lng: 100.5311, type: 'district', keywords: 'silom สีลม sathorn สาทร', source: 'local' },
  { title: 'สนามบินสุวรรณภูมิ', subtitle: 'Suvarnabhumi Airport', lat: 13.6900, lng: 100.7501, type: 'transport', keywords: 'bkk airport สุวรรณภูมิ สนามบิน', source: 'local' },
];

const compileSearchRegex = (query: string): RegExp => {
  try {
    return new RegExp(query, 'i');
  } catch {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped, 'i');
  }
};

export const ProvinceMap = forwardRef<ProvinceMapHandle, ProvinceMapProps>(({ 
  provinceName, 
  lat, 
  lng, 
  zoom = 12, 
  markers = [],
  className = '',
  theme = 'voyager', // ใช้ Voyager เป็น default - สีสันดีกว่า
  onMarkerClick
}, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const highlightLayerRef = useRef<L.LayerGroup | null>(null);
  const loadingTimeoutRef = useRef<number | null>(null);
  const hasLoadedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [visibleFilters, setVisibleFilters] = useState<Set<string>>(
    new Set<string>()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [remoteSuggestions, setRemoteSuggestions] = useState<SearchPlace[]>([]);
  const [isRemoteSearching, setIsRemoteSearching] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (type: string) => {
    setVisibleFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  // Get coordinates for province
  const coords = lat && lng 
    ? { lat, lng } 
    : provinceCoordinates[provinceName] || defaultCoords;

  const searchablePlaces = useMemo<SearchPlace[]>(() => {
    const normalizedProvinceName = provinceName === 'Bangkok Metropolis' ? 'Bangkok' : provinceName;
    const places: SearchPlace[] = [
      {
        title: normalizedProvinceName,
        lat: coords.lat,
        lng: coords.lng,
        type: 'province',
        subtitle: 'Province center',
        source: 'local',
      },
      ...(normalizedProvinceName === 'Bangkok' ? bangkokFallbackPlaces : []),
      ...markers.map(marker => ({
        title: marker.title,
        lat: marker.lat,
        lng: marker.lng,
        type: marker.type,
        source: 'local' as const,
      })),
    ];

    const seen = new Set<string>();
    return places.filter(place => {
      const dedupeKey = `${place.title.toLowerCase()}_${place.lat.toFixed(5)}_${place.lng.toFixed(5)}`;
      if (seen.has(dedupeKey)) return false;
      seen.add(dedupeKey);
      return true;
    });
  }, [provinceName, coords.lat, coords.lng, markers]);

  const searchSuggestions = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return [];

    const regex = compileSearchRegex(q);
    const merged = [...searchablePlaces, ...remoteSuggestions];
    const seen = new Set<string>();
    const qLower = q.toLowerCase();
    const qWords = q.split(/\s+/);

    const isMatch = (place: SearchPlace): boolean => {
      const title = place.title || '';
      const subtitle = place.subtitle || '';
      const keywords = place.keywords || '';
      const titleLower = title.toLowerCase();
      const subtitleLower = subtitle.toLowerCase();
      
      // Regex match (highest priority)
      if (regex.test(title) || regex.test(subtitle) || regex.test(keywords)) return true;
      
      // Keyword word-by-word match (local sources priority)
      if (place.source === 'local' && qWords.some(word => titleLower.includes(word) || subtitleLower.includes(word))) return true;
      
      // Substring match as fallback
      if (titleLower.includes(qLower) || subtitleLower.includes(qLower)) return true;
      
      return false;
    };

    return merged
      .filter(isMatch)
      .filter(place => {
        const dedupeKey = `${(place.title || '').toLowerCase()}_${place.lat.toFixed(5)}_${place.lng.toFixed(5)}`;
        if (seen.has(dedupeKey)) return false;
        seen.add(dedupeKey);
        return true;
      })
      .sort((a, b) => {
        // Prioritize local sources
        if (a.source !== b.source) {
          return a.source === 'local' ? -1 : 1;
        }
        // Then by string length (shorter = likely more relevant)
        return (a.title || '').length - (b.title || '').length;
      })
      .slice(0, 15);
  }, [searchQuery, searchablePlaces, remoteSuggestions]);

  useEffect(() => {
    const query = searchQuery.trim();
    if (query.length < 2) {
      setRemoteSuggestions([]);
      setIsRemoteSearching(false);
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      const map = mapInstanceRef.current;
      const bounds = map?.getBounds();
      const viewBox = bounds
        ? `${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()},${bounds.getSouth()}`
        : `${coords.lng - 0.5},${coords.lat + 0.4},${coords.lng + 0.5},${coords.lat - 0.4}`;

      setIsRemoteSearching(true);
      const controller = new AbortController();
      const fetchTimeoutHandle = window.setTimeout(() => controller.abort(), 4000);

      try {
        // --- LONGDO MAP API INTEGRATION ---
        // 🔑 เรียกใช้ API Key จาก .env (เดี๋ยวเวอร์ชัน Product ค่อยเปลี่ยนให้ดึงจาก DB/Settings ที่ User กรอก)
        console.log("ENV Key:", import.meta.env.VITE_LONGDO_MAP_API_KEY);
        const LONGDO_API_KEY = import.meta.env.VITE_LONGDO_MAP_API_KEY || '3f3419bb3bbb76773847e8dfeb9c7c39';
        let mapped: SearchPlace[] = [];
        let useFallback = true;
        
        if (LONGDO_API_KEY) {
          try {
            const targetUrl = `https://search.longdo.com/mapsearch/json/search?keyword=${encodeURIComponent(query)}&limit=15&key=${LONGDO_API_KEY}`;
            console.log("Fetching Longdo API (JSONP):", targetUrl);
            
            // สร้างท่อส่ง JSONP ทะลวงกำแพง CORS ของ Longdo เซิร์ฟเวอร์แบบ Native 100% ไม่พึ่ง Proxy ฟรี
            const fetchJSONP = (url: string): Promise<any> => {
              return new Promise((resolve, reject) => {
                const callbackName = 'longdo_cb_' + Math.round(1000000 * Math.random());
                const script = document.createElement('script');
                script.src = `${url}&cb=${callbackName}`;
                
                // ถ้ายกเลิกคำค้นหา ให้หยุด resolve
                controller.signal.addEventListener('abort', () => {
                   script.remove();
                   reject(new DOMException('Aborted', 'AbortError'));
                });

                script.onerror = () => {
                  script.remove();
                  reject(new Error('JSONP failed'));
                };
                
                (window as any)[callbackName] = (data: any) => {
                  resolve(data);
                  script.remove();
                  delete (window as any)[callbackName];
                };
                document.body.appendChild(script);
              });
            };

            const result = await fetchJSONP(targetUrl);
            
            // Longdo ส่งกลับมาเป็น array หรือ object ที่มี data ก็รับได้หมด
            const items = Array.isArray(result) ? result : result?.data;
            if (items && Array.isArray(items)) {
              console.log("Longdo API Success! Found:", items.length, "items");
              mapped = items.map((item: any) => ({
                  title: item.name || '',
                  subtitle: [item.address, item.district, item.province].filter(Boolean).join(', '),
                  keywords: item.name,
                  lat: Number(item.lat),
                  lng: Number(item.lon),
                  type: item.type || 'place',
                  source: 'geocode' as const,
              })).filter((item: SearchPlace) => item.title && Number.isFinite(item.lat) && Number.isFinite(item.lng));
              useFallback = false;
            } else {
               console.warn("Longdo API returned unexpected format:", result);
            }
          } catch (e: any) {
            if (e.name === 'AbortError') {
              // Ignore abort errors caused by typing too fast
              return;
            }
            console.warn('Longdo API failed, falling back to OSM. Error:', e.message);
          }
        }

        // --- FALLBACK (OSM Nominatim) ---
        // ใช้เมื่อไม่มี API Key หรือการเรียก API Longdo ขัดข้อง
        if (useFallback) {
          const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=15&accept-language=th,en&countrycodes=th&addressdetails=1&namedetails=1&polygon_geojson=1&viewbox=${encodeURIComponent(viewBox)}&q=${encodeURIComponent(query)}&email=locus.app.contact@gmail.com`;
          
          const response = await fetch(url, { 
            signal: controller.signal,
            headers: {
              'Accept-Language': 'th,en',
              'Accept': 'application/json'
            }
          });
          
          if (!response.ok) throw new Error('Network error');
          
          const data: Array<{
            lat: string;
            lon: string;
            display_name: string;
            name?: string;
            type?: string;
            namedetails?: Record<string, string>;
            boundingbox?: string[];
            geojson?: any;
          }> = await response.json();
          
          window.clearTimeout(fetchTimeoutHandle);
  
          mapped = data
            .map(item => {
              const thaiName = item.namedetails?.['name:th'] || item.namedetails?.name;
              const title = (thaiName || item.name || item.display_name.split(',')[0] || '').trim();
              return {
                title,
                subtitle: item.display_name,
                keywords: [item.display_name, item.name, thaiName].filter(Boolean).join(' '),
                lat: Number(item.lat),
                lng: Number(item.lon),
                type: item.type || 'place',
                source: 'geocode' as const,
                boundingbox: item.boundingbox,
                geojson: item.geojson,
              };
            })
            .filter(item => item.title && Number.isFinite(item.lat) && Number.isFinite(item.lng));
        }

        setRemoteSuggestions(mapped);
      } catch (error) {
        window.clearTimeout(fetchTimeoutHandle);
        setRemoteSuggestions([]);
      } finally {
        setIsRemoteSearching(false);
      }
    }, 750);

    return () => window.clearTimeout(timeoutId);
  }, [searchQuery, provinceName, coords.lat, coords.lng, markers]);

  useEffect(() => {
    setSelectedSuggestionIndex(0);
  }, [searchSuggestions.length]);

  const flyToSearchPlace = (place: SearchPlace) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    let bbox = place.boundingbox;

    if (bbox) {
      const [lat1, lat2, lon1, lon2] = bbox.map(Number);
      map.flyToBounds([[lat1, lon1], [lat2, lon2]], {
        duration: 1.7,
        easeLinearity: 0.25,
        padding: [50, 50],
        maxZoom: 16
      });
    } else {
      map.flyTo([place.lat, place.lng], 16, {
        duration: 1.7,
        easeLinearity: 0.25,
      });
    }
    
    highlightLocation(place.lat, place.lng, place.geojson, bbox);
    setSearchQuery(place.title);
    setShowSuggestions(false);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedSuggestionIndex(prev => Math.min(prev + 1, Math.max(searchSuggestions.length - 1, 0)));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedSuggestionIndex(prev => Math.max(prev - 1, 0));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (searchSuggestions.length > 0) {
        const index = Math.min(selectedSuggestionIndex, searchSuggestions.length - 1);
        flyToSearchPlace(searchSuggestions[index]);
      }
    }

    if (event.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    // Fly to location with smooth animation (like Google Maps)
    flyTo: (targetLat: number, targetLng: number, targetZoom?: number) => {
      const map = mapInstanceRef.current;
      if (map) {
        map.flyTo([targetLat, targetLng], targetZoom || 16, {
          duration: 1.5, // Animation duration in seconds
          easeLinearity: 0.25,
        });
        // Add highlight effect at destination
        highlightLocation(targetLat, targetLng);
      }
    },
    // Pan to location without zoom change
    panTo: (targetLat: number, targetLng: number) => {
      const map = mapInstanceRef.current;
      if (map) {
        map.panTo([targetLat, targetLng], {
          animate: true,
          duration: 1,
        });
      }
    },
    // Highlight a specific location with pulse effect
    highlightMarker: (targetLat: number, targetLng: number) => {
      highlightLocation(targetLat, targetLng);
    },
  }));

  // Create highlight effect at a location
  const highlightLocation = (targetLat: number, targetLng: number, geojson?: any, boundingbox?: string[]) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous highlight
    if (highlightLayerRef.current) {
      highlightLayerRef.current.clearLayers();
    } else {
      highlightLayerRef.current = L.layerGroup().addTo(map);
    }

    if (geojson && geojson.type !== 'Point') {
      const polygon = L.geoJSON(geojson, {
        style: {
          color: '#0ea5e9', // cyan-500
          weight: 3,
          opacity: 0.8,
          fillColor: '#0ea5e9',
          fillOpacity: 0.2,
          dashArray: '5, 5'
        }
      });
      highlightLayerRef.current.addLayer(polygon);
    } else if (boundingbox) {
      const [lat1, lat2, lon1, lon2] = boundingbox.map(Number);
      // Only draw rectangle if it has some area (not a tiny single point bounding box)
      if (Math.abs(lat2 - lat1) > 0.0001 || Math.abs(lon2 - lon1) > 0.0001) {
        const rect = L.rectangle([[lat1, lon1], [lat2, lon2]], {
          color: '#0ea5e9',
          weight: 3,
          opacity: 0.8,
          fillColor: '#0ea5e9',
          fillOpacity: 0.2,
          dashArray: '5, 5'
        });
        highlightLayerRef.current.addLayer(rect);
      }
    }

    // Always draw pulsing circle at the center point
    const pulseIcon = L.divIcon({
      className: 'highlight-pulse',
      html: `
        <div class="pulse-ring"></div>
        <div class="pulse-core"></div>
      `,
      iconSize: [60, 60],
      iconAnchor: [30, 30],
    });

    const highlightMarker = L.marker([targetLat, targetLng], { 
      icon: pulseIcon,
      zIndexOffset: 1000 
    });
    
    highlightLayerRef.current.addLayer(highlightMarker);
  };

  useEffect(() => {
    if (!mapRef.current) return;

    setIsLoading(true);
    setHasError(false);
    hasLoadedRef.current = false;

    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const map = L.map(mapRef.current, {
        center: [coords.lat, coords.lng],
        zoom: zoom,
        zoomControl: false,
        attributionControl: true,
      });
      mapInstanceRef.current = map;

      const provider = tileProviders[theme] || tileProviders.voyager;
      const tileLayer = L.tileLayer(provider.url, {
        maxZoom: 19,
        attribution: provider.attribution,
        errorTileUrl: '',
      });

      let loadedTiles = 0;
      let errorTiles = 0;

      const handleTileLoad = () => {
        loadedTiles++;
        if (!hasLoadedRef.current && loadedTiles >= 4) {
          hasLoadedRef.current = true;
          setIsLoading(false);
        }
      };

      const handleTileError = () => {
        errorTiles++;
        if (errorTiles > 10) {
          setHasError(true);
          setIsLoading(false);
        }
      };

      tileLayer.on('tileload', handleTileLoad);
      tileLayer.on('tileerror', handleTileError);
      tileLayer.addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);

      loadingTimeoutRef.current = window.setTimeout(() => {
        if (!hasLoadedRef.current) {
          setIsLoading(false);
        }
      }, 3000);

      return () => {
        if (loadingTimeoutRef.current) {
          window.clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
        tileLayer.off('tileload', handleTileLoad);
        tileLayer.off('tileerror', handleTileError);
        map.remove();
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
      };
    } catch (error) {
      console.error('Map initialization error:', error);
      setHasError(true);
      setIsLoading(false);
    }
  }, [theme, retryCount]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.setView([coords.lat, coords.lng], zoom, { animate: true });
  }, [coords.lat, coords.lng, zoom]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    let layer = markersLayerRef.current;
    if (!layer) {
      layer = L.layerGroup().addTo(map);
      markersLayerRef.current = layer;
    }

    layer.clearLayers();

    markers.forEach(marker => {
      if (!visibleFilters.has(marker.type)) return;

      const icon = markerIcons[marker.type] || markerIcons.attraction;
      const leafletMarker = L.marker([marker.lat, marker.lng], { icon })
        .addTo(layer!);

      if (onMarkerClick) {
        leafletMarker.on('click', () => onMarkerClick(marker));
      }

      leafletMarker.bindPopup(`
          <div style="font-family: system-ui; min-width: 150px;">
            <strong style="font-size: 14px; color: #1f2937;">${marker.title}</strong>
            <div style="color: ${markerTypeColors[marker.type]}; font-size: 12px; margin-top: 4px;">
              ${markerTypeLabels[marker.type] || marker.type}
            </div>
          </div>
        `);
    });

    L.marker([coords.lat, coords.lng], { icon: centerMarkerIcon })
      .addTo(layer)
      .bindPopup(`
        <div style="font-family: system-ui; text-align: center; min-width: 120px;">
          <strong style="font-size: 15px; color: #1f2937;">${provinceName}</strong>
          <div style="color: #06b6d4; font-size: 12px; margin-top: 4px;">📍 Province Center</div>
        </div>
      `);
  }, [markers, coords.lat, coords.lng, provinceName, retryCount, theme, visibleFilters]);

  // Province Boundary Layer Effect
  const boundaryLayerRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || isLoading) return;

    if (boundaryLayerRef.current) {
      map.removeLayer(boundaryLayerRef.current);
      boundaryLayerRef.current = null;
    }

    const feature = (thailandGeo.features as any[]).find(
      (f) => f.properties.name === provinceName || f.properties.name === provinceName.replace(' Metropolis', '')
    );

    if (feature) {
      boundaryLayerRef.current = L.geoJSON(feature, {
        style: {
          color: '#06b6d4', // Cyan border
          weight: 3,
          opacity: 0.9,
          fillColor: '#06b6d4',
          fillOpacity: 0.05,
          dashArray: '6, 6'
        }
      }).addTo(map);
    }
  }, [provinceName, isLoading]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '300px' }}>
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-xl overflow-hidden"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#0a0c10]/80 flex items-center justify-center z-[1000] rounded-xl">
          <div className="text-center">
            <Loader2 size={40} className="text-cyan-500 mx-auto mb-3 animate-spin" />
            <p className="text-slate-400 text-sm">Loading map...</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 bg-[#0a0c10]/90 flex items-center justify-center z-[1000] rounded-xl">
          <div className="text-center p-6">
            <WifiOff size={48} className="text-red-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Map Loading Failed</h3>
            <p className="text-slate-400 text-sm mb-4">
              Unable to load map tiles. Please check your internet connection.
            </p>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white text-sm font-medium transition-colors mx-auto"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Map Filter Pills */}
      <div 
        className="absolute top-4 right-4 z-[1000] flex gap-2 max-w-[calc(100%-80px)] overflow-x-auto pointer-events-auto p-1 items-start"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        <FilterPill color="#14b8a6" label="Attractions" icon="🎯" type="attraction" isActive={visibleFilters.has('attraction')} onToggle={() => toggleFilter('attraction')} />
        <FilterPill color="#f59e0b" label="Restaurants" icon="🍜" type="restaurant" isActive={visibleFilters.has('restaurant')} onToggle={() => toggleFilter('restaurant')} />
        <FilterPill color="#8b5cf6" label="Hotels" icon="🏨" type="hotel" isActive={visibleFilters.has('hotel')} onToggle={() => toggleFilter('hotel')} />
        <FilterPill color="#ef4444" label="Hospitals" icon="🏥" type="hospital" isActive={visibleFilters.has('hospital')} onToggle={() => toggleFilter('hospital')} />
        <FilterPill color="#3b82f6" label="Transport" icon="🚌" type="transport" isActive={visibleFilters.has('transport')} onToggle={() => toggleFilter('transport')} />
      </div>

      {/* Place Search */}
      <div ref={searchBoxRef} className="absolute bottom-28 left-5 z-[1000] w-[min(420px,calc(100%-2.5rem))] pointer-events-auto">
        {(showSuggestions && searchQuery.trim()) && (
          <div className="absolute bottom-full left-0 right-0 mb-1.5 bg-[#0f1115] border border-white/10 border-b-0 rounded-t-xl rounded-b-none overflow-hidden shadow-2xl z-50">
            {searchSuggestions.length > 0 ? (
              searchSuggestions.map((place, index) => (
                <button
                  key={`${place.title}-${place.lat}-${place.lng}-${index}`}
                  onClick={() => flyToSearchPlace(place)}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  className={`w-full text-left px-4 py-2.5 border-b border-white/5 last:border-0 transition-colors ${index === selectedSuggestionIndex ? 'bg-cyan-500/15' : 'hover:bg-white/5'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium text-white truncate">{place.title}</div>
                    {index === selectedSuggestionIndex && (
                      <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded">Enter</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {place.source === 'geocode' ? 'Map data' : place.type}
                    {place.subtitle ? ` • ${place.subtitle}` : ''}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-slate-400">
                {isRemoteSearching ? 'Searching places...' : 'No matching places'}
              </div>
            )}
          </div>
        )}

        <div className={`relative bg-[#0b1018]/95 border border-white/15 backdrop-blur-md flex items-center p-3.5 shadow-2xl transition-all w-full ${(showSuggestions && searchQuery.trim()) ? 'rounded-b-2xl rounded-t-none' : 'rounded-2xl'}`}>
          <span className="text-slate-400 ml-2 mr-3">🔎</span>
          <input
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleSearchKeyDown}
            placeholder="ค้นหาสถานที่ (regex)..."
            className="bg-transparent border-none outline-none text-sm text-yellow-400 w-full placeholder:text-slate-500 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSuggestions(false);
                setRemoteSuggestions([]);
              }}
              className="text-slate-500 hover:text-white transition-colors mr-2"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* CSS for pulse animation */}
      <style>{`
        /* Hide scrollbar for FilterPills */
        div::-webkit-scrollbar {
          display: none;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes highlight-pulse {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes highlight-core-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .highlight-pulse {
          pointer-events: none;
        }
        .pulse-ring {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(6, 182, 212, 0.3);
          animation: highlight-pulse 1.5s ease-out infinite;
        }
        .pulse-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 16px;
          height: 16px;
          margin-top: -8px;
          margin-left: -8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          border: 2px solid white;
          box-shadow: 0 2px 10px rgba(6, 182, 212, 0.5);
          animation: highlight-core-pulse 1s ease-in-out infinite;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        .leaflet-popup-tip {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
});

// Map Filter Pill Component
const FilterPill = ({ color, label, icon, isActive, onToggle }: { color: string; label: string; icon: string; isActive: boolean; onToggle: () => void; type?: string }) => (
  <button 
    onClick={onToggle}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all shadow-md border whitespace-nowrap ${
      isActive 
        ? 'bg-white text-slate-800' 
        : 'bg-white text-slate-500 hover:bg-slate-50 border-slate-200'
    }`}
    style={{ borderColor: isActive ? color : undefined, borderWidth: isActive ? '2px' : '1px' }}
  >
    <span style={{ fontSize: '14px' }}>{icon}</span>
    <span>{label}</span>
  </button>
);

export default ProvinceMap;
