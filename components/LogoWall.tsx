"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import {
  logoWallText,
  logosForDarkBackground,
  logosForLightBackground,
} from "@/data/logos";
import { gsap, registerGsap } from "@/lib/animations";
import { logoSrc } from "@/lib/media";
import { cn } from "@/lib/cn";

type LogoWallProps = {
  variant?: "dark" | "light";
  /** Studio/contact: `mt-20` separator + live typography (no extra CTA) */
  sectionLayout?: "default" | "studio" | "contact";
  showCta?: boolean;
  ctaLabel?: string;
};

/** Measured on loudsrl.com/studio logo marquee (~160–165px/s). */
const LOGO_MARQUEE_PX_PER_SEC = 162;

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

function LogoMarquee({ logos }: { logos: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const items = [...logos, ...logos];

  useLayoutEffect(() => {
    registerGsap();
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    tweenRef.current?.kill();
    gsap.set(track, { x: 0 });

    if (reduced) return;

    const halfWidth = track.scrollWidth / 2;
    if (halfWidth <= 0) return;

    tweenRef.current = gsap.to(track, {
      x: -halfWidth,
      duration: halfWidth / LOGO_MARQUEE_PX_PER_SEC,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [logos]);

  const pause = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.resume();

  return (
    <div
      className="w-full cursor-grab overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-10 will-change-transform md:gap-20"
      >
        {items.map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className={cn(
              "h-10 shrink-0",
              index >= logos.length && "clone"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc(logo)}
              alt={logo}
              width={660}
              height={220}
              className="h-full w-auto"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoWall({
  variant = "light",
  sectionLayout = "default",
  showCta = false,
  ctaLabel = "Be the next",
}: LogoWallProps) {
  const isLight = variant === "light";
  const isStudio = sectionLayout === "studio" || sectionLayout === "contact";
  const logos = isLight ? logosForLightBackground : logosForDarkBackground;

  const headingClass = isStudio
    ? "mx-auto w-full max-w-6xl px-4 text-center text-balance text-5xl leading-[115%]"
    : cn(
        "mx-auto w-full max-w-6xl px-4 text-center text-balance text-5xl leading-[115%]",
        isLight ? "text-black" : "text-white"
      );

  const inner = (
    <>
      <div
        className={cn(
          "flex flex-col",
          "gap-16"
        )}
      >
        <p className={headingClass}>{logoWallText}</p>
        <LogoMarquee logos={[...logos]} />
      </div>

      {showCta ? (
        <div className="mt-16 flex justify-center px-4">
          <LogoWallLink isLight={isLight} label={ctaLabel} />
        </div>
      ) : null}
    </>
  );

  if (isStudio) {
    return (
      <div
        className={cn(
          "relative z-20 bg-white text-black",
          "mt-20 border-[#dfdfdf]"
        )}
      >
        <div className="py-28">
          {inner}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative z-20 overflow-hidden py-28",
        isLight ? "bg-white text-black" : "bg-black text-white"
      )}
    >
      <div className="mx-auto max-w-6xl px-4">{inner}</div>
    </div>
  );
}
