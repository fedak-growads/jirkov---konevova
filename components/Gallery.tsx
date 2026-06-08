"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { property } from "@/data/property";
import Reveal from "./Reveal";

export default function Gallery() {
  const categories = property.photoCategories;
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const swipedRef = useRef(false);

  const showPrev = () =>
    setOpenIndex((i) => (i === null ? null : (i - 1 + allPhotos.length) % allPhotos.length));
  const showNext = () =>
    setOpenIndex((i) => (i === null ? null : (i + 1) % allPhotos.length));

  function lbTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    swipedRef.current = false;
  }
  function lbTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - (touchStartY.current ?? 0);
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      swipedRef.current = true;
      if (dx < 0) showNext();
      else showPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  // Flatten all photos for lightbox navigation across full set
  const allPhotos = useMemo(
    () => categories.flatMap((cat) => cat.photos),
    [categories]
  );

  const currentPhotos = categories[activeCategory]?.photos ?? [];

  const openLightbox = (categoryIndex: number, photoInCategory: number) => {
    let absoluteIndex = 0;
    for (let i = 0; i < categoryIndex; i++) {
      absoluteIndex += categories[i].photos.length;
    }
    absoluteIndex += photoInCategory;
    setOpenIndex(absoluteIndex);
  };

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? null : (i + 1) % allPhotos.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + allPhotos.length) % allPhotos.length
        );
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, allPhotos.length]);

  if (allPhotos.length === 0) return null;

  return (
    <section className="py-14 md:py-20 px-6 md:px-12 bg-bg">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal text-center mb-3">
            Fotogalerie
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-text text-center mb-8">
            Prohlédněte si byt
          </h2>

          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((cat, i) => (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setActiveCategory(i)}
                  style={{
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border cursor-pointer transition-colors ${
                    activeCategory === i
                      ? "bg-teal text-white border-teal"
                      : "bg-white text-text-muted border-border hover:border-teal-mid hover:text-text"
                  }`}
                >
                  {cat.label}
                  <span
                    aria-hidden
                    className={`pointer-events-none text-xs tabular-nums ${
                      activeCategory === i ? "text-white/75" : "text-text-light"
                    }`}
                  >
                    {cat.photos.length}
                  </span>
                </button>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={80}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {currentPhotos.map((photo, i) => (
              <button
                key={`${activeCategory}-${i}`}
                type="button"
                onClick={() => openLightbox(activeCategory, i)}
                style={{
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
                className={`relative overflow-hidden rounded-xl bg-bg-soft border border-border hover:border-teal-mid transition-all duration-200 hover:shadow-lg cursor-pointer ${
                  i === 0 && currentPhotos.length > 1
                    ? "col-span-2 row-span-2 aspect-[4/3]"
                    : "aspect-[4/3]"
                }`}
                aria-label={`Otevřít fotografii: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-[1.03] pointer-events-none"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Detail fotografie"
          onClick={(e) => {
            if (e.target === e.currentTarget && !swipedRef.current) setOpenIndex(null);
          }}
          onTouchStart={lbTouchStart}
          onTouchEnd={lbTouchEnd}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out] touch-pan-y"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex items-center gap-2 bg-white/95 hover:bg-white text-text font-medium px-4 py-2.5 rounded-full shadow-xl text-sm"
            aria-label="Zavřít"
          >
            <span aria-hidden>✕</span>
            Zavřít
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) =>
                i === null ? null : (i - 1 + allPhotos.length) % allPhotos.length
              );
            }}
            className="absolute left-4 md:left-8 inline-flex items-center justify-center w-12 h-12 bg-white/15 hover:bg-white/30 text-white rounded-full text-xl"
            aria-label="Předchozí"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) =>
                i === null ? null : (i + 1) % allPhotos.length
              );
            }}
            className="absolute right-4 md:right-8 inline-flex items-center justify-center w-12 h-12 bg-white/15 hover:bg-white/30 text-white rounded-full text-xl"
            aria-label="Další"
          >
            ›
          </button>

          <div className="relative w-full max-w-5xl aspect-[4/3]">
            <Image
              src={allPhotos[openIndex].src}
              alt={allPhotos[openIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/70 text-center">
            <span className="tabular-nums">
              {openIndex + 1} / {allPhotos.length}
            </span>
            <span className="md:hidden block text-[11px] text-white/50 mt-0.5">
              ‹ přejeďte pro další ›
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
