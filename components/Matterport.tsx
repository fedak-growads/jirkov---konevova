import { property } from "@/data/property";
import Reveal from "./Reveal";

export default function Matterport() {
  if (!property.matterport.enabled) return null;

  return (
    <section className="py-14 md:py-20 px-6 md:px-12 bg-bg">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal text-center mb-3">
            Virtuální prohlídka 3D
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-text text-center mb-3">
            Projděte si byt virtuálně
          </h2>
          <p className="text-sm text-text-muted text-center mb-8 max-w-xl mx-auto">
            Prozkoumejte každou místnost z pohodlí domova — než se rozhodnete přijet osobně.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-[4/3] md:aspect-video rounded-xl overflow-hidden border border-border shadow-xl bg-bg-soft">
            <iframe
              src={`https://my.matterport.com/show/?m=${property.matterport.embedId}`}
              title={property.matterport.title}
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              allowFullScreen
              allow="xr-spatial-tracking"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
