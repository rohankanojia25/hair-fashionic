import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { TrustStrip } from './components/TrustStrip'
import { MarqueeStrip } from './components/MarqueeStrip'
import { ServicesSection } from './components/ServicesSection'
import { StylistSection } from './components/StylistSection'
import { ReviewsSection } from './components/ReviewsSection'
import { GallerySection } from './components/GallerySection'
import { VisitUsSection } from './components/VisitUsSection'
import { Footer } from './components/Footer'
import { StickyMobileBar } from './components/StickyMobileBar'
import { BookingProvider } from './context/BookingContext'
import { BookingModal } from './components/BookingModal'

export function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    // Keep anchor links working smoothly with header offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href)
        if (element) {
          e.preventDefault()
          lenis.scrollTo(element as HTMLElement, { offset: -70 })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
    }
  }, [])

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1E1E]">
        {/* 1. Header: wordmark "Hair Fashionic", nav, "Book Now" */}
        <Header />

        <main className="flex-grow pb-16 md:pb-0">
          {/* 2. Hero: headline "Rated 5.0 by 50 clients in Krishna Nagar", subline, CTAs, photo [SALON PHOTO] */}
          <Hero />

          {/* 3. Trust strip: 5.0 on Google, Humble staff, Hygienic tools, Near Vodafone store */}
          <TrustStrip />

          {/* Gold marquee strip between hero and services */}
          <MarqueeStrip />

          {/* 4. Services: tabs Hair/Colour/Treatments/Grooming/Skin, cards with prefilled WhatsApp booking */}
          <ServicesSection />

          {/* 5. Meet our stylist: Rahees, "the stylist our clients mention by name", specialities [PLACEHOLDER] */}
          <StylistSection />

          {/* 6. Reviews: real Google reviews with hidden first names, 5.0 rating link */}
          <ReviewsSection />

          {/* 7. Gallery: 9 work photos [PLACEHOLDER], 2 col mobile / 3 desktop, lightbox modal */}
          <GallerySection />

          {/* 8. Visit us: Lal Quarter Market, near Vodafone store, hours, map embed, tel, directions */}
          <VisitUsSection />
        </main>

        {/* 9. Footer: LocalBusiness JSON-LD, hours, links, info */}
        <Footer />

        {/* Sticky mobile bar: Call | WhatsApp | Directions */}
        <StickyMobileBar />

        {/* Booking Sheet (Bottom Sheet on Mobile, Modal on Desktop) */}
        <BookingModal />
      </div>
    </BookingProvider>
  )
}

export default App
