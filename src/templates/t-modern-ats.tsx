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

export function TemplateModernATS({ data }: { data: ResumeData }) {
  const skills = splitSkills(data.skills);
  const accent = TEMPLATE_ACCENT["modern-ats"];

  return (
    <div className="bg-white text-black p-8" style={{ ["--accent" as any]: accent }}>
      <div className="pb-4 border-b">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{data.fullName}</h1>
            <p className="text-sm text-gray-700">{data.headline}</p>
            <div className="mt-3 h-1 w-16 rounded" style={{ background: "var(--accent)" }} />
          </div>
          <div className="h-1 w-24 bg-black" />
        </div>
        <ContactLine data={data} />
      </div>

      <div className="mt-5 grid gap-5">
        <section>
          <SectionTitle>Summary</SectionTitle>
          <Paragraph text={data.summary} />
        </section>

        {skills.length ? (
          <section>
            <SectionTitle>Core Skills</SectionTitle>
            <p className="mt-2 text-sm text-gray-800">{skills.join(" • ")}</p>
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