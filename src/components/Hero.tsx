import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Star, MessageCircle, ArrowDown, Scissors, ShieldCheck, MapPin } from 'lucide-react'
import { getWhatsAppBookingLink } from '../data/salonData'
import { SectionBookingCta } from './SectionBookingCta'
import { useBooking } from '../context/BookingContext'

const NumberCounter = () => {
  const [val, setVal] = useState('0.0')

  useEffect(() => {
    let startTimestamp: number | null = null
    const duration = 1200 // 1.2s

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const current = (progress * 5.0).toFixed(1)
      setVal(current)
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setVal('5.0')
      }
    }

    const rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <span className="relative inline-block italic text-[#C9A227] pb-0.5">
      {val}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A227] origin-left block"
      />
    </span>
  )
}

export const Hero = () => {
  const { openBooking } = useBooking()
  const shouldReduceMotion = useReducedMotion()

  const words = ['Rated', '5.0', 'by', '50', 'clients', 'in', 'Krishna', 'Nagar']

  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-between pt-24 pb-12 sm:pt-28 sm:pb-16 bg-[#0F0F10] text-[#FAF8F5] overflow-hidden">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#C9A227]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#C9A227]/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Top Eyebrow & Social Proof Pill */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <span className="eyebrow-label">KRISHNA NAGAR, DELHI</span>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C9A227]/30 text-xs font-sans font-medium backdrop-blur-md">
                <div className="flex items-center text-[#C9A227]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C9A227] text-[#C9A227]" />
                  ))}
                </div>
                <span className="text-[#C9A227] font-semibold">5.0 Star Rated</span>
                <span className="text-white/40">•</span>
                <span className="text-[#CFCAC2]">50 Google Reviews</span>
              </div>
            </motion.div>

            {/* Word-by-word rising headline */}
            <motion.h1
              className="hero-headline font-serif font-semibold text-white tracking-tight flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.06,
                  },
                },
              }}
            >
              {words.map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="inline-block"
                >
                  {word === '5.0' ? <NumberCounter /> : word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subline (fades up with 0.5s delay) */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.5,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[16px] md:text-[17px] leading-[1.65] text-[#CFCAC2] max-w-2xl font-sans"
            >
              Haircuts, colour, hair spa and grooming by trained stylists in Lal Quarter Market.
            </motion.p>

            {/* Primary Action Buttons (fades up after headline) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.6,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
            >
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={getWhatsAppBookingLink('Haircut & Styling')}
                onClick={(e) => {
                  e.preventDefault()
                  openBooking({ serviceName: 'Haircut (Style & Finish)' })
                }}
                className="btn-gold-shine btn-pulse-gold inline-flex items-center justify-center gap-2.5 px-8 py-4 min-h-[48px] rounded-xl bg-[#C9A227] text-[#0F0F10] hover:bg-[#b8911f] font-sans font-semibold text-[15px] tracking-[0.02em] transition-all duration-200 shadow-lg shadow-[#C9A227]/10 text-center cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Book on WhatsApp</span>
              </motion.a>

              <motion.a
                whileTap={{ scale: 0.97 }}
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 min-h-[48px] rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-[#FAF8F5] font-sans font-semibold text-[15px] tracking-[0.02em] transition-colors text-center"
              >
                <Scissors className="w-4 h-4 text-[#C9A227]" />
                <span>See Services</span>
                <ArrowDown className="w-4 h-4 text-white/60" />
              </motion.a>
            </motion.div>

            {/* Quick trust reassurance bullets */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#CFCAC2]/80 font-sans"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                Sanitized & single-use capes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C9A227]" />
                Near Vodafone Store, Lal Quarter
              </span>
            </motion.div>
          </div>

          {/* Hero Image Column with clip-path reveal and slow zoom */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#C9A227]/40 via-transparent to-[#C9A227]/20 blur-sm"></div>

              {/* Card Container with Clip Path Reveal */}
              <motion.div
                initial={{
                  clipPath: shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden bg-[#1E1E22] border border-[#C9A227]/30 shadow-2xl"
              >
                {/* Visual Image with slow zoom scale 1.08 to 1 over 6s */}
                <div className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-[#2A2A30] to-[#0F0F10]">
                  <motion.img
                    initial={{ scale: shouldReduceMotion ? 1 : 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: 'easeOut' }}
                    src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80"
                    alt="Hair Fashionic Salon Interior and Styling Experience"
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-transparent to-transparent opacity-80 pointer-events-none"></div>

                  {/* Placeholder Banner Badge */}
                  <div className="absolute top-4 right-4 bg-[#0F0F10]/85 backdrop-blur-md border border-[#C9A227]/40 text-[#C9A227] px-3 py-1.5 rounded-lg text-xs font-sans font-semibold tracking-wide shadow-md">
                    [SALON PHOTO]
                  </div>

                  {/* Floating Salon Info Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0F0F10]/90 backdrop-blur-md border border-white/10 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="eyebrow-label text-[11px]">
                          Lal Quarter Market
                        </div>
                        <h3 className="card-title text-white mt-0.5">
                          Hair Fashionic Experience
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end text-[#C9A227]">
                          <Star className="w-4 h-4 fill-[#C9A227]" />
                          <span className="font-sans font-bold text-sm text-white">5.0</span>
                        </div>
                        <span className="text-[11px] font-sans text-[#CFCAC2]">50+ happy locals</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Every section ends in a "Book on WhatsApp" button */}
        <div className="mt-12">
          <SectionBookingCta
            contextName="First Time Visit"
            subtitle="Book your preferred slot on WhatsApp now — fast, personal confirmation"
          />
        </div>
      </div>
    </section>
  )
}
