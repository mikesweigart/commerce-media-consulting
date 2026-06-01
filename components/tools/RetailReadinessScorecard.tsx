"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Copy, Check, Calendar, TrendingUp, DollarSign, Users } from "lucide-react";
import SliderInput from "./SliderInput";

// ── Constants ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Beverage", "Snack & Confection", "Refrigerated / Fresh",
  "Personal Care & Beauty", "Household", "Pet",
  "Baby & Family", "Health & Wellness", "Other",
];

const STAGES = [
  { id: "pre", label: "Pre-launch" },
  { id: "early", label: "$0–$2M" },
  { id: "growth", label: "$2–$10M" },
  { id: "scale", label: "$10–$30M" },
  { id: "established", label: "$30M+" },
];

const SALES_OPTIONS = [
  { id: "none",   label: "Founder-led", sub: "No dedicated sales team yet" },
  { id: "small",  label: "1–2 Reps", sub: "Early internal sales team" },
  { id: "broker", label: "Broker Network", sub: "Regional broker coverage" },
  { id: "hybrid", label: "Brokers + KAMs", sub: "Multi-region with internal oversight" },
  { id: "full",   label: "Full Sales Org", sub: "Regional or national organization" },
];
const SALES_SCORES: Record<string, number> = { none: 0, small: 3, broker: 8, hybrid: 15, full: 20 };

const DIST_OPTIONS = [
  { id: "none",     label: "No Distributor", sub: "Self-distributing or DTC only" },
  { id: "local",    label: "Local / Regional", sub: "1–2 regional distributors" },
  { id: "regional", label: "Regional UNFI / KeHE", sub: "Natural or conventional regional" },
  { id: "national", label: "National Coverage", sub: "UNFI and/or KeHE national programs" },
];
const DIST_SCORES: Record<string, number> = { none: 0, local: 2, regional: 5, national: 10 };

// ── Scoring helpers ────────────────────────────────────────────────────────

const velocityColor  = (v: number) => v < 5  ? "#ef4444" : v < 12 ? "#f59e0b" : "#10b981";
const repeatColor    = (v: number) => v < 20 ? "#ef4444" : v < 35 ? "#f59e0b" : "#10b981";
const marginColor    = (v: number) => v < 40 ? "#ef4444" : v < 55 ? "#f59e0b" : "#10b981";

function velocityScore(v: number)  { return v <= 2 ? 0 : v <= 4 ? 3 : v <= 7 ? 8 : v <= 11 ? 14 : v <= 19 ? 20 : 25; }
function repeatScore(v: number)    { return v <= 14 ? 0 : v <= 24 ? 3 : v <= 34 ? 6 : 10; }
function marginScore(v: number)    { return v < 30 ? 0 : v < 40 ? 3 : v < 50 ? 8 : v < 60 ? 15 : 22; }
function chanMarginScore(v: number){ return v < 40 ? 0 : v < 50 ? 4 : v < 60 ? 9 : 13; }

function getTier(score: number) {
  if (score >= 86) return { label: "Category Leader Profile", hex: "#C9A84C", tw: "text-gold-600",   bg: "bg-gold-50",   border: "border-gold-200",   desc: "Your fundamentals are strong across all dimensions. The strategic question is where to allocate your next dollar of growth capital — not whether you're ready." };
  if (score >= 71) return { label: "Primed for Growth",       hex: "#3b82f6", tw: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-200",   desc: "Strong position across most dimensions. You're ready for national retailer conversations with targeted infrastructure investment." };
  if (score >= 56) return { label: "Retail Ready",            hex: "#10b981", tw: "text-emerald-600",bg: "bg-emerald-50",border: "border-emerald-200",desc: "Solid foundation for regional grocery and specialty channel expansion. Close your remaining gaps before pursuing national accounts." };
  if (score >= 36) return { label: "Developing",              hex: "#f59e0b", tw: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200",  desc: "You have a foundation, but critical gaps exist that will limit retailer confidence. Address these before aggressive expansion." };
  return                  { label: "Build the Foundation",    hex: "#ef4444", tw: "text-red-600",    bg: "bg-red-50",    border: "border-red-200",    desc: "Focus on fundamentals before retail expansion. Expanding distribution now will amplify weaknesses, not solve them." };
}

function getRecommendations(velocity: number, repeatRate: number, grossMargin: number, sales: string, dist: string) {
  const recs: string[] = [];
  if (velocity < 8)    recs.push("Velocity is the #1 credibility signal for retail buyers. Concentrate support — demos, geo-targeted digital, display investment — in your current doors before adding new ones. Aim for 8+ units/week before pitching new accounts.");
  if (repeatRate < 25) recs.push("Repeat purchase rate is your product-market fit proof point. Build post-purchase email flows, activate Subscribe & Save on Amazon, and add loyalty incentives. A 30%+ repeat rate is one of the most powerful assets in any buyer pitch.");
  if (grossMargin < 45) recs.push("Your margin structure may constrain channel optionality. Most conventional grocery accounts require 35–50% retailer margin. Model the fully-loaded cost structure and determine if price increases or input cost reductions are needed before pursuing nationals.");
  if (SALES_SCORES[sales] < 8)   recs.push("Without broker or internal sales coverage, your retail expansion speed is limited by founder bandwidth. Identify a regional broker partner in your priority market, execute a 30-day activation, and define clear performance expectations before 90 days.");
  if (DIST_SCORES[dist] < 5)     recs.push("Most national retailer buyers require UNFI or KeHE distribution as a prerequisite for placement. A distributor conversation should be in your next 90 days — not after you've already secured the buyer meeting.");
  if (recs.length === 0)          recs.push("Your fundamentals are strong across all dimensions. Focus shifts from 'are we ready?' to 'where does our next dollar of expansion capital go?' A structured channel prioritization exercise will sharpen that answer.");
  return recs.slice(0, 4);
}

function buildMailto(brandName: string, contactName: string, email: string, total: number, tier: ReturnType<typeof getTier>, recs: string[]) {
  const body = [
    `RETAIL READINESS SCORECARD`,
    `Brand: ${brandName}`,
    `Score: ${total}/100 — ${tier.label}`,
    ``,
    `PRIORITY ACTIONS`,
    ...recs.map((r, i) => `${i + 1}. ${r}`),
    ``,
    `Review your results with Don:`,
    `https://commerce-media-consulting.vercel.app/book-a-call`,
  ].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(`Your Retail Readiness Results — Commerce Media Consulting`)}&body=${encodeURIComponent(body)}`;
}

// ── Step animation ─────────────────────────────────────────────────────────

const slide = { enter: { opacity: 0, x: 24 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 } };

// ── Component ──────────────────────────────────────────────────────────────

export default function RetailReadinessScorecard() {
  const [step, setStep]           = useState(0);
  const [brandName, setBrandName] = useState("");
  const [category, setCategory]   = useState("");
  const [stage, setStage]         = useState("");
  const [velocity, setVelocity]   = useState(0);
  const [repeatRate, setRepeat]   = useState(0);
  const [grossMargin, setMargin]  = useState(35);
  const [sales, setSales]         = useState("");
  const [dist, setDist]           = useState("");
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [role, setRole]           = useState("");
  const [calculating, setCalculating] = useState(false);
  const [copied, setCopied]       = useState(false);

  const scores = useMemo(() => {
    const marketProof = velocityScore(velocity) + repeatScore(repeatRate);
    const financial   = marginScore(grossMargin) + chanMarginScore(grossMargin);
    const salesInfra  = (SALES_SCORES[sales] || 0) + (DIST_SCORES[dist] || 0);
    const total       = marketProof + financial + salesInfra;
    return { marketProof, financial, salesInfra, total };
  }, [velocity, repeatRate, grossMargin, sales, dist]);

  const tier = useMemo(() => getTier(scores.total), [scores.total]);
  const recs = useMemo(() => getRecommendations(velocity, repeatRate, grossMargin, sales, dist), [velocity, repeatRate, grossMargin, sales, dist]);

  const TOTAL = 3; // 0=brand, 1=market, 2=financial+sales, 3=contact
  const showResults = step === 4;

  const canProceed = (s: number) => {
    if (s === 0) return !!brandName.trim() && !!category && !!stage;
    if (s === 1) return true; // sliders always have a value
    if (s === 2) return !!sales && !!dist;
    if (s === 3) return !!name.trim() && !!email.trim();
    return false;
  };

  const goNext = () => {
    if (step === TOTAL) {
      setCalculating(true);
      setTimeout(() => { setCalculating(false); setStep(4); }, 1200);
    } else {
      setStep(s => s + 1);
    }
  };

  const handleCopy = () => {
    const text = [`Retail Readiness: ${scores.total}/100 — ${tier.label}`, ...recs.map((r,i) => `${i+1}. ${r}`)].join("\n");
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const circum = 2 * Math.PI * 70;

  // ── Results view ───────────────────────────────────────────────────────
  if (showResults) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Score header */}
        <div className="bg-navy-900 -mx-8 lg:-mx-10 -mt-8 lg:-mt-10 px-8 lg:px-10 pt-8 lg:pt-10 pb-8 mb-7 rounded-t-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative flex-shrink-0">
              <svg viewBox="0 0 160 160" className="w-32 h-32 -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                <motion.circle
                  cx="80" cy="80" r="70" fill="none"
                  stroke={tier.hex} strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={circum}
                  initial={{ strokeDashoffset: circum }}
                  animate={{ strokeDashoffset: circum - (scores.total / 100) * circum }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="font-heading font-bold text-4xl text-white leading-none"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                >
                  {scores.total}
                </motion.span>
                <span className="text-white/30 text-xs">/ 100</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Readiness Level</div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3" style={{ color: tier.hex }}>{tier.label}</h2>
              <p className="text-white/60 text-sm leading-relaxed">{tier.desc}</p>
            </div>
          </div>
        </div>

        {/* Section scores */}
        <div className="mb-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Score by Dimension</div>
          {[
            { label: "Market Proof", icon: TrendingUp, score: scores.marketProof, max: 35 },
            { label: "Financial Architecture", icon: DollarSign, score: scores.financial, max: 35 },
            { label: "Sales Infrastructure", icon: Users, score: scores.salesInfra, max: 30 },
          ].map(({ label, icon: Icon, score, max }) => {
            const pct = Math.round((score / max) * 100);
            const barColor = pct >= 70 ? "#10b981" : pct >= 45 ? "#f59e0b" : "#ef4444";
            return (
              <div key={label} className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Icon size={13} className="text-gold-600" />
                    <span className="text-sm font-medium text-navy-900">{label}</span>
                  </div>
                  <span className="text-sm font-bold text-navy-900 tabular-nums">{score}<span className="text-gray-300 font-normal">/{max}</span></span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ background: barColor }}
                    initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendations */}
        <div className="bg-cream-50 rounded-2xl border border-cream-200 p-5 sm:p-6 mb-6">
          <div className="text-xs font-bold text-navy-900 uppercase tracking-widest mb-4">Priority Actions</div>
          <div className="flex flex-col gap-4">
            {recs.map((rec, i) => (
              <motion.div key={i} className="flex gap-3"
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }}>
                <div className="w-6 h-6 rounded-full bg-gold-500 text-navy-900 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
                <p className="text-gray-700 text-sm leading-relaxed">{rec}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="bg-navy-900 rounded-2xl p-5 sm:p-6">
          <p className="font-heading font-semibold text-white text-base mb-1">Turn your scorecard into a 90-day action plan.</p>
          <p className="text-white/40 text-xs mb-5">A strategy session with Don is free, specific, and built around your results.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/book-a-call"
              className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-5 py-3.5 rounded-xl transition-colors text-sm flex-1 sm:flex-none">
              <Calendar size={15} /> Schedule with Don
            </Link>
            {email && (
              <a href={buildMailto(brandName, name, email, scores.total, tier, recs)}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-xl transition-colors text-sm">
                Email My Results
              </a>
            )}
            <button onClick={handleCopy}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-xl transition-colors text-sm">
              {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Calculating state ──────────────────────────────────────────────────
  if (calculating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-5">
        <motion.div
          className="w-14 h-14 rounded-full border-4 border-gold-200 border-t-gold-500"
          animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        />
        <p className="font-heading font-semibold text-navy-900 text-lg">Analyzing your brand…</p>
        <p className="text-gray-400 text-sm">Scoring across market proof, financials, and sales infrastructure</p>
      </div>
    );
  }

  // ── Form steps ─────────────────────────────────────────────────────────
  const stepLabels = ["Brand", "Market", "Operations", "Contact"];

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gold-600 uppercase tracking-widest">Step {step + 1} of {TOTAL + 1}</span>
          <span className="text-xs text-gray-400">{Math.round((step / TOTAL) * 100)}% complete</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
          <motion.div className="h-full bg-gold-500 rounded-full" animate={{ width: `${(step / TOTAL) * 100}%` }} transition={{ duration: 0.35 }} />
        </div>
        <div className="flex justify-between">
          {stepLabels.map((l, i) => (
            <span key={i} className={`text-[10px] font-medium transition-colors ${i <= step ? "text-navy-700" : "text-gray-300"}`}>{l}</span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Brand basics */}
        {step === 0 && (
          <motion.div key="s0" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <h2 className="font-heading font-bold text-navy-900 text-xl sm:text-2xl mb-1">Tell us about your brand</h2>
            <p className="text-gray-500 text-sm mb-7">We'll personalize your readiness score to your category and stage.</p>
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Brand name</label>
                <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g. Sunrise Snacks Co."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Product category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setCategory(c)}
                      className={`py-3 px-3 rounded-xl border-2 text-sm font-medium transition-all text-left leading-tight ${category === c ? "border-gold-500 bg-gold-50 text-navy-900" : "border-gray-100 hover:border-gold-200 text-gray-600 bg-white"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Current revenue stage</label>
                <div className="flex flex-wrap gap-2">
                  {STAGES.map(s => (
                    <button key={s.id} onClick={() => setStage(s.id)}
                      className={`px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${stage === s.id ? "border-gold-500 bg-gold-50 text-navy-900" : "border-gray-100 hover:border-gold-200 text-gray-600 bg-white"}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: Market signals — SLIDERS */}
        {step === 1 && (
          <motion.div key="s1" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <h2 className="font-heading font-bold text-navy-900 text-xl sm:text-2xl mb-1">Market Proof</h2>
            <p className="text-gray-500 text-sm mb-8">How strong is your consumer pull signal? Slide to your current numbers.</p>
            <div className="flex flex-col gap-10">
              <div className="bg-gray-50 rounded-2xl p-5 sm:p-6">
                <SliderInput
                  label="Weekly velocity per store"
                  sublabel="Units sold per week, per store, across your current doors"
                  value={velocity} onChange={setVelocity}
                  min={0} max={25} step={1}
                  formatValue={v => v === 25 ? "25+" : `${v} u/wk`}
                  colorFn={velocityColor}
                  benchmarks={[
                    { value: 5,  label: "Buyers notice" },
                    { value: 12, label: "Expansion ready" },
                    { value: 20, label: "Priority SKU" },
                  ]}
                />
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 sm:p-6">
                <SliderInput
                  label="Consumer repeat purchase rate"
                  sublabel="% of first-time buyers who purchase again within 90 days"
                  value={repeatRate} onChange={setRepeat}
                  min={0} max={50} step={1}
                  formatValue={v => v === 50 ? "50%+" : `${v}%`}
                  colorFn={repeatColor}
                  benchmarks={[
                    { value: 20, label: "Category avg" },
                    { value: 35, label: "Strong" },
                  ]}
                />
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 sm:p-6">
                <SliderInput
                  label="Gross margin before trade spend"
                  sublabel="Net revenue minus COGS, as a % of net revenue"
                  value={grossMargin} onChange={setMargin}
                  min={20} max={70} step={1}
                  formatValue={v => v === 70 ? "70%+" : `${v}%`}
                  colorFn={marginColor}
                  benchmarks={[
                    { value: 35, label: "Retail floor" },
                    { value: 50, label: "Solid" },
                    { value: 62, label: "Strong" },
                  ]}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Sales infrastructure — PILLS */}
        {step === 2 && (
          <motion.div key="s2" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <h2 className="font-heading font-bold text-navy-900 text-xl sm:text-2xl mb-1">Sales Infrastructure</h2>
            <p className="text-gray-500 text-sm mb-8">Your team and distribution determine which retailers you can realistically pursue.</p>
            <div className="flex flex-col gap-8">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Sales team & broker coverage</label>
                <div className="flex flex-col gap-2">
                  {SALES_OPTIONS.map(opt => (
                    <button key={opt.id} onClick={() => setSales(opt.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${sales === opt.id ? "border-gold-500 bg-gold-50" : "border-gray-100 hover:border-gold-200 bg-white"}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${sales === opt.id ? "border-gold-500 bg-gold-500" : "border-gray-300"}`}>
                        {sales === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="font-semibold text-navy-900 text-sm">{opt.label}</div>
                        <div className="text-gray-400 text-xs mt-0.5">{opt.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Distributor relationships</label>
                <div className="flex flex-col gap-2">
                  {DIST_OPTIONS.map(opt => (
                    <button key={opt.id} onClick={() => setDist(opt.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${dist === opt.id ? "border-gold-500 bg-gold-50" : "border-gray-100 hover:border-gold-200 bg-white"}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${dist === opt.id ? "border-gold-500 bg-gold-500" : "border-gray-300"}`}>
                        {dist === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="font-semibold text-navy-900 text-sm">{opt.label}</div>
                        <div className="text-gray-400 text-xs mt-0.5">{opt.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Contact */}
        {step === 3 && (
          <motion.div key="s3" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <h2 className="font-heading font-bold text-navy-900 text-xl sm:text-2xl mb-1">Almost there</h2>
            <p className="text-gray-500 text-sm mb-7">We'll open your email client pre-filled with your full personalized report.</p>
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Your name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Work email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@brand.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Your role <span className="text-gray-300 font-normal">(optional)</span></label>
                <select value={role} onChange={e => setRole(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white">
                  <option value="">Select…</option>
                  {["Founder / CEO","CRO","VP Sales","VP Marketing","Head of Retail","General Manager","Investor / Advisor","Other"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="bg-cream-50 rounded-xl p-4 flex items-start gap-3 border border-cream-200">
                <CheckCircle2 size={15} className="text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">Results are instant and private. Email and role let us pre-fill your report — we don't spam, and your data won't be sold.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-navy-700 disabled:opacity-0 transition-colors py-2 px-1 -ml-1">
          <ArrowLeft size={15} /> Back
        </button>
        <button onClick={goNext} disabled={!canProceed(step)}
          className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm shadow-sm">
          {step === TOTAL ? "Get My Score" : "Continue"}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
