import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
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
  ChevronDown
} from 'lucide-react';
import { Province, Region } from '../data/regions';
import ProvinceMap from '../components/ProvinceMap';
import { measureAsync } from '../utils/perf';

/**
 * Province Tactical Detail Page - REDESIGNED
 * เน้นสิ่งที่ผู้ใช้ต้องการจริงๆ พร้อมแผนที่ Interactive
 */
export const ProvinceTacticalPage = () => {
  const { regionId, provinceId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'explore' | 'stay' | 'eat' | 'travel' | 'essentials'>('explore');
  const [region, setRegion] = useState<Region | null>(null);
  const [province, setProvince] = useState<Province | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch data from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.api && window.api.db) {
          if (regionId && provinceId && window.api.db.getRegion) {
            const [regionData, provinceData] = await measureAsync(
              'db:getRegion+Province@ProvinceTacticalPage',
              () => Promise.all([
                window.api.db.getRegion(regionId),
                window.api.db.getProvince(provinceId)
              ])
            );
            if (regionData) setRegion(regionData);
            if (provinceData) setProvince(provinceData);
          } else {
            const regions = await measureAsync('db:getRegions@ProvinceTacticalPage', () => window.api.db.getRegions());
            const foundRegion = regions.find((r: Region) => r.id === regionId);
            if (foundRegion) {
              setRegion(foundRegion);
              const foundProvince = foundRegion.subProvinces?.find((p: Province) => p.id === provinceId);
              if (foundProvince) {
                setProvince(foundProvince);
              }
            }
          }
        }
      } catch (error) {
        console.error('Failed to load province data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [regionId, provinceId]);

  const provinceData = useMemo(() => {
    if (!region || !province) return null;
    return generateProvinceData(province, region);
  }, [province, region]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#050608]">
        <div className="text-center">
          <Loader2 size={48} className="text-cyan-500 mx-auto mb-4 animate-spin" />
          <p className="text-slate-400">Loading province data...</p>
        </div>
      </div>
    );
  }

  if (!region || !province || !provinceData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#050608]">
        <div className="text-center">
          <AlertTriangle size={48} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Province Not Found</h2>
          <p className="text-slate-400 mb-4">The requested province data is unavailable.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-medium transition-colors"
          >
            Back to Radar
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'explore', label: 'Explore', icon: <Camera size={18} />, color: 'text-teal-400' },
    { id: 'stay', label: 'Stay', icon: <Bed size={18} />, color: 'text-violet-400' },
    { id: 'eat', label: 'Eat & Drink', icon: <Utensils size={18} />, color: 'text-amber-400' },
    { id: 'travel', label: 'Getting Around', icon: <Navigation size={18} />, color: 'text-blue-400' },
    { id: 'essentials', label: 'Essentials', icon: <Shield size={18} />, color: 'text-red-400' },
  ] as const;

  return (
    <div className="flex-1 flex bg-[#050608] overflow-hidden">
      {/* LEFT: MAP SECTION */}
      <div className="w-1/2 relative">
        {/* Back Button Overlay */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 z-[1000] flex items-center gap-2 px-3 py-2 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-lg border border-white/10 text-white transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Radar</span>
        </button>

        {/* Province Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-[1000] p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 text-xs font-mono rounded ${region.color} bg-white/10 border border-white/20`}>
              {region.code}
            </span>
            <span className="text-slate-400 text-sm">{region.engName} Region</span>
          </div>
          <h1 className="text-3xl font-black text-white">{province.name}</h1>
          <p className="text-lg text-slate-300">{provinceData.thaiName}</p>
          {provinceData.slogan && (
            <p className="text-sm text-cyan-400 italic mt-1">"{provinceData.slogan}"</p>
          )}
        </div>

        {/* Interactive Map */}
        <ProvinceMap 
          provinceName={province.name}
          markers={provinceData.mapMarkers}
          zoom={12}
        />
      </div>

      {/* RIGHT: CONTENT SECTION */}
      <div className="w-1/2 flex flex-col border-l border-white/10">
        {/* Quick Stats Bar */}
        <div className="flex-shrink-0 p-4 bg-[#0a0c10] border-b border-white/10">
          <div className="flex items-center gap-4">
            <QuickBadge icon={<Thermometer size={16} />} value={provinceData.weather.temp} label={provinceData.weather.condition} color="amber" />
            <QuickBadge icon={<Shield size={16} />} value={`${provinceData.safetyIndex}%`} label="Safe" color="emerald" />
            <QuickBadge icon={<Wallet size={16} />} value={provinceData.dailyCost} label="/day" color="cyan" />
            <QuickBadge icon={<Phone size={16} />} value="191" label="Police" color="red" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex-shrink-0 border-b border-white/10 bg-[#08090c]">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.id 
                    ? `${tab.color} border-current bg-white/5` 
                    : 'text-slate-500 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span className="hidden xl:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'explore' && <ExploreTab data={provinceData} />}
          {activeTab === 'stay' && <StayTab data={provinceData} />}
          {activeTab === 'eat' && <EatTab data={provinceData} />}
          {activeTab === 'travel' && <TravelTab data={provinceData} />}
          {activeTab === 'essentials' && <EssentialsTab data={provinceData} province={province} />}
        </div>
      </div>
    </div>
  );
};

// ==================== TAB COMPONENTS ====================

const ExploreTab = ({ data }: { data: ProvinceData }) => (
  <div className="space-y-4">
    {/* Popular Activities - FIRST */}
    <ContentCard 
      title="Popular Activities" 
      icon={<Zap size={18} />}
      color="amber"
      borderColor="amber"
    >
      <div className="grid grid-cols-2 gap-2">
        {data.activities.map((activity, idx) => (
          <ActivityChip key={idx} name={activity.name} icon={activity.icon} />
        ))}
      </div>
    </ContentCard>

    {/* Best Time to Visit - SECOND */}
    <ContentCard 
      title="Best Time to Visit" 
      icon={<Clock size={18} />}
      color="violet"
      borderColor="violet"
    >
      <div className="grid grid-cols-3 gap-2">
        {data.seasons.map((season, idx) => (
          <SeasonCard key={idx} {...season} />
        ))}
      </div>
    </ContentCard>

    {/* Top Attractions - THIRD */}
    <ContentCard 
      title="Top Attractions" 
      icon={<Camera size={18} />}
      color="teal"
      borderColor="teal"
    >
      <div className="space-y-3">
        {data.attractions.map((item, idx) => (
          <PlaceCard 
            key={idx}
            rank={idx + 1}
            name={item.name}
            type={item.type}
            rating={item.rating}
            description={item.description}
            openHours={item.openHours}
            price={item.price}
          />
        ))}
      </div>
    </ContentCard>
  </div>
);

const StayTab = ({ data }: { data: ProvinceData }) => {
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
      <CollapsibleSection
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
            <AccommodationCard key={idx} {...item} />
          ))}
        </div>
      </CollapsibleSection>

      {/* Mid-Range - Default CLOSED */}
      <CollapsibleSection
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
            <AccommodationCard key={idx} {...item} />
          ))}
        </div>
      </CollapsibleSection>

      {/* Luxury - Default CLOSED */}
      <CollapsibleSection
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
            <AccommodationCard key={idx} {...item} />
          ))}
        </div>
      </CollapsibleSection>

      {/* Best Areas to Stay - Default OPEN */}
      <CollapsibleSection
        title="Best Areas to Stay"
        icon={<MapPinned size={18} />}
        highlightColor="cyan"
        isOpen={openSections.areas}
        onToggle={() => toggleSection('areas')}
        summary={`${data.stayAreas.length} recommended areas`}
      >
        <div className="space-y-2">
          {data.stayAreas.map((area, idx) => (
            <AreaCard key={idx} {...area} />
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

const EatTab = ({ data }: { data: ProvinceData }) => {
  const [showCafes, setShowCafes] = useState(false);
  const [showMalls, setShowMalls] = useState(false);
  const [showMarkets, setShowMarkets] = useState(false);

  return (
    <div className="space-y-4">
      {/* Local Must-Try Dishes */}
      <ContentCard 
        title="Local Must-Try Dishes" 
        icon={<Utensils size={18} />}
        color="amber"
        borderColor="amber"
      >
        <div className="grid grid-cols-2 gap-2">
          {data.localDishes.map((dish, idx) => (
            <DishCard key={idx} {...dish} />
          ))}
        </div>
      </ContentCard>

      {/* Top Restaurants */}
      <ContentCard 
        title="Top Restaurants" 
        icon={<Star size={18} />}
        color="rose"
        borderColor="rose"
      >
        <div className="space-y-2">
          {data.restaurants.map((item, idx) => (
            <RestaurantCard key={idx} {...item} />
          ))}
        </div>
      </ContentCard>

      {/* Shopping Malls - Toggle Default OFF */}
      <CollapsibleSection
        title="Shopping Malls"
        icon={<Building2 size={18} />}
        highlightColor="cyan"
        isOpen={showMalls}
        onToggle={() => setShowMalls(!showMalls)}
        summary={`${data.malls.length} malls nearby`}
      >
        <div className="space-y-2">
          {data.malls.map((item, idx) => (
            <MallCard key={idx} {...item} />
          ))}
        </div>
      </CollapsibleSection>

      {/* Night Markets & Street Food - Toggle Default OFF */}
      <CollapsibleSection
        title="Night Markets & Street Food"
        icon={<ShoppingBag size={18} />}
        highlightColor="violet"
        isOpen={showMarkets}
        onToggle={() => setShowMarkets(!showMarkets)}
        summary={`${data.nightMarkets.length} markets`}
      >
        <div className="space-y-2">
          {data.nightMarkets.map((item, idx) => (
            <MarketCard key={idx} {...item} />
          ))}
        </div>
      </CollapsibleSection>

      {/* Cafes & Coffee Shops - Toggle Default OFF */}
      <CollapsibleSection
        title="Cafes & Coffee Shops"
        icon={<Coffee size={18} />}
        highlightColor="emerald"
        isOpen={showCafes}
        onToggle={() => setShowCafes(!showCafes)}
        summary={`${data.cafes.length} cafes with WiFi`}
      >
        <div className="space-y-2">
          {data.cafes.map((item, idx) => (
            <CafeCard key={idx} {...item} />
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

const TravelTab = ({ data }: { data: ProvinceData }) => {
  const [showBanks, setShowBanks] = useState(false);

  return (
    <div className="space-y-4">
      {/* Getting Around - FIRST with border highlight */}
      <ContentCard 
        title="Getting Around" 
        icon={<Car size={18} />}
        color="cyan"
        borderColor="cyan"
      >
        <div className="grid grid-cols-2 gap-2">
          {data.gettingAround.map((item, idx) => (
            <LocalTransportCard key={idx} {...item} />
          ))}
        </div>
      </ContentCard>

      {/* Gas Stations - with border highlight */}
      <ContentCard 
        title="Gas Stations" 
        icon={<Fuel size={18} />}
        color="amber"
        borderColor="amber"
        badge={`${data.gasStations.filter(g => g.is24h).length} open 24h`}
      >
        <div className="space-y-2">
          {data.gasStations.map((item, idx) => (
            <GasStationCard key={idx} {...item} />
          ))}
        </div>
      </ContentCard>

      {/* Banks & ATM - Toggle Default OFF */}
      <CollapsibleSection
        title="Banks & ATM"
        icon={<Landmark size={18} />}
        highlightColor="blue"
        isOpen={showBanks}
        onToggle={() => setShowBanks(!showBanks)}
        summary={`${data.banks.length} locations nearby`}
      >
        <div className="space-y-2">
          {data.banks.map((item, idx) => (
            <BankCard key={idx} {...item} />
          ))}
        </div>
      </CollapsibleSection>

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

const EssentialsTab = ({ data, province }: { data: ProvinceData; province: Province }) => {
  const [showPharmacies, setShowPharmacies] = useState(false);

  return (
    <div className="space-y-4">
      {/* Hospitals & Clinics - FIRST with border highlight */}
      <ContentCard 
        title="Hospitals & Clinics" 
        icon={<Hospital size={18} />}
        color="rose"
        borderColor="rose"
      >
        <div className="space-y-2">
          {data.hospitals.map((item, idx) => (
            <HospitalCard key={idx} {...item} />
          ))}
        </div>
      </ContentCard>

      {/* Emergency Contacts - with local numbers */}
      <ContentCard 
        title="Emergency Contacts" 
        icon={<Phone size={18} />}
        color="red"
        borderColor="rose"
      >
        <div className="space-y-3">
          {/* Universal Emergency Numbers */}
          <div className="grid grid-cols-2 gap-2">
            <EmergencyCard label="Police" number="191" />
            <EmergencyCard label="Ambulance" number="1669" />
            <EmergencyCard label="Fire" number="199" />
            <EmergencyCard label="Tourist Police" number="1155" />
          </div>
          
          {/* Local Provincial Numbers */}
          {data.emergencyContacts && data.emergencyContacts.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-slate-400 mb-2">📍 Local {province.name} Numbers</p>
              <div className="space-y-2">
                {data.emergencyContacts.map((contact, idx) => (
                  <LocalEmergencyCard key={idx} {...contact} />
                ))}
              </div>
            </div>
          )}
        </div>
      </ContentCard>

      {/* Pharmacies - Toggle Default OFF with border highlight */}
      <CollapsibleSection
        title="Pharmacies"
        icon={<Pill size={18} />}
        highlightColor="emerald"
        isOpen={showPharmacies}
        onToggle={() => setShowPharmacies(!showPharmacies)}
        summary={`${data.pharmacies.length} pharmacies • ${data.pharmacies.filter(p => p.is24h).length} open 24h`}
      >
        <div className="space-y-2">
          {data.pharmacies.map((item, idx) => (
            <PharmacyCard key={idx} {...item} />
          ))}
        </div>
      </CollapsibleSection>

      {/* Safety Info */}
      <ContentCard 
        title="Safety Information" 
        icon={<Shield size={18} />}
        color="emerald"
        borderColor="emerald"
      >
        <div className="space-y-3">
          <SafetyMeter value={data.safetyIndex} />
          <div className="space-y-2">
            {data.safetyTips.map((tip, idx) => (
              <SafetyTip key={idx} {...tip} />
            ))}
          </div>
        </div>
      </ContentCard>

      {/* Practical Info */}
      <ContentCard 
        title="Practical Information" 
        icon={<GraduationCap size={18} />}
        color="cyan"
      >
        <div className="grid grid-cols-2 gap-3">
          <InfoItem icon={<Wifi size={16} />} label="WiFi" value="Widely available" />
          <InfoItem icon={<Landmark size={16} />} label="ATMs" value="In all districts" />
          <InfoItem icon={<Fuel size={16} />} label="Gas Stations" value={`${data.gasStations.length} nearby`} />
          <InfoItem icon={<Building2 size={16} />} label="Districts" value={`${province.dist} districts`} />
        </div>
      </ContentCard>
    </div>
  );
};

// ==================== HELPER COMPONENTS ====================

const QuickBadge = ({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) => {
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

const ContentCard = ({ 
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
const CollapsibleSection = ({ 
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

const PlaceCard = ({ rank, name, type, rating, description, openHours, price }: {
  rank: number;
  name: string;
  type: string;
  rating: number;
  description?: string;
  openHours?: string;
  price?: string;
}) => (
  <div className="flex gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
    <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-sm flex-shrink-0">
      {rank}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-white truncate">{name}</h4>
        <div className="flex items-center gap-1 text-amber-400">
          <Star size={12} fill="currentColor" />
          <span className="text-xs font-medium">{rating}</span>
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

const ActivityChip = ({ name, icon }: { name: string; icon: string }) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 cursor-pointer transition-colors">
    <span className="text-lg">{icon}</span>
    <span className="text-sm text-slate-300">{name}</span>
  </div>
);

const SeasonCard = ({ name, months, rating, description }: { name: string; months: string; rating: 'best' | 'good' | 'avoid'; description: string }) => {
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

const AccommodationCard = ({ name, price, rating, area }: { name: string; price: string; rating: number; area: string }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
    <div>
      <h4 className="font-medium text-white text-sm">{name}</h4>
      <p className="text-xs text-slate-500">{area}</p>
    </div>
    <div className="text-right">
      <div className="text-emerald-400 font-semibold text-sm">{price}</div>
      <div className="flex items-center gap-1 text-amber-400 text-xs">
        <Star size={10} fill="currentColor" />
        {rating}
      </div>
    </div>
  </div>
);

const AreaCard = ({ name, description, forWho }: { name: string; description: string; forWho: string }) => (
  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
    <div className="flex items-center justify-between mb-1">
      <h4 className="font-medium text-white text-sm">{name}</h4>
      <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">{forWho}</span>
    </div>
    <p className="text-xs text-slate-400">{description}</p>
  </div>
);

const DishCard = ({ name, description, price }: { name: string; description: string; price: string }) => (
  <div className="p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
    <h4 className="font-medium text-white text-sm">{name}</h4>
    <p className="text-xs text-slate-500 mt-0.5">{description}</p>
    <p className="text-xs text-amber-400 mt-1">{price}</p>
  </div>
);

const RestaurantCard = ({ name, cuisine, price, rating, specialty }: { name: string; cuisine: string; price: string; rating: number; specialty?: string }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
    <div>
      <h4 className="font-medium text-white text-sm">{name}</h4>
      <p className="text-xs text-slate-500">{cuisine} • {price}</p>
      {specialty && <p className="text-xs text-amber-400 mt-0.5">Try: {specialty}</p>}
    </div>
    <div className="flex items-center gap-1 text-amber-400">
      <Star size={12} fill="currentColor" />
      <span className="text-sm font-medium">{rating}</span>
    </div>
  </div>
);

const CafeCard = ({ name, vibe, wifi, specialty }: { name: string; vibe: string; wifi: boolean; specialty: string }) => (
  <div className="p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
    <div className="flex items-center justify-between">
      <h4 className="font-medium text-white text-sm">{name}</h4>
      {wifi && <Wifi size={14} className="text-emerald-400" />}
    </div>
    <p className="text-xs text-slate-500">{vibe}</p>
    <p className="text-xs text-amber-400 mt-1">☕ {specialty}</p>
  </div>
);

const MarketCard = ({ name, openHours, bestFor }: { name: string; openHours: string; bestFor: string }) => (
  <div className="p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
    <h4 className="font-medium text-white text-sm">{name}</h4>
    <div className="flex items-center gap-2 mt-1">
      <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={10} /> {openHours}</span>
    </div>
    <p className="text-xs text-violet-400 mt-1">{bestFor}</p>
  </div>
);

// MallCard for Shopping Malls
const MallCard = ({ name, address, openHours, features }: { name: string; address: string; openHours: string; features: string[] }) => (
  <div className="p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
    <h4 className="font-medium text-white text-sm">{name}</h4>
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

const TransportOptionCard = ({ type, name, duration, price, frequency, icon }: { 
  type: string; name: string; duration: string; price: string; frequency: string; icon: React.ReactNode 
}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]">
    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-white text-sm">{type}</h4>
        <span className="text-emerald-400 text-sm font-semibold">{price}</span>
      </div>
      <p className="text-xs text-slate-400">{name}</p>
      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
        <span>⏱ {duration}</span>
        <span>{frequency}</span>
      </div>
    </div>
  </div>
);

const LocalTransportCard = ({ name, price, description, icon }: { name: string; price: string; description: string; icon: React.ReactNode }) => (
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

const DayTripCard = ({ destination, distance, highlights }: { destination: string; distance: string; highlights: string }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
    <div>
      <h4 className="font-medium text-white text-sm">{destination}</h4>
      <p className="text-xs text-slate-500">{highlights}</p>
    </div>
    <div className="text-right">
      <span className="text-xs text-cyan-400">{distance}</span>
    </div>
  </div>
);

const EmergencyCard = ({ label, number }: { label: string; number: string }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
    <span className="text-sm text-slate-300">{label}</span>
    <span className="text-lg font-bold text-red-400 font-mono">{number}</span>
  </div>
);

// Local Emergency Contact Card for province-specific numbers
const LocalEmergencyCard = ({ agency, phone, description }: { agency: string; phone: string; description?: string }) => (
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

const HospitalCard = ({ name, type, address, phone }: { name: string; type: string; address: string; phone: string }) => (
  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
    <div className="flex items-center justify-between">
      <h4 className="font-medium text-white text-sm">{name}</h4>
      <span className={`text-xs px-2 py-0.5 rounded ${type === 'Public' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-violet-500/20 text-violet-400'}`}>
        {type}
      </span>
    </div>
    <p className="text-xs text-slate-500 mt-1">{address}</p>
    <p className="text-xs text-cyan-400 mt-1">📞 {phone}</p>
  </div>
);

const SafetyMeter = ({ value }: { value: number }) => (
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

const PharmacyCard = ({ name, chain, is24h, address, phone, coordinates }: { 
  name: string; chain: string; is24h: boolean; address: string; phone: string; coordinates?: { lat: number; lng: number } 
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

const BankCard = ({ name, type, address, openHours, services, coordinates }: { 
  name: string; type: 'bank' | 'exchange'; address: string; openHours: string; services: string[]; coordinates?: { lat: number; lng: number } 
}) => {
  const handleOpenMaps = () => {
    if (coordinates) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`, '_blank');
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
        <button 
          onClick={handleOpenMaps}
          className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors opacity-0 group-hover:opacity-100"
          title="Open in Google Maps"
        >
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

const GasStationCard = ({ name, brand, is24h, address, services, coordinates }: { 
  name: string; brand: string; is24h: boolean; address: string; services: string[]; coordinates?: { lat: number; lng: number } 
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
        <button 
          onClick={handleOpenMaps}
          className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 transition-colors opacity-0 group-hover:opacity-100"
          title="Open in Google Maps"
        >
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

const SafetyTip = ({ level, title, description }: { level: 'good' | 'warning' | 'info'; title: string; description: string }) => {
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

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
    <span className="text-slate-400">{icon}</span>
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm text-white">{value}</p>
    </div>
  </div>
);

// ==================== DATA TYPES & GENERATORS ====================

interface ProvinceData {
  thaiName: string;
  slogan: string;
  weather: { temp: string; condition: string; humidity: string };
  safetyIndex: number;
  dailyCost: string;
  attractions: Array<{ name: string; type: string; rating: number; description?: string; openHours?: string; price?: string }>;
  activities: Array<{ name: string; icon: string }>;
  seasons: Array<{ name: string; months: string; rating: 'best' | 'good' | 'avoid'; description: string }>;
  accommodation: {
    budget: Array<{ name: string; price: string; rating: number; area: string }>;
    midRange: Array<{ name: string; price: string; rating: number; area: string }>;
    luxury: Array<{ name: string; price: string; rating: number; area: string }>;
  };
  stayAreas: Array<{ name: string; description: string; forWho: string }>;
  localDishes: Array<{ name: string; description: string; price: string }>;
  restaurants: Array<{ name: string; cuisine: string; price: string; rating: number; specialty?: string }>;
  cafes: Array<{ name: string; vibe: string; wifi: boolean; specialty: string }>;
  nightMarkets: Array<{ name: string; openHours: string; bestFor: string }>;
  malls: Array<{ name: string; address: string; openHours: string; features: string[] }>;
  gettingThere: Array<{ type: string; name: string; duration: string; price: string; frequency: string; icon: React.ReactNode }>;
  gettingAround: Array<{ name: string; price: string; description: string; icon: React.ReactNode }>;
  dayTrips: Array<{ destination: string; distance: string; highlights: string }>;
  hospitals: Array<{ name: string; type: string; address: string; phone: string }>;
  emergencyContacts: Array<{ agency: string; phone: string; description?: string }>;
  safetyTips: Array<{ level: 'good' | 'warning' | 'info'; title: string; description: string }>;
  banks: Array<{ name: string; type: 'bank' | 'exchange'; address: string; openHours: string; services: string[]; coordinates?: { lat: number; lng: number } }>;
  gasStations: Array<{ name: string; brand: string; is24h: boolean; address: string; services: string[]; coordinates?: { lat: number; lng: number } }>;
  pharmacies: Array<{ name: string; chain: string; is24h: boolean; address: string; phone: string; coordinates?: { lat: number; lng: number } }>;
  mapMarkers: Array<{ lat: number; lng: number; title: string; type: 'attraction' | 'restaurant' | 'hotel' | 'hospital' | 'transport' }>;
}

// Thai names mapping
const thaiProvinceNames: Record<string, string> = {
  'Chiang Mai': 'เชียงใหม่', 'Chiang Rai': 'เชียงราย', 'Nan': 'น่าน', 'Phrae': 'แพร่', 
  'Mae Hong Son': 'แม่ฮ่องสอน', 'Lamphun': 'ลำพูน', 'Lampang': 'ลำปาง',
  'Khon Kaen': 'ขอนแก่น', 'Korat': 'โคราช', 'Ubon': 'อุบลราชธานี', 'Udon Thani': 'อุดรธานี',
  'Bangkok': 'กรุงเทพฯ', 'Bangkok Metropolis': 'กรุงเทพมหานคร',
  'Phuket': 'ภูเก็ต', 'Krabi': 'กระบี่', 'Surat Thani': 'สุราษฎร์ธานี',
  'Chon Buri': 'ชลบุรี', 'Rayong': 'ระยอง', 'Kanchanaburi': 'กาญจนบุรี',
};

const provinceSlogans: Record<string, string> = {
  'Chiang Mai': 'ดอยสุเทพคู่บ้าน ศาสนาพุทธล้านนา',
  'Chiang Rai': 'เหนือสุดแดนสยาม ชายแดนสามแผ่นดิน',
  'Phuket': 'ไข่มุกแห่งอันดามัน',
  'Bangkok': 'กรุงเทพฯ ดุจเทพสร้าง',
  'Khon Kaen': 'พระธาตุขามแก่น เสียงแคนดอกคูน',
};

// Province-specific emergency contacts with real phone numbers
const provinceEmergencyData: Record<string, Array<{ agency: string; phone: string; description?: string }>> = {
  'Chiang Mai': [
    { agency: 'สภ.เมืองเชียงใหม่', phone: '053-276-458', description: 'Mueang Chiang Mai Police Station' },
    { agency: 'ตำรวจท่องเที่ยวเชียงใหม่', phone: '053-248-974', description: 'Tourist Police Division' },
    { agency: 'รพ.มหาราชนครเชียงใหม่', phone: '053-945-555', description: 'Maharaj Nakorn Hospital (24h ER)' },
    { agency: 'หน่วยกู้ชีพเชียงใหม่', phone: '053-112-155', description: 'Emergency Medical Service' },
  ],
  'Chiang Rai': [
    { agency: 'สภ.เมืองเชียงราย', phone: '053-744-571', description: 'Mueang Chiang Rai Police Station' },
    { agency: 'ตำรวจภูธรจังหวัดเชียงราย', phone: '053-711-444', description: 'Provincial Police' },
    { agency: 'รพ.เชียงรายประชานุเคราะห์', phone: '053-711-300', description: 'Chiangrai Prachanukroh Hospital' },
  ],
  'Phuket': [
    { agency: 'ตำรวจภูธรจังหวัดภูเก็ต', phone: '076-212-046', description: 'Phuket Provincial Police' },
    { agency: 'สภ.ถลาง', phone: '076-313-919', description: 'Thalang Police Station' },
    { agency: 'สภ.ป่าตอง', phone: '076-342-716', description: 'Patong Police Station' },
    { agency: 'รพ.วชิระภูเก็ต', phone: '076-361-234', description: 'Vachira Phuket Hospital (24h ER)' },
  ],
  'Bangkok': [
    { agency: 'สายด่วน สตช.', phone: '1599', description: 'Royal Thai Police Hotline' },
    { agency: 'กู้ชีพกรุงเทพฯ', phone: '1554', description: 'Bangkok EMS' },
    { agency: 'ศูนย์บริการข้อมูล กทม.', phone: '1555', description: 'BMA Call Center' },
    { agency: 'สายด่วนจราจร', phone: '1197', description: 'Traffic Police Hotline' },
  ],
  'Khon Kaen': [
    { agency: 'สภ.เมืองขอนแก่น', phone: '043-333-133', description: 'Mueang Khon Kaen Police Station' },
    { agency: 'รพ.ขอนแก่น', phone: '043-336-789', description: 'Khon Kaen Hospital' },
    { agency: 'หน่วยกู้ชีพขอนแก่น', phone: '043-238-111', description: 'Emergency Medical Service' },
  ],
};

function getProvinceEmergencyContacts(provinceName: string): Array<{ agency: string; phone: string; description?: string }> {
  // Return province-specific contacts if available, otherwise return generic contacts
  if (provinceEmergencyData[provinceName]) {
    return provinceEmergencyData[provinceName];
  }
  
  // Default contacts for provinces without specific data
  return [
    { agency: `สถานีตำรวจภูธร${provinceName}`, phone: '191', description: 'Provincial Police Station' },
    { agency: `โรงพยาบาล${provinceName}`, phone: '1669', description: 'Provincial Hospital' },
  ];
}

function generateProvinceData(province: Province, region: Region): ProvinceData {
  const coords = getProvinceCoords(province.name);
  
  return {
    thaiName: thaiProvinceNames[province.name] || province.name,
    slogan: provinceSlogans[province.name] || '',
    weather: { temp: '28°C', condition: 'Partly Cloudy', humidity: '65%' },
    safetyIndex: province.safety || 82,
    dailyCost: province.dailyCost || '350 ฿',
    
    attractions: [
      { name: `${province.name} Old City`, type: 'Historical Site', rating: 4.8, description: 'Ancient walled city with rich history and beautiful temples', openHours: '6:00 - 18:00', price: 'Free' },
      { name: `Wat ${province.name}`, type: 'Temple', rating: 4.7, description: 'Iconic temple with stunning architecture', openHours: '5:00 - 17:00', price: '30 ฿' },
      { name: `${province.name} Night Market`, type: 'Market', rating: 4.5, description: 'Vibrant night market with local crafts and food', openHours: '17:00 - 23:00', price: 'Free' },
      { name: `${province.name} National Park`, type: 'Nature', rating: 4.6, description: 'Beautiful natural scenery and hiking trails', openHours: '8:00 - 16:30', price: '200 ฿' },
    ],
    
    activities: [
      { name: 'Temple Hopping', icon: '🛕' },
      { name: 'Street Food Tour', icon: '🍜' },
      { name: 'Cooking Class', icon: '👨‍🍳' },
      { name: 'Night Market', icon: '🛍️' },
      { name: 'Trekking', icon: '🥾' },
      { name: 'Local Crafts', icon: '🎨' },
    ],
    
    seasons: [
      { name: 'Cool Season', months: 'Nov - Feb', rating: 'best', description: 'Perfect weather, festivals' },
      { name: 'Hot Season', months: 'Mar - May', rating: 'good', description: 'Very hot, Songkran' },
      { name: 'Rainy Season', months: 'Jun - Oct', rating: 'avoid', description: 'Heavy rain, green scenery' },
    ],
    
    accommodation: {
      budget: [
        { name: `${province.name} Backpackers`, price: '250-400 ฿', rating: 4.2, area: 'Old City' },
        { name: 'Green Hostel', price: '300-500 ฿', rating: 4.0, area: 'City Center' },
      ],
      midRange: [
        { name: `${province.name} Boutique`, price: '1,200-2,000 ฿', rating: 4.5, area: 'Old City' },
        { name: 'Riverside Hotel', price: '1,500-2,500 ฿', rating: 4.4, area: 'Riverside' },
      ],
      luxury: [
        { name: `${province.name} Grand Resort`, price: '5,000-12,000 ฿', rating: 4.8, area: 'Mountain View' },
        { name: 'Royal Heritage', price: '8,000-15,000 ฿', rating: 4.9, area: 'Old City' },
      ],
    },
    
    stayAreas: [
      { name: 'Old City', description: 'Historic center with temples, walking distance to everything', forWho: 'First-timers' },
      { name: 'Riverside', description: 'Peaceful area with scenic views and upscale restaurants', forWho: 'Couples' },
      { name: 'Night Bazaar Area', description: 'Close to shopping and nightlife', forWho: 'Shoppers' },
    ],
    
    localDishes: [
      { name: getLocalDish(region.id, 0), description: 'Regional specialty noodle dish', price: '40-60 ฿' },
      { name: getLocalDish(region.id, 1), description: 'Famous local curry', price: '50-80 ฿' },
      { name: getLocalDish(region.id, 2), description: 'Traditional street food', price: '30-50 ฿' },
      { name: getLocalDish(region.id, 3), description: 'Popular dessert', price: '20-40 ฿' },
    ],
    
    restaurants: [
      { name: `The ${province.name} Kitchen`, cuisine: 'Northern Thai', price: '$$', rating: 4.6, specialty: 'Khao Soi' },
      { name: 'River View Terrace', cuisine: 'Thai-International', price: '$$$', rating: 4.5, specialty: 'Sunset dinner' },
      { name: 'Local Flavors', cuisine: 'Street Food Style', price: '$', rating: 4.4, specialty: 'Sai Oua' },
    ],
    
    cafes: [
      { name: 'Coffee Mountain', vibe: 'Cozy, mountain views', wifi: true, specialty: 'Thai drip coffee' },
      { name: 'Art House Cafe', vibe: 'Artsy, quiet workspace', wifi: true, specialty: 'Pour over' },
      { name: 'Garden Brew', vibe: 'Outdoor, pet-friendly', wifi: true, specialty: 'Cold brew' },
    ],
    
    nightMarkets: [
      { name: `${province.name} Walking Street`, openHours: 'Sun 16:00-22:00', bestFor: 'Local crafts & souvenirs' },
      { name: 'Night Bazaar', openHours: 'Daily 18:00-23:00', bestFor: 'Food & shopping' },
    ],
    
    // Shopping Malls
    malls: [
      { name: `Central ${province.name}`, address: 'Downtown Area', openHours: '10:00-21:00', features: ['Cinema', 'Food Court', 'Supermarket', 'ATM'] },
      { name: `Maya Lifestyle`, address: 'Near Night Bazaar', openHours: '10:00-22:00', features: ['Rooftop Bar', 'Fashion', 'Electronics'] },
      { name: 'Airport Plaza', address: 'Near Airport', openHours: '10:30-21:30', features: ['Department Store', 'Dining', 'Entertainment'] },
    ],
    
    gettingThere: [
      { type: 'By Air', name: `${province.name} International Airport`, duration: '1h from BKK', price: '800-3,000 ฿', frequency: '20+ daily flights', icon: <Plane size={20} /> },
      { type: 'By Bus', name: 'Mo Chit Terminal', duration: '9-10 hours', price: '400-700 ฿', frequency: 'Every 30 min', icon: <Bus size={20} /> },
      { type: 'By Train', name: 'Hua Lamphong', duration: '12-14 hours', price: '250-1,500 ฿', frequency: '5 trains daily', icon: <Train size={20} /> },
    ],
    
    gettingAround: [
      { name: 'Songthaew', price: '20-40 ฿', description: 'Red trucks, shared rides in city', icon: <Car size={18} /> },
      { name: 'Grab/Bolt', price: '50-150 ฿', description: 'Convenient app-based service', icon: <Car size={18} /> },
      { name: 'Motorbike Rental', price: '200-300 ฿/day', description: 'Freedom to explore', icon: <Car size={18} /> },
      { name: 'Bicycle', price: '50-100 ฿/day', description: 'Eco-friendly, Old City best', icon: <Car size={18} /> },
    ],
    
    dayTrips: [
      { destination: 'Doi Inthanon', distance: '100 km', highlights: "Thailand's highest peak, waterfalls" },
      { destination: 'Elephant Sanctuary', distance: '60 km', highlights: 'Ethical elephant experience' },
      { destination: 'Hot Springs', distance: '40 km', highlights: 'Natural hot springs, relaxation' },
    ],
    
    hospitals: [
      { name: `${province.name} Hospital`, type: 'Public', address: 'City Center', phone: '053-xxx-xxx' },
      { name: `${province.name} Ram Hospital`, type: 'Private', address: 'Near Airport', phone: '053-xxx-xxx' },
    ],
    
    // Provincial Emergency Contacts with real numbers
    emergencyContacts: getProvinceEmergencyContacts(province.name),
    
    safetyTips: [
      { level: 'good', title: 'Generally Safe', description: 'Low crime rate, tourist-friendly area' },
      { level: 'warning', title: 'Traffic Caution', description: 'Be careful when crossing roads, especially at night' },
      { level: 'info', title: 'Scam Awareness', description: 'Use metered taxis or Grab, negotiate prices beforehand' },
    ],
    
    // NEW: Banks & Currency Exchange
    banks: [
      { 
        name: 'Bangkok Bank', 
        type: 'bank', 
        address: `${province.name} Central Branch, Main Road`, 
        openHours: 'Mon-Fri 08:30-15:30', 
        services: ['ATM', 'Currency Exchange', 'Wire Transfer'],
        coordinates: { lat: coords.lat + 0.002, lng: coords.lng + 0.003 }
      },
      { 
        name: 'Kasikorn Bank', 
        type: 'bank', 
        address: `${province.name} Old City Branch`, 
        openHours: 'Mon-Fri 08:30-15:30', 
        services: ['ATM', 'Currency Exchange'],
        coordinates: { lat: coords.lat - 0.003, lng: coords.lng + 0.001 }
      },
      { 
        name: 'SuperRich Exchange', 
        type: 'exchange', 
        address: 'Night Bazaar Area', 
        openHours: 'Daily 09:00-21:00', 
        services: ['Best Rates', 'Multiple Currencies'],
        coordinates: { lat: coords.lat + 0.001, lng: coords.lng - 0.002 }
      },
    ],
    
    // NEW: Gas Stations
    gasStations: [
      { 
        name: 'PTT Station - Highway', 
        brand: 'PTT', 
        is24h: true, 
        address: `Highway 11, Near ${province.name} Airport`, 
        services: ['Cafe Amazon', 'Jiffy', 'EV Charging', 'Car Wash'],
        coordinates: { lat: coords.lat + 0.015, lng: coords.lng + 0.01 }
      },
      { 
        name: 'Shell - City Center', 
        brand: 'Shell', 
        is24h: true, 
        address: 'Main Road, City Center', 
        services: ['Shell Select', 'V-Power'],
        coordinates: { lat: coords.lat - 0.005, lng: coords.lng + 0.008 }
      },
      { 
        name: 'Bangchak - Outer Ring', 
        brand: 'Bangchak', 
        is24h: false, 
        address: 'Outer Ring Road (06:00-22:00)', 
        services: ['Inthanin Coffee', 'Mini Mart'],
        coordinates: { lat: coords.lat + 0.02, lng: coords.lng - 0.01 }
      },
    ],
    
    // NEW: Pharmacies
    pharmacies: [
      { 
        name: 'Boots - Central Mall', 
        chain: 'Boots', 
        is24h: false, 
        address: `Central ${province.name}, Ground Floor`, 
        phone: '053-xxx-111',
        coordinates: { lat: coords.lat + 0.001, lng: coords.lng + 0.002 }
      },
      { 
        name: 'Watsons - Night Bazaar', 
        chain: 'Watsons', 
        is24h: false, 
        address: 'Night Bazaar Road', 
        phone: '053-xxx-222',
        coordinates: { lat: coords.lat - 0.002, lng: coords.lng - 0.001 }
      },
      { 
        name: 'Fascino 24h Pharmacy', 
        chain: 'Fascino', 
        is24h: true, 
        address: 'Near Hospital, Open 24 hours', 
        phone: '053-xxx-333',
        coordinates: { lat: coords.lat + 0.003, lng: coords.lng - 0.003 }
      },
      { 
        name: 'Pure Pharmacy', 
        chain: 'Independent', 
        is24h: true, 
        address: 'Old City Gate, Open 24 hours', 
        phone: '053-xxx-444',
        coordinates: { lat: coords.lat - 0.001, lng: coords.lng + 0.004 }
      },
    ],
    
    mapMarkers: generateMapMarkers(province.name, coords),
  };
}

function getProvinceCoords(name: string): { lat: number; lng: number } {
  const coords: Record<string, { lat: number; lng: number }> = {
    'Chiang Mai': { lat: 18.7883, lng: 98.9853 },
    'Chiang Rai': { lat: 19.9105, lng: 99.8406 },
    'Bangkok': { lat: 13.7563, lng: 100.5018 },
    'Phuket': { lat: 7.8804, lng: 98.3923 },
  };
  return coords[name] || { lat: 13.7563, lng: 100.5018 };
}

function getLocalDish(regionId: string, index: number): string {
  const dishes: Record<string, string[]> = {
    'north': ['Khao Soi', 'Sai Oua', 'Kaeng Hung Le', 'Khanom Jeen Nam Ngiao'],
    'northeast': ['Som Tam', 'Larb', 'Kai Yang', 'Sticky Rice'],
    'central': ['Pad Thai', 'Tom Yum', 'Green Curry', 'Mango Sticky Rice'],
    'south': ['Massaman Curry', 'Kanom Jeen', 'Roti', 'Thai Tea'],
    'east': ['Seafood', 'Pla Pao', 'Som Tam', 'Kai Yang'],
    'west': ['Kaeng Pa', 'Moo Hong', 'Nam Prik', 'Khao Chae'],
  };
  const regionDishes = dishes[regionId] || dishes['central'];
  return regionDishes[index] || 'Local Specialty';
}

function generateMapMarkers(provinceName: string, center: { lat: number; lng: number }) {
  // Generate markers around the center
  return [
    { lat: center.lat + 0.01, lng: center.lng + 0.005, title: `Wat ${provinceName}`, type: 'attraction' as const },
    { lat: center.lat - 0.008, lng: center.lng + 0.012, title: 'Night Market', type: 'restaurant' as const },
    { lat: center.lat + 0.005, lng: center.lng - 0.01, title: 'Central Hospital', type: 'hospital' as const },
    { lat: center.lat - 0.015, lng: center.lng - 0.005, title: 'Bus Terminal', type: 'transport' as const },
    { lat: center.lat + 0.02, lng: center.lng + 0.015, title: 'Grand Hotel', type: 'hotel' as const },
  ];
}
