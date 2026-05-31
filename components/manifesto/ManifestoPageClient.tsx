"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteHero from "@/components/RouteHero";
import ProjectCardsRow, {
  projectCardsFromSlugs,
} from "@/components/shared/ProjectCardsRow";
import LogoWall from "@/components/LogoWall";
import DualCTA from "@/components/DualCTA";
import ManifestoPrinciplesHover from "@/components/manifesto/ManifestoPrinciplesHover";
import ManifestoCapabilitiesSection from "@/components/manifesto/ManifestoCapabilitiesSection";
import {
  featuredCaseStudies,
  manifestoDeliverables,
  manifestoPrinciples,
  manifestoServicesOverview,
} from "@/data/manifesto";
import { dualCtaCopy } from "@/data/dualCta";
import { findNavIndexFromPath, isWhiteHeroIndex } from "@/lib/routeNav";

export default function ManifestoPageClient() {
  const navIndex = findNavIndexFromPath("/manifesto");
  const liquidIndex = navIndex !== -1 ? navIndex + 1 : 4;

  return (
    <>
      <Header transparent isWhiteBg={isWhiteHeroIndex(liquidIndex)} />
      <main className="-mt-[72px] md:-mt-[88px]">
        <RouteHero
          activeIndex={liquidIndex}
          title="We are in a constant state of becoming."
        />

        <ManifestoPrinciplesHover principles={manifestoPrinciples} />
        <ManifestoCapabilitiesSection
          deliverables={manifestoDeliverables}
          overview={manifestoServicesOverview}
        />

        <ProjectCardsRow projects={projectCardsFromSlugs(featuredCaseStudies)} />

        <LogoWall variant="light" />
        <DualCTA
          variant="light"
          agencyCta={dualCtaCopy.manifestoAgencyTitle}
        />
      </main>
      <Footer />
    </>
  );
}
