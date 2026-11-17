import { Users, Sparkles, MapPin, Award } from 'lucide-react'
import { SectionReveal, RevealItem } from './SectionReveal'

export const TrustStrip = () => {
  const trustItems = [
    {
      icon: <Award className="w-5 h-5 text-[#C9A227]" />,
      title: 'Trained & Patient Staff',
      subtitle: 'Attentive, customized service',
    },
    {
      icon: <Users className="w-5 h-5 text-[#C9A227]" />,
      title: 'Unisex Hair & Beauty',
      subtitle: 'Complete styling for all',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#C9A227]" />,
      title: 'Hygienic Tools',
      subtitle: 'Sanitized blades & single-use capes',
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#C9A227]" />,
      title: 'Prime Location',
      subtitle: 'Near Vodafone store, Lal Quarter',
    },
  ]

  return (
    <section className="relative bg-[#FAF8F5] border-y border-[#0F0F10]/10 py-12 md:py-16 overflow-hidden">
      <SectionReveal className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Eyebrow Label */}
        <RevealItem className="text-center mb-6">
          <span className="eyebrow-label">WHY CLIENTS CHOOSE US</span>
        </RevealItem>

        {/* Trust Badges Grid (12px gap on phones) */}
        <RevealItem>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {trustItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-white border border-[#0F0F10]/8 shadow-sm flex flex-col justify-between"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0F0F10] flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <div>
                  <h3 className="card-title text-sm sm:text-base text-[#0F0F10] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] mt-0.5 font-sans">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RevealItem>
      </SectionReveal>
    </section>
  )
}
