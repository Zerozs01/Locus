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
import { FlyToHandler } from '../types';


export const QuickBadge = ({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) => {
  const colors: Record<string, string> = {
    amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${colors[color]}`}>
      {icon}
      <span className="font-bold">{value}</span>
      <span className="text-xs opacity-70">{label}</span>
    </div>
  );
};

export const ContentCard = ({ 
  title, 
  icon, 
  children, 
  color = 'cyan',
  badge,
  borderColor
}: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
  color?: string;
  badge?: string;
  borderColor?: 'amber' | 'violet' | 'teal' | 'rose' | 'emerald' | 'blue' | 'cyan';
}) => {
  const textColors: Record<string, string> = {
    teal: 'text-teal-400',
    amber: 'text-amber-400',
    violet: 'text-violet-400',
    blue: 'text-blue-400',
    red: 'text-red-400',
    emerald: 'text-emerald-400',
    cyan: 'text-cyan-400',
    rose: 'text-rose-400',
  };
  
  const borderColors: Record<string, string> = {
    teal: 'border-teal-500/40',
    amber: 'border-amber-500/40',
    violet: 'border-violet-500/40',
    blue: 'border-blue-500/40',
    emerald: 'border-emerald-500/40',
    cyan: 'border-cyan-500/40',
    rose: 'border-rose-500/40',
  };

  return (
    <div className={`rounded-xl bg-[#0a0c10] ${borderColor ? `border-2 ${borderColors[borderColor]}` : 'border border-white/5'} overflow-hidden`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className={textColors[color]}>{icon}</span>
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
        {badge && (
          <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-1 rounded">{badge}</span>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

// Collapsible Section Component for Stay Tab
export const CollapsibleSection = ({ 
  title, 
  icon, 
  children, 
  highlightColor,
  badge,
  isOpen,
  onToggle,
  summary
}: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
  highlightColor: 'emerald' | 'blue' | 'violet' | 'cyan';
  badge?: string;
  isOpen: boolean;
  onToggle: () => void;
  summary: string;
}) => {
  const borderColors: Record<string, string> = {
    emerald: 'border-emerald-500/40',
    blue: 'border-blue-500/40',
    violet: 'border-violet-500/40',
    cyan: 'border-cyan-500/40',
  };
  
  const textColors: Record<string, string> = {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    violet: 'text-violet-400',
    cyan: 'text-cyan-400',
  };

  const bgColors: Record<string, string> = {
    emerald: 'bg-emerald-500/10',
    blue: 'bg-blue-500/10',
    violet: 'bg-violet-500/10',
    cyan: 'bg-cyan-500/10',
  };

  const badgeColors: Record<string, string> = {
    emerald: 'bg-emerald-500/20 text-emerald-400',
    blue: 'bg-blue-500/20 text-blue-400',
    violet: 'bg-violet-500/20 text-violet-400',
    cyan: 'bg-cyan-500/20 text-cyan-400',
  };

  return (
    <div className={`rounded-xl bg-[#0a0c10] border-2 ${borderColors[highlightColor]} overflow-hidden transition-all`}>
      {/* Header - Always visible & clickable */}
      <button 
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3 ${isOpen ? bgColors[highlightColor] : 'bg-white/[0.02]'} transition-colors hover:bg-white/[0.05]`}
      >
        <div className="flex items-center gap-3">
          <span className={textColors[highlightColor]}>{icon}</span>
          <h3 className="font-semibold text-white">{title}</h3>
          {badge && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${badgeColors[highlightColor]}`}>{badge}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Summary shown when collapsed */}
          {!isOpen && (
            <span className="text-xs text-slate-400">{summary}</span>
          )}
          <ChevronDown 
            size={18} 
            className={`${textColors[highlightColor]} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </button>
      
      {/* Content - Collapsible */}
      {isOpen && (
        <div className="p-4 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

export const PlaceCard = ({ rank, name, type, rating, description, openHours, price, coordinates, onFlyTo }: {
  rank: number;
  name: string;
  type: string;
  rating: number;
  description?: string;
  openHours?: string;
  price?: string;
  coordinates?: { lat: number; lng: number };
  onFlyTo?: FlyToHandler;
}) => {
  const handleFlyTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coordinates && onFlyTo) {
      onFlyTo(coordinates.lat, coordinates.lng, name);
    }
  };

  return (
    <div className="flex gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
      <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-sm flex-shrink-0">
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-white truncate">{name}</h4>
          <div className="flex items-center gap-2">
            {/* Fly-to button */}
            {coordinates && onFlyTo && (
              <button
                onClick={handleFlyTo}
                className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110 active:scale-95"
                title={`Fly to ${name} on map`}
              >
                <Crosshair size={14} />
              </button>
            )}
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={12} fill="currentColor" />
              <span className="text-xs font-medium">{rating}</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500">{type}</p>
        {description && <p className="text-xs text-slate-400 mt-1 line-clamp-2">{description}</p>}
        <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
          {openHours && <span className="flex items-center gap-1"><Clock size={10} /> {openHours}</span>}
          {price && <span className="text-emerald-400">{price}</span>}
        </div>
      </div>
      <ChevronRight size={16} className="text-slate-600 group-hover:text-teal-400 transition-colors self-center" />
    </div>
  );
};

export const ActivityChip = ({ name, icon }: { name: string; icon: string }) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors">
    <span className="text-lg">{icon}</span>
    <span className="text-sm text-slate-300">{name}</span>
  </div>
);

export const SeasonCard = ({ name, months, rating, description }: { name: string; months: string; rating: 'best' | 'good' | 'avoid'; description: string }) => {
  const ratingColors = {
    best: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
    good: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
    avoid: 'bg-red-500/20 border-red-500/30 text-red-400',
  };
  return (
    <div className={`p-3 rounded-lg border ${ratingColors[rating]}`}>
      <div className="font-medium text-white text-sm">{name}</div>
      <div className="text-xs opacity-70 mb-1">{months}</div>
      <div className="text-xs mt-1">{description}</div>
    </div>
  );
};

export const AccommodationCard = ({ name, price, rating, area, coordinates, onFlyTo }: { 
  name: string; price: string; rating: number; area: string; coordinates?: { lat: number; lng: number }; onFlyTo?: FlyToHandler 
}) => {
  const handleFlyTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coordinates && onFlyTo) {
      onFlyTo(coordinates.lat, coordinates.lng, name);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
      <div>
        <h4 className="font-medium text-white text-sm">{name}</h4>
        <p className="text-xs text-slate-500">{area}</p>
      </div>
      <div className="flex items-center gap-2">
        {coordinates && onFlyTo && (
          <button
            onClick={handleFlyTo}
            className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
            title={`Fly to ${name} on map`}
          >
            <Crosshair size={14} />
          </button>
        )}
        <div className="text-right">
          <div className="text-emerald-400 font-semibold text-sm">{price}</div>
          <div className="flex items-center gap-1 text-amber-400 text-xs">
            <Star size={10} fill="currentColor" />
            {rating}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AreaCard = ({ name, description, forWho, coordinates, onFlyTo }: { 
  name: string; description: string; forWho: string; coordinates?: { lat: number; lng: number }; onFlyTo?: FlyToHandler 
}) => {
  const handleFlyTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coordinates && onFlyTo) {
      onFlyTo(coordinates.lat, coordinates.lng, name);
    }
  };

  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 group">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-medium text-white text-sm">{name}</h4>
        <div className="flex items-center gap-2">
          {coordinates && onFlyTo && (
            <button
              onClick={handleFlyTo}
              className="p-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
              title={`Fly to ${name} on map`}
            >
              <Crosshair size={12} />
            </button>
          )}
          <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">{forWho}</span>
        </div>
      </div>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
};

export const DishCard = ({ name, description, price }: { name: string; description: string; price: string }) => (
  <div className="p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
    <h4 className="font-medium text-white text-sm">{name}</h4>
    <p className="text-xs text-slate-500 mt-0.5">{description}</p>
    <p className="text-xs text-amber-400 mt-1">{price}</p>
  </div>
);

export const RestaurantCard = ({ name, cuisine, price, rating, specialty, coordinates, onFlyTo }: { 
  name: string; cuisine: string; price: string; rating: number; specialty?: string; coordinates?: { lat: number; lng: number }; onFlyTo?: FlyToHandler 
}) => {
  const handleFlyTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coordinates && onFlyTo) {
      onFlyTo(coordinates.lat, coordinates.lng, name);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
      <div>
        <h4 className="font-medium text-white text-sm">{name}</h4>
        <p className="text-xs text-slate-500">{cuisine} • {price}</p>
        {specialty && <p className="text-xs text-amber-400 mt-0.5">Try: {specialty}</p>}
      </div>
      <div className="flex items-center gap-2">
        {coordinates && onFlyTo && (
          <button
            onClick={handleFlyTo}
            className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
            title={`Fly to ${name} on map`}
          >
            <Crosshair size={14} />
          </button>
        )}
        <div className="flex items-center gap-1 text-amber-400">
          <Star size={12} fill="currentColor" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export const CafeCard = ({ name, vibe, wifi, specialty, coordinates, onFlyTo }: { 
  name: string; vibe: string; wifi: boolean; specialty: string; coordinates?: { lat: number; lng: number }; onFlyTo?: FlyToHandler 
}) => {
  const handleFlyTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coordinates && onFlyTo) {
      onFlyTo(coordinates.lat, coordinates.lng, name);
    }
  };

  return (
    <div className="p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-white text-sm">{name}</h4>
        <div className="flex items-center gap-2">
          {coordinates && onFlyTo && (
            <button
              onClick={handleFlyTo}
              className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
              title={`Fly to ${name} on map`}
            >
              <Crosshair size={14} />
            </button>
          )}
          {wifi && <Wifi size={14} className="text-emerald-400" />}
        </div>
      </div>
      <p className="text-xs text-slate-500">{vibe}</p>
      <p className="text-xs text-amber-400 mt-1">☕ {specialty}</p>
    </div>
  );
};

export const MarketCard = ({ name, openHours, bestFor, coordinates, onFlyTo }: { 
  name: string; openHours: string; bestFor: string; coordinates?: { lat: number; lng: number }; onFlyTo?: FlyToHandler 
}) => {
  const handleFlyTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coordinates && onFlyTo) {
      onFlyTo(coordinates.lat, coordinates.lng, name);
    }
  };

  return (
    <div className="p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-white text-sm">{name}</h4>
        {coordinates && onFlyTo && (
          <button
            onClick={handleFlyTo}
            className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
            title={`Fly to ${name} on map`}
          >
            <Crosshair size={14} />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={10} /> {openHours}</span>
      </div>
      <p className="text-xs text-violet-400 mt-1">{bestFor}</p>
    </div>
  );
};

// MallCard for Shopping Malls
export const MallCard = ({ name, address, openHours, features, coordinates, onFlyTo }: { 
  name: string; address: string; openHours: string; features: string[]; coordinates?: { lat: number; lng: number }; onFlyTo?: FlyToHandler 
}) => {
  const handleFlyTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coordinates && onFlyTo) {
      onFlyTo(coordinates.lat, coordinates.lng, name);
    }
  };

  return (
    <div className="p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-white text-sm">{name}</h4>
        {coordinates && onFlyTo && (
          <button
            onClick={handleFlyTo}
            className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
            title={`Fly to ${name} on map`}
          >
            <Crosshair size={14} />
          </button>
        )}
      </div>
      <p className="text-xs text-slate-500 mt-0.5">{address}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={10} /> {openHours}</span>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {features.map((feature, i) => (
          <span key={i} className="px-1.5 py-0.5 text-xs bg-cyan-500/10 text-cyan-400 rounded">{feature}</span>
        ))}
      </div>
    </div>
  );
};

export const LocalTransportCard = ({ name, price, description, icon }: { name: string; price: string; description: string; icon: React.ReactNode }) => (
  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
        {icon}
      </div>
      <h4 className="font-medium text-white text-sm">{name}</h4>
    </div>
    <p className="text-xs text-slate-400">{description}</p>
    <p className="text-xs text-emerald-400 mt-1">{price}</p>
  </div>
);

export const EmergencyCard = ({ label, number }: { label: string; number: string }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
    <span className="text-sm text-slate-300">{label}</span>
    <span className="text-lg font-bold text-red-400 font-mono">{number}</span>
  </div>
);

// Local Emergency Contact Card for province-specific numbers
export const LocalEmergencyCard = ({ agency, phone, description }: { agency: string; phone: string; description?: string }) => (
  <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors">
    <div>
      <h4 className="font-medium text-white text-sm">{agency}</h4>
      {description && <p className="text-xs text-slate-500">{description}</p>}
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm font-mono text-cyan-400">{phone}</span>
      <button 
        onClick={() => navigator.clipboard.writeText(phone)}
        className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        title="Copy number"
      >
        <Copy size={12} />
      </button>
    </div>
  </div>
);

export const HospitalCard = ({ name, type, address, phone, coordinates, onFlyTo }: { 
  name: string; type: string; address: string; phone: string; coordinates?: { lat: number; lng: number }; onFlyTo?: FlyToHandler 
}) => {
  const handleFlyTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coordinates && onFlyTo) {
      onFlyTo(coordinates.lat, coordinates.lng, name);
    }
  };

  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 group">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-white text-sm">{name}</h4>
        <div className="flex items-center gap-2">
          {coordinates && onFlyTo && (
            <button
              onClick={handleFlyTo}
              className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
              title={`Fly to ${name} on map`}
            >
              <Crosshair size={14} />
            </button>
          )}
          <span className={`text-xs px-2 py-0.5 rounded ${type === 'Public' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-violet-500/20 text-violet-400'}`}>
            {type}
          </span>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-1">{address}</p>
      <p className="text-xs text-cyan-400 mt-1">📞 {phone}</p>
    </div>
  );
};

export const SafetyMeter = ({ value }: { value: number }) => (
  <div className="flex items-center gap-4">
    <div className="relative w-20 h-20">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="40" cy="40" r="32" stroke="#1f2937" strokeWidth="6" fill="none" />
        <circle 
          cx="40" cy="40" r="32" 
          stroke={value >= 80 ? '#10b981' : value >= 60 ? '#f59e0b' : '#ef4444'}
          strokeWidth="6" 
          fill="none"
          strokeDasharray={`${value * 2.01} 201`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-black text-white">{value}%</span>
      </div>
    </div>
    <div>
      <h4 className="text-lg font-bold text-white">
        {value >= 80 ? 'Very Safe' : value >= 60 ? 'Generally Safe' : 'Exercise Caution'}
      </h4>
      <p className="text-xs text-slate-400">Based on crime rates, traffic, and natural disaster risks</p>
    </div>
  </div>
);

// ==================== NEW ESSENTIAL CARDS ====================

export const PharmacyCard = ({ name, chain, is24h, address, phone, coordinates, onFlyTo }: { 
  name: string; chain: string; is24h: boolean; address: string; phone: string; coordinates?: { lat: number; lng: number }; onFlyTo?: FlyToHandler 
}) => {
  const handleOpenMaps = () => {
    if (coordinates) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`, '_blank');
    }
  };
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  const handleFlyTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coordinates && onFlyTo) {
      onFlyTo(coordinates.lat, coordinates.lng, name);
    }
  };

  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-white text-sm">{name}</h4>
            {is24h && (
              <span className="px-1.5 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-400 rounded">24h</span>
            )}
          </div>
          <p className="text-xs text-slate-500">{chain}</p>
          <p className="text-xs text-slate-400 mt-1">{address}</p>
          <p className="text-xs text-cyan-400 mt-1">📞 {phone}</p>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Fly-to button */}
          {coordinates && onFlyTo && (
            <button 
              onClick={handleFlyTo}
              className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110 active:scale-95"
              title={`Fly to ${name} on map`}
            >
              <Crosshair size={14} />
            </button>
          )}
          <button 
            onClick={handleCopyAddress}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Copy address"
          >
            <Copy size={14} />
          </button>
          <button 
            onClick={handleOpenMaps}
            className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors"
            title="Open in Google Maps"
          >
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const BankCard = ({ name, type, address, openHours, services, coordinates, onFlyTo }: { 
  name: string; type: 'bank' | 'exchange'; address: string; openHours: string; services: string[]; coordinates?: { lat: number; lng: number }; onFlyTo?: FlyToHandler 
}) => {
  const handleOpenMaps = () => {
    if (coordinates) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`, '_blank');
    }
  };

  const handleFlyTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coordinates && onFlyTo) {
      onFlyTo(coordinates.lat, coordinates.lng, name);
    }
  };

  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-colors group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-white text-sm">{name}</h4>
            <span className={`px-1.5 py-0.5 text-xs font-bold rounded ${
              type === 'exchange' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
            }`}>
              {type === 'exchange' ? '💱 Exchange' : '🏦 Bank'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{address}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock size={10} /> {openHours}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {services.map((service, i) => (
              <span key={i} className="px-1.5 py-0.5 text-xs bg-white/5 text-slate-400 rounded">{service}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {coordinates && onFlyTo && (
            <button 
              onClick={handleFlyTo}
              className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110 active:scale-95"
              title={`Fly to ${name} on map`}
            >
              <Crosshair size={14} />
            </button>
          )}
          <button 
            onClick={handleOpenMaps}
            className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
            title="Open in Google Maps"
          >
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const GasStationCard = ({ name, brand, is24h, address, services, coordinates, onFlyTo }: { 
  name: string; brand: string; is24h: boolean; address: string; services: string[]; coordinates?: { lat: number; lng: number }; onFlyTo?: FlyToHandler 
}) => {
  const brandColors: Record<string, string> = {
    'PTT': 'bg-blue-500/20 text-blue-400',
    'Shell': 'bg-yellow-500/20 text-yellow-400',
    'Esso': 'bg-red-500/20 text-red-400',
    'Caltex': 'bg-red-500/20 text-red-400',
    'Bangchak': 'bg-green-500/20 text-green-400',
    'default': 'bg-slate-500/20 text-slate-400',
  };

  const handleOpenMaps = () => {
    if (coordinates) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`, '_blank');
    }
  };

  const handleFlyTo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coordinates && onFlyTo) {
      onFlyTo(coordinates.lat, coordinates.lng, name);
    }
  };

  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-colors group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-white text-sm">{name}</h4>
            <span className={`px-1.5 py-0.5 text-xs font-bold rounded ${brandColors[brand] || brandColors['default']}`}>
              {brand}
            </span>
            {is24h && (
              <span className="px-1.5 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-400 rounded">24h</span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">{address}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {services.map((service, i) => (
              <span key={i} className="px-1.5 py-0.5 text-xs bg-white/5 text-slate-400 rounded">{service}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {coordinates && onFlyTo && (
            <button 
              onClick={handleFlyTo}
              className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 hover:text-cyan-300 transition-all hover:scale-110 active:scale-95"
              title={`Fly to ${name} on map`}
            >
              <Crosshair size={14} />
            </button>
          )}
          <button 
            onClick={handleOpenMaps}
            className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 transition-colors"
            title="Open in Google Maps"
          >
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const SafetyTip = ({ level, title, description }: { level: 'good' | 'warning' | 'info'; title: string; description: string }) => {
  const colors = {
    good: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    info: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
  };
  const icons = { good: '✓', warning: '⚠', info: 'ℹ' };
  return (
    <div className={`p-3 rounded-lg border ${colors[level]}`}>
      <div className="flex items-start gap-2">
        <span>{icons[level]}</span>
        <div>
          <h4 className="font-medium text-white text-sm">{title}</h4>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
    <span className="text-slate-400">{icon}</span>
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm text-white">{value}</p>
    </div>
  </div>
);
