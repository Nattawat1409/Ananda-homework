import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  loop?: boolean
  pauseMs?: number
  className?: string
}

/** พิมพ์ข้อความทีละตัวอักษรแบบ typewriter พร้อม cursor กะพริบ */
export default function TypewriterText({
  text,
  speed = 90,
  loop = true,
  pauseMs = 2200,
  className = '',
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let charIndex = 0
    let deleting = false
    let timeoutId: ReturnType<typeof setTimeout>

    const tick = () => {
      if (!deleting) {
        charIndex += 1
        setDisplayed(text.slice(0, charIndex))
        if (charIndex === text.length) {
          if (!loop) return
          timeoutId = setTimeout(() => {
            deleting = true
            tick()
          }, pauseMs)
          return
        }
      } else {
        charIndex -= 1
        setDisplayed(text.slice(0, charIndex))
        if (charIndex === 0) {
          deleting = false
          timeoutId = setTimeout(tick, speed)
          return
        }
      }
      timeoutId = setTimeout(tick, deleting ? speed / 2 : speed)
    }

    setDisplayed('')
    timeoutId = setTimeout(tick, speed)

    return () => clearTimeout(timeoutId)
  }, [text, speed, loop, pauseMs])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayed}
        <span className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-current align-middle" />
      </span>
    </span>
  )
}
