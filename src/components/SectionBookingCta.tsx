import { MessageCircle } from 'lucide-react'
import { getWhatsAppBookingLink } from '../data/salonData'
import { useBooking } from '../context/BookingContext'

export const SectionBookingCta = () => {
  const { openBooking } = useBooking()
  const link = getWhatsAppBookingLink('Final Bottom Booking')

  return (
    <section className="py-12 md:py-16 bg-[#0F0F10] text-[#FAF8F5] border-t border-[#C9A227]/30">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <span className="eyebrow-label text-xs block text-[#C9A227] mb-2">
          BOOK YOUR VISIT
        </span>
        <h2 className="section-headline font-serif text-white text-3xl sm:text-4xl lg:text-5xl font-semibold">
          Ready for a <span className="italic text-[#C9A227]">fresh look?</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base font-sans text-[#CFCAC2] max-w-lg leading-relaxed">
          Walk in or reserve your timing with zero waiting time. Fast confirmation directly on WhatsApp.
        </p>

        <div className="mt-6 w-full sm:w-auto">
          <a
            href={link}
            onClick={(e) => {
              e.preventDefault()
              openBooking()
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 min-h-[48px] rounded-xl bg-[#C9A227] text-[#0F0F10] hover:bg-[#b8911f] font-sans font-bold text-[15px] tracking-[0.02em] shadow-lg shadow-[#C9A227]/20 cursor-pointer btn-gold-shine btn-pulse-gold active:scale-[0.97]"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Book on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}
