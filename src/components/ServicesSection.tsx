import { useState } from 'react'
import { Clock, MessageCircle, AlertCircle, Scissors } from 'lucide-react'
import { SERVICE_CATEGORIES, getWhatsAppBookingLink } from '../data/salonData'
import { SectionBookingCta } from './SectionBookingCta'
import { useBooking } from '../context/BookingContext'

export const ServicesSection = () => {
  const { openBooking } = useBooking()
  const [activeTab, setActiveTab] = useState('hair')

  const currentCategory = SERVICE_CATEGORIES.find((cat) => cat.id === activeTab) || SERVICE_CATEGORIES[0]

  return (
    <section id="services" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F0F10] text-[#C9A227] text-xs font-semibold uppercase tracking-wider mb-3">
            <Scissors className="w-3.5 h-3.5" />
            <span>Salon Menu & Pricing</span>
          </div>
          <h2 className="section-headline font-serif font-bold text-[#0F0F10]">
            Crafted for Your Individual Style
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#666666]">
            Every service is executed with premium salon formulations and sanitized instruments.
          </p>

          {/* Owner confirmation disclaimer notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left sm:text-center">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              Prices shown as [PRICE] [PLACEHOLDER] — confirm exact service packages & seasonal offers directly on WhatsApp.
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 scrollbar-none">
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`min-h-[44px] px-5 py-2.5 rounded-full text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0F0F10] text-[#C9A227] shadow-md border border-[#0F0F10]'
                    : 'bg-white text-[#1E1E1E] hover:bg-[#FAF8F5] border border-[#0F0F10]/15'
                }`}
                aria-pressed={isActive}
              >
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Tab Description */}
        <div className="text-center my-6">
          <p className="text-sm font-medium text-[#666666]">
            {currentCategory.description}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.items.map((service) => {
            const bookingUrl = getWhatsAppBookingLink(service.name)

            return (
              <div
                key={service.id}
                className="bg-white rounded-xl p-6 border border-[#0F0F10]/8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl font-bold text-[#0F0F10] group-hover:text-[#C9A227] transition-colors">
                      {service.name}
                    </h3>
                    {service.tag && (
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF8F5] text-[#C9A227] border border-[#C9A227]/30">
                        {service.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#666666] leading-relaxed mb-4 font-sans">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-[#1E1E1E]/80 mb-5 pb-4 border-b border-[#0F0F10]/8">
                    <div className="flex items-center gap-1.5 text-[#666666]">
                      <Clock className="w-4 h-4 text-[#C9A227]" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="font-semibold text-[#0F0F10]">
                      {service.price}{' '}
                      <span className="text-[10px] text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded font-normal">
                        [PLACEHOLDER]
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pre-filled WhatsApp Button for this specific service */}
                <a
                  href={bookingUrl}
                  onClick={(e) => {
                    e.preventDefault()
                    openBooking({ serviceName: service.name })
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 min-h-[44px] rounded-xl bg-[#0F0F10] hover:bg-[#252528] text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                  aria-label={`Book ${service.name} on WhatsApp`}
                >
                  <MessageCircle className="w-4 h-4 text-[#C9A227]" />
                  <span>Book on WhatsApp</span>
                </a>
              </div>
            )
          })}
        </div>

        {/* Quick summary strip of all requested staple services */}
        <div className="mt-12 p-6 rounded-xl bg-white border border-[#0F0F10]/10 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-[#0F0F10]">
                Looking for a package or custom service combo?
              </h4>
              <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
                We handle Haircuts, Global Colour, Hair Spa, Keratin/Smoothening, Beard Styling, Facials & Clean-ups daily.
              </p>
            </div>
            <a
              href={getWhatsAppBookingLink('Custom Package Consultation')}
              onClick={(e) => {
                e.preventDefault()
                openBooking({ serviceName: 'Custom Package Consultation' })
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-[44px] rounded-xl bg-[#C9A227] text-[#0F0F10] hover:bg-[#b8911f] font-semibold text-sm transition-colors shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Ask Price on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Every section ends in a "Book on WhatsApp" button */}
        <SectionBookingCta
          contextName={currentCategory.name + ' Service'}
          subtitle="Tell us your hair or skin goal and preferred time"
        />
      </div>
    </section>
  )
}
