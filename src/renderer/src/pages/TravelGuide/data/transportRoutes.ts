// Transport route data for each region

export interface TransportRoute {
  id: string;
  name: string;
  type: 'bus' | 'van' | 'coach' | 'train' | 'plane' | 'boat';
  operator: string;
  from: string;
  to: string;
  via: string[];
  departureTime: string[];
  duration: string;
  baseFare: number;
  frequency: string;
  terminal?: string;
  notes?: string;
}

// ====== Region Transport Data ======
export const regionTransportData: Record<string, TransportRoute[]> = {
  north: [
    { id:'n1', name:'สาย 1: กรุงเทพฯ - เชียงใหม่', type:'coach', operator:'นครชัยแอร์', from:'กรุงเทพฯ (หมอชิต)', to:'เชียงใหม่', via:['อยุธยา','นครสวรรค์','ตาก','ลำปาง'], departureTime:['09:00','10:00','20:00','21:00','22:00'], duration:'9-10 ชม.', baseFare:550, frequency:'ทุก 1 ชม.', terminal:'สถานีขนส่งหมอชิต', notes:'มีทั้ง VIP และปรับอากาศชั้น 1' },
    { id:'n2', name:'รถตู้ กรุงเทพฯ - เชียงราย', type:'van', operator:'เชียงรายทัวร์', from:'กรุงเทพฯ', to:'เชียงราย', via:['นครสวรรค์','พิษณุโลก','อุตรดิตถ์','แพร่','ลำปาง','เชียงใหม่'], departureTime:['08:00','09:00','13:00','21:00'], duration:'12 ชม.', baseFare:650, frequency:'ทุก 2-3 ชม.', terminal:'อนุสาวรีย์ชัยฯ' },
    { id:'n3', name:'รถไฟ กรุงเทพฯ - เชียงใหม่', type:'train', operator:'การรถไฟแห่งประเทศไทย', from:'หัวลำโพง', to:'เชียงใหม่', via:['อยุธยา','ลพบุรี','นครสวรรค์','พิษณุโลก','อุตรดิตถ์','ลำปาง'], departureTime:['08:30','15:00','18:10','19:35'], duration:'11-14 ชม.', baseFare:231, frequency:'4 ขบวน/วัน', terminal:'สถานีรถไฟหัวลำโพง', notes:'มีรถนอนชั้น 1, 2' },
    { id:'n4', name:'เครื่องบิน กรุงเทพฯ - เชียงใหม่', type:'plane', operator:'Thai Airways / AirAsia / Nok Air', from:'สุวรรณภูมิ/ดอนเมือง', to:'เชียงใหม่', via:[], departureTime:['06:00-21:00'], duration:'1 ชม. 10 นาที', baseFare:999, frequency:'30+ เที่ยว/วัน', notes:'ราคาตามสายการบินและช่วงเวลา' },
    { id:'n5', name:'รถเมล์สาย 32: เชียงใหม่ - ลำพูน', type:'bus', operator:'บขส.', from:'เชียงใหม่', to:'ลำพูน', via:['สารภี'], departureTime:['06:00-18:00'], duration:'30 นาที', baseFare:20, frequency:'ทุก 15 นาที', terminal:'สถานีขนส่งช้างเผือก' }
  ],
  northeast: [
    { id:'ne1', name:'สาย 21: กรุงเทพฯ - ขอนแก่น', type:'coach', operator:'นครชัยแอร์', from:'กรุงเทพฯ (หมอชิต)', to:'ขอนแก่น', via:['สระบุรี','นครราชสีมา','บุรีรัมย์'], departureTime:['07:00','09:00','12:00','20:00','21:00'], duration:'6-7 ชม.', baseFare:380, frequency:'ทุก 1-2 ชม.', terminal:'สถานีขนส่งหมอชิต' },
    { id:'ne2', name:'รถตู้ กรุงเทพฯ - อุดรธานี', type:'van', operator:'นครชัยทัวร์', from:'กรุงเทพฯ', to:'อุดรธานี', via:['สระบุรี','นครราชสีมา','ขอนแก่น'], departureTime:['06:00','08:00','10:00','14:00','20:00'], duration:'8 ชม.', baseFare:450, frequency:'ทุก 2 ชม.', terminal:'อนุสาวรีย์ชัยฯ' },
    { id:'ne3', name:'รถไฟ กรุงเทพฯ - อุบลราชธานี', type:'train', operator:'การรถไฟแห่งประเทศไทย', from:'หัวลำโพง', to:'อุบลราชธานี', via:['อยุธยา','สระบุรี','นครราชสีมา','บุรีรัมย์','สุรินทร์','ศรีสะเกษ'], departureTime:['06:40','17:35','20:30'], duration:'10-11 ชม.', baseFare:240, frequency:'3 ขบวน/วัน', terminal:'สถานีรถไฟหัวลำโพง' },
    { id:'ne4', name:'สาย 407: โคราช - อุบลฯ', type:'bus', operator:'บขส.', from:'นครราชสีมา', to:'อุบลราชธานี', via:['บุรีรัมย์','สุรินทร์','ศรีสะเกษ'], departureTime:['06:00-17:00'], duration:'5-6 ชม.', baseFare:220, frequency:'ทุก 1 ชม.' }
  ],
  central: [
    { id:'c1', name:'รถเมล์สาย 511: กรุงเทพฯ ใต้-เหนือ', type:'bus', operator:'ขสมก.', from:'บางนา', to:'บางเขน', via:['สีลม','อนุสาวรีย์ชัยฯ','สะพานควาย'], departureTime:['05:00-23:00'], duration:'1.5-2 ชม.', baseFare:15, frequency:'ทุก 10-15 นาที', terminal:'ป้ายรถเมล์ทั่วไป' },
    { id:'c2', name:'รถตู้ กรุงเทพฯ - อยุธยา', type:'van', operator:'รถตู้อยุธยา', from:'กรุงเทพฯ (หมอชิต)', to:'อยุธยา', via:['รังสิต','ปทุมธานี'], departureTime:['06:00-20:00'], duration:'1.5 ชม.', baseFare:60, frequency:'ทุก 30 นาที', terminal:'สถานีขนส่งหมอชิต' },
    { id:'c3', name:'รถไฟฟ้าสายสีเขียว (BTS)', type:'train', operator:'BTS', from:'คูคต', to:'เคหะฯ', via:['หมอชิต','สยาม','อโศก','บางนา'], departureTime:['06:00-24:00'], duration:'1 ชม. 20 นาที', baseFare:16, frequency:'ทุก 3-5 นาที', notes:'ค่าโดยสารสูงสุด 59 บาท' },
    { id:'c4', name:'รถไฟ กรุงเทพฯ - สุพรรณบุรี', type:'train', operator:'การรถไฟแห่งประเทศไทย', from:'บางกอกน้อย', to:'สุพรรณบุรี', via:['ตลิ่งชัน','นครปฐม'], departureTime:['07:00','12:30'], duration:'2.5 ชม.', baseFare:30, frequency:'2 ขบวน/วัน', terminal:'สถานีรถไฟธนบุรี' }
  ],
  west: [
    { id:'w1', name:'สาย 81: กรุงเทพฯ - กาญจนบุรี', type:'coach', operator:'บขส.', from:'กรุงเทพฯ (สายใต้ใหม่)', to:'กาญจนบุรี', via:['นครปฐม'], departureTime:['06:00','08:00','10:00','12:00','14:00','16:00'], duration:'2-3 ชม.', baseFare:120, frequency:'ทุก 2 ชม.', terminal:'สถานีขนส่งสายใต้ใหม่' },
    { id:'w2', name:'รถตู้ กรุงเทพฯ - ราชบุรี', type:'van', operator:'รถตู้ราชบุรี', from:'กรุงเทพฯ', to:'ราชบุรี', via:['นครปฐม','สมุทรสาคร'], departureTime:['06:00-19:00'], duration:'1.5 ชม.', baseFare:80, frequency:'ทุก 30 นาที', terminal:'สายใต้เก่า/ปิ่นเกล้า' },
    { id:'w3', name:'รถไฟ กรุงเทพฯ - น้ำตก', type:'train', operator:'การรถไฟแห่งประเทศไทย', from:'ธนบุรี', to:'น้ำตก', via:['นครปฐม','กาญจนบุรี'], departureTime:['07:50','13:55'], duration:'4 ชม.', baseFare:100, frequency:'2 ขบวน/วัน', terminal:'สถานีรถไฟธนบุรี', notes:'เส้นทางรถไฟสายมรณะ (Death Railway)' }
  ],
  east: [
    { id:'e1', name:'สาย 145: กรุงเทพฯ - พัทยา', type:'coach', operator:'รถทัวร์พัทยา', from:'กรุงเทพฯ (เอกมัย)', to:'พัทยา', via:['ชลบุรี','ศรีราชา'], departureTime:['06:00-21:00'], duration:'2-2.5 ชม.', baseFare:131, frequency:'ทุก 30 นาที', terminal:'สถานีขนส่งเอกมัย' },
    { id:'e2', name:'รถตู้ กรุงเทพฯ - ระยอง', type:'van', operator:'รถตู้ระยอง', from:'กรุงเทพฯ', to:'ระยอง', via:['ชลบุรี','ศรีราชา','พัทยา'], departureTime:['06:00-19:00'], duration:'3 ชม.', baseFare:180, frequency:'ทุก 30 นาที', terminal:'เอกมัย/หมอชิต' },
    { id:'e3', name:'เรือข้ามฟาก ศรีราชา - เกาะสีชัง', type:'boat', operator:'เรือข้ามฟากสีชัง', from:'ท่าเรือศรีราชา', to:'เกาะสีชัง', via:[], departureTime:['07:00','09:00','11:00','13:00','15:00','17:00'], duration:'45 นาที', baseFare:50, frequency:'ทุก 2 ชม.', terminal:'ท่าเรือศรีราชา' },
    { id:'e4', name:'สาย 965: กรุงเทพฯ - ตราด', type:'coach', operator:'บขส.', from:'กรุงเทพฯ (เอกมัย)', to:'ตราด', via:['ชลบุรี','ระยอง','จันทบุรี'], departureTime:['07:30','09:00','11:00','23:00'], duration:'5-6 ชม.', baseFare:280, frequency:'4-5 เที่ยว/วัน' }
  ],
  south: [
    { id:'s1', name:'สาย 988: กรุงเทพฯ - ภูเก็ต', type:'coach', operator:'นครชัยแอร์', from:'กรุงเทพฯ (สายใต้ใหม่)', to:'ภูเก็ต', via:['เพชรบุรี','ประจวบฯ','ชุมพร','ระนอง','สุราษฎร์ฯ','กระบี่','พังงา'], departureTime:['17:00','18:00','19:00'], duration:'12-13 ชม.', baseFare:850, frequency:'5+ เที่ยว/วัน', terminal:'สถานีขนส่งสายใต้ใหม่' },
    { id:'s2', name:'เครื่องบิน กรุงเทพฯ - ภูเก็ต', type:'plane', operator:'Thai Airways / AirAsia', from:'สุวรรณภูมิ/ดอนเมือง', to:'ภูเก็ต', via:[], departureTime:['06:00-22:00'], duration:'1 ชม. 20 นาที', baseFare:1200, frequency:'40+ เที่ยว/วัน' },
    { id:'s3', name:'รถไฟ กรุงเทพฯ - สุราษฎร์ธานี', type:'train', operator:'การรถไฟแห่งประเทศไทย', from:'หัวลำโพง', to:'สุราษฎร์ธานี', via:['เพชรบุรี','หัวหิน','ประจวบฯ','ชุมพร'], departureTime:['07:15','14:45','17:35','19:30'], duration:'11-12 ชม.', baseFare:350, frequency:'5 ขบวน/วัน', terminal:'สถานีรถไฟหัวลำโพง' },
    { id:'s4', name:'รถตู้ หาดใหญ่ - สตูล', type:'van', operator:'รถตู้สตูล', from:'หาดใหญ่', to:'สตูล', via:['รัตภูมิ','ควนโดน'], departureTime:['06:00-18:00'], duration:'2 ชม.', baseFare:130, frequency:'ทุก 30 นาที', terminal:'สถานีขนส่งหาดใหญ่' },
    { id:'s5', name:'เรือเฟอร์รี่ สุราษฎร์ฯ - เกาะสมุย', type:'boat', operator:'Seatran / Raja Ferry', from:'ท่าเรือดอนสัก', to:'เกาะสมุย', via:[], departureTime:['05:00-19:00'], duration:'1.5-2 ชม.', baseFare:200, frequency:'ทุก 1 ชม.', terminal:'ท่าเรือดอนสัก/ท่าทอง', notes:'มีทั้งเรือข้ามฟากและ Speed Boat' }
  ]
};

// ====== Helper: Find routes matching a destination ======
export function findRoutesForDestination(regionId: string, destination: string): TransportRoute[] {
  const routes = regionTransportData[regionId] || [];
  if (!destination.trim()) return routes;
  const q = destination.toLowerCase();
  return routes.filter(r => {
    const nodes = [r.from, r.to, ...r.via].map(n => n.toLowerCase());
    return nodes.some(n => n.includes(q)) || r.name.toLowerCase().includes(q);
  });
}

// ====== Helper: Parse duration to hours ======
export function durationToHours(duration: string): number {
  const matches = [...duration.matchAll(/(\d+(?:\.\d+)?)/g)].map(m => Number(m[1]));
  if (matches.length === 0) return 1;
  if (matches.length === 1) return matches[0];
  return (matches[0] + matches[matches.length - 1]) / 2;
}

// ====== Helper: Get cheapest/fastest route ======
export function getBestRoute(routes: TransportRoute[]) {
  if (routes.length === 0) return null;
  const cheapest = [...routes].sort((a, b) => a.baseFare - b.baseFare)[0];
  const fastest = [...routes].sort((a, b) => durationToHours(a.duration) - durationToHours(b.duration))[0];
  return { cheapest, fastest };
}

export const transportTypeConfig: Record<string, { label: string; emoji: string; color: string }> = {
  bus: { label: 'รถเมล์', emoji: '🚌', color: 'amber' },
  van: { label: 'รถตู้', emoji: '🚐', color: 'sky' },
  coach: { label: 'รถทัวร์', emoji: '🚍', color: 'emerald' },
  train: { label: 'รถไฟ', emoji: '🚆', color: 'violet' },
  plane: { label: 'เครื่องบิน', emoji: '✈️', color: 'cyan' },
  boat: { label: 'เรือ', emoji: '⛴️', color: 'teal' }
};
