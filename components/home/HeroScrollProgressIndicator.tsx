"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/cn";

const RADIUS = 23;

type HeroScrollProgressIndicatorProps = {
  visible: boolean;
  isWhiteBg: boolean;
  showUpArrow: boolean;
  progressCircleRef: React.RefObject<SVGCircleElement>;
  progressContainerRef: React.RefObject<HTMLDivElement>;
};

function ScrollArrowIcon({ stroke }: { stroke: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className="pointer-events-none h-12 w-12 fill-none"
      aria-hidden
    >
      <g transform="translate(34, 12) scale(0.67) rotate(90)">
        <path
          d="M 9 15 L 27.45 15"
          fill="none"
          stroke={stroke}
          strokeWidth={1}
        />
        <path
          d="M 27 15 L 21 9"
          fill="none"
          stroke={stroke}
          strokeWidth={1}
        />
        <path
          d="M 27 15 L 21 21"
          fill="none"
          stroke={stroke}
          strokeWidth={1}
        />
      </g>
    </svg>
  );
}

export default function HeroScrollProgressIndicator({
  visible,
  isWhiteBg,
  showUpArrow,
  progressCircleRef,
  progressContainerRef,
}: HeroScrollProgressIndicatorProps) {
  const stroke = isWhiteBg ? "#000000" : "#ffffff";

  return (
    <div
      ref={progressContainerRef}
      className={cn(
        "pointer-events-auto absolute left-1/2 h-[50px] w-[50px] -translate-x-1/2 rounded-full backdrop-blur-sm transition-opacity duration-300 will-change-transform",
        visible ? "opacity-100" : "opacity-0"
      )}
      aria-hidden
    >
      <svg width="50" height="50" viewBox="0 0 50 50" className="absolute">
        <circle
          ref={progressCircleRef}
          cx="25"
          cy="25"
          r={RADIUS}
          stroke={stroke}
          strokeWidth={1}
          fill="none"
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
      </svg>

      <div className="flex h-full w-full items-center justify-center text-xl text-white">
        <div className="transition-all duration-300 ease-out">
          {showUpArrow ? (
            <ScrollArrowIcon stroke={stroke} />
          ) : (
            <X
              className={isWhiteBg ? "text-black" : "text-white"}
              size={16}
              strokeWidth={1}
            />
          )}
        </div>
      </div>
    </div>
  );
}
