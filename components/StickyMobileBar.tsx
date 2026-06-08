"use client";

import { useEffect, useState } from "react";
import { property } from "@/data/property";
import { gaEvent } from "@/lib/ga";

export default function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show bar after scrolling past ~40% of one viewport height
      setVisible(window.scrollY > window.innerHeight * 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      className={`md:hidden fixed inset-x-0 bottom-0 z-50 bg-white border-t border-border shadow-[0_-8px_24px_rgba(0,0,0,0.1)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-2 gap-2 p-3">
        <a
          href={property.agent.phoneLink}
          onClick={() => gaEvent("phone_click", { source: "sticky_mobile", property_slug: property.slug })}
          className="inline-flex items-center justify-center gap-1.5 border border-teal text-teal hover:bg-teal-light font-medium text-sm py-3 rounded-lg transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
          Volat
        </a>
        <a
          href="#kontakt"
          className="inline-flex items-center justify-center gap-1.5 bg-teal hover:bg-teal-dark text-white font-medium text-sm py-3 rounded-lg transition-colors"
        >
          Zjistit víc
        </a>
      </div>
    </div>
  );
}
