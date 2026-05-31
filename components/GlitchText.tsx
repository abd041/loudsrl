"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type GlitchTextProps = {
  text: string;
  className?: string;
  asLink?: boolean;
  href?: string;
};

export default function GlitchText({
  text,
  className,
  asLink,
  href = "/",
}: GlitchTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        el.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)`;
        el.style.filter = `hue-rotate(${Math.random() * 30}deg)`;
        setTimeout(() => {
          el.style.transform = "translate(0)";
          el.style.filter = "none";
        }, 80);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const content = (
    <div ref={ref} className={cn("relative", className)}>
      <span
        className="absolute inset-0 text-red-500 opacity-60"
        aria-hidden
        style={{ clipPath: "inset(0 0 50% 0)", transform: "translateX(-2px)" }}
      >
        {text}
      </span>
      <span
        className="absolute inset-0 text-blue-500 opacity-60"
        aria-hidden
        style={{ clipPath: "inset(50% 0 0 0)", transform: "translateX(2px)" }}
      >
        {text}
      </span>
      <span className="relative">{text}</span>
    </div>
  );

  if (asLink) {
    return (
      <Link href={href} className="link-hover">
        {content}
      </Link>
    );
  }

  return content;
}
