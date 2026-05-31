"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/animations";
import { cn } from "@/lib/cn";

export default function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
