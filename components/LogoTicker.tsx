const businesses = [
  "Newport Beach Spa",
  "Orange County Dental",
  "Huntington Fitness",
  "Seal Beach Auto",
  "Long Beach Roofing",
  "Irvine Med Spa",
  "Anaheim Pet Care",
  "Costa Mesa Legal",
  "Laguna Hills Salon",
  "Garden Grove HVAC",
  "Fullerton Chiro",
  "Brea Landscaping",
];

export default function LogoTicker() {
  // Duplicate for seamless loop
  const items = [...businesses, ...businesses];

  return (
    <section className="py-14 border-b border-[#111111] overflow-hidden">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/20 mb-8">
        Trusted by local businesses across Southern California
      </p>
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap">
          {items.map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-8 text-sm font-medium text-white/25 flex-shrink-0"
            >
              <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
