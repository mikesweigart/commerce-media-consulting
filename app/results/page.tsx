import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MotionDiv } from "@/components/ui/Motion";
import { ArrowRight, TrendingUp, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Results",
  description:
    "See the GTM outcomes Commerce Media Consulting Group has delivered for B2B clients — improved win rates, faster pipeline, and board-ready forecasts.",
};

const metrics = [
  { value: "+34%", label: "Average Win Rate Increase", timeframe: "Over 12 months" },
  { value: "−41%", label: "Reduction in CAC Payback", timeframe: "Compared to pre-engagement baseline" },
  { value: "+22%", label: "Average NRR Improvement", timeframe: "12 months post-implementation" },
  { value: "90 Days", label: "To First Measurable Results", timeframe: "From engagement kickoff" },
  { value: "47+", label: "GTM Systems Built", timeframe: "Across 6 years of practice" },
  { value: "$2.4B+", label: "Revenue Influenced", timeframe: "Cumulative across all client engagements" },
];

const caseStudies = [
  {
    company: "Series B SaaS Platform",
    segment: "SaaS · 80 employees · $6M ARR",
    situation: "A B2B analytics platform had strong product-market fit in their founding customer segment but was struggling to grow beyond it. Win rates were 14%, ramp time for new reps was 11 months, and the forecast changed by 40%+ most quarters.",
    plan: "Started with a positioning sprint and ICP validation exercise, then rebuilt the commercial playbook based on win/loss interviews. Implemented a pipeline coverage model and weekly operating rhythm in month 3.",
    results: [
      { metric: "+28%", label: "Win rate improvement (14% → 36%)" },
      { metric: "−45%", label: "New rep ramp time (11 → 6 months)" },
      { metric: "+$2.1M", label: "ARR added in the 12 months following engagement" },
      { metric: "±11%", label: "Forecast accuracy (from ±42%)" },
    ],
    timeframe: "12-month engagement",
  },
  {
    company: "B2B Professional Services Firm",
    segment: "Services · 45 employees · $4M ARR",
    situation: "A revenue operations consultancy was growing through referrals but couldn't build a repeatable pipeline engine. They had no structured outbound motion, no defined ICP, and content that didn't generate meaningful inbound activity.",
    plan: "Built an ICP scoring model from a customer analysis, developed an outbound sequencing framework, and created a middle-funnel content program specifically designed for revenue operations buyers. Implemented a weekly experiment rhythm.",
    results: [
      { metric: "+73%", label: "Qualified meetings from outbound (quarter over quarter)" },
      { metric: "+$3.1M", label: "ARR in 18 months (from $4M to $7.1M)" },
      { metric: "−35%", label: "CAC payback period" },
      { metric: "4.2x", label: "Increase in content-influenced pipeline" },
    ],
    timeframe: "18-month engagement",
  },
  {
    company: "Healthcare Technology Company",
    segment: "SaaS · 120 employees · $18M ARR",
    situation: "A healthcare IT company had inconsistent messaging across regions and a sales team where top performers were outperforming mid-tier reps by 3x. NRR was declining as the company expanded into new segments without a clear ICP.",
    plan: "Rebuilt positioning for three distinct ICP segments, created persona-specific playbooks for each segment, and implemented a tiered ICP scoring model to ensure reps focused on high-fit accounts. Built a structured customer success playbook to stabilize NRR.",
    results: [
      { metric: "+19%", label: "Average win rate improvement across all regions" },
      { metric: "+14%", label: "NRR improvement (from 91% to 105%)" },
      { metric: "−38%", label: "Reduction in low-fit deals in pipeline" },
      { metric: "+$6.4M", label: "Net new ARR in 12 months" },
    ],
    timeframe: "12-month engagement",
  },
];

const testimonials = [
  {
    quote: "Don's five-part framework gave us our first truly repeatable quarter. Win rates are up 28% and my forecast finally matches reality at the end of the quarter. I stopped dreading board meetings.",
    name: "Sarah Chen",
    title: "CRO, Series B SaaS Platform",
    initials: "SC",
  },
  {
    quote: "I hired Don when we were at $4M ARR and couldn't figure out why growth had stalled. Six months later we're at $7M and have a real commercial engine. The ROI is not close.",
    name: "James Park",
    title: "CEO, B2B Professional Services",
    initials: "JP",
  },
  {
    quote: "The positioning work alone was worth the entire engagement. We went from 'we do X for companies' to a crystal-clear narrative my entire team delivers consistently. Deals close faster now because buyers understand us faster.",
    name: "Maria Torres",
    title: "VP Revenue, Healthcare Technology",
    initials: "MT",
  },
];

export default function Results() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <MotionDiv
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-white/10"
                style={{ transform: "scaleX(-1)" }}
              >
                <Image
                  src="/donimagetalking.png"
                  alt="Don Knapp walking a client team through the Revenue Architecture framework"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
              </div>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">
                  Proof It Works
                </span>
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Results our clients see in 6–24 months.
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Every metric below comes from an actual client engagement. No aggregated
                industry benchmarks — just what happened when a real team implemented the
                Revenue Architecture in their specific business.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border border-gray-100 hover:border-gold-200 hover:shadow-lg hover:shadow-gold-500/8 transition-all duration-300 text-center group"
              >
                <div className="font-heading text-5xl font-bold text-gold-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {m.value}
                </div>
                <div className="font-semibold text-navy-900 text-sm mb-1">{m.label}</div>
                <div className="text-gray-400 text-xs">{m.timeframe}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">
              Client Stories
            </span>
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900 mb-12 leading-tight">
            Situation → Plan → Results
          </h2>
          <div className="flex flex-col gap-8">
            {caseStudies.map((cs, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gold-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-navy-900 px-7 py-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-white text-base">{cs.company}</h3>
                    <p className="text-white/65 text-xs mt-0.5">{cs.segment}</p>
                  </div>
                  <span className="text-gold-400 text-xs font-semibold bg-gold-500/10 px-3 py-1.5 rounded-full">
                    {cs.timeframe}
                  </span>
                </div>
                <div className="p-7">
                  <div className="grid md:grid-cols-3 gap-7">
                    <div>
                      <h4 className="font-heading font-semibold text-navy-900 text-sm mb-2">The Situation</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{cs.situation}</p>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-navy-900 text-sm mb-2">The Plan</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{cs.plan}</p>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-navy-900 text-sm mb-2">The Results</h4>
                      <div className="flex flex-col gap-2">
                        {cs.results.map((r, ri) => (
                          <div key={ri} className="flex items-start gap-2">
                            <span className="font-bold text-gold-600 text-sm flex-shrink-0 min-w-[48px]">{r.metric}</span>
                            <span className="text-gray-600 text-sm leading-snug">{r.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white text-center mb-14">
            What clients say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/8 border border-white/10 rounded-2xl p-7 flex flex-col">
                <Quote size={20} className="text-gold-500 mb-4" />
                <p className="text-white/75 text-sm leading-relaxed flex-1 mb-6 italic">{t.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center font-bold text-navy-900 text-xs">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold">{t.name}</div>
                    <div className="text-white/65 text-[11px]">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] order-2 lg:order-1">
              <Image
                src="/donanotherimage.png"
                alt="Don Knapp, Managing Partner"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
                Want results like these for your business?
              </h2>
              <p className="text-gray-500 text-lg mb-8">
                Book a strategy session and see how the Revenue Architecture applies to your specific GTM situation.
              </p>
              <Link
                href="/book-a-call"
                className="group inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-10 py-4 rounded-xl transition-all duration-200 text-[15px]"
              >
                Book a Strategy Session
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="text-gray-400 text-xs mt-4">Free · No obligation · Responds within 24 hours</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
