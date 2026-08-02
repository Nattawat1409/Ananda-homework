import { useEffect, useState } from 'react'
import { AlertTriangle, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Unit } from '../../types'
import { discountPercent, formatBaht } from '../../lib/format'
import Badge from '../shared/Badge'
import Button from '../shared/Button'
import Modal from '../shared/Modal'
import BookingCalendar from './BookingCalendar'

const GALLERY_LABELS = [
  'หน้าบ้าน',
  'สวน',
  'ห้องนั่งเล่น',
  'ห้องครัว',
  'ห้องนอนใหญ่',
  'ห้องน้ำ',
  'แปลนชั้น 1',
  'แปลนชั้น 2',
]

/** ยูนิตที่แอดมินเพิ่ม/ลบรูปแล้วจำนวนไม่ตรง 8 รูปเดิม จะได้ label สำรองแทน undefined */
const labelFor = (index: number) => GALLERY_LABELS[index] ?? `รูปที่ ${index + 1}`

interface UnitDetailModalProps {
  unit: Unit | null
  onClose: () => void
}

export default function UnitDetailModal({ unit, onClose }: UnitDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    setActiveImage(0)
    setBookingOpen(false)
  }, [unit?.id])

  if (!unit) return null

  const total = unit.images.length
  const hasImages = total > 0
  const step = (delta: number) => setActiveImage((index) => (index + delta + total) % total)
  const currentAlt = unit.altTexts[activeImage]
  const hasPromo = unit.promoPrice !== null

  return (
    <>
      <Modal open onClose={onClose} title={`${unit.project} — ${unit.unitCode}`} maxWidth="max-w-4xl">
        <div className="p-5">
          <div className="relative overflow-hidden rounded-xl bg-gray-100">
            {hasImages ? (
              <img
                src={unit.images[activeImage]}
                alt={currentAlt || `${labelFor(activeImage)} ${unit.project}`}
                className="h-64 w-full object-cover sm:h-96"
              />
            ) : (
              <div className="flex h-64 w-full items-center justify-center text-sm text-ananda-muted sm:h-96">
                ยังไม่มีรูปภาพสำหรับยูนิตนี้
              </div>
            )}
            {hasImages && (
              <>
                <button
                  type="button"
                  aria-label="รูปก่อนหน้า"
                  onClick={() => step(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow transition-colors hover:bg-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="รูปถัดไป"
                  onClick={() => step(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow transition-colors hover:bg-white"
                >
                  <ChevronRight size={20} />
                </button>
                <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                  {activeImage + 1}/{total} · {labelFor(activeImage)}
                </span>
              </>
            )}
          </div>

          {hasImages && (
            <div className="mt-3 rounded-lg border border-ananda-border bg-gray-50 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ananda-muted">
                Alt text
              </p>
              {currentAlt ? (
                <p className="mt-1 text-sm text-ananda-ink">{currentAlt}</p>
              ) : (
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-red-600">
                  <AlertTriangle size={14} /> รูปนี้ยังไม่มี Alt Text
                </p>
              )}
            </div>
          )}

          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
            {unit.images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`ดูรูป ${labelFor(index)}`}
                className={`overflow-hidden rounded-lg border-2 transition-colors ${
                  index === activeImage ? 'border-ananda-blue' : 'border-transparent opacity-70'
                }`}
              >
                <img
                  src={image}
                  alt={unit.altTexts[index] || labelFor(index)}
                  loading="lazy"
                  className="h-14 w-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge status={unit.status} />
                <span className="text-xs text-ananda-muted">อัปเดตล่าสุด {unit.updatedAt}</span>
              </div>
              <h3 className="mt-3 text-xl font-bold">
                {unit.brand} · แบบบ้าน {unit.houseModel}
              </h3>
              <p className="mt-1 text-sm text-ananda-muted">
                {unit.propertyType} · ทำเล {unit.location} · แปลง {unit.plot}
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Fact label="ขนาดที่ดิน" value={`${unit.areaSqWa} ตร.ว.`} />
                <Fact label="พื้นที่ใช้สอย" value={`${unit.areaSqM} ตร.ม.`} />
                <Fact label="ทิศ" value={unit.direction} />
                <Fact label="ห้องนอน" value={`${unit.bedrooms} ห้อง`} />
                <Fact label="ห้องน้ำ" value={`${unit.bathrooms} ห้อง`} />
                <Fact label="ที่จอดรถ" value={`${unit.parking} คัน`} />
              </dl>
            </div>

            <aside className="rounded-xl border border-ananda-border p-5">
              <p className="text-xs text-ananda-muted">ราคาตั้ง</p>
              <p
                className={`text-lg font-semibold ${hasPromo ? 'text-ananda-muted line-through' : 'text-ananda-ink'}`}
              >
                {formatBaht(unit.listPrice)}
              </p>

              {hasPromo && (
                <>
                  <p className="mt-3 text-xs text-ananda-muted">ราคาโปรโมชั่น</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatBaht(unit.promoPrice as number)}
                  </p>
                  <p className="mt-2 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                    ประหยัด {formatBaht(unit.listPrice - (unit.promoPrice as number))} (
                    {discountPercent(unit.listPrice, unit.promoPrice as number)}%)
                  </p>
                </>
              )}

              <Button
                size="lg"
                className="mt-5 w-full"
                disabled={unit.status === 'ขายแล้ว'}
                onClick={() => setBookingOpen(true)}
              >
                <CalendarDays size={18} />
                {unit.status === 'ขายแล้ว' ? 'ยูนิตนี้ขายแล้ว' : 'นัดชมโครงการ'}
              </Button>
            </aside>
          </div>
        </div>
      </Modal>

      <BookingCalendar open={bookingOpen} unit={unit} onClose={() => setBookingOpen(false)} />
    </>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-ananda-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-ananda-ink">{value}</dd>
    </div>
  )
}
