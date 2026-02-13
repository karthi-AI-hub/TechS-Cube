import { useEffect, useRef, useState } from 'react'

interface CountUpNumberProps {
  end: number
  duration?: number
  suffix?: string
  className?: string
}

export function CountUpNumber({ end, duration = 2000, suffix = '', className = '' }: CountUpNumberProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current || hasStarted) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true)
          const startTime = Date.now()
          const endTime = startTime + duration

          const updateCount = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentCount = Math.floor(easeOutQuart * end)

            setCount(currentCount)

            if (now < endTime) {
              requestAnimationFrame(updateCount)
            } else {
              setCount(end)
            }
          }

          requestAnimationFrame(updateCount)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [end, duration, hasStarted])

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  )
}
