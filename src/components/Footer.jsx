import { contact } from "../data/contact"

export default function Footer() {
  return (
    <footer className="bg-walnut pb-10 text-cream/55">
      <div className="wrap flex flex-col gap-3 border-t border-cream/10 pt-8 text-meta sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2.5">
          <img src="/logo-mark-light.png" alt="" aria-hidden="true" className="h-4 w-auto" />
          Tim ProMebel
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
