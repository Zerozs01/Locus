import React, { useEffect, useRef, useState, useImperativeHandle, useMemo } from 'react';
import { provinceCoordinates, bangkokFallbackPlaces } from '../data/coordinates';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2, WifiOff, RefreshCw, Search, LocateFixed, Car, Bike, Footprints, ChevronLeft, MoreVertical, MapPin, Info, ChevronDown, Map as MapIcon, Layers as LayersIcon, Fuel, AlertTriangle, Mountain, Bus, Train, ExternalLink, Sparkles } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFuelPricesWithRefresh, FuelPriceData } from '../services/fuelPricesService';
import thailandGeo from '../data/thailand-geo.json';
import thailandOutline from '../data/thailand-outline.json';

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
  searchAndFocus: (query: string, fallback?: { lat: number; lng: number; radiusMeters?: number }, options?: { autoFocus?: boolean }) => void;
  focusSearchResult: (payload: {
    lat: number;
    lng: number;
    title?: string;
    zoom?: number;
    boundingbox?: string[];
    geojson?: unknown;
    radiusMeters?: number;
  }) => void;
  // Direct fly-to with automatic fallback circle (no search pipeline)
  flyToWithFallback: (lat: number, lng: number, zoom: number, title?: string, fallbackRadius?: number) => void;
  // Route setter
  setRouteAndCalculate: (startLat: number, startLng: number, startTitle: string, endLat: number, endLng: number, endTitle: string) => void;
  // Individual point setter
  setRoutePoint: (target: 'start' | 'end', lat: number, lng: number, title?: string) => void;
}

type ProvinceMapTheme = 'voyager' | 'positron' | 'dark' | 'osm' | 'satellite' | 'terrain' | 'admin';
type ProvinceMarkerFilter = 'attraction' | 'restaurant' | 'hotel' | 'hospital' | 'transport';
type ProvinceDataLayer = 'traffic' | 'gistdaAqi' | 'aqicnAqi' | 'rainRadar' | 'floodRecurrent' | 'evCharger' | 'slope';

interface ProvinceMapProps {
  provinceName: string;
  provinceId?: string; // For GISTDA flood-freq filtering
  lat?: number;
  lng?: number;
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    title: string;
    type: ProvinceMarkerFilter;
  }>;
  className?: string;
  theme?: ProvinceMapTheme;
  externalDataLayers?: ProvinceDataLayer[];
  onMarkerClick?: (marker: { lat: number; lng: number; title: string; type: string }) => void;
  regionColor?: string;
  onChangeTheme?: (theme: ProvinceMapTheme) => void;
  onToggleLayer?: (layer: ProvinceDataLayer) => void;
  mapDataLayers?: Record<ProvinceDataLayer, boolean>;
}

const tileProviders: Record<ProvinceMapTheme, { url: string; attribution: string }> = {
  voyager: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  positron: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
  osm: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  satellite: {
    url: import.meta.env.VITE_MAP_THEME_SATELLITE_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics',
  },
  terrain: {
    url: import.meta.env.VITE_MAP_THEME_TERRAIN_URL || 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
  },
  admin: {
    url: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
};

const AQICN_TILE_TOKEN = import.meta.env.VITE_AQICN_TILE_TOKEN || 'demo';
const LONGDO_MAP_API_KEY = import.meta.env.VITE_LONGDO_MAP_API_KEY || '70bda0c806084cbc6829a9c7dbe2a404';
const RAIN_RADAR_TILE_FILTER = import.meta.env.VITE_MAP_LAYER_RAIN_FILTER || 'saturate(1.2) contrast(1.12) brightness(1.02)';

const themeThaiNames: Record<ProvinceMapTheme, string> = {
  voyager: 'สีสันพรีเมียม',
  positron: 'สว่างสะอาด',
  dark: 'โทนมืด',
  osm: 'มาตรฐาน OSM',
  satellite: 'ภาพดาวเทียม',
  terrain: 'ภูมิประเทศ',
  admin: 'ลายเส้นขาวดำ',
};
const LONGDO_TRAFFIC_TILE_URL = `https://mstraffic1.longdo.com/mmmap/tile.php?proj=epsg3857&mode=trafficoverlay&zoom={z}&x={x}&y={y}&key=${encodeURIComponent(LONGDO_MAP_API_KEY)}`;
const LONGDO_FLOOD_RECURRENT_TILE_URL = `https://ms.longdo.com/map/msn-server/tile.php?proj=epsg3857&mode=floodrecurrent&zoom={z}&x={x}&y={y}&HD=1&key=${encodeURIComponent(LONGDO_MAP_API_KEY)}`;
const THAILAND_AQI_BOUNDS = L.latLngBounds([5.2, 97.0], [20.7, 106.1]);
const GISTDA_DEFAULT_WMS_URL = 'https://service-proxy-765rkyfg3q-as.a.run.app/api_geoserver/geoserver/pm25_hourly_raster_24hr/wms';
const GISTDA_DEFAULT_WMS_LAYER = 'pm25_hourly_raster_24hr';
const GISTDA_API_KEY = import.meta.env.VITE_GISTDA_API_KEY || '';
const GISTDA_OPEN_API_BASE = 'https://api-gateway.gistda.or.th/api/2.0/resources';

const mapLayerUrls = {
  traffic: import.meta.env.VITE_MAP_LAYER_TRAFFIC_URL || LONGDO_TRAFFIC_TILE_URL,
  gistdaAqi: import.meta.env.VITE_MAP_LAYER_GISTDA_URL || GISTDA_DEFAULT_WMS_URL,
  aqicnAqi: import.meta.env.VITE_MAP_LAYER_AQICN_URL || `https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=${AQICN_TILE_TOKEN}`,
  rainRadar: import.meta.env.VITE_MAP_LAYER_RAIN_URL || '',
  slope: import.meta.env.VITE_MAP_LAYER_SLOPE_URL || 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  floodRecurrent: import.meta.env.VITE_MAP_LAYER_FLOOD_RECURRENT_URL || `${GISTDA_OPEN_API_BASE}/features/flood-freq?limit=500`,
  evCharger: import.meta.env.VITE_MAP_LAYER_EV_CHARGER_URL || '',
};

const dataLayerLabels: Record<ProvinceDataLayer, string> = {
  traffic: 'จราจร',
  gistdaAqi: 'คุณภาพอากาศ (GISTDA)',
  aqicnAqi: 'ดัชนีคุณภาพอากาศ (AQICN)',
  rainRadar: 'เรดาร์ตรวจฝน',
  slope: 'พื้นที่ลาดชัน',
  floodRecurrent: 'น้ำท่วมซ้ำซาก (GISTDA)',
  evCharger: 'สถานีชาร์จรถไฟฟ้า',
};

const markerIcons: Record<string, L.DivIcon> = {
  attraction: L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: linear-gradient(135deg, #14b8a6, #0d9488); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 10px rgba(20,184,166,0.4);"><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  }),
  restaurant: L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: linear-gradient(135deg, #f59e0b, #d97706); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 10px rgba(245,158,11,0.4);"><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  }),
  hotel: L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 10px rgba(139,92,246,0.4);"><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  }),
  hospital: L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: linear-gradient(135deg, #ef4444, #dc2626); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 10px rgba(239,68,68,0.4);"><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  }),
  transport: L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: linear-gradient(135deg, #3b82f6, #2563eb); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 10px rgba(59,130,246,0.4);"><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg></div>`,
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
  attraction: 'Attraction',
  restaurant: 'Restaurant',
  hotel: 'Hotel',
  hospital: 'Hospital',
  transport: 'Transport',
};

const centerMarkerIcon = L.divIcon({
  className: 'custom-marker province-center',
  html: `<div style="background: linear-gradient(135deg, #06b6d4, #0891b2); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 4px solid white; box-shadow: 0 4px 15px rgba(6,182,212,0.5); animation: pulse 2s infinite;"><svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
  iconSize: [44, 44],
  iconAnchor: [22, 44],
});


// Data moved to coordinates.ts

// Default Thailand center
const defaultCoords = { lat: 13.7563, lng: 100.5018 };

type SearchPlace = {
  lat: number;
  lng: number;
  title: string;
  type: string;
  sourceType?: string;
  sourceClass?: string;
  importance?: number;
  subtitle?: string;
  keywords?: string;
  source: 'local' | 'geocode';
  boundingbox?: string[];
  geojson?: any;
};

type CachedSearchArea = {
  titleNorm: string;
  lat: number;
  lng: number;
  boundingbox?: string[];
  geojson?: any;
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

const distanceMeters = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const earthRadius = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
};

const getCanonicalPlaceType = (place: SearchPlace): string => {
  const t = (place.sourceType || place.type || '').toLowerCase();
  const c = (place.sourceClass || '').toLowerCase();

  if (t.includes('mall') || t.includes('shop') || c === 'shop') return 'landmark';
  if (t.includes('district') || t.includes('suburb') || t.includes('quarter') || t.includes('neighbourhood')) return 'district';
  if (t.includes('road') || t.includes('street') || t.includes('highway')) return 'road';
  if (t.includes('station') || t.includes('terminal') || t.includes('transport')) return 'transport';
  if (t.includes('hospital') || t.includes('clinic')) return 'hospital';
  if (t.includes('hotel') || t.includes('hostel')) return 'hotel';
  return 'place';
};



// bangkokFallbackPlaces is now imported from coordinates.ts

const compileSearchRegex = (query: string): RegExp => {
  try {
    return new RegExp(query, 'i');
  } catch {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped, 'i');
  }
};

const buildRemoteQueryCandidates = (query: string, provinceName: string): string[] => {
  const q = query.trim().replace(/\s+/g, ' ');
  if (!q) return [];

  const normalizedProvinceName = provinceName === 'Bangkok Metropolis' ? 'Bangkok' : provinceName;
  const candidates: string[] = [];
  const pushUnique = (value: string) => {
    const cleaned = value.trim().replace(/\s+/g, ' ');
    if (cleaned.length < 2) return;
    if (!candidates.some((existing) => existing.toLowerCase() === cleaned.toLowerCase())) {
      candidates.push(cleaned);
    }
  };

  pushUnique(q);

  const withoutThaiProvinceSuffix = q
    .replace(/\s*จังหวัด\s*กรุงเทพมหานคร$/i, '')
    .replace(/\s*กรุงเทพมหานคร$/i, '')
    .replace(/\s*กรุงเทพฯ?$/i, '')
    .replace(/\s*จังหวัด\s*[ก-๙A-Za-z\-.\s]+$/i, '')
    .trim();
  pushUnique(withoutThaiProvinceSuffix);

  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  const withoutEnglishProvince = withoutThaiProvinceSuffix
    .replace(new RegExp(`\\b${escapeRegex(normalizedProvinceName)}\\b`, 'ig'), '')
    .replace(/\bBangkok\b/ig, '')
    .replace(/\bThailand\b/ig, '')
    .replace(/\s+/g, ' ')
    .trim();
  pushUnique(withoutEnglishProvince);

  if (/โรงพยาบาล/i.test(q)) {
    const hospitalOnly = q
      .replace(/กรุงเทพมหานคร|กรุงเทพฯ?/gi, '')
      .replace(new RegExp(`\\b${escapeRegex(normalizedProvinceName)}\\b`, 'ig'), '')
      .replace(/\bBangkok\b/ig, '')
      .replace(/\s+/g, ' ')
      .trim();
    pushUnique(hospitalOnly);

    const nameOnly = hospitalOnly.replace(/^โรงพยาบาล\s*/i, '').trim();
    pushUnique(nameOnly);
  }

  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length >= 2) {
    pushUnique(tokens.slice(0, 2).join(' '));
  }

  return candidates.slice(0, 5);
};

function ProvinceMapComponent(props: ProvinceMapProps, ref: React.ForwardedRef<ProvinceMapHandle>) {
  const navigate = useNavigate();
  const {
  provinceName,
  provinceId,
  lat, 
  lng, 
  zoom = 12, 
  markers = [],
  className = '',
  theme = 'voyager', // ใช้ Voyager เป็น default - สีสันดีกว่า
  externalDataLayers = [],
    onMarkerClick,
  regionColor,
  onChangeTheme,
  onToggleLayer,
  mapDataLayers,
  } = props;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const highlightLayerRef = useRef<L.LayerGroup | null>(null);
  const centerMarkerRef = useRef<L.Marker | null>(null);
  const loadingTimeoutRef = useRef<number | null>(null);
  const hasLoadedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [visibleFilters, setVisibleFilters] = useState<Set<ProvinceMarkerFilter>>(
    new Set<ProvinceMarkerFilter>()
  );
  const [rainRadarTileUrl, setRainRadarTileUrl] = useState<string>('');
  const [isRainRadarResolving, setIsRainRadarResolving] = useState(false);
  const [evChargerPoints, setEvChargerPoints] = useState<Array<{ lat: number; lng: number; title: string; subtitle: string }>>([]);
  const [activeDataLayerWarnings, setActiveDataLayerWarnings] = useState<string[]>([]);
  const [isDataLayerLoading, setIsDataLayerLoading] = useState(false);
  const [mapVersion, setMapVersion] = useState(0);
  const lastFetchCenter = useRef<L.LatLng | null>(null);

  // Tactical Fuel Calculation State
  const [vehicleType, setVehicleType] = useState<'car' | 'motorcycle'>('car');
  const [fuelPrices, setFuelPrices] = useState<FuelPriceData[]>([]);
  const [selectedFuelType, setSelectedFuelType] = useState<string>('95');
  const [isMountainous, setIsMountainous] = useState(false);
  const [showFuelDetails, setShowFuelDetails] = useState(false);

  useEffect(() => {
    getFuelPricesWithRefresh().then(setFuelPrices).catch(err => console.warn('[ProvinceMap] Fuel prices failed:', err));
  }, []);

  // Re-fetch GISTDA GeoJSON data when map pans significantly (>5km)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const onMoveEnd = () => {
      const center = map.getCenter();
      if (!lastFetchCenter.current || center.distanceTo(lastFetchCenter.current) > 5000) {
        setMapVersion(v => v + 1);
      }
    };
    map.on('moveend', onMoveEnd);
    return () => { map.off('moveend', onMoveEnd); };
  }, []);

  // Handle Internal Deep Links (Warp & Route)
  useEffect(() => {
    const handleCommand = (e: any) => {
      const { lat, lng, title, action } = e.detail;
      if (action === 'warp_and_route') {
        executeWarpAndRoute(lat, lng, title);
      }
    };

    window.addEventListener('locus-location-command', handleCommand);
    return () => window.removeEventListener('locus-location-command', handleCommand);
  }, []);

  const executeWarpAndRoute = (lat: number, lng: number, title?: string) => {
    // 1. Warp the map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 15, {
        duration: 2,
        easeLinearity: 0.25
      });
    }
    
    // 2. Set as destination
    setRouteEnd({ lat, lng, title: title || 'Pinned Location' });
    
    // 3. Enable routing mode if not already
    setIsRoutingMode(true);
    setActiveRouteField(null);
  };

  const handleAskLocus = () => {
    // Allow sending if at least one point is selected
    if (!routeStart && !routeEnd) return;

    const routeContext = {
      originLat: routeStart?.lat ?? null,
      originLng: routeStart?.lng ?? null,
      destLat: routeEnd?.lat ?? null,
      destLng: routeEnd?.lng ?? null,
      estimatedDistanceKm: routeData ? routeData.distance / 1000 : null,
      estimatedDurationMin: routeData ? routeData.duration / 60 : null,
      source: 'map_page' as const
    };

    navigate('/intelligence', {
      state: {
        routeContext,
        autoSendMessage: routeData 
          ? 'วิเคราะห์ความปลอดภัยและความเสี่ยงของเส้นทางนี้ให้หน่อย' 
          : routeEnd 
            ? `วิเคราะห์พิกัดเป้าหมายนี้ให้หน่อย: ${routeEnd.title || 'พิกัดที่เลือก'}`
            : `วิเคราะห์พิกัดจุดเริ่มต้นนี้ให้หน่อย: ${routeStart?.title || 'พิกัดที่เลือก'}`
      }
    });
  };

  const location = useLocation();
  useEffect(() => {
    if (location.state?.autoWarp) {
      const { lat, lng, title } = location.state.autoWarp;
      const timer = setTimeout(() => {
        // 1. Warp map + set as routing destination
        executeWarpAndRoute(lat, lng, title);

        // 2. Auto-fill search bar with location name
        if (title) {
          setSearchQuery(title);
          setShowSuggestions(true);
          // Trigger remote search via pendingAutoFocusQuery
          setPendingAutoFocusQuery(title);
          setPendingAutoFocusSearch(true);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [location.state]);

  const [activeOverlay, setActiveOverlay] = useState<'map' | 'layers' | null>(null);
  const externalDataLayerRefs = useRef<L.Layer[]>([]);
  const [mapContextMenu, setMapContextMenu] = useState<{ x: number; y: number; lat: number; lng: number } | null>(null);
  const lastContextMenuAtRef = useRef(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [pendingAutoFocusSearch, setPendingAutoFocusSearch] = useState(false);
  const [pendingAutoFocusQuery, setPendingAutoFocusQuery] = useState('');
  const [remoteSuggestions, setRemoteSuggestions] = useState<SearchPlace[]>([]);
  const [isRemoteSearching, setIsRemoteSearching] = useState(false);
  const pendingFallbackRef = useRef<{ lat: number; lng: number; radiusMeters?: number } | null>(null);
  const pendingSearchFallbackTimerRef = useRef<number | null>(null);
  const pendingAutoFocusStartedAtRef = useRef<number>(0);
  const wasRainRadarEnabledRef = useRef<boolean>(false);
  const cachedSearchAreasRef = useRef<Map<string, CachedSearchArea>>(new Map());
  const searchBoxRef = useRef<HTMLDivElement>(null);
  
  const [isLocating, setIsLocating] = useState(false);
  const userLocationLayerRef = useRef<L.LayerGroup | null>(null);

  const drawUserLocation = (latitude: number, longitude: number, accuracy: number) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    
    if (!userLocationLayerRef.current) {
      userLocationLayerRef.current = L.layerGroup().addTo(map);
    } else {
      userLocationLayerRef.current.clearLayers();
    }

    const dotIcon = L.divIcon({
      className: 'user-location-pulse',
      html: `<div style="width: 16px; height: 16px; background-color: #3b82f6; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(59, 130, 246, 0.7);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    const accuracyCircle = L.circle([latitude, longitude], {
      radius: accuracy, // IP location has larger accuracy radius
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.15,
      weight: 1
    });
    
    const marker = L.marker([latitude, longitude], { icon: dotIcon });
    
    userLocationLayerRef.current.addLayer(accuracyCircle);
    userLocationLayerRef.current.addLayer(marker);

    // Zoom moderately (14) since IP locations are approximate
    map.flyTo([latitude, longitude], accuracy > 100 ? 14 : 16, { duration: 1.2 });
  };

  const locateUserPromise = (): Promise<{lat: number, lng: number} | null> => {
    return new Promise((resolve) => {
      setIsLocating(true);
      
      const resolveAndDraw = (lat: number, lng: number, acc: number) => {
        drawUserLocation(lat, lng, acc);
        setIsLocating(false);
        resolve({ lat, lng });
      };

      const tryIPGeolocation = async () => {
        const fallbackProviders = [
          { url: 'https://get.geojs.io/v1/ip/geo.json', parser: (d: any) => ({ lat: parseFloat(d.latitude), lng: parseFloat(d.longitude) }) },
          { url: 'https://ipapi.co/json/', parser: (d: any) => ({ lat: parseFloat(d.latitude), lng: parseFloat(d.longitude) }) },
          { url: 'http://ip-api.com/json/', parser: (d: any) => ({ lat: parseFloat(d.lat), lng: parseFloat(d.lon) }) }
        ];

        for (const provider of fallbackProviders) {
          try {
            const res = await fetch(provider.url);
            if (!res.ok) continue;
            const data = await res.json();
            const { lat, lng } = provider.parser(data);
            if (!isNaN(lat) && !isNaN(lng)) {
              const accept = window.confirm('ระบบตรวจพบตำแหน่งโดยประมาณจากเครือข่ายอินเทอร์เน็ต (IP) ซึ่งอาจคลาดเคลื่อน (เช่น แสดงเป็นเขตกรุงเทพฯ/ภาษีเจริญ) \n\nต้องการใช้ตำแหน่งนี้ชั่วคราวหรือไม่? \n(หากไม่ต้องการ สามารถกดยกเลิกและพิมพ์ค้นหาจังหวัด/สถานที่เองได้)');
              if (accept) {
                resolveAndDraw(lat, lng, 5000); // ~5km accuracy for IP based
              } else {
                setIsLocating(false);
                resolve(null);
              }
              return;
            }
          } catch (err) {
            console.warn(`[Geolocation] IP Fallback failed for ${provider.url}:`, err);
          }
        }
        setIsLocating(false);
        alert('ระบบไม่สามารถหาตำแหน่งที่ตั้งของคุณได้เลย (เครือข่ายหรือบริการขัดข้อง)');
        resolve(null);
      };

      const useNativeGeolocation = () => {
        if (!('geolocation' in navigator)) {
          tryIPGeolocation();
          return;
        }

        // Reduced timeout to 2500ms to avoid long hangs on Google 403
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolveAndDraw(position.coords.latitude, position.coords.longitude, position.coords.accuracy || 20);
          },
          async (error) => {
            console.warn('[Geolocation] Native API failed (403 or Permission). Falling back to IP...', error.message);
            await tryIPGeolocation();
          },
          { enableHighAccuracy: false, timeout: 2500, maximumAge: 60000 }
        );
      };

      // In Electron environment, often better to try IP first or provide a clear path
      useNativeGeolocation();
    });
  };

  const handleLocateMe = async () => {
    await locateUserPromise();
  };

  // Routing State
  const [isRoutingMode, setIsRoutingMode] = useState(false);
  const [activeRouteField, setActiveRouteField] = useState<'start' | 'end' | null>(null);
  const [travelMode, setTravelMode] = useState<'driving' | 'walking' | 'cycling' | 'transit'>('driving');
  const [routeStart, setRouteStart] = useState<{lat: number, lng: number, title?: string} | null>(null);
  const [routeEnd, setRouteEnd] = useState<{lat: number, lng: number, title?: string} | null>(null);
  const [routeData, setRouteData] = useState<{distance: number, duration: number, geojson: any} | null>(null);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);

  const openGoogleMapsTransit = (oLat: number, oLng: number, dLat: number, dLng: number) => {
    const baseUrl = 'https://www.google.com/maps/dir/?api=1';
    const origin = `${oLat},${oLng}`;
    const destination = `${dLat},${dLng}`;
    const url = `${baseUrl}&origin=${origin}&destination=${destination}&travelmode=transit`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fuelCalc = useMemo(() => {
    if (!routeData) return null;
    
    const distanceKm = routeData.distance / 1000;
    const efficiency = vehicleType === 'car' ? 14 : 35;
    const priceData = fuelPrices.find(p => p.fuelType === selectedFuelType);
    const price = priceData ? priceData.price : (fuelPrices.length > 0 ? fuelPrices[0].price : 42.5);
    
    const terrainMultiplier = isMountainous ? 1.5 : 1.0;
    const safetyMargin = 1.2;
    
    const consumptionLiters = (distanceKm / efficiency) * terrainMultiplier;
    const consumptionWithMargin = consumptionLiters * safetyMargin;
    const totalCost = consumptionWithMargin * price;
    
    return {
      liters: consumptionLiters,
      litersWithMargin: consumptionWithMargin,
      totalCost: totalCost,
      pricePerLiter: price
    };
  }, [routeData, vehicleType, selectedFuelType, fuelPrices, isMountainous]);

  const availableFuelTypes = useMemo(() => {
    if (vehicleType === 'motorcycle') {
      // Gasoline only: 95, 91, E20, 98+
      return fuelPrices.filter(p => ['95', '91', 'E20', '98+'].includes(p.fuelType));
    }
    return fuelPrices;
  }, [fuelPrices, vehicleType]);

  // Ensure selected fuel type is valid for motorcycle
  useEffect(() => {
    if (vehicleType === 'motorcycle') {
      const isValid = ['95', '91', 'E20', '98+'].includes(selectedFuelType);
      if (!isValid) {
        setSelectedFuelType('95');
      }
    }
  }, [vehicleType, selectedFuelType]);

  const calculateRoute = async (startLat: number, startLng: number, endLat: number, endLng: number, mode: string) => {
    setIsCalculatingRoute(true);
    setRouteData(null);
    if (mode === 'transit') {
      setIsCalculatingRoute(false);
      return;
    }

    try {
      const endpoints = [
        `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`,
        `https://routing.openstreetmap.de/routed-car/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
      ];

      let data: any = null;
      let lastError: any = null;

      for (const url of endpoints) {
        try {
          let resText;
          if (window.api && window.api.fetch) {
            const res = await window.api.fetch(url, {
              headers: { 'User-Agent': 'Locus-Electron-App/1.0' }
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            resText = res.data;
          } else {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            resText = await res.text();
          }
          data = typeof resText === 'string' ? JSON.parse(resText) : resText;
          if (data && data.code === 'Ok') break; // Success
        } catch (err) {
          lastError = err;
          console.warn(`[ProvinceMap] OSRM fetch failed for ${url}:`, err);
        }
      }

      if (!data || data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
        if (data && data.code !== 'Ok') throw new Error(`API Error: ${data.code}`);
        throw lastError || new Error("Route not found");
      }

      const distance = data.routes[0].distance; // meters
      let duration = data.routes[0].duration; // seconds

      // Adjust duration mathematically for walking/cycling along road paths
      if (mode === 'walking') {
         duration = distance / 1.4; // avg 5 km/h
      } else if (mode === 'cycling') {
         duration = distance / 4.1; // avg 15 km/h
      }

      setRouteData({
        distance,
        duration,
        geojson: data.routes[0].geometry
      });
    } catch(e) {
      console.error(e);
      alert("ไม่สามารถคำนวณเส้นทางได้ (เซิร์ฟเวอร์แผนที่ขัดข้องชั่วคราว กรุณาลองใหม่ในภายหลัง)");
    } finally {
      setIsCalculatingRoute(false);
    }
  };

  const applyCustomRoutePoint = (target: 'start' | 'end', latitude: number, longitude: number, title?: string) => {
    setIsRoutingMode(true);
    const pointTitle = title || `Pin (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;
    const point = { lat: latitude, lng: longitude, title: pointTitle };

    if (target === 'start') {
      setRouteStart(point);
      if (routeEnd) {
        calculateRoute(latitude, longitude, routeEnd.lat, routeEnd.lng, travelMode);
      }
    } else {
      setRouteEnd(point);
      if (routeStart) {
        calculateRoute(routeStart.lat, routeStart.lng, latitude, longitude, travelMode);
      }
    }

    setActiveRouteField(null);
  };

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (!routeLayerRef.current) {
       routeLayerRef.current = L.layerGroup().addTo(map);
    } else {
       routeLayerRef.current.clearLayers();
    }
    
    let polylineBounds: L.LatLngBounds | null = null;

    if (routeData && routeData.geojson) {
      const polyline = L.geoJSON(routeData.geojson, {
        style: {
          color: '#06b6d4',
          weight: 6,
          opacity: 0.9,
          lineCap: 'round',
          lineJoin: 'round'
        }
      });

      const polylineBg = L.geoJSON(routeData.geojson, {
      style: {
        color: '#0891b2',
        weight: 12,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round'
      }
      });

      routeLayerRef.current.addLayer(polylineBg);
      routeLayerRef.current.addLayer(polyline);
      polylineBounds = polyline.getBounds();
    }

    if (routeStart) {
      const startMarker = L.marker([routeStart.lat, routeStart.lng], {
        icon: L.divIcon({
          className: 'route-pin-container',
          html: `
            <div class="relative flex items-center justify-center">
              <div class="w-6 h-6 bg-blue-500 rounded-full border-[3px] border-white shadow-[0_4px_12px_rgba(59,130,246,0.6)] flex items-center justify-center animate-pulse">
                <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <div class="absolute -bottom-1 w-1 h-1 bg-black/40 rounded-full blur-[1px]"></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 24]
        })
      }).addTo(routeLayerRef.current);
      
      startMarker.bindPopup('<div class="font-bold text-blue-600 px-1">📍 จุดเริ่มต้น</div>', { closeButton: false });
    }

    if (routeEnd) {
      const endMarker = L.marker([routeEnd.lat, routeEnd.lng], {
        icon: L.divIcon({
          className: 'route-pin-container',
          html: `
            <div class="relative flex items-center justify-center">
              <div class="w-6 h-6 bg-rose-500 rounded-full border-[3px] border-white shadow-[0_4px_12px_rgba(244,63,94,0.6)] flex items-center justify-center">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div class="absolute -bottom-1 w-1.5 h-1.5 bg-black/40 rounded-full blur-[1px] animate-ping"></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 24]
        })
      }).addTo(routeLayerRef.current);

      endMarker.bindPopup('<div class="font-bold text-rose-600 px-1">🚩 จุดหมายปลายทาง</div>', { closeButton: false });
    }

    if (routeStart && routeEnd) {
      const bounds = L.latLngBounds([routeStart.lat, routeStart.lng], [routeEnd.lat, routeEnd.lng]);
      map.fitBounds(bounds, { padding: [80, 80], animate: true, duration: 1.5 });
    } else if (routeStart && !routeEnd) {
      map.flyTo([routeStart.lat, routeStart.lng], 15, { duration: 1.2 });
    } else if (routeEnd && !routeStart) {
      map.flyTo([routeEnd.lat, routeEnd.lng], 15, { duration: 1.2 });
    } else if (polylineBounds) {
      map.fitBounds(polylineBounds, { padding: [80, 80], animate: true, duration: 1.5 });
    }
  }, [routeData, routeStart, routeEnd]);

  useEffect(() => {
    // Re-calculate route when travel mode changes
    if (isRoutingMode && routeStart && routeEnd && routeData) {
      calculateRoute(routeStart.lat, routeStart.lng, routeEnd.lat, routeEnd.lng, travelMode);
    }
  }, [travelMode]);

  const toggleFilter = (type: ProvinceMarkerFilter) => {
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

  const enabledDataLayers = useMemo(() => new Set<ProvinceDataLayer>(externalDataLayers), [externalDataLayers]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const isRainRadarEnabled = enabledDataLayers.has('rainRadar');
    const wasRainRadarEnabled = wasRainRadarEnabledRef.current;

    if (map && isRainRadarEnabled && !wasRainRadarEnabled && map.getZoom() > 7) {
      map.flyTo(map.getCenter(), 7, {
        duration: 0.7,
        easeLinearity: 0.25,
      });
    }

    wasRainRadarEnabledRef.current = isRainRadarEnabled;
  }, [enabledDataLayers]);

  useEffect(() => {
    // Resolve rain radar template regardless of it being enabled
    // so that the status menu shows "Available" correctly.
    const customRainUrl = mapLayerUrls.rainRadar;
    if (customRainUrl) {
      setRainRadarTileUrl(customRainUrl);
      setIsRainRadarResolving(false);
      return;
    }

    let cancelled = false;
    const resolveRainRadar = async () => {
      setIsRainRadarResolving(true);
      try {
        const resolvedTileTemplate = await window.api.map.getRainRadarTileTemplate();
        if (!cancelled) {
          setRainRadarTileUrl(resolvedTileTemplate || '');
          setIsRainRadarResolving(false);
          if (!resolvedTileTemplate) {
            console.warn('[ProvinceMap] Rain radar template is empty from main process.');
          }
        }
      } catch (error) {
        if (!cancelled) {
          setRainRadarTileUrl('');
          setIsRainRadarResolving(false);
        }
        console.warn('[ProvinceMap] Failed to resolve rain radar tile template:', error);
      }
    };

    void resolveRainRadar();
    return () => {
      cancelled = true;
    };
  }, [enabledDataLayers]);

  useEffect(() => {
    if (!enabledDataLayers.has('evCharger')) {
      setEvChargerPoints([]);
      return;
    }

    let cancelled = false;
    const fetchEvChargingStations = async () => {
      try {
        const points = await window.api.map.searchEvChargers({
          lat: coords.lat,
          lng: coords.lng,
          distanceKm: 80,
          maxResults: 120,
          apiKey: import.meta.env.VITE_OPENCHARGEMAP_API_KEY,
        });

        if (!cancelled) {
          setEvChargerPoints(Array.isArray(points) ? points : []);
        }
      } catch {
        if (!cancelled) {
          setEvChargerPoints([]);
        }
      }
    };

    void fetchEvChargingStations();
    return () => {
      cancelled = true;
    };
  }, [enabledDataLayers, coords.lat, coords.lng]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    externalDataLayerRefs.current.forEach((layer) => {
      map.removeLayer(layer);
    });
    externalDataLayerRefs.current = [];

    setActiveDataLayerWarnings([]); // Clear warnings at the start of layer updates
    if (enabledDataLayers.size === 0) {
      return;
    }

    const unresolved: string[] = [];
    const thailandAqiTileOptions: Partial<L.TileLayerOptions> = {
      bounds: THAILAND_AQI_BOUNDS,
      noWrap: true,
      updateWhenIdle: true,
      keepBuffer: 1,
    };

    const addTileLayer = (
      layerName: string,
      url: string,
      opacity: number,
      attribution?: string,
      options?: Partial<L.TileLayerOptions>
    ) => {
      const tileLayer = L.tileLayer(url, {
        opacity,
        zIndex: 620,
        attribution: attribution || '',
        ...(options || {}),
      });
      let layerTileErrorCount = 0;
      tileLayer.on('tileerror', (event: L.TileErrorEvent) => {
        layerTileErrorCount += 1;
        if (layerTileErrorCount === 1 || layerTileErrorCount === 4) {
          console.warn(`[ProvinceMap] ${layerName} tile error`, {
            url,
            coords: event.coords,
            error: event.error,
          });
        }
      });
      tileLayer.addTo(map);
      externalDataLayerRefs.current.push(tileLayer);
    };

    const addWmsLayer = (
      url: string,
      opacity: number,
      wmsOptions: L.WMSOptions,
      options?: Partial<L.TileLayerOptions>
    ) => {
      const wmsLayer = L.tileLayer.wms(url, {
        opacity,
        zIndex: 620,
        ...wmsOptions,
        ...(options || {}),
      });
      wmsLayer.addTo(map);
      externalDataLayerRefs.current.push(wmsLayer);
    };

    const isXyzTemplateUrl = (url: string) => url.includes('{z}') && url.includes('{x}') && url.includes('{y}');

    const resolveWmsLayerName = (url: string, fallbackLayer: string) => {
      try {
        const parsed = new URL(url);
        return parsed.searchParams.get('layers') || fallbackLayer;
      } catch {
        return fallbackLayer;
      }
    };

    const isSatelliteTheme = theme === 'satellite';

    enabledDataLayers.forEach((layerId) => {
      if (layerId === 'evCharger') {
        const layerGroup = L.layerGroup();
        evChargerPoints.forEach((point) => {
          const marker = L.circleMarker([point.lat, point.lng], {
            radius: 5,
            color: '#22c55e',
            weight: 2,
            fillColor: '#22c55e',
            fillOpacity: 0.35,
          });
          marker.bindPopup(`<div style="font-family: system-ui; min-width: 140px;"><strong>${point.title}</strong><div style="font-size: 12px; color: #475569; margin-top: 2px;">${point.subtitle || 'Thailand'}</div></div>`);
          marker.addTo(layerGroup);
        });
        layerGroup.addTo(map);
        externalDataLayerRefs.current.push(layerGroup);
        return;
      }

      if (layerId === 'rainRadar') {
        if (!rainRadarTileUrl) {
          if (!isRainRadarResolving) {
            unresolved.push(dataLayerLabels[layerId]);
          }
          return;
        }
        const rainAttribution = rainRadarTileUrl.includes('openweathermap.org')
          ? '&copy; OpenWeather (precipitation overlay)'
          : '&copy; RainViewer';
        addTileLayer(dataLayerLabels[layerId], rainRadarTileUrl, 0.5, rainAttribution, {
          className: 'rain-radar-tile',
          maxNativeZoom: 7,
          minNativeZoom: 0,
        });
        return;
      }

      if (layerId === 'gistdaAqi') {
        const layerUrl = mapLayerUrls.gistdaAqi;
        if (!layerUrl) {
          unresolved.push(dataLayerLabels[layerId]);
          return;
        }

        if (isXyzTemplateUrl(layerUrl)) {
          addTileLayer(dataLayerLabels[layerId], layerUrl, 0.62, '&copy; GISTDA', thailandAqiTileOptions);
        } else {
          addWmsLayer(
            layerUrl,
            0.62,
            {
              layers: resolveWmsLayerName(layerUrl, GISTDA_DEFAULT_WMS_LAYER),
              format: 'image/png',
              transparent: true,
              version: '1.1.1',
            },
            {
              attribution: '&copy; GISTDA',
              ...thailandAqiTileOptions,
            }
          );
        }
        return;
      }

      if (layerId === 'aqicnAqi') {
        const layerUrl = mapLayerUrls.aqicnAqi;
        if (!layerUrl) {
          unresolved.push(dataLayerLabels[layerId]);
          return;
        }
        addTileLayer(dataLayerLabels[layerId], layerUrl, 0.65, '&copy; AQICN', thailandAqiTileOptions);
        return;
      }

      if (layerId === 'traffic') {
        const layerUrl = mapLayerUrls.traffic;
        if (!layerUrl) {
          unresolved.push(dataLayerLabels[layerId]);
          return;
        }
        addTileLayer(dataLayerLabels[layerId], layerUrl, isSatelliteTheme ? 0.82 : 0.6, '&copy; Longdo Traffic', {
          minNativeZoom: 7,
          maxNativeZoom: 16,
        });
        return;
      }

      if (layerId === 'slope') {
        const layerUrl = mapLayerUrls.slope;
        if (!layerUrl) {
          unresolved.push(dataLayerLabels[layerId]);
          return;
        }
        // Force the color pattern to stay consistent by locking native zoom
        // This ensures the green/yellow/red patterns don't disappear when zooming in deep.
        addTileLayer(dataLayerLabels[layerId], layerUrl, 0.45, '&copy; OpenTopoMap', {
          maxNativeZoom: 13,
          maxZoom: 22,
          updateWhenIdle: true,
          keepBuffer: 2
        });
        return;
      }

      // Flood recurrent: fetch GeoJSON from GISTDA with bbox limited to current viewport
      // Shows only the flood overlay polygons for the visible area — no extra labels.
      if (layerId === 'floodRecurrent') {
        const currentZoom = map?.getZoom() ?? 0;

        // Don't fetch at low zoom levels — bbox would be enormous → guaranteed 502
        if (currentZoom < 9) {
          setActiveDataLayerWarnings(prev => {
            const msg = `${dataLayerLabels[layerId]} (ซูมเข้าเพิ่มเพื่อโหลดข้อมูล)`;
            return prev.includes(msg) ? prev : [...prev, msg];
          });
          return;
        }

        // Helper: build a bbox-limited fetch URL centered on current viewport
        const buildFetchUrl = (maxDeg: number): string => {
          let url = `${GISTDA_OPEN_API_BASE}/features/flood-freq?limit=100`;
          if (map) {
            const bounds = map.getBounds();
            let w = bounds.getWest(), s = bounds.getSouth();
            let e = bounds.getEast(), n = bounds.getNorth();
            if (e - w > maxDeg) { const cLng = (w + e) / 2; w = cLng - maxDeg / 2; e = cLng + maxDeg / 2; }
            if (n - s > maxDeg) { const cLat = (n + s) / 2; s = cLat - maxDeg / 2; n = cLat + maxDeg / 2; }
            url += `&bbox=${w.toFixed(5)},${s.toFixed(5)},${e.toFixed(5)},${n.toFixed(5)}`;
            lastFetchCenter.current = map.getCenter();
          }
          return url;
        };

        if (!GISTDA_API_KEY) {
          console.warn(`[ProvinceMap] GISTDA_API_KEY missing — cannot fetch ${dataLayerLabels[layerId]}.`);
          setActiveDataLayerWarnings(prev => {
            const msg = `${dataLayerLabels[layerId]} (Missing API Key)`;
            return prev.includes(msg) ? prev : [...prev, msg];
          });
          return;
        }

        const headers: Record<string, string> = { 'apikey': GISTDA_API_KEY, 'API-Key': GISTDA_API_KEY };
        const fetchMethod = window.api?.map?.fetchGistdaFeatures;

        if (fetchMethod) {
          (async () => {
            // 1. Check cache first
            try {
              const cached = await window.api?.floodCache?.get(provinceId || 'default');
              if (cached && cached.data && typeof cached.data === 'object' && 'features' in cached.data) {
                const isValid = await window.api?.floodCache?.isValid(provinceId || 'default');
                if (isValid) {
                  const cachedData = cached.data as { features: unknown[] };
                  if (cachedData.features && cachedData.features.length > 0) {
                    const geoJsonLayer = L.geoJSON(cached.data, {
                      style: { color: '#3b82f6', weight: 1.5, fillColor: '#3b82f6', fillOpacity: 0.45 }
                    }).addTo(map);
                    externalDataLayerRefs.current.push(geoJsonLayer);
                    console.log('[ProvinceMap] Flood data loaded from cache');
                    return;
                  }
                }
              }
            } catch (e) {
              console.warn('[ProvinceMap] Cache read error:', e);
            }

            // 2. Fetch from API — try normal bbox first, then retry with half-size on 502
            const tryFetch = async (maxDeg: number, attempt: number): Promise<void> => {
              const fetchUrl = buildFetchUrl(maxDeg);
              setIsDataLayerLoading(true);
              try {
                const result = await fetchMethod(fetchUrl, headers);
                setIsDataLayerLoading(false);

                if (!result.ok) {
                  const status = result.status ?? 0;
                  // Auto-retry with smaller bbox on server overload errors
                  if ((status === 502 || status === 504) && attempt === 1) {
                    console.warn(`[ProvinceMap] GISTDA 502 on attempt ${attempt}, retrying with smaller bbox (${(maxDeg / 2).toFixed(2)}°)...`);
                    return tryFetch(maxDeg / 2, 2);
                  }
                  throw new Error(result.error || `HTTP ${status}`);
                }

                const data = result.data;
                if (data && data.features) {
                  if (data.features.length > 0) {
                    const geoJsonLayer = L.geoJSON(data, {
                      style: { color: '#3b82f6', weight: 1.5, fillColor: '#3b82f6', fillOpacity: 0.45 }
                    }).addTo(map);
                    externalDataLayerRefs.current.push(geoJsonLayer);
                    window.api?.floodCache?.save(provinceId || 'default', data);
                  } else {
                    setActiveDataLayerWarnings(prev => {
                      const msg = `${dataLayerLabels[layerId]} (ไม่พบข้อมูลในพื้นที่นี้)`;
                      return prev.includes(msg) ? prev : [...prev, msg];
                    });
                  }
                }
              } catch (err) {
                setIsDataLayerLoading(false);
                const errMsg = (err as Error).message || '';
                if (errMsg.includes('HTTP 502') || errMsg.includes('HTTP 504') || errMsg.includes('HTTP 407')) {
                  if (attempt === 1) {
                    console.warn(`[ProvinceMap] GISTDA 502 on attempt ${attempt}, retrying with smaller bbox...`);
                    return tryFetch(maxDeg / 2, 2);
                  }
                  console.warn(`[ProvinceMap] GISTDA ${errMsg} after retry. Service overloaded.`);
                  setActiveDataLayerWarnings(prev => {
                    const msg = `${dataLayerLabels[layerId]} (ระบบต้นทางขัดข้อง — ลองซูมเข้าเพิ่ม)`;
                    return prev.includes(msg) ? prev : [...prev, msg];
                  });
                } else {
                  console.error(`[ProvinceMap] GISTDA Fetch Error for ${layerId}:`, err);
                  setActiveDataLayerWarnings(prev => {
                    const msg = `${dataLayerLabels[layerId]} (Data Error)`;
                    return prev.includes(msg) ? prev : [...prev, msg];
                  });
                }
              }
            };

            await tryFetch(0.2, 1); // Start with 0.2° (~22km) bbox
          })();
        } else {
          console.warn('[ProvinceMap] window.api.map.fetchGistdaFeatures not available. Restart Electron.');
        }
        return;
      }


      const layerUrl = mapLayerUrls[layerId as keyof typeof mapLayerUrls];
      if (!layerUrl) {
        if (dataLayerLabels[layerId]) {
          unresolved.push(dataLayerLabels[layerId]);
        }
        return;
      }

      addTileLayer(dataLayerLabels[layerId], layerUrl, 0.55);
    });

    if (unresolved.length > 0) {
      setActiveDataLayerWarnings(prev => {
        const next = [...prev];
        unresolved.forEach(u => {
          if (!next.includes(u)) next.push(u);
        });
        return next;
      });
    }

    return () => {
      externalDataLayerRefs.current.forEach((layer) => {
        map.removeLayer(layer);
      });
      externalDataLayerRefs.current = [];
    };
  }, [enabledDataLayers, rainRadarTileUrl, isRainRadarResolving, evChargerPoints, theme, retryCount, isLoading, mapVersion]);

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

      // Fuzzy fallback for incomplete typing (e.g. สยามพารากอ)
      if (isLooseMatch(q, title) || isLooseMatch(q, subtitle) || isLooseMatch(q, keywords)) return true;
      
      return false;
    };

    const matched = merged
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

    // If exact-like local match exists, keep it at top for better UX
    return matched.sort((a, b) => {
      const aStrong = isLooseMatch(q, a.title) ? 1 : 0;
      const bStrong = isLooseMatch(q, b.title) ? 1 : 0;
      return bStrong - aStrong;
    });
  }, [searchQuery, searchablePlaces, remoteSuggestions]);

  useEffect(() => {
    const query = searchQuery.trim();
    if (query.length < 2) {
      setRemoteSuggestions([]);
      setIsRemoteSearching(false);
      return;
    }

    const delay = pendingAutoFocusSearch ? 0 : 750;

    const timeoutId = window.setTimeout(async () => {
      const map = mapInstanceRef.current;
      const bounds = map?.getBounds();
      const viewBox = bounds
        ? `${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()},${bounds.getSouth()}`
        : `${coords.lng - 0.5},${coords.lat + 0.4},${coords.lng + 0.5},${coords.lat - 0.4}`;

      const queryCandidates = buildRemoteQueryCandidates(query, provinceName);

      setIsRemoteSearching(true);
      const controller = new AbortController();
      const fetchTimeoutHandle = window.setTimeout(() => controller.abort(), 5000);

      try {
        // --- PARALLEL DUAL-API SEARCH ---
        // Longdo: ชื่อสถานที่ภาษาไทยแม่นกว่า แต่ไม่มี polygon/boundary data
        // Nominatim: มี polygon_geojson ที่วาดขอบเขตพื้นที่จริงได้
        // → Query ทั้งคู่พร้อมกัน แล้ว merge ผลรวม ให้ scoring เลือกที่มี polygon ชนะ
        const LONGDO_API_KEY = import.meta.env.VITE_LONGDO_MAP_API_KEY || '3f3419bb3bbb76773847e8dfeb9c7c39';

        // --- [1] Longdo Map API (JSONP) ---
        const fetchLongdo = async (targetQuery: string): Promise<SearchPlace[]> => {
          if (!LONGDO_API_KEY) return [];
          try {
            const targetUrl = `https://search.longdo.com/mapsearch/json/search?keyword=${encodeURIComponent(targetQuery)}&limit=10&key=${LONGDO_API_KEY}`;

            const response = await fetch(targetUrl, {
              signal: controller.signal,
              headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            const items = Array.isArray(result) ? result : result?.data;
            if (items && Array.isArray(items)) {
              return items.map((item: any) => ({
                title: item.name || '',
                subtitle: [item.address, item.district, item.province].filter(Boolean).join(', '),
                keywords: item.name,
                lat: Number(item.lat),
                lng: Number(item.lon),
                type: item.type || 'place',
                sourceType: item.type || 'place',
                sourceClass: item.category || item.group || '',
                source: 'geocode' as const,
              })).filter((item: SearchPlace) => item.title && Number.isFinite(item.lat) && Number.isFinite(item.lng));
            }
          } catch (e: any) {
            if (e.name === 'AbortError') throw e;
            console.warn('Longdo API failed:', e.message);
          }
          return [];
        };

        // --- [2] OSM Nominatim (polygon_geojson=1) ---
        const fetchNominatim = async (targetQuery: string): Promise<SearchPlace[]> => {
          try {
            const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=8&accept-language=th,en&countrycodes=th&addressdetails=1&namedetails=1&polygon_geojson=1&viewbox=${encodeURIComponent(viewBox)}&q=${encodeURIComponent(targetQuery)}&email=locus.app.contact@gmail.com`;
            const response = await fetch(url, {
              signal: controller.signal,
              headers: { 'Accept-Language': 'th,en', 'Accept': 'application/json' }
            });
            if (!response.ok) return [];
            const data: Array<{
              lat: string; lon: string; display_name: string; name?: string; type?: string;
              namedetails?: Record<string, string>; boundingbox?: string[]; geojson?: any;
            }> = await response.json();

            return data.map(item => {
              const thaiName = item.namedetails?.['name:th'] || item.namedetails?.name;
              const title = (thaiName || item.name || item.display_name.split(',')[0] || '').trim();
              return {
                title,
                subtitle: item.display_name,
                keywords: [item.display_name, item.name, thaiName].filter(Boolean).join(' '),
                lat: Number(item.lat),
                lng: Number(item.lon),
                type: item.type || 'place',
                sourceType: item.type || 'place',
                sourceClass: (item as any).class || '',
                importance: (item as any).importance,
                source: 'geocode' as const,
                boundingbox: item.boundingbox,
                geojson: item.geojson,
              };
            }).filter(item => item.title && Number.isFinite(item.lat) && Number.isFinite(item.lng));
          } catch (e: any) {
            if (e.name === 'AbortError') throw e;
            console.warn('Nominatim API failed:', e.message);
          }
          return [];
        };

        // Try specific query first, then simpler variants when needed.
        const merged: SearchPlace[] = [];
        const usedCoords = new Set<string>();
        let longdoCount = 0;
        let nominatimCount = 0;

        const addIfNotDuplicate = (place: SearchPlace) => {
          const coordKey = `${place.lat.toFixed(4)}_${place.lng.toFixed(4)}`;
          const nameKey = normalizeSearchText(place.title);
          const dedupeKey = `${nameKey}_${coordKey}`;
          if (!usedCoords.has(dedupeKey)) {
            usedCoords.add(dedupeKey);
            merged.push(place);
          }
        };

        for (const candidate of queryCandidates) {
          const [longdoResults, nominatimResults] = await Promise.all([
            fetchLongdo(candidate),
            fetchNominatim(candidate),
          ]);

          longdoCount += longdoResults.length;
          nominatimCount += nominatimResults.length;

          // Nominatim first (has polygon data), then Longdo (Thai POI names)
          nominatimResults.forEach(addIfNotDuplicate);
          longdoResults.forEach(addIfNotDuplicate);

          // Enough results to display, stop querying more variants.
          if (merged.length >= 8) break;
        }

        window.clearTimeout(fetchTimeoutHandle);

        // Sort by distance to the active province coordinates so local results bubble to the top
        merged.sort((a, b) => {
          const distA = distanceMeters(a.lat, a.lng, coords.lat, coords.lng);
          const distB = distanceMeters(b.lat, b.lng, coords.lat, coords.lng);
          return distA - distB;
        });

        console.log(`[Search] Queries: ${queryCandidates.join(' | ')}, Longdo: ${longdoCount}, Nominatim: ${nominatimCount}, Merged: ${merged.length}`);
        setRemoteSuggestions(merged);
      } catch (error) {
        window.clearTimeout(fetchTimeoutHandle);
        setRemoteSuggestions([]);
      } finally {
        setIsRemoteSearching(false);
      }
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [searchQuery, provinceName, coords.lat, coords.lng, markers, pendingAutoFocusSearch]);

  useEffect(() => {
    setSelectedSuggestionIndex(0);
  }, [searchSuggestions.length]);

  const setCachedSearchArea = (
    title: string | undefined,
    lat: number,
    lng: number,
    boundingbox?: string[],
    geojson?: any
  ) => {
    if (!title || !title.trim()) return;
    const geoType = geojson && typeof geojson === 'object' ? (geojson as { type?: string }).type : undefined;
    const hasPolygon = geoType === 'Polygon' || geoType === 'MultiPolygon';
    const hasBbox = Array.isArray(boundingbox) && boundingbox.length === 4;
    if (!hasPolygon && !hasBbox) return;

    const titleNorm = normalizeSearchText(title);
    if (!titleNorm) return;

    cachedSearchAreasRef.current.set(titleNorm, {
      titleNorm,
      lat,
      lng,
      boundingbox,
      geojson,
    });

    if (cachedSearchAreasRef.current.size > 40) {
      const firstKey = cachedSearchAreasRef.current.keys().next().value;
      if (firstKey) {
        cachedSearchAreasRef.current.delete(firstKey);
      }
    }
  };

  const getCachedSearchArea = (query: string, fallback?: { lat: number; lng: number }) => {
    const queryNorm = normalizeSearchText(query);
    if (!queryNorm) return null;

    const cached = cachedSearchAreasRef.current.get(queryNorm);
    if (!cached) return null;

    if (!fallback) return cached;

    const d = distanceMeters(cached.lat, cached.lng, fallback.lat, fallback.lng);
    return d <= 2200 ? cached : null;
  };

  const flyToSearchPlace = (place: SearchPlace, fallbackRadiusMeters?: number) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    let bbox = place.boundingbox;
    const geometryType = place.geojson && typeof place.geojson === 'object' ? (place.geojson as { type?: string }).type : undefined;
    const hasPolygon = geometryType === 'Polygon' || geometryType === 'MultiPolygon';
    const hasBbox = Array.isArray(bbox) && bbox.length === 4;

    if (hasBbox) {
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

    // Default fallback for remote/poi results: 600m
    const effectiveFallbackRadius = !hasPolygon && !hasBbox ? (fallbackRadiusMeters || 600) : undefined;
    highlightLocation(place.lat, place.lng, hasPolygon ? place.geojson : undefined, bbox, effectiveFallbackRadius);
    setCachedSearchArea(place.title, place.lat, place.lng, hasBbox ? bbox : undefined, hasPolygon ? place.geojson : undefined);
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
        const place = searchSuggestions[index];
        // Pass fallback radius for places without polygon/bbox (e.g., remote POIs)
        flyToSearchPlace(place, 600);
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
    searchAndFocus: (query: string, fallback, options) => {
      const doAutoFocus = options?.autoFocus !== false;

      if (pendingSearchFallbackTimerRef.current) {
        window.clearTimeout(pendingSearchFallbackTimerRef.current);
        pendingSearchFallbackTimerRef.current = null;
      }

      const normalizedTargetQuery = query.trim();

      const cached = getCachedSearchArea(normalizedTargetQuery, fallback);
      if (cached && doAutoFocus) {
        flyToSearchPlace(
          {
            lat: cached.lat,
            lng: cached.lng,
            title: query,
            type: 'place',
            source: 'local',
            boundingbox: cached.boundingbox,
            geojson: cached.geojson,
          },
          fallback?.radiusMeters || 650
        );
        setPendingAutoFocusQuery('');
        pendingFallbackRef.current = null;
        setPendingAutoFocusSearch(false);
        return;
      }

      pendingFallbackRef.current = fallback || null;
      setRemoteSuggestions([]);
      setIsRemoteSearching(true);
      setSearchQuery(query);
      setShowSuggestions(true);
      
      if (doAutoFocus) {
        setPendingAutoFocusQuery(normalizedTargetQuery);
        setPendingAutoFocusSearch(true);
        pendingAutoFocusStartedAtRef.current = Date.now();
      } else {
        setPendingAutoFocusSearch(false);
      }

      if (fallback && mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([fallback.lat, fallback.lng], 12, {
          duration: 1.5,
          easeLinearity: 0.25,
        });
      }

      if (fallback && doAutoFocus) {
        pendingSearchFallbackTimerRef.current = window.setTimeout(() => {
          const map = mapInstanceRef.current;
          if (!map) return;

          // Only draw the fallback circle if the API timed out and couldn't find a polygon
          highlightLocation(fallback.lat, fallback.lng, undefined, undefined, fallback.radiusMeters || 600, 'rectangle');
          setPendingAutoFocusQuery('');
          pendingFallbackRef.current = null;
          setPendingAutoFocusSearch(false);
        }, 1800);
      }
    },
    // Focus a search result and highlight both point + area (when polygon is available)
    focusSearchResult: ({ lat: targetLat, lng: targetLng, title, zoom: targetZoom, boundingbox, geojson, radiusMeters }) => {
      const map = mapInstanceRef.current;
      if (!map) return;

      if (title && title.trim()) {
        setSearchQuery(title);
      }

      const geometryType = geojson && typeof geojson === 'object' ? (geojson as { type?: string }).type : undefined;
      const hasPolygon = geometryType === 'Polygon' || geometryType === 'MultiPolygon';
      const hasBbox = Array.isArray(boundingbox) && boundingbox.length === 4;

      setCachedSearchArea(title, targetLat, targetLng, hasBbox ? boundingbox : undefined, hasPolygon ? geojson : undefined);

      if (hasPolygon) {
        const layer = L.geoJSON(geojson as any);
        const bounds = layer.getBounds();
        if (bounds.isValid()) {
          map.flyToBounds(bounds, {
            duration: 1.5,
            easeLinearity: 0.25,
            padding: [50, 50],
            maxZoom: targetZoom || 16,
          });
        } else {
          map.flyTo([targetLat, targetLng], targetZoom || 16, {
            duration: 1.5,
            easeLinearity: 0.25,
          });
        }
      } else {
        map.flyTo([targetLat, targetLng], targetZoom || 16, {
          duration: 1.5,
          easeLinearity: 0.25,
        });
      }

      highlightLocation(targetLat, targetLng, hasPolygon ? geojson : undefined, boundingbox, radiusMeters, hasPolygon ? 'circle' : 'rectangle');
    },
    // Direct fly-to with automatic fallback circle (for Key Landmarks and direct coordinates)
    flyToWithFallback: (lat: number, lng: number, zoom: number, title?: string, fallbackRadius: number = 600) => {
      const map = mapInstanceRef.current;
      if (!map) return;
      if (title && title.trim()) {
        setSearchQuery(title);
      }
      map.flyTo([lat, lng], zoom, { duration: 1.7, easeLinearity: 0.25 });
      // For direct coordinates, use rectangle fallback for a crisper area envelope.
      highlightLocation(lat, lng, undefined, undefined, fallbackRadius, 'rectangle');
      console.log(`[ProvinceMap] flyToWithFallback: ${title} (${lat}, ${lng}) with ${fallbackRadius}m fallback`);
    },
    setRouteAndCalculate: (startLat: number, startLng: number, startTitle: string, endLat: number, endLng: number, endTitle: string) => {
      setRouteStart({ lat: startLat, lng: startLng, title: startTitle });
      setRouteEnd({ lat: endLat, lng: endLng, title: endTitle });
      calculateRoute(startLat, startLng, endLat, endLng, travelMode);
      
      const map = mapInstanceRef.current;
      if (map) {
        map.fitBounds([
          [startLat, startLng],
          [endLat, endLng]
        ], { padding: [50, 50], animate: true, duration: 1 });
      }
    },
    setRoutePoint: (target, lat, lng, title) => {
      applyCustomRoutePoint(target, lat, lng, title);
    },
  }));

  // Create highlight effect at a location
  const highlightLocation = (
    targetLat: number,
    targetLng: number,
    geojson?: any,
    boundingbox?: string[],
    radiusMeters?: number,
    fallbackShape: 'circle' | 'rectangle' = 'circle'
  ) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const highlightColor = regionColor || '#0ea5e9';

    const isProvinceEquivalentBounds = (candidateBounds: L.LatLngBounds) => {
      const provinceBounds = boundaryLayerRef.current?.getBounds();
      if (!provinceBounds || !provinceBounds.isValid() || !candidateBounds.isValid()) return false;

      const provinceCenter = provinceBounds.getCenter();
      const candidateCenter = candidateBounds.getCenter();
      const centerDistanceMeters = map.distance(provinceCenter, candidateCenter);

      const provinceLatSpan = Math.abs(provinceBounds.getNorth() - provinceBounds.getSouth());
      const provinceLngSpan = Math.abs(provinceBounds.getEast() - provinceBounds.getWest());
      const candidateLatSpan = Math.abs(candidateBounds.getNorth() - candidateBounds.getSouth());
      const candidateLngSpan = Math.abs(candidateBounds.getEast() - candidateBounds.getWest());

      if (provinceLatSpan <= 0 || provinceLngSpan <= 0) return false;

      const latSpanRatio = candidateLatSpan / provinceLatSpan;
      const lngSpanRatio = candidateLngSpan / provinceLngSpan;

      return (
        centerDistanceMeters <= 4500 &&
        latSpanRatio >= 0.8 &&
        latSpanRatio <= 1.2 &&
        lngSpanRatio >= 0.8 &&
        lngSpanRatio <= 1.2
      );
    };

    // Clear previous highlight
    if (highlightLayerRef.current) {
      highlightLayerRef.current.clearLayers();
    } else {
      highlightLayerRef.current = L.layerGroup().addTo(map);
    }

    // Hide persistent province-center marker while a search/landmark focus is active.
    if (centerMarkerRef.current && markersLayerRef.current) {
      markersLayerRef.current.removeLayer(centerMarkerRef.current);
      centerMarkerRef.current = null;
    }

    const hasBbox = Array.isArray(boundingbox) && boundingbox.length === 4;

    if (geojson && geojson.type !== 'Point') {
      const polygon = L.geoJSON(geojson, {
        style: {
          color: highlightColor,
          weight: 3,
          opacity: 0.8,
          fillColor: highlightColor,
          fillOpacity: 0.2,
          dashArray: '5, 5'
        }
      });
      // Avoid drawing a second dashed border when the focused geometry is the same province boundary.
      if (!isProvinceEquivalentBounds(polygon.getBounds())) {
        highlightLayerRef.current.addLayer(polygon);
      }
    } else if (hasBbox) {
      const [lat1, lat2, lon1, lon2] = (boundingbox as string[]).map(Number);
      const bounds = L.latLngBounds(
        [Math.min(lat1, lat2), Math.min(lon1, lon2)],
        [Math.max(lat1, lat2), Math.max(lon1, lon2)]
      );
      if (isProvinceEquivalentBounds(bounds)) {
        // Skip province-sized bbox overlay to prevent duplicate border effect.
      } else {
        const bboxRect = L.rectangle(
          [
            [Math.min(lat1, lat2), Math.min(lon1, lon2)],
            [Math.max(lat1, lat2), Math.max(lon1, lon2)],
          ],
          {
            color: highlightColor,
            weight: 2,
            opacity: 0.75,
            fillColor: highlightColor,
            fillOpacity: 0.12,
            dashArray: '6, 6',
          }
        );
        highlightLayerRef.current.addLayer(bboxRect);
      }
    } else if (radiusMeters && radiusMeters > 0) {
      if (fallbackShape === 'rectangle') {
        const latDelta = radiusMeters / 111320;
        const lngDelta = radiusMeters / (111320 * Math.max(Math.cos((targetLat * Math.PI) / 180), 0.2));
        const areaRect = L.rectangle(
          [
            [targetLat - latDelta, targetLng - lngDelta],
            [targetLat + latDelta, targetLng + lngDelta],
          ],
          {
            color: highlightColor,
            weight: 2,
            opacity: 0.7,
            fillColor: highlightColor,
            fillOpacity: 0.12,
            dashArray: '6, 6',
          }
        );
        highlightLayerRef.current.addLayer(areaRect);
      } else {
        const areaCircle = L.circle([targetLat, targetLng], {
          radius: radiusMeters,
          color: highlightColor,
          weight: 2,
          opacity: 0.7,
          fillColor: highlightColor,
          fillOpacity: 0.12,
          dashArray: '6, 6',
        });
        highlightLayerRef.current.addLayer(areaCircle);
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
    if (!pendingAutoFocusSearch || searchSuggestions.length === 0) return;
    if (!pendingAutoFocusQuery) return;

    // Prevent stale suggestions from a previous query from hijacking auto-focus.
    if (normalizeSearchText(searchQuery) !== normalizeSearchText(pendingAutoFocusQuery)) {
      return;
    }

    if (pendingSearchFallbackTimerRef.current) {
      window.clearTimeout(pendingSearchFallbackTimerRef.current);
      pendingSearchFallbackTimerRef.current = null;
    }

    const fallback = pendingFallbackRef.current;
    const targetNorm = normalizeSearchText(pendingAutoFocusQuery);

    const pickScore = (place: SearchPlace) => {
      const titleNorm = normalizeSearchText(place.title || '');
      const subtitleNorm = normalizeSearchText(place.subtitle || '');
      const keywordNorm = normalizeSearchText(place.keywords || '');
      const geoType = place.geojson && typeof place.geojson === 'object' ? (place.geojson as { type?: string }).type : undefined;
      const hasPolygon = geoType === 'Polygon' || geoType === 'MultiPolygon';
      const hasBbox = Array.isArray(place.boundingbox) && place.boundingbox.length === 4;
      const exact = titleNorm === targetNorm ? 20 : 0;
      const startsWith = targetNorm && titleNorm.startsWith(targetNorm) ? 8 : 0;
      const loose = isLooseMatch(pendingAutoFocusQuery, place.title || '') ? 4 : 0;
      
      // Heavily prioritize places that return actual boundary data (GeoJSON polygon or BBox)
      // This solves the issue where local static points beat out remote boundaries due to perfect name matches.
      const geom = (hasPolygon ? 30 : 0) + (hasBbox ? 15 : 0);
      const source = place.source === 'geocode' ? 3 : 0;

      let proximity = 0;
      if (fallback && Number.isFinite(fallback.lat) && Number.isFinite(fallback.lng)) {
        const dLat = place.lat - fallback.lat;
        const dLng = place.lng - fallback.lng;
        // Increase proximity tolerance so that polygon results within ~1-2km still score well
        const distance2 = dLat * dLat + dLng * dLng;
        proximity = -Math.min(distance2 * 10000, 6);
      }

      const queryContained = [titleNorm, subtitleNorm, keywordNorm].some((t) => t.includes(targetNorm) || targetNorm.includes(t));
      const containedBoost = queryContained ? 5 : 0;
      
      return exact + startsWith + loose + geom + source + proximity + containedBoost;
    };

    const candidates = searchSuggestions.filter((place) =>
      isLooseMatch(pendingAutoFocusQuery, place.title || '') ||
      isLooseMatch(pendingAutoFocusQuery, place.subtitle || '') ||
      isLooseMatch(pendingAutoFocusQuery, place.keywords || '')
    );

    const pool = candidates.length > 0 ? candidates : searchSuggestions;
    const best = [...pool].sort((a, b) => pickScore(b) - pickScore(a))[0] || searchSuggestions[0];

    const bestGeoType = best.geojson && typeof best.geojson === 'object' ? (best.geojson as { type?: string }).type : undefined;
    const bestHasPolygon = bestGeoType === 'Polygon' || bestGeoType === 'MultiPolygon';
    const bestHasBbox = Array.isArray(best.boundingbox) && best.boundingbox.length === 4;
    const bestHasArea = bestHasPolygon || bestHasBbox;

    const elapsedMs = Date.now() - (pendingAutoFocusStartedAtRef.current || Date.now());
    const shouldWaitForRemoteArea = !bestHasArea && pendingAutoFocusQuery.trim().length >= 2 && elapsedMs < 1600 && (isRemoteSearching || remoteSuggestions.length === 0);
    if (shouldWaitForRemoteArea) {
      return;
    }

    flyToSearchPlace(best, fallback?.radiusMeters || 650);
    setPendingAutoFocusQuery('');
    pendingFallbackRef.current = null;
    setPendingAutoFocusSearch(false);
  }, [pendingAutoFocusSearch, pendingAutoFocusQuery, searchQuery, searchSuggestions, isRemoteSearching, remoteSuggestions.length]);

  useEffect(() => {
    return () => {
      if (pendingSearchFallbackTimerRef.current) {
        window.clearTimeout(pendingSearchFallbackTimerRef.current);
        pendingSearchFallbackTimerRef.current = null;
      }
    };
  }, []);

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
        routeLayerRef.current = null;
        highlightLayerRef.current = null;
        adminBoundaryLayerRef.current = null;
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

    const handleMapContextMenu = (event: L.LeafletMouseEvent) => {
      if (event.originalEvent) {
        event.originalEvent.preventDefault();
      }
      lastContextMenuAtRef.current = Date.now();
      setMapContextMenu({
        x: event.containerPoint.x,
        y: event.containerPoint.y,
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    };

    const handleMapClick = (event: L.LeafletMouseEvent) => {
      if (Date.now() - lastContextMenuAtRef.current < 320) {
        return;
      }

      if (activeOverlay) {
        return;
      }

      setMapContextMenu(null);

      if (!isRoutingMode) {
        setIsRoutingMode(true);
        // First click is ALWAYS the start point
        applyCustomRoutePoint('start', event.latlng.lat, event.latlng.lng);
        setActiveRouteField('end'); // Next click will be the destination
        return;
      }

      // If already in routing mode, use current active field or default to end
      const targetField = activeRouteField || 'end';
      applyCustomRoutePoint(targetField, event.latlng.lat, event.latlng.lng);
      
      // If we just set the start, auto-toggle to end for the next click
      if (targetField === 'start') {
        setActiveRouteField('end');
      }
    };

    map.on('contextmenu', handleMapContextMenu);
    map.on('click', handleMapClick);

    return () => {
      map.off('contextmenu', handleMapContextMenu);
      map.off('click', handleMapClick);
    };
  }, [isRoutingMode, activeRouteField, routeStart, routeEnd, travelMode, theme, retryCount, activeOverlay]);

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

    const centerMarker = L.marker([coords.lat, coords.lng], { icon: centerMarkerIcon })
      .addTo(layer)
      .bindPopup(`
        <div style="font-family: system-ui; text-align: center; min-width: 120px;">
          <strong style="font-size: 15px; color: #1f2937;">${provinceName}</strong>
          <div style="color: #06b6d4; font-size: 12px; margin-top: 4px;">📍 Province Center</div>
        </div>
      `);
    centerMarkerRef.current = centerMarker;
  }, [markers, coords.lat, coords.lng, provinceName, retryCount, theme, visibleFilters]);

  // Province Boundary Layer Effect
  const boundaryLayerRef = useRef<L.GeoJSON | null>(null);
  const adminBoundaryLayerRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || isLoading) return;

    if (boundaryLayerRef.current) {
      map.removeLayer(boundaryLayerRef.current);
      boundaryLayerRef.current = null;
    }

    // Alias map: app province name → GeoJSON feature name
    const geoNameAliases: Record<string, string> = {
      'Bangkok': 'Bangkok Metropolis',
      'Bangkok Metropolis': 'Bangkok Metropolis',
      'Korat': 'Nakhon Ratchasima',
      'Ubon': 'Ubon Ratchathani',
      'Ayutthaya': 'Phra Nakhon Si Ayutthaya',
      'Hat Yai': 'Songkhla',
      'Chonburi': 'Chon Buri',
      'Buriram': 'Buri Ram',
      'Phang Nga': 'Phangnga',
      'Sisaket': 'Si Sa Ket',
    };
    const geoLookupName = geoNameAliases[provinceName] || provinceName;

    const feature = (thailandGeo.features as any[]).find(
      (f) => f.properties.name === geoLookupName
    );

    if (feature) {
      const bColor = regionColor || '#06b6d4';
      boundaryLayerRef.current = L.geoJSON(feature, {
        style: {
          color: bColor,
          weight: 3,
          opacity: 0.9,
          fillColor: bColor,
          fillOpacity: 0.05,
          dashArray: '6, 6'
        }
      }).addTo(map);
    }
  }, [provinceName, isLoading, regionColor]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || isLoading) return;

    if (adminBoundaryLayerRef.current) {
      map.removeLayer(adminBoundaryLayerRef.current);
      adminBoundaryLayerRef.current = null;
    }

    // Only show prominent Thailand boundary when Slope layer is active
    // This helps distinguish territory since Slope covers global areas.
    if (enabledDataLayers.has('slope')) {
      adminBoundaryLayerRef.current = L.geoJSON(thailandOutline as any, {
        style: {
          color: '#ef4444', // Red-500
          weight: 3, // Even thinner for better aesthetics
          opacity: 0.6, // More subtle
          dashArray: '8, 8', 
          fillColor: '#ef4444',
          fillOpacity: 0.015, 
        },
        interactive: false
      }).addTo(map);
    }

    return () => {
      if (adminBoundaryLayerRef.current) {
        map.removeLayer(adminBoundaryLayerRef.current);
        adminBoundaryLayerRef.current = null;
      }
    };
  }, [theme, isLoading, enabledDataLayers]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const locateButtonClass = theme === 'dark'
    ? 'w-[46px] h-[46px] bg-[#0b1018]/95 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all flex items-center justify-center group'
    : 'w-[46px] h-[46px] bg-white/95 border border-slate-300/80 text-slate-500 hover:text-slate-700 hover:border-slate-400 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all flex items-center justify-center group';

    const locateIconClass = theme === 'dark'
    ? 'group-hover:scale-110 transition-transform text-slate-300'
    : 'group-hover:scale-110 transition-transform text-slate-500';

  const mapLayerOptions: Array<{ id: ProvinceDataLayer; label: string; icon: string; description?: string }> = [
    { id: 'traffic', label: 'จราจร (Real-time)', icon: '🚗', description: 'แสดงความหนาแน่นของการจราจรแบบเรียลไทม์ โดย Longdo Map' },
    { id: 'gistdaAqi', label: 'คุณภาพอากาศ (GISTDA)', icon: '💨', description: 'ค่าฝุ่น PM 2.5 รายชั่วโมง วิเคราะห์จากดาวเทียมตระกูล VIIRS โดย GISTDA' },
    { id: 'aqicnAqi', label: 'ดัชนีคุณภาพอากาศ (AQICN)', icon: '🌍', description: 'ดัชนีคุณภาพอากาศมาตรฐาน US-EPA ครอบคลุมพื้นที่ทั่วโลก' },
    { id: 'rainRadar', label: 'เรดาร์ตรวจฝน', icon: '🌧️', description: 'ตรวจจับกลุ่มฝนและความแรงของหยาดน้ำฟ้า อัปเดตทุก 10 นาที' },
    { id: 'floodRecurrent', label: 'น้ำท่วมซ้ำซาก (GISTDA)', icon: '🌊', description: 'ข้อมูลพื้นที่น้ำท่วมซ้ำซาก วิเคราะห์จากข้อมูลดาวเทียมหลายปี โดย GISTDA' },
    { id: 'slope', label: 'พื้นที่ลาดชัน', icon: '⛰️', description: 'แสดงระดับความชันของพื้นที่เพื่อเฝ้าระวังดินโคลนถล่มในพื้นที่ภูเขา' },
  ];

  const getLayerStatus = (id: ProvinceDataLayer) => {
    if (id === 'rainRadar') {
      if (isRainRadarResolving) return { label: 'กำลังตรวจสอบ...', color: 'text-amber-400', available: true };
      // Show available if we have a URL OR if the layer is currently off (since we resolve URL independently now)
      if (rainRadarTileUrl || !enabledDataLayers.has('rainRadar')) return { label: 'พร้อมใช้งาน', color: 'text-emerald-400', available: true };
      return { label: 'ไม่พร้อมใช้งาน (Error)', color: 'text-red-400', available: false };
    }
    return { label: 'พร้อมใช้งาน', color: 'text-emerald-400', available: true };
  };

  // Layer Item helper
  const LayerItem = ({ opt, isEnabled, onToggle }: { opt: any; isEnabled: boolean; onToggle: () => void }) => {
    const [showInfo, setShowInfo] = useState(false);
    const status = getLayerStatus(opt.id);
    return (
      <div className={`flex flex-col rounded-xl border transition-all ${isEnabled ? 'bg-amber-500/10 border-amber-400/30' : 'bg-white/5 border-white/10'}`}>
        <div className="flex items-center justify-between p-2.5">
          <button
            onClick={onToggle}
            className={`flex items-center gap-2 flex-1 text-left transition-colors ${isEnabled ? 'text-amber-200' : 'text-slate-400 hover:text-white'}`}
          >
            <span className="text-lg leading-none">{opt.icon}</span>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold truncate">{opt.label}</span>
              <span className={`text-[9px] font-medium ${status.color}`}>{status.label}</span>
            </div>
          </button>
          {isEnabled && (
            <button onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }} className="p-1.5 text-slate-500 hover:text-amber-400">
              {showInfo ? <ChevronDown size={14} /> : <Info size={14} />}
            </button>
          )}
        </div>
        {isEnabled && showInfo && (
          <div className="px-3 pb-3 border-t border-amber-400/10 pt-2 space-y-3">
            <p className="text-[10px] text-slate-300 leading-relaxed font-medium">{opt.description || 'ไม่มีรายละเอียดเพิ่มเติม'}</p>
            
            {/* Professional Legend Components */}
            {opt.id === 'rainRadar' && (
              <div className="relative flex gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                {/* Vertical Gradient Bar - Matches reference */}
                <div className="w-2.5 h-[160px] rounded-full bg-gradient-to-t from-[#e0f2fe] via-[#3b82f6] via-[#1e40af] via-[#ef4444] via-[#facc15] to-[#fbbf24] border border-white/10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]" />
                
                {/* Legend Items */}
                <div className="flex flex-col justify-between text-[11px] py-1 font-medium">
                   <div className="flex items-center gap-2.5 group/item">
                     <div className="w-3 h-3 rounded-full bg-[#e0f2fe] border border-white/20 shadow-sm" />
                     <span className="text-slate-300 group-hover/item:text-white transition-colors">มืดครึ้ม</span>
                   </div>
                   <div className="flex items-center gap-2.5 group/item">
                     <div className="w-3 h-3 rounded-full bg-[#3b82f6] border border-white/20 shadow-sm" />
                     <span className="text-slate-300 group-hover/item:text-white transition-colors">ฝนตกปรอยๆ</span>
                   </div>
                   <div className="flex items-center gap-2.5 group/item">
                     <div className="w-3 h-3 rounded-full bg-[#1e40af] border border-white/20 shadow-sm" />
                     <span className="text-slate-300 group-hover/item:text-white transition-colors">ฝนตกเล็กน้อย</span>
                   </div>
                   <div className="flex items-center gap-2.5 group/item">
                     <div className="w-3 h-3 rounded-full bg-[#ef4444] border border-white/20 shadow-sm" />
                     <span className="text-slate-300 group-hover/item:text-white transition-colors">ฝนตกปานกลาง</span>
                   </div>
                   <div className="flex items-center gap-2.5 group/item">
                     <div className="w-3 h-3 rounded-full bg-[#facc15] border border-white/20 shadow-sm" />
                     <span className="text-slate-300 group-hover/item:text-white transition-colors">ฝนตกหนัก</span>
                   </div>
                   <div className="flex items-center gap-2.5 group/item">
                     <div className="w-3 h-3 rounded-full bg-[#fbbf24] border border-white/10 shadow-[0_0_10px_rgba(251,191,36,0.4)]" />
                     <span className="text-amber-300 font-black tracking-tight">ลูกเห็บ / พายุ</span>
                   </div>
                </div>
              </div>
            )}

            {opt.id === 'gistdaAqi' && (
              <div className="mt-1">
                <div className="flex h-2 w-full rounded-full overflow-hidden mb-1.5 border border-white/10 shadow-inner">
                  <div className="flex-1 bg-[#38bdf8]" />
                  <div className="flex-1 bg-[#4ade80]" />
                  <div className="flex-1 bg-[#facc15]" />
                  <div className="flex-1 bg-[#fb923c]" />
                  <div className="flex-1 bg-[#ef4444]" />
                </div>
                <div className="grid grid-cols-5 gap-0.5 text-[8px] text-slate-400 text-center uppercase font-black">
                  <span>ดีมาก</span>
                  <span>ดี</span>
                  <span>ปานกลาง</span>
                  <span>เริ่มมีผล</span>
                  <span>อันตราย</span>
                </div>
              </div>
            )}

            {opt.id === 'slope' && (
              <div className="mt-1">
                <div className="flex h-2 w-full rounded-full overflow-hidden mb-1.5 border border-white/10 bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600 shadow-inner" />
                <div className="flex justify-between text-[8px] text-slate-400 font-black uppercase">
                  <span>ที่ราบ (Safe)</span>
                  <span>ลาดชันปานกลาง</span>
                  <span>ชันสูง (Danger)</span>
                </div>
              </div>
            )}

            {opt.id === 'traffic' && (
              <div className="mt-1 p-2 rounded-lg bg-black/20 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  <span className="text-[10px] text-slate-300">การจราจรคล่องตัว</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#eab308]" />
                  <span className="text-[10px] text-slate-300">ชะลอตัว / หนาแน่น</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                  <span className="text-[10px] text-slate-300">ติดขัด / ติดหนึบ</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '300px' }}>
      {/* Leaflet map mount point */}
      <div ref={mapRef} className="w-full h-full rounded-xl overflow-hidden bg-[#070b11]" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#0a0c10]/80 flex items-center justify-center z-[1000] rounded-xl">
          <div className="flex items-center gap-2 text-cyan-300 text-sm font-medium">
            <Loader2 size={18} className="animate-spin" />
            <span>Loading map...</span>
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

      {isDataLayerLoading && (
        <div className="absolute top-16 right-4 z-[1000] flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 text-cyan-400 text-[10px] font-bold animate-pulse shadow-lg">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
          LOADING GISTDA DATA...
        </div>
      )}

      {activeDataLayerWarnings.length > 0 && !isLoading && (

        <div className="absolute top-16 right-4 z-[1000] rounded-lg border border-amber-400/40 bg-black/80 px-3 py-2 text-[11px] text-amber-200 max-w-[280px] shadow-lg" onClick={(e) => e.stopPropagation()}>
          <div className="font-bold mb-1">สถานะชั้นข้อมูล:</div>
          <ul className="list-disc list-inside space-y-0.5">
            {Array.from(new Set(activeDataLayerWarnings)).map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
          {activeDataLayerWarnings.some((name) => name.includes('เรดาร์ตรวจฝน')) && (
            <div className="mt-1.5 text-[10px] text-amber-100/70 border-t border-amber-400/20 pt-1">
              Hint: ตั้งค่า VITE_MAP_LAYER_RAIN_URL ใน .env.local 
            </div>
          )}
        </div>
      )}

      {!isLoading && mapContextMenu && (
        <div
          className="absolute top-4 left-4 z-[1100] w-[290px] rounded-xl border border-cyan-400/40 bg-[#07121a]/95 p-3 text-slate-100 shadow-2xl"
        >
          <div className="mb-2 text-[11px] text-cyan-200/90">
            {mapContextMenu.lat.toFixed(6)}, {mapContextMenu.lng.toFixed(6)}
          </div>

          <div className="space-y-1.5 text-[12px]">
            <button
              type="button"
              onClick={() => {
                setIsRoutingMode(true);
                applyCustomRoutePoint('end', mapContextMenu.lat, mapContextMenu.lng);
                setMapContextMenu(null);
              }}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-left hover:bg-cyan-500/20"
            >
              1 ตั้งเป็นปลายทาง
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRoutingMode(true);
                applyCustomRoutePoint('start', mapContextMenu.lat, mapContextMenu.lng);
                setMapContextMenu(null);
              }}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-left hover:bg-cyan-500/20"
            >
              2 ตั้งเป็นจุดเริ่มต้น
            </button>

            <button
              type="button"
              onClick={() => {
                window.open(`https://www.google.com/maps?q=${mapContextMenu.lat.toFixed(6)},${mapContextMenu.lng.toFixed(6)}`, '_blank');
                setMapContextMenu(null);
              }}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-left hover:bg-cyan-500/20"
            >
              3 Open with Google Map
            </button>

            <button
              type="button"
              onClick={() => {
                window.open(`https://earth.google.com/web/@${mapContextMenu.lat.toFixed(6)},${mapContextMenu.lng.toFixed(6)},1000a,35d,0h,0t,0r`, '_blank');
                setMapContextMenu(null);
              }}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-left hover:bg-cyan-500/20"
            >
              4 Open with Google Earth
            </button>
          </div>
        </div>
      )}



      {/* Place Search, Map Controls & Routing UI */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-full pointer-events-auto flex flex-col items-center px-4"
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
      >
        {/* Map Filter Pills */}
        {!isRoutingMode && (
          <div className="flex w-max max-w-full flex-nowrap gap-2 overflow-x-auto pb-3 scrollbar-hide px-4">
            <FilterPill color="#14b8a6" label="Attractions" icon="🎯" type="attraction" isActive={visibleFilters.has('attraction')} onToggle={() => toggleFilter('attraction')} />
            <FilterPill color="#f59e0b" label="Restaurants" icon="🍜" type="restaurant" isActive={visibleFilters.has('restaurant')} onToggle={() => toggleFilter('restaurant')} />
            <FilterPill color="#8b5cf6" label="Hotels" icon="🏨" type="hotel" isActive={visibleFilters.has('hotel')} onToggle={() => toggleFilter('hotel')} />
            <FilterPill color="#ef4444" label="Hospitals" icon="🏥" type="hospital" isActive={visibleFilters.has('hospital')} onToggle={() => toggleFilter('hospital')} />
            <FilterPill color="#3b82f6" label="Transport" icon="🚌" type="transport" isActive={visibleFilters.has('transport')} onToggle={() => toggleFilter('transport')} />
          </div>
        )}

        <div className="flex items-center justify-center w-full max-w-[480px] relative gap-2">
           <div className="flex-1 w-full" ref={searchBoxRef}>
             
            {/* Unified Suggestion Box */}
            {(showSuggestions && searchQuery.trim()) && (
              <div className="absolute bottom-full mb-1.5 w-[min(420px,100%)] bg-[#0f1115] border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-[1050]">
                {searchSuggestions.length > 0 ? (
                  searchSuggestions.map((place, index) => (
                    <button
                      key={`${normalizeSearchText(place.title)}-${index}`}
                      onClick={() => {
                        if (isRoutingMode) {
                          if (activeRouteField === 'start') {
                            const newStart = { lat: place.lat, lng: place.lng, title: place.title };
                            setRouteStart(newStart);
                            if (routeEnd) calculateRoute(newStart.lat, newStart.lng, routeEnd.lat, routeEnd.lng, travelMode);
                          } else {
                            const newEnd = { lat: place.lat, lng: place.lng, title: place.title };
                            setRouteEnd(newEnd);
                            if (routeStart) calculateRoute(routeStart.lat, routeStart.lng, newEnd.lat, newEnd.lng, travelMode);
                          }
                          setSearchQuery('');
                          setShowSuggestions(false);
                          setActiveRouteField(null);
                        } else {
                          flyToSearchPlace(place, 600);
                        }
                      }}
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
                        {getCanonicalPlaceType(place)}
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

            {isRoutingMode ? (
              <div 
                className="bg-[#0b1018]/95 border border-white/10 backdrop-blur-md p-4 rounded-2xl shadow-2xl relative w-[min(420px,100%)]"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                 <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-cyan-400/20 blur-xl z-[-1]" />
                 
                 {/* Top Header: Modes & Close */}
                 <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-1.5 bg-black/40 p-1 rounded-lg border border-white/5">
                       {(['driving', 'walking', 'cycling', 'transit'] as const).map(m => (
                          <button 
                             key={m} 
                             onClick={() => {
                                setTravelMode(m);
                                if (m === 'transit' && routeStart && routeEnd) {
                                   openGoogleMapsTransit(routeStart.lat, routeStart.lng, routeEnd.lat, routeEnd.lng);
                                } else if (m !== 'transit' && routeStart && routeEnd) {
                                   calculateRoute(routeStart.lat, routeStart.lng, routeEnd.lat, routeEnd.lng, m);
                                }
                             }} 
                             className={`p-2 rounded-md transition-all ${travelMode === m ? 'bg-cyan-500/20 text-cyan-400 shadow-sm border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
                             title={m.charAt(0).toUpperCase() + m.slice(1)}
                          >
                             {m === 'driving' ? <Car size={16}/> : m === 'walking' ? <Footprints size={16}/> : m === 'cycling' ? <Bike size={16}/> : <Bus size={16}/>}
                          </button>
                       ))}
                    </div>
                    <button 
                       onClick={() => { 
                          setIsRoutingMode(false); 
                          setRouteData(null); 
                          setRouteStart(null);
                          setRouteEnd(null);
                          setActiveRouteField(null);
                          setSearchQuery('');
                          if (routeLayerRef.current) routeLayerRef.current.clearLayers();
                          if (userLocationLayerRef.current) userLocationLayerRef.current.clearLayers();
                       }} 
                          title="Close routing"
                          aria-label="Close routing"
                       className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                       <ChevronLeft size={20} />
                    </button>
                 </div>
                 
                 {/* Inputs */}
                 <div className="flex flex-col relative pl-2 mt-2 border border-white/5 rounded-xl bg-black/40 p-2 gap-2 shadow-inner">
                    <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-slate-700/50 rounded-full flex flex-col justify-between items-center z-0">
                       <MoreVertical size={14} className="text-white/20 absolute top-1/2 -translate-y-1/2 -ml-[6px]" />
                    </div>
                    
                    {/* Start Input */}
                    <div className="flex items-center gap-3 relative z-10">
                       <div className="w-2.5 h-2.5 rounded-full border-[2.5px] border-blue-400 bg-black shrink-0 ml-[5px] shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
                       <div className={`flex-1 bg-transparent border-b border-white/10 px-1 py-1 text-sm font-medium flex justify-between items-center transition-colors ${activeRouteField === 'start' ? 'border-blue-500' : 'hover:border-white/20'}`}>
                          <input 
                            className="bg-transparent border-none outline-none w-full truncate text-cyan-300 placeholder:text-slate-500 font-medium"
                            placeholder="ตำแหน่งตั้งต้นของคุณ..."
                            value={activeRouteField === 'start' ? searchQuery : routeStart?.title || ''}
                            onChange={(e) => {
                               setSearchQuery(e.target.value);
                               setShowSuggestions(true);
                               setActiveRouteField('start');
                            }}
                            onFocus={() => {
                               setSearchQuery(routeStart?.title || '');
                               setShowSuggestions(true);
                               setActiveRouteField('start');
                            }}
                          />
                          <button 
                            onClick={async () => {
                               const pos = await locateUserPromise();
                               if (pos) {
                                  const start = { lat: pos.lat, lng: pos.lng, title: 'ตำแหน่งปัจจุบันของคุณ' };
                                  setRouteStart(start);
                                  setSearchQuery('');
                                  setShowSuggestions(false);
                                  setActiveRouteField('end');
                                  setTimeout(() => {
                                     document.getElementById('route-dest-input')?.focus();
                                  }, 100);
                                  if (routeEnd) calculateRoute(start.lat, start.lng, routeEnd.lat, routeEnd.lng, travelMode);
                               }
                            }}
                            className="text-blue-400/70 hover:text-blue-300 ml-2"
                            title="ดึงตำแหน่งปัจจุบันของคุณ"
                          >
                             <LocateFixed size={16} />
                          </button>
                       </div>
                    </div>
                    
                    {/* End Input */}
                    <div className="flex items-center gap-3 relative z-10 cursor-text group" onClick={() => document.getElementById('route-dest-input')?.focus()}>
                       <div className="w-2.5 h-2.5 rounded-sm border-[2.5px] border-rose-500 bg-black shrink-0 ml-[5px] shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                       <div className={`flex-1 bg-transparent border-b border-transparent px-1 py-1 text-sm font-medium flex justify-between items-center transition-colors ${activeRouteField === 'end' ? 'border-rose-500' : 'hover:border-white/10'}`}>
                          <input 
                            id="route-dest-input"
                            className="bg-transparent border-none outline-none w-full truncate text-white placeholder:text-slate-500"
                            placeholder="เลือกจุดหมายปลายทาง..."
                            value={activeRouteField === 'end' ? searchQuery : routeEnd?.title || ''}
                            onChange={(e) => {
                               setSearchQuery(e.target.value);
                               setShowSuggestions(true);
                               setActiveRouteField('end');
                            }}
                            onFocus={() => {
                               setSearchQuery(routeEnd?.title || '');
                               setShowSuggestions(true);
                               setActiveRouteField('end');
                            }}
                          />
                       </div>
                    </div>
                 </div>

                 {/* Results / Status */}
                 <div className="mt-3 overflow-hidden rounded-xl border border-white/5 bg-[#080c12]">
                    {isCalculatingRoute ? (
                       <div className="p-6 flex flex-col items-center justify-center gap-4 text-cyan-400 text-sm">
                          <div className="flex items-center gap-3">
                            <Loader2 size={16} className="animate-spin" /> คำนวณเส้นทาง...
                          </div>
                          
                          {(routeStart || routeEnd) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAskLocus();
                              }}
                              className="flex items-center gap-2 px-6 py-2.5 bg-[#facc15] hover:bg-[#eab308] text-black font-black text-[11px] uppercase tracking-wider rounded-xl shadow-[0_4px_15px_rgba(250,204,21,0.3)] transition-all hover:-translate-y-0.5 active:scale-95"
                            >
                              <Sparkles size={14} />
                              ข้ามไปวิเคราะห์ด้วย AI (Ask Locus)
                            </button>
                          )}
                       </div>
                    ) : (routeStart || routeEnd) ? (
                       <div className="flex flex-col">
                          {/* Main Stats */}
                          <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/20 p-4 flex justify-between items-center border-b border-white/5">
                             {travelMode === 'transit' ? (
                                <div className="flex flex-col w-full gap-3 py-1">
                                   <div className="flex items-center gap-2 text-cyan-400">
                                      <Bus size={18} />
                                      <span className="text-sm font-bold uppercase tracking-tight">Public Transit Mode</span>
                                   </div>
                                   <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                                      เส้นทางรถเมล์และรถไฟฟ้าต้องใช้ข้อมูลตารางเวลาจริงและสภาพจราจรแบบ Real-time เพื่อความแม่นยำสูงสุดในการวางแผน
                                   </p>
                                   <div className="flex gap-2">
                                     <button 
                                        onClick={() => routeStart && routeEnd && openGoogleMapsTransit(routeStart.lat, routeStart.lng, routeEnd.lat, routeEnd.lng)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-[11px] rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-[0.98]"
                                     >
                                        <ExternalLink size={14} /> Google Maps
                                     </button>
                                     <button
                                       onClick={(e) => { e.stopPropagation(); handleAskLocus(); }}
                                       className="flex items-center gap-2 px-4 py-2 bg-[#facc15] hover:bg-[#eab308] text-black font-black text-[11px] uppercase tracking-wider rounded-xl shadow-[0_4px_15px_rgba(250,204,21,0.3)] transition-all"
                                     >
                                       <Sparkles size={14} /> Ask Locus
                                     </button>
                                   </div>
                                </div>
                             ) : (
                                <>
                                   <div className="flex flex-col">
                                      <span className="text-2xl font-black text-white tracking-tight">
                                         {routeData ? (routeData.duration > 3600 
                                            ? `${Math.floor(routeData.duration / 3600)} hr ${Math.round((routeData.duration % 3600) / 60)} min`
                                            : `${Math.round(routeData.duration / 60)} min`) : (routeStart || routeEnd ? 'พร้อมวิเคราะห์' : '--:--')}
                                      </span>
                                      <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                                         {routeData ? `${(routeData.distance / 1000).toFixed(1)} KM • ${travelMode}` : (routeStart || routeEnd ? 'ระบุตำแหน่งแล้ว' : 'รอระบุตำแหน่ง')}
                                      </span>
                                   </div>

                                   {/* Ask Locus Button - Always show if we have data */}
                                   {(routeStart || routeEnd) && (
                                     <button
                                       onClick={(e) => {
                                         e.stopPropagation();
                                         handleAskLocus();
                                       }}
                                       className="flex items-center gap-2 px-4 py-2 bg-[#facc15] hover:bg-[#eab308] text-black font-black text-[11px] uppercase tracking-wider rounded-xl shadow-[0_4px_15px_rgba(250,204,21,0.3)] transition-all hover:-translate-y-0.5 active:scale-95"
                                     >
                                       <Sparkles size={14} />
                                       Ask Locus
                                     </button>
                                   )}
                                    
                                    {travelMode === 'driving' && routeData && (
                                       <button 
                                         onClick={() => setShowFuelDetails(!showFuelDetails)}
                                         className={`flex flex-col items-end gap-0.5 group transition-all ${showFuelDetails ? 'text-amber-400' : 'text-slate-400 hover:text-white'}`}
                                       >
                                          <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg border border-white/10 group-hover:border-white/20">
                                             <Fuel size={14} />
                                             <span className="text-sm font-bold">~{fuelCalc?.totalCost.toFixed(0)} ฿</span>
                                             <ChevronDown size={14} className={`transition-transform ${showFuelDetails ? 'rotate-180' : ''}`} />
                                          </div>
                                       </button>
                                    )}
                                 </>
                             )}
                          </div>

                          {/* Tactical Fuel Details Expansion */}
                          {travelMode === 'driving' && showFuelDetails && routeData && (
                             <div className="p-4 bg-black/40 space-y-4 animate-in slide-in-from-top-2 duration-200">
                                {/* Vehicle & Terrain Selectors */}
                                <div className="flex gap-4">
                                   <div className="flex-1 space-y-2">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Vehicle Type</label>
                                      <div className="flex gap-1 bg-black/60 p-1 rounded-lg border border-white/5">
                                         <button 
                                            onClick={() => setVehicleType('car')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-[11px] font-bold transition-all ${vehicleType === 'car' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
                                         >
                                            <Car size={12} /> Car
                                         </button>
                                         <button 
                                            onClick={() => setVehicleType('motorcycle')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-[11px] font-bold transition-all ${vehicleType === 'motorcycle' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
                                         >
                                            <Bike size={12} /> Moto
                                         </button>
                                      </div>
                                   </div>
                                   <div className="flex-1 space-y-2">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Terrain</label>
                                      <button 
                                         onClick={() => setIsMountainous(!isMountainous)}
                                         className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[11px] font-bold transition-all border ${isMountainous ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-black/60 border-white/5 text-slate-500 hover:text-slate-300'}`}
                                      >
                                         <Mountain size={12} /> {isMountainous ? 'Mountainous' : 'Normal'}
                                      </button>
                                   </div>
                                </div>

                                {/* Fuel Type Selector */}
                                <div className="space-y-2">
                                   <label className="text-[10px] font-bold text-slate-500 uppercase">Fuel Type</label>
                                   <div className="grid grid-cols-4 gap-1.5">
                                      {availableFuelTypes.map(p => (
                                         <button 
                                            key={p.fuelType}
                                            onClick={() => setSelectedFuelType(p.fuelType)}
                                            className={`py-1.5 rounded-md text-[10px] font-black border transition-all ${selectedFuelType === p.fuelType ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white'}`}
                                         >
                                            {p.fuelType}
                                         </button>
                                      ))}
                                   </div>
                                </div>

                                {/* Calculation Breakdown */}
                                <div className="pt-3 border-t border-white/5 space-y-2">
                                   <div className="flex justify-between items-center text-[11px]">
                                      <span className="text-slate-400">Efficiency</span>
                                      <span className="text-white font-mono">{vehicleType === 'car' ? 14 : 35} km/L</span>
                                   </div>
                                   <div className="flex justify-between items-center text-[11px]">
                                      <span className="text-slate-400">Consumption (Net)</span>
                                      <span className="text-white font-mono">{fuelCalc?.liters.toFixed(2)} L</span>
                                   </div>
                                   <div className="flex justify-between items-center text-[11px]">
                                      <div className="flex items-center gap-1 text-emerald-400/80">
                                         <Info size={10} />
                                         <span>Incl. 20% Safety Margin</span>
                                      </div>
                                      <span className="text-emerald-400 font-mono font-bold">{fuelCalc?.litersWithMargin.toFixed(2)} L</span>
                                   </div>
                                   <div className="mt-2 bg-white/5 p-2 rounded-lg flex justify-between items-center">
                                      <span className="text-[10px] font-bold text-slate-400 uppercase">Est. Total Cost</span>
                                      <span className="text-lg font-black text-white">{fuelCalc?.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿</span>
                                   </div>
                                </div>
                             </div>
                          )}
                       </div>
                    ) : (
                       <div className="p-8 flex flex-col items-center justify-center gap-3 text-center">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                             <MapPin size={24} className="text-slate-600" />
                          </div>
                          <div className="space-y-1">
                             <p className="text-white font-bold text-sm">วางแผนเส้นทางของคุณ</p>
                             <p className="text-slate-500 text-[11px] px-6">เลือกจุดเริ่มต้นและปลายทางเพื่อคำนวณระยะทาง เวลา และประมาณการน้ำมันที่ต้องใช้</p>
                          </div>
                       </div>
                    )}
                 </div>
              </div>
            ) : (
              <div className="relative w-[min(420px,100%)]">
              <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-cyan-400/20 blur-xl" />

              <div className={`relative bg-[#0b1018]/95 border border-white/10 backdrop-blur-md flex items-center p-3.5 shadow-2xl transition-all w-full ${(showSuggestions && searchQuery.trim()) ? 'rounded-b-2xl rounded-t-none' : 'rounded-2xl'}`}>
                <Search size={18} className="text-cyan-500/70 ml-2 mr-3 shrink-0" />
                <input
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="ค้นหาสถานที่ (regex)..."
                  className="bg-transparent border-none outline-none focus:outline-none text-sm text-cyan-300 caret-cyan-300 w-full placeholder:text-slate-500 font-medium"
                />
                <div className="flex items-center gap-1 shrink-0 mr-1">
                  {/* Locate Me inside Search */}
                  <button 
                    onClick={handleLocateMe}
                    disabled={isLocating}
                    className="p-1.5 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-md transition-all group/locate"
                    title="My Current Location"
                  >
                    {isLocating ? (
                      <Loader2 size={16} className="animate-spin text-cyan-400" />
                    ) : (
                      <LocateFixed size={16} className="group-hover/locate:scale-110 transition-transform" />
                    )}
                  </button>

                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setShowSuggestions(false);
                        setRemoteSuggestions([]);
                      }}
                      className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                      title="Clear Search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              </div>
            )}
           </div>

            </div>

      {/* Vertical Map Settings Menu */}
      <div className="absolute bottom-[180px] right-4 z-[1000] flex flex-col gap-2">
        {activeOverlay && (
          <div className="absolute right-full mr-3 bottom-0 bg-[#0b1018]/95 border border-white/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl w-[300px] max-h-[420px] overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                {activeOverlay === 'layers' ? 'ชั้นข้อมูล (Data Layers)' : 'สไตล์แผนที่'}
              </span>
              <button onClick={() => setActiveOverlay(null)} className="text-slate-400 hover:text-white">
                <ChevronLeft size={18} className="rotate-0" />
              </button>
            </div>
            {activeOverlay === 'layers' && (
              <div className="flex flex-col gap-2">
                {mapLayerOptions.map((opt) => (
                  <LayerItem
                    key={opt.id}
                    opt={opt}
                    isEnabled={mapDataLayers?.[opt.id] ?? false}
                    onToggle={() => onToggleLayer?.(opt.id)}
                    status={getLayerStatus(opt.id)}
                  />
                ))}
              </div>
            )}
            {activeOverlay === 'map' && (
              <div className="grid grid-cols-2 gap-3">
                {(Object.entries(tileProviders) as [ProvinceMapTheme, any][]).map(([key, provider]) => {
                  const previewUrl = provider.url.replace('{s}', 'a').replace('{z}', '12').replace('{x}', '3233').replace('{y}', '1844').replace('{r}', '');
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        onChangeTheme?.(key);
                        setActiveOverlay(null);
                      }}
                      className={`group relative flex flex-col items-center gap-2 p-1.5 rounded-2xl border transition-all duration-300 ${theme === key ? 'bg-cyan-500/20 border-cyan-400/60 ring-2 ring-cyan-500/20' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                    >
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative shadow-lg">
                        <img 
                          src={previewUrl} 
                          alt={key}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://via.placeholder.com/150/0f172a/ffffff?text=${key}`;
                          }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60`} />
                        {theme === key && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                            <span className="text-[10px] text-white font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-tight ${theme === key ? 'text-cyan-300' : 'text-slate-400 group-hover:text-white'}`}>
                        {themeThaiNames[key]}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col bg-[#0b1018]/90 border border-white/10 backdrop-blur-md rounded-2xl p-1 shadow-2xl">
          <button
            onClick={() => setActiveOverlay(activeOverlay === 'map' ? null : 'map')}
            className={`w-12 h-14 flex flex-col items-center justify-center gap-1 rounded-xl transition-all ${activeOverlay === 'map' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <MapIcon size={22} />
            <span className="text-[9px] font-bold">แผนที่</span>
          </button>
          <div className="h-px bg-white/5 mx-2" />
          <button
            onClick={() => setActiveOverlay(activeOverlay === 'layers' ? null : 'layers')}
            className={`w-12 h-14 flex flex-col items-center justify-center gap-1 rounded-xl transition-all ${activeOverlay === 'layers' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayersIcon size={22} />
            <span className="text-[9px] font-bold">ชั้น</span>
          </button>
          <div className="h-px bg-white/5 mx-2" />
          <button
            onClick={() => {
              setIsRoutingMode(true);
              setActiveRouteField('start');
            }}
            className={`w-12 h-14 flex flex-col items-center justify-center gap-1 rounded-xl transition-all ${isRoutingMode ? 'bg-blue-600/30 text-blue-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <div className="relative">
              <Car size={22} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            </div>
            <span className="text-[9px] font-bold">เส้นทาง</span>
          </button>
        </div>
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
        .leaflet-layer.rain-radar-tile .leaflet-tile,
        .leaflet-tile.rain-radar-tile {
          filter: ${RAIN_RADAR_TILE_FILTER};
          mix-blend-mode: normal;
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
}

// Map Filter Pill Component
const FilterPill = ({ color, label, icon, isActive, onToggle }: { color: string; label: string; icon: string; isActive: boolean; onToggle: () => void; type?: string }) => (
  <button 
    onClick={onToggle}
    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all shadow-md border whitespace-nowrap ${
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

// Layer Item helper - Moved outside to preserve state
const LayerItem = ({ opt, isEnabled, onToggle, status }: { opt: any; isEnabled: boolean; onToggle: () => void, status: any }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className={`flex flex-col rounded-xl border transition-all ${isEnabled ? 'bg-amber-500/10 border-amber-400/30' : 'bg-white/5 border-white/10'}`}>
      <div className="flex items-center justify-between p-2.5">
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 flex-1 text-left transition-colors ${isEnabled ? 'text-amber-200' : 'text-slate-400 hover:text-white'}`}
        >
          <span className="text-lg leading-none">{opt.icon}</span>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold truncate">{opt.label}</span>
            <span className={`text-[9px] font-medium ${status.color}`}>{status.label}</span>
          </div>
        </button>
        {isEnabled && (
          <button onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }} className="p-1.5 text-slate-500 hover:text-amber-400">
            {showInfo ? <ChevronDown size={14} /> : <Info size={14} />}
          </button>
        )}
      </div>
      {isEnabled && showInfo && (
        <div className="px-3 pb-3 border-t border-amber-400/10 pt-2 space-y-3">
          <p className="text-[10px] text-slate-300 leading-relaxed font-medium">{opt.description || 'ไม่มีรายละเอียดเพิ่มเติม'}</p>
          
          {/* Professional Legend Components */}
          {opt.id === 'rainRadar' && (
            <div className="relative flex gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
              {/* Vertical Gradient Bar - Matches reference */}
              <div className="w-2.5 h-[160px] rounded-full bg-gradient-to-t from-[#e0f2fe] via-[#3b82f6] via-[#1e40af] via-[#ef4444] via-[#facc15] to-[#fbbf24] border border-white/10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]" />
              
              {/* Legend Items */}
              <div className="flex flex-col justify-between text-[11px] py-1 font-medium">
                 <div className="flex items-center gap-2.5 group/item">
                   <div className="w-3 h-3 rounded-full bg-[#e0f2fe] border border-white/20 shadow-sm" />
                   <span className="text-slate-300 group-hover/item:text-white transition-colors">มืดครึ้ม</span>
                 </div>
                 <div className="flex items-center gap-2.5 group/item">
                   <div className="w-3 h-3 rounded-full bg-[#3b82f6] border border-white/20 shadow-sm" />
                   <span className="text-slate-300 group-hover/item:text-white transition-colors">ฝนตกปรอยๆ</span>
                 </div>
                 <div className="flex items-center gap-2.5 group/item">
                   <div className="w-3 h-3 rounded-full bg-[#1e40af] border border-white/20 shadow-sm" />
                   <span className="text-slate-300 group-hover/item:text-white transition-colors">ฝนตกเล็กน้อย</span>
                 </div>
                 <div className="flex items-center gap-2.5 group/item">
                   <div className="w-3 h-3 rounded-full bg-[#ef4444] border border-white/20 shadow-sm" />
                   <span className="text-slate-300 group-hover/item:text-white transition-colors">ฝนตกปานกลาง</span>
                 </div>
                 <div className="flex items-center gap-2.5 group/item">
                   <div className="w-3 h-3 rounded-full bg-[#facc15] border border-white/20 shadow-sm" />
                   <span className="text-slate-300 group-hover/item:text-white transition-colors">ฝนตกหนัก</span>
                 </div>
                 <div className="flex items-center gap-2.5 group/item">
                   <div className="w-3 h-3 rounded-full bg-[#fbbf24] border border-white/10 shadow-[0_0_10px_rgba(251,191,36,0.4)]" />
                   <span className="text-amber-300 font-black tracking-tight">ลูกเห็บ / พายุ</span>
                 </div>
              </div>
            </div>
          )}

          {opt.id === 'gistdaAqi' && (
            <div className="mt-1">
              <div className="flex h-2 w-full rounded-full overflow-hidden mb-1.5 border border-white/10 shadow-inner">
                <div className="flex-1 bg-[#38bdf8]" />
                <div className="flex-1 bg-[#4ade80]" />
                <div className="flex-1 bg-[#facc15]" />
                <div className="flex-1 bg-[#fb923c]" />
                <div className="flex-1 bg-[#ef4444]" />
              </div>
              <div className="grid grid-cols-5 gap-0.5 text-[8px] text-slate-400 text-center uppercase font-black">
                <span>ดีมาก</span>
                <span>ดี</span>
                <span>ปานกลาง</span>
                <span>เริ่มมีผล</span>
                <span>อันตราย</span>
              </div>
            </div>
          )}

          {opt.id === 'floodRecurrent' && (
            <div className="mt-1">
              <div className="flex h-2 w-full rounded-full overflow-hidden mb-1.5 border border-white/10 shadow-inner bg-gradient-to-r from-cyan-400 to-blue-600" />
              <div className="flex justify-between text-[8px] text-slate-400 font-black uppercase">
                <span>น้ำขัง</span>
                <span>น้ำท่วมขังสูง</span>
              </div>
            </div>
          )}



          {opt.id === 'slope' && (
            <div className="mt-1">
              <div className="flex h-2 w-full rounded-full overflow-hidden mb-1.5 border border-white/10 bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600 shadow-inner" />
              <div className="flex justify-between text-[8px] text-slate-400 font-black uppercase">
                <span>ที่ราบ (Safe)</span>
                <span>ลาดชันปานกลาง</span>
                <span>ชันสูง (Danger)</span>
              </div>
            </div>
          )}

          {opt.id === 'traffic' && (
            <div className="mt-1 p-2 rounded-lg bg-black/20 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <span className="text-[10px] text-slate-300">การจราจรคล่องตัว</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#eab308]" />
                <span className="text-[10px] text-slate-300">ชะลอตัว / หนาแน่น</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                <span className="text-[10px] text-slate-300">ติดขัด / ติดหนึบ</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default React.forwardRef(ProvinceMapComponent);
