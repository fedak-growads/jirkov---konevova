import { property } from "@/data/property";
import Reveal from "./Reveal";

export default function Benefits() {
  return (
    <section className="py-14 md:py-20 px-6 md:px-12 bg-bg">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal text-center mb-3">
            Proč právě tento byt
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-text text-center mb-10 md:mb-12">
            Konkrétní výhody
          </h2>
        </Reveal>

        <div className="space-y-8 md:space-y-10">
          {property.benefitCategories.map((category, ci) => (
            <Reveal key={category.label} delay={ci * 100}>
              <div className="rounded-2xl bg-teal-light/60 border border-teal-mid/40 p-6 md:p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-teal-dark mb-4">
                  {category.label}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <div key={item.title} className="group flex items-start gap-3">
                      <div className="text-2xl shrink-0 leading-none mt-0.5 transition-transform duration-200 group-hover:scale-110">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-text text-[15px] mb-0.5">
                          {item.title}
                        </div>
                        <div className="text-sm text-text-muted leading-snug">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
