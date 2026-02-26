import Hero from "@/components/home/Hero";
import TechMarquee from "@/components/home/TechMarquee";
import WhatIDo from "@/components/home/WhatIDo";
import PhilosophyQuote from "@/components/home/ScrollParallaxBand";
import ExperienceSnapshot from "@/components/home/ExperienceSnapshot";
import SelectedWork from "@/components/home/SelectedWork";
import ClosingCTA from "@/components/home/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <WhatIDo />
      <PhilosophyQuote />
      <ExperienceSnapshot />
      <SelectedWork />
      <ClosingCTA />
    </>
  );
}
