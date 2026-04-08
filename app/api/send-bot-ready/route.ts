import { NextRequest } from "next/server";
import { sendBotReadyEmail } from "@/lib/email";

interface BotReadyBody {
  clientEmail: string;
  clientName: string;
  businessName: string;
  embedCode: string;
  loomUrl: string;
  adminSecret?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BotReadyBody;
    const { clientEmail, clientName, businessName, embedCode, loomUrl, adminSecret } = body;

    // Simple shared-secret guard so this route can't be called publicly
    const expectedSecret = process.env.ADMIN_API_SECRET;
    if (expectedSecret && adminSecret !== expectedSecret) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!clientEmail || !clientName || !businessName || !embedCode) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    await sendBotReadyEmail({
      to: clientEmail,
      name: clientName,
      businessName,
      embedCode,
      loomUrl: loomUrl || "",
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("[send-bot-ready]", err);
    const message = err instanceof Error ? err.message : "Internal server error.";
    return Response.json({ error: message }, { status: 500 });
  }
}
