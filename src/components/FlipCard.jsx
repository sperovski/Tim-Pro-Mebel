import { useEffect, useState } from "react"
import { useTilt } from "../hooks/useTilt"

const ROTATE_MS = 3200

// One plate size for the whole sheet. Letting each plate take its own photo's
// proportions meant a 630×1400 shot sat beside a 1050×1400 one with nothing
// lining up — specimens scattered across the sheet rather than set out on it.
// A drawing sheet lays its specimens out on a consistent grid, so every plate
// is cut to the same 3:4 and the rows line up. The photos are all portrait, so
// this crops far less than a landscape box would, and the magnifier still
// opens each piece uncropped.
const PLATE_ASPECT = "3/4"

/**
 * A piece shown as a specimen on the sheet: the photo with a title block under
 * it, and its real width dimensioned below the plate. Where a job has more
 * than one photo, the plate cycles between them — a sheet counter ("1/2") in
 * the corner doubles as a manual advance. The plate leans towards the pointer
 * and catches a light spot where the pointer is; it flips to the description
 * on hover, on tap and on keyboard focus, and the magnifier in the corner
 * opens the full plate.
 */
export default function FlipCard({ item, index = 0, onOpen }) {
  const [flipped, setFlipped] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [active, setActive] = useState(0)
  const tilt = useTilt(6)
  const multi = item.images.length > 1

  // Pointer events cover a cursor dragged across the grid; touch is left to
  // the click toggle so a tap does not flip and immediately unflip.
  const enter = (e) => e.pointerType !== "touch" && setFlipped(true)
  const leave = (e) => e.pointerType !== "touch" && setFlipped(false)

  // Auto-rotate between a job's photos. This runs regardless of hover/flip:
  // the card flips to its description on the same hover that would otherwise
  // gate rotation, so pausing it there meant a card almost never got to
  // rotate while anyone was actually looking at it. It keeps advancing
  // quietly behind a flipped card too, so un-flipping can reveal a different
  // photo — reduced motion is the only thing that stops it.
  useEffect(() => {
    if (!multi) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setActive((i) => (i + 1) % item.images.length), ROTATE_MS)
    return () => clearInterval(id)
  }, [multi, item.images.length])

  return (
    <figure data-reveal="up" style={{ "--d": `${(index % 3) * 90}ms` }}>
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
          className="flip-card w-full cursor-pointer"
          style={{ aspectRatio: PLATE_ASPECT }}
          data-flipped={flipped}
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-label={`${item.title}, ${flipped ? "сокриј опис" : "прикажи опис"}`}
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
              {/* The stack fades in once it has pixels, instead of popping in
                  mid-scroll; each photo within it crossfades on rotation. */}
              <div className={`relative size-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
                {item.images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={i === 0 ? item.title : ""}
                    // Only the first photo is lazy; the rest of a rotating
                    // card's photos are small and few (two extra at most,
                    // site-wide) and load eagerly so the interval never
                    // reveals a still-blank image mid-crossfade.
                    loading={i === 0 ? "lazy" : "eager"}
                    decoding="async"
                    onLoad={i === 0 ? () => setLoaded(true) : undefined}
                    className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
              {/* Title block, as on a drawing: what it is, what it is made of.
                  Stacked rather than side by side — sharing one line meant
                  titles this long got cut off mid-word. */}
              <div className="absolute inset-x-0 bottom-0 border-t border-ink bg-card px-3 py-2">
                <h3 className="line-clamp-2 font-semibold leading-snug">{item.title}</h3>
                <p className="truncate text-note text-ink/60">{item.material}</p>
              </div>
            </div>

            <div className="flip-face flip-face-back bg-ink text-cream">
              <div
                className="absolute inset-0 scale-100 bg-cover bg-center opacity-[0.18] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] [.plate:hover_&]:scale-110"
                style={{ backgroundImage: `url(${item.images[active]})` }}
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

        {/* Sheet counter, doubling as a manual advance — the drafting-set
            convention ("1/2") for a job shown across more than one photo. A
            sibling of .flip-card, like the magnifier, so it isn't mirrored
            when the card flips. */}
        {multi && (
          <button
            type="button"
            onClick={() => setActive((i) => (i + 1) % item.images.length)}
            aria-label={`Прикажи ја следната слика (${active + 1} од ${item.images.length})`}
            className="num absolute top-2 left-2 z-10 border border-ink bg-card/90 px-2 py-1 text-note text-ink backdrop-blur transition-colors hover:bg-ink hover:text-cream"
          >
            {active + 1}/{item.images.length}
          </button>
        )}

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
