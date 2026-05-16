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

export function TemplateCompact({ data }: { data: ResumeData }) {
  const skills = splitSkills(data.skills);
  const accent = TEMPLATE_ACCENT["compact"];

  return (
    <div className="bg-white text-black p-6 text-[13px]" style={{ ["--accent" as any]: accent }}>
      <div className="border-b pb-2">
        <h1 className="text-xl font-bold">{data.fullName}</h1>
        <p className="text-xs text-gray-700">{data.headline}</p>
        <div className="mt-3 h-1 w-16 rounded" style={{ background: "var(--accent)" }} />
        <ContactLine data={data} />
      </div>

      <div className="mt-4">
        <SectionTitle>Summary</SectionTitle>
        <Paragraph text={data.summary} />
      </div>

      {skills.length ? (
        <div className="mt-4">
          <SectionTitle>Skills</SectionTitle>
          <p className="mt-2 text-sm text-gray-800">{skills.join(", ")}</p>
        </div>
      ) : null}

      {/* EXACT PLACE: skills ke baad */}
      <ExperienceSection data={data} />
      <EducationSection data={data} />
      <ProjectsSection data={data} />
    </div>
  );
}