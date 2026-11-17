# Hair Fashionic — Unisex Salon Website & Automation Suite

Official web application and WhatsApp booking engine for **Hair Fashionic**, a top-rated 5.0 unisex salon located in Lal Quarter Market, Krishna Nagar, Delhi 110051.

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![WhatsApp Business](https://img.shields.io/badge/WhatsApp-85870%2041387-25D366?style=for-the-badge&logo=whatsapp)](https://wa.me/918587041387)
[![Google Reviews](https://img.shields.io/badge/Google%20Rating-5.0%20%E2%98%85%20(50%20Reviews)-F4B400?style=for-the-badge&logo=google)](https://maps.google.com/?q=Lal+Quarter+Market,+Krishna+Nagar,+Delhi+110051)

---

## 🌟 Key Highlights

- **Conversion-Optimized Booking**: Every section and service card directs into an ergonomic booking sheet (bottom sheet on mobile, modal on desktop).
- **Interactive 4-Step Booking Workflow**:
  1. **Select Service(s)**: Multi-service selector with live duration sum & price estimation.
  2. **Select Stylist**: Book with Rahees (client favorite) or first available stylist.
  3. **Pick Date & Time**: 14-day rolling date picker with 30-minute intervals (10:00 AM – 7:30 PM).
  4. **Client Details**: Client name + Indian phone number validation (+91 10-digit check).
  - Submits clean booking details to **WhatsApp (+91 85870 41387)** and shows immediate in-app confirmation.
- **Sticky Mobile Bar**: Fixed bottom bar featuring direct **Call | WhatsApp | Directions**.
- **Mobile-First UX**: Built and tested for 375px viewport with fluid `clamp()` typography and touch targets $\ge$ 44px.
- **LocalBusiness SEO**: Rich structured data (`schema.org/HairSalon`) for Krishna Nagar & East Delhi visibility.
- **n8n Automation Suite**: 4 automated WhatsApp workflows in `/n8n` for 2-hour post-visit review requests, 21/28-day rebooking cadences, festival broadcasts, and daily 9:30 AM owner audit reports.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Luxury Design System
- **Icons**: Lucide React
- **Hosting**: Vercel (Configured via `vercel.json`)
- **Automation**: n8n workflows + Meta WhatsApp Business Cloud API / AiSensy

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Compile production build
npm run build
```

---

## 📦 Deployment to Vercel

1. Import the repository `rohankanojia25/hair-fashionic` on [Vercel](https://vercel.com/new).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Click **Deploy**.
