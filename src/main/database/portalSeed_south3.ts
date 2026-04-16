// Portal seed data: ภาคใต้ Part 3 (4 จังหวัด)
// Source: documents/deepreserach/part6_ภาคใต้.md
import type { ProvincePortalSeedData } from './db';

export const southPart3: Record<string, ProvincePortalSeedData> = {
    "Ranong": {
        "transport": [
            {
                "name": "สองแถวกระบี่-ระนอง",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวเชื่อมต่อกระบี่และระนอง",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#8B4513"
            },
            {
                "name": "เรือข้ามฟากเกาะพยาม",
                "shortName": "สปีดโบ๊ท",
                "type": "boat",
                "description": "เรือเร็วเชื่อมระนองกับเกาะพยาม",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#1565C0"
            },
            {
                "name": "รถตู้ด่วนเมืองระนอง",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้โดยสารภายในจังหวัดระนอง",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#556B2F"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - ระนอง",
                "type": "bus",
                "operator": "บขส.",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งระนอง",
                "via": [
                    "เพชรบุรี",
                    "ชุมพร"
                ],
                "departureTimes": [
                    "09:00",
                    "21:00"
                ],
                "duration": "9 ชม.",
                "baseFare": 650,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 2: พังงา - ระนอง",
                "type": "bus",
                "operator": "บขส.",
                "from": "สถานีขนส่งพังงา",
                "to": "สถานีขนส่งระนอง",
                "via": [],
                "departureTimes": [
                    "06:00",
                    "14:00"
                ],
                "duration": "2 ชม.",
                "baseFare": 150,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "สถานีขนส่งพังงา",
                "notes": null
            },
            {
                "name": "สาย 3: ท่าเรือระนอง - หัวดอน",
                "type": "boat",
                "operator": "เรือเฟอร์รี่",
                "from": "ท่าเรือระนอง",
                "to": "เกาะหัวดอน",
                "via": [],
                "departureTimes": [
                    "08:30",
                    "16:30"
                ],
                "duration": "2 ชม.",
                "baseFare": 300,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "ท่าเรือระนอง",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ไข่แมงดา",
                "priceRange": "50฿",
                "category": "local",
                "note": "ไข่แมงดาทอดหรือผัดสะดุ้ง ลักษณะคล้ายหน่อไม้"
            },
            {
                "name": "น้ำพริกน้ำย้อย",
                "priceRange": "30-50฿",
                "category": "local",
                "note": "น้ำพริกใต้ใส่กะทิและหอมแดงทอด"
            },
            {
                "name": "ข้าวยำปักษ์ใต้",
                "priceRange": "50-70฿",
                "category": "local",
                "note": "ข้าวคลุกพริกแกงใต้พร้อมเครื่องเคียง"
            },
            {
                "name": "หอยหวานผัดฉ่า",
                "priceRange": "60-100฿",
                "category": "local",
                "note": "หอยหวานผัดสมุนไพรจันท์"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "500-1000฿/คืน",
                "examples": [
                    "Narong Hotel",
                    "Aek Chan Hotel"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1200-3000฿/คืน",
                "examples": [
                    "Sk Residence",
                    "Ranong City Hotel"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "3500-8000฿/คืน",
                "examples": [
                    "Zcape Hotel",
                    "Tew Lay Bar & Pool Villa"
                ],
                "bookingUrl": ""
            }
        ],
        "dangerZones": [
            {
                "label": "ดินถล่ม",
                "severity": "medium",
                "note": "ฝนตกหนักอาจทำให้ดินถล่มบนภูเขา",
                "season": "มิ.ย.-พ.ย."
            },
            {
                "label": "สัตว์มีพิษ",
                "severity": "medium",
                "note": "งูและแมงป่องในป่าฝนชุกชุม",
                "season": null
            }
        ],
        "ecoIds": [
                "fl_mangrove",
                "fl_seagrass",
                "f_dugong",
                "f_crabeating_macaque",
                "t_estuary_mangrove",
                "c_extreme_rainfall",
                "h_landslide",
                "h_rough_sea"
        ],
        "newEcoEntities": [
                { id: "fl_mangrove", name: "ป่าชายเลน", category: "flora", tags: ["common"], desc: "ระนองมีป่าชายเลนกว้างมาก โดยเฉพาะแนวลำน้ำกระบุรีและชายฝั่งทะเลตื้น" },
                { id: "fl_seagrass", name: "หญ้าทะเล", category: "flora", tags: ["common","rare","protected"], desc: "มีแหล่งหญ้าทะเลในอ่าวบางเบนและแนวชายฝั่งบางส่วนของระนอง แม้บางพื้นที่มีสภาพเปลี่ยนแปลงได้" },
                { id: "f_dugong", name: "พะยูน", category: "fauna", tags: ["common","rare","protected"], desc: "แนวชายฝั่งอันดามันตอนบนรวมถึงระนองอยู่ในช่วงกระจายของพะยูนที่ใช้แหล่งหญ้าทะเล" },
                { id: "f_crabeating_macaque", name: "ลิงแสม", category: "fauna", tags: ["common","danger"], desc: "ลิงแสมพบได้ตามแนวชายฝั่งและป่าชายเลนของระนอง โดยเฉพาะพื้นที่คนผ่านบ่อย" },
                { id: "t_estuary_mangrove", name: "ปากแม่น้ำและป่าชายเลนกว้าง", category: "terrain", tags: ["common","danger"], desc: "ภูมิประเทศระนองเด่นด้วยปากแม่น้ำเลน ป่าชายเลน และชายฝั่งอันดามันตอนบนที่รับฝนมาก" },
                { id: "c_extreme_rainfall", name: "ฝนตกชุกมาก", category: "climate", tags: ["common","danger","seasonal"], desc: "ระนองเป็นหนึ่งในจังหวัดที่ฝนมากของไทยจากอิทธิพลมรสุมฝั่งอันดามันและภูเขารับลม" },
                { id: "h_landslide", name: "ดินถล่มและถนนภูเขาอันตราย", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ฝนหนักยาวนานทำให้พื้นที่ลาดชันของระนองเสี่ยงดินถล่มและหินหล่น" },
                { id: "h_rough_sea", name: "ทะเลแปรปรวนและเรือเล็กงดออก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ในฤดูมรสุมอันดามัน ระนองมีคลื่นแรงและฝนลดทัศนวิสัยต่อการเดินเรืออย่างชัดเจน" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 24-32°C, ชื้น ฝนตกพายุมรสุม ช่วง มิ.ย.-ต.ค.",
            "terrain": "ป่าฝนเขตร้อน ภูเขาสลับซับซ้อน ชายฝั่งทะเลอันดามัน",
            "bestSeason": "ม.ค.-มี.ค.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลระนอง",
                    "number": "077-812630"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "ฤดูฝนยาวนาน",
                "content": "ระนองมีฤดูฝนยาวนานถึง 8 เดือนต่อปี (พ.ค.-ต.ค.). ช่วงที่ฝนตกชุกที่สุดคือพฤษภาคมถึงตุลาคม จึงแนะนำเที่ยวช่วงฤดูแล้ง (พ.ย.-เม.ย.).",
                "type": "season"
            },
            {
                "title": "แหล่งน้ำพุร้อน",
                "content": "มีแหล่งน้ำพุร้อนรัษฏาน้ำร้อนเด่นชื่อดัง ซึ่งเป็นสมบัติของเมืองระนอง โดยแวะชมหรือแช่น้ำร้อนได้ที่อุทยานแห่งชาติน้ำตกหงาวใกล้ตัวเมือง.",
                "type": "culture"
            },
            {
                "title": "วัฒนธรรมจีนและญี่ปุ่น",
                "content": "ชุมชนโบราณระนองได้รับอิทธิพลจากจีนฮกเกี้ยน มีสถาปัตยกรรมจีนเก่าแก่ เช่น ศาลเจ้าจีน ร่วมกับประวัติระวังโอกุระซึ่งมีเชื้อสายญี่ปุ่นจากตลาดย้ายมา.",
                "type": "culture"
            },
            {
                "title": "การเดินทางสู่เมียนมา",
                "content": "ระนองเป็นประตูสู่เมียนมา มีเรือหางยาวรับส่งไปเกาะไตหรือวิคตอเรียพอยท์ (เมียนมา) ใกล้ชายแดน ค่าโดยสารประมาณ 200–300 บาท ต้องผ่านด่านตรวจคนเข้าเมืองไทย-เมียนมา.",
                "type": "route"
            },
            {
                "title": "เกาะเงียบสงบ",
                "content": "เกาะพยามเป็นเกาะชื่อดังที่เที่ยวได้ตลอดปี ใช้เวลา 1-2 ชั่วโมงจากท่าเรือเมือง, หาดทรายขาว สงบ มีป่าฝนและชุมชนชาวเลเหมาะกับพักผ่อน.",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "clinic",
                "label": "โรงพยาบาลระนอง",
                "area": "อ.เมืองระนอง",
                "note": "โรงพยาบาลหลักจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. ริมถนน 4",
                "area": "อ.เมืองระนอง",
                "note": "ติดถนนเพชรเกษมสายเก่า (หลวง 4 เก่า)",
                "openHours": "6:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขาระนอง",
                "area": "อ.เมืองระนอง",
                "note": "ATM 24 ชม.",
                "openHours": "9:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "7-Eleven (อำเภอเมืองระนอง)",
                "area": "อ.เมืองระนอง",
                "note": "ร้านสะดวกซื้อ 24 ชม. หลายสาขาในตัวเมือง",
                "openHours": "24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพมหานคร",
                "สุราษฎร์ธานี",
                "ชุมพร"
            ],
            "commonDestinations": [
                "ระนอง",
                "เกาะพยาม",
                "น้ำตกหงาว",
                "สะพานคอยชมวิว",
                "พิพิธภัณฑสถานแห่งชาติระนอง"
            ],
            "transitHubs": [
                "สถานีขนส่งระนอง",
                "สนามบินระนอง",
                "ท่าเรือระนอง"
            ],
            "routeNotes": [
                "ถนนเพชรเกษม 4 ผ่านระนอง สู่พังงา (ทางสายหลักการเดินทาง)",
                "เส้นทางสู่เกาะพยาม มีเรือบริการออกจากท่าเรือเมือง",
                "ช่วงฝนตกหนักถนน 4 ช่วงน้ำตกเขาน้ำผุด มักจะลื่น"
            ]
        }
    },
    "Yala": {
        "transport": [
            {
                "name": "รถสองแถวยะลา",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "สองแถววิ่งรับส่งในเมืองยะลา",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#483D8B"
            },
            {
                "name": "รถตู้ยะลา-เบตง",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้บริการยะลา-เบตง",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#9400D3"
            },
            {
                "name": "แท็กซี่มือสองเบตง",
                "shortName": "แท็กซี่",
                "type": "other",
                "description": "รถแท็กซี่ให้บริการที่อำเภอเบตง",
                "warpUrl": "",
                "logoText": "🚖",
                "color": "#8B0000"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - เบตง",
                "type": "van",
                "operator": "บขส.",
                "from": "สถานีขนส่งหมอชิต 2",
                "to": "สถานีขนส่งเบตง",
                "via": [
                    "นครปฐม",
                    "ชุมพร",
                    "สตูล"
                ],
                "departureTimes": [
                    "19:00"
                ],
                "duration": "16 ชม.",
                "baseFare": 1000,
                "frequency": "วันละครั้ง",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 2: หาดใหญ่ - ยะลา",
                "type": "bus",
                "operator": "บขส.",
                "from": "สถานีขนส่งหาดใหญ่ 2",
                "to": "สถานีขนส่งยะลา",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "14:00"
                ],
                "duration": "2 ชม.",
                "baseFare": 200,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "สถานีขนส่งหาดใหญ่ 2",
                "notes": null
            },
            {
                "name": "สาย 3: ยะลา - ด่านเบตง",
                "type": "boat",
                "operator": "เรือคลองลำธาร",
                "from": "สถานีขนส่งยะลา",
                "to": "สถานีขนส่งเบตง",
                "via": [],
                "departureTimes": [
                    "07:00"
                ],
                "duration": "1 ชม.",
                "baseFare": 150,
                "frequency": "วันละ 1 เที่ยว",
                "terminal": "สถานีขนส่งยะลา",
                "notes": "เดินทางโดยเรือชมทิวทัศน์แม่น้ำยะลา"
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวยำหาดใหญ่",
                "priceRange": "40-60฿",
                "category": "local",
                "note": "ข้าวคลุกพริกแกงใต้หวานอมเปรี้ยว"
            },
            {
                "name": "หมูทุบ",
                "priceRange": "40฿",
                "category": "local",
                "note": "หมูยอทอดหรือหมูย่างกรอบ ท้องถิ่นใต้"
            },
            {
                "name": "ข้าวเหนียวดำ",
                "priceRange": "20฿",
                "category": "dessert",
                "note": "ข้าวเหนียวดำราดกะทิหวานอร่อย"
            },
            {
                "name": "ไก่ย่างเบตง",
                "priceRange": "100฿",
                "category": "street",
                "note": "ไก่ย่างหมักเครื่องเทศ นุ่มชุ่มฉ่ำ"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "400-800฿/คืน",
                "examples": [
                    "โรงแรมเบตง รัตนการ์เด้น",
                    "City Inn Yala"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1000-2500฿/คืน",
                "examples": [
                    "โรงแรมยะลาปาร์ค",
                    "โรงแรมเดอะซิตี"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2500-6000฿/คืน",
                "examples": [
                    "โรงแรมเปอร์เซโฟนี เบตง"
                ],
                "bookingUrl": ""
            }
        ],
        "dangerZones": [
            {
                "label": "เหตุการณ์ความไม่สงบ",
                "severity": "high",
                "note": "พื้นที่ชายแดนใต้เสี่ยงเหตุการณ์ไม่สงบ",
                "season": null
            },
            {
                "label": "น้ำท่วม",
                "severity": "medium",
                "note": "ฝนตกหนักทำให้น้ำท่วมขังบางพื้นที่",
                "season": "ต.ค.-พ.ย."
            }
        ],
        "ecoIds": [
                "fl_wild_orchid",
                "fl_rattan",
                "f_hornbill",
                "f_siamang",
                "t_mountain_rainforest",
                "c_wet_tropical",
                "h_flash_flood",
                "h_landslide"
        ],
        "newEcoEntities": [
                { id: "fl_wild_orchid", name: "กล้วยไม้ป่า", category: "flora", tags: ["common","rare","protected","seasonal"], desc: "ป่าดิบชื้นของยะลามีความหลากหลายทางพืชสูง รวมถึงกล้วยไม้ป่าหลายชนิด" },
                { id: "fl_rattan", name: "หวายป่า", category: "flora", tags: ["common","danger"], desc: "พืชเด่นของป่าฝนภาคใต้ พบเป็นกอหรือเถามีหนามตามป่าทึบ" },
                { id: "f_hornbill", name: "นกเงือก", category: "fauna", tags: ["common","protected"], desc: "ฮาลา-บาลาเป็นพื้นที่เด่นของนกเงือกภาคใต้และมีความสำคัญต่อการอนุรักษ์ในระดับประเทศ" },
                { id: "f_siamang", name: "ชะนีสยามัง", category: "fauna", tags: ["rare","danger","protected"], desc: "ไพรเมตเด่นของป่าฝนตอนล่าง พบในผืนป่าติดชายแดนที่ยังคงความสมบูรณ์" },
                { id: "t_mountain_rainforest", name: "ป่าดิบชื้นภูเขา", category: "terrain", tags: ["common","danger"], desc: "ยะลามีภูมิประเทศเป็นป่าฝนภูเขาและหุบเขาลึกซึ่งเป็นแหล่งต้นน้ำสำคัญ" },
                { id: "c_wet_tropical", name: "อากาศชื้นฝนตกบ่อย", category: "climate", tags: ["common","danger","seasonal"], desc: "พื้นที่ป่าฝนตอนล่างของยะลามีความชื้นสูงและฝนตกบ่อย ทำให้ทางป่าลื่นและทัศนวิสัยต่ำ" },
                { id: "h_flash_flood", name: "น้ำป่าไหลหลาก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ลุ่มน้ำภูเขาสั้นและชันทำให้ยะลามีความเสี่ยงน้ำหลากหลังฝนหนักได้รวดเร็ว" },
                { id: "h_landslide", name: "ดินถล่ม", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "พื้นที่ลาดชันและฝนตกต่อเนื่องเพิ่มความเสี่ยงดินถล่มในเส้นทางภูเขา" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 24-31°C, ร้อนชื้น ฝนตกหนัก ก.ย.-พ.ย.",
            "terrain": "ภูเขาสูง ป่าเขตร้อน ทางตอนใต้สุดของไทย",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลยะลา",
                    "number": "073-244711"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "คำเตือนการเดินทาง",
                "content": "ทางการแนะนำให้หลีกเลี่ยงการเดินทางไปยะลา เนื่องจากยังมีสถานการณ์ความไม่สงบและเหตุร้ายเกิดขึ้น.",
                "type": "safety"
            },
            {
                "title": "วัฒนธรรมมลายู",
                "content": "ยะลาเป็นจังหวัดชายแดน มีประชากรส่วนใหญ่เป็นชาวมุสลิมเชื้อสายมาเลย์ วัฒนธรรมและประเพณีจึงผสมผสานแบบไทยมลายู (นิคมต้นไม้, ร้องโนรา)",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "clinic",
                "label": "โรงพยาบาลยะลา",
                "area": "อ.เมืองยะลา",
                "note": "โรงพยาบาลหลัก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มบางจาก ศาลากลางยะลา",
                "area": "อ.เมืองยะลา",
                "note": "ใกล้ถนนสายหลัก 410, 42",
                "openHours": "6:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกสิกรไทย สาขายะลา",
                "area": "อ.เมืองยะลา",
                "note": "ATM 24 ชม.",
                "openHours": "9:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจท่องเที่ยวยะลา",
                "area": "อ.เมืองยะลา",
                "note": "ขอความช่วยเหลือฉุกเฉิน",
                "openHours": "0:00-24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "หาดใหญ่ (รถยนต์)",
                "กรุงเทพฯ (เครื่องบิน)",
                "ยะลา (รถท้องถิ่น)"
            ],
            "commonDestinations": [
                "ควนโดน (หมู่บ้านศิลป์พื้นบ้าน)",
                "น้ำตกสายรุ้ง",
                "สวนสัตว์เปิดยะลา",
                "มัสยิดกลางยะลา"
            ],
            "transitHubs": [
                "สนามบินยะลา",
                "สถานีขนส่งยะลา",
                "สถานีรถไฟยะลา (สายใต้เดิม)"
            ],
            "routeNotes": [
                "บางพื้นที่ในยะลาเป็นเขตปลอดภัยสูง (ต้องมีหนังสือเดินทางราชการหรือเอกสารแนะนำ)",
                "ถนนทางเข้าตัวเมืองมีด่านตรวจหลายจุด ควรเตรียมเอกสารส่วนตัว"
            ]
        }
    },
    "Pattani": {
        "transport": [
            {
                "name": "สองแถวปัตตานี",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "สองแถวรับจ้างในเมืองปัตตานี",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#8B0000"
            },
            {
                "name": "แท็กซี่มิเตอร์ปัตตานี",
                "shortName": "แท็กซี่",
                "type": "other",
                "description": "แท็กซี่มิเตอร์ให้บริการทั่วไป",
                "warpUrl": "",
                "logoText": "🚖",
                "color": "#FF4500"
            },
            {
                "name": "เรือข้ามคลองน้ำท่า",
                "shortName": "เรือโดยสาร",
                "type": "boat",
                "description": "เรือข้ามคลองไปยังฝั่งบางนรา",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#1E40AF"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: หาดใหญ่ - ปัตตานี",
                "type": "bus",
                "operator": "รถตู้สาธารณะ",
                "from": "สถานีขนส่งหาดใหญ่ 2",
                "to": "สถานีขนส่งปัตตานี",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "13:00"
                ],
                "duration": "1.5 ชม.",
                "baseFare": 150,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "สถานีขนส่งหาดใหญ่ 2",
                "notes": null
            },
            {
                "name": "สาย 2: กรุงเทพฯ - ปัตตานี",
                "type": "plane",
                "operator": "Bangkok Airways",
                "from": "สนามบินดอนเมือง",
                "to": "สนามบินปัตตานี",
                "via": [],
                "departureTimes": [
                    "11:00",
                    "19:00"
                ],
                "duration": "1 ชม.",
                "baseFare": 950,
                "frequency": "หลายเที่ยวต่อวัน",
                "terminal": "สนามบินดอนเมือง",
                "notes": null
            },
            {
                "name": "สาย 3: อ.เมือง - อำเภอสายบุรี",
                "type": "bus",
                "operator": "เทศบาลปัตตานี",
                "from": "ตัวเมืองปัตตานี",
                "to": "สายบุรี",
                "via": [],
                "departureTimes": [
                    "08:00"
                ],
                "duration": "1 ชม.",
                "baseFare": 100,
                "frequency": "วันละ 1 เที่ยว",
                "terminal": "ตัวเมืองปัตตานี",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวหมกไก่",
                "priceRange": "50฿",
                "category": "street",
                "note": "ข้าวหมกกลิ่นหอมเครื่องเทศแบบมุสลิม"
            },
            {
                "name": "มัสมั่นไก่",
                "priceRange": "60-100฿",
                "category": "local",
                "note": "แกงมัสมั่นเครื่องเทศมุสลิมรสกลมกล่อม"
            },
            {
                "name": "ข้าวเหนียวดำปิ้ง",
                "priceRange": "20฿",
                "category": "street",
                "note": "ข้าวเหนียวท้องถิ่นปิ้งกับกะทิราดเผือก"
            },
            {
                "name": "น้ำส้มปั่น",
                "priceRange": "30-50฿",
                "category": "drink",
                "note": "น้ำส้มคั้นสดปั่นแบบใส่น้ำแข็ง"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-700฿/คืน",
                "examples": [
                    "BS Boutique Hotel Pattani",
                    "Shaik Sulaiman Hotel"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-2000฿/คืน",
                "examples": [
                    "Aditya Hotel Pattani",
                    "Koh Si Pattani"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2000-6000฿/คืน",
                "examples": [
                    "โรงแรมปัตตานีเทอร์มินอล"
                ],
                "bookingUrl": ""
            }
        ],
        "dangerZones": [
            {
                "label": "เหตุการณ์ความไม่สงบ",
                "severity": "high",
                "note": "พื้นที่ชายแดนใต้ยังมีเหตุการณ์รุนแรง",
                "season": null
            },
            {
                "label": "อุบัติเหตุทางถนน",
                "severity": "medium",
                "note": "รถวิ่งเร็วบนถนนทางชัน",
                "season": null
            }
        ],
        "ecoIds": [
                "fl_mangrove",
                "fl_nipa_palm",
                "f_migratory_shorebird",
                "f_smoothcoated_otter",
                "t_intertidal_mudflat",
                "c_gulf_monsoon",
                "h_coastal_flood",
                "h_habitat_degradation"
        ],
        "newEcoEntities": [
                { id: "fl_mangrove", name: "ป่าชายเลน", category: "flora", tags: ["common"], desc: "อ่าวปัตตานีมีป่าชายเลนและหาดเลนกว้างซึ่งเป็นฐานสำคัญของสัตว์น้ำและนกชายเลน" },
                { id: "fl_nipa_palm", name: "จาก", category: "flora", tags: ["common","edible"], desc: "พืชชายเลนสำคัญของพื้นที่น้ำกร่อย ใช้ประโยชน์ในชุมชนชายฝั่งและช่วยพยุงตะกอน" },
                { id: "f_migratory_shorebird", name: "นกชายเลนอพยพ", category: "fauna", tags: ["common","protected","seasonal"], desc: "อ่าวปัตตานีเป็นพื้นที่สำคัญระดับนานาชาติของนกชายเลนอพยพและนกน้ำรวมฝูง" },
                { id: "f_smoothcoated_otter", name: "นากใหญ่ขนเรียบ", category: "fauna", tags: ["common","rare","protected"], desc: "เป็นสัตว์เลี้ยงลูกด้วยนมที่มีรายงานในระบบอ่าวปัตตานี โดยพึ่งพาพื้นที่ชุ่มน้ำและแหล่งปลา" },
                { id: "t_intertidal_mudflat", name: "หาดเลนระหว่างน้ำขึ้นน้ำลง", category: "terrain", tags: ["common","danger"], desc: "ภูมิประเทศเด่นของปัตตานีคืออ่าวตื้น หาดเลน และป่าชายเลนกว้างที่เชื่อมกับแม่น้ำหลายสาย" },
                { id: "c_gulf_monsoon", name: "ฝนหนักปลายปี", category: "climate", tags: ["common","danger","seasonal"], desc: "มรสุมตะวันออกเฉียงเหนือส่งผลให้ปัตตานีมีฝนสะสมและคลื่นลมแรงในช่วงปลายปี" },
                { id: "h_coastal_flood", name: "น้ำท่วมชายฝั่งและน้ำหนุน", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ฝนหนักร่วมกับระดับน้ำทะเลและน้ำหนุนทำให้พื้นที่ชายฝั่งลุ่มต่ำเสี่ยงน้ำท่วม" },
                { id: "h_habitat_degradation", name: "การเสื่อมโทรมของป่าชายเลนและหาดเลน", category: "climate", tags: ["danger","common","extreme"], desc: "การเปลี่ยนพื้นที่ชุ่มน้ำเป็นการใช้ประโยชน์อื่นและมลพิษกระทบถิ่นอาศัยของนกและสัตว์น้ำ" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 25-33°C, ร้อนชื้น ฝนตก พ.ค.-ต.ค.",
            "terrain": "พื้นที่ราบชายฝั่งแม่น้ำบางปะกง ภูมิประเทศส่วนใหญ่เป็นที่ราบ",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลปัตตานี",
                    "number": "073-711010"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "คำเตือนการเดินทาง",
                "content": "ทางการเตือนให้หลีกเลี่ยงการเดินทางในพื้นที่ปัตตานีบางส่วนเนื่องจากเหตุการณ์ไม่สงบ.",
                "type": "safety"
            },
            {
                "title": "มัสยิดในเมือง",
                "content": "มัสยิดสุลต่าน หรือสุไลมานนางบวช เป็นมรดกทางศิลปะและสถาปัตยกรรมอิสลามของเมืองปัตตานี, และมีสำเนาบทกราบไหว้ทหารสะกดย้อย.",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "clinic",
                "label": "โรงพยาบาลปัตตานี",
                "area": "อ.เมืองปัตตานี",
                "note": "โรงพยาบาลหลัก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. ใกล้วิทยาลัยเทคนิค",
                "area": "อ.เมืองปัตตานี",
                "note": "ติดถนนสายนครศรีฯ–ปัตตานี",
                "openHours": "6:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารอิสลามแห่งประเทศไทย สาขาปัตตานี",
                "area": "อ.เมืองปัตตานี",
                "note": "มีตู้ ATM 24 ชม.",
                "openHours": "9:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจท่องเที่ยวปัตตานี",
                "area": "อ.เมืองปัตตานี",
                "note": "ช่วยเหลือกรณีฉุกเฉินนักท่องเที่ยว",
                "openHours": "0:00-24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "หาดใหญ่",
                "สงขลา",
                "นราธิวาส"
            ],
            "commonDestinations": [
                "มัสยิดกลางปัตตานี",
                "เมืองเก่าปัตตานี",
                "ตลาดแม่กิมหยง (ยะลา)",
                "มัสยิดสุไลมาน"
            ],
            "transitHubs": [
                "สนามบินหาดใหญ่",
                "สถานีขนส่งปัตตานี"
            ],
            "routeNotes": [
                "บางพื้นที่มีการสกัดเส้นทาง ต้องเช็คข่าวสารก่อนเดินทาง",
                "ถนนสายหลัก 42 เชื่อมปัตตานี-นราธิวาส-ยะลา"
            ]
        }
    },
    "Narathiwat": {
        "transport": [
            {
                "name": "สองแถวนราธิวาส",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "สองแถวรับจ้างในเมืองนราธิวาส",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#006400"
            },
            {
                "name": "รถตุ๊กตุ๊กนราธิวาส",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "ตุ๊กตุ๊กรับจ้างในตัวเมือง",
                "warpUrl": "",
                "logoText": "🛺",
                "color": "#B22222"
            },
            {
                "name": "เรือโดยสารจากสะพานติณสูลานนท์",
                "shortName": "เรือโดยสาร",
                "type": "boat",
                "description": "เรือเชื่อมเกาะต่างๆ ในน่านน้ำทางใต้",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#4682B4"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - นราธิวาส",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "สถานีกรุงเทพ",
                "to": "สถานีนราธิวาส",
                "via": [
                    "นครปฐม",
                    "ชุมพร",
                    "ปัตตานี"
                ],
                "departureTimes": [
                    "19:10"
                ],
                "duration": "15 ชม.",
                "baseFare": 900,
                "frequency": "วันละครั้ง",
                "terminal": "สถานีหัวลำโพง",
                "notes": null
            },
            {
                "name": "สาย 2: หาดใหญ่ - นราธิวาส",
                "type": "bus",
                "operator": "บขส.",
                "from": "สถานีขนส่งหาดใหญ่ 2",
                "to": "สถานีขนส่งนราธิวาส",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "14:00"
                ],
                "duration": "3 ชม.",
                "baseFare": 200,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "สถานีขนส่งหาดใหญ่ 2",
                "notes": null
            },
            {
                "name": "สาย 3: ท่าอากาศยานนราธิวาส - กรุงเทพฯ",
                "type": "plane",
                "operator": "Bangkok Airways",
                "from": "สนามบินนราธิวาส",
                "to": "สนามบินสุวรรณภูมิ",
                "via": [],
                "departureTimes": [
                    "15:00"
                ],
                "duration": "1 ชม. 30 นาที",
                "baseFare": 1200,
                "frequency": "วันละ 1 เที่ยว",
                "terminal": "สนามบินนราธิวาส",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ไก่ผัดสะเต๊ะ",
                "priceRange": "50-70฿",
                "category": "local",
                "note": "ไก่ผัดราดน้ำกะทิเครื่องเทศใต้ใส่สะเต๊ะ"
            },
            {
                "name": "ข้าวหมกเนื้อ",
                "priceRange": "50฿",
                "category": "local",
                "note": "ข้าวหมกเนื้อแบบชาวใต้ใส่เครื่องเทศเข้มข้น"
            },
            {
                "name": "ข้าวเหนียวดำปิ้ง",
                "priceRange": "20฿",
                "category": "street",
                "note": "ข้าวเหนียวดำราดกะทิหวาน"
            },
            {
                "name": "หมี่กรอบ",
                "priceRange": "30-50฿",
                "category": "dessert",
                "note": "เส้นหมี่กรอบราดน้ำกะทิหวาน"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "Radda Hotel",
                    "Horizon Hotel Narathiwat"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-2000฿/คืน",
                "examples": [
                    "Santa Elena Hotel",
                    "The Emperor Narathiwat"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2000-6000฿/คืน",
                "examples": [
                    "โรงแรม โกลเด้น เบด"
                ],
                "bookingUrl": ""
            }
        ],
        "dangerZones": [
            {
                "label": "เหตุการณ์ความไม่สงบ",
                "severity": "high",
                "note": "พื้นที่ชายแดนใต้ยังมีเหตุการณ์รุนแรง",
                "season": null
            },
            {
                "label": "ฝนตกหนัก",
                "severity": "medium",
                "note": "ฝนตกหนักท่วมถนนบางสายในฤดูฝน",
                "season": "ก.ย.-พ.ย."
            }
        ],
        "ecoIds": [
                "fl_white_melaleuca",
                "fl_krajood",
                "f_hornbill",
                "f_siamang",
                "t_peat_swamp",
                "c_very_wet_monsoon",
                "h_flood",
                "h_peat_fire"
        ],
        "newEcoEntities": [
                { id: "fl_white_melaleuca", name: "เสม็ดขาว", category: "flora", tags: ["common"], desc: "ไม้เด่นของป่าพรุภาคใต้ พบในพื้นที่พรุโต๊ะแดงและดินชุ่มน้ำเฉพาะแบบ" },
                { id: "fl_krajood", name: "กระจูด", category: "flora", tags: ["common"], desc: "กระจูดขึ้นได้ดีในพื้นที่ชุ่มน้ำและเป็นพืชที่สัมพันธ์กับวิถีชุมชนภาคใต้ตอนล่าง" },
                { id: "f_hornbill", name: "นกเงือก", category: "fauna", tags: ["common","protected"], desc: "นราธิวาสเป็นส่วนสำคัญของผืนป่าฮาลา-บาลาที่ขึ้นชื่อเรื่องนกเงือกหลากหลายชนิด" },
                { id: "f_siamang", name: "ชะนีสยามัง", category: "fauna", tags: ["rare","danger","protected"], desc: "ไพรเมตป่าฝนตอนล่างที่พบในผืนป่าชายแดนของนราธิวาสและยะลา" },
                { id: "t_peat_swamp", name: "ป่าพรุโต๊ะแดง", category: "terrain", tags: ["common","danger"], desc: "เป็นป่าพรุขนาดใหญ่และสำคัญมากของไทย ทำหน้าที่กักเก็บน้ำและคาร์บอน" },
                { id: "c_very_wet_monsoon", name: "ฝนหนักต่อเนื่อง", category: "climate", tags: ["common","danger","seasonal"], desc: "นราธิวาสได้รับอิทธิพลมรสุมอ่าวไทยอย่างชัด ทำให้ปลายปีมีฝนหนักสะสมยาว" },
                { id: "h_flood", name: "น้ำท่วมพื้นที่ลุ่มและชุมชนริมน้ำ", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "น้ำท่วมเป็นความเสี่ยงหลักของนราธิวาสจากฝนสะสมและการระบายช้าของพื้นที่ลุ่มชุ่มน้ำ" },
                { id: "h_peat_fire", name: "ไฟป่าพรุ", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "เมื่อพรุแห้งผิดปกติ มีโอกาสเกิดไฟใต้ดินและควันยาวนานซึ่งควบคุมยาก" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 25-32°C, ร้อนชื้น ฝนตกหนัก ก.ย.-พ.ย.",
            "terrain": "ชายฝั่งหาดทราย ป่าภูเขา และป่าเลนตามชายฝั่งทะเลอันดามัน",
            "bestSeason": "ม.ค.-เม.ย.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลนราธิวาส",
                    "number": "073-510999"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "คำเตือนการเดินทาง",
                "content": "หน่วยงานต่างชาติเตือนให้หลีกเลี่ยงการเดินทางนราธิวาส เนื่องจากสถานการณ์ความขัดแย้งยังมีอยู่.",
                "type": "safety"
            },
            {
                "title": "ศาสนาอิสลาม",
                "content": "นราธิวาสมีประชากรส่วนใหญ่เป็นมุสลิม มีมัสยิดสำคัญ เช่น มัสยิดใหญ่สุวารภูมินาราฏอน วัฒนธรรมประจำถิ่นผสมผสานกับมาเลเซียมาก.",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "clinic",
                "label": "โรงพยาบาลนราธิวาสราชนครินทร์",
                "area": "อ.เมืองนราธิวาส",
                "note": "โรงพยาบาลหลัก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. ศูนย์ราชการ",
                "area": "อ.เมืองนราธิวาส",
                "note": "ใกล้สำนักงานศาลากลาง",
                "openHours": "6:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขานราธิวาส",
                "area": "อ.เมืองนราธิวาส",
                "note": "ATM 24 ชม.",
                "openHours": "9:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจท่องเที่ยวนราธิวาส",
                "area": "อ.เมืองนราธิวาส",
                "note": "ประสานงานเหตุฉุกเฉินกับตำรวจท้องถิ่น",
                "openHours": "0:00-24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "ปัตตานี",
                "ยะลา",
                "สุไหงโกลก"
            ],
            "commonDestinations": [
                "มหาวิทยาลัยราชภัฏนราธิวาส (อ.เมือง)",
                "หาดนราทัศน์",
                "แหลมตาชะมด",
                "เจดีย์นายร้อยหวังดี"
            ],
            "transitHubs": [
                "สนามบินนราธิวาส (เล็กมาก)",
                "สถานีขนส่งนราธิวาส"
            ],
            "routeNotes": [
                "เส้นทางเข้าสุไหงโกลกผ่านสะพานข้ามเขื่อนบางลาง",
                "ต้องมีความระมัดระวังทุกครั้งในพื้นที่ชายแดน"
            ]
        }
    }
};
