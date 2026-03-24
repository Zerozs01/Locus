import { useState, useMemo, useDeferredValue } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Bus, Train, Car, MapPin, ArrowLeft, Clock,
  Route, ChevronRight, ChevronDown, Info, Navigation2,
  Building2, Plane, Ship, Search, Tag, ShieldAlert,
  AlertTriangle, Mountain, Radio, Gauge, Droplets, Wallet
} from 'lucide-react';
import { regionTheme, type RegionId } from '../data/regionTheme';

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

type TacticalRisk = 'Low' | 'Moderate' | 'High' | 'Critical';

interface TacticalRoute extends TransportRoute {
  corridorLabel: string;
  riskLevel: TacticalRisk;
  riskScore: number;
  exposureLabel: string;
  preferredWindow: string;
  terrainNote: string;
  resupplyNodes: string[];
  chokePoints: string[];
  safeFallback: string;
  standbyAdvice: string;
  estSupplyBurn: number;
}

const buildMatcher = (query: string): ((value: string) => boolean) | null => {
  const trimmed = query.trim();
  if (!trimmed) return null;
  try {
    const regex = new RegExp(trimmed, 'i');
    return (value: string) => regex.test(value);
  } catch {
    const lower = trimmed.toLowerCase();
    return (value: string) => value.toLowerCase().includes(lower);
  }
};

const corridorLabels: Record<TransportRoute['type'], string> = {
  bus: 'Ground Link',
  van: 'Rapid Van',
  coach: 'Convoy Corridor',
  train: 'Rail Corridor',
  plane: 'Airlift Lane',
  boat: 'Water Crossing'
};

const regionRiskBase: Record<RegionId, number> = {
  north: 2,
  northeast: 3,
  central: 4,
  east: 3,
  west: 2,
  south: 2
};

const typeRiskBias: Record<TransportRoute['type'], number> = {
  bus: 1,
  van: 1,
  coach: 0,
  train: 0,
  plane: -1,
  boat: 1
};

const preferredWindows: Record<TransportRoute['type'], string> = {
  bus: '04:30-06:30 / 20:00-22:00',
  van: '04:00-05:30 / 19:00-21:00',
  coach: '03:30-05:30 / 18:30-20:30',
  train: '04:30-06:00 / 17:30-19:30',
  plane: '05:00-07:00 / 16:30-18:00',
  boat: '05:00-07:00 / 15:30-17:00'
};

const terrainNotes: Record<RegionId, string[]> = {
  north: ['ridge ascent + fog pockets', 'mountain pass with limited radio coverage', 'forest edge corridor with steep runoff'],
  northeast: ['open plateau, exposure to long sight lines', 'dry farmland corridor with sparse concealment', 'heat-stressed arterial road across flat terrain'],
  central: ['urban belt with multiple choke bridges', 'industrial plain with heavy civilian congestion', 'river-crossing corridor and layered road access'],
  east: ['coastal freight lane with port congestion', 'industrial strip with refinery bottlenecks', 'mixed hill-coast road with limited bypass'],
  west: ['river valley corridor with border checkpoints', 'forest road with narrow bridge crossings', 'mountain-forest mix and low lighting'],
  south: ['peninsula corridor with long coastal exposure', 'ferry-dependent crossing near island links', 'rain-heavy road segment with flood-prone shoulders']
};

const fallbackZones: Record<RegionId, string[]> = {
  north: ['upland temple compound', 'forest ranger station', 'ridge reservoir camp'],
  northeast: ['community silo yard', 'provincial hospital perimeter', 'high-ground irrigation hub'],
  central: ['elevated logistics hub', 'military perimeter road', 'outer-ring service depot'],
  east: ['port warehouse roofline', 'drydock service yard', 'hilltop communications post'],
  west: ['dam operations compound', 'border patrol outpost', 'riverside fuel depot'],
  south: ['coastal hill shrine', 'district hospital high wing', 'naval pier service block']
};

const durationToHours = (duration: string): number => {
  const matches = [...duration.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) => Number(match[1]));
  if (matches.length === 0) return 1;
  if (matches.length === 1) return matches[0];
  return (matches[0] + matches[matches.length - 1]) / 2;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const unique = <T,>(items: T[]) => Array.from(new Set(items));

const getRiskClasses = (risk: TacticalRisk) => {
  switch (risk) {
    case 'Low':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300';
    case 'Moderate':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-300';
    case 'High':
      return 'border-orange-500/20 bg-orange-500/10 text-orange-300';
    default:
      return 'border-red-500/20 bg-red-500/10 text-red-300';
  }
};

const buildTacticalRoute = (route: TransportRoute, regionId: RegionId, index: number): TacticalRoute => {
  const hours = durationToHours(route.duration);
  const complexity = route.via.length >= 5 ? 1 : route.via.length >= 3 ? 0.5 : 0;
  const timePenalty = hours > 10 ? 1 : hours > 6 ? 0.5 : 0;
  const riskScore = clamp(Math.round(regionRiskBase[regionId] + typeRiskBias[route.type] + complexity + timePenalty), 1, 4);
  const riskLevel: TacticalRisk = ['Low', 'Moderate', 'High', 'Critical'][riskScore - 1] as TacticalRisk;
  const resupplyNodes = unique([...route.via.slice(0, 2), route.to]).slice(0, 3);
  const chokePoints = unique([route.terminal || route.from, route.via.at(-1) || route.to]).slice(0, 2);

  return {
    ...route,
    corridorLabel: corridorLabels[route.type],
    riskLevel,
    riskScore,
    exposureLabel: riskScore === 1 ? 'ต่ำ' : riskScore === 2 ? 'กลาง' : riskScore === 3 ? 'สูง' : 'วิกฤต',
    preferredWindow: preferredWindows[route.type],
    terrainNote: terrainNotes[regionId][index % terrainNotes[regionId].length],
    resupplyNodes,
    chokePoints,
    safeFallback: fallbackZones[regionId][index % fallbackZones[regionId].length],
    standbyAdvice: riskScore >= 3
      ? 'แบ่ง movement เป็นช่วงสั้นและเตรียมจุดแยกตัวทุก 90 นาที'
      : 'คง formation และเติมน้ำ/เช็กวิทยุก่อนออกจาก node หลัก',
    estSupplyBurn: Math.max(1, Math.round(hours * (riskScore >= 3 ? 2.2 : 1.4)))
  };
};

const routeContainsSequence = (route: TacticalRoute, from: string, to: string) => {
  const normalize = (value: string) => value.trim().toLowerCase();
  const nodes = [route.from, ...route.via, route.to].map(normalize);
  const fromIndex = nodes.indexOf(normalize(from));
  if (fromIndex === -1) return false;
  const toIndex = nodes.indexOf(normalize(to), fromIndex + 1);
  return toIndex !== -1;
};

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

const transportTypeIcons: Record<string, { icon: any; label: string; color: string }> = {
  bus: { icon: Bus, label: 'รถโดยสาร', color: 'text-amber-300 bg-amber-500/15 border border-amber-500/20' },
  van: { icon: Car, label: 'รถตู้', color: 'text-sky-300 bg-sky-500/15 border border-sky-500/20' },
  coach: { icon: Bus, label: 'รถทัวร์', color: 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/20' },
  train: { icon: Train, label: 'รถไฟ', color: 'text-violet-300 bg-violet-500/15 border border-violet-500/20' },
  plane: { icon: Plane, label: 'เครื่องบิน', color: 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/20' },
  boat: { icon: Ship, label: 'เรือ', color: 'text-teal-300 bg-teal-500/15 border border-teal-500/20' }
};

export function TravelGuidePage() {
  const { regionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);
  const [routeCheckFrom, setRouteCheckFrom] = useState('');
  const [routeCheckTo, setRouteCheckTo] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const deferredRouteCheckFrom = useDeferredValue(routeCheckFrom);
  const deferredRouteCheckTo = useDeferredValue(routeCheckTo);

  const region = useMemo(
    () => (regionId ? regionTheme[regionId as RegionId] : null),
    [regionId]
  );
  const routes = useMemo(
    () => (regionId ? (regionTransportData[regionId] || []).map((route, index) => buildTacticalRoute(route, regionId as RegionId, index)) : []),
    [regionId]
  );

  const routesWithSearchText = useMemo(() => {
    return routes.map((route) => ({
      ...route,
      searchText: [
        route.name,
        route.corridorLabel,
        route.riskLevel,
        route.operator,
        route.from,
        route.to,
        route.safeFallback,
        ...(route.via || [])
      ].join(' • ')
    }));
  }, [routes]);

  // Filter routes
  const filteredRoutes = useMemo(() => {
    let result = [...routesWithSearchText];

    if (selectedTypes.length > 0) {
      result = result.filter(r => selectedTypes.includes(r.type));
    }

    const matcher = buildMatcher(deferredSearchQuery);
    if (matcher) {
      result = result.filter(r => matcher(r.searchText));
    }

    return result;
  }, [routesWithSearchText, selectedTypes, deferredSearchQuery]);

  const routeSummary = useMemo(() => {
    const recommended = routes.filter(route => route.riskScore <= 2).length;
    const highRisk = routes.filter(route => route.riskScore >= 3).length;
    const fallbacks = new Set(routes.map(route => route.safeFallback)).size;
    return { recommended, highRisk, fallbacks };
  }, [routes]);

  // Get all nodes mentioned in routes for readiness check
  const allNodes = useMemo(() => {
    const provinces = new Set<string>();
    routes.forEach(r => {
      provinces.add(r.from);
      provinces.add(r.to);
      r.via.forEach(v => provinces.add(v));
    });
    return Array.from(provinces).sort();
  }, [routes]);

  const allNodesSet = useMemo(() => new Set(allNodes), [allNodes]);

  const fromSuggestions = useMemo(() => {
    const matcher = buildMatcher(deferredRouteCheckFrom);
    if (!matcher) return [];
    return allNodes.filter(p => matcher(p)).slice(0, 5);
  }, [allNodes, deferredRouteCheckFrom]);

  const toSuggestions = useMemo(() => {
    const matcher = buildMatcher(deferredRouteCheckTo);
    if (!matcher) return [];
    return allNodes.filter(p => matcher(p)).slice(0, 5);
  }, [allNodes, deferredRouteCheckTo]);

  const readinessResult = useMemo(() => {
    if (!routeCheckFrom || !routeCheckTo) return null;
    if (!allNodesSet.has(routeCheckFrom) || !allNodesSet.has(routeCheckTo)) return null;

    const exactMatches = routes.filter(route => routeContainsSequence(route, routeCheckFrom, routeCheckTo));
    const fallbackMatches = exactMatches.length > 0
      ? exactMatches
      : routes.filter(route => {
          const nodes = [route.from, ...route.via, route.to];
          return nodes.includes(routeCheckFrom) || nodes.includes(routeCheckTo);
        });

    if (fallbackMatches.length === 0) {
      return { mode: 'none' as const };
    }

    const bestRoute = [...fallbackMatches].sort((a, b) => {
      if (a.riskScore !== b.riskScore) return a.riskScore - b.riskScore;
      if (a.estSupplyBurn !== b.estSupplyBurn) return a.estSupplyBurn - b.estSupplyBurn;
      return durationToHours(a.duration) - durationToHours(b.duration);
    })[0];

    return {
      mode: exactMatches.length > 0 ? 'exact' as const : 'fallback' as const,
      bestRoute,
      totalMatches: fallbackMatches.length
    };
  }, [allNodesSet, routeCheckFrom, routeCheckTo, routes]);

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
    <div className="h-full w-full flex-1 min-w-0 flex flex-col bg-[#020305] overflow-hidden">
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
          <div className={`w-12 h-12 bg-gradient-to-br ${region.heroGradient} rounded-2xl flex items-center justify-center shadow-lg`}>
            <Route size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Travel Guide</h1>
            <p className="text-sm text-slate-500">
              <span className={region.text}>{region.label}</span> • {region.engLabel} Region • {routes.length} เส้นทางเดินทาง + tactical overlay สำหรับวางแผนล่วงหน้า
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
              placeholder="ค้นหาเส้นทาง, จังหวัด, fallback..."
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
                    ? `${color} ring-2 ring-current/20`
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
        <div className="p-8 space-y-4 w-full">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/8 bg-[#0f1115] p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                <Route size={14} className="text-emerald-400" />
                Active Routes
              </div>
              <div className="text-2xl font-black text-white">{routes.length}</div>
              <div className="text-xs text-slate-500">เส้นทางปกติที่เปิดให้วางแผนล่วงหน้า</div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-[#0f1115] p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                <AlertTriangle size={14} className="text-orange-400" />
                Tactical Alerts
              </div>
              <div className="text-2xl font-black text-white">{routeSummary.highRisk}</div>
              <div className="text-xs text-slate-500">เส้นทางที่ควรเช็ก fallback ก่อนออกเดินทาง</div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-[#0f1115] p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                <MapPin size={14} className="text-sky-400" />
                Fallback Zones
              </div>
              <div className="text-2xl font-black text-white">{routeSummary.fallbacks}</div>
              <div className="text-xs text-slate-500">จุดสำรองสำหรับใช้เมื่อแผนหลักสะดุด</div>
            </div>
          </div>

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
                  className="bg-[#0f1115] border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-white/20 w-full"
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
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-bold text-slate-300">
                          {route.corridorLabel}
                        </span>
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${getRiskClasses(route.riskLevel)}`}>
                          {route.riskLevel}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Navigation2 size={14} /> {route.from} → {route.to}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {route.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Wallet size={14} /> ฿{route.baseFare}
                        </span>
                      </div>
                    </div>

                    {/* Travel + Tactical Summary & Expand */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-emerald-300 font-bold text-xl">฿{route.baseFare}</div>
                        <div className="text-xs text-slate-500">{route.estSupplyBurn}u supply burn</div>
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
                                <span>จังหวัดที่ผ่าน</span>
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

                          {/* Safe Windows */}
                          <div>
                            <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                              <Clock size={14} />
                              <span>ช่วงเวลาแนะนำ</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-300">
                                {route.preferredWindow}
                              </span>
                              {route.departureTime.map((time, i) => (
                                <span key={i} className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-sm text-cyan-300">
                                  {time}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-slate-400">ความถี่:</span>
                            <span className="text-white">{route.frequency}</span>
                          </div>

                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-slate-400">Terrain:</span>
                            <span className="text-white">{route.terrainNote}</span>
                          </div>

                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-slate-400">Exposure:</span>
                            <span className="text-white">{route.exposureLabel}</span>
                          </div>
                        </div>

                        {/* Right: Additional Info */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Building2 size={16} className="text-slate-500 mt-0.5" />
                            <div>
                              <div className="text-xs text-slate-500">ผู้ให้บริการ</div>
                              <div className="text-white">{route.operator}</div>
                            </div>
                          </div>

                          {route.terminal && (
                            <div className="flex items-start gap-3">
                              <MapPin size={16} className="text-slate-500 mt-0.5" />
                              <div>
                                <div className="text-xs text-slate-500">จุดขึ้นรถ / สถานี</div>
                                <div className="text-white">{route.terminal}</div>
                              </div>
                            </div>
                          )}

                          <div>
                            <div className="mb-2 text-xs text-slate-500">Choke Points</div>
                            <div className="flex flex-wrap gap-2">
                              {route.chokePoints.map((point) => (
                                <span key={point} className="rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-sm text-red-300">
                                  {point}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="mb-2 text-xs text-slate-500">Resupply Nodes</div>
                            <div className="flex flex-wrap gap-2">
                              {route.resupplyNodes.map((node) => (
                                <span key={node} className="rounded-lg border border-sky-500/20 bg-sky-500/10 px-2.5 py-1 text-sm text-sky-300">
                                  {node}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <ShieldAlert size={16} className="text-slate-500 mt-0.5" />
                            <div>
                              <div className="text-xs text-slate-500">Fallback Zone</div>
                              <div className="text-white">{route.safeFallback}</div>
                            </div>
                          </div>

                          {route.notes && (
                            <div className="flex items-start gap-3">
                              <Info size={16} className="text-slate-500 mt-0.5" />
                              <div>
                                <div className="text-xs text-slate-500">หมายเหตุการเดินทาง</div>
                                <div className="text-slate-300 text-sm">{route.notes}</div>
                                <div className="mt-1 text-sm text-slate-400">{route.standbyAdvice}</div>
                              </div>
                            </div>
                          )}

                          {route.contact && (
                            <div className="flex items-start gap-3">
                              <Radio size={16} className="text-slate-500 mt-0.5" />
                              <div>
                                <div className="text-xs text-slate-500">ติดต่อ / ช่องทางสำรอง</div>
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

      {/* Route Readiness Panel */}
      <div className="shrink-0 border-t border-white/10 bg-[#0a0c10] px-8 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Gauge size={18} className="text-emerald-400" />
            <span className="font-bold text-white">Travel + Readiness Check</span>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            {/* Text Input Mode */}
            <div className="flex items-center gap-3 flex-1 min-w-[300px]">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={routeCheckFrom}
                  onChange={(e) => setRouteCheckFrom(e.target.value)}
                  placeholder="ต้นทาง..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-violet-300 placeholder:text-violet-500/60 focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
                />
                {routeCheckFrom && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#0f1115] border border-violet-500/30 rounded-xl overflow-hidden shadow-2xl z-50 max-h-48 overflow-y-auto">
                    {fromSuggestions.map(p => (
                      <button
                        key={p}
                        onClick={() => setRouteCheckFrom(p)}
                        className="w-full px-4 py-2 text-left text-sm text-violet-200 hover:bg-violet-500/20 hover:text-white transition-colors"
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
                  value={routeCheckTo}
                  onChange={(e) => setRouteCheckTo(e.target.value)}
                  placeholder="ปลายทาง..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-sky-300 placeholder:text-sky-500/60 focus:outline-none focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20"
                />
                {routeCheckTo && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#0f1115] border border-sky-500/30 rounded-xl overflow-hidden shadow-2xl z-50 max-h-48 overflow-y-auto">
                    {toSuggestions.map(p => (
                      <button
                        key={p}
                        onClick={() => setRouteCheckTo(p)}
                        className="w-full px-4 py-2 text-left text-sm text-sky-200 hover:bg-sky-500/20 hover:text-white transition-colors"
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
                value={routeCheckFrom}
                onChange={(e) => setRouteCheckFrom(e.target.value)}
                title="เลือกต้นทาง"
                aria-label="เลือกต้นทาง"
                className="bg-[#1a1d24] border border-violet-500/30 rounded-xl px-4 py-2.5 text-violet-300 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 min-w-[150px] [&>option]:bg-[#1a1d24] [&>option]:text-slate-200"
              >
                <option value="" className="!text-slate-500">ต้นทาง</option>
                {allNodes.map(p => (
                  <option key={p} value={p} className="!text-slate-200">{p}</option>
                ))}
              </select>
              
              <ChevronRight size={16} className="text-slate-500" />
              
              <select
                value={routeCheckTo}
                onChange={(e) => setRouteCheckTo(e.target.value)}
                title="เลือกปลายทาง"
                aria-label="เลือกปลายทาง"
                className="bg-[#1a1d24] border border-sky-500/30 rounded-xl px-4 py-2.5 text-sky-300 text-sm focus:outline-none focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20 min-w-[150px] [&>option]:bg-[#1a1d24] [&>option]:text-slate-200"
              >
                <option value="" className="!text-slate-500">ปลายทาง</option>
                {allNodes.map(p => (
                  <option key={p} value={p} className="!text-slate-200">{p}</option>
                ))}
              </select>
            </div>

            {/* Result */}
            {readinessResult && (
              <div className="ml-auto min-w-[320px] rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3">
                {readinessResult.mode === 'none' ? (
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <AlertTriangle size={16} className="text-orange-400" />
                    ไม่พบ route ตรง ควรวางแผนต่อเชื่อมหลายช่วงหรือเตรียม fallback เพิ่ม
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Best Route</div>
                      <div className="mt-1 text-sm font-bold text-white">{readinessResult.bestRoute.name}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Risk</div>
                      <div className="mt-1 text-sm font-bold text-white">{readinessResult.bestRoute.riskLevel}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Fare / Supply</div>
                      <div className="mt-1 text-sm font-bold text-amber-300">
                        ฿{readinessResult.bestRoute.baseFare}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-xs font-bold text-sky-300">
                        <Droplets size={12} /> {readinessResult.bestRoute.estSupplyBurn}u
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Fallback</div>
                      <div className="mt-1 text-sm font-bold text-white">{readinessResult.bestRoute.safeFallback}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
