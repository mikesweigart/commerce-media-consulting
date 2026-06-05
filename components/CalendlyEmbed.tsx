"use client";

import Script from "next/script";

// Base event URL (no month pin so it opens on the current month).
// Brand colors are passed through Calendly's supported query params.
const CALENDLY_URL =
  "https://calendly.com/don-knapp-cmcg/30min?hide_gdpr_banner=1&primary_color=c9a84c&text_color=0a1628";

export default function CalendlyEmbed({
  height = 680,
}: {
  height?: number;
}) {
  return (
    <>
      <div
        className="calendly-inline-widget rounded-xl overflow-hidden"
        data-url={CALENDLY_URL}
        style={{ minWidth: "320px", height: `${height}px` }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
