// Portal seed data: ภาคใต้ Part 1 (5 จังหวัด)
// Source: documents/deepreserach/part6_ภาคใต้.md
import type { ProvincePortalSeedData } from './db';

export const southPart1: Record<string, ProvincePortalSeedData> = {
    "Surat Thani": {
        "transport": [
            {
                "name": "รถสองแถวสุราษฎร์ธานี",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "บริการรถสองแถวในเมืองและอำเภอต่างๆ",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#EAB308"
            },
            {
                "name": "รถตู้ดอนสัก-เกาะสมุย",
                "shortName": "ตู้ดอนสัก",
                "type": "van",
                "description": "รถตู้โดยสารเชื่อมต่อระหว่างเมืองสุราษฎร์ฯ ถึงท่าเรือดอนสัก",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#10B981"
            },
            {
                "name": "เรือเฟอร์รี่นกแอร์ สุราษฎร์ฯ-เกาะสมุย",
                "shortName": "เรือเฟอร์รี่",
                "type": "boat",
                "description": "เรือโดยสารเชื่อมระหว่างฝั่งสุราษฎร์ธานีกับเกาะสมุย",
                "warpUrl": "",
                "logoText": "🛥️",
                "color": "#3B82F6"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: ดอนเมือง - สุราษฎร์ธานี",
                "type": "plane",
                "operator": "AirAsia",
                "from": "สนามบินดอนเมือง",
                "to": "สนามบินสุราษฎร์ธานี",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "13:00",
                    "19:00"
                ],
                "duration": "1 ชม.",
                "baseFare": 800,
                "frequency": "หลายเที่ยวต่อวัน",
                "terminal": "สนามบินดอนเมือง",
                "notes": null
            },
            {
                "name": "สาย 2: กรุงเทพฯ - สุราษฎร์ธานี",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "สถานีรถไฟหัวลำโพง",
                "to": "สถานีรถไฟสุราษฎร์ธานี",
                "via": [
                    "นครปฐม",
                    "ราชบุรี",
                    "เพชรบุรี",
                    "ประจวบคีรีขันธ์",
                    "ชุมพร"
                ],
                "departureTimes": [
                    "07:30",
                    "17:30"
                ],
                "duration": "9-10 ชม.",
                "baseFare": 600,
                "frequency": "วันละ 2-3 เที่ยว",
                "terminal": "สถานีรถไฟหัวลำโพง",
                "notes": null
            },
            {
                "name": "สาย 3: หมอชิต - สุราษฎร์ธานี",
                "type": "bus",
                "operator": "บขส.",
                "from": "สถานีขนส่งหมอชิต 2",
                "to": "สถานีขนส่งสุราษฎร์ธานี",
                "via": [
                    "ราชบุรี",
                    "ประจวบคีรีขันธ์",
                    "ชุมพร"
                ],
                "departureTimes": [
                    "18:00",
                    "20:00",
                    "23:00"
                ],
                "duration": "10-12 ชม.",
                "baseFare": 700,
                "frequency": "หลายเที่ยวต่อวัน",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ผัดไทยไชยา",
                "priceRange": "50-80฿",
                "category": "street",
                "note": null
            },
            {
                "name": "ปลาหมอหลานเคย",
                "priceRange": "60-100฿",
                "category": "local",
                "note": "เมนูขึ้นชื่อท้องถิ่น อ.ย่านตาขาว"
            },
            {
                "name": "แกงไตปลา",
                "priceRange": "50-70฿",
                "category": "local",
                "note": "เครื่องแกงใต้เข้มข้นใส่ปลาทู"
            },
            {
                "name": "สะตอผัดกุ้ง",
                "priceRange": "60-120฿",
                "category": "local",
                "note": "สะตอต้มสุกผัดรวมกับกุ้งสด"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "500-1000฿/คืน",
                "examples": [
                    "The Episode Boutique Hotel",
                    "Baansrisuthum 2"
                ],
                "bookingUrl": "https://www.booking.com/region/th/surat-thani.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "Dusit Princess Koh Samui",
                    "Phanganak Resort"
                ],
                "bookingUrl": "https://www.booking.com/region/th/surat-thani.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "4000-10000฿/คืน",
                "examples": [
                    "Vana Belle Resort (เกาะสมุย)",
                    "The Ritz-Carlton, Koh Samui"
                ],
                "bookingUrl": "https://www.booking.com/region/th/surat-thani.html"
            }
        ],
        "dangerZones": [
            {
                "label": "มรสุมฝนตกหนัก",
                "severity": "high",
                "note": "ฝนตกหนักมีน้ำท่วมขังในหลายพื้นที่",
                "season": "ก.ย.-พ.ย."
            },
            {
                "label": "แดดร้อนจัด",
                "severity": "medium",
                "note": "อุณหภูมิสูงในฤดูร้อน เสี่ยงเป็นลมแดด",
                "season": "มี.ค.-พ.ค."
            }
        ],
        "ecoIds": [
                "fl_rafflesia",
                "fl_mangrove",
                "f_whitehanded_gibbon",
                "f_gaur",
                "t_limestone_lake",
                "c_heavy_rain",
                "h_flash_flood",
                "h_landslide"
        ],
        "newEcoEntities": [
                { id: "fl_rafflesia", name: "บัวผุด", category: "flora", tags: ["common","rare","protected","seasonal"], desc: "พืชดอกขนาดใหญ่ที่พบในป่าดิบชื้นบางส่วนของสุราษฎร์ธานี โดยเฉพาะพื้นที่ป่าฝนสมบูรณ์ ควรชมโดยไม่เหยียบย่ำพื้นที่รอบโคน" },
                { id: "fl_mangrove", name: "โกงกาง", category: "flora", tags: ["common"], desc: "ไม้เด่นของป่าชายเลนชายฝั่งสุราษฎร์ฯ ช่วยยึดตะกอนและเป็นแหล่งอนุบาลสัตว์น้ำ" },
                { id: "f_whitehanded_gibbon", name: "ชะนีมือขาว", category: "fauna", tags: ["rare","danger","protected"], desc: "พบในผืนป่าฝนขนาดใหญ่ของจังหวัด นักท่องเที่ยวควรเว้นระยะและไม่ให้อาหาร" },
                { id: "f_gaur", name: "กระทิง", category: "fauna", tags: ["danger","rare","protected"], desc: "สัตว์กีบขนาดใหญ่ในผืนป่าภาคใต้ พบไม่บ่อยแต่หากเผชิญระยะใกล้ไม่ควรเข้าใกล้หรือขวางทาง" },
                { id: "t_limestone_lake", name: "ภูเขาหินปูนและทะเลสาบเชี่ยวหลาน", category: "terrain", tags: ["common"], desc: "ภูมิประเทศเด่นของสุราษฎร์ฯ คือภูเขาหินปูนสูงชันและอ่างเก็บน้ำขนาดใหญ่ในผืนป่าดิบชื้น" },
                { id: "c_heavy_rain", name: "ฝนชุกยาวนาน", category: "climate", tags: ["common","danger","seasonal"], desc: "จังหวัดมีฝนมากจากอิทธิพลมรสุมและภูมิประเทศป่าฝน ทำให้เส้นทางธรรมชาติเปียกลื่นและทัศนวิสัยลดลง" },
                { id: "h_flash_flood", name: "น้ำป่าไหลหลาก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "พื้นที่ป่าต้นน้ำและน้ำตกมีความเสี่ยงน้ำหลากฉับพลันหลังฝนตกหนักต่อเนื่อง" },
                { id: "h_landslide", name: "ดินถล่ม", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ลาดชันในเขตภูเขาและดินอุ้มน้ำสูงมีโอกาสเกิดดินถล่มเมื่อฝนตกสะสมมาก" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 25-33°C, ฝนตกชุก พ.ค.-พ.ย.",
            "terrain": "พื้นที่ชายฝั่ง และเกาะหลายแห่ง มีป่าเขตร้อนในพื้นที่ภูเขา",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลสุราษฎร์ธานี",
                    "number": "077-952900"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "ฤดูกาลเที่ยว",
                "content": "ช่วงที่เที่ยวเกาะต่างๆ ของจังหวัดสุราษฎร์ธานีได้ดีที่สุดอยู่ระหว่างเดือนเมษายนถึงพฤศจิกายน. ระวังพายุฤดูฝนซึ่งอาจมีคลื่นลมแรงในทะเลช่วงตุลาคมถึงธันวาคม.",
                "type": "season"
            },
            {
                "title": "วัฒนธรรมท้องถิ่น",
                "content": "สุราษฎร์ธานีมีชื่อเดิมแปลว่า \"เมืองแห่งคนดี\" และเป็นจังหวัดที่มีเกาะนับพัน เช่นเกาะสมุย เกาะพะงัน ซึ่งได้รับอิทธิพลวัฒนธรรมมาเลย์และจีนอยู่บ้าง.",
                "type": "culture"
            },
            {
                "title": "อาหารพื้นเมือง",
                "content": "อาหารท้องถิ่นขึ้นชื่อ ได้แก่ ก๋วยจั๊บเวียดนาม (ก๋วยจั๊บญวน), ข้าวยำสุราษฎร์ และกะปิหวาน รวมถึงมีหอยต่างๆ อาทิ หอยพุ (หอยป่าปากนคร), หมูหวานจากกะทิใต้.",
                "type": "food"
            },
            {
                "title": "การเดินทางไปเกาะ",
                "content": "ท่าเรือดอนสักเป็นจุดขึ้นเรือหลักไปยังเกาะสมุย เกาะพะงัน และเกาะเต่า ควรวางแผนตารางเวลาเรือตามฤดูกาลท่องเที่ยวและสภาพอากาศเพื่อไม่ให้พลาดขบวนเรือ.",
                "type": "route"
            },
            {
                "title": "เตรียมพร้อมเรื่องงบประมาณ",
                "content": "ช่วงท่องเที่ยวสูง เช่น ธันวาคม–มกราคม ค่าโรงแรมบนเกาะสมุยจะสูงสุดในรอบปี. ควรวางแผนจองที่พักล่วงหน้าในเดือนพีคหรือเที่ยวช่วงไหล่ฤดูกาลเพื่อได้ราคาประหยัดกว่า.",
                "type": "budget"
            },
            {
                "title": "ความปลอดภัยทางทะเล",
                "content": "หลีกเลี่ยงการว่ายน้ำหรือดำน้ำเมื่อมีธงแดงขึ้นชายหาด และระวังแมงกะพรุนสีฟ้าร้ายแรงช่วงกลางกรกฎาคมถึงกันยายน. ผู้ที่ไม่ชำนาญควรมีเสื้อชูชีพหรือสมัครดำน้ำโดยไกด์ท้องถิ่น.",
                "type": "safety"
            }
        ],
        "supplyPoints": [
            {
                "type": "gas",
                "label": "PTT สถานีเติมน้ำมันท่าศาลา",
                "area": "ตำบลมะขามเตี้ย อ.เมือง",
                "note": "สถานีปั๊มใหม่มีร้านกาแฟและร้านสะดวกซื้อ เปิดไฟเปิด-ปิด 5:00-22:30",
                "openHours": "5:00-22:30",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลสุราษฎร์ธานี",
                "area": "อ.เมือง (ต.มะขามเตี้ย)",
                "note": "โรงพยาบาลหลักประจำจังหวัด (ศูนย์การแพทย์ระดับภูมิภาค)",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขาสุราษฎร์ธานี",
                "area": "ตัวเมืองสุราษฎร์ธานี",
                "note": "มีเครื่อง ATM ให้บริการ",
                "openHours": "8:30-15:30",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "7-Eleven (หน้าสนามบินสุราษฎร์ธานี)",
                "area": "อ.เมือง (ท่าศาลา)",
                "note": "ร้านสะดวกซื้อ-ATM 24 ชม.",
                "openHours": "24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "Bangkok (เครื่องบิน/รถบัส)",
                "นครศรีธรรมราช (รถยนต์)",
                "สุราษฎร์ธานี (สนามบิน/สถานีรถไฟ)"
            ],
            "commonDestinations": [
                "เกาะสมุย",
                "เกาะพะงัน",
                "หาดชะอำ (เมืองสุราษฎร์ธานี)",
                "สวนพุเตย",
                "วัดพระบรมธาตุไชยา",
                "หินตา-ยาย"
            ],
            "transitHubs": [
                "สนามบินสุราษฎร์ธานี",
                "สถานีรถไฟสุราษฎร์ธานี",
                "ท่าเรือดอนสัก"
            ],
            "routeNotes": [
                "ทางหลวง 41 เชื่อมต่อไปภูเก็ต-หาดใหญ่",
                "จราจรติดขัดบ้างในเทศกาลมหาสงกรานต์และปีใหม่",
                "ระวังเส้นทางน้ำท่วมช่วงปลายฝนต้นหนาว"
            ]
        }
    },
    "Phuket": {
        "transport": [
            {
                "name": "ภูเก็ตสมาร์ทบัส",
                "shortName": "SmartBus",
                "type": "bus",
                "description": "รถประจำทางพลังงานไฟฟ้าให้บริการเส้นทางหลัก",
                "warpUrl": "https://phuketsmartbus.com",
                "logoText": "🚌",
                "color": "#0077CC"
            },
            {
                "name": "ตุ๊กตุ๊กภูเก็ต",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "รถตุ๊กตุ๊กให้บริการรับจ้างในตัวเมืองและแหล่งท่องเที่ยว",
                "warpUrl": "",
                "logoText": "🛺",
                "color": "#DC143C"
            },
            {
                "name": "รถแท็กซี่มิเตอร์ภูเก็ต",
                "shortName": "แท็กซี่",
                "type": "other",
                "description": "รถแท็กซี่มิเตอร์ให้บริการทั่วไป",
                "warpUrl": "",
                "logoText": "🚖",
                "color": "#1D4ED8"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: สนามบินดอนเมือง - ภูเก็ต",
                "type": "plane",
                "operator": "Bangkok Airways",
                "from": "สนามบินดอนเมือง",
                "to": "สนามบินภูเก็ต",
                "via": [],
                "departureTimes": [
                    "06:30",
                    "14:00",
                    "20:00"
                ],
                "duration": "1 ชม.",
                "baseFare": 1000,
                "frequency": "หลายเที่ยวต่อวัน",
                "terminal": "สนามบินดอนเมือง",
                "notes": null
            },
            {
                "name": "สาย 2: หมอชิต - ภูเก็ต",
                "type": "bus",
                "operator": "บขส.",
                "from": "สถานีขนส่งหมอชิต 2",
                "to": "สถานีขนส่งภูเก็ต 1",
                "via": [
                    "นครปฐม",
                    "ราชบุรี",
                    "เพชรบุรี",
                    "ชุมพร"
                ],
                "departureTimes": [
                    "17:00",
                    "20:00",
                    "23:00"
                ],
                "duration": "11-12 ชม.",
                "baseFare": 800,
                "frequency": "หลายเที่ยวต่อวัน",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 3: ภูเก็ต (สมุย) - ภูเก็ต (เกาะสมุย)",
                "type": "boat",
                "operator": "Raja Ferry",
                "from": "ท่าเรือภูเก็ต",
                "to": "เกาะสมุย",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "15:00"
                ],
                "duration": "2 ชม.",
                "baseFare": 150,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "ท่าเรือรัษฎา",
                "notes": "มีสองบริษัทหลักให้บริการ"
            }
        ],
        "localFoods": [
            {
                "name": "หมูฮ้อง",
                "priceRange": "100-150฿",
                "category": "local",
                "note": "หมูสามชั้นหมักเครื่องเทศตุ๋นเปื่อยนุ่ม"
            },
            {
                "name": "ข้าวซอยภูเก็ต",
                "priceRange": "50-70฿",
                "category": "local",
                "note": "เส้นหมี่ราดน้ำแกงกะทิใส่เนื้อ"
            },
            {
                "name": "น้ำพริกกุ้งเสียบ",
                "priceRange": "30-50฿",
                "category": "local",
                "note": "น้ำพริกพื้นเมืองใส่กุ้งฝอยกรอบ"
            },
            {
                "name": "โอ๊ะเอ๋ว",
                "priceRange": "30-50฿",
                "category": "dessert",
                "note": "วุ้นใสคล้ายเจลาตินราดน้ำเชื่อมใส่น้ำแข็ง"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "600-1200฿/คืน",
                "examples": [
                    "Lub D Phuket Patong (Hostel)",
                    "Bodega Phuket"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phuket.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "2500-4000฿/คืน",
                "examples": [
                    "Holiday Inn Express Patong",
                    "Novotel Phuket Kamala"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phuket.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "5000-20000฿/คืน",
                "examples": [
                    "Andara Resort & Villas",
                    "Sri Panwa Phuket"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phuket.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ฤดูมรสุมฝนตกหนัก",
                "severity": "high",
                "note": "ฝนตกหนักและลมแรงช่วงมิ.ย.-ต.ค.",
                "season": "มิ.ย.-ต.ค."
            },
            {
                "label": "สึนามิ",
                "severity": "high",
                "note": "ความเสี่ยงจากคลื่นยักษ์ในทะเลอันดามัน",
                "season": null
            }
        ],
        "ecoIds": [
                "fl_mangrove",
                "fl_seagrass",
                "f_dugong",
                "f_sea_turtle",
                "t_coastal_headland",
                "c_southwest_monsoon",
                "h_rip_current",
                "h_coastal_flood"
        ],
        "newEcoEntities": [
                { id: "fl_mangrove", name: "โกงกาง", category: "flora", tags: ["common"], desc: "ป่าชายเลนยังเป็นระบบนิเวศสำคัญของภูเก็ต ช่วยลดคลื่นและเป็นแหล่งสัตว์น้ำวัยอ่อน" },
                { id: "fl_seagrass", name: "หญ้าทะเล", category: "flora", tags: ["common","rare","protected"], desc: "แหล่งหญ้าทะเลของภูเก็ตมีความสำคัญต่อสัตว์ทะเลกินหญ้าและสัตว์หน้าดิน แต่บางพื้นที่มีภาวะเสื่อมโทรม" },
                { id: "f_dugong", name: "พะยูน", category: "fauna", tags: ["common","rare","protected"], desc: "มีรายงานการใช้พื้นที่หญ้าทะเลของพะยูนตามชายฝั่งอันดามัน รวมถึงพื้นที่ใกล้ภูเก็ต ควรหลีกเลี่ยงการรบกวนด้วยเรือ" },
                { id: "f_sea_turtle", name: "เต่าทะเล", category: "fauna", tags: ["rare","danger","protected","seasonal"], desc: "เต่าทะเลพบในน่านน้ำและชายหาดบางส่วนของภูเก็ต โดยเฉพาะช่วงวางไข่และขึ้นหาด" },
                { id: "t_coastal_headland", name: "แหลมชายฝั่งและหาดทราย", category: "terrain", tags: ["common"], desc: "ภูเก็ตมีชายฝั่งหลากหลายทั้งหาดทราย แหลมหิน และอ่าวตื้น เหมาะกับกิจกรรมทะเลแต่ความเสี่ยงต่างกันมากตามฤดูกาล" },
                { id: "c_southwest_monsoon", name: "มรสุมตะวันตกเฉียงใต้แรง", category: "climate", tags: ["common","danger","seasonal"], desc: "ช่วงมรสุมฝั่งอันดามันมีฝนถี่ คลื่นลมแรง และทะเลแปรปรวนกว่าฤดูท่องเที่ยวปกติ" },
                { id: "h_rip_current", name: "กระแสน้ำย้อนกลับ", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "หาดหลายแห่งของภูเก็ตเสี่ยง rip current ในช่วงคลื่นลมแรง นักท่องเที่ยวไม่ควรลงเล่นน้ำเมื่อมีธงแดง" },
                { id: "h_coastal_flood", name: "น้ำท่วมขังเมืองและชายฝั่ง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนหนักระยะสั้นทำให้เกิดน้ำท่วมขังและน้ำไหลแรงในเขตเมืองท่องเที่ยวได้เร็ว" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 24-32°C, ร้อนชื้น ฝนตกชุก พ.ค.-ต.ค.",
            "terrain": "เกาะและชายฝั่งทะเล มีภูเขาหินปูนในบางพื้นที่",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลวชิระภูเก็ต",
                    "number": "076-361234"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "ชายหาดและความหนาแน่น",
                "content": "ชายหาดฝั่งใต้ของภูเก็ต เช่น ป่าตอง กะรน มักมีคนพลุกพล่าน ขณะที่ฝั่งเหนือ (เช่น หาดไม้ขาว หาดในยาง) เงียบสงบกว่า.",
                "type": "route"
            },
            {
                "title": "เตรียมพร้อมอุปกรณ์น้ำ",
                "content": "ทุกชายหาดหลักอย่าง ป่าตอง, กะตะ, กะหลิม มีบริการดำน้ำตื้น พายเรือ และเล่นกระดานโต้คลื่น ควรสังเกตธงเตือนการว่ายน้ำทุกครั้ง.",
                "type": "safety"
            },
            {
                "title": "วัฒนธรรมจีนพุทธ",
                "content": "ภูเก็ตมีชุมชนชาวจีนโพ้นทะเลขนาดใหญ่ จึงมีศาลเจ้าจีนหลายแห่ง รวมถึงจัดงานเทศกาลกินเจ (Vegetarian Festival) ทุกปี.",
                "type": "culture"
            },
            {
                "title": "ค่าใช้จ่ายช่วงเทศกาล",
                "content": "ช่วงไฮซีซั่น (พ.ย.-ก.พ.) เป็นช่วงที่ราคาโรงแรมและร้านอาหารสูง ผู้ที่ต้องการเดินทางในงบจำกัดควรพิจารณาช่วงปลายฝน (มิ.ย.-ก.ย.) ที่อากาศยังดีและคนไม่หนาแน่น",
                "type": "budget"
            },
            {
                "title": "อาหารพื้นเมือง",
                "content": "ภูเก็ตมีอาหารพื้นเมืองหลากหลาย เช่น แกงไตปลาภูเก็ต, ขนมจีนภูเก็ต, ข้าวแช่ รวมถึงอาหารทะเลสดจากเกาะแก้วพิสดารต่างๆ ในย่านเมืองเก่าภูเก็ต",
                "type": "food"
            }
        ],
        "supplyPoints": [
            {
                "type": "clinic",
                "label": "โรงพยาบาลวชิระภูเก็ต",
                "area": "อ.เมืองภูเก็ต",
                "note": "โรงพยาบาลหลักของจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรหาดป่าตอง",
                "area": "เขตป่าตอง อ.กะทู้",
                "note": "จุดบริการนักท่องเที่ยวกู้ภัยฉุกเฉิน",
                "openHours": "0:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "PTT ปั๊มน้ำมันประชาราษฎร์ (ใกล้ตัวเมือง)",
                "area": "ต.ตลาดเหนือ อ.เมือง",
                "note": "ปั๊มใหญ่พร้อมร้านกาแฟและห้องสุขา",
                "openHours": "5:00-22:30",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารไทยพาณิชย์ สาขาป่าตอง",
                "area": "หาดป่าตอง อ.กะทู้",
                "note": "มี ATM ให้บริการ 24 ชั่วโมง",
                "openHours": "9:00-18:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพมหานคร",
                "หาดใหญ่ (สงขลา)",
                "พังงา"
            ],
            "commonDestinations": [
                "หาดป่าตอง",
                "หาดกะตะ",
                "เมืองเก่าภูเก็ต",
                "พระใหญ่ภูเก็ต",
                "หาดไม้ขาว",
                "วัดฉลอง"
            ],
            "transitHubs": [
                "สนามบินภูเก็ต",
                "ท่าเรือภูเก็ต",
                "สถานีขนส่งผู้โดยสารภูเก็ต (บขส.)"
            ],
            "routeNotes": [
                "ถนนรอบเกาะ (402) เปิดไฟจราจร 2 เลน มีรถรับส่งถึงกันในเมือง, รถจะติดในช่วงเทศกาล",
                "ควรข้ามไปเกาะพีพีหรือกระบี่โดยเรือเฟอร์รี่จากภูเก็ต"
            ]
        }
    },
    "Krabi": {
        "transport": [
            {
                "name": "รถสองแถวกระบี่",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวรับจ้างเที่ยวในเมืองและชายหาด",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#8B4513"
            },
            {
                "name": "เรือท่องเที่ยวเกาะพีพี",
                "shortName": "เรือทัวร์",
                "type": "boat",
                "description": "เรือเร็วและเรือใหญ่ไปยังหมู่เกาะต่างๆ เช่น พีพีและลันตา",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#2563EB"
            },
            {
                "name": "แท็กซี่กอล์ฟคาร์",
                "shortName": "กอล์ฟคาร์",
                "type": "other",
                "description": "รถกอล์ฟคาร์ให้บริการรับส่งนักท่องเที่ยวในพื้นที่เมืองกระบี่",
                "warpUrl": "",
                "logoText": "🛺",
                "color": "#2E8B57"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: หมอชิต - กระบี่",
                "type": "bus",
                "operator": "บขส.",
                "from": "สถานีขนส่งหมอชิต 2",
                "to": "สถานีขนส่งกระบี่",
                "via": [
                    "ราชบุรี",
                    "ชุมพร",
                    "สุราษฎร์ธานี"
                ],
                "departureTimes": [
                    "19:00",
                    "22:00"
                ],
                "duration": "12 ชม.",
                "baseFare": 850,
                "frequency": "วันละ 2-3 เที่ยว",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 2: กรุงเทพฯ - กระบี่",
                "type": "plane",
                "operator": "Nok Air",
                "from": "สนามบินดอนเมือง",
                "to": "สนามบินกระบี่",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "13:00",
                    "18:00"
                ],
                "duration": "1.5 ชม.",
                "baseFare": 900,
                "frequency": "หลายเที่ยวต่อวัน",
                "terminal": "สนามบินดอนเมือง",
                "notes": null
            },
            {
                "name": "สาย 3: ท่าเรือคลองเตย - เกาะลันตา",
                "type": "boat",
                "operator": "เรือข้ามฟากลันตา",
                "from": "ท่าเรือคลองเตย (อ่าวนาง)",
                "to": "เกาะลันตา",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "12:00",
                    "16:00"
                ],
                "duration": "30 นาที",
                "baseFare": 30,
                "frequency": "ทุก 4 ชม.",
                "terminal": "ท่าเรือคลองเตย",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ปลาทรายทอดขมิ้น",
                "priceRange": "100-150฿",
                "category": "local",
                "note": "ปลาทรายชิ้นทอดกรอบผัดกับผงขมิ้น"
            },
            {
                "name": "โรตีมะตะบะ",
                "priceRange": "30-50฿",
                "category": "street",
                "note": "โรตีกรอบไส้แกงกะหรี่ไก่ใส่ไข่"
            },
            {
                "name": "แกงเหลืองปลาแป๊ะซะ",
                "priceRange": "60-100฿",
                "category": "local",
                "note": "แกงเหลืองใส่ปลาท้องถิ่นรสจัด"
            },
            {
                "name": "หมี่กรอบเมืองกระบี่",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "เส้นหมี่กรอบราดน้ำซุปตุ๋นไก่"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "500-1200฿/คืน",
                "examples": [
                    "Blu Monkey Hub & Hotel (กระบี่)",
                    "ขวัญเวียงเกสต์เฮาส์"
                ],
                "bookingUrl": "https://www.booking.com/region/th/krabi.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "Centara Anda Dhevi Resort",
                    "Ao Nang Beachfront Resort"
                ],
                "bookingUrl": "https://www.booking.com/region/th/krabi.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "4000-15000฿/คืน",
                "examples": [
                    "Rayavadee Resort",
                    "Phulay Bay, Ritz-Carlton"
                ],
                "bookingUrl": "https://www.booking.com/region/th/krabi.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ฝนตกหนัก/น้ำท่วม",
                "severity": "high",
                "note": "น้ำป่าไหลหลากและน้ำท่วมถนนในฤดูฝน",
                "season": "มิ.ย.-ต.ค."
            },
            {
                "label": "คลื่นลมแรง",
                "severity": "medium",
                "note": "คลื่นลมแรงอันตรายช่วงธันวาคม-กุมภาพันธ์",
                "season": "ธ.ค.-ก.พ."
            }
        ],
        "ecoIds": [
                "fl_seagrass",
                "fl_mangrove",
                "f_dugong",
                "f_whitehanded_gibbon",
                "t_karst_coast",
                "c_monsoon_rain",
                "h_flash_flood",
                "h_rip_current"
        ],
        "newEcoEntities": [
                { id: "fl_seagrass", name: "หญ้าทะเล", category: "flora", tags: ["common","protected"], desc: "กระบี่มีแหล่งหญ้าทะเลสำคัญของฝั่งอันดามัน เป็นฐานอาหารของพะยูนและสัตว์ทะเลอีกหลายชนิด" },
                { id: "fl_mangrove", name: "ป่าชายเลน", category: "flora", tags: ["common"], desc: "ป่าชายเลนกระบี่เป็นแหล่งดูดซับคาร์บอนและเป็นแนวกันชนธรรมชาติของชายฝั่ง" },
                { id: "f_dugong", name: "พะยูน", category: "fauna", tags: ["common","rare","protected"], desc: "พะยูนยังใช้พื้นที่ทะเลตื้นของกระบี่เป็นแหล่งหากิน จึงควรควบคุมความเร็วเรือในแนวหญ้าทะเล" },
                { id: "f_whitehanded_gibbon", name: "ชะนีมือขาว", category: "fauna", tags: ["rare","danger","protected"], desc: "พบในพื้นที่ป่าดิบเขาและป่าดิบชื้นของกระบี่ ไม่ควรเปิดเสียงล่อหรือให้อาหาร" },
                { id: "t_karst_coast", name: "หน้าผาหินปูนและเกาะหินปูน", category: "terrain", tags: ["common"], desc: "ภูมิประเทศเด่นของกระบี่คือภูเขาหินปูนชัน ถ้ำ และอ่าวเว้าแหว่งจำนวนมาก" },
                { id: "c_monsoon_rain", name: "ฝนมรสุมฝั่งอันดามัน", category: "climate", tags: ["common","danger","seasonal"], desc: "ช่วงฤดูฝนกระบี่มีฝนตกชุกและคลื่นลมแรง การเดินเรือและกิจกรรมหน้าผาควรติดตามประกาศอากาศ" },
                { id: "h_flash_flood", name: "น้ำป่าและน้ำหลาก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ฝนตกสะสมในพื้นที่ภูเขาหินปูนและป่าดิบสามารถทำให้น้ำหลากได้รวดเร็ว" },
                { id: "h_rip_current", name: "คลื่นแรงและกระแสน้ำย้อน", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ชายหาดบางแห่งของกระบี่มีคลื่นลมแรงและกระแสน้ำอันตรายในฤดูมรสุม" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 24-33°C, ชื้น ฝนตก พ.ค.-ต.ค.",
            "terrain": "หน้าผาหินปูน ชายหาด และป่าชายเลน",
            "bestSeason": "พ.ย.-เม.ย.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลกระบี่",
                    "number": "075-626700"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "จองล่วงหน้า",
                "content": "ช่วงไฮซีซั่น (ปลาย ธ.ค. ถึงต้น ม.ค.) จองที่พักล่วงหน้านานถึงหนึ่งปีเพื่อหลีกเลี่ยงที่พักเต็ม.",
                "type": "budget"
            },
            {
                "title": "ออกตั๋วเรือกลับ",
                "content": "ในการเดินทางไปเกาะต่างๆ รอบกระบี่ อาจซื้อตั๋วขากลับแบบเที่ยวเดียวเพื่อความยืดหยุ่นในการเปลี่ยนแปลงตารางเดินทาง.",
                "type": "route"
            },
            {
                "title": "ธรรมชาติยอดนิยม",
                "content": "กระบี่มีหินปูนสวยงามและชายหาด เช่น ทะเลแหวก อ่าวไร่เลย์ นอกจากนี้ยังมีอุทยานแห่งชาติหาดนพรัตน์ธารา-หมู่เกาะพีพี และน้ำตกร้อนคลองท่อม.",
                "type": "culture"
            },
            {
                "title": "ความปลอดภัย",
                "content": "ช่วงโลว์ซีซั่นควรตรวจสอบสภาพอากาศก่อนออกทริปทะเล เพราะท้องฟ้ามืดครึ้มอาจเกิดคลื่นสูงได้ โดยเฉพาะช่วงพฤษภาคม-ตุลาคม.",
                "type": "safety"
            }
        ],
        "supplyPoints": [
            {
                "type": "clinic",
                "label": "โรงพยาบาลกระบี่",
                "area": "อ.เมืองกระบี่",
                "note": "โรงพยาบาลหลักของจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มบางจาก อ่าวนาง",
                "area": "ต.อ่าวนาง อ.เมือง",
                "note": "สถานีบริการน้ำมันใกล้ชายหาด",
                "openHours": "5:00-22:30",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจท่องเที่ยวกระบี่",
                "area": "อ.เมืองกระบี่",
                "note": "บริการช่วยเหลือนักท่องเที่ยว",
                "openHours": "0:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารกสิกรไทย สาขากระบี่",
                "area": "อ.เมืองกระบี่",
                "note": "ATM เปิดให้บริการ",
                "openHours": "8:30-15:30",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพมหานคร",
                "ภูเก็ต (เรือเฟอร์รี่)",
                "เชียงใหม่ (บินมา)"
            ],
            "commonDestinations": [
                "อ่าวนาง",
                "หาดไร่เลย์",
                "เกาะพีพี",
                "สะพานข้ามทะเลกระบี่-ถ้ำพระนาง",
                "ถ้ำเสือ (อ.อ่าวลึก)"
            ],
            "transitHubs": [
                "สนามบินกระบี่",
                "ท่าเรืออ่าวนาง",
                "สถานีขนส่งกระบี่"
            ],
            "routeNotes": [
                "ไม่มีทางบกไปหาดไร่เลย์ ต้องนั่งเรือ",
                "ควรเตรียมตัวเดินป่าเบาๆ เพราะทางขึ้นดาดฟ้าหินอาจลื่นในฤดูฝน",
                "ห้ามเล่นน้ำตรงโขดหินอันตรายใกล้ชายฝั่ง"
            ]
        }
    },
    "Phang Nga": {
        "transport": [
            {
                "name": "สองแถวพังงา",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวในเมืองพังงา",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#A0522D"
            },
            {
                "name": "เรือล่องอ่าวพังงา",
                "shortName": "เรือทัวร์",
                "type": "boat",
                "description": "เรือนำเที่ยวชมอ่าวพังงาและเกาะปันหยี",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#0E7490"
            },
            {
                "name": "รถตู้ภูเก็ต-พังงา",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้โดยสารระหว่างภูเก็ตกับพังงา",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#6B7280"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: ภูเก็ต - พังงา",
                "type": "bus",
                "operator": "ภูเก็ตสมาร์ทบัส",
                "from": "สนามบินภูเก็ต",
                "to": "ตัวเมืองพังงา",
                "via": [
                    "ถลาง"
                ],
                "departureTimes": [
                    "09:00",
                    "15:00"
                ],
                "duration": "1 ชม.",
                "baseFare": 150,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "สนามบินภูเก็ต",
                "notes": null
            },
            {
                "name": "สาย 2: กรุงเทพฯ - พังงา",
                "type": "plane",
                "operator": "Thai Vietjet",
                "from": "สนามบินสุวรรณภูมิ",
                "to": "สนามบินภูเก็ต",
                "via": [],
                "departureTimes": [
                    "10:00",
                    "16:00"
                ],
                "duration": "1 ชม. 15 นาที",
                "baseFare": 1100,
                "frequency": "หลายเที่ยวต่อวัน",
                "terminal": "สนามบินสุวรรณภูมิ",
                "notes": null
            },
            {
                "name": "สาย 3: ท่าเรือบางโรง - หมู่เกาะสุรินทร์",
                "type": "boat",
                "operator": "เรือโดยสารเกาะสุรินทร์",
                "from": "ท่าเรือบางโรง",
                "to": "หมู่เกาะสุรินทร์",
                "via": [],
                "departureTimes": [
                    "07:30"
                ],
                "duration": "3 ชม.",
                "baseFare": 400,
                "frequency": "วันละครั้ง (ฤดูท่องเที่ยว)",
                "terminal": "ท่าเรือบางโรง",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "หมูฮ้องพังงา",
                "priceRange": "100-150฿",
                "category": "local",
                "note": "หมูสามชั้นตุ๋นเครื่องเทศฉลองเทศกาลสารท"
            },
            {
                "name": "น้ำพริกกุ้งเสียบพังงา",
                "priceRange": "30-50฿",
                "category": "local",
                "note": "น้ำพริกส่วนผสมพิเศษของพังงา"
            },
            {
                "name": "ห่อหมกปลากะพง",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "ห่อหมกเนื้อปลาท้องทะเลรสจัด"
            },
            {
                "name": "แกงส้มปลาช่อนใบชะพลู",
                "priceRange": "60-100฿",
                "category": "local",
                "note": "แกงส้มรสเปรี้ยวกับเนื้อปลาช่อนแป้น"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "400-1000฿/คืน",
                "examples": [
                    "PP Mansion",
                    "Baan Nipha"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "The Leaf On The Sands by Katatrian",
                    "Ananda Resort"
                ],
                "bookingUrl": ""
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "4000-12000฿/คืน",
                "examples": [
                    "SALA Phuket Resort and Spa (ใกล้พังงา)",
                    "Keemala (ภูเก็ต)"
                ],
                "bookingUrl": ""
            }
        ],
        "dangerZones": [
            {
                "label": "มรสุมฝนตกหนัก",
                "severity": "high",
                "note": "ฝนตกหนักและน้ำท่วมในฤดูฝน",
                "season": "มิ.ย.-ต.ค."
            },
            {
                "label": "คลื่นลมแรง",
                "severity": "medium",
                "note": "คลื่นลมแรงช่วงฤดูมรสุมเสี่ยงอันตรายทะเล",
                "season": "ก.ย.-พ.ย."
            }
        ],
        "ecoIds": [
                "fl_mangrove",
                "fl_seagrass",
                "f_leatherback_turtle",
                "f_dugong",
                "t_karst_bay",
                "c_southwest_monsoon",
                "h_rip_current",
                "h_landslide"
        ],
        "newEcoEntities": [
                { id: "fl_mangrove", name: "ป่าชายเลน", category: "flora", tags: ["common"], desc: "พังงามีผืนป่าชายเลนขนาดใหญ่ต่อเนื่องกับอ่าวตื้นและปากแม่น้ำหลายแห่ง" },
                { id: "fl_seagrass", name: "หญ้าทะเล", category: "flora", tags: ["common","protected"], desc: "แหล่งหญ้าทะเลของพังงาเชื่อมโยงกับระบบนิเวศพะยูนและสัตว์ทะเลตื้นของอันดามัน" },
                { id: "f_leatherback_turtle", name: "เต่ามะเฟือง", category: "fauna", tags: ["rare","danger","protected","seasonal"], desc: "พังงาเป็นจังหวัดที่มีการติดตามรังวางไข่เต่ามะเฟืองอย่างต่อเนื่อง ชายหาดช่วงกลางคืนควรลดแสงและเสียง" },
                { id: "f_dugong", name: "พะยูน", category: "fauna", tags: ["common","rare","protected"], desc: "พบใช้พื้นที่หญ้าทะเลตามแนวอันดามันตอนบน ควรจำกัดการรบกวนจากเรือและกิจกรรมชายฝั่ง" },
                { id: "t_karst_bay", name: "อ่าวหินปูนและเกาะหินปูน", category: "terrain", tags: ["common"], desc: "ลักษณะเด่นของพังงาคืออ่าวตื้นกว้างที่มีเกาะหินปูนจำนวนมากและระบบคลองชายเลนสลับซับซ้อน" },
                { id: "c_southwest_monsoon", name: "ฝนหนักฝั่งอันดามัน", category: "climate", tags: ["common","danger","seasonal"], desc: "ได้รับอิทธิพลมรสุมตะวันตกเฉียงใต้ชัดเจน ทำให้เกิดฝนตกหนักและทะเลมีคลื่นลมแรง" },
                { id: "h_rip_current", name: "คลื่นทะเลแรงและกระแสน้ำย้อน", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "หาดฝั่งทะเลเปิดมีความเสี่ยงต่อคลื่นแรงและกระแสน้ำดูดกลับในฤดูมรสุม" },
                { id: "h_landslide", name: "ดินถล่มและน้ำป่า", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ฝนสะสมมากบนพื้นที่ลาดชันทำให้เกิดดินถล่มและน้ำป่าไหลแรงได้" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 24-33°C, ชื้น ฝนตก พ.ค.-ต.ค.",
            "terrain": "ภูเขาหินปูน ป่า และอ่าวทะเล มีป่าชายเลนบางส่วน",
            "bestSeason": "พ.ย.-เม.ย.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลพังงา",
                    "number": "076-413823"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "ความปลอดภัย",
                "content": "ภูเก็ต กระบี่ และพังงา เคยพบอุปกรณ์ระเบิดที่ถูกสกัดไว้เมื่อมิถุนายน 2025 จึงควรระมัดระวังบริเวณสาธารณะและติดตามข่าวสารความปลอดภัยอย่างใกล้ชิด.",
                "type": "safety"
            },
            {
                "title": "อ่าวพังงา",
                "content": "มีชื่อเสียงจากเกาะเจมส์บอนด์และภูมิทัศน์ทะเลที่มีหินปูนชัน. ควรไปเที่ยวในฤดูแห้ง (ต.ค.-เม.ย.) เพื่ออากาศดีและทัศนียภาพชัดเจน",
                "type": "route"
            },
            {
                "title": "เกาะสวยน้ำใส",
                "content": "หมู่เกาะสิมิลัน (ถ้าเดินทางผ่านพังงา) และเกาะยาว ถือเป็นจุดดำน้ำดูปะการังที่น่าสนใจ. หากไปสุสานสัตว์ทะเลในสวนอุทยาน ให้สวมรองเท้าบูทป้องกันไปหน่อย.",
                "type": "culture"
            },
            {
                "title": "อาหารท้องถิ่น",
                "content": "พังงาประเทศตัวปลายที่เชื่อมระหว่างทะเลอันดามันและอ่าวไทย อาหารขึ้นชื่อเช่น แกงส้มใส่ปลาหมอทะเล, ผลไม้พื้นถิ่น (เช่น มังคุด เกาะแรต) และของทะเลสดจากหมู่บ้านประมง",
                "type": "food"
            }
        ],
        "supplyPoints": [
            {
                "type": "police",
                "label": "สถานีตำรวจท่องเที่ยวพังงา",
                "area": "อ.เมืองพังงา",
                "note": "ช่วยเหลือผู้ประสบเหตุฉุกเฉิน",
                "openHours": "0:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลพังงา",
                "area": "อ.เมืองพังงา",
                "note": "โรงพยาบาลประจำจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. หลักห้า อ.ทับปุด",
                "area": "อ.ทับปุด",
                "note": "ถนน 4 เส้นหลัก, มี 7-11 ในบริเวณ",
                "openHours": "6:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารออมสิน สาขาพังงา",
                "area": "อ.เมืองพังงา",
                "note": "ATM รอบธนาคาร",
                "openHours": "8:30-15:30",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "ภูเก็ต (เดินทางบก)",
                "กระบี่ (เรือเฟอร์รี่)",
                "สงขลา"
            ],
            "commonDestinations": [
                "อ่าวพังงา",
                "เกาะยาวใหญ่",
                "เขาหลัก",
                "หาดท้ายเหมือง",
                "ถ้ำลอดซานตาคลอส"
            ],
            "transitHubs": [
                "สนามบินภูเก็ต",
                "ท่าเรืออ่าวปอ (ท่าเรือไปอ่าวพังงา)"
            ],
            "routeNotes": [
                "มอเตอร์เวย์ 41 และ 4 เชื่อมต่อภาคใต้ตอนล่าง",
                "ทางหลวง 4 ผ่านผ่านทะเลหมอกเขาหลักในช่วงเช้า",
                "ระวังหมอกลงจัดในยามเช้าทางขึ้นเขาหลัก (พ.ค.-ก.ย.)"
            ]
        }
    },
    "Nakhon Si Thammarat": {
        "transport": [
            {
                "name": "สองแถวคิวคลัทช์",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "สองแถวบริการในเมืองนคร",
                "warpUrl": "",
                "logoText": "🚍",
                "color": "#CD5C5C"
            },
            {
                "name": "มินิบัสไสใหญ่-นครฯ",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้รับส่งระหว่างไสใหญ่กับตัวเมือง",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#4B0082"
            },
            {
                "name": "เฟอร์รี่ขนานยนต์",
                "shortName": "เรือเฟอร์รี่",
                "type": "boat",
                "description": "เรือเชื่อมเกาะสมุย-ลิปะน้อย",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#1E3A8A"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - นครศรีฯ",
                "type": "bus",
                "operator": "บขส.",
                "from": "สถานีขนส่งหมอชิต 2",
                "to": "สถานีขนส่งนครฯ",
                "via": [
                    "ราชบุรี",
                    "สุพรรณ",
                    "ประจวบ",
                    "ชุมพร"
                ],
                "departureTimes": [
                    "18:00",
                    "22:00"
                ],
                "duration": "11 ชม.",
                "baseFare": 750,
                "frequency": "หลายเที่ยวต่อวัน",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 2: กรุงเทพฯ - นครศรีฯ",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "สถานีรถไฟหัวลำโพง",
                "to": "สถานีนครศรีธรรมราช",
                "via": [
                    "ราชบุรี",
                    "สุพรรณ",
                    "ประจวบ",
                    "ชุมพร"
                ],
                "departureTimes": [
                    "17:40"
                ],
                "duration": "11-12 ชม.",
                "baseFare": 550,
                "frequency": "วันละ 1 เที่ยว",
                "terminal": "สถานีรถไฟหัวลำโพง",
                "notes": null
            },
            {
                "name": "สาย 3: ท่าเรือขนอม - เกาะนางยวน",
                "type": "boat",
                "operator": "เรือสปีดโบ๊ท",
                "from": "ท่าเทียบเรือสิชล",
                "to": "เกาะนางยวน",
                "via": [],
                "departureTimes": [
                    "10:00"
                ],
                "duration": "30 นาที",
                "baseFare": 300,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "ท่าเรือสิชล",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ขนมจีนแกงไตปลา",
                "priceRange": "50-70฿",
                "category": "local",
                "note": "น้ำแกงไตปลารสจัด เครื่องเคียงใต้จัดเต็ม"
            },
            {
                "name": "ข้าวยำปักษ์ใต้",
                "priceRange": "40-60฿",
                "category": "local",
                "note": "ข้าวคลุกเครื่องแกงหวานพร้อมเครื่องเคียง"
            },
            {
                "name": "หมูย่างเมืองคอน",
                "priceRange": "30-50฿",
                "category": "street",
                "note": "หมูติดมันหมักเครื่องเทศสูตรท้องถิ่น"
            },
            {
                "name": "ปลาหมึกย่างน้ำผึ้ง",
                "priceRange": "60-100฿",
                "category": "street",
                "note": "ปลาหมึกย่างราดน้ำจิ้มซีฟู้ด"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "The Town Hostel",
                    "Nakhon F Street Hotel"
                ],
                "bookingUrl": "https://www.booking.com/region/th/nakhon-si-thammarat.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1000-2500฿/คืน",
                "examples": [
                    "Last Paradise Hotel",
                    "Dusit Buncha Resort"
                ],
                "bookingUrl": "https://www.booking.com/region/th/nakhon-si-thammarat.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "3000-8000฿/คืน",
                "examples": [
                    "The Crystal Hotel",
                    "InterContinental Samui Baan Taling Ngam Resort"
                ],
                "bookingUrl": "https://www.booking.com/region/th/nakhon-si-thammarat.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำท่วม",
                "severity": "high",
                "note": "น้ำท่วมในช่วงฝนตกหนัก",
                "season": "ต.ค.-ม.ค."
            },
            {
                "label": "ปะการังน้ำตาย (Bleaching)",
                "severity": "medium",
                "note": "อุณหภูมิทะเลสูงส่งผลให้ปะการังฟอกขาว",
                "season": null
            }
        ],
        "ecoIds": [
                "fl_krajood",
                "fl_wild_orchid",
                "f_southern_spectacled_langur",
                "f_waterbird",
                "t_peat_swamp",
                "c_gulf_monsoon",
                "h_flood",
                "h_peat_fire"
        ],
        "newEcoEntities": [
                { id: "fl_krajood", name: "กระจูด", category: "flora", tags: ["common"], desc: "พืชท้องถิ่นสำคัญของพื้นที่ชุ่มน้ำภาคใต้ พบตามพรุและหนองน้ำ ใช้ประโยชน์ด้านหัตถกรรมอย่างแพร่หลาย" },
                { id: "fl_wild_orchid", name: "กล้วยไม้ป่า", category: "flora", tags: ["common","rare","protected","seasonal"], desc: "ป่าดิบเขาของนครศรีฯ มีกล้วยไม้ป่าหลากหลายชนิด ไม่ควรเก็บออกจากธรรมชาติ" },
                { id: "f_southern_spectacled_langur", name: "ค่างแว่นถิ่นใต้", category: "fauna", tags: ["rare","danger","protected"], desc: "ลิงใบไม้ประจำผืนป่าภาคใต้ พบในป่าค่อนข้างสมบูรณ์ของจังหวัด" },
                { id: "f_waterbird", name: "นกน้ำอพยพ", category: "fauna", tags: ["common","protected","seasonal"], desc: "พื้นที่ชุ่มน้ำรอบทะเลน้อยรองรับนกน้ำท้องถิ่นและนกอพยพจำนวนมากในฤดูหนาว" },
                { id: "t_peat_swamp", name: "ป่าพรุควนเคร็ง", category: "terrain", tags: ["common","danger"], desc: "พื้นที่พรุขนาดใหญ่ของภาคใต้ ทำหน้าที่กักเก็บน้ำและคาร์บอน แต่มีความเปราะบางต่อการแห้งและไฟพรุ" },
                { id: "c_gulf_monsoon", name: "ฝนชุกฝั่งอ่าวไทย", category: "climate", tags: ["common","danger","seasonal"], desc: "นครศรีฯ ได้รับผลเด่นจากมรสุมตะวันออกเฉียงเหนือ ทำให้ปลายปีถึงต้นปีมีฝนหนักหลายระลอก" },
                { id: "h_flood", name: "น้ำท่วมลุ่มน้ำและเมืองลุ่มต่ำ", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "จังหวัดเผชิญน้ำท่วมซ้ำซากจากฝนสะสมและการระบายน้ำช้าของพื้นที่ลุ่ม" },
                { id: "h_peat_fire", name: "ไฟป่าพรุ", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "เมื่อระดับน้ำในพรุลดลง มีความเสี่ยงเกิดไฟพรุลุกลามยากต่อการควบคุมและส่งผลต่อคุณภาพอากาศ" }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 24-34°C, ร้อนชื้น ฝนตกชุก ก.ย.-พ.ย.",
            "terrain": "ชายฝั่งทะเลและภูเขา ป่าไม้หลากหลาย",
            "bestSeason": "พ.ย.-มี.ค.",
            "emergencyContacts": [
                {
                    "label": "โรงพยาบาลมหาราชนครศรีฯ",
                    "number": "075-340250"
                }
            ]
        },
        "knowledgeTips": [
            {
                "title": "ประวัติศาสตร์โบราณ",
                "content": "นครศรีธรรมราชเป็นเมืองเก่าแก่ มีวัดพระมหาธาตุวรมหาวิหารที่ประดิษฐานพระบรมสารีริกธาตุ เป็นหัวใจทางพุทธศาสนาในภาคใต้.",
                "type": "culture"
            },
            {
                "title": "ช่วงที่เที่ยวเหมาะ",
                "content": "ควรไปเที่ยวในฤดูหนาว (พ.ย.-ก.พ.) ซึ่งอากาศกำลังสบายสุด หากไปฤดูร้อนอากาศร้อนมากต้องเตรียมดื่มน้ำบ่อยๆ.",
                "type": "season"
            },
            {
                "title": "บรรยากาศท้องถิ่น",
                "content": "เมืองนครศรีฯเงียบสงบกว่าอำเภอหาดใหญ่, ค่าครองชีพถูกกว่าสุราษฎร์ธานี และมีอาหารท้องถิ่นรสจัดมากมาย.",
                "type": "budget"
            },
            {
                "title": "อาหารถิ่น",
                "content": "เป็นเมืองใต้แท้ๆ มีอาหารรสจัด อาทิ แกงกะทิหวาน (น้ำยาปู), ข้าวต้มทรงเครื่อง, ข้าวแช่ และมื้อบุฟเฟต์ทะเลในบางโรงแรมท้องถิ่น คุณภาพดีในราคาถูก.",
                "type": "food"
            },
            {
                "title": "ความปลอดภัยทั่วไป",
                "content": "นครศรีธรรมราชจัดว่าปลอดภัยสำหรับนักท่องเที่ยวทั่วไปราวจังหวัดเล็กๆ ในภาคใต้. ควรระมัดระวังทรัพย์สินตามปกติในพื้นที่ชุมชนคึกคัก และระวังมอเตอร์ไซค์รับจ้างขับปะทะฝรั่งคึกคะนอง",
                "type": "safety"
            }
        ],
        "supplyPoints": [
            {
                "type": "clinic",
                "label": "โรงพยาบาลมหาราชนครศรีธรรมราช",
                "area": "อ.เมือง",
                "note": "โรงพยาบาลหลักของจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมัน ปตท. รัตนโกสินทร์ อำเภอเมือง",
                "area": "ต.ปากนคร อ.เมือง",
                "note": "เป็นปั๊มใหญ่ติดถนนเพชรเกษม",
                "openHours": "5:00-22:30",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารไทยพาณิชย์ สาขานครศรีธรรมราช",
                "area": "อ.เมือง",
                "note": "ATM ให้บริการตลอด 24 ชั่วโมง",
                "openHours": "9:00-18:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "7-Eleven (ถนนราชดำเนิน)",
                "area": "อ.เมือง",
                "note": "ร้านสะดวกซื้อในเมืองใหญ่ เปิด 24 ชม.",
                "openHours": "24:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "ภูเก็ต",
                "กระบี่",
                "สุราษฎร์ธานี"
            ],
            "commonDestinations": [
                "วัดพระมหาธาตุฯ",
                "อุทยานแห่งชาติเขาหลวง",
                "หาดขนอม",
                "หมู่บ้านคีรีวง",
                "ตลาดไนท์นคร"
            ],
            "transitHubs": [
                "สนามบินนครศรีธรรมราช",
                "สถานีขนส่งนครศรีฯ",
                "สถานีรถไฟนครศรีฯ"
            ],
            "routeNotes": [
                "ทางหลวง 41 เชื่อมไปบางสะพาน-เพชรบุรี เข้าสู่กรุงเทพฯ",
                "หาดสวยขนอมอยู่ทิศตะวันตกของเมือง ใช้ทางหลวง 401",
                "มีการจราจรติดขัดในช่วงเทศกาลงานบุญเดือนสิบปลายปี"
            ]
        }
    }
};
