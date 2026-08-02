export const formatBaht = (value: number): string => `฿${value.toLocaleString('th-TH')}`

/** 42,900,000 → "42.9 ล้าน" */
export const formatMillion = (value: number): string => {
  const millions = value / 1_000_000
  const rounded = Number.isInteger(millions) ? millions : Number(millions.toFixed(2))
  return `${rounded.toLocaleString('th-TH')} ล้าน`
}

export const discountPercent = (listPrice: number, promoPrice: number): number =>
  Math.round(((listPrice - promoPrice) / listPrice) * 100)

export const effectivePrice = (listPrice: number, promoPrice: number | null): number =>
  promoPrice ?? listPrice

const THAI_MONTHS_SHORT = [
  'ม.ค.',
  'ก.พ.',
  'มี.ค.',
  'เม.ย.',
  'พ.ค.',
  'มิ.ย.',
  'ก.ค.',
  'ส.ค.',
  'ก.ย.',
  'ต.ค.',
  'พ.ย.',
  'ธ.ค.',
]

/** ปี พ.ศ. 2 หลัก ให้ตรงกับรูปแบบ "30 ก.ค. 69" ที่ใช้ใน mock data เดิม */
export const formatThaiShortDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = THAI_MONTHS_SHORT[date.getMonth()]
  const buddhistYear = (date.getFullYear() + 543) % 100
  return `${day} ${month} ${buddhistYear}`
}
