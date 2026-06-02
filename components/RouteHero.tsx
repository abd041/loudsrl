"use client";

import HeroAnimatedText from "@/components/HeroAnimatedText";
import HeroFadeText from "@/components/HeroFadeText";
import { clampPresetIndex } from "@/data/liquidPresets";
import { cn } from "@/lib/cn";

export type RouteHeroProps = {
  activeIndex: number;
  eyebrow?: string;
  title: string;
  body?: string;
  isWhite?: boolean;
  footer?: React.ReactNode;
  showDot?: boolean;
  showScrollCue?: boolean;
  scrollCueTargetId?: string;
};

export default function RouteHero({
  activeIndex,
  eyebrow,
  title,
  body,
  isWhite,
  footer,
  showDot = true,
  showScrollCue = false,
  scrollCueTargetId,
}: RouteHeroProps) {
  const safeIndex = clampPresetIndex(activeIndex);
  const whiteHero = isWhite ?? safeIndex === 5;
  const isPillarLayout = Boolean(footer);

  const handleScrollCue = () => {
    const id = scrollCueTargetId ?? "after-hero";
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const textBlock = (
    <>
      {eyebrow ? (
        <p
          className={cn(
            "section-label mb-5",
            whiteHero ? "text-black/60" : "text-white/70"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <HeroAnimatedText
        key={title}
        title={title}
        isWhiteHero={whiteHero}
        className={cn(
          whiteHero ? "text-black" : "text-white",
          isPillarLayout &&
            "mx-0 max-w-none text-left md:text-left lg:max-w-[min(100%,1100px)]"
        )}
      />
      {body ? (
        <HeroFadeText
          key={body}
          text={body}
          className={cn(
            "mt-6 max-w-xl text-base leading-relaxed md:text-lg",
            whiteHero ? "text-black/70" : "text-white/80",
            isPillarLayout && "text-left"
          )}
        />
      ) : null}
      {showDot ? (
        <span
          className={cn(
            "mt-8 inline-block h-2 w-2 rounded-full",
            whiteHero ? "bg-black" : "bg-white"
          )}
          aria-hidden
        />
      ) : null}
    </>
  );

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Liquid: single fixed canvas via FooterLiquidBackdrop (live parity) */}

      {isPillarLayout && !whiteHero ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-black/25 to-black/45"
        />
      ) : null}

      {isPillarLayout ? (
        <div className="relative z-10 flex min-h-[100svh] flex-col">
          <div className="flex-1" />

          <div className="pointer-events-none w-full px-4 pb-5 md:pb-6 lg:px-8">
            <div
              className={cn(
                "mx-auto flex max-w-[1100px] flex-col items-start text-left",
                whiteHero ? "text-black" : "text-white"
              )}
            >
              {textBlock}
            </div>
          </div>

          <div className="relative z-20 shrink-0">{footer}</div>
        </div>
      ) : (
        <div
          className={cn(
            "pointer-events-none relative z-10 flex min-h-[100svh] w-full max-w-[100vw] flex-col items-center justify-center overflow-hidden px-4 pt-28 text-center transition-colors duration-700 sm:px-6 sm:pt-32",
            whiteHero ? "text-black" : "text-white"
          )}
        >
          {textBlock}
        </div>
      )}

      {showScrollCue ? (
        <div className="pointer-events-none absolute bottom-14 left-1/2 z-20 -translate-x-1/2 md:bottom-16">
          <button
            type="button"
            onClick={handleScrollCue}
            aria-label="Scroll"
            className={cn(
              "pointer-events-auto grid h-10 w-10 place-items-center rounded-full",
              "border transition-colors duration-300",
              whiteHero
                ? "border-black/20 bg-white/30 text-black hover:bg-white/45"
                : "border-white/25 bg-black/20 text-white hover:bg-black/30"
            )}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      ) : null}
    </section>
  );
}
