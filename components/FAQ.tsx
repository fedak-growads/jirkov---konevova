import { property } from "@/data/property";
import Reveal from "./Reveal";

export default function FAQ() {
  if (property.faq.length === 0) return null;

  return (
    <section className="py-14 md:py-20 px-6 md:px-12 bg-bg">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-text text-center mb-10 md:mb-12">
            Často kladené otázky
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="divide-y divide-border border-y border-border bg-white rounded-xl overflow-hidden">
            {property.faq.map((it) => (
              <details
                key={it.q}
                className="group px-5 md:px-6 py-4 md:py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-text font-medium text-base">
                  {it.q}
                  <span
                    aria-hidden
                    className="shrink-0 text-teal transition-transform duration-200 group-open:rotate-45 text-xl leading-none"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">{it.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
