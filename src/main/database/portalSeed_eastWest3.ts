// Portal seed data: ภาคตะวันออก+ตะวันตก Part 3 (1 จังหวัด)
// Source: documents/deepreserach/part5_ภาคตะวันออก+ตะวันตก.md
import type { ProvincePortalSeedData } from './db';

export const eastWest3: Record<string, ProvincePortalSeedData> = {
  "Prachuap Khiri Khan": {
  "transport": [
    {
      "name": "รถไฟสายใต้ กรุงเทพฯ-หัวหิน/ประจวบฯ/บางสะพาน",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "เส้นทางหลักลงภาคใต้ จอดหลายสถานีในจังหวัด เหมาะกับเดินทางประหยัด",
      "warpUrl": "https://www.railway.co.th/",
      "logoText": "🚆",
      "color": "#3b82f6"
    },
    {
      "name": "รถทัวร์/รถบัสกรุงเทพฯ-หัวหิน",
      "shortName": "รถทัวร์",
      "type": "bus",
      "description": "มีรถจากสถานีขนส่งสายใต้ใหม่และจุดอื่น ๆ ไปหัวหินหลายรอบ/วัน",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#0ea5e9"
    },
    {
      "name": "รถตู้กรุงเทพฯ-หัวหิน/ปราณบุรี",
      "shortName": "รถตู้",
      "type": "van",
      "description": "เดินทางสะดวกและค่อนข้างถี่ เหมาะทริปสั้น",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#38bdf8"
    },
    {
      "name": "รถสองแถวหัวหิน/ปราณบุรี",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "พาหนะยอดนิยมในหัวหินและเส้นทางใกล้เคียง (รถสองแถวสีเขียว/ขาวตามสาย)",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#f97316"
    },
    {
      "name": "เรือท่องเที่ยว/สปีดโบ๊ตไปเกาะทะลุ (บางสะพาน)",
      "shortName": "เรือเกาะทะลุ",
      "type": "boat",
      "description": "ทัวร์วันเดียวไปเกาะทะลุ มีเรือรับส่งตามแพ็กเกจ",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#14b8a6"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ (สายใต้ใหม่) - หัวหิน",
      "type": "coach",
      "operator": "บขส./ผู้ประกอบการเอกชน",
      "from": "กรุงเทพฯ (สายใต้ใหม่)",
      "to": "ประจวบคีรีขันธ์ (หัวหิน)",
      "via": [
        "สมุทรสาคร",
        "สมุทรสงคราม",
        "เพชรบุรี"
      ],
      "departureTimes": [
        "05:00",
        "07:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00"
      ],
      "duration": "3-4.5 ชม.",
      "baseFare": 200,
      "frequency": "ทุก 1-2 ชม. (โดยประมาณ)",
      "terminal": "สถานีขนส่งสายใต้ใหม่",
      "notes": "วันหยุดอาจเต็มเร็ว ควรจองล่วงหน้า"
    },
    {
      "name": "สาย 2: กรุงเทพฯ - หัวหิน (รถไฟสายใต้)",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย (SRT)",
      "from": "กรุงเทพฯ (สถานีกลาง/สถานีต้นทางสายใต้)",
      "to": "หัวหิน",
      "via": [
        "นครปฐม",
        "ราชบุรี",
        "เพชรบุรี"
      ],
      "departureTimes": [
        "07:30",
        "15:10",
        "20:30"
      ],
      "duration": "3.5-5 ชม.",
      "baseFare": 100,
      "frequency": "หลายขบวน/วัน",
      "terminal": "สถานีรถไฟต้นทางในกรุงเทพฯ",
      "notes": "เลือกขบวนเร็ว/ธรรมดา ระยะเวลาต่างกัน"
    },
    {
      "name": "สาย 3: สุวรรณภูมิ - หัวหิน (รถบัส บขส.)",
      "type": "bus",
      "operator": "บริษัท ขนส่ง จำกัด (บขส.)",
      "from": "สนามบินสุวรรณภูมิ",
      "to": "หัวหิน",
      "via": [
        "สมุทรปราการ",
        "กรุงเทพมหานคร",
        "เพชรบุรี"
      ],
      "departureTimes": [
        "10:00",
        "14:30",
        "18:00"
      ],
      "duration": "3.5-4.5 ชม.",
      "baseFare": 200,
      "frequency": "วันละ 3 เที่ยว (ตามประกาศบริการ)",
      "terminal": "จุดจอดรถบัสสนามบินสุวรรณภูมิ",
      "notes": "ตาราง/บริการอาจมีการปรับ โปรดเช็คก่อนเดินทาง"
    },
    {
      "name": "สาย 4: บางสะพาน - เกาะทะลุ (ทัวร์เรือ)",
      "type": "boat",
      "operator": "ผู้ให้บริการทัวร์เกาะทะลุ",
      "from": "ประจวบคีรีขันธ์ (บางสะพาน)",
      "to": "เกาะทะลุ",
      "via": [],
      "departureTimes": [
        "09:00",
        "13:00"
      ],
      "duration": "30-45 นาที (ขึ้นกับจุดออกเรือ)",
      "baseFare": 400,
      "frequency": "ตามรอบทัวร์",
      "terminal": "ท่าเรือท้องถิ่น (ตามผู้ให้บริการ)",
      "notes": "ทะเลมรสุมอาจงดเรือ"
    }
  ],
  "localFoods": [
    {
      "name": "ปลาหมึกแดดเดียวปากน้ำปราณ",
      "priceRange": "150-400฿",
      "category": "local",
      "note": "ของขึ้นชื่อของปากน้ำปราณ (ปราณบุรี)"
    },
    {
      "name": "สับปะรดกุยบุรี",
      "priceRange": "30-80฿",
      "category": "dessert",
      "note": "กุยบุรีขึ้นชื่อเรื่องสับปะรดหวานกรอบ"
    },
    {
      "name": "อาหารทะเลบ้านกรูด/บางสะพาน",
      "priceRange": "200-800฿",
      "category": "local",
      "note": "ราคาขึ้นกับฤดูกาลและขนาดวัตถุดิบ"
    },
    {
      "name": "กุ้งแห้ง/อาหารทะเลแห้งปากน้ำปราณ",
      "priceRange": "120-500฿",
      "category": "street",
      "note": "นิยมซื้อเป็นของฝากจากชุมชนประมง"
    },
    {
      "name": "โรตีสายไหม/ขนมตลาดโต้รุ่งหัวหิน",
      "priceRange": "30-120฿",
      "category": "dessert",
      "note": "หัวหินมีสตรีทฟู้ดหลากหลายโดยเฉพาะช่วงเย็น-กลางคืน"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "700-1,800฿/คืน",
      "examples": [
        "HOP INN Prachuap Khiri Khan",
        "ibis Hua Hin",
        "B2 Hua Hin Premier Hotel"
      ],
      "bookingUrl": "https://www.booking.com/region/th/prachuap-khiri-khan.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1,800-5,500฿/คืน",
      "examples": [
        "Hilton Hua Hin Resort & Spa",
        "Holiday Inn Resort Vana Nava Hua Hin",
        "Centara Grand Beach Resort & Villas Hua Hin"
      ],
      "bookingUrl": "https://www.booking.com/region/th/prachuap-khiri-khan.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "5,500-25,000฿/คืน",
      "examples": [
        "InterContinental Hua Hin Resort",
        "Cape Nidhra Hotel",
        "V Villas Hua Hin - MGallery"
      ],
      "bookingUrl": "https://www.booking.com/region/th/prachuap-khiri-khan.html"
    }
  ],
  "dangerZones": [
    {
      "label": "คลื่นลมแรง/กระแสน้ำย้อนตามชายหาด",
      "severity": "high",
      "note": "ช่วงมรสุมทะเลอาจคลื่นแรงและอันตรายต่อการลงเล่นน้ำ โดยเฉพาะวันที่มีธงแดง/ประกาศเตือน",
      "season": "พ.ค.-ต.ค."
    },
    {
      "label": "ช้างป่าในพื้นที่อุทยาน (กุยบุรี) และแนวป่าตะวันตก",
      "severity": "high",
      "note": "หากเดินทางเข้าเขตอุทยานควรทำตามคำแนะนำเจ้าหน้าที่และไม่เข้าใกล้ช้างป่า",
      "season": null
    },
    {
      "label": "แดดแรงและฮีตสโตรก",
      "severity": "medium",
      "note": "กิจกรรมชายหาดช่วงกลางวันควรทาครีมกันแดด ดื่มน้ำ และหลบแดดเป็นระยะ",
      "season": "มี.ค.-พ.ค."
    }
  ],
  "ecoIds": [
    "t_mountain",
    "t_cave",
    "t_rainforest",
    "f_elephant",
    "c_monsoon",
    "c_heat_stroke",
    "fl_seaweed"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิประมาณ 22-34°C, ชื้นและลมทะเล ฝนพ.ค.-ต.ค. (บางพื้นที่ฝนต่อถึงพ.ย.)",
    "terrain": "แนวชายฝั่งยาว มีเมืองท่องเที่ยว (หัวหิน) ชุมชนประมง และแนวภูเขา-อุทยานทางทิศตะวันตก",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
}
};
