"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Circle, Calendar } from "lucide-react";
import Link from "next/link";

const STEPS = ["Company", "GTM State", "Challenges", "Contact"];

const revenueBands = [
  "Under $1M",
  "$1M – $5M",
  "$5M – $20M",
  "$20M – $50M",
  "$50M – $100M",
  "Over $100M",
];

const industries = [
  "SaaS / Software",
  "B2B Services / Consulting",
  "Healthcare / Life Sciences",
  "Financial Services",
  "Manufacturing / Industrial",
  "Technology / IT Services",
  "Other",
];

const channels = [
  "Direct Sales (Outbound)",
  "Inbound / Marketing-Led",
  "Channel / Partner Sales",
  "Product-Led Growth",
  "Account-Based Marketing (ABM)",
  "Events & Conferences",
  "Referral Program",
  "Social Selling / LinkedIn",
];

const painPoints = [
  "Positioning unclear or undifferentiated",
  "ICP too broad or poorly defined",
  "Sales process inconsistent across reps",
  "Content not mapped to buyer journey",
  "Pipeline forecast unreliable",
  "CAC too high or rising",
  "Win rates flat or declining",
  "Long or unpredictable sales cycles",
  "Marketing and sales misaligned",
];

const growthTargets = [
  "Maintain and protect current revenue",
  "Grow 20–30% over 2 years",
  "Grow 30–50% over 2 years",
  "Double (2x) revenue in 2 years",
  "More than double (2x+) in 2 years",
];

const roles = ["CEO / Founder", "CRO", "VP Sales", "CMO / VP Marketing", "COO", "Other"];

interface SurveyData {
  companyName: string;
  revenueBand: string;
  industry: string;
  selectedChannels: string[];
  selectedPains: string[];
  growthTarget: string;
  name: string;
  email: string;
  role: string;
  wantsEmail: boolean;
}

interface FrameworkStatus {
  part: string;
  title: string;
  status: "strong" | "opportunity" | "needs-attention";
  insight: string;
  recommendation: string;
}

function generateResults(data: SurveyData): FrameworkStatus[] {
  const { selectedPains, growthTarget } = data;
  const isAggressive = growthTarget.includes("Double") || growthTarget.includes("More than");

  const positioningPains = ["Positioning unclear", "Win rates flat", "CAC too high"];
  const icpPains = ["ICP too broad", "CAC too high", "Win rates flat"];
  const commercialPains = ["Sales process inconsistent", "Win rates flat", "Long or unpredictable"];
  const contentPains = ["Content not mapped", "Marketing and sales misaligned", "CAC too high"];
  const pipelinePains = ["Pipeline forecast unreliable", "Long or unpredictable", "Win rates flat"];

  function getStatus(painKeywords: string[]): "strong" | "opportunity" | "needs-attention" {
    const matches = selectedPains.filter((p) =>
      painKeywords.some((kw) => p.toLowerCase().includes(kw.toLowerCase()))
    ).length;
    if (matches >= 2) return "needs-attention";
    if (matches === 1) return "opportunity";
    return "strong";
  }

  return [
    {
      part: "01",
      title: "Strategic Positioning & Right-to-Win",
      status: getStatus(positioningPains),
      insight:
        getStatus(positioningPains) === "needs-attention"
          ? "Your positioning likely needs significant sharpening. Buyers can't clearly differentiate you from alternatives, which drives price-based competition and low win rates."
          : getStatus(positioningPains) === "opportunity"
          ? "There are positioning gaps worth addressing. Sharpening your right-to-win narrative in your top 2–3 segments could meaningfully improve win rates."
          : "Your positioning appears solid. The opportunity is to build on it with more specific competitive differentiation and proof points.",
      recommendation:
        "Run a positioning sprint: win/loss interviews, segment prioritization, and competitive mapping to build a narrative your entire team can execute.",
    },
    {
      part: "02",
      title: "ICP, Personas & Pricing/ROI",
      status: getStatus(icpPains),
      insight:
        getStatus(icpPains) === "needs-attention"
          ? "Your ICP definition may be too broad, causing your team to spend significant resources on low-probability accounts and raising CAC without improving outcomes."
          : getStatus(icpPains) === "opportunity"
          ? "There's room to tighten your ICP with behavioral and technographic signals that predict high-fit accounts. Even moderate improvement here raises win rates measurably."
          : isAggressive
          ? "Your ICP may be solid for current scale, but aggressive growth targets require re-validating ICP assumptions and expanding to adjacent segments systematically."
          : "Your ICP appears well-defined. Focus on the pricing/ROI model to ensure value is fully quantified in every sales conversation.",
      recommendation:
        "Conduct an ICP validation exercise using your top 20 customers by LTV. Add behavioral triggers and technographic signals to your scoring model.",
    },
    {
      part: "03",
      title: "Commercial System & Sales Playbook",
      status: getStatus(commercialPains),
      insight:
        getStatus(commercialPains) === "needs-attention"
          ? "Your sales process likely varies significantly by rep, with your top performers running a different motion than everyone else — slowing ramp time and suppressing team-wide win rates."
          : getStatus(commercialPains) === "opportunity"
          ? "There's inconsistency in how your commercial team operates. Codifying best practices from your top performers would improve consistency and accelerate new rep ramp."
          : "Your commercial system appears reasonably consistent. The opportunity is to codify late-stage skills — multi-threading, negotiation, executive engagement — that separate good reps from great ones.",
      recommendation:
        "Run win/loss interviews with your top 3 reps and 10 recent customers. Build a commercial playbook covering discovery, demo, objection handling, and negotiation.",
    },
    {
      part: "04",
      title: "Buyer's-Journey Collateral & Campaigns",
      status: getStatus(contentPains),
      insight:
        getStatus(contentPains) === "needs-attention"
          ? "Your content and marketing activities are likely disconnected from the actual buyer journey, producing activity (traffic, leads) without a clear path to pipeline and revenue."
          : getStatus(contentPains) === "opportunity"
          ? "Your content strategy has gaps — likely concentrated at the top and bottom of the funnel, with the middle stages (evaluation, consensus building) underserved."
          : "Your content appears reasonably mapped to the buyer journey. The opportunity is building structured 4–6 week campaign programs that drive specific pipeline outcomes.",
      recommendation:
        "Conduct a content audit against the 5-stage buyer's journey. Identify the middle-funnel gaps and build 2–3 targeted campaign blueprints for your top ICP segments.",
    },
    {
      part: "05",
      title: "Pipeline, Rhythm & Experimentation",
      status: getStatus(pipelinePains),
      insight:
        getStatus(pipelinePains) === "needs-attention"
          ? "Your pipeline management and forecasting process likely lacks the data infrastructure and operating discipline to produce reliable, board-ready forecasts — creating organizational uncertainty and missed quarters."
          : getStatus(pipelinePains) === "opportunity"
          ? "Your pipeline process has room for improvement in measurement rigor. More consistent stage exit criteria and coverage tracking would meaningfully improve forecast accuracy."
          : "Your pipeline management appears functional. The opportunity is adding an experimentation operating rhythm — systematic commercial testing — that compounds results quarter over quarter.",
      recommendation:
        "Implement stage exit criteria, a coverage model, and a weekly pipeline review rhythm. Add an experiment backlog and bi-weekly experiment review to your operating cadence.",
    },
  ];
}

function StatusBadge({ status }: { status: FrameworkStatus["status"] }) {
  if (status === "needs-attention")
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-full">
        <AlertCircle size={12} />
        Needs Attention
      </span>
    );
  if (status === "opportunity")
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
        <Circle size={12} />
        Opportunity
      </span>
    );
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
      <CheckCircle2 size={12} />
      Strong
    </span>
  );
}

export default function GrowthAudit() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState<SurveyData>({
    companyName: "",
    revenueBand: "",
    industry: "",
    selectedChannels: [],
    selectedPains: [],
    growthTarget: "",
    name: "",
    email: "",
    role: "",
    wantsEmail: true,
  });

  const results = showResults ? generateResults(data) : [];

  function next() {
    setDirection(1);
    if (step === STEPS.length - 1) {
      setShowResults(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() {
    setDirection(-1);
    if (showResults) {
      setShowResults(false);
    } else {
      setStep((s) => s - 1);
    }
  }

  function toggleChannel(ch: string) {
    setData((d) => ({
      ...d,
      selectedChannels: d.selectedChannels.includes(ch)
        ? d.selectedChannels.filter((c) => c !== ch)
        : [...d.selectedChannels, ch],
    }));
  }

  function togglePain(p: string) {
    setData((d) => ({
      ...d,
      selectedPains: d.selectedPains.includes(p)
        ? d.selectedPains.filter((x) => x !== p)
        : d.selectedPains.length < 3
        ? [...d.selectedPains, p]
        : d.selectedPains,
    }));
  }

  function isStepValid(): boolean {
    if (step === 0) return data.companyName.trim() !== "" && data.revenueBand !== "" && data.industry !== "";
    if (step === 1) return data.selectedChannels.length > 0;
    if (step === 2) return data.selectedPains.length > 0 && data.growthTarget !== "";
    if (step === 3) return data.email.includes("@") && data.email.includes(".");
    return true;
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  if (showResults) {
    const needsAttention = results.filter((r) => r.status === "needs-attention").length;
    const opportunities = results.filter((r) => r.status === "opportunity").length;

    return (
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Results header */}
          <div className="bg-navy-900 rounded-2xl p-8 mb-8 text-center">
            <div className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">Your Growth Snapshot</div>
            <h2 className="font-heading text-3xl font-bold text-white mb-2">
              {data.companyName ? data.companyName + "'s" : "Your"} GTM Assessment
            </h2>
            <p className="text-white/55 text-sm">
              Based on your inputs, here's where your Revenue Architecture stands today.
            </p>
            <div className="flex justify-center gap-6 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{needsAttention}</div>
                <div className="text-white/40 text-xs">Needs Attention</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">{opportunities}</div>
                <div className="text-white/40 text-xs">Opportunities</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{5 - needsAttention - opportunities}</div>
                <div className="text-white/40 text-xs">Strong</div>
              </div>
            </div>
          </div>

          {/* Results cards */}
          <div className="flex flex-col gap-5 mb-8">
            {results.map((r, i) => (
              <motion.div
                key={r.part}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold text-gray-300 mr-2">Part {r.part}</span>
                    <h3 className="font-heading font-bold text-navy-900 text-base inline">{r.title}</h3>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{r.insight}</p>
                <div className="bg-cream-50 rounded-xl p-4 border border-cream-200">
                  <span className="text-xs font-semibold text-navy-700 block mb-1">Recommended Action:</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{r.recommendation}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gold-50 border border-gold-200 rounded-2xl p-8 text-center">
            <h3 className="font-heading font-bold text-navy-900 text-2xl mb-3">
              Walk Through This Plan with Don
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md mx-auto">
              In a 30-minute working session, we'll review your snapshot, prioritize the highest-leverage opportunities, and outline what a 90-day engagement would produce for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book-a-call"
                className="group flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-[15px]"
              >
                <Calendar size={18} />
                Book a 30-Minute Session
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={back}
                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-600 font-medium px-8 py-4 rounded-xl transition-all duration-200 text-sm"
              >
                Review My Answers
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i < step
                    ? "bg-gold-500 text-navy-900"
                    : i === step
                    ? "bg-navy-900 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {i < step ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  i === step ? "text-navy-900" : "text-gray-400"
                }`}
              >
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${i < step ? "bg-gold-400" : "bg-gray-200"}`} style={{ width: 32 }} />
              )}
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold-500 rounded-full"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="mt-2 text-right text-xs text-gray-400">
          Step {step + 1} of {STEPS.length}
        </div>
      </div>

      {/* Step content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Step 1: Company Info */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-navy-900 mb-1">Tell us about your company</h2>
                  <p className="text-gray-500 text-sm">We'll use this to personalize your growth snapshot.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-800 mb-2">Company Name</label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    value={data.companyName}
                    onChange={(e) => setData({ ...data, companyName: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-800 mb-2">Annual Revenue</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {revenueBands.map((rb) => (
                      <button
                        key={rb}
                        onClick={() => setData({ ...data, revenueBand: rb })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          data.revenueBand === rb
                            ? "bg-navy-900 text-white border-navy-900"
                            : "bg-white text-gray-600 border-gray-200 hover:border-navy-300"
                        }`}
                      >
                        {rb}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-800 mb-2">Industry</label>
                  <select
                    value={data.industry}
                    onChange={(e) => setData({ ...data, industry: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all bg-white"
                  >
                    <option value="">Select your industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Channels */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-navy-900 mb-1">Current GTM channels</h2>
                  <p className="text-gray-500 text-sm">Which channels does your team currently use to generate pipeline? Select all that apply.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {channels.map((ch) => (
                    <button
                      key={ch}
                      onClick={() => toggleChannel(ch)}
                      className={`flex items-center gap-3 py-3 px-4 rounded-xl border text-sm font-medium transition-all text-left ${
                        data.selectedChannels.includes(ch)
                          ? "bg-navy-900 text-white border-navy-900"
                          : "bg-white text-gray-700 border-gray-200 hover:border-navy-300"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                        data.selectedChannels.includes(ch)
                          ? "bg-gold-500 border-gold-500"
                          : "border-gray-300"
                      }`}>
                        {data.selectedChannels.includes(ch) && (
                          <CheckCircle2 size={10} className="text-navy-900" />
                        )}
                      </div>
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Challenges */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-navy-900 mb-1">Your biggest challenges</h2>
                  <p className="text-gray-500 text-sm">Select up to 3 challenges your team is facing right now.</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-navy-800">Current Pain Points</span>
                    <span className={`text-xs font-medium ${data.selectedPains.length === 3 ? "text-gold-600" : "text-gray-400"}`}>
                      {data.selectedPains.length}/3 selected
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {painPoints.map((p) => {
                      const selected = data.selectedPains.includes(p);
                      const maxed = data.selectedPains.length === 3 && !selected;
                      return (
                        <button
                          key={p}
                          onClick={() => !maxed && togglePain(p)}
                          disabled={maxed}
                          className={`flex items-center gap-3 py-3 px-4 rounded-xl border text-sm font-medium transition-all text-left ${
                            selected
                              ? "bg-navy-900 text-white border-navy-900"
                              : maxed
                              ? "opacity-40 cursor-not-allowed bg-white text-gray-500 border-gray-200"
                              : "bg-white text-gray-700 border-gray-200 hover:border-navy-300"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                            selected ? "bg-gold-500 border-gold-500" : "border-gray-300"
                          }`}>
                            {selected && <CheckCircle2 size={10} className="text-navy-900" />}
                          </div>
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-800 mb-2">2-Year Growth Target</label>
                  <div className="flex flex-col gap-2">
                    {growthTargets.map((gt) => (
                      <button
                        key={gt}
                        onClick={() => setData({ ...data, growthTarget: gt })}
                        className={`py-3 px-4 rounded-xl border text-sm font-medium text-left transition-all ${
                          data.growthTarget === gt
                            ? "bg-navy-900 text-white border-navy-900"
                            : "bg-white text-gray-700 border-gray-200 hover:border-navy-300"
                        }`}
                      >
                        {gt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-navy-900 mb-1">Where should we send your snapshot?</h2>
                  <p className="text-gray-500 text-sm">Enter your email and we&apos;ll generate your personalized GTM report.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-800 mb-2">
                    Work Email <span className="text-gold-600">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-800 mb-2">
                    Your Name <span className="text-gray-400 font-normal text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-100">
        <button
          onClick={back}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            step === 0 ? "opacity-0 pointer-events-none" : "text-gray-500 hover:text-navy-900"
          }`}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          onClick={next}
          disabled={!isStepValid()}
          className={`group flex items-center gap-2 font-bold px-8 py-3.5 rounded-xl transition-all duration-200 text-[15px] ${
            isStepValid()
              ? "bg-gold-500 hover:bg-gold-400 text-navy-900 shadow-md shadow-gold-500/20"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {step === STEPS.length - 1 ? "Get My Report" : "Continue"}
          <ArrowRight size={17} className={isStepValid() ? "transition-transform group-hover:translate-x-1" : ""} />
        </button>
      </div>
    </div>
  );
}
