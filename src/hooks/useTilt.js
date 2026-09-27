import { useCallback, useRef, useState } from "react"

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

/**
 * Pointer-reactive plate: a small tilt towards the cursor plus the light spot
 * position, both handed back as CSS custom properties. Touch pointers are
 * ignored — a tilt that sticks after a tap reads as a rendering bug.
 *
 * `max` is the tilt limit in degrees.
 */
export function useTilt(max = 7) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const move = useCallback(
    (event) => {
      if (event.pointerType === "touch") return
      const el = ref.current
      if (!el) return
      const box = el.getBoundingClientRect()
      const x = (event.clientX - box.left) / box.width
      const y = (event.clientY - box.top) / box.height
      setStyle({
        "--ry": `${clamp((x - 0.5) * 2 * max, -max, max)}deg`,
        "--rx": `${clamp((0.5 - y) * 2 * max, -max, max)}deg`,
        "--lift": "-4px",
        "--sx": `${x * 100}%`,
        "--sy": `${y * 100}%`,
      })
    },
    [max],
  )

  const reset = useCallback(() => setStyle({}), [])

  return { ref, style, onPointerMove: move, onPointerLeave: reset }
}

export default useTilt
