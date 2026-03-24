# Locus: Data Acquisition & Storage Strategy

## 1. External APIs (สำหรับใส่ใน Settings)
หากต้องการให้แอปมีการอัปเดตสถานการณ์แบบ Real-time (หรือจำลองสถานการณ์):
- **Overpass API (OpenStreetMap):** [สำคัญสุด] ใช้ดึงข้อมูลโครงสร้างพื้นฐานแบบโคตรละเอียด (พิกัดร้านขายยา, ร้านวัสดุก่อสร้าง, บ่อน้ำ, แนวเสาไฟฟ้า) ฟรีและดึงข้อมูลเฉพาะ Area ได้
- **OpenTopoData API:** ใช้ดึงข้อมูล Elevation (ความสูงชันของพื้นที่) เพื่อวิเคราะห์ความเหนื่อยล้าในการเดินทางและการหนีขึ้นที่สูง
- **OpenWeatherMap API:** ดึงสภาพอากาศปัจจุบัน (ฝนตกทำให้ดินโคลนถล่มหรือหนาวเกินไปจนอุณหภูมิร่างกายลดต่ำ)

### Current App Behavior
- ปัจจุบันหน้า Settings ใช้ `Ngrok Tunnel URL` เพื่อเชื่อม n8n workflow ผ่าน Electron bridge ไม่ใช่ direct browser fetch
- Workflow ที่แอปคาดหวังเป็น baseline คือ:
  - `GET /webhook/health`
  - `POST /webhook/chat`
- ค่าที่เปลี่ยนเร็ว เช่น weather / disruption / hazard snapshot ไม่ควรฝังเป็น LightRAG knowledge หลัก แต่ควรดึงผ่าน API หรือ cache แยก

## 2. Local Storage Strategy (Ultimate Offline Mode)
*หากไม่ต้องกังวลเรื่องขนาดแอป (รันบน Desktop/Mini PC อยู่แล้ว)*
เพื่อการเอาชีวิตรอดที่แท้จริง แอปต้องทำงานได้แม้ไฟดับและอินเทอร์เน็ตล่ม ข้อมูลที่ควรฝัง (Embed) ไว้ใน Local Database (SQLite/Supabase Local) คือ:
- **Offline Topographical GeoJSON:** ข้อมูลความสูงและรูปร่างแผนที่ไทยแบบละเอียด (ไม่ต้องรอโหลดจากเน็ต)
- **Survival Knowledge Base (Text & Low-res Images):** สารานุกรมพืช สัตว์ และการปฐมพยาบาลขั้นพื้นฐานถึงขั้นสูง ดึงมาใช้งานร่วมกับ LightRAG ได้ทันทีแบบออฟไลน์
- **Grid-based Resource Map:** ข้อมูลสถิติประชากรของไทยในแต่ละตารางกิโลเมตร (ใช้อนุมานความเสี่ยงของจำนวนซอมบี้)

### Recommended Knowledge Split
- **Static / Slow-moving (เหมาะกับ LightRAG):**
  - tactical topology
  - flora / fauna / botany
  - climate physiology principles
  - first aid / sanitation
  - infrastructure roles and strategic implications
  - province dossiers
- **Semi-static (เหมาะกับ SQLite cache):**
  - strategic facility inventory
  - transport corridor metadata
  - hospital tiers / supply hubs
- **Live (เหมาะกับ API + scheduled refresh):**
  - weather now / forecast
  - flood / landslide / disruption alerts
  - route closure / service interruption

## 3. Multi-Layer Analysis (Security & Stability)
- **Software:** ใช้ระบบ Caching ที่ดุดัน แผนที่ไหนโหลดแล้วต้องเซฟลง Disk ทันที
- **Account:** ข้อมูลยุทธวิธีและเส้นทางลับส่วนตัว ต้องเข้ารหัส (Encryption) ใน Local DB
- **Hardware:** ระวังการ Render กราฟิก Threat Map ที่ซ้อนทับกันหลาย Layer อาจทำให้เครื่อง Beelink Mini PC ของนายความร้อนขึ้นและดับกลางอากาศได้ ต้องทำ Debounce/Lazy loading เวลาซูมแผนที่

## 4. Intelligence Workflow Notes
- หน้า `IntelligencePage.tsx` มี recent chat persistence ในแอปเองแล้ว (`locus_intelligence_chat_v3`) จึงไม่ต้องรอให้ Supabase/LightRAG เป็นเจ้าของ history ทุกอย่าง
- `sessionId` จะถูกส่งไป n8n ทุกครั้ง เพื่อให้ `Postgres Chat Memory` หรือ memory backend อื่นผูกกับ conversation เดิมได้
- การตอบกลับจาก n8n ควรส่ง JSON object ปกติ เช่น `{ "output": "..." }`
- ตัวแอป render markdown เบื้องต้นเองแล้ว จึงไม่จำเป็นต้องแปลงเป็น HTML ใน `Respond to Webhook`
