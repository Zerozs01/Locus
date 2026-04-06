# Thailand Travel Guide Province Data for Ten Northeastern Provinces

## Scope and deliverable

This deliverable is a single JSON object (province → data) intended for a Thailand travel-guide app, with **7 fixed categories per province**: `transport`, `routes`, `localFoods`, `accommodation`, `dangerZones`, `ecoIds/newEcoEntities`, and `metadata`.

The dataset is **grounded in official/government and major-platform sources where possible** (GI registries, official tourism office contacts, bus booking schedules, and hotel listing pages), and uses **clearly bounded estimates** where data is inherently volatile (e.g., local “queue” van schedules and some intra-province connections). citeturn18view0turn15search0turn6search0turn23view0turn20search0turn21search7

## Sources and verification

Local foods were anchored around the Thai government’s “1 Province 1 Menu” compilation (used as the **canonical “signature dish”** per province in `localFoods` where applicable). entity["organization","Public Relations Department","thai government agency"] citeturn18view0

Geographic Indication (GI) products were verified using the GI registry pages maintained by Thailand’s entity["organization","Department of Intellectual Property","thai ministry of commerce"], including entries such as **น้อยหน่าปากช่องเขาใหญ่**, **ทุเรียนภูเขาไฟศรีสะเกษ**, and **หอมแดงศรีสะเกษ**. citeturn15search0turn6search0turn9search14

Where relevant across multiple provinces, the GI status and multi-province scope of **ข้าวหอมมะลิทุ่งกุลาร้องไห้** were referenced from Thailand’s Ministry of Commerce communication. citeturn9search13

Province-level “local tourism office” emergency contacts were verified from the official local office list of the entity["organization","Tourism Authority of Thailand","thai tourism board"] (used in `metadata.emergencyContacts`). citeturn23view0

Intercity routes in `routes` intentionally prioritize bus/coach and van, because they are the most broadly available across these provinces. Departure times and baseline fares were sampled from entity["company","BusAndVan","thai bus ticket platform"] route pages for Bangkok → each province (and a small number of reverse/related listings), captured around early April 2026. Representative schedule/fare pages used include those for Nakhon Ratchasima, Chaiyaphum, Buri Ram, Surin, Si Sa Ket, Ubon Ratchathani, Roi Et, Maha Sarakham, Yasothon, and Amnat Charoen. citeturn20search0turn20search2turn19search7turn19search4turn19search1turn19search2turn20search1turn20search5turn21search7turn21search1

Accommodation examples were cross-checked using major listing platforms (city/province hotel lists and, where possible, property pages) and selected official property sites for key “anchor hotels.” This includes listings on entity["company","Agoda","online travel agency"] and entity["company","Booking.com","online lodging platform"] for provinces such as Si Sa Ket, Roi Et, Yasothon, and Amnat Charoen, plus official/primary sources for selected properties (e.g., Thongtarin Hotel, Sunee Grand Hotel, Cresco Hotel). citeturn27search5turn27search7turn28search9turn28search17turn25search2turn25search6turn26search0turn26search3turn26search9

## Modeling assumptions and trade-offs

Route tuples (`from/to/via/departureTimes/baseFare`) are **best-effort “current snapshots”** from booking pages rather than contractual timetables. In practice, **operators adjust schedules** by weekday/season, and some platforms show different inventories depending on the booking date. For this reason, `departureTimes` should be treated as *example departures* and not a complete timetable; `baseFare` is the *lowest observed* fare in the sampled listings. citeturn20search0turn19search4turn21search7turn21search1

Intra-province and inter-district routes (the “inside the province” part of `routes`) are modeled as **van/bus queue services** with reasonable departures/fare estimates, because most provinces do not publish stable, machine-readable schedules for those queues. This is a trade-off: the app gets coverage and UX value, but you should plan a future iteration to ingest local queue data from terminals, cooperatives, or regional transport authorities if you need high precision.

Risk and climate fields (`dangerZones`, `metadata.climate`) are written as **travel-facing safety warnings** and “typical seasonal patterns,” not as hazard maps. If you later need accuracy for compliance (e.g., flood zone polygons, wildfire sensors), this should be replaced by an external authoritative hazard feed.

## Province dataset JSON

```json
{
  "Nakhon Ratchasima": {
    "transport": [
      {
        "name": "รถสองแถวเมืองโคราช",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "เครือข่ายรถสองแถวสี/สาย ใช้วิ่งในเมืองและเชื่อมอำเภอใกล้เคียง",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#22c55e"
      },
      {
        "name": "รถตุ๊กตุ๊กโคราช",
        "shortName": "ตุ๊กตุ๊ก",
        "type": "tuk_tuk",
        "description": "พบได้มากในเขตตัวเมือง เหมาะกับระยะสั้น ๆ และต่อรองราคาได้",
        "warpUrl": "",
        "logoText": "🛺",
        "color": "#a855f7"
      },
      {
        "name": "วินมอเตอร์ไซค์",
        "shortName": "วินมอเตอร์ไซค์",
        "type": "bike",
        "description": "เหมาะกับระยะสั้น/เร่งด่วน โดยเฉพาะในตัวเมืองและตลาด",
        "warpUrl": "",
        "logoText": "🏍️",
        "color": "#10b981"
      },
      {
        "name": "รถเมล์/รถบัสในเมือง (บางเส้นทาง)",
        "shortName": "รถบัส",
        "type": "bus",
        "description": "มีรถโดยสารประจำทางบางเส้นทางในเขตเมืองและรอบเมือง",
        "warpUrl": "",
        "logoText": "🚌",
        "color": "#f97316"
      },
      {
        "name": "รถเรียกผ่านแอป/แท็กซี่",
        "shortName": "เรียกรถ",
        "type": "other",
        "description": "ตัวเลือกสำหรับเดินทางแบบประตูถึงประตู โดยเฉพาะในเมืองและย่านท่องเที่ยว",
        "warpUrl": "",
        "logoText": "🚗",
        "color": "#64748b"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ (หมอชิต2) - นครราชสีมา (รถทัวร์)",
        "type": "coach",
        "operator": "เชิดชัยทัวร์",
        "from": "กรุงเทพฯ",
        "to": "บขส.นครราชสีมา",
        "via": [
          "สระบุรี"
        ],
        "departureTimes": [
          "13:00",
          "19:00"
        ],
        "duration": "4-5 ชม.",
        "baseFare": 232,
        "frequency": "วันละหลายเที่ยว (~10 เที่ยว)",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": "เวลา/จุดจอดอาจเปลี่ยนตามวันและรอบรถ ควรตรวจสอบก่อนเดินทาง"
      },
      {
        "name": "สาย 2: กรุงเทพฯ (หมอชิต2) - ปากช่อง/เขาใหญ่ (รถตู้)",
        "type": "van",
        "operator": "คิวรถตู้หมอชิต-ปากช่อง",
        "from": "กรุงเทพฯ",
        "to": "ปากช่อง",
        "via": [
          "สระบุรี"
        ],
        "departureTimes": [
          "07:00",
          "10:00",
          "14:00"
        ],
        "duration": "3-4 ชม.",
        "baseFare": 200,
        "frequency": "ทุก 1-2 ชม. (โดยประมาณ)",
        "terminal": "หมอชิต 2 (คิวรถตู้)",
        "notes": null
      },
      {
        "name": "สาย 3: บขส.นครราชสีมา - ปากช่อง/ทางเข้าเขาใหญ่ (รถตู้/รถสองแถวต่อ)",
        "type": "van",
        "operator": "คิวรถตู้โคราช",
        "from": "บขส.นครราชสีมา",
        "to": "ปากช่อง/ด่านเขาใหญ่",
        "via": [],
        "departureTimes": [
          "08:00",
          "11:00",
          "15:00"
        ],
        "duration": "2-3 ชม.",
        "baseFare": 120,
        "frequency": "วันละหลายเที่ยว",
        "terminal": "บขส.นครราชสีมา",
        "notes": "บางช่วงอาจต้องต่อรถท้องถิ่นเพื่อเข้าพื้นที่อุทยาน"
      }
    ],
    "localFoods": [
      {
        "name": "ผัดหมี่โคราช",
        "priceRange": "40-80฿",
        "category": "local",
        "note": null
      },
      {
        "name": "เมี่ยงคำ (โคราช)",
        "priceRange": "30-60฿",
        "category": "local",
        "note": "ได้รับคัดเลือกเป็น 1 จังหวัด 1 เมนู เชิดชูอาหารถิ่น"
      },
      {
        "name": "ไก่กะเต็ด",
        "priceRange": "60-150฿",
        "category": "local",
        "note": "เมนูท้องถิ่นโคราช กลิ่นสมุนไพรจัด"
      },
      {
        "name": "น้อยหน่าปากช่องเขาใหญ่ (GI)",
        "priceRange": "80-200฿/กก.",
        "category": "local",
        "note": "ผลไม้ตามฤดูกาล (โดยมากปลายฝน-หนาว)"
      },
      {
        "name": "ขนมจีนประโดก",
        "priceRange": "40-100฿",
        "category": "street",
        "note": "เส้นแป้งหมักขึ้นชื่อของชุมชนบ้านประโดก"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "350-900฿/คืน",
        "examples": [
          "HOP INN Nakhon Ratchasima",
          "B2 Korat Boutique & Budget Hotel",
          "Zenith Residence Hotel"
        ],
        "bookingUrl": null
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "900-1,800฿/คืน",
        "examples": [
          "Kantary Hotel Korat",
          "The Imperial Hotel & Convention Centre Korat",
          "Sima Thani Hotel"
        ],
        "bookingUrl": null
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2,500-10,000฿/คืน",
        "examples": [
          "InterContinental Khao Yai Resort",
          "dusitD2 Khao Yai",
          "Muthi Maya Forest Pool Villa Resort"
        ],
        "bookingUrl": null
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศร้อนจัด/ฮีทสโตรก",
        "severity": "high",
        "note": "ช่วงหน้าร้อนอุณหภูมิสูง ควรดื่มน้ำและหลีกเลี่ยงแดดจัด",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "ฝนหนัก-น้ำป่าไหลหลากในพื้นที่ภูเขา",
        "severity": "medium",
        "note": "เขตอุทยาน/ลำห้วยอาจเกิดน้ำหลากฉับพลัน",
        "season": "ก.ค.-ต.ค."
      },
      {
        "label": "หมอกควัน/PM2.5 ช่วงหน้าแล้ง",
        "severity": "medium",
        "note": "คุณภาพอากาศอาจแย่เป็นช่วง ๆ โดยเฉพาะช่วงเผาในที่โล่ง",
        "season": "ม.ค.-เม.ย."
      },
      {
        "label": "สัตว์ป่าใกล้ถนนในเขตอุทยาน",
        "severity": "medium",
        "note": "ระวังช้างป่าและสัตว์ออกหากินช่วงค่ำ",
        "season": null
      }
    ],
    "ecoIds": [
      "f_elephant",
      "f_dog_stray",
      "t_mountain",
      "t_rainforest",
      "t_urban",
      "c_heat_stroke",
      "c_flash_flood",
      "c_pm25",
      "c_monsoon"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 16-38°C, หนาวแห้งพ.ย.-ก.พ., ร้อนจัดมี.ค.-พ.ค., ฝนพ.ค.-ต.ค.",
      "terrain": "ที่ราบสูงโคราช มีทั้งเขตเมืองใหญ่และแนวเขา-ป่าทางอำเภอปากช่อง/วังน้ำเขียว",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": [
        {
          "label": "ททท.สำนักงานนครราชสีมา",
          "number": "044-213030"
        },
        {
          "label": "ททท.สำนักงานนครราชสีมา",
          "number": "044-213666"
        }
      ]
    }
  },
  "Buri Ram": {
    "transport": [
      {
        "name": "รถสองแถว/รถรับจ้างสองแถวในตัวเมืองบุรีรัมย์",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "ใช้วิ่งในเมืองและไปอำเภอใกล้เคียง (เช่น นางรอง/ประโคนชัย)",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#22c55e"
      },
      {
        "name": "รถตุ๊กตุ๊ก/สามล้อเครื่อง",
        "shortName": "ตุ๊กตุ๊ก",
        "type": "tuk_tuk",
        "description": "มีให้บริการในตัวเมือง เหมาะกับระยะสั้น ๆ",
        "warpUrl": "",
        "logoText": "🛺",
        "color": "#a855f7"
      },
      {
        "name": "วินมอเตอร์ไซค์",
        "shortName": "วินมอเตอร์ไซค์",
        "type": "bike",
        "description": "ทางเลือกเร็วสำหรับระยะสั้นและต่อรถจาก บขส./สถานีรถไฟ",
        "warpUrl": "",
        "logoText": "🏍️",
        "color": "#10b981"
      },
      {
        "name": "รถโดยสารประจำทาง/รถทัวร์ระหว่างอำเภอ",
        "shortName": "รถบัส",
        "type": "bus",
        "description": "เชื่อมตัวเมืองกับอำเภอและจังหวัดใกล้เคียง",
        "warpUrl": "",
        "logoText": "🚌",
        "color": "#f97316"
      },
      {
        "name": "รถเช่า/เรียกรถผ่านแอป",
        "shortName": "เรียกรถ",
        "type": "other",
        "description": "สะดวกสำหรับเที่ยวหลายจุด (ปราสาทหิน/สนามกีฬา/วนอุทยาน)",
        "warpUrl": "",
        "logoText": "🚗",
        "color": "#64748b"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ (หมอชิต2) - บุรีรัมย์ (รถทัวร์)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส.)",
        "from": "กรุงเทพฯ",
        "to": "บขส.บุรีรัมย์",
        "via": [
          "สระบุรี",
          "นครราชสีมา"
        ],
        "departureTimes": [
          "18:00",
          "20:00"
        ],
        "duration": "6-7 ชม.",
        "baseFare": 337,
        "frequency": "วันละ ~4 เที่ยว",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": "เวลา/ชั้นรถอาจเปลี่ยนตามวัน ควรตรวจสอบก่อนเดินทาง"
      },
      {
        "name": "สาย 2: บขส.บุรีรัมย์ - นางรอง (รถตู้/รถบัสท้องถิ่น)",
        "type": "van",
        "operator": "คิวรถตู้บุรีรัมย์",
        "from": "บขส.บุรีรัมย์",
        "to": "นางรอง",
        "via": [],
        "departureTimes": [
          "08:00",
          "11:00",
          "15:00"
        ],
        "duration": "1-1.5 ชม.",
        "baseFare": 60,
        "frequency": "วันละหลายเที่ยว",
        "terminal": "บขส.บุรีรัมย์",
        "notes": null
      },
      {
        "name": "สาย 3: บขส.บุรีรัมย์ - ประโคนชัย/พนมรุ้ง (รถตู้/รถบัสท้องถิ่น)",
        "type": "van",
        "operator": "คิวรถตู้บุรีรัมย์",
        "from": "บขส.บุรีรัมย์",
        "to": "ประโคนชัย/ทางไปพนมรุ้ง",
        "via": [],
        "departureTimes": [
          "07:30",
          "10:30",
          "14:30"
        ],
        "duration": "1.5-2.5 ชม.",
        "baseFare": 80,
        "frequency": "วันละหลายเที่ยว",
        "terminal": "บขส.บุรีรัมย์",
        "notes": "หากไปปราสาทหินพนมรุ้งมักต้องต่อรถ/เหมารถจากอำเภอ"
      }
    ],
    "localFoods": [
      {
        "name": "ขนมตดหมา",
        "priceRange": "20-60฿",
        "category": "dessert",
        "note": "ได้รับคัดเลือกเป็น 1 จังหวัด 1 เมนู เชิดชูอาหรถิ่น"
      },
      {
        "name": "ลูกชิ้นยืนกิน (สถานีรถไฟบุรีรัมย์)",
        "priceRange": "30-100฿",
        "category": "street",
        "note": "ของกิน-ของฝากที่เป็นเอกลักษณ์ของบุรีรัมย์"
      },
      {
        "name": "กุ้งจ่อม (ประโคนชัย)",
        "priceRange": "50-150฿",
        "category": "local",
        "note": "กุ้งหมักรสเค็มเปรี้ยว กินกับข้าวเหนียว/ผัก"
      },
      {
        "name": "กระยาสารท (ประโคนชัย)",
        "priceRange": "30-120฿",
        "category": "dessert",
        "note": "ขนมไทยขึ้นชื่อ ใช้เป็นของฝาก"
      },
      {
        "name": "ไก่ย่าง (ร้านดังในตัวเมือง)",
        "priceRange": "80-180฿",
        "category": "street",
        "note": "มีหลายร้านดัง แนะนำชิมคู่ส้มตำ"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "350-900฿/คืน",
        "examples": [
          "HOP INN Buriram",
          "S1 City Hotel",
          "B2 Buriram Boutique & Budget Hotel"
        ],
        "bookingUrl": "https://www.agoda.com/city/buriram-th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "900-1,900฿/คืน",
        "examples": [
          "The Crystal Hotel Buriram",
          "Best Western Royal Buriram",
          "S1 City Hotel (Deluxe)"
        ],
        "bookingUrl": "https://www.agoda.com/city/buriram-th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2,000-6,000฿/คืน",
        "examples": [
          "Amari Buriram United",
          "Cresco Hotel Buriram",
          "The Crystal Hotel Buriram"
        ],
        "bookingUrl": "https://www.agoda.com/city/buriram-th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศร้อนจัด/ฮีทสโตรก",
        "severity": "high",
        "note": "กิจกรรมกลางแจ้ง (สนามกีฬา/โบราณสถาน) ควรป้องกันแดดและเติมน้ำ",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "หมอกควัน/PM2.5 ช่วงหน้าแล้ง",
        "severity": "medium",
        "note": "คุณภาพอากาศอาจแย่จากการเผาในที่โล่ง/ไฟป่า",
        "season": "ม.ค.-เม.ย."
      },
      {
        "label": "ฝนตกหนักและถนนลื่น",
        "severity": "medium",
        "note": "การขับรถไปโบราณสถาน/ภูเขาไฟโบราณควรใช้ความระมัดระวัง",
        "season": "ก.ค.-ต.ค."
      }
    ],
    "ecoIds": [
      "f_dog_stray",
      "t_urban",
      "c_heat_stroke",
      "c_pm25",
      "c_monsoon"
    ],
    "newEcoEntities": [
      {
        "id": "t_extinct_volcano",
        "name": "ภูเขาไฟดับ/ภูเขาไฟโบราณ",
        "category": "terrain",
        "tags": [
          "common"
        ],
        "desc": "บุรีรัมย์มีภูมิประเทศเกี่ยวกับภูเขาไฟโบราณและแหล่งธรณีวิทยาหลายจุด (เช่น วนอุทยานเขากระโดง) ทำให้มีดินและหินลักษณะเฉพาะในบางพื้นที่"
      }
    ],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 17-38°C, ร้อนจัดมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., หนาวแห้งพ.ย.-ก.พ.",
      "terrain": "ที่ราบสูงโคราชตอนล่าง มีแหล่งธรณีวิทยาเกี่ยวกับภูเขาไฟโบราณ และโบราณสถานหินทรายจำนวนมาก",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": [
        {
          "label": "ททท.สำนักงานบุรีรัมย์",
          "number": "044-634722"
        }
      ]
    }
  },
  "Surin": {
    "transport": [
      {
        "name": "รถสองแถว/รถรับจ้างในตัวเมืองสุรินทร์",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "มีสายวิ่งในเมืองและไปอำเภอใกล้เคียง รวมถึงจุดต่อรถไปชายแดน",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#22c55e"
      },
      {
        "name": "รถตุ๊กตุ๊กสุรินทร์",
        "shortName": "ตุ๊กตุ๊ก",
        "type": "tuk_tuk",
        "description": "พบได้ในย่านตลาด/สถานี/บขส. เหมาะกับทางสั้น",
        "warpUrl": "",
        "logoText": "🛺",
        "color": "#a855f7"
      },
      {
        "name": "วินมอเตอร์ไซค์",
        "shortName": "วินมอเตอร์ไซค์",
        "type": "bike",
        "description": "ใช้เดินทางจากสถานีรถไฟ/บขส. ไปที่พักและตลาดได้รวดเร็ว",
        "warpUrl": "",
        "logoText": "🏍️",
        "color": "#10b981"
      },
      {
        "name": "รถบัส/รถทัวร์ระหว่างอำเภอ",
        "shortName": "รถบัส",
        "type": "bus",
        "description": "เชื่อมตัวเมืองกับอำเภอต่าง ๆ และจังหวัดใกล้เคียง",
        "warpUrl": "",
        "logoText": "🚌",
        "color": "#f97316"
      },
      {
        "name": "รถเช่า/เหมารถ",
        "shortName": "เหมารถ",
        "type": "other",
        "description": "เหมาะกับการเที่ยวหลายจุด เช่น หมู่บ้านช้าง ตลาดชายแดน และโบราณสถาน",
        "warpUrl": "",
        "logoText": "🚗",
        "color": "#64748b"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ (หมอชิต2) - สุรินทร์ (รถทัวร์)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส.)",
        "from": "กรุงเทพฯ",
        "to": "บขส.สุรินทร์",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "บุรีรัมย์"
        ],
        "departureTimes": [
          "19:00",
          "21:00"
        ],
        "duration": "7-8 ชม.",
        "baseFare": 367,
        "frequency": "ประมาณ 16 เที่ยว/วัน",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 2: กรุงเทพฯ (หมอชิต2) - สุรินทร์ (รถทัวร์เอกชน)",
        "type": "coach",
        "operator": "สวัสดีสุรินทร์",
        "from": "กรุงเทพฯ",
        "to": "บขส.สุรินทร์",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "บุรีรัมย์"
        ],
        "departureTimes": [
          "21:45"
        ],
        "duration": "6-7 ชม.",
        "baseFare": 428,
        "frequency": "วันละหลายเที่ยว",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": "รอบรถกลางคืนเหมาะกับผู้ที่ต้องการถึงเช้ามืด"
      },
      {
        "name": "สาย 3: สุรินทร์ - ด่านช่องจอม (รถตู้/รถสองแถว)",
        "type": "van",
        "operator": "คิวรถตู้สุรินทร์",
        "from": "ตัวเมืองสุรินทร์",
        "to": "ด่านช่องจอม",
        "via": [],
        "departureTimes": [
          "06:00",
          "10:00",
          "14:00"
        ],
        "duration": "1.5-2.5 ชม.",
        "baseFare": 80,
        "frequency": "วันละหลายเที่ยว",
        "terminal": "บขส.สุรินทร์",
        "notes": "พกพาสปอร์ต/เอกสารตามข้อกำหนดหากข้ามแดน"
      }
    ],
    "localFoods": [
      {
        "name": "เบาะโดง (น้ำพริกมะพร้าวโบราณ)",
        "priceRange": "40-120฿",
        "category": "local",
        "note": "ได้รับคัดเลือกเป็น 1 จังหวัด 1 เมนู เชิดชูอาหารถิ่น"
      },
      {
        "name": "อังแกบบอบ (กบยัดไส้ย่าง)",
        "priceRange": "60-150฿",
        "category": "local",
        "note": "อาหารพื้นบ้านฝั่งอีสานใต้ กลิ่นสมุนไพรจัด"
      },
      {
        "name": "ปากหม้อสุรินทร์",
        "priceRange": "30-70฿",
        "category": "street",
        "note": "ของว่าง/อาหารเช้าที่มีชื่อเสียง"
      },
      {
        "name": "ข้าวหอมมะลิทุ่งกุลาร้องไห้ (GI)",
        "priceRange": "50-120฿/กก.",
        "category": "local",
        "note": "ผลผลิตเด่นของพื้นที่ทุ่งกุลาในหลายจังหวัดรวมสุรินทร์"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "350-900฿/คืน",
        "examples": [
          "HOP INN Surin",
          "Destino Hotel Surin",
          "Sorin hotel"
        ],
        "bookingUrl": null
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "900-1,800฿/คืน",
        "examples": [
          "Thongtarin Hotel Surin",
          "Slive Hotel Surin",
          "The Imperial Hotel Surin"
        ],
        "bookingUrl": null
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1,800-4,500฿/คืน",
        "examples": [
          "Slive Hotel Surin (Suite)",
          "Thongtarin Hotel Surin (Suite)",
          "The Imperial Hotel Surin (Suite)"
        ],
        "bookingUrl": null
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศร้อนจัด/ฮีทสโตรก",
        "severity": "high",
        "note": "งานเทศกาล/กิจกรรมกลางแจ้งมีคนหนาแน่น ควรพักเป็นระยะ",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "หมอกควัน/PM2.5 ช่วงหน้าแล้ง",
        "severity": "medium",
        "note": "อีสานใต้เสี่ยงหมอกควันเป็นช่วง ๆ",
        "season": "ม.ค.-เม.ย."
      },
      {
        "label": "พื้นที่ชายแดนและด่านผ่านแดน",
        "severity": "medium",
        "note": "ตรวจสอบเวลาเปิด-ปิดด่าน กฎศุลกากร และข่าวประกาศในพื้นที่ก่อนเดินทาง",
        "season": null
      }
    ],
    "ecoIds": [
      "f_elephant",
      "f_dog_stray",
      "t_urban",
      "c_heat_stroke",
      "c_pm25",
      "c_monsoon"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 17-38°C, ร้อนจัดมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., หนาวแห้งพ.ย.-ก.พ.",
      "terrain": "ที่ราบสูง-เกษตรกรรม มีวัฒนธรรมเขมร-กูย และเส้นทางเชื่อมชายแดน",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": [
        {
          "label": "ททท.สำนักงานสุรินทร์",
          "number": "044-514447"
        },
        {
          "label": "ททท.สำนักงานสุรินทร์",
          "number": "044-514448"
        }
      ]
    }
  },
  "Si Sa Ket": {
    "transport": [
      {
        "name": "รถสองแถว/รถรับจ้างในตัวเมืองศรีสะเกษ",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "ใช้วิ่งในเมืองและเชื่อมอำเภอ เช่น กันทรลักษ์/ขุนหาญ",
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
        "description": "สะดวกสำหรับระยะสั้นและต่อรถในตัวเมือง",
        "warpUrl": "",
        "logoText": "🏍️",
        "color": "#10b981"
      },
      {
        "name": "รถบัส/รถทัวร์ระหว่างอำเภอ",
        "shortName": "รถบัส",
        "type": "bus",
        "description": "เชื่อมตัวเมืองกับอำเภอและจังหวัดใกล้เคียง",
        "warpUrl": "",
        "logoText": "🚌",
        "color": "#f97316"
      },
      {
        "name": "รถเช่า/เหมารถไปแหล่งท่องเที่ยว",
        "shortName": "เหมารถ",
        "type": "other",
        "description": "เหมาะกับโซนภูเขา/ชายแดนที่ขนส่งประจำทางมีจำกัด",
        "warpUrl": "",
        "logoText": "🚗",
        "color": "#64748b"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ (หมอชิต2) - ศรีสะเกษ (รถทัวร์)",
        "type": "coach",
        "operator": "เชิดชัยทัวร์",
        "from": "กรุงเทพฯ",
        "to": "บขส.ศรีสะเกษ",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "บุรีรัมย์",
          "สุรินทร์"
        ],
        "departureTimes": [
          "09:00"
        ],
        "duration": "9-10 ชม.",
        "baseFare": 463,
        "frequency": "วันละหลายเที่ยว",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 2: กรุงเทพฯ (หมอชิต2) - ศรีสะเกษ (รถทัวร์ บขส.)",
        "type": "coach",
        "operator": "บริษัท ขนส่ง จำกัด (บขส.)",
        "from": "กรุงเทพฯ",
        "to": "บขส.ศรีสะเกษ",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "บุรีรัมย์",
          "สุรินทร์"
        ],
        "departureTimes": [
          "20:20"
        ],
        "duration": "9-10 ชม.",
        "baseFare": 463,
        "frequency": "วันละหลายเที่ยว",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": "รอบกลางคืนถึงเช้า เหมาะกับผู้ต่อรถไปอำเภออื่น"
      },
      {
        "name": "สาย 3: ตัวเมืองศรีสะเกษ - กันทรลักษ์/ขุนหาญ (รถตู้/รถบัสท้องถิ่น)",
        "type": "van",
        "operator": "คิวรถตู้ศรีสะเกษ",
        "from": "บขส.ศรีสะเกษ",
        "to": "กันทรลักษ์/ขุนหาญ",
        "via": [],
        "departureTimes": [
          "07:30",
          "11:30",
          "15:30"
        ],
        "duration": "1.5-3 ชม.",
        "baseFare": 80,
        "frequency": "วันละหลายเที่ยว",
        "terminal": "บขส.ศรีสะเกษ",
        "notes": null
      }
    ],
    "localFoods": [
      {
        "name": "ละแวกะตาม",
        "priceRange": "50-150฿",
        "category": "local",
        "note": "ได้รับคัดเลือกเป็น 1 จังหวัด 1 เมนู เชิดชูอาหารถิ่น"
      },
      {
        "name": "ทุเรียนภูเขาไฟศรีสะเกษ (GI)",
        "priceRange": "120-300฿/กก.",
        "category": "local",
        "note": "ผลผลิตตามฤดูกาล (มักช่วงพ.ค.-ก.ค.)"
      },
      {
        "name": "หอมแดงศรีสะเกษ (GI)",
        "priceRange": "20-60฿/กก.",
        "category": "local",
        "note": "ของดีเกษตรกรรม ใช้ทำอาหารได้หลากหลาย"
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
          "B2 Sisaket Boutique & Budget Hotel",
          "Boonsiri Boutique Hotel",
          "Srilamduan Hotel"
        ],
        "bookingUrl": "https://www.agoda.com/city/sisaket-th.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "900-1,800฿/คืน",
        "examples": [
          "Kradang Nga Boutique Inn",
          "Siri Ville Hotel",
          "Gallery Design - SHA Extra Plus"
        ],
        "bookingUrl": "https://www.agoda.com/city/sisaket-th.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1,800-3,500฿/คืน",
        "examples": [
          "Siri Ville Hotel (Suite)",
          "Gallery Design - SHA Extra Plus (Premium)",
          "Raeya Garden Hotel"
        ],
        "bookingUrl": "https://www.agoda.com/city/sisaket-th.html"
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศร้อนจัด/ฮีทสโตรก",
        "severity": "high",
        "note": "โดยเฉพาะการเที่ยวโซนภูเขา/ชายแดนกลางวัน",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "หมอกควัน/PM2.5 ช่วงหน้าแล้ง",
        "severity": "medium",
        "note": "อาจเกิดเป็นช่วง ๆ จากการเผาในที่โล่ง/ไฟป่า",
        "season": "ม.ค.-เม.ย."
      },
      {
        "label": "พื้นที่ชายแดนและการเดินทางบนถนนภูเขา",
        "severity": "medium",
        "note": "ตรวจสอบสภาพถนน-ฝนตก และกฎการผ่านแดนก่อนเดินทาง",
        "season": null
      }
    ],
    "ecoIds": [
      "f_dog_stray",
      "t_mountain",
      "t_urban",
      "c_heat_stroke",
      "c_pm25",
      "c_monsoon",
      "c_flash_flood"
    ],
    "newEcoEntities": [
      {
        "id": "t_volcanic_soil",
        "name": "ดินภูเขาไฟโบราณ",
        "category": "terrain",
        "tags": [
          "rare"
        ],
        "desc": "บางพื้นที่ของศรีสะเกษมีดินที่เกิดจากภูเขาไฟโบราณ ซึ่งเกี่ยวข้องกับเอกลักษณ์ของผลผลิตท้องถิ่น เช่น “ทุเรียนภูเขาไฟศรีสะเกษ”"
      }
    ],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 17-38°C, ร้อนจัดมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., หนาวแห้งพ.ย.-ก.พ.",
      "terrain": "โซนอีสานใต้ มีแนวเขาพนมดงรักและพื้นที่เกษตรกรรมกว้าง",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": [
        {
          "label": "ททท.สำนักงานสุรินทร์ (ดูแลศรีสะเกษ)",
          "number": "044-514447"
        },
        {
          "label": "ททท.สำนักงานสุรินทร์ (ดูแลศรีสะเกษ)",
          "number": "044-514448"
        }
      ]
    }
  },
  "Ubon Ratchathani": {
    "transport": [
      {
        "name": "รถสองแถว/รถแดง-รถเหลืองในตัวเมืองอุบลฯ",
        "shortName": "สองแถว",
        "type": "songthaew",
        "description": "มีสายวิ่งในเมืองและไปอำเภอสำคัญ เช่น วารินชำราบ เดชอุดม",
        "warpUrl": "",
        "logoText": "🛻",
        "color": "#22c55e"
      },
      {
        "name": "รถตุ๊กตุ๊ก/สามล้อเครื่อง",
        "shortName": "ตุ๊กตุ๊ก",
        "type": "tuk_tuk",
        "description": "พบได้ในตัวเมืองและย่านตลาด เหมาะกับระยะสั้น",
        "warpUrl": "",
        "logoText": "🛺",
        "color": "#a855f7"
      },
      {
        "name": "วินมอเตอร์ไซค์",
        "shortName": "วินมอเตอร์ไซค์",
        "type": "bike",
        "description": "สะดวกสำหรับระยะสั้นและต่อรถจาก บขส./สถานีรถไฟ",
        "warpUrl": "",
        "logoText": "🏍️",
        "color": "#10b981"
      },
      {
        "name": "รถบัส/รถทัวร์ระหว่างอำเภอ",
        "shortName": "รถบัส",
        "type": "bus",
        "description": "เชื่อมตัวเมืองกับอำเภอและจังหวัดใกล้เคียง",
        "warpUrl": "",
        "logoText": "🚌",
        "color": "#f97316"
      },
      {
        "name": "รถเช่า/เรียกรถผ่านแอป",
        "shortName": "เรียกรถ",
        "type": "other",
        "description": "เหมาะกับเที่ยวโซนอุทยาน/ผาแต้ม/โขงเจียมที่ระยะทางไกล",
        "warpUrl": "",
        "logoText": "🚗",
        "color": "#64748b"
      }
    ],
    "routes": [
      {
        "name": "สาย 1: กรุงเทพฯ (หมอชิต2) - อุบลราชธานี (รถทัวร์)",
        "type": "coach",
        "operator": "เชิดชัยทัวร์",
        "from": "กรุงเทพฯ",
        "to": "บขส.อุบลราชธานี",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "บุรีรัมย์",
          "สุรินทร์",
          "ศรีสะเกษ"
        ],
        "departureTimes": [
          "20:15"
        ],
        "duration": "9-10 ชม.",
        "baseFare": 571,
        "frequency": "วันละหลายเที่ยว",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": null
      },
      {
        "name": "สาย 2: กรุงเทพฯ (หมอชิต2) - อุบลราชธานี (รถทัวร์)",
        "type": "coach",
        "operator": "หมอชิตเอ็กเพรส",
        "from": "กรุงเทพฯ",
        "to": "บขส.อุบลราชธานี",
        "via": [
          "สระบุรี",
          "นครราชสีมา",
          "บุรีรัมย์",
          "สุรินทร์",
          "ศรีสะเกษ"
        ],
        "departureTimes": [
          "20:30"
        ],
        "duration": "9-10 ชม.",
        "baseFare": 574,
        "frequency": "วันละหลายเที่ยว",
        "terminal": "สถานีขนส่งหมอชิต 2",
        "notes": "เหมาะกับเดินทางรอบดึกถึงเช้า"
      },
      {
        "name": "สาย 3: ตัวเมืองอุบลฯ - ด่านช่องเม็ก (รถตู้/รถบัสท้องถิ่น)",
        "type": "van",
        "operator": "คิวรถตู้ อุบลฯ-ช่องเม็ก",
        "from": "บขส.อุบลราชธานี",
        "to": "ด่านช่องเม็ก",
        "via": [],
        "departureTimes": [
          "07:00",
          "10:00",
          "14:00"
        ],
        "duration": "2.5-3.5 ชม.",
        "baseFare": 120,
        "frequency": "วันละหลายเที่ยว",
        "terminal": "บขส.อุบลราชธานี",
        "notes": "พกพาสปอร์ต/เอกสารตามข้อกำหนดหากข้ามแดน"
      }
    ],
    "localFoods": [
      {
        "name": "ลาบหมาน้อย",
        "priceRange": "50-150฿",
        "category": "local",
        "note": "ได้รับคัดเลือกเป็น 1 จังหวัด 1 เมนู เชิดชูอาหรถิ่น"
      },
      {
        "name": "หมูยออุบล",
        "priceRange": "50-150฿",
        "category": "local",
        "note": "นิยมซื้อเป็นของฝาก มีทั้งแบบนึ่ง/ย่าง"
      },
      {
        "name": "ก๋วยจั๊บญวนอุบล",
        "priceRange": "50-90฿",
        "category": "street",
        "note": null
      },
      {
        "name": "ข้าวปุ้นน้ำแจ่ว",
        "priceRange": "40-90฿",
        "category": "street",
        "note": "ขนมจีนสไตล์อุบลฯ"
      }
    ],
    "accommodation": [
      {
        "tier": "budget",
        "label": "ประหยัด",
        "priceRange": "350-900฿/คืน",
        "examples": [
          "HOP INN Ubon Ratchathani",
          "Phadaeng Hotel",
          "V Hotel Ubon Ratchathani"
        ],
        "bookingUrl": null
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "900-2,000฿/คืน",
        "examples": [
          "Sunee Grand Hotel & Convention Center",
          "Unya Hotel Ubon",
          "V Hotel Ubon Ratchathani"
        ],
        "bookingUrl": null
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "2,000-4,500฿/คืน",
        "examples": [
          "Sunee Grand Hotel & Convention Center (Suite)",
          "Unya Hotel Ubon (Suite)",
          "The Bliss Ubon (Suite)"
        ],
        "bookingUrl": null
      }
    ],
    "dangerZones": [
      {
        "label": "อากาศร้อนจัด/ฮีทสโตรก",
        "severity": "high",
        "note": "กิจกรรมกลางแจ้งริมโขง/ผาแต้มควรหลีกเลี่ยงแดดจัด",
        "season": "มี.ค.-พ.ค."
      },
      {
        "label": "น้ำท่วม/น้ำหลากตามลุ่มน้ำมูล-โขง",
        "severity": "high",
        "note": "พื้นที่ลุ่มต่ำและชุมชนริมน้ำเสี่ยงน้ำท่วมช่วงมรสุม",
        "season": "ก.ย.-ต.ค."
      },
      {
        "label": "พื้นที่ชายแดนและการเดินทางไกล",
        "severity": "medium",
        "note": "ตรวจสอบเวลาเปิด-ปิดด่าน ช่องเม็ก และสภาพถนนก่อนเดินทาง",
        "season": null
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
      "t_rainforest",
      "t_urban",
      "c_heat_stroke",
      "c_flash_flood",
      "c_pm25",
      "c_monsoon"
    ],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิประมาณ 18-38°C, ร้อนจัดมี.ค.-พ.ค., ฝนพ.ค.-ต.ค. (เสี่ยงน้ำท่วมช่วงก.ย.-ต.ค.), หนาวแห้งพ.ย.-ก.พ.",
      "terrain": "เมืองใหญ่ริมลุ่มน้ำมูล เชื่อมแม่น้ำโขง มีโซนผาแต้ม/โขงเจียมและป่า-ผาหินหลายจุด",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": [
        {
          "label": "ททท.สำนักงานอุบลราชธานี",
          "number": "045-243770"
        },
        {
          "label": "ททท.สำนักงานอุบลราชธานี",
          "number": "045-250714"
        }
      ]
    }
  },
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
}
```

## Maintenance recommendations

If this JSON is going into production, treat it like a **versioned dataset** with refresh jobs, not a “one-time seed file.”

A maintainable approach is to introduce two parallel structures in your backend:
- A **canonical “static facts” layer** (GI products, official offices, province terrain descriptors) that changes slowly.
- A **volatile “operational schedules” layer** (routes, departure times, prices) that is time-stamped, cached, and automatically refreshed.

Concretely, add:
- `lastVerifiedAt` (ISO timestamp) per route and hotel example,
- `sourceType` (e.g., `gov_registry`, `tourism_office`, `booking_platform`, `local_estimate`),
- optional `confidence` (`high|medium|low`) for anything that is not directly read from a primary listing page.

This lets your app show high-confidence facts immediately and degrade gracefully when schedules and prices drift.