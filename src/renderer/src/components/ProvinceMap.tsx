import { useEffect, useRef, useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2, WifiOff, RefreshCw, Search, LocateFixed, Route, Car, Bike, Footprints, ChevronLeft, MoreVertical, MapPin } from 'lucide-react';
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
}

type ProvinceMapTheme = 'voyager' | 'positron' | 'dark' | 'osm' | 'satellite' | 'terrain' | 'admin';
type ProvinceMarkerFilter = 'attraction' | 'restaurant' | 'hotel' | 'hospital' | 'transport';
type ProvinceDataLayer = 'traffic' | 'gistdaAqi' | 'aqicnAqi' | 'rainRadar' | 'landParcel' | 'evCharger' | 'slope';

interface ProvinceMapProps {
  provinceName: string;
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
const GISTDA_DEFAULT_WMS_URL = 'https://service-proxy-765rkyfg3q-as.a.run.app/api_geoserver/geoserver/pm25_hourly_raster_24hr/wms';
const GISTDA_DEFAULT_WMS_LAYER = 'pm25_hourly_raster_24hr';
const LONGDO_TRAFFIC_TILE_URL = `https://mstraffic1.longdo.com/mmmap/tile.php?proj=epsg3857&mode=trafficoverlay&zoom={z}&x={x}&y={y}&key=${encodeURIComponent(LONGDO_MAP_API_KEY)}`;

const mapLayerUrls = {
  traffic: import.meta.env.VITE_MAP_LAYER_TRAFFIC_URL || LONGDO_TRAFFIC_TILE_URL,
  gistdaAqi: import.meta.env.VITE_MAP_LAYER_GISTDA_URL || GISTDA_DEFAULT_WMS_URL,
  aqicnAqi: import.meta.env.VITE_MAP_LAYER_AQICN_URL || `https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=${AQICN_TILE_TOKEN}`,
  rainRadar: import.meta.env.VITE_MAP_LAYER_RAIN_URL || '',
  landParcel: import.meta.env.VITE_MAP_LAYER_LANDPARCEL_URL || 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
  slope: import.meta.env.VITE_MAP_LAYER_SLOPE_URL || 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
};

const dataLayerLabels: Record<ProvinceDataLayer, string> = {
  traffic: 'จราจร',
  gistdaAqi: 'คุณภาพอากาศ (GISTDA)',
  aqicnAqi: 'ดัชนีคุณภาพอากาศ (AQICN)',
  rainRadar: 'เรดาร์ตรวจฝน',
  landParcel: 'แปลงที่ดิน',
  evCharger: 'จุดชาร์จรถไฟฟ้า',
  slope: 'พื้นที่ลาดชัน',
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

export const provinceCoordinates: Record<string, { lat: number; lng: number }> = {
  'Chiang Mai': { lat: 18.7883, lng: 98.9853 },
  'Chiang Rai': { lat: 19.9105, lng: 99.8406 },
  'Nan': { lat: 18.7756, lng: 100.7730 },
  'Phrae': { lat: 18.1445, lng: 100.1403 },
  'Mae Hong Son': { lat: 19.3020, lng: 97.9654 },
  'Lamphun': { lat: 18.5744, lng: 99.0087 },
  'Lampang': { lat: 18.2888, lng: 99.4907 },
  'Phayao': { lat: 19.1664, lng: 99.9019 },
  'Uttaradit': { lat: 17.6200, lng: 100.0993 },
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
  'Bangkok': { lat: 13.7563, lng: 100.5018 },
  'Bangkok Metropolis': { lat: 13.7563, lng: 100.5018 },
  'Nonthaburi': { lat: 13.8621, lng: 100.5144 },
  'Pathum Thani': { lat: 14.0208, lng: 100.5250 },
  'Samut Prakan': { lat: 13.5990, lng: 100.5998 },
  'Samut Sakhon': { lat: 13.5475, lng: 100.2744 },
  'Nakhon Pathom': { lat: 13.8196, lng: 100.0445 },
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
  'Chon Buri': { lat: 13.3611, lng: 100.9847 },
  'Rayong': { lat: 12.6833, lng: 101.2833 },
  'Chanthaburi': { lat: 12.6103, lng: 102.1028 },
  'Trat': { lat: 12.2428, lng: 102.5177 },
  'Chachoengsao': { lat: 13.6904, lng: 101.0779 },
  'Prachin Buri': { lat: 14.0509, lng: 101.3660 },
  'Sa Kaeo': { lat: 13.8240, lng: 102.0645 },
  'Kanchanaburi': { lat: 14.0227, lng: 99.5328 },
  'Ratchaburi': { lat: 13.5283, lng: 99.8134 },
  'Phetchaburi': { lat: 13.1119, lng: 99.9397 },
  'Prachuap Khiri Khan': { lat: 11.8126, lng: 99.7957 },
  'Samut Songkhram': { lat: 13.4098, lng: 100.0023 },
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


const bangkokFallbackPlaces: SearchPlace[] = [
  { title: 'สยามพารากอน', subtitle: 'Siam Paragon', lat: 13.7466, lng: 100.5347, type: 'landmark', keywords: 'siam paragon สยามพารากอน สยามพารากอ สยามพา', source: 'local' },
  { title: 'สยามสแควร์', subtitle: 'Siam Square', lat: 13.7449, lng: 100.5335, type: 'district', keywords: 'siam square สยามสแควร์ สยามสแคว', source: 'local' },
  { title: 'เซ็นทรัลเวิลด์', subtitle: 'CentralWorld', lat: 13.7467, lng: 100.5393, type: 'landmark', keywords: 'centralworld central world เซ็นทรัลเวิลด์', source: 'local' },
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

  const withoutEnglishProvince = withoutThaiProvinceSuffix
    .replace(new RegExp(`\\b${normalizedProvinceName.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'ig'), '')
    .replace(/\bBangkok\b/ig, '')
    .replace(/\bThailand\b/ig, '')
    .replace(/\s+/g, ' ')
    .trim();
  pushUnique(withoutEnglishProvince);

  if (/โรงพยาบาล/i.test(q)) {
    const hospitalOnly = q
      .replace(/กรุงเทพมหานคร|กรุงเทพฯ?/gi, '')
      .replace(new RegExp(`\\b${normalizedProvinceName.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'ig'), '')
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

export const ProvinceMap = forwardRef<ProvinceMapHandle, ProvinceMapProps>(({ 
  provinceName, 
  lat, 
  lng, 
  zoom = 12, 
  markers = [],
  className = '',
  theme = 'voyager', // ใช้ Voyager เป็น default - สีสันดีกว่า
  externalDataLayers = [],
  onMarkerClick,
  regionColor
}, ref) => {
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
  const [evChargerPoints, setEvChargerPoints] = useState<Array<{ lat: number; lng: number; title: string; subtitle: string }>>([]);
  const [activeDataLayerWarnings, setActiveDataLayerWarnings] = useState<string[]>([]);
  const externalDataLayerRefs = useRef<L.Layer[]>([]);
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
        try {
          const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
          if (!res.ok) throw new Error('IP Geo API failed');
          const data = await res.json();
          const lat = parseFloat(data.latitude);
          const lng = parseFloat(data.longitude);
          if (!isNaN(lat) && !isNaN(lng)) {
            resolveAndDraw(lat, lng, 1200); // ~1km accuracy for IP based
            return;
          }
          throw new Error('Invalid IP coordinates');
        } catch (err) {
          setIsLocating(false);
          alert('ระบบไม่สามารถหาตำแหน่งที่ตั้งของคุณได้เลย (เครือข่ายไม่อนุญาต)');
          resolve(null);
        }
      };

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolveAndDraw(position.coords.latitude, position.coords.longitude, position.coords.accuracy || 20);
          },
          async (error) => {
            console.warn('[Geolocation] Native API failed (often happens in Electron due to missing Google API Keys). Falling back to IP-based location...', error.message);
            await tryIPGeolocation();
          },
          { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
        );
      } else {
        tryIPGeolocation();
      }
    });
  };

  const handleLocateMe = async () => {
    await locateUserPromise();
  };

  // Routing State
  const [isRoutingMode, setIsRoutingMode] = useState(false);
  const [activeRouteField, setActiveRouteField] = useState<'start' | 'end' | null>(null);
  const [travelMode, setTravelMode] = useState<'driving' | 'walking' | 'cycling'>('driving');
  const [routeStart, setRouteStart] = useState<{lat: number, lng: number, title?: string} | null>(null);
  const [routeEnd, setRouteEnd] = useState<{lat: number, lng: number, title?: string} | null>(null);
  const [routeData, setRouteData] = useState<{distance: number, duration: number, geojson: any} | null>(null);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);

  const calculateRoute = async (startLat: number, startLng: number, endLat: number, endLng: number, mode: string) => {
    setIsCalculatingRoute(true);
    setRouteData(null);
    try {
      // Use 'driving' profile universally for reliable path geometry from free public OSRM server
      const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`);
      const data = await res.json();
      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
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
      } else {
        alert("ขออภัย ไม่พบเส้นทางเชื่อมต่อที่เหมาะสม (Route not found)");
      }
    } catch(e) {
      console.error(e);
      alert("ไม่สามารถคำนวณเส้นทางได้ (ติดปัญหาการเชื่อมต่อเซิร์ฟเวอร์ OSRM API)");
    } finally {
      setIsCalculatingRoute(false);
    }
  };

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (!routeLayerRef.current) {
       routeLayerRef.current = L.layerGroup().addTo(map);
    } else {
       routeLayerRef.current.clearLayers();
    }
    
    if (!routeData || !routeData.geojson) return;
    
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

    if (routeStart) {
      routeLayerRef.current.addLayer(
        L.marker([routeStart.lat, routeStart.lng], {
          icon: L.divIcon({
            className: 'route-pin-start',
            html: `<div style="width:16px;height:16px;background:#3b82f6;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(0,0,0,0.5);"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })
        })
      );
    }
    if (routeEnd) {
      routeLayerRef.current.addLayer(
        L.marker([routeEnd.lat, routeEnd.lng], {
          icon: L.divIcon({
            className: 'route-pin-end',
            html: `<div style="width:16px;height:16px;background:#ef4444;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(0,0,0,0.5);"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })
        })
      );
    }

    if (routeStart && routeEnd) {
      const bounds = L.latLngBounds([routeStart.lat, routeStart.lng], [routeEnd.lat, routeEnd.lng]);
      map.fitBounds(bounds, { padding: [60, 60], animate: true, duration: 1.5 });
    } else {
      map.fitBounds(polyline.getBounds(), { padding: [60, 60], animate: true, duration: 1.5 });
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
    if (!enabledDataLayers.has('rainRadar')) {
      setRainRadarTileUrl('');
      return;
    }

    const customRainUrl = mapLayerUrls.rainRadar;
    if (customRainUrl) {
      setRainRadarTileUrl(customRainUrl);
      return;
    }

    let cancelled = false;
    const resolveRainRadar = async () => {
      try {
        const resolvedTileTemplate = await window.api.map.getRainRadarTileTemplate();
        if (!cancelled) {
          setRainRadarTileUrl(resolvedTileTemplate || '');
        }
      } catch {
        if (!cancelled) {
          setRainRadarTileUrl('');
        }
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

    if (enabledDataLayers.size === 0) {
      setActiveDataLayerWarnings([]);
      return;
    }

    const unresolved: string[] = [];
    const addTileLayer = (url: string, opacity: number, attribution?: string, options?: Partial<L.TileLayerOptions>) => {
      const tileLayer = L.tileLayer(url, {
        opacity,
        zIndex: 620,
        attribution: attribution || '',
        ...(options || {}),
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
          unresolved.push(dataLayerLabels[layerId]);
          return;
        }
        addTileLayer(rainRadarTileUrl, 0.45, '&copy; RainViewer', {
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
          addTileLayer(layerUrl, 0.62, '&copy; GISTDA');
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
            }
          );
        }
        return;
      }

      if (layerId === 'traffic') {
        const layerUrl = mapLayerUrls.traffic;
        if (!layerUrl) {
          unresolved.push(dataLayerLabels[layerId]);
          return;
        }
        addTileLayer(layerUrl, 0.6, '&copy; Longdo Traffic', {
          minNativeZoom: 7,
          maxNativeZoom: 16,
        });
        return;
      }

      const layerUrl = mapLayerUrls[layerId as keyof typeof mapLayerUrls];
      if (!layerUrl) {
        unresolved.push(dataLayerLabels[layerId]);
        return;
      }

      const layerOpacity = layerId === 'aqicnAqi' ? 0.65 : layerId === 'slope' ? 0.45 : 0.55;
      addTileLayer(layerUrl, layerOpacity);
    });

    setActiveDataLayerWarnings(unresolved);

    return () => {
      externalDataLayerRefs.current.forEach((layer) => {
        map.removeLayer(layer);
      });
      externalDataLayerRefs.current = [];
    };
  }, [enabledDataLayers, rainRadarTileUrl, evChargerPoints]);

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

    if (theme !== 'admin') return;

    adminBoundaryLayerRef.current = L.geoJSON(thailandGeo as any, {
      style: {
        color: '#334155',
        weight: 1,
        opacity: 0.75,
        fillColor: '#94a3b8',
        fillOpacity: 0.02,
      },
    }).addTo(map);

    return () => {
      if (adminBoundaryLayerRef.current) {
        map.removeLayer(adminBoundaryLayerRef.current);
        adminBoundaryLayerRef.current = null;
      }
    };
  }, [theme, isLoading]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
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

      {activeDataLayerWarnings.length > 0 && !isLoading && (
        <div className="absolute top-16 right-4 z-[1000] rounded-lg border border-amber-400/40 bg-black/80 px-3 py-2 text-[11px] text-amber-200 max-w-[280px]">
          ชั้นข้อมูลต่อไปนี้ยังไม่พร้อมใช้งาน (ต้องตั้งค่า URL เพิ่ม): {activeDataLayerWarnings.join(', ')}
        </div>
      )}



      {/* Place Search, Map Controls & Routing UI */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-full pointer-events-auto flex flex-col items-center px-4">
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
              <div className="bg-[#0b1018]/95 border border-white/10 backdrop-blur-md p-4 rounded-2xl shadow-2xl relative w-[min(420px,100%)]">
                 <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-cyan-400/20 blur-xl z-[-1]" />
                 
                 {/* Top Header: Modes & Close */}
                 <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-1.5 bg-black/40 p-1 rounded-lg border border-white/5">
                       {(['driving', 'walking', 'cycling'] as const).map(m => (
                          <button 
                             key={m} 
                             onClick={() => setTravelMode(m)} 
                             className={`p-2 rounded-md transition-all ${Math.round(travelMode === m ? 1 : 0) ? 'bg-cyan-500/20 text-cyan-400 shadow-sm border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
                             title={m.charAt(0).toUpperCase() + m.slice(1)}
                          >
                             {m === 'driving' ? <Car size={16}/> : m === 'walking' ? <Footprints size={16}/> : <Bike size={16}/>}
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
                 <div className="mt-3 overflow-hidden rounded-xl border border-white/5">
                    {isCalculatingRoute ? (
                       <div className="bg-black/30 p-4 flex items-center justify-center gap-3 text-cyan-400 text-sm">
                          <Loader2 size={16} className="animate-spin" /> คำนวณเส้นทาง...
                       </div>
                    ) : routeData ? (
                       <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/10 p-4 flex justify-between items-center">
                          <div className="flex flex-col">
                             <span className="text-2xl font-bold text-white tracking-tight">
                                {routeData.duration > 3600 
                                   ? `${Math.floor(routeData.duration / 3600)} hr ${Math.round((routeData.duration % 3600) / 60)} min`
                                   : `${Math.round(routeData.duration / 60)} min`}
                             </span>
                             <span className="text-slate-400 text-sm font-medium">({(routeData.distance / 1000).toFixed(1)} km) {travelMode.charAt(0).toUpperCase() + travelMode.slice(1)}</span>
                          </div>
                       </div>
                    ) : (
                       <div className="bg-black/30 p-4 flex flex-col items-center justify-center gap-1">
                          <MapPin size={24} className="text-white/20" />
                          <span className="text-slate-500 text-xs text-center px-4">ระบุต้นทางและปลายทางเพื่อคำนวณเส้นทาง...</span>
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
                  <div className="w-px h-5 bg-white/10 mx-1"></div>
                  <button 
                    className="p-1.5 text-cyan-400 hover:bg-cyan-500/20 rounded-md transition-colors flex items-center gap-1.5 bg-cyan-500/10 shadow-sm"
                    title="Get Directions"
                    onClick={async () => {
                       setIsRoutingMode(true);
                       
                       let destination = null;
                       if (searchQuery) {
                         destination = cachedSearchAreasRef.current.get(normalizeSearchText(searchQuery)) || pendingFallbackRef.current;
                         if (destination) {
                           setRouteEnd({ lat: destination.lat, lng: destination.lng, title: searchQuery });
                         }
                       }
                       setSearchQuery('');
                       setActiveRouteField('start');
                       
                       // Automatically find user location if start isn't set
                       let startObj = routeStart;
                       if (!startObj) {
                          const point = await locateUserPromise();
                          if (point) {
                             startObj = { lat: point.lat, lng: point.lng, title: 'ตำแหน่งปัจจุบันของคุณ' };
                             setRouteStart(startObj);
                             setActiveRouteField(null); // Clear active field since we got it
                          }
                       }
                       
                       // Find route if both are ready
                       if (startObj && destination) {
                          calculateRoute(startObj.lat, startObj.lng, destination.lat, destination.lng, travelMode);
                       }
                    }}
                  >
                    <Route size={18} />
                  </button>
                </div>
              </div>
              </div>
            )}
           </div>

            {/* Quick Map Controls (Locate Me) */}
            {!isRoutingMode && (
              <div className="flex flex-col gap-2 shrink-0 shadow-2xl h-[46px]">
                <button 
                  className="w-[46px] h-[46px] bg-[#0b1018]/95 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all flex items-center justify-center group"
                  title="My Current Location"
                  onClick={handleLocateMe}
                  disabled={isLocating}
                >
                  {isLocating ? (
                    <Loader2 size={18} className="animate-spin text-cyan-400" />
                  ) : (
                    <LocateFixed size={18} className="group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>
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

export default ProvinceMap;
