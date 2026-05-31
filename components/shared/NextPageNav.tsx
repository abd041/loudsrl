"use client";

import Link from "next/link";
import { useRef } from "react";
import AnimatedCircleArrow from "@/components/shared/AnimatedCircleArrow";
import { cn } from "@/lib/cn";

type NextPageNavProps = {
  eyebrow?: string;
  label?: string;
  href: string;
  title: string;
  className?: string;
};

export default function NextPageNav({
  eyebrow,
  label,
  href,
  title,
  className,
}: NextPageNavProps) {
  const ctaLabel = eyebrow ?? label ?? "Next";
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <section
      className={cn(
        "relative z-20 bg-black px-4 pb-16 text-white lg:px-10 lg:pb-28",
        className
      )}
    >
      <div className="flex justify-center">
        <Link
          ref={linkRef}
          href={href}
          onClick={() => window.scrollTo(0, 0)}
          className="group flex cursor-link cursor-none cursor-force-white flex-col items-center justify-center gap-3 font-light sm:flex-row sm:items-center sm:gap-6 sm:text-lg"
        >
          <span className="w-auto text-center sm:w-[200px] sm:text-right">
            {ctaLabel}
          </span>
          <AnimatedCircleArrow triggerRef={linkRef} />
          <span className="w-auto text-center sm:w-[200px] sm:text-left">
            {title}
          </span>
        </Link>
      </div>
    </section>
  );
}
