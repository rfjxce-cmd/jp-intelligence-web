import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "JP Intelligence was founded by a 15-year-old entrepreneur in Long Beach, CA. Learn our story, mission, and why local businesses trust us to build their AI systems.",
};

const values = [
  {
    icon: "⚡",
    title: "Results Over Everything",
    body: "We measure success by one thing: does your business grow? Every system we build is tied to a real outcome — more leads, less no-shows, faster responses.",
  },
  {
    icon: "🔍",
    title: "Obsessive Attention to Detail",
    body: "We grew up debugging code and dissecting how things work. That same obsession goes into every chatbot flow, every automation, every client system we touch.",
  },
  {
    icon: "🤝",
    title: "No Overhead, No Runaround",
    body: "When you work with JP Intelligence, you talk directly to the people building your system. No account managers, no ticket queues. Just fast, direct execution.",
  },
  {
    icon: "🧠",
    title: "Built by Someone Who Grew Up With This",
    body: "AI isn't a trend we jumped on — it's the language we grew up speaking. That native fluency means we move faster, build smarter, and see opportunities others miss.",
  },
];

const whyUs = [
  {
    heading: "Fresh Perspective",
    body: "We don't carry the baggage of 'how it's always been done.' We look at your business with new eyes and find automation opportunities that traditional agencies walk right past.",
  },
  {
    heading: "Zero Overhead",
    body: "No office lease. No bloated team. No corporate markup. Our lean structure means your setup fee actually goes toward building your system — not paying for someone else's overhead.",
  },
  {
    heading: "Obsessed With Results",
    body: "We're not satisfied until the numbers move. We monitor every system we deploy and optimize proactively. Your growth is our portfolio.",
  },
  {
    heading: "Native to the Technology",
    body: "Most agencies are still figuring out AI. We built our first chatbot at 14. By the time you're reading this, we've spent years going deep on the tools that actually drive ROI.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.25em] text-white/30 mb-5">
            Who We Are
          </p>
          <h1 className="animate-fade-in-up animate-delay-100 text-5xl sm:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            Built different.
            <br />
            <span className="text-white/40">By design.</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-200 mt-7 text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
            JP Intelligence is an AI automation agency founded by a 15-year-old
            entrepreneur in Long Beach, California — and that&apos;s not a
            disclaimer. It&apos;s the whole point.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 px-4 sm:px-6 bg-[#050505]">
        <div className="max-w-3xl mx-auto">
          <div className="white-divider mb-16" />

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/25 mb-8">
            The Story
          </p>

          <div className="space-y-6 text-[17px] text-white/55 leading-[1.85]">
            <p>
              Most AI agencies are run by people who discovered AI two years ago
              and rebranded their marketing firm. JP Intelligence isn&apos;t
              that.
            </p>
            <p>
              I&apos;ve been building with technology since I was a kid — breaking
              things, understanding how they work, and putting them back together
              better. When AI tools started becoming powerful enough to actually
              automate real business workflows, I didn&apos;t just watch. I
              started building.
            </p>
            <p>
              I noticed something: the businesses that needed AI the most — local
              service businesses, small practices, owner-operated companies —
              were the ones being completely ignored by the tech world. The tools
              existed. The talent didn&apos;t show up for them.
            </p>
            <p>
              So I started JP Intelligence in Long Beach to close that gap.
              We build, deploy, and manage AI systems specifically for local
              businesses. Not enterprise platforms. Not SaaS products. Real,
              hands-on automation that makes your business run better tomorrow
              than it did today.
            </p>
            <p className="text-white/80 font-medium">
              The fact that I&apos;m 15 isn&apos;t something I apologize for.
              It means I&apos;ve been native to this technology my entire life.
              It means I have no bureaucracy, no investors to answer to, and
              nothing slowing me down from delivering results.
            </p>
          </div>

          <div className="mt-12 p-6 border border-white/8 rounded-2xl bg-white/[0.02]">
            <p className="text-lg font-semibold text-white leading-snug">
              &ldquo;I started this company because I saw local businesses getting
              left behind by the AI revolution. That felt wrong. So I fixed it.&rdquo;
            </p>
            <p className="mt-4 text-sm text-white/35">
              — Founder, JP Intelligence · Long Beach, CA
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/25 mb-5">
                Our Mission
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
                Make AI work for
                <br />
                every local business.
              </h2>
              <p className="text-white/45 leading-relaxed">
                We believe that the technology reshaping entire industries
                shouldn&apos;t be exclusive to corporations with million-dollar
                IT budgets. Local businesses — the spine of every community —
                deserve access to the same competitive advantages.
              </p>
              <p className="text-white/45 leading-relaxed mt-4">
                Our mission is to put that power within reach: affordable,
                done-for-you AI automation that makes your business faster,
                leaner, and more competitive — without you needing to become a
                tech expert.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "Systems Deployed",   value: "94+" },
                { label: "Avg. Go-Live Time",  value: "6 days" },
                { label: "Client Retention",   value: "96%" },
                { label: "Founded",            value: "2024" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-6 py-4 rounded-xl border border-white/6 bg-white/[0.02]"
                >
                  <span className="text-sm text-white/40">{label}</span>
                  <span className="text-lg font-bold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 px-4 sm:px-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/25 mb-3">
              Why JP Intelligence
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Why work with us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whyUs.map(({ heading, body }) => (
              <div
                key={heading}
                className="card rounded-2xl p-7"
              >
                <h3 className="text-base font-semibold text-white mb-3">
                  {heading}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/25 mb-3">
              Our Values
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              What drives us.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map(({ icon, title, body }) => (
              <div key={title} className="card rounded-2xl p-7">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-xl mb-5">
                  {icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{ background: "radial-gradient(ellipse at center, #fff 0%, transparent 60%)" }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/25 mb-5">
            Ready to Build?
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Let&apos;s build something
            <br />
            that actually works.
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-md mx-auto">
            No fluff. No enterprise pricing. Just a fast, focused team that
            ships AI systems built for your specific business.
          </p>
          <Link
            href="/get-started"
            className="btn-primary inline-block text-base font-bold px-10 py-4 rounded-full"
          >
            Get Started Today
          </Link>
          <p className="mt-4 text-xs text-white/20">
            Setup fee paid at onboarding · No long-term contracts
          </p>
        </div>
      </section>
    </>
  );
}
