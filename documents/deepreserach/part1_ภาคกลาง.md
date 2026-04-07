```json
{
  "Bangkok": {
    "transport": [
      {
        "name": "รถไฟฟ้าบีทีเอส",
        "shortName": "BTS",
        "type": "rail",
        "description": "ระบบขนส่งมวลชนทางรางยกระดับในกรุงเทพฯ มี 62 สถานีและความยาวรวม 70 กิโลเมตร【5†L755-L762】.",
        "warpUrl": "https://www.bts.co.th",
        "logoText": "🚆",
        "color": "#0099CC"
      },
      {
        "name": "รถไฟฟ้าใต้ดิน MRT",
        "shortName": "MRT",
        "type": "rail",
        "description": "ระบบรถไฟฟ้าใต้ดินใน กทม. และปริมณฑล มี 4 สาย ให้บริการสถานีรวม 107 แห่ง【10†L176-L184】.",
        "warpUrl": "https://www.bangkokmetro.co.th",
        "logoText": "🚇",
        "color": "#174ABB"
      },
      {
        "name": "รถไฟฟ้าเชื่อมท่าอากาศยานสุวรรณภูมิ",
        "shortName": "ARL",
        "type": "rail",
        "description": "รถไฟฟ้าชานเมืองเชื่อมสนามบินสุวรรณภูมิกับกรุงเทพฯ ผ่านสถานีพญาไทและมักกะสัน【17†L148-L156】.",
        "warpUrl": "",
        "logoText": "✈️",
        "color": "#00AAE4"
      },
      {
        "name": "เรือโดยสารเจ้าพระยา",
        "shortName": "เรือด่วน",
        "type": "boat",
        "description": "ให้บริการเรือด่วนเจ้าพระยาผ่านท่าเรือต่างๆ ในกรุงเทพฯ และปริมณฑลโดยเชื่อมต่อถึงเกาะเกร็ด (นนทบุรี)【45†L32-L40】.",
        "warpUrl": "https://www.chaophrayaexpressboat.com",
        "logoText": "🛥️",
        "color": "#FF4500"
      },
      {
        "name": "รถโดยสารประจำทาง (ขสมก.)",
        "shortName": "รถเมล์",
        "type": "bus",
        "description": "บริการรถโดยสารประจำทางสาธารณะในกรุงเทพฯ ครอบคลุมเส้นทางทั่วเมือง บริหารโดย ขสมก.",
        "warpUrl": "https://www.bmta.co.th",
        "logoText": "🚌",
        "color": "#EF0000"
      },
      {
        "name": "ตุ๊กตุ๊ก",
        "shortName": "ตุ๊กตุ๊ก",
        "type": "tuk_tuk",
        "description": "ยานพาหนะสามล้อเครื่องเปิดโล่ง ประจำกรุงเทพฯ ให้บริการเดินทางระยะสั้นในเมือง.",
        "warpUrl": "",
        "logoText": "🛺",
        "color": "#F39C12"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: อนุสาวรีย์ชัยฯ - ช่องนนทรี",
        "type": "van",
        "operator": "BMTA",
        "from": "อนุสาวรีย์ชัยฯ",
        "to": "สถานีช่องนนทรี BTS",
        "via": ["ดินแดง", "สีลม"],
        "departureTimes": ["07:00", "08:00", "09:00"],
        "duration": "45 นาที",
        "baseFare": 10,
        "frequency": "ทุก 30 นาที",
        "terminal": "อนุสาวรีย์ชัยฯ",
        "notes": null
      },
      {
        "name": "สาย 32: หมอชิต - สำโรง",
        "type": "bus",
        "operator": "BMTA",
        "from": "สถานีขนส่งหมอชิต",
        "to": "สถานี BTS สำโรง",
        "via": ["สุขุมวิท", "สมุทรปราการ"],
        "departureTimes": ["06:00", "09:00", "12:00"],
        "duration": "1-1.5 ชม.",
        "baseFare": 25,
        "frequency": "ทุก 1 ชม.",
        "terminal": "หมอชิต 2",
        "notes": null
      },
      {
        "name": "MRT สายสีน้ำเงิน: หัวลำโพง - บางซื่อ",
        "type": "train",
        "operator": "BEM",
        "from": "หัวลำโพง",
        "to": "บางซื่อ",
        "via": ["สีลม", "จตุจักร"],
        "departureTimes": ["06:00", "06:15", "06:30"],
        "duration": "20 นาที",
        "baseFare": 16,
        "frequency": "ทุก 8 นาที",
        "terminal": "หัวลำโพง",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "ข้าวมันไก่",
        "priceRange": "40-60฿",
        "category": "street",
        "note": "สตรีทฟู้ดยอดนิยมของกรุงเทพฯ"
      },
      {
        "name": "ผัดไทย",
        "priceRange": "30-50฿",
        "category": "street",
        "note": "ผัดไทยจานด่วนขายทั่วไปในกรุงเทพฯ"
      },
      {
        "name": "ต้มยำกุ้ง",
        "priceRange": "80-150฿",
        "category": "local",
        "note": "ต้มยำรสจัดจ้านสไตล์กรุงเทพฯ"
      },
      {
        "name": "ทองม้วน",
        "priceRange": "20-40฿",
        "category": "dessert",
        "note": "ขนมหวานกรอบม้วนไส้มะพร้าว"
      },
      {
        "name": "น้ำแข็งใส",
        "priceRange": "30-50฿",
        "category": "drink",
        "note": "ของหวานคลายร้อนยอดนิยม"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "300-800฿/คืน",
        "examples": ["Smart Suites Sukhumvit", "Lub d Bangkok Siam"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-2000฿/คืน",
        "examples": ["Novotel Bangkok on Siam Square", "Ibis Bangkok Riverside"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "3000-6000฿/คืน",
        "examples": ["Mandarin Oriental Bangkok", "The Peninsula Bangkok"],
        "bookingUrl": ""
      }
    ],
    "dangerZones": [
      {
        "label": "น้ำท่วม",
        "severity": "medium",
        "note": "กรุงเทพฯ มีความเสี่ยงน้ำท่วมขังในฤดูฝน",
        "season": "ก.ย.-พ.ย."
      },
      {
        "label": "มลพิษทางอากาศ (PM2.5)",
        "severity": "high",
        "note": "มีฝุ่นละอองขนาดเล็กในช่วงปลายฤดูหนาว",
        "season": "ม.ค.-มี.ค."
      },
      {
        "label": "อากาศร้อน",
        "severity": "high",
        "note": "มีอุณหภูมิสูงในช่วงเดือนเม.ย.-พ.ค.",
        "season": "เม.ย.-พ.ค."
      }
    ],
    "ecoIds": [
      "t_urban",
      "c_pm25",
      "c_heat_stroke",
      "f_dog_stray"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 25-35°C, ฝนตกชุกในฤดูฝน",
      "terrain": "ที่ราบลุ่มตอนล่างของแม่น้ำเจ้าพระยา",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": [{"label": "โรงพยาบาลตำรวจ", "number": "02-141-2545"}]
    }
  },
  "Nonthaburi": {
    "transport": [
      {
        "name": "รถไฟฟ้ามหานคร สายสีม่วง",
        "shortName": "MRT สายสีม่วง",
        "type": "rail",
        "description": "รถไฟฟ้าสายสีม่วง เชื่อมกรุงเทพฯ (เตาปูน) - นนทบุรี (คลองบางไผ่) ระยะทาง 23 กม. มีสถานี 16 แห่ง【43†L19-L23】.",
        "warpUrl": "https://www.bemplc.co.th",
        "logoText": "🚇",
        "color": "#800080"
      },
      {
        "name": "รถโดยสารประจำทางสาย 30",
        "shortName": "รถเมล์ 30",
        "type": "bus",
        "description": "รถเมล์ ขสมก. สาย 30 วิ่งจากอนุสาวรีย์ชัยฯ-ปากเกร็ด (นนทบุรี)",
        "warpUrl": "https://www.bmta.co.th",
        "logoText": "🚌",
        "color": "#CC0000"
      },
      {
        "name": "เรือด่วนเจ้าพระยา (ธงเหลือง)",
        "shortName": "เรือด่วน",
        "type": "boat",
        "description": "เรือด่วนเจ้าพระยาธงเหลือง เส้นทางนนทบุรี-สาทร บริการวันจันทร์-ศุกร์【45†L44-L52】.",
        "warpUrl": "https://www.chaophrayaexpressboat.com",
        "logoText": "🛥️",
        "color": "#EDB90C"
      }
    ],
    "routes": [
      {
        "name": "สาย 97: หมอชิต - ปากเกร็ด",
        "type": "bus",
        "operator": "BMTA",
        "from": "หมอชิต",
        "to": "ปากเกร็ด",
        "via": ["หลักสี่", "ปทุมธานี"],
        "departureTimes": ["06:00", "07:00", "08:00"],
        "duration": "30-40 นาที",
        "baseFare": 30,
        "frequency": "ทุก 30 นาที",
        "terminal": "หมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 32: บางซื่อ - บางบัวทอง",
        "type": "bus",
        "operator": "BMTA",
        "from": "สถานีบางซื่อ BTS",
        "to": "บางบัวทอง",
        "via": ["ตลิ่งชัน", "บางใหญ่"],
        "departureTimes": ["07:30", "12:30", "17:30"],
        "duration": "1.5-2 ชม.",
        "baseFare": 20,
        "frequency": "ทุก 2 ชม.",
        "terminal": "สถานีบางซื่อ",
        "notes": null
      },
      {
        "name": "รถตู้ กรุงเทพฯ - นนทบุรี",
        "type": "van",
        "operator": "Van Center",
        "from": "อนุสาวรีย์ชัยฯ",
        "to": "เซ็นทรัลรัตนาธิเบศร์ (นนทบุรี)",
        "via": ["ดินแดง", "งามวงศ์วาน"],
        "departureTimes": ["06:30", "07:30", "08:30"],
        "duration": "20-30 นาที",
        "baseFare": 35,
        "frequency": "ทุก 30 นาที",
        "terminal": "รอบอนุสาวรีย์ชัยฯ",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "ขนมจีนน้ำพริก",
        "priceRange": "30-50฿",
        "category": "street",
        "note": "ขนมจีนราดน้ำพริกเข้มข้นสูตรเมืองนนท์【25†L1-L4】"
      },
      {
        "name": "ข้าวตังหน้าตั้ง",
        "priceRange": "20-40฿",
        "category": "street",
        "note": "ข้าวตังกรอบราดด้วยน้ำจิ้มหน้าตั้งสูตรเฉพาะนนทบุรี【25†L1-L4】"
      },
      {
        "name": "หมูโสร่ง",
        "priceRange": "50-80฿",
        "category": "street",
        "note": "หมูสับปรุงรสชุบแป้งทอดเป็นแท่งบนไม้ เสิร์ฟพร้อมน้ำจิ้มเปรี้ยวหวาน【25†L1-L4】"
      },
      {
        "name": "ทอดมันหน่อกะลา",
        "priceRange": "50-100฿",
        "category": "local",
        "note": "ทอดมันทำจากหน่อกะลาผสมน้ำพริกเครื่องแกง ทอดกรอบนอกนุ่มใน【25†L1-L4】"
      },
      {
        "name": "ข้าวเหนียวมะม่วงยายกล่ำ",
        "priceRange": "30-60฿",
        "category": "dessert",
        "note": "ข้าวเหนียวมูนหน้ามะม่วงอกร่อง มะม่วงคัดพิเศษจากนนทบุรี"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "500-1000฿/คืน",
        "examples": ["ไวท์อินน์ (Whiteinn)", "ทาวน์สแควร์ รัตนาธิเบศร์"],
        "bookingUrl": "https://www.agoda.com/city/nonthaburi-th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1000-2000฿/คืน",
        "examples": ["เดอะ ทรี อินน์ เมืองทองธานี", "ไอบิส กรุงเทพฯ อิมแพ็ค"],
        "bookingUrl": "https://www.agoda.com/city/nonthaburi-th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-4000฿/คืน",
        "examples": ["โนโวเทล กรุงเทพฯ อิมแพ็ค", "ริเวอร์ไรน์ เพลซ โฮเทล แอนด์ เรสซิเดนซ์"],
        "bookingUrl": "https://www.agoda.com/city/nonthaburi-th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "น้ำท่วม",
        "severity": "medium",
        "note": "ระดับน้ำเจ้าพระยาสูงทำให้บางบริเวณเสี่ยงน้ำท่วมขัง",
        "season": "ก.ย.-พ.ย."
      },
      {
        "label": "ฝุ่นละออง (PM2.5)",
        "severity": "high",
        "note": "ค่าฝุ่นละอองเกินมาตรฐานในฤดูหนาว",
        "season": "ต.ค.-ก.พ."
      },
      {
        "label": "อากาศร้อน",
        "severity": "high",
        "note": "อุณหภูมิสูงในช่วงฤดูร้อน",
        "season": "เม.ย.-พ.ค."
      },
      {
        "label": "สุนัขจรจัด",
        "severity": "low",
        "note": "พบสุนัขจรจัดตามชุมชน เสี่ยงกัดติดเชื้อ",
        "season": null
      }
    ],
    "ecoIds": [
      "f_dog_stray",
      "t_urban",
      "c_pm25",
      "c_heat_stroke"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 24-34°C, ฝนตกชุกช่วง ก.ค.-ต.ค.",
      "terrain": "ที่ราบลุ่มริมแม่น้ำเจ้าพระยา มีชุมชนและสวน",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": [{"label": "โรงพยาบาลพระนั่งเกล้า", "number": "02-920-4444"}]
    }
  },
  "Pathum Thani": {
    "transport": [
      {
        "name": "รถไฟชานเมืองสายสีแดง (รังสิต)",
        "shortName": "Red Line",
        "type": "rail",
        "description": "รถไฟฟ้าชานเมืองสายสีแดง (บางซื่อ-รังสิต) ให้บริการเชื่อม กรุงเทพฯ กับรังสิต ใช้เวลา ~23 นาที【52†L19-L27】.",
        "warpUrl": "https://www.srtet.co.th",
        "logoText": "🚆",
        "color": "#E02020"
      },
      {
        "name": "รถโดยสารประจำทางสาย 84",
        "shortName": "รถเมล์ 84",
        "type": "bus",
        "description": "รถเมล์ ขสมก. สาย 84 วิ่งจากอนุสาวรีย์ชัยฯ-นครปฐม ผ่านรังสิตและปทุมธานี",
        "warpUrl": "https://www.bmta.co.th",
        "logoText": "🚌",
        "color": "#C92019"
      },
      {
        "name": "รถตู้ กรุงเทพฯ - ปทุมธานี",
        "shortName": "รถตู้",
        "type": "van",
        "description": "รถตู้โดยสารเดินทางระหว่างบางเขน กรุงเทพฯ – รังสิต – ปทุมธานี ให้บริการความถี่สูง",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#00AA00"
      }
    ],
    "routes": [
      {
        "name": "สาย 538: ปทุมธานี - เชียงใหม่",
        "type": "bus",
        "operator": "Transport Co., Ltd.",
        "from": "หมอชิต 2",
        "to": "เชียงใหม่",
        "via": ["อ่างทอง", "ลพบุรี"],
        "departureTimes": ["18:00", "22:00"],
        "duration": "7-8 ชม.",
        "baseFare": 600,
        "frequency": "ทุก 5 ชม.",
        "terminal": "หมอชิต 2",
        "notes": null
      },
      {
        "name": "รถไฟ เด่นชัย-น่าน สายใต้ (ผ่านปทุมธานี)",
        "type": "train",
        "operator": "SRT",
        "from": "กรุงเทพฯ (หัวลำโพง)",
        "to": "น่าน",
        "via": ["ปทุมธานี"],
        "departureTimes": ["22:00"],
        "duration": "10-11 ชม.",
        "baseFare": 550,
        "frequency": "รายวัน",
        "terminal": "หัวลำโพง",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "แกงป่าไก่",
        "priceRange": "50-80฿",
        "category": "local",
        "note": "แกงรสจัดใส่สมุนไพรพื้นเมือง ปทุมธานี"
      },
      {
        "name": "ข้าวเม่าทอด",
        "priceRange": "30-50฿",
        "category": "dessert",
        "note": "ข้าวเม่าลูกใหญ่ชุบแป้งทอดกรอบ ทอดแห้งใช้ไส้มะพร้าว"
      },
      {
        "name": "ไข่เค็มดอนตูม",
        "priceRange": "30-50฿",
        "category": "local",
        "note": "ไข่เค็มเคลือบแป้งนึ่งสูตรดั้งเดิมจากอำเภอดอนตูม"
      },
      {
        "name": "ผัดหมี่เมืองปทุม",
        "priceRange": "40-60฿",
        "category": "street",
        "note": "ผัดหมี่เหลืองสูตรพื้นเมืองโรยหมูหยองและกุ้งแห้งกรอบ"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "400-900฿/คืน",
        "examples": ["Town Square Rangsit", "My Sweet Villa"],
        "bookingUrl": "https://www.booking.com/city/th/pathum-thani.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "900-1500฿/คืน",
        "examples": ["The One Hotel Rangsit", "Bangkok Boutique Resort Rangsit"],
        "bookingUrl": "https://www.booking.com/city/th/pathum-thani.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-2500฿/คืน",
        "examples": ["Bangkok Boutique Resort Rangsit", "Baan Bangkok 97 Hotel"],
        "bookingUrl": "https://www.booking.com/city/th/pathum-thani.html"
      }
    ],
    "dangerZones": [
      {
        "label": "น้ำท่วมขัง",
        "severity": "medium",
        "note": "พื้นที่การเกษตรรอบๆ อาจเกิดน้ำท่วมขังในฤดูฝน",
        "season": "ก.ย.-พ.ย."
      },
      {
        "label": "อากาศร้อนจัด",
        "severity": "high",
        "note": "มีอากาศร้อนอบอ้าวในช่วงปลายฤดูร้อน",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "ฝุ่นละออง PM2.5",
        "severity": "medium",
        "note": "คุณภาพอากาศแย่ในฤดูหนาว",
        "season": "ธ.ค.-ก.พ."
      }
    ],
    "ecoIds": [
      "t_urban",
      "c_heat_stroke",
      "c_pm25"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 24-35°C, ฝนตกชุก ก.ค.-ต.ค.",
      "terrain": "ที่ราบลุ่มแม่น้ำเจ้าพระยาและคลองชลประทาน",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": [{"label": "โรงพยาบาลปทุมธานี", "number": "02-528-2555"}]
    }
  },
  "Samut Prakan": {
    "transport": [
      {
        "name": "รถไฟฟ้าสายสีเหลือง",
        "shortName": "รถไฟฟ้าสายสีเหลือง",
        "type": "rail",
        "description": "รถไฟฟ้าสายสีเหลือง (ลาดพร้าว-สำโรง) ให้บริการถึงเมืองสำโรง จ.สมุทรปราการ",
        "warpUrl": "https://bemplc.co.th",
        "logoText": "🚇",
        "color": "#FFDD00"
      },
      {
        "name": "รถโดยสารประจำทางสาย 139",
        "shortName": "รถเมล์ 139",
        "type": "bus",
        "description": "รถเมล์ ขสมก. สาย 139 วิ่งจากอนุสาวรีย์ชัยฯ-องค์พระปฐมเจดีย์ (สมุทรปราการ)",
        "warpUrl": "https://www.bmta.co.th",
        "logoText": "🚌",
        "color": "#C20000"
      },
      {
        "name": "วินมอเตอร์ไซค์รับจ้าง",
        "shortName": "วินมอเตอร์ไซค์",
        "type": "bike",
        "description": "บริการวินมอเตอร์ไซค์รับจ้าง อำนวยความสะดวกในพื้นที่เมืองสมุทรปราการ",
        "warpUrl": "",
        "logoText": "🏍️",
        "color": "#000000"
      }
    ],
    "routes": [
      {
        "name": "เส้นทาง 4: กรุงเทพฯ - บางพลี - สุวรรณภูมิ",
        "type": "coach",
        "operator": "Transport Co., Ltd.",
        "from": "หมอชิต 2",
        "to": "สนามบินสุวรรณภูมิ",
        "via": ["ลำลูกกา", "บางพลี"],
        "departureTimes": ["05:30", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00"],
        "duration": "1.5-2 ชม.",
        "baseFare": 50,
        "frequency": "ทุก 30 นาที",
        "terminal": "หมอชิต 2",
        "notes": null
      },
      {
        "name": "รถไฟเหนือ/อีสาน (กรุงเทพฯ-นครสวรรค์) ผ่านสมุทรปราการ",
        "type": "train",
        "operator": "SRT",
        "from": "กรุงเทพฯ (หัวลำโพง)",
        "to": "นครสวรรค์",
        "via": ["สมุทรปราการ"],
        "departureTimes": ["18:10"],
        "duration": "3-4 ชม.",
        "baseFare": 200,
        "frequency": "รายวัน",
        "terminal": "หัวลำโพง",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "แกงโหม่ง",
        "priceRange": "60-100฿",
        "category": "local",
        "note": "แกงกะทิเข้มข้นใส่ผักพื้นบ้าน เช่น สมอไทย จากพระสมุทรเจดีย์"
      },
      {
        "name": "ฉู่ฉี่ปลาหมอ",
        "priceRange": "80-120฿",
        "category": "local",
        "note": "ปลาหมอกรอบผัดเครื่องแกงรสจัด สูตรพระสมุทรเจดีย์"
      },
      {
        "name": "ส้มโอท่าไม้",
        "priceRange": "40-80฿",
        "category": "dessert",
        "note": "ส้มโอพันธุ์ท่าไม้ของดีสมุทรปราการ รสหวานกรอบ"
      },
      {
        "name": "ขนมบ้าบิ่น",
        "priceRange": "20-30฿",
        "category": "dessert",
        "note": "ขนมบ้าบิ่นกะทิสดจ.ปทุมธานี (นิยมในบางพลี สมุทรปราการ)"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "500-1000฿/คืน",
        "examples": ["Blue Hippo Hotel", "Monthon Inn Resort"],
        "bookingUrl": "https://www.agoda.com/city/samut-prakan-th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1000-2000฿/คืน",
        "examples": ["Oriel Residence Samut Prakan", "The Tide Resort"],
        "bookingUrl": "https://www.agoda.com/city/samut-prakan-th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2500-4000฿/คืน",
        "examples": ["Hilton Bangkok Suvarnabhumi Golf Resort", "Woodville Hotel & Residence"],
        "bookingUrl": "https://www.agoda.com/city/samut-prakan-th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "น้ำท่วม",
        "severity": "high",
        "note": "พื้นที่แถวปากน้ำอาจเกิดน้ำท่วมขังในฤดูฝน",
        "season": "ก.ย.-พ.ย."
      },
      {
        "label": "อากาศร้อนจัด",
        "severity": "high",
        "note": "มีความร้อนสูงในฤดูร้อน",
        "season": "เม.ย.-พ.ค."
      },
      {
        "label": "ฝุ่น PM2.5",
        "severity": "medium",
        "note": "ค่าฝุ่นละอองสูงในฤดูหนาว",
        "season": "ธ.ค.-ก.พ."
      }
    ],
    "ecoIds": [
      "t_mangrove",
      "c_heat_stroke",
      "c_pm25",
      "f_dog_stray"
    ],
    "newEcoEntities": [
      {
        "id": "f_oyster",
        "name": "หอยนางรม",
        "category": "fauna",
        "tags": ["common", "edible"],
        "desc": "หอยนางรมทะเลหอยทากอาศัยอยู่ในทะเลอ่าวไทยบริเวณสมุทรปราการ นิยมเก็บไว้ประกอบอาหารทะเล"
      }
    ],
    "metadata": {
      "climate": "อุณหภูมิ 25-34°C, ชื้นมากบริเวณชายฝั่ง ฝนตกชุก ก.ค.-ก.ย.",
      "terrain": "ที่ราบลุ่มริมน้ำและชายฝั่งทะเลบางส่วน",
      "bestSeason": "พ.ย.-ม.ค.",
      "emergencyContacts": [{"label": "โรงพยาบาลบางพลี", "number": "02-175-7200"}]
    }
  },
  "Ayutthaya": {
    "transport": [
      {
        "name": "รถไฟ สถานีอยุธยา",
        "shortName": "รถไฟ",
        "type": "rail",
        "description": "สถานีรถไฟอยุธยา รองรับรถไฟทางไกลจากกรุงเทพฯ เชื่อมต่อภาคเหนือและตะวันออกเฉียงเหนือ",
        "warpUrl": "http://www.railway.co.th",
        "logoText": "🚆",
        "color": "#005AAA"
      },
      {
        "name": "รถโดยสารประจำทาง สาย 89",
        "shortName": "รถเมล์ 89",
        "type": "bus",
        "description": "รถโดยสาร สาย 89 วิ่งจากกรุงเทพฯ (จตุจักร) - อยุธยา",
        "warpUrl": "https://www.transport.co.th",
        "logoText": "🚌",
        "color": "#FF8C00"
      },
      {
        "name": "สองแถว อยุธยา",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "สองแถวรับจ้างท้องถิ่นให้บริการเดินทางภายในตัวเมืองพระนครศรีอยุธยา",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#FFCC00"
      }
    ],
    "routes": [
      {
        "name": "รถทัวร์ กรุงเทพฯ - อยุธยา (เมืองทอง)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด",
        "from": "หมอชิต 2",
        "to": "อยุธยา (พนมทวน)",
        "via": ["ปทุมธานี"],
        "departureTimes": ["06:30", "09:30", "12:30", "15:30", "18:30"],
        "duration": "1 ชม.",
        "baseFare": 50,
        "frequency": "ทุก 3 ชม.",
        "terminal": "หมอชิต 2",
        "notes": null
      },
      {
        "name": "แอร์พอร์ตลิงก์ + รถตู้",
        "type": "van",
        "operator": "รถตู้รวม",
        "from": "พญาไท",
        "to": "อยุธยา",
        "via": ["ดอนเมือง", "ปทุมธานี"],
        "departureTimes": ["07:00", "08:00", "09:00"],
        "duration": "1.5 ชม.",
        "baseFare": 70,
        "frequency": "ทุก 1 ชม.",
        "terminal": "สถานีรถไฟฟ้าแอร์พอร์ตลิงก์ พญาไท",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "โรตีสายไหม",
        "priceRange": "20-30฿",
        "category": "dessert",
        "note": "ขนมหวานสายไหมอบนุ่มประจำอยุธยา"
      },
      {
        "name": "ผัดไทยกุ้งแม่น้ำ",
        "priceRange": "60-100฿",
        "category": "local",
        "note": "ผัดไทยใส่กุ้งแม่น้ำใหญ่เป็นอาหารขึ้นชื่อจากอยุธยา"
      },
      {
        "name": "หมูกรอบสมุนไพร",
        "priceRange": "80-150฿",
        "category": "local",
        "note": "หมูกรอบทอดกรอบโรยสมุนไพรพื้นบ้านอยุธยา"
      },
      {
        "name": "ลูกหว้าเค็ม",
        "priceRange": "50-70฿",
        "category": "dessert",
        "note": "ผลไม้พื้นบ้านลูกใหญ่รสเค็ม องค์ความรู้อาหารถิ่น"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "500-800฿/คืน",
        "examples": ["Lullaby Hostel Ayutthaya", "Baan Amphawa Guesthouse"],
        "bookingUrl": "https://www.booking.com/city/th/ayutthaya.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1000-2000฿/คืน",
        "examples": ["The Holiday Inn Ayutthaya", "Classic Kameo Hotel"],
        "bookingUrl": "https://www.booking.com/city/th/ayutthaya.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "3000-5000฿/คืน",
        "examples": ["Sala Ayutthaya", "Krungsri River Resort"],
        "bookingUrl": "https://www.booking.com/city/th/ayutthaya.html"
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศร้อนจัด",
        "severity": "high",
        "note": "อุณหภูมิสูงในฤดูร้อน",
        "season": "เม.ย.-พ.ค."
      },
      {
        "label": "PM2.5",
        "severity": "medium",
        "note": "ฝุ่นละอองสูงช่วงฤดูหนาว",
        "season": "ธ.ค.-ก.พ."
      },
      {
        "label": "งูพิษ",
        "severity": "medium",
        "note": "พบงูพิษตามทุ่งนารอบเมือง, ควรระวังขณะเดินป่า",
        "season": null
      }
    ],
    "ecoIds": [
      "f_monkey",
      "f_cobra",
      "c_heat_stroke"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 24-35°C, ฝนมาก ก.ค.-ต.ค.",
      "terrain": "ที่ราบลุ่มแม่น้ำเจ้าพระยา สภาพทุ่งนาและโบราณสถาน",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": [{"label": "โรงพยาบาลพระนครศรีอยุธยา", "number": "035-241-890"}]
    }
  },
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
        "via": ["นครปฐม", "นนทบุรี"],
        "departureTimes": ["07:00", "13:00", "19:00"],
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
        "via": ["นครปฐม"],
        "departureTimes": ["18:00"],
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
        "examples": ["Town Square Nakhon Pathom", "Smile House Nakhon Pathom"],
        "bookingUrl": "https://www.booking.com/city/th/nakhon-pathom.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["Golden Landmark Hotel", "Xen Hotel Nakhon Pathom"],
        "bookingUrl": "https://www.booking.com/city/th/nakhon-pathom.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-3000฿/คืน",
        "examples": ["The Camp Nakhon Pathom", "Maranatha"],
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
      "emergencyContacts": [{"label": "โรงพยาบาลกรุงเทพราชธานี", "number": "034-111-538"}]
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
        "via": ["พระราม 2", "ถนนเศรษฐกิจ"],
        "departureTimes": ["06:00", "08:00", "10:00", "12:00", "14:00"],
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
        "via": ["สมุทรสงคราม"],
        "departureTimes": ["15:00"],
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
        "examples": ["SYN Hotel Samut Sakhon", "The Winter Samut Sakhon"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "900-1500฿/คืน",
        "examples": ["Nantra Suvarnabhumi", "Blue Hippo"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["Wanghaus Sathorn"], 
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
      "emergencyContacts": [{"label": "โรงพยาบาลสมุทรสาคร", "number": "034-411-681"}]
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
        "via": ["เพชรเกษม"],
        "departureTimes": ["06:30", "08:30", "10:30"],
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
        "via": ["สมุทรสงคราม"],
        "departureTimes": ["08:30"],
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
        "examples": ["Rangsri Riad Resort", "Wangnamkeaw Resort"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1000-2000฿/คืน",
        "examples": ["Songkhla Inn", "The Blue Sky Resort"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-3000฿/คืน",
        "examples": ["Sala Ayutthaya (ใกล้เคียง)", "Banthaiburi Boutique"],
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
      "emergencyContacts": [{"label": "โรงพยาบาลดำเนินสะดวก", "number": "034-771-041"}]
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
        "via": ["นครปฐม"],
        "departureTimes": ["07:00"],
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
        "via": ["ถนนบรมราชชนนี"],
        "departureTimes": ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00"],
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
        "examples": ["River Terrace Resort", "Suphan Palace Hotel"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["Amari Watergate (Nonthaburi)", "Suphan Buri River View"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-2500฿/คืน",
        "examples": ["Buppha ขอนแก่น"], 
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
      "emergencyContacts": [{"label": "โรงพยาบาลสุพรรณบุรี", "number": "035-511-010"}]
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
        "via": ["อยุธยา"],
        "departureTimes": ["07:00", "09:00", "11:00"],
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
        "via": ["พระนครศรีอยุธยา"],
        "departureTimes": ["06:30", "10:30", "14:30"],
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
        "examples": ["Sing Buri Guest House", "BBH Hotel Singburi"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["Singburi Hotel", "The Campers Singburi"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-2500฿/คืน",
        "examples": ["Phatanakorn Hotel"], 
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
      "emergencyContacts": [{"label": "โรงพยาบาลสิงห์บุรี", "number": "036-511-325"}]
    }
  },
  "Ang Thong": {
    "transport": [
      {
        "name": "รถประจำทางสาย 324",
        "shortName": "รถเมล์ 324",
        "type": "bus",
        "description": "รถเมล์ ขสมก. สาย 324 (หมอชิต-อ่างทอง) เชื่อมกรุงเทพฯ กับอ่างทอง",
        "warpUrl": "https://www.bmta.co.th",
        "logoText": "🚌",
        "color": "#00802A"
      },
      {
        "name": "รถตู้ กรุงเทพฯ - อ่างทอง",
        "shortName": "รถตู้",
        "type": "van",
        "description": "รถตู้โดยสารเดินทางจากหมอชิต 2 ถึงตัวเมืองอ่างทอง",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#FF5500"
      },
      {
        "name": "สองแถว อ่างทอง",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "สองแถวรับจ้างในอำเภออ่างทอง ใช้โดยนักเดินทางและท้องถิ่น",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#FFAA00"
      }
    ],
    "routes": [
      {
        "name": "รถไฟ กรุงเทพฯ - สิงห์บุรี (ผ่านอ่างทอง)",
        "type": "train",
        "operator": "SRT",
        "from": "กรุงเทพฯ (หัวลำโพง)",
        "to": "สิงห์บุรี",
        "via": ["อ่างทอง"],
        "departureTimes": ["15:00"],
        "duration": "1.5 ชม.",
        "baseFare": 60,
        "frequency": "รายวัน",
        "terminal": "หัวลำโพง",
        "notes": null
      },
      {
        "name": "รถทัวร์ กรุงเทพฯ - อ่างทอง",
        "type": "coach",
        "operator": "Transport Co., Ltd.",
        "from": "หมอชิต 2",
        "to": "อ่างทอง",
        "via": ["ปทุมธานี"],
        "departureTimes": ["07:00", "13:00"],
        "duration": "1 ชม.",
        "baseFare": 40,
        "frequency": "ทุก 6 ชม.",
        "terminal": "หมอชิต 2",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "ส้มตำลาวโบราณ",
        "priceRange": "30-50฿",
        "category": "local",
        "note": "ส้มตำสูตรบ้านแพ้วแบบโบราณใส่ปูดอง"
      },
      {
        "name": "ทอดมันปลา",
        "priceRange": "40-60฿",
        "category": "street",
        "note": "ทอดมันเนื้อปลาช่อนสด ทอดกรอบนอกนุ่มใน"
      },
      {
        "name": "ขนมกล้วยทอด",
        "priceRange": "20-30฿",
        "category": "dessert",
        "note": "กล้วยน้ำว้าสุกคลุกแป้งทอดกรอบหวาน"
      },
      {
        "name": "แกงคั่วหน่อไม้",
        "priceRange": "50-80฿",
        "category": "local",
        "note": "แกงคั่วใส่หน่อไม้ใส่กะทิเข้มข้น"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "300-600฿/คืน",
        "examples": ["My Ban Thung", "Lone Pine Resort"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "700-1200฿/คืน",
        "examples": ["Baan Khunprom Boutique", "Lock 33"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-2000฿/คืน",
        "examples": ["Nong Tavee Resort"], 
        "bookingUrl": ""
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศร้อน",
        "severity": "high",
        "note": "ฤดูร้อนร้อนจัดควรระวังโรคลมแดด",
        "season": "เม.ย.-พ.ค."
      },
      {
        "label": "ฝุ่น PM2.5",
        "severity": "medium",
        "note": "มีฝุ่นละอองสูงบางวันช่วงฤดูหนาว",
        "season": "ธ.ค.-ก.พ."
      }
    ],
    "ecoIds": [
      "c_heat_stroke",
      "c_pm25"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 23-33°C, ฝนตกชุก ก.ค.-ก.ย.",
      "terrain": "ที่ราบลุ่มกว้างขวาง แบ่งโดยคลองภาษีเจริญ",
      "bestSeason": "พ.ย.-ม.ค.",
      "emergencyContacts": [{"label": "โรงพยาบาลอ่างทอง", "number": "035-611-555"}]
    }
  },
  "Lop Buri": {
    "transport": [
      {
        "name": "รถไฟ (สถานีลพบุรี)",
        "shortName": "รถไฟ",
        "type": "rail",
        "description": "สถานีรถไฟลพบุรี เชื่อมกรุงเทพฯ กับภาคเหนือและอีสาน",
        "warpUrl": "",
        "logoText": "🚆",
        "color": "#880088"
      },
      {
        "name": "รถโดยสารประจำทางสาย 30",
        "shortName": "รถเมล์ 30",
        "type": "bus",
        "description": "รถเมล์ ขสมก. สาย 30 (หมอชิต-ลพบุรี) วิ่งจากกรุงเทพฯ ถึงลพบุรี",
        "warpUrl": "https://www.bmta.co.th",
        "logoText": "🚌",
        "color": "#00AAFF"
      },
      {
        "name": "สองแถว ลพบุรี",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "สองแถวรับจ้างในตัวเมืองลพบุรี ให้บริการเดินทางรอบเมือง",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#FF6600"
      }
    ],
    "routes": [
      {
        "name": "รถตู้ กรุงเทพฯ - ลพบุรี",
        "type": "van",
        "operator": "Van Center",
        "from": "หมอชิต 2",
        "to": "ลพบุรี",
        "via": ["อยุธยา"],
        "departureTimes": ["06:00", "08:00", "10:00"],
        "duration": "2 ชม.",
        "baseFare": 80,
        "frequency": "ทุก 2 ชม.",
        "terminal": "หมอชิต 2",
        "notes": null
      },
      {
        "name": "รถไฟ กทม.-ลพบุรี (สายเหนือ)",
        "type": "train",
        "operator": "SRT",
        "from": "กรุงเทพฯ",
        "to": "ลพบุรี",
        "via": ["ปทุมธานี", "อยุธยา"],
        "departureTimes": ["13:00"],
        "duration": "2 ชม.",
        "baseFare": 90,
        "frequency": "รายวัน",
        "terminal": "หัวลำโพง",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "ข้าวหมกไก่",
        "priceRange": "50-80฿",
        "category": "street",
        "note": "ข้าวหมกไก่สูตรปากีสถาน มีต้นตำรับที่ลพบุรี"
      },
      {
        "name": "กล้วยทอดน้ำว้า",
        "priceRange": "20-30฿",
        "category": "dessert",
        "note": "กล้วยน้ำว้าสุกทอดกรอบ โรยงาขาว หวานพอดี"
      },
      {
        "name": "โรตี ลพบุรี",
        "priceRange": "20-40฿",
        "category": "street",
        "note": "แป้งโรตีทอดกรอบนอกนุ่มใน ทานคู่แกงแกะรสเข้ม"
      },
      {
        "name": "ลาบเนื้อ",
        "priceRange": "60-100฿",
        "category": "local",
        "note": "อาหารลาว-อีสานรสเผ็ดจัดของจังหวัดลพบุรี"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "400-800฿/คืน",
        "examples": ["Lop Buri Guest House", "Muen Mai Resort"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1000-1500฿/คืน",
        "examples": ["The Liliburi Hotel", "Golden Place Lopburi"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-3000฿/คืน",
        "examples": ["Lopburi Inn & Heritage Hotel"], 
        "bookingUrl": ""
      }
    ],
    "dangerZones": [
      {
        "label": "ลิง",
        "severity": "medium",
        "note": "มีลิงแสมจำนวนมาก บริเวณพระนารายณ์ราชนิเวศน์ ควรระวังการเหยียบ",
        "season": null
      },
      {
        "label": "ฝุ่นละออง PM2.5",
        "severity": "medium",
        "note": "ฝุ่นสูงในฤดูหนาว",
        "season": "ธ.ค.-ม.ค."
      },
      {
        "label": "อากาศร้อนจัด",
        "severity": "high",
        "note": "อุณหภูมิสูงในฤดูร้อน",
        "season": "เม.ย.-พ.ค."
      }
    ],
    "ecoIds": [
      "f_monkey",
      "c_heat_stroke"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 24-34°C, ฝนมาก ก.ค.-ต.ค.",
      "terrain": "พื้นที่ราบลุ่มกว้าง มีโบราณสถานและภูเขาล้อมรอบ",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": [{"label": "โรงพยาบาลลพบุรี", "number": "036-770-512"}]
    }
  },
  "Saraburi": {
    "transport": [
      {
        "name": "รถไฟ (สถานีสระบุรี)",
        "shortName": "รถไฟ",
        "type": "rail",
        "description": "สถานีรถไฟสระบุรี บนเส้นทางสายเหนือ เชื่อมกรุงเทพฯกับภาคเหนือ",
        "warpUrl": "",
        "logoText": "🚆",
        "color": "#008833"
      },
      {
        "name": "รถโดยสารประจำทางสาย 12",
        "shortName": "รถเมล์ 12",
        "type": "bus",
        "description": "รถเมล์ ขสมก. สาย 12 (จตุจักร-สระบุรี) เชื่อม กรุงเทพฯ-สระบุรี",
        "warpUrl": "https://www.bmta.co.th",
        "logoText": "🚌",
        "color": "#FFAA00"
      },
      {
        "name": "รถตู้ กรุงเทพฯ - สระบุรี",
        "shortName": "รถตู้",
        "type": "van",
        "description": "รถตู้บริการวิ่งจากหมอชิต กรุงเทพฯ ไปยังตัวเมืองสระบุรี",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#CC0000"
      }
    ],
    "routes": [
      {
        "name": "รถไฟ กรุงเทพฯ - อุดรธานี (ผ่านสระบุรี)",
        "type": "train",
        "operator": "SRT",
        "from": "กรุงเทพฯ (หัวลำโพง)",
        "to": "อุดรธานี",
        "via": ["สระบุรี"],
        "departureTimes": ["18:00"],
        "duration": "3 ชม.",
        "baseFare": 100,
        "frequency": "รายวัน",
        "terminal": "หัวลำโพง",
        "notes": null
      },
      {
        "name": "รถทัวร์ กรุงเทพฯ - สระบุรี",
        "type": "coach",
        "operator": "Transport Co., Ltd.",
        "from": "หมอชิต 2",
        "to": "สระบุรี",
        "via": ["ปทุมธานี"],
        "departureTimes": ["08:00", "14:00"],
        "duration": "1 ชม.",
        "baseFare": 50,
        "frequency": "ทุก 6 ชม.",
        "terminal": "หมอชิต 2",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "แกงคั่วหน่อไม้",
        "priceRange": "50-80฿",
        "category": "local",
        "note": "แกงคั่วใส่หน่อไม้และสมุนไพรพื้นบ้าน สูตรชาวสระบุรี"
      },
      {
        "name": "หมูสะเต๊ะ",
        "priceRange": "50-80฿",
        "category": "street",
        "note": "หมูสะเต๊ะสูตรดั้งเดิม เสิร์ฟคู่ผสมถั่วและแครอท"
      },
      {
        "name": "แกงอ่อมเนื้อ",
        "priceRange": "60-100฿",
        "category": "local",
        "note": "แกงอ่อมใส่สมุนไพรและเนื้อวัว รสเปรี้ยวเผ็ดกลมกล่อม"
      },
      {
        "name": "ขนมดอกลำเจียก",
        "priceRange": "20-30฿",
        "category": "dessert",
        "note": "ขนมไทยพื้นบ้าน ในนครสวรรค์ แต่มีขายทั่วไปในสระบุรี"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "400-900฿/คืน",
        "examples": ["Ease Hotel", "Golden City Inn"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1000-2000฿/คืน",
        "examples": ["The Best Residence", "Saraburi River View"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2500-4000฿/คืน",
        "examples": ["Sky View Hotel"], 
        "bookingUrl": ""
      }
    ],
    "dangerZones": [
      {
        "label": "หมอกควัน (PM2.5)",
        "severity": "medium",
        "note": "ค่าฝุ่นละอองสูงในฤดูหนาว",
        "season": "ธ.ค.-ม.ค."
      },
      {
        "label": "อากาศร้อน",
        "severity": "high",
        "note": "อุณหภูมิสูงในฤดูร้อน",
        "season": "มี.ค.-พ.ค."
      }
    ],
    "ecoIds": [
      "fl_mushroom_poison",
      "c_pm25"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 23-33°C, ฝนตกชุก ก.ค.-ต.ค.",
      "terrain": "ที่ราบกลางภูเขาตะวันออก มีเขาหินปูนและแม่น้ำป่าสัก",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": [{"label": "โรงพยาบาลสระบุรี", "number": "036-211-265"}]
    }
  },
  "Chai Nat": {
    "transport": [
      {
        "name": "รถโดยสารประจำทาง สาย 84",
        "shortName": "รถเมล์ 84",
        "type": "bus",
        "description": "รถเมล์ ขสมก. สาย 84 (สายใต้ใหม่-ชัยนาท) เชื่อมกรุงเทพฯ กับชัยนาท",
        "warpUrl": "https://www.transport.co.th",
        "logoText": "🚌",
        "color": "#996600"
      },
      {
        "name": "สองแถว ชัยนาท",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "สองแถวรับจ้างในตัวเมืองชัยนาท บริการวิ่งเส้นทางสั้นในชุมชน",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#FFCC00"
      }
    ],
    "routes": [
      {
        "name": "รถตู้ กรุงเทพฯ - ชัยนาท",
        "type": "van",
        "operator": "Van Center",
        "from": "หมอชิต 2",
        "to": "ชัยนาท",
        "via": ["อยุธยา"],
        "departureTimes": ["07:00", "09:00", "11:00"],
        "duration": "2 ชม.",
        "baseFare": 80,
        "frequency": "ทุก 2 ชม.",
        "terminal": "หมอชิต 2",
        "notes": null
      },
      {
        "name": "รถทัวร์ กรุงเทพฯ - ชัยนาท",
        "type": "coach",
        "operator": "Transport Co., Ltd.",
        "from": "หมอชิต 2",
        "to": "ชัยนาท",
        "via": ["ปทุมธานี"],
        "departureTimes": ["08:00", "14:00"],
        "duration": "1.5 ชม.",
        "baseFare": 60,
        "frequency": "ทุก 6 ชม.",
        "terminal": "หมอชิต 2",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "ข้าวส้ม",
        "priceRange": "20-40฿",
        "category": "local",
        "note": "ข้าวต้มมัดใบตองมีไส้ถั่วดำ เคี่ยวจนเนื้อหนืด"
      },
      {
        "name": "หลามญวน",
        "priceRange": "30-60฿",
        "category": "dessert",
        "note": "หลามข้าวเหนียวบดผสมถั่ว ทอด้วยใบตองย่างไฟ"
      },
      {
        "name": "แกงป่าปลาแม่น้ำ",
        "priceRange": "80-120฿",
        "category": "local",
        "note": "แกงป่าสูตรโบราณใส่ปลาน้ำจืดท้องถิ่นรสจัด"
      },
      {
        "name": "หมูกรอบ",
        "priceRange": "60-100฿",
        "category": "street",
        "note": "หมูกรอบเนื้อชิ้นโต ทอดกรอบนอกนุ่มใน"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "300-600฿/คืน",
        "examples": ["HoT Hostel Chain"], 
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "700-1500฿/คืน",
        "examples": ["Baan Khunprom Chaipat"], 
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-3000฿/คืน",
        "examples": ["Chalida Boutique Resort"], 
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
        "label": "น้ำท่วม",
        "severity": "medium",
        "note": "พื้นที่ลุ่มริมแม่น้ำเจ้าพระยามีน้ำท่วมขังได้ในฤดูฝน",
        "season": "ก.ย.-ต.ค."
      }
    ],
    "ecoIds": [
      "c_heat_stroke",
      "c_flash_flood"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 24-33°C, ฝนตกชุก ก.ค.-ก.ย.",
      "terrain": "ที่ราบลุ่มแม่น้ำเจ้าพระยา",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": [{"label": "โรงพยาบาลชัยนาทนเรนทร", "number": "056-613-222"}]
    }
  },
  "Nakhon Nayok": {
    "transport": [
      {
        "name": "รถโดยสารประจำทางสาย 373",
        "shortName": "รถเมล์ 373",
        "type": "bus",
        "description": "รถเมล์ ขสมก. สาย 373 (มินิบัส กรุงเทพฯ-นครนายก) ให้บริการจากหมอชิตถึงตัวเมืองนครนายก",
        "warpUrl": "https://www.transport.co.th",
        "logoText": "🚌",
        "color": "#AA5500"
      },
      {
        "name": "รถตู้ หมอชิต - นครนายก",
        "shortName": "รถตู้",
        "type": "van",
        "description": "รถตู้โดยสารเดินทางจากหมอชิต กรุงเทพฯ ไปยังตัวเมืองนครนายก",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#0099CC"
      },
      {
        "name": "สองแถว นครนายก",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "สองแถวรับจ้างบริการในตัวเมืองนครนายก เชื่อมโยงสถานที่สำคัญ",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#FF6600"
      }
    ],
    "routes": [
      {
        "name": "รถไฟ กรุงเทพฯ - นครราชสีมา (ผ่านนครนายก)",
        "type": "train",
        "operator": "SRT",
        "from": "กรุงเทพฯ",
        "to": "นครราชสีมา",
        "via": ["นครนายก", "ปราจีนบุรี"],
        "departureTimes": ["12:30"],
        "duration": "3 ชม.",
        "baseFare": 100,
        "frequency": "รายวัน",
        "terminal": "หัวลำโพง",
        "notes": null
      },
      {
        "name": "รถทัวร์ กรุงเทพฯ - นครนายก",
        "type": "coach",
        "operator": "Transport Co., Ltd.",
        "from": "หมอชิต 2",
        "to": "นครนายก",
        "via": ["นครปฐม"],
        "departureTimes": ["07:30", "09:30", "11:30"],
        "duration": "1.5 ชม.",
        "baseFare": 70,
        "frequency": "ทุก 2 ชม.",
        "terminal": "หมอชิต 2",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "กะเพราปลาเนื้ออ่อน",
        "priceRange": "60-100฿",
        "category": "local",
        "note": "ปลาหมอเนื้ออ่อนผัดใบกะเพราราดข้าวรสจัดจ้าน"
      },
      {
        "name": "แกงเลียงผักหวาน",
        "priceRange": "40-80฿",
        "category": "local",
        "note": "แกงเลียงใส่ผักหวานป่าและกุ้งสด"
      },
      {
        "name": "หมูย่างนครนายก",
        "priceRange": "50-90฿",
        "category": "street",
        "note": "หมูย่างเนื้อนุ่มหมักเครื่องเทศสูตรพื้นบ้าน"
      },
      {
        "name": "ขนมกล้วยทอด",
        "priceRange": "15-30฿",
        "category": "dessert",
        "note": "กล้วยน้ำว้าสุกทอดกรอบ หวานธรรมชาติ"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "400-800฿/คืน",
        "examples": ["Club One Hotel Nakhon Nayok", "Cher Resort"],
        "bookingUrl": ""
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1000-2000฿/คืน",
        "examples": ["The Than Resort", "Tulus Hill Nakhon Nayok"],
        "bookingUrl": ""
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2000-4000฿/คืน",
        "examples": ["Veranda Mountain Village"], 
        "bookingUrl": ""
      }
    ],
    "dangerZones": [
      {
        "label": "น้ำป่าไหลหลาก",
        "severity": "high",
        "note": "พื้นที่น้ำตกและภูเขาสูงเสี่ยงเกิดน้ำป่า",
        "season": "ก.ค.-ก.ย."
      },
      {
        "label": "อากาศร้อน",
        "severity": "high",
        "note": "อุณหภูมิสูงในฤดูร้อน",
        "season": "เม.ย.-พ.ค."
      }
    ],
    "ecoIds": [
      "t_mountain",
      "c_flash_flood"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 23-33°C, ฝนตกชุก ก.ค.-ต.ค.",
      "terrain": "ภูเขาและลำธาร อากาศเย็นช่วงฤดูหนาว",
      "bestSeason": "ต.ค.-ม.ค.",
      "emergencyContacts": [{"label": "โรงพยาบาลนครนายก", "number": "037-331-223"}]
    }
  }
}
```