"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CaseStudy } from "@/data/caseStudies";
import { gsap, registerGsap } from "@/lib/animations";
import { cn } from "@/lib/cn";

type CaseStudyHeroMetaProps = {
  study: CaseStudy;
};

const META_ROWS = [
  {
    key: "projectType",
    labelKey: "projectTypeLabel" as const,
    values: (study: CaseStudy) => study.projectType,
  },
  {
    key: "stage",
    labelKey: "stageLabel" as const,
    values: (study: CaseStudy) => [study.stage].filter(Boolean),
  },
  {
    key: "deliverables",
    labelKey: "deliverablesLabel" as const,
    values: (study: CaseStudy) => study.deliverables,
  },
];

export default function CaseStudyHeroMeta({ study }: CaseStudyHeroMetaProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".project-animatable");
    const bounds = root.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    gsap.set(root, { perspective: 1000 });
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const itemCenterY = rect.top + rect.height / 2;
      const offsetX = itemCenterX - centerX;
      const offsetY = itemCenterY - centerY;

      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: 2 * (offsetX > 0 ? 100 : offsetX < 0 ? -100 : 0),
          y: 2 * (offsetY > 0 ? 100 : offsetY < 0 ? -100 : 0),
          scale: 2,
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power4.out",
          delay: 0.05 * index,
        }
      );
    });
  }, [study.slug]);

  return (
    <div
      ref={rootRef}
      className="project-hero-height"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:gap-1 md:grid-cols-3 md:gap-0 md:px-0">
        {META_ROWS.map((row, index) => (
          <div
            key={row.key}
            className={cn(
              "order-4 flex grow flex-col border border-[#d9d9d9] px-10 py-4 sm:py-10 md:border-b-0 md:border-t-0",
              index === 0 && "md:border-0 md:pl-4",
              index === 2 && "md:border-0 md:pr-4",
              "md:order-none"
            )}
          >
            <div className="project-animatable opacity-0">
              <h2 className="font-mono text-xs opacity-50">{study[row.labelKey]}</h2>
              <p className="mt-2.5 flex text-sm font-medium">
                {row.values(study).join(", ")}
              </p>
            </div>
          </div>
        ))}

        <div className="col-span-3 hidden h-0 w-[200vw] -translate-x-1/2 border-t border-[#d9d9d9] md:block" />

        <div className="order-3 flex grow flex-col justify-center border border-[#d9d9d9] px-10 py-4 sm:pb-4 sm:pt-10 md:order-none md:border-none md:pl-4 md:px-10">
          <div className="project-animatable space-y-2 opacity-0">
            {study.status ? (
              <div className="flex items-center gap-2">
                <Image
                  src="/media/earthquake-1.png"
                  alt=""
                  width={20}
                  height={20}
                  className="aspect-square h-5 w-5"
                />
                <p className="font-mono text-sm text-black/60">{study.status}</p>
              </div>
            ) : null}
            {study.numberOfUsers ? (
              <div className="flex items-center gap-2">
                <Image
                  src="/media/album-1.png"
                  alt=""
                  width={20}
                  height={20}
                  className="aspect-square h-5 w-5"
                />
                <p className="font-mono text-sm text-black/60">{study.numberOfUsers}</p>
              </div>
            ) : null}
            {study.link ? (
              <Link
                href={study.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:opacity-80"
              >
                <Image
                  src="/media/arrow_outward.png"
                  alt=""
                  width={20}
                  height={20}
                  className="aspect-square h-5 w-5"
                />
                <p className="font-mono text-sm text-[#4E71FF]">
                  {study.linkLabel ?? "Website"}
                </p>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="order-1 flex grow flex-col sm:px-10 sm:pb-4 sm:pt-10 md:order-none md:px-10">
          <div className="project-animatable opacity-0">
            <h2 className="font-mono text-xl sm:text-3xl">Introduction</h2>
            <div className="mt-2.5 font-mono text-sm font-medium">
              <span className="opacity-50">Industry | </span>
              {study.industry}
            </div>
          </div>
        </div>

        <div className="order-2 mb-4 flex grow flex-col sm:mb-0 sm:px-10 sm:pb-4 sm:pt-10 md:order-none md:px-10 md:pr-4">
          <div className="project-animatable opacity-0">
            <p className="leading-[120%] sm:leading-[140%]">{study.introduction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
