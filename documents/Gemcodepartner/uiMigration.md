# Locus: UI & Component Migration Guide

## 1. การปรับเปลี่ยน Page ปัจจุบัน
- `TravelGuidePage.tsx` ➡️ **คงชื่อเดิม แต่ปรับเป็นหน้า Hybrid Travel + Tactical Routing**
  - *งานที่ต้องทำ:* รักษาข้อมูลเดินทางปกติไว้ (ผู้ให้บริการ, ค่าใช้จ่าย, ระยะเวลา, terminal, ความถี่) เพื่อรองรับการวางแผนล่วงหน้าบนโน้ตบุ๊ก
  - *งานที่ต้องทำ:* เพิ่ม tactical overlay บน route เดิม เช่น risk score, choke point, fallback zone, resupply node, preferred movement window
  - *หมายเหตุ:* ยังไม่ควรรีบ rename file/page route จนกว่าภาษาและ data model ข้างในจะเปลี่ยนจาก travel-only ไปเป็น hybrid จริง
- `RadarPage.tsx` ➡️ **เปลี่ยนเป็น** `ThreatRadarPage.tsx`
  - *งานที่ต้องทำ:* ปรับ UI ให้ดูจริงจังขึ้น (Dark/Red theme) ใช้สำหรับสแกนพื้นที่รอบตัว (รัศมี x กิโลเมตร) เพื่อหาปัจจัยเสี่ยงตามที่รับมาจาก n8n
- `IntelligencePage.tsx`
  - *งานที่ต้องทำ:* ปรับ Prompt เบื้องหลังของ Bot ให้สวมบทบาทเป็น "ผู้ช่วยยุทธวิธีรบและเอาชีวิตรอด" ป้อนคำสั่งห้ามตอบเรื่องไร้สาระ และเน้นข้อมูลทางชีวภาพ/ฟิสิกส์

## 2. การสร้าง Component/Page ใหม่
- `ThreatConfig.tsx` (Component ในหน้า Settings): 
  - UI สำหรับปรับแต่งตัวแปรความเสี่ยง เช่น "ความเร็วซอมบี้", "ระยะการมองเห็นของศัตรู" เพื่อให้ระบบนำไปคำนวณในแผนที่
- `ResourceInventory.tsx` (Sidebar หรือ Overlay):
  - เอาไว้จดบันทึกทรัพยากรเสมือน (เสบียง, ยา) ที่มีในครอบครอง เพื่อให้ LightRAG ประเมินว่า "ด้วยเสบียงเท่านี้ จะเดินเท้าไปถึงจุดหมายหรือไม่"

## 2.1 แนวทางใช้งานที่เหมาะกับแอปจริง
- แอปนี้รันบนโน้ตบุ๊กเป็นหลัก จึงต้องรองรับทั้ง `pre-trip planning` และ `in-trip adjustment`
- อย่าทำให้แอปกลายเป็น survival simulator เต็มตัวจนเสีย use case หลักของผู้ใช้ที่ต้องการวางแผนเดินทางล่วงหน้า
- ทุกหน้าหลักควรคิดแบบ 2 ชั้น:
  - ชั้นข้อมูลปกติ: เดินทาง/จังหวัด/บริการ/สิ่งอำนวยความสะดวก
  - ชั้น tactical: ความเสี่ยง, fallback, route disruption, offline readiness

## 3. การปรับปรุง Settings & Auth
- เพิ่ม Input fields ในหน้า Settings สำหรับ:
  - `OVERPASS_API_ENDPOINT`
  - `OPENTOPO_API_KEY`
  - `OPENWEATHER_API_KEY`
  - สวิตช์เปิด/ปิด `Strict Offline Mode` (ตัดการเชื่อมต่อ API ภายนอกทั้งหมด และใช้เฉพาะ Local Data)
