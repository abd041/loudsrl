"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { getLiquidIndexForPath } from "@/lib/routeNav";
import { useAppStore } from "@/store/appStore";

const LoudOriginalHero = dynamic(() => import("@/components/LoudOriginalHero"), {
  ssr: false,
});

/**
 * Live: fixed full-viewport liquid canvas as an early body child (before page content).
 * Home uses its own in-page hero canvas — skip duplicate there.
 */
export default function FooterLiquidBackdrop() {
  const pathname = usePathname();
  const { liquidBackground } = useAppStore();
  const index = liquidBackground.index || getLiquidIndexForPath(pathname);

  if (pathname === "/") return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <LoudOriginalHero
        activeIndex={index}
        preventZoomAnimation
        className="!absolute inset-0"
      />
    </div>
  );
}
