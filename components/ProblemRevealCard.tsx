"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type ProblemRevealCardProps = {
  code: string;
  text: string;
};

export default function ProblemRevealCard({
  code,
  text,
}: ProblemRevealCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "w-full border border-white/10 bg-[#101010] p-6 text-left transition md:p-8",
        open && "border-white/25"
      )}
    >
      <p className="section-label mb-4">{code}</p>
      <p
        className={cn(
          "text-lg leading-relaxed text-white/70 transition-all md:text-xl",
          !open && "line-clamp-2"
        )}
      >
        {text}
      </p>
      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/40">
        {open ? "TAP TO HIDE" : "TAP TO DISCOVER OUR SOLUTION"}
      </p>
    </button>
  );
}
