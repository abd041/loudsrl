"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getCaseStudy } from "@/data/caseStudies";
import { mediaSrc } from "@/lib/media";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { cn } from "@/lib/cn";

export type ProjectCard = {
  slug: string;
  name: string;
  previewDescription: string;
  previewImage?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
};

export type ProjectCardsRowProps = {
  projects: ProjectCard[];
  /** When true, omits outer section padding (used inside pillar showcase). */
  embedded?: boolean;
  /** Studio live products show title in mono, subtitle below. */
  labelMode?: "default" | "studio";
  theme?: "light" | "dark";
};

const GAP = 40;
const DESKTOP_MQ = "(min-width: 1024px)";
const HOVER_MQ = "(hover: hover)";

export function projectCardsFromSlugs(slugs: string[]): ProjectCard[] {
  return slugs.flatMap((slug) => {
    const study = getCaseStudy(slug);
    if (!study) return [];

    return [
      {
        slug: study.slug,
        name: study.subtitle,
        previewDescription: study.title,
        previewImage: {
          url: mediaSrc(study.previewImage),
          alt: study.title,
        },
      },
    ];
  });
}

export default function ProjectCardsRow({
  projects,
  embedded = false,
  labelMode = "default",
  theme = "light",
}: ProjectCardsRowProps) {
  const isDark = theme === "dark";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [canHover, setCanHover] = useState(false);

  const rowRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const resizeTimerRef = useRef<number | null>(null);

  const count = projects.length;

  const defaultWidth =
    isDesktop && count > 0
      ? count === 1
        ? containerWidth
        : containerWidth > 0
          ? (containerWidth - GAP * (count - 1)) / count
          : 0
      : 0;

  const hoverWidth = defaultWidth * 1.5;

  useEffect(() => {
    const mqDesktop = window.matchMedia(DESKTOP_MQ);
    const mqHover = window.matchMedia(HOVER_MQ);

    const update = () => {
      setIsDesktop(mqDesktop.matches);
      setCanHover(mqDesktop.matches && mqHover.matches);
    };

    update();
    mqDesktop.addEventListener("change", update);
    mqHover.addEventListener("change", update);

    return () => {
      mqDesktop.removeEventListener("change", update);
      mqHover.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const container = rowRef.current?.parentElement;
    if (!container) return;

    const measure = () => {
      setContainerWidth(container.clientWidth);
      setIsResizing(true);
      setHoveredIndex(null);

      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current);
      }

      resizeTimerRef.current = window.setTimeout(() => {
        setIsResizing(false);
      }, 200);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current);
      }
    };
  }, [isDesktop, projects.length]);

  useIsomorphicLayoutEffect(() => {
    if (!isDesktop) {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.transition = "";
        card.style.width = "";
      });

      if (rowRef.current) {
        rowRef.current.style.transition = "";
        rowRef.current.style.transform = "";
      }

      return;
    }

    if (!defaultWidth || !hoverWidth || count <= 1) return;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const width = hoveredIndex === index ? hoverWidth : defaultWidth;

      card.style.transition = isResizing
        ? "none"
        : "width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

      card.style.width = `${width}px`;
    });

    let translateX = 0;

    if (hoveredIndex !== null && count > 1) {
      translateX =
        -(hoveredIndex / (count - 1)) * (hoverWidth - defaultWidth);
    }

    if (rowRef.current) {
      rowRef.current.style.transition = isResizing
        ? "none"
        : "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

      rowRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [
    hoveredIndex,
    defaultWidth,
    hoverWidth,
    count,
    isDesktop,
    isResizing,
  ]);

  return (
    <section
      className={cn(
        "relative z-20",
        isDark ? "bg-black text-white" : "bg-white text-black",
        embedded && "bg-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl overflow-hidden px-4 lg:px-10",
          embedded ? "pb-4 pt-0" : "py-16 lg:py-24"
        )}
      >
        <div
          ref={rowRef}
          className={
            isDesktop
              ? "flex w-full flex-nowrap overflow-visible"
              : "grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3"
          }
          style={isDesktop ? { gap: `${GAP}px` } : undefined}
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              onMouseEnter={() => canHover && setHoveredIndex(index)}
              onMouseLeave={() => canHover && setHoveredIndex(null)}
              className={isDesktop ? "" : "w-full"}
            >
              <Link
                href={`/case-studies/${project.slug}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={cn(
                  "relative block h-full shrink-0 grow cursor-none cursor-link overflow-hidden",
                  isDark ? "cursor-force-white" : "cursor-invert"
                )}
              >
                <div>
                  <div className="relative overflow-hidden">
                    {project.previewImage ? (
                      <Image
                        className={cn(
                          "h-[450px] w-full object-cover transition-all duration-300",
                          isDark ? "cursor-force-white" : "cursor-force-white"
                        )}
                        src={project.previewImage.url}
                        alt={project.previewImage.alt?.trim() ?? ""}
                        width={project.previewImage.width ?? 800}
                        height={project.previewImage.height ?? 600}
                      />
                    ) : null}
                  </div>

                  <p className="!font-mono mb-1 mt-6 text-sm font-medium opacity-60">
                    {labelMode === "studio"
                      ? project.previewDescription
                      : project.name}
                  </p>

                  <p className="text-sm">
                    {labelMode === "studio"
                      ? project.name
                      : project.previewDescription}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
