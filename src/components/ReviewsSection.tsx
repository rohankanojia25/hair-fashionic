import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Star, ExternalLink, Quote, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { REVIEWS, SALON_INFO } from '../data/salonData'
import { SectionReveal, RevealItem } from './SectionReveal'

export const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
  }, [])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)
  }, [])

  // Auto-sliding carousel (5s per card), pauses on hover
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  const review = REVIEWS[currentIndex]

  const slideVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.25 },
    }),
  }

  return (
    <section id="reviews" className="py-14 md:py-24 bg-[#FAF8F5] overflow-hidden">
      <SectionReveal className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <RevealItem className="text-center max-w-3xl mx-auto mb-6">
          <span className="eyebrow-label block mb-2">CLIENT REVIEWS</span>
          <h2 className="section-headline font-serif text-[#0F0F10]">
            What Our <span className="italic text-[#C9A227]">Clients</span> Say
          </h2>

          {/* THE ONLY RATING DISPLAY ON THE ENTIRE SITE */}
          <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs font-sans text-[#666666]">
            <div className="flex text-[#C9A227]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#C9A227]" />
              ))}
            </div>
            <span className="font-semibold text-[#0F0F10]">{SALON_INFO.ratingSummary}</span>
          </div>
        </RevealItem>

        {/* Carousel Container */}
        <RevealItem className="max-w-2xl mx-auto">
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Slide Track */}
            <div className="min-h-[220px] sm:min-h-[200px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={review.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    const threshold = 40
                    if (info.offset.x < -threshold || info.velocity.x < -400) {
                      handleNext()
                    } else if (info.offset.x > threshold || info.velocity.x > 400) {
                      handlePrev()
                    }
                  }}
                  className="w-full bg-white rounded-2xl p-5 sm:p-7 border border-[#0F0F10]/8 shadow-sm cursor-grab active:cursor-grabbing flex flex-col justify-between"
                  style={{ touchAction: 'pan-y' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-[#C9A227]">
                        {[...Array(review.stars)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#C9A227]" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    </div>

                    <div className="relative">
                      <Quote className="w-6 h-6 text-[#0F0F10]/10 absolute -top-1 -left-1 -z-0" />
                      <p className="font-serif text-lg sm:text-xl text-[#0F0F10] leading-snug relative z-10 italic font-medium">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#0F0F10]/6 flex items-center justify-between text-xs font-sans">
                    <div>
                      <p className="card-title text-sm text-[#0F0F10]">
                        {review.authorHidden}
                      </p>
                      <p className="text-[#666666]">{review.role}</p>
                    </div>
                    <span className="text-[#666666]/80">{review.date}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Chevron Controls & Dots */}
            <div className="flex items-center justify-between mt-4 px-2">
              <button
                type="button"
                onClick={handlePrev}
                className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-full border border-[#0F0F10]/10 bg-white hover:bg-[#0F0F10] text-[#0F0F10] hover:text-[#C9A227] transition-colors shadow-sm cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots Indicator with 48px tap targets */}
              <div className="flex items-center gap-1">
                {REVIEWS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1)
                      setCurrentIndex(idx)
                    }}
                    className="min-h-[48px] min-w-[32px] inline-flex items-center justify-center cursor-pointer"
                    aria-label={`Go to review ${idx + 1}`}
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-300 block ${
                        idx === currentIndex
                          ? 'w-6 bg-[#C9A227]'
                          : 'w-2 bg-[#0F0F10]/20 hover:bg-[#0F0F10]/40'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-full border border-[#0F0F10]/10 bg-white hover:bg-[#0F0F10] text-[#0F0F10] hover:text-[#C9A227] transition-colors shadow-sm cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </RevealItem>

        {/* Read all reviews link */}
        <RevealItem className="mt-4 text-center">
          <a
            href={SALON_INFO.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs sm:text-sm tracking-[0.02em] text-[#0F0F10] hover:text-[#C9A227] transition-colors underline decoration-[#C9A227] decoration-1 underline-offset-4"
          >
            <span>Read all 50 reviews on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </RevealItem>
      </SectionReveal>
    </section>
  )
}
