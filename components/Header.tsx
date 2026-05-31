"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mainNav } from "@/data/navigation";
import {
  findNavIndexFromPath,
  isPillarPath,
  isWhiteHeroIndex,
} from "@/lib/routeNav";
import { cn } from "@/lib/cn";
import { markPendingBackToast } from "@/lib/backNavigation";
import { useAppStore } from "@/store/appStore";
import FullscreenMenu from "./FullscreenMenu";
import LiveClock from "./LiveClock";
import AnimatedCircleArrow from "./shared/AnimatedCircleArrow";

type HeaderProps = {
  externalHoverMenuIndex?: number | null;
  setExternalHoverMenuIndex?: (index: number | null) => void;
  onClickLogo?: () => void;
  isHome?: boolean;
  isWhiteBg?: boolean;
  showBack?: boolean;
  absolute?: boolean;
  isInsidePillar?: boolean;
  transparent?: boolean;
  /** When true, header scrolls with the page instead of staying fixed. Defaults to !isHome. */
  scrollWithPage?: boolean;
};

export default function Header({
  externalHoverMenuIndex,
  setExternalHoverMenuIndex,
  onClickLogo,
  isHome: isHomeProp,
  isWhiteBg = false,
  showBack = false,
  transparent = false,
  isInsidePillar: isInsidePillarProp,
  scrollWithPage: scrollWithPageProp,
}: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = isHomeProp ?? pathname === "/";
  const scrollWithPage = scrollWithPageProp ?? !isHome;
  const isInsidePillar = isInsidePillarProp ?? isPillarPath(pathname);

  const { setIndex, setIsWhite } = useAppStore();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [internalMenuIndex, setInternalMenuIndex] = useState<number | null>(null);
  const hoverTimeout = useRef<number | null>(null);
  const backRef = useRef<HTMLAnchorElement>(null);

  const visitingIndex = useMemo(() => {
    const index = findNavIndexFromPath(pathname);
    return index !== -1 ? index : undefined;
  }, [pathname]);

  const hoverMenuIndex =
    externalHoverMenuIndex !== undefined
      ? externalHoverMenuIndex
      : internalMenuIndex;

  const setMenuIndex = setExternalHoverMenuIndex ?? setInternalMenuIndex;

  const previewLiquidIndex =
    isHome && hoverMenuIndex !== null
      ? hoverMenuIndex + 1
      : visitingIndex !== undefined
        ? visitingIndex + 1
        : 0;

  const headerIsWhite =
    isWhiteBg || isWhiteHeroIndex(previewLiquidIndex);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (hoverTimeout.current !== null) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }

    if (isHome) {
      setMenuIndex(null);
      return;
    }

    if (visitingIndex !== undefined) {
      setInternalMenuIndex(visitingIndex);
      setIndex(visitingIndex + 1);
      setIsWhite(isWhiteHeroIndex(visitingIndex + 1));
    }
  }, [pathname, isHome, visitingIndex, setIndex, setIsWhite, setMenuIndex]);

  // Liquid preview on hover is homepage-only; route pages keep the visited hero.
  useEffect(() => {
    if (!isHome || hoverMenuIndex === null) return;
    const idx = hoverMenuIndex + 1;
    setIndex(idx);
    setIsWhite(isWhiteHeroIndex(idx));
  }, [hoverMenuIndex, isHome, setIndex, setIsWhite]);

  useEffect(() => {
    return () => {
      if (hoverTimeout.current !== null) {
        window.clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  const showSolidBg = scrolled && !transparent && !isHome && !scrollWithPage;
  const showWhiteScrolledBg =
    scrolled && transparent && headerIsWhite && !isHome && !scrollWithPage;
  const textColor = headerIsWhite ? "text-black" : "text-white";
  const usesExternalHover = externalHoverMenuIndex !== undefined;

  const handleMouseEnter = (index: number) => {
    if (hoverTimeout.current !== null) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }

    if (!isHome) {
      setMenuIndex(index);
      return;
    }

    if (hoverMenuIndex === null) {
      hoverTimeout.current = window.setTimeout(() => {
        setMenuIndex(index);
      }, 1600);
    } else {
      setMenuIndex(index);
    }
  };

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeout.current !== null) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }

    if (isHome) {
      // Live homepage ignores null from the external hover setter — preview stays locked.
      setMenuIndex(visitingIndex ?? null);
      return;
    }

    setMenuIndex(visitingIndex ?? null);
    if (visitingIndex !== undefined) {
      const idx = visitingIndex + 1;
      setIndex(idx);
      setIsWhite(isWhiteHeroIndex(idx));
    }
  }, [isHome, visitingIndex, setMenuIndex, setIndex, setIsWhite]);

  const handleHeaderItemClick = (
    event: React.MouseEvent,
    item: (typeof mainNav)[number],
    index: number
  ) => {
    if (hoverTimeout.current !== null) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }

    const isPillarLink = item.href.startsWith("/pillars/");
    const isManifestoOrStudio =
      item.href.includes("/manifesto") || item.href.includes("/studio");

    if (isInsidePillar && isPillarLink && !isManifestoOrStudio) {
      event.preventDefault();
      setMenuOpen(false);
      setMenuIndex(index);

      if (pathname !== item.href) {
        window.scrollTo(0, 0);
        router.push(item.href);
      }
      return;
    }

    setMenuOpen(false);
    router.push(item.href);
  };

  return (
    <>
      <header
        className={cn(
          "z-50 transition-all duration-500",
          scrollWithPage
            ? "relative"
            : "fixed top-0 left-0 right-0",
          showSolidBg
            ? "border-b border-white/10 bg-[#050505]/80 backdrop-blur-md"
            : showWhiteScrolledBg
              ? "border-b border-black/10 bg-white/85 backdrop-blur-md"
              : "bg-transparent"
        )}
      >
        <div className="page-padding flex h-[72px] items-center justify-between md:h-[88px] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {showBack ? (
            <Link
              ref={backRef}
              href="/"
              onClick={(event) => {
                event.preventDefault();
                markPendingBackToast();
                router.back();
              }}
              className="flex cursor-pointer items-center gap-2 text-xs tracking-[0.03rem] hover:opacity-80"
            >
              <span className="rotate-180">
                <AnimatedCircleArrow
                  triggerRef={backRef}
                  strokeClass={headerIsWhite ? "stroke-black" : "stroke-white"}
                  size={32}
                />
              </span>
              <span className={cn("opacity-60", textColor)}>
                Digital Product Company.
              </span>
            </Link>
          ) : (
            <Link
              href="/"
              onClick={() => {
                onClickLogo?.();
              }}
              className="group flex cursor-link cursor-none items-center gap-2 hover:opacity-80"
            >
              <Image
                src={
                  headerIsWhite
                    ? "/logos/logo-black.png"
                    : "/logos/logo-white.png"
                }
                alt="LOUD"
                width={25}
                height={25}
                priority
                className="shrink-0"
              />
              <span className="flex flex-wrap gap-x-2 text-xs tracking-[0.03rem]">
                {isHome ? (
                  <span className={cn("font-black", textColor)}>LOUD.</span>
                ) : null}
                <span className={cn("opacity-60", textColor)}>
                  Digital Product Company.
                </span>
              </span>
            </Link>
          )}

          <nav className="hidden items-center justify-center lg:flex">
            {mainNav.map((item, index) => {
              const isActive = hoverMenuIndex === index;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => handleHeaderItemClick(e, item, index)}
                  className={cn(
                    textColor,
                    usesExternalHover
                      ? "cursor-link cursor-none"
                      : "cursor-pointer",
                    "text-sm font-medium transition-all duration-400 px-6 py-4",
                    isActive && "opacity-100",
                    hoverMenuIndex !== null &&
                      hoverMenuIndex !== index &&
                      "blur-[3px] opacity-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-4 lg:justify-self-end">
            <div className="hidden shrink-0 lg:block">
              <LiveClock isWhiteBg={headerIsWhite} />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex cursor-pointer flex-col gap-1.5 lg:hidden"
              aria-label="Open menu"
            >
              <span
                className={cn("block h-px w-6", headerIsWhite ? "bg-black" : "bg-white")}
              />
              <span
                className={cn("block h-px w-4", headerIsWhite ? "bg-black" : "bg-white")}
              />
            </button>
          </div>
        </div>
      </header>

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
