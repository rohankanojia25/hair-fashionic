import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ZoomIn, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import { GALLERY_ITEMS, getWhatsAppBookingLink } from '../data/salonData'
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

  // Keyboard navigation for lightbox
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
    <section id="gallery" className="py-14 md:py-24 bg-white border-t border-[#0F0F10]/10 overflow-hidden">
      <SectionReveal className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <RevealItem className="text-center max-w-3xl mx-auto mb-6">
          <span className="eyebrow-label block mb-2">OUR PORTFOLIO</span>
          <h2 className="section-headline font-serif text-[#0F0F10]">
            Our <span className="italic text-[#C9A227]">Work</span> in the Chair
          </h2>
          <p className="mt-2 text-[15px] sm:text-[16px] md:text-[17px] text-[#666666] font-sans">
            Cuts, colors, and treatments created by our stylists in Krishna Nagar.
          </p>
        </RevealItem>

        {/* 6 Photos: Swipe row on mobile (12px gap), 3-col grid on desktop */}
        <RevealItem>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-5 -mx-5 pb-3 no-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:mx-0">
            {GALLERY_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  setActivePhotoIndex(idx)
                  setMobileGalleryIndex(idx)
                }}
                className="w-[78vw] max-w-[280px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink group relative rounded-xl overflow-hidden cursor-pointer bg-[#0F0F10] border border-[#0F0F10]/10 shadow-sm aspect-square"
              >
                <img
                  src={item.imageUrl}
                  srcSet={`
                    ${item.imageUrl.replace('&w=800', '&w=480')} 480w,
                    ${item.imageUrl} 800w
                  `.trim()}
                  sizes="(max-width: 768px) 80vw, 400px"
                  alt={`${item.title} - Hair Fashionic`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out md:group-hover:scale-[1.05] filter brightness-95 will-change-transform"
                  loading="lazy"
                  decoding="async"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10]/85 via-transparent to-transparent opacity-80 sm:group-hover:opacity-90 transition-opacity pointer-events-none" />

                {/* Caption */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
                  <span className="eyebrow-label text-[10px] block text-[#C9A227]">
                    {item.category}
                  </span>
                  <p className="card-title text-sm sm:text-base text-white line-clamp-1 mt-0.5">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] font-sans text-white/70 mt-0.5">
                    <ZoomIn className="w-3 h-3 text-[#C9A227]" />
                    <span>Tap to view</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator for Mobile Swipe (<768px) */}
          <div className="flex md:hidden items-center justify-center gap-1 mt-2">
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

        {/* Full-Screen Lightbox Modal */}
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
              {/* Top Bar */}
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

                <button
                  type="button"
                  onClick={() => setActivePhotoIndex(null)}
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-full text-white hover:text-[#C9A227] active:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close image"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Photo View with Swipe Gestures */}
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
                </motion.div>

                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 z-20 min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-full bg-black/60 hover:bg-[#C9A227] text-white hover:text-[#0F0F10] transition-colors cursor-pointer shadow-lg"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 z-20 min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-full bg-black/60 hover:bg-[#C9A227] text-white hover:text-[#0F0F10] transition-colors cursor-pointer shadow-lg"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Sheet */}
              <div className="p-4 sm:p-5 bg-[#0F0F10] border-t border-white/10 shrink-0 z-20">
                <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-center sm:text-left w-full sm:w-auto">
                    <h3 className="card-title text-base sm:text-lg text-white">
                      {activePhoto.title}
                    </h3>
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
      </SectionReveal>
    </section>
  )
}
