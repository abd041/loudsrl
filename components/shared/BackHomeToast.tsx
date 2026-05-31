"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { consumePendingBackToast } from "@/lib/backNavigation";

export default function BackHomeToast() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!consumePendingBackToast()) return;
    if (pathname === "/") return;
    setVisible(true);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-auto fixed left-4 top-4 z-[200] max-w-sm transition-opacity duration-300"
      role="status"
      aria-live="polite"
    >
      <div className="cursor-invert rounded-sm border border-black/10 bg-[#101010] px-4 py-3 text-xs text-white shadow-lg">
        <span className="flex flex-col gap-4">
          You&apos;ve returned to the previous breadcrumb. Would you like to go
          back to the homepage?
          <span className="flex items-center justify-end gap-4">
            <button
              type="button"
              className="cursor-pointer hover:opacity-70"
              onClick={() => setVisible(false)}
            >
              Dismiss
            </button>
            <Link
              href="/"
              className="cursor-pointer hover:opacity-70"
              onClick={() => setVisible(false)}
            >
              Go back to homepage
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
}
