"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getIndustryIndex,
  industryPages,
  type IndustryPage,
} from "@/data/industryPages";
import { gsap, registerGsap } from "@/lib/animations";
import AnimatedCircleArrow from "@/components/shared/AnimatedCircleArrow";

type IndustryHeroBannerProps = {
  industry: IndustryPage;
};

export default function IndustryHeroBanner({ industry }: IndustryHeroBannerProps) {
  const router = useRouter();
  const currentIndex = getIndustryIndex(industry.slug);
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [mediaReady, setMediaReady] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    setMediaReady(false);
  }, [industry.imageBackground, industry.badgeColor]);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= industryPages.length) return;
      const target = industryPages[index];
      if (target.slug !== industry.slug) {
        router.push(`/industries/${target.slug}`, { scroll: false });
      }
    },
    [industry.slug, router]
  );

  const updateCarousel = useCallback(
    (animated: boolean) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const slideWidth = viewport.offsetWidth;
      if (!slideWidth) return;

      track.querySelectorAll<HTMLElement>("[data-slide]").forEach((slide) => {
        slide.style.width = `${slideWidth}px`;
        slide.style.minWidth = `${slideWidth}px`;
      });

      const offset = -activeIndex * slideWidth;

      if (animated) {
        gsap.to(track, { x: offset, duration: 0.5, ease: "power2.out" });
      } else {
        gsap.set(track, { x: offset });
      }

      const isDesktop = window.matchMedia("(min-width: 640px)").matches;
      track.querySelectorAll<HTMLElement>("[data-slide-title]").forEach((el, index) => {
        const isNext = index === activeIndex + 1;

        gsap.set(el, {
          x: isNext && isDesktop ? -el.offsetWidth / 2 : 0,
        });

        gsap.to(el, {
          color: isNext ? "transparent" : "#ffffff",
          opacity: isNext ? 0.7 : 1,
          duration: animated ? 0.2 : 0,
        });
      });
    },
    [activeIndex]
  );

  useEffect(() => {
    registerGsap();

    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { autoAlpha: 0, y: -40 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power4.out" }
      );
    }
  }, []);

  useEffect(() => {
    updateCarousel(true);

    const onResize = () => updateCarousel(false);
    window.addEventListener("resize", onResize);

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateCarousel(false))
        : null;

    if (viewportRef.current && observer) {
      observer.observe(viewportRef.current);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [updateCarousel]);

  useEffect(() => {
    if (prevRef.current) {
      gsap.to(prevRef.current, {
        opacity: activeIndex === 0 ? 0.1 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (nextRef.current) {
      gsap.to(nextRef.current, {
        opacity: activeIndex === industryPages.length - 1 ? 0.1 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [activeIndex]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? 0;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (delta < -50) goTo(activeIndex + 1);
    if (delta > 50) goTo(activeIndex - 1);
  };

  return (
    <section className="relative h-[50vh] overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            mediaReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            key={industry.imageBackground}
            src={industry.imageBackground}
            alt={industry.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            onLoad={() => setMediaReady(true)}
          />
        </div>
        <div
          className="absolute inset-0 transition-colors duration-700 ease-in-out"
          style={{ backgroundColor: industry.badgeColor }}
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute left-0 top-0 flex h-full w-full justify-center p-4 opacity-0"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="z-10 mx-auto flex w-full max-w-6xl items-end overflow-hidden pb-10">
          <div className="flex w-full min-w-0 gap-4 overflow-hidden">
            <div
              ref={viewportRef}
              className="flex min-w-0 flex-1 items-end overflow-hidden"
            >
              <div
                ref={trackRef}
                className="flex items-end will-change-transform"
              >
                {industryPages.map((page) => (
                  <div key={page.slug} data-slide className="shrink-0 grow">
                    <p
                      data-slide-title
                      className="text-gradient-industry w-max font-mono text-3xl font-light leading-[1.2] sm:text-5xl md:text-6xl"
                    >
                      <span className="flex max-w-[min(calc(100vw-76px-32px),360px)] overflow-hidden text-balance font-mono md:max-w-[min(calc(100vw-76px-32px),450px)]">
                        {page.title}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-end gap-3 pb-4">
              <button
                ref={prevRef}
                type="button"
                aria-label="Previous industry"
                disabled={activeIndex === 0}
                onClick={() => goTo(activeIndex - 1)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center disabled:cursor-default"
              >
                <span className="inline-flex rotate-180 items-center justify-center">
                  <AnimatedCircleArrow triggerRef={prevRef} />
                </span>
              </button>
              <button
                ref={nextRef}
                type="button"
                aria-label="Next industry"
                disabled={activeIndex === industryPages.length - 1}
                onClick={() => goTo(activeIndex + 1)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center disabled:cursor-default"
              >
                <AnimatedCircleArrow triggerRef={nextRef} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
