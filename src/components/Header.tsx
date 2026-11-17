import { useState, useEffect } from 'react'
import { Menu, X, MessageCircle, MapPin, Phone } from 'lucide-react'
import { SALON_INFO, getWhatsAppBookingLink } from '../data/salonData'
import { useBooking } from '../context/BookingContext'

export const Header = () => {
  const { openBooking } = useBooking()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Our Stylist', href: '#stylist' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Visit Us', href: '#visit-us' },
  ]

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0F0F10]/95 backdrop-blur-md shadow-lg border-b border-[#C9A227]/20 py-3'
            : 'bg-[#0F0F10] border-b border-[#0F0F10]/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Wordmark */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]">
              <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] flex items-center justify-center font-serif text-[#0F0F10] font-bold text-lg border border-[#C9A227]/40 shadow-sm transition-transform group-hover:scale-105">
                HF
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FAF8F5]">
                  Hair Fashionic
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#C9A227] font-semibold -mt-1">
                  Lal Quarter • Krishna Nagar
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[#FAF8F5]/85 hover:text-[#C9A227] transition-colors py-2 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A227] transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={getWhatsAppBookingLink('Salon Booking')}
                onClick={(e) => {
                  e.preventDefault()
                  openBooking()
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#C9A227] text-[#0F0F10] hover:bg-[#b8911f] font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Book Now</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={getWhatsAppBookingLink('Salon Booking')}
                onClick={(e) => {
                  e.preventDefault()
                  openBooking()
                }}
                className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg bg-[#C9A227] text-[#0F0F10] font-semibold cursor-pointer"
                aria-label="Book on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-[#FAF8F5] hover:text-[#C9A227] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Sheet Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[#0F0F10]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative z-10 w-full max-w-sm ml-auto h-full bg-[#0F0F10] text-[#FAF8F5] p-6 flex flex-col justify-between shadow-2xl border-l border-[#C9A227]/20">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#FAF8F5]/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] flex items-center justify-center font-serif text-[#0F0F10] font-bold">
                    HF
                  </div>
                  <span className="font-serif text-lg text-white">Hair Fashionic</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-[#FAF8F5]/70 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleNavClick}
                    className="flex items-center justify-between text-lg font-medium text-[#FAF8F5]/90 hover:text-[#C9A227] py-3 px-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-[#C9A227]">→</span>
                  </a>
                ))}
              </nav>

              <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-[#FAF8F5]/70 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                  <span>Lal Quarter Market, Krishna Nagar, Delhi 110051 (Near Vodafone Store)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C9A227] shrink-0" />
                  <span>{SALON_INFO.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#FAF8F5]/10 space-y-3">
              <a
                href={getWhatsAppBookingLink('Salon Booking')}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick()
                  openBooking()
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] rounded-xl bg-[#C9A227] text-[#0F0F10] font-semibold text-base transition-colors cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Book on WhatsApp</span>
              </a>
              <a
                href={`tel:${SALON_INFO.rawPhone}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl border border-white/20 text-[#FAF8F5] hover:bg-white/5 text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Direct Call</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
