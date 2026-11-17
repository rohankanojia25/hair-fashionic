import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Clock, ArrowRight } from 'lucide-react'
import { SERVICE_CATEGORIES, getWhatsAppBookingLink } from '../data/salonData'
import { useBooking } from '../context/BookingContext'
import { SectionReveal, RevealItem } from './SectionReveal'

export const ServicesSection = () => {
  const { openBooking } = useBooking()
  const [activeTab, setActiveTab] = useState('hair')

  const currentCategory = SERVICE_CATEGORIES.find((cat) => cat.id === activeTab) || SERVICE_CATEGORIES[0]

  return (
    <section id="services" className="py-14 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionReveal>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <RevealItem>
              <span className="eyebrow-label block mb-2">OUR SERVICES</span>
            </RevealItem>
            <RevealItem>
              <h2 className="section-headline font-serif text-[#0F0F10]">
                Crafted for Your <span className="italic text-[#C9A227]">Individual Style</span>
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-2 text-[15px] sm:text-[16px] md:text-[17px] text-[#666666] font-sans">
                Executed with premium salon formulations and sanitized instruments.
              </p>
            </RevealItem>
          </div>

          {/* Category Chips: Horizontal swipe row on mobile, centered tabs on desktop */}
          <RevealItem>
            <div className="flex items-center overflow-x-auto no-scrollbar gap-2 px-5 -mx-5 sm:mx-0 sm:px-0 sm:justify-center pb-2">
              {SERVICE_CATEGORIES.map((cat) => {
                const isActive = activeTab === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveTab(cat.id)}
                    className={`relative min-h-[44px] px-4 sm:px-5 py-2 rounded-full font-sans font-semibold text-xs sm:text-sm tracking-[0.02em] transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-[#C9A227]'
                        : 'text-[#1E1E1E] hover:text-[#0F0F10] bg-white border border-[#0F0F10]/15'
                    }`}
                    aria-pressed={isActive}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 rounded-full bg-[#0F0F10] shadow-sm border border-[#0F0F10] -z-0"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat.name}</span>
                  </button>
                )
              })}
            </div>
          </RevealItem>

          {/* Tab Description (one line max) */}
          <RevealItem>
            <div className="text-center my-3 sm:my-5">
              <p className="text-xs sm:text-sm font-sans text-[#666666]">
                {currentCategory.description}
              </p>
            </div>
          </RevealItem>

          {/* Services Cards: Swipe row with scroll-snap and peek on mobile (12px gap), grid on desktop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 px-5 -mx-5 pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:mx-0"
            >
              {currentCategory.items.map((service) => {
                const bookingUrl = getWhatsAppBookingLink(service.name)

                return (
                  <motion.div
                    key={service.id}
                    whileHover={{
                      y: -3,
                      borderColor: 'rgba(201, 162, 39, 0.45)',
                      boxShadow: '0 10px 25px -4px rgba(201, 162, 39, 0.12)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openBooking({ serviceName: service.name })}
                    className="w-[82vw] max-w-[310px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink bg-white rounded-xl p-4 sm:p-6 border border-[#0F0F10]/10 shadow-sm transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="card-title text-base sm:text-lg text-[#0F0F10] group-hover:text-[#C9A227] transition-colors">
                          {service.name}
                        </h3>
                        {service.tag && (
                          <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-sans font-bold bg-[#FAF8F5] text-[#C9A227] border border-[#C9A227]/30">
                            {service.tag}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-3 font-sans line-clamp-2 md:line-clamp-none">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#0F0F10]/8 flex items-center justify-between text-xs font-sans">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[#666666]">
                          <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                          <span>{service.duration}</span>
                        </div>
                        <span className="font-semibold text-[#0F0F10]">
                          {service.price}
                        </span>
                      </div>

                      {/* Small "Book →" link instead of big button */}
                      <a
                        href={bookingUrl}
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          openBooking({ serviceName: service.name })
                        }}
                        className="inline-flex items-center gap-1 font-sans font-bold text-xs text-[#0F0F10] group-hover:text-[#C9A227] transition-colors py-1 pl-2"
                        aria-label={`Book ${service.name}`}
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C9A227] group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </SectionReveal>
      </div>
    </section>
  )
}
