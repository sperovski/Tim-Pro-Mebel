import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Featured from "./components/Featured"
import Process from "./components/Process"
import GalleryGrid from "./components/GalleryGrid"
import About from "./components/About"
import Faq from "./components/Faq"
import ContactForm from "./components/ContactForm"
import Footer from "./components/Footer"

export default function App() {
  return (
    <>
      <Navbar />
      <main id="content">
        <Hero />
        <Featured />
        <GalleryGrid />
        <Process />
        <About />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
