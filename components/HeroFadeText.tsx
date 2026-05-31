"use client";

import { useRef } from "react";
import { gsap } from "@/lib/animations";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { cn } from "@/lib/cn";

type HeroFadeTextProps = {
  text: string;
  className?: string;
};

export default function HeroFadeText({ text, className }: HeroFadeTextProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || !text) return;

    tweenRef.current?.kill();
    el.textContent = text;

    tweenRef.current = gsap.fromTo(
      el,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );

    return () => {
      tweenRef.current?.kill();
    };
  }, [text]);

  if (!text) return null;

  return <p ref={ref} className={cn(className)} />;
}
