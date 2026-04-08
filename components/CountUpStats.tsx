"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { end: 12400, suffix: "+", label: "Leads Captured" },
  { end: 8300,  suffix: "+", label: "Hours Saved" },
  { end: 94,    suffix: "+", label: "Businesses Automated" },
  { end: 99,    suffix: "%", label: "Client Satisfaction" },
];

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    function step(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function StatItem({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(end, 2200, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl font-bold text-white tabular-nums">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-xs text-white/30 uppercase tracking-widest mt-2">{label}</p>
    </div>
  );
}

export default function CountUpStats() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#050505] border-y border-[#111111]">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/30 mb-12">
          Results That Speak For Themselves
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
