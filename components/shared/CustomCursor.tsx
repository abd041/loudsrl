"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/animations";
import { cn } from "@/lib/cn";
import { useAppStoreOptional } from "@/store/appStore";
import { useCursorStoreOptional } from "@/store/cursorStore";

type CursorMode = "default" | "link" | "pointer" | "close";
type ColorMode = "default" | "force-white" | "grey";

const CURSOR_BLACK = "#000000";
const CURSOR_WHITE = "#ffffff";

function detectCursorState(
  x: number,
  y: number
): {
  mode: CursorMode;
  colorMode: ColorMode;
  noDelay: boolean;
} {
  const el = document.elementFromPoint(x, y) as HTMLElement | null;

  let mode: CursorMode = "default";
  if (el?.closest(".cursor-close")) {
    mode = "close";
  } else if (el?.closest(".cursor-link")) {
    mode = "link";
  } else if (el?.closest(".cursor-pointer")) {
    mode = "pointer";
  }

  let colorMode: ColorMode = "default";
  if (el?.closest(".cursor-force-white")) {
    colorMode = "force-white";
  } else if (el?.closest(".cursor-invert")) {
    colorMode = "grey";
  }

  const noDelay = !!el?.closest(".no-delay");

  return { mode, colorMode, noDelay };
}

function resolveCursorColor(colorMode: ColorMode, heroIsWhite: boolean) {
  if (colorMode === "grey") return CURSOR_BLACK;
  if (colorMode === "force-white") return CURSOR_WHITE;
  return heroIsWhite ? CURSOR_BLACK : CURSOR_WHITE;
}

function gsapTargets(
  ...elements: Array<Element | null | undefined>
): Element[] {
  return elements.filter((el): el is Element => el != null);
}

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const arrowHRef = useRef<HTMLSpanElement>(null);
  const arrowVRef = useRef<HTMLSpanElement>(null);
  const closeLine1Ref = useRef<HTMLSpanElement>(null);
  const closeLine2Ref = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [enabled, setEnabled] = useState(false);
  const modeRef = useRef<CursorMode>("default");
  const colorModeRef = useRef<ColorMode>("default");
  const delayArrowRef = useRef(true);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const animateModeRef = useRef<
    ((mode: CursorMode, options: { noDelay: boolean; delayArrow: boolean }) => void) | null
  >(null);
  const applyCursorColorRef = useRef<
    ((colorMode: ColorMode, heroIsWhite: boolean, animate?: boolean) => void) | null
  >(null);

  const pathname = usePathname();
  const cursor = useCursorStoreOptional();
  const appStore = useAppStoreOptional();
  const heroIsWhite = appStore?.liquidBackground.isWhite ?? false;
  const heroIsWhiteRef = useRef(heroIsWhite);

  heroIsWhiteRef.current = heroIsWhite;

  const showText = cursor?.showText ?? false;
  const customText = cursor?.customText ?? "";
  const delayArrow = cursor?.delayArrow ?? true;
  const forceLink = cursor?.forceLink ?? false;
  const forceColorMode = cursor?.forceColorMode ?? null;

  useEffect(() => {
    delayArrowRef.current = delayArrow;
  }, [delayArrow]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || coarse) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    return () => {
      document.body.classList.remove("custom-cursor");
    };
  }, [pathname]);

  const resolveCursorState = useCallback(
    (x: number, y: number) => {
      const detected = detectCursorState(x, y);
      let mode = detected.mode;
      let colorMode = detected.colorMode;
      let noDelay = detected.noDelay;

      if (forceLink) {
        mode = "link";
        noDelay = true;
      }

      if (forceColorMode === "force-white") {
        colorMode = "force-white";
      } else if (forceColorMode === "grey") {
        colorMode = "grey";
      }

      return { mode, colorMode, noDelay };
    },
    [forceLink, forceColorMode]
  );

  useEffect(() => {
    if (!enabled) return;

    const fill = fillRef.current;
    const ring = ringRef.current;
    const arrowH = arrowHRef.current;
    const arrowV = arrowVRef.current;
    const closeLine1 = closeLine1Ref.current;
    const closeLine2 = closeLine2Ref.current;
    const label = labelRef.current;

    if (!fill || !ring || !arrowH || !arrowV || !closeLine1 || !closeLine2) {
      return;
    }

    const animateMode = (
      mode: CursorMode,
      options: { noDelay: boolean; delayArrow: boolean }
    ) => {
      const instantArrow = options.noDelay || !options.delayArrow;
      const duration = 0.4;
      const linkDuration = 0.6;

      gsap.killTweensOf(
        gsapTargets(fill, ring, arrowH, arrowV, closeLine1, closeLine2)
      );

      if (mode === "default") {
        gsap.set(fill, { transformOrigin: "50% 50%" });
        gsap.to(fill, {
          scale: 0.4,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(ring, {
          scale: 0.6,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
        gsap.to(gsapTargets(arrowH, arrowV), {
          scaleX: 0,
          scaleY: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
        gsap.to(gsapTargets(closeLine1, closeLine2), {
          scaleX: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
        return;
      }

      gsap.to(fill, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });

      gsap.to(ring, {
        scale: mode === "pointer" ? 1.05 : 1,
        opacity: 1,
        duration,
        ease: "power2.out",
      });

      gsap.to(gsapTargets(arrowH, arrowV), {
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        duration: 0.15,
        ease: "power2.in",
      });

      gsap.to(gsapTargets(closeLine1, closeLine2), {
        scaleX: 0,
        opacity: 0,
        duration: 0.15,
        ease: "power2.in",
      });

      if (mode === "link") {
        gsap.to(arrowH, {
          scaleX: 1,
          opacity: 1,
          duration: linkDuration,
          delay: instantArrow ? 0 : 0.12,
          ease: "power2.out",
        });
        gsap.to(arrowV, {
          scaleY: 1,
          opacity: 1,
          duration: linkDuration,
          delay: instantArrow ? 0 : 0.12,
          ease: "power2.out",
        });
      }

      if (mode === "close") {
        gsap.to(gsapTargets(closeLine1, closeLine2), {
          scaleX: 1,
          opacity: 1,
          duration: linkDuration,
          ease: "power2.out",
        });
      }
    };

    const applyCursorColor = (
      colorMode: ColorMode,
      isWhiteHero: boolean,
      animate = true
    ) => {
      if (!rootRef.current) return;

      const color = resolveCursorColor(colorMode, isWhiteHero);
      const targets = label ? [rootRef.current, label] : [rootRef.current];

      if (animate) {
        gsap.to(targets, { color, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.set(targets, { color });
      }
    };

    animateModeRef.current = animateMode;
    applyCursorColorRef.current = applyCursorColor;

    const onMove = (e: PointerEvent) => {
      if (document.hidden || !rootRef.current) return;

      lastPointerRef.current = { x: e.clientX, y: e.clientY };
      rootRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      const { mode, colorMode, noDelay } = resolveCursorState(
        e.clientX,
        e.clientY
      );

      if (mode !== modeRef.current) {
        modeRef.current = mode;
        animateMode(mode, { noDelay, delayArrow: delayArrowRef.current });
      }

      if (colorMode !== colorModeRef.current) {
        colorModeRef.current = colorMode;
        applyCursorColor(colorMode, heroIsWhiteRef.current);
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        modeRef.current = "default";
        animateMode("default", { noDelay: true, delayArrow: false });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    animateMode("default", { noDelay: true, delayArrow: false });
    applyCursorColor("default", heroIsWhiteRef.current, false);

    return () => {
      animateModeRef.current = null;
      applyCursorColorRef.current = null;
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gsap.killTweensOf(
        gsapTargets(fill, ring, arrowH, arrowV, closeLine1, closeLine2)
      );
    };
  }, [enabled, pathname, resolveCursorState]);

  useEffect(() => {
    if (!enabled) return;

    applyCursorColorRef.current?.(
      colorModeRef.current,
      heroIsWhite,
      true
    );
  }, [enabled, heroIsWhite]);

  useEffect(() => {
    if (!enabled || !forceLink) return;

    const { x, y } = lastPointerRef.current;
    const { mode, colorMode } = resolveCursorState(x, y);

    if (modeRef.current !== "link") {
      modeRef.current = "link";
      animateModeRef.current?.("link", {
        noDelay: true,
        delayArrow: delayArrowRef.current,
      });
    }

    if (colorMode !== colorModeRef.current) {
      colorModeRef.current = colorMode;
      applyCursorColorRef.current?.(colorMode, heroIsWhiteRef.current);
    }
  }, [enabled, forceLink, forceColorMode, resolveCursorState]);

  useEffect(() => {
    if (!enabled || forceLink) return;

    const { x, y } = lastPointerRef.current;
    const { mode, colorMode, noDelay } = resolveCursorState(x, y);

    if (mode !== modeRef.current) {
      modeRef.current = mode;
      animateModeRef.current?.(mode, {
        noDelay,
        delayArrow: delayArrowRef.current,
      });
    }

    if (colorMode !== colorModeRef.current) {
      colorModeRef.current = colorMode;
      applyCursorColorRef.current?.(colorMode, heroIsWhiteRef.current);
    }
  }, [enabled, forceLink, resolveCursorState]);

  useEffect(() => {
    if (!enabled || !labelRef.current) return;

    gsap.to(labelRef.current, {
      autoAlpha: showText ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [enabled, showText, customText]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className={cn(
        "pointer-events-none fixed -left-6 -top-6 z-[100000] flex items-center gap-2 text-white"
      )}
      style={{ color: CURSOR_WHITE }}
      aria-hidden
    >
      <div className="relative h-14 w-14">
        <div
          ref={fillRef}
          className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current opacity-100"
        />
        <div
          ref={ringRef}
          className="absolute inset-0 rounded-full border border-current opacity-0"
        />
        <span
          ref={arrowHRef}
          className="absolute left-1/2 top-1/2 block h-px w-3 origin-left -translate-y-1/2 bg-current opacity-0"
          style={{ transform: "translateY(-50%) scaleX(0)" }}
        />
        <span
          ref={arrowVRef}
          className="absolute left-1/2 top-[calc(50%+2px)] block h-3 w-px origin-top -translate-x-1/2 bg-current opacity-0"
          style={{ transform: "translateX(-50%) scaleY(0)" }}
        />
        <span
          ref={closeLine1Ref}
          className="absolute left-1/2 top-1/2 block h-px w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current opacity-0"
          style={{ transform: "translate(-50%, -50%) rotate(45deg) scaleX(0)" }}
        />
        <span
          ref={closeLine2Ref}
          className="absolute left-1/2 top-1/2 block h-px w-3 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current opacity-0"
          style={{ transform: "translate(-50%, -50%) rotate(-45deg) scaleX(0)" }}
        />
      </div>
      <span
        ref={labelRef}
        className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-0"
      >
        {customText}
      </span>
    </div>
  );
}
