"use client";

import { logos, logoWallText } from "@/data/logos";
import type { PillarShowcaseLayout } from "@/data/pillars";
import { logoSrc } from "@/lib/media";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCardsRow, {
  projectCardsFromSlugs,
} from "@/components/shared/ProjectCardsRow";
import Link from "next/link";
import { useEffect, useRef } from "react";

type PillarShowcaseSectionProps = {
  slugs: string[];
  layout?: PillarShowcaseLayout;
};

function BeTheNextLink() {
  return (
    <Link
      href="/contact-us"
      className="inline-flex cursor-link cursor-none cursor-invert items-center gap-3 text-sm font-light text-black/80 transition-colors duration-300 hover:text-black md:text-base"
    >
      Be the next
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black text-white md:h-8 md:w-8">
        <svg
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden
        >
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

function LogoScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...logos, ...logos];

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced && trackRef.current) {
      trackRef.current.style.animation = "none";
    }
  }, []);

  return (
    <div className="logo-marquee-scroll overflow-hidden">
      <div ref={trackRef} className="logo-marquee-track flex w-max items-center">
        {items.map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="flex shrink-0 items-center px-8 md:px-12 lg:px-14"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc(logo)}
              alt=""
              width={140}
              height={40}
              className="h-7 w-auto max-w-[120px] object-contain md:h-9 md:max-w-[140px] lg:h-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Tagline() {
  return (
    <p className="page-padding mx-auto max-w-3xl text-center text-2xl leading-snug md:text-3xl lg:max-w-4xl lg:text-[2.125rem] lg:leading-snug">
      {logoWallText}
    </p>
  );
}

export default function PillarShowcaseSection({
  slugs,
  layout = "tagline-first",
}: PillarShowcaseSectionProps) {
  const projectsFirst = layout === "projects-first";

  return (
    <ScrollReveal className="relative z-20 overflow-hidden bg-white py-16 text-black md:py-20 lg:py-24">
      {!projectsFirst ? (
        <div className="mb-12 md:mb-14 lg:mb-16">
          <Tagline />
        </div>
      ) : null}

      <ProjectCardsRow projects={projectCardsFromSlugs(slugs)} embedded />

      {projectsFirst ? (
        <div className="page-padding mx-auto mt-12 max-w-3xl md:mt-16 lg:mt-20 lg:max-w-4xl">
          <Tagline />
        </div>
      ) : null}

      <div className={projectsFirst ? "mt-12 md:mt-16" : "mt-12 md:mt-16"}>
        <LogoScroll />
      </div>

      <div className="page-padding mt-12 flex justify-center md:mt-14 lg:mt-16">
        <BeTheNextLink />
      </div>
    </ScrollReveal>
  );
}
