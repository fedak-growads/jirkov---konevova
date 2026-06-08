import { property } from "@/data/property";
import Reveal from "./Reveal";

export default function Parameters() {
  return (
    <section className="py-14 md:py-20 px-6 md:px-12 bg-bg-soft border-y border-border">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal text-center mb-3">
            Parametry nemovitosti
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-text text-center mb-10 md:mb-12">
            Co byt nabízí
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {property.parameters.map((p) => (
              <div
                key={p.label}
                className="rounded-xl bg-white border border-border p-4 transition-all duration-200 hover:border-teal-mid hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  <div className="font-display text-base md:text-lg text-text leading-tight">
                    {p.value}
                  </div>
                </div>
                <div className="text-xs text-text-muted ml-3.5">{p.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
