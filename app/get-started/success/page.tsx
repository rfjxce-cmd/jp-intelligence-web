import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to JP Intelligence",
  description: "Your AI system setup has started. Check your inbox for next steps.",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-lg w-full text-center">
        {/* Checkmark */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/25 mb-3">
          Payment Confirmed
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
          Welcome to JP Intelligence.
          <br />
          <span className="text-white/40">We&apos;re on it.</span>
        </h1>

        <p className="text-white/40 text-base leading-relaxed mb-8 max-w-md mx-auto">
          Your setup fee has been received and your account is being created.
          Check your inbox — a welcome email with your login credentials is on its way.
        </p>

        {/* What happens next */}
        <div className="bg-[#080808] border border-[#131313] rounded-2xl p-6 text-left mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/20 mb-4">
            What Happens Next
          </p>
          <div className="space-y-4">
            {[
              { step: "1", title: "Check your email", body: "A welcome email with your login credentials is on its way." },
              { step: "2", title: "We start building", body: "Our team gets to work on your AI system immediately." },
              { step: "3", title: "Go live in 5–7 days", body: "We'll send you a review link before everything goes live." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white/40 font-bold">{item.step}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-white/30 mt-0.5">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/"
          className="text-sm text-white/30 hover:text-white/60 transition-colors inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
