"use client";

import { useEffect } from "react";

/*
  Page-wide motion, attached once:
  - [data-reveal]  : element animates in when it scrolls into view (variants: up | left | right | zoom)
  - [data-stagger] : children animate in one after another
  - .spot          : radial spotlight follows the cursor
  - [data-tilt]    : subtle 3D tilt towards the cursor (mouse only)
  - .pin-note      : fixed note sways slightly with the cursor position (mouse only)
  Content is fully visible in the server HTML; hiding only applies under html.js (see layout.tsx).
*/
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Reveal on scroll ----
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
      Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i)));
    });
    // Reveal anything whose top has entered the lower 90% of the viewport, or that is
    // already above it (so jumping to #enroll never leaves earlier sections hidden).
    let pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger]"));
    let ticking = false;
    const sweep = () => {
      ticking = false;
      const limit = window.innerHeight * 0.9;
      pending = pending.filter((el) => {
        if (reduce || el.getBoundingClientRect().top < limit) {
          el.classList.add("in");
          return false;
        }
        return true;
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(sweep);
      }
    };
    sweep();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // ---- Hero collage: scale the 1200×130 artboard (the visible top halves) to the space left in the
    //      100vh hero. 34px of the wrap runs under the ticker. On narrow screens keep at least 0.5× and
    //      let the row crop at the edges instead of shrinking to nothing. ----
    const wrap = document.querySelector<HTMLElement>(".collage-wrap");
    const ro =
      wrap && "ResizeObserver" in window
        ? new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            const cs = Math.min(1.2, Math.max(width / 1200, 0.5), (height - 34) / 130);
            wrap.style.setProperty("--cs", cs.toFixed(3));
            wrap.classList.toggle("tiny", cs < 0.22);
          })
        : undefined;
    if (wrap) ro?.observe(wrap);

    // ---- Spotlight + tilt + pinned note sway (pointer) ----
    const note = document.querySelector<HTMLElement>(".pin-note");
    let tilted: HTMLElement | null = null;
    const resetTilt = () => {
      if (tilted) tilted.style.transform = "";
      tilted = null;
    };
    const onMove = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const spot = t?.closest<HTMLElement>(".spot");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      if (reduce || e.pointerType !== "mouse") return;
      if (note) {
        note.style.setProperty("--nx", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
        note.style.setProperty("--ny", ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
      }
      const tilt = t?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tilt !== tilted) resetTilt();
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-4px)`;
        tilted = tilt;
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", resetTilt);

    return () => {
      ro?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", resetTilt);
    };
  }, []);

  return null;
}
