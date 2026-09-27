import { useEffect, useRef, useState } from "react"
import { contact } from "../data/contact"

const empty = { name: "", phone: "", message: "" }

export default function ContactForm() {
  const [form, setForm] = useState(empty)
  const [state, setState] = useState("idle") // idle | sending | sent
  const timers = useRef([])

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Composes the message in the visitor's own mail client — no backend. The
  // short "sending" beat is there so the button confirms the click before the
  // mail client steals the window.
  const handleSubmit = (e) => {
    e.preventDefault()
    if (state !== "idle") return
    setState("sending")

    const subject = `Барање за мерење од ${form.name || "веб-страница"}`
    const body = `Име: ${form.name}\nТелефон: ${form.phone}\n\n${form.message}`

    timers.current.push(
      setTimeout(() => {
        window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`
        setState("sent")
        timers.current.push(setTimeout(() => setState("idle"), 3200))
      }, 650),
    )
  }

  const rows = [
    ["Телефон", contact.phone, `tel:${contact.phoneHref}`],
    ["Е-пошта", contact.email, `mailto:${contact.email}`],
    ["Локација", contact.address, null],
    ["Facebook", "Tim ProMebel", contact.facebook],
  ]

  const fields = [
    { id: "contact-name", label: "Име", type: "text", key: "name" },
    { id: "contact-phone", label: "Телефон", type: "tel", key: "phone" },
  ]

  return (
    /* The sheet's title block: where a drawing states who made it and how to reach them. */
    <section id="contact" className="border-t border-ink bg-ink text-cream">
      <div className="sheet py-16 lg:py-24">
        <h2 className="headline max-w-2xl text-title sm:text-display" data-reveal="up">
          Кажете ни која просторија ја средувате.
        </h2>
        <p className="prose-measure mt-5 text-cream/75" data-reveal="up" style={{ "--d": "90ms" }}>
          Оставете број и кратко што ви треба. Се јавуваме за термин, а мерењето на терен е бесплатно.
        </p>

        <div
          className="mt-10 grid gap-px border border-cream/25 bg-cream/25 lg:grid-cols-[7fr_5fr]"
          data-reveal="up"
          style={{ "--d": "160ms" }}
        >
          <form onSubmit={handleSubmit} className="bg-ink p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field, i) => (
                <label className="block" key={field.id} data-reveal="up" style={{ "--d": `${200 + i * 70}ms` }}>
                  <span className="mb-1.5 block text-note text-cream/70">{field.label}</span>
                  <input
                    id={field.id}
                    type={field.type}
                    required
                    value={form[field.key]}
                    onChange={update(field.key)}
                    className={`field ${field.key === "phone" ? "num" : ""}`}
                  />
                </label>
              ))}
            </div>

            <label className="mt-4 block" data-reveal="up" style={{ "--d": "340ms" }}>
              <span className="mb-1.5 flex items-baseline justify-between gap-3 text-note text-cream/70">
                Што ви треба
                <span className={`num transition-opacity duration-300 ${form.message ? "opacity-70" : "opacity-0"}`}>
                  {form.message.length} знаци
                </span>
              </span>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={form.message}
                onChange={update("message")}
                placeholder="На пример: кујна од 3,2 метри со горни елементи, стан во Аеродром."
                className="field resize-y"
              />
            </label>

            {/* The one animated edge on the sheet: a conic sweep round the
                submit border, a travelling kerf while it works, and a
                checkmark that draws itself once the mail client is handed the
                message. */}
            <button
              type="submit"
              disabled={state !== "idle"}
              aria-live="polite"
              className="btn-conic mt-6 inline-flex w-full text-cream sm:w-auto"
            >
              <span className={`relative overflow-hidden ${state === "sending" ? "kerf" : ""}`}>
                {state === "sent" ? (
                  <>
                    <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path className="check-draw" pathLength="1" d="m3 8.5 3.2 3.2L13 5" />
                    </svg>
                    Подготвено за праќање
                  </>
                ) : state === "sending" ? (
                  "Се подготвува…"
                ) : (
                  <>
                    Испратете барање
                    <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
                    </svg>
                  </>
                )}
              </span>
            </button>
            <p className="mt-3 text-note text-cream/55">
              Барањето се отвора во вашиот е-мејл клиент, подготвено за праќање.
            </p>
          </form>

          <dl className="bg-ink">
            {rows.map(([label, value, href], i) => (
              <div
                key={label}
                className="group flex items-baseline justify-between gap-4 border-b border-cream/20 px-6 py-4 transition-colors duration-300 last:border-0 hover:bg-cream/5 sm:px-8"
                data-reveal="left"
                style={{ "--d": `${220 + i * 70}ms` }}
              >
                <dt className="text-note text-cream/60">{label}</dt>
                <dd className="text-right">
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="num link-draw"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="num">{value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
