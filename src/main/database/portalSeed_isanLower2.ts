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
                "fl_jasmine_rice",
                "fl_lotus",
                "f_openbill_stork",
                "f_snakehead_fish",
                "t_chi_basin_plain",
                "t_wetland",
                "c_heat_dry",
                "h_flood"
        ],
        "newEcoEntities": [
                { id: "fl_jasmine_rice", name: "ข้าวหอมมะลิทุ่งกุลาร้องไห้", category: "flora", tags: ["common","edible","seasonal"], desc: "เป็นพืชเศรษฐกิจและภาพจำทางนิเวศเกษตรที่สำคัญมากของร้อยเอ็ด" },
                { id: "fl_lotus", name: "บัวหลวง", category: "flora", tags: ["common","edible","medicinal","seasonal"], desc: "พบในแหล่งน้ำตื้นและพื้นที่ชุ่มน้ำของจังหวัด เป็นทั้งพืชอาหารและใช้ประโยชน์ในชุมชน" },
                { id: "f_openbill_stork", name: "นกปากห่าง", category: "fauna", tags: ["common","protected","seasonal"], desc: "เป็นนกที่พบตามพื้นที่เกษตรชุ่มน้ำและแหล่งหอยน้ำจืดในจังหวัด" },
                { id: "f_snakehead_fish", name: "ปลาช่อน", category: "fauna", tags: ["common","edible","seasonal"], desc: "เป็นสัตว์น้ำพื้นถิ่นที่พบได้ในแหล่งน้ำจืดของพื้นที่ราบลุ่ม" },
                { id: "t_chi_basin_plain", name: "ที่ราบลุ่มลำน้ำชี", category: "terrain", tags: ["common"], desc: "เป็นภูมิประเทศหลักของร้อยเอ็ด ใช้ประโยชน์ด้านเกษตรกรรมอย่างกว้างขวาง" },
                { id: "t_wetland", name: "บึงและพื้นที่ชุ่มน้ำ", category: "terrain", tags: ["common"], desc: "ทำหน้าที่เป็นทั้งแหล่งน้ำ แหล่งอาศัยสัตว์น้ำ และพื้นที่พักน้ำในฤดูฝน" },
                { id: "c_heat_dry", name: "อากาศร้อนจัดช่วงหน้าแล้ง", category: "climate", tags: ["common","danger","seasonal"], desc: "อุณหภูมิสูงและแดดแรงเป็นลักษณะเด่นของพื้นที่ราบอีสานในปลายฤดูร้อน" },
                { id: "h_flood", name: "น้ำท่วมพื้นที่นาและชุมชนลุ่มต่ำ", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนสะสมทำให้พื้นที่ลุ่มนามีน้ำท่วมขังได้ โดยเฉพาะช่วงน้ำมากในลำน้ำสายหลัก" }
        ],
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
        },
        "knowledgeTips": [
            {
                "title": "งานบุญบั้งไฟ",
                "content": "ในฤดูร้อน (พ.ค.-มิ.ย.) มีประเพณีจุดบั้งไฟก่อเจดีย์ที่เมืองหลวง จัดขบวนตระการตาช่วงงานบุญ",
                "type": "culture"
            },
            {
                "title": "พระพุทธรูปสำคัญ",
                "content": "วัดพระธาตุไชยาราช หรือวัดป่าแสงอรุณ เป็นที่ประดิษฐานพระธาตุสำคัญ ควรเคารพบูชาอย่างเคร่งครัด",
                "type": "culture"
            },
            {
                "title": "ภูมิทัศน์",
                "content": "ตัวเมืองรายล้อมด้วยบึงพลาญชัยขนาดใหญ่ มีพระพุทธรูปยืนสูง 25 เมตรกลางน้ำ ควรไปสักการะ",
                "type": "culture"
            },
            {
                "title": "การเดินทาง",
                "content": "ถนนหมายเลข 214 จากนครราชสีมาไปจันดี ผ่านโรยเอ็ท มีรถประจำทางวิ่งทุกวันจากทั้งกรุงเทพฯ ขอนแก่น",
                "type": "route"
            },
            {
                "title": "ผ้าไหมและเครื่องจักสาน",
                "content": "หนองกุง (วังสามหมอ) ชื่อเสียงเรื่องผ้าไหม, ถักเทียนชัย, เครื่องจักสานหวาย เป็นสินค้าพื้นเมืองคุณภาพสูง",
                "type": "culture"
            },
            {
                "title": "ค่าใช้จ่าย",
                "content": "เป็นเมืองเล็ก สถานที่ท่องเที่ยวหลักค่าเข้าชมถูกหรือฟรี มีอาหารท้องถิ่นราคาถูกบริการ",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขาร้อยเอ็ด",
                "area": "ตัวเมืองร้อยเอ็ด (ใกล้สำนักงานเทศบาล)",
                "note": "บริการ ATM 24 ชม.",
                "openHours": "09:30-15:30",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกสิกรไทย สาขาวัดกลาง",
                "area": "แยกถนนสุขเกษม-บุญทัน",
                "note": "บริการตลอดวัน",
                "openHours": "09:30-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมัน ปตท. สาขาร้อยเอ็ด",
                "area": "ถนนขุขันธ์-ศรีสะเกษ ฝั่งขาเข้าเมือง",
                "note": "ร้านสะดวกซื้อ ห้องน้ำ",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำ สถานีขนส่งร้อยเอ็ด",
                "area": "ถนนโชคชัย",
                "note": "บริการฟรี 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้าน Boots สาขา Central Plaza",
                "area": "เซ็นทรัลพลาซา ร้อยเอ็ด",
                "note": "ยาและเวชภัณฑ์",
                "openHours": "10:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลร้อยเอ็ด",
                "area": "ถนนสุขเกษม",
                "note": "โรงพยาบาลหลัก",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรเมืองร้อยเอ็ด",
                "area": "ถนนเจริญเมือง",
                "note": "ติดต่อได้ตลอด 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพมหานคร",
                "ขอนแก่น",
                "บุรีรัมย์",
                "สุรินทร์"
            ],
            "commonDestinations": [
                "วัดพระบรมธาตุไชยาราช",
                "กู่คำ (โบราณสถานศรีวิชัย)",
                "Thanon Phadung Phanit (ถนนผดุงพานิช)",
                "Bueng Phlan Chai (บึงพลาญชัย)",
                "วิหารวัดกลาง (หลวงพ่อองค์แสน)"
            ],
            "transitHubs": [
                "สถานีขนส่งร้อยเอ็ด",
                "สถานีรถไฟร้อยเอ็ด"
            ],
            "routeNotes": [
                "ทางหลวงหมายเลข 214 ผ่านจังหวัดร้อยเอ็ด เชื่อมโยงเส้นทางภาคอีสาน",
                "จากโคราช-ร้อยเอ็ด ใช้เวลาประมาณ 4-5 ชั่วโมง ขึ้นอยู่กับสภาพจราจร",
                "ถนนบางเส้นในตัวเมืองมีหลุม ควรขับระมัดระวัง",
                "ช่วงเทศกาลสงกรานต์และบั้งไฟมีรถเข้าตัวเมืองหนาแน่น",
                "ตรวจสอบเส้นทางล่วงหน้าช่วงฤดูฝน อาจมีน้ำท่วมขัง"
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
                "fl_jasmine_rice",
                "fl_lotus",
                "f_openbill_stork",
                "f_frog_ricefield",
                "t_chi_basin_plain",
                "t_reservoir_wetland",
                "c_pm25",
                "h_drought"
        ],
        "newEcoEntities": [
                { id: "fl_jasmine_rice", name: "ข้าวหอมมะลิทุ่งกุลาร้องไห้", category: "flora", tags: ["common","edible","seasonal"], desc: "เป็นพืชเศรษฐกิจสำคัญและผูกกับภูมิทัศน์ชนบทของจังหวัด" },
                { id: "fl_lotus", name: "บัว", category: "flora", tags: ["common","edible","medicinal"], desc: "พบบ่อยในแหล่งน้ำจืดตื้นของจังหวัด และมีบทบาททั้งด้านอาหารและภูมิทัศน์" },
                { id: "f_openbill_stork", name: "นกปากห่าง", category: "fauna", tags: ["common","protected","seasonal"], desc: "พบได้ในภูมิทัศน์นาข้าวและพื้นที่ชุ่มน้ำซึ่งมีหอยและสัตว์น้ำขนาดเล็ก" },
                { id: "f_frog_ricefield", name: "กบนา", category: "fauna", tags: ["common","edible","seasonal"], desc: "เป็นสัตว์สะเทินน้ำสะเทินบกที่สัมพันธ์กับระบบนิเวศนาข้าวและช่วงฝน" },
                { id: "t_chi_basin_plain", name: "ที่ราบลุ่มลำน้ำชี", category: "terrain", tags: ["common"], desc: "มหาสารคามเป็นจังหวัดที่ราบลุ่มและที่ราบเกษตรเป็นหลัก เชื่อมโยงกับลุ่มน้ำชี" },
                { id: "t_reservoir_wetland", name: "อ่างเก็บน้ำและพื้นที่ชุ่มน้ำ", category: "terrain", tags: ["common"], desc: "เป็นแหล่งน้ำสำคัญของจังหวัดและเป็นถิ่นอาศัยสัตว์น้ำกับนกน้ำ" },
                { id: "c_pm25", name: "ฝุ่น PM2.5 และควันจากการเผา", category: "climate", tags: ["danger","common","seasonal"], desc: "ฤดูแล้งและการเผาในที่โล่งทำให้คุณภาพอากาศแย่ลงได้ชัดเจน" },
                { id: "h_drought", name: "ภัยแล้งสลับน้ำท่วม", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "จังหวัดมีความเปราะบางต่อทั้งฝนทิ้งช่วงและน้ำท่วมขังในบางปี" }
        ],
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
        },
        "knowledgeTips": [
            {
                "title": "ศูนย์กลางศึกษา",
                "content": "มหาสารคามเป็นเมืองการศึกษา มีมหาวิทยาลัยหลายแห่ง แนะนำให้ใช้บริการ wi-fi สาธารณะได้ตามมหาวิทยาลัยใหญ่",
                "type": "culture"
            },
            {
                "title": "พระพุทธศาสนา",
                "content": "เป็นศูนย์รวมพุทธสมบัติ มีวัดเก่าแก่หลายแห่ง เช่น วัดศรีรัตนมหาธาตุ และพิพิธภัณฑ์สิ่งหายากทางพุทธศาสนา",
                "type": "culture"
            },
            {
                "title": "ผ้าทอพื้นเมือง",
                "content": "ผ้าขิดมัดหมี่และผ้าฝ้ายบ้านไร่มีชื่อเสียง มีร้านจำหน่ายผ้าทอท้องถิ่นหลายแห่งในเมือง",
                "type": "culture"
            },
            {
                "title": "การเดินทาง",
                "content": "มีรถทัวร์วิ่งตรงจากขอนแก่นถึงมหาสารคาม ใช้เวลาประมาณ 1-2 ชั่วโมง ช่วงเช้ามีหลายเที่ยว",
                "type": "route"
            },
            {
                "title": "ฤดูฝน",
                "content": "ช่วงเดือน มิ.ย.-ก.ย. ฝนตกบ่อย ถนนบางช่วงน้ำท่วมเล็กน้อย ควรตรวจสอบเส้นทางก่อนเดินทาง",
                "type": "season"
            },
            {
                "title": "งบประมาณ",
                "content": "เนื่องจากเป็นเมืองนักศึกษา ค่าอาหารและค่าที่พักถูกกว่าหลายจังหวัด ใกล้ตลาดสดมีร้านอาหารราคาไม่แพง",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขามหาสารคาม",
                "area": "ถนนเทศบาล 14",
                "note": "มี ATM",
                "openHours": "09:30-15:30",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกสิกรไทย สาขาถนนคนเดิน",
                "area": "ถนนข้าวตอกหมาก",
                "note": "ใกล้ตลาดไนท์",
                "openHours": "09:30-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมัน PTT มหาสารคาม",
                "area": "หน้าเซ็นทรัลพลาซา มหาสารคาม",
                "note": "ร้านสะดวกซื้อพร้อมบริการ",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำตลาดสดเทศบาล",
                "area": "ตลาดสดเทศบาล เขตเทศบาลเมือง",
                "note": "บริการฟรี",
                "openHours": "06:00-19:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้าน Boots สาขามหาสารคาม",
                "area": "ศูนย์การค้าหนองบัว (Central Maha Sarakham)",
                "note": "ยาและเวชภัณฑ์ครบ",
                "openHours": "10:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลมหาสารคาม",
                "area": "ถนนมหาวิทยาลัยราชภัฏ",
                "note": "โรงพยาบาลหลักของจังหวัด",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรมหาสารคาม",
                "area": "ถนนพิมลวิภาต",
                "note": "บริการประชาชน 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "ขอนแก่น",
                "ร้อยเอ็ด",
                "มหาสารคาม (ตัวเมือง)",
                "กาฬสินธุ์"
            ],
            "commonDestinations": [
                "วัดศรีรัตนมหาธาตุ",
                "พิพิธภัณฑ์สิ่งของมีค่าอีสาน",
                "ตลาดสดเทศบาล",
                "ถนนคนเดินพลานุภาพ",
                "บึงหนองหาร"
            ],
            "transitHubs": [
                "สถานีขนส่งมหาสารคาม",
                "สถานีรถไฟมหาสารคาม"
            ],
            "routeNotes": [
                "ถนน 223 จากขอนแก่นมาถึงมหาสารคาม ใช้เวลา ~1 ชั่วโมง",
                "หลีกเลี่ยงขึ้น-ลงจุดสำคัญช่วงเช้า-เย็นถนนแคบ",
                "อากาศร้อนจัดเดือน เม.ย.-พ.ค. ควรเตรียมเครื่องดื่มและร่ม",
                "ถนนในตัวเมืองส่วนใหญ่ลาดยางดี สามารถเดินทางสะดวกโดยรถยนต์",
                "ธนาคารและร้านค้าใกล้ตลาดสดเปิดบริการเช้า-เย็น"
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
                "fl_jasmine_rice",
                "fl_bamboo",
                "f_openbill_stork",
                "f_frog_ricefield",
                "t_chi_plain",
                "t_wetland",
                "c_pm25",
                "h_flood"
        ],
        "newEcoEntities": [
                { id: "fl_jasmine_rice", name: "ข้าวหอมมะลิทุ่งกุลาร้องไห้", category: "flora", tags: ["common","edible","seasonal"], desc: "ยโสธรเป็นหนึ่งในพื้นที่ปลูกข้าวหอมมะลิ GI ของทุ่งกุลาร้องไห้" },
                { id: "fl_bamboo", name: "ไผ่", category: "flora", tags: ["common","edible"], desc: "พบในป่าชุมชนและพื้นที่ชนบท ใช้ประโยชน์ได้หลากหลายและสัมพันธ์กับวิถีท้องถิ่น" },
                { id: "f_openbill_stork", name: "นกปากห่าง", category: "fauna", tags: ["common","protected","seasonal"], desc: "มักพบหากินตามนาและแหล่งน้ำตื้นของจังหวัด" },
                { id: "f_frog_ricefield", name: "กบนา", category: "fauna", tags: ["common","edible","seasonal"], desc: "เป็นสัตว์ที่สัมพันธ์ชัดกับระบบนิเวศนาข้าวและฤดูฝนของยโสธร" },
                { id: "t_chi_plain", name: "ที่ราบลุ่มเกษตรกรรม", category: "terrain", tags: ["common"], desc: "ภูมิประเทศหลักเป็นที่ราบลุ่มและทุ่งนา ใช้ปลูกข้าวอย่างกว้างขวาง" },
                { id: "t_wetland", name: "หนองบึงและพื้นที่ชุ่มน้ำ", category: "terrain", tags: ["common"], desc: "เป็นแหล่งน้ำสำคัญของชุมชนและแหล่งอาศัยของสัตว์น้ำกับนกน้ำ" },
                { id: "c_pm25", name: "ฝุ่นละอองและควันจากการเผา", category: "climate", tags: ["danger","common","seasonal"], desc: "คุณภาพอากาศอาจแย่ลงในช่วงแล้งจากการเผาเศษวัสดุและสภาพลมนิ่ง" },
                { id: "h_flood", name: "น้ำท่วมขังพื้นที่นา", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนหนักต่อเนื่องทำให้พื้นที่นาและทางท้องน้ำระบายน้ำช้าเกิดน้ำท่วมขังได้" }
        ],
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
        },
        "knowledgeTips": [
            {
                "title": "งานบั้งไฟยโสธร",
                "content": "เป็นงานบุญประจำปีในเดือนพฤษภาคม มีการจุดบั้งไฟขนาดใหญ่ สามารถชมขบวนแห่และการจุดพลุได้ระยะไกล",
                "type": "culture"
            },
            {
                "title": "เทศกาลบอลลูน",
                "content": "เดือนมกราคมมีเทศกาลบอลลูนสวรรค์อีสาน (Yasothon Balloon Festival) ชมบอลลูนหลากสีได้ริมฝั่งโขง",
                "type": "culture"
            },
            {
                "title": "อาหารพื้นเมือง",
                "content": "ชิมข้าวปุ้นปลาโขง, ลาบปลาบึก และอาหารอีสานทั่วไปที่ตลาดเช้าในเมืองราคาย่อมเยา",
                "type": "food"
            },
            {
                "title": "การเดินทาง",
                "content": "ถนนสาย 23 จากร้อยเอ็ดเข้าสู่ยโสธร ได้สะดวก มีรถทัวร์ออกวันละหลายเที่ยวจากขอนแก่นและกรุงเทพฯ",
                "type": "route"
            },
            {
                "title": "ความปลอดภัย",
                "content": "เป็นจังหวัดเล็กและเงียบปลอดภัย ช่วงฝนถนนอาจมีน้ำท่วมขังบริเวณชุมชนติดแม่น้ำโขง",
                "type": "safety"
            },
            {
                "title": "สินค้าพื้นเมือง",
                "content": "ผ้าไหมลายโบราณเป็นเอกลักษณ์ ย้อมสีธรรมชาติ-บ้านสิมมโนราห์มีชื่อเสียง นอกจากนี้มีผ้าพื้นเมืองขายในตลาดชุมชน",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขายโสธร",
                "area": "ตัวเมืองยโสธร",
                "note": "ATM 24 ชม.",
                "openHours": "09:30-15:30",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกสิกรไทย สาขาตลาดพลอย",
                "area": "ตลาดพลอย ตัวเมือง",
                "note": "ฝาก-ถอนเงินทั่วไป",
                "openHours": "09:30-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมัน ปตท. สาขายโสธร",
                "area": "ถนนยโสธร-ร้อยเอ็ด",
                "note": "มีร้านสะดวกซื้อ",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำ สถานีขนส่งยโสธร",
                "area": "ตัวเมืองยโสธร",
                "note": "บริการผู้โดยสาร 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้าน Boots สาขายโสธร",
                "area": "Central Plaza Yasothon",
                "note": "เวชภัณฑ์และยาราคาปานกลาง",
                "openHours": "10:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลยโสธร",
                "area": "ถนนตำรวจ",
                "note": "โรงพยาบาลหลักจังหวัด",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรเมืองยโสธร",
                "area": "ถนนราษฎรดำเนิน",
                "note": "บริการประชาชนตลอด 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "ร้อยเอ็ด",
                "อุบลราชธานี",
                "นครราชสีมา",
                "สปป.ลาว (จำปาศักดิ์)"
            ],
            "commonDestinations": [
                "วัดพนัญเชิงวรวิหาร",
                "จุดชมวิวหินตั้ง (ลานหินตั้ง)",
                "พิพิธภัณฑ์ผ้าไหมไทย",
                "โบราณสถานแหลมทอง",
                "ตลาดทะเลแก้ว"
            ],
            "transitHubs": [
                "สถานีขนส่งยโสธร"
            ],
            "routeNotes": [
                "เส้นทางหลักคือถนน 215 จากร้อยเอ็ด-ยโสธร",
                "รถทัวร์วิ่งระหว่างยโสธรกับขอนแก่นและอุบลฯ หลายเที่ยวต่อวัน",
                "ช่วงเทศกาลบั้งไฟถนนรอบสนามเทศบาลจะแออัดมาก",
                "ถนนสายรองบางจุดชำรุด ควรขับช้า",
                "รถสองแถวสีเขียวและสีแดงให้บริการในเมือง"
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
                "fl_phayung",
                "fl_bamboo",
                "f_elephant",
                "f_openbill_stork",
                "t_undulating_plain",
                "t_stream_forest",
                "c_heat_dry",
                "h_drought"
        ],
        "newEcoEntities": [
                { id: "fl_phayung", name: "พะยูง", category: "flora", tags: ["rare","protected"], desc: "เป็นไม้มีค่าที่พบในกลุ่มป่าอีสานตะวันออกและต้องคุ้มครองอย่างเข้มงวด" },
                { id: "fl_bamboo", name: "ไผ่พื้นถิ่น", category: "flora", tags: ["common","edible"], desc: "พบได้ตามป่าชุมชนและริมแหล่งน้ำ ใช้ประโยชน์ในครัวเรือนและอาหารพื้นบ้าน" },
                { id: "f_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","rare","protected"], desc: "เกี่ยวข้องกับแนวผืนป่าฝั่งตะวันออกของจังหวัดและเขตรอยต่อพื้นที่อนุรักษ์" },
                { id: "f_openbill_stork", name: "นกปากห่าง", category: "fauna", tags: ["common","protected","seasonal"], desc: "พบบ่อยในภูมิทัศน์เกษตรกรรมและพื้นที่ชุ่มน้ำของจังหวัด" },
                { id: "t_undulating_plain", name: "ที่ราบลูกคลื่นสลับเนิน", category: "terrain", tags: ["common"], desc: "ลักษณะเด่นคือพื้นที่เกษตรบนที่ดอนสลับพื้นที่ลุ่มขนาดเล็ก" },
                { id: "t_stream_forest", name: "ลำห้วยและป่าชุมชน", category: "terrain", tags: ["common"], desc: "เป็นภูมิทัศน์สำคัญของจังหวัดที่รองรับความหลากหลายชีวภาพในระดับชุมชน" },
                { id: "c_heat_dry", name: "อากาศร้อนแห้งและฝนทิ้งช่วง", category: "climate", tags: ["common","danger","seasonal"], desc: "สภาพอากาศร้อนและความผันผวนของฝนมีผลต่อเกษตรน้ำฝนของจังหวัด" },
                { id: "h_drought", name: "ภัยแล้ง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "เป็นความเสี่ยงเด่นของจังหวัดที่พึ่งพาฝนและมีแหล่งน้ำขนาดใหญ่ไม่มาก" }
        ],
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
        },
        "knowledgeTips": [
            {
                "title": "ผ้าไหมพื้นเมือง",
                "content": "หมู่บ้านในอำเภอปลาปากและอำเภอเมืองมีชื่อเสียงเรื่องผ้าไหม และผ้าขิตของชาวภูไท เป็นของฝากยอดนิยม",
                "type": "culture"
            },
            {
                "title": "แข่งขันเรือยาว",
                "content": "ทุกเดือนพฤศจิกายนจัดงานเทศกาลแข่งเรือที่อำเภอชานุมานริมแม่น้ำโขง มีการแสดงพื้นเมืองตลอดงาน",
                "type": "culture"
            },
            {
                "title": "ธรรมชาติริมโขง",
                "content": "ชมวิวริมแม่น้ำโขงและบ้านกระแชง จุดชมวิวเขื่อนห้วยหลวง เหมาะกับนักเดินทางชอบธรรมชาติ",
                "type": "culture"
            },
            {
                "title": "การเดินทาง",
                "content": "ใช้ถนน 212 จากอุบลราชธานีผ่านอำเภอปทุมราชวงศาเข้าสู่อำเภอเมืองอำนาจเจริญ ก่อนเลี้ยวลงอำนาจเจริญ",
                "type": "route"
            },
            {
                "title": "ความปลอดภัย",
                "content": "อำนาจเจริญเป็นจังหวัดเล็กและเงียบสงบ สภาพแวดล้อมริมโขงอาจลื่นในฤดูฝน ระวังยุงและแมลงน้ำ",
                "type": "safety"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขาอำนาจเจริญ",
                "area": "ถนนกสิกร",
                "note": "ATM บริการ 24 ชม.",
                "openHours": "09:30-15:30",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกสิกรไทย สาขาบ้านเหล่ากอง",
                "area": "แยกตลาดสดบ้านเล่า",
                "note": "ฝาก-ถอนเงิน",
                "openHours": "09:30-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมัน ปตท. สาขาอำนาจเจริญ",
                "area": "ถนนเอเชีย (328) หน้าเทศบาลเมือง",
                "note": "มีร้านสะดวกซื้อ",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำ สถานีขนส่งอำนาจเจริญ",
                "area": "ตัวเมืองอำนาจเจริญ",
                "note": "บริการผู้โดยสาร 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้าน Boots สาขา Big C อำนาจเจริญ",
                "area": "ศูนย์การค้า Big C",
                "note": "เวชภัณฑ์และยาราคาประหยัด",
                "openHours": "10:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลอำนาจเจริญ",
                "area": "ถนนสุริยศิริ",
                "note": "โรงพยาบาลหลัก",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรเมืองอำนาจเจริญ",
                "area": "ตลาดนิกร",
                "note": "บริการประชาชน 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "อุบลราชธานี",
                "ร้อยเอ็ด",
                "ขอนแก่น",
                "สปป.ลาว (จำปาศักดิ์)"
            ],
            "commonDestinations": [
                "วัดหลวง (ธาตุนาหลวง)",
                "เขื่อนห้วยหลวง",
                "จุดชมวิวบ้านกระแชง",
                "วัดศรีสวางคบุรี",
                "ตลาดสดเทศบาลเมือง"
            ],
            "transitHubs": [
                "สถานีขนส่งอุบลราชธานี",
                "สถานีขนส่งอำนาจเจริญ"
            ],
            "routeNotes": [
                "ถนนหมายเลข 212 วิ่งจากอุบลฯ เข้าสู่อำนาจเจริญผ่านเมือง",
                "มีรถประจำทางและรถตู้จากอุบลฯ ไปอำนาจเจริญหลายเที่ยวต่อวัน",
                "พิจารณาเที่ยวชมสถานที่ตามลำน้ำโขงในยามเย็น เรือยนต์ผู้โดยสารบริการในเมือง",
                "ถนนลัดเลาะริมแม่น้ำบางช่วงอาจอุปสรรค น้ำท่วม ต้องตรวจสอบสภาพถนน",
                "หากข้ามไป สปป.ลาว ใช้สะพานตัดใหม่ (หนองคาย-เวียงจันทน์) แล้วต่อถนน 9 ผ่านปากซอง"
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
                "fl_siam_tulip",
                "fl_dipterocarp",
                "f_elephant",
                "f_hornbill",
                "t_sandstone_cliff",
                "t_plateau_mountain",
                "c_pm25",
                "h_wildfire"
        ],
        "newEcoEntities": [
                { id: "fl_siam_tulip", name: "ดอกกระเจียว", category: "flora", tags: ["common","protected","seasonal"], desc: "เป็นพืชเด่นของชัยภูมิและเป็นภาพจำทางนิเวศของทุ่งหญ้าบนภู" },
                { id: "fl_dipterocarp", name: "ไม้เต็งรัง", category: "flora", tags: ["common"], desc: "เป็นกลุ่มพืชเด่นของป่าผลัดใบบนพื้นที่สูงในชัยภูมิ" },
                { id: "f_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","rare","protected"], desc: "พบในพื้นที่ป่าอนุรักษ์บางส่วนของจังหวัดและต้องระวังเมื่อเข้าพื้นที่ป่า" },
                { id: "f_hornbill", name: "นกเงือก", category: "fauna", tags: ["common","rare","protected"], desc: "บ่งชี้ถึงคุณภาพป่าที่ดีและต้นไม้ใหญ่ที่ยังเหลืออยู่" },
                { id: "t_sandstone_cliff", name: "หน้าผาหินทรายและลานหิน", category: "terrain", tags: ["common","danger"], desc: "เป็นลักษณะภูมิประเทศเด่นของชัยภูมิ เกิดเป็นจุดชมวิวและลานหินขนาดใหญ่" },
                { id: "t_plateau_mountain", name: "ภูเขาสูงสลับทุ่งหญ้า", category: "terrain", tags: ["common","danger"], desc: "พื้นที่สูงของจังหวัดมีทั้งป่า ทุ่งหญ้า และหน้าผา เป็นภูมิประเทศต่างจากอีสานตอนในทั่วไป" },
                { id: "c_pm25", name: "ฝุ่น PM2.5", category: "climate", tags: ["danger","common","seasonal"], desc: "ทั้งควันจากการเผาและไฟป่าทำให้คุณภาพอากาศลดลงในบางช่วงของปี" },
                { id: "h_wildfire", name: "ไฟป่าในพื้นที่สูง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ป่าโปร่งและทุ่งหญ้าบนพื้นที่สูงเสี่ยงไฟป่าในฤดูแห้งมากกว่าพื้นที่ราบทั่วไป" }
        ],
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
        },
        "knowledgeTips": [
            {
                "title": "ทะเลหมอกดอกกระเจียว",
                "content": "เดินทางช่วง มิ.ย.-ก.ค. ได้ชมทุ่งดอกกระเจียว (น้ำตกสีทอง, ป่าหินงาม) ในอุทยานแห่งชาติไทรทอง",
                "type": "season"
            },
            {
                "title": "การเดินทาง",
                "content": "ใช้ถนนหมายเลข 201 จากนครราชสีมาเข้าสู่ชัยภูมิ จากนั้นไปต่อทางหลวงสายรองไปอุทยานต่างๆ",
                "type": "route"
            },
            {
                "title": "ธรรมชาติและน้ำตก",
                "content": "มีน้ำตกสวยหลายแห่ง เช่น น้ำตกแก่งกระจาน (ในป่าหินงาม) และน้ำตกตูดช้าง (ใน ไทรทอง)",
                "type": "culture"
            },
            {
                "title": "ภูเขาและผา",
                "content": "จุดชมวิวผาหำหด และหมู่ผาหินปูนแปลกตา (หมู่บ้านหินงาม) เป็นจุดถ่ายรูปยอดนิยม",
                "type": "culture"
            },
            {
                "title": "ค่าธรรมเนียม",
                "content": "เข้าอุทยานฯ คิดค่าธรรมเนียมคนละ ~40 บาท, ค่ารถยนต์ ~30-50 บาท (ข้อมูล 2024)",
                "type": "budget"
            },
            {
                "title": "ความปลอดภัย",
                "content": "ถนนในเขตอุทยานชันบางช่วง ควรขับรถระมัดระวังโดยเฉพาะฤดูฝนที่ถนนลื่น",
                "type": "safety"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงไทย สาขาชัยภูมิ",
                "area": "ตัวเมืองชัยภูมิ",
                "note": "ATM 24 ชม.",
                "openHours": "09:30-15:30",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกสิกรไทย สาขาตลาดเทศบาลเมือง",
                "area": "ถนนเทศบาล 4",
                "note": "ใกล้หน้าสถานีขนส่ง",
                "openHours": "09:30-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมัน ปตท. สาขาชัยภูมิ",
                "area": "ถนนสุริยพงศ์",
                "note": "เปิดบริการ 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำ สถานีขนส่งชัยภูมิ",
                "area": "ตัวเมืองชัยภูมิ",
                "note": "บริการ 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้าน Boots สาขาCentral Plaza Chaiyaphum",
                "area": "ศูนย์การค้าเซ็นทรัลพลาซา ชัยภูมิ",
                "note": "ยาและเวชภัณฑ์",
                "openHours": "10:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลชัยภูมิ",
                "area": "ถนนชัยภูมิ-หนองบัวแดง",
                "note": "โรงพยาบาลใหญ่ของจังหวัด",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรเมืองชัยภูมิ",
                "area": "ถนนอัษฎางค์",
                "note": "บริการประชาชน 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "นครราชสีมา",
                "ขอนแก่น",
                "มหาสารคาม"
            ],
            "commonDestinations": [
                "น้ำตกไทรทอง",
                "ป่าหินงาม (หมู่บ้านหินงาม)",
                "วัดพระธาตุหนองบัว (ประดิษฐานพระอจนะ)",
                "ทุ่งดอกกระเจียว อ.เทพสถิต",
                "สวนน้ำจระเข้ (ในเมือง)"
            ],
            "transitHubs": [
                "สถานีขนส่งชัยภูมิ"
            ],
            "routeNotes": [
                "ถนนหมายเลข 201 จากโคราชเข้าสู่จังหวัดชัยภูมิ",
                "ถนนในอุทยานบางช่วงโค้งและสูงชัน ควรขับรถระมัดระวัง",
                "ฤดูฝน (มิ.ย.-ต.ค.) มีฝนตกหนัก ถ่ายรูปน้ำตกและดอกไม้ได้สวย",
                "ขอแนะนำออกเช้าหรือเย็นเพื่อลดความร้อนจากแสงแดด",
                "ศึกษาค่าธรรมเนียมอุทยานแห่งชาติก่อนเข้าชม"
            ]
        }
    }
};
