import { useEffect, useState } from "react"
import { contact } from "../data/contact"

const links = [
  { href: "#gallery", label: "Изработки" },
  { href: "#about", label: "Работилницата" },
  { href: "#faq", label: "Прашања" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-30 bg-stone/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_rgba(36,27,20,0.16)]" : ""
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6 sm:h-20">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/logo-mark.png" alt="" aria-hidden="true" className="h-7 w-auto" />
          <span className="font-serif text-lg text-walnut">Tim ProMebel</span>
        </a>

        <nav className="hidden items-center gap-8 text-meta md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="link-draw text-walnut-soft hover:text-walnut">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-solid">
            Закажете мерење
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Затвори мени" : "Отвори мени"}
          className="relative flex size-9 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span className={`h-px w-4 bg-walnut transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-px w-4 bg-walnut transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-4 bg-walnut transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      <div className="fold bg-linen md:hidden" data-open={open}>
        <div>
          <div className="wrap flex flex-col py-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-walnut/10 py-3.5 text-walnut-soft"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="border-b border-walnut/10 py-3.5 font-semibold text-walnut"
            >
              Закажете мерење
            </a>
            <a href={`tel:${contact.phoneHref}`} className="num py-3.5 font-semibold text-walnut">
              {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
