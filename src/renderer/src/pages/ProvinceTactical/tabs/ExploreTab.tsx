import { 
  Zap,
  Camera,
  Clock
} from 'lucide-react';
import { FlyToHandler, ProvinceData } from '../types';
import * as Helpers from '../components/HelperComponents';

export const ExploreTab = ({ data, onFlyTo }: { data: ProvinceData; onFlyTo?: FlyToHandler }) => (
  <div className="space-y-4">
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
