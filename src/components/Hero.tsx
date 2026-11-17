import { motion, useReducedMotion } from 'motion/react'
import { MessageCircle, Scissors, ShieldCheck, MapPin, Phone, Users } from 'lucide-react'
import { SALON_INFO, getWhatsAppBookingLink } from '../data/salonData'
import { useBooking } from '../context/BookingContext'

export const Hero = () => {
  const { openBooking } = useBooking()
  const shouldReduceMotion = useReducedMotion()

  const words = [
    { text: 'Hair', isAccent: false },
    { text: 'that', isAccent: false },
    { text: 'fits you,', isAccent: true },
    { text: 'by', isAccent: false },
    { text: 'stylists', isAccent: false },
    { text: 'who', isAccent: false },
    { text: 'listen.', isAccent: false },
  ]

  const heroImageSrcSet = `
    https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fm=webp&fit=crop&w=480&q=80 480w,
    https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fm=webp&fit=crop&w=800&q=80 800w,
    https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fm=webp&fit=crop&w=1200&q=80 1200w
  `.trim()

  return (
    <section id="hero" className="relative min-h-[92dvh] sm:min-h-[100dvh] flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-16 bg-[#0F0F10] text-[#FAF8F5] overflow-hidden">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#C9A227]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#C9A227]/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Main Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-3.5 sm:space-y-4 lg:space-y-6">
            {/* Word-by-word rising headline without countup */}
            <motion.h1
              className="hero-headline font-serif font-semibold text-white tracking-tight flex flex-wrap gap-x-[0.28em] gap-y-[0.05em] text-[2.1rem] sm:text-[2.8rem] lg:text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.03]"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.05,
                  },
                },
              }}
            >
              {words.map((item, idx) => (
                <motion.span
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className={`inline-block ${item.isAccent ? 'italic text-[#C9A227]' : ''}`}
                >
                  {item.text}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.35,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.6] text-[#CFCAC2] max-w-xl font-sans"
            >
              Cuts, colour, hair spa and grooming in Lal Quarter Market, Krishna Nagar.
            </motion.p>

            {/* Mobile Action Buttons: 2 buttons with clear breathing room */}
            <div className="flex flex-col gap-2.5 w-full lg:hidden pt-1">
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={getWhatsAppBookingLink('Hero Mobile WhatsApp')}
                onClick={(e) => {
                  e.preventDefault()
                  openBooking()
                }}
                className="btn-gold-shine btn-pulse-gold w-full min-h-[48px] px-6 py-3.5 rounded-xl bg-[#C9A227] text-[#0F0F10] font-sans font-bold text-[15px] tracking-[0.02em] inline-flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/15 active:scale-[0.97] cursor-pointer"
                aria-label="Book on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Book on WhatsApp</span>
              </motion.a>

              <motion.a
                whileTap={{ scale: 0.97 }}
                href={`tel:${SALON_INFO.rawPhone}`}
                className="w-full min-h-[48px] px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 text-[#FAF8F5] border border-white/20 font-sans font-semibold text-[15px] tracking-[0.02em] inline-flex items-center justify-center gap-2 active:scale-[0.97]"
                aria-label="Call Hair Fashionic"
              >
                <Phone className="w-4 h-4 text-[#C9A227]" />
                <span>Call {SALON_INFO.phone}</span>
              </motion.a>
            </div>

            {/* Mobile Salon Photo (max 45vh) */}
            <div className="block lg:hidden w-full max-h-[38vh] sm:max-h-[42vh] rounded-2xl overflow-hidden border border-[#C9A227]/30 relative my-1 shadow-xl bg-[#1E1E22]">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[38vh] sm:max-h-[42vh] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fm=webp&fit=crop&w=800&q=80"
                  srcSet={heroImageSrcSet}
                  sizes="(max-width: 768px) 100vw, 800px"
                  alt="Hair Fashionic Salon Interior"
                  className="w-full h-full object-cover object-center filter brightness-95"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-transparent to-transparent opacity-60 pointer-events-none"></div>
              </div>
            </div>

            {/* Mobile small 3-icon row under photo */}
            <div className="flex lg:hidden items-center justify-between w-full py-2 text-xs text-[#CFCAC2] font-sans border-b border-white/10">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                Sanitized Tools
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C9A227]" />
                Lal Quarter
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#C9A227]" />
                Expert Stylists
              </span>
            </div>

            {/* Desktop Action Buttons (1024px+ exactly as before) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.5,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hidden lg:flex items-center gap-4 w-full sm:w-auto pt-2"
            >
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={getWhatsAppBookingLink('Haircut & Styling')}
                onClick={(e) => {
                  e.preventDefault()
                  openBooking()
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
              </motion.a>
            </motion.div>

            {/* Desktop reassurance bullets */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="hidden lg:flex items-center gap-x-6 text-sm text-[#CFCAC2]/80 font-sans pt-2"
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

          {/* Desktop Hero Image Column (1024px+ exactly as before, with no rating badges/placeholders) */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#C9A227]/40 via-transparent to-[#C9A227]/20 blur-sm"></div>

              <motion.div
                initial={{
                  clipPath: shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden bg-[#1E1E22] border border-[#C9A227]/30 shadow-2xl"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-[#2A2A30] to-[#0F0F10]">
                  <motion.img
                    initial={{ scale: shouldReduceMotion ? 1 : 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: 'easeOut' }}
                    src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fm=webp&fit=crop&w=1000&q=80"
                    srcSet={heroImageSrcSet}
                    sizes="(max-width: 1024px) 100vw, 600px"
                    alt="Hair Fashionic Salon Interior"
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-transparent to-transparent opacity-60 pointer-events-none"></div>

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0F0F10]/90 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                    <div>
                      <div className="eyebrow-label text-[11px] text-[#C9A227]">
                        Lal Quarter Market
                      </div>
                      <h3 className="card-title text-white mt-0.5 text-base">
                        Hair Fashionic
                      </h3>
                    </div>
                    <span className="text-xs text-[#CFCAC2]">Krishna Nagar, Delhi</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
