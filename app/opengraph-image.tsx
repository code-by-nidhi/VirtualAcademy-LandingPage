import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview shown when the link is shared on WhatsApp, Facebook, LinkedIn, X, etc.
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background:
            "radial-gradient(60% 80% at 15% 20%, rgba(107,76,240,0.45), transparent 70%), radial-gradient(50% 70% at 90% 85%, rgba(211,92,240,0.35), transparent 70%), #0b0914",
          color: "#f4f2fb",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={330} height={99} alt="" />
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, marginTop: 48, letterSpacing: -2 }}>
          Learn High-Income Digital Skills for Just ₹1999
        </div>
        <div style={{ fontSize: 30, color: "#a9a3c4", marginTop: 28 }}>
          Python · Web Design · Cyber Security · UI/UX · Marketing
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            padding: "14px 28px",
            borderRadius: 999,
            background: "linear-gradient(135deg, #6b4cf0, #d35cf0)",
            fontSize: 28,
            fontWeight: 700,
            alignSelf: "flex-start",
          }}
        >
          Live Online Classes · Certificate Included
        </div>
      </div>
    ),
    size,
  );
}
