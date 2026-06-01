"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2, TrendingUp } from "lucide-react";

const expectList = [
  "Bring your current GTM metrics and goals — nothing to prepare",
  "We'll map your gaps onto the 5-part framework live",
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
            <p className="text-white/55 text-lg leading-relaxed mb-8">
              Pick a time that works for you. No pitch, no pressure — just an
              honest diagnosis of where your GTM stands and a clear picture of
              what a 90-day engagement would produce.
            </p>

            <ul className="flex flex-col gap-4 mb-10">
              {expectList.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 text-white/30 text-xs border-t border-white/10 pt-6">
              <Clock size={14} />
              <span>45-minute session · No obligation · Strategy first, sales never</span>
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

              {/* Calendly placeholder */}
              <div className="bg-cream-100 rounded-xl p-8 mb-6 text-center border-2 border-dashed border-cream-200">
                <div className="text-navy-400 text-sm mb-3">📅 Calendar Integration</div>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">
                  Add your Calendly, HubSpot Meetings, or Chili Piper embed URL here to enable live booking.
                </p>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-navy-900 text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-navy-800 transition-colors"
                >
                  Configure Booking Link →
                </a>
              </div>

              <p className="text-center text-gray-400 text-xs mb-5">— or —</p>

              <Link
                href="/book-a-call"
                className="group flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-4 px-6 rounded-xl transition-all duration-200 text-[15px] shadow-md shadow-gold-500/20 w-full"
              >
                See Full Booking Page
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <p className="text-center text-gray-400 text-xs mt-4">
                Typically responds within 24 hours · Free, no-obligation session
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
