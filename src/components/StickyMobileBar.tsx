import { Phone, MessageCircle, Navigation } from 'lucide-react'
import { SALON_INFO, getWhatsAppBookingLink } from '../data/salonData'
import { useBooking } from '../context/BookingContext'

export const StickyMobileBar = () => {
  const { openBooking } = useBooking()
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#0F0F10]/95 backdrop-blur-lg border-t border-[#C9A227]/30 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={`tel:${SALON_INFO.rawPhone}`}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 px-2 rounded-xl bg-white/10 active:bg-white/20 text-[#FAF8F5] transition-colors"
          aria-label="Call Hair Fashionic Salon"
        >
          <Phone className="w-5 h-5 text-[#FAF8F5] mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Call</span>
        </a>

        {/* WhatsApp Book Button (Primary Highlight) */}
        <a
          href={getWhatsAppBookingLink('Sticky Bar Quick Book')}
          onClick={(e) => {
            e.preventDefault()
            openBooking()
          }}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 px-2 rounded-xl bg-[#C9A227] active:bg-[#b8911f] text-[#0F0F10] shadow-md transition-colors cursor-pointer"
          aria-label="Book Hair Fashionic on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Directions Button */}
        <a
          href={SALON_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[48px] py-1 px-2 rounded-xl bg-white/10 active:bg-white/20 text-[#FAF8F5] transition-colors"
          aria-label="Get directions to Hair Fashionic"
        >
          <Navigation className="w-5 h-5 text-[#FAF8F5] mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Directions</span>
        </a>
      </div>
    </div>
  )
}
