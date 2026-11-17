import { Star, ExternalLink, Quote, CheckCircle } from 'lucide-react'
import { REVIEWS, SALON_INFO } from '../data/salonData'
import { SectionBookingCta } from './SectionBookingCta'

export const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F0F10] text-[#C9A227] text-xs font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-[#C9A227]" />
            <span>Google Reviews</span>
          </div>
          <h2 className="section-headline font-serif font-bold text-[#0F0F10]">
            Rated 5.0 by 50 Local Clients
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#666666]">
            Unfiltered feedback from clients across Krishna Nagar, Lal Quarter, and Azad Nagar.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex text-[#C9A227]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#C9A227]" />
              ))}
            </div>
            <span className="font-bold text-[#0F0F10] text-lg">5.0 / 5.0</span>
            <span className="text-xs text-[#666666]">(50 Reviews on Google Maps)</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 sm:p-7 border border-[#0F0F10]/8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C9A227]">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A227]" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    Verified Client
                  </span>
                </div>

                <div className="relative">
                  <Quote className="w-7 h-7 text-[#0F0F10]/10 absolute -top-2 -left-2 -z-0" />
                  <p className="font-serif text-lg sm:text-xl font-bold text-[#0F0F10] leading-snug relative z-10 italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#0F0F10]/6 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#0F0F10]">
                    {review.authorHidden}
                  </p>
                  <p className="text-[#666666]">{review.role}</p>
                </div>
                <span className="text-[#666666]/80">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Read all reviews link */}
        <div className="mt-10 text-center">
          <a
            href={SALON_INFO.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0F0F10] hover:text-[#C9A227] transition-colors underline decoration-[#C9A227] decoration-2 underline-offset-4"
          >
            <span>Read all 50 reviews on Google</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Every section ends in a "Book on WhatsApp" button */}
        <SectionBookingCta
          contextName="Post-Reviews Booking"
          subtitle="Join 50+ happy Krishna Nagar clients — book in seconds"
        />
      </div>
    </section>
  )
}
