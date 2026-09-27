import { useEffect, useRef, useState } from "react"

const easeOut = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Counts from zero to `target` the first time the element scrolls into view.
 * Returns the ref to attach and the current value.
 */
export function useCountUp(target, duration = 1300) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced || !("IntersectionObserver" in window)) {
      setValue(target)
      return
    }

    let frame = 0
    let start = 0

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const tick = (now) => {
          if (!start) start = now
          const progress = Math.min(1, (now - start) / duration)
          setValue(Math.round(easeOut(progress) * target))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.35 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration])

  return [ref, value]
}

export default useCountUp
