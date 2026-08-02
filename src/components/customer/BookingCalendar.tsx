import { useMemo, useState } from 'react'
import { CalendarCheck, Check } from 'lucide-react'
import type { BookingSlot, Unit } from '../../types'
import Button from '../shared/Button'
import Modal from '../shared/Modal'

const TIME_SLOTS = ['10:00', '13:00', '15:00']
const THAI_DAYS = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
const THAI_MONTHS = [
  'ม.ค.',
  'ก.พ.',
  'มี.ค.',
  'เม.ย.',
  'พ.ค.',
  'มิ.ย.',
  'ก.ค.',
  'ส.ค.',
  'ก.ย.',
  'ต.ค.',
  'พ.ย.',
  'ธ.ค.',
]

interface DayOption {
  key: string
  dayLabel: string
  dateLabel: string
}

/** วันถัดไป 7 วันนับจากวันนี้ */
function nextSevenDays(): DayOption[] {
  const today = new Date()
  return Array.from({ length: 7 }, (_, offset) => {
    const date = new Date(today)
    date.setDate(today.getDate() + offset + 1)
    return {
      key: date.toISOString().slice(0, 10),
      dayLabel: THAI_DAYS[date.getDay()],
      dateLabel: `${date.getDate()} ${THAI_MONTHS[date.getMonth()]}`,
    }
  })
}

interface BookingCalendarProps {
  open: boolean
  unit: Unit
  onClose: () => void
}

export default function BookingCalendar({ open, unit, onClose }: BookingCalendarProps) {
  const days = useMemo(nextSevenDays, [])
  const [selected, setSelected] = useState<BookingSlot | null>(null)
  const [confirmed, setConfirmed] = useState<BookingSlot | null>(null)

  const close = () => {
    setSelected(null)
    setConfirmed(null)
    onClose()
  }

  const selectedDay = days.find((day) => day.key === selected?.date)

  return (
    <Modal open={open} title="นัดชมโครงการ" onClose={close} maxWidth="max-w-lg">
      <div className="p-5">
        {confirmed ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check size={28} />
            </div>
            <h3 className="mt-4 text-lg font-bold">ยืนยันการนัดหมายแล้ว</h3>
            <p className="mt-2 text-sm text-ananda-muted">
              {unit.project} · ยูนิต {unit.unitCode}
            </p>
            <p className="mt-1 text-sm font-semibold text-ananda-ink">
              {days.find((day) => day.key === confirmed.date)?.dateLabel} เวลา {confirmed.time} น.
            </p>
            <p className="mt-4 text-xs text-ananda-muted">
              (ตัวอย่างระบบ — ยังไม่มีการส่งข้อมูลจริง)
            </p>
            <Button variant="secondary" className="mt-6" onClick={close}>
              ปิด
            </Button>
          </div>
        ) : (
          <>
            <p className="text-sm text-ananda-muted">
              เลือกวันและเวลาที่สะดวกเข้าชม <span className="font-semibold">{unit.project}</span>
            </p>

            <h3 className="mb-2 mt-5 text-sm font-semibold">เลือกวัน</h3>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {days.map((day) => {
                const active = selected?.date === day.key
                return (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => setSelected({ date: day.key, time: '' })}
                    className={`rounded-lg border py-2 text-center transition-colors ${
                      active
                        ? 'border-ananda-blue bg-ananda-blue text-white'
                        : 'border-ananda-border hover:border-ananda-blue'
                    }`}
                  >
                    <span className="block text-[11px] opacity-70">{day.dayLabel}</span>
                    <span className="block text-xs font-semibold">{day.dateLabel}</span>
                  </button>
                )
              })}
            </div>

            <h3 className="mb-2 mt-6 text-sm font-semibold">เลือกเวลา</h3>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((time) => {
                const active = selected?.time === time
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={!selected}
                    onClick={() =>
                      setSelected((current) => (current ? { ...current, time } : current))
                    }
                    className={`rounded-lg border py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      active
                        ? 'border-ananda-blue bg-ananda-blue text-white'
                        : 'border-ananda-border hover:border-ananda-blue'
                    }`}
                  >
                    {time} น.
                  </button>
                )
              })}
            </div>

            <Button
              size="lg"
              className="mt-6 w-full"
              disabled={!selected?.time}
              onClick={() => selected?.time && setConfirmed(selected)}
            >
              <CalendarCheck size={18} />
              {selected?.time
                ? `ยืนยัน ${selectedDay?.dateLabel} ${selected.time} น.`
                : 'เลือกวันและเวลาก่อน'}
            </Button>
          </>
        )}
      </div>
    </Modal>
  )
}
