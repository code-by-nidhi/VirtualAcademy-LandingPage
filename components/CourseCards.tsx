"use client";

import { useEffect, useRef, useState } from "react";
import { COURSES, SITE, rupees, type Course } from "@/lib/site";

export const SELECT_COURSE_EVENT = "select-course";

export default function CourseCards() {
  const grid = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false); // grid has scrolled into view
  const [discovered, setDiscovered] = useState(false); // a card was flipped, or the hint was closed

  useEffect(() => {
    const el = grid.current;
    if (!el || !("IntersectionObserver" in window)) return setInView(true);
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      // Fire when the top of the grid reaches the upper ~65% of the screen (works for the tall mobile grid too).
      { rootMargin: "0px 0px -35% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showHint = inView && !discovered;

  return (
    <>
      {/* "Tap/click a card" hint: shown when the grid comes into view, gone after the first flip */}
      <div className="flip-hint-wrap">
        <p className={`flip-hint${showHint ? " show" : ""}`} aria-hidden={!showHint}>
          <span className="hand" aria-hidden="true">
            👆
          </span>
          <span>
            <b>
              <span className="tap-word">Tap</span>
              <span className="click-word">Click</span> any card
            </b>{" "}
            to see the full syllabus
          </span>
          <button type="button" aria-label="Dismiss hint" tabIndex={showHint ? 0 : -1} onClick={() => setDiscovered(true)}>
            ×
          </button>
        </p>
      </div>
      {/* data-peek (not a class) so React doesn't wipe the "in" class Motion adds for the entrance animation */}
      <div ref={grid} className="cards" data-stagger data-peek={showHint || undefined}>
        {COURSES.map((c, i) => (
          <CourseCard key={c.id} course={c} index={i} onFlip={() => setDiscovered(true)} />
        ))}
      </div>
    </>
  );
}

function CourseCard({ course: c, index, onFlip }: { course: Course; index: number; onFlip: () => void }) {
  const [flipped, setFlipped] = useState(false);
  const frontBtn = useRef<HTMLButtonElement>(null);
  const enrollBtn = useRef<HTMLAnchorElement>(null);

  const meta = [c.level, c.duration, "Live Classes"].filter(Boolean) as string[];
  const price = (
    <span className="price">
      {c.originalPrice ? <s>{rupees(c.originalPrice)}</s> : null}
      {rupees(SITE.price)}
    </span>
  );

  function toggle(e: React.MouseEvent) {
    const next = !flipped;
    setFlipped(next);
    if (next) onFlip();
    // Keyboard activation (detail === 0): move focus to the face that's now visible.
    if (e.detail === 0) {
      requestAnimationFrame(() => (next ? enrollBtn : frontBtn).current?.focus({ preventScroll: true }));
    }
  }

  return (
    <article
      className={`card${flipped ? " flipped" : ""}`}
      style={{ "--accent": c.accent } as React.CSSProperties}
      data-tilt
      onClick={toggle}
    >
      <div className="card-inner">
        <div className="card-face card-front" aria-hidden={flipped}>
          <span className="card-num" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="card-emoji" aria-hidden="true">
            {c.emoji}
          </span>
          <h3>{c.name}</h3>
          <p className="tagline">{c.tagline}</p>
          <ul className="meta">
            {meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <div className="card-careers">
            <small>Career paths</small>
            <p>{c.careers.join(" · ")}</p>
          </div>
          <div className="card-foot">
            {price}
            <button ref={frontBtn} type="button" className="flip-btn" aria-expanded={flipped} tabIndex={flipped ? -1 : 0}>
              View syllabus <span className="ic">↻</span>
            </button>
          </div>
        </div>

        <div className="card-face card-back" aria-hidden={!flipped}>
          <h4>{c.roadmapTitle}</h4>
          <ol className="roadmap">
            {c.roadmap.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ol>
          <dl>
            <dt>Tools</dt>
            <dd>{c.tools.join(", ")}</dd>
            <dt>You&apos;ll build</dt>
            <dd>{c.projects}</dd>
            {c.format && (
              <>
                <dt>Format</dt>
                <dd>{c.format}</dd>
              </>
            )}
            <dt>Who it&apos;s for</dt>
            <dd>{c.audience}</dd>
          </dl>
          <div className="card-foot">
            {price}
            <button type="button" className="flip-btn back-btn" tabIndex={flipped ? 0 : -1} aria-label="Flip card back">
              ↺
            </button>
          </div>
          <a
            ref={enrollBtn}
            href="#enroll"
            className="btn btn-primary btn-block enroll-btn"
            tabIndex={flipped ? 0 : -1}
            data-open-enroll
            data-course={c.id}
            onClick={(e) => e.stopPropagation()} // don't flip the card back
          >
            Enroll Now – {c.short ?? c.name}
          </a>
        </div>
      </div>
    </article>
  );
}
