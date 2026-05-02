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
      "description": "ระบบขนส่งมวลชนทางรางยกระดับในกรุงเทพฯ มี 62 สถานีและความยาวรวม 70 กิโลเมตร.",
      "warpUrl": "https://www.bts.co.th",
      "logoText": "🚆",
      "color": "#0099CC"
    },
    {
      "name": "รถไฟฟ้าใต้ดิน MRT",
      "shortName": "MRT",
      "type": "rail",
      "description": "ระบบรถไฟฟ้าใต้ดินใน กทม. และปริมณฑล มี 4 สาย ให้บริการสถานีรวม 107 แห่ง.",
      "warpUrl": "https://www.bangkokmetro.co.th",
      "logoText": "🚇",
      "color": "#174ABB"
    },
    {
      "name": "รถไฟฟ้าเชื่อมท่าอากาศยานสุวรรณภูมิ",
      "shortName": "ARL",
      "type": "rail",
      "description": "รถไฟฟ้าชานเมืองเชื่อมสนามบินสุวรรณภูมิกับกรุงเทพฯ ผ่านสถานีพญาไทและมักกะสัน.",
      "warpUrl": "",
      "logoText": "✈️",
      "color": "#00AAE4"
    },
    {
      "name": "เรือโดยสารเจ้าพระยา",
      "shortName": "เรือด่วน",
      "type": "boat",
      "description": "ให้บริการเรือด่วนเจ้าพระยาผ่านท่าเรือต่างๆ ในกรุงเทพฯ และปริมณฑลโดยเชื่อมต่อถึงเกาะเกร็ด (นนทบุรี).",
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
    "fl_mangrove",
    "f_monitor_lizard",
    "f_dog_stray",
    "t_urban_dense",
    "c_pm25",
    "c_urban_heat",
    "h_urban_flood",
    "h_heat_stress"
  ],
  "newEcoEntities": [
    { id: "fl_mangrove", name: "ป่าชายเลนบางขุนเทียน", category: "flora", tags: ["common","rare"], desc: "พืชป่าชายเลนพบที่แนวชายฝั่งบางขุนเทียน ช่วยลดการกัดเซาะและเป็นที่อยู่อาศัยของสัตว์น้ำวัยอ่อน" },
    { id: "f_monitor_lizard", name: "เหี้ยหรือตัวเงินตัวทอง", category: "fauna", tags: ["common","danger"], desc: "พบได้ตามสวนใหญ่และคลองในเมือง มักหลบคนแต่ควรเว้นระยะเพราะอาจกัดเมื่อถูกรบกวน" },
    { id: "f_dog_stray", name: "สุนัขจรจัด", category: "fauna", tags: ["common","danger"], desc: "พบทั่วเขตเมือง โดยเฉพาะใกล้ตลาดและชุมชน ควรหลีกเลี่ยงการเข้าใกล้ฝูงโดยเฉพาะเวลากลางคืน" },
    { id: "t_urban_dense", name: "เขตเมืองหนาแน่น", category: "terrain", tags: ["common"], desc: "กรุงเทพฯ มีสภาพเป็นเมืองหนาแน่น มีถนน คลอง และสิ่งปลูกสร้างต่อเนื่อง ทำให้การระบายความร้อนและน้ำทำได้ยากในบางพื้นที่" },
    { id: "c_pm25", name: "ฝุ่นละออง PM2.5", category: "climate", tags: ["danger","common","seasonal"], desc: "กรุงเทพฯ เผชิญปัญหาฝุ่น PM2.5 เป็นประจำในฤดูแล้งและช่วงอากาศปิด ควรเช็กค่าฝุ่นก่อนทำกิจกรรมกลางแจ้ง" },
    { id: "c_urban_heat", name: "เกาะความร้อนเมือง", category: "climate", tags: ["common","danger"], desc: "พื้นผิวคอนกรีตและการจราจรหนาแน่นทำให้อุณหภูมิในเมืองสูงกว่าพื้นที่รอบนอก โดยเฉพาะช่วงบ่าย" },
    { id: "h_urban_flood", name: "น้ำท่วมขังเมือง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนหนักและการระบายน้ำไม่ทันทำให้เกิดน้ำท่วมขังฉับพลันในหลายเขต ส่งผลต่อการเดินทางและสุขอนามัย" },
    { id: "h_heat_stress", name: "ความเสี่ยงลมแดดและขาดน้ำ", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "อากาศร้อนจัดในเขตเมืองเพิ่มความเสี่ยงต่อภาวะลมแดด โดยเฉพาะผู้ที่เดินทางกลางแจ้งนาน" }
  ],
  "knowledgeTips": [
      {
        "title": "ระวังฉกชิงกระเป๋าในที่คนเยอะ",
        "content": "กรุงเทพฯ เป็นเมืองใหญ่มีคนพลุกพล่าน ควรระวังกระเป๋าสะพาย ไม่ควรวางไว้ด้านหลังขณะอยู่ในที่ชุมชน",
        "type": "safety"
      },
      {
        "title": "ขึ้นแท็กซี่ต้องใช้มิเตอร์",
        "content": "กรุณาขึ้นแท็กซี่หลังจากคนขับเปิดมิเตอร์แล้วทุกครั้ง เพื่อหลีกเลี่ยงการเรียกเก็บค่าโดยสารเกินจริง",
        "type": "safety"
      },
      {
        "title": "หลีกเลี่ยงชั่วโมงเร่งด่วน",
        "content": "ถ้าเป็นไปได้ ควรหลีกเลี่ยงการขับรถในกรุงเทพฯ ช่วงเช้า 7-9 น. และช่วงเย็น 16-19 น. ซึ่งถนนจะมีรถติดหนาแน่น",
        "type": "route"
      },
      {
        "title": "เดินทางสะดวกด้วย BTS/MRT/เรือ",
        "content": "กรุงเทพฯ มีระบบขนส่งสาธารณะครอบคลุม ทั้งรถไฟฟ้า BTS, รถไฟใต้ดิน MRT และเรือด่วนเจ้าพระยา ทำให้การเดินทางไปยังสถานที่ท่องเที่ยวสำคัญเป็นไปอย่างง่ายดาย",
        "type": "route"
      },
      {
        "title": "เข้าชมสถานที่ฟรีได้หลายแห่ง",
        "content": "กรุงเทพฯ มีสถานที่ท่องเที่ยวหลายแห่งเข้าชมฟรี เช่น สวนสาธารณะและพิพิธภัณฑ์ ทำให้เดินทางได้ประหยัดมากขึ้น",
        "type": "budget"
      },
      {
        "title": "แต่งกายสุภาพเมื่อเข้าวัด",
        "content": "เมื่อไปเยี่ยมชมวัดหรือวังในกรุงเทพฯ ควรแต่งกายสุภาพ ปกปิดไหล่และเข่า เพื่อแสดงความเคารพสถานที่ศักดิ์สิทธิ์",
        "type": "culture"
      },
      {
        "title": "ลองชิมสตรีทฟู้ดย่านดัง",
        "content": "ห้ามพลาดลิ้มรสอาหารสตรีทฟู้ดชื่อดัง เช่น ผัดไทยเยาวราช ข้าวมันไก่ประตูน้ำ หรือก๋วยเตี๋ยวเรือสามย่าน ที่มีรสเด็ด",
        "type": "food"
      },
      {
        "title": "ล่องเรือชมรอบพระปรางค์",
        "content": "การเดินทางด้วยเรือข้ามฟากบริเวณแม่น้ำเจ้าพระยาเป็นวิธีที่สะดวกและได้บรรยากาศ เพียงราคาตั๋วเดียว ก็ถึงสถานที่สำคัญเช่นพระบรมมหาราชวังและวัดอรุณ",
        "type": "route"
      }
    ],
  "supplyPoints": [
      {
        "type": "bank",
        "label": "Bangkok Bank สาขา BTS สยาม",
        "area": "สยาม",
        "note": "ATM 24 ชม.",
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "gas",
        "label": "PTT (ถนนพระราม 4)",
        "area": "ถนนพระราม 4",
        "note": "บางสาขามี EV Charger",
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "toilet",
        "label": "ห้องน้ำสาธารณะ",
        "area": "สวนลุมพินี, สวนรถไฟ",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "pharmacy",
        "label": "Boots",
        "area": "CentralWorld, สยาม",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "clinic",
        "label": "โรงพยาบาล BNH",
        "area": "ถนนสาทร",
        "note": "โรงพยาบาลเอกชน (24 ชม.)",
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "police",
        "label": "สถานีตำรวจท่องเที่ยวสนามหลวง",
        "area": "สนามหลวง",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "ev_charger",
        "label": "สถานีอัดประจุไฟฟ้า PTT",
        "area": "ปั๊ม PTT ถ.สุขุมวิท",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      }
    ],
  "plannerHints": {
      "commonOrigins": [
        "สนามบินสุวรรณภูมิ (BKK)",
        "สนามบินดอนเมือง (DMK)",
        "สถานีรถไฟหัวลำโพง",
        "สถานีขนส่งหมอชิต",
        "BTS สยาม",
        "BTS อโศก"
      ],
      "commonDestinations": [
        "พระบรมมหาราชวัง",
        "วัดอรุณราชวราราม",
        "สยามพารากอน",
        "MBK Center",
        "เอเชียทีค เดอะ ริเวอร์ฟร้อนท์",
        "ตลาดนัดจตุจักร",
        "ไอคอนสยาม",
        "วัดพระแก้ว"
      ],
      "transitHubs": [
        "สุวรรณภูมิ (BKK)",
        "ดอนเมือง (DMK)",
        "หัวลำโพง",
        "หมอชิต",
        "บางซื่อ (สถานีกลางบางซื่อ)",
        "อโศก (BTS/MRT)"
      ],
      "routeNotes": [
        "หลีกเลี่ยงการขับรถส่วนตัวในช่วงเช้า-เย็น เพราะกรุงเทพฯ มักรถติดมาก",
        "เดินทางสะดวกด้วย BTS/MRT แทนการขับรถติด",
        "ใช้เรือข้ามฟากตามแม่น้ำเจ้าพระยาเชื่อมต่อหลายสถานที่สำคัญ",
        "ตรวจสอบฝนฟ้าก่อนออกเดินทางช่วงหน้าฝนเพื่อหลีกเลี่ยงน้ำท่วม"
      ]
    },
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
      "description": "รถไฟฟ้าสายสีม่วง เชื่อมกรุงเทพฯ (เตาปูน) - นนทบุรี (คลองบางไผ่) ระยะทาง 23 กม. มีสถานี 16 แห่ง.",
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
      "description": "เรือด่วนเจ้าพระยาธงเหลือง เส้นทางนนทบุรี-สาทร บริการวันจันทร์-ศุกร์.",
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
      "note": "ขนมจีนราดน้ำพริกเข้มข้นสูตรเมืองนนท์"
    },
    {
      "name": "ข้าวตังหน้าตั้ง",
      "priceRange": "20-40฿",
      "category": "street",
      "note": "ข้าวตังกรอบราดด้วยน้ำจิ้มหน้าตั้งสูตรเฉพาะนนทบุรี"
    },
    {
      "name": "หมูโสร่ง",
      "priceRange": "50-80฿",
      "category": "street",
      "note": "หมูสับปรุงรสชุบแป้งทอดเป็นแท่งบนไม้ เสิร์ฟพร้อมน้ำจิ้มเปรี้ยวหวาน"
    },
    {
      "name": "ทอดมันหน่อกะลา",
      "priceRange": "50-100฿",
      "category": "local",
      "note": "ทอดมันทำจากหน่อกะลาผสมน้ำพริกเครื่องแกง ทอดกรอบนอกนุ่มใน"
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
    "fl_durian",
    "f_monitor_lizard",
    "f_aedes_mosquito",
    "t_river_orchard",
    "c_humidity",
    "c_pm25",
    "h_river_flood",
    "h_dengue"
  ],
  "newEcoEntities": [
    { id: "fl_durian", name: "ทุเรียนนนท์", category: "flora", tags: ["common","rare","edible","seasonal"], desc: "สวนทุเรียนเป็นอัตลักษณ์สำคัญของนนทบุรี โดยมากอยู่ในพื้นที่ดินตะกอนริมน้ำและระบบร่องสวน" },
    { id: "f_monitor_lizard", name: "เหี้ยหรือตัวเงินตัวทอง", category: "fauna", tags: ["common","danger"], desc: "พบได้ตามพื้นที่ริมน้ำและคลองของจังหวัด มักหลบคนแต่ไม่ควรเข้าใกล้" },
    { id: "f_aedes_mosquito", name: "ยุงลาย", category: "fauna", tags: ["danger","common"], desc: "เป็นพาหะโรคไข้เลือดออก พบมากในเขตชุมชนหนาแน่นและบริเวณที่มีภาชนะน้ำขัง" },
    { id: "t_river_orchard", name: "สวนผลไม้และที่ราบริมน้ำ", category: "terrain", tags: ["common"], desc: "นนทบุรีมีภูมิประเทศแบบที่ราบลุ่มแม่น้ำและสวนร่องน้ำเก่า เหมาะกับไม้ผลโดยเฉพาะทุเรียน" },
    { id: "c_humidity", name: "อากาศชื้นลุ่มน้ำ", category: "climate", tags: ["common"], desc: "จังหวัดมีความชื้นค่อนข้างสูงจากแม่น้ำและคลองจำนวนมาก ทำให้รู้สึกร้อนอบอ้าวในฤดูฝน" },
    { id: "c_pm25", name: "ฝุ่น PM2.5 ปริมณฑล", category: "climate", tags: ["danger","common","seasonal"], desc: "พื้นที่ติดกรุงเทพฯ ทำให้รับผลกระทบฝุ่น PM2.5 คล้ายกัน โดยเฉพาะช่วงอากาศนิ่ง" },
    { id: "h_river_flood", name: "น้ำหลากและน้ำเอ่อจากลุ่มเจ้าพระยา", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "พื้นที่ริมน้ำและจุดลุ่มต่ำเสี่ยงต่อน้ำเอ่อจากแม่น้ำเจ้าพระยาและฝนหนักในฤดูน้ำหลาก" },
    { id: "h_dengue", name: "ความเสี่ยงไข้เลือดออก", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ช่วงฝนทำให้แหล่งเพาะพันธุ์ยุงเพิ่มขึ้น ควรป้องกันยุงกัดและกำจัดน้ำขัง" }
  ],
  "knowledgeTips": [
      {
        "title": "เที่ยวเกาะเกร็ดด้วยเรือ",
        "content": "ชมวิถีชุมชนเก่าแก่ที่เกาะเกร็ดโดยการใช้บริการเรือข้ามฟากจากท่าเรือวัดบางจาก-วัดเสาธงทอง (06:00-19:00 น.)",
        "type": "route"
      },
      {
        "title": "ชิมขนมไทยเกาะเกร็ด",
        "content": "เกาะเกร็ดมีชื่อเสียงเรื่องขนมไทยหลายชนิด เช่น ข้าวเม่า ขนมใส่ไส้ ควรแวะชิมระหว่างเดินชมวัดและหมู่บ้าน",
        "type": "food"
      },
      {
        "title": "วัดวาอารามร่มรื่น",
        "content": "นนทบุรีมีวัดเก่าแก่และสวยงามหลายแห่ง เช่น วัดเฉลิมพระเกียรติฯ วัดชมภูเวก และวัดชลอ บรรยากาศสงบ เหมาะกับการทำบุญไหว้พระ",
        "type": "culture"
      },
      {
        "title": "ซื้อตั๋วเรือด่วน",
        "content": "นนทบุรีมีท่าเรือด่วนเจ้าพระยาเชื่อมต่อกับกรุงเทพฯ การใช้เรือโดยสารสะดวกและหลีกเลี่ยงรถติดบนถนนได้",
        "type": "route"
      },
      {
        "title": "ระวังน้ำท่วมในฤดูฝน",
        "content": "พื้นที่ริมแม่น้ำเจ้าพระยาของนนทบุรีมักมีน้ำท่วมขังช่วงฤดูฝน ควรติดตามข่าวน้ำท่วมและหลีกเลี่ยงขับรถผ่านบริเวณที่น้ำสูง",
        "type": "season"
      }
    ],
  "supplyPoints": [
      {
        "type": "bank",
        "label": "ธนาคารกรุงไทย สาขาศาลากลาง",
        "area": "อำเภอเมืองนนทบุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "gas",
        "label": "PTT (ติวานนท์)",
        "area": "ถนนติวานนท์",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "toilet",
        "label": "ห้องน้ำสาธารณะ",
        "area": "วัดเฉลิมพระเกียรติฯ, สวนเฉลิมพระเกียรติฯ",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "pharmacy",
        "label": "ร้านขายยามอร์โปรโมชั่น",
        "area": "ตลาดนนทบุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "clinic",
        "label": "โรงพยาบาลนนทเวช",
        "area": "อำเภอเมืองนนทบุรี",
        "note": "โรงพยาบาลเอกชน",
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "police",
        "label": "สถานีตำรวจท่องเที่ยววัดเสาธงทอง",
        "area": "เกาะเกร็ด",
        "note": "ให้บริการนักท่องเที่ยว",
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "ev_charger",
        "label": "สถานีอัดประจุไฟฟ้า PTT",
        "area": "ปั๊ม PTT ถนนบางกรวย-ไทรน้อย",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      }
    ],
  "plannerHints": {
      "commonOrigins": [
        "BTS สะพานพระนั่งเกล้า",
        "MRT แยกนนทบุรี 1",
        "สถานีขนส่งนนทบุรี (ถ.แคราย)"
      ],
      "commonDestinations": [
        "เกาะเกร็ด",
        "วัดชมภูเวก",
        "ศาลากลางนนทบุรี",
        "วัดเฉลิมพระเกียรติ",
        "ตลาดท่าน้ำนนท์"
      ],
      "transitHubs": [
        "BTS สะพานพระนั่งเกล้า",
        "MRT แยกนนทบุรี 1",
        "ท่าเรือวัดชลอ"
      ],
      "routeNotes": [
        "พื้นที่ริมน้ำของนนทบุรีอาจมีน้ำท่วมในช่วงปลายฝนต้นหนาว",
        "ควรเผื่อเวลาเพื่อข้ามเรือไปเกาะเกร็ดในช่วงเย็นเลิกงาน"
      ]
    },
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
      "description": "รถไฟฟ้าชานเมืองสายสีแดง (บางซื่อ-รังสิต) ให้บริการเชื่อม กรุงเทพฯ กับรังสิต ใช้เวลา ~23 นาที.",
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
    "fl_lotus",
    "f_marble_goby",
    "f_aedes_mosquito",
    "t_alluvial_canal_plain",
    "c_humid_heat",
    "c_pm25",
    "h_flood",
    "h_dengue"
  ],
  "newEcoEntities": [
    { id: "fl_lotus", name: "บัวหลวง", category: "flora", tags: ["common","edible","medicinal"], desc: "บัวเป็นสัญลักษณ์ของปทุมธานี พบในแหล่งน้ำตื้นและพื้นที่ชุ่มน้ำหลายแห่ง" },
    { id: "f_marble_goby", name: "ปลาบู่ทราย", category: "fauna", tags: ["common","rare"], desc: "ปลาน้ำจืดที่พบในระบบคลองและบึงของภาคกลาง สะท้อนระบบนิเวศแหล่งน้ำของจังหวัด" },
    { id: "f_aedes_mosquito", name: "ยุงลาย", category: "fauna", tags: ["danger","common","seasonal"], desc: "เป็นพาหะสำคัญของโรคไข้เลือดออก พบมากในพื้นที่ชุมชนและเมืองขยายตัว" },
    { id: "t_alluvial_canal_plain", name: "ที่ราบตะกอนลุ่มเจ้าพระยาและเครือข่ายคลอง", category: "terrain", tags: ["common"], desc: "ปทุมธานีเป็นที่ราบลุ่มตะกอน มีคลองจำนวนมากรองรับนาข้าว สวน และชุมชน" },
    { id: "c_humid_heat", name: "อากาศร้อนชื้น", category: "climate", tags: ["common","danger"], desc: "อุณหภูมิสูงและความชื้นมากทำให้รู้สึกร้อนอบอ้าว โดยเฉพาะในเขตเมืองและนิคมอุตสาหกรรม" },
    { id: "c_pm25", name: "ฝุ่น PM2.5 ปริมณฑลตอนเหนือ", category: "climate", tags: ["danger","common","seasonal"], desc: "พื้นที่เมืองขยายตัวและจราจรหนาแน่นทำให้มีความเสี่ยงฝุ่น PM2.5 ในฤดูแล้ง" },
    { id: "h_flood", name: "น้ำท่วมลุ่มต่ำ", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ปทุมธานีเป็นจังหวัดเสี่ยงน้ำท่วมจากฝนหนักและการระบายน้ำของลุ่มเจ้าพระยาตอนล่าง" },
    { id: "h_dengue", name: "ความเสี่ยงโรคจากยุง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "น้ำขังในชุมชนเมืองและพื้นที่อยู่อาศัยเพิ่มความเสี่ยงโรคไข้เลือดออกและโรคจากยุง" }
  ],
  "knowledgeTips": [
      {
        "title": "ขับรถเที่ยวสะดวก",
        "content": "ปทุมธานีอยู่ใกล้กรุงเทพฯ สามารถขับรถไปเที่ยวง่ายๆ พื้นที่กว้างและมีถนนสายหลักหลายเส้น วางแผนเส้นทางให้ดีเพื่อหลีกเลี่ยงรถติด",
        "type": "route"
      },
      {
        "title": "ผจญภัยในสวนผลไม้",
        "content": "อำเภอคลอง 11 มีสวนผลไม้เชิงเกษตร สามารถลิ้มชิมผลไม้ตามฤดูกาลได้สดๆ ในราคาท้องถิ่น พร้อมดื่มด่ำบรรยากาศธรรมชาติ",
        "type": "food"
      },
      {
        "title": "กราบพระ 9 วัด",
        "content": "มีวัดดังหลายแห่งในปทุมธานี เช่น วัดเจดีย์หอย วัดพุทธาราม วัดมหาวงษ์ นิยมจัดทริปไหว้พระ 9 วัดเสริมสิริมงคล",
        "type": "culture"
      },
      {
        "title": "ฝนตกถนนบางจุดท่วม",
        "content": "ช่วงฤดูฝน (มิ.ย.-ต.ค.) ถนนบางสายในปทุมธานีอาจมีน้ำท่วมขัง ควรหลีกเลี่ยงถนนขาดหรือรันเวย์น้ำ และติดตามประกาศปทุมธานี",
        "type": "season"
      },
      {
        "title": "ช้อปปิ้งที่รังสิต",
        "content": "ฟิวเจอร์พาร์ค รังสิต และตลาดรังสิต ฟู้ดสเตชั่น เป็นจุดแวะช้อปที่ใหญ่ มีทั้งสินค้าและอาหารครบครัน ช่วยพักเหนื่อย",
        "type": "budget"
      }
    ],
  "supplyPoints": [
      {
        "type": "bank",
        "label": "ธนาคารกสิกรไทย สาขาฟิวเจอร์พาร์ค รังสิต",
        "area": "ตลาดรังสิต",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "gas",
        "label": "ปั๊มบางจาก รังสิต",
        "area": "ถนนรังสิต-นครนายก",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "toilet",
        "label": "ห้องน้ำสาธารณะ ฟิวเจอร์พาร์ค รังสิต",
        "area": "ฟิวเจอร์พาร์ค รังสิต",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "pharmacy",
        "label": "Watsons ฟิวเจอร์พาร์ค รังสิต",
        "area": "ฟิวเจอร์พาร์ค รังสิต",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "clinic",
        "label": "โรงพยาบาลปทุมเวช",
        "area": "คลองหลวง",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "police",
        "label": "สถานีตำรวจภูธรธัญบุรี",
        "area": "ถนนหทัยราษฎร์ (คลองห้า)",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      }
    ],
  "plannerHints": {
      "commonOrigins": [
        "BTS หมอชิต",
        "Future Park Rangsit",
        "สถานีขนส่งหมอชิต"
      ],
      "commonDestinations": [
        "ฟิวเจอร์พาร์ค รังสิต",
        "ดรีมเวิลด์",
        "วัดพระธรรมกาย",
        "ดงตาลสามโคก",
        "วัดเจดีย์หอย"
      ],
      "transitHubs": [
        "หมอชิต",
        "รังสิต",
        "สถานีบางพลี (รถไฟสายสีแดง)"
      ],
      "routeNotes": [
        "ทางหลวงพหลโยธินเป็นเส้นหลักไปกรุงเทพฯ",
        "ควรหลีกเลี่ยงถนนบางบัวทองในวันหยุดยาว"
      ]
    },
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
    "fl_mangrove",
    "f_migratory_gull",
    "f_mudskipper",
    "t_mudflat_mangrove",
    "c_sea_breeze",
    "c_pm25",
    "h_coastal_flood",
    "h_coastal_erosion"
  ],
  "newEcoEntities": [
    { id: "fl_mangrove", name: "โกงกางและพืชป่าชายเลน", category: "flora", tags: ["common"], desc: "แนวป่าชายเลนเป็นระบบนิเวศสำคัญของสมุทรปราการ ช่วยดักตะกอน ลดคลื่น และเป็นแหล่งอนุบาลสัตว์น้ำ" },
    { id: "f_migratory_gull", name: "นกนางนวลอพยพ", category: "fauna", tags: ["common","protected","seasonal"], desc: "บางปูเป็นจุดดูนกเด่นของจังหวัด ช่วงฤดูหนาวจะมีนกอพยพจำนวนมากใช้พื้นที่ชายฝั่งพักและหาอาหาร" },
    { id: "f_mudskipper", name: "ปลาตีน", category: "fauna", tags: ["common"], desc: "สัตว์เด่นของเขตโคลนเลน พบตามพื้นเลนและรากโกงกาง เป็นตัวชี้วัดสภาพระบบนิเวศชายฝั่ง" },
    { id: "t_mudflat_mangrove", name: "โคลนเลนและป่าชายเลนชายฝั่ง", category: "terrain", tags: ["common"], desc: "จังหวัดมีภูมิประเทศชายฝั่งอ่าวไทย มีทั้งโคลนเลน ป่าชายเลน และพื้นที่ชุ่มน้ำชายฝั่ง" },
    { id: "c_sea_breeze", name: "อากาศชื้นลมทะเล", category: "climate", tags: ["common"], desc: "พื้นที่ชายฝั่งมีลมทะเลช่วยระบายอากาศ แต่ยังคงร้อนชื้นตามแบบอ่าวไทยตอนใน" },
    { id: "c_pm25", name: "ฝุ่น PM2.5 เขตอุตสาหกรรม-ปริมณฑล", category: "climate", tags: ["danger","common","seasonal"], desc: "สมุทรปราการได้รับผลกระทบทั้งจากการจราจรและมลพิษข้ามพื้นที่ ทำให้ค่าฝุ่นสูงได้ในฤดูแล้ง" },
    { id: "h_coastal_flood", name: "น้ำทะเลหนุนและน้ำท่วมชายฝั่ง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "พื้นที่ชายฝั่งต่ำมีความเสี่ยงน้ำทะเลหนุนและน้ำท่วมร่วมกับฝนหนัก" },
    { id: "h_coastal_erosion", name: "การกัดเซาะชายฝั่ง", category: "climate", tags: ["common","danger","extreme"], desc: "คลื่น ลม และการเปลี่ยนแปลงตะกอนทำให้ชายฝั่งบางส่วนเสื่อมโทรม ต้องพึ่งแนวป่าชายเลนช่วยชะลอ" }
  ],
  "knowledgeTips": [
      {
        "title": "บางปูเย็นสบายช่วงค่ำ",
        "content": "สถานตากอากาศบางปูเหมาะกับการเดินเล่นรับลมเย็น ช่วงฤดูหนาวยังมีฝูงนกนางนวลนับพันตัวบินอพยพมาจากไซบีเรีย",
        "type": "season"
      },
      {
        "title": "ชมวิวสะพานภูมิพล",
        "content": "สะพานภูมิพลเป็นแลนด์มาร์กสำคัญ ช่วงเย็นสามารถชมแสงไฟลอดใต้สะพานได้ มุมถ่ายรูปสวยงาม",
        "type": "culture"
      },
      {
        "title": "ขับรถเที่ยวสะดวก",
        "content": "สมุทรปราการมีถนนสายหลัก เช่น พระราม 2, บางนา-ตราด สามารถขับรถสำรวจเมืองได้สะดวก มีที่จอดตามสถานที่ท่องเที่ยว",
        "type": "route"
      },
      {
        "title": "พิพิธภัณฑ์ช้างเอราวัณ",
        "content": "ห้ามพลาดพิพิธภัณฑ์ช้างเอราวัณ ซึ่งมีสถาปัตยกรรมงดงามและจัดแสดงเรื่องราวศิลปวัฒนธรรมไทย",
        "type": "culture"
      },
      {
        "title": "ชิมอาหารทะเลสด",
        "content": "คลองด่านเป็นแหล่งอาหารทะเลสด ช่วงเย็นสามารถเลือกชิมกุ้ง-ปูย่างตามร้านอาหารริมทะเลได้",
        "type": "food"
      }
    ],
  "supplyPoints": [
      {
        "type": "bank",
        "label": "ธนาคารออมสิน สาขาแม็คโคร บางพลี",
        "area": "บางพลี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "gas",
        "label": "PTT เมกะบางนา",
        "area": "บางนา",
        "note": "มี EV Charger",
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "toilet",
        "label": "ห้องน้ำสาธารณะ สวนหลวง ร.๙",
        "area": "สวนหลวง ร.๙",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "pharmacy",
        "label": "Boots Central Bangna",
        "area": "บางนา",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "clinic",
        "label": "โรงพยาบาลเมืองสมุทรปากน้ำ",
        "area": "สุขุมวิท",
        "note": "เปิด 24 ชม.",
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "police",
        "label": "สถานีตำรวจ ปากน้ำ",
        "area": "ปากน้ำ",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      }
    ],
  "plannerHints": {
      "commonOrigins": [
        "BTS อุดมสุข",
        "MRT ศรีอุดม",
        "สนามบินสุวรรณภูมิ"
      ],
      "commonDestinations": [
        "เมืองโบราณ",
        "พิพิธภัณฑ์ช้างเอราวัณ",
        "สะพานภูมิพล",
        "บางกระเจ้า",
        "ไอคอนสยาม"
      ],
      "transitHubs": [
        "สุวรรณภูมิ (BKK)",
        "ดอนเมือง (DMK)",
        "BTS สำโรง",
        "MRT บางนา"
      ],
      "routeNotes": [
        "ถนนบางนา-ตราดจะติดช่วงเช้า-เย็น",
        "ใช้เรือข้ามฟากที่วัดทรงธรรมเพื่อเชื่อมฝั่งกรุงเทพฯ-สมุทรปราการ"
      ]
    },
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
    "fl_rice",
    "f_openbill_stork",
    "f_aedes_mosquito",
    "t_floodplain_island",
    "c_monsoon_rain",
    "c_heat",
    "h_flood",
    "h_bank_erosion"
  ],
  "newEcoEntities": [
    { id: "fl_rice", name: "นาข้าวลุ่มน้ำ", category: "flora", tags: ["common","edible","seasonal"], desc: "อยุธยาเป็นพื้นที่เกษตรลุ่มน้ำสำคัญของภาคกลาง นาข้าวพบกว้างขวางในพื้นที่ราบรอบจังหวัด" },
    { id: "f_openbill_stork", name: "นกปากห่าง", category: "fauna", tags: ["common","protected"], desc: "พบหากินตามท้องนาและแหล่งน้ำตื้นของภาคกลาง โดยกินหอยและสัตว์น้ำขนาดเล็ก" },
    { id: "f_aedes_mosquito", name: "ยุงลาย", category: "fauna", tags: ["danger","common","seasonal"], desc: "น้ำขังหลังฝนและน้ำท่วมเพิ่มความเสี่ยงการระบาดของยุงพาหะในเขตชุมชน" },
    { id: "t_floodplain_island", name: "เกาะเมืองและที่ราบน้ำท่วมถึง", category: "terrain", tags: ["common"], desc: "จังหวัดตั้งอยู่ในจุดบรรจบของแม่น้ำหลายสาย จึงเป็นพื้นที่ราบน้ำท่วมถึงที่อุดมสมบูรณ์" },
    { id: "c_monsoon_rain", name: "ฝนมรสุมลุ่มเจ้าพระยา", category: "climate", tags: ["common","danger","seasonal"], desc: "ช่วงมรสุมมีฝนสะสมต่อเนื่อง ส่งผลโดยตรงต่อระดับน้ำในแม่น้ำสายหลักของจังหวัด" },
    { id: "c_heat", name: "อากาศร้อนอบอ้าว", category: "climate", tags: ["common","danger","seasonal"], desc: "พื้นที่ราบโล่งทำให้อุณหภูมิกลางวันสูงและแดดแรงในฤดูร้อน" },
    { id: "h_flood", name: "น้ำท่วมลุ่มน้ำเจ้าพระยาตอนล่าง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "อยุธยามีความเสี่ยงน้ำท่วมซ้ำซากจากการเป็นพื้นที่ต่ำและรับน้ำจากหลายลุ่มน้ำ" },
    { id: "h_bank_erosion", name: "ตลิ่งพังและน้ำกัดเซาะ", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "กระแสน้ำแรงในช่วงน้ำมากอาจทำให้ตลิ่งทรุดและกระทบพื้นที่ชุมชนริมแม่น้ำ" }
  ],
  "knowledgeTips": [
      {
        "title": "โบราณสถานชมยามบ่าย",
        "content": "อยุธยาเต็มไปด้วยวัดโบราณ เช่น วัดมหาธาตุ และวัดไชยวัฒนาราม ควรเตรียมน้ำและหมวกกันแดดสำหรับเดินเที่ยวกลางแจ้ง",
        "type": "culture"
      },
      {
        "title": "เดินทางทางน้ำชมวัด",
        "content": "นั่งเรือเที่ยวโดยรอบเกาะเมืองสามารถเชื่อมวัดหลายแห่ง เช่น วัดไชยวัฒนาราม ได้ พร้อมวิวแม่น้ำ",
        "type": "route"
      },
      {
        "title": "อาหารท้องถิ่น",
        "content": "อย่าพลาดชิมก๋วยเตี๋ยวเรือ และของหวานขึ้นชื่อของอยุธยา เช่น โรตีสายไหม",
        "type": "food"
      },
      {
        "title": "ไหว้พระก่อนเย็น",
        "content": "แนะนำไปวัดใหญ่ชัยมงคล หรือวัดพนัญเชิงช่วงเย็นเพื่อชมพระอาทิตย์ตกและบรรยากาศสงบ",
        "type": "route"
      },
      {
        "title": "ระวังมอเตอร์ไซค์",
        "content": "อยุธยามีรถจักรยานยนต์มากในเมือง ควรระวังในการข้ามถนนโดยเฉพาะในช่วงเย็น",
        "type": "safety"
      }
    ],
  "supplyPoints": [
      {
        "type": "bank",
        "label": "ธนาคารกรุงไทย สาขาอยุธยา",
        "area": "ตัวเมืองอยุธยา",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "gas",
        "label": "Shell (สนามราบ 11)",
        "area": "รอบเกาะเมือง",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "toilet",
        "label": "ห้องน้ำสาธารณะ วัดใหญ่ชัยมงคล",
        "area": "วัดใหญ่ชัยมงคล",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "pharmacy",
        "label": "ร้านขายยา ธ.ก.ส.",
        "area": "วัดไชยวัฒนาราม",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "clinic",
        "label": "โรงพยาบาลพระนครศรีอยุธยา",
        "area": "รอบเกาะเมือง",
        "note": "เปิด 24 ชม.",
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "police",
        "label": "สถานีตำรวจภูธรพระนครศรีอยุธยา",
        "area": "ใกล้วัดพระศรีสรรเพชญ์",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      }
    ],
  "plannerHints": {
      "commonOrigins": [
        "สถานีรถไฟอยุธยา",
        "ท่าเรือวัดพนัญเชิง",
        "วัดใหญ่ชัยมงคล"
      ],
      "commonDestinations": [
        "วัดพระมหาธาตุ",
        "วัดไชยวัฒนาราม",
        "วัดใหญ่ชัยมงคล",
        "ตลาดน้ำอโยธยา",
        "วัดพนัญเชิง"
      ],
      "transitHubs": [
        "สถานีขนส่งอยุธยา",
        "BTS หมอชิต (รถตู้)",
        "ท่าเรือวัดพนัญเชิง"
      ],
      "routeNotes": [
        "ถนนหน้าพระธาตุติดรถช่วงเช้า-เย็น",
        "การล่องเรือชมโบราณสถานควรตรวจสอบเวลาล่วงหน้า"
      ]
    },
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
