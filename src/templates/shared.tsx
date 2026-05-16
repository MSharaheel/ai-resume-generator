import type { ResumeData } from "@/lib/resume-zod";

// ---------------------------------------------------------
// 1) Skills Helper
// ---------------------------------------------------------
export function splitSkills(skills?: string) {
  return (skills ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// ---------------------------------------------------------
// 2) Contact Line
// ---------------------------------------------------------
export function ContactLine({ data }: { data: ResumeData }) {
  const parts = [
    data.email,
    data.phone,
    data.location,
    data.linkedin,
    data.website,
  ].filter(Boolean);

  return <p className="text-xs text-gray-600 mt-1">{parts.join(" • ")}</p>;
}

// ---------------------------------------------------------
// 3) Section Title
// ---------------------------------------------------------
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-900">
      <span
        className="h-2 w-2 rounded-sm"
        style={{ background: "var(--accent)" }}
      />
      <span>{children}</span>
    </h3>
  );
}

// ---------------------------------------------------------
// 4) Paragraph
// ---------------------------------------------------------
export function Paragraph({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="mt-2 text-sm text-gray-800 whitespace-pre-wrap break-words">
      {text}
    </p>
  );
}

// ---------------------------------------------------------
// 5) Experience Section
// ---------------------------------------------------------
export function ExperienceSection({ data }: { data: ResumeData }) {
  if (!data.experience?.length) return null;

  return (
    <section className="mt-5">
      <SectionTitle>Experience</SectionTitle>
      <div className="mt-2 space-y-3">
        {data.experience.map((e, idx) => (
          <div key={idx}>
            <p className="text-sm font-semibold text-gray-900">
              {e.role || "Role"} {e.company ? `— ${e.company}` : ""}
            </p>
            {e.dates ? <p className="text-xs text-gray-600">{e.dates}</p> : null}
            {e.description ? (
              <p className="mt-1 text-sm text-gray-800 whitespace-pre-wrap break-words">
                {e.description}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// 6) Education Section
// ---------------------------------------------------------
export function EducationSection({ data }: { data: ResumeData }) {
  if (!data.education?.length) return null;

  return (
    <section className="mt-5">
      <SectionTitle>Education</SectionTitle>
      <div className="mt-2 space-y-2">
        {data.education.map((ed, idx) => (
          <div key={idx}>
            <p className="text-sm font-semibold text-gray-900">
              {ed.degree || "Degree"} {ed.school ? `— ${ed.school}` : ""}
            </p>
            {ed.dates ? <p className="text-xs text-gray-600">{ed.dates}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// 7) Projects Section
// ---------------------------------------------------------
export function ProjectsSection({ data }: { data: ResumeData }) {
  if (!data.projects?.length) return null;

  return (
    <section className="mt-5">
      <SectionTitle>Projects</SectionTitle>
      <div className="mt-2 space-y-3">
        {data.projects.map((p, idx) => (
          <div key={idx}>
            <p className="text-sm font-semibold text-gray-900">
              {p.name || "Project"} {p.link ? `— ${p.link}` : ""}
            </p>
            {p.dates ? <p className="text-xs text-gray-600">{p.dates}</p> : null}
            {p.tech ? <p className="text-xs text-gray-700 mt-1">Tech: {p.tech}</p> : null}
            {p.description ? (
              <p className="mt-1 text-sm text-gray-800 whitespace-pre-wrap break-words">
                {p.description}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}