import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — JP Intelligence",
  description:
    "Transparent pricing for AI chatbots, ManyChat automation, call intelligence, and AI booking systems.",
};

const plans = [
  {
    id: "chatbot",
    icon: "💬",
    name: "AI Chatbot",
    setup: 250,
    monthly: 75,
    badge: "Most Popular",
    highlight: true,
    features: [
      "Custom-trained on your business",
      "24/7 lead capture & booking",
      "Monthly optimization",
      "Embed on any website",
      "Email + chat support",
    ],
  },
  {
    id: "manychat",
    icon: "📲",
    name: "ManyChat Automation",
    setup: 175,
    monthly: 55,
    badge: null,
    highlight: false,
    features: [
      "Instagram & Facebook DM flows",
      "Comment-triggered campaigns",
      "Story reply sequences",
      "Lead qualification & tagging",
      "Monthly flow optimization",
    ],
  },
  {
    id: "call",
    icon: "📞",
    name: "Call Intelligence",
    setup: 600,
    monthly: 200,
    badge: null,
    highlight: false,
    features: [
      "Call recording & transcription",
      "AI summaries to your inbox",
      "Sentiment & keyword analysis",
      "Staff performance scoring",
      "Weekly analytics dashboard",
    ],
  },
  {
    id: "booking",
    icon: "📅",
    name: "AI Booking System",
    setup: 450,
    monthly: 275,
    badge: null,
    highlight: false,
    features: [
      "Branded online booking page",
      "Automated confirmations & reminders",
      "Smart rescheduling flows",
      "Google Calendar sync",
      "No-show reduction workflows",
    ],
  },
];

const faqs = [
  {
    q: "What does the setup fee cover?",
    a: "The setup fee covers the full configuration, customization, and deployment of your AI system. This includes training the AI on your business, building the flows, and integrating with your existing tools. You only pay it once.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. The monthly fee is month-to-month. You can cancel anytime with 30 days' notice. We believe in earning your business every month.",
  },
  {
    q: "How long until my system is live?",
    a: "Most systems are live within 5–7 business days after your setup fee is received. We'll send you a review link before going fully live.",
  },
  {
    q: "Can I upgrade to the Full Stack Package later?",
    a: "Yes. If you start with one service and want to add more, we'll credit your existing setup fees toward the Full Stack Package price.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 14-day satisfaction guarantee. If you're not happy with how your system is set up and we can't make it right, we'll refund your setup fee.",
  },
  {
    q: "What platforms do you support?",
    a: "The AI Chatbot works on Squarespace, Wix, WordPress, Shopify, and any site that supports HTML embeds. ManyChat works with Facebook and Instagram. The booking system works with Google Calendar and Outlook.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(to right, #c9a84c 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c] mb-4">
            Pricing
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f5f5f5] mb-6 leading-tight">
            Straightforward Pricing.
            <br />
            <span className="text-gold-gradient">No Surprises.</span>
          </h1>
          <p className="text-[#666666] text-lg max-w-xl mx-auto">
            A one-time setup fee to get your system built. A flat monthly rate
            to keep it running and optimized. That&apos;s it.
          </p>
        </div>
      </section>

      {/* Pricing grid */}
      <section className="pb-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl p-6 border transition-all duration-300 ${
                plan.highlight
                  ? "bg-[#111111] border-[#c9a84c]/40 shadow-[0_0_40px_rgba(201,168,76,0.08)]"
                  : "bg-[#0e0e0e] border-[#1a1a1a]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0a0a0a] bg-[#c9a84c] px-3 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-3xl mb-4">{plan.icon}</div>
              <h3 className="text-lg font-bold text-[#f5f5f5] mb-1">
                {plan.name}
              </h3>

              <div className="mt-4 mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#f5f5f5]">
                    ${plan.setup}
                  </span>
                  <span className="text-[#555555] text-sm">setup</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[#888888]">${plan.monthly}</span>
                  <span className="text-[#444444] text-sm">/month</span>
                </div>
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg
                      className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-[#777777]">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/get-started?service=${plan.id}`}
                className={`block text-sm font-bold text-center py-3 rounded-full transition-all duration-200 ${
                  plan.highlight
                    ? "btn-gold text-[#0a0a0a]"
                    : "border border-[#2a2a2a] text-[#888888] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Full Stack Banner */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-[#111111] border border-[#c9a84c]/30 rounded-2xl p-8 sm:p-10 overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                background:
                  "radial-gradient(ellipse at right, #c9a84c 0%, transparent 55%)",
              }}
            />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c] mb-2">
                  Best Value — Save $275 Setup + $105/mo
                </p>
                <h2 className="text-2xl font-bold text-[#f5f5f5]">
                  Full Stack Package
                </h2>
                <p className="text-[#666666] text-sm mt-1">
                  All four AI systems working together for one flat rate.
                </p>
              </div>
              <div className="flex flex-col sm:items-end gap-3">
                <div>
                  <span className="text-3xl font-bold text-[#f5f5f5]">
                    $1,200
                  </span>
                  <span className="text-[#555555] text-sm ml-1">setup</span>
                  <span className="text-[#888888] ml-3">+ $500/mo</span>
                </div>
                <Link
                  href="/get-started?service=full-stack"
                  className="btn-gold text-sm font-bold text-[#0a0a0a] px-6 py-3 rounded-full text-center whitespace-nowrap"
                >
                  Get Full Stack →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare table */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#f5f5f5]">
              Compare Plans
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="text-left py-3 pr-6 text-[#555555] font-medium w-40">
                    &nbsp;
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      className="text-center py-3 px-3 text-[#888888] font-medium"
                    >
                      {p.icon}
                      <br />
                      <span className="text-xs">{p.name}</span>
                    </th>
                  ))}
                  <th className="text-center py-3 px-3 text-[#c9a84c] font-medium text-xs">
                    ✦ Full Stack
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#111111]">
                <tr>
                  <td className="py-3 pr-6 text-[#555555]">Setup fee</td>
                  {plans.map((p) => (
                    <td
                      key={p.id}
                      className="py-3 px-3 text-center text-[#f5f5f5] font-semibold"
                    >
                      ${p.setup}
                    </td>
                  ))}
                  <td className="py-3 px-3 text-center text-[#c9a84c] font-bold">
                    $1,200
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-6 text-[#555555]">Monthly</td>
                  {plans.map((p) => (
                    <td
                      key={p.id}
                      className="py-3 px-3 text-center text-[#f5f5f5] font-semibold"
                    >
                      ${p.monthly}
                    </td>
                  ))}
                  <td className="py-3 px-3 text-center text-[#c9a84c] font-bold">
                    $500
                  </td>
                </tr>
                {[
                  "24/7 automation",
                  "Monthly optimization",
                  "U.S.-based support",
                  "No long-term contract",
                ].map((feature) => (
                  <tr key={feature}>
                    <td className="py-3 pr-6 text-[#555555]">{feature}</td>
                    {[...plans, { id: "full" }].map((p) => (
                      <td key={p.id} className="py-3 px-3 text-center">
                        <svg
                          className="w-4 h-4 text-[#c9a84c] mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 bg-[#080808]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c] mb-3">
              FAQ
            </p>
            <h2 className="text-3xl font-bold text-[#f5f5f5]">
              Common Questions
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6"
              >
                <h3 className="text-[#f5f5f5] font-semibold mb-3">{faq.q}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5] mb-6">
            Ready to automate your business?
          </h2>
          <Link
            href="/get-started"
            className="btn-gold inline-block text-base font-bold text-[#0a0a0a] px-10 py-4 rounded-full"
          >
            Get Started Today
          </Link>
          <p className="mt-4 text-xs text-[#444444]">
            Setup fee paid at onboarding · Cancel anytime
          </p>
        </div>
      </section>
    </>
  );
}
