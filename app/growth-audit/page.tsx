import { Metadata } from "next";
import GrowthAudit from "@/components/GrowthAudit";

export const metadata: Metadata = {
  title: "Growth Audit",
  description:
    "Take the 3-minute B2B growth audit and get a personalized snapshot of where your GTM system stands across the 5 key parts — with specific recommendations for your situation.",
};

export default function GrowthAuditPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 pt-32 pb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">
              3-Minute Assessment
            </span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Get Your GTM Growth Snapshot
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Answer 4 short questions and receive a personalized assessment of where
            your GTM system stands across the 5-part framework — with specific
            recommendations for your situation.
          </p>
        </div>
      </section>

      {/* Survey */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <GrowthAudit />
        </div>
      </section>
    </>
  );
}
