```json
{
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
        "via": ["พระนครศรีอยุธยา", "ลพบุรี", "เพชรบูรณ์", "พิษณุโลก", "สุโขทัย", "ลำปาง"],
        "departureTimes": ["07:00", "15:00", "20:00"],
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
        "via": ["พระนครศรีอยุธยา", "นครสวรรค์", "พิษณุโลก", "อุตรดิตถ์", "ลำปาง"],
        "departureTimes": ["07:30", "18:00"],
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
        "departureTimes": ["06:00", "14:00", "18:00"],
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
        "via": ["ประตูเชียงใหม่"],
        "departureTimes": ["08:00", "21:00"],
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
        "departureTimes": ["08:00", "12:00", "18:00"],
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
        "examples": ["โรงแรม Hug Chiangmai Hotel", "Chiang Mai City Hotel"],
        "bookingUrl": "https://www.booking.com/region/th/chiang-mai.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-2500฿/คืน",
        "examples": ["โรงแรม ลานนา ซิตี้วิว", "The Empress Hotel Chiang Mai"],
        "bookingUrl": "https://www.booking.com/region/th/chiang-mai.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2500-5000฿/คืน",
        "examples": ["Anantara Chiang Mai Resort", "เชียงใหม่พลาซ่า"],
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
    "ecoIds": ["f_elephant", "f_monkey", "t_mountain", "t_rainforest", "c_pm25", "c_flash_flood", "fl_yanang"],
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
        "via": ["ลพบุรี", "พิษณุโลก", "ลำพูน", "เชียงใหม่"],
        "departureTimes": ["17:00", "21:00"],
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
        "departureTimes": ["09:00", "17:00"],
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
        "departureTimes": ["07:00", "13:00", "18:00"],
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
        "departureTimes": ["06:00", "12:00", "18:00"],
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
        "examples": ["Riverie Hotel Chiang Rai", "เดอะลิลเล็ตท์ รีสอร์ท"],
        "bookingUrl": "https://www.booking.com/region/th/chiang-rai.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-2000฿/คืน",
        "examples": ["Laluna Hotel Chiang Rai", "The Legend Chiang Rai"],
        "bookingUrl": "https://www.booking.com/region/th/chiang-rai.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-5000฿/คืน",
        "examples": ["Le Méridien Chiang Rai Resort", "ศาลาเชียงราย"],
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
    "ecoIds": ["f_elephant", "f_snake_cobra", "f_monkey", "t_mountain", "t_rainforest", "c_pm25", "c_flash_flood", "fl_yanang"],
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
        "via": ["พระนครศรีอยุธยา", "นครสวรรค์", "พิษณุโลก", "อุตรดิตถ์"],
        "departureTimes": ["09:00", "20:00"],
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
        "via": ["พระนครศรีอยุธยา", "นครสวรรค์", "พิษณุโลก", "อุตรดิตถ์", "อุตรดิตถ์"],
        "departureTimes": ["07:30", "19:00"],
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
        "departureTimes": ["08:00", "12:00", "15:00"],
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
        "examples": ["Le Neuf Nakorn Lampang", "โรงแรมลาว"],
        "bookingUrl": "https://www.booking.com/region/th/lampang.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-2000฿/คืน",
        "examples": ["Chiang Tong Airport Hotel", "Lampang River Lodge"],
        "bookingUrl": "https://www.booking.com/region/th/lampang.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-5000฿/คืน",
        "examples": ["โรงแรมบ้านกิจเสรี Lampang", "Ban Thai House Lampang"],
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
    "ecoIds": ["f_elephant", "f_snake_cobra", "f_monkey", "t_mountain", "t_rainforest", "c_flash_flood", "fl_bamboo", "fl_yanang"],
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
        "via": ["ลพบุรี", "พิษณุโลก", "นครสวรรค์"],
        "departureTimes": ["08:00", "18:00"],
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
        "via": ["พระนครศรีอยุธยา", "นครสวรรค์", "พิษณุโลก", "ลำปาง"],
        "departureTimes": ["10:30", "20:00"],
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
        "departureTimes": ["09:00", "14:00", "18:00"],
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
        "examples": ["ที่พัก Look at Home Lamphun", "บ้านนอกรีสอร์ท"],
        "bookingUrl": "https://www.booking.com/region/th/lamphun.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["โรงแรมรัญลำพูน", "Phor Ya Pen"],
        "bookingUrl": "https://www.booking.com/region/th/lamphun.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["โรงแรมลำพูนริเวอร์ไซด์"],
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
    "ecoIds": ["f_elephant", "f_monkey", "t_mountain", "t_rainforest", "c_flash_flood", "fl_nettle", "fl_yanang"],
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
        "via": ["พิษณุโลก", "ตาก", "แม่สอด", "เถิน", "ปาย"],
        "departureTimes": ["16:00", "17:00", "18:29"],
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
        "via": ["ปาย"],
        "departureTimes": ["07:00", "14:00"],
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
        "departureTimes": ["09:00", "17:00"],
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
        "via": ["ปางมะผ้า"],
        "departureTimes": ["08:00", "12:00"],
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
        "examples": ["JJ Hostel", "Ban Tha Thao Home Stay"],
        "bookingUrl": "https://www.booking.com/region/th/mae-hong-son.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-2000฿/คืน",
        "examples": ["Gomanya Homestay", "Mae Hong Son Palace Hotel"],
        "bookingUrl": "https://www.booking.com/region/th/mae-hong-son.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-5000฿/คืน",
        "examples": ["Salween River House Resort", "ราชาหมอก รีสอร์ท"],
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
    "ecoIds": ["f_elephant", "f_monkey", "f_boar_hunt", "t_mountain", "t_rainforest", "fl_yanang", "fl_bamboo", "c_flash_flood"],
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
        "via": ["นครสวรรค์", "พิษณุโลก", "อุตรดิตถ์"],
        "departureTimes": ["08:00", "18:00"],
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
        "departureTimes": ["07:00", "14:00"],
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
        "via": ["พระนครศรีอยุธยา", "นครสวรรค์"],
        "departureTimes": ["07:45", "18:00"],
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
        "examples": ["Nan River House Resort", "โรงแรมน่านริเวอร์"],
        "bookingUrl": "https://www.booking.com/region/th/nan.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-2000฿/คืน",
        "examples": ["Por Nan Hotel", "โรงแรมบ้านน่านริเวอร์"],
        "bookingUrl": "https://www.booking.com/region/th/nan.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-5000฿/คืน",
        "examples": ["GLOW Nano Hotel", "Sataa Resort Nan"],
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
    "ecoIds": ["f_elephant", "f_snake_green", "f_monkey", "f_boar", "t_mountain", "t_rainforest", "c_flash_flood"],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 15-32°C, ฝนตกชุก ก.ค.-ก.ย.",
      "terrain": "ภูเขาสูงและป่าไม้เขตร้อน",
      "bestSeason": "พ.ย.-ม.ค.",
      "emergencyContacts": []
    }
  },
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
        "via": ["ลำปาง", "เชียงราย"],
        "departureTimes": ["08:00", "18:00"],
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
        "via": ["ลำพูน"],
        "departureTimes": ["07:00", "14:00"],
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
        "via": ["เชียงคำ"],
        "departureTimes": ["09:00", "15:00"],
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
        "examples": ["โรงแรมบ้านมะกรูด", "HOP INN Phayao"],
        "bookingUrl": "https://www.booking.com/region/th/phayao.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["ABIZZ Hotel KwanPhayao", "โรงแรมทองดี"],
        "bookingUrl": "https://www.booking.com/region/th/phayao.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["โรงแรมเดอะปาร์ค พะเยา", "ร้านหม้อข้าว"],
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
    "ecoIds": ["f_elephant", "f_monkey", "t_plain", "t_mountain", "c_flash_flood"],
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
        "via": ["ลพบุรี", "พิษณุโลก", "อุตรดิตถ์", "ลำปาง"],
        "departureTimes": ["09:00", "20:00"],
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
        "via": ["ลำพูน"],
        "departureTimes": ["08:00", "14:00"],
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
        "departureTimes": ["07:00", "12:00"],
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
        "examples": ["โรงแรมเดอะ แพร่ จังชั่น", "โรงแรมคูล แพร่"],
        "bookingUrl": "https://www.booking.com/region/th/phrae.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["โรงแรมบรมบุรุษ", "ห้องพักบ้านโฮสเทล"],
        "bookingUrl": "https://www.booking.com/region/th/phrae.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["โรงแรมชัยพฤกษ์รีสอร์ท", "โรงแรมไอยรา"],
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
    "ecoIds": ["f_elephant", "f_monkey", "t_mountain", "t_rainforest", "c_flash_flood", "fl_yanang"],
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
        "via": ["นครสวรรค์", "พิษณุโลก"],
        "departureTimes": ["08:00", "20:00"],
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
        "via": ["ลพบุรี", "นครสวรรค์", "พิษณุโลก", "สุโขทัย", "กำแพงเพชร"],
        "departureTimes": ["09:30", "18:30"],
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
        "departureTimes": ["07:00", "16:00"],
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
        "examples": ["โรงแรมสุวรรณ", "โรงแรมศรีธนา"],
        "bookingUrl": "https://www.booking.com/region/th/uttaradit.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["เดอะวีวิวรีสอร์ท", "Thaimit Resort"],
        "bookingUrl": "https://www.booking.com/region/th/uttaradit.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["Thaisarn Village", "River Library Hotel"],
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
    "ecoIds": ["f_elephant", "f_snake_cobra", "f_monkey", "t_mountain", "t_rainforest", "c_pm25", "c_flash_flood"],
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
        "via": ["พระนครศรีอยุธยา", "พิษณุโลก"],
        "departureTimes": ["14:00", "21:00"],
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
        "via": ["พระนครศรีอยุธยา", "นครสวรรค์", "พิษณุโลก"],
        "departureTimes": ["08:30", "19:00"],
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
        "departureTimes": ["07:00"],
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
        "examples": ["The Original Sukhothai", "Banlansuan Fan Apartments"],
        "bookingUrl": "https://www.booking.com/region/th/sukhothai.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-2000฿/คืน",
        "examples": ["Legendha Sukhothai Resort", "Sukhothai Treasure Resort"],
        "bookingUrl": "https://www.booking.com/region/th/sukhothai.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-5000฿/คืน",
        "examples": ["Sriwilai Sukhothai Resort & Spa", "Sukhothai Heritage Resort"],
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
    "ecoIds": ["f_elephant", "t_plain", "c_flash_flood", "c_monsoon", "fl_nettle"],
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
        "via": ["ลพบุรี", "เพชรบูรณ์", "พิษณุโลก", "อุตรดิตถ์"],
        "departureTimes": ["07:00", "17:00"],
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
        "via": ["พระนครศรีอยุธยา", "นครสวรรค์", "พิษณุโลก", "อุตรดิตถ์"],
        "departureTimes": ["10:00", "18:00"],
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
        "via": ["แม่อาย"],
        "departureTimes": ["08:00"],
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
        "departureTimes": ["09:00", "13:00"],
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
        "examples": ["โรงแรมบ้านทุ่งเสา", "พิริยะ ฮาส"],
        "bookingUrl": "https://www.booking.com/region/th/tak.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-2000฿/คืน",
        "examples": ["โรงแรมฑิฆัมพร", "ฮอป อินน์ ตาก"],
        "bookingUrl": "https://www.booking.com/region/th/tak.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-5000฿/คืน",
        "examples": ["โรงแรมริเวอร์ไซด์", "โรงแรมลีลาวดี"],
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
    "ecoIds": ["f_elephant", "f_snake_cobra", "f_monkey", "f_boar_hunt", "t_mountain", "t_rainforest", "c_flash_flood", "fl_kratom", "fl_bamboo"],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 20-38°C, ฝนตกชุก มิ.ย.-ต.ค.",
      "terrain": "ภูเขาสูง ป่าเขตร้อน และแม่น้ำเมย",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  }
}
```