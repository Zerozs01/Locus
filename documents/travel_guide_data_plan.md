# 🗂️ Travel Guide — Province-Level Data Architecture Plan

## TL;DR
- เพิ่ม **5 ตาราง SQLite ใหม่** สำหรับข้อมูลระดับจังหวัด (transport, food, eco, accommodation, danger zones)
- ต้องการข้อมูล **7 หมวด** จาก Deep Research (77 จังหวัด)
- แบ่งชัด: **Static (ออฟไลน์) / API (real-time) / n8n (automation)**

---

## 1. 📊 สถานะปัจจุบัน (Current Architecture)

### SQLite Tables ที่มีอยู่แล้ว
| Table | จุดประสงค์ | Rows |
|-------|-----------|------|
| `regions` | ข้อมูล 6 ภูมิภาค | 6 |
| `region_stats` | สถิติรายภูมิภาค (ค่าใช้จ่าย, อาหาร) | 6 |
| `provinces` | ข้อมูลพื้นฐาน 77 จังหวัด (อำเภอ/ตำบล, ค่าใช้จ่าย, ความปลอดภัย) | 77 |

### Data Files ฝั่ง Renderer (Hardcode)
| File | เก็บอะไร | ปัญหา |
|------|---------|-------|
| `portalData.ts` | ระบบขนส่ง, อาหาร, ที่พัก, อันตราย | **มีแค่ Bangkok** ที่เดียว! |
| `regionBriefs.ts` | สรุปสภาพภูมิภาค, AQI fallback, อาหาร | **ระดับภูมิภาค** ไม่ละเอียดถึงจังหวัด |
| `transportRoutes.ts` | เส้นทางรถเมล์/ตู้/ไฟ/เรือ | **ระดับภูมิภาค** ไม่มี local routes |
| `regionExpenses.ts` | โปรไฟล์ค่าใช้จ่ายต่อวัน | **ระดับภูมิภาค** ใช้ค่ากลาง |
| `ecoDb.ts` | สัตว์/พืช/ภูมิประเทศ/สภาพอากาศ | Entity DB กลาง, mapping ต่อภูมิภาค |

> [!WARNING]
> ตอนนี้ **74/77 จังหวัด** ใช้ข้อมูล Default fallback หมด (มีแค่ กรุงเทพ ที่ละเอียด)

---

## 2. 🏗️ New SQLite Schema ที่จะเพิ่ม

```sql
-- ===== 1. Transport: ระบบขนส่งรายจังหวัด =====
CREATE TABLE IF NOT EXISTS province_transport (
  id TEXT PRIMARY KEY,         -- e.g. 'bkk_bts', 'cnx_bus_01'
  province_id TEXT NOT NULL,   -- FK -> provinces.id
  name TEXT NOT NULL,          -- 'BTS สายสีเขียว'
  short_name TEXT,             -- 'BTS'
  type TEXT NOT NULL,          -- 'rail','bus','van','boat','plane','bike','songthaew','tuk_tuk'
  operator TEXT,               -- 'บริษัท ระบบขนส่งมวลชนกรุงเทพ'
  description TEXT,
  warp_url TEXT,               -- link ไปเว็บจริง
  logo_text TEXT,              -- emoji หรือ abbreviation
  color TEXT,                  -- hex accent
  FOREIGN KEY(province_id) REFERENCES provinces(id)
);
CREATE INDEX IF NOT EXISTS idx_transport_province ON province_transport(province_id);

-- ===== 2. Transport Routes: เส้นทางเดินทาง =====
CREATE TABLE IF NOT EXISTS province_routes (
  id TEXT PRIMARY KEY,
  province_id TEXT NOT NULL,
  name TEXT NOT NULL,           -- 'สาย 1: กรุงเทพ - เชียงใหม่'
  type TEXT NOT NULL,           -- 'bus','van','coach','train','plane','boat'
  operator TEXT,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  via TEXT,                     -- JSON array: '["อยุธยา","ลำปาง"]'
  departure_times TEXT,         -- JSON array
  duration TEXT,                -- '9-10 ชม.'
  base_fare INTEGER,            -- ราคาฐาน (บาท)
  frequency TEXT,
  terminal TEXT,
  notes TEXT,
  FOREIGN KEY(province_id) REFERENCES provinces(id)
);
CREATE INDEX IF NOT EXISTS idx_routes_province ON province_routes(province_id);

-- ===== 3. Local Food: อาหารท้องถิ่นรายจังหวัด =====
CREATE TABLE IF NOT EXISTS province_foods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  province_id TEXT NOT NULL,
  name TEXT NOT NULL,           -- 'ข้าวซอย'
  price_range TEXT,             -- '50-80฿'
  note TEXT,                    -- 'เมนูขึ้นชื่อเชียงใหม่'
  category TEXT DEFAULT 'local', -- 'local','street','dessert','drink'
  FOREIGN KEY(province_id) REFERENCES provinces(id)
);
CREATE INDEX IF NOT EXISTS idx_foods_province ON province_foods(province_id);

-- ===== 4. Accommodation: ที่พักรายจังหวัด =====
CREATE TABLE IF NOT EXISTS province_accommodation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  province_id TEXT NOT NULL,
  tier TEXT NOT NULL,           -- 'budget','midrange','premium'
  label TEXT NOT NULL,
  price_range TEXT,             -- '300-800฿/คืน'
  examples TEXT,                -- JSON array: '["เกสต์เฮาส์","โฮสเทล"]'
  booking_url TEXT,
  FOREIGN KEY(province_id) REFERENCES provinces(id)
);
CREATE INDEX IF NOT EXISTS idx_accom_province ON province_accommodation(province_id);

-- ===== 5. Danger Zones & Warnings: โซนอันตรายรายจังหวัด =====
CREATE TABLE IF NOT EXISTS province_dangers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  province_id TEXT NOT NULL,
  label TEXT NOT NULL,           -- 'น้ำท่วมช่วงฝนหนัก'
  severity TEXT DEFAULT 'medium', -- 'low','medium','high'
  note TEXT,
  season TEXT,                   -- 'ก.ย.-พ.ย.' (nullable = ตลอดปี)
  FOREIGN KEY(province_id) REFERENCES provinces(id)
);
CREATE INDEX IF NOT EXISTS idx_dangers_province ON province_dangers(province_id);
```

> [!TIP]
> ตาราง `provinces` เดิมยังใช้ต่อได้เลย แค่เพิ่มตารางใหม่เป็น children ผ่าน FK `province_id`

---

## 3. 📋 ข้อมูลที่ต้อง Research (สำหรับ ChatGPT Deep Research)

### ✅ หมวด A: ระบบขนส่ง (Transport Companies)
**ต่อจังหวัด** ให้ข้อมูลดังนี้:
```
- ชื่อบริษัท/หน่วยงาน (ภาษาไทย)
- ชื่อย่อ (shortName)
- ประเภท: rail / bus / van / boat / songthaew / tuk_tuk / bike / plane
- คำอธิบาย 1 บรรทัด
- เว็บไซต์หลัก (URL)
- สี accent (hex) — ถ้าไม่มีใช้สีตามประเภท
```

**ตัวอย่าง Output:**
```json
{
  "province": "Chiang Mai",
  "transport": [
    { "name": "สมาร์ทบัสเชียงใหม่", "shortName": "RTC", "type": "bus", "description": "รถเมล์เชียงใหม่สายหลัก R1, R3", "warpUrl": "https://www.cmtransit.com/", "color": "#ef4444" },
    { "name": "สองแถวแดง", "shortName": "สองแถว", "type": "songthaew", "description": "สองแถวไม่ประจำทาง ใช้ภายในตัวเมือง", "warpUrl": "", "color": "#f97316" }
  ]
}
```

### ✅ หมวด B: เส้นทางเดินทาง (Transport Routes)
**ต่อจังหวัด** ให้ข้อมูลเส้นทางหลักๆ (3-8 เส้นทาง):
```
- ชื่อเส้นทาง
- ประเภท (bus/van/coach/train/plane/boat)
- ต้นทาง → ปลายทาง
- ผ่านจังหวัดไหนบ้าง
- เวลาออกเดินทาง (โดยประมาณ)
- ระยะเวลาเดินทาง
- ราคาฐาน (บาท)
- ความถี่ (ทุกกี่ชม.)
- สถานีต้นทาง
- หมายเหตุ (ถ้ามี)
```

### ✅ หมวด C: อาหารท้องถิ่น (Local Foods)
**ต่อจังหวัด** ให้ 4-8 เมนูขึ้นชื่อ:
```
- ชื่ออาหาร (ภาษาไทย)
- ราคาโดยประมาณ (range)
- หมวด: local / street / dessert / drink
- หมายเหตุ (optional)
```

### ✅ หมวด D: ที่พัก (Accommodation)
**ต่อจังหวัด** ให้ 3 ระดับ:
```
- ระดับ: budget / midrange / premium
- ช่วงราคา (฿/คืน)
- ตัวอย่าง 2-3 แห่ง (ถ้ามีชื่อจริง)
- ลิงก์ booking (ถ้ามี — Agoda/Booking)
```

### ✅ หมวด E: โซนอันตราย/คำเตือน (Danger Zones)
**ต่อจังหวัด** ให้ 2-5 รายการ:
```
- ชื่อความเสี่ยง
- ระดับ: low / medium / high
- คำอธิบาย 1 บรรทัด
- ช่วงเวลา (ถ้ามี เช่น 'ก.พ.-เม.ย.')
```

### ✅ หมวด F: สิ่งแวดล้อม/ระบบนิเวศ (Eco Extension)
**ต่อจังหวัด** ให้ ID list จาก `ecoDb.ts` ที่มีอยู่แล้ว + เพิ่มใหม่ถ้าจำเป็น:
```
- ecoIds: ['f_elephant', 'fl_bamboo', 't_rainforest', ...]
- ถ้ามี entity ใหม่ที่ยังไม่มีใน ecoDb ให้เพิ่ม definition ใหม่มาด้วย
```

### ✅ หมวด G: ข้อมูลพื้นฐานเสริม (Province Metadata Extension)
**ต่อจังหวัด** เพิ่มเติมจาก `provinces` table เดิม:
```
- สภาพอากาศ (climate): อุณหภูมิเฉลี่ย, ฤดูฝน
- ภูมิประเทศ (terrain): ลักษณะพื้นที่โดยย่อ
- ฤดูท่องเที่ยวที่ดีที่สุด (best_season)
- จำนวนสถานที่ท่องเที่ยวหลัก (attraction_count)
- เบอร์ฉุกเฉิน specific ของจังหวัด (ถ้ามีนอกเหนือจาก 1155/1669)
```

---

## 4. 🔀 แบ่ง Static VS API VS n8n

### 🟢 Static (เก็บใน SQLite ออฟไลน์ / Hardcode ใน App)
| ข้อมูล | เหตุผล |
|--------|-------|
| ระบบขนส่ง (companies + routes) | เปลี่ยนแปลงน้อยมาก (ปีละครั้ง) |
| อาหารท้องถิ่น | ข้อมูลวัฒนธรรม ไม่เปลี่ยนบ่อย |
| ที่พัก (tiers + ช่วงราคา) | ช่วงราคากว้างๆ เพียงพอ |
| โซนอันตราย/คำเตือน | ข้อมูลความรู้ ไม่เปลี่ยนบ่อย |
| Eco entities (สัตว์/พืช/สภาพ) | ข้อมูลธรรมชาติ คงที่มาก |
| เบอร์ฉุกเฉิน | เปลี่ยนน้อยมาก |
| ค่าใช้จ่ายเฉลี่ยต่อวัน (budget tiers) | ใช้ค่ากว้างๆ อัปเดตปีละครั้ง |

### 🟡 API (ดึงจาก External API ตรงๆ — แอปทำเองได้)
| ข้อมูล | API | Rate Limit | เหตุผล |
|--------|-----|-----------|--------|
| ค่าฝุ่น AQI (PM2.5) | AQICN / OpenWeather | ~1 req/s | ✅ ทำแล้ว — เปลี่ยนตลอดวัน |
| พิกัด Geocoding | OpenWeather Geo | 60/min | ✅ ทำแล้ว — ใช้ตอน sync AQI |
| สภาพอากาศปัจจุบัน | OpenWeather Current | 60/min | ✅ ทำแล้ว — Weather Modal |

### 🔴 n8n Automation (Multi-step / ซับซ้อน / ใช้ AI)
| ข้อมูล | ทำไมต้อง n8n | Workflow |
|--------|-------------|----------|
| ข่าวสารท้องถิ่น / Travel Advisory | ดึงจากหลายแหล่ง + summarize ด้วย AI | RSS → Filter → AI Summarize → Push to App |
| ราคาเชื้อเพลิง/ค่าโดยสารจริง (real-time) | Aggregate จากหลายเว็บ + parse | Scrape → Parse → Store → Notify |
| สถานะเส้นทาง / ข่าวจราจร | ดึงจากหลาย API + merge | Multi-API → Merge → Push |
| แจ้งเตือนภัยพิบัติ | ดึงจากกรมอุตุฯ + AI classify severity | RSS/API → AI Classify → Push Alert |
| อัปเดตข้อมูลท่องเที่ยวรายจังหวัด | Scrape จาก TAT + AI restructure | Scheduled Scrape → AI Parse → DB Update |

> [!IMPORTANT]
> **หลักการ:** ถ้ามันเป็น Single API Call → แอปทำเอง ✅
> ถ้ามัน Multi-step (ดึง → Filter → AI → Store → Push) → ให้ n8n จัดการ 🔴

---

## 5. 📦 Prompt Template สำหรับ ChatGPT Deep Research

ส่ง Research ทีละ **ภูมิภาค** (6 รอบ) หรือทีละ **กลุ่มจังหวัด** (~10-15 จังหวัดต่อรอบ)

### Prompt ตัวอย่าง (ส่งให้ ChatGPT):
```
ผมกำลังพัฒนาแอป Travel Guide สำหรับประเทศไทย ต้องการข้อมูลละเอียดระดับจังหวัด
กรุณาให้ข้อมูลต่อไปนี้สำหรับจังหวัด: [ชื่อจังหวัด 10-15 จังหวัด]

**สิ่งที่ต้องการ (ตอบเป็น JSON):**

1. **transport** — ระบบขนส่งภายในจังหวัด (2-5 รายการ)
   - name, shortName, type (bus/van/songthaew/tuk_tuk/boat/rail), description, warpUrl, logoText (emoji), color (hex)

2. **routes** — เส้นทางเดินทางหลัก (3-8 เส้นทาง)
   - name, type, operator, from, to, via (array), departureTimes, duration, baseFare (บาท), frequency, terminal, notes

3. **localFoods** — อาหารท้องถิ่นขึ้นชื่อ (4-8 เมนู)
   - name, priceRange, category (local/street/dessert/drink), note

4. **accommodation** — ที่พัก 3 ระดับ
   - tier (budget/midrange/premium), label, priceRange, examples (2-3), bookingUrl

5. **dangerZones** — ความเสี่ยง/คำเตือน (2-5 รายการ)
   - label, severity (low/medium/high), note, season (null = ตลอดปี)

6. **ecoIds** — สิ่งมีชีวิตและสภาพแวดล้อมที่สำคัญ
   - ใช้ ID จาก list: f_elephant, f_snake_cobra, f_snake_green, f_monkey, f_boar, f_jellyfish_box, f_dog_stray, fl_mushroom_poison, fl_bamboo, fl_yanang, fl_nettle, fl_kratom, fl_seaweed, t_rainforest, t_mountain, t_urban, t_mangrove, t_cave, c_heat_stroke, c_flash_flood, c_pm25, c_monsoon
   - ถ้ามี entity ใหม่ที่ไม่อยู่ใน list ให้เพิ่ม definition (id, name, category, tags, desc)

7. **metadata** — ข้อมูลเสริม
   - climate (อุณหภูมิ/ฝน), terrain, bestSeason, emergencyContacts (ถ้ามี specific)

**รูปแบบ Output:** JSON array โดยแต่ละ element เป็น object ที่มี key = province_id (ชื่อจังหวัดภาษาอังกฤษ)

**ข้อจำกัด:**
- ราคาเป็นสกุลเงินบาท (฿)
- ข้อมูลต้องเป็นปัจจุบันมากที่สุด (2024-2025)
- ถ้าจังหวัดไหนมีข้อมูลน้อย ให้ใส่ "N/A" หรือ fallback ตามภูมิภาค
```

---

## 6. 📅 ลำดับการส่ง Research (แนะนำ 6 รอบ)

| รอบ | ภูมิภาค | จังหวัด | จำนวน |
|-----|--------|---------|-------|
| 1 | ภาคกลาง | กรุงเทพฯ, นนทบุรี, ปทุมธานี, สมุทรปราการ, อยุธยา, กาญจนบุรี, นครปฐม, สมุทรสาคร, สมุทรสงคราม, สุพรรณบุรี, สิงห์บุรี, อ่างทอง, ลพบุรี, สระบุรี, ชัยนาท, นครนายก, ปราจีนบุรี, พระนครศรีอยุธยา | ~15 |
| 2 | ภาคเหนือ | เชียงใหม่, เชียงราย, ลำปาง, ลำพูน, แม่ฮ่องสอน, น่าน, พะเยา, แพร่, อุตรดิตถ์, สุโขทัย, ตาก, กำแพงเพชร, พิษณุโลก, พิจิตร, เพชรบูรณ์, นครสวรรค์, อุทัยธานี | ~17 |
| 3 | ภาคอีสาน (บน) | ขอนแก่น, อุดรธานี, หนองคาย, หนองบัวลำภู, เลย, สกลนคร, นครพนม, มุกดาหาร, กาฬสินธุ์, บึงกาฬ | ~10 |
| 4 | ภาคอีสาน (ล่าง) | นครราชสีมา, บุรีรัมย์, สุรินทร์, ศรีสะเกษ, อุบลราชธานี, ร้อยเอ็ด, มหาสารคาม, ยโสธร, อำนาจเจริญ, ชัยภูมิ | ~10 |
| 5 | ภาคตะวันออก + ตะวันตก | ชลบุรี, ระยอง, จันทบุรี, ตราด, สระแก้ว, ฉะเชิงเทรา, ราชบุรี, เพชรบุรี, ประจวบคีรีขันธ์, ตาก(ตะวันตก) | ~10 |
| 6 | ภาคใต้ | สุราษฎร์ธานี, ภูเก็ต, กระบี่, พังงา, นครศรีธรรมราช, สงขลา, ตรัง, สตูล, พัทลุง, ชุมพร, ระนอง, ยะลา, ปัตตานี, นราธิวาส | ~14 |

---

## 7. ⚙️ Implementation Checklist

- [ ] **Phase 1: Schema** — สร้าง 5 ตารางใหม่ใน `db.ts` + migrations
- [ ] **Phase 2: IPC** — เพิ่ม IPC handlers สำหรับ `getProvincePortal(id)` จาก SQLite
- [ ] **Phase 3: Research** — ส่ง ChatGPT Deep Research 6 รอบ
- [ ] **Phase 4: Seed** — Import ข้อมูลจาก JSON → SQLite (seedDatabase v2)
- [ ] **Phase 5: Frontend** — ปรับ `portalData.ts` ให้อ่านจาก IPC แทน hardcode
- [ ] **Phase 6: Fallback** — ถ้า SQLite ว่าง → ใช้ default portal เหมือนเดิม
- [ ] **Phase 7: Test** — ทดสอบ 3-5 จังหวัดก่อน → ขยายทั้งหมด

> [!NOTE]
> Phase 1-2 ผมทำให้ได้เลยตอนนี้ ส่วน Phase 3 รอข้อมูลจากคุณครับ
