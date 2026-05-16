import type { ResumeData } from "@/lib/resume-zod";
import {
  ContactLine,
  Paragraph,
  SectionTitle,
  splitSkills,
  ExperienceSection,
  EducationSection,
  ProjectsSection
} from "./shared";
import { TEMPLATE_ACCENT } from "./accent";

export function TemplateTech({ data }: { data: ResumeData }) {
  const skills = splitSkills(data.skills);
  const accent = TEMPLATE_ACCENT["tech"];

  return (
    <div className="bg-white text-black p-8" style={{ ["--accent" as any]: accent }}>
      <div className="flex items-start justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">{data.fullName}</h1>
          <p className="text-sm text-gray-700">{data.headline}</p>
          <div className="mt-3 h-1 w-16 rounded" style={{ background: "var(--accent)" }} />
          <ContactLine data={data} />
        </div>
        <div className="text-xs text-gray-500">ATS Friendly</div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <section>
          <SectionTitle>Summary</SectionTitle>
          <Paragraph text={data.summary} />
        </section>

        {skills.length ? (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="text-xs bg-gray-100 px-2 py-1 rounded border">
                  {s}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {/* EXACT PLACE: grid ke end mein */}
        <ExperienceSection data={data} />
        <EducationSection data={data} />
        <ProjectsSection data={data} />
      </div>
    </div>
  );
}