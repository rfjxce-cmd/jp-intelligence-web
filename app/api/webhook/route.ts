import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { query } from "@/lib/db";
import { sendWelcomeEmail, sendAdminNotification } from "@/lib/email";
import bcrypt from "bcryptjs";
import { SERVICE_MAP } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const AGENCY_ID = "00000000-0000-0000-0000-000000000001";

function generateTempPassword(length = 12): string {
  const chars =
    "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

async function handleCheckoutComplete(
  session: import("stripe").Stripe.Checkout.Session
) {
  const meta = session.metadata;
  if (!meta) throw new Error("No metadata on session");

  const {
    client_name,
    client_email,
    client_phone,
    business_name,
    website,
    services: servicesJson,
    service_names,
  } = meta;

  const services: string[] = JSON.parse(servicesJson || "[]");
  const totalSetup = Math.round((session.amount_total ?? 0) / 100);

  // 1. Check if user already exists
  const existing = await query<{ id: string }>(
    "SELECT id FROM users WHERE email = $1 LIMIT 1",
    [client_email]
  );

  let userId: string;
  let tempPassword: string | null = null;

  if (existing.length > 0) {
    userId = existing[0].id;
  } else {
    // 2. Create user account with temp password
    tempPassword = generateTempPassword();
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    const newUser = await query<{ id: string }>(
      `INSERT INTO users (name, email, password_hash, role, created_at)
       VALUES ($1, $2, $3, 'client', NOW())
       RETURNING id`,
      [client_name, client_email, passwordHash]
    );
    userId = newUser[0].id;
  }

  // 3. Create client record in clients table
  await query(
    `INSERT INTO clients (
       agency_id, user_id, name, email, phone, business_name, website,
       services, stripe_session_id, setup_amount, status, created_at
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'onboarding', NOW())
     ON CONFLICT (stripe_session_id) DO NOTHING`,
    [
      AGENCY_ID,
      userId,
      client_name,
      client_email,
      client_phone,
      business_name,
      website || null,
      services,
      session.id,
      totalSetup,
    ]
  );

  const loginUrl = process.env.PLATFORM_URL ?? "";

  // 4. Fire welcome email to client
  if (tempPassword) {
    await sendWelcomeEmail({
      to: client_email,
      name: client_name,
      businessName: business_name,
      services: service_names ? service_names.split(", ") : services,
      tempPassword,
      loginUrl,
    });
  }

  // 5. Fire admin notification
  await sendAdminNotification({
    clientName: client_name,
    clientEmail: client_email,
    clientPhone: client_phone,
    businessName: business_name,
    services: service_names ? service_names.split(", ") : services,
    totalSetup,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: import("stripe").Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[webhook] signature verification failed:", err);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    try {
      await handleCheckoutComplete(
        event.data.object as import("stripe").Stripe.Checkout.Session
      );
    } catch (err) {
      console.error("[webhook] handleCheckoutComplete failed:", err);
      // Return 200 so Stripe doesn't retry — log the error internally
    }
  }

  // Silence unused import warning
  void SERVICE_MAP;

  return Response.json({ received: true });
}
