import type { AuditMetric } from '../types'

/** ตัวเลขจากผลตรวจสุขภาพเว็บไซต์ ananda.co.th (การบ้านข้อ 3) */
export const auditReport: AuditMetric[] = [
  {
    id: 'alt-text',
    label: 'รูปภาพขาด Alt Text',
    value: 781,
    total: 1999,
    unit: 'รูป',
    severity: 'critical',
    note: 'กระทบทั้ง SEO และการเข้าถึงของผู้ใช้ที่ใช้โปรแกรมอ่านหน้าจอ',
  },
  {
    id: 'typo',
    label: 'คำสะกดผิดสะสม',
    value: 783,
    total: null,
    unit: 'จุด',
    severity: 'warning',
    note: 'ส่วนใหญ่เกิดจากการคัดลอกเนื้อหาข้ามโครงการโดยไม่ตรวจซ้ำ',
  },
  {
    id: 'broken-link',
    label: 'ลิงก์เสีย',
    value: 0,
    total: null,
    unit: 'ลิงก์',
    severity: 'ok',
    note: 'ไม่พบลิงก์เสียในรอบการตรวจล่าสุด',
  },
  {
    id: 'oversize-image',
    label: 'ไฟล์รูปเกินขนาด (>500KB)',
    value: 59,
    total: null,
    unit: 'ไฟล์',
    severity: 'warning',
    note: 'ทำให้หน้าโครงการโหลดช้าบนมือถือ ควรบีบอัดเป็น WebP',
  },
]

export const auditSummary = {
  scannedAt: '30 ก.ค. 69',
  totalImages: 1999,
  totalPages: 412,
}
