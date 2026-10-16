import type { Enrollment } from "./enroll";

// Sends each new enrollment to the team's WhatsApp numbers via CallMeBot (https://www.callmebot.com).
// Configure in .env.local as comma-separated "number:apikey" pairs (number with country code, digits only):
//   WHATSAPP_NOTIFY=919888122447:1234567,919876543210:7654321
// Each number gets its own apikey by messaging CallMeBot once (see README → "WhatsApp alerts").
export function notifyTargets(): { phone: string; apikey: string }[] {
  return (process.env.WHATSAPP_NOTIFY ?? "")
    .split(",")
    .map((pair) => pair.trim().split(":"))
    .filter(([phone, apikey]) => phone && apikey)
    .map(([phone, apikey]) => ({ phone: phone.replace(/\D/g, ""), apikey: apikey.trim() }));
}

function message(d: Enrollment) {
  return (
    `🎓 New enrollment – Techcadd Virtual Academy\n\n` +
    `Name: ${d.name}\nMobile: +91 ${d.phone}\nEmail: ${d.email}\n` +
    `City: ${d.city}\nCourse: ${d.course}\nStatus: ${d.status}\n\n` +
    `Chat: https://wa.me/91${d.phone}`
  );
}

// Never throws: a failed alert must not fail the student's submission (it's already in the sheet).
export async function notifyWhatsApp(d: Enrollment) {
  const targets = notifyTargets();
  if (!targets.length) return;
  const text = message(d);
  const results = await Promise.allSettled(
    targets.map(async ({ phone, apikey }) => {
      const url =
        `https://api.callmebot.com/whatsapp.php?phone=${phone}` +
        `&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000), cache: "no-store" });
      if (!res.ok) throw new Error(`${phone}: HTTP ${res.status}`);
    }),
  );
  for (const r of results) if (r.status === "rejected") console.error("[enroll] WhatsApp alert failed:", r.reason);
}
