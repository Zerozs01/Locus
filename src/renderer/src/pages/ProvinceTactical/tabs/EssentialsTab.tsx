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

export const EssentialsTab = ({ data, province, onFlyTo }: { data: ProvinceData; province: Province; onFlyTo?: FlyToHandler }) => {
  const [showPharmacies, setShowPharmacies] = useState(false);

  return (
    <div className="space-y-4">
      {/* Hospitals & Clinics - FIRST with border highlight */}
      <Helpers.ContentCard 
        title="Hospitals & Clinics" 
        icon={<Hospital size={18} />}
        color="rose"
        borderColor="rose"
      >
        <div className="space-y-2">
          {data.hospitals.map((item, idx) => (
            <Helpers.HospitalCard key={idx} {...item} onFlyTo={onFlyTo} />
          ))}
        </div>
      </Helpers.ContentCard>

      {/* Emergency Contacts - with local numbers */}
      <Helpers.ContentCard 
        title="Emergency Contacts" 
        icon={<Phone size={18} />}
        color="red"
        borderColor="rose"
      >
        <div className="space-y-3">
          {/* Universal Emergency Numbers */}
          <div className="grid grid-cols-2 gap-2">
            <Helpers.EmergencyCard label="Police" number="191" />
            <Helpers.EmergencyCard label="Ambulance" number="1669" />
            <Helpers.EmergencyCard label="Fire" number="199" />
            <Helpers.EmergencyCard label="Tourist Police" number="1155" />
          </div>
          
          {/* Local Provincial Numbers */}
          {data.emergencyContacts && data.emergencyContacts.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-slate-400 mb-2">📍 Local {province.name} Numbers</p>
              <div className="space-y-2">
                {data.emergencyContacts.map((contact, idx) => (
                  <Helpers.LocalEmergencyCard key={idx} {...contact} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Helpers.ContentCard>

      {/* Tourist Services (New) */}
      {(data.immigration || data.tatOffice || data.touristPolice) && (
        <Helpers.ContentCard 
          title="Tourist Services" 
          icon={<Shield size={18} />}
          color="cyan"
          borderColor="cyan"
        >
          <div className="space-y-3">
            {data.immigration && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors group">
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm">{data.immigration.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{data.immigration.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a href={`tel:${data.immigration.phone}`} className="p-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                    <Phone size={14} />
                  </a>
                  {data.immigration.coordinates && onFlyTo && (
                    <button 
                      onClick={() => onFlyTo(data.immigration!.coordinates!.lat, data.immigration!.coordinates!.lng, data.immigration!.name)}
                      className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"
                    >
                      <Crosshair size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {data.touristPolice && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors group">
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm">{data.touristPolice.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{data.touristPolice.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a href={`tel:${data.touristPolice.phone.split('/')[0].trim()}`} className="p-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                    <Phone size={14} />
                  </a>
                  {data.touristPolice.coordinates && onFlyTo && (
                    <button 
                      onClick={() => onFlyTo(data.touristPolice!.coordinates!.lat, data.touristPolice!.coordinates!.lng, data.touristPolice!.name)}
                      className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"
                    >
                      <Crosshair size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {data.tatOffice && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors group">
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm">{data.tatOffice.name}</h4>
                  <p className="text-xs text-cyan-400 mt-0.5">{data.tatOffice.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a href={`tel:${data.tatOffice.phone}`} className="p-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                    <Phone size={14} />
                  </a>
                  {data.tatOffice.coordinates && onFlyTo && (
                    <button 
                      onClick={() => onFlyTo(data.tatOffice!.coordinates!.lat, data.tatOffice!.coordinates!.lng, data.tatOffice!.name)}
                      className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"
                    >
                      <Crosshair size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Helpers.ContentCard>
      )}

      {/* Transport Hubs (New) */}
      {data.transportHubs && (data.transportHubs.airport || data.transportHubs.busTerminal || data.transportHubs.trainStation) && (
        <Helpers.ContentCard 
          title="Transport Hubs" 
          icon={<Bus size={18} />}
          color="amber"
          borderColor="amber"
        >
          <div className="space-y-3">
            {data.transportHubs.airport && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-colors group">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded bg-amber-500/10 text-amber-500"><Plane size={16} /></div>
                   <div>
                      <h4 className="font-medium text-white text-sm">{data.transportHubs.airport.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{data.transportHubs.airport.phone}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <a href={`tel:${data.transportHubs.airport.phone}`} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-amber-400 hover:bg-white/10 transition-colors"><Phone size={14}/></a>
                   {data.transportHubs.airport.coordinates && onFlyTo && (
                     <button onClick={() => onFlyTo(data.transportHubs!.airport!.coordinates!.lat, data.transportHubs!.airport!.coordinates!.lng, data.transportHubs!.airport!.name)} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"><Crosshair size={14}/></button>
                   )}
                </div>
              </div>
            )}
            
            {data.transportHubs.busTerminal && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-colors group">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded bg-amber-500/10 text-amber-500"><Bus size={16} /></div>
                   <div>
                      <h4 className="font-medium text-white text-sm">{data.transportHubs.busTerminal.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{data.transportHubs.busTerminal.phone}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <a href={`tel:${data.transportHubs.busTerminal.phone}`} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-amber-400 hover:bg-white/10 transition-colors"><Phone size={14}/></a>
                   {data.transportHubs.busTerminal.coordinates && onFlyTo && (
                     <button onClick={() => onFlyTo(data.transportHubs!.busTerminal!.coordinates!.lat, data.transportHubs!.busTerminal!.coordinates!.lng, data.transportHubs!.busTerminal!.name)} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"><Crosshair size={14}/></button>
                   )}
                </div>
              </div>
            )}

            {data.transportHubs.trainStation && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-colors group">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded bg-amber-500/10 text-amber-500"><Train size={16} /></div>
                   <div>
                      <h4 className="font-medium text-white text-sm">{data.transportHubs.trainStation.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{data.transportHubs.trainStation.phone}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <a href={`tel:${data.transportHubs.trainStation.phone}`} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-amber-400 hover:bg-white/10 transition-colors"><Phone size={14}/></a>
                   {data.transportHubs.trainStation.coordinates && onFlyTo && (
                     <button onClick={() => onFlyTo(data.transportHubs!.trainStation!.coordinates!.lat, data.transportHubs!.trainStation!.coordinates!.lng, data.transportHubs!.trainStation!.name)} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"><Crosshair size={14}/></button>
                   )}
                </div>
              </div>
            )}
          </div>
        </Helpers.ContentCard>
      )}

      {/* Pharmacies - Toggle Default OFF with border highlight */}
      <Helpers.CollapsibleSection
        title="Pharmacies"
        icon={<Pill size={18} />}
        highlightColor="emerald"
        isOpen={showPharmacies}
        onToggle={() => setShowPharmacies(!showPharmacies)}
        summary={`${data.pharmacies.length} pharmacies • ${data.pharmacies.filter(p => p.is24h).length} open 24h`}
      >
        <div className="space-y-2">
          {data.pharmacies.map((item, idx) => (
            <Helpers.PharmacyCard key={idx} {...item} onFlyTo={onFlyTo} />
          ))}
        </div>
      </Helpers.CollapsibleSection>

      {/* Safety Info */}
      <Helpers.ContentCard 
        title="Safety Information" 
        icon={<Shield size={18} />}
        color="emerald"
        borderColor="emerald"
      >
        <div className="space-y-3">
          <Helpers.SafetyMeter value={data.safetyIndex} />
          <div className="space-y-2">
            {data.safetyTips.map((tip, idx) => (
              <Helpers.SafetyTip key={idx} {...tip} />
            ))}
          </div>
        </div>
      </Helpers.ContentCard>

      {/* Practical Info */}
      <Helpers.ContentCard 
        title="Practical Information" 
        icon={<GraduationCap size={18} />}
        color="cyan"
      >
        <div className="grid grid-cols-2 gap-3">
          <Helpers.InfoItem icon={<Wifi size={16} />} label="WiFi" value="Widely available" />
          <Helpers.InfoItem icon={<Landmark size={16} />} label="ATMs" value="In all districts" />
          <Helpers.InfoItem icon={<Fuel size={16} />} label="Gas Stations" value={`${data.gasStations.length} nearby`} />
          <Helpers.InfoItem icon={<Building2 size={16} />} label="Districts" value={`${province.dist} districts`} />
        </div>
      </Helpers.ContentCard>
    </div>
  );
};
