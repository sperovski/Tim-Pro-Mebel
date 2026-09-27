import { galleryItems } from "../data/gallery"
import { useCountUp } from "../hooks/useCountUp"

/* Every figure here is read off the page itself rather than claimed: the
   tolerance the workshop works to, the four steps of the process below, how
   many pieces the gallery holds and the widest one in it. Nothing to verify
   before going live — if the gallery changes, these change with it. */
const figures = [
  { value: 1, unit: "мм", label: "толеранција при мерење на терен" },
  { value: 4, unit: "чекори", label: "од првиот повик до завршена монтажа" },
  { value: galleryItems.length, unit: "изработки", label: "документирани во галеријата" },
  {
    value: Math.max(...galleryItems.map((item) => item.width)),
    unit: "мм",
    label: "најголема ширина изработена досега",
  },
]

function Figure({ value, unit, label, index }) {
  const [ref, current] = useCountUp(value, 1200 + index * 120)

  return (
    <div className="bg-card px-5 py-7 lg:px-6" data-reveal="up" style={{ "--d": `${index * 90}ms` }}>
      <p ref={ref} className="num flex items-baseline gap-1.5 text-cinnamon">
        <span className="headline text-title tabular-nums sm:text-display">{current}</span>
        <span className="text-note tracking-[0.08em]">{unit}</span>
      </p>
      <div className="dim mt-3">
        <span className="dim-line dim-line--start" />
      </div>
      <p className="mt-3 text-note text-ink/70">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section aria-label="Мерки од работилницата" className="border-b border-ink/20 bg-cream">
      <div className="sheet">
        {/* gap-px over the darker ground draws the dividers as hairlines */}
        <div className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {figures.map((figure, i) => (
            <Figure key={figure.label} {...figure} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
