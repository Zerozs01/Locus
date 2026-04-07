// Portal seed data: ภาคใต้ Part 3 (4 จังหวัด)
// Source: documents/deepreserach/part6_ภาคใต้.md
import type { ProvincePortalSeedData } from './db';

export const southPart3: Record<string, ProvincePortalSeedData> = {
  "Ranong": {
  "transport": [
    {
      "name": "สองแถวกระบี่-ระนอง",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวเชื่อมต่อกระบี่และระนอง",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#8B4513"
    },
    {
      "name": "เรือข้ามฟากเกาะพยาม",
      "shortName": "สปีดโบ๊ท",
      "type": "boat",
      "description": "เรือเร็วเชื่อมระนองกับเกาะพยาม",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#1565C0"
    },
    {
      "name": "รถตู้ด่วนเมืองระนอง",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้โดยสารภายในจังหวัดระนอง",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#556B2F"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - ระนอง",
      "type": "bus",
      "operator": "บขส.",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งระนอง",
      "via": [
        "เพชรบุรี",
        "ชุมพร"
      ],
      "departureTimes": [
        "09:00",
        "21:00"
      ],
      "duration": "9 ชม.",
      "baseFare": 650,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 2: พังงา - ระนอง",
      "type": "bus",
      "operator": "บขส.",
      "from": "สถานีขนส่งพังงา",
      "to": "สถานีขนส่งระนอง",
      "via": [],
      "departureTimes": [
        "06:00",
        "14:00"
      ],
      "duration": "2 ชม.",
      "baseFare": 150,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "สถานีขนส่งพังงา",
      "notes": null
    },
    {
      "name": "สาย 3: ท่าเรือระนอง - หัวดอน",
      "type": "boat",
      "operator": "เรือเฟอร์รี่",
      "from": "ท่าเรือระนอง",
      "to": "เกาะหัวดอน",
      "via": [],
      "departureTimes": [
        "08:30",
        "16:30"
      ],
      "duration": "2 ชม.",
      "baseFare": 300,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "ท่าเรือระนอง",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ไข่แมงดา",
      "priceRange": "50฿",
      "category": "local",
      "note": "ไข่แมงดาทอดหรือผัดสะดุ้ง ลักษณะคล้ายหน่อไม้"
    },
    {
      "name": "น้ำพริกน้ำย้อย",
      "priceRange": "30-50฿",
      "category": "local",
      "note": "น้ำพริกใต้ใส่กะทิและหอมแดงทอด"
    },
    {
      "name": "ข้าวยำปักษ์ใต้",
      "priceRange": "50-70฿",
      "category": "local",
      "note": "ข้าวคลุกพริกแกงใต้พร้อมเครื่องเคียง"
    },
    {
      "name": "หอยหวานผัดฉ่า",
      "priceRange": "60-100฿",
      "category": "local",
      "note": "หอยหวานผัดสมุนไพรจันท์"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "500-1000฿/คืน",
      "examples": [
        "Narong Hotel",
        "Aek Chan Hotel"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1200-3000฿/คืน",
      "examples": [
        "Sk Residence",
        "Ranong City Hotel"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "3500-8000฿/คืน",
      "examples": [
        "Zcape Hotel",
        "Tew Lay Bar & Pool Villa"
      ],
      "bookingUrl": ""
    }
  ],
  "dangerZones": [
    {
      "label": "ดินถล่ม",
      "severity": "medium",
      "note": "ฝนตกหนักอาจทำให้ดินถล่มบนภูเขา",
      "season": "มิ.ย.-พ.ย."
    },
    {
      "label": "สัตว์มีพิษ",
      "severity": "medium",
      "note": "งูและแมงป่องในป่าฝนชุกชุม",
      "season": null
    }
  ],
  "ecoIds": [
    "t_rainforest",
    "f_monkey",
    "c_flash_flood",
    "f_elephant"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 24-32°C, ชื้น ฝนตกพายุมรสุม ช่วง มิ.ย.-ต.ค.",
    "terrain": "ป่าฝนเขตร้อน ภูเขาสลับซับซ้อน ชายฝั่งทะเลอันดามัน",
    "bestSeason": "ม.ค.-มี.ค.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลระนอง",
        "number": "077-812630"
      }
    ]
  }
},
  "Yala": {
  "transport": [
    {
      "name": "รถสองแถวยะลา",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "สองแถววิ่งรับส่งในเมืองยะลา",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#483D8B"
    },
    {
      "name": "รถตู้ยะลา-เบตง",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้บริการยะลา-เบตง",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#9400D3"
    },
    {
      "name": "แท็กซี่มือสองเบตง",
      "shortName": "แท็กซี่",
      "type": "other",
      "description": "รถแท็กซี่ให้บริการที่อำเภอเบตง",
      "warpUrl": "",
      "logoText": "🚖",
      "color": "#8B0000"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - เบตง",
      "type": "van",
      "operator": "บขส.",
      "from": "สถานีขนส่งหมอชิต 2",
      "to": "สถานีขนส่งเบตง",
      "via": [
        "นครปฐม",
        "ชุมพร",
        "สตูล"
      ],
      "departureTimes": [
        "19:00"
      ],
      "duration": "16 ชม.",
      "baseFare": 1000,
      "frequency": "วันละครั้ง",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 2: หาดใหญ่ - ยะลา",
      "type": "bus",
      "operator": "บขส.",
      "from": "สถานีขนส่งหาดใหญ่ 2",
      "to": "สถานีขนส่งยะลา",
      "via": [],
      "departureTimes": [
        "08:00",
        "14:00"
      ],
      "duration": "2 ชม.",
      "baseFare": 200,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "สถานีขนส่งหาดใหญ่ 2",
      "notes": null
    },
    {
      "name": "สาย 3: ยะลา - ด่านเบตง",
      "type": "boat",
      "operator": "เรือคลองลำธาร",
      "from": "สถานีขนส่งยะลา",
      "to": "สถานีขนส่งเบตง",
      "via": [],
      "departureTimes": [
        "07:00"
      ],
      "duration": "1 ชม.",
      "baseFare": 150,
      "frequency": "วันละ 1 เที่ยว",
      "terminal": "สถานีขนส่งยะลา",
      "notes": "เดินทางโดยเรือชมทิวทัศน์แม่น้ำยะลา"
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวยำหาดใหญ่",
      "priceRange": "40-60฿",
      "category": "local",
      "note": "ข้าวคลุกพริกแกงใต้หวานอมเปรี้ยว"
    },
    {
      "name": "หมูทุบ",
      "priceRange": "40฿",
      "category": "local",
      "note": "หมูยอทอดหรือหมูย่างกรอบ ท้องถิ่นใต้"
    },
    {
      "name": "ข้าวเหนียวดำ",
      "priceRange": "20฿",
      "category": "dessert",
      "note": "ข้าวเหนียวดำราดกะทิหวานอร่อย"
    },
    {
      "name": "ไก่ย่างเบตง",
      "priceRange": "100฿",
      "category": "street",
      "note": "ไก่ย่างหมักเครื่องเทศ นุ่มชุ่มฉ่ำ"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "400-800฿/คืน",
      "examples": [
        "โรงแรมเบตง รัตนการ์เด้น",
        "City Inn Yala"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1000-2500฿/คืน",
      "examples": [
        "โรงแรมยะลาปาร์ค",
        "โรงแรมเดอะซิตี"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2500-6000฿/คืน",
      "examples": [
        "โรงแรมเปอร์เซโฟนี เบตง"
      ],
      "bookingUrl": ""
    }
  ],
  "dangerZones": [
    {
      "label": "เหตุการณ์ความไม่สงบ",
      "severity": "high",
      "note": "พื้นที่ชายแดนใต้เสี่ยงเหตุการณ์ไม่สงบ",
      "season": null
    },
    {
      "label": "น้ำท่วม",
      "severity": "medium",
      "note": "ฝนตกหนักทำให้น้ำท่วมขังบางพื้นที่",
      "season": "ต.ค.-พ.ย."
    }
  ],
  "ecoIds": [
    "t_mountain",
    "t_rainforest",
    "f_boar_hunt",
    "c_monsoon"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 24-31°C, ร้อนชื้น ฝนตกหนัก ก.ย.-พ.ย.",
    "terrain": "ภูเขาสูง ป่าเขตร้อน ทางตอนใต้สุดของไทย",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลยะลา",
        "number": "073-244711"
      }
    ]
  }
},
  "Pattani": {
  "transport": [
    {
      "name": "สองแถวปัตตานี",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "สองแถวรับจ้างในเมืองปัตตานี",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#8B0000"
    },
    {
      "name": "แท็กซี่มิเตอร์ปัตตานี",
      "shortName": "แท็กซี่",
      "type": "other",
      "description": "แท็กซี่มิเตอร์ให้บริการทั่วไป",
      "warpUrl": "",
      "logoText": "🚖",
      "color": "#FF4500"
    },
    {
      "name": "เรือข้ามคลองน้ำท่า",
      "shortName": "เรือโดยสาร",
      "type": "boat",
      "description": "เรือข้ามคลองไปยังฝั่งบางนรา",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#1E40AF"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: หาดใหญ่ - ปัตตานี",
      "type": "bus",
      "operator": "รถตู้สาธารณะ",
      "from": "สถานีขนส่งหาดใหญ่ 2",
      "to": "สถานีขนส่งปัตตานี",
      "via": [],
      "departureTimes": [
        "07:00",
        "13:00"
      ],
      "duration": "1.5 ชม.",
      "baseFare": 150,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "สถานีขนส่งหาดใหญ่ 2",
      "notes": null
    },
    {
      "name": "สาย 2: กรุงเทพฯ - ปัตตานี",
      "type": "plane",
      "operator": "Bangkok Airways",
      "from": "สนามบินดอนเมือง",
      "to": "สนามบินปัตตานี",
      "via": [],
      "departureTimes": [
        "11:00",
        "19:00"
      ],
      "duration": "1 ชม.",
      "baseFare": 950,
      "frequency": "หลายเที่ยวต่อวัน",
      "terminal": "สนามบินดอนเมือง",
      "notes": null
    },
    {
      "name": "สาย 3: อ.เมือง - อำเภอสายบุรี",
      "type": "bus",
      "operator": "เทศบาลปัตตานี",
      "from": "ตัวเมืองปัตตานี",
      "to": "สายบุรี",
      "via": [],
      "departureTimes": [
        "08:00"
      ],
      "duration": "1 ชม.",
      "baseFare": 100,
      "frequency": "วันละ 1 เที่ยว",
      "terminal": "ตัวเมืองปัตตานี",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวหมกไก่",
      "priceRange": "50฿",
      "category": "street",
      "note": "ข้าวหมกกลิ่นหอมเครื่องเทศแบบมุสลิม"
    },
    {
      "name": "มัสมั่นไก่",
      "priceRange": "60-100฿",
      "category": "local",
      "note": "แกงมัสมั่นเครื่องเทศมุสลิมรสกลมกล่อม"
    },
    {
      "name": "ข้าวเหนียวดำปิ้ง",
      "priceRange": "20฿",
      "category": "street",
      "note": "ข้าวเหนียวท้องถิ่นปิ้งกับกะทิราดเผือก"
    },
    {
      "name": "น้ำส้มปั่น",
      "priceRange": "30-50฿",
      "category": "drink",
      "note": "น้ำส้มคั้นสดปั่นแบบใส่น้ำแข็ง"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-700฿/คืน",
      "examples": [
        "BS Boutique Hotel Pattani",
        "Shaik Sulaiman Hotel"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-2000฿/คืน",
      "examples": [
        "Aditya Hotel Pattani",
        "Koh Si Pattani"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-6000฿/คืน",
      "examples": [
        "โรงแรมปัตตานีเทอร์มินอล"
      ],
      "bookingUrl": ""
    }
  ],
  "dangerZones": [
    {
      "label": "เหตุการณ์ความไม่สงบ",
      "severity": "high",
      "note": "พื้นที่ชายแดนใต้ยังมีเหตุการณ์รุนแรง",
      "season": null
    },
    {
      "label": "อุบัติเหตุทางถนน",
      "severity": "medium",
      "note": "รถวิ่งเร็วบนถนนทางชัน",
      "season": null
    }
  ],
  "ecoIds": [
    "t_rainforest",
    "f_monkey",
    "c_heat_stroke",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 25-33°C, ร้อนชื้น ฝนตก พ.ค.-ต.ค.",
    "terrain": "พื้นที่ราบชายฝั่งแม่น้ำบางปะกง ภูมิประเทศส่วนใหญ่เป็นที่ราบ",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลปัตตานี",
        "number": "073-711010"
      }
    ]
  }
},
  "Narathiwat": {
  "transport": [
    {
      "name": "สองแถวนราธิวาส",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "สองแถวรับจ้างในเมืองนราธิวาส",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#006400"
    },
    {
      "name": "รถตุ๊กตุ๊กนราธิวาส",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "ตุ๊กตุ๊กรับจ้างในตัวเมือง",
      "warpUrl": "",
      "logoText": "🛺",
      "color": "#B22222"
    },
    {
      "name": "เรือโดยสารจากสะพานติณสูลานนท์",
      "shortName": "เรือโดยสาร",
      "type": "boat",
      "description": "เรือเชื่อมเกาะต่างๆ ในน่านน้ำทางใต้",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#4682B4"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - นราธิวาส",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย",
      "from": "สถานีกรุงเทพ",
      "to": "สถานีนราธิวาส",
      "via": [
        "นครปฐม",
        "ชุมพร",
        "ปัตตานี"
      ],
      "departureTimes": [
        "19:10"
      ],
      "duration": "15 ชม.",
      "baseFare": 900,
      "frequency": "วันละครั้ง",
      "terminal": "สถานีหัวลำโพง",
      "notes": null
    },
    {
      "name": "สาย 2: หาดใหญ่ - นราธิวาส",
      "type": "bus",
      "operator": "บขส.",
      "from": "สถานีขนส่งหาดใหญ่ 2",
      "to": "สถานีขนส่งนราธิวาส",
      "via": [],
      "departureTimes": [
        "08:00",
        "14:00"
      ],
      "duration": "3 ชม.",
      "baseFare": 200,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "สถานีขนส่งหาดใหญ่ 2",
      "notes": null
    },
    {
      "name": "สาย 3: ท่าอากาศยานนราธิวาส - กรุงเทพฯ",
      "type": "plane",
      "operator": "Bangkok Airways",
      "from": "สนามบินนราธิวาส",
      "to": "สนามบินสุวรรณภูมิ",
      "via": [],
      "departureTimes": [
        "15:00"
      ],
      "duration": "1 ชม. 30 นาที",
      "baseFare": 1200,
      "frequency": "วันละ 1 เที่ยว",
      "terminal": "สนามบินนราธิวาส",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ไก่ผัดสะเต๊ะ",
      "priceRange": "50-70฿",
      "category": "local",
      "note": "ไก่ผัดราดน้ำกะทิเครื่องเทศใต้ใส่สะเต๊ะ"
    },
    {
      "name": "ข้าวหมกเนื้อ",
      "priceRange": "50฿",
      "category": "local",
      "note": "ข้าวหมกเนื้อแบบชาวใต้ใส่เครื่องเทศเข้มข้น"
    },
    {
      "name": "ข้าวเหนียวดำปิ้ง",
      "priceRange": "20฿",
      "category": "street",
      "note": "ข้าวเหนียวดำราดกะทิหวาน"
    },
    {
      "name": "หมี่กรอบ",
      "priceRange": "30-50฿",
      "category": "dessert",
      "note": "เส้นหมี่กรอบราดน้ำกะทิหวาน"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-800฿/คืน",
      "examples": [
        "Radda Hotel",
        "Horizon Hotel Narathiwat"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-2000฿/คืน",
      "examples": [
        "Santa Elena Hotel",
        "The Emperor Narathiwat"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-6000฿/คืน",
      "examples": [
        "โรงแรม โกลเด้น เบด"
      ],
      "bookingUrl": ""
    }
  ],
  "dangerZones": [
    {
      "label": "เหตุการณ์ความไม่สงบ",
      "severity": "high",
      "note": "พื้นที่ชายแดนใต้ยังมีเหตุการณ์รุนแรง",
      "season": null
    },
    {
      "label": "ฝนตกหนัก",
      "severity": "medium",
      "note": "ฝนตกหนักท่วมถนนบางสายในฤดูฝน",
      "season": "ก.ย.-พ.ย."
    }
  ],
  "ecoIds": [
    "t_monsoon",
    "f_monkey",
    "f_boar",
    "fl_nettle"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 25-32°C, ร้อนชื้น ฝนตกหนัก ก.ย.-พ.ย.",
    "terrain": "ชายฝั่งหาดทราย ป่าภูเขา และป่าเลนตามชายฝั่งทะเลอันดามัน",
    "bestSeason": "ม.ค.-เม.ย.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลนราธิวาส",
        "number": "073-510999"
      }
    ]
  }
}
};
