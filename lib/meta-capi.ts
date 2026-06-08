import crypto from "node:crypto";

const sha256 = (s: string) =>
  crypto.createHash("sha256").update(s.trim().toLowerCase()).digest("hex");

const normalizePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("420") || digits.length >= 11
    ? digits
    : `420${digits}`;
};

export type CapiPayload = {
  eventName: string;
  email?: string;
  phone?: string;
  ip: string;
  userAgent: string;
  sourceUrl: string;
  eventId?: string;
  value?: number;        // odhadovaná hodnota leadu (např. provize / 10)
  currency?: string;     // ISO 4217, např. "CZK"
};

export async function sendToCAPI(payload: CapiPayload): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  const testCode = process.env.META_TEST_EVENT_CODE;

  if (!pixelId || !token) {
    console.warn("Meta CAPI: missing env (PIXEL_ID or ACCESS_TOKEN). Skipping.");
    return;
  }

  const userData: Record<string, string> = {
    client_ip_address: payload.ip,
    client_user_agent: payload.userAgent,
  };
  if (payload.email) userData.em = sha256(payload.email);
  if (payload.phone) userData.ph = sha256(normalizePhone(payload.phone));

  const customData: Record<string, unknown> = {};
  if (typeof payload.value === "number") customData.value = payload.value;
  if (payload.currency) customData.currency = payload.currency;

  const event = {
    event_name: payload.eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    event_source_url: payload.sourceUrl,
    event_id: payload.eventId,
    user_data: userData,
    ...(Object.keys(customData).length > 0 ? { custom_data: customData } : {}),
  };

  const body: Record<string, unknown> = {
    data: [event],
    access_token: token,
  };
  if (testCode) body.test_event_code = testCode;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Meta CAPI error:", res.status, text.slice(0, 300));
    }
  } catch (err) {
    console.error("Meta CAPI fetch failed:", err);
  }
}
