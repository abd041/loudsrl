"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AnimatedCircleArrow from "@/components/shared/AnimatedCircleArrow";
import { allCaseStudies } from "@/data/caseStudies";
import { gsap, registerGsap } from "@/lib/animations";
import { cn } from "@/lib/cn";

type CaseStudySwitcherProps = {
  slug: string;
};

export default function CaseStudySwitcher({ slug }: CaseStudySwitcherProps) {
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const initialIndex = Math.max(
    0,
    allCaseStudies.findIndex((item) => item.slug === slug)
  );
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    registerGsap();
  }, []);

  useEffect(() => {
    const nextIndex = allCaseStudies.findIndex((item) => item.slug === slug);
    if (nextIndex !== -1 && nextIndex !== index) {
      setIndex(nextIndex);
    }
  }, [slug, index]);

  useEffect(() => {
    const target = allCaseStudies[index];
    if (target && target.slug !== slug) {
      window.scrollTo(0, 0);
      router.push(`/case-studies/${target.slug}`);
    }
  }, [index, router, slug]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const offset = -index * track.offsetWidth;
    gsap.to(track, { x: offset, duration: 0.5, ease: "power2.out" });

    const labels = track.querySelectorAll<HTMLElement>("[data-switch-label]");
    const isDesktop = window.matchMedia("(min-width: 640px)").matches;

    labels.forEach((label, labelIndex) => {
      const isPeek = labelIndex === index + 1;
      gsap.to(label, {
        x: isPeek && isDesktop ? -label.offsetWidth / 2 : 0,
        color: isPeek ? "transparent" : "#000000",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }, [index]);

  useEffect(() => {
    const onResize = () => {
      const track = trackRef.current;
      if (!track) return;
      gsap.set(track, { x: -index * track.offsetWidth });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let startX = 0;
    const onTouchStart = (event: TouchEvent) => {
      startX = event.touches[0]?.clientX ?? 0;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0]?.clientX ?? 0;
      const delta = endX - startX;
      if (Math.abs(delta) < 48) return;
      if (delta < 0) {
        setIndex((current) => Math.min(current + 1, allCaseStudies.length - 1));
      } else {
        setIndex((current) => Math.max(current - 1, 0));
      }
    };

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const prev = prevRef.current;
    const next = nextRef.current;
    if (!prev || !next) return;

    gsap.to(prev, { opacity: index === 0 ? 0.1 : 1, duration: 0.3 });
    gsap.to(next, {
      opacity: index === allCaseStudies.length - 1 ? 0.1 : 1,
      duration: 0.3,
    });
  }, [index]);

  return (
    <div className="page-padding flex w-full justify-center">
      <div className="mx-auto flex w-full max-w-6xl items-end overflow-hidden md:pb-10">
        <div className="flex min-w-0 flex-1 items-end overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-full items-end will-change-transform"
          >
            {allCaseStudies.map((item) => (
              <div key={item.slug} className="w-full shrink-0 grow">
                <p
                  data-switch-label
                  className={cn(
                    "w-max font-mono text-3xl font-light leading-[120%] sm:text-5xl md:text-6xl",
                    item.slug === slug
                      ? "text-black"
                      : "text-gradient-industry-black"
                  )}
                >
                  <span className="flex max-w-[min(calc(100vw-76px-32px),360px)] overflow-hidden text-balance font-mono md:max-w-[min(calc(100vw-76px-32px),450px)]">
                    {item.name}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-end gap-3 pb-4 pl-2">
          <button
            ref={prevRef}
            type="button"
            disabled={index === 0}
            onClick={() => setIndex((current) => Math.max(current - 1, 0))}
            className="flex rotate-180 cursor-pointer items-center justify-center disabled:cursor-default"
            aria-label="Previous case study"
          >
            <AnimatedCircleArrow triggerRef={prevRef} strokeClass="stroke-black" />
          </button>
          <button
            ref={nextRef}
            type="button"
            disabled={index === allCaseStudies.length - 1}
            onClick={() =>
              setIndex((current) =>
                Math.min(current + 1, allCaseStudies.length - 1)
              )
            }
            className="flex cursor-pointer items-center justify-center disabled:cursor-default"
            aria-label="Next case study"
          >
            <AnimatedCircleArrow triggerRef={nextRef} strokeClass="stroke-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
