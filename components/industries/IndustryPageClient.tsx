"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DualCTA from "@/components/DualCTA";
import LogoWall from "@/components/LogoWall";
import NextPageNav from "@/components/NextPageNav";
import ProjectCardsRow, {
  projectCardsFromSlugs,
} from "@/components/shared/ProjectCardsRow";
import IndustryHeroBanner from "@/components/industries/IndustryHeroBanner";
import IndustryIntro from "@/components/industries/IndustryIntro";
import IndustryGalleryCollage from "@/components/industries/IndustryGalleryCollage";
import IndustryScrollingMarquee from "@/components/industries/IndustryScrollingMarquee";
import IndustryMethodology from "@/components/industries/IndustryMethodology";
import IndustryProblemCardsRow from "@/components/industries/IndustryProblemCardsRow";
import IndustryTestimonial from "@/components/industries/IndustryTestimonial";
import {
  getNextIndustry,
  type IndustryPage,
} from "@/data/industryPages";

type IndustryPageClientProps = {
  industry: IndustryPage;
  activeSlug: string;
};

export default function IndustryPageClient({
  industry,
  activeSlug,
}: IndustryPageClientProps) {
  const next = getNextIndustry(activeSlug);

  return (
    <>
      <Header transparent scrollWithPage={false} />
      <main className="cursor-force-white bg-black text-white">
        <IndustryHeroBanner industry={industry} />

        <IndustryIntro industry={industry} />

        <IndustryGalleryCollage images={industry.gallery} alt={industry.title} />

        <IndustryScrollingMarquee text={industry.marqueeText} />

        <IndustryMethodology industry={industry} />

        <IndustryProblemCardsRow problems={industry.problems} />

        {industry.testimonial ? (
          <IndustryTestimonial testimonial={industry.testimonial} />
        ) : null}

        <ProjectCardsRow
          projects={projectCardsFromSlugs(industry.related)}
          theme="dark"
        />

        <LogoWall variant="dark" />

        <DualCTA agencyCta={industry.agencyCta} />

        <NextPageNav
          label="Next Industry"
          href={`/industries/${next.slug}`}
          title={next.title}
        />
      </main>
      <Footer />
    </>
  );
}
