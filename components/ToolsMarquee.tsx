import {
  siCisco,
  siCss,
  siExpress,
  siFacebook,
  siFigma,
  siGit,
  siGithub,
  siGooglechrome,
  siGooglesearchconsole,
  siHtml5,
  siInstagram,
  siJavascript,
  siMeta,
  siMongodb,
  siNodedotjs,
  siOwasp,
  siPostman,
  siPython,
  siReact,
  siVite,
  siWhatsapp,
  siWireshark,
  type SimpleIcon,
} from "simple-icons";
import NetworkBackground from "./NetworkBackground";

type Tool = { name: string; icon?: SimpleIcon; color?: string; mono?: string; monoBg?: string };

// Tools taught across the course syllabi. Logos: Simple Icons (CC0).
// `color` overrides brand colours that are too dark to see on the dark band.
// `mono` draws a monogram badge for tools Simple Icons doesn't include.
const TOOLS: Tool[] = [
  { name: "Python", icon: siPython, color: "#4b8bbe" },
  { name: "HTML5", icon: siHtml5 },
  { name: "CSS", icon: siCss, color: "#8b5cf6" },
  { name: "JavaScript", icon: siJavascript },
  { name: "React", icon: siReact },
  { name: "Vite", icon: siVite },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Express", icon: siExpress, color: "#f5f3fc" },
  { name: "MongoDB", icon: siMongodb },
  { name: "VS Code", mono: "VS", monoBg: "#0e7ad3" },
  { name: "Git", icon: siGit },
  { name: "GitHub", icon: siGithub, color: "#f5f3fc" },
  { name: "Postman", icon: siPostman },
  { name: "Chrome DevTools", icon: siGooglechrome },
  { name: "Wireshark", icon: siWireshark, color: "#3a9fd8" },
  { name: "OWASP ZAP", icon: siOwasp, color: "#f5f3fc" },
  { name: "Packet Tracer", icon: siCisco },
  { name: "Figma", icon: siFigma },
  { name: "Canva", mono: "C", monoBg: "linear-gradient(135deg, #00c4cc, #7d2ae8)" },
  { name: "Search Console", icon: siGooglesearchconsole },
  { name: "Meta Ads", icon: siMeta },
  { name: "Instagram", icon: siInstagram },
  { name: "Facebook", icon: siFacebook },
  { name: "WhatsApp Business", icon: siWhatsapp },
];

function Badge({ tool }: { tool: Tool }) {
  if (tool.mono) {
    return (
      <span className="tool-badge mono" style={{ background: tool.monoBg }}>
        {tool.mono}
      </span>
    );
  }
  const color = tool.color ?? `#${tool.icon!.hex}`;
  return (
    <span className="tool-badge" style={{ "--brand": color } as React.CSSProperties}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={tool.icon!.path} fill={color} />
      </svg>
    </span>
  );
}

export default function ToolsMarquee() {
  return (
    <section className="tools-band" aria-labelledby="tools-title">
      <NetworkBackground />
      <p className="tools-label" id="tools-title">
        Tools you&apos;ll work with
      </p>
      <div className="tools-viewport">
        <div className="tools-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1}>
              {TOOLS.map((t) => (
                <li key={t.name} className="tool-pill">
                  <Badge tool={t} />
                  {t.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
