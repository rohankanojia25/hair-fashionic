import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ZoomIn, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import { GALLERY_ITEMS, getWhatsAppBookingLink } from '../data/salonData'
import { SectionBookingCta } from './SectionBookingCta'
import { useBooking } from '../context/BookingContext'
import { SectionReveal, RevealItem } from './SectionReveal'

export const GallerySection = () => {
  const { openBooking } = useBooking()
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState(0)

  const activePhoto = activePhotoIndex !== null ? GALLERY_ITEMS[activePhotoIndex] : null

  const handleNext = useCallback(() => {
    setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0))
  }, [])

  const handlePrev = useCallback(() => {
    setActivePhotoIndex((prev) =>
      prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : GALLERY_ITEMS.length - 1
    )
  }, [])

  // Keyboard navigation for full-screen lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'Escape') setActivePhotoIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePhotoIndex, handleNext, handlePrev])

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white border-t border-[#0F0F10]/10 overflow-hidden">
      <SectionReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <RevealItem className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="eyebrow-label block mb-3">OUR PORTFOLIO</span>
          <h2 className="section-headline font-serif text-[#0F0F10]">
            Our <span className="italic text-[#C9A227]">Work</span> in the Chair
          </h2>
          <p className="mt-3 text-[16px] md:text-[17px] leading-[1.65] text-[#666666] font-sans">
            Cuts, colors, and treatments created by our stylists in Krishna Nagar. Tap any photo to expand.
          </p>
          <div className="mt-2 text-xs font-sans text-amber-800 bg-amber-50 inline-block px-3 py-1 rounded-full border border-amber-200">
            [PLACEHOLDER WORK PHOTOS - Client styles & cuts]
          </div>
        </RevealItem>

        {/* Gallery Cards: Swipe carousel on mobile (<768px), 3-col grid on desktop (1024px+) */}
        <RevealItem>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 px-4 -mx-4 pb-4 no-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:mx-0">
            {GALLERY_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  setActivePhotoIndex(idx)
                  setMobileGalleryIndex(idx)
                }}
                className="w-[78vw] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink group relative rounded-xl overflow-hidden cursor-pointer bg-[#0F0F10] border border-[#0F0F10]/10 shadow-sm aspect-square"
              >
                <img
                  src={item.imageUrl}
                  srcSet={`
                    ${item.imageUrl.replace('&w=800', '&w=480')} 480w,
                    ${item.imageUrl} 800w
                  `.trim()}
                  sizes="(max-width: 768px) 80vw, 400px"
                  alt={`${item.title} - Hair Fashionic`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out md:group-hover:scale-[1.06] filter brightness-95 will-change-transform"
                  loading="lazy"
                  decoding="async"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10]/90 via-[#0F0F10]/20 to-transparent opacity-85 sm:opacity-75 sm:group-hover:opacity-95 transition-opacity pointer-events-none" />

                {/* [PLACEHOLDER] tag */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#0F0F10]/80 backdrop-blur-sm text-[10px] text-[#C9A227] px-2 py-0.5 rounded font-mono font-bold">
                  [PLACEHOLDER]
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 text-white">
                  <span className="eyebrow-label text-[10px] sm:text-[11px] block text-[#C9A227]">
                    {item.category}
                  </span>
                  <p className="card-title text-sm sm:text-base text-white line-clamp-1 mt-0.5">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] font-sans text-white/70 mt-1">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Tap to view & book this style</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator for Mobile Swipe Carousel (<768px) */}
          <div className="flex md:hidden items-center justify-center gap-1 mt-3">
            {GALLERY_ITEMS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setMobileGalleryIndex(idx)
                  setActivePhotoIndex(idx)
                }}
                className="min-h-[48px] min-w-[28px] inline-flex items-center justify-center cursor-pointer"
                aria-label={`View photo ${idx + 1}`}
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 block ${
                    idx === mobileGalleryIndex ? 'w-6 bg-[#C9A227]' : 'w-2 bg-[#0F0F10]/20'
                  }`}
                />
              </button>
            ))}
          </div>
        </RevealItem>

        {/* Full-Screen Lightbox Modal with Swipe between Photos */}
        <AnimatePresence>
          {activePhoto && activePhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-[#0F0F10] flex flex-col justify-between"
              style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
            >
              {/* Top Navigation Bar */}
              <div className="h-16 px-4 flex items-center justify-between border-b border-white/10 shrink-0 z-20 bg-[#0F0F10]/95 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-[#C9A227]">
                    {activePhotoIndex + 1} / {GALLERY_ITEMS.length}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="eyebrow-label text-[11px] text-[#FAF8F5]">
                    {activePhoto.category}
                  </span>
                </div>

                {/* Close Button (min 48px tap target) */}
                <button
                  type="button"
                  onClick={() => setActivePhotoIndex(null)}
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-full text-white hover:text-[#C9A227] active:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close full-screen image"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Central Photo Area with Swipe Gestures */}
              <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
                <motion.div
                  key={activePhoto.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -40 || info.velocity.x < -300) {
                      handleNext()
                    } else if (info.offset.x > 40 || info.velocity.x > 300) {
                      handlePrev()
                    }
                  }}
                  className="relative max-h-full max-w-4xl w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                  style={{ touchAction: 'pan-y' }}
                >
                  <img
                    src={activePhoto.imageUrl}
                    alt={activePhoto.title}
                    className="max-h-[62vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                  />

                  <div className="absolute top-3 left-3 bg-black/75 text-[#C9A227] px-2.5 py-1 rounded text-[11px] font-mono font-semibold">
                    [WORK PHOTO PLACEHOLDER]
                  </div>
                </motion.div>

                {/* Left Arrow Navigation (min 48px tap target) */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 z-20 min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-full bg-black/60 hover:bg-[#C9A227] text-white hover:text-[#0F0F10] transition-colors cursor-pointer shadow-lg"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Arrow Navigation (min 48px tap target) */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 z-20 min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-full bg-black/60 hover:bg-[#C9A227] text-white hover:text-[#0F0F10] transition-colors cursor-pointer shadow-lg"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Action Sheet (Style Details & Book Button) */}
              <div className="p-4 sm:p-6 bg-[#0F0F10] border-t border-white/10 shrink-0 z-20">
                <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-center sm:text-left w-full sm:w-auto">
                    <h3 className="card-title text-base sm:text-lg text-white">
                      {activePhoto.title}
                    </h3>
                    <p className="text-xs text-[#CFCAC2] mt-0.5">
                      Swipe left/right to browse styles. Tap below to book this look.
                    </p>
                  </div>

                  <a
                    href={getWhatsAppBookingLink(activePhoto.title)}
                    onClick={(e) => {
                      e.preventDefault()
                      const title = activePhoto.title
                      setActivePhotoIndex(null)
                      openBooking({ serviceName: title })
                    }}
                    className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl bg-[#C9A227] text-[#0F0F10] hover:bg-[#b8911f] font-sans font-bold text-[15px] tracking-[0.02em] inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer btn-gold-shine shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Book This Style on WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Every section ends in a "Book on WhatsApp" button */}
        <RevealItem>
          <SectionBookingCta
            contextName="Portfolio Gallery"
            subtitle="Show any photo to your stylist — we recreate exact looks"
          />
        </RevealItem>
      </SectionReveal>
    </section>
  )
}
