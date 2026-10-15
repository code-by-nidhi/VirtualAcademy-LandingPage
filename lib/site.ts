/* =========================================================
   EDIT THESE: contact details, course data and FAQs.
   Everything on the page (and the SEO structured data) reads from here.
   ========================================================= */

export const SITE = {
  name: "Techcadd Virtual Academy",
  url: "https://virtualacademy.in",
  title: "Techcadd Virtual Academy – Live Online Courses at ₹1999",
  description:
    "Learn Python, Web Designing, Cyber Security, UI/UX or Digital Marketing live from industry mentors for just ₹1999 per course. Hands-on projects and certificate included.",
  phone: "+91 98881 22447", // shown + used for tel: links
  whatsapp: "919888122447", // digits only with country code
  email: "janvitechcadd@gmail.com",
  price: 1999,
};

export type Course = {
  id: string;
  name: string;
  short?: string; // used on the "Enroll Now – …" button
  emoji: string;
  accent: string; // card highlight colour
  tagline: string;
  level: string;
  duration: string | null; // shown as a chip on the card front; null hides it
  hours: number | null; // total guided hours, for SEO structured data; null if not fixed
  originalPrice: number | null; // null hides the strike-through price
  roadmapTitle: string;
  roadmap: string[]; // one line per week / module group (back of the card)
  tools: string[];
  projects: string;
  format: string | null; // how classes run, e.g. "Mon–Sat · 2 hrs/day"
  batches: { slot: string; time: string }[]; // live batch timings, shown as pills on the card front
  audience: string;
  careers: string[];
};

// Course content comes from each trainer's syllabus PDF (Python: no syllabus yet).
export const COURSES: Course[] = [
  {
    id: "python",
    name: "Python Programming",
    short: "Python",
    emoji: "🐍",
    accent: "#3ddc97",
    tagline: "Start coding with zero stress",
    level: "Beginner Friendly",
    duration: null,
    hours: null,
    originalPrice: null,
    roadmapTitle: "What you'll learn",
    roadmap: [
      "Python basics: variables, loops, functions",
      "Data handling and automation scripts",
      "Real-life mini projects",
    ],
    tools: ["Python", "VS Code"],
    projects: "Real-life mini projects",
    format: null,
    batches: [
      { slot: "Noon", time: "12–1 PM" },
      { slot: "Evening", time: "6–7 PM" },
    ],
    audience: "Students, freshers, career switchers",
    careers: ["Python Developer", "Data Analyst", "Automation Engineer"],
  },
  {
    // Syllabus: Web Development 1-Month Crash Course (Sandeep mam)
    id: "web",
    name: "Web Designing",
    emoji: "🌐",
    accent: "#4cc3ff",
    tagline: "Build your own website from scratch",
    level: "Beginner Friendly",
    duration: "4 Weeks",
    hours: null,
    originalPrice: null,
    roadmapTitle: "4-week roadmap",
    roadmap: [
      "HTML structure, forms & semantic HTML",
      "CSS, Flexbox, Grid & responsive design",
      "JavaScript, DOM events & form validation",
      "Git, GitHub & publishing your site live",
    ],
    tools: ["HTML", "CSS", "JavaScript", "VS Code", "Chrome DevTools", "Git & GitHub"],
    projects: "Profile page, calculator / to-do app & a live portfolio website",
    format: "Mini project every week + final website",
    batches: [{ slot: "Morning", time: "9–10 AM" }], // evening batch timing not fixed yet
    audience: "Students, freelancers, business owners",
    careers: ["Web Designer", "Front-End Developer", "Freelancer"],
  },
  {
    // Syllabus: Cybersecurity 1-Month Crash Course (Rajinder sir)
    id: "cyber",
    name: "Cyber Security",
    emoji: "🛡️",
    accent: "#ff6b81",
    tagline: "Think like a hacker. Work like a defender.",
    level: "Beginner Friendly",
    duration: "4 Weeks",
    hours: null,
    originalPrice: null,
    roadmapTitle: "4-week roadmap",
    roadmap: [
      "Security basics: CIA triad, threats & cyber hygiene",
      "Networking: IP, DNS, ports, firewalls & Wireshark",
      "Web security: OWASP Top 10 in safe practice labs",
    ],
    tools: ["Wireshark", "OWASP Juice Shop", "Burp Suite", "Browser DevTools", "Packet Tracer"],
    projects: "3 mini projects",
    format: "3 live sessions/week + guided labs",
    batches: [
      { slot: "Morning", time: "9–10 AM" },
      { slot: "Evening", time: "4–5 PM" },
    ],
    audience: "IT students, networking learners, tech enthusiasts",
    careers: ["Security Analyst", "Entry-Level Ethical Hacker", "SOC Trainee"],
  },
  {
    // Syllabus: UX UI Designing – 30 Days Program (Prabhkirat mam)
    id: "uiux",
    name: "UI/UX Design",
    short: "UI/UX",
    emoji: "✨",
    accent: "#d35cf0",
    tagline: "Design apps and websites people love to use",
    level: "Beginner to Advanced",
    duration: "30 Days",
    hours: null,
    originalPrice: null,
    roadmapTitle: "30-day roadmap",
    roadmap: [
      "UX basics, design thinking & user research",
      "Information architecture, user flows & wireframes",
      "UI design: colour, typography, grids & design systems",
      "Figma mastery: auto layout, prototyping & case study",
    ],
    tools: ["Figma", "Auto Layout", "Prototyping", "Smart Animate"],
    projects: "One complete app / web design + a UX case study",
    format: "8 modules · practical + live projects",
    batches: [{ slot: "Evening", time: "4–5 PM" }],
    audience: "Creative students, designers, freelancers",
    careers: ["UI Designer", "UX Designer", "Product Designer"],
  },
  {
    // Syllabus: Digital Marketing Crash Course (Karamjot mam)
    id: "dm",
    name: "Digital Marketing",
    emoji: "📈",
    accent: "#ffb547",
    tagline: "Grow businesses with SEO, social media and Meta Ads",
    level: "Beginner Friendly",
    duration: "4 Weeks",
    hours: null,
    originalPrice: null,
    roadmapTitle: "4-week roadmap",
    roadmap: [
      "Digital marketing basics, SEO & keywords",
      "Keyword research, on/off-page SEO & content writing",
      "Google Business Profile, Facebook & Instagram",
      "Meta Ads: targeting, creatives, campaigns & reports",
    ],
    tools: [
      "Canva",
      "Keyword Planner",
      "Ubersuggest",
      "Meta Business Suite",
      "Meta Ads Manager",
      "4 Campaigns",
      "Types of Prompts",
      "Google My Business Creation",
    ],
    projects: "A real-world marketing project for your portfolio",
    format: "20 live sessions · certificate after final project",
    batches: [{ slot: "Morning", time: "9–10 AM" }],
    audience: "Students, business owners, freelancers, working professionals",
    careers: ["Digital Marketer", "Ads Executive", "Freelancer"],
  },
];

// Techcadd × Virtual Academy section photos (files in public/collab/).
// `area` places each photo in the bento grid (see .collab-gallery in globals.css):
//   a, b = small squares · c = big feature tile · d, e = tall tiles.
// `position` is the CSS object-position used when a photo is cropped to fit its tile.
export type GalleryPhoto = {
  src: string;
  alt: string;
  caption?: string;
  area: "a" | "b" | "c" | "d" | "e";
  position?: string;
};

export const COLLAB_GALLERY: GalleryPhoto[] = [
  { area: "a", src: "/collab/robotics-practice.jpg", position: "50% 40%",
    alt: "Student soldering a robotics kit while a mentor helps", caption: "Robotics practice" },
  { area: "b", src: "/collab/mentor-guided-lab.jpg", position: "50% 35%",
    alt: "Trainer guiding students working at computers in a lab", caption: "Mentor-guided labs" },
  { area: "c", src: "/collab/seminar-auditorium.jpg", position: "50% 70%",
    alt: "Hundreds of students attending a seminar in an auditorium", caption: "Seminars & workshops" },
  { area: "d", src: "/collab/robotics-showcase.jpg", position: "55% 60%",
    alt: "Quadruped robot dog walking on a painted outdoor court", caption: "Robotics showcase" },
  { area: "e", src: "/collab/laptop-lab.jpg", position: "50% 45%",
    alt: "Students coding on laptops in a modern computer lab", caption: "Hands-on computer labs" },
];

export const FAQS: { q: string; a: string }[] = [
  { q: "What do I get for ₹1999?", a: "Live classes, practical projects and a certificate." },
  { q: "Can complete beginners join?", a: "Yes. Every course starts from the basics." },
  {
    q: "What are the class timings and duration?",
    a: "Batch timings and duration are shared at enrollment. Message us on WhatsApp for the next batch schedule.",
  },
  {
    q: "What if I miss a class?",
    a: "Reach out to your mentor or the doubt support group and we'll help you catch up.",
  },
  {
    q: "Will I get a certificate?",
    a: "Yes, you'll receive a Techcadd Virtual Academy certificate on completing the course.",
  },
  {
    q: "Can I enroll in more than one course?",
    a: "Yes, each course is ₹1999. Submit the form once for each course you want to join.",
  },
  { q: "How can I pay?", a: "UPI, Debit/Credit Card and Net Banking." },
];

export const rupees = (n: number) => "₹" + n.toLocaleString("en-IN");

export function whatsappUrl(text: string) {
  const base = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}
