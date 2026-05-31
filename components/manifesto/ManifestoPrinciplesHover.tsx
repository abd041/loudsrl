"use client";

import Link from "next/link";
import { useState } from "react";
import type { ManifestoPrinciple } from "@/data/manifesto";
import ManifestoHoverPreview from "@/components/manifesto/ManifestoHoverPreview";
import { cn } from "@/lib/cn";

type ManifestoPrinciplesHoverProps = {
  principles: ManifestoPrinciple[];
};

export default function ManifestoPrinciplesHover({
  principles,
}: ManifestoPrinciplesHoverProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoveredPrinciple =
    hoveredIndex !== null ? principles[hoveredIndex] : null;

  return (
    <section className="relative z-20 overflow-hidden bg-white py-24 text-black lg:min-h-[820px] lg:py-32">
      <div className="relative mx-auto max-w-6xl px-4">
        <ManifestoHoverPreview principle={hoveredPrinciple} />

        <div
          className="relative flex flex-col items-center gap-8 md:gap-10 lg:gap-12"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {principles.map((principle, index) => {
            const isHovered = hoveredIndex === index;
            const hasActiveHover = hoveredIndex !== null;

            return (
              <button
                key={principle.title}
                type="button"
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(event.relatedTarget as Node)
                  ) {
                    setHoveredIndex(null);
                  }
                }}
                className={cn(
                  "relative flex min-h-[3rem] w-full max-w-4xl cursor-link cursor-none cursor-invert items-center justify-center bg-transparent md:min-h-[4rem] lg:min-h-[5rem]",
                  isHovered && "z-40",
                  !isHovered && hasActiveHover && "z-0",
                  !hasActiveHover && "z-10"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none block max-w-full origin-center text-center text-2xl leading-tight transition-all duration-500 ease-out will-change-[transform,filter] md:text-4xl lg:text-5xl",
                    isHovered
                      ? "scale-[1.35] blur-xl opacity-100"
                      : "scale-100 blur-0 opacity-100"
                  )}
                >
                  {principle.title}
                </span>

                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap font-mono text-xs uppercase tracking-widest transition-all duration-500 ease-out",
                    isHovered
                      ? "scale-100 opacity-100 blur-0"
                      : "pointer-events-none scale-95 opacity-0 blur-sm"
                  )}
                >
                  {principle.cta}
                  <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[#8b6cff]" />
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative z-30 mt-16 flex justify-center md:mt-20">
          <Link
            href="/contact-us"
            className="group inline-flex cursor-link cursor-none cursor-invert items-center gap-3 font-mono text-sm uppercase tracking-widest text-black/60 transition-colors duration-300 hover:text-black"
          >
            Build with us
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#8b6cff] text-white transition-transform duration-300 ease-out group-hover:translate-x-1">
              <svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
