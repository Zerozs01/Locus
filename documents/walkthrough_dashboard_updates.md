# 🚀 Dashboard & UI Stabilization Walkthrough (Pre-merge to Main)

เอกสารนี้สรุปการเปลี่ยนแปลงและปรับปรุงหน้า Dashboard (`GeoArchivePage.tsx`) เพื่อความเสถียรและความสวยงามตามความต้องการล่าสุดของผู้ใช้

## 🛠 1. การแก้ไข Syntax & Stability (Critical)
- **JSX Nesting Fixed:** แก้ไขปัญหา `Unexpected token` และ `Adjacent JSX elements` ที่เกิดจากการปิด Tag `<div>` และวงเล็บ `return` ไม่ครบในโหมด `help` และ `null`
- **Help Mode Summary:** กู้คืนปุ่ม "ส่งให้ AI วิเคราะห์" และจัดระเบียบโครงสร้างหน้าสรุปคำตอบให้สมบูรณ์
- **Error Prevention:** เพิ่มการใช้ `React.Fragment` พร้อม `key` ในการวน Loop เพื่อป้องกันปัญหาการ Render ที่ไม่ถูกต้อง

## ⛽ 2. การปรับปรุง Fuel Price Widget (New Logic)
- **Cross-domain Retrieval:** ราคาน้ำมันดึงจากหน้า Bangchak แบบ public endpoint ผ่าน Electron main process โดยใช้ `no-proxy session` ก่อนส่งกลับมาให้ renderer
- **Parse Strategy:** ระบบจะพยายามอ่าน payload แบบ JSON ก่อน ถ้าไม่สำเร็จจะ fallback ไปไล่หา HTML/script pattern เพื่อดึงชื่อชนิดน้ำมันและราคา
- **Realtime Travel Cost:** ข้อมูลนี้ถูกนำไปใช้คำนวณค่าใช้จ่ายในการเดินทางโดยประมาณแบบ cross-domain เพื่อช่วยลดปัญหา context mismatch ของแอปแผนที่ทั่วไป
- **UI Behavior:** ปรับการแสดงผล Info section ให้อยู่ใต้แถวของน้ำมันชนิดนั้นโดยตรง พร้อมคง layout 3 คอลัมน์ให้ไม่ขยับเมื่อเปิดรายละเอียด
- **Single Selection Logic:** เปิดดูข้อมูลคำนวณได้ทีละ 1 ชนิดเท่านั้น เพื่อให้อ่านง่ายและไม่รบกวนสายตา

## 📊 3. Layout & Aesthetic Enhancements
- **Dynamic Stretching:** ปรับ Grid หลักให้เป็นแบบ `items-stretch` (Default) เพื่อให้ส่วน **"เปรียบเทียบภูมิภาค"** และ **"ราคาน้ำมัน"** มีความสูงเท่ากันเสมอเมื่อมีการขยายเนื้อหา ลดช่องว่าง (Gap) ในดีไซน์
- **Regional Histogram:** จัดเรียงกราฟ Histogram ใหม่ให้แสดงผลเต็มพื้นที่ Card พร้อมปรับสีแท่งกราฟเป็น Gradient ธีมเดียวกับ Thai Map
- **Sidebar Identity:** 
  - เปลี่ยนไอคอนสมอง → **ไอคอน Chat**
  - เปลี่ยนชื่อ "Locus Intelligence" → **"Locus Agent"**
  - เปลี่ยนไอคอนชีพจรในหน้าข่าว → **ไอคอน News/Newspaper**

## 🗺 4. ระบบ Multi-Region Filter (Explore Mode)
- **Multi-Selection Logic:** ปรับปรุงระบบ Filter จากการเลือกได้ทีละภูมิภาค เป็นแบบเลือกได้พร้อมกันหลายอัน (Multi-select)
- **Toggle State:** 
  - กดภูมิภาคที่ต้องการเพื่อเพิ่มเข้าไปใน Filter
  - กดภูมิภาคเดิมซ้ำเพื่อยกเลิกการเลือก
  - กดปุ่ม "ทั้งหมด" เพื่อล้างการกรองข้อมูล
- **UI & Accessibility:**
  - เพิ่มเครื่องหมาย **✓** และเอฟเฟกต์ Glow สีตามภูมิภาคที่เลือกใน Dropdown
  - ปรับปรุงปุ่ม Filter ให้แสดงจำนวนภูมิภาคที่ถูกเลือกอยู่ (เช่น "เลือกแล้ว 2 ภูมิภาค")
  - ปรับส่วนสรุปผลลัพธ์ให้แสดง Chip ของทุกภูมิภาคที่เลือกพร้อมกัน
- **Data Filtering:** ปรับปรุง `useEffect` ในการดึงข้อมูลจาก SQLite ให้รองรับการตรวจสอบ Array ของภูมิภาคโดยใช้ `.includes()`

## 📂 5. โครงสร้างไฟล์หลัก (GeoArchivePage.tsx)
ไฟล์ปัจจุบันถูกแบ่งสัดส่วน Logic ชัดเจนตาม `mode`:
1. **`mode === null`**: หน้า Home Dashboard (Summary Widgets)
2. **`mode === 'help'`**: ระบบ "ช่วยเลือกให้หน่อย" (Questionnaire Flow & AI Summary)
3. **`mode === 'explore'`**: ระบบ "สำรวจตามความสนใจ" (Discovery Chips & Filtered Grid)

---

### ✅ Checklist ก่อน Commit
- [x] ตรวจสอบการปิด Tag `</div>` ครบทุกบล็อก
- [x] ตรวจสอบว่าไม่มี Syntax Error ใน Babel Compiler
- [x] ตรวจสอบการทำงานของปุ่ม Back ในทุกโหมด
- [x] ตรวจสอบการรับส่งค่าจาก Help Mode ไปยังหน้า Intelligence (Locus Agent)

> [!TIP]
> **Next Step:** หากไฟล์ `GeoArchivePage.tsx` เริ่มมีขนาดใหญ่เกินไปในอนาคต แนะนำให้แยกส่วน `GasPriceWidget` และ `RegionalHistogram` ออกเป็น Component ย่อยเพื่อให้อ่านง่ายขึ้น
