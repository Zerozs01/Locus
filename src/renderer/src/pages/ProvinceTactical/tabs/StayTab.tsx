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


export const StayTab = ({ data, onFlyTo }: { data: ProvinceData; onFlyTo?: FlyToHandler }) => {
  const [openSections, setOpenSections] = useState({
    budget: true,      // default ON
    midRange: false,   // default OFF
    luxury: false,     // default OFF
    areas: true,       // default ON
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Calculate price ranges for summary
  const getPriceRange = (items: Array<{ price: string }>) => {
    if (items.length === 0) return 'N/A';
    const prices = items.map(i => i.price);
    return `${prices[0].split('-')[0]} - ${prices[prices.length - 1].split('-')[1] || prices[prices.length - 1]}`;
  };

  return (
    <div className="space-y-4">
      {/* Budget Friendly - Default OPEN */}
      <Helpers.CollapsibleSection
        title="Budget Friendly"
        icon={<Bed size={18} />}
        badge="฿"
        highlightColor="emerald"
        isOpen={openSections.budget}
        onToggle={() => toggleSection('budget')}
        summary={`${data.accommodation.budget.length} options • ${getPriceRange(data.accommodation.budget)}`}
      >
        <div className="space-y-2">
          {data.accommodation.budget.map((item, idx) => (
            <Helpers.AccommodationCard key={idx} {...item} onFlyTo={onFlyTo} />
          ))}
        </div>
      </Helpers.CollapsibleSection>

      {/* Mid-Range - Default CLOSED */}
      <Helpers.CollapsibleSection
        title="Mid-Range"
        icon={<Bed size={18} />}
        badge="฿฿"
        highlightColor="blue"
        isOpen={openSections.midRange}
        onToggle={() => toggleSection('midRange')}
        summary={`${data.accommodation.midRange.length} options • ${getPriceRange(data.accommodation.midRange)}`}
      >
        <div className="space-y-2">
          {data.accommodation.midRange.map((item, idx) => (
            <Helpers.AccommodationCard key={idx} {...item} onFlyTo={onFlyTo} />
          ))}
        </div>
      </Helpers.CollapsibleSection>

      {/* Luxury - Default CLOSED */}
      <Helpers.CollapsibleSection
        title="Luxury"
        icon={<Bed size={18} />}
        badge="฿฿฿"
        highlightColor="violet"
        isOpen={openSections.luxury}
        onToggle={() => toggleSection('luxury')}
        summary={`${data.accommodation.luxury.length} options • ${getPriceRange(data.accommodation.luxury)}`}
      >
        <div className="space-y-2">
          {data.accommodation.luxury.map((item, idx) => (
            <Helpers.AccommodationCard key={idx} {...item} onFlyTo={onFlyTo} />
          ))}
        </div>
      </Helpers.CollapsibleSection>

      {/* Best Areas to Stay - Default OPEN */}
      <Helpers.CollapsibleSection
        title="Best Areas to Stay"
        icon={<MapPinned size={18} />}
        highlightColor="cyan"
        isOpen={openSections.areas}
        onToggle={() => toggleSection('areas')}
        summary={`${data.stayAreas.length} recommended areas`}
      >
        <div className="space-y-2">
          {data.stayAreas.map((area, idx) => (
            <Helpers.AreaCard key={idx} {...area} onFlyTo={onFlyTo} />
          ))}
        </div>
      </Helpers.CollapsibleSection>
    </div>
  );
};