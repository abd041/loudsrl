"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/animations";

type StudioMarqueeProps = {
  text: string;
};

const itemClassName =
  "studio-marquee-item flex shrink-0 whitespace-nowrap pr-[1.5em] font-mono text-[clamp(3rem,10vw,8rem)] font-light leading-none tracking-tight will-change-transform transform-gpu";

/** Live studio marquee moves ~100px/s (measured on loudsrl.com/studio). */
const PIXELS_PER_SECOND = 100;

export default function StudioMarquee({ text }: StudioMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useLayoutEffect(() => {
    registerGsap();
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    tweenRef.current?.kill();
    gsap.set(track, { x: 0 });

    const items = track.querySelectorAll<HTMLElement>(".studio-marquee-item");
    if (items.length < 2 || reduced) return;

    const width = items[0].offsetWidth;
    if (width <= 0) return;

    tweenRef.current = gsap.to(track, {
      x: -width,
      duration: width / PIXELS_PER_SECOND,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [text]);

  return (
    <section className="relative z-20 overflow-hidden bg-black/5 py-10 text-black">
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap font-mono will-change-transform"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className={itemClassName}>
            {words.map((word, index) => (
              <span key={`${copy}-${word}-${index}`} style={{ paddingRight: "0.4em" }}>
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
