"use client";

import { useRef } from "react";
import { gsap } from "@/lib/animations";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { cn } from "@/lib/cn";

type HeroAnimatedTextProps = {
  title: string;
  className?: string;
  isWhiteHero?: boolean;
  singleLine?: boolean;
  playIntro?: boolean;
  onIntroComplete?: () => void;
};

function splitTitle(el: HTMLElement, title: string) {
  const words = title.split(/\s+/).filter(Boolean);
  el.innerHTML = words
    .map(
      (word) =>
        `<span class="hero-word inline-block overflow-hidden"><span class="hero-word-inner inline-block !font-mono !font-light">${word}&nbsp;</span></span>`
    )
    .join("");
  return el.querySelectorAll<HTMLElement>(".hero-word-inner");
}

export default function HeroAnimatedText({
  title,
  className,
  isWhiteHero = false,
  singleLine = false,
  playIntro = false,
  onIntroComplete,
}: HeroAnimatedTextProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedOnceRef = useRef(false);
  const shouldPlayIntroRef = useRef(playIntro);
  const onIntroCompleteRef = useRef(onIntroComplete);

  onIntroCompleteRef.current = onIntroComplete;

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    timelineRef.current?.kill();

    const inner = splitTitle(el, title);
    if (!inner.length) return;

    const isIntro = shouldPlayIntroRef.current && !hasAnimatedOnceRef.current;
    const wordCount = inner.length;
    const targetColor = isWhiteHero ? "#000000" : "#ffffff";

    gsap.set(inner, { opacity: 0, y: 10, color: targetColor });

    timelineRef.current = gsap.timeline({
      onComplete: () => {
        hasAnimatedOnceRef.current = true;
        if (isIntro) {
          shouldPlayIntroRef.current = false;
          onIntroCompleteRef.current?.();
        }
      },
    });

    timelineRef.current.to(inner, {
      opacity: 1,
      y: 0,
      color: targetColor,
      duration: 1.2,
      ease: "power4.out",
      stagger: (isIntro ? 1.6 : 1.2) / wordCount,
      delay: isIntro ? 1 : 0,
    });

    return () => {
      timelineRef.current?.kill();
    };
  }, [title, isWhiteHero]);

  return (
    <h1
      ref={containerRef}
      className={cn(
        "hero-display px-2 text-center text-3xl font-light leading-[115%] md:text-[3.25rem] md:leading-[120%]",
        singleLine
          ? "max-w-none whitespace-nowrap"
          : "max-w-[800px] text-balance",
        isWhiteHero ? "text-black" : "text-white",
        className
      )}
    />
  );
}
