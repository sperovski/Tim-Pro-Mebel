import { useEffect, useState } from "react"

const CIRCUMFERENCE = 2 * Math.PI * 17

/**
 * Appears once the sheet has been scrolled past the hero. The ring around it
 * fills as the page is read — same measurement the header tape shows, drawn
 * where the pointer already is.
 */
export default function BackToTop() {
  const [percent, setPercent] = useState(0)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setPercent(scrollable > 0 ? window.scrollY / scrollable : 0)
      setShown(window.scrollY > window.innerHeight * 0.8)
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
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Врати се на почеток"
      tabIndex={shown ? 0 : -1}
      className={`group fixed right-4 bottom-4 z-40 grid size-12 place-content-center border border-ink bg-cream transition-all duration-500 ease-out sm:right-6 sm:bottom-6 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 40 40" className="absolute inset-0 size-full" aria-hidden="true" fill="none">
        <circle
          cx="20"
          cy="20"
          r="17"
          stroke="var(--color-cinnamon)"
          strokeWidth="1"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - percent)}
          transform="rotate(-90 20 20)"
        />
      </svg>
      <svg
        viewBox="0 0 16 16"
        className="relative size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
      </svg>
    </button>
  )
}
