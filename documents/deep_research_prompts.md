# 🔬 Deep Research Prompts — Travel Guide Province Data

## วิธีใช้
1. Copy prompt ของแต่ละรอบไปวางใน ChatGPT (เลือก Deep Research mode)
2. รอผลลัพธ์เป็น JSON
3. ส่ง JSON กลับมาให้ผม → ผมจะ import เข้า SQLite ให้

---

## 🟦 รอบที่ 1: ภาคกลาง (15 จังหวัด)

```
ผมกำลังพัฒนาแอป Travel Guide สำหรับประเทศไทย ต้องการข้อมูลจริงระดับจังหวัดที่ละเอียดและถูกต้อง
กรุณา Research แล้วตอบเป็น JSON สำหรับจังหวัดต่อไปนี้:

Bangkok, Nonthaburi, Pathum Thani, Samut Prakan, Ayutthaya, Nakhon Pathom,
Samut Sakhon, Samut Songkhram, Suphan Buri, Sing Buri, Ang Thong,
Lop Buri, Saraburi, Chai Nat, Nakhon Nayok

สำหรับแต่ละจังหวัด ให้ข้อมูล 7 หมวดนี้:

═══════════════════════════════════════════
1. transport (ระบบขนส่งภายในจังหวัด 2-6 รายการ)
═══════════════════════════════════════════
แต่ละรายการประกอบด้วย:
- name: ชื่อเต็มภาษาไทย (เช่น "สองแถวแดงเชียงใหม่")
- shortName: ชื่อย่อ (เช่น "สองแถว")
- type: เลือกจาก → "rail" | "bus" | "van" | "boat" | "songthaew" | "tuk_tuk" | "bike" | "plane" | "other"
- description: คำอธิบาย 1 บรรทัด (ภาษาไทย)
- warpUrl: URL เว็บไซต์ทางการ (ถ้าไม่มีใส่ "")
- logoText: emoji 1 ตัวที่เหมาะกับประเภท
- color: hex color code (เช่น "#22c55e")

═══════════════════════════════════════════
2. routes (เส้นทางเดินทางหลัก 3-8 เส้นทาง)
═══════════════════════════════════════════
เน้นเส้นทางจากกรุงเทพฯไปจังหวัดนั้น + เส้นทางภายในจังหวัด
แต่ละรายการประกอบด้วย:
- name: ชื่อเส้นทาง (ภาษาไทย เช่น "สาย 1: กรุงเทพฯ - เชียงใหม่")
- type: "bus" | "van" | "coach" | "train" | "plane" | "boat"
- operator: ชื่อผู้ให้บริการ
- from: ต้นทาง
- to: ปลายทาง
- via: array ของจังหวัดที่ผ่าน (เช่น ["อยุธยา", "ลำปาง"])
- departureTimes: array เวลาออก (เช่น ["08:00", "10:00", "20:00"])
- duration: ระยะเวลา (เช่น "9-10 ชม.")
- baseFare: ราคาฐานเป็นตัวเลข บาท (เช่น 550)
- frequency: ความถี่ (เช่น "ทุก 1 ชม.")
- terminal: สถานีต้นทาง (เช่น "สถานีขนส่งหมอชิต")
- notes: หมายเหตุ (ถ้าไม่มีใส่ null)

═══════════════════════════════════════════
3. localFoods (อาหารท้องถิ่นขึ้นชื่อ 4-8 เมนู)
═══════════════════════════════════════════
แต่ละรายการประกอบด้วย:
- name: ชื่ออาหาร (ภาษาไทย)
- priceRange: ช่วงราคา (เช่น "50-80฿")
- category: "local" | "street" | "dessert" | "drink"
- note: หมายเหตุสั้นๆ (ถ้าไม่มีใส่ null)

═══════════════════════════════════════════
4. accommodation (ที่พัก 3 ระดับ)
═══════════════════════════════════════════
ให้ครบ 3 tier:
- tier: "budget" | "midrange" | "premium"
- label: "ประหยัด" | "ปานกลาง" | "หรูหรา"
- priceRange: ช่วงราคาต่อคืน (เช่น "300-800฿/คืน")
- examples: array ชื่อที่พัก 2-3 แห่ง (ชื่อจริง)
- bookingUrl: URL Agoda/Booking ของจังหวัดนั้น (ถ้ามี ไม่มีใส่ null)

═══════════════════════════════════════════
5. dangerZones (ความเสี่ยง/คำเตือน 2-5 รายการ)
═══════════════════════════════════════════
แต่ละรายการประกอบด้วย:
- label: ชื่อความเสี่ยง (ภาษาไทย)
- severity: "low" | "medium" | "high"
- note: คำอธิบาย 1 บรรทัด (ภาษาไทย)
- season: ช่วงเวลาที่เสี่ยง (เช่น "ก.ย.-พ.ย.") ถ้าเสี่ยงตลอดปีใส่ null

═══════════════════════════════════════════
6. ecoIds (สิ่งมีชีวิต/สภาพแวดล้อมสำคัญ)
═══════════════════════════════════════════
เลือก ID ที่เกี่ยวข้องจาก list นี้:
สัตว์: f_elephant, f_snake_cobra, f_snake_green, f_monkey, f_boar, f_jellyfish_box, f_dog_stray, f_boar_hunt
พืช: fl_mushroom_poison, fl_bamboo, fl_yanang, fl_nettle, fl_kratom, fl_seaweed
ภูมิประเทศ: t_rainforest, t_mountain, t_urban, t_mangrove, t_cave
สภาพอากาศ: c_heat_stroke, c_flash_flood, c_pm25, c_monsoon

ถ้าจังหวัดนั้นมีสิ่งมีชีวิต/สภาพแวดล้อมสำคัญที่ไม่อยู่ใน list ให้เพิ่ม object ใหม่ในฟิลด์ "newEcoEntities":
- id: string (prefix f_ สัตว์, fl_ พืช, t_ ภูมิประเทศ, c_ สภาพอากาศ)
- name: ชื่อภาษาไทย
- category: "fauna" | "flora" | "terrain" | "climate"
- tags: array จาก → "danger" | "edible" | "medicinal" | "common" | "rare" | "protected" | "seasonal" | "extreme"
- desc: คำอธิบาย 1-2 ประโยค (ภาษาไทย)

═══════════════════════════════════════════
7. metadata (ข้อมูลเสริม)
═══════════════════════════════════════════
- climate: "อุณหภูมิ xx-xx°C, สภาพอากาศ/ฝน"
- terrain: ลักษณะภูมิประเทศ 1 บรรทัด
- bestSeason: ช่วงเวลาที่เหมาะเที่ยวที่สุด (เช่น "พ.ย.-ก.พ.")
- emergencyContacts: array ของ {label, number} เฉพาะเบอร์ที่ unique ของจังหวัดนั้น
  (ไม่ต้องใส่ 1155/1669/199 เพราะมีอยู่แล้วในระบบ) ถ้าไม่มีใส่ array ว่าง []

═══════════════════════════════════════════

📌 รูปแบบ JSON Output:
{
  "Bangkok": {
    "transport": [...],
    "routes": [...],
    "localFoods": [...],
    "accommodation": [...],
    "dangerZones": [...],
    "ecoIds": [...],
    "newEcoEntities": [...],
    "metadata": {...}
  },
  "Nonthaburi": {...},
  ...
}

📌 ข้อจำกัดสำคัญ:
- ราคาทั้งหมดเป็นสกุลเงินบาท (฿)
- ข้อมูลต้องเป็นปัจจุบันมากที่สุด (2024-2026)
- ข้อมูลที่ไม่แน่ใจให้ใส่ค่าประมาณที่สมเหตุสมผล ดีกว่าใส่ผิด
- ห้ามแต่ง URL ขึ้นมาเอง ถ้าไม่แน่ใจว่า URL ถูกต้องให้ใส่ ""
- อาหารต้องเป็นเมนูขึ้นชื่อจริงๆ ของจังหวัดนั้น ไม่ใช่อาหารทั่วไป
- ที่พักให้ใช้ชื่อจริงที่มีอยู่จริง
```

---

## 🟩 รอบที่ 2: ภาคเหนือ (17 จังหวัด)

เปลี่ยนรายชื่อจังหวัดเป็น:
```
Chiang Mai, Chiang Rai, Lampang, Lamphun, Mae Hong Son,
Nan, Phayao, Phrae, Uttaradit, Sukhothai, Tak,
Kamphaeng Phet, Phitsanulok, Phichit, Phetchabun,
Nakhon Sawan, Uthai Thani
```
(ใช้ body prompt เดียวกับรอบ 1 ทุกประการ)

---

## 🟨 รอบที่ 3: ภาคอีสาน (บน) — 10 จังหวัด

```
Khon Kaen, Udon Thani, Nong Khai, Nong Bua Lam Phu, Loei,
Sakon Nakhon, Nakhon Phanom, Mukdahan, Kalasin, Bueng Kan
```

---

## 🟧 รอบที่ 4: ภาคอีสาน (ล่าง) — 10 จังหวัด

```
Nakhon Ratchasima, Buri Ram, Surin, Si Sa Ket, Ubon Ratchathani,
Roi Et, Maha Sarakham, Yasothon, Amnat Charoen, Chaiyaphum
```

---

## 🟪 รอบที่ 5: ภาคตะวันออก + ตะวันตก — 11 จังหวัด

```
Chon Buri, Rayong, Chanthaburi, Trat, Sa Kaeo, Chachoengsao,
Prachin Buri, Kanchanaburi, Ratchaburi, Phetchaburi, Prachuap Khiri Khan
```

---

## 🟥 รอบที่ 6: ภาคใต้ — 14 จังหวัด

```
Surat Thani, Phuket, Krabi, Phang Nga,
Nakhon Si Thammarat, Songkhla, Trang, Satun, Phatthalung,
Chumphon, Ranong, Yala, Pattani, Narathiwat
```

---

## 📌 Tips ก่อนส่ง

1. **เปิด Deep Research mode** ใน ChatGPT (ไม่ใช่แค่ chat ธรรมดา)
2. ถ้า output ยาวเกินมันอาจตัดหาย → ให้บอกมันว่า "ถ้ายาวเกินให้แบ่งส่ง"
3. หลังได้ JSON มาแล้ว **ไม่ต้อง validate เอง** ส่งมาให้ผมเลย ผมจะ import + ตรวจสอบให้
4. ถ้ารอบไหนจังหวัดเยอะเกิน ChatGPT ตอบไม่ครบ → **แยกเป็น 2 sub-round** ได้เลย
