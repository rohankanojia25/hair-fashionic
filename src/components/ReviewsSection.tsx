import { Star, ExternalLink, Quote, CheckCircle } from 'lucide-react'
import { REVIEWS, SALON_INFO } from '../data/salonData'
import { SectionBookingCta } from './SectionBookingCta'

export const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="eyebrow-label block mb-3">CLIENT REVIEWS</span>
          <h2 className="section-headline font-serif text-[#0F0F10]">
            Rated 5.0 by 50 Local <span className="italic text-[#C9A227]">Clients</span>
          </h2>
          <p className="mt-3 text-[16px] md:text-[17px] leading-[1.65] text-[#666666] font-sans">
            Unfiltered feedback from clients across Krishna Nagar, Lal Quarter, and Azad Nagar.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex text-[#C9A227]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#C9A227]" />
              ))}
            </div>
            <span className="font-sans font-bold text-[#0F0F10] text-lg">5.0 / 5.0</span>
            <span className="text-xs font-sans text-[#666666]">(50 Reviews on Google Maps)</span>
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
                  <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    Verified Client
                  </span>
                </div>

                <div className="relative">
                  <Quote className="w-7 h-7 text-[#0F0F10]/10 absolute -top-2 -left-2 -z-0" />
                  <p className="font-serif text-xl sm:text-2xl text-[#0F0F10] leading-snug relative z-10 italic font-medium">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#0F0F10]/6 flex items-center justify-between text-xs font-sans">
                <div>
                  <p className="card-title text-sm text-[#0F0F10]">
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
            className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] tracking-[0.02em] text-[#0F0F10] hover:text-[#C9A227] transition-colors underline decoration-[#C9A227] decoration-2 underline-offset-4"
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
