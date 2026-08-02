import { AlertTriangle, Pencil } from 'lucide-react'
import type { Unit, UnitStatus } from '../../types'
import { formatBaht } from '../../lib/format'
import { validateUnit } from '../../lib/validation'
import Badge from '../shared/Badge'
import Button from '../shared/Button'

const STATUSES: UnitStatus[] = ['ว่าง', 'จองแล้ว', 'ทำสัญญา', 'ขายแล้ว']

interface UnitTableProps {
  units: Unit[]
  onStatusChange: (id: string, status: UnitStatus) => void
  onEdit: (unit: Unit) => void
}

export default function UnitTable({ units, onStatusChange, onEdit }: UnitTableProps) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden overflow-x-auto rounded-xl border border-ananda-border bg-white lg:block">
        <table className="w-full min-w-[1000px] text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold text-ananda-muted">
            <tr>
              <th className="p-3">รหัสยูนิต</th>
              <th className="p-3">โครงการ / แบบบ้าน</th>
              <th className="p-3">ขนาด</th>
              <th className="p-3">นอน/น้ำ/จอด</th>
              <th className="p-3">ทิศ</th>
              <th className="p-3">ราคาตั้ง</th>
              <th className="p-3">ราคาโปร</th>
              <th className="p-3">สถานะ</th>
              <th className="p-3">อัปเดต</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ananda-border">
            {units.map((unit) => {
              const issueCount = validateUnit(unit).length
              return (
                <tr key={unit.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <span className="font-semibold">{unit.unitCode}</span>
                    <span className="block text-xs text-ananda-muted">แปลง {unit.plot}</span>
                    {issueCount > 0 && (
                      <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600">
                        <AlertTriangle size={11} /> {issueCount} ปัญหา
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="block">{unit.project}</span>
                    <span className="text-xs text-ananda-muted">{unit.houseModel}</span>
                  </td>
                  <td className="p-3 text-xs">
                    {unit.areaSqWa} ตร.ว.
                    <span className="block text-ananda-muted">{unit.areaSqM} ตร.ม.</span>
                  </td>
                  <td className="p-3 tabular-nums">
                    {unit.bedrooms}/{unit.bathrooms}/{unit.parking}
                  </td>
                  <td className="p-3">{unit.direction}</td>
                  <td className="p-3 tabular-nums">{formatBaht(unit.listPrice)}</td>
                  <td className="p-3 tabular-nums">
                    {unit.promoPrice ? (
                      <span className="font-semibold text-red-600">
                        {formatBaht(unit.promoPrice)}
                      </span>
                    ) : (
                      <span className="text-ananda-muted">—</span>
                    )}
                  </td>
                  <td className="p-3">
                    <StatusSelect
                      value={unit.status}
                      onChange={(status) => onStatusChange(unit.id, status)}
                    />
                  </td>
                  <td className="p-3 text-xs text-ananda-muted">{unit.updatedAt}</td>
                  <td className="p-3">
                    <Button variant="secondary" size="sm" onClick={() => onEdit(unit)}>
                      <Pencil size={13} /> แก้ไข
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile / tablet */}
      <div className="space-y-4 lg:hidden">
        {units.map((unit) => {
          const issueCount = validateUnit(unit).length
          return (
            <article
              key={unit.id}
              className="rounded-xl border border-ananda-border bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{unit.unitCode}</p>
                  <p className="text-xs text-ananda-muted">
                    {unit.project} · {unit.houseModel}
                  </p>
                </div>
                <Badge status={unit.status} />
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-y-1.5 text-xs">
                <Row label="ขนาด" value={`${unit.areaSqWa} ตร.ว. / ${unit.areaSqM} ตร.ม.`} />
                <Row
                  label="นอน/น้ำ/จอด"
                  value={`${unit.bedrooms}/${unit.bathrooms}/${unit.parking}`}
                />
                <Row label="ทิศ" value={unit.direction} />
                <Row label="ราคาตั้ง" value={formatBaht(unit.listPrice)} />
                <Row
                  label="ราคาโปร"
                  value={unit.promoPrice ? formatBaht(unit.promoPrice) : '—'}
                />
                <Row label="อัปเดต" value={unit.updatedAt} />
              </dl>

              {issueCount > 0 && (
                <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-600">
                  <AlertTriangle size={12} /> พบ {issueCount} ปัญหาก่อนเผยแพร่
                </p>
              )}

              <div className="mt-4 flex items-center gap-2">
                <StatusSelect
                  value={unit.status}
                  onChange={(status) => onStatusChange(unit.id, status)}
                />
                <Button variant="secondary" size="sm" onClick={() => onEdit(unit)}>
                  <Pencil size={13} /> แก้ไข
                </Button>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}

function StatusSelect({
  value,
  onChange,
}: {
  value: UnitStatus
  onChange: (status: UnitStatus) => void
}) {
  return (
    <label>
      <span className="sr-only">เปลี่ยนสถานะ</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as UnitStatus)}
        className="rounded-lg border border-ananda-border bg-white px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-ananda-blue focus:ring-1 focus:ring-ananda-blue"
      >
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </label>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-ananda-muted">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </>
  )
}
