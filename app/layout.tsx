import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "JP Intelligence — AI Automation for Local Businesses",
  description:
    "JP Intelligence helps local businesses grow with AI-powered chatbots, ManyChat automation, call intelligence, and AI booking systems.",
  openGraph: {
    title: "JP Intelligence — AI Automation for Local Businesses",
    description:
      "Automate your business with AI. Chatbots, ManyChat flows, call intelligence, and booking systems built for local businesses.",
    siteName: "JP Intelligence",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f5f5f5]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
