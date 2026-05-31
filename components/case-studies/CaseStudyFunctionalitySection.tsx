"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import CaseStudyGalleryCarousel from "@/components/case-studies/CaseStudyGalleryCarousel";
import type { CaseStudyFunctionality } from "@/data/caseStudies";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/animations";
import { cn } from "@/lib/cn";

type CaseStudyFunctionalitySectionProps = {
  loudX: string;
  functionality: CaseStudyFunctionality;
};

function RevealImage({
  image,
  className,
  fromBottom = false,
}: {
  image: CaseStudyFunctionality["gallery"][number];
  className?: string;
  fromBottom?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const node = ref.current;
    if (!node) return;

    const trigger = ScrollTrigger.create({
      trigger: node,
      start: "top bottom",
      once: true,
      onEnter: () => {
        const rect = node.getBoundingClientRect();
        const isDesktop = window.innerWidth >= 768;
        const x = fromBottom
          ? 0
          : isDesktop
            ? rect.left < window.innerWidth / 2
              ? -100
              : 100
            : 0;
        const y = fromBottom || !isDesktop ? 100 : 0;

        gsap.fromTo(
          node,
          { opacity: 0, x, y, scale: 1.05 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power4.inOut",
            delay: 0.5,
          }
        );
      },
    });

    return () => {
      trigger.kill();
    };
  }, [fromBottom, image.url]);

  return (
    <div ref={ref} className={cn("opacity-0", className)}>
      <Image
        src={image.url}
        alt={image.alt}
        width={image.width ?? 1200}
        height={image.height ?? 900}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function CaseStudyFunctionalitySection({
  loudX,
  functionality,
}: CaseStudyFunctionalitySectionProps) {
  const layout = functionality.layout;

  if (layout === "layout-2") {
    const [left, right] = functionality.gallery;

    return (
      <div>
        <div className="mx-auto mt-28 grid max-w-6xl grid-cols-1 gap-10 px-4 sm:mb-20 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xl text-black/60">{functionality.title}</p>
            <p className="text-xl leading-[120%] lg:text-4xl">
              {functionality.description}
            </p>
          </div>
          <div className="flex justify-center" />
        </div>

        <div className="flex flex-col items-stretch gap-10 px-4 sm:flex-row">
          {left ? (
            <div className="w-full sm:w-1/2">
              <RevealImage image={left} className="h-full w-full" />
            </div>
          ) : null}
          <div className="w-full sm:w-1/2">
            {right ? (
              <RevealImage image={right} className="h-auto w-full object-square" />
            ) : null}
            {functionality.secondDescription ? (
              <p className="mt-12 max-w-[492px] text-xl leading-[120%] lg:pb-20">
                {functionality.secondDescription}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "layout-3") {
    const [left, right, bottom] = functionality.gallery;

    return (
      <div>
        <div className="mx-auto mb-10 grid max-w-6xl grid-cols-1 gap-10 px-4 sm:mb-20 sm:mt-28 sm:grid-cols-2">
          <div className="flex justify-center" />
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xl text-black/60">{functionality.title}</p>
            <p className="text-xl leading-[120%] lg:text-4xl">
              {functionality.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-10 px-4 sm:flex-row">
          <div className="w-full sm:w-1/2">
            {left ? (
              <RevealImage image={left} className="h-auto w-full object-square" />
            ) : null}
            {functionality.secondDescription ? (
              <p className="mt-12 text-xl leading-[120%]">
                {functionality.secondDescription}
              </p>
            ) : null}
          </div>
          {right ? (
            <div className="w-full sm:w-1/2">
              <RevealImage image={right} className="h-full w-full" />
            </div>
          ) : null}
        </div>

        {bottom ? (
          <div className="px-4 pt-12">
            <RevealImage
              image={bottom}
              className="animate-from-bottom h-auto w-full"
              fromBottom
            />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto mb-20 mt-10 grid max-w-6xl grid-cols-1 gap-4 px-4 lg:mt-20 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs text-black/60">{loudX}</p>
          <p className="font-mono text-3xl">{functionality.title}</p>
        </div>
        <div className="flex justify-start sm:justify-center">
          <p className="max-w-[356px] leading-[120%] sm:leading-[140%]">
            {functionality.description}
          </p>
        </div>
      </div>

      <CaseStudyGalleryCarousel images={functionality.gallery} />
    </div>
  );
}
