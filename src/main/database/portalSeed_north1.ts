// Portal seed data: ภาคเหนือ Part 1 (6 จังหวัด)
// Source: documents/deepreserach/part2_ภาคเหนือ.md
import type { ProvincePortalSeedData } from './db';

export const northPart1: Record<string, ProvincePortalSeedData> = {
  "Chiang Mai": {
  "transport": [
    {
      "name": "สองแถวแดงเชียงใหม่",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวสีแดงให้บริการรับส่งภายในตัวเมืองเชียงใหม่",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#ff0000"
    },
    {
      "name": "รถโดยสารประจำทางเมืองเชียงใหม่ (RTC)",
      "shortName": "รถเมล์",
      "type": "bus",
      "description": "บริการรถโดยสารประจำทางในเชียงใหม่ มีเส้นทางเชื่อมสนามบินและตัวเมือง",
      "warpUrl": "http://chiangmaicitybus.com",
      "logoText": "🚌",
      "color": "#0000ff"
    },
    {
      "name": "ตุ๊กตุ๊กเชียงใหม่",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "รถตุ๊กตุ๊กให้บริการรับส่งผู้โดยสารภายในเมืองเชียงใหม่",
      "warpUrl": "",
      "logoText": "🚕",
      "color": "#ffa500"
    },
    {
      "name": "มอเตอร์ไซค์รับจ้างเชียงใหม่",
      "shortName": "มอเตอร์ไซค์",
      "type": "bike",
      "description": "บริการรถจักรยานยนต์รับจ้างในเขตตัวเมืองเชียงใหม่",
      "warpUrl": "",
      "logoText": "🏍",
      "color": "#000000"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - เชียงใหม่",
      "type": "bus",
      "operator": "นครชัยแอร์",
      "from": "กรุงเทพฯ (สถานีขนส่งหมอชิต 2)",
      "to": "เชียงใหม่ (สถานีขนส่งอาเขต)",
      "via": [
        "พระนครศรีอยุธยา",
        "ลพบุรี",
        "เพชรบูรณ์",
        "พิษณุโลก",
        "สุโขทัย",
        "ลำปาง"
      ],
      "departureTimes": [
        "07:00",
        "15:00",
        "20:00"
      ],
      "duration": "9-10 ชม.",
      "baseFare": 500,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": null
    },
    {
      "name": "รถไฟ กรุงเทพฯ - เชียงใหม่",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย",
      "from": "สถานีรถไฟกรุงเทพ (หัวลำโพง)",
      "to": "สถานีรถไฟเชียงใหม่",
      "via": [
        "พระนครศรีอยุธยา",
        "นครสวรรค์",
        "พิษณุโลก",
        "อุตรดิตถ์",
        "ลำปาง"
      ],
      "departureTimes": [
        "07:30",
        "18:00"
      ],
      "duration": "12-13 ชม.",
      "baseFare": 800,
      "frequency": "วันละ 2-3 เที่ยว",
      "terminal": "สถานีรถไฟกรุงเทพ (หัวลำโพง)",
      "notes": null
    },
    {
      "name": "สาย เครื่องบิน กรุงเทพฯ - เชียงใหม่",
      "type": "plane",
      "operator": "ไทยแอร์เอเชีย",
      "from": "สนามบินดอนเมือง",
      "to": "สนามบินเชียงใหม่",
      "via": [],
      "departureTimes": [
        "06:00",
        "14:00",
        "18:00"
      ],
      "duration": "1 ชม.",
      "baseFare": 1200,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "อาคารผู้โดยสารขาออก สนามบินดอนเมือง",
      "notes": null
    },
    {
      "name": "สาย 24: สนามบินเชียงใหม่ - ประตูเชียงใหม่ (เซ็นทรัลแอร์พอร์ต)",
      "type": "bus",
      "operator": "RTC Chiang Mai City Bus",
      "from": "สนามบินเชียงใหม่",
      "to": "เซ็นทรัลเชียงใหม่แอร์พอร์ต",
      "via": [
        "ประตูเชียงใหม่"
      ],
      "departureTimes": [
        "08:00",
        "21:00"
      ],
      "duration": "30-40 นาที",
      "baseFare": 30,
      "frequency": "ทุก 20 นาที",
      "terminal": "ลานจอดรถขนส่ง RTC ท่าอากาศยานเชียงใหม่",
      "notes": "ราคา 30 บาทตลอดสาย"
    },
    {
      "name": "รถตู้เชียงใหม่ - ลำพูน",
      "type": "van",
      "operator": "สหกรณ์อุตสาหกรรมท่องเที่ยวเชียงใหม่",
      "from": "สถานีขนส่งเชียงใหม่ (อาเขต)",
      "to": "สถานีรถไฟลำพูน",
      "via": [],
      "departureTimes": [
        "08:00",
        "12:00",
        "18:00"
      ],
      "duration": "1 ชม.",
      "baseFare": 50,
      "frequency": "ทุก 30 นาที",
      "terminal": "สถานีขนส่งเชียงใหม่ (อาเขต)",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวซอย",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "ก๋วยเตี๋ยวแกงกะทิสไตล์เหนือ"
    },
    {
      "name": "ไส้อั่ว",
      "priceRange": "30-50฿",
      "category": "local",
      "note": "ไส้กรอกหมูเครื่องเทศเหนือ"
    },
    {
      "name": "น้ำพริกหนุ่ม",
      "priceRange": "20-40฿",
      "category": "local",
      "note": "น้ำพริกเหนือเผ็ดร้อนจากพริกกะเหรี่ยง"
    },
    {
      "name": "ขนมจีนน้ำเงี้ยว",
      "priceRange": "40-70฿",
      "category": "local",
      "note": "ขนมจีนน้ำแกงรสเผ็ดใส่เครื่องในหมู"
    },
    {
      "name": "แกงฮังเล",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "แกงหมูใส่เครื่องเทศและเลือดหมู"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-800฿/คืน",
      "examples": [
        "โรงแรม Hug Chiangmai Hotel",
        "Chiang Mai City Hotel"
      ],
      "bookingUrl": "https://www.booking.com/region/th/chiang-mai.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-2500฿/คืน",
      "examples": [
        "โรงแรม ลานนา ซิตี้วิว",
        "The Empress Hotel Chiang Mai"
      ],
      "bookingUrl": "https://www.booking.com/region/th/chiang-mai.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2500-5000฿/คืน",
      "examples": [
        "Anantara Chiang Mai Resort",
        "เชียงใหม่พลาซ่า"
      ],
      "bookingUrl": "https://www.booking.com/region/th/chiang-mai.html"
    }
  ],
  "dangerZones": [
    {
      "label": "ฝุ่นละออง PM2.5",
      "severity": "high",
      "note": "ปริมาณฝุ่นละอองสูงกว่ามาตรฐานในฤดูแล้ง",
      "season": "ก.พ.-เม.ย."
    },
    {
      "label": "ไฟป่า",
      "severity": "medium",
      "note": "เกิดไฟป่าบ่อยในฤดูร้อน",
      "season": "ก.พ.-เม.ย."
    },
    {
      "label": "น้ำท่วมฉับพลัน",
      "severity": "medium",
      "note": "ฝนตกหนักอาจทำให้น้ำท่วมในบางพื้นที่",
      "season": "มิ.ย.-ต.ค."
    }
  ],
  "ecoIds": [
    "f_elephant",
    "f_monkey",
    "t_mountain",
    "t_rainforest",
    "c_pm25",
    "c_flash_flood",
    "fl_yanang"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 18-34°C, ฝนตกชุกช่วง มิ.ย.-ต.ค.",
    "terrain": "ภูเขาสลับซับซ้อน ป่าเขตร้อน และที่ราบลุ่มแม่น้ำ",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
},
  "Chiang Rai": {
  "transport": [
    {
      "name": "รถสองแถวเชียงราย",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวให้บริการในเขตเมืองเชียงราย",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#ff0000"
    },
    {
      "name": "รถโดยสารประจำทางเชียงราย (Green Bus)",
      "shortName": "รถเมล์",
      "type": "bus",
      "description": "ให้บริการรถโดยสารปรับอากาศระหว่างจังหวัดและระหว่างเมือง",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#00aa00"
    },
    {
      "name": "ตุ๊กตุ๊กเชียงราย",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "บริการรถตุ๊กตุ๊กรับส่งในตัวเมืองเชียงราย",
      "warpUrl": "",
      "logoText": "🚕",
      "color": "#ffa500"
    },
    {
      "name": "รถตู้เชียงราย - เชียงใหม่",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้ปรับอากาศจากเชียงรายไปเชียงใหม่",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#0000ff"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - เชียงราย",
      "type": "bus",
      "operator": "สยามเฟิสท์แอร์",
      "from": "กรุงเทพฯ (หมอชิต 2)",
      "to": "เชียงราย (สถานีขนส่งเชียงราย)",
      "via": [
        "ลพบุรี",
        "พิษณุโลก",
        "ลำพูน",
        "เชียงใหม่"
      ],
      "departureTimes": [
        "17:00",
        "21:00"
      ],
      "duration": "10-11 ชม.",
      "baseFare": 700,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย เครื่องบิน เชียงใหม่ - เชียงราย",
      "type": "plane",
      "operator": "นกแอร์",
      "from": "สนามบินเชียงใหม่",
      "to": "สนามบินเชียงราย",
      "via": [],
      "departureTimes": [
        "09:00",
        "17:00"
      ],
      "duration": "45 นาที",
      "baseFare": 700,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สนามบินเชียงใหม่",
      "notes": null
    },
    {
      "name": "รถตู้เชียงใหม่ - เชียงราย",
      "type": "van",
      "operator": "Green Bus Co.",
      "from": "สถานีขนส่งอาเขตเชียงใหม่",
      "to": "สถานีขนส่งเชียงราย",
      "via": [],
      "departureTimes": [
        "07:00",
        "13:00",
        "18:00"
      ],
      "duration": "3-4 ชม.",
      "baseFare": 200,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
      "notes": null
    },
    {
      "name": "รถบัสเชียงราย - เชียงใหม่",
      "type": "bus",
      "operator": "ขนส่งเชียงราย",
      "from": "สถานีขนส่งเชียงราย",
      "to": "สถานีขนส่งอาเขตเชียงใหม่",
      "via": [],
      "departureTimes": [
        "06:00",
        "12:00",
        "18:00"
      ],
      "duration": "3 ชม.",
      "baseFare": 180,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งเชียงราย",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวซอย",
      "priceRange": "50-80฿",
      "category": "local",
      "note": null
    },
    {
      "name": "น้ำเงี้ยว",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "ขนมจีนราดน้ำซุปเลือดหมูรสจัด"
    },
    {
      "name": "ลาบเหนือ",
      "priceRange": "40-60฿",
      "category": "local",
      "note": "ลาบหมูเผ็ดแบบเหนือใส่เครื่องใน"
    },
    {
      "name": "ไส้อั่ว",
      "priceRange": "30-50฿",
      "category": "local",
      "note": null
    },
    {
      "name": "น้ำพริกหนุ่ม",
      "priceRange": "20-40฿",
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
        "Riverie Hotel Chiang Rai",
        "เดอะลิลเล็ตท์ รีสอร์ท"
      ],
      "bookingUrl": "https://www.booking.com/region/th/chiang-rai.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-2000฿/คืน",
      "examples": [
        "Laluna Hotel Chiang Rai",
        "The Legend Chiang Rai"
      ],
      "bookingUrl": "https://www.booking.com/region/th/chiang-rai.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-5000฿/คืน",
      "examples": [
        "Le Méridien Chiang Rai Resort",
        "ศาลาเชียงราย"
      ],
      "bookingUrl": "https://www.booking.com/region/th/chiang-rai.html"
    }
  ],
  "dangerZones": [
    {
      "label": "ฝุ่นละออง PM2.5",
      "severity": "high",
      "note": "คุณภาพอากาศแย่ในฤดูแล้ง",
      "season": "ก.พ.-เม.ย."
    },
    {
      "label": "ไฟป่า",
      "severity": "medium",
      "note": "เกิดไฟป่าในช่วงต้นปี",
      "season": "ม.ค.-เม.ย."
    },
    {
      "label": "น้ำท่วมฉับพลัน",
      "severity": "medium",
      "note": "ฝนตกหนักทำให้เกิดน้ำท่วมเฉียบพลันได้",
      "season": "ก.ค.-ก.ย."
    },
    {
      "label": "ทุ่นระเบิด",
      "severity": "high",
      "note": "พื้นที่ชายแดนใกล้เขตอำเภอแม่สายมีทุ่นระเบิดบางจุด",
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
    "c_flash_flood",
    "fl_yanang"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 18-33°C, ฝนตกชุกช่วง ก.ค.-ก.ย.",
    "terrain": "ภูเขาสูงและหุบเขา ป่าเต็งรังและป่าเบญจพรรณ",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
},
  "Lampang": {
  "transport": [
    {
      "name": "รถโดยสารประจำทางจังหวัดลำปาง",
      "shortName": "รถเมล์",
      "type": "bus",
      "description": "สถานีขนส่งผู้โดยสารลำปางให้บริการเดินรถในจังหวัดและเชื่อมจังหวัดใกล้เคียง",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#0000ff"
    },
    {
      "name": "รถสองแถวลำปาง",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวรับจ้างประจำทางภายในเมืองลำปาง",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#ff0000"
    },
    {
      "name": "รถตุ๊กตุ๊กลำปาง",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "บริการรถตุ๊กตุ๊กรับส่งในเมืองลำปาง",
      "warpUrl": "",
      "logoText": "🚕",
      "color": "#ffa500"
    },
    {
      "name": "รถจักรยานยนต์รับจ้างลำปาง",
      "shortName": "มอเตอร์ไซค์",
      "type": "bike",
      "description": "รถจักรยานยนต์รับจ้างบริการรับส่งในตัวเมืองลำปาง",
      "warpUrl": "",
      "logoText": "🏍",
      "color": "#000000"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - ลำปาง",
      "type": "bus",
      "operator": "สหขนส่งแอร์",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งผู้โดยสารลำปาง",
      "via": [
        "พระนครศรีอยุธยา",
        "นครสวรรค์",
        "พิษณุโลก",
        "อุตรดิตถ์"
      ],
      "departureTimes": [
        "09:00",
        "20:00"
      ],
      "duration": "9-10 ชม.",
      "baseFare": 550,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถไฟ กรุงเทพฯ - ลำปาง",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย",
      "from": "สถานีหัวลำโพง",
      "to": "สถานีรถไฟลำปาง",
      "via": [
        "พระนครศรีอยุธยา",
        "นครสวรรค์",
        "พิษณุโลก",
        "อุตรดิตถ์",
        "อุตรดิตถ์"
      ],
      "departureTimes": [
        "07:30",
        "19:00"
      ],
      "duration": "10-11 ชม.",
      "baseFare": 600,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "สถานีหัวลำโพง",
      "notes": null
    },
    {
      "name": "รถตู้ลำปาง - เชียงใหม่",
      "type": "van",
      "operator": "Green Bus Co.",
      "from": "สถานีขนส่งลำปาง",
      "to": "สถานีขนส่งอาเขตเชียงใหม่",
      "via": [],
      "departureTimes": [
        "08:00",
        "12:00",
        "15:00"
      ],
      "duration": "2 ชม.",
      "baseFare": 150,
      "frequency": "ทุก 2 ชม.",
      "terminal": "สถานีขนส่งผู้โดยสารลำปาง",
      "notes": null
    }
  ],
  "localFoods": [
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
      "name": "ข้าวแรมฟืน",
      "priceRange": "20-30฿",
      "category": "street",
      "note": "ข้าวเหนียวย่างเป็นแผ่น"
    },
    {
      "name": "ขนมปังสังขยา",
      "priceRange": "30-50฿",
      "category": "dessert",
      "note": null
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-800฿/คืน",
      "examples": [
        "Le Neuf Nakorn Lampang",
        "โรงแรมลาว"
      ],
      "bookingUrl": "https://www.booking.com/region/th/lampang.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-2000฿/คืน",
      "examples": [
        "Chiang Tong Airport Hotel",
        "Lampang River Lodge"
      ],
      "bookingUrl": "https://www.booking.com/region/th/lampang.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-5000฿/คืน",
      "examples": [
        "โรงแรมบ้านกิจเสรี Lampang",
        "Ban Thai House Lampang"
      ],
      "bookingUrl": "https://www.booking.com/region/th/lampang.html"
    }
  ],
  "dangerZones": [
    {
      "label": "ฝุ่น PM2.5",
      "severity": "medium",
      "note": "คุณภาพอากาศลดลงในฤดูแล้ง",
      "season": "ก.พ.-เม.ย."
    },
    {
      "label": "ไฟป่า",
      "severity": "medium",
      "note": "มักเกิดไฟป่าในช่วงต้นปี",
      "season": "ก.พ.-เม.ย."
    },
    {
      "label": "น้ำท่วมฉับพลัน",
      "severity": "medium",
      "note": "อาจเกิดน้ำท่วมฉับพลันได้เมื่อฝนตกหนัก",
      "season": "ก.ค.-ต.ค."
    },
    {
      "label": "งูพิษ",
      "severity": "low",
      "note": "มีงูพิษหลายชนิดอาศัยในป่าใกล้เคียง",
      "season": null
    }
  ],
  "ecoIds": [
    "f_elephant",
    "f_snake_cobra",
    "f_monkey",
    "t_mountain",
    "t_rainforest",
    "c_flash_flood",
    "fl_bamboo",
    "fl_yanang"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 17-32°C, ฤดูฝน ก.ค.-ก.ย.",
    "terrain": "ภูเขาสลับซับซ้อนและแม่น้ำปิง",
    "bestSeason": "พ.ย.-ม.ค.",
    "emergencyContacts": []
  }
},
  "Lamphun": {
  "transport": [
    {
      "name": "สถานีรถไฟลำพูน",
      "shortName": "รถไฟ",
      "type": "rail",
      "description": "บริการขนส่งทางรางเชื่อมเชียงใหม่และกรุงเทพฯ",
      "warpUrl": "",
      "logoText": "🚆",
      "color": "#808080"
    },
    {
      "name": "รถตุ๊กตุ๊กลำพูน",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "บริการรถตุ๊กตุ๊กภายในเมืองลำพูน",
      "warpUrl": "",
      "logoText": "🚕",
      "color": "#ffa500"
    },
    {
      "name": "รถตู้เชียงใหม่ - ลำพูน",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้ปรับอากาศจากเชียงใหม่มาลำพูน",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#0000ff"
    },
    {
      "name": "สองแถวปรับอากาศลำพูน",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวปรับอากาศให้บริการภายในเมืองลำพูน",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#00ff00"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - ลำพูน",
      "type": "bus",
      "operator": "Green Bus",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งลำพูน",
      "via": [
        "ลพบุรี",
        "พิษณุโลก",
        "นครสวรรค์"
      ],
      "departureTimes": [
        "08:00",
        "18:00"
      ],
      "duration": "9 ชม.",
      "baseFare": 500,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถไฟ กรุงเทพฯ - ลำพูน",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย",
      "from": "สถานีรถไฟกรุงเทพ (หัวลำโพง)",
      "to": "สถานีรถไฟลำพูน",
      "via": [
        "พระนครศรีอยุธยา",
        "นครสวรรค์",
        "พิษณุโลก",
        "ลำปาง"
      ],
      "departureTimes": [
        "10:30",
        "20:00"
      ],
      "duration": "10 ชม.",
      "baseFare": 550,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "หัวลำโพง",
      "notes": null
    },
    {
      "name": "รถตู้เชียงใหม่ - ลำพูน",
      "type": "van",
      "operator": "รถตู้สหกรณ์เชียงใหม่-ลำพูน",
      "from": "สถานีขนส่งอาเขตเชียงใหม่",
      "to": "สถานีขนส่งลำพูน",
      "via": [],
      "departureTimes": [
        "09:00",
        "14:00",
        "18:00"
      ],
      "duration": "1 ชม.",
      "baseFare": 50,
      "frequency": "ทุก 1 ชม.",
      "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวปุ้นน้ำเงี้ยว",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "ขนมจีนเหนือราดน้ำเงี้ยว"
    },
    {
      "name": "ไก่ย่างเมืองลำพูน",
      "priceRange": "100-150฿",
      "category": "local",
      "note": "ไก่ย่างสูตรโบราณของจังหวัดลำพูน"
    },
    {
      "name": "ข้าวซอย",
      "priceRange": "50-80฿",
      "category": "local",
      "note": null
    },
    {
      "name": "มะม่วงน้ำปลาหวาน",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "มะม่วงสุกพร้อมน้ำปลาหวาน"
    },
    {
      "name": "ขนมแม่ลำพัน",
      "priceRange": "20-30฿",
      "category": "dessert",
      "note": "ขนมหวานโบราณลำพูน"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-800฿/คืน",
      "examples": [
        "ที่พัก Look at Home Lamphun",
        "บ้านนอกรีสอร์ท"
      ],
      "bookingUrl": "https://www.booking.com/region/th/lamphun.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-1500฿/คืน",
      "examples": [
        "โรงแรมรัญลำพูน",
        "Phor Ya Pen"
      ],
      "bookingUrl": "https://www.booking.com/region/th/lamphun.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1500-3000฿/คืน",
      "examples": [
        "โรงแรมลำพูนริเวอร์ไซด์"
      ],
      "bookingUrl": "https://www.booking.com/region/th/lamphun.html"
    }
  ],
  "dangerZones": [
    {
      "label": "แมลงและงูพิษ",
      "severity": "medium",
      "note": "มีงูพิษและแมลงสัตว์มีพิษในพื้นที่ป่า",
      "season": null
    },
    {
      "label": "น้ำท่วมฉับพลัน",
      "severity": "medium",
      "note": "อาจมีน้ำท่วมฉับพลันหลังฝนตกหนัก",
      "season": "ก.ค.-ก.ย."
    }
  ],
  "ecoIds": [
    "f_elephant",
    "f_monkey",
    "t_mountain",
    "t_rainforest",
    "c_flash_flood",
    "fl_nettle",
    "fl_yanang"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 18-34°C, ฤดูฝน ก.ค.-ก.ย.",
    "terrain": "ที่ราบลุ่มเชิงเขาและแม่น้ำ",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": []
  }
},
  "Mae Hong Son": {
  "transport": [
    {
      "name": "รถสองแถวเหลืองแม่ฮ่องสอน",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวสีเหลืองให้บริการรับส่งภายในเมืองแม่ฮ่องสอน",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#ffff00"
    },
    {
      "name": "ตุ๊กตุ๊กแม่ฮ่องสอน",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "รถตุ๊กตุ๊กสำหรับนักท่องเที่ยวให้บริการในเมืองแม่ฮ่องสอน",
      "warpUrl": "",
      "logoText": "🚕",
      "color": "#ffa500"
    },
    {
      "name": "รถจักรยานยนต์รับจ้างแม่ฮ่องสอน",
      "shortName": "มอเตอร์ไซค์",
      "type": "bike",
      "description": "บริการรถจักรยานยนต์รับจ้างภายในแม่ฮ่องสอน",
      "warpUrl": "",
      "logoText": "🏍",
      "color": "#000000"
    },
    {
      "name": "รถตู้แม่ฮ่องสอน - เชียงใหม่",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้ปรับอากาศจากแม่ฮ่องสอนไปเชียงใหม่",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#0000ff"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - แม่ฮ่องสอน",
      "type": "bus",
      "operator": "สมบัติทัวร์",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งแม่ฮ่องสอน",
      "via": [
        "พิษณุโลก",
        "ตาก",
        "แม่สอด",
        "เถิน",
        "ปาย"
      ],
      "departureTimes": [
        "16:00",
        "17:00",
        "18:29"
      ],
      "duration": "15-16 ชม.",
      "baseFare": 750,
      "frequency": "วันละ 3 เที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถตู้เชียงใหม่ - แม่ฮ่องสอน (ผ่านปาย)",
      "type": "van",
      "operator": "บริษัท แพร่เซ็นเตอร์คาร์เซอร์วิส",
      "from": "สถานีขนส่งอาเขตเชียงใหม่",
      "to": "สถานีขนส่งแม่ฮ่องสอน",
      "via": [
        "ปาย"
      ],
      "departureTimes": [
        "07:00",
        "14:00"
      ],
      "duration": "6-7 ชม.",
      "baseFare": 180,
      "frequency": "ทุกวัน",
      "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
      "notes": null
    },
    {
      "name": "เที่ยวบิน เชียงใหม่ - แม่ฮ่องสอน",
      "type": "plane",
      "operator": "นกแอร์",
      "from": "สนามบินเชียงใหม่",
      "to": "สนามบินแม่ฮ่องสอน",
      "via": [],
      "departureTimes": [
        "09:00",
        "17:00"
      ],
      "duration": "30 นาที",
      "baseFare": 700,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สนามบินเชียงใหม่",
      "notes": null
    },
    {
      "name": "รถบัสแม่ฮ่องสอน - ปาย",
      "type": "bus",
      "operator": "บริษัท แพร่เซ็นเตอร์คาร์เซอร์วิส",
      "from": "สถานีขนส่งแม่ฮ่องสอน",
      "to": "สถานีขนส่งปาย",
      "via": [
        "ปางมะผ้า"
      ],
      "departureTimes": [
        "08:00",
        "12:00"
      ],
      "duration": "2 ชม.",
      "baseFare": 60,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งแม่ฮ่องสอน",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "แกงโฮ๊ะ",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "แกงพื้นเมืองชาวไทใหญ่หรือไทลื้อของแม่ฮ่องสอน"
    },
    {
      "name": "ข้าวแต๋น",
      "priceRange": "20-30฿",
      "category": "dessert",
      "note": "ขนมข้าวเหนียวทอดกรอบราดน้ำตาลเหนียว"
    },
    {
      "name": "ผักไตปลา (แกงผักไต)",
      "priceRange": "60-80฿",
      "category": "local",
      "note": "แกงปลารสจัดใส่ผักชนิดหนึ่งของชาวไทยใหญ่"
    },
    {
      "name": "ลาบปลาค้อ",
      "priceRange": "50-70฿",
      "category": "local",
      "note": "ลาบปลาแม่น้ำสูตรไทใหญ่"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-800฿/คืน",
      "examples": [
        "JJ Hostel",
        "Ban Tha Thao Home Stay"
      ],
      "bookingUrl": "https://www.booking.com/region/th/mae-hong-son.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-2000฿/คืน",
      "examples": [
        "Gomanya Homestay",
        "Mae Hong Son Palace Hotel"
      ],
      "bookingUrl": "https://www.booking.com/region/th/mae-hong-son.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-5000฿/คืน",
      "examples": [
        "Salween River House Resort",
        "ราชาหมอก รีสอร์ท"
      ],
      "bookingUrl": "https://www.booking.com/region/th/mae-hong-son.html"
    }
  ],
  "dangerZones": [
    {
      "label": "ทุ่นระเบิด",
      "severity": "high",
      "note": "พื้นที่ชายแดนติดเมียนมามีทุ่นระเบิดจากอดีตสงคราม",
      "season": null
    },
    {
      "label": "งูพิษ",
      "severity": "medium",
      "note": "พื้นที่ป่าเขาเต็มไปด้วยงูพิษหลายชนิด",
      "season": null
    },
    {
      "label": "น้ำป่า",
      "severity": "medium",
      "note": "อาจเกิดน้ำป่าหลากหลังฝนตกหนัก",
      "season": "ก.ค.-ก.ย."
    }
  ],
  "ecoIds": [
    "f_elephant",
    "f_monkey",
    "f_boar_hunt",
    "t_mountain",
    "t_rainforest",
    "fl_yanang",
    "fl_bamboo",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 15-28°C, ฤดูหนาวหนาวจัด ธ.ค.-ม.ค.",
    "terrain": "ภูเขาสูงล้อมรอบ ลมหนาวพัดแรง ชมทะเลหมอกได้",
    "bestSeason": "ธ.ค.-ม.ค.",
    "emergencyContacts": []
  }
},
  "Nan": {
  "transport": [
    {
      "name": "สองแถวเด่นชัย (น่าน)",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "รถสองแถวสีแดงให้บริการรับส่งในตัวเมืองน่าน",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#ff0000"
    },
    {
      "name": "รถตู้น่าน - เชียงใหม่",
      "shortName": "รถตู้",
      "type": "van",
      "description": "รถตู้ปรับอากาศวิ่งรับส่งระหว่างน่านและเชียงใหม่",
      "warpUrl": "",
      "logoText": "🚐",
      "color": "#0000ff"
    },
    {
      "name": "รถตุ๊กตุ๊คน่าน",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "ตุ๊กตุ๊กให้บริการรับส่งนักท่องเที่ยวในตัวเมืองน่าน",
      "warpUrl": "",
      "logoText": "🚕",
      "color": "#ffa500"
    },
    {
      "name": "รถบัสน่าน - พะเยา",
      "shortName": "รถบัส",
      "type": "bus",
      "description": "รถโดยสารประจำทางจากน่านไปพะเยาและจังหวัดใกล้เคียง",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#00aa00"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ - น่าน",
      "type": "bus",
      "operator": "Green Bus",
      "from": "หมอชิต 2",
      "to": "สถานีขนส่งน่าน",
      "via": [
        "นครสวรรค์",
        "พิษณุโลก",
        "อุตรดิตถ์"
      ],
      "departureTimes": [
        "08:00",
        "18:00"
      ],
      "duration": "11 ชม.",
      "baseFare": 600,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "หมอชิต 2",
      "notes": null
    },
    {
      "name": "รถตู้เชียงใหม่ - น่าน",
      "type": "van",
      "operator": "Green Bus Co.",
      "from": "สถานีขนส่งอาเขตเชียงใหม่",
      "to": "สถานีขนส่งน่าน",
      "via": [],
      "departureTimes": [
        "07:00",
        "14:00"
      ],
      "duration": "5 ชม.",
      "baseFare": 250,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
      "notes": null
    },
    {
      "name": "รถไฟ กรุงเทพฯ - น่าน (ผ่านพิษณุโลก)",
      "type": "train",
      "operator": "การรถไฟแห่งประเทศไทย",
      "from": "สถานีหัวลำโพง กรุงเทพฯ",
      "to": "สถานีรถไฟพิษณุโลก",
      "via": [
        "พระนครศรีอยุธยา",
        "นครสวรรค์"
      ],
      "departureTimes": [
        "07:45",
        "18:00"
      ],
      "duration": "11 ชม.",
      "baseFare": 550,
      "frequency": "วันละ 2 เที่ยว",
      "terminal": "สถานีหัวลำโพง",
      "notes": "ต้องต่อรถบัสที่พิษณุโลก"
    }
  ],
  "localFoods": [
    {
      "name": "แกงแคไก่",
      "priceRange": "50-70฿",
      "category": "local",
      "note": "แกงเผ็ดเหนือต้มกับผักต่างๆ"
    },
    {
      "name": "ข้าวเงี้ยว",
      "priceRange": "50-80฿",
      "category": "local",
      "note": "ขนมจีนน้ำซุปเผ็ดใส่เครื่องในหมู"
    },
    {
      "name": "ลาบหมูคั่ว",
      "priceRange": "40-60฿",
      "category": "local",
      "note": "ลาบหมูสับคั่วโรยด้วยข้าวคั่ว"
    },
    {
      "name": "น้ำพริกกะปิน่าน",
      "priceRange": "50-70฿",
      "category": "local",
      "note": "น้ำพริกสูตรน่านใส่กะปิและเครื่องเคียง"
    },
    {
      "name": "ข้าวแต๋นน้ำค้าง",
      "priceRange": "20-30฿",
      "category": "dessert",
      "note": "ข้าวแต๋นเคลือบน้ำตาล"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "300-800฿/คืน",
      "examples": [
        "Nan River House Resort",
        "โรงแรมน่านริเวอร์"
      ],
      "bookingUrl": "https://www.booking.com/region/th/nan.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-2000฿/คืน",
      "examples": [
        "Por Nan Hotel",
        "โรงแรมบ้านน่านริเวอร์"
      ],
      "bookingUrl": "https://www.booking.com/region/th/nan.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-5000฿/คืน",
      "examples": [
        "GLOW Nano Hotel",
        "Sataa Resort Nan"
      ],
      "bookingUrl": "https://www.booking.com/region/th/nan.html"
    }
  ],
  "dangerZones": [
    {
      "label": "น้ำท่วมฉับพลัน",
      "severity": "high",
      "note": "แม่น้ำน่านล้นตลิ่งช่วงฝนตกหนัก",
      "season": "ก.ค.-ก.ย."
    },
    {
      "label": "งูพิษ",
      "severity": "medium",
      "note": "พื้นที่ชุ่湿อาจพบงูพิษ",
      "season": null
    },
    {
      "label": "ไฟป่า",
      "severity": "low",
      "note": "ในฤดูร้อนอาจเกิดไฟป่าในบางพื้นที่",
      "season": "ก.พ.-เม.ย."
    }
  ],
  "ecoIds": [
    "f_elephant",
    "f_snake_green",
    "f_monkey",
    "f_boar",
    "t_mountain",
    "t_rainforest",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิ 15-32°C, ฝนตกชุก ก.ค.-ก.ย.",
    "terrain": "ภูเขาสูงและป่าไม้เขตร้อน",
    "bestSeason": "พ.ย.-ม.ค.",
    "emergencyContacts": []
  }
}
};
