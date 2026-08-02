import type { UnitStatus } from '../../types'

const STATUS_STYLES: Record<UnitStatus, string> = {
  ว่าง: 'bg-emerald-100 text-emerald-700',
  จองแล้ว: 'bg-amber-100 text-amber-700',
  ทำสัญญา: 'bg-blue-100 text-blue-700',
  ขายแล้ว: 'bg-gray-200 text-gray-600',
}

interface BadgeProps {
  status: UnitStatus
  className?: string
}

export default function Badge({ status, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status]} ${className}`}
    >
      {status}
    </span>
  )
}
