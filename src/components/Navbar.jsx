import { useEffect, useState } from "react"
import ScrollProgress from "./ScrollProgress"
import { contact } from "../data/contact"

const links = [
  { href: "#gallery", label: "Изработки" },
  { href: "#about", label: "Работилницата" },
  { href: "#faq", label: "Прашања" },
  { href: "#contact", label: "Контакт" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  // The link for the section currently under the header gets its underline
  // drawn, so the nav doubles as a position marker on the sheet.
  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean)
    if (!sections.length || !("IntersectionObserver" in window)) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5] },
    )
    sections.forEach((section) => io.observe(section))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-30 border-b border-ink bg-cream/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_var(--color-ink)]" : ""
      }`}
    >
      <div
        className={`sheet flex items-center justify-between gap-6 transition-[height] duration-300 ease-out ${
          scrolled ? "h-12" : "h-14"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <img
            src="/logo-mark.png"
            alt=""
            aria-hidden="true"
            className={`w-auto transition-[height] duration-300 ease-out ${scrolled ? "h-7" : "h-8"}`}
          />
          <span className="flex items-baseline gap-2.5">
            <span className="font-extrabold tracking-tight">Tim ProMebel</span>
            <span
              className={`hidden text-note font-normal text-ink/55 transition-all duration-300 sm:inline ${
                scrolled ? "max-w-0 overflow-hidden opacity-0" : "max-w-40 opacity-100"
              }`}
            >
              мебел по мерка
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-note md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={`link-draw transition-colors ${active === link.href ? "text-ink" : "text-ink/75 hover:text-ink"}`}
            >
              {link.label}
            </a>
          ))}
          <a href={`tel:${contact.phoneHref}`} className="num link-draw border-l border-ink/25 pl-7 font-semibold">
            {contact.phone}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Затвори мени" : "Отвори мени"}
          className="frame relative flex size-9 flex-col items-center justify-center gap-[5px] transition-colors hover:bg-ink/5 md:hidden"
        >
          <span
            className={`h-px w-4 bg-ink transition-transform duration-300 ease-out ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span className={`h-px w-4 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-4 bg-ink transition-transform duration-300 ease-out ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* The menu unrolls instead of snapping open. */}
      <div
        className="fold border-t border-ink/20 bg-card md:hidden"
        data-open={open}
        style={{ borderTopWidth: open ? 1 : 0 }}
      >
        <div>
          <div className="sheet flex flex-col py-1">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/10 py-3 transition-all duration-300 last:border-0"
                style={{
                  transitionDelay: open ? `${80 + i * 45}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateX(-8px)",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${contact.phoneHref}`}
              className="num py-3 font-semibold transition-all duration-300"
              style={{
                transitionDelay: open ? `${80 + links.length * 45}ms` : "0ms",
                opacity: open ? 1 : 0,
              }}
            >
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      <ScrollProgress />
    </header>
  )
}
