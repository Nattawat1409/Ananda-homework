import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import type { Direction, Unit, UnitStatus } from '../../types'
import { canPublish, validateUnit } from '../../lib/validation'
import Button from '../shared/Button'
import Modal from '../shared/Modal'
import SEOHelper from './SEOHelper'

const STATUSES: UnitStatus[] = ['ว่าง', 'จองแล้ว', 'ทำสัญญา', 'ขายแล้ว']
const DIRECTIONS: Direction[] = ['เหนือ', 'ใต้', 'ตะวันออก', 'ตะวันตก']

interface UnitFormModalProps {
  unit: Unit | null
  onClose: () => void
  onSave: (unit: Unit) => void
}

export default function UnitFormModal({ unit, onClose, onSave }: UnitFormModalProps) {
  const [draft, setDraft] = useState<Unit | null>(unit)

  useEffect(() => setDraft(unit), [unit])

  if (!draft) return null

  const patch = (partial: Partial<Unit>) =>
    setDraft((current) => (current ? { ...current, ...partial } : current))

  const issues = validateUnit(draft)
  const publishable = canPublish(issues)

  return (
    <Modal open title={`แก้ไขยูนิต ${draft.unitCode}`} onClose={onClose} maxWidth="max-w-4xl">
      <div className="grid gap-5 p-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          <section className="rounded-xl border border-ananda-border p-4">
            <h3 className="mb-1 text-sm font-bold">ข้อมูลยูนิต</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="รหัสยูนิต"
                value={draft.unitCode}
                onChange={(value) => patch({ unitCode: value })}
              />
              <TextField
                label="แปลง"
                value={draft.plot}
                onChange={(value) => patch({ plot: value })}
              />
              <TextField
                label="โครงการ"
                value={draft.project}
                onChange={(value) => patch({ project: value })}
              />
              <TextField
                label="แบบบ้าน"
                value={draft.houseModel}
                onChange={(value) => patch({ houseModel: value })}
              />
              <NumberField
                label="ขนาดที่ดิน (ตร.ว.)"
                value={draft.areaSqWa}
                onChange={(value) => patch({ areaSqWa: value })}
              />
              <NumberField
                label="พื้นที่ใช้สอย (ตร.ม.)"
                value={draft.areaSqM}
                onChange={(value) => patch({ areaSqM: value })}
              />
              <NumberField
                label="ห้องนอน"
                value={draft.bedrooms}
                onChange={(value) => patch({ bedrooms: value })}
              />
              <NumberField
                label="ห้องน้ำ"
                value={draft.bathrooms}
                onChange={(value) => patch({ bathrooms: value })}
              />
              <NumberField
                label="ที่จอดรถ"
                value={draft.parking}
                onChange={(value) => patch({ parking: value })}
              />
              <SelectField
                label="ทิศ"
                value={draft.direction}
                options={DIRECTIONS}
                onChange={(value) => patch({ direction: value as Direction })}
              />
              <NumberField
                label="ราคาตั้ง (บาท)"
                value={draft.listPrice}
                onChange={(value) => patch({ listPrice: value })}
              />
              <NumberField
                label="ราคาโปรโมชั่น (0 = ไม่มี)"
                value={draft.promoPrice ?? 0}
                onChange={(value) => patch({ promoPrice: value > 0 ? value : null })}
              />
              <SelectField
                label="สถานะ"
                value={draft.status}
                options={STATUSES}
                onChange={(value) => patch({ status: value as UnitStatus })}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              <CheckField
                label="Pet-Friendly"
                checked={draft.petFriendly}
                onChange={(checked) => patch({ petFriendly: checked })}
              />
              <CheckField
                label="ใกล้โรงเรียนนานาชาติ"
                checked={draft.nearInternationalSchool}
                onChange={(checked) => patch({ nearInternationalSchool: checked })}
              />
              <CheckField
                label="ใกล้ BTS"
                checked={draft.nearBTS}
                onChange={(checked) => patch({ nearBTS: checked })}
              />
            </div>
          </section>

          <section className="rounded-xl border border-ananda-border p-4">
            <h3 className="mb-3 text-sm font-bold">Alt Text ของรูปภาพ ({draft.images.length} รูป)</h3>
            <div className="space-y-2">
              {draft.images.map((image, index) => {
                const missing = !draft.altTexts[index]?.trim()
                return (
                  <div key={`${image}-${index}`} className="flex items-center gap-2">
                    <img
                      src={image}
                      alt=""
                      className="h-10 w-14 shrink-0 rounded object-cover"
                      loading="lazy"
                    />
                    <input
                      type="text"
                      value={draft.altTexts[index] ?? ''}
                      placeholder={`Alt text รูปที่ ${index + 1}`}
                      onChange={(event) => {
                        const altTexts = [...draft.altTexts]
                        altTexts[index] = event.target.value
                        patch({ altTexts })
                      }}
                      className={`w-full rounded-lg border px-3 py-1.5 text-xs outline-none focus:ring-1 ${
                        missing
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                          : 'border-ananda-border focus:border-ananda-blue focus:ring-ananda-blue'
                      }`}
                    />
                    <span className="w-16 shrink-0 text-right text-[11px] tabular-nums text-ananda-muted">
                      {draft.imageSizesKB[index]}KB
                    </span>
                  </div>
                )
              })}
            </div>
          </section>

          <SEOHelper
            title={draft.seoTitle}
            description={draft.seoDescription}
            slug={draft.unitCode.toLowerCase()}
            onTitleChange={(value) => patch({ seoTitle: value })}
            onDescriptionChange={(value) => patch({ seoDescription: value })}
          />
        </div>

        <aside className="lg:sticky lg:top-4 lg:self-start">
          <div className="rounded-xl border border-ananda-border p-4">
            <h3 className="text-sm font-bold">ตรวจสอบก่อนเผยแพร่</h3>
            <p className="mt-0.5 text-xs text-ananda-muted">
              ต้องไม่มีรายการสีแดงจึงจะกด Publish ได้
            </p>

            <ul className="mt-4 space-y-2.5">
              {issues.length === 0 && (
                <li className="flex items-start gap-2 text-sm text-emerald-700">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                  ผ่านการตรวจสอบทั้งหมด พร้อมเผยแพร่
                </li>
              )}
              {issues.map((issue) => (
                <li
                  key={issue.id}
                  className={`flex items-start gap-2 text-sm ${
                    issue.level === 'error' ? 'text-red-600' : 'text-amber-600'
                  }`}
                >
                  {issue.level === 'error' ? (
                    <XCircle size={16} className="mt-0.5 shrink-0" />
                  ) : (
                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                  )}
                  <span className="leading-relaxed">{issue.message}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2">
              <Button
                size="lg"
                className="w-full"
                disabled={!publishable}
                onClick={() => onSave(draft)}
              >
                {publishable ? 'บันทึกและเผยแพร่' : 'แก้ไขข้อผิดพลาดก่อน'}
              </Button>
              <Button variant="secondary" className="w-full" onClick={onClose}>
                ยกเลิก
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </Modal>
  )
}

const fieldClass =
  'w-full rounded-lg border border-ananda-border px-3 py-2 text-sm outline-none focus:border-ananda-blue focus:ring-1 focus:ring-ananda-blue'

function TextField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      />
    </label>
  )
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold">{label}</span>
      <input
        type="number"
        value={value}
        min={0}
        onChange={(event) => onChange(Number(event.target.value))}
        className={fieldClass}
      />
    </label>
  )
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function CheckField({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-ananda-blue"
      />
      {label}
    </label>
  )
}
