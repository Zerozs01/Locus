// Portal seed data: ภาคกลาง Part 3 (5 จังหวัด)
// Source: documents/deepreserach/part1_ภาคกลาง.md
import type { ProvincePortalSeedData } from './db';

export const centralPart3: Record<string, ProvincePortalSeedData> = {
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
      "via": [
        "อ่างทอง"
      ],
      "departureTimes": [
        "15:00"
      ],
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
      "via": [
        "ปทุมธานี"
      ],
      "departureTimes": [
        "07:00",
        "13:00"
      ],
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
      "examples": [
        "My Ban Thung",
        "Lone Pine Resort"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "700-1200฿/คืน",
      "examples": [
        "Baan Khunprom Boutique",
        "Lock 33"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1500-2000฿/คืน",
      "examples": [
        "Nong Tavee Resort"
      ],
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
    "fl_rice",
    "f_openbill_stork",
    "f_aedes_mosquito",
    "t_chao_phraya_plain",
    "c_heat",
    "c_monsoon_rain",
    "h_flood",
    "h_dengue"
  ],
  "newEcoEntities": [
    { id: "fl_rice", name: "นาข้าว", category: "flora", tags: ["common","edible","seasonal"], desc: "อ่างทองเป็นจังหวัดเกษตรในที่ราบภาคกลาง นาข้าวเป็นองค์ประกอบหลักของภูมิทัศน์" },
    { id: "f_openbill_stork", name: "นกปากห่าง", category: "fauna", tags: ["common","protected"], desc: "นกน้ำที่พบหากินในนาข้าวและแหล่งน้ำตื้นทั่วภาคกลาง" },
    { id: "f_aedes_mosquito", name: "ยุงลาย", category: "fauna", tags: ["danger","common","seasonal"], desc: "ยุงลายเป็นพาหะโรคที่ต้องเฝ้าระวัง โดยเฉพาะในเขตชุมชนหนาแน่น" },
    { id: "t_chao_phraya_plain", name: "ที่ราบลุ่มเจ้าพระยา", category: "terrain", tags: ["common"], desc: "จังหวัดมีลักษณะเป็นที่ราบลุ่มและเครือข่ายคลอง เหมาะกับเกษตรกรรมและเสี่ยงน้ำหลาก" },
    { id: "c_heat", name: "อากาศร้อนอบอ้าว", category: "climate", tags: ["common","danger","seasonal"], desc: "ฤดูร้อนมีแดดแรงและอุณหภูมิสูง โดยเฉพาะในพื้นที่เกษตรโล่ง" },
    { id: "c_monsoon_rain", name: "ฝนมรสุมภาคกลาง", category: "climate", tags: ["common","danger","seasonal"], desc: "ฤดูฝนมีฝนสะสมต่อเนื่องและส่งผลต่อระดับน้ำในคลองและแม่น้ำ" },
    { id: "h_flood", name: "น้ำท่วมทุ่งและชุมชนลุ่มต่ำ", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "อ่างทองมีความเสี่ยงน้ำท่วมในช่วงฝนหนักและน้ำหลากจากลุ่มเจ้าพระยา" },
    { id: "h_dengue", name: "ความเสี่ยงโรคไข้เลือดออก", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "น้ำขังในชุมชนและพื้นที่เกษตรเพิ่มโอกาสเพาะพันธุ์ยุงลาย" }
  ],
  "knowledgeTips": [
      {
        "title": "ไหว้หลวงพ่อใหญ่ วัดม่วง",
        "content": "วัดม่วง จ.อ่างทอง มีพระพุทธมหานวมินทร์ศากยมุนีศรีวิเศษชัยชาญ หรือ 'หลวงพ่อใหญ่' ที่ใหญ่ที่สุดในไทย ควรไปนมัสการเพื่อความเป็นสิริมงคล",
        "type": "culture"
      },
      {
        "title": "ช้อปตลาดโบราณบ้านลาด",
        "content": "ตลาดบ้านลาดเก่า มีสินค้าพื้นเมืองและขนมไทยโบราณ ให้เดินชมวิถีเก่าๆ และถ่ายรูปย้อนยุค",
        "type": "culture"
      },
      {
        "title": "ชมวิวสะพานแม่น้ำเจ้าพระยา",
        "content": "สะพานใหม่เชื่อมพระนครศรีอยุธยา-อ่างทอง เป็นจุดชมวิวแม่น้ำเจ้าพระยาที่สวยงาม",
        "type": "route"
      },
      {
        "title": "ของฝากพื้นเมือง",
        "content": "อ่างทองขึ้นชื่อผลไม้สด เช่น ส้มโอหวาน (สมันตาโอหวาน) ควรลองชิมและซื้อกลับบ้าน",
        "type": "food"
      },
      {
        "title": "วัดสังกระต่ายโบราณ",
        "content": "วัดเก่าชื่อดังในอ่างทอง มีศาลา 12 นักษัตรและโบสถ์ทรงไทยสุดงดงาม แวะกราบไหว้พระ",
        "type": "culture"
      }
    ],
  "supplyPoints": [
      {
        "type": "bank",
        "label": "ธนาคารกรุงศรีอยุธยา สาขาศาลเจ้าพ่อหลักเมือง",
        "area": "อ่างทอง",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "gas",
        "label": "ปั๊มบางจาก ถนนสายเอเซีย อ่างทอง",
        "area": "ถนนสิงห์บุรี-ไชโย",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "toilet",
        "label": "ห้องน้ำสาธารณะ วัดม่วง",
        "area": "อำเภอวิเศษชัยชาญ",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "pharmacy",
        "label": "ร้านขายยา 7-11 บ้านลาด",
        "area": "อำเภอเมืองอ่างทอง",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "clinic",
        "label": "โรงพยาบาลอ่างทอง",
        "area": "ตัวเมืองอ่างทอง",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      },
      {
        "type": "police",
        "label": "สถานีตำรวจภูธรเมืองอ่างทอง",
        "area": "ตัวเมืองอ่างทอง",
        "note": null,
        "openHours": null,
        "mapUrl": ""
      }
    ],
  "plannerHints": {
      "commonOrigins": [
        "ทางหลวงหมายเลข 32",
        "สะพานข้ามเจ้าพระยา (อ่างทอง-อยุธยา)",
        "อู่ทองวัดไทรใหญ่"
      ],
      "commonDestinations": [
        "วัดม่วง",
        "วัดสังกระต่าย",
        "ศาลเจ้าพ่อหลักเมือง",
        "ตลาดโบราณบ้านลาด"
      ],
      "transitHubs": [
        "สถานีขนส่งอ่างทอง",
        "ถนนสายเอเซีย (32)"
      ],
      "routeNotes": [
        "ถนนทางขึ้นสะพานแม่น้ำต้องระวังน้ำท่วมตอนปลายฝน",
        "ส่วนใหญ่ใช้ทางหลวงหลักสาย 32 ผ่านอ่างทอง"
      ]
    },
  "metadata": {
    "climate": "อุณหภูมิ 23-33°C, ฝนตกชุก ก.ค.-ก.ย.",
    "terrain": "ที่ราบลุ่มกว้างขวาง แบ่งโดยคลองภาษีเจริญ",
    "bestSeason": "พ.ย.-ม.ค.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลอ่างทอง",
        "number": "035-611-555"
      }
    ]
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
      "via": [
        "อยุธยา"
      ],
      "departureTimes": [
        "06:00",
        "08:00",
        "10:00"
      ],
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
      "via": [
        "ปทุมธานี",
        "อยุธยา"
      ],
      "departureTimes": [
        "13:00"
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
      "examples": [
        "Lop Buri Guest House",
        "Muen Mai Resort"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1000-1500฿/คืน",
      "examples": [
        "The Liliburi Hotel",
        "Golden Place Lopburi"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-3000฿/คืน",
      "examples": [
        "Lopburi Inn & Heritage Hotel"
      ],
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
    "fl_sunflower",
    "f_macaque",
    "f_aedes_mosquito",
    "t_plain_reservoir",
    "c_heat",
    "c_pm25",
    "h_macaque_conflict",
    "h_drought"
  ],
  "newEcoEntities": [
    { id: "fl_sunflower", name: "ทุ่งทานตะวัน", category: "flora", tags: ["common","edible","seasonal"], desc: "ลพบุรีมีชื่อเสียงเรื่องทุ่งทานตะวันในฤดูหนาว เป็นพืชเศรษฐกิจและภาพจำสำคัญของจังหวัด" },
    { id: "f_macaque", name: "ลิงแสม/ลิงหางยาวในเขตเมืองเก่า", category: "fauna", tags: ["danger","common","protected"], desc: "ลิงเป็นสัญลักษณ์ของลพบุรี แต่สามารถแย่งของ กัด หรือข่วนได้หากเข้าใกล้หรือถืออาหาร" },
    { id: "f_aedes_mosquito", name: "ยุงลาย", category: "fauna", tags: ["danger","common","seasonal"], desc: "พบทั่วไปในเขตชุมชนและพื้นที่น้ำขัง เป็นพาหะโรคที่ต้องระวัง" },
    { id: "t_plain_reservoir", name: "ที่ราบภาคกลางสลับอ่างเก็บน้ำและเชิงเขา", category: "terrain", tags: ["common"], desc: "ลพบุรีมีทั้งพื้นที่ราบเกษตร อ่างเก็บน้ำขนาดใหญ่ และแนวเชิงเขาทางตะวันออก" },
    { id: "c_heat", name: "อากาศร้อนและแห้ง", category: "climate", tags: ["common","danger","seasonal"], desc: "ฤดูร้อนของลพบุรีร้อนจัดและค่อนข้างแห้ง โดยเฉพาะพื้นที่โล่งและเชิงเขา" },
    { id: "c_pm25", name: "ฝุ่น PM2.5 ช่วงอากาศแห้ง", category: "climate", tags: ["danger","common","seasonal"], desc: "ในฤดูแล้งอาจมีฝุ่นสะสมจากการจราจรและกิจกรรมเผาในพื้นที่โล่ง" },
    { id: "h_macaque_conflict", name: "ความเสี่ยงจากลิงรบกวน", category: "climate", tags: ["danger","common","extreme"], desc: "นักท่องเที่ยวควรเก็บอาหาร ของมีค่า และหลีกเลี่ยงการสบตาหรือให้อาหารลิงโดยตรง" },
    { id: "h_drought", name: "ภัยแล้งและขาดน้ำภาคเกษตร", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนน้อยและอากาศร้อนยาวนานอาจกระทบผลผลิตเกษตรและแหล่งน้ำในบางอำเภอ" }
  ],
  "knowledgeTips": [
      {
        "title": "ระวังลิงบริเวณสถานที่ท่องเที่ยว",
        "content": "ส่วนตัวเมืองลพบุรีโดยเฉพาะบริเวณพระปรางค์สามยอดและศาลพระกาฬลิงค่อนข้างชุกชุมและซน ควรเก็บข้าวของมีค่า แว่นตา และอาหารให้มิดชิด",
        "type": "safety"
      },
      {
        "title": "เที่ยวชมทุ่งทานตะวัน",
        "content": "เวลาที่เหมาะสมที่สุดสำหรับการชมทุ่งทานตะวันบานสะพรั่งคือช่วงเดือนพฤศจิกายนถึงมกราคม (พ.ย.-ม.ค.) ได้ภาพสวยแน่นอน",
        "type": "nature"
      }
    ],
  "supplyPoints": [],
  "plannerHints": {
      "commonOrigins": [
        "ถนนพหลโยธิน",
        "ทางหลวงสาย 3196"
      ],
      "commonDestinations": [
        "พระปรางค์สามยอด",
        "ศาลพระกาฬ",
        "พระนารายณ์ราชนิเวศน์",
        "ทุ่งทานตะวัน"
      ],
      "transitHubs": [
        "สถานีรถไฟลพบุรี",
        "สถานีขนส่งลพบุรี"
      ],
      "routeNotes": [
        "การเดินชมโบราณสถานในเมืองสะดวกคล่องตัว แต่อย่าลืมระมัดระวังฝูงลิงข้ามถนน"
      ]
    },
  "metadata": {
    "climate": "อุณหภูมิ 24-34°C, ฝนมาก ก.ค.-ต.ค.",
    "terrain": "พื้นที่ราบลุ่มกว้าง มีโบราณสถานและภูเขาล้อมรอบ",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลลพบุรี",
        "number": "036-770-512"
      }
    ]
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
      "via": [
        "สระบุรี"
      ],
      "departureTimes": [
        "18:00"
      ],
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
      "via": [
        "ปทุมธานี"
      ],
      "departureTimes": [
        "08:00",
        "14:00"
      ],
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
      "examples": [
        "Ease Hotel",
        "Golden City Inn"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1000-2000฿/คืน",
      "examples": [
        "The Best Residence",
        "Saraburi River View"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2500-4000฿/คืน",
      "examples": [
        "Sky View Hotel"
      ],
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
    "fl_bamboo",
    "f_hornbill",
    "f_wild_elephant",
    "t_mountain_forest",
    "c_cool_forest_edge",
    "c_pm25",
    "h_flash_flood",
    "h_wildfire"
  ],
  "newEcoEntities": [
    { id: "fl_bamboo", name: "ไผ่และพืชป่าริมเขา", category: "flora", tags: ["common","edible"], desc: "พื้นที่เชิงเขาและป่าของสระบุรีพบไผ่และพืชป่าหลายชนิด เป็นส่วนหนึ่งของแนวต่อเนื่องระบบนิเวศเขาใหญ่" },
    { id: "f_hornbill", name: "นกเงือก", category: "fauna", tags: ["common","rare","protected"], desc: "แนวป่าที่ต่อกับเขาใหญ่เป็นถิ่นอาศัยของนกเงือกและสัตว์ป่าป่าดิบแล้งหลายชนิด" },
    { id: "f_wild_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","rare","protected"], desc: "พื้นที่ป่าเชื่อมเขาใหญ่มีโอกาสพบช้างป่าได้ โดยเฉพาะใกล้แนวป่าและจุดทางผ่านสัตว์" },
    { id: "t_mountain_forest", name: "ภูเขา ป่า และน้ำตกเชิงเขา", category: "terrain", tags: ["common"], desc: "สระบุรีต่างจากจังหวัดลุ่มเจ้าพระยาเพราะมีทั้งเชิงเขา ป่า และแหล่งน้ำตกจำนวนมาก" },
    { id: "c_cool_forest_edge", name: "อากาศเย็นกว่าพื้นราบในเขตเชิงเขา", category: "climate", tags: ["common","seasonal"], desc: "พื้นที่เชิงเขาและป่ามักเย็นกว่าพื้นที่เมืองและพื้นที่อุตสาหกรรมของจังหวัด" },
    { id: "c_pm25", name: "ฝุ่น PM2.5 ภาคกลางตอนบน", category: "climate", tags: ["danger","common","seasonal"], desc: "สระบุรีมีความเสี่ยงฝุ่นจากการคมนาคม อุตสาหกรรม และอากาศนิ่งในฤดูแล้ง" },
    { id: "h_flash_flood", name: "น้ำป่าไหลหลากตามน้ำตกและเชิงเขา", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ฝนหนักในพื้นที่ป่าต้นน้ำอาจทำให้เกิดน้ำป่าไหลหลากฉับพลันตามลำธารและน้ำตก" },
    { id: "h_wildfire", name: "ไฟป่าฤดูแล้ง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "พื้นที่ป่าและหญ้าแห้งมีความเสี่ยงไฟป่าในช่วงอากาศร้อนและฝนน้อย" }
  ],
  "knowledgeTips": [
      {
        "title": "การเตรียมตัวเที่ยวน้ำตก",
        "content": "ควรเตรียมรองเท้าสำหรับเดินป่าหรือพื้นที่ลื่นให้พร้อม และควรตรวจสอบระดับน้ำตกเช่น น้ำตกเจ็ดสาวน้อยและสามหลั่น ก่อนการเดินทาง",
        "type": "safety"
      },
      {
        "title": "หลีกเลี่ยงวันหยุดยาว",
        "content": "เนื่องจากสระบุรีอยู่ใกล้กรุงเทพฯและเดินทางง่าย วันหยุดยาวคนจึงไปเที่ยวธรรมชาติกันเยอะ อาจต้องเตรียมตัวให้พร้อมเรื่องรถติดหรือเผื่อไปวันธรรมดา",
        "type": "culture"
      }
    ],
  "supplyPoints": [],
  "plannerHints": {
      "commonOrigins": [
        "ถนนมิตรภาพ"
      ],
      "commonDestinations": [
        "น้ำตกเจ็ดสาวน้อย",
        "น้ำตกสามหลั่น",
        "วัดพระพุทธบาท",
        "เขื่อนป่าสักชลสิทธิ์"
      ],
      "transitHubs": [
        "สถานีขนส่งผู้โดยสารสระบุรี",
        "สถานีรถไฟชุมทางแก่งคอย"
      ],
      "routeNotes": [
        "ถนนมิตรภาพฝั่งขาออกมักจะมีปริมาณรถมากและติดสะสมช่วงวันหยุด"
      ]
    },
  "metadata": {
    "climate": "อุณหภูมิ 23-33°C, ฝนตกชุก ก.ค.-ต.ค.",
    "terrain": "ที่ราบกลางภูเขาตะวันออก มีเขาหินปูนและแม่น้ำป่าสัก",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลสระบุรี",
        "number": "036-211-265"
      }
    ]
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
      "via": [
        "อยุธยา"
      ],
      "departureTimes": [
        "07:00",
        "09:00",
        "11:00"
      ],
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
      "via": [
        "ปทุมธานี"
      ],
      "departureTimes": [
        "08:00",
        "14:00"
      ],
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
      "examples": [
        "HoT Hostel Chain"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "700-1500฿/คืน",
      "examples": [
        "Baan Khunprom Chaipat"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-3000฿/คืน",
      "examples": [
        "Chalida Boutique Resort"
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
      "label": "น้ำท่วม",
      "severity": "medium",
      "note": "พื้นที่ลุ่มริมแม่น้ำเจ้าพระยามีน้ำท่วมขังได้ในฤดูฝน",
      "season": "ก.ย.-ต.ค."
    }
  ],
  "ecoIds": [
    "fl_rice",
    "f_waterbird",
    "f_aedes_mosquito",
    "t_floodplain_dam",
    "c_heat",
    "c_monsoon_rain",
    "h_flood",
    "h_drought"
  ],
  "newEcoEntities": [
    { id: "fl_rice", name: "นาข้าว", category: "flora", tags: ["common","edible","seasonal"], desc: "ชัยนาทเป็นจังหวัดเกษตรในลุ่มเจ้าพระยาตอนบนตอนกลาง มีนาข้าวเป็นภูมิทัศน์เด่น" },
    { id: "f_waterbird", name: "นกน้ำและนกสวนสัตว์น้ำจืด", category: "fauna", tags: ["common","protected"], desc: "จังหวัดมีแหล่งเรียนรู้นกขนาดใหญ่และพื้นที่ชุ่มน้ำรองรับนกน้ำหลายชนิด" },
    { id: "f_aedes_mosquito", name: "ยุงลาย", category: "fauna", tags: ["danger","common","seasonal"], desc: "ยุงเป็นพาหะโรคที่พบทั่วไปในพื้นที่ชุมชนและเกษตรของชัยนาท" },
    { id: "t_floodplain_dam", name: "ที่ราบลุ่มและระบบชลประทานจากเขื่อนเจ้าพระยา", category: "terrain", tags: ["common"], desc: "ชัยนาทมีภูมิประเทศที่เชื่อมกับแม่น้ำเจ้าพระยาและระบบชลประทานสำคัญของภาคกลาง" },
    { id: "c_heat", name: "อากาศร้อนจัดพื้นที่โล่ง", category: "climate", tags: ["common","danger","seasonal"], desc: "พื้นที่เปิดโล่งรับแดดแรง ทำให้อุณหภูมิสูงในฤดูร้อน" },
    { id: "c_monsoon_rain", name: "ฝนมรสุมและความชื้นสูง", category: "climate", tags: ["common","danger","seasonal"], desc: "ฤดูฝนมีผลต่อระดับน้ำในแม่น้ำและการจัดสรรน้ำเพื่อเกษตรกรรม" },
    { id: "h_flood", name: "น้ำท่วมพื้นที่เกษตรและชุมชนลุ่มต่ำ", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "แม้มีระบบชลประทาน แต่ฝนหนักและน้ำเหนือยังอาจส่งผลต่อพื้นที่ลุ่มต่ำ" },
    { id: "h_drought", name: "ภัยแล้งในฤดูร้อน", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ช่วงฝนน้อยยาวนานอาจกระทบการเพาะปลูกและความเพียงพอของน้ำชลประทาน" }
  ],
  "knowledgeTips": [
      {
        "title": "จุดหมายปลายทางที่เงียบสงบ",
        "content": "เหมาะสำหรับสายเที่ยวแบบชิลๆ หนีความวุ่นวาย มีแหล่งพักผ่อนทางธรรมชาติและการเรียนรู้ เช่น เขื่อนเจ้าพระยาและพิพิธภัณฑ์สวนนก",
        "type": "culture"
      },
      {
        "title": "เดินทางคล่องตัว",
        "content": "การกระจายตัวของสถานที่เที่ยวค่อนข้างห่างกัน และขนส่งสาธารณะในจังหวัดอาจไม่ครอบคลุม 100% จึงเหมาะกับการเข้าชมโดยใช้รถยนต์ส่วนตัวที่สุด",
        "type": "route"
      }
    ],
  "supplyPoints": [],
  "plannerHints": {
      "commonOrigins": [
        "ถนนสายเอเชีย (หมายเลข 32)"
      ],
      "commonDestinations": [
        "เขื่อนเจ้าพระยา",
        "สวนนกชัยนาท",
        "วัดปากคลองมะขามเฒ่า",
        "ศูนย์วิจัยประมงน้ำจืด"
      ],
      "transitHubs": [
        "สถานีขนส่งผู้โดยสารจังหวัดชัยนาท"
      ],
      "routeNotes": [
        "ที่เที่ยวบางประการเป็นพื้นที่เปิดโล่ง ควรมีร่มกันแดดหรือหลีกเลี่ยงช่วงสภาพอากาศร้อนจัด"
      ]
    },
  "metadata": {
    "climate": "อุณหภูมิ 24-33°C, ฝนตกชุก ก.ค.-ก.ย.",
    "terrain": "ที่ราบลุ่มแม่น้ำเจ้าพระยา",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลชัยนาทนเรนทร",
        "number": "056-613-222"
      }
    ]
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
      "via": [
        "นครนายก",
        "ปราจีนบุรี"
      ],
      "departureTimes": [
        "12:30"
      ],
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
      "via": [
        "นครปฐม"
      ],
      "departureTimes": [
        "07:30",
        "09:30",
        "11:30"
      ],
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
      "examples": [
        "Club One Hotel Nakhon Nayok",
        "Cher Resort"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "1000-2000฿/คืน",
      "examples": [
        "The Than Resort",
        "Tulus Hill Nakhon Nayok"
      ],
      "bookingUrl": ""
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "2000-4000฿/คืน",
      "examples": [
        "Veranda Mountain Village"
      ],
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
    "fl_bamboo",
    "f_wild_elephant",
    "f_hornbill",
    "t_mountain_waterfall_forest",
    "c_heavy_rain",
    "c_cool_forest",
    "h_flash_flood",
    "h_elephant_conflict"
  ],
  "newEcoEntities": [
    { id: "fl_bamboo", name: "ไผ่ป่า", category: "flora", tags: ["common","edible"], desc: "พื้นที่ป่าและเชิงเขาของนครนายกพบไผ่และพืชป่าหลากชนิดซึ่งเป็นส่วนหนึ่งของระบบนิเวศเขาใหญ่" },
    { id: "f_wild_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","common","protected"], desc: "นครนายกติดเขาใหญ่และมีข่าวช้างป่าออกนอกป่ามาถึงชุมชนเป็นระยะ ต้องระวังอย่างมาก" },
    { id: "f_hornbill", name: "นกเงือก", category: "fauna", tags: ["common","protected"], desc: "แนวป่าเขาใหญ่เป็นถิ่นอาศัยสำคัญของนกเงือกหลายชนิด ซึ่งบ่งชี้ความสมบูรณ์ของป่า" },
    { id: "t_mountain_waterfall_forest", name: "ภูเขา ป่าต้นน้ำ และน้ำตก", category: "terrain", tags: ["common"], desc: "นครนายกมีภูมิประเทศต่างจากจังหวัดลุ่มเจ้าพระยาอย่างชัดเจน โดยมีภูเขา ป่าต้นน้ำ และน้ำตกจำนวนมาก" },
    { id: "c_heavy_rain", name: "ฝนมากในเขตป่าต้นน้ำ", category: "climate", tags: ["common","danger","seasonal"], desc: "ฝนตกมากในพื้นที่ป่าต้นน้ำทำให้ลำธารและน้ำตกมีน้ำแรงในฤดูฝน" },
    { id: "c_cool_forest", name: "อากาศเย็นกว่าพื้นราบตามแนวป่า", category: "climate", tags: ["common","seasonal"], desc: "พื้นที่ติดป่าและภูเขามักมีอุณหภูมิต่ำกว่าพื้นราบภาคกลาง โดยเฉพาะตอนเช้าและหลังฝน" },
    { id: "h_flash_flood", name: "น้ำป่าไหลหลาก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "พื้นที่ท่องเที่ยวน้ำตกและลำธารเสี่ยงน้ำป่าไหลหลากฉับพลันหลังฝนตกหนักบนเขา" },
    { id: "h_elephant_conflict", name: "ช้างป่าออกนอกพื้นที่ป่า", category: "climate", tags: ["danger","common","extreme"], desc: "ช้างป่าออกมาหากินใกล้ชุมชนและสวนเกษตรเป็นความเสี่ยงจริงของจังหวัดในช่วงหลัง" }
  ],
  "knowledgeTips": [
      {
        "title": "ระวังน้ำหลากในฤดูฝน",
        "content": "ปริมาณน้ำตกและน้ำเหนือในหน้าฝนมีมาก หากมีฝนตกชุกควรติดตามข่าวสารเพื่อหลีกเลี่ยงเหตุการณ์น้ำป่าไหลหลากในลานกางเต็นท์",
        "type": "safety"
      },
      {
        "title": "เตรียมพร้อมล่องแก่ง",
        "content": "กิจกรรมเด่นคือการเล่นน้ำ ล่องแก่ง และเดินป่า เตรียมชุดเปียก ซองกันน้ำ และรองเท้ารัดส้นให้พร้อมรับมือการผจญภัย",
        "type": "culture"
      }
    ],
  "supplyPoints": [],
  "plannerHints": {
      "commonOrigins": [
        "ถนนรังสิต-นครนายก (305)"
      ],
      "commonDestinations": [
        "เขื่อนขุนด่านปราการชล",
        "น้ำตกนางรอง",
        "น้ำตกสาริกา",
        "อุทยานแห่งชาติเขาใหญ่"
      ],
      "transitHubs": [
        "ท่ารถตู้นครนายก"
      ],
      "routeNotes": [
        "ถนนรังสิต-นครนายก สามารถเข้าถึงได้ง่าย แต่การจราจรอาจติดขัดช่วงเช้าและเย็นในวันหยุดสุดสัปดาห์"
      ]
    },
  "metadata": {
    "climate": "อุณหภูมิ 23-33°C, ฝนตกชุก ก.ค.-ต.ค.",
    "terrain": "ภูเขาและลำธาร อากาศเย็นช่วงฤดูหนาว",
    "bestSeason": "ต.ค.-ม.ค.",
    "emergencyContacts": [
      {
        "label": "โรงพยาบาลนครนายก",
        "number": "037-331-223"
      }
    ]
  }
}
};
