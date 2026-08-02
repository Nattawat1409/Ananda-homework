import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import type { AuditMetric } from '../../types'
import { auditReport, auditSummary } from '../../data/auditReport'

const SEVERITY = {
  critical: {
    bar: 'bg-red-500',
    text: 'text-red-600',
    chip: 'bg-red-50 text-red-600',
    label: 'ต้องแก้ด่วน',
    Icon: XCircle,
  },
  warning: {
    bar: 'bg-amber-500',
    text: 'text-amber-600',
    chip: 'bg-amber-50 text-amber-600',
    label: 'ควรแก้',
    Icon: AlertTriangle,
  },
  ok: {
    bar: 'bg-emerald-500',
    text: 'text-emerald-700',
    chip: 'bg-emerald-50 text-emerald-700',
    label: 'ผ่าน',
    Icon: CheckCircle2,
  },
} as const

/** สัดส่วนสำหรับ progress bar — เมตริกที่ไม่มีตัวหารใช้เพดานคร่าวๆ เพื่อให้เห็นความรุนแรง */
function ratioOf(metric: AuditMetric): number {
  if (metric.total) return metric.value / metric.total
  if (metric.value === 0) return 0
  return Math.min(metric.value / 1000, 1)
}

export default function HealthCheckPanel() {
  return (
    <section className="rounded-xl border border-ananda-border bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-base font-bold">สุขภาพเนื้อหาเว็บไซต์</h2>
        <p className="text-xs text-ananda-muted">
          ตรวจล่าสุด {auditSummary.scannedAt} · {auditSummary.totalPages} หน้า ·{' '}
          {auditSummary.totalImages.toLocaleString('th-TH')} รูป
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {auditReport.map((metric) => {
          const style = SEVERITY[metric.severity]
          const ratio = ratioOf(metric)
          const percent = metric.total ? Math.round(ratio * 100) : null

          return (
            <article
              key={metric.id}
              className="flex flex-col rounded-xl border border-ananda-border p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs font-semibold leading-snug text-ananda-ink">
                  {metric.label}
                </h3>
                <style.Icon size={16} className={`shrink-0 ${style.text}`} />
              </div>

              <p className={`mt-3 text-2xl font-bold tabular-nums ${style.text}`}>
                {metric.value.toLocaleString('th-TH')}
                {metric.total && (
                  <span className="text-sm font-medium text-ananda-muted">
                    {' '}
                    / {metric.total.toLocaleString('th-TH')}
                  </span>
                )}
                <span className="ml-1 text-xs font-medium text-ananda-muted">{metric.unit}</span>
              </p>

              {percent !== null && (
                <p className={`text-xs font-semibold ${style.text}`}>คิดเป็น {percent}%</p>
              )}

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${style.bar}`}
                  style={{ width: `${Math.max(ratio * 100, metric.value > 0 ? 4 : 0)}%` }}
                />
              </div>

              <span
                className={`mt-3 inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${style.chip}`}
              >
                {style.label}
              </span>

              <p className="mt-3 text-[11px] leading-relaxed text-ananda-muted">{metric.note}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
