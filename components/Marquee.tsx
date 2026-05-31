"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: string[];
  className?: string;
  reverse?: boolean;
  splitLetters?: boolean;
};

export default function Marquee({
  items,
  className,
  reverse,
  splitLetters = false,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const content = items.join("   •   ");

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced && trackRef.current) {
      trackRef.current.style.animation = "none";
    }
  }, []);

  const renderContent = () => {
    if (!splitLetters) {
      return (
        <span className="whitespace-nowrap px-8 text-[clamp(2rem,5vw,4.5rem)] font-light uppercase tracking-tight">
          {content}
        </span>
      );
    }

    return (
      <span className="whitespace-nowrap px-8 text-[clamp(2rem,5vw,4.5rem)] font-light uppercase tracking-tight">
        {content.split("").map((char, i) => (
          <span key={i} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className={cn("overflow-hidden border-y border-white/10 py-6", className)}>
      <div
        ref={trackRef}
        className={cn("marquee-track", reverse && "marquee-track-reverse")}
      >
        {renderContent()}
        {renderContent()}
      </div>
    </div>
  );
}
