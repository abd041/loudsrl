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
      <main className="-mt-[72px] cursor-invert bg-white text-black md:-mt-[88px]">
        <StudioHero />
        <StudioWhatWeDo process={studioProcess} />
        <StudioMarquee text={studioMarqueeText} />
        <StudioBuildGrid cards={studioBuildCards} />
        <StudioWhyChoosingUs items={studioWhyChoosingUs} />

        <section className="relative z-20 bg-white px-4 py-10 text-black lg:px-10 lg:py-20">
          <div className="mx-auto max-w-6xl overflow-hidden">
            <p className="font-mono text-xs tracking-[0.03rem] text-black/60">
              {studioLiveSection.label}
            </p>
            <h2 className="text-4xl tracking-[0.03rem] leading-[120%] sm:leading-[140%]">
              {studioLiveSection.title}
            </h2>

            <div className="mt-10">
              <ProjectCardsRow
                projects={projectCardsFromSlugs(studioLiveProducts)}
                embedded
                labelMode="studio"
              />
            </div>
          </div>
        </section>

        <LogoWall variant="light" />

        <div className="relative z-20 flex justify-center bg-white px-4 pb-24 pt-8 lg:px-10">
          <StudioFounderCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
