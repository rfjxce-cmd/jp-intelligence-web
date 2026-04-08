import { NextRequest } from "next/server";
import { stripe, SERVICE_MAP } from "@/lib/stripe";

interface CheckoutBody {
  formData: {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    website: string;
  };
  selectedServices: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CheckoutBody;
    const { formData, selectedServices } = body;

    if (
      !formData?.email ||
      !formData?.name ||
      !Array.isArray(selectedServices) ||
      selectedServices.length === 0
    ) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Build line items — one per service (setup fees only)
    const lineItems = selectedServices.map((id) => {
      const service = SERVICE_MAP[id];
      if (!service) throw new Error(`Unknown service: ${id}`);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${service.name} — Setup Fee`,
            description: `One-time setup. Monthly plan: $${service.monthly}/mo starts after go-live.`,
          },
          unit_amount: service.setupCents,
        },
        quantity: 1,
      };
    });

    const serviceNames = selectedServices
      .map((id) => SERVICE_MAP[id]?.name)
      .filter(Boolean)
      .join(", ");

    const origin = req.headers.get("origin") ?? process.env.PLATFORM_URL ?? "";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: formData.email,
      line_items: lineItems,
      success_url: `${origin}/get-started/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/get-started`,
      metadata: {
        client_name: formData.name,
        client_email: formData.email,
        client_phone: formData.phone,
        business_name: formData.businessName,
        website: formData.website || "",
        services: JSON.stringify(selectedServices),
        service_names: serviceNames,
      },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("[create-checkout]", err);
    const message = err instanceof Error ? err.message : "Internal server error.";
    return Response.json({ error: message }, { status: 500 });
  }
}
