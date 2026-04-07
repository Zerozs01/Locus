// Portal seed data: ภาคกลาง Part 2 (5 จังหวัด)
// Source: documents/deepreserach/part1_ภาคกลาง.md
import type { ProvincePortalSeedData } from './db';

export const centralPart2: Record<string, ProvincePortalSeedData> = {
  "Nakhon Pathom": {
  "transport": [
    {
      "name": "รถไฟ สายใต้ (สถานีเมืองนครปฐม)",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "รถไฟทางไกลสายใต้ผ่านสถานีเมืองนครปฐม เชื่อมต่อกับกรุงเทพฯและสุพรรณบุรี",
      "warpUrl": "http://www.railway.co.th",
      "logoText": "🚆",
      "color": "#446600"
    },
    {
      "name": "รถตู้ หมอชิต - นครปฐม",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้โดยสารวิ่งจากสถานีขนส่งหมอชิต 2 ไปนครปฐม บริการความถี่สูง",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#FF8800"
    },
    {
      "name": "สองแถว นครปฐม",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "สองแถวรับจ้างในนครปฐม ให้บริการเดินทางในตัวเมืองและหมู่บ้านใกล้เคียง",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#F39C12"
    }
  ],
  "routes": [
    {
      "name": "สาย 509: หมอชิต - นครปฐม - บางบัวทอง",
      "type": "bus",
      "operator": "BMTA",
      "from": "หมอชิต 2",
      "to": "บางบัวทอง",
      "via": [
        "นครปฐม",
        "นนทบุรี"
      ],
      "departureTimes": [
        "07:00",
        "13:00",
        "19:00"
      ],
      "duration": "1-1.5 ชม.",
      "baseFare": 30,
      "frequency": "ทุก 6 ชม.",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถไฟ ด่วนพิเศษ (กรุงเทพฯ - สุพรรณบุรี)",
      "type": "train",
      "operator": "SRT",
      "from": "กรุงเทพฯ (หัวลำโพง)",
      "to": "สุพรรณบุรี",
      "via": [
        "นครปฐม"
      ],
      "departureTimes": [
        "18:00"
      ],
      "duration": "1.5 ชม.",
      "baseFare": 90,
      "frequency": "รายวัน",
      "terminal": "หัวลำโพง",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวสุกหนู (ข้าวเกรียบจับเคี่ยว)",
      "priceRange": "10-20฿",
      "category": "dessert",
      "note": "ข้าวเหนียวผสมถั่วตัดติดเคี้ยวม้วนจับเป็นก้อน ทอดกรอบ"
    },
    {
      "name": "ไข่เค็ม",
      "priceRange": "30-50฿",
      "category": "local",
      "note": "ไข่เค็มสุกเคลือบแป้งนึ่ง เมืองนครปฐม"
    },
    {
      "name": "ข้าวหลาม",
      "priceRange": "20-40฿",
      "category": "dessert",
      "note": "ข้าวหลามไส้มะพร้าว ข้าวเหนียวกลิ่นใบเตยเนื้อนุ่ม มะพร้าวฉาบ"
    },
    {
      "name": "ราดหน้าสาลี่",
      "priceRange": "40-60฿",
      "category": "street",
      "note": "ราดหน้าหมูสูตรเฉพาะของสาลี่นครปฐม ใส่ผักกาด"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-700฿/คืน",
      "examples": [
        "Town Square Nakhon Pathom",
        "Smile House Nakhon Pathom"
      ],
      "bookingUrl": "https://www.booking.com/city/th/nakhon-pathom.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-1500฿/คืน",
      "examples": [
        "Golden Landmark Hotel",
        "Xen Hotel Nakhon Pathom"
      ],
      "bookingUrl": "https://www.booking.com/city/th/nakhon-pathom.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-3000฿/คืน",
      "examples": [
        "The Camp Nakhon Pathom",
        "Maranatha"
      ],
      "bookingUrl": "https://www.booking.com/city/th/nakhon-pathom.html"
    }
  ],
  "dangerZones": [
    {
      "label": "อากาศร้อน",
      "severity": "high",
      "note": "อุณหภูมิสูงในฤดูร้อน",
      "season": "มี.ค.-พ.ค."
    },
    {
      "label": "อุบัติเหตุทางถนน",
      "severity": "medium",
      "note": "การสัญจรโดยรถยนต์บนท้องถนนเสี่ยงอุบัติเหตุ",
      "season": null
    },
    {
      "label": "น้ำท่วม",
      "severity": "medium",
      "note": "พื้นที่ราบลุ่มอาจน้ำท่วมในฤดูฝน",
      "season": "ก.ย.-ต.ค."
    }
  ],
  "ecoIds": [
    "f_boar",
    "c_heat_stroke",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 25-34°C, ฝนตกชุก ก.ค.-ก.ย.",
    "terrain": "ที่ราบลุ่มแม่น้ำท่าจีน ลักษณะทุ่งนากว้าง",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลกรุงเทพราชธานี",
        "number": "034-111-538"
      }
    ]
  }
},
  "Samut Sakhon": {
  "transport": [
    {
      "name": "รถโดยสารประจำทางสาย 141",
      "shortName": "รถเมล์ 141",
      "type": "bus",
      "description": "รถเมล์ ขสมก. สาย 141 (จตุจักร-สมุทรสาคร) ให้บริการระหว่างกรุงเทพฯ กับแม่กลอง",
      "warpUrl": "https://www.bmta.co.th",
      "logoText": "🚌",
      "color": "#005DAA"
    },
    {
      "name": "รถตู้ บางนา - สมุทรสาคร",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้เอกชนวิ่งตรงจากบางนา กรุงเทพฯ ถึงตัวเมืองสมุทรสาคร",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#FF9900"
    },
    {
      "name": "ท่าเรือข้ามฟาก",
      "shortName": "เรือข้ามฟาก",
      "type": "boat",
      "description": "บริการเรือข้ามฟากขนาดเล็กเชื่อมฝั่งบางขุนเทียน-สมุทรสาคร",
      "warpUrl": "",
      "logoText": "🛶",
      "color": "#0066CC"
    }
  ],
  "routes": [
    {
      "name": "รถทัวร์ กรุงเทพฯ - สมุทรสาคร",
      "type": "coach",
      "operator": "Transport Co., Ltd.",
      "from": "หมอชิต 2",
      "to": "สมุทรสาคร",
      "via": [
        "พระราม 2",
        "ถนนเศรษฐกิจ"
      ],
      "departureTimes": [
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00"
      ],
      "duration": "1-1.5 ชม.",
      "baseFare": 45,
      "frequency": "ทุก 2 ชม.",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถไฟ สถานีบ้านเก่า - กทม.",
      "type": "train",
      "operator": "SRT",
      "from": "สถานีบ้านเก่า (สมุทรสาคร)",
      "to": "กรุงเทพฯ (หัวลำโพง)",
      "via": [
        "สมุทรสงคราม"
      ],
      "departureTimes": [
        "15:00"
      ],
      "duration": "2 ชม.",
      "baseFare": 50,
      "frequency": "รายวัน",
      "terminal": "หัวลำโพง",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "กุ้งอบวุ้นเส้น",
      "priceRange": "80-150฿",
      "category": "local",
      "note": "กุ้งแม่น้ำสดอบกับวุ้นเส้น ปรุงรสกลมกล่อม"
    },
    {
      "name": "ปูทะเลผัดผงกะหรี่",
      "priceRange": "150-300฿",
      "category": "local",
      "note": "ปูทะเลสดผัดผงกะหรี่ รสชาติเข้มข้น"
    },
    {
      "name": "หอยทอดสมุทรสาคร",
      "priceRange": "50-80฿",
      "category": "street",
      "note": "หอยทอดแผ่นใหญ่กรอบนอกนุ่มใน เสิร์ฟกับน้ำจิ้มรสเด็ด"
    },
    {
      "name": "หมูสะเต๊ะ",
      "priceRange": "50-100฿",
      "category": "street",
      "note": "หมูเสียบไม้ย่าง เสิร์ฟกับน้ำจิ้มถั่วและอาจาด"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "400-900฿/คืน",
      "examples": [
        "SYN Hotel Samut Sakhon",
        "The Winter Samut Sakhon"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "900-1500฿/คืน",
      "examples": [
        "Nantra Suvarnabhumi",
        "Blue Hippo"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1500-3000฿/คืน",
      "examples": [
        "Wanghaus Sathorn"
      ],
      "bookingUrl": ""
    }
  ],
  "dangerZones": [
    {
      "label": "ไฟไหม้ฝั่ง",
      "severity": "medium",
      "note": "พื้นที่โรงงานและโกดังเสี่ยงเกิดไฟไหม้",
      "season": null
    },
    {
      "label": "ฝุ่น PM2.5",
      "severity": "medium",
      "note": "โรงงานอุตสาหกรรมก่อมลพิษฝุ่นหินปูน",
      "season": null
    },
    {
      "label": "อากาศร้อน",
      "severity": "high",
      "note": "อุณหภูมิสูงในฤดูร้อน",
      "season": "เม.ย.-พ.ค."
    }
  ],
  "ecoIds": [
    "f_dog_stray",
    "c_heat_stroke"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 25-34°C, ชื้น ฝนตกชุก ก.ค.-ต.ค.",
    "terrain": "ที่ราบลุ่มตอนล่างติดปากอ่าวไทย",
    "bestSeason": "พ.ย.-ม.ค.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลสมุทรสาคร",
        "number": "034-411-681"
      }
    ]
  }
},
  "Samut Songkhram": {
  "transport": [
    {
      "name": "รถไฟแม่กลอง (สถานีแม่กลอง)",
      "shortName": "รถไฟแม่กลอง",
      "type": "rail",
      "description": "รถไฟสายแม่กลอง สถานีปลายทางอยู่ที่ตัวเมืองแม่กลอง จ.สมุทรสงคราม",
      "warpUrl": "http://www.railway.co.th",
      "logoText": "🚂",
      "color": "#004488"
    },
    {
      "name": "สองแถว แม่กลอง",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "สองแถวรับจ้างประจำตลาดน้ำดำเนินสะดวกและตัวเมืองแม่กลอง",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#FFAA00"
    },
    {
      "name": "เรือโดยสารคลองดำเนินสะดวก",
      "shortName": "เรือคลอง",
      "type": "boat",
      "description": "เรือโดยสารวิ่งในคลองดำเนินสะดวก เชื่อมต่อไปยังตลาดน้ำ",
      "warpUrl": "",
      "logoText": "🚤",
      "color": "#00AA88"
    }
  ],
  "routes": [
    {
      "name": "รถตู้ กรุงเทพฯ - ดำเนินสะดวก",
      "type": "van",
      "operator": "Van Center",
      "from": "หมอชิต 2",
      "to": "ดำเนินสะดวก",
      "via": [
        "เพชรเกษม"
      ],
      "departureTimes": [
        "06:30",
        "08:30",
        "10:30"
      ],
      "duration": "1.5 ชม.",
      "baseFare": 100,
      "frequency": "ทุก 2 ชม.",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถไฟ กรุงเทพฯ - แม่กลอง",
      "type": "train",
      "operator": "SRT",
      "from": "กรุงเทพฯ (หัวลำโพง)",
      "to": "แม่กลอง",
      "via": [
        "สมุทรสงคราม"
      ],
      "departureTimes": [
        "08:30"
      ],
      "duration": "2 ชม.",
      "baseFare": 90,
      "frequency": "รายวัน",
      "terminal": "หัวลำโพง",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ปลาทูอบสมุนไพร",
      "priceRange": "100-150฿",
      "category": "local",
      "note": "ปลาทูแม่กลองอบเครื่องสมุนไพรและสมุนไพรจีน หอมกลิ่นยาจีน"
    },
    {
      "name": "กะปิแม่กลอง",
      "priceRange": "30-60฿",
      "category": "local",
      "note": "กะปิหนาแน่นจากแม่กลอง รสเข้มข้นใช้ปรุงอาหาร"
    },
    {
      "name": "ไข่ลูกเขย",
      "priceRange": "30-50฿",
      "category": "local",
      "note": "ไข่เค็มต้ม สอดไส้หมูเค็ม ทอดกรอบราดน้ำจิ้มรสเปรี้ยวหวาน"
    },
    {
      "name": "ขนมผำ",
      "priceRange": "20-30฿",
      "category": "dessert",
      "note": "ขนมต้มใบเตยใส่รากผำ เคี้ยวนุ่มกลิ่นมะพร้าว"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "400-800฿/คืน",
      "examples": [
        "Rangsri Riad Resort",
        "Wangnamkeaw Resort"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1000-2000฿/คืน",
      "examples": [
        "Songkhla Inn",
        "The Blue Sky Resort"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-3000฿/คืน",
      "examples": [
        "Sala Ayutthaya (ใกล้เคียง)",
        "Banthaiburi Boutique"
      ],
      "bookingUrl": ""
    }
  ],
  "dangerZones": [
    {
      "label": "น้ำท่วม",
      "severity": "medium",
      "note": "ระดับน้ำในแม่น้ำแม่กลองขึ้นสูงช่วงฤดูฝน",
      "season": "ก.ย.-พ.ย."
    },
    {
      "label": "อากาศร้อน",
      "severity": "high",
      "note": "อุณหภูมิสูงในฤดูร้อน เดินกลางแจ้งควรระวัง",
      "season": "มี.ค.-พ.ค."
    }
  ],
  "ecoIds": [
    "f_boar",
    "t_rainforest",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 24-34°C, ฝนมาก ก.ค.-ต.ค.",
    "terrain": "พื้นที่ที่ราบลุ่มมีคลองดำเนินสะดวกไหลผ่าน",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลดำเนินสะดวก",
        "number": "034-771-041"
      }
    ]
  }
},
  "Suphan Buri": {
  "transport": [
    {
      "name": "รถไฟ สถานีสุพรรณบุรี",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "สถานีสุพรรณบุรี เป็นปลายทางรถไฟชานเมืองสายตะวันตก (สายวงเวียนใหญ่-สุพรรณบุรี)",
      "warpUrl": "",
      "logoText": "🚂",
      "color": "#FF3333"
    },
    {
      "name": "รถโดยสารประจำทางสาย 521",
      "shortName": "รถเมล์ 521",
      "type": "bus",
      "description": "รถเมล์ ขสมก. สาย 521 (ท่าช้าง-สุพรรณบุรี) วิ่งระหว่างกรุงเทพฯ-สุพรรณบุรี",
      "warpUrl": "https://www.transport.co.th",
      "logoText": "🚌",
      "color": "#CC5500"
    },
    {
      "name": "รถตู้ หมอชิต - สุพรรณบุรี",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้โดยสารเชื่อมระหว่างหมอชิต กรุงเทพฯ กับตัวเมืองสุพรรณบุรี",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#006600"
    }
  ],
  "routes": [
    {
      "name": "รถไฟสุพรรณบุรี-กรุงเทพฯ",
      "type": "train",
      "operator": "SRT",
      "from": "สุพรรณบุรี",
      "to": "กรุงเทพฯ (หัวลำโพง)",
      "via": [
        "นครปฐม"
      ],
      "departureTimes": [
        "07:00"
      ],
      "duration": "2 ชม.",
      "baseFare": 70,
      "frequency": "รายวัน",
      "terminal": "หัวลำโพง",
      "notes": null
    },
    {
      "name": "รถทัวร์ กรุงเทพฯ - สุพรรณบุรี",
      "type": "coach",
      "operator": "Transport Co., Ltd.",
      "from": "หมอชิต 2",
      "to": "สุพรรณบุรี",
      "via": [
        "ถนนบรมราชชนนี"
      ],
      "departureTimes": [
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00"
      ],
      "duration": "1.5 ชม.",
      "baseFare": 45,
      "frequency": "ทุก 2 ชม.",
      "terminal": "หมอชิต 2",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวหลามหม้อ",
      "priceRange": "20-40฿",
      "category": "dessert",
      "note": "ข้าวเหนียวผสมข้าวทับทิมกรอบ ยัดในหม้อใบตองหอม"
    },
    {
      "name": "ช่อมะขามทอด",
      "priceRange": "30-50฿",
      "category": "dessert",
      "note": "ช่อมะขามทอดกรอบหวาน เสิร์ฟเป็นของว่างท้องถิ่น"
    },
    {
      "name": "ปลาช่อนแม่ลา",
      "priceRange": "80-120฿",
      "category": "local",
      "note": "ปลาช่อนแม่น้ำแม่ลา นำมาย่างราดน้ำจิ้มแจ่วรสแซ่บ"
    },
    {
      "name": "ส้มตำปูปลาร้า",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "ส้มตำสูตรพื้นเมืองใส่ปูดองและปลาร้าสด รสจัด"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-700฿/คืน",
      "examples": [
        "River Terrace Resort",
        "Suphan Palace Hotel"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-1500฿/คืน",
      "examples": [
        "Amari Watergate (Nonthaburi)",
        "Suphan Buri River View"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1500-2500฿/คืน",
      "examples": [
        "Buppha ขอนแก่น"
      ],
      "bookingUrl": ""
    }
  ],
  "dangerZones": [
    {
      "label": "อากาศร้อนจัด",
      "severity": "high",
      "note": "อุณหภูมิสูงในฤดูร้อน",
      "season": "มี.ค.-พ.ค."
    },
    {
      "label": "ฝุ่นละออง PM2.5",
      "severity": "medium",
      "note": "ค่าฝุ่นละอองในอากาศสูงช่วงหน้าหนาว",
      "season": "ธ.ค.-ม.ค."
    }
  ],
  "ecoIds": [
    "f_boar",
    "c_heat_stroke"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 24-35°C, ฝนตกชุก ก.ค.-ก.ย.",
    "terrain": "ที่ราบลุ่มแม่น้ำท่าจีน กว้างขวาง",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลสุพรรณบุรี",
        "number": "035-511-010"
      }
    ]
  }
},
  "Sing Buri": {
  "transport": [
    {
      "name": "รถไฟสายเหนือ (สถานีสิงห์บุรี)",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "สถานีรถไฟสิงห์บุรี อยู่บนเส้นทางรถไฟสายเหนือ เชื่อมกับอยุธยาและนครสวรรค์",
      "warpUrl": "",
      "logoText": "🚆",
      "color": "#118844"
    },
    {
      "name": "รถโดยสารประจำทาง (บขส.)",
      "shortName": "รถ บขส.",
      "type": "bus",
      "description": "รถโดยสาร บขส. เส้นทาง กรุงเทพฯ-สิงห์บุรี ออกจากสายใต้ใหม่",
      "warpUrl": "https://www.transport.co.th",
      "logoText": "🚌",
      "color": "#BB0000"
    },
    {
      "name": "สองแถว สิงห์บุรี",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "สองแถวรับจ้างในตัวเมืองสิงห์บุรี ใช้สำหรับเดินทางบริเวณตลาดและสถานที่ท่องเที่ยว",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#FFCC33"
    }
  ],
  "routes": [
    {
      "name": "รถตู้ กรุงเทพฯ - สิงห์บุรี",
      "type": "van",
      "operator": "Van Center",
      "from": "หมอชิต 2",
      "to": "สิงห์บุรี",
      "via": [
        "อยุธยา"
      ],
      "departureTimes": [
        "07:00",
        "09:00",
        "11:00"
      ],
      "duration": "1.5 ชม.",
      "baseFare": 50,
      "frequency": "ทุก 2 ชม.",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถทัวร์ กรุงเทพฯ - สิงห์บุรี",
      "type": "coach",
      "operator": "Transport Co., Ltd.",
      "from": "หมอชิต 2",
      "to": "สิงห์บุรี",
      "via": [
        "พระนครศรีอยุธยา"
      ],
      "departureTimes": [
        "06:30",
        "10:30",
        "14:30"
      ],
      "duration": "1.5-2 ชม.",
      "baseFare": 60,
      "frequency": "4 เที่ยว/วัน",
      "terminal": "หมอชิต 2",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ขนมเปียกปูน",
      "priceRange": "10-20฿",
      "category": "dessert",
      "note": "ขนมไทยใส่สีธรรมชาติหน้ากะทิ ครองร้านดังในจ.สิงห์บุรี"
    },
    {
      "name": "กุ้งอบวุ้นเส้น",
      "priceRange": "80-120฿",
      "category": "local",
      "note": "กุ้งแม่น้ำอบกับวุ้นเส้นปรุงรสกลมกล่อม เป็นเมนูเด็ดพื้นบ้าน"
    },
    {
      "name": "ปลาแดดเดียว",
      "priceRange": "150-200฿",
      "category": "street",
      "note": "ปลาช่อนแดดเดียวทอดกรอบโรยด้วยสมุนไพร"
    },
    {
      "name": "ส้มโอแก้วกล้า",
      "priceRange": "40-60฿",
      "category": "drink",
      "note": "ส้มโอสายพันธุ์ประจำอำเภออินทร์บุรี ปลอดสารหวานหอม"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-700฿/คืน",
      "examples": [
        "Sing Buri Guest House",
        "BBH Hotel Singburi"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-1500฿/คืน",
      "examples": [
        "Singburi Hotel",
        "The Campers Singburi"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1500-2500฿/คืน",
      "examples": [
        "Phatanakorn Hotel"
      ],
      "bookingUrl": ""
    }
  ],
  "dangerZones": [
    {
      "label": "อากาศร้อน",
      "severity": "high",
      "note": "อุณหภูมิสูงในฤดูร้อน",
      "season": "เม.ย.-พ.ค."
    },
    {
      "label": "PM2.5",
      "severity": "medium",
      "note": "ฝุ่นละอองค่อนข้างสูงในฤดูหนาว",
      "season": "ธ.ค.-ม.ค."
    }
  ],
  "ecoIds": [
    "fl_bamboo",
    "c_heat_stroke"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 23-34°C, ฝนตกชุก ก.ค.-ก.ย.",
    "terrain": "ที่ราบแม่น้ำท่าจีน มีภูเขาตั้งเด่นที่เขาสิงห์บุรี",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลสิงห์บุรี",
        "number": "036-511-325"
      }
    ]
  }
}
};
