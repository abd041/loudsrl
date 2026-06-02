"use client";

import { useRef, useState } from "react";
import { contactSteps } from "@/data/contact";
import { studioHero } from "@/data/studio";
import { cn } from "@/lib/cn";

const MONO_HEADLINE =
  "!font-mono font-light text-4xl [word-spacing:-5px] lg:text-6xl lg:[word-spacing:-10px]";

export default function ContactStepsSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlay, setShowPlay] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  const play = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setShowPlay(false);
    } catch {
      setShowPlay(true);
    }
  };

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pb-24 pt-10 sm:flex-row md:pt-24">
      <div className="w-full shrink-0 sm:w-1/2">
        <div className="relative h-auto w-full cursor-force-white overflow-hidden">
          <video
            ref={videoRef}
            playsInline
            muted
            loop
            preload="metadata"
            className={cn(
              "h-auto w-full",
              !videoReady && "opacity-0"
            )}
            onLoadedData={() => setVideoReady(true)}
            onPause={() => setShowPlay(true)}
            onEnded={() => setShowPlay(true)}
          >
            <source src={studioHero.videoSrc} type="video/mp4" />
          </video>
          {showPlay ? (
            <button
              type="button"
              aria-label="Play video"
              onClick={play}
              className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/45 transition-opacity hover:bg-black/55"
            >
              <span className="rounded-full border border-white p-3">
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="#fff"
                  aria-hidden
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </span>
            </button>
          ) : null}
        </div>
      </div>

      <div className="w-full sm:flex-1">
        <p className={cn(MONO_HEADLINE, "text-[#4E71FF]")}>What&apos;s next.</p>
        <p className={cn(MONO_HEADLINE, "text-black")}>
          Fourth base on a first date?
        </p>
        <ol className="list-number">
          {contactSteps.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong>
              <br />
              {step.text}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
