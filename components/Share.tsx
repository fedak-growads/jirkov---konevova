"use client";

import { property } from "@/data/property";
import { gaEvent } from "@/lib/ga";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const fmt = (n: number) => new Intl.NumberFormat("cs-CZ").format(n);

function buildShareText() {
  const title = `${property.layout} ${property.street}, ${property.city}`;
  const price = `${fmt(property.price)} Kč`;
  return `Mrkni na tenhle byt: ${title} — ${price}. Co říkáš?`;
}

/**
 * Build a shareable URL with share-specific UTM params.
 * Strips any incoming ad UTMs so the receiver is correctly attributed
 * to the share channel (whatsapp/messenger), not to the original campaign
 * that brought the sharer here.
 */
function buildShareUrl(channel: string): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  const utmsToStrip = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
  ];
  utmsToStrip.forEach((p) => url.searchParams.delete(p));
  url.searchParams.set("utm_source", "share");
  url.searchParams.set("utm_medium", channel);
  url.searchParams.set("utm_campaign", `property_${property.slug}`);
  return url.toString();
}

function track(channel: string) {
  gaEvent("share", {
    method: channel,
    property_slug: property.slug,
  });
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "ViewContent", {
    content_name: `property:${property.slug}:share:${channel}`,
    content_category: "engagement",
  });
}

export default function Share() {
  const text = buildShareText();
  const whatsappShareUrl = buildShareUrl("whatsapp");

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${text}\n${whatsappShareUrl}`
  )}`;

  return (
    <section className="py-10 md:py-14 px-6 md:px-12 bg-bg">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border border-border bg-bg-soft p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal mb-1">
                Líbí se vám byt?
              </p>
              <p className="text-sm md:text-base text-text">
                Pošlete partnerovi nebo známým — ať to vidí taky.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp")}
                className="inline-flex items-center gap-2 bg-white border border-border hover:border-teal-mid text-text font-medium px-4 py-2.5 rounded-lg text-sm transition-colors"
                aria-label="Sdílet přes WhatsApp"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-[#25D366]"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
