"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/observability/reportError";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error, { digest: error.digest, surface: "app/global-error" });
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#050505] px-6 text-center text-[#f4f2ec]">
        <h1 className="text-2xl font-light">Application error</h1>
        <button
          type="button"
          onClick={reset}
          className="border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.2em]"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
