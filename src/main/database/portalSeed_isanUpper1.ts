// Portal seed data: ภาคอีสานบน Part 1 (5 จังหวัด)
// Source: documents/deepreserach/part3_ภาคอีสานบน.md
import type { ProvincePortalSeedData } from './db';

export const isanUpper1: Record<string, ProvincePortalSeedData> = {
  "Khon Kaen": {
    transport: [
      { name: "สนามบินขอนแก่น", shortName: "สนามบิน", type: "plane", description: "สนามบินภายในประเทศ ใช้ต่อเครื่องบินจากกรุงเทพฯได้สะดวก", warpUrl: "https://www.airports.go.th/", logoText: "✈️", color: "#ef4444" },
      { name: "รถไฟทางไกลสายตะวันออกเฉียงเหนือ (สถานีขอนแก่น)", shortName: "รถไฟ", type: "rail", description: "มีขบวนรถไฟจากกรุงเทพฯและเมืองหลักตามแนวสายอีสาน", warpUrl: "https://www.railway.co.th/", logoText: "🚆", color: "#1f2937" },
      { name: "รถโดยสารประจำทาง/รถซิตี้บัสเมืองขอนแก่น", shortName: "รถบัส", type: "bus", description: "ใช้เดินทางในตัวเมืองและเชื่อมจุดสำคัญ เช่น มหาวิทยาลัย-ห้าง-สถานีขนส่ง", warpUrl: "", logoText: "🚌", color: "#3b82f6" },
      { name: "รถสองแถวในตัวเมืองขอนแก่น", shortName: "สองแถว", type: "songthaew", description: "วิ่งตามสายหลักในเมืองและบางอำเภอ เหมาะกับเที่ยวระยะสั้น", warpUrl: "", logoText: "🛻", color: "#f97316" },
      { name: "รถตุ๊กตุ๊ก/สามล้อเครื่องในเมืองขอนแก่น", shortName: "ตุ๊กตุ๊ก", type: "tuk_tuk", description: "เรียกใช้ได้ตามย่านชุมชน ต่อรองราคา/กดมิเตอร์ตามพื้นที่", warpUrl: "", logoText: "🛺", color: "#a855f7" }
    ],
    routes: [
      { name: "สาย 1: กรุงเทพฯ - ขอนแก่น (เครื่องบิน)", type: "plane", operator: "Thai AirAsia / Thai Vietjet / Thai Lion Air (ตามฤดูกาล)", from: "กรุงเทพฯ (DMK/BKK)", to: "ขอนแก่น (KKC)", via: [], departureTimes: ["07:00","11:30","19:00"], duration: "1 ชม. 00-15 นาที", baseFare: 1200, frequency: "หลายเที่ยว/วัน", terminal: "สนามบินดอนเมือง/สุวรรณภูมิ", notes: "ตารางบินและสายการบินเปลี่ยนได้บ่อย ให้ตรวจสอบก่อนจอง" },
      { name: "สาย 2: กรุงเทพฯ - ขอนแก่น (รถทัวร์)", type: "coach", operator: "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน", from: "กรุงเทพฯ", to: "ขอนแก่น (บขส.3)", via: ["สระบุรี","นครราชสีมา"], departureTimes: ["07:00","10:00","20:30"], duration: "6-7 ชม.", baseFare: 520, frequency: "ประมาณทุก 1-2 ชม.", terminal: "สถานีขนส่งหมอชิต 2", notes: null },
      { name: "สาย 3: กรุงเทพฯ - ขอนแก่น (รถไฟ)", type: "train", operator: "การรถไฟแห่งประเทศไทย (SRT)", from: "กรุงเทพฯ (สถานีกลางกรุงเทพอภิวัฒน์)", to: "ขอนแก่น (สถานีขอนแก่น)", via: ["สระบุรี","นครราชสีมา"], departureTimes: ["08:45","20:30"], duration: "7-9 ชม.", baseFare: 300, frequency: "หลายขบวน/วัน", terminal: "สถานีกลางกรุงเทพอภิวัฒน์", notes: "ราคา/เวลาขึ้นกับชั้นรถและขบวน" },
      { name: "สาย 4: เมืองขอนแก่น - ภูเวียง/พิพิธภัณฑ์ไดโนเสาร์ภูเวียง", type: "bus", operator: "รถโดยสารท้องถิ่น/คิวรถ บขส.ขอนแก่น", from: "ขอนแก่น (บขส.3)", to: "อ.ภูเวียง", via: [], departureTimes: ["07:30","10:00","13:30"], duration: "1.5-2 ชม.", baseFare: 70, frequency: "หลายเที่ยว/วัน", terminal: "สถานีขนส่งผู้โดยสาร จ.ขอนแก่น แห่งที่ 3", notes: "เหมาะต่อไปพิพิธภัณฑ์/แหล่งไดโนเสาร์ ควรถามรอบสุดท้ายที่คิวรถ" }
    ],
    localFoods: [
      { name: "ปลาแดกบองสมุนไพร", priceRange: "40-80฿", category: "local", note: "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู" },
      { name: "ไก่ย่างเขาสวนกวาง", priceRange: "120-220฿", category: "local", note: "ของขึ้นชื่อขอนแก่น มีงานเทศกาลไก่ย่างเขาสวนกวาง" },
      { name: "ส้มตำปลาร้าขอนแก่น (แนวปลาร้าเข้ม)", priceRange: "40-70฿", category: "street", note: "นิยมกินคู่ไก่ย่าง/ลาบ" },
      { name: "ลาบหมู/ลาบเป็ดแบบอีสาน (ข้าวคั่วหอม)", priceRange: "50-100฿", category: "street", note: null },
      { name: "ข้าวจี่ (ข้าวเหนียวย่างทาไข่)", priceRange: "15-30฿", category: "street", note: "พบมากช่วงหน้าหนาวและงานวัด" }
    ],
    accommodation: [
      { tier: "budget", label: "ประหยัด", priceRange: "450-900฿/คืน", examples: ["HOP INN Khon Kaen","Khonkaen Residence","Family Hotel Khon Kaen"], bookingUrl: "https://www.booking.com/city/th/khon-kaen.th.html" },
      { tier: "midrange", label: "ปานกลาง", priceRange: "900-1,900฿/คืน", examples: ["Kosa Hotel","Le cassia Hotel","The Cotton Tree Hometel"], bookingUrl: "https://www.booking.com/city/th/khon-kaen.th.html" },
      { tier: "premium", label: "หรูหรา", priceRange: "2,000-4,500฿/คืน", examples: ["Avani Khon Kaen Hotel & Convention Centre","The Heritage Grand Khon Kaen Hotel and Convention"], bookingUrl: "https://www.booking.com/city/th/khon-kaen.th.html" }
    ],
    dangerZones: [
      { label: "อากาศร้อนจัด/เสี่ยงฮีทสโตรก", severity: "medium", note: "ช่วงหน้าร้อนอีสานอุณหภูมิสูง ควรดื่มน้ำและหลบแดด", season: "มี.ค.-พ.ค." },
      { label: "พายุฤดูร้อน ฟ้าผ่า/ลมกระโชกแรง", severity: "medium", note: "ช่วงเปลี่ยนฤดูมักมีฝนฟ้าคะนองฉับพลัน", season: "มี.ค.-พ.ค." },
      { label: "น้ำท่วมขัง/น้ำหลากตามลำน้ำและพื้นที่ลุ่ม", severity: "medium", note: "ฤดูฝนมีโอกาสเกิดน้ำท่วมขังและน้ำป่าในบางอำเภอ", season: "พ.ค.-ต.ค." },
      { label: "PM2.5 จากการเผาในที่โล่ง", severity: "medium", note: "ช่วงปลายหนาว-หน้าแล้งคุณภาพอากาศแย่ได้", season: "ธ.ค.-เม.ย." }
    ],
    ecoIds: ["t_urban","t_cave","c_heat_stroke","c_monsoon","c_flash_flood","c_pm25","f_dog_stray","f_snake_green","fl_yanang","fl_mushroom_poison"],
    newEcoEntities: [],
    metadata: { climate: "อุณหภูมิประมาณ 17-38°C, ร้อนจัดปลายก.พ.-พ.ค., ฝนพ.ค.-ต.ค., เย็นสบายต.ค.-ก.พ.", terrain: "ที่ราบสูงอีสานสลับพื้นที่ชุมชนใหญ่ มีอ่างเก็บน้ำ/เขื่อนและป่า-ภูเขาบางส่วน", bestSeason: "พ.ย.-ก.พ.", emergencyContacts: [] }
  },
  "Udon Thani": {
    transport: [
      { name: "ท่าอากาศยานนานาชาติอุดรธานี", shortName: "สนามบิน", type: "plane", description: "สนามบินหลักของอุดรธานี มีเที่ยวบินตรงจากกรุงเทพฯหลายเที่ยว", warpUrl: "https://www.airports.go.th/", logoText: "✈️", color: "#ef4444" },
      { name: "รถไฟทางไกลสายตะวันออกเฉียงเหนือ (สถานีอุดรธานี)", shortName: "รถไฟ", type: "rail", description: "มีขบวนรถไฟจากกรุงเทพฯผ่านขอนแก่นขึ้นมาอุดรฯ", warpUrl: "https://www.railway.co.th/", logoText: "🚆", color: "#1f2937" },
      { name: "รถสองแถว/รถโดยสารในตัวเมืองอุดรธานี", shortName: "สองแถว", type: "songthaew", description: "เดินทางในเมืองและต่อไปจุดสำคัญ เช่น บขส.-ตลาด-ย่านท่องเที่ยว", warpUrl: "", logoText: "🛻", color: "#f97316" },
      { name: "รถตุ๊กตุ๊กอุดรธานี", shortName: "ตุ๊กตุ๊ก", type: "tuk_tuk", description: "พบมากในเมือง เรียกง่าย เหมาะระยะสั้น", warpUrl: "", logoText: "🛺", color: "#a855f7" },
      { name: "รถตู้คิวอำเภอ/รถมินิบัส", shortName: "รถตู้", type: "van", description: "เชื่อมอำเภอสำคัญและจังหวัดใกล้เคียง เช่น หนองคาย บึงกาฬ", warpUrl: "", logoText: "🚐", color: "#06b6d4" }
    ],
    routes: [
      { name: "สาย 1: กรุงเทพฯ - อุดรธานี (เครื่องบิน)", type: "plane", operator: "Thai Vietjet / Thai AirAsia / Nok Air (ตามฤดูกาล)", from: "กรุงเทพฯ (DMK/BKK)", to: "อุดรธานี (UTH)", via: [], departureTimes: ["06:30","12:00","19:30"], duration: "1 ชม. 05-20 นาที", baseFare: 1300, frequency: "หลายเที่ยว/วัน", terminal: "สนามบินดอนเมือง/สุวรรณภูมิ", notes: "สายการบิน/ความถี่อาจเปลี่ยนตามฤดูกาล" },
      { name: "สาย 2: กรุงเทพฯ - อุดรธานี (รถทัวร์)", type: "coach", operator: "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน", from: "กรุงเทพฯ", to: "อุดรธานี (บขส.อุดร)", via: ["สระบุรี","นครราชสีมา","ขอนแก่น"], departureTimes: ["07:00","10:30","20:00"], duration: "8-9 ชม.", baseFare: 650, frequency: "ประมาณทุก 1-2 ชม.", terminal: "สถานีขนส่งหมอชิต 2", notes: null },
      { name: "สาย 3: กรุงเทพฯ - อุดรธานี (รถไฟ)", type: "train", operator: "การรถไฟแห่งประเทศไทย (SRT)", from: "กรุงเทพฯ (สถานีกลางกรุงเทพอภิวัฒน์)", to: "อุดรธานี (สถานีอุดรธานี)", via: ["สระบุรี","นครราชสีมา","ขอนแก่น"], departureTimes: ["08:45","20:30"], duration: "9-11 ชม.", baseFare: 350, frequency: "หลายขบวน/วัน", terminal: "สถานีกลางกรุงเทพอภิวัฒน์", notes: "ราคา/เวลาขึ้นกับชั้นรถและขบวน" },
      { name: "สาย 4: เมืองอุดรธานี - หนองคาย (รถตู้/รถบัส)", type: "van", operator: "คิวรถตู้/มินิบัสสายอุดรฯ-หนองคาย", from: "อุดรธานี (บขส./คิวรถตู้)", to: "หนองคาย (ตัวเมือง/ท่ารถ)", via: [], departureTimes: ["07:00","09:00","11:00","13:00","15:00"], duration: "1-1.5 ชม.", baseFare: 80, frequency: "ประมาณทุก 30-60 นาที", terminal: "สถานีขนส่งผู้โดยสารอุดรธานี", notes: null },
      { name: "สาย 5: เมืองอุดรธานี - บ้านเชียง", type: "bus", operator: "รถสองแถว/รถตู้ท้องถิ่น", from: "อุดรธานี (ตัวเมือง)", to: "พิพิธภัณฑ์บ้านเชียง (อ.หนองหาน)", via: [], departureTimes: ["08:00","10:00","14:00"], duration: "40-60 นาที", baseFare: 40, frequency: "หลายเที่ยว/วัน", terminal: "คิวรถท้องถิ่นในเมือง/สถานีขนส่ง", notes: "ควรถามจุดขึ้นที่แน่นอนในวันเดินทาง" }
    ],
    localFoods: [
      { name: "ข้าวต้มมัดบัวแดง (อ.เมืองอุดรธานี)", priceRange: "25-60฿", category: "dessert", note: "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู" },
      { name: "แหนมเนือง (สายอุดรฯ)", priceRange: "180-350฿", category: "local", note: "เมืองอุดรมีอาหารเวียดนาม-ไทยชื่อดัง เช่น แหนมเนือง" },
      { name: "เฝอ/ก๋วยจั๊บญวนใส่หมูยอ", priceRange: "60-120฿", category: "street", note: "เส้นนุ่ม น้ำซุปหอมแบบเวียดนาม" },
      { name: "ไข่กระทะ", priceRange: "40-80฿", category: "street", note: "อาหารเช้าสไตล์เวียดนาม-อีสาน พบได้ทั่วเมือง" },
      { name: "มะม่วงน้ำดอกไม้/กล้วยหอมทองอุดร (ผลไม้ท้องถิ่น)", priceRange: "40-120฿", category: "dessert", note: "มีการพูดถึงเป็นสินค้า GI/ของดีในพื้นที่" }
    ],
    accommodation: [
      { tier: "budget", label: "ประหยัด", priceRange: "450-900฿/คืน", examples: ["City Inn Udonthani","B2 Udon Thani Boutique & Budget Hotel","Hotel MOCO"], bookingUrl: "https://www.booking.com/city/th/udon-thani.th.html" },
      { tier: "midrange", label: "ปานกลาง", priceRange: "900-1,900฿/คืน", examples: ["The Pannarai Hotel","At Home at Udon","Prajaktra Design Hotel"], bookingUrl: "https://www.booking.com/city/th/udon-thani.th.html" },
      { tier: "premium", label: "หรูหรา", priceRange: "2,000-4,500฿/คืน", examples: ["Centara Udon","De Princess Hotel Udonthani"], bookingUrl: "https://www.booking.com/city/th/udon-thani.th.html" }
    ],
    dangerZones: [
      { label: "อากาศร้อนจัด/เสี่ยงฮีทสโตรก", severity: "medium", note: "ช่วงหน้าร้อนอีสานแดดแรง เหมาะพกน้ำและกันแดด", season: "มี.ค.-พ.ค." },
      { label: "PM2.5 จากการเผาในที่โล่ง", severity: "medium", note: "ปลายหนาว-หน้าแล้งมีโอกาสฝุ่นสูง", season: "ธ.ค.-เม.ย." },
      { label: "ฝนตกหนัก น้ำท่วมขังในเขตเมือง/พื้นที่ลุ่ม", severity: "medium", note: "ฤดูฝนมีน้ำท่วมขังได้เป็นช่วง ๆ", season: "พ.ค.-ต.ค." },
      { label: "อุบัติเหตุบนถนนช่วงเทศกาล", severity: "medium", note: "ช่วงเดินทางหนาแน่นควรเผื่อเวลาและหลีกเลี่ยงขับกลางคืน", season: "เม.ย., ธ.ค.-ม.ค." }
    ],
    ecoIds: ["t_urban","t_cave","c_heat_stroke","c_monsoon","c_flash_flood","c_pm25","f_dog_stray","f_snake_cobra","fl_bamboo","fl_yanang"],
    newEcoEntities: [],
    metadata: { climate: "อุณหภูมิประมาณ 16-39°C, ร้อนจัดปลายก.พ.-พ.ค., ฝนพ.ค.-ต.ค., เย็นสบายต.ค.-ก.พ.", terrain: "ที่ราบสูงสลับป่าเขา/หน้าผาและถ้ำในบางพื้นที่ เมืองศูนย์กลางการค้า-คมนาคมอีสานตอนบน", bestSeason: "พ.ย.-ก.พ.", emergencyContacts: [] }
  },
  "Nong Khai": {
    transport: [
      { name: "รถไฟทางไกลสายตะวันออกเฉียงเหนือ (สถานีหนองคาย)", shortName: "รถไฟ", type: "rail", description: "ปลายทางสายอีสานตอนบน ใช้เดินทางจากกรุงเทพฯและเชื่อมต่อพื้นที่ชายแดน", warpUrl: "https://www.railway.co.th/", logoText: "🚆", color: "#1f2937" },
      { name: "รถสองแถวในตัวเมืองหนองคาย", shortName: "สองแถว", type: "songthaew", description: "วิ่งรับส่งในเมืองและไปจุดสำคัญ เช่น ตลาดท่าเสด็จ-ด่านชายแดน", warpUrl: "", logoText: "🛻", color: "#f97316" },
      { name: "รถตุ๊กตุ๊กหนองคาย", shortName: "ตุ๊กตุ๊ก", type: "tuk_tuk", description: "ใช้เดินทางระยะสั้นในเมือง โดยเฉพาะย่านท่องเที่ยวริมโขง", warpUrl: "", logoText: "🛺", color: "#a855f7" },
      { name: "รถตู้/รถบัสเชื่อมอุดรธานี-หนองคาย", shortName: "รถตู้", type: "van", description: "วิ่งถี่ เหมาะสำหรับต่อการเดินทางจากสนามบินอุดรฯ", warpUrl: "", logoText: "🚐", color: "#06b6d4" },
      { name: "เรือนำเที่ยวแม่น้ำโขง (บางฤดูกาล)", shortName: "เรือ", type: "boat", description: "ล่องชมวิวแม่น้ำโขง/จุดชมพระอาทิตย์ตก (ขึ้นกับฤดูกาลและระดับน้ำ)", warpUrl: "", logoText: "⛴️", color: "#0ea5e9" }
    ],
    routes: [
      { name: "สาย 1: กรุงเทพฯ - หนองคาย (รถไฟด่วน/ด่วนพิเศษ)", type: "train", operator: "การรถไฟแห่งประเทศไทย (SRT)", from: "กรุงเทพฯ (สถานีกลางกรุงเทพอภิวัฒน์)", to: "หนองคาย (สถานีหนองคาย)", via: ["สระบุรี","นครราชสีมา","ขอนแก่น","อุดรธานี"], departureTimes: ["08:45","20:30"], duration: "10-12 ชม.", baseFare: 494, frequency: "มีทั้งขบวนกลางวันและกลางคืน", terminal: "สถานีกลางกรุงเทพอภิวัฒน์", notes: "ควรตรวจสอบสถานะการเดินรถ/ตารางล่าสุดก่อนเดินทาง" },
      { name: "สาย 2: กรุงเทพฯ - หนองคาย (รถทัวร์)", type: "coach", operator: "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน", from: "กรุงเทพฯ", to: "หนองคาย (บขส.หนองคาย)", via: ["สระบุรี","นครราชสีมา","ขอนแก่น","อุดรธานี"], departureTimes: ["07:00","10:00","20:00"], duration: "9-10 ชม.", baseFare: 720, frequency: "หลายเที่ยว/วัน", terminal: "สถานีขนส่งหมอชิต 2", notes: null },
      { name: "สาย 3: อุดรธานี - หนองคาย (รถตู้/รถบัส)", type: "van", operator: "คิวรถตู้/มินิบัสสายอุดรฯ-หนองคาย", from: "อุดรธานี", to: "หนองคาย", via: [], departureTimes: ["07:00","09:00","11:00","13:00","15:00"], duration: "1-1.5 ชม.", baseFare: 80, frequency: "ประมาณทุก 30-60 นาที", terminal: "สถานีขนส่งผู้โดยสารอุดรธานี", notes: null },
      { name: "สาย 4: เมืองหนองคาย - ตลาดท่าเสด็จ/ริมโขง", type: "bus", operator: "รถสองแถวในเมือง/รถโดยสารท้องถิ่น", from: "ตัวเมืองหนองคาย", to: "ตลาดท่าเสด็จ/ถนนริมโขง", via: [], departureTimes: ["09:00","12:00","17:00"], duration: "10-20 นาที", baseFare: 20, frequency: "วิ่งถี่ช่วงกลางวัน", terminal: "จุดจอดในเมือง", notes: "บางช่วงอาจเหมาจ่าย/คิดตามระยะทาง" }
    ],
    localFoods: [
      { name: "หลามปลาน้ำโขง", priceRange: "80-150฿", category: "local", note: "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู" },
      { name: "แหนมเนืองหนองคาย", priceRange: "180-350฿", category: "local", note: "มีชื่อเสียงและถูกแนะนำในเส้นทางเที่ยวหนองคาย" },
      { name: "ปลานิลกระชังแม่น้ำโขงหนองคาย", priceRange: "120-250฿", category: "local", note: "สินค้า GI/ของเด่นจากแม่น้ำโขง (นิยมทำเมนูเผา/ทอด/ต้มยำ)" },
      { name: "ข้าวเปียกเส้น (ก๋วยจั๊บญวนแนวหนองคาย)", priceRange: "50-100฿", category: "street", note: "พบมากในมื้อเช้าและร้านอาหารเวียดนาม" },
      { name: "ไข่กระทะ", priceRange: "40-80฿", category: "street", note: "ของเช้าขึ้นชื่อในโซนอาหารเวียดนาม-อีสาน" },
      { name: "แผ่นกระยอ (แผ่นแป้งสำหรับปอเปี๊ยะ/แหนมเนือง)", priceRange: "40-120฿", category: "local", note: "พื้นที่ผลิตแผ่นกระยอมีชื่อเสียงในโซนหนองคาย" }
    ],
    accommodation: [
      { tier: "budget", label: "ประหยัด", priceRange: "450-1,000฿/คืน", examples: ["Mut Mee Garden Guest House","Bualinn Resort","Nongkhai City Hotel"], bookingUrl: "https://www.booking.com/city/th/nong-khai.th.html" },
      { tier: "midrange", label: "ปานกลาง", priceRange: "1,000-2,000฿/คืน", examples: ["Park & Pool Resort","Royal Nakhara Hotel","Klang Muang at Nongkhai Hotel"], bookingUrl: "https://www.booking.com/city/th/nong-khai.th.html" },
      { tier: "premium", label: "หรูหรา", priceRange: "1,800-3,800฿/คืน", examples: ["Amanta Hotel Nongkhai","LePont Riverfront Resort Nongkhai"], bookingUrl: "https://www.booking.com/city/th/nong-khai.th.html" }
    ],
    dangerZones: [
      { label: "กระแสน้ำ/ระดับน้ำแม่น้ำโขงเปลี่ยนเร็ว", severity: "medium", note: "กิจกรรมริมน้ำควรสวมชูชีพและระวังน้ำขึ้นลง", season: "พ.ค.-ต.ค." },
      { label: "น้ำหลาก/น้ำท่วมริมโขง", severity: "medium", note: "ช่วงมรสุมอาจมีน้ำเอ่อล้นติ่งในบางพื้นที่", season: "ส.ค.-ต.ค." },
      { label: "PM2.5 จากการเผาในที่โล่ง", severity: "medium", note: "ปลายหนาว-หน้าแล้งคุณภาพอากาศแย่ได้", season: "ธ.ค.-เม.ย." },
      { label: "อากาศร้อนจัด/เสี่ยงฮีทสโตรก", severity: "medium", note: "แดดแรงช่วงหน้าแล้ง ควรกันแดดและพักเป็นระยะ", season: "มี.ค.-พ.ค." }
    ],
    ecoIds: ["t_urban","c_heat_stroke","c_monsoon","c_flash_flood","c_pm25","f_dog_stray","f_snake_green","fl_yanang","t_mekong_river"],
    newEcoEntities: [{ id: "t_mekong_river", name: "แม่น้ำโขง", category: "terrain", tags: ["danger","common","seasonal","extreme"], desc: "แม่น้ำสายหลักของพื้นที่ชายแดน ระดับน้ำแกว่งตามฤดูฝน-แล้งและอาจเกิดน้ำหลากริมตลิ่ง" }],
    metadata: { climate: "อุณหภูมิประมาณ 15-38°C, ร้อนจัดปลายก.พ.-พ.ค., ฝนพ.ค.-ต.ค., เย็นสบายต.ค.-ก.พ.", terrain: "จังหวัดชายแดนริมฝั่งขวาแม่น้ำโขง มีพื้นที่เมือง ริมโขง และพื้นที่เกษตรของที่ราบสูง", bestSeason: "พ.ย.-ก.พ.", emergencyContacts: [] }
  },
  "Nong Bua Lam Phu": {
    transport: [
      { name: "รถสองแถวในตัวเมืองหนองบัวลำภู", shortName: "สองแถว", type: "songthaew", description: "เดินทางในเมืองและอำเภอใกล้เคียง เหมาะกับระยะสั้น", warpUrl: "", logoText: "🛻", color: "#f97316" },
      { name: "รถตู้/รถมินิบัสเชื่อมอุดรธานี-หนองบัวลำภู", shortName: "รถตู้", type: "van", description: "ต่อจากสนามบิน/สถานีขนส่งอุดรฯได้สะดวก", warpUrl: "", logoText: "🚐", color: "#06b6d4" },
      { name: "รถโดยสารระหว่างจังหวัด (บขส./เอกชน)", shortName: "รถทัวร์", type: "bus", description: "ใช้เดินทางไปขอนแก่น/อุดรฯ/กรุงเทพฯ ผ่านสถานีขนส่งจังหวัด", warpUrl: "", logoText: "🚌", color: "#3b82f6" },
      { name: "มอเตอร์ไซค์รับจ้าง/เช่ามอเตอร์ไซค์", shortName: "มอเตอร์ไซค์", type: "other", description: "เหมาะกับเข้าถ้ำ/แหล่งท่องเที่ยวที่รถสาธารณะเข้าถึงยาก", warpUrl: "", logoText: "🚗", color: "#64748b" }
    ],
    routes: [
      { name: "สาย 1: กรุงเทพฯ - หนองบัวลำภู (รถทัวร์/ต่อรถ)", type: "coach", operator: "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน", from: "กรุงเทพฯ", to: "หนองบัวลำภู", via: ["สระบุรี","นครราชสีมา","ขอนแก่น","อุดรธานี"], departureTimes: ["07:00","10:00","20:30"], duration: "8-10 ชม.", baseFare: 520, frequency: "หลายเที่ยว/วัน (บางเที่ยวอาจต้องต่อรถ)", terminal: "สถานีขนส่งหมอชิต 2", notes: "บางรอบเป็นเส้นทางผ่าน/ปลายทางอื่น ควรถามที่เคาน์เตอร์ก่อนซื้อตั๋ว" },
      { name: "สาย 2: อุดรธานี - หนองบัวลำภู (รถตู้)", type: "van", operator: "คิวรถตู้สายอุดรฯ-หนองบัวฯ", from: "อุดรธานี", to: "หนองบัวลำภู", via: [], departureTimes: ["07:00","09:00","11:00","13:00","15:00"], duration: "1-1.5 ชม.", baseFare: 80, frequency: "ประมาณทุก 30-60 นาที", terminal: "สถานีขนส่งผู้โดยสารอุดรธานี", notes: null },
      { name: "สาย 3: เมืองหนองบัวลำภู - ถ้ำสุวรรณคูหา", type: "van", operator: "รถสองแถว/เหมารถท้องถิ่น", from: "ตัวเมืองหนองบัวลำภู", to: "ถ้ำสุวรรณคูหา", via: [], departureTimes: ["09:00","13:00","16:00"], duration: "40-60 นาที", baseFare: 60, frequency: "เที่ยวจำกัด/เหมารถสะดวกกว่า", terminal: "คิวรถท้องถิ่นในเมือง", notes: "เส้นทางเข้าถ้ำอาจต้องต่อรถหรือเหมารถ" },
      { name: "สาย 4: หนองบัวลำภู - ขอนแก่น (รถตู้/รถบัส)", type: "van", operator: "คิวรถตู้/รถทัวร์ท้องถิ่น", from: "หนองบัวลำภู", to: "ขอนแก่น", via: [], departureTimes: ["08:00","10:00","14:00","17:00"], duration: "2-3 ชม.", baseFare: 120, frequency: "หลายเที่ยว/วัน", terminal: "สถานีขนส่งหนองบัวลำภู", notes: null }
    ],
    localFoods: [
      { name: "เมี่ยงคำลำภู", priceRange: "60-120฿", category: "local", note: "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู และมีเอกลักษณ์ใช้กลีบบัวเป็นใบห่อ" },
      { name: "ตำลำข่า (น้ำแจ่วเมี่ยงแบบอีสาน)", priceRange: "40-80฿", category: "local", note: "มักใช้เป็นส่วนสำคัญของเมี่ยงคำลำภู" },
      { name: "น้ำผึ้งสุวรรณฟาร์ม (ของดีศรีบุญเรือง)", priceRange: "80-250฿", category: "dessert", note: "ผลิตภัณฑ์ท้องถิ่นที่ถูกแนะนำในพื้นที่" },
      { name: "ลาบปลา/ก้อยปลาในพื้นที่ชุมชนลุ่มน้ำ", priceRange: "60-150฿", category: "local", note: "ควรเลือกร้านที่สดสะอาด" },
      { name: "เห็ดป่าตามฤดูกาล (เมนูแกง/ยำ)", priceRange: "80-180฿", category: "local", note: "หน้าฝนมีเห็ดหลากชนิด ระวังเห็ดพิษ" }
    ],
    accommodation: [
      { tier: "budget", label: "ประหยัด", priceRange: "400-900฿/คืน", examples: ["Rueanchorfa","โรงแรมหนองบัวกรีนวิว","เมืองนางธานีแกรนด์ หนองบัวลำภู"], bookingUrl: "https://www.booking.com/city/th/nong-bua-lamphu.html" },
      { tier: "midrange", label: "ปานกลาง", priceRange: "900-1,600฿/คืน", examples: ["Rueanchorfa","เมืองนางธานีแกรนด์ หนองบัวลำภู"], bookingUrl: "https://www.booking.com/city/th/nong-bua-lamphu.html" },
      { tier: "premium", label: "หรูหรา", priceRange: "1,600-2,800฿/คืน", examples: ["Rueanchorfa","เมืองนางธานีแกรนด์ หนองบัวลำภู"], bookingUrl: "https://www.booking.com/city/th/nong-bua-lamphu.html" }
    ],
    dangerZones: [
      { label: "อากาศร้อนจัด/เสี่ยงฮีทสโตรก", severity: "medium", note: "แดดแรงช่วงหน้าแล้ง ควรหลีกเลี่ยงกิจกรรมกลางแจ้งช่วงเที่ยง", season: "มี.ค.-พ.ค." },
      { label: "ฝนตกหนัก/น้ำท่วมขังในพื้นที่ลุ่ม", severity: "medium", note: "ช่วงมรสุมอาจมีน้ำท่วมขังบางพื้นที่และถนนลื่น", season: "พ.ค.-ต.ค." },
      { label: "ถ้ำ/ทางเดินหินลื่น", severity: "medium", note: "เข้าถ้ำควรใส่รองเท้ากันลื่นและใช้ไฟฉาย", season: null },
      { label: "เห็ดป่า/พืชป่าพิษ", severity: "medium", note: "หน้าฝนมีเห็ดป่ามาก ควรระวังเห็ดพิษและอาหารป่าที่ไม่รู้จัก", season: "พ.ค.-ต.ค." }
    ],
    ecoIds: ["t_urban","t_cave","c_heat_stroke","c_monsoon","c_flash_flood","c_pm25","fl_mushroom_poison","f_snake_green","f_dog_stray","fl_yanang"],
    newEcoEntities: [],
    metadata: { climate: "อุณหภูมิประมาณ 16-38°C, ร้อนจัดปลายก.พ.-พ.ค., ฝนพ.ค.-ต.ค., เย็นสบายต.ค.-ก.พ.", terrain: "ที่ราบสูงสลับภูเขาเตี้ยและถ้ำ มีอ่างเก็บน้ำและพื้นที่เกษตร", bestSeason: "พ.ย.-ก.พ.", emergencyContacts: [] }
  },
  "Loei": {
    transport: [
      { name: "ท่าอากาศยานเลย", shortName: "สนามบิน", type: "plane", description: "สนามบินในจังหวัดเลย (เที่ยวบินอาจมีตามฤดูกาล/ช่วงเวลา)", warpUrl: "https://www.airports.go.th/", logoText: "✈️", color: "#ef4444" },
      { name: "รถตู้/รถมินิบัส (เมืองเลย-เชียงคาน-ภูกระดึง-ด่านซ้าย)", shortName: "รถตู้", type: "van", description: "เส้นทางท่องเที่ยวหลักในจังหวัดนิยมใช้รถตู้/มินิบัส", warpUrl: "", logoText: "🚐", color: "#06b6d4" },
      { name: "รถสองแถวท้องถิ่น (เมืองเลย/เชียงคาน)", shortName: "สองแถว", type: "songthaew", description: "วิ่งในตัวเมืองและบางเส้นทางไปอำเภอใกล้เคียง", warpUrl: "", logoText: "🛻", color: "#f97316" },
      { name: "จักรยาน/ทางจักรยานริมน้ำโขง (เชียงคาน)", shortName: "จักรยาน", type: "bike", description: "พื้นที่ท่องเที่ยวอย่างเชียงคานเหมาะกับปั่นเลียบโขง", warpUrl: "", logoText: "🚲", color: "#22c55e" },
      { name: "รถตุ๊กตุ๊ก/รถรับจ้างในย่านท่องเที่ยว", shortName: "รถรับจ้าง", type: "other", description: "เหมาะกับเที่ยวระยะสั้นหรือเหมาวันไปภูเขา/จุดชมวิว", warpUrl: "", logoText: "🚗", color: "#64748b" }
    ],
    routes: [
      { name: "สาย 1: กรุงเทพฯ - เลย (เครื่องบิน)", type: "plane", operator: "Thai AirAsia (หลัก) + สายการบินอาจเปลี่ยน", from: "กรุงเทพฯ (DMK)", to: "เลย (LOE)", via: [], departureTimes: ["07:00","12:00","17:30"], duration: "1 ชม. 05-15 นาที", baseFare: 1500, frequency: "หลายเที่ยว/สัปดาห์", terminal: "สนามบินดอนเมือง", notes: "ความถี่เที่ยวบินเปลี่ยนตามฤดูกาล ควรเช็กวันเดินทาง" },
      { name: "สาย 2: กรุงเทพฯ - เลย (รถทัวร์)", type: "coach", operator: "บริษัท ขนส่ง จำกัด (บขส. 999) + เอกชน", from: "กรุงเทพฯ", to: "เลย (บขส.เลย)", via: ["สระบุรี","เพชรบูรณ์"], departureTimes: ["07:00","10:00","21:00"], duration: "8-9.5 ชม.", baseFare: 620, frequency: "หลายเที่ยว/วัน", terminal: "สถานีขนส่งหมอชิต 2", notes: null },
      { name: "สาย 3: เมืองเลย - เชียงคาน", type: "van", operator: "คิวรถตู้เมืองเลย-เชียงคาน", from: "เลย (บขส./คิวรถตู้)", to: "เชียงคาน", via: [], departureTimes: ["08:00","10:00","12:00","14:00","16:00"], duration: "1-1.5 ชม.", baseFare: 60, frequency: "ประมาณทุก 1 ชม.", terminal: "สถานีขนส่ง จ.เลย", notes: null },
      { name: "สาย 4: เมืองเลย - อุทยานแห่งชาติภูกระดึง", type: "van", operator: "รถสองแถว/รถตู้ไปภูกระดึง", from: "เลย (บขส./คิวรถ)", to: "อ.ภูกระดึง (ทางเข้าอุทยาน)", via: [], departureTimes: ["06:30","08:30","10:30"], duration: "1.5-2 ชม.", baseFare: 80, frequency: "เที่ยวเช้าเด่น", terminal: "สถานีขนส่ง จ.เลย", notes: "ควรเช็กเวลาให้ทันรอบเดินขึ้นภูกระดึง" }
    ],
    localFoods: [
      { name: "ส้าปลาน้ำโขง", priceRange: "80-160฿", category: "local", note: "เมนูอาหารถิ่นที่ได้รับคัดเลือกโครงการ 1 จังหวัด 1 เมนู" },
      { name: "ข้าวเปียกเส้น (เมืองเลย/เชียงคาน)", priceRange: "50-100฿", category: "street", note: "ถูกยกเป็นอาหารประจำถิ่นในพื้นที่ท่องเที่ยว" },
      { name: "เมี่ยงคำ (สไตล์เลย/เชียงคาน)", priceRange: "40-120฿", category: "street", note: "พบได้ตามถนนคนเดินเชียงคาน" },
      { name: "ข้าวจี่", priceRange: "15-35฿", category: "street", note: "พบมากช่วงอากาศเย็นและงานประเพณี" },
      { name: "อาหารปลาแม่น้ำโขง (ย่าง/ลวกจิ้ม/ต้มยำ)", priceRange: "120-250฿", category: "local", note: "นิยมในโซนริมโขง เช่น เชียงคาน" }
    ],
    accommodation: [
      { tier: "budget", label: "ประหยัด", priceRange: "450-1,100฿/คืน", examples: ["Fortune D Hotel Loei","Loei Village Hotel","Loei Palace Hotel"], bookingUrl: "https://www.booking.com/city/th/loei.th.html" },
      { tier: "midrange", label: "ปานกลาง", priceRange: "1,100-2,200฿/คืน", examples: ["Loei Palace Hotel","Indiego Space","Chiang Khan Hill Resort"], bookingUrl: "https://www.booking.com/city/th/loei.th.html" },
      { tier: "premium", label: "หรูหรา", priceRange: "2,200-5,000฿/คืน", examples: ["Chiangkhan River Mountain Resort","Phurua Resort"], bookingUrl: "https://www.booking.com/city/th/loei.th.html" }
    ],
    dangerZones: [
      { label: "อากาศหนาว/ลมแรงบนภูเขา", severity: "medium", note: "พื้นที่ภูเขามีอากาศเย็นจัดได้ โดยเฉพาะกลางคืน-เช้ามืด", season: "พ.ย.-ก.พ." },
      { label: "หมอกหนา/ทัศนวิสัยต่ำบนถนนภูเขา", severity: "medium", note: "ขับรถขึ้นภูเรือ/ภูกระดึงควรระวังหมอกและโค้งมาก", season: "พ.ย.-ก.พ." },
      { label: "ฝนตกหนัก น้ำป่าไหลหลาก/ดินสไลด์", severity: "high", note: "พื้นที่ภูเขาเสี่ยงน้ำป่าและถนนพังเป็นช่วง ๆ", season: "พ.ค.-ต.ค." },
      { label: "กระแสน้ำแม่น้ำโขง/กิจกรรมริมโขง", severity: "medium", note: "ระดับน้ำเปลี่ยนตามฤดู ต้องระวังการเล่นน้ำและล่องเรือ", season: "พ.ค.-ต.ค." }
    ],
    ecoIds: ["t_mountain","t_urban","c_heat_stroke","c_monsoon","c_flash_flood","c_pm25","f_dog_stray","f_snake_cobra","fl_mushroom_poison","fl_bamboo","t_mekong_river"],
    newEcoEntities: [{ id: "t_mekong_river", name: "แม่น้ำโขง", category: "terrain", tags: ["danger","common","seasonal"], desc: "โซนเชียงคานและริมโขงเป็นไฮไลท์สำคัญ ระดับน้ำขึ้นลงตามฤดูกาลและมีกระแสน้ำ" }],
    metadata: { climate: "อุณหภูมิประมาณ 10-36°C, เย็นกว่าหลายจังหวัดอีสาน มีหมอกช่วงปลายปี, ฝนพ.ค.-ต.ค.", terrain: "จังหวัดอีสานค่อนไปทางเหนือ อยู่ท่ามกลางภูเขาน้อยใหญ่ มีแหล่งท่องเที่ยวธรรมชาติและริมแม่น้ำโขง", bestSeason: "ต.ค.-ก.พ.", emergencyContacts: [] }
  }
};
