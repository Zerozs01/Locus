import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2, WifiOff, RefreshCw } from 'lucide-react';

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

export const ProvinceMap = ({ 
  provinceName, 
  lat, 
  lng, 
  zoom = 12, 
  markers = [],
  className = '',
  theme = 'voyager' // ใช้ Voyager เป็น default - สีสันดีกว่า
}: ProvinceMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Get coordinates for province
  const coords = lat && lng 
    ? { lat, lng } 
    : provinceCoordinates[provinceName] || defaultCoords;

  const initMap = () => {
    if (!mapRef.current) return;

    setIsLoading(true);
    setHasError(false);

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      // Initialize map
      const map = L.map(mapRef.current, {
        center: [coords.lat, coords.lng],
        zoom: zoom,
        zoomControl: true,
        attributionControl: true,
      });

      // Get tile provider
      const provider = tileProviders[theme] || tileProviders.voyager;

      // Add tile layer with error handling
      const tileLayer = L.tileLayer(provider.url, {
        maxZoom: 19,
        attribution: provider.attribution,
        errorTileUrl: '', // Prevent broken image icons
      });

      // Track tile loading
      let loadedTiles = 0;
      let errorTiles = 0;

      tileLayer.on('tileload', () => {
        loadedTiles++;
        if (loadedTiles >= 4) { // At least 4 tiles loaded
          setIsLoading(false);
        }
      });

      tileLayer.on('tileerror', () => {
        errorTiles++;
        if (errorTiles > 10) {
          setHasError(true);
          setIsLoading(false);
        }
      });

      tileLayer.addTo(map);

      // Timeout fallback for loading state
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      // Custom marker icons with better colors for light theme
      const markerIcons: Record<string, L.DivIcon> = {
        attraction: L.divIcon({
          className: 'custom-marker',
          html: `<div style="background: linear-gradient(135deg, #14b8a6, #0d9488); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 3px 10px rgba(20,184,166,0.4);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
          </div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        }),
        restaurant: L.divIcon({
          className: 'custom-marker',
          html: `<div style="background: linear-gradient(135deg, #f59e0b, #d97706); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 3px 10px rgba(245,158,11,0.4);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>
          </div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        }),
        hotel: L.divIcon({
          className: 'custom-marker',
          html: `<div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 3px 10px rgba(139,92,246,0.4);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>
          </div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        }),
        hospital: L.divIcon({
          className: 'custom-marker',
          html: `<div style="background: linear-gradient(135deg, #ef4444, #dc2626); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 3px 10px rgba(239,68,68,0.4);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
          </div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        }),
        transport: L.divIcon({
          className: 'custom-marker',
          html: `<div style="background: linear-gradient(135deg, #3b82f6, #2563eb); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 3px 10px rgba(59,130,246,0.4);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg>
          </div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        }),
      };

      // Add markers with popup styling
      markers.forEach(marker => {
        const icon = markerIcons[marker.type] || markerIcons.attraction;
        const typeColors: Record<string, string> = {
          attraction: '#14b8a6',
          restaurant: '#f59e0b',
          hotel: '#8b5cf6',
          hospital: '#ef4444',
          transport: '#3b82f6',
        };
        const typeLabels: Record<string, string> = {
          attraction: '🎯 Attraction',
          restaurant: '🍜 Restaurant',
          hotel: '🏨 Hotel',
          hospital: '🏥 Hospital',
          transport: '🚌 Transport',
        };
        
        L.marker([marker.lat, marker.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: system-ui; min-width: 150px;">
              <strong style="font-size: 14px; color: #1f2937;">${marker.title}</strong>
              <div style="color: ${typeColors[marker.type]}; font-size: 12px; margin-top: 4px;">
                ${typeLabels[marker.type] || marker.type}
              </div>
            </div>
          `);
      });

      // Add province center marker
      const centerIcon = L.divIcon({
        className: 'custom-marker province-center',
        html: `<div style="background: linear-gradient(135deg, #06b6d4, #0891b2); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 4px solid white; box-shadow: 0 4px 15px rgba(6,182,212,0.5); animation: pulse 2s infinite;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        </div>`,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
      });
      
      L.marker([coords.lat, coords.lng], { icon: centerIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: system-ui; text-align: center; min-width: 120px;">
            <strong style="font-size: 15px; color: #1f2937;">${provinceName}</strong>
            <div style="color: #06b6d4; font-size: 12px; margin-top: 4px;">📍 Province Center</div>
          </div>
        `);

      mapInstanceRef.current = map;
    } catch (error) {
      console.error('Map initialization error:', error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [provinceName, coords.lat, coords.lng, zoom, markers, theme, retryCount]);

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

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200">
        <div className="text-xs font-semibold text-slate-700 mb-2">Legend</div>
        <div className="space-y-1.5">
          <LegendItem color="#14b8a6" label="Attractions" />
          <LegendItem color="#f59e0b" label="Restaurants" />
          <LegendItem color="#8b5cf6" label="Hotels" />
          <LegendItem color="#ef4444" label="Hospitals" />
          <LegendItem color="#3b82f6" label="Transport" />
        </div>
      </div>

      {/* CSS for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
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
};

// Legend Item Component
const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div 
      className="w-3 h-3 rounded-full" 
      style={{ backgroundColor: color }}
    />
    <span className="text-xs text-slate-600">{label}</span>
  </div>
);

export default ProvinceMap;
