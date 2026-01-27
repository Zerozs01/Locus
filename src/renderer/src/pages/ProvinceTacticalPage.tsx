import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  CloudSun, 
  Phone, 
  Shield, 
  Landmark, 
  Building2, 
  Utensils, 
  Car, 
  Plane,
  AlertTriangle,
  Heart,
  ChevronRight,
  ExternalLink,
  Star,
  Users,
  Maximize,
  Wallet,
  Loader2
} from 'lucide-react';
import { Province, Region } from '../data/regions';

/**
 * Province Tactical Detail Page
 * หน้าข้อมูลจังหวัดแบบละเอียด (Micro-level)
 * ดึงข้อมูลจาก SQLite Database
 */
export const ProvinceTacticalPage = () => {
  const { regionId, provinceId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'admin' | 'safety' | 'logistics' | 'lifestyle'>('overview');
  const [region, setRegion] = useState<Region | null>(null);
  const [province, setProvince] = useState<Province | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch data from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.api && window.api.db) {
          const regions = await window.api.db.getRegions();
          const foundRegion = regions.find((r: Region) => r.id === regionId);
          if (foundRegion) {
            setRegion(foundRegion);
            const foundProvince = foundRegion.subProvinces?.find((p: Province) => p.id === provinceId);
            if (foundProvince) {
              setProvince(foundProvince);
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

  if (!region || !province) {
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

  // Extended data from province
  const extendedData = {
    thaiName: getThaiProvinceName(province.name),
    slogan: getProvinceSlogan(province.name),
    weather: { temp: '28°C', condition: 'Partly Cloudy', humidity: '65%' },
    emergency: { police: '191', ambulance: '1669', fire: '199', tourist: '1155' },
    districts: generateMockDistricts(province.dist),
    safetyIndex: province.safety || 80,
    attractions: generateMockAttractions(province.name),
    restaurants: generateMockRestaurants(province.name),
    hospitals: generateMockHospitals(province.name),
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Landmark size={16} /> },
    { id: 'admin', label: 'Administration', icon: <Building2 size={16} /> },
    { id: 'safety', label: 'Safety & Risks', icon: <Shield size={16} /> },
    { id: 'logistics', label: 'Logistics', icon: <Car size={16} /> },
    { id: 'lifestyle', label: 'Lifestyle', icon: <Heart size={16} /> },
  ] as const;

  return (
    <div className="flex-1 flex flex-col bg-[#050608] overflow-hidden">
      {/* HERO HEADER */}
      <div className="relative h-64 flex-shrink-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={province.image} 
            alt={province.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/90 to-transparent" />
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-12 left-6 z-20 flex items-center gap-2 px-3 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 text-white transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Radar</span>
        </button>

        {/* Province Info */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 text-xs font-mono rounded ${region.color} bg-white/10 border border-white/20`}>
                  {region.code}
                </span>
                <span className="text-slate-400 text-sm">{region.engName} Region</span>
              </div>
              <h1 className="text-4xl font-black text-white mb-1">{province.name}</h1>
              <p className="text-xl text-slate-300">{extendedData.thaiName}</p>
              {extendedData.slogan && (
                <p className="text-sm text-slate-400 italic mt-1">"{extendedData.slogan}"</p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <QuickStat icon={<CloudSun size={20} />} label="Weather" value={extendedData.weather.temp} sub={extendedData.weather.condition} />
              <QuickStat icon={<Shield size={20} />} label="Safety" value={`${extendedData.safetyIndex}%`} sub="Index" color="emerald" />
              <QuickStat icon={<Phone size={20} />} label="Emergency" value="191" sub="Police" color="red" />
            </div>
          </div>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="flex-shrink-0 border-b border-white/10 bg-[#0a0c10]">
        <div className="flex gap-1 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === tab.id 
                  ? 'text-cyan-400 border-cyan-400 bg-cyan-500/10' 
                  : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <OverviewTab province={province} region={region} extendedData={extendedData} />
        )}
        {activeTab === 'admin' && (
          <AdminTab districts={extendedData.districts} province={province} />
        )}
        {activeTab === 'safety' && (
          <SafetyTab safetyIndex={extendedData.safetyIndex} province={province} />
        )}
        {activeTab === 'logistics' && (
          <LogisticsTab province={province} />
        )}
        {activeTab === 'lifestyle' && (
          <LifestyleTab 
            attractions={extendedData.attractions}
            restaurants={extendedData.restaurants}
            hospitals={extendedData.hospitals}
          />
        )}
      </div>
    </div>
  );
};

// ==================== TAB COMPONENTS ====================

interface OverviewTabProps {
  province: Province;
  region: Region;
  extendedData: any;
}

const OverviewTab = ({ province, region, extendedData }: OverviewTabProps) => (
  <div className="grid grid-cols-3 gap-6">
    {/* Main Info */}
    <div className="col-span-2 space-y-6">
      <InfoCard title="Province Overview">
        <p className="text-slate-300 leading-relaxed">
          {province.name} ({extendedData.thaiName}) is a province in the {region.engName} region of Thailand. 
          It comprises {province.dist} districts and {province.tam} sub-districts (tambons).
          {province.population && ` The province has a population of approximately ${province.population}.`}
          {province.area && ` The total area covers ${province.area} km².`}
        </p>
      </InfoCard>

      <InfoCard title="Quick Statistics">
        <div className="grid grid-cols-3 gap-4">
          <StatBox label="Population" value={province.population || 'N/A'} icon={<Users size={20} />} />
          <StatBox label="Area" value={`${province.area || 'N/A'} km²`} icon={<Maximize size={20} />} />
          <StatBox label="Districts" value={String(province.dist)} icon={<Building2 size={20} />} />
          <StatBox label="Sub-districts" value={String(province.tam)} icon={<MapPin size={20} />} />
          <StatBox label="Daily Cost" value={province.dailyCost || '300 ฿'} icon={<Wallet size={20} />} />
          <StatBox label="Safety Index" value={`${extendedData.safetyIndex}%`} icon={<Shield size={20} />} />
        </div>
      </InfoCard>
    </div>

    {/* Side Panel */}
    <div className="space-y-6">
      <InfoCard title="Emergency Contacts" variant="alert">
        <div className="space-y-3">
          <EmergencyContact label="Police" number={extendedData.emergency.police} />
          <EmergencyContact label="Ambulance" number={extendedData.emergency.ambulance} />
          <EmergencyContact label="Fire" number={extendedData.emergency.fire} />
          <EmergencyContact label="Tourist Police" number={extendedData.emergency.tourist} />
        </div>
      </InfoCard>

      <InfoCard title="Current Weather">
        <div className="flex items-center gap-4">
          <CloudSun size={48} className="text-amber-400" />
          <div>
            <div className="text-3xl font-bold text-white">{extendedData.weather.temp}</div>
            <div className="text-sm text-slate-400">{extendedData.weather.condition}</div>
            <div className="text-xs text-slate-500">Humidity: {extendedData.weather.humidity}</div>
          </div>
        </div>
      </InfoCard>
    </div>
  </div>
);

interface AdminTabProps {
  districts: Array<{ name: string; tambons: number }>;
  province: Province;
}

const AdminTab = ({ districts, province }: AdminTabProps) => (
  <div className="space-y-6">
    <InfoCard title={`Administrative Divisions (${province.dist} Districts)`}>
      <div className="grid grid-cols-2 gap-3">
        {districts.map((district, idx) => (
          <div 
            key={idx}
            className="flex items-center justify-between p-3 bg-[#0f1115] rounded-lg border border-white/5 hover:border-cyan-500/30 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 text-sm font-bold">
                {idx + 1}
              </div>
              <div>
                <div className="text-white font-medium">{district.name}</div>
                <div className="text-xs text-slate-500">{district.tambons} Tambons</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
          </div>
        ))}
      </div>
    </InfoCard>
  </div>
);

interface SafetyTabProps {
  safetyIndex: number;
  province: Province;
}

const SafetyTab = ({ safetyIndex, province }: SafetyTabProps) => (
  <div className="grid grid-cols-2 gap-6">
    <InfoCard title="Safety Overview">
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="#1f2937" strokeWidth="8" fill="none" />
            <circle 
              cx="64" cy="64" r="56" 
              stroke={safetyIndex >= 80 ? '#10b981' : safetyIndex >= 60 ? '#f59e0b' : '#ef4444'}
              strokeWidth="8" 
              fill="none"
              strokeDasharray={`${safetyIndex * 3.52} 352`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-black text-white">{safetyIndex}%</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">
            {safetyIndex >= 80 ? 'Very Safe' : safetyIndex >= 60 ? 'Moderately Safe' : 'Exercise Caution'}
          </h3>
          <p className="text-slate-400 text-sm">
            Based on crime statistics, traffic incidents, and natural disaster risks.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <SafetyBar label="Crime Rate" value={100 - (province.serenity * 8)} color="red" />
        <SafetyBar label="Traffic Safety" value={province.relax * 9} color="amber" />
        <SafetyBar label="Natural Disasters" value={85} color="emerald" />
        <SafetyBar label="Healthcare Access" value={province.entertainment > 5 ? 90 : 70} color="cyan" />
      </div>
    </InfoCard>

    <InfoCard title="Risk Areas & Alerts" variant="alert">
      <div className="space-y-3">
        <AlertItem 
          level="low" 
          title="General Safety"
          description="No major safety concerns reported in the past month."
        />
        <AlertItem 
          level="medium" 
          title="Traffic Advisory"
          description="Exercise caution on mountain roads during rainy season."
        />
        <AlertItem 
          level="info" 
          title="Tourist Tips"
          description="Keep valuables secure in crowded tourist areas."
        />
      </div>
    </InfoCard>
  </div>
);

const LogisticsTab = ({ province }: { province: Province }) => (
  <div className="grid grid-cols-2 gap-6">
    <InfoCard title="Transportation Hubs">
      <div className="space-y-4">
        <TransportItem 
          icon={<Plane size={20} />}
          type="Airport"
          name={`${province.name} International Airport`}
          distance="15 km from city center"
          available={province.entertainment > 6}
        />
        <TransportItem 
          icon={<Car size={20} />}
          type="Bus Terminal"
          name={`${province.name} Bus Terminal`}
          distance="City center"
          available={true}
        />
        <TransportItem 
          icon={<Car size={20} />}
          type="Train Station"
          name={`${province.name} Railway Station`}
          distance="3 km from city center"
          available={province.dist > 10}
        />
      </div>
    </InfoCard>

    <InfoCard title="Major Routes">
      <div className="space-y-3">
        <RouteItem route="Highway 1" description="Main north-south arterial road" />
        <RouteItem route="Route 11" description="Connects to neighboring provinces" />
        <RouteItem route="Local Ring Road" description="Bypass around city center" />
      </div>
    </InfoCard>
  </div>
);

interface LifestyleTabProps {
  attractions: Array<{ name: string; type: string; rating: number }>;
  restaurants: Array<{ name: string; cuisine: string; price: string }>;
  hospitals: Array<{ name: string; type: string }>;
}

const LifestyleTab = ({ attractions, restaurants, hospitals }: LifestyleTabProps) => (
  <div className="grid grid-cols-3 gap-6">
    <InfoCard title="Top Attractions">
      <div className="space-y-3">
        {attractions.map((item, idx) => (
          <PlaceItem 
            key={idx}
            name={item.name}
            sub={item.type}
            rating={item.rating}
            icon={<Landmark size={16} />}
          />
        ))}
      </div>
    </InfoCard>

    <InfoCard title="Recommended Restaurants">
      <div className="space-y-3">
        {restaurants.map((item, idx) => (
          <PlaceItem 
            key={idx}
            name={item.name}
            sub={`${item.cuisine} • ${item.price}`}
            icon={<Utensils size={16} />}
          />
        ))}
      </div>
    </InfoCard>

    <InfoCard title="Healthcare Facilities">
      <div className="space-y-3">
        {hospitals.map((item, idx) => (
          <PlaceItem 
            key={idx}
            name={item.name}
            sub={item.type}
            icon={<Heart size={16} />}
          />
        ))}
      </div>
    </InfoCard>
  </div>
);

// ==================== HELPER COMPONENTS ====================

const InfoCard = ({ title, children, variant }: { title: string; children: React.ReactNode; variant?: 'alert' }) => (
  <div className={`rounded-xl border p-5 ${
    variant === 'alert' 
      ? 'bg-amber-500/5 border-amber-500/20' 
      : 'bg-[#0a0c10] border-white/5'
  }`}>
    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{title}</h3>
    {children}
  </div>
);

const StatBox = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="bg-[#0f1115] rounded-lg p-4 border border-white/5">
    <div className="flex items-center gap-2 text-slate-500 mb-2">
      {icon}
      <span className="text-xs uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-2xl font-bold text-white">{value}</div>
  </div>
);

const QuickStat = ({ icon, label, value, sub, color = 'cyan' }: { icon: React.ReactNode; label: string; value: string; sub: string; color?: string }) => {
  const colors: Record<string, string> = {
    cyan: 'bg-cyan-500/20 text-cyan-400',
    emerald: 'bg-emerald-500/20 text-emerald-400',
    red: 'bg-red-500/20 text-red-400',
  };
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10 min-w-[100px]">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${colors[color]}`}>
        {icon}
      </div>
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-xs text-slate-400">{sub}</div>
    </div>
  );
};

const EmergencyContact = ({ label, number }: { label: string; number: string }) => (
  <div className="flex items-center justify-between p-2 bg-[#0f1115] rounded-lg">
    <span className="text-sm text-slate-400">{label}</span>
    <span className="text-lg font-bold text-red-400 font-mono">{number}</span>
  </div>
);

const SafetyBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const colors: Record<string, string> = {
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500',
    cyan: 'bg-cyan-500',
  };
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-400">{label}</span>
        <span className="text-white font-medium">{value}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color]} rounded-full transition-all`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

const AlertItem = ({ level, title, description }: { level: 'low' | 'medium' | 'high' | 'info'; title: string; description: string }) => {
  const styles: Record<string, { bg: string; border: string; icon: string }> = {
    low: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: 'text-emerald-400' },
    medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: 'text-amber-400' },
    high: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: 'text-red-400' },
    info: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', icon: 'text-cyan-400' },
  };
  const s = styles[level];
  return (
    <div className={`p-3 rounded-lg border ${s.bg} ${s.border}`}>
      <div className="flex items-start gap-2">
        <AlertTriangle size={16} className={s.icon} />
        <div>
          <div className="text-sm font-medium text-white">{title}</div>
          <div className="text-xs text-slate-400">{description}</div>
        </div>
      </div>
    </div>
  );
};

const TransportItem = ({ icon, type, name, distance, available }: { icon: React.ReactNode; type: string; name: string; distance: string; available: boolean }) => (
  <div className={`p-3 rounded-lg border ${available ? 'bg-[#0f1115] border-white/5' : 'bg-white/5 border-white/5 opacity-50'}`}>
    <div className="flex items-start gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${available ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-slate-500'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-xs text-slate-500 uppercase">{type}</div>
        <div className="text-white font-medium">{name}</div>
        <div className="text-xs text-slate-400">{distance}</div>
      </div>
      {!available && <span className="text-xs text-slate-500 px-2 py-1 bg-white/5 rounded">N/A</span>}
    </div>
  </div>
);

const RouteItem = ({ route, description }: { route: string; description: string }) => (
  <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
    <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400">
      <Car size={16} />
    </div>
    <div>
      <div className="text-white font-medium">{route}</div>
      <div className="text-xs text-slate-400">{description}</div>
    </div>
  </div>
);

const PlaceItem = ({ name, sub, icon, rating }: { name: string; sub: string; icon: React.ReactNode; rating?: number }) => (
  <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors group cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-white font-medium text-sm">{name}</div>
        <div className="text-xs text-slate-500">{sub}</div>
      </div>
    </div>
    {rating && (
      <div className="flex items-center gap-1 text-amber-400">
        <Star size={12} fill="currentColor" />
        <span className="text-xs font-medium">{rating}</span>
      </div>
    )}
    <ExternalLink size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
  </div>
);

// ==================== MOCK DATA GENERATORS ====================

// Thai names mapping by English province name
const thaiProvinceNames: Record<string, string> = {
  'Chiang Mai': 'เชียงใหม่', 'Chiang Rai': 'เชียงราย', 'Nan': 'น่าน', 'Phrae': 'แพร่', 
  'Mae Hong Son': 'แม่ฮ่องสอน', 'Lamphun': 'ลำพูน', 'Lampang': 'ลำปาง', 'Phayao': 'พะเยา', 'Uttaradit': 'อุตรดิตถ์',
  'Khon Kaen': 'ขอนแก่น', 'Nakhon Ratchasima': 'นครราชสีมา', 'Ubon Ratchathani': 'อุบลราชธานี', 
  'Udon Thani': 'อุดรธานี', 'Buri Ram': 'บุรีรัมย์', 'Surin': 'สุรินทร์', 'Si Sa Ket': 'ศรีสะเกษ',
  'Roi Et': 'ร้อยเอ็ด', 'Kalasin': 'กาฬสินธุ์', 'Maha Sarakham': 'มหาสารคาม', 'Nakhon Phanom': 'นครพนม',
  'Sakon Nakhon': 'สกลนคร', 'Mukdahan': 'มุกดาหาร', 'Yasothon': 'ยโสธร', 'Amnat Charoen': 'อำนาจเจริญ',
  'Nong Khai': 'หนองคาย', 'Loei': 'เลย', 'Nong Bua Lam Phu': 'หนองบัวลำภู', 'Bueng Kan': 'บึงกาฬ',
  'Chaiyaphum': 'ชัยภูมิ',
  'Bangkok Metropolis': 'กรุงเทพมหานคร', 'Nonthaburi': 'นนทบุรี', 'Samut Prakan': 'สมุทรปราการ', 
  'Pathum Thani': 'ปทุมธานี', 'Nakhon Pathom': 'นครปฐม', 'Samut Sakhon': 'สมุทรสาคร',
  'Phra Nakhon Si Ayutthaya': 'พระนครศรีอยุธยา', 'Ang Thong': 'อ่างทอง', 'Lop Buri': 'ลพบุรี',
  'Sing Buri': 'สิงห์บุรี', 'Chai Nat': 'ชัยนาท', 'Saraburi': 'สระบุรี', 'Suphan Buri': 'สุพรรณบุรี',
  'Nakhon Nayok': 'นครนายก', 'Prachin Buri': 'ปราจีนบุรี', 'Sa Kaeo': 'สระแก้ว',
  'Kamphaeng Phet': 'กำแพงเพชร', 'Phichit': 'พิจิตร', 'Phitsanulok': 'พิษณุโลก', 'Sukhothai': 'สุโขทัย',
  'Tak': 'ตาก', 'Nakhon Sawan': 'นครสวรรค์', 'Uthai Thani': 'อุทัยธานี', 'Phetchabun': 'เพชรบูรณ์',
  'Kanchanaburi': 'กาญจนบุรี', 'Ratchaburi': 'ราชบุรี',
  'Phetchaburi': 'เพชรบุรี', 'Prachuap Khiri Khan': 'ประจวบคีรีขันธ์', 'Samut Songkhram': 'สมุทรสงคราม',
  'Chon Buri': 'ชลบุรี', 'Rayong': 'ระยอง', 'Chanthaburi': 'จันทบุรี', 'Trat': 'ตราด',
  'Phuket': 'ภูเก็ต', 'Surat Thani': 'สุราษฎร์ธานี', 'Krabi': 'กระบี่', 'Nakhon Si Thammarat': 'นครศรีธรรมราช',
  'Songkhla': 'สงขลา', 'Pattani': 'ปัตตานี', 'Yala': 'ยะลา', 'Narathiwat': 'นราธิวาส',
  'Chumphon': 'ชุมพร', 'Ranong': 'ระนอง', 'Phang Nga': 'พังงา', 'Trang': 'ตรัง', 
  'Satun': 'สตูล', 'Phatthalung': 'พัทลุง',
  'Chachoengsao': 'ฉะเชิงเทรา',
};

// Province slogans mapping by English name
const provinceSlogans: Record<string, string> = {
  'Chiang Mai': 'ดอยสุเทพคู่บ้าน ศาสนาพุทธล้านนา',
  'Chiang Rai': 'เหนือสุดแดนสยาม ชายแดนสามแผ่นดิน',
  'Nan': 'เมืองเก่าที่มีชีวิต ศิลปกรรมล้านนาตะวันออก',
  'Bangkok Metropolis': 'กรุงเทพฯ ดุจเทพสร้าง เมืองศูนย์กลางการปกครอง',
  'Phuket': 'ไข่มุกแห่งอันดามัน',
  'Khon Kaen': 'พระธาตุขามแก่น เสียงแคนดอกคูน ศูนย์รวมผ้าไหม',
  'Nakhon Ratchasima': 'เมืองหญิงกล้า ผ้าไหมดี หมี่โคราช ปราสาทหิน',
  'Chon Buri': 'ทะเลงาม ข้าวหลามอร่อย หอยใหญ่ ไร่องุ่น',
  'Surat Thani': 'เมืองร้อยเกาะ เงาะอร่อย หอยนางรม',
  'Krabi': 'เมืองถ้ำ ทะเล หาดทราย ป่าชายเลน',
  'Nakhon Si Thammarat': 'เมืองพระ ธาตุทองคำ ข้าวหลาม ร้อยเกาะ',
  'Songkhla': 'นกน้ำเพลินตา สมิหลางามล้ำ น้ำตกสวย',
  'Ayutthaya': 'ราชธานีเก่า อู่ข้าว อู่น้ำ เลิศล้ำกานท์กวี',
  'Sukhothai': 'มรดกโลกล้ำเลิศ กำเนิดลายสือไทย',
  'Kanchanaburi': 'แคว้นโบราณ ด่านเจดีย์ มณีเมืองกาญจน์',
};

function getThaiProvinceName(name: string): string {
  return thaiProvinceNames[name] || name;
}

function getProvinceSlogan(name: string): string {
  return provinceSlogans[name] || '';
}

function generateMockDistricts(count: number): Array<{ name: string; tambons: number }> {
  const districtNames = ['Mueang', 'Bang', 'Nong', 'Mae', 'San', 'Chiang', 'Doi', 'Tha', 'Khlong', 'Phra'];
  const suffixes = ['Sak', 'Khun', 'Luang', 'Noi', 'Yai', 'Klang', 'Tai', 'Nuea'];
  
  return Array.from({ length: Math.min(count, 20) }, (_, i) => ({
    name: `${districtNames[i % districtNames.length]} ${suffixes[i % suffixes.length]}`,
    tambons: Math.floor(Math.random() * 15) + 5,
  }));
}

function generateMockAttractions(provinceName: string): Array<{ name: string; type: string; rating: number }> {
  return [
    { name: `${provinceName} Old City`, type: 'Historical Site', rating: 4.8 },
    { name: `Wat ${provinceName}`, type: 'Temple', rating: 4.6 },
    { name: `${provinceName} Night Market`, type: 'Market', rating: 4.5 },
    { name: `${provinceName} National Park`, type: 'Nature', rating: 4.7 },
  ];
}

function generateMockRestaurants(provinceName: string): Array<{ name: string; cuisine: string; price: string }> {
  return [
    { name: `The ${provinceName} Kitchen`, cuisine: 'Local Thai', price: '$$' },
    { name: `Green Garden`, cuisine: 'Vegetarian', price: '$' },
    { name: `River View Restaurant`, cuisine: 'Seafood', price: '$$$' },
    { name: `Street Food Corner`, cuisine: 'Street Food', price: '$' },
  ];
}

function generateMockHospitals(provinceName: string): Array<{ name: string; type: string }> {
  return [
    { name: `${provinceName} Hospital`, type: 'Public Hospital' },
    { name: `${provinceName} Ram Hospital`, type: 'Private Hospital' },
    { name: `${provinceName} Medical Center`, type: 'Clinic' },
  ];
}
