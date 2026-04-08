"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function FloatingDemo() {
  const [visible, setVisible] = useState(false);

  // Appear after a short delay so it doesn't flash on load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <Link
      href="/get-started"
      className="floating-demo animate-fade-in flex items-center gap-2"
    >
      <span className="w-2 h-2 rounded-full bg-black/40 border border-black/20 relative flex-shrink-0">
        <span className="absolute inset-0 rounded-full bg-black/30 animate-ping" />
      </span>
      Book a Demo
    </Link>
  );
}
