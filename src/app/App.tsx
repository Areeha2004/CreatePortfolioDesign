import { useState, useEffect, useRef } from "react";
import resumePdf from "../imports/Areeha-Zulfiqar-Resume.pdf";
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Menu, X, Copy, Check, ChevronRight, MapPin, Download } from "lucide-react";

/* ─── data ─────────────────────────────────────────────────── */

const NAV_LINKS = ["Work", "About", "Skills", "Contact"];

const STATS = [
  { value: "4", label: "AI products shipped" },
  { value: "Full-stack", label: "Next.js + FastAPI" },
  { value: "RAG", label: "& LLM agents" },
  { value: "BS '26", label: "Software Engineering · PUCIT" },
];

const SKILL_GROUPS = [
  {
    label: "AI Engineering",
    accent: true,
    skills: [
      "LLM Applications (OpenAI API)", "RAG", "AI Agents (LangGraph)",
      "Embeddings & Vector DBs (Chroma)", "LLM-as-Judge & Evals",
      "Structured Outputs", "Prompt Engineering", "LangChain",
      "Computer Vision (MediaPipe / OpenCV)",
    ],
  },
  {
    label: "Frontend & Backend",
    accent: false,
    skills: [
      "Next.js", "React", "TypeScript", "Node.js", "Express",
      "FastAPI", "ASP.NET Core", "Tailwind CSS", "WebRTC", "Socket.IO", "GraphQL",
    ],
  },
  {
    label: "Data & Tools",
    accent: false,
    skills: [
      "PostgreSQL", "Supabase", "Prisma ORM", "SQL Server", "Git / GitHub",
      "Firebase", "Stripe", "Cloudinary", "Vercel", "Neon", "Render",
    ],
  },
  {
    label: "Foundations",
    accent: false,
    skills: [
      "Full-Stack System Design", "REST APIs", "JWT / Auth", "Agile / Scrum", "CI/CD",
    ],
  },
];

const ROAMIO_STEPS = [
  { id: "search", label: "Search", sub: "Semantic RAG retrieval" },
  { id: "plan", label: "Plan", sub: "Deterministic Python" },
  { id: "replan", label: "Re-plan loop", sub: "Conditional checks" },
  { id: "conditions", label: "Live conditions", sub: "Tavily road/weather" },
  { id: "write", label: "Write", sub: "LLM prose only" },
];

const ROAMIO_BULLETS = [
  "Two RAG pipelines -semantic destination retrieval + grounding-content corpus (Wikivoyage + Wikipedia + Tavily) so day notes cite real sources.",
  "LLM-as-judge faithfulness guard that fact-checks each day's claims against its sources.",
  "Natural-language trip editing -free text → typed edit operations via structured outputs, validated and applied deterministically.",
  "Lean evals harness -deterministic assertions on planning math + opt-in end-to-end faithfulness pass.",
];

const PROJECTS = [
  {
    id: "smartmeet",
    title: "SmartMeet",
    eyebrow: "Final Year Project · BS Software Engineering",
    oneliner: "An AI meeting platform that measures engagement, not just attendance -using computer vision.",
    stack: ["Next.js", "Node.js", "GraphQL", "WebRTC", "Socket.IO", "OpenCV", "MediaPipe", "PostgreSQL", "Prisma", "Neon", "Vercel"],
    github: "https://github.com/laiba-ajmal-12/SmartMeetFYP",
    live: "https://smartmeet-platform.vercel.app/",
    overview: "An AI-assisted online meeting platform that improves virtual meetings by measuring participant engagement instead of relying on attendance, then auto-generates detailed engagement reports after each meeting. Built as the Final Year Project for the BS in Software Engineering at the University of the Punjab (PUCIT), 2026.",
    problem: "Attendance ≠ participation. Platforms like Zoom and Teams tell hosts who joined, not who was actually paying attention -leaving teachers, trainers, and team leads with no objective, data-backed measure of engagement.",
    solution: "SmartMeet extends a real-time video platform (WebRTC + Socket.IO) with a Python computer-vision pipeline -face-presence detection, eye-gaze estimation, head-pose estimation, and facial-landmark analysis -fused into a per-participant engagement score that updates throughout the meeting and surfaces in a post-meeting analytics dashboard.",
    features: [
      "Auth & role management: host and participant roles, organisation-level settings, and meeting scheduling",
      "Real-time video/audio, in-meeting text chat, and screen sharing via WebRTC + Socket.IO signalling server",
      "CV engagement pipeline: face detection → gaze estimation → head-pose tracking → automated attention scoring per participant",
      "Live engagement indicators visible to hosts during the meeting; automated post-meeting summary reports",
      "Analytics dashboard with per-participant stats, attendance records, and historical trend charts",
      "Lightweight MediaPipe models with real-time comms decoupled from heavy CV processing to minimise latency",
    ],
    role: "Frontend lead -built the full UI (auth pages, host/participant dashboards, meeting interface, responsive Tailwind components) and integrated all frontend–backend API surfaces. Computer Vision contributor -researched gaze-estimation techniques, pre-processed datasets, integrated MediaPipe facial-landmark detection, and wired CV outputs into the web app.",
  },
  {
    id: "uraan",
    title: "Uraan",
    eyebrow: "AI Women-Entrepreneurship Platform",
    oneliner: "A full-stack AI platform helping Pakistani women launch businesses with personalised, AI-driven guidance.",
    stack: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Prisma", "NextAuth.js", "OpenAI GPT-4o-mini", "Cloudinary", "Vercel"],
    github: "https://github.com/Areeha2004/Uraanv1",
    live: "https://uraan-ten.vercel.app",
    overview: "A full-stack AI platform that empowers Pakistani women entrepreneurs with personalised, AI-driven business guidance plus a community and marketplace to launch and grow ventures. Built end-to-end in ~99% TypeScript and live in production on Vercel.",
    problem: "Women entrepreneurs in Pakistan often lack structured guidance, personalised roadmaps, and the professional networks needed to turn an idea into a viable business -existing resources are generic, scattered, and not adapted to the local context.",
    solution: "An AI-powered onboarding quiz analyses each user's skills, interests, and goals, then GPT-4o-mini generates a personalised step-by-step business roadmap with timelines and curated resources. A collaboration marketplace and community layer let users connect with service providers and peers.",
    features: [
      "AI quiz that analyses skills and interests via GPT-4o-mini structured prompt engineering to recommend the right business ideas",
      "Personalised roadmaps with milestones, timelines, and resource links generated and stored per user",
      "Collaboration marketplace connecting entrepreneurs with local service providers (designers, accountants, mentors)",
      "Community support network: posts, follows, and profile management",
      "Multi-provider auth (Credentials, Google, Facebook) via NextAuth.js with secure session handling",
      "Type-safe data layer: Prisma ORM over a normalised PostgreSQL schema with 5+ related entities; ~99% TypeScript throughout",
    ],
    role: "Solo engineer -end-to-end: product design, database schema, API routes (Next.js), AI integration, frontend, auth, Cloudinary media, and Vercel deployment.",
  },
  {
    id: "volt",
    title: "Volt",
    eyebrow: "Smart Energy Management App",
    oneliner: "A full-stack app that tracks household energy per device, forecasts bills, and gives AI saving tips.",
    stack: ["Next.js", "TypeScript", "Supabase", "Prisma", "OpenAI", "Jest", "Vercel"],
    github: "https://github.com/Areeha2004/VoltKar",
    live: "https://volt-kar.vercel.app/",
    overview: "A full-stack smart-energy management app that gives households granular visibility into their electricity consumption by device, forecasts upcoming bills, and delivers GPT-powered saving recommendations -all in a clean, TypeScript-first codebase (~98.5%) deployed on Vercel.",
    problem: "Most households receive a single monthly electricity bill with no breakdown of which appliances are costing the most, making meaningful bill reduction almost impossible without guesswork.",
    solution: "Users register their household devices with wattage and usage patterns. Volt computes per-device consumption, projects the monthly bill in real time, and calls OpenAI to generate saving tips tailored specifically to that household's actual usage data -not generic advice.",
    features: [
      "Per-device energy tracking: register appliances, set daily usage hours, and see live kWh and cost breakdowns",
      "Bill forecasting: projects the current month's total bill based on actual logged usage patterns",
      "GPT-powered saving recommendations: household usage data is passed as context so tips are specific and actionable",
      "Multi-user data isolation via Supabase row-level security -each household's data is strictly scoped",
      "TypeScript-first codebase (~98.5%) with a Jest unit-test suite covering core energy calculation logic",
      "Production deployment on Vercel with environment-scoped secrets and zero-downtime redeployments",
    ],
    role: "Solo engineer -architecture, full-stack implementation (Next.js API routes + Supabase), OpenAI integration, testing, and deployment.",
  },
];

const ROLES = [
  {
    title: "AI / LLM Application Engineer",
    why: "I ship production LLM features: RAG, agents, structured outputs, evals, and faithfulness guards.",
    icon: "🤖",
  },
  {
    title: "Full-Stack Engineer (AI products)",
    why: "I build the whole product -Next.js + FastAPI/Node -not just the model layer.",
    icon: "⚡",
  },
  {
    title: "GenAI Product Engineer",
    why: "I turn raw LLM capability into trustworthy, user-facing features.",
    icon: "🎯",
  },
  {
    title: "Founding / Early-Stage Engineer",
    why: "I take ambiguous problems to shipped, end-to-end products fast -four built solo or as lead.",
    icon: "🚀",
  },
];

/* ─── components ─────────────────────────────────────────────── */

function Badge({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors ${
        accent
          ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
          : "bg-secondary text-muted-foreground border border-border"
      }`}
    >
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-14">
      <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 font-inter">{eyebrow}</p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-sora leading-tight">{title}</h2>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: (typeof PROJECTS)[0]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-t-3xl md:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border px-8 py-5 flex items-center justify-between z-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">{project.eyebrow}</p>
            <h3 className="text-xl font-bold font-sora text-foreground">{project.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="px-8 py-7 space-y-8">
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Overview</p>
            <p className="text-foreground/90 leading-relaxed">{project.overview}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">The Problem</p>
              <p className="text-foreground/80 text-sm leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">The Solution</p>
              <p className="text-foreground/80 text-sm leading-relaxed">{project.solution}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Key Features</p>
            <ul className="space-y-2">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                  <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => <Badge key={t}>{t}</Badge>)}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">My Role</p>
            <p className="text-foreground/80 text-sm">{project.role}</p>
          </div>
          <div className="flex gap-3 pt-2">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                <Github size={14} /> GitHub
              </a>
            )}
            {project.github === "#" && (
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground">
                <Github size={14} /> Private / available on request
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── main ───────────────────────────────────────────────────── */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeModal, setActiveModal] = useState<(typeof PROJECTS)[0] | null>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Areeha Zulfiqar Chaudhary - AI & Full-Stack Engineer";

    const meta: Record<string, string> = {
      description: "AI & Full-Stack Engineer specialising in LLM applications, RAG, and AI agents. Four AI products shipped end-to-end. Based in Lahore, Pakistan.",
      "og:type": "website",
      "og:url": "https://areeha-portfolio.vercel.app",
      "og:title": "Areeha Zulfiqar Chaudhary - AI & Full-Stack Engineer",
      "og:description": "AI & Full-Stack Engineer specialising in LLM applications, RAG, and AI agents. Four AI products shipped end-to-end. Based in Lahore, Pakistan.",
      "og:site_name": "Areeha Zulfiqar Chaudhary",
      "twitter:card": "summary_large_image",
      "twitter:title": "Areeha Zulfiqar Chaudhary - AI & Full-Stack Engineer",
      "twitter:description": "AI & Full-Stack Engineer specialising in LLM applications, RAG, and AI agents. Four AI products shipped end-to-end.",
    };

    Object.entries(meta).forEach(([key, content]) => {
      const attr = key.startsWith("og:") || key.startsWith("twitter:") ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    });

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://areeha-portfolio.vercel.app");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Blob parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      blobRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("zulfiqarareeha06@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="bg-background text-foreground font-inter min-h-screen antialiased selection:bg-indigo-100 selection:text-indigo-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        .font-sora { font-family: 'Sora', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        @keyframes blob-pulse {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-blob { animation: blob-pulse 7s ease-in-out infinite; }
        .animate-fade-up { animation: fade-up 0.7s ease both; }
        .animate-fade-up-1 { animation: fade-up 0.7s 0.1s ease both; }
        .animate-fade-up-2 { animation: fade-up 0.7s 0.2s ease both; }
        .animate-fade-up-3 { animation: fade-up 0.7s 0.3s ease both; }
        .animate-fade-up-4 { animation: fade-up 0.7s 0.4s ease both; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-blob, .animate-fade-up, .animate-fade-up-1, .animate-fade-up-2,
          .animate-fade-up-3, .animate-fade-up-4, .animate-float { animation: none; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(79,70,229,0.25); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(79,70,229,0.5); }
        .arch-arrow::after {
          content: '';
          position: absolute;
          right: -8px; top: 50%; transform: translateY(-50%);
          border-left: 8px solid #e2e2e8;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
        }
      `}</style>

      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur border-b border-border shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-sora font-bold text-lg tracking-tight text-foreground hover:text-primary transition-colors"
          >
            AZ
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {[["Work", "work"], ["About", "about"], ["Skills", "skills"], ["Contact", "contact"]].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <a
              href={resumePdf}
              download="Areeha-Zulfiqar-Resume.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium border border-border rounded-lg text-foreground hover:bg-secondary hover:border-foreground/20 transition-all"
            >
              <Download size={13} /> Resume
            </a>
          </nav>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur border-b border-border px-6 py-5 space-y-4">
            {[["Work", "work"], ["About", "about"], ["Skills", "skills"], ["Contact", "contact"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="block w-full text-left text-base font-medium text-foreground py-1.5">
                {label}
              </button>
            ))}
            <a href="#" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-border rounded-lg">
              <Download size={13} /> Resume
            </a>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "#0E0F14" }}
      >
        {/* Animated blob */}
        <div
          ref={blobRef}
          className="animate-blob pointer-events-none absolute right-[5%] top-[15%] w-[520px] h-[520px] opacity-[0.12] transition-transform duration-700 ease-out"
          style={{ background: "radial-gradient(circle at 40% 40%, #4F46E5 0%, #7C3AED 40%, #0E0F14 80%)" }}
        />
        {/* Fine grid overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
          <div className="animate-fade-up mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border"
              style={{ borderColor: "rgba(79,70,229,0.4)", color: "#818CF8", background: "rgba(79,70,229,0.08)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to AI Engineer / Full-Stack roles
            </span>
          </div>

          <h1
            className="animate-fade-up-1 font-sora font-extrabold leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", color: "#F5F5F3", maxWidth: "860px" }}
          >
            I build AI products that are grounded,{" "}
            <span style={{ color: "#818CF8" }}>not guessed</span>
            {" "}- RAG, agents, and the full-stack to ship them.
          </h1>

          <p className="animate-fade-up-2 text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
            style={{ color: "rgba(245,245,243,0.55)" }}>
            Software engineer specialising in LLM applications -RAG, AI agents, evaluation harnesses -with
            production full-stack experience and four AI products built end to end.
          </p>

          <div className="animate-fade-up-3 flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() => scrollTo("work")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: "#4F46E5" }}
            >
              View Work <ArrowRight size={15} />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
              style={{ color: "#F5F5F3", border: "1px solid rgba(245,245,243,0.15)", background: "transparent" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,245,243,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Get in touch
            </button>
          </div>

          <div className="animate-fade-up-4 flex items-center gap-5">
            <a href="https://github.com/Areeha2004" target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg transition-all hover:-translate-y-0.5"
              style={{ color: "rgba(245,245,243,0.45)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F3")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,243,0.45)")}
              aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/areehazulfiqar" target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg transition-all hover:-translate-y-0.5"
              style={{ color: "rgba(245,245,243,0.45)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F3")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,243,0.45)")}
              aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <button onClick={copyEmail}
              className="p-2 rounded-lg transition-all hover:-translate-y-0.5"
              style={{ color: "rgba(245,245,243,0.45)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F3")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,243,0.45)")}
              aria-label="Copy email">
              {copied ? <Check size={20} className="text-emerald-400" /> : <Mail size={20} />}
            </button>
            <span className="text-xs" style={{ color: "rgba(245,245,243,0.2)" }}>·</span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(245,245,243,0.35)" }}>
              <MapPin size={12} /> Lahore, Pakistan
            </span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-px h-10 mx-auto" style={{ background: "linear-gradient(to bottom, rgba(245,245,243,0.3), transparent)" }} />
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader eyebrow="About me" title="Technical by trade,\npragmatic by design." />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_320px] gap-12 lg:gap-16">
            <p className="text-lg leading-[1.8] text-foreground/75 max-w-xl">
              {"I'm Areeha -an AI & Full-Stack Engineer based in Lahore. I build AI-powered products end to end: from RAG pipelines, LLM agents, and evaluation harnesses to the Next.js / FastAPI systems that serve them. My guiding principle is simple -the LLM writes the words, deterministic code makes the decisions -so what I ship is grounded and trustworthy, not just an impressive demo. I completed my BS in Software Engineering at PUCIT in 2026, work part-time shipping production full-stack apps, and have built four AI projects from scratch."}
            </p>
            <div className="hidden lg:block bg-border" />
            <div className="grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
              {STATS.map((s) => (
                <div key={s.label} className="bg-card px-5 py-6">
                  <p className="font-sora font-bold text-2xl text-foreground mb-1">{s.value}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader eyebrow="Capabilities" title="Skills & tools." />
          <div className="space-y-10">
            {SKILL_GROUPS.map((g) => (
              <div
                key={g.label}
                className={`p-7 rounded-2xl border bg-card transition-all ${
                  g.accent ? "border-indigo-200 shadow-[inset_0_0_0_1px_rgba(79,70,229,0.12)]" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <p className={`text-sm font-semibold font-sora ${g.accent ? "text-primary" : "text-foreground"}`}>{g.label}</p>
                  {g.accent && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-indigo-50 text-indigo-600 border border-indigo-200">
                      Primary
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <Badge key={s} accent={g.accent}>{s}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured: Roamio ── */}
      <section id="work" className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader eyebrow="Featured project" title="Roamio." />

          <div className="rounded-3xl border border-border overflow-hidden bg-card shadow-lg">
            {/* Hero band */}
            <div className="px-8 pt-10 pb-8 border-b border-border" style={{ background: "linear-gradient(135deg, #0E0F14 0%, #1a1b2e 100%)" }}>
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#818CF8" }}>
                    AI Trip Planner for Northern Pakistan
                  </p>
                  <h3 className="font-sora font-extrabold text-3xl md:text-4xl tracking-tight mb-3" style={{ color: "#F5F5F3" }}>
                    The LLM writes words.<br />Code makes the decisions.
                  </h3>
                  <p className="text-base leading-relaxed max-w-lg" style={{ color: "rgba(245,245,243,0.6)" }}>
                    A RAG + agent travel planner that turns a few constraints into a grounded, day-by-day itinerary -
                    a sensible route, realistic costs, seasonal feasibility, permit notes, and live road/weather conditions.
                  </p>
                </div>
                <div className="flex gap-3">
                  <a href="https://roamioagent.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                    style={{ background: "#4F46E5", color: "#fff" }}>
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a href="https://github.com/Areeha2004/roamio-agent" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all hover:opacity-80"
                    style={{ borderColor: "rgba(245,245,243,0.2)", color: "#F5F5F3", background: "rgba(245,245,243,0.06)" }}>
                    <Github size={14} /> GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Architecture diagram */}
            <div className="px-8 py-8 border-b border-border bg-secondary/30">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5">Agent architecture</p>
              <div className="flex items-center gap-0 overflow-x-auto pb-2">
                {ROAMIO_STEPS.map((step, i) => (
                  <div key={step.id} className="flex items-center shrink-0">
                    <div className={`flex flex-col items-center px-5 py-4 rounded-xl border min-w-[110px] text-center transition-all hover:-translate-y-0.5 cursor-default ${
                      step.id === "replan"
                        ? "border-indigo-200 bg-indigo-50"
                        : "border-border bg-card"
                    }`}>
                      <p className={`text-xs font-bold mb-1 ${step.id === "replan" ? "text-primary" : "text-foreground"}`}>
                        {step.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-snug">{step.sub}</p>
                    </div>
                    {i < ROAMIO_STEPS.length - 1 && (
                      <div className="flex items-center px-1.5 shrink-0">
                        <div className="w-8 h-px bg-border relative" />
                        <ChevronRight size={14} className="text-muted-foreground -ml-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bullets + stack */}
            <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">Key engineering</p>
                <ul className="space-y-3">
                  {ROAMIO_BULLETS.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "React", "Tailwind", "FastAPI", "LangGraph", "LangChain", "Chroma", "OpenAI", "Tavily", "Supabase", "Vercel", "Render"].map((t) => (
                    <Badge key={t} accent>{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects grid ── */}
      <section className="py-20 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader eyebrow="More projects" title="Other things I've built." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveModal(p)}
                className="group text-left bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <p className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2">{p.eyebrow}</p>
                <h3 className="font-sora font-bold text-xl text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.oneliner}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.stack.slice(0, 4).map((t) => <Badge key={t}>{t}</Badge>)}
                  {p.stack.length > 4 && <Badge>+{p.stack.length - 4}</Badge>}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                  View details <ChevronRight size={13} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles ── */}
      <section className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader eyebrow="Where I add value" title="Roles I'm a strong fit for." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ROLES.map((r) => (
              <div key={r.title}
                className="group p-7 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all">
                <div className="text-2xl mb-4">{r.icon}</div>
                <h3 className="font-sora font-bold text-base text-foreground mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Contact</p>
            <h2 className="font-sora font-extrabold text-4xl md:text-5xl tracking-tight text-foreground mb-6 leading-tight">
              {"Let's build something\ngrounded."}
            </h2>
            <p className="text-foreground/60 leading-relaxed mb-10">
              {"I'm actively looking for AI / Full-Stack engineering roles. If you're building something real, I'd love to chat."}
            </p>
            <div className="space-y-4 mb-10">
              <button onClick={copyEmail}
                className="group flex items-center gap-3 w-full text-left px-5 py-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <p className="text-sm font-medium text-foreground truncate">zulfiqarareeha06@gmail.com</p>
                </div>
                {copied
                  ? <Check size={16} className="text-emerald-500 shrink-0" />
                  : <Copy size={14} className="text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                }
              </button>
              <a href="https://github.com/Areeha2004" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-5 py-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Github size={16} className="text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">GitHub</p>
                  <p className="text-sm font-medium text-foreground">github.com/Areeha2004</p>
                </div>
                <ExternalLink size={14} className="text-muted-foreground shrink-0" />
              </a>
              <a href="https://linkedin.com/in/areehazulfiqar" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-5 py-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Linkedin size={16} className="text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">LinkedIn</p>
                  <p className="text-sm font-medium text-foreground">linkedin.com/in/areehazulfiqar</p>
                </div>
                <ExternalLink size={14} className="text-muted-foreground shrink-0" />
              </a>
            </div>
            <a
              href={resumePdf}
              download="Areeha-Zulfiqar-Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-primary hover:opacity-90 hover:-translate-y-0.5 transition-all"
            >
              <Download size={14} /> Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8 bg-background">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-sora font-bold text-foreground">Areeha Zulfiqar Chaudhary</p>
          <p className="text-xs text-muted-foreground">© 2026 · All rights reserved</p>
          <nav className="flex items-center gap-5">
            {[["Work", "work"], ["About", "about"], ["Skills", "skills"], ["Contact", "contact"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {label}
              </button>
            ))}
          </nav>
        </div>
      </footer>

      {/* ── Project modal ── */}
      {activeModal && (
        <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
