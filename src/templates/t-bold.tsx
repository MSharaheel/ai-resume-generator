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

export function TemplateBold({ data }: { data: ResumeData }) {
  const skills = splitSkills(data.skills);
  const accent = TEMPLATE_ACCENT["bold"];

  return (
    <div className="bg-white text-black p-0" style={{ ["--accent" as any]: accent }}>
      <div className="grid grid-cols-4 min-h-[900px]">
        <div className="col-span-1 bg-black text-white p-6">
          <p className="text-xs uppercase tracking-wide text-gray-300">Contact</p>
          <div className="mt-2 text-xs space-y-1">
            <div>{data.email}</div>
            {data.phone ? <div>{data.phone}</div> : null}
            {data.location ? <div>{data.location}</div> : null}
          </div>

          {skills.length ? (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-gray-300">Skills</p>
              <div className="mt-2 space-y-1 text-xs">
                {skills.map((s) => (
                  <div key={s}>• {s}</div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="col-span-3 p-8">
          <h1 className="text-3xl font-extrabold">{data.fullName}</h1>
          <p className="text-sm text-gray-700">{data.headline}</p>
          <div className="mt-3 h-1 w-16 rounded" style={{ background: "var(--accent)" }} />

          <div className="mt-6">
            <SectionTitle>Summary</SectionTitle>
            <Paragraph text={data.summary} />
          </div>

          {/* EXACT PLACE: main content ke andar */}
          <ExperienceSection data={data} />
          <EducationSection data={data} />
          <ProjectsSection data={data} />
        </div>
      </div>
    </div>
  );
}