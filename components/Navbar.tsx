"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogoImage from "./LogoImage";

const links = [
  { href: "/about",    label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing",  label: "Pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#111111] bg-black/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <LogoImage height={40} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === href
                  ? "text-white"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-white/40 hover:text-white/80 transition-colors duration-200"
          >
            Client Login
          </Link>
          <Link
            href="/get-started"
            className="btn-primary btn-nav-pulse text-sm font-semibold px-5 py-2 rounded-full"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white/40 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8h18M3 16h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#111111] bg-black px-4 py-4 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="white-divider my-1" />
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-white/40 hover:text-white transition-colors"
          >
            Client Login
          </Link>
          <Link
            href="/get-started"
            onClick={() => setOpen(false)}
            className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-full text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
