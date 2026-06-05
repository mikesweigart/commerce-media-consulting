"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2, TrendingUp, Calendar } from "lucide-react";

const expectList = [
  "Bring your current GTM metrics and goals — nothing to prepare",
  "We'll map your gaps onto the Revenue Architecture live",
  "You'll leave with 2–3 concrete priorities for the next 90 days",
];

export default function BookingCTA() {
  return (
    <section className="py-24 lg:py-32 bg-navy-900 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-[100px] -translate-y-1/2 translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">
                Get Started
              </span>
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Ready to build a GTM system your board trusts?
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-5">
              Imagine walking into your next board meeting with a forecast that
              doesn&apos;t change by 40% overnight. Imagine every rep delivering
              the same sharp positioning narrative — and buyers understanding
              your differentiation before the demo is over. Imagine a pipeline
              that fills predictably, not randomly. That&apos;s what a working
              GTM system produces.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              The 30-minute strategy session is where it starts — an honest
              diagnosis of where your GTM stands and a clear picture of what
              90 days of focused work would produce.
            </p>

            <ul className="flex flex-col gap-4 mb-10">
              {expectList.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 text-white/55 text-xs border-t border-white/10 pt-6">
              <Clock size={14} />
              <span>30-minute session · No obligation · Strategy first, sales never</span>
            </div>
          </motion.div>

          {/* Right: booking card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl shadow-black/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center">
                  <TrendingUp size={18} className="text-navy-900" />
                </div>
                <div>
                  <div className="font-heading font-bold text-navy-900 text-sm">Growth Strategy Session</div>
                  <div className="text-gray-400 text-xs">with Don Knapp · Managing Partner</div>
                </div>
              </div>

              {/* Live scheduling available */}
              <div className="bg-cream-100 rounded-xl p-6 mb-5 text-center border border-cream-200">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2.5">
                  <Calendar size={16} className="text-emerald-600" />
                </div>
                <p className="text-navy-800 text-sm font-semibold mb-1">Don&apos;s calendar is open</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Pick a 30-minute slot that works for you — confirmed instantly, with no back-and-forth.
                </p>
              </div>

              <Link
                href="/book-a-call"
                className="group flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-4 px-6 rounded-xl transition-all duration-200 text-[15px] shadow-md shadow-gold-500/20 w-full mb-3"
              >
                Pick a Time with Don
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="mailto:don.knapp.cmcg@gmail.com?subject=Growth%20Strategy%20Session%20Request"
                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-navy-900 font-medium py-3.5 px-6 rounded-xl transition-all duration-200 text-sm w-full"
              >
                Email Don Directly
              </a>

              <p className="text-center text-gray-400 text-xs mt-4">
                Free · No obligation · Responds within 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
