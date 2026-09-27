const steps = [
  { n: "01", title: "Мериме кај вас", body: "Излегуваме на адреса, ги земаме мерките и гледаме каде одат приклучоците." },
  { n: "02", title: "Цртаме и пресметуваме", body: "Добивате цртеж и цена по елемент, пред да се сечи материјал." },
  { n: "03", title: "Изработуваме", body: "Сечење, кантирање и склопување во работилницата, со проверени плочи и оков." },
  { n: "04", title: "Монтираме", body: "Монтажата ја прави нашиот тим и го нивелира секој елемент на лице место." },
]

export default function Process() {
  return (
    <section aria-label="Како работиме" className="wrap py-20 sm:py-28">
      <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.n}>
            <p className="font-serif text-3xl text-brass">{step.n}</p>
            <h3 className="mt-4 text-lede text-walnut">{step.title}</h3>
            <p className="mt-2 text-body text-walnut-soft">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
