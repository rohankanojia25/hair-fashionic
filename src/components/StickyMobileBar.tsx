import { Phone, MessageCircle, Navigation } from 'lucide-react'
import { SALON_INFO, getWhatsAppBookingLink } from '../data/salonData'
import { useBooking } from '../context/BookingContext'

export const StickyMobileBar = () => {
  const { openBooking } = useBooking()

  return (
    <nav
      aria-label="Mobile quick actions"
      className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#0F0F10]/98 backdrop-blur-xl border-t border-[#C9A227]/30 shadow-[0_-8px_30px_rgba(0,0,0,0.55)] px-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="h-16 max-w-md mx-auto grid grid-cols-3 items-center gap-2">
        {/* Call Button */}
        <a
          href={`tel:${SALON_INFO.rawPhone}`}
          className="flex flex-col items-center justify-center h-12 py-1 px-2 rounded-xl text-[#FAF8F5] hover:text-[#C9A227] active:bg-white/10 transition-colors"
          aria-label="Call Hair Fashionic Salon"
        >
          <Phone className="w-5 h-5 mb-0.5 text-[#C9A227]" />
          <span className="font-sans text-[13px] font-semibold tracking-tight whitespace-nowrap leading-tight">
            Call
          </span>
        </a>

        {/* WhatsApp Button (Gold, slightly larger, stays inside bar) */}
        <a
          href={getWhatsAppBookingLink('Sticky Bar Book')}
          onClick={(e) => {
            e.preventDefault()
            openBooking()
          }}
          className="h-[52px] px-2 rounded-xl bg-[#C9A227] text-[#0F0F10] shadow-md border border-[#b8911f] flex flex-col items-center justify-center btn-gold-shine btn-pulse-gold active:scale-[0.97] transition-transform cursor-pointer"
          aria-label="Book appointment on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current mb-0.5" />
          <span className="font-sans text-[13px] font-bold tracking-tight whitespace-nowrap leading-tight">
            WhatsApp
          </span>
        </a>

        {/* Directions Button */}
        <a
          href={SALON_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-12 py-1 px-2 rounded-xl text-[#FAF8F5] hover:text-[#C9A227] active:bg-white/10 transition-colors"
          aria-label="Get directions to Hair Fashionic on Google Maps"
        >
          <Navigation className="w-5 h-5 mb-0.5 text-[#C9A227]" />
          <span className="font-sans text-[13px] font-semibold tracking-tight whitespace-nowrap leading-tight">
            Directions
          </span>
        </a>
      </div>
    </nav>
  )
}
