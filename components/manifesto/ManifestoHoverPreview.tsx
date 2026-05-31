"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { ManifestoPrinciple } from "@/data/manifesto";
import { gsap } from "@/lib/animations";
import { mediaSrc } from "@/lib/media";
import { cn } from "@/lib/cn";

type ManifestoHoverPreviewProps = {
  principle: ManifestoPrinciple | null;
};

const POSITIONS = [
  "left-[2%] top-[6%] w-[340px] rotate-[-6deg]",
  "right-[2%] top-[12%] w-[380px] rotate-[5deg]",
  "left-1/2 bottom-[0%] w-[360px] -translate-x-1/2 rotate-[2deg]",
] as const;

const ENTER_FROM = {
  autoAlpha: 0,
  scale: 0.92,
  y: 20,
  clipPath: "inset(100% 0% 0% 0%)",
};

const ENTER_TO = {
  autoAlpha: 1,
  scale: 1,
  y: 0,
  clipPath: "inset(0% 0% 0% 0%)",
  duration: 0.65,
  stagger: 0.08,
  ease: "expo.out",
};

const EXIT_TO = {
  autoAlpha: 0,
  scale: 0.92,
  y: 20,
  clipPath: "inset(100% 0% 0% 0%)",
  duration: 0.35,
  stagger: 0.04,
  ease: "power2.in",
};

function getImageElements(
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>
) {
  return refs.current.filter(Boolean) as HTMLDivElement[];
}

export default function ManifestoHoverPreview({
  principle,
}: ManifestoHoverPreviewProps) {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeTitleRef = useRef<string | null>(null);
  const exitTweenRef = useRef<gsap.core.Tween | null>(null);
  const [displayPrinciple, setDisplayPrinciple] =
    useState<ManifestoPrinciple | null>(null);

  const previewKey =
    principle && principle.images.length > 0 ? principle.title : null;

  useLayoutEffect(() => {
    const nextPrinciple =
      principle && principle.images.length > 0 ? principle : null;
    const nextTitle = nextPrinciple?.title ?? null;
    const currentTitle = activeTitleRef.current;

    if (nextTitle === currentTitle) return;

    exitTweenRef.current?.kill();
    gsap.killTweensOf(getImageElements(imageRefs));

    const animateIn = () => {
      const els = getImageElements(imageRefs);
      if (!els.length) return;
      gsap.fromTo(els, ENTER_FROM, ENTER_TO);
    };

    if (nextPrinciple) {
      activeTitleRef.current = nextPrinciple.title;
      imageRefs.current = [];
      setDisplayPrinciple(nextPrinciple);

      requestAnimationFrame(() => {
        requestAnimationFrame(animateIn);
      });
      return;
    }

    const els = getImageElements(imageRefs);
    if (!els.length) {
      activeTitleRef.current = null;
      setDisplayPrinciple(null);
      return;
    }

    exitTweenRef.current = gsap.to(els, {
      ...EXIT_TO,
      onComplete: () => {
        activeTitleRef.current = null;
        setDisplayPrinciple(null);
        imageRefs.current = [];
      },
    });

    return () => {
      exitTweenRef.current?.kill();
    };
  }, [previewKey, principle]);

  if (!displayPrinciple) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
      {displayPrinciple.images.map((src, index) => (
        <div
          key={`${displayPrinciple.title}-${src}`}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
          className={cn(
            "absolute overflow-hidden bg-neutral-200 shadow-xl opacity-0",
            POSITIONS[index]
          )}
        >
          <Image
            src={mediaSrc(src)}
            alt=""
            width={720}
            height={500}
            className="h-auto w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
