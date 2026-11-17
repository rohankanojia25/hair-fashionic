import { Star, MessageCircle, ArrowDown, Scissors, ShieldCheck, MapPin } from 'lucide-react'
import { getWhatsAppBookingLink } from '../data/salonData'
import { SectionBookingCta } from './SectionBookingCta'
import { useBooking } from '../context/BookingContext'

export const Hero = () => {
  const { openBooking } = useBooking()

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#0F0F10] text-[#FAF8F5] overflow-hidden">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#C9A227]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#C9A227]/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Top Eyebrow & Social Proof Pill */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="eyebrow-label">KRISHNA NAGAR, DELHI</span>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C9A227]/30 text-xs font-sans font-medium backdrop-blur-md">
                <div className="flex items-center text-[#C9A227]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C9A227] text-[#C9A227]" />
                  ))}
                </div>
                <span className="text-[#C9A227] font-semibold">5.0 Star Rated</span>
                <span className="text-white/40">•</span>
                <span className="text-[#CFCAC2]">50 Google Reviews</span>
              </div>
            </div>

            {/* Headline with clamp() and italic 5.0 */}
            <h1 className="hero-headline font-serif font-semibold text-white tracking-tight">
              Rated <span className="italic text-[#C9A227]">5.0</span> by 50 clients in Krishna Nagar
            </h1>

            {/* Subline */}
            <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#CFCAC2] max-w-2xl font-sans">
              Haircuts, colour, hair spa and grooming by trained stylists in Lal Quarter Market.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <a
                href={getWhatsAppBookingLink('Haircut & Styling')}
                onClick={(e) => {
                  e.preventDefault()
                  openBooking({ serviceName: 'Haircut (Style & Finish)' })
                }}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 min-h-[48px] rounded-xl bg-[#C9A227] text-[#0F0F10] hover:bg-[#b8911f] font-sans font-semibold text-[15px] tracking-[0.02em] transition-all duration-200 shadow-lg shadow-[#C9A227]/10 active:scale-[0.98] text-center cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Book on WhatsApp</span>
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 min-h-[48px] rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-[#FAF8F5] font-sans font-semibold text-[15px] tracking-[0.02em] transition-colors text-center"
              >
                <Scissors className="w-4 h-4 text-[#C9A227]" />
                <span>See Services</span>
                <ArrowDown className="w-4 h-4 text-white/60" />
              </a>
            </div>

            {/* Quick trust reassurance bullets */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#CFCAC2]/80 font-sans">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                Sanitized & single-use capes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C9A227]" />
                Near Vodafone Store, Lal Quarter
              </span>
            </div>
          </div>

          {/* Hero Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#C9A227]/40 via-transparent to-[#C9A227]/20 blur-sm"></div>

              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden bg-[#1E1E22] border border-[#C9A227]/30 shadow-2xl">
                {/* Visual Image with fallback */}
                <div className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-[#2A2A30] to-[#0F0F10]">
                  <img
                    src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80"
                    alt="Hair Fashionic Salon Interior and Styling Experience"
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-transparent to-transparent opacity-80"></div>

                  {/* Placeholder Banner Badge */}
                  <div className="absolute top-4 right-4 bg-[#0F0F10]/85 backdrop-blur-md border border-[#C9A227]/40 text-[#C9A227] px-3 py-1.5 rounded-lg text-xs font-sans font-semibold tracking-wide shadow-md">
                    [SALON PHOTO]
                  </div>

                  {/* Floating Salon Info Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0F0F10]/90 backdrop-blur-md border border-white/10 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="eyebrow-label text-[11px]">
                          Lal Quarter Market
                        </div>
                        <h3 className="card-title text-white mt-0.5">
                          Hair Fashionic Experience
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end text-[#C9A227]">
                          <Star className="w-4 h-4 fill-[#C9A227]" />
                          <span className="font-sans font-bold text-sm text-white">5.0</span>
                        </div>
                        <span className="text-[11px] font-sans text-[#CFCAC2]">50+ happy locals</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Every section ends in a "Book on WhatsApp" button */}
        <div className="mt-12">
          <SectionBookingCta
            contextName="First Time Visit"
            subtitle="Book your preferred slot on WhatsApp now — fast, personal confirmation"
          />
        </div>
      </div>
    </section>
  )
}
