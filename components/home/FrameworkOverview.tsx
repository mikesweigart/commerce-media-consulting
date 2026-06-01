"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import { Target, Users, BookOpen, Layers, BarChart2, ArrowRight } from "lucide-react";

const parts = [
  {
    number: "01",
    icon: Target,
    title: "Strategic Positioning & Right-to-Win",
    outcome:
      "Know exactly where you win and why — with a narrative your whole team can deliver in 30 seconds.",
    color: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-200/60",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    number: "02",
    icon: Users,
    title: "ICP, Personas & Pricing/ROI",
    outcome:
      "Spend 80% of your time on accounts with 3–5x higher LTV/CAC and quantify your value so price isn't the conversation.",
    color: "from-violet-500/10 to-violet-600/5",
    border: "border-violet-200/60",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
  },
  {
    number: "03",
    icon: BookOpen,
    title: "Commercial System & Sales Playbook",
    outcome:
      "Codify a sales process that raises win rates, shortens ramp by 30–50%, and makes every rep your best rep.",
    color: "from-emerald-500/10 to-emerald-600/5",
    border: "border-emerald-200/60",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    number: "04",
    icon: Layers,
    title: "Buyer's-Journey Collateral & Campaigns",
    outcome:
      "Run 4–6 week campaigns that deliver content your buyers actually need, mapped to every stage of the journey.",
    color: "from-orange-500/10 to-orange-600/5",
    border: "border-orange-200/60",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
  },
  {
    number: "05",
    icon: BarChart2,
    title: "Pipeline, Rhythm & Experimentation",
    outcome:
      "Move from hope-based to data-backed forecasting in under 90 days with a weekly operating rhythm that compounds.",
    color: "from-gold-500/10 to-gold-600/5",
    border: "border-gold-200/60",
    iconBg: "bg-gold-100",
    iconColor: "text-gold-700",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FrameworkOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">
              The System
            </span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-5">
            The 5-Part GTM Growth System
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Not a set of tactics. A complete operating model — built in sequence,
            customized to your business, executed with your team.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {parts.map((part, i) => (
            <motion.div
              key={i}
              variants={item}
              className={`group relative p-7 rounded-2xl border ${part.border} bg-gradient-to-br ${part.color} hover:shadow-xl hover:shadow-black/6 hover:-translate-y-1 transition-all duration-300 ${
                i === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`w-11 h-11 rounded-xl ${part.iconBg} flex items-center justify-center`}>
                  <part.icon size={20} className={part.iconColor} />
                </div>
                <span className="font-heading text-4xl font-bold text-black/8 select-none">
                  {part.number}
                </span>
              </div>
              <h3 className="font-heading font-bold text-navy-900 text-base mb-3 leading-snug">
                {part.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{part.outcome}</p>
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 hover:text-gold-600 transition-colors group/link"
              >
                Explore this part
                <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/how-we-work"
            className="inline-flex items-center gap-2 text-navy-700 font-semibold border border-navy-200 hover:border-navy-400 hover:bg-navy-50 px-7 py-3.5 rounded-xl transition-all duration-200 text-sm"
          >
            See the full framework
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
