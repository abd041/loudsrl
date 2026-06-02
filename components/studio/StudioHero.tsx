"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { studioHero } from "@/data/studio";
import { gsap, registerGsap } from "@/lib/animations";
import { cn } from "@/lib/cn";

function PlayButton({
  onClick,
  buttonRef,
}: {
  onClick: () => void;
  buttonRef: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label="Play video"
      className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-link cursor-none cursor-force-white items-center justify-center rounded-full border border-white/90 bg-transparent transition-transform duration-300 ease-out hover:scale-105"
    >
      <svg
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden
        className="ml-0.5"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
}

export default function StudioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const [, setIsPlaying] = useState(false);
  const [showChrome, setShowChrome] = useState(true);

  useLayoutEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      gsap.set(section, { opacity: 1 });
      return;
    }

    gsap.fromTo(
      section,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power2.out" }
    );
  }, []);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const hideChrome = () => {
      setShowChrome(false);
    };

    const targets = [overlayRef.current, playRef.current, captionRef.current].filter(
      Boolean
    ) as HTMLElement[];

    if (!reduced && targets.length > 0) {
      await gsap.to(targets, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }

    hideChrome();

    try {
      await video.play();
    } catch {
      setShowChrome(true);
      setIsPlaying(false);
      if (targets.length > 0) {
        gsap.set(targets, { opacity: 1 });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-white pt-24 text-black opacity-100 md:pt-36"
    >
      <div className="mx-auto max-w-6xl px-4 pb-20 md:pb-28">
        <div className="mx-auto max-w-2xl">
          <h1 className="break-words font-mono text-4xl font-light leading-[1.05] tracking-[-0.02em] lg:text-6xl">
            {studioHero.title}
          </h1>

          <div className="mb-12 mt-8 max-w-96 text-[0.9375rem] tracking-[0.03rem] leading-[120%] sm:mb-16 sm:mt-10 sm:text-base sm:leading-[140%]">
            <p>{studioHero.body}</p>
          </div>

          <div className="relative w-full cursor-force-white overflow-hidden bg-black">
            <div
              ref={overlayRef}
              className={cn(
                "pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/55 via-black/20 to-transparent transition-opacity duration-500",
                !showChrome && "opacity-0"
              )}
              aria-hidden
            />

            <div className="transition-opacity duration-700 ease-out">
              <video
                ref={videoRef}
                className="h-auto w-full object-contain"
                loop
                muted
                playsInline
                preload="metadata"
                controls={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => {
                  setIsPlaying(false);
                  setShowChrome(true);
                  const targets = [
                    overlayRef.current,
                    playRef.current,
                    captionRef.current,
                  ].filter(Boolean) as HTMLElement[];
                  if (targets.length) gsap.set(targets, { opacity: 1 });
                }}
              >
                <source src={studioHero.videoSrc} type="video/mp4" />
              </video>
            </div>

            {showChrome ? (
              <>
                <PlayButton onClick={handlePlay} buttonRef={playRef} />
                <p
                  ref={captionRef}
                  className="pointer-events-none absolute bottom-5 left-4 z-10 font-light leading-tight tracking-[0.03rem] text-white max-[390px]:text-[1.625rem] sm:bottom-8 sm:left-8 sm:text-3xl md:text-4xl"
                >
                  What is
                  <br />
                  LOUD Studio?
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
