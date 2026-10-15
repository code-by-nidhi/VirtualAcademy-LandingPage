"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#courses", label: "Courses" },
  { href: "#why", label: "Why Us" },
  { href: "#how", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const enroll = document.getElementById("enroll");
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      setScrolled(y > 12);
      bar.current?.style.setProperty("--p", String(max > 0 ? Math.min(y / max, 1) : 0));
      // Mobile sticky CTA: show after the hero, hide once the form is on screen.
      const formTop = enroll ? enroll.getBoundingClientRect().top : Infinity;
      root.classList.toggle("show-sticky", y > 560 && formTop > window.innerHeight * 0.6);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled || open ? " scrolled" : ""}${open ? " menu-open" : ""}`}>
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label="Techcadd Virtual Academy home" onClick={close}>
          <Image src="/logo.png" alt="Virtual Academy by Techcadd" width={529} height={159} priority />
        </a>
        <nav className="nav" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a href="#enroll" className="btn btn-primary btn-sm" data-open-enroll>
            Book My Seat <span className="arrow">→</span>
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <span />
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile" inert={!open}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
        <a href="#enroll" className="btn btn-primary btn-block" data-open-enroll onClick={close}>
          Book My Seat for ₹1999
        </a>
      </nav>
      <div ref={bar} className="progress" aria-hidden="true" />
    </header>
  );
}
