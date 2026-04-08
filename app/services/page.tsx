import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI Chatbots, ManyChat Automation, Call Intelligence, and AI Booking Systems — built and managed for local businesses by JP Intelligence.",
};

const services = [
  {
    id: "chatbot",
    icon: "💬",
    badge: "Most Popular",
    title: "AI Chatbot",
    tagline: "Never miss a lead again.",
    price: { setup: 250, monthly: 75 },
    description:
      "Our AI chatbot lives on your website 24/7, greeting visitors, answering questions, qualifying leads, and booking appointments — all automatically. It learns your business, speaks your brand's voice, and never calls in sick.",
    features: [
      "Custom-trained on your business info & FAQs",
      "Lead capture with name, email, and phone collection",
      "Appointment booking directly from the chat window",
      "Instant replies 24/7 — even on holidays",
      "Seamless handoff to human staff when needed",
      "Monthly performance reports & optimization",
      "Embeds on any website (Wix, Squarespace, WordPress, Shopify)",
    ],
    whoFor: [
      "Service businesses (salons, clinics, contractors)",
      "Any business getting website traffic but losing leads after hours",
      "Owners tired of answering the same questions repeatedly",
    ],
  },
  {
    id: "manychat",
    icon: "📲",
    badge: null,
    title: "ManyChat Automation",
    tagline: "Turn DMs into dollars.",
    price: { setup: 175, monthly: 55 },
    description:
      "Instagram and Facebook DMs are a goldmine — if you respond fast enough. Our ManyChat automation builds intelligent conversation flows that engage leads the moment they message you, nurture them over time, and push them toward a purchase.",
    features: [
      "Custom Instagram & Facebook DM automation flows",
      "Comment-triggered campaigns (reply to post comments automatically)",
      "Story reply sequences that convert viewers into customers",
      "Lead qualification and tagging based on responses",
      "Broadcast campaigns to your subscriber list",
      "Integration with your existing booking or CRM system",
      "Monthly flow optimization based on performance data",
    ],
    whoFor: [
      "Local businesses with an Instagram or Facebook presence",
      "Coaches, consultants, and service providers",
      "E-commerce brands wanting to recover lost interest",
    ],
  },
  {
    id: "call-intelligence",
    icon: "📞",
    badge: null,
    title: "Call Intelligence",
    tagline: "Every call, captured and analyzed.",
    price: { setup: 600, monthly: 200 },
    description:
      "Stop guessing what your customers want. Our Call Intelligence system records, transcribes, and AI-analyzes every inbound call — surfacing key insights, tracking staff performance, and flagging missed opportunities so you can act fast.",
    features: [
      "Automatic call recording and transcription",
      "AI-powered call summaries delivered to your inbox",
      "Sentiment analysis (happy, frustrated, undecided)",
      "Keyword tracking for leads, complaints, and sales signals",
      "Staff performance scoring and coaching flags",
      "Missed call alerts with callback recommendations",
      "Weekly analytics dashboard with trends and highlights",
    ],
    whoFor: [
      "Multi-staff businesses (dental, med spa, legal, auto)",
      "Owners who can't monitor every call personally",
      "Teams wanting to improve closing rates from phone leads",
    ],
  },
  {
    id: "booking",
    icon: "📅",
    badge: null,
    title: "AI Booking System",
    tagline: "Zero no-shows. Zero admin.",
    price: { setup: 450, monthly: 275 },
    description:
      "Our AI Booking System replaces the back-and-forth of manual scheduling. Clients book online, get confirmed automatically, receive reminders, and can reschedule without calling — while you get a clean, organized calendar that runs itself.",
    features: [
      "Online booking page branded to your business",
      "Automated confirmation emails and SMS reminders",
      "Smart rescheduling and cancellation flows",
      "Calendar sync (Google Calendar, Outlook)",
      "Intake forms collected before appointments",
      "Post-appointment follow-up sequences",
      "No-show reduction workflows (2x and 24hr reminders)",
    ],
    whoFor: [
      "Appointment-based businesses (salons, spas, clinics, coaches)",
      "Businesses losing revenue to no-shows",
      "Owners spending hours managing their schedule manually",
    ],
  },
];

const fullStack = {
  title: "Full Stack Package",
  tagline: "All four systems. One seamless operation.",
  price: { setup: 1200, monthly: 500 },
  savings: { setup: 275, monthly: 105 },
  description:
    "Get all four AI systems working together in a unified ecosystem. Your chatbot captures leads, ManyChat nurtures them socially, Call Intelligence tracks every phone touchpoint, and AI Booking converts them — all feeding data into one dashboard.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-16 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-grid" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/25 mb-4">
            Our Services
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Four AI systems that work
            <br />
            <span className="text-white/40">while you work.</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            Each system is custom-configured for your business, deployed within
            5–7 days, and monitored month over month.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#080808] border border-[#131313] rounded-2xl overflow-hidden"
            >
              {/* Card header */}
              <div className="p-8 sm:p-10 border-b border-[#111111]">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-5">
                    <div className="w-13 h-13 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-2xl flex-shrink-0 p-3">
                      {service.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-xl font-bold text-white">{service.title}</h2>
                        {service.badge && (
                          <span className="text-xs font-bold uppercase tracking-wider text-black bg-white px-2.5 py-0.5 rounded-full">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-white/35 text-sm">{service.tagline}</p>
                    </div>
                  </div>
                  <div className="sm:text-right flex-shrink-0">
                    <p className="text-xl font-bold text-white">
                      ${service.price.setup}
                      <span className="text-sm font-normal text-white/30 ml-1">setup</span>
                    </p>
                    <p className="text-sm text-white/35">
                      + ${service.price.monthly}<span className="text-white/25">/mo</span>
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-white/40 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>

              {/* Features + Who it's for */}
              <div className="p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/20 mb-4">
                    What&apos;s Included
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <svg className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-white/40">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/20 mb-4">
                    Who It&apos;s For
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.whoFor.map((w) => (
                      <li key={w} className="flex items-start gap-3">
                        <svg className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-sm text-white/40">{w}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/get-started"
                    className="btn-primary inline-block text-sm font-bold px-6 py-3 rounded-full"
                  >
                    Get This Service →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Stack Package */}
      <section className="py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative card-featured rounded-2xl p-8 sm:p-12 overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.03] rounded-2xl"
              style={{ background: "radial-gradient(ellipse at top right, #fff 0%, transparent 60%)" }}
            />
            <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">Best Value</p>
                <h2 className="text-2xl font-bold text-white">{fullStack.title}</h2>
                <p className="text-white/40 mt-1 text-sm">{fullStack.tagline}</p>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <p className="text-2xl font-bold text-white">
                  ${fullStack.price.setup}
                  <span className="text-sm font-normal text-white/30 ml-1">setup</span>
                </p>
                <p className="text-white/40 text-sm">+ ${fullStack.price.monthly}/mo</p>
                <p className="mt-1 text-xs text-white/30">
                  Save ${fullStack.savings.setup} setup · ${fullStack.savings.monthly}/mo off
                </p>
              </div>
            </div>
            <p className="text-white/40 leading-relaxed text-sm mb-7">{fullStack.description}</p>
            <Link href="/get-started?service=full-stack" className="btn-primary inline-block text-sm font-bold px-7 py-3.5 rounded-full">
              Get the Full Stack Package →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/30 mb-3 text-sm">Not sure which service is right for you?</p>
          <h2 className="text-3xl font-bold text-white mb-6">Let&apos;s figure it out together.</h2>
          <Link href="/get-started" className="btn-primary inline-block text-base font-bold px-8 py-4 rounded-full">
            Start the Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
