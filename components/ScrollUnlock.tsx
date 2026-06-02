"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Safety net: ensure no route leaves the document scroll-locked (common on iOS)
 * if an overlay/menu unmounts during navigation.
 */
export default function ScrollUnlock() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    // Only touch styles we might have set for scroll locking.
    body.style.overflow = "";
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    body.style.touchAction = "";
    html.style.overflow = "";
  }, [pathname]);

  return null;
}

