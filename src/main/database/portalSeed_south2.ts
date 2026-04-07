// Portal seed data: ภาคใต้ Part 2 (5 จังหวัด)
// Source: documents/deepreserach/part6_ภาคใต้.md
import type { ProvincePortalSeedData } from './db';

export const southPart2: Record<string, ProvincePortalSeedData> = {
  "Songkhla": {
  "transport": [
    {
      "name": "รถสองแถวหาดใหญ่",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวรับจ้างในอำเภอหาดใหญ่",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#DC143C"
    },
    {
      "name": "เรือข้ามเกาะแต้ว",
      "shortName": "เรือโดยสาร",
      "type": "boat",
      "description": "เรือข้ามฟากเชื่อมต่อเกาะแต้วกับชายฝั่ง",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#0EA5E9"
    },
    {
      "name": "รถตุ๊กตุ๊กหาดใหญ่",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "ตุ๊กตุ๊กให้บริการในเมืองหาดใหญ่และบางส่วนของสงขลา",
      "warpUrl": "",
      "logoText": "🛺",
      "color": "#A855F7"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - สงขลา",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย",
      "from": "สถานีกรุงเทพ",
      "to": "สถานีหาดใหญ่",
      "via": [
        "นครปฐม",
        "ราชบุรี",
        "ชุมพร"
      ],
      "departureTimes": [
        "22:45"
      ],
      "duration": "12 ชม.",
      "baseFare": 650,
      "frequency": "วันละ 1 เที่ยว",
      "terminal": "สถานีหัวลำโพง",
      "notes": null
    },
    {
      "name": "สาย 2: กรุงเทพฯ - สงขลา",
      "type": "plane",
      "operator": "Thai Lion Air",
      "from": "สนามบินดอนเมือง",
      "to": "สนามบินหาดใหญ่",
      "via": [],
      "departureTimes": [
        "07:30",
        "15:00",
        "20:00"
      ],
      "duration": "1 ชม. 20 นาที",
      "baseFare": 900,
      "frequency": "หลายเที่ยวต่อวัน",
      "terminal": "สนามบินดอนเมือง",
      "notes": null
    },
    {
      "name": "สาย 3: หาดใหญ่ - เกาะยอ",
      "type": "boat",
      "operator": "เรือโดยสารสงขลา",
      "from": "ท่าเรือหาดใหญ่",
      "to": "เกาะยอ",
      "via": [],
      "departureTimes": [
        "08:00",
        "18:00"
      ],
      "duration": "15 นาที",
      "baseFare": 15,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "ท่าเรือหาดใหญ่",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวยำปักษ์ใต้สงขลา",
      "priceRange": "50-70฿",
      "category": "local",
      "note": "ข้าวคลุกเครื่องแกงหวานเผ็ดพร้อมเครื่องเคียง"
    },
    {
      "name": "ขนมจีนซาวน้ำ",
      "priceRange": "40-60฿",
      "category": "local",
      "note": "ขนมจีนราดน้ำซุปใสใส่กุ้งแห้งและหน่อไม้ดอง"
    },
    {
      "name": "โรตีสายไหมสงขลา",
      "priceRange": "20฿",
      "category": "dessert",
      "note": "โรตีกรอบเสิร์ฟพร้อมฝอยทองและนมข้นหวาน"
    },
    {
      "name": "ปลากะพงทอดน้ำปลา",
      "priceRange": "150-250฿",
      "category": "local",
      "note": "ปลากะพงตัวใหญ่ทอดกรอบราดน้ำจิ้มซีฟู้ด"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "400-900฿/คืน",
      "examples": [
        "Amata Samui Hotel",
        "New Asia Lee Garden"
      ],
      "bookingUrl": "https://www.booking.com/region/th/songkhla.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1200-3000฿/คืน",
      "examples": [
        "The One Hotel",
        "Tonson Hotel"
      ],
      "bookingUrl": "https://www.booking.com/region/th/songkhla.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "4000-10000฿/คืน",
      "examples": [
        "Centara Hotel Hat Yai",
        "Holiday Inn Hat Yai"
      ],
      "bookingUrl": "https://www.booking.com/region/th/songkhla.html"
    }
  ],
  "dangerZones": [
    {
      "label": "น้ำท่วมฉับพลัน",
      "severity": "medium",
      "note": "น้ำฝนไหลหลากลงเขาล้นตลิ่ง",
      "season": "ต.ค.-ม.ค."
    },
    {
      "label": "ความไม่สงบใต้สุด",
      "severity": "low",
      "note": "เหตุการณ์ความไม่สงบบางครั้งเกิดรอบนอกเมือง",
      "season": null
    }
  ],
  "ecoIds": [
    "f_boar",
    "f_snake_green",
    "t_rainforest",
    "c_monsoon"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 25-33°C, ร้อนชื้น ฝนตกชุก มิ.ย.-พ.ย.",
    "terrain": "ทุ่งนา ชายทะเลสาบสงขลา ป่าชายเลนในภาคกลาง",
    "bestSeason": "พ.ย.-มี.ค.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลสงขลา",
        "number": "074-338100"
      }
    ]
  }
},
  "Trang": {
  "transport": [
    {
      "name": "สองแถวตรัง",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "สองแถวรับจ้างในเมืองตรัง",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#556B2F"
    },
    {
      "name": "เรือเฟอร์รี่ตรัง-เกาะกระ",
      "shortName": "เรือเฟอร์รี่",
      "type": "boat",
      "description": "เรือเชื่อมเกาะกระและชายฝั่ง",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#2563EB"
    },
    {
      "name": "รถตุ๊กตุ๊กตรัง",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "ตุ๊กตุ๊กรับจ้างภายในเมืองตรัง",
      "warpUrl": "",
      "logoText": "🛺",
      "color": "#FF7F50"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - ตรัง",
      "type": "plane",
      "operator": "Bangkok Airways",
      "from": "สนามบินสุวรรณภูมิ",
      "to": "สนามบินตรัง",
      "via": [],
      "departureTimes": [
        "06:30",
        "11:30"
      ],
      "duration": "1 ชม. 20 นาที",
      "baseFare": 800,
      "frequency": "หลายเที่ยวต่อวัน",
      "terminal": "สนามบินสุวรรณภูมิ",
      "notes": null
    },
    {
      "name": "สาย 2: หมอชิต - ตรัง",
      "type": "bus",
      "operator": "บขส.",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งตรัง",
      "via": [
        "ราชบุรี",
        "ชุมพร"
      ],
      "departureTimes": [
        "18:00",
        "22:00"
      ],
      "duration": "12 ชม.",
      "baseFare": 900,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 3: ท่าเรือปากเมง - เกาะลิบง",
      "type": "boat",
      "operator": "เรือโดยสารจังหวัดตรัง",
      "from": "ท่าเรือปากเมง",
      "to": "เกาะลิบง",
      "via": [],
      "departureTimes": [
        "09:00",
        "15:00"
      ],
      "duration": "40 นาที",
      "baseFare": 100,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "ท่าเรือปากเมง",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "หมี่กรอบตรัง",
      "priceRange": "50-70฿",
      "category": "local",
      "note": "เส้นหมี่กรอบราดน้ำแกงเค็มใส่หมูหยองและผักดอง"
    },
    {
      "name": "เปาะเปี๊ยะสด",
      "priceRange": "30-50฿",
      "category": "street",
      "note": "แป้งบางโรลห่อผักสดและหมูยอ"
    },
    {
      "name": "ไก่หุบบูติ",
      "priceRange": "100-150฿",
      "category": "local",
      "note": "ไก่นึ่งสมุนไพรท้องถิ่นรสกลมกล่อม"
    },
    {
      "name": "หมึกย่างเสียบไม้",
      "priceRange": "20฿",
      "category": "street",
      "note": "ปลาหมึกเสียบไม้ย่างจิ้มน้ำจิ้ม"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "400-900฿/คืน",
      "examples": [
        "Naka Hotel Trang",
        "The Beach House"
      ],
      "bookingUrl": "https://www.booking.com/region/th/trang.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1000-2500฿/คืน",
      "examples": [
        "GoodMorningTrang Hotel",
        "Manee Resort"
      ],
      "bookingUrl": "https://www.booking.com/region/th/trang.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "3000-8000฿/คืน",
      "examples": [
        "Twin Lotus Resort",
        "Anantara Si Kao"
      ],
      "bookingUrl": "https://www.booking.com/region/th/trang.html"
    }
  ],
  "dangerZones": [
    {
      "label": "ฝนตกหนัก",
      "severity": "medium",
      "note": "ฝนตกหนักช่วงฤดูมรสุม",
      "season": "พ.ย.-ม.ค."
    },
    {
      "label": "เขตอนุรักษ์ทางทะเล",
      "severity": "low",
      "note": "บางพื้นที่เป็นเขตอนุรักษ์ห้ามจับสัตว์น้ำ",
      "season": null
    }
  ],
  "ecoIds": [
    "t_coastal",
    "t_mangrove",
    "f_snake_green",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 24-32°C, ร้อนชื้น ฝนตกหนัก พ.ค.-ต.ค.",
    "terrain": "ชายฝั่งทะเลและเกาะมากมาย มีป่าและภูเขาต่ำ",
    "bestSeason": "ม.ค.-เม.ย.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลตรัง",
        "number": "075-201500"
      }
    ]
  }
},
  "Satun": {
  "transport": [
    {
      "name": "สองแถวสตูล",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "สองแถวให้บริการในตัวเมืองสตูล",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#2F4F4F"
    },
    {
      "name": "เรือข้ามฟากเกาะหลีเป๊ะ",
      "shortName": "สปีดโบ๊ท",
      "type": "boat",
      "description": "เรือเร็วข้ามฟากไปยังเกาะหลีเป๊ะ",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#2563EB"
    },
    {
      "name": "รถจักรยานยนต์รับจ้าง",
      "shortName": "รถมอเตอร์ไซค์",
      "type": "bike",
      "description": "บริการมอเตอร์ไซค์รับจ้างในพื้นที่เมืองสตูล",
      "warpUrl": "",
      "logoText": "🏍️",
      "color": "#8B0000"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: ภูเก็ต - สตูล",
      "type": "bus",
      "operator": "บขส.",
      "from": "สถานีขนส่งภูเก็ต",
      "to": "สถานีขนส่งสตูล",
      "via": [
        "พังงา",
        "ระนอง"
      ],
      "departureTimes": [
        "08:00",
        "14:00"
      ],
      "duration": "6 ชม.",
      "baseFare": 500,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "สถานีขนส่งภูเก็ต",
      "notes": null
    },
    {
      "name": "สาย 2: หาดใหญ่ - สตูล",
      "type": "bus",
      "operator": "รถตู้สาธารณะ",
      "from": "สถานีขนส่งหาดใหญ่ 2",
      "to": "สถานีขนส่งสตูล",
      "via": [],
      "departureTimes": [
        "09:00",
        "13:00"
      ],
      "duration": "3 ชม.",
      "baseFare": 300,
      "frequency": "วันละ 3 เที่ยว",
      "terminal": "สถานีขนส่งหาดใหญ่ 2",
      "notes": null
    },
    {
      "name": "สาย 3: ท่าเรือปากบารา - เกาะหลีเป๊ะ",
      "type": "boat",
      "operator": "เรือเร็ว",
      "from": "ท่าเทียบเรือปากบารา",
      "to": "เกาะหลีเป๊ะ",
      "via": [],
      "departureTimes": [
        "10:00",
        "14:00"
      ],
      "duration": "1.5 ชม.",
      "baseFare": 500,
      "frequency": "วันละ 2 เที่ยว (ฤดูท่องเที่ยว)",
      "terminal": "ท่าเทียบเรือปากบารา",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวยำเมืองสตูล",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "ข้าวคลุกเครื่องแกงหวานพร้อมผักสด"
    },
    {
      "name": "ส้มตำปูไข่ดอง",
      "priceRange": "40-60฿",
      "category": "street",
      "note": "ส้มตำใส่ปูไข่ดองรสจัดจ้าน"
    },
    {
      "name": "หมึกแดดเดียว",
      "priceRange": "70-100฿",
      "category": "local",
      "note": "ปลาหมึกแดดเดียวย่างกินกับน้ำจิ้มซีฟู้ด"
    },
    {
      "name": "ขนมจีนสองน้ำ",
      "priceRange": "30-50฿",
      "category": "dessert",
      "note": "ขนมจีนราดน้ำแกงเขียวหวานกับน้ำแกงปู"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "400-800฿/คืน",
      "examples": [
        "Mareeya Homestay",
        "PK Guesthouse"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1200-3000฿/คืน",
      "examples": [
        "Andamaya Dive Resort (เกาะสุกร)",
        "Phupha Waree Resort"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "3000-8000฿/คืน",
      "examples": [
        "Layana Resort (เกาะหลีเป๊ะ)",
        "Benjarong Resort"
      ],
      "bookingUrl": ""
    }
  ],
  "dangerZones": [
    {
      "label": "ฝูงมลพิษทะเล",
      "severity": "medium",
      "note": "ภัยจากน้ำเสียหรือขยะในทะเลที่ส่งผลต่อปะการัง",
      "season": null
    },
    {
      "label": "ลมพายุทะเล",
      "severity": "high",
      "note": "มรสุมพายุทะเลช่วงมิ.ย.-ต.ค.",
      "season": "มิ.ย.-ต.ค."
    }
  ],
  "ecoIds": [
    "t_mangrove",
    "t_coastal",
    "c_flash_flood",
    "f_dog_stray"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 24-32°C, ร้อนชื้น ฝนตก พ.ค.-ก.ย.",
    "terrain": "เกาะแก่ง ทะเล และป่าชายเลน",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลสตูล",
        "number": "074-723500"
      }
    ]
  }
},
  "Phatthalung": {
  "transport": [
    {
      "name": "สองแถวควนขนุน",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวบริการควนขนุน-ตัวเมือง",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#800000"
    },
    {
      "name": "เรือข้ามทะเลสาบสงขลา",
      "shortName": "เรือโดยสาร",
      "type": "boat",
      "description": "เรือเชื่อมฝั่งทุ่งใหญ่และฝั่งพระยอด",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#0CA1E2"
    },
    {
      "name": "รถมอเตอร์ไซค์รับจ้าง",
      "shortName": "มอเตอร์ไซค์",
      "type": "bike",
      "description": "มอเตอร์ไซค์รับจ้างในตัวเมืองพัทลุง",
      "warpUrl": "",
      "logoText": "🏍️",
      "color": "#DAA520"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: หาดใหญ่ - พัทลุง",
      "type": "bus",
      "operator": "รถตู้สาธารณะ",
      "from": "สถานีขนส่งหาดใหญ่ 2",
      "to": "สถานีขนส่งพัทลุง",
      "via": [],
      "departureTimes": [
        "08:00",
        "12:00",
        "16:00"
      ],
      "duration": "1 ชม.",
      "baseFare": 80,
      "frequency": "วันละ 3 เที่ยว",
      "terminal": "สถานีขนส่งหาดใหญ่ 2",
      "notes": null
    },
    {
      "name": "สาย 2: กรุงเทพฯ - พัทลุง",
      "type": "bus",
      "operator": "บขส.",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งพัทลุง",
      "via": [
        "ราชบุรี",
        "ชุมพร"
      ],
      "departureTimes": [
        "17:00",
        "21:00"
      ],
      "duration": "12 ชม.",
      "baseFare": 750,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 3: ท่าเรือพัทลุง - เกาะลิบง",
      "type": "boat",
      "operator": "เรือข้ามเกาะ",
      "from": "ท่าเรือสองแพร่ง",
      "to": "เกาะลิบง",
      "via": [],
      "departureTimes": [
        "10:30"
      ],
      "duration": "3 ชม.",
      "baseFare": 200,
      "frequency": "วันละ 1 เที่ยว (ฤดูท่องเที่ยว)",
      "terminal": "ท่าเรือสองแพร่ง",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวเหนียวสังขยาใบเตย",
      "priceRange": "20-30฿",
      "category": "dessert",
      "note": "ข้าวเหนียวราดสังขยารสหวานหอมกลิ่นใบเตย"
    },
    {
      "name": "ปลาแดดเดียวเมืองพัทลุง",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "ปลาท้องถิ่นปรุงรสเค็มแล้วตากแดด"
    },
    {
      "name": "แกงเลียงหน่อไม้ดอง",
      "priceRange": "60-100฿",
      "category": "local",
      "note": "แกงเลียงผักท้องถิ่น ใส่หน่อไม้ดอง"
    },
    {
      "name": "หมูย่างควนขนุน",
      "priceRange": "50-70฿",
      "category": "street",
      "note": "หมูย่างสูตรควนขนุน ราดน้ำจิ้มซีฟู้ด"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-700฿/คืน",
      "examples": [
        "RimSai Resort",
        "Klongzon Resort"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1000-2000฿/คืน",
      "examples": [
        "Parkview Resort Hotel Phatthalung",
        "Palatial Place"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2500-8000฿/คืน",
      "examples": [
        "Chiangkhan Kabinburi Park View Resort"
      ],
      "bookingUrl": ""
    }
  ],
  "dangerZones": [
    {
      "label": "น้ำท่วมขัง",
      "severity": "medium",
      "note": "น้ำท่วมขังตามหมู่บ้านในฤดูฝน",
      "season": "ก.ย.-พ.ย."
    },
    {
      "label": "หมอกลงจัด",
      "severity": "low",
      "note": "หมอกหนาทึบบนถนนชนบทช่วงหน้าหนาว",
      "season": "พ.ย.-ม.ค."
    }
  ],
  "ecoIds": [
    "t_mountain",
    "t_rainforest",
    "f_snake_green",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 24-33°C, ร้อนชื้น ฝนตก มิ.ย.-ต.ค.",
    "terrain": "ภูเขาและป่า ทะเลสาบสงขลาในภาคกลาง",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลพัทลุง",
        "number": "074-609500"
      }
    ]
  }
},
  "Chumphon": {
  "transport": [
    {
      "name": "รถสองแถวชุมพร",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "สองแถววิ่งรับส่งในเมืองชุมพร",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#2E8B57"
    },
    {
      "name": "เรือเฟอร์รี่ ขนอม-เกาะสมุย",
      "shortName": "เรือเฟอร์รี่",
      "type": "boat",
      "description": "เรือเฟอร์รี่ข้ามฟากจากฝั่งชุมพรไปสมุย",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#1E40AF"
    },
    {
      "name": "แท็กซี่มิเตอร์ชุมพร",
      "shortName": "แท็กซี่",
      "type": "other",
      "description": "บริการแท็กซี่มิเตอร์ในตัวเมืองชุมพร",
      "warpUrl": "",
      "logoText": "🚖",
      "color": "#8A2BE2"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - ชุมพร",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย",
      "from": "สถานีกรุงเทพ",
      "to": "สถานีชุมพร",
      "via": [
        "ราชบุรี",
        "ประจวบคีรีขันธ์"
      ],
      "departureTimes": [
        "08:45",
        "20:30"
      ],
      "duration": "8-9 ชม.",
      "baseFare": 450,
      "frequency": "หลายเที่ยว/วัน",
      "terminal": "สถานีหัวลำโพง",
      "notes": null
    },
    {
      "name": "สาย 2: หมอชิต - ชุมพร",
      "type": "bus",
      "operator": "บขส.",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งชุมพร",
      "via": [
        "ราชบุรี",
        "ประจวบฯ"
      ],
      "departureTimes": [
        "09:00",
        "21:00"
      ],
      "duration": "8 ชม.",
      "baseFare": 650,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 3: ราชบุรี - ชุมพร",
      "type": "bus",
      "operator": "บขส.",
      "from": "สถานีขนส่งราชบุรี",
      "to": "สถานีขนส่งชุมพร",
      "via": [
        "เพชรบุรี",
        "ประจวบฯ"
      ],
      "departureTimes": [
        "10:00",
        "18:00"
      ],
      "duration": "6 ชม.",
      "baseFare": 450,
      "frequency": "หลายเที่ยว/วัน",
      "terminal": "สถานีขนส่งราชบุรี",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "แกงส้มชะอมกุ้ง",
      "priceRange": "60-100฿",
      "category": "local",
      "note": "แกงส้มรสจัดใส่ชะอมและกุ้งสด"
    },
    {
      "name": "ประทัดชัยทอด",
      "priceRange": "50฿",
      "category": "street",
      "note": "ปลาช่อนอบกรอบเนื้อนุ่ม ทำเป็นชิ้นทอด"
    },
    {
      "name": "ขนมเส้น",
      "priceRange": "30-50฿",
      "category": "street",
      "note": "ขนมเส้นข้าวเจ้าใส่ไข่ ราดเครื่องน้ำจิ้ม"
    },
    {
      "name": "ส้มตำสัญชาติไทย",
      "priceRange": "30-50฿",
      "category": "street",
      "note": "ส้มตำสูตรชุมพรใส่ปูเค็ม"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-700฿/คืน",
      "examples": [
        "Krungthong Mansion",
        "Phatchara Residence"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-2000฿/คืน",
      "examples": [
        "Vico Residence",
        "Iwade Hotel"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-6000฿/คืน",
      "examples": [
        "Chaolay Hotel",
        "Blue Andaman Lanta"
      ],
      "bookingUrl": ""
    }
  ],
  "dangerZones": [
    {
      "label": "พายุโซนร้อน",
      "severity": "high",
      "note": "พายุชายฝั่งในช่วง มิ.ย.-ต.ค.",
      "season": "มิ.ย.-ต.ค."
    },
    {
      "label": "เส้นทางขาดกลางฝน",
      "severity": "medium",
      "note": "ถนนบางสายเกิดสไลด์ดินชำรุดในฤดูฝน",
      "season": "ก.ย.-พ.ย."
    }
  ],
  "ecoIds": [
    "t_rainforest",
    "f_snake_green",
    "c_flash_flood",
    "fl_seaweed"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 24-32°C, ร้อนชื้น ฝนตก พ.ค.-ต.ค.",
    "terrain": "ชายฝั่ง ทะเล และป่าเขตร้อน",
    "bestSeason": "ม.ค.-เม.ย.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลชุมพร",
        "number": "077-503672"
      }
    ]
  }
}
};
