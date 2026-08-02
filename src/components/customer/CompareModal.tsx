import type { Unit } from '../../types'
import { effectivePrice, formatBaht } from '../../lib/format'
import Badge from '../shared/Badge'
import Modal from '../shared/Modal'

interface Row {
  label: string
  render: (unit: Unit) => React.ReactNode
  /** Marks the winning cell(s) — lowest price, largest area, most rooms. */
  best?: (unit: Unit) => number
  bestDirection?: 'min' | 'max'
}

const ROWS: Row[] = [
  { label: 'สถานะ', render: (unit) => <Badge status={unit.status} /> },
  { label: 'โครงการ', render: (unit) => unit.project },
  { label: 'แบบบ้าน', render: (unit) => unit.houseModel },
  { label: 'ประเภท', render: (unit) => unit.propertyType },
  { label: 'ทำเล', render: (unit) => unit.location },
  {
    label: 'ราคาที่ต้องจ่าย',
    render: (unit) => (
      <span className="font-bold">
        {formatBaht(effectivePrice(unit.listPrice, unit.promoPrice))}
      </span>
    ),
    best: (unit) => effectivePrice(unit.listPrice, unit.promoPrice),
    bestDirection: 'min',
  },
  {
    label: 'ราคาตั้ง',
    render: (unit) => formatBaht(unit.listPrice),
  },
  {
    label: 'ขนาดที่ดิน',
    render: (unit) => `${unit.areaSqWa} ตร.ว.`,
    best: (unit) => unit.areaSqWa,
    bestDirection: 'max',
  },
  {
    label: 'พื้นที่ใช้สอย',
    render: (unit) => `${unit.areaSqM} ตร.ม.`,
    best: (unit) => unit.areaSqM,
    bestDirection: 'max',
  },
  {
    label: 'ห้องนอน',
    render: (unit) => `${unit.bedrooms} ห้อง`,
    best: (unit) => unit.bedrooms,
    bestDirection: 'max',
  },
  { label: 'ห้องน้ำ', render: (unit) => `${unit.bathrooms} ห้อง` },
  { label: 'ที่จอดรถ', render: (unit) => `${unit.parking} คัน` },
  { label: 'ทิศ', render: (unit) => unit.direction },
  { label: 'Pet-Friendly', render: (unit) => (unit.petFriendly ? '✅ ได้' : '—') },
  {
    label: 'ใกล้โรงเรียนนานาชาติ',
    render: (unit) => (unit.nearInternationalSchool ? '✅ ใกล้' : '—'),
  },
  { label: 'ใกล้ BTS/MRT', render: (unit) => (unit.nearBTS ? '✅ ใกล้' : '—') },
]

interface CompareModalProps {
  open: boolean
  units: Unit[]
  onClose: () => void
}

export default function CompareModal({ open, units, onClose }: CompareModalProps) {
  if (units.length === 0) return null

  const bestValueFor = (row: Row): number | null => {
    if (!row.best) return null
    const values = units.map(row.best)
    return row.bestDirection === 'min' ? Math.min(...values) : Math.max(...values)
  }

  return (
    <Modal open={open} title={`เปรียบเทียบ ${units.length} ยูนิต`} onClose={onClose} maxWidth="max-w-5xl">
      <div className="p-5">
        {/* Desktop: side-by-side table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-44 border-b border-ananda-border p-3 text-left text-xs font-semibold text-ananda-muted">
                  รายการ
                </th>
                {units.map((unit) => (
                  <th key={unit.id} className="border-b border-ananda-border p-3 text-left">
                    <img
                      src={unit.images[0]}
                      alt={unit.altTexts[0] || unit.project}
                      className="mb-2 h-24 w-full rounded-lg object-cover"
                    />
                    <span className="block text-sm font-bold">{unit.unitCode}</span>
                    <span className="block text-xs font-normal text-ananda-muted">
                      {unit.brand}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                const best = bestValueFor(row)
                return (
                  <tr key={row.label} className="even:bg-gray-50">
                    <th className="p-3 text-left text-xs font-semibold text-ananda-muted">
                      {row.label}
                    </th>
                    {units.map((unit) => {
                      const isBest = best !== null && row.best?.(unit) === best
                      return (
                        <td
                          key={unit.id}
                          className={`p-3 ${isBest ? 'font-semibold text-emerald-700' : ''}`}
                        >
                          {row.render(unit)}
                          {isBest && <span className="ml-1 text-xs">★</span>}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards */}
        <div className="space-y-5 md:hidden">
          {units.map((unit) => (
            <section key={unit.id} className="rounded-xl border border-ananda-border p-4">
              <img
                src={unit.images[0]}
                alt={unit.altTexts[0] || unit.project}
                className="mb-3 h-32 w-full rounded-lg object-cover"
              />
              <h3 className="text-sm font-bold">
                {unit.unitCode} · {unit.brand}
              </h3>
              <dl className="mt-3 divide-y divide-ananda-border text-sm">
                {ROWS.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 py-2">
                    <dt className="text-xs text-ananda-muted">{row.label}</dt>
                    <dd className="text-right">{row.render(unit)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </Modal>
  )
}
