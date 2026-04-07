// Portal seed data: ภาคใต้ Part 1 (5 จังหวัด)
// Source: documents/deepreserach/part6_ภาคใต้.md
import type { ProvincePortalSeedData } from './db';

export const southPart1: Record<string, ProvincePortalSeedData> = {
  "Surat Thani": {
  "transport": [
    {
      "name": "รถสองแถวสุราษฎร์ธานี",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "บริการรถสองแถวในเมืองและอำเภอต่างๆ",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#EAB308"
    },
    {
      "name": "รถตู้ดอนสัก-เกาะสมุย",
      "shortName": "ตู้ดอนสัก",
      "type": "van",
      "description": "รถตู้โดยสารเชื่อมต่อระหว่างเมืองสุราษฎร์ฯ ถึงท่าเรือดอนสัก",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#10B981"
    },
    {
      "name": "เรือเฟอร์รี่นกแอร์ สุราษฎร์ฯ-เกาะสมุย",
      "shortName": "เรือเฟอร์รี่",
      "type": "boat",
      "description": "เรือโดยสารเชื่อมระหว่างฝั่งสุราษฎร์ธานีกับเกาะสมุย",
      "warpUrl": "",
      "logoText": "🛥️",
      "color": "#3B82F6"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: ดอนเมือง - สุราษฎร์ธานี",
      "type": "plane",
      "operator": "AirAsia",
      "from": "สนามบินดอนเมือง",
      "to": "สนามบินสุราษฎร์ธานี",
      "via": [],
      "departureTimes": [
        "08:00",
        "13:00",
        "19:00"
      ],
      "duration": "1 ชม.",
      "baseFare": 800,
      "frequency": "หลายเที่ยวต่อวัน",
      "terminal": "สนามบินดอนเมือง",
      "notes": null
    },
    {
      "name": "สาย 2: กรุงเทพฯ - สุราษฎร์ธานี",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย",
      "from": "สถานีรถไฟหัวลำโพง",
      "to": "สถานีรถไฟสุราษฎร์ธานี",
      "via": [
        "นครปฐม",
        "ราชบุรี",
        "เพชรบุรี",
        "ประจวบคีรีขันธ์",
        "ชุมพร"
      ],
      "departureTimes": [
        "07:30",
        "17:30"
      ],
      "duration": "9-10 ชม.",
      "baseFare": 600,
      "frequency": "วันละ 2-3 เที่ยว",
      "terminal": "สถานีรถไฟหัวลำโพง",
      "notes": null
    },
    {
      "name": "สาย 3: หมอชิต - สุราษฎร์ธานี",
      "type": "bus",
      "operator": "บขส.",
      "from": "สถานีขนส่งหมอชิต 2",
      "to": "สถานีขนส่งสุราษฎร์ธานี",
      "via": [
        "ราชบุรี",
        "ประจวบคีรีขันธ์",
        "ชุมพร"
      ],
      "departureTimes": [
        "18:00",
        "20:00",
        "23:00"
      ],
      "duration": "10-12 ชม.",
      "baseFare": 700,
      "frequency": "หลายเที่ยวต่อวัน",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ผัดไทยไชยา",
      "priceRange": "50-80฿",
      "category": "street",
      "note": null
    },
    {
      "name": "ปลาหมอหลานเคย",
      "priceRange": "60-100฿",
      "category": "local",
      "note": "เมนูขึ้นชื่อท้องถิ่น อ.ย่านตาขาว"
    },
    {
      "name": "แกงไตปลา",
      "priceRange": "50-70฿",
      "category": "local",
      "note": "เครื่องแกงใต้เข้มข้นใส่ปลาทู"
    },
    {
      "name": "สะตอผัดกุ้ง",
      "priceRange": "60-120฿",
      "category": "local",
      "note": "สะตอต้มสุกผัดรวมกับกุ้งสด"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "500-1000฿/คืน",
      "examples": [
        "The Episode Boutique Hotel",
        "Baansrisuthum 2"
      ],
      "bookingUrl": "https://www.booking.com/region/th/surat-thani.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1500-3000฿/คืน",
      "examples": [
        "Dusit Princess Koh Samui",
        "Phanganak Resort"
      ],
      "bookingUrl": "https://www.booking.com/region/th/surat-thani.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "4000-10000฿/คืน",
      "examples": [
        "Vana Belle Resort (เกาะสมุย)",
        "The Ritz-Carlton, Koh Samui"
      ],
      "bookingUrl": "https://www.booking.com/region/th/surat-thani.html"
    }
  ],
  "dangerZones": [
    {
      "label": "มรสุมฝนตกหนัก",
      "severity": "high",
      "note": "ฝนตกหนักมีน้ำท่วมขังในหลายพื้นที่",
      "season": "ก.ย.-พ.ย."
    },
    {
      "label": "แดดร้อนจัด",
      "severity": "medium",
      "note": "อุณหภูมิสูงในฤดูร้อน เสี่ยงเป็นลมแดด",
      "season": "มี.ค.-พ.ค."
    }
  ],
  "ecoIds": [
    "f_elephant",
    "f_boar",
    "t_rainforest",
    "t_mangrove",
    "c_monsoon"
  ],
  "newEcoEntities": [
    {
      "id": "f_coral",
      "name": "ปะการัง",
      "category": "fauna",
      "tags": [
        "protected",
        "common"
      ],
      "desc": "แนวปะการังเขตร้อนตามแนวทะเลอันดามัน สำคัญต่อระบบนิเวศทางทะเลของสุราษฎร์ฯ"
    }
  ],
  "metadata": {
    "climate": "อุณหภูมิ 25-33°C, ฝนตกชุก พ.ค.-พ.ย.",
    "terrain": "พื้นที่ชายฝั่ง และเกาะหลายแห่ง มีป่าเขตร้อนในพื้นที่ภูเขา",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลสุราษฎร์ธานี",
        "number": "077-952900"
      }
    ]
  }
},
  "Phuket": {
  "transport": [
    {
      "name": "ภูเก็ตสมาร์ทบัส",
      "shortName": "SmartBus",
      "type": "bus",
      "description": "รถประจำทางพลังงานไฟฟ้าให้บริการเส้นทางหลัก",
      "warpUrl": "https://phuketsmartbus.com",
      "logoText": "🚌",
      "color": "#0077CC"
    },
    {
      "name": "ตุ๊กตุ๊กภูเก็ต",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "รถตุ๊กตุ๊กให้บริการรับจ้างในตัวเมืองและแหล่งท่องเที่ยว",
      "warpUrl": "",
      "logoText": "🛺",
      "color": "#DC143C"
    },
    {
      "name": "รถแท็กซี่มิเตอร์ภูเก็ต",
      "shortName": "แท็กซี่",
      "type": "other",
      "description": "รถแท็กซี่มิเตอร์ให้บริการทั่วไป",
      "warpUrl": "",
      "logoText": "🚖",
      "color": "#1D4ED8"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: สนามบินดอนเมือง - ภูเก็ต",
      "type": "plane",
      "operator": "Bangkok Airways",
      "from": "สนามบินดอนเมือง",
      "to": "สนามบินภูเก็ต",
      "via": [],
      "departureTimes": [
        "06:30",
        "14:00",
        "20:00"
      ],
      "duration": "1 ชม.",
      "baseFare": 1000,
      "frequency": "หลายเที่ยวต่อวัน",
      "terminal": "สนามบินดอนเมือง",
      "notes": null
    },
    {
      "name": "สาย 2: หมอชิต - ภูเก็ต",
      "type": "bus",
      "operator": "บขส.",
      "from": "สถานีขนส่งหมอชิต 2",
      "to": "สถานีขนส่งภูเก็ต 1",
      "via": [
        "นครปฐม",
        "ราชบุรี",
        "เพชรบุรี",
        "ชุมพร"
      ],
      "departureTimes": [
        "17:00",
        "20:00",
        "23:00"
      ],
      "duration": "11-12 ชม.",
      "baseFare": 800,
      "frequency": "หลายเที่ยวต่อวัน",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 3: ภูเก็ต (สมุย) - ภูเก็ต (เกาะสมุย)",
      "type": "boat",
      "operator": "Raja Ferry",
      "from": "ท่าเรือภูเก็ต",
      "to": "เกาะสมุย",
      "via": [],
      "departureTimes": [
        "08:00",
        "15:00"
      ],
      "duration": "2 ชม.",
      "baseFare": 150,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "ท่าเรือรัษฎา",
      "notes": "มีสองบริษัทหลักให้บริการ"
    }
  ],
  "localFoods": [
    {
      "name": "หมูฮ้อง",
      "priceRange": "100-150฿",
      "category": "local",
      "note": "หมูสามชั้นหมักเครื่องเทศตุ๋นเปื่อยนุ่ม"
    },
    {
      "name": "ข้าวซอยภูเก็ต",
      "priceRange": "50-70฿",
      "category": "local",
      "note": "เส้นหมี่ราดน้ำแกงกะทิใส่เนื้อ"
    },
    {
      "name": "น้ำพริกกุ้งเสียบ",
      "priceRange": "30-50฿",
      "category": "local",
      "note": "น้ำพริกพื้นเมืองใส่กุ้งฝอยกรอบ"
    },
    {
      "name": "โอ๊ะเอ๋ว",
      "priceRange": "30-50฿",
      "category": "dessert",
      "note": "วุ้นใสคล้ายเจลาตินราดน้ำเชื่อมใส่น้ำแข็ง"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "600-1200฿/คืน",
      "examples": [
        "Lub D Phuket Patong (Hostel)",
        "Bodega Phuket"
      ],
      "bookingUrl": "https://www.booking.com/region/th/phuket.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "2500-4000฿/คืน",
      "examples": [
        "Holiday Inn Express Patong",
        "Novotel Phuket Kamala"
      ],
      "bookingUrl": "https://www.booking.com/region/th/phuket.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "5000-20000฿/คืน",
      "examples": [
        "Andara Resort & Villas",
        "Sri Panwa Phuket"
      ],
      "bookingUrl": "https://www.booking.com/region/th/phuket.html"
    }
  ],
  "dangerZones": [
    {
      "label": "ฤดูมรสุมฝนตกหนัก",
      "severity": "high",
      "note": "ฝนตกหนักและลมแรงช่วงมิ.ย.-ต.ค.",
      "season": "มิ.ย.-ต.ค."
    },
    {
      "label": "สึนามิ",
      "severity": "high",
      "note": "ความเสี่ยงจากคลื่นยักษ์ในทะเลอันดามัน",
      "season": null
    }
  ],
  "ecoIds": [
    "f_cobra",
    "f_monkey",
    "t_rainforest",
    "c_monsoon"
  ],
  "newEcoEntities": [
    {
      "id": "t_coast",
      "name": "ชายฝั่งทะเล",
      "category": "terrain",
      "tags": [
        "common",
        "protected"
      ],
      "desc": "ชายฝั่งทะเลของภูเก็ต มีโขดหินและชายหาด รวมทั้งแนวปะการังที่อาศัยอยู่ใกล้ฝั่ง"
    }
  ],
  "metadata": {
    "climate": "อุณหภูมิ 24-32°C, ร้อนชื้น ฝนตกชุก พ.ค.-ต.ค.",
    "terrain": "เกาะและชายฝั่งทะเล มีภูเขาหินปูนในบางพื้นที่",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลวชิระภูเก็ต",
        "number": "076-361234"
      }
    ]
  }
},
  "Krabi": {
  "transport": [
    {
      "name": "รถสองแถวกระบี่",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวรับจ้างเที่ยวในเมืองและชายหาด",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#8B4513"
    },
    {
      "name": "เรือท่องเที่ยวเกาะพีพี",
      "shortName": "เรือทัวร์",
      "type": "boat",
      "description": "เรือเร็วและเรือใหญ่ไปยังหมู่เกาะต่างๆ เช่น พีพีและลันตา",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#2563EB"
    },
    {
      "name": "แท็กซี่กอล์ฟคาร์",
      "shortName": "กอล์ฟคาร์",
      "type": "other",
      "description": "รถกอล์ฟคาร์ให้บริการรับส่งนักท่องเที่ยวในพื้นที่เมืองกระบี่",
      "warpUrl": "",
      "logoText": "🛺",
      "color": "#2E8B57"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: หมอชิต - กระบี่",
      "type": "bus",
      "operator": "บขส.",
      "from": "สถานีขนส่งหมอชิต 2",
      "to": "สถานีขนส่งกระบี่",
      "via": [
        "ราชบุรี",
        "ชุมพร",
        "สุราษฎร์ธานี"
      ],
      "departureTimes": [
        "19:00",
        "22:00"
      ],
      "duration": "12 ชม.",
      "baseFare": 850,
      "frequency": "วันละ 2-3 เที่ยว",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 2: กรุงเทพฯ - กระบี่",
      "type": "plane",
      "operator": "Nok Air",
      "from": "สนามบินดอนเมือง",
      "to": "สนามบินกระบี่",
      "via": [],
      "departureTimes": [
        "07:00",
        "13:00",
        "18:00"
      ],
      "duration": "1.5 ชม.",
      "baseFare": 900,
      "frequency": "หลายเที่ยวต่อวัน",
      "terminal": "สนามบินดอนเมือง",
      "notes": null
    },
    {
      "name": "สาย 3: ท่าเรือคลองเตย - เกาะลันตา",
      "type": "boat",
      "operator": "เรือข้ามฟากลันตา",
      "from": "ท่าเรือคลองเตย (อ่าวนาง)",
      "to": "เกาะลันตา",
      "via": [],
      "departureTimes": [
        "08:00",
        "12:00",
        "16:00"
      ],
      "duration": "30 นาที",
      "baseFare": 30,
      "frequency": "ทุก 4 ชม.",
      "terminal": "ท่าเรือคลองเตย",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ปลาทรายทอดขมิ้น",
      "priceRange": "100-150฿",
      "category": "local",
      "note": "ปลาทรายชิ้นทอดกรอบผัดกับผงขมิ้น"
    },
    {
      "name": "โรตีมะตะบะ",
      "priceRange": "30-50฿",
      "category": "street",
      "note": "โรตีกรอบไส้แกงกะหรี่ไก่ใส่ไข่"
    },
    {
      "name": "แกงเหลืองปลาแป๊ะซะ",
      "priceRange": "60-100฿",
      "category": "local",
      "note": "แกงเหลืองใส่ปลาท้องถิ่นรสจัด"
    },
    {
      "name": "หมี่กรอบเมืองกระบี่",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "เส้นหมี่กรอบราดน้ำซุปตุ๋นไก่"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "500-1200฿/คืน",
      "examples": [
        "Blu Monkey Hub & Hotel (กระบี่)",
        "ขวัญเวียงเกสต์เฮาส์"
      ],
      "bookingUrl": "https://www.booking.com/region/th/krabi.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1500-3000฿/คืน",
      "examples": [
        "Centara Anda Dhevi Resort",
        "Ao Nang Beachfront Resort"
      ],
      "bookingUrl": "https://www.booking.com/region/th/krabi.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "4000-15000฿/คืน",
      "examples": [
        "Rayavadee Resort",
        "Phulay Bay, Ritz-Carlton"
      ],
      "bookingUrl": "https://www.booking.com/region/th/krabi.html"
    }
  ],
  "dangerZones": [
    {
      "label": "ฝนตกหนัก/น้ำท่วม",
      "severity": "high",
      "note": "น้ำป่าไหลหลากและน้ำท่วมถนนในฤดูฝน",
      "season": "มิ.ย.-ต.ค."
    },
    {
      "label": "คลื่นลมแรง",
      "severity": "medium",
      "note": "คลื่นลมแรงอันตรายช่วงธันวาคม-กุมภาพันธ์",
      "season": "ธ.ค.-ก.พ."
    }
  ],
  "ecoIds": [
    "f_snake_cobra",
    "f_boar",
    "t_mangrove",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 24-33°C, ชื้น ฝนตก พ.ค.-ต.ค.",
    "terrain": "หน้าผาหินปูน ชายหาด และป่าชายเลน",
    "bestSeason": "พ.ย.-เม.ย.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลกระบี่",
        "number": "075-626700"
      }
    ]
  }
},
  "Phang Nga": {
  "transport": [
    {
      "name": "สองแถวพังงา",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวในเมืองพังงา",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#A0522D"
    },
    {
      "name": "เรือล่องอ่าวพังงา",
      "shortName": "เรือทัวร์",
      "type": "boat",
      "description": "เรือนำเที่ยวชมอ่าวพังงาและเกาะปันหยี",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#0E7490"
    },
    {
      "name": "รถตู้ภูเก็ต-พังงา",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้โดยสารระหว่างภูเก็ตกับพังงา",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#6B7280"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: ภูเก็ต - พังงา",
      "type": "bus",
      "operator": "ภูเก็ตสมาร์ทบัส",
      "from": "สนามบินภูเก็ต",
      "to": "ตัวเมืองพังงา",
      "via": [
        "ถลาง"
      ],
      "departureTimes": [
        "09:00",
        "15:00"
      ],
      "duration": "1 ชม.",
      "baseFare": 150,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "สนามบินภูเก็ต",
      "notes": null
    },
    {
      "name": "สาย 2: กรุงเทพฯ - พังงา",
      "type": "plane",
      "operator": "Thai Vietjet",
      "from": "สนามบินสุวรรณภูมิ",
      "to": "สนามบินภูเก็ต",
      "via": [],
      "departureTimes": [
        "10:00",
        "16:00"
      ],
      "duration": "1 ชม. 15 นาที",
      "baseFare": 1100,
      "frequency": "หลายเที่ยวต่อวัน",
      "terminal": "สนามบินสุวรรณภูมิ",
      "notes": null
    },
    {
      "name": "สาย 3: ท่าเรือบางโรง - หมู่เกาะสุรินทร์",
      "type": "boat",
      "operator": "เรือโดยสารเกาะสุรินทร์",
      "from": "ท่าเรือบางโรง",
      "to": "หมู่เกาะสุรินทร์",
      "via": [],
      "departureTimes": [
        "07:30"
      ],
      "duration": "3 ชม.",
      "baseFare": 400,
      "frequency": "วันละครั้ง (ฤดูท่องเที่ยว)",
      "terminal": "ท่าเรือบางโรง",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "หมูฮ้องพังงา",
      "priceRange": "100-150฿",
      "category": "local",
      "note": "หมูสามชั้นตุ๋นเครื่องเทศฉลองเทศกาลสารท"
    },
    {
      "name": "น้ำพริกกุ้งเสียบพังงา",
      "priceRange": "30-50฿",
      "category": "local",
      "note": "น้ำพริกส่วนผสมพิเศษของพังงา"
    },
    {
      "name": "ห่อหมกปลากะพง",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "ห่อหมกเนื้อปลาท้องทะเลรสจัด"
    },
    {
      "name": "แกงส้มปลาช่อนใบชะพลู",
      "priceRange": "60-100฿",
      "category": "local",
      "note": "แกงส้มรสเปรี้ยวกับเนื้อปลาช่อนแป้น"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "400-1000฿/คืน",
      "examples": [
        "PP Mansion",
        "Baan Nipha"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1500-3000฿/คืน",
      "examples": [
        "The Leaf On The Sands by Katatrian",
        "Ananda Resort"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "4000-12000฿/คืน",
      "examples": [
        "SALA Phuket Resort and Spa (ใกล้พังงา)",
        "Keemala (ภูเก็ต)"
      ],
      "bookingUrl": ""
    }
  ],
  "dangerZones": [
    {
      "label": "มรสุมฝนตกหนัก",
      "severity": "high",
      "note": "ฝนตกหนักและน้ำท่วมในฤดูฝน",
      "season": "มิ.ย.-ต.ค."
    },
    {
      "label": "คลื่นลมแรง",
      "severity": "medium",
      "note": "คลื่นลมแรงช่วงฤดูมรสุมเสี่ยงอันตรายทะเล",
      "season": "ก.ย.-พ.ย."
    }
  ],
  "ecoIds": [
    "f_monkey",
    "t_mangrove",
    "t_cave",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 24-33°C, ชื้น ฝนตก พ.ค.-ต.ค.",
    "terrain": "ภูเขาหินปูน ป่า และอ่าวทะเล มีป่าชายเลนบางส่วน",
    "bestSeason": "พ.ย.-เม.ย.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลพังงา",
        "number": "076-413823"
      }
    ]
  }
},
  "Nakhon Si Thammarat": {
  "transport": [
    {
      "name": "สองแถวคิวคลัทช์",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "สองแถวบริการในเมืองนคร",
      "warpUrl": "",
      "logoText": "🚍",
      "color": "#CD5C5C"
    },
    {
      "name": "มินิบัสไสใหญ่-นครฯ",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้รับส่งระหว่างไสใหญ่กับตัวเมือง",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#4B0082"
    },
    {
      "name": "เฟอร์รี่ขนานยนต์",
      "shortName": "เรือเฟอร์รี่",
      "type": "boat",
      "description": "เรือเชื่อมเกาะสมุย-ลิปะน้อย",
      "warpUrl": "",
      "logoText": "⛴️",
      "color": "#1E3A8A"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - นครศรีฯ",
      "type": "bus",
      "operator": "บขส.",
      "from": "สถานีขนส่งหมอชิต 2",
      "to": "สถานีขนส่งนครฯ",
      "via": [
        "ราชบุรี",
        "สุพรรณ",
        "ประจวบ",
        "ชุมพร"
      ],
      "departureTimes": [
        "18:00",
        "22:00"
      ],
      "duration": "11 ชม.",
      "baseFare": 750,
      "frequency": "หลายเที่ยวต่อวัน",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 2: กรุงเทพฯ - นครศรีฯ",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย",
      "from": "สถานีรถไฟหัวลำโพง",
      "to": "สถานีนครศรีธรรมราช",
      "via": [
        "ราชบุรี",
        "สุพรรณ",
        "ประจวบ",
        "ชุมพร"
      ],
      "departureTimes": [
        "17:40"
      ],
      "duration": "11-12 ชม.",
      "baseFare": 550,
      "frequency": "วันละ 1 เที่ยว",
      "terminal": "สถานีรถไฟหัวลำโพง",
      "notes": null
    },
    {
      "name": "สาย 3: ท่าเรือขนอม - เกาะนางยวน",
      "type": "boat",
      "operator": "เรือสปีดโบ๊ท",
      "from": "ท่าเทียบเรือสิชล",
      "to": "เกาะนางยวน",
      "via": [],
      "departureTimes": [
        "10:00"
      ],
      "duration": "30 นาที",
      "baseFare": 300,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "ท่าเรือสิชล",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ขนมจีนแกงไตปลา",
      "priceRange": "50-70฿",
      "category": "local",
      "note": "น้ำแกงไตปลารสจัด เครื่องเคียงใต้จัดเต็ม"
    },
    {
      "name": "ข้าวยำปักษ์ใต้",
      "priceRange": "40-60฿",
      "category": "local",
      "note": "ข้าวคลุกเครื่องแกงหวานพร้อมเครื่องเคียง"
    },
    {
      "name": "หมูย่างเมืองคอน",
      "priceRange": "30-50฿",
      "category": "street",
      "note": "หมูติดมันหมักเครื่องเทศสูตรท้องถิ่น"
    },
    {
      "name": "ปลาหมึกย่างน้ำผึ้ง",
      "priceRange": "60-100฿",
      "category": "street",
      "note": "ปลาหมึกย่างราดน้ำจิ้มซีฟู้ด"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-800฿/คืน",
      "examples": [
        "The Town Hostel",
        "Nakhon F Street Hotel"
      ],
      "bookingUrl": "https://www.booking.com/region/th/nakhon-si-thammarat.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1000-2500฿/คืน",
      "examples": [
        "Last Paradise Hotel",
        "Dusit Buncha Resort"
      ],
      "bookingUrl": "https://www.booking.com/region/th/nakhon-si-thammarat.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "3000-8000฿/คืน",
      "examples": [
        "The Crystal Hotel",
        "InterContinental Samui Baan Taling Ngam Resort"
      ],
      "bookingUrl": "https://www.booking.com/region/th/nakhon-si-thammarat.html"
    }
  ],
  "dangerZones": [
    {
      "label": "น้ำท่วม",
      "severity": "high",
      "note": "น้ำท่วมในช่วงฝนตกหนัก",
      "season": "ต.ค.-ม.ค."
    },
    {
      "label": "ปะการังน้ำตาย (Bleaching)",
      "severity": "medium",
      "note": "อุณหภูมิทะเลสูงส่งผลให้ปะการังฟอกขาว",
      "season": null
    }
  ],
  "ecoIds": [
    "f_boar",
    "f_cobra",
    "t_urban",
    "t_rainforest"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 24-34°C, ร้อนชื้น ฝนตกชุก ก.ย.-พ.ย.",
    "terrain": "ชายฝั่งทะเลและภูเขา ป่าไม้หลากหลาย",
    "bestSeason": "พ.ย.-มี.ค.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลมหาราชนครศรีฯ",
        "number": "075-340250"
      }
    ]
  }
}
};
