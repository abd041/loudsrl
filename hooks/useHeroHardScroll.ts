"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HOME_HERO_PREVIEWS } from "@/data/homeHeroPreviews";
import { gsap } from "@/lib/animations";

const SCROLL_THRESHOLD = 200;
const RESET_MS = 1000;
const LOCK_MS = 1000;
const MAX_PREVIEW_INDEX = HOME_HERO_PREVIEWS.length - 2;

export function useHeroHardScroll(
  setHoverMenuIndex: React.Dispatch<React.SetStateAction<number | null>>,
  options?: { playIntro?: boolean }
) {
  const [scrollProgressVisible, setScrollProgressVisible] = useState(false);
  const [gesturesEnabled, setGesturesEnabled] = useState(false);

  const scrollAccumulatorRef = useRef(0);
  const scrollResetTimeoutRef = useRef<number | null>(null);
  const scrollLockedRef = useRef(false);
  const dragModeRef = useRef(false);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const heroGestureTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const introDelayMs = options?.playIntro ? 1500 : 0;
    const timeoutId = window.setTimeout(() => {
      setGesturesEnabled(true);
    }, introDelayMs);

    return () => window.clearTimeout(timeoutId);
  }, [options?.playIntro]);

  useEffect(() => {
    const circle = progressCircleRef.current;
    const container = progressContainerRef.current;

    if (circle) {
      const circumference = 2 * Math.PI * (circle.r.baseVal.value || 23);
      circle.style.strokeDasharray = `${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;
    }

    if (container) {
      gsap.set(container, { y: 10 });
    }
  }, []);

  const updateScrollProgress = useCallback((progress: number) => {
    const circle = progressCircleRef.current;
    const container = progressContainerRef.current;
    if (!circle || !container) return;

    const radius = circle.r.baseVal.value || 23;
    const circumference = 2 * Math.PI * radius;

    gsap.to(circle, {
      strokeDashoffset: circumference * (1 - progress),
      duration: 0.2,
      ease: "power2.out",
    });

    gsap.to(container, {
      y: 10 - 100 * progress,
      duration: 0.2,
      ease: "power2.out",
    });
  }, []);

  const handleHeroScrollIncrement = useCallback(
    (amount: number, isDrag = false) => {
      if (scrollLockedRef.current) return;
      if (typeof window !== "undefined" && window.scrollY > 8) return;

      dragModeRef.current = isDrag;
      setScrollProgressVisible(true);

      scrollAccumulatorRef.current += amount;

      const progress = Math.min(scrollAccumulatorRef.current / SCROLL_THRESHOLD, 1);
      updateScrollProgress(progress);

      if (progress >= 1) {
        scrollAccumulatorRef.current = 0;
        updateScrollProgress(0);

        if (!isDrag) {
          setScrollProgressVisible(false);
        }

        if (scrollResetTimeoutRef.current !== null) {
          window.clearTimeout(scrollResetTimeoutRef.current);
          scrollResetTimeoutRef.current = null;
        }

        scrollLockedRef.current = true;
        setScrollProgressVisible(false);

        setHoverMenuIndex((current) => {
          if (current === null) return 0;
          if (current + 1 <= MAX_PREVIEW_INDEX) return current + 1;
          return null;
        });

        window.setTimeout(() => {
          scrollLockedRef.current = false;
        }, LOCK_MS);

        return;
      }

      if (scrollResetTimeoutRef.current !== null) {
        window.clearTimeout(scrollResetTimeoutRef.current);
      }

      scrollResetTimeoutRef.current = window.setTimeout(() => {
        scrollAccumulatorRef.current = 0;
        updateScrollProgress(0);

        if (!dragModeRef.current) {
          setScrollProgressVisible(false);
        }

        scrollResetTimeoutRef.current = null;
      }, RESET_MS);
    },
    [setHoverMenuIndex, updateScrollProgress]
  );

  useEffect(() => {
    const target = heroGestureTargetRef.current;
    if (!target || !gesturesEnabled) return;

    let pointerActive = false;
    let lastPointerY = 0;

    const onWheel = (event: WheelEvent) => {
      if (window.scrollY > 8) return;
      if (event.deltaY <= 0) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      handleHeroScrollIncrement(2, false);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (window.scrollY > 8) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      const eventTarget = event.target;
      const interactive =
        eventTarget instanceof Element
          ? eventTarget.closest(
              'a, button, input, textarea, select, [role="button"], .cursor-link'
            )
          : null;
      if (interactive) return;

      pointerActive = true;
      lastPointerY = event.clientY;
      target.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pointerActive) return;

      const deltaY = event.clientY - lastPointerY;
      lastPointerY = event.clientY;

      if (deltaY < -2) {
        handleHeroScrollIncrement(6, true);
      }
    };

    const endPointer = (event: PointerEvent) => {
      if (!pointerActive) return;
      pointerActive = false;
      dragModeRef.current = false;

      if (target.hasPointerCapture(event.pointerId)) {
        target.releasePointerCapture(event.pointerId);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    target.addEventListener("pointerdown", onPointerDown);
    target.addEventListener("pointermove", onPointerMove);
    target.addEventListener("pointerup", endPointer);
    target.addEventListener("pointercancel", endPointer);

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      target.removeEventListener("pointerdown", onPointerDown);
      target.removeEventListener("pointermove", onPointerMove);
      target.removeEventListener("pointerup", endPointer);
      target.removeEventListener("pointercancel", endPointer);

      if (scrollResetTimeoutRef.current !== null) {
        window.clearTimeout(scrollResetTimeoutRef.current);
      }
    };
  }, [gesturesEnabled, handleHeroScrollIncrement]);

  useEffect(() => {
    updateScrollProgress(0);
  }, [updateScrollProgress]);

  return {
    scrollProgressVisible,
    progressCircleRef,
    progressContainerRef,
    heroGestureTargetRef,
  };
}
