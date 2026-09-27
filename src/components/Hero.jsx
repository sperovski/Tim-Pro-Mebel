export default function Hero() {
  return (
    <section id="top" className="wrap pt-10 pb-20 sm:pt-16 sm:pb-28">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20">
        <div className="rise lg:w-[46%]" style={{ animationDelay: "80ms" }}>
          <div className="relative overflow-hidden bg-linen" style={{ aspectRatio: "1200/1600" }}>
            <img
              src="/gallery/hero-tv-zid.jpg"
              alt="ТВ ѕид со скулптурални 3Д панели и скриено ЛЕД осветлување, изработен по мерка"
              className="size-full object-cover"
              fetchpriority="high"
            />
          </div>
        </div>

        <div className="lg:w-[54%]">
          <h1 className="rise display text-[2.6rem] sm:text-[3.4rem] lg:text-[3.9rem]" style={{ animationDelay: "180ms" }}>
            Дрво, мерка и трпение.
          </h1>

          <p className="rise prose-measure mt-7 text-lede text-walnut-soft" style={{ animationDelay: "300ms" }}>
            Tim ProMebel е семејна работилница за мебел по мерка — кујни, гардеробери и внатрешности,
            изработени рачно, парче по парче, за просторот во кој навистина ќе живеете.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-6" style={{ animationDelay: "420ms" }}>
            <a href="#contact" className="btn btn-solid">
              Закажете мерење
            </a>
            <a href="#gallery" className="link-draw text-meta text-walnut-soft hover:text-walnut">
              Погледнете ги изработките
            </a>
          </div>

          <p className="rise mt-6 text-meta text-walnut-soft/70" style={{ animationDelay: "500ms" }}>
            Мерењето на терен е бесплатно, без обврска.
          </p>
        </div>
      </div>
    </section>
  )
}
