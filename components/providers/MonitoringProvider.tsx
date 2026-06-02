"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WebVitalsReporter from "./WebVitalsReporter";

type MonitoringProviderProps = {
  children: React.ReactNode;
};

/**
 * Optional Vercel Analytics + Speed Insights + Web Vitals (env-gated).
 */
export default function MonitoringProvider({
  children,
}: MonitoringProviderProps) {
  const analyticsEnabled = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS !== "false";
  const speedInsightsEnabled =
    process.env.NEXT_PUBLIC_VERCEL_SPEED_INSIGHTS !== "false";

  return (
    <>
      {children}
      {analyticsEnabled ? <Analytics /> : null}
      {speedInsightsEnabled ? <SpeedInsights /> : null}
      <WebVitalsReporter />
    </>
  );
}
