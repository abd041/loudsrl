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
  const lines = title
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const wordsByLine = lines.map((line) => line.split(/\s+/).filter(Boolean));
  const flatWords = wordsByLine.flat();
  const escapeHtml = (s: string) =>
    s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  let globalIndex = 0;
  el.innerHTML = wordsByLine
    .map((lineWords, lineIndex) => {
      const html = lineWords
        .map((word) => {
          const isLast = globalIndex === flatWords.length - 1;
          const wordHtml = `<span class="hero-word inline-block overflow-hidden"><span class="hero-word-inner inline-block !font-mono !font-light ${!isLast ? "mr-[0.35em]" : ""}">${escapeHtml(word)}</span></span>`;
          globalIndex += 1;
          return wordHtml;
        })
        .join("");

      const needsBreak = lineIndex < wordsByLine.length - 1;
      return needsBreak ? `${html}<br />` : html;
    })
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
        "hero-display w-full min-w-0 max-w-full px-1 text-center font-light sm:px-2",
        singleLine
          ? "hero-display--home mx-auto text-balance md:max-w-none md:whitespace-nowrap"
          : "mx-auto max-w-[800px] text-balance",
        isWhiteHero ? "text-black" : "text-white",
        className
      )}
    />
  );
}
