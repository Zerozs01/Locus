import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Province } from '../data/regions';
import thailandGeo from '../data/thailand-geo.json';

interface ThailandMapProps {
  activeId: string | null;
  onSelectRegion: (id: string) => void;
  viewMode: string;
  selectedProvince: Province | null;
  onSelectProvince: (prov: Province) => void;
}

// Map provinces to their regions
const provinceToRegion: Record<string, string> = {
  // North - 9 provinces
  'Chiang Mai': 'north',
  'Chiang Rai': 'north',
  'Lampang': 'north',
  'Lamphun': 'north',
  'Mae Hong Son': 'north',
  'Nan': 'north',
  'Phayao': 'north',
  'Phrae': 'north',
  'Uttaradit': 'north',
  
  // Northeast (Isan) - 20 provinces
  'Amnat Charoen': 'northeast',
  'Bueng Kan': 'northeast',
  'Buri Ram': 'northeast',
  'Chaiyaphum': 'northeast',
  'Kalasin': 'northeast',
  'Khon Kaen': 'northeast',
  'Loei': 'northeast',
  'Maha Sarakham': 'northeast',
  'Mukdahan': 'northeast',
  'Nakhon Phanom': 'northeast',
  'Nakhon Ratchasima': 'northeast',
  'Nong Bua Lam Phu': 'northeast',
  'Nong Khai': 'northeast',
  'Roi Et': 'northeast',
  'Sakon Nakhon': 'northeast',
  'Si Sa Ket': 'northeast',
  'Surin': 'northeast',
  'Ubon Ratchathani': 'northeast',
  'Udon Thani': 'northeast',
  'Yasothon': 'northeast',
  
  // Central - 22 provinces + Bangkok
  'Ang Thong': 'central',
  'Bangkok Metropolis': 'central',
  'Chai Nat': 'central',
  'Kamphaeng Phet': 'central',
  'Lop Buri': 'central',
  'Nakhon Nayok': 'central',
  'Nakhon Pathom': 'central',
  'Nakhon Sawan': 'central',
  'Nonthaburi': 'central',
  'Pathum Thani': 'central',
  'Phetchabun': 'central',
  'Phichit': 'central',
  'Phitsanulok': 'central',
  'Phra Nakhon Si Ayutthaya': 'central',
  'Samut Prakan': 'central',
  'Samut Sakhon': 'central',
  'Samut Songkhram': 'central',
  'Saraburi': 'central',
  'Sing Buri': 'central',
  'Sukhothai': 'central',
  'Suphan Buri': 'central',
  'Uthai Thani': 'central',
  
  // West - 5 provinces
  'Kanchanaburi': 'west',
  'Phetchaburi': 'west',  // เพชรบุรี (ไม่ใช่ Phetchabun เพชรบูรณ์)
  'Prachuap Khiri Khan': 'west',
  'Ratchaburi': 'west',
  'Tak': 'west',
  
  // East - 7 provinces
  'Chachoengsao': 'east',
  'Chanthaburi': 'east',
  'Chon Buri': 'east',
  'Prachin Buri': 'east',
  'Rayong': 'east',
  'Sa Kaeo': 'east',
  'Trat': 'east',
  
  // South - 14 provinces
  'Chumphon': 'south',
  'Krabi': 'south',
  'Nakhon Si Thammarat': 'south',
  'Narathiwat': 'south',
  'Pattani': 'south',
  'Phangnga': 'south',
  'Phatthalung': 'south',
  'Phuket': 'south',
  'Ranong': 'south',
  'Satun': 'south',
  'Songkhla': 'south',
  'Surat Thani': 'south',
  'Trang': 'south',
  'Yala': 'south',
};

// Region colors - ใช้สีที่ชัดเจนสำหรับแต่ละภาค
const regionColors: Record<string, { default: string; active: string; hover: string }> = {
  north: { default: '#475569', active: '#f43f5e', hover: '#64748b' },      // แดง/ชมพู
  northeast: { default: '#475569', active: '#fbcfe8', hover: '#64748b' },  // ชมพูอ่อน
  central: { default: '#475569', active: '#06b6d4', hover: '#64748b' },    // ฟ้า cyan
  west: { default: '#475569', active: '#a855f7', hover: '#64748b' },       // ม่วง purple
  east: { default: '#475569', active: '#22c55e', hover: '#64748b' },       // เขียว green
  south: { default: '#475569', active: '#f97316', hover: '#64748b' },      // ส้ม orange
};

export const ThailandMap = ({ 
  activeId, 
  onSelectRegion, 
  viewMode
}: ThailandMapProps) => {

  const getZoomCenter = (): { center: [number, number]; zoom: number } => {
    if (activeId && viewMode === 'province') {
      switch (activeId) {
        case 'north':
          return { center: [99.5, 18.5], zoom: 4 };
        case 'northeast':
          return { center: [103.5, 15.5], zoom: 3.5 };
        case 'central':
          return { center: [100.5, 15], zoom: 4 };
        case 'west':
          return { center: [99, 14], zoom: 4 };
        case 'east':
          return { center: [102, 13], zoom: 5 };
        case 'south':
          return { center: [99.5, 9], zoom: 3.5 };
        default:
          return { center: [101, 13], zoom: 1.8 };
      }
    }
    return { center: [101, 13], zoom: 1.8 };
  };

  const { center, zoom } = getZoomCenter();

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 2800,
          center: [101, 13],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup
          center={center}
          zoom={zoom}
          minZoom={1}
          maxZoom={8}
        >
          <Geographies geography={thailandGeo}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const provinceName = geo.properties.name;
                const regionId = provinceToRegion[provinceName] || 'central';
                const isRegionActive = activeId === regionId;
                const isProvinceView = viewMode === 'province';
                const isDimmed = isProvinceView && !isRegionActive;
                const colors = regionColors[regionId] || regionColors.central;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onSelectRegion(regionId)}
                    style={{
                      default: {
                        fill: isRegionActive ? colors.active : colors.default,
                        stroke: isRegionActive ? '#fff' : '#64748b',
                        strokeWidth: 0.3,
                        outline: 'none',
                        opacity: isDimmed ? 0.3 : 1,
                        transition: 'all 0.3s ease',
                      },
                      hover: {
                        fill: isRegionActive ? colors.active : colors.hover,
                        stroke: '#fff',
                        strokeWidth: 0.5,
                        outline: 'none',
                        cursor: 'pointer',
                        opacity: isDimmed ? 0.3 : 1,
                      },
                      pressed: {
                        fill: colors.active,
                        stroke: '#fff',
                        strokeWidth: 0.5,
                        outline: 'none',
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Region Labels - แสดงเมื่อไม่ได้ซูมเข้าภาค */}
      {viewMode !== 'province' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-full h-full">
            <span className={`absolute top-[18%] left-[38%] text-xs font-bold uppercase tracking-wide transition-all duration-300 ${activeId === 'north' ? 'text-white' : 'text-white/60'}`}>North</span>
            <span className={`absolute top-[28%] left-[58%] text-xs font-bold uppercase tracking-wide transition-all duration-300 ${activeId === 'northeast' ? 'text-white' : 'text-white/60'}`}>Isan</span>
            <span className={`absolute top-[42%] left-[42%] text-xs font-bold uppercase tracking-wide transition-all duration-300 ${activeId === 'central' ? 'text-white' : 'text-white/60'}`}>Central</span>
            <span className={`absolute top-[48%] left-[28%] text-xs font-bold uppercase tracking-wide transition-all duration-300 ${activeId === 'west' ? 'text-white' : 'text-white/60'}`}>West</span>
            <span className={`absolute top-[50%] left-[55%] text-xs font-bold uppercase tracking-wide transition-all duration-300 ${activeId === 'east' ? 'text-white' : 'text-white/60'}`}>East</span>
            <span className={`absolute top-[72%] left-[35%] text-xs font-bold uppercase tracking-wide transition-all duration-300 ${activeId === 'south' ? 'text-white' : 'text-white/60'}`}>South</span>
          </div>
        </div>
      )}
    </div>
  );
};
