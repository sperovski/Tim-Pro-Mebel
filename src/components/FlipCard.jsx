import { useState } from "react"
import { useTilt } from "../hooks/useTilt"

/**
 * A piece shown as a specimen on the sheet: the photo with a title block under
 * it, and its real width dimensioned below the plate. The plate leans towards
 * the pointer and catches a light spot where the pointer is; it flips to the
 * description on hover, on tap and on keyboard focus, and the magnifier in the
 * corner opens the full plate.
 */
export default function FlipCard({ item, index = 0, onOpen }) {
  const [flipped, setFlipped] = useState(false)
  const tilt = useTilt(6)

  // Pointer events cover a cursor dragged across the grid; touch is left to
  // the click toggle so a tap does not flip and immediately unflip.
  const enter = (e) => e.pointerType !== "touch" && setFlipped(true)
  const leave = (e) => e.pointerType !== "touch" && setFlipped(false)

  return (
    <figure className="m-0" data-reveal="up" style={{ "--d": `${(index % 3) * 90}ms` }}>
      <div
        ref={tilt.ref}
        className="plate relative"
        style={tilt.style}
        onPointerMove={(e) => {
          tilt.onPointerMove(e)
          enter(e)
        }}
        onPointerLeave={(e) => {
          tilt.onPointerLeave()
          leave(e)
        }}
      >
        <div
          className="flip-card aspect-[4/3] w-full cursor-pointer"
          data-flipped={flipped}
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-label={`${item.title} — ${flipped ? "сокриј опис" : "прикажи опис"}`}
          onPointerEnter={enter}
          onClick={() => setFlipped((v) => !v)}
          onFocus={() => setFlipped(true)}
          onBlur={() => setFlipped(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setFlipped((v) => !v)
            }
          }}
        >
          <div className="flip-card-inner">
            <div className="flip-face bg-card">
              <img src={item.image} alt={item.title} loading="lazy" className="size-full object-cover" />
              {/* Title block, as on a drawing: what it is, what it is made of. */}
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-[1fr_auto] items-center gap-3 border-t border-ink bg-card px-3 py-2">
                <h3 className="truncate font-semibold">{item.title}</h3>
                <span className="text-note text-ink/60">{item.material}</span>
              </div>
            </div>

            <div className="flip-face flip-face-back bg-ink text-cream">
              <div
                className="absolute inset-0 scale-100 bg-cover bg-center opacity-[0.18] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.plate:hover_&]:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/75 to-ink/95" aria-hidden="true" />
              <div className="relative flex size-full flex-col justify-end gap-2 p-5">
                <h3 className="font-semibold text-caramel">{item.title}</h3>
                <p className="text-note leading-relaxed text-cream/85">{item.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* The light spot sits over both faces, so it reads the same whether the
            plate is showing the photo or the description. */}
        <span className="spot" aria-hidden="true" />

        {/* Registration ticks, drawn on the plate while the pointer is over it. */}
        <div className="plate-ticks pointer-events-none absolute inset-0" aria-hidden="true">
          <span />
          <span />
        </div>

        <button
          type="button"
          onClick={() => onOpen?.(item)}
          aria-label={`Отвори ${item.title} во голем формат`}
          className="absolute top-2 right-2 z-10 grid size-9 translate-y-1 place-content-center border border-ink bg-card/90 opacity-0 backdrop-blur transition-all duration-300 ease-out hover:bg-ink hover:text-cream focus-visible:translate-y-0 focus-visible:opacity-100 [.plate:hover_&]:translate-y-0 [.plate:hover_&]:opacity-100"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5 14 14M7 5.2v3.6M5.2 7h3.6" />
          </svg>
        </button>
      </div>

      <figcaption className="dim mt-3">
        <span className="dim-line dim-line--start" />
        <span className="num">{item.width} мм</span>
        <span className="dim-line dim-line--end" />
      </figcaption>
    </figure>
  )
}
