// Portal seed data: ภาคอีสานล่าง Part 2 (5 จังหวัด)
// Source: documents/deepreserach/part4_ภาคอีสานล่าง.md
import type { ProvincePortalSeedData } from './db';

export const isanLower2: Record<string, ProvincePortalSeedData> = {
  "Roi Et": {
  "transport": [
    {
      "name": "รถสองแถว/รถรับจ้างในตัวเมืองร้อยเอ็ด",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "ใช้วิ่งในเมืองและเชื่อมอำเภอ เช่น เกษตรวิสัย สุวรรณภูมิ พนมไพร",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#22c55e"
    },
    {
      "name": "รถตุ๊กตุ๊ก/สามล้อเครื่อง",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "พบได้ในตัวเมือง ใกล้ตลาดและสถานีขนส่ง",
      "warpUrl": "",
      "logoText": "🛺",
      "color": "#a855f7"
    },
    {
      "name": "วินมอเตอร์ไซค์",
      "shortName": "วินมอเตอร์ไซค์",
      "type": "bike",
      "description": "สะดวกสำหรับระยะสั้นและต่อรถจาก บขส.",
      "warpUrl": "",
      "logoText": "🏍️",
      "color": "#10b981"
    },
    {
      "name": "รถบัส/รถทัวร์ระหว่างจังหวัด",
      "shortName": "รถบัส",
      "type": "bus",
      "description": "เชื่อมร้อยเอ็ดกับขอนแก่น มหาสารคام ยโสธร และจังหวัดใกล้เคียง",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#f97316"
    },
    {
      "name": "รถเช่า/เหมารถ",
      "shortName": "เหมารถ",
      "type": "other",
      "description": "เหมาะกับเที่ยวหลายจุดและงานประเพณีช่วงคนเยอะ",
      "warpUrl": "",
      "logoText": "🚗",
      "color": "#64748b"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ (หมอชิต2) - ร้อยเอ็ด (รถทัวร์)",
      "type": "coach",
      "operator": "นครชัยแอร์",
      "from": "กรุงเทพฯ",
      "to": "บขส.ร้อยเอ็ด",
      "via": [
        "สระบุรี",
        "นครราชสีมา",
        "ขอนแก่น"
      ],
      "departureTimes": [
        "10:45",
        "20:15"
      ],
      "duration": "7-9 ชม.",
      "baseFare": 504,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 2: กรุงเทพฯ (หมอชิต2) - ร้อยเอ็ด (รถทัวร์)",
      "type": "coach",
      "operator": "เชิดชัยทัวร์",
      "from": "กรุงเทพฯ",
      "to": "บขส.ร้อยเอ็ด",
      "via": [
        "สระบุรี",
        "นครราชสีมา",
        "ขอนแก่น"
      ],
      "departureTimes": [
        "19:00"
      ],
      "duration": "8-9 ชม.",
      "baseFare": 432,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": "มีรอบกลางคืนถึงเช้า"
    },
    {
      "name": "สาย 3: ร้อยเอ็ด - พนมไพร (รถตู้/รถบัสท้องถิ่น)",
      "type": "van",
      "operator": "คิวรถตู้ร้อยเอ็ด",
      "from": "บขส.ร้อยเอ็ด",
      "to": "พนมไพร",
      "via": [],
      "departureTimes": [
        "08:00",
        "12:00",
        "16:00"
      ],
      "duration": "1-2 ชม.",
      "baseFare": 60,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "บขส.ร้อยเอ็ด",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "ข้าวปุ้นน้ำยาปลาหลด",
      "priceRange": "40-120฿",
      "category": "local",
      "note": "ได้รับคัดเลือกเป็น 1 จังหวัด 1 เมนู เชิดชูอาหรถิ่น"
    },
    {
      "name": "ตำกระเทย สาเกต (ส้มตำสาเกต)",
      "priceRange": "60-200฿",
      "category": "street",
      "note": "สาเกตนครเป็นชื่อเดิมของร้อยเอ็ด"
    },
    {
      "name": "ข้าวปุ้นซาวพนมไพร",
      "priceRange": "40-100฿",
      "category": "street",
      "note": "ขนมจีนเส้นสดสไตล์ท้องถิ่น"
    },
    {
      "name": "ข้าวหอมมะลิทุ่งกุลาร้องไห้ (GI)",
      "priceRange": "50-120฿/กก.",
      "category": "local",
      "note": "ผลผลิตเด่นของพื้นที่ทุ่งกุลาในหลายจังหวัด"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "350-900฿/คืน",
      "examples": [
        "HOP INN Roi Et",
        "The Bed Hotel",
        "Boonbundal Hotel"
      ],
      "bookingUrl": "https://www.agoda.com/city/roi-et-th.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "900-1,900฿/คืน",
      "examples": [
        "MGRAND",
        "The Hi Place",
        "De Vine House"
      ],
      "bookingUrl": "https://www.agoda.com/city/roi-et-th.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1,800-3,500฿/คืน",
      "examples": [
        "MGRAND (Suite)",
        "De Vine House (Premier)",
        "The Hi Place (Executive)"
      ],
      "bookingUrl": "https://www.agoda.com/city/roi-et-th.html"
    }
  ],
  "dangerZones": [
    {
      "label": "อากาศร้อนจัด/ฮีทสโตรก",
      "severity": "high",
      "note": "งานบุญ/เทศกาลช่วงหน้าร้อนควรระวังการขาดน้ำ",
      "season": "มี.ค.-พ.ค."
    },
    {
      "label": "ฝนหนัก-น้ำท่วมขังบางพื้นที่",
      "severity": "medium",
      "note": "ถนนในเมืองและชุมชนลุ่มต่ำอาจมีน้ำท่วมขังช่วงฝน",
      "season": "ก.ย.-ต.ค."
    },
    {
      "label": "หมอกควัน/PM2.5 ช่วงหน้าแล้ง",
      "severity": "medium",
      "note": "อาจเกิดเป็นช่วง ๆ",
      "season": "ม.ค.-เม.ย."
    }
  ],
  "ecoIds": [
    "f_dog_stray",
    "t_urban",
    "c_heat_stroke",
    "c_flash_flood",
    "c_pm25",
    "c_monsoon"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิประมาณ 18-38°C, หนาวแห้งพ.ย.-ก.พ., ร้อนจัดมี.ค.-พ.ค., ฝนพ.ค.-ต.ค.",
    "terrain": "ที่ราบสูง-ที่ราบลุ่มเกษตรกรรม มีแหล่งน้ำและบึงในเขตเมือง",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "ททท.สำนักงานขอนแก่น (ดูแลร้อยเอ็ด)",
        "number": "043-227714"
      },
      {
        "label": "ททท.สำนักงานขอนแก่น (ดูแลร้อยเอ็ด)",
        "number": "043-227715"
      }
    ]
  }
},
  "Maha Sarakham": {
  "transport": [
    {
      "name": "รถสองแถว/รถรับจ้างในตัวเมืองมหาสารคาม",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "ใช้วิ่งในเมืองและไปโซนมหาวิทยาลัย/อำเภอใกล้เคียง",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#22c55e"
    },
    {
      "name": "รถตุ๊กตุ๊ก/สามล้อเครื่อง",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "พบได้ในตัวเมืองและย่านตลาด",
      "warpUrl": "",
      "logoText": "🛺",
      "color": "#a855f7"
    },
    {
      "name": "วินมอเตอร์ไซค์",
      "shortName": "วินมอเตอร์ไซค์",
      "type": "bike",
      "description": "สะดวกสำหรับระยะสั้น โดยเฉพาะโซนท่าขอนยาง/แหล่งชุมชน",
      "warpUrl": "",
      "logoText": "🏍️",
      "color": "#10b981"
    },
    {
      "name": "รถบัส/รถทัวร์เชื่อมจังหวัดใกล้เคียง",
      "shortName": "รถบัส",
      "type": "bus",
      "description": "เชื่อมมหาสารคามกับขอนแก่น ร้อยเอ็ด กาฬสินธุ์",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#f97316"
    },
    {
      "name": "เรียกรถ/เหมารถ",
      "shortName": "เหมารถ",
      "type": "other",
      "description": "เหมาะกับการออกนอกเมืองหรือเที่ยวหลายอำเภอในวันเดียว",
      "warpUrl": "",
      "logoText": "🚗",
      "color": "#64748b"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ (หมอชิต2) - มหาสารคาม (รถทัวร์)",
      "type": "coach",
      "operator": "รุ่งประเสริฐทัวร์",
      "from": "กรุงเทพฯ",
      "to": "จุดจอดเมืองมหาสารคาม",
      "via": [
        "สระบุรี",
        "นครราชสีมา",
        "ขอนแก่น"
      ],
      "departureTimes": [
        "09:15",
        "17:30"
      ],
      "duration": "7-8 ชม.",
      "baseFare": 466,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": "รถบางรอบจอดที่ “สำนักงานรุ่งประเสริฐทัวร์” ในตัวเมือง"
    },
    {
      "name": "สาย 2: ขอนแก่น - มหาสารคาม (รถตู้)",
      "type": "van",
      "operator": "คิวรถตู้ขอนแก่น",
      "from": "บขส.ขอนแก่น",
      "to": "มหาสารคาม",
      "via": [],
      "departureTimes": [
        "06:30",
        "09:30",
        "13:30"
      ],
      "duration": "1-1.5 ชม.",
      "baseFare": 60,
      "frequency": "ทุก 30-60 นาที (โดยประมาณ)",
      "terminal": "บขส.ขอนแก่น",
      "notes": null
    },
    {
      "name": "สาย 3: เมืองมหาสารคาม - ท่าขอนยาง (รถสองแถว/รถตู้)",
      "type": "van",
      "operator": "รถท้องถิ่น (ท่าขอนยาง)",
      "from": "ตัวเมืองมหาสารคาม",
      "to": "ท่าขอนยาง",
      "via": [],
      "departureTimes": [
        "07:00",
        "12:00",
        "17:00"
      ],
      "duration": "30-60 นาที",
      "baseFare": 30,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "คิวรถท้องถิ่นในเมือง",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "แจ่วฮ้อนท่าขอนยาง",
      "priceRange": "80-200฿",
      "category": "local",
      "note": "ได้รับคัดเลือกเป็น 1 จังหวัด 1 เมนู เชิดชูอาหรถิ่น"
    },
    {
      "name": "ข้าวหอมมะลิทุ่งกุลาร้องไห้ (GI)",
      "priceRange": "50-120฿/กก.",
      "category": "local",
      "note": "พื้นที่ทุ่งกุลาในหลายจังหวัดรวมมหาสารคาม"
    },
    {
      "name": "ปลาแดกบอง/แจ่วบอง",
      "priceRange": "30-120฿",
      "category": "local",
      "note": "เครื่องจิ้ม/กับข้าวยอดนิยมของอีสาน"
    },
    {
      "name": "ข้าวเม่าคลุก",
      "priceRange": "25-60฿",
      "category": "dessert",
      "note": "ขนมพื้นบ้านจากข้าวเม่า"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "350-900฿/คืน",
      "examples": [
        "HOP INN Maha Sarakham",
        "B2 Maha Sarakham Boutique & Budget Hotel",
        "The Chill Town Home"
      ],
      "bookingUrl": null
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "900-1,900฿/คืน",
      "examples": [
        "Taksila Hotel",
        "Siamtara Palace Hotel",
        "The Orchid Resort & Relax"
      ],
      "bookingUrl": null
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1,800-3,500฿/คืน",
      "examples": [
        "Taksila Hotel (Suite)",
        "Siamtara Palace Hotel (Premium)",
        "The Orchid Resort & Relax (Villa)"
      ],
      "bookingUrl": null
    }
  ],
  "dangerZones": [
    {
      "label": "อากาศร้อนจัด/ฮีทสโตรก",
      "severity": "high",
      "note": "การเดินทางในเมืองช่วงกลางวันควรหลีกเลี่ยงแดดจัด",
      "season": "มี.ค.-พ.ค."
    },
    {
      "label": "ฝนหนัก-น้ำท่วมขังบนถนนในเมือง",
      "severity": "medium",
      "note": "บางจุดอาจมีน้ำท่วมขังทำให้การจราจรชะลอ",
      "season": "ก.ย.-ต.ค."
    },
    {
      "label": "หมอกควัน/PM2.5 ช่วงหน้าแล้ง",
      "severity": "medium",
      "note": "อาจเกิดเป็นช่วง ๆ",
      "season": "ม.ค.-เม.ย."
    }
  ],
  "ecoIds": [
    "f_dog_stray",
    "t_urban",
    "c_heat_stroke",
    "c_flash_flood",
    "c_pm25",
    "c_monsoon"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิประมาณ 18-38°C, หนาวแห้งพ.ย.-ก.พ., ร้อนจัดมี.ค.-พ.ค., ฝนพ.ค.-ต.ค.",
    "terrain": "ที่ราบสูง-เมืองมหาวิทยาลัย มีชุมชนหนาแน่นรอบโซนท่าขอนยาง",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "ททท.สำนักงานขอนแก่น (ดูแลมหาสารคาม)",
        "number": "043-227714"
      },
      {
        "label": "ททท.สำนักงานขอนแก่น (ดูแลมหาสารคาม)",
        "number": "043-227715"
      }
    ]
  }
},
  "Yasothon": {
  "transport": [
    {
      "name": "รถสองแถว/รถรับจ้างในตัวเมืองยโสธร",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "ใช้วิ่งในเมืองและไปอำเภอ เช่น กุดชุม คำเขื่อนแก้ว",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#22c55e"
    },
    {
      "name": "รถตุ๊กตุ๊ก/สามล้อเครื่อง",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "พบได้ในตัวเมือง ใกล้ตลาดและสถานีขนส่ง",
      "warpUrl": "",
      "logoText": "🛺",
      "color": "#a855f7"
    },
    {
      "name": "วินมอเตอร์ไซค์",
      "shortName": "วินมอเตอร์ไซค์",
      "type": "bike",
      "description": "สะดวกสำหรับระยะสั้นในเขตเมือง",
      "warpUrl": "",
      "logoText": "🏍️",
      "color": "#10b981"
    },
    {
      "name": "รถบัส/รถทัวร์เชื่อมจังหวัด",
      "shortName": "รถบัส",
      "type": "bus",
      "description": "เชื่อมยโสธรกับร้อยเอ็ด อำนาจเจริญ อุบลราชธานี",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#f97316"
    },
    {
      "name": "รถเช่า/เหมารถ",
      "shortName": "เหมารถ",
      "type": "other",
      "description": "เหมาะกับเที่ยวงานบุญบั้งไฟและสถานที่นอกเมือง",
      "warpUrl": "",
      "logoText": "🚗",
      "color": "#64748b"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ (หมอชิต2) - ยโสธร (รถทัวร์)",
      "type": "coach",
      "operator": "เชิดชัยทัวร์",
      "from": "กรุงเทพฯ",
      "to": "บขส.ยโสธร",
      "via": [
        "สระบุรี",
        "นครราชสีมา",
        "ขอนแก่น",
        "ร้อยเอ็ด"
      ],
      "departureTimes": [
        "18:30",
        "20:00",
        "20:30"
      ],
      "duration": "8-9 ชม.",
      "baseFare": 443,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 2: กรุงเทพฯ (หมอชิต2) - ยโสธร (รถทัวร์)",
      "type": "coach",
      "operator": "ไทยสงวนทัวร์",
      "from": "กรุงเทพฯ",
      "to": "บขส.ยโสธร",
      "via": [
        "สระบุรี",
        "นครราชสีมา",
        "ขอนแก่น",
        "ร้อยเอ็ด"
      ],
      "departureTimes": [
        "19:30"
      ],
      "duration": "8-9 ชม.",
      "baseFare": 530,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 3: ยโสธร - อุบลราชธานี (รถตู้/รถบัส)",
      "type": "van",
      "operator": "คิวรถตู้ยโสธร",
      "from": "บขส.ยโสธร",
      "to": "อุบลราชธานี",
      "via": [
        "อำนาจเจริญ"
      ],
      "departureTimes": [
        "07:00",
        "11:00",
        "15:00"
      ],
      "duration": "2.5-3.5 ชม.",
      "baseFare": 120,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "บขส.ยโสธร",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "อั่วกบ (กบยัดไส้)",
      "priceRange": "60-150฿",
      "category": "local",
      "note": "ได้รับคัดเลือกเป็น 1 จังหวัด 1 เมนู เชิดชูอาหรถิ่น"
    },
    {
      "name": "แตงโมหวานยโสธร (GI)",
      "priceRange": "20-60฿/กก.",
      "category": "local",
      "note": "ผลผลิต GI ตามฤดูกาล"
    },
    {
      "name": "ข้าวกาบาพร้อมชงดื่ม",
      "priceRange": "15-40฿",
      "category": "drink",
      "note": "ผลิตภัณฑ์เด่นของชุมชน/ของฝาก"
    },
    {
      "name": "ข้าวปุ้นน้ำงัว",
      "priceRange": "40-90฿",
      "category": "street",
      "note": "เมนูข้าวปุ้นแบบยโสธร (พบได้ตามร้านท้องถิ่น)"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "350-900฿/คืน",
      "examples": [
        "Hop Inn Yasothon",
        "The One Place Hotel",
        "Yasothon Green Park Resort"
      ],
      "bookingUrl": "https://www.agoda.com/city/yasothon-th.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "900-1,900฿/คืน",
      "examples": [
        "The Zen Hotel Yasothon",
        "Noble Place Hotel Yasothon",
        "Ayara Spa Resort"
      ],
      "bookingUrl": "https://www.agoda.com/city/yasothon-th.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1,800-3,500฿/คืน",
      "examples": [
        "The Zen Hotel Yasothon (Suite)",
        "Ayara Spa Resort (Villa)",
        "Easarninn Yasothorn"
      ],
      "bookingUrl": "https://www.agoda.com/city/yasothon-th.html"
    }
  ],
  "dangerZones": [
    {
      "label": "อากาศร้อนจัด/ฮีทสโตรก",
      "severity": "high",
      "note": "งานกลางแจ้ง โดยเฉพาะช่วงบุญบั้งไฟ ควรระวังแดดและความแออัด",
      "season": "มี.ค.-พ.ค."
    },
    {
      "label": "ฝนหนัก-ถนนลื่น",
      "severity": "medium",
      "note": "เดินทางข้ามอำเภอช่วงฝนตกควรเผื่อเวลา",
      "season": "ก.ค.-ต.ค."
    },
    {
      "label": "หมอกควัน/PM2.5 ช่วงหน้าแล้ง",
      "severity": "medium",
      "note": "อาจเกิดเป็นช่วง ๆ",
      "season": "ม.ค.-เม.ย."
    }
  ],
  "ecoIds": [
    "f_dog_stray",
    "t_urban",
    "c_heat_stroke",
    "c_flash_flood",
    "c_pm25",
    "c_monsoon"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิประมาณ 18-38°C, หนาวแห้งพ.ย.-ก.พ., ร้อนจัดมี.ค.-พ.ค., ฝนพ.ค.-ต.ค.",
    "terrain": "ที่ราบสูง-พื้นที่เกษตรกรรม มีงานประเพณีบั้งไฟโดดเด่น",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "ททท.สำนักงานอุบลราชธานี (ดูแลยโสธร)",
        "number": "045-243770"
      },
      {
        "label": "ททท.สำนักงานอุบลราชธานี (ดูแลยโสธร)",
        "number": "045-250714"
      }
    ]
  }
},
  "Amnat Charoen": {
  "transport": [
    {
      "name": "รถสองแถว/รถรับจ้างในตัวเมืองอำนาจเจริญ",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "ใช้วิ่งในเมืองและเชื่อมอำเภอ เช่น หัวตะพาน ปทุมราชวงศา",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#22c55e"
    },
    {
      "name": "รถตุ๊กตุ๊ก/สามล้อเครื่อง",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "พบได้ในตัวเมือง ใกล้ตลาดและจุดชุมชน",
      "warpUrl": "",
      "logoText": "🛺",
      "color": "#a855f7"
    },
    {
      "name": "วินมอเตอร์ไซค์",
      "shortName": "วินมอเตอร์ไซค์",
      "type": "bike",
      "description": "ตัวเลือกเร็วสำหรับเดินทางระยะสั้นในเมือง",
      "warpUrl": "",
      "logoText": "🏍️",
      "color": "#10b981"
    },
    {
      "name": "รถบัส/รถทัวร์เชื่อมจังหวัด",
      "shortName": "รถบัส",
      "type": "bus",
      "description": "เชื่อมอำนาจเจริญกับยโสธร อุบลราชธานี และกรุงเทพฯ",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#f97316"
    },
    {
      "name": "รถเช่า/เหมารถ",
      "shortName": "เหมารถ",
      "type": "other",
      "description": "เหมาะกับเที่ยวหลายอำเภอ/เส้นทางชนบท",
      "warpUrl": "",
      "logoText": "🚗",
      "color": "#64748b"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ (หมอชิต2) - อำนาจเจริญ (รถทัวร์)",
      "type": "coach",
      "operator": "บริษัท จิรัฐกาล ทรานสปอร์ต จำกัด",
      "from": "กรุงเทพฯ",
      "to": "บขส.อำนาจเจริญ",
      "via": [
        "สระบุรี",
        "นครราชสีมา",
        "ขอนแก่น",
        "ร้อยเอ็ด",
        "ยโสธร"
      ],
      "departureTimes": [
        "08:40",
        "20:40"
      ],
      "duration": "9-11 ชม.",
      "baseFare": 666,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 2: กรุงเทพฯ (หมอชิต2) - อำนาจเจริญ (รถนอน/รถด่วน)",
      "type": "coach",
      "operator": "เขมราฐรุ่งเรืองทัวร์",
      "from": "กรุงเทพฯ",
      "to": "บขส.อำนาจเจริญ",
      "via": [
        "สระบุรี",
        "นครราชสีมา",
        "ขอนแก่น",
        "ร้อยเอ็ด",
        "ยโสธร"
      ],
      "departureTimes": [
        "19:00",
        "20:20"
      ],
      "duration": "8-10 ชม.",
      "baseFare": 888,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": "รถนอนเหมาะกับเดินทางกลางคืน โปรดไปถึงจุดขึ้นรถก่อนเวลา"
    },
    {
      "name": "สาย 3: อำนาจเจริญ - อุบลราชธานี (รถตู้/รถบัส)",
      "type": "van",
      "operator": "คิวรถตู้ในตัวเมืองอำนาจเจริญ",
      "from": "ตัวเมืองอำนาจเจริญ",
      "to": "อุบลราชธานี",
      "via": [],
      "departureTimes": [
        "07:00",
        "11:00",
        "15:00"
      ],
      "duration": "1.5-2.5 ชม.",
      "baseFare": 90,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "คิวรถตู้/บขส.อำนาจเจริญ",
      "notes": null
    }
  ],
  "localFoods": [
    {
      "name": "อู๋พุงปลา",
      "priceRange": "50-180฿",
      "category": "local",
      "note": "ได้รับคัดเลือกเป็น 1 จังหวัด 1 เมนู เชิดชูอาหรถิ่น"
    },
    {
      "name": "เนื้อแห้ง 100 ปี",
      "priceRange": "100-250฿",
      "category": "local",
      "note": "ของฝากขึ้นชื่อของอำนาจเจริญ"
    },
    {
      "name": "อาหารอีสานพื้นบ้าน (ปลาร้า/แจ่ว/ลาบ)",
      "priceRange": "40-120฿",
      "category": "local",
      "note": "รสจัด เค็ม-นัว ตามสไตล์อีสาน"
    },
    {
      "name": "ข้าวเหนียว/ข้าวหอมมะลิท้องถิ่น",
      "priceRange": "20-60฿/กก.",
      "category": "local",
      "note": null
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "350-900฿/คืน",
      "examples": [
        "Nakarin Hotel",
        "โรงแรมเพ็ญพิศ",
        "The C hotel"
      ],
      "bookingUrl": "https://www.agoda.com/city/amnat-charoen-th.html"
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "900-1,900฿/คืน",
      "examples": [
        "Faikid Hotel",
        "Leelawadee View Resort (Amnatcharoen)",
        "The C hotel (Private Room)"
      ],
      "bookingUrl": "https://www.agoda.com/city/amnat-charoen-th.html"
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1,800-3,500฿/คืน",
      "examples": [
        "Leelawadee View Resort (Garden View)",
        "Faikid Hotel (Suite)",
        "The C hotel (Family Room)"
      ],
      "bookingUrl": "https://www.agoda.com/city/amnat-charoen-th.html"
    }
  ],
  "dangerZones": [
    {
      "label": "อากาศร้อนจัด/ฮีทสโตรก",
      "severity": "high",
      "note": "พื้นที่ส่วนใหญ่เป็นที่ราบ เปิดโล่ง แดดแรง",
      "season": "มี.ค.-พ.ค."
    },
    {
      "label": "ฝนหนัก-น้ำท่วมขังในชุมชนลุ่มต่ำ",
      "severity": "medium",
      "note": "ช่วงฝนตกต่อเนื่องอาจมีน้ำท่วมขัง",
      "season": "ก.ย.-ต.ค."
    },
    {
      "label": "หมอกควัน/PM2.5 ช่วงหน้าแล้ง",
      "severity": "medium",
      "note": "อาจเกิดเป็นช่วง ๆ จากการเผาในที่โล่ง",
      "season": "ม.ค.-เม.ย."
    }
  ],
  "ecoIds": [
    "f_dog_stray",
    "t_urban",
    "c_heat_stroke",
    "c_flash_flood",
    "c_pm25",
    "c_monsoon"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิประมาณ 18-38°C, หนาวแห้งพ.ย.-ก.พ., ร้อนจัดมี.ค.-พ.ค., ฝนพ.ค.-ต.ค.",
    "terrain": "ที่ราบสูง-เกษตรกรรม มีชุมชนเมืองขนาดกลางและเส้นทางเชื่อมอุบลฯ-ยโสธร",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "ททท.สำนักงานอุบลราชธานี (ดูแลอำนาจเจริญ)",
        "number": "045-243770"
      },
      {
        "label": "ททท.สำนักงานอุบลราชธานี (ดูแลอำนาจเจริญ)",
        "number": "045-250714"
      }
    ]
  }
},
  "Chaiyaphum": {
  "transport": [
    {
      "name": "รถสองแถว/รถรับจ้างในตัวเมืองชัยภูมิ",
      "shortName": "สองแถว",
      "type": "songthaew",
      "description": "มีสายวิ่งในเมืองและไปอำเภอ เช่น เทพสถิต ภูเขียว",
      "warpUrl": "",
      "logoText": "🛻",
      "color": "#22c55e"
    },
    {
      "name": "รถตุ๊กตุ๊ก/สามล้อเครื่อง",
      "shortName": "ตุ๊กตุ๊ก",
      "type": "tuk_tuk",
      "description": "พบได้ในตัวเมือง สำหรับระยะสั้น",
      "warpUrl": "",
      "logoText": "🛺",
      "color": "#a855f7"
    },
    {
      "name": "วินมอเตอร์ไซค์",
      "shortName": "วินมอเตอร์ไซค์",
      "type": "bike",
      "description": "ใช้เดินทางระยะสั้นในเมืองและต่อรถจาก บขส.",
      "warpUrl": "",
      "logoText": "🏍️",
      "color": "#10b981"
    },
    {
      "name": "รถบัส/รถทัวร์เชื่อมจังหวัด",
      "shortName": "รถบัส",
      "type": "bus",
      "description": "เชื่อมชัยภูมิกับกรุงเทพฯ นครราชสีมา ขอนแก่น",
      "warpUrl": "",
      "logoText": "🚌",
      "color": "#f97316"
    },
    {
      "name": "รถเช่า/เหมารถ",
      "shortName": "เหมรถ",
      "type": "other",
      "description": "เหมาะกับเที่ยวโซนอุทยาน/ภูเขาที่รถประจำทางไปไม่ถึง",
      "warpUrl": "",
      "logoText": "🚗",
      "color": "#64748b"
    }
  ],
  "routes": [
    {
      "name": "สาย 1: กรุงเทพฯ (หมอชิต2) - ชัยภูมิ (รถทัวร์ VIP)",
      "type": "coach",
      "operator": "เทียนไชยแอร์",
      "from": "กรุงเทพฯ",
      "to": "บขส.ชัยภูมิ",
      "via": [
        "สระบุรี",
        "นครราชสีมา (ปากช่อง)"
      ],
      "departureTimes": [
        "20:00"
      ],
      "duration": "5-6 ชม.",
      "baseFare": 292,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 2: กรุงเทพฯ (หมอชิต2) - ชัยภูมิ (รถทัวร์)",
      "type": "coach",
      "operator": "บริษัท ขนส่ง จำกัด (บขส.)",
      "from": "กรุงเทพฯ",
      "to": "บขส.ชัยภูมิ",
      "via": [
        "สระบุรี",
        "นครราชสีมา (ปากช่อง)"
      ],
      "departureTimes": [
        "19:30",
        "20:00",
        "20:05"
      ],
      "duration": "5-7 ชม.",
      "baseFare": 455,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "สถานีขนส่งหมอชิต 2",
      "notes": null
    },
    {
      "name": "สาย 3: เมืองชัยภูมิ - เทพสถิต/อุทยานฯ (รถตู้/รถบัสท้องถิ่น)",
      "type": "van",
      "operator": "คิวรถตู้ชัยภูมิ",
      "from": "บขส.ชัยภูมิ",
      "to": "เทพสถิต",
      "via": [],
      "departureTimes": [
        "07:00",
        "11:00",
        "15:00"
      ],
      "duration": "1.5-2.5 ชม.",
      "baseFare": 80,
      "frequency": "วันละหลายเที่ยว",
      "terminal": "บขส.ชัยภูมิ",
      "notes": "หากไปแหล่งธรรมชาติ (เช่น ทุ่งดอกกระเจียว) อาจต้องต่อรถ/เหมรถ"
    }
  ],
  "localFoods": [
    {
      "name": "คั่วเนื้อคั่วปลา",
      "priceRange": "60-180฿",
      "category": "local",
      "note": "ได้รับคัดเลือกเป็น 1 จังหวัด 1 เมนู เชิดชูอาหรถิ่น"
    },
    {
      "name": "หม่ำชัยภูมิ",
      "priceRange": "80-200฿",
      "category": "local",
      "note": "ไส้กรอก/หม่ำเป็นของดีขึ้นชื่อของจังหวัด"
    },
    {
      "name": "ส้มโอทองดีบ้านแท่น",
      "priceRange": "40-120฿/ลูก",
      "category": "local",
      "note": "ผลไม้เด่นของพื้นที่บ้านแท่น"
    },
    {
      "name": "กล้วยหอมทองหนองบัวแดง",
      "priceRange": "20-60฿/หวี",
      "category": "local",
      "note": "ผลไม้เด่นของพื้นที่หนองบัวแดง"
    }
  ],
  "accommodation": [
    {
      "tier": "budget",
      "label": "ประหยัด",
      "priceRange": "350-900฿/คืน",
      "examples": [
        "Tonkhoon Hotel",
        "B2 Chaiyaphum Boutique & Budget Hotel",
        "Chaiyaphum City Hotel"
      ],
      "bookingUrl": null
    },
    {
      "tier": "midrange",
      "label": "ปานกลาง",
      "priceRange": "900-1,900฿/คืน",
      "examples": [
        "Tonkhoon Hotel (Deluxe)",
        "Lertnimitra Hotel",
        "Siam River Resort"
      ],
      "bookingUrl": null
    },
    {
      "tier": "premium",
      "label": "หรูหรา",
      "priceRange": "1,800-3,500฿/คืน",
      "examples": [
        "Siam River Resort (Suite)",
        "Lertnimitra Hotel (Suite)",
        "Tonkhoon Hotel (Suite)"
      ],
      "bookingUrl": null
    }
  ],
  "dangerZones": [
    {
      "label": "อากาศร้อนจัด/ฮีทสโตรก",
      "severity": "high",
      "note": "เที่ยวอุทยาน/ลานหินช่วงแดดจัดเสี่ยงฮีทสโตรก",
      "season": "มี.ค.-พ.ค."
    },
    {
      "label": "ฝนหนัก-น้ำป่าไหลหลากในเขตภูเขา",
      "severity": "medium",
      "note": "ทางขึ้น-ลงภูเขาและลำห้วยอาจเกิดน้ำหลากฉับพลัน",
      "season": "ก.ค.-ต.ค."
    },
    {
      "label": "หมอกควัน/PM2.5 ช่วงหน้าแล้ง",
      "severity": "medium",
      "note": "อาจเกิดเป็นช่วง ๆ",
      "season": "ม.ค.-เม.ย."
    }
  ],
  "ecoIds": [
    "f_dog_stray",
    "t_mountain",
    "t_cave",
    "t_urban",
    "c_heat_stroke",
    "c_flash_flood",
    "c_pm25",
    "c_monsoon"
  ],
  "newEcoEntities": [],
  "metadata": {
    "climate": "อุณหภูมิประมาณ 16-37°C, หนาวแห้งพ.ย.-ก.พ., ร้อนจัดมี.ค.-พ.ค., ฝนพ.ค.-ต.ค.",
    "terrain": "มีทั้งที่ราบและแนวเขา/อุทยานทางฝั่งเทพสถิต เหมาะกับเที่ยวธรรมชาติ",
    "bestSeason": "พ.ย.-ก.พ.",
    "emergencyContacts": [
      {
        "label": "ททท.สำนักงานนครราชสีมา (ดูแลชัยภูมิ)",
        "number": "044-213030"
      },
      {
        "label": "ททท.สำนักงานนครราชสีมา (ดูแลชัยภูมิ)",
        "number": "044-213666"
      }
    ]
  }
}
};
