"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/animations";
import { cn } from "@/lib/cn";

type TextRevealProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
  split?: "words" | "chars";
};

export default function TextReveal({
  children,
  className,
  as: Tag = "h1",
  delay = 0,
  split = "words",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    if (!ref.current) return;

    const parts =
      split === "words" ? children.split(" ") : children.split("");

    ref.current.innerHTML = parts
      .map(
        (part, i) =>
          `<span class="inline-block overflow-hidden"><span class="inline-block reveal-part" style="transform: translateY(110%)">${part}${split === "words" && i < parts.length - 1 ? "&nbsp;" : ""}</span></span>`
      )
      .join(split === "words" ? " " : "");

    gsap.to(ref.current.querySelectorAll(".reveal-part"), {
      y: 0,
      duration: 1,
      stagger: split === "words" ? 0.08 : 0.03,
      delay,
      ease: "power4.out",
    });
  }, [children, delay, split]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={cn(className)}
    />
  );
}
