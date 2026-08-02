import { Search } from 'lucide-react'
import type { Direction, PropertyType, UnitStatus } from '../../types'
import { formatMillion } from '../../lib/format'

export const MAX_PRICE = 100_000_000

export interface Filters {
  query: string
  propertyType: PropertyType | 'ทั้งหมด'
  location: string
  status: UnitStatus | 'ทั้งหมด'
  priceRange: [number, number]
  petFriendly: boolean
  nearInternationalSchool: boolean
  nearBTS: boolean
  directions: Direction[]
}

export const emptyFilters: Filters = {
  query: '',
  propertyType: 'ทั้งหมด',
  location: 'ทั้งหมด',
  status: 'ทั้งหมด',
  priceRange: [0, MAX_PRICE],
  petFriendly: false,
  nearInternationalSchool: false,
  nearBTS: false,
  directions: [],
}

const PROPERTY_TYPES: (PropertyType | 'ทั้งหมด')[] = [
  'ทั้งหมด',
  'คอนโดมิเนียม',
  'บ้านเดี่ยว',
  'ทาวน์โฮม',
]
const STATUSES: (UnitStatus | 'ทั้งหมด')[] = ['ทั้งหมด', 'ว่าง', 'จองแล้ว', 'ทำสัญญา', 'ขายแล้ว']
const DIRECTIONS: Direction[] = ['เหนือ', 'ใต้', 'ตะวันออก', 'ตะวันตก']

interface FilterBarProps {
  filters: Filters
  locations: string[]
  resultCount: number
  onChange: (filters: Filters) => void
  onReset: () => void
}

const selectClass =
  'w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none focus:border-white/60'

export default function FilterBar({
  filters,
  locations,
  resultCount,
  onChange,
  onReset,
}: FilterBarProps) {
  const patch = (partial: Partial<Filters>) => onChange({ ...filters, ...partial })

  const toggleDirection = (direction: Direction) =>
    patch({
      directions: filters.directions.includes(direction)
        ? filters.directions.filter((d) => d !== direction)
        : [...filters.directions, direction],
    })

  const [minPrice, maxPrice] = filters.priceRange

  return (
    <div className="mx-auto max-w-6xl px-4 lg:px-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="relative block">
          <span className="sr-only">ค้นหารหัสยูนิตหรือโครงการ</span>
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
          />
          <input
            type="search"
            value={filters.query}
            onChange={(event) => patch({ query: event.target.value })}
            placeholder="ค้นหารหัสยูนิต / โครงการ"
            className={`${selectClass} pl-9 placeholder:text-white/50`}
          />
        </label>

        <label className="block">
          <span className="sr-only">ประเภทที่อยู่อาศัย</span>
          <select
            value={filters.propertyType}
            onChange={(event) =>
              patch({ propertyType: event.target.value as Filters['propertyType'] })
            }
            className={selectClass}
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type} className="text-ananda-ink">
                {type === 'ทั้งหมด' ? 'ประเภทที่อยู่อาศัย: ทั้งหมด' : type}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="sr-only">ทำเลที่ตั้ง</span>
          <select
            value={filters.location}
            onChange={(event) => patch({ location: event.target.value })}
            className={selectClass}
          >
            <option value="ทั้งหมด" className="text-ananda-ink">
              ทำเลที่ตั้ง: ทั้งหมด
            </option>
            {locations.map((location) => (
              <option key={location} value={location} className="text-ananda-ink">
                {location}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="sr-only">สถานะ</span>
          <select
            value={filters.status}
            onChange={(event) => patch({ status: event.target.value as Filters['status'] })}
            className={selectClass}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status} className="text-ananda-ink">
                {status === 'ทั้งหมด' ? 'สถานะ: ทั้งหมด' : status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <PriceRangeSlider
        min={minPrice}
        max={maxPrice}
        onChange={(range) => patch({ priceRange: range })}
      />

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Chip
          active={filters.petFriendly}
          onClick={() => patch({ petFriendly: !filters.petFriendly })}
        >
          Pet-Friendly 🐾
        </Chip>
        <Chip
          active={filters.nearInternationalSchool}
          onClick={() => patch({ nearInternationalSchool: !filters.nearInternationalSchool })}
        >
          ใกล้โรงเรียนนานาชาติ 🎓
        </Chip>
        <Chip active={filters.nearBTS} onClick={() => patch({ nearBTS: !filters.nearBTS })}>
          ใกล้ BTS 🚇
        </Chip>
        <span className="mx-1 hidden h-5 w-px bg-white/20 sm:block" />
        {DIRECTIONS.map((direction) => (
          <Chip
            key={direction}
            active={filters.directions.includes(direction)}
            onClick={() => toggleDirection(direction)}
          >
            ทิศ{direction}
          </Chip>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <p className="text-sm text-white/70">
          พบ <span className="font-bold text-ananda-yellow">{resultCount}</span> ยูนิต
        </p>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          ล้างตัวกรอง
        </button>
      </div>
    </div>
  )
}

interface ChipProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function Chip({ active, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? 'border-ananda-yellow bg-ananda-yellow text-ananda-ink'
          : 'border-white/25 text-white/80 hover:border-white/60 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

interface PriceRangeSliderProps {
  min: number
  max: number
  onChange: (range: [number, number]) => void
}

const STEP = 100_000

/**
 * Two overlaid range inputs. Replaces the old fixed price buckets, which left
 * gaps between brackets (issue F-04 in the audit).
 */
function PriceRangeSlider({ min, max, onChange }: PriceRangeSliderProps) {
  const leftPercent = (min / MAX_PRICE) * 100
  const rightPercent = (max / MAX_PRICE) * 100

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-white/80">ช่วงราคา</span>
        <span className="text-sm font-semibold text-ananda-yellow">
          {formatMillion(min)} – {formatMillion(max)} บาท
        </span>
      </div>
      <div className="relative h-4">
        <div className="absolute top-1.5 h-1 w-full rounded-full bg-white/20" />
        <div
          className="absolute top-1.5 h-1 rounded-full bg-ananda-yellow"
          style={{ left: `${leftPercent}%`, width: `${rightPercent - leftPercent}%` }}
        />
        <input
          type="range"
          aria-label="ราคาต่ำสุด"
          min={0}
          max={MAX_PRICE}
          step={STEP}
          value={min}
          onChange={(event) => onChange([Math.min(Number(event.target.value), max), max])}
          className="range-thumb top-1.5"
        />
        <input
          type="range"
          aria-label="ราคาสูงสุด"
          min={0}
          max={MAX_PRICE}
          step={STEP}
          value={max}
          onChange={(event) => onChange([min, Math.max(Number(event.target.value), min)])}
          className="range-thumb top-1.5"
        />
      </div>
    </div>
  )
}
