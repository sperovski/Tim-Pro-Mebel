import { galleryItems } from "../data/gallery"

/* The cut list, read straight off the gallery so it can never drift out of
   step with what the workshop is actually shown building. */
const materials = [...new Set(galleryItems.map((item) => item.material))]

export default function MaterialsMarquee() {
  // The track is rendered twice; the keyframe stops at -50%, so the seam never
  // shows and the strip reads as continuous.
  const run = [...materials, ...materials]

  return (
    <section
      aria-label="Материјали со кои работиме"
      className="marquee border-b border-ink/20 bg-ink py-3.5 text-cream"
    >
      <div className="marquee-track">
        {run.map((material, i) => (
          <span
            key={`${material}-${i}`}
            aria-hidden={i >= materials.length ? "true" : undefined}
            className="flex items-center gap-8 whitespace-nowrap px-8 text-note tracking-[0.1em] text-cream/75 uppercase"
          >
            {material}
            <span className="h-1 w-1 flex-shrink-0 bg-caramel" />
          </span>
        ))}
      </div>
    </section>
  )
}
