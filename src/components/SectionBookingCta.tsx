import { MessageCircle } from 'lucide-react'
import { getWhatsAppBookingLink } from '../data/salonData'
import { useBooking } from '../context/BookingContext'

interface SectionBookingCtaProps {
  contextName?: string
  subtitle?: string
  variant?: 'subtle' | 'card' | 'bar'
}

export const SectionBookingCta = ({
  contextName,
  subtitle = 'Appointments confirmed in under 15 minutes on WhatsApp',
  variant = 'card',
}: SectionBookingCtaProps) => {
  const { openBooking } = useBooking()
  const link = getWhatsAppBookingLink(contextName || 'Salon Appointment')

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault()
    openBooking({ serviceName: contextName })
  }

  if (variant === 'bar') {
    return (
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#0F0F10]/10">
        <div>
          <p className="card-title text-sm text-[#1E1E1E]">Ready for your fresh look?</p>
          <p className="text-xs font-sans text-[#666666]">{subtitle}</p>
        </div>
        <a
          href={link}
          onClick={handleBookingClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-[#0F0F10] text-[#FAF8F5] hover:bg-[#252528] font-sans font-semibold text-[15px] tracking-[0.02em] transition-all active:scale-[0.97] shadow-sm cursor-pointer btn-gold-shine"
        >
          <MessageCircle className="w-4 h-4 text-[#C9A227]" />
          <span>Book on WhatsApp</span>
        </a>
      </div>
    )
  }

  return (
    <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#0F0F10] to-[#1E1E22] text-[#FAF8F5] flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-[#C9A227]/20">
      <div className="text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/20 text-[#C9A227] text-xs font-sans font-semibold mb-2">
          <span className="eyebrow-label text-[11px] text-[#C9A227]">Instant Booking</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]"></span>
          <span className="text-xs font-sans font-medium text-[#FAF8F5]/90">Krishna Nagar, Delhi</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-white font-semibold">
          Book your slot with <span className="italic text-[#C9A227]">Hair Fashionic</span>
        </h3>
        <p className="text-sm font-sans text-[#CFCAC2] mt-1 max-w-lg leading-relaxed">
          {subtitle}. No prepayment needed — walk in and pay after your service.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 shrink-0">
        <a
          href={link}
          onClick={handleBookingClick}
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-xl bg-[#C9A227] text-[#0F0F10] hover:bg-[#b8911f] font-sans font-semibold text-[15px] tracking-[0.02em] transition-all active:scale-[0.97] shadow-sm text-center cursor-pointer btn-gold-shine btn-pulse-gold"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Book on WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
