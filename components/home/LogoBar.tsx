"use client";

import { motion } from "framer-motion";

const sectors = [
  "B2B SaaS",
  "Revenue Operations",
  "Healthcare Technology",
  "FinTech & Financial Services",
  "Professional Services",
  "B2B Services / Consulting",
  "Manufacturing & Industrial",
];

export default function LogoBar() {
  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-gray-400 text-[11px] font-semibold tracking-[0.2em] uppercase mb-5"
        >
          B2B GTM systems built for growth-stage leaders across
        </motion.h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {sectors.map((sector, i) => (
            <motion.span
              key={sector}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="px-4 py-2 rounded-full bg-cream-50 border border-gray-200 text-navy-700 text-xs font-medium"
            >
              {sector}
            </motion.span>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-gray-400 text-[11px] mt-5"
        >
          $2.4B+ revenue influenced &nbsp;·&nbsp; $2M to $40M client revenue &nbsp;·&nbsp; 20+ years operator experience
        </motion.p>
      </div>
    </section>
  );
}
