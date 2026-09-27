import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Process from "./components/Process"
import GalleryGrid from "./components/GalleryGrid"
import About from "./components/About"
import Faq from "./components/Faq"
import ContactForm from "./components/ContactForm"
import Footer from "./components/Footer"
import BackToTop from "./components/BackToTop"
import { useScrollReveal } from "./hooks/useScrollReveal"

export default function App() {
  useScrollReveal()

  return (
    <>
      <Navbar />
      <main id="content">
        <Hero />
        <Process />
        <GalleryGrid />
        <About />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
