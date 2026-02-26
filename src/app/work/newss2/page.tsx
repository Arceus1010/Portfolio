import { getProjectBySlug } from "@/lib/utils";
import { notFound } from "next/navigation";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyOverview from "@/components/case-study/CaseStudyOverview";
import ProblemSection from "@/components/case-study/ProblemSection";
import RoleScope from "@/components/case-study/RoleScope";
import DecisionsSection from "@/components/case-study/DecisionsSection";
import EngineeringHighlights from "@/components/case-study/EngineeringHighlights";
import OutcomesSection from "@/components/case-study/OutcomesSection";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEWSS 2.0",
  description: "National Data Survey Platform — Case Study",
};

export default function NEWSS2Page() {
  const project = getProjectBySlug("newss2");
  if (!project) notFound();

  return (
    <div className="max-w-content mx-auto px-6 pt-24">
      <CaseStudyHero
        name={project.name}
        tagline={project.tagline}
        emoji={project.emoji}
        tags={project.tags}
      />
      <CaseStudyOverview overview={project.overview} />
      <ProblemSection problem={project.problem} />
      <RoleScope roleScope={project.roleScope} />
      <DecisionsSection decisions={project.decisions} />
      <EngineeringHighlights highlights={project.engineeringHighlights} />
      <OutcomesSection outcomes={project.outcomes} />
      <CaseStudyNav currentSlug="newss2" />
    </div>
  );
}
