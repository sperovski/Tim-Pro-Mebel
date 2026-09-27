import { useRef, useState } from "react"

/**
 * A link that leans a few pixels towards the cursor before it is clicked —
 * uiverse's magnetic button, dialled down to the amount a heavy drawer moves
 * when you first pull it. Ignored for touch and for reduced motion.
 */
export default function MagneticButton({ as: Tag = "a", strength = 6, className = "", children, ...rest }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(null)

  const move = (event) => {
    if (event.pointerType === "touch") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const box = ref.current.getBoundingClientRect()
    setOffset({
      x: ((event.clientX - (box.left + box.width / 2)) / box.width) * strength * 2,
      y: ((event.clientY - (box.top + box.height / 2)) / box.height) * strength * 2,
    })
  }

  return (
    <Tag
      ref={ref}
      className={className}
      onPointerMove={move}
      onPointerLeave={() => setOffset(null)}
      style={offset ? { transform: `translate(${offset.x}px, ${offset.y}px)` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
