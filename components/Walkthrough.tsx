"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { property } from "@/data/property";

type Step = { src: string; step: string; title: string; body: string };

export default function Walkthrough() {
  const w = property.walkthrough as
    | { enabled: boolean; eyebrow: string; title: string; steps: Step[] }
    | undefined;
  const steps = w?.steps ?? [];
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!steps.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [steps.length]);

  if (!w?.enabled || !steps.length) return null;

  return (
    <section className="relative bg-black">
      {/* Pinned visual */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {steps.map((s, i) => (
          <div
            key={s.src}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`absolute inset-0 ${i === active ? "hero-kb" : ""}`}>
              <Image
                src={s.src}
                alt={s.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </div>
        ))}

        {/* Gradient for legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40"
        />

        {/* Section eyebrow + title */}
        <div className="absolute top-16 md:top-20 inset-x-0 px-6 text-center pointer-events-none">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 mb-1">
            {w.eyebrow}
          </p>
          <p className="font-display text-lg md:text-2xl text-white/90">{w.title}</p>
        </div>

        {/* Progress dots (journey) */}
        <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {steps.map((s, i) => (
            <span
              key={s.src}
              className={`w-1.5 rounded-full transition-all duration-300 ${
                i === active ? "h-6 bg-white" : "h-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll-driven step captions (overlaid on the pinned visual) */}
      <div className="relative -mt-[100svh]">
        {steps.map((s, i) => (
          <div
            key={s.src}
            data-idx={i}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className="min-h-[85svh] flex items-end px-6 md:px-12 pb-24 md:pb-28"
          >
            <div
              className={`max-w-lg transition-all duration-500 ease-out ${
                i === active
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-50 translate-y-3 scale-[0.98]"
              }`}
            >
              <div className="rounded-2xl bg-black/45 backdrop-blur-md border border-white/15 shadow-2xl p-5 md:p-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-display text-5xl md:text-6xl text-white leading-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base font-semibold uppercase tracking-[0.16em] text-teal-mid">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-display text-[1.75rem] md:text-5xl text-white mb-3 leading-[1.1]">
                  {s.title}
                </h3>
                <p className="text-white/90 leading-relaxed text-lg md:text-xl">
                  {s.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
