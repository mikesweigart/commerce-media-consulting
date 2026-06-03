"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

const metrics = [
  { value: "+34%", label: "Win Rate Increase" },
  { value: "90 Days", label: "To First Results" },
  { value: "+22%", label: "NRR Growth" },
  { value: "−41%", label: "CAC Payback" },
];

const benefits = [
  "Stop losing deals to better-positioned competitors",
  "Give every rep a playbook they can actually execute",
  "Walk into board meetings with a forecast they'll trust",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-900">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/80 via-transparent to-navy-800/50" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gold-500/5 blur-[120px] -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-navy-600/20 blur-[100px] translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="h-px w-10 bg-gold-500" />
              <span className="text-gold-400 text-xs font-semibold tracking-[0.22em] uppercase">
                B2B Go-to-Market Advisory
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-[68px] font-bold text-white leading-[1.04] mb-7"
            >
              Turn GTM Chaos Into{" "}
              <span className="text-gold-400">Predictable</span> Growth
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/80 text-lg leading-relaxed mb-9 max-w-[480px]"
            >
              Your product is better than how it&apos;s being sold. The
              positioning is blurry, the forecast changes every week, and your
              board wants confidence you can&apos;t give them yet. Don Knapp
              spent 20 years fixing exactly this problem from inside companies
              like yours — as VP Sales, CMO, and CRO — before building this
              practice. He can solve it faster because he&apos;s been in your
              seat.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-3 mb-10"
            >
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  </div>
                  <span className="text-white/70 text-sm">{b}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/book-a-call"
                  className="group flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-xl shadow-gold-500/25 text-[15px]"
                >
                  Book a Growth Strategy Session
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/growth-audit"
                  className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-medium px-8 py-4 rounded-xl transition-all duration-200 text-[15px]"
                >
                  Start the 3-Minute Audit
                </Link>
              </div>
              {/* Mobile-only trust bar */}
              <div className="flex items-center gap-2 lg:hidden flex-wrap">
                <span className="text-white/45 text-xs">47+ Systems Built</span>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-white/45 text-xs">$2.4B+ Influenced</span>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-white/45 text-xs">90-Day Results</span>
              </div>
            </motion.div>
          </div>

          {/* Right: floating metrics card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.35 }}
            className="hidden lg:flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
              className="relative w-full max-w-sm"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-7 shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/40 text-[11px] font-semibold tracking-widest uppercase">
                    Typical Client Outcomes
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {metrics.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
                      className="bg-white/6 border border-white/10 rounded-xl p-4"
                    >
                      <div className="text-2xl font-bold text-gold-400 mb-1 font-heading">
                        {m.value}
                      </div>
                      <div className="text-white/45 text-[11px] leading-snug">{m.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-white/25 text-xs">Client engagements 2019–2024</span>
                  <TrendingUp size={14} className="text-green-400" />
                </div>
              </div>

              {/* Don Knapp badge */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.8 }}
                className="absolute -top-5 -right-5 bg-gold-500 text-navy-900 rounded-xl px-4 py-2.5 shadow-xl shadow-gold-500/30"
              >
                <div className="text-sm font-bold font-heading">Don Knapp</div>
                <div className="text-[10px] font-medium opacity-70">Managing Partner</div>
              </motion.div>

              {/* Revenue badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.4 }}
                className="absolute -bottom-5 -left-5 bg-navy-800 border border-white/10 text-white rounded-xl px-4 py-2.5 shadow-xl"
              >
                <div className="text-sm font-bold font-heading">$2.4B+</div>
                <div className="text-[11px] text-white/50">Revenue Influenced</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
        <motion.div
          animate={{ scaleY: [0, 1, 0], y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
}
