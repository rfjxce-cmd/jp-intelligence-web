import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingDemo from "@/components/FloatingDemo";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "JP Intelligence — AI Automation for Local Businesses",
    template: "%s — JP Intelligence",
  },
  description:
    "JP Intelligence helps local businesses grow with AI-powered chatbots, ManyChat automation, call intelligence, and AI booking systems built and managed for you.",
  keywords: [
    "AI automation",
    "local business AI",
    "chatbot agency",
    "ManyChat automation",
    "AI booking system",
    "call intelligence",
    "Southern California",
  ],
  openGraph: {
    title: "JP Intelligence — AI Automation for Local Businesses",
    description:
      "Automate your business with AI. Chatbots, ManyChat flows, call intelligence, and booking systems built for local businesses.",
    siteName: "JP Intelligence",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JP Intelligence — AI Automation for Local Businesses",
    description: "AI-powered systems for local businesses. Chatbots, automation, call intelligence, and booking.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingDemo />
      </body>
    </html>
  );
}
