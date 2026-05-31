"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CaseStudyFunctionalitySection from "@/components/case-studies/CaseStudyFunctionalitySection";
import CaseStudyHeroMeta from "@/components/case-studies/CaseStudyHeroMeta";
import CaseStudySwitcher from "@/components/case-studies/CaseStudySwitcher";
import CaseStudyTestimonial from "@/components/case-studies/CaseStudyTestimonial";
import DualCTA from "@/components/DualCTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LogoWall from "@/components/LogoWall";
import AnimatedCircleArrow from "@/components/shared/AnimatedCircleArrow";
import {
  getCaseStudy,
  getNextCaseStudy,
} from "@/data/caseStudies";
import { gsap, registerGsap } from "@/lib/animations";

type CaseStudyPageClientProps = {
  slug: string;
};

export default function CaseStudyPageClient({ slug }: CaseStudyPageClientProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const study = getCaseStudy(slug);
  const next = getNextCaseStudy(slug);

  useEffect(() => {
    registerGsap();
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { y: 200, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "power4.out" }
    );
  }, [slug]);

  if (!study) return null;

  return (
    <div className="cursor-invert min-h-screen bg-white text-black">
      <Header isWhiteBg showBack transparent scrollWithPage />

      <div className="border-b border-[#d9d9d9] pt-10 md:pt-16">
        <CaseStudySwitcher slug={slug} />
      </div>

      <main
        ref={contentRef}
        className="min-h-screen opacity-0"
      >
          <CaseStudyHeroMeta study={study} />

          {study.mainPic ? (
            <div className="relative mt-10 h-[min(80vh,900px)] w-full">
              <Image
                src={study.mainPic.url}
                alt={study.mainPic.alt || study.title}
                fill
                priority
                className="cursor-force-white object-cover object-center"
                sizes="100vw"
              />
            </div>
          ) : null}

          {study.functionalities.map((functionality) => (
            <CaseStudyFunctionalitySection
              key={`${study.slug}-${functionality.title}`}
              loudX={study.loudX}
              functionality={functionality}
            />
          ))}

          {study.testimonial ? (
            <CaseStudyTestimonial testimonial={study.testimonial} />
          ) : null}

          <div className={study.testimonial ? "mt-20 border-t border-[#dfdfdf]" : "mt-20"}>
            <LogoWall variant="light" />
            <DualCTA variant="light" />
          </div>

          <div className="flex justify-center bg-white">
            <button
              ref={nextRef}
              type="button"
              onClick={() => {
                window.scrollTo(0, 0);
                router.push(`/case-studies/${next.slug}`);
              }}
              className="flex cursor-pointer flex-col items-center justify-center gap-3 pb-16 font-light sm:flex-row sm:gap-6 sm:text-lg lg:pb-28"
            >
              <p className="w-auto sm:w-[200px] sm:text-right">Next case study</p>
              <AnimatedCircleArrow triggerRef={nextRef} strokeClass="stroke-black" />
              <p className="w-auto text-left">{next.title}</p>
            </button>
          </div>
        </main>

      <Footer />
    </div>
  );
}
