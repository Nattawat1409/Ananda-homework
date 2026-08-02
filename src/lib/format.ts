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
