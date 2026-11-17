import { Star, Users, Sparkles, MapPin, MessageCircle } from 'lucide-react'
import { getWhatsAppBookingLink } from '../data/salonData'
import { useBooking } from '../context/BookingContext'
import { SectionReveal, RevealItem } from './SectionReveal'

export const TrustStrip = () => {
  const { openBooking } = useBooking()
  const trustItems = [
    {
      icon: (
        <div className="flex items-center text-[#C9A227]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#C9A227] text-[#C9A227]" />
          ))}
        </div>
      ),
      title: '5.0 on Google',
      subtitle: 'Based on 50 real local reviews',
    },
    {
      icon: <Users className="w-5 h-5 text-[#C9A227]" />,
      title: 'Humble, professional staff',
      subtitle: 'Trained & patient stylists',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#C9A227]" />,
      title: 'Hygienic tools',
      subtitle: 'Sanitized blades, scissors & fresh towels',
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#C9A227]" />,
      title: 'Near Vodafone store, Lal Quarter',
      subtitle: 'Prime Krishna Nagar location',
    },
  ]

  return (
    <section className="relative bg-[#FAF8F5] border-y border-[#0F0F10]/10 py-12 md:py-16 overflow-hidden">
      <SectionReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Label */}
        <RevealItem className="text-center mb-8">
          <span className="eyebrow-label">WHY CLIENTS CHOOSE US</span>
        </RevealItem>

        {/* Trust Badges Grid */}
        <RevealItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-[#0F0F10]/8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0F0F10] flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <div>
                  <h3 className="card-title text-[#0F0F10] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#666666] mt-1 font-sans">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RevealItem>

        {/* Section ends in a "Book on WhatsApp" button */}
        <RevealItem className="mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-white border border-[#C9A227]/30 shadow-sm">
            <div className="text-center sm:text-left">
              <p className="text-[15px] font-sans font-semibold text-[#0F0F10]">
                Experience Krishna Nagar’s favorite salon
              </p>
              <p className="text-xs text-[#666666] font-sans">
                Reserve your timing with zero waiting time
              </p>
            </div>
            <a
              href={getWhatsAppBookingLink('Trust Strip Enquiry')}
              onClick={(e) => {
                e.preventDefault()
                openBooking()
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-[#0F0F10] text-white hover:bg-[#252528] font-sans font-semibold text-[15px] tracking-[0.02em] transition-colors cursor-pointer btn-gold-shine"
            >
              <MessageCircle className="w-4 h-4 text-[#C9A227]" />
              <span>Book on WhatsApp</span>
            </a>
          </div>
        </RevealItem>
      </SectionReveal>
    </section>
  )
}
