import type { ResumeData } from "@/lib/resume-zod";
import type { TemplateId } from "./template-ids";
import { TEMPLATE_COMPONENTS } from "./registry";
import { TemplateClassicATS } from "./t-classic-ats";

export function TemplateRenderer({
  templateId,
  data,
}: {
  templateId: TemplateId;
  data: ResumeData;
}) {
  const Comp = TEMPLATE_COMPONENTS[templateId];

  // Safety fallback
  if (!Comp) return <TemplateClassicATS data={data} />;

  return <Comp data={data} />;
}