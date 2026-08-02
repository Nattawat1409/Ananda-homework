import { useMemo, useState } from 'react'
import type { Unit } from '../types'
import { useUnits } from '../context/UnitsContext'
import { effectivePrice } from '../lib/format'
import FilterBar, { emptyFilters } from '../components/customer/FilterBar'
import type { Filters } from '../components/customer/FilterBar'
import UnitCard from '../components/customer/UnitCard'
import UnitDetailModal from '../components/customer/UnitDetailModal'
import CompareTray, { MAX_COMPARE } from '../components/customer/CompareTray'
import CompareModal from '../components/customer/CompareModal'

export default function CustomerPage() {
  const { units } = useUnits()
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [detailUnit, setDetailUnit] = useState<Unit | null>(null)
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [compareOpen, setCompareOpen] = useState(false)

  const locations = useMemo(
    () => Array.from(new Set(units.map((unit) => unit.location))).sort(),
    [units],
  )

  const visibleUnits = useMemo(() => {
    const query = filters.query.trim().toLowerCase()
    const [minPrice, maxPrice] = filters.priceRange

    return units.filter((unit) => {
      if (
        query &&
        ![unit.unitCode, unit.project, unit.brand, unit.houseModel, unit.plot]
          .join(' ')
          .toLowerCase()
          .includes(query)
      ) {
        return false
      }
      if (filters.propertyType !== 'ทั้งหมด' && unit.propertyType !== filters.propertyType)
        return false
      if (filters.location !== 'ทั้งหมด' && unit.location !== filters.location) return false
      if (filters.status !== 'ทั้งหมด' && unit.status !== filters.status) return false

      const price = effectivePrice(unit.listPrice, unit.promoPrice)
      if (price < minPrice || price > maxPrice) return false

      if (filters.petFriendly && !unit.petFriendly) return false
      if (filters.nearInternationalSchool && !unit.nearInternationalSchool) return false
      if (filters.nearBTS && !unit.nearBTS) return false
      if (filters.directions.length > 0 && !filters.directions.includes(unit.direction))
        return false

      return true
    })
  }, [units, filters])

  const compareUnits = useMemo(
    () => compareIds.map((id) => units.find((unit) => unit.id === id)).filter((u): u is Unit => !!u),
    [compareIds, units],
  )

  const toggleCompare = (unit: Unit) =>
    setCompareIds((ids) => {
      if (ids.includes(unit.id)) return ids.filter((id) => id !== unit.id)
      if (ids.length >= MAX_COMPARE) return ids
      return [...ids, unit.id]
    })

  return (
    <>
      <section className="bg-ananda-dark py-12 text-white lg:py-16">
        <h1 className="mb-8 text-center text-3xl font-bold lg:text-4xl">ค้นหาที่อยู่อาศัย</h1>
        <FilterBar
          filters={filters}
          locations={locations}
          resultCount={visibleUnits.length}
          onChange={setFilters}
          onReset={() => setFilters(emptyFilters)}
        />
      </section>

      <main id="units" className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xl font-bold">โครงการทั้งหมด</h2>
          <p className="text-sm text-ananda-muted">{visibleUnits.length} ยูนิต</p>
        </div>

        {visibleUnits.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ananda-border py-20 text-center">
            <p className="font-semibold">ไม่พบยูนิตที่ตรงกับเงื่อนไข</p>
            <p className="mt-1 text-sm text-ananda-muted">ลองปรับช่วงราคาหรือล้างตัวกรองดู</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleUnits.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                selected={compareIds.includes(unit.id)}
                selectionDisabled={compareIds.length >= MAX_COMPARE}
                onToggleCompare={toggleCompare}
                onOpenDetail={setDetailUnit}
              />
            ))}
          </div>
        )}
      </main>

      <UnitDetailModal unit={detailUnit} onClose={() => setDetailUnit(null)} />

      <CompareTray
        selected={compareUnits}
        onOpen={() => setCompareOpen(true)}
        onRemove={toggleCompare}
        onClear={() => setCompareIds([])}
      />

      <CompareModal
        open={compareOpen}
        units={compareUnits}
        onClose={() => setCompareOpen(false)}
      />
    </>
  )
}
