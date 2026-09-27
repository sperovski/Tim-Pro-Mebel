import { useEffect, useState } from "react"

const ROTATE_MS = 3400

/**
 * A finished piece, shown at its own photo's proportions — nothing is
 * cropped to fit a shared box. Where a job has more than one photo it
 * rotates quietly between them; a small plate number in the corner ("1/2")
 * doubles as a manual advance. The whole frame opens the lightbox; the
 * caption underneath is always legible, not hidden behind a hover.
 */
export default function WorkCard({ item, onOpen }) {
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const multi = item.images.length > 1

  useEffect(() => {
    if (!multi) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setActive((i) => (i + 1) % item.images.length), ROTATE_MS)
    return () => clearInterval(id)
  }, [multi, item.images.length])

  return (
    <figure className="mb-9 break-inside-avoid">
      <div className="relative">
        <button
          type="button"
          onClick={() => onOpen(item)}
          aria-label={`${item.title} — отвори во голем формат`}
          className="work-card block w-full text-left"
        >
          <div
            className={`relative overflow-hidden bg-linen transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ aspectRatio: item.aspect }}
          >
            {item.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === 0 ? item.title : ""}
                loading={i === 0 ? "lazy" : "eager"}
                decoding="async"
                onLoad={i === 0 ? () => setLoaded(true) : undefined}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </button>

        {multi && (
          <button
            type="button"
            onClick={() => setActive((i) => (i + 1) % item.images.length)}
            aria-label={`Прикажи ја следната слика (${active + 1} од ${item.images.length})`}
            className="plate-count num"
          >
            {active + 1}/{item.images.length}
          </button>
        )}
      </div>

      <figcaption className="mt-3 flex items-baseline justify-between gap-4">
        <span className="font-serif text-[1.05rem] text-walnut">{item.title}</span>
        <span className="text-meta whitespace-nowrap text-walnut-soft/75">{item.material}</span>
      </figcaption>
    </figure>
  )
}
