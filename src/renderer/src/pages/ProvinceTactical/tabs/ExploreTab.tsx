import { useState } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Shield, 
  Building2, 
  Utensils, 
  Car, 
  Plane,
  Bus,
  Train,
  AlertTriangle,
  ChevronRight,
  Star,
  Wallet,
  Loader2,
  Bed,
  Coffee,
  Camera,
  Navigation,
  Clock,
  Thermometer,
  Wifi,
  MapPinned,
  Hospital,
  GraduationCap,
  ShoppingBag,
  Zap,
  Landmark,
  Fuel,
  Pill,
  ExternalLink,
  Copy,
  ChevronDown,
  Crosshair
} from 'lucide-react';
import { FlyToHandler, ProvinceData } from '../types';
import { Province } from '../../data/regions';
import * as Helpers from '../components/HelperComponents';

export const ExploreTab = ({ data, onFlyTo }: { data: ProvinceData; onFlyTo?: FlyToHandler }) => (
  <div className="space-y-4">
    {/* Popular Activities - FIRST */}
    <Helpers.ContentCard 
      title="Popular Activities" 
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

    {/* Best Time to Visit - SECOND */}
    <Helpers.ContentCard 
      title="Best Time to Visit" 
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

    {/* Top Attractions - THIRD */}
    <Helpers.ContentCard 
      title="Top Attractions" 
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