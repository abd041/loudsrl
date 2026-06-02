type ErrorContext = Record<string, string | number | boolean | undefined>;

function serializeError(error: unknown) {
  return {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  };
}

/**
 * Central error reporter — dev console + optional webhook (no third-party required).
 * For Sentry, integrate @sentry/nextjs and call Sentry.captureException from here.
 */
export function reportError(
  error: unknown,
  context?: ErrorContext
): void {
  const payload = {
    ...serializeError(error),
    context,
    url: typeof window !== "undefined" ? window.location.href : undefined,
    ts: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === "development") {
    console.error("[reportError]", payload);
  }

  const webhook = process.env.NEXT_PUBLIC_ERROR_REPORT_URL;
  if (webhook && typeof window !== "undefined") {
    void fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "error", ...payload }),
      keepalive: true,
    }).catch(() => {});
  }
}

export function reportMessage(
  message: string,
  level: "info" | "warning" | "error" = "info",
  context?: ErrorContext
): void {
  if (process.env.NODE_ENV === "development" && level !== "info") {
    console.warn(`[${level}]`, message, context);
  }

  const webhook = process.env.NEXT_PUBLIC_ERROR_REPORT_URL;
  if (webhook && typeof window !== "undefined" && level !== "info") {
    void fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "message",
        level,
        message,
        context,
        ts: new Date().toISOString(),
      }),
      keepalive: true,
    }).catch(() => {});
  }
}
