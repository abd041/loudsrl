"use client";

import { useRef, useState } from "react";
import { studioHero } from "@/data/studio";
import { cn } from "@/lib/cn";

function PlayButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Play video"
      className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-link cursor-none cursor-force-white items-center justify-center rounded-full border border-white/90 bg-transparent transition-transform duration-300 hover:scale-105"
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    setIsPlaying(true);
    try {
      await video.play();
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative z-20 bg-white px-4 pt-24 text-black md:pt-36 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl">
          <h1 className="break-words font-mono text-4xl font-light lg:text-6xl">
            {studioHero.title}
          </h1>

          <div className="mb-16 mt-10 max-w-96 tracking-[0.03rem] leading-[120%] sm:leading-[140%]">
            <p>{studioHero.body}</p>
          </div>

          <div className="relative aspect-square w-full overflow-hidden bg-black">
            <video
              ref={videoRef}
              className={cn(
                "h-full w-full object-cover transition-opacity duration-500",
                isPlaying ? "opacity-100" : "opacity-0"
              )}
              loop
              muted
              playsInline
              controls={false}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={studioHero.videoSrc} type="video/mp4" />
            </video>

            {!isPlaying ? (
              <>
                <PlayButton onClick={handlePlay} />
                <p className="pointer-events-none absolute bottom-8 left-8 z-10 text-3xl leading-tight tracking-[0.03rem] text-white md:text-4xl">
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
