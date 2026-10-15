import Image from "next/image";
import CourseCards from "@/components/CourseCards";
import EnrollForm from "@/components/EnrollForm";
import EnrollModal from "@/components/EnrollModal";
import Collab from "@/components/Collab";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Motion from "@/components/Motion";
import ToolsMarquee from "@/components/ToolsMarquee";
import { COURSES, FAQS, SITE, whatsappUrl } from "@/lib/site";

const Icon = ({ children }: { children: React.ReactNode }) => (
  <div className="icon">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  </div>
);

const FEATURES = [
  { title: "Practical Projects", text: "Hands-on work in every course.", icon: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /> },
  { title: "Certificate", text: "Techcadd Virtual Academy certificate on completion.", icon: <><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" /></> },
  { title: "Doubt Support", text: "WhatsApp group and dedicated doubt sessions.", icon: <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12Z" /> },
];

const STEPS = [
  { title: "Choose Your Course", text: "Pick the skill you want to learn." },
  { title: "Pay ₹1999", text: "Fill in the form and confirm your seat." },
  { title: "Learn Live", text: "Join the class and build your skills." },
];

const AUDIENCE = [
  { emoji: "🎓", text: "College students who want to add job-ready skills" },
  { emoji: "💼", text: "Freshers preparing for their first job" },
  { emoji: "🔄", text: "Career switchers moving into IT" },
  { emoji: "🏪", text: "Business owners who need digital skills for their own growth" },
];

const COMPARE = {
  bad: ["Theory without practice", "No portfolio to show employers", "Expensive, years-long programs"],
  good: ["Live classes with real mentors", "Practical projects from day one", "Just ₹1999 per course"],
};


// Structured data for Google rich results (organization, course list, FAQ).
function jsonLd() {
  const org = {
    "@type": "EducationalOrganization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    ...(SITE.email && { email: SITE.email }),
    ...(SITE.phone && { telephone: SITE.phone }),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      org,
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": org["@id"] },
        inLanguage: "en-IN",
      },
      {
        "@type": "ItemList",
        name: "Courses",
        itemListElement: COURSES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Course",
            name: c.name,
            description: `${c.tagline}. ${c.roadmapTitle}: ${c.roadmap.join("; ")}.`,
            url: `${SITE.url}/#courses`,
            provider: { "@id": org["@id"] },
            educationalLevel: c.level,
            teaches: c.roadmap,
            offers: {
              "@type": "Offer",
              category: "Paid",
              price: SITE.price,
              priceCurrency: "INR",
              availability: "https://schema.org/LimitedAvailability",
              url: `${SITE.url}/#enroll`,
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Online",
              ...(c.hours && { courseWorkload: `PT${c.hours}H` }),
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export default function Home() {
  const questionUrl = whatsappUrl("Hi! I have a question about Techcadd Virtual Academy courses.");
  const tel = SITE.phone ? `tel:${SITE.phone.replace(/\s/g, "")}` : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
      />

      <Header />

      <main id="top">
        {/* ============ 1. HERO ============ */}
        <Hero />

        {/* ============ TOOLS YOU'LL WORK WITH ============ */}
        <ToolsMarquee />

        {/* ============ TECHCADD × VIRTUAL ACADEMY ============ */}
        <Collab />

        {/* ============ 2. PROBLEM → SOLUTION ============ */}
        <section className="section">
          <div className="container problem-grid">
            <div className="problem-copy" data-reveal="left">
              <span className="eyebrow">The Gap</span>
              <h2>
                Have a degree but no job-ready skills? <span className="grad-text">Start here.</span>
              </h2>
              <p>
                Companies hire for <strong>skills</strong>, not just degrees. And you don&apos;t need a huge fee or
                years of study to build them. With Techcadd Virtual Academy, you can start your journey in an
                in-demand skill for just <strong>₹1999</strong>, with practical projects from day one.
              </p>
            </div>
            <div className="compare" data-stagger>
              <div className="compare-col bad">
                <h3>Degree only</h3>
                <ul>
                  {COMPARE.bad.map((t) => (
                    <li key={t}>
                      <b aria-hidden="true">✕</b>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="compare-col good">
                <h3>
                  Degree + <span className="grad-text">Techcadd</span>
                </h3>
                <ul>
                  {COMPARE.good.map((t) => (
                    <li key={t}>
                      <b aria-hidden="true">✓</b>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 3. COURSE FLASH CARDS ============ */}
        <section className="section alt" id="courses">
          <div className="container">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Courses</span>
              <h2>
                Pick Your Course. <span className="grad-text">Shape Your Future.</span>
              </h2>
              <p>Every course is just ₹1999. Tap a card to see what&apos;s inside.</p>
            </div>
            <CourseCards />
          </div>
        </section>

        {/* ============ 4. WHY US (bento) ============ */}
        <section className="section" id="why">
          <div className="container">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Why Techcadd Virtual Academy?</span>
              <h2>More Than Recorded Videos. A Complete Live Learning Experience.</h2>
            </div>
            <div className="bento" data-stagger>
              <div className="feature wide spot">
                <div>
                  <Icon>
                    <rect x="2" y="5" width="14" height="14" rx="2" />
                    <path d="m16 10 6-3v10l-6-3" />
                  </Icon>
                  <h3>Live Classes</h3>
                  <p>Ask questions directly to real mentors, in real time. No pre-recorded playlists.</p>
                </div>
                <div className="live-viz" aria-hidden="true">
                  <span className="live-tag">
                    <span className="pulse" /> LIVE
                  </span>
                  <div className="wave">
                    {Array.from({ length: 14 }, (_, i) => (
                      <span key={i} style={{ "--i": i } as React.CSSProperties} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="feature spot">
                <div className="big-price grad-text">₹1999</div>
                <h3>Affordable</h3>
                <p>Just ₹1999, no hidden charges.</p>
              </div>
              {FEATURES.map((f) => (
                <div className="feature spot" key={f.title}>
                  <Icon>{f.icon}</Icon>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              ))}
              <div className="feature full spot">
                <Icon>
                  <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </Icon>
                <div>
                  <h3>Trusted Brand</h3>
                  <p>Backed by Techcadd&apos;s training legacy.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 5. HOW IT WORKS ============ */}
        <section className="section alt" id="how">
          <div className="container">
            <div className="section-head" data-reveal>
              <span className="eyebrow">How It Works</span>
              <h2>Start Learning in 3 Simple Steps</h2>
            </div>
            <ol className="steps" data-stagger>
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="step-num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ 6. WHO IS THIS FOR ============ */}
        <section className="section">
          <div className="container">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Who Is This For?</span>
              <h2>Built for Anyone Ready to Level Up</h2>
            </div>
            <div className="audience" data-stagger>
              {AUDIENCE.map((a) => (
                <div className="aud spot" key={a.text}>
                  <span className="aud-ic" aria-hidden="true">
                    {a.emoji}
                  </span>
                  <p>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 7. FAQ ============ */}
        <section className="section alt" id="faq">
          <div className="container faq-grid">
            <div className="faq-intro" data-reveal="left">
              <div className="section-head">
                <span className="eyebrow">FAQ</span>
                <h2>Frequently Asked Questions</h2>
              </div>
              <p>Can&apos;t find what you&apos;re looking for? Our counsellors reply quickly on WhatsApp.</p>
              <a href={questionUrl} className="btn btn-ghost" target="_blank" rel="noopener">
                💬 Ask on WhatsApp
              </a>
            </div>
            <div className="faq" data-stagger>
              {FAQS.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 8 + 9. FINAL CTA & ENROLLMENT FORM ============ */}
        <section className="section final" id="enroll">
          <div className="orb orb-1" aria-hidden="true" />
          <div className="orb orb-2" aria-hidden="true" />
          <div className="container final-inner">
            <div className="final-copy" data-reveal="left">
              <span className="badge">
                <span className="pulse" aria-hidden="true" /> This batch is filling fast
              </span>
              <h2>
                Seats Are Limited. <span className="grad-text">Lock Yours Today!</span>
              </h2>
              <p>The ₹1999 offer may close after this batch.</p>
              <ul className="checks">
                <li>Live classes with industry mentors</li>
                <li>Hands-on projects in every course</li>
                <li>Techcadd Virtual Academy certificate</li>
              </ul>
              <p className="contact-line">
                Questions?
                {tel && (
                  <>
                    <a href={tel}>📞 {SITE.phone}</a>
                    <span aria-hidden="true">|</span>
                  </>
                )}
                <a href={questionUrl} target="_blank" rel="noopener">
                  💬 Chat on WhatsApp
                </a>
              </p>
            </div>
            <div data-reveal="zoom">
              <EnrollForm />
            </div>
          </div>
        </section>
      </main>

      {/* ============ 10. FOOTER ============ */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Image src="/logo.png" alt="Virtual Academy by Techcadd" width={529} height={159} className="footer-logo" />
              <p className="footer-about">
                Live online courses in high-income digital skills, backed by Techcadd&apos;s training legacy.
              </p>
            </div>
            <div className="footer-col">
              <h4>Courses</h4>
              <ul>
                {COURSES.map((c) => (
                  <li key={c.id}>
                    <a href="#courses">{c.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href={SITE.url}>virtualacademy.in</a>
                </li>
                {tel && (
                  <li>
                    <a href={tel}>{SITE.phone}</a>
                  </li>
                )}
                {SITE.email && (
                  <li>
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </li>
                )}
                <li>
                  <a href={questionUrl} target="_blank" rel="noopener">
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="/refund-policy">Refund Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Techcadd Virtual Academy. All rights reserved.</p>
            <p>Live online classes for learners across India</p>
          </div>
        </div>
      </footer>

      {/* Pinned "after payment" note (desktop) — sways towards the cursor, see Motion.tsx */}
      {SITE.phone && (
        <aside className="pin-note" aria-label="After payment">
          <div className="pin-note-card">
            <span className="pin-note-pin" aria-hidden="true" />
            <p className="pin-note-tag">Note</p>
            <h4>After Payment</h4>
            <p>
              Once you&apos;ve paid for the course, you&apos;ll be added to our community within 1 day. For any
              inconvenience, call <a href={tel}>{SITE.phone}</a>.
            </p>
          </div>
        </aside>
      )}

      {/* Mobile sticky CTA */}
      <a href="#enroll" className="sticky-cta" data-open-enroll>
        Book My Seat for ₹1999 →
      </a>

      <EnrollModal />
      <Motion />
    </>
  );
}
