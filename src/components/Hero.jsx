import ElevationDrawing from "./ElevationDrawing"
import MagneticButton from "./MagneticButton"
import WordReveal from "./WordReveal"

// A handful of motes drifting through the light over the drawing.
const motes = [
  { left: "12%", top: "70%", size: 3, duration: 15, delay: 0, dx: "26px" },
  { left: "28%", top: "82%", size: 2, duration: 19, delay: 3, dx: "-18px" },
  { left: "47%", top: "64%", size: 4, duration: 22, delay: 6, dx: "34px" },
  { left: "63%", top: "88%", size: 2, duration: 17, delay: 1.5, dx: "-28px" },
  { left: "79%", top: "72%", size: 3, duration: 24, delay: 8, dx: "20px" },
  { left: "91%", top: "84%", size: 2, duration: 20, delay: 4.5, dx: "-14px" },
]

export default function Hero() {
  return (
    <section id="top">
      {/* The drawing is the hero: the first thing the workshop makes for a client. */}
      <div className="relative overflow-hidden">
        <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {motes.map((mote, i) => (
            <span
              key={i}
              className="mote"
              style={{
                left: mote.left,
                top: mote.top,
                width: mote.size,
                height: mote.size,
                animationDuration: `${mote.duration}s`,
                animationDelay: `${mote.delay}s`,
                "--dx": mote.dx,
              }}
            />
          ))}
        </div>

        <div className="sheet relative pt-8 pb-4 sm:pt-12">
          <div className="mx-auto max-w-4xl">
            <ElevationDrawing />
          </div>
        </div>
      </div>

      <div className="rule" />

      <div className="sheet grid gap-8 py-10 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:py-14">
        <WordReveal
          as="h1"
          text="Мебел што се црта околу вашиот простор."
          className="headline text-display sm:text-[3.4rem] lg:text-[3.9rem]"
          step={70}
        />

        <div className="flex flex-col items-start gap-6">
          <p className="prose-measure text-ink/80" data-reveal="up" style={{ "--d": "320ms" }}>
            Кујни, гардеробери и спални по мерка. Излегуваме на терен, мериме до милиметар и ви го покажуваме
            цртежот пред да започнеме со изработка во сопствена работилница.
          </p>
          <div className="flex flex-wrap gap-3" data-reveal="up" style={{ "--d": "420ms" }}>
            <MagneticButton href="#contact" className="btn btn-solid btn-arrow">
              Побарајте мерење
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2.5 8h11M9.5 4l4 4-4 4" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#gallery" className="btn btn-line">
              Погледнете изработки
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
