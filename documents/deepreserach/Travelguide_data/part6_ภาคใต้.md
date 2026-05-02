```json
{
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
        "departureTimes": ["08:00", "13:00", "19:00"],
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
        "via": ["นครปฐม", "ราชบุรี", "เพชรบุรี", "ประจวบคีรีขันธ์", "ชุมพร"],
        "departureTimes": ["07:30", "17:30"],
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
        "via": ["ราชบุรี", "ประจวบคีรีขันธ์", "ชุมพร"],
        "departureTimes": ["18:00", "20:00", "23:00"],
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
        "examples": ["The Episode Boutique Hotel", "Baansrisuthum 2"],
        "bookingUrl": "https://www.booking.com/region/th/surat-thani.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["Dusit Princess Koh Samui", "Phanganak Resort"],
        "bookingUrl": "https://www.booking.com/region/th/surat-thani.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "4000-10000฿/คืน",
        "examples": ["Vana Belle Resort (เกาะสมุย)", "The Ritz-Carlton, Koh Samui"],
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
    "ecoIds": ["f_elephant", "f_boar", "t_rainforest", "t_mangrove", "c_monsoon"],
    "newEcoEntities": [
      {
        "id": "f_coral",
        "name": "ปะการัง",
        "category": "fauna",
        "tags": ["protected", "common"],
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
        "departureTimes": ["06:30", "14:00", "20:00"],
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
        "via": ["นครปฐม", "ราชบุรี", "เพชรบุรี", "ชุมพร"],
        "departureTimes": ["17:00", "20:00", "23:00"],
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
        "departureTimes": ["08:00", "15:00"],
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
        "examples": ["Lub D Phuket Patong (Hostel)", "Bodega Phuket"],
        "bookingUrl": "https://www.booking.com/region/th/phuket.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "2500-4000฿/คืน",
        "examples": ["Holiday Inn Express Patong", "Novotel Phuket Kamala"],
        "bookingUrl": "https://www.booking.com/region/th/phuket.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "5000-20000฿/คืน",
        "examples": ["Andara Resort & Villas", "Sri Panwa Phuket"],
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
    "ecoIds": ["f_cobra", "f_monkey", "t_rainforest", "c_monsoon"],
    "newEcoEntities": [
      {
        "id": "t_coast",
        "name": "ชายฝั่งทะเล",
        "category": "terrain",
        "tags": ["common", "protected"],
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
        "via": ["ราชบุรี", "ชุมพร", "สุราษฎร์ธานี"],
        "departureTimes": ["19:00", "22:00"],
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
        "departureTimes": ["07:00", "13:00", "18:00"],
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
        "departureTimes": ["08:00", "12:00", "16:00"],
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
        "examples": ["Blu Monkey Hub & Hotel (กระบี่)", "ขวัญเวียงเกสต์เฮาส์"],
        "bookingUrl": "https://www.booking.com/region/th/krabi.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["Centara Anda Dhevi Resort", "Ao Nang Beachfront Resort"],
        "bookingUrl": "https://www.booking.com/region/th/krabi.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "4000-15000฿/คืน",
        "examples": ["Rayavadee Resort", "Phulay Bay, Ritz-Carlton"],
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
    "ecoIds": ["f_snake_cobra", "f_boar", "t_mangrove", "c_flash_flood"],
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
        "via": ["ถลาง"],
        "departureTimes": ["09:00", "15:00"],
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
        "departureTimes": ["10:00", "16:00"],
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
        "departureTimes": ["07:30"],
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
        "examples": ["PP Mansion", "Baan Nipha"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["The Leaf On The Sands by Katatrian", "Ananda Resort"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "4000-12000฿/คืน",
        "examples": ["SALA Phuket Resort and Spa (ใกล้พังงา)", "Keemala (ภูเก็ต)"],
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
    "ecoIds": ["f_monkey", "t_mangrove", "t_cave", "c_flash_flood"],
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
        "via": ["ราชบุรี", "สุพรรณ", "ประจวบ", "ชุมพร"],
        "departureTimes": ["18:00", "22:00"],
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
        "via": ["ราชบุรี", "สุพรรณ", "ประจวบ", "ชุมพร"],
        "departureTimes": ["17:40"],
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
        "departureTimes": ["10:00"],
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
        "examples": ["The Town Hostel", "Nakhon F Street Hotel"],
        "bookingUrl": "https://www.booking.com/region/th/nakhon-si-thammarat.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1000-2500฿/คืน",
        "examples": ["Last Paradise Hotel", "Dusit Buncha Resort"],
        "bookingUrl": "https://www.booking.com/region/th/nakhon-si-thammarat.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "3000-8000฿/คืน",
        "examples": ["The Crystal Hotel", "InterContinental Samui Baan Taling Ngam Resort"],
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
    "ecoIds": ["f_boar", "f_cobra", "t_urban", "t_rainforest"],
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
  },
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
        "via": ["นครปฐม", "ราชบุรี", "ชุมพร"],
        "departureTimes": ["22:45"],
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
        "departureTimes": ["07:30", "15:00", "20:00"],
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
        "departureTimes": ["08:00", "18:00"],
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
        "examples": ["Amata Samui Hotel", "New Asia Lee Garden"],
        "bookingUrl": "https://www.booking.com/region/th/songkhla.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1200-3000฿/คืน",
        "examples": ["The One Hotel", "Tonson Hotel"],
        "bookingUrl": "https://www.booking.com/region/th/songkhla.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "4000-10000฿/คืน",
        "examples": ["Centara Hotel Hat Yai", "Holiday Inn Hat Yai"],
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
    "ecoIds": ["f_boar", "f_snake_green", "t_rainforest", "c_monsoon"],
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
        "departureTimes": ["06:30", "11:30"],
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
        "via": ["ราชบุรี", "ชุมพร"],
        "departureTimes": ["18:00", "22:00"],
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
        "departureTimes": ["09:00", "15:00"],
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
        "examples": ["Naka Hotel Trang", "The Beach House"],
        "bookingUrl": "https://www.booking.com/region/th/trang.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1000-2500฿/คืน",
        "examples": ["GoodMorningTrang Hotel", "Manee Resort"],
        "bookingUrl": "https://www.booking.com/region/th/trang.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "3000-8000฿/คืน",
        "examples": ["Twin Lotus Resort", "Anantara Si Kao"],
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
    "ecoIds": ["t_coastal", "t_mangrove", "f_snake_green", "c_flash_flood"],
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
        "via": ["พังงา", "ระนอง"],
        "departureTimes": ["08:00", "14:00"],
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
        "departureTimes": ["09:00", "13:00"],
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
        "departureTimes": ["10:00", "14:00"],
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
        "examples": ["Mareeya Homestay", "PK Guesthouse"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1200-3000฿/คืน",
        "examples": ["Andamaya Dive Resort (เกาะสุกร)", "Phupha Waree Resort"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "3000-8000฿/คืน",
        "examples": ["Layana Resort (เกาะหลีเป๊ะ)", "Benjarong Resort"],
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
    "ecoIds": ["t_mangrove", "t_coastal", "c_flash_flood", "f_dog_stray"],
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
        "departureTimes": ["08:00", "12:00", "16:00"],
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
        "via": ["ราชบุรี", "ชุมพร"],
        "departureTimes": ["17:00", "21:00"],
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
        "departureTimes": ["10:30"],
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
        "examples": ["RimSai Resort", "Klongzon Resort"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1000-2000฿/คืน",
        "examples": ["Parkview Resort Hotel Phatthalung", "Palatial Place"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2500-8000฿/คืน",
        "examples": ["Chiangkhan Kabinburi Park View Resort"],
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
    "ecoIds": ["t_mountain", "t_rainforest", "f_snake_green", "c_flash_flood"],
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
        "via": ["ราชบุรี", "ประจวบคีรีขันธ์"],
        "departureTimes": ["08:45", "20:30"],
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
        "via": ["ราชบุรี", "ประจวบฯ"],
        "departureTimes": ["09:00", "21:00"],
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
        "via": ["เพชรบุรี", "ประจวบฯ"],
        "departureTimes": ["10:00", "18:00"],
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
        "examples": ["Krungthong Mansion", "Phatchara Residence"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-2000฿/คืน",
        "examples": ["Vico Residence", "Iwade Hotel"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-6000฿/คืน",
        "examples": ["Chaolay Hotel", "Blue Andaman Lanta"],
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
    "ecoIds": ["t_rainforest", "f_snake_green", "c_flash_flood", "fl_seaweed"],
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
  },
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
        "via": ["เพชรบุรี", "ชุมพร"],
        "departureTimes": ["09:00", "21:00"],
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
        "departureTimes": ["06:00", "14:00"],
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
        "departureTimes": ["08:30", "16:30"],
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
        "examples": ["Narong Hotel", "Aek Chan Hotel"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1200-3000฿/คืน",
        "examples": ["Sk Residence", "Ranong City Hotel"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "3500-8000฿/คืน",
        "examples": ["Zcape Hotel", "Tew Lay Bar & Pool Villa"],
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
    "ecoIds": ["t_rainforest", "f_monkey", "c_flash_flood", "f_elephant"],
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
        "via": ["นครปฐม", "ชุมพร", "สตูล"],
        "departureTimes": ["19:00"],
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
        "departureTimes": ["08:00", "14:00"],
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
        "departureTimes": ["07:00"],
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
        "examples": ["โรงแรมเบตง รัตนการ์เด้น", "City Inn Yala"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1000-2500฿/คืน",
        "examples": ["โรงแรมยะลาปาร์ค", "โรงแรมเดอะซิตี"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2500-6000฿/คืน",
        "examples": ["โรงแรมเปอร์เซโฟนี เบตง"],
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
    "ecoIds": ["t_mountain", "t_rainforest", "f_boar_hunt", "c_monsoon"],
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
        "departureTimes": ["07:00", "13:00"],
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
        "departureTimes": ["11:00", "19:00"],
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
        "departureTimes": ["08:00"],
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
        "examples": ["BS Boutique Hotel Pattani", "Shaik Sulaiman Hotel"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-2000฿/คืน",
        "examples": ["Aditya Hotel Pattani", "Koh Si Pattani"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-6000฿/คืน",
        "examples": ["โรงแรมปัตตานีเทอร์มินอล"],
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
    "ecoIds": ["t_rainforest", "f_monkey", "c_heat_stroke", "c_flash_flood"],
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
        "via": ["นครปฐม", "ชุมพร", "ปัตตานี"],
        "departureTimes": ["19:10"],
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
        "departureTimes": ["08:00", "14:00"],
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
        "departureTimes": ["15:00"],
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
        "examples": ["Radda Hotel", "Horizon Hotel Narathiwat"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-2000฿/คืน",
        "examples": ["Santa Elena Hotel", "The Emperor Narathiwat"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-6000฿/คืน",
        "examples": ["โรงแรม โกลเด้น เบด"],
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
    "ecoIds": ["t_monsoon", "f_monkey", "f_boar", "fl_nettle"],
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
}
```