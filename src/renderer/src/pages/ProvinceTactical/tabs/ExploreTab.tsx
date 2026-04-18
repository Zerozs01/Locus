import { 
  Map,
  Layers,
  Camera,
  Thermometer,
  Wallet,
  Wind
} from 'lucide-react';
import { FlyToHandler, ProvinceData } from '../types';
import * as Helpers from '../components/HelperComponents';
import { type SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { WeatherHistoryModal } from '../../../components/WeatherHistoryModal';

interface ProvinceOverviewInfo {
  displayName: string;
  thaiName: string;
  regionId: string;
  regionCode: string;
  regionEngName: string;
  slogan: string;
  regionColor: string;
}

type ProvinceMapTheme = 'voyager' | 'positron' | 'dark' | 'osm' | 'satellite' | 'admin' | 'terrain';
type ProvinceDataLayer = 'traffic' | 'gistdaAqi' | 'aqicnAqi' | 'rainRadar' | 'landParcel' | 'evCharger' | 'slope';

interface ExploreTabProps {
  data: ProvinceData;
  onFlyTo?: FlyToHandler;
  provinceInfo?: ProvinceOverviewInfo;
  mapTheme?: ProvinceMapTheme;
  mapDataLayers?: Record<ProvinceDataLayer, boolean>;
  onChangeMapTheme?: (theme: ProvinceMapTheme) => void;
  onToggleDataLayer?: (layer: ProvinceDataLayer) => void;
}

export const ExploreTab = ({
  data,
  onFlyTo,
  provinceInfo,
  mapTheme = 'voyager',
  mapDataLayers,
  onChangeMapTheme,
  onToggleDataLayer,
}: ExploreTabProps) => {
  const [currentSeason, setCurrentSeason] = useState<{name: string; months: string; description: string}>({ name: 'Season', months: '', description: '' });
  const [showWeatherHistory, setShowWeatherHistory] = useState(false);
  const [showSloganPopup, setShowSloganPopup] = useState(false);
  const [mapControlMode, setMapControlMode] = useState<'map' | 'layers'>('map');

  const aqiLevelLabel = useMemo(() => {
    const aqi = Number(data.weather.aqi);
    if (!Number.isFinite(aqi)) return 'ไม่ทราบระดับ';
    if (aqi <= 50) return 'คุณภาพดี (Good)';
    if (aqi <= 100) return 'ปานกลาง (Moderate)';
    if (aqi <= 150) return 'มีผลต่อกลุ่มเสี่ยง';
    if (aqi <= 200) return 'ไม่ดีต่อสุขภาพ';
    return 'อันตราย (Hazardous)';
  }, [data.weather.aqi]);

  const dailyCostClassByRegion: Record<string, string> = {
    north: 'bg-violet-500/12 border-violet-400/35 text-violet-300',
    northeast: 'bg-rose-500/12 border-rose-400/35 text-rose-300',
    central: 'bg-amber-500/12 border-amber-400/35 text-amber-300',
    west: 'bg-emerald-500/12 border-emerald-400/35 text-emerald-300',
    east: 'bg-yellow-500/12 border-yellow-400/35 text-yellow-300',
    south: 'bg-sky-500/12 border-sky-400/35 text-sky-300',
  };

  const dailyCostColorClass = provinceInfo
    ? (dailyCostClassByRegion[provinceInfo.regionId] || 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400')
    : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400';

  const makePreviewSvg = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  const previewLightMap = makePreviewSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120"><rect width="320" height="120" fill="#eef2f5"/><path d="M0 90 L320 30" stroke="#ffffff" stroke-width="18"/><path d="M40 0 L280 120" stroke="#dbe2e8" stroke-width="10"/><path d="M10 55 L310 60" stroke="#cfd8df" stroke-width="6"/><path d="M80 15 L85 110" stroke="#e5e7eb" stroke-width="4"/><path d="M220 10 L210 110" stroke="#e5e7eb" stroke-width="4"/></svg>');
  const previewRoadMap = makePreviewSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120"><rect width="320" height="120" fill="#e9eef4"/><path d="M0 94 L320 26" stroke="#ffffff" stroke-width="20"/><path d="M0 94 L320 26" stroke="#f59e0b" stroke-width="4" stroke-dasharray="10 8"/><path d="M36 8 L290 114" stroke="#dbe2e8" stroke-width="10"/><path d="M36 8 L290 114" stroke="#3b82f6" stroke-width="2" stroke-dasharray="7 6"/><path d="M8 62 L312 58" stroke="#cbd5e1" stroke-width="6"/></svg>');
  const previewDarkMap = makePreviewSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120"><rect width="320" height="120" fill="#111827"/><path d="M0 92 L320 28" stroke="#334155" stroke-width="16"/><path d="M30 8 L290 112" stroke="#1f2937" stroke-width="10"/><path d="M0 60 L320 64" stroke="#475569" stroke-width="5"/><path d="M82 10 L86 112" stroke="#0f172a" stroke-width="4"/><path d="M235 10 L222 112" stroke="#0f172a" stroke-width="4"/></svg>');
  const previewClassicMap = makePreviewSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120"><rect width="320" height="120" fill="#dbe8d5"/><path d="M0 95 L320 35" stroke="#f8fafc" stroke-width="18"/><path d="M25 5 L295 115" stroke="#e2e8f0" stroke-width="11"/><path d="M0 58 L320 62" stroke="#cbd5e1" stroke-width="6"/><path d="M90 8 L95 110" stroke="#e5e7eb" stroke-width="4"/><path d="M245 8 L232 110" stroke="#e5e7eb" stroke-width="4"/></svg>');
  const previewAdminMap = makePreviewSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120"><rect width="320" height="120" fill="#eceff3"/><path d="M12 12 L140 20 L162 48 L110 100 L20 92 Z" fill="#dce3ea" stroke="#94a3b8" stroke-width="2"/><path d="M168 16 L304 14 L292 52 L305 100 L188 108 L162 72 Z" fill="#dce3ea" stroke="#94a3b8" stroke-width="2"/><path d="M140 20 L168 16 L162 72 L110 100" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="4 4"/></svg>');
  const previewTraffic = makePreviewSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120"><rect width="320" height="120" fill="#eef2f6"/><path d="M0 90 L320 30" stroke="#ffffff" stroke-width="18"/><path d="M20 12 L300 108" stroke="#d7dee6" stroke-width="10"/><path d="M8 60 L312 60" stroke="#cad4df" stroke-width="6"/><g stroke-width="4" fill="none" stroke-linecap="round"><path d="M24 88 L130 62" stroke="#16a34a"/><path d="M132 62 L206 46" stroke="#f59e0b"/><path d="M208 46 L300 28" stroke="#dc2626"/><path d="M26 14 L98 40" stroke="#22c55e"/><path d="M100 40 L176 66" stroke="#eab308"/><path d="M178 66 L282 102" stroke="#ef4444"/></g></svg>');
  const previewRainRadar = makePreviewSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120"><rect width="320" height="120" fill="#101827"/><path d="M0 95 L320 28" stroke="#1f2937" stroke-width="18"/><path d="M22 10 L300 112" stroke="#172554" stroke-width="10"/><g opacity="0.9"><circle cx="82" cy="56" r="30" fill="#2563eb"/><circle cx="82" cy="56" r="20" fill="#06b6d4"/><circle cx="82" cy="56" r="11" fill="#4ade80"/><circle cx="174" cy="38" r="24" fill="#0ea5e9"/><circle cx="174" cy="38" r="14" fill="#22c55e"/><circle cx="246" cy="74" r="32" fill="#0284c7"/><circle cx="246" cy="74" r="21" fill="#14b8a6"/><circle cx="246" cy="74" r="12" fill="#84cc16"/></g></svg>');
  const previewLandParcel = makePreviewSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120"><rect width="320" height="120" fill="#eef2f7"/><path d="M0 92 L320 38" stroke="#f8fafc" stroke-width="16"/><g stroke="#ef4444" stroke-width="2" opacity="0.9"><path d="M10 15 L10 110 M52 15 L52 110 M94 15 L94 110 M136 15 L136 110 M178 15 L178 110 M220 15 L220 110 M262 15 L262 110 M304 15 L304 110"/><path d="M5 20 L315 20 M5 45 L315 45 M5 70 L315 70 M5 95 L315 95"/></g></svg>');
  const previewEvCharger = makePreviewSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120"><rect width="320" height="120" fill="#0b1220"/><path d="M0 92 L320 34" stroke="#1f2937" stroke-width="14"/><path d="M40 16 L84 46 L62 98 L22 68 Z" fill="#14532d" opacity="0.55"/><path d="M210 12 L278 34 L248 104 L178 82 Z" fill="#166534" opacity="0.55"/><g fill="#22c55e" stroke="#dcfce7" stroke-width="2"><circle cx="72" cy="52" r="10"/><circle cx="140" cy="30" r="10"/><circle cx="205" cy="76" r="10"/><circle cx="274" cy="58" r="10"/></g><g fill="#ecfccb" font-size="10" font-family="Arial, sans-serif" font-weight="700"><text x="65" y="56">EV</text><text x="133" y="34">EV</text><text x="198" y="80">EV</text><text x="267" y="62">EV</text></g></svg>');

  const applyPreviewFallback = (event: SyntheticEvent<HTMLImageElement>, fallbackImage: string) => {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied === '1') return;
    image.dataset.fallbackApplied = '1';
    image.src = fallbackImage;
  };

  const mapStyleOptions: Array<{ id: ProvinceMapTheme; label: string; previewImage: string; fallbackImage?: string }> = [
    { id: 'voyager', label: 'ถนน', previewImage: previewRoadMap },
    { id: 'positron', label: 'สว่าง', previewImage: previewLightMap },
    { id: 'dark', label: 'กลางคืน', previewImage: previewDarkMap },
    { id: 'osm', label: 'คลาสสิก', previewImage: previewClassicMap },
    { id: 'satellite', label: 'ดาวเทียม (ไทยโชต)', previewImage: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/14/7025/13090', fallbackImage: previewRoadMap },
    { id: 'admin', label: 'เขตการปกครอง', previewImage: previewAdminMap },
    { id: 'terrain', label: 'ภูมิประเทศ', previewImage: 'https://a.tile.opentopomap.org/14/13090/7025.png', fallbackImage: previewClassicMap },
  ];

  const mapLayerOptions: Array<{ id: ProvinceDataLayer; label: string; previewImage: string; fallbackImage?: string }> = [
    { id: 'traffic', label: 'จราจร', previewImage: previewTraffic },
    { id: 'gistdaAqi', label: 'คุณภาพอากาศ (GISTDA)', previewImage: 'https://a.basemaps.cartocdn.com/light_all/5/26/13.png' },
    { id: 'aqicnAqi', label: 'ดัชนีคุณภาพอากาศ (AQICN)', previewImage: 'https://tiles.waqi.info/tiles/usepa-aqi/5/26/13.png?token=demo', fallbackImage: previewLightMap },
    { id: 'rainRadar', label: 'เรดาร์ตรวจฝน', previewImage: previewRainRadar },
    { id: 'landParcel', label: 'แปลงที่ดิน', previewImage: previewLandParcel },
    { id: 'evCharger', label: 'จุดชาร์จรถไฟฟ้า', previewImage: previewEvCharger },
    { id: 'slope', label: 'พื้นที่ลาดชัน', previewImage: 'https://a.tile.opentopomap.org/14/13090/7025.png', fallbackImage: previewClassicMap },
  ];

  useEffect(() => {
    // Thailand seasonal cycle: Nov-Feb cool, Mar-May hot, Jun-Oct rainy
    const month = new Date().getMonth();
    let seasonKey: 'Cool' | 'Hot' | 'Rainy' = 'Cool';

    if (month >= 2 && month <= 4) seasonKey = 'Hot';
    if (month >= 5 && month <= 9) seasonKey = 'Rainy';

    const found = data.seasons.find((s) => s.name.toLowerCase().includes(seasonKey.toLowerCase()));
    if (found) {
      setCurrentSeason({ name: found.name, months: found.months, description: found.description });
    } else if (data.seasons.length > 0) {
      setCurrentSeason({ name: data.seasons[0].name, months: data.seasons[0].months, description: data.seasons[0].description });
    }
  }, [data]);

  return (
    <div className="space-y-4">
      {provinceInfo && (
        <div className="rounded-xl bg-[#0a0c10] border border-white/10 p-3 flex flex-col gap-1.5 overflow-hidden">
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-baseline gap-2 min-w-0 flex-1">
              <h1 className="text-xl font-black text-white truncate leading-none">
                {provinceInfo.displayName}{' '}
                {provinceInfo.slogan ? (
                  <button
                    type="button"
                    onClick={() => setShowSloganPopup(true)}
                    className="text-slate-300 text-lg font-bold hover:text-amber-200 transition-colors underline decoration-dotted underline-offset-4"
                    title="ดูคำขวัญจังหวัด"
                  >
                    {provinceInfo.thaiName}
                  </button>
                ) : (
                  <span className="text-slate-300 text-lg font-bold">{provinceInfo.thaiName}</span>
                )}
              </h1>
              <span
                className="px-1.5 py-0.5 text-[10px] font-mono rounded border shrink-0 leading-none"
                style={{
                  color: provinceInfo.regionColor,
                  borderColor: `${provinceInfo.regionColor}50`,
                  backgroundColor: `${provinceInfo.regionColor}18`,
                }}
              >
                {provinceInfo.regionCode}
              </span>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              {/* AQI Badge */}
              {data.weather.aqi !== undefined && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border shrink-0 bg-black/70 border-amber-400/35 text-amber-300">
                  <Wind size={14} className="text-amber-300" />
                  <div className="text-left leading-tight">
                    <div className="text-xs font-bold">AQI {data.weather.aqi}</div>
                    <div className="text-[10px] text-amber-200/85">{aqiLevelLabel}</div>
                  </div>
                </div>
              )}
              
              {/* Temperature + Season Combined */}
              <button 
                onClick={() => setShowWeatherHistory(true)} 
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 border border-white/35 text-white hover:bg-black/85 transition-colors shrink-0"
              >
                <Thermometer size={14} className="text-amber-300" />
                <div className="text-left leading-tight">
                  <div className="text-xs font-bold text-white leading-none">{data.weather.temp}</div>
                  <div className="text-[10px] font-medium text-white/75 tracking-wide uppercase">{currentSeason.name}</div>
                </div>
              </button>
              
              {/* Daily Cost */}
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border shrink-0 ${dailyCostColorClass}`}>
                <Wallet size={14} />
                <span className="text-xs font-bold leading-none">{data.dailyCost}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl bg-[#0a0c10] border-2 border-cyan-500/40 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="inline-flex rounded-xl border border-white/15 bg-black/35 p-1">
            <button
              onClick={() => setMapControlMode('map')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                mapControlMode === 'map'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <Map size={14} />
                แผนที่
              </span>
            </button>
            <button
              onClick={() => setMapControlMode('layers')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                mapControlMode === 'layers'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <Layers size={14} />
                ชั้นข้อมูล
              </span>
            </button>
          </div>
          <span className="hidden sm:block text-[11px] text-slate-400">เลือกโหมดแผนที่แบบ Longdo</span>
        </div>

        <div className="p-4 space-y-3">

          {mapControlMode === 'map' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mapStyleOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onChangeMapTheme?.(option.id)}
                  className={`p-2 rounded-lg border text-xs font-semibold transition-colors text-left ${
                    mapTheme === option.id
                      ? 'bg-cyan-500/20 border-cyan-400/45 text-cyan-200'
                      : 'bg-black/35 border-white/15 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <img
                    src={option.previewImage}
                    alt={option.label}
                    loading="lazy"
                    onError={(event) => applyPreviewFallback(event, option.fallbackImage || previewLightMap)}
                    className="h-12 w-full rounded-md border border-white/20 object-cover"
                  />
                  <div className="mt-2 truncate">{option.label}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mapLayerOptions.map((option) => {
                const isEnabled = mapDataLayers ? !!mapDataLayers[option.id] : false;
                return (
                  <button
                    key={option.id}
                    onClick={() => onToggleDataLayer?.(option.id)}
                    className={`p-2 rounded-lg border text-xs font-semibold transition-colors text-left ${
                      isEnabled
                        ? 'bg-amber-500/20 border-amber-400/45 text-amber-200'
                        : 'bg-black/35 border-white/15 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <img
                      src={option.previewImage}
                      alt={option.label}
                      loading="lazy"
                      onError={(event) => applyPreviewFallback(event, option.fallbackImage || previewLightMap)}
                      className="h-12 w-full rounded-md border border-white/20 object-cover"
                    />
                    <div className="mt-2 truncate">{option.label}</div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Helpers.ContentCard 
        title="Key Landmarks & Civic Nodes" 
        icon={<Camera size={18} />}
        color="teal"
        borderColor="teal"
      >
        <div className="space-y-2">
          {data.attractions.map((item, idx) => (
            <Helpers.PlaceCard 
              key={idx}
              rank={idx + 1}
              name={item.name}
              type={item.type}
              rating={item.rating}
              description={item.description}
              openHours={item.openHours}
              price={item.price}
              coordinates={item.coordinates}
              onFlyTo={onFlyTo}
            />
          ))}
        </div>
      </Helpers.ContentCard>

      {/* Weather History Modal */}
      {provinceInfo && (
          <WeatherHistoryModal 
            isOpen={showWeatherHistory}
            onClose={() => setShowWeatherHistory(false)}
            provinceName={provinceInfo.displayName}
            provinces={[{ id: provinceInfo.displayName, name: provinceInfo.displayName }]}
          />
      )}

      {/* Province Slogan Popup */}
      {provinceInfo?.slogan && showSloganPopup && (
        <div
          className="fixed inset-0 z-[1500] bg-black/55 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={() => setShowSloganPopup(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-amber-400/30 bg-[#0b0e14] p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <h3 className="text-sm font-bold text-amber-200">
                คำขวัญจังหวัด {provinceInfo.thaiName}
              </h3>
              <button
                type="button"
                onClick={() => setShowSloganPopup(false)}
                className="px-2 py-1 text-xs font-semibold rounded-md border border-white/15 text-slate-200 hover:bg-white/10"
              >
                ปิด
              </button>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              &ldquo;{provinceInfo.slogan}&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
