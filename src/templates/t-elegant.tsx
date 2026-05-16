import type { ResumeData } from "@/lib/resume-zod";
import {
  ContactLine,
  Paragraph,
  SectionTitle,
  ExperienceSection,
  EducationSection,
  ProjectsSection
} from "./shared";
import { TEMPLATE_ACCENT } from "./accent";

export function TemplateElegant({ data }: { data: ResumeData }) {
    const accent = TEMPLATE_ACCENT["elegant"];
  return (
    <div className="bg-white text-black p-10" style={{ ["--accent" as any]: accent }}>
      <h1
        className="text-3xl font-bold"
        style={{ fontFamily: "ui-serif, Georgia, serif" }}
      >
        {data.fullName}
      </h1>
      <p className="text-sm text-gray-700">{data.headline}</p>
      <div className="mt-3 h-1 w-16 rounded" style={{ background: "var(--accent)" }} />
      <ContactLine data={data} />

      <div className="mt-7">
        <SectionTitle>Summary</SectionTitle>
        <Paragraph text={data.summary} />
      </div>

      {/* EXACT PLACE: summary ke baad */}
      <ExperienceSection data={data} />
      <EducationSection data={data} />
      <ProjectsSection data={data} />
    </div>
  );
}