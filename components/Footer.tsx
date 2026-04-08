import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="text-xl font-semibold">
              <span className="text-gold-gradient">JP</span>
              <span className="text-[#f5f5f5] ml-1">Intelligence</span>
            </p>
            <p className="mt-3 text-sm text-[#555555] leading-relaxed max-w-xs">
              AI automation built for local businesses. We handle the technology
              so you can focus on growth.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#555555] mb-4">
              Company
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "/services", label: "Services" },
                { href: "/pricing", label: "Pricing" },
                { href: "/get-started", label: "Get Started" },
                { href: "/login", label: "Client Login" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-[#555555] hover:text-[#c9a84c] transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#555555] mb-4">
              Get in Touch
            </p>
            <Link
              href="/get-started"
              className="inline-block btn-gold text-sm font-semibold text-[#0a0a0a] px-5 py-2.5 rounded-full"
            >
              Start Your Project
            </Link>
          </div>
        </div>

        <div className="gold-divider mt-10 mb-6" />

        <p className="text-xs text-[#333333] text-center">
          © {new Date().getFullYear()} JP Intelligence. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
