// Portal seed data: ภาคตะวันออก+ตะวันตก Part 2 (5 จังหวัด)
// Source: documents/deepreserach/part5_ภาคตะวันออก+ตะวันตก.md
import type { ProvincePortalSeedData } from './db';

export const eastWest2: Record<string, ProvincePortalSeedData> = {
    "Chachoengsao": {
        "transport": [
            {
                "name": "รถไฟสายตะวันออก กรุงเทพฯ-ฉะเชิงเทรา",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "เดินทางสะดวกจากกรุงเทพฯ มีทั้งขบวนธรรมดาและชานเมือง",
                "warpUrl": "https://www.railway.co.th/",
                "logoText": "🚆",
                "color": "#3b82f6"
            },
            {
                "name": "รถตู้/มินิบัสกรุงเทพฯ-ฉะเชิงเทรา",
                "shortName": "รถตู้",
                "type": "van",
                "description": "ตัวเลือกหลักจากกรุงเทพฯ ใช้เวลาราว 1-2 ชม. แล้วแต่จุดขึ้นรถ",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#38bdf8"
            },
            {
                "name": "รถสองแถวแปดริ้ว",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "เชื่อมต่อย่านตลาด/สถานีรถไฟ/วัดโสธรและชุมชนต่าง ๆ",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถจักรยานยนต์รับจ้าง",
                "shortName": "วินมอเตอร์ไซค์",
                "type": "bike",
                "description": "เหมาะกับการเลาะริมแม่น้ำบางปะกงและซอยต่าง ๆ",
                "warpUrl": "",
                "logoText": "🛵",
                "color": "#a855f7"
            },
            {
                "name": "เรือท่องเที่ยวแม่น้ำบางปะกง (บางพื้นที่)",
                "shortName": "เรือ",
                "type": "boat",
                "description": "มีบางชุมชน/ท่าเรือจัดเรือชมวิถีริมแม่น้ำและวัดสำคัญเป็นรอบ ๆ",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#14b8a6"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - ฉะเชิงเทรา (รถตู้)",
                "type": "van",
                "operator": "รถตู้สายกรุงเทพฯ-แปดริ้ว",
                "from": "กรุงเทพฯ",
                "to": "ฉะเชิงเทรา (ตัวเมือง)",
                "via": [
                    "สมุทรปราการ"
                ],
                "departureTimes": [
                    "06:00",
                    "08:00",
                    "10:00",
                    "12:00",
                    "14:00",
                    "16:00"
                ],
                "duration": "1-2 ชม.",
                "baseFare": 120,
                "frequency": "ทุก 30-60 นาที (โดยประมาณ)",
                "terminal": "จุดขึ้นรถในกรุงเทพฯ (ขึ้นกับคิวรถ)",
                "notes": "รอบเดินรถและจุดจอดอาจเปลี่ยน"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - ฉะเชิงเทรา (รถไฟสายตะวันออก)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย (SRT)",
                "from": "กรุงเทพฯ (สถานีกลาง/สถานีต้นทางสายตะวันออก)",
                "to": "ฉะเชิงเทรา (สถานีหลักในเมือง)",
                "via": [],
                "departureTimes": [
                    "06:30",
                    "08:30",
                    "16:30"
                ],
                "duration": "1.5-2.5 ชม.",
                "baseFare": 20,
                "frequency": "หลายขบวน/วัน",
                "terminal": "สถานีรถไฟต้นทางในกรุงเทพฯ",
                "notes": "ตรวจสอบขบวนและเวลาใน SRT Timetable ก่อนเดินทาง"
            },
            {
                "name": "สาย 3: ฉะเชิงเทรา - วัดโสธรวรารามวรวิหาร",
                "type": "bus",
                "operator": "รถสองแถว/รถรับจ้าง",
                "from": "ฉะเชิงเทรา (สถานี/ตลาด)",
                "to": "วัดโสธรวรารามวรวิหาร",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "11:00",
                    "13:00",
                    "15:00",
                    "17:00"
                ],
                "duration": "15-40 นาที",
                "baseFare": 20,
                "frequency": "ออกถี่ตลอดวัน",
                "terminal": "คิวรถในตัวเมือง",
                "notes": "ค่ารถขึ้นกับจุดขึ้น-ลงและประเภทรถ"
            },
            {
                "name": "สาย 4: ฉะเชิงเทรา - ตลาดบ้านใหม่ 100 ปี",
                "type": "bus",
                "operator": "รถสองแถว/รถรับจ้าง",
                "from": "ฉะเชิงเทรา (ตัวเมือง)",
                "to": "ตลาดบ้านใหม่ 100 ปี",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "12:00",
                    "15:00"
                ],
                "duration": "20-45 นาที",
                "baseFare": 20,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "คิวรถในตัวเมือง",
                "notes": "วันเสาร์-อาทิตย์คนแน่น ควรเผื่อเวลา"
            }
        ],
        "localFoods": [
            {
                "name": "ปลาช่อนแปดริ้ว (เมนูปลาช่อน)",
                "priceRange": "120-350฿",
                "category": "local",
                "note": "ปลาช่อนจากลุ่มน้ำบางปะกงเป็นอัตลักษณ์ของแปดริ้ว"
            },
            {
                "name": "ต้มยำหัวปลีปลาช่อน",
                "priceRange": "120-250฿",
                "category": "local",
                "note": "เมนูอาหารถิ่นที่ถูกเสนอ/คัดเลือกในกิจกรรมระดับจังหวัด"
            },
            {
                "name": "ก๋วยเตี๋ยวปากหม้อ",
                "priceRange": "40-90฿",
                "category": "street",
                "note": "ของกินดังในตัวเมืองและตลาดเก่า"
            },
            {
                "name": "ขนมหัวผักกาดหวาน",
                "priceRange": "20-60฿",
                "category": "dessert",
                "note": "ขนมหวานท้องถิ่นที่พบได้ตามตลาด"
            },
            {
                "name": "แกงส้มปลาอีกง",
                "priceRange": "80-180฿",
                "category": "local",
                "note": "เมนูปลาท้องถิ่นแนวภาคกลางตะวันออก"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "600-1,200฿/คืน",
                "examples": [
                    "Sunee View Hotel",
                    "JK Living Hotel and Service Apartment",
                    "Yenjit Resort"
                ],
                "bookingUrl": "https://www.agoda.com/city/chachoengsao-th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,200-2,800฿/คืน",
                "examples": [
                    "The Wish Hotel",
                    "JK Living Hotel and Service Apartment",
                    "Yenjit Resort"
                ],
                "bookingUrl": "https://www.agoda.com/city/chachoengsao-th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2,800-6,000฿/คืน",
                "examples": [
                    "The Wish Hotel",
                    "Yenjit Resort",
                    "JK Living Hotel and Service Apartment"
                ],
                "bookingUrl": "https://www.agoda.com/city/chachoengsao-th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำท่วมขัง/น้ำล้นตลิ่งบางปะกง (บางปี)",
                "severity": "medium",
                "note": "ช่วงฝนหนักอาจมีน้ำท่วมขังในย่านลุ่มน้ำและถนนบางสาย",
                "season": "ก.ย.-พ.ย."
            },
            {
                "label": "อากาศร้อนจัด",
                "severity": "medium",
                "note": "ช่วงมี.ค.-พ.ค. อากาศร้อนมาก ควรระวังฮีตสโตรก โดยเฉพาะกิจกรรมกลางแจ้ง",
                "season": "มี.ค.-พ.ค."
            },
            {
                "label": "การจราจรและอุบัติเหตุบนถนนสายหลัก (304/314/ศรีนครินทร์)",
                "severity": "medium",
                "note": "เส้นทางมีรถหนักและวิ่งเร็ว ควรขับขี่ระมัดระวัง",
                "season": null
            }
        ],
        "ecoIds": [
                "fl_nipa_palm",
                "fl_mangrove_rhizophora",
                "f_irrawaddy_dolphin",
                "f_egret",
                "t_estuary_floodplain",
                "c_pm25_dry_season",
                "h_river_flood",
                "h_saline_intrusion"
        ],
        "newEcoEntities": [
                { id: "fl_nipa_palm", name: "จาก", category: "flora", tags: ["common","edible"], desc: "จากเป็นพืชชายน้ำกร่อยเด่นของลุ่มน้ำบางปะกงตอนล่าง ช่วยยึดตลิ่งและเป็นฉากสำคัญของระบบนิเวศปากแม่น้ำ" },
                { id: "fl_mangrove_rhizophora", name: "โกงกาง", category: "flora", tags: ["common"], desc: "แนวโกงกางในเขตน้ำกร่อยช่วยกรองตะกอน ลดแรงคลื่น และเป็นแหล่งอนุบาลสัตว์น้ำ" },
                { id: "f_irrawaddy_dolphin", name: "โลมาอิรวดี", category: "fauna", tags: ["common","rare","protected","seasonal"], desc: "มีรายงานพบโลมาอิรวดีตามฤดูกาลบริเวณปากแม่น้ำบางปะกง เป็นชนิดหายากที่ต้องเฝ้าระวังการรบกวน" },
                { id: "f_egret", name: "นกกระยาง", category: "fauna", tags: ["common","protected"], desc: "นกน้ำพบทั่วไปในพื้นที่ชุ่มน้ำและปากแม่น้ำของจังหวัด สะท้อนความเป็นระบบนิเวศน้ำกร่อยขนาดใหญ่" },
                { id: "t_estuary_floodplain", name: "ลุ่มน้ำบางปะกงและปากแม่น้ำ", category: "terrain", tags: ["common"], desc: "ภูมิประเทศหลักเป็นลุ่มน้ำและพื้นที่ชุ่มน้ำตอนล่างเชื่อมต่อทะเล ทำให้มีทั้งน้ำจืด น้ำกร่อย และพื้นที่เกษตรลุ่ม" },
                { id: "c_pm25_dry_season", name: "ฝุ่น PM2.5 ฤดูแล้ง", category: "climate", tags: ["danger","common","seasonal"], desc: "ฤดูแล้งและอากาศนิ่งทำให้ฝุ่นสะสมได้ง่าย โดยเฉพาะในพื้นที่เมือง ทางหลวง และโซนกิจกรรมอุตสาหกรรม" },
                { id: "h_river_flood", name: "น้ำท่วมลุ่มน้ำบางปะกง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "เมื่อฝนมากหรือน้ำเหนือหลาก พื้นที่ลุ่มสองฝั่งบางปะกงเสี่ยงน้ำท่วมขังและน้ำเอ่อล้นตลิ่ง" },
                { id: "h_saline_intrusion", name: "น้ำเค็มรุกล้ำ", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ช่วงน้ำจืดน้อย น้ำทะเลสามารถดันเข้ามาในลำน้ำ ส่งผลต่อคุณภาพน้ำและพื้นที่เกษตรริมน้ำ" }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 23-36°C, ร้อนชื้น ฝนพ.ค.-ต.ค. ปลายฝนอาจมีฝนหนักบางช่วง",
            "terrain": "พื้นที่ลุ่มแม่น้ำบางปะกง มีชุมชนเมือง-เกษตร และปากแม่น้ำเชื่อมชายฝั่ง",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "ตลาดน้ำบางคล้า",
                "content": "ตลาดน้ำบรรยากาศไทยๆ ใกล้วัดโสธร เป็นแหล่งอาหารท้องถิ่นและผักผลไม้สด",
                "type": "food"
            },
            {
                "title": "วัดหลวงพ่อโสธร",
                "content": "หลวงพ่อโสธร องค์ใหญ่ประดิษฐานกลางแม่น้ำบางปะกง เป็นที่สักการะสายศักดิ์สิทธิ์ของคนภาคกลาง",
                "type": "culture"
            },
            {
                "title": "น้ำท่วมบางคล้า",
                "content": "ขณะเกิดอุทกภัยในบางครั้ง แม่น้ำบางปะกงอาจท่วมถนนเส้นเลี่ยงบางคล้า ควรเช็คข่าวสารก่อนเดินทางช่วงฝนตกหนัก",
                "type": "safety"
            },
            {
                "title": "สายรถไฟตะวันออก",
                "content": "รถไฟสายตะวันออกผ่านจังหวัดที่สถานีหลักอยู่ในฉะเชิงเทรา เดินทางทางรถไฟใช้เวลาประมาณ 1-2 ชั่วโมงจากกรุงเทพฯ",
                "type": "route"
            },
            {
                "title": "อาหารท้องถิ่น",
                "content": "ชิมอาหารประจำท้องถิ่น เช่น ข้าวปลาทูแกงส้ม และขนมหวานแสนอร่อยที่ตลาดบางคล้าและร้านริมแม่น้ำ",
                "type": "food"
            },
            {
                "title": "โปรแกรมริมแม่น้ำ",
                "content": "เที่ยวตลาดน้ำหรือศาลหลักเมืองตอนเช้า อากาศดี และช่วงเย็นริมแม่น้ำจะมีร้านอาหารท้องถิ่น",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงไทย (ฉะเชิงเทรา)",
                "area": "ตัวเมืองฉะเชิงเทรา",
                "note": "ฝาก-ถอน ATM",
                "openHours": "09:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. หนองจอก",
                "area": "อำเภอบางปะกง",
                "note": "บริการ 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ วัดโสธรราชวราราม",
                "area": "ตัวเมืองฉะเชิงเทรา",
                "note": "ริมบางปะกง",
                "openHours": "06:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยา โซฟิฟาร์มาซี",
                "area": "ตัวเมืองฉะเชิงเทรา",
                "note": "ยารักษาโรคทั่วไป",
                "openHours": "08:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลฉะเชิงเทรา",
                "area": "ตัวเมือง",
                "note": "โรงพยาบาลหลักประจำจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรเมืองฉะเชิงเทรา",
                "area": "ตัวเมือง",
                "note": "ข้อมูลสถานการณ์ความปลอดภัย",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "PTT EV Charger (ฉะเชิงเทรา)",
                "area": "ใกล้แม่น้ำบางปะกง",
                "note": "สถานีชาร์จรถยนต์ไฟฟ้า",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "สถานีขนส่งผู้โดยสารฉะเชิงเทรา",
                "area": "ตัวเมือง",
                "note": "บริการตั๋วเดินทางภายในประเทศ",
                "openHours": "06:00-18:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพฯ",
                "ชลบุรี",
                "ฉะเชิงเทรา"
            ],
            "commonDestinations": [
                "วัดหลวงพ่อโสธร",
                "ตลาดน้ำบางคล้า",
                "พิพิธภัณฑ์ทหารอากาศ",
                "คลองเขื่อน",
                "วัดโพรงอากาศ"
            ],
            "transitHubs": [
                "สถานีรถไฟฉะเชิงเทรา",
                "สถานีขนส่งฉะเชิงเทรา"
            ],
            "routeNotes": [
                "ทางหลวงหมายเลข 34 (ถนนสุขุมวิทเก่า) ใช้เชื่อมกรุงเทพฯ-จันทบุรี",
                "ถนนหมายเลข 3152 ไปบางคล้าเดินทางสะดวก",
                "บางช่วงถนนแคบ ควรระมัดระวังรถสวนทางในตัวเมือง"
            ]
        }
    },
    "Prachin Buri": {
        "transport": [
            {
                "name": "รถไฟสายตะวันออก กรุงเทพฯ-ปราจีนบุรี",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "มีสถานีหลักในจังหวัด ใช้เดินทางเชื่อมกรุงเทพฯและภาคตะวันออก",
                "warpUrl": "https://www.railway.co.th/",
                "logoText": "🚆",
                "color": "#3b82f6"
            },
            {
                "name": "รถตู้กรุงเทพฯ-ปราจีนบุรี/กบินทร์บุรี",
                "shortName": "รถตู้",
                "type": "van",
                "description": "นิยมมากสำหรับคนทำงาน/ท่องเที่ยว ใช้เวลาราว 2-3.5 ชม. ตามปลายทาง",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#38bdf8"
            },
            {
                "name": "รถโดยสารท้องถิ่น/สองแถว",
                "shortName": "รถท้องถิ่น",
                "type": "songthaew",
                "description": "เชื่อมต่ออำเภอต่าง ๆ และตลาดในตัวเมือง",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถจักรยานยนต์รับจ้าง",
                "shortName": "วินมอเตอร์ไซค์",
                "type": "bike",
                "description": "เหมาะกับระยะสั้นและจุดที่รถสาธารณะเข้าถึงยาก",
                "warpUrl": "",
                "logoText": "🛵",
                "color": "#a855f7"
            },
            {
                "name": "รถรับจ้างเหมาคันไปอุทยาน/น้ำตก",
                "shortName": "เหมารถ",
                "type": "other",
                "description": "เหมาะกับการไปพื้นที่ธรรมชาติ เช่น ทับลาน/เขาใหญ่ (บางพื้นที่) ที่รถประจำทางเข้าถึงยาก",
                "warpUrl": "",
                "logoText": "🚗",
                "color": "#64748b"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - ปราจีนบุรี (รถตู้)",
                "type": "van",
                "operator": "รถตู้สายกรุงเทพฯ-ปราจีนบุรี",
                "from": "กรุงเทพฯ",
                "to": "ปราจีนบุรี (ตัวเมือง)",
                "via": [
                    "ฉะเชิงเทรา"
                ],
                "departureTimes": [
                    "06:00",
                    "08:00",
                    "10:00",
                    "12:00",
                    "14:00",
                    "16:00"
                ],
                "duration": "2-3 ชม.",
                "baseFare": 160,
                "frequency": "ทุก 30-60 นาที (โดยประมาณ)",
                "terminal": "จุดขึ้นรถในกรุงเทพฯ (ขึ้นกับคิวรถ)",
                "notes": "รอบเดินรถเปลี่ยนได้ตามวัน"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - กบินทร์บุรี (รถตู้)",
                "type": "van",
                "operator": "รถตู้สายกรุงเทพฯ-กบินทร์บุรี",
                "from": "กรุงเทพฯ",
                "to": "ปราจีนบุรี (กบินทร์บุรี)",
                "via": [
                    "ฉะเชิงเทรา"
                ],
                "departureTimes": [
                    "06:00",
                    "09:00",
                    "12:00",
                    "15:00",
                    "18:00"
                ],
                "duration": "3-3.5 ชม.",
                "baseFare": 200,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "จุดขึ้นรถในกรุงเทพฯ",
                "notes": "บางเที่ยวต่อไปสระแก้ว/อรัญประเทศ"
            },
            {
                "name": "สาย 3: กรุงเทพฯ - ปราจีนบุรี (รถไฟสายตะวันออก)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย (SRT)",
                "from": "กรุงเทพฯ (สถานีกลาง/สถานีต้นทางสายตะวันออก)",
                "to": "ปราจีนบุรี (สถานีในจังหวัด)",
                "via": [
                    "ฉะเชิงเทรา"
                ],
                "departureTimes": [
                    "06:30",
                    "16:30"
                ],
                "duration": "2.5-4 ชม.",
                "baseFare": 40,
                "frequency": "วันละ 1-2 ขบวน (โดยประมาณ)",
                "terminal": "สถานีรถไฟต้นทางในกรุงเทพฯ",
                "notes": "ตรวจสอบขบวนและเวลาใน SRT Timetable ก่อนเดินทาง"
            },
            {
                "name": "สาย 4: ตัวเมืองปราจีนบุรี - อุทยานแห่งชาติทับลาน (นาดี)",
                "type": "van",
                "operator": "รถตู้/เหมารถท้องถิ่น",
                "from": "ปราจีนบุรี (ตัวเมือง)",
                "to": "ปราจีนบุรี (อ.นาดี/ทับลาน)",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "10:00",
                    "14:00"
                ],
                "duration": "1-2 ชม.",
                "baseFare": 120,
                "frequency": "วันละหลายเที่ยว/ตามนัด",
                "terminal": "คิวรถในตัวเมือง",
                "notes": "เส้นทางธรรมชาติ ควรเช็คประกาศอุทยานเรื่องการปิดเส้นทางช่วงฝนหนัก"
            }
        ],
        "localFoods": [
            {
                "name": "ขนมเขียวใบหยก",
                "priceRange": "20-60฿",
                "category": "dessert",
                "note": "เมนูอาหารถิ่นตัวแทนจังหวัดปราจีนบุรี (โครงการเชิดชูอาหารถิ่น)"
            },
            {
                "name": "หน่อไม้ไผ่ตงหวาน (ตามฤดูกาล)",
                "priceRange": "60-200฿",
                "category": "local",
                "note": "วัตถุดิบเด่นของพื้นที่ นำไปทำได้หลายเมนู เช่น ต้มจืด/ผัด/หมก"
            },
            {
                "name": "ต้มจืดหน่อไม้ไผ่ตง",
                "priceRange": "60-120฿",
                "category": "local",
                "note": "เมนูตามฤดูฝนเมื่อหน่อไม้ออก"
            },
            {
                "name": "เครื่องดื่มสมุนไพร/เมนูสมุนไพร",
                "priceRange": "30-80฿",
                "category": "drink",
                "note": "ปราจีนบุรีถูกพูดถึงในฐานะเมืองสมุนไพร มีเมนูเครื่องดื่มสมุนไพรหลายแบบ"
            },
            {
                "name": "อาหารปลาแม่น้ำ/ปลาน้ำจืดท้องถิ่น",
                "priceRange": "120-300฿",
                "category": "local",
                "note": "พบตามร้านอาหารริมแม่น้ำ/ชุมชน (ราคาแปรผัน)"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "700-1,500฿/คืน",
                "examples": [
                    "The Garden 304",
                    "The Desiign Hotel",
                    "Serenity Hotel & Spa Kabinburi"
                ],
                "bookingUrl": "https://www.agoda.com/region/prachin-buri-province-th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,500-3,500฿/คืน",
                "examples": [
                    "Tawaravadee Resort",
                    "The Garden 304",
                    "Dasada Gallery Resort"
                ],
                "bookingUrl": "https://www.agoda.com/region/prachin-buri-province-th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "3,500-12,000฿/คืน",
                "examples": [
                    "Dasada Gallery Resort",
                    "Tawaravadee Resort",
                    "Serenity Hotel & Spa Kabinburi"
                ],
                "bookingUrl": "https://www.agoda.com/region/prachin-buri-province-th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ช้างป่าและสัตว์ป่าในพื้นที่ป่า/อุทยาน",
                "severity": "high",
                "note": "พื้นที่ป่าต่อเนื่องดงพญาเย็น-เขาใหญ่ มีโอกาสพบช้างและสัตว์ป่า โดยเฉพาะช่วงเย็น-กลางคืน",
                "season": null
            },
            {
                "label": "น้ำป่าไหลหลาก/ทางลื่นในฤดูฝน",
                "severity": "medium",
                "note": "สายเที่ยวอุทยาน/น้ำตกควรระวังน้ำหลากฉับพลันและถนนลื่น",
                "season": "ก.ค.-ต.ค."
            },
            {
                "label": "ขับรถกลางคืนบนถนนสาย 304 (รถหนัก)",
                "severity": "medium",
                "note": "บางช่วงมีรถบรรทุกจำนวนมากและวิ่งเร็ว ควรพักเมื่อเหนื่อยและหลีกเลี่ยงง่วงขับ",
                "season": null
            }
        ],
        "ecoIds": [
                "fl_lan_palm",
                "fl_bamboo",
                "f_wild_elephant",
                "f_gaur",
                "t_world_heritage_forest",
                "c_orographic_rain",
                "h_elephant_conflict",
                "h_flash_flood"
        ],
        "newEcoEntities": [
                { id: "fl_lan_palm", name: "ปาล์มลาน", category: "flora", tags: ["common","rare","protected"], desc: "ทับลานมีชื่อจากปาล์มลานซึ่งเป็นพืชเด่นของผืนป่าภาคตะวันออกตอนในและมีคุณค่าทางอนุรักษ์สูง" },
                { id: "fl_bamboo", name: "ไผ่ป่า", category: "flora", tags: ["common","edible"], desc: "ไผ่เป็นองค์ประกอบทั่วไปของป่าผสมในปราจีนบุรี และเป็นแหล่งอาหารของสัตว์กินพืชหลายชนิด" },
                { id: "f_wild_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","common","protected"], desc: "ช้างป่าพบจริงในผืนป่ามรดกโลกที่กินพื้นที่เข้ามาในปราจีนบุรี และมีเหตุออกใกล้ชุมชนเป็นระยะ" },
                { id: "f_gaur", name: "กระทิง", category: "fauna", tags: ["danger","rare","protected"], desc: "กระทิงเป็นสัตว์กีบขนาดใหญ่ที่พบในผืนป่าปราจีนบุรี โดยเฉพาะพื้นที่คุ้มครองขนาดใหญ่และทุ่งหญ้าป่า" },
                { id: "t_world_heritage_forest", name: "ป่ามรดกโลกดงพญาเย็น-เขาใหญ่", category: "terrain", tags: ["common"], desc: "จังหวัดนี้เชื่อมกับผืนป่ามรดกโลกขนาดใหญ่ มีทั้งภูเขา ป่าดิบ และลำน้ำต้นกำเนิดหลายสาย" },
                { id: "c_orographic_rain", name: "ฝนหนักเชิงเขา", category: "climate", tags: ["common","danger","seasonal"], desc: "พื้นที่เชิงเขารับฝนมากเมื่อมรสุมปะทะแนวเขา ทำให้ลำห้วยและน้ำตกมีน้ำมากในช่วงฝน" },
                { id: "h_elephant_conflict", name: "ช้างป่าออกนอกเขตป่า", category: "climate", tags: ["danger","common","extreme"], desc: "ความขัดแย้งคนกับช้างเป็นความเสี่ยงสำคัญของปราจีนบุรี โดยเฉพาะในชุมชนและถนนใกล้ขอบป่า" },
                { id: "h_flash_flood", name: "น้ำป่าและดินไหลเชิงเขา", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนสะสมในแนวเขาอาจทำให้เกิดน้ำป่าไหลหลากและดินไหลในเส้นทางเชิงเขา" }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 22-35°C, ร้อนชื้น ฝนพ.ค.-ต.ค. พื้นที่ป่าเขาอากาศเย็นกว่าส่วนเมือง",
            "terrain": "พื้นที่ราบสลับภูเขา เชื่อมต่อผืนป่าดงพญาเย็น มีอุทยานและพื้นที่เกษตร",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "วัดเขาเต่า",
                "content": "วัดเขาเต่า (วัดป่าสันติธรรม) ตั้งอยู่บนเขา มียอดวิหารรูปทรงเอกลักษณ์ ควรแวะชม",
                "type": "culture"
            },
            {
                "title": "เขตรักษาพันธุ์สัตว์ป่า",
                "content": "เขตรักษาพันธุ์สัตว์ป่าพนมดงรักมีธรรมชาติสมบูรณ์และน้ำตกตะคร้อที่สวยงาม",
                "type": "culture"
            },
            {
                "title": "น้ำตกสวยงาม",
                "content": "น้ำตกเหวนรกและน้ำตกตะคร้อ น้ำใสเย็น เหมาะเที่ยวช่วงหน้าฝนแต่ระวังลื่น",
                "type": "season"
            },
            {
                "title": "ถนนลัด",
                "content": "ถนนหลวงหมายเลข 33 เป็นเส้นเชื่อมระหว่างนครนายก-กบินทร์บุรี หลีกเลี่ยงเข้าเมืองถนนเส้นเล็ก",
                "type": "route"
            },
            {
                "title": "กินเที่ยวท้องถิ่น",
                "content": "ชิมอาหารประจำท้องถิ่น เช่น แกงหน่อไม้หริภุญชัย และของหวาน เช่น เต้าทึง",
                "type": "food"
            },
            {
                "title": "พยากรณ์อากาศ",
                "content": "ตรวจสอบพยากรณ์อากาศก่อนการเดินทาง โดยเฉพาะในฤดูฝน เพราะมีฝนฟ้าคะนองทุกเย็น",
                "type": "safety"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงไทย (ปราจีนบุรี)",
                "area": "ตัวเมืองปราจีนบุรี",
                "note": "ฝาก-ถอน ATM",
                "openHours": "09:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. ปราจีนบุรี",
                "area": "ถนนสุวรรณศร (33)",
                "note": "บริการ 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ วัดไพรพัฒนา",
                "area": "ใกล้ตลาด 100 ปีศรีมหาโพธิ์",
                "note": "สาธารณะวัด",
                "openHours": "06:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยา ใจแสงจันทร์",
                "area": "ตัวเมืองปราจีนบุรี",
                "note": "ยารักษาโรคทั่วไป",
                "openHours": "08:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลปราจีนบุรี",
                "area": "ตัวเมือง",
                "note": "โรงพยาบาลหลัก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรเมืองปราจีนบุรี",
                "area": "ตัวเมือง",
                "note": "ข้อมูลความปลอดภัย",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "PTT EV Charger (ปราจีนบุรี)",
                "area": "อำเภอกบินทร์บุรี",
                "note": "สถานีชาร์จรถไฟฟ้า",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "สถานีขนส่งปราจีนบุรี",
                "area": "ท่ารถปราจีนบุรี",
                "note": "บริการตั๋วเดินทาง",
                "openHours": "06:00-18:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพฯ",
                "นครนายก",
                "สระแก้ว"
            ],
            "commonDestinations": [
                "วัดเขาเต่า",
                "น้ำตกเหวนรก",
                "อุทยานแห่งชาติทับลาน",
                "วัดสว่างอารมณ์",
                "ตลาด 100 ปีศรีมหาโพธิ์"
            ],
            "transitHubs": [
                "สถานีรถไฟปราจีนบุรี (กบินทร์บุรี)",
                "สถานีขนส่งปราจีนบุรี"
            ],
            "routeNotes": [
                "ถนนหมายเลข 33 ขยายใหม่ช่วยลดเวลาเดินทาง",
                "บางช่วงถนนคดเคี้ยวขึ้นเขา ควรชะลอความเร็ว"
            ]
        }
    },
    "Kanchanaburi": {
        "transport": [
            {
                "name": "รถไฟสายธนบุรี-น้ำตก (สายมรณะ/แม่น้ำแคว)",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "เส้นทางรถไฟยอดนิยมสู่กาญจนบุรีและน้ำตก เหมาะทั้งท่องเที่ยวและเดินทางทั่วไป",
                "warpUrl": "https://www.railway.co.th/",
                "logoText": "🚆",
                "color": "#3b82f6"
            },
            {
                "name": "รถตู้กรุงเทพฯ-กาญจนบุรี",
                "shortName": "รถตู้",
                "type": "van",
                "description": "เดินทางเร็วจากกรุงเทพฯถึงตัวเมืองกาญจนบุรี เหมาะไปเช้า-เย็นกลับได้",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#38bdf8"
            },
            {
                "name": "รถบัส/รถทัวร์กรุงเทพฯ-กาญจนบุรี",
                "shortName": "รถบัส",
                "type": "bus",
                "description": "มีทั้งรถ บขส. และเอกชน ปลายทางสถานีขนส่งกาญจนบุรี",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0ea5e9"
            },
            {
                "name": "รถสองแถวกาญจนบุรี",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "พาหนะหลักในตัวเมือง ใช้ต่อไปสถานที่เที่ยวใกล้เมืองตามคิวรถ",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "เรือท่องเที่ยวแม่น้ำแคว/เรือหางยาว",
                "shortName": "เรือ",
                "type": "boat",
                "description": "ใช้ท่องเที่ยวและเดินทางในบางจุดริมแม่น้ำแคว (ขึ้นกับพื้นที่ให้บริการ)",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#14b8a6"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - กาญจนบุรี (รถตู้)",
                "type": "van",
                "operator": "รถตู้สายกรุงเทพฯ-กาญจนบุรี",
                "from": "กรุงเทพฯ",
                "to": "กาญจนบุรี (ตัวเมือง)",
                "via": [
                    "นครปฐม"
                ],
                "departureTimes": [
                    "05:00",
                    "07:00",
                    "09:00",
                    "12:00",
                    "15:00",
                    "18:00"
                ],
                "duration": "2.5-3.5 ชม.",
                "baseFare": 150,
                "frequency": "ทุก 30-60 นาที (โดยประมาณ)",
                "terminal": "จุดขึ้นรถในกรุงเทพฯ (ขึ้นกับคิวรถ)",
                "notes": "เที่ยวสุดท้ายอาจเร็วในวันธรรมดาบางวัน"
            },
            {
                "name": "สาย 2: กรุงเทพฯ (ธนบุรี) - กาญจนบุรี (รถไฟ)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย (SRT)",
                "from": "กรุงเทพฯ (สถานีธนบุรี)",
                "to": "กาญจนบุรี",
                "via": [
                    "นครปฐม",
                    "ราชบุรี"
                ],
                "departureTimes": [
                    "07:50",
                    "13:55"
                ],
                "duration": "3-4 ชม.",
                "baseFare": 100,
                "frequency": "วันละ 2 เที่ยว (โดยประมาณ)",
                "terminal": "สถานีธนบุรี",
                "notes": "ตารางเดินรถอาจเปลี่ยน ให้ตรวจสอบกับ SRT ก่อนเดินทาง"
            },
            {
                "name": "สาย 3: กาญจนบุรี - น้ำตก/ไทรโยค (รถไฟ/รถตู้)",
                "type": "train",
                "operator": "SRT/รถตู้ท้องถิ่น",
                "from": "กาญจนบุรี",
                "to": "น้ำตก/ไทรโยค",
                "via": [],
                "departureTimes": [
                    "10:30",
                    "16:20"
                ],
                "duration": "1.5-3 ชม.",
                "baseFare": 60,
                "frequency": "วันละ 1-2 เที่ยว (โดยประมาณ)",
                "terminal": "สถานีรถไฟกาญจนบุรี",
                "notes": "เหมาะกับสายเที่ยวสะพานข้ามแม่น้ำแควและเส้นทางรถไฟท่องเที่ยว"
            },
            {
                "name": "สาย 4: ตัวเมืองกาญจนบุรี - น้ำตกเอราวัณ",
                "type": "van",
                "operator": "รถตู้/เหมารถท้องถิ่น",
                "from": "กาญจนบุรี (ตัวเมือง)",
                "to": "อุทยานแห่งชาติเอราวัณ",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "10:00",
                    "13:00"
                ],
                "duration": "1-2 ชม.",
                "baseFare": 100,
                "frequency": "วันละหลายเที่ยว/ตามนัด",
                "terminal": "คิวรถในตัวเมือง",
                "notes": "ช่วงหน้าฝนควรเช็คสภาพทางและประกาศอุทยาน"
            }
        ],
        "localFoods": [
            {
                "name": "แกงป่าเมืองกาญจน์",
                "priceRange": "80-200฿",
                "category": "local",
                "note": "อาหารขึ้นชื่อของกาญจนบุรี รสจัดจ้านเครื่องแกงแน่น"
            },
            {
                "name": "ต้มยำ/ผัดฉ่าปลาคัง (ปลาแม่น้ำ)",
                "priceRange": "150-350฿",
                "category": "local",
                "note": "ร้านอาหารริมแม่น้ำแควหลายร้านขึ้นชื่อเมนูปลาแม่น้ำ"
            },
            {
                "name": "แกงส้มญวน",
                "priceRange": "80-180฿",
                "category": "local",
                "note": "อาหารพื้นถิ่นบางชุมชนในกาญจนบุรี (อิทธิพลญวน)"
            },
            {
                "name": "น้ำพริกกะเหรี่ยง/อาหารป่าพื้นบ้าน",
                "priceRange": "80-250฿",
                "category": "local",
                "note": "บางพื้นที่ชุมชนมีอาหารป่าตามวัตถุดิบฤดูกาล"
            },
            {
                "name": "กล้วย/ผลไม้ท้องถิ่น (ตามฤดูกาล)",
                "priceRange": "30-120฿",
                "category": "dessert",
                "note": "ผลไม้ตามฤดูกาลจากพื้นที่เกษตร"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "700-1,600฿/คืน",
                "examples": [
                    "P.Y. Guesthouse",
                    "Good Times Resort Kanchanaburi",
                    "The Bridge Residence Hotel"
                ],
                "bookingUrl": "https://www.agoda.com/region/kanchanaburi-province-th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,600-4,500฿/คืน",
                "examples": [
                    "U Inchantree Kanchanaburi",
                    "Felix River Kwai Resort",
                    "Mida Resort Kanchanaburi"
                ],
                "bookingUrl": "https://www.agoda.com/region/kanchanaburi-province-th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "4,500-25,000฿/คืน",
                "examples": [
                    "The FloatHouse River Kwai",
                    "X2 River Kwai Resort",
                    "Hintok River Camp at Hellfire Pass"
                ],
                "bookingUrl": "https://www.agoda.com/region/kanchanaburi-province-th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำป่าไหลหลาก/กระแสน้ำแรงบริเวณน้ำตกและลำห้วย",
                "severity": "high",
                "note": "ฝนหนักอาจเกิดน้ำหลากฉับพลันและกระแสน้ำแรง โดยเฉพาะน้ำตกยอดนิยม",
                "season": "ก.ค.-ต.ค."
            },
            {
                "label": "ถ้ำ/หน้าผาและเส้นทางเดินป่า",
                "severity": "medium",
                "note": "หลายจุดเป็นหินปูนลื่นและมืด ควรมีไฟฉาย/รองเท้ากันลื่นและทำตามคำแนะนำเจ้าหน้าที่",
                "season": null
            },
            {
                "label": "ช้างป่า/สัตว์ป่าในอุทยานและพื้นที่ป่า",
                "severity": "medium",
                "note": "อาจพบสัตว์ป่าในพื้นที่ป่าตะวันตก ควรเว้นระยะและไม่ให้อาหารสัตว์",
                "season": null
            }
        ],
        "ecoIds": [
                "fl_teak",
                "fl_bamboo",
                "f_tiger",
                "f_wild_elephant",
                "t_tenasserim_forest",
                "c_hot_dry_season",
                "h_forest_fire",
                "h_flash_flood"
        ],
        "newEcoEntities": [
                { id: "fl_teak", name: "ไม้สัก", category: "flora", tags: ["common"], desc: "กาญจนบุรีมีป่าผสมผลัดใบและป่าตะวันตกขนาดใหญ่ ไม้สักเป็นหนึ่งในไม้เด่นของระบบนิเวศแห้งถึงกึ่งชื้น" },
                { id: "fl_bamboo", name: "ไผ่รวกและไผ่ป่า", category: "flora", tags: ["common","edible"], desc: "ไผ่เป็นพืชโครงสร้างสำคัญของป่าหลายแบบในกาญจนบุรี และเป็นแหล่งอาหารของสัตว์กินพืช" },
                { id: "f_tiger", name: "เสือโคร่ง", category: "fauna", tags: ["danger","rare","protected"], desc: "กาญจนบุรีเป็นส่วนหนึ่งของผืนป่าตะวันตกที่ยังรองรับประชากรเสือโคร่งของไทยในระดับสำคัญ" },
                { id: "f_wild_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","common","protected"], desc: "ช้างป่าพบจริงในหลายเขตป่าของกาญจนบุรี โดยอาจพบใกล้ถนนหรือพื้นที่เกษตรติดป่า" },
                { id: "t_tenasserim_forest", name: "เทือกเขาตะนาวศรีและผืนป่าตะวันตก", category: "terrain", tags: ["common"], desc: "ภูมิประเทศหลักเป็นเทือกเขายาวและผืนป่าต่อเนื่องขนาดใหญ่ มีถ้ำ น้ำตก และลุ่มน้ำแควน้อยแควใหญ่" },
                { id: "c_hot_dry_season", name: "ฤดูร้อนแห้งและอากาศร้อนจัด", category: "climate", tags: ["common","danger","seasonal"], desc: "กาญจนบุรีมีหลายพื้นที่ร้อนและแห้งในช่วงปลายฤดูหนาวถึงฤดูร้อน ทำให้เสี่ยงไฟป่าและขาดน้ำชั่วคราว" },
                { id: "h_forest_fire", name: "ไฟป่าและหมอกควัน", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "พื้นที่ป่ากว้างและอากาศแห้งทำให้กาญจนบุรีมีความเสี่ยงไฟป่าและหมอกควันในบางช่วงของปี" },
                { id: "h_flash_flood", name: "น้ำป่าไหลหลาก", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "เมื่อฝนตกหนักในเทือกเขา ลำห้วยและน้ำตกมีโอกาสเกิดน้ำหลากรวดเร็ว ควรระวังแคมป์และเส้นทางธรรมชาติ" }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 20-36°C, ร้อนช่วงมี.ค.-พ.ค. ฝนพ.ค.-ต.ค. เขตภูเขาเย็นกว่าตัวเมือง",
            "terrain": "พื้นที่กว้าง มีเทือกเขา ถ้ำ และแม่น้ำแคว เหมาะกับธรรมชาติ-ประวัติศาสตร์",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "น้ำตกเอราวัณ",
                "content": "น้ำตกเอราวัณในอุทยานแห่งชาติเอราวัณมีหลายชั้น ควรเดินให้ครบ 7 ชั้นในฤดูแล้ง (ธ.ค.-ก.พ.) น้ำใสเป็นประกาย",
                "type": "culture"
            },
            {
                "title": "สะพานข้ามแม่น้ำแคว",
                "content": "เป็นส่วนหนึ่งของเส้นทางรถไฟสายประวัติศาสตร์ ขอให้เยือนช่วงรุ่งเช้าอากาศสบาย",
                "type": "culture"
            },
            {
                "title": "ฤดูฝน",
                "content": "ฤดูฝน (มิ.ย.-ส.ค.) ถนนบางเส้นเช่นทางรถไฟสายมรณะอาจลื่น งดปีนเขาสูง",
                "type": "season"
            },
            {
                "title": "กินเที่ยวท้องถิ่น",
                "content": "อาหารท้องถิ่นเช่น ขนมจีนแกงไตปลา, ปลาช่อนโยนด ลองชิมได้ในเมืองกาญจนบุรี",
                "type": "food"
            },
            {
                "title": "เดินทางเส้นทางท่องเที่ยว",
                "content": "ทางหลวงหมายเลข 323 ไปน้ำตกเอราวัณ, 3236 ไปสะพานข้ามแคว, บางเส้นทางเดินป่าหรือแพไม้ไผ่",
                "type": "route"
            },
            {
                "title": "ประหยัดค่าน้ำมัน",
                "content": "ซื้อแพ็คเกจล่องแพแม่น้ำแควในเมือง รวมการขึ้นรถราง น้ำตก-ประวัติศาสตร์",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารทหารไทย (กาญจนบุรี)",
                "area": "ตัวเมืองกาญจนบุรี",
                "note": "บริการ ATM",
                "openHours": "09:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. ริมถนนแสงชูโต",
                "area": "อำเภอเมือง",
                "note": "บริการ 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ สะพานข้ามแม่น้ำแคว",
                "area": "ริมแม่น้ำแคว",
                "note": "ใกล้พิพิธภัณฑ์สงคราม",
                "openHours": "06:00-18:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยา กาญจนบุรีเภสัช",
                "area": "ตัวเมือง",
                "note": "ยารักษาโรคทั่วไป",
                "openHours": "08:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลโพธิ์เกลียว",
                "area": "อำเภอเมือง",
                "note": "โรงพยาบาลรัฐ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรกาญจนบุรี",
                "area": "ตัวเมือง",
                "note": "ข้อมูลความปลอดภัย",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "PTT EV Charger (กาญจนบุรี)",
                "area": "ถนนแสงชูโต กม.1",
                "note": "สถานีชาร์จรถไฟฟ้า",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "สถานีขนส่งกาญจนบุรี",
                "area": "ศรีมงคล",
                "note": "ตั๋วเดินทางภายในประเทศ",
                "openHours": "06:00-18:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพฯ",
                "นครปฐม",
                "กาญจนบุรี"
            ],
            "commonDestinations": [
                "น้ำตกเอราวัณ",
                "สะพานข้ามแม่น้ำแคว",
                "วัดถ้ำเสือ",
                "ช่องเขาขาด",
                "อุทยานแห่งชาติไทรโยค"
            ],
            "transitHubs": [
                "สถานีรถไฟกาญจนบุรี",
                "สถานีขนส่งกาญจนบุรี"
            ],
            "routeNotes": [
                "ทางหลวงหมายเลข 323 มุ่งหน้าเอราวัณ",
                "ถนน 3236 ไปน้ำตกไทรโยคใหญ่",
                "คืนก่อนเดินป่าควรนอนพักในเมือง",
                "เส้นทางเที่ยวอุทยานส่วนใหญ่มีทางลาดชัน"
            ]
        }
    },
    "Ratchaburi": {
        "transport": [
            {
                "name": "รถไฟสายใต้ (ผ่านสถานีราชบุรี)",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "ใช้เดินทางจากกรุงเทพฯลงภาคใต้ โดยจอดที่สถานีราชบุรี",
                "warpUrl": "https://www.railway.co.th/",
                "logoText": "🚆",
                "color": "#3b82f6"
            },
            {
                "name": "รถตู้/มินิบัสกรุงเทพฯ-ราชบุรี",
                "shortName": "รถตู้",
                "type": "van",
                "description": "เดินทางจากกรุงเทพฯถึงตัวเมืองราชบุรี ใช้เวลาราว 1.5-2.5 ชม.",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#38bdf8"
            },
            {
                "name": "รถบัส/รถโดยสารประจำทาง",
                "shortName": "รถบัส",
                "type": "bus",
                "description": "มีรถจากกรุงเทพฯ (สายใต้ใหม่) และรถภายในจังหวัดไปอำเภอต่าง ๆ",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0ea5e9"
            },
            {
                "name": "รถสองแถวราชบุรี",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "ใช้เดินทางในตัวเมืองและต่อไปอำเภอสำคัญ เช่น โพธาราม/ดำเนินสะดวก",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "เรือหางยาวตลาดน้ำดำเนินสะดวก",
                "shortName": "เรือตลาดน้ำ",
                "type": "boat",
                "description": "เรือท่องเที่ยวในคลอง/ตลาดน้ำ (คิดค่าบริการเป็นรอบ)",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#14b8a6"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ (สายใต้ใหม่) - ราชบุรี",
                "type": "coach",
                "operator": "บขส./ผู้ประกอบการเอกชน",
                "from": "กรุงเทพฯ (สถานีขนส่งสายใต้ใหม่)",
                "to": "ราชบุรี (ตัวเมือง)",
                "via": [
                    "นครปฐม"
                ],
                "departureTimes": [
                    "05:00",
                    "07:00",
                    "09:00",
                    "12:00",
                    "15:00",
                    "18:00"
                ],
                "duration": "1.5-2.5 ชม.",
                "baseFare": 120,
                "frequency": "ทุก 1-2 ชม. (โดยประมาณ)",
                "terminal": "สถานีขนส่งสายใต้ใหม่",
                "notes": "เวลา/ราคาเปลี่ยนตามบริษัทและวันเดินทาง"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - ราชบุรี (รถไฟสายใต้)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย (SRT)",
                "from": "กรุงเทพฯ (สถานีกลาง/สถานีบางซื่อ/หัวลำโพงเดิม)",
                "to": "ราชบุรี (สถานีรถไฟราชบุรี)",
                "via": [
                    "นครปฐม"
                ],
                "departureTimes": [
                    "06:00",
                    "14:00",
                    "18:00"
                ],
                "duration": "2-3 ชม.",
                "baseFare": 50,
                "frequency": "หลายขบวน/วัน",
                "terminal": "สถานีรถไฟต้นทางในกรุงเทพฯ",
                "notes": "ขึ้นกับขบวนรถไฟสายใต้ที่เลือก"
            },
            {
                "name": "สาย 3: ราชบุรี - ตลาดน้ำดำเนินสะดวก",
                "type": "van",
                "operator": "รถตู้/สองแถวท้องถิ่น",
                "from": "ราชบุรี (ตัวเมือง)",
                "to": "ดำเนินสะดวก (ตลาดน้ำ)",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "10:00",
                    "12:00",
                    "14:00"
                ],
                "duration": "45-90 นาที",
                "baseFare": 50,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "คิวรถในตัวเมืองราชบุรี",
                "notes": "เที่ยวเช้าแนะนำเพื่อหลีกเลี่ยงคนแน่น"
            },
            {
                "name": "สาย 4: ดำเนินสะดวก - ล่องเรือในตลาดน้ำ",
                "type": "boat",
                "operator": "เรือหางยาวท้องถิ่น",
                "from": "ตลาดน้ำดำเนินสะดวก",
                "to": "คลอง/ชุมชนริมน้ำ",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "10:00",
                    "11:00",
                    "12:00"
                ],
                "duration": "30-60 นาที",
                "baseFare": 150,
                "frequency": "ให้บริการตลอดช่วงตลาดเปิด",
                "terminal": "ท่าเรือในตลาดน้ำ",
                "notes": "ควรตกลงราคาและเส้นทางก่อนลงเรือ"
            }
        ],
        "localFoods": [
            {
                "name": "นมสดหนองโพ",
                "priceRange": "15-60฿",
                "category": "drink",
                "note": "ของฝาก/เครื่องดื่มชื่อดัง ผลิตโดยสหกรณ์โคนมหนองโพ"
            },
            {
                "name": "ไอศกรีม/ขนมจากนมหนองโพ",
                "priceRange": "30-120฿",
                "category": "dessert",
                "note": "คาเฟ่และร้านของฝากมักมีเมนูจากนมสด"
            },
            {
                "name": "ข้าวห่อ (มี่ถ่อง)",
                "priceRange": "20-80฿",
                "category": "local",
                "note": "อาหาร/พิธีกรรมท้องถิ่นของชาวกะเหรี่ยงโพล่ง รับประทานกับมะพร้าวกวน"
            },
            {
                "name": "มะพร้าวกวน (เครื่องกินคู่ข้าวห่อ)",
                "priceRange": "20-70฿",
                "category": "dessert",
                "note": "นิยมทำเป็นของหวาน/ของฝาก"
            },
            {
                "name": "ยำผักกูด (โซนสวนผึ้ง)",
                "priceRange": "80-200฿",
                "category": "street",
                "note": "เมนูยอดนิยมในร้านอาหารแถบสวนผึ้ง (วัตถุดิบผักกูด)"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "600-1,400฿/คืน",
                "examples": [
                    "HOP INN Ratchaburi",
                    "Space59 Hotel",
                    "Mmor Hotel"
                ],
                "bookingUrl": "https://www.agoda.com/region/ratchaburi-province-th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,400-3,800฿/คืน",
                "examples": [
                    "Navela Hotel & Convention",
                    "The Peace Hostel",
                    "La Toscana Resort"
                ],
                "bookingUrl": "https://www.agoda.com/region/ratchaburi-province-th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "3,800-12,000฿/คืน",
                "examples": [
                    "La Toscana Resort",
                    "Villa Moreeda",
                    "The Scenery Vintage Farm Resort"
                ],
                "bookingUrl": "https://www.agoda.com/region/ratchaburi-province-th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "อากาศร้อนจัดและแดดแรง",
                "severity": "medium",
                "note": "ช่วงมี.ค.-พ.ค. อากาศร้อนมาก โดยเฉพาะเที่ยง-บ่าย",
                "season": "มี.ค.-พ.ค."
            },
            {
                "label": "น้ำท่วมขัง/ฝนหนักบางช่วง",
                "severity": "low",
                "note": "พื้นที่ลุ่มและริมคลองอาจมีน้ำท่วมขังเป็นช่วง ๆ",
                "season": "ก.ย.-ต.ค."
            },
            {
                "label": "อุบัติเหตุบนถนนชนบท/เส้นทางภูเขาไปสวนผึ้ง",
                "severity": "medium",
                "note": "ถนนบางช่วงคดเคี้ยวและมืดในตอนกลางคืน ควรระวังความเร็ว",
                "season": null
            }
        ],
        "ecoIds": [
                "fl_bamboo",
                "fl_mangrove_halophyte",
                "f_gaur",
                "f_wild_elephant",
                "t_tenasserim_foothill",
                "c_hot_haze",
                "h_forest_fire",
                "h_flood_maeklong"
        ],
        "newEcoEntities": [
                { id: "fl_bamboo", name: "ไผ่ป่า", category: "flora", tags: ["common","edible"], desc: "ราชบุรีฝั่งตะวันตกมีป่าภูเขาและชายป่ากว้าง ไผ่เป็นองค์ประกอบพืชสำคัญของพื้นที่ดังกล่าว" },
                { id: "fl_mangrove_halophyte", name: "ชะครามชายเลน", category: "flora", tags: ["common","rare","edible"], desc: "พืชทนเค็มบางชนิดพบในพื้นที่ชุ่มน้ำเค็มหรือดินเค็มบางจุดของลุ่มน้ำตอนล่าง แม้ไม่เด่นเท่าชายฝั่งจังหวัดอื่น" },
                { id: "f_gaur", name: "กระทิง", category: "fauna", tags: ["danger","rare","protected"], desc: "ราชบุรีตอนตะวันตกเชื่อมกับกลุ่มป่าแก่งกระจานและแม่น้ำภาชี จึงรองรับกระทิงในพื้นที่คุ้มครอง" },
                { id: "f_wild_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","rare","protected"], desc: "ช้างป่าพบในแนวป่าตะวันตกของราชบุรี แม้ไม่หนาแน่นเท่าจังหวัดถัดลงใต้แต่ยังเป็นสัตว์เสี่ยงสำคัญ" },
                { id: "t_tenasserim_foothill", name: "เชิงเขาตะนาวศรีและลุ่มน้ำแม่กลอง", category: "terrain", tags: ["common"], desc: "ราชบุรีมีทั้งแนวเขาตะวันตก พื้นที่เกษตรเชิงเขา และที่ราบลุ่มเชื่อมแม่น้ำแม่กลอง" },
                { id: "c_hot_haze", name: "อากาศร้อนแห้งและฝุ่นควัน", category: "climate", tags: ["common","danger","seasonal"], desc: "ช่วงอากาศแห้งและการเผาในที่โล่งอาจทำให้เกิดหมอกควันและฝุ่นสะสม โดยเฉพาะพื้นที่ลุ่มและหุบเขา" },
                { id: "h_forest_fire", name: "ไฟป่าชายเขา", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ราชบุรีฝั่งภูเขามีความเสี่ยงไฟป่าในช่วงแห้งจัด โดยเฉพาะแนวป่าแห้งและพื้นที่เกษตรติดป่า" },
                { id: "h_flood_maeklong", name: "น้ำท่วมพื้นที่ลุ่มแม่กลอง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "พื้นที่ต่ำตามระบบลุ่มน้ำแม่กลองมีโอกาสน้ำท่วมขังเมื่อฝนหนักหรือน้ำระบายช้า" }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 22-36°C, ร้อนช่วงมี.ค.-พ.ค. ฝนพ.ค.-ต.ค.",
            "terrain": "มีทั้งที่ราบลุ่มแม่น้ำ/คลองและแนวเขาตะนาวศรีฝั่งตะวันตก (โซนสวนผึ้ง)",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "ตลาดน้ำดำเนินสะดวก",
                "content": "ตลาดน้ำชื่อดังของราชบุรี ควรมาเช้าๆ วันเสาร์อาทิตย์มีอาหารพื้นเมืองและผักผลไม้สด",
                "type": "food"
            },
            {
                "title": "วัดถ้ำเสือ",
                "content": "วัดบนภูเขาที่มีพระพุทธรูปปางไสยาสน์ และจุดชมวิวเมืองบนยอดเขา",
                "type": "culture"
            },
            {
                "title": "ดอกบัวตองฝั่งตะวันตก",
                "content": "ฤดูฝน ดอกบัวตองบานริมบึงในอุทยานฯ ทับลาน (ฝั่งอุทัยธานี) หรือชมในงานประเพณียี่เป็งจังหวัด",
                "type": "season"
            },
            {
                "title": "อาหารท้องถิ่น",
                "content": "ราชบุรีมีอาหารพื้นบ้าน เช่น ปลาทับทิมย่าง, ขนมจีนแกงไตปลา ลองชิมได้ที่ตลาดและร้านริมทาง",
                "type": "food"
            },
            {
                "title": "ทางหลวงเชื่อมต่อ",
                "content": "ถนนเพชรเกษม (ชนบท) และถนนหมายเลข 323 เชื่อมราชบุรี-นครปฐม ควรระมัดระวังทางโค้ง",
                "type": "route"
            },
            {
                "title": "ประหยัดการเดินทาง",
                "content": "ท่องเที่ยวโดยรถจักรยานยนต์หรือรถตู้บริการมีราคาถูกกว่าในบางเส้นทาง",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารไทยพาณิชย์ (ราชบุรี)",
                "area": "ตลาดสนามหญ้า",
                "note": "บริการ ATM",
                "openHours": "09:00-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. ราชบุรี",
                "area": "ทางหลวงหมายเลข 4",
                "note": "บริการ 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ ตลาดน้ำดำเนินสะดวก",
                "area": "ใกล้ท่าเรือ",
                "note": "บริการนักท่องเที่ยว",
                "openHours": "06:00-18:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยา ราชานุเคราะห์",
                "area": "ตัวเมือง",
                "note": "บริการตลอดวัน",
                "openHours": "08:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลราชบุรี",
                "area": "ตัวเมือง",
                "note": "โรงพยาบาลหลักประจำจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรเมืองราชบุรี",
                "area": "ตัวเมือง",
                "note": "ข้อมูลสถานการณ์ความปลอดภัย",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "PTT EV Charger (ราชบุรี)",
                "area": "ตลาดนัดมีชัย",
                "note": "สถานีชาร์จรถไฟฟ้า",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "สถานีขนส่งผู้โดยสารราชบุรี",
                "area": "เขางู",
                "note": "บริการตั๋วเดินทาง",
                "openHours": "06:00-18:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพฯ",
                "นครปฐม",
                "ราชบุรี"
            ],
            "commonDestinations": [
                "ตลาดน้ำดำเนินสะดวก",
                "วัดถ้ำเสือ",
                "เขาช่องพราน",
                "คลองมหาสวัสดิ์",
                "วัดหนองหอย"
            ],
            "transitHubs": [
                "สถานีรถไฟราชบุรี",
                "สถานีขนส่งราชบุรี"
            ],
            "routeNotes": [
                "เส้นทางถนนเพชรเกษม (ชนบท) จากดอนตูมถึงราชบุรี",
                "ทางหลวงหมายเลข 32 ไปนครปฐม ลัดเข้าอำเภอดำเนินสะดวก",
                "เลี่ยงถนนลัดระหว่างอำเภอที่กำลังก่อสร้าง"
            ]
        }
    },
    "Phetchaburi": {
        "transport": [
            {
                "name": "รถไฟสายใต้ กรุงเทพฯ-เพชรบุรี/ชะอำ",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "รถไฟสายใต้จอดหลายสถานีในจังหวัด เหมาะเดินทางไปเมืองเพชรและชะอำ",
                "warpUrl": "https://www.railway.co.th/",
                "logoText": "🚆",
                "color": "#3b82f6"
            },
            {
                "name": "รถทัวร์/รถบัสกรุงเทพฯ-เพชรบุรี",
                "shortName": "รถทัวร์",
                "type": "bus",
                "description": "มีรถจากสถานีขนส่งสายใต้ใหม่ไปเมืองเพชรบุรีและชะอำ",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0ea5e9"
            },
            {
                "name": "รถตู้กรุงเทพฯ-ชะอำ",
                "shortName": "รถตู้",
                "type": "van",
                "description": "สะดวกสำหรับเที่ยวทะเลชะอำ ใช้เวลาราว 2.5-3.5 ชม.",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#38bdf8"
            },
            {
                "name": "รถสองแถว/รถมินิบัสในเมืองเพชรบุรี",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "ใช้เดินทางในเมืองเพชรบุรีและต่อไปจุดท่องเที่ยวใกล้เมือง",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถรับจ้างเหมาคันไปแก่งกระจาน/อุทยาน",
                "shortName": "เหมารถ",
                "type": "other",
                "description": "เส้นทางธรรมชาติเข้าอุทยานบางช่วงถนนแคบ ควรใช้รถสภาพดีและขับขี่ระวัง",
                "warpUrl": "",
                "logoText": "🚗",
                "color": "#64748b"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ (สายใต้ใหม่) - เพชรบุรี (ตัวเมือง)",
                "type": "coach",
                "operator": "บขส./ผู้ประกอบการเอกชน",
                "from": "กรุงเทพฯ (สายใต้ใหม่)",
                "to": "เพชรบุรี (ตัวเมือง)",
                "via": [
                    "สมุทรสาคร",
                    "สมุทรสงคราม"
                ],
                "departureTimes": [
                    "05:00",
                    "07:00",
                    "09:00",
                    "12:00",
                    "15:00",
                    "18:00"
                ],
                "duration": "2-3 ชม.",
                "baseFare": 150,
                "frequency": "ทุก 1-2 ชม. (โดยประมาณ)",
                "terminal": "สถานีขนส่งสายใต้ใหม่",
                "notes": "เวลา/ราคาเปลี่ยนตามบริษัทและวันเดินทาง"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - เพชรบุรี (รถไฟสายใต้)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย (SRT)",
                "from": "กรุงเทพฯ (สถานีกลาง/สถานีต้นทางสายใต้)",
                "to": "เพชรบุรี (สถานีเพชรบุรี)",
                "via": [
                    "นครปฐม",
                    "ราชบุรี"
                ],
                "departureTimes": [
                    "07:30",
                    "13:00",
                    "19:00"
                ],
                "duration": "2.5-4 ชม.",
                "baseFare": 50,
                "frequency": "หลายขบวน/วัน",
                "terminal": "สถานีรถไฟต้นทางในกรุงเทพฯ",
                "notes": "ขึ้นกับขบวนที่เลือก"
            },
            {
                "name": "สาย 3: กรุงเทพฯ - ชะอำ (รถตู้)",
                "type": "van",
                "operator": "รถตู้สายกรุงเทพฯ-ชะอำ",
                "from": "กรุงเทพฯ",
                "to": "เพชรบุรี (ชะอำ)",
                "via": [
                    "สมุทรสาคร",
                    "สมุทรสงคราม"
                ],
                "departureTimes": [
                    "06:00",
                    "09:00",
                    "12:00",
                    "15:00",
                    "18:00"
                ],
                "duration": "2.5-3.5 ชม.",
                "baseFare": 200,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "จุดขึ้นรถในกรุงเทพฯ",
                "notes": "ช่วงวันหยุดอาจเต็มเร็ว ควรจองล่วงหน้า"
            },
            {
                "name": "สาย 4: เพชรบุรี - อุทยานแห่งชาติแก่งกระจาน",
                "type": "van",
                "operator": "รถตู้/เหมารถท้องถิ่น",
                "from": "เพชรบุรี (ตัวเมือง)",
                "to": "แก่งกระจาน",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "10:00",
                    "13:00"
                ],
                "duration": "1.5-3 ชม.",
                "baseFare": 150,
                "frequency": "ตามนัด/ตามฤดูกาล",
                "terminal": "คิวรถในตัวเมือง",
                "notes": "ควรเช็คเงื่อนไขการเข้าอุทยานและสภาพถนนช่วงฝน"
            }
        ],
        "localFoods": [
            {
                "name": "ขนมหม้อแกงเพชรบุรี",
                "priceRange": "25-80฿",
                "category": "dessert",
                "note": "ของฝากขึ้นชื่อ รสหวานหอมไข่และน้ำตาลโตนด"
            },
            {
                "name": "น้ำตาลโตนด/น้ำตาลสด",
                "priceRange": "20-60฿",
                "category": "drink",
                "note": "อัตลักษณ์วัตถุดิบของเมืองเพชร ใช้ทำขนมและเครื่องดื่ม"
            },
            {
                "name": "ข้าวแช่เพชรบุรี",
                "priceRange": "120-250฿",
                "category": "local",
                "note": "เมนูดังของเพชรบุรี นิยมทานช่วงอากาศร้อน"
            },
            {
                "name": "แกงคั่วหัวตาล",
                "priceRange": "80-200฿",
                "category": "local",
                "note": "เมนูท้องถิ่นใช้หัวตาลอ่อน มีรสขมจาง ๆ เป็นเอกลักษณ์"
            },
            {
                "name": "ลอดช่องน้ำตาลโตนด",
                "priceRange": "25-70฿",
                "category": "dessert",
                "note": "ของหวานเย็นยอดนิยม ใช้น้ำตาลโตนดเพิ่มความหอมหวาน"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "700-1,600฿/คืน",
                "examples": [
                    "Royal Diamond Hotel",
                    "Baan Talay Samran",
                    "Cha-Am Methavalai Hotel"
                ],
                "bookingUrl": "https://www.agoda.com/region/phetchaburi-province-th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,600-4,500฿/คืน",
                "examples": [
                    "The Regent Cha Am Beach Resort",
                    "Long Beach Cha-Am Hotel",
                    "Veranda Resort & Villas Hua Hin Cha Am - MGallery"
                ],
                "bookingUrl": "https://www.agoda.com/region/phetchaburi-province-th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "4,500-20,000฿/คืน",
                "examples": [
                    "SO/ Sofitel Hua Hin",
                    "Veranda Resort & Villas Hua Hin Cha Am - MGallery",
                    "The Regent Cha Am Beach Resort"
                ],
                "bookingUrl": "https://www.agoda.com/region/phetchaburi-province-th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ช้างป่าและสัตว์ป่าในผืนป่าแก่งกระจาน",
                "severity": "high",
                "note": "พื้นที่อุทยานมีสัตว์ป่าหลากหลาย ควรทำตามคำแนะนำเจ้าหน้าที่และไม่เข้าใกล้สัตว์",
                "season": null
            },
            {
                "label": "คลื่นลมแรง/ทะเลปั่นป่วนชายฝั่งชะอำ",
                "severity": "medium",
                "note": "ช่วงมรสุมทะเลอาจคลื่นแรงและมีฝนหนักเป็นช่วง ๆ",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "อากาศร้อนจัดและแดดแรง",
                "severity": "medium",
                "note": "ช่วงมี.ค.-พ.ค. อากาศร้อนมาก โดยเฉพาะในเมือง",
                "season": "มี.ค.-พ.ค."
            }
        ],
        "ecoIds": [
                "fl_mangrove_rhizophora",
                "fl_samphire",
                "f_migratory_shorebird",
                "f_wild_elephant",
                "t_wetland_tenasserim",
                "c_heat_and_monsoon",
                "h_flash_flood",
                "h_coastal_erosion"
        ],
        "newEcoEntities": [
                { id: "fl_mangrove_rhizophora", name: "โกงกาง", category: "flora", tags: ["common"], desc: "ชายฝั่งเพชรบุรีมีป่าชายเลนสำคัญ โดยเฉพาะโซนแหลมผักเบี้ยที่เป็นพื้นที่ชุ่มน้ำและแหล่งอาศัยสัตว์น้ำวัยอ่อน" },
                { id: "fl_samphire", name: "ชะคราม", category: "flora", tags: ["common","edible"], desc: "ชะครามเป็นพืชทนเค็มที่พบในพื้นที่ชายฝั่งเพชรบุรี และเกี่ยวข้องกับวิถีอาหารชายเลนท้องถิ่น" },
                { id: "f_migratory_shorebird", name: "นกชายเลนอพยพ", category: "fauna", tags: ["common","protected","seasonal"], desc: "เพชรบุรีเป็นจุดสำคัญของนกชายเลนอพยพในอ่าวไทยตอนใน โดยพบได้มากในพื้นที่ชุ่มน้ำและนาเกลือ" },
                { id: "f_wild_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","common","protected"], desc: "ผืนป่าแก่งกระจานของเพชรบุรีรองรับช้างป่าจำนวนสำคัญของประเทศไทย" },
                { id: "t_wetland_tenasserim", name: "พื้นที่ชุ่มน้ำชายฝั่งและเทือกเขาแก่งกระจาน", category: "terrain", tags: ["common"], desc: "เพชรบุรีมีทั้งพื้นที่ชุ่มน้ำชายฝั่ง นาเกลือ และป่าภูเขาตะวันตกในกลุ่มป่าแก่งกระจาน" },
                { id: "c_heat_and_monsoon", name: "อากาศร้อนจัดสลับฝนมรสุม", category: "climate", tags: ["common","danger","seasonal"], desc: "เพชรบุรีมีฤดูร้อนเด่นในที่ราบชายฝั่ง ขณะที่ช่วงมรสุมทำให้ฝนเพิ่มขึ้นทั้งฝั่งทะเลและเชิงเขา" },
                { id: "h_flash_flood", name: "น้ำป่าไหลหลากจากเทือกเขา", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ฝนสะสมบนเทือกเขาอาจทำให้เกิดน้ำป่าและกระทบพื้นที่ท้ายน้ำอย่างรวดเร็ว" },
                { id: "h_coastal_erosion", name: "การกัดเซาะชายฝั่งและคลื่นแรง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ชายฝั่งอ่าวไทยของเพชรบุรีมีช่วงคลื่นแรงและเสี่ยงกัดเซาะ โดยเฉพาะช่วงมรสุมและน้ำทะเลหนุน" }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 23-35°C, ร้อนชื้น ฝนพ.ค.-ต.ค. ชายฝั่งมีลมทะเลและมรสุม",
            "terrain": "มีทั้งเมืองเก่า-ที่ราบลุ่ม และผืนป่าใหญ่/เทือกเขาในโซนแก่งกระจาน รวมถึงชายฝั่งชะอำ",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "พระราชนิเวศน์มฤคทายวัน",
                "content": "พระราชวังฤดูร้อนของพระบาทสมเด็จพระจุลจอมเกล้าเจ้าอยู่หัว บรรยากาศร่มรื่นมีสระว่ายน้ำไม้สัก",
                "type": "culture"
            },
            {
                "title": "เขาวัง",
                "content": "พระนครคีรี อุทยานประวัติศาสตร์ อยู่เหนือเมืองตัวเมือง ชมวิวได้ทั้งเมืองและทะเล",
                "type": "culture"
            },
            {
                "title": "หอยทอดคุณยาย",
                "content": "ขนมหวานและหอยทอดของดีเมืองเพชร ลิ้มลองได้ที่ตลาดโต้รุ่งหรือริมแม่น้ำ",
                "type": "food"
            },
            {
                "title": "ฤดูฝน",
                "content": "หน้าฝน (ก.ค.-ก.ย.) ถนนเพชรเกษมชื้นแฉะ ควรระวังการขับขี่โดยเฉพาะเส้นโค้ง",
                "type": "safety"
            },
            {
                "title": "หาดชะอำ-หัวหิน",
                "content": "หัวหินมีชายหาดสวย เหมาะเที่ยวช่วงธ.ค.-ก.พ. หลีกเลี่ยงช่วงเทศกาลเพื่อจองที่พักล่วงหน้า",
                "type": "season"
            },
            {
                "title": "ถนนเพชรเกษม",
                "content": "ถนนเพชรเกษม (หมายเลข 4) เชื่อมกรุงเทพฯ-ชุมพร ควรวางแผนเติมน้ำมันให้เพียงพอก่อนออกนอกเมือง",
                "type": "route"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงไทย (เพชรบุรี)",
                "area": "ตัวเมือง",
                "note": "ฝาก-ถอน ATM",
                "openHours": "09:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. ชะอำ",
                "area": "ถนนเพชรเกษม",
                "note": "บริการ 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ วัดมหาธาตุ (เขาวัง)",
                "area": "เขาวัง",
                "note": "บริเวณพระนครคีรี",
                "openHours": "06:00-18:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยา เดอะมอลล์ เพชรบุรี",
                "area": "ตัวเมือง",
                "note": "ตั้งในเดอะมอลล์",
                "openHours": "10:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลเพชรบุรี",
                "area": "ตัวเมือง",
                "note": "โรงพยาบาลหลักประจำจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรเมืองเพชรบุรี",
                "area": "ตัวเมือง",
                "note": "ข้อมูลความปลอดภัย",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "PTT EV Charger (ชะอำ)",
                "area": "ริมถนนเพชรเกษม",
                "note": "สถานีชาร์จรถไฟฟ้า",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "สถานีขนส่งผู้โดยสารเพชรบุรี",
                "area": "ใกล้ตัวเมือง",
                "note": "บริการรถตู้ กรุงเทพฯ-หัวหิน",
                "openHours": "05:00-20:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพฯ",
                "ราชบุรี",
                "ประจวบคีรีขันธ์"
            ],
            "commonDestinations": [
                "พระนครคีรี (เขาวัง)",
                "พระราชนิเวศน์มฤคทายวัน",
                "แหลมผักเบี้ย",
                "ชะอำ",
                "หัวหิน"
            ],
            "transitHubs": [
                "สถานีรถไฟชะอำ",
                "สถานีขนส่งหัวหิน"
            ],
            "routeNotes": [
                "ถนนเพชรเกษม (หมายเลข 4) เข้าเพชรบุรี-หัวหิน",
                "บางช่วงเส้นหลักมีทางแยกมาก ต้องระวังการเลี้ยว",
                "ถนนสองเลนบางช่วงระวังฝ่า"
            ]
        }
    }
};
