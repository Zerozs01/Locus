// Portal seed data: ภาคตะวันออก+ตะวันตก Part 3 (1 จังหวัด)
// Source: documents/deepreserach/part5_ภาคตะวันออก+ตะวันตก.md
import type { ProvincePortalSeedData } from './db';

export const eastWest3: Record<string, ProvincePortalSeedData> = {
    "Prachuap Khiri Khan": {
        "transport": [
            {
                "name": "รถไฟสายใต้ กรุงเทพฯ-หัวหิน/ประจวบฯ/บางสะพาน",
                "shortName": "รถไฟ",
                "type": "rail",
                "description": "เส้นทางหลักลงภาคใต้ จอดหลายสถานีในจังหวัด เหมาะกับเดินทางประหยัด",
                "warpUrl": "https://www.railway.co.th/",
                "logoText": "🚆",
                "color": "#3b82f6"
            },
            {
                "name": "รถทัวร์/รถบัสกรุงเทพฯ-หัวหิน",
                "shortName": "รถทัวร์",
                "type": "bus",
                "description": "มีรถจากสถานีขนส่งสายใต้ใหม่และจุดอื่น ๆ ไปหัวหินหลายรอบ/วัน",
                "warpUrl": "",
                "logoText": "🚌",
                "color": "#0ea5e9"
            },
            {
                "name": "รถตู้กรุงเทพฯ-หัวหิน/ปราณบุรี",
                "shortName": "รถตู้",
                "type": "van",
                "description": "เดินทางสะดวกและค่อนข้างถี่ เหมาะทริปสั้น",
                "warpUrl": "",
                "logoText": "🚐",
                "color": "#38bdf8"
            },
            {
                "name": "รถสองแถวหัวหิน/ปราณบุรี",
                "shortName": "สองแถว",
                "type": "songthaew",
                "description": "พาหนะยอดนิยมในหัวหินและเส้นทางใกล้เคียง (รถสองแถวสีเขียว/ขาวตามสาย)",
                "warpUrl": "",
                "logoText": "🛻",
                "color": "#f97316"
            },
            {
                "name": "เรือท่องเที่ยว/สปีดโบ๊ตไปเกาะทะลุ (บางสะพาน)",
                "shortName": "เรือเกาะทะลุ",
                "type": "boat",
                "description": "ทัวร์วันเดียวไปเกาะทะลุ มีเรือรับส่งตามแพ็กเกจ",
                "warpUrl": "",
                "logoText": "⛴️",
                "color": "#14b8a6"
            }
        ],
        "routes": [
            {
                "name": "สาย 1: กรุงเทพฯ (สายใต้ใหม่) - หัวหิน",
                "type": "coach",
                "operator": "บขส./ผู้ประกอบการเอกชน",
                "from": "กรุงเทพฯ (สายใต้ใหม่)",
                "to": "ประจวบคีรีขันธ์ (หัวหิน)",
                "via": [
                    "สมุทรสาคร",
                    "สมุทรสงคราม",
                    "เพชรบุรี"
                ],
                "departureTimes": [
                    "05:00",
                    "07:00",
                    "09:00",
                    "12:00",
                    "15:00",
                    "18:00"
                ],
                "duration": "3-4.5 ชม.",
                "baseFare": 200,
                "frequency": "ทุก 1-2 ชม. (โดยประมาณ)",
                "terminal": "สถานีขนส่งสายใต้ใหม่",
                "notes": "วันหยุดอาจเต็มเร็ว ควรจองล่วงหน้า"
            },
            {
                "name": "สาย 2: กรุงเทพฯ - หัวหิน (รถไฟสายใต้)",
                "type": "train",
                "operator": "การรถไฟแห่งประเทศไทย (SRT)",
                "from": "กรุงเทพฯ (สถานีกลาง/สถานีต้นทางสายใต้)",
                "to": "หัวหิน",
                "via": [
                    "นครปฐม",
                    "ราชบุรี",
                    "เพชรบุรี"
                ],
                "departureTimes": [
                    "07:30",
                    "15:10",
                    "20:30"
                ],
                "duration": "3.5-5 ชม.",
                "baseFare": 100,
                "frequency": "หลายขบวน/วัน",
                "terminal": "สถานีรถไฟต้นทางในกรุงเทพฯ",
                "notes": "เลือกขบวนเร็ว/ธรรมดา ระยะเวลาต่างกัน"
            },
            {
                "name": "สาย 3: สุวรรณภูมิ - หัวหิน (รถบัส บขส.)",
                "type": "bus",
                "operator": "บริษัท ขนส่ง จำกัด (บขส.)",
                "from": "สนามบินสุวรรณภูมิ",
                "to": "หัวหิน",
                "via": [
                    "สมุทรปราการ",
                    "กรุงเทพมหานคร",
                    "เพชรบุรี"
                ],
                "departureTimes": [
                    "10:00",
                    "14:30",
                    "18:00"
                ],
                "duration": "3.5-4.5 ชม.",
                "baseFare": 200,
                "frequency": "วันละ 3 เที่ยว (ตามประกาศบริการ)",
                "terminal": "จุดจอดรถบัสสนามบินสุวรรณภูมิ",
                "notes": "ตาราง/บริการอาจมีการปรับ โปรดเช็คก่อนเดินทาง"
            },
            {
                "name": "สาย 4: บางสะพาน - เกาะทะลุ (ทัวร์เรือ)",
                "type": "boat",
                "operator": "ผู้ให้บริการทัวร์เกาะทะลุ",
                "from": "ประจวบคีรีขันธ์ (บางสะพาน)",
                "to": "เกาะทะลุ",
                "via": [],
                "departureTimes": [
                    "09:00",
                    "13:00"
                ],
                "duration": "30-45 นาที (ขึ้นกับจุดออกเรือ)",
                "baseFare": 400,
                "frequency": "ตามรอบทัวร์",
                "terminal": "ท่าเรือท้องถิ่น (ตามผู้ให้บริการ)",
                "notes": "ทะเลมรสุมอาจงดเรือ"
            }
        ],
        "localFoods": [
            {
                "name": "ปลาหมึกแดดเดียวปากน้ำปราณ",
                "priceRange": "150-400฿",
                "category": "local",
                "note": "ของขึ้นชื่อของปากน้ำปราณ (ปราณบุรี)"
            },
            {
                "name": "สับปะรดกุยบุรี",
                "priceRange": "30-80฿",
                "category": "dessert",
                "note": "กุยบุรีขึ้นชื่อเรื่องสับปะรดหวานกรอบ"
            },
            {
                "name": "อาหารทะเลบ้านกรูด/บางสะพาน",
                "priceRange": "200-800฿",
                "category": "local",
                "note": "ราคาขึ้นกับฤดูกาลและขนาดวัตถุดิบ"
            },
            {
                "name": "กุ้งแห้ง/อาหารทะเลแห้งปากน้ำปราณ",
                "priceRange": "120-500฿",
                "category": "street",
                "note": "นิยมซื้อเป็นของฝากจากชุมชนประมง"
            },
            {
                "name": "โรตีสายไหม/ขนมตลาดโต้รุ่งหัวหิน",
                "priceRange": "30-120฿",
                "category": "dessert",
                "note": "หัวหินมีสตรีทฟู้ดหลากหลายโดยเฉพาะช่วงเย็น-กลางคืน"
            }
        ],
        "accommodation": [
            {
                "tier": "budget",
                "label": "ประหยัด",
                "priceRange": "700-1,800฿/คืน",
                "examples": [
                    "HOP INN Prachuap Khiri Khan",
                    "ibis Hua Hin",
                    "B2 Hua Hin Premier Hotel"
                ],
                "bookingUrl": "https://www.booking.com/region/th/prachuap-khiri-khan.html"
            },
            {
                "tier": "midrange",
                "label": "ปานกลาง",
                "priceRange": "1,800-5,500฿/คืน",
                "examples": [
                    "Hilton Hua Hin Resort & Spa",
                    "Holiday Inn Resort Vana Nava Hua Hin",
                    "Centara Grand Beach Resort & Villas Hua Hin"
                ],
                "bookingUrl": "https://www.booking.com/region/th/prachuap-khiri-khan.html"
            },
            {
                "tier": "premium",
                "label": "หรูหรา",
                "priceRange": "5,500-25,000฿/คืน",
                "examples": [
                    "InterContinental Hua Hin Resort",
                    "Cape Nidhra Hotel",
                    "V Villas Hua Hin - MGallery"
                ],
                "bookingUrl": "https://www.booking.com/region/th/prachuap-khiri-khan.html"
            }
        ],
        "dangerZones": [
            {
                "label": "คลื่นลมแรง/กระแสน้ำย้อนตามชายหาด",
                "severity": "high",
                "note": "ช่วงมรสุมทะเลอาจคลื่นแรงและอันตรายต่อการลงเล่นน้ำ โดยเฉพาะวันที่มีธงแดง/ประกาศเตือน",
                "season": "พ.ค.-ต.ค."
            },
            {
                "label": "ช้างป่าในพื้นที่อุทยาน (กุยบุรี) และแนวป่าตะวันตก",
                "severity": "high",
                "note": "หากเดินทางเข้าเขตอุทยานควรทำตามคำแนะนำเจ้าหน้าที่และไม่เข้าใกล้ช้างป่า",
                "season": null
            },
            {
                "label": "แดดแรงและฮีตสโตรก",
                "severity": "medium",
                "note": "กิจกรรมชายหาดช่วงกลางวันควรทาครีมกันแดด ดื่มน้ำ และหลบแดดเป็นระยะ",
                "season": "มี.ค.-พ.ค."
            }
        ],
        "ecoIds": [
                "fl_pineapple",
                "fl_seagrass",
                "f_wild_elephant",
                "f_gaur",
                "t_long_coast_wetland",
                "c_monsoon_coast",
                "h_rough_sea",
                "h_elephant_conflict"
        ],
        "newEcoEntities": [
                { id: "fl_pineapple", name: "สับปะรด", category: "flora", tags: ["common","edible","seasonal"], desc: "ประจวบคีรีขันธ์เป็นแหล่งปลูกสับปะรดสำคัญของประเทศ พืชชนิดนี้เป็นภาพจำของภูมิประเทศเกษตรที่ดอนของจังหวัด" },
                { id: "fl_seagrass", name: "หญ้าทะเล", category: "flora", tags: ["common","rare"], desc: "พื้นที่ชายฝั่งและอ่าวตื้นบางช่วงมีแหล่งหญ้าทะเลซึ่งเป็นฐานของระบบนิเวศทะเลตื้น" },
                { id: "f_wild_elephant", name: "ช้างป่า", category: "fauna", tags: ["danger","common","protected"], desc: "กุยบุรีเป็นพื้นที่เด่นในการพบช้างป่าในธรรมชาติของไทย และเป็นจุดเฝ้าระวังความขัดแย้งคนกับสัตว์ป่า" },
                { id: "f_gaur", name: "กระทิง", category: "fauna", tags: ["danger","common","protected"], desc: "นอกจากช้างป่าแล้ว กุยบุรียังเป็นพื้นที่สำคัญของกระทิงซึ่งมักออกหากินในทุ่งหญ้าเปิด" },
                { id: "t_long_coast_wetland", name: "ชายฝั่งยาว พื้นที่ชุ่มน้ำ และเทือกเขาตะนาวศรี", category: "terrain", tags: ["common"], desc: "จังหวัดนี้มีชายฝั่งยาวมาก มีทั้งพื้นที่ชุ่มน้ำชายฝั่ง เขาหินปูน และป่าภูเขาด้านตะวันตก" },
                { id: "c_monsoon_coast", name: "มรสุมชายฝั่งและฝนฟ้าคะนองทะเล", category: "climate", tags: ["common","danger","seasonal"], desc: "ทะเลและชายฝั่งของประจวบฯ ได้รับอิทธิพลมรสุมชัดเจน ทำให้เกิดคลื่นแรงและพายุฝนฟ้าคะนองตามฤดูกาล" },
                { id: "h_rough_sea", name: "คลื่นลมแรงและกระแสน้ำชายฝั่ง", category: "climate", tags: ["danger","common","seasonal","extreme"], desc: "ช่วงทะเลแรงมีความเสี่ยงต่อเรือเล็ก นักตกปลา และผู้เล่นน้ำตามชายหาดเปิด" },
                { id: "h_elephant_conflict", name: "ช้างป่าใกล้พื้นที่เกษตร", category: "climate", tags: ["danger","common","extreme"], desc: "พื้นที่ติดป่าในประจวบฯ มีความเสี่ยงช้างป่าเข้าหาแหล่งอาหารในไร่และแนวชุมชน โดยเฉพาะยามค่ำคืน" }
        ],
        "metadata": {
            "climate": "อุณหภูมิประมาณ 22-34°C, ชื้นและลมทะเล ฝนพ.ค.-ต.ค. (บางพื้นที่ฝนต่อถึงพ.ย.)",
            "terrain": "แนวชายฝั่งยาว มีเมืองท่องเที่ยว (หัวหิน) ชุมชนประมง และแนวภูเขา-อุทยานทางทิศตะวันตก",
            "bestSeason": "พ.ย.-ก.พ.",
            "emergencyContacts": []
        },
        "knowledgeTips": [
            {
                "title": "หัวหินฮิต",
                "content": "หัวหินเป็นเมืองท่องเที่ยวยอดนิยม มีชายหาดสวยและตลาดกลางคืนคึกคัก ควรไปเยือน เพลินวาน หรือวัดห้วยมงคล",
                "type": "culture"
            },
            {
                "title": "เขาตะเกียบ",
                "content": "ภูเขาที่มองเห็นทะเลบริเวณหาดหัวหิน เหมาะแก่การเดินเล่นชมวิวและถ่ายรูปช่วงเย็น",
                "type": "culture"
            },
            {
                "title": "ตะลุยถ้ำ",
                "content": "อุทยานแห่งชาติสามร้อยยอด มีถ้ำพระยานครและหาดทรายหุบเกาะ เหมาะเยี่ยมที่สุดช่วง พ.ย.-ม.ค.",
                "type": "season"
            },
            {
                "title": "อาหารทะเลสด",
                "content": "หัวหินและประจวบฯ มีอาหารทะเลสดโดยเฉพาะปลาหมึกและปู ควรเลือกทานร้านริมทะเลจะอร่อยกว่า",
                "type": "food"
            },
            {
                "title": "ถนนพระราม 2",
                "content": "ถนนเพชรเกษม (หมายเลข 4) ตัดผ่านประจวบฯไปหัวหิน ถนนสองเลนบางจุดควรระวังรถสวนเลน",
                "type": "route"
            },
            {
                "title": "ตลาดจั๊กจั่นปีใหม่",
                "content": "งานตลาดจั๊กจั่นปีใหม่ที่หัวหินเป็นสีสันพิเศษ นอกจากนี้ มีงานท้องถิ่นอื่นๆ ช่วงปลายปี",
                "type": "culture"
            }
        ],
        "supplyPoints": [
            {
                "type": "bank",
                "label": "ธนาคารกสิกรไทย (หัวหิน)",
                "area": "ถนนเดชานุชิต",
                "note": "บริการ ATM",
                "openHours": "09:00-16:00",
                "mapUrl": ""
            },
            {
                "type": "gas",
                "label": "ปั๊ม ปตท. ประจวบฯ",
                "area": "ถนนเพชรเกษม",
                "note": "บริการ 24 ชม.",
                "openHours": "00:00-24:00",
                "mapUrl": ""
            },
            {
                "type": "toilet",
                "label": "ห้องน้ำสาธารณะ หาดหัวหิน",
                "area": "ริมทะเล",
                "note": "เปิดบริการเต็มวัน",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "pharmacy",
                "label": "ร้านขายยา ธนินยา (หัวหิน)",
                "area": "ริมถนนเพชรเกษม",
                "note": "ยาเบื้องต้น",
                "openHours": "08:00-20:00",
                "mapUrl": ""
            },
            {
                "type": "clinic",
                "label": "โรงพยาบาลหัวหิน",
                "area": "ตัวเมืองหัวหิน",
                "note": "โรงพยาบาลทั่วไป",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "police",
                "label": "สถานีตำรวจภูธรหัวหิน",
                "area": "ตัวเมืองหัวหิน",
                "note": "รักษาความปลอดภัย",
                "openHours": null,
                "mapUrl": ""
            },
            {
                "type": "ev_charger",
                "label": "PTT EV Charger (หัวหิน)",
                "area": "หมู่บ้านสวนน้ำหว้ากอ",
                "note": "สถานีชาร์จรถไฟฟ้า",
                "openHours": "06:00-22:00",
                "mapUrl": ""
            },
            {
                "type": "other",
                "label": "สถานีขนส่งผู้โดยสารหัวหิน",
                "area": "ถนนเพชรเกษม",
                "note": "รถตู้ กรุงเทพฯ-หัวหิน",
                "openHours": "06:00-20:00",
                "mapUrl": ""
            }
        ],
        "plannerHints": {
            "commonOrigins": [
                "กรุงเทพฯ",
                "ประจวบคีรีขันธ์",
                "ชุมพร"
            ],
            "commonDestinations": [
                "หัวหิน",
                "ตลาดน้ำหัวหินสามพันนาม",
                "เขาตะเกียบ",
                "อ่าวมะนาว",
                "เขาสามร้อยยอด"
            ],
            "transitHubs": [
                "สถานีรถไฟหัวหิน",
                "สถานีขนส่งประจวบคีรีขันธ์"
            ],
            "routeNotes": [
                "ถนนเพชรเกษม (หมายเลข 4) เข้าสู่หัวหิน",
                "ถนนสองเลนบางช่วงต้องระวังยานพาหนะ",
                "ทางหลวง 344 ไปปราณบุรีสามารถเลี่ยงรถติดบางช่วง"
            ]
        }
    }
};
