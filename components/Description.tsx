import { property } from "@/data/property";
import Reveal from "./Reveal";

export default function Description() {
  const blocks = property.descriptionBlocks;

  return (
    <section className="py-14 md:py-20 px-6 md:px-12 bg-bg">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal mb-3">
            {property.descriptionEyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-text mb-6 leading-tight">
            {property.descriptionTitle}
          </h2>

          {/* Featured lead */}
          <div className="rounded-2xl bg-teal-light/50 border border-teal-mid/30 p-5 md:p-6 mb-8 md:mb-10">
            <p className="text-text text-base md:text-lg leading-relaxed">
              {property.descriptionLead}
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {blocks.map((block, i) => {
            const icon = (block as { icon?: string }).icon;
            const wide = i === blocks.length - 1 && blocks.length % 2 === 1;
            const accent = icon === "🌳";
            return (
              <Reveal
                key={block.heading}
                delay={i * 70}
                className={wide ? "sm:col-span-2" : ""}
              >
                <div
                  className={`group h-full rounded-2xl border p-5 md:p-6 transition-all duration-200 hover:-translate-y-1 ${
                    accent
                      ? "bg-teal-light/60 border-teal-mid/40 hover:shadow-lg hover:shadow-teal/10"
                      : "bg-bg-soft border-border hover:border-teal-mid/50 hover:shadow-lg hover:shadow-black/5"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="shrink-0 w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-xl shadow-sm transition-transform duration-200 group-hover:scale-110">
                      {icon}
                    </span>
                    <h3 className="font-display text-lg md:text-xl text-text leading-tight">
                      {block.heading}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed">
                    {block.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
