/**
 * Province-level transport, supply, accommodation & portal data
 * All stored offline — warp URLs open official websites in system browser
 */

export interface TransportCompany {
  name: string;
  shortName: string;
  type: 'rail' | 'bus' | 'van' | 'boat' | 'bike' | 'plane' | 'other';
  description: string;
  warpUrl: string;
  logoText: string; // emoji or short abbreviation for display
  color: string; // hex accent
}

export interface SupplyPoint {
  type: 'bank' | 'gas' | 'toilet' | 'water' | 'pharmacy' | 'police';
  label: string;
  note: string;
}

export interface AccommodationTier {
  tier: 'budget' | 'midrange' | 'premium';
  label: string;
  priceRange: string;
  examples: string[];
  bookingUrl?: string;
}

export interface DangerZone {
  label: string;
  severity: 'low' | 'medium' | 'high';
  note: string;
}

export interface LocalFood {
  name: string;
  priceRange: string;
  note?: string;
}

export interface EnvironmentInfo {
  animals: string[];
  plants: string[];
  terrain: string;
  climate: string;
}

export interface KnowledgeTip {
  title: string;
  content: string;
}

export interface ProvincePortalData {
  transport: {
    tabs: { id: string; label: string }[];
    companies: Record<string, TransportCompany[]>;
    others?: TransportCompany[];
  };
  environment: EnvironmentInfo;
  localFoods: LocalFood[];
  knowledge: KnowledgeTip[];
  dangerZones: DangerZone[];
  supply: SupplyPoint[];
  accommodation: AccommodationTier[];
  emergencyNumbers: { label: string; number: string }[];
}

// ====== Default province data (fallback for any province) ======
const defaultPortal: ProvincePortalData = {
  transport: {
    tabs: [
      { id: 'bus', label: 'รถเมล์/รถตู้' },
      { id: 'other', label: 'อื่นๆ' }
    ],
    companies: {
      bus: [
        { name: 'บขส. (บริษัทขนส่ง จำกัด)', shortName: 'บขส.', type: 'bus', description: 'รถโดยสารประจำทางระหว่างจังหวัด', warpUrl: 'https://home.transport.co.th/', logoText: '🚌', color: '#f59e0b' }
      ]
    }
  },
  environment: { animals: ['สุนัข/แมวจรจัด'], plants: ['ไม้ยืนต้นทั่วไป'], terrain: 'ที่ราบ', climate: 'ร้อนชื้น' },
  localFoods: [{ name: 'อาหารตามสั่ง', priceRange: '40-80฿' }],
  knowledge: [{ title: 'เตรียมน้ำดื่ม', content: 'พกน้ำดื่มอย่างน้อย 1 ลิตรต่อชั่วโมง' }],
  dangerZones: [],
  supply: [
    { type: 'bank', label: 'ธนาคาร / ATM', note: 'มีทุกอำเภอ' },
    { type: 'gas', label: 'ปั๊มน้ำมัน', note: 'ตามถนนหลัก' },
    { type: 'toilet', label: 'ห้องน้ำสาธารณะ', note: 'ปั๊มน้ำมัน/ห้างสรรพสินค้า' }
  ],
  accommodation: [
    { tier: 'budget', label: 'ประหยัด', priceRange: '300-800฿/คืน', examples: ['เกสต์เฮาส์', 'โฮสเทล'] },
    { tier: 'midrange', label: 'ปานกลาง', priceRange: '800-2,500฿/คืน', examples: ['โรงแรม 3 ดาว'] },
    { tier: 'premium', label: 'หรูหรา', priceRange: '2,500-10,000+฿/คืน', examples: ['โรงแรม 5 ดาว', 'รีสอร์ต'] }
  ],
  emergencyNumbers: [
    { label: 'ตำรวจท่องเที่ยว', number: '1155' },
    { label: 'แพทย์ฉุกเฉิน', number: '1669' },
    { label: 'ดับเพลิง', number: '199' }
  ]
};

// ====== Bangkok / Central province data ======
const bangkokPortal: ProvincePortalData = {
  transport: {
    tabs: [
      { id: 'rail', label: 'รถไฟฟ้า' },
      { id: 'bus', label: 'รถเมล์และรถตู้' },
      { id: 'boat', label: 'เรือ/วินมอเตอร์ไซค์' }
    ],
    companies: {
      rail: [
        { name: 'BTS สายสีเขียว / สายสีทอง', shortName: 'BTS', type: 'rail', description: 'รถไฟฟ้าสายสีเขียว (หมอชิต-เคหะฯ) / สายสีทอง', warpUrl: 'https://www.bts.co.th/', logoText: 'BTS', color: '#22c55e' },
        { name: 'MRT สายสีน้ำเงิน / สายสีม่วง', shortName: 'BEM', type: 'rail', description: 'รถไฟฟ้าใต้ดิน (หัวลำโพง-หลักสอง-ท่าพระ)', warpUrl: 'https://www.bemplc.co.th/', logoText: 'BEM', color: '#3b82f6' },
        { name: 'Airport Rail Link (แอร์พอร์ตเรลลิงก์)', shortName: 'ARL', type: 'rail', description: 'รถไฟฟ้าเชื่อมสนามบินสุวรรณภูมิ', warpUrl: 'https://www.srtet.co.th/', logoText: 'ARL', color: '#ef4444' }
      ],
      bus: [
        { name: 'ขสมก. (องค์การขนส่งมวลชนกรุงเทพ)', shortName: 'ขสมก.', type: 'bus', description: 'รถเมล์สาธารณะทั่วกรุงเทพฯ', warpUrl: 'https://www.bmta.co.th/', logoText: '🚌', color: '#f59e0b' },
        { name: 'ViaBus (แอปรถเมล์)', shortName: 'ViaBus', type: 'bus', description: 'ติดตามรถเมล์แบบ real-time', warpUrl: 'https://www.viabus.co/', logoText: '📱', color: '#a855f7' },
        { name: 'รถตู้หมอชิต / สายใต้ / เอกมัย', shortName: 'รถตู้', type: 'van', description: 'รถตู้ปรับอากาศระหว่างจังหวัด', warpUrl: 'https://home.transport.co.th/', logoText: '🚐', color: '#06b6d4' }
      ],
      boat: [
        { name: 'เรือด่วนเจ้าพระยา', shortName: 'เรือด่วน', type: 'boat', description: 'เรือโดยสารตามแม่น้ำเจ้าพระยา', warpUrl: 'https://www.chaophrayaexpressboat.com/', logoText: '⛴️', color: '#14b8a6' },
        { name: 'เรือคลองแสนแสบ', shortName: 'แสนแสบ', type: 'boat', description: 'เรือโดยสารคลองแสนแสบ', warpUrl: 'https://www.kmsp.co.th/', logoText: '🚤', color: '#0ea5e9' },
        { name: 'วินมอเตอร์ไซค์', shortName: 'วิน', type: 'bike', description: 'บริการรับ-ส่งในซอย', warpUrl: '', logoText: '🏍️', color: '#f97316' }
      ]
    },
    others: [
      { name: 'Grab Thailand', shortName: 'Grab', type: 'other', description: 'เรียกรถออนไลน์', warpUrl: 'https://www.grab.com/th/', logoText: '🟢', color: '#22c55e' },
      { name: 'Bolt (เรียกรถ)', shortName: 'Bolt', type: 'other', description: 'บริการเรียกรถราคาประหยัด', warpUrl: 'https://bolt.eu/th/', logoText: '⚡', color: '#34d399' }
    ]
  },
  environment: {
    animals: ['สุนัขจรจัด (ระวังตอนกลางคืน)', 'ตะกวด (สวนลุมพินี)', 'งูเห่า (พื้นที่ชานเมือง)'],
    plants: ['ต้นจามจุรี', 'ต้นตาล', 'ต้นมะขาม (ต้นไม้ประจำกรุงเทพฯ)'],
    terrain: 'ที่ราบลุ่ม แม่น้ำเจ้าพระยา คลองเครือข่าย',
    climate: 'ร้อนชื้น — เฉลี่ย 28-35°C, ฝนตก พ.ค.-ต.ค.'
  },
  localFoods: [
    { name: 'ผัดไทย', priceRange: '50-100฿' },
    { name: 'ก๋วยเตี๋ยวเรือ', priceRange: '20-40฿' },
    { name: 'ข้าวมันไก่', priceRange: '50-80฿' },
    { name: 'มะม่วงข้าวเหนียว', priceRange: '80-150฿' },
    { name: 'ส้มตำ', priceRange: '40-60฿' },
    { name: 'ข้าวหมูแดง', priceRange: '50-70฿' }
  ],
  knowledge: [
    { title: 'รถติดช่วง 7-9 โมง / 17-20', content: 'หลีกเลี่ยงรถยนต์ ใช้ BTS/MRT แทน' },
    { title: 'ระวัง Scam แท็กซี่', content: 'ใช้ Grab หรือกดมิเตอร์เสมอ ไม่ใช้ราคาเหมา' },
    { title: 'น้ำประปาห้ามดื่มตรง', content: 'ซื้อน้ำขวดจาก 7-11 เริ่มต้น 7-10฿' },
    { title: 'ร้านสะดวกซื้อ 24 ชม.', content: '7-Eleven / FamilyMart ทุกซอย ถอน ATM ได้' }
  ],
  dangerZones: [
    { label: 'คลองเตย / ซอยเปลี่ยว', severity: 'medium', note: 'หลีกเลี่ยงช่วงดึก' },
    { label: 'น้ำท่วมช่วงฝนหนัก', severity: 'high', note: 'ก.ย.-พ.ย. พื้นที่ลุ่มอาจท่วมขัง' },
    { label: 'มลพิษ PM2.5', severity: 'medium', note: 'ก.พ.-มี.ค. ใส่หน้ากาก N95' }
  ],
  supply: [
    { type: 'bank', label: 'ธนาคาร / ATM', note: 'ทุกสถานี BTS/MRT, ห้างสรรพสินค้า, 7-11 (กสิกร/กรุงไทย)' },
    { type: 'gas', label: 'ปั๊มน้ำมัน', note: 'PTT / Shell / Bangchak ตามถนนหลัก' },
    { type: 'toilet', label: 'ห้องน้ำ', note: 'ห้าง (ฟรี), ปั๊ม (ฟรี), วัด (บริจาค 5-10฿)' },
    { type: 'pharmacy', label: 'ร้านขายยา', note: 'Boots / Watsons / ร้านยาชุมชนทุกย่าน' }
  ],
  accommodation: [
    { tier: 'budget', label: 'ประหยัด', priceRange: '300-800฿/คืน', examples: ['Hostel (Khaosan)', 'Capsule Hotel'], bookingUrl: 'https://www.agoda.com/th-th/city/bangkok-th.html' },
    { tier: 'midrange', label: 'ปานกลาง', priceRange: '1,000-3,000฿/คืน', examples: ['Ibis', 'Holiday Inn Express', 'Aspen Suites'], bookingUrl: 'https://www.booking.com/city/th/bangkok.html' },
    { tier: 'premium', label: 'หรูหรา', priceRange: '5,000-30,000+฿/คืน', examples: ['Mandarin Oriental', 'The Siam', 'Capella'], bookingUrl: 'https://www.booking.com/city/th/bangkok.html' }
  ],
  emergencyNumbers: [
    { label: 'ตำรวจท่องเที่ยว', number: '1155' },
    { label: 'แพทย์ฉุกเฉิน', number: '1669' },
    { label: 'สายด่วน กทม.', number: '1555' },
    { label: 'ดับเพลิง', number: '199' }
  ]
};

// ====== Province portal registry ======
const portalRegistry: Record<string, ProvincePortalData> = {
  'bangkok': bangkokPortal,
  'กรุงเทพมหานคร': bangkokPortal
};

export function getProvincePortal(provinceNameOrId: string): ProvincePortalData {
  const key = provinceNameOrId.toLowerCase().trim();
  return portalRegistry[key] || defaultPortal;
}

// ====== Season helper ======
export function getCurrentSeason(): { label: string; range: string } {
  const month = new Date().getMonth(); // 0-indexed
  if (month >= 2 && month <= 5) return { label: 'ฤดูร้อน', range: 'มี.ค. - มิ.ย.' };
  if (month >= 6 && month <= 9) return { label: 'ฤดูฝน', range: 'ก.ค. - ต.ค.' };
  return { label: 'ฤดูหนาว', range: 'พ.ย. - ก.พ.' };
}
