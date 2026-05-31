"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode, useRef } from "react";
import { gsap } from "@/lib/animations";
import { cn } from "@/lib/cn";

type ClickRippleLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function ClickRippleLink({
  href,
  className,
  children,
}: ClickRippleLinkProps) {
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const link = linkRef.current;
    if (!link) return;

    const rect = link.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ripple = document.createElement("span");

    ripple.style.position = "absolute";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = "0";
    ripple.style.height = "0";
    ripple.style.borderRadius = "50%";
    ripple.style.transform = "translate(-50%, -50%)";
    ripple.style.background = "white";
    ripple.style.mixBlendMode = "difference";
    ripple.style.pointerEvents = "none";

    link.style.position = "relative";
    link.style.overflow = "hidden";
    link.appendChild(ripple);

    const size = Math.max(rect.width, rect.height) * 2.5;

    gsap.to(ripple, {
      width: size,
      height: size,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        router.push(href);
        ripple.remove();
      },
    });
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={handleClick}
      className={cn("cursor-link cursor-none", className)}
    >
      {children}
    </Link>
  );
}
