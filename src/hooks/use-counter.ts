import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

type UseCounterOptions = {
  start?: number
  end: number
  duration?: number
  decimals?: number
  separator?: string
  prefix?: string
  suffix?: string
  delay?: number
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  separator = ',',
  prefix = '',
  suffix = '',
  delay = 0
}: UseCounterOptions) {
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = Date.now() + delay
    const endTime = startTime + duration
    const range = end - start

    const updateCount = () => {
      const now = Date.now()
      
      if (now < startTime) {
        requestAnimationFrame(updateCount)
        return
      }

      if (now >= endTime) {
        setCount(end)
        return
      }

      const progress = (now - startTime) / duration
      const easeOutQuad = 1 - Math.pow(1 - progress, 3)
      const currentCount = start + range * easeOutQuad

      setCount(currentCount)
      requestAnimationFrame(updateCount)
    }

    requestAnimationFrame(updateCount)
  }, [isInView, start, end, duration, delay])

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals)
    const parts = fixed.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return prefix + parts.join('.') + suffix
  }

  return { ref, value: formatNumber(count), rawValue: count }
}
