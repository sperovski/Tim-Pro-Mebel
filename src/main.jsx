import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"

// Scroll-reveal styles are scoped to .js, so the sheet is fully legible if the
// script never runs — nothing is hidden that JavaScript has to bring back.
document.documentElement.classList.add("js")

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
