import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import StatsSection from "@/components/StatsSection";
import HeroCubeWrapper from "@/components/HeroCubeWrapper";

const services = [
  {
    icon: "💬",
    title: "AI Chatbot",
    description:
      "Deploy a 24/7 AI assistant on your website that qualifies leads, answers questions, and books appointments — all without lifting a finger.",
  },
  {
    icon: "📲",
    title: "ManyChat Automation",
    description:
      "Automate your Instagram and Facebook DMs with intelligent flows that nurture leads and drive conversions while you sleep.",
  },
  {
    icon: "📞",
    title: "Call Intelligence",
    description:
      "Every inbound call transcribed, analyzed, and summarized. Know exactly what your customers want and how your team performs.",
  },
  {
    icon: "📅",
    title: "AI Booking System",
    description:
      "A fully automated scheduling system that handles confirmations, reminders, and rescheduling — zero no-shows, zero admin work.",
  },
];

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description:
      "Choose your services and complete a quick onboarding. Your setup fee secures your spot and kick-starts the build.",
  },
  {
    number: "02",
    title: "We Build",
    description:
      "Our team configures and deploys your AI systems within 5–7 business days. You review, we refine.",
  },
  {
    number: "03",
    title: "You Grow",
    description:
      "Watch your leads, bookings, and customer satisfaction climb. We monitor and optimize every system month over month.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(to right, #c9a84c 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
            {/* Left: text */}
            <div>
              <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c] mb-6">
                AI Automation Agency
              </p>

              <h1 className="animate-fade-in-up animate-delay-100 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
                <span className="text-[#f5f5f5]">Automate Your Business.</span>
                <br />
                <span className="text-gold-gradient">Amplify Your Growth.</span>
              </h1>

              <p className="animate-fade-in-up animate-delay-200 mt-6 text-lg text-[#888888] max-w-lg leading-relaxed">
                JP Intelligence builds AI-powered systems for local businesses —
                chatbots, automation flows, call intelligence, and booking
                systems that run 24/7 so you don&apos;t have to.
              </p>

              <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/get-started"
                  className="btn-gold text-base font-bold text-[#0a0a0a] px-8 py-4 rounded-full w-full sm:w-auto text-center"
                >
                  Get Started
                </Link>
                <Link
                  href="/services"
                  className="text-base font-medium text-[#888888] hover:text-[#f5f5f5] transition-colors duration-200 flex items-center gap-2 py-4"
                >
                  See what we build
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: 3D cube (hidden on mobile) */}
            <div className="hidden lg:block relative h-[520px]">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full opacity-[0.08]"
                style={{
                  background:
                    "radial-gradient(circle, #c9a84c 0%, transparent 65%)",
                }}
              />
              <HeroCubeWrapper />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ──────────────────────────────────────────────────────── */}
      <StatsSection />

      {/* ─── Services ───────────────────────────────────────────────────── */}
      <section id="services" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c] mb-3">
              What We Build
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5]">
              Four Systems That Transform
              <br className="hidden sm:block" />
              <span className="text-gold-gradient"> Local Businesses</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="text-sm font-medium text-[#c9a84c] hover:text-[#e4c97a] transition-colors duration-200 inline-flex items-center gap-2"
            >
              Explore all services in detail
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── How It Works ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-[#080808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c] mb-3">
              The Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5]">
              Simple. Fast. Effective.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />

            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#c9a84c]/30 bg-[#111111] mb-6 relative z-10">
                  <span className="text-sm font-bold text-[#c9a84c]">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#f5f5f5] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ──────────────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse at center, #c9a84c 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c] mb-4">
            Ready to Start?
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f5f5f5] mb-6 leading-tight">
            Your competitors are already
            <br />
            <span className="text-gold-gradient">using AI. Are you?</span>
          </h2>
          <p className="text-[#666666] text-lg mb-10 max-w-xl mx-auto">
            Get your first AI system live in under a week. No technical
            knowledge required — just a desire to grow.
          </p>
          <Link
            href="/get-started"
            className="btn-gold inline-block text-base font-bold text-[#0a0a0a] px-10 py-4 rounded-full"
          >
            Get Started Today
          </Link>
          <p className="mt-4 text-xs text-[#444444]">
            Setup fee paid at onboarding · No long-term contracts
          </p>
        </div>
      </section>
    </>
  );
}
