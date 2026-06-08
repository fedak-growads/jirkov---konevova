"use client";

import { useEffect } from "react";
import { property } from "@/data/property";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    __propertyScrollFired?: boolean;
  }
}

export default function PixelTracker() {
  useEffect(() => {
    const onScroll = () => {
      if (window.__propertyScrollFired) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total > 0.5) {
        window.__propertyScrollFired = true;
        if (window.fbq) {
          window.fbq("track", "ViewContent", {
            content_name: `property:${property.slug}:scroll_50`,
            content_category: "property_engagement",
          });
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
