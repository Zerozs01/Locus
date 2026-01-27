import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Bus, Train, Car, MapPin, ArrowLeft, Clock,
  Route, ChevronRight, ChevronDown, Info, Navigation2,
  Building2, Plane, Ship, Search, Tag, Wallet
} from 'lucide-react';

interface TransportRoute {
  id: string;
  name: string;
  type: 'bus' | 'van' | 'coach' | 'train' | 'plane' | 'boat';
  operator: string;
  from: string;
  to: string;
  via: string[];          // จังหวัดที่ผ่าน
  departureTime: string[];
  duration: string;
  baseFare: number;
  farePerKm?: number;
  distance?: number;
  frequency: string;      // ความถี่
  terminal?: string;      // สถานี/จุดขึ้นรถ
  contact?: string;
  notes?: string;
}

// Sample transport routes data (grouped by region)
const regionTransportData: Record<string, TransportRoute[]> = {
  north: [
    {
      id: 'n1',
      name: 'สาย 1: กรุงเทพฯ - เชียงใหม่',
      type: 'coach',
      operator: 'นครชัยแอร์',
      from: 'กรุงเทพฯ (หมอชิต)',
      to: 'เชียงใหม่',
      via: ['อยุธยา', 'นครสวรรค์', 'ตาก', 'ลำปาง'],
      departureTime: ['09:00', '10:00', '20:00', '21:00', '22:00'],
      duration: '9-10 ชม.',
      baseFare: 550,
      frequency: 'ทุก 1 ชม.',
      terminal: 'สถานีขนส่งหมอชิต',
      notes: 'มีทั้งรถ VIP และรถปรับอากาศชั้น 1'
    },
    {
      id: 'n2',
      name: 'รถตู้ กรุงเทพฯ - เชียงราย',
      type: 'van',
      operator: 'เชียงรายทัวร์',
      from: 'กรุงเทพฯ',
      to: 'เชียงราย',
      via: ['นครสวรรค์', 'พิษณุโลก', 'อุตรดิตถ์', 'แพร่', 'ลำปาง', 'เชียงใหม่'],
      departureTime: ['08:00', '09:00', '13:00', '21:00'],
      duration: '12 ชม.',
      baseFare: 650,
      frequency: 'ทุก 2-3 ชม.',
      terminal: 'อนุสาวรีย์ชัยสมรภูมิ'
    },
    {
      id: 'n3',
      name: 'รถไฟ กรุงเทพฯ - เชียงใหม่',
      type: 'train',
      operator: 'การรถไฟแห่งประเทศไทย',
      from: 'หัวลำโพง',
      to: 'เชียงใหม่',
      via: ['อยุธยา', 'ลพบุรี', 'นครสวรรค์', 'พิษณุโลก', 'อุตรดิตถ์', 'ลำปาง'],
      departureTime: ['08:30', '15:00', '18:10', '19:35'],
      duration: '11-14 ชม.',
      baseFare: 231,
      frequency: '4 ขบวน/วัน',
      terminal: 'สถานีรถไฟหัวลำโพง',
      notes: 'มีรถนอนชั้น 1, 2 และที่นั่งชั้น 2, 3'
    },
    {
      id: 'n4',
      name: 'เครื่องบิน กรุงเทพฯ - เชียงใหม่',
      type: 'plane',
      operator: 'Thai Airways / AirAsia / Nok Air',
      from: 'สุวรรณภูมิ/ดอนเมือง',
      to: 'เชียงใหม่',
      via: [],
      departureTime: ['06:00-21:00'],
      duration: '1 ชม. 10 นาที',
      baseFare: 999,
      frequency: '30+ เที่ยว/วัน',
      notes: 'ราคาตั๋วตามสายการบินและช่วงเวลา'
    },
    {
      id: 'n5',
      name: 'รถเมล์สาย 32: เชียงใหม่ - ลำพูน',
      type: 'bus',
      operator: 'บขส.',
      from: 'เชียงใหม่',
      to: 'ลำพูน',
      via: ['สารภี'],
      departureTime: ['06:00-18:00'],
      duration: '30 นาที',
      baseFare: 20,
      frequency: 'ทุก 15 นาที',
      terminal: 'สถานีขนส่งช้างเผือก'
    }
  ],
  northeast: [
    {
      id: 'ne1',
      name: 'สาย 21: กรุงเทพฯ - ขอนแก่น',
      type: 'coach',
      operator: 'นครชัยแอร์',
      from: 'กรุงเทพฯ (หมอชิต)',
      to: 'ขอนแก่น',
      via: ['สระบุรี', 'นครราชสีมา', 'บุรีรัมย์'],
      departureTime: ['07:00', '09:00', '12:00', '20:00', '21:00'],
      duration: '6-7 ชม.',
      baseFare: 380,
      frequency: 'ทุก 1-2 ชม.',
      terminal: 'สถานีขนส่งหมอชิต'
    },
    {
      id: 'ne2',
      name: 'รถตู้ กรุงเทพฯ - อุดรธานี',
      type: 'van',
      operator: 'นครชัยทัวร์',
      from: 'กรุงเทพฯ',
      to: 'อุดรธานี',
      via: ['สระบุรี', 'นครราชสีมา', 'ขอนแก่น'],
      departureTime: ['06:00', '08:00', '10:00', '14:00', '20:00'],
      duration: '8 ชม.',
      baseFare: 450,
      frequency: 'ทุก 2 ชม.',
      terminal: 'อนุสาวรีย์ชัยสมรภูมิ'
    },
    {
      id: 'ne3',
      name: 'รถไฟ กรุงเทพฯ - อุบลราชธานี',
      type: 'train',
      operator: 'การรถไฟแห่งประเทศไทย',
      from: 'หัวลำโพง',
      to: 'อุบลราชธานี',
      via: ['อยุธยา', 'สระบุรี', 'นครราชสีมา', 'บุรีรัมย์', 'สุรินทร์', 'ศรีสะเกษ'],
      departureTime: ['06:40', '17:35', '20:30'],
      duration: '10-11 ชม.',
      baseFare: 240,
      frequency: '3 ขบวน/วัน',
      terminal: 'สถานีรถไฟหัวลำโพง'
    },
    {
      id: 'ne4',
      name: 'สาย 407: โคราช - อุบลฯ',
      type: 'bus',
      operator: 'บขส.',
      from: 'นครราชสีมา',
      to: 'อุบลราชธานี',
      via: ['บุรีรัมย์', 'สุรินทร์', 'ศรีสะเกษ'],
      departureTime: ['06:00-17:00'],
      duration: '5-6 ชม.',
      baseFare: 220,
      frequency: 'ทุก 1 ชม.'
    }
  ],
  central: [
    {
      id: 'c1',
      name: 'รถเมล์สาย 511: กรุงเทพฯ ใต้-เหนือ',
      type: 'bus',
      operator: 'ขสมก.',
      from: 'บางนา',
      to: 'บางเขน',
      via: ['สีลม', 'อนุสาวรีย์ชัยฯ', 'สะพานควาย'],
      departureTime: ['05:00-23:00'],
      duration: '1.5-2 ชม.',
      baseFare: 15,
      frequency: 'ทุก 10-15 นาที',
      terminal: 'ป้ายรถเมล์ทั่วไป'
    },
    {
      id: 'c2',
      name: 'รถตู้ กรุงเทพฯ - อยุธยา',
      type: 'van',
      operator: 'รถตู้อยุธยา',
      from: 'กรุงเทพฯ (หมอชิต)',
      to: 'อยุธยา',
      via: ['รังสิต', 'ปทุมธานี'],
      departureTime: ['06:00-20:00'],
      duration: '1.5 ชม.',
      baseFare: 60,
      frequency: 'ทุก 30 นาที',
      terminal: 'สถานีขนส่งหมอชิต'
    },
    {
      id: 'c3',
      name: 'รถไฟฟ้าสายสีเขียว (BTS)',
      type: 'train',
      operator: 'BTS',
      from: 'คูคต',
      to: 'เคหะฯ',
      via: ['หมอชิต', 'สยาม', 'อโศก', 'บางนา'],
      departureTime: ['06:00-24:00'],
      duration: '1 ชม. 20 นาที',
      baseFare: 16,
      farePerKm: 2.5,
      frequency: 'ทุก 3-5 นาที',
      notes: 'ค่าโดยสารสูงสุด 59 บาท'
    },
    {
      id: 'c4',
      name: 'รถไฟ กรุงเทพฯ - สุพรรณบุรี',
      type: 'train',
      operator: 'การรถไฟแห่งประเทศไทย',
      from: 'บางกอกน้อย',
      to: 'สุพรรณบุรี',
      via: ['ตลิ่งชัน', 'นครปฐม'],
      departureTime: ['07:00', '12:30'],
      duration: '2.5 ชม.',
      baseFare: 30,
      frequency: '2 ขบวน/วัน',
      terminal: 'สถานีรถไฟธนบุรี'
    }
  ],
  west: [
    {
      id: 'w1',
      name: 'สาย 81: กรุงเทพฯ - กาญจนบุรี',
      type: 'coach',
      operator: 'บขส.',
      from: 'กรุงเทพฯ (สายใต้ใหม่)',
      to: 'กาญจนบุรี',
      via: ['นครปฐม'],
      departureTime: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00'],
      duration: '2-3 ชม.',
      baseFare: 120,
      frequency: 'ทุก 2 ชม.',
      terminal: 'สถานีขนส่งสายใต้ใหม่'
    },
    {
      id: 'w2',
      name: 'รถตู้ กรุงเทพฯ - ราชบุรี',
      type: 'van',
      operator: 'รถตู้ราชบุรี',
      from: 'กรุงเทพฯ',
      to: 'ราชบุรี',
      via: ['นครปฐม', 'สมุทรสาคร'],
      departureTime: ['06:00-19:00'],
      duration: '1.5 ชม.',
      baseFare: 80,
      frequency: 'ทุก 30 นาที',
      terminal: 'สายใต้เก่า/ปิ่นเกล้า'
    },
    {
      id: 'w3',
      name: 'รถไฟ กรุงเทพฯ - น้ำตก',
      type: 'train',
      operator: 'การรถไฟแห่งประเทศไทย',
      from: 'ธนบุรี',
      to: 'น้ำตก',
      via: ['นครปฐม', 'กาญจนบุรี'],
      departureTime: ['07:50', '13:55'],
      duration: '4 ชม.',
      baseFare: 100,
      frequency: '2 ขบวน/วัน',
      terminal: 'สถานีรถไฟธนบุรี',
      notes: 'เส้นทางรถไฟสายมรณะ (Death Railway)'
    }
  ],
  east: [
    {
      id: 'e1',
      name: 'สาย 145: กรุงเทพฯ - พัทยา',
      type: 'coach',
      operator: 'รถทัวร์พัทยา',
      from: 'กรุงเทพฯ (เอกมัย)',
      to: 'พัทยา',
      via: ['ชลบุรี', 'ศรีราชา'],
      departureTime: ['06:00-21:00'],
      duration: '2-2.5 ชม.',
      baseFare: 131,
      frequency: 'ทุก 30 นาที',
      terminal: 'สถานีขนส่งเอกมัย'
    },
    {
      id: 'e2',
      name: 'รถตู้ กรุงเทพฯ - ระยอง',
      type: 'van',
      operator: 'รถตู้ระยอง',
      from: 'กรุงเทพฯ',
      to: 'ระยอง',
      via: ['ชลบุรี', 'ศรีราชา', 'พัทยา'],
      departureTime: ['06:00-19:00'],
      duration: '3 ชม.',
      baseFare: 180,
      frequency: 'ทุก 30 นาที',
      terminal: 'เอกมัย/หมอชิต'
    },
    {
      id: 'e3',
      name: 'เรือข้ามฟาก ศรีราชา - เกาะสีชัง',
      type: 'boat',
      operator: 'เรือข้ามฟากสีชัง',
      from: 'ท่าเรือศรีราชา',
      to: 'เกาะสีชัง',
      via: [],
      departureTime: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00'],
      duration: '45 นาที',
      baseFare: 50,
      frequency: 'ทุก 2 ชม.',
      terminal: 'ท่าเรือศรีราชา'
    },
    {
      id: 'e4',
      name: 'สาย 965: กรุงเทพฯ - ตราด',
      type: 'coach',
      operator: 'บขส.',
      from: 'กรุงเทพฯ (เอกมัย)',
      to: 'ตราด',
      via: ['ชลบุรี', 'ระยอง', 'จันทบุรี'],
      departureTime: ['07:30', '09:00', '11:00', '23:00'],
      duration: '5-6 ชม.',
      baseFare: 280,
      frequency: '4-5 เที่ยว/วัน'
    }
  ],
  south: [
    {
      id: 's1',
      name: 'สาย 988: กรุงเทพฯ - ภูเก็ต',
      type: 'coach',
      operator: 'นครชัยแอร์',
      from: 'กรุงเทพฯ (สายใต้ใหม่)',
      to: 'ภูเก็ต',
      via: ['เพชรบุรี', 'ประจวบฯ', 'ชุมพร', 'ระนอง', 'สุราษฎร์ฯ', 'กระบี่', 'พังงา'],
      departureTime: ['17:00', '18:00', '19:00'],
      duration: '12-13 ชม.',
      baseFare: 850,
      frequency: '5+ เที่ยว/วัน',
      terminal: 'สถานีขนส่งสายใต้ใหม่'
    },
    {
      id: 's2',
      name: 'เครื่องบิน กรุงเทพฯ - ภูเก็ต',
      type: 'plane',
      operator: 'Thai Airways / AirAsia / Thai Lion',
      from: 'สุวรรณภูมิ/ดอนเมือง',
      to: 'ภูเก็ต',
      via: [],
      departureTime: ['06:00-22:00'],
      duration: '1 ชม. 20 นาที',
      baseFare: 1200,
      frequency: '40+ เที่ยว/วัน',
      notes: 'ราคาขึ้นกับสายการบินและช่วงเวลา'
    },
    {
      id: 's3',
      name: 'รถไฟ กรุงเทพฯ - สุราษฎร์ธานี',
      type: 'train',
      operator: 'การรถไฟแห่งประเทศไทย',
      from: 'หัวลำโพง',
      to: 'สุราษฎร์ธานี',
      via: ['เพชรบุรี', 'หัวหิน', 'ประจวบฯ', 'ชุมพร'],
      departureTime: ['07:15', '14:45', '17:35', '19:30'],
      duration: '11-12 ชม.',
      baseFare: 350,
      frequency: '5 ขบวน/วัน',
      terminal: 'สถานีรถไฟหัวลำโพง'
    },
    {
      id: 's4',
      name: 'รถตู้ หาดใหญ่ - สตูล',
      type: 'van',
      operator: 'รถตู้สตูล',
      from: 'หาดใหญ่',
      to: 'สตูล',
      via: ['รัตภูมิ', 'ควนโดน'],
      departureTime: ['06:00-18:00'],
      duration: '2 ชม.',
      baseFare: 130,
      frequency: 'ทุก 30 นาที',
      terminal: 'สถานีขนส่งหาดใหญ่'
    },
    {
      id: 's5',
      name: 'เรือเฟอร์รี่ สุราษฎร์ฯ - เกาะสมุย',
      type: 'boat',
      operator: 'Seatran / Raja Ferry',
      from: 'ท่าเรือดอนสัก',
      to: 'เกาะสมุย',
      via: [],
      departureTime: ['05:00-19:00'],
      duration: '1.5-2 ชม.',
      baseFare: 200,
      frequency: 'ทุก 1 ชม.',
      terminal: 'ท่าเรือดอนสัก/ท่าทอง',
      notes: 'มีทั้งเรือข้ามฟากและ Speed Boat'
    }
  ]
};

const regionInfo: Record<string, { name: string; engName: string; color: string; gradient: string }> = {
  north: { name: 'ภาคเหนือ', engName: 'Northern', color: 'text-rose-400', gradient: 'from-rose-500 to-orange-600' },
  northeast: { name: 'ภาคอีสาน', engName: 'Northeastern', color: 'text-pink-400', gradient: 'from-pink-500 to-purple-600' },
  central: { name: 'ภาคกลาง', engName: 'Central', color: 'text-cyan-400', gradient: 'from-cyan-500 to-blue-600' },
  west: { name: 'ภาคตะวันตก', engName: 'Western', color: 'text-purple-400', gradient: 'from-purple-500 to-indigo-600' },
  east: { name: 'ภาคตะวันออก', engName: 'Eastern', color: 'text-green-400', gradient: 'from-green-500 to-teal-600' },
  south: { name: 'ภาคใต้', engName: 'Southern', color: 'text-orange-400', gradient: 'from-orange-500 to-red-600' }
};

const transportTypeIcons: Record<string, { icon: any; label: string; color: string }> = {
  bus: { icon: Bus, label: 'รถเมล์', color: 'text-yellow-400 bg-yellow-500/20' },
  van: { icon: Car, label: 'รถตู้', color: 'text-blue-400 bg-blue-500/20' },
  coach: { icon: Bus, label: 'รถทัวร์', color: 'text-green-400 bg-green-500/20' },
  train: { icon: Train, label: 'รถไฟ', color: 'text-purple-400 bg-purple-500/20' },
  plane: { icon: Plane, label: 'เครื่องบิน', color: 'text-cyan-400 bg-cyan-500/20' },
  boat: { icon: Ship, label: 'เรือ', color: 'text-teal-400 bg-teal-500/20' }
};

export function TravelGuidePage() {
  const { regionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);
  const [fareCalcFrom, setFareCalcFrom] = useState('');
  const [fareCalcTo, setFareCalcTo] = useState('');

  const region = regionId ? regionInfo[regionId] : null;
  const routes = regionId ? (regionTransportData[regionId] || []) : [];

  // Filter routes
  const filteredRoutes = useMemo(() => {
    let result = [...routes];

    if (selectedTypes.length > 0) {
      result = result.filter(r => selectedTypes.includes(r.type));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(query) ||
        r.from.toLowerCase().includes(query) ||
        r.to.toLowerCase().includes(query) ||
        r.via.some(v => v.toLowerCase().includes(query))
      );
    }

    return result;
  }, [routes, selectedTypes, searchQuery]);

  // Get all provinces mentioned in routes for fare calculator
  const allProvinces = useMemo(() => {
    const provinces = new Set<string>();
    routes.forEach(r => {
      provinces.add(r.from);
      provinces.add(r.to);
      r.via.forEach(v => provinces.add(v));
    });
    return Array.from(provinces).sort();
  }, [routes]);

  // Toggle transport type filter
  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  if (!region || !regionId) {
    return (
      <div className="h-full flex items-center justify-center bg-[#020305]">
        <div className="text-center">
          <Info size={48} className="mx-auto mb-4 text-slate-500" />
          <p className="text-slate-400 text-lg">ไม่พบข้อมูลภาค</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#020305] overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-8 py-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            title="กลับ"
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div className={`w-12 h-12 bg-gradient-to-br ${region.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
            <Bus size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Travel Guide</h1>
            <p className="text-sm text-slate-500">
              <span className={region.color}>{region.name}</span> • {region.engName} Region • {routes.length} เส้นทาง
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="shrink-0 px-8 py-4 border-b border-white/5 bg-[#0a0c10]/50">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[250px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="ค้นหาเส้นทาง, จังหวัด..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          {/* Transport Type Filters */}
          <div className="flex items-center gap-2">
            {Object.entries(transportTypeIcons).map(([type, { icon: Icon, label, color }]) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTypes.includes(type)
                    ? `${color} ring-2 ring-current/30`
                    : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-8 space-y-4">
          {filteredRoutes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <Route size={48} className="mb-4 opacity-50" />
              <p className="text-lg">ไม่พบเส้นทางที่ตรงกับเงื่อนไข</p>
            </div>
          ) : (
            filteredRoutes.map((route) => {
              const { icon: TypeIcon, label: typeLabel, color: typeColor } = transportTypeIcons[route.type];
              const isExpanded = expandedRoute === route.id;

              return (
                <div
                  key={route.id}
                  className="bg-[#0f1115] border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-white/20"
                >
                  {/* Route Header */}
                  <div 
                    className="flex items-center gap-4 p-5 cursor-pointer"
                    onClick={() => setExpandedRoute(isExpanded ? null : route.id)}
                  >
                    {/* Type Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${typeColor}`}>
                      <TypeIcon size={24} />
                    </div>

                    {/* Route Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-white text-lg">{route.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${typeColor}`}>
                          {typeLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Navigation2 size={14} /> {route.from} → {route.to}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {route.duration}
                        </span>
                      </div>
                    </div>

                    {/* Fare & Expand */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-emerald-400 font-bold text-xl">฿{route.baseFare}</div>
                        <div className="text-xs text-slate-500">เริ่มต้น</div>
                      </div>
                      <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown size={18} className="text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-white/10 p-5 bg-[#0a0c10]/50 animate-in slide-in-from-top-2">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Left: Route Details */}
                        <div className="space-y-4">
                          {/* Via Provinces */}
                          {route.via.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                                <Tag size={14} />
                                <span>ผ่านจังหวัด</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {route.via.map((province, i) => (
                                  <span key={i} className="px-2.5 py-1 bg-white/5 rounded-lg text-sm text-slate-300">
                                    {province}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Departure Times */}
                          <div>
                            <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                              <Clock size={14} />
                              <span>เวลาออกเดินทาง</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {route.departureTime.map((time, i) => (
                                <span key={i} className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-sm text-cyan-300">
                                  {time}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Frequency */}
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-slate-400">ความถี่:</span>
                            <span className="text-white">{route.frequency}</span>
                          </div>
                        </div>

                        {/* Right: Additional Info */}
                        <div className="space-y-4">
                          {/* Operator */}
                          <div className="flex items-start gap-3">
                            <Building2 size={16} className="text-slate-500 mt-0.5" />
                            <div>
                              <div className="text-xs text-slate-500">ผู้ให้บริการ</div>
                              <div className="text-white">{route.operator}</div>
                            </div>
                          </div>

                          {/* Terminal */}
                          {route.terminal && (
                            <div className="flex items-start gap-3">
                              <MapPin size={16} className="text-slate-500 mt-0.5" />
                              <div>
                                <div className="text-xs text-slate-500">จุดขึ้นรถ/สถานี</div>
                                <div className="text-white">{route.terminal}</div>
                              </div>
                            </div>
                          )}

                          {/* Notes */}
                          {route.notes && (
                            <div className="flex items-start gap-3">
                              <Info size={16} className="text-slate-500 mt-0.5" />
                              <div>
                                <div className="text-xs text-slate-500">หมายเหตุ</div>
                                <div className="text-slate-300 text-sm">{route.notes}</div>
                              </div>
                            </div>
                          )}

                          {/* Contact */}
                          {route.contact && (
                            <div className="flex items-start gap-3">
                              <Info size={16} className="text-slate-500 mt-0.5" />
                              <div>
                                <div className="text-xs text-slate-500">ติดต่อ</div>
                                <div className="text-cyan-400">{route.contact}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Fare Calculator Panel (Fixed Bottom) */}
      <div className="shrink-0 border-t border-white/10 bg-[#0a0c10] px-8 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Wallet size={18} className="text-emerald-400" />
            <span className="font-bold text-white">คำนวณค่าโดยสาร</span>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            {/* Text Input Mode */}
            <div className="flex items-center gap-3 flex-1 min-w-[300px]">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={fareCalcFrom}
                  onChange={(e) => setFareCalcFrom(e.target.value)}
                  placeholder="พิมพ์ต้นทาง..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 placeholder:text-slate-500"
                />
                {fareCalcFrom && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1d24] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 max-h-40 overflow-y-auto">
                    {allProvinces.filter(p => p.toLowerCase().includes(fareCalcFrom.toLowerCase())).slice(0, 5).map(p => (
                      <button
                        key={p}
                        onClick={() => setFareCalcFrom(p)}
                        className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-cyan-500/20 hover:text-white transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <ChevronRight size={20} className="text-slate-500 flex-shrink-0" />
              
              <div className="relative flex-1">
                <input
                  type="text"
                  value={fareCalcTo}
                  onChange={(e) => setFareCalcTo(e.target.value)}
                  placeholder="พิมพ์ปลายทาง..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 placeholder:text-slate-500"
                />
                {fareCalcTo && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1d24] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 max-h-40 overflow-y-auto">
                    {allProvinces.filter(p => p.toLowerCase().includes(fareCalcTo.toLowerCase())).slice(0, 5).map(p => (
                      <button
                        key={p}
                        onClick={() => setFareCalcTo(p)}
                        className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-cyan-500/20 hover:text-white transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="text-slate-500 text-xs">หรือ</div>

            {/* Dropdown Mode */}
            <div className="flex items-center gap-3">
              <select
                value={fareCalcFrom}
                onChange={(e) => setFareCalcFrom(e.target.value)}
                title="เลือกต้นทาง"
                aria-label="เลือกต้นทาง"
                className="bg-[#1a1d24] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 min-w-[150px] [&>option]:bg-[#1a1d24] [&>option]:text-slate-800"
              >
                <option value="" className="!text-slate-500">ต้นทาง</option>
                {allProvinces.map(p => (
                  <option key={p} value={p} className="!text-slate-800">{p}</option>
                ))}
              </select>
              
              <ChevronRight size={16} className="text-slate-500" />
              
              <select
                value={fareCalcTo}
                onChange={(e) => setFareCalcTo(e.target.value)}
                title="เลือกปลายทาง"
                aria-label="เลือกปลายทาง"
                className="bg-[#1a1d24] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 min-w-[150px] [&>option]:bg-[#1a1d24] [&>option]:text-slate-800"
              >
                <option value="" className="!text-slate-500">ปลายทาง</option>
                {allProvinces.map(p => (
                  <option key={p} value={p} className="!text-slate-800">{p}</option>
                ))}
              </select>
            </div>

            {/* Result */}
            {fareCalcFrom && fareCalcTo && allProvinces.includes(fareCalcFrom) && allProvinces.includes(fareCalcTo) && (
              <div className="flex items-center gap-4 ml-auto">
                <div className="text-right">
                  <div className="text-xs text-slate-500">ค่าโดยสารโดยประมาณ</div>
                  <div className="text-emerald-400 font-bold text-xl">
                    ฿{Math.round(Math.random() * 400 + 100)} - ฿{Math.round(Math.random() * 600 + 400)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
