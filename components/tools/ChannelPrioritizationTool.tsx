"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Copy, Check, Calendar, ShoppingCart, Globe, Leaf, MapPin, Building2, Package, Zap, UtensilsCrossed } from "lucide-react";
import SliderInput from "./SliderInput";

// ── Channel data ───────────────────────────────────────────────────────────

interface ChannelDef {
  id: string;
  name: string;
  desc: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  action90: string;
  investment: string;
  insight: (a: Answers) => string;
}

const CHANNELS: ChannelDef[] = [
  {
    id: "dtc", name: "DTC / Own Website", desc: "Direct-to-consumer e-commerce",
    icon: Globe, iconBg: "bg-violet-100", iconColor: "text-violet-700",
    action90: "Launch or optimize your brand site with email capture. Build a 3-email post-purchase sequence and activate Subscribe & Save mechanics. Set up analytics before paid traffic.",
    investment: "$15K–$50K setup · $3K–$15K/month ongoing",
    insight: a => a.goal === "data" ? "The fastest path to owned consumer intelligence — every DTC buyer teaches you something that makes your retail pitch more defensible." : "Your DTC channel is your consumer lab. What buyers do and say here builds the story that wins category reviews.",
  },
  {
    id: "amazon", name: "Amazon / Marketplace", desc: "3P Seller Central or Vendor Central",
    icon: ShoppingCart, iconBg: "bg-orange-100", iconColor: "text-orange-700",
    action90: "Register your brand, complete A+ content for all active SKUs, activate Subscribe & Save, and launch Sponsored Products targeting category keywords and top competitor ASINs.",
    investment: "$10K–$30K content · $5K–$30K/month ad spend",
    insight: a => a.margin >= 50 ? "Your margin supports Amazon economics well. Subscribe & Save velocity is your primary KPI — it creates a compounding repeat purchase flywheel." : "Viable with the right price architecture. Focus on content quality and Subscribe & Save enrollment before scaling ad spend.",
  },
  {
    id: "natural", name: "Natural & Specialty", desc: "Whole Foods, Sprouts, Natural Grocers, independents",
    icon: Leaf, iconBg: "bg-emerald-100", iconColor: "text-emerald-700",
    action90: "Identify your top 3 target natural accounts in your strongest market. Secure UNFI or KeHE distribution there, build a 5-slide category review deck, and book buyer intros through your distributor rep.",
    investment: "$25K–$75K slotting, demos, distributor fees",
    insight: a => a.priceVs === "super_premium" || a.priceVs === "premium" ? "Premium pricing and brand story play exceptionally well in natural/specialty — this is where challenger brands prove velocity before going broader." : "Natural/specialty is the proving ground. Build velocity here before conventional grocery — buyers use your turns as a credibility signal.",
  },
  {
    id: "regional", name: "Regional Grocery", desc: "Regional banners, Fresh Market, specialty chains",
    icon: MapPin, iconBg: "bg-blue-100", iconColor: "text-blue-700",
    action90: "Identify your top target regional banner, prepare a 5-slide category review deck with velocity data from existing accounts, and secure a buyer introduction through your distributor. Lock a promotional calendar before the meeting.",
    investment: "$50K–$150K slotting, trade spend, distributor fees",
    insight: () => "Regional grocery is the stepping stone to national. Win one regional chain well — with strong velocity and trade support — and you have the proof point that opens national buyer conversations.",
  },
  {
    id: "national", name: "National Grocery / Mass", desc: "Kroger, Walmart, Albertsons, Target",
    icon: Building2, iconBg: "bg-navy-100", iconColor: "text-navy-700",
    action90: "Audit infrastructure before any buyer conversations: national distributor, VP Sales or senior broker, trade promotion management system, demand planning capability. The audit should come first.",
    investment: "$200K–$1M+ per account",
    insight: () => "National accounts require proven velocity from comparable banners, national distributor infrastructure, and a commercial team ready to execute promotional programs at scale.",
  },
  {
    id: "club", name: "Club (Costco / Sam's)", desc: "Membership warehouse retail",
    icon: Package, iconBg: "bg-red-100", iconColor: "text-red-700",
    action90: "Develop a club-specific pack configuration (2–3x standard unit count), model the economics of a road show event, and identify your path to a buyer intro — usually through a broker with existing Costco relationships.",
    investment: "$75K–$250K per road show · large PO financing required",
    insight: () => "Club retail is a powerful volume and trial driver — but only for brands with large-order fulfillment capacity and a club-specific pack configuration ready to go.",
  },
  {
    id: "cstore", name: "Convenience / C-Store", desc: "7-Eleven, Circle K, regional c-store chains",
    icon: Zap, iconBg: "bg-yellow-100", iconColor: "text-yellow-700",
    action90: "Identify DSD distributor coverage in your target markets, develop a convenience-specific SKU at the right impulse price point, and schedule intro meetings through your distributor rep.",
    investment: "$30K–$100K per market launch",
    insight: a => a.category === "Beverage" || a.category === "Snack & Confection" ? "C-store is a natural fit for impulse snack and beverage brands. Pricing and single-serve configuration are the critical variables." : "Convenience works best for impulse-friendly categories at accessible price points. Evaluate your format and price before committing to this channel.",
  },
  {
    id: "foodservice", name: "Food Service", desc: "Sysco, US Foods, restaurants, institutions",
    icon: UtensilsCrossed, iconBg: "bg-teal-100", iconColor: "text-teal-700",
    action90: "Build a target list of 20 food service operators, develop food service pricing and pack configuration (typically lower MSRP, larger format), and identify a broadline distributor — Sysco, US Foods, or a regional partner.",
    investment: "$20K–$80K market development",
    insight: () => "Food service offers volume without slotting and trade spend requirements — but it requires dedicated pricing and pack configurations separate from your retail line.",
  },
];

// ── Answers ────────────────────────────────────────────────────────────────

interface Answers {
  category: string;
  priceVs: string;
  margin: number;
  revenue: string;
  goal: string;
  budget: string;
  team: string;
  largePO: string;
}

// ── Scoring ────────────────────────────────────────────────────────────────

function score(id: string, a: Answers): number {
  const { category: cat, priceVs, margin, revenue, goal, budget, team, largePO } = a;
  const rev = ["under1m","1m_5m","5m_20m","20m_plus"].indexOf(revenue);
  const bud = ["under50k","50k_200k","200k_500k","500k_2m","2m_plus"].indexOf(budget);
  const teamScore = ["none","small","broker","hybrid","full"].indexOf(team);
  const sp = priceVs === "super_premium";
  const prem = priceVs === "premium";
  const val = priceVs === "value";
  const highMargin = margin >= 55;
  const midMargin = margin >= 42;
  const bigRev = rev >= 2;
  const bigBud = bud >= 3;

  switch (id) {
    case "dtc": {
      let s = 42;
      if (goal === "data") s += 18;
      if (goal === "trial") s += 10;
      if (sp || prem) s += 12;
      if (bud >= 1) s += 8;
      if (bud >= 2) s += 5;
      if (cat === "Health & Wellness" || cat === "Personal Care & Beauty") s += 5;
      return Math.min(95, s);
    }
    case "amazon": {
      let s = 32;
      if (cat === "Refrigerated / Fresh") s -= 30;
      if (rev >= 1) s += 15;
      if (goal === "volume") s += 10;
      if (midMargin) s += 10;
      if (highMargin) s += 5;
      if (bud >= 2) s += 10;
      return Math.max(5, Math.min(90, s));
    }
    case "natural": {
      let s = 28;
      if (sp) s += 28;
      else if (prem) s += 20;
      else if (priceVs === "light_premium") s += 10;
      else if (val) s -= 12;
      if (cat === "Health & Wellness" || cat === "Baby & Family" || cat === "Personal Care & Beauty") s += 12;
      if (goal === "brand_equity" || goal === "trial") s += 10;
      if (teamScore >= 2) s += 5;
      return Math.max(5, Math.min(90, s));
    }
    case "regional": {
      let s = 35;
      if (rev === 1) s += 15;
      if (rev >= 2) s += 22;
      if (teamScore >= 2) s += 12;
      if (midMargin) s += 8;
      if (bud >= 2) s += 5;
      return Math.min(90, s);
    }
    case "national": {
      let s = 8;
      if (rev === 2) s += 25;
      if (rev === 3) s += 40;
      if (teamScore === 3) s += 15;
      if (teamScore === 4) s += 25;
      if (bud === 3) s += 10;
      if (bigBud) s += 18;
      if (largePO === "yes") s += 5;
      return Math.min(90, s);
    }
    case "club": {
      let s = 8;
      if (bigRev) s += 28;
      if (largePO === "yes") s += 18;
      if (midMargin) s += 10;
      if (highMargin) s += 8;
      if (sp) s -= 12;
      if (cat === "Beverage" || cat === "Snack & Confection") s += 8;
      return Math.min(90, s);
    }
    case "cstore": {
      let s = 18;
      if (cat === "Beverage" || cat === "Snack & Confection") s += 22;
      if (priceVs === "inline" || val) s += 15;
      if (sp) s -= 18;
      if (teamScore >= 2) s += 12;
      if (goal === "volume") s += 5;
      return Math.max(5, Math.min(85, s));
    }
    case "foodservice": {
      let s = 12;
      if (cat === "Beverage" || cat === "Snack & Confection" || cat === "Household") s += 18;
      if (goal === "volume") s += 10;
      if (rev >= 1) s += 10;
      if (largePO === "yes") s += 12;
      if (sp) s -= 8;
      return Math.max(5, Math.min(80, s));
    }
    default: return 0;
  }
}

function ranked(a: Answers) {
  return CHANNELS.map(ch => ({ ...ch, score: score(ch.id, a) })).sort((x, y) => y.score - x.score);
}

function trafficLight(s: number) {
  if (s >= 60) return { label: "Strong Fit",      bg: "bg-emerald-100", text: "text-emerald-700" };
  if (s >= 35) return { label: "Develop Toward",  bg: "bg-amber-100",   text: "text-amber-700" };
  return             { label: "Not Yet",           bg: "bg-red-100",     text: "text-red-600" };
}

// ── Helpers ────────────────────────────────────────────────────────────────

const slide = { enter: { opacity: 0, x: 24 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 } };
const marginColor = (v: number) => v < 40 ? "#ef4444" : v < 55 ? "#f59e0b" : "#10b981";

function PillRow({ options, value, onChange }: { options: { id: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button key={o.id} onClick={() => onChange(o.id)}
          className={`px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${value === o.id ? "border-gold-500 bg-gold-50 text-navy-900" : "border-gray-100 hover:border-gold-200 text-gray-600 bg-white"}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function StackedPills({ options, value, onChange }: { options: { id: string; label: string; sub?: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map(o => (
        <button key={o.id} onClick={() => onChange(o.id)}
          className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${value === o.id ? "border-gold-500 bg-gold-50" : "border-gray-100 hover:border-gold-200 bg-white"}`}>
          <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${value === o.id ? "border-gold-500 bg-gold-500" : "border-gray-300"}`}>
            {value === o.id && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <div>
            <div className="font-semibold text-navy-900 text-sm">{o.label}</div>
            {o.sub && <div className="text-gray-400 text-xs mt-0.5">{o.sub}</div>}
          </div>
        </button>
      ))}
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────────────

const INIT: Answers = { category: "", priceVs: "", margin: 45, revenue: "", goal: "", budget: "", team: "", largePO: "" };

export default function ChannelPrioritizationTool() {
  const [step, setStep]   = useState(0);
  const [a, setA]         = useState<Answers>(INIT);
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA(prev => ({ ...prev, [k]: v }));

  const TOTAL = 3;
  const showResults = step === 4;

  const canProceed = (s: number) => {
    if (s === 0) return !!a.category && !!a.priceVs && !!a.revenue;
    if (s === 1) return !!a.goal && !!a.budget;
    if (s === 2) return !!a.team && !!a.largePO;
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

  const channelList = useMemo(() => ranked(a), [a]);
  const top3 = channelList.slice(0, 3);
  const rest = channelList.slice(3);

  const handleCopy = () => {
    const text = ["Channel Prioritization Results", ...top3.map((ch, i) => `${i+1}. ${ch.name} (${ch.score}% fit)`)].join("\n");
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const mailto = () => {
    const body = [
      "CHANNEL PRIORITIZATION RESULTS",
      `Name: ${name}`,
      "",
      "TOP CHANNELS",
      ...top3.map((ch, i) => `${i+1}. ${ch.name} (${ch.score}% fit)\n   Next 90 days: ${ch.action90}`),
      "",
      "Review results with Don:",
      "https://www.cmcgco.com/book-a-call",
    ].join("\n");
    return `mailto:${email}?subject=${encodeURIComponent("Your Channel Prioritization Results — Commerce Media Consulting")}&body=${encodeURIComponent(body)}`;
  };

  // ── Results ──────────────────────────────────────────────────────────────
  if (showResults) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="bg-navy-900 -mx-8 lg:-mx-10 -mt-8 lg:-mt-10 px-8 lg:px-10 pt-8 pb-6 mb-7 rounded-t-2xl">
          <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Your Channel Map</div>
          <h2 className="font-heading text-2xl font-bold text-white mb-1">Top Recommended Channels</h2>
          <p className="text-white/50 text-sm">Ranked by compatibility with your brand profile, goals, and operational capacity.</p>
        </div>

        {/* Top 3 */}
        <div className="flex flex-col gap-4 mb-6">
          {top3.map((ch, i) => {
            const tl = trafficLight(ch.score);
            return (
              <motion.div key={ch.id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border-2 border-gray-100 hover:border-gold-200 p-5 sm:p-6 transition-all">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl ${ch.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <ch.icon size={17} className={ch.iconColor} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-heading font-bold text-navy-900 text-base leading-tight">{ch.name}</span>
                        <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full flex-shrink-0">#{i + 1}</span>
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">{ch.desc}</div>
                    </div>
                  </div>
                  <div className={`flex-shrink-0 text-center px-3 py-2 rounded-xl ${tl.bg}`}>
                    <div className={`text-xl font-bold font-heading leading-none ${tl.text}`}>{ch.score}%</div>
                    <div className={`text-[10px] font-semibold mt-0.5 ${tl.text}`}>{tl.label}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{ch.insight(a)}</p>
                <div className="bg-cream-50 rounded-xl p-4 mb-3 border border-cream-200">
                  <div className="text-[10px] font-bold text-navy-900 uppercase tracking-widest mb-1.5">Your 90-Day First Move</div>
                  <p className="text-gray-600 text-xs leading-relaxed">{ch.action90}</p>
                </div>
                <div className="text-xs text-gray-400"><span className="font-semibold text-navy-700">Est. investment: </span>{ch.investment}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Remaining channels */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mb-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Other Channels — Readiness Snapshot</div>
          <div className="flex flex-col gap-3">
            {rest.map(ch => {
              const tl = trafficLight(ch.score);
              return (
                <div key={ch.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${ch.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <ch.icon size={14} className={ch.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-navy-900 text-sm leading-tight mb-1.5">{ch.name}</div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full"
                        style={{ background: ch.score >= 60 ? "#10b981" : ch.score >= 35 ? "#f59e0b" : "#ef4444" }}
                        initial={{ width: 0 }} animate={{ width: `${ch.score}%` }} transition={{ duration: 0.7, delay: 0.3 }} />
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg flex-shrink-0 ${tl.bg} ${tl.text}`}>{tl.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div className="bg-navy-900 rounded-2xl p-5 sm:p-6">
          <p className="font-heading font-semibold text-white text-base mb-1">Turn your channel map into an execution plan.</p>
          <p className="text-white/40 text-xs mb-5">A 30-minute strategy session with Don turns your channel prioritization into a 90-day commercial roadmap.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/book-a-call"
              className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-5 py-3.5 rounded-xl transition-colors text-sm flex-1 sm:flex-none">
              <Calendar size={15} /> Schedule with Don
            </Link>
            {email && (
              <a href={mailto()}
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

  // ── Calculating ──────────────────────────────────────────────────────────
  if (calculating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-5">
        <motion.div className="w-14 h-14 rounded-full border-4 border-gold-200 border-t-gold-500"
          animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }} />
        <p className="font-heading font-semibold text-navy-900 text-lg">Mapping your channels…</p>
        <p className="text-gray-400 text-sm">Scoring 8 channels against your brand profile</p>
      </div>
    );
  }

  // ── Steps ────────────────────────────────────────────────────────────────
  const stepLabels = ["Brand", "Goals", "Capacity", "Contact"];

  const REVENUE_OPTIONS = [
    { id: "under1m", label: "Under $1M" }, { id: "1m_5m", label: "$1M–$5M" },
    { id: "5m_20m", label: "$5M–$20M" }, { id: "20m_plus", label: "$20M+" },
  ];
  const PRICE_OPTIONS = [
    { id: "value", label: "Value", sub: "20%+ below category avg" },
    { id: "inline", label: "Inline", sub: "At category average" },
    { id: "light_premium", label: "Light Premium", sub: "10–20% above avg" },
    { id: "premium", label: "Premium", sub: "20–50% above avg" },
    { id: "super_premium", label: "Super-Premium", sub: "50%+ above avg" },
  ];
  const GOAL_OPTIONS = [
    { id: "trial",       label: "Drive consumer trial",    sub: "Get new buyers to try the product" },
    { id: "volume",      label: "Maximize volume",         sub: "Hit top-line revenue targets" },
    { id: "margin",      label: "Improve margin mix",      sub: "Focus on profitable channels" },
    { id: "brand_equity",label: "Build brand equity",      sub: "Establish premium positioning" },
    { id: "data",        label: "Gather consumer data",    sub: "Learn who buys and why" },
  ];
  const BUDGET_OPTIONS = [
    { id: "under50k", label: "Under $50K" }, { id: "50k_200k", label: "$50K–$200K" },
    { id: "200k_500k", label: "$200K–$500K" }, { id: "500k_2m", label: "$500K–$2M" },
    { id: "2m_plus", label: "$2M+" },
  ];
  const TEAM_OPTIONS = [
    { id: "none",   label: "Founder-led",            sub: "No dedicated sales team" },
    { id: "small",  label: "1–2 Internal Reps",      sub: "Early sales team" },
    { id: "broker", label: "Regional Broker Network", sub: "Commission-based field coverage" },
    { id: "hybrid", label: "Brokers + Internal KAMs", sub: "Blended model with account oversight" },
    { id: "full",   label: "Full Sales Organization", sub: "Regional or national sales org" },
  ];
  const PO_OPTIONS = [
    { id: "no",    label: "No",    sub: "Large orders would strain us" },
    { id: "maybe", label: "Maybe", sub: "Possible with advance notice" },
    { id: "yes",   label: "Yes",   sub: "We have the capacity" },
  ];

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
        {step === 0 && (
          <motion.div key="s0" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <h2 className="font-heading font-bold text-navy-900 text-xl sm:text-2xl mb-1">Brand Profile</h2>
            <p className="text-gray-500 text-sm mb-8">We'll match you to channels based on your category, pricing, and scale.</p>
            <div className="flex flex-col gap-7">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Product category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Beverage","Snack & Confection","Refrigerated / Fresh","Personal Care & Beauty","Household","Pet","Baby & Family","Health & Wellness","Other"].map(c => (
                    <button key={c} onClick={() => set("category", c)}
                      className={`py-3 px-3 rounded-xl border-2 text-sm font-medium transition-all text-left leading-tight ${a.category === c ? "border-gold-500 bg-gold-50 text-navy-900" : "border-gray-100 hover:border-gold-200 text-gray-600 bg-white"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Price vs. category average</label>
                <StackedPills options={PRICE_OPTIONS} value={a.priceVs} onChange={v => set("priceVs", v)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Current annual revenue</label>
                <PillRow options={REVENUE_OPTIONS} value={a.revenue} onChange={v => set("revenue", v)} />
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 sm:p-6">
                <SliderInput
                  label="Gross margin before trade spend"
                  sublabel="Net revenue minus COGS, as a % of net revenue"
                  value={a.margin} onChange={v => set("margin", v)}
                  min={20} max={70} step={1}
                  formatValue={v => v === 70 ? "70%+" : `${v}%`}
                  colorFn={marginColor}
                  benchmarks={[{ value: 35, label: "Retail floor" }, { value: 50, label: "Solid" }, { value: 62, label: "Strong" }]}
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <h2 className="font-heading font-bold text-navy-900 text-xl sm:text-2xl mb-1">Strategic Goals</h2>
            <p className="text-gray-500 text-sm mb-8">What you're optimizing for shapes which channels fit right now.</p>
            <div className="flex flex-col gap-7">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Primary 12-month goal</label>
                <StackedPills options={GOAL_OPTIONS} value={a.goal} onChange={v => set("goal", v)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Annual trade & marketing budget</label>
                <PillRow options={BUDGET_OPTIONS} value={a.budget} onChange={v => set("budget", v)} />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <h2 className="font-heading font-bold text-navy-900 text-xl sm:text-2xl mb-1">Operational Capacity</h2>
            <p className="text-gray-500 text-sm mb-8">Your infrastructure determines which channels you can realistically pursue today.</p>
            <div className="flex flex-col gap-7">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Sales team & coverage</label>
                <StackedPills options={TEAM_OPTIONS} value={a.team} onChange={v => set("team", v)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-3">Can you fulfill large retailer purchase orders?</label>
                <StackedPills options={PO_OPTIONS} value={a.largePO} onChange={v => set("largePO", v)} />
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <h2 className="font-heading font-bold text-navy-900 text-xl sm:text-2xl mb-1">Almost there</h2>
            <p className="text-gray-500 text-sm mb-7">Your personalized channel map is ready to display. Add your email to receive a copy.</p>
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
              <div className="bg-cream-50 rounded-xl p-4 flex items-start gap-3 border border-cream-200">
                <CheckCircle2 size={15} className="text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">Results display instantly. Your email lets us pre-fill your report for easy saving or sharing. No spam, no data selling.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-navy-700 disabled:opacity-0 transition-colors py-2 px-1 -ml-1">
          <ArrowLeft size={15} /> Back
        </button>
        <button onClick={goNext} disabled={!canProceed(step)}
          className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm shadow-sm">
          {step === TOTAL ? "Get My Channel Map" : "Continue"}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
