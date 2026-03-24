# Locus Hybrid Travel Intelligence: Development Roadmap
**Project Phase:** Tactical Augmentation (From Travel-only to Travel + Survival Intelligence)

## Phase 1: Core Tactical Mapping (Immediate Priority)
*ต่อยอดจาก Home/Threat Radar ที่เริ่มนิ่งแล้ว แต่ยังต้องเชื่อมกับ use case การเดินทางจริง*
- [ ] **Threat Layer System:** สร้าง Layer ซ้อนบน `ProvinceMap.tsx` เพื่อแสดง "โซนอันตราย" (เช่น ความหนาแน่นของประชากรสูง = ดงซอมบี้, พื้นที่ลุ่มต่ำ = น้ำท่วมขัง)
- [ ] **Choke Point Identification:** ระบบคำนวณและแสดงผลจุดคอขวด (สะพาน, อุโมงค์, ถนนสายหลัก) ที่ควรหลีกเลี่ยง
- [ ] **Safe Zone & Resource Pinning:** ปักหมุดพิกัดสำคัญ (โรงพยาบาล, ค่ายทหาร, แหล่งน้ำจืด, จุดตั้งแคมป์บนที่สูง)
- [ ] **TravelGuide Hybridization:** รักษาข้อมูล route ปกติไว้ แต่เสริม tactical overlay เช่น fallback, resupply, movement window, readiness check

## Phase 2: Province & Geo Knowledge Upgrade
- [ ] **Flora & Fauna Database:** ปรับปรุงหน้า `GeoArchivePage` ให้แสดงข้อมูลพฤกษศาสตร์ (พืชกินได้/มีพิษ) และสัตววิทยาของพื้นที่ที่เลือกบนแผนที่
- [ ] **Terrain Physical Analysis:** แสดงลักษณะทางดินและหิน (เช่น พื้นที่นี้ขุดหลุมหลบภัยได้ไหม หรือเป็นหินแข็ง)
- [ ] **Province Tactical Refactor:** เปลี่ยนหน้า province detail จาก travel tab แบบท่องเที่ยวล้วน ไปเป็น hybrid tabs เช่น Travel / Stay / Essentials / Risk

## Phase 3: Dynamic Intelligence & Routing (n8n + LightRAG)
- [ ] **Adaptive Route Scoring:** ขยายจาก route board ปัจจุบัน ไปเป็นการคำนวณ route score ที่อิงจาก Elevation, Threat Zones, supply burn และ choke points
- [ ] **Locus Intelligence Oracle:** เชื่อม LightRAG ให้ตอบคำถามเชิงลึก เช่น "หนีไปเขาใหญ่ตอนนี้ สภาพอากาศเอื้อต่อการจุดไฟไหม และมีพืชอะไรใช้ห้ามเลือดได้บ้าง"
- [ ] **Trip Disruption Assistant:** ให้ระบบแนะนำการปรับแผนเมื่อ route ปกติใช้งานไม่ได้ เช่น รถไฟหยุดวิ่ง, น้ำท่วม, จุดผ่านทางถูกปิด

## Principle
- ไม่ลบ travel use case เดิม ถ้ายังตอบโจทย์ผู้ใช้หลักของแอป
- ใช้ tactical layer เป็น augmentation บนข้อมูลเดินทางเดิม แทนการแทนที่ทุกอย่างด้วย survival-only design
