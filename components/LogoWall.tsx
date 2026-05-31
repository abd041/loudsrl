"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  logoWallText,
  logosForDarkBackground,
  logosForLightBackground,
} from "@/data/logos";
import { logoSrc } from "@/lib/media";
import { cn } from "@/lib/cn";
import ScrollReveal from "./ScrollReveal";

type LogoWallProps = {
  variant?: "dark" | "light";
  ctaLabel?: string;
};

function LogoWallLink({
  isLight,
  label,
}: {
  isLight: boolean;
  label: string;
}) {
  return (
    <Link
      href="/contact-us"
      className={cn(
        "inline-flex cursor-link cursor-none items-center gap-4 text-lg font-light transition-colors duration-300",
        isLight
          ? "cursor-invert text-black/80 hover:text-black"
          : "cursor-force-white text-white hover:text-white/80"
      )}
    >
      {label}
      <span
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8",
          isLight ? "bg-black text-white" : "bg-white text-black"
        )}
      >
        <svg
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden
        >
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

function LogoScroll({
  logos,
}: {
  logos: string[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...logos, ...logos];

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced && trackRef.current) {
      trackRef.current.style.animation = "none";
    }
  }, []);

  return (
    <div className="logo-marquee-scroll w-full cursor-grab overflow-hidden">
      <div
        ref={trackRef}
        className="logo-marquee-track flex w-max items-center gap-10 md:gap-20"
      >
        {items.map((logo, index) => (
          <div key={`${logo}-${index}`} className="flex h-10 shrink-0 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc(logo)}
              alt=""
              width={140}
              height={40}
              className="h-full w-auto max-w-[160px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoWall({
  variant = "light",
  ctaLabel = "Be the next",
}: LogoWallProps) {
  const isLight = variant === "light";
  const logos = isLight ? logosForLightBackground : logosForDarkBackground;

  return (
    <ScrollReveal
      className={cn(
        "overflow-hidden py-28",
        isLight ? "bg-white text-black" : "bg-black text-white"
      )}
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4">
        <p
          className={cn(
            "mx-auto w-full text-balance text-center text-3xl leading-[1.15] md:text-4xl lg:text-5xl",
            isLight ? "text-black" : "text-white"
          )}
        >
          {logoWallText}
        </p>
      </div>

      <div className="mt-16 w-full">
        <LogoScroll logos={logos} />
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl justify-center px-4">
        <LogoWallLink isLight={isLight} label={ctaLabel} />
      </div>
    </ScrollReveal>
  );
}
