module.exports = [
(()=>{"use strict";return[
"[project]/app/opengraph-image--metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/opengraph-image.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript)");
;
;
const imageModule = {
    alt: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["alt"],
    contentType: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["contentType"],
    size: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["size"]
};
async function __TURBOPACK__default__export__(props) {
    const { __metadata_id__: _, ...params } = await props.params;
    const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fillMetadataSegment"])("/", params, "opengraph-image", false);
    function getImageMetadata(imageMetadata, idParam) {
        const data = {
            alt: imageMetadata.alt,
            type: imageMetadata.contentType || 'image/png',
            url: imageUrl + (idParam ? '/' + idParam : '') + '?' + "44858684a7629248"
        };
        const { size } = imageMetadata;
        if (size) {
            data.width = size.width;
            data.height = size.height;
        }
        return data;
    }
    return [
        getImageMetadata(imageModule, '')
    ];
}
}),
"[project]/app/opengraph-image.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alt",
    ()=>alt,
    "contentType",
    ()=>contentType,
    "default",
    ()=>OpengraphImage,
    "size",
    ()=>size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$og$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/og.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const alt = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE"].title;
const size = {
    width: 1200,
    height: 630
};
const contentType = "image/png";
async function OpengraphImage() {
    const logo = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["join"])(process.cwd(), "public/logo.png"));
    const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$og$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ImageResponse"](/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px 80px",
            background: "radial-gradient(60% 80% at 15% 20%, rgba(107,76,240,0.45), transparent 70%), radial-gradient(50% 70% at 90% 85%, rgba(211,92,240,0.35), transparent 70%), #0b0914",
            color: "#f4f2fb",
            fontFamily: "sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: logoSrc,
                width: 330,
                height: 99,
                alt: ""
            }, void 0, false, {
                fileName: "[project]/app/opengraph-image.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 68,
                    fontWeight: 800,
                    lineHeight: 1.1,
                    marginTop: 48,
                    letterSpacing: -2
                },
                children: "Learn High-Income Digital Skills for Just ₹1999"
            }, void 0, false, {
                fileName: "[project]/app/opengraph-image.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 30,
                    color: "#a9a3c4",
                    marginTop: 28
                },
                children: "Python · Web Design · MERN · Cyber Security · UI/UX · Marketing"
            }, void 0, false, {
                fileName: "[project]/app/opengraph-image.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    marginTop: 40,
                    padding: "14px 28px",
                    borderRadius: 999,
                    background: "linear-gradient(135deg, #6b4cf0, #d35cf0)",
                    fontSize: 28,
                    fontWeight: 700,
                    alignSelf: "flex-start"
                },
                children: "Live Online Classes · Certificate Included"
            }, void 0, false, {
                fileName: "[project]/app/opengraph-image.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/opengraph-image.tsx",
        lineNumber: 17,
        columnNumber: 7
    }, this), size);
}
}),
"[project]/lib/site.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* =========================================================
   EDIT THESE: contact details, course data and FAQs.
   Everything on the page (and the SEO structured data) reads from here.
   ========================================================= */ __turbopack_context__.s([
    "COLLAB_GALLERY",
    ()=>COLLAB_GALLERY,
    "COURSES",
    ()=>COURSES,
    "FAQS",
    ()=>FAQS,
    "SITE",
    ()=>SITE,
    "rupees",
    ()=>rupees,
    "whatsappUrl",
    ()=>whatsappUrl
]);
const SITE = {
    name: "Techcadd Virtual Academy",
    url: "https://virtualacademy.in",
    title: "Techcadd Virtual Academy – Live Online Courses at ₹1999",
    description: "Learn Python, Web Designing, MERN Stack, Cyber Security, UI/UX or Digital Marketing live from industry mentors for just ₹1999 per course. Hands-on projects and certificate included.",
    phone: "",
    whatsapp: "",
    email: "",
    price: 1999
};
const COURSES = [
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
            "Real-life mini projects"
        ],
        tools: [
            "Python",
            "VS Code"
        ],
        projects: "Real-life mini projects",
        format: null,
        audience: "Students, freshers, career switchers",
        careers: [
            "Python Developer",
            "Data Analyst",
            "Automation Engineer"
        ]
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
            "Git, GitHub & publishing your site live"
        ],
        tools: [
            "HTML",
            "CSS",
            "JavaScript",
            "VS Code",
            "Chrome DevTools",
            "Git & GitHub"
        ],
        projects: "Profile page, calculator / to-do app & a live portfolio website",
        format: "Mini project every week + final website",
        audience: "Students, freelancers, business owners",
        careers: [
            "Web Designer",
            "Front-End Developer",
            "Freelancer"
        ]
    },
    {
        // Syllabus: 1-Month MERN Stack Crash Course (Sahil sir)
        id: "mern",
        name: "MERN Stack Development",
        short: "MERN Stack",
        emoji: "⚛️",
        accent: "#8b9dff",
        tagline: "Build full-stack apps with React, Node & MongoDB",
        level: "Beginner to Intermediate",
        duration: "48 Hours",
        hours: 48,
        originalPrice: null,
        roadmapTitle: "4-week roadmap",
        roadmap: [
            "HTML5, forms & 100% pure CSS",
            "Modern JavaScript (ES6+) & React with Vite",
            "Node.js, Express & REST APIs",
            "MongoDB Atlas, Mongoose CRUD & full MERN app"
        ],
        tools: [
            "VS Code",
            "React + Vite",
            "Node.js",
            "Express",
            "MongoDB Atlas",
            "Postman",
            "Git & GitHub"
        ],
        projects: "Web showcase, React app, REST API & a full MERN CRUD app",
        format: "Mon–Sat · 2 hrs/day · live demo + coding lab",
        audience: "Students, freshers, aspiring developers",
        careers: [
            "Full-Stack Developer",
            "React Developer",
            "Node.js Developer"
        ]
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
            "Monitoring, incident response & capstone audit"
        ],
        tools: [
            "Wireshark",
            "OWASP Juice Shop",
            "OWASP ZAP",
            "Browser DevTools",
            "Packet Tracer"
        ],
        projects: "3 mini projects + a small-business security audit",
        format: "3 live sessions/week + guided labs",
        audience: "IT students, networking learners, tech enthusiasts",
        careers: [
            "Security Analyst",
            "Entry-Level Ethical Hacker",
            "SOC Trainee"
        ]
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
            "Figma mastery: auto layout, prototyping & case study"
        ],
        tools: [
            "Figma",
            "Auto Layout",
            "Prototyping",
            "Smart Animate"
        ],
        projects: "One complete app / web design + a UX case study",
        format: "8 modules · practical + live projects",
        audience: "Creative students, designers, freelancers",
        careers: [
            "UI Designer",
            "UX Designer",
            "Product Designer"
        ]
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
            "Meta Ads: targeting, creatives, campaigns & reports"
        ],
        tools: [
            "Canva",
            "Keyword Planner",
            "Ubersuggest",
            "Search Console",
            "Meta Ads Manager",
            "ChatGPT"
        ],
        projects: "A real-world marketing project for your portfolio",
        format: "20 live sessions · certificate after final project",
        audience: "Students, business owners, freelancers, working professionals",
        careers: [
            "Digital Marketer",
            "Ads Executive",
            "Freelancer"
        ]
    }
];
const COLLAB_GALLERY = [
    {
        area: "a",
        src: "/collab/robotics-practice.jpg",
        position: "50% 40%",
        alt: "Student soldering a robotics kit while a mentor helps",
        caption: "Robotics practice"
    },
    {
        area: "b",
        src: "/collab/mentor-guided-lab.jpg",
        position: "50% 35%",
        alt: "Trainer guiding students working at computers in a lab",
        caption: "Mentor-guided labs"
    },
    {
        area: "c",
        src: "/collab/seminar-auditorium.jpg",
        position: "50% 70%",
        alt: "Hundreds of students attending a seminar in an auditorium",
        caption: "Seminars & workshops"
    },
    {
        area: "d",
        src: "/collab/robotics-showcase.jpg",
        position: "55% 60%",
        alt: "Quadruped robot dog walking on a painted outdoor court",
        caption: "Robotics showcase"
    },
    {
        area: "e",
        src: "/collab/laptop-lab.jpg",
        position: "50% 45%",
        alt: "Students coding on laptops in a modern computer lab",
        caption: "Hands-on computer labs"
    }
];
const FAQS = [
    {
        q: "What do I get for ₹1999?",
        a: "Live classes, practical projects and a certificate."
    },
    {
        q: "Can complete beginners join?",
        a: "Yes. Every course starts from the basics."
    },
    {
        q: "What are the class timings and duration?",
        a: "Batch timings and duration are shared at enrollment. Message us on WhatsApp for the next batch schedule."
    },
    {
        q: "What if I miss a class?",
        a: "Reach out to your mentor or the doubt support group and we'll help you catch up."
    },
    {
        q: "Will I get a certificate?",
        a: "Yes, you'll receive a Techcadd Virtual Academy certificate on completing the course."
    },
    {
        q: "Can I enroll in more than one course?",
        a: "Yes, each course is ₹1999. Submit the form once for each course you want to join."
    },
    {
        q: "How can I pay?",
        a: "UPI, Debit/Credit Card and Net Banking."
    }
];
const rupees = (n)=>"₹" + n.toLocaleString("en-IN");
function whatsappUrl(text) {
    const base = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}` : "https://wa.me/";
    return `${base}?text=${encodeURIComponent(text)}`;
}
}),
]})(),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/app/opengraph-image--metadata.js [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/opengraph-image--metadata.js [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__06d0i0xlwuay6._.js.map