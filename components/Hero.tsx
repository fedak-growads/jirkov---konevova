"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { property } from "@/data/property";

const statusConfig = {
  available: { label: "Volné", bg: "bg-emerald-500", text: "text-white" },
  reserved: { label: "Rezervováno", bg: "bg-amber-500", text: "text-white" },
  sold: { label: "Prodáno", bg: "bg-gray-500", text: "text-white" },
};

const AUTO_MS = 2000;

type Slide = { src: string; alt: string };

export default function Hero() {
  const status = statusConfig[property.status];
  const formattedPrice = new Intl.NumberFormat("cs-CZ").format(property.price);
  const pricePerM2 = Math.round(
    property.price / parseInt(property.parameters[0].value)
  );
  const formattedPricePerM2 = new Intl.NumberFormat("cs-CZ").format(pricePerM2);
  const area = property.parameters.find((p) => p.label === "Užitná plocha")?.value;

  const slides: Slide[] =
    (property.heroSlides as readonly Slide[] | undefined)?.length
      ? (property.heroSlides as readonly Slide[]).map((s) => ({ ...s }))
      : [{ src: property.heroImage, alt: `${property.descriptionTitle} – ${property.street}` }];
  const stats = (property.heroStats as readonly { icon: string; label: string }[] | undefined) ?? [];
  const multi = slides.length > 1 && property.status !== "sold";

  const [idx, setIdx] = useState(0);
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);

  const go = (n: number) => setIdx((n + slides.length) % slides.length);

  useEffect(() => {
    if (!multi) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % slides.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [idx, multi, slides.length]);

  function onTouchStart(e: React.TouchEvent) {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = e.changedTouches[0].clientY - (touchY.current ?? 0);
    if (multi && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      go(idx + (dx < 0 ? 1 : -1));
    }
    touchX.current = null;
    touchY.current = null;
  }

  return (
    <section
      className="relative min-h-[calc(100svh-44px)] flex flex-col justify-end overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => (
          <div
            key={s.src}
            aria-hidden={i !== idx}
            className={`absolute inset-0 transition-opacity duration-[600ms] ease-out ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 hero-kb">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        ))}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15"
        />
      </div>

      {/* Stories-style progress bars */}
      {multi && (
        <div className="absolute top-3 inset-x-3 md:inset-x-6 z-30 flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.src}
              onClick={() => go(i)}
              aria-label={`Fotka ${i + 1}`}
              className="group flex-1 h-2 py-[5px] -my-[5px] flex items-center"
              style={{ touchAction: "manipulation" }}
            >
              <span className="relative block w-full h-1 rounded-full bg-white/30 overflow-hidden">
                {i < idx && <span className="absolute inset-0 bg-white" />}
                {i === idx && (
                  <span
                    key={idx}
                    className="hero-progress-fill absolute inset-y-0 left-0 bg-white"
                    style={{ animationDuration: `${AUTO_MS}ms` }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Desktop arrows */}
      {multi && (
        <>
          <button
            onClick={() => go(idx - 1)}
            aria-label="Předchozí fotka"
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 text-white transition-colors"
          >
            ‹
          </button>
          <button
            onClick={() => go(idx + 1)}
            aria-label="Další fotka"
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 text-white transition-colors"
          >
            ›
          </button>
        </>
      )}

      {/* Sold banner — diagonal across the hero */}
      {property.status === "sold" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="w-[150%] -rotate-[10deg] bg-zinc-900/85 backdrop-blur-sm border-y-2 border-white/20 py-3 md:py-5 text-center shadow-2xl">
            <span className="font-display text-4xl md:text-6xl tracking-[0.25em] text-white uppercase">
              Prodáno
            </span>
          </div>
        </div>
      )}

      {/* Top row: agent chip + status + award */}
      <div
        className={`absolute inset-x-4 md:inset-x-8 z-10 flex items-start justify-between gap-3 ${
          multi ? "top-9 md:top-8" : "top-4 md:top-6"
        }`}
      >
        {/* Agent chip */}
        <div className="inline-flex items-center gap-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 pl-1.5 pr-3 py-1.5">
          <Image
            src={property.agent.photo}
            alt={property.agent.name}
            width={28}
            height={28}
            className="rounded-full object-cover border border-white/40"
          />
          <div className="leading-tight">
            <div className="text-[11px] font-medium text-white">{property.agent.name}</div>
            <div className="text-[10px] text-white/70">Realitní makléřka</div>
          </div>
        </div>

        {/* Status + Award badges */}
        <div className="flex flex-col items-end gap-1.5">
          <span className={`inline-flex items-center gap-1.5 rounded-full ${status.bg} ${status.text} px-2.5 py-1 text-[11px] font-medium shadow-lg`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {status.label}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[11px] font-medium text-white">
            <span className="text-teal-mid">★</span>
            Realiťák roku 2025
          </span>
        </div>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 px-6 pb-10 md:pb-14 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-teal text-white px-6 py-3 text-base md:text-xl font-semibold uppercase tracking-[0.14em] mb-4 shadow-xl shadow-teal/30">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6"
            >
              <path
                d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="7" cy="7" r="1.4" fill="currentColor" />
            </svg>
            Na prodej
          </div>

          <h1 className="font-display text-white text-[2rem] leading-[1.05] md:text-[3.25rem] md:leading-[1.05] mb-3 whitespace-pre-line">
            {property.heroTitle}
          </h1>

          <p className="text-white/85 text-sm md:text-base mb-4">
            {property.heroSubtitle}
          </p>

          {/* Stat chips */}
          {stats.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {stats.map((s, i) => (
                <span
                  key={s.label}
                  className="hero-chip-in inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1.5 text-xs md:text-sm font-medium text-white"
                  style={{ animationDelay: `${250 + i * 90}ms` }}
                >
                  <span aria-hidden>{s.icon}</span>
                  {s.label}
                </span>
              ))}
            </div>
          )}

          {/* Price row */}
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/60 mb-1">
            Prodejní cena
          </p>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-5">
            <span className="font-display text-3xl md:text-[2.25rem] text-white">
              {formattedPrice} Kč
            </span>
            <span className="text-sm text-white/75">
              {formattedPricePerM2} Kč/m²{area ? ` · ${area}` : ""}
            </span>
          </div>

          {property.monthlyFees?.enabled && property.monthlyFees.amount > 0 && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-xs text-white mb-5">
              <span className="text-teal-mid" aria-hidden>●</span>
              Fond oprav{" "}
              {new Intl.NumberFormat("cs-CZ").format(property.monthlyFees.amount)} Kč/měs
            </div>
          )}

          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-teal hover:bg-teal-dark text-white font-medium px-7 py-4 rounded-xl transition-all duration-150 hover:scale-[1.02] shadow-lg shadow-teal/30"
          >
            {property.heroCta}
            <span aria-hidden>→</span>
          </a>

          <p className="text-white/65 text-sm mt-3">
            Marie vám zavolá obvykle do 30 minut. Bez závazku — prohlídku domluvíme, jen pokud budete chtít.
          </p>
        </div>
      </div>
    </section>
  );
}
