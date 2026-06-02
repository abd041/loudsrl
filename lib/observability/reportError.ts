type ErrorContext = Record<string, string | number | boolean | undefined>;

function serializeError(error: unknown) {
  return {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  };
}

/**
 * Minimal client-side error reporter.
 * Kept intentionally simple so shipping pages don't depend on external services.
 */
export function reportError(error: unknown, context?: ErrorContext): void {
  if (process.env.NODE_ENV !== "production") {
    console.error("[reportError]", {
      ...serializeError(error),
      context,
      url: typeof window !== "undefined" ? window.location.href : undefined,
      ts: new Date().toISOString(),
    });
  }
}

export function reportMessage(
  message: string,
  level: "info" | "warning" | "error" = "info",
  context?: ErrorContext
): void {
  if (process.env.NODE_ENV !== "production" && level !== "info") {
    console.warn(`[${level}]`, message, context);
  }
}

