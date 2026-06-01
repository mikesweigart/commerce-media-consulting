"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Copy, Check, Calendar, TrendingUp, DollarSign, Users } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────

const CATEGORIES = ["Beverage", "Snack & Confection", "Refrigerated / Fresh", "Personal Care & Beauty", "Household", "Pet", "Baby & Family", "Health & Wellness", "Other"];
const STAGES = [
  { label: "Pre-launch", sub: "Not yet in retail" },
  { label: "Early Traction", sub: "$0–$2M" },
  { label: "Growth", sub: "$2M–$10M" },
  { label: "Scale", sub: "$10M–$30M" },
  { label: "Established", sub: "$30M+" },
];

interface QOption { label: string; description?: string; points: number; }
interface Question { id: string; section: "marketProof" | "financial" | "salesInfra"; label: string; sublabel?: string; options: QOption[]; maxPoints: number; }

const QUESTIONS: Question[] = [
  {
    id: "velocity", section: "marketProof",
    label: "Average weekly velocity per store",
    sublabel: "Units sold per week, per store, averaged across your current distribution",
    maxPoints: 25,
    options: [
      { label: "No data yet / just launched", description: "Haven't measured or too early for reliable data", points: 0 },
      { label: "1–4 units / week", description: "Early signal — building consumer awareness", points: 5 },
      { label: "5–9 units / week", description: "Respectable velocity — buyers are paying attention", points: 12 },
      { label: "10–19 units / week", description: "Strong performance — expansion-ready signal", points: 20 },
      { label: "20+ units / week", description: "Priority SKU territory — major retailers take notice", points: 25 },
    ],
  },
  {
    id: "repeatRate", section: "marketProof",
    label: "Verified consumer repeat purchase rate",
    sublabel: "% of first-time buyers who purchase again within 90 days",
    maxPoints: 10,
    options: [
      { label: "Don't track it yet", points: 0 },
      { label: "Less than 20%", description: "Below average for most CPG categories", points: 3 },
      { label: "20–35%", description: "Solid repeat — demonstrates product-market fit", points: 6 },
      { label: "35%+", description: "Exceptional loyalty — a powerful retail pitch asset", points: 10 },
    ],
  },
  {
    id: "grossMargin", section: "financial",
    label: "Gross margin before trade spend",
    sublabel: "Net revenue minus COGS, as a % of net revenue",
    maxPoints: 22,
    options: [
      { label: "Under 30%", description: "Significant constraint on retail viability", points: 0 },
      { label: "30–40%", description: "Tight but workable for select channel types", points: 3 },
      { label: "40–50%", description: "Adequate for regional grocery and specialty", points: 8 },
      { label: "50–60%", description: "Strong foundation for most retail channels", points: 15 },
      { label: "60%+", description: "Excellent economics — broad channel optionality", points: 22 },
    ],
  },
  {
    id: "channelMargin", section: "financial",
    label: "Can you support standard retailer margins (30–50% of MSRP)?",
    sublabel: "After factoring in your current pricing and landed cost",
    maxPoints: 13,
    options: [
      { label: "No — margins don't allow it at current pricing", points: 0 },
      { label: "Marginally — would require price increases or cost reduction", points: 4 },
      { label: "Yes for some channel types (specialty, natural)", points: 9 },
      { label: "Yes comfortably across most conventional grocery channels", points: 13 },
    ],
  },
  {
    id: "salesResources", section: "salesInfra",
    label: "Current sales team and broker coverage",
    sublabel: "Resources dedicated to retail sales and account management",
    maxPoints: 20,
    options: [
      { label: "No dedicated sales — founder-led", points: 0 },
      { label: "1–2 internal salespeople", description: "Beginning to build sales infrastructure", points: 3 },
      { label: "Regional broker network in place", description: "Commission-based field representation", points: 8 },
      { label: "Multi-region brokers + internal KAM(s)", description: "Blended model covering major accounts", points: 15 },
      { label: "Full regional or national sales organization", points: 20 },
    ],
  },
  {
    id: "distribution", section: "salesInfra",
    label: "Distributor relationships in place",
    sublabel: "Your current wholesale distribution infrastructure",
    maxPoints: 10,
    options: [
      { label: "No distributor relationships yet", points: 0 },
      { label: "1–2 local or regional distributors", points: 2 },
      { label: "Regional UNFI or KeHE coverage", description: "Access to natural/specialty or conventional chains", points: 5 },
      { label: "National UNFI and/or KeHE coverage", description: "Full national distribution infrastructure", points: 10 },
    ],
  },
];

const SECTIONS = [
  { key: "marketProof", label: "Market Proof", icon: TrendingUp, max: 35 },
  { key: "financial", label: "Financial Architecture", icon: DollarSign, max: 35 },
  { key: "salesInfra", label: "Sales Infrastructure", icon: Users, max: 30 },
];

// ── Scoring helpers ────────────────────────────────────────────────────────

function computeScores(answers: Record<string, number>) {
  let marketProof = 0, financial = 0, salesInfra = 0;
  for (const q of QUESTIONS) {
    const pts = answers[q.id] ?? 0;
    if (q.section === "marketProof") marketProof += pts;
    else if (q.section === "financial") financial += pts;
    else salesInfra += pts;
  }
  return { total: marketProof + financial + salesInfra, marketProof, financial, salesInfra };
}

function getTier(score: number) {
  if (score >= 86) return { label: "Category Leader Profile", color: "#C9A84C", bg: "bg-gold-100", text: "text-gold-700", desc: "You're playing offense at scale. Fundamentals are strong — the strategic question is where to allocate your next dollar of growth capital." };
  if (score >= 71) return { label: "Primed for Growth", color: "#3b82f6", bg: "bg-blue-100", text: "text-blue-700", desc: "Strong position across most dimensions. Ready for national retailer conversations with targeted infrastructure investments." };
  if (score >= 56) return { label: "Retail Ready", color: "#10b981", bg: "bg-emerald-100", text: "text-emerald-700", desc: "Solid foundation for regional grocery and specialty expansion. Close remaining gaps before pursuing national accounts." };
  if (score >= 36) return { label: "Developing", color: "#f59e0b", bg: "bg-amber-100", text: "text-amber-700", desc: "You have a foundation, but critical gaps exist that will limit retailer confidence. Address these before aggressive expansion." };
  return { label: "Building the Foundation", color: "#ef4444", bg: "bg-red-100", text: "text-red-700", desc: "Focus on fundamentals before retail expansion. Expanding distribution now will amplify weaknesses, not solve them." };
}

function getRecommendations(answers: Record<string, number>): string[] {
  const recs: string[] = [];
  if ((answers.velocity ?? 0) < 12) recs.push("Build velocity in your current doors before expanding distribution. Aim for 8–12 units/week before pitching new accounts — that's where buyers start taking emerging brands seriously.");
  if ((answers.repeatRate ?? 0) < 6) recs.push("Invest in consumer retention — post-purchase email sequences, Subscribe & Save, loyalty incentives. Repeat purchase rate is your most credible product-market fit signal for buyer conversations.");
  if ((answers.grossMargin ?? 0) < 8) recs.push("Address your margin architecture before pursuing major retailers. Most conventional grocery requires 35–50% margin, and your current structure likely won't support that without cost reduction or price increases.");
  if ((answers.channelMargin ?? 0) < 9) recs.push("Model your fully-loaded retailer margin requirement (slotting + everyday margin + promotional allowance) and work backward to the MSRP you need. This should precede any national buyer conversation.");
  if ((answers.salesResources ?? 0) < 8) recs.push("Identify a regional broker partner in your priority market and execute a structured 30-day activation before your next category review. Broker relationships without activation consistently underperform.");
  if ((answers.distribution ?? 0) < 5) recs.push("Most national retailer buyers require distributor representation as a prerequisite for placement. Prioritize a UNFI or KeHE conversation in your next 90 days.");
  if (recs.length === 0) recs.push("Your fundamentals are strong across all dimensions. The strategic question shifts from 'are we ready?' to 'where should we focus next?' A channel prioritization exercise would sharpen that decision.");
  return recs.slice(0, 4);
}

function buildMailto(brand: string, name: string, email: string, scores: ReturnType<typeof computeScores>, tier: ReturnType<typeof getTier>, recs: string[]) {
  const body = [
    `RETAIL READINESS SCORECARD RESULTS`,
    `Brand: ${brand}`,
    `Name: ${name}`,
    `Overall Score: ${scores.total}/100 — ${tier.label}`,
    ``,
    `SECTION SCORES`,
    `Market Proof: ${scores.marketProof}/35`,
    `Financial Architecture: ${scores.financial}/35`,
    `Sales Infrastructure: ${scores.salesInfra}/30`,
    ``,
    `PRIORITY RECOMMENDATIONS`,
    ...recs.map((r, i) => `${i + 1}. ${r}`),
    ``,
    `— Commerce Media Consulting Group`,
    `Schedule a strategy session: https://commerce-media-consulting.vercel.app/book-a-call`,
  ].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(`Your Retail Readiness Results — Commerce Media Consulting Group`)}&body=${encodeURIComponent(body)}`;
}

// ── Step sub-components ────────────────────────────────────────────────────

const stepVariants = {
  enter: { opacity: 0, x: 32 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
};

// ── Main component ─────────────────────────────────────────────────────────

export default function RetailReadinessScorecard() {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState({ name: "", category: "", stage: "" });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [contact, setContact] = useState({ name: "", email: "", role: "" });
  const [copied, setCopied] = useState(false);

  const TOTAL_STEPS = 5; // 0=brand, 1=marketProof, 2=financial, 3=salesInfra, 4=contact, then results

  const questionsForStep = (s: number): Question[] => {
    if (s === 1) return QUESTIONS.filter(q => q.section === "marketProof");
    if (s === 2) return QUESTIONS.filter(q => q.section === "financial");
    if (s === 3) return QUESTIONS.filter(q => q.section === "salesInfra");
    return [];
  };

  const stepComplete = (s: number): boolean => {
    if (s === 0) return !!brand.name && !!brand.category && !!brand.stage;
    if (s === 4) return !!contact.name && !!contact.email;
    return questionsForStep(s).every(q => answers[q.id] !== undefined);
  };

  const scores = computeScores(answers);
  const tier = getTier(scores.total);
  const recs = getRecommendations(answers);
  const showResults = step === 5;

  const handleCopy = () => {
    const text = [
      `Retail Readiness Score: ${scores.total}/100 — ${tier.label}`,
      `Market Proof: ${scores.marketProof}/35 | Financial: ${scores.financial}/35 | Sales Infra: ${scores.salesInfra}/30`,
      ``,
      `Priority Recommendations:`,
      ...recs.map((r, i) => `${i + 1}. ${r}`),
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const circumference = 2 * Math.PI * 70;

  if (showResults) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Score hero */}
        <div className="bg-navy-900 rounded-2xl p-8 lg:p-10 mb-6 text-white">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* SVG ring */}
            <div className="relative flex-shrink-0">
              <svg viewBox="0 0 160 160" className="w-36 h-36 -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                <motion.circle
                  cx="80" cy="80" r="70" fill="none"
                  stroke={tier.color} strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference - (scores.total / 100) * circumference }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading font-bold text-4xl text-white">{scores.total}</span>
                <span className="text-white/40 text-xs">/ 100</span>
              </div>
            </div>

            {/* Tier info */}
            <div className="text-center lg:text-left">
              <div className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Your Readiness Level</div>
              <h2 className="font-heading text-3xl font-bold mb-3" style={{ color: tier.color }}>{tier.label}</h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-lg">{tier.desc}</p>
              {brand.name && <p className="text-white/40 text-xs mt-3">Assessment for: <span className="text-white/60 font-medium">{brand.name}</span></p>}
            </div>
          </div>
        </div>

        {/* Section bars */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 mb-6">
          <h3 className="font-heading font-bold text-navy-900 text-base mb-6">Score by Dimension</h3>
          <div className="flex flex-col gap-5">
            {SECTIONS.map((sec) => {
              const score = scores[sec.key as keyof typeof scores] as number;
              const pct = Math.round((score / sec.max) * 100);
              return (
                <div key={sec.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <sec.icon size={15} className="text-gold-600" />
                      <span className="font-medium text-navy-900 text-sm">{sec.label}</span>
                    </div>
                    <span className="text-sm font-bold text-navy-900">{score}<span className="text-gray-400 font-normal">/{sec.max}</span></span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: pct >= 70 ? "#10b981" : pct >= 45 ? "#f59e0b" : "#ef4444" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-cream-50 rounded-2xl border border-cream-200 p-6 lg:p-8 mb-6">
          <h3 className="font-heading font-bold text-navy-900 text-base mb-5">Priority Recommendations</h3>
          <div className="flex flex-col gap-4">
            {recs.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-gold-500 text-navy-900 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
                <p className="text-gray-700 text-sm leading-relaxed">{rec}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="bg-navy-900 rounded-2xl p-6 lg:p-8">
          <h3 className="font-heading font-bold text-white text-lg mb-2">Want to review these results with Don?</h3>
          <p className="text-white/50 text-sm mb-6">A 30-minute strategy session turns your scorecard into a specific action plan.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/book-a-call"
              className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-6 py-3.5 rounded-xl transition-colors text-sm"
            >
              <Calendar size={16} />
              Schedule a Strategy Session
            </Link>
            {contact.email && (
              <a
                href={buildMailto(brand.name, contact.name, contact.email, scores, tier, recs)}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm"
              >
                Email My Results
              </a>
            )}
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm"
            >
              {copied ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy Results</>}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gold-600 uppercase tracking-widest">
            Step {step + 1} of {TOTAL_STEPS + 1}
          </span>
          <span className="text-xs text-gray-400">{Math.round(((step) / TOTAL_STEPS) * 100)}% complete</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold-500 rounded-full"
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {["Brand", "Market", "Financial", "Sales", "Contact", "Results"].map((label, i) => (
            <span key={i} className={`text-[10px] font-medium ${i <= step ? "text-navy-900" : "text-gray-300"}`}>{label}</span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Brand basics */}
        {step === 0 && (
          <motion.div key="step0" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <h2 className="font-heading font-bold text-navy-900 text-2xl mb-2">Tell us about your brand</h2>
            <p className="text-gray-500 text-sm mb-7">We'll use this to personalize your readiness assessment.</p>
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Brand name</label>
                <input
                  type="text"
                  value={brand.name}
                  onChange={e => setBrand(b => ({ ...b, name: e.target.value }))}
                  placeholder="e.g. Sunrise Snacks Co."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Product category</label>
                <select
                  value={brand.category}
                  onChange={e => setBrand(b => ({ ...b, category: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white"
                >
                  <option value="">Select a category…</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Current revenue stage</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {STAGES.map(s => (
                    <button
                      key={s.label}
                      onClick={() => setBrand(b => ({ ...b, stage: s.label }))}
                      className={`p-3.5 rounded-xl border-2 text-left transition-all ${brand.stage === s.label ? "border-gold-500 bg-gold-50" : "border-gray-100 hover:border-gold-200 bg-white"}`}
                    >
                      <div className="font-semibold text-navy-900 text-sm">{s.label}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{s.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Steps 1–3: Questions */}
        {(step === 1 || step === 2 || step === 3) && (
          <motion.div key={`step${step}`} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            {(() => {
              const sectionInfo = { 1: { title: "Market Proof", sub: "How strong is your consumer demand signal?" }, 2: { title: "Financial Architecture", sub: "Can your margin structure support retail economics?" }, 3: { title: "Sales Infrastructure", sub: "Do you have the team and distribution to execute?" } }[step] || { title: "", sub: "" };
              return (
                <>
                  <h2 className="font-heading font-bold text-navy-900 text-2xl mb-1">{sectionInfo.title}</h2>
                  <p className="text-gray-500 text-sm mb-7">{sectionInfo.sub}</p>
                  <div className="flex flex-col gap-8">
                    {questionsForStep(step).map(q => (
                      <div key={q.id}>
                        <p className="font-semibold text-navy-900 text-base mb-1">{q.label}</p>
                        {q.sublabel && <p className="text-gray-400 text-xs mb-4">{q.sublabel}</p>}
                        <div className="flex flex-col gap-2.5">
                          {q.options.map(opt => (
                            <button
                              key={opt.label}
                              onClick={() => setAnswers(a => ({ ...a, [q.id]: opt.points }))}
                              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[q.id] === opt.points ? "border-gold-500 bg-gold-50" : "border-gray-100 hover:border-gold-200 bg-white"}`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${answers[q.id] === opt.points ? "border-gold-500 bg-gold-500" : "border-gray-300"}`}>
                                  {answers[q.id] === opt.points && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                                <div>
                                  <div className="font-semibold text-navy-900 text-sm">{opt.label}</div>
                                  {opt.description && <div className="text-gray-400 text-xs mt-0.5">{opt.description}</div>}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}

        {/* Step 4: Contact */}
        {step === 4 && (
          <motion.div key="step4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <h2 className="font-heading font-bold text-navy-900 text-2xl mb-2">Where should we send your results?</h2>
            <p className="text-gray-500 text-sm mb-7">Your personalized report includes your score, dimension breakdown, and priority recommendations.</p>
            <div className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">Your name</label>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">Your email</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                    placeholder="jane@brand.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Your role</label>
                <select
                  value={contact.role}
                  onChange={e => setContact(c => ({ ...c, role: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white"
                >
                  <option value="">Select your role…</option>
                  {["Founder / CEO", "Chief Revenue Officer", "VP Sales", "VP Marketing", "Head of Retail / National Accounts", "General Manager", "Investor / Advisor", "Other"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="bg-cream-50 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 size={16} className="text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">Your results display instantly on the next screen. We'll also open your email client pre-filled with your full report so you can save or share it.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={() => setStep(s => s - 1)}
          disabled={step === 0}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-navy-700 disabled:opacity-0 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button
          onClick={() => { if (step < TOTAL_STEPS) setStep(s => s + 1); }}
          disabled={!stepComplete(step)}
          className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold px-7 py-3 rounded-xl transition-all text-sm"
        >
          {step === TOTAL_STEPS - 1 ? "Get My Score" : "Continue"}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
