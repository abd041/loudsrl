"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/animations";

type AnimatedCircleArrowProps = {
  triggerRef?: React.RefObject<HTMLElement | null>;
  size?: number;
  strokeClass?: string;
  /** When true, plays the draw-in animation (e.g. on industry hover row mount). */
  animate?: boolean;
};

function prepareStroke(el: SVGGeometryElement) {
  const length = el.getTotalLength();
  el.style.strokeDasharray = `${length}`;
  el.style.strokeDashoffset = `${length}`;
  return length;
}

export default function AnimatedCircleArrow({
  triggerRef,
  size = 32,
  strokeClass = "stroke-white",
  animate = false,
}: AnimatedCircleArrowProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const shaftRef = useRef<SVGPathElement>(null);
  const headUpRef = useRef<SVGPathElement>(null);
  const headDownRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    registerGsap();

    const trigger = triggerRef?.current;
    const circle = circleRef.current;
    const shaft = shaftRef.current;
    const headUp = headUpRef.current;
    const headDown = headDownRef.current;

    if (!circle || !shaft || !headUp || !headDown) return;

    prepareStroke(circle);
    prepareStroke(shaft);
    prepareStroke(headUp);
    prepareStroke(headDown);

    const showAll = () => {
      circle.style.strokeDashoffset = "0";
      shaft.style.strokeDashoffset = "0";
      headUp.style.strokeDashoffset = "0";
      headDown.style.strokeDashoffset = "0";
    };

    const animateIn = () => {
      circle.style.strokeDashoffset = `${circle.getTotalLength()}`;
      shaft.style.strokeDashoffset = `${shaft.getTotalLength()}`;
      headUp.style.strokeDashoffset = `${headUp.getTotalLength()}`;
      headDown.style.strokeDashoffset = `${headDown.getTotalLength()}`;

      const tl = gsap.timeline();
      tl.to(circle, {
        strokeDashoffset: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      tl.to(
        shaft,
        { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
      tl.to(
        [headUp, headDown],
        { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" },
        "-=0.6"
      );
    };

    if (animate) {
      animateIn();
    } else {
      showAll();
    }

    if (!trigger) return;

    trigger.addEventListener("mouseenter", animateIn);
    return () => trigger.removeEventListener("mouseenter", animateIn);
  }, [triggerRef, animate]);

  return (
    <svg
      viewBox="0 0 50 50"
      width={size}
      height={size}
      className={`shrink-0 fill-none ${strokeClass}`}
      aria-hidden
    >
      <circle ref={circleRef} cx={25} cy={25} r={24} strokeWidth={1} />
      <g transform="translate(7, 10)">
        <path ref={shaftRef} d="M 9 15 L 27.45 15" strokeWidth={1} />
        <path ref={headUpRef} d="M 27 15 L 21 9" strokeWidth={1} />
        <path ref={headDownRef} d="M 27 15 L 21 21" strokeWidth={1} />
      </g>
    </svg>
  );
}
