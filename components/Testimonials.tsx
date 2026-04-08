const testimonials = [
  {
    quote:
      "Our AI chatbot went live in 5 days. Within the first week it captured 23 leads that would have just bounced from our site. The ROI was immediate.",
    name: "Maria R.",
    role: "Owner",
    business: "Newport Beach Med Spa",
    initials: "MR",
  },
  {
    quote:
      "I was skeptical about AI automation for a dental practice. Three months in and our no-show rate dropped 40%. The booking system basically runs itself.",
    name: "Dr. Kevin T.",
    role: "Founder",
    business: "Orange County Dental Group",
    initials: "KT",
  },
  {
    quote:
      "The ManyChat flows they built for our Instagram turned DMs into real appointments. We're booking 15–20 new clients a month just from social media now.",
    name: "Jasmine L.",
    role: "Owner",
    business: "Laguna Hills Beauty Studio",
    initials: "JL",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-[#030303]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/30 mb-3">
            Client Stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Real businesses. Real results.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card rounded-2xl p-7 flex flex-col justify-between"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm text-white/60 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white/60">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/30">{t.role}, {t.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
