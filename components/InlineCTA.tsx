"use client";

import { property } from "@/data/property";
import { gaEvent } from "@/lib/ga";
import Reveal from "./Reveal";

export default function InlineCTA() {
  return (
    <section className="px-6 md:px-12 py-8 md:py-10 bg-teal-light/40 border-y border-teal-mid/25">
      <Reveal>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-center sm:text-left">
          <div className="min-w-0">
            <p className="font-display text-xl md:text-2xl text-text leading-tight">
              Líbí se vám byt?
            </p>
            <p className="text-sm text-text-muted mt-1">
              Marie vám pošle víc informací — a když budete chtít, domluvíme prohlídku.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 justify-center">
            <a
              href={property.agent.phoneLink}
              onClick={() =>
                gaEvent("phone_click", { source: "inline_cta", property_slug: property.slug })
              }
              className="inline-flex items-center justify-center gap-2 border border-teal text-teal hover:bg-white font-medium text-sm px-5 py-3 rounded-xl transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              <span className="tabular-nums">{property.agent.phone}</span>
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 bg-teal hover:bg-teal-dark text-white font-medium text-sm px-5 py-3 rounded-xl transition-all duration-150 hover:scale-[1.02] shadow-md shadow-teal/20"
            >
              Zjistit více informací
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
