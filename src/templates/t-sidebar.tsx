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

export function TemplateSidebar({ data }: { data: ResumeData }) {
  const skills = splitSkills(data.skills);
  const accent = TEMPLATE_ACCENT["sidebar"];

  return (
    <div className="bg-white text-black" style={{ ["--accent" as any]: accent }}>
      <div className="grid grid-cols-3 min-h-[900px]">
        <aside className="col-span-1 bg-gray-900 text-white p-6">
          <h1 className="text-xl font-bold">{data.fullName}</h1>
          <p className="text-xs text-gray-200 mt-1">{data.headline}</p>
          <div className="mt-3 h-1 w-16 rounded" style={{ background: "var(--accent)" }} />

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-200">Contact</p>
            <div className="mt-2 space-y-1 text-xs text-gray-100">
              <div>{data.email}</div>
              {data.phone ? <div>{data.phone}</div> : null}
              {data.location ? <div>{data.location}</div> : null}
              {data.linkedin ? <div>{data.linkedin}</div> : null}
              {data.website ? <div>{data.website}</div> : null}
            </div>
          </div>

          {skills.length ? (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-200">Skills</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="text-[11px] bg-white/10 px-2 py-1 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </aside>

        <main className="col-span-2 p-8">
          <section>
            <SectionTitle>Summary</SectionTitle>
            <Paragraph text={data.summary} />
          </section>

          {/* EXACT PLACE: main content ke andar (aside ke andar nahi) */}
          <ExperienceSection data={data} />
          <EducationSection data={data} />
          <ProjectsSection data={data} />
        </main>
      </div>
    </div>
  );
}