import type { ProvincePortalSeedData } from './db';

export const northPart3: Record<string, ProvincePortalSeedData> = {
    "kamphaengphet": {
        "transport": [
            {
                "name": "สถานีขนส่งผู้โดยสารจังหวัดกำแพงเพชร",
                "shortName": "บขส.",
                "type": "bus",
                "description": "สถานีขนส่งแห่งจังหวัดกำแพงเพชร ให้บริการรถโดยสารเดินทางไปยังจังหวัดต่างๆ",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0000ff"
            },
            {
                "name": "สถานีรถไฟกำแพงเพชร",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "สถานีรถไฟบนเส้นทางสายเหนือ บริการเดินรถจากกรุงเทพฯ ไปยังจังหวัดเหนือ",
                "warpUrl": "",
                "logoText": "🚆",
                "color": "#808080"
            },
            {
                "name": "รถสองแถวกำแพงเพชร",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวให้บริการรับส่งภายในเขตอำเภอเมืองกำแพงเพชร",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#ff0000"
            },
            {
                "name": "รถตุ๊กตุ๊กกำแพงเพชร",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "ตุ๊กตุ๊กให้บริการรับส่งนักท่องเที่ยวในเมืองกำแพงเพชร",
                "warpUrl": "",
                "logoText": "🚕",
                "color": "#ffa500"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - กำแพงเพชร",
                "type": "bus",
                "operator": "สหขนส่งฯ",
                "from": "สถานีขนส่งผู้โดยสารกรุงเทพฯ (หมอชิต 2)",
                "to": "สถานีขนส่งกำแพงเพชร",
                "via": [
                    "พระนครศรีอยุธยา",
                    "นครสวรรค์",
                    "อุทัยธานี"
                ],
                "departureTimes": [
                    "08:00",
                    "18:00"
                ],
                "duration": "5-6 ชม.",
                "baseFare": 300,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - กำแพงเพชร",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "สถานีกรุงเทพ (หัวลำโพง)",
                "to": "สถานีรถไฟกำแพงเพชร",
                "via": [
                    "พระนครศรีอยุธยา",
                    "นครสวรรค์"
                ],
                "departureTimes": [
                    "07:30",
                    "18:00"
                ],
                "duration": "6-7 ชม.",
                "baseFare": 350,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หัวลำโพง",
                "notes": null
            },
            {
                "name": "รถตู้เชียงใหม่ - กำแพงเพชร",
                "type": "van",
                "operator": "Green Bus",
                "from": "สถานีขนส่งอาเขตเชียงใหม่",
                "to": "สถานีขนส่งกำแพงเพชร",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "18:00"
                ],
                "duration": "6 ชม.",
                "baseFare": 350,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งอาเขตเชียงใหม่",
                "notes": null
            },
            {
                "name": "รถบัสกำแพงเพชร - สุโขทัย",
                "type": "bus",
                "operator": "Green Bus",
                "from": "สถานีขนส่งกำแพงเพชร",
                "to": "สถานีขนส่งสุโขทัย",
                "via": [],
                "departureTimes": [
                    "10:00",
                    "15:00"
                ],
                "duration": "3 ชม.",
                "baseFare": 120,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งกำแพงเพชร",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวแช่",
                "priceRange": "60-100฿",
                "category": "local",
                "note": "ข้าวหุงเย็นจัดพร้อมเครื่องเคียง ประเภทข้าวแช่ของดังจังหวัดนี้"
            },
            {
                "name": "หมูสะเต๊ะ",
                "priceRange": "20-40฿",
                "category": "street",
                "note": "เนื้อหมูหมักเครื่องเทศย่าง เสิร์ฟกับน้ำจิ้มถั่ว"
            },
            {
                "name": "เฉาก๊วยชากังราว",
                "priceRange": "30-50฿",
                "category": "dessert",
                "note": "เฉาก๊วยสไตล์กำแพงเพชร ผสมสมุนไพรและกะทิ"
            },
            {
                "name": "ขนมหม้อแกง",
                "priceRange": "10-20฿",
                "category": "dessert",
                "note": "ขนมหวานสูตรโบราณทำจากถั่วเขียวและกะทิ"
            },
            {
                "name": "กุ้งเผา",
                "priceRange": "120-200฿",
                "category": "local",
                "note": "กุ้งแม่น้ำตัวใหญ่ย่างหอม เสิร์ฟพร้อมน้ำจิ้มซีฟู้ด"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "HOP INN Kamphaeng Phet",
                    "Navarat Heritage Hotel"
                ],
                "bookingUrl": "https://www.booking.com/region/th/kamphaeng-phet.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-1500฿/คืน",
                "examples": [
                    "White Wall Riverfront Hotel",
                    "La Kana Boutique"
                ],
                "bookingUrl": "https://www.booking.com/region/th/kamphaeng-phet.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "J2 Hotel KPP",
                    "Somrak Villa KPP"
                ],
                "bookingUrl": "https://www.booking.com/region/th/kamphaeng-phet.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "high",
                "note": "เกิดน้ำท่วมในพื้นที่ลุ่มและริมแม่น้ำช่วงฝนตกหนัก",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "ไฟป่า",
                "severity": "medium",
                "note": "เกิดหมอกควันและไฟป่าในฤดูร้อน",
                "season": "ก.พ.-เม.ย."
            },
            {
                "label": "ฝุ่นละออง PM2.5",
                "severity": "medium",
                "note": "มีค่าฝุ่นเกินมาตรฐานบางช่วงต้นปี",
                "season": "ก.พ.-เม.ย."
            }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 17-35°C, ฝนชุกช่วง ก.ค.-ก.ย.",
            "terrain": "ป่าผลัดใบและที่ราบใกล้ลำน้ำยม",
            "bestSeason": "ก.ย.-ธ.ค.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เมืองประวัติศาสตร์คนน้อย",
                "content": "กำแพงเพชรเหมาะกับคนที่อยากเที่ยวโบราณสถานแบบไม่แออัด เพราะอุทยานประวัติศาสตร์คนบางกว่าสุโขทัยชัด",
                "type": "culture"
            },
            {
                "title": "อุทยานมีหลายโซน",
                "content": "อุทยานประวัติศาสตร์กำแพงเพชรแยกเป็นหลายส่วนและอยู่ห่างกันพอสมควร การมีจักรยานหรือรถจะสะดวกกว่า",
                "type": "route"
            },
            {
                "title": "เที่ยวเช้าหรือบ่ายแก่",
                "content": "อากาศกลางวันค่อนข้างร้อน โดยเฉพาะหน้าร้อน ควรเริ่มเที่ยวแต่เช้าหรือช่วงแดดอ่อน",
                "type": "season"
            },
            {
                "title": "เมืองเงียบกว่าจังหวัดหลัก",
                "content": "บรรยากาศโดยรวมสงบและไม่ใช่เมืองโชว์นักท่องเที่ยว จึงเหมาะกับสายประวัติศาสตร์และขับรถผ่านเส้นเหนือ-กลาง",
                "type": "culture"
            },
            {
                "title": "ของกินสไตล์บ้าน ๆ",
                "content": "อาหารเน้นร้านท้องถิ่นและตลาดริมแม่น้ำ มากกว่าร้านแนวท่องเที่ยวจัดเต็ม งบอาหารคุมง่าย",
                "type": "food"
            },
            {
                "title": "ทริปประหยัดได้",
                "content": "ค่าที่พัก อาหาร และการเที่ยวในกำแพงเพชรยังไม่สูง เหมาะกับแวะ 1 คืนหรือทริปประวัติศาสตร์แบบประหยัด",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารพาณิชย์ในตัวเมืองกำแพงเพชร",
                "area": "ย่านเมืองและตลาด",
                "note": "สะดวกสุดในเขตอำเภอเมือง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันตามทางหลวงและก่อนเข้าอุทยาน",
                "area": "ตัวเมืองและเส้นเชื่อมบขส.-อุทยาน",
                "note": "เหมาะสำหรับคนขับรถเที่ยวเอง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำในอุทยานประวัติศาสตร์และสถานีขนส่ง",
                "area": "อุทยานประวัติศาสตร์กำแพงเพชรและบขส.",
                "note": "มีตามจุดหลักแต่ไม่ถี่เท่าเมืองใหญ่",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในเขตเมือง",
                "area": "ย่านตลาดและถนนหลัก",
                "note": "ควรซื้อของจำเป็นก่อนออกไปอุทยานหรือธรรมชาติ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "จุดบริการนักท่องเที่ยวอุทยานประวัติศาสตร์",
                "area": "หน้าอุทยานประวัติศาสตร์กำแพงเพชร",
                "note": "เหมาะสำหรับเริ่มวางเส้นทางเที่ยว",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สถานีขนส่งกำแพงเพชร",
                "ย่านตัวเมืองกำแพงเพชร",
                "ริมแม่น้ำปิง"
            ],
            "commonDestinations": [
                "อุทยานประวัติศาสตร์กำแพงเพชร",
                "วัดพระแก้ว",
                "กำแพงเมืองเก่า",
                "อุทยานแห่งชาติคลองลาน",
                "ย่านตลาดริมแม่น้ำ"
            ],
            "transitHubs": [
                "สถานีขนส่งกำแพงเพชร",
                "ย่านตัวเมืองกำแพงเพชร"
            ],
            "routeNotes": [
                "บขส.ไม่ได้อยู่ในโซนเที่ยวโบราณสถานพอดี ต้องเผื่อระยะต่อรถ",
                "ถ้าจะเที่ยวหลายโซนอุทยาน จักรยานหรือมอเตอร์ไซค์สะดวกกว่า",
                "เส้นไปคลองลานควรออกแต่เช้าและเติมน้ำมันก่อน"
            ]
        },
        "ecoIds": [
            "fl_dipterocarp",
            "fl_bamboo",
            "f_elephant",
            "f_wild_boar",
            "t_waterfall_forest",
            "c_hot_dry",
            "h_wildfire",
            "h_flash_flood"
        ],
        "newEcoEntities": [
            { id: "fl_dipterocarp", name: "ไม้เต็งรัง", category: "flora", tags: ["common"], desc: "พืชหลักของป่าเต็งรังในกำแพงเพชร" },
            { id: "fl_bamboo", name: "ไผ่", category: "flora", tags: ["common","edible"], desc: "พบทั่วไปในพื้นที่ป่า" },
            { id: "f_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","rare","protected"], desc: "พบในผืนป่าแม่วงก์ซึ่งเชื่อมต่อกับผืนป่าตะวันตก" },
            { id: "f_wild_boar", name: "หมูป่า", category: "fauna", tags: ["common","danger"], desc: "พบในพื้นที่ป่าค่อนข้างสมบูรณ์" },
            { id: "t_waterfall_forest", name: "ป่าเขาและน้ำตก", category: "terrain", tags: ["common","danger"], desc: "มีน้ำตกขนาดใหญ่และป่าเขา" },
            { id: "c_hot_dry", name: "อากาศร้อนจัด", category: "climate", tags: ["common","danger","seasonal"], desc: "ร้อนจัดในฤดูร้อน" },
            { id: "h_wildfire", name: "ไฟป่า", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "เกิดไฟป่าบ่อยในป่าเต็งรัง" },
            { id: "h_flash_flood", name: "น้ำป่าไหลหลาก", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "น้ำป่าเกิดจากฝนหนัก" }
        ]
    },
    "phitsanulok": {
        "transport": [
            {
                "name": "สถานีขนส่งผู้โดยสารจังหวัดพิษณุโลก",
                "shortName": "บขส.",
                "type": "bus",
                "description": "สถานีขนส่งหลักของจังหวัดพิษณุโลก มีรถไปยังจังหวัดต่างๆ",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0000ff"
            },
            {
                "name": "สถานีรถไฟพิษณุโลก",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "สถานีรถไฟพิษณุโลก บนเส้นทางสายเหนือ ถึงกรุงเทพฯ และเชียงใหม่",
                "warpUrl": "",
                "logoText": "🚆",
                "color": "#808080"
            },
            {
                "name": "รถสองแถววัดจันทร์",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวให้บริการรับส่งภายในเขตเมืองพิษณุโลก",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#ff0000"
            },
            {
                "name": "ตุ๊กตุ๊กพิษณุโลก",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "รถตุ๊กตุ๊กให้บริการรับส่งบริเวณเมืองเก่าและสนามบินพิษณุโลก",
                "warpUrl": "",
                "logoText": "🚕",
                "color": "#ffa500"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - พิษณุโลก",
                "type": "bus",
                "operator": "นครชัยแอร์",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งพิษณุโลก",
                "via": [
                    "อยุธยา",
                    "นครสวรรค์"
                ],
                "departureTimes": [
                    "08:00",
                    "20:00"
                ],
                "duration": "6 ชม.",
                "baseFare": 450,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - พิษณุโลก",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "หัวลำโพง",
                "to": "สถานีรถไฟพิษณุโลก",
                "via": [
                    "อยุธยา",
                    "นครสวรรค์"
                ],
                "departureTimes": [
                    "07:30",
                    "18:30"
                ],
                "duration": "8 ชม.",
                "baseFare": 550,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หัวลำโพง",
                "notes": null
            },
            {
                "name": "รถตู้พิษณุโลก - อุตรดิตถ์",
                "type": "van",
                "operator": "วิรัตน์ศักดิ์ขนส่ง",
                "from": "สถานีขนส่งพิษณุโลก",
                "to": "สถานีขนส่งอุตรดิตถ์",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "15:00"
                ],
                "duration": "3 ชม.",
                "baseFare": 150,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งพิษณุโลก",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "กุ้งเผา",
                "priceRange": "150-250฿",
                "category": "local",
                "note": "กุ้งแม่น้ำน่านตัวใหญ่ย่างหอม เสิร์ฟพร้อมน้ำจิ้มซีฟู้ด"
            },
            {
                "name": "กะปิทอดพิษณุโลก",
                "priceRange": "30-50฿",
                "category": "local",
                "note": "กะปิผสมเครื่องเคียงทอดกรอบ รสเผ็ดเค็ม"
            },
            {
                "name": "ข้าวต้มมัด",
                "priceRange": "10-20฿",
                "category": "dessert",
                "note": "ข้าวเหนียวผสมกล้วยตาก มัดด้วยใบตอง นึ่งสุก"
            },
            {
                "name": "ปลาตะเพียนต้มส้ม",
                "priceRange": "60-80฿",
                "category": "local",
                "note": "ปลาตะเพียนใส่ผักเครื่องสมุนไพรเปรี้ยวหวาน"
            },
            {
                "name": "ผักหวานผัดน้ำมันหอย",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "ผักหวานใส่เห็ดและกุ้งสด ผัดกับน้ำมันหอย"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "The Legendha Sukhothai Hotel",
                    "Ou Hotel Phitsanulok"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phitsanulok.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-1500฿/คืน",
                "examples": [
                    "Waway Hotel Phitsanulok",
                    "P&P Resort Phitsanulok"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phitsanulok.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "Legendha Khaokho Hotel",
                    "The Serenity Sathorn Phitsanulok"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phitsanulok.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ฝุ่นละออง PM2.5",
                "severity": "medium",
                "note": "คุณภาพอากาศลดลงในฤดูแล้ง",
                "season": "ก.พ.-เม.ย."
            },
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "high",
                "note": "พื้นที่ริมแม่น้ำน่านล้นตลิ่งในฤดูฝน",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "ไข้เลือดออก",
                "severity": "medium",
                "note": "ระบาดในฤดูฝนจากยุงลาย",
                "season": "มิ.ย.-ก.ย."
            }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 18-34°C, ฤดูฝน ก.ค.-ก.ย.",
            "terrain": "แม่น้ำน่าน ล้อมรอบที่ราบและภูเขา",
            "bestSeason": "พ.ย.-ม.ค.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "ประเพณีวัดโบราณ",
                "content": "วัดราชบูรณะในพิษณุโลกเป็นโบราณสถานยุคสุโขทัย มีเจดีย์เรอและพิธีท่าไม้ลอดโบราณ (อธิษฐานขอโชคลาภ)",
                "type": "culture"
            },
            {
                "title": "เคารพสถานที่ศักดิ์สิทธิ์",
                "content": "เข้าวัดต้องแต่งกายสุภาพ (ปิดไหล่-เข่า) และถอดรองเท้าก่อนเข้าพื้นที่ศักดิ์สิทธิ์",
                "type": "culture"
            },
            {
                "title": "เยี่ยมชมวัดเช้าๆ",
                "content": "พิษณุโลกวัดสำคัญเปิดเช้า ควรวางแผนเที่ยวในช่วงเช้าเพื่อหลีกเลี่ยงฝูงชนและอากาศร้อนจัด",
                "type": "route"
            },
            {
                "title": "อาหารเฉพาะถิ่น",
                "content": "ลองชิมข้าวซอยพิษณุโลกใส่ไส้อั่ว และขนมจีนตักอร่อยตามร้านท้องถิ่น",
                "type": "food"
            },
            {
                "title": "ค่าใช้จ่ายปานกลาง",
                "content": "พิษณุโลกเป็นเมืองใหญ่ระดับกลาง ค่าใช้จ่ายปานกลาง มีตัวเลือกที่พักหลากหลายตั้งแต่โรงแรมง่ายๆ จนถึงระดับสูง",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกรุงเทพ สาขาพิษณุโลก",
                "area": "ในเมืองพิษณุโลก",
                "note": "เปิด จ.-ศ. 08:00-15:30",
                "openHours": "08:00-15:30",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "PTT พิษณุโลก",
                "area": "ถนนบรมไตรโลกนารถ",
                "note": "เปิด 24 ชม.",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ วัดพระศรีมหาธาตุ",
                "area": "ในวัดหลักเมือง",
                "note": "ภายในวัดพระศรีมหาธาตุวรมหาวิหาร",
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
                "label": "โรงพยาบาลมหาวิทยาลัยนเรศวร",
                "area": "ใกล้สนามบินพิษณุโลก",
                "note": "แผนกฉุกเฉินบริการตลอด 24 ชม.",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจท่องเที่ยว พิษณุโลก",
                "area": "ในเมืองพิษณุโลก",
                "note": "บริการ 24 ชม.",
                "openHours": "24 ชั่วโมง",
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "EV Charger เซ็นทรัลพลาซา พิษณุโลก",
                "area": "ห้างเซ็นทรัลพลาซา พิษณุโลก",
                "note": "จุดชาร์จรถ EV",
                "openHours": "10:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ศูนย์บริการนักท่องเที่ยว พิษณุโลก",
                "area": "พิพิธภัณฑสถานแห่งชาติ",
                "note": "แนะนำสถานที่ท่องเที่ยวท้องถิ่น",
                "openHours": "09:00-16:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สนามบินพิษณุโลก",
                "สถานีขนส่งพิษณุโลก"
            ],
            "commonDestinations": [
                "วัดพระศรีรัตนมหาธาตุวรมหาวิหาร (วัดใหญ่)",
                "พิพิธภัณฑสถานแห่งชาติ พระนครคีรี (เขาค้อ)",
                "สะพานพระนารายณ์"
            ],
            "transitHubs": [
                "สถานีขนส่งพิษณุโลก",
                "สนามบินพิษณุโลก"
            ],
            "routeNotes": [
                "ตัวเมืองขนาดกลาง ขับรถไม่ยาก",
                "เที่ยววัดหลักเมืองและวัดพันอ้นได้ในวันเดียว",
                "หลีกเลี่ยงถนนใหญ่ช่วงเช้าวันพุธ (ตลาดนัดริมแม่น้ำน่าน)"
            ]
        },
        "ecoIds": [
            "fl_pine",
            "fl_moss",
            "f_serow",
            "f_wild_boar",
            "t_mountain_plateau",
            "c_cool_mountain",
            "h_fog",
            "h_landslide"
        ],
        "newEcoEntities": [
            { id: "fl_pine", name: "สนสองใบ", category: "flora", tags: ["common"], desc: "พืชเด่นของพื้นที่สูง" },
            { id: "fl_moss", name: "มอสและพืชคลุมดิน", category: "flora", tags: ["common","seasonal"], desc: "พบในพื้นที่ชื้น" },
            { id: "f_serow", name: "เลียงผา", category: "fauna", tags: ["rare","danger","protected"], desc: "พบในพื้นที่ภูเขาสูง" },
            { id: "f_wild_boar", name: "หมูป่า", category: "fauna", tags: ["common","danger"], desc: "พบในป่า" },
            { id: "t_mountain_plateau", name: "ภูเขาและลานหิน", category: "terrain", tags: ["common","danger"], desc: "ภูมิประเทศเด่น" },
            { id: "c_cool_mountain", name: "อากาศเย็น", category: "climate", tags: ["common","seasonal"], desc: "อากาศเย็น" },
            { id: "h_fog", name: "หมอกหนา", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "หมอกลดทัศนวิสัย" },
            { id: "h_landslide", name: "ดินถล่ม", category: "climate", tags: ["danger","rare","seasonal","extreme"], desc: "เสี่ยงในฤดูฝน" }
        ]
    },
    "phichit": {
        "transport": [
            {
                "name": "สถานีขนส่งผู้โดยสารจังหวัดพิจิตร",
                "shortName": "บขส.",
                "type": "bus",
                "description": "สถานีขนส่งจังหวัดพิจิตร บริการรถโดยสารประจำทางไปยังจังหวัดใกล้เคียง",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0000ff"
            },
            {
                "name": "สถานีรถไฟพิจิตร",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "สถานีรถไฟพิจิตร บนเส้นทางรถไฟสายเหนือ",
                "warpUrl": "",
                "logoText": "🚆",
                "color": "#808080"
            },
            {
                "name": "รถสองแถวขนส่งพิจิตร",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวให้บริการรับส่งภายในตัวเมืองพิจิตร",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#ff0000"
            },
            {
                "name": "รถตู้พิจิตร - สุโขทัย",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้เชื่อมต่อพิจิตรกับสุโขทัย",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#0000ff"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - พิจิตร",
                "type": "bus",
                "operator": "สมบัติทัวร์",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งพิจิตร",
                "via": [
                    "อยุธยา",
                    "นครสวรรค์"
                ],
                "departureTimes": [
                    "08:00",
                    "20:00"
                ],
                "duration": "7 ชม.",
                "baseFare": 400,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - พิจิตร",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "หัวลำโพง",
                "to": "สถานีรถไฟพิจิตร",
                "via": [
                    "อยุธยา",
                    "นครสวรรค์"
                ],
                "departureTimes": [
                    "07:45",
                    "18:45"
                ],
                "duration": "8 ชม.",
                "baseFare": 400,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หัวลำโพง",
                "notes": null
            },
            {
                "name": "รถบัสพิจิตร - อุทัยธานี",
                "type": "bus",
                "operator": "Green Bus",
                "from": "สถานีขนส่งพิจิตร",
                "to": "สถานีขนส่งอุทัยธานี",
                "via": [
                    "นครสวรรค์"
                ],
                "departureTimes": [
                    "09:00",
                    "15:00"
                ],
                "duration": "3 ชม.",
                "baseFare": 120,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "สถานีขนส่งพิจิตร",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "โอต็อก (ข้าวต้มปลา)",
                "priceRange": "50-70฿",
                "category": "local",
                "note": "ข้าวต้มปลาต้มยำสูตรพิเศษของพิจิตร"
            },
            {
                "name": "ข้าวหนุกงา",
                "priceRange": "30-50฿",
                "category": "street",
                "note": "ข้าวเหนียวปั้นคลุกงาโรยหน้าทอดกรอบ"
            },
            {
                "name": "ลาบหมูคั่ว",
                "priceRange": "40-60฿",
                "category": "local",
                "note": "ลาบหมูสับคั่วกรอบใส่สมุนไพร"
            },
            {
                "name": "ปลาตะเพียนต้มส้ม",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "ปลาตะเพียนใส่ยอดมะขาม เผ็ดเปรี้ยว"
            },
            {
                "name": "ขนมทองหยอด",
                "priceRange": "10-20฿",
                "category": "dessert",
                "note": "ขนมไทยสีทองชิ้นเล็ก รสหวานมัน"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "โรงแรมศรีศาลา",
                    "Pamukkale Guesthouse"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phichit.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-1500฿/คืน",
                "examples": [
                    "โรงแรมสุขุมวิท พิจิตร",
                    "Pichit Nakorn Hotel"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phichit.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "Riverberry Farm & Resort",
                    "โรงแรมศุภมาศรี"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phichit.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "medium",
                "note": "อาจเกิดน้ำท่วมพื้นที่ลุ่มในฤดูฝน",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "ไฟป่า",
                "severity": "low",
                "note": "เกิดไฟป่าได้บ้างในฤดูแล้ง",
                "season": "ก.พ.-เม.ย."
            },
            {
                "label": "งูพิษ",
                "severity": "medium",
                "note": "งูพิษหลายชนิดอาศัยอยู่ตามสวนและป่าใกล้ชุมชน",
                "season": null
            }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 17-33°C, ฝนชุก ก.ค.-ก.ย.",
            "terrain": "ที่ราบลุ่มแม่น้ำยมล้อมรอบภูเขา",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เด่นที่บึงสีไฟ",
                "content": "พิจิตรมีภาพจำด้านบึงสีไฟซึ่งเป็นแลนด์มาร์กพักผ่อนและดูวิวพระอาทิตย์ตก เหมาะกับเที่ยวสบายมากกว่าทริปเร่ง",
                "type": "culture"
            },
            {
                "title": "เมืองไม่ใหญ่",
                "content": "เที่ยวในตัวเมืองพิจิตรค่อนข้างง่าย จุดหลักอยู่ไม่ห่างกันมาก และเหมาะกับการแวะพักระหว่างเส้นเหนือ-กลาง",
                "type": "route"
            },
            {
                "title": "อากาศร้อนช่วงบ่าย",
                "content": "พื้นที่ลุ่มและเมืองเปิดโล่งทำให้กลางวันค่อนข้างร้อน ควรออกเช้าหรือเย็นถ้าจะเดินรอบบึง",
                "type": "season"
            },
            {
                "title": "บรรยากาศท้องถิ่นแท้",
                "content": "พิจิตรยังคงบรรยากาศเมืองจังหวัดแบบคนพื้นที่มากกว่าเมืองท่องเที่ยว จึงเหมาะกับคนที่ต้องการความเรียบง่าย",
                "type": "culture"
            },
            {
                "title": "ของกินตลาดพื้นบ้าน",
                "content": "อาหารท้องถิ่นหาได้ง่ายตามตลาดและร้านในเมือง งบมื้ออาหารค่อนข้างเป็นมิตร",
                "type": "food"
            },
            {
                "title": "งบทริปต่ำได้",
                "content": "ถ้าไม่ได้เน้นรีสอร์ตหรือเดินทางไกลหลายอำเภอ พิจิตรเป็นจังหวัดที่คุมงบง่ายทั้งที่พักและของกิน",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารพาณิชย์ในตัวเมืองพิจิตร",
                "area": "เขตเมืองและถนนหลัก",
                "note": "หาได้ง่ายในโซนชุมชน",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันรอบเมืองและทางหลวงหลัก",
                "area": "เส้นเข้าเมืองพิจิตร",
                "note": "มีตลอดแนวถนนหลัก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะบริเวณบึงสีไฟและสถานีขนส่ง",
                "area": "บึงสีไฟและเขตเมือง",
                "note": "เหมาะสำหรับเที่ยวครึ่งวัน",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในย่านเมือง",
                "area": "ตัวเมืองพิจิตร",
                "note": "ของใช้จำเป็นหาไม่ยาก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลและคลินิกในตัวเมือง",
                "area": "อำเภอเมืองพิจิตร",
                "note": "สะดวกกว่าพื้นที่รอบนอก",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สถานีรถไฟพิจิตร",
                "สถานีขนส่งพิจิตร",
                "ย่านตัวเมืองพิจิตร"
            ],
            "commonDestinations": [
                "บึงสีไฟ",
                "วัดท่าหลวง",
                "ตลาดในตัวเมือง",
                "สวนและจุดชมวิวรอบบึง",
                "แหล่งของฝากท้องถิ่น"
            ],
            "transitHubs": [
                "สถานีรถไฟพิจิตร",
                "สถานีขนส่งพิจิตร"
            ],
            "routeNotes": [
                "ถ้าเที่ยวในเมืองอย่างเดียว ใช้เวลาไม่มากและขับรถง่าย",
                "บึงสีไฟเหมาะสุดช่วงเย็น",
                "พิจิตรเหมาะเป็นจังหวัดแวะพักมากกว่าปักยาวหลายวันสำหรับนักท่องเที่ยวทั่วไป"
            ]
        },
        "ecoIds": [
            "fl_rice",
            "fl_lotus",
            "f_snake",
            "f_mosquito",
            "t_flood_plain",
            "c_hot",
            "h_flood",
            "h_drought"
        ],
        "newEcoEntities": [
            { id: "fl_rice", name: "ข้าว", category: "flora", tags: ["common","edible"], desc: "พืชหลัก" },
            { id: "fl_lotus", name: "บัว", category: "flora", tags: ["common","edible"], desc: "พืชน้ำ" },
            { id: "f_snake", name: "งูน้ำ", category: "fauna", tags: ["common","danger"], desc: "พบในแหล่งน้ำ" },
            { id: "f_mosquito", name: "ยุง", category: "fauna", tags: ["danger","common","seasonal"], desc: "พาหะโรค" },
            { id: "t_flood_plain", name: "ที่ราบลุ่มน้ำ", category: "terrain", tags: ["common","danger"], desc: "พื้นที่ลุ่ม" },
            { id: "c_hot", name: "อากาศร้อน", category: "climate", tags: ["common","danger","seasonal"], desc: "ร้อน" },
            { id: "h_flood", name: "น้ำท่วม", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "น้ำท่วมบ่อย" },
            { id: "h_drought", name: "ภัยแล้ง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ขาดน้ำ" }
        ]
    },
    "phetchabun": {
        "transport": [
            {
                "name": "สถานีขนส่งผู้โดยสารจังหวัดเพชรบูรณ์",
                "shortName": "บขส.",
                "type": "bus",
                "description": "สถานีขนส่งเพชรบูรณ์ ให้บริการรถโดยสารระหว่างจังหวัด",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0000ff"
            },
            {
                "name": "สถานีรถไฟแก่งเสือเต้น",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "สถานีรถไฟแก่งเสือเต้นใกล้ตัวเมืองเพชรบูรณ์",
                "warpUrl": "",
                "logoText": "🚆",
                "color": "#808080"
            },
            {
                "name": "รถสองแถวเพชรบูรณ์",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวให้บริการรับส่งภายในตัวเมืองเพชรบูรณ์",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#ff0000"
            },
            {
                "name": "รถตู้เพชรบูรณ์ - ลพบุรี",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้ปรับอากาศจากเพชรบูรณ์ไปลพบุรี",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#0000ff"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - เพชรบูรณ์",
                "type": "bus",
                "operator": "สมบัติทัวร์",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งเพชรบูรณ์",
                "via": [
                    "สระบุรี",
                    "อุทัยธานี"
                ],
                "departureTimes": [
                    "10:00",
                    "20:00"
                ],
                "duration": "5 ชม.",
                "baseFare": 300,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - เพชรบูรณ์ (แก่งเสือเต้น)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "หัวลำโพง",
                "to": "สถานีรถไฟแก่งเสือเต้น",
                "via": [
                    "อยุธยา",
                    "นครสวรรค์"
                ],
                "departureTimes": [
                    "09:30",
                    "19:30"
                ],
                "duration": "6 ชม.",
                "baseFare": 350,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หัวลำโพง",
                "notes": null
            },
            {
                "name": "รถทัวร์เพชรบูรณ์ - ชัยภูมิ",
                "type": "bus",
                "operator": "ชัยภูมิขนส่ง",
                "from": "สถานีขนส่งเพชรบูรณ์",
                "to": "สถานีขนส่งชัยภูมิ",
                "via": [],
                "departureTimes": [
                    "06:00",
                    "12:00"
                ],
                "duration": "3 ชม.",
                "baseFare": 100,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "สถานีขนส่งเพชรบูรณ์",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ไข่ตกถังโบราณ",
                "priceRange": "10-20฿",
                "category": "dessert",
                "note": "ขนมหวานสีทองสูตรโบราณต้นกำเนิดจากเพชรบูรณ์"
            },
            {
                "name": "ข้าวหนุกงา",
                "priceRange": "30-50฿",
                "category": "street",
                "note": "ข้าวเหนียวปั้นคลุกงาโรยหน้าทอดกรอบ"
            },
            {
                "name": "หมูย่างเมืองเพชร",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "เนื้อหมูหมักสมุนไพรย่างสไตล์เมืองเพชรบูรณ์"
            },
            {
                "name": "ส้มตำเพชร",
                "priceRange": "30-50฿",
                "category": "local",
                "note": "ส้มตำตำกลมสไตล์อีสานชื่อดังในจังหวัด"
            },
            {
                "name": "น้ำพริกข่า",
                "priceRange": "20-40฿",
                "category": "local",
                "note": "น้ำพริกแกงเผ็ดทำจากข่า มีกลิ่นหอมรสเผ็ด"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "โรงแรมภูพิมาน คอนเวนชั่น",
                    "เหล่าโรงแรมมหาชัย"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phetchabun.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-1500฿/คืน",
                "examples": [
                    "โรงแรมเมาท์เทน วิวท์ รีสอร์ท",
                    "กาโม่ เดอ ปาย รีสอร์ท"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phetchabun.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "ภูน็อค รีสอร์ท",
                    "เดอะ โอเรียนท์"
                ],
                "bookingUrl": "https://www.booking.com/region/th/phetchabun.html"
            }
        ],
        "dangerZones": [
            {
                "label": "ดินถล่ม",
                "severity": "high",
                "note": "พื้นที่ภูเขาสูงอาจเกิดดินถล่มในฤดูฝน",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "ฝุ่นควันไฟป่า",
                "severity": "medium",
                "note": "เกิดหมอกควันและไฟป่าในฤดูร้อน",
                "season": "ก.พ.-เม.ย."
            }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 15-30°C, ฤดูหนาวหนาวจัด ธ.ค.-ม.ค.",
            "terrain": "ภูเขาสูง ป่าไม้หนาทึบ",
            "bestSeason": "ธ.ค.-ม.ค.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "ภูเขาและทะเลหมอกคือแกนหลัก",
                "content": "เพชรบูรณ์เด่นที่เขาค้อ ภูทับเบิก และโซนภูเขา อากาศและวิวต่างจากภาคกลางชัด โดยเฉพาะปลายฝนต้นหนาว",
                "type": "season"
            },
            {
                "title": "เส้นขึ้นภูทับเบิกชัน",
                "content": "ทางขึ้นภูทับเบิกมีความชันและโค้งมาก รถใหญ่และคนขับไม่ชำนาญควรใช้ความระวังมากเป็นพิเศษ",
                "type": "safety"
            },
            {
                "title": "เช้าเร็วคุ้มสุด",
                "content": "ถ้าจะล่าหมอกหรือดูวิว ควรออกตั้งแต่เช้ามืด เพราะหลังสายหมอกหายเร็วและรถเริ่มเยอะ",
                "type": "route"
            },
            {
                "title": "เข้าวัดผาซ่อนแก้วสุภาพ",
                "content": "วัดพระธาตุผาซ่อนแก้วเป็นจุดยอดนิยม ควรแต่งตัวเรียบร้อยและเผื่อเวลาเรื่องคนเยอะวันหยุด",
                "type": "culture"
            },
            {
                "title": "ของกินบนเขาราคาแกว่ง",
                "content": "ร้านอาหารและที่พักบนเขาค้อหรือภูทับเบิกมักแพงกว่าพื้นราบ โดยเฉพาะฤดูหนาวและวันหยุด",
                "type": "budget"
            },
            {
                "title": "ผักผลไม้ภูเขาเด่น",
                "content": "แถบภูทับเบิกและเขาค้อมีผลผลิตเมืองหนาวและอาหารพื้นบ้านให้ลอง โดยเฉพาะเมนูผักสดและหมูกระทะวิวเขา",
                "type": "food"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารพาณิชย์ในตัวเมืองเพชรบูรณ์และหล่มสัก",
                "area": "อำเภอเมืองเพชรบูรณ์และอำเภอหล่มสัก",
                "note": "บนเขามีน้อยกว่า ควรเตรียมก่อนขึ้น",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันก่อนขึ้นเขาค้อและภูทับเบิก",
                "area": "หล่มสัก หล่มเก่า และทางขึ้นเขา",
                "note": "จำเป็นมากสำหรับรถเที่ยวเอง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำตามจุดชมวิว วัด และปั๊มน้ำมัน",
                "area": "เขาค้อ ภูทับเบิก และทางหลวงหลัก",
                "note": "วันหยุดอาจมีคนเยอะ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในเมืองและอำเภอหลัก",
                "area": "ตัวเมืองเพชรบูรณ์ หล่มสัก",
                "note": "บนจุดสูงมีตัวเลือกจำกัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "จุดบริการนักท่องเที่ยวตามแหล่งภูเขา",
                "area": "เขาค้อและโซนวัดผาซ่อนแก้ว",
                "note": "เหมาะถามสภาพเส้นทางและหมอก",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สถานีขนส่งเพชรบูรณ์",
                "หล่มสัก",
                "ตัวเมืองเพชรบูรณ์"
            ],
            "commonDestinations": [
                "เขาค้อ",
                "วัดพระธาตุผาซ่อนแก้ว",
                "ภูทับเบิก",
                "อุทยานแห่งชาติน้ำหนาว",
                "หล่มเก่า"
            ],
            "transitHubs": [
                "สถานีขนส่งเพชรบูรณ์",
                "หล่มสัก"
            ],
            "routeNotes": [
                "ขึ้นภูทับเบิกควรเช็กรถเบรกและยางก่อนทุกครั้ง",
                "ถ้าจะเที่ยวเขาค้อและภูทับเบิกในทริปเดียว ควรพักค้างอย่างน้อย 1 คืน",
                "วันหยุดยาวรถติดหนักโดยเฉพาะจุดชมวิวและวัดผาซ่อนแก้ว"
            ]
        },
        "ecoIds": [
            "fl_pine",
            "fl_cabbage",
            "f_serow",
            "f_wild_boar",
            "t_mountain_range",
            "c_cool",
            "h_fog",
            "h_landslide"
        ],
        "newEcoEntities": [
            { id: "fl_pine", name: "สนเขา", category: "flora", tags: ["common"], desc: "พืชเด่นบนภูเขา" },
            { id: "fl_cabbage", name: "กะหล่ำปลี", category: "flora", tags: ["common","edible","seasonal"], desc: "พืชเกษตรบนพื้นที่สูง" },
            { id: "f_serow", name: "เลียงผา", category: "fauna", tags: ["rare","danger","protected"], desc: "สัตว์ภูเขา" },
            { id: "f_wild_boar", name: "หมูป่า", category: "fauna", tags: ["common","danger"], desc: "พบในป่า" },
            { id: "t_mountain_range", name: "เทือกเขา", category: "terrain", tags: ["common","danger"], desc: "ภูเขาสูง" },
            { id: "c_cool", name: "อากาศเย็น", category: "climate", tags: ["common","seasonal"], desc: "เย็น" },
            { id: "h_fog", name: "หมอก", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "หมอก" },
            { id: "h_landslide", name: "ดินถล่ม", category: "climate", tags: ["danger","rare","seasonal","extreme"], desc: "ดินถล่ม" }
        ]
    },
    "nakhonsawan": {
        "transport": [
            {
                "name": "สถานีขนส่งผู้โดยสารจังหวัดนครสวรรค์ (บึงสามพัน)",
                "shortName": "บขส.",
                "type": "bus",
                "description": "สถานีขนส่งนครสวรรค์ บริการรถโดยสารไปยังจังหวัดใกล้เคียง",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0000ff"
            },
            {
                "name": "สถานีรถไฟนครสวรรค์",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "สถานีรถไฟใหญ่บนเส้นทางสายเหนือในตัวจังหวัดนครสวรรค์",
                "warpUrl": "",
                "logoText": "🚆",
                "color": "#808080"
            },
            {
                "name": "เรือบึงบอระเพ็ด",
                "shortName": "เรือ",
                "type": "boat",
                "description": "บริการเรือนำเที่ยวในบึงบอระเพ็ด แหล่งน้ำจืดขนาดใหญ่ของจังหวัด",
                "warpUrl": "",
                "logoText": "🚤",
                "color": "#1E90FF"
            },
            {
                "name": "รถตุ๊กตุ๊กนครสวรรค์",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "บริการตุ๊กตุ๊กในตัวเมืองนครสวรรค์",
                "warpUrl": "",
                "logoText": "🚕",
                "color": "#ffa500"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - นครสวรรค์",
                "type": "bus",
                "operator": "นครชัยแอร์",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งนครสวรรค์",
                "via": [
                    "อยุธยา"
                ],
                "departureTimes": [
                    "07:00",
                    "18:00"
                ],
                "duration": "3 ชม.",
                "baseFare": 200,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - นครสวรรค์",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "หัวลำโพง",
                "to": "สถานีรถไฟนครสวรรค์",
                "via": [
                    "อยุธยา"
                ],
                "departureTimes": [
                    "09:30",
                    "20:30"
                ],
                "duration": "4 ชม.",
                "baseFare": 350,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หัวลำโพง",
                "notes": null
            },
            {
                "name": "รถตู้นครสวรรค์ - เชียงใหม่",
                "type": "van",
                "operator": "Green Bus",
                "from": "สถานีขนส่งนครสวรรค์",
                "to": "สถานีขนส่งอาเขตเชียงใหม่",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "18:00"
                ],
                "duration": "9 ชม.",
                "baseFare": 550,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งนครสวรรค์",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "กุ้งแม่น้ำเผา",
                "priceRange": "150-300฿",
                "category": "local",
                "note": "กุ้งแม่น้ำตัวใหญ่เผา เสิร์ฟพร้อมน้ำจิ้มซีฟู้ด"
            },
            {
                "name": "ข้าวเหนียวมะม่วง",
                "priceRange": "80-120฿",
                "category": "dessert",
                "note": "ข้าวเหนียวมูนเสิร์ฟกับมะม่วงสุก"
            },
            {
                "name": "ไส้กรอกโคขุน",
                "priceRange": "30-50฿",
                "category": "street",
                "note": "ไส้กรอกเนื้อโคขุน หมักเครื่องเทศ เนื้อนุ่ม"
            },
            {
                "name": "ข้าวต้มมัด",
                "priceRange": "10-20฿",
                "category": "dessert",
                "note": "ข้าวเหนียวผสมกล้วยตาก มัดด้วยใบตองนึ่งสุก"
            },
            {
                "name": "ก๋วยเตี๋ยวเรือนครสวรรค์",
                "priceRange": "40-60฿",
                "category": "local",
                "note": "ก๋วยเตี๋ยวเนื้อ/หมูน้ำตกสไตล์นครสวรรค์"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "Khum Nakorn Sawan Resort",
                    "Green Place"
                ],
                "bookingUrl": "https://www.booking.com/region/th/nakhon-sawan.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-1500฿/คืน",
                "examples": [
                    "Van Hotel and Residence",
                    "Riverine Place"
                ],
                "bookingUrl": "https://www.booking.com/region/th/nakhon-sawan.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "Paradise Mountain Resort",
                    "Greenery Resort"
                ],
                "bookingUrl": "https://www.booking.com/region/th/nakhon-sawan.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "high",
                "note": "แม่น้ำน่านและยมล้นตลิ่งสร้างน้ำท่วมในฤดูฝน",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "ไฟป่า",
                "severity": "low",
                "note": "เกิดไฟป่าในพื้นที่ว่างเปล่าในฤดูร้อน",
                "season": "ก.พ.-เม.ย."
            },
            {
                "label": "หมอกควัน",
                "severity": "medium",
                "note": "มักเกิดหมอกควันในอากาศช่วงแล้ง",
                "season": "ก.พ.-เม.ย."
            }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 18-34°C, ฝนชุก ก.ค.-ก.ย.",
            "terrain": "ที่ราบลุ่มแม่น้ำยมและปิง",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เมืองชุมทางเหนือ-กลาง",
                "content": "นครสวรรค์เด่นในฐานะเมืองทางผ่านสำคัญมากกว่าจังหวัดท่องเที่ยวเต็มรูปแบบ เหมาะกับพักรถ พักคน และวางเส้นทางต่อ",
                "type": "route"
            },
            {
                "title": "มีทั้งรถไฟและบขส.",
                "content": "การเดินทางสาธารณะสะดวกกว่าหลายจังหวัด เพราะมีทั้งรถไฟสายเหนือและสถานีขนส่งในตัวเมือง",
                "type": "route"
            },
            {
                "title": "บึงบอระเพ็ดกับตัวเมือง",
                "content": "ถ้าจะเที่ยวจริง จุดเด่นมักอยู่ที่บึงบอระเพ็ด เขาหน่อ หรือสวนสาธารณะในเมือง มากกว่าการเที่ยวแบบอัดสถานที่",
                "type": "culture"
            },
            {
                "title": "อากาศร้อนชัด",
                "content": "นครสวรรค์ค่อนข้างร้อนในฤดูแล้ง โดยเฉพาะการเดินกลางแจ้งช่วงบ่าย ควรแบ่งกิจกรรมเช้า-เย็น",
                "type": "season"
            },
            {
                "title": "ของกินกลางเมืองหาไม่ยาก",
                "content": "เมืองใหญ่พอสมควร อาหาร ร้านสะดวกซื้อ และตลาดเย็นเข้าถึงง่าย เหมาะกับคนแวะพักระหว่างทาง",
                "type": "food"
            },
            {
                "title": "งบยืดหยุ่นดี",
                "content": "มีตัวเลือกตั้งแต่โรงแรมทางผ่านถึงที่พักกลางเมือง งบจึงปรับได้ตามสไตล์ทริป",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารพาณิชย์ในตัวเมืองนครสวรรค์",
                "area": "ย่านพาราไดซ์พาร์คและถนนหลัก",
                "note": "เป็นจุดบริการครบสุดของจังหวัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันตามทางหลวงและรอบเมือง",
                "area": "เส้นเอเชียและถนนออกจากตัวเมือง",
                "note": "เหมาะกับสายเดินทางต่อ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำที่สถานีขนส่งและจุดพักรถ",
                "area": "สถานีขนส่งนครสวรรค์และทางหลวง",
                "note": "สะดวกสำหรับเปลี่ยนเส้นทาง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในย่านเมือง",
                "area": "ตัวเมืองนครสวรรค์",
                "note": "ของจำเป็นหาได้ง่าย",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "คลินิกและโรงพยาบาลในเขตเมือง",
                "area": "ตัวเมืองนครสวรรค์",
                "note": "เหมาะเป็นจุดพักคืนถ้าต้องการบริการครบ",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สถานีรถไฟนครสวรรค์",
                "สถานีขนส่งนครสวรรค์",
                "ย่านตัวเมืองนครสวรรค์"
            ],
            "commonDestinations": [
                "บึงบอระเพ็ด",
                "สวนสาธารณะสวรรค์",
                "เขาหน่อ-เขาแก้ว",
                "ตลาดและย่านเมืองเก่า",
                "จุดชมแม่น้ำ"
            ],
            "transitHubs": [
                "สถานีรถไฟนครสวรรค์",
                "สถานีขนส่งนครสวรรค์"
            ],
            "routeNotes": [
                "นครสวรรค์เหมาะเป็นจุดพักก่อนขึ้นเหนือต่อมากกว่าทริปแน่นสถานที่",
                "รถไฟเหมาะสำหรับไปตามแนวสายเหนือ ส่วนบขส.เหมาะต่อไปจังหวัดรอง",
                "วันหยุดและช่วงเทศกาลการจราจรผ่านเมืองค่อนข้างหนาแน่น"
            ]
        },
        "ecoIds": [
            "fl_lotus",
            "fl_reed_wetland",
            "f_jacana_pheasant_tailed",
            "f_openbill_stork",
            "t_freshwater_wetland",
            "c_hot_lowland",
            "h_flood_chao_phraya",
            "h_summer_storm"
        ],
        "newEcoEntities": [
            { id: "fl_lotus", name: "บัวและบัวสาย", category: "flora", tags: ["common","edible","medicinal"], desc: "พืชน้ำเด่นของบึงบอระเพ็ดและพื้นที่ชุ่มน้ำในนครสวรรค์ พบจริงตามแหล่งน้ำขนาดใหญ่ของจังหวัด" },
            { id: "fl_reed_wetland", name: "กกและพืชริมน้ำ", category: "flora", tags: ["common"], desc: "พืชริมน้ำและกอพืชชุ่มน้ำเป็นองค์ประกอบหลักของระบบนิเวศบึงน้ำจืดในนครสวรรค์" },
            { id: "f_jacana_pheasant_tailed", name: "นกอีแจวหางยาว", category: "fauna", tags: ["common","protected"], desc: "เป็นนกน้ำเด่นของพื้นที่ชุ่มน้ำขนาดใหญ่ ใช้พืชน้ำและแหล่งน้ำนิ่งเป็นถิ่นอาศัย" },
            { id: "f_openbill_stork", name: "นกปากห่าง", category: "fauna", tags: ["common","protected"], desc: "เป็นนกน้ำที่พบได้จริงในบึงบอระเพ็ดและพื้นที่ชุ่มน้ำของจังหวัด" },
            { id: "t_freshwater_wetland", name: "บึงน้ำจืดและพื้นที่ชุ่มน้ำขนาดใหญ่", category: "terrain", tags: ["common","danger"], desc: "นครสวรรค์มีภูมิประเทศเด่นเป็นบึงน้ำจืดขนาดใหญ่และลุ่มน้ำสำคัญที่เชื่อมกับต้นแม่น้ำเจ้าพระยา" },
            { id: "c_hot_lowland", name: "อากาศร้อนในพื้นที่ราบลุ่ม", category: "climate", tags: ["common","danger","seasonal"], desc: "พื้นที่ราบลุ่มของนครสวรรค์ร้อนจัดในฤดูร้อน และมีความเสี่ยงต่อความเครียดจากความร้อน" },
            { id: "h_flood_chao_phraya", name: "น้ำท่วมลุ่มน้ำเจ้าพระยา", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "นครสวรรค์เป็นจุดสำคัญของระบบลุ่มน้ำเจ้าพระยา จึงมีความเสี่ยงน้ำหลากและน้ำท่วมในช่วงฝนมากหรือน้ำเหนือหลาก" },
            { id: "h_summer_storm", name: "พายุฤดูร้อน ลมแรง และลูกเห็บ", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "นครสวรรค์ถูกระบุในคำเตือนพายุฤดูร้อนของไทยหลายระลอกในปี 2026 โดยมีความเสี่ยงฝนฟ้าคะนอง ลมกระโชกแรง และลูกเห็บ" }
        ]
    },
    "uthaithani": {
        "transport": [
            {
                "name": "สถานีขนส่งอุทัยธานี",
                "shortName": "บขส.",
                "type": "bus",
                "description": "สถานีขนส่งจังหวัดอุทัยธานี บริการเดินรถเส้นต่างๆ",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0000ff"
            },
            {
                "name": "เรือขนส่งแม่น้ำเจ้าพระยา",
                "shortName": "เรือ",
                "type": "boat",
                "description": "บริการเรือสาธารณะบนแม่น้ำเจ้าพระยาในตัวเมือง",
                "warpUrl": "",
                "logoText": "🚤",
                "color": "#1E90FF"
            },
            {
                "name": "รถสองแถวอุทัยธานี",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "รถสองแถวให้บริการรับส่งภายในเขตเมืองอุทัยธานี",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#ff0000"
            },
            {
                "name": "รถตู้อุทัยธานี - นครสวรรค์",
                "shortName": "รถตู้",
                "type": "van",
                "description": "รถตู้ปรับอากาศจากอุทัยธานีไปนครสวรรค์",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#0000ff"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - อุทัยธานี",
                "type": "bus",
                "operator": "นครชัยแอร์",
                "from": "หมอชิต 2",
                "to": "สถานีขนส่งอุทัยธานี",
                "via": [
                    "ลพบุรี",
                    "สระบุรี"
                ],
                "departureTimes": [
                    "08:00",
                    "17:00"
                ],
                "duration": "3 ชม.",
                "baseFare": 200,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "หมอชิต 2",
                "notes": null
            },
            {
                "name": "รถไฟ กรุงเทพฯ - นครสวรรค์ (ลงอุทัยธานี)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย",
                "from": "หัวลำโพง",
                "to": "สถานีรถไฟนครสวรรค์",
                "via": [
                    "อยุธยา",
                    "นครสวรรค์"
                ],
                "departureTimes": [
                    "09:30",
                    "19:30"
                ],
                "duration": "4 ชม.",
                "baseFare": 350,
                "frequency": "วันละ 2 เที่ยว",
                "terminal": "หัวลำโพง",
                "notes": "ต่อรถบัสที่นครสวรรค์ไปอุทัย"
            },
            {
                "name": "รถตู้นครสวรรค์ - อุทัยธานี",
                "type": "van",
                "operator": "ปรับอากาศ เที่ยวไทย",
                "from": "สถานีขนส่งนครสวรรค์",
                "to": "สถานีขนส่งอุทัยธานี",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "15:00"
                ],
                "duration": "1.5 ชม.",
                "baseFare": 100,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งนครสวรรค์",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ลาบปลาตะเพียน",
                "priceRange": "50-80฿",
                "category": "local",
                "note": "ลาบปลาตะเพียน แกงขมต้นตะเคียน เป็นเอกลักษณ์ของอุทัยธานี"
            },
            {
                "name": "ผัดผักบุ้งไฟแดง",
                "priceRange": "20-40฿",
                "category": "local",
                "note": "ผักบุ้งไฟแดงใส่กุ้งหรือหมูย่าง รสเผ็ดอ่อนๆ"
            },
            {
                "name": "ข้าวเม่าทอด",
                "priceRange": "10-20฿",
                "category": "dessert",
                "note": "ข้าวเหนียวนึ่งผสมข้าวเม่า ทอดกรอบ หวานมัน"
            },
            {
                "name": "ขนมไทยใส่แป้ง",
                "priceRange": "10-20฿",
                "category": "dessert",
                "note": "ขนมหวานโบราณของอุทัยธานี ทำจากแป้ง นึ่งนุ่ม"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "300-800฿/คืน",
                "examples": [
                    "TJ Boutique Hotel",
                    "สะแกกรังฮาเฟ่น"
                ],
                "bookingUrl": "https://www.booking.com/region/th/uthai-thani.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "800-1500฿/คืน",
                "examples": [
                    "บริษัท ป.ณรงค์ โฮมสเตย์",
                    "The Oriental Beach Resort"
                ],
                "bookingUrl": "https://www.booking.com/region/th/uthai-thani.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1500-3000฿/คืน",
                "examples": [
                    "Green House Uthai Thani",
                    "Sabua The Terrace Homestay"
                ],
                "bookingUrl": "https://www.booking.com/region/th/uthai-thani.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำท่วมฉับพลัน",
                "severity": "medium",
                "note": "น้ำแม่น้ำสะแกกรังเอ่อล้นในฤดูฝน",
                "season": "ก.ค.-ก.ย."
            },
            {
                "label": "ไฟป่า",
                "severity": "low",
                "note": "เกิดไฟป่าในเขตภูเขาน้อยในฤดูร้อน",
                "season": "ก.พ.-เม.ย."
            }
        ],
        "metadata": {
            "climate": "อุณหภูมิ 18-34°C, ฝนตกชุก ก.ค.-ก.ย.",
            "terrain": "ที่ราบลุ่ม แม่น้ำสะแกกรัง",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เมืองรองที่สงบจริง",
                "content": "อุทัยธานีเหมาะกับคนที่อยากได้บรรยากาศช้า เงียบ และไม่เป็นเมืองท่องเที่ยวกระแสหลักมากนัก",
                "type": "culture"
            },
            {
                "title": "วัดท่าซุงคือจุดหลัก",
                "content": "วัดท่าซุงเป็นจุดเด่นที่สุดของจังหวัด ควรเผื่อเวลาพอสมควรและแต่งกายสุภาพ เพราะพื้นที่กว้างและมีนักท่องเที่ยวไทยเยอะ",
                "type": "culture"
            },
            {
                "title": "จักรยานใช้ได้ดีในเมือง",
                "content": "ตัวเมืองและโซนเกาะเทโพค่อนข้างเหมาะกับการปั่นจักรยาน แต่ถ้าจะออกไปแหล่งธรรมชาติไกลเมืองควรมีรถ",
                "type": "route"
            },
            {
                "title": "เหมาะเที่ยวหน้าหนาว",
                "content": "ช่วงพฤศจิกายนถึงกุมภาพันธ์อากาศสบายที่สุด ส่วนปลายฝนถึงต้นหนาวบรรยากาศริมแม่น้ำจะดีมาก",
                "type": "season"
            },
            {
                "title": "ตลาดริมน้ำและของกินพื้นบ้าน",
                "content": "อุทัยธานีเด่นเรื่องวิถีริมน้ำและอาหารท้องถิ่นเรียบง่าย ลองกินตามตลาดเช้าหรือโซนแม่น้ำสะแกกรังจะได้ฟีลจังหวัดชัด",
                "type": "food"
            },
            {
                "title": "งบไม่สูง",
                "content": "จังหวัดนี้ยังคุมงบง่ายทั้งค่าที่พักและอาหาร เหมาะกับทริป 2-3 วันแบบพักผ่อนจริง",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารพาณิชย์ในตัวเมืองอุทัยธานี",
                "area": "ย่านตลาดและตัวเมือง",
                "note": "บริการหลักอยู่ในเมือง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันรอบเมืองและเส้นไปวัดท่าซุง",
                "area": "อำเภอเมืองและทางออกนอกเมือง",
                "note": "ควรเติมก่อนออกเที่ยวธรรมชาติ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะตามวัดและตลาดริมแม่น้ำ",
                "area": "วัดท่าซุง ตัวเมือง และจุดท่องเที่ยวหลัก",
                "note": "วัดท่าซุงรองรับคนเยอะกว่าจุดอื่น",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในเขตเมือง",
                "area": "ตัวเมืองอุทัยธานี",
                "note": "เตรียมของก่อนไปเขตรอบนอกจะดีกว่า",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "จุดบริการนักท่องเที่ยวและเช่าจักรยาน",
                "area": "ตัวเมืองและโซนเกาะเทโพ",
                "note": "เหมาะกับสายเที่ยวช้าในเมือง",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "สถานีขนส่งอุทัยธานี",
                "ย่านแม่น้ำสะแกกรัง",
                "ตัวเมืองอุทัยธานี"
            ],
            "commonDestinations": [
                "วัดท่าซุง",
                "วัดสังกัสรัตนคีรี",
                "แม่น้ำสะแกกรัง",
                "เกาะเทโพ",
                "เขตรักษาพันธุ์สัตว์ป่าห้วยขาแข้ง"
            ],
            "transitHubs": [
                "สถานีขนส่งอุทัยธานี",
                "ตัวเมืองอุทัยธานี"
            ],
            "routeNotes": [
                "ถ้าจะเที่ยวเฉพาะในเมือง จักรยานหรือรถเล็กคล่องตัวมาก",
                "การเดินทางสาธารณะไปอุทัยธานีมักต่อจากนครสวรรค์ได้สะดวก",
                "ถ้าจะออกไปโซนธรรมชาติหรือห้วยขาแข้ง ควรเช็กเงื่อนไขพื้นที่ล่วงหน้า"
            ]
        },
        "ecoIds": [
            "fl_bamboo",
            "fl_orchid_forest",
            "f_tiger",
            "f_banteng",
            "t_western_forest_mountain",
            "c_hot_dry_season",
            "h_forest_fire",
            "h_summer_storm"
        ],
        "newEcoEntities": [
            { id: "fl_bamboo", name: "ไผ่", category: "flora", tags: ["common","edible"], desc: "เป็นพืชพื้นฐานของแนวป่าหลายชนิดในอุทัยธานี โดยเฉพาะพื้นที่ป่าธรรมชาติทางตะวันตก" },
            { id: "fl_orchid_forest", name: "กล้วยไม้ป่า", category: "flora", tags: ["common","rare","protected","seasonal"], desc: "พื้นที่ป่าขนาดใหญ่ของอุทัยธานีรองรับพืชป่าชื้นรวมถึงกล้วยไม้ป่าหลายชนิด" },
            { id: "f_tiger", name: "เสือโคร่ง", category: "fauna", tags: ["danger","rare","protected"], desc: "ห้วยขาแข้งเป็นหนึ่งในพื้นที่สำคัญที่สุดของไทยสำหรับเสือโคร่งและสัตว์ผู้ล่าขนาดใหญ่" },
            { id: "f_banteng", name: "กระทิง", category: "fauna", tags: ["danger","rare","protected"], desc: "อุทัยธานีมีรายงานการพบกระทิงในระบบนิเวศห้วยขาแข้งและพื้นที่กันชนของผืนป่าตะวันตก" },
            { id: "t_western_forest_mountain", name: "ผืนป่าตะวันตกและภูเขา", category: "terrain", tags: ["common","danger"], desc: "อุทัยธานีมีภูมิประเทศเด่นเป็นผืนป่าขนาดใหญ่และภูเขาต่อเนื่องในแนว Western Forest Complex" },
            { id: "c_hot_dry_season", name: "ร้อนจัดและแห้งในหน้าแล้ง", category: "climate", tags: ["common","danger","seasonal"], desc: "อุทัยธานีมีอากาศร้อนจัดในหน้าแล้ง และความแห้งแล้งเพิ่มความเสี่ยงไฟป่าในพื้นที่ป่า" },
            { id: "h_forest_fire", name: "ไฟป่า", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "อุทัยธานีมีความเสี่ยงไฟป่าในหน้าแล้งจากสภาพป่าแห้งและอุณหภูมิสูง" },
            { id: "h_summer_storm", name: "พายุฤดูร้อน ลมแรง และลูกเห็บ", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "อุทัยธานีเป็นหนึ่งในจังหวัดที่ถูกระบุซ้ำในคำเตือนพายุฤดูร้อนของปี 2026 โดยเฉพาะฝนฟ้าคะนอง ลมแรง และลูกเห็บ" }
        ]
    }
};
