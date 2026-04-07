// Portal seed data: ภาคอีสานบน Part 2 (5 จังหวัด)
// Source: documents/deepreserach/part3_ภาคอีสานบน.md
import type { ProvincePortalSeedData } from './db';

export const isanUpper2: Record<string, ProvincePortalSeedData> = {
  "Sakon Nakhon": {
    transport: [
      { name: "ท่าอากาศยานสกลนคร", shortName: "สนามบิน", type: "plane", description: "สนามบินจังหวัดสกลนคร มีเที่ยวบินตรงจากกรุงเทพฯ", warpUrl: "https://www.airports.go.th/", logoText: "✈️", color: "#ef4444" },
      { name: "รถสองแถวในตัวเมืองสกลนคร", shortName: "สองแถว", type: "songthaew", description: "เดินทางในเมืองและไปจุดสำคัญ เช่น บขส.-ตลาด-มหาวิทยาลัย", warpUrl: "", logoText: "🛻", color: "#f97316" },
      { name: "รถตู้/รถมินิบัสคิวอำเภอ", shortName: "รถตู้", type: "van", description: "เชื่อมอำเภอพังโคน วานรนิวาส กุดบาก ฯลฯ", warpUrl: "", logoText: "🚐", color: "#06b6d4" },
      { name: "มอเตอร์ไซค์รับจ้าง/เช่ามอเตอร์ไซค์", shortName: "มอเตอร์ไซค์", type: "other", description: "เหมาะกับเข้าวัดป่า/เส้นทางชนบท", warpUrl: "", logoText: "🚗", color: "#64748b" },
      { name: "จักรยาน/เดินทางในเมือง", shortName: "จักรยาน", type: "bike", description: "โซนตัวเมืองระยะสั้นสามารถใช้จักรยานได้", warpUrl: "", logoText: "🚲", color: "#22c55e" }
    ],
    routes: [
      { name: "สาย 1: กรุงเทพฯ - สกลนคร (เครื่องบิน)", type: "plane", operator: "Nok Air / Thai AirAsia (ตามฤดูกาล)", from: "กรุงเทพฯ (DMK)", to: "สกลนคร (SNO)", via: [], departureTimes: ["07:05","12:10","18:20"], duration: "1 ชม. 10-20 นาที", baseFare: 1500, frequency: "หลายเที่ยว/วัน", terminal: "สนามบินดอนเมือง", notes: "ตารางบินเปลี่ยนได้บ่อย ควรตรวจสอบก่อนจอง" },
      { name: "สาย 2: กรุงเทพฯ - สกลนคร (รถทัวร์)", type: "coach", operator: "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน", from: "กรุงเทพฯ", to: "สกลนคร (บขส.สกล)", via: ["สระบุรี","นครราชสีมา","ขอนแก่น","อุดรธานี"], departureTimes: ["07:00","10:00","20:00"], duration: "10-12 ชม.", baseFare: 780, frequency: "หลายเที่ยว/วัน", terminal: "สถานีขนส่งหมอชิต 2", notes: null },
      { name: "สาย 3: อุดรธานี - สกลนคร (รถตู้/รถบัส)", type: "van", operator: "คิวรถตู้สายอุดรฯ-สกลฯ", from: "อุดรธานี", to: "สกลนคร", via: [], departureTimes: ["07:00","09:00","11:00","13:00","15:00"], duration: "3-4 ชม.", baseFare: 220, frequency: "หลายเที่ยว/วัน", terminal: "สถานีขนส่งผู้โดยสารอุดรธานี", notes: null },
      { name: "สาย 4: เมืองสกลนคร - อุทยานแห่งชาติภูพาน/วัดป่าในโซนภูพาน", type: "van", operator: "เหมารถ/รถสองแถว-รถตู้ท้องถิ่น", from: "สกลนคร (ตัวเมือง)", to: "โซนภูพาน", via: [], departureTimes: ["08:30","10:30","13:30"], duration: "1-2 ชม.", baseFare: 150, frequency: "เหมาวันสะดวก", terminal: "จุดนัดหมายในเมือง", notes: "เส้นทางธรรมชาติ/วัดป่าแนะนำไปเช้าและกลับก่อนค่ำ" }
    ],
    localFoods: [
      { name: "แกงหวาย", priceRange: "80-160฿", category: "local", note: "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู" },
      { name: "เนื้อโคขุนโพนยางคำ (เมนูย่าง/สเต๊ก/จิ้มแจ่ว)", priceRange: "150-450฿", category: "local", note: "สินค้าขึ้นชื่อและมีการขึ้นทะเบียน GI" },
      { name: "หมูยอ/ของฝากหมูยอสกลนคร", priceRange: "80-250฿", category: "local", note: "นิยมซื้อเป็นของฝากและทำเมนูยำ/ทอด" },
      { name: "ไก่ย่างพังโคน", priceRange: "120-220฿", category: "local", note: "อีกหนึ่งเมนูที่คนท้องถิ่นนิยมตามเส้นทางผ่านอ.พังโคน" },
      { name: "น้ำหมากเม่า (เครื่องดื่ม/ไวน์ผลไม้)", priceRange: "60-180฿", category: "drink", note: "ผลิตภัณฑ์จากผลหมากเม่าในภาคอีสาน" }
    ],
    accommodation: [
      { tier: "budget", label: "ประหยัด", priceRange: "450-900฿/คืน", examples: ["HOP INN Sakon Nakhon","Color Ville Hotel","โรงแรมอินทราเพลส"], bookingUrl: "https://www.booking.com/city/th/sakon-nakhon.th.html" },
      { tier: "midrange", label: "ปานกลาง", priceRange: "900-1,700฿/คืน", examples: ["Chokdee Place","At Sakon Hotel","The Room Boutique Hotel"], bookingUrl: "https://www.booking.com/city/th/sakon-nakhon.th.html" },
      { tier: "premium", label: "หรูหรา", priceRange: "1,700-3,200฿/คืน", examples: ["Tafah Residence","The Majestic Sakon Nakhon Hotel"], bookingUrl: "https://www.booking.com/city/th/sakon-nakhon.th.html" }
    ],
    dangerZones: [
      { label: "อากาศร้อนจัด/เสี่ยงฮีทสโตรก", severity: "medium", note: "ช่วงหน้าร้อนร้อนและอบอ้าว ควรหลบแดด", season: "มี.ค.-พ.ค." },
      { label: "PM2.5 จากการเผาในที่โล่ง", severity: "medium", note: "ปลายหนาว-หน้าแล้งฝุ่นสูงเป็นช่วง ๆ", season: "ธ.ค.-เม.ย." },
      { label: "เห็ดป่า/พืชป่าพิษ", severity: "medium", note: "หน้าฝนมีเห็ดหลากชนิด ต้องระวังเห็ดพิษ", season: "พ.ค.-ต.ค." },
      { label: "ฝนตกหนัก น้ำป่าไหลหลากบางพื้นที่ภูพาน", severity: "high", note: "พื้นที่ป่า-ภูเขาเสี่ยงน้ำป่าและถนนลื่น", season: "พ.ค.-ต.ค." }
    ],
    ecoIds: ["t_urban","t_mountain","c_heat_stroke","c_monsoon","c_flash_flood","c_pm25","fl_mushroom_poison","fl_bamboo","f_snake_green","f_dog_stray"],
    newEcoEntities: [],
    metadata: { climate: "อุณหภูมิประมาณ 14-39°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.", terrain: "ที่ราบสูงสลับเทือกเขาภูพานและป่า เหมาะกับสายธรรมชาติ-วัดป่า", bestSeason: "พ.ย.-ก.พ.", emergencyContacts: [] }
  },
  "Nakhon Phanom": {
    transport: [
      { name: "ท่าอากาศยานนครพนม", shortName: "สนามบิน", type: "plane", description: "สนามบินจังหวัดนครพนม มีเที่ยวบินตรงจากกรุงเทพฯ", warpUrl: "https://www.airports.go.th/", logoText: "✈️", color: "#ef4444" },
      { name: "รถสองแถว/รถโดยสารในตัวเมืองนครพนม", shortName: "สองแถว", type: "songthaew", description: "วิ่งในเมืองและไปจุดสำคัญ เช่น ตลาด-ริมโขง-บขส.", warpUrl: "", logoText: "🛻", color: "#f97316" },
      { name: "รถตู้/รถมินิบัสสายอำเภอ (ธาตุพนม-เรณูนคร-นาแก)", shortName: "รถตู้", type: "van", description: "เชื่อมแหล่งท่องเที่ยวสำคัญและชุมชนไทญ้อ", warpUrl: "", logoText: "🚐", color: "#06b6d4" },
      { name: "จักรยาน/เลนปั่นเลียบโขง", shortName: "จักรยาน", type: "bike", description: "ระบบทางเดิน-ทางจักรยานเลียบโขงเหมาะกับเที่ยวในเมือง", warpUrl: "", logoText: "🚲", color: "#22c55e" },
      { name: "เรือนำเที่ยวแม่น้ำโขง (บางฤดูกาล)", shortName: "เรือ", type: "boat", description: "ล่องชมวิวริมโขง (ขึ้นกับฤดูกาลและผู้ให้บริการ)", warpUrl: "", logoText: "⛴️", color: "#0ea5e9" }
    ],
    routes: [
      { name: "สาย 1: กรุงเทพฯ - นครพนม (เครื่องบิน)", type: "plane", operator: "Thai AirAsia / Thai Lion Air (หลัก)", from: "กรุงเทพฯ (DMK)", to: "นครพนม (KOP)", via: [], departureTimes: ["07:10","12:20","18:00"], duration: "1 ชม. 15-20 นาที", baseFare: 1200, frequency: "หลายเที่ยว/วัน", terminal: "สนามบินดอนเมือง", notes: "สายการบิน/ความถี่อาจเปลี่ยนตามฤดูกาล" },
      { name: "สาย 2: กรุงเทพฯ - นครพนม (รถทัวร์)", type: "coach", operator: "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน", from: "กรุงเทพฯ", to: "นครพนม (บขส.นครพนม)", via: ["สระบุรี","นครราชสีมา","ขอนแก่น","อุดรธานี","สกลนคร"], departureTimes: ["07:00","10:00","19:30"], duration: "11-13 ชม.", baseFare: 850, frequency: "หลายเที่ยว/วัน", terminal: "สถานีขนส่งหมอชิต 2", notes: null },
      { name: "สาย 3: เมืองนครพนม - ธาตุพนม", type: "van", operator: "คิวรถตู้เมืองนครพนม-ธาตุพนม", from: "นครพนม (ตัวเมือง)", to: "อ.ธาตุพนม", via: [], departureTimes: ["07:30","09:30","11:30","13:30","15:30"], duration: "1-1.5 ชม.", baseFare: 80, frequency: "ประมาณทุก 1 ชม.", terminal: "คิวรถตู้/สถานีขนส่งนครพนม", notes: null },
      { name: "สาย 4: เมืองนครพนม - เรณูนคร", type: "van", operator: "รถตู้ท้องถิ่น", from: "นครพนม (ตัวเมือง)", to: "อ.เรณูนคร", via: [], departureTimes: ["08:00","10:00","13:00","15:00"], duration: "1.5-2 ชม.", baseFare: 100, frequency: "หลายเที่ยว/วัน", terminal: "คิวรถตู้ในเมือง/สถานีขนส่ง", notes: null }
    ],
    localFoods: [
      { name: "เมี่ยงตาสวด", priceRange: "80-160฿", category: "local", note: "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู" },
      { name: "หมกเจาะ (อาหารพื้นถิ่นไทญ้อ)", priceRange: "80-180฿", category: "local", note: "เมนูขึ้นชื่อของชุมชนไทญ้อ โดยเฉพาะโซนท่าอุเทน" },
      { name: "หมูยอนครพนม (เช่น หมูยอป้ายุง)", priceRange: "80-250฿", category: "local", note: "ของฝากเด่นของนครพนม" },
      { name: "ข้าวปุ้นน้ำนัว/ข้าวปุ้นน้ำแจ่ว (เรณูนคร)", priceRange: "60-120฿", category: "street", note: "อิทธิพลอาหารเวียดนาม-ลุ่มโขงในพื้นที่" },
      { name: "ลิ้นจี่นครพนม (ผลไม้ GI)", priceRange: "80-200฿", category: "dessert", note: "ผลไม้ GI ของจังหวัด (ตามฤดูกาล)" }
    ],
    accommodation: [
      { tier: "budget", label: "ประหยัด", priceRange: "450-1,000฿/คืน", examples: ["HOP INN Nakhon Phanom","Windsor Hotel","U- Homehotel Nakhonpanom"], bookingUrl: "https://www.booking.com/city/th/nakhon-phanom.th.html" },
      { tier: "midrange", label: "ปานกลาง", priceRange: "1,000-2,000฿/คืน", examples: ["Blu Hotel","The Square Hotel","I Hotel Nakhon Phanom"], bookingUrl: "https://www.booking.com/city/th/nakhon-phanom.th.html" },
      { tier: "premium", label: "หรูหรา", priceRange: "2,000-4,500฿/คืน", examples: ["Fortune River View Hotel Nakhon Phanom","The River Hotel"], bookingUrl: "https://www.booking.com/city/th/nakhon-phanom.th.html" }
    ],
    dangerZones: [
      { label: "น้ำหลากริมโขง/น้ำท่วมตลิ่ง", severity: "medium", note: "ฤดูฝนอาจมีน้ำเอ่อล้นตลิ่งและทางเดินริมโขงบางช่วงปิด", season: "ส.ค.-ต.ค." },
      { label: "อากาศร้อนจัด/เสี่ยงฮีทสโตรก", severity: "medium", note: "กลางวันร้อนจัดช่วงหน้าแล้ง", season: "มี.ค.-พ.ค." },
      { label: "PM2.5 จากการเผาในที่โล่ง", severity: "medium", note: "ปลายหนาว-หน้าแล้งฝุ่นสูงได้", season: "ธ.ค.-เม.ย." },
      { label: "ฝนตกหนัก/พายุฝนฟ้าคะนอง", severity: "medium", note: "มรสุมทำให้ฝนตกหนักเป็นช่วง ๆ", season: "พ.ค.-ต.ค." }
    ],
    ecoIds: ["t_urban","c_heat_stroke","c_monsoon","c_flash_flood","c_pm25","f_dog_stray","f_snake_cobra","fl_yanang","t_mekong_river"],
    newEcoEntities: [{ id: "t_mekong_river", name: "แม่น้ำโขง", category: "terrain", tags: ["danger","common","seasonal"], desc: "นครพนมมีทางเดินและเส้นทางจักรยานเลียบริมโขง เป็นจุดท่องเที่ยวสำคัญ" }],
    metadata: { climate: "อุณหภูมิประมาณ 14-38°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.", terrain: "เมืองริมโขง มีพื้นที่ราบสูงสลับลุ่มน้ำและเส้นทางท่องเที่ยวเลียบแม่น้ำ", bestSeason: "พ.ย.-ก.พ.", emergencyContacts: [] }
  },
  "Mukdahan": {
    transport: [
      { name: "รถสองแถวในตัวเมืองมุกดาหาร", shortName: "สองแถว", type: "songthaew", description: "วิ่งในเมืองและเชื่อมจุดสำคัญ เช่น ตลาดราตรี-บขส.-สะพานมิตรภาพฯ", warpUrl: "", logoText: "🛻", color: "#f97316" },
      { name: "รถสามล้อเครื่อง/รถรับจ้างในเมืองมุกดาหาร", shortName: "รถรับจ้าง", type: "tuk_tuk", description: "เหมาะกับระยะสั้นในเมือง/ย่านท่องเที่ยว", warpUrl: "", logoText: "🛺", color: "#a855f7" },
      { name: "รถตู้/รถมินิบัสเชื่อมจังหวัดใกล้เคียง", shortName: "รถตู้", type: "van", description: "เชื่อมกาฬสินธุ์ สกลนคร นครพนม และอุบลฯตามคิวรถ", warpUrl: "", logoText: "🚐", color: "#06b6d4" },
      { name: "รถโดยสารระหว่างจังหวัด (บขส./เอกชน)", shortName: "รถทัวร์", type: "bus", description: "เดินทางระยะไกล เช่น กรุงเทพฯ-มุกดาหาร", warpUrl: "", logoText: "🚌", color: "#3b82f6" },
      { name: "เรือนำเที่ยวแม่น้ำโขง (บางฤดูกาล)", shortName: "เรือ", type: "boat", description: "ล่องชมวิวโขง/แก่งกะเบา ขึ้นกับฤดูกาลและระดับน้ำ", warpUrl: "", logoText: "⛴️", color: "#0ea5e9" }
    ],
    routes: [
      { name: "สาย 1: กรุงเทพฯ - มุกดาหาร (รถทัวร์)", type: "coach", operator: "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน", from: "กรุงเทพฯ", to: "มุกดาหาร (บขส.มุกดาหาร)", via: ["สระบุรี","นครราชสีมา","ขอนแก่น","กาฬสินธุ์"], departureTimes: ["07:00","10:00","20:00"], duration: "10-12 ชม.", baseFare: 780, frequency: "หลายเที่ยว/วัน", terminal: "สถานีขนส่งหมอชิต 2", notes: null },
      { name: "สาย 2: ขอนแก่น - มุกดาหาร (รถตู้/รถบัส)", type: "van", operator: "คิวรถตู้/รถบัสท้องถิ่น", from: "ขอนแก่น", to: "มุกดาหาร", via: ["มหาสารคาม","กาฬสินธุ์"], departureTimes: ["08:00","11:00","14:00","17:00"], duration: "4-6 ชม.", baseFare: 280, frequency: "หลายเที่ยว/วัน", terminal: "สถานีขนส่ง จ.ขอนแก่น (บขส.3)", notes: null },
      { name: "สาย 3: มุกดาหาร - นครพนม (รถตู้/รถบัส)", type: "van", operator: "คิวรถตู้สายมุกดาหาร-นครพนม", from: "มุกดาหาร", to: "นครพนม", via: [], departureTimes: ["08:00","10:00","12:00","14:00","16:00"], duration: "2-3 ชม.", baseFare: 140, frequency: "หลายเที่ยว/วัน", terminal: "สถานีขนส่งมุกดาหาร", notes: null },
      { name: "สาย 4: ตัวเมืองมุกดาหาร - ห้าแยกเวียดนาม (ตลาดเช้า)", type: "bus", operator: "รถสองแถว/รถรับจ้างในเมือง", from: "ตัวเมืองมุกดาหาร", to: "ห้าแยกเวียดนาม", via: [], departureTimes: ["06:30","08:00","10:00"], duration: "10-20 นาที", baseFare: 20, frequency: "วิ่งถี่ช่วงเช้า", terminal: "จุดจอดในเมือง", notes: "เหมาะไปตลาดอาหารเช้า ควรไปเช้า" }
    ],
    localFoods: [
      { name: "ตำเมี่ยงตะไคร้ ลำข่าสดใส่มดแดง", priceRange: "80-160฿", category: "local", note: "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู" },
      { name: "ข้าวเปียก (ตลาดเช้าห้าแยกเวียดนาม)", priceRange: "50-90฿", category: "street", note: "อาหารเช้าขึ้นชื่อของมุกดาหาร" },
      { name: "ก๋วยจั๊บญวน (ชุมชนเวียดนาม)", priceRange: "60-120฿", category: "street", note: "เมนูเส้นน้ำซุปหอม นิยมในโซนชุมชนเวียดนาม" },
      { name: "เลือดแปลง", priceRange: "50-100฿", category: "street", note: "อาหารเช้าท้องถิ่นที่พบในตลาดเช้า" },
      { name: "หมูยอ/ของฝากโซนตลาดราตรีมุกดาหาร", priceRange: "80-250฿", category: "local", note: "ย่านตลาดราตรีมีของฝากอาหารหลากหลาย" }
    ],
    accommodation: [
      { tier: "budget", label: "ประหยัด", priceRange: "450-1,000฿/คืน", examples: ["Vieng Khong Hotel","Mukdaview Hotel","River City Hotel"], bookingUrl: "https://www.booking.com/city/th/mukdahan.th.html" },
      { tier: "midrange", label: "ปานกลาง", priceRange: "1,000-2,000฿/คืน", examples: ["Ploy Palace Hotel","Mukdahan Grand Hotel","Hotel Muq"], bookingUrl: "https://www.booking.com/city/th/mukdahan.th.html" },
      { tier: "premium", label: "หรูหรา", priceRange: "2,000-4,500฿/คืน", examples: ["Hotel de Ladda","Isaan Country Retreat"], bookingUrl: "https://www.booking.com/city/th/mukdahan.th.html" }
    ],
    dangerZones: [
      { label: "น้ำหลาก/ตลิ่งริมโขงลื่น", severity: "medium", note: "ทางเดินริมน้ำและท่าน้ำอาจลื่น โดยเฉพาะฤดูฝน", season: "พ.ค.-ต.ค." },
      { label: "อากาศร้อนจัด/เสี่ยงฮีทสโตรก", severity: "medium", note: "ร้อนอบอ้าวช่วงหน้าแล้ง", season: "มี.ค.-พ.ค." },
      { label: "PM2.5 จากการเผาในที่โล่ง", severity: "medium", note: "ปลายหนาว-หน้าแล้งฝุ่นสูงได้", season: "ธ.ค.-เม.ย." },
      { label: "พายุฝนฟ้าคะนองฉับพลัน", severity: "medium", note: "ช่วงเปลี่ยนฤดูมีฝนหนักและลมแรง", season: "มี.ค.-พ.ค." }
    ],
    ecoIds: ["t_urban","c_heat_stroke","c_monsoon","c_flash_flood","c_pm25","f_dog_stray","f_snake_green","fl_yanang","t_mekong_river"],
    newEcoEntities: [{ id: "t_mekong_river", name: "แม่น้ำโขง", category: "terrain", tags: ["danger","common","seasonal"], desc: "มุกดาหารเป็นจังหวัดริมโขงและมีจุดท่องเที่ยวที่สัมพันธ์กับระดับน้ำ" }],
    metadata: { climate: "อุณหภูมิประมาณ 15-39°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.", terrain: "เมืองชายแดนริมโขง เน้นเส้นทางค้าชายแดนและวัฒนธรรมหลากหลายชาติพันธุ์", bestSeason: "พ.ย.-ก.พ.", emergencyContacts: [] }
  },
  "Kalasin": {
    transport: [
      { name: "รถสองแถว/รถโดยสารในตัวเมืองกาฬสินธุ์", shortName: "สองแถว", type: "songthaew", description: "ใช้เดินทางในเมืองและไปอำเภอใกล้เคียง", warpUrl: "", logoText: "🛻", color: "#f97316" },
      { name: "รถตู้/รถมินิบัสเชื่อมขอนแก่น-มหาสารคาม-กาฬสินธุ์", shortName: "รถตู้", type: "van", description: "ทางเลือกหลักสำหรับต่อจากเมืองหลัก/สถานีขนส่ง", warpUrl: "", logoText: "🚐", color: "#06b6d4" },
      { name: "รถโดยสารระหว่างจังหวัด (บขส./เอกชน)", shortName: "รถทัวร์", type: "bus", description: "เดินทางไกล เช่น กรุงเทพฯ-กาฬสินธุ์", warpUrl: "", logoText: "🚌", color: "#3b82f6" },
      { name: "มอเตอร์ไซค์รับจ้าง/เช่ามอเตอร์ไซค์", shortName: "มอเตอร์ไซค์", type: "other", description: "เหมาะกับไปเขื่อนลำปาว/พิพิธภัณฑ์สิรินธร/แหล่งท่องเที่ยวกระจายตัว", warpUrl: "", logoText: "🚗", color: "#64748b" }
    ],
    routes: [
      { name: "สาย 1: กรุงเทพฯ - กาฬสินธุ์ (รถทัวร์)", type: "coach", operator: "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน", from: "กรุงเทพฯ", to: "กาฬสินธุ์ (บขส.กาฬสินธุ์)", via: ["สระบุรี","นครราชสีมา","ขอนแก่น","มหาสารคาม"], departureTimes: ["07:00","10:00","20:00"], duration: "8-10 ชม.", baseFare: 600, frequency: "หลายเที่ยว/วัน", terminal: "สถานีขนส่งหมอชิต 2", notes: null },
      { name: "สาย 2: ขอนแก่น - กาฬสินธุ์ (รถตู้/รถบัส)", type: "van", operator: "คิวรถตู้/รถบัสท้องถิ่น", from: "ขอนแก่น", to: "กาฬสินธุ์", via: ["มหาสารคาม"], departureTimes: ["08:00","10:00","12:00","14:00","16:00"], duration: "2.5-3.5 ชม.", baseFare: 160, frequency: "หลายเที่ยว/วัน", terminal: "สถานีขนส่ง จ.ขอนแก่น (บขส.3)", notes: null },
      { name: "สาย 3: กาฬสินธุ์ - พิพิธภัณฑ์สิรินธร (สหัสขันธ์)", type: "van", operator: "รถตู้/รถสองแถวท้องถิ่น", from: "ตัวเมืองกาฬสินธุ์", to: "อ.สหัสขันธ์", via: [], departureTimes: ["09:00","11:00","13:00","15:00"], duration: "1-1.5 ชม.", baseFare: 60, frequency: "หลายเที่ยว/วัน", terminal: "คิวรถท้องถิ่นในเมือง/สถานีขนส่ง", notes: "เหมาะไปพิพิธภัณฑ์ไดโนเสาร์และแหล่งท่องเที่ยวใกล้เคียง" },
      { name: "สาย 4: กาฬสินธุ์ - เขื่อนลำปาว", type: "van", operator: "เหมารถ/รถท้องถิ่น", from: "ตัวเมืองกาฬสินธุ์", to: "เขื่อนลำปาว", via: [], departureTimes: ["10:00","13:00","16:00"], duration: "40-60 นาที", baseFare: 80, frequency: "เที่ยวจำกัด/เหมารถสะดวก", terminal: "จุดนัดหมายในเมือง", notes: null }
    ],
    localFoods: [
      { name: "ข้าวแดะงา", priceRange: "30-70฿", category: "street", note: "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู" },
      { name: "กุ้งก้ามกรามกาฬสินธุ์ (ย่าง/เผา/อบ)", priceRange: "250-650฿", category: "local", note: "สินค้าขึ้นทะเบียน GI จุดเด่นเนื้อหวานแน่น" },
      { name: "ไส้กรอกปลากาฬสินธุ์", priceRange: "35-80฿", category: "street", note: "ของกิน/ของฝากที่ถูกกล่าวถึงในงานอาหารอีสานของ ททท." },
      { name: "ข้าวเหนียวเขาวง (ของฝาก/เมนูข้าวเหนียว)", priceRange: "40-120฿", category: "local", note: "ผลิตภัณฑ์ท้องถิ่นของอำเภอเขาวง" },
      { name: "ปลาน้ำจืด/ปลาเผาโซนลำปาว (ตามฤดูกาล)", priceRange: "120-250฿", category: "local", note: "นิยมตามร้านริมเขื่อนและตลาดท้องถิ่น" }
    ],
    accommodation: [
      { tier: "budget", label: "ประหยัด", priceRange: "400-900฿/คืน", examples: ["TK residence","JS Motel","Supak Hotel"], bookingUrl: "https://www.booking.com/city/th/kalasin.th.html" },
      { tier: "midrange", label: "ปานกลาง", priceRange: "900-1,900฿/คืน", examples: ["Rimpao Hotel","Chada View Resort","Supak Hotel"], bookingUrl: "https://www.booking.com/city/th/kalasin.th.html" },
      { tier: "premium", label: "หรูหรา", priceRange: "1,900-3,800฿/คืน", examples: ["Romlaphass Boutique Villa","Rimpao Hotel"], bookingUrl: "https://www.booking.com/city/th/kalasin.th.html" }
    ],
    dangerZones: [
      { label: "อากาศร้อนจัด/เสี่ยงฮีทสโตรก", severity: "medium", note: "แดดแรงช่วงหน้าแล้ง โดยเฉพาะเที่ยวเขื่อน/แหล่งกลางแจ้ง", season: "มี.ค.-พ.ค." },
      { label: "PM2.5 จากการเผาในที่โล่ง", severity: "medium", note: "ปลายหนาว-หน้าแล้งฝุ่นสูงเป็นช่วง ๆ", season: "ธ.ค.-เม.ย." },
      { label: "ฝนตกหนัก/น้ำท่วมขังในพื้นที่ลุ่ม", severity: "medium", note: "ฤดูฝนเสี่ยงน้ำท่วมขังและถนนลื่น", season: "พ.ค.-ต.ค." },
      { label: "อุบัติเหตุทางถนนในเส้นทางต่างอำเภอ", severity: "medium", note: "ถนนระหว่างอำเภอวิ่งเร็ว ควรขับระวังและหลีกเลี่ยงกลางคืน", season: null }
    ],
    ecoIds: ["t_urban","c_heat_stroke","c_monsoon","c_flash_flood","c_pm25","f_dog_stray","f_snake_green","fl_yanang"],
    newEcoEntities: [],
    metadata: { climate: "อุณหภูมิประมาณ 15-39°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.", terrain: "ที่ราบสูงอีสาน มีแหล่งน้ำสำคัญอย่างเขื่อนลำปาว และแหล่งไดโนเสาร์/ภูเขาเตี้ยบางพื้นที่", bestSeason: "พ.ย.-ก.พ.", emergencyContacts: [] }
  },
  "Bueng Kan": {
    transport: [
      { name: "รถสองแถว/รถโดยสารในตัวเมืองบึงกาฬ", shortName: "สองแถว", type: "songthaew", description: "เดินทางในเมืองและไปจุดสำคัญ เช่น ตลาดเช้า-บขส.-ริมโขง", warpUrl: "", logoText: "🛻", color: "#f97316" },
      { name: "รถตู้/รถมินิบัสเชื่อมอุดรธานี-หนองคาย-บึงกาฬ", shortName: "รถตู้", type: "van", description: "เป็นทางเลือกหลักเพราะไม่มีสนามบิน/รถไฟ", warpUrl: "", logoText: "🚐", color: "#06b6d4" },
      { name: "มอเตอร์ไซค์รับจ้าง/เช่ามอเตอร์ไซค์", shortName: "มอเตอร์ไซค์", type: "other", description: "เหมาะไปภูทอก-บึงโขงหลง-จุดธรรมชาติที่รถสาธารณะมีจำกัด", warpUrl: "", logoText: "🚗", color: "#64748b" },
      { name: "เรือนำเที่ยวแม่น้ำโขง (บางฤดูกาล)", shortName: "เรือ", type: "boat", description: "ล่องชมวิวริมโขง/แก่งอาฮง ขึ้นกับฤดูกาลและผู้ให้บริการ", warpUrl: "", logoText: "⛴️", color: "#0ea5e9" },
      { name: "จักรยาน/เดินเล่นเลียบโขงในเมือง", shortName: "จักรยาน", type: "bike", description: "โซนเมืองมีทางเดินเลียบโขงเหมาะกับเดิน/ปั่น", warpUrl: "", logoText: "🚲", color: "#22c55e" }
    ],
    routes: [
      { name: "สาย 1: กรุงเทพฯ - บึงกาฬ (รถทัวร์)", type: "coach", operator: "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน", from: "กรุงเทพฯ", to: "บึงกาฬ (บขส.บึงกาฬ)", via: ["สระบุรี","นครราชสีมา","ขอนแก่น","อุดรธานี"], departureTimes: ["07:00","10:00","20:00"], duration: "11-13 ชม.", baseFare: 880, frequency: "วันละหลายเที่ยว", terminal: "สถานีขนส่งหมอชิต 2", notes: null },
      { name: "สาย 2: อุดรธานี - บึงกาฬ (รถตู้/รถบัส)", type: "van", operator: "คิวรถตู้สายอุดรฯ-บึงกาฬ", from: "อุดรธานี", to: "บึงกาฬ", via: ["หนองคาย (บางเที่ยว)"], departureTimes: ["07:00","09:00","11:00","13:00","15:00"], duration: "2.5-3.5 ชม.", baseFare: 180, frequency: "ประมาณทุก 1 ชม.", terminal: "สถานีขนส่งผู้โดยสารอุดรธานี", notes: null },
      { name: "สาย 3: เมืองบึงกาฬ - ภูทอก", type: "van", operator: "รถตู้ท้องถิ่น/เหมารถ", from: "บึงกาฬ (ตัวเมือง)", to: "ภูทอก", via: [], departureTimes: ["08:00","10:00","13:00"], duration: "45-75 นาที", baseFare: 120, frequency: "เที่ยวจำกัด/เหมารถสะดวก", terminal: "จุดนัดหมายในเมือง", notes: "เส้นทางขึ้นภูมีช่วงชัน ควรไปเช้า" },
      { name: "สาย 4: เมืองบึงกาฬ - บึงโขงหลง/ถ้ำนาคา", type: "van", operator: "รถตู้ท้องถิ่น/เหมารถ", from: "บึงกาฬ (ตัวเมือง)", to: "บึงโขงหลง", via: [], departureTimes: ["08:30","11:00","14:00"], duration: "1.5-2.5 ชม.", baseFare: 200, frequency: "เหมาวันสะดวก", terminal: "จุดนัดหมายในเมือง", notes: "ช่วงท่องเที่ยวถ้ำนาคาแนะนำจองรถล่วงหน้า" }
    ],
    localFoods: [
      { name: "หมกหม้อปลาน้ำโขง", priceRange: "120-250฿", category: "local", note: "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู" },
      { name: "สับปะรดบึงกาฬ (ผลไม้ GI)", priceRange: "40-120฿", category: "dessert", note: "สับปะรดพันธุ์ปัตตาเวียที่ขึ้นทะเบียน GI" },
      { name: "จิ้มจุ่มปลาแม่น้ำโขง/ปลาแม่น้ำลวกจิ้ม", priceRange: "180-450฿", category: "local", note: "เมนูปลาแม่น้ำโขงที่ถูกแนะนำในบทความท่องเที่ยวบึงกาฬ" },
      { name: "แหนมบึงกาฬ (ของฝาก)", priceRange: "60-180฿", category: "local", note: "มีร้านของฝากชื่อดังหลายเจ้าในจังหวัด" },
      { name: "อาหารอีสานรสจัด (ลาบ/น้ำตก/ส้มตำ) โซนริมโขง", priceRange: "50-150฿", category: "street", note: "นิยมในร้านอาหารริมฝั่งโขง" }
    ],
    accommodation: [
      { tier: "budget", label: "ประหยัด", priceRange: "450-1,000฿/คืน", examples: ["Century Grand Hotel","Thorsangpruksa Hotel","Finn Hotel"], bookingUrl: "https://www.booking.com/region/th/bueng-kan.th.html" },
      { tier: "midrange", label: "ปานกลาง", priceRange: "1,000-2,000฿/คืน", examples: ["The One Hotel","Kongkhamkoon Hotel","ชมวิว บึงโขงหลง"], bookingUrl: "https://www.booking.com/region/th/bueng-kan.th.html" },
      { tier: "premium", label: "หรูหรา", priceRange: "2,000-4,500฿/คืน", examples: ["The One Hotel","LAKE HOUSE Naka Cave"], bookingUrl: "https://www.booking.com/region/th/bueng-kan.th.html" }
    ],
    dangerZones: [
      { label: "เส้นทางเดินเขา/หน้าผา (ภูทอก-ถ้ำนาคา)", severity: "high", note: "ทางเดินบางช่วงชันและลื่น ควรใส่รองเท้ากันลื่นและทำตามคำแนะนำเจ้าหน้าที่", season: null },
      { label: "ฝนตกหนัก น้ำป่าไหลหลาก/ทางน้ำตก", severity: "high", note: "ฤดูฝนอาจเกิดน้ำป่าและเส้นทางปิดชั่วคราว", season: "พ.ค.-ต.ค." },
      { label: "กระแสน้ำแม่น้ำโขง/ระดับน้ำผันผวน", severity: "medium", note: "กิจกรรมริมน้ำควรระมัดระวังเป็นพิเศษช่วงน้ำหลาก", season: "พ.ค.-ต.ค." },
      { label: "PM2.5 จากการเผาในที่โล่ง", severity: "medium", note: "ปลายหนาว-หน้าแล้งฝุ่นสูงได้", season: "ธ.ค.-เม.ย." }
    ],
    ecoIds: ["t_urban","t_mountain","c_heat_stroke","c_monsoon","c_flash_flood","c_pm25","f_snake_cobra","f_dog_stray","fl_mushroom_poison","fl_bamboo","t_mekong_river"],
    newEcoEntities: [
      { id: "t_mekong_river", name: "แม่น้ำโขง", category: "terrain", tags: ["danger","common","seasonal"], desc: "บึงกาฬติดแม่น้ำโขง มีแหล่งท่องเที่ยวริมโขงและแก่งอาฮง" },
      { id: "f_mekong_fish", name: "ปลาน้ำโขง (ปลาแม่น้ำตามฤดูกาล)", category: "fauna", tags: ["common","seasonal","edible"], desc: "แม่น้ำโขงอุดมด้วยปลาน้ำจืดหลากชนิด วัตถุดิบจะเปลี่ยนตามฤดูกาลน้ำ" }
    ],
    metadata: { climate: "อุณหภูมิประมาณ 15-39°C, ร้อนมี.ค.-พ.ค., ฝนพ.ค.-ต.ค., เย็นต.ค.-ก.พ.", terrain: "จังหวัดใหม่ริมโขง มีภูเขา น้ำตก และป่าดงดิบ (เช่น ภูวัว) สลับพื้นที่เมืองและเกษตร", bestSeason: "พ.ย.-ก.พ.", emergencyContacts: [] }
  }
};
