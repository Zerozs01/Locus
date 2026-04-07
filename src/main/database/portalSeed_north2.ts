// Portal seed data: ภาคเหนือ Part 2 (5 จังหวัด)
// Source: documents/deepreserach/part2_ภาคเหนือ.md
import type { ProvincePortalSeedData } from './db';

export const northPart2: Record<string, ProvincePortalSeedData> = {
  "Phayao": {
  "transport": [
    {
      "name": "รถสองแถวเขียวพะเยา",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวสีเขียวให้บริการรับส่งในตัวเมืองพะเยา",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#00ff00"
    },
    {
      "name": "รถตู้พะเยา - เชียงราย",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้ปรับอากาศจากพะเยาไปเชียงราย",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#0000ff"
    },
    {
      "name": "เรือท่องเที่ยวทะเลสาบเชียงคำ",
      "shortName": "เรือ",
      "type": "boat",
      "description": "บริการเรือหางยาวให้นักท่องเที่ยวล่องเที่ยวทะเลสาบเชียงคำ",
      "warpUrl": "",
      "logoText": "🚤",
      "color": "#1E90FF"
    },
    {
      "name": "ตุ๊กตุ๊กพะเยา",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "ตุ๊กตุ๊กให้บริการในเขตเมืองพะเยา",
      "warpUrl": "",
      "logoText": "🚕",
      "color": "#ffa500"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - พะเยา",
      "type": "bus",
      "operator": "Green Bus",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งพะเยา",
      "via": [
        "ลำปาง",
        "เชียงราย"
      ],
      "departureTimes": [
        "08:00",
        "18:00"
      ],
      "duration": "10 ชม.",
      "baseFare": 600,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถตู้เชียงใหม่ - พะเยา",
      "type": "van",
      "operator": "Green Bus Co.",
      "from": "สถานีขนส่งอาเขตเชียงใหม่",
      "to": "สถานีขนส่งพะเยา",
      "via": [
        "ลำพูน"
      ],
      "departureTimes": [
        "07:00",
        "14:00"
      ],
      "duration": "5 ชม.",
      "baseFare": 200,
      "frequency": "ทุกวัน",
      "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
      "notes": null
    },
    {
      "name": "รถตู้พะเยา - น่าน",
      "type": "van",
      "operator": "Green Bus Co.",
      "from": "สถานีขนส่งพะเยา",
      "to": "สถานีขนส่งน่าน",
      "via": [
        "เชียงคำ"
      ],
      "departureTimes": [
        "09:00",
        "15:00"
      ],
      "duration": "3 ชม.",
      "baseFare": 120,
      "frequency": "วันละสองเที่ยว",
      "terminal": "สถานีขนส่งพะเยา",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ก๋วยเตี๋ยวห้อยขา",
      "priceRange": "30-50฿",
      "category": "street",
      "note": "ก๋วยเตี๋ยวสูตรดั้งเดิมของพะเยา เสิร์ฟพร้อมขนมจีนน้ำซุป"
    },
    {
      "name": "แกงอ่อม",
      "priceRange": "60-80฿",
      "category": "local",
      "note": "แกงใบแมงลักผสมสมุนไพรหลากหลาย"
    },
    {
      "name": "ปลาซิวทอด",
      "priceRange": "30-50฿",
      "category": "street",
      "note": "ปลาซิวเล็กทอดกรอบ เสิร์ฟพร้อมแจ่ว"
    },
    {
      "name": "ข้าวแต๋น",
      "priceRange": "20-30฿",
      "category": "dessert",
      "note": "ข้าวแต๋นทอดกรอบราดน้ำตาล"
    },
    {
      "name": "น้ำพริกปลา",
      "priceRange": "20-40฿",
      "category": "local",
      "note": "น้ำพริกแซ่บใส่ปลาแม่น้ำ"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-800฿/คืน",
      "examples": [
        "โรงแรมบ้านมะกรูด",
        "HOP INN Phayao"
      ],
      "bookingUrl": "https://www.booking.com/region/th/phayao.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-1500฿/คืน",
      "examples": [
        "ABIZZ Hotel KwanPhayao",
        "โรงแรมทองดี"
      ],
      "bookingUrl": "https://www.booking.com/region/th/phayao.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1500-3000฿/คืน",
      "examples": [
        "โรงแรมเดอะปาร์ค พะเยา",
        "ร้านหม้อข้าว"
      ],
      "bookingUrl": "https://www.booking.com/region/th/phayao.html"
    }
  ],
  "dangerZones": [
    {
      "label": "น้ำท่วมฉับพลัน",
      "severity": "medium",
      "note": "พื้นที่ต่ำรอบทะเลสาบอาจเกิดน้ำท่วม",
      "season": "ก.ค.-ก.ย."
    },
    {
      "label": "ไฟป่า",
      "severity": "low",
      "note": "เกิดไฟป่าบ้างเล็กน้อยในช่วงแล้ง",
      "season": "ก.พ.-เม.ย."
    }
  ],
  "ecoIds": [
    "f_elephant",
    "f_monkey",
    "t_plain",
    "t_mountain",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 18-32°C, ฤดูฝน ก.ค.-ก.ย.",
    "terrain": "ที่ราบเชิงเขาและทะเลสาบกว๊านพะเยา",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
},
  "Phrae": {
  "transport": [
    {
      "name": "สถานีขนส่งผู้โดยสารแพร่",
      "shortName": "บขส.",
      "type": "bus",
      "description": "สถานีขนส่งจังหวัดแพร่ เชื่อมต่อเส้นทางภาคเหนือ",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#0000ff"
    },
    {
      "name": "สถานีรถไฟแพร่",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "สถานีรถไฟแพร่ (ใกล้ตัวเมือง)",
      "warpUrl": "",
      "logoText": "🚆",
      "color": "#808080"
    },
    {
      "name": "รถตู้แพร่ - เชียงใหม่",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้ปรับอากาศระหว่างแพร่และเชียงใหม่",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#0000ff"
    },
    {
      "name": "รถจักรยานยนต์รับจ้างแพร่",
      "shortName": "มอเตอร์ไซค์",
      "type": "bike",
      "description": "บริการรถจักรยานยนต์รับจ้างภายในเมืองแพร่",
      "warpUrl": "",
      "logoText": "🏍",
      "color": "#000000"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - แพร่",
      "type": "bus",
      "operator": "Green Bus",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งแพร่",
      "via": [
        "ลพบุรี",
        "พิษณุโลก",
        "อุตรดิตถ์",
        "ลำปาง"
      ],
      "departureTimes": [
        "09:00",
        "20:00"
      ],
      "duration": "10 ชม.",
      "baseFare": 550,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถตู้เชียงใหม่ - แพร่",
      "type": "van",
      "operator": "Green Bus Co.",
      "from": "สถานีขนส่งอาเขตเชียงใหม่",
      "to": "สถานีขนส่งแพร่",
      "via": [
        "ลำพูน"
      ],
      "departureTimes": [
        "08:00",
        "14:00"
      ],
      "duration": "4 ชม.",
      "baseFare": 200,
      "frequency": "ทุกวัน",
      "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
      "notes": null
    },
    {
      "name": "รถบัสลำปาง - แพร่",
      "type": "bus",
      "operator": "บริษัท ลำปางชัยสุวรรณ ทรานสปอร์ต จำกัด",
      "from": "สถานีขนส่งลำปาง",
      "to": "สถานีขนส่งแพร่",
      "via": [],
      "departureTimes": [
        "07:00",
        "12:00"
      ],
      "duration": "3 ชม.",
      "baseFare": 100,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "สถานีขนส่งลำปาง",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "น้ำย้อย",
      "priceRange": "60-80฿",
      "category": "local",
      "note": "แกงเนื้อโบราณของแพร่ใส่ผักหลายชนิด"
    },
    {
      "name": "ข้าวซอย",
      "priceRange": "50-80฿",
      "category": "local",
      "note": null
    },
    {
      "name": "ไส้อั่ว",
      "priceRange": "30-50฿",
      "category": "local",
      "note": null
    },
    {
      "name": "ลาบเหนือ",
      "priceRange": "40-60฿",
      "category": "local",
      "note": null
    },
    {
      "name": "ไข่ตกถังโบราณ",
      "priceRange": "30-50฿",
      "category": "dessert",
      "note": "ขนมหวานสูตรดั้งเดิมของแพร่"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-800฿/คืน",
      "examples": [
        "โรงแรมเดอะ แพร่ จังชั่น",
        "โรงแรมคูล แพร่"
      ],
      "bookingUrl": "https://www.booking.com/region/th/phrae.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-1500฿/คืน",
      "examples": [
        "โรงแรมบรมบุรุษ",
        "ห้องพักบ้านโฮสเทล"
      ],
      "bookingUrl": "https://www.booking.com/region/th/phrae.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1500-3000฿/คืน",
      "examples": [
        "โรงแรมชัยพฤกษ์รีสอร์ท",
        "โรงแรมไอยรา"
      ],
      "bookingUrl": "https://www.booking.com/region/th/phrae.html"
    }
  ],
  "dangerZones": [
    {
      "label": "น้ำท่วมฉับพลัน",
      "severity": "medium",
      "note": "มีพื้นที่เสี่ยงน้ำท่วมในฤดูฝน",
      "season": "ก.ค.-ก.ย."
    },
    {
      "label": "ดินถล่ม",
      "severity": "medium",
      "note": "ภูเขาอาจเกิดดินถล่มหลังฝนตกหนัก",
      "season": "ก.ค.-ก.ย."
    },
    {
      "label": "งูพิษ",
      "severity": "low",
      "note": "มีงูพิษในป่าและสวนผลไม้",
      "season": null
    }
  ],
  "ecoIds": [
    "f_elephant",
    "f_monkey",
    "t_mountain",
    "t_rainforest",
    "c_flash_flood",
    "fl_yanang"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 18-33°C, ฝนมาก ก.ค.-ก.ย.",
    "terrain": "ภูเขาสูงและหุบเขาเขตชุมชน",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
},
  "Uttaradit": {
  "transport": [
    {
      "name": "สถานีรถไฟอุตรดิตถ์",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "สถานีรถไฟอุตรดิตถ์ บนเส้นทางเหนือ ใกล้ใจกลางเมือง",
      "warpUrl": "",
      "logoText": "🚆",
      "color": "#808080"
    },
    {
      "name": "สถานีขนส่งอุตรดิตถ์",
      "shortName": "สถานีขนส่ง",
      "type": "bus",
      "description": "สถานีขนส่งผู้โดยสารจังหวัดอุตรดิตถ์",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#0000ff"
    },
    {
      "name": "รถสองแถวอุตรดิตถ์",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวให้บริการรับส่งภายในตัวเมืองอุตรดิตถ์",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#ff0000"
    },
    {
      "name": "รถตู้เชียงใหม่ - นครสวรรค์ (ผ่านอุตรดิตถ์)",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้เชียงใหม่ - นครสวรรค์ แวะรับส่งอุตรดิตถ์",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#0000ff"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - อุตรดิตถ์",
      "type": "bus",
      "operator": "Green Bus",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งอุตรดิตถ์",
      "via": [
        "นครสวรรค์",
        "พิษณุโลก"
      ],
      "departureTimes": [
        "08:00",
        "20:00"
      ],
      "duration": "8 ชม.",
      "baseFare": 400,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถไฟ กรุงเทพฯ - อุตรดิตถ์",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย",
      "from": "หัวลำโพง กรุงเทพฯ",
      "to": "สถานีรถไฟอุตรดิตถ์",
      "via": [
        "ลพบุรี",
        "นครสวรรค์",
        "พิษณุโลก",
        "สุโขทัย",
        "กำแพงเพชร"
      ],
      "departureTimes": [
        "09:30",
        "18:30"
      ],
      "duration": "9 ชม.",
      "baseFare": 450,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "หัวลำโพง",
      "notes": null
    },
    {
      "name": "รถตู้อุตรดิตถ์ - เชียงใหม่",
      "type": "van",
      "operator": "ปรับอากาศ นครสวรรค์",
      "from": "สถานีขนส่งอุตรดิตถ์",
      "to": "สถานีขนส่งอาเขตเชียงใหม่",
      "via": [],
      "departureTimes": [
        "07:00",
        "16:00"
      ],
      "duration": "5 ชม.",
      "baseFare": 300,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งอุตรดิตถ์",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ลาบคั่ว",
      "priceRange": "40-60฿",
      "category": "local",
      "note": "ลาบหมูเผ็ดแบบเหนือ"
    },
    {
      "name": "ไข่เค็มดิน",
      "priceRange": "10-20฿",
      "category": "street",
      "note": "ไข่เค็มหมักดินสูตรเฉพาะอุตรดิตถ์"
    },
    {
      "name": "ข้าวซอย",
      "priceRange": "50-80฿",
      "category": "local",
      "note": null
    },
    {
      "name": "ปลาช่อนลุยสวน",
      "priceRange": "60-100฿",
      "category": "local",
      "note": null
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-800฿/คืน",
      "examples": [
        "โรงแรมสุวรรณ",
        "โรงแรมศรีธนา"
      ],
      "bookingUrl": "https://www.booking.com/region/th/uttaradit.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-1500฿/คืน",
      "examples": [
        "เดอะวีวิวรีสอร์ท",
        "Thaimit Resort"
      ],
      "bookingUrl": "https://www.booking.com/region/th/uttaradit.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1500-3000฿/คืน",
      "examples": [
        "Thaisarn Village",
        "River Library Hotel"
      ],
      "bookingUrl": "https://www.booking.com/region/th/uttaradit.html"
    }
  ],
  "dangerZones": [
    {
      "label": "ฝุ่นละออง PM2.5",
      "severity": "medium",
      "note": "ค่าฝุ่นละอองเกินมาตรฐานบ้างในฤดูร้อน",
      "season": "ก.พ.-เม.ย."
    },
    {
      "label": "ไฟป่า",
      "severity": "medium",
      "note": "เกิดไฟป่าในฤดูแล้ง",
      "season": "ก.พ.-เม.ย."
    },
    {
      "label": "น้ำท่วมฉับพลัน",
      "severity": "medium",
      "note": "น้ำทะลักจากแม่น้ำยมช่วงฝนตกหนัก",
      "season": "ก.ค.-ก.ย."
    },
    {
      "label": "งูพิษ",
      "severity": "low",
      "note": "มีงูพิษในป่าเขารอบนอกเมือง",
      "season": null
    }
  ],
  "ecoIds": [
    "f_elephant",
    "f_snake_cobra",
    "f_monkey",
    "t_mountain",
    "t_rainforest",
    "c_pm25",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 18-35°C, แห้งแล้งในฤดูร้อน",
    "terrain": "ภูเขาสลับที่ราบลุ่มแม่น้ำยม",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
},
  "Sukhothai": {
  "transport": [
    {
      "name": "สถานีขนส่งสุโขทัย",
      "shortName": "บขส.",
      "type": "bus",
      "description": "สถานีขนส่งหลักของจังหวัดสุโขทัย",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#0000ff"
    },
    {
      "name": "สถานีรถไฟบรรพตคีรี",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "สถานีรถไฟใกล้เมืองสุโขทัย (บรรพตคีรี)",
      "warpUrl": "",
      "logoText": "🚆",
      "color": "#808080"
    },
    {
      "name": "รถตุ๊กตุ๊กสุโขทัย",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "รถตุ๊กตุ๊กให้บริการในตัวเมืองสุโขทัย",
      "warpUrl": "",
      "logoText": "🚕",
      "color": "#ffa500"
    },
    {
      "name": "รถตู้สุโขทัย - พิษณุโลก",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้ปรับอากาศเชื่อมสุโขทัยและพิษณุโลก",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#0000ff"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - สุโขทัย",
      "type": "bus",
      "operator": "Green Bus",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งสุโขทัย",
      "via": [
        "พระนครศรีอยุธยา",
        "พิษณุโลก"
      ],
      "departureTimes": [
        "14:00",
        "21:00"
      ],
      "duration": "7 ชม.",
      "baseFare": 450,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถไฟ กรุงเทพฯ - สุโขทัย (บรรพตคีรี)",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย",
      "from": "หัวลำโพง",
      "to": "สถานีรถไฟบรรพตคีรี (สุโขทัย)",
      "via": [
        "พระนครศรีอยุธยา",
        "นครสวรรค์",
        "พิษณุโลก"
      ],
      "departureTimes": [
        "08:30",
        "19:00"
      ],
      "duration": "10 ชม.",
      "baseFare": 500,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "หัวลำโพง",
      "notes": null
    },
    {
      "name": "รถตู้สุโขทัย - สุพรรณบุรี",
      "type": "van",
      "operator": "สมพรขนส่ง",
      "from": "สถานีขนส่งสุโขทัย",
      "to": "สถานีขนส่งสุพรรณบุรี",
      "via": [],
      "departureTimes": [
        "07:00"
      ],
      "duration": "4 ชม.",
      "baseFare": 150,
      "frequency": "วันละ 1 เที่ยว",
      "terminal": "สถานีขนส่งสุโขทัย",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวแช่",
      "priceRange": "60-100฿",
      "category": "local",
      "note": "ข้าวหุงเย็นพร้อมเครื่องเคียงแบบสุโขทัย"
    },
    {
      "name": "แกงขี้เหล็ก",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "แกงใบขี้เหล็กใส่ปลาเค็มหรือปลาร้าปรุงรสจัด"
    },
    {
      "name": "น้ำพริกกากหมู",
      "priceRange": "20-40฿",
      "category": "local",
      "note": "น้ำพริกเผ็ดเสิร์ฟพร้อมหมูทอดกรอบ"
    },
    {
      "name": "ขนมจีนซาวน้ำ",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "ขนมจีนราดน้ำกะทิใส่กะทิน้ำพริกกะปิรสเผ็ด"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-800฿/คืน",
      "examples": [
        "The Original Sukhothai",
        "Banlansuan Fan Apartments"
      ],
      "bookingUrl": "https://www.booking.com/region/th/sukhothai.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-2000฿/คืน",
      "examples": [
        "Legendha Sukhothai Resort",
        "Sukhothai Treasure Resort"
      ],
      "bookingUrl": "https://www.booking.com/region/th/sukhothai.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-5000฿/คืน",
      "examples": [
        "Sriwilai Sukhothai Resort & Spa",
        "Sukhothai Heritage Resort"
      ],
      "bookingUrl": "https://www.booking.com/region/th/sukhothai.html"
    }
  ],
  "dangerZones": [
    {
      "label": "น้ำท่วมฉับพลัน",
      "severity": "high",
      "note": "เกิดน้ำท่วมหลังฝนตกหนักเพราะแม่น้ำยมไหลบ่าล้นตลิ่ง",
      "season": "ก.ค.-ก.ย."
    },
    {
      "label": "โรคไข้เลือดออก",
      "severity": "medium",
      "note": "ระบาดในฤดูฝนเพราะยุงลายชุกชุม",
      "season": "มิ.ย.-ก.ย."
    }
  ],
  "ecoIds": [
    "f_elephant",
    "t_plain",
    "c_flash_flood",
    "c_monsoon",
    "fl_nettle"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 18-34°C, ฤดูฝน ก.ค.-ก.ย.",
    "terrain": "ที่ราบลุ่มแม่น้ำยม รอบด้วยเนินเขา",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
},
  "Tak": {
  "transport": [
    {
      "name": "สถานีรถไฟตาก",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "สถานีรถไฟตาก บริการเดินรถทางรถไฟจากภาคเหนือ",
      "warpUrl": "",
      "logoText": "🚆",
      "color": "#808080"
    },
    {
      "name": "รถตู้แม่สอด - ตาก",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้ระหว่างเมืองแม่สอดและตัวเมืองตาก",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#0000ff"
    },
    {
      "name": "รถสองแถวตาก",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวบริการรับส่งภายในตัวเมืองตาก",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#ff0000"
    },
    {
      "name": "รถตุ๊กตุ๊กตาก",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "ตุ๊กตุ๊กสำหรับท่องเที่ยวและรับส่งในเมืองตาก",
      "warpUrl": "",
      "logoText": "🚕",
      "color": "#ffa500"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - ตาก",
      "type": "bus",
      "operator": "Green Bus",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งตาก",
      "via": [
        "ลพบุรี",
        "เพชรบูรณ์",
        "พิษณุโลก",
        "อุตรดิตถ์"
      ],
      "departureTimes": [
        "07:00",
        "17:00"
      ],
      "duration": "7 ชม.",
      "baseFare": 400,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถไฟ กรุงเทพฯ - ตาก",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย",
      "from": "หัวลำโพง",
      "to": "สถานีรถไฟตาก",
      "via": [
        "พระนครศรีอยุธยา",
        "นครสวรรค์",
        "พิษณุโลก",
        "อุตรดิตถ์"
      ],
      "departureTimes": [
        "10:00",
        "18:00"
      ],
      "duration": "9 ชม.",
      "baseFare": 450,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "หัวลำโพง",
      "notes": null
    },
    {
      "name": "รถบัสเชียงใหม่ - ตาก",
      "type": "bus",
      "operator": "ปรับอากาศ ชาญดำเนิน",
      "from": "สถานีขนส่งอาเขตเชียงใหม่",
      "to": "สถานีขนส่งตาก",
      "via": [
        "แม่อาย"
      ],
      "departureTimes": [
        "08:00"
      ],
      "duration": "6 ชม.",
      "baseFare": 300,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
      "notes": null
    },
    {
      "name": "รถตู้ตาก - แม่สอด",
      "type": "van",
      "operator": "Prempracha Transport",
      "from": "สถานีขนส่งตาก",
      "to": "สถานีขนส่งแม่สอด",
      "via": [],
      "departureTimes": [
        "09:00",
        "13:00"
      ],
      "duration": "2 ชม.",
      "baseFare": 150,
      "frequency": "ทุก 30 นาที",
      "terminal": "สถานีขนส่งตาก",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวแคบ",
      "priceRange": "10-20฿",
      "category": "dessert",
      "note": "ข้าวอบแห้งกรอบ หอมมะพร้าว"
    },
    {
      "name": "ไส้อั่ว",
      "priceRange": "30-50฿",
      "category": "local",
      "note": null
    },
    {
      "name": "ผัดไทยป้าเจือ",
      "priceRange": "40-60฿",
      "category": "street",
      "note": "ผัดไทยสูตรโบราณเมืองตาก"
    },
    {
      "name": "ยำไข่มดแดง",
      "priceRange": "50-100฿",
      "category": "local",
      "note": "เมนูท้องถิ่นใส่ไข่มดแดงฤดูฝน"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-800฿/คืน",
      "examples": [
        "โรงแรมบ้านทุ่งเสา",
        "พิริยะ ฮาส"
      ],
      "bookingUrl": "https://www.booking.com/region/th/tak.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-2000฿/คืน",
      "examples": [
        "โรงแรมฑิฆัมพร",
        "ฮอป อินน์ ตาก"
      ],
      "bookingUrl": "https://www.booking.com/region/th/tak.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-5000฿/คืน",
      "examples": [
        "โรงแรมริเวอร์ไซด์",
        "โรงแรมลีลาวดี"
      ],
      "bookingUrl": "https://www.booking.com/region/th/tak.html"
    }
  ],
  "dangerZones": [
    {
      "label": "โรคไข้เลือดออก",
      "severity": "medium",
      "note": "ระบาดในฤดูฝนจากยุงลาย",
      "season": "มิ.ย.-ก.ย."
    },
    {
      "label": "ฝุ่น PM2.5",
      "severity": "medium",
      "note": "เกิดหมอกควันจากไฟป่าในฤดูแล้ง",
      "season": "ก.พ.-เม.ย."
    },
    {
      "label": "ทุ่นระเบิด",
      "severity": "high",
      "note": "พื้นที่ชายแดนมีทุ่นระเบิดที่อาจไม่ถูกเก็บกู้",
      "season": null
    }
  ],
  "ecoIds": [
    "f_elephant",
    "f_snake_cobra",
    "f_monkey",
    "f_boar_hunt",
    "t_mountain",
    "t_rainforest",
    "c_flash_flood",
    "fl_kratom",
    "fl_bamboo"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 20-38°C, ฝนตกชุก มิ.ย.-ต.ค.",
    "terrain": "ภูเขาสูง ป่าเขตร้อน และแม่น้ำเมย",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
}
};
