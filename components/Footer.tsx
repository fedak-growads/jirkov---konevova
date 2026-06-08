import { property } from "@/data/property";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft py-10 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center text-sm text-text-muted">
        <p className="font-display text-xl text-text mb-3">{property.agent.name}</p>

        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mb-4">
          <a
            href={property.agent.phoneLink}
            className="text-text hover:text-teal transition-colors"
          >
            {property.agent.phone}
          </a>
          <span className="text-text-light">·</span>
          <a
            href={`mailto:${property.agent.email}`}
            className="text-text hover:text-teal transition-colors break-all"
          >
            {property.agent.email}
          </a>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mb-6 text-xs">
          <a
            href="https://jelencicovamarie.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal transition-colors"
          >
            Hlavní web
          </a>
          <span className="text-text-light">·</span>
          <a
            href="https://jelencicovamarie.cz/gdpr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal transition-colors"
          >
            GDPR
          </a>
        </div>

        <p className="text-xs text-text-light">
          © 2026 {property.agent.name} · Realitní makléřka
        </p>
      </div>
    </footer>
  );
}
