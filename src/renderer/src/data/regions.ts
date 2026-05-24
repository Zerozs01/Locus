// Region card images (using high-quality online Unsplash images since local files were removed from tracking)
const RegionNorth = 'https://images.unsplash.com/photo-1543731068-7e0f5beff43a?q=80&w=600';
const RegionNortheast = 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=600';
const RegionCentral = 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=600';
const RegionSouth = 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600';
const RegionWest = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600';
const RegionEast = 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600';
import { regionTheme } from './regionTheme';

// Central Province Images
const imgAngThong = '/src/Image/Province_pic/Central_pic/ang_thong.jpg';
const imgBangkok = '/src/Image/Province_pic/Central_pic/Bangkok.webp';
const imgChaiNat = '/src/Image/Province_pic/Central_pic/chai_nat.webp';
const imgLopBuri = '/src/Image/Province_pic/Central_pic/lop_buri.webp';
const imgNakhonPathom = '/src/Image/Province_pic/Central_pic/nakhon_pathom.webp';
const imgPathumThani = '/src/Image/Province_pic/Central_pic/pathum_thani.webp';
const imgSuphanBuri = '/src/Image/Province_pic/Central_pic/suphan_buri.webp';
const imgKamphaengPhet = '/src/Image/Province_pic/Central_pic/kamphaeng_phet.webp';
const imgNakhonNayok = '/src/Image/Province_pic/Central_pic/nakhon_nayok.webp';
const imgNakhonSawan = '/src/Image/Province_pic/Central_pic/nakhon_sawan.webp';
const imgAyutthaya = '/src/Image/Province_pic/Central_pic/ayutthaya.webp';
const imgSaraburi = '/src/Image/Province_pic/Central_pic/saraburi.webp';

// North Province Images
const imgChiangMai = '/src/Image/Province_pic/North_pic/chiang_mai.webp';
const imgMaeHongSon = '/src/Image/Province_pic/North_pic/mae_hong_son.webp';
const imgNan = '/src/Image/Province_pic/North_pic/nan.webp';
const imgLampang = '/src/Image/Province_pic/North_pic/lampang.webp';
const imgLamphun = '/src/Image/Province_pic/North_pic/lamphun.webp';
const imgUttaradit = '/src/Image/Province_pic/North_pic/uttaradit.webp';

// West Province Images
const imgKanchanaburi = '/src/Image/Province_pic/West_pic/kanchanaburi.webp';
const imgPhetchaburi = '/src/Image/Province_pic/West_pic/phetchaburi.webp';
const imgPrachuapKhiriKhan = '/src/Image/Province_pic/West_pic/prachuap_khiri_khan.webp';
const imgRatchaburi = '/src/Image/Province_pic/West_pic/ratchaburi.webp';
const imgTak = '/src/Image/Province_pic/West_pic/tak.webp';

export interface Province {
  name: string;
  id: string;
  dist: number;
  tam: number;
  serenity: number;
  entertainment: number;
  relax: number;
  image: string;
  population?: string;  // e.g., "1.78M", "724K"
  area?: string;        // e.g., "20,107" (km²)
  dailyCost?: string;   // e.g., "350 ฿"
  safety?: number;      // e.g., 85 (%)
  populationValue?: number;
  areaValue?: number;
  dailyCostValue?: number;
  // Tactical Recon Fields
  terrain?: 'Urban' | 'River Basin' | 'Mountainous' | 'Coastal';
  infrastructure?: {
    medicalHubs: number;
    transportNodes: number;
  };
  emergencyContact?: string;
  tacticalTags?: string[];
  activeThreat?: string;
}

export interface RegionStats {
  dailyCost: string;
  monthlyCost: string;
  flora: string;
  food: string;
  attraction: string;
  nightlife: string;
  dailyCostValue?: number;
  monthlyCostValue?: number;
}

export interface RegionSummary {
  provinces: number;
  area: string;
  pop: string;
  areaValue?: number;
  popValue?: number;
}

export interface Region {
  id: string;
  name: string;
  engName: string;
  code: string;
  color: string;
  gradient?: string; // Derived from color usually, but keeping compatible
  image: string;
  summary: RegionSummary;
  stats: RegionStats;
  desc: string;
  subProvinces: Province[];
  safety: number; // Added missing field from usage
}

export const regionsData: Region[] = [
  {
    id: "north",
    name: "ภาคเหนือ",
    engName: "NORTH",
    code: "N-SEC",
    color: regionTheme.north.text,
    safety: 75,
    gradient: regionTheme.north.gradient,
    image: RegionNorth,
    summary: { provinces: 9, area: "169,644", pop: "6.2M" },
    stats: {
      dailyCost: "300 ฿",
      monthlyCost: "12,000 ฿",
      flora: "ดอกพญาเสือโคร่ง",
      food: "ข้าวซอย",
      attraction: "ดอยอินทนนท์",
      nightlife: "นิมมานฯ",
    },
    desc: "ดินแดนแห่งขุนเขาและสายหมอก ศูนย์กลางวัฒนธรรมล้านนา",
    subProvinces: [
      { name: "Chiang Mai", id: "chiangmai", dist: 25, tam: 204, serenity: 9, entertainment: 8, relax: 9, image: imgChiangMai, population: "1.78M", area: "20,107", dailyCost: "350 ฿", safety: 82 },
      { name: "Chiang Rai", id: "chiangrai", dist: 18, tam: 124, serenity: 9, entertainment: 6, relax: 9, image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=600", population: "1.29M", area: "11,678", dailyCost: "280 ฿", safety: 78 },
      { name: "Lampang", id: "lampang", dist: 13, tam: 100, serenity: 8, entertainment: 4, relax: 8, image: imgLampang, population: "724K", area: "12,534", dailyCost: "250 ฿", safety: 85 },
      { name: "Lamphun", id: "lamphun", dist: 8, tam: 51, serenity: 9, entertainment: 3, relax: 9, image: imgLamphun, population: "399K", area: "4,506", dailyCost: "240 ฿", safety: 88 },
      { name: "Mae Hong Son", id: "maehongson", dist: 7, tam: 45, serenity: 10, entertainment: 2, relax: 10, image: imgMaeHongSon, population: "274K", area: "12,681", dailyCost: "300 ฿", safety: 72 },
      { name: "Nan", id: "nan", dist: 15, tam: 99, serenity: 10, entertainment: 3, relax: 10, image: imgNan, population: "479K", area: "11,472", dailyCost: "260 ฿", safety: 86 },
      { name: "Phayao", id: "phayao", dist: 9, tam: 68, serenity: 9, entertainment: 3, relax: 9, image: "https://images.unsplash.com/photo-1598892762299-66086509930f?q=80&w=600", population: "474K", area: "6,335", dailyCost: "230 ฿", safety: 90 },
      { name: "Phrae", id: "phrae", dist: 8, tam: 78, serenity: 8, entertainment: 4, relax: 8, image: "https://images.unsplash.com/photo-1598892762299-66806509930f?q=80&w=600", population: "433K", area: "6,539", dailyCost: "220 ฿", safety: 89 },
      { name: "Uttaradit", id: "uttaradit", dist: 9, tam: 67, serenity: 8, entertainment: 3, relax: 8, image: imgUttaradit, population: "453K", area: "7,838", dailyCost: "230 ฿", safety: 87 },
    ],
  },
  {
    id: "northeast",
    name: "ภาคอีสาน",
    engName: "ISAN",
    code: "NE-SEC",
    color: regionTheme.northeast.text,
    safety: 92,
    gradient: regionTheme.northeast.gradient,
    image: RegionNortheast,
    summary: { provinces: 20, area: "168,854", pop: "21.8M" },
    stats: {
      dailyCost: "250 ฿",
      monthlyCost: "10,000 ฿",
      flora: "ดอกราชพฤกษ์",
      food: "ส้มตำ",
      attraction: "พนมรุ้ง",
      nightlife: "UD Town",
    },
    desc: "อู่อารยธรรมลุ่มน้ำโขง ดินแดนปราสาทหินและเทศกาลแห่เทียน",
    subProvinces: [
      { name: "Amnat Charoen", id: "amnatcharoen", dist: 7, tam: 56, serenity: 9, entertainment: 2, relax: 9, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "375K", area: "3,161", dailyCost: "200 ฿", safety: 92 },
      { name: "Bueng Kan", id: "buengkan", dist: 8, tam: 53, serenity: 9, entertainment: 2, relax: 9, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "422K", area: "4,305", dailyCost: "220 ฿", safety: 88 },
      { name: "Buri Ram", id: "buriram", dist: 23, tam: 188, serenity: 8, entertainment: 6, relax: 7, image: "https://images.unsplash.com/photo-1585233283256-42d621235378?q=80&w=600", population: "1.58M", area: "10,322", dailyCost: "250 ฿", safety: 85 },
      { name: "Chaiyaphum", id: "chaiyaphum", dist: 16, tam: 124, serenity: 9, entertainment: 3, relax: 9, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "1.13M", area: "12,778", dailyCost: "220 ฿", safety: 88 },
      { name: "Kalasin", id: "kalasin", dist: 18, tam: 135, serenity: 9, entertainment: 3, relax: 9, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "983K", area: "6,947", dailyCost: "210 ฿", safety: 90 },
      { name: "Khon Kaen", id: "khonkaen", dist: 26, tam: 199, serenity: 7, entertainment: 8, relax: 7, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "1.79M", area: "10,886", dailyCost: "300 ฿", safety: 82 },
      { name: "Loei", id: "loei", dist: 14, tam: 89, serenity: 10, entertainment: 4, relax: 10, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "633K", area: "11,425", dailyCost: "250 ฿", safety: 86 },
      { name: "Maha Sarakham", id: "mahasarakham", dist: 13, tam: 133, serenity: 8, entertainment: 5, relax: 8, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "960K", area: "5,292", dailyCost: "230 ฿", safety: 88 },
      { name: "Mukdahan", id: "mukdahan", dist: 7, tam: 52, serenity: 9, entertainment: 4, relax: 9, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "348K", area: "4,340", dailyCost: "230 ฿", safety: 85 },
      { name: "Nakhon Phanom", id: "nakhonphanom", dist: 12, tam: 99, serenity: 9, entertainment: 4, relax: 9, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "714K", area: "5,513", dailyCost: "220 ฿", safety: 87 },
      { name: "Nakhon Ratchasima", id: "nakhonratchasima", dist: 32, tam: 289, serenity: 7, entertainment: 7, relax: 8, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "2.63M", area: "20,494", dailyCost: "280 ฿", safety: 80 },
      { name: "Nong Bua Lam Phu", id: "nongbualamphu", dist: 6, tam: 59, serenity: 9, entertainment: 2, relax: 9, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "509K", area: "3,859", dailyCost: "200 ฿", safety: 91 },
      { name: "Nong Khai", id: "nongkhai", dist: 17, tam: 115, serenity: 9, entertainment: 5, relax: 9, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "517K", area: "3,027", dailyCost: "240 ฿", safety: 84 },
      { name: "Roi Et", id: "roiet", dist: 20, tam: 192, serenity: 8, entertainment: 4, relax: 8, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "1.29M", area: "8,299", dailyCost: "210 ฿", safety: 89 },
      { name: "Sakon Nakhon", id: "sakonnakhon", dist: 18, tam: 125, serenity: 9, entertainment: 4, relax: 9, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "1.14M", area: "9,605", dailyCost: "220 ฿", safety: 87 },
      { name: "Si Sa Ket", id: "sisaket", dist: 22, tam: 206, serenity: 8, entertainment: 3, relax: 8, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "1.46M", area: "8,840", dailyCost: "200 ฿", safety: 90 },
      { name: "Surin", id: "surin", dist: 17, tam: 158, serenity: 8, entertainment: 4, relax: 8, image: "https://images.unsplash.com/photo-1585233283256-42d621235378?q=80&w=600", population: "1.39M", area: "8,124", dailyCost: "210 ฿", safety: 88 },
      { name: "Ubon Ratchathani", id: "ubonratchathani", dist: 25, tam: 219, serenity: 8, entertainment: 6, relax: 8, image: "https://images.unsplash.com/photo-1629822967272-972757539665?q=80&w=600", population: "1.87M", area: "15,745", dailyCost: "250 ฿", safety: 84 },
      { name: "Udon Thani", id: "udonthani", dist: 20, tam: 156, serenity: 7, entertainment: 7, relax: 7, image: "https://images.unsplash.com/photo-1585233283256-42d621235378?q=80&w=600", population: "1.57M", area: "11,730", dailyCost: "280 ฿", safety: 82 },
      { name: "Yasothon", id: "yasothon", dist: 9, tam: 78, serenity: 9, entertainment: 3, relax: 9, image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=600", population: "536K", area: "4,162", dailyCost: "200 ฿", safety: 92 },
    ],
  },
  {
    id: "central",
    name: "ภาคกลาง",
    engName: "CENTRAL",
    code: "C-SEC",
    color: regionTheme.central.text,
    safety: 88,
    gradient: regionTheme.central.gradient,
    image: RegionCentral,
    summary: { provinces: 22, area: "102,337", pop: "20.5M" },
    stats: {
      dailyCost: "500 ฿",
      monthlyCost: "25,000 ฿",
      flora: "ดอกบัว",
      food: "ต้มยำกุ้ง",
      attraction: "วัดพระแก้ว",
      nightlife: "ทองหล่อ",
    },
    desc: "หัวใจของเศรษฐกิจไทย แหล่งรวมความทันสมัยและประวัติศาสตร์",
    subProvinces: [
      { name: "Ang Thong", id: "angthong", dist: 7, tam: 73, serenity: 8, entertainment: 3, relax: 8, image: imgAngThong, population: "278K", area: "968", dailyCost: "280 ฿", safety: 88, terrain: 'River Basin', infrastructure: { medicalHubs: 3, transportNodes: 1 }, emergencyContact: '035-611-222', tacticalTags: ['FLOOD PRONE', 'AGRICULTURAL'], activeThreat: 'Flash Flood' },
      { name: "Bangkok", id: "bangkok", dist: 50, tam: 180, serenity: 3, entertainment: 10, relax: 5, image: imgBangkok, population: "5.68M", area: "1,569", dailyCost: "600 ฿", safety: 75, terrain: 'Urban', infrastructure: { medicalHubs: 50, transportNodes: 12 }, emergencyContact: '191, 1669', tacticalTags: ['URBAN DENSE', 'STRATEGIC HUB', 'SAFE HAVEN'], activeThreat: 'PM2.5 (High)' },
      { name: "Chai Nat", id: "chainat", dist: 8, tam: 53, serenity: 8, entertainment: 3, relax: 8, image: imgChaiNat, population: "325K", area: "2,470", dailyCost: "250 ฿", safety: 90, terrain: 'River Basin', infrastructure: { medicalHubs: 2, transportNodes: 1 }, emergencyContact: '056-411-111', tacticalTags: ['LOW THREAT'], activeThreat: 'CLEAR' },
      { name: "Kamphaeng Phet", id: "kamphaengphet", dist: 11, tam: 78, serenity: 8, entertainment: 4, relax: 8, image: imgKamphaengPhet, population: "725K", area: "8,608", dailyCost: "260 ฿", safety: 87 },
      { name: "Lop Buri", id: "lopburi", dist: 11, tam: 124, serenity: 7, entertainment: 4, relax: 7, image: imgLopBuri, population: "751K", area: "6,200", dailyCost: "280 ฿", safety: 84 },
      { name: "Nakhon Nayok", id: "nakhonnayok", dist: 4, tam: 41, serenity: 9, entertainment: 3, relax: 9, image: imgNakhonNayok, population: "257K", area: "2,122", dailyCost: "320 ฿", safety: 86 },
      { name: "Nakhon Pathom", id: "nakhonpathom", dist: 7, tam: 106, serenity: 6, entertainment: 5, relax: 6, image: imgNakhonPathom, population: "919K", area: "2,168", dailyCost: "350 ฿", safety: 85 },
      { name: "Nakhon Sawan", id: "nakhonsawan", dist: 15, tam: 130, serenity: 7, entertainment: 5, relax: 7, image: imgNakhonSawan, population: "1.05M", area: "9,598", dailyCost: "280 ฿", safety: 86 },
      { name: "Nonthaburi", id: "nonthaburi", dist: 6, tam: 52, serenity: 5, entertainment: 6, relax: 5, image: "https://images.unsplash.com/photo-1621533722026-626a57565362?q=80&w=600", population: "1.27M", area: "622", dailyCost: "450 ฿", safety: 80 },
      { name: "Pathum Thani", id: "pathumthani", dist: 7, tam: 60, serenity: 6, entertainment: 5, relax: 5, image: imgPathumThani, population: "1.15M", area: "1,526", dailyCost: "400 ฿", safety: 82 },
      { name: "Phetchabun", id: "phetchabun", dist: 11, tam: 117, serenity: 9, entertainment: 4, relax: 9, image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=600", population: "986K", area: "12,668", dailyCost: "280 ฿", safety: 85 },
      { name: "Phichit", id: "phichit", dist: 12, tam: 89, serenity: 8, entertainment: 3, relax: 8, image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=600", population: "531K", area: "4,531", dailyCost: "240 ฿", safety: 89 },
      { name: "Phitsanulok", id: "phitsanulok", dist: 9, tam: 93, serenity: 8, entertainment: 5, relax: 8, image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=600", population: "853K", area: "10,816", dailyCost: "300 ฿", safety: 84 },
      { name: "Phra Nakhon Si Ayutthaya", id: "ayutthaya", dist: 16, tam: 209, serenity: 8, entertainment: 4, relax: 8, image: imgAyutthaya, population: "815K", area: "2,557", dailyCost: "350 ฿", safety: 83 },
      { name: "Samut Prakan", id: "samutprakan", dist: 6, tam: 50, serenity: 4, entertainment: 7, relax: 4, image: "https://images.unsplash.com/photo-1621533722026-626a57565362?q=80&w=600", population: "1.34M", area: "1,004", dailyCost: "400 ฿", safety: 78 },
      { name: "Samut Sakhon", id: "samutsakhon", dist: 3, tam: 40, serenity: 5, entertainment: 5, relax: 5, image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=600", population: "569K", area: "872", dailyCost: "350 ฿", safety: 79 },
      { name: "Samut Songkhram", id: "samutsongkhram", dist: 3, tam: 38, serenity: 8, entertainment: 4, relax: 8, image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=600", population: "189K", area: "417", dailyCost: "300 ฿", safety: 88 },
      { name: "Saraburi", id: "saraburi", dist: 13, tam: 111, serenity: 7, entertainment: 4, relax: 7, image: imgSaraburi, population: "644K", area: "3,576", dailyCost: "320 ฿", safety: 84 },
      { name: "Sing Buri", id: "singburi", dist: 6, tam: 43, serenity: 8, entertainment: 3, relax: 8, image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=600", population: "208K", area: "822", dailyCost: "240 ฿", safety: 91 },
      { name: "Sukhothai", id: "sukhothai", dist: 9, tam: 86, serenity: 9, entertainment: 4, relax: 9, image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=600", population: "593K", area: "6,596", dailyCost: "260 ฿", safety: 88 },
      { name: "Suphan Buri", id: "suphanburi", dist: 10, tam: 110, serenity: 7, entertainment: 4, relax: 7, image: imgSuphanBuri, population: "840K", area: "5,358", dailyCost: "270 ฿", safety: 87 },
      { name: "Uthai Thani", id: "uthaithani", dist: 8, tam: 66, serenity: 9, entertainment: 3, relax: 9, image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=600", population: "326K", area: "6,730", dailyCost: "250 ฿", safety: 89 },
    ],
  },
  {
    id: "west",
    name: "ภาคตะวันตก",
    engName: "WEST",
    code: "W-SEC",
    color: regionTheme.west.text,
    safety: 85,
    gradient: regionTheme.west.gradient,
    image: RegionWest,
    summary: { provinces: 5, area: "53,679", pop: "3.5M" },
    stats: {
      dailyCost: "350 ฿",
      monthlyCost: "15,000 ฿",
      flora: "ไผ่",
      food: "ก๋วยเตี๋ยวเรือ",
      attraction: "สะพานข้ามแม่น้ำแคว",
      nightlife: "หัวหิน",
    },
    desc: "ดินแดนแห่งประวัติศาสตร์สงครามโลก ธรรมชาติอันงดงาม",
    subProvinces: [
      { name: "Kanchanaburi", id: "kanchanaburi", dist: 13, tam: 98, serenity: 9, entertainment: 5, relax: 10, image: imgKanchanaburi, population: "878K", area: "19,483", dailyCost: "350 ฿", safety: 82 },
      { name: "Phetchaburi", id: "phetchaburi", dist: 8, tam: 93, serenity: 8, entertainment: 6, relax: 8, image: imgPhetchaburi, population: "474K", area: "6,225", dailyCost: "320 ฿", safety: 85 },
      { name: "Prachuap Khiri Khan", id: "prachuapkhirikhan", dist: 8, tam: 48, serenity: 8, entertainment: 7, relax: 9, image: imgPrachuapKhiriKhan, population: "532K", area: "6,368", dailyCost: "400 ฿", safety: 84 },
      { name: "Ratchaburi", id: "ratchaburi", dist: 10, tam: 104, serenity: 8, entertainment: 4, relax: 8, image: imgRatchaburi, population: "863K", area: "5,197", dailyCost: "300 ฿", safety: 86 },
      { name: "Tak", id: "tak", dist: 9, tam: 63, serenity: 9, entertainment: 3, relax: 10, image: imgTak, population: "662K", area: "16,407", dailyCost: "280 ฿", safety: 78 },
    ],
  },
  {
    id: "east",
    name: "ภาคตะวันออก",
    engName: "EAST",
    code: "E-SEC",
    color: regionTheme.east.text,
    safety: 86,
    gradient: regionTheme.east.gradient,
    image: RegionEast,
    summary: { provinces: 7, area: "36,503", pop: "4.8M" },
    stats: {
      dailyCost: "450 ฿",
      monthlyCost: "20,000 ฿",
      flora: "มะพร้าว",
      food: "อาหารทะเล",
      attraction: "เกาะล้าน",
      nightlife: "Walking Street",
    },
    desc: "ศูนย์กลางอุตสาหกรรมและท่องเที่ยวทะเลชั้นนำ EEC",
    subProvinces: [
      { name: "Chachoengsao", id: "chachoengsao", dist: 11, tam: 93, serenity: 8, entertainment: 5, relax: 8, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600", population: "717K", area: "5,351", dailyCost: "300 ฿", safety: 85 },
      { name: "Chanthaburi", id: "chanthaburi", dist: 10, tam: 76, serenity: 9, entertainment: 4, relax: 9, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600", population: "535K", area: "6,338", dailyCost: "350 ฿", safety: 86 },
      { name: "Chon Buri", id: "chonburi", dist: 11, tam: 92, serenity: 5, entertainment: 10, relax: 6, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600", population: "1.56M", area: "4,363", dailyCost: "500 ฿", safety: 78 },
      { name: "Prachin Buri", id: "prachinburi", dist: 7, tam: 65, serenity: 8, entertainment: 4, relax: 8, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600", population: "492K", area: "4,762", dailyCost: "280 ฿", safety: 87 },
      { name: "Rayong", id: "rayong", dist: 8, tam: 58, serenity: 7, entertainment: 6, relax: 7, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600", population: "741K", area: "3,552", dailyCost: "400 ฿", safety: 82 },
      { name: "Sa Kaeo", id: "sakaeo", dist: 9, tam: 59, serenity: 8, entertainment: 4, relax: 8, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600", population: "564K", area: "7,195", dailyCost: "250 ฿", safety: 80 },
      { name: "Trat", id: "trat", dist: 7, tam: 38, serenity: 9, entertainment: 4, relax: 9, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600", population: "229K", area: "2,819", dailyCost: "400 ฿", safety: 88 },
    ],
  },
  {
    id: "south",
    name: "ภาคใต้",
    engName: "SOUTH",
    code: "S-SEC",
    color: regionTheme.south.text,
    safety: 82,
    gradient: regionTheme.south.gradient,
    image: RegionSouth,
    summary: { provinces: 14, area: "70,715", pop: "9.4M" },
    stats: {
      dailyCost: "400 ฿",
      monthlyCost: "18,000 ฿",
      flora: "ยางพารา",
      food: "แกงส้ม",
      attraction: "เกาะพีพี",
      nightlife: "ป่าตอง",
    },
    desc: "ไข่มุกอันดามัน สวรรค์ของคนรักทะเลและหมู่เกาะ ขนาบด้วยทะเลสองฝั่ง",
    subProvinces: [
      { name: "Chumphon", id: "chumphon", dist: 8, tam: 70, serenity: 8, entertainment: 4, relax: 8, image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", population: "507K", area: "6,010", dailyCost: "300 ฿", safety: 86 },
      { name: "Krabi", id: "krabi", dist: 8, tam: 53, serenity: 9, entertainment: 6, relax: 9, image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", population: "479K", area: "4,709", dailyCost: "450 ฿", safety: 85 },
      { name: "Nakhon Si Thammarat", id: "nakhonsithammarat", dist: 23, tam: 165, serenity: 8, entertainment: 4, relax: 8, image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", population: "1.55M", area: "9,943", dailyCost: "280 ฿", safety: 82 },
      { name: "Narathiwat", id: "narathiwat", dist: 13, tam: 77, serenity: 7, entertainment: 2, relax: 7, image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", population: "810K", area: "4,475", dailyCost: "250 ฿", safety: 62 },
      { name: "Pattani", id: "pattani", dist: 12, tam: 115, serenity: 7, entertainment: 2, relax: 7, image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", population: "725K", area: "1,940", dailyCost: "240 ฿", safety: 60 },
      { name: "Phangnga", id: "phangnga", dist: 8, tam: 48, serenity: 9, entertainment: 4, relax: 9, image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", population: "264K", area: "4,171", dailyCost: "400 ฿", safety: 88 },
      { name: "Phatthalung", id: "phatthalung", dist: 11, tam: 65, serenity: 9, entertainment: 3, relax: 9, image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", population: "516K", area: "3,424", dailyCost: "260 ฿", safety: 87 },
      { name: "Phuket", id: "phuket", dist: 3, tam: 17, serenity: 5, entertainment: 10, relax: 9, image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=600", population: "417K", area: "543", dailyCost: "700 ฿", safety: 80 },
      { name: "Ranong", id: "ranong", dist: 5, tam: 30, serenity: 9, entertainment: 3, relax: 9, image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", population: "192K", area: "3,298", dailyCost: "320 ฿", safety: 84 },
      { name: "Satun", id: "satun", dist: 7, tam: 36, serenity: 9, entertainment: 4, relax: 9, image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", population: "326K", area: "2,479", dailyCost: "280 ฿", safety: 85 },
      { name: "Songkhla", id: "songkhla", dist: 16, tam: 127, serenity: 7, entertainment: 7, relax: 7, image: "https://images.unsplash.com/photo-1605367831034-722659779354?q=80&w=600", population: "1.43M", area: "7,394", dailyCost: "320 ฿", safety: 78 },
      { name: "Surat Thani", id: "suratthani", dist: 19, tam: 131, serenity: 8, entertainment: 6, relax: 8, image: "https://images.unsplash.com/photo-1595003309539-775608670732?q=80&w=600", population: "1.07M", area: "12,892", dailyCost: "380 ฿", safety: 84 },
      { name: "Trang", id: "trang", dist: 10, tam: 87, serenity: 8, entertainment: 5, relax: 8, image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", population: "642K", area: "4,918", dailyCost: "300 ฿", safety: 86 },
      { name: "Yala", id: "yala", dist: 8, tam: 58, serenity: 7, entertainment: 2, relax: 7, image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", population: "527K", area: "4,521", dailyCost: "250 ฿", safety: 58 },
    ],
  },
];
