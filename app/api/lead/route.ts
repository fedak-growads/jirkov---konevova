import { NextRequest, NextResponse } from "next/server";
import { sendToAppsScript } from "@/lib/apps-script";
import { sendToCAPI } from "@/lib/meta-capi";

export const runtime = "nodejs";

// Odhadovaná hodnota leadu pro Meta optimalizaci (Value Optimization).
// Property LP = BOFU prodej → ~15 000 Kč (provize ÷ 10).
const LEAD_VALUE = 15000;
const LEAD_CURRENCY = "CZK";

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  type?: string;
  mortgage_interest?: boolean;
  property_slug?: string;
  property_address?: string;
  property_price?: number;
  event_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  page_url?: string;
};

export async function POST(req: NextRequest) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";
  const userAgent = req.headers.get("user-agent") || "";

  const sheetPayload: Record<string, string> = {
    jmeno: body.name || "",
    telefon: body.phone || "",
    email: body.email || "",
    typ: body.type || "property_inquiry",
    hypoteka: body.mortgage_interest ? "ano" : "ne",
    nemovitost: body.property_slug || "",
    adresa: body.property_address || "",
    cena: body.property_price ? String(body.property_price) : "",
    zprava: body.message || "",
    utm_source: body.utm_source || "direct",
    utm_medium: body.utm_medium || "",
    utm_campaign: body.utm_campaign || "",
    utm_content: body.utm_content || "",
    utm_term: body.utm_term || "",
    referrer: body.referrer || "",
    landing_url: body.page_url || "",
  };

  await Promise.allSettled([
    sendToAppsScript(sheetPayload),
    sendToCAPI({
      eventName: "Lead",
      email: body.email || undefined,
      phone: body.phone || undefined,
      ip,
      userAgent,
      sourceUrl: body.page_url || req.headers.get("referer") || "",
      eventId: body.event_id,
      value: LEAD_VALUE,
      currency: LEAD_CURRENCY,
    }),
  ]);

  return NextResponse.json({ ok: true });
}
