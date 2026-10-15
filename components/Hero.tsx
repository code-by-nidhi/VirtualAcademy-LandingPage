import { whatsappUrl } from "@/lib/site";

const Sparkle = ({ className }: { className: string }) => (
  <svg className={`spark ${className}`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c.6 6.4 5 11 12 12-7 .9-11.4 5.4-12 12-.6-6.6-5-11.1-12-12C7 11 11.4 6.4 12 0Z" />
  </svg>
);

const TICKER = [
  "Live Interactive Classes",
  "Hands-On Projects",
  "Certificate Included",
  "Doubt Support",
  "Book Your Seat for ₹1999",
];

const css = (v: Record<string, string | number>) => v as React.CSSProperties;

export default function Hero() {
  const counsellingUrl = whatsappUrl("Hi! I'd like to book a free counselling call for Techcadd Virtual Academy courses.");

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <Sparkle className="s1" />
      <Sparkle className="s2" />
      <Sparkle className="s3" />
      <Sparkle className="s4" />
      <Sparkle className="s5" />
      <span className="deco-bubble" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="deco-pill" aria-hidden="true" />

      <div className="container hero-inner">
        <span className="sticker">
          <span className="pulse" aria-hidden="true" /> Limited Seats · Live Online Classes
        </span>

        <h1 className="hero-title">
          <span className="ht-kicker">learn high-income</span>
          <span className="ht-main">
            digital <span className="puff">Skills</span>
          </span>
          <span className="price-tag">
            for just <b>₹1999</b>
          </span>
        </h1>

        <p className="lead">
          Choose Python, Web Designing, Cyber Security, UI/UX or Digital Marketing and learn live from industry mentors,
          right from home. Backed by Techcadd&apos;s years of training experience.
        </p>

        <div className="hero-ctas">
          <a href="#courses" className="btn btn-primary btn-lg">
            Choose Your Course <span className="arrow">→</span>
          </a>
          <a href={counsellingUrl} className="btn btn-ghost btn-lg" target="_blank" rel="noopener">
            Book a Free Counselling Call
          </a>
        </div>
      </div>

      {/* Scrapbook collage: one "object" per course (decorative) */}
      <div className="collage-wrap" aria-hidden="true">
        <div className="collage">
          <div className="obj o-code" style={css({ "--r": "-7deg", "--d": "1.0s" })}>
            <div className="win">
              <div className="win-bar">
                <i /> <i /> <i /> <span>learn.py</span>
              </div>
              <pre>
                <span className="k">def</span> <span className="f">career</span>():{"\n"}
                {"  "}skills = [<span className="s">&quot;python&quot;</span>]{"\n"}
                {"  "}<span className="k">return</span> <span className="s">&quot;hired&quot;</span> 🚀
              </pre>
            </div>
          </div>

          <div className="obj o-shield" style={css({ "--r": "9deg", "--d": "1.1s" })}>
            <span>🛡️</span>
          </div>

          <div className="obj o-browser" style={css({ "--r": "3deg", "--d": "1.2s" })}>
            <div className="win">
              <div className="win-bar">
                <i /> <i /> <i /> <span className="url">myportfolio.in</span>
              </div>
              <div className="site">
                <b className="hero-blk" />
                <div className="row">
                  <b />
                  <b />
                  <b />
                </div>
              </div>
            </div>
          </div>

          <div className="obj o-cert" style={css({ "--r": "-3deg", "--d": "1.3s" })}>
            <div className="cert">
              <small>Certificate of Completion</small>
              <strong>Techcadd Virtual Academy</strong>
              <span className="cert-line" />
              <span className="cert-line short" />
              <span className="seal">✦</span>
            </div>
          </div>

          <div className="obj o-phone" style={css({ "--r": "8deg", "--d": "1.4s" })}>
            <div className="phone">
              <span className="notch" />
              <span className="ui-card">✨</span>
              <span className="ui-line" />
              <span className="ui-line short" />
              <span className="ui-btn" />
            </div>
          </div>

          <div className="obj o-chart" style={css({ "--r": "-5deg", "--d": "1.5s" })}>
            <div className="chart">
              <small>📈 Campaign growth</small>
              <div className="bars">
                {[30, 45, 40, 62, 75, 96].map((h, i) => (
                  <i key={i} style={css({ "--h": `${h}%`, "--i": i })} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="ticker">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1}>
              {[...TICKER, ...TICKER].map((t, i) => (
                <li key={i} aria-hidden={i >= TICKER.length || undefined}>
                  {t} <span aria-hidden="true">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
