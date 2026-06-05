import { Metadata } from "next";
import { MotionDiv, MotionLi } from "@/components/ui/Motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "About Don Knapp",
  description:
    "Don Knapp is the Managing Partner of Commerce Media Consulting Group, a B2B GTM advisory practice helping CEOs and CROs build predictable revenue systems.",
};

const credentials = [
  "20+ years in B2B go-to-market leadership",
  "GTM systems built across SaaS, services, and technology companies",
  "Former VP Sales and CMO roles at venture-backed and PE-backed B2B companies",
  "$2.4B+ in revenue influenced across client engagements",
  "Works with companies from $2M to $40M in revenue",
  "Expertise across SaaS, B2B services, healthcare technology, and financial services",
];

const philosophy = [
  {
    title: "Evidence Over Opinion",
    desc: "Every recommendation is grounded in data from your business — your win/loss patterns, your customer behavior, your pipeline dynamics. Not generic best practices, but evidence specific to your situation.",
  },
  {
    title: "Execution Over Insight",
    desc: "The most valuable thing I can deliver is not a smart analysis — it's a system your team can actually run. Every engagement produces execution-ready deliverables, not decks and recommendations.",
  },
  {
    title: "Sequence Over Simultaneity",
    desc: "GTM systems are built in the right order. Positioning before ICP. ICP before playbook. Playbook before campaigns. I've seen what happens when companies skip steps, and it always costs more than doing it right the first time.",
  },
  {
    title: "Speed Over Perfection",
    desc: "A good plan executed in 90 days is worth more than a perfect plan executed in 18 months. I build momentum early, show results quickly, and refine the system as we learn.",
  },
];

export default function About() {
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <MotionDiv
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">
                  About Don
                </span>
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                A guide, not a guru.
              </h1>
              <p className="text-white/85 text-lg leading-relaxed mb-6">
                B2B companies hit the same GTM wall: positioning that won&apos;t stick,
                a pipeline that won&apos;t hold, and forecasts the board won&apos;t trust.
                Don Knapp has fixed all three for 47+ companies — as a 20-year commercial
                operator first, as an advisor since.
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                His approach is diagnostic and evidence-based: he starts with your data,
                your customers, and your team&apos;s real capabilities — then builds from
                there. He&apos;s not here to sell a methodology. He&apos;s here to fix your GTM.
              </p>
            </MotionDiv>
            {/* Photo */}
            <MotionDiv
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.25 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="w-72 h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/dongreatpicture.png"
                    alt="Don Knapp, Managing Partner at Commerce Media Consulting Group"
                    width={288}
                    height={384}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gold-500 text-navy-900 rounded-xl px-4 py-2.5 shadow-xl">
                  <div className="text-sm font-bold font-heading">20+ Years</div>
                  <div className="text-[10px] opacity-70">GTM Leadership</div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Why I Built This */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">
              The Origin
            </span>
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900 mb-8 leading-tight">
            Why I built this practice
          </h2>
          <div className="space-y-5 text-gray-600 text-[17px] leading-relaxed">
            <p>
              I spent the first twenty years of my career as an operator — running sales teams,
              building marketing functions, and serving as a commercial leader at several
              venture-backed and PE-backed B2B companies. I saw what worked and what didn't,
              and I noticed a consistent pattern: the companies that struggled weren't struggling
              because they had bad products or bad people. They were struggling because their
              GTM was disconnected — positioning that didn't stick, an ICP that was too broad,
              a sales process that varied by rep, marketing that didn't move pipeline.
            </p>
            <p>
              When I started working as an advisor, I realized I could solve those problems in
              a fraction of the time it had taken me to figure them out as an operator — because
              I'd seen the same patterns play out across dozens of companies. The Revenue
              Architecture I use today is the result of 20 years of pattern recognition, compressed
              into a structured system that I've now implemented with 47+ companies.
            </p>
            <p>
              The reason I do this work is simple: there's nothing more satisfying than watching
              a commercial team that was stuck and frustrated start winning consistently. When
              reps start closing deals they used to lose. When forecasts start matching reality.
              When the board starts trusting the GTM story. That's what we're building together.
            </p>
          </div>
          <div className="mt-10 bg-cream-50 border border-cream-200 rounded-2xl p-7">
            <Quote size={24} className="text-gold-400 mb-4" />
            <p className="font-heading font-semibold text-navy-900 text-xl leading-snug mb-3">
              "You shouldn't have to guess your way to growth. A system exists. Most companies just haven't built it yet."
            </p>
            <p className="text-gray-500 text-sm">— Don Knapp, Managing Partner</p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy-900 mb-8">Experience & Credentials</h2>
              <ul className="flex flex-col gap-4">
                {credentials.map((c, i) => (
                  <MotionLi
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{c}</span>
                  </MotionLi>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy-900 mb-8">How I Work with You</h2>
              <div className="space-y-5">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Every engagement starts with 90 minutes of deep diagnosis — your current
                  GTM state, your data, your team's capabilities, and your two-year goals.
                  I don't come in with a pre-built answer. I come in with a structured
                  process for finding the right answer for your specific situation.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Engagements are intensive and collaborative. I work alongside your team,
                  not around them — because the system only works if your people understand
                  it and own it. My goal is to make myself unnecessary as quickly as possible,
                  by building a system your team can run independently.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  I work with a maximum of four clients at a time. That's not a marketing
                  scarcity tactic — it's what allows me to give every engagement the depth
                  of attention it requires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900 mb-12 text-center">
            Working Principles
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {philosophy.map((p, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="p-7 bg-cream-50 rounded-2xl border border-cream-200 hover:border-gold-200 hover:shadow-lg hover:shadow-gold-500/8 transition-all duration-300"
              >
                <h3 className="font-heading font-bold text-navy-900 text-base mb-3">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
            Want to work together?
          </h2>
          <p className="text-white/75 text-lg mb-8">
            Book a 30-minute strategy session and let&apos;s see if we&apos;re a fit.
          </p>
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
