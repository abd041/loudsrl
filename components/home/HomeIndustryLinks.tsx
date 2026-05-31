"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { industryDocs } from "@/data/industries";
import { gsap } from "@/lib/animations";
import { cn } from "@/lib/cn";
import AnimatedCircleArrow from "@/components/shared/AnimatedCircleArrow";

type HomeIndustryLinksProps = {
  hoveredIndustryIndex: number | null;
  setHoveredIndustryIndex: (index: number | null) => void;
  isWhiteHero: boolean;
  playIntro?: boolean;
};

export default function HomeIndustryLinks({
  hoveredIndustryIndex,
  setHoveredIndustryIndex,
  isWhiteHero,
  playIntro = false,
}: HomeIndustryLinksProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const strokeClass = isWhiteHero ? "stroke-black" : "stroke-white";
  const textColor = isWhiteHero ? "text-black" : "text-white";

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = list.querySelectorAll<HTMLElement>("[data-industry-item]");
    if (!items.length) return;

    gsap.killTweensOf(items);
    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        delay: playIntro ? 0.35 : 0,
      }
    );
  }, [playIntro]);

  return (
    <div
      ref={listRef}
      className="pointer-events-auto relative z-[1001] hidden flex-col items-start justify-end lg:flex"
    >
      {industryDocs.map((industry, index) => {
        const isHovered = hoveredIndustryIndex === index;

        if (isHovered) {
          return (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              prefetch
              data-industry-item
              onPointerDown={(event) => event.stopPropagation()}
              onMouseEnter={() => setHoveredIndustryIndex(index)}
              onMouseLeave={() => setHoveredIndustryIndex(null)}
              className={cn(
                isWhiteHero ? "cursor-invert text-black" : "cursor-force-white text-white",
                "cursor-link cursor-none no-delay flex items-center gap-2 py-1 opacity-0 transition-[filter,color] duration-200"
              )}
            >
              <AnimatedCircleArrow
                animate
                size={32}
                strokeClass={strokeClass}
              />
              <span
                className={cn(
                  "text-[0.625rem] font-semibold uppercase tracking-[0.18em]",
                  textColor
                )}
              >
                VIEW INDUSTRY
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            prefetch
            data-industry-item
            onPointerDown={(event) => event.stopPropagation()}
            onMouseEnter={() => setHoveredIndustryIndex(index)}
            onMouseLeave={() => setHoveredIndustryIndex(null)}
            className={cn(
              isWhiteHero ? "cursor-invert text-black" : "cursor-force-white text-white",
              "cursor-link cursor-none no-delay py-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] opacity-0 transition-[filter,color] duration-200"
            )}
          >
            {industry.name.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
