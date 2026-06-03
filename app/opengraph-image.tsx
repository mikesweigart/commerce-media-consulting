import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Commerce Media Consulting Group — B2B GTM Advisory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A1628",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(201,168,76,0.07) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow blob top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Gold accent line */}
        <div
          style={{
            width: 60,
            height: 4,
            background: "#C9A84C",
            borderRadius: 2,
            marginBottom: 28,
          }}
        />

        {/* Logo mark */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 40 }}>
          <span
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            cmcg
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#C9A84C",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginTop: 5,
            }}
          >
            Commerce Media Consulting
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.08,
            maxWidth: 880,
            marginBottom: 24,
          }}
        >
          {"Turn GTM Chaos Into "}
          <span style={{ color: "#C9A84C" }}>Predictable</span>
          {" Growth"}
        </div>

        {/* Sub-headline */}
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.58)",
            maxWidth: 680,
            lineHeight: 1.5,
            marginBottom: 56,
          }}
        >
          B2B go-to-market advisory for CEOs and CROs who need a system their
          board trusts — built by Don Knapp, 20+ years as VP Sales, CMO, and CRO.
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 52, alignItems: "center" }}>
          {[
            { value: "47+", label: "GTM Systems Built" },
            { value: "$2.4B+", label: "Revenue Influenced" },
            { value: "90 Days", label: "To First Results" },
          ].map((s, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ fontSize: 30, fontWeight: 800, color: "#C9A84C" }}>
                {s.value}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.38)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
