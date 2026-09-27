import { useState } from "react"
import FlipCard from "./FlipCard"
import Lightbox from "./Lightbox"
import { categories, galleryItems } from "../data/gallery"

export default function GalleryGrid() {
  const [filter, setFilter] = useState("all")
  const [openIndex, setOpenIndex] = useState(-1)

  const shown = filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter)

  // The lightbox steps through what is currently filtered, and wraps.
  const step = (delta) => setOpenIndex((i) => (i + delta + shown.length) % shown.length)

  return (
    <section id="gallery" className="sheet py-16 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="headline max-w-xl text-title sm:text-display" data-reveal="up">
          Изработено и монтирано.
        </h2>
        <p className="prose-measure max-w-sm text-note text-ink/70" data-reveal="up" style={{ "--d": "90ms" }}>
          Под секоја фотографија стои вистинската ширина на изработката. Поминете со глувчето за описот,
          допрете ја картичката на телефон, или отворете ја во голем формат.
        </p>
      </div>

      <div className="rule mt-8" data-reveal="rule" />

      <div className="mt-6 mb-10 flex flex-wrap items-center gap-2" data-reveal="up">
        {categories.map((category) => {
          const count =
            category.id === "all"
              ? galleryItems.length
              : galleryItems.filter((item) => item.category === category.id).length

          return (
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
              <span className="num ml-1.5 opacity-60">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Columns, not a grid: every plate keeps its own photo's proportions
          rather than being cropped into a shared box, so the cards run
          different heights and need to flow like a cut list, not align row
          by row. Each card supplies its own bottom margin and refuses to
          split across a column break (both set in FlipCard's figure). */}
      <div className="columns-1 gap-x-6 sm:columns-2 lg:columns-3">
        {shown.map((item, i) => (
          /* Keying on filter as well as id remounts the cards when the filter
             changes, so the reveal runs again for the new set. */
          <FlipCard
            key={`${filter}-${item.id}`}
            item={item}
            index={i}
            onOpen={() => setOpenIndex(i)}
          />
        ))}
      </div>

      {openIndex > -1 && shown[openIndex] && (
        <Lightbox item={shown[openIndex]} onClose={() => setOpenIndex(-1)} onStep={step} />
      )}
    </section>
  )
}
