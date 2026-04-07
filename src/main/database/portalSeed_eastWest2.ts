// Portal seed data: ภาคตะวันออก+ตะวันตก Part 2 (5 จังหวัด)
// Source: documents/deepreserach/part5_ภาคตะวันออก+ตะวันตก.md
import type { ProvincePortalSeedData } from './db';

export const eastWest2: Record<string, ProvincePortalSeedData> = {
  "Chachoengsao": {
  "transport": [
    {
      "name": "รถไฟสายตะวันออก กรุงเทพฯ-ฉะเชิงเทรา",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "เดินทางสะดวกจากกรุงเทพฯ มีทั้งขบวนธรรมดาและชานเมือง",
      "warpUrl": "https://www.railway.co.th/",
      "logoText": "🚆",
      "color": "#3b82f6"
    },
    {
      "name": "รถตู้/มินิบัสกรุงเทพฯ-ฉะเชิงเทรา",
      "shortName": "รถตู้",
      "type": "van",
      "description": "ตัวเลือกหลักจากกรุงเทพฯ ใช้เวลาราว 1-2 ชม. แล้วแต่จุดขึ้นรถ",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#38bdf8"
    },
    {
      "name": "รถสองแถวแปดริ้ว",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "เชื่อมต่อย่านตลาด/สถานีรถไฟ/วัดโสธรและชุมชนต่าง ๆ",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#f97316"
    },
    {
      "name": "รถจักรยานยนต์รับจ้าง",
      "shortName": "วินมอเตอร์ไซค์",
      "type": "bike",
      "description": "เหมาะกับการเลาะริมแม่น้ำบางปะกงและซอยต่าง ๆ",
      "warpUrl": "",
      "logoText": "🛵",
      "color": "#a855f7"
    },
    {
      "name": "เรือท่องเที่ยวแม่น้ำบางปะกง (บางพื้นที่)",
      "shortName": "เรือ",
      "type": "boat",
      "description": "มีบางชุมชน/ท่าเรือจัดเรือชมวิถีริมแม่น้ำและวัดสำคัญเป็นรอบ ๆ",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#14b8a6"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - ฉะเชิงเทรา (รถตู้)",
      "type": "van",
      "operator": "รถตู้สายกรุงเทพฯ-แปดริ้ว",
      "from": "กรุงเทพฯ",
      "to": "ฉะเชิงเทรา (ตัวเมือง)",
      "via": [
        "สมุทรปราการ"
      ],
      "departureTimes": [
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00"
      ],
      "duration": "1-2 ชม.",
      "baseFare": 120,
      "frequency": "ทุก 30-60 นาที (โดยประมาณ)",
      "terminal": "จุดขึ้นรถในกรุงเทพฯ (ขึ้นกับคิวรถ)",
      "notes": "รอบเดินรถและจุดจอดอาจเปลี่ยน"
    },
    {
      "name": "สาย 2: กรุงเทพฯ - ฉะเชิงเทรา (รถไฟสายตะวันออก)",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย (SRT)",
      "from": "กรุงเทพฯ (สถานีกลาง/สถานีต้นทางสายตะวันออก)",
      "to": "ฉะเชิงเทรา (สถานีหลักในเมือง)",
      "via": [],
      "departureTimes": [
        "06:30",
        "08:30",
        "16:30"
      ],
      "duration": "1.5-2.5 ชม.",
      "baseFare": 20,
      "frequency": "หลายขบวน/วัน",
      "terminal": "สถานีรถไฟต้นทางในกรุงเทพฯ",
      "notes": "ตรวจสอบขบวนและเวลาใน SRT Timetable ก่อนเดินทาง"
    },
    {
      "name": "สาย 3: ฉะเชิงเทรา - วัดโสธรวรารามวรวิหาร",
      "type": "bus",
      "operator": "รถสองแถว/รถรับจ้าง",
      "from": "ฉะเชิงเทรา (สถานี/ตลาด)",
      "to": "วัดโสธรวรารามวรวิหาร",
      "via": [],
      "departureTimes": [
        "09:00",
        "11:00",
        "13:00",
        "15:00",
        "17:00"
      ],
      "duration": "15-40 นาที",
      "baseFare": 20,
      "frequency": "ออกถี่ตลอดวัน",
      "terminal": "คิวรถในตัวเมือง",
      "notes": "ค่ารถขึ้นกับจุดขึ้น-ลงและประเภทรถ"
    },
    {
      "name": "สาย 4: ฉะเชิงเทรา - ตลาดบ้านใหม่ 100 ปี",
      "type": "bus",
      "operator": "รถสองแถว/รถรับจ้าง",
      "from": "ฉะเชิงเทรา (ตัวเมือง)",
      "to": "ตลาดบ้านใหม่ 100 ปี",
      "via": [],
      "departureTimes": [
        "09:00",
        "12:00",
        "15:00"
      ],
      "duration": "20-45 นาที",
      "baseFare": 20,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "คิวรถในตัวเมือง",
      "notes": "วันเสาร์-อาทิตย์คนแน่น ควรเผื่อเวลา"
    }
  ],
  "localFoods": [
    {
      "name": "ปลาช่อนแปดริ้ว (เมนูปลาช่อน)",
      "priceRange": "120-350฿",
      "category": "local",
      "note": "ปลาช่อนจากลุ่มน้ำบางปะกงเป็นอัตลักษณ์ของแปดริ้ว"
    },
    {
      "name": "ต้มยำหัวปลีปลาช่อน",
      "priceRange": "120-250฿",
      "category": "local",
      "note": "เมนูอาหารถิ่นที่ถูกเสนอ/คัดเลือกในกิจกรรมระดับจังหวัด"
    },
    {
      "name": "ก๋วยเตี๋ยวปากหม้อ",
      "priceRange": "40-90฿",
      "category": "street",
      "note": "ของกินดังในตัวเมืองและตลาดเก่า"
    },
    {
      "name": "ขนมหัวผักกาดหวาน",
      "priceRange": "20-60฿",
      "category": "dessert",
      "note": "ขนมหวานท้องถิ่นที่พบได้ตามตลาด"
    },
    {
      "name": "แกงส้มปลาอีกง",
      "priceRange": "80-180฿",
      "category": "local",
      "note": "เมนูปลาท้องถิ่นแนวภาคกลางตะวันออก"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "600-1,200฿/คืน",
      "examples": [
        "Sunee View Hotel",
        "JK Living Hotel and Service Apartment",
        "Yenjit Resort"
      ],
      "bookingUrl": "https://www.agoda.com/city/chachoengsao-th.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1,200-2,800฿/คืน",
      "examples": [
        "The Wish Hotel",
        "JK Living Hotel and Service Apartment",
        "Yenjit Resort"
      ],
      "bookingUrl": "https://www.agoda.com/city/chachoengsao-th.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2,800-6,000฿/คืน",
      "examples": [
        "The Wish Hotel",
        "Yenjit Resort",
        "JK Living Hotel and Service Apartment"
      ],
      "bookingUrl": "https://www.agoda.com/city/chachoengsao-th.html"
    }
  ],
  "dangerZones": [
    {
      "label": "น้ำท่วมขัง/น้ำล้นตลิ่งบางปะกง (บางปี)",
      "severity": "medium",
      "note": "ช่วงฝนหนักอาจมีน้ำท่วมขังในย่านลุ่มน้ำและถนนบางสาย",
      "season": "ก.ย.-พ.ย."
    },
    {
      "label": "อากาศร้อนจัด",
      "severity": "medium",
      "note": "ช่วงมี.ค.-พ.ค. อากาศร้อนมาก ควรระวังฮีตสโตรก โดยเฉพาะกิจกรรมกลางแจ้ง",
      "season": "มี.ค.-พ.ค."
    },
    {
      "label": "การจราจรและอุบัติเหตุบนถนนสายหลัก (304/314/ศรีนครินทร์)",
      "severity": "medium",
      "note": "เส้นทางมีรถหนักและวิ่งเร็ว ควรขับขี่ระมัดระวัง",
      "season": null
    }
  ],
  "ecoIds": [
    "t_urban",
    "t_mangrove",
    "c_monsoon",
    "c_heat_stroke",
    "c_pm25",
    "f_dog_stray"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิประมาณ 23-36°C, ร้อนชื้น ฝนพ.ค.-ต.ค. ปลายฝนอาจมีฝนหนักบางช่วง",
    "terrain": "พื้นที่ลุ่มแม่น้ำบางปะกง มีชุมชนเมือง-เกษตร และปากแม่น้ำเชื่อมชายฝั่ง",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
},
  "Prachin Buri": {
  "transport": [
    {
      "name": "รถไฟสายตะวันออก กรุงเทพฯ-ปราจีนบุรี",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "มีสถานีหลักในจังหวัด ใช้เดินทางเชื่อมกรุงเทพฯและภาคตะวันออก",
      "warpUrl": "https://www.railway.co.th/",
      "logoText": "🚆",
      "color": "#3b82f6"
    },
    {
      "name": "รถตู้กรุงเทพฯ-ปราจีนบุรี/กบินทร์บุรี",
      "shortName": "รถตู้",
      "type": "van",
      "description": "นิยมมากสำหรับคนทำงาน/ท่องเที่ยว ใช้เวลาราว 2-3.5 ชม. ตามปลายทาง",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#38bdf8"
    },
    {
      "name": "รถโดยสารท้องถิ่น/สองแถว",
      "shortName": "รถท้องถิ่น",
      "type": "songthaew",
      "description": "เชื่อมต่ออำเภอต่าง ๆ และตลาดในตัวเมือง",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#f97316"
    },
    {
      "name": "รถจักรยานยนต์รับจ้าง",
      "shortName": "วินมอเตอร์ไซค์",
      "type": "bike",
      "description": "เหมาะกับระยะสั้นและจุดที่รถสาธารณะเข้าถึงยาก",
      "warpUrl": "",
      "logoText": "🛵",
      "color": "#a855f7"
    },
    {
      "name": "รถรับจ้างเหมาคันไปอุทยาน/น้ำตก",
      "shortName": "เหมารถ",
      "type": "other",
      "description": "เหมาะกับการไปพื้นที่ธรรมชาติ เช่น ทับลาน/เขาใหญ่ (บางพื้นที่) ที่รถประจำทางเข้าถึงยาก",
      "warpUrl": "",
      "logoText": "🚗",
      "color": "#64748b"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - ปราจีนบุรี (รถตู้)",
      "type": "van",
      "operator": "รถตู้สายกรุงเทพฯ-ปราจีนบุรี",
      "from": "กรุงเทพฯ",
      "to": "ปราจีนบุรี (ตัวเมือง)",
      "via": [
        "ฉะเชิงเทรา"
      ],
      "departureTimes": [
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00"
      ],
      "duration": "2-3 ชม.",
      "baseFare": 160,
      "frequency": "ทุก 30-60 นาที (โดยประมาณ)",
      "terminal": "จุดขึ้นรถในกรุงเทพฯ (ขึ้นกับคิวรถ)",
      "notes": "รอบเดินรถเปลี่ยนได้ตามวัน"
    },
    {
      "name": "สาย 2: กรุงเทพฯ - กบินทร์บุรี (รถตู้)",
      "type": "van",
      "operator": "รถตู้สายกรุงเทพฯ-กบินทร์บุรี",
      "from": "กรุงเทพฯ",
      "to": "ปราจีนบุรี (กบินทร์บุรี)",
      "via": [
        "ฉะเชิงเทรา"
      ],
      "departureTimes": [
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00"
      ],
      "duration": "3-3.5 ชม.",
      "baseFare": 200,
      "frequency": "หลายเที่ยว/วัน",
      "terminal": "จุดขึ้นรถในกรุงเทพฯ",
      "notes": "บางเที่ยวต่อไปสระแก้ว/อรัญประเทศ"
    },
    {
      "name": "สาย 3: กรุงเทพฯ - ปราจีนบุรี (รถไฟสายตะวันออก)",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย (SRT)",
      "from": "กรุงเทพฯ (สถานีกลาง/สถานีต้นทางสายตะวันออก)",
      "to": "ปราจีนบุรี (สถานีในจังหวัด)",
      "via": [
        "ฉะเชิงเทรา"
      ],
      "departureTimes": [
        "06:30",
        "16:30"
      ],
      "duration": "2.5-4 ชม.",
      "baseFare": 40,
      "frequency": "วันละ 1-2 ขบวน (โดยประมาณ)",
      "terminal": "สถานีรถไฟต้นทางในกรุงเทพฯ",
      "notes": "ตรวจสอบขบวนและเวลาใน SRT Timetable ก่อนเดินทาง"
    },
    {
      "name": "สาย 4: ตัวเมืองปราจีนบุรี - อุทยานแห่งชาติทับลาน (นาดี)",
      "type": "van",
      "operator": "รถตู้/เหมารถท้องถิ่น",
      "from": "ปราจีนบุรี (ตัวเมือง)",
      "to": "ปราจีนบุรี (อ.นาดี/ทับลาน)",
      "via": [],
      "departureTimes": [
        "08:00",
        "10:00",
        "14:00"
      ],
      "duration": "1-2 ชม.",
      "baseFare": 120,
      "frequency": "วันละหลายเที่ยว/ตามนัด",
      "terminal": "คิวรถในตัวเมือง",
      "notes": "เส้นทางธรรมชาติ ควรเช็คประกาศอุทยานเรื่องการปิดเส้นทางช่วงฝนหนัก"
    }
  ],
  "localFoods": [
    {
      "name": "ขนมเขียวใบหยก",
      "priceRange": "20-60฿",
      "category": "dessert",
      "note": "เมนูอาหารถิ่นตัวแทนจังหวัดปราจีนบุรี (โครงการเชิดชูอาหารถิ่น)"
    },
    {
      "name": "หน่อไม้ไผ่ตงหวาน (ตามฤดูกาล)",
      "priceRange": "60-200฿",
      "category": "local",
      "note": "วัตถุดิบเด่นของพื้นที่ นำไปทำได้หลายเมนู เช่น ต้มจืด/ผัด/หมก"
    },
    {
      "name": "ต้มจืดหน่อไม้ไผ่ตง",
      "priceRange": "60-120฿",
      "category": "local",
      "note": "เมนูตามฤดูฝนเมื่อหน่อไม้ออก"
    },
    {
      "name": "เครื่องดื่มสมุนไพร/เมนูสมุนไพร",
      "priceRange": "30-80฿",
      "category": "drink",
      "note": "ปราจีนบุรีถูกพูดถึงในฐานะเมืองสมุนไพร มีเมนูเครื่องดื่มสมุนไพรหลายแบบ"
    },
    {
      "name": "อาหารปลาแม่น้ำ/ปลาน้ำจืดท้องถิ่น",
      "priceRange": "120-300฿",
      "category": "local",
      "note": "พบตามร้านอาหารริมแม่น้ำ/ชุมชน (ราคาแปรผัน)"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "700-1,500฿/คืน",
      "examples": [
        "The Garden 304",
        "The Desiign Hotel",
        "Serenity Hotel & Spa Kabinburi"
      ],
      "bookingUrl": "https://www.agoda.com/region/prachin-buri-province-th.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1,500-3,500฿/คืน",
      "examples": [
        "Tawaravadee Resort",
        "The Garden 304",
        "Dasada Gallery Resort"
      ],
      "bookingUrl": "https://www.agoda.com/region/prachin-buri-province-th.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "3,500-12,000฿/คืน",
      "examples": [
        "Dasada Gallery Resort",
        "Tawaravadee Resort",
        "Serenity Hotel & Spa Kabinburi"
      ],
      "bookingUrl": "https://www.agoda.com/region/prachin-buri-province-th.html"
    }
  ],
  "dangerZones": [
    {
      "label": "ช้างป่าและสัตว์ป่าในพื้นที่ป่า/อุทยาน",
      "severity": "high",
      "note": "พื้นที่ป่าต่อเนื่องดงพญาเย็น-เขาใหญ่ มีโอกาสพบช้างและสัตว์ป่า โดยเฉพาะช่วงเย็น-กลางคืน",
      "season": null
    },
    {
      "label": "น้ำป่าไหลหลาก/ทางลื่นในฤดูฝน",
      "severity": "medium",
      "note": "สายเที่ยวอุทยาน/น้ำตกควรระวังน้ำหลากฉับพลันและถนนลื่น",
      "season": "ก.ค.-ต.ค."
    },
    {
      "label": "ขับรถกลางคืนบนถนนสาย 304 (รถหนัก)",
      "severity": "medium",
      "note": "บางช่วงมีรถบรรทุกจำนวนมากและวิ่งเร็ว ควรพักเมื่อเหนื่อยและหลีกเลี่ยงง่วงขับ",
      "season": null
    }
  ],
  "ecoIds": [
    "t_rainforest",
    "t_mountain",
    "f_elephant",
    "c_monsoon",
    "c_flash_flood",
    "fl_bamboo"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิประมาณ 22-35°C, ร้อนชื้น ฝนพ.ค.-ต.ค. พื้นที่ป่าเขาอากาศเย็นกว่าส่วนเมือง",
    "terrain": "พื้นที่ราบสลับภูเขา เชื่อมต่อผืนป่าดงพญาเย็น มีอุทยานและพื้นที่เกษตร",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
},
  "Kanchanaburi": {
  "transport": [
    {
      "name": "รถไฟสายธนบุรี-น้ำตก (สายมรณะ/แม่น้ำแคว)",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "เส้นทางรถไฟยอดนิยมสู่กาญจนบุรีและน้ำตก เหมาะทั้งท่องเที่ยวและเดินทางทั่วไป",
      "warpUrl": "https://www.railway.co.th/",
      "logoText": "🚆",
      "color": "#3b82f6"
    },
    {
      "name": "รถตู้กรุงเทพฯ-กาญจนบุรี",
      "shortName": "รถตู้",
      "type": "van",
      "description": "เดินทางเร็วจากกรุงเทพฯถึงตัวเมืองกาญจนบุรี เหมาะไปเช้า-เย็นกลับได้",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#38bdf8"
    },
    {
      "name": "รถบัส/รถทัวร์กรุงเทพฯ-กาญจนบุรี",
      "shortName": "รถบัส",
      "type": "bus",
      "description": "มีทั้งรถ บขส. และเอกชน ปลายทางสถานีขนส่งกาญจนบุรี",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#0ea5e9"
    },
    {
      "name": "รถสองแถวกาญจนบุรี",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "พาหนะหลักในตัวเมือง ใช้ต่อไปสถานที่เที่ยวใกล้เมืองตามคิวรถ",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#f97316"
    },
    {
      "name": "เรือท่องเที่ยวแม่น้ำแคว/เรือหางยาว",
      "shortName": "เรือ",
      "type": "boat",
      "description": "ใช้ท่องเที่ยวและเดินทางในบางจุดริมแม่น้ำแคว (ขึ้นกับพื้นที่ให้บริการ)",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#14b8a6"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - กาญจนบุรี (รถตู้)",
      "type": "van",
      "operator": "รถตู้สายกรุงเทพฯ-กาญจนบุรี",
      "from": "กรุงเทพฯ",
      "to": "กาญจนบุรี (ตัวเมือง)",
      "via": [
        "นครปฐม"
      ],
      "departureTimes": [
        "05:00",
        "07:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00"
      ],
      "duration": "2.5-3.5 ชม.",
      "baseFare": 150,
      "frequency": "ทุก 30-60 นาที (โดยประมาณ)",
      "terminal": "จุดขึ้นรถในกรุงเทพฯ (ขึ้นกับคิวรถ)",
      "notes": "เที่ยวสุดท้ายอาจเร็วในวันธรรมดาบางวัน"
    },
    {
      "name": "สาย 2: กรุงเทพฯ (ธนบุรี) - กาญจนบุรี (รถไฟ)",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย (SRT)",
      "from": "กรุงเทพฯ (สถานีธนบุรี)",
      "to": "กาญจนบุรี",
      "via": [
        "นครปฐม",
        "ราชบุรี"
      ],
      "departureTimes": [
        "07:50",
        "13:55"
      ],
      "duration": "3-4 ชม.",
      "baseFare": 100,
      "frequency": "วันละ 2 เที่ยว (โดยประมาณ)",
      "terminal": "สถานีธนบุรี",
      "notes": "ตารางเดินรถอาจเปลี่ยน ให้ตรวจสอบกับ SRT ก่อนเดินทาง"
    },
    {
      "name": "สาย 3: กาญจนบุรี - น้ำตก/ไทรโยค (รถไฟ/รถตู้)",
      "type": "train",
      "operator": "SRT/รถตู้ท้องถิ่น",
      "from": "กาญจนบุรี",
      "to": "น้ำตก/ไทรโยค",
      "via": [],
      "departureTimes": [
        "10:30",
        "16:20"
      ],
      "duration": "1.5-3 ชม.",
      "baseFare": 60,
      "frequency": "วันละ 1-2 เที่ยว (โดยประมาณ)",
      "terminal": "สถานีรถไฟกาญจนบุรี",
      "notes": "เหมาะกับสายเที่ยวสะพานข้ามแม่น้ำแควและเส้นทางรถไฟท่องเที่ยว"
    },
    {
      "name": "สาย 4: ตัวเมืองกาญจนบุรี - น้ำตกเอราวัณ",
      "type": "van",
      "operator": "รถตู้/เหมารถท้องถิ่น",
      "from": "กาญจนบุรี (ตัวเมือง)",
      "to": "อุทยานแห่งชาติเอราวัณ",
      "via": [],
      "departureTimes": [
        "08:00",
        "10:00",
        "13:00"
      ],
      "duration": "1-2 ชม.",
      "baseFare": 100,
      "frequency": "วันละหลายเที่ยว/ตามนัด",
      "terminal": "คิวรถในตัวเมือง",
      "notes": "ช่วงหน้าฝนควรเช็คสภาพทางและประกาศอุทยาน"
    }
  ],
  "localFoods": [
    {
      "name": "แกงป่าเมืองกาญจน์",
      "priceRange": "80-200฿",
      "category": "local",
      "note": "อาหารขึ้นชื่อของกาญจนบุรี รสจัดจ้านเครื่องแกงแน่น"
    },
    {
      "name": "ต้มยำ/ผัดฉ่าปลาคัง (ปลาแม่น้ำ)",
      "priceRange": "150-350฿",
      "category": "local",
      "note": "ร้านอาหารริมแม่น้ำแควหลายร้านขึ้นชื่อเมนูปลาแม่น้ำ"
    },
    {
      "name": "แกงส้มญวน",
      "priceRange": "80-180฿",
      "category": "local",
      "note": "อาหารพื้นถิ่นบางชุมชนในกาญจนบุรี (อิทธิพลญวน)"
    },
    {
      "name": "น้ำพริกกะเหรี่ยง/อาหารป่าพื้นบ้าน",
      "priceRange": "80-250฿",
      "category": "local",
      "note": "บางพื้นที่ชุมชนมีอาหารป่าตามวัตถุดิบฤดูกาล"
    },
    {
      "name": "กล้วย/ผลไม้ท้องถิ่น (ตามฤดูกาล)",
      "priceRange": "30-120฿",
      "category": "dessert",
      "note": "ผลไม้ตามฤดูกาลจากพื้นที่เกษตร"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "700-1,600฿/คืน",
      "examples": [
        "P.Y. Guesthouse",
        "Good Times Resort Kanchanaburi",
        "The Bridge Residence Hotel"
      ],
      "bookingUrl": "https://www.agoda.com/region/kanchanaburi-province-th.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1,600-4,500฿/คืน",
      "examples": [
        "U Inchantree Kanchanaburi",
        "Felix River Kwai Resort",
        "Mida Resort Kanchanaburi"
      ],
      "bookingUrl": "https://www.agoda.com/region/kanchanaburi-province-th.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "4,500-25,000฿/คืน",
      "examples": [
        "The FloatHouse River Kwai",
        "X2 River Kwai Resort",
        "Hintok River Camp at Hellfire Pass"
      ],
      "bookingUrl": "https://www.agoda.com/region/kanchanaburi-province-th.html"
    }
  ],
  "dangerZones": [
    {
      "label": "น้ำป่าไหลหลาก/กระแสน้ำแรงบริเวณน้ำตกและลำห้วย",
      "severity": "high",
      "note": "ฝนหนักอาจเกิดน้ำหลากฉับพลันและกระแสน้ำแรง โดยเฉพาะน้ำตกยอดนิยม",
      "season": "ก.ค.-ต.ค."
    },
    {
      "label": "ถ้ำ/หน้าผาและเส้นทางเดินป่า",
      "severity": "medium",
      "note": "หลายจุดเป็นหินปูนลื่นและมืด ควรมีไฟฉาย/รองเท้ากันลื่นและทำตามคำแนะนำเจ้าหน้าที่",
      "season": null
    },
    {
      "label": "ช้างป่า/สัตว์ป่าในอุทยานและพื้นที่ป่า",
      "severity": "medium",
      "note": "อาจพบสัตว์ป่าในพื้นที่ป่าตะวันตก ควรเว้นระยะและไม่ให้อาหารสัตว์",
      "season": null
    }
  ],
  "ecoIds": [
    "t_mountain",
    "t_rainforest",
    "t_cave",
    "c_monsoon",
    "c_flash_flood",
    "f_elephant",
    "f_snake_cobra"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิประมาณ 20-36°C, ร้อนช่วงมี.ค.-พ.ค. ฝนพ.ค.-ต.ค. เขตภูเขาเย็นกว่าตัวเมือง",
    "terrain": "พื้นที่กว้าง มีเทือกเขา ถ้ำ และแม่น้ำแคว เหมาะกับธรรมชาติ-ประวัติศาสตร์",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
},
  "Ratchaburi": {
  "transport": [
    {
      "name": "รถไฟสายใต้ (ผ่านสถานีราชบุรี)",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "ใช้เดินทางจากกรุงเทพฯลงภาคใต้ โดยจอดที่สถานีราชบุรี",
      "warpUrl": "https://www.railway.co.th/",
      "logoText": "🚆",
      "color": "#3b82f6"
    },
    {
      "name": "รถตู้/มินิบัสกรุงเทพฯ-ราชบุรี",
      "shortName": "รถตู้",
      "type": "van",
      "description": "เดินทางจากกรุงเทพฯถึงตัวเมืองราชบุรี ใช้เวลาราว 1.5-2.5 ชม.",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#38bdf8"
    },
    {
      "name": "รถบัส/รถโดยสารประจำทาง",
      "shortName": "รถบัส",
      "type": "bus",
      "description": "มีรถจากกรุงเทพฯ (สายใต้ใหม่) และรถภายในจังหวัดไปอำเภอต่าง ๆ",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#0ea5e9"
    },
    {
      "name": "รถสองแถวราชบุรี",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "ใช้เดินทางในตัวเมืองและต่อไปอำเภอสำคัญ เช่น โพธาราม/ดำเนินสะดวก",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#f97316"
    },
    {
      "name": "เรือหางยาวตลาดน้ำดำเนินสะดวก",
      "shortName": "เรือตลาดน้ำ",
      "type": "boat",
      "description": "เรือท่องเที่ยวในคลอง/ตลาดน้ำ (คิดค่าบริการเป็นรอบ)",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#14b8a6"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ (สายใต้ใหม่) - ราชบุรี",
      "type": "coach",
      "operator": "บขส./ผู้ประกอบการเอกชน",
      "from": "กรุงเทพฯ (สถานีขนส่งสายใต้ใหม่)",
      "to": "ราชบุรี (ตัวเมือง)",
      "via": [
        "นครปฐม"
      ],
      "departureTimes": [
        "05:00",
        "07:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00"
      ],
      "duration": "1.5-2.5 ชม.",
      "baseFare": 120,
      "frequency": "ทุก 1-2 ชม. (โดยประมาณ)",
      "terminal": "สถานีขนส่งสายใต้ใหม่",
      "notes": "เวลา/ราคาเปลี่ยนตามบริษัทและวันเดินทาง"
    },
    {
      "name": "สาย 2: กรุงเทพฯ - ราชบุรี (รถไฟสายใต้)",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย (SRT)",
      "from": "กรุงเทพฯ (สถานีกลาง/สถานีบางซื่อ/หัวลำโพงเดิม)",
      "to": "ราชบุรี (สถานีรถไฟราชบุรี)",
      "via": [
        "นครปฐม"
      ],
      "departureTimes": [
        "06:00",
        "14:00",
        "18:00"
      ],
      "duration": "2-3 ชม.",
      "baseFare": 50,
      "frequency": "หลายขบวน/วัน",
      "terminal": "สถานีรถไฟต้นทางในกรุงเทพฯ",
      "notes": "ขึ้นกับขบวนรถไฟสายใต้ที่เลือก"
    },
    {
      "name": "สาย 3: ราชบุรี - ตลาดน้ำดำเนินสะดวก",
      "type": "van",
      "operator": "รถตู้/สองแถวท้องถิ่น",
      "from": "ราชบุรี (ตัวเมือง)",
      "to": "ดำเนินสะดวก (ตลาดน้ำ)",
      "via": [],
      "departureTimes": [
        "08:00",
        "10:00",
        "12:00",
        "14:00"
      ],
      "duration": "45-90 นาที",
      "baseFare": 50,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "คิวรถในตัวเมืองราชบุรี",
      "notes": "เที่ยวเช้าแนะนำเพื่อหลีกเลี่ยงคนแน่น"
    },
    {
      "name": "สาย 4: ดำเนินสะดวก - ล่องเรือในตลาดน้ำ",
      "type": "boat",
      "operator": "เรือหางยาวท้องถิ่น",
      "from": "ตลาดน้ำดำเนินสะดวก",
      "to": "คลอง/ชุมชนริมน้ำ",
      "via": [],
      "departureTimes": [
        "09:00",
        "10:00",
        "11:00",
        "12:00"
      ],
      "duration": "30-60 นาที",
      "baseFare": 150,
      "frequency": "ให้บริการตลอดช่วงตลาดเปิด",
      "terminal": "ท่าเรือในตลาดน้ำ",
      "notes": "ควรตกลงราคาและเส้นทางก่อนลงเรือ"
    }
  ],
  "localFoods": [
    {
      "name": "นมสดหนองโพ",
      "priceRange": "15-60฿",
      "category": "drink",
      "note": "ของฝาก/เครื่องดื่มชื่อดัง ผลิตโดยสหกรณ์โคนมหนองโพ"
    },
    {
      "name": "ไอศกรีม/ขนมจากนมหนองโพ",
      "priceRange": "30-120฿",
      "category": "dessert",
      "note": "คาเฟ่และร้านของฝากมักมีเมนูจากนมสด"
    },
    {
      "name": "ข้าวห่อ (มี่ถ่อง)",
      "priceRange": "20-80฿",
      "category": "local",
      "note": "อาหาร/พิธีกรรมท้องถิ่นของชาวกะเหรี่ยงโพล่ง รับประทานกับมะพร้าวกวน"
    },
    {
      "name": "มะพร้าวกวน (เครื่องกินคู่ข้าวห่อ)",
      "priceRange": "20-70฿",
      "category": "dessert",
      "note": "นิยมทำเป็นของหวาน/ของฝาก"
    },
    {
      "name": "ยำผักกูด (โซนสวนผึ้ง)",
      "priceRange": "80-200฿",
      "category": "street",
      "note": "เมนูยอดนิยมในร้านอาหารแถบสวนผึ้ง (วัตถุดิบผักกูด)"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "600-1,400฿/คืน",
      "examples": [
        "HOP INN Ratchaburi",
        "Space59 Hotel",
        "Mmor Hotel"
      ],
      "bookingUrl": "https://www.agoda.com/region/ratchaburi-province-th.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1,400-3,800฿/คืน",
      "examples": [
        "Navela Hotel & Convention",
        "The Peace Hostel",
        "La Toscana Resort"
      ],
      "bookingUrl": "https://www.agoda.com/region/ratchaburi-province-th.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "3,800-12,000฿/คืน",
      "examples": [
        "La Toscana Resort",
        "Villa Moreeda",
        "The Scenery Vintage Farm Resort"
      ],
      "bookingUrl": "https://www.agoda.com/region/ratchaburi-province-th.html"
    }
  ],
  "dangerZones": [
    {
      "label": "อากาศร้อนจัดและแดดแรง",
      "severity": "medium",
      "note": "ช่วงมี.ค.-พ.ค. อากาศร้อนมาก โดยเฉพาะเที่ยง-บ่าย",
      "season": "มี.ค.-พ.ค."
    },
    {
      "label": "น้ำท่วมขัง/ฝนหนักบางช่วง",
      "severity": "low",
      "note": "พื้นที่ลุ่มและริมคลองอาจมีน้ำท่วมขังเป็นช่วง ๆ",
      "season": "ก.ย.-ต.ค."
    },
    {
      "label": "อุบัติเหตุบนถนนชนบท/เส้นทางภูเขาไปสวนผึ้ง",
      "severity": "medium",
      "note": "ถนนบางช่วงคดเคี้ยวและมืดในตอนกลางคืน ควรระวังความเร็ว",
      "season": null
    }
  ],
  "ecoIds": [
    "t_urban",
    "t_mountain",
    "t_cave",
    "c_monsoon",
    "c_heat_stroke",
    "f_dog_stray"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิประมาณ 22-36°C, ร้อนช่วงมี.ค.-พ.ค. ฝนพ.ค.-ต.ค.",
    "terrain": "มีทั้งที่ราบลุ่มแม่น้ำ/คลองและแนวเขาตะนาวศรีฝั่งตะวันตก (โซนสวนผึ้ง)",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
},
  "Phetchaburi": {
  "transport": [
    {
      "name": "รถไฟสายใต้ กรุงเทพฯ-เพชรบุรี/ชะอำ",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "รถไฟสายใต้จอดหลายสถานีในจังหวัด เหมาะเดินทางไปเมืองเพชรและชะอำ",
      "warpUrl": "https://www.railway.co.th/",
      "logoText": "🚆",
      "color": "#3b82f6"
    },
    {
      "name": "รถทัวร์/รถบัสกรุงเทพฯ-เพชรบุรี",
      "shortName": "รถทัวร์",
      "type": "bus",
      "description": "มีรถจากสถานีขนส่งสายใต้ใหม่ไปเมืองเพชรบุรีและชะอำ",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#0ea5e9"
    },
    {
      "name": "รถตู้กรุงเทพฯ-ชะอำ",
      "shortName": "รถตู้",
      "type": "van",
      "description": "สะดวกสำหรับเที่ยวทะเลชะอำ ใช้เวลาราว 2.5-3.5 ชม.",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#38bdf8"
    },
    {
      "name": "รถสองแถว/รถมินิบัสในเมืองเพชรบุรี",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "ใช้เดินทางในเมืองเพชรบุรีและต่อไปจุดท่องเที่ยวใกล้เมือง",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#f97316"
    },
    {
      "name": "รถรับจ้างเหมาคันไปแก่งกระจาน/อุทยาน",
      "shortName": "เหมารถ",
      "type": "other",
      "description": "เส้นทางธรรมชาติเข้าอุทยานบางช่วงถนนแคบ ควรใช้รถสภาพดีและขับขี่ระวัง",
      "warpUrl": "",
      "logoText": "🚗",
      "color": "#64748b"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ (สายใต้ใหม่) - เพชรบุรี (ตัวเมือง)",
      "type": "coach",
      "operator": "บขส./ผู้ประกอบการเอกชน",
      "from": "กรุงเทพฯ (สายใต้ใหม่)",
      "to": "เพชรบุรี (ตัวเมือง)",
      "via": [
        "สมุทรสาคร",
        "สมุทรสงคราม"
      ],
      "departureTimes": [
        "05:00",
        "07:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00"
      ],
      "duration": "2-3 ชม.",
      "baseFare": 150,
      "frequency": "ทุก 1-2 ชม. (โดยประมาณ)",
      "terminal": "สถานีขนส่งสายใต้ใหม่",
      "notes": "เวลา/ราคาเปลี่ยนตามบริษัทและวันเดินทาง"
    },
    {
      "name": "สาย 2: กรุงเทพฯ - เพชรบุรี (รถไฟสายใต้)",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย (SRT)",
      "from": "กรุงเทพฯ (สถานีกลาง/สถานีต้นทางสายใต้)",
      "to": "เพชรบุรี (สถานีเพชรบุรี)",
      "via": [
        "นครปฐม",
        "ราชบุรี"
      ],
      "departureTimes": [
        "07:30",
        "13:00",
        "19:00"
      ],
      "duration": "2.5-4 ชม.",
      "baseFare": 50,
      "frequency": "หลายขบวน/วัน",
      "terminal": "สถานีรถไฟต้นทางในกรุงเทพฯ",
      "notes": "ขึ้นกับขบวนที่เลือก"
    },
    {
      "name": "สาย 3: กรุงเทพฯ - ชะอำ (รถตู้)",
      "type": "van",
      "operator": "รถตู้สายกรุงเทพฯ-ชะอำ",
      "from": "กรุงเทพฯ",
      "to": "เพชรบุรี (ชะอำ)",
      "via": [
        "สมุทรสาคร",
        "สมุทรสงคราม"
      ],
      "departureTimes": [
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00"
      ],
      "duration": "2.5-3.5 ชม.",
      "baseFare": 200,
      "frequency": "หลายเที่ยว/วัน",
      "terminal": "จุดขึ้นรถในกรุงเทพฯ",
      "notes": "ช่วงวันหยุดอาจเต็มเร็ว ควรจองล่วงหน้า"
    },
    {
      "name": "สาย 4: เพชรบุรี - อุทยานแห่งชาติแก่งกระจาน",
      "type": "van",
      "operator": "รถตู้/เหมารถท้องถิ่น",
      "from": "เพชรบุรี (ตัวเมือง)",
      "to": "แก่งกระจาน",
      "via": [],
      "departureTimes": [
        "08:00",
        "10:00",
        "13:00"
      ],
      "duration": "1.5-3 ชม.",
      "baseFare": 150,
      "frequency": "ตามนัด/ตามฤดูกาล",
      "terminal": "คิวรถในตัวเมือง",
      "notes": "ควรเช็คเงื่อนไขการเข้าอุทยานและสภาพถนนช่วงฝน"
    }
  ],
  "localFoods": [
    {
      "name": "ขนมหม้อแกงเพชรบุรี",
      "priceRange": "25-80฿",
      "category": "dessert",
      "note": "ของฝากขึ้นชื่อ รสหวานหอมไข่และน้ำตาลโตนด"
    },
    {
      "name": "น้ำตาลโตนด/น้ำตาลสด",
      "priceRange": "20-60฿",
      "category": "drink",
      "note": "อัตลักษณ์วัตถุดิบของเมืองเพชร ใช้ทำขนมและเครื่องดื่ม"
    },
    {
      "name": "ข้าวแช่เพชรบุรี",
      "priceRange": "120-250฿",
      "category": "local",
      "note": "เมนูดังของเพชรบุรี นิยมทานช่วงอากาศร้อน"
    },
    {
      "name": "แกงคั่วหัวตาล",
      "priceRange": "80-200฿",
      "category": "local",
      "note": "เมนูท้องถิ่นใช้หัวตาลอ่อน มีรสขมจาง ๆ เป็นเอกลักษณ์"
    },
    {
      "name": "ลอดช่องน้ำตาลโตนด",
      "priceRange": "25-70฿",
      "category": "dessert",
      "note": "ของหวานเย็นยอดนิยม ใช้น้ำตาลโตนดเพิ่มความหอมหวาน"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "700-1,600฿/คืน",
      "examples": [
        "Royal Diamond Hotel",
        "Baan Talay Samran",
        "Cha-Am Methavalai Hotel"
      ],
      "bookingUrl": "https://www.agoda.com/region/phetchaburi-province-th.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1,600-4,500฿/คืน",
      "examples": [
        "The Regent Cha Am Beach Resort",
        "Long Beach Cha-Am Hotel",
        "Veranda Resort & Villas Hua Hin Cha Am - MGallery"
      ],
      "bookingUrl": "https://www.agoda.com/region/phetchaburi-province-th.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "4,500-20,000฿/คืน",
      "examples": [
        "SO/ Sofitel Hua Hin",
        "Veranda Resort & Villas Hua Hin Cha Am - MGallery",
        "The Regent Cha Am Beach Resort"
      ],
      "bookingUrl": "https://www.agoda.com/region/phetchaburi-province-th.html"
    }
  ],
  "dangerZones": [
    {
      "label": "ช้างป่าและสัตว์ป่าในผืนป่าแก่งกระจาน",
      "severity": "high",
      "note": "พื้นที่อุทยานมีสัตว์ป่าหลากหลาย ควรทำตามคำแนะนำเจ้าหน้าที่และไม่เข้าใกล้สัตว์",
      "season": null
    },
    {
      "label": "คลื่นลมแรง/ทะเลปั่นป่วนชายฝั่งชะอำ",
      "severity": "medium",
      "note": "ช่วงมรสุมทะเลอาจคลื่นแรงและมีฝนหนักเป็นช่วง ๆ",
      "season": "พ.ค.-ต.ค."
    },
    {
      "label": "อากาศร้อนจัดและแดดแรง",
      "severity": "medium",
      "note": "ช่วงมี.ค.-พ.ค. อากาศร้อนมาก โดยเฉพาะในเมือง",
      "season": "มี.ค.-พ.ค."
    }
  ],
  "ecoIds": [
    "t_rainforest",
    "t_mountain",
    "t_cave",
    "f_elephant",
    "c_monsoon",
    "c_heat_stroke"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิประมาณ 23-35°C, ร้อนชื้น ฝนพ.ค.-ต.ค. ชายฝั่งมีลมทะเลและมรสุม",
    "terrain": "มีทั้งเมืองเก่า-ที่ราบลุ่ม และผืนป่าใหญ่/เทือกเขาในโซนแก่งกระจาน รวมถึงชายฝั่งชะอำ",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
}
};
