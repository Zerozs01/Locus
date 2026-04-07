// Portal seed data: ภาคกลาง Part 1 (5 จังหวัด)
// Source: documents/deepreserach/part1_ภาคกลาง.md
import type { ProvincePortalSeedData } from './db';

export const centralPart1: Record<string, ProvincePortalSeedData> = {
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
      "via": [
        "ดินแดง",
        "สีลม"
      ],
      "departureTimes": [
        "07:00",
        "08:00",
        "09:00"
      ],
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
      "via": [
        "สุขุมวิท",
        "สมุทรปราการ"
      ],
      "departureTimes": [
        "06:00",
        "09:00",
        "12:00"
      ],
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
      "via": [
        "สีลม",
        "จตุจักร"
      ],
      "departureTimes": [
        "06:00",
        "06:15",
        "06:30"
      ],
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
      "examples": [
        "Smart Suites Sukhumvit",
        "Lub d Bangkok Siam"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-2000฿/คืน",
      "examples": [
        "Novotel Bangkok on Siam Square",
        "Ibis Bangkok Riverside"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "3000-6000฿/คืน",
      "examples": [
        "Mandarin Oriental Bangkok",
        "The Peninsula Bangkok"
      ],
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
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลตำรวจ",
        "number": "02-141-2545"
      }
    ]
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
      "via": [
        "หลักสี่",
        "ปทุมธานี"
      ],
      "departureTimes": [
        "06:00",
        "07:00",
        "08:00"
      ],
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
      "via": [
        "ตลิ่งชัน",
        "บางใหญ่"
      ],
      "departureTimes": [
        "07:30",
        "12:30",
        "17:30"
      ],
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
      "via": [
        "ดินแดง",
        "งามวงศ์วาน"
      ],
      "departureTimes": [
        "06:30",
        "07:30",
        "08:30"
      ],
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
      "examples": [
        "ไวท์อินน์ (Whiteinn)",
        "ทาวน์สแควร์ รัตนาธิเบศร์"
      ],
      "bookingUrl": "https://www.agoda.com/city/nonthaburi-th.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1000-2000฿/คืน",
      "examples": [
        "เดอะ ทรี อินน์ เมืองทองธานี",
        "ไอบิส กรุงเทพฯ อิมแพ็ค"
      ],
      "bookingUrl": "https://www.agoda.com/city/nonthaburi-th.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-4000฿/คืน",
      "examples": [
        "โนโวเทล กรุงเทพฯ อิมแพ็ค",
        "ริเวอร์ไรน์ เพลซ โฮเทล แอนด์ เรสซิเดนซ์"
      ],
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
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลพระนั่งเกล้า",
        "number": "02-920-4444"
      }
    ]
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
      "via": [
        "อ่างทอง",
        "ลพบุรี"
      ],
      "departureTimes": [
        "18:00",
        "22:00"
      ],
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
      "via": [
        "ปทุมธานี"
      ],
      "departureTimes": [
        "22:00"
      ],
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
      "examples": [
        "Town Square Rangsit",
        "My Sweet Villa"
      ],
      "bookingUrl": "https://www.booking.com/city/th/pathum-thani.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "900-1500฿/คืน",
      "examples": [
        "The One Hotel Rangsit",
        "Bangkok Boutique Resort Rangsit"
      ],
      "bookingUrl": "https://www.booking.com/city/th/pathum-thani.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1500-2500฿/คืน",
      "examples": [
        "Bangkok Boutique Resort Rangsit",
        "Baan Bangkok 97 Hotel"
      ],
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
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลปทุมธานี",
        "number": "02-528-2555"
      }
    ]
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
      "via": [
        "ลำลูกกา",
        "บางพลี"
      ],
      "departureTimes": [
        "05:30",
        "07:00",
        "09:00",
        "11:00",
        "13:00",
        "15:00",
        "17:00"
      ],
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
      "via": [
        "สมุทรปราการ"
      ],
      "departureTimes": [
        "18:10"
      ],
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
      "examples": [
        "Blue Hippo Hotel",
        "Monthon Inn Resort"
      ],
      "bookingUrl": "https://www.agoda.com/city/samut-prakan-th.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1000-2000฿/คืน",
      "examples": [
        "Oriel Residence Samut Prakan",
        "The Tide Resort"
      ],
      "bookingUrl": "https://www.agoda.com/city/samut-prakan-th.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2500-4000฿/คืน",
      "examples": [
        "Hilton Bangkok Suvarnabhumi Golf Resort",
        "Woodville Hotel & Residence"
      ],
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
      "tags": [
        "common",
        "edible"
      ],
      "desc": "หอยนางรมทะเลหอยทากอาศัยอยู่ในทะเลอ่าวไทยบริเวณสมุทรปราการ นิยมเก็บไว้ประกอบอาหารทะเล"
    }
  ],
  "metadata": {
    "climate": "อุณหภูมิ 25-34°C, ชื้นมากบริเวณชายฝั่ง ฝนตกชุก ก.ค.-ก.ย.",
    "terrain": "ที่ราบลุ่มริมน้ำและชายฝั่งทะเลบางส่วน",
    "bestSeason": "พ.ย.-ม.ค.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลบางพลี",
        "number": "02-175-7200"
      }
    ]
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
      "via": [
        "ปทุมธานี"
      ],
      "departureTimes": [
        "06:30",
        "09:30",
        "12:30",
        "15:30",
        "18:30"
      ],
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
      "via": [
        "ดอนเมือง",
        "ปทุมธานี"
      ],
      "departureTimes": [
        "07:00",
        "08:00",
        "09:00"
      ],
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
      "examples": [
        "Lullaby Hostel Ayutthaya",
        "Baan Amphawa Guesthouse"
      ],
      "bookingUrl": "https://www.booking.com/city/th/ayutthaya.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1000-2000฿/คืน",
      "examples": [
        "The Holiday Inn Ayutthaya",
        "Classic Kameo Hotel"
      ],
      "bookingUrl": "https://www.booking.com/city/th/ayutthaya.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "3000-5000฿/คืน",
      "examples": [
        "Sala Ayutthaya",
        "Krungsri River Resort"
      ],
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
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลพระนครศรีอยุธยา",
        "number": "035-241-890"
      }
    ]
  }
}
};
