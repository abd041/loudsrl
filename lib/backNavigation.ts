const BACK_TOAST_KEY = "loud-pending-back-toast";

export function markPendingBackToast() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BACK_TOAST_KEY, "1");
}

export function consumePendingBackToast() {
  if (typeof window === "undefined") return false;
  const pending = sessionStorage.getItem(BACK_TOAST_KEY) === "1";
  if (pending) {
    sessionStorage.removeItem(BACK_TOAST_KEY);
  }
  return pending;
}
