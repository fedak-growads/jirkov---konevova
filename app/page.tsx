import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Description from "@/components/Description";
import Walkthrough from "@/components/Walkthrough";
import InlineCTA from "@/components/InlineCTA";
import Matterport from "@/components/Matterport";
import Parameters from "@/components/Parameters";
import Benefits from "@/components/Benefits";
import MortgageCalculator from "@/components/MortgageCalculator";
import MidCTA from "@/components/MidCTA";
import Gallery from "@/components/Gallery";
import VideoTour from "@/components/VideoTour";
import Location from "@/components/Location";
import Agent from "@/components/Agent";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Share from "@/components/Share";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import PixelTracker from "@/components/PixelTracker";

export default function PropertyPage() {
  return (
    <>
      <TopBar />
      <main className="flex-1">
        <div id="top" />
        <Hero />
        <Description />
        <div id="prochazka" className="scroll-mt-14">
          <Walkthrough />
        </div>
        <InlineCTA />
        <Matterport />
        <div id="galerie" className="scroll-mt-14">
          <Gallery />
        </div>
        <VideoTour />
        <div id="parametry" className="scroll-mt-14">
          <Parameters />
        </div>
        <Benefits />
        <div id="kalkulacka" className="scroll-mt-14">
          <MortgageCalculator />
        </div>
        <MidCTA />
        <div id="lokalita" className="scroll-mt-14">
          <Location />
        </div>
        <SocialProof />
        <FAQ />
        <LeadForm />
        <Agent />
        <Share />
        <Footer />
        <StickyMobileBar />
        <PixelTracker />
      </main>
    </>
  );
}
