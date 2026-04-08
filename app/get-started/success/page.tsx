import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to JP Intelligence",
  description: "Your AI system setup has started.",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-lg w-full text-center">
        {/* Animated checkmark ring */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-24 h-24 rounded-full border-2 border-[#c9a84c]/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#c9a84c]"
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
            </div>
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c] mb-3">
          Payment Confirmed
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5] mb-5 leading-tight">
          Welcome to JP Intelligence.
          <br />
          <span className="text-gold-gradient">We&apos;re on it.</span>
        </h1>

        <p className="text-[#666666] text-base leading-relaxed mb-8 max-w-md mx-auto">
          Your setup fee has been received and your account is being created.
          Check your inbox — a welcome email is on its way with your login
          credentials and what happens next.
        </p>

        {/* What happens next */}
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-2xl p-6 text-left mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#555555] mb-4">
            What Happens Next
          </p>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Check your email",
                body: "A welcome email with your login credentials is on its way.",
              },
              {
                step: "2",
                title: "We start building",
                body: "Our team gets to work on your AI system immediately.",
              },
              {
                step: "3",
                title: "Go live in 5–7 days",
                body: "We'll send you a review link before everything goes live.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-[#1a1a1a] border border-[#c9a84c]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-[#c9a84c] font-bold">{item.step}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#f5f5f5]">{item.title}</p>
                  <p className="text-xs text-[#555555] mt-0.5">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/"
          className="text-sm text-[#555555] hover:text-[#c9a84c] transition-colors inline-flex items-center gap-2"
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
