import { ComposableMap, Geographies, Geography, ZoomableGroup, Annotation } from 'react-simple-maps';
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
const regionColors: Record<string, { default: string; active: string; hover: string; dimmed: string }> = {
  north: { default: '#475569', active: '#f43f5e', hover: '#64748b', dimmed: '#7f1d1d' },      // แดง/ชมพู
  northeast: { default: '#475569', active: '#fbcfe8', hover: '#64748b', dimmed: '#831843' },  // ชมพูอ่อน
  central: { default: '#475569', active: '#06b6d4', hover: '#64748b', dimmed: '#164e63' },    // ฟ้า cyan
  west: { default: '#475569', active: '#a855f7', hover: '#64748b', dimmed: '#581c87' },       // ม่วง purple
  east: { default: '#475569', active: '#22c55e', hover: '#64748b', dimmed: '#14532d' },       // เขียว green
  south: { default: '#475569', active: '#f97316', hover: '#64748b', dimmed: '#7c2d12' },      // ส้ม orange
};

// Region label positions (lat, lng) - ตำแหน่งศูนย์กลางแต่ละภาค
const regionLabelPositions: Record<string, [number, number]> = {
  north: [99.0, 18.8],
  northeast: [103.5, 16.0],
  central: [100.2, 15.0],
  west: [99.0, 13.5],
  east: [102.0, 13.2],
  south: [99.5, 8.5],
};

export const ThailandMap = ({ 
  activeId, 
  onSelectRegion, 
  viewMode,
  selectedProvince
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
                const isOtherRegion = activeId && !isRegionActive;
                const colors = regionColors[regionId] || regionColors.central;
                
                // Province highlight logic
                const isSelectedProvince = selectedProvince && provinceName === selectedProvince.name;
                const isSameRegionAsSelected = selectedProvince && regionId === activeId;
                
                // Determine fill color
                let fillColor = colors.default;
                let opacity = 1;
                
                if (isProvinceView && activeId) {
                  if (isSelectedProvince) {
                    // Selected province - bright active color
                    fillColor = colors.active;
                    opacity = 1;
                  } else if (isSameRegionAsSelected && !isSelectedProvince) {
                    // Same region but not selected - dimmed version of active color
                    fillColor = colors.dimmed;
                    opacity = 0.9;
                  } else if (isRegionActive && !selectedProvince) {
                    // Region active but no province selected yet - all provinces bright
                    fillColor = colors.active;
                    opacity = 1;
                  } else if (isOtherRegion) {
                    // Other regions - gray out
                    fillColor = '#1e293b';
                    opacity = 0.4;
                  }
                } else if (isRegionActive) {
                  fillColor = colors.active;
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onSelectRegion(regionId)}
                    style={{
                      default: {
                        fill: fillColor,
                        stroke: isSelectedProvince ? '#fff' : (isRegionActive ? '#fff' : '#64748b'),
                        strokeWidth: isSelectedProvince ? 0.8 : 0.3,
                        outline: 'none',
                        opacity: opacity,
                        transition: 'all 0.3s ease',
                      },
                      hover: {
                        fill: isSelectedProvince ? fillColor : (isRegionActive ? colors.active : colors.hover),
                        stroke: '#fff',
                        strokeWidth: 0.5,
                        outline: 'none',
                        cursor: 'pointer',
                        opacity: isOtherRegion ? 0.5 : 1,
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

          {/* Region Labels - Using Annotation to stay fixed with map */}
          {viewMode !== 'province' && Object.entries(regionLabelPositions).map(([regionId, coords]) => (
            <Annotation
              key={regionId}
              subject={coords}
              dx={0}
              dy={0}
              connectorProps={{}}
            >
              <text
                textAnchor="middle"
                alignmentBaseline="middle"
                style={{
                  fontFamily: 'system-ui',
                  fontSize: '6px',
                  fontWeight: 'bold',
                  fill: activeId === regionId ? '#fff' : 'rgba(255,255,255,0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  pointerEvents: 'none',
                }}
              >
                {regionId === 'northeast' ? 'ISAN' : regionId.toUpperCase()}
              </text>
            </Annotation>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};
