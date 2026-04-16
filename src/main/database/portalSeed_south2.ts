// Portal seed data: ภาคใต้ Part 2 (5 จังหวัด)
// Source: documents/deepreserach/part6_ภาคใต้.md
import type { ProvincePortalSeedData } from './db';

export const southPart2: Record<string, ProvincePortalSeedData> = {
    "Songkhla": {
        "transport": [
            {
                "name": "รถสองแถวหาดใหญ่",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวรับจ้างในอำเภอหาดใหญ่",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#DC143C"
            },
            {
                "name": "เรือข้ามเกาะแต้ว",
                "shortName": "เรือโดยสาร",
                "type": "boat",
                "description": "เรือข้ามฟากเชื่อมต่อเกาะแต้วกับชายฝั่ง",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#0EA5E9"
            },
            {
                "name": "รถตุ๊กตุ๊กหาดใหญ่",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "ตุ๊กตุ๊กให้บริการในเมืองหาดใหญ่และบางส่วนของสงขลา",
                "warpUrl": "",
                "logoText": "🛺",
                "color": "#A855F7"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - สงขลา",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "สถานีกรุงเทพ",
                "to": "สถานีหาดใหญ่",
                "via": [
                    "นครปฐม",
                    "ราชบุรี",
                    "ชุมพร"
                ],
                "departureTimes": [
                    "22:45"
                ],
                "duration": "12 ชม.",
                "baseFare": 650,
                "frequency": "วันละ 1 เที่ยว",
                "terminal": "สถานีหัวลำโพง",
                "notes": null
            },
            {
                "name": "สาย 2: กรุงเทพฯ - สงขลา",
                "type": "plane",
                "operator": "Thai Lion Air",
                "from": "สนามบินดอนเมือง",
                "to": "สนามบินหาดใหญ่",
                "via": [],
                "departureTimes": [
                    "07:30",
                    "15:00",
                    "20:00"
                ],
                "duration": "1 ชม. 20 นาที",
                "baseFare": 900,
                "frequency": "หลายเที่ยวต่อวัน",
                "terminal": "สนามบินดอนเมือง",
                "notes": null
            },
            {
                "name": "สาย 3: หาดใหญ่ - เกาะยอ",
                "type": "boat",
                "operator": "เรือโดยสารสงขลา",
                "from": "ท่าเรือหาดใหญ่",
                "to": "เกาะยอ",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "18:00"
                ],
                "duration": "15 นาที",
                "baseFare": 15,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "ท่าเรือหาดใหญ่",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวยำปักษ์ใต้สงขลา",
                "priceRange": "50-70฿",
                "category": "local",
                "note": "ข้าวคลุกเครื่องแกงหวานเผ็ดพร้อมเครื่องเคียง"
            },
            {
                "name": "ขนมจีนซาวน้ำ",
                "priceRange": "40-60฿",
                "category": "local",
                "note": "ขนมจีนราดน้ำซุปใสใส่กุ้งแห้งและหน่อไม้ดอง"
            },
            {
                "name": "โรตีสายไหมสงขลา",
                "priceRange": "20฿",
                "category": "dessert",
                "note": "โรตีกรอบเสิร์ฟพร้อมฝอยทองและนมข้นหวาน"
            },
            {
                "name": "ปลากะพงทอดน้ำปลา",
                "priceRange": "150-250฿",
                "category": "local",
                "note": "ปลากะพงตัวใหญ่ทอดกรอบราดน้ำจิ้มซีฟู้ด"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "400-900฿/คืน",
                "examples": [
                    "Amata Samui Hotel",
                    "New Asia Lee Garden"
                ],
                "bookingUrl": "https://www.booking.com/region/th/songkhla.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1200-3000฿/คืน",
                "examples": [
                    "The One Hotel",
                    "Tonson Hotel"
                ],
                "bookingUrl": "https://www.booking.com/region/th/songkhla.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "4000-10000฿/คืน",
                "examples": [
                    "Centara Hotel Hat Yai",
                    "Holiday Inn Hat Yai"
                ],
                "bookingUrl": "https://www.booking.com/region/th/songkhla.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "medium",
                "note": "น้ำฝนไหลหลากลงเขาล้นตลิ่ง",
                "season": "ต.ค.-ม.ค."
            },
            {
                "label": "ความไม่สงบใต้สุด",
                "severity": "low",
                "note": "เหตุการณ์ความไม่สงบบางครั้งเกิดรอบนอกเมือง",
                "season": null
            }
        ],
        "ecoIds": [
                "fl_lotus",
                "fl_mangrove",
                "f_irrawaddy_dolphin",
                "f_migratory_waterbird",
                "t_lagoon_system",
                "c_northeast_monsoon",
                "h_coastal_erosion",
                "h_flood"
        ],
        "newEcoEntities": [
                { id: "fl_lotus", name: "บัวหลวง", category: "flora", tags: ["common","edible","medicinal"], desc: "พืชน้ำสำคัญของพื้นที่ชุ่มน้ำสงขลาและรอยต่อทะเลน้อย เป็นทั้งแหล่งอาหารและที่อยู่อาศัยสัตว์น้ำ" },
                { id: "fl_mangrove", name: "แสมทะเลและโกงกาง", category: "flora", tags: ["common"], desc: "ป่าชายเลนรอบอ่าวและทะเลสาบช่วยลดการกัดเซาะและเป็นแหล่งอนุบาลสัตว์น้ำ" },
                { id: "f_irrawaddy_dolphin", name: "โลมาอิรวดี", category: "fauna", tags: ["common","rare","protected"], desc: "โลมาอิรวดีเป็นชนิดเด่นของระบบทะเลสาบสงขลา แต่ประชากรเปราะบางมากและได้รับผลกระทบจากอวนประมง" },
                { id: "f_migratory_waterbird", name: "นกน้ำอพยพ", category: "fauna", tags: ["common","protected","seasonal"], desc: "ระบบทะเลสาบสงขลารองรับนกน้ำจำนวนมากทั้งชนิดประจำถิ่นและอพยพ" },
                { id: "t_lagoon_system", name: "ระบบลากูนทะเลสาบสงขลา", category: "terrain", tags: ["common","danger"], desc: "เป็นระบบทะเลสาบกึ่งน้ำจืดกึ่งน้ำเค็มที่เชื่อมกับอ่าวไทย มีพื้นที่ชุ่มน้ำและคันทรายยาวเด่นชัด" },
                { id: "c_northeast_monsoon", name: "มรสุมตะวันออกเฉียงเหนือ", category: "climate", tags: ["common","danger","seasonal"], desc: "สงขลาได้รับผลชัดจากมรสุมฝั่งอ่าวไทย ทำให้ปลายปีถึงต้นปีมีฝนหนักและทะเลมีคลื่นลมจัด" },
                { id: "h_coastal_erosion", name: "การกัดเซาะชายฝั่ง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "คลื่นลมและการเปลี่ยนแปลงตะกอนทำให้หลายช่วงชายฝั่งสงขลามีปัญหากัดเซาะต่อเนื่อง" },
                { id: "h_flood", name: "น้ำท่วมจากฝนสะสม", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ฝนสะสมช่วงมรสุมทำให้เกิดน้ำท่วมทั้งพื้นที่ลุ่มรอบทะเลสาบและเขตเมือง" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 25-33°C, ร้อนชื้น ฝนตกชุก มิ.ย.-พ.ย.",
            "terrain": "ทุ่งนา ชายทะเลสาบสงขลา ป่าชายเลนในภาคกลาง",
            "bestSeason": "พ.ย.-มี.ค.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลสงขลา",
                    "number": "074-338100"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "หาดสมิหลา",
                "content": "หาดสมิหลา ในเมืองสงขลาถูกยกให้เป็นสัญลักษณ์ของจังหวัด สวยงามโดยเฉพาะยามพระอาทิตย์ขึ้น มีรูปปั้นนางเงือกและร้านอาหารทะเลสดมากมาย",
                "type": "culture"
            },
            {
                "title": "ไหว้พระพุทธเจ้า",
                "content": "หาดใหญ่เป็นเมืองใหญ่สุดของสงขลา มีศาลเจ้าโจวซือกงอายุหลายร้อยปี นอกจากนี้ วัดมหัตตมังคลาราม (หลวงปู่ทวด) ก็เป็นจุดสำคัญของคนไทยมุสลิม และตลาดกิมหยง-พลาซ่าเป็นที่นิยม",
                "type": "culture"
            },
            {
                "title": "ความปลอดภัย",
                "content": "แม้สงขลาจะใกล้พื้นที่เสี่ยง 3 จังหวัดชายแดนใต้ แต่โดยทั่วไปตัวเมืองหาดใหญ่และสงขลาอยู่ในเขตปลอดภัย ควรระมัดระวังเหตุลอบวางระเบิดในพื้นที่ภาคใต้ทั้งปวง.",
                "type": "safety"
            },
            {
                "title": "อาหารพื้นถิ่น",
                "content": "เมนูเด็ดสงขลาคือ ข้าวสตูไก่หาดใหญ่ น้ำพริกไข่ปู สะเต๊ะสงขลา และขนมจีนแกงไตปลา, นอกจากนี้มีของหวานพื้นบ้านเช่น โป๊ะก๊วย (ขนมหวานเกสรดอกไม้) ที่เป็นเอกลักษณ์ของสงขลา",
                "type": "food"
            }
        ],
        "supplyPoints": [
            {
                "type": "clinic",
                "label": "โรงพยาบาลสงขลานครินทร์",
                "area": "อ.เมืองสงขลา (หาดใหญ่)",
                "note": "โรงพยาบาลแห่งมหาวิทยาลัย, ศูนย์การแพทย์ชั้นสูง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม พีทีที ริมถนนเพชรเกษม (ข้างนครินทร์)",
                "area": "อ.เมืองสงขลา (หาดใหญ่)",
                "note": "สะดวกซื้อ 24 ชม. ใกล้หาดใหญ่",
                "openHours": "5:00-23:00",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกรุงไทย สาขาหาดใหญ่",
                "area": "อ.หาดใหญ่ (เขตเทศบาลนครสงขลา)",
                "note": "ATM เปิด 24 ชม.",
                "openHours": "9:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ร้านสะดวกซื้อ 24 ชม.",
                "area": "อ.หาดใหญ่",
                "note": "หาได้ทั่วไปในเมืองใหญ่",
                "openHours": "24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพมหานคร",
                "สตูล",
                "ปัตตานี"
            ],
            "commonDestinations": [
                "หาดสมิหลา",
                "ถนนนางงาม (หาดใหญ่)",
                "วัดแหลมพ้อ",
                "สะพานติณสูลานนท์",
                "ตลาดกิมหยง"
            ],
            "transitHubs": [
                "สนามบินหาดใหญ่",
                "สถานีขนส่งหาดใหญ่ (ศรีภูวนารถ)",
                "สถานีขนส่งสงขลา (คลองแงะ)"
            ],
            "routeNotes": [
                "รถทัวร์เข้าสงขลาผ่านจุดตรวจหลายแห่งในเส้นทาง 4 (สะเดา) และ 41 (หาดใหญ่-สงขลา)",
                "ถนนเพชรเกษม 4 ผ่านหาดใหญ่เชื่อมสู่กรุงเทพฯ",
                "รถติดหนักย่านตัวเมืองหาดใหญ่ช่วงเย็นและวันหยุดสุดสัปดาห์"
            ]
        }
    },
    "Trang": {
        "transport": [
            {
                "name": "สองแถวตรัง",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "สองแถวรับจ้างในเมืองตรัง",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#556B2F"
            },
            {
                "name": "เรือเฟอร์รี่ตรัง-เกาะกระ",
                "shortName": "เรือเฟอร์รี่",
                "type": "boat",
                "description": "เรือเชื่อมเกาะกระและชายฝั่ง",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#2563EB"
            },
            {
                "name": "รถตุ๊กตุ๊กตรัง",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "ตุ๊กตุ๊กรับจ้างภายในเมืองตรัง",
                "warpUrl": "",
                "logoText": "🛺",
                "color": "#FF7F50"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - ตรัง",
                "type": "plane",
                "operator": "Bangkok Airways",
                "from": "สนามบินสุวรรณภูมิ",
                "to": "สนามบินตรัง",
                "via": [],
                "departureTimes": [
                    "06:30",
                    "11:30"
                ],
                "duration": "1 ชม. 20 นาที",
                "baseFare": 800,
                "frequency": "หลายเที่ยวต่อวัน",
                "terminal": "สนามบินสุวรรณภูมิ",
                "notes": null
            },
            {
                "name": "สาย 2: หมอชิต - ตรัง",
                "type": "bus",
                "operator": "บขส.",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งตรัง",
                "via": [
                    "ราชบุรี",
                    "ชุมพร"
                ],
                "departureTimes": [
                    "18:00",
                    "22:00"
                ],
                "duration": "12 ชม.",
                "baseFare": 900,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 3: ท่าเรือปากเมง - เกาะลิบง",
                "type": "boat",
                "operator": "เรือโดยสารจังหวัดตรัง",
                "from": "ท่าเรือปากเมง",
                "to": "เกาะลิบง",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "15:00"
                ],
                "duration": "40 นาที",
                "baseFare": 100,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "ท่าเรือปากเมง",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "หมี่กรอบตรัง",
                "priceRange": "50-70฿",
                "category": "local",
                "note": "เส้นหมี่กรอบราดน้ำแกงเค็มใส่หมูหยองและผักดอง"
            },
            {
                "name": "เปาะเปี๊ยะสด",
                "priceRange": "30-50฿",
                "category": "street",
                "note": "แป้งบางโรลห่อผักสดและหมูยอ"
            },
            {
                "name": "ไก่หุบบูติ",
                "priceRange": "100-150฿",
                "category": "local",
                "note": "ไก่นึ่งสมุนไพรท้องถิ่นรสกลมกล่อม"
            },
            {
                "name": "หมึกย่างเสียบไม้",
                "priceRange": "20฿",
                "category": "street",
                "note": "ปลาหมึกเสียบไม้ย่างจิ้มน้ำจิ้ม"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "400-900฿/คืน",
                "examples": [
                    "Naka Hotel Trang",
                    "The Beach House"
                ],
                "bookingUrl": "https://www.booking.com/region/th/trang.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1000-2500฿/คืน",
                "examples": [
                    "GoodMorningTrang Hotel",
                    "Manee Resort"
                ],
                "bookingUrl": "https://www.booking.com/region/th/trang.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "3000-8000฿/คืน",
                "examples": [
                    "Twin Lotus Resort",
                    "Anantara Si Kao"
                ],
                "bookingUrl": "https://www.booking.com/region/th/trang.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ฝนตกหนัก",
                "severity": "medium",
                "note": "ฝนตกหนักช่วงฤดูมรสุม",
                "season": "พ.ย.-ม.ค."
            },
            {
                "label": "เขตอนุรักษ์ทางทะเล",
                "severity": "low",
                "note": "บางพื้นที่เป็นเขตอนุรักษ์ห้ามจับสัตว์น้ำ",
                "season": null
            }
        ],
        "ecoIds": [
                "fl_seagrass",
                "fl_mangrove",
                "f_dugong",
                "f_sea_turtle",
                "t_island_seascape",
                "c_andaman_monsoon",
                "h_boat_strike",
                "h_rough_sea"
        ],
        "newEcoEntities": [
                { id: "fl_seagrass", name: "หญ้าทะเล", category: "flora", tags: ["common","protected"], desc: "ตรังเป็นพื้นที่หญ้าทะเลที่สำคัญมากของไทยและเป็นฐานอาหารหลักของพะยูน" },
                { id: "fl_mangrove", name: "ป่าชายเลน", category: "flora", tags: ["common"], desc: "ป่าชายเลนของตรังเชื่อมกับหาดเลน หญ้าทะเล และระบบหมู่เกาะทะเลตรัง" },
                { id: "f_dugong", name: "พะยูน", category: "fauna", tags: ["common","protected"], desc: "ตรังเป็นจังหวัดที่ขึ้นชื่อเรื่องพะยูน เพราะมีทุ่งหญ้าทะเลขนาดใหญ่รองรับการหากิน" },
                { id: "f_sea_turtle", name: "เต่าทะเล", category: "fauna", tags: ["rare","danger","protected","seasonal"], desc: "เต่าทะเลพบในเขตหมู่เกาะทะเลตรังและพื้นที่ชายหาดบางแห่ง โดยเฉพาะในน่านน้ำค่อนข้างสมบูรณ์" },
                { id: "t_island_seascape", name: "หมู่เกาะทะเลตรัง", category: "terrain", tags: ["common"], desc: "พื้นที่เด่นคือหมู่เกาะ หาดทราย ถ้ำทะเล และแนวหญ้าทะเลที่ต่อเนื่องกับป่าชายเลน" },
                { id: "c_andaman_monsoon", name: "มรสุมฝั่งอันดามัน", category: "climate", tags: ["common","danger","seasonal"], desc: "ทะเลตรังมีสภาพแปรปรวนชัดในฤดูมรสุม เรือเล็กและกิจกรรมดำน้ำควรระวังเป็นพิเศษ" },
                { id: "h_boat_strike", name: "ความเสี่ยงเรือชนสัตว์ทะเลหายาก", category: "climate", tags: ["danger","common","extreme"], desc: "พื้นที่พะยูนของตรังมีความเสี่ยงจากการเดินเรือเร็วและการรบกวนสัตว์ทะเลหายาก" },
                { id: "h_rough_sea", name: "คลื่นลมแรงและกระแสน้ำแรง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ช่วงมรสุมทะเลเปิดและเกาะรอบตรังเสี่ยงคลื่นสูง การลงเล่นน้ำและเดินเรือต้องดูประกาศทุกครั้ง" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 24-32°C, ร้อนชื้น ฝนตกหนัก พ.ค.-ต.ค.",
            "terrain": "ชายฝั่งทะเลและเกาะมากมาย มีป่าและภูเขาต่ำ",
            "bestSeason": "ม.ค.-เม.ย.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลตรัง",
                    "number": "075-201500"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "ฤดูกาลเที่ยว",
                "content": "เดือนที่ดีที่สุดในการเที่ยวตรังคือ ธันวาคม-พฤษภาคม. บางรีสอร์ตปิดปรับปรุงในช่วงต้นฤดูท่องเที่ยว (กลางพ.ย.) และอีกหลายแห่งขึ้นราคาไฮซีซั่นตั้งแต่ตุลาคม.",
                "type": "season"
            },
            {
                "title": "วัฒนธรรมท้องถิ่น",
                "content": "ต้องไม่พลาดช้อปผ้าทอมือนาโมงศรี ที่มีลวดลายเอกลักษณ์ท้องถิ่นตรัง. เยี่ยมชมพิพิธภัณฑ์พระยารัษฎานุประดิษฐ์ (เรือนเก่าเจ้านายเมืองตรัง) เพื่อเรียนรู้ประวัติศาสตร์",
                "type": "culture"
            },
            {
                "title": "ธรรมชาติใต้น้ำ",
                "content": "เกาะหลีเป๊ะและเกาะไข่ ตั้งอยู่ทะเลตรัง น้ำใสเป็นแหล่งดำน้ำดูปะการัง. เกาะมุกมีถ้ำมรกตชื่อดัง และเกาะสุกรมักใช้เป็นทางผ่านไปเกาะลิบง",
                "type": "culture"
            },
            {
                "title": "เตรียมอุปกรณ์เที่ยว",
                "content": "ไปเที่ยวถ้ำเลเขากอบ ควรมีอุปกรณ์ของตัวเอง เช่น ไฟฉายแบบกันน้ำ และกระเป๋ากันน้ำ กันกระแทกเก็บของสำคัญ. ทาครีมกันแดดและใส่หมวกทุกครั้งสำหรับกิจกรรมกลางแจ้ง.",
                "type": "safety"
            },
            {
                "title": "อาหารใต้",
                "content": "ตรังขึ้นชื่อผักเมืองตรัง เช่น กะปิซึ่งมีชื่อเสียงระดับโลก โดยเฉพาะกะปิชนิดชาววัง และต้องลอง ลิ้นจี่ตรังในฤดูผลไม้ (พ.ค.-มิ.ย.)",
                "type": "food"
            }
        ],
        "supplyPoints": [
            {
                "type": "clinic",
                "label": "โรงพยาบาลตรัง",
                "area": "อ.เมืองตรัง",
                "note": "โรงพยาบาลหลัก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มบางจาก ข้างทางหลวง 4",
                "area": "อ.เมืองตรัง",
                "note": "ปั๊มใหญ่ติดถนนเชื่อมตรัง–กระบี่",
                "openHours": "6:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขาตรัง",
                "area": "อ.เมืองตรัง",
                "note": "ATM 24 ชั่วโมง",
                "openHours": "9:00-18:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "7-Eleven (บขส. ตรัง)",
                "area": "อ.เมืองตรัง",
                "note": "ร้านสะดวกซื้อในสถานีขนส่ง",
                "openHours": "24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "หาดใหญ่ (รถบัส)",
                "ภูเก็ต (รถยนต์)",
                "กระบี่ (เรือเฟอร์รี่)"
            ],
            "commonDestinations": [
                "เมืองตรัง",
                "ทะเลตรัง (เกาะเชือก, เกาะกระดาน)",
                "เขากอบ",
                "น้ำตกโตนไทร",
                "สะพานป่าไม้"
            ],
            "transitHubs": [
                "สนามบินตรัง",
                "สถานีขนส่งตรัง",
                "ท่าเรือปากเมง"
            ],
            "routeNotes": [
                "ถนนเพชรเกษม 4 ข้ามตรังเป็นทางหลวงหลักบนฝั่งตะวันตก",
                "ห้ามเล่นน้ำเกาะมุกตรงถ้ำมรกต (เขตพื้นที่อุทยาน)",
                "มีรถบัสบริการจากตรังไปย่านสงขลาและอำเภออื่นๆ"
            ]
        }
    },
    "Satun": {
        "transport": [
            {
                "name": "สองแถวสตูล",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "สองแถวให้บริการในตัวเมืองสตูล",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#2F4F4F"
            },
            {
                "name": "เรือข้ามฟากเกาะหลีเป๊ะ",
                "shortName": "สปีดโบ๊ท",
                "type": "boat",
                "description": "เรือเร็วข้ามฟากไปยังเกาะหลีเป๊ะ",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#2563EB"
            },
            {
                "name": "รถจักรยานยนต์รับจ้าง",
                "shortName": "รถมอเตอร์ไซค์",
                "type": "bike",
                "description": "บริการมอเตอร์ไซค์รับจ้างในพื้นที่เมืองสตูล",
                "warpUrl": "",
                "logoText": "🏍️",
                "color": "#8B0000"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: ภูเก็ต - สตูล",
                "type": "bus",
                "operator": "บขส.",
                "from": "สถานีขนส่งภูเก็ต",
                "to": "สถานีขนส่งสตูล",
                "via": [
                    "พังงา",
                    "ระนอง"
                ],
                "departureTimes": [
                    "08:00",
                    "14:00"
                ],
                "duration": "6 ชม.",
                "baseFare": 500,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "สถานีขนส่งภูเก็ต",
                "notes": null
            },
            {
                "name": "สาย 2: หาดใหญ่ - สตูล",
                "type": "bus",
                "operator": "รถตู้สาธารณะ",
                "from": "สถานีขนส่งหาดใหญ่ 2",
                "to": "สถานีขนส่งสตูล",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "13:00"
                ],
                "duration": "3 ชม.",
                "baseFare": 300,
                "frequency": "วันละ 3 เที่ยว",
                "terminal": "สถานีขนส่งหาดใหญ่ 2",
                "notes": null
            },
            {
                "name": "สาย 3: ท่าเรือปากบารา - เกาะหลีเป๊ะ",
                "type": "boat",
                "operator": "เรือเร็ว",
                "from": "ท่าเทียบเรือปากบารา",
                "to": "เกาะหลีเป๊ะ",
                "via": [],
                "departureTimes": [
                    "10:00",
                    "14:00"
                ],
                "duration": "1.5 ชม.",
                "baseFare": 500,
                "frequency": "วันละ 2 เที่ยว (ฤดูท่องเที่ยว)",
                "terminal": "ท่าเทียบเรือปากบารา",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวยำเมืองสตูล",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "ข้าวคลุกเครื่องแกงหวานพร้อมผักสด"
            },
            {
                "name": "ส้มตำปูไข่ดอง",
                "priceRange": "40-60฿",
                "category": "street",
                "note": "ส้มตำใส่ปูไข่ดองรสจัดจ้าน"
            },
            {
                "name": "หมึกแดดเดียว",
                "priceRange": "70-100฿",
                "category": "local",
                "note": "ปลาหมึกแดดเดียวย่างกินกับน้ำจิ้มซีฟู้ด"
            },
            {
                "name": "ขนมจีนสองน้ำ",
                "priceRange": "30-50฿",
                "category": "dessert",
                "note": "ขนมจีนราดน้ำแกงเขียวหวานกับน้ำแกงปู"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "400-800฿/คืน",
                "examples": [
                    "Mareeya Homestay",
                    "PK Guesthouse"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1200-3000฿/คืน",
                "examples": [
                    "Andamaya Dive Resort (เกาะสุกร)",
                    "Phupha Waree Resort"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "3000-8000฿/คืน",
                "examples": [
                    "Layana Resort (เกาะหลีเป๊ะ)",
                    "Benjarong Resort"
                ],
                "bookingUrl": ""
            }
        ],
        "dangerZones": [
            {
                "label": "ฝูงมลพิษทะเล",
                "severity": "medium",
                "note": "ภัยจากน้ำเสียหรือขยะในทะเลที่ส่งผลต่อปะการัง",
                "season": null
            },
            {
                "label": "ลมพายุทะเล",
                "severity": "high",
                "note": "มรสุมพายุทะเลช่วงมิ.ย.-ต.ค.",
                "season": "มิ.ย.-ต.ค."
            }
        ],
        "ecoIds": [
                "fl_mangrove",
                "fl_seagrass",
                "f_mouse_deer",
                "f_dusky_langur",
                "t_karst_islands",
                "c_andaman_monsoon",
                "h_rough_sea",
                "h_rip_current"
        ],
        "newEcoEntities": [
                { id: "fl_mangrove", name: "ป่าชายเลน", category: "flora", tags: ["common"], desc: "พื้นที่ชายฝั่งสตูลยังมีป่าชายเลนและหาดเลนที่เชื่อมโยงกับระบบหมู่เกาะทะเล" },
                { id: "fl_seagrass", name: "หญ้าทะเล", category: "flora", tags: ["common","protected"], desc: "หญ้าทะเลของสตูลเป็นส่วนหนึ่งของแนวอันดามันตอนล่างที่รองรับสัตว์ทะเลหายาก" },
                { id: "f_mouse_deer", name: "กระจง", category: "fauna", tags: ["common","rare","protected"], desc: "กระจงเป็นสัตว์ขนาดเล็กที่พบในป่าเกาะของตะรุเตาและพื้นที่ป่าที่ค่อนข้างสมบูรณ์" },
                { id: "f_dusky_langur", name: "ค่างแว่น", category: "fauna", tags: ["rare","danger","protected"], desc: "พบได้ในเขตหมู่เกาะและป่าเกาะที่ยังสมบูรณ์ นักท่องเที่ยวไม่ควรให้อาหาร" },
                { id: "t_karst_islands", name: "หมู่เกาะหินปูนและชายฝั่งสตูล", category: "terrain", tags: ["common"], desc: "สตูลเด่นด้วยหมู่เกาะทะเล ป่าบนเกาะ ชายฝั่ง และภูมิประเทศหินปูนแบบคาสต์" },
                { id: "c_andaman_monsoon", name: "ฝนและคลื่นลมมรสุม", category: "climate", tags: ["common","danger","seasonal"], desc: "สตูลได้รับผลจากมรสุมฝั่งอันดามัน ทำให้การเดินเรือและกิจกรรมทะเลเสี่ยงขึ้นมากในฤดูฝน" },
                { id: "h_rough_sea", name: "ทะเลแปรปรวนและคลื่นสูง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ในฤดูมรสุมคลื่นลมแรงกระทบการเดินเรือโดยสารและเรือเล็กอย่างชัดเจน" },
                { id: "h_rip_current", name: "กระแสน้ำแรงตามหาดและช่องแคบ", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "หาดบางแห่งและร่องน้ำระหว่างเกาะมีน้ำไหลแรง โดยเฉพาะช่วงคลื่นมรสุมและน้ำขึ้นลงจัด" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 24-32°C, ร้อนชื้น ฝนตก พ.ค.-ก.ย.",
            "terrain": "เกาะแก่ง ทะเล และป่าชายเลน",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลสตูล",
                    "number": "074-723500"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "ฤดูฝนชุก",
                "content": "ฝนตกหนักบนฝั่งทะเลอันดามันของสตูลระหว่างเดือนพฤษภาคมถึงตุลาคม. ควรวางแผนเที่ยวทะเลในช่วงพฤศจิกายนถึงเมษายน.",
                "type": "season"
            },
            {
                "title": "ความปลอดภัย",
                "content": "แม้ว่าสตูลจะอยู่ใกล้ชายแดนมาเลเซีย แต่จังหวัดสตูลสงบมาก ไม่ได้รับผลกระทบจากความไม่สงบในสามจังหวัดชายแดนใต้. สถานที่ท่องเที่ยวบนเกาะส่วนใหญ่ปลอดภัยสำหรับนักท่องเที่ยว.",
                "type": "safety"
            },
            {
                "title": "วัฒนธรรมมลายู",
                "content": "ประชากรส่วนใหญ่เป็นชาวมุสลิมเชื้อสายมาเลย์ ผสมผสานวัฒนธรรมมาเลเซีย อาหารพื้นถิ่นจึงมีสไตล์มุสลิม เช่น โรตี แกงกะทิ, และขนมตุบตับ (ขนมหวานมลายู).",
                "type": "culture"
            },
            {
                "title": "หมู่เกาะอันดามัน",
                "content": "สตูลมีเกาะสวยมากมาย เช่น เกาะหลีเป๊ะ, เกาะอาดัง-ราวี, เกาะไข่. เกาะสุรินทร์อยู่ไม่ไกล เป็นอุทยานแห่งชาติที่งดงาม.",
                "type": "culture"
            },
            {
                "title": "ปิดเกาะฤดูมรสุม",
                "content": "อุทยานแห่งชาติทุกเกาะ รวมทั้งเกาะตะรุเตา เกาะอาดัง-ราวี และหมู่เกาะเภตรา ปิดไม่ให้เข้าชมระหว่าง 16 พ.ค. - 15 พ.ย. เพื่อความปลอดภัย.",
                "type": "route"
            }
        ],
        "supplyPoints": [
            {
                "type": "clinic",
                "label": "โรงพยาบาลสตูล",
                "area": "อ.เมืองสตูล",
                "note": "โรงพยาบาลหลัก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. สตูล (เมือง)",
                "area": "อ.เมืองสตูล",
                "note": "ข้างตลาดหลักเมืองสตูล",
                "openHours": "5:00-22:30",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกรุงไทย สาขาสตูล",
                "area": "อ.เมืองสตูล",
                "note": "มีตู้ ATM 24ชม.",
                "openHours": "9:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "7-Eleven (ริมถนนแจ้งสนิท)",
                "area": "อ.เมืองสตูล",
                "note": "ร้านสะดวกซื้อ 24 ชม.",
                "openHours": "24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "หาดใหญ่ (รถบัส)",
                "ภูเก็ต (รถยนต์)",
                "ประเทศมาเลเซีย (รถยนต์)"
            ],
            "commonDestinations": [
                "เกาะหลีเป๊ะ",
                "เกาะอาดัง-ราวี",
                "เมืองสตูล",
                "ถ้ำลอด",
                "น้ำตกร้อนระฆัง"
            ],
            "transitHubs": [
                "ท่าเรือปากบารา",
                "สนามบินหาดใหญ่",
                "สถานีขนส่งสตูล"
            ],
            "routeNotes": [
                "เส้นทางคึกคักช่วงเทศกาลผลไม้ (มิ.ย.-ก.ค.)",
                "เรือไปหลีเป๊ะออกจากปากบาราเท่านั้น, ปิดเกาะฤดูฝน"
            ]
        }
    },
    "Phatthalung": {
        "transport": [
            {
                "name": "สองแถวควนขนุน",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวบริการควนขนุน-ตัวเมือง",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#800000"
            },
            {
                "name": "เรือข้ามทะเลสาบสงขลา",
                "shortName": "เรือโดยสาร",
                "type": "boat",
                "description": "เรือเชื่อมฝั่งทุ่งใหญ่และฝั่งพระยอด",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#0CA1E2"
            },
            {
                "name": "รถมอเตอร์ไซค์รับจ้าง",
                "shortName": "มอเตอร์ไซค์",
                "type": "bike",
                "description": "มอเตอร์ไซค์รับจ้างในตัวเมืองพัทลุง",
                "warpUrl": "",
                "logoText": "🏍️",
                "color": "#DAA520"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: หาดใหญ่ - พัทลุง",
                "type": "bus",
                "operator": "รถตู้สาธารณะ",
                "from": "สถานีขนส่งหาดใหญ่ 2",
                "to": "สถานีขนส่งพัทลุง",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "12:00",
                    "16:00"
                ],
                "duration": "1 ชม.",
                "baseFare": 80,
                "frequency": "วันละ 3 เที่ยว",
                "terminal": "สถานีขนส่งหาดใหญ่ 2",
                "notes": null
            },
            {
                "name": "สาย 2: กรุงเทพฯ - พัทลุง",
                "type": "bus",
                "operator": "บขส.",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งพัทลุง",
                "via": [
                    "ราชบุรี",
                    "ชุมพร"
                ],
                "departureTimes": [
                    "17:00",
                    "21:00"
                ],
                "duration": "12 ชม.",
                "baseFare": 750,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 3: ท่าเรือพัทลุง - เกาะลิบง",
                "type": "boat",
                "operator": "เรือข้ามเกาะ",
                "from": "ท่าเรือสองแพร่ง",
                "to": "เกาะลิบง",
                "via": [],
                "departureTimes": [
                    "10:30"
                ],
                "duration": "3 ชม.",
                "baseFare": 200,
                "frequency": "วันละ 1 เที่ยว (ฤดูท่องเที่ยว)",
                "terminal": "ท่าเรือสองแพร่ง",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวเหนียวสังขยาใบเตย",
                "priceRange": "20-30฿",
                "category": "dessert",
                "note": "ข้าวเหนียวราดสังขยารสหวานหอมกลิ่นใบเตย"
            },
            {
                "name": "ปลาแดดเดียวเมืองพัทลุง",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "ปลาท้องถิ่นปรุงรสเค็มแล้วตากแดด"
            },
            {
                "name": "แกงเลียงหน่อไม้ดอง",
                "priceRange": "60-100฿",
                "category": "local",
                "note": "แกงเลียงผักท้องถิ่น ใส่หน่อไม้ดอง"
            },
            {
                "name": "หมูย่างควนขนุน",
                "priceRange": "50-70฿",
                "category": "street",
                "note": "หมูย่างสูตรควนขนุน ราดน้ำจิ้มซีฟู้ด"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-700฿/คืน",
                "examples": [
                    "RimSai Resort",
                    "Klongzon Resort"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1000-2000฿/คืน",
                "examples": [
                    "Parkview Resort Hotel Phatthalung",
                    "Palatial Place"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2500-8000฿/คืน",
                "examples": [
                    "Chiangkhan Kabinburi Park View Resort"
                ],
                "bookingUrl": ""
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำท่วมขัง",
                "severity": "medium",
                "note": "น้ำท่วมขังตามหมู่บ้านในฤดูฝน",
                "season": "ก.ย.-พ.ย."
            },
            {
                "label": "หมอกลงจัด",
                "severity": "low",
                "note": "หมอกหนาทึบบนถนนชนบทช่วงหน้าหนาว",
                "season": "พ.ย.-ม.ค."
            }
        ],
        "ecoIds": [
                "fl_lotus",
                "fl_krajood",
                "f_waterbird",
                "f_water_buffalo",
                "t_freshwater_wetland",
                "c_morning_fog_wetland",
                "h_flood",
                "h_lightning_storm"
        ],
        "newEcoEntities": [
                { id: "fl_lotus", name: "บัวแดง", category: "flora", tags: ["common","seasonal"], desc: "บัวแดงเป็นภาพจำของทะเลน้อยและเป็นส่วนสำคัญของระบบนิเวศพื้นที่ชุ่มน้ำ" },
                { id: "fl_krajood", name: "กระจูด", category: "flora", tags: ["common"], desc: "พบทั่วไปตามพื้นที่ชุ่มน้ำและเกี่ยวพันกับวิถีชุมชนรอบทะเลน้อย" },
                { id: "f_waterbird", name: "นกน้ำประจำถิ่นและนกอพยพ", category: "fauna", tags: ["common","protected","seasonal"], desc: "พัทลุงเด่นมากเรื่องนกน้ำหลากหลายชนิดจากระบบทะเลน้อยและทะเลสาบสงขลา" },
                { id: "f_water_buffalo", name: "ควายน้ำ", category: "fauna", tags: ["common","danger"], desc: "เป็นสัตว์เลี้ยงวิถีชุมชนที่กลายเป็นเอกลักษณ์ของทะเลน้อย ควรเว้นระยะเมื่ออยู่ในฝูง" },
                { id: "t_freshwater_wetland", name: "พื้นที่ชุ่มน้ำทะเลน้อย", category: "terrain", tags: ["common","danger"], desc: "ทะเลน้อยเป็นพื้นที่ชุ่มน้ำจืดขนาดใหญ่และเป็นแหล่งนกน้ำสำคัญระดับประเทศ" },
                { id: "c_morning_fog_wetland", name: "อากาศชื้นและหมอกยามเช้า", category: "climate", tags: ["common","danger","seasonal"], desc: "พื้นที่ชุ่มน้ำและอุณหภูมิยามเช้าทำให้เกิดหมอกและไอน้ำได้บ่อย ส่งผลต่อทัศนวิสัยทางเรือและถนน" },
                { id: "h_flood", name: "น้ำท่วมพื้นที่ลุ่ม", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "พื้นที่ลุ่มรับน้ำรอบทะเลน้อยเสี่ยงน้ำท่วมจากฝนสะสมและน้ำหนุน" },
                { id: "h_lightning_storm", name: "พายุฝนฟ้าคะนองกลางพื้นที่เปิด", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "การอยู่กลางเรือหรือพื้นที่โล่งในช่วงมีฟ้าคะนองเสี่ยงอันตรายจากลมแรงและฟ้าผ่า" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 24-33°C, ร้อนชื้น ฝนตก มิ.ย.-ต.ค.",
            "terrain": "ภูเขาและป่า ทะเลสาบสงขลาในภาคกลาง",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลพัทลุง",
                    "number": "074-609500"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "วัฒนธรรมโบราณ",
                "content": "พัทลุงเป็นแหล่งกำเนิดหนังตะลุงและการเต้นโนรา มีงานเทศกาลนัดพบศิลปินพื้นบ้านและการแสดงโนราในชุมชนหลายแห่ง.",
                "type": "culture"
            },
            {
                "title": "อุทยานทะเลน้อย",
                "content": "ทะเลน้อยเป็นสถานที่ดูนกน้ำจืดที่ใหญ่ที่สุดในประเทศไทย ตั้งอยู่ในอ.สิงหนคร แสงเย็นเหนือผืนน้ำระยิบระยับ เหมาะกับการล่องเรือชมธรรมชาติ.",
                "type": "culture"
            },
            {
                "title": "เส้นทางการเดินทาง",
                "content": "ถนน 4 เชื่อมต่อมาจากสงขลาเข้าสู่เมืองพัทลุง หลังจากนั้นเลี้ยวซ้ายไปหาดใหญ่หรือใต้เมืองดอนหอยหลอดมีสะพานปูยักษ์ ช่วงหน้าฝนถนนทางหลวงอาจท่วมขังได้.",
                "type": "route"
            },
            {
                "title": "อาหารใต้",
                "content": "พัทลุงมีอาหารรสจัด เช่น ขนมจีนโบราณ รสเค็มหวาน, หมูย่างเมืองลุง และของหวานเช่น ข้าวเหนียวอ่าง (ข้าวเหนียวหวานมะพร้าวอ่อน) ท้องถิ่น.",
                "type": "food"
            }
        ],
        "supplyPoints": [
            {
                "type": "clinic",
                "label": "โรงพยาบาลพัทลุง",
                "area": "อ.เมืองพัทลุง",
                "note": "โรงพยาบาลหลักของจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมัน ปตท. ริมถนน 4",
                "area": "อ.เมืองพัทลุง",
                "note": "สะดวกซื้อและร้านกาแฟ",
                "openHours": "6:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขาพัทลุง",
                "area": "อ.เมืองพัทลุง",
                "note": "ATM 24ชม.",
                "openHours": "9:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "7-Eleven (ต.ท่ามิหรำ)",
                "area": "อ.เมืองพัทลุง",
                "note": "ร้านสะดวกซื้อในตัวเมือง",
                "openHours": "24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "หาดใหญ่",
                "สงขลา",
                "ตรัง"
            ],
            "commonDestinations": [
                "ทะเลน้อย",
                "วัดคูหาสวรรค์ (เมืองลุงเก่า)",
                "ฟาร์มเห็ดบ้านคีรีวง",
                "สะพานติณสูลานนท์ (สะพานปูยักษ์)",
                "เขาพับผ้า"
            ],
            "transitHubs": [
                "สนามบินหาดใหญ่",
                "สถานีรถไฟพัทลุง",
                "สถานีขนส่งพัทลุง"
            ],
            "routeNotes": [
                "ถนน 4 จากหาดใหญ่มุ่งหน้าไปสงขลา – สุราษฎร์ฯ",
                "ใช้เส้นทางเลี่ยงขึ้น-ลงสะพานลอยที่นาทับ อ.ควนขนุน",
                "จัดเวิร์คช็อปศิลปะพื้นบ้านที่ควนมาลัย"
            ]
        }
    },
    "Chumphon": {
        "transport": [
            {
                "name": "รถสองแถวชุมพร",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "สองแถววิ่งรับส่งในเมืองชุมพร",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#2E8B57"
            },
            {
                "name": "เรือเฟอร์รี่ ขนอม-เกาะสมุย",
                "shortName": "เรือเฟอร์รี่",
                "type": "boat",
                "description": "เรือเฟอร์รี่ข้ามฟากจากฝั่งชุมพรไปสมุย",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#1E40AF"
            },
            {
                "name": "แท็กซี่มิเตอร์ชุมพร",
                "shortName": "แท็กซี่",
                "type": "other",
                "description": "บริการแท็กซี่มิเตอร์ในตัวเมืองชุมพร",
                "warpUrl": "",
                "logoText": "🚖",
                "color": "#8A2BE2"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - ชุมพร",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "สถานีกรุงเทพ",
                "to": "สถานีชุมพร",
                "via": [
                    "ราชบุรี",
                    "ประจวบคีรีขันธ์"
                ],
                "departureTimes": [
                    "08:45",
                    "20:30"
                ],
                "duration": "8-9 ชม.",
                "baseFare": 450,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีหัวลำโพง",
                "notes": null
            },
            {
                "name": "สาย 2: หมอชิต - ชุมพร",
                "type": "bus",
                "operator": "บขส.",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งชุมพร",
                "via": [
                    "ราชบุรี",
                    "ประจวบฯ"
                ],
                "departureTimes": [
                    "09:00",
                    "21:00"
                ],
                "duration": "8 ชม.",
                "baseFare": 650,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 3: ราชบุรี - ชุมพร",
                "type": "bus",
                "operator": "บขส.",
                "from": "สถานีขนส่งราชบุรี",
                "to": "สถานีขนส่งชุมพร",
                "via": [
                    "เพชรบุรี",
                    "ประจวบฯ"
                ],
                "departureTimes": [
                    "10:00",
                    "18:00"
                ],
                "duration": "6 ชม.",
                "baseFare": 450,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งราชบุรี",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "แกงส้มชะอมกุ้ง",
                "priceRange": "60-100฿",
                "category": "local",
                "note": "แกงส้มรสจัดใส่ชะอมและกุ้งสด"
            },
            {
                "name": "ประทัดชัยทอด",
                "priceRange": "50฿",
                "category": "street",
                "note": "ปลาช่อนอบกรอบเนื้อนุ่ม ทำเป็นชิ้นทอด"
            },
            {
                "name": "ขนมเส้น",
                "priceRange": "30-50฿",
                "category": "street",
                "note": "ขนมเส้นข้าวเจ้าใส่ไข่ ราดเครื่องน้ำจิ้ม"
            },
            {
                "name": "ส้มตำสัญชาติไทย",
                "priceRange": "30-50฿",
                "category": "street",
                "note": "ส้มตำสูตรชุมพรใส่ปูเค็ม"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-700฿/คืน",
                "examples": [
                    "Krungthong Mansion",
                    "Phatchara Residence"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-2000฿/คืน",
                "examples": [
                    "Vico Residence",
                    "Iwade Hotel"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2000-6000฿/คืน",
                "examples": [
                    "Chaolay Hotel",
                    "Blue Andaman Lanta"
                ],
                "bookingUrl": ""
            }
        ],
        "dangerZones": [
            {
                "label": "พายุโซนร้อน",
                "severity": "high",
                "note": "พายุชายฝั่งในช่วง มิ.ย.-ต.ค.",
                "season": "มิ.ย.-ต.ค."
            },
            {
                "label": "เส้นทางขาดกลางฝน",
                "severity": "medium",
                "note": "ถนนบางสายเกิดสไลด์ดินชำรุดในฤดูฝน",
                "season": "ก.ย.-พ.ย."
            }
        ],
        "ecoIds": [
                "fl_mangrove",
                "fl_seagrass",
                "f_green_turtle",
                "f_crabeating_macaque",
                "t_archipelago_coast",
                "c_northeast_monsoon",
                "h_rough_sea",
                "h_flash_flood"
        ],
        "newEcoEntities": [
                { id: "fl_mangrove", name: "ป่าชายเลน", category: "flora", tags: ["common"], desc: "ชุมพรมีป่าชายเลนตามปากอ่าวและชายฝั่งซึ่งเป็นฐานอนุบาลสัตว์น้ำและช่วยลดคลื่น" },
                { id: "fl_seagrass", name: "หญ้าทะเล", category: "flora", tags: ["common","rare","protected"], desc: "พบเป็นหย่อมในพื้นที่อ่าวตื้นและช่วยพยุงความสมบูรณ์ของทะเลชายฝั่ง" },
                { id: "f_green_turtle", name: "เต่าตนุ", category: "fauna", tags: ["rare","danger","protected"], desc: "เต่าตนุพบในเขตอุทยานทางทะเลของชุมพร โดยเฉพาะบริเวณเกาะและแนวปะการัง" },
                { id: "f_crabeating_macaque", name: "ลิงแสม", category: "fauna", tags: ["common","danger"], desc: "ลิงแสมพบตามชายฝั่งและป่าชายเลน หากคุ้นคนมากจะมีพฤติกรรมแย่งอาหารได้" },
                { id: "t_archipelago_coast", name: "ชายฝั่งยาวและหมู่เกาะทะเล", category: "terrain", tags: ["common"], desc: "ชุมพรเด่นด้วยชายฝั่งยาว หมู่เกาะจำนวนมาก และอ่าวที่เหมาะต่อระบบนิเวศทะเล" },
                { id: "c_northeast_monsoon", name: "มรสุมฝั่งอ่าวไทย", category: "climate", tags: ["common","danger","seasonal"], desc: "ปลายปีชุมพรมีคลื่นลมแรงและฝนต่อเนื่องจากมรสุมตะวันออกเฉียงเหนือ" },
                { id: "h_rough_sea", name: "คลื่นลมแรงทางทะเล", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "เรือเล็กและกิจกรรมทะเลมีความเสี่ยงสูงขึ้นมากในช่วงคลื่นลมแรงฝั่งอ่าวไทย" },
                { id: "h_flash_flood", name: "น้ำหลากจากฝนหนัก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ฝนหนักต่อเนื่องสามารถทำให้ลุ่มน้ำสั้นของชุมพรเกิดน้ำหลากเข้าพื้นที่ชุมชนได้รวดเร็ว" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 24-32°C, ร้อนชื้น ฝนตก พ.ค.-ต.ค.",
            "terrain": "ชายฝั่ง ทะเล และป่าเขตร้อน",
            "bestSeason": "ม.ค.-เม.ย.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลชุมพร",
                    "number": "077-503672"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "ภูมิอากาศร้อนชื้น",
                "content": "ชุมพรมีอากาศร้อนตลอดปี ช่วงมกราคม-เมษายน เป็นฤดูแล้งที่เหมาะกับกิจกรรมทางน้ำและดำน้ำดูปะการัง (ก.ย.-ต.ค.ฝนตกมากสุด).",
                "type": "season"
            },
            {
                "title": "เกาะใกล้เคียง",
                "content": "ชุมพรเป็นจุดเริ่มต้นเดินทางไปเกาะเต่า เกาะพงัน และเกาะสมุย. ท่าเรือทุ่งวัวแล่นให้บริการเรือข้ามฟากไปยังเกาะชุมพร (หาดท่าเรือ) และเกาะศรีบอยา.",
                "type": "route"
            },
            {
                "title": "การเดินทางโดยรถไฟ",
                "content": "สถานีรถไฟชุมพรอยู่ใกล้ตัวเมืองมาก จึงสะดวกในการขึ้นรถไฟจากกรุงเทพฯ. มีรถไฟด่วนไปชุมพรหลายขบวนในแต่ละวัน ให้เช็คตารางเวลาล่วงหน้า.",
                "type": "route"
            },
            {
                "title": "อาหารทะเลสด",
                "content": "ชุมพรมีของทะเลสด เช่น ปลาหมึก ปูม้า หอยหวาน ที่ตลาดสด ในช่วงเช้า ส่วนอาหารพื้นถิ่นเป็นปลาร้าและแกงเหลืองที่นิยมกินกับข้าวยำ.",
                "type": "food"
            }
        ],
        "supplyPoints": [
            {
                "type": "clinic",
                "label": "โรงพยาบาลชุมพรเขตรอุดมศักดิ์",
                "area": "อ.เมืองชุมพร",
                "note": "โรงพยาบาลศูนย์",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. สถานีหัวรถไฟชุมพร",
                "area": "อ.เมืองชุมพร",
                "note": "ใกล้สถานีรถไฟ, มีร้านสะดวกซื้อ",
                "openHours": "5:00-22:30",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกรุงไทย สาขาชุมพร",
                "area": "อ.เมืองชุมพร",
                "note": "ATM 24 ชม.",
                "openHours": "9:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "7-Eleven (หน้าสถานีรถไฟชุมพร)",
                "area": "อ.เมืองชุมพร",
                "note": "ร้านสะดวกซื้อและจุดจอดรถแท็กซี่",
                "openHours": "24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพมหานคร (รถไฟ/รถบัส)",
                "สุราษฎร์ธานี",
                "นครศรีธรรมราช"
            ],
            "commonDestinations": [
                "เกาะเต่า",
                "อ่าวทุ่งวัวแล่น",
                "พระมหาธาตุเจดีย์นครชุมพร",
                "หาดภราดรภาพ",
                "วนอุทยานเขตรักษาพันธุ์สัตว์ป่าหมู่เกาะชุมพร"
            ],
            "transitHubs": [
                "สถานีรถไฟชุมพร",
                "สนามบินชุมพร (เล็กมาก)",
                "ท่าเรือทุ่งวัวแล่น"
            ],
            "routeNotes": [
                "ทางหลวง 4 ผ่านเมืองหลัก ชุมพร - ถนนเลี่ยงเมือง (41): แนะนำผ่านสุราษฎร์ธานี",
                "ช่วงการ์ดฤดูฝนต้องระวังน้ำท่วมถนน 4 ช่วงเดือนกันยา-ต.ค.",
                "มีจุดชมวิวทะเลที่เขาปฐวี และอุทยานใต้ทะเลหมู่เกาะชุมพร"
            ]
        }
    }
};
