import { useState } from "react"
import WorkCard from "./WorkCard"
import Lightbox from "./Lightbox"
import { categories, galleryItems } from "../data/gallery"

export default function GalleryGrid() {
  const [filter, setFilter] = useState("all")
  const [openIndex, setOpenIndex] = useState(-1)

  const shown = filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter)

  // The lightbox steps through what is currently filtered, and wraps.
  const step = (delta) => setOpenIndex((i) => (i + delta + shown.length) % shown.length)

  return (
    <section id="gallery" className="wrap py-16 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="heading text-h2">Целата изработка.</h2>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                setFilter(category.id)
                setOpenIndex(-1)
              }}
              aria-pressed={filter === category.id}
              className="chip"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* A proper grid, not a masonry flow — every card is the same shape
          (see WorkCard's CARD_ASPECT), so rows line up across all three
          columns instead of drifting into a scattered stack of different
          heights. */}
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item, i) => (
          /* Keying on filter as well as id remounts the cards when the filter
             changes. */
          <WorkCard key={`${filter}-${item.id}`} item={item} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>

      {openIndex > -1 && shown[openIndex] && (
        <Lightbox item={shown[openIndex]} onClose={() => setOpenIndex(-1)} onStep={step} />
      )}
    </section>
  )
}
