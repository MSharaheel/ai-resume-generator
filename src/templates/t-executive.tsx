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

export function TemplateExecutive({ data }: { data: ResumeData }) {
  const skills = splitSkills(data.skills);
  const accent = TEMPLATE_ACCENT["executive"];

  return (
    <div className="bg-white text-black p-10" style={{ ["--accent" as any]: accent }}>
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">{data.fullName}</h1>
        <p className="mt-1 text-sm font-medium text-gray-700">{data.headline}</p>
        <div className="mt-3 h-1 w-16 rounded" style={{ background: "var(--accent)" }} />
        <ContactLine data={data} />
      </div>

      <div className="mt-6 border-t pt-5">
        <section>
          <SectionTitle>Professional Summary</SectionTitle>
          <Paragraph text={data.summary} />
        </section>

        {skills.length ? (
          <section className="mt-5">
            <SectionTitle>Key Skills</SectionTitle>
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
              {skills.map((s) => (
                <div key={s} className="text-gray-800">• {s}</div>
              ))}
            </div>
          </section>
        ) : null}

        {/* EXACT PLACE: skills ke baad */}
        <ExperienceSection data={data} />
        <EducationSection data={data} />
        <ProjectsSection data={data} />
      </div>
    </div>
  );
}