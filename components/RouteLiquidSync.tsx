"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  getLiquidIndexForPath,
  isWhiteHeroIndex,
} from "@/lib/routeNav";
import { useAppStore } from "@/store/appStore";

/** Syncs liquid shader index to the current route (non-home pages). */
export default function RouteLiquidSync() {
  const pathname = usePathname();
  const { setIndex, setIsWhite } = useAppStore();

  useEffect(() => {
    if (pathname === "/") return;

    const liquidIndex = getLiquidIndexForPath(pathname);
    setIndex(liquidIndex);
    setIsWhite(isWhiteHeroIndex(liquidIndex));
  }, [pathname, setIndex, setIsWhite]);


  return null;
}
