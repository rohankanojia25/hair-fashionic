import { useState } from 'react'
import { MapPin, Clock, Phone, MessageCircle, Navigation, ExternalLink, Map as MapIcon } from 'lucide-react'
import { SALON_INFO, getWhatsAppBookingLink } from '../data/salonData'
import { SectionBookingCta } from './SectionBookingCta'
import { useBooking } from '../context/BookingContext'
import { SectionReveal, RevealItem } from './SectionReveal'

export const VisitUsSection = () => {
  const { openBooking } = useBooking()
  const [showLiveMap, setShowLiveMap] = useState(false)

  return (
    <section id="visit-us" className="py-16 md:py-24 bg-[#FAF8F5] overflow-hidden">
      <SectionReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <RevealItem className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <span className="eyebrow-label block mb-3">VISIT OUR SALON</span>
          <h2 className="section-headline font-serif text-[#0F0F10]">
            Visit Us in <span className="italic text-[#C9A227]">Lal Quarter</span> Market
          </h2>
          <p className="mt-3 text-[16px] md:text-[17px] leading-[1.65] text-[#666666] font-sans">
            Conveniently situated in the heart of Krishna Nagar, East Delhi. Walk-ins and WhatsApp bookings welcome.
          </p>
        </RevealItem>

        {/* Mobile First: "Open in Google Maps" Button Prominent at the Top (<1024px) */}
        <RevealItem className="block lg:hidden mb-6">
          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 min-h-[48px] rounded-xl bg-[#0F0F10] text-[#FAF8F5] border border-[#C9A227]/40 font-sans font-bold text-[15px] tracking-[0.02em] shadow-lg btn-gold-shine active:scale-[0.97]"
          >
            <Navigation className="w-5 h-5 text-[#C9A227]" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-4 h-4 text-[#C9A227]" />
          </a>
        </RevealItem>

        <RevealItem>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#0F0F10]/10 shadow-sm space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#0F0F10] text-[#C9A227] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="card-title text-[#0F0F10]">
                      Address & Landmark
                    </h3>
                    <p className="text-sm font-sans text-[#1E1E1E] mt-1 font-medium">
                      {SALON_INFO.address}
                    </p>
                    <p className="text-xs font-sans text-[#C9A227] mt-0.5 font-semibold">
                      Landmark: {SALON_INFO.landmark}
                    </p>
                    <p className="text-xs font-sans text-[#666666] mt-1">
                      Serving Krishna Nagar, Lal Quarter, Azad Nagar & surrounding East Delhi areas.
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 pt-6 border-t border-[#0F0F10]/8">
                  <div className="w-11 h-11 rounded-xl bg-[#0F0F10] text-[#C9A227] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="card-title text-[#0F0F10]">
                        Opening Hours
                      </h3>
                      <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-mono">
                        [PLACEHOLDER]
                      </span>
                    </div>
                    <p className="text-sm font-sans font-semibold text-[#0F0F10] mt-1">
                      10:00 AM – 9:30 PM
                    </p>
                    <p className="text-xs font-sans text-[#666666] mt-0.5">
                      Open All 7 Days a week (including Sundays)
                    </p>
                  </div>
                </div>

                {/* Direct Call & WhatsApp */}
                <div className="flex items-start gap-4 pt-6 border-t border-[#0F0F10]/8">
                  <div className="w-11 h-11 rounded-xl bg-[#0F0F10] text-[#C9A227] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="card-title text-[#0F0F10]">
                      Contact & Appointments
                    </h3>
                    <a
                      href={`tel:${SALON_INFO.rawPhone}`}
                      className="text-sm sm:text-base font-sans font-bold text-[#0F0F10] hover:text-[#C9A227] block mt-1"
                    >
                      {SALON_INFO.phone}
                    </a>
                    <p className="text-xs font-sans text-[#666666] mt-0.5">
                      Fastest responses directly on WhatsApp.
                    </p>
                  </div>
                </div>

                {/* Desktop Buttons: Get Directions & Call (1024px+ exactly as before) */}
                <div className="pt-6 border-t border-[#0F0F10]/8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={SALON_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl bg-[#0F0F10] text-white hover:bg-[#252528] font-sans font-semibold text-[15px] tracking-[0.02em] transition-colors shadow-sm btn-gold-shine"
                  >
                    <Navigation className="w-4 h-4 text-[#C9A227]" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={`tel:${SALON_INFO.rawPhone}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl border border-[#0F0F10]/20 hover:border-[#0F0F10] text-[#0F0F10] font-sans font-semibold text-[15px] tracking-[0.02em] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Salon</span>
                  </a>
                </div>

                {/* Direct WhatsApp button */}
                <a
                  href={getWhatsAppBookingLink('Directions & Visit')}
                  onClick={(e) => {
                    e.preventDefault()
                    openBooking()
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-[#C9A227] text-[#0F0F10] hover:bg-[#b8911f] font-sans font-semibold text-[15px] tracking-[0.02em] transition-colors cursor-pointer btn-gold-shine"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Map Container: Static Map placeholder that loads embed only when tapped */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#0F0F10]/10 shadow-sm overflow-hidden">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#FAF8F5]">
                  {showLiveMap ? (
                    <iframe
                      title="Hair Fashionic Salon Map Location"
                      src="https://maps.google.com/maps?q=Lal%20Quarter%20Market,%20Krishna%20Nagar,%20Delhi%20110051&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0"
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  ) : (
                    /* Static Map Preview Image (Loads embed only when tapped) */
                    <div
                      onClick={() => setShowLiveMap(true)}
                      className="w-full h-full relative cursor-pointer group bg-[#E8ECEF] flex flex-col items-center justify-center p-6 text-center select-none"
                    >
                      {/* Stylized geometric background representing street grid */}
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10]/20 via-transparent to-transparent pointer-events-none"></div>

                      {/* Map Landmark Pin Graphic */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-2xl bg-[#0F0F10] text-[#C9A227] flex items-center justify-center shadow-2xl border-2 border-[#C9A227] mb-3 group-hover:scale-105 transition-transform">
                          <MapPin className="w-7 h-7 fill-[#C9A227]/20" />
                        </div>
                        <h4 className="card-title text-base sm:text-lg text-[#0F0F10] font-bold">
                          Hair Fashionic
                        </h4>
                        <p className="text-xs font-sans text-[#666666] mt-0.5 max-w-xs">
                          Lal Quarter Market, Near Vodafone Store, Krishna Nagar, Delhi 110051
                        </p>

                        {/* Interactive Tap Prompt Button (Min 48px tap target) */}
                        <button
                          type="button"
                          className="mt-4 min-h-[48px] px-5 py-3 rounded-xl bg-[#0F0F10] text-[#FAF8F5] border border-[#C9A227]/40 text-xs sm:text-sm font-sans font-semibold inline-flex items-center gap-2 shadow-lg group-hover:bg-[#C9A227] group-hover:text-[#0F0F10] transition-colors"
                        >
                          <MapIcon className="w-4 h-4 text-[#C9A227] group-hover:text-[#0F0F10]" />
                          <span>Tap to load interactive map</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Overlaid quick badge */}
                  <div className="absolute top-3 left-3 bg-[#0F0F10]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-sans font-semibold border border-[#C9A227]/30 shadow-md flex items-center gap-1.5 pointer-events-none">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>Lal Quarter Market, Delhi 110051</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#666666]">
                  <span>Near Vodafone Store, Lal Quarter Market, Krishna Nagar</span>
                  <a
                    href={SALON_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans font-semibold text-[#0F0F10] hover:text-[#C9A227] min-h-[48px] py-2"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </RevealItem>

        {/* Every section ends in a "Book on WhatsApp" button */}
        <RevealItem>
          <SectionBookingCta
            contextName="Location Inquiry"
            subtitle="Visiting today? Check wait-time and let our stylists know you're on the way"
          />
        </RevealItem>
      </SectionReveal>
    </section>
  )
}
