import { Bath, BedDouble, Car, Compass, Maximize } from 'lucide-react'
import type { Unit } from '../../types'
import { discountPercent, formatBaht } from '../../lib/format'
import Badge from '../shared/Badge'
import Button from '../shared/Button'

interface UnitCardProps {
  unit: Unit
  selected: boolean
  selectionDisabled: boolean
  onToggleCompare: (unit: Unit) => void
  onOpenDetail: (unit: Unit) => void
}

export default function UnitCard({
  unit,
  selected,
  selectionDisabled,
  onToggleCompare,
  onOpenDetail,
}: UnitCardProps) {
  const hasPromo = unit.promoPrice !== null

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-ananda-border bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative">
        <img
          src={unit.images[0]}
          alt={unit.altTexts[0] || `${unit.project} แบบบ้าน ${unit.houseModel}`}
          loading="lazy"
          className="h-52 w-full object-cover"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge status={unit.status} />
          {hasPromo && (
            <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
              ลด {discountPercent(unit.listPrice, unit.promoPrice as number)}%
            </span>
          )}
        </div>
        <label className="absolute right-3 top-3 flex cursor-pointer items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow">
          <input
            type="checkbox"
            checked={selected}
            disabled={selectionDisabled && !selected}
            onChange={() => onToggleCompare(unit)}
            className="h-3.5 w-3.5 accent-ananda-blue disabled:cursor-not-allowed"
          />
          เปรียบเทียบ
        </label>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-ananda-blue">
          {unit.brand} · {unit.houseModel}
        </p>
        <h3 className="mt-1 text-base font-bold leading-snug text-ananda-ink">{unit.project}</h3>
        <p className="mt-0.5 text-xs text-ananda-muted">
          รหัสยูนิต {unit.unitCode} · แปลง {unit.plot}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs text-ananda-muted">
          <Spec icon={<BedDouble size={14} />} label={`${unit.bedrooms} ห้องนอน`} />
          <Spec icon={<Bath size={14} />} label={`${unit.bathrooms} ห้องน้ำ`} />
          <Spec icon={<Car size={14} />} label={`จอด ${unit.parking} คัน`} />
          <Spec icon={<Compass size={14} />} label={`ทิศ${unit.direction}`} />
          <Spec
            icon={<Maximize size={14} />}
            label={`${unit.areaSqM} ตร.ม. · ${unit.areaSqWa} ตร.ว.`}
          />
        </dl>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {unit.petFriendly && <Tag>Pet-Friendly 🐾</Tag>}
          {unit.nearInternationalSchool && <Tag>ใกล้ ร.ร. นานาชาติ 🎓</Tag>}
          {unit.nearBTS && <Tag>ใกล้ BTS 🚇</Tag>}
        </div>

        <div className="mt-auto pt-5">
          {hasPromo ? (
            <>
              <p className="text-xs text-ananda-muted line-through">
                {formatBaht(unit.listPrice)}
              </p>
              <p className="text-xl font-bold text-red-600">
                {formatBaht(unit.promoPrice as number)}
              </p>
            </>
          ) : (
            <p className="text-xl font-bold text-ananda-ink">{formatBaht(unit.listPrice)}</p>
          )}
          <Button className="mt-3 w-full" onClick={() => onOpenDetail(unit)}>
            ดูรายละเอียด
          </Button>
        </div>
      </div>
    </article>
  )
}

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <span>{label}</span>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-ananda-ink">
      {children}
    </span>
  )
}
