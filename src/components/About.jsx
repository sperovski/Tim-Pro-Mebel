// Typical size ranges, not marketing claims — check them against real jobs.
const legend = [
  ["Кујни", "2400–4200 мм"],
  ["Гардеробери и плакари", "1200–3600 мм"],
  ["Спални соби", "комплет"],
  ["Детски соби", "по мерка"],
  ["Дневни соби и ТВ ѕидови", "1800–3600 мм"],
  ["Канцелариски мебел", "по проект"],
]

export default function About() {
  return (
    <section id="about" className="bg-linen py-20 sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[6fr_5fr] lg:gap-24">
        <div>
          <h2 className="heading text-h2">Работилница, не салон.</h2>
          <p className="prose-measure mt-7 text-body text-walnut-soft">
            Не продаваме готови гарнитури од каталог. Секое парче се прави за одреден простор и за
            одреден клиент, откако ќе го измериме на лице место.
          </p>
          <p className="prose-measure mt-5 text-body text-walnut-soft">
            Истите луѓе што ги земаат мерките го изработуваат и го монтираат мебелот — еден соговорник
            од првиот телефонски повик до последниот завртен шраф.
          </p>
          <a href="#contact" className="btn btn-line mt-9">
            Закажете мерење
          </a>
        </div>

        <div className="self-start">
          <p className="text-meta text-brass">Што изработуваме</p>
          <dl className="mt-4">
            {legend.map(([what, size]) => (
              <div key={what} className="flex items-baseline justify-between gap-6 border-b border-walnut/10 py-4 first:border-t">
                <dt className="text-body text-walnut">{what}</dt>
                <dd className="num whitespace-nowrap text-meta text-walnut-soft">{size}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
