"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Trash2, Calendar, Copy, Check, Trophy, TrendingDown, Target, Sparkles } from "lucide-react";

// ── Option sets ──────────────────────────────────────────────────────────────

const INDUSTRIES = ["SaaS", "Healthcare", "FinTech", "Manufacturing", "Professional Services", "Other"];
const SIZES = ["1–50", "51–200", "201–1,000", "1,001–5,000", "5,001+"];
const CHAMPIONS = ["C-level", "VP", "Director", "Manager", "Individual contributor"];
const TRIGGERS = ["Cost pressure", "Growth initiative", "Compliance / regulation", "Tech debt", "Competitive threat", "Other"];
const LOSS_REASONS = ["Price", "Competitor", "Timing", "No decision", "Missing feature", "Incumbent / relationship"];

type Deal = {
  outcome: "won" | "lost";
  industry: string;
  size: string;
  champion: string;
  trigger: string;
  lossReason?: string;
};

const MIN_DEALS = 5;

const SAMPLE: Deal[] = [
  { outcome: "won",  industry: "Healthcare", size: "51–200", champion: "VP", trigger: "Cost pressure" },
  { outcome: "won",  industry: "Healthcare", size: "51–200", champion: "VP", trigger: "Compliance / regulation" },
  { outcome: "won",  industry: "Healthcare", size: "201–1,000", champion: "C-level", trigger: "Cost pressure" },
  { outcome: "lost", industry: "Healthcare", size: "5,001+", champion: "Manager", trigger: "Growth initiative", lossReason: "No decision" },
  { outcome: "won",  industry: "FinTech", size: "51–200", champion: "VP", trigger: "Cost pressure" },
  { outcome: "lost", industry: "SaaS", size: "1,001–5,000", champion: "Individual contributor", trigger: "Tech debt", lossReason: "Price" },
  { outcome: "lost", industry: "SaaS", size: "5,001+", champion: "Manager", trigger: "Growth initiative", lossReason: "No decision" },
  { outcome: "won",  industry: "Healthcare", size: "51–200", champion: "C-level", trigger: "Compliance / regulation" },
  { outcome: "lost", industry: "Manufacturing", size: "5,001+", champion: "Director", trigger: "Competitive threat", lossReason: "Competitor" },
  { outcome: "won",  industry: "FinTech", size: "201–1,000", champion: "VP", trigger: "Cost pressure" },
  { outcome: "lost", industry: "SaaS", size: "1,001–5,000", champion: "Manager", trigger: "Growth initiative", lossReason: "No decision" },
  { outcome: "won",  industry: "Healthcare", size: "51–200", champion: "VP", trigger: "Cost pressure" },
];

// ── Analysis ─────────────────────────────────────────────────────────────────

type Stat = { value: string; count: number; wins: number; winRate: number };

function attrStats(deals: Deal[], key: keyof Deal): Stat[] {
  const map = new Map<string, { count: number; wins: number }>();
  for (const d of deals) {
    const v = d[key] as string;
    if (!v) continue;
    const cur = map.get(v) || { count: 0, wins: 0 };
    cur.count += 1;
    if (d.outcome === "won") cur.wins += 1;
    map.set(v, cur);
  }
  return [...map.entries()]
    .map(([value, { count, wins }]) => ({ value, count, wins, winRate: Math.round((wins / count) * 100) }))
    .filter((s) => s.count >= 2)
    .sort((a, b) => b.winRate - a.winRate || b.count - a.count);
}

function analyze(deals: Deal[]) {
  const total = deals.length;
  const wins = deals.filter((d) => d.outcome === "won").length;
  const overall = Math.round((wins / total) * 100);

  const industry = attrStats(deals, "industry");
  const size = attrStats(deals, "size");
  const champion = attrStats(deals, "champion");
  const trigger = attrStats(deals, "trigger");

  const losses = deals.filter((d) => d.outcome === "lost");
  const lossMap = new Map<string, number>();
  for (const d of losses) {
    if (!d.lossReason) continue;
    lossMap.set(d.lossReason, (lossMap.get(d.lossReason) || 0) + 1);
  }
  const lossDist = [...lossMap.entries()]
    .map(([reason, count]) => ({ reason, count, pct: Math.round((count / Math.max(losses.length, 1)) * 100) }))
    .sort((a, b) => b.count - a.count);

  return { total, wins, losses: losses.length, overall, industry, size, champion, trigger, lossDist };
}

// ── Component ────────────────────────────────────────────────────────────────

const EMPTY: Deal = { outcome: "won", industry: "", size: "", champion: "", trigger: "", lossReason: "" };

export default function IcpFitAnalyzer() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [draft, setDraft] = useState<Deal>(EMPTY);
  const [analyzed, setAnalyzed] = useState(false);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const canAdd =
    !!draft.industry && !!draft.size && !!draft.champion && !!draft.trigger &&
    (draft.outcome === "won" || !!draft.lossReason);

  const addDeal = () => {
    if (!canAdd) return;
    setDeals((d) => [...d, draft]);
    setDraft({ ...EMPTY, outcome: draft.outcome });
  };

  const removeDeal = (i: number) => setDeals((d) => d.filter((_, idx) => idx !== i));

  const results = useMemo(() => (analyzed ? analyze(deals) : null), [analyzed, deals]);

  const icpStatement = useMemo(() => {
    if (!results) return "";
    const bestIndustry = results.industry[0]?.value;
    const bestSize = results.size[0]?.value;
    const bestChampion = results.champion[0]?.value;
    const bestTrigger = results.trigger[0]?.value;
    const parts: string[] = [];
    if (bestSize && bestIndustry) parts.push(`${bestSize}-employee ${bestIndustry} companies`);
    else if (bestIndustry) parts.push(`${bestIndustry} companies`);
    else if (bestSize) parts.push(`${bestSize}-employee companies`);
    if (bestTrigger) parts.push(`where ${bestTrigger.toLowerCase()} is the active trigger`);
    if (bestChampion) parts.push(`and the champion is typically a ${bestChampion}`);
    return parts.length ? `Your strongest-fit customers are ${parts.join(", ")}.` : "";
  }, [results]);

  const handleCopy = () => {
    if (!results) return;
    const text = [
      `ICP & DEAL FIT ANALYSIS`,
      `Deals analyzed: ${results.total} (${results.wins} won, ${results.losses} lost) — overall win rate ${results.overall}%`,
      ``,
      `BEST-FIT PROFILE`,
      icpStatement,
      ``,
      `TOP LOSS REASON: ${results.lossDist[0] ? `${results.lossDist[0].reason} (${results.lossDist[0].pct}% of losses)` : "n/a"}`,
      ``,
      `Next step — turn this into a full ICP scorecard with Don:`,
      `https://www.cmcgco.com/book-a-call`,
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const mailto = () => {
    if (!results) return "#";
    const body = [
      `ICP & DEAL FIT ANALYSIS`,
      `Deals analyzed: ${results.total} (${results.wins} won, ${results.losses} lost)`,
      `Overall win rate: ${results.overall}%`,
      ``,
      `BEST-FIT PROFILE`,
      icpStatement,
      ``,
      `WIN RATE BY INDUSTRY`,
      ...results.industry.map((s) => `- ${s.value}: ${s.winRate}% (${s.count} deals)`),
      ``,
      `TOP LOSS REASONS`,
      ...results.lossDist.map((l) => `- ${l.reason}: ${l.pct}%`),
      ``,
      `Turn this into a full ICP scorecard and GTM plan with Don:`,
      `https://www.cmcgco.com/book-a-call`,
    ].join("\n");
    return `mailto:${email}?subject=${encodeURIComponent("My ICP & Deal Fit Analysis — Commerce Media Consulting")}&body=${encodeURIComponent(body)}`;
  };

  // ── Results ────────────────────────────────────────────────────────────────
  if (analyzed && results) {
    const bestRows = [results.industry[0], results.size[0], results.champion[0], results.trigger[0]].filter(Boolean) as Stat[];
    const worst = [...results.industry, ...results.size, ...results.champion, ...results.trigger]
      .filter((s) => s.winRate < results.overall)
      .sort((a, b) => a.winRate - b.winRate)
      .slice(0, 3);

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Summary */}
        <div className="bg-navy-900 -mx-8 lg:-mx-10 -mt-8 lg:-mt-10 px-8 lg:px-10 pt-8 lg:pt-10 pb-8 mb-7 rounded-t-2xl">
          <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">Your Deal Patterns</div>
          <div className="flex items-end gap-6">
            <div>
              <div className="font-heading font-bold text-5xl text-gold-400 leading-none">{results.overall}%</div>
              <div className="text-white/50 text-xs mt-1">Overall win rate</div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Across {results.total} deals — {results.wins} won, {results.losses} lost. Here's where you're strong, where you're leaking, and the ICP your own data points to.
            </p>
          </div>
        </div>

        {/* Best-fit profile */}
        {icpStatement && (
          <div className="bg-gold-50 rounded-2xl border border-gold-200 p-5 sm:p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Target size={15} className="text-gold-700" />
              <span className="text-xs font-bold text-gold-800 uppercase tracking-widest">Your Data-Backed ICP</span>
            </div>
            <p className="text-navy-900 text-base font-medium leading-relaxed">{icpStatement}</p>
          </div>
        )}

        {/* Win patterns */}
        {bestRows.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={14} className="text-emerald-600" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Where You Win Most</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {bestRows.map((s, i) => (
                <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3">
                  <span className="text-sm text-navy-900 font-medium">{s.value}</span>
                  <span className="text-sm font-bold text-emerald-600 tabular-nums">{s.winRate}% <span className="text-gray-300 font-normal">· {s.count} deals</span></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loss patterns */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown size={14} className="text-red-500" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Where You Leak</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {worst.length > 0 ? worst.map((s, i) => (
              <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3">
                <span className="text-sm text-navy-900 font-medium">{s.value}</span>
                <span className="text-sm font-bold text-red-500 tabular-nums">{s.winRate}% <span className="text-gray-300 font-normal">· {s.count} deals</span></span>
              </div>
            )) : (
              <p className="text-sm text-gray-400">No clear under-performing segment yet — add more deals to sharpen the picture.</p>
            )}
            {results.lossDist[0] && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 mt-1">
                <span className="text-sm text-red-900">
                  Your most common loss reason is <strong>{results.lossDist[0].reason}</strong> ({results.lossDist[0].pct}% of losses).
                  {results.lossDist[0].reason === "No decision" && " That usually signals weak qualification or urgency — an ICP problem, not a sales problem."}
                  {results.lossDist[0].reason === "Price" && " That often means the value wasn't quantified, not that you're too expensive."}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-navy-900 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={15} className="text-gold-400" />
            <p className="font-heading font-semibold text-white text-base">Turn this into an operational ICP scorecard.</p>
          </div>
          <p className="text-white/40 text-xs mb-5">These patterns are the raw material. In a 30-minute session, Don turns them into an A/B/C scorecard you can wire into routing, targeting, and pipeline reviews.</p>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email me this analysis (optional)"
            className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 mb-3 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/book-a-call"
              className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-5 py-3.5 rounded-xl transition-colors text-sm flex-1 sm:flex-none">
              <Calendar size={15} /> Schedule with Don
            </Link>
            {email && (
              <a href={mailto()}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-xl transition-colors text-sm">
                Email My Analysis
              </a>
            )}
            <button onClick={handleCopy}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-xl transition-colors text-sm">
              {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
        </div>

        <button onClick={() => setAnalyzed(false)} className="mt-5 text-sm text-gray-400 hover:text-navy-700 transition-colors">
          ← Edit deals
        </button>
      </motion.div>
    );
  }

  // ── Entry form ───────────────────────────────────────────────────────────
  const selectClass = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-400";

  return (
    <div>
      <h2 className="font-heading font-bold text-navy-900 text-xl sm:text-2xl mb-1">Add your recent deals</h2>
      <p className="text-gray-500 text-sm mb-6">
        Enter {MIN_DEALS}+ recent closed deals — won and lost. You don't need every detail; the basics are enough to surface patterns.
        {deals.length === 0 && <> Want to see it in action first? <button onClick={() => { setDeals(SAMPLE); }} className="text-gold-600 font-semibold hover:text-gold-700 underline underline-offset-2">Load sample data</button>.</>}
      </p>

      {/* Draft form */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-5">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button onClick={() => setDraft((d) => ({ ...d, outcome: "won" }))}
            className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${draft.outcome === "won" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 bg-white text-gray-500"}`}>
            Won
          </button>
          <button onClick={() => setDraft((d) => ({ ...d, outcome: "lost" }))}
            className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${draft.outcome === "lost" ? "border-red-400 bg-red-50 text-red-600" : "border-gray-200 bg-white text-gray-500"}`}>
            Lost
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-navy-800 mb-1.5">Industry</label>
            <select value={draft.industry} onChange={(e) => setDraft((d) => ({ ...d, industry: e.target.value }))} className={selectClass}>
              <option value="">Select…</option>
              {INDUSTRIES.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-800 mb-1.5">Company size (employees)</label>
            <select value={draft.size} onChange={(e) => setDraft((d) => ({ ...d, size: e.target.value }))} className={selectClass}>
              <option value="">Select…</option>
              {SIZES.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-800 mb-1.5">Champion role</label>
            <select value={draft.champion} onChange={(e) => setDraft((d) => ({ ...d, champion: e.target.value }))} className={selectClass}>
              <option value="">Select…</option>
              {CHAMPIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-800 mb-1.5">Primary trigger</label>
            <select value={draft.trigger} onChange={(e) => setDraft((d) => ({ ...d, trigger: e.target.value }))} className={selectClass}>
              <option value="">Select…</option>
              {TRIGGERS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          {draft.outcome === "lost" && (
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy-800 mb-1.5">Primary loss reason</label>
              <select value={draft.lossReason} onChange={(e) => setDraft((d) => ({ ...d, lossReason: e.target.value }))} className={selectClass}>
                <option value="">Select…</option>
                {LOSS_REASONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          )}
        </div>
        <button onClick={addDeal} disabled={!canAdd}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all text-sm">
          <Plus size={15} /> Add deal
        </button>
      </div>

      {/* Deal list */}
      {deals.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{deals.length} deal{deals.length !== 1 ? "s" : ""} added</span>
            {deals.length < MIN_DEALS && <span className="text-xs text-amber-600">Add {MIN_DEALS - deals.length} more to analyze</span>}
          </div>
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
            {deals.map((d, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-3 py-2.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${d.outcome === "won" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                  {d.outcome === "won" ? "WON" : "LOST"}
                </span>
                <span className="text-xs text-gray-600 flex-1 truncate">
                  {d.industry} · {d.size} · {d.champion} · {d.trigger}{d.lossReason ? ` · ${d.lossReason}` : ""}
                </span>
                <button onClick={() => removeDeal(i)} className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={() => setAnalyzed(true)} disabled={deals.length < MIN_DEALS}
        className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-navy-900 font-bold py-3.5 rounded-xl transition-all text-sm shadow-md shadow-gold-500/20">
        Analyze my deals
      </button>
    </div>
  );
}
