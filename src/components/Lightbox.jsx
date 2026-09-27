import { useEffect, useRef, useState } from "react"

/**
 * The piece held up at full size, with its full description and — where a
 * job has more than one photo — small swatches to pick between them. Closes
 * on Escape, on the backdrop and on the close control, and hands focus back
 * to the card that opened it.
 */
export default function Lightbox({ item, onClose, onStep }) {
  const closeRef = useRef(null)
  const [shown, setShown] = useState(0)

  // A new job may have fewer photos than the last one's index — reset to its
  // first photo whenever the arrows (or the parent) swap `item` out.
  useEffect(() => setShown(0), [item.id])

  // The handlers are rebuilt by the parent on every step; keeping them in a
  // ref lets the key listener and the focus move run once, on open, instead
  // of tearing down and stealing focus back on each arrow press.
  const handlers = useRef({ onClose, onStep })
  handlers.current = { onClose, onStep }

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") handlers.current.onClose()
      if (event.key === "ArrowRight") handlers.current.onStep(1)
      if (event.key === "ArrowLeft") handlers.current.onStep(-1)
    }
    document.addEventListener("keydown", onKey)

    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const opener = document.activeElement
    closeRef.current?.focus()

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
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
        className="fade-in absolute inset-0 cursor-zoom-out bg-walnut/85"
        style={{ animationDuration: "0.25s" }}
      />

      <div className="rise relative grid max-h-full w-full max-w-5xl overflow-auto bg-linen lg:grid-cols-[7fr_5fr]">
        <div className="relative bg-oak/20">
          <img src={item.images[shown]} alt={item.title} className="h-full w-full object-cover" />

          {multi && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              {item.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setShown(i)}
                  aria-label={`Слика ${i + 1} од ${item.images.length}`}
                  aria-current={i === shown}
                  className={`h-1 w-8 transition-colors ${i === shown ? "bg-cream" : "bg-cream/35 hover:bg-cream/60"}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 p-7 sm:p-9">
          <div>
            <p className="text-meta text-brass">{item.material}</p>
            <h3 className="heading mt-2 text-h2">{item.title}</h3>
          </div>

          <p className="text-body leading-relaxed text-walnut-soft">{item.description}</p>

          {item.width && (
            <p className="num text-meta text-walnut-soft/75">Ширина {item.width} мм</p>
          )}

          <div className="mt-auto flex items-center gap-2 pt-4">
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
            <button ref={closeRef} type="button" onClick={onClose} className="btn btn-line ml-auto">
              Затвори
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
