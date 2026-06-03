"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function InsightsNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // In production: POST to your email list provider (Mailchimp, ConvertKit, etc.)
    // For now: mailto fallback so Don receives the signup
    window.location.href = `mailto:don.knapp.cmcg@gmail.com?subject=GTM%20Framework%20Newsletter%20Signup&body=New%20subscriber%3A%20${encodeURIComponent(email)}`;
    setSubmitted(true);
  }

  return (
    <section className="py-16 bg-navy-900 border-t border-white/10">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        {submitted ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
              <CheckCircle2 size={26} className="text-gold-400" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">You&apos;re in.</h3>
            <p className="text-white/65 text-sm leading-relaxed">
              Don&apos;s first framework is on its way. Check your inbox — and add{" "}
              <span className="text-gold-400">don.knapp.cmcg@gmail.com</span> to your contacts
              so it doesn&apos;t land in spam.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">
                Weekly Frameworks
              </span>
              <div className="h-px w-8 bg-gold-500" />
            </div>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-3">
              One GTM framework a week. Straight from the field.
            </h2>
            <p className="text-white/65 text-sm leading-relaxed mb-8">
              20 years of building commercial systems, compressed into one actionable insight per week.
              No filler, no generic advice — just what works for B2B companies at $2M–$100M ARR.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/35 text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                required
              />
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm whitespace-nowrap"
              >
                Subscribe
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
            {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
            <p className="text-white/30 text-xs mt-4">No spam. Unsubscribe any time.</p>
          </>
        )}
      </div>
    </section>
  );
}
