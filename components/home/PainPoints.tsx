"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { AlertTriangle, Users, FileX, BarChart3, TrendingDown } from "lucide-react";

const pains = [
  {
    icon: AlertTriangle,
    title: "Your positioning sounds like everyone else's",
    desc: "Prospects can't differentiate you from three other vendors in their inbox. Every demo starts with explaining why you're different.",
  },
  {
    icon: Users,
    title: "Your ICP is fuzzy, so reps chase anything with a pulse",
    desc: "Without a tight ideal customer profile, your team burns cycles on low-fit deals that drain energy and distort your pipeline data.",
  },
  {
    icon: FileX,
    title: "You have content, but it's not moving deals",
    desc: "Marketing produces assets that never see the inside of a sales conversation. The disconnect between teams is costing you pipeline.",
  },
  {
    icon: BarChart3,
    title: "Pipeline calls feel like storytelling, not science",
    desc: "Forecasts are educated guesses dressed up as plans — and your board knows it. The number changes by 40% every week.",
  },
  {
    icon: TrendingDown,
    title: "CAC keeps climbing while win rates stay flat",
    desc: "You're spending more to acquire customers, but conversion isn't improving. The unit economics math is getting harder to defend.",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function PainPoints() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">
              Sound Familiar?
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-5">
            It's hard to grow when your GTM is built on random acts of marketing.
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            You're not alone — and it's not your fault. Most B2B companies hit
            the same five breaking points. Every one of them is fixable with the
            right system.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group p-7 rounded-2xl border border-gray-100 hover:border-gold-200 bg-white hover:bg-gold-50/40 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/6"
            >
              <div className="w-11 h-11 rounded-xl bg-gold-100 group-hover:bg-gold-200 flex items-center justify-center mb-5 transition-colors duration-300">
                <pain.icon size={20} className="text-gold-700" />
              </div>
              <h3 className="font-heading font-semibold text-navy-900 text-base mb-2.5 leading-snug">
                {pain.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{pain.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Failure stakes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-10 p-6 bg-red-50 border border-red-100 rounded-2xl"
        >
          <p className="font-heading font-semibold text-red-900 text-base mb-1.5">
            Left unchecked, these problems compound — and they don&apos;t self-correct.
          </p>
          <p className="text-red-700/80 text-sm leading-relaxed">
            Win rates stagnate. CAC climbs quarter after quarter. Boards lose faith in the GTM story.
            And eventually — a few missed quarters in — the window to fix it narrows significantly.
            The companies that don&apos;t build a system in years 2–4 spend years 5–7 defending
            ground they never fully captured.
          </p>
        </motion.div>

        {/* Bridge to guide */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-4 p-8 lg:p-10 bg-navy-900 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center flex-shrink-0 text-gold-400 text-xl font-bold">
            →
          </div>
          <div>
            <p className="font-heading font-semibold text-white text-lg mb-1.5">
              &ldquo;Every one of these problems is fixable. Most companies just don&apos;t know where to start.&rdquo;
            </p>
            <p className="text-white/65 text-sm leading-relaxed">
              Don Knapp has fixed all five breaking points with a structured, evidence-backed
              five-part system — at 47+ companies, from the same operator seat you&apos;re in now.
              Not another set of tactics. A complete GTM operating model your whole team can execute.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
