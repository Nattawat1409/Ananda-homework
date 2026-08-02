import { SEO_DESCRIPTION_MAX, SEO_TITLE_MAX } from '../../lib/validation'

interface SEOHelperProps {
  title: string
  description: string
  slug: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
}

export default function SEOHelper({
  title,
  description,
  slug,
  onTitleChange,
  onDescriptionChange,
}: SEOHelperProps) {
  return (
    <section className="rounded-xl border border-ananda-border p-4">
      <h3 className="text-sm font-bold">SEO</h3>

      <Field
        label="SEO Title"
        value={title}
        max={SEO_TITLE_MAX}
        onChange={onTitleChange}
        placeholder="เช่น Artale อโศก-พระราม 9 บ้านเดี่ยว 5 ห้องนอน"
      />

      <Field
        label="SEO Description"
        value={description}
        max={SEO_DESCRIPTION_MAX}
        onChange={onDescriptionChange}
        multiline
        placeholder="สรุปจุดเด่นของยูนิตให้ครบใน 1–2 ประโยค"
      />

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold text-ananda-muted">ตัวอย่างผลลัพธ์บน Google</p>
        <div className="rounded-lg border border-ananda-border bg-white p-4">
          <p className="text-xs text-[#202124]">ananda.co.th › {slug}</p>
          <p className="mt-1 truncate text-lg leading-snug text-[#1a0dab]">
            {title || 'ยังไม่ได้กรอก SEO Title'}
          </p>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#4d5156]">
            {description || 'ยังไม่ได้กรอก SEO Description'}
          </p>
        </div>
      </div>
    </section>
  )
}

interface FieldProps {
  label: string
  value: string
  max: number
  placeholder: string
  multiline?: boolean
  onChange: (value: string) => void
}

function Field({ label, value, max, placeholder, multiline, onChange }: FieldProps) {
  const over = value.length > max
  const inputClass = `w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 ${
    over
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-ananda-border focus:border-ananda-blue focus:ring-ananda-blue'
  }`

  return (
    <div className="mt-4">
      <div className="mb-1.5 flex items-baseline justify-between">
        <label className="text-xs font-semibold text-ananda-ink">{label}</label>
        <span
          className={`text-xs font-semibold tabular-nums ${over ? 'text-red-600' : 'text-ananda-muted'}`}
        >
          {value.length} / {max}
        </span>
      </div>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
        />
      )}
      {over && (
        <p className="mt-1 text-xs text-red-600">
          ยาวเกิน {value.length - max} ตัวอักษร — Google อาจตัดข้อความท้ายทิ้ง
        </p>
      )}
    </div>
  )
}
