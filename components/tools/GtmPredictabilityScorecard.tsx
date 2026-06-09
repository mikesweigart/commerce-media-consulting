"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Target,
  Users,
  BookOpen,
  Layers,
  BarChart2,
} from "lucide-react";

// ── Questions ────────────────────────────────────────────────────────────────

type Question = { id: string; text: string };
type Section = {
  key: "positioning" | "icp" | "commercial" | "campaigns" | "pipeline";
  label: string;
  fullLabel: string;
  icon: typeof Target;
  intro: string;
  questions: Question[];
};

const SECTIONS: Section[] = [
  {
    key: "positioning",
    label: "Positioning",
    fullLabel: "Positioning & Right-to-Win",
    icon: Target,
    intro: "How clearly do you know where you win — and can your team say it out loud?",
    questions: [
      { id: "p1", text: "Our team can consistently deliver a 30-second positioning narrative — who we serve, the problem we solve, and why we win." },
      { id: "p2", text: "We have clearly documented “right-to-win” segments where we reliably beat our competitors." },
    ],
  },
  {
    key: "icp",
    label: "ICP & Pricing",
    fullLabel: "ICP, Personas & Pricing/ROI",
    icon: Users,
    intro: "How well do you know who to chase — and how to prove your value in dollars?",
    questions: [
      { id: "i1", text: "We have a written ICP that goes beyond firmographics (trigger events, readiness, champion profile)." },
      { id: "i2", text: "We have at least three persona playbooks actively used by both Sales and Marketing." },
      { id: "i3", text: "We use an ROI or value model in late-stage deals — not just generic ROI claims." },
    ],
  },
  {
    key: "commercial",
    label: "Playbook",
    fullLabel: "Commercial System & Sales Playbook",
    icon: BookOpen,
    intro: "Is your sales motion a system, or does it live in your best reps' heads?",
    questions: [
      { id: "c1", text: "Every rep follows a documented sales process with clear stages and exit criteria." },
      { id: "c2", text: "We have a current sales playbook that is actively used and updated at least once a year." },
      { id: "c3", text: "New reps reach full productivity in under six months." },
    ],
  },
  {
    key: "campaigns",
    label: "Campaigns",
    fullLabel: "Buyer's Journey & Campaigns",
    icon: Layers,
    intro: "Does your marketing move deals — or just generate activity?",
    questions: [
      { id: "m1", text: "We've mapped our buyer's journey and identified the content gaps at each stage." },
      { id: "m2", text: "Marketing campaigns are planned and measured on pipeline and revenue — not just lead volume." },
    ],
  },
  {
    key: "pipeline",
    label: "Pipeline",
    fullLabel: "Pipeline, Rhythm & Experimentation",
    icon: BarChart2,
    intro: "Can you forecast with confidence — and get better every quarter?",
    questions: [
      { id: "r1", text: "Our weekly pipeline reviews are structured, consistent, and focused on movement between stages." },
      { id: "r2", text: "Our forecast accuracy over the last two quarters has been within ±15%." },
      { id: "r3", text: "We run at least 10 GTM experiments per quarter (sequences, offers, messaging, pricing tests)." },
      { id: "r4", text: "We maintain a written GTM experiment backlog with owners and statuses." },
      { id: "r5", text: "We have a weekly or biweekly GTM operating rhythm that includes Sales, Marketing, and RevOps." },
    ],
  },
];

const SCALE = [
  { v: 1, label: "Strongly disagree" },
  { v: 2, label: "Disagree" },
  { v: 3, label: "Neutral" },
  { v: 4, label: "Agree" },
  { v: 5, label: "Strongly agree" },
];

const ALL_QUESTIONS = SECTIONS.flatMap((s) => s.questions);

// ── Scoring ──────────────────────────────────────────────────────────────────

function getTier(score: number) {
  if (score >= 70) return { label: "Systemized — Ready to Scale", hex: "#C9A84C", desc: "Your go-to-market runs as a system, not a series of heroics. The question now is where to invest to compound what's already working — and how to defend it as you scale." };
  if (score >= 40) return { label: "Emerging System", hex: "#3b82f6", desc: "You have real building blocks in place, but the pieces aren't yet connected into one repeatable engine. Tightening the weakest parts is what turns inconsistent quarters into predictable ones." };
  return { label: "Unstable", hex: "#ef4444", desc: "Right now your results depend on a few people and a lot of effort. That's fixable — and the upside is large. Start with the lowest-scoring part below; it's where the leverage is." };
}

const REC_DEFS: Record<Section["key"], string> = {
  positioning: "Clarify your right-to-win. Run a win/loss review and get your positioning and ICP onto one page your whole team can deliver in 30 seconds — it's the foundation everything else is built on.",
  icp: "Tighten your ICP beyond firmographics (add triggers, readiness, and champion profile) and build a simple value/ROI model for late-stage deals, so price stops being the conversation.",
  commercial: "Codify your sales motion. Extract what your top reps actually do and turn it into a living playbook — usually a focused 4-week project that cuts ramp time 30–50%.",
  campaigns: "Map your buyer's journey and re-point marketing at pipeline, not lead volume. The middle-funnel gaps are where deals are really decided — and where most teams are thinnest.",
  pipeline: "Rebuild your pipeline stages with buyer-based exit criteria, install a weekly operating rhythm, and stand up a GTM experiment backlog so forecasting gets trustworthy and the system keeps improving.",
};

function getRecommendations(sectionScores: Record<string, number>): string[] {
  const weak = SECTIONS
    .map((s) => ({ key: s.key, score: sectionScores[s.key] }))
    .filter((x) => x.score < 65)
    .sort((a, b) => a.score - b.score)
    .map((x) => REC_DEFS[x.key]);
  if (weak.length === 0) {
    return [
      "Your fundamentals are strong across all five parts of the Revenue Architecture. The highest-value move now is a structured experimentation cadence to compound your lead — and a clear plan for where the next dollar of growth investment goes.",
    ];
  }
  return weak.slice(0, 4);
}

function buildMailto(name: string, email: string, total: number, tier: ReturnType<typeof getTier>, sectionScores: Record<string, number>, recs: string[]) {
  const body = [
    `GTM PREDICTABILITY SCORECARD`,
    name ? `Name: ${name}` : ``,
    `Overall Score: ${total}/100 — ${tier.label}`,
    ``,
    `SCORE BY PART`,
    ...SECTIONS.map((s) => `- ${s.fullLabel}: ${sectionScores[s.key]}/100`),
    ``,
    `PRIORITY MOVES`,
    ...recs.map((r, i) => `${i + 1}. ${r}`),
    ``,
    `Walk through your results with Don:`,
    `https://www.cmcgco.com/book-a-call`,
  ].filter(Boolean).join("\n");
  return `mailto:${email}?subject=${encodeURIComponent("My GTM Predictability Scorecard — Commerce Media Consulting")}&body=${encodeURIComponent(body)}`;
}

const slide = { enter: { opacity: 0, x: 24 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 } };

// ── Component ────────────────────────────────────────────────────────────────

export default function GtmPredictabilityScorecard() {
  const [step, setStep] = useState(0); // 0..4 sections, 5 contact, 6 results
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [copied, setCopied] = useState(false);

  const CONTACT_STEP = SECTIONS.length; // 5
  const RESULTS_STEP = SECTIONS.length + 1; // 6
  const showResults = step === RESULTS_STEP;

  const sectionScores = useMemo(() => {
    const out: Record<string, number> = {};
    for (const s of SECTIONS) {
      const vals = s.questions.map((q) => answers[q.id] || 0);
      const sum = vals.reduce((a, b) => a + b, 0);
      out[s.key] = Math.round((sum / (s.questions.length * 5)) * 100);
    }
    return out;
  }, [answers]);

  const total = useMemo(() => {
    const sum = ALL_QUESTIONS.reduce((a, q) => a + (answers[q.id] || 0), 0);
    return Math.round((sum / (ALL_QUESTIONS.length * 5)) * 100);
  }, [answers]);

  const tier = useMemo(() => getTier(total), [total]);
  const recs = useMemo(() => getRecommendations(sectionScores), [sectionScores]);

  const canProceed = (s: number) => {
    if (s < SECTIONS.length) return SECTIONS[s].questions.every((q) => !!answers[q.id]);
    return true; // contact step optional
  };

  const goNext = () => {
    if (step === CONTACT_STEP) {
      setCalculating(true);
      setTimeout(() => { setCalculating(false); setStep(RESULTS_STEP); }, 1100);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleCopy = () => {
    const text = [
      `GTM Predictability Score: ${total}/100 — ${tier.label}`,
      ...SECTIONS.map((s) => `${s.fullLabel}: ${sectionScores[s.key]}/100`),
      ``,
      ...recs.map((r, i) => `${i + 1}. ${r}`),
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const circum = 2 * Math.PI * 70;

  // ── Results ────────────────────────────────────────────────────────────────
  if (showResults) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
                  animate={{ strokeDashoffset: circum - (total / 100) * circum }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span className="font-heading font-bold text-4xl text-white leading-none"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                  {total}
                </motion.span>
                <span className="text-white/30 text-xs">/ 100</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Your GTM Predictability</div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3" style={{ color: tier.hex }}>{tier.label}</h2>
              <p className="text-white/60 text-sm leading-relaxed">{tier.desc}</p>
            </div>
          </div>
        </div>

        {/* Section scores */}
        <div className="mb-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Score by Part of the Revenue Architecture</div>
          {SECTIONS.map((s, idx) => {
            const pct = sectionScores[s.key];
            const barColor = pct >= 70 ? "#10b981" : pct >= 45 ? "#f59e0b" : "#ef4444";
            return (
              <div key={s.key} className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <s.icon size={13} className="text-gold-600" />
                    <span className="text-sm font-medium text-navy-900">{s.fullLabel}</span>
                  </div>
                  <span className="text-sm font-bold text-navy-900 tabular-nums">{pct}<span className="text-gray-300 font-normal">/100</span></span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ background: barColor }}
                    initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9, delay: 0.25 + idx * 0.08, ease: "easeOut" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendations */}
        <div className="bg-cream-50 rounded-2xl border border-cream-200 p-5 sm:p-6 mb-6">
          <div className="text-xs font-bold text-navy-900 uppercase tracking-widest mb-4">Your Highest-Leverage Moves</div>
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
          <p className="font-heading font-semibold text-white text-base mb-1">Turn your score into a 90-day plan.</p>
          <p className="text-white/40 text-xs mb-5">A 30-minute strategy session with Don is free, specific, and built around these results.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/book-a-call"
              className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-5 py-3.5 rounded-xl transition-colors text-sm">
              <Calendar size={15} /> Schedule with Don
            </Link>
            {email && (
              <a href={buildMailto(name, email, total, tier, sectionScores, recs)}
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
        <p className="font-heading font-semibold text-navy-900 text-lg">Scoring your GTM system…</p>
        <p className="text-gray-400 text-sm text-center">Across positioning, ICP, playbook, campaigns, and pipeline rhythm</p>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  const totalSteps = SECTIONS.length + 1; // sections + contact
  const isContact = step === CONTACT_STEP;
  const section = !isContact ? SECTIONS[step] : null;

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gold-600 uppercase tracking-widest">Step {step + 1} of {totalSteps}</span>
          <span className="text-xs text-gray-400">{Math.round((step / CONTACT_STEP) * 100)}% complete</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
          <motion.div className="h-full bg-gold-500 rounded-full" animate={{ width: `${(step / CONTACT_STEP) * 100}%` }} transition={{ duration: 0.35 }} />
        </div>
        <div className="flex justify-between">
          {SECTIONS.map((s, i) => (
            <span key={s.key} className={`text-[10px] font-medium transition-colors ${i <= step ? "text-navy-700" : "text-gray-300"}`}>{s.label}</span>
          ))}
          <span className={`text-[10px] font-medium transition-colors ${step >= CONTACT_STEP ? "text-navy-700" : "text-gray-300"}`}>Results</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {section && (
          <motion.div key={section.key} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-gold-100 flex items-center justify-center">
                <section.icon size={18} className="text-gold-700" />
              </div>
              <h2 className="font-heading font-bold text-navy-900 text-xl sm:text-2xl">{section.fullLabel}</h2>
            </div>
            <p className="text-gray-500 text-sm mb-7">{section.intro}</p>

            <div className="flex flex-col gap-6">
              {section.questions.map((q) => (
                <div key={q.id} className="bg-gray-50 rounded-2xl p-5">
                  <p className="text-navy-900 text-sm font-medium leading-relaxed mb-4">{q.text}</p>
                  <div className="grid grid-cols-5 gap-1.5">
                    {SCALE.map((opt) => {
                      const selected = answers[q.id] === opt.v;
                      return (
                        <button
                          key={opt.v}
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt.v }))}
                          className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border-2 transition-all ${selected ? "border-gold-500 bg-gold-50" : "border-gray-100 hover:border-gold-200 bg-white"}`}
                          aria-label={opt.label}
                        >
                          <span className={`font-heading font-bold text-sm ${selected ? "text-gold-700" : "text-gray-400"}`}>{opt.v}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2 px-0.5">
                    <span className="text-[10px] text-gray-400">Strongly disagree</span>
                    <span className="text-[10px] text-gray-400">Strongly agree</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {isContact && (
          <motion.div key="contact" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <h2 className="font-heading font-bold text-navy-900 text-xl sm:text-2xl mb-1">See your score</h2>
            <p className="text-gray-500 text-sm mb-7">Your results are instant — no signup required. Add your email only if you'd like a copy you can forward to your team.</p>
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Your name <span className="text-gray-300 font-normal">(optional)</span></label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Work email <span className="text-gray-300 font-normal">(optional)</span></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
              </div>
              <div className="bg-cream-50 rounded-xl p-4 flex items-start gap-3 border border-cream-200">
                <CheckCircle2 size={15} className="text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">Results are instant and private. We don't spam, and your data won't be sold. Email simply lets us pre-fill a copy of your report.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <button onClick={() => setStep((s) => s - 1)} disabled={step === 0}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-navy-700 disabled:opacity-0 transition-colors py-2 px-1 -ml-1">
          <ArrowLeft size={15} /> Back
        </button>
        <button onClick={goNext} disabled={!canProceed(step)}
          className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm shadow-sm">
          {step === CONTACT_STEP ? "Get My Score" : "Continue"}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
