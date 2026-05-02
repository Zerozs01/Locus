# 🚀 Dashboard & UI Stabilization Walkthrough (Pre-merge to Main)

เอกสารนี้สรุปการเปลี่ยนแปลงและปรับปรุงหน้า Dashboard (`GeoArchivePage.tsx`) เพื่อความเสถียรและความสวยงามตามความต้องการล่าสุดของผู้ใช้

## 🛠 1. การแก้ไข Syntax & Stability (Critical)
- **JSX Nesting Fixed:** แก้ไขปัญหา `Unexpected token` และ `Adjacent JSX elements` ที่เกิดจากการปิด Tag `<div>` และวงเล็บ `return` ไม่ครบในโหมด `help` และ `null`
- **Help Mode Summary:** กู้คืนปุ่ม "ส่งให้ AI วิเคราะห์" และจัดระเบียบโครงสร้างหน้าสรุปคำตอบให้สมบูรณ์
- **Error Prevention:** เพิ่มการใช้ `React.Fragment` พร้อม `key` ในการวน Loop เพื่อป้องกันปัญหาการ Render ที่ไม่ถูกต้อง

## ⛽ 2. การปรับปรุง Fuel Price Widget (New Logic)
- **Icon-based Toggle:** เปลี่ยนการกดดูข้อมูลจากการใช้ข้อความ (Bangchak S Evo) เป็นไอคอน `Info` เพื่อประหยัดพื้นที่
- **Chunked Row Layout:**
  - ปรับการแสดงผลข้อมูลคำนวณ (Info Section) ให้แสดง **ใต้แถวของน้ำมันชนิดนั้นๆ** โดยตรง
  - ใช้ระบบแบ่งกลุ่มทีละ 3 (Chunks of 3) เพื่อให้แถวราคาน้ำมันคงที่ 3 คอลัมน์เสมอ ไม่มีการขยับที่เมื่อเปิดข้อมูลคำนวณ
- **Single Selection Logic:** เพิ่มระบบ Auto-close โดยอนุญาตให้เปิดดูข้อมูลคำนวณได้ทีละ 1 ชนิดเท่านั้น เพื่อความสะอาดของหน้าจอ

## 📊 3. Layout & Aesthetic Enhancements
- **Dynamic Stretching:** ปรับ Grid หลักให้เป็นแบบ `items-stretch` (Default) เพื่อให้ส่วน **"เปรียบเทียบภูมิภาค"** และ **"ราคาน้ำมัน"** มีความสูงเท่ากันเสมอเมื่อมีการขยายเนื้อหา ลดช่องว่าง (Gap) ในดีไซน์
- **Regional Histogram:** จัดเรียงกราฟ Histogram ใหม่ให้แสดงผลเต็มพื้นที่ Card พร้อมปรับสีแท่งกราฟเป็น Gradient ธีมเดียวกับ Thai Map
- **Sidebar Identity:** 
  - เปลี่ยนไอคอนสมอง → **ไอคอน Chat**
  - เปลี่ยนชื่อ "Locus Intelligence" → **"Locus Agent"**
  - เปลี่ยนไอคอนชีพจรในหน้าข่าว → **ไอคอน News/Newspaper**

## 📂 4. โครงสร้างไฟล์หลัก (GeoArchivePage.tsx)
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
