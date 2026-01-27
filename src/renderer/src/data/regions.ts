export interface Province {
  name: string;
  id: string;
  dist: number;
  tam: number;
  serenity: number;
  entertainment: number;
  relax: number;
  image: string;
}

export interface RegionStats {
  dailyCost: string;
  monthlyCost: string;
  flora: string;
  food: string;
  attraction: string;
  nightlife: string;
}

export interface RegionSummary {
  provinces: number;
  area: string;
  pop: string;
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
    color: "text-rose-400",
    safety: 75,
    gradient: "bg-gradient-to-br from-rose-600/20 to-rose-900/10",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=600",
    summary: { provinces: 9, area: "169,644", pop: "6.2M" },
    stats: {
      dailyCost: "300 ฿",
      monthlyCost: "12,000 ฿",
      flora: "ดอกพญาเสือโคร่ง",
      food: "ข้าวซอย",
      attraction: "ดอยอินทนนท์",
      nightlife: "นิมมานฯ",
    },
    desc: "ดินแดนแห่งขุนเขาและสายหมอก ศูนย์กลางวัฒนธรรมล้านนา มีอากาศหนาวเย็นตลอดปี เป็นแหล่งท่องเที่ยวเชิงธรรมชาติและประวัติศาสตร์ที่สำคัญของไทย",
    subProvinces: [
      {
        name: "Chiang Mai",
        id: "cm",
        dist: 25,
        tam: 204,
        serenity: 7,
        entertainment: 9,
        relax: 8,
        image:
          "https://images.unsplash.com/photo-1596423405707-c9343586ac03?q=80&w=600",
      },
      {
        name: "Chiang Rai",
        id: "cr",
        dist: 18,
        tam: 124,
        serenity: 9,
        entertainment: 6,
        relax: 9,
        image:
          "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=600",
      },
      {
        name: "Nan",
        id: "nan",
        dist: 15,
        tam: 99,
        serenity: 10,
        entertainment: 3,
        relax: 10,
        image:
          "https://images.unsplash.com/photo-1589467657262-6da939796032?q=80&w=600",
      },
      {
        name: "Phrae",
        id: "phr",
        dist: 8,
        tam: 78,
        serenity: 8,
        entertainment: 4,
        relax: 8,
        image:
          "https://images.unsplash.com/photo-1598892762299-66806509930f?q=80&w=600",
      },
      {
        name: "Mae Hong Son",
        id: "mhs",
        dist: 7,
        tam: 45,
        serenity: 10,
        entertainment: 2,
        relax: 10,
        image:
          "https://images.unsplash.com/photo-1598246738029-79774b9337ac?q=80&w=1000",
      },
      {
        name: "Lamphun",
        id: "lp",
        dist: 8,
        tam: 51,
        serenity: 9,
        entertainment: 3,
        relax: 9,
        image:
          "https://images.unsplash.com/photo-1584883586678-77c8e9672697?q=80&w=1000",
      },
    ],
  },
  {
    id: "northeast",
    name: "ภาคอีสาน",
    engName: "ISAN",
    code: "NE-SEC",
    color: "text-emerald-400",
    safety: 92,
    gradient: "bg-gradient-to-br from-emerald-600/20 to-emerald-900/10",
    image:
      "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?auto=format&fit=crop&q=80&w=1000",
    summary: { provinces: 20, area: "168,854", pop: "21.8M" },
    stats: {
      dailyCost: "250 ฿",
      monthlyCost: "10,000 ฿",
      flora: "ดอกราชพฤกษ์",
      food: "ส้มตำ",
      attraction: "พนมรุ้ง",
      nightlife: "UD Town",
    },
    desc: "อู่อารยธรรมลุ่มน้ำโขง ดินแดนปราสาทหินและเทศกาลแห่เทียน มีพื้นที่ใหญ่ที่สุดในไทย แหล่งรวมวัฒนธรรมประเพณีอันเป็นเอกลักษณ์และวิถีชีวิตชาวนา",
    subProvinces: [
      {
        name: "Khon Kaen",
        id: "kk",
        dist: 26,
        tam: 199,
        serenity: 6,
        entertainment: 8,
        relax: 7,
        image:
          "https://images.unsplash.com/photo-1627921200000-000000000000?q=80&w=1000",
      },
      {
        name: "Korat",
        id: "nr",
        dist: 32,
        tam: 289,
        serenity: 7,
        entertainment: 7,
        relax: 8,
        image:
          "https://images.unsplash.com/photo-1627921200000-000000000000?q=80&w=1000",
      },
      {
        name: "Ubon",
        id: "ub",
        dist: 25,
        tam: 219,
        serenity: 8,
        entertainment: 5,
        relax: 9,
        image:
          "https://images.unsplash.com/photo-1629822967272-972757539665?q=80&w=1000",
      },
      {
        name: "Udon Thani",
        id: "ud",
        dist: 20,
        tam: 156,
        serenity: 7,
        entertainment: 8,
        relax: 7,
        image:
          "https://images.unsplash.com/photo-1585233283256-42d621235378?q=80&w=1000",
      },
      {
        name: "Buriram",
        id: "br",
        dist: 23,
        tam: 188,
        serenity: 8,
        entertainment: 4,
        relax: 8,
        image:
          "https://images.unsplash.com/photo-1585233283256-42d621235378?q=80&w=1000",
      },
      {
        name: "Surin",
        id: "sr",
        dist: 17,
        tam: 158,
        serenity: 9,
        entertainment: 3,
        relax: 8,
        image:
          "https://images.unsplash.com/photo-1585233283256-42d621235378?q=80&w=1000",
      },
    ],
  },
  {
    id: "central",
    name: "ภาคกลาง",
    engName: "CENTRAL",
    code: "C-SEC",
    color: "text-cyan-400",
    safety: 88,
    gradient: "bg-gradient-to-br from-cyan-600/20 to-cyan-900/10",
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&q=80&w=1000",
    summary: { provinces: 22, area: "102,337", pop: "20.5M" },
    stats: {
      dailyCost: "500 ฿",
      monthlyCost: "25,000 ฿",
      flora: "ดอกบัว",
      food: "ต้มยำกุ้ง",
      attraction: "วัดพระแก้ว",
      nightlife: "ทองหล่อ",
    },
    desc: "หัวใจของเศรษฐกิจไทย แหล่งรวมความทันสมัยและประวัติศาสตร์ เป็นที่ราบลุ่มแม่น้ำเจ้าพระยาที่อุดมสมบูรณ์ และเป็นศูนย์กลางการปกครองของประเทศ",
    subProvinces: [
      {
        name: "Bangkok",
        id: "bkk",
        dist: 50,
        tam: 180,
        serenity: 3,
        entertainment: 10,
        relax: 5,
        image:
          "https://images.unsplash.com/photo-1582236873539-7cb88849b2c3?q=80&w=1000",
      },
      {
        name: "Ayutthaya",
        id: "ay",
        dist: 16,
        tam: 209,
        serenity: 8,
        entertainment: 4,
        relax: 8,
        image:
          "https://images.unsplash.com/photo-1559606772-23719028021a?q=80&w=1000",
      },
      {
        name: "Kanchanaburi",
        id: "kan",
        dist: 13,
        tam: 98,
        serenity: 9,
        entertainment: 5,
        relax: 10,
        image:
          "https://images.unsplash.com/photo-1592393739775-690226305632?q=80&w=1000",
      },
      {
        name: "Samut Prakan",
        id: "sp",
        dist: 6,
        tam: 50,
        serenity: 4,
        entertainment: 6,
        relax: 4,
        image:
          "https://images.unsplash.com/photo-1621533722026-626a57565362?q=80&w=1000",
      },
      {
        name: "Nonthaburi",
        id: "nbi",
        dist: 6,
        tam: 52,
        serenity: 5,
        entertainment: 5,
        relax: 5,
        image:
          "https://images.unsplash.com/photo-1621533722026-626a57565362?q=80&w=1000",
      },
      {
        name: "Pathum Thani",
        id: "pte",
        dist: 7,
        tam: 60,
        serenity: 6,
        entertainment: 4,
        relax: 5,
        image:
          "https://images.unsplash.com/photo-1621533722026-626a57565362?q=80&w=1000",
      },
    ],
  },
  {
    id: "south",
    name: "ภาคใต้",
    engName: "SOUTH",
    code: "S-SEC",
    color: "text-blue-400",
    safety: 82,
    gradient: "bg-gradient-to-br from-blue-600/20 to-blue-900/10",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=600",
    summary: { provinces: 14, area: "70,715", pop: "9.4M" },
    stats: {
      dailyCost: "400 ฿",
      monthlyCost: "18,000 ฿",
      flora: "ยางพารา",
      food: "แกงส้ม",
      attraction: "เกาะพีพี",
      nightlife: "ป่าตอง",
    },
    desc: "ไข่มุกอันดามัน สวรรค์ของคนรักทะเลและหมู่เกาะ ขนาบด้วยทะเลสองฝั่ง อุดมสมบูรณ์ด้วยทรัพยากรทางทะเลและการท่องเที่ยวระดับโลก",
    subProvinces: [
      {
        name: "Phuket",
        id: "pkt",
        dist: 3,
        tam: 17,
        serenity: 5,
        entertainment: 10,
        relax: 9,
        image:
          "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=600",
      },
      {
        name: "Surat Thani",
        id: "srt",
        dist: 19,
        tam: 131,
        serenity: 7,
        entertainment: 8,
        relax: 9,
        image:
          "https://images.unsplash.com/photo-1595003309539-775608670732?q=80&w=600",
      },
      {
        name: "Hat Yai",
        id: "hy",
        dist: 16,
        tam: 127,
        serenity: 5,
        entertainment: 8,
        relax: 6,
        image:
          "https://images.unsplash.com/photo-1605367831034-722659779354?q=80&w=600",
      },
      {
        name: "Krabi",
        id: "kb",
        dist: 8,
        tam: 53,
        serenity: 9,
        entertainment: 6,
        relax: 10,
        image:
          "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600",
      },
      {
        name: "Phang Nga",
        id: "pna",
        dist: 8,
        tam: 48,
        serenity: 10,
        entertainment: 4,
        relax: 10,
        image:
          "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600",
      },
      {
        name: "Trang",
        id: "trg",
        dist: 10,
        tam: 87,
        serenity: 8,
        entertainment: 3,
        relax: 9,
        image:
          "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600",
      },
    ],
  },
  {
    id: "west",
    name: "ภาคตะวันตก",
    engName: "WEST",
    code: "W-SEC",
    color: "text-amber-400",
    safety: 85,
    gradient: "bg-gradient-to-br from-amber-600/20 to-amber-900/10",
    image:
      "https://images.unsplash.com/photo-1592393739775-690226305632?auto=format&fit=crop&q=80&w=600",
    summary: { provinces: 5, area: "53,679", pop: "3.5M" },
    stats: {
      dailyCost: "350 ฿",
      monthlyCost: "14,000 ฿",
      flora: "ไผ่",
      food: "ก๋วยเตี๋ยวเรือ",
      attraction: "สะพานข้ามแม่น้ำแคว",
      nightlife: "ริมแคว",
    },
    desc: "ภาคตะวันตก มีภูมิประเทศที่โดดเด่นด้วยภูเขาสูงชัน ป่าเขียวชอุ่ม และน้ำตกงดงาม เป็นแหล่งประวัติศาสตร์สำคัญสมัยสงครามโลกครั้งที่ 2",
    subProvinces: [
      {
        name: "Tak",
        id: "tak",
        dist: 9,
        tam: 63,
        serenity: 9,
        entertainment: 3,
        relax: 9,
        image:
          "https://images.unsplash.com/photo-1598246738029-79774b9337ac?q=80&w=600",
      },
      {
        name: "Kanchanaburi",
        id: "kan",
        dist: 13,
        tam: 98,
        serenity: 9,
        entertainment: 5,
        relax: 10,
        image:
          "https://images.unsplash.com/photo-1592393739775-690226305632?q=80&w=600",
      },
      {
        name: "Ratchaburi",
        id: "ratch",
        dist: 10,
        tam: 104,
        serenity: 7,
        entertainment: 5,
        relax: 7,
        image:
          "https://images.unsplash.com/photo-1598246738029-79774b9337ac?q=80&w=600",
      },
      {
        name: "Phetchaburi",
        id: "phet",
        dist: 8,
        tam: 93,
        serenity: 8,
        entertainment: 4,
        relax: 8,
        image:
          "https://images.unsplash.com/photo-1598246738029-79774b9337ac?q=80&w=600",
      },
      {
        name: "Prachuap Khiri Khan",
        id: "prac",
        dist: 8,
        tam: 48,
        serenity: 9,
        entertainment: 6,
        relax: 10,
        image:
          "https://images.unsplash.com/photo-1598246738029-79774b9337ac?q=80&w=600",
      },
    ],
  },
  {
    id: "east",
    name: "ภาคตะวันออก",
    engName: "EAST",
    code: "E-SEC",
    color: "text-violet-400",
    safety: 90,
    gradient: "bg-gradient-to-br from-violet-600/20 to-violet-900/10",
    image:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&q=80&w=600",
    summary: { provinces: 7, area: "36,503", pop: "4.8M" },
    stats: {
      dailyCost: "450 ฿",
      monthlyCost: "20,000 ฿",
      flora: "ทุเรียน",
      food: "อาหารทะเล",
      attraction: "เกาะเสม็ด",
      nightlife: "พัทยา",
    },
    desc: "ภาคตะวันออก ศูนย์กลางอุตสาหกรรมและท่าเรือสำคัญของไทย มีชายหาดสวยงาม เกาะแก่งมากมาย และเป็นแหล่งผลไม้เลื่องชื่อโดยเฉพาะทุเรียน",
    subProvinces: [
      {
        name: "Chonburi",
        id: "chon",
        dist: 11,
        tam: 92,
        serenity: 4,
        entertainment: 10,
        relax: 6,
        image:
          "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=600",
      },
      {
        name: "Rayong",
        id: "ray",
        dist: 8,
        tam: 58,
        serenity: 6,
        entertainment: 7,
        relax: 8,
        image:
          "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=600",
      },
      {
        name: "Chanthaburi",
        id: "chan",
        dist: 10,
        tam: 76,
        serenity: 8,
        entertainment: 4,
        relax: 9,
        image:
          "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=600",
      },
      {
        name: "Trat",
        id: "trat",
        dist: 7,
        tam: 38,
        serenity: 9,
        entertainment: 5,
        relax: 10,
        image:
          "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=600",
      },
    ],
  },
];
