import { Resend } from "resend";
import { render } from "@react-email/render";
import WelcomeEmail from "@/emails/welcome";
import BotReadyEmail from "@/emails/bot-ready";

const FROM = "JP Intelligence <noreply@jpintelligence.ai>";

function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set.");
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendWelcomeEmail(params: {
  to: string;
  name: string;
  businessName: string;
  services: string[];
  tempPassword: string;
  loginUrl: string;
}) {
  const html = await render(WelcomeEmail(params));
  return getResend().emails.send({
    from: FROM,
    to: params.to,
    subject: "Welcome to JP Intelligence — we're setting up your bot",
    html,
  });
}

export async function sendAdminNotification(params: {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  businessName: string;
  services: string[];
  totalSetup: number;
}) {
  const serviceList = params.services.join(", ");
  return getResend().emails.send({
    from: FROM,
    to: process.env.ADMIN_EMAIL!,
    subject: `New client: ${params.businessName} — $${params.totalSetup} setup`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; padding: 40px; border-radius: 12px;">
        <h2 style="color: #c9a84c; margin-bottom: 24px;">New Client Onboarded</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888;">Name</td><td style="padding: 8px 0; color: #f5f5f5; font-weight: 600;">${params.clientName}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0; color: #f5f5f5;">${params.clientEmail}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0; color: #f5f5f5;">${params.clientPhone}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Business</td><td style="padding: 8px 0; color: #f5f5f5;">${params.businessName}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Services</td><td style="padding: 8px 0; color: #c9a84c; font-weight: 600;">${serviceList}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Setup Paid</td><td style="padding: 8px 0; color: #f5f5f5; font-weight: 700; font-size: 18px;">$${params.totalSetup}</td></tr>
        </table>
        <p style="margin-top: 32px; padding: 16px; background: #1a1a1a; border-radius: 8px; color: #888; font-size: 14px;">
          Log in to the admin dashboard to start building their system.
        </p>
      </div>
    `,
  });
}

export async function sendBotReadyEmail(params: {
  to: string;
  name: string;
  businessName: string;
  embedCode: string;
  loomUrl: string;
}) {
  const html = await render(BotReadyEmail(params));
  return getResend().emails.send({
    from: FROM,
    to: params.to,
    subject: "Your AI chatbot is live — here's how to install it",
    html,
  });
}
