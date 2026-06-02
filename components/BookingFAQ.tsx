"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faq = [
  {
    q: "What happens in the strategy session?",
    a: "The first 20 minutes are diagnosis — you share your current GTM situation, pains, and goals. The next 20 minutes are analysis — I share what I'm seeing and map your gaps to the five-part framework. The last 5 minutes are forward-looking — we discuss whether working together makes sense and what that would look like. It's a working session, not a sales presentation.",
  },
  {
    q: "Is there any cost for the strategy session?",
    a: "No. The session is free and there's no obligation to engage afterward. My goal is for you to leave with two or three genuinely useful insights regardless of whether we work together.",
  },
  {
    q: "Who should attend from our team?",
    a: "The CEO/Founder and/or CRO. The session is most useful when the person who owns the GTM outcome is in the room. If you have a VP Sales or CMO who is deeply involved in the GTM strategy, they're welcome to join.",
  },
  {
    q: "What if we're not ready to engage right now?",
    a: "That's fine. Many clients book a strategy session 6–12 months before they're ready to engage. The session is useful on its own, and you'll know where to find me when the timing is right.",
  },
  {
    q: "How do you price engagements?",
    a: "Engagements are priced as fixed-scope projects, typically over a 90-day period. Pricing is based on the scope of the five-part system being implemented — which we'll discuss if the session confirms we're a fit. I work with companies at $2M to $100M+ ARR.",
  },
  {
    q: "How many clients do you work with at a time?",
    a: "A maximum of four active client engagements at any point. This allows me to bring the attention each engagement requires. If I'm at capacity, I'll let you know in the session and we'll discuss a timeline.",
  },
];

export default function BookingFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {faq.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-6 text-left group"
            aria-expanded={open === i}
          >
            <h3 className="font-heading font-semibold text-navy-900 text-base group-hover:text-gold-600 transition-colors">
              {item.q}
            </h3>
            <ChevronDown
              size={18}
              className={`flex-shrink-0 text-gray-400 group-hover:text-gold-500 transition-all duration-300 ${
                open === i ? "rotate-180 text-gold-500" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              open === i ? "max-h-96 pb-6" : "max-h-0"
            }`}
          >
            <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
