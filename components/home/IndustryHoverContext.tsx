"use client";

import { useEffect, useRef } from "react";
import type { IndustryDoc } from "@/data/industries";
import { gsap } from "@/lib/animations";
import { mediaSrc } from "@/lib/media";
import { cn } from "@/lib/cn";

const LAYOUTS = [
  ["title", "image", "badgeAndProjects", "description"],
  ["image", "badgeAndProjects", "description", "title"],
  ["badgeAndProjects", "description", "title", "image"],
  ["description", "title", "image", "badgeAndProjects"],
] as const;

type BlockName = (typeof LAYOUTS)[number][number];

export type IndustryHoverContextProps = {
  industry: IndustryDoc;
  index: number;
  selectedIndustry: number | null;
  isWhiteBg: boolean;
};

export default function IndustryHoverContext({
  industry,
  index,
  selectedIndustry,
  isWhiteBg,
}: IndustryHoverContextProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const layout = LAYOUTS[index % LAYOUTS.length];

  useEffect(() => {
    const selected = index === selectedIndustry;
    const targets = [
      overlayRef.current,
      imageRef.current,
      titleRef.current,
      badgeRef.current,
      descriptionRef.current,
    ].filter(Boolean);

    gsap.killTweensOf(targets);

    if (selected) {
      gsap.to(overlayRef.current, {
        autoAlpha: 0.6,
        duration: 1.2,
        ease: "expo.inOut",
      });

      const img = industry.image;
      const imageSlot = layout.indexOf("image");

      if (img?.width && img?.height && imageRef.current) {
        let startClip = "inset(0% 0% 0% 0%)";
        const portrait = img.height > img.width;
        const landscape = img.width > img.height;

        if (portrait) {
          startClip =
            imageSlot < 2 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)";
        } else if (landscape) {
          startClip =
            imageSlot % 2 !== 0
              ? "inset(0% 100% 0% 0%)"
              : "inset(0% 0% 0% 100%)";
        }

        gsap.set(imageRef.current, { clipPath: startClip });
        gsap.to(imageRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "expo.out",
          delay: 0.1,
        });
      }

      const animateIn = (el: HTMLElement | null, blockName: BlockName) => {
        if (!el) return;

        const slot = layout.indexOf(blockName);
        const from: gsap.TweenVars = { autoAlpha: 0 };

        if (slot === 0 || slot === 3) {
          from.y = slot >= 2 ? 30 : -30;
        } else {
          from.x = slot % 2 === 1 ? 40 : -40;
        }

        gsap.fromTo(
          el,
          from,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power4.out",
          }
        );
      };

      animateIn(titleRef.current, "title");
      animateIn(badgeRef.current, "badgeAndProjects");
      animateIn(descriptionRef.current, "description");
    } else {
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      const animateOut = (el: HTMLElement | null, blockName: BlockName) => {
        if (!el) return;

        const slot = layout.indexOf(blockName);
        const to: gsap.TweenVars = {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.in",
        };

        if (slot === 0 || slot === 3) {
          to.y = slot >= 2 ? 25 : -25;
        } else {
          to.x = slot % 2 === 1 ? 30 : -30;
        }

        gsap.to(el, to);
      };

      animateOut(titleRef.current, "title");
      animateOut(badgeRef.current, "badgeAndProjects");
      animateOut(descriptionRef.current, "description");
    }
  }, [selectedIndustry, index, industry.image, layout]);

  const renderBlock = (blockName: BlockName) => {
    switch (blockName) {
      case "image":
        if (!industry.image?.url) return null;
        return (
          <div
            key="image"
            className="flex items-end justify-start"
            style={{ maxWidth: industry.image.width }}
          >
            <div
              ref={imageRef}
              className="w-full overflow-hidden"
              style={{ aspectRatio: `${industry.image.width} / ${industry.image.height}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mediaSrc(industry.image.url)}
                alt={industry.image.alt}
                width={industry.image.width}
                height={industry.image.height}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        );

      case "title":
        return (
          <h2
            key="title"
            ref={titleRef}
            className="max-w-[500px] text-left font-mono text-4xl font-light leading-tight xl:text-5xl"
          >
            {industry.name}
          </h2>
        );

      case "badgeAndProjects":
        return (
          <div
            key="badge"
            ref={badgeRef}
            className="flex max-h-[200px] items-center justify-center"
            aria-hidden
          />
        );

      case "description":
        return (
          <div
            key="description"
            ref={descriptionRef}
            className="flex h-full flex-col items-center justify-center gap-10"
          >
            <p className="max-w-sm text-left font-mono text-sm uppercase tracking-widest opacity-70">
              {industry.badge.areas.join(", ")}
            </p>
            <p className="max-w-sm pl-3 text-left text-sm leading-relaxed opacity-90">
              {industry.homeDescription}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        isWhiteBg ? "text-black" : "text-white",
        "pointer-events-none fixed inset-0 z-[100] flex items-end justify-end overflow-hidden lg:backdrop-blur-md"
      )}
    >
      <div className="relative z-20 h-full max-h-[90dvh] w-full max-w-[calc(100vw-300px)]">
        <div className="grid h-full w-full grid-cols-1 grid-rows-4 gap-20 p-4 lg:grid-cols-2 lg:grid-rows-2">
          {layout.map((blockName) => renderBlock(blockName))}
        </div>
      </div>

      <div
        ref={overlayRef}
        className={cn(
          "pointer-events-none absolute inset-0 z-10 h-full w-full opacity-0",
          isWhiteBg ? "bg-white/60" : "bg-black/60"
        )}
      />
    </div>
  );
}
