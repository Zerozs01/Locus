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

export const TravelTab = ({ data, onFlyTo }: { data: ProvinceData; onFlyTo?: FlyToHandler }) => {
  const [showBanks, setShowBanks] = useState(false);

  return (
    <div className="space-y-4">
      {/* Getting Around - FIRST with border highlight */}
      <Helpers.ContentCard 
        title="Getting Around" 
        icon={<Car size={18} />}
        color="cyan"
        borderColor="cyan"
      >
        <div className="grid grid-cols-2 gap-2">
          {data.gettingAround.map((item, idx) => (
            <Helpers.LocalTransportCard key={idx} {...item} />
          ))}
        </div>
      </Helpers.ContentCard>

      {/* Gas Stations - with border highlight */}
      <Helpers.ContentCard 
        title="Gas Stations" 
        icon={<Fuel size={18} />}
        color="amber"
        borderColor="amber"
        badge={`${data.gasStations.filter(g => g.is24h).length} open 24h`}
      >
        <div className="space-y-2">
          {data.gasStations.map((item, idx) => (
            <Helpers.GasStationCard key={idx} {...item} onFlyTo={onFlyTo} />
          ))}
        </div>
      </Helpers.ContentCard>

      {/* Banks & ATM - Toggle Default OFF */}
      <Helpers.CollapsibleSection
        title="Banks & ATM"
        icon={<Landmark size={18} />}
        highlightColor="blue"
        isOpen={showBanks}
        onToggle={() => setShowBanks(!showBanks)}
        summary={`${data.banks.length} locations nearby`}
      >
        <div className="space-y-2">
          {data.banks.map((item, idx) => (
            <Helpers.BankCard key={idx} {...item} onFlyTo={onFlyTo} />
          ))}
        </div>
      </Helpers.CollapsibleSection>

      {/* Info Note */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-3">
          <Navigation size={20} className="text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-white text-sm">Route Planning</h4>
            <p className="text-xs text-slate-400 mt-1">
              Select a destination on the map to see detailed travel options, estimated costs, and journey times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
