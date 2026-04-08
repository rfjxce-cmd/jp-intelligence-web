"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const services = [
  {
    id: "chatbot",
    icon: "💬",
    name: "AI Chatbot",
    setup: 250,
    monthly: 75,
    description: "24/7 lead capture & booking on your website",
  },
  {
    id: "manychat",
    icon: "📲",
    name: "ManyChat Automation",
    setup: 175,
    monthly: 55,
    description: "Instagram & Facebook DM automation flows",
  },
  {
    id: "call",
    icon: "📞",
    name: "Call Intelligence",
    setup: 600,
    monthly: 200,
    description: "Call recording, transcription & AI analysis",
  },
  {
    id: "booking",
    icon: "📅",
    name: "AI Booking System",
    setup: 450,
    monthly: 275,
    description: "Automated scheduling, reminders & no-shows",
  },
  {
    id: "full-stack",
    icon: "✦",
    name: "Full Stack Package",
    setup: 1200,
    monthly: 500,
    description: "All four systems — best value, saves $275 + $105/mo",
    badge: "Best Value",
  },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  website: string;
}

function GetStartedContent() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    website: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselected ? [preselected] : []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (preselected && !selectedServices.includes(preselected)) {
      setSelectedServices([preselected]);
    }
  }, [preselected]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalSetup = selectedServices.reduce((sum, id) => {
    const s = services.find((s) => s.id === id);
    return sum + (s?.setup ?? 0);
  }, 0);

  const totalMonthly = selectedServices.reduce((sum, id) => {
    const s = services.find((s) => s.id === id);
    return sum + (s?.monthly ?? 0);
  }, 0);

  function toggleService(id: string) {
    // Full stack is exclusive
    if (id === "full-stack") {
      setSelectedServices(["full-stack"]);
      return;
    }
    setSelectedServices((prev) => {
      const without = prev.filter((s) => s !== "full-stack");
      return without.includes(id)
        ? without.filter((s) => s !== id)
        : [...without, id];
    });
  }

  function validateStep1() {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim() || !formData.email.includes("@"))
      return "Please enter a valid email address.";
    if (!formData.phone.trim()) return "Please enter your phone number.";
    if (!formData.businessName.trim()) return "Please enter your business name.";
    return null;
  }

  function handleStep1Submit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateStep1();
    if (err) { setError(err); return; }
    setError("");
    setStep(2);
  }

  function handleStep2Submit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedServices.length === 0) {
      setError("Please select at least one service.");
      return;
    }
    setError("");
    setStep(3);
  }

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, selectedServices }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create checkout.");
      if (!data.url) throw new Error("No checkout URL returned.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  const stepLabels = ["Your Info", "Select Services", "Review & Pay"];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-grid" />

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/25 mb-3">
            Get Started
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Let&apos;s Build Your AI System
          </h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {stepLabels.map((label, i) => {
            const num = i + 1;
            const active = step === num;
            const done = step > num;
            return (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      done
                        ? "bg-white text-black"
                        : active
                        ? "bg-[#0a0a0a] border-2 border-white/40 text-white"
                        : "bg-[#080808] border border-[#1a1a1a] text-white/20"
                    }`}
                  >
                    {done ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : num}
                  </div>
                  <span
                    className={`text-xs mt-1.5 font-medium transition-colors duration-300 ${
                      active ? "text-white" : done ? "text-white/50" : "text-white/20"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div
                    className={`w-16 sm:w-24 h-px mx-2 mb-5 transition-all duration-500 ${
                      done ? "bg-white/40" : "bg-[#1a1a1a]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step 1: Business Info */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit}>
            <div className="bg-[#080808] border border-[#131313] rounded-2xl p-7 sm:p-9 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/25 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/25 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@yourbusiness.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/25 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/25 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Salon & Spa"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/25 mb-2">
                  Website <span className="text-white/20 normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://yourbusiness.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary w-full font-bold py-4 rounded-xl text-sm"
              >
                Continue to Services →
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Select Services */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit}>
            <div className="bg-[#080808] border border-[#131313] rounded-2xl p-7 sm:p-9">
              <p className="text-white/40 text-sm mb-6">
                Select one or more services. You can always add more later.
              </p>

              <div className="space-y-3 mb-6">
                {services.map((service) => {
                  const selected = selectedServices.includes(service.id);
                  return (
                    <button
                      type="button"
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${
                        selected
                          ? "border-white/30 bg-white/[0.03]"
                          : "border-[#131313] bg-black/30 hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                          <span className="text-2xl">{service.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold text-sm ${selected ? "text-white" : "text-white/40"}`}>
                                {service.name}
                              </span>
                              {"badge" in service && service.badge && (
                                <span className="text-xs bg-white text-black px-2 py-0.5 rounded-full font-semibold">
                                  {service.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-white/25 mt-0.5">
                              {service.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className={`font-bold text-sm ${selected ? "text-white" : "text-white/35"}`}>
                            ${service.setup}
                          </p>
                          <p className="text-xs text-white/20">${service.monthly}/mo</p>
                        </div>
                      </div>

                      {selected && (
                        <div className="mt-3 pt-3 border-t border-white/8 flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs text-white/60 font-medium">Selected</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedServices.length > 0 && (
                <div className="bg-black border border-[#131313] rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/25">Setup total</span>
                    <span className="font-bold text-white">${totalSetup}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1.5">
                    <span className="text-white/25">Monthly total</span>
                    <span className="text-white/40">${totalMonthly}/mo</span>
                  </div>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg px-4 py-3 mb-4">
                  {error}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setStep(1); setError(""); }}
                  className="flex-1 border border-[#1a1a1a] text-white/35 hover:text-white hover:border-[#222222] font-medium py-4 rounded-xl text-sm transition-all"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex-2 btn-primary font-bold py-4 rounded-xl text-sm flex-1"
                  disabled={selectedServices.length === 0}
                >
                  Review Order →
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 3: Review & Pay */}
        {step === 3 && (
          <div className="bg-[#080808] border border-[#131313] rounded-2xl p-7 sm:p-9">
            <div className="space-y-6 mb-8">
              {/* Contact summary */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-3">
                  Contact Info
                </p>
                <div className="bg-black/30 border border-[#131313] rounded-xl p-4 text-sm space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-white/25">Name</span>
                    <span className="text-white">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/25">Email</span>
                    <span className="text-white">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/25">Phone</span>
                    <span className="text-white">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/25">Business</span>
                    <span className="text-white">{formData.businessName}</span>
                  </div>
                  {formData.website && (
                    <div className="flex justify-between">
                      <span className="text-white/25">Website</span>
                      <span className="text-white">{formData.website}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-white/60 hover:text-white/80 mt-2 transition-colors"
                >
                  Edit
                </button>
              </div>

              {/* Order summary */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-3">
                  Order Summary
                </p>
                <div className="space-y-2">
                  {selectedServices.map((id) => {
                    const s = services.find((s) => s.id === id)!;
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between bg-black/30 border border-[#131313] rounded-xl px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span>{s.icon}</span>
                          <span className="text-sm text-white font-medium">{s.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">${s.setup}</p>
                          <p className="text-xs text-white/20">${s.monthly}/mo after</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-white/60 hover:text-white/80 mt-2 transition-colors"
                >
                  Edit services
                </button>
              </div>

              {/* Total */}
              <div className="bg-white/[0.02] border border-white/8 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm">Due today (setup fee)</span>
                  <span className="text-2xl font-bold text-white">${totalSetup}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-white/25 text-xs">Monthly after setup</span>
                  <span className="text-white/40 text-sm">${totalMonthly}/mo</span>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg px-4 py-3 mb-4">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setStep(2); setError(""); }}
                className="border border-[#1a1a1a] text-white/35 hover:text-white hover:border-[#222222] font-medium py-4 px-6 rounded-xl text-sm transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="btn-primary flex-1 font-bold py-4 rounded-xl text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Redirecting to payment…" : `Pay $${totalSetup} Setup Fee →`}
              </button>
            </div>

            <p className="mt-4 text-xs text-[#333333] text-center">
              Secured by Stripe · Setup fee only — no subscription charged today
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><div className="text-white/25">Loading…</div></div>}>
      <GetStartedContent />
    </Suspense>
  );
}
