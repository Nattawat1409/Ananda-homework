# Ananda CMS — Unit Management + Roadmap POC

Demo ระบบ CMS จัดการยูนิตบ้าน + ฟีเจอร์ roadmap สำหรับการบ้านฝึกงาน (ข้อ 2 + ข้อ 8)

> ข้อมูลทั้งหมดเป็นข้อมูลจำลอง (mock) ไม่มี backend — ไม่ใช่เว็บไซต์จริงของ Ananda Development

## เริ่มใช้งาน

```bash
npm install
```

```bash
npm run dev
```

เปิด http://localhost:5173 — หน้าลูกค้าอยู่ที่ `/` และหน้า Admin อยู่ที่ `/admin` (สลับได้จากปุ่มบน navbar)

```bash
npm run build
```

## Tech stack

Vite · React 18 · TypeScript · Tailwind CSS v3 · react-router-dom v6 · lucide-react

State ใช้ `useState` + `useContext` (`src/context/UnitsContext.tsx`) เพื่อให้การแก้ไขในหน้า Admin
สะท้อนไปหน้าลูกค้าทันที โดยไม่ต้องใช้ state management library

## โครงสร้างไฟล์

```
src/
├── data/
│   ├── units.ts          # mock 5 ยูนิต จาก 5 แบรนด์ในเครือ
│   └── auditReport.ts    # ตัวเลข health check (การบ้านข้อ 3)
├── types/index.ts
├── lib/
│   ├── format.ts         # จัดรูปแบบราคา/ส่วนลด
│   └── validation.ts     # กติกา pre-publish validation
├── context/UnitsContext.tsx
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── admin/            # UnitTable, UnitFormModal, SEOHelper, HealthCheckPanel
│   ├── customer/         # FilterBar, UnitCard, UnitDetailModal, CompareTray, CompareModal, BookingCalendar
│   └── shared/           # Badge, Button, Modal
├── pages/                # CustomerPage, AdminPage
├── App.tsx
└── main.tsx
```

## ฟีเจอร์

### หน้าลูกค้า (`/`)

- **Price range slider** เลือกช่วงราคา 0–100 ล้านได้ต่อเนื่อง แทน dropdown แบบช่วงตายตัว
  ที่ทำให้เกิดช่องว่างระหว่างช่วงราคา (ปัญหา F-04)
- **Behavioral filter chips** — Pet-Friendly, ใกล้โรงเรียนนานาชาติ, ใกล้ BTS และทิศ (ข้อ 8.5)
- **Compare** — เลือกได้สูงสุด 3 ยูนิต ผ่าน checkbox บนการ์ด, floating tray มุมล่างขวา,
  ตารางเทียบ side-by-side พร้อมไฮไลต์ค่าที่ดีที่สุดด้วย ★ (ข้อ 8.6)
- **Unit detail** — gallery 8 รูปเรียงตามข้อ 2.3 (facade → plan-2f) แสดง alt text ของแต่ละรูป
  และเตือนเมื่อรูปไหนยังไม่มี alt text พร้อมเทียบราคาตั้ง vs ราคาโปรโมชั่น
- **Booking calendar** — ปุ่ม "นัดชมโครงการ" เปิดปฏิทิน 7 วันข้างหน้า เลือก time slot
  10:00 / 13:00 / 15:00 (mock, ไม่ส่งข้อมูลจริง) (ข้อ 8.8)

### หน้า Admin (`/admin`)

- **Health check panel** — สรุปตัวเลขจากข้อ 3 พร้อม progress bar และระดับความรุนแรง (ข้อ 8.9)
- **Unit table** — เปลี่ยนสถานะแบบ inline ผ่าน dropdown, UI อัปเดตทันที,
  แสดงจำนวนปัญหาที่ต้องแก้ก่อนเผยแพร่ของแต่ละยูนิต (บนจอเล็กเปลี่ยนเป็น card list)
- **Pre-publish validation** — ตรวจรูปเกิน 300KB, รูปที่ขาด alt text, SEO title/description
  ที่ยาวเกิน และราคาโปรที่ไม่ต่ำกว่าราคาตั้ง แสดงเป็น checklist และบล็อกปุ่ม Publish
  เมื่อยังมีรายการสีแดง (ข้อ 8.3)
- **SEO helper** — นับตัวอักษรแบบ real-time (แดงเมื่อเกิน 60 / 155) พร้อม Google SERP preview (ข้อ 8.4)

## หมายเหตุเรื่อง mock data

ข้อมูลยูนิตตั้งใจใส่ปัญหาไว้ให้เห็น validation ทำงานจริง — เช่น `ART-A01` มีรูปเกิน 300KB
และ SEO title ยาวเกิน, `AIR2-A05` และ `AIR2-C03` มีรูปที่ขาด alt text ส่วน `AND-B02`
เป็นยูนิตที่ผ่านการตรวจครบ (แสดงสถานะเขียว "พร้อมเผยแพร่")

รูปภาพใช้ placeholder จาก Unsplash และขนาดไฟล์ (`imageSizesKB`) เป็นค่าจำลองสำหรับ
ทดสอบกฎ validation เท่านั้น

## Deploy frontend on Vercel
https://ananda-homework.vercel.app/
