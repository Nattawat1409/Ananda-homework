import type { Unit, ValidationIssue } from '../types'

export const SEO_TITLE_MAX = 60
export const SEO_DESCRIPTION_MAX = 155
export const IMAGE_SIZE_MAX_KB = 300

/** ตรวจก่อน Publish ตามเกณฑ์การบ้านข้อ 8.3 */
export function validateUnit(unit: Unit): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  const oversized = unit.imageSizesKB
    .map((size, index) => ({ size, index }))
    .filter(({ size }) => size > IMAGE_SIZE_MAX_KB)

  if (oversized.length > 0) {
    issues.push({
      id: 'image-size',
      level: 'warning',
      message: `มีรูปขนาดเกิน ${IMAGE_SIZE_MAX_KB}KB จำนวน ${oversized.length} รูป (รูปที่ ${oversized
        .map(({ index }) => index + 1)
        .join(', ')}) — ควรบีบอัดก่อนเผยแพร่`,
    })
  }

  const missingAlt = unit.images
    .map((_, index) => index)
    .filter((index) => !unit.altTexts[index]?.trim())

  if (missingAlt.length > 0) {
    issues.push({
      id: 'alt-text',
      level: 'error',
      message: `มีรูปที่ยังไม่มี Alt Text ${missingAlt.length} รูป (รูปที่ ${missingAlt
        .map((index) => index + 1)
        .join(', ')})`,
    })
  }

  if (!unit.seoTitle.trim()) {
    issues.push({ id: 'seo-title-empty', level: 'error', message: 'ยังไม่ได้กรอก SEO Title' })
  } else if (unit.seoTitle.length > SEO_TITLE_MAX) {
    issues.push({
      id: 'seo-title-long',
      level: 'error',
      message: `SEO Title ยาว ${unit.seoTitle.length} ตัวอักษร (เกิน ${SEO_TITLE_MAX})`,
    })
  }

  if (!unit.seoDescription.trim()) {
    issues.push({
      id: 'seo-desc-empty',
      level: 'error',
      message: 'ยังไม่ได้กรอก SEO Description',
    })
  } else if (unit.seoDescription.length > SEO_DESCRIPTION_MAX) {
    issues.push({
      id: 'seo-desc-long',
      level: 'error',
      message: `SEO Description ยาว ${unit.seoDescription.length} ตัวอักษร (เกิน ${SEO_DESCRIPTION_MAX})`,
    })
  }

  if (unit.promoPrice !== null && unit.promoPrice >= unit.listPrice) {
    issues.push({
      id: 'promo-price',
      level: 'error',
      message: 'ราคาโปรโมชั่นต้องต่ำกว่าราคาตั้ง',
    })
  }

  return issues
}

export const canPublish = (issues: ValidationIssue[]): boolean =>
  issues.every((issue) => issue.level !== 'error')
