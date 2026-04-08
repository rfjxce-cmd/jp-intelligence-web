const stats = [
  { value: "24/7",  label: "Automated Operations" },
  { value: "5–7",   label: "Days to Go Live" },
  { value: "3×",    label: "Average Lead Increase" },
  { value: "100%",  label: "U.S.-Based Support" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-[#111111] bg-[#050505]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                {value}
              </p>
              <p className="text-xs text-white/30 uppercase tracking-widest">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
