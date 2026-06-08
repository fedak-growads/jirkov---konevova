"use client";

import { property } from "@/data/property";
import { gaEvent } from "@/lib/ga";

const navLinks = [
  { href: "#prochazka", label: "Procházka" },
  { href: "#galerie", label: "Galerie" },
  { href: "#parametry", label: "Parametry" },
  { href: "#kalkulacka", label: "Kalkulačka" },
  { href: "#lokalita", label: "Lokalita" },
];

export default function TopBar() {
  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-border">
      <div className="max-w-5xl mx-auto px-4 md:px-8 h-11 flex items-center gap-4">
        {/* Brand / property label */}
        <a
          href="#top"
          className="font-display text-sm md:text-base text-text whitespace-nowrap shrink-0 hover:text-teal transition-colors"
        >
          {property.layout} · {property.street}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 mx-auto">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-text-muted hover:text-teal transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: phone + CTA */}
        <div className="flex items-center gap-2 md:gap-3 ml-auto md:ml-0 shrink-0">
          <a
            href={property.agent.phoneLink}
            onClick={() =>
              gaEvent("phone_click", { source: "top_bar", property_slug: property.slug })
            }
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text hover:text-teal transition-colors"
            aria-label={`Zavolat ${property.agent.name}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 text-teal"
            >
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="tabular-nums hidden sm:inline">{property.agent.phone}</span>
          </a>
          <a
            href="#kontakt"
            className="hidden md:inline-flex items-center gap-1.5 bg-teal hover:bg-teal-dark text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
          >
            Zjistit více
          </a>
        </div>
      </div>
    </div>
  );
}
