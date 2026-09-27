const steps = [
  { n: 1, title: "Мериме кај вас", body: "Излегуваме на адреса, ги земаме мерките и гледаме каде одат приклучоците." },
  { n: 2, title: "Цртаме и пресметуваме", body: "Добивате цртеж и цена по елемент, пред да се сечи материјал." },
  { n: 3, title: "Изработуваме", body: "Сечење, кантирање и склопување во работилницата, со проверени плочи и оков." },
  { n: 4, title: "Монтираме", body: "Монтажата ја прави нашиот тим и го нивелира секој елемент на лице место." },
]

export default function Process() {
  return (
    <section aria-label="Како работиме" className="border-y border-ink/20 bg-cream">
      {/* gap-px over the darker ground draws the dividers as hairlines */}
      <div className="sheet">
        <div className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="step group relative flex gap-4 bg-card py-7 transition-colors duration-300 hover:bg-cream lg:px-6"
              data-reveal="up"
              style={{ "--d": `${i * 110}ms` }}
            >
              <span className="callout num">{step.n}</span>
              <div>
                <h3 className="font-semibold transition-colors duration-300 group-hover:text-cinnamon">
                  {step.title}
                </h3>
                <p className="mt-1 text-note text-ink/70">{step.body}</p>
              </div>
              {/* The step underlines itself as the pointer rests on it. */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cinnamon transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
