"use client";

import { useCallback, useEffect, useRef } from "react";
import { ENROLLED_KEY } from "@/lib/enroll";
import EnrollForm from "./EnrollForm";
import { SELECT_COURSE_EVENT } from "./CourseCards";

const AUTO_OPEN_MS = 5000; // auto-open delay after each page load
const RETRY_MS = 3000; // if the visitor is busy (typing, menu open), try again after this

function enrolledThisSession() {
  try {
    return sessionStorage.getItem(ENROLLED_KEY) === "1";
  } catch {
    return false;
  }
}

/*
  Enrollment popup.
  Opens when any element with [data-open-enroll] is clicked (optionally pre-selecting
  data-course="python"), and automatically a few seconds after every page load, unless
  the visitor already enrolled during this browser session.
  Those elements are normal links to #enroll, so without JS they still reach the form.
*/
export default function EnrollModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const shownThisLoad = useRef(false);

  const open = useCallback((course?: string) => {
    const d = ref.current;
    if (!d) return;
    shownThisLoad.current = true;
    if (course) window.dispatchEvent(new CustomEvent(SELECT_COURSE_EVENT, { detail: course }));
    if (!d.open) {
      d.classList.remove("closing");
      d.showModal();
      // Focus the title rather than the first input, so phones don't pop the keyboard on auto-open.
      d.querySelector<HTMLElement>("#modal-title")?.focus();
    }
  }, []);

  const close = useCallback(() => {
    const d = ref.current;
    if (!d?.open || d.classList.contains("closing")) return;
    d.classList.add("closing");
    setTimeout(() => {
      d.classList.remove("closing");
      d.close();
    }, 240);
  }, []);

  useEffect(() => {
    // Capture phase so it runs before React handlers that stop propagation (e.g. course cards).
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-open-enroll]");
      if (!el) return;
      e.preventDefault();
      open(el.dataset.course);
    };
    document.addEventListener("click", onClick, true);

    // Older builds kept a permanent "enrolled" flag in localStorage that blocked the popup forever.
    try {
      localStorage.removeItem(ENROLLED_KEY);
    } catch {}

    let timer = 0;
    const autoOpen = () => {
      // Already opened on this page (by a button), or the visitor enrolled this session: don't nag.
      if (shownThisLoad.current || enrolledThisSession() || document.querySelector("dialog[open]")) return;
      // Don't interrupt someone typing in the page form or using the mobile menu; check again shortly.
      const busy =
        document.activeElement?.closest("form, input, select, textarea") || document.querySelector(".menu-open");
      if (busy) {
        timer = window.setTimeout(autoOpen, RETRY_MS);
        return;
      }
      open();
    };
    timer = window.setTimeout(autoOpen, AUTO_OPEN_MS);

    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(timer);
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-title"
      onCancel={(e) => {
        e.preventDefault(); // Esc: run the closing animation instead of closing instantly
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close(); // click on the backdrop
      }}
    >
      <div className="modal-card">
        <button type="button" className="modal-close" aria-label="Close" onClick={close}>
          ×
        </button>
        <div className="modal-side">
          <svg className="spark s1" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0c.6 6.4 5 11 12 12-7 .9-11.4 5.4-12 12-.6-6.6-5-11.1-12-12C7 11 11.4 6.4 12 0Z" />
          </svg>
          <svg className="spark s2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0c.6 6.4 5 11 12 12-7 .9-11.4 5.4-12 12-.6-6.6-5-11.1-12-12C7 11 11.4 6.4 12 0Z" />
          </svg>
          <span className="sticker">
            <span className="pulse" aria-hidden="true" /> Limited Seats
          </span>
          <h2 id="modal-title" tabIndex={-1}>
            Book your <span className="puff">seat</span> for just ₹1999
          </h2>
          <p>Live online classes with industry mentors. Our team confirms your batch on WhatsApp.</p>
          <ul>
            <li>Live interactive classes</li>
            <li>Hands-on projects</li>
            <li>Certificate included</li>
            <li>Doubt support</li>
          </ul>
        </div>
        <div className="modal-main">
          <EnrollForm idPrefix="m" compact />
        </div>
      </div>
    </dialog>
  );
}
