import { Hero } from "@/components/sections/hero";
import { Readouts } from "@/components/sections/readouts";
import {
  AboutSection,
  ApproachSection,
  CapabilitiesSection,
  ContactSection,
  DuskBand,
  ExperienceSection,
  Marquee,
  WorkSection,
} from "@/components/sections/sections";

/**
 * Home. The page walks from morning mist (hero) to night (contact),
 * whichever theme is chosen.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Readouts />
      <Marquee />
      <WorkSection />
      <CapabilitiesSection />
      <ExperienceSection />
      <ApproachSection />
      <AboutSection />
      <DuskBand />
      <ContactSection />
    </>
  );
}
