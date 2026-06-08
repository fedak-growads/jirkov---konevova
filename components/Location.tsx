import { property } from "@/data/property";
import Reveal from "./Reveal";
import PropertyMap from "./PropertyMap";

export default function Location() {
  const { coords } = property;
  const mapsUrl = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;

  return (
    <section className="py-14 md:py-20 px-6 md:px-12 bg-bg-soft border-y border-border">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal text-center mb-3">
            Lokalita
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-text text-center mb-3">
            Vše důležité do 10 minut pěšky
          </h2>
          <p className="text-sm text-text-muted text-center mb-10 max-w-md mx-auto">
            {property.street} · {property.district}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden border border-border shadow-md mb-3">
            <PropertyMap />
          </div>
          <p className="text-xs text-text-light mb-2">
            📍 Hlavní pin = byt · ostatní piny = okolní místa (klikněte pro detail)
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-teal-dark transition-colors mb-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Otevřít v Google Maps →
          </a>
        </Reveal>

        <div className="space-y-6">
          {property.poiCategories.map((cat, i) => (
            <Reveal key={cat.label} delay={120 + i * 80}>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted mb-3">
                  {cat.label}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {cat.items.map((poi) => (
                    <div
                      key={poi.name}
                      className="group flex items-center gap-3 rounded-lg bg-white border border-border px-4 py-3 transition-all duration-200 hover:border-teal-mid hover:shadow-md hover:-translate-y-0.5"
                    >
                      <div className="text-xl shrink-0 leading-none transition-transform duration-200 group-hover:scale-110">{poi.icon}</div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-text truncate">
                          {poi.name}
                        </div>
                        <div className="text-xs text-text-muted">{poi.distance}</div>
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
