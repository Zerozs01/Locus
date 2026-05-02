// Portal seed data: ภาคตะวันออก+ตะวันตก Part 1 (5 จังหวัด)
// Source: documents/deepreserach/part5_ภาคตะวันออก+ตะวันตก.md
import type { ProvincePortalSeedData } from './db';

export const eastWest1: Record<string, ProvincePortalSeedData> = {
    "Chon Buri": {
        "transport": [
            {
                "name": "รถสองแถวพัทยา (รถบาท)",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวสีฟ้าที่วิ่งวนเส้นทางหลักในพัทยา ขึ้น-ลงได้ตามแนวเส้นทางหลัก",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถบัสพัทยา-กรุงเทพฯ (Pattaya Bus)",
                "shortName": "Pattaya Bus",
                "type": "bus",
                "description": "รถบัสสาธารณะเชื่อมบางนา/หมอชิต ↔ พัทยา ค่าโดยสารคงที่",
                "warpUrl": "https://pattayabus.com/",
                "logoText": "🚌",
                "color": "#0ea5e9"
            },
            {
                "name": "รถบัสสนามบินสุวรรณภูมิ-พัทยา (Airport Pattaya Bus)",
                "shortName": "Airport Bus",
                "type": "bus",
                "description": "รถบัสจากสุวรรณภูมิไปพัทยา/จอมเทียน มีรอบถี่ตลอดวัน",
                "warpUrl": "https://airportpattayabus.com/",
                "logoText": "🚌",
                "color": "#0ea5e9"
            },
            {
                "name": "เรือโดยสารพัทยา-เกาะล้าน",
                "shortName": "เรือเกาะล้าน",
                "type": "boat",
                "description": "เรือโดยสารจากท่าเรือแหลมบาลีฮายไปเกาะล้าน หลายรอบ/วัน",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#14b8a6"
            },
            {
                "name": "รถจักรยานยนต์รับจ้าง",
                "shortName": "วินมอเตอร์ไซค์",
                "type": "bike",
                "description": "เหมาะกับระยะสั้น/ซอยลึก ควรตกลงราคาก่อนขึ้น",
                "warpUrl": "",
                "logoText": "🛵",
                "color": "#a855f7"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: สุวรรณภูมิ - พัทยา (จอมเทียน)",
                "type": "coach",
                "operator": "Airport Pattaya Bus (Roong Reuang Coach)",
                "from": "สนามบินสุวรรณภูมิ",
                "to": "พัทยา (จอมเทียน)",
                "via": [
                    "สมุทรปราการ",
                    "ชลบุรี"
                ],
                "departureTimes": [
                    "06:00",
                    "12:00",
                    "18:00",
                    "22:00"
                ],
                "duration": "2-3 ชม.",
                "baseFare": 143,
                "frequency": "ทุก 1 ชม.",
                "terminal": "เคาน์เตอร์ชั้น 1 ประตู 8 สนามบินสุวรรณภูมิ",
                "notes": "รอบ 22:00 ไปพัทยาเหนือ (ไม่เข้าจอมเทียน)"
            },
            {
                "name": "สาย 2: บางนา (กรุงเทพฯ) - พัทยา",
                "type": "coach",
                "operator": "Pattaya Bus",
                "from": "กรุงเทพฯ (บางนา)",
                "to": "พัทยา",
                "via": [
                    "กรุงเทพมหานคร",
                    "สมุทรปราการ",
                    "ชลบุรี"
                ],
                "departureTimes": [
                    "06:30",
                    "12:30",
                    "18:30",
                    "22:30"
                ],
                "duration": "2-3 ชม.",
                "baseFare": 131,
                "frequency": "ทุก 1 ชม. (โดยรวม)",
                "terminal": "สถานีกรุงเทพ (บางนา)",
                "notes": "เวลาออกจริงอาจเปลี่ยนตามวัน/ช่วงเทศกาล"
            },
            {
                "name": "สาย 3: สุวรรณภูมิ - พัทยา (ส่งหน้าโรงแรม)",
                "type": "coach",
                "operator": "Bell Travel Service",
                "from": "สนามบินสุวรรณภูมิ",
                "to": "พัทยา (หน้าโรงแรมที่ระบุ)",
                "via": [
                    "สมุทรปราการ",
                    "ชลบุรี"
                ],
                "departureTimes": [
                    "08:30",
                    "10:30",
                    "12:30",
                    "14:30",
                    "16:30",
                    "18:00"
                ],
                "duration": "2.5-3.5 ชม.",
                "baseFare": 200,
                "frequency": "วันละ 6 เที่ยว",
                "terminal": "เคาน์เตอร์ชั้น 1 ประตู 8 สนามบินสุวรรณภูมิ",
                "notes": "ราคาขึ้นกับจุดรับ-ส่ง/บริการกระเป๋า ให้ยืนยันก่อนจอง"
            },
            {
                "name": "สาย 4: พัทยา - เกาะล้าน",
                "type": "boat",
                "operator": "เรือโดยสารท่าเรือแหลมบาลีฮาย",
                "from": "พัทยา (ท่าเรือแหลมบาลีฮาย)",
                "to": "เกาะล้าน (ท่าหน้าบ้าน/ท่าหาดตาแหวน)",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "09:00",
                    "13:00",
                    "17:00"
                ],
                "duration": "30-45 นาที",
                "baseFare": 30,
                "frequency": "วันละหลายรอบ",
                "terminal": "ท่าเรือแหลมบาลีฮาย",
                "notes": "คลื่นลมแรงอาจงดเรือ (มักพบช่วงมรสุม)"
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวหลามหนองมน",
                "priceRange": "40-120฿",
                "category": "dessert",
                "note": "ของฝากยอดนิยมย่านตลาดหนองมน"
            },
            {
                "name": "ข้าวเกรียบอ่อน",
                "priceRange": "30-100฿",
                "category": "street",
                "note": "ทานเป็นของว่าง/ของฝาก รสเค็ม-หวาน"
            },
            {
                "name": "ไก่ย่างบางแสน",
                "priceRange": "120-250฿",
                "category": "street",
                "note": "ไก่ย่างสไตล์ท้องถิ่น นิยมทานคู่ส้มตำ/ข้าวเหนียว"
            },
            {
                "name": "ฮ่อยจ๊อกรรเชียงปู",
                "priceRange": "80-220฿",
                "category": "local",
                "note": "ของฝาก/เมนูยอดนิยมของชลบุรีสายจีน-แต้จิ๋ว"
            },
            {
                "name": "ซีฟู้ดบางแสน/พัทยา",
                "priceRange": "200-600฿",
                "category": "local",
                "note": "เน้นอาหารทะเลสดตามฤดูกาล (ราคาแปรผัน)"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "600-1,200฿/คืน",
                "examples": [
                    "HOP INN Chonburi",
                    "Red Planet Pattaya",
                    "ibis Pattaya"
                ],
                "bookingUrl": "https://www.agoda.com/region/chon-buri-province-th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,200-3,500฿/คืน",
                "examples": [
                    "Mercure Pattaya Ocean Resort",
                    "Amari Pattaya",
                    "Holiday Inn Pattaya"
                ],
                "bookingUrl": "https://www.agoda.com/region/chon-buri-province-th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "3,500-15,000฿/คืน",
                "examples": [
                    "Hilton Pattaya",
                    "InterContinental Pattaya Resort",
                    "Cape Dara Resort"
                ],
                "bookingUrl": "https://www.agoda.com/region/chon-buri-province-th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "การจราจรหนาแน่น/อุบัติเหตุบนมอเตอร์เวย์และถนนท่องเที่ยว",
                "severity": "medium",
                "note": "ช่วงสุดสัปดาห์/วันหยุดรถหนาแน่นมาก ควรเผื่อเวลาและขับขี่ระวัง",
                "season": null
            },
            {
                "label": "คลื่นลมแรงกระทบเรือไปเกาะล้านและกิจกรรมทางทะเล",
                "severity": "medium",
                "note": "ช่วงลมแรงอาจมีการงดเรือหรือจำกัดกิจกรรมทางทะเล",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "PM2.5 และมลพิษเมือง/อุตสาหกรรม",
                "severity": "medium",
                "note": "อาจมีค่าฝุ่นสูงบางวัน โดยเฉพาะช่วงลมอ่อนและฤดูแล้ง",
                "season": "ธ.ค.-มี.ค."
            }
        ],
        "ecoIds": [
                "fl_mangrove_rhizophora",
                "fl_mangrove_avicennia",
                "f_long_tailed_macaque",
                "f_mudskipper",
                "t_mangrove_coast",
                "c_pm25_industrial",
                "h_coastal_erosion",
                "h_urban_flood"
        ],
        "newEcoEntities": [
                { id: "fl_mangrove_rhizophora", name: "โกงกาง", category: "flora", tags: ["common"], desc: "ไม้ป่าชายเลนเด่นของชายฝั่งชลบุรี ช่วยยึดตะกอนและเป็นแหล่งอนุบาลสัตว์น้ำวัยอ่อน" },
                { id: "fl_mangrove_avicennia", name: "แสมทะเล", category: "flora", tags: ["common"], desc: "พบร่วมกับโกงกางในพื้นที่เลนชายฝั่ง ทนความเค็มได้ดีและช่วยรักษาสมดุลระบบนิเวศปากอ่าว" },
                { id: "f_long_tailed_macaque", name: "ลิงแสม", category: "fauna", tags: ["common","danger","protected"], desc: "พบได้จริงตามชายฝั่งและจุดท่องเที่ยวบางแห่ง ไม่ควรให้อาหารหรือเข้าใกล้ฝูงเพราะอาจแย่งของได้" },
                { id: "f_mudskipper", name: "ปลาตีน", category: "fauna", tags: ["common"], desc: "สัตว์เด่นของระบบนิเวศดินเลนป่าชายเลน มักพบเดินบนเลนช่วงน้ำลง" },
                { id: "t_mangrove_coast", name: "ป่าชายเลนและชายฝั่งอ่าวไทย", category: "terrain", tags: ["common"], desc: "ชลบุรีมีทั้งชายหาด เมืองชายฝั่ง และป่าชายเลน ทำให้ระบบนิเวศทะเลตื้นกับพื้นที่ชุมชนอยู่ใกล้กันมาก" },
                { id: "c_pm25_industrial", name: "ฝุ่น PM2.5 และหมอกควันเมืองอุตสาหกรรม", category: "climate", tags: ["danger","common","seasonal"], desc: "ช่วงอากาศปิดและการจราจรหนาแน่น คุณภาพอากาศมีโอกาสแย่ลง โดยเฉพาะพื้นที่เมืองและอุตสาหกรรม" },
                { id: "h_coastal_erosion", name: "การกัดเซาะชายฝั่ง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "พื้นที่ชายฝั่งบางช่วงเสี่ยงถูกคลื่นกัดเซาะ โดยเฉพาะตอนคลื่นลมแรงและช่วงมรสุม" },
                { id: "h_urban_flood", name: "น้ำท่วมขังเขตเมือง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนหนักระยะสั้นทำให้เกิดน้ำท่วมขังได้ในเขตเมืองชายฝั่งและพื้นที่ระบายน้ำช้า" }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 24-35°C, ร้อนชื้น ฝนมากช่วงมรสุม (พ.ค.-ต.ค.)",
            "terrain": "ชายฝั่งอ่าวไทย เมืองท่องเที่ยวชายทะเล มีเกาะใกล้ฝั่งและพื้นที่อุตสาหกรรม",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เทศกาลวิ่งควาย",
                "content": "ระหว่างปลายเดือนกันยายนถึงต้นเดือนตุลาคมของทุกปี จัดงานวิ่งควายที่อำเภอบ้านบึง เป็นประเพณีสำคัญที่หาชมได้ในชลบุรี",
                "type": "culture"
            },
            {
                "title": "สงกรานต์บางแสน",
                "content": "เทศกาลสงกรานต์ที่บางแสนจัดระหว่าง 16-17 เมษายน ประกอบด้วยการประดิษฐ์พระทรายและปฏิทินประกวดแข่งขัน",
                "type": "culture"
            },
            {
                "title": "ฤดูท่องเที่ยวสูง",
                "content": "ช่วงพฤศจิกายนถึงกุมภาพันธ์อากาศเย็นน้อย ฝนตกน้อย เหมาะกับกิจกรรมชายหาดและเดินชมเมือง",
                "type": "season"
            },
            {
                "title": "ระวังนักท่องเที่ยวพลุกพล่าน",
                "content": "ย่านพัทยาและบางแสนมักมีนักท่องเที่ยวจำนวนมาก โดยเฉพาะช่วงฤดูท่องเที่ยว ควรระวังทรัพย์สินส่วนตัว",
                "type": "safety"
            },
            {
                "title": "อาหารทะเลสดใหม่",
                "content": "ชลบุรีขึ้นชื่ออาหารทะเลสด เช่น กุ้ง ปลา และหอย ควรลองชิมตามร้านท้องถิ่นอ่าวสัตหีบและบางแสน",
                "type": "food"
            },
            {
                "title": "การเดินทางหลัก",
                "content": "ใช้ทางหลวงหมายเลข 7 (บางนา-ชลบุรี) หรือถนนสุขุมวิทจากกรุงเทพฯ ขับตรงมายังตัวเมืองชลบุรี",
                "type": "route"
            },
            {
                "title": "ราคาที่พักผันผวน",
                "content": "ช่วงเทศกาลหรือปลายปีที่พักมักเต็มและแพง ควรจองล่วงหน้า หรือมองหาย่านที่พักภายในเมืองเพื่อประหยัด",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ (สาขาบางแสน)",
                "area": "อำเภอเมืองชลบุรี",
                "note": "บริการฝาก-ถอน และ ATM 24 ชม.",
                "openHours": "09:00-15:00",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. บางแสน",
                "area": "ถนนสุขุมวิท",
                "note": "เปิดบริการ 24 ชั่วโมง",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ หาดบางแสน",
                "area": "หน้าโรงเรียนบางแสน",
                "note": "เปิดให้บริการทุกวัน",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยา บางแสนเภสัช",
                "area": "บางแสน",
                "note": "ยารักษาโรคทั่วไป",
                "openHours": "08:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลกรุงเทพพัทยา",
                "area": "พัทยาใต้",
                "note": "ให้บริการทั่วไป",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรบางละมุง",
                "area": "พัทยา",
                "note": "สำนักงานตำรวจท่องเที่ยวอยู่ใกล้เคียง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "PTT EV Charger (บางแสน)",
                "area": "บางแสนซอย 4",
                "note": "สถานีชาร์จรถยนต์ไฟฟ้า",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ศูนย์ข้อมูลนักท่องเที่ยว ชลบุรี",
                "area": "สวนสุขภาพ ใกล้สนามกีฬา",
                "note": "ข้อมูลท่องเที่ยว",
                "openHours": "08:00-18:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพฯ",
                "พัทยา",
                "สนามบินอู่ตะเภา"
            ],
            "commonDestinations": [
                "หาดบางแสน",
                "เกาะสีชัง",
                "สวนสัตว์เปิดเขาเขียว",
                "นิคมอุตสาหกรรมมาบตาพุด",
                "ท่าเรือแหลมฉบัง"
            ],
            "transitHubs": [
                "สนามบินอู่ตะเภา",
                "สถานีขนส่งเอกมัย",
                "สถานีรถไฟหัวลำโพง (สายตะวันออก)",
                "ท่าเรือเฟอร์รี่เกาะสีชัง"
            ],
            "routeNotes": [
                "ใช้ทางหลวงหมายเลข 7 จากกรุงเทพฯ มายังพัทยา",
                "ทางด่วนบูรพาวิถี (มอเตอร์เวย์) เสียค่าผ่านทาง",
                "ถนนสุขุมวิทรถติดหนักช่วงเย็น",
                "หลีกเลี่ยงการขับรถในพัทยากลางเวลากลางคืน"
            ]
        }
    },
    "Rayong": {
        "transport": [
            {
                "name": "รถสองแถวระยอง",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "ใช้เดินทางในตัวเมืองระยองและเส้นทางต่อไปบ้านเพ/แกลง (รอบและเส้นทางขึ้นกับพื้นที่)",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถตู้/มินิบัสกรุงเทพฯ-ระยอง",
                "shortName": "รถตู้",
                "type": "van",
                "description": "เหมาะเดินทางจากกรุงเทพฯมายังตัวเมือง/บ้านเพ มีรอบถี่ในช่วงกลางวัน",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#38bdf8"
            },
            {
                "name": "รถจักรยานยนต์รับจ้าง",
                "shortName": "วินมอเตอร์ไซค์",
                "type": "bike",
                "description": "เหมาะกับระยะสั้นและพื้นที่ที่รถสาธารณะเข้าถึงยาก ควรตกลงราคาก่อนขึ้น",
                "warpUrl": "",
                "logoText": "🛵",
                "color": "#a855f7"
            },
            {
                "name": "เรือบ้านเพ-เกาะเสม็ด",
                "shortName": "เรือเสม็ด",
                "type": "boat",
                "description": "เรือโดยสารจากท่าเรือบ้านเพไปเกาะเสม็ด มีทั้งเรือสปีดโบ๊ตและเรือช้า",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#14b8a6"
            },
            {
                "name": "รถโดยสารสนามบินสุวรรณภูมิ-ระยอง",
                "shortName": "Airport Bus",
                "type": "bus",
                "description": "มีผู้ให้บริการเอกชนหลายเจ้า วิ่งตรงจากสนามบินไปตัวเมืองระยอง",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0ea5e9"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ (เอกมัย) - ระยอง (ขนส่ง/ตัวเมือง)",
                "type": "coach",
                "operator": "บขส./ผู้ประกอบการเอกชน",
                "from": "กรุงเทพฯ (สถานีขนส่งเอกมัย)",
                "to": "ระยอง (ขนส่ง/ตัวเมือง)",
                "via": [
                    "สมุทรปราการ",
                    "ชลบุรี"
                ],
                "departureTimes": [
                    "06:00",
                    "09:00",
                    "13:00",
                    "18:00"
                ],
                "duration": "3-4 ชม.",
                "baseFare": 200,
                "frequency": "ทุก 1-2 ชม. (โดยประมาณ)",
                "terminal": "สถานีขนส่งเอกมัย",
                "notes": "เวลา/ราคาอาจเปลี่ยนตามวันและผู้ให้บริการ"
            },
            {
                "name": "สาย 2: สุวรรณภูมิ - ระยอง",
                "type": "coach",
                "operator": "Mitdee / Cherdchai Tour (ตัวอย่างผู้ให้บริการ)",
                "from": "สนามบินสุวรรณภูมิ",
                "to": "ระยอง (ตัวเมือง)",
                "via": [
                    "ชลบุรี"
                ],
                "departureTimes": [
                    "05:40",
                    "10:20",
                    "20:10"
                ],
                "duration": "2.5-4 ชม.",
                "baseFare": 182,
                "frequency": "ตลอดวัน (ความถี่ต่างกันตามผู้ให้บริการ)",
                "terminal": "จุดจอดรถบัสสนามบินสุวรรณภูมิ",
                "notes": "ตัวอย่างเวลาอ้างอิงจากตารางออนไลน์ ควรเช็คก่อนเดินทาง"
            },
            {
                "name": "สาย 3: กรุงเทพฯ (เอกมัย) - บ้านเพ (ท่าเรือไปเสม็ด)",
                "type": "van",
                "operator": "รถตู้สายเอกมัย-บ้านเพ",
                "from": "กรุงเทพฯ (เอกมัย)",
                "to": "ระยอง (บ้านเพ)",
                "via": [
                    "สมุทรปราการ",
                    "ชลบุรี"
                ],
                "departureTimes": [
                    "06:00",
                    "09:00",
                    "12:00",
                    "15:00"
                ],
                "duration": "3-4 ชม.",
                "baseFare": 220,
                "frequency": "ทุก 1-2 ชม. (โดยประมาณ)",
                "terminal": "สถานีขนส่งเอกมัย",
                "notes": "บางเที่ยวปรับปลายทางเป็นท่าเรือ/จุดลงใกล้ท่าเรือ"
            },
            {
                "name": "สาย 4: บ้านเพ - เกาะเสม็ด (ท่าเรือนาดาน)",
                "type": "boat",
                "operator": "เรือโดยสารบ้านเพ",
                "from": "ระยอง (ท่าเรือบ้านเพ)",
                "to": "เกาะเสม็ด (ท่าเรือนาดาน)",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "09:00",
                    "12:00",
                    "15:00",
                    "18:00"
                ],
                "duration": "40-60 นาที",
                "baseFare": 100,
                "frequency": "วันละหลายรอบ",
                "terminal": "ท่าเรือบ้านเพ",
                "notes": "เรืออาจงด/ล่าช้าเมื่อคลื่นลมแรง โดยเฉพาะช่วงมรสุม"
            }
        ],
        "localFoods": [
            {
                "name": "แกงเผ็ดหน่อสับปะรด",
                "priceRange": "80-180฿",
                "category": "local",
                "note": "เมนูท้องถิ่นภาคตะวันออกที่พบได้ในระยอง"
            },
            {
                "name": "ทุเรียน/ผลไม้ระยอง (ตามฤดูกาล)",
                "priceRange": "80-300฿",
                "category": "dessert",
                "note": "ระยองขึ้นชื่อเรื่องผลไม้ โดยเฉพาะฤดูผลไม้"
            },
            {
                "name": "ทุเรียนทอด",
                "priceRange": "80-200฿",
                "category": "street",
                "note": "ของฝากยอดนิยมของระยอง"
            },
            {
                "name": "ปลาหมึกตากแห้ง/หมึกรอบ (บ้านเพ)",
                "priceRange": "120-350฿",
                "category": "street",
                "note": "ของฝากสายทะเล หาซื้อได้ตามร้านของฝากและท่าเรือ"
            },
            {
                "name": "ซีฟู้ดหาดแม่รำพึง/แหลมแม่พิมพ์",
                "priceRange": "200-700฿",
                "category": "local",
                "note": "อาหารทะเลสด ราคาแปรผันตามฤดูกาล"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "600-1,200฿/คืน",
                "examples": [
                    "HOP INN Rayong",
                    "B2 Rayong Boutique & Budget Hotel",
                    "HOP INN Rayong Sukhumvit Road"
                ],
                "bookingUrl": "https://www.agoda.com/region/rayong-province-th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,200-3,500฿/คืน",
                "examples": [
                    "Holiday Inn & Suites Rayong City Centre",
                    "Novotel Rayong Star Convention Centre",
                    "Kameo Grand Hotel & Serviced Apartments Rayong"
                ],
                "bookingUrl": "https://www.agoda.com/region/rayong-province-th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "3,500-18,000฿/คืน",
                "examples": [
                    "Rayong Marriott Resort & Spa",
                    "Paradee (Koh Samet)",
                    "Novotel Rayong Rim Pae Resort"
                ],
                "bookingUrl": "https://www.agoda.com/region/rayong-province-th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "คลื่นลมแรงกระทบการเดินเรือไปเกาะเสม็ด",
                "severity": "medium",
                "note": "ช่วงมรสุมอาจมีการงดเรือหรือเดินเรือช้าลง ควรวางแผนเผื่อเวลา",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "ถนนสายชายฝั่ง/รถบรรทุกในโซนอุตสาหกรรม",
                "severity": "medium",
                "note": "บางช่วงมีรถหนักและรถบรรทุกมาก ขับขี่กลางคืนควรระวัง",
                "season": null
            },
            {
                "label": "แมงกะพรุนและสัตว์ทะเลมีพิษ (บางฤดูกาล)",
                "severity": "low",
                "note": "พบได้เป็นช่วง ๆ โดยเฉพาะหลังฝน/ทะเลปั่นป่วน ควรสังเกตป้ายเตือนชายหาด",
                "season": "พ.ค.-ต.ค."
            }
        ],
        "ecoIds": [
                "fl_durian",
                "fl_mangosteen",
                "f_hornbill",
                "f_long_tailed_macaque",
                "t_rainforest_watershed",
                "c_southwest_monsoon_rain",
                "h_flash_flood",
                "h_rough_sea"
        ],
        "newEcoEntities": [
                { id: "fl_durian", name: "ทุเรียน", category: "flora", tags: ["common","edible","seasonal"], desc: "ระยองเป็นหนึ่งในพื้นที่สวนผลไม้สำคัญของภาคตะวันออก ทุเรียนพบมากในโซนเชิงเขาและดินชุ่มชื้น" },
                { id: "fl_mangosteen", name: "มังคุด", category: "flora", tags: ["common","edible","seasonal"], desc: "มังคุดเป็นพืชเศรษฐกิจเด่นของระยอง พบคู่กับสวนทุเรียนในพื้นที่ฝนชุกของจังหวัด" },
                { id: "f_hornbill", name: "นกเงือก", category: "fauna", tags: ["common","rare","protected"], desc: "นกเงือกพบในผืนป่าที่สมบูรณ์ของระยอง เป็นตัวชี้วัดความต่อเนื่องของป่าดิบชื้น" },
                { id: "f_long_tailed_macaque", name: "ลิงแสม", category: "fauna", tags: ["common","danger","protected"], desc: "พบได้ตามป่าชายเลนและบางจุดชายฝั่ง ไม่ควรถืออาหารล่อหรือเข้าใกล้ฝูง" },
                { id: "t_rainforest_watershed", name: "ป่าดิบชื้นต้นน้ำ", category: "terrain", tags: ["common"], desc: "พื้นที่ป่าฝนสมบูรณ์เป็นแหล่งต้นน้ำสำคัญของระยอง และเป็นแกนหลักของความหลากหลายทางชีวภาพ" },
                { id: "c_southwest_monsoon_rain", name: "ฝนชุกจากมรสุมตะวันตกเฉียงใต้", category: "climate", tags: ["common","danger","seasonal"], desc: "ระยองรับอิทธิพลฝนจากมรสุมชัดเจน ทำให้พื้นที่เชิงเขาและสวนผลไม้มีความชื้นสูงในฤดูฝน" },
                { id: "h_flash_flood", name: "น้ำป่าไหลหลาก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "เมื่อฝนตกหนักต่อเนื่อง พื้นที่น้ำตกและลำห้วยเชิงเขามีความเสี่ยงน้ำหลากฉับพลัน" },
                { id: "h_rough_sea", name: "คลื่นลมแรงชายฝั่ง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ทะเลระยองมีช่วงคลื่นลมแรงและฝนฟ้าคะนอง ทำให้กิจกรรมเรือเล็กและเล่นน้ำมีความเสี่ยงมากขึ้น" }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 24-34°C, ร้อนชื้น ฝนช่วงพ.ค.-ต.ค. ทะเลมีลมมรสุมบางช่วง",
            "terrain": "จังหวัดชายฝั่งทะเล มีชายหาด เกาะใกล้ฝั่ง และพื้นที่ป่าชายเลน (เช่นปากน้ำประแส)",
            "bestSeason": "พ.ย.-เม.ย.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "ฤดูท่องเที่ยวพีค",
                "content": "ช่วงพฤศจิกายนถึงกุมภาพันธ์ เป็นช่วงปลอดฝน อุณหภูมิเย็นสบาย เหมาะกับการเที่ยวชายหาดและชมสวนผลไม้",
                "type": "season"
            },
            {
                "title": "ฤดูฝนค่อนไปทางไฮซีซัน",
                "content": "ตุลาคม-พฤศจิกายนทะเลคลื่นแรง ต้องระวังการเดินเรือ ขณะที่ช่วงพฤษภาคมถึงกันยายนฝนตกชุกกว่า",
                "type": "season"
            },
            {
                "title": "ราคาโรงแรมถูกลงช่วงโลว์ซีซัน",
                "content": "ในช่วงหน้าฝน (มิ.ย.-ก.ย.) นักท่องเที่ยวลดลง ทำให้ราคาที่พักและทัวร์ลดลงตาม",
                "type": "budget"
            },
            {
                "title": "ผลไม้ขึ้นชื่อ",
                "content": "ระยองมีชื่อเสียงด้านผลไม้ โดยเฉพาะส้มโอ สับปะรด และลองกอง เป็นผลไม้ดังในช่วงฤดูฝน",
                "type": "food"
            },
            {
                "title": "สนามบินอู่ตะเภา-ระยอง",
                "content": "สนามบินอู่ตะเภาเปิดให้บริการเที่ยวบินภายในประเทศ ช่วยให้ง่ายต่อการเดินทางเข้าถึงระยอง",
                "type": "route"
            },
            {
                "title": "เตรียมยากันยุง",
                "content": "พื้นที่สวนผลไม้และชายหาดบางแห่งมีแมลงกัดในช่วงหน้าฝน ควรเตรียมยากันยุงไปด้วย",
                "type": "safety"
            },
            {
                "title": "สถานที่เที่ยวเด่น",
                "content": "หาดแม่รำพึงและเกาะเสม็ด (จากบ้านเพ) เป็นชายหาดยอดนิยมของระยอง ควรวางแผนการเดินทางล่วงหน้าในวันหยุดสุดสัปดาห์",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ (สาขาระยอง)",
                "area": "ตัวเมืองระยอง",
                "note": "บริการธนาคารและ ATM",
                "openHours": "09:00-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. บ้านฉาง",
                "area": "อำเภอบ้านฉาง",
                "note": "บริการ 24 ชั่วโมง",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ ท่าเรือบ้านเพ",
                "area": "บ้านเพ (เกาะเสม็ด)",
                "note": "ห้องน้ำชายหาด",
                "openHours": "06:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยา เครือข่ายซี.พี. เฮลท์แคร์",
                "area": "อำเภอเมืองระยอง",
                "note": "ยารักษาโรคทั่วไป",
                "openHours": "08:00-21:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลระยอง",
                "area": "อำเภอเมืองระยอง",
                "note": "โรงพยาบาลทั่วไปหลักของจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรบ้านเพ",
                "area": "อำเภอเมืองระยอง",
                "note": "ใกล้ท่าเรือข้ามเกาะเสม็ด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "PTT EV Charger (บ้านฉาง)",
                "area": "ริมถนนสุขุมวิท บ้านฉาง",
                "note": "สถานีชาร์จรถไฟฟ้า",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ศูนย์บริการนักท่องเที่ยว ระยอง",
                "area": "แยกสามกอง, ตัวเมือง",
                "note": "ข้อมูลการท่องเที่ยวจังหวัด",
                "openHours": "08:30-17:30",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพฯ",
                "พัทยา",
                "ชลบุรี"
            ],
            "commonDestinations": [
                "หาดแม่รำพึง",
                "เกาะเสม็ด",
                "สวนผลไม้มาบตาพุด",
                "วัดบ้านเพ",
                "ศูนย์วิจัยทรัพยากรอ่าวไทย"
            ],
            "transitHubs": [
                "สนามบินอู่ตะเภา",
                "สถานีขนส่งระยอง",
                "ท่าเรือบ้านเพ (เรือเฟอร์รี่เกาะเสม็ด)"
            ],
            "routeNotes": [
                "ทางหลวงหมายเลข 3 (สุขุมวิท) เชื่อมต่อระยอง-กรุงเทพฯ",
                "หลวงหมายเลข 344 (มาบตาพุด–ชลบุรี) สามารถเลี่ยงเมืองได้",
                "บ้านเพเป็นจุดข้ามไปเกาะเสม็ด",
                "เส้นทางขึ้นดอย (เข้าภูเขา) มีบางช่วงคดเคี้ยวสูง"
            ]
        }
    },
    "Chanthaburi": {
        "transport": [
            {
                "name": "รถสองแถวเมืองจันทบุรี",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "ใช้เดินทางในตัวเมืองและไปอำเภอต่าง ๆ เส้นทางและรอบขึ้นกับคิวรถ",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถตู้/มินิบัสกรุงเทพฯ-จันทบุรี",
                "shortName": "รถตู้",
                "type": "van",
                "description": "เดินทางจากกรุงเทพฯถึงตัวเมืองจันทบุรี ใช้เวลาราว 3.5-4.5 ชม.",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#38bdf8"
            },
            {
                "name": "รถจักรยานยนต์รับจ้าง",
                "shortName": "วินมอเตอร์ไซค์",
                "type": "bike",
                "description": "เหมาะกับระยะสั้นในเมืองและเชื่อมต่อจุดท่องเที่ยว",
                "warpUrl": "",
                "logoText": "🛵",
                "color": "#a855f7"
            },
            {
                "name": "รถรับจ้างเหมาคัน/แท็กซี่ท้องถิ่น",
                "shortName": "เหมารถ",
                "type": "other",
                "description": "เหมาะกับการไปแหล่งท่องเที่ยวกระจายตัว เช่น หาดเจ้าหลาว/เขาคิชฌกูฏ",
                "warpUrl": "",
                "logoText": "🚗",
                "color": "#64748b"
            },
            {
                "name": "รถสองแถว/รถกระบะรับส่งเขาคิชฌกูฏ (ตามฤดูกาล)",
                "shortName": "รถขึ้นเขา",
                "type": "other",
                "description": "ช่วงเปิดเขาคิชฌกูฏจะมีระบบรถรับส่งเฉพาะกิจตามจุดขึ้นเขา",
                "warpUrl": "",
                "logoText": "🚗",
                "color": "#64748b"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ (เอกมัย) - จันทบุรี (ขนส่ง/ตัวเมือง)",
                "type": "coach",
                "operator": "บขส./ผู้ประกอบการเอกชน",
                "from": "กรุงเทพฯ (สถานีขนส่งเอกมัย)",
                "to": "จันทบุรี (ขนส่ง/ตัวเมือง)",
                "via": [
                    "สมุทรปราการ",
                    "ชลบุรี",
                    "ระยอง"
                ],
                "departureTimes": [
                    "06:00",
                    "09:00",
                    "13:00",
                    "18:00"
                ],
                "duration": "3.5-4.5 ชม.",
                "baseFare": 260,
                "frequency": "ทุก 1-2 ชม. (โดยประมาณ)",
                "terminal": "สถานีขนส่งเอกมัย",
                "notes": "เวลา/ราคาแตกต่างตามบริษัทและช่วงเทศกาล"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - จันทบุรี (รถตู้)",
                "type": "van",
                "operator": "รถตู้สายเอกมัย-จันทบุรี",
                "from": "กรุงเทพฯ (เอกมัย)",
                "to": "จันทบุรี (ตัวเมือง)",
                "via": [
                    "ชลบุรี",
                    "ระยอง"
                ],
                "departureTimes": [
                    "07:00",
                    "10:00",
                    "14:00",
                    "17:00"
                ],
                "duration": "3.5-5 ชม.",
                "baseFare": 280,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งเอกมัย",
                "notes": "บางเที่ยวจอดรับ-ส่งระหว่างทาง"
            },
            {
                "name": "สาย 3: เมืองจันทบุรี - หาดเจ้าหลาว",
                "type": "bus",
                "operator": "รถสองแถว/รถตู้ท้องถิ่น",
                "from": "จันทบุรี (ตัวเมือง)",
                "to": "หาดเจ้าหลาว",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "12:00",
                    "15:00"
                ],
                "duration": "45-90 นาที",
                "baseFare": 60,
                "frequency": "วันละหลายเที่ยว (ขึ้นกับฤดูกาล)",
                "terminal": "คิวรถในตัวเมืองจันทบุรี",
                "notes": "ควรถามคิวรถเรื่องเส้นทางและรอบล่าสุด"
            },
            {
                "name": "สาย 4: เมืองจันทบุรี - จุดขึ้นเขาคิชฌกูฏ",
                "type": "van",
                "operator": "รถรับส่ง/เหมารถ",
                "from": "จันทบุรี (ตัวเมือง)",
                "to": "เขาคิชฌกูฏ",
                "via": [],
                "departureTimes": [
                    "05:00",
                    "08:00",
                    "13:00"
                ],
                "duration": "1-2 ชม.",
                "baseFare": 100,
                "frequency": "ช่วงเปิดเขาเท่านั้น",
                "terminal": "จุดบริการตามประกาศของพื้นที่",
                "notes": "เป็นเส้นทางตามฤดูกาล ต้องเช็ควันเปิด-ปิดเขาและจุดขึ้นรถ"
            }
        ],
        "localFoods": [
            {
                "name": "แกงหมูชะมวง",
                "priceRange": "80-180฿",
                "category": "local",
                "note": "เมนูเอกลักษณ์ของภาคตะวันออก พบได้บ่อยในจันทบุรี"
            },
            {
                "name": "เส้นจันท์ผัดปู",
                "priceRange": "90-220฿",
                "category": "local",
                "note": "ใช้เส้นจันท์ (เส้นเล็กท้องถิ่น) ผัดกับเนื้อปู"
            },
            {
                "name": "ส้มตำทุเรียน",
                "priceRange": "70-150฿",
                "category": "street",
                "note": "เมนูผลไม้ประจำฤดูของจันทบุรี"
            },
            {
                "name": "ยำมังคุด",
                "priceRange": "70-160฿",
                "category": "street",
                "note": "นิยมทำช่วงฤดูมังคุด"
            },
            {
                "name": "ขนมควยลิง (ชุมชนหนองบัว)",
                "priceRange": "20-60฿",
                "category": "dessert",
                "note": "ของหวานพื้นถิ่นที่เป็นเสน่ห์ของจันทบุรี"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "700-1,400฿/คืน",
                "examples": [
                    "HOP INN Chanthaburi",
                    "Kasemsarn Hotel Chanthaburi",
                    "K.P. Grand Hotel Chanthaburi"
                ],
                "bookingUrl": "https://www.agoda.com/region/chanthaburi-province-th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,200-3,500฿/คืน",
                "examples": [
                    "Blu Monkey Hub & Hotel Chanthaburi",
                    "Riverawan Hotel",
                    "Sand Dunes Chaolao Beach Resort"
                ],
                "bookingUrl": "https://www.agoda.com/region/chanthaburi-province-th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "3,500-12,000฿/คืน",
                "examples": [
                    "Maneechan Resort",
                    "Chatrium Golf Resort Soi Dao Chanthaburi",
                    "Sand Dunes Chaolao Beach Resort"
                ],
                "bookingUrl": "https://www.agoda.com/region/chanthaburi-province-th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ฝนตกหนักและน้ำป่าในพื้นที่ภูเขา/น้ำตก",
                "severity": "medium",
                "note": "ช่วงฝนหนักอาจเกิดน้ำหลากฉับพลันในลำห้วยและน้ำตก ควรเช็คประกาศอุทยานก่อนเข้า",
                "season": "ก.ย.-ต.ค."
            },
            {
                "label": "ถนนภูเขาและทางโค้งไปจุดชมวิว/วัด",
                "severity": "medium",
                "note": "บางเส้นทางชันและโค้งต่อเนื่อง ขับกลางคืนควรระวัง",
                "season": null
            },
            {
                "label": "สัตว์ป่า/งูในเส้นทางเดินป่า",
                "severity": "low",
                "note": "พบได้ในพื้นที่ธรรมชาติ ควรใส่รองเท้าหุ้มส้นและไม่เดินล้ำทาง",
                "season": "พ.ค.-ต.ค."
            }
        ],
        "ecoIds": [
                "fl_durian",
                "fl_mangosteen",
                "f_hornbill",
                "f_stream_fish",
                "t_fruit_mountain_foothill",
                "c_high_rainfall",
                "h_flash_flood",
                "h_landslide"
        ],
        "newEcoEntities": [
                { id: "fl_durian", name: "ทุเรียน", category: "flora", tags: ["common","edible","seasonal"], desc: "จันทบุรีเป็นฐานผลิตทุเรียนสำคัญของประเทศ สวนผลไม้กระจายกว้างในพื้นที่ฝนดีและดินอุดมสมบูรณ์" },
                { id: "fl_mangosteen", name: "มังคุด", category: "flora", tags: ["common","edible","seasonal"], desc: "มังคุดเป็นผลไม้เด่นอีกชนิดของจันทบุรี พบมากในสวนผสมกับทุเรียนและลองกอง" },
                { id: "f_hornbill", name: "นกเงือก", category: "fauna", tags: ["common","rare","protected"], desc: "ป่าที่สมบูรณ์ของจันทบุรีรองรับนกเงือกและสัตว์ป่าป่าดิบหลายชนิด เป็นตัวแทนความสมบูรณ์ของผืนป่า" },
                { id: "f_stream_fish", name: "ปลาน้ำตกพลิ้ว", category: "fauna", tags: ["common"], desc: "ลำธารใสในเขตน้ำตกพลิ้วมีปลาน้ำจืดจำนวนมาก เป็นภาพจำของระบบนิเวศน้ำไหลในจังหวัด" },
                { id: "t_fruit_mountain_foothill", name: "สวนผลไม้เชิงเขาและป่าต้นน้ำ", category: "terrain", tags: ["common"], desc: "จันทบุรีมีลักษณะเด่นเป็นภูเขาชื้น ป่าต้นน้ำ และสวนผลไม้หนาแน่นในพื้นที่เชิงเขา" },
                { id: "c_high_rainfall", name: "ฝนชุกและความชื้นสูง", category: "climate", tags: ["common","danger","seasonal"], desc: "จังหวัดนี้รับฝนมากกว่าหลายพื้นที่ในภาคตะวันออก ทำให้ป่าชื้นและสวนผลไม้เติบโตดี แต่เพิ่มความเสี่ยงน้ำหลาก" },
                { id: "h_flash_flood", name: "น้ำป่าไหลหลาก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ฝนหนักในพื้นที่ภูเขาทำให้ลำธารและน้ำตกมีโอกาสเกิดน้ำหลากฉับพลัน" },
                { id: "h_landslide", name: "ดินถล่มเชิงเขา", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "พื้นที่ลาดชันและฝนสะสมสูงทำให้บางจุดเสี่ยงดินไหลหรือดินถล่ม โดยเฉพาะถนนภูเขาและสวนเชิงเขา" }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 23-33°C, ฝนค่อนข้างมากช่วงพ.ค.-ต.ค. ปลายฝนอาจมีฝนหนักเป็นระยะ",
            "terrain": "มีทั้งชายฝั่งทะเลและแนวภูเขา/ป่าธรรมชาติ เหมาะกับท่องเที่ยวเชิงธรรมชาติและผลไม้",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เมืองผลไม้",
                "content": "จันทบุรีมีชื่อเสียงเรื่องผลไม้ โดยเฉพาะทุเรียน มังคุด และเงาะ ที่ออกผลช่วงฤดูฝน (มิ.ย.-ส.ค.)",
                "type": "food"
            },
            {
                "title": "ชมโบสถ์หลวง",
                "content": "โบสถ์มหาวิหารพระแม่มารี อาสนวิหารพระนางมารีอาปฏิสนธินิรมล เป็นสถาปัตยกรรมกอธิคที่สวยงาม ควรแวะชมเมื่อมาเยือนเมือง",
                "type": "culture"
            },
            {
                "title": "วัดปากน้ำแขมหนู",
                "content": "วัดปากน้ำแขมหนู (วัดราษฎร์เจริญ) วัดสีน้ำเงินโดดเด่นใกล้ปากแม่น้ำจันทบุรี เป็นจุดถ่ายภาพยอดนิยม",
                "type": "culture"
            },
            {
                "title": "ตลาดพลอยจันทบุรี",
                "content": "ตลาดพลอยและเครื่องประดับบริเวณสะพานสารสิน เป็นแหล่งซื้อขายพลอยและโบราณวัตถุท้องถิ่น",
                "type": "budget"
            },
            {
                "title": "น้ำตกพลิ้ว",
                "content": "น้ำตกพลิ้วในอุทยานแห่งชาติแก่งหางแมว เหมาะเยี่ยมในหน้าฝน (ก.ค.-ต.ค.) น้ำตกจะสวยงามและไหลแรง",
                "type": "season"
            },
            {
                "title": "น้ำทะเลสีคราม",
                "content": "หาดคุ้งวิมานและหาดเจ้าหาวระวังคลื่นแรงในหน้ามรสุม (ก.ค.-ต.ค.) ควรเช็คสภาพอากาศก่อนว่ายน้ำ",
                "type": "safety"
            },
            {
                "title": "การเดินทางหลัก",
                "content": "ใช้ถนนสุขุมวิท (ทางหลวงหมายเลข 3) ผ่านชลบุรีและระยอง มุ่งหน้าสู่จันทบุรี โดยหลีกเลี่ยงช่วงน้ำท่วมในฤดูฝน",
                "type": "route"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ (จันทบุรี)",
                "area": "ตัวเมืองจันทบุรี",
                "note": "บริการฝาก-ถอน และ ATM",
                "openHours": "09:00-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. ถนนสุขุมวิท",
                "area": "เขตเทศบาลนครจันทบุรี",
                "note": "เปิดบริการ 24 ชั่วโมง",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ ศาลสมเด็จพระเจ้าตาก",
                "area": "ตลาดล่าง",
                "note": "ใกล้วัดปากน้ำแขมหนู",
                "openHours": "06:00-21:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาแผนปัจจุบัน (จันทบุรี)",
                "area": "ตัวเมือง",
                "note": "บริการตลอดวัน",
                "openHours": "08:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลเจ้าพระยาอภัยภูเบศร",
                "area": "อำเภอเมืองจันทบุรี",
                "note": "โรงพยาบาลใหญ่ประจำจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรเมืองจันทบุรี",
                "area": "ตัวเมือง",
                "note": "สำนักงานตำรวจท่องเที่ยวใกล้เคียง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "PTT EV Charger (จันทบุรี)",
                "area": "สวนพระยาศรีสุนทรโวหาร",
                "note": "สถานีชาร์จรถยนต์ไฟฟ้า",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ศูนย์บริการนักท่องเที่ยว จันทบุรี",
                "area": "ใกล้ศาลากลางจังหวัด",
                "note": "ข้อมูลท่องเที่ยวและแผนที่",
                "openHours": "08:30-17:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพฯ",
                "ระยอง",
                "สัตหีบ"
            ],
            "commonDestinations": [
                "อาสนวิหารคาทอลิก",
                "น้ำตกพลิ้ว",
                "หาดเจ้าหาว",
                "เกาะเปริด",
                "ตลาดพลอย"
            ],
            "transitHubs": [
                "สถานีรถไฟมาบกะเบา (จันทบุรี)",
                "สถานีขนส่งผู้โดยสารจันทบุรี"
            ],
            "routeNotes": [
                "ใช้ถนนสุขุมวิทผ่านชลบุรี-ระยองเข้าสู่จันทบุรี",
                "หลีกเลี่ยงถนนลัดผ่านป่าเพราะบางช่วงอุทกภัย",
                "ถนนหมายเลข 3 ช่วงซับไม้แดงควรระวังการจราจรหนาแน่น",
                "ถนนภายในตัวเมืองจันทบุรีถูกปรับปรุงใหม่หลายเส้นทาง"
            ]
        }
    },
    "Trat": {
        "transport": [
            {
                "name": "สนามบินตราด (Bangkok Airways)",
                "shortName": "สนามบิน",
                "type": "plane",
                "description": "สนามบินหลักของจังหวัด รองรับเที่ยวบินเชิงพาณิชย์ไป-กลับกรุงเทพฯ",
                "warpUrl": "https://www.bangkokair.com/boutique-airports/trat-airport",
                "logoText": "✈️",
                "color": "#6366f1"
            },
            {
                "name": "รถตู้/มินิบัสกรุงเทพฯ-ตราด",
                "shortName": "รถตู้",
                "type": "van",
                "description": "เดินทางจากกรุงเทพฯมายังตัวเมืองตราดและท่าเรือไปเกาะช้าง/เกาะกูด",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#38bdf8"
            },
            {
                "name": "รถสองแถว/รถรับจ้างบนเกาะช้าง",
                "shortName": "สองแถวเกาะ",
                "type": "songthaew",
                "description": "พาหนะหลักบนเกาะช้าง วิ่งตามถนนเลียบชายหาดและจุดท่องเที่ยว",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "เรือเฟอร์รี่ตราด-เกาะช้าง",
                "shortName": "เฟอร์รี่",
                "type": "boat",
                "description": "ข้ามฝั่งจากท่าเรือในอ.แหลมงอบไปเกาะช้าง ใช้เวลาสั้น",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#14b8a6"
            },
            {
                "name": "เรือไปเกาะกูด/เกาะหมาก",
                "shortName": "เรือเกาะกูด",
                "type": "boat",
                "description": "มีหลายบริษัทให้บริการจากท่าเรือแหลมศอก/ใกล้เคียง ตารางขึ้นกับฤดูกาล",
                "warpUrl": "https://boonsiriferry.com/en",
                "logoText": "⛴️",
                "color": "#14b8a6"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ (เอกมัย) - ตราด (ตัวเมือง/ขนส่ง)",
                "type": "coach",
                "operator": "บขส./ผู้ประกอบการเอกชน",
                "from": "กรุงเทพฯ (เอกมัย)",
                "to": "ตราด (ตัวเมือง/ขนส่ง)",
                "via": [
                    "ชลบุรี",
                    "ระยอง",
                    "จันทบุรี"
                ],
                "departureTimes": [
                    "06:00",
                    "09:00",
                    "13:00",
                    "23:00"
                ],
                "duration": "5-6 ชม.",
                "baseFare": 320,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งเอกมัย",
                "notes": "บางเที่ยวต่อปลายทางไปท่าเรือ (เช็คก่อนซื้อ)"
            },
            {
                "name": "สาย 2: กรุงเทพฯ (สุวรรณภูมิ) - สนามบินตราด",
                "type": "plane",
                "operator": "Bangkok Airways",
                "from": "กรุงเทพฯ (สนามบินสุวรรณภูมิ)",
                "to": "ตราด (สนามบินตราด)",
                "via": [],
                "departureTimes": [
                    "08:30",
                    "17:00"
                ],
                "duration": "1 ชม.",
                "baseFare": 2500,
                "frequency": "1-2 เที่ยว/วัน (โดยประมาณ)",
                "terminal": "สนามบินสุวรรณภูมิ",
                "notes": "เวลาและราคาเปลี่ยนตามฤดูกาลและวันเดินทาง ให้ยืนยันในระบบจอง"
            },
            {
                "name": "สาย 3: ตราด (แหลมงอบ/ท่าเรืออ่าวธรรมชาติ) - เกาะช้าง",
                "type": "boat",
                "operator": "เรือเฟอร์รี่เกาะช้าง",
                "from": "ตราด (ท่าเรืออ่าวธรรมชาติ/แหลมงอบ)",
                "to": "เกาะช้าง",
                "via": [],
                "departureTimes": [
                    "06:30",
                    "09:00",
                    "12:00",
                    "15:00",
                    "18:00"
                ],
                "duration": "30-45 นาที",
                "baseFare": 80,
                "frequency": "ออกถี่ช่วงกลางวัน",
                "terminal": "ท่าเรือฝั่งตราด",
                "notes": "ตารางอาจเปลี่ยนตามสภาพอากาศและฤดูกาลท่องเที่ยว"
            },
            {
                "name": "สาย 4: กรุงเทพฯ - เกาะกูด (รถ+เรือของ Boonsiri)",
                "type": "boat",
                "operator": "Boonsiri Ferry",
                "from": "กรุงเทพฯ (จุดขึ้นรถของบริษัท)",
                "to": "เกาะกูด",
                "via": [
                    "ชลบุรี",
                    "ระยอง",
                    "จันทบุรี",
                    "ตราด"
                ],
                "departureTimes": [
                    "05:00",
                    "08:00"
                ],
                "duration": "7-9 ชม.",
                "baseFare": 1100,
                "frequency": "วันละ 2 เที่ยว (โดยทั่วไป)",
                "terminal": "จุดขึ้นรถของ Boonsiri ในกรุงเทพฯ",
                "notes": "เป็นแพ็กเกจต่อรถ-เรือ ตารางอาจปรับตามฤดูกาลและคลื่นลม"
            }
        ],
        "localFoods": [
            {
                "name": "หมูต้มชะมวง",
                "priceRange": "90-200฿",
                "category": "local",
                "note": "เมนูขึ้นชื่อของตราด/ภาคตะวันออก"
            },
            {
                "name": "สับปะรดตราดสีทอง",
                "priceRange": "30-80฿",
                "category": "dessert",
                "note": "ผลไม้/GI ของจังหวัดตราด เนื้อสีเหลืองทองหวานกรอบ"
            },
            {
                "name": "ข้าวเกรียบยาหน้า (ชุมชนบ้านน้ำเชี่ยว)",
                "priceRange": "20-80฿",
                "category": "street",
                "note": "ของว่างพื้นถิ่นชื่อดัง"
            },
            {
                "name": "หอยนางรมตราด (แพเลี้ยงหอยกลางทะเล)",
                "priceRange": "150-400฿",
                "category": "local",
                "note": "นิยมทานสดจากฟาร์ม/ล่องแพ"
            },
            {
                "name": "แกงส้มใบสันดาน",
                "priceRange": "80-180฿",
                "category": "local",
                "note": "เมนูพื้นบ้านของบางชุมชนในตราด"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "700-1,500฿/คืน",
                "examples": [
                    "Trat City Hotel",
                    "Orchid Guesthouse Trat",
                    "Baanrimnam Resort Trat"
                ],
                "bookingUrl": "https://www.agoda.com/region/trat-province-th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,500-4,500฿/คืน",
                "examples": [
                    "Koh Chang Paradise Resort & Spa",
                    "Awa Resort Koh Chang",
                    "The Splash Koh Chang"
                ],
                "bookingUrl": "https://www.agoda.com/region/trat-province-th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "4,500-30,000฿/คืน",
                "examples": [
                    "KC Grande Resort Koh Chang",
                    "Soneva Kiri (Koh Kood)",
                    "High Season Pool Villa & Spa (Koh Kood)"
                ],
                "bookingUrl": "https://www.agoda.com/region/trat-province-th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "คลื่นลมแรงกระทบเรือไปเกาะช้าง/เกาะกูด",
                "severity": "high",
                "note": "หากคลื่นลมแรงอาจงดเรือหรือเลื่อนเวลา ควรมีแผนสำรอง",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "ถนนภูเขาและโค้งชันบนเกาะช้าง",
                "severity": "medium",
                "note": "บางช่วงถนนชันและโค้งต่อเนื่อง โดยเฉพาะฝนตกถนนลื่น",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "แมงกะพรุนและสัตว์ทะเลมีพิษ",
                "severity": "medium",
                "note": "พบได้เป็นช่วง ๆ ควรสังเกตป้ายเตือนชายหาดและหลีกเลี่ยงเล่นน้ำตอนมีการแจ้งเตือน",
                "season": "พ.ค.-ต.ค."
            }
        ],
        "ecoIds": [
                "fl_mangrove_rhizophora",
                "fl_seagrass",
                "f_white_bellied_sea_eagle",
                "f_long_tailed_macaque",
                "t_archipelago_coral",
                "c_monsoon_sea",
                "h_rough_sea",
                "h_landslide_island"
        ],
        "newEcoEntities": [
                { id: "fl_mangrove_rhizophora", name: "โกงกาง", category: "flora", tags: ["common"], desc: "ตราดมีแนวป่าชายเลนกว้างหลายจุด ทำหน้าที่เป็นแหล่งอนุบาลสัตว์น้ำและกันคลื่นชายฝั่ง" },
                { id: "fl_seagrass", name: "หญ้าทะเล", category: "flora", tags: ["common","rare"], desc: "แปลงหญ้าทะเลพบในน่านน้ำตื้นบางส่วนของตราด เป็นฐานอาหารและที่หลบภัยของสัตว์น้ำทะเลวัยอ่อน" },
                { id: "f_white_bellied_sea_eagle", name: "อินทรีทะเลท้องขาว", category: "fauna", tags: ["common","rare","protected"], desc: "นกล่าเหยื่อชายฝั่งที่พบได้ในเขตทะเลและเกาะของตราด เป็นดัชนีความสมบูรณ์ของระบบนิเวศชายฝั่ง" },
                { id: "f_long_tailed_macaque", name: "ลิงแสม", category: "fauna", tags: ["common","danger","protected"], desc: "พบตามชายฝั่งและบางเกาะ ไม่ควรให้อาหารหรือเข้าใกล้ เพราะลิงอาจแย่งของและกัดได้" },
                { id: "t_archipelago_coral", name: "หมู่เกาะ ปะการัง และชายฝั่งทะเล", category: "terrain", tags: ["common"], desc: "ตราดเด่นด้วยหมู่เกาะจำนวนมาก แนวปะการัง และอ่าวน้ำตื้นสลับกับป่าชายเลนแผ่นดินใหญ่" },
                { id: "c_monsoon_sea", name: "มรสุมทะเลและฝนชุกชายฝั่ง", category: "climate", tags: ["common","danger","seasonal"], desc: "ช่วงมรสุมตะวันตกเฉียงใต้ ทะเลฝั่งตราดโดยเฉพาะด้านรับลมของเกาะจะมีคลื่นแรงและฝนตกชุก" },
                { id: "h_rough_sea", name: "คลื่นลมแรงและเรือเล็กเสี่ยง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ช่วงทะเลแรงอาจมีผลต่อเรือเล็ก ดำน้ำ และการเดินทางข้ามเกาะ ควรเช็กประกาศอากาศก่อนเดินทาง" },
                { id: "h_landslide_island", name: "ดินถล่มและน้ำหลากบนเกาะภูเขา", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "เกาะภูเขาของตราดมีความเสี่ยงน้ำหลากและดินไหลเมื่อฝนตกหนักต่อเนื่องบนพื้นที่ลาดชัน" }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 23-33°C, ชื้น ฝนมากช่วงพ.ค.-ต.ค. และทะเลมีมรสุม",
            "terrain": "มีชายฝั่ง ท่าเรือ และหมู่เกาะจำนวนมาก (เกาะช้าง/เกาะกูด/เกาะหมาก) พร้อมป่าชายเลน",
            "bestSeason": "พ.ย.-เม.ย.",
            "emergencyContacts": [
                {
                    "label": "Bangkok Airways (Trat Airport Office)",
                    "number": "+66 39 525 767"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "เกาะช้างท่องเที่ยว",
                "content": "เกาะช้างเป็นเกาะใหญ่ใกล้ชายฝั่งตราด มีน้ำตกและชายหาดสวยงาม เหมาะเที่ยวช่วง พ.ย.-ก.พ.",
                "type": "culture"
            },
            {
                "title": "ข้ามชายแดนกัมพูชา",
                "content": "มีด่านชายแดนบ้านหาดเล็ก-โป่งน้ำร้อน รับรองความปลอดภัย แต่ควรหลีกเลี่ยงการเดินทางในเวลากลางคืน",
                "type": "route"
            },
            {
                "title": "เทศกาลผลไม้ตราด",
                "content": "ตราดมีสวนผลไม้เช่นมังคุด ลองกอง ระหว่างมิ.ย.-ส.ค. จะมีเทศกาลชิมผลไม้",
                "type": "food"
            },
            {
                "title": "ปลอดภัยในการดำน้ำ",
                "content": "บริเวณเกาะหมาก เกาะกูด ควรระวังพื้นทะเลที่เป็นปะการังและหอยเม่น ไม่เหมาะกับการเดินเท้าเปล่า",
                "type": "safety"
            },
            {
                "title": "ระวังฟ้าผ่า",
                "content": "หน้าฝน (ก.ค.-ต.ค.) มีพายุฝนฟ้าคะนองแรง หลีกเลี่ยงเที่ยวเล่นน้ำทะเลในเวลากลางคืน",
                "type": "season"
            },
            {
                "title": "ทางหลวงหลัก",
                "content": "ทางหลวงหมายเลข 3 (สุขุมวิท) เป็นถนนหลักไปตราด จากนั้นใช้หมายเลข 344 (บายพาสระยอง) เพื่อเข้าสู่ตัวเมือง",
                "type": "route"
            },
            {
                "title": "เรือเฟอร์รี่",
                "content": "ควรจองล่วงหน้าสำหรับเรือเฟอร์รี่ไปเกาะช้างและเกาะหมาก โดยเฉพาะช่วงไฮซีซัน",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ (ตราด)",
                "area": "ตัวเมืองตราด",
                "note": "ฝาก-ถอน และ ATM",
                "openHours": "09:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. ถนนสุขุมวิท จ.ตราด",
                "area": "ตัวเมืองตราด",
                "note": "บริการ 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ แก่งหินดำ",
                "area": "อุทยานแห่งชาติเขาสามร้อยยอด (ตราด)",
                "note": "บริเวณลานจอดรถอุทยาน",
                "openHours": "08:00-18:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยา Blue Pharmacy (ตราด)",
                "area": "ตัวเมือง",
                "note": "มีเภสัชกรให้คำปรึกษา",
                "openHours": "08:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลตราด",
                "area": "ตัวเมืองตราด",
                "note": "โรงพยาบาลหลักของจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรเมืองตราด",
                "area": "ตัวเมืองตราด",
                "note": "คิวรถตู้และบริการท่องเที่ยวติดต่อได้",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "PTT EV Charger (ตราด)",
                "area": "บ้านฉาง กม.293",
                "note": "ชาร์จ EV",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ท่าเรือเฟอร์รี่เกาะช้าง",
                "area": "แหลมงอบ",
                "note": "จุดขึ้นเรือไปเกาะช้าง",
                "openHours": "06:00-20:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพฯ",
                "ระยอง",
                "จันทบุรี"
            ],
            "commonDestinations": [
                "เกาะช้าง",
                "เกาะหมาก",
                "ท่าเรือแหลมงอบ",
                "น้ำตกคลองพลู",
                "ตลาดโรงเกลือ (ตราด)"
            ],
            "transitHubs": [
                "ท่าเรือเฟอร์รี่เกาะช้าง (แหลมงอบ)",
                "สถานีขนส่งจังหวัดตราด",
                "ด่านตรวจคนเข้าเมืองเกาะช้าง"
            ],
            "routeNotes": [
                "ใช้ถนนสุขุมวิท (ทางหลวง 3) ผ่านจันทบุรีไปตราด",
                "บ้านหาดเล็กเป็นจุดข้ามแดนสู่กัมพูชา",
                "ถนนทางขึ้นเขาบริเวณแก่งหินดำคดเคี้ยวมาก",
                "ควรเผื่อเวลาเดินทางจากตัวเมืองไปเกาะช้า"
            ]
        }
    },
    "Sa Kaeo": {
        "transport": [
            {
                "name": "รถไฟสายตะวันออก กรุงเทพฯ-อรัญประเทศ (การรถไฟฯ)",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "ใช้เดินทางสู่สระแก้ว/อรัญประเทศแบบประหยัด เหมาะกับคนมีเวลา",
                "warpUrl": "https://www.railway.co.th/",
                "logoText": "🚆",
                "color": "#3b82f6"
            },
            {
                "name": "รถตู้กรุงเทพฯ-สระแก้ว/อรัญประเทศ",
                "shortName": "รถตู้",
                "type": "van",
                "description": "ตัวเลือกยอดนิยมจากกรุงเทพฯไปชายแดนคลองลึก ใช้เวลาราว 3-4 ชม.",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#38bdf8"
            },
            {
                "name": "รถโดยสาร/รถบัสกรุงเทพฯ-สระแก้ว",
                "shortName": "รถบัส",
                "type": "bus",
                "description": "มีทั้งรถ บขส. และเอกชน วิ่งเข้าสู่ตัวเมืองสระแก้วและอำเภอใกล้เคียง",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0ea5e9"
            },
            {
                "name": "รถสองแถวท้องถิ่น (ตัวเมือง/อรัญประเทศ)",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "ใช้ต่อรถในตัวเมืองและไปตลาดโรงเกลือ/ด่านคลองลึก",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถจักรยานยนต์รับจ้าง",
                "shortName": "วินมอเตอร์ไซค์",
                "type": "bike",
                "description": "เหมาะกับระยะสั้นในอำเภอเมืองและอรัญประเทศ",
                "warpUrl": "",
                "logoText": "🛵",
                "color": "#a855f7"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - สระแก้ว (รถตู้)",
                "type": "van",
                "operator": "รถตู้สายหมอชิต/อนุสาวรีย์ - สระแก้ว",
                "from": "กรุงเทพฯ",
                "to": "สระแก้ว (ตัวเมือง)",
                "via": [
                    "ฉะเชิงเทรา",
                    "ปราจีนบุรี"
                ],
                "departureTimes": [
                    "06:00",
                    "09:00",
                    "12:00",
                    "15:00"
                ],
                "duration": "3-4 ชม.",
                "baseFare": 220,
                "frequency": "ทุก 1-2 ชม. (โดยประมาณ)",
                "terminal": "จุดขึ้นรถในกรุงเทพฯ (ขึ้นกับผู้ให้บริการ)",
                "notes": "รอบและจุดขึ้นรถเปลี่ยนตามคิวรถ/บริษัท"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - อรัญประเทศ (คลองลึก)",
                "type": "van",
                "operator": "รถตู้สายกรุงเทพฯ-อรัญประเทศ",
                "from": "กรุงเทพฯ",
                "to": "สระแก้ว (อรัญประเทศ)",
                "via": [
                    "ฉะเชิงเทรา",
                    "ปราจีนบุรี"
                ],
                "departureTimes": [
                    "06:00",
                    "10:00",
                    "14:00",
                    "18:00"
                ],
                "duration": "3.5-4.5 ชม.",
                "baseFare": 260,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "จุดขึ้นรถในกรุงเทพฯ (ขึ้นกับผู้ให้บริการ)",
                "notes": "เหมาะไปตลาดโรงเกลือ/ด่านชายแดน"
            },
            {
                "name": "สาย 3: กรุงเทพฯ - อรัญประเทศ (รถไฟ)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย (SRT)",
                "from": "กรุงเทพฯ (สถานีกลาง/สถานีต้นทางสายตะวันออก)",
                "to": "สระแก้ว (อรัญประเทศ)",
                "via": [
                    "ฉะเชิงเทรา",
                    "ปราจีนบุรี"
                ],
                "departureTimes": [
                    "05:55",
                    "13:05"
                ],
                "duration": "5-6 ชม.",
                "baseFare": 50,
                "frequency": "วันละ 1-2 เที่ยว (โดยทั่วไป)",
                "terminal": "สถานีรถไฟต้นทางในกรุงเทพฯ",
                "notes": "เวลาเดินรถอาจเปลี่ยนตามการปรับตาราง ให้ตรวจสอบกับ SRT ก่อนออกเดินทาง"
            },
            {
                "name": "สาย 4: อรัญประเทศ - ตลาดโรงเกลือ/ด่านคลองลึก",
                "type": "bus",
                "operator": "รถสองแถว/มอเตอร์ไซค์รับจ้าง",
                "from": "สระแก้ว (อรัญประเทศ)",
                "to": "สระแก้ว (ตลาดโรงเกลือ/ด่านคลองลึก)",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "10:00",
                    "12:00",
                    "14:00",
                    "16:00"
                ],
                "duration": "10-30 นาที",
                "baseFare": 20,
                "frequency": "ออกถี่ตลอดวัน",
                "terminal": "คิวรถในอรัญประเทศ",
                "notes": "ควรระวังมิจฉาชีพและตกลงราคาให้ชัดเจน"
            }
        ],
        "localFoods": [
            {
                "name": "หมกหน่อไม้ทรงเครื่องสมุนไพร",
                "priceRange": "60-150฿",
                "category": "local",
                "note": "เมนูที่ถูกคัดเลือกเป็นอาหารถิ่นระดับจังหวัดในโครงการเชิดชูอาหารถิ่น"
            },
            {
                "name": "แหนมเนือง (อาหารเวียดนามอรัญประเทศ)",
                "priceRange": "120-250฿",
                "category": "local",
                "note": "อรัญประเทศมีชุมชนเวียดนาม ทำให้อาหารเวียดนามดัง"
            },
            {
                "name": "ปอเปี๊ยะทอด/ปอเปี๊ยะสด",
                "priceRange": "60-150฿",
                "category": "street",
                "note": "ร้านอาหารเวียดนามนิยมทำเป็นเมนูซิกเนเจอร์"
            },
            {
                "name": "ก๋วยจั๊บญวน",
                "priceRange": "50-120฿",
                "category": "street",
                "note": "ก๋วยจั๊บญวนแบบเวียดนามพบได้ในอรัญประเทศ"
            },
            {
                "name": "บั๊นกัน/ขนมเบื้องญวน (บั๋ญแซว)",
                "priceRange": "70-180฿",
                "category": "street",
                "note": "เมนูเวียดนามยอดนิยมในพื้นที่ชายแดน"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "600-1,200฿/คืน",
                "examples": [
                    "HOP INN Sa Kaeo",
                    "At Border Hotel",
                    "The VELO'S Hotel and Pumptrack"
                ],
                "bookingUrl": "https://www.agoda.com/region/sa-kaeo-province-th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,200-2,500฿/คืน",
                "examples": [
                    "Golden Crown Grand Hotel",
                    "The VELO'S Hotel and Pumptrack",
                    "La Villa Boutique Hotel"
                ],
                "bookingUrl": "https://www.agoda.com/region/sa-kaeo-province-th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2,500-6,000฿/คืน",
                "examples": [
                    "The VELO'S Hotel and Pumptrack",
                    "Golden Crown Grand Hotel",
                    "At Border Hotel"
                ],
                "bookingUrl": "https://www.agoda.com/region/sa-kaeo-province-th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ความเสี่ยงหลอกลวง/เอารัดเอาเปรียบในโซนชายแดนและตลาดโรงเกลือ",
                "severity": "high",
                "note": "การแลกเงิน/รถรับจ้าง/ทัวร์ข้ามแดนควรใช้ร้านและผู้ให้บริการที่เชื่อถือได้",
                "season": null
            },
            {
                "label": "อากาศร้อนจัดและแดดแรง",
                "severity": "medium",
                "note": "พื้นที่ค่อนข้างร้อนช่วงมี.ค.-พ.ค. เสี่ยงฮีตสโตรก ควรดื่มน้ำและหลบแดด",
                "season": "มี.ค.-พ.ค."
            },
            {
                "label": "สัตว์ป่าในพื้นที่อุทยาน (เช่น ช้างป่า)",
                "severity": "medium",
                "note": "หากเข้าพื้นที่ปางสีดา/ตาพระยา ควรทำตามคำแนะนำเจ้าหน้าที่และไม่เข้าใกล้สัตว์ป่า",
                "season": null
            }
        ],
        "ecoIds": [
                "fl_bamboo",
                "fl_cassava",
                "f_butterfly",
                "f_wild_elephant",
                "t_forest_border_mountain",
                "c_pm25_burning",
                "h_forest_fire",
                "h_elephant_conflict"
        ],
        "newEcoEntities": [
                { id: "fl_bamboo", name: "ไผ่ป่า", category: "flora", tags: ["common","edible"], desc: "ไผ่พบกว้างในป่าของสระแก้ว เป็นองค์ประกอบสำคัญของป่าผสมและเป็นแหล่งอาหารสัตว์หลายชนิด" },
                { id: "fl_cassava", name: "มันสำปะหลัง", category: "flora", tags: ["common","edible","seasonal"], desc: "สระแก้วมีพื้นที่เกษตรไร่ค่อนข้างมาก มันสำปะหลังเป็นพืชเศรษฐกิจเด่นของภูมิประเทศแห้งสลับป่า" },
                { id: "f_butterfly", name: "ผีเสื้อป่า", category: "fauna", tags: ["common","seasonal"], desc: "ปางสีดามีชื่อเสียงด้านความหลากหลายของผีเสื้อ โดยเฉพาะช่วงเทศกาลดูผีเสื้อ" },
                { id: "f_wild_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","common","protected"], desc: "ช้างป่าพบจริงในผืนป่าดงพญาเย็น-เขาใหญ่ของสระแก้ว และอาจออกใกล้พื้นที่เกษตรหรือถนนป่า" },
                { id: "t_forest_border_mountain", name: "ป่าภูเขาชายแดนดงพญาเย็น", category: "terrain", tags: ["common"], desc: "สระแก้วมีแนวป่าชายแดนและภูเขาต่อเนื่องกับผืนมรดกโลกดงพญาเย็น-เขาใหญ่" },
                { id: "c_pm25_burning", name: "ฝุ่นควันจากการเผาและอากาศแห้ง", category: "climate", tags: ["danger","common","seasonal"], desc: "ฤดูแล้งและการเผาในที่โล่งทำให้สระแก้วมีความเสี่ยงฝุ่นควันสะสมและทัศนวิสัยลดลง" },
                { id: "h_forest_fire", name: "ไฟป่า", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ป่าที่ค่อนข้างแห้งในช่วงปลายหนาวถึงร้อนมีความเสี่ยงไฟป่า โดยเฉพาะเมื่อมีการเผาพื้นที่เกษตรใกล้ป่า" },
                { id: "h_elephant_conflict", name: "ช้างป่ารบกวนพื้นที่เกษตร", category: "climate", tags: ["danger","common","extreme"], desc: "พื้นที่ติดป่ามีเหตุช้างป่าเข้าหาแหล่งอาหารในชุมชนและไร่นาเป็นระยะ ต้องระวังการเดินทางกลางคืน" }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 22-35°C, ร้อนจัดช่วงมี.ค.-พ.ค. ฝนพ.ค.-ต.ค.",
            "terrain": "พื้นที่ราบสลับเทือกเขา มีป่าธรรมชาติในเขตอุทยานและพื้นที่ชายแดนไทย-กัมพูชา",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "ด่านชายแดน",
                "content": "อรัญประเทศเป็นด่านหลักไปกัมพูชา สามารถซื้อสินค้าพื้นเมืองกัมพูชามาได้ แต่ควรตรวจพาสปอร์ตและหลีกเลี่ยงช่วงคนโกง",
                "type": "route"
            },
            {
                "title": "ป่าเขาอ่างฤๅไน",
                "content": "อุทยานแห่งชาติเขาอ่างฤๅไน มีอากาศเย็นและทางเดินศึกษาธรรมชาติ ควรเตรียมรองเท้าและน้ำดื่ม",
                "type": "culture"
            },
            {
                "title": "ฤดูฝน",
                "content": "หน้าฝนของสระแก้ว (มิ.ย.-ต.ค.) ฝนตกชุก ควรระวังน้ำท่วมถนนสายหลักช่วงหนักๆ",
                "type": "season"
            },
            {
                "title": "ราคาโรงแรมถูกที่อรัญฯ",
                "content": "ช่วงนอกเทศกาลด่านชายแดน โรงแรมที่อรัญประเทศราคาถูก สามารถประหยัดได้",
                "type": "budget"
            },
            {
                "title": "ผลไม้ท้องถิ่น",
                "content": "สวนผลไม้รอบๆ (ส้ม สาลี่ สตอเบอร์รี่) มีให้เลือกซื้อโดยตรงจากสวนในปลายฝนต้นหนาว",
                "type": "food"
            },
            {
                "title": "รถไฟตะวันออกเฉียงเหนือ",
                "content": "สายรถไฟจากกรุงเทพไปอรัญประเทศ (แก่งคอย-คลองสิบเก้า) สะดวกต่อการเดินทางเสริม",
                "type": "route"
            },
            {
                "title": "ระวังคนร้าย",
                "content": "พื้นที่ชายแดนอรัญประเทศมีกลุ่มลักลอบข้ามแดน ควรเดินทางเป็นกลุ่มและตรวจสอบข้อมูลก่อน",
                "type": "safety"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ (อรัญประเทศ)",
                "area": "ตัวเมืองอรัญประเทศ",
                "note": "มีบริการ ATM และธนาคาร",
                "openHours": "09:00-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. อรัญประเทศ",
                "area": "ริมถนนสุวรรณศร",
                "note": "บริการ 24 ชั่วโมง",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ ด่านคลองลึก",
                "area": "บริเวณด่านชายแดน",
                "note": "ห้องน้ำท่องเที่ยว",
                "openHours": "06:00-18:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยา อรัญประเทศ",
                "area": "ตัวเมืองอรัญประเทศ",
                "note": "บริการตลอดวัน",
                "openHours": "08:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลอรัญประเทศ",
                "area": "ตัวเมืองอรัญประเทศ",
                "note": "โรงพยาบาลหลักของจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรอรัญประเทศ",
                "area": "ตัวเมืองอรัญประเทศ",
                "note": "ติดตามข่าวสารเหตุความไม่สงบชายแดน",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "PTT EV Charger (ฉะเชิงเทรา)",
                "area": "ทางเข้ามอเตอร์เวย์",
                "note": "ชาร์จรถยนต์ไฟฟ้า",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ศูนย์ข้อมูลท่องเที่ยว สระแก้ว",
                "area": "ตัวเมืองสระแก้ว",
                "note": "ข้อมูลการท่องเที่ยวจังหวัด",
                "openHours": "08:30-17:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพฯ",
                "ปราจีนบุรี",
                "นครนายก"
            ],
            "commonDestinations": [
                "ด่านพรมแดนบ้านคลองลึก",
                "วัดเขาสัจจพนม",
                "น้ำตกปางสีดา",
                "วัดถ้ำเขาบินใหญ่ (บ้านเขาฝ้าย)"
            ],
            "transitHubs": [
                "สถานีรถไฟอรัญประเทศ",
                "สถานีขนส่งสระแก้ว"
            ],
            "routeNotes": [
                "ใช้มอเตอร์เวย์และถนนสุวรรณศร ไปยังอรัญประเทศ",
                "ตรวจสอบสภาพรถก่อนข้ามแดนทุกครั้ง",
                "ที่พักในอรัญฯส่วนใหญ่เรียบง่าย ราคาถูก"
            ]
        }
    }
};
