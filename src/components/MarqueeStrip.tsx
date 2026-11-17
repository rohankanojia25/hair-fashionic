export const MarqueeStrip = () => {
  const marqueeItems = [
    'Haircut',
    'Hair Spa',
    'Global Colour',
    'Highlights',
    'Keratin',
    'Beard Styling',
    'Facial',
  ]

  // Repeat items for seamless continuous infinite scroll
  const repeatedText = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <div className="relative w-full overflow-hidden bg-[#C9A227] text-[#0F0F10] py-3 border-y border-[#b8911f] shadow-sm select-none group">
      <div className="animate-marquee-track gap-6 font-sans font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase">
        {repeatedText.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-6">
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F10]/50 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
