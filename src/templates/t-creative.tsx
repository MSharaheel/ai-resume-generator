import type { ResumeData } from "@/lib/resume-zod";
import {
  Paragraph,
  SectionTitle,
  splitSkills,
  ExperienceSection,
  EducationSection,
  ProjectsSection
} from "./shared";
import { TEMPLATE_ACCENT } from "./accent";

export function TemplateCreative({ data }: { data: ResumeData }) {
  const skills = splitSkills(data.skills);
  const accent = TEMPLATE_ACCENT["creative"];

  return (
    <div className="bg-white text-black" style={{ ["--accent" as any]: accent }}>
      <header className="p-8 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <h1 className="text-3xl font-bold">{data.fullName}</h1>
        <p className="text-sm text-gray-200">{data.headline}</p>
        <div className="mt-3 h-1 w-16 rounded" style={{ background: "var(--accent)" }} />
        <p className="text-xs text-gray-200 mt-2">
          {[data.email, data.phone, data.location].filter(Boolean).join(" • ")}
        </p>
      </header>

      <div className="p-8">
        <SectionTitle>Summary</SectionTitle>
        <Paragraph text={data.summary} />

        {skills.length ? (
          <div className="mt-5">
            <SectionTitle>Skills</SectionTitle>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="text-xs px-2 py-1 rounded bg-gray-100 border">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* EXACT PLACE: content ke end par */}
        <ExperienceSection data={data} />
        <EducationSection data={data} />
        <ProjectsSection data={data} />
      </div>
    </div>
  );
}