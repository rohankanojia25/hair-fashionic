import { MapPin, Clock, Phone, Navigation, ExternalLink } from 'lucide-react'
import { SALON_INFO } from '../data/salonData'
import { SectionReveal, RevealItem } from './SectionReveal'

export const VisitUsSection = () => {
  return (
    <section id="visit-us" className="py-14 md:py-24 bg-[#FAF8F5] overflow-hidden">
      <SectionReveal className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <RevealItem className="text-center max-w-3xl mx-auto mb-6">
          <span className="eyebrow-label block mb-2">VISIT OUR SALON</span>
          <h2 className="section-headline font-serif text-[#0F0F10]">
            Visit Us in <span className="italic text-[#C9A227]">Lal Quarter</span> Market
          </h2>
          <p className="mt-2 text-[15px] sm:text-[16px] md:text-[17px] text-[#666666] font-sans">
            Conveniently situated in the heart of Krishna Nagar, East Delhi.
          </p>
        </RevealItem>

        {/* Mobile First: "Open in Google Maps" Button Prominent at Top (<1024px) */}
        <RevealItem className="block lg:hidden mb-5">
          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] rounded-xl bg-[#0F0F10] text-[#FAF8F5] border border-[#C9A227]/40 font-sans font-bold text-[15px] tracking-[0.02em] shadow-md btn-gold-shine active:scale-[0.97]"
          >
            <Navigation className="w-5 h-5 text-[#C9A227]" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-4 h-4 text-[#C9A227]" />
          </a>
        </RevealItem>

        <RevealItem>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#0F0F10]/10 shadow-sm space-y-5">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0F0F10] text-[#C9A227] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="card-title text-base text-[#0F0F10]">
                      Address & Landmark
                    </h3>
                    <p className="text-sm font-sans text-[#1E1E1E] mt-0.5 font-medium">
                      {SALON_INFO.address}
                    </p>
                    <p className="text-xs font-sans text-[#C9A227] mt-0.5 font-semibold">
                      Landmark: {SALON_INFO.landmark}
                    </p>
                  </div>
                </div>

                {/* Hours (No placeholder tag) */}
                <div className="flex items-start gap-3.5 pt-4 border-t border-[#0F0F10]/8">
                  <div className="w-10 h-10 rounded-xl bg-[#0F0F10] text-[#C9A227] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="card-title text-base text-[#0F0F10]">
                      Opening Hours
                    </h3>
                    <p className="text-sm font-sans font-semibold text-[#0F0F10] mt-0.5">
                      {SALON_INFO.hours}
                    </p>
                  </div>
                </div>

                {/* Direct Call */}
                <div className="flex items-start gap-3.5 pt-4 border-t border-[#0F0F10]/8">
                  <div className="w-10 h-10 rounded-xl bg-[#0F0F10] text-[#C9A227] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="card-title text-base text-[#0F0F10]">
                      Contact
                    </h3>
                    <a
                      href={`tel:${SALON_INFO.rawPhone}`}
                      className="text-sm sm:text-base font-sans font-bold text-[#0F0F10] hover:text-[#C9A227] block mt-0.5"
                    >
                      {SALON_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden lg:flex gap-3 pt-4 border-t border-[#0F0F10]/8">
                  <a
                    href={SALON_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] rounded-xl bg-[#0F0F10] text-white hover:bg-[#252528] font-sans font-semibold text-[15px] tracking-[0.02em] transition-colors shadow-sm btn-gold-shine"
                  >
                    <Navigation className="w-4 h-4 text-[#C9A227]" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={`tel:${SALON_INFO.rawPhone}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] rounded-xl border border-[#0F0F10]/20 hover:border-[#0F0F10] text-[#0F0F10] font-sans font-semibold text-[15px] tracking-[0.02em] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Salon</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Static Map Image (No live embed to save weight and prevent touch interception) */}
            <div className="lg:col-span-7">
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-2xl p-2.5 sm:p-3 border border-[#0F0F10]/10 shadow-sm overflow-hidden group cursor-pointer"
                aria-label="Open location in Google Maps"
              >
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#E8ECEF] flex flex-col items-center justify-center p-4 text-center">
                  {/* Street grid pattern */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10]/25 via-transparent to-transparent pointer-events-none"></div>

                  {/* Centered Map Pin Card */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F0F10] text-[#C9A227] flex items-center justify-center shadow-lg border-2 border-[#C9A227] mb-2 group-hover:scale-105 transition-transform">
                      <MapPin className="w-6 h-6 fill-[#C9A227]/20" />
                    </div>
                    <h4 className="card-title text-base sm:text-lg text-[#0F0F10] font-bold">
                      Hair Fashionic
                    </h4>
                    <p className="text-xs font-sans text-[#666666] mt-0.5 max-w-xs">
                      Lal Quarter Market, Krishna Nagar, Delhi 110051
                    </p>

                    <span className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F0F10] text-[#FAF8F5] text-xs font-sans font-semibold shadow-md group-hover:bg-[#C9A227] group-hover:text-[#0F0F10] transition-colors">
                      <Navigation className="w-3.5 h-3.5 text-[#C9A227] group-hover:text-[#0F0F10]" />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>

                  {/* Top-left landmark badge */}
                  <div className="absolute top-3 left-3 bg-[#0F0F10]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-sans font-semibold border border-[#C9A227]/30 shadow-sm flex items-center gap-1 pointer-events-none">
                    <MapPin className="w-3 h-3 text-[#C9A227]" />
                    <span>Lal Quarter, Delhi 110051</span>
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between text-xs font-sans text-[#666666]">
                  <span>Near Vodafone Store, Lal Quarter</span>
                  <span className="text-[#C9A227] font-semibold flex items-center gap-1">
                    Tap map for directions →
                  </span>
                </div>
              </a>
            </div>
          </div>
        </RevealItem>
      </SectionReveal>
    </section>
  )
}
