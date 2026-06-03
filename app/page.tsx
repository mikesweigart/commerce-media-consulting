import Hero from "@/components/home/Hero";
import LogoBar from "@/components/home/LogoBar";
import PainPoints from "@/components/home/PainPoints";
import FrameworkOverview from "@/components/home/FrameworkOverview";
import SocialProof from "@/components/home/SocialProof";
import HowItWorks from "@/components/home/HowItWorks";
import Deliverables from "@/components/home/Deliverables";
import BookingCTA from "@/components/home/BookingCTA";

export default function Home() {
  return (
    <>
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
