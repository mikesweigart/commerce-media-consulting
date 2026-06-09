import { Metadata } from "next";
import GtmPredictabilityScorecard from "@/components/tools/GtmPredictabilityScorecard";
import { BarChart2, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "GTM Predictability Scorecard | Commerce Media Consulting Group",
  description:
    "How predictable is your revenue engine? Answer 15 questions and get a GTM Predictability Score (0–100), sub-scores across the 5 parts of the Revenue Architecture, and 3 concrete improvement moves — free, instant, no signup.",
  alternates: { canonical: "/tools/gtm-predictability" },
};

const whatYouGet = [
  "Your overall GTM Predictability Score (0–100)",
  "Sub-scores across all 5 parts of the Revenue Architecture",
  "Your highest-leverage improvement moves, ranked",
  "Instant results — no signup, emailed or copied in one click",
];

export default function GtmPredictabilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
              <BarChart2 size={18} className="text-gold-400" />
            </div>
            <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">Free Assessment · For B2B Companies</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            How predictable is your revenue engine?
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8">
            Fifteen questions, about ten minutes. Get a GTM Predictability Score and the three moves that will tighten it the fastest — scored across the five parts of the Revenue Architecture.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl">
            {whatYouGet.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-10">
            <GtmPredictabilityScorecard />
          </div>
        </div>
      </section>
    </>
  );
}
