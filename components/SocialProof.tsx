import { property } from "@/data/property";
import Reveal from "./Reveal";

function Star() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.444a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.443a1 1 0 00-1.176 0l-3.366 2.443c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  );
}

export default function SocialProof() {
  if (property.testimonials.length === 0) return null;

  return (
    <section className="py-14 md:py-20 px-6 md:px-12 bg-bg-soft border-y border-border">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal text-center mb-3">
            Reálné recenze klientů Marie
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-text text-center mb-10 md:mb-12">
            Co o spolupráci říkají klienti
          </h2>
        </Reveal>

        <div
          className={`grid gap-5 ${
            property.testimonials.length >= 3
              ? "md:grid-cols-3"
              : property.testimonials.length === 2
              ? "md:grid-cols-2"
              : "max-w-xl mx-auto"
          }`}
        >
          {property.testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 120}>
              <figure className="relative h-full rounded-2xl bg-white border border-border p-7 shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
                <span
                  aria-hidden
                  className="absolute -top-6 -right-3 font-display text-[9rem] leading-none text-teal-light pointer-events-none select-none"
                >
                  &ldquo;
                </span>

                <div className="relative flex items-center gap-0.5 mb-4 text-amber-400">
                  <Star /><Star /><Star /><Star /><Star />
                </div>

                <blockquote className="relative text-[15px] text-text leading-relaxed mb-6">
                  {t.quote}
                </blockquote>

                <figcaption className="relative flex items-center gap-3 pt-5 border-t border-border/70">
                  <div
                    aria-hidden
                    className="shrink-0 w-10 h-10 rounded-full bg-teal-light text-teal-dark flex items-center justify-center font-display text-base font-medium"
                  >
                    {t.author.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-text truncate">{t.author}</div>
                    <div className="text-[11px] uppercase tracking-wider text-text-muted mt-0.5 truncate">
                      {t.context}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
