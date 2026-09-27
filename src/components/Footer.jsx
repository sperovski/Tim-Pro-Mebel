import { contact } from "../data/contact"

export default function Footer() {
  return (
    <footer className="border-t border-cream/20 bg-ink text-cream">
      <div className="sheet flex flex-col gap-3 py-6 text-note text-cream/60 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2.5">
          {/* The flat caramel mark: the gradient version reads too close to
              this dark ground, so the footer gets the light variant. */}
          <img src="/logo-mark-light.png" alt="" aria-hidden="true" className="h-5 w-auto" />
          Tim ProMebel — мебел по мерка
        </p>
        <div className="flex items-center gap-5">
          <a href={`tel:${contact.phoneHref}`} className="num link-draw">
            {contact.phone}
          </a>
          <a href={contact.facebook} target="_blank" rel="noreferrer" className="link-draw">
            Facebook
          </a>
          <p className="num">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
