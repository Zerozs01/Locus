// Portal seed data: ภาคเหนือ Part 2 (5 จังหวัด)
// Source: documents/deepreserach/part2_ภาคเหนือ.md
import type { ProvincePortalSeedData } from './db';

export const northPart2: Record<string, ProvincePortalSeedData> = {
    "Phayao": {
        "transport": [
            {
                "name": "รถสองแถวเขียวพะเยา",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวสีเขียวให้บริการรับส่งในตัวเมืองพะเยา",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#00ff00"
            },
            {
                "name": "รถตู้พะเยา - เชียงราย",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้ปรับอากาศจากพะเยาไปเชียงราย",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#0000ff"
            },
            {
                "name": "เรือท่องเที่ยวทะเลสาบเชียงคำ",
                "shortName": "เรือ",
                "type": "boat",
                "description": "บริการเรือหางยาวให้นักท่องเที่ยวล่องเที่ยวทะเลสาบเชียงคำ",
                "warpUrl": "",
                "logoText": "🚤",
                "color": "#1E90FF"
            },
            {
                "name": "ตุ๊กตุ๊กพะเยา",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "ตุ๊กตุ๊กให้บริการในเขตเมืองพะเยา",
                "warpUrl": "",
                "logoText": "🚕",
                "color": "#ffa500"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - พะเยา",
                "type": "bus",
                "operator": "Green Bus",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งพะเยา",
                "via": [
                    "ลำปาง",
                    "เชียงราย"
                ],
                "departureTimes": [
                    "08:00",
                    "18:00"
                ],
                "duration": "10 ชม.",
                "baseFare": 600,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถตู้เชียงใหม่ - พะเยา",
                "type": "van",
                "operator": "Green Bus Co.",
                "from": "สถานีขนส่งอาเขตเชียงใหม่",
                "to": "สถานีขนส่งพะเยา",
                "via": [
                    "ลำพูน"
                ],
                "departureTimes": [
                    "07:00",
                    "14:00"
                ],
                "duration": "5 ชม.",
                "baseFare": 200,
                "frequency": "ทุกวัน",
                "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
                "notes": null
            },
            {
                "name": "รถตู้พะเยา - น่าน",
                "type": "van",
                "operator": "Green Bus Co.",
                "from": "สถานีขนส่งพะเยา",
                "to": "สถานีขนส่งน่าน",
                "via": [
                    "เชียงคำ"
                ],
                "departureTimes": [
                    "09:00",
                    "15:00"
                ],
                "duration": "3 ชม.",
                "baseFare": 120,
                "frequency": "วันละสองเที่ยว",
                "terminal": "สถานีขนส่งพะเยา",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ก๋วยเตี๋ยวห้อยขา",
                "priceRange": "30-50฿",
                "category": "street",
                "note": "ก๋วยเตี๋ยวสูตรดั้งเดิมของพะเยา เสิร์ฟพร้อมขนมจีนน้ำซุป"
            },
            {
                "name": "แกงอ่อม",
                "priceRange": "60-80฿",
                "category": "local",
                "note": "แกงใบแมงลักผสมสมุนไพรหลากหลาย"
            },
            {
                "name": "ปลาซิวทอด",
                "priceRange": "30-50฿",
                "category": "street",
                "note": "ปลาซิวเล็กทอดกรอบ เสิร์ฟพร้อมแจ่ว"
            },
            {
                "name": "ข้าวแต๋น",
                "priceRange": "20-30฿",
                "category": "dessert",
                "note": "ข้าวแต๋นทอดกรอบราดน้ำตาล"
            },
            {
                "name": "น้ำพริกปลา",
                "priceRange": "20-40฿",
                "category": "local",
                "note": "น้ำพริกแซ่บใส่ปลาแม่น้ำ"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "โรงแรมบ้านมะกรูด",
                    "HOP INN Phayao"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phayao.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-1500฿/คืน",
                "examples": [
                    "ABIZZ Hotel KwanPhayao",
                    "โรงแรมทองดี"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phayao.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "โรงแรมเดอะปาร์ค พะเยา",
                    "ร้านหม้อข้าว"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phayao.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "medium",
                "note": "พื้นที่ต่ำรอบทะเลสาบอาจเกิดน้ำท่วม",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "ไฟป่า",
                "severity": "low",
                "note": "เกิดไฟป่าบ้างเล็กน้อยในช่วงแล้ง",
                "season": "ก.พ.-เม.ย."
            }
        ],
        "ecoIds": [
            "fl_lotus",
            "fl_orchid_wild",
            "f_serow",
            "f_barking_deer",
            "t_lake_wetland",
            "c_hot_day_cool_night",
            "h_wildfire",
            "h_summer_storm"
        ],
        "newEcoEntities": [
            { id: "fl_lotus", name: "บัว", category: "flora", tags: ["common","edible","medicinal"], desc: "พืชน้ำเด่นของแหล่งน้ำขนาดใหญ่ในจังหวัด และพบจริงในระบบนิเวศกว๊านพะเยา" },
            { id: "fl_orchid_wild", name: "กล้วยไม้ป่า", category: "flora", tags: ["common","rare","protected","seasonal"], desc: "ดอยหลวงและแนวป่าชื้นในพะเยาเป็นถิ่นของกล้วยไม้ป่าหลายชนิด ควรหลีกเลี่ยงการเก็บหรือซื้อขาย" },
            { id: "f_serow", name: "เลียงผา", category: "fauna", tags: ["rare","danger","protected"], desc: "เป็นหนึ่งในสัตว์ที่รายงานในพื้นที่อุทยานดอยหลวง สัมพันธ์กับพื้นที่เขาสูงและหน้าผา" },
            { id: "f_barking_deer", name: "เก้ง", category: "fauna", tags: ["common","protected"], desc: "สัตว์ป่าคุ้มครองที่พบได้ในพื้นที่ป่าและชายป่าของพะเยา โดยเฉพาะเขตอุทยาน" },
            { id: "t_lake_wetland", name: "ทะเลสาบน้ำจืดและพื้นที่ชุ่มน้ำ", category: "terrain", tags: ["common"], desc: "กว๊านพะเยาเป็นภูมิประเทศเด่นของจังหวัด ทำหน้าที่เป็นแหล่งน้ำ ระบบนิเวศพื้นที่ชุ่มน้ำ และจุดพักของสิ่งมีชีวิตน้ำจืดจำนวนมาก" },
            { id: "c_hot_day_cool_night", name: "กลางวันร้อน กลางคืนเย็น", category: "climate", tags: ["common","danger","seasonal"], desc: "พะเยามีลักษณะอุณหภูมิแกว่งชัดในบางช่วง โดยพื้นที่ราบร้อนจัดกลางวัน แต่โซนสูงหรือฤดูหนาวจะเย็นลงมาก" },
            { id: "h_wildfire", name: "ไฟป่าและควันสะสม", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "พื้นที่ป่าเขาในพะเยามีความเสี่ยงไฟป่าในหน้าแล้ง และส่งผลให้เกิดควันสะสมในพื้นที่ราบ" },
            { id: "h_summer_storm", name: "พายุฤดูร้อนและลูกเห็บ", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ภาคเหนือรวมถึงพะเยามีความเสี่ยงพายุฤดูร้อน ลมแรง และบางช่วงอาจมีลูกเห็บตามคำเตือนอุตุนิยม" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 18-32°C, ฤดูฝน ก.ค.-ก.ย.",
            "terrain": "ที่ราบเชิงเขาและทะเลสาบกว๊านพะเยา",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เด่นที่กว๊านพะเยา",
                "content": "กว๊านพะเยาเป็นภาพจำหลักของจังหวัด เหมาะกับเดินเล่น ดูพระอาทิตย์ตก และเที่ยวแบบชิลมากกว่าสายกิจกรรมหนัก",
                "type": "culture"
            },
            {
                "title": "เช้าหมอก เย็นลมแรง",
                "content": "ริมกว๊านช่วงเช้าและหน้าหนาวอากาศเย็นกว่าที่คิด โดยเฉพาะคนที่ตั้งใจมาดูหมอกหรือออกเรือ",
                "type": "season"
            },
            {
                "title": "เมืองไม่ใหญ่มาก",
                "content": "ตัวเมืองพะเยาเที่ยวค่อนข้างง่าย จุดหลักอยู่ไม่ไกลกันมาก แต่ถ้าจะไปภูลังกาหรือโซนภูเขาควรมีรถ",
                "type": "route"
            },
            {
                "title": "วัดกลางน้ำเป็นไฮไลต์",
                "content": "วัดติโลกอารามกลางกว๊านเป็นจุดที่มีเอกลักษณ์ ควรเคารพกติกาท้องถิ่นและแต่งกายเหมาะสมเมื่อทำกิจกรรมทางศาสนา",
                "type": "culture"
            },
            {
                "title": "อาหารริมน้ำได้เปรียบ",
                "content": "ร้านอาหารริมกว๊านเหมาะกับมื้อเย็นและวิวสวย เมนูปลาน้ำจืดและอาหารเหนือพบได้บ่อย",
                "type": "food"
            },
            {
                "title": "งบกลางถึงประหยัด",
                "content": "ค่าที่พักและอาหารในพะเยายังไม่แรง เหมาะกับทริปพักสั้น 1-2 คืนหรือแวะระหว่างเชียงราย-น่าน",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารพาณิชย์รอบกว๊านและตัวเมือง",
                "area": "อำเภอเมืองพะเยา",
                "note": "กระจุกในเขตเมือง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันบนเส้นเข้าตัวเมืองและทางไปภูลังกา",
                "area": "อำเภอเมืองและเส้นทางหลักออกนอกเมือง",
                "note": "ควรเติมก่อนขึ้นเขา",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะริมกว๊านและจุดท่องเที่ยว",
                "area": "กว๊านพะเยาและสถานีขนส่ง",
                "note": "เข้าถึงง่ายในโซนเมือง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในเขตเมืองพะเยา",
                "area": "ถนนหลักในตัวเมือง",
                "note": "ควรซื้อของจำเป็นก่อนออกนอกเมือง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลและคลินิกในอำเภอเมือง",
                "area": "ตัวเมืองพะเยา",
                "note": "สะดวกสุดสำหรับผู้เดินทาง",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สถานีขนส่งพะเยา",
                "กว๊านพะเยา",
                "ย่านตัวเมืองพะเยา"
            ],
            "commonDestinations": [
                "กว๊านพะเยา",
                "วัดติโลกอาราม",
                "วัดศรีโคมคำ",
                "ภูลังกา",
                "อุทยานแห่งชาติดอยภูนาง"
            ],
            "transitHubs": [
                "สถานีขนส่งพะเยา",
                "ย่านกว๊านพะเยา"
            ],
            "routeNotes": [
                "เที่ยวในเมืองใช้เวลาไม่มาก แต่ถ้าจะไปภูลังกาควรออกเช้ามืด",
                "เส้นทางภูเขาช่วงฝนหมอกลงและถนนลื่นได้",
                "พะเยาเหมาะเป็นจุดพักระหว่างเชียงราย-น่าน"
            ]
        }
    },
    "Phrae": {
        "transport": [
            {
                "name": "สถานีขนส่งผู้โดยสารแพร่",
                "shortName": "บขส.",
                "type": "bus",
                "description": "สถานีขนส่งจังหวัดแพร่ เชื่อมต่อเส้นทางภาคเหนือ",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0000ff"
            },
            {
                "name": "สถานีรถไฟแพร่",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "สถานีรถไฟแพร่ (ใกล้ตัวเมือง)",
                "warpUrl": "",
                "logoText": "🚆",
                "color": "#808080"
            },
            {
                "name": "รถตู้แพร่ - เชียงใหม่",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้ปรับอากาศระหว่างแพร่และเชียงใหม่",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#0000ff"
            },
            {
                "name": "รถจักรยานยนต์รับจ้างแพร่",
                "shortName": "มอเตอร์ไซค์",
                "type": "bike",
                "description": "บริการรถจักรยานยนต์รับจ้างภายในเมืองแพร่",
                "warpUrl": "",
                "logoText": "🏍",
                "color": "#000000"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - แพร่",
                "type": "bus",
                "operator": "Green Bus",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งแพร่",
                "via": [
                    "ลพบุรี",
                    "พิษณุโลก",
                    "อุตรดิตถ์",
                    "ลำปาง"
                ],
                "departureTimes": [
                    "09:00",
                    "20:00"
                ],
                "duration": "10 ชม.",
                "baseFare": 550,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถตู้เชียงใหม่ - แพร่",
                "type": "van",
                "operator": "Green Bus Co.",
                "from": "สถานีขนส่งอาเขตเชียงใหม่",
                "to": "สถานีขนส่งแพร่",
                "via": [
                    "ลำพูน"
                ],
                "departureTimes": [
                    "08:00",
                    "14:00"
                ],
                "duration": "4 ชม.",
                "baseFare": 200,
                "frequency": "ทุกวัน",
                "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
                "notes": null
            },
            {
                "name": "รถบัสลำปาง - แพร่",
                "type": "bus",
                "operator": "บริษัท ลำปางชัยสุวรรณ ทรานสปอร์ต จำกัด",
                "from": "สถานีขนส่งลำปาง",
                "to": "สถานีขนส่งแพร่",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "12:00"
                ],
                "duration": "3 ชม.",
                "baseFare": 100,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "สถานีขนส่งลำปาง",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "น้ำย้อย",
                "priceRange": "60-80฿",
                "category": "local",
                "note": "แกงเนื้อโบราณของแพร่ใส่ผักหลายชนิด"
            },
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
                "name": "ลาบเหนือ",
                "priceRange": "40-60฿",
                "category": "local",
                "note": null
            },
            {
                "name": "ไข่ตกถังโบราณ",
                "priceRange": "30-50฿",
                "category": "dessert",
                "note": "ขนมหวานสูตรดั้งเดิมของแพร่"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "โรงแรมเดอะ แพร่ จังชั่น",
                    "โรงแรมคูล แพร่"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phrae.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-1500฿/คืน",
                "examples": [
                    "โรงแรมบรมบุรุษ",
                    "ห้องพักบ้านโฮสเทล"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phrae.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "โรงแรมชัยพฤกษ์รีสอร์ท",
                    "โรงแรมไอยรา"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phrae.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "medium",
                "note": "มีพื้นที่เสี่ยงน้ำท่วมในฤดูฝน",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "ดินถล่ม",
                "severity": "medium",
                "note": "ภูเขาอาจเกิดดินถล่มหลังฝนตกหนัก",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "งูพิษ",
                "severity": "low",
                "note": "มีงูพิษในป่าและสวนผลไม้",
                "season": null
            }
        ],
        "ecoIds": [
            "fl_teak_natural",
            "fl_bamboo",
            "f_barking_deer",
            "f_mosquito_aedes",
            "t_erosion_pillars",
            "c_hot_dry_with_storm",
            "h_summer_storm",
            "h_flash_flood"
        ],
        "newEcoEntities": [
            { id: "fl_teak_natural", name: "ป่าสักธรรมชาติ", category: "flora", tags: ["common","protected"], desc: "แพร่มีชื่อเสียงเรื่องป่าสักธรรมชาติ โดยเฉพาะพื้นที่อุทยานแห่งชาติแม่ยม" },
            { id: "fl_bamboo", name: "ไผ่", category: "flora", tags: ["common","edible"], desc: "เป็นพืชพื้นฐานของระบบนิเวศป่าโปร่งและป่าเบญจพรรณในแพร่" },
            { id: "f_barking_deer", name: "เก้ง", category: "fauna", tags: ["common","protected"], desc: "สัตว์กีบขนาดเล็กที่พบได้ในป่าโปร่งและชายป่า เหมาะกับภูมิประเทศป่าเบญจพรรณของแพร่" },
            { id: "f_mosquito_aedes", name: "ยุงลาย", category: "fauna", tags: ["danger","common"], desc: "พบทั่วไปในพื้นที่ชุมชนและเป็นพาหะของโรคไข้เลือดออก" },
            { id: "t_erosion_pillars", name: "แพะเมืองผีและเสาดิน", category: "terrain", tags: ["common","danger"], desc: "ภูมิประเทศเด่นของแพร่คือเสาดินและการกัดเซาะที่ก่อรูปเป็นลักษณะคล้ายหุบผาชายดิน" },
            { id: "c_hot_dry_with_storm", name: "ร้อนจัดสลับพายุ", category: "climate", tags: ["common","danger","seasonal"], desc: "แพร่มีอากาศร้อนจัดในหน้าแล้งและมักมีพายุฤดูร้อนช่วงเปลี่ยนฤดู" },
            { id: "h_summer_storm", name: "พายุฤดูร้อนและลมกระโชกแรง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "แพร่เป็นหนึ่งในจังหวัดภาคเหนือที่ถูกเตือนว่ามีความเสี่ยงสูงจากฝนฟ้าคะนองและลมแรงในช่วงพายุฤดูร้อน" },
            { id: "h_flash_flood", name: "น้ำป่าไหลหลาก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "มีรายงานน้ำป่าไหลหลากในช่วงฝนหนักของภาคเหนือ และแพร่เป็นหนึ่งในจังหวัดที่ได้รับผลกระทบในปี 2025" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 18-33°C, ฝนมาก ก.ค.-ก.ย.",
            "terrain": "ภูเขาสูงและหุบเขาเขตชุมชน",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เมืองไม้สักเก่า",
                "content": "แพร่เป็นเมืองเล็ก สงบ มีบ้านไม้สักโบราณและตรอกซอยเก่าแก่ ให้บรรยากาศล้านนาแท้",
                "type": "culture"
            },
            {
                "title": "เดินเที่ยวสบายๆ",
                "content": "เมืองขนาดเล็ก เดินทางสะดวกด้วยเท้า เดินชมตลาดถนนคนเดินกลางคืนและวัดเก่าได้ง่าย",
                "type": "route"
            },
            {
                "title": "เที่ยวราคาไม่แพง",
                "content": "ค่าครองชีพในแพร่ต่ำ ที่พักและอาหารจึงราคาไม่แพง เหมาะกับงบที่จำกัด",
                "type": "budget"
            },
            {
                "title": "ฤดูที่ดีที่สุด",
                "content": "ช่วงพฤศจิกายน–มีนาคม เป็นช่วงฤดูเย็นและแล้งของแพร่ เหมาะกับการท่องเที่ยว",
                "type": "season"
            },
            {
                "title": "วัดสำคัญแพร่",
                "content": "วัดพระบรมธาตุช่อแฮเป็นวัดสำคัญของเมือง อีกทั้งวัดพระแท่นดงรัง (พระธาตุจอมแจ้ง) ก็เป็นวัดเก่าแก่ที่น่าไปเยือน",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงไทย สาขาแพร่",
                "area": "ตลาดสด แพร่",
                "note": "เปิด จ.-ศ. 08:00-15:30",
                "openHours": "08:00-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "Shell สาขาแพร่",
                "area": "ถนนพหลโยธิน แพร่",
                "note": "ปั๊มบริการในเมือง",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ บริเวณตลาดถนนคนเดิน",
                "area": "ถนนศรีบุญเรือง, แพร่",
                "note": "ห้องน้ำสำหรับนักท่องเที่ยว",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้าน Watsons พิษณุโลก",
                "area": "เซ็นทรัลพลาซา พิษณุโลก",
                "note": "เปิด 10:00-20:00",
                "openHours": "10:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลแพร่",
                "area": "ถนนสุขเกษม แพร่",
                "note": "แผนกฉุกเฉิน 24 ชม.",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรเมืองแพร่",
                "area": "เมืองแพร่",
                "note": "บริการนักท่องเที่ยว",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "EV Charger โลตัส แพร่",
                "area": "ห้างโลตัส แพร่",
                "note": "จุดชาร์จ EV",
                "openHours": "10:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ศูนย์บริการนักท่องเที่ยว แพร่",
                "area": "พิพิธภัณฑ์บ้านคำหลวง",
                "note": "ข้อมูลท้องถิ่นและของที่ระลึก",
                "openHours": "09:00-16:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สถานีขนส่งแพร่",
                "วัดพระธาตุช่อแฮ",
                "บ้านคำหลวง"
            ],
            "commonDestinations": [
                "วัดพระธาตุช่อแฮ",
                "อุทยานแห่งชาติแม่ยม",
                "ถนนคนเดินแพร่"
            ],
            "transitHubs": [
                "สถานีขนส่งแพร่",
                "สถานีรถไฟแพร่ (เก่า)"
            ],
            "routeNotes": [
                "เส้นทางเมืองเล็ก ขับรถไม่ยาก",
                "เที่ยวตลาดถนนคนเดินวันเสาร์-อาทิตย์ได้สนุก",
                "หลีกเลี่ยงถนนดอยในฤดูฝน"
            ]
        }
    },
    "Uttaradit": {
        "transport": [
            {
                "name": "สถานีรถไฟอุตรดิตถ์",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "สถานีรถไฟอุตรดิตถ์ บนเส้นทางเหนือ ใกล้ใจกลางเมือง",
                "warpUrl": "",
                "logoText": "🚆",
                "color": "#808080"
            },
            {
                "name": "สถานีขนส่งอุตรดิตถ์",
                "shortName": "สถานีขนส่ง",
                "type": "bus",
                "description": "สถานีขนส่งผู้โดยสารจังหวัดอุตรดิตถ์",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0000ff"
            },
            {
                "name": "รถสองแถวอุตรดิตถ์",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวให้บริการรับส่งภายในตัวเมืองอุตรดิตถ์",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#ff0000"
            },
            {
                "name": "รถตู้เชียงใหม่ - นครสวรรค์ (ผ่านอุตรดิตถ์)",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้เชียงใหม่ - นครสวรรค์ แวะรับส่งอุตรดิตถ์",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#0000ff"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - อุตรดิตถ์",
                "type": "bus",
                "operator": "Green Bus",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งอุตรดิตถ์",
                "via": [
                    "นครสวรรค์",
                    "พิษณุโลก"
                ],
                "departureTimes": [
                    "08:00",
                    "20:00"
                ],
                "duration": "8 ชม.",
                "baseFare": 400,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - อุตรดิตถ์",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "หัวลำโพง กรุงเทพฯ",
                "to": "สถานีรถไฟอุตรดิตถ์",
                "via": [
                    "ลพบุรี",
                    "นครสวรรค์",
                    "พิษณุโลก",
                    "สุโขทัย",
                    "กำแพงเพชร"
                ],
                "departureTimes": [
                    "09:30",
                    "18:30"
                ],
                "duration": "9 ชม.",
                "baseFare": 450,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หัวลำโพง",
                "notes": null
            },
            {
                "name": "รถตู้อุตรดิตถ์ - เชียงใหม่",
                "type": "van",
                "operator": "ปรับอากาศ นครสวรรค์",
                "from": "สถานีขนส่งอุตรดิตถ์",
                "to": "สถานีขนส่งอาเขตเชียงใหม่",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "16:00"
                ],
                "duration": "5 ชม.",
                "baseFare": 300,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งอุตรดิตถ์",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ลาบคั่ว",
                "priceRange": "40-60฿",
                "category": "local",
                "note": "ลาบหมูเผ็ดแบบเหนือ"
            },
            {
                "name": "ไข่เค็มดิน",
                "priceRange": "10-20฿",
                "category": "street",
                "note": "ไข่เค็มหมักดินสูตรเฉพาะอุตรดิตถ์"
            },
            {
                "name": "ข้าวซอย",
                "priceRange": "50-80฿",
                "category": "local",
                "note": null
            },
            {
                "name": "ปลาช่อนลุยสวน",
                "priceRange": "60-100฿",
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
                    "โรงแรมสุวรรณ",
                    "โรงแรมศรีธนา"
                ],
                "bookingUrl": "https://www.booking.com/region/th/uttaradit.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-1500฿/คืน",
                "examples": [
                    "เดอะวีวิวรีสอร์ท",
                    "Thaimit Resort"
                ],
                "bookingUrl": "https://www.booking.com/region/th/uttaradit.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "Thaisarn Village",
                    "River Library Hotel"
                ],
                "bookingUrl": "https://www.booking.com/region/th/uttaradit.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ฝุ่นละออง PM2.5",
                "severity": "medium",
                "note": "ค่าฝุ่นละอองเกินมาตรฐานบ้างในฤดูร้อน",
                "season": "ก.พ.-เม.ย."
            },
            {
                "label": "ไฟป่า",
                "severity": "medium",
                "note": "เกิดไฟป่าในฤดูแล้ง",
                "season": "ก.พ.-เม.ย."
            },
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "medium",
                "note": "น้ำทะลักจากแม่น้ำยมช่วงฝนตกหนัก",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "งูพิษ",
                "severity": "low",
                "note": "มีงูพิษในป่าเขารอบนอกเมือง",
                "season": null
            }
        ],
        "ecoIds": [
            "fl_giant_teak",
            "fl_bamboo",
            "f_wild_boar",
            "f_fish_tilapia",
            "t_reservoir_mountain",
            "c_heavy_rain_monsoon",
            "h_flash_flood",
            "h_landslide"
        ],
        "newEcoEntities": [
            { id: "fl_giant_teak", name: "ต้นสักใหญ่", category: "flora", tags: ["common","rare","protected"], desc: "อุตรดิตถ์มีชื่อเสียงจากต้นสักใหญ่และผืนป่าสักธรรมชาติที่สำคัญของประเทศ" },
            { id: "fl_bamboo", name: "ไผ่", category: "flora", tags: ["common","edible"], desc: "เป็นพืชที่พบทั่วไปในป่าและชายป่าของอุตรดิตถ์ และใช้ประโยชน์ได้หลากหลาย" },
            { id: "f_wild_boar", name: "หมูป่า", category: "fauna", tags: ["common","danger"], desc: "สัตว์ป่าที่พบได้ในระบบนิเวศป่าเขาของอุตรดิตถ์ โดยเฉพาะพื้นที่ป่าค่อนข้างสมบูรณ์" },
            { id: "f_fish_tilapia", name: "ปลานิล", category: "fauna", tags: ["common","edible"], desc: "เป็นปลาน้ำจืดที่พบได้ในแหล่งน้ำขนาดใหญ่ของจังหวัดและเกี่ยวข้องกับวิถีประมงน้ำจืด" },
            { id: "t_reservoir_mountain", name: "อ่างเก็บน้ำขนาดใหญ่และภูเขา", category: "terrain", tags: ["common","danger"], desc: "อุตรดิตถ์มีทั้งภูเขาและแหล่งน้ำขนาดใหญ่อย่างเขื่อนสิริกิติ์ ซึ่งกำหนดภูมิทัศน์ของจังหวัดอย่างชัดเจน" },
            { id: "c_heavy_rain_monsoon", name: "ฝนหนักจากมรสุม", category: "climate", tags: ["common","danger","seasonal"], desc: "ฤดูฝนของอุตรดิตถ์มีฝนสะสมสูงในบางช่วง โดยเฉพาะพื้นที่ต้นน้ำและภูเขา" },
            { id: "h_flash_flood", name: "น้ำป่าไหลหลากและน้ำท่วมฉับพลัน", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "อุตรดิตถ์อยู่ในกลุ่มจังหวัดภาคเหนือที่มีรายงานน้ำป่าไหลหลากช่วงฝนหนักในปี 2025" },
            { id: "h_landslide", name: "ดินถล่ม", category: "climate", tags: ["danger","rare","seasonal","extreme"], desc: "พื้นที่ภูเขาและฝนสะสมสูงทำให้อุตรดิตถ์มีความเสี่ยงดินถล่มในบางช่วงของฤดูฝน" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 18-35°C, แห้งแล้งในฤดูร้อน",
            "terrain": "ภูเขาสลับที่ราบลุ่มแม่น้ำยม",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เมืองรองสายทางผ่าน",
                "content": "อุตรดิตถ์ไม่ใช่เมืองท่องเที่ยวกระแสหลัก แต่เป็นจุดพักที่ดีสำหรับคนเดินทางขึ้นเหนือหรือเชื่อมไปพิษณุโลก แพร่ และน่าน",
                "type": "route"
            },
            {
                "title": "มีรถไฟและบขส.",
                "content": "จังหวัดนี้ไม่มีสนามบินพาณิชย์หลักสำหรับนักเดินทางทั่วไป การเดินทางจึงพึ่งรถไฟสายเหนือและสถานีขนส่งเป็นหลัก",
                "type": "route"
            },
            {
                "title": "เที่ยวธรรมชาติได้",
                "content": "ถ้าชอบบรรยากาศเงียบและธรรมชาติ อุตรดิตถ์เหมาะกับแนวเขื่อน สิริกิติ์ น้ำตก และวัดเก่า มากกว่าสายคาเฟ่หรือไนต์ไลฟ์",
                "type": "culture"
            },
            {
                "title": "อากาศร้อนในฤดูแล้ง",
                "content": "ช่วงมีนาคมถึงพฤษภาคมค่อนข้างร้อน ถ้าจะเที่ยวกลางแจ้งควรเริ่มเช้าและเลี่ยงบ่าย",
                "type": "season"
            },
            {
                "title": "ของกินท้องถิ่นเรียบง่าย",
                "content": "อาหารในอุตรดิตถ์เน้นร้านท้องถิ่นและตลาดพื้นบ้าน งบกินไม่สูงและเหมาะกับคนที่อยากได้บรรยากาศเมืองจริงมากกว่าเมืองโชว์นักท่องเที่ยว",
                "type": "food"
            },
            {
                "title": "ค่าใช้จ่ายคุมง่าย",
                "content": "ค่าเดินทางในเมืองและค่ากินอยู่ไม่สูงมาก แต่ถ้าจะออกนอกเมืองไปแหล่งธรรมชาติ รถส่วนตัวจะคุ้มกว่า",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารพาณิชย์ในเขตเมืองอุตรดิตถ์",
                "area": "ตัวเมืองอุตรดิตถ์",
                "note": "กระจุกแถวตลาดและถนนหลัก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันรอบเมืองและเส้นไปเขื่อนสิริกิติ์",
                "area": "อำเภอเมืองและเส้นทางออกนอกเมือง",
                "note": "เติมก่อนเข้าจุดธรรมชาติไกลเมือง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะที่สถานีขนส่งและสถานีรถไฟ",
                "area": "ตัวเมืองอุตรดิตถ์",
                "note": "สะดวกสำหรับนักเดินทางต่อรถ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในย่านเมือง",
                "area": "ตัวเมืองอุตรดิตถ์",
                "note": "ควรจัดของจำเป็นก่อนออกนอกอำเภอ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "คลินิกและโรงพยาบาลในอำเภอเมือง",
                "area": "ตัวเมืองอุตรดิตถ์",
                "note": "บริการครบกว่าพื้นที่รอบนอก",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สถานีรถไฟอุตรดิตถ์",
                "สถานีขนส่งอุตรดิตถ์",
                "ย่านตัวเมืองอุตรดิตถ์"
            ],
            "commonDestinations": [
                "เขื่อนสิริกิติ์",
                "วัดพระแท่นศิลาอาสน์",
                "เมืองลับแล",
                "น้ำตกแม่พูล",
                "ตลาดในตัวเมือง"
            ],
            "transitHubs": [
                "สถานีรถไฟอุตรดิตถ์",
                "สถานีขนส่งอุตรดิตถ์"
            ],
            "routeNotes": [
                "ถ้าจะเที่ยวแหล่งธรรมชาติหรือเขื่อน รถส่วนตัวสะดวกกว่ามาก",
                "เส้นทางต่อจากอุตรดิตถ์ไปจังหวัดอื่นด้วยรถไฟสะดวกสำหรับสายเหนือ",
                "บขส.เหมาะกับการต่อไปเมืองที่ไม่ได้อยู่บนแนวรถไฟ"
            ]
        }
    },
    "Sukhothai": {
        "transport": [
            {
                "name": "สถานีขนส่งสุโขทัย",
                "shortName": "บขส.",
                "type": "bus",
                "description": "สถานีขนส่งหลักของจังหวัดสุโขทัย",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0000ff"
            },
            {
                "name": "สถานีรถไฟบรรพตคีรี",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "สถานีรถไฟใกล้เมืองสุโขทัย (บรรพตคีรี)",
                "warpUrl": "",
                "logoText": "🚆",
                "color": "#808080"
            },
            {
                "name": "รถตุ๊กตุ๊กสุโขทัย",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "รถตุ๊กตุ๊กให้บริการในตัวเมืองสุโขทัย",
                "warpUrl": "",
                "logoText": "🚕",
                "color": "#ffa500"
            },
            {
                "name": "รถตู้สุโขทัย - พิษณุโลก",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้ปรับอากาศเชื่อมสุโขทัยและพิษณุโลก",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#0000ff"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - สุโขทัย",
                "type": "bus",
                "operator": "Green Bus",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งสุโขทัย",
                "via": [
                    "พระนครศรีอยุธยา",
                    "พิษณุโลก"
                ],
                "departureTimes": [
                    "14:00",
                    "21:00"
                ],
                "duration": "7 ชม.",
                "baseFare": 450,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - สุโขทัย (บรรพตคีรี)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "หัวลำโพง",
                "to": "สถานีรถไฟบรรพตคีรี (สุโขทัย)",
                "via": [
                    "พระนครศรีอยุธยา",
                    "นครสวรรค์",
                    "พิษณุโลก"
                ],
                "departureTimes": [
                    "08:30",
                    "19:00"
                ],
                "duration": "10 ชม.",
                "baseFare": 500,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หัวลำโพง",
                "notes": null
            },
            {
                "name": "รถตู้สุโขทัย - สุพรรณบุรี",
                "type": "van",
                "operator": "สมพรขนส่ง",
                "from": "สถานีขนส่งสุโขทัย",
                "to": "สถานีขนส่งสุพรรณบุรี",
                "via": [],
                "departureTimes": [
                    "07:00"
                ],
                "duration": "4 ชม.",
                "baseFare": 150,
                "frequency": "วันละ 1 เที่ยว",
                "terminal": "สถานีขนส่งสุโขทัย",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวแช่",
                "priceRange": "60-100฿",
                "category": "local",
                "note": "ข้าวหุงเย็นพร้อมเครื่องเคียงแบบสุโขทัย"
            },
            {
                "name": "แกงขี้เหล็ก",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "แกงใบขี้เหล็กใส่ปลาเค็มหรือปลาร้าปรุงรสจัด"
            },
            {
                "name": "น้ำพริกกากหมู",
                "priceRange": "20-40฿",
                "category": "local",
                "note": "น้ำพริกเผ็ดเสิร์ฟพร้อมหมูทอดกรอบ"
            },
            {
                "name": "ขนมจีนซาวน้ำ",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "ขนมจีนราดน้ำกะทิใส่กะทิน้ำพริกกะปิรสเผ็ด"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "The Original Sukhothai",
                    "Banlansuan Fan Apartments"
                ],
                "bookingUrl": "https://www.booking.com/region/th/sukhothai.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-2000฿/คืน",
                "examples": [
                    "Legendha Sukhothai Resort",
                    "Sukhothai Treasure Resort"
                ],
                "bookingUrl": "https://www.booking.com/region/th/sukhothai.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2000-5000฿/คืน",
                "examples": [
                    "Sriwilai Sukhothai Resort & Spa",
                    "Sukhothai Heritage Resort"
                ],
                "bookingUrl": "https://www.booking.com/region/th/sukhothai.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "high",
                "note": "เกิดน้ำท่วมหลังฝนตกหนักเพราะแม่น้ำยมไหลบ่าล้นตลิ่ง",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "โรคไข้เลือดออก",
                "severity": "medium",
                "note": "ระบาดในฤดูฝนเพราะยุงลายชุกชุม",
                "season": "มิ.ย.-ก.ย."
            }
        ],
        "ecoIds": [
            "fl_teak",
            "fl_bamboo",
            "f_serow",
            "f_wild_boar",
            "t_mountain_forest_yom_plain",
            "c_hot_plain",
            "h_flash_flood",
            "h_summer_storm"
        ],
        "newEcoEntities": [
            { id: "fl_teak", name: "ไม้สัก", category: "flora", tags: ["common","protected"], desc: "แนวป่าของสุโขทัย โดยเฉพาะฝั่งศรีสัชนาลัย มีองค์ประกอบป่าเบญจพรรณและไม้สักเด่น" },
            { id: "fl_bamboo", name: "ไผ่", category: "flora", tags: ["common","edible"], desc: "พบทั่วไปในป่าและชายป่าของสุโขทัย โดยเฉพาะพื้นที่รอยต่อป่าเขากับชุมชน" },
            { id: "f_serow", name: "เลียงผา", category: "fauna", tags: ["rare","danger","protected"], desc: "มีหลักฐานการช่วยเหลือและปล่อยคืนเลียงผาในอุทยานแห่งชาติศรีสัชนาลัยเมื่อปี 2026" },
            { id: "f_wild_boar", name: "หมูป่า", category: "fauna", tags: ["common","danger"], desc: "สัตว์ที่เหมาะกับแนวป่าเบญจพรรณและป่าเขาของสุโขทัย พบได้ในพื้นที่ป่าอนุรักษ์" },
            { id: "t_mountain_forest_yom_plain", name: "ป่าเขาและที่ราบลุ่มแม่น้ำยม", category: "terrain", tags: ["common","danger"], desc: "สุโขทัยมีทั้งแนวภูเขาป่าอนุรักษ์และพื้นที่ราบลุ่มแม่น้ำยมซึ่งเป็นพื้นที่เกษตรและชุมชนสำคัญ" },
            { id: "c_hot_plain", name: "อากาศร้อนในพื้นที่ราบ", category: "climate", tags: ["common","danger","seasonal"], desc: "พื้นที่ราบของสุโขทัยร้อนจัดในฤดูร้อน ขณะที่แนวภูเขาจะเย็นกว่าเล็กน้อย" },
            { id: "h_flash_flood", name: "น้ำป่าไหลหลาก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "สุโขทัยอยู่ในกลุ่มจังหวัดที่มีรายงานน้ำป่าไหลหลากในช่วงฝนหนักของปี 2025" },
            { id: "h_summer_storm", name: "พายุฤดูร้อน", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "สุโขทัยได้รับอิทธิพลพายุฤดูร้อนของประเทศไทยตอนบนเช่นเดียวกับจังหวัดภาคเหนือตอนล่าง" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 18-34°C, ฤดูฝน ก.ค.-ก.ย.",
            "terrain": "ที่ราบลุ่มแม่น้ำยม รอบด้วยเนินเขา",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เมืองเก่ากับเมืองใหม่แยกกัน",
                "content": "สุโขทัยมีทั้งโซนเมืองใหม่กับอุทยานประวัติศาสตร์ที่อยู่คนละโซนกัน ควรวางแผนเรื่องที่พักและการเดินทางให้ชัดก่อน",
                "type": "route"
            },
            {
                "title": "เหมาะกับการปั่นจักรยาน",
                "content": "อุทยานประวัติศาสตร์สุโขทัยเหมาะกับการเช่าจักรยานหรือใช้รถรางมากกว่าการเดินทั้งหมด เพราะพื้นที่กว้างและแบ่งหลายโซน",
                "type": "route"
            },
            {
                "title": "เช้าเย็นดีที่สุด",
                "content": "ถ้าเที่ยวโบราณสถานควรไปช่วงเช้าหรือเย็นเพราะกลางวันร้อนชัด โดยเฉพาะหน้าแล้ง",
                "type": "season"
            },
            {
                "title": "เคารพพื้นที่มรดก",
                "content": "ควรแต่งกายสุภาพและไม่ปีนป่ายโบราณสถาน การเที่ยวแบบช้าและเงียบจะได้บรรยากาศมากกว่า",
                "type": "culture"
            },
            {
                "title": "อาหารเด่นคือก๋วยเตี๋ยวสุโขทัย",
                "content": "เมนูที่ควรลองคือก๋วยเตี๋ยวสุโขทัยและของกินพื้นบ้านในตลาดเมืองใหม่ เหมาะกับมื้อเบา ๆ หลังเที่ยวอุทยาน",
                "type": "food"
            },
            {
                "title": "ทริปประหยัดทำได้ง่าย",
                "content": "สุโขทัยเหมาะกับทริปงบกลางถึงประหยัด ค่าเข้าชมและค่าจักรยานยังคุมได้ถ้าเที่ยวแบบ 1-2 วัน",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารพาณิชย์ในเมืองใหม่สุโขทัย",
                "area": "ย่านตัวเมืองใหม่",
                "note": "สะดวกกว่าฝั่งเมืองเก่า",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันระหว่างเมืองใหม่-เมืองเก่า",
                "area": "เส้นหลักเชื่อมอุทยานประวัติศาสตร์",
                "note": "เหมาะสำหรับคนขับรถเที่ยวเอง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำในอุทยานประวัติศาสตร์และสถานีขนส่ง",
                "area": "เมืองเก่าและเมืองใหม่",
                "note": "มีตามจุดหลักของอุทยาน",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในตัวเมืองใหม่",
                "area": "ย่านตลาดและถนนหลัก",
                "note": "ของใช้จำเป็นหาได้ง่ายฝั่งเมืองใหม่",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "จุดเช่าจักรยานและบริการนักท่องเที่ยว",
                "area": "หน้าอุทยานประวัติศาสตร์สุโขทัย",
                "note": "สำคัญสำหรับเที่ยวหลายโซน",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สนามบินสุโขทัย",
                "สถานีขนส่งสุโขทัย",
                "เมืองใหม่สุโขทัย"
            ],
            "commonDestinations": [
                "อุทยานประวัติศาสตร์สุโขทัย",
                "วัดมหาธาตุ",
                "วัดศรีชุม",
                "พิพิธภัณฑสถานแห่งชาติรามคำแหง",
                "ตลาดในเมืองใหม่"
            ],
            "transitHubs": [
                "สนามบินสุโขทัย",
                "สถานีขนส่งสุโขทัย"
            ],
            "routeNotes": [
                "บขส.อยู่ฝั่งเมืองใหม่ ต้องเผื่อเวลาเดินทางไปเมืองเก่า",
                "ถ้าจะเก็บหลายโซนอุทยาน เช่าจักรยานหรือเหมารถจะคุ้มกว่าเดิน",
                "เริ่มเที่ยวแต่เช้าแล้วกลับเข้าเมืองใหม่ช่วงบ่ายจะสมดุลสุด"
            ]
        }
    },
    "Tak": {
        "transport": [
            {
                "name": "สถานีรถไฟตาก",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "สถานีรถไฟตาก บริการเดินรถทางรถไฟจากภาคเหนือ",
                "warpUrl": "",
                "logoText": "🚆",
                "color": "#808080"
            },
            {
                "name": "รถตู้แม่สอด - ตาก",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้ระหว่างเมืองแม่สอดและตัวเมืองตาก",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#0000ff"
            },
            {
                "name": "รถสองแถวตาก",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวบริการรับส่งภายในตัวเมืองตาก",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#ff0000"
            },
            {
                "name": "รถตุ๊กตุ๊กตาก",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "ตุ๊กตุ๊กสำหรับท่องเที่ยวและรับส่งในเมืองตาก",
                "warpUrl": "",
                "logoText": "🚕",
                "color": "#ffa500"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - ตาก",
                "type": "bus",
                "operator": "Green Bus",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งตาก",
                "via": [
                    "ลพบุรี",
                    "เพชรบูรณ์",
                    "พิษณุโลก",
                    "อุตรดิตถ์"
                ],
                "departureTimes": [
                    "07:00",
                    "17:00"
                ],
                "duration": "7 ชม.",
                "baseFare": 400,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - ตาก",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "หัวลำโพง",
                "to": "สถานีรถไฟตาก",
                "via": [
                    "พระนครศรีอยุธยา",
                    "นครสวรรค์",
                    "พิษณุโลก",
                    "อุตรดิตถ์"
                ],
                "departureTimes": [
                    "10:00",
                    "18:00"
                ],
                "duration": "9 ชม.",
                "baseFare": 450,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หัวลำโพง",
                "notes": null
            },
            {
                "name": "รถบัสเชียงใหม่ - ตาก",
                "type": "bus",
                "operator": "ปรับอากาศ ชาญดำเนิน",
                "from": "สถานีขนส่งอาเขตเชียงใหม่",
                "to": "สถานีขนส่งตาก",
                "via": [
                    "แม่อาย"
                ],
                "departureTimes": [
                    "08:00"
                ],
                "duration": "6 ชม.",
                "baseFare": 300,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
                "notes": null
            },
            {
                "name": "รถตู้ตาก - แม่สอด",
                "type": "van",
                "operator": "Prempracha Transport",
                "from": "สถานีขนส่งตาก",
                "to": "สถานีขนส่งแม่สอด",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "13:00"
                ],
                "duration": "2 ชม.",
                "baseFare": 150,
                "frequency": "ทุก 30 นาที",
                "terminal": "สถานีขนส่งตาก",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวแคบ",
                "priceRange": "10-20฿",
                "category": "dessert",
                "note": "ข้าวอบแห้งกรอบ หอมมะพร้าว"
            },
            {
                "name": "ไส้อั่ว",
                "priceRange": "30-50฿",
                "category": "local",
                "note": null
            },
            {
                "name": "ผัดไทยป้าเจือ",
                "priceRange": "40-60฿",
                "category": "street",
                "note": "ผัดไทยสูตรโบราณเมืองตาก"
            },
            {
                "name": "ยำไข่มดแดง",
                "priceRange": "50-100฿",
                "category": "local",
                "note": "เมนูท้องถิ่นใส่ไข่มดแดงฤดูฝน"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "โรงแรมบ้านทุ่งเสา",
                    "พิริยะ ฮาส"
                ],
                "bookingUrl": "https://www.booking.com/region/th/tak.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-2000฿/คืน",
                "examples": [
                    "โรงแรมฑิฆัมพร",
                    "ฮอป อินน์ ตาก"
                ],
                "bookingUrl": "https://www.booking.com/region/th/tak.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2000-5000฿/คืน",
                "examples": [
                    "โรงแรมริเวอร์ไซด์",
                    "โรงแรมลีลาวดี"
                ],
                "bookingUrl": "https://www.booking.com/region/th/tak.html"
            }
        ],
        "dangerZones": [
            {
                "label": "โรคไข้เลือดออก",
                "severity": "medium",
                "note": "ระบาดในฤดูฝนจากยุงลาย",
                "season": "มิ.ย.-ก.ย."
            },
            {
                "label": "ฝุ่น PM2.5",
                "severity": "medium",
                "note": "เกิดหมอกควันจากไฟป่าในฤดูแล้ง",
                "season": "ก.พ.-เม.ย."
            },
            {
                "label": "ทุ่นระเบิด",
                "severity": "high",
                "note": "พื้นที่ชายแดนมีทุ่นระเบิดที่อาจไม่ถูกเก็บกู้",
                "season": null
            }
        ],
        "ecoIds": [
            "fl_teak",
            "fl_bamboo",
            "f_elephant_wild",
            "f_tiger",
            "t_waterfall_forest_mountain",
            "c_heavy_rain_west",
            "h_flash_flood",
            "h_road_mountain"
        ],
        "newEcoEntities": [
            { id: "fl_teak", name: "ไม้สัก", category: "flora", tags: ["common","protected"], desc: "ตากมีผืนป่าขนาดใหญ่ในแนวตะวันตกของไทย ซึ่งมีไม้สักและป่าเบญจพรรณเด่น" },
            { id: "fl_bamboo", name: "ไผ่", category: "flora", tags: ["common","edible"], desc: "พบทั่วไปในพื้นที่ป่าของตาก โดยเฉพาะพื้นที่ชายป่าและภูเขา" },
            { id: "f_elephant_wild", name: "ช้างป่า", category: "fauna", tags: ["danger","rare","protected"], desc: "พื้นที่ป่าตะวันตกของตากเป็น habitat สำคัญของช้างป่า" },
            { id: "f_tiger", name: "เสือโคร่ง", category: "fauna", tags: ["danger","rare","protected"], desc: "ผืนป่าตะวันตกของไทยรวมถึงตากเป็น habitat สำคัญของเสือโคร่ง" },
            { id: "t_waterfall_forest_mountain", name: "ป่าเขาและน้ำตกขนาดใหญ่", category: "terrain", tags: ["common","danger"], desc: "ตากมีภูเขาสูง ป่าดิบ และน้ำตกใหญ่ระดับประเทศ เช่น ทีลอซู" },
            { id: "c_heavy_rain_west", name: "ฝนตกหนักในป่าตะวันตก", category: "climate", tags: ["common","danger","seasonal"], desc: "พื้นที่ตะวันตกของตากรับฝนมาก ทำให้เส้นทางเข้าป่าลำบาก" },
            { id: "h_flash_flood", name: "น้ำป่าไหลหลาก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ฝนหนักในพื้นที่ภูเขาทำให้เกิดน้ำป่าไหลหลากบ่อย" },
            { id: "h_road_mountain", name: "อุบัติเหตุถนนภูเขา", category: "climate", tags: ["danger","common","extreme"], desc: "ถนนภูเขาคดเคี้ยวมาก เสี่ยงอุบัติเหตุสูง" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 20-38°C, ฝนตกชุก มิ.ย.-ต.ค.",
            "terrain": "ภูเขาสูง ป่าเขตร้อน และแม่น้ำเมย",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "จังหวัดใหญ่และกระจายตัว",
                "content": "ตากไม่ใช่จังหวัดเที่ยวจุดเดียว แต่แบ่งอารมณ์ชัดระหว่างตัวเมืองตากกับแม่สอด ถ้าจะเที่ยวหลายโซนต้องเผื่อเวลาเดินทาง",
                "type": "route"
            },
            {
                "title": "แม่สอดเป็นประตูชายแดน",
                "content": "แม่สอดมีบทบาทเป็นเมืองชายแดน การเดินทางคึกคักกว่าตัวเมืองตากและเหมาะกับคนที่ต้องต่อเส้นทางหรือทำธุระชายแดน",
                "type": "route"
            },
            {
                "title": "หน้าหนาวเที่ยวสบาย",
                "content": "ช่วงพฤศจิกายนถึงกุมภาพันธ์อากาศดีที่สุด โดยเฉพาะคนที่จะขึ้นพื้นที่ภูเขาหรือเที่ยวธรรมชาติ",
                "type": "season"
            },
            {
                "title": "ขับรถต้องดูระยะ",
                "content": "ระยะระหว่างจุดท่องเที่ยวค่อนข้างไกลกว่าที่คิด และบางเส้นเป็นทางเขาหรือทางยาวตรง ควรเติมน้ำมันและพักรถเป็นระยะ",
                "type": "safety"
            },
            {
                "title": "อาหารหลากหลายขึ้นในแม่สอด",
                "content": "ถ้าอยากได้อาหารหลายสไตล์หรือบรรยากาศเมืองชายแดน แม่สอดมีตัวเลือกมากกว่าตัวเมืองตาก",
                "type": "food"
            },
            {
                "title": "งบขึ้นกับโซน",
                "content": "ตัวเมืองตากคุมงบง่ายกว่า แต่ถ้าเที่ยวแม่สอดหรือพักรีสอร์ตธรรมชาติ ค่าใช้จ่ายจะขยับขึ้น",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารพาณิชย์ในตัวเมืองตากและแม่สอด",
                "area": "อำเภอเมืองตากและอำเภอแม่สอด",
                "note": "แม่สอดมีบริการหนาแน่นกว่า",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันตามเส้นเอเชียและทางไปแม่สอด",
                "area": "เส้นหลักผ่านจังหวัดตาก",
                "note": "ควรเติมก่อนวิ่งยาวหรือขึ้นเขา",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสถานีขนส่งและจุดพักรถ",
                "area": "สถานีขนส่งตาก จุดพักตามทางหลวง",
                "note": "ใช้ได้ดีสำหรับคนเดินทางต่อ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในเมืองและแม่สอด",
                "area": "เขตชุมชนหลัก",
                "note": "แม่สอดมีตัวเลือกมากกว่า",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจในตัวเมืองและเมืองชายแดน",
                "area": "อำเภอเมืองตากและแม่สอด",
                "note": "จุดชายแดนควรพกเอกสารให้พร้อม",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สถานีขนส่งตาก",
                "สนามบินแม่สอด",
                "สถานีขนส่งแม่สอด"
            ],
            "commonDestinations": [
                "แม่สอด",
                "ตลาดริมเมย",
                "ตัวเมืองตาก",
                "สะพานสมโภชกรุงรัตนโกสินทร์ 200 ปี",
                "น้ำตกทีลอซู"
            ],
            "transitHubs": [
                "สถานีขนส่งตาก",
                "สนามบินแม่สอด",
                "สถานีขนส่งแม่สอด"
            ],
            "routeNotes": [
                "ตากกับแม่สอดเป็นคนละโซนการเที่ยว อย่าประเมินเวลาแบบเที่ยวในเมืองเดียว",
                "เส้นเข้าธรรมชาติบางแห่งควรเช็กฤดูและสภาพถนนก่อน",
                "ถ้าจะต่อไปชายแดนหรือทำธุระ ควรเผื่อเวลาเอกสารและด่าน"
            ]
        }
    }
};
