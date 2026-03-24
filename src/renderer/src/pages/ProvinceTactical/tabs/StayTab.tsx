import { useState } from 'react';
import { 
  Bed,
  MapPinned
} from 'lucide-react';
import { FlyToHandler, ProvinceData } from '../types';
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
      <Helpers.CollapsibleSection
        title="Budget Stay / Rest Stops"
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

      <Helpers.CollapsibleSection
        title="Mid-Range Stay"
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

      <Helpers.CollapsibleSection
        title="Premium Stay"
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

      <Helpers.CollapsibleSection
        title="Basecamp-Friendly Areas"
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
