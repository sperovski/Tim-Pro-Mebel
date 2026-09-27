const steps = [
  {
    n: 1,
    title: "Мериме кај вас",
    body: "Излегуваме на адреса, ги земаме мерките и гледаме каде одат приклучоците.",
  },
  {
    n: 2,
    title: "Цртаме и пресметуваме",
    body: "Добивате цртеж и цена по елемент, пред да се сечи материјал.",
  },
  {
    n: 3,
    title: "Изработуваме",
    body: "Сечење, кантирање и склопување во работилницата, со проверени плочи и оков.",
  },
  {
    n: 4,
    title: "Монтираме",
    body: "Монтажата ја прави нашиот тим и го нивелира секој елемент на лице место.",
  },
]

/**
 * The four steps, set out the way a run of cabinets is dimensioned rather than
 * as four boxes in a row: one string of measurement runs the width of the
 * section, divided by a tick where each step ends, with the callout number
 * sitting on the string where that step begins. On narrow screens the segments
 * stack and each step keeps its own short dimension above it.
 */
export default function Process() {
  return (
    <section id="process" className="border-y border-ink/20 bg-card">
      <div className="sheet py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <h2 className="headline text-title sm:text-display" data-reveal="up">
            Како работиме.
          </h2>
          <p className="text-note text-ink/70" data-reveal="up" style={{ "--d": "90ms" }}>
            Од мерка до монтажа, со ист тим на секој чекор.
          </p>
        </div>

        <div className="mt-12 grid gap-x-0 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.n} className="group" data-reveal="up" style={{ "--d": `${i * 110}ms` }}>
              {/* This step's segment of the dimension string. The segment runs
                  the full column width so one step's closing tick meets the
                  next step's number — a chained dimension, not four separate
                  measurements. The text below carries its own gutter instead. */}
              <div className="flex items-center gap-3" aria-hidden="true">
                <span className="callout num">{step.n}</span>
                <span className="h-px flex-1 bg-cinnamon/30 transition-colors duration-300 group-hover:bg-cinnamon" />
                <span className="h-2.5 w-px bg-cinnamon/50 transition-colors duration-300 group-hover:bg-cinnamon" />
              </div>

              <h3 className="mt-6 pr-8 font-semibold transition-colors duration-300 group-hover:text-cinnamon">
                {step.title}
              </h3>
              <p className="mt-2 pr-8 text-note text-ink/70">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
