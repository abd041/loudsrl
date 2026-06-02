"use client";

import { useEffect } from "react";
import { reportMessage } from "@/lib/observability/reportError";

export default function WebVitalsReporter() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_REPORT_WEB_VITALS !== "true") return;

    void import("web-vitals").then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
      const send = (name: string, value: number) => {
        reportMessage(`web-vital:${name}`, "info", {
          value: Math.round(value),
          path: window.location.pathname,
        });
      };

      onCLS((m) => send("CLS", m.value));
      onINP((m) => send("INP", m.value));
      onLCP((m) => send("LCP", m.value));
      onFCP((m) => send("FCP", m.value));
      onTTFB((m) => send("TTFB", m.value));
    });
  }, []);

  return null;
}
