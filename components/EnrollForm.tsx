"use client";

import { useEffect, useState } from "react";
import { ENROLLED_KEY, STATUSES } from "@/lib/enroll";
import { COURSES, SITE, rupees, whatsappUrl } from "@/lib/site";
import { SELECT_COURSE_EVENT } from "./CourseCards";

type State = "idle" | "sending" | "done";
type Data = Record<string, string>;

function whatsappMessage(d: Data) {
  const course = COURSES.find((c) => c.id === d.course);
  return (
    `Hi! I want to book my seat (${rupees(SITE.price)}).\n\n` +
    `Name: ${d.name}\nMobile: ${d.phone}\nEmail: ${d.email}\n` +
    `City: ${d.city}\nCourse: ${course ? course.name : d.course}\nStatus: ${d.status}`
  );
}

// idPrefix keeps field ids unique when the form appears twice (page + popup).
// compact hides the heading (the popup has its own).
export default function EnrollForm({ idPrefix = "f", compact = false }: { idPrefix?: string; compact?: boolean }) {
  const id = (name: string) => `${idPrefix}-${name}`;
  const [course, setCourse] = useState("");
  const [invalid, setInvalid] = useState<Set<string>>(new Set());
  const [error, setError] = useState<{ text: string; fallback?: string } | null>(null);
  const [state, setState] = useState<State>("idle");
  const [sent, setSent] = useState<Data | null>(null);

  // "Enroll Now" on a course card pre-selects that course here.
  useEffect(() => {
    const onSelect = (e: Event) => {
      setCourse((e as CustomEvent<string>).detail);
      setState((s) => (s === "done" ? "idle" : s));
    };
    window.addEventListener(SELECT_COURSE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_COURSE_EVENT, onSelect);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[required]"));
    const bad = fields.filter((el) => !el.checkValidity());
    setInvalid(new Set(bad.map((el) => el.name)));
    if (bad.length) {
      setError({ text: "Please fill in all fields correctly." });
      bad[0].focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form)) as Data;
    setError(null);
    setState("sending");
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; fields?: string[] };
      if (res.status === 422 && out.fields?.length) {
        setInvalid(new Set(out.fields));
        setError({ text: "Please check the highlighted fields." });
        setState("idle");
        return;
      }
      if (!res.ok || !out.ok) throw new Error();
      try {
        sessionStorage.setItem(ENROLLED_KEY, "1");
      } catch {}
      setSent(data);
      setState("done");
      form.reset();
      setCourse("");
    } catch {
      setError({
        text: "Sorry, we couldn't save your details right now. Please try again, or send them to us on WhatsApp.",
        fallback: whatsappUrl(whatsappMessage(data)),
      });
      setState("idle");
    }
  }

  function clearIfValid(e: React.FormEvent<HTMLFormElement>) {
    const el = e.target as HTMLInputElement;
    if (invalid.has(el.name) && el.checkValidity()) {
      const next = new Set(invalid);
      next.delete(el.name);
      setInvalid(next);
    }
  }

  const fieldClass = (name: string) => `field${invalid.has(name) ? " invalid" : ""}`;

  if (state === "done" && sent) {
    const courseName = COURSES.find((c) => c.id === sent.course)?.name ?? sent.course;
    return (
      <div className="enroll-form enroll-done" role="status" aria-live="polite">
        <div className="done-icon" aria-hidden="true">
          <svg viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="24" />
            <path d="M15 27l7 7 15-15" />
          </svg>
        </div>
        <h3>Your seat request is in, {sent.name.split(" ")[0]}! 🎉</h3>
        <p>
          We&apos;ve received your details for <strong>{courseName}</strong>. Our team will contact you on{" "}
          <strong>{sent.phone}</strong> shortly to confirm your batch and payment.
        </p>
        <a href={whatsappUrl(whatsappMessage(sent))} target="_blank" rel="noopener" className="btn btn-primary btn-block">
          💬 Message us on WhatsApp
        </a>
        <button type="button" className="link-btn" onClick={() => setState("idle")}>
          Enroll in another course
        </button>
      </div>
    );
  }

  return (
    <form className="enroll-form" noValidate onSubmit={handleSubmit} onInput={clearIfValid} aria-busy={state === "sending"}>
      {!compact && (
        <>
          <h3>Book My Seat for ₹{SITE.price}</h3>
          <p className="form-sub">Takes 30 seconds. Our team will confirm your batch on WhatsApp.</p>
        </>
      )}
      {/* Honeypot: hidden from people, often filled by spam bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={fieldClass("name")}>
        <label htmlFor={id("name")}>Full Name</label>
        <input id={id("name")} name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name" />
      </div>
      <div className={fieldClass("phone")}>
        <label htmlFor={id("phone")}>Mobile Number (WhatsApp)</label>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          autoComplete="tel-national"
          inputMode="numeric"
          required
          pattern="[6-9][0-9]{9}"
          maxLength={10}
          placeholder="10-digit mobile number"
        />
      </div>
      <div className={fieldClass("email")}>
        <label htmlFor={id("email")}>Email</label>
        <input id={id("email")} name="email" type="email" autoComplete="email" required maxLength={150} placeholder="you@example.com" />
      </div>
      <div className={fieldClass("city")}>
        <label htmlFor={id("city")}>City</label>
        <input id={id("city")} name="city" type="text" autoComplete="address-level2" required minLength={2} maxLength={100} placeholder="Your city" />
      </div>
      <div className="field-row">
        <div className={fieldClass("course")}>
          <label htmlFor={id("course")}>Select Course</label>
          <select id={id("course")} name="course" required value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="" disabled>
              Choose a course
            </option>
            {COURSES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className={fieldClass("status")}>
          <label htmlFor={id("status")}>Current Status</label>
          <select id={id("status")} name="status" required defaultValue="">
            <option value="" disabled>
              Select
            </option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={state === "sending"}>
        {state === "sending" ? (
          <>
            <span className="spinner" aria-hidden="true" /> Saving your seat…
          </>
        ) : (
          <>
            Confirm My Seat <span className="arrow">→</span>
          </>
        )}
      </button>
      <p className="secure">🔒 Your details are only used to contact you about your enrollment.</p>
      <p className={`form-note${error ? " error" : ""}`} role="status" aria-live="polite">
        {error?.text}
        {error?.fallback && (
          <>
            {" "}
            <a href={error.fallback} target="_blank" rel="noopener">
              Send on WhatsApp →
            </a>
          </>
        )}
      </p>
    </form>
  );
}
