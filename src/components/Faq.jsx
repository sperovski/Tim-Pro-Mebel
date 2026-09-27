import { useState } from "react"

/* Answers are the ones already given elsewhere on this page — the process
   section, the workshop copy and the materials in the gallery — collected
   where a visitor goes looking for them. */
const questions = [
  {
    q: "Колку чинат мерењето и цртежот?",
    a: "Ништо. Излегуваме на адреса, ги земаме мерките и ви подготвуваме цртеж со цена по елемент. Плаќате само ако одлучите да работиме.",
  },
  {
    q: "Дали ќе го видам цртежот пред да започне изработката?",
    a: "Да. Добивате цртеж и пресметка по елемент пред да се сечи каков и да е материјал, за да знаете точно што ќе се изработи.",
  },
  {
    q: "Кој ја прави монтажата?",
    a: "Истиот тим што ги зема мерките го изработува и го монтира мебелот. Монтажата се прави на лице место и секој елемент се нивелира.",
  },
  {
    q: "Работите ли по нестандардни мерки и агли?",
    a: "Тоа е основната работа на работилницата. Аголни гардеробери, коси плафони и елементи од под до плафон се кројат по мерка на просторот.",
  },
  {
    q: "Со какви материјали работите?",
    a: "Плочи од 18 мм, мат и сјајни МДФ фронтови, фурнир и масивно дрво, со оков со меко затворање. Точниот состав го одбираме заедно со вас на цртежот.",
  },
]

export default function Faq() {
  // One question open at a time.
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="wrap py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[4fr_7fr] lg:gap-20">
        <div>
          <h2 className="heading text-h2">Прашања пред мерењето.</h2>
          <p className="prose-measure mt-5 text-body text-walnut-soft">
            Ако вашето прашање не е тука, оставете број подолу и ќе одговориме по телефон.
          </p>
        </div>

        <div>
          {questions.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} data-open={isOpen} className="border-b border-walnut/10 first:border-t">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-serif text-lede text-walnut group-hover:text-brass">{item.q}</span>
                    <span className="fold-mark shrink-0 text-walnut-soft" aria-hidden="true" />
                  </button>
                </h3>
                <div className="fold" data-open={isOpen} id={`faq-answer-${i}`} role="region">
                  <div>
                    <p className="prose-measure pb-6 text-body text-walnut-soft">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
