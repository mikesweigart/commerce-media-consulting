"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Target,
  Users,
  BookOpen,
  Layers,
  BarChart2,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";

const partColors = [
  { iconBgOpen: "bg-blue-500",   iconBgClosed: "bg-blue-100",   iconColorOpen: "text-white", iconColorClosed: "text-blue-700",   borderOpen: "border-blue-300 shadow-blue-500/8" },
  { iconBgOpen: "bg-violet-500", iconBgClosed: "bg-violet-100", iconColorOpen: "text-white", iconColorClosed: "text-violet-700", borderOpen: "border-violet-300 shadow-violet-500/8" },
  { iconBgOpen: "bg-emerald-500",iconBgClosed: "bg-emerald-100",iconColorOpen: "text-white", iconColorClosed: "text-emerald-700",borderOpen: "border-emerald-300 shadow-emerald-500/8" },
  { iconBgOpen: "bg-orange-500", iconBgClosed: "bg-orange-100", iconColorOpen: "text-white", iconColorClosed: "text-orange-700", borderOpen: "border-orange-300 shadow-orange-500/8" },
  { iconBgOpen: "bg-gold-500",   iconBgClosed: "bg-gold-100",   iconColorOpen: "text-navy-900",iconColorClosed: "text-gold-700", borderOpen: "border-gold-300 shadow-gold-500/8" },
];

const parts = [
  {
    number: "01",
    icon: Target,
    title: "Strategic Positioning & Right-to-Win",
    tagline: "Know exactly where you win and why — with a narrative your whole team can deliver.",
    what: "We start by analyzing your win/loss patterns, competitive landscape, and customer data to identify the 2–3 segments where you have a genuine right-to-win. Then we build the positioning brief, value narrative, and proof architecture that makes your differentiation tangible and executable.",
    why: "Most B2B companies sound like their competitors. When buyers can't tell you apart, they default to price. Sharp positioning is the single highest-leverage input to win rate improvement — and it's the foundation everything else is built on.",
    deliverables: [
      "Positioning Brief & Right-to-Win Narrative",
      "3–5 Value Pillar One-Pagers with Quantified Proof Points",
      "Competitive Positioning Map",
      "Team Messaging Guide (for Sales, Marketing, and Leadership)",
    ],
    cadence: "2–3 week sprint. 4–6 stakeholder interviews, competitor analysis, win/loss review, and two rounds of iteration with your team.",
    outcome: "Your entire team delivers a consistent, compelling positioning narrative in every conversation — and win rates improve as buyers understand your differentiation within the first meeting.",
  },
  {
    number: "02",
    icon: Users,
    title: "ICP, Personas & Pricing/ROI",
    tagline: "Spend 80% of your resources on the accounts with 3–5x higher LTV/CAC.",
    what: "We analyze your top 20 customers by LTV, identify the firmographic and behavioral patterns that predict high-fit, high-win accounts, and build a scoring model your team can use in real-time qualification. We also build persona playbooks for each key buyer type and a quantified ROI/value model that transforms pricing conversations.",
    why: "Most B2B companies define their ICP by demographics alone — and spend enormous resources pursuing low-fit accounts. A behaviorally-enriched ICP combined with a quantified value model changes both what your team pursues and how they convert it.",
    deliverables: [
      "ICP Scorecard & Tiering Model (Tier 1/2/3 Accounts)",
      "3–5 Persona Playbooks with Trigger Language and Objection Handling",
      "Behavioral and Technographic Signal Library",
      "ROI/Value Calculator (Excel and Web-Embeddable Versions)",
      "Economic Value Estimation Model",
    ],
    cadence: "2 weeks. Requires access to CRM data and customer interviews (5–7). Output refined with input from sales and marketing leadership.",
    outcome: "Reps spend their time on accounts that close. Pricing conversations shift from discounting to value verification. Win rates in Tier 1 accounts increase 25–40%.",
  },
  {
    number: "03",
    icon: BookOpen,
    title: "Commercial System & Sales Playbook",
    tagline: "Codify the behaviors of your top performers and make them transferable across the team.",
    what: "We run structured win/loss interviews with your top performers and recent buyers, then codify the results into a comprehensive commercial playbook: qualification framework, discovery playbook, demo framework, objection handling guide, competitive plays, and multi-threading/negotiation approaches.",
    why: "Your best reps have a system. They just can't describe it. When that system lives in their heads and nowhere else, new hires take 9–12 months to ramp and mid-tier reps never reach their potential. A well-built playbook is the highest-ROI enablement investment most companies can make.",
    deliverables: [
      "Full Commercial Sales Playbook (Qualifying through Closing)",
      "Discovery Question Framework by Persona",
      "Demo Flow and Presentation Framework",
      "Objection Handling Guide (10–15 Common Objections)",
      "Competitive Battle Cards (3–5 Competitors)",
      "Multi-Threading and Executive Engagement Guide",
      "Negotiation and Pricing Conversation Framework",
    ],
    cadence: "3–4 weeks. Requires interviews with 3 top reps, 5–8 recent buyers, and 2–3 lost deals. Built collaboratively with your sales leadership.",
    outcome: "New rep ramp time drops 30–50%. Mid-tier reps improve win rates 15–25%. Quota attainment increases across the team within 2 quarters of adoption.",
  },
  {
    number: "04",
    icon: Layers,
    title: "Buyer's-Journey Collateral & Campaigns",
    tagline: "Run campaigns that deliver what buyers actually need, when they need it — not just traffic.",
    what: "We audit your existing content against the five stages of the buyer's journey, identify the gaps (typically in middle-funnel stages where buyers make actual decisions), and build 2–3 structured campaign blueprints with a complete collateral map. Each campaign is tied to a specific ICP segment and designed to accelerate a specific pipeline stage.",
    why: "Most B2B marketing is concentrated at Stage 1 (awareness) and Stage 5 (demos/pricing). The middle stages — where buyers are educating themselves and building internal consensus — are dramatically underserved. Companies that serve the middle of the funnel see 40–60% better pipeline conversion rates.",
    deliverables: [
      "Buyer's-Journey Content Audit & Gap Analysis",
      "Content Map by Stage, ICP Segment, and Persona",
      "2–3 Campaign Blueprints (4–6 Week Structured Programs)",
      "Campaign Brief with Messaging, Assets, Distribution, and KPIs",
      "Priority Content Production List (10–15 Assets)",
    ],
    cadence: "2–3 weeks for audit and blueprints. Content production timeline depends on resources available and asset complexity.",
    outcome: "Marketing activity is directly connected to pipeline progression. Content-influenced opportunities close at higher rates and faster than non-influenced opportunities.",
  },
  {
    number: "05",
    icon: BarChart2,
    title: "Pipeline, Rhythm & Experimentation",
    tagline: "Move from hope-based to data-backed forecasting — and build a system that gets better every quarter.",
    what: "We design your pipeline management infrastructure: stage exit criteria, coverage model, forecast methodology, and deal health scoring. Then we implement the weekly operating rhythm — specific meetings, metrics, and decisions — that holds the system together. Finally, we build an experiment backlog and experimentation operating rhythm that allows your team to continuously compound results.",
    why: "The fifth part is what makes the first four sustainable. Without a structured operating rhythm, positioning and playbooks drift. Without a forecasting model grounded in data, boards can't trust the GTM story. And without systematic experimentation, you can't compound results quarter over quarter.",
    deliverables: [
      "Stage Exit Criteria Framework (Buyer-Centric Qualification)",
      "Pipeline Coverage Model and Ratio Targets by Segment",
      "Forecast Methodology and Confidence-Scoring Framework",
      "Weekly Operating Rhythm Template (Meetings, Agendas, Metrics)",
      "KPI Dashboard with 5 Key Commercial Metrics",
      "Experiment Backlog Starter (20–40 Prioritized Hypotheses)",
      "Experimentation Operating Rhythm and Review Process",
    ],
    cadence: "2 weeks for design, 4–6 weeks for implementation. Requires CRM access and weekly check-ins with your CRO and VP Revenue Operations.",
    outcome: "Forecast accuracy improves from ±30–40% to ±10–15% within two quarters. Boards gain confidence in the GTM narrative. Experimentation velocity increases 5–8x in the first year.",
  },
];

export default function HowWeWork() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">
                  The Framework
                </span>
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                The Revenue Architecture
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Not a set of tactics. A complete, sequenced operating model — built
                for your specific business, implemented with your team, and designed to
                compound results quarter over quarter.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.25 }}
              className="hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
                <Image
                  src="/dontalkingtogroup.png"
                  alt="Don Knapp presenting to a client team"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white/80 text-xs font-medium">
                    Don works directly with your leadership team — not just as an advisor, but as an embedded implementation partner.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Framework sections */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {parts.map((part, i) => {
              const isOpen = activeIndex === i;
              const colors = partColors[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? `${colors.borderOpen} shadow-lg` : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <button
                    className="w-full flex items-center gap-5 p-7 text-left"
                    onClick={() => setActiveIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? colors.iconBgOpen : colors.iconBgClosed
                    }`}>
                      <part.icon size={20} className={isOpen ? colors.iconColorOpen : colors.iconColorClosed} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-300">Part {part.number}</span>
                      </div>
                      <h3 className="font-heading font-bold text-navy-900 text-lg leading-snug">
                        {part.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">{part.tagline}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown size={20} className={isOpen ? "text-gold-500" : "text-gray-400"} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <div className="border-t border-gray-100 px-7 pb-7 pt-6">
                          <div className="grid md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="font-heading font-semibold text-navy-900 text-sm mb-2">What We Do</h4>
                              <p className="text-gray-600 text-sm leading-relaxed mb-5">{part.what}</p>
                              <h4 className="font-heading font-semibold text-navy-900 text-sm mb-2">Why It Matters</h4>
                              <p className="text-gray-600 text-sm leading-relaxed">{part.why}</p>
                            </div>
                            <div>
                              <h4 className="font-heading font-semibold text-navy-900 text-sm mb-3">Deliverables</h4>
                              <ul className="flex flex-col gap-2 mb-5">
                                {part.deliverables.map((d, di) => (
                                  <li key={di} className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle2 size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                              <div className="bg-cream-50 rounded-xl p-4 border border-cream-200 mb-4">
                                <span className="text-xs font-semibold text-navy-700 block mb-1">Cadence</span>
                                <p className="text-xs text-gray-600 leading-relaxed">{part.cadence}</p>
                              </div>
                              <div className="bg-gold-50 rounded-xl p-4 border border-gold-200">
                                <span className="text-xs font-semibold text-gold-700 block mb-1">Expected Outcome</span>
                                <p className="text-xs text-gray-700 leading-relaxed">{part.outcome}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
            Want to see how this framework applies to your business?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Start with the 3-minute Growth Audit or book a strategy session directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/growth-audit"
              className="group flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 text-[15px]"
            >
              Start the Growth Audit
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/book-a-call"
              className="flex items-center justify-center gap-2 border border-navy-200 hover:border-navy-400 text-navy-700 font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-sm"
            >
              Book a Strategy Session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
