/**
 * Tiny GA4 client helper.
 * Safe to call before `window.gtag` is loaded (no-op until ready).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function gaEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params || {});
}
