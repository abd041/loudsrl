"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogoWall from "@/components/LogoWall";
import ProjectCardsRow, {
  projectCardsFromSlugs,
} from "@/components/shared/ProjectCardsRow";
import StudioHero from "@/components/studio/StudioHero";
import StudioWhatWeDo from "@/components/studio/StudioWhatWeDo";
import StudioMarquee from "@/components/studio/StudioMarquee";
import StudioBuildGrid from "@/components/studio/StudioBuildGrid";
import StudioWhyChoosingUs from "@/components/studio/StudioWhyChoosingUs";
import StudioFounderCta from "@/components/studio/StudioFounderCta";
import {
  studioBuildCards,
  studioLiveProducts,
  studioLiveSection,
  studioMarqueeText,
  studioProcess,
  studioWhyChoosingUs,
} from "@/data/studio";
import { findNavIndexFromPath, isWhiteHeroIndex } from "@/lib/routeNav";

export default function StudioPageClient() {
  const navIndex = findNavIndexFromPath("/studio");
  const liquidIndex = navIndex !== -1 ? navIndex + 1 : 5;

  return (
    <>
      <Header transparent isWhiteBg={isWhiteHeroIndex(liquidIndex)} />
      <main id="main-content" className="-mt-[72px] cursor-invert bg-white text-black md:-mt-[88px]">
        <StudioHero />
        <StudioWhatWeDo process={studioProcess} />
        <StudioMarquee text={studioMarqueeText} />
        <StudioBuildGrid cards={studioBuildCards} />
        <StudioWhyChoosingUs items={studioWhyChoosingUs} />

        <div className="relative z-20 bg-white pb-10 text-black">
          <p className="mx-auto max-w-6xl px-4 text-xs !font-mono tracking-[0.03rem] opacity-60">
            {studioLiveSection.label}
          </p>
          <h2 className="mx-auto max-w-6xl px-4 text-4xl tracking-[0.03rem] leading-[120%] sm:leading-[140%]">
            {studioLiveSection.title}
          </h2>
          <ProjectCardsRow
            projects={projectCardsFromSlugs(studioLiveProducts)}
            embedded
            labelMode="studio"
            parityVariant="studio-live"
          />
        </div>

        <LogoWall variant="light" sectionLayout="studio" />

        <div className="relative z-20 mt-11 flex w-full justify-center bg-white px-4 pb-16 sm:pb-24">
          <StudioFounderCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
