import { useEffect } from "react"

/**
 * One observer for the whole sheet. Anything carrying `data-reveal` gets
 * `.revealed` the first time it comes into view, and is then left alone —
 * elements do not re-hide when scrolled past.
 *
 * A MutationObserver picks up nodes mounted later (the gallery filter swaps
 * cards in and out), so new cards reveal too instead of arriving invisible.
 */
export function useScrollReveal() {
  useEffect(() => {
    const pending = () => document.querySelectorAll("[data-reveal]:not(.revealed)")

    // No IntersectionObserver: show everything rather than nothing.
    if (!("IntersectionObserver" in window)) {
      pending().forEach((el) => el.classList.add("revealed"))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add("revealed")
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    )

    const observe = () => pending().forEach((el) => io.observe(el))
    observe()

    // Coalesce bursts of mutations into a single pass per frame.
    let queued = 0
    const mo = new MutationObserver(() => {
      if (queued) return
      queued = requestAnimationFrame(() => {
        queued = 0
        observe()
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      cancelAnimationFrame(queued)
    }
  }, [])
}

export default useScrollReveal
