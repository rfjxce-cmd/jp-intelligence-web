import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Login — JP Intelligence",
  description: "Log in to your JP Intelligence client dashboard.",
};

const PLATFORM_URL = "https://jp-intelligence-production.up.railway.app";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-sm w-full">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="text-xl font-semibold">
            <span className="text-gold-gradient">JP</span>
            <span className="text-[#f5f5f5] ml-1">Intelligence</span>
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#555555]">
            Client Portal
          </p>
        </div>

        <div className="bg-[#111111] border border-[#1a1a1a] rounded-2xl p-8">
          <h1 className="text-xl font-bold text-[#f5f5f5] mb-2 text-center">
            Welcome back
          </h1>
          <p className="text-sm text-[#555555] text-center mb-8">
            You&apos;ll be redirected to your secure client dashboard.
          </p>

          <a
            href={PLATFORM_URL}
            className="btn-gold block w-full text-center text-sm font-bold text-[#0a0a0a] py-4 rounded-xl"
          >
            Continue to Dashboard →
          </a>

          <div className="mt-6">
            <div className="gold-divider" />
          </div>

          <div className="mt-6 space-y-3 text-center">
            <p className="text-xs text-[#444444]">
              Your login credentials were sent in your welcome email after
              completing onboarding.
            </p>
            <p className="text-xs text-[#333333]">
              Need help?{" "}
              <a
                href="mailto:support@jpintelligence.ai"
                className="text-[#c9a84c] hover:text-[#e4c97a] transition-colors"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[#333333]">
          Not a client yet?{" "}
          <a
            href="/get-started"
            className="text-[#c9a84c] hover:text-[#e4c97a] transition-colors"
          >
            Get started
          </a>
        </p>
      </div>
    </div>
  );
}
