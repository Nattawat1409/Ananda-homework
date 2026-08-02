const COLUMNS = [
  { title: 'ที่อยู่อาศัย', links: ['คอนโดมิเนียม', 'บ้านเดี่ยว', 'ทาวน์โฮม', 'โครงการพร้อมอยู่'] },
  { title: 'เกี่ยวกับเรา', links: ['ข้อมูลบริษัท', 'นักลงทุนสัมพันธ์', 'ร่วมงานกับเรา', 'ข่าวสาร'] },
  { title: 'บริการลูกค้า', links: ['นัดชมโครงการ', 'คำนวณสินเชื่อ', 'ติดต่อเรา', 'คำถามที่พบบ่อย'] },
]

export default function Footer() {
  return (
    <footer className="bg-ananda-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <span className="text-xl font-bold tracking-[0.25em]">ANANDA</span>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            ระบบจัดการยูนิตที่อยู่อาศัย (ตัวอย่างสำหรับการบ้านฝึกงาน) — ข้อมูลทั้งหมดเป็นข้อมูลจำลอง
          </p>
        </div>
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="mb-3 text-sm font-semibold">{column.title}</h3>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#units" className="text-sm text-white/60 transition-colors hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © 2569 Ananda Development PLC. — Demo project, ไม่ใช่เว็บไซต์จริง
      </div>
    </footer>
  )
}
