import Hero from "@/components/home/Hero";
import LogoBar from "@/components/home/LogoBar";
import PainPoints from "@/components/home/PainPoints";
import FrameworkOverview from "@/components/home/FrameworkOverview";
import SocialProof from "@/components/home/SocialProof";
import HowItWorks from "@/components/home/HowItWorks";
import Deliverables from "@/components/home/Deliverables";
import BookingCTA from "@/components/home/BookingCTA";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Commerce Media Consulting Group",
  description:
    "B2B go-to-market advisory that helps CEOs and CROs build the Revenue Architecture — a complete GTM operating model that turns chaos into predictable growth.",
  url: "https://commerce-media-consulting.vercel.app",
  email: "don.knapp.cmcg@gmail.com",
  founder: {
    "@type": "Person",
    name: "Don Knapp",
    jobTitle: "Managing Partner",
    sameAs: "https://www.linkedin.com/in/don-knapp-2037504/",
  },
  areaServed: "US",
  knowsAbout: [
    "B2B go-to-market strategy",
    "Strategic positioning",
    "Ideal customer profile",
    "Sales playbooks",
    "Pipeline management",
    "Revenue operations",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Hero />
      <LogoBar />
      <PainPoints />
      <FrameworkOverview />
      <SocialProof />
      <HowItWorks />
      <Deliverables />
      <BookingCTA />
    </>
  );
}
