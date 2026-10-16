import { NextResponse } from "next/server";
import { validateEnrollment } from "@/lib/enroll";
import { notifyWhatsApp } from "@/lib/whatsapp-notify";

// Receives the enrollment form and appends it to Google Sheets via the Apps Script web app
// (google-apps-script/Code.gs). The script URL + secret stay on the server.
export async function POST(req: Request) {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEET_SECRET;
  if (!url || !secret) {
    console.error("[enroll] GOOGLE_SHEET_WEBHOOK_URL / GOOGLE_SHEET_SECRET are not set");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: real users never see or fill the "website" field; bots usually do.
  if (body.website) return NextResponse.json({ ok: true });

  const result = validateEnrollment(body);
  if (!result.ok) return NextResponse.json({ ok: false, error: "invalid", fields: result.fields }, { status: 422 });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, data: { ...result.data, page: req.headers.get("referer") ?? "" } }),
      redirect: "follow", // Apps Script answers via a redirect to googleusercontent.com
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });
    const out = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !out?.ok) throw new Error(out?.error ?? `HTTP ${res.status}`);
  } catch (err) {
    console.error("[enroll] Google Sheet write failed:", err);
    return NextResponse.json({ ok: false, error: "sheet_failed" }, { status: 502 });
  }

  // Awaited so serverless hosts don't cut it off; it swallows its own errors.
  await notifyWhatsApp(result.data);

  return NextResponse.json({ ok: true });
}
