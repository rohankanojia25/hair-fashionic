import { MapPin, Phone, MessageCircle, Star } from 'lucide-react'
import { SALON_INFO, getWhatsAppBookingLink } from '../data/salonData'
import { useBooking } from '../context/BookingContext'

export const Footer = () => {
  const { openBooking } = useBooking()
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: 'Hair Fashionic',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    telephone: SALON_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lal Quarter Market, Near Vodafone Store',
      addressLocality: 'Krishna Nagar',
      addressRegion: 'Delhi',
      postalCode: '110051',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6576,
      longitude: 77.2801,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '21:30',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: ['Krishna Nagar', 'Lal Quarter', 'Azad Nagar', 'East Delhi'],
  }

  return (
    <footer className="bg-[#0F0F10] text-[#FAF8F5] pt-16 pb-28 md:pb-16 border-t border-[#C9A227]/20 font-sans">
      {/* Inject LocalBusiness JSON-LD for Search Engines and crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] flex items-center justify-center font-serif text-[#0F0F10] font-bold text-xl border border-[#C9A227]">
                HF
              </div>
              <div>
                <span className="font-serif text-2xl font-semibold tracking-tight text-white block">
                  Hair Fashionic
                </span>
                <span className="eyebrow-label text-[10px] text-[#C9A227]">
                  Unisex Salon • Krishna Nagar
                </span>
              </div>
            </div>

            <p className="text-sm text-[#CFCAC2] max-w-sm font-sans leading-relaxed">
              East Delhi’s trusted destination for precision haircuts, rich hair colours, nourishing spas, and complete grooming. Rated 5.0 by 50 real local clients.
            </p>

            <div className="flex items-center gap-2 pt-1 font-sans">
              <div className="flex text-[#C9A227]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A227]" />
                ))}
              </div>
              <span className="text-xs text-[#CFCAC2] font-medium">5.0 Star Rating on Google</span>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="eyebrow-label text-xs">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#CFCAC2]">
              <li>
                <a href="#services" className="hover:text-[#C9A227] transition-colors py-1 inline-block">
                  Services & Pricing
                </a>
              </li>
              <li>
                <a href="#stylist" className="hover:text-[#C9A227] transition-colors py-1 inline-block">
                  Meet Rahees (Master Stylist)
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#C9A227] transition-colors py-1 inline-block">
                  Client Google Reviews
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C9A227] transition-colors py-1 inline-block">
                  Client Transformations Gallery
                </a>
              </li>
              <li>
                <a href="#visit-us" className="hover:text-[#C9A227] transition-colors py-1 inline-block">
                  Location & Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="eyebrow-label text-xs">
              Visit or Book
            </h4>
            <div className="space-y-2 text-sm text-[#CFCAC2]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-1" />
                <span>
                  Lal Quarter Market, Krishna Nagar, Delhi 110051 (Near Vodafone Store)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0" />
                <a href={`tel:${SALON_INFO.rawPhone}`} className="hover:text-[#C9A227] transition-colors">
                  {SALON_INFO.phone}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppBookingLink('Footer Inquiry')}
                onClick={(e) => {
                  e.preventDefault()
                  openBooking()
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-[#C9A227] text-[#0F0F10] hover:bg-[#b8911f] font-sans font-semibold text-[15px] tracking-[0.02em] transition-colors shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Book on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CFCAC2]/70 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Hair Fashionic. All rights reserved. Lal Quarter Market, Krishna Nagar, Delhi 110051.
          </p>
          <p className="flex items-center justify-center gap-1">
            <span>Crafted for Krishna Nagar & Azad Nagar</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
