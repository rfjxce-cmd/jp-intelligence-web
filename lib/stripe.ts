import Stripe from "stripe";

let _stripe: Stripe | undefined;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set.");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-03-31.basil",
    });
  }
  return _stripe;
}

// Lazy singleton used by API routes
export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const s = getStripe();
    const val = (s as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === "function" ? val.bind(s) : val;
  },
});

// Map service IDs to readable names and prices (setup fee in cents)
export const SERVICE_MAP: Record<
  string,
  { name: string; setupCents: number; monthly: number }
> = {
  chatbot: { name: "AI Chatbot", setupCents: 25000, monthly: 75 },
  manychat: { name: "ManyChat Automation", setupCents: 17500, monthly: 55 },
  call: { name: "Call Intelligence", setupCents: 60000, monthly: 200 },
  booking: { name: "AI Booking System", setupCents: 45000, monthly: 275 },
  "full-stack": {
    name: "Full Stack Package",
    setupCents: 120000,
    monthly: 500,
  },
};
