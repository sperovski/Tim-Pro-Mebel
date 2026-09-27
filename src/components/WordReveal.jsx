import { Fragment } from "react"

/**
 * Sets a headline word by word, the way a title block gets lettered in —
 * each word rides up into place a beat after the one before it.
 */
export default function WordReveal({ text, as: Tag = "h2", className = "", step = 55, delay = 0 }) {
  const words = text.split(" ")

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 && " "}
          <span
            className="inline-block"
            data-reveal="up"
            style={{ "--d": `${delay + i * step}ms` }}
          >
            {word}
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}
