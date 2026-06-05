import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MotionDiv, MotionLi } from "@/components/ui/Motion";
import BookingFAQ from "@/components/BookingFAQ";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { CheckCircle2, Clock, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Strategy Session",
  description:
    "Book a 30-minute growth strategy session with Don Knapp. No pitch — just an honest diagnosis of your GTM situation and a clear path forward.",
};

const whatToBring = [
  "Your current ARR and 2-year growth target",
  "A sense of your biggest GTM pain point right now",
  "The one metric you most need to improve in the next 90 days",
];

const whatYouLeave = [
  "A clear picture of where each part of your GTM system stands today",
  "The 2–3 highest-leverage priorities for the next 90 days",
  "A framework for thinking about your GTM as a system, not a set of tactics",
  "A clear sense of whether working together makes sense — and what that looks like",
];


export default function BookACall() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What happens in the strategy session?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The first 15 minutes are diagnosis — you share your current GTM situation, pains, and goals. The next 10 minutes are analysis — Don shares what he's seeing and maps your gaps to the Revenue Architecture. The last 5 minutes are forward-looking — you discuss whether working together makes sense.",
                },
              },
              {
                "@type": "Question",
                name: "Is there any cost for the strategy session?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. The session is free and there's no obligation to engage afterward. The goal is for you to leave with two or three genuinely useful insights regardless of whether you work together.",
                },
              },
              {
                "@type": "Question",
                name: "Who should attend from our team?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The CEO/Founder and/or CRO. The session is most useful when the person who owns the GTM outcome is in the room.",
                },
              },
              {
                "@type": "Question",
                name: "What if we're not ready to engage right now?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "That's fine. Many clients book a strategy session 6–12 months before they're ready to engage. The session is useful on its own.",
                },
              },
              {
                "@type": "Question",
                name: "How do you price engagements?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Engagements are usually 6 or 12 months, and are contracted in half-day increments — a half day, a full day, or two to three days a week — depending on scope. Monthly investment ranges from $4,500 to $25,000. We work with companies generating between $2M and $40M in revenue.",
                },
              },
              {
                "@type": "Question",
                name: "How many clients do you work with at a time?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A maximum of four active client engagements at any point. If Don is at capacity, he will let you know in the session and discuss a timeline.",
                },
              },
            ],
          }),
        }}
      />
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">
                  Strategy Session
                </span>
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Let&apos;s diagnose your GTM together.
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                In 30 minutes, we&apos;ll surface exactly where your GTM is leaking revenue
                and what to fix first — across positioning, pipeline, playbook, and marketing
                alignment. No pitch, no pressure. Just an honest diagnosis and a clear plan.
              </p>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-white/10">
                <Image
                  src="/donconference.png"
                  alt="Don Knapp leading a strategy session with a leadership team"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white/75 text-xs font-medium leading-snug">
                    A working session — not a presentation. Don maps your GTM gaps live, with your team in the room.
                  </p>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Booking section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: context */}
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-navy-900 mb-8">
                What to expect from the session
              </h2>

              <div className="mb-8">
                <h3 className="font-heading font-semibold text-navy-800 text-sm mb-4 uppercase tracking-widest text-xs">
                  Bring to the session
                </h3>
                <ul className="flex flex-col gap-3">
                  {whatToBring.map((item, i) => (
                    <MotionLi
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-navy-100 border border-navy-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-navy-700 text-[10px] font-bold">{i + 1}</span>
                      </div>
                      <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                    </MotionLi>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="font-heading font-semibold text-navy-800 text-sm mb-4 uppercase tracking-widest text-xs">
                  What you'll leave with
                </h3>
                <ul className="flex flex-col gap-3">
                  {whatYouLeave.map((item, i) => (
                    <MotionLi
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 size={16} className="text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                    </MotionLi>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-gray-400 text-xs border-t border-gray-100 pt-6">
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  30 minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  Video call (Google Meet or Zoom)
                </span>
                <span className="text-emerald-600 font-semibold">Free · No obligation</span>
              </div>
            </div>

            {/* Right: booking card */}
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:sticky lg:top-28"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                <div className="bg-navy-900 px-8 py-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400">
                        <Image src="/donimage.png" alt="Don Knapp" width={48} height={48} className="w-full h-full object-cover object-top" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-white text-sm">Don Knapp</div>
                        <div className="text-white/50 text-xs">Managing Partner · Commerce Media Consulting Group</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-3 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-300 text-[10px] font-semibold whitespace-nowrap">2 of 4 spots open</span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Live scheduling */}
                  <CalendlyEmbed />

                  <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-500 text-xs mb-3">
                      Prefer email? Reach Don directly — he responds within 24 hours.
                    </p>
                    <a
                      href="mailto:don.knapp.cmcg@gmail.com?subject=Growth%20Strategy%20Session%20Request"
                      className="group inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-gold-300 hover:bg-cream-50 text-navy-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-sm"
                    >
                      Email Don Instead
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </a>
                    <p className="text-gray-400 text-xs mt-4">
                      Free · No obligation
                    </p>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-navy-900 mb-12 text-center">
            Frequently asked questions
          </h2>
          <BookingFAQ />
        </div>
      </section>
    </>
  );
}
