// Portal seed data: ภาคกลาง Part 2 (5 จังหวัด)
// Source: documents/deepreserach/part1_ภาคกลาง.md
import type { ProvincePortalSeedData } from './db';

export const centralPart2: Record<string, ProvincePortalSeedData> = {
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
      "via": [
        "นครปฐม",
        "นนทบุรี"
      ],
      "departureTimes": [
        "07:00",
        "13:00",
        "19:00"
      ],
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
      "via": [
        "นครปฐม"
      ],
      "departureTimes": [
        "18:00"
      ],
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
      "examples": [
        "Town Square Nakhon Pathom",
        "Smile House Nakhon Pathom"
      ],
      "bookingUrl": "https://www.booking.com/city/th/nakhon-pathom.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-1500฿/คืน",
      "examples": [
        "Golden Landmark Hotel",
        "Xen Hotel Nakhon Pathom"
      ],
      "bookingUrl": "https://www.booking.com/city/th/nakhon-pathom.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-3000฿/คืน",
      "examples": [
        "The Camp Nakhon Pathom",
        "Maranatha"
      ],
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
    "fl_pomelo",
    "f_fruit_bat",
    "f_aedes_mosquito",
    "t_orchard_plain",
    "c_humid_heat",
    "c_pm25",
    "h_flood",
    "h_dengue"
  ],
  "newEcoEntities": [
    { id: "fl_pomelo", name: "ส้มโอ", category: "flora", tags: ["common","edible"], desc: "นครปฐมขึ้นชื่อเรื่องส้มโอหวาน เป็นพืชเศรษฐกิจสำคัญของสวนผลไม้ในลุ่มน้ำท่าจีน" },
    { id: "f_fruit_bat", name: "ค้างคาวกินผลไม้", category: "fauna", tags: ["common","danger"], desc: "พบหากินตามสวนผลไม้และต้นไม้ใหญ่ในเวลากลางคืน ควรหลีกเลี่ยงการสัมผัสโดยตรง" },
    { id: "f_aedes_mosquito", name: "ยุงลาย", category: "fauna", tags: ["danger","common","seasonal"], desc: "พบได้ทั่วไปในชุมชนและพื้นที่สวน เป็นพาหะโรคที่ต้องระวังในฤดูฝน" },
    { id: "t_orchard_plain", name: "สวนผลไม้และที่ราบลุ่มท่าจีน", category: "terrain", tags: ["common"], desc: "จังหวัดเป็นที่ราบลุ่มเชื่อมกับแม่น้ำท่าจีน มีสวนผลไม้ คลอง และพื้นที่เกษตรหนาแน่น" },
    { id: "c_humid_heat", name: "อากาศร้อนชื้นภาคกลาง", category: "climate", tags: ["common","danger"], desc: "อากาศร้อนและชื้น ทำให้กลางวันร้อนจัดโดยเฉพาะพื้นที่โล่งและชุมชนเมือง" },
    { id: "c_pm25", name: "ฝุ่น PM2.5 ภาคกลางตอนล่าง", category: "climate", tags: ["danger","common","seasonal"], desc: "ฝุ่น PM2.5 อาจสูงในฤดูแล้งจากการจราจรและมลพิษสะสมในบรรยากาศ" },
    { id: "h_flood", name: "น้ำท่วมที่ราบลุ่มท่าจีน", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนหนักและน้ำเอ่อจากลำน้ำสายหลักทำให้เกิดน้ำท่วมในพื้นที่ลุ่มต่ำได้" },
    { id: "h_dengue", name: "ความเสี่ยงไข้เลือดออกในชุมชนและสวน", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "พื้นที่สวนและชุมชนที่มีน้ำขังเป็นจุดเสี่ยงต่อการเพาะพันธุ์ยุงลาย" }
  ],
  "knowledgeTips": [
      {
        "title": "ไหว้พระปฐมเจดีย์",
        "content": "พระปฐมเจดีย์คือตำนานของเมืองนครปฐม ควรแวะไหว้ขอพร และเยี่ยมชมนิทรรศการภายในวัด",
        "type": "culture"
      },
      {
        "title": "แวะตลาดน้ำดอนหวาย",
        "content": "ตลาดน้ำดอนหวายมีอาหาร-ของฝากภาคกลาง ใกล้กรุงเทพฯ เดินทางสะดวก เป็นจุดพักระหว่างเที่ยว",
        "type": "food"
      },
      {
        "title": "ชมบึงบัวแดง",
        "content": "ตลาดน้ำทุ่งบัวแดง (บางเลน) มีเรือให้นั่งชมทุ่งดอกบัวตลอดปี เก็บภาพทุ่งบัวฤดูหนาวได้",
        "type": "culture"
      },
      {
        "title": "พักผ่อนพุทธมณฑล",
        "content": "อุทยานพุทธมณฑลเป็นสวนขนาดใหญ่สำหรับพักผ่อน มีพระศรีอาริย์องค์ใหญ่และโบราณสถาน",
        "type": "route"
      },
      {
        "title": "ของกินพื้นบ้าน",
        "content": "นครปฐมมีขนมไทยขึ้นชื่อหลายอย่าง เช่น ขนมมงคล ควรลองชิมที่ร้านท้องถิ่น",
        "type": "food"
      }
    ],
  "supplyPoints": [
      {
        "type": "bank",
        "label": "ธนาคารกรุงศรีอยุธยา สาขานครปฐม",
        "area": "ตัวเมืองนครปฐม",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "gas",
        "label": "PTT (นครชัยศรี)",
        "area": "นครชัยศรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "toilet",
        "label": "ห้องน้ำสาธารณะ พุทธมณฑล",
        "area": "พุทธมณฑล",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "pharmacy",
        "label": "Watsons Market Village",
        "area": "นครชัยศรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "clinic",
        "label": "โรงพยาบาลนครชัยศรี",
        "area": "นครชัยศรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "police",
        "label": "สถานีตำรวจภูธรเมืองนครปฐม",
        "area": "ตัวเมืองนครปฐม",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      }
    ],
  "plannerHints": {
      "commonOrigins": [
        "สถานีขนส่งนครปฐม",
        "Airport Link ตลิ่งชัน",
        "BTS บางหว้า"
      ],
      "commonDestinations": [
        "พระปฐมเจดีย์",
        "ตลาดน้ำดอนหวาย",
        "พุทธมณฑล",
        "อุทยานร.2",
        "ตลาดสามพราน"
      ],
      "transitHubs": [
        "สถานีรถไฟนครปฐม",
        "สถานีขนส่งนครชัยศรี"
      ],
      "routeNotes": [
        "ทางหลวงหมายเลข 4 (ราชบุรี) วิ่งตรงสู่นครปฐม",
        "ถนนพุทธมณฑลสาย 4 มักติดช่วงเย็น"
      ]
    },
  "metadata": {
    "climate": "อุณหภูมิ 25-34°C, ฝนตกชุก ก.ค.-ก.ย.",
    "terrain": "ที่ราบลุ่มแม่น้ำท่าจีน ลักษณะทุ่งนากว้าง",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลกรุงเทพราชธานี",
        "number": "034-111-538"
      }
    ]
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
      "via": [
        "พระราม 2",
        "ถนนเศรษฐกิจ"
      ],
      "departureTimes": [
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00"
      ],
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
      "via": [
        "สมุทรสงคราม"
      ],
      "departureTimes": [
        "15:00"
      ],
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
      "examples": [
        "SYN Hotel Samut Sakhon",
        "The Winter Samut Sakhon"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "900-1500฿/คืน",
      "examples": [
        "Nantra Suvarnabhumi",
        "Blue Hippo"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1500-3000฿/คืน",
      "examples": [
        "Wanghaus Sathorn"
      ],
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
    "fl_mangrove",
    "f_shorebird_migratory",
    "f_mudskipper",
    "t_salt_pan_mudflat",
    "c_coastal_humidity",
    "c_pm25",
    "h_coastal_erosion",
    "h_tidal_flood"
  ],
  "newEcoEntities": [
    { id: "fl_mangrove", name: "ป่าชายเลน", category: "flora", tags: ["common"], desc: "ป่าชายเลนเป็นโครงสร้างหลักของระบบนิเวศชายฝั่งสมุทรสาคร ช่วยรักษาตะกอนและเป็นแหล่งอนุบาลสัตว์น้ำ" },
    { id: "f_shorebird_migratory", name: "นกชายเลนอพยพ", category: "fauna", tags: ["common","protected","seasonal"], desc: "พื้นที่โคลนเลนและนาเกลือของสมุทรสาครเป็นแหล่งพักและหาอาหารของนกชายเลนอพยพ" },
    { id: "f_mudskipper", name: "ปลาตีน", category: "fauna", tags: ["common"], desc: "พบตามพื้นเลนบริเวณชายฝั่ง เป็นสัตว์เด่นในระบบนิเวศโคลนเลนของอ่าวไทยตอนใน" },
    { id: "t_salt_pan_mudflat", name: "นาเกลือและโคลนเลนชายฝั่ง", category: "terrain", tags: ["common"], desc: "จังหวัดมีภูมิประเทศชายฝั่งที่โดดเด่นด้วยนาเกลือ โคลนเลน และปากคลองน้ำกร่อย" },
    { id: "c_coastal_humidity", name: "อากาศชื้นเค็มชายฝั่ง", category: "climate", tags: ["common"], desc: "พื้นที่ชายฝั่งมีอากาศชื้นสูงและได้รับอิทธิพลจากลมทะเลตลอดปี" },
    { id: "c_pm25", name: "ฝุ่น PM2.5 เขตอุตสาหกรรมชายฝั่ง", category: "climate", tags: ["danger","common","seasonal"], desc: "พื้นที่เมืองและอุตสาหกรรมมีความเสี่ยงค่าฝุ่นสูงในบางช่วงของฤดูแล้ง" },
    { id: "h_coastal_erosion", name: "การกัดเซาะชายฝั่ง", category: "climate", tags: ["common","danger","extreme"], desc: "คลื่นและการเปลี่ยนแปลงตะกอนชายฝั่งส่งผลต่อความมั่นคงของแนวชายฝั่งและชุมชน" },
    { id: "h_tidal_flood", name: "น้ำทะเลหนุนและน้ำท่วมชุมชนชายฝั่ง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ชุมชนชายฝั่งเสี่ยงต่อน้ำท่วมจากฝนหนักร่วมกับน้ำทะเลหนุน โดยเฉพาะจุดต่ำ" }
  ],
  "knowledgeTips": [
      {
        "title": "รถไฟสายมหาชัย",
        "content": "สมุทรสาครมีรถไฟสายมหาชัย เชื่อมต่อกับสายใต้ สามารถนั่งชมชีวิตริมคลอง ระหว่างมหาชัย-ตลาดรถไฟ",
        "type": "route"
      },
      {
        "title": "ตลาดริมทะเล",
        "content": "ตลาดเช้าสามร้อยยอดหรือมหาชัย มีอาหารทะเลสด ๆ เช่น กุ้ง ปู ปลา พร้อมชมวิถีชาวประมง",
        "type": "food"
      },
      {
        "title": "วัดเล่งเน่ยยี่",
        "content": "วัดจีนโบราณในมหาชัย ตกแต่งวิจิตร เหมาะแก่การเดินชมและไหว้พระ",
        "type": "culture"
      },
      {
        "title": "ล่องเรือบ้านแพ้ว",
        "content": "นั่งเรือข้ามคลองสุนัขบำรุงไปวิถีชาวบ้านที่เกาะโสด และต่อเรือเข้าบางกระเจ้า",
        "type": "route"
      },
      {
        "title": "เลี่ยงน้ำขึ้นสูง",
        "content": "บางพื้นที่ติดทะเล เช่น อำเภอบ้านแพ้ว มักมีน้ำขึ้นสูง ช่วงปลายฝน-ต้นหนาว ควรเช็คเวลาน้ำทะเลก่อนเดินทาง",
        "type": "season"
      }
    ],
  "supplyPoints": [
      {
        "type": "bank",
        "label": "ธนาคารกรุงเทพ สาขาเมืองสมุทรสาคร",
        "area": "เมืองสมุทรสาคร",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "gas",
        "label": "ปั๊มบางจาก ถนนพระราม 2",
        "area": "ถนนพระราม 2",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "toilet",
        "label": "ห้องน้ำสาธารณะ ตลาดมหาชัย",
        "area": "ตลาดมหาชัย",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "pharmacy",
        "label": "ร้านขายยา Central Plaza Mahachai",
        "area": "มหาชัย",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "clinic",
        "label": "โรงพยาบาลสมุทรสาคร",
        "area": "มหาชัย",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "police",
        "label": "สถานีตำรวจภูธรเมืองสมุทรสาคร",
        "area": "มหาชัย",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      }
    ],
  "plannerHints": {
      "commonOrigins": [
        "BTS วุฒากาศ",
        "ท่าเรือคลองเตย",
        "สถานีรถไฟบ้านแพ้ว"
      ],
      "commonDestinations": [
        "ตลาดมหาชัย",
        "พระสมุทรเจดีย์",
        "เกาะลอย",
        "วัดเล่งเน่ยยี่"
      ],
      "transitHubs": [
        "สถานีรถไฟมหาชัย",
        "สำโรง BTS/MRT (รถตู้)",
        "ทางหลวงกาญจนา กม.11"
      ],
      "routeNotes": [
        "ถนนพระราม 2 ช่วงมหาชัย-วัดไร่ขิง รถติดช่วงเช้า-เย็น",
        "มีบริการเรือข้ามฝากมหาชัย-บ้านแพ้ว"
      ]
    },
  "metadata": {
    "climate": "อุณหภูมิ 25-34°C, ชื้น ฝนตกชุก ก.ค.-ต.ค.",
    "terrain": "ที่ราบลุ่มตอนล่างติดปากอ่าวไทย",
    "bestSeason": "พ.ย.-ม.ค.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลสมุทรสาคร",
        "number": "034-411-681"
      }
    ]
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
      "via": [
        "เพชรเกษม"
      ],
      "departureTimes": [
        "06:30",
        "08:30",
        "10:30"
      ],
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
      "via": [
        "สมุทรสงคราม"
      ],
      "departureTimes": [
        "08:30"
      ],
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
      "examples": [
        "Rangsri Riad Resort",
        "Wangnamkeaw Resort"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1000-2000฿/คืน",
      "examples": [
        "Songkhla Inn",
        "The Blue Sky Resort"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-3000฿/คืน",
      "examples": [
        "Sala Ayutthaya (ใกล้เคียง)",
        "Banthaiburi Boutique"
      ],
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
    "fl_nipa_palm",
    "f_firefly",
    "f_mudskipper",
    "t_estuary_canal",
    "c_humid_coastal",
    "c_heat",
    "h_tidal_flood",
    "h_bank_erosion"
  ],
  "newEcoEntities": [
    { id: "fl_nipa_palm", name: "จาก", category: "flora", tags: ["common","edible"], desc: "พืชเด่นของพื้นที่ปากแม่น้ำและน้ำกร่อย ใช้ประโยชน์ได้หลายส่วนและช่วยยึดตลิ่ง" },
    { id: "f_firefly", name: "หิ่งห้อย", category: "fauna", tags: ["common","seasonal"], desc: "สมุทรสงครามมีชื่อเสียงเรื่องชมหิ่งห้อยตามคลอง โดยเฉพาะบริเวณที่มีต้นลำพูและน้ำคุณภาพพอเหมาะ" },
    { id: "f_mudskipper", name: "ปลาตีน", category: "fauna", tags: ["common"], desc: "พบตามโคลนเลนของพื้นที่ป่าชายเลนและปากแม่น้ำ เป็นสัตว์สะท้อนความสมบูรณ์ของระบบนิเวศน้ำกร่อย" },
    { id: "t_estuary_canal", name: "ปากแม่น้ำและเครือข่ายคลองสวน", category: "terrain", tags: ["common"], desc: "จังหวัดมีภูมิประเทศปากแม่น้ำแม่กลอง เชื่อมกับคลองสวนและพื้นที่น้ำกร่อยจำนวนมาก" },
    { id: "c_humid_coastal", name: "อากาศชื้นชายฝั่ง", category: "climate", tags: ["common"], desc: "อิทธิพลจากปากแม่น้ำและทะเลทำให้สมุทรสงครามมีอากาศชื้นตลอดปี" },
    { id: "c_heat", name: "อากาศร้อนอบอ้าว", category: "climate", tags: ["common","danger","seasonal"], desc: "ฤดูร้อนมีอุณหภูมิสูงและความชื้นมาก ทำให้รู้สึกร้อนอบอ้าวกว่าพื้นที่แห้ง" },
    { id: "h_tidal_flood", name: "น้ำทะเลหนุนและน้ำท่วมริมน้ำ", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ชุมชนริมน้ำและพื้นที่ต่ำมีความเสี่ยงต่อน้ำทะเลหนุนและน้ำเอ่อเข้าคลอง" },
    { id: "h_bank_erosion", name: "ตลิ่งพังในคลองและปากแม่น้ำ", category: "climate", tags: ["common","danger","extreme"], desc: "คลื่นจากเรือและการเปลี่ยนแปลงกระแสน้ำอาจเร่งการพังทลายของตลิ่งในบางจุด" }
  ],
  "knowledgeTips": [
      {
        "title": "ตลาดรถไฟแม่กลอง",
        "content": "เป็นตลาดแนวสโลว์ไลฟ์ ใช้เวลาเดินช้อปปิ้งใจกลางทางรถไฟ มีรถไฟแล่นผ่านกลางตลาดได้ทุกวัน",
        "type": "culture"
      },
      {
        "title": "ชิมกุ้งเผาริมน้ำ",
        "content": "แม่กลองมีร้านอาหารทะเลขึ้นชื่อ ริมแม่น้ำแม่กลอง สามารถนั่งกินกุ้งเผา ปูทะเล พร้อมชมวิวแม่น้ำ",
        "type": "food"
      },
      {
        "title": "ล่องเรือชมคลอง",
        "content": "ล่องเรือเดินชมคลองดำเนินสะดวกและคลองอัมพวา เพื่อสัมผัสวิถีชาวบ้านและสถานที่สำคัญ เช่น วัดบางกุ้ง",
        "type": "route"
      },
      {
        "title": "วัดอัมพวาดาราม",
        "content": "วัดที่อยู่ใกล้กับตลาดน้ำอัมพวา มีพระพุทธรูปองค์ใหญ่และภาพเขียนฝาผนังสวยงาม ควรแวะสักการะ",
        "type": "culture"
      },
      {
        "title": "ระวังหมอก",
        "content": "ย่านริมแม่น้ำแม่กลองบางเช้าอาจมีหมอกบาง ระวังถนนลื่น และอุณหภูมิต่ำลงเล็กน้อย",
        "type": "season"
      }
    ],
  "supplyPoints": [
      {
        "type": "bank",
        "label": "ธนาคารกรุงไทย สาขาอัมพวา",
        "area": "อัมพวา",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "gas",
        "label": "PTT (ถนนพระราม 2 กม.65)",
        "area": "อัมพวา",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "toilet",
        "label": "ห้องน้ำสาธารณะ ตลาดน้ำอัมพวา",
        "area": "อัมพวา",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "pharmacy",
        "label": "ร้านยา 7-11 ตลาดแม่กลอง",
        "area": "ตลาดแม่กลอง",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "clinic",
        "label": "ร.พ.สมเด็จพระพุทธเลิศหล้านภาลัย",
        "area": "อัมพวา",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "police",
        "label": "สถานีตำรวจภูธรอัมพวา",
        "area": "อัมพวา",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      }
    ],
  "plannerHints": {
      "commonOrigins": [
        "BTS วงเวียนใหญ่",
        "สถานีมหาชัย",
        "ท่าเรือแม่กลอง"
      ],
      "commonDestinations": [
        "ตลาดน้ำอัมพวา",
        "วัดบางกุ้ง",
        "ตลาดรถไฟแม่กลอง",
        "อุทยาน ร.2",
        "ตลาดน้ำดอนหวาย (นครปฐม)"
      ],
      "transitHubs": [
        "สถานีมหาชัย",
        "ท่าเรือดอนหอยหลอด",
        "ท่าเรือวัดภาษีเจริญ"
      ],
      "routeNotes": [
        "ถนนพระราม 2 ช่วงแม่กลองรถติดบ่อย",
        "มีบริการเรือโดยสารท่าเรือแม่กลอง-อัมพวาทุกวัน"
      ]
    },
  "metadata": {
    "climate": "อุณหภูมิ 24-34°C, ฝนมาก ก.ค.-ต.ค.",
    "terrain": "พื้นที่ที่ราบลุ่มมีคลองดำเนินสะดวกไหลผ่าน",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลดำเนินสะดวก",
        "number": "034-771-041"
      }
    ]
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
      "via": [
        "นครปฐม"
      ],
      "departureTimes": [
        "07:00"
      ],
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
      "via": [
        "ถนนบรมราชชนนี"
      ],
      "departureTimes": [
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00"
      ],
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
      "examples": [
        "River Terrace Resort",
        "Suphan Palace Hotel"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-1500฿/คืน",
      "examples": [
        "Amari Watergate (Nonthaburi)",
        "Suphan Buri River View"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1500-2500฿/คืน",
      "examples": [
        "Buppha ขอนแก่น"
      ],
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
    "fl_rice",
    "f_openbill_stork",
    "f_water_buffalo",
    "t_plain_forest_mix",
    "c_heat",
    "c_pm25",
    "h_flood",
    "h_drought"
  ],
  "newEcoEntities": [
    { id: "fl_rice", name: "นาข้าว", category: "flora", tags: ["common","edible","seasonal"], desc: "สุพรรณบุรีเป็นจังหวัดเกษตรสำคัญ มีนาข้าวกว้างขวางในพื้นที่ราบลุ่ม" },
    { id: "f_openbill_stork", name: "นกปากห่าง", category: "fauna", tags: ["common","protected"], desc: "พบบ่อยในพื้นที่เกษตรภาคกลาง กินหอยและสัตว์น้ำในทุ่งนา" },
    { id: "f_water_buffalo", name: "ควายน้ำ", category: "fauna", tags: ["common","danger"], desc: "ควายเป็นสัตว์คู่เกษตรกรรมของจังหวัด และยังมีแหล่งอนุรักษ์ควายไทยในสุพรรณบุรี" },
    { id: "t_plain_forest_mix", name: "ที่ราบลุ่มผสมเนินเขาและป่า", category: "terrain", tags: ["common"], desc: "สุพรรณบุรีมีทั้งที่ราบเกษตรขนาดใหญ่และพื้นที่เนินเขา/ป่าทางฝั่งตะวันตก" },
    { id: "c_heat", name: "อากาศร้อนแห้งในฤดูแล้ง", category: "climate", tags: ["common","danger","seasonal"], desc: "พื้นที่เกษตรโล่งทำให้รับแดดจัดและอุณหภูมิสูงมากในฤดูร้อน" },
    { id: "c_pm25", name: "ฝุ่น PM2.5 จากอากาศนิ่งและการเผา", category: "climate", tags: ["danger","common","seasonal"], desc: "ฝุ่นสะสมในฤดูแล้งอาจมาจากการจราจรและกิจกรรมเผาในพื้นที่เกษตรใกล้เคียง" },
    { id: "h_flood", name: "น้ำท่วมพื้นที่เกษตรลุ่มต่ำ", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนหนักและน้ำล้นลำน้ำอาจกระทบพื้นที่เกษตรและชุมชนลุ่มต่ำ" },
    { id: "h_drought", name: "ภัยแล้งและขาดน้ำชลประทาน", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ช่วงฝนน้อยหรืออากาศร้อนต่อเนื่องอาจกระทบผลผลิตทางเกษตรและแหล่งน้ำ" }
  ],
  "knowledgeTips": [
      {
        "title": "เทศกาลวิ่งควาย",
        "content": "สุพรรณบุรีมีประเพณีวิ่งควายที่ขึ้นชื่อ จัดในช่วงเดือนพฤษภาคมของทุกปี ควรตรวจสอบกำหนดการหากสนใจชม",
        "type": "culture"
      },
      {
        "title": "ศาลเจ้าพ่อหลักเมือง",
        "content": "ศาลเจ้าพ่อหลักเมืองสุพรรณบุรีเป็นที่กราบไหว้ของชาวบ้าน ควรแวะไหว้เสริมสิริมงคลก่อนเดินทาง",
        "type": "culture"
      },
      {
        "title": "ชิมปลาช่อน",
        "content": "ปลาช่อนแม่กลองปลอดสารขึ้นชื่อของสุพรรณบุรี นิยมมาเป็นเมนูอาหารท้องถิ่น เช่น ต้มยำปลาช่อน ลองชิมได้ในหมู่บ้านใกล้น้ำ",
        "type": "food"
      },
      {
        "title": "ผ้าไหมคุณภาพ",
        "content": "สุพรรณบุรีมีชุมชนทอผ้าไหมหลายแห่ง แนะนำซื้อผ้าไหมหรือเยี่ยมชมศูนย์ศิลปาชีพทอผ้า",
        "type": "culture"
      },
      {
        "title": "โบราณสถานมากมาย",
        "content": "มีวัดสำคัญ เช่น วัดป่าเลไลยก์ วัดพระศรีรัตนมหาธาตุ ช่วงกลางวันควรเตรียมร่มกันแดดกับน้ำดื่มให้เพียงพอ",
        "type": "route"
      }
    ],
  "supplyPoints": [
      {
        "type": "bank",
        "label": "ธนาคารกรุงไทย สาขาสุพรรณบุรี",
        "area": "ตัวเมืองสุพรรณบุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "gas",
        "label": "Shell (สุพรรณบุรี)",
        "area": "สุพรรณบุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "toilet",
        "label": "ห้องน้ำสาธารณะ ศาลเจ้าพ่อหลักเมือง",
        "area": "ตัวเมืองสุพรรณบุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "pharmacy",
        "label": "ร้านขายยา บิ๊กซี สุพรรณบุรี",
        "area": "ตัวเมืองสุพรรณบุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "clinic",
        "label": "โรงพยาบาลสุพรรณบุรี",
        "area": "ตัวเมืองสุพรรณบุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "police",
        "label": "สถานีตำรวจภูธรเมืองสุพรรณบุรี",
        "area": "ตัวเมืองสุพรรณบุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      }
    ],
  "plannerHints": {
      "commonOrigins": [
        "สถานีรถไฟสุพรรณบุรี",
        "สถานีขนส่งสุพรรณบุรี",
        "บึงฉวาก"
      ],
      "commonDestinations": [
        "วัดป่าเลไลยก์",
        "พิพิธภัณฑสถานบ้านหยก",
        "ตลาดสามชุก 100 ปี",
        "ศาลเจ้าพ่อหลักเมือง",
        "เขาช่องพราน"
      ],
      "transitHubs": [
        "สถานีสุพรรณบุรี",
        "สถานีขนส่งสุพรรณบุรี"
      ],
      "routeNotes": [
        "ถนนสุพรรณ-ชัยนาทลาดชันบางช่วง",
        "หลีกเลี่ยงการเดินทางในวันที่ฝนตกหนัก"
      ]
    },
  "metadata": {
    "climate": "อุณหภูมิ 24-35°C, ฝนตกชุก ก.ค.-ก.ย.",
    "terrain": "ที่ราบลุ่มแม่น้ำท่าจีน กว้างขวาง",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลสุพรรณบุรี",
        "number": "035-511-010"
      }
    ]
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
      "via": [
        "อยุธยา"
      ],
      "departureTimes": [
        "07:00",
        "09:00",
        "11:00"
      ],
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
      "via": [
        "พระนครศรีอยุธยา"
      ],
      "departureTimes": [
        "06:30",
        "10:30",
        "14:30"
      ],
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
      "examples": [
        "Sing Buri Guest House",
        "BBH Hotel Singburi"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "800-1500฿/คืน",
      "examples": [
        "Singburi Hotel",
        "The Campers Singburi"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1500-2500฿/คืน",
      "examples": [
        "Phatanakorn Hotel"
      ],
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
    "fl_rice",
    "f_openbill_stork",
    "f_aedes_mosquito",
    "t_floodplain",
    "c_heat",
    "c_pm25",
    "h_flood",
    "h_dengue"
  ],
  "newEcoEntities": [
    { id: "fl_rice", name: "นาข้าว", category: "flora", tags: ["common","edible","seasonal"], desc: "สิงห์บุรีเป็นจังหวัดที่ราบเกษตรในลุ่มเจ้าพระยา มีนาข้าวเป็นภูมิทัศน์หลัก" },
    { id: "f_openbill_stork", name: "นกปากห่าง", category: "fauna", tags: ["common","protected"], desc: "นกน้ำที่พบตามพื้นที่เกษตรและบึงตื้นในภาคกลาง กินหอยเชอรี่และสัตว์น้ำขนาดเล็ก" },
    { id: "f_aedes_mosquito", name: "ยุงลาย", category: "fauna", tags: ["danger","common","seasonal"], desc: "พื้นที่ชุมชนและน้ำขังเป็นแหล่งเพาะพันธุ์ยุงพาหะโรคสำคัญของจังหวัด" },
    { id: "t_floodplain", name: "ที่ราบน้ำท่วมถึงลุ่มเจ้าพระยา", category: "terrain", tags: ["common"], desc: "สิงห์บุรีเป็นที่ราบลุ่มเกือบทั้งหมด มีลำน้ำและคลองหล่อเลี้ยงพื้นที่เกษตร" },
    { id: "c_heat", name: "อากาศร้อนจัดในพื้นที่โล่ง", category: "climate", tags: ["common","danger","seasonal"], desc: "ภูมิประเทศโล่งทำให้แดดแรงและอุณหภูมิสูงในฤดูร้อน" },
    { id: "c_pm25", name: "ฝุ่น PM2.5 ฤดูแล้ง", category: "climate", tags: ["danger","common","seasonal"], desc: "ในฤดูแล้งอาจเกิดฝุ่นสะสมจากอากาศนิ่งและกิจกรรมเผาในที่โล่ง" },
    { id: "h_flood", name: "น้ำท่วมพื้นที่ลุ่มต่ำ", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "น้ำหลากจากลุ่มเจ้าพระยาอาจกระทบพื้นที่เกษตรและชุมชนในจุดลุ่มต่ำ" },
    { id: "h_dengue", name: "ความเสี่ยงไข้เลือดออก", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฤดูฝนเพิ่มจำนวนยุงลายและความเสี่ยงโรคในชุมชน" }
  ],
  "knowledgeTips": [
      {
        "title": "เที่ยวตลาดเก่าเมืองสิงห์",
        "content": "ตลาดโบราณบ้านลาด ศูนย์การค้าเก่าแก่แห่งหนึ่ง มีอาหารและของฝากพื้นบ้านให้เลือกมากมาย เหมาะแก่การเดินถ่ายภาพ",
        "type": "culture"
      },
      {
        "title": "ไหว้พระวัดสิงห์",
        "content": "วัดสิงห์เป็นวัดสำคัญของสิงห์บุรี มีพระพุทธรูปโบราณ ให้สักการะขอพร",
        "type": "culture"
      },
      {
        "title": "ชมวิถีบ้านเรือน",
        "content": "เดินเที่ยวหมู่บ้านแบบไทยโบราณ ชมบ้านไม้ริมน้ำ ย่านวังน้อย เพื่อเรียนรู้วิถีชีวิตท้องถิ่น",
        "type": "culture"
      },
      {
        "title": "แวะพิพิธภัณฑ์",
        "content": "พิพิธภัณฑสถานแห่งชาติสิงห์บุรี จัดแสดงโบราณวัตถุท้องถิ่น ช่วยให้เข้าใจประวัติศาสตร์สิงห์บุรี",
        "type": "culture"
      },
      {
        "title": "ศาลหลักเมือง",
        "content": "ศาลหลักเมืองจังหวัดตั้งอยู่ในตัวเมือง เป็นศาลเจ้าประจำจังหวัดที่นักท่องเที่ยวนิยมไหว้",
        "type": "culture"
      }
    ],
  "supplyPoints": [
      {
        "type": "bank",
        "label": "ธนาคารออมสิน สาขาศาลากลางสิงห์บุรี",
        "area": "สิงห์บุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "gas",
        "label": "ปั๊มเอสโซ่ ถนนสายเอเซีย (สิงห์บุรี)",
        "area": "ถนนสิงห์บุรี-ชัยนาท",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "toilet",
        "label": "ห้องน้ำสาธารณะ ตลาดสิงห์บุรี",
        "area": "สิงห์บุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "pharmacy",
        "label": "ร้านขายยา เทศบาลเมืองสิงห์บุรี",
        "area": "สิงห์บุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "clinic",
        "label": "โรงพยาบาลสิงห์บุรี",
        "area": "สิงห์บุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "police",
        "label": "สถานีตำรวจภูธรเมืองสิงห์บุรี",
        "area": "สิงห์บุรี",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      }
    ],
  "plannerHints": {
      "commonOrigins": [
        "ถนนหมายเลข 32 (บ้านสร้าง)",
        "บขส.สิงห์บุรี",
        "วัดป่าโมก"
      ],
      "commonDestinations": [
        "วัดสิงห์",
        "ตลาดโบราณบ้านลาด",
        "พิพิธภัณฑ์สิงห์บุรี",
        "เขาวงพระจันทร์"
      ],
      "transitHubs": [
        "สถานีรถไฟบ้านสร้าง",
        "สถานีขนส่งสิงห์บุรี"
      ],
      "routeNotes": [
        "ถนนเอเชีย (พหลโยธิน) จะเลี่ยงวังน้อย",
        "ควรหลีกเลี่ยงถนนในช่วงน้ำท่วม"
      ]
    },
  "metadata": {
    "climate": "อุณหภูมิ 23-34°C, ฝนตกชุก ก.ค.-ก.ย.",
    "terrain": "ที่ราบแม่น้ำท่าจีน มีภูเขาตั้งเด่นที่เขาสิงห์บุรี",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลสิงห์บุรี",
        "number": "036-511-325"
      }
    ]
  }
}
};
