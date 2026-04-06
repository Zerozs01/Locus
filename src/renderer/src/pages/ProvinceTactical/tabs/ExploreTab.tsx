import { 
  Zap,
  Camera,
  Thermometer,
  Wallet,
  Clock
} from 'lucide-react';
import { FlyToHandler, ProvinceData } from '../types';
import * as Helpers from '../components/HelperComponents';
import { useEffect, useState } from 'react';
import { WeatherHistoryModal } from '../../../components/WeatherHistoryModal';

interface ProvinceOverviewInfo {
  displayName: string;
  thaiName: string;
  regionCode: string;
  regionEngName: string;
  slogan: string;
  regionColor: string;
}

export const ExploreTab = ({ data, onFlyTo, provinceInfo }: { data: ProvinceData; onFlyTo?: FlyToHandler; provinceInfo?: ProvinceOverviewInfo }) => {
  const [currentSeason, setCurrentSeason] = useState<{name: string; months: string; description: string}>({ name: 'Season', months: '', description: '' });
  const [showWeatherHistory, setShowWeatherHistory] = useState(false);

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
      {/* Province Overview - ชื่อจังหวัด, N-SEC, คำขวัญ */}
      {provinceInfo && (
        <div className="rounded-xl bg-[#0a0c10] border border-white/10 overflow-hidden">
          <div className="p-5 flex flex-col gap-4">
            <div className="flex justify-between items-start gap-4">
              {/* Left Column: Title & Region */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-black text-white leading-tight truncate">
                  {provinceInfo.displayName}{' '}
                  <span className="text-slate-300 text-xl font-bold">{provinceInfo.thaiName}</span>
                </h1>
                <p className="text-sm mt-2 flex items-center gap-2 flex-wrap">
                  <span
                    className="px-2 py-0.5 text-xs font-mono rounded border"
                    style={{
                      color: provinceInfo.regionColor,
                      borderColor: `${provinceInfo.regionColor}50`,
                      backgroundColor: `${provinceInfo.regionColor}18`,
                    }}
                  >
                    {provinceInfo.regionCode}
                  </span>
                  <span className="text-slate-400">{provinceInfo.regionEngName} Region</span>
                </p>
              </div>
              
              {/* Right Column: Quick Stats */}
              <div className="flex flex-row gap-2 shrink-0">
                <Helpers.QuickBadge icon={<Thermometer size={16} />} value={data.weather.temp} label={data.weather.condition} color="amber" onClick={() => setShowWeatherHistory(true)} />
                <Helpers.QuickBadge icon={<Wallet size={16} />} value={data.dailyCost} label="avg/day" color="cyan" />
              </div>
            </div>
            
            {/* Bottom Row: Slogan & Current Season */}
            <div className="flex justify-between items-center gap-4 mt-1">
              <div className="flex-1 min-w-0">
                {provinceInfo.slogan && (
                  <p
                    className="text-[13px] italic leading-relaxed truncate opacity-90"
                    style={{ color: provinceInfo.regionColor }}
                    title={provinceInfo.slogan}
                  >
                    &ldquo;{provinceInfo.slogan}&rdquo;
                  </p>
                )}
              </div>
              
              {/* Current Season */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-violet-500/10 text-violet-400 border-violet-500/20 shrink-0">
                <Clock size={14} className="shrink-0" />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold leading-none truncate">Current: {currentSeason.name}</span>
                  <span className="text-[10px] opacity-70 mt-0.5 truncate">{currentSeason.months} • {currentSeason.description}</span>
                </div>
              </div>
            </div>
          </div>
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
