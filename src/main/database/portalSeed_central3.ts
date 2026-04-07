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
    "c_heat_stroke",
    "c_pm25"
  ],
  "newEcoEntities": [],
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
    "f_monkey",
    "c_heat_stroke"
  ],
  "newEcoEntities": [],
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
    "fl_mushroom_poison",
    "c_pm25"
  ],
  "newEcoEntities": [],
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
    "c_heat_stroke",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
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
    "t_mountain",
    "c_flash_flood"
  ],
  "newEcoEntities": [],
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
