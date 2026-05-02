// Portal seed data: ภาคเหนือ Part 1 (6 จังหวัด)
// Source: documents/deepreserach/part2_ภาคเหนือ.md
import type { ProvincePortalSeedData } from './db';

export const northPart1: Record<string, ProvincePortalSeedData> = {
    "Chiang Mai": {
        "transport": [
            {
                "name": "สองแถวแดงเชียงใหม่",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวสีแดงให้บริการรับส่งภายในตัวเมืองเชียงใหม่",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#ff0000"
            },
            {
                "name": "รถโดยสารประจำทางเมืองเชียงใหม่ (RTC)",
                "shortName": "รถเมล์",
                "type": "bus",
                "description": "บริการรถโดยสารประจำทางในเชียงใหม่ มีเส้นทางเชื่อมสนามบินและตัวเมือง",
                "warpUrl": "http://chiangmaicitybus.com",
                "logoText": "🚌",
                "color": "#0000ff"
            },
            {
                "name": "ตุ๊กตุ๊กเชียงใหม่",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "รถตุ๊กตุ๊กให้บริการรับส่งผู้โดยสารภายในเมืองเชียงใหม่",
                "warpUrl": "",
                "logoText": "🚕",
                "color": "#ffa500"
            },
            {
                "name": "มอเตอร์ไซค์รับจ้างเชียงใหม่",
                "shortName": "มอเตอร์ไซค์",
                "type": "bike",
                "description": "บริการรถจักรยานยนต์รับจ้างในเขตตัวเมืองเชียงใหม่",
                "warpUrl": "",
                "logoText": "🏍",
                "color": "#000000"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - เชียงใหม่",
                "type": "bus",
                "operator": "นครชัยแอร์",
                "from": "กรุงเทพฯ (สถานีขนส่งหมอชิต 2)",
                "to": "เชียงใหม่ (สถานีขนส่งอาเขต)",
                "via": [
                    "พระนครศรีอยุธยา",
                    "ลพบุรี",
                    "เพชรบูรณ์",
                    "พิษณุโลก",
                    "สุโขทัย",
                    "ลำปาง"
                ],
                "departureTimes": [
                    "07:00",
                    "15:00",
                    "20:00"
                ],
                "duration": "9-10 ชม.",
                "baseFare": 500,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - เชียงใหม่",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "สถานีรถไฟกรุงเทพ (หัวลำโพง)",
                "to": "สถานีรถไฟเชียงใหม่",
                "via": [
                    "พระนครศรีอยุธยา",
                    "นครสวรรค์",
                    "พิษณุโลก",
                    "อุตรดิตถ์",
                    "ลำปาง"
                ],
                "departureTimes": [
                    "07:30",
                    "18:00"
                ],
                "duration": "12-13 ชม.",
                "baseFare": 800,
                "frequency": "วันละ 2-3 เที่ยว",
                "terminal": "สถานีรถไฟกรุงเทพ (หัวลำโพง)",
                "notes": null
            },
            {
                "name": "สาย เครื่องบิน กรุงเทพฯ - เชียงใหม่",
                "type": "plane",
                "operator": "ไทยแอร์เอเชีย",
                "from": "สนามบินดอนเมือง",
                "to": "สนามบินเชียงใหม่",
                "via": [],
                "departureTimes": [
                    "06:00",
                    "14:00",
                    "18:00"
                ],
                "duration": "1 ชม.",
                "baseFare": 1200,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "อาคารผู้โดยสารขาออก สนามบินดอนเมือง",
                "notes": null
            },
            {
                "name": "สาย 24: สนามบินเชียงใหม่ - ประตูเชียงใหม่ (เซ็นทรัลแอร์พอร์ต)",
                "type": "bus",
                "operator": "RTC Chiang Mai City Bus",
                "from": "สนามบินเชียงใหม่",
                "to": "เซ็นทรัลเชียงใหม่แอร์พอร์ต",
                "via": [
                    "ประตูเชียงใหม่"
                ],
                "departureTimes": [
                    "08:00",
                    "21:00"
                ],
                "duration": "30-40 นาที",
                "baseFare": 30,
                "frequency": "ทุก 20 นาที",
                "terminal": "ลานจอดรถขนส่ง RTC ท่าอากาศยานเชียงใหม่",
                "notes": "ราคา 30 บาทตลอดสาย"
            },
            {
                "name": "รถตู้เชียงใหม่ - ลำพูน",
                "type": "van",
                "operator": "สหกรณ์อุตสาหกรรมท่องเที่ยวเชียงใหม่",
                "from": "สถานีขนส่งเชียงใหม่ (อาเขต)",
                "to": "สถานีรถไฟลำพูน",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "12:00",
                    "18:00"
                ],
                "duration": "1 ชม.",
                "baseFare": 50,
                "frequency": "ทุก 30 นาที",
                "terminal": "สถานีขนส่งเชียงใหม่ (อาเขต)",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวซอย",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "ก๋วยเตี๋ยวแกงกะทิสไตล์เหนือ"
            },
            {
                "name": "ไส้อั่ว",
                "priceRange": "30-50฿",
                "category": "local",
                "note": "ไส้กรอกหมูเครื่องเทศเหนือ"
            },
            {
                "name": "น้ำพริกหนุ่ม",
                "priceRange": "20-40฿",
                "category": "local",
                "note": "น้ำพริกเหนือเผ็ดร้อนจากพริกกะเหรี่ยง"
            },
            {
                "name": "ขนมจีนน้ำเงี้ยว",
                "priceRange": "40-70฿",
                "category": "local",
                "note": "ขนมจีนน้ำแกงรสเผ็ดใส่เครื่องในหมู"
            },
            {
                "name": "แกงฮังเล",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "แกงหมูใส่เครื่องเทศและเลือดหมู"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "โรงแรม Hug Chiangmai Hotel",
                    "Chiang Mai City Hotel"
                ],
                "bookingUrl": "https://www.booking.com/region/th/chiang-mai.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-2500฿/คืน",
                "examples": [
                    "โรงแรม ลานนา ซิตี้วิว",
                    "The Empress Hotel Chiang Mai"
                ],
                "bookingUrl": "https://www.booking.com/region/th/chiang-mai.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2500-5000฿/คืน",
                "examples": [
                    "Anantara Chiang Mai Resort",
                    "เชียงใหม่พลาซ่า"
                ],
                "bookingUrl": "https://www.booking.com/region/th/chiang-mai.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ฝุ่นละออง PM2.5",
                "severity": "high",
                "note": "ปริมาณฝุ่นละอองสูงกว่ามาตรฐานในฤดูแล้ง",
                "season": "ก.พ.-เม.ย."
            },
            {
                "label": "ไฟป่า",
                "severity": "medium",
                "note": "เกิดไฟป่าบ่อยในฤดูร้อน",
                "season": "ก.พ.-เม.ย."
            },
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "medium",
                "note": "ฝนตกหนักอาจทำให้น้ำท่วมในบางพื้นที่",
                "season": "มิ.ย.-ต.ค."
            }
        ],
        "ecoIds": [
            "fl_tea_plant",
            "fl_maple_mountain",
            "f_elephant_wild",
            "f_serow",
            "t_high_mountain_forest",
            "c_cool_mountain",
            "h_pm25_haze",
            "h_forest_fire"
        ],
        "newEcoEntities": [
            { id: "fl_tea_plant", name: "ต้นชา", category: "flora", tags: ["common","edible","medicinal"], desc: "พืชเศรษฐกิจสำคัญของพื้นที่สูงภาคเหนือ ใช้ผลิตชาและพบได้จริงในแหล่งเกษตรบนดอยของเชียงใหม่" },
            { id: "fl_maple_mountain", name: "เมเปิลภูเขา", category: "flora", tags: ["common","rare","seasonal"], desc: "ไม้เขตหนาวบนพื้นที่สูง พบตามดอยสูงอากาศเย็น และเป็นหนึ่งในพืชเด่นของแนวป่าภูเขาเชียงใหม่" },
            { id: "f_elephant_wild", name: "ช้างป่า", category: "fauna", tags: ["danger","rare","protected"], desc: "พบในพื้นที่ป่าอนุรักษ์ของจังหวัด และอาจออกหากินใกล้ชุมชนชายป่าเป็นบางช่วง" },
            { id: "f_serow", name: "เลียงผา", category: "fauna", tags: ["rare","danger","protected"], desc: "สัตว์ป่าคุ้มครองที่สัมพันธ์กับพื้นที่เขาสูงและหน้าผา พบในโซนภูเขาหินปูนและป่าภูเขา" },
            { id: "t_high_mountain_forest", name: "ป่าภูเขาสูงและต้นน้ำ", category: "terrain", tags: ["common"], desc: "เชียงใหม่มีภูมิประเทศเด่นเป็นภูเขาสูง ป่าดิบเขา และพื้นที่ต้นน้ำสำคัญของภาคเหนือ" },
            { id: "c_cool_mountain", name: "อากาศเย็นบนดอยสูง", category: "climate", tags: ["common","seasonal"], desc: "พื้นที่สูงของเชียงใหม่มีอากาศเย็นถึงหนาวชัดเจนในฤดูหนาว แตกต่างจากโซนเมืองด้านล่าง" },
            { id: "h_pm25_haze", name: "หมอกควัน PM2.5", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "เชียงใหม่เป็นหนึ่งในจังหวัดที่ได้รับผลกระทบหนักจากฝุ่นควันช่วงปลายฤดูแล้ง โดยเฉพาะเมื่อเกิดไฟป่าและการเผาในที่โล่ง" },
            { id: "h_forest_fire", name: "ไฟป่า", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ความเสี่ยงไฟป่าสูงในช่วงอากาศแห้ง และเป็นตัวเร่งสำคัญของปัญหาหมอกควันในจังหวัด" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 18-34°C, ฝนตกชุกช่วง มิ.ย.-ต.ค.",
            "terrain": "ภูเขาสลับซับซ้อน ป่าเขตร้อน และที่ราบลุ่มแม่น้ำ",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "ท่องเที่ยวช่วงพฤศจิกายน-กุมภาพันธ์",
                "content": "เชียงใหม่ฤดูหนาว (พ.ย.–ก.พ.) อากาศเย็นสบาย (~20-25°C) เหมาะแก่การท่องเที่ยว",
                "type": "season"
            },
            {
                "title": "ระวังมิจฉาชีพเล็กๆ",
                "content": "เชียงใหม่โดยทั่วไปปลอดภัย ผู้คนเป็นมิตร แต่ควรระวังโจรขโมยทรัพย์สินปลีกย่อย เช่น โจรฉกของ และมอเตอร์ไซค์เช่าที่หลอกคิดค่าซ่อมเกินจริง",
                "type": "safety"
            },
            {
                "title": "ปฏิบัติตัวขณะเข้าวัด",
                "content": "เชียงใหม่มีวัดสำคัญหลายแห่ง ควรแต่งกายสุภาพ (คลุมไหล่และเข่า) และถอดรองเท้าก่อนเข้าพื้นที่ศักดิ์สิทธิ์",
                "type": "culture"
            },
            {
                "title": "อาหารท้องถิ่นยอดนิยม",
                "content": "เชียงใหม่ขึ้นชื่ออาหารเหนือ เช่น ข้าวซอยและขนมจีนน้ำเงี้ยว ผู้มาเยือนควรลิ้มลองจากร้านต้นตำรับหรือในตลาดกลางคืนท้องถิ่น",
                "type": "food"
            },
            {
                "title": "ท่องเที่ยวในงบประหยัด",
                "content": "เชียงใหม่ท้องถิ่นมีอาหารราคาถูก (สตรีทฟู้ด 30-100฿) และที่พักโฮสเทลราคาประหยัด (~300฿) ช่วยให้เดินทางได้ด้วยงบจำกัด",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขาเชียงใหม่",
                "area": "เขตเมืองเชียงใหม่",
                "note": "เปิด จ.-ศ. 08:00-15:30",
                "openHours": "08:00-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปตท. สนง.ใหญ่เชียงใหม่",
                "area": "ถนนสายเชียงใหม่-ลำพูน",
                "note": "สถานีบริการน้ำมัน 24 ชม.",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ ประตูท่าแพ",
                "area": "กาดต้นพยอม/ประตูท่าแพ",
                "note": "อยู่ใกล้ตลาดต้นพยอม",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้าน Boots Central เชียงใหม่",
                "area": "เซ็นทรัลแอร์พอร์ต พลาซา",
                "note": "เปิด 10:00-22:00",
                "openHours": "10:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลมหาราชนครเชียงใหม่",
                "area": "ศรีวิชัย, เมืองเชียงใหม่",
                "note": "มีแผนกรักษาฉุกเฉิน 24 ชม.",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจท่องเที่ยว จังหวัดเชียงใหม่",
                "area": "สุเทพ, เมืองเชียงใหม่",
                "note": "บริการให้ความช่วยเหลือนักท่องเที่ยว",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "EV Charger ศูนย์การค้าเซ็นทรัลเฟสติวัล",
                "area": "สันทราย",
                "note": "จุดชาร์จรถยนต์ไฟฟ้า",
                "openHours": "10:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ศูนย์ช่วยเหลือนักท่องเที่ยว เชียงใหม่",
                "area": "ศูนย์ท่องเที่ยวเชียงใหม่",
                "note": "โทร. 053-121-089",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สนามบินเชียงใหม่",
                "สถานีขนส่งอาเขต",
                "ถนนคนเดินท่าแพ"
            ],
            "commonDestinations": [
                "วัดพระธาตุดอยสุเทพ",
                "ไนท์บาซาร์เชียงใหม่",
                "ถนนคนเดินวัวลาย",
                "น้ำตกแม่สา",
                "อุทยานแห่งชาติดอยอินทนนท์"
            ],
            "transitHubs": [
                "สนามบินเชียงใหม่",
                "สถานีขนส่งอาเขตเชียงใหม่",
                "สถานีรถไฟเชียงใหม่"
            ],
            "routeNotes": [
                "ถนนขึ้นดอยสุเทพมีโค้งมาก ควรขับรถระมัดระวัง",
                "เดินทางช่วงเช้าเห็นทะเลหมอกที่ดอยสุเทพสวยงาม",
                "เว้นช่วงสงกรานต์เชียงใหม่จะมีน้ำทั่วเมือง"
            ]
        }
    },
    "Chiang Rai": {
        "transport": [
            {
                "name": "รถสองแถวเชียงราย",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวให้บริการในเขตเมืองเชียงราย",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#ff0000"
            },
            {
                "name": "รถโดยสารประจำทางเชียงราย (Green Bus)",
                "shortName": "รถเมล์",
                "type": "bus",
                "description": "ให้บริการรถโดยสารปรับอากาศระหว่างจังหวัดและระหว่างเมือง",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#00aa00"
            },
            {
                "name": "ตุ๊กตุ๊กเชียงราย",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "บริการรถตุ๊กตุ๊กรับส่งในตัวเมืองเชียงราย",
                "warpUrl": "",
                "logoText": "🚕",
                "color": "#ffa500"
            },
            {
                "name": "รถตู้เชียงราย - เชียงใหม่",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้ปรับอากาศจากเชียงรายไปเชียงใหม่",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#0000ff"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - เชียงราย",
                "type": "bus",
                "operator": "สยามเฟิสท์แอร์",
                "from": "กรุงเทพฯ (หมอชิต 2)",
                "to": "เชียงราย (สถานีขนส่งเชียงราย)",
                "via": [
                    "ลพบุรี",
                    "พิษณุโลก",
                    "ลำพูน",
                    "เชียงใหม่"
                ],
                "departureTimes": [
                    "17:00",
                    "21:00"
                ],
                "duration": "10-11 ชม.",
                "baseFare": 700,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย เครื่องบิน เชียงใหม่ - เชียงราย",
                "type": "plane",
                "operator": "นกแอร์",
                "from": "สนามบินเชียงใหม่",
                "to": "สนามบินเชียงราย",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "17:00"
                ],
                "duration": "45 นาที",
                "baseFare": 700,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สนามบินเชียงใหม่",
                "notes": null
            },
            {
                "name": "รถตู้เชียงใหม่ - เชียงราย",
                "type": "van",
                "operator": "Green Bus Co.",
                "from": "สถานีขนส่งอาเขตเชียงใหม่",
                "to": "สถานีขนส่งเชียงราย",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "13:00",
                    "18:00"
                ],
                "duration": "3-4 ชม.",
                "baseFare": 200,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
                "notes": null
            },
            {
                "name": "รถบัสเชียงราย - เชียงใหม่",
                "type": "bus",
                "operator": "ขนส่งเชียงราย",
                "from": "สถานีขนส่งเชียงราย",
                "to": "สถานีขนส่งอาเขตเชียงใหม่",
                "via": [],
                "departureTimes": [
                    "06:00",
                    "12:00",
                    "18:00"
                ],
                "duration": "3 ชม.",
                "baseFare": 180,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งเชียงราย",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวซอย",
                "priceRange": "50-80฿",
                "category": "local",
                "note": null
            },
            {
                "name": "น้ำเงี้ยว",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "ขนมจีนราดน้ำซุปเลือดหมูรสจัด"
            },
            {
                "name": "ลาบเหนือ",
                "priceRange": "40-60฿",
                "category": "local",
                "note": "ลาบหมูเผ็ดแบบเหนือใส่เครื่องใน"
            },
            {
                "name": "ไส้อั่ว",
                "priceRange": "30-50฿",
                "category": "local",
                "note": null
            },
            {
                "name": "น้ำพริกหนุ่ม",
                "priceRange": "20-40฿",
                "category": "local",
                "note": null
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "Riverie Hotel Chiang Rai",
                    "เดอะลิลเล็ตท์ รีสอร์ท"
                ],
                "bookingUrl": "https://www.booking.com/region/th/chiang-rai.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-2000฿/คืน",
                "examples": [
                    "Laluna Hotel Chiang Rai",
                    "The Legend Chiang Rai"
                ],
                "bookingUrl": "https://www.booking.com/region/th/chiang-rai.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2000-5000฿/คืน",
                "examples": [
                    "Le Méridien Chiang Rai Resort",
                    "ศาลาเชียงราย"
                ],
                "bookingUrl": "https://www.booking.com/region/th/chiang-rai.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ฝุ่นละออง PM2.5",
                "severity": "high",
                "note": "คุณภาพอากาศแย่ในฤดูแล้ง",
                "season": "ก.พ.-เม.ย."
            },
            {
                "label": "ไฟป่า",
                "severity": "medium",
                "note": "เกิดไฟป่าในช่วงต้นปี",
                "season": "ม.ค.-เม.ย."
            },
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "medium",
                "note": "ฝนตกหนักทำให้เกิดน้ำท่วมเฉียบพลันได้",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "ทุ่นระเบิด",
                "severity": "high",
                "note": "พื้นที่ชายแดนใกล้เขตอำเภอแม่สายมีทุ่นระเบิดบางจุด",
                "season": null
            }
        ],
        "ecoIds": [
            "fl_tea_oolong",
            "fl_coffee_arabica",
            "f_elephant",
            "f_macaque",
            "t_ridge_cliff",
            "c_sea_of_mist",
            "h_haze_pm25",
            "h_landslide"
        ],
        "newEcoEntities": [
            { id: "fl_tea_oolong", name: "ชาอู่หลง", category: "flora", tags: ["common","edible"], desc: "พืชเกษตรพื้นที่สูงที่เป็นเอกลักษณ์ของเชียงราย พบจริงในแหล่งไร่ชาสำคัญของจังหวัด" },
            { id: "fl_coffee_arabica", name: "กาแฟอาราบิก้า", category: "flora", tags: ["common","edible"], desc: "ปลูกแพร่หลายในพื้นที่สูงของเชียงราย และเป็นหนึ่งในพืชเศรษฐกิจสำคัญของจังหวัด" },
            { id: "f_elephant", name: "ช้างเอเชีย", category: "fauna", tags: ["danger","rare","protected"], desc: "มีการพบช้างในภูมิทัศน์ป่าเขาของเชียงรายและพื้นที่ใกล้เขตอนุรักษ์ ควรระวังเมื่อเดินทางผ่านชายป่า" },
            { id: "f_macaque", name: "ลิงแสม/ลิงป่า", category: "fauna", tags: ["common","danger"], desc: "ลิงในแหล่งท่องเที่ยวและพื้นที่ป่าอาจเข้าหาอาหารจากคน ควรหลีกเลี่ยงการให้อาหารหรือเข้าใกล้" },
            { id: "t_ridge_cliff", name: "สันเขาและหน้าผาสูง", category: "terrain", tags: ["common","danger"], desc: "เชียงรายมีแนวสันเขา หน้าผา และพื้นที่สูงตามแนวชายแดน ซึ่งเป็นจุดชมวิวเด่นแต่มีความเสี่ยงจากสภาพอากาศและพื้นที่ลาดชัน" },
            { id: "c_sea_of_mist", name: "อากาศเย็นและทะเลหมอก", category: "climate", tags: ["common","seasonal"], desc: "พื้นที่สูงของเชียงรายมีอากาศเย็นชัดในฤดูหนาว และเกิดทะเลหมอกได้บ่อยในช่วงเช้า" },
            { id: "h_haze_pm25", name: "ฝุ่นควัน PM2.5", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "เชียงรายได้รับผลจากหมอกควันและฝุ่นข้ามแดนรวมกับไฟในพื้นที่ ทำให้คุณภาพอากาศแย่ในช่วงปลายฤดูแล้ง" },
            { id: "h_landslide", name: "ดินถล่มและน้ำป่าไหลหลาก", category: "climate", tags: ["danger","rare","seasonal","extreme"], desc: "ฝนหนักบนภูเขาและพื้นที่ลาดชันอาจทำให้เกิดน้ำป่าและดินถล่ม โดยเฉพาะเส้นทางท่องเที่ยวบนดอย" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 18-33°C, ฝนตกชุกช่วง ก.ค.-ก.ย.",
            "terrain": "ภูเขาสูงและหุบเขา ป่าเต็งรังและป่าเบญจพรรณ",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เมืองปลอดภัยระดับโลก",
                "content": "เชียงรายถูกจัดอันดับเป็นเมืองที่ปลอดภัยที่สุดอันดับ 2 ของโลกสำหรับนักท่องเที่ยวดิจิทัลโนแมดหญิง",
                "type": "safety"
            },
            {
                "title": "เที่ยวแบบ Road Trip",
                "content": "เชียงรายเป็นพื้นที่เกษตรกรรมอุดมสมบูรณ์ มีภูเขาและไร่ชากว้างใหญ่ เหมาะกับการขับรถเที่ยวชมทิวทัศน์",
                "type": "route"
            },
            {
                "title": "อาหารท้องถิ่นเสริมสุขภาพ",
                "content": "อาหารเชียงรายใช้วัตถุดิบจากสมุนไพรพื้นถิ่น ผักดอง และผลไม้ป่า เช่น พืชป่าและผักลิ้นถิ่น ที่นำมาปรุงเป็นเมนูพื้นบ้าน",
                "type": "food"
            },
            {
                "title": "วัฒนธรรมล้านนา-ไทลื้อ",
                "content": "เชียงรายผสมผสานวัฒนธรรมล้านนาและไทลื้ออย่างงดงาม วัดพระแก้ว (วัดพระเจ้าตนหลวง) เป็นสถานที่ศักดิ์สิทธิ์สำคัญที่ควรไปสักการะ",
                "type": "culture"
            },
            {
                "title": "งบประมาณการเดินทาง",
                "content": "เชียงรายเป็นเมืองรอง ค่าครองชีพโดยทั่วไปต่ำกว่าเชียงใหม่ มีที่พักและอาหารราคาประหยัดมากขึ้น",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขาเชียงราย",
                "area": "รอบเวียง, เมืองเชียงราย",
                "note": "เปิด จ.-ศ. 08:00-15:30",
                "openHours": "08:00-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปตท. สี่แยกเชียงราย",
                "area": "หน้ากว๊านพะเยา, เชียงราย",
                "note": "ปั๊มน้ำมันหลักใกล้สถานีขนส่ง",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ สถานีขนส่งเชียงราย",
                "area": "รอบเวียง",
                "note": "อยู่ในสถานีขนส่งบขส.เชียงราย",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้าน Boots Central เชียงราย",
                "area": "เซ็นทรัลพลาซา เชียงราย",
                "note": "เปิด 10:00-20:00",
                "openHours": "10:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลเชียงรายประชานุเคราะห์",
                "area": "เวียงเหนือ, เมืองเชียงราย",
                "note": "มีแผนกรักษาฉุกเฉิน 24 ชม.",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "ตำรวจท่องเที่ยวจังหวัดเชียงราย",
                "area": "เมืองเชียงราย",
                "note": "เปิด 24 ชม.",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "EV Charger เซ็นทรัลแอร์พอร์ต พลาซา",
                "area": "เมืองเชียงราย",
                "note": "จุดชาร์จรถยนต์ไฟฟ้า",
                "openHours": "10:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ศูนย์ช่วยเหลือนักท่องเที่ยว เชียงราย (TAC)",
                "area": "จ.เชียงราย",
                "note": "ติดต่อสอบถาม 053-150192",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สนามบินแม่ฟ้าหลวง เชียงราย",
                "สถานีขนส่งเชียงราย",
                "ไนท์บาซาร์เชียงราย"
            ],
            "commonDestinations": [
                "วัดร่องขุ่น (วัดขาว)",
                "วัดพระแก้ว",
                "ดอยตุง (สวนแม่ฟ้าหลวง)",
                "สามเหลี่ยมทองคำ",
                "ถ้ำหลวง-ขุนน้ำนางนอน"
            ],
            "transitHubs": [
                "สนามบินแม่ฟ้าหลวง เชียงราย",
                "สถานีขนส่งเชียงราย"
            ],
            "routeNotes": [
                "เส้นทางเชียงราย-แม่สายติดด่าน ตรวจบัตรประชาชนก่อนข้ามเขต",
                "เที่ยวดอยตุงควรออกเช้าตรู่เพื่อหลีกเลี่ยงฝูงชน",
                "หลีกเลี่ยงขับรถตอนกลางคืนเส้นแม่สรวย-เชียงของ ถนนคดเคี้ยว"
            ]
        }
    },
    "Lampang": {
        "transport": [
            {
                "name": "รถโดยสารประจำทางจังหวัดลำปาง",
                "shortName": "รถเมล์",
                "type": "bus",
                "description": "สถานีขนส่งผู้โดยสารลำปางให้บริการเดินรถในจังหวัดและเชื่อมจังหวัดใกล้เคียง",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0000ff"
            },
            {
                "name": "รถสองแถวลำปาง",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวรับจ้างประจำทางภายในเมืองลำปาง",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#ff0000"
            },
            {
                "name": "รถตุ๊กตุ๊กลำปาง",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "บริการรถตุ๊กตุ๊กรับส่งในเมืองลำปาง",
                "warpUrl": "",
                "logoText": "🚕",
                "color": "#ffa500"
            },
            {
                "name": "รถจักรยานยนต์รับจ้างลำปาง",
                "shortName": "มอเตอร์ไซค์",
                "type": "bike",
                "description": "รถจักรยานยนต์รับจ้างบริการรับส่งในตัวเมืองลำปาง",
                "warpUrl": "",
                "logoText": "🏍",
                "color": "#000000"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - ลำปาง",
                "type": "bus",
                "operator": "สหขนส่งแอร์",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งผู้โดยสารลำปาง",
                "via": [
                    "พระนครศรีอยุธยา",
                    "นครสวรรค์",
                    "พิษณุโลก",
                    "อุตรดิตถ์"
                ],
                "departureTimes": [
                    "09:00",
                    "20:00"
                ],
                "duration": "9-10 ชม.",
                "baseFare": 550,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - ลำปาง",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "สถานีหัวลำโพง",
                "to": "สถานีรถไฟลำปาง",
                "via": [
                    "พระนครศรีอยุธยา",
                    "นครสวรรค์",
                    "พิษณุโลก",
                    "อุตรดิตถ์",
                    "อุตรดิตถ์"
                ],
                "departureTimes": [
                    "07:30",
                    "19:00"
                ],
                "duration": "10-11 ชม.",
                "baseFare": 600,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "สถานีหัวลำโพง",
                "notes": null
            },
            {
                "name": "รถตู้ลำปาง - เชียงใหม่",
                "type": "van",
                "operator": "Green Bus Co.",
                "from": "สถานีขนส่งลำปาง",
                "to": "สถานีขนส่งอาเขตเชียงใหม่",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "12:00",
                    "15:00"
                ],
                "duration": "2 ชม.",
                "baseFare": 150,
                "frequency": "ทุก 2 ชม.",
                "terminal": "สถานีขนส่งผู้โดยสารลำปาง",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวซอย",
                "priceRange": "50-80฿",
                "category": "local",
                "note": null
            },
            {
                "name": "ไส้อั่ว",
                "priceRange": "30-50฿",
                "category": "local",
                "note": null
            },
            {
                "name": "ข้าวแรมฟืน",
                "priceRange": "20-30฿",
                "category": "street",
                "note": "ข้าวเหนียวย่างเป็นแผ่น"
            },
            {
                "name": "ขนมปังสังขยา",
                "priceRange": "30-50฿",
                "category": "dessert",
                "note": null
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "Le Neuf Nakorn Lampang",
                    "โรงแรมลาว"
                ],
                "bookingUrl": "https://www.booking.com/region/th/lampang.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-2000฿/คืน",
                "examples": [
                    "Chiang Tong Airport Hotel",
                    "Lampang River Lodge"
                ],
                "bookingUrl": "https://www.booking.com/region/th/lampang.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2000-5000฿/คืน",
                "examples": [
                    "โรงแรมบ้านกิจเสรี Lampang",
                    "Ban Thai House Lampang"
                ],
                "bookingUrl": "https://www.booking.com/region/th/lampang.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ฝุ่น PM2.5",
                "severity": "medium",
                "note": "คุณภาพอากาศลดลงในฤดูแล้ง",
                "season": "ก.พ.-เม.ย."
            },
            {
                "label": "ไฟป่า",
                "severity": "medium",
                "note": "มักเกิดไฟป่าในช่วงต้นปี",
                "season": "ก.พ.-เม.ย."
            },
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "medium",
                "note": "อาจเกิดน้ำท่วมฉับพลันได้เมื่อฝนตกหนัก",
                "season": "ก.ค.-ต.ค."
            },
            {
                "label": "งูพิษ",
                "severity": "low",
                "note": "มีงูพิษหลายชนิดอาศัยในป่าใกล้เคียง",
                "season": null
            }
        ],
        "ecoIds": [
            "fl_teak",
            "fl_bamboo",
            "f_wild_boar",
            "f_monitor_lizard",
            "t_hot_spring_mountain",
            "c_hot_dry",
            "h_summer_storm",
            "h_flash_flood"
        ],
        "newEcoEntities": [
            { id: "fl_teak", name: "ไม้สัก", category: "flora", tags: ["common","protected"], desc: "ลำปางมีแนวป่าเบญจพรรณและป่าสักธรรมชาติในบางพื้นที่ ไม้สักเป็นพืชเด่นของภูมิทัศน์ป่าทางภาคเหนือ" },
            { id: "fl_bamboo", name: "ไผ่", category: "flora", tags: ["common","edible"], desc: "พบทั่วไปในป่าและชายป่าของลำปาง ใช้ประโยชน์ได้ทั้งด้านอาหารและงานหัตถกรรม" },
            { id: "f_wild_boar", name: "หมูป่า", category: "fauna", tags: ["common","danger"], desc: "มีหลักฐานการพบในพื้นที่อุทยานแห่งชาติแจ้ซ้อน ควรระวังหากพบตามชายป่าหรือแหล่งน้ำในป่า" },
            { id: "f_monitor_lizard", name: "เหี้ย", category: "fauna", tags: ["common","danger"], desc: "สัตว์เลื้อยคลานขนาดใหญ่ที่พบได้ตามแหล่งน้ำธรรมชาติ ไม่ควรเข้าใกล้หรือรบกวน" },
            { id: "t_hot_spring_mountain", name: "ภูเขาป่าและน้ำพุร้อน", category: "terrain", tags: ["common","danger"], desc: "ลำปางมีภูมิประเทศเด่นทั้งป่าเขาและแหล่งน้ำพุร้อนธรรมชาติ โดยเฉพาะแจ้ซ้อน" },
            { id: "c_hot_dry", name: "อากาศร้อนและแห้ง", category: "climate", tags: ["common","danger","seasonal"], desc: "ลำปางเป็นหนึ่งในจังหวัดที่ร้อนจัดในภาคเหนือ โดยเฉพาะพื้นที่ราบในฤดูร้อน" },
            { id: "h_summer_storm", name: "พายุฤดูร้อนและลูกเห็บ", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ลำปางอยู่ในกลุ่มจังหวัดภาคเหนือที่มักถูกเตือนเรื่องฝนฟ้าคะนอง ลมกระโชกแรง และลูกเห็บในช่วงเปลี่ยนฤดู" },
            { id: "h_flash_flood", name: "น้ำป่าไหลหลาก", category: "climate", tags: ["danger","rare","seasonal","extreme"], desc: "ฝนตกหนักต่อเนื่องในพื้นที่ภูเขาอาจก่อให้เกิดน้ำป่าไหลหลาก โดยมีรายงานในภาคเหนือรวมถึงลำปางในฤดูฝน" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 17-32°C, ฤดูฝน ก.ค.-ก.ย.",
            "terrain": "ภูเขาสลับซับซ้อนและแม่น้ำปิง",
            "bestSeason": "พ.ย.-ม.ค.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เมืองรถม้าช้าๆ",
                "content": "ลำปางขึ้นชื่อเรื่องรถม้าบริการนักท่องเที่ยว บรรยากาศเมืองค่อนข้างช้า สบาย",
                "type": "culture"
            },
            {
                "title": "เที่ยวช่วงฤดูหนาว",
                "content": "ช่วงปลายปี พ.ย.–ก.พ. อากาศเย็นที่สุด ท่องเที่ยวสะดวก (ไม่มีฝน)",
                "type": "season"
            },
            {
                "title": "อาหารพื้นเมือง",
                "content": "อาหารขึ้นชื่อของลำปางคือขนมจีนน้ำเงี้ยวและก๋วยเตี๋ยวซุปกระดูกหมู (ขาหมู) ลองชิมจากร้านดังในตลาดเช้าเมืองลำปาง",
                "type": "food"
            },
            {
                "title": "วัดสำคัญ",
                "content": "วัดพระธาตุลำปางหลวงเป็นวัดเก่าแก่ประจำเมือง ควรสักการะพระธาตุ และวัดพระแก้วดอนเต้าสุชาดารามเป็นวัดสำคัญอีกแห่งหนึ่ง",
                "type": "culture"
            },
            {
                "title": "ท่องเที่ยวประหยัด",
                "content": "ลำปางมีค่าครองชีพไม่สูง ที่พักและอาหารราคาไม่แพง เหมาะกับนักท่องเที่ยวงบน้อย",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขาลำปาง",
                "area": "ในเมืองลำปาง",
                "note": "เปิด จ.-ศ. 08:00-15:30",
                "openHours": "08:00-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "PTT บ่อแฮ้ว",
                "area": "ถนนลำปาง-แม่ทะ",
                "note": "เปิด 24 ชม.",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ สถานีรถไฟลำปาง",
                "area": "ริมทางรถไฟ, เมืองลำปาง",
                "note": "ใกล้สถานีรถไฟหลัก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้าน Boots M Market ลำปาง",
                "area": "ตลาด M Market ลำปาง",
                "note": "เปิด 10:00-22:00",
                "openHours": "10:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลลำปาง",
                "area": "ศาลากลาง จ.ลำปาง",
                "note": "โรงพยาบาลหลัก มีบริการฉุกเฉิน",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจท่องเที่ยว ลำปาง",
                "area": "ถนนบุญวาทย์, เมืองลำปาง",
                "note": "บริการนักท่องเที่ยว",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "EV Charger เซ็นทรัล ลำปาง",
                "area": "ห้างเซ็นทรัลพลาซา ลำปาง",
                "note": "จุดชาร์จรถยนต์ไฟฟ้า",
                "openHours": "10:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ศูนย์ข้อมูลนักท่องเที่ยว ลำปาง",
                "area": "จวนผู้ว่าฯ ลำปาง",
                "note": "แผนที่และข้อมูลท่องเที่ยว",
                "openHours": "08:30-16:30",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สถานีรถไฟลำปาง",
                "สถานีขนส่งลำปาง",
                "ห้าแยกหอนาฬิกา"
            ],
            "commonDestinations": [
                "วัดพระธาตุลำปางหลวง",
                "พิพิธภัณฑ์รถม้า",
                "สวนป่าองุ่น",
                "น้ำตกเกาะคา"
            ],
            "transitHubs": [
                "สถานีรถไฟลำปาง",
                "สถานีขนส่งลำปาง",
                "ท่ารถตู้บ่อสร้าง"
            ],
            "routeNotes": [
                "ถนนเลี่ยงเมืองปลอดการจราจรหนาแน่นกว่าเข้าตัวเมือง",
                "นั่งรถไฟชมวิวเชียงใหม่-ลำปางเป็นประสบการณ์ที่ดี",
                "เตรียมเสื้อกันหนาวตอนเช้าในช่วงพฤศจิกายน"
            ]
        }
    },
    "Lamphun": {
        "transport": [
            {
                "name": "สถานีรถไฟลำพูน",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "บริการขนส่งทางรางเชื่อมเชียงใหม่และกรุงเทพฯ",
                "warpUrl": "",
                "logoText": "🚆",
                "color": "#808080"
            },
            {
                "name": "รถตุ๊กตุ๊กลำพูน",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "บริการรถตุ๊กตุ๊กภายในเมืองลำพูน",
                "warpUrl": "",
                "logoText": "🚕",
                "color": "#ffa500"
            },
            {
                "name": "รถตู้เชียงใหม่ - ลำพูน",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้ปรับอากาศจากเชียงใหม่มาลำพูน",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#0000ff"
            },
            {
                "name": "สองแถวปรับอากาศลำพูน",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวปรับอากาศให้บริการภายในเมืองลำพูน",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#00ff00"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - ลำพูน",
                "type": "bus",
                "operator": "Green Bus",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งลำพูน",
                "via": [
                    "ลพบุรี",
                    "พิษณุโลก",
                    "นครสวรรค์"
                ],
                "departureTimes": [
                    "08:00",
                    "18:00"
                ],
                "duration": "9 ชม.",
                "baseFare": 500,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - ลำพูน",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "สถานีรถไฟกรุงเทพ (หัวลำโพง)",
                "to": "สถานีรถไฟลำพูน",
                "via": [
                    "พระนครศรีอยุธยา",
                    "นครสวรรค์",
                    "พิษณุโลก",
                    "ลำปาง"
                ],
                "departureTimes": [
                    "10:30",
                    "20:00"
                ],
                "duration": "10 ชม.",
                "baseFare": 550,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หัวลำโพง",
                "notes": null
            },
            {
                "name": "รถตู้เชียงใหม่ - ลำพูน",
                "type": "van",
                "operator": "รถตู้สหกรณ์เชียงใหม่-ลำพูน",
                "from": "สถานีขนส่งอาเขตเชียงใหม่",
                "to": "สถานีขนส่งลำพูน",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "14:00",
                    "18:00"
                ],
                "duration": "1 ชม.",
                "baseFare": 50,
                "frequency": "ทุก 1 ชม.",
                "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวปุ้นน้ำเงี้ยว",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "ขนมจีนเหนือราดน้ำเงี้ยว"
            },
            {
                "name": "ไก่ย่างเมืองลำพูน",
                "priceRange": "100-150฿",
                "category": "local",
                "note": "ไก่ย่างสูตรโบราณของจังหวัดลำพูน"
            },
            {
                "name": "ข้าวซอย",
                "priceRange": "50-80฿",
                "category": "local",
                "note": null
            },
            {
                "name": "มะม่วงน้ำปลาหวาน",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "มะม่วงสุกพร้อมน้ำปลาหวาน"
            },
            {
                "name": "ขนมแม่ลำพัน",
                "priceRange": "20-30฿",
                "category": "dessert",
                "note": "ขนมหวานโบราณลำพูน"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "ที่พัก Look at Home Lamphun",
                    "บ้านนอกรีสอร์ท"
                ],
                "bookingUrl": "https://www.booking.com/region/th/lamphun.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-1500฿/คืน",
                "examples": [
                    "โรงแรมรัญลำพูน",
                    "Phor Ya Pen"
                ],
                "bookingUrl": "https://www.booking.com/region/th/lamphun.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "โรงแรมลำพูนริเวอร์ไซด์"
                ],
                "bookingUrl": "https://www.booking.com/region/th/lamphun.html"
            }
        ],
        "dangerZones": [
            {
                "label": "แมลงและงูพิษ",
                "severity": "medium",
                "note": "มีงูพิษและแมลงสัตว์มีพิษในพื้นที่ป่า",
                "season": null
            },
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "medium",
                "note": "อาจมีน้ำท่วมฉับพลันหลังฝนตกหนัก",
                "season": "ก.ค.-ก.ย."
            }
        ],
        "ecoIds": [
            "fl_longan",
            "fl_orchid_wild",
            "f_macaque",
            "f_mosquito_aedes",
            "t_mountain_limestone_waterfall",
            "c_hot_plain",
            "h_summer_storm",
            "h_haze_pm25"
        ],
        "newEcoEntities": [
            { id: "fl_longan", name: "ลำไย", category: "flora", tags: ["common","edible"], desc: "ลำไยเป็นพืชเศรษฐกิจเด่นของลำพูนและเป็นพืชที่พบจริงอย่างแพร่หลายในจังหวัด" },
            { id: "fl_orchid_wild", name: "กล้วยไม้ป่า", category: "flora", tags: ["common","rare","protected","seasonal"], desc: "พื้นที่ชื้นบนดอยขุนตาลเป็นแหล่งของกล้วยไม้ป่าหลายชนิด ไม่ควรเก็บออกจากธรรมชาติ" },
            { id: "f_macaque", name: "ลิงป่า", category: "fauna", tags: ["common","danger"], desc: "พบตามแนวป่าและแหล่งท่องเที่ยวธรรมชาติ ควรหลีกเลี่ยงการให้อาหารหรือเข้าใกล้" },
            { id: "f_mosquito_aedes", name: "ยุงลาย", category: "fauna", tags: ["danger","common"], desc: "เป็นพาหะสำคัญของโรคไข้เลือดออก พบได้ทั่วไปในพื้นที่ชุมชนและสวนผลไม้ของลำพูน" },
            { id: "t_mountain_limestone_waterfall", name: "ภูเขาและน้ำตกหินปูน", category: "terrain", tags: ["common","danger"], desc: "ลำพูนมีทั้งแนวภูเขาและน้ำตกหินปูนเด่น โดยเฉพาะน้ำตกก้อหลวงในเขตอุทยานแห่งชาติแม่ปิง" },
            { id: "c_hot_plain", name: "อากาศร้อนในแอ่งลุ่ม", category: "climate", tags: ["common","danger","seasonal"], desc: "พื้นที่ราบของลำพูนร้อนจัดในฤดูร้อน ขณะที่โซนภูเขาจะเย็นกว่าอย่างชัดเจน" },
            { id: "h_summer_storm", name: "พายุฤดูร้อน", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ลำพูนถูกระบุเป็นจังหวัดเสี่ยงสูงในประกาศเตือนพายุฤดูร้อนของกรมอุตุนิยมวิทยาหลายช่วงในปี 2026" },
            { id: "h_haze_pm25", name: "หมอกควัน PM2.5", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ลำพูนได้รับผลกระทบหมอกควันในฤดูแล้งเช่นเดียวกับจังหวัดรอบแอ่งเชียงใหม่-ลำพูน" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 18-34°C, ฤดูฝน ก.ค.-ก.ย.",
            "terrain": "ที่ราบลุ่มเชิงเขาและแม่น้ำ",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "จังหวัดเล็กที่สุด",
                "content": "ลำพูนเป็นจังหวัดเล็กที่สุดในภาคเหนือ ก่อตั้งก่อนเชียงใหม่มากกว่า 1,000 ปี",
                "type": "culture"
            },
            {
                "title": "วัดหริภุญชัยเก่าแก่",
                "content": "วัดพระธาตุหริภุญชัยในตัวเมืองมีองค์พระธาตุสีทองเก่าแก่ (อายุกว่า 900 ปี) เป็นสิ่งศักดิ์สิทธิ์คู่เมือง",
                "type": "culture"
            },
            {
                "title": "เดินทางสะดวกจากเชียงใหม่",
                "content": "ใช้เวลาเดินทางจากเชียงใหม่เพียง 20-30 นาที สามารถไปเช้าเย็นกลับได้ เหมาะกับทริปสั้นๆ",
                "type": "route"
            },
            {
                "title": "พิธีสงกรานต์ล้านนา",
                "content": "ช่วงสงกรานต์ (กลางเม.ย.) ลำพูนมีประเพณีสงกรานต์ล้านนาและกิจกรรมประจำชุมชนคึกคัก",
                "type": "culture"
            },
            {
                "title": "ท่องเที่ยวประหยัด",
                "content": "ลำพูนเป็นเมืองขนาดเล็ก ที่พักและอาหารราคาไม่สูงมาก งบท่องเที่ยวไม่สูง",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารไทยพาณิชย์ สาขาลำพูน",
                "area": "ตลาดเก่าลำพูน",
                "note": "เปิด จ.-ศ. 08:00-15:30",
                "openHours": "08:00-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "PTT ลำพูน 1",
                "area": "ถนนเชียงใหม่-ลำพูน",
                "note": "ปั๊มน้ำมันใหญ่บนถนนหลัก",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ สถานีขนส่งลำพูน",
                "area": "ถนนรัษฎา, เมืองลำพูน",
                "note": "บนสถานีขนส่ง อ.เมือง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้าน Boots Central ลำพูน",
                "area": "เซ็นทรัลพลาซา ลำพูน",
                "note": "เปิด 10:00-20:00",
                "openHours": "10:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลลำพูน",
                "area": "ถนนแจ้ห่ม, เมืองลำพูน",
                "note": "โรงพยาบาลหลักของจังหวัด",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรเมืองลำพูน",
                "area": "ถนนดอนหลวง",
                "note": "ศูนย์ให้ความช่วยเหลือนักท่องเที่ยว",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "EV Charger เซ็นทรัลพลาซา ลำพูน",
                "area": "ห้างเซ็นทรัลพลาซา ลำพูน",
                "note": "จุดชาร์จรถ EV",
                "openHours": "10:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ศูนย์ข้อมูลท่องเที่ยว ลำพูน",
                "area": "จวนผู้ว่าราชการจังหวัดลำพูน",
                "note": "แผนที่และข้อมูลท่องเที่ยว",
                "openHours": "08:30-16:30",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สถานีขนส่งลำพูน",
                "วัดพระธาตุหริภุญชัย",
                "ตลาดเก่าลำพูน"
            ],
            "commonDestinations": [
                "วัดพระธาตุหริภุญชัย",
                "พิพิธภัณฑ์หริภุญชัย",
                "สวนพฤกษศาสตร์สมเด็จพระนางเจ้าสิริกิติ์"
            ],
            "transitHubs": [
                "สถานีขนส่งลำพูน",
                "สถานีรถไฟลำพูน",
                "สนามบินเชียงใหม่-ลำพูน"
            ],
            "routeNotes": [
                "ขึ้นดอยขะตาดูวิวก่อนเข้าตัวเมือง",
                "เที่ยวรอบเมืองลำพูนสะดวกด้วยวินมอเตอร์ไซค์",
                "ถนนรอบเมืองค่อนข้างปลอดภัยในเวลากลางวัน"
            ]
        }
    },
    "Mae Hong Son": {
        "transport": [
            {
                "name": "รถสองแถวเหลืองแม่ฮ่องสอน",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวสีเหลืองให้บริการรับส่งภายในเมืองแม่ฮ่องสอน",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#ffff00"
            },
            {
                "name": "ตุ๊กตุ๊กแม่ฮ่องสอน",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "รถตุ๊กตุ๊กสำหรับนักท่องเที่ยวให้บริการในเมืองแม่ฮ่องสอน",
                "warpUrl": "",
                "logoText": "🚕",
                "color": "#ffa500"
            },
            {
                "name": "รถจักรยานยนต์รับจ้างแม่ฮ่องสอน",
                "shortName": "มอเตอร์ไซค์",
                "type": "bike",
                "description": "บริการรถจักรยานยนต์รับจ้างภายในแม่ฮ่องสอน",
                "warpUrl": "",
                "logoText": "🏍",
                "color": "#000000"
            },
            {
                "name": "รถตู้แม่ฮ่องสอน - เชียงใหม่",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้ปรับอากาศจากแม่ฮ่องสอนไปเชียงใหม่",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#0000ff"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - แม่ฮ่องสอน",
                "type": "bus",
                "operator": "สมบัติทัวร์",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งแม่ฮ่องสอน",
                "via": [
                    "พิษณุโลก",
                    "ตาก",
                    "แม่สอด",
                    "เถิน",
                    "ปาย"
                ],
                "departureTimes": [
                    "16:00",
                    "17:00",
                    "18:29"
                ],
                "duration": "15-16 ชม.",
                "baseFare": 750,
                "frequency": "วันละ 3 เที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถตู้เชียงใหม่ - แม่ฮ่องสอน (ผ่านปาย)",
                "type": "van",
                "operator": "บริษัท แพร่เซ็นเตอร์คาร์เซอร์วิส",
                "from": "สถานีขนส่งอาเขตเชียงใหม่",
                "to": "สถานีขนส่งแม่ฮ่องสอน",
                "via": [
                    "ปาย"
                ],
                "departureTimes": [
                    "07:00",
                    "14:00"
                ],
                "duration": "6-7 ชม.",
                "baseFare": 180,
                "frequency": "ทุกวัน",
                "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
                "notes": null
            },
            {
                "name": "เที่ยวบิน เชียงใหม่ - แม่ฮ่องสอน",
                "type": "plane",
                "operator": "นกแอร์",
                "from": "สนามบินเชียงใหม่",
                "to": "สนามบินแม่ฮ่องสอน",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "17:00"
                ],
                "duration": "30 นาที",
                "baseFare": 700,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สนามบินเชียงใหม่",
                "notes": null
            },
            {
                "name": "รถบัสแม่ฮ่องสอน - ปาย",
                "type": "bus",
                "operator": "บริษัท แพร่เซ็นเตอร์คาร์เซอร์วิส",
                "from": "สถานีขนส่งแม่ฮ่องสอน",
                "to": "สถานีขนส่งปาย",
                "via": [
                    "ปางมะผ้า"
                ],
                "departureTimes": [
                    "08:00",
                    "12:00"
                ],
                "duration": "2 ชม.",
                "baseFare": 60,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งแม่ฮ่องสอน",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "แกงโฮ๊ะ",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "แกงพื้นเมืองชาวไทใหญ่หรือไทลื้อของแม่ฮ่องสอน"
            },
            {
                "name": "ข้าวแต๋น",
                "priceRange": "20-30฿",
                "category": "dessert",
                "note": "ขนมข้าวเหนียวทอดกรอบราดน้ำตาลเหนียว"
            },
            {
                "name": "ผักไตปลา (แกงผักไต)",
                "priceRange": "60-80฿",
                "category": "local",
                "note": "แกงปลารสจัดใส่ผักชนิดหนึ่งของชาวไทยใหญ่"
            },
            {
                "name": "ลาบปลาค้อ",
                "priceRange": "50-70฿",
                "category": "local",
                "note": "ลาบปลาแม่น้ำสูตรไทใหญ่"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "JJ Hostel",
                    "Ban Tha Thao Home Stay"
                ],
                "bookingUrl": "https://www.booking.com/region/th/mae-hong-son.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-2000฿/คืน",
                "examples": [
                    "Gomanya Homestay",
                    "Mae Hong Son Palace Hotel"
                ],
                "bookingUrl": "https://www.booking.com/region/th/mae-hong-son.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2000-5000฿/คืน",
                "examples": [
                    "Salween River House Resort",
                    "ราชาหมอก รีสอร์ท"
                ],
                "bookingUrl": "https://www.booking.com/region/th/mae-hong-son.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ทุ่นระเบิด",
                "severity": "high",
                "note": "พื้นที่ชายแดนติดเมียนมามีทุ่นระเบิดจากอดีตสงคราม",
                "season": null
            },
            {
                "label": "งูพิษ",
                "severity": "medium",
                "note": "พื้นที่ป่าเขาเต็มไปด้วยงูพิษหลายชนิด",
                "season": null
            },
            {
                "label": "น้ำป่า",
                "severity": "medium",
                "note": "อาจเกิดน้ำป่าหลากหลังฝนตกหนัก",
                "season": "ก.ค.-ก.ย."
            }
        ],
        "ecoIds": [
            "fl_bamboo",
            "fl_orchid_forest",
            "f_tiger",
            "f_elephant_wild",
            "t_complex_mountain",
            "c_cold_fog",
            "h_forest_fire",
            "h_mountain_road_accident"
        ],
        "newEcoEntities": [
            { id: "fl_bamboo", name: "ไผ่", category: "flora", tags: ["common","edible"], desc: "พืชเด่นของภูมิทัศน์ป่าภาคเหนือ ใช้ประโยชน์ได้หลากหลายและพบทั่วไปในแม่ฮ่องสอน" },
            { id: "fl_orchid_forest", name: "กล้วยไม้ป่า", category: "flora", tags: ["common","rare","protected","seasonal"], desc: "พื้นที่ป่าชื้นและดอยสูงของแม่ฮ่องสอนเป็นแหล่งของกล้วยไม้ป่าหลายชนิด ซึ่งควรหลีกเลี่ยงการเก็บออกจากธรรมชาติ" },
            { id: "f_tiger", name: "เสือโคร่ง", category: "fauna", tags: ["danger","rare","protected"], desc: "สัตว์ผู้ล่าระดับบนที่สัมพันธ์กับผืนป่าขนาดใหญ่ของแม่ฮ่องสอน พบยากแต่มีนัยสำคัญเชิงนิเวศสูง" },
            { id: "f_elephant_wild", name: "ช้างป่า", category: "fauna", tags: ["danger","rare","protected"], desc: "ช้างป่าพบได้ในผืนป่าขนาดใหญ่ของจังหวัด และอาจเคลื่อนผ่านพื้นที่เกษตรหรือชุมชนชายป่า" },
            { id: "t_complex_mountain", name: "เทือกเขาสลับซับซ้อน", category: "terrain", tags: ["common","danger"], desc: "แม่ฮ่องสอนเป็นจังหวัดภูเขาเด่นชัดที่สุดแห่งหนึ่งของไทย การเดินทางต้องเผชิญทางคดเคี้ยวและพื้นที่ลาดชันจำนวนมาก" },
            { id: "c_cold_fog", name: "อากาศเย็นและหมอกหนา", category: "climate", tags: ["common","danger","seasonal"], desc: "ฤดูหนาวของแม่ฮ่องสอนมีอากาศเย็นมากในพื้นที่สูง และมักเกิดหมอกหนาช่วงเช้าจนลดทัศนวิสัย" },
            { id: "h_forest_fire", name: "ไฟป่า", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "จังหวัดมีความเสี่ยงไฟป่าสูงในช่วงหน้าแล้ง และมักสัมพันธ์กับปัญหาหมอกควันในระดับภูมิภาค" },
            { id: "h_mountain_road_accident", name: "อุบัติเหตุถนนภูเขา", category: "climate", tags: ["danger","common","extreme"], desc: "ความเสี่ยงเชิงภูมิประเทศเด่นของแม่ฮ่องสอนคือถนนภูเขาคดเคี้ยว ทัศนวิสัยต่ำ และสภาพฝนหรือหมอกที่เพิ่มโอกาสเกิดอุบัติเหตุ" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 15-28°C, ฤดูหนาวหนาวจัด ธ.ค.-ม.ค.",
            "terrain": "ภูเขาสูงล้อมรอบ ลมหนาวพัดแรง ชมทะเลหมอกได้",
            "bestSeason": "ธ.ค.-ม.ค.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "บรรยากาศเขตราบสูง",
                "content": "แม่ฮ่องสอนตั้งอยู่ชายแดนตะวันตกติดพม่า เป็นเมืองภูเขาสีเขียว เต็มไปด้วยป่าไม้ เหมาะแก่การเดินป่าและท่องเที่ยวเชิงธรรมชาติ",
                "type": "route"
            },
            {
                "title": "วัดสำคัญบนดอย",
                "content": "วัดพระธาตุดอยกองมูเป็นจุดชมวิวที่สวยงาม โดยเฉพาะยามเช้าในช่วงมีทะเลหมอกปกคลุมหุบเขา",
                "type": "culture"
            },
            {
                "title": "หมู่บ้านกะเหรี่ยง",
                "content": "มีหมู่บ้านกะเหรี่ยงคอยาว (“หมู่บ้านยาวคอ”) ในบริเวณแม่ฮ่องสอน ซึ่งเป็นชุมชนบ้านแม่ลาหลวง ควรศึกษาจริยธรรมและข้อห้ามก่อนเยือน",
                "type": "culture"
            },
            {
                "title": "เส้นทางโค้งคดเคี้ยว",
                "content": "เส้นทางจากเชียงใหม่ไปแม่ฮ่องสอนเป็นโค้งมาก ใช้เวลานาน ควรแบ่งพักระหว่างทาง (เช่น แม่สะเรียง) และขับรถระมัดระวังในฤดูฝน",
                "type": "route"
            },
            {
                "title": "คาดการณ์งบ",
                "content": "แม่ฮ่องสอนไม่ใช่เมืองท่องเที่ยวยอดนิยม แหล่งที่พักและอาหารพื้นบ้านจึงมีราคาประหยัดกว่าเมืองหลักอื่นๆ",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารไทยพาณิชย์ สาขาแม่ฮ่องสอน",
                "area": "ริมกว๊าน, เมืองแม่ฮ่องสอน",
                "note": "เปิด จ.-ศ. 08:00-15:30",
                "openHours": "08:00-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "บางจาก แม่ฮ่องสอน 1",
                "area": "เขตเมืองแม่ฮ่องสอน",
                "note": "ปั๊มน้ำมันหลักในเมือง",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ สถานีขนส่งแม่ฮ่องสอน",
                "area": "ล้อมกว๊าน, แม่ฮ่องสอน",
                "note": "ใกล้สถานีขนส่ง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้าน Boots Central แม่ฮ่องสอน",
                "area": "เซ็นทรัลพลาซา แม่ฮ่องสอน",
                "note": "เปิด 10:00-20:00",
                "openHours": "10:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลแม่ฮ่องสอน",
                "area": "ร่มเกล้า, เมืองแม่ฮ่องสอน",
                "note": "มีแผนกฉุกเฉิน 24 ชม.",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "ตำรวจท่องเที่ยว แม่ฮ่องสอน",
                "area": "เมืองแม่ฮ่องสอน",
                "note": "บริการ 24 ชม.",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "EV Charger เซ็นทรัล พลาซา แม่ฮ่องสอน",
                "area": "ห้างเซ็นทรัลฯ",
                "note": "จุดชาร์จ EV",
                "openHours": "10:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ศูนย์บริการนักท่องเที่ยว แม่ฮ่องสอน",
                "area": "ลานคนเมือง",
                "note": "ข้อมูลท่องเที่ยวทั่วไป",
                "openHours": "08:30-16:30",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สนามบินแม่ฮ่องสอน",
                "สถานีขนส่งแม่ฮ่องสอน",
                "สะพานซูตองเป้"
            ],
            "commonDestinations": [
                "วัดพระธาตุดอยกองมู",
                "ถ้ำปลา",
                "สะพานซูตองเป้",
                "หมู่บ้านรักไทย"
            ],
            "transitHubs": [
                "สนามบินแม่ฮ่องสอน",
                "สถานีขนส่งแม่ฮ่องสอน"
            ],
            "routeNotes": [
                "รถมอเตอร์ไซค์เหมาะกับเที่ยวหมู่บ้านรอบๆ",
                "หลีกเลี่ยงขับรถตอนกลางคืน ถนนคดเคี้ยวและไม่มีไฟ",
                "ตรวจสภาพรถยนต์ก่อนขึ้นดอยทุกครั้ง"
            ]
        }
    },
    "Nan": {
        "transport": [
            {
                "name": "สองแถวเด่นชัย (น่าน)",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวสีแดงให้บริการรับส่งในตัวเมืองน่าน",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#ff0000"
            },
            {
                "name": "รถตู้น่าน - เชียงใหม่",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้ปรับอากาศวิ่งรับส่งระหว่างน่านและเชียงใหม่",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#0000ff"
            },
            {
                "name": "รถตุ๊กตุ๊คน่าน",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "ตุ๊กตุ๊กให้บริการรับส่งนักท่องเที่ยวในตัวเมืองน่าน",
                "warpUrl": "",
                "logoText": "🚕",
                "color": "#ffa500"
            },
            {
                "name": "รถบัสน่าน - พะเยา",
                "shortName": "รถบัส",
                "type": "bus",
                "description": "รถโดยสารประจำทางจากน่านไปพะเยาและจังหวัดใกล้เคียง",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#00aa00"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - น่าน",
                "type": "bus",
                "operator": "Green Bus",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งน่าน",
                "via": [
                    "นครสวรรค์",
                    "พิษณุโลก",
                    "อุตรดิตถ์"
                ],
                "departureTimes": [
                    "08:00",
                    "18:00"
                ],
                "duration": "11 ชม.",
                "baseFare": 600,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถตู้เชียงใหม่ - น่าน",
                "type": "van",
                "operator": "Green Bus Co.",
                "from": "สถานีขนส่งอาเขตเชียงใหม่",
                "to": "สถานีขนส่งน่าน",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "14:00"
                ],
                "duration": "5 ชม.",
                "baseFare": 250,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - น่าน (ผ่านพิษณุโลก)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "สถานีหัวลำโพง กรุงเทพฯ",
                "to": "สถานีรถไฟพิษณุโลก",
                "via": [
                    "พระนครศรีอยุธยา",
                    "นครสวรรค์"
                ],
                "departureTimes": [
                    "07:45",
                    "18:00"
                ],
                "duration": "11 ชม.",
                "baseFare": 550,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "สถานีหัวลำโพง",
                "notes": "ต้องต่อรถบัสที่พิษณุโลก"
            }
        ],
        "localFoods": [
            {
                "name": "แกงแคไก่",
                "priceRange": "50-70฿",
                "category": "local",
                "note": "แกงเผ็ดเหนือต้มกับผักต่างๆ"
            },
            {
                "name": "ข้าวเงี้ยว",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "ขนมจีนน้ำซุปเผ็ดใส่เครื่องในหมู"
            },
            {
                "name": "ลาบหมูคั่ว",
                "priceRange": "40-60฿",
                "category": "local",
                "note": "ลาบหมูสับคั่วโรยด้วยข้าวคั่ว"
            },
            {
                "name": "น้ำพริกกะปิน่าน",
                "priceRange": "50-70฿",
                "category": "local",
                "note": "น้ำพริกสูตรน่านใส่กะปิและเครื่องเคียง"
            },
            {
                "name": "ข้าวแต๋นน้ำค้าง",
                "priceRange": "20-30฿",
                "category": "dessert",
                "note": "ข้าวแต๋นเคลือบน้ำตาล"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "Nan River House Resort",
                    "โรงแรมน่านริเวอร์"
                ],
                "bookingUrl": "https://www.booking.com/region/th/nan.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-2000฿/คืน",
                "examples": [
                    "Por Nan Hotel",
                    "โรงแรมบ้านน่านริเวอร์"
                ],
                "bookingUrl": "https://www.booking.com/region/th/nan.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2000-5000฿/คืน",
                "examples": [
                    "GLOW Nano Hotel",
                    "Sataa Resort Nan"
                ],
                "bookingUrl": "https://www.booking.com/region/th/nan.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "high",
                "note": "แม่น้ำน่านล้นตลิ่งช่วงฝนตกหนัก",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "งูพิษ",
                "severity": "medium",
                "note": "พื้นที่ชุ่湿อาจพบงูพิษ",
                "season": null
            },
            {
                "label": "ไฟป่า",
                "severity": "low",
                "note": "ในฤดูร้อนอาจเกิดไฟป่าในบางพื้นที่",
                "season": "ก.พ.-เม.ย."
            }
        ],
        "ecoIds": [
            "fl_chomphu_phu_kha",
            "fl_orchid_mountain",
            "f_serow",
            "f_barking_deer",
            "t_mountain_headwater",
            "c_heavy_rain_monsoon",
            "h_flash_flood",
            "h_landslide"
        ],
        "newEcoEntities": [
            { id: "fl_chomphu_phu_kha", name: "ชมพูภูคา", category: "flora", tags: ["common","rare","protected","seasonal"], desc: "พืชเด่นของน่านและเป็นสัญลักษณ์ของดอยภูคา พบเฉพาะบางพื้นที่บนภูเขาสูง" },
            { id: "fl_orchid_mountain", name: "กล้วยไม้ป่าภูเขา", category: "flora", tags: ["common","rare","protected","seasonal"], desc: "น่านมีพื้นที่ป่าภูเขาที่เหมาะกับกล้วยไม้ป่าหลายชนิด โดยเฉพาะในเขตอุทยานและป่าต้นน้ำ" },
            { id: "f_serow", name: "เลียงผา", category: "fauna", tags: ["rare","danger","protected"], desc: "เลียงผาเป็นสัตว์ป่าคุ้มครองที่เหมาะกับภูมิประเทศเขาสูงชันและป่าเขาของน่าน" },
            { id: "f_barking_deer", name: "เก้ง", category: "fauna", tags: ["common","protected"], desc: "สัตว์กีบขนาดเล็กที่พบได้ในป่าหลายแบบของน่าน โดยเฉพาะบริเวณป่ารอยต่อกับพื้นที่เปิด" },
            { id: "t_mountain_headwater", name: "ภูเขาต้นน้ำและป่าดิบเขา", category: "terrain", tags: ["common"], desc: "น่านมีภูมิประเทศเด่นเป็นภูเขาสูงและป่าต้นน้ำขนาดใหญ่ ซึ่งเป็นฐานของความหลากหลายทางชีวภาพในจังหวัด" },
            { id: "c_heavy_rain_monsoon", name: "ฝนชุกบนพื้นที่ภูเขา", category: "climate", tags: ["common","danger","seasonal"], desc: "ฝนจากมรสุมทำให้หลายพื้นที่ของน่านมีฝนชุก โดยเฉพาะโซนภูเขาและต้นน้ำ" },
            { id: "h_flash_flood", name: "น้ำป่าไหลหลาก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ฝนหนักในเขตภูเขาทำให้น่านมีความเสี่ยงน้ำป่าไหลหลากและน้ำหลากฉับพลันในลำน้ำสาขา" },
            { id: "h_landslide", name: "ดินถล่ม", category: "climate", tags: ["danger","rare","seasonal","extreme"], desc: "พื้นที่ลาดชันจำนวนมากของน่านทำให้มีความเสี่ยงดินถล่มเมื่อฝนตกหนักต่อเนื่อง" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 15-32°C, ฝนตกชุก ก.ค.-ก.ย.",
            "terrain": "ภูเขาสูงและป่าไม้เขตร้อน",
            "bestSeason": "พ.ย.-ม.ค.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เมืองสงบเหมาะ slow travel",
                "content": "น่านเหมาะกับการเที่ยวแบบไม่เร่งรีบ เมืองค่อนข้างสงบ เดินเที่ยวในตัวเมืองง่าย และใช้เป็นฐานออกไปปัว บ่อเกลือ หรือดอยเสมอดาวได้ดี",
                "type": "culture"
            },
            {
                "title": "ถนนภูเขาเยอะ",
                "content": "เส้นทางไปปัว บ่อเกลือ และดอยต่าง ๆ มีทางชันและโค้งต่อเนื่อง โดยเฉพาะช่วงฝนหรือหมอกลงจัด ควรเช็กรถก่อนขึ้นเขา",
                "type": "route"
            },
            {
                "title": "ช่วงเที่ยวสบาย",
                "content": "ช่วงพฤศจิกายนถึงกุมภาพันธ์อากาศเย็นและเหมาะกับการขึ้นดอย ส่วนหน้าฝนวิวเขียวและหมอกสวยแต่ขับรถยากขึ้น",
                "type": "season"
            },
            {
                "title": "วัฒนธรรมไทลื้อเด่น",
                "content": "น่านมีอัตลักษณ์ไทลื้อและล้านนาค่อนข้างชัด ทั้งวัด เมืองเก่า งานผ้า และวิถีชุมชน ควรแต่งกายสุภาพเมื่อเข้าวัดสำคัญ",
                "type": "culture"
            },
            {
                "title": "ของกินพื้นถิ่น",
                "content": "อาหารเด่นมีข้าวซอย น้ำเงี้ยว ไส้อั่ว และของกินพื้นบ้านจากชุมชนแถบภูเขา ลองกินในตลาดเย็นหรือร้านท้องถิ่นจะได้รสแบบคนพื้นที่",
                "type": "food"
            },
            {
                "title": "งบไม่แรงเท่าเมืองท่องเที่ยวหลัก",
                "content": "ค่าที่พักและอาหารในน่านโดยรวมยังไม่สูงเท่าเชียงใหม่หรือเมืองยอดนิยม เหมาะกับทริปหลายวันถ้าบริหารค่าเดินทางดี",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารพาณิชย์ในเขตเมืองน่าน",
                "area": "รอบตัวเมืองน่านและถนนหลัก",
                "note": "พบได้ง่ายสุดในเขตอำเภอเมือง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันก่อนออกเส้นปัว-บ่อเกลือ",
                "area": "อำเภอเมืองน่านและอำเภอปัว",
                "note": "ควรเติมก่อนขึ้นเขาหรือเข้าพื้นที่ห่างไกล",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะตามจุดแวะและสถานีขนส่ง",
                "area": "สถานีขนส่งน่าน ตลาด และจุดท่องเที่ยวหลัก",
                "note": "จุดบนดอยบางแห่งมีจำกัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในเขตเมือง",
                "area": "ตัวเมืองน่าน",
                "note": "ควรซื้อยาให้พร้อมก่อนขึ้นเส้นภูเขา",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลและคลินิกในอำเภอเมือง",
                "area": "ตัวเมืองน่าน",
                "note": "บริการครบกว่าพื้นที่อำเภอรอบนอก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "จุดบริการนักท่องเที่ยวในเมือง",
                "area": "ย่านเมืองเก่าและแหล่งท่องเที่ยวหลัก",
                "note": "เหมาะสำหรับเริ่มต้นถามเส้นทาง",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สนามบินน่านนคร",
                "สถานีขนส่งน่าน",
                "ย่านเมืองเก่าน่าน"
            ],
            "commonDestinations": [
                "วัดภูมินทร์",
                "พิพิธภัณฑสถานแห่งชาติน่าน",
                "ปัว",
                "บ่อเกลือ",
                "ดอยเสมอดาว",
                "สะปัน"
            ],
            "transitHubs": [
                "สนามบินน่านนคร",
                "สถานีขนส่งน่าน"
            ],
            "routeNotes": [
                "เส้นขึ้นบ่อเกลือและสะปันโค้งเยอะ ควรเลี่ยงขับกลางคืน",
                "ถ้าจะเที่ยวหลายอำเภอ รถส่วนตัวหรือเช่ารถคุ้มกว่าพึ่งขนส่งสาธารณะ",
                "เติมน้ำมันและเตรียมเงินสดก่อนเข้าพื้นที่ภูเขาบางช่วง"
            ]
        }
    }
};
