import { GitCompareArrows, X } from 'lucide-react'
import type { Unit } from '../../types'

export const MAX_COMPARE = 3

interface CompareTrayProps {
  selected: Unit[]
  onOpen: () => void
  onRemove: (unit: Unit) => void
  onClear: () => void
}

export default function CompareTray({ selected, onOpen, onRemove, onClear }: CompareTrayProps) {
  if (selected.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-ananda-border bg-white p-4 shadow-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">
          เลือกเปรียบเทียบ {selected.length}/{MAX_COMPARE}
        </p>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-ananda-muted underline-offset-4 hover:text-ananda-ink hover:underline"
        >
          ล้างทั้งหมด
        </button>
      </div>

      <ul className="mt-3 space-y-1.5">
        {selected.map((unit) => (
          <li
            key={unit.id}
            className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 px-3 py-2"
          >
            <span className="truncate text-xs font-medium">
              {unit.unitCode} · {unit.brand}
            </span>
            <button
              type="button"
              aria-label={`เอา ${unit.unitCode} ออกจากการเปรียบเทียบ`}
              onClick={() => onRemove(unit)}
              className="shrink-0 rounded p-0.5 text-ananda-muted hover:bg-gray-200 hover:text-ananda-ink"
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onOpen}
        disabled={selected.length < 2}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-ananda-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-ananda-muted"
      >
        <GitCompareArrows size={16} />
        {selected.length < 2
          ? 'เลือกอย่างน้อย 2 ยูนิต'
          : `เปรียบเทียบ (${selected.length})`}
      </button>
    </div>
  )
}
