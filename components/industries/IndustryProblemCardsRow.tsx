"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { IndustryProblem } from "@/data/industryPages";
import { gsap, registerGsap } from "@/lib/animations";
import {
  animateWordsReveal,
  fadeInText,
  fadeOutText,
} from "@/lib/splitTextAnimation";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { cn } from "@/lib/cn";

type IndustryProblemCardsRowProps = {
  problems: IndustryProblem[];
};

const GAP = 40;
const DESKTOP_MQ = "(min-width: 1024px)";
const HOVER_MQ = "(hover: hover)";

function PointFingerIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 2.5c.6 0 1 .4 1 1v5.2l1.8-1.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L14.8 12l2.9 2.9c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0L13.5 13.4V20c0 .6-.4 1-1 1s-1-.4-1-1v-6.6L7.7 16.3c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4L9.2 12 6.3 9.1c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l1.8 1.8V3.5c0-.6.4-1 1-1Z" />
    </svg>
  );
}

type ProblemCardProps = {
  problem: IndustryProblem;
  isExpanded: boolean;
  supportsHover: boolean;
  onToggle: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
};

function ProblemCard({
  problem,
  isExpanded,
  supportsHover,
  onToggle,
  cardRef,
}: ProblemCardProps) {
  const router = useRouter();
  const labelRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [showSolutionText, setShowSolutionText] = useState(false);
  const textCleanupRef = useRef<(() => void) | null>(null);
  const fadeTweenRef = useRef<gsap.core.Tween | null>(null);
  const hasMountedRef = useRef(false);

  const handleClick = () => {
    if (supportsHover && isExpanded) {
      router.push(`/case-studies/${problem.projectSlug}`);
      return;
    }
    onToggle();
  };

  useEffect(() => {
    registerGsap();
  }, []);

  useEffect(() => {
    const label = labelRef.current;
    if (!label) return;

    gsap.to(label, {
      opacity: 0,
      duration: 0.15,
      onComplete: () => {
        label.textContent = isExpanded ? "LOUD SOLUTION" : "INDUSTRY PROBLEM";
        gsap.to(label, { opacity: 1, duration: 0.15 });
      },
    });
  }, [isExpanded]);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      fadeTweenRef.current = fadeInText(el, problem.text);
      return;
    }

    fadeTweenRef.current?.kill();
    textCleanupRef.current?.();

    fadeTweenRef.current = fadeOutText(el, () => {
      textCleanupRef.current?.();
      textCleanupRef.current = null;
      setShowSolutionText(isExpanded);

      if (isExpanded) {
        textCleanupRef.current = animateWordsReveal(el, problem.solution);
      } else {
        fadeTweenRef.current = fadeInText(el, problem.text);
      }
    });

    return () => {
      fadeTweenRef.current?.kill();
      textCleanupRef.current?.();
    };
  }, [isExpanded, problem.solution, problem.text]);

  useEffect(() => {
    if (!hintRef.current) return;

    gsap.to(hintRef.current, {
      opacity: isExpanded ? 0.16 : 0.4,
      duration: 0.3,
      ease: "power1.out",
      delay: isExpanded ? 0 : 0.8,
    });
  }, [isExpanded]);

  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    if (showSolutionText) {
      gsap.fromTo(
        cta,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power4.inOut", delay: 0.6 }
      );
    }
  }, [showSolutionText]);

  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta || isExpanded) return;

    gsap.to(cta, {
      opacity: 0,
      y: 50,
      duration: 0.4,
      ease: "power4.inOut",
    });
  }, [isExpanded]);

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick();
        }
      }}
      className="relative h-full shrink-0 grow cursor-link cursor-none overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={problem.background}
          alt=""
          fill
          className={cn(
            "object-cover transition-opacity duration-500",
            isExpanded ? "opacity-0" : "opacity-100"
          )}
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <Image
          src={problem.backgroundHover}
          alt=""
          fill
          className={cn(
            "object-cover transition-opacity duration-500",
            isExpanded ? "opacity-100" : "opacity-0"
          )}
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-black/25" aria-hidden />
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/35 via-black/55 to-black/45"
        aria-hidden
      />

      <div className="relative z-20 flex h-full flex-col justify-between overflow-hidden px-6 py-10">
        <p
          ref={labelRef}
          className="font-mono text-xs font-medium uppercase tracking-[0.16em]"
        >
          INDUSTRY PROBLEM
        </p>

        <div
          ref={textRef}
          className={cn(
            "relative mt-4 min-h-[250px] text-xl leading-relaxed",
            showSolutionText && "text-xl lg:text-3xl"
          )}
        />

        <p
          ref={hintRef}
          className="mt-8 flex items-start gap-2 text-balance font-mono text-xs opacity-40"
        >
          <span className="-mt-0.5">
            <PointFingerIcon />
          </span>
          {supportsHover
            ? "POINT YOUR FINGER TO DISCOVER OUR SOLUTION"
            : "TAP TO DISCOVER OUR SOLUTION"}
        </p>

        {showSolutionText ? (
          <div
            ref={ctaRef}
            className="absolute bottom-10 right-6 flex items-center gap-2 text-lg font-light opacity-0"
          >
            <Link
              href={`/case-studies/${problem.projectSlug}`}
              onClick={(event) => event.stopPropagation()}
              className="cursor-link cursor-none hover:opacity-70"
            >
              {problem.ctaLabel ?? "Case studio"}
            </Link>
            <span aria-hidden>→</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function IndustryProblemCardsRow({
  problems,
}: IndustryProblemCardsRowProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [canHover, setCanHover] = useState(false);

  const rowRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const resizeTimerRef = useRef<number | null>(null);

  const count = problems.length;

  const defaultWidth = useMemo(() => {
    if (!isDesktop || count <= 0) return 0;
    if (count === 1) return containerWidth;
    return containerWidth > 0 ? (containerWidth - GAP * (count - 1)) / count : 0;
  }, [isDesktop, count, containerWidth]);

  const expandedWidth = defaultWidth * 1.5;

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
      setExpandedIndex(null);

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
  }, [isDesktop, problems.length]);

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

    if (!defaultWidth || !expandedWidth || count <= 1) return;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const width = expandedIndex === index ? expandedWidth : defaultWidth;

      card.style.transition = isResizing
        ? "none"
        : "width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

      card.style.width = `${width}px`;
    });

    let translateX = 0;

    if (expandedIndex !== null && count > 1) {
      translateX = -(expandedIndex / (count - 1)) * (expandedWidth - defaultWidth);
    }

    if (rowRef.current) {
      rowRef.current.style.transition = isResizing
        ? "none"
        : "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

      rowRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [expandedIndex, defaultWidth, expandedWidth, count, isDesktop, isResizing]);

  const rowClass = isDesktop
    ? "flex w-full min-h-[600px] flex-nowrap overflow-visible"
    : "grid w-full grid-cols-1 gap-6";

  return (
    <section className="relative z-20 bg-black text-white">
      <div className="mx-auto max-w-6xl overflow-hidden px-4 pb-10 pt-8 md:pb-20 md:pt-12 lg:pb-28 lg:pt-20">
        <div
          ref={rowRef}
          className={rowClass}
          style={isDesktop ? { gap: `${GAP}px` } : undefined}
        >
          {problems.map((problem, index) => (
            <div
              key={problem.projectSlug}
              className={isDesktop ? "" : "w-full"}
              onMouseEnter={() => canHover && setExpandedIndex(index)}
              onMouseLeave={() => canHover && setExpandedIndex(null)}
            >
              <ProblemCard
                problem={problem}
                isExpanded={expandedIndex === index}
                supportsHover={canHover}
                onToggle={() =>
                  setExpandedIndex((current) => (current === index ? null : index))
                }
                cardRef={(el) => {
                  cardRefs.current[index] = el;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
