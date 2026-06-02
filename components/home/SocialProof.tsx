"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { prefix: "", end: 47, suffix: "+", label: "GTM Systems Built", decimals: 0 },
  { prefix: "$", end: 2.4, suffix: "B+", label: "Revenue Influenced", decimals: 1 },
  { prefix: "+", end: 34, suffix: "%", label: "Avg Win Rate Increase", decimals: 0 },
  { prefix: "", end: 90, suffix: " Days", label: "To First Measurable Results", decimals: 0 },
];

const testimonials = [
  {
    quote:
      "Don's five-part framework gave us our first truly repeatable quarter. Win rates are up 28% and my forecast finally matches reality at the end of the quarter — not just the beginning.",
    name: "Sarah Chen",
    title: "CRO, Series B SaaS",
    initials: "SC",
  },
  {
    quote:
      "I hired Don when we were at $4M ARR and couldn't figure out why growth had stalled. Six months later we're at $7M and have a real commercial engine — not a hope-and-pray pipeline.",
    name: "James Park",
    title: "CEO, B2B Professional Services",
    initials: "JP",
  },
  {
    quote:
      "The positioning work alone was worth the entire engagement. We went from 'we do X for companies' to a crystal-clear narrative my entire team can deliver confidently in any conversation.",
    name: "Maria Torres",
    title: "VP Revenue, Enterprise SaaS",
    initials: "MT",
  },
];

export default function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-navy-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Proof It Works
            </span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight">
            Results that move the business, not just the metrics.
          </h2>
        </motion.div>

        {/* Stats */}
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/6 border border-white/10 rounded-2xl p-7 text-center hover:bg-white/10 transition-colors duration-300"
            >
              <div className="font-heading text-4xl lg:text-5xl font-bold text-gold-400 mb-2">
                {isInView && (
                  <AnimatedCounter
                    end={stat.end}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    duration={2000}
                  />
                )}
              </div>
              <div className="text-white/70 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Quote mark */}
                <div className="text-gold-500/30 text-8xl font-serif leading-none mb-4 select-none">"</div>
                <blockquote className="text-white/80 text-lg lg:text-xl leading-relaxed mb-8 font-light italic px-4">
                  {testimonials[activeIndex].quote}
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center font-heading font-bold text-navy-900 text-sm">
                    {testimonials[activeIndex].initials}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold text-sm">{testimonials[activeIndex].name}</div>
                    <div className="text-white/65 text-xs">{testimonials[activeIndex].title}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 h-2 bg-gold-500"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
