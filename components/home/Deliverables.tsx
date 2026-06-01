"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const deliverables = [
  { part: "01", item: "Positioning Brief & Right-to-Win Narrative" },
  { part: "01", item: "3–5 Value Pillar One-Pagers with Proof Points" },
  { part: "02", item: "ICP Scorecard & Tiering Model" },
  { part: "02", item: "3–5 Persona Playbooks with Trigger Language" },
  { part: "02", item: "ROI/Value Calculator & Economic Value Model" },
  { part: "03", item: "Full Commercial Sales Playbook" },
  { part: "03", item: "Enablement Toolkit & Objection Handling Guide" },
  { part: "03", item: "Discovery & Demo Talk Tracks" },
  { part: "04", item: "Buyer's-Journey Collateral Map & Gap Analysis" },
  { part: "04", item: "4–6 Week Campaign Blueprints (2–3 Campaigns)" },
  { part: "05", item: "KPI Dashboard & Metrics Framework" },
  { part: "05", item: "Experiment Backlog & Operating Rhythm Template" },
];

const partColors: Record<string, string> = {
  "01": "bg-blue-100 text-blue-700",
  "02": "bg-violet-100 text-violet-700",
  "03": "bg-emerald-100 text-emerald-700",
  "04": "bg-orange-100 text-orange-700",
  "05": "bg-gold-100 text-gold-700",
};

export default function Deliverables() {
  return (
    <section className="py-24 lg:py-32 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">
              What You'll Walk Away With
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-4">
            Execution-ready assets, not decks and recommendations.
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Every engagement produces tangible, team-ready deliverables mapped
            to each of the five framework parts — so you can run the system
            the day we finish.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deliverables.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all duration-200"
            >
              <CheckCircle2 size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 ${partColors[d.part]}`}>
                  Part {d.part}
                </span>
                <p className="text-navy-800 text-sm font-medium leading-snug">{d.item}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
