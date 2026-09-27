import { galleryItems } from "../data/gallery"

const featured = galleryItems.filter((item) => item.featured)

/**
 * Three pieces, shown the size the work deserves — alternating sides,
 * generous margins, the full description instead of a caption. This is the
 * one place on the page spending real space on a single photograph; the
 * grid further down is for browsing everything else.
 */
export default function Featured() {
  return (
    <section aria-label="Избрани работи" className="wrap py-4 sm:py-8">
      <div className="flex flex-col gap-20 sm:gap-28">
        {featured.map((item, i) => {
          const reverse = i % 2 === 1
          return (
            <article
              key={item.id}
              className={`flex flex-col gap-8 sm:gap-10 lg:items-center lg:gap-16 ${
                reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <div className="lg:w-7/12">
                <div className="relative overflow-hidden bg-linen" style={{ aspectRatio: item.aspect }}>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="size-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:w-5/12">
                <p className="text-meta text-brass">{item.material}</p>
                <h3 className="heading mt-3 text-h2">{item.title}</h3>
                <p className="prose-measure mt-5 text-body leading-relaxed text-walnut-soft">
                  {item.description}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
