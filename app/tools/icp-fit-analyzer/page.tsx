import { Metadata } from "next";
import IcpFitAnalyzer from "@/components/tools/IcpFitAnalyzer";
import { Target, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "ICP & Deal Fit Analyzer | Commerce Media Consulting Group",
  description:
    "Are you chasing the right deals? Enter your recent closed-won and closed-lost deals and instantly see the win/loss patterns that refine your ICP beyond firmographics. Free, private, no signup.",
  alternates: { canonical: "/tools/icp-fit-analyzer" },
};

const whatYouGet = [
  "Win rate by industry, size, champion, and trigger",
  "The patterns behind your wins — and your leaks",
  "A data-backed ICP statement drawn from your own deals",
  "Instant, private results — copy or email in one click",
];

export default function IcpFitAnalyzerPage() {
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
              <Target size={18} className="text-gold-400" />
            </div>
            <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">Free Analyzer · For B2B Companies</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Are you chasing the right deals?
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8">
            Enter your recent closed-won and closed-lost deals. In a couple of minutes you'll see the patterns hiding in your pipeline — and the ideal customer profile your own data is pointing to.
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
            <IcpFitAnalyzer />
          </div>
        </div>
      </section>
    </>
  );
}
