import { Metadata } from "next";
import RetailReadinessScorecard from "@/components/tools/RetailReadinessScorecard";
import { TrendingUp, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Retail Readiness Scorecard | Commerce Media Consulting Group",
  description: "Assess your CPG brand's readiness for retail expansion across four key dimensions: market proof, financial architecture, and sales infrastructure. Free, instant results.",
};

const whatYouGet = [
  "Your overall retail readiness score (0–100)",
  "Dimension-by-dimension breakdown with benchmarks",
  "Personalized priority recommendations",
  "Instant results — emailed or copied in one click",
];

export default function RetailReadinessPage() {
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
              <TrendingUp size={18} className="text-gold-400" />
            </div>
            <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">Free Assessment Tool</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Retail Readiness Scorecard
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8">
            Six questions. Instant score. Know exactly where your brand stands — and what to fix before your next category review.
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
            <RetailReadinessScorecard />
          </div>
        </div>
      </section>
    </>
  );
}
