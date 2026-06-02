"use client";

import dynamic from "next/dynamic";
import ClickRippleLink from "@/components/shared/ClickRippleLink";
import { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import IndustryCard from "@/components/IndustryCard";
import ShowIndustriesMenu from "@/components/ShowIndustriesMenu";
import ScrollReveal from "@/components/ScrollReveal";
import LogoWall from "@/components/LogoWall";
import HeroAnimatedText from "@/components/HeroAnimatedText";
import HeroFadeText from "@/components/HeroFadeText";
import HomeIndustryLinks from "@/components/home/HomeIndustryLinks";
import IndustryHoverContext from "@/components/home/IndustryHoverContext";
import HeroScrollProgressIndicator from "@/components/home/HeroScrollProgressIndicator";
import { industries, industryDocs, industryMarqueeItems } from "@/data/industries";
import { getHomeHeroPreview, HOME_HERO_PREVIEWS } from "@/data/homeHeroPreviews";
import { clampPresetIndex } from "@/data/liquidPresets";
import { cn } from "@/lib/cn";
import { useHeroHardScroll } from "@/hooks/useHeroHardScroll";
import { useAppStore } from "@/store/appStore";
import { useCursorStore } from "@/store/cursorStore";

const LoudOriginalHero = dynamic(
  () => import("@/components/LoudOriginalHero"),
  { ssr: false }
);

export default function HomePage() {
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [hoveredIndustryIndex, setHoveredIndustryIndex] = useState<number | null>(
    null
  );
  const [hoverMenuIndex, setHoverMenuIndex] = useState<number | null>(null);

  const { setIndex, setIsWhite, setZoom, homepage, setShouldAnimate } =
    useAppStore();
  const { setCursor, resetCursor } = useCursorStore();

  const {
    scrollProgressVisible,
    progressCircleRef,
    progressContainerRef,
    heroGestureTargetRef,
  } = useHeroHardScroll(setHoverMenuIndex, {
    playIntro: homepage.shouldAnimate,
  });

  const activeHeroIndex =
    hoverMenuIndex !== null ? hoverMenuIndex + 1 : 0;
  const safeShaderIndex = clampPresetIndex(activeHeroIndex);
  const hero = getHomeHeroPreview(activeHeroIndex);
  const isWhiteHero = activeHeroIndex === 5;

  useEffect(() => {
    setZoom(false);
  }, [setZoom]);

  useEffect(() => {
    setIndex(safeShaderIndex);
    setIsWhite(isWhiteHero);
  }, [safeShaderIndex, isWhiteHero, setIndex, setIsWhite]);

  useEffect(() => {
    setCursor({
      customText: "VIEW INDUSTRY",
      showText: false,
      delayArrow:
        hoveredIndustryIndex === null && hoverMenuIndex === null,
      forceLink: hoveredIndustryIndex !== null,
      forceColorMode:
        hoveredIndustryIndex !== null
          ? isWhiteHero
            ? "grey"
            : "force-white"
          : null,
    });
  }, [hoveredIndustryIndex, hoverMenuIndex, isWhiteHero, setCursor]);

  useEffect(() => {
    return () => resetCursor();
  }, [resetCursor]);

  const handleIntroComplete = useCallback(() => {
    if (homepage.shouldAnimate) {
      setShouldAnimate(false);
    }
  }, [homepage.shouldAnimate, setShouldAnimate]);

  return (
    <>
      <Header
        isHome
        transparent
        isWhiteBg={isWhiteHero}
        externalHoverMenuIndex={hoverMenuIndex}
        setExternalHoverMenuIndex={(index) => {
          if (index !== null) setHoverMenuIndex(index);
        }}
        onClickLogo={() => setHoverMenuIndex(null)}
      />
      <main id="main-content">
        <section
          ref={heroGestureTargetRef}
          className="relative h-screen min-h-[100svh] overflow-hidden"
        >
          <LoudOriginalHero activeIndex={safeShaderIndex} />

          {industryDocs.map((industry, index) => (
            <div
              key={industry.slug}
              className={cn(
                hoveredIndustryIndex !== index
                  ? "pointer-events-none opacity-0"
                  : "opacity-100"
              )}
            >
              <IndustryHoverContext
                industry={industry}
                index={index}
                selectedIndustry={hoveredIndustryIndex}
                isWhiteBg={isWhiteHero}
              />
            </div>
          ))}

          <div className="pointer-events-none relative z-10 flex h-full w-full max-w-[100vw] flex-col overflow-hidden">
            <div
              className={cn(
                "flex w-full min-w-0 flex-1 flex-col items-center justify-center px-4 text-center transition-colors duration-700 ease-out sm:px-6",
                isWhiteHero ? "text-black" : "text-white"
              )}
            >
              {hero.eyebrow ? (
                <HeroFadeText
                  text={hero.eyebrow}
                  className={cn(
                    "section-label mb-5",
                    isWhiteHero ? "text-black/60" : "text-white/70"
                  )}
                />
              ) : null}
              <HeroAnimatedText
                title={hero.title}
                isWhiteHero={isWhiteHero}
                singleLine={activeHeroIndex === 0}
                playIntro={homepage.shouldAnimate && activeHeroIndex === 0}
                onIntroComplete={handleIntroComplete}
                className={isWhiteHero ? "text-black" : "text-white"}
              />
              {hero.body ? (
                <HeroFadeText
                  text={hero.body}
                  className={cn(
                    "mt-6 max-w-xl text-base leading-relaxed md:text-lg",
                    isWhiteHero ? "text-black/70" : "text-white/75"
                  )}
                />
              ) : null}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex w-full max-w-[100vw] items-end justify-between gap-2 px-4 pb-7 max-[360px]:pb-6 sm:gap-4 sm:px-6 sm:pb-10 lg:px-10">
            <HomeIndustryLinks
              hoveredIndustryIndex={hoveredIndustryIndex}
              setHoveredIndustryIndex={setHoveredIndustryIndex}
              isWhiteHero={isWhiteHero}
              playIntro={homepage.shouldAnimate}
            />

            <HeroScrollProgressIndicator
              visible={scrollProgressVisible}
              isWhiteBg={isWhiteHero}
              showUpArrow={
                hoverMenuIndex === null ||
                hoverMenuIndex < HOME_HERO_PREVIEWS.length - 2
              }
              progressCircleRef={progressCircleRef}
              progressContainerRef={progressContainerRef}
            />

            <ClickRippleLink
              href="/contact-us"
              className={cn(
                "pointer-events-auto shrink-0 rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.14em] transition sm:px-5 sm:text-[10px] sm:tracking-[0.16em] md:px-6 md:py-2.5 md:text-[11px] md:tracking-[0.18em]",
                isWhiteHero
                  ? "border-black/25 text-black/90 hover:border-black/50 hover:bg-black/5"
                  : "border-white/25 text-white/90 hover:border-white/50 hover:bg-white/5"
              )}
            >
              Are you the next?
            </ClickRippleLink>
          </div>
        </section>

        <section className="page-padding py-10 md:py-12">
          <button
            type="button"
            onClick={() => setIndustriesOpen(true)}
            className="group flex items-center gap-4 text-sm uppercase tracking-[0.2em] transition hover:opacity-60"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
              +
            </span>
            Show Industries
          </button>
        </section>

        <Marquee items={industryMarqueeItems} />
        <Marquee items={industryMarqueeItems} reverse />

        <section className="page-padding pb-10 pt-14 md:pb-12 md:pt-16">
          <p className="section-label">I•VI PILLARS</p>
        </section>

        <section className="page-padding grid gap-6 pb-16 sm:gap-8 md:grid-cols-2 md:gap-12 md:pb-28">
          {industries.map((industry, i) => (
            <ScrollReveal key={industry.slug}>
              <IndustryCard {...industry} index={i} />
            </ScrollReveal>
          ))}
        </section>

        <LogoWall />
      </main>
      <Footer />
      <ShowIndustriesMenu
        open={industriesOpen}
        onClose={() => setIndustriesOpen(false)}
      />
    </>
  );
}
