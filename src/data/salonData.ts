export const SALON_INFO = {
  name: 'Hair Fashionic',
  type: 'Unisex Hair & Beauty Salon',
  rating: '5.0',
  reviewCount: 50,
  ratingSummary: '5.0 on Google · 50 reviews',
  phone: '+91 85870 41387',
  rawPhone: '918587041387',
  address: 'Lal Quarter Market, Krishna Nagar, Delhi 110051',
  landmark: 'Near Vodafone Store, Lal Quarter',
  hours: '10:00 AM – 9:30 PM (Open All 7 Days)',
  googleMapsUrl: 'https://maps.google.com/?q=Lal+Quarter+Market,+Krishna+Nagar,+Delhi+110051',
  googleReviewsUrl: 'https://www.google.com/search?q=Hair+Fashionic+Krishna+Nagar+Delhi+reviews#lrd=0x0:0x0,1',
  embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.218844883906!2d77.277884!3d28.657682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb5a2b163273%3A0x6b4ef8fa59d18b2c!2sLal%20Quarter%20Market%2C%20Krishna%20Nagar%2C%20Delhi%2C%20110051!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
}

export function getWhatsAppBookingLink(service = '[SERVICE]', day = '[DAY]', stylist?: string) {
  let text = ''
  if (stylist) {
    text = `Hi Hair Fashionic, I'd like to book an appointment with ${stylist} on ${day}. My name is ...`
  } else if (service) {
    text = `Hi Hair Fashionic, I'd like to book ${service} on ${day}. My name is ...`
  } else {
    text = `Hi Hair Fashionic, I'd like to book an appointment on [DAY]. My name is ...`
  }
  return `https://wa.me/${SALON_INFO.rawPhone}?text=${encodeURIComponent(text)}`
}

export interface ServiceItem {
  id: string
  name: string
  duration: string
  price: string
  isPlaceholderPrice: boolean
  description: string
  tag?: string
}

export interface ServiceCategory {
  id: string
  name: string
  description: string
  items: ServiceItem[]
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'hair',
    name: 'Hair',
    description: 'Precision haircuts and customized styling for men & women',
    items: [
      {
        id: 'haircut',
        name: 'Haircut (Style & Finish)',
        duration: '30-45 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Personalized haircut with consultation, scalp wash, and finishing blow-dry style.',
        tag: 'Popular',
      },
      {
        id: 'shampoo-cond',
        name: 'Shampoo & Conditioning',
        duration: '20 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Clarifying rinse followed by professional salon moisture-infusing conditioner.',
      },
      {
        id: 'blowdry-style',
        name: 'Blowdry & Hot Styling',
        duration: '35 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Glamorous blowouts, soft waves, or sleek straight ironing for any occasion.',
      },
    ],
  },
  {
    id: 'colour',
    name: 'Colour',
    description: 'Premium ammonia-safe hair coloring, highlights, and grey coverage',
    items: [
      {
        id: 'global-colour',
        name: 'Global Colour',
        duration: '90-120 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Complete roots-to-ends high-gloss uniform colour transformation with shade matching.',
        tag: 'Trending',
      },
      {
        id: 'highlights',
        name: 'Highlights & Balayage',
        duration: '120-150 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Dimension-rich streaks, ombre, or hand-painted sun-kissed balayage foils.',
        tag: 'Specialist',
      },
      {
        id: 'root-touchup',
        name: 'Root Touch-Up',
        duration: '60 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Seamless grey coverage and color refreshing for hairline and crown regrowth.',
      },
    ],
  },
  {
    id: 'treatments',
    name: 'Treatments',
    description: 'Deep restorative hair therapies for frizz, damage, and shine',
    items: [
      {
        id: 'hair-spa',
        name: 'Hair Spa (Nourishing)',
        duration: '45-60 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Intense steam therapy, deep massage, and nutrient masque to revitalize dry locks.',
        tag: 'Most Loved',
      },
      {
        id: 'keratin-smoothening',
        name: 'Keratin / Smoothening',
        duration: '150-180 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Long-lasting frizz defense and mirror-like silky smooth manageability.',
        tag: 'Transformation',
      },
      {
        id: 'scalp-detox',
        name: 'Deep Scalp Detox Therapy',
        duration: '45 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Dandruff control and active micro-circulation treatment for healthy follicle growth.',
      },
    ],
  },
  {
    id: 'grooming',
    name: 'Grooming',
    description: 'Sharp beard designs, clean shaves, and grooming essentials',
    items: [
      {
        id: 'beard-styling',
        name: 'Beard Styling & Trimming',
        duration: '20-30 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Sharp razor lines, fade gradients, and beard oil nourishment tailored to face shape.',
        tag: 'Signature',
      },
      {
        id: 'royal-shave',
        name: 'Royal Hot Towel Shave',
        duration: '25 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Traditional hot steam towel, antiseptic lather, and ultra-close clean finish.',
      },
      {
        id: 'full-grooming',
        name: "Men's Complete Grooming Ritual",
        duration: '60 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Haircut + beard reshape + cleansing scrub combo for a fresh, confident look.',
      },
    ],
  },
  {
    id: 'skin',
    name: 'Skin',
    description: 'Refreshing facials, deep clean-ups, and natural skin glow rituals',
    items: [
      {
        id: 'facial',
        name: 'Facial (Gold / Glow)',
        duration: '60 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Multi-step skin rejuvenation with steam, extraction, relaxing face massage, and pack.',
        tag: 'Glow',
      },
      {
        id: 'clean-up',
        name: 'Clean-up (Deep Cleansing)',
        duration: '40 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Rapid pore unclogging, blackhead removal, scrub, and soothing face pack.',
      },
      {
        id: 'detan-ritual',
        name: 'De-Tan Skin Ritual',
        duration: '30 mins',
        price: 'from Rs [PRICE]',
        isPlaceholderPrice: true,
        description: 'Gentle tan removal brightening pack formulated for Indian skin and climate.',
      },
    ],
  },
]

export interface ReviewItem {
  id: string
  quote: string
  authorHidden: string
  role: string
  stars: number
  date: string
}

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    quote: 'All time best salon, kudos to Rahees, great hair artist',
    authorHidden: 'A*** K***',
    role: 'Local Krishna Nagar Resident',
    stars: 5,
    date: 'Recent Google Review',
  },
  {
    id: 'rev-2',
    quote: 'Excellent service & humble staff!',
    authorHidden: 'M*** S***',
    role: 'Verified Google Reviewer',
    stars: 5,
    date: 'Recent Google Review',
  },
  {
    id: 'rev-3',
    quote: 'Good staff, do their work professionally',
    authorHidden: 'V*** R***',
    role: 'Verified Google Reviewer',
    stars: 5,
    date: 'Recent Google Review',
  },
  {
    id: 'rev-4',
    quote: 'Hairstylists are the best in the area',
    authorHidden: 'P*** G***',
    role: 'Verified Google Reviewer',
    stars: 5,
    date: 'Recent Google Review',
  },
]

export interface GalleryItem {
  id: string
  title: string
  category: string
  imageUrl: string
  aspectRatio: string
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Precision Fade & Texture Crop',
    category: 'Haircut',
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fm=webp&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'gal-2',
    title: 'Rich Caramel Global Colour & Waves',
    category: 'Colour',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fm=webp&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'gal-3',
    title: 'Smooth Keratin Therapy Finish',
    category: 'Treatments',
    imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fm=webp&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'gal-4',
    title: 'Clean Beard Gradient & Styling',
    category: 'Grooming',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fm=webp&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'gal-5',
    title: 'Voluminous Blowdry & Layers',
    category: 'Haircut',
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fm=webp&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-square',
  },
  {
    id: 'gal-6',
    title: 'Rejuvenating Hair Spa & Scalp Wash',
    category: 'Treatments',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fm=webp&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-square',
  },
]
