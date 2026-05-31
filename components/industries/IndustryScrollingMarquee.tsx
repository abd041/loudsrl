"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/animations";

type IndustryScrollingMarqueeProps = {
  text: string;
};

export default function IndustryScrollingMarquee({
  text,
}: IndustryScrollingMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const track = trackRef.current;
    if (!track) return;

    const items = track.querySelectorAll<HTMLElement>(".industry-marquee-item");
    if (items.length < 2) return;

    const width = items[0].offsetWidth;
    const tween = gsap.fromTo(
      items,
      { x: "25vw" },
      {
        x: `-=${width}`,
        duration: width / 100,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % width}px`,
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [text]);

  const words = text.split(" ");

  return (
    <section className="overflow-hidden bg-black py-10 text-white">
      <div
        ref={trackRef}
        className="flex whitespace-nowrap font-mono text-[clamp(2.5rem,7vw,6.5rem)] font-light leading-[1.2] will-change-transform"
      >
        {[0, 1, 2].map((copy) => (
          <div
            key={copy}
            className="industry-marquee-item flex shrink-0"
            style={{ paddingRight: "1.5em" }}
          >
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
