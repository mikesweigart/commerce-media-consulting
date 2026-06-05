import type { Metadata } from "next";
import HowWeWorkContent from "@/components/HowWeWorkContent";

export const metadata: Metadata = {
  title: "How We Work — The Revenue Architecture",
  description:
    "The Revenue Architecture is a complete, sequenced GTM operating model — positioning, ICP, sales playbook, campaigns, and pipeline rhythm — built for your business and implemented with your team.",
  alternates: { canonical: "/how-we-work" },
  openGraph: {
    title: "How We Work — The Revenue Architecture",
    description:
      "A complete, sequenced GTM operating model built for your business and implemented with your team — not another set of tactics.",
    url: "/how-we-work",
  },
};

export default function HowWeWork() {
  return <HowWeWorkContent />;
}
