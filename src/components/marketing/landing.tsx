"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useUser, UserButton } from "@clerk/nextjs";
import {
  Sparkles,
  Shield,
  Zap,
  ArrowRight,
  Check,
  LayoutTemplate,
  Wand2,
  Download,
  Star,
  Quote,
  FileText,
  Lock,
  BarChart3,
  BadgeCheck,
  Rocket,
  ScanText,
  Mail,
  MapPin,
  Phone,
  Timer,
  Cpu,
  Globe,
  ChevronRight,
  Award,
  Layers,
} from "lucide-react";

import { TEMPLATE_META } from "@/templates/registry";
import { sampleResume } from "@/lib/sample-resume";
import { TemplatePreview } from "@/components/marketing/template-preview";

/* ------------------------------ motion utils ------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

function Counter({
  value,
  suffix = "",
  duration = 1.4,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (inView && ref.current && ref.current.dataset.done !== "1") {
    ref.current.dataset.done = "1";
    void animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        if (!ref.current) return;
        ref.current.textContent = Math.round(latest).toString();
      },
    });
  }

  return (
    <span className="tabular-nums font-monoish">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

/* ------------------------------ inline social ------------------------------ */

function SocialIcon({ type }: { type: "twitter" | "linkedin" | "github" | "instagram" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8 };
  const cls = "h-5 w-5";
  if (type === "twitter")
    return (
      <svg className={cls} viewBox="0 0 24 24" {...common}>
        <path d="M19.5 7.5c.01.17.01.35.01.52 0 5.3-4.03 11.4-11.4 11.4-2.27 0-4.38-.66-6.15-1.8.31.04.62.05.95.05 1.88 0 3.61-.64 4.98-1.72-1.75-.03-3.23-1.19-3.74-2.78.24.04.48.07.74.07.35 0 .71-.05 1.04-.14-1.83-.37-3.21-1.98-3.21-3.91v-.05c.54.3 1.16.49 1.82.51C3.52 9.48 2.9 8.52 2.9 7.41c0-.7.19-1.36.52-1.93 1.98 2.43 4.95 4.02 8.29 4.19-.06-.29-.1-.58-.1-.88 0-2.12 1.72-3.84 3.84-3.84 1.1 0 2.1.46 2.8 1.2.87-.17 1.69-.49 2.43-.93-.29.9-.9 1.65-1.69 2.13.77-.09 1.51-.29 2.2-.6-.52.77-1.17 1.45-1.93 1.99Z" />
      </svg>
    );
  if (type === "linkedin")
    return (
      <svg className={cls} viewBox="0 0 24 24" {...common}>
        <path d="M4.5 4.5h15v15h-15z" />
        <path d="M7 10v7M7 7h0.01M10 10v7m0-4c0-1.66 1.34-3 3-3s3 1.34 3 3v4" />
      </svg>
    );
  if (type === "github")
    return (
      <svg className={cls} viewBox="0 0 24 24" {...common}>
        <path d="M9 19c-4 1.5-4-2.5-5-3m10 6v-3.5c0-1 .1-1.4-.5-2 1.8-.2 3.7-.9 3.7-4 0-.9-.3-1.7-.9-2.3.1-.2.4-1.1-.1-2.2 0 0-.7-.2-2.2.9-.7-.2-1.5-.3-2.3-.3s-1.6.1-2.3.3C7.9 7 7.2 7.2 7.2 7.2c-.5 1.1-.2 2-.1 2.2-.6.6-.9 1.4-.9 2.3 0 3.1 1.9 3.8 3.7 4-.4.4-.6 1-.5 2V22" />
      </svg>
    );
  return (
    <svg className={cls} viewBox="0 0 24 24" {...common}>
      <path d="M7 7h10v10H7z" />
      <path d="M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5Z" />
      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M17.5 6.5h0.01" />
    </svg>
  );
}

/* ------------------------------ background (lots of motion) ------------------------------ */

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-[#05040f]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0920] via-[#05040f] to-black" />

      {/* multiple orbs */}
      <motion.div
        className="absolute -top-48 -left-48 h-[56rem] w-[56rem] rounded-full blur-3xl opacity-45"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.45) 0%, transparent 70%)" }}
        animate={{ x: [0, 140, 0], y: [0, 80, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 -right-56 h-[62rem] w-[62rem] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 72%)" }}
        animate={{ x: [0, -170, 0], y: [0, 110, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-26rem] left-1/4 h-[62rem] w-[62rem] rounded-full blur-3xl opacity-35"
        style={{ background: "radial-gradient(circle, rgba(255,77,148,0.40) 0%, transparent 72%)" }}
        animate={{ x: [0, 160, 0], y: [0, -120, 0], scale: [1, 1.22, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20rem] right-1/4 h-[54rem] w-[54rem] rounded-full blur-3xl opacity-35"
        style={{ background: "radial-gradient(circle, rgba(255,166,0,0.35) 0%, transparent 72%)" }}
        animate={{ x: [0, -120, 0], y: [0, -90, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* rotating ring */}
      <motion.div
        className="absolute left-1/2 top-56 h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />

      {/* moving shine sweeps */}
      <motion.div
        className="absolute -inset-x-60 top-28 h-44 rotate-6 bg-gradient-to-r from-transparent via-white/8 to-transparent blur-2xl"
        animate={{ x: [-300, 1800] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-x-60 top-[520px] h-32 -rotate-6 bg-gradient-to-r from-transparent via-white/7 to-transparent blur-2xl"
        animate={{ x: [1800, -300] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* particles */}
      {Array.from({ length: 36 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/20"
          style={{
            left: `${(i * 9 + 8) % 96}%`,
            top: `${(i * 13 + 14) % 92}%`,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.12, 0.55, 0.12], scale: [1, 1.6, 1] }}
          transition={{ duration: 3.2 + (i % 6), repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
        />
      ))}

      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />
    </div>
  );
}

/* ------------------------------ template preview (equal) ------------------------------ */

function TemplateThumb({ templateId }: { templateId: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-130px" });

  // fixed equal frame
  const frameH = 360;
  const scale = 0.46;

  return (
    <div ref={wrapRef} className="w-full rounded-xl border border-white/10 bg-black/25 overflow-hidden" style={{ height: frameH }}>
      <div className="h-full w-full bg-white relative overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-black/6 via-black/0 to-black/6" />
        {inView ? (
          <div
            className="absolute left-1/2 top-0 origin-top"
            style={{
              width: 900,
              padding: 16,
              transform: `translateX(-50%) scale(${scale})`,
            }}
          >
            <TemplatePreview templateId={templateId} data={sampleResume} />
          </div>
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>
  );
}

/* ------------------------------ big sections ------------------------------ */

function Section({
  id,
  kicker,
  title,
  desc,
  children,
}: {
  id?: string;
  kicker: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-20">
      <FadeIn>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-[#00E5FF] mb-3 font-monoish">{kicker}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-display">{title}</h2>
          <p className="text-lg text-white/70 font-body">{desc}</p>
        </div>
      </FadeIn>
      {children}
    </section>
  );
}

/* ------------------------------ page ------------------------------ */

export default function Landing() {
  const { isLoaded, isSignedIn } = useUser();
  const featured = useMemo(() => TEMPLATE_META.slice(0, 9), []);

  const reviews = [
    { name: "Sarah Chen", role: "Product Manager", text: "AI bullets sounded like my voice. 3 interviews in one week.", stars: 5 },
    { name: "Marcus Johnson", role: "Senior Developer", text: "Projects section + AI bullets is a game changer for tech roles.", stars: 5 },
    { name: "Priya Patel", role: "Marketing Director", text: "Switched templates multiple times—zero data loss. Smooth.", stars: 5 },
    { name: "James Wilson", role: "Data Scientist", text: "ATS-ready structure helped me pass filters instantly.", stars: 5 },
    { name: "Emma Rodriguez", role: "UX Designer", text: "Templates look premium, not generic. Love the visuals.", stars: 5 },
    { name: "David Kim", role: "Software Engineer", text: "Created multiple versions quickly—workflow is excellent.", stars: 5 },
    { name: "Lisa Thompson", role: "HR Consultant", text: "I recommend it to clients. The content polish is strong.", stars: 5 },
    { name: "Ahmed Hassan", role: "Full Stack Dev", text: "High contrast UI + PDF export looks very professional.", stars: 5 },
    { name: "Jennifer Liu", role: "Product Designer", text: "From blank to polished resume in minutes. Unreal speed.", stars: 5 },
  ];

  const faqs = [
    { q: "Is it free?", a: "Yes. Guest mode is free. Account mode lets you save and export PDF." },
    { q: "Do I need to sign up to use it?", a: "No. You can start in guest mode, then sign up anytime." },
    { q: "Will AI invent my phone/location?", a: "No. Contact fields are never invented; they stay empty unless provided." },
    { q: "Can I switch templates after writing content?", a: "Yes. Templates only change the design; your data stays the same." },
    { q: "Is it ATS-friendly?", a: "Yes. Templates are structured for readability and ATS parsing." },
    { q: "Can I generate a full resume with AI?", a: "Yes. Enter job title + skills (+ optional JD) and generate." },
    { q: "Can AI write experience bullets?", a: "Yes. It generates realistic bullets based on role/company/skills." },
    { q: "Can AI improve education formatting?", a: "Yes. It standardizes degree/school/dates professionally." },
    { q: "Can I add projects and portfolio?", a: "Yes. Projects section supports AI bullets and tech stack." },
    { q: "How does PDF export work?", a: "Account resumes: direct PDF download. Guest: print-to-PDF." },
    { q: "Is my data secure?", a: "Account mode uses Clerk auth + DB storage. Guest stays in browser." },
    { q: "Does it work on mobile?", a: "Yes, the landing is responsive. Builder works best on desktop." },
    { q: "Can I create multiple resumes?", a: "Yes. Dashboard supports multiple resumes per user." },
    { q: "Can I tailor for a job description?", a: "Yes. Full generator accepts optional job description." },
    { q: "Can I share my resume link?", a: "Optional feature (we can add share links next if you want)." },
  ];

  const stats = [
    { label: "Templates", value: Math.max(TEMPLATE_META.length, 12), suffix: "+" },
    { label: "AI actions", value: 14, suffix: "+" },
    { label: "Resumes today", value: 10, suffix: "+" },
    { label: "Build time", value: 5, suffix: " min" },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden font-body">
      <AnimatedBackground />

      {/* announcement bar */}
      <div className="w-full bg-gradient-to-r from-[#00E5FF]/20 via-[#A855F7]/20 to-[#FF4D94]/20 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-2 text-xs text-white/70 flex items-center justify-between">
          <span className="font-monoish">New: Full Resume Generator + Projects AI + PDF Export</span>
          <span className="hidden md:block font-monoish">Built for a professional portfolio project</span>
        </div>
      </div>

      {/* header / nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/25 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#A855F7] flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#FF4D94] bg-clip-text text-transparent">
              ResumeForge
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm text-white/75">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#beyond" className="hover:text-white">Beyond</a>
            <a href="#templates" className="hover:text-white">Templates</a>
            <a href="#today" className="hover:text-white">Today</a>
            <a href="#reviews" className="hover:text-white">Reviews</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            {!isLoaded ? null : isSignedIn ? (
              <>
                <Link href="/app" className="px-4 py-2 rounded-lg border border-white/20 text-sm hover:bg-white/10 transition">
                  Dashboard
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/sign-in" className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white transition">
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#FF4D94] text-black font-bold text-sm hover:opacity-90 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.85 }}>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold font-monoish">
                <Zap className="mr-2 h-3 w-3" /> AI-Powered
              </span>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold font-monoish">
                <Shield className="mr-2 h-3 w-3" /> ATS-Friendly
              </span>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold font-monoish">
                <Download className="mr-2 h-3 w-3" /> PDF Export
              </span>
            </div>

            <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-tight font-display">
              Create{" "}
              <span className="bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#FF4D94] bg-clip-text text-transparent">
                premium resumes
              </span>{" "}
              in minutes.
            </h1>

            <p className="mt-6 text-xl text-white/70 max-w-lg">
              Experience, Education, Projects, AI improvements, template switching and PDF export — in a product-level workflow.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/builder/new"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#FF4D94] text-black font-bold text-lg hover:opacity-95 transition flex items-center"
              >
                Build Free Resume
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/templates"
                className="px-8 py-4 rounded-xl border-2 border-white/20 font-semibold text-lg hover:bg-white/10 transition"
              >
                View Templates
              </Link>
            </div>

            <div className="mt-8 grid gap-2 text-sm text-white/70">
              {[
                "Guest + Account mode",
                "AI: summary, experience, education, projects",
                "Contact fields never hallucinated",
                "Export A4 PDF",
              ].map((t) => (
                <div key={t} className="flex gap-2">
                  <Check className="h-4 w-4 text-emerald-300 mt-0.5" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* preview */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.85, delay: 0.15 }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#FF4D94] rounded-3xl blur-3xl opacity-30" />
              <div className="relative rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-white/80">Live Preview</span>
                  <span className="text-xs font-semibold text-black bg-gradient-to-r from-[#00E5FF] to-[#A855F7] px-3 py-1 rounded-full font-monoish">
                    Real-time
                  </span>
                </div>
                <TemplateThumb templateId={featured[0]?.id ?? "classic-ats"} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* stats row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <FadeIn key={s.label} delay={idx * 0.06}>
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                <div className="text-2xl font-bold">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-white/60 font-monoish">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Way beyond */}
      <Section
        id="beyond"
        kicker="Way beyond a resume builder..."
        title="A complete career toolkit"
        desc="Not just templates — AI polish, ATS structure, portfolio projects, versioning flow, and export."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Wand2 className="h-7 w-7" />, title: "AI Writing Suite", desc: "Improve summary, generate bullets, standardize education, project highlights." },
            { icon: <ScanText className="h-7 w-7" />, title: "ATS-First Layout", desc: "Clean typography, readable structure, consistent sections for parsing." },
            { icon: <Rocket className="h-7 w-7" />, title: "Role Targeting", desc: "Job title + skills + optional JD → generate full resume draft." },
            { icon: <Layers className="h-7 w-7" />, title: "Template System", desc: "Switch templates instantly without losing your content." },
            { icon: <Download className="h-7 w-7" />, title: "Export Workflow", desc: "Account direct PDF. Guest print-to-PDF supported." },
            { icon: <Lock className="h-7 w-7" />, title: "Secure Accounts", desc: "Clerk auth + DB storage, guest data stays in browser." },
          ].map((x, i) => (
            <FadeIn key={x.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 transition">
                <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-4">
                  {x.icon}
                </div>
                <h3 className="text-lg font-bold">{x.title}</h3>
                <p className="mt-2 text-white/70">{x.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section
        id="features"
        kicker="Features"
        title="Resume features that recruiters care about"
        desc="Everything needed to build, improve and export a professional resume."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <LayoutTemplate className="h-6 w-6" />, title: "10+ Templates", desc: "Modern + creative options" },
            { icon: <Wand2 className="h-6 w-6" />, title: "Improve Summary", desc: "ATS-friendly rewrite" },
            { icon: <BadgeCheck className="h-6 w-6" />, title: "Education Improve", desc: "Standard formatting" },
            { icon: <BarChart3 className="h-6 w-6" />, title: "Full Generator", desc: "Job title + skills + JD" },
            { icon: <FileText className="h-6 w-6" />, title: "Projects Portfolio", desc: "AI bullets + tech stack" },
            { icon: <Shield className="h-6 w-6" />, title: "ATS Structure", desc: "Readable & parseable" },
            { icon: <Download className="h-6 w-6" />, title: "PDF Export", desc: "Account 1-click PDF" },
            { icon: <Globe className="h-6 w-6" />, title: "Share/Deploy ready", desc: "Professional web app flow" },
          ].map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.05}>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00E5FF]/50 hover:bg-white/10 transition">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#00E5FF]/15 to-[#FF4D94]/15 border border-white/10 flex items-center justify-center text-[#00E5FF] mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-sm text-white/60">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Today */}
      <Section
        id="today"
        kicker="Live Activity"
        title="10+ resumes created today"
        desc="Real-time activity style section (demo)."
      >
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-300 text-sm font-semibold mb-6 font-monoish">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            Live Now
          </div>

          <h3 className="text-4xl md:text-6xl font-bold mb-4 font-display">
            <span className="text-[#00E5FF]"><Counter value={10} suffix="+" /></span> created today
          </h3>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            People are actively building resumes using AI polish, templates, and PDF export.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-6 text-left">
            {[
              { v: "2.5x", l: "More interview calls" },
              { v: "5 min", l: "Average creation time" },
              { v: "98%", l: "ATS pass rate (demo)" },
            ].map((x) => (
              <div key={x.l} className="p-5 rounded-xl bg-black/30 border border-white/10">
                <div className="text-2xl font-bold text-[#FF4D94]">{x.v}</div>
                <div className="text-sm text-white/60 mt-1">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Templates */}
      <Section
        id="templates"
        kicker="Templates"
        title="Choose your perfect design"
        desc="Equal-height previews with fixed frame — no small/big cards."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.05}>
              <div className="group">
                <div className="relative mb-4 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#00E5FF]/50 transition duration-500">
                  <TemplateThumb templateId={t.id} />
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Link
                      href={`/builder/new?template=${t.id}`}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-black font-bold transform translate-y-4 group-hover:translate-y-0 transition"
                    >
                      Use Template
                    </Link>
                  </div>
                </div>
                <h3 className="font-bold text-lg">{t.name}</h3>
                <p className="text-sm text-white/60">{t.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Reviews (equal height) */}
      <Section
        id="reviews"
        kicker="Testimonials"
        title="Loved by job seekers worldwide"
        desc="9 reviews (demo). Cards are equal height."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {reviews.map((r, i) => (
            <FadeIn key={r.name} delay={i * 0.04}>
              <div className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: r.stars }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="text-white/90 flex-grow min-h-[90px]">“{r.text}”</p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#FF4D94] flex items-center justify-center font-bold text-sm">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{r.name}</div>
                      <div className="text-xs text-white/60">{r.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* FAQ 15 */}
      <Section
        id="faq"
        kicker="FAQ"
        title="Frequently asked questions"
        desc="15 questions + answers."
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((x, i) => (
            <FadeIn key={x.q} delay={i * 0.03}>
              <details className="group rounded-xl bg-white/5 border border-white/10 open:bg-white/10 transition">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold">
                  {x.q}
                  <ChevronRight className="h-5 w-5 group-open:rotate-90 transition" />
                </summary>
                <div className="px-6 pb-6 text-white/70">{x.a}</div>
              </details>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Footer upgraded */}
      <footer className="border-t border-white/10 bg-black/55 backdrop-blur-lg pt-16 pb-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 font-display font-bold text-xl mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#A855F7] flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#FF4D94] bg-clip-text text-transparent">
                  ResumeForge
                </span>
              </div>
              <p className="text-white/60 text-sm mb-5">
                AI resume builder with ATS templates, projects portfolio, and PDF export.
              </p>

              <div className="flex gap-3">
                {(["twitter", "linkedin", "github", "instagram"] as const).map((t) => (
                  <a key={t} href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                    <SocialIcon type={t} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[#00E5FF]">Product</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/templates" className="hover:text-white transition">Templates</Link></li>
                <li><Link href="/builder/new" className="hover:text-white transition">Resume Builder</Link></li>
                <li><Link href="/app" className="hover:text-white transition">Dashboard</Link></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[#FF4D94]">Features</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#features" className="hover:text-white transition">AI Improve</a></li>
                <li><a href="#beyond" className="hover:text-white transition">Career Toolkit</a></li>
                <li><a href="#templates" className="hover:text-white transition">Template Switching</a></li>
                <li><a href="#today" className="hover:text-white transition">Live Activity</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[#FFA600]">Contact</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> toppercheez@gmail.com</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +92 3070780607</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> MehmoodAbad Colony Multan</li>
              </ul>

              <div className="mt-5 p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-white/60 mb-2 font-monoish">Newsletter</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm focus:outline-none focus:border-[#00E5FF]"
                  />
                  <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#FF4D94] text-black font-bold text-sm hover:opacity-90 transition">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>© {new Date().getFullYear()} ResumeForge AI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}