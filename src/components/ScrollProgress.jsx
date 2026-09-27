import { useEffect, useState } from "react"

/**
 * A tape measure pulled across the bottom of the header: how far down the
 * sheet the visitor has read. It measures, so it is allowed to be cinnamon.
 */
export default function ScrollProgress() {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setPercent(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div className="absolute inset-x-0 -bottom-px h-[2px] bg-cinnamon/15" aria-hidden="true">
      <div
        className="h-full bg-cinnamon transition-[width] duration-150 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
