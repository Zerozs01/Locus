// Portal seed data: ภาคอีสานบน Part 2 (5 จังหวัด)
// Source: documents/deepreserach/part3_ภาคอีสานบน.md
import type { ProvincePortalSeedData } from './db';

export const isanUpper2: Record<string, ProvincePortalSeedData> = {
    "Sakon Nakhon": {
        "transport": [
            {
                "name": "ท่าอากาศยานสกลนคร",
                "shortName": "สนามบิน",
                "type": "plane",
                "description": "สนามบินจังหวัดสกลนคร มีเที่ยวบินตรงจากกรุงเทพฯ",
                "warpUrl": "https://www.airports.go.th/",
                "logoText": "✈️",
                "color": "#ef4444"
            },
            {
                "name": "รถสองแถวในตัวเมืองสกลนคร",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "เดินทางในเมืองและไปจุดสำคัญ เช่น บขส.-ตลาด-มหาวิทยาลัย",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถตู้/รถมินิบัสคิวอำเภอ",
                "shortName": "รถตู้",
                "type": "van",
                "description": "เชื่อมอำเภอพังโคน วานรนิวาส กุดบาก ฯลฯ",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#06b6d4"
            },
            {
                "name": "มอเตอร์ไซค์รับจ้าง/เช่ามอเตอร์ไซค์",
                "shortName": "มอเตอร์ไซค์",
                "type": "other",
                "description": "เหมาะกับเข้าวัดป่า/เส้นทางชนบท",
                "warpUrl": "",
                "logoText": "🚗",
                "color": "#64748b"
            },
            {
                "name": "จักรยาน/เดินทางในเมือง",
                "shortName": "จักรยาน",
                "type": "bike",
                "description": "โซนตัวเมืองระยะสั้นสามารถใช้จักรยานได้",
                "warpUrl": "",
                "logoText": "🚲",
                "color": "#22c55e"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - สกลนคร (เครื่องบิน)",
                "type": "plane",
                "operator": "Nok Air / Thai AirAsia (ตามฤดูกาล)",
                "from": "กรุงเทพฯ (DMK)",
                "to": "สกลนคร (SNO)",
                "via": [],
                "departureTimes": [
                    "07:05",
                    "12:10",
                    "18:20"
                ],
                "duration": "1 ชม. 10-20 นาที",
                "baseFare": 1500,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สนามบินดอนเมือง",
                "notes": "ตารางบินเปลี่ยนได้บ่อย ควรตรวจสอบก่อนจอง"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - สกลนคร (รถทัวร์)",
                "type": "coach",
                "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
                "from": "กรุงเทพฯ",
                "to": "สกลนคร (บขส.สกล)",
                "via": [
                    "สระบุรี",
                    "นครราชสีมา",
                    "ขอนแก่น",
                    "อุดรธานี"
                ],
                "departureTimes": [
                    "07:00",
                    "10:00",
                    "20:00"
                ],
                "duration": "10-12 ชม.",
                "baseFare": 780,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 3: อุดรธานี - สกลนคร (รถตู้/รถบัส)",
                "type": "van",
                "operator": "คิวรถตู้สายอุดรฯ-สกลฯ",
                "from": "อุดรธานี",
                "to": "สกลนคร",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "09:00",
                    "11:00",
                    "13:00",
                    "15:00"
                ],
                "duration": "3-4 ชม.",
                "baseFare": 220,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งผู้โดยสารอุดรธานี",
                "notes": null
            },
            {
                "name": "สาย 4: เมืองสกลนคร - อุทยานแห่งชาติภูพาน/วัดป่าในโซนภูพาน",
                "type": "van",
                "operator": "เหมารถ/รถสองแถว-รถตู้ท้องถิ่น",
                "from": "สกลนคร (ตัวเมือง)",
                "to": "โซนภูพาน",
                "via": [],
                "departureTimes": [
                    "08:30",
                    "10:30",
                    "13:30"
                ],
                "duration": "1-2 ชม.",
                "baseFare": 150,
                "frequency": "เหมาวันสะดวก",
                "terminal": "จุดนัดหมายในเมือง",
                "notes": "เส้นทางธรรมชาติ/วัดป่าแนะนำไปเช้าและกลับก่อนค่ำ"
            }
        ],
        "localFoods": [
            {
                "name": "แกงหวาย",
                "priceRange": "80-160฿",
                "category": "local",
                "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
            },
            {
                "name": "เนื้อโคขุนโพนยางคำ (เมนูย่าง/สเต๊ก/จิ้มแจ่ว)",
                "priceRange": "150-450฿",
                "category": "local",
                "note": "สินค้าขึ้นชื่อและมีการขึ้นทะเบียน GI"
            },
            {
                "name": "หมูยอ/ของฝากหมูยอสกลนคร",
                "priceRange": "80-250฿",
                "category": "local",
                "note": "นิยมซื้อเป็นของฝากและทำเมนูยำ/ทอด"
            },
            {
                "name": "ไก่ย่างพังโคน",
                "priceRange": "120-220฿",
                "category": "local",
                "note": "อีกหนึ่งเมนูที่คนท้องถิ่นนิยมตามเส้นทางผ่านอ.พังโคน"
            },
            {
                "name": "น้ำหมากเม่า (เครื่องดื่ม/ไวน์ผลไม้)",
                "priceRange": "60-180฿",
                "category": "drink",
                "note": "ผลิตภัณฑ์จากผลหมากเม่าในภาคอีสาน"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "450-900฿/คืน",
                "examples": [
                    "HOP INN Sakon Nakhon",
                    "Color Ville Hotel",
                    "โรงแรมอินทราเพลส"
                ],
                "bookingUrl": "https://www.booking.com/city/th/sakon-nakhon.th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "900-1,700฿/คืน",
                "examples": [
                    "Chokdee Place",
                    "At Sakon Hotel",
                    "The Room Boutique Hotel"
                ],
                "bookingUrl": "https://www.booking.com/city/th/sakon-nakhon.th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1,700-3,200฿/คืน",
                "examples": [
                    "Tafah Residence",
                    "The Majestic Sakon Nakhon Hotel"
                ],
                "bookingUrl": "https://www.booking.com/city/th/sakon-nakhon.th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
                "severity": "medium",
                "note": "ช่วงหน้าร้อนร้อนและอบอ้าว ควรหลบแดด",
                "season": "มี.ค.-พ.ค."
            },
            {
                "label": "PM2.5 จากการเผาในที่โล่ง",
                "severity": "medium",
                "note": "ปลายหนาว-หน้าแล้งฝุ่นสูงเป็นช่วง ๆ",
                "season": "ธ.ค.-เม.ย."
            },
            {
                "label": "เห็ดป่า/พืชป่าพิษ",
                "severity": "medium",
                "note": "หน้าฝนมีเห็ดหลากชนิด ต้องระวังเห็ดพิษ",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "ฝนตกหนัก น้ำป่าไหลหลากบางพื้นที่ภูพาน",
                "severity": "high",
                "note": "พื้นที่ป่า-ภูเขาเสี่ยงน้ำป่าและถนนลื่น",
                "season": "พ.ค.-ต.ค."
            }
        ],
        "ecoIds": [
                "fl_makmao",
                "fl_wetland_aquatic",
                "f_waterbird_nonghan",
                "f_forest_bird_phuphan",
                "t_nonghan_lake",
                "c_basin_cool_season",
                "h_nonghan_flood",
                "h_pm25_burning"
        ],
        "newEcoEntities": [
                { id: "fl_makmao", name: "หมากเม่า", category: "flora", tags: ["common","edible","medicinal","seasonal"], desc: "หมากเม่าเป็นพืชท้องถิ่นเด่นของสกลนครและมีสถานะสินค้า GI ของจังหวัด นิยมแปรรูปเป็นน้ำและไวน์." },
                { id: "fl_wetland_aquatic", name: "พืชน้ำหนองหาร", category: "flora", tags: ["common"], desc: "พืชน้ำรอบหนองหารช่วยคงสมดุลระบบนิเวศ เป็นแหล่งหลบอาศัยของปลาและนกน้ำจำนวนมาก." },
                { id: "f_waterbird_nonghan", name: "นกน้ำหนองหาร", category: "fauna", tags: ["common","protected"], desc: "หนองหารเป็นแหล่งอาศัยและหากินของนกน้ำหลายชนิด จนได้รับการมองว่าเป็นสวรรค์ของนกน้ำในจังหวัด." },
                { id: "f_forest_bird_phuphan", name: "นกป่าเทือกเขาภูพาน", category: "fauna", tags: ["common","protected"], desc: "พื้นที่ป่าภูพานเป็นแหล่งอาศัยของนกป่าหลากชนิด เหมาะกับการท่องเที่ยวเชิงอนุรักษ์มากกว่าการใช้เสียงรบกวน." },
                { id: "t_nonghan_lake", name: "ทะเลสาบน้ำจืดหนองหาร", category: "terrain", tags: ["common"], desc: "หนองหารเป็นทะเลสาบน้ำจืดขนาดใหญ่และเป็นภูมิประเทศเด่นที่สุดของจังหวัด." },
                { id: "c_basin_cool_season", name: "อากาศเย็นในแอ่งสกลนคร", category: "climate", tags: ["common","seasonal"], desc: "สกลนครอยู่ในแอ่งสกลนครและมีช่วงอากาศเย็นค่อนข้างชัดในฤดูหนาว เมื่อเทียบกับอีสานตอนในหลายจังหวัด." },
                { id: "h_nonghan_flood", name: "น้ำท่วมรอบหนองหาร", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนสะสมและระดับน้ำในหนองหารอาจทำให้เกิดน้ำท่วมขังในชุมชนและพื้นที่เกษตรลุ่มต่ำ." },
                { id: "h_pm25_burning", name: "หมอกควันจากการเผา", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ช่วงแล้งมีความเสี่ยงฝุ่นและหมอกควันจากการเผาเศษวัสดุการเกษตรและสภาพอากาศนิ่ง." }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 14-39°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.",
            "terrain": "ที่ราบสูงสลับเทือกเขาภูพานและป่า เหมาะกับสายธรรมชาติ-วัดป่า",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "ศูนย์กลางวัฒนธรรมอีสาน",
                "content": "มีวัดสำคัญและงานบุญตลอดปี โดยเฉพาะแห่ปราสาทผึ้งช่วงออกพรรษา",
                "type": "culture"
            },
            {
                "title": "อากาศเย็นกว่าพื้นราบ",
                "content": "ช่วงปลายปีอุณหภูมิลดลงชัดเจน โดยเฉพาะพื้นที่ใกล้ภูพาน",
                "type": "season"
            },
            {
                "title": "เส้นทางภูพาน",
                "content": "ถนนผ่านภูเขาคดเคี้ยว ควรขับระวังช่วงกลางคืน",
                "type": "safety"
            },
            {
                "title": "อาหารพื้นถิ่น",
                "content": "ปลาน้ำจืดและอาหารหมักดอง เช่น ปลาร้า เป็นจุดเด่น",
                "type": "food"
            },
            {
                "title": "เมืองไม่แออัด",
                "content": "การจราจรคล่องตัว เดินทางในเมืองใช้เวลาไม่นาน",
                "type": "route"
            },
            {
                "title": "แหล่งธรรมชาติ",
                "content": "มีหนองหารเป็นแหล่งน้ำขนาดใหญ่ เหมาะพักผ่อน",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "gas",
                "label": "ปั๊มบนถนนสกล-อุดร",
                "area": "ทางเข้าเมือง",
                "note": "มีหลายจุดต่อเนื่อง",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มในตัวเมือง",
                "area": "เมืองสกลนคร",
                "note": "หาง่าย",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารในห้าง",
                "area": "Robinson Sakon Nakhon",
                "note": "รวมหลายธนาคาร",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำห้าง",
                "area": "ห้างหลัก",
                "note": "สะอาด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยา",
                "area": "รอบโรงพยาบาลศูนย์",
                "note": "เปิดหลายช่วงเวลา",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "คลินิกเอกชน",
                "area": "ตัวเมือง",
                "note": "รองรับทั่วไป",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจเมือง",
                "area": "ตัวเมือง",
                "note": "ติดต่อได้ตลอด",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ตลาดสด",
                "area": "ในเมือง",
                "note": "อาหารราคาถูก",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "Udon Thani",
                "Nakhon Phanom",
                "Kalasin"
            ],
            "commonDestinations": [
                "Nakhon Phanom",
                "Mukdahan",
                "Phu Phan",
                "Nong Han Lake"
            ],
            "transitHubs": [
                "Sakon Nakhon Airport",
                "Bus Terminal",
                "Phang Khon Junction"
            ],
            "routeNotes": [
                "ถนนหลักคือทางหลวง 22 เชื่อมอุดร-นครพนม",
                "เส้นภูพานมีโค้งเยอะ ขับกลางคืนต้องระวัง",
                "รถไม่หนาแน่น เดินทางเร็วกว่าเมืองใหญ่"
            ]
        }
    },
    "Nakhon Phanom": {
        "transport": [
            {
                "name": "ท่าอากาศยานนครพนม",
                "shortName": "สนามบิน",
                "type": "plane",
                "description": "สนามบินจังหวัดนครพนม มีเที่ยวบินตรงจากกรุงเทพฯ",
                "warpUrl": "https://www.airports.go.th/",
                "logoText": "✈️",
                "color": "#ef4444"
            },
            {
                "name": "รถสองแถว/รถโดยสารในตัวเมืองนครพนม",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "วิ่งในเมืองและไปจุดสำคัญ เช่น ตลาด-ริมโขง-บขส.",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถตู้/รถมินิบัสสายอำเภอ (ธาตุพนม-เรณูนคร-นาแก)",
                "shortName": "รถตู้",
                "type": "van",
                "description": "เชื่อมแหล่งท่องเที่ยวสำคัญและชุมชนไทญ้อ",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#06b6d4"
            },
            {
                "name": "จักรยาน/เลนปั่นเลียบโขง",
                "shortName": "จักรยาน",
                "type": "bike",
                "description": "ระบบทางเดิน-ทางจักรยานเลียบโขงเหมาะกับเที่ยวในเมือง",
                "warpUrl": "",
                "logoText": "🚲",
                "color": "#22c55e"
            },
            {
                "name": "เรือนำเที่ยวแม่น้ำโขง (บางฤดูกาล)",
                "shortName": "เรือ",
                "type": "boat",
                "description": "ล่องชมวิวริมโขง (ขึ้นกับฤดูกาลและผู้ให้บริการ)",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#0ea5e9"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - นครพนม (เครื่องบิน)",
                "type": "plane",
                "operator": "Thai AirAsia / Thai Lion Air (หลัก)",
                "from": "กรุงเทพฯ (DMK)",
                "to": "นครพนม (KOP)",
                "via": [],
                "departureTimes": [
                    "07:10",
                    "12:20",
                    "18:00"
                ],
                "duration": "1 ชม. 15-20 นาที",
                "baseFare": 1200,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สนามบินดอนเมือง",
                "notes": "สายการบิน/ความถี่อาจเปลี่ยนตามฤดูกาล"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - นครพนม (รถทัวร์)",
                "type": "coach",
                "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
                "from": "กรุงเทพฯ",
                "to": "นครพนม (บขส.นครพนม)",
                "via": [
                    "สระบุรี",
                    "นครราชสีมา",
                    "ขอนแก่น",
                    "อุดรธานี",
                    "สกลนคร"
                ],
                "departureTimes": [
                    "07:00",
                    "10:00",
                    "19:30"
                ],
                "duration": "11-13 ชม.",
                "baseFare": 850,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 3: เมืองนครพนม - ธาตุพนม",
                "type": "van",
                "operator": "คิวรถตู้เมืองนครพนม-ธาตุพนม",
                "from": "นครพนม (ตัวเมือง)",
                "to": "อ.ธาตุพนม",
                "via": [],
                "departureTimes": [
                    "07:30",
                    "09:30",
                    "11:30",
                    "13:30",
                    "15:30"
                ],
                "duration": "1-1.5 ชม.",
                "baseFare": 80,
                "frequency": "ประมาณทุก 1 ชม.",
                "terminal": "คิวรถตู้/สถานีขนส่งนครพนม",
                "notes": null
            },
            {
                "name": "สาย 4: เมืองนครพนม - เรณูนคร",
                "type": "van",
                "operator": "รถตู้ท้องถิ่น",
                "from": "นครพนม (ตัวเมือง)",
                "to": "อ.เรณูนคร",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "10:00",
                    "13:00",
                    "15:00"
                ],
                "duration": "1.5-2 ชม.",
                "baseFare": 100,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "คิวรถตู้ในเมือง/สถานีขนส่ง",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "เมี่ยงตาสวด",
                "priceRange": "80-160฿",
                "category": "local",
                "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
            },
            {
                "name": "หมกเจาะ (อาหารพื้นถิ่นไทญ้อ)",
                "priceRange": "80-180฿",
                "category": "local",
                "note": "เมนูขึ้นชื่อของชุมชนไทญ้อ โดยเฉพาะโซนท่าอุเทน"
            },
            {
                "name": "หมูยอนครพนม (เช่น หมูยอป้ายุง)",
                "priceRange": "80-250฿",
                "category": "local",
                "note": "ของฝากเด่นของนครพนม"
            },
            {
                "name": "ข้าวปุ้นน้ำนัว/ข้าวปุ้นน้ำแจ่ว (เรณูนคร)",
                "priceRange": "60-120฿",
                "category": "street",
                "note": "อิทธิพลอาหารเวียดนาม-ลุ่มโขงในพื้นที่"
            },
            {
                "name": "ลิ้นจี่นครพนม (ผลไม้ GI)",
                "priceRange": "80-200฿",
                "category": "dessert",
                "note": "ผลไม้ GI ของจังหวัด (ตามฤดูกาล)"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "450-1,000฿/คืน",
                "examples": [
                    "HOP INN Nakhon Phanom",
                    "Windsor Hotel",
                    "U- Homehotel Nakhonpanom"
                ],
                "bookingUrl": "https://www.booking.com/city/th/nakhon-phanom.th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,000-2,000฿/คืน",
                "examples": [
                    "Blu Hotel",
                    "The Square Hotel",
                    "I Hotel Nakhon Phanom"
                ],
                "bookingUrl": "https://www.booking.com/city/th/nakhon-phanom.th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2,000-4,500฿/คืน",
                "examples": [
                    "Fortune River View Hotel Nakhon Phanom",
                    "The River Hotel"
                ],
                "bookingUrl": "https://www.booking.com/city/th/nakhon-phanom.th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำหลากริมโขง/น้ำท่วมตลิ่ง",
                "severity": "medium",
                "note": "ฤดูฝนอาจมีน้ำเอ่อล้นตลิ่งและทางเดินริมโขงบางช่วงปิด",
                "season": "ส.ค.-ต.ค."
            },
            {
                "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
                "severity": "medium",
                "note": "กลางวันร้อนจัดช่วงหน้าแล้ง",
                "season": "มี.ค.-พ.ค."
            },
            {
                "label": "PM2.5 จากการเผาในที่โล่ง",
                "severity": "medium",
                "note": "ปลายหนาว-หน้าแล้งฝุ่นสูงได้",
                "season": "ธ.ค.-เม.ย."
            },
            {
                "label": "ฝนตกหนัก/พายุฝนฟ้าคะนอง",
                "severity": "medium",
                "note": "มรสุมทำให้ฝนตกหนักเป็นช่วง ๆ",
                "season": "พ.ค.-ต.ค."
            }
        ],
        "ecoIds": [
                "fl_makmao",
                "fl_dipterocarp",
                "f_mekong_waterbird",
                "f_fish_mekong",
                "t_mekong_riparian",
                "c_rainy_monsoon",
                "h_mekong_flood",
                "h_bank_erosion"
        ],
        "newEcoEntities": [
                { id: "fl_makmao", name: "หมากเม่า", category: "flora", tags: ["common","edible","medicinal","seasonal"], desc: "หมากเม่าพบในเขตอีสานเหนือตามแนวภูพานและพื้นที่ใกล้เคียงของนครพนม นิยมกินสดและแปรรูป." },
                { id: "fl_dipterocarp", name: "ไม้เต็งรังที่ดอน", category: "flora", tags: ["common"], desc: "ด้านตะวันตกของจังหวัดมีลักษณะที่ดอนและป่าเต็งรัง สะท้อนสภาพดินลูกรังและค่อนข้างแห้ง." },
                { id: "f_mekong_waterbird", name: "นกน้ำริมโขง", category: "fauna", tags: ["common","protected","seasonal"], desc: "แนวแม่น้ำโขงและแหล่งน้ำธรรมชาติในนครพนมเป็นพื้นที่หากินของนกน้ำและนกริมตลิ่งหลายชนิด." },
                { id: "f_fish_mekong", name: "ปลาน้ำจืดแม่น้ำโขง", category: "fauna", tags: ["common"], desc: "แม่น้ำโขงเป็นฐานทรัพยากรสัตว์น้ำสำคัญของจังหวัด ทั้งเพื่อระบบนิเวศและวิถีชุมชนริมฝั่ง." },
                { id: "t_mekong_riparian", name: "ที่ราบลุ่มเลียบแม่น้ำโขง", category: "terrain", tags: ["common"], desc: "นครพนมมีแนวยาวเลียบฝั่งขวาของแม่น้ำโขง ทำให้พื้นที่ริมน้ำเป็นลักษณะภูมิประเทศหลักของจังหวัด." },
                { id: "c_rainy_monsoon", name: "ฝนชุกจากมรสุม", category: "climate", tags: ["common","danger","seasonal"], desc: "นครพนมมักมีฝนชุกในฤดูฝนจากอิทธิพลมรสุมและระบบพายุจากทะเลจีนใต้ที่เคลื่อนเข้ามาใกล้." },
                { id: "h_mekong_flood", name: "น้ำท่วมลุ่มโขง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "พื้นที่ใกล้แม่น้ำโขงมีความเสี่ยงน้ำล้นตลิ่งและน้ำท่วมขังในช่วงฝนหนักหรือเมื่อน้ำโขงสูง." },
                { id: "h_bank_erosion", name: "ตลิ่งทรุดและกัดเซาะริมโขง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "บางจุดริมฝั่งโขงเสี่ยงตลิ่งอ่อนตัวและการกัดเซาะ ไม่ควรจอดรถหรือยืนชิดตลิ่งหลังฝนตกต่อเนื่อง." }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 14-38°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.",
            "terrain": "เมืองริมโขง มีพื้นที่ราบสูงสลับลุ่มน้ำและเส้นทางท่องเที่ยวเลียบแม่น้ำ",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เมืองริมโขง",
                "content": "วิวแม่น้ำโขงสวย โดยเฉพาะช่วงเย็น",
                "type": "culture"
            },
            {
                "title": "พระธาตุพนม",
                "content": "แลนด์มาร์คสำคัญ นักท่องเที่ยวเยอะช่วงเทศกาล",
                "type": "culture"
            },
            {
                "title": "ถนนเลียบโขง",
                "content": "ขับรถชมวิวได้ยาว เหมาะ road trip",
                "type": "route"
            },
            {
                "title": "ฝนตกหนักบางฤดู",
                "content": "ช่วงหน้าฝนอาจมีน้ำขังบางพื้นที่",
                "type": "season"
            },
            {
                "title": "อาหารเวียดนาม",
                "content": "มีอาหารเวียดนามจำนวนมาก",
                "type": "food"
            }
        ],
        "supplyPoints": [
            {
                "type": "gas",
                "label": "ปั๊มเลียบโขง",
                "area": "ตัวเมือง",
                "note": "หาง่าย",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารในเมือง",
                "area": "ใจกลางเมือง",
                "note": "ครบ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำริมโขง",
                "area": "แลนด์มาร์ค",
                "note": "มีบริการ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยา",
                "area": "ตัวเมือง",
                "note": "เพียงพอ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจ",
                "area": "เมือง",
                "note": "24 ชม.",
                "openHours": "24 ชม.",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "Sakon Nakhon",
                "Mukdahan"
            ],
            "commonDestinations": [
                "Mukdahan",
                "That Phanom",
                "Vietnam Border"
            ],
            "transitHubs": [
                "Airport",
                "Bus Terminal"
            ],
            "routeNotes": [
                "ถนนเลียบโขงเหมาะขับชิล",
                "มีเส้นเชื่อมลาวหลายจุด"
            ]
        }
    },
    "Mukdahan": {
        "transport": [
            {
                "name": "รถสองแถวในตัวเมืองมุกดาหาร",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "วิ่งในเมืองและเชื่อมจุดสำคัญ เช่น ตลาดราตรี-บขส.-สะพานมิตรภาพฯ",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถสามล้อเครื่อง/รถรับจ้างในเมืองมุกดาหาร",
                "shortName": "รถรับจ้าง",
                "type": "tuk_tuk",
                "description": "เหมาะกับระยะสั้นในเมือง/ย่านท่องเที่ยว",
                "warpUrl": "",
                "logoText": "🛺",
                "color": "#a855f7"
            },
            {
                "name": "รถตู้/รถมินิบัสเชื่อมจังหวัดใกล้เคียง",
                "shortName": "รถตู้",
                "type": "van",
                "description": "เชื่อมกาฬสินธุ์ สกลนคร นครพนม และอุบลฯตามคิวรถ",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#06b6d4"
            },
            {
                "name": "รถโดยสารระหว่างจังหวัด (บขส./เอกชน)",
                "shortName": "รถทัวร์",
                "type": "bus",
                "description": "เดินทางระยะไกล เช่น กรุงเทพฯ-มุกดาหาร",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#3b82f6"
            },
            {
                "name": "เรือนำเที่ยวแม่น้ำโขง (บางฤดูกาล)",
                "shortName": "เรือ",
                "type": "boat",
                "description": "ล่องชมวิวโขง/แก่งกะเบา ขึ้นกับฤดูกาลและระดับน้ำ",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#0ea5e9"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - มุกดาหาร (รถทัวร์)",
                "type": "coach",
                "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
                "from": "กรุงเทพฯ",
                "to": "มุกดาหาร (บขส.มุกดาหาร)",
                "via": [
                    "สระบุรี",
                    "นครราชสีมา",
                    "ขอนแก่น",
                    "กาฬสินธุ์"
                ],
                "departureTimes": [
                    "07:00",
                    "10:00",
                    "20:00"
                ],
                "duration": "10-12 ชม.",
                "baseFare": 780,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 2: ขอนแก่น - มุกดาหาร (รถตู้/รถบัส)",
                "type": "van",
                "operator": "คิวรถตู้/รถบัสท้องถิ่น",
                "from": "ขอนแก่น",
                "to": "มุกดาหาร",
                "via": [
                    "มหาสารคาม",
                    "กาฬสินธุ์"
                ],
                "departureTimes": [
                    "08:00",
                    "11:00",
                    "14:00",
                    "17:00"
                ],
                "duration": "4-6 ชม.",
                "baseFare": 280,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่ง จ.ขอนแก่น (บขส.3)",
                "notes": null
            },
            {
                "name": "สาย 3: มุกดาหาร - นครพนม (รถตู้/รถบัส)",
                "type": "van",
                "operator": "คิวรถตู้สายมุกดาหาร-นครพนม",
                "from": "มุกดาหาร",
                "to": "นครพนม",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "10:00",
                    "12:00",
                    "14:00",
                    "16:00"
                ],
                "duration": "2-3 ชม.",
                "baseFare": 140,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งมุกดาหาร",
                "notes": null
            },
            {
                "name": "สาย 4: ตัวเมืองมุกดาหาร - ห้าแยกเวียดนาม (ตลาดเช้า)",
                "type": "bus",
                "operator": "รถสองแถว/รถรับจ้างในเมือง",
                "from": "ตัวเมืองมุกดาหาร",
                "to": "ห้าแยกเวียดนาม",
                "via": [],
                "departureTimes": [
                    "06:30",
                    "08:00",
                    "10:00"
                ],
                "duration": "10-20 นาที",
                "baseFare": 20,
                "frequency": "วิ่งถี่ช่วงเช้า",
                "terminal": "จุดจอดในเมือง",
                "notes": "เหมาะไปตลาดอาหารเช้า ควรไปเช้า"
            }
        ],
        "localFoods": [
            {
                "name": "ตำเมี่ยงตะไคร้ ลำข่าสดใส่มดแดง",
                "priceRange": "80-160฿",
                "category": "local",
                "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
            },
            {
                "name": "ข้าวเปียก (ตลาดเช้าห้าแยกเวียดนาม)",
                "priceRange": "50-90฿",
                "category": "street",
                "note": "อาหารเช้าขึ้นชื่อของมุกดาหาร"
            },
            {
                "name": "ก๋วยจั๊บญวน (ชุมชนเวียดนาม)",
                "priceRange": "60-120฿",
                "category": "street",
                "note": "เมนูเส้นน้ำซุปหอม นิยมในโซนชุมชนเวียดนาม"
            },
            {
                "name": "เลือดแปลง",
                "priceRange": "50-100฿",
                "category": "street",
                "note": "อาหารเช้าท้องถิ่นที่พบในตลาดเช้า"
            },
            {
                "name": "หมูยอ/ของฝากโซนตลาดราตรีมุกดาหาร",
                "priceRange": "80-250฿",
                "category": "local",
                "note": "ย่านตลาดราตรีมีของฝากอาหารหลากหลาย"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "450-1,000฿/คืน",
                "examples": [
                    "Vieng Khong Hotel",
                    "Mukdaview Hotel",
                    "River City Hotel"
                ],
                "bookingUrl": "https://www.booking.com/city/th/mukdahan.th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,000-2,000฿/คืน",
                "examples": [
                    "Ploy Palace Hotel",
                    "Mukdahan Grand Hotel",
                    "Hotel Muq"
                ],
                "bookingUrl": "https://www.booking.com/city/th/mukdahan.th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2,000-4,500฿/คืน",
                "examples": [
                    "Hotel de Ladda",
                    "Isaan Country Retreat"
                ],
                "bookingUrl": "https://www.booking.com/city/th/mukdahan.th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "น้ำหลาก/ตลิ่งริมโขงลื่น",
                "severity": "medium",
                "note": "ทางเดินริมน้ำและท่าน้ำอาจลื่น โดยเฉพาะฤดูฝน",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
                "severity": "medium",
                "note": "ร้อนอบอ้าวช่วงหน้าแล้ง",
                "season": "มี.ค.-พ.ค."
            },
            {
                "label": "PM2.5 จากการเผาในที่โล่ง",
                "severity": "medium",
                "note": "ปลายหนาว-หน้าแล้งฝุ่นสูงได้",
                "season": "ธ.ค.-เม.ย."
            },
            {
                "label": "พายุฝนฟ้าคะนองฉับพลัน",
                "severity": "medium",
                "note": "ช่วงเปลี่ยนฤดูมีฝนหนักและลมแรง",
                "season": "มี.ค.-พ.ค."
            }
        ],
        "ecoIds": [
                "fl_makmao",
                "fl_dry_dipterocarp",
                "f_mekong_waterbird",
                "f_forest_reptile",
                "t_hill_mekong_mix",
                "c_hot_dry",
                "h_mekong_flood",
                "h_storm_rock_area"
        ],
        "newEcoEntities": [
                { id: "fl_makmao", name: "หมากเม่า", category: "flora", tags: ["common","edible","medicinal","seasonal"], desc: "หมากเม่าเป็นพืชท้องถิ่นที่พบได้ในแนวภูพานและพื้นที่อีสานเหนือรวมถึงมุกดาหาร นิยมทำเครื่องดื่มและแยม." },
                { id: "fl_dry_dipterocarp", name: "ไม้เต็งรังและเบญจพรรณแล้ง", category: "flora", tags: ["common"], desc: "จังหวัดมุกดาหารมีพื้นที่ภูเขาสลับที่ราบสูง ป่าเต็งรังและป่าเบญจพรรณแล้งจึงพบได้มากในเขตดอน." },
                { id: "f_mekong_waterbird", name: "นกน้ำริมโขง", category: "fauna", tags: ["common","protected","seasonal"], desc: "แนวโขงของมุกดาหารเป็นพื้นที่เปิดที่มีนกน้ำและนกริมตลิ่งหลายชนิดใช้หากินตามฤดูกาล." },
                { id: "f_forest_reptile", name: "สัตว์เลื้อยคลานชายป่า", category: "fauna", tags: ["common","danger","seasonal"], desc: "พื้นที่หินและป่าโปร่งของมุกดาหารเอื้อต่อสัตว์เลื้อยคลานหลายชนิด ควรระวังเมื่อเดินนอกทาง." },
                { id: "t_hill_mekong_mix", name: "ภูเขาสลับที่ราบสูงเลียบโขง", category: "terrain", tags: ["common"], desc: "มุกดาหารมีลักษณะเด่นเป็นภูเขาสลับที่ราบสูง มีที่ราบลุ่มบางส่วนทางตอนกลางและด้านตะวันออกเฉียงเหนือ." },
                { id: "c_hot_dry", name: "อากาศร้อนแห้งเด่น", category: "climate", tags: ["common","danger","seasonal"], desc: "ช่วงปลายหนาวถึงต้นร้อนอากาศค่อนข้างร้อนและแห้ง โดยเฉพาะในพื้นที่เปิดโล่งและดอนสูง." },
                { id: "h_mekong_flood", name: "น้ำท่วมริมโขง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "พื้นที่เลียบโขงมีความเสี่ยงน้ำท่วมขังหรือน้ำล้นตลิ่งในช่วงฝนหนักและระดับน้ำสูง." },
                { id: "h_storm_rock_area", name: "พายุและฟ้าผ่าบนพื้นที่หินโล่ง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "จุดชมวิวหินและพื้นที่โล่งรับลมแรงง่ายในช่วงพายุฝนฟ้าคะนอง ควรหลีกเลี่ยงการอยู่บนลานหินขณะฟ้าคะนอง." }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 15-39°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.",
            "terrain": "เมืองชายแดนริมโขง เน้นเส้นทางค้าชายแดนและวัฒนธรรมหลากหลายชาติพันธุ์",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "ประตูสู่อินโดจีน",
                "content": "มีสะพานข้ามไปลาวที่สำคัญ",
                "type": "route"
            },
            {
                "title": "ตลาดอินโดจีน",
                "content": "สินค้าราคาถูกจากหลายประเทศ",
                "type": "budget"
            },
            {
                "title": "อากาศร้อน",
                "content": "แดดแรงช่วงกลางวัน",
                "type": "season"
            },
            {
                "title": "วิวโขง",
                "content": "จุดชมวิวหลายแห่ง",
                "type": "culture"
            },
            {
                "title": "ถนนชายแดน",
                "content": "บางช่วงรถบรรทุกเยอะ",
                "type": "safety"
            }
        ],
        "supplyPoints": [
            {
                "type": "gas",
                "label": "ปั๊มใกล้ด่าน",
                "area": "ชายแดน",
                "note": "ควรเติมก่อนข้าม",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารเมือง",
                "area": "ตัวเมือง",
                "note": "ครบ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำตลาด",
                "area": "ตลาดอินโดจีน",
                "note": "มีบริการ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "คลินิก",
                "area": "เมือง",
                "note": "พื้นฐาน",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจ",
                "area": "เมือง",
                "note": "24 ชม.",
                "openHours": "24 ชม.",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "Nakhon Phanom",
                "Kalasin"
            ],
            "commonDestinations": [
                "Savannakhet",
                "Ubon Ratchathani"
            ],
            "transitHubs": [
                "Border Checkpoint",
                "Bus Terminal"
            ],
            "routeNotes": [
                "ด่านข้ามลาวหลัก",
                "รถบรรทุกเยอะช่วงกลางวัน"
            ]
        }
    },
    "Kalasin": {
        "transport": [
            {
                "name": "รถสองแถว/รถโดยสารในตัวเมืองกาฬสินธุ์",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "ใช้เดินทางในเมืองและไปอำเภอใกล้เคียง",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถตู้/รถมินิบัสเชื่อมขอนแก่น-มหาสารคาม-กาฬสินธุ์",
                "shortName": "รถตู้",
                "type": "van",
                "description": "ทางเลือกหลักสำหรับต่อจากเมืองหลัก/สถานีขนส่ง",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#06b6d4"
            },
            {
                "name": "รถโดยสารระหว่างจังหวัด (บขส./เอกชน)",
                "shortName": "รถทัวร์",
                "type": "bus",
                "description": "เดินทางไกล เช่น กรุงเทพฯ-กาฬสินธุ์",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#3b82f6"
            },
            {
                "name": "มอเตอร์ไซค์รับจ้าง/เช่ามอเตอร์ไซค์",
                "shortName": "มอเตอร์ไซค์",
                "type": "other",
                "description": "เหมาะกับไปเขื่อนลำปาว/พิพิธภัณฑ์สิรินธร/แหล่งท่องเที่ยวกระจายตัว",
                "warpUrl": "",
                "logoText": "🚗",
                "color": "#64748b"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - กาฬสินธุ์ (รถทัวร์)",
                "type": "coach",
                "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
                "from": "กรุงเทพฯ",
                "to": "กาฬสินธุ์ (บขส.กาฬสินธุ์)",
                "via": [
                    "สระบุรี",
                    "นครราชสีมา",
                    "ขอนแก่น",
                    "มหาสารคาม"
                ],
                "departureTimes": [
                    "07:00",
                    "10:00",
                    "20:00"
                ],
                "duration": "8-10 ชม.",
                "baseFare": 600,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 2: ขอนแก่น - กาฬสินธุ์ (รถตู้/รถบัส)",
                "type": "van",
                "operator": "คิวรถตู้/รถบัสท้องถิ่น",
                "from": "ขอนแก่น",
                "to": "กาฬสินธุ์",
                "via": [
                    "มหาสารคาม"
                ],
                "departureTimes": [
                    "08:00",
                    "10:00",
                    "12:00",
                    "14:00",
                    "16:00"
                ],
                "duration": "2.5-3.5 ชม.",
                "baseFare": 160,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่ง จ.ขอนแก่น (บขส.3)",
                "notes": null
            },
            {
                "name": "สาย 3: กาฬสินธุ์ - พิพิธภัณฑ์สิรินธร (สหัสขันธ์)",
                "type": "van",
                "operator": "รถตู้/รถสองแถวท้องถิ่น",
                "from": "ตัวเมืองกาฬสินธุ์",
                "to": "อ.สหัสขันธ์",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "11:00",
                    "13:00",
                    "15:00"
                ],
                "duration": "1-1.5 ชม.",
                "baseFare": 60,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "คิวรถท้องถิ่นในเมือง/สถานีขนส่ง",
                "notes": "เหมาะไปพิพิธภัณฑ์ไดโนเสาร์และแหล่งท่องเที่ยวใกล้เคียง"
            },
            {
                "name": "สาย 4: กาฬสินธุ์ - เขื่อนลำปาว",
                "type": "van",
                "operator": "เหมารถ/รถท้องถิ่น",
                "from": "ตัวเมืองกาฬสินธุ์",
                "to": "เขื่อนลำปาว",
                "via": [],
                "departureTimes": [
                    "10:00",
                    "13:00",
                    "16:00"
                ],
                "duration": "40-60 นาที",
                "baseFare": 80,
                "frequency": "เที่ยวจำกัด/เหมารถสะดวก",
                "terminal": "จุดนัดหมายในเมือง",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวแดะงา",
                "priceRange": "30-70฿",
                "category": "street",
                "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
            },
            {
                "name": "กุ้งก้ามกรามกาฬสินธุ์ (ย่าง/เผา/อบ)",
                "priceRange": "250-650฿",
                "category": "local",
                "note": "สินค้าขึ้นทะเบียน GI จุดเด่นเนื้อหวานแน่น"
            },
            {
                "name": "ไส้กรอกปลากาฬสินธุ์",
                "priceRange": "35-80฿",
                "category": "street",
                "note": "ของกิน/ของฝากที่ถูกกล่าวถึงในงานอาหารอีสานของ ททท."
            },
            {
                "name": "ข้าวเหนียวเขาวง (ของฝาก/เมนูข้าวเหนียว)",
                "priceRange": "40-120฿",
                "category": "local",
                "note": "ผลิตภัณฑ์ท้องถิ่นของอำเภอเขาวง"
            },
            {
                "name": "ปลาน้ำจืด/ปลาเผาโซนลำปาว (ตามฤดูกาล)",
                "priceRange": "120-250฿",
                "category": "local",
                "note": "นิยมตามร้านริมเขื่อนและตลาดท้องถิ่น"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "400-900฿/คืน",
                "examples": [
                    "TK residence",
                    "JS Motel",
                    "Supak Hotel"
                ],
                "bookingUrl": "https://www.booking.com/city/th/kalasin.th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "900-1,900฿/คืน",
                "examples": [
                    "Rimpao Hotel",
                    "Chada View Resort",
                    "Supak Hotel"
                ],
                "bookingUrl": "https://www.booking.com/city/th/kalasin.th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1,900-3,800฿/คืน",
                "examples": [
                    "Romlaphass Boutique Villa",
                    "Rimpao Hotel"
                ],
                "bookingUrl": "https://www.booking.com/city/th/kalasin.th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
                "severity": "medium",
                "note": "แดดแรงช่วงหน้าแล้ง โดยเฉพาะเที่ยวเขื่อน/แหล่งกลางแจ้ง",
                "season": "มี.ค.-พ.ค."
            },
            {
                "label": "PM2.5 จากการเผาในที่โล่ง",
                "severity": "medium",
                "note": "ปลายหนาว-หน้าแล้งฝุ่นสูงเป็นช่วง ๆ",
                "season": "ธ.ค.-เม.ย."
            },
            {
                "label": "ฝนตกหนัก/น้ำท่วมขังในพื้นที่ลุ่ม",
                "severity": "medium",
                "note": "ฤดูฝนเสี่ยงน้ำท่วมขังและถนนลื่น",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "อุบัติเหตุทางถนนในเส้นทางต่างอำเภอ",
                "severity": "medium",
                "note": "ถนนระหว่างอำเภอวิ่งเร็ว ควรขับระวังและหลีกเลี่ยงกลางคืน",
                "season": null
            }
        ],
        "ecoIds": [
                "fl_rice_jasmine",
                "fl_wetland_grass",
                "f_waterbird_lampao",
                "f_freshwater_prawn",
                "t_lampao_basin",
                "c_pm25_dry",
                "h_lampao_flood",
                "h_drought"
        ],
        "newEcoEntities": [
                { id: "fl_rice_jasmine", name: "ข้าวหอมมะลิ", category: "flora", tags: ["common","edible","seasonal"], desc: "กาฬสินธุ์เป็นจังหวัดเกษตรกรรมสำคัญของอีสานตอนกลาง พื้นที่นาส่วนใหญ่ปลูกข้าวเป็นหลัก." },
                { id: "fl_wetland_grass", name: "พืชชายน้ำลำปาว", category: "flora", tags: ["common"], desc: "พืชชายน้ำตามลำน้ำปาวและแหล่งเก็บน้ำช่วยยึดตะกอนและเป็นที่หลบอาศัยของสัตว์น้ำและนกน้ำ." },
                { id: "f_waterbird_lampao", name: "นกน้ำลำปาว", category: "fauna", tags: ["common","protected","seasonal"], desc: "อ่างเก็บน้ำขนาดใหญ่และพื้นที่ชุ่มน้ำในกาฬสินธุ์ดึงดูดนกน้ำตามฤดูกาล โดยเฉพาะในช่วงน้ำลด." },
                { id: "f_freshwater_prawn", name: "กุ้งก้ามกรามกาฬสินธุ์", category: "fauna", tags: ["common"], desc: "เป็นสัตว์น้ำเศรษฐกิจที่ได้รับการรับรอง GI ของจังหวัด สะท้อนความสำคัญของทรัพยากรน้ำจืดในพื้นที่." },
                { id: "t_lampao_basin", name: "ลุ่มน้ำลำปาวและที่ราบลูกคลื่น", category: "terrain", tags: ["common"], desc: "กาฬสินธุ์มีที่ราบลูกคลื่นและระบบลุ่มน้ำลำปาวเป็นแกนหลักของภูมิประเทศและเกษตรกรรม." },
                { id: "c_pm25_dry", name: "ฝุ่น PM2.5 ฤดูแล้ง", category: "climate", tags: ["danger","common","seasonal"], desc: "ช่วงปลายหนาวถึงต้นร้อนมักมีหมอกควันและฝุ่นสะสมจากการเผาและอากาศนิ่ง." },
                { id: "h_lampao_flood", name: "น้ำท่วมลุ่มน้ำปาว", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนหนักและน้ำหลากในลุ่มน้ำปาวอาจกระทบพื้นที่เกษตรและทางสัญจรในพื้นที่ต่ำ." },
                { id: "h_drought", name: "ภัยแล้งและน้ำต้นทุนลด", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "กาฬสินธุ์มีความเสี่ยงภัยแล้งในช่วงปลายฤดูแล้ง โดยเฉพาะพื้นที่นอกเขตชลประทานและแหล่งน้ำขนาดเล็ก." }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 15-39°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.",
            "terrain": "ที่ราบสูงอีสาน มีแหล่งน้ำสำคัญอย่างเขื่อนลำปาว และแหล่งไดโนเสาร์/ภูเขาเตี้ยบางพื้นที่",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "แหล่งไดโนเสาร์",
                "content": "มีพิพิธภัณฑ์และแหล่งขุดค้น",
                "type": "culture"
            },
            {
                "title": "เมืองเงียบ",
                "content": "จราจรไม่หนาแน่น",
                "type": "route"
            },
            {
                "title": "อาหารพื้นบ้าน",
                "content": "รสจัดแบบอีสานแท้",
                "type": "food"
            },
            {
                "title": "อากาศร้อน",
                "content": "แดดแรงช่วงกลางปี",
                "type": "season"
            },
            {
                "title": "ถนนชนบท",
                "content": "บางช่วงแคบ",
                "type": "safety"
            }
        ],
        "supplyPoints": [
            {
                "type": "gas",
                "label": "ปั๊มในเมือง",
                "area": "ตัวเมือง",
                "note": "เพียงพอ",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคาร",
                "area": "เมือง",
                "note": "ครบ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำตลาด",
                "area": "ตลาด",
                "note": "พื้นฐาน",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านยา",
                "area": "เมือง",
                "note": "เพียงพอ",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "Khon Kaen"
            ],
            "commonDestinations": [
                "Roi Et",
                "Mukdahan"
            ],
            "transitHubs": [
                "Bus Terminal"
            ],
            "routeNotes": [
                "ถนนรองเยอะ",
                "เดินทางง่ายไม่ซับซ้อน"
            ]
        }
    },
    "Bueng Kan": {
        "transport": [
            {
                "name": "รถสองแถว/รถโดยสารในตัวเมืองบึงกาฬ",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "เดินทางในเมืองและไปจุดสำคัญ เช่น ตลาดเช้า-บขส.-ริมโขง",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถตู้/รถมินิบัสเชื่อมอุดรธานี-หนองคาย-บึงกาฬ",
                "shortName": "รถตู้",
                "type": "van",
                "description": "เป็นทางเลือกหลักเพราะไม่มีสนามบิน/รถไฟ",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#06b6d4"
            },
            {
                "name": "มอเตอร์ไซค์รับจ้าง/เช่ามอเตอร์ไซค์",
                "shortName": "มอเตอร์ไซค์",
                "type": "other",
                "description": "เหมาะไปภูทอก-บึงโขงหลง-จุดธรรมชาติที่รถสาธารณะมีจำกัด",
                "warpUrl": "",
                "logoText": "🚗",
                "color": "#64748b"
            },
            {
                "name": "เรือนำเที่ยวแม่น้ำโขง (บางฤดูกาล)",
                "shortName": "เรือ",
                "type": "boat",
                "description": "ล่องชมวิวริมโขง/แก่งอาฮง ขึ้นกับฤดูกาลและผู้ให้บริการ",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#0ea5e9"
            },
            {
                "name": "จักรยาน/เดินเล่นเลียบโขงในเมือง",
                "shortName": "จักรยาน",
                "type": "bike",
                "description": "โซนเมืองมีทางเดินเลียบโขงเหมาะกับเดิน/ปั่น",
                "warpUrl": "",
                "logoText": "🚲",
                "color": "#22c55e"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - บึงกาฬ (รถทัวร์)",
                "type": "coach",
                "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
                "from": "กรุงเทพฯ",
                "to": "บึงกาฬ (บขส.บึงกาฬ)",
                "via": [
                    "สระบุรี",
                    "นครราชสีมา",
                    "ขอนแก่น",
                    "อุดรธานี"
                ],
                "departureTimes": [
                    "07:00",
                    "10:00",
                    "20:00"
                ],
                "duration": "11-13 ชม.",
                "baseFare": 880,
                "frequency": "วันละหลายเที่ยว",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 2: อุดรธานี - บึงกาฬ (รถตู้/รถบัส)",
                "type": "van",
                "operator": "คิวรถตู้สายอุดรฯ-บึงกาฬ",
                "from": "อุดรธานี",
                "to": "บึงกาฬ",
                "via": [
                    "หนองคาย (บางเที่ยว)"
                ],
                "departureTimes": [
                    "07:00",
                    "09:00",
                    "11:00",
                    "13:00",
                    "15:00"
                ],
                "duration": "2.5-3.5 ชม.",
                "baseFare": 180,
                "frequency": "ประมาณทุก 1 ชม.",
                "terminal": "สถานีขนส่งผู้โดยสารอุดรธานี",
                "notes": null
            },
            {
                "name": "สาย 3: เมืองบึงกาฬ - ภูทอก",
                "type": "van",
                "operator": "รถตู้ท้องถิ่น/เหมารถ",
                "from": "บึงกาฬ (ตัวเมือง)",
                "to": "ภูทอก",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "10:00",
                    "13:00"
                ],
                "duration": "45-75 นาที",
                "baseFare": 120,
                "frequency": "เที่ยวจำกัด/เหมารถสะดวก",
                "terminal": "จุดนัดหมายในเมือง",
                "notes": "เส้นทางขึ้นภูมีช่วงชัน ควรไปเช้า"
            },
            {
                "name": "สาย 4: เมืองบึงกาฬ - บึงโขงหลง/ถ้ำนาคา",
                "type": "van",
                "operator": "รถตู้ท้องถิ่น/เหมารถ",
                "from": "บึงกาฬ (ตัวเมือง)",
                "to": "บึงโขงหลง",
                "via": [],
                "departureTimes": [
                    "08:30",
                    "11:00",
                    "14:00"
                ],
                "duration": "1.5-2.5 ชม.",
                "baseFare": 200,
                "frequency": "เหมาวันสะดวก",
                "terminal": "จุดนัดหมายในเมือง",
                "notes": "ช่วงท่องเที่ยวถ้ำนาคาแนะนำจองรถล่วงหน้า"
            }
        ],
        "localFoods": [
            {
                "name": "หมกหม้อปลาน้ำโขง",
                "priceRange": "120-250฿",
                "category": "local",
                "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
            },
            {
                "name": "สับปะรดบึงกาฬ (ผลไม้ GI)",
                "priceRange": "40-120฿",
                "category": "dessert",
                "note": "สับปะรดพันธุ์ปัตตาเวียที่ขึ้นทะเบียน GI"
            },
            {
                "name": "จิ้มจุ่มปลาแม่น้ำโขง/ปลาแม่น้ำลวกจิ้ม",
                "priceRange": "180-450฿",
                "category": "local",
                "note": "เมนูปลาแม่น้ำโขงที่ถูกแนะนำในบทความท่องเที่ยวบึงกาฬ"
            },
            {
                "name": "แหนมบึงกาฬ (ของฝาก)",
                "priceRange": "60-180฿",
                "category": "local",
                "note": "มีร้านของฝากชื่อดังหลายเจ้าในจังหวัด"
            },
            {
                "name": "อาหารอีสานรสจัด (ลาบ/น้ำตก/ส้มตำ) โซนริมโขง",
                "priceRange": "50-150฿",
                "category": "street",
                "note": "นิยมในร้านอาหารริมฝั่งโขง"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "450-1,000฿/คืน",
                "examples": [
                    "Century Grand Hotel",
                    "Thorsangpruksa Hotel",
                    "Finn Hotel"
                ],
                "bookingUrl": "https://www.booking.com/region/th/bueng-kan.th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,000-2,000฿/คืน",
                "examples": [
                    "The One Hotel",
                    "Kongkhamkoon Hotel",
                    "ชมวิว บึงโขงหลง"
                ],
                "bookingUrl": "https://www.booking.com/region/th/bueng-kan.th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2,000-4,500฿/คืน",
                "examples": [
                    "The One Hotel",
                    "LAKE HOUSE Naka Cave"
                ],
                "bookingUrl": "https://www.booking.com/region/th/bueng-kan.th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "เส้นทางเดินเขา/หน้าผา (ภูทอก-ถ้ำนาคา)",
                "severity": "high",
                "note": "ทางเดินบางช่วงชันและลื่น ควรใส่รองเท้ากันลื่นและทำตามคำแนะนำเจ้าหน้าที่",
                "season": null
            },
            {
                "label": "ฝนตกหนัก น้ำป่าไหลหลาก/ทางน้ำตก",
                "severity": "high",
                "note": "ฤดูฝนอาจเกิดน้ำป่าและเส้นทางปิดชั่วคราว",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "กระแสน้ำแม่น้ำโขง/ระดับน้ำผันผวน",
                "severity": "medium",
                "note": "กิจกรรมริมน้ำควรระมัดระวังเป็นพิเศษช่วงน้ำหลาก",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "PM2.5 จากการเผาในที่โล่ง",
                "severity": "medium",
                "note": "ปลายหนาว-หน้าแล้งฝุ่นสูงได้",
                "season": "ธ.ค.-เม.ย."
            }
        ],
        "ecoIds": [
                "fl_yangna",
                "fl_rattan",
                "f_wild_elephant",
                "f_green_pigeon",
                "t_wetland_mountain_mix",
                "c_pm25_dry",
                "h_mekong_flood",
                "h_forest_fire"
        ],
        "newEcoEntities": [
                { id: "fl_yangna", name: "ยางนา", category: "flora", tags: ["common"], desc: "ยางนาเป็นไม้สำคัญที่พบในป่าดิบแล้งของภูวัว สะท้อนความสมบูรณ์ของผืนป่าฝั่งโขง." },
                { id: "fl_rattan", name: "หวายป่า", category: "flora", tags: ["common","danger"], desc: "หวายเป็นไม้พื้นล่างสำคัญในผืนป่าชื้นของภูวัว มีหนามและอาจเกี่ยวเสื้อผ้าหรือผิวหนังได้ง่าย." },
                { id: "f_wild_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","rare","protected"], desc: "มีข้อมูลรายงานช้างป่าในผืนป่าภูวัว ไม่ควรเข้าใกล้หรือเดินนอกเส้นทางในพื้นที่ป่าอนุรักษ์." },
                { id: "f_green_pigeon", name: "นกเขาเขียว", category: "fauna", tags: ["common","protected"], desc: "มีรายงานการพบในชุดข้อมูลความหลากชนิดสัตว์ป่าของภูวัว เป็นนกประจำป่าที่พบได้ในพื้นที่ไม้ผลและป่าโปร่ง." },
                { id: "t_wetland_mountain_mix", name: "บึงโขงหลงและภูเขาฝั่งโขง", category: "terrain", tags: ["common"], desc: "บึงกาฬมีภูมิประเทศเด่นทั้งพื้นที่ชุ่มน้ำขนาดใหญ่ แม่น้ำโขง และเขาหินทราย/ป่าภูเขาใกล้กัน." },
                { id: "c_pm25_dry", name: "ฝุ่น PM2.5 ฤดูแล้ง", category: "climate", tags: ["danger","common","seasonal"], desc: "บึงกาฬมีช่วงเสี่ยงฝุ่นสะสมในฤดูแล้งเช่นเดียวกับอีสานตอนบน โดยเฉพาะเมื่อการระบายอากาศไม่ดี." },
                { id: "h_mekong_flood", name: "น้ำท่วมเลียบโขงและบึงโขงหลง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "แนวโขงและพื้นที่ลุ่มรอบบึงมีโอกาสเกิดน้ำท่วมขังและการสัญจรถูกตัดขาดในช่วงน้ำสูง." },
                { id: "h_forest_fire", name: "ไฟป่าพื้นที่ป่าเขา", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ป่าโปร่งและป่าเต็งรังในบึงกาฬเสี่ยงไฟป่าในฤดูแล้ง ซึ่งมักสัมพันธ์กับหมอกควันและทัศนวิสัยต่ำ." }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 15-39°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.",
            "terrain": "จังหวัดใหม่ริมโขง มีภูเขา น้ำตก และป่าดงดิบ (เช่น ภูวัว) สลับพื้นที่เมืองและเกษตร",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "หินสามวาฬ",
                "content": "แลนด์มาร์คหลัก ต้องเดินขึ้นเขา",
                "type": "route"
            },
            {
                "title": "ธรรมชาติอุดมสมบูรณ์",
                "content": "มีน้ำตกและภูเขาหลายแห่ง",
                "type": "culture"
            },
            {
                "title": "พื้นที่ห่างไกล",
                "content": "บางจุดไม่มีสัญญาณมือถือ",
                "type": "safety"
            },
            {
                "title": "อากาศร้อนชื้น",
                "content": "ควรเตรียมน้ำ",
                "type": "season"
            },
            {
                "title": "ถนนระยะไกล",
                "content": "ปั๊มน้ำมันห่างกัน",
                "type": "route"
            }
        ],
        "supplyPoints": [
            {
                "type": "gas",
                "label": "ปั๊มหลักในเมือง",
                "area": "ตัวเมือง",
                "note": "ควรเติมก่อนออกนอกเมือง",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มตามทางหลวง",
                "area": "เส้นหลัก",
                "note": "ระยะห่างพอสมควร",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคาร",
                "area": "เมือง",
                "note": "มีจำกัด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำจุดท่องเที่ยว",
                "area": "อุทยาน",
                "note": "มีแต่ไม่มาก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านยา",
                "area": "เมือง",
                "note": "มีไม่เยอะ",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจ",
                "area": "เมือง",
                "note": "ติดต่อได้",
                "openHours": "24 ชม.",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "Nong Khai",
                "Udon Thani"
            ],
            "commonDestinations": [
                "Hin Sam Wan",
                "Phu Sing",
                "Nakhon Phanom"
            ],
            "transitHubs": [
                "Bus Terminal",
                "City Center"
            ],
            "routeNotes": [
                "เส้นทางยาว ต้องวางแผนน้ำมัน",
                "บางพื้นที่เป็นภูเขา",
                "สัญญาณมือถือไม่ครอบคลุม"
            ]
        }
    }
};
