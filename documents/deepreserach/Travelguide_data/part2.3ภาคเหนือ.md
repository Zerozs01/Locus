```json
{
  "Kamphaeng Phet": {
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
        "via": ["พระนครศรีอยุธยา", "นครสวรรค์", "อุทัยธานี"],
        "departureTimes": ["08:00", "18:00"],
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
        "via": ["พระนครศรีอยุธยา", "นครสวรรค์"],
        "departureTimes": ["07:30", "18:00"],
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
        "departureTimes": ["08:00", "18:00"],
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
        "departureTimes": ["10:00", "15:00"],
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
        "examples": ["HOP INN Kamphaeng Phet", "Navarat Heritage Hotel"],
        "bookingUrl": "https://www.booking.com/region/th/kamphaeng-phet.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["White Wall Riverfront Hotel", "La Kana Boutique"],
        "bookingUrl": "https://www.booking.com/region/th/kamphaeng-phet.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["J2 Hotel KPP", "Somrak Villa KPP"],
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
    "ecoIds": ["f_elephant", "f_monkey", "t_urban", "t_rainforest", "c_flash_flood", "c_monsoon", "fl_nettle"],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 17-35°C, ฝนชุกช่วง ก.ค.-ก.ย.",
      "terrain": "ป่าผลัดใบและที่ราบใกล้ลำน้ำยม",
      "bestSeason": "ก.ย.-ธ.ค.",
      "emergencyContacts": []
    }
  },
  "Phitsanulok": {
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
        "via": ["อยุธยา", "นครสวรรค์"],
        "departureTimes": ["08:00", "20:00"],
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
        "via": ["อยุธยา", "นครสวรรค์"],
        "departureTimes": ["07:30", "18:30"],
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
        "departureTimes": ["09:00", "15:00"],
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
        "examples": ["The Legendha Sukhothai Hotel", "Ou Hotel Phitsanulok"],
        "bookingUrl": "https://www.booking.com/region/th/phitsanulok.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["Waway Hotel Phitsanulok", "P&P Resort Phitsanulok"],
        "bookingUrl": "https://www.booking.com/region/th/phitsanulok.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["Legendha Khaokho Hotel", "The Serenity Sathorn Phitsanulok"],
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
    "ecoIds": ["f_elephant", "f_snake_cobra", "f_monkey", "t_mountain", "t_plain", "c_flash_flood", "c_pm25"],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 18-34°C, ฤดูฝน ก.ค.-ก.ย.",
      "terrain": "แม่น้ำน่าน ล้อมรอบที่ราบและภูเขา",
      "bestSeason": "พ.ย.-ม.ค.",
      "emergencyContacts": []
    }
  },
  "Phichit": {
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
        "via": ["อยุธยา", "นครสวรรค์"],
        "departureTimes": ["08:00", "20:00"],
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
        "via": ["อยุธยา", "นครสวรรค์"],
        "departureTimes": ["07:45", "18:45"],
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
        "via": ["นครสวรรค์"],
        "departureTimes": ["09:00", "15:00"],
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
        "examples": ["โรงแรมศรีศาลา", "Pamukkale Guesthouse"],
        "bookingUrl": "https://www.booking.com/region/th/phichit.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["โรงแรมสุขุมวิท พิจิตร", "Pichit Nakorn Hotel"],
        "bookingUrl": "https://www.booking.com/region/th/phichit.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["Riverberry Farm & Resort", "โรงแรมศุภมาศรี"],
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
    "ecoIds": ["f_boar", "f_snake_cobra", "t_plain", "t_urban", "c_flash_flood"],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 17-33°C, ฝนชุก ก.ค.-ก.ย.",
      "terrain": "ที่ราบลุ่มแม่น้ำยมล้อมรอบภูเขา",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  },
  "Phetchabun": {
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
        "via": ["สระบุรี", "อุทัยธานี"],
        "departureTimes": ["10:00", "20:00"],
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
        "via": ["อยุธยา", "นครสวรรค์"],
        "departureTimes": ["09:30", "19:30"],
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
        "departureTimes": ["06:00", "12:00"],
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
        "examples": ["โรงแรมภูพิมาน คอนเวนชั่น", "เหล่าโรงแรมมหาชัย"],
        "bookingUrl": "https://www.booking.com/region/th/phetchabun.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["โรงแรมเมาท์เทน วิวท์ รีสอร์ท", "กาโม่ เดอ ปาย รีสอร์ท"],
        "bookingUrl": "https://www.booking.com/region/th/phetchabun.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["ภูน็อค รีสอร์ท", "เดอะ โอเรียนท์"],
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
    "ecoIds": ["f_monkey", "f_boar", "t_mountain", "t_rainforest", "c_flash_flood", "c_monsoon"],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 15-30°C, ฤดูหนาวหนาวจัด ธ.ค.-ม.ค.",
      "terrain": "ภูเขาสูง ป่าไม้หนาทึบ",
      "bestSeason": "ธ.ค.-ม.ค.",
      "emergencyContacts": []
    }
  },
  "Nakhon Sawan": {
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
        "via": ["อยุธยา"],
        "departureTimes": ["07:00", "18:00"],
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
        "via": ["อยุธยา"],
        "departureTimes": ["09:30", "20:30"],
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
        "departureTimes": ["08:00", "18:00"],
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
        "examples": ["Khum Nakorn Sawan Resort", "Green Place"],
        "bookingUrl": "https://www.booking.com/region/th/nakhon-sawan.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["Van Hotel and Residence", "Riverine Place"],
        "bookingUrl": "https://www.booking.com/region/th/nakhon-sawan.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["Paradise Mountain Resort", "Greenery Resort"],
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
    "ecoIds": ["f_elephant", "t_plain", "t_urban", "c_flash_flood", "c_pm25"],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 18-34°C, ฝนชุก ก.ค.-ก.ย.",
      "terrain": "ที่ราบลุ่มแม่น้ำยมและปิง",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  },
  "Uthai Thani": {
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
        "via": ["ลพบุรี", "สระบุรี"],
        "departureTimes": ["08:00", "17:00"],
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
        "via": ["อยุธยา", "นครสวรรค์"],
        "departureTimes": ["09:30", "19:30"],
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
        "departureTimes": ["07:00", "15:00"],
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
        "examples": ["TJ Boutique Hotel", "สะแกกรังฮาเฟ่น"],
        "bookingUrl": "https://www.booking.com/region/th/uthai-thani.html"
      },
      {
        "tier": "midrange",
        "label": "ปานกลาง",
        "priceRange": "800-1500฿/คืน",
        "examples": ["บริษัท ป.ณรงค์ โฮมสเตย์", "The Oriental Beach Resort"],
        "bookingUrl": "https://www.booking.com/region/th/uthai-thani.html"
      },
      {
        "tier": "premium",
        "label": "หรูหรา",
        "priceRange": "1500-3000฿/คืน",
        "examples": ["Green House Uthai Thani", "Sabua The Terrace Homestay"],
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
    "ecoIds": ["f_monkey", "t_plain", "c_flash_flood"],
    "newEcoEntities": [],
    "metadata": {
      "climate": "อุณหภูมิ 18-34°C, ฝนตกชุก ก.ค.-ก.ย.",
      "terrain": "ที่ราบลุ่ม แม่น้ำสะแกกรัง",
      "bestSeason": "พ.ย.-ก.พ.",
      "emergencyContacts": []
    }
  }
}
```