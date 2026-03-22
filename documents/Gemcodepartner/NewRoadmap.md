# Locus Survival Framework: Development Roadmap
**Project Phase:** Tactical Pivot (From Tourism to Survival)

## Phase 1: Core Tactical Mapping (Immediate Priority)
*ต่อยอดจากที่เพิ่งทำ Highlight จังหวัดสำเร็จ*
- [ ] **Threat Layer System:** สร้าง Layer ซ้อนบน `ProvinceMap.tsx` เพื่อแสดง "โซนอันตราย" (เช่น ความหนาแน่นของประชากรสูง = ดงซอมบี้, พื้นที่ลุ่มต่ำ = น้ำท่วมขัง)
- [ ] **Choke Point Identification:** ระบบคำนวณและแสดงผลจุดคอขวด (สะพาน, อุโมงค์, ถนนสายหลัก) ที่ควรหลีกเลี่ยง
- [ ] **Safe Zone & Resource Pinning:** ปักหมุดพิกัดสำคัญ (โรงพยาบาล, ค่ายทหาร, แหล่งน้ำจืด, จุดตั้งแคมป์บนที่สูง)

## Phase 2: The Biological & Reality Codex (Geo-Archive Update)
- [ ] **Flora & Fauna Database:** ปรับปรุงหน้า `GeoArchivePage` ให้แสดงข้อมูลพฤกษศาสตร์ (พืชกินได้/มีพิษ) และสัตววิทยาของพื้นที่ที่เลือกบนแผนที่
- [ ] **Terrain Physical Analysis:** แสดงลักษณะทางดินและหิน (เช่น พื้นที่นี้ขุดหลุมหลบภัยได้ไหม หรือเป็นหินแข็ง)

## Phase 3: Dynamic Intelligence & Routing (n8n + LightRAG)
- [ ] **Tactical Evacuation Routing:** เปลี่ยนจากแผนที่นำทางปกติ เป็นการหาเส้นทางหนีที่อิงจาก Elevation (ความสูงชัน) และหลีกเลี่ยง Threat Zones
- [ ] **Locus Intelligence Oracle:** เชื่อม LightRAG ให้ตอบคำถามเชิงลึก เช่น "หนีไปเขาใหญ่ตอนนี้ สภาพอากาศเอื้อต่อการจุดไฟไหม และมีพืชอะไรใช้ห้ามเลือดได้บ้าง"