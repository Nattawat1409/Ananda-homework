import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Unit, UnitStatus } from '../types'
import { units as seedUnits } from '../data/units'

interface UnitsContextValue {
  units: Unit[]
  setStatus: (id: string, status: UnitStatus) => void
  updateUnit: (unit: Unit) => void
  addUnit: (unit: Unit) => void
}

const UnitsContext = createContext<UnitsContextValue | null>(null)

export function UnitsProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<Unit[]>(seedUnits)

  const setStatus = useCallback((id: string, status: UnitStatus) => {
    setUnits((current) =>
      current.map((unit) => (unit.id === id ? { ...unit, status } : unit)),
    )
  }, [])

  const updateUnit = useCallback((updated: Unit) => {
    setUnits((current) => current.map((unit) => (unit.id === updated.id ? updated : unit)))
  }, [])

  const addUnit = useCallback((unit: Unit) => {
    setUnits((current) => [...current, unit])
  }, [])

  const value = useMemo(
    () => ({ units, setStatus, updateUnit, addUnit }),
    [units, setStatus, updateUnit, addUnit],
  )

  return <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>
}

export function useUnits(): UnitsContextValue {
  const context = useContext(UnitsContext)
  if (!context) throw new Error('useUnits must be used within a UnitsProvider')
  return context
}
