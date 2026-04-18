import { 
  Zap,
  Camera,
  Thermometer,
  Wallet,
  Clock,
  Wind
} from 'lucide-react';
import { FlyToHandler, ProvinceData } from '../types';
import * as Helpers from '../components/HelperComponents';
import { useEffect, useMemo, useState } from 'react';
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

export const ExploreTab = ({ data, onFlyTo, provinceInfo }: { data: ProvinceData; onFlyTo?: FlyToHandler; provinceInfo?: ProvinceOverviewInfo }) => {
  const [currentSeason, setCurrentSeason] = useState<{name: string; months: string; description: string}>({ name: 'Season', months: '', description: '' });
  const [showWeatherHistory, setShowWeatherHistory] = useState(false);

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
                <span className="text-slate-300 text-lg font-bold">{provinceInfo.thaiName}</span>
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
                <span className="text-xs font-bold text-white leading-none">{data.weather.temp}</span>
                <span className="text-[10px] font-medium text-white/75 leading-none tracking-wide uppercase px-1 border-l border-white/25 ml-0.5">{currentSeason.name}</span>
              </button>
              
              {/* Daily Cost */}
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border shrink-0 ${dailyCostColorClass}`}>
                <Wallet size={14} />
                <span className="text-xs font-bold leading-none">{data.dailyCost}</span>
              </div>
            </div>
          </div>
          
          {provinceInfo.slogan && (
            <p
              className="text-xs italic truncate opacity-90 leading-tight"
              style={{ color: provinceInfo.regionColor }}
              title={provinceInfo.slogan}
            >
              &ldquo;{provinceInfo.slogan}&rdquo;
            </p>
          )}
        </div>
      )}

      <Helpers.ContentCard 
        title="Planning Priorities" 
        icon={<Zap size={18} />}
        color="amber"
        borderColor="amber"
      >
        <div className="flex flex-wrap gap-2">
          {data.activities.map((activity, idx) => (
            <div key={idx} className="flex-1 min-w-[120px]">
              <Helpers.ActivityChip name={activity.name} icon={activity.icon} />
            </div>
          ))}
        </div>
      </Helpers.ContentCard>

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
    </div>
  );
};
