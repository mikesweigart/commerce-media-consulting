import { Metadata } from "next";
import Link from "next/link";
import { MotionDiv } from "@/components/ui/Motion";
import { ArrowRight, TrendingUp, GitBranch, Search, CheckCircle2, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Free B2B & CPG Strategy Tools | Commerce Media Consulting Group",
  description: "Free interactive diagnostic tools for B2B and CPG leaders: assess your GTM readiness, prioritize channels, and surface your highest-leverage growth opportunities — with instant results.",
};

const tools = [
  {
    href: "/tools/retail-readiness",
    icon: TrendingUp,
    badge: "Retail Strategy",
    audience: "For CPG Brands",
    audienceColor: "bg-orange-100 text-orange-700",
    title: "Retail Readiness Scorecard",
    description: "Six questions that reveal exactly where your brand stands before your next category review — scored across market proof, financial architecture, and sales infrastructure.",
    time: "4 minutes",
    outputs: [
      "Overall readiness score (0–100) with tier rating",
      "Dimension-by-dimension breakdown vs. benchmarks",
      "3–4 personalized priority recommendations",
      "Emailable or copyable results report",
    ],
    cta: "Take the Scorecard",
    color: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-200/60",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    href: "/tools/channel-prioritization",
    icon: GitBranch,
    badge: "Channel Strategy",
    audience: "For CPG Brands",
    audienceColor: "bg-orange-100 text-orange-700",
    title: "Channel Prioritization Matrix",
    description: "Eight questions that rank all eight major retail and DTC channels by compatibility with your specific brand profile, strategic goals, and operational capacity — so you invest where it counts.",
    time: "5 minutes",
    outputs: [
      "All 8 channels ranked by compatibility score",
      "Top 3 channels with 90-day action plans",
      "Investment ranges and traffic-light readiness signals",
      "Emailable or copyable channel map",
    ],
    cta: "Get Your Channel Map",
    color: "from-gold-500/10 to-gold-600/5",
    border: "border-gold-200/60",
    iconBg: "bg-gold-100",
    iconColor: "text-gold-700",
    badgeColor: "bg-gold-100 text-gold-700",
  },
  {
    href: "/growth-audit",
    icon: Search,
    badge: "GTM Diagnosis",
    audience: "For B2B Companies",
    audienceColor: "bg-emerald-100 text-emerald-700",
    title: "3-Minute Growth Audit",
    description: "A rapid diagnostic that surfaces exactly where your go-to-market is leaking revenue — across positioning, sales motion, pipeline health, and marketing alignment.",
    time: "3 minutes",
    outputs: [
      "Personalized GTM gap analysis across 5 framework parts",
      "Ranked list of your highest-leverage fixes",
      "Clear next step based on your specific situation",
      "Option to book a free 45-min debrief with Don",
    ],
    cta: "Start the Audit",
    color: "from-emerald-500/10 to-emerald-600/5",
    border: "border-emerald-200/60",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
];

const stats = [
  { value: "4–5 min", label: "Average completion time" },
  { value: "Instant", label: "Results — no waiting" },
  { value: "Free", label: "No credit card, no obligation" },
  { value: "1-click", label: "Email or copy your results" },
];

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">Free Strategy Tools</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Answers before<br className="hidden lg:block" /> the conversation.
            </h1>
            <p className="text-white/80 text-xl leading-relaxed mb-4 max-w-2xl">
              Three free diagnostic tools for B2B and CPG leaders. Know exactly where you stand, which channels to prioritize, and what to fix — before your next buyer meeting.
            </p>
            <p className="text-white/55 text-sm leading-relaxed mb-10 max-w-2xl">
              Commerce Media Consulting Group serves B2B companies through our GTM advisory practice and CPG brands through our retail strategy consulting. These tools serve both markets — each labeled so you can go straight to the one that fits.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <MotionDiv
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="font-heading font-bold text-gold-400 text-xl mb-1">{stat.value}</div>
                  <div className="text-white/65 text-xs">{stat.label}</div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`bg-gradient-to-br ${tool.color} border ${tool.border} rounded-2xl p-8 lg:p-10 flex flex-col`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center`}>
                    <tool.icon size={22} className={tool.iconColor} />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${tool.badgeColor}`}>{tool.badge}</span>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${tool.audienceColor}`}>{tool.audience}</span>
                  </div>
                </div>

                <h2 className="font-heading text-2xl font-bold text-navy-900 mb-3">{tool.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-7">{tool.description}</p>

                <div className="mb-7 flex-1">
                  <div className="text-xs font-bold text-navy-900 uppercase tracking-widest mb-4">What you get</div>
                  <div className="flex flex-col gap-2.5">
                    {tool.outputs.map((output, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className={tool.iconColor} />
                        <span className="text-gray-600 text-sm">{output}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Clock size={13} />
                    <span>{tool.time}</span>
                  </div>
                  <Link
                    href={tool.href}
                    className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm group"
                  >
                    {tool.cta}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy-900 mb-4">
            Want someone to interpret your results with you?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            These tools give you the diagnosis. A strategy session with Don turns the diagnosis into a specific 90-day action plan — tailored to your brand, your channels, and your next growth target.
          </p>
          <Link
            href="/book-a-call"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-gold-500/20 text-sm"
          >
            Book a Free Strategy Session
            <ArrowRight size={16} />
          </Link>
          <p className="text-gray-400 text-xs mt-4">Free · No obligation · Responds within 24 hours</p>
        </div>
      </section>
    </>
  );
}
