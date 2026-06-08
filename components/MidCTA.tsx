"use client";

import { property } from "@/data/property";
import { gaEvent } from "@/lib/ga";
import Reveal from "./Reveal";

export default function MidCTA() {
  return (
    <section className="relative py-16 md:py-20 px-6 md:px-12 bg-teal-dark text-white overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal-mid mb-3">
            Další krok
          </p>

          <h2 className="font-display text-3xl md:text-[2.25rem] lg:text-[2.5rem] text-white leading-[1.1] mb-4">
            Sedí vám to? Pojďte si byt prohlédnout
          </h2>

          <p className="text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Marie vám obvykle do 30 minut zavolá a domluvíme termín,
            který vám vyhovuje.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={property.agent.phoneLink}
              onClick={() => gaEvent("phone_click", { source: "mid_cta", property_slug: property.slug })}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-medium px-6 py-3.5 rounded-xl transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="tabular-nums">{property.agent.phone}</span>
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/95 text-teal-dark font-medium px-7 py-3.5 rounded-xl transition-all duration-150 hover:scale-[1.02] shadow-lg"
            >
              Zjistit více informací
              <span aria-hidden>→</span>
            </a>
          </div>

          <p className="text-white/65 text-sm mt-5">
            Reakce do 30 minut · Konzultace zdarma
          </p>
        </Reveal>
      </div>
    </section>
  );
}
