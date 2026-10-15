import { COURSES } from "./site";

// sessionStorage flag set after a successful enrollment (stops the auto popup for that visit).
export const ENROLLED_KEY = "va-enrolled";

export const STATUSES = ["Student", "Working Professional", "Business Owner", "Other"] as const;

export type Enrollment = {
  name: string;
  phone: string;
  email: string;
  city: string;
  course: string; // course name, e.g. "Python Programming"
  status: string;
};

const PHONE = /^[6-9][0-9]{9}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Server-side check of a submission (the browser validates too, but can't be trusted).
// Returns the cleaned enrollment, or the names of the invalid fields.
export function validateEnrollment(input: unknown): { ok: true; data: Enrollment } | { ok: false; fields: string[] } {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (k: string, max = 100) => String(raw[k] ?? "").trim().slice(0, max);

  const name = str("name");
  const phone = str("phone").replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  const email = str("email", 150);
  const city = str("city");
  const course = COURSES.find((c) => c.id === str("course"));
  const status = str("status");

  const fields: string[] = [];
  if (name.length < 2) fields.push("name");
  if (!PHONE.test(phone)) fields.push("phone");
  if (!EMAIL.test(email)) fields.push("email");
  if (city.length < 2) fields.push("city");
  if (!course) fields.push("course");
  if (!(STATUSES as readonly string[]).includes(status)) fields.push("status");

  if (fields.length) return { ok: false, fields };
  return { ok: true, data: { name, phone, email, city, course: course!.name, status } };
}
