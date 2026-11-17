import { motion } from 'motion/react'
import { MessageCircle, CheckCircle2, Quote } from 'lucide-react'
import { getWhatsAppBookingLink } from '../data/salonData'
import { useBooking } from '../context/BookingContext'
import { SectionReveal, RevealItem } from './SectionReveal'

export const StylistSection = () => {
  const { openBooking } = useBooking()

  const specialities = [
    'Precision Scissor Cuts & Fades',
    'Global Colour & Balayage',
    'Keratin Therapy & Smoothening',
    'Beard Sculpting & Styling',
  ]

  const raheesBookingUrl = getWhatsAppBookingLink(undefined, undefined, 'Rahees')

  return (
    <section id="stylist" className="py-14 md:py-24 bg-white border-t border-[#0F0F10]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionReveal>
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-6">
            <RevealItem>
              <span className="eyebrow-label block mb-2">MEET THE STYLIST</span>
            </RevealItem>
            <RevealItem>
              <h2 className="section-headline font-serif text-[#0F0F10]">
                Meet Our <span className="italic text-[#C9A227]">Stylist</span>
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-2 text-[15px] sm:text-[16px] md:text-[17px] text-[#666666] font-sans">
                The stylist our clients mention by name in local Google reviews.
              </p>
            </RevealItem>
          </div>

          {/* Single Featured Stylist Card (No duplicate blocks, neutral monogram avatar) */}
          <RevealItem>
            <div className="max-w-3xl mx-auto bg-[#FAF8F5] rounded-2xl border border-[#0F0F10]/10 overflow-hidden shadow-sm p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                {/* Monogram "R" Avatar */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0F0F10] border-2 border-[#C9A227] flex items-center justify-center font-serif text-3xl sm:text-4xl text-[#C9A227] shadow-md">
                    R
                  </div>
                  <span className="eyebrow-label text-[10px] text-[#C9A227] mt-2 font-bold tracking-wider">
                    HEAD STYLIST
                  </span>
                </div>

                {/* Stylist Details */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="card-title text-2xl text-[#0F0F10]">
                    Rahees
                  </h3>
                  <p className="text-sm font-sans font-semibold text-[#C9A227] mt-0.5">
                    Master Hair Stylist & Grooming Specialist
                  </p>

                  <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#666666] font-sans">
                    With years of dedicated craft in East Delhi, Rahees takes time to understand your hair texture and lifestyle before making the first cut. Clients consistently praise his humility, patience, and artistry.
                  </p>

                  {/* Real client mention callout */}
                  <div className="mt-4 p-3.5 rounded-xl bg-white border border-[#C9A227]/25 shadow-sm text-left relative">
                    <Quote className="w-5 h-5 text-[#C9A227]/20 absolute top-2 right-2" />
                    <p className="text-xs sm:text-sm italic font-serif text-[#1E1E1E]">
                      &ldquo;All time best salon, kudos to Rahees, great hair artist&rdquo;
                    </p>
                    <p className="text-[11px] font-sans font-semibold text-[#666666] mt-1">
                      — Verified Google Reviewer
                    </p>
                  </div>

                  {/* Specialities List */}
                  <div className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                      {specialities.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-sans text-[#1E1E1E]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Booking with Rahees - Exactly ONE button */}
                  <div className="mt-6 pt-5 border-t border-[#0F0F10]/10">
                    <motion.a
                      whileTap={{ scale: 0.97 }}
                      href={raheesBookingUrl}
                      onClick={(e) => {
                        e.preventDefault()
                        openBooking({ stylistName: 'Rahees', serviceName: 'Haircut (Style & Finish)' })
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-xl bg-[#C9A227] text-[#0F0F10] hover:bg-[#b8911f] font-sans font-bold text-[15px] tracking-[0.02em] shadow-md cursor-pointer btn-gold-shine"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Book with Rahees on WhatsApp</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </RevealItem>
        </SectionReveal>
      </div>
    </section>
  )
}
