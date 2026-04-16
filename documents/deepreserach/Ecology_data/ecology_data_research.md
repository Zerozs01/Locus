# 🌿 Deep Research Prompts — Ecology / Environment Province Data

## วิธีใช้
1. Copy prompt ของแต่ละรอบไปวางใน ChatGPT (เลือก Deep Research mode)
2. รอผลลัพธ์เป็น JSON
3. ส่ง JSON กลับมาให้ผม → ผมจะ import เข้า SQLite ให้

---

## 🟦 รอบที่ 1: ภาคกลาง (15 จังหวัด)

```
ผมกำลังพัฒนาแอป Travel Guide สำหรับประเทศไทย ต้องการข้อมูล Environment/Ecology ระดับจังหวัด
กรุณา Research แล้วตอบเป็น JSON สำหรับจังหวัดต่อไปนี้:

Bangkok, Nonthaburi, Pathum Thani, Samut Prakan, Phra Nakhon Si Ayutthaya,
Nakhon Pathom, Samut Sakhon, Samut Songkhram, Suphan Buri, Sing Buri,
Ang Thong, Lop Buri, Saraburi, Chai Nat, Nakhon Nayok

สำหรับแต่ละจังหวัด ให้ข้อมูล array ชื่อ "ecoEntities" (8-15 รายการ)
ครอบคลุม 5 หมวดให้ครบ: flora, fauna, terrain, climate, hazard

แต่ละ item ประกอบด้วย:

═══════════════════════════════════════════
1) id (string)
═══════════════════════════════════════════
format: "{category_prefix}_{shortname_eng}"
prefix ตามหมวด:
  - สัตว์ (fauna): f_
  - พืช (flora): fl_
  - ภูมิประเทศ (terrain): t_
  - สภาพอากาศ (climate): c_
  - ภัยธรรมชาติ/ความเสี่ยง (hazard): h_
ตัวอย่าง: "f_elephant", "fl_bamboo_poison", "t_mangrove", "c_pm25", "h_flood"

═══════════════════════════════════════════
2) name (string)
═══════════════════════════════════════════
ชื่อภาษาไทย เช่น "ช้างป่า", "ต้นลำโพง", "ป่าชายเลน"

═══════════════════════════════════════════
3) category (string)
═══════════════════════════════════════════
เลือกจาก → "flora" | "fauna" | "terrain" | "climate" | "hazard"

═══════════════════════════════════════════
4) tags (object)
═══════════════════════════════════════════
- riskLevel: "low" | "medium" | "high"
- frequency: "rare" | "common" | "everywhere"
- interaction: "safe" | "caution" | "dangerous"

═══════════════════════════════════════════
5) attributes (object, optional)
═══════════════════════════════════════════
ใส่เฉพาะ field ที่เกี่ยวข้อง:
- edible?: boolean       — กินได้หรือไม่
- poisonous?: boolean    — มีพิษหรือไม่
- medicinal?: boolean    — เป็นสมุนไพรหรือไม่
- aggressive?: boolean   — ก้าวร้าว/ดุร้ายหรือไม่
- protected?: boolean    — เป็นสัตว์/พืชคุ้มครองหรือไม่

═══════════════════════════════════════════
6) context (object)
═══════════════════════════════════════════
- location: string[]      — พื้นที่ที่พบ (เช่น ["ป่าชายเลน", "ริมแม่น้ำ"])
- season: string[]        — ฤดูที่พบ (เช่น ["ฤดูฝน", "ทุกฤดู"])
- timeOfDay?: "day" | "night" | "both"

═══════════════════════════════════════════
7) description (string)
═══════════════════════════════════════════
คำอธิบายสั้น 1-2 ประโยค (ภาษาไทย)

═══════════════════════════════════════════

📌 รูปแบบ JSON Output:
{
  "Bangkok": {
    "ecoEntities": [
      {
        "id": "f_dog_stray",
        "name": "สุนัขจรจัด",
        "category": "fauna",
        "tags": {
          "riskLevel": "medium",
          "frequency": "everywhere",
          "interaction": "caution"
        },
        "attributes": {
          "aggressive": true
        },
        "context": {
          "location": ["ซอยทั่วไป", "ตลาด", "วัด"],
          "season": ["ทุกฤดู"],
          "timeOfDay": "both"
        },
        "description": "พบสุนัขจรจัดทั่วเมือง ควรระวังไม่เข้าใกล้ฝูงโดยเฉพาะตอนกลางคืน"
      },
      {
        "id": "c_pm25",
        "name": "ฝุ่นละออง PM2.5",
        "category": "climate",
        "tags": {
          "riskLevel": "high",
          "frequency": "common",
          "interaction": "dangerous"
        },
        "attributes": {},
        "context": {
          "location": ["ทั่วเมือง", "ริมถนนใหญ่"],
          "season": ["ม.ค.-มี.ค."],
          "timeOfDay": "both"
        },
        "description": "กรุงเทพฯ มีฝุ่น PM2.5 เกินมาตรฐานช่วงปลายฤดูหนาว ควรสวมหน้ากากอนามัย"
      },
      {
        "id": "t_urban",
        "name": "เขตเมืองหนาแน่น",
        "category": "terrain",
        "tags": {
          "riskLevel": "low",
          "frequency": "everywhere",
          "interaction": "safe"
        },
        "attributes": {},
        "context": {
          "location": ["ทั่วจังหวัด"],
          "season": ["ทุกฤดู"],
          "timeOfDay": "both"
        },
        "description": "พื้นที่เมืองหนาแน่น มีสิ่งอำนวยความสะดวกครบ"
      }
    ]
  },
  "Nonthaburi": {
    "ecoEntities": [...]
  }
}

📌 ครอบคลุม 5 หมวดให้ครบต่อจังหวัด:
- flora (พืช) อย่างน้อย 1-3 รายการ — เน้นพืชท้องถิ่น กินได้/มีพิษ/สมุนไพร
- fauna (สัตว์) อย่างน้อย 1-3 รายการ — สัตว์ป่า/สัตว์เมือง/สัตว์อันตราย/พาหะโรค
- terrain (ภูมิประเทศ) อย่างน้อย 1-2 รายการ — ลักษณะพื้นที่หลัก
- climate (สภาพอากาศ) อย่างน้อย 1-2 รายการ — ปัญหาอากาศ/สภาพอากาศเด่น
- hazard (ภัยธรรมชาติ) อย่างน้อย 1-2 รายการ — น้ำท่วม/ไฟป่า/โรคระบาด/อุบัติเหตุ

📌 ข้อจำกัดสำคัญ:
- ข้อมูลต้องเป็นปัจจุบันมากที่สุด (2024-2026)
- ห้ามแต่ง species/ชื่อสัตว์ที่ไม่มีอยู่จริงในท้องที่นั้น
- ห้ามแต่งข้อมูลทางวิทยาศาสตร์หรือทางการแพทย์ขึ้นมาเอง
- ถ้าไม่มั่นใจให้เว้นว่างหรือใส่ null
- พืช/สัตว์ต้องเป็นชนิดที่พบจริงในจังหวัดนั้น ไม่ใช่สิ่งมีชีวิตทั่วไป
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
5. รอบเหนือ 17 จังหวัดอาจยาว → แนะนำแบ่ง 2 sub-round (A: 9 จังหวัด, B: 8 จังหวัด)

---

## 📊 สรุปจำนวนจังหวัดทั้งหมด

| รอบ | ภาค | จำนวน | สถานะ |
|-----|------|-------|-------|
| 1 | กลาง | 15 | ⬜ รอ |
| 2 | เหนือ | 17 | ⬜ รอ |
| 3 | อีสาน (บน) | 10 | ⬜ รอ |
| 4 | อีสาน (ล่าง) | 10 | ⬜ รอ |
| 5 | ตะวันออก + ตะวันตก | 11 | ⬜ รอ |
| 6 | ใต้ | 14 | ⬜ รอ |
| **รวม** | | **77** | |
