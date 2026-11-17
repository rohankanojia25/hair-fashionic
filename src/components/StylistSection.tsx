import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { Star, MessageCircle, CheckCircle2 } from 'lucide-react'
import { getWhatsAppBookingLink } from '../data/salonData'
import { SectionBookingCta } from './SectionBookingCta'
import { useBooking } from '../context/BookingContext'
import { SectionReveal, RevealItem } from './SectionReveal'

export const StylistSection = () => {
  const { openBooking } = useBooking()
  const photoContainerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)
  const [showMoreBio, setShowMoreBio] = useState(false)

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const { scrollYProgress } = useScroll({
    target: photoContainerRef,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax: moves -40px over its scroll range on desktop only
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -40])

  const specialities = [
    'Precision Scissor Cuts & Fades [PLACEHOLDER]',
    'Global Colour & Balayage [PLACEHOLDER]',
    'Keratin Therapy & Texture Rebonding [PLACEHOLDER]',
    'Beard Sculpting & Styling [PLACEHOLDER]',
  ]

  const raheesBookingUrl = getWhatsAppBookingLink(undefined, undefined, 'Rahees')

  const stylistSrcSet = `
    https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fm=webp&fit=crop&w=480&q=80 480w,
    https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fm=webp&fit=crop&w=800&q=80 800w,
    https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fm=webp&fit=crop&w=1200&q=80 1200w
  `.trim()

  return (
    <section id="stylist" className="py-16 md:py-24 bg-white border-t border-[#0F0F10]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <RevealItem>
              <span className="eyebrow-label block mb-3">MEET THE STYLIST</span>
            </RevealItem>
            <RevealItem>
              <h2 className="section-headline font-serif text-[#0F0F10]">
                Meet Our <span className="italic text-[#C9A227]">Stylist</span>
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-3 text-[16px] md:text-[17px] leading-[1.65] text-[#666666] font-sans">
                The stylist our clients mention by name in their 5-star Google reviews.
              </p>
            </RevealItem>
          </div>

          {/* Featured Stylist Card */}
          <RevealItem>
            <div className="max-w-4xl mx-auto bg-[#FAF8F5] rounded-2xl border border-[#0F0F10]/10 overflow-hidden shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* Stylist Photo Placeholder with subtle Parallax on desktop */}
                <div
                  ref={photoContainerRef}
                  className="md:col-span-5 relative bg-[#1E1E22] min-h-[300px] md:min-h-full flex flex-col justify-end overflow-hidden"
                >
                  <motion.img
                    style={{
                      y: isDesktop && !shouldReduceMotion ? yParallax : 0,
                    }}
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fm=webp&fit=crop&w=800&q=80"
                    srcSet={stylistSrcSet}
                    sizes="(max-width: 768px) 100vw, 500px"
                    alt="Rahees - Master Stylist at Hair Fashionic"
                    className="absolute inset-0 w-full h-[120%] object-cover object-top filter grayscale contrast-125 opacity-70"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/40 to-transparent pointer-events-none"></div>

                  {/* Photo Placeholder Tag */}
                  <div className="absolute top-4 left-4 bg-[#0F0F10]/90 backdrop-blur-sm border border-[#C9A227]/40 text-[#C9A227] px-3 py-1 rounded text-xs font-sans font-semibold">
                    [PHOTO: PLACEHOLDER]
                  </div>

                  {/* Stylist Name overlay on mobile */}
                  <div className="relative p-5 sm:p-6 z-10">
                    <span className="eyebrow-label text-[11px] block text-[#C9A227]">
                      Senior Hairdresser
                    </span>
                    <h3 className="card-title text-2xl text-white mt-1">
                      Rahees
                    </h3>
                    <p className="text-xs text-[#CFCAC2] mt-1 font-sans">
                      Known for detail, gentle hands, and personalized style consultations.
                    </p>
                  </div>
                </div>

                {/* Stylist Details */}
                <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F0F10] text-[#C9A227] text-xs font-sans font-semibold mb-4">
                      <Star className="w-3.5 h-3.5 fill-[#C9A227]" />
                      <span>Google Client Favorite</span>
                    </div>

                    <h3 className="card-title text-2xl sm:text-3xl text-[#0F0F10]">
                      Rahees
                    </h3>
                    <p className="text-sm font-sans font-semibold text-[#C9A227] mt-1">
                      Master Hair Stylist & Grooming Specialist
                    </p>

                    {/* Trim phone text: max 3 short lines on mobile, expandable behind "Read more" */}
                    <div className="mt-4 font-sans text-[#666666]">
                      {/* Mobile version with Read more */}
                      <div className="block md:hidden text-[15px] leading-[1.6]">
                        {showMoreBio ? (
                          <p>
                            With years of dedicated craft in East Delhi, Rahees takes time to understand your hair texture, face shape, and lifestyle before making the first cut. Clients consistently praise his humility, patience, and artistry.
                            <button
                              type="button"
                              onClick={() => setShowMoreBio(false)}
                              className="text-[#C9A227] font-semibold text-xs ml-1 inline-flex items-center min-h-[48px] py-1 underline cursor-pointer"
                            >
                              Show less
                            </button>
                          </p>
                        ) : (
                          <p>
                            With years of dedicated craft in East Delhi, Rahees takes time to understand your hair texture and lifestyle before making the first cut.
                            <button
                              type="button"
                              onClick={() => setShowMoreBio(true)}
                              className="text-[#C9A227] font-semibold text-xs ml-1 inline-flex items-center min-h-[48px] py-1 underline cursor-pointer"
                            >
                              Read more
                            </button>
                          </p>
                        )}
                      </div>

                      {/* Desktop version (1024px+ / md+) */}
                      <p className="hidden md:block text-[16px] md:text-[17px] leading-[1.65]">
                        With years of dedicated craft in East Delhi, Rahees takes time to understand your hair texture, face shape, and lifestyle before making the first cut. Clients consistently praise his humility, patience, and artistry.
                      </p>
                    </div>

                    {/* Real client mention callout */}
                    <div className="mt-5 p-4 rounded-xl bg-white border border-[#C9A227]/30 shadow-sm">
                      <p className="text-sm italic font-serif text-[#1E1E1E]">
                        &ldquo;All time best salon, kudos to Rahees, great hair artist&rdquo;
                      </p>
                      <p className="text-[11px] font-sans font-semibold text-[#666666] mt-1">
                        — Verified Google Reviewer
                      </p>
                    </div>

                    {/* Specialities List */}
                    <div className="mt-6">
                      <h4 className="eyebrow-label text-[11px] mb-3">
                        Specialities & Signature Services
                      </h4>
                      <ul className="space-y-2">
                        {specialities.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm font-sans text-[#1E1E1E]">
                            <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Direct Booking with Rahees (min 48px tap target) */}
                  <div className="mt-8 pt-6 border-t border-[#0F0F10]/10">
                    <motion.a
                      whileTap={{ scale: 0.97 }}
                      href={raheesBookingUrl}
                      onClick={(e) => {
                        e.preventDefault()
                        openBooking({ stylistName: 'Rahees', serviceName: 'Haircut (Style & Finish)' })
                      }}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] rounded-xl bg-[#0F0F10] hover:bg-[#252528] text-white font-sans font-semibold text-[15px] tracking-[0.02em] transition-all shadow-sm cursor-pointer btn-gold-shine"
                    >
                      <MessageCircle className="w-4 h-4 text-[#C9A227]" />
                      <span>Book with Rahees on WhatsApp</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </RevealItem>

          {/* Every section ends in a "Book on WhatsApp" button */}
          <RevealItem>
            <SectionBookingCta
              contextName="Appointment with Rahees"
              subtitle="Request Rahees directly for your haircut or colour"
            />
          </RevealItem>
        </SectionReveal>
      </div>
    </section>
  )
}
