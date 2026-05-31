"use client";

import ProjectCardsRow, {
  projectCardsFromSlugs,
} from "@/components/shared/ProjectCardsRow";

type PillarCaseStudiesRowProps = {
  slugs: string[];
};

export default function PillarCaseStudiesRow({ slugs }: PillarCaseStudiesRowProps) {
  return <ProjectCardsRow projects={projectCardsFromSlugs(slugs)} />;
}
