import Image from "next/image";
import { COLLAB_GALLERY } from "@/lib/site";

const BRINGS = {
  techcadd: ["Experienced trainers", "Practical, industry-focused syllabi", "Completion certificate"],
  va: ["Live online classes", "Learn from anywhere in India", "Just ₹1999 per course"],
  you: ["Job-ready skills", "Real projects for your portfolio", "Mentor support from day one"],
};

// Empty gallery slots are only drawn in development, as a reminder of where photos go.
const SHOW_PLACEHOLDERS = process.env.NODE_ENV === "development";
const PLACEHOLDER_SLOTS = 5;

export default function Collab() {
  const hasPhotos = COLLAB_GALLERY.length > 0;

  return (
    <section className="section collab" id="collab" aria-labelledby="collab-title">
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">The Collab</span>
          <h2 id="collab-title">
            Techcadd <span className="collab-x-inline grad-text">×</span> Virtual Academy
          </h2>
          <p>
            Virtual Academy is Techcadd&apos;s live online learning platform. The same trainers and practical-first
            approach, now from the comfort of your home.
          </p>
        </div>

        <div className="lockup" data-reveal="zoom">
          <div className="lock-card lock-left">
            <Image src="/techcadd-logo.png" alt="Techcadd – Your Skill & Technology Partner" width={891} height={236} />
          </div>
          <div className="lock-x" aria-hidden="true">
            <span className="beam" />
            <span className="x">×</span>
          </div>
          <div className="lock-card lock-right">
            <Image src="/logo.png" alt="Virtual Academy by Techcadd" width={529} height={159} />
          </div>
        </div>

        <div className="equation" data-stagger>
          <div className="eq-card">
            <small>Techcadd brings</small>
            <ul>
              {BRINGS.techcadd.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="eq-op" aria-hidden="true">
            +
          </div>
          <div className="eq-card">
            <small>Virtual Academy brings</small>
            <ul>
              {BRINGS.va.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="eq-op" aria-hidden="true">
            =
          </div>
          <div className="eq-card eq-result">
            <small>You get</small>
            <ul>
              {BRINGS.you.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {(hasPhotos || SHOW_PLACEHOLDERS) && (
          <div className="collab-gallery" data-stagger>
            {hasPhotos
              ? COLLAB_GALLERY.map((img) => (
                  <figure key={img.src} className="g-item" style={{ gridArea: img.area }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={img.area === "c" ? "(max-width: 640px) 100vw, 480px" : "(max-width: 640px) 50vw, 240px"}
                      style={{ objectPosition: img.position ?? "50% 50%" }}
                    />
                    {img.caption && <figcaption>{img.caption}</figcaption>}
                  </figure>
                ))
              : Array.from({ length: PLACEHOLDER_SLOTS }, (_, i) => (
                  <div key={i} className="g-item g-empty" style={{ gridArea: "abcde"[i] }}>
                    <span>
                      Photo {i + 1}
                      <small>public/collab/ → COLLAB_GALLERY</small>
                    </span>
                  </div>
                ))}
          </div>
        )}
      </div>
    </section>
  );
}
