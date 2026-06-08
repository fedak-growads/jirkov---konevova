"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { property } from "@/data/property";
import { gaEvent } from "@/lib/ga";
import Reveal from "./Reveal";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function getQueryParam(name: string): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "";
}

export default function LeadForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Shared event_id for Pixel↔CAPI deduplication.
    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const mortgageInterest = formData.get("mortgage") === "on";

    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      gdpr: formData.get("gdpr") === "on",
      mortgage_interest: mortgageInterest,
      type: mortgageInterest ? "property_inquiry_with_mortgage" : "property_inquiry",
      property_slug: property.slug,
      property_address: `${property.street}, ${property.city}`,
      property_price: property.price,
      event_id: eventId,
      utm_source: getQueryParam("utm_source"),
      utm_medium: getQueryParam("utm_medium"),
      utm_campaign: getQueryParam("utm_campaign"),
      utm_content: getQueryParam("utm_content"),
      utm_term: getQueryParam("utm_term"),
      referrer: typeof document !== "undefined" ? document.referrer : "",
      page_url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (!payload.name || !payload.phone || !payload.email) {
      setError("Vyplňte prosím jméno, telefon a e-mail.");
      return;
    }
    if (!payload.gdpr) {
      setError("Pro odeslání musíte souhlasit se zpracováním údajů.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Submit failed");

        if (typeof window !== "undefined" && window.fbq) {
          window.fbq(
            "track",
            "Lead",
            {
              content_name: `property:${property.slug}:inquiry`,
              content_category: mortgageInterest ? "property_with_mortgage" : "property",
              value: 15000,
              currency: "CZK",
            },
            { eventID: eventId }
          );
        }

        gaEvent("generate_lead", {
          currency: "CZK",
          value: 15000,
          property_slug: property.slug,
          with_mortgage: mortgageInterest,
        });

        router.push("/thank-you");
      } catch {
        setError(
          `Něco se pokazilo. Zkuste to znovu nebo zavolejte rovnou Marii na ${property.agent.phone}.`
        );
      }
    });
  }

  return (
    <section
      id="kontakt"
      className="py-14 md:py-20 px-6 md:px-12 bg-bg-soft border-y border-border scroll-mt-8"
    >
      <div className="max-w-xl mx-auto">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal text-center mb-3">
            Zjistit více informací
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-text text-center mb-4">
            Máte zájem o tento byt?
          </h2>
          <p className="text-text-muted text-center mb-10 leading-relaxed">
            Stačí jméno a telefon. Marie vám zavolá obvykle do 30 minut
            a domluvíme prohlídku podle vašich možností.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <form
            onSubmit={onSubmit}
            className="relative rounded-2xl bg-white border border-border shadow-sm overflow-hidden"
          >
            <div
              aria-hidden
              className="h-1 bg-gradient-to-r from-teal-mid via-teal to-teal-dark"
            />

            <div className="flex items-center gap-3 px-6 md:px-8 pt-6 pb-5 border-b border-border/70">
              <div
                aria-hidden
                className="shrink-0 w-11 h-11 rounded-full bg-teal-light text-teal-dark flex items-center justify-center font-display text-base font-medium"
              >
                M
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-text">
                  Ozve se vám {property.agent.name.split(" ")[0]}
                </div>
                <div className="text-xs text-text-muted mt-0.5">
                  Realiťák roku 2025 · Ústecký kraj
                </div>
              </div>
              <div className="ml-auto inline-flex items-center gap-1.5 text-xs text-text-muted">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-3.5 h-3.5 text-teal"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" strokeLinecap="round" />
                </svg>
                do 30 min
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-4">
              <Field label="Jméno a příjmení" name="name" type="text" required autoComplete="name" />
              <Field label="Telefon" name="phone" type="tel" required autoComplete="tel" />
              <Field
                label="E-mail"
                name="email"
                type="email"
                required
                autoComplete="email"
              />

              <div>
                <label htmlFor="message" className="block text-sm text-text mb-1.5">
                  Zpráva{" "}
                  <span className="text-text-light font-normal">(nepovinné)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder={`Dobrý den, mám zájem o prohlídku bytu na ${property.street}…`}
                  className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-text placeholder:text-text-light focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                />
              </div>

              {/* Mortgage interest opt-in — single CTA, optional segmentation */}
              <label className="flex items-start gap-3 text-sm text-text cursor-pointer pt-1 rounded-lg border border-border bg-bg-soft/60 hover:border-teal-mid/60 transition-colors px-4 py-3">
                <input
                  type="checkbox"
                  name="mortgage"
                  className="mt-0.5 h-4 w-4 accent-teal shrink-0"
                />
                <span>
                  <span className="font-medium block">Chci řešit i hypotéku</span>
                  <span className="text-text-muted text-xs leading-snug block mt-0.5">
                    Marie vás propojí s hypoteční poradkyní, která zdarma porovná nabídky bank.
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm text-text-muted leading-relaxed cursor-pointer pt-1">
                <input
                  type="checkbox"
                  name="gdpr"
                  required
                  className="mt-1 h-4 w-4 accent-teal"
                />
                <span>
                  Souhlasím se zpracováním údajů pro účely kontaktování ohledně této nemovitosti.
                </span>
              </label>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex items-center justify-center gap-2 bg-teal hover:bg-teal-dark disabled:opacity-60 disabled:cursor-wait text-white font-medium px-7 py-4 rounded-xl transition-all duration-150 hover:scale-[1.02] shadow-md shadow-teal/20 mt-2"
              >
                {isPending ? "Odesílám…" : "Chci víc informací →"}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-2 text-[11px] uppercase tracking-wider text-text-light">
                <span>Reakce do 30 minut</span>
                <span aria-hidden>·</span>
                <span>Konzultace zdarma</span>
                <span aria-hidden>·</span>
                <span>Údaje nepředávám dál</span>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-text mb-1.5">
        {label}
        {required && <span className="text-teal"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-text placeholder:text-text-light focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
      />
    </div>
  );
}
