export type AppsScriptPayload = Record<string, string>;

export async function sendToAppsScript(data: AppsScriptPayload): Promise<void> {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) {
    console.error("Apps Script URL is not configured (APPS_SCRIPT_URL).");
    return;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      // Apps Script redirects 302 → follow is default in fetch
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Apps Script write failed:", res.status, text.slice(0, 300));
    }
  } catch (err) {
    console.error("Apps Script fetch error:", err);
  }
}
