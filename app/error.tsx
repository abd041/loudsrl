"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/observability/reportError";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error, { digest: error.digest, surface: "app/error" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#050505] px-6 text-center text-[#f4f2ec]">
      <h1 className="text-2xl font-light">Something went wrong</h1>
      <p className="max-w-md text-sm text-white/60">
        We&apos;ve logged the issue. You can try again or return home.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black"
        >
          Try again
        </button>
        <a
          href="/"
          className="border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black"
        >
          Home
        </a>
      </div>
    </div>
  );
}
