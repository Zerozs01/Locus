// Portal seed data: ภาคอีสานบน Part 1 (5 จังหวัด)
// Source: documents/deepreserach/part3_ภาคอีสานบน.md
import type { ProvincePortalSeedData } from './db';

export const isanUpper1: Record<string, ProvincePortalSeedData> = {
    "Khon Kaen": {
        "transport": [
            {
                "name": "สนามบินขอนแก่น",
                "shortName": "สนามบิน",
                "type": "plane",
                "description": "สนามบินภายในประเทศ ใช้ต่อเครื่องบินจากกรุงเทพฯได้สะดวก",
                "warpUrl": "https://www.airports.go.th/",
                "logoText": "✈️",
                "color": "#ef4444"
            },
            {
                "name": "รถไฟทางไกลสายตะวันออกเฉียงเหนือ (สถานีขอนแก่น)",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "มีขบวนรถไฟจากกรุงเทพฯและเมืองหลักตามแนวสายอีสาน",
                "warpUrl": "https://www.railway.co.th/",
                "logoText": "🚆",
                "color": "#1f2937"
            },
            {
                "name": "รถโดยสารประจำทาง/รถซิตี้บัสเมืองขอนแก่น",
                "shortName": "รถบัส",
                "type": "bus",
                "description": "ใช้เดินทางในตัวเมืองและเชื่อมจุดสำคัญ เช่น มหาวิทยาลัย-ห้าง-สถานีขนส่ง",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#3b82f6"
            },
            {
                "name": "รถสองแถวในตัวเมืองขอนแก่น",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "วิ่งตามสายหลักในเมืองและบางอำเภอ เหมาะกับเที่ยวระยะสั้น",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถตุ๊กตุ๊ก/สามล้อเครื่องในเมืองขอนแก่น",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "เรียกใช้ได้ตามย่านชุมชน ต่อรองราคา/กดมิเตอร์ตามพื้นที่",
                "warpUrl": "",
                "logoText": "🛺",
                "color": "#a855f7"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - ขอนแก่น (เครื่องบิน)",
                "type": "plane",
                "operator": "Thai AirAsia / Thai Vietjet / Thai Lion Air (ตามฤดูกาล)",
                "from": "กรุงเทพฯ (DMK/BKK)",
                "to": "ขอนแก่น (KKC)",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "11:30",
                    "19:00"
                ],
                "duration": "1 ชม. 00-15 นาที",
                "baseFare": 1200,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สนามบินดอนเมือง/สุวรรณภูมิ",
                "notes": "ตารางบินและสายการบินเปลี่ยนได้บ่อย ให้ตรวจสอบก่อนจอง"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - ขอนแก่น (รถทัวร์)",
                "type": "coach",
                "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
                "from": "กรุงเทพฯ",
                "to": "ขอนแก่น (บขส.3)",
                "via": [
                    "สระบุรี",
                    "นครราชสีมา"
                ],
                "departureTimes": [
                    "07:00",
                    "10:00",
                    "20:30"
                ],
                "duration": "6-7 ชม.",
                "baseFare": 520,
                "frequency": "ประมาณทุก 1-2 ชม.",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 3: กรุงเทพฯ - ขอนแก่น (รถไฟ)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย (SRT)",
                "from": "กรุงเทพฯ (สถานีกลางกรุงเทพอภิวัฒน์)",
                "to": "ขอนแก่น (สถานีขอนแก่น)",
                "via": [
                    "สระบุรี",
                    "นครราชสีมา"
                ],
                "departureTimes": [
                    "08:45",
                    "20:30"
                ],
                "duration": "7-9 ชม.",
                "baseFare": 300,
                "frequency": "หลายขบวน/วัน",
                "terminal": "สถานีกลางกรุงเทพอภิวัฒน์",
                "notes": "ราคา/เวลาขึ้นกับชั้นรถและขบวน"
            },
            {
                "name": "สาย 4: เมืองขอนแก่น - ภูเวียง/พิพิธภัณฑ์ไดโนเสาร์ภูเวียง",
                "type": "bus",
                "operator": "รถโดยสารท้องถิ่น/คิวรถ บขส.ขอนแก่น",
                "from": "ขอนแก่น (บขส.3)",
                "to": "อ.ภูเวียง",
                "via": [],
                "departureTimes": [
                    "07:30",
                    "10:00",
                    "13:30"
                ],
                "duration": "1.5-2 ชม.",
                "baseFare": 70,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งผู้โดยสาร จ.ขอนแก่น แห่งที่ 3",
                "notes": "เหมาะต่อไปพิพิธภัณฑ์/แหล่งไดโนเสาร์ ควรถามรอบสุดท้ายที่คิวรถ"
            }
        ],
        "localFoods": [
            {
                "name": "ปลาแดกบองสมุนไพร",
                "priceRange": "40-80฿",
                "category": "local",
                "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
            },
            {
                "name": "ไก่ย่างเขาสวนกวาง",
                "priceRange": "120-220฿",
                "category": "local",
                "note": "ของขึ้นชื่อขอนแก่น มีงานเทศกาลไก่ย่างเขาสวนกวาง"
            },
            {
                "name": "ส้มตำปลาร้าขอนแก่น (แนวปลาร้าเข้ม)",
                "priceRange": "40-70฿",
                "category": "street",
                "note": "นิยมกินคู่ไก่ย่าง/ลาบ"
            },
            {
                "name": "ลาบหมู/ลาบเป็ดแบบอีสาน (ข้าวคั่วหอม)",
                "priceRange": "50-100฿",
                "category": "street",
                "note": null
            },
            {
                "name": "ข้าวจี่ (ข้าวเหนียวย่างทาไข่)",
                "priceRange": "15-30฿",
                "category": "street",
                "note": "พบมากช่วงหน้าหนาวและงานวัด"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "450-900฿/คืน",
                "examples": [
                    "HOP INN Khon Kaen",
                    "Khonkaen Residence",
                    "Family Hotel Khon Kaen"
                ],
                "bookingUrl": "https://www.booking.com/city/th/khon-kaen.th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "900-1,900฿/คืน",
                "examples": [
                    "Kosa Hotel",
                    "Le cassia Hotel",
                    "The Cotton Tree Hometel"
                ],
                "bookingUrl": "https://www.booking.com/city/th/khon-kaen.th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2,000-4,500฿/คืน",
                "examples": [
                    "Avani Khon Kaen Hotel & Convention Centre",
                    "The Heritage Grand Khon Kaen Hotel and Convention"
                ],
                "bookingUrl": "https://www.booking.com/city/th/khon-kaen.th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
                "severity": "medium",
                "note": "ช่วงหน้าร้อนอีสานอุณหภูมิสูง ควรดื่มน้ำและหลบแดด",
                "season": "มี.ค.-พ.ค."
            },
            {
                "label": "พายุฤดูร้อน ฟ้าผ่า/ลมกระโชกแรง",
                "severity": "medium",
                "note": "ช่วงเปลี่ยนฤดูมักมีฝนฟ้าคะนองฉับพลัน",
                "season": "มี.ค.-พ.ค."
            },
            {
                "label": "น้ำท่วมขัง/น้ำหลากตามลำน้ำและพื้นที่ลุ่ม",
                "severity": "medium",
                "note": "ฤดูฝนมีโอกาสเกิดน้ำท่วมขังและน้ำป่าในบางอำเภอ",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "PM2.5 จากการเผาในที่โล่ง",
                "severity": "medium",
                "note": "ช่วงปลายหนาว-หน้าแล้งคุณภาพอากาศแย่ได้",
                "season": "ธ.ค.-เม.ย."
            }
        ],
        "ecoIds": [
                "fl_mango_banhaet",
                "fl_bamboo_phuphaman",
                "f_waterbird_ubolrat",
                "f_bat_phuphaman",
                "t_chi_pong_basin",
                "c_pm25_dry",
                "h_flood_ubolrat",
                "h_summer_storm"
        ],
        "newEcoEntities": [
                { id: "fl_mango_banhaet", name: "มะม่วงน้ำดอกไม้สีทองบ้านแฮด", category: "flora", tags: ["common","edible","seasonal"], desc: "พืชเศรษฐกิจ GI ของจังหวัดขอนแก่น พบเด่นในพื้นที่เกษตรตอนล่างของจังหวัด กินได้และพบจริงในชุมชนเกษตร." },
                { id: "fl_bamboo_phuphaman", name: "ไผ่ป่าภูผาม่าน", category: "flora", tags: ["common","edible"], desc: "พื้นที่ภูผาม่านมีป่าไผ่หนาแน่นตามแนวภูเขาหินปูน หน่ออ่อนกินได้แต่ควรเก็บจากแหล่งที่ได้รับอนุญาตเท่านั้น." },
                { id: "f_waterbird_ubolrat", name: "นกน้ำอ่างเก็บน้ำอุบลรัตน์", category: "fauna", tags: ["common","protected","seasonal"], desc: "บริเวณอ่างเก็บน้ำและริมเขื่อนมีฝูงนกน้ำจำนวนมากในบางช่วง โดยเฉพาะพื้นที่เปิดโล่งริมแหล่งน้ำ." },
                { id: "f_bat_phuphaman", name: "ค้างคาวถ้ำภูผาม่าน", category: "fauna", tags: ["common","danger","protected"], desc: "พื้นที่หินปูนและถ้ำของภูผาม่านเหมาะกับค้างคาวหลายชนิด ไม่ควรรบกวนฝูงหรือเข้าใกล้จุดเกาะพักตอนพลบค่ำ." },
                { id: "t_chi_pong_basin", name: "ลุ่มน้ำชี-น้ำพองและที่ราบลูกคลื่น", category: "terrain", tags: ["common"], desc: "ขอนแก่นมีที่ราบลูกคลื่นและพื้นที่ลาดเอียงจากตะวันตกไปตะวันออก เชื่อมกับลุ่มน้ำหลักของจังหวัด." },
                { id: "c_pm25_dry", name: "ฝุ่น PM2.5 ฤดูแล้ง", category: "climate", tags: ["danger","common","seasonal"], desc: "ปลายหนาวถึงต้นร้อนมักเสี่ยงฝุ่นสะสมจากการเผาในที่โล่งและการระบายอากาศไม่ดี ควรติดตามค่าฝุ่นก่อนทำกิจกรรมกลางแจ้ง." },
                { id: "h_flood_ubolrat", name: "น้ำท่วมลุ่มน้ำพอง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "พื้นที่รับน้ำตามลุ่มน้ำพองและท้ายเขื่อนมีความเสี่ยงน้ำหลากและน้ำท่วมขังในช่วงฝนหนัก." },
                { id: "h_summer_storm", name: "พายุฤดูร้อน", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ช่วงเปลี่ยนฤดูมีโอกาสเกิดลมกระโชกแรง ฝนฟ้าคะนอง และลูกเห็บบางพื้นที่ ควรหลีกเลี่ยงที่โล่งและสิ่งปลูกสร้างไม่มั่นคง." }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 17-38°C, ร้อนจัดปลายก.พ.-พ.ค., ฝนพ.ค.-ต.ค., เย็นสบายต.ค.-ก.พ.",
            "terrain": "ที่ราบสูงอีสานสลับพื้นที่ชุมชนใหญ่ มีอ่างเก็บน้ำ/เขื่อนและป่า-ภูเขาบางส่วน",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "อากาศร้อนจัด",
                "content": "ช่วงมี.ค.-พ.ค. อุณหภูมิสูงมาก ควรเตรียมน้ำและเลี่ยงเดินกลางวัน",
                "type": "season"
            },
            {
                "title": "เมืองศูนย์กลางอีสาน",
                "content": "เป็น hub ใหญ่ เดินทางต่อจังหวัดอื่นสะดวก รถและคนค่อนข้างหนาแน่น",
                "type": "route"
            },
            {
                "title": "อาหารขึ้นชื่อ",
                "content": "ลองลาบ ก้อย และไก่ย่างเขาสวนกวาง รสจัดและราคาย่อมเยา",
                "type": "food"
            },
            {
                "title": "จราจรในเมือง",
                "content": "ช่วงชั่วโมงเร่งด่วนรถติดบริเวณถนนมิตรภาพและรอบมหาวิทยาลัย",
                "type": "route"
            },
            {
                "title": "ประเพณีบุญบั้งไฟ",
                "content": "ช่วงพ.ค.-มิ.ย. มีงานบุญ ควรตรวจวันจัดงานก่อนเดินทาง",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "gas",
                "label": "ปั๊มบนถนนมิตรภาพ",
                "area": "เมืองขอนแก่น",
                "note": "มีหลายแบรนด์ต่อเนื่อง",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารในห้าง",
                "area": "Central Khon Kaen",
                "note": "รวมหลายธนาคาร",
                "openHours": "10:30-20:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะห้าง",
                "area": "ห้างหลักในเมือง",
                "note": "สะอาด",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในเมือง",
                "area": "รอบ รพ.ศรีนครินทร์",
                "note": "หาง่าย",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจเมือง",
                "area": "ตัวเมือง",
                "note": "รองรับนักท่องเที่ยว",
                "openHours": "24 ชม.",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "Bangkok",
                "Nakhon Ratchasima",
                "Udon Thani"
            ],
            "commonDestinations": [
                "Udon Thani",
                "Kalasin",
                "Loei",
                "Chaiyaphum",
                "Maha Sarakham"
            ],
            "transitHubs": [
                "Khon Kaen Bus Terminal",
                "Khon Kaen Airport",
                "Khon Kaen Railway Station"
            ],
            "routeNotes": [
                "ถนนมิตรภาพเป็นเส้นหลัก",
                "เลี่ยงเข้าเมืองช่วงเย็น",
                "มีรถทัวร์และเครื่องบินเชื่อมหลายเส้น"
            ]
        }
    },
    "Udon Thani": {
        "transport": [
            {
                "name": "ท่าอากาศยานนานาชาติอุดรธานี",
                "shortName": "สนามบิน",
                "type": "plane",
                "description": "สนามบินหลักของอุดรธานี มีเที่ยวบินตรงจากกรุงเทพฯหลายเที่ยว",
                "warpUrl": "https://www.airports.go.th/",
                "logoText": "✈️",
                "color": "#ef4444"
            },
            {
                "name": "รถไฟทางไกลสายตะวันออกเฉียงเหนือ (สถานีอุดรธานี)",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "มีขบวนรถไฟจากกรุงเทพฯผ่านขอนแก่นขึ้นมาอุดรฯ",
                "warpUrl": "https://www.railway.co.th/",
                "logoText": "🚆",
                "color": "#1f2937"
            },
            {
                "name": "รถสองแถว/รถโดยสารในตัวเมืองอุดรธานี",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "เดินทางในเมืองและต่อไปจุดสำคัญ เช่น บขส.-ตลาด-ย่านท่องเที่ยว",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถตุ๊กตุ๊กอุดรธานี",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "พบมากในเมือง เรียกง่าย เหมาะระยะสั้น",
                "warpUrl": "",
                "logoText": "🛺",
                "color": "#a855f7"
            },
            {
                "name": "รถตู้คิวอำเภอ/รถมินิบัส",
                "shortName": "รถตู้",
                "type": "van",
                "description": "เชื่อมอำเภอสำคัญและจังหวัดใกล้เคียง เช่น หนองคาย บึงกาฬ",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#06b6d4"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - อุดรธานี (เครื่องบิน)",
                "type": "plane",
                "operator": "Thai Vietjet / Thai AirAsia / Nok Air (ตามฤดูกาล)",
                "from": "กรุงเทพฯ (DMK/BKK)",
                "to": "อุดรธานี (UTH)",
                "via": [],
                "departureTimes": [
                    "06:30",
                    "12:00",
                    "19:30"
                ],
                "duration": "1 ชม. 05-20 นาที",
                "baseFare": 1300,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สนามบินดอนเมือง/สุวรรณภูมิ",
                "notes": "สายการบิน/ความถี่อาจเปลี่ยนตามฤดูกาล"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - อุดรธานี (รถทัวร์)",
                "type": "coach",
                "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
                "from": "กรุงเทพฯ",
                "to": "อุดรธานี (บขส.อุดร)",
                "via": [
                    "สระบุรี",
                    "นครราชสีมา",
                    "ขอนแก่น"
                ],
                "departureTimes": [
                    "07:00",
                    "10:30",
                    "20:00"
                ],
                "duration": "8-9 ชม.",
                "baseFare": 650,
                "frequency": "ประมาณทุก 1-2 ชม.",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 3: กรุงเทพฯ - อุดรธานี (รถไฟ)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย (SRT)",
                "from": "กรุงเทพฯ (สถานีกลางกรุงเทพอภิวัฒน์)",
                "to": "อุดรธานี (สถานีอุดรธานี)",
                "via": [
                    "สระบุรี",
                    "นครราชสีมา",
                    "ขอนแก่น"
                ],
                "departureTimes": [
                    "08:45",
                    "20:30"
                ],
                "duration": "9-11 ชม.",
                "baseFare": 350,
                "frequency": "หลายขบวน/วัน",
                "terminal": "สถานีกลางกรุงเทพอภิวัฒน์",
                "notes": "ราคา/เวลาขึ้นกับชั้นรถและขบวน"
            },
            {
                "name": "สาย 4: เมืองอุดรธานี - หนองคาย (รถตู้/รถบัส)",
                "type": "van",
                "operator": "คิวรถตู้/มินิบัสสายอุดรฯ-หนองคาย",
                "from": "อุดรธานี (บขส./คิวรถตู้)",
                "to": "หนองคาย (ตัวเมือง/ท่ารถ)",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "09:00",
                    "11:00",
                    "13:00",
                    "15:00"
                ],
                "duration": "1-1.5 ชม.",
                "baseFare": 80,
                "frequency": "ประมาณทุก 30-60 นาที",
                "terminal": "สถานีขนส่งผู้โดยสารอุดรธานี",
                "notes": null
            },
            {
                "name": "สาย 5: เมืองอุดรธานี - บ้านเชียง",
                "type": "bus",
                "operator": "รถสองแถว/รถตู้ท้องถิ่น",
                "from": "อุดรธานี (ตัวเมือง)",
                "to": "พิพิธภัณฑ์บ้านเชียง (อ.หนองหาน)",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "10:00",
                    "14:00"
                ],
                "duration": "40-60 นาที",
                "baseFare": 40,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "คิวรถท้องถิ่นในเมือง/สถานีขนส่ง",
                "notes": "ควรถามจุดขึ้นที่แน่นอนในวันเดินทาง"
            }
        ],
        "localFoods": [
            {
                "name": "ข้าวต้มมัดบัวแดง (อ.เมืองอุดรธานี)",
                "priceRange": "25-60฿",
                "category": "dessert",
                "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
            },
            {
                "name": "แหนมเนือง (สายอุดรฯ)",
                "priceRange": "180-350฿",
                "category": "local",
                "note": "เมืองอุดรมีอาหารเวียดนาม-ไทยชื่อดัง เช่น แหนมเนือง"
            },
            {
                "name": "เฝอ/ก๋วยจั๊บญวนใส่หมูยอ",
                "priceRange": "60-120฿",
                "category": "street",
                "note": "เส้นนุ่ม น้ำซุปหอมแบบเวียดนาม"
            },
            {
                "name": "ไข่กระทะ",
                "priceRange": "40-80฿",
                "category": "street",
                "note": "อาหารเช้าสไตล์เวียดนาม-อีสาน พบได้ทั่วเมือง"
            },
            {
                "name": "มะม่วงน้ำดอกไม้/กล้วยหอมทองอุดร (ผลไม้ท้องถิ่น)",
                "priceRange": "40-120฿",
                "category": "dessert",
                "note": "มีการพูดถึงเป็นสินค้า GI/ของดีในพื้นที่"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "450-900฿/คืน",
                "examples": [
                    "City Inn Udonthani",
                    "B2 Udon Thani Boutique & Budget Hotel",
                    "Hotel MOCO"
                ],
                "bookingUrl": "https://www.booking.com/city/th/udon-thani.th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "900-1,900฿/คืน",
                "examples": [
                    "The Pannarai Hotel",
                    "At Home at Udon",
                    "Prajaktra Design Hotel"
                ],
                "bookingUrl": "https://www.booking.com/city/th/udon-thani.th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2,000-4,500฿/คืน",
                "examples": [
                    "Centara Udon",
                    "De Princess Hotel Udonthani"
                ],
                "bookingUrl": "https://www.booking.com/city/th/udon-thani.th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
                "severity": "medium",
                "note": "ช่วงหน้าร้อนอีสานแดดแรง เหมาะพกน้ำและกันแดด",
                "season": "มี.ค.-พ.ค."
            },
            {
                "label": "PM2.5 จากการเผาในที่โล่ง",
                "severity": "medium",
                "note": "ปลายหนาว-หน้าแล้งมีโอกาสฝุ่นสูง",
                "season": "ธ.ค.-เม.ย."
            },
            {
                "label": "ฝนตกหนัก น้ำท่วมขังในเขตเมือง/พื้นที่ลุ่ม",
                "severity": "medium",
                "note": "ฤดูฝนมีน้ำท่วมขังได้เป็นช่วง ๆ",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "อุบัติเหตุบนถนนช่วงเทศกาล",
                "severity": "medium",
                "note": "ช่วงเดินทางหนาแน่นควรเผื่อเวลาและหลีกเลี่ยงขับกลางคืน",
                "season": "เม.ย., ธ.ค.-ม.ค."
            }
        ],
        "ecoIds": [
                "fl_red_lotus",
                "fl_reed_wetland",
                "f_ruddy_duck",
                "f_waterbird_migratory",
                "t_nonghan_wetland",
                "c_pm25_dry",
                "h_wetland_flood",
                "h_summer_storm"
        ],
        "newEcoEntities": [
                { id: "fl_red_lotus", name: "บัวแดง", category: "flora", tags: ["common","edible","seasonal"], desc: "พืชน้ำเด่นของหนองหานกุมภวาปี สร้างภูมิทัศน์ทะเลบัวแดงที่มีชื่อเสียงและเป็นส่วนหนึ่งของระบบนิเวศพื้นที่ชุ่มน้ำ." },
                { id: "fl_reed_wetland", name: "กกและพืชน้ำชายบึง", category: "flora", tags: ["common"], desc: "พืชน้ำและพืชชายน้ำช่วยยึดตะกอนและเป็นแหล่งหลบอาศัยของสัตว์น้ำและนกน้ำในพื้นที่ชุ่มน้ำขนาดใหญ่." },
                { id: "f_ruddy_duck", name: "เป็ดแดง", category: "fauna", tags: ["common","protected","seasonal"], desc: "เป็นหนึ่งในนกน้ำที่มีรายงานพบจำนวนมากในพื้นที่ทะเลบัวแดงช่วงฤดูหนาว เหมาะกับการดูนกมากกว่าการเข้าใกล้." },
                { id: "f_waterbird_migratory", name: "นกน้ำอพยพ", category: "fauna", tags: ["common","protected","seasonal"], desc: "พื้นที่ชุ่มน้ำอุดรธานีเป็นจุดพักของนกอพยพหลายชนิดในฤดูหนาว สะท้อนความสำคัญทางนิเวศของบึงขนาดใหญ่." },
                { id: "t_nonghan_wetland", name: "พื้นที่ชุ่มน้ำหนองหานกุมภวาปี", category: "terrain", tags: ["common"], desc: "เป็นพื้นที่ชุ่มน้ำสำคัญระดับนานาชาติและเป็นแหล่งน้ำขนาดใหญ่ของภาคอีสานตอนบน." },
                { id: "c_pm25_dry", name: "ฝุ่น PM2.5 ฤดูแล้ง", category: "climate", tags: ["danger","common","seasonal"], desc: "อุดรธานีมักมีช่วงค่าฝุ่นสูงในปลายหนาวถึงต้นร้อนจากสภาพอากาศนิ่งและการเผาในที่โล่ง." },
                { id: "h_wetland_flood", name: "น้ำท่วมพื้นที่ลุ่มรอบหนองหาน", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนสะสมและน้ำหลากอาจกระทบพื้นที่รอบบึงและแปลงเกษตรลุ่มต่ำ โดยเฉพาะช่วงฝนหนักต่อเนื่อง." },
                { id: "h_summer_storm", name: "พายุฤดูร้อน", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ช่วงเปลี่ยนฤดูมีความเสี่ยงลมแรง ฝนฟ้าคะนอง และฟ้าผ่า ควรหลีกเลี่ยงพื้นที่โล่งและต้นไม้ใหญ่." }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 16-39°C, ร้อนจัดปลายก.พ.-พ.ค., ฝนพ.ค.-ต.ค., เย็นสบายต.ค.-ก.พ.",
            "terrain": "ที่ราบสูงสลับป่าเขา/หน้าผาและถ้ำในบางพื้นที่ เมืองศูนย์กลางการค้า-คมนาคมอีสานตอนบน",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "ประตูสู่อีสานเหนือ",
                "content": "ใช้เป็นฐานไปหนองคายและลาวได้สะดวก",
                "type": "route"
            },
            {
                "title": "คำชะโนด",
                "content": "สถานที่ศักดิ์สิทธิ์ ควรแต่งกายสุภาพ",
                "type": "culture"
            },
            {
                "title": "อากาศหนาว",
                "content": "ช่วงธ.ค.-ม.ค. อากาศเย็นกว่าภาคอื่น",
                "type": "season"
            },
            {
                "title": "อาหารเวียดนาม",
                "content": "มีอาหารเวียดนามจำนวนมากในเมือง",
                "type": "food"
            },
            {
                "title": "ตลาดกลางคืน",
                "content": "UD Town มีของกินและช้อปปิ้งครบ",
                "type": "budget"
            }
        ],
        "supplyPoints": [
            {
                "type": "gas",
                "label": "ปั๊มถนนมิตรภาพ",
                "area": "เข้าเมือง",
                "note": "มีตลอดทาง",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารใน UD Town",
                "area": "ใจกลางเมือง",
                "note": "สะดวก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำตลาด",
                "area": "UD Town",
                "note": "ใช้ได้",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "คลินิกเอกชน",
                "area": "ตัวเมือง",
                "note": "มีหลายแห่ง",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "Bangkok",
                "Khon Kaen"
            ],
            "commonDestinations": [
                "Nong Khai",
                "Sakon Nakhon",
                "Loei"
            ],
            "transitHubs": [
                "Udon Thani Airport",
                "Bus Terminal 1",
                "Railway Station"
            ],
            "routeNotes": [
                "เป็น hub ไปลาว",
                "ถนนหลักเดินทางง่าย"
            ]
        }
    },
    "Nong Khai": {
        "transport": [
            {
                "name": "รถไฟทางไกลสายตะวันออกเฉียงเหนือ (สถานีหนองคาย)",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "ปลายทางสายอีสานตอนบน ใช้เดินทางจากกรุงเทพฯและเชื่อมต่อพื้นที่ชายแดน",
                "warpUrl": "https://www.railway.co.th/",
                "logoText": "🚆",
                "color": "#1f2937"
            },
            {
                "name": "รถสองแถวในตัวเมืองหนองคาย",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "วิ่งรับส่งในเมืองและไปจุดสำคัญ เช่น ตลาดท่าเสด็จ-ด่านชายแดน",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถตุ๊กตุ๊กหนองคาย",
                "shortName": "ตุ๊กตุ๊ก",
                "type": "tuk_tuk",
                "description": "ใช้เดินทางระยะสั้นในเมือง โดยเฉพาะย่านท่องเที่ยวริมโขง",
                "warpUrl": "",
                "logoText": "🛺",
                "color": "#a855f7"
            },
            {
                "name": "รถตู้/รถบัสเชื่อมอุดรธานี-หนองคาย",
                "shortName": "รถตู้",
                "type": "van",
                "description": "วิ่งถี่ เหมาะสำหรับต่อการเดินทางจากสนามบินอุดรฯ",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#06b6d4"
            },
            {
                "name": "เรือนำเที่ยวแม่น้ำโขง (บางฤดูกาล)",
                "shortName": "เรือ",
                "type": "boat",
                "description": "ล่องชมวิวแม่น้ำโขง/จุดชมพระอาทิตย์ตก (ขึ้นกับฤดูกาลและระดับน้ำ)",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#0ea5e9"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - หนองคาย (รถไฟด่วน/ด่วนพิเศษ)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย (SRT)",
                "from": "กรุงเทพฯ (สถานีกลางกรุงเทพอภิวัฒน์)",
                "to": "หนองคาย (สถานีหนองคาย)",
                "via": [
                    "สระบุรี",
                    "นครราชสีมา",
                    "ขอนแก่น",
                    "อุดรธานี"
                ],
                "departureTimes": [
                    "08:45",
                    "20:30"
                ],
                "duration": "10-12 ชม.",
                "baseFare": 494,
                "frequency": "มีทั้งขบวนกลางวันและกลางคืน",
                "terminal": "สถานีกลางกรุงเทพอภิวัฒน์",
                "notes": "ควรตรวจสอบสถานะการเดินรถ/ตารางล่าสุดก่อนเดินทาง"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - หนองคาย (รถทัวร์)",
                "type": "coach",
                "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
                "from": "กรุงเทพฯ",
                "to": "หนองคาย (บขส.หนองคาย)",
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
                "duration": "9-10 ชม.",
                "baseFare": 720,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 3: อุดรธานี - หนองคาย (รถตู้/รถบัส)",
                "type": "van",
                "operator": "คิวรถตู้/มินิบัสสายอุดรฯ-หนองคาย",
                "from": "อุดรธานี",
                "to": "หนองคาย",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "09:00",
                    "11:00",
                    "13:00",
                    "15:00"
                ],
                "duration": "1-1.5 ชม.",
                "baseFare": 80,
                "frequency": "ประมาณทุก 30-60 นาที",
                "terminal": "สถานีขนส่งผู้โดยสารอุดรธานี",
                "notes": null
            },
            {
                "name": "สาย 4: เมืองหนองคาย - ตลาดท่าเสด็จ/ริมโขง",
                "type": "bus",
                "operator": "รถสองแถวในเมือง/รถโดยสารท้องถิ่น",
                "from": "ตัวเมืองหนองคาย",
                "to": "ตลาดท่าเสด็จ/ถนนริมโขง",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "12:00",
                    "17:00"
                ],
                "duration": "10-20 นาที",
                "baseFare": 20,
                "frequency": "วิ่งถี่ช่วงกลางวัน",
                "terminal": "จุดจอดในเมือง",
                "notes": "บางช่วงอาจเหมาจ่าย/คิดตามระยะทาง"
            }
        ],
        "localFoods": [
            {
                "name": "หลามปลาน้ำโขง",
                "priceRange": "80-150฿",
                "category": "local",
                "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
            },
            {
                "name": "แหนมเนืองหนองคาย",
                "priceRange": "180-350฿",
                "category": "local",
                "note": "มีชื่อเสียงและถูกแนะนำในเส้นทางเที่ยวหนองคาย"
            },
            {
                "name": "ปลานิลกระชังแม่น้ำโขงหนองคาย",
                "priceRange": "120-250฿",
                "category": "local",
                "note": "สินค้า GI/ของเด่นจากแม่น้ำโขง (นิยมทำเมนูเผา/ทอด/ต้มยำ)"
            },
            {
                "name": "ข้าวเปียกเส้น (ก๋วยจั๊บญวนแนวหนองคาย)",
                "priceRange": "50-100฿",
                "category": "street",
                "note": "พบมากในมื้อเช้าและร้านอาหารเวียดนาม"
            },
            {
                "name": "ไข่กระทะ",
                "priceRange": "40-80฿",
                "category": "street",
                "note": "ของเช้าขึ้นชื่อในโซนอาหารเวียดนาม-อีสาน"
            },
            {
                "name": "แผ่นกระยอ (แผ่นแป้งสำหรับปอเปี๊ยะ/แหนมเนือง)",
                "priceRange": "40-120฿",
                "category": "local",
                "note": "พื้นที่ผลิตแผ่นกระยอมีชื่อเสียงในโซนหนองคาย"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "450-1,000฿/คืน",
                "examples": [
                    "Mut Mee Garden Guest House",
                    "Bualinn Resort",
                    "Nongkhai City Hotel"
                ],
                "bookingUrl": "https://www.booking.com/city/th/nong-khai.th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,000-2,000฿/คืน",
                "examples": [
                    "Park & Pool Resort",
                    "Royal Nakhara Hotel",
                    "Klang Muang at Nongkhai Hotel"
                ],
                "bookingUrl": "https://www.booking.com/city/th/nong-khai.th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1,800-3,800฿/คืน",
                "examples": [
                    "Amanta Hotel Nongkhai",
                    "LePont Riverfront Resort Nongkhai"
                ],
                "bookingUrl": "https://www.booking.com/city/th/nong-khai.th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "กระแสน้ำ/ระดับน้ำแม่น้ำโขงเปลี่ยนเร็ว",
                "severity": "medium",
                "note": "กิจกรรมริมน้ำควรสวมชูชีพและระวังน้ำขึ้นลง",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "น้ำหลาก/น้ำท่วมริมโขง",
                "severity": "medium",
                "note": "ช่วงมรสุมอาจมีน้ำเอ่อล้นติ่งในบางพื้นที่",
                "season": "ส.ค.-ต.ค."
            },
            {
                "label": "PM2.5 จากการเผาในที่โล่ง",
                "severity": "medium",
                "note": "ปลายหนาว-หน้าแล้งคุณภาพอากาศแย่ได้",
                "season": "ธ.ค.-เม.ย."
            },
            {
                "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
                "severity": "medium",
                "note": "แดดแรงช่วงหน้าแล้ง ควรกันแดดและพักเป็นระยะ",
                "season": "มี.ค.-พ.ค."
            }
        ],
        "ecoIds": [
                "fl_makmao",
                "fl_dipterocarp",
                "f_mekong_waterbird",
                "f_snake_riverbank",
                "t_mekong_plain",
                "c_cool_dry_morning",
                "h_mekong_flood",
                "h_bank_erosion"
        ],
        "newEcoEntities": [
                { id: "fl_makmao", name: "หมากเม่า", category: "flora", tags: ["common","edible","medicinal","seasonal"], desc: "ไม้ผลท้องถิ่นของอีสานเหนือ พบในเขตภูเขาและชุมชนเกษตรบางพื้นที่ของหนองคาย ผลสุกกินได้และนิยมแปรรูป." },
                { id: "fl_dipterocarp", name: "ไม้เต็งรัง", category: "flora", tags: ["common"], desc: "ป่าเต็งรังเป็นสังคมพืชเด่นในพื้นที่เนินเขาทางตะวันตกของจังหวัด สะท้อนสภาพดินค่อนข้างแห้งและระบายน้ำดี." },
                { id: "f_mekong_waterbird", name: "นกน้ำริมโขง", category: "fauna", tags: ["common","protected","seasonal"], desc: "แนวแม่น้ำโขงและหาดทรายริมฝั่งเป็นแหล่งหากินของนกน้ำหลายชนิด โดยเฉพาะช่วงน้ำลด." },
                { id: "f_snake_riverbank", name: "งูพื้นที่ริมน้ำและชายป่า", category: "fauna", tags: ["common","danger","seasonal"], desc: "พื้นที่ริมน้ำและชายป่ามีโอกาสพบงูหลายชนิด ควรระวังเมื่อเดินในหญ้าสูงหรือบริเวณชื้นแฉะ." },
                { id: "t_mekong_plain", name: "ที่ราบริมแม่น้ำโขง", category: "terrain", tags: ["common"], desc: "พื้นที่ราบริมโขงเหมาะกับนาและพืชสวน เป็นลักษณะภูมิประเทศเด่นของหนองคาย." },
                { id: "c_cool_dry_morning", name: "อากาศเย็นแห้งช่วงปลายปี", category: "climate", tags: ["common","seasonal"], desc: "ปลายฝนถึงต้นหนาวอากาศค่อนข้างเย็นและแห้งกว่าช่วงอื่น ทำให้การท่องเที่ยวริมโขงนิยมมากขึ้น." },
                { id: "h_mekong_flood", name: "น้ำท่วมริมโขง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ระดับน้ำโขงและน้ำฝนสะสมสามารถทำให้เกิดน้ำล้นตลิ่งหรือท่วมพื้นที่ลุ่มตามแนวฝั่ง." },
                { id: "h_bank_erosion", name: "ตลิ่งพังและกัดเซาะริมโขง", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "บางช่วงริมฝั่งเสี่ยงการกัดเซาะและดินทรุด ไม่ควรยืนชิดตลิ่งอ่อนตัวหลังฝนตกหนัก." }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 15-38°C, ร้อนจัดปลายก.พ.-พ.ค., ฝนพ.ค.-ต.ค., เย็นสบายต.ค.-ก.พ.",
            "terrain": "จังหวัดชายแดนริมฝั่งขวาแม่น้ำโขง มีพื้นที่เมือง ริมโขง และพื้นที่เกษตรของที่ราบสูง",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "ประตูสู่เวียงจันทน์",
                "content": "หนองคายเป็นจังหวัดชายแดนที่ใช้เดินทางต่อไปเวียงจันทน์และลาวบ่อยมาก ควรเช็กเอกสารข้ามแดนและเวลาทำการด่านล่วงหน้าก่อนออกเดินทาง",
                "type": "route"
            },
            {
                "title": "ถนนเลียบโขงเหมาะเที่ยวเย็น",
                "content": "บรรยากาศริมโขงช่วงเย็นดีมาก เหมาะกับเดินเล่น นั่งร้านอาหาร และพักคืนแรกก่อนข้ามแดน",
                "type": "culture"
            },
            {
                "title": "ตลาดท่าเสด็จเหมาะซื้อของฝาก",
                "content": "ตลาดอินโดจีนของหนองคายเหมาะกับซื้อของฝาก ของกินแห้ง และสินค้านำเข้าแบบราคากลางถึงประหยัด แต่ควรเช็กราคาเทียบหลายร้านก่อน",
                "type": "budget"
            },
            {
                "title": "หมอกและวิวดีช่วงปลายปี",
                "content": "ปลายฝนถึงหน้าหนาวเหมาะกับจุดชมวิวอย่างสังคมและภูห้วยอีสัน ถ้าตั้งใจดูทะเลหมอกควรออกเช้ามาก",
                "type": "season"
            },
            {
                "title": "เส้นสังคม-ชายโขงโค้งเยอะ",
                "content": "ถ้าขับไปโซนวัดผาตากเสื้อหรือจุดชมวิวริมโขง เส้นทางมีโค้งและบางช่วงมืด ควรเลี่ยงขับเร็วตอนกลางคืน",
                "type": "safety"
            },
            {
                "title": "อาหารเด่นมีทั้งอีสานและเวียดนาม",
                "content": "ในเมืองหาของกินง่าย โดยเฉพาะแหนมเนือง อาหารเวียดนาม และปลาน้ำโขง เหมาะกับนักเดินทางที่อยากกินครบในงบไม่แรง",
                "type": "food"
            },
            {
                "title": "เทศกาลคนแน่นเป็นพิเศษ",
                "content": "ช่วงออกพรรษาและเทศกาลเกี่ยวกับแม่น้ำโขงคนจะเยอะ ที่พักและร้านดังเต็มเร็ว ควรจองล่วงหน้า",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันบนถนนมิตรภาพและทางเข้าเมือง",
                "area": "ทางจากอุดรธานีเข้าเมืองหนองคาย",
                "note": "มีหลายแบรนด์ต่อเนื่อง เติมก่อนเข้าเขตชายแดนได้สะดวก",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มก่อนสะพานมิตรภาพไทย-ลาว",
                "area": "โซนด่านและทางเชื่อมสะพานมิตรภาพ",
                "note": "เหมาะเติมก่อนข้ามแดนหรือก่อนวิ่งยาวริมโขง",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "สาขาธนาคารในตัวเมือง",
                "area": "ย่านเทศบาล เมืองหนองคาย",
                "note": "เหมาะถอนเงินสดและทำธุรกรรมก่อนข้ามแดน",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำในตลาดและจุดริมน้ำ",
                "area": "ตลาดท่าเสด็จและทางเดินเลียบโขง",
                "note": "มีใช้ได้แต่คุณภาพต่างกัน ควรเตรียมทิชชูส่วนตัว",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในตัวเมือง",
                "area": "รอบโรงพยาบาลและถนนหลักในเมือง",
                "note": "หาได้ค่อนข้างง่ายสำหรับยาและอุปกรณ์ทั่วไป",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "คลินิกเอกชนในเมือง",
                "area": "โซนศูนย์ราชการและย่านการค้า",
                "note": "เหมาะกรณีอาการทั่วไป ไม่ฉุกเฉิน",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจในตัวเมือง",
                "area": "เทศบาลเมืองหนองคาย",
                "note": "ใช้ติดต่อกรณีเหตุทั่วไปหรือปัญหาระหว่างเดินทาง",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ร้านสะดวกซื้อและจุดพักรถ",
                "area": "ถนนหลักเข้าเมืองและริมโขง",
                "note": "เหมาะซื้อของจำเป็นก่อนขึ้นเส้นริมโขง",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "Udon Thani",
                "Bangkok",
                "Khon Kaen",
                "Vientiane",
                "Bueng Kan"
            ],
            "commonDestinations": [
                "Thai-Lao Friendship Bridge",
                "Tha Sadet Market",
                "Wat Pha Tak Suea",
                "Phu Huai Isan",
                "Wat Pho Chai",
                "Sangkhom",
                "Vientiane"
            ],
            "transitHubs": [
                "Nong Khai Bus Terminal",
                "Nong Khai Railway Station",
                "Border Checkpoint / Thai-Lao Friendship Bridge"
            ],
            "routeNotes": [
                "เส้นอุดรธานี-หนองคายใช้จริงบ่อยสุดและขับง่าย",
                "ถ้าจะขึ้นจุดชมวิวฝั่งสังคมควรเผื่อเวลาเพิ่มเพราะถนนโค้ง",
                "ข้ามแดนควรเตรียมเงินสด เอกสาร และเผื่อเวลาคิว",
                "ถ้าเที่ยวในเมืองอย่างเดียวไม่จำเป็นต้องรีบออกแต่เช้ามาก ยกเว้นตั้งใจไปชมหมอก"
            ]
        }
    },
    "Nong Bua Lam Phu": {
        "transport": [
            {
                "name": "รถสองแถวในตัวเมืองหนองบัวลำภู",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "เดินทางในเมืองและอำเภอใกล้เคียง เหมาะกับระยะสั้น",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "รถตู้/รถมินิบัสเชื่อมอุดรธานี-หนองบัวลำภู",
                "shortName": "รถตู้",
                "type": "van",
                "description": "ต่อจากสนามบิน/สถานีขนส่งอุดรฯได้สะดวก",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#06b6d4"
            },
            {
                "name": "รถโดยสารระหว่างจังหวัด (บขส./เอกชน)",
                "shortName": "รถทัวร์",
                "type": "bus",
                "description": "ใช้เดินทางไปขอนแก่น/อุดรฯ/กรุงเทพฯ ผ่านสถานีขนส่งจังหวัด",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#3b82f6"
            },
            {
                "name": "มอเตอร์ไซค์รับจ้าง/เช่ามอเตอร์ไซค์",
                "shortName": "มอเตอร์ไซค์",
                "type": "other",
                "description": "เหมาะกับเข้าถ้ำ/แหล่งท่องเที่ยวที่รถสาธารณะเข้าถึงยาก",
                "warpUrl": "",
                "logoText": "🚗",
                "color": "#64748b"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - หนองบัวลำภู (รถทัวร์/ต่อรถ)",
                "type": "coach",
                "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
                "from": "กรุงเทพฯ",
                "to": "หนองบัวลำภู",
                "via": [
                    "สระบุรี",
                    "นครราชสีมา",
                    "ขอนแก่น",
                    "อุดรธานี"
                ],
                "departureTimes": [
                    "07:00",
                    "10:00",
                    "20:30"
                ],
                "duration": "8-10 ชม.",
                "baseFare": 520,
                "frequency": "หลายเที่ยว/วัน (บางเที่ยวอาจต้องต่อรถ)",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": "บางรอบเป็นเส้นทางผ่าน/ปลายทางอื่น ควรถามที่เคาน์เตอร์ก่อนซื้อตั๋ว"
            },
            {
                "name": "สาย 2: อุดรธานี - หนองบัวลำภู (รถตู้)",
                "type": "van",
                "operator": "คิวรถตู้สายอุดรฯ-หนองบัวฯ",
                "from": "อุดรธานี",
                "to": "หนองบัวลำภู",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "09:00",
                    "11:00",
                    "13:00",
                    "15:00"
                ],
                "duration": "1-1.5 ชม.",
                "baseFare": 80,
                "frequency": "ประมาณทุก 30-60 นาที",
                "terminal": "สถานีขนส่งผู้โดยสารอุดรธานี",
                "notes": null
            },
            {
                "name": "สาย 3: เมืองหนองบัวลำภู - ถ้ำสุวรรณคูหา",
                "type": "van",
                "operator": "รถสองแถว/เหมารถท้องถิ่น",
                "from": "ตัวเมืองหนองบัวลำภู",
                "to": "ถ้ำสุวรรณคูหา",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "13:00",
                    "16:00"
                ],
                "duration": "40-60 นาที",
                "baseFare": 60,
                "frequency": "เที่ยวจำกัด/เหมารถสะดวกกว่า",
                "terminal": "คิวรถท้องถิ่นในเมือง",
                "notes": "เส้นทางเข้าถ้ำอาจต้องต่อรถหรือเหมารถ"
            },
            {
                "name": "สาย 4: หนองบัวลำภู - ขอนแก่น (รถตู้/รถบัส)",
                "type": "van",
                "operator": "คิวรถตู้/รถทัวร์ท้องถิ่น",
                "from": "หนองบัวลำภู",
                "to": "ขอนแก่น",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "10:00",
                    "14:00",
                    "17:00"
                ],
                "duration": "2-3 ชม.",
                "baseFare": 120,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งหนองบัวลำภู",
                "notes": null
            }
        ],
        "localFoods": [
            {
                "name": "เมี่ยงคำลำภู",
                "priceRange": "60-120฿",
                "category": "local",
                "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู และมีเอกลักษณ์ใช้กลีบบัวเป็นใบห่อ"
            },
            {
                "name": "ตำลำข่า (น้ำแจ่วเมี่ยงแบบอีสาน)",
                "priceRange": "40-80฿",
                "category": "local",
                "note": "มักใช้เป็นส่วนสำคัญของเมี่ยงคำลำภู"
            },
            {
                "name": "น้ำผึ้งสุวรรณฟาร์ม (ของดีศรีบุญเรือง)",
                "priceRange": "80-250฿",
                "category": "dessert",
                "note": "ผลิตภัณฑ์ท้องถิ่นที่ถูกแนะนำในพื้นที่"
            },
            {
                "name": "ลาบปลา/ก้อยปลาในพื้นที่ชุมชนลุ่มน้ำ",
                "priceRange": "60-150฿",
                "category": "local",
                "note": "ควรเลือกร้านที่สดสะอาด"
            },
            {
                "name": "เห็ดป่าตามฤดูกาล (เมนูแกง/ยำ)",
                "priceRange": "80-180฿",
                "category": "local",
                "note": "หน้าฝนมีเห็ดหลากชนิด ระวังเห็ดพิษ"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "400-900฿/คืน",
                "examples": [
                    "Rueanchorfa",
                    "โรงแรมหนองบัวกรีนวิว",
                    "เมืองนางธานีแกรนด์ หนองบัวลำภู"
                ],
                "bookingUrl": "https://www.booking.com/city/th/nong-bua-lamphu.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "900-1,600฿/คืน",
                "examples": [
                    "Rueanchorfa",
                    "เมืองนางธานีแกรนด์ หนองบัวลำภู"
                ],
                "bookingUrl": "https://www.booking.com/city/th/nong-bua-lamphu.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "1,600-2,800฿/คืน",
                "examples": [
                    "Rueanchorfa",
                    "เมืองนางธานีแกรนด์ หนองบัวลำภู"
                ],
                "bookingUrl": "https://www.booking.com/city/th/nong-bua-lamphu.html"
            }
        ],
        "dangerZones": [
            {
                "label": "อากาศร้อนจัด/เสี่ยงฮีทสโตรก",
                "severity": "medium",
                "note": "แดดแรงช่วงหน้าแล้ง ควรหลีกเลี่ยงกิจกรรมกลางแจ้งช่วงเที่ยง",
                "season": "มี.ค.-พ.ค."
            },
            {
                "label": "ฝนตกหนัก/น้ำท่วมขังในพื้นที่ลุ่ม",
                "severity": "medium",
                "note": "ช่วงมรสุมอาจมีน้ำท่วมขังบางพื้นที่และถนนลื่น",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "ถ้ำ/ทางเดินหินลื่น",
                "severity": "medium",
                "note": "เข้าถ้ำควรใส่รองเท้ากันลื่นและใช้ไฟฉาย",
                "season": null
            },
            {
                "label": "เห็ดป่า/พืชป่าพิษ",
                "severity": "medium",
                "note": "หน้าฝนมีเห็ดป่ามาก ควรระวังเห็ดพิษและอาหารป่าที่ไม่รู้จัก",
                "season": "พ.ค.-ต.ค."
            }
        ],
        "ecoIds": [
                "fl_rice_paddy",
                "fl_dipterocarp_forest",
                "f_bat_cave",
                "f_forest_bird",
                "t_sakon_basin_plain",
                "c_pm25_dry",
                "h_flash_flood",
                "h_summer_storm"
        ],
        "newEcoEntities": [
                { id: "fl_rice_paddy", name: "ข้าวนาปี", category: "flora", tags: ["common","edible","seasonal"], desc: "พืชเกษตรหลักของจังหวัด พบกว้างในพื้นที่ราบและแอ่งรับน้ำของหนองบัวลำภู." },
                { id: "fl_dipterocarp_forest", name: "ไม้เต็งรังเชิงเขา", category: "flora", tags: ["common"], desc: "สังคมพืชแบบเต็งรังพบในพื้นที่ค่อนข้างแห้งและเนินดอนของจังหวัด โดยเฉพาะเขตป่าอนุรักษ์." },
                { id: "f_bat_cave", name: "ค้างคาวถ้ำ", category: "fauna", tags: ["common","danger","protected"], desc: "บริเวณถ้ำในเขตภูเขาหินปูนเป็นแหล่งอาศัยของค้างคาวหลายชนิด ไม่ควรใช้ไฟส่องหรือรบกวนฝูง." },
                { id: "f_forest_bird", name: "นกป่าเชิงภู", category: "fauna", tags: ["common","protected"], desc: "พื้นที่ป่าและเชิงภูของจังหวัดยังเป็นถิ่นอาศัยของนกป่าหลายชนิด เหมาะกับกิจกรรมดูนกมากกว่าการเข้าไล่ต้อน." },
                { id: "t_sakon_basin_plain", name: "ที่ราบสูงและแอ่งรับน้ำ", category: "terrain", tags: ["common"], desc: "หนองบัวลำภูมีลักษณะเป็นที่ราบสูงสลับแอ่งรับน้ำและดินทรายลูกรังในหลายอำเภอ." },
                { id: "c_pm25_dry", name: "ฝุ่น PM2.5 ฤดูแล้ง", category: "climate", tags: ["danger","common","seasonal"], desc: "ช่วงปลายหนาวถึงต้นร้อนมีโอกาสเกิดหมอกควันและฝุ่นสะสม โดยเฉพาะเมื่อมีการเผาเศษวัสดุการเกษตร." },
                { id: "h_flash_flood", name: "น้ำหลากจากลำน้ำพองตอนบน", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "ฝนหนักจากพื้นที่ต้นน้ำและเชิงเขาอาจทำให้เกิดน้ำหลากฉับพลันในจุดลุ่มต่ำ." },
                { id: "h_summer_storm", name: "พายุฤดูร้อน", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "มักเกิดลมแรง ฝนฟ้าคะนอง และฟ้าผ่าช่วงเปลี่ยนฤดู เสี่ยงต่อบ้านเรือนเบาและป้ายสิ่งปลูกสร้าง." }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 16-38°C, ร้อนจัดปลายก.พ.-พ.ค., ฝนพ.ค.-ต.ค., เย็นสบายต.ค.-ก.พ.",
            "terrain": "ที่ราบสูงสลับภูเขาเตี้ยและถ้ำ มีอ่างเก็บน้ำและพื้นที่เกษตร",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เหมาะสายธรรมชาติสงบ",
                "content": "หนองบัวลำภูไม่ใช่จังหวัดสายเมืองใหญ่ แต่เด่นเรื่องธรรมชาติ ถ้ำ วัดป่า และบรรยากาศเงียบ เหมาะกับคนที่ไม่ชอบพื้นที่แออัด",
                "type": "culture"
            },
            {
                "title": "เส้นทางออกนอกเมืองค่อนข้างยาว",
                "content": "หลายจุดท่องเที่ยวไม่ได้อยู่ในตัวเมือง การวางแผนน้ำมันและของใช้จำเป็นก่อนออกจากเมืองสำคัญกว่าจังหวัดใหญ่",
                "type": "route"
            },
            {
                "title": "ปลายปีเที่ยวสบายกว่า",
                "content": "ปลายฝนถึงหน้าหนาวอากาศจะเดินทางสบายกว่าช่วงร้อนจัด เหมาะกับสายเที่ยวธรรมชาติและวัด",
                "type": "season"
            },
            {
                "title": "ภูเขาและถ้ำต้องเผื่อเวลา",
                "content": "ถ้าจะขึ้นจุดชมวิวหรือแวะถ้ำ ควรไปกลางวันและเผื่อเวลาเดินเท้า ไม่ควรอัดหลายจุดในวันเดียวถ้าไม่รู้พื้นที่",
                "type": "safety"
            },
            {
                "title": "ของกินเน้นร้านท้องถิ่น",
                "content": "ร้านอาหารเครือใหญ่มีน้อยกว่าจังหวัด hub แต่ร้านท้องถิ่นราคาไม่แรงและได้รสอีสานชัดกว่า",
                "type": "food"
            },
            {
                "title": "เหมาะเป็นเมืองพักเชื่อมเลย-อุดร",
                "content": "ใช้เป็นจุดพักระหว่างเส้นทางอุดรธานี เลย และพื้นที่ธรรมชาติฝั่งภูพานได้ดี ถ้าไม่ต้องการเข้าเมืองใหญ่",
                "type": "route"
            },
            {
                "title": "งานบุญและวัดป่ามีบทบาทมาก",
                "content": "จังหวัดนี้มีเอกลักษณ์ด้านสายธรรมะ วัดป่า และชุมชนท้องถิ่น ควรแต่งกายสุภาพเมื่อเข้าวัดหรือถ้ำสำคัญ",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันในตัวเมือง",
                "area": "อำเภอเมืองหนองบัวลำภู",
                "note": "ควรเติมให้พร้อมก่อนออกนอกเมืองไปแหล่งธรรมชาติ",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มบนเส้นทางเชื่อมอุดรธานี",
                "area": "ทางหลวงหลักระหว่างอุดรธานีกับหนองบัวลำภู",
                "note": "หาได้เรื่อยกว่าเส้นรอง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "สาขาธนาคารในย่านศูนย์กลางเมือง",
                "area": "ตัวเมืองหนองบัวลำภู",
                "note": "เหมาะทำธุรกรรมก่อนวิ่งเส้นชนบท",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำตามตลาดและสถานที่ราชการ",
                "area": "เขตเมือง",
                "note": "นอกเมืองมีน้อยกว่า ควรเข้าก่อนออกเดินทางไกล",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในเมือง",
                "area": "รอบโรงพยาบาลและถนนหลัก",
                "note": "หาง่ายกว่านอกเมืองมาก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "คลินิกเอกชนทั่วไป",
                "area": "ตัวเมือง",
                "note": "เหมาะอาการไม่ฉุกเฉินและการรักษาทั่วไป",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจในเขตเมือง",
                "area": "อำเภอเมือง",
                "note": "ใช้ติดต่อเหตุทั่วไปและความปลอดภัยระหว่างเดินทาง",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "ร้านสะดวกซื้อและตลาดท้องถิ่น",
                "area": "ตัวเมืองและชุมชนหลัก",
                "note": "เหมาะซื้อเสบียงก่อนออกนอกเส้นหลัก",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "Udon Thani",
                "Khon Kaen",
                "Loei",
                "Bangkok"
            ],
            "commonDestinations": [
                "Phu Kao Phu Phan Kham",
                "Erawan Cave",
                "Wat Tham Klong Phen",
                "Na Klang",
                "Si Bun Rueang",
                "Udon Thani",
                "Loei"
            ],
            "transitHubs": [
                "Nong Bua Lam Phu Bus Terminal",
                "Mueang Nong Bua Lam Phu town center"
            ],
            "routeNotes": [
                "จังหวัดนี้พึ่งรถส่วนตัวหรือรถโดยสารสายหลักมากกว่าสนามบิน",
                "เส้นทางเข้าแหล่งธรรมชาติบางจุดไม่มีบริการหนาแน่นแบบเมืองใหญ่",
                "เหมาะวางเป็น one-day loop จากอุดรธานีได้ แต่ถ้าจะเก็บหลายจุดควรค้างหนึ่งคืน",
                "ควรซื้อของจำเป็นในตัวเมืองก่อนออกเส้นภูเขาหรือถ้ำ"
            ]
        }
    },
    "Loei": {
        "transport": [
            {
                "name": "ท่าอากาศยานเลย",
                "shortName": "สนามบิน",
                "type": "plane",
                "description": "สนามบินในจังหวัดเลย (เที่ยวบินอาจมีตามฤดูกาล/ช่วงเวลา)",
                "warpUrl": "https://www.airports.go.th/",
                "logoText": "✈️",
                "color": "#ef4444"
            },
            {
                "name": "รถตู้/รถมินิบัส (เมืองเลย-เชียงคาน-ภูกระดึง-ด่านซ้าย)",
                "shortName": "รถตู้",
                "type": "van",
                "description": "เส้นทางท่องเที่ยวหลักในจังหวัดนิยมใช้รถตู้/มินิบัส",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#06b6d4"
            },
            {
                "name": "รถสองแถวท้องถิ่น (เมืองเลย/เชียงคาน)",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "วิ่งในตัวเมืองและบางเส้นทางไปอำเภอใกล้เคียง",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "จักรยาน/ทางจักรยานริมน้ำโขง (เชียงคาน)",
                "shortName": "จักรยาน",
                "type": "bike",
                "description": "พื้นที่ท่องเที่ยวอย่างเชียงคานเหมาะกับปั่นเลียบโขง",
                "warpUrl": "",
                "logoText": "🚲",
                "color": "#22c55e"
            },
            {
                "name": "รถตุ๊กตุ๊ก/รถรับจ้างในย่านท่องเที่ยว",
                "shortName": "รถรับจ้าง",
                "type": "other",
                "description": "เหมาะกับเที่ยวระยะสั้นหรือเหมาวันไปภูเขา/จุดชมวิว",
                "warpUrl": "",
                "logoText": "🚗",
                "color": "#64748b"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ - เลย (เครื่องบิน)",
                "type": "plane",
                "operator": "Thai AirAsia (หลัก) + สายการบินอาจเปลี่ยน",
                "from": "กรุงเทพฯ (DMK)",
                "to": "เลย (LOE)",
                "via": [],
                "departureTimes": [
                    "07:00",
                    "12:00",
                    "17:30"
                ],
                "duration": "1 ชม. 05-15 นาที",
                "baseFare": 1500,
                "frequency": "หลายเที่ยว/สัปดาห์",
                "terminal": "สนามบินดอนเมือง",
                "notes": "ความถี่เที่ยวบินเปลี่ยนตามฤดูกาล ควรเช็กวันเดินทาง"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - เลย (รถทัวร์)",
                "type": "coach",
                "operator": "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน",
                "from": "กรุงเทพฯ",
                "to": "เลย (บขส.เลย)",
                "via": [
                    "สระบุรี",
                    "เพชรบูรณ์"
                ],
                "departureTimes": [
                    "07:00",
                    "10:00",
                    "21:00"
                ],
                "duration": "8-9.5 ชม.",
                "baseFare": 620,
                "frequency": "หลายเที่ยว/วัน",
                "terminal": "สถานีขนส่งหมอชิต 2",
                "notes": null
            },
            {
                "name": "สาย 3: เมืองเลย - เชียงคาน",
                "type": "van",
                "operator": "คิวรถตู้เมืองเลย-เชียงคาน",
                "from": "เลย (บขส./คิวรถตู้)",
                "to": "เชียงคาน",
                "via": [],
                "departureTimes": [
                    "08:00",
                    "10:00",
                    "12:00",
                    "14:00",
                    "16:00"
                ],
                "duration": "1-1.5 ชม.",
                "baseFare": 60,
                "frequency": "ประมาณทุก 1 ชม.",
                "terminal": "สถานีขนส่ง จ.เลย",
                "notes": null
            },
            {
                "name": "สาย 4: เมืองเลย - อุทยานแห่งชาติภูกระดึง",
                "type": "van",
                "operator": "รถสองแถว/รถตู้ไปภูกระดึง",
                "from": "เลย (บขส./คิวรถ)",
                "to": "อ.ภูกระดึง (ทางเข้าอุทยาน)",
                "via": [],
                "departureTimes": [
                    "06:30",
                    "08:30",
                    "10:30"
                ],
                "duration": "1.5-2 ชม.",
                "baseFare": 80,
                "frequency": "เที่ยวเช้าเด่น",
                "terminal": "สถานีขนส่ง จ.เลย",
                "notes": "ควรเช็กเวลาให้ทันรอบเดินขึ้นภูกระดึง"
            }
        ],
        "localFoods": [
            {
                "name": "ส้าปลาน้ำโขง",
                "priceRange": "80-160฿",
                "category": "local",
                "note": "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู"
            },
            {
                "name": "ข้าวเปียกเส้น (เมืองเลย/เชียงคาน)",
                "priceRange": "50-100฿",
                "category": "street",
                "note": "ถูกยกเป็นอาหารประจำถิ่นในพื้นที่ท่องเที่ยว"
            },
            {
                "name": "เมี่ยงคำ (สไตล์เลย/เชียงคาน)",
                "priceRange": "40-120฿",
                "category": "street",
                "note": "พบได้ตามถนนคนเดินเชียงคาน"
            },
            {
                "name": "ข้าวจี่",
                "priceRange": "15-35฿",
                "category": "street",
                "note": "พบมากช่วงอากาศเย็นและงานประเพณี"
            },
            {
                "name": "อาหารปลาแม่น้ำโขง (ย่าง/ลวกจิ้ม/ต้มยำ)",
                "priceRange": "120-250฿",
                "category": "local",
                "note": "นิยมในโซนริมโขง เช่น เชียงคาน"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "450-1,100฿/คืน",
                "examples": [
                    "Fortune D Hotel Loei",
                    "Loei Village Hotel",
                    "Loei Palace Hotel"
                ],
                "bookingUrl": "https://www.booking.com/city/th/loei.th.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,100-2,200฿/คืน",
                "examples": [
                    "Loei Palace Hotel",
                    "Indiego Space",
                    "Chiang Khan Hill Resort"
                ],
                "bookingUrl": "https://www.booking.com/city/th/loei.th.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "2,200-5,000฿/คืน",
                "examples": [
                    "Chiangkhan River Mountain Resort",
                    "Phurua Resort"
                ],
                "bookingUrl": "https://www.booking.com/city/th/loei.th.html"
            }
        ],
        "dangerZones": [
            {
                "label": "อากาศหนาว/ลมแรงบนภูเขา",
                "severity": "medium",
                "note": "พื้นที่ภูเขามีอากาศเย็นจัดได้ โดยเฉพาะกลางคืน-เช้ามืด",
                "season": "พ.ย.-ก.พ."
            },
            {
                "label": "หมอกหนา/ทัศนวิสัยต่ำบนถนนภูเขา",
                "severity": "medium",
                "note": "ขับรถขึ้นภูเรือ/ภูกระดึงควรระวังหมอกและโค้งมาก",
                "season": "พ.ย.-ก.พ."
            },
            {
                "label": "ฝนตกหนัก น้ำป่าไหลหลาก/ดินสไลด์",
                "severity": "high",
                "note": "พื้นที่ภูเขาเสี่ยงน้ำป่าและถนนพังเป็นช่วง ๆ",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "กระแสน้ำแม่น้ำโขง/กิจกรรมริมโขง",
                "severity": "medium",
                "note": "ระดับน้ำเปลี่ยนตามฤดู ต้องระวังการเล่นน้ำและล่องเรือ",
                "season": "พ.ค.-ต.ค."
            }
        ],
        "ecoIds": [
                "fl_maple",
                "fl_two_needled_pine",
                "f_wild_elephant",
                "f_serow",
                "t_mountain_plateau",
                "c_cold_winter",
                "h_forest_fire",
                "h_trail_accident"
        ],
        "newEcoEntities": [
                { id: "fl_maple", name: "เมเปิลภูกระดึง", category: "flora", tags: ["common","protected","seasonal"], desc: "เมเปิลเป็นพืชเด่นของภูกระดึงในฤดูหนาว ใบเปลี่ยนสีเป็นเอกลักษณ์และเป็นพืชที่ไม่ควรเก็บจากธรรมชาติ." },
                { id: "fl_two_needled_pine", name: "สนสองใบ", category: "flora", tags: ["common","protected"], desc: "ป่าสนสองใบเป็นหนึ่งในภูมิทัศน์เด่นของจังหวัดเลย พบตามพื้นที่สูงและอากาศเย็น." },
                { id: "f_wild_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","rare","protected"], desc: "มีรายงานการจัดการช้างป่าในพื้นที่ภูกระดึงช่วงปี 2567-2569 ไม่ควรเดินออกนอกเส้นทางหรือเข้าใกล้สัตว์." },
                { id: "f_serow", name: "เลียงผา", category: "fauna", tags: ["rare","danger","protected"], desc: "สัตว์ป่าคุ้มครองที่สัมพันธ์กับภูเขาสูงและหน้าผา พบยากและไม่ควรรบกวนถิ่นอาศัย." },
                { id: "t_mountain_plateau", name: "ภูเขาสูงและที่ราบบนสันภู", category: "terrain", tags: ["common"], desc: "เลยมีภูเขาสูงสลับซับซ้อนและแหล่งต้นน้ำจำนวนมาก ทำให้ภูมิประเทศต่างจากอีสานตอนในอย่างชัดเจน." },
                { id: "c_cold_winter", name: "อากาศหนาวเด่น", category: "climate", tags: ["common","danger","seasonal"], desc: "จังหวัดเลยมีอากาศหนาวเด่นกว่าหลายจังหวัดในอีสาน โดยเฉพาะบนยอดภูและช่วงเช้ามืด." },
                { id: "h_forest_fire", name: "ไฟป่าฤดูแล้ง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ช่วงแล้งเสี่ยงไฟป่าและหมอกควันในพื้นที่ป่าเขา ควรหลีกเลี่ยงการก่อไฟและติดตามประกาศปิดพื้นที่." },
                { id: "h_trail_accident", name: "อุบัติเหตุทางเดินเขาและหน้าผา", category: "climate", tags: ["common","danger","seasonal","extreme"], desc: "เส้นทางภูเขาอาจลื่น ชัน หรือมีสัตว์ป่ารบกวน โดยเฉพาะเมื่อออกนอกเส้นทางหรือทัศนวิสัยต่ำ." }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 10-36°C, เย็นกว่าหลายจังหวัดอีสาน มีหมอกช่วงปลายปี, ฝนพ.ค.-ต.ค.",
            "terrain": "จังหวัดอีสานค่อนไปทางเหนือ อยู่ท่ามกลางภูเขาน้อยใหญ่ มีแหล่งท่องเที่ยวธรรมชาติและริมแม่น้ำโขง",
            "bestSeason": "ต.ค.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "เด่นเรื่องภูเขาและอากาศเย็น",
                "content": "เลยเป็นจังหวัดภูเขาที่เด่นมากของอีสาน โดยเฉพาะปลายปีถึงต้นปี อากาศเย็นกว่าหลายจังหวัดรอบข้างชัดเจน",
                "type": "season"
            },
            {
                "title": "ภูกระดึงต้องเตรียมร่างกาย",
                "content": "ถ้าตั้งใจขึ้นภูกระดึง ควรวางแผนสัมภาระ น้ำดื่ม และเวลาให้ดี เพราะเป็นทริปที่ใช้แรงและไม่เหมาะกับการยัดโปรแกรมแน่น",
                "type": "safety"
            },
            {
                "title": "ภูเรือและเชียงคานคนเยอะช่วงไฮซีซัน",
                "content": "ปลายปีที่พักในเชียงคานและจุดชมหมอกเต็มเร็ว ควรจองล่วงหน้าถ้าจะไปศุกร์-อาทิตย์หรือช่วงหยุดยาว",
                "type": "route"
            },
            {
                "title": "เหมาะสาย road trip",
                "content": "จังหวัดนี้เหมาะกับคนชอบขับรถเที่ยวต่อเนื่องหลายอำเภอ เช่น เมืองเลย ภูเรือ ด่านซ้าย เชียงคาน แต่ต้องเผื่อเวลาขับมากกว่าจังหวัดพื้นราบ",
                "type": "route"
            },
            {
                "title": "อาหารพื้นถิ่นมีเอกลักษณ์",
                "content": "มาถึงเลยควรลองอาหารท้องถิ่นอย่างข้าวเปียกและร้านอาหารพื้นเมืองในตัวเมืองหรือเชียงคาน ราคาโดยรวมยังไม่โหดเท่าเมืองท่องเที่ยวหลัก",
                "type": "food"
            },
            {
                "title": "ถนนภูเขาขับกลางคืนไม่คุ้ม",
                "content": "หลายเส้นทางมีโค้งและแสงสว่างไม่สม่ำเสมอ โดยเฉพาะทางขึ้นจุดชมวิว ควรขับกลางวันจะปลอดภัยกว่า",
                "type": "safety"
            },
            {
                "title": "เหมาะเที่ยวปลายฝนถึงหนาว",
                "content": "ถ้าอยากได้หมอก อากาศดี และวิวเขาชัด ช่วงปลายฝนถึงหน้าหนาวตอบโจทย์ที่สุด แต่ต้องแลกกับคนเยอะขึ้น",
                "type": "season"
            },
            {
                "title": "ประเพณีผีตาโขนต้องเช็กวัน",
                "content": "ถ้าไปสายวัฒนธรรมและตั้งใจดูงานผีตาโขนที่ด่านซ้าย ควรเช็กกำหนดจัดงานก่อน เพราะมีผลต่อคนแน่นและที่พัก",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "gas",
                "label": "ปั๊มน้ำมันในเมืองเลย",
                "area": "อำเภอเมืองเลย",
                "note": "ควรเติมก่อนออกไปภูเรือ เชียงคาน หรือด่านซ้าย",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มตามเส้นเมืองเลย-เชียงคาน",
                "area": "ทางหลวงหลักระหว่างอำเภอ",
                "note": "เส้นหลักหาได้ง่ายกว่าเส้นเข้าจุดชมวิว",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊มก่อนขึ้นโซนภูเขา",
                "area": "ทางไปภูเรือ ด่านซ้าย และภูกระดึง",
                "note": "ควรเติมให้พร้อมก่อนเข้าเขตภูเขา",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "bank",
                "label": "ธนาคารในตัวเมืองและเชียงคาน",
                "area": "ย่านกลางเมืองและชุมชนท่องเที่ยวหลัก",
                "note": "ทำธุรกรรมได้สะดวกกว่านอกอำเภอหลัก",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำตามปั๊มและจุดท่องเที่ยวหลัก",
                "area": "ตัวเมือง ปั๊มบนเส้นหลัก และแหล่งท่องเที่ยวใหญ่",
                "note": "เส้นภูเขารองบางช่วงห่าง ควรใช้ก่อนออกเดินทางไกล",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยาในเมืองเลย",
                "area": "รอบโรงพยาบาลและถนนการค้า",
                "note": "ของจำเป็นควรซื้อจากเมืองก่อนขึ้นเขา",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "คลินิกเอกชนทั่วไป",
                "area": "อำเภอเมืองเลย",
                "note": "เหมาะอาการทั่วไป นักท่องเที่ยวเข้าถึงง่ายกว่านอกเมือง",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจในตัวเมือง",
                "area": "เมืองเลย",
                "note": "รองรับเหตุทั่วไปและประสานงานการเดินทาง",
                "openHours": "24 ชม.",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "สนามบินเลย",
                "area": "อำเภอเมืองเลย",
                "note": "เหมาะเป็นจุดเข้า-ออกจังหวัดสำหรับทริปสั้น",
                "openHours": null,
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "Bangkok",
                "Khon Kaen",
                "Udon Thani",
                "Phitsanulok",
                "Nong Bua Lam Phu"
            ],
            "commonDestinations": [
                "Chiang Khan",
                "Phu Kradueng",
                "Phu Ruea",
                "Dan Sai",
                "Phu Luang",
                "Loei city",
                "Kaeng Khut Khu"
            ],
            "transitHubs": [
                "Loei Airport",
                "Loei Bus Terminal",
                "Chiang Khan town center"
            ],
            "routeNotes": [
                "ถ้าจะเที่ยวหลายอำเภอควรใช้รถส่วนตัวจะยืดหยุ่นที่สุด",
                "ภูกระดึงควรแยกเป็นทริปเฉพาะ ไม่ควรยัดรวมกับเชียงคานในวันเดียว",
                "เชียงคานเหมาะค้างคืน ส่วนภูเรือเหมาะออกเช้าหรือค้างในโซนภูเขา",
                "หน้าหนาวคนเยอะและที่พักขึ้นราคาเร็ว ต้องจองล่วงหน้า",
                "ถนนภูเขาควรเลี่ยงการรีบขับหลังพระอาทิตย์ตก"
            ]
        }
    }
};
