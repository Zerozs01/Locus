import { 
  Zap,
  Camera,
  Clock,
  Thermometer,
  Wallet
} from 'lucide-react';
import { FlyToHandler, ProvinceData } from '../types';
import * as Helpers from '../components/HelperComponents';

interface ProvinceOverviewInfo {
  displayName: string;
  thaiName: string;
  regionCode: string;
  regionEngName: string;
  slogan: string;
  regionColor: string;
}

export const ExploreTab = ({ data, onFlyTo, provinceInfo }: { data: ProvinceData; onFlyTo?: FlyToHandler; provinceInfo?: ProvinceOverviewInfo }) => (
  <div className="space-y-4">
    {/* Province Overview - ชื่อจังหวัด, N-SEC, คำขวัญ */}
    {provinceInfo && (
      <div className="rounded-xl bg-[#0a0c10] border border-white/10 overflow-hidden">
        <div className="p-5">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-black text-white leading-tight">
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
            
            {/* Quick Stats: Weather & Daily Cost */}
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <Helpers.QuickBadge icon={<Thermometer size={16} />} value={data.weather.temp} label={data.weather.condition} color="amber" />
              <Helpers.QuickBadge icon={<Wallet size={16} />} value={data.dailyCost} label="avg/day" color="cyan" />
            </div>
          </div>
          
          {provinceInfo.slogan && (
            <p
              className="text-sm mt-4 italic leading-relaxed"
              style={{ color: provinceInfo.regionColor }}
            >
              &ldquo;{provinceInfo.slogan}&rdquo;
            </p>
          )}
        </div>
      </div>
    )}

    <Helpers.ContentCard 
      title="Planning Priorities" 
      icon={<Zap size={18} />}
      color="amber"
      borderColor="amber"
    >
      <div className="grid grid-cols-2 gap-2">
        {data.activities.map((activity, idx) => (
          <Helpers.ActivityChip key={idx} name={activity.name} icon={activity.icon} />
        ))}
      </div>
    </Helpers.ContentCard>

    <Helpers.ContentCard 
      title="Season & Exposure" 
      icon={<Clock size={18} />}
      color="violet"
      borderColor="violet"
    >
      <div className="grid grid-cols-3 gap-2">
        {data.seasons.map((season, idx) => (
          <Helpers.SeasonCard key={idx} {...season} />
        ))}
      </div>
    </Helpers.ContentCard>

    <Helpers.ContentCard 
      title="Key Landmarks & Civic Nodes" 
      icon={<Camera size={18} />}
      color="teal"
      borderColor="teal"
    >
      <div className="space-y-3">
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
  </div>
);
