"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { pathUsesLiquidHero } from "@/lib/routeNav";
import { cn } from "@/lib/cn";
import { useAppStore } from "@/store/appStore";

const MIN_LOAD_MS = 500;

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { liquidBackground, setIsReady } = useAppStore();
  const { isReady } = liquidBackground;

  const [liquidMounted, setLiquidMounted] = useState(false);
  const [showLoading, setShowLoading] = useState(() =>
    pathUsesLiquidHero(pathname)
  );
  const loadStartRef = useRef<number | null>(Date.now());
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const schedule =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(() => setLiquidMounted(true))
        : setTimeout(() => setLiquidMounted(true), 1);

    return () => {
      if (typeof cancelIdleCallback !== "undefined" && typeof schedule === "number") {
        cancelIdleCallback(schedule);
      } else {
        clearTimeout(schedule as ReturnType<typeof setTimeout>);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (pathUsesLiquidHero(pathname)) {
      setIsReady(false);
    } else {
      setIsReady(true);
    }
  }, [pathname, setIsReady]);

  const needsLiquid = pathUsesLiquidHero(pathname);
  const loading = needsLiquid && (!isReady || !liquidMounted);

  useEffect(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    if (loading) {
      loadStartRef.current = Date.now();
      setShowLoading(true);
      return;
    }

    const elapsed = Date.now() - (loadStartRef.current ?? Date.now());
    hideTimerRef.current = setTimeout(() => {
      setShowLoading(false);
    }, Math.max(0, MIN_LOAD_MS - elapsed));

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [loading]);

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden",
        showLoading ? "bg-black" : ""
      )}
    >
      <div
        className={cn(
          "relative z-10",
          showLoading && "pointer-events-none opacity-0",
          !showLoading && "opacity-100"
        )}
        aria-hidden={showLoading}
      >
        {children}
      </div>

      <div
        className={cn(
          "absolute inset-0 z-10 flex w-screen items-center justify-center bg-black",
          showLoading
            ? "pointer-events-auto opacity-100 delay-500"
            : "pointer-events-none opacity-0"
        )}
        aria-hidden={!showLoading}
      >
        <div className="blobs">
          <div className="blob bounce-left" />
          <div className="blob bounce-right" />
        </div>
      </div>
    </div>
  );
}
