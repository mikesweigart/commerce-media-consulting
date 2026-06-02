import { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { articles } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "B2B go-to-market insights from Don Knapp — on positioning, ICP, sales playbooks, pipeline management, pricing, and building a GTM system that produces predictable revenue.",
};

const categoryColors: Record<string, string> = {
  "Go-to-Market Strategy": "bg-blue-100 text-blue-700",
  "GTM Strategy": "bg-violet-100 text-violet-700",
  "Positioning": "bg-emerald-100 text-emerald-700",
  "Pipeline Management": "bg-orange-100 text-orange-700",
  "Commercial System": "bg-red-100 text-red-700",
  "Pricing Strategy": "bg-gold-100 text-gold-700",
  "Marketing": "bg-pink-100 text-pink-700",
  "Implementation": "bg-teal-100 text-teal-700",
  "Operations": "bg-indigo-100 text-indigo-700",
  "Leadership": "bg-gray-100 text-gray-700",
};

export default function Insights() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">
                Insights & Frameworks
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              GTM intelligence for B2B leaders.
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Practical frameworks, evidence-based perspectives, and real-world
              applications from 20+ years of building go-to-market systems at
              B2B companies of every size.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Featured Article
          </div>
          <Link href={`/insights/${featured.slug}`} className="group block">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-12 flex items-center justify-center aspect-[4/3] lg:aspect-auto">
                <div className="text-center">
                  <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 ${categoryColors[featured.category] || "bg-gray-100 text-gray-700"}`}>
                    {featured.category}
                  </span>
                  <div className="text-white/20 text-8xl font-serif leading-none mb-2">"</div>
                  <p className="text-white/70 text-lg font-light italic leading-relaxed">
                    {featured.excerpt.substring(0, 120)}...
                  </p>
                </div>
              </div>
              <div>
                <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 ${categoryColors[featured.category] || "bg-gray-100 text-gray-700"}`}>
                  {featured.category}
                </span>
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900 mb-4 leading-tight group-hover:text-gold-600 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {featured.readTime} min read
                  </span>
                  <span>·</span>
                  <span>Don Knapp</span>
                </div>
                <span className="inline-flex items-center gap-2 text-navy-700 font-semibold text-sm group-hover:text-gold-600 transition-colors">
                  Read article
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
          </motion.div>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
              <Link
                href={`/insights/${article.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gold-200 hover:shadow-xl hover:shadow-gold-500/8 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Card top */}
                <div className="bg-gradient-to-br from-navy-900 to-navy-800 p-8 flex items-center justify-center h-40">
                  <div className="text-center">
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${categoryColors[article.category] || "bg-gray-100 text-gray-700"}`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-navy-900 text-base mb-3 leading-snug group-hover:text-gold-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                    {article.excerpt.substring(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Clock size={12} />
                      {article.readTime} min
                    </span>
                    <span className="text-gold-600 font-semibold text-xs group-hover:gap-2 flex items-center gap-1 transition-all">
                      Read
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Want to discuss how these frameworks apply to your business?
          </h2>
          <p className="text-white/75 text-lg mb-8">Book a strategy session with Don.</p>
          <Link
            href="/book-a-call"
            className="group inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-10 py-4 rounded-xl transition-all duration-200 text-[15px]"
          >
            Book a Strategy Session
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
