import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ZoomIn } from 'lucide-react'
import { GALLERY_ITEMS, type GalleryItem, getWhatsAppBookingLink } from '../data/salonData'
import { SectionBookingCta } from './SectionBookingCta'
import { useBooking } from '../context/BookingContext'
import { SectionReveal, RevealItem } from './SectionReveal'

export const GallerySection = () => {
  const { openBooking } = useBooking()
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null)

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white border-t border-[#0F0F10]/10 overflow-hidden">
      <SectionReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <RevealItem className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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

        {/* Gallery Grid: 2 cols on mobile, 3 cols on desktop */}
        <RevealItem>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className="group relative rounded-xl overflow-hidden cursor-pointer bg-[#0F0F10] border border-[#0F0F10]/10 shadow-sm aspect-square"
              >
                <img
                  src={item.imageUrl}
                  alt={`${item.title} - Hair Fashionic`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] filter brightness-95 will-change-transform"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10]/90 via-[#0F0F10]/20 to-transparent opacity-85 sm:opacity-75 sm:group-hover:opacity-95 transition-opacity pointer-events-none" />

                {/* [PLACEHOLDER] tag */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#0F0F10]/80 backdrop-blur-sm text-[10px] text-[#C9A227] px-2 py-0.5 rounded font-mono font-bold">
                  [PLACEHOLDER]
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
                  <span className="eyebrow-label text-[10px] sm:text-[11px] block text-[#C9A227]">
                    {item.category}
                  </span>
                  <p className="card-title text-xs sm:text-base text-white line-clamp-1 mt-0.5">
                    {item.title}
                  </p>
                  <div className="hidden sm:flex items-center gap-1 text-[11px] font-sans text-white/70 mt-1">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Click to view & book this style</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealItem>

        {/* Lightbox Modal with scale + fade animation */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F0F10]/95 backdrop-blur-md"
            >
              {/* Backdrop click to close */}
              <div
                className="absolute inset-0"
                onClick={() => setActivePhoto(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 max-w-2xl w-full bg-[#1E1E22] rounded-2xl overflow-hidden border border-[#C9A227]/30 shadow-2xl"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 z-20 p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-[#0F0F10]/80 text-white hover:text-[#C9A227] transition-colors cursor-pointer"
                  aria-label="Close image preview"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="relative aspect-square sm:aspect-[4/3] w-full bg-black">
                  <img
                    src={activePhoto.imageUrl}
                    alt={activePhoto.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 text-[#C9A227] px-3 py-1 rounded text-xs font-mono font-semibold">
                    [WORK PHOTO PLACEHOLDER]
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-[#0F0F10] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="eyebrow-label text-xs block text-[#C9A227]">
                      {activePhoto.category}
                    </span>
                    <h3 className="card-title text-lg sm:text-xl text-white mt-1">
                      {activePhoto.title}
                    </h3>
                    <p className="text-xs font-sans text-[#CFCAC2] mt-1">
                      Want this exact look? Send this style to our stylist on WhatsApp.
                    </p>
                  </div>

                  <a
                    href={getWhatsAppBookingLink(activePhoto.title)}
                    onClick={(e) => {
                      e.preventDefault()
                      const title = activePhoto.title
                      setActivePhoto(null)
                      openBooking({ serviceName: title })
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-[#C9A227] text-[#0F0F10] hover:bg-[#b8911f] font-sans font-semibold text-[15px] tracking-[0.02em] shrink-0 transition-colors cursor-pointer btn-gold-shine"
                  >
                    <span>Book This Style</span>
                  </a>
                </div>
              </motion.div>
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
