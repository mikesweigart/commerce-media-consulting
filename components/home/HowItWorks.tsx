"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Map, Rocket } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Calendar,
    title: "Book Your Strategy Session",
    desc: "Share your current GTM, the pains you're experiencing, and your two-year growth goals. In 30 focused minutes we'll diagnose your situation and surface your highest-leverage opportunities.",
    cta: null,
  },
  {
    number: "2",
    icon: Map,
    title: "Receive Your Revenue Architecture Plan",
    desc: "We synthesize your inputs into a quantified, execution-ready blueprint. You'll see exactly where each part of your GTM system stands and what needs to change, in priority order.",
    cta: "See what's in the plan →",
  },
  {
    number: "3",
    icon: Rocket,
    title: "Execute with Confidence",
    desc: "We work alongside your team to implement the playbooks, campaigns, and operating rhythm over 90 days — then set you up to run it independently and compound results quarter over quarter.",
    cta: null,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">
              The Process
            </span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-4">
            How It Works in 3 Steps
          </h2>
          <p className="text-gray-500 text-lg">
            From your first conversation to a running commercial engine — the
            path is clear, the timeline is defined, and the outcomes are measurable.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.66%+28px)] right-[calc(16.66%+28px)] h-px bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex flex-col"
              >
                {/* Number circle */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-navy-900 border-4 border-gold-500 flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-lg shadow-gold-500/20">
                  <span className="font-heading font-bold text-gold-400 text-xl">{step.number}</span>
                </div>

                <div className="bg-cream-50 rounded-2xl p-7 border border-cream-200 hover:border-gold-200 hover:shadow-lg hover:shadow-gold-500/8 transition-all duration-300 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center mb-4">
                    <step.icon size={18} className="text-navy-700" />
                  </div>
                  <h3 className="font-heading font-bold text-navy-900 text-lg mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.desc}</p>
                  {step.cta && (
                    <Link
                      href="/how-we-work"
                      className="text-xs font-semibold text-gold-600 hover:text-gold-700 transition-colors"
                    >
                      {step.cta}
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/book-a-call"
            className="group inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg text-[15px]"
          >
            Start Step 1 Today
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
