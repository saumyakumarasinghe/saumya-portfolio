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
  TankSection,
  WorkSection,
} from "@/components/sections/sections";

/**
 * Home — "Field notes from the hill country".
 * The page walks from morning mist (hero) through the monsoon (the tank)
 * to night (contact), whichever theme is chosen.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Readouts />
      <Marquee />
      <WorkSection />
      <TankSection />
      <CapabilitiesSection />
      <ExperienceSection />
      <ApproachSection />
      <AboutSection />
      <DuskBand />
      <ContactSection />
    </>
  );
}
