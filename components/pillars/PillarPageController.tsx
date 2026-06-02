"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteHero from "@/components/RouteHero";
import DualCTA from "@/components/DualCTA";
import PillarShowcaseSection from "@/components/pillars/PillarShowcaseSection";
import PillarHeroStaticTable from "@/components/pillars/PillarHeroStaticTable";
import PillarMarquee from "@/components/pillars/PillarMarquee";
import PillarConsultingIntro from "@/components/pillars/PillarConsultingIntro";
import PillarHeroImage from "@/components/pillars/PillarHeroImage";
import PotentialAccordionCards from "@/components/pillars/PotentialAccordionCards";
import {
  PILLAR_HERO_TABLE_NOTE,
  pillars,
} from "@/data/pillars";
import { getNextIndex } from "@/lib/pillarNav";
import { isWhiteHeroIndex } from "@/lib/routeNav";
import { slugToPillarIndex } from "@/lib/pillarNav";
import { useAppStore } from "@/store/appStore";

type PillarPageControllerProps = {
  initialSlug: string;
};

export default function PillarPageController({
  initialSlug,
}: PillarPageControllerProps) {
  const params = useParams();
  const slug =
    typeof params?.slug === "string" && params.slug.length > 0
      ? params.slug
      : initialSlug;

  const pillarIndex = Math.max(0, slugToPillarIndex(slug));
  const pillar = pillars[pillarIndex] ?? pillars[0];
  const liquidIndex = pillarIndex + 1;
  const nextPillar = pillars[getNextIndex(pillarIndex, pillars.length)];
  const nextConsultingTitle = `${nextPillar.navLabel.replace(/\.$/, "")} Workflow`;

  const { setIndex, setIsWhite } = useAppStore();

  useEffect(() => {
    setIndex(liquidIndex);
    setIsWhite(isWhiteHeroIndex(liquidIndex));
  }, [liquidIndex, setIndex, setIsWhite]);

  if (!pillar) return null;

  return (
    <>
      <Header
        transparent
        isInsidePillar
        isWhiteBg={isWhiteHeroIndex(liquidIndex)}
      />
      {/* Live: hero sits above main so fixed liquid shows through (main is bg-black). */}
      <div className="-mt-[72px] md:-mt-[88px]">
        <RouteHero
          key={pillar.slug}
          activeIndex={liquidIndex}
          title={pillar.heroTitle}
          body={pillar.heroBody}
          footer={
            <PillarHeroStaticTable
              slug={pillar.slug}
              groups={pillar.heroTable}
              note={PILLAR_HERO_TABLE_NOTE}
              isWhite={false}
            />
          }
        />
      </div>

      <main
        id="main-content"
        className="relative z-10 bg-black cursor-force-white"
      >
        <PillarConsultingIntro
          label={pillar.consultingLabel}
          text={pillar.consultingText}
        />
        <PillarHeroImage src={pillar.heroImage} alt={`${pillar.navLabel} hero`} />
        <PotentialAccordionCards
          intro={pillar.potentialIntro}
          cards={pillar.potentialCards}
        />
        <PillarMarquee marqueeText={pillar.marqueeText} />
        <PillarShowcaseSection
          slugs={pillar.caseStudySlugs}
          layout={pillar.showcaseLayout}
        />
        <DualCTA
          variant="light"
          agencyCta={pillar.agencyCta}
          nextConsulting={{
            href: `/pillars/${nextPillar.slug}`,
            title: nextConsultingTitle,
          }}
        />
      </main>
      <Footer />
    </>
  );
}
