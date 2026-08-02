import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import type { Unit, UnitStatus } from '../types'
import { useUnits } from '../context/UnitsContext'
import { validateUnit } from '../lib/validation'
import { formatThaiShortDate } from '../lib/format'
import HealthCheckPanel from '../components/admin/HealthCheckPanel'
import UnitTable from '../components/admin/UnitTable'
import UnitFormModal from '../components/admin/UnitFormModal'
import Button from '../components/shared/Button'

const STATUS_FILTERS: (UnitStatus | 'ทั้งหมด')[] = [
  'ทั้งหมด',
  'ว่าง',
  'จองแล้ว',
  'ทำสัญญา',
  'ขายแล้ว',
]

const createBlankUnit = (): Unit => ({
  id: `u-${Date.now()}`,
  unitCode: '',
  plot: '',
  project: '',
  brand: '',
  houseModel: '',
  propertyType: 'บ้านเดี่ยว',
  location: '',
  areaSqWa: 0,
  areaSqM: 0,
  bedrooms: 0,
  bathrooms: 0,
  parking: 0,
  direction: 'เหนือ',
  listPrice: 0,
  promoPrice: null,
  status: 'ว่าง',
  updatedAt: formatThaiShortDate(new Date()),
  petFriendly: false,
  nearInternationalSchool: false,
  nearBTS: false,
  images: [],
  altTexts: [],
  seoTitle: '',
  seoDescription: '',
  imageSizesKB: [],
})

export default function AdminPage() {
  const { units, setStatus, updateUnit, addUnit, deleteUnit } = useUnits()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<UnitStatus | 'ทั้งหมด'>('ทั้งหมด')
  const [editing, setEditing] = useState<Unit | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const handleAddNew = () => {
    setIsCreating(true)
    setEditing(createBlankUnit())
  }

  const handleEditExisting = (unit: Unit) => {
    setIsCreating(false)
    setEditing(unit)
  }

  const handleDelete = (unit: Unit) => {
    const confirmed = window.confirm(
      `ต้องการลบยูนิต ${unit.unitCode} (${unit.project}) ใช่หรือไม่?\nการลบนี้ไม่สามารถย้อนกลับได้`,
    )
    if (!confirmed) return
    deleteUnit(unit.id)
    if (editing?.id === unit.id) setEditing(null)
  }

  const visibleUnits = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return units.filter((unit) => {
      if (statusFilter !== 'ทั้งหมด' && unit.status !== statusFilter) return false
      if (!needle) return true
      return [unit.unitCode, unit.project, unit.plot, unit.houseModel]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
  }, [units, query, statusFilter])

  const unitsWithIssues = useMemo(
    () => units.filter((unit) => validateUnit(unit).length > 0).length,
    [units],
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">ระบบจัดการยูนิต</h1>
        <p className="mt-1 text-sm text-ananda-muted">
          ทั้งหมด {units.length} ยูนิต · มีปัญหาก่อนเผยแพร่ {unitsWithIssues} ยูนิต
        </p>
      </header>

      <HealthCheckPanel />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-bold">รายการยูนิต</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button size="sm" onClick={handleAddNew}>
            <Plus size={14} /> เพิ่มยูนิตใหม่
          </Button>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ค้นหารหัสยูนิต / โครงการ"
            className="rounded-lg border border-ananda-border px-3 py-2 text-sm outline-none focus:border-ananda-blue focus:ring-1 focus:ring-ananda-blue"
          />
          <label>
            <span className="sr-only">กรองตามสถานะ</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as UnitStatus | 'ทั้งหมด')}
              className="w-full rounded-lg border border-ananda-border px-3 py-2 text-sm outline-none focus:border-ananda-blue focus:ring-1 focus:ring-ananda-blue"
            >
              {STATUS_FILTERS.map((status) => (
                <option key={status} value={status}>
                  {status === 'ทั้งหมด' ? 'สถานะ: ทั้งหมด' : status}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-4">
        {visibleUnits.length === 0 ? (
          <div className="rounded-xl border border-dashed border-ananda-border py-16 text-center text-sm text-ananda-muted">
            ไม่พบยูนิตที่ตรงกับเงื่อนไข
          </div>
        ) : (
          <UnitTable
            units={visibleUnits}
            onStatusChange={setStatus}
            onEdit={handleEditExisting}
            onDelete={handleDelete}
          />
        )}
      </div>

      <UnitFormModal
        unit={editing}
        mode={isCreating ? 'create' : 'edit'}
        onClose={() => {
          setEditing(null)
          setIsCreating(false)
        }}
        onSave={(unit) => {
          const saved = { ...unit, updatedAt: formatThaiShortDate(new Date()) }
          if (isCreating) addUnit(saved)
          else updateUnit(saved)
          setEditing(null)
          setIsCreating(false)
        }}
      />
    </main>
  )
}
