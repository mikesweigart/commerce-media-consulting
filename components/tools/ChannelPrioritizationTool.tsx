"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Copy, Check, Calendar, ShoppingCart, Globe, Leaf, MapPin, Building2, Package, Zap, UtensilsCrossed } from "lucide-react";

// ── Channel definitions ────────────────────────────────────────────────────

interface Channel {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  iconBg: string;
  action90: string;
  investment: string;
  insight: (answers: Answers) => string;
}

const CHANNELS: Channel[] = [
  {
    id: "dtc", name: "DTC / Own Website", description: "Direct-to-consumer e-commerce",
    icon: Globe, color: "text-violet-700", iconBg: "bg-violet-100",
    action90: "Launch or optimize your brand site with email capture, post-purchase sequences, and Subscribe & Save mechanics. Set up basic Klaviyo flows before any paid traffic.",
    investment: "$15K–$50K initial setup; $3K–$15K/month ongoing",
    insight: (a) => a.primaryGoal === "data" ? "Ideal for building the consumer intelligence that makes every retail decision more defensible." : "Your fastest path to owned consumer data and repeat purchase behavior — both critical for retailer pitch credibility.",
  },
  {
    id: "amazon", name: "Amazon / Marketplace", description: "Third-party or Vendor Central selling",
    icon: ShoppingCart, color: "text-orange-700", iconBg: "bg-orange-100",
    action90: "Register your brand, build A+ content for all active SKUs, activate Subscribe & Save, and launch a Sponsored Products campaign targeting category keywords and top competitor ASINs.",
    investment: "$10K–$30K content build; $5K–$30K/month ad spend",
    insight: (a) => a.grossMargin === "60_plus" || a.grossMargin === "45_60" ? "Your margin profile supports Amazon economics well. A+ content and Subscribe & Save can create a powerful repeat purchase flywheel." : "Viable with the right margin structure and price architecture. Focus on Subscribe & Save velocity as your primary KPI.",
  },
  {
    id: "natural", name: "Natural & Specialty", description: "Whole Foods, Sprouts, Natural Grocers, independents",
    icon: Leaf, color: "text-emerald-700", iconBg: "bg-emerald-100",
    action90: "Identify your top 3 target natural accounts in your strongest market. Secure UNFI or KeHE distribution in that region, build a category review deck with consumer insight data, and schedule buyer introductions through your distributor rep.",
    investment: "$25K–$75K including slotting, demos, and distributor fees",
    insight: (a) => a.priceVsCategory === "super_premium" || a.priceVsCategory === "premium" ? "Premium pricing and brand story play exceptionally well in natural/specialty — this is where challenger brands prove velocity before going broader." : "Natural/specialty is the proving ground. Build velocity here before pitching conventional grocery. Buyers use your turns data as a credibility signal.",
  },
  {
    id: "regional", name: "Regional Grocery", description: "Regional chains, Fresh Market, banner-specific programs",
    icon: MapPin, color: "text-blue-700", iconBg: "bg-blue-100",
    action90: "Identify your top target regional banner, prepare a 5-slide category review deck with velocity data from existing accounts, and schedule an introduction through your distributor rep. Lock a promotional calendar before the meeting.",
    investment: "$50K–$150K including slotting, trade spend, and distributor fees",
    insight: () => "Regional grocery is the stepping stone to national. Win one regional chain well — with strong velocity and promotional support — and you have the proof point that opens national buyer conversations.",
  },
  {
    id: "national", name: "National Grocery / Mass", description: "Kroger, Walmart, Albertsons, Target",
    icon: Building2, color: "text-navy-700", iconBg: "bg-navy-100",
    action90: "Audit your infrastructure readiness first: national distributor, VP Sales or senior broker, trade promotion management system, demand planning. Schedule this audit before any buyer conversations — showing up without infrastructure signals risk to a national buyer.",
    investment: "$200K–$1M+ per account depending on commitment",
    insight: () => "National retailers require proven velocity from comparable accounts, national distributor infrastructure, and a commercial team ready to execute promotional programs at scale. Build the foundation before the conversation.",
  },
  {
    id: "club", name: "Club (Costco / Sam's)", description: "Membership warehouse retail",
    icon: Package, color: "text-red-700", iconBg: "bg-red-100",
    action90: "Develop a club-specific pack configuration (2–3x your standard unit count), model the economics of a road show event, and identify your path to a buyer introduction — usually through a broker or distributor with existing Costco relationships.",
    investment: "$75K–$250K per road show; significant PO financing required",
    insight: () => "Club retail requires large-order fulfillment capacity and a club-specific pack configuration. It's a powerful volume and trial driver — but only for brands with the operational infrastructure to support it.",
  },
  {
    id: "convenience", name: "Convenience / Gas", description: "7-Eleven, Circle K, regional c-store chains",
    icon: Zap, color: "text-yellow-700", iconBg: "bg-yellow-100",
    action90: "Identify DSD (direct store delivery) distributor coverage in your target markets, develop a convenience-specific SKU configuration at the right impulse price point, and schedule intro meetings through your distributor sales rep.",
    investment: "$30K–$100K for market-level launch support",
    insight: (a) => a.category === "Beverage" || a.category === "Snack & Confection" ? "C-store is a natural channel for impulse snack and beverage brands. Pricing and single-serve configuration are the critical variables — get these right before investing in placement." : "Convenience works best for impulse-friendly categories at accessible price points. Evaluate whether your format and pricing are configured for the c-store shopping occasion.",
  },
  {
    id: "foodservice", name: "Food Service / Institutional", description: "Sysco, US Foods, restaurant & institutional buyers",
    icon: UtensilsCrossed, color: "text-teal-700", iconBg: "bg-teal-100",
    action90: "Build a target list of 20 food service operators in your market, develop a food service pricing and pack configuration (typically lower MSRP, larger format), and identify a food service distributor — Sysco, US Foods, or a regional broadliner.",
    investment: "$20K–$80K for initial market development",
    insight: () => "Food service offers volume without the slotting and trade spend requirements of retail — but it requires dedicated food service pricing and pack configurations. Evaluate as a complementary channel to retail, not a substitute.",
  },
];

// ── Answers type ───────────────────────────────────────────────────────────

interface Answers {
  category: string;
  priceVsCategory: string;
  annualRevenue: string;
  grossMargin: string;
  primaryGoal: string;
  budget: string;
  salesTeam: string;
  canHandleLargePOs: string;
}

// ── Scoring logic ──────────────────────────────────────────────────────────

function scoreChannel(channelId: string, a: Answers): number {
  let score = 0;
  switch (channelId) {
    case "dtc":
      score = 42;
      if (a.primaryGoal === "data") score += 18;
      if (a.primaryGoal === "trial") score += 10;
      if (a.priceVsCategory === "super_premium" || a.priceVsCategory === "premium") score += 12;
      if (a.budget === "50k_200k" || a.budget === "200k_500k") score += 8;
      if (a.budget === "500k_2m" || a.budget === "2m_plus") score += 10;
      break;
    case "amazon":
      score = 35;
      if (a.category === "Refrigerated / Fresh") score -= 28;
      if (a.annualRevenue === "1m_5m" || a.annualRevenue === "5m_20m" || a.annualRevenue === "20m_plus") score += 15;
      if (a.primaryGoal === "volume") score += 10;
      if (a.grossMargin === "45_60" || a.grossMargin === "60_plus") score += 10;
      if (a.budget === "200k_500k" || a.budget === "500k_2m" || a.budget === "2m_plus") score += 10;
      break;
    case "natural":
      score = 28;
      if (a.priceVsCategory === "super_premium") score += 28;
      else if (a.priceVsCategory === "premium") score += 20;
      else if (a.priceVsCategory === "light_premium") score += 10;
      else if (a.priceVsCategory === "value") score -= 12;
      if (a.category === "Health & Wellness" || a.category === "Personal Care & Beauty" || a.category === "Baby & Family") score += 12;
      if (a.primaryGoal === "brand_equity" || a.primaryGoal === "trial") score += 10;
      if (a.salesTeam !== "none") score += 5;
      break;
    case "regional":
      score = 35;
      if (a.annualRevenue === "1m_5m") score += 15;
      if (a.annualRevenue === "5m_20m" || a.annualRevenue === "20m_plus") score += 22;
      if (a.salesTeam === "broker" || a.salesTeam === "hybrid" || a.salesTeam === "full") score += 12;
      if (a.grossMargin === "45_60" || a.grossMargin === "60_plus") score += 8;
      if (a.budget === "200k_500k" || a.budget === "500k_2m" || a.budget === "2m_plus") score += 5;
      break;
    case "national":
      score = 8;
      if (a.annualRevenue === "5m_20m") score += 25;
      if (a.annualRevenue === "20m_plus") score += 40;
      if (a.salesTeam === "hybrid") score += 15;
      if (a.salesTeam === "full") score += 25;
      if (a.budget === "500k_2m") score += 10;
      if (a.budget === "2m_plus") score += 18;
      if (a.canHandleLargePOs === "yes") score += 5;
      break;
    case "club":
      score = 8;
      if (a.annualRevenue === "5m_20m" || a.annualRevenue === "20m_plus") score += 28;
      if (a.canHandleLargePOs === "yes") score += 18;
      if (a.grossMargin === "45_60") score += 10;
      if (a.grossMargin === "60_plus") score += 15;
      if (a.priceVsCategory === "super_premium") score -= 10;
      if (a.category === "Beverage" || a.category === "Snack & Confection") score += 8;
      break;
    case "convenience":
      score = 18;
      if (a.category === "Beverage" || a.category === "Snack & Confection") score += 22;
      if (a.priceVsCategory === "inline" || a.priceVsCategory === "value") score += 15;
      if (a.priceVsCategory === "super_premium") score -= 18;
      if (a.salesTeam === "broker" || a.salesTeam === "full") score += 12;
      if (a.primaryGoal === "volume") score += 5;
      break;
    case "foodservice":
      score = 12;
      if (a.category === "Beverage" || a.category === "Snack & Confection" || a.category === "Household") score += 20;
      if (a.primaryGoal === "volume") score += 10;
      if (a.annualRevenue === "1m_5m" || a.annualRevenue === "5m_20m" || a.annualRevenue === "20m_plus") score += 10;
      if (a.canHandleLargePOs === "yes") score += 12;
      if (a.priceVsCategory === "super_premium") score -= 8;
      break;
  }
  return Math.max(0, Math.min(100, score));
}

function rankChannels(a: Answers) {
  return CHANNELS
    .map(ch => ({ ...ch, score: scoreChannel(ch.id, a) }))
    .sort((a, b) => b.score - a.score);
}

function getTrafficLight(score: number): { color: string; bg: string; label: string } {
  if (score >= 60) return { color: "text-emerald-700", bg: "bg-emerald-100", label: "Strong Fit" };
  if (score >= 35) return { color: "text-amber-700", bg: "bg-amber-100", label: "Develop Toward" };
  return { color: "text-red-600", bg: "bg-red-100", label: "Not Yet" };
}

function buildMailto(name: string, email: string, a: Answers, ranked: ReturnType<typeof rankChannels>) {
  const top3 = ranked.slice(0, 3);
  const body = [
    `CHANNEL PRIORITIZATION RESULTS`,
    `Name: ${name}`,
    ``,
    `TOP CHANNEL RECOMMENDATIONS`,
    ...top3.map((ch, i) => `${i + 1}. ${ch.name} (${ch.score}% compatibility)\n   First 90 days: ${ch.action90}`),
    ``,
    `— Commerce Media Consulting Group`,
    `Schedule a strategy session: https://commerce-media-consulting.vercel.app/book-a-call`,
  ].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent("Your Channel Prioritization Results — Commerce Media Consulting Group")}&body=${encodeURIComponent(body)}`;
}

// ── Step options ───────────────────────────────────────────────────────────

const PRICE_OPTIONS = [
  { id: "value", label: "20%+ below category average", sub: "Value / private-label fighter" },
  { id: "inline", label: "Inline with category average", sub: "Competitive mainstream pricing" },
  { id: "light_premium", label: "10–20% above category average", sub: "Light premium positioning" },
  { id: "premium", label: "20–50% above category average", sub: "Genuine premium brand" },
  { id: "super_premium", label: "50%+ above category average", sub: "Luxury / super-premium tier" },
];
const REVENUE_OPTIONS = [
  { id: "under_1m", label: "Under $1M" },
  { id: "1m_5m", label: "$1M – $5M" },
  { id: "5m_20m", label: "$5M – $20M" },
  { id: "20m_plus", label: "$20M+" },
];
const MARGIN_OPTIONS = [
  { id: "under30", label: "Under 30%" },
  { id: "30_45", label: "30–45%" },
  { id: "45_60", label: "45–60%" },
  { id: "60_plus", label: "60%+" },
];
const GOAL_OPTIONS = [
  { id: "trial", label: "Drive consumer trial", sub: "Get new buyers to try the product" },
  { id: "volume", label: "Maximize volume & revenue", sub: "Hit top-line growth targets" },
  { id: "margin", label: "Improve margin mix", sub: "Focus on profitable channels" },
  { id: "brand_equity", label: "Build brand equity", sub: "Establish premium positioning" },
  { id: "data", label: "Gather consumer data", sub: "Learn who buys and why" },
];
const BUDGET_OPTIONS = [
  { id: "under50k", label: "Under $50K" },
  { id: "50k_200k", label: "$50K – $200K" },
  { id: "200k_500k", label: "$200K – $500K" },
  { id: "500k_2m", label: "$500K – $2M" },
  { id: "2m_plus", label: "$2M+" },
];
const TEAM_OPTIONS = [
  { id: "none", label: "No sales team — founder-led" },
  { id: "small", label: "1–2 internal salespeople" },
  { id: "broker", label: "Regional broker network" },
  { id: "hybrid", label: "Brokers + internal KAMs" },
  { id: "full", label: "Full regional/national sales org" },
];
const PO_OPTIONS = [
  { id: "no", label: "No — we'd struggle with orders over $50K" },
  { id: "maybe", label: "Maybe — with some advance notice" },
  { id: "yes", label: "Yes — we have the capacity" },
];

const CATEGORIES_TOOL = ["Beverage", "Snack & Confection", "Refrigerated / Fresh", "Personal Care & Beauty", "Household", "Pet", "Baby & Family", "Health & Wellness", "Other"];

const stepVariants = { enter: { opacity: 0, x: 32 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -32 } };

// ── Sub-components ─────────────────────────────────────────────────────────

function RadioCards({ options, value, onChange }: { options: { id: string; label: string; sub?: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid sm:grid-cols-2 gap-2.5">
      {options.map(opt => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`text-left p-4 rounded-xl border-2 transition-all ${value === opt.id ? "border-gold-500 bg-gold-50" : "border-gray-100 hover:border-gold-200 bg-white"}`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${value === opt.id ? "border-gold-500 bg-gold-500" : "border-gray-300"}`}>
              {value === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div>
              <div className="font-semibold text-navy-900 text-sm">{opt.label}</div>
              {opt.sub && <div className="text-gray-400 text-xs mt-0.5">{opt.sub}</div>}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

const EMPTY_ANSWERS: Answers = { category: "", priceVsCategory: "", annualRevenue: "", grossMargin: "", primaryGoal: "", budget: "", salesTeam: "", canHandleLargePOs: "" };

export default function ChannelPrioritizationTool() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [contact, setContact] = useState({ name: "", email: "", role: "" });
  const [copied, setCopied] = useState(false);

  const TOTAL_STEPS = 3;
  const setAnswer = <K extends keyof Answers>(key: K, val: string) => setAnswers(a => ({ ...a, [key]: val }));

  const stepComplete = (s: number): boolean => {
    if (s === 0) return !!answers.category && !!answers.priceVsCategory && !!answers.annualRevenue && !!answers.grossMargin;
    if (s === 1) return !!answers.primaryGoal && !!answers.budget;
    if (s === 2) return !!answers.salesTeam && !!answers.canHandleLargePOs;
    if (s === 3) return !!contact.name && !!contact.email;
    return false;
  };

  const showResults = step === 4;
  const ranked = rankChannels(answers);
  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  const handleCopy = () => {
    const text = [
      "Channel Prioritization Results",
      ...top3.map((ch, i) => `${i + 1}. ${ch.name} (${ch.score}% fit)`),
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  if (showResults) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="bg-navy-900 rounded-2xl p-6 lg:p-8 mb-6">
          <div className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Your Channel Prioritization</div>
          <h2 className="font-heading text-2xl font-bold text-white mb-1">Your Top Recommended Channels</h2>
          <p className="text-white/50 text-sm">Based on your brand profile, goals, and operational readiness.</p>
        </div>

        {/* Top 3 */}
        <div className="flex flex-col gap-4 mb-6">
          {top3.map((ch, i) => {
            const light = getTrafficLight(ch.score);
            return (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border-2 border-gray-100 hover:border-gold-200 p-6 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${ch.iconBg} flex items-center justify-center`}>
                      <ch.icon size={18} className={ch.color} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-navy-900 text-base">{ch.name}</span>
                        <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full">#{i + 1}</span>
                      </div>
                      <div className="text-gray-400 text-xs">{ch.description}</div>
                    </div>
                  </div>
                  <div className={`flex-shrink-0 text-center px-3 py-1.5 rounded-lg ${light.bg}`}>
                    <div className={`text-lg font-bold font-heading ${light.color}`}>{ch.score}%</div>
                    <div className={`text-[10px] font-semibold ${light.color}`}>{light.label}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{ch.insight(answers)}</p>
                </div>

                <div className="bg-cream-50 rounded-xl p-4 mb-3">
                  <div className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">Your 90-Day First Move</div>
                  <p className="text-gray-600 text-xs leading-relaxed">{ch.action90}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="font-semibold text-navy-700">Estimated investment:</span>
                  <span>{ch.investment}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Rest of channels */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h3 className="font-heading font-bold text-navy-900 text-sm mb-4">Other Channels — Readiness Snapshot</h3>
          <div className="flex flex-col gap-3">
            {rest.map(ch => {
              const light = getTrafficLight(ch.score);
              return (
                <div key={ch.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${ch.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <ch.icon size={14} className={ch.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-navy-900 text-sm">{ch.name}</div>
                    <div className="h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: ch.score >= 60 ? "#10b981" : ch.score >= 35 ? "#f59e0b" : "#ef4444" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${ch.score}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg flex-shrink-0 ${light.bg} ${light.color}`}>{light.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div className="bg-navy-900 rounded-2xl p-6 lg:p-8">
          <h3 className="font-heading font-bold text-white text-lg mb-2">Want to build the execution plan?</h3>
          <p className="text-white/50 text-sm mb-6">A strategy session with Don turns your channel prioritization into a 90-day commercial roadmap.</p>
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
                href={buildMailto(contact.name, contact.email, answers, ranked)}
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
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gold-600 uppercase tracking-widest">Step {step + 1} of {TOTAL_STEPS + 1}</span>
          <span className="text-xs text-gray-400">{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gold-500 rounded-full" animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }} transition={{ duration: 0.4 }} />
        </div>
        <div className="flex justify-between mt-2">
          {["Brand Profile", "Goals", "Operations", "Contact", "Results"].map((label, i) => (
            <span key={i} className={`text-[10px] font-medium ${i <= step ? "text-navy-900" : "text-gray-300"}`}>{label}</span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <h2 className="font-heading font-bold text-navy-900 text-2xl mb-2">Tell us about your brand</h2>
            <p className="text-gray-500 text-sm mb-7">We'll use this to match you with the channels most compatible with your brand profile.</p>
            <div className="flex flex-col gap-7">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Product category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES_TOOL.map(c => (
                    <button key={c} onClick={() => setAnswer("category", c)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${answers.category === c ? "border-gold-500 bg-gold-50 text-navy-900" : "border-gray-100 hover:border-gold-200 text-gray-600"}`}
                    >{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Price vs. category average</label>
                <RadioCards options={PRICE_OPTIONS} value={answers.priceVsCategory} onChange={v => setAnswer("priceVsCategory", v)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Annual revenue (current)</label>
                <RadioCards options={REVENUE_OPTIONS} value={answers.annualRevenue} onChange={v => setAnswer("annualRevenue", v)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Gross margin before trade spend</label>
                <RadioCards options={MARGIN_OPTIONS} value={answers.grossMargin} onChange={v => setAnswer("grossMargin", v)} />
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <h2 className="font-heading font-bold text-navy-900 text-2xl mb-2">Strategic goals & resources</h2>
            <p className="text-gray-500 text-sm mb-7">What you're optimizing for shapes which channels are right for right now.</p>
            <div className="flex flex-col gap-7">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Primary 12-month goal</label>
                <RadioCards options={GOAL_OPTIONS} value={answers.primaryGoal} onChange={v => setAnswer("primaryGoal", v)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Annual trade & marketing budget</label>
                <RadioCards options={BUDGET_OPTIONS} value={answers.budget} onChange={v => setAnswer("budget", v)} />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <h2 className="font-heading font-bold text-navy-900 text-2xl mb-2">Operational capacity</h2>
            <p className="text-gray-500 text-sm mb-7">Your infrastructure determines which channels you can realistically pursue right now.</p>
            <div className="flex flex-col gap-7">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Current sales team & coverage</label>
                <RadioCards options={TEAM_OPTIONS} value={answers.salesTeam} onChange={v => setAnswer("salesTeam", v)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Can you fulfill large retailer POs? (e.g., Costco, Walmart)</label>
                <RadioCards options={PO_OPTIONS} value={answers.canHandleLargePOs} onChange={v => setAnswer("canHandleLargePOs", v)} />
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <h2 className="font-heading font-bold text-navy-900 text-2xl mb-2">Where should we send your results?</h2>
            <p className="text-gray-500 text-sm mb-7">Your personalized channel map displays instantly — we'll also open your email client pre-filled with the full report.</p>
            <div className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">Your name</label>
                  <input type="text" value={contact.name} onChange={e => setContact(c => ({ ...c, name: e.target.value }))} placeholder="Jane Smith" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">Your email</label>
                  <input type="email" value={contact.email} onChange={e => setContact(c => ({ ...c, email: e.target.value }))} placeholder="jane@brand.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Your role</label>
                <select value={contact.role} onChange={e => setContact(c => ({ ...c, role: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white">
                  <option value="">Select your role…</option>
                  {["Founder / CEO", "Chief Revenue Officer", "VP Sales", "VP Marketing", "Head of Retail / National Accounts", "General Manager", "Investor / Advisor", "Other"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="bg-cream-50 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 size={16} className="text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">Results are instant. You'll see your full channel prioritization map — ranked by compatibility with your specific brand profile, goals, and operational capacity.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <button onClick={() => setStep(s => s - 1)} disabled={step === 0} className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-navy-700 disabled:opacity-0 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={() => { if (step <= TOTAL_STEPS) setStep(s => s + 1); }} disabled={!stepComplete(step)} className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold px-7 py-3 rounded-xl transition-all text-sm">
          {step === TOTAL_STEPS ? "See My Channel Map" : "Continue"}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
