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

    const subject = `Барање за мерење — ${form.name || "веб-страница"}`
    const body = `Име: ${form.name}\nТелефон: ${form.phone}\n\n${form.message}`

    timers.current.push(
      setTimeout(() => {
        window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`
        setState("sent")
        timers.current.push(setTimeout(() => setState("idle"), 3200))
      }, 500),
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
    <section id="contact" className="bg-walnut py-20 text-cream sm:py-28">
      <div className="wrap">
        <h2 className="heading max-w-2xl text-h2">Кажете ни која просторија ја средувате.</h2>
        <p className="prose-measure mt-5 text-body text-cream/70">
          Оставете број и кратко што ви треба. Се јавуваме за термин, а мерењето на терен е бесплатно.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              {fields.map((field) => (
                <label className="block" key={field.id}>
                  <span className="mb-2 block text-meta text-cream/60">{field.label}</span>
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

            <label className="mt-6 block">
              <span className="mb-2 block text-meta text-cream/60">Што ви треба</span>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={form.message}
                onChange={update("message")}
                placeholder="На пример: кујна од 3,2 метри со горни елементи, стан во Аеродром."
                className="field resize-y"
              />
            </label>

            <button type="submit" disabled={state !== "idle"} aria-live="polite" className="btn btn-solid mt-8 w-full sm:w-auto">
              {state === "sent" ? "Подготвено за праќање" : state === "sending" ? "Се подготвува…" : "Испратете барање"}
            </button>
            <p className="mt-4 text-meta text-cream/45">
              Барањето се отвора во вашиот е-мејл клиент, подготвено за праќање.
            </p>
          </form>

          <dl>
            {rows.map(([label, value, href]) => (
              <div key={label} className="flex items-baseline justify-between gap-4 border-b border-cream/15 py-4 first:border-t">
                <dt className="text-meta text-cream/55">{label}</dt>
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
