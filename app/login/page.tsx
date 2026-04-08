import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Login",
  description: "Log in to your JP Intelligence client dashboard.",
};

const PLATFORM_URL = "https://jp-intelligence-production.up.railway.app";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-sm w-full">
        <div className="text-center mb-10">
          <p className="text-xl font-semibold tracking-tight text-white">
            JP <span className="text-white/35">Intelligence</span>
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/25">
            Client Portal
          </p>
        </div>

        <div className="bg-[#080808] border border-[#131313] rounded-2xl p-8">
          <h1 className="text-xl font-bold text-white mb-2 text-center">Welcome back</h1>
          <p className="text-sm text-white/30 text-center mb-8">
            You&apos;ll be redirected to your secure client dashboard.
          </p>

          <a
            href={PLATFORM_URL}
            className="btn-primary block w-full text-center text-sm font-bold py-4 rounded-xl"
          >
            Continue to Dashboard →
          </a>

          <div className="mt-6"><div className="white-divider" /></div>

          <div className="mt-6 space-y-3 text-center">
            <p className="text-xs text-white/25">
              Your login credentials were sent in your welcome email after onboarding.
            </p>
            <p className="text-xs text-white/20">
              Need help?{" "}
              <a href="mailto:support@jpintelligence.ai" className="text-white/45 hover:text-white transition-colors">
                Contact support
              </a>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/20">
          Not a client yet?{" "}
          <a href="/get-started" className="text-white/45 hover:text-white transition-colors">
            Get started
          </a>
        </p>
      </div>
    </div>
  );
}
