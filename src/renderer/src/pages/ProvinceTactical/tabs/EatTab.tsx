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


export const EatTab = ({ data, onFlyTo }: { data: ProvinceData; onFlyTo?: FlyToHandler }) => {
  const [showCafes, setShowCafes] = useState(false);
  const [showMalls, setShowMalls] = useState(false);
  const [showMarkets, setShowMarkets] = useState(false);

  return (
    <div className="space-y-4">
      {/* Local Must-Try Dishes */}
      <Helpers.ContentCard 
        title="Local Must-Try Dishes" 
        icon={<Utensils size={18} />}
        color="amber"
        borderColor="amber"
      >
        <div className="grid grid-cols-2 gap-2">
          {data.localDishes.map((dish, idx) => (
            <Helpers.DishCard key={idx} {...dish} />
          ))}
        </div>
      </Helpers.ContentCard>

      {/* Top Restaurants */}
      <Helpers.ContentCard 
        title="Top Restaurants" 
        icon={<Star size={18} />}
        color="rose"
        borderColor="rose"
      >
        <div className="space-y-2">
          {data.restaurants.map((item, idx) => (
            <Helpers.RestaurantCard key={idx} {...item} onFlyTo={onFlyTo} />
          ))}
        </div>
      </Helpers.ContentCard>

      {/* Shopping Malls - Toggle Default OFF */}
      <Helpers.CollapsibleSection
        title="Shopping Malls"
        icon={<Building2 size={18} />}
        highlightColor="cyan"
        isOpen={showMalls}
        onToggle={() => setShowMalls(!showMalls)}
        summary={`${data.malls.length} malls nearby`}
      >
        <div className="space-y-2">
          {data.malls.map((item, idx) => (
            <Helpers.MallCard key={idx} {...item} onFlyTo={onFlyTo} />
          ))}
        </div>
      </Helpers.CollapsibleSection>

      {/* Night Markets & Street Food - Toggle Default OFF */}
      <Helpers.CollapsibleSection
        title="Night Markets & Street Food"
        icon={<ShoppingBag size={18} />}
        highlightColor="violet"
        isOpen={showMarkets}
        onToggle={() => setShowMarkets(!showMarkets)}
        summary={`${data.nightMarkets.length} markets`}
      >
        <div className="space-y-2">
          {data.nightMarkets.map((item, idx) => (
            <Helpers.MarketCard key={idx} {...item} onFlyTo={onFlyTo} />
          ))}
        </div>
      </Helpers.CollapsibleSection>

      {/* Cafes & Coffee Shops - Toggle Default OFF */}
      <Helpers.CollapsibleSection
        title="Cafes & Coffee Shops"
        icon={<Coffee size={18} />}
        highlightColor="emerald"
        isOpen={showCafes}
        onToggle={() => setShowCafes(!showCafes)}
        summary={`${data.cafes.length} cafes with WiFi`}
      >
        <div className="space-y-2">
          {data.cafes.map((item, idx) => (
            <Helpers.CafeCard key={idx} {...item} onFlyTo={onFlyTo} />
          ))}
        </div>
      </Helpers.CollapsibleSection>
    </div>
  );
};