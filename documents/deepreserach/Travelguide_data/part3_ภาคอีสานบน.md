# Thailand Travel Guide Province Dataset for 10 Northeastern Provinces

## TL;DR
A copy/paste-ready JSON payload is included below for **Khon Kaen, Udon Thani, Nong Khai, Nong Bua Lam Phu, Loei, Sakon Nakhon, Nakhon Phanom, Mukdahan, Kalasin, Bueng Kan**. Province geography context is anchored to official **TAT** province/regional pages, “signature local dishes” are anchored to the official **1 จังหวัด 1 เมนู** list, GI products come from Thailand’s **Department of Intellectual Property (GI)** documents, train facts come from **SRT**, climate/season logic comes from **TMD**, and accommodation examples are real properties referenced from **Booking.com** pages. citeturn35search0turn35search1turn35search2turn35search3turn36search3turn37search8turn33search4turn32search0turn21search6turn31search1turn41view0turn34search0turn25search1turn26search2

## Evidence base and reliability notes
Province-level “shape” (border/river/mountains/major attractions) was pulled from official Tourism Authority of Thailand province pages—e.g., Nong Khai and Bueng Kan are explicitly framed as Mekong-border provinces, and Loei is explicitly described as mountainous with cooler, foggier conditions. citeturn35search2turn35search3turn36search3turn37search8

For **อาหารท้องถิ่นที่ “เฉพาะจังหวัด” จริง**: the dataset uses the official “1 จังหวัด 1 เมนู เชิดชูอาหารถิ่น” list for all 10 provinces (e.g., Khon Kaen: ปลาแดกบองสมุนไพร; Bueng Kan: หมกหม้อปลาน้ำโขง; Mukdahan: ตำเมี่ยงตะไคร้ ลำข่าสดใส่มดแดง; etc.). Where additional dishes are included, they are tied to TAT articles/pages and/or official provincial content (not random blogs). citeturn33search4turn33search6turn31search7turn31search3turn23search4turn30search0turn30search10

For **air routes**, operators are anchored to public airline/route pages and flight meta aggregators (used only to identify “which carriers fly direct,” not to guarantee exact departure times). citeturn43search9turn43search10turn44search1turn44search2turn44search4

For **rail**, the dataset anchors the Bangkok–Nong Khai corridor (and its fare point) to SRT’s official “popular train” page. citeturn41view0

For **accommodation**, the examples are real properties taken from Booking.com landing pages that show active listings and (in many cases) “updated prices 2026.” citeturn25search1turn25search0turn25search2turn25search3turn26search0turn26search2turn26search3turn27search1turn27search6turn28search11turn28search5

## Data modeling assumptions and update strategy
Season windows and weather-risk seasonality follow Thai Meteorological Department’s national season definitions (hot: mid‑Feb–mid‑May; rainy: mid‑May–mid‑Oct; cool: mid‑Oct–mid‑Feb). citeturn34search0

PM2.5 risk is emphasized mainly in the **dry season / burning season** (roughly Dec–Apr) using Pollution Control Department reporting and related coverage that highlights elevated PM2.5 in the North and Northeast. citeturn34search2turn34search6

Flood/flash-flood logic is tied to DDPM situation reports/warnings that explicitly caution about heavy rain accumulation leading to flash floods, runoff, and landslides (especially near slopes/waterways). citeturn34search3turn34search7

Transport colors and emojis are a stable UI convention (deterministic mapping by transport type). Route departureTimes and baseFare are **representative** for UX seeding and should be refreshed via an ingestion job (airline APIs/feeds, bus operator feeds, or your own scraping pipeline) if you want “live schedule” correctness; this is especially relevant for flights and intercity vans because the operator mix and frequencies can change quickly. citeturn34search0turn43search10turn44search4

## Province dataset JSON
```json
{
  "Khon Kaen": {
    "transport": [
      {
        "name": "สนามบินขอนแก่น",
        "shortName": "สนามบิน",
        "type": "plane",
        "description": "สนามบินภายในประเทศ ใช้ต่อเครื่องบินจากกรุงเทพฯได้สะดวก",
        "warpUrl": "https://www.airports.go.th/",
        "logoText": "✈️",
        "color": "#ef4444"
      },
      {
        "name": "รถไฟทางไกลสายตะวันออกเฉียงเหนือ (สถานีขอนแก่น)",
        "shortName": "รถไฟ",
        "type": "rail",
        "description": "มีขบวนรถไฟจากกรุงเทพฯและเมืองหลักตามแนวสายอีสาน",
        "warpUrl": "https://www.railway.co.th/",
        "logoText": "🚆",
        "color": "#1f2937"
      },
      {
        "name": "รถโดยสารประจำทาง/รถซิตี้บัสเมืองขอนแก่น",
        "shortName": "รถบัส",
        "type": "bus",
        "description": "ใช้เดินทางในตัวเมืองและเชื่อมจุดสำคัญ เช่น มหาวิทยาลัย-ห้าง-สถานีขนส่ง",
        "warpUrl": "",
        "logoText": "🚌",
        "color": "#3b82f6"
      },
      {
        "name": "รถสองแถวในตัวเมืองขอนแก่น",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "วิ่งตามสายหลักในเมืองและบางอำเภอ เหมาะกับเที่ยวระยะสั้น",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#f97316"
      },
      {
        "name": "รถตุ๊กตุ๊ก/สามล้อเครื่องในเมืองขอนแก่น",
        "shortName": "ตุ๊กตุ๊ก",
        "type": "tuk_tuk",
        "description": "เรียกใช้ได้ตามย่านชุมชน ต่อรองราคา/กดมิเตอร์ตามพื้นที่",
        "warpUrl": "",
        "logoText": "🛺",
        "color": "#a855f7"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ - ขอนแก่น (เครื่องบิน)",
        "type": "plane",
        "operator": "Thai AirAsia / Thai Vietjet / Thai Lion Air (ตามฤดูกาล)",
        "from": "กรุงเทพฯ (DMK/BKK)",
        "to": "ขอนแก่น (KKC)",
        "via": [],
        "departureTimes": [
          "07:00",
          "11:30",
          "19:00"
        ],
        "duration": "1 ชม. 00-15 นาที",
        "baseFare": 1200,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สนามบินดอนเมือง/สุวรรณภูมิ",
        "notes": "ตารางบินและสายการบินเปลี่ยนได้บ่อย ให้ตรวจสอบก่อนจอง"
      },
      {
        "name": "สาย 2: กรุงเทพฯ - ขอนแก่น (รถทัวร์)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
        "from": "กรุงเทพฯ",
        "to": "ขอนแก่น (บขส.3)",
        "via": [
          "สระบุรี",
          "นครราชสีมา"
        ],
        "departureTimes": [
          "07:00",
          "10:00",
          "20:30"
        ],
        "duration": "6-7 ชม.",
        "baseFare": 520,
        "frequency": "ประมาณทุก 1-2 ชม.",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 3: กรุงเทพฯ - ขอนแก่น (รถไฟ)",
        "type": "train",
        "operator": "การรถไฟแห่งประเทศไทย (SRT)",
        "from": "กรุงเทพฯ (สถานีกลางกรุงเทพอภิวัฒน์)",
        "to": "ขอนแก่น (สถานีขอนแก่น)",
        "via": [
          "สระบุรี",
          "นครราชสีมา"
        ],
        "departureTimes": [
          "08:45",
          "20:30"
        ],
        "duration": "7-9 ชม.",
        "baseFare": 300,
        "frequency": "หลายขบวน/วัน",
        "terminal": "สถานีกลางกรุงเทพอภิวัฒน์",
        "notes": "ราคา/เวลาขึ้นกับชั้นรถและขบวน"
      },
      {
        "name": "สาย 4: เมืองขอนแก่น - ภูเวียง/พิพิธภัณฑ์ไดโนเสาร์ภูเวียง",
        "type": "bus",
        "operator": "รถโดยสารท้องถิ่น/คิวรถ บขส.ขอนแก่น",
        "from": "ขอนแก่น (บขส.3)",
        "to": "อ.ภูเวียง",
        "via": [],
        "departureTimes": [
          "07:30",
          "10:00",
          "13:30"
        ],
        "duration": "1.5-2 ชม.",
        "baseFare": 70,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สถานีขนส่งผู้โดยสาร จ.ขอนแก่น แห่งที่ 3",
        "notes": "เหมาะต่อไปพิพิธภัณฑ์/แหล่งไดโนเสาร์ ควรถามรอบสุดท้ายที่คิวรถ"
      }
    ],
    "localFoods": [
      {
        "name": "ปลาแดกบองสมุนไพร",
        "priceRange": "40-80฿",
        "category": "local",
        "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
      },
      {
        "name": "ไก่ย่างเขาสวนกวาง",
        "priceRange": "120-220฿",
        "category": "local",
        "note": "ของขึ้นชื่อขอนแก่น มีงานเทศกาลไก่ย่างเขาสวนกวาง"
      },
      {
        "name": "ส้มตำปลาร้าขอนแก่น (แนวปลาร้าเข้ม)",
        "priceRange": "40-70฿",
        "category": "street",
        "note": "นิยมกินคู่ไก่ย่าง/ลาบ"
      },
      {
        "name": "ลาบหมู/ลาบเป็ดแบบอีสาน (ข้าวคั่วหอม)",
        "priceRange": "50-100฿",
        "category": "street",
        "note": null
      },
      {
        "name": "ข้าวจี่ (ข้าวเหนียวย่างทาไข่)",
        "priceRange": "15-30฿",
        "category": "street",
        "note": "พบมากช่วงหน้าหนาวและงานวัด"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "450-900฿/คืน",
        "examples": [
          "HOP INN Khon Kaen",
          "Khonkaen Residence",
          "Family Hotel Khon Kaen"
        ],
        "bookingUrl": "https://www.booking.com/city/th/khon-kaen.th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "900-1,900฿/คืน",
        "examples": [
          "Kosa Hotel",
          "Le cassia Hotel",
          "The Cotton Tree Hometel"
        ],
        "bookingUrl": "https://www.booking.com/city/th/khon-kaen.th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2,000-4,500฿/คืน",
        "examples": [
          "Avani Khon Kaen Hotel & Convention Centre",
          "The Heritage Grand Khon Kaen Hotel and Convention"
        ],
        "bookingUrl": "https://www.booking.com/city/th/khon-kaen.th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
        "severity": "medium",
        "note": "ช่วงหน้าร้อนอีสานอุณหภูมิสูง ควรดื่มน้ำและหลบแดด",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "พายุฤดูร้อน ฟ้าผ่า/ลมกระโชกแรง",
        "severity": "medium",
        "note": "ช่วงเปลี่ยนฤดูมักมีฝนฟ้าคะนองฉับพลัน",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "น้ำท่วมขัง/น้ำหลากตามลำน้ำและพื้นที่ลุ่ม",
        "severity": "medium",
        "note": "ฤดูฝนมีโอกาสเกิดน้ำท่วมขังและน้ำป่าในบางอำเภอ",
        "season": "พ.ค.-ต.ค."
      },
      {
        "label": "PM2.5 จากการเผาในที่โล่ง",
        "severity": "medium",
        "note": "ช่วงปลายหนาว-หน้าแล้งคุณภาพอากาศแย่ได้",
        "season": "ธ.ค.-เม.ย."
      }
    ],
    "ecoIds": [
      "t_urban",
      "t_cave",
      "c_heat_stroke",
      "c_monsoon",
      "c_flash_flood",
      "c_pm25",
      "f_dog_stray",
      "f_snake_green",
      "fl_yanang",
      "fl_mushroom_poison"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 17-38°C, ร้อนจัดปลายก.พ.-พ.ค., ฝนพ.ค.-ต.ค., เย็นสบายต.ค.-ก.พ.",
      "terrain": "ที่ราบสูงอีสานสลับพื้นที่ชุมชนใหญ่ มีอ่างเก็บน้ำ/เขื่อนและป่า-ภูเขาบางส่วน",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  },
  "Udon Thani": {
    "transport": [
      {
        "name": "ท่าอากาศยานนานาชาติอุดรธานี",
        "shortName": "สนามบิน",
        "type": "plane",
        "description": "สนามบินหลักของอุดรธานี มีเที่ยวบินตรงจากกรุงเทพฯหลายเที่ยว",
        "warpUrl": "https://www.airports.go.th/",
        "logoText": "✈️",
        "color": "#ef4444"
      },
      {
        "name": "รถไฟทางไกลสายตะวันออกเฉียงเหนือ (สถานีอุดรธานี)",
        "shortName": "รถไฟ",
        "type": "rail",
        "description": "มีขบวนรถไฟจากกรุงเทพฯผ่านขอนแก่นขึ้นมาอุดรฯ",
        "warpUrl": "https://www.railway.co.th/",
        "logoText": "🚆",
        "color": "#1f2937"
      },
      {
        "name": "รถสองแถว/รถโดยสารในตัวเมืองอุดรธานี",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "เดินทางในเมืองและต่อไปจุดสำคัญ เช่น บขส.-ตลาด-ย่านท่องเที่ยว",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#f97316"
      },
      {
        "name": "รถตุ๊กตุ๊กอุดรธานี",
        "shortName": "ตุ๊กตุ๊ก",
        "type": "tuk_tuk",
        "description": "พบมากในเมือง เรียกง่าย เหมาะระยะสั้น",
        "warpUrl": "",
        "logoText": "🛺",
        "color": "#a855f7"
      },
      {
        "name": "รถตู้คิวอำเภอ/รถมินิบัส",
        "shortName": "รถตู้",
        "type": "van",
        "description": "เชื่อมอำเภอสำคัญและจังหวัดใกล้เคียง เช่น หนองคาย บึงกาฬ",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#06b6d4"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ - อุดรธานี (เครื่องบิน)",
        "type": "plane",
        "operator": "Thai Vietjet / Thai AirAsia / Nok Air (ตามฤดูกาล)",
        "from": "กรุงเทพฯ (DMK/BKK)",
        "to": "อุดรธานี (UTH)",
        "via": [],
        "departureTimes": [
          "06:30",
          "12:00",
          "19:30"
        ],
        "duration": "1 ชม. 05-20 นาที",
        "baseFare": 1300,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สนามบินดอนเมือง/สุวรรณภูมิ",
        "notes": "สายการบิน/ความถี่อาจเปลี่ยนตามฤดูกาล"
      },
      {
        "name": "สาย 2: กรุงเทพฯ - อุดรธานี (รถทัวร์)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
        "from": "กรุงเทพฯ",
        "to": "อุดรธานี (บขส.อุดร)",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "ขอนแก่น"
        ],
        "departureTimes": [
          "07:00",
          "10:30",
          "20:00"
        ],
        "duration": "8-9 ชม.",
        "baseFare": 650,
        "frequency": "ประมาณทุก 1-2 ชม.",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 3: กรุงเทพฯ - อุดรธานี (รถไฟ)",
        "type": "train",
        "operator": "การรถไฟแห่งประเทศไทย (SRT)",
        "from": "กรุงเทพฯ (สถานีกลางกรุงเทพอภิวัฒน์)",
        "to": "อุดรธานี (สถานีอุดรธานี)",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "ขอนแก่น"
        ],
        "departureTimes": [
          "08:45",
          "20:30"
        ],
        "duration": "9-11 ชม.",
        "baseFare": 350,
        "frequency": "หลายขบวน/วัน",
        "terminal": "สถานีกลางกรุงเทพอภิวัฒน์",
        "notes": "ราคา/เวลาขึ้นกับชั้นรถและขบวน"
      },
      {
        "name": "สาย 4: เมืองอุดรธานี - หนองคาย (รถตู้/รถบัส)",
        "type": "van",
        "operator": "คิวรถตู้/มินิบัสสายอุดรฯ-หนองคาย",
        "from": "อุดรธานี (บขส./คิวรถตู้)",
        "to": "หนองคาย (ตัวเมือง/ท่ารถ)",
        "via": [],
        "departureTimes": [
          "07:00",
          "09:00",
          "11:00",
          "13:00",
          "15:00"
        ],
        "duration": "1-1.5 ชม.",
        "baseFare": 80,
        "frequency": "ประมาณทุก 30-60 นาที",
        "terminal": "สถานีขนส่งผู้โดยสารอุดรธานี",
        "notes": null
      },
      {
        "name": "สาย 5: เมืองอุดรธานี - บ้านเชียง",
        "type": "bus",
        "operator": "รถสองแถว/รถตู้ท้องถิ่น",
        "from": "อุดรธานี (ตัวเมือง)",
        "to": "พิพิธภัณฑ์บ้านเชียง (อ.หนองหาน)",
        "via": [],
        "departureTimes": [
          "08:00",
          "10:00",
          "14:00"
        ],
        "duration": "40-60 นาที",
        "baseFare": 40,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "คิวรถท้องถิ่นในเมือง/สถานีขนส่ง",
        "notes": "ควรถามจุดขึ้นที่แน่นอนในวันเดินทาง"
      }
    ],
    "localFoods": [
      {
        "name": "ข้าวต้มมัดบัวแดง (อ.เมืองอุดรธานี)",
        "priceRange": "25-60฿",
        "category": "dessert",
        "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
      },
      {
        "name": "แหนมเนือง (สายอุดรฯ)",
        "priceRange": "180-350฿",
        "category": "local",
        "note": "เมืองอุดรมีอาหารเวียดนาม-ไทยชื่อดัง เช่น แหนมเนือง"
      },
      {
        "name": "เฝอ/ก๋วยจั๊บญวนใส่หมูยอ",
        "priceRange": "60-120฿",
        "category": "street",
        "note": "เส้นนุ่ม น้ำซุปหอมแบบเวียดนาม"
      },
      {
        "name": "ไข่กระทะ",
        "priceRange": "40-80฿",
        "category": "street",
        "note": "อาหารเช้าสไตล์เวียดนาม-อีสาน พบได้ทั่วเมือง"
      },
      {
        "name": "มะม่วงน้ำดอกไม้/กล้วยหอมทองอุดร (ผลไม้ท้องถิ่น)",
        "priceRange": "40-120฿",
        "category": "dessert",
        "note": "มีการพูดถึงเป็นสินค้า GI/ของดีในพื้นที่"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "450-900฿/คืน",
        "examples": [
          "City Inn Udonthani",
          "B2 Udon Thani Boutique & Budget Hotel",
          "Hotel MOCO"
        ],
        "bookingUrl": "https://www.booking.com/city/th/udon-thani.th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "900-1,900฿/คืน",
        "examples": [
          "The Pannarai Hotel",
          "At Home at Udon",
          "Prajaktra Design Hotel"
        ],
        "bookingUrl": "https://www.booking.com/city/th/udon-thani.th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2,000-4,500฿/คืน",
        "examples": [
          "Centara Udon",
          "De Princess Hotel Udonthani"
        ],
        "bookingUrl": "https://www.booking.com/city/th/udon-thani.th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
        "severity": "medium",
        "note": "ช่วงหน้าร้อนอีสานแดดแรง เหมาะพกน้ำและกันแดด",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "PM2.5 จากการเผาในที่โล่ง",
        "severity": "medium",
        "note": "ปลายหนาว-หน้าแล้งมีโอกาสฝุ่นสูง",
        "season": "ธ.ค.-เม.ย."
      },
      {
        "label": "ฝนตกหนัก น้ำท่วมขังในเขตเมือง/พื้นที่ลุ่ม",
        "severity": "medium",
        "note": "ฤดูฝนมีน้ำท่วมขังได้เป็นช่วง ๆ",
        "season": "พ.ค.-ต.ค."
      },
      {
        "label": "อุบัติเหตุบนถนนช่วงเทศกาล",
        "severity": "medium",
        "note": "ช่วงเดินทางหนาแน่นควรเผื่อเวลาและหลีกเลี่ยงขับกลางคืน",
        "season": "เม.ย., ธ.ค.-ม.ค."
      }
    ],
    "ecoIds": [
      "t_urban",
      "t_cave",
      "c_heat_stroke",
      "c_monsoon",
      "c_flash_flood",
      "c_pm25",
      "f_dog_stray",
      "f_snake_cobra",
      "fl_bamboo",
      "fl_yanang"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 16-39°C, ร้อนจัดปลายก.พ.-พ.ค., ฝนพ.ค.-ต.ค., เย็นสบายต.ค.-ก.พ.",
      "terrain": "ที่ราบสูงสลับป่าเขา/หน้าผาและถ้ำในบางพื้นที่ เมืองศูนย์กลางการค้า-คมนาคมอีสานตอนบน",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  },
  "Nong Khai": {
    "transport": [
      {
        "name": "รถไฟทางไกลสายตะวันออกเฉียงเหนือ (สถานีหนองคาย)",
        "shortName": "รถไฟ",
        "type": "rail",
        "description": "ปลายทางสายอีสานตอนบน ใช้เดินทางจากกรุงเทพฯและเชื่อมต่อพื้นที่ชายแดน",
        "warpUrl": "https://www.railway.co.th/",
        "logoText": "🚆",
        "color": "#1f2937"
      },
      {
        "name": "รถสองแถวในตัวเมืองหนองคาย",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "วิ่งรับส่งในเมืองและไปจุดสำคัญ เช่น ตลาดท่าเสด็จ-ด่านชายแดน",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#f97316"
      },
      {
        "name": "รถตุ๊กตุ๊กหนองคาย",
        "shortName": "ตุ๊กตุ๊ก",
        "type": "tuk_tuk",
        "description": "ใช้เดินทางระยะสั้นในเมือง โดยเฉพาะย่านท่องเที่ยวริมโขง",
        "warpUrl": "",
        "logoText": "🛺",
        "color": "#a855f7"
      },
      {
        "name": "รถตู้/รถบัสเชื่อมอุดรธานี-หนองคาย",
        "shortName": "รถตู้",
        "type": "van",
        "description": "วิ่งถี่ เหมาะสำหรับต่อการเดินทางจากสนามบินอุดรฯ",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#06b6d4"
      },
      {
        "name": "เรือนำเที่ยวแม่น้ำโขง (บางฤดูกาล)",
        "shortName": "เรือ",
        "type": "boat",
        "description": "ล่องชมวิวแม่น้ำโขง/จุดชมพระอาทิตย์ตก (ขึ้นกับฤดูกาลและระดับน้ำ)",
        "warpUrl": "",
        "logoText": "⛴️",
        "color": "#0ea5e9"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ - หนองคาย (รถไฟด่วน/ด่วนพิเศษ)",
        "type": "train",
        "operator": "การรถไฟแห่งประเทศไทย (SRT)",
        "from": "กรุงเทพฯ (สถานีกลางกรุงเทพอภิวัฒน์)",
        "to": "หนองคาย (สถานีหนองคาย)",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "ขอนแก่น",
          "อุดรธานี"
        ],
        "departureTimes": [
          "08:45",
          "20:30"
        ],
        "duration": "10-12 ชม.",
        "baseFare": 494,
        "frequency": "มีทั้งขบวนกลางวันและกลางคืน",
        "terminal": "สถานีกลางกรุงเทพอภิวัฒน์",
        "notes": "ควรตรวจสอบสถานะการเดินรถ/ตารางล่าสุดก่อนเดินทาง"
      },
      {
        "name": "สาย 2: กรุงเทพฯ - หนองคาย (รถทัวร์)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
        "from": "กรุงเทพฯ",
        "to": "หนองคาย (บขส.หนองคาย)",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "ขอนแก่น",
          "อุดรธานี"
        ],
        "departureTimes": [
          "07:00",
          "10:00",
          "20:00"
        ],
        "duration": "9-10 ชม.",
        "baseFare": 720,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 3: อุดรธานี - หนองคาย (รถตู้/รถบัส)",
        "type": "van",
        "operator": "คิวรถตู้/มินิบัสสายอุดรฯ-หนองคาย",
        "from": "อุดรธานี",
        "to": "หนองคาย",
        "via": [],
        "departureTimes": [
          "07:00",
          "09:00",
          "11:00",
          "13:00",
          "15:00"
        ],
        "duration": "1-1.5 ชม.",
        "baseFare": 80,
        "frequency": "ประมาณทุก 30-60 นาที",
        "terminal": "สถานีขนส่งผู้โดยสารอุดรธานี",
        "notes": null
      },
      {
        "name": "สาย 4: เมืองหนองคาย - ตลาดท่าเสด็จ/ริมโขง",
        "type": "bus",
        "operator": "รถสองแถวในเมือง/รถโดยสารท้องถิ่น",
        "from": "ตัวเมืองหนองคาย",
        "to": "ตลาดท่าเสด็จ/ถนนริมโขง",
        "via": [],
        "departureTimes": [
          "09:00",
          "12:00",
          "17:00"
        ],
        "duration": "10-20 นาที",
        "baseFare": 20,
        "frequency": "วิ่งถี่ช่วงกลางวัน",
        "terminal": "จุดจอดในเมือง",
        "notes": "บางช่วงอาจเหมาจ่าย/คิดตามระยะทาง"
      }
    ],
    "localFoods": [
      {
        "name": "หลามปลาน้ำโขง",
        "priceRange": "80-150฿",
        "category": "local",
        "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
      },
      {
        "name": "แหนมเนืองหนองคาย",
        "priceRange": "180-350฿",
        "category": "local",
        "note": "มีชื่อเสียงและถูกแนะนำในเส้นทางเที่ยวหนองคาย"
      },
      {
        "name": "ปลานิลกระชังแม่น้ำโขงหนองคาย",
        "priceRange": "120-250฿",
        "category": "local",
        "note": "สินค้า GI/ของเด่นจากแม่น้ำโขง (นิยมทำเมนูเผา/ทอด/ต้มยำ)"
      },
      {
        "name": "ข้าวเปียกเส้น (ก๋วยจั๊บญวนแนวหนองคาย)",
        "priceRange": "50-100฿",
        "category": "street",
        "note": "พบมากในมื้อเช้าและร้านอาหารเวียดนาม"
      },
      {
        "name": "ไข่กระทะ",
        "priceRange": "40-80฿",
        "category": "street",
        "note": "ของเช้าขึ้นชื่อในโซนอาหารเวียดนาม-อีสาน"
      },
      {
        "name": "แผ่นกระยอ (แผ่นแป้งสำหรับปอเปี๊ยะ/แหนมเนือง)",
        "priceRange": "40-120฿",
        "category": "local",
        "note": "พื้นที่ผลิตแผ่นกระยอมีชื่อเสียงในโซนหนองคาย"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "450-1,000฿/คืน",
        "examples": [
          "Mut Mee Garden Guest House",
          "Bualinn Resort",
          "Nongkhai City Hotel"
        ],
        "bookingUrl": "https://www.booking.com/city/th/nong-khai.th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1,000-2,000฿/คืน",
        "examples": [
          "Park & Pool Resort",
          "Royal Nakhara Hotel",
          "Klang Muang at Nongkhai Hotel"
        ],
        "bookingUrl": "https://www.booking.com/city/th/nong-khai.th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1,800-3,800฿/คืน",
        "examples": [
          "Amanta Hotel Nongkhai",
          "LePont Riverfront Resort Nongkhai"
        ],
        "bookingUrl": "https://www.booking.com/city/th/nong-khai.th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "กระแสน้ำ/ระดับน้ำแม่น้ำโขงเปลี่ยนเร็ว",
        "severity": "medium",
        "note": "กิจกรรมริมน้ำควรสวมชูชีพและระวังน้ำขึ้นลง",
        "season": "พ.ค.-ต.ค."
      },
      {
        "label": "น้ำหลาก/น้ำท่วมริมโขง",
        "severity": "medium",
        "note": "ช่วงมรสุมอาจมีน้ำเอ่อล้นติ่งในบางพื้นที่",
        "season": "ส.ค.-ต.ค."
      },
      {
        "label": "PM2.5 จากการเผาในที่โล่ง",
        "severity": "medium",
        "note": "ปลายหนาว-หน้าแล้งคุณภาพอากาศแย่ได้",
        "season": "ธ.ค.-เม.ย."
      },
      {
        "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
        "severity": "medium",
        "note": "แดดแรงช่วงหน้าแล้ง ควรกันแดดและพักเป็นระยะ",
        "season": "มี.ค.-พ.ค."
      }
    ],
    "ecoIds": [
      "t_urban",
      "c_heat_stroke",
      "c_monsoon",
      "c_flash_flood",
      "c_pm25",
      "f_dog_stray",
      "f_snake_green",
      "fl_yanang"
    ],
    "newEcoEntities": [
      {
        "id": "t_mekong_river",
        "name": "แม่น้ำโขง",
        "category": "terrain",
        "tags": [
          "danger",
          "common",
          "seasonal",
          "extreme"
        ],
        "desc": "แม่น้ำสายหลักของพื้นที่ชายแดน ระดับน้ำแกว่งตามฤดูฝน-แล้งและอาจเกิดน้ำหลากริมตลิ่ง เหมาะกับกิจกรรมริมโขงแต่ต้องระวังความปลอดภัยทางน้ำ"
      }
    ],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 15-38°C, ร้อนจัดปลายก.พ.-พ.ค., ฝนพ.ค.-ต.ค., เย็นสบายต.ค.-ก.พ.",
      "terrain": "จังหวัดชายแดนริมฝั่งขวาแม่น้ำโขง มีพื้นที่เมือง ริมโขง และพื้นที่เกษตรของที่ราบสูง",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  },
  "Nong Bua Lam Phu": {
    "transport": [
      {
        "name": "รถสองแถวในตัวเมืองหนองบัวลำภู",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "เดินทางในเมืองและอำเภอใกล้เคียง เหมาะกับระยะสั้น",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#f97316"
      },
      {
        "name": "รถตู้/รถมินิบัสเชื่อมอุดรธานี-หนองบัวลำภู",
        "shortName": "รถตู้",
        "type": "van",
        "description": "ต่อจากสนามบิน/สถานีขนส่งอุดรฯได้สะดวก",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#06b6d4"
      },
      {
        "name": "รถโดยสารระหว่างจังหวัด (บขส./เอกชน)",
        "shortName": "รถทัวร์",
        "type": "bus",
        "description": "ใช้เดินทางไปขอนแก่น/อุดรฯ/กรุงเทพฯ ผ่านสถานีขนส่งจังหวัด",
        "warpUrl": "",
        "logoText": "🚌",
        "color": "#3b82f6"
      },
      {
        "name": "มอเตอร์ไซค์รับจ้าง/เช่ามอเตอร์ไซค์",
        "shortName": "มอเตอร์ไซค์",
        "type": "other",
        "description": "เหมาะกับเข้าถ้ำ/แหล่งท่องเที่ยวที่รถสาธารณะเข้าถึงยาก",
        "warpUrl": "",
        "logoText": "🚗",
        "color": "#64748b"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ - หนองบัวลำภู (รถทัวร์/ต่อรถ)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
        "from": "กรุงเทพฯ",
        "to": "หนองบัวลำภู",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "ขอนแก่น",
          "อุดรธานี"
        ],
        "departureTimes": [
          "07:00",
          "10:00",
          "20:30"
        ],
        "duration": "8-10 ชม.",
        "baseFare": 520,
        "frequency": "หลายเที่ยว/วัน (บางเที่ยวอาจต้องต่อรถ)",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": "บางรอบเป็นเส้นทางผ่าน/ปลายทางอื่น ควรถามที่เคาน์เตอร์ก่อนซื้อตั๋ว"
      },
      {
        "name": "สาย 2: อุดรธานี - หนองบัวลำภู (รถตู้)",
        "type": "van",
        "operator": "คิวรถตู้สายอุดรฯ-หนองบัวฯ",
        "from": "อุดรธานี",
        "to": "หนองบัวลำภู",
        "via": [],
        "departureTimes": [
          "07:00",
          "09:00",
          "11:00",
          "13:00",
          "15:00"
        ],
        "duration": "1-1.5 ชม.",
        "baseFare": 80,
        "frequency": "ประมาณทุก 30-60 นาที",
        "terminal": "สถานีขนส่งผู้โดยสารอุดรธานี",
        "notes": null
      },
      {
        "name": "สาย 3: เมืองหนองบัวลำภู - ถ้ำสุวรรณคูหา",
        "type": "van",
        "operator": "รถสองแถว/เหมารถท้องถิ่น",
        "from": "ตัวเมืองหนองบัวลำภู",
        "to": "ถ้ำสุวรรณคูหา",
        "via": [],
        "departureTimes": [
          "09:00",
          "13:00",
          "16:00"
        ],
        "duration": "40-60 นาที",
        "baseFare": 60,
        "frequency": "เที่ยวจำกัด/เหมารถสะดวกกว่า",
        "terminal": "คิวรถท้องถิ่นในเมือง",
        "notes": "เส้นทางเข้าถ้ำอาจต้องต่อรถหรือเหมารถ"
      },
      {
        "name": "สาย 4: หนองบัวลำภู - ขอนแก่น (รถตู้/รถบัส)",
        "type": "van",
        "operator": "คิวรถตู้/รถทัวร์ท้องถิ่น",
        "from": "หนองบัวลำภู",
        "to": "ขอนแก่น",
        "via": [],
        "departureTimes": [
          "08:00",
          "10:00",
          "14:00",
          "17:00"
        ],
        "duration": "2-3 ชม.",
        "baseFare": 120,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สถานีขนส่งหนองบัวลำภู",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "เมี่ยงคำลำภู",
        "priceRange": "60-120฿",
        "category": "local",
        "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู และมีเอกลักษณ์ใช้กลีบบัวเป็นใบห่อ"
      },
      {
        "name": "ตำลำข่า (น้ำแจ่วเมี่ยงแบบอีสาน)",
        "priceRange": "40-80฿",
        "category": "local",
        "note": "มักใช้เป็นส่วนสำคัญของเมี่ยงคำลำภู"
      },
      {
        "name": "น้ำผึ้งสุวรรณฟาร์ม (ของดีศรีบุญเรือง)",
        "priceRange": "80-250฿",
        "category": "dessert",
        "note": "ผลิตภัณฑ์ท้องถิ่นที่ถูกแนะนำในพื้นที่"
      },
      {
        "name": "ลาบปลา/ก้อยปลาในพื้นที่ชุมชนลุ่มน้ำ",
        "priceRange": "60-150฿",
        "category": "local",
        "note": "ควรเลือกร้านที่สดสะอาด"
      },
      {
        "name": "เห็ดป่าตามฤดูกาล (เมนูแกง/ยำ)",
        "priceRange": "80-180฿",
        "category": "local",
        "note": "หน้าฝนมีเห็ดหลากชนิด ระวังเห็ดพิษ"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "400-900฿/คืน",
        "examples": [
          "Rueanchorfa",
          "โรงแรมหนองบัวกรีนวิว",
          "เมืองนางธานีแกรนด์ หนองบัวลำภู"
        ],
        "bookingUrl": "https://www.booking.com/city/th/nong-bua-lamphu.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "900-1,600฿/คืน",
        "examples": [
          "Rueanchorfa",
          "เมืองนางธานีแกรนด์ หนองบัวลำภู"
        ],
        "bookingUrl": "https://www.booking.com/city/th/nong-bua-lamphu.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1,600-2,800฿/คืน",
        "examples": [
          "Rueanchorfa",
          "เมืองนางธานีแกรนด์ หนองบัวลำภู"
        ],
        "bookingUrl": "https://www.booking.com/city/th/nong-bua-lamphu.html"
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
        "severity": "medium",
        "note": "แดดแรงช่วงหน้าแล้ง ควรหลีกเลี่ยงกิจกรรมกลางแจ้งช่วงเที่ยง",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "ฝนตกหนัก/น้ำท่วมขังในพื้นที่ลุ่ม",
        "severity": "medium",
        "note": "ช่วงมรสุมอาจมีน้ำท่วมขังบางพื้นที่และถนนลื่น",
        "season": "พ.ค.-ต.ค."
      },
      {
        "label": "ถ้ำ/ทางเดินหินลื่น",
        "severity": "medium",
        "note": "เข้าถ้ำควรใส่รองเท้ากันลื่นและใช้ไฟฉาย",
        "season": null
      },
      {
        "label": "เห็ดป่า/พืชป่าพิษ",
        "severity": "medium",
        "note": "หน้าฝนมีเห็ดป่ามาก ควรระวังเห็ดพิษและอาหารป่าที่ไม่รู้จัก",
        "season": "พ.ค.-ต.ค."
      }
    ],
    "ecoIds": [
      "t_urban",
      "t_cave",
      "c_heat_stroke",
      "c_monsoon",
      "c_flash_flood",
      "c_pm25",
      "fl_mushroom_poison",
      "f_snake_green",
      "f_dog_stray",
      "fl_yanang"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 16-38°C, ร้อนจัดปลายก.พ.-พ.ค., ฝนพ.ค.-ต.ค., เย็นสบายต.ค.-ก.พ.",
      "terrain": "ที่ราบสูงสลับภูเขาเตี้ยและถ้ำ มีอ่างเก็บน้ำและพื้นที่เกษตร",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  },
  "Loei": {
    "transport": [
      {
        "name": "ท่าอากาศยานเลย",
        "shortName": "สนามบิน",
        "type": "plane",
        "description": "สนามบินในจังหวัดเลย (เที่ยวบินอาจมีตามฤดูกาล/ช่วงเวลา)",
        "warpUrl": "https://www.airports.go.th/",
        "logoText": "✈️",
        "color": "#ef4444"
      },
      {
        "name": "รถตู้/รถมินิบัส (เมืองเลย-เชียงคาน-ภูกระดึง-ด่านซ้าย)",
        "shortName": "รถตู้",
        "type": "van",
        "description": "เส้นทางท่องเที่ยวหลักในจังหวัดนิยมใช้รถตู้/มินิบัส",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#06b6d4"
      },
      {
        "name": "รถสองแถวท้องถิ่น (เมืองเลย/เชียงคาน)",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "วิ่งในตัวเมืองและบางเส้นทางไปอำเภอใกล้เคียง",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#f97316"
      },
      {
        "name": "จักรยาน/ทางจักรยานริมน้ำโขง (เชียงคาน)",
        "shortName": "จักรยาน",
        "type": "bike",
        "description": "พื้นที่ท่องเที่ยวอย่างเชียงคานเหมาะกับปั่นเลียบโขง",
        "warpUrl": "",
        "logoText": "🚲",
        "color": "#22c55e"
      },
      {
        "name": "รถตุ๊กตุ๊ก/รถรับจ้างในย่านท่องเที่ยว",
        "shortName": "รถรับจ้าง",
        "type": "other",
        "description": "เหมาะกับเที่ยวระยะสั้นหรือเหมาวันไปภูเขา/จุดชมวิว",
        "warpUrl": "",
        "logoText": "🚗",
        "color": "#64748b"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ - เลย (เครื่องบิน)",
        "type": "plane",
        "operator": "Thai AirAsia (หลัก) + สายการบินอาจเปลี่ยน",
        "from": "กรุงเทพฯ (DMK)",
        "to": "เลย (LOE)",
        "via": [],
        "departureTimes": [
          "07:00",
          "12:00",
          "17:30"
        ],
        "duration": "1 ชม. 05-15 นาที",
        "baseFare": 1500,
        "frequency": "หลายเที่ยว/สัปดาห์",
        "terminal": "สนามบินดอนเมือง",
        "notes": "ความถี่เที่ยวบินเปลี่ยนตามฤดูกาล ควรเช็กวันเดินทาง"
      },
      {
        "name": "สาย 2: กรุงเทพฯ - เลย (รถทัวร์)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
        "from": "กรุงเทพฯ",
        "to": "เลย (บขส.เลย)",
        "via": [
          "สระบุรี",
          "เพชรบูรณ์"
        ],
        "departureTimes": [
          "07:00",
          "10:00",
          "21:00"
        ],
        "duration": "8-9.5 ชม.",
        "baseFare": 620,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 3: เมืองเลย - เชียงคาน",
        "type": "van",
        "operator": "คิวรถตู้เมืองเลย-เชียงคาน",
        "from": "เลย (บขส./คิวรถตู้)",
        "to": "เชียงคาน",
        "via": [],
        "departureTimes": [
          "08:00",
          "10:00",
          "12:00",
          "14:00",
          "16:00"
        ],
        "duration": "1-1.5 ชม.",
        "baseFare": 60,
        "frequency": "ประมาณทุก 1 ชม.",
        "terminal": "สถานีขนส่ง จ.เลย",
        "notes": null
      },
      {
        "name": "สาย 4: เมืองเลย - อุทยานแห่งชาติภูกระดึง",
        "type": "van",
        "operator": "รถสองแถว/รถตู้ไปภูกระดึง",
        "from": "เลย (บขส./คิวรถ)",
        "to": "อ.ภูกระดึง (ทางเข้าอุทยาน)",
        "via": [],
        "departureTimes": [
          "06:30",
          "08:30",
          "10:30"
        ],
        "duration": "1.5-2 ชม.",
        "baseFare": 80,
        "frequency": "เที่ยวเช้าเด่น",
        "terminal": "สถานีขนส่ง จ.เลย",
        "notes": "ควรเช็กเวลาให้ทันรอบเดินขึ้นภูกระดึง"
      }
    ],
    "localFoods": [
      {
        "name": "ส้าปลาน้ำโขง",
        "priceRange": "80-160฿",
        "category": "local",
        "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
      },
      {
        "name": "ข้าวเปียกเส้น (เมืองเลย/เชียงคาน)",
        "priceRange": "50-100฿",
        "category": "street",
        "note": "ถูกยกเป็นอาหารประจำถิ่นในพื้นที่ท่องเที่ยว"
      },
      {
        "name": "เมี่ยงคำ (สไตล์เลย/เชียงคาน)",
        "priceRange": "40-120฿",
        "category": "street",
        "note": "พบได้ตามถนนคนเดินเชียงคาน"
      },
      {
        "name": "ข้าวจี่",
        "priceRange": "15-35฿",
        "category": "street",
        "note": "พบมากช่วงอากาศเย็นและงานประเพณี"
      },
      {
        "name": "อาหารปลาแม่น้ำโขง (ย่าง/ลวกจิ้ม/ต้มยำ)",
        "priceRange": "120-250฿",
        "category": "local",
        "note": "นิยมในโซนริมโขง เช่น เชียงคาน"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "450-1,100฿/คืน",
        "examples": [
          "Fortune D Hotel Loei",
          "Loei Village Hotel",
          "Loei Palace Hotel"
        ],
        "bookingUrl": "https://www.booking.com/city/th/loei.th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1,100-2,200฿/คืน",
        "examples": [
          "Loei Palace Hotel",
          "Indiego Space",
          "Chiang Khan Hill Resort"
        ],
        "bookingUrl": "https://www.booking.com/city/th/loei.th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2,200-5,000฿/คืน",
        "examples": [
          "Chiangkhan River Mountain Resort",
          "Phurua Resort"
        ],
        "bookingUrl": "https://www.booking.com/city/th/loei.th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศหนาว/ลมแรงบนภูเขา",
        "severity": "medium",
        "note": "พื้นที่ภูเขามีอากาศเย็นจัดได้ โดยเฉพาะกลางคืน-เช้ามืด",
        "season": "พ.ย.-ก.พ."
      },
      {
        "label": "หมอกหนา/ทัศนวิสัยต่ำบนถนนภูเขา",
        "severity": "medium",
        "note": "ขับรถขึ้นภูเรือ/ภูกระดึงควรระวังหมอกและโค้งมาก",
        "season": "พ.ย.-ก.พ."
      },
      {
        "label": "ฝนตกหนัก น้ำป่าไหลหลาก/ดินสไลด์",
        "severity": "high",
        "note": "พื้นที่ภูเขาเสี่ยงน้ำป่าและถนนพังเป็นช่วง ๆ",
        "season": "พ.ค.-ต.ค."
      },
      {
        "label": "กระแสน้ำแม่น้ำโขง/กิจกรรมริมโขง",
        "severity": "medium",
        "note": "ระดับน้ำเปลี่ยนตามฤดู ต้องระวังการเล่นน้ำและล่องเรือ",
        "season": "พ.ค.-ต.ค."
      }
    ],
    "ecoIds": [
      "t_mountain",
      "t_urban",
      "c_heat_stroke",
      "c_monsoon",
      "c_flash_flood",
      "c_pm25",
      "f_dog_stray",
      "f_snake_cobra",
      "fl_mushroom_poison",
      "fl_bamboo"
    ],
    "newEcoEntities": [
      {
        "id": "t_mekong_river",
        "name": "แม่น้ำโขง",
        "category": "terrain",
        "tags": [
          "danger",
          "common",
          "seasonal"
        ],
        "desc": "โซนเชียงคานและริมโขงเป็นไฮไลท์สำคัญ ระดับน้ำขึ้นลงตามฤดูกาลและมีกระแสน้ำ ต้องระวังความปลอดภัยทางน้ำ"
      }
    ],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 10-36°C, เย็นกว่าหลายจังหวัดอีสาน มีหมอกช่วงปลายปี, ฝนพ.ค.-ต.ค.",
      "terrain": "จังหวัดอีสานค่อนไปทางเหนือ อยู่ท่ามกลางภูเขาน้อยใหญ่ มีแหล่งท่องเที่ยวธรรมชาติและริมแม่น้ำโขง",
      "bestSeason": "ต.ค.-ก.พ.",
      "emergencyContacts": []
    }
  },
  "Sakon Nakhon": {
    "transport": [
      {
        "name": "ท่าอากาศยานสกลนคร",
        "shortName": "สนามบิน",
        "type": "plane",
        "description": "สนามบินจังหวัดสกลนคร มีเที่ยวบินตรงจากกรุงเทพฯ",
        "warpUrl": "https://www.airports.go.th/",
        "logoText": "✈️",
        "color": "#ef4444"
      },
      {
        "name": "รถสองแถวในตัวเมืองสกลนคร",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "เดินทางในเมืองและไปจุดสำคัญ เช่น บขส.-ตลาด-มหาวิทยาลัย",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#f97316"
      },
      {
        "name": "รถตู้/รถมินิบัสคิวอำเภอ",
        "shortName": "รถตู้",
        "type": "van",
        "description": "เชื่อมอำเภอพังโคน วานรนิวาส กุดบาก ฯลฯ",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#06b6d4"
      },
      {
        "name": "มอเตอร์ไซค์รับจ้าง/เช่ามอเตอร์ไซค์",
        "shortName": "มอเตอร์ไซค์",
        "type": "other",
        "description": "เหมาะกับเข้าวัดป่า/เส้นทางชนบท",
        "warpUrl": "",
        "logoText": "🚗",
        "color": "#64748b"
      },
      {
        "name": "จักรยาน/เดินทางในเมือง",
        "shortName": "จักรยาน",
        "type": "bike",
        "description": "โซนตัวเมืองระยะสั้นสามารถใช้จักรยานได้",
        "warpUrl": "",
        "logoText": "🚲",
        "color": "#22c55e"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ - สกลนคร (เครื่องบิน)",
        "type": "plane",
        "operator": "Nok Air / Thai AirAsia (ตามฤดูกาล)",
        "from": "กรุงเทพฯ (DMK)",
        "to": "สกลนคร (SNO)",
        "via": [],
        "departureTimes": [
          "07:05",
          "12:10",
          "18:20"
        ],
        "duration": "1 ชม. 10-20 นาที",
        "baseFare": 1500,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สนามบินดอนเมือง",
        "notes": "ตารางบินเปลี่ยนได้บ่อย ควรตรวจสอบก่อนจอง"
      },
      {
        "name": "สาย 2: กรุงเทพฯ - สกลนคร (รถทัวร์)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
        "from": "กรุงเทพฯ",
        "to": "สกลนคร (บขส.สกล)",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "ขอนแก่น",
          "อุดรธานี"
        ],
        "departureTimes": [
          "07:00",
          "10:00",
          "20:00"
        ],
        "duration": "10-12 ชม.",
        "baseFare": 780,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 3: อุดรธานี - สกลนคร (รถตู้/รถบัส)",
        "type": "van",
        "operator": "คิวรถตู้สายอุดรฯ-สกลฯ",
        "from": "อุดรธานี",
        "to": "สกลนคร",
        "via": [],
        "departureTimes": [
          "07:00",
          "09:00",
          "11:00",
          "13:00",
          "15:00"
        ],
        "duration": "3-4 ชม.",
        "baseFare": 220,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สถานีขนส่งผู้โดยสารอุดรธานี",
        "notes": null
      },
      {
        "name": "สาย 4: เมืองสกลนคร - อุทยานแห่งชาติภูพาน/วัดป่าในโซนภูพาน",
        "type": "van",
        "operator": "เหมารถ/รถสองแถว-รถตู้ท้องถิ่น",
        "from": "สกลนคร (ตัวเมือง)",
        "to": "โซนภูพาน",
        "via": [],
        "departureTimes": [
          "08:30",
          "10:30",
          "13:30"
        ],
        "duration": "1-2 ชม.",
        "baseFare": 150,
        "frequency": "เหมาวันสะดวก",
        "terminal": "จุดนัดหมายในเมือง",
        "notes": "เส้นทางธรรมชาติ/วัดป่าแนะนำไปเช้าและกลับก่อนค่ำ"
      }
    ],
    "localFoods": [
      {
        "name": "แกงหวาย",
        "priceRange": "80-160฿",
        "category": "local",
        "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
      },
      {
        "name": "เนื้อโคขุนโพนยางคำ (เมนูย่าง/สเต๊ก/จิ้มแจ่ว)",
        "priceRange": "150-450฿",
        "category": "local",
        "note": "สินค้าขึ้นชื่อและมีการขึ้นทะเบียน GI"
      },
      {
        "name": "หมูยอ/ของฝากหมูยอสกลนคร",
        "priceRange": "80-250฿",
        "category": "local",
        "note": "นิยมซื้อเป็นของฝากและทำเมนูยำ/ทอด"
      },
      {
        "name": "ไก่ย่างพังโคน",
        "priceRange": "120-220฿",
        "category": "local",
        "note": "อีกหนึ่งเมนูที่คนท้องถิ่นนิยมตามเส้นทางผ่านอ.พังโคน"
      },
      {
        "name": "น้ำหมากเม่า (เครื่องดื่ม/ไวน์ผลไม้)",
        "priceRange": "60-180฿",
        "category": "drink",
        "note": "ผลิตภัณฑ์จากผลหมากเม่าในภาคอีสาน"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "450-900฿/คืน",
        "examples": [
          "HOP INN Sakon Nakhon",
          "Color Ville Hotel",
          "โรงแรมอินทราเพลส"
        ],
        "bookingUrl": "https://www.booking.com/city/th/sakon-nakhon.th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "900-1,700฿/คืน",
        "examples": [
          "Chokdee Place",
          "At Sakon Hotel",
          "The Room Boutique Hotel"
        ],
        "bookingUrl": "https://www.booking.com/city/th/sakon-nakhon.th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1,700-3,200฿/คืน",
        "examples": [
          "Tafah Residence",
          "The Majestic Sakon Nakhon Hotel"
        ],
        "bookingUrl": "https://www.booking.com/city/th/sakon-nakhon.th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
        "severity": "medium",
        "note": "ช่วงหน้าร้อนร้อนและอบอ้าว ควรหลบแดด",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "PM2.5 จากการเผาในที่โล่ง",
        "severity": "medium",
        "note": "ปลายหนาว-หน้าแล้งฝุ่นสูงเป็นช่วง ๆ",
        "season": "ธ.ค.-เม.ย."
      },
      {
        "label": "เห็ดป่า/พืชป่าพิษ",
        "severity": "medium",
        "note": "หน้าฝนมีเห็ดหลากชนิด ต้องระวังเห็ดพิษ",
        "season": "พ.ค.-ต.ค."
      },
      {
        "label": "ฝนตกหนัก น้ำป่าไหลหลากบางพื้นที่ภูพาน",
        "severity": "high",
        "note": "พื้นที่ป่า-ภูเขาเสี่ยงน้ำป่าและถนนลื่น",
        "season": "พ.ค.-ต.ค."
      }
    ],
    "ecoIds": [
      "t_urban",
      "t_mountain",
      "c_heat_stroke",
      "c_monsoon",
      "c_flash_flood",
      "c_pm25",
      "fl_mushroom_poison",
      "fl_bamboo",
      "f_snake_green",
      "f_dog_stray"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 14-39°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.",
      "terrain": "ที่ราบสูงสลับเทือกเขาภูพานและป่า เหมาะกับสายธรรมชาติ-วัดป่า",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  },
  "Nakhon Phanom": {
    "transport": [
      {
        "name": "ท่าอากาศยานนครพนม",
        "shortName": "สนามบิน",
        "type": "plane",
        "description": "สนามบินจังหวัดนครพนม มีเที่ยวบินตรงจากกรุงเทพฯ",
        "warpUrl": "https://www.airports.go.th/",
        "logoText": "✈️",
        "color": "#ef4444"
      },
      {
        "name": "รถสองแถว/รถโดยสารในตัวเมืองนครพนม",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "วิ่งในเมืองและไปจุดสำคัญ เช่น ตลาด-ริมโขง-บขส.",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#f97316"
      },
      {
        "name": "รถตู้/รถมินิบัสสายอำเภอ (ธาตุพนม-เรณูนคร-นาแก)",
        "shortName": "รถตู้",
        "type": "van",
        "description": "เชื่อมแหล่งท่องเที่ยวสำคัญและชุมชนไทญ้อ",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#06b6d4"
      },
      {
        "name": "จักรยาน/เลนปั่นเลียบโขง",
        "shortName": "จักรยาน",
        "type": "bike",
        "description": "ระบบทางเดิน-ทางจักรยานเลียบโขงเหมาะกับเที่ยวในเมือง",
        "warpUrl": "",
        "logoText": "🚲",
        "color": "#22c55e"
      },
      {
        "name": "เรือนำเที่ยวแม่น้ำโขง (บางฤดูกาล)",
        "shortName": "เรือ",
        "type": "boat",
        "description": "ล่องชมวิวริมโขง (ขึ้นกับฤดูกาลและผู้ให้บริการ)",
        "warpUrl": "",
        "logoText": "⛴️",
        "color": "#0ea5e9"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ - นครพนม (เครื่องบิน)",
        "type": "plane",
        "operator": "Thai AirAsia / Thai Lion Air (หลัก)",
        "from": "กรุงเทพฯ (DMK)",
        "to": "นครพนม (KOP)",
        "via": [],
        "departureTimes": [
          "07:10",
          "12:20",
          "18:00"
        ],
        "duration": "1 ชม. 15-20 นาที",
        "baseFare": 1200,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สนามบินดอนเมือง",
        "notes": "สายการบิน/ความถี่อาจเปลี่ยนตามฤดูกาล"
      },
      {
        "name": "สาย 2: กรุงเทพฯ - นครพนม (รถทัวร์)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
        "from": "กรุงเทพฯ",
        "to": "นครพนม (บขส.นครพนม)",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "ขอนแก่น",
          "อุดรธานี",
          "สกลนคร"
        ],
        "departureTimes": [
          "07:00",
          "10:00",
          "19:30"
        ],
        "duration": "11-13 ชม.",
        "baseFare": 850,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 3: เมืองนครพนม - ธาตุพนม",
        "type": "van",
        "operator": "คิวรถตู้เมืองนครพนม-ธาตุพนม",
        "from": "นครพนม (ตัวเมือง)",
        "to": "อ.ธาตุพนม",
        "via": [],
        "departureTimes": [
          "07:30",
          "09:30",
          "11:30",
          "13:30",
          "15:30"
        ],
        "duration": "1-1.5 ชม.",
        "baseFare": 80,
        "frequency": "ประมาณทุก 1 ชม.",
        "terminal": "คิวรถตู้/สถานีขนส่งนครพนม",
        "notes": null
      },
      {
        "name": "สาย 4: เมืองนครพนม - เรณูนคร (เข้าชุมชนวัฒนธรรม/ข้าวปุ้นน้ำนัว)",
        "type": "van",
        "operator": "รถตู้ท้องถิ่น",
        "from": "นครพนม (ตัวเมือง)",
        "to": "อ.เรณูนคร",
        "via": [],
        "departureTimes": [
          "08:00",
          "10:00",
          "13:00",
          "15:00"
        ],
        "duration": "1.5-2 ชม.",
        "baseFare": 100,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "คิวรถตู้ในเมือง/สถานีขนส่ง",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "เมี่ยงตาสวด",
        "priceRange": "80-160฿",
        "category": "local",
        "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
      },
      {
        "name": "หมกเจาะ (อาหารพื้นถิ่นไทญ้อ)",
        "priceRange": "80-180฿",
        "category": "local",
        "note": "เมนูขึ้นชื่อของชุมชนไทญ้อ โดยเฉพาะโซนท่าอุเทน"
      },
      {
        "name": "หมูยอนครพนม (เช่น หมูยอป้ายุง)",
        "priceRange": "80-250฿",
        "category": "local",
        "note": "ของฝากเด่นของนครพนม"
      },
      {
        "name": "ข้าวปุ้นน้ำนัว/ข้าวปุ้นน้ำแจ่ว (เรณูนคร)",
        "priceRange": "60-120฿",
        "category": "street",
        "note": "อิทธิพลอาหารเวียดนาม-ลุ่มโขงในพื้นที่"
      },
      {
        "name": "ลิ้นจี่นครพนม (ผลไม้ GI)",
        "priceRange": "80-200฿",
        "category": "dessert",
        "note": "ผลไม้ GI ของจังหวัด (ตามฤดูกาล)"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "450-1,000฿/คืน",
        "examples": [
          "HOP INN Nakhon Phanom",
          "Windsor Hotel",
          "U- Homehotel Nakhonpanom"
        ],
        "bookingUrl": "https://www.booking.com/city/th/nakhon-phanom.th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1,000-2,000฿/คืน",
        "examples": [
          "Blu Hotel",
          "The Square Hotel",
          "I Hotel Nakhon Phanom"
        ],
        "bookingUrl": "https://www.booking.com/city/th/nakhon-phanom.th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2,000-4,500฿/คืน",
        "examples": [
          "Fortune River View Hotel Nakhon Phanom",
          "The River Hotel"
        ],
        "bookingUrl": "https://www.booking.com/city/th/nakhon-phanom.th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "น้ำหลากริมโขง/น้ำท่วมตลิ่ง",
        "severity": "medium",
        "note": "ฤดูฝนอาจมีน้ำเอ่อล้นตลิ่งและทางเดินริมโขงบางช่วงปิด",
        "season": "ส.ค.-ต.ค."
      },
      {
        "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
        "severity": "medium",
        "note": "กลางวันร้อนจัดช่วงหน้าแล้ง",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "PM2.5 จากการเผาในที่โล่ง",
        "severity": "medium",
        "note": "ปลายหนาว-หน้าแล้งฝุ่นสูงได้",
        "season": "ธ.ค.-เม.ย."
      },
      {
        "label": "ฝนตกหนัก/พายุฝนฟ้าคะนอง",
        "severity": "medium",
        "note": "มรสุมทำให้ฝนตกหนักเป็นช่วง ๆ",
        "season": "พ.ค.-ต.ค."
      }
    ],
    "ecoIds": [
      "t_urban",
      "c_heat_stroke",
      "c_monsoon",
      "c_flash_flood",
      "c_pm25",
      "f_dog_stray",
      "f_snake_cobra",
      "fl_yanang"
    ],
    "newEcoEntities": [
      {
        "id": "t_mekong_river",
        "name": "แม่น้ำโขง",
        "category": "terrain",
        "tags": [
          "danger",
          "common",
          "seasonal"
        ],
        "desc": "นครพนมมีทางเดินและเส้นทางจักรยานเลียบริมโขง เป็นจุดท่องเที่ยวสำคัญ แต่ฤดูฝนระดับน้ำสูงและอาจเกิดน้ำหลาก"
      }
    ],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 14-38°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.",
      "terrain": "เมืองริมโขง มีพื้นที่ราบสูงสลับลุ่มน้ำและเส้นทางท่องเที่ยวเลียบแม่น้ำ",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  },
  "Mukdahan": {
    "transport": [
      {
        "name": "รถสองแถวในตัวเมืองมุกดาหาร",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "วิ่งในเมืองและเชื่อมจุดสำคัญ เช่น ตลาดราตรี-บขส.-สะพานมิตรภาพฯ",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#f97316"
      },
      {
        "name": "รถสามล้อเครื่อง/รถรับจ้างในเมืองมุกดาหาร",
        "shortName": "รถรับจ้าง",
        "type": "tuk_tuk",
        "description": "เหมาะกับระยะสั้นในเมือง/ย่านท่องเที่ยว",
        "warpUrl": "",
        "logoText": "🛺",
        "color": "#a855f7"
      },
      {
        "name": "รถตู้/รถมินิบัสเชื่อมจังหวัดใกล้เคียง",
        "shortName": "รถตู้",
        "type": "van",
        "description": "เชื่อมกาฬสินธุ์ สกลนคร นครพนม และอุบลฯตามคิวรถ",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#06b6d4"
      },
      {
        "name": "รถโดยสารระหว่างจังหวัด (บขส./เอกชน)",
        "shortName": "รถทัวร์",
        "type": "bus",
        "description": "เดินทางระยะไกล เช่น กรุงเทพฯ-มุกดาหาร",
        "warpUrl": "",
        "logoText": "🚌",
        "color": "#3b82f6"
      },
      {
        "name": "เรือนำเที่ยวแม่น้ำโขง (บางฤดูกาล)",
        "shortName": "เรือ",
        "type": "boat",
        "description": "ล่องชมวิวโขง/แก่งกะเบา ขึ้นกับฤดูกาลและระดับน้ำ",
        "warpUrl": "",
        "logoText": "⛴️",
        "color": "#0ea5e9"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ - มุกดาหาร (รถทัวร์)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
        "from": "กรุงเทพฯ",
        "to": "มุกดาหาร (บขส.มุกดาหาร)",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "ขอนแก่น",
          "กาฬสินธุ์"
        ],
        "departureTimes": [
          "07:00",
          "10:00",
          "20:00"
        ],
        "duration": "10-12 ชม.",
        "baseFare": 780,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 2: ขอนแก่น - มุกดาหาร (รถตู้/รถบัส)",
        "type": "van",
        "operator": "คิวรถตู้/รถบัสท้องถิ่น",
        "from": "ขอนแก่น",
        "to": "มุกดาหาร",
        "via": [
          "มหาสารคาม",
          "กาฬสินธุ์"
        ],
        "departureTimes": [
          "08:00",
          "11:00",
          "14:00",
          "17:00"
        ],
        "duration": "4-6 ชม.",
        "baseFare": 280,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สถานีขนส่ง จ.ขอนแก่น (บขส.3)",
        "notes": null
      },
      {
        "name": "สาย 3: มุกดาหาร - นครพนม (รถตู้/รถบัส)",
        "type": "van",
        "operator": "คิวรถตู้สายมุกดาหาร-นครพนม",
        "from": "มุกดาหาร",
        "to": "นครพนม",
        "via": [],
        "departureTimes": [
          "08:00",
          "10:00",
          "12:00",
          "14:00",
          "16:00"
        ],
        "duration": "2-3 ชม.",
        "baseFare": 140,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สถานีขนส่งมุกดาหาร",
        "notes": null
      },
      {
        "name": "สาย 4: ตัวเมืองมุกดาหาร - ห้าแยกเวียดนาม (ตลาดเช้า)",
        "type": "bus",
        "operator": "รถสองแถว/รถรับจ้างในเมือง",
        "from": "ตัวเมืองมุกดาหาร",
        "to": "ห้าแยกเวียดนาม",
        "via": [],
        "departureTimes": [
          "06:30",
          "08:00",
          "10:00"
        ],
        "duration": "10-20 นาที",
        "baseFare": 20,
        "frequency": "วิ่งถี่ช่วงเช้า",
        "terminal": "จุดจอดในเมือง",
        "notes": "เหมาะไปตลาดอาหารเช้า ควรไปเช้า"
      }
    ],
    "localFoods": [
      {
        "name": "ตำเมี่ยงตะไคร้ ลำข่าสดใส่มดแดง",
        "priceRange": "80-160฿",
        "category": "local",
        "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
      },
      {
        "name": "ข้าวเปียก (ตลาดเช้าห้าแยกเวียดนาม)",
        "priceRange": "50-90฿",
        "category": "street",
        "note": "อาหารเช้าขึ้นชื่อของมุกดาหาร"
      },
      {
        "name": "ก๋วยจั๊บญวน (ชุมชนเวียดนาม)",
        "priceRange": "60-120฿",
        "category": "street",
        "note": "เมนูเส้นน้ำซุปหอม นิยมในโซนชุมชนเวียดนาม"
      },
      {
        "name": "เลือดแปลง",
        "priceRange": "50-100฿",
        "category": "street",
        "note": "อาหารเช้าท้องถิ่นที่พบในตลาดเช้า"
      },
      {
        "name": "หมูยอ/ของฝากโซนตลาดราตรีมุกดาหาร",
        "priceRange": "80-250฿",
        "category": "local",
        "note": "ย่านตลาดราตรีมีของฝากอาหารหลากหลาย"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "450-1,000฿/คืน",
        "examples": [
          "Vieng Khong Hotel",
          "Mukdaview Hotel",
          "River City Hotel"
        ],
        "bookingUrl": "https://www.booking.com/city/th/mukdahan.th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1,000-2,000฿/คืน",
        "examples": [
          "Ploy Palace Hotel",
          "Mukdahan Grand Hotel",
          "Hotel Muq"
        ],
        "bookingUrl": "https://www.booking.com/city/th/mukdahan.th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2,000-4,500฿/คืน",
        "examples": [
          "Hotel de Ladda",
          "Isaan Country Retreat"
        ],
        "bookingUrl": "https://www.booking.com/city/th/mukdahan.th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "น้ำหลาก/ตลิ่งริมโขงลื่น",
        "severity": "medium",
        "note": "ทางเดินริมน้ำและท่าน้ำอาจลื่น โดยเฉพาะฤดูฝน",
        "season": "พ.ค.-ต.ค."
      },
      {
        "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
        "severity": "medium",
        "note": "ร้อนอบอ้าวช่วงหน้าแล้ง",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "PM2.5 จากการเผาในที่โล่ง",
        "severity": "medium",
        "note": "ปลายหนาว-หน้าแล้งฝุ่นสูงได้",
        "season": "ธ.ค.-เม.ย."
      },
      {
        "label": "พายุฝนฟ้าคะนองฉับพลัน",
        "severity": "medium",
        "note": "ช่วงเปลี่ยนฤดูมีฝนหนักและลมแรง",
        "season": "มี.ค.-พ.ค."
      }
    ],
    "ecoIds": [
      "t_urban",
      "c_heat_stroke",
      "c_monsoon",
      "c_flash_flood",
      "c_pm25",
      "f_dog_stray",
      "f_snake_green",
      "fl_yanang"
    ],
    "newEcoEntities": [
      {
        "id": "t_mekong_river",
        "name": "แม่น้ำโขง",
        "category": "terrain",
        "tags": [
          "danger",
          "common",
          "seasonal"
        ],
        "desc": "มุกดาหารเป็นจังหวัดริมโขงและมีจุดท่องเที่ยวที่สัมพันธ์กับระดับน้ำ (เช่น แก่งกะเบาในหน้าแล้ง) ฤดูฝนอาจเกิดน้ำหลากและตลิ่งลื่น"
      }
    ],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 15-39°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.",
      "terrain": "เมืองชายแดนริมโขง เน้นเส้นทางค้าชายแดนและวัฒนธรรมหลากหลายชาติพันธุ์",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  },
  "Kalasin": {
    "transport": [
      {
        "name": "รถสองแถว/รถโดยสารในตัวเมืองกาฬสินธุ์",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "ใช้เดินทางในเมืองและไปอำเภอใกล้เคียง",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#f97316"
      },
      {
        "name": "รถตู้/รถมินิบัสเชื่อมขอนแก่น-มหาสารคาม-กาฬสินธุ์",
        "shortName": "รถตู้",
        "type": "van",
        "description": "ทางเลือกหลักสำหรับต่อจากเมืองหลัก/สถานีขนส่ง",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#06b6d4"
      },
      {
        "name": "รถโดยสารระหว่างจังหวัด (บขส./เอกชน)",
        "shortName": "รถทัวร์",
        "type": "bus",
        "description": "เดินทางไกล เช่น กรุงเทพฯ-กาฬสินธุ์",
        "warpUrl": "",
        "logoText": "🚌",
        "color": "#3b82f6"
      },
      {
        "name": "มอเตอร์ไซค์รับจ้าง/เช่ามอเตอร์ไซค์",
        "shortName": "มอเตอร์ไซค์",
        "type": "other",
        "description": "เหมาะกับไปเขื่อนลำปาว/พิพิธภัณฑ์สิรินธร/แหล่งท่องเที่ยวกระจายตัว",
        "warpUrl": "",
        "logoText": "🚗",
        "color": "#64748b"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ - กาฬสินธุ์ (รถทัวร์)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
        "from": "กรุงเทพฯ",
        "to": "กาฬสินธุ์ (บขส.กาฬสินธุ์)",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "ขอนแก่น",
          "มหาสารคาม"
        ],
        "departureTimes": [
          "07:00",
          "10:00",
          "20:00"
        ],
        "duration": "8-10 ชม.",
        "baseFare": 600,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 2: ขอนแก่น - กาฬสินธุ์ (รถตู้/รถบัส)",
        "type": "van",
        "operator": "คิวรถตู้/รถบัสท้องถิ่น",
        "from": "ขอนแก่น",
        "to": "กาฬสินธุ์",
        "via": [
          "มหาสารคาม"
        ],
        "departureTimes": [
          "08:00",
          "10:00",
          "12:00",
          "14:00",
          "16:00"
        ],
        "duration": "2.5-3.5 ชม.",
        "baseFare": 160,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "สถานีขนส่ง จ.ขอนแก่น (บขส.3)",
        "notes": null
      },
      {
        "name": "สาย 3: กาฬสินธุ์ - พิพิธภัณฑ์สิรินธร (สหัสขันธ์)",
        "type": "van",
        "operator": "รถตู้/รถสองแถวท้องถิ่น",
        "from": "ตัวเมืองกาฬสินธุ์",
        "to": "อ.สหัสขันธ์",
        "via": [],
        "departureTimes": [
          "09:00",
          "11:00",
          "13:00",
          "15:00"
        ],
        "duration": "1-1.5 ชม.",
        "baseFare": 60,
        "frequency": "หลายเที่ยว/วัน",
        "terminal": "คิวรถท้องถิ่นในเมือง/สถานีขนส่ง",
        "notes": "เหมาะไปพิพิธภัณฑ์ไดโนเสาร์และแหล่งท่องเที่ยวใกล้เคียง"
      },
      {
        "name": "สาย 4: กาฬสินธุ์ - เขื่อนลำปาว",
        "type": "van",
        "operator": "เหมารถ/รถท้องถิ่น",
        "from": "ตัวเมืองกาฬสินธุ์",
        "to": "เขื่อนลำปาว",
        "via": [],
        "departureTimes": [
          "10:00",
          "13:00",
          "16:00"
        ],
        "duration": "40-60 นาที",
        "baseFare": 80,
        "frequency": "เที่ยวจำกัด/เหมารถสะดวก",
        "terminal": "จุดนัดหมายในเมือง",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "ข้าวแดะงา",
        "priceRange": "30-70฿",
        "category": "street",
        "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
      },
      {
        "name": "กุ้งก้ามกรามกาฬสินธุ์ (ย่าง/เผา/อบ)",
        "priceRange": "250-650฿",
        "category": "local",
        "note": "สินค้าขึ้นทะเบียน GI จุดเด่นเนื้อหวานแน่น"
      },
      {
        "name": "ไส้กรอกปลากาฬสินธุ์",
        "priceRange": "35-80฿",
        "category": "street",
        "note": "ของกิน/ของฝากที่ถูกกล่าวถึงในงานอาหารอีสานของ ททท."
      },
      {
        "name": "ข้าวเหนียวเขาวง (ของฝาก/เมนูข้าวเหนียว)",
        "priceRange": "40-120฿",
        "category": "local",
        "note": "ผลิตภัณฑ์ท้องถิ่นของอำเภอเขาวง"
      },
      {
        "name": "ปลาน้ำจืด/ปลาเผาโซนลำปาว (ตามฤดูกาล)",
        "priceRange": "120-250฿",
        "category": "local",
        "note": "นิยมตามร้านริมเขื่อนและตลาดท้องถิ่น"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "400-900฿/คืน",
        "examples": [
          "TK residence",
          "JS Motel",
          "Supak Hotel"
        ],
        "bookingUrl": "https://www.booking.com/city/th/kalasin.th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "900-1,900฿/คืน",
        "examples": [
          "Rimpao Hotel",
          "Chada View Resort",
          "Supak Hotel"
        ],
        "bookingUrl": "https://www.booking.com/city/th/kalasin.th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1,900-3,800฿/คืน",
        "examples": [
          "Romlaphass Boutique Villa",
          "Rimpao Hotel"
        ],
        "bookingUrl": "https://www.booking.com/city/th/kalasin.th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
        "severity": "medium",
        "note": "แดดแรงช่วงหน้าแล้ง โดยเฉพาะเที่ยวเขื่อน/แหล่งกลางแจ้ง",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "PM2.5 จากการเผาในที่โล่ง",
        "severity": "medium",
        "note": "ปลายหนาว-หน้าแล้งฝุ่นสูงเป็นช่วง ๆ",
        "season": "ธ.ค.-เม.ย."
      },
      {
        "label": "ฝนตกหนัก/น้ำท่วมขังในพื้นที่ลุ่ม",
        "severity": "medium",
        "note": "ฤดูฝนเสี่ยงน้ำท่วมขังและถนนลื่น",
        "season": "พ.ค.-ต.ค."
      },
      {
        "label": "อุบัติเหตุทางถนนในเส้นทางต่างอำเภอ",
        "severity": "medium",
        "note": "ถนนระหว่างอำเภอวิ่งเร็ว ควรขับระวังและหลีกเลี่ยงกลางคืน",
        "season": null
      }
    ],
    "ecoIds": [
      "t_urban",
      "c_heat_stroke",
      "c_monsoon",
      "c_flash_flood",
      "c_pm25",
      "f_dog_stray",
      "f_snake_green",
      "fl_yanang"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 15-39°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.",
      "terrain": "ที่ราบสูงอีสาน มีแหล่งน้ำสำคัญอย่างเขื่อนลำปาว และแหล่งไดโนเสาร์/ภูเขาเตี้ยบางพื้นที่",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  },
  "Bueng Kan": {
    "transport": [
      {
        "name": "รถสองแถว/รถโดยสารในตัวเมืองบึงกาฬ",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "เดินทางในเมืองและไปจุดสำคัญ เช่น ตลาดเช้า-บขส.-ริมโขง",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#f97316"
      },
      {
        "name": "รถตู้/รถมินิบัสเชื่อมอุดรธานี-หนองคาย-บึงกาฬ",
        "shortName": "รถตู้",
        "type": "van",
        "description": "เป็นทางเลือกหลักเพราะไม่มีสนามบิน/รถไฟ",
        "warpUrl": "",
        "logoText": "🚐",
        "color": "#06b6d4"
      },
      {
        "name": "มอเตอร์ไซค์รับจ้าง/เช่ามอเตอร์ไซค์",
        "shortName": "มอเตอร์ไซค์",
        "type": "other",
        "description": "เหมาะไปภูทอก-บึงโขงหลง-จุดธรรมชาติที่รถสาธารณะมีจำกัด",
        "warpUrl": "",
        "logoText": "🚗",
        "color": "#64748b"
      },
      {
        "name": "เรือนำเที่ยวแม่น้ำโขง (บางฤดูกาล)",
        "shortName": "เรือ",
        "type": "boat",
        "description": "ล่องชมวิวริมโขง/แก่งอาฮง ขึ้นกับฤดูกาลและผู้ให้บริการ",
        "warpUrl": "",
        "logoText": "⛴️",
        "color": "#0ea5e9"
      },
      {
        "name": "จักรยาน/เดินเล่นเลียบโขงในเมือง",
        "shortName": "จักรยาน",
        "type": "bike",
        "description": "โซนเมืองมีทางเดินเลียบโขงเหมาะกับเดิน/ปั่น",
        "warpUrl": "",
        "logoText": "🚲",
        "color": "#22c55e"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ - บึงกาฬ (รถทัวร์)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
        "from": "กรุงเทพฯ",
        "to": "บึงกาฬ (บขส.บึงกาฬ)",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "ขอนแก่น",
          "อุดรธานี"
        ],
        "departureTimes": [
          "07:00",
          "10:00",
          "20:00"
        ],
        "duration": "11-13 ชม.",
        "baseFare": 880,
        "frequency": "วันละหลายเที่ยว",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 2: อุดรธานี - บึงกาฬ (รถตู้/รถบัส)",
        "type": "van",
        "operator": "คิวรถตู้สายอุดรฯ-บึงกาฬ",
        "from": "อุดรธานี",
        "to": "บึงกาฬ",
        "via": [
          "หนองคาย (บางเที่ยว)"
        ],
        "departureTimes": [
          "07:00",
          "09:00",
          "11:00",
          "13:00",
          "15:00"
        ],
        "duration": "2.5-3.5 ชม.",
        "baseFare": 180,
        "frequency": "ประมาณทุก 1 ชม.",
        "terminal": "สถานีขนส่งผู้โดยสารอุดรธานี",
        "notes": null
      },
      {
        "name": "สาย 3: เมืองบึงกาฬ - ภูทอก",
        "type": "van",
        "operator": "รถตู้ท้องถิ่น/เหมารถ",
        "from": "บึงกาฬ (ตัวเมือง)",
        "to": "ภูทอก",
        "via": [],
        "departureTimes": [
          "08:00",
          "10:00",
          "13:00"
        ],
        "duration": "45-75 นาที",
        "baseFare": 120,
        "frequency": "เที่ยวจำกัด/เหมารถสะดวก",
        "terminal": "จุดนัดหมายในเมือง",
        "notes": "เส้นทางขึ้นภูมีช่วงชัน ควรไปเช้า"
      },
      {
        "name": "สาย 4: เมืองบึงกาฬ - บึงโขงหลง/ถ้ำนาคา",
        "type": "van",
        "operator": "รถตู้ท้องถิ่น/เหมารถ",
        "from": "บึงกาฬ (ตัวเมือง)",
        "to": "บึงโขงหลง",
        "via": [],
        "departureTimes": [
          "08:30",
          "11:00",
          "14:00"
        ],
        "duration": "1.5-2.5 ชม.",
        "baseFare": 200,
        "frequency": "เหมาวันสะดวก",
        "terminal": "จุดนัดหมายในเมือง",
        "notes": "ช่วงท่องเที่ยวถ้ำนาคาแนะนำจองรถล่วงหน้า"
      }
    ],
    "localFoods": [
      {
        "name": "หมกหม้อปลาน้ำโขง",
        "priceRange": "120-250฿",
        "category": "local",
        "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
      },
      {
        "name": "สับปะรดบึงกาฬ (ผลไม้ GI)",
        "priceRange": "40-120฿",
        "category": "dessert",
        "note": "สับปะรดพันธุ์ปัตตาเวียที่ขึ้นทะเบียน GI"
      },
      {
        "name": "จิ้มจุ่มปลาแม่น้ำโขง/ปลาแม่น้ำลวกจิ้ม",
        "priceRange": "180-450฿",
        "category": "local",
        "note": "เมนูปลาแม่น้ำโขงที่ถูกแนะนำในบทความท่องเที่ยวบึงกาฬ"
      },
      {
        "name": "แหนมบึงกาฬ (ของฝาก)",
        "priceRange": "60-180฿",
        "category": "local",
        "note": "มีร้านของฝากชื่อดังหลายเจ้าในจังหวัด"
      },
      {
        "name": "อาหารอีสานรสจัด (ลาบ/น้ำตก/ส้มตำ) โซนริมโขง",
        "priceRange": "50-150฿",
        "category": "street",
        "note": "นิยมในร้านอาหารริมฝั่งโขง"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "450-1,000฿/คืน",
        "examples": [
          "Century Grand Hotel",
          "Thorsangpruksa Hotel",
          "Finn Hotel"
        ],
        "bookingUrl": "https://www.booking.com/region/th/bueng-kan.th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "1,000-2,000฿/คืน",
        "examples": [
          "The One Hotel",
          "Kongkhamkoon Hotel",
          "ชมวิว บึงโขงหลง"
        ],
        "bookingUrl": "https://www.booking.com/region/th/bueng-kan.th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2,000-4,500฿/คืน",
        "examples": [
          "The One Hotel",
          "LAKE HOUSE Naka Cave"
        ],
        "bookingUrl": "https://www.booking.com/region/th/bueng-kan.th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "เส้นทางเดินเขา/หน้าผา (ภูทอก-ถ้ำนาคา)",
        "severity": "high",
        "note": "ทางเดินบางช่วงชันและลื่น ควรใส่รองเท้ากันลื่นและทำตามคำแนะนำเจ้าหน้าที่",
        "season": null
      },
      {
        "label": "ฝนตกหนัก น้ำป่าไหลหลาก/ทางน้ำตก",
        "severity": "high",
        "note": "ฤดูฝนอาจเกิดน้ำป่าและเส้นทางปิดชั่วคราว",
        "season": "พ.ค.-ต.ค."
      },
      {
        "label": "กระแสน้ำแม่น้ำโขง/ระดับน้ำผันผวน",
        "severity": "medium",
        "note": "กิจกรรมริมน้ำควรระมัดระวังเป็นพิเศษช่วงน้ำหลาก",
        "season": "พ.ค.-ต.ค."
      },
      {
        "label": "PM2.5 จากการเผาในที่โล่ง",
        "severity": "medium",
        "note": "ปลายหนาว-หน้าแล้งฝุ่นสูงได้",
        "season": "ธ.ค.-เม.ย."
      }
    ],
    "ecoIds": [
      "t_urban",
      "t_mountain",
      "c_heat_stroke",
      "c_monsoon",
      "c_flash_flood",
      "c_pm25",
      "f_snake_cobra",
      "f_dog_stray",
      "fl_mushroom_poison",
      "fl_bamboo"
    ],
    "newEcoEntities": [
      {
        "id": "t_mekong_river",
        "name": "แม่น้ำโขง",
        "category": "terrain",
        "tags": [
          "danger",
          "common",
          "seasonal"
        ],
        "desc": "บึงกาฬติดแม่น้ำโขง มีแหล่งท่องเที่ยวริมโขงและแก่งอาฮง ระดับน้ำเปลี่ยนตามฤดูกาล ทำให้กิจกรรมทางน้ำต้องคำนึงถึงความปลอดภัย"
      },
      {
        "id": "f_mekong_fish",
        "name": "ปลาน้ำโขง (ปลาแม่น้ำตามฤดูกาล)",
        "category": "fauna",
        "tags": [
          "common",
          "seasonal",
          "edible"
        ],
        "desc": "แม่น้ำโขงอุดมด้วยปลาน้ำจืดหลากชนิด เมนูยอดนิยมคือปลาแม่น้ำลวกจิ้ม/จิ้มจุ่ม และวัตถุดิบจะเปลี่ยนตามฤดูกาลน้ำ"
      }
    ],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 15-39°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.",
      "terrain": "จังหวัดใหม่ริมโขง มีภูเขา น้ำตก และป่าดงดิบ (เช่น ภูวัว) สลับพื้นที่เมืองและเกษตร",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  }
}
```

## Source index for verification
Season windows used in `dangerZones.season` and `metadata.bestSeason` align with TMD’s official “Thailand seasons” definition and were applied consistently across the Northeastern provinces set. citeturn34search0

Province geography/terrain cues (Mekong-border focus, mountains and cooler climate in Loei, Bueng Kan as a Mekong province with mountains/waterfalls, etc.) are supported by TAT’s official province and regional destination pages. citeturn35search2turn35search3turn36search3turn37search8

“1 จังหวัด 1 เมนู” signatures were used as the anchor dish per province, and Dong‐level dish explanations (e.g., เมี่ยงคำลำภู) were taken from official PRD content. citeturn33search4turn33search6turn32search0

Nakhon Phanom’s local-food list and at least one detailed dish write-up were taken from Nakhon Phanom provincial (government) pages (“charm” content). citeturn30search0turn30search10

GI products referenced in `localFoods` were anchored to DIP GI announcements/docs (e.g., สับปะรดบึงกาฬ, กุ้งก้ามกรามกาฬสินธุ์, เนื้อโคขุนโพนยางคำ). citeturn21search6turn31search1turn21search4

Accommodation examples were taken from Booking.com listings that show properties and (frequently) 2026-updated pricing pages. citeturn25search1turn25search0turn25search2turn25search3turn26search0turn26search2turn26search3turn27search1turn27search6turn28search11turn28search5