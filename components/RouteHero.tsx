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
};

export default function RouteHero({
  activeIndex,
  eyebrow,
  title,
  body,
  isWhite,
  footer,
}: RouteHeroProps) {
  const safeIndex = clampPresetIndex(activeIndex);
  const whiteHero = isWhite ?? safeIndex === 5;
  const isPillarLayout = Boolean(footer);

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
      <span
        className={cn(
          "mt-8 inline-block h-2 w-2 rounded-full",
          whiteHero ? "bg-black" : "bg-white"
        )}
        aria-hidden
      />
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
    </section>
  );
}
