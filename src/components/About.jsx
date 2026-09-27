// Typical size ranges, not marketing claims — check them against real jobs.
const legend = [
  ["Кујни", "2400 – 4200 мм"],
  ["Гардеробери и плакари", "1200 – 3600 мм"],
  ["Спални соби", "комплет"],
  ["Детски соби", "по мерка"],
  ["Дневни соби и ТВ ѕидови", "1800 – 3600 мм"],
  ["Канцелариски мебел", "по проект"],
]

export default function About() {
  return (
    <section id="about" className="border-t border-ink/20 bg-card">
      <div className="sheet grid gap-12 py-16 lg:grid-cols-[6fr_5fr] lg:gap-20 lg:py-24">
        <div>
          <h2 className="headline text-title sm:text-display" data-reveal="up">
            Работилница, не салон.
          </h2>
          <p className="prose-measure mt-6 text-ink/80" data-reveal="up" style={{ "--d": "90ms" }}>
            Tim ProMebel е семејна работилница за мебел по мерка. Не продаваме готови гарнитури од каталог —
            секое парче се прави за одреден простор, за одреден клиент, откако ќе го измериме.
          </p>
          <p className="prose-measure mt-4 text-ink/80" data-reveal="up" style={{ "--d": "160ms" }}>
            Истите луѓе што ги земаат мерките го изработуваат и го монтираат мебелот. Тоа значи еден
            соговорник од првиот телефонски повик до последниот завртен шраф.
          </p>
          <div data-reveal="up" style={{ "--d": "230ms" }}>
            <a href="#contact" className="btn btn-bracket btn-arrow mt-8">
              Закажете мерење
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2.5 8h11M9.5 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>

        {/* Legend: what the workshop makes, with the sizes it usually works in. */}
        <div className="frame-soft self-start" data-reveal="right">
          <div className="border-b border-ink/25 px-4 py-3">
            <h3 className="font-semibold">Што изработуваме</h3>
          </div>
          <dl className="divide-y divide-ink/15">
            {legend.map(([what, size], i) => (
              <div
                key={what}
                className="group flex items-baseline justify-between gap-4 px-4 py-3 transition-colors duration-300 hover:bg-cream"
                data-reveal="up"
                style={{ "--d": `${120 + i * 60}ms` }}
              >
                <dt className="text-note transition-transform duration-300 group-hover:translate-x-1">
                  {what}
                </dt>
                <dd className="num text-note whitespace-nowrap text-cinnamon">{size}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
