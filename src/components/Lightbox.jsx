import { useEffect, useRef, useState } from "react"

/**
 * The plate taken off the sheet and held up: the photo at full size with its
 * title block and dimension beside it. Where a job has more than one photo,
 * small swatches pick which one is enlarged, separate from the arrows, which
 * step between jobs. Closes on Escape, on the backdrop and on the close
 * control, and hands focus back to the card that opened it.
 */
export default function Lightbox({ item, onClose, onStep }) {
  const closeRef = useRef(null)
  const [shown, setShown] = useState(0)

  // A new job may have fewer photos than the last one's index — reset to its
  // first photo whenever the arrows (or the parent) swap `item` out.
  useEffect(() => setShown(0), [item.id])

  // The handlers are rebuilt by the parent on every step; keeping them in a
  // ref lets the key listener and the focus move run once, on open, instead of
  // tearing down and stealing focus back on each arrow press.
  const handlers = useRef({ onClose, onStep })
  handlers.current = { onClose, onStep }

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") handlers.current.onClose()
      if (event.key === "ArrowRight") handlers.current.onStep(1)
      if (event.key === "ArrowLeft") handlers.current.onStep(-1)
    }
    document.addEventListener("keydown", onKey)

    // Stop the sheet behind from scrolling while the plate is held up.
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const opener = document.activeElement
    closeRef.current?.focus()

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
      // Hand focus back to the card that opened the plate.
      if (opener instanceof HTMLElement) opener.focus()
    }
  }, [])

  const multi = item.images.length > 1

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label="Затвори"
        onClick={onClose}
        className="ink-in absolute inset-0 cursor-zoom-out bg-ink/80 backdrop-blur-sm"
        style={{ animationDuration: "0.25s" }}
      />

      <div
        className="pop-in relative grid max-h-full w-full max-w-5xl overflow-auto border border-cream/30 bg-card lg:grid-cols-[7fr_4fr]"
      >
        <div className="relative bg-paper">
          <img src={item.images[shown]} alt={item.title} className="h-full w-full object-cover" />

          {multi && (
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              {item.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setShown(i)}
                  aria-label={`Слика ${i + 1} од ${item.images.length}`}
                  aria-current={i === shown}
                  className={`size-2.5 border border-cream transition-colors ${
                    i === shown ? "bg-cream" : "bg-ink/40 hover:bg-cream/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 border-t border-ink/20 p-6 sm:p-8 lg:border-t-0 lg:border-l">
          <div>
            <p className="text-note tracking-[0.1em] text-cinnamon uppercase">{item.material}</p>
            <h3 className="headline mt-2 text-title">{item.title}</h3>
          </div>

          <p className="text-note leading-relaxed text-ink/80">{item.description}</p>

          <div className="dim mt-auto">
            <span className="dim-line dim-line--start" />
            <span className="num">{item.width} мм</span>
            <span className="dim-line dim-line--end" />
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => onStep(-1)} aria-label="Претходна изработка" className="btn btn-line px-3 py-2">
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M10 13 5 8l5-5" />
              </svg>
            </button>
            <button type="button" onClick={() => onStep(1)} aria-label="Следна изработка" className="btn btn-line px-3 py-2">
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
            <button ref={closeRef} type="button" onClick={onClose} className="btn btn-line ml-auto px-4 py-2 text-note">
              Затвори
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
