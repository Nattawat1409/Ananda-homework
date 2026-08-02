export type UnitStatus = 'ว่าง' | 'จองแล้ว' | 'ทำสัญญา' | 'ขายแล้ว'

export type Direction = 'เหนือ' | 'ใต้' | 'ตะวันออก' | 'ตะวันตก'

export type PropertyType = 'คอนโดมิเนียม' | 'บ้านเดี่ยว' | 'ทาวน์โฮม'

export interface Unit {
  id: string
  unitCode: string
  plot: string
  project: string
  brand: string
  houseModel: string
  propertyType: PropertyType
  location: string
  areaSqWa: number
  areaSqM: number
  bedrooms: number
  bathrooms: number
  parking: number
  direction: Direction
  listPrice: number
  promoPrice: number | null
  status: UnitStatus
  updatedAt: string
  petFriendly: boolean
  nearInternationalSchool: boolean
  nearBTS: boolean
  images: string[]
  altTexts: string[]
  seoTitle: string
  seoDescription: string
  /** Mock byte sizes for the pre-publish image-weight check (parallel to `images`). */
  imageSizesKB: number[]
}

export interface AuditMetric {
  id: string
  label: string
  value: number
  total: number | null
  unit: string
  severity: 'critical' | 'warning' | 'ok'
  note: string
}

export interface ValidationIssue {
  id: string
  level: 'error' | 'warning'
  message: string
}

export interface BookingSlot {
  date: string
  time: string
}
