import { defaultResume } from "@/lib/resume";
import { ResumeDataSchema, type ResumeData } from "@/lib/resume-zod";
import type { TemplateId } from "@/templates/template-ids";
import { isTemplateId } from "@/templates/template-ids";

const dataKey = (id: string) => `guest_resume_${id}`;
const templateKey = (id: string) => `guest_resume_template_${id}`;

export function createGuestResume(id: string, templateId: TemplateId = "classic-ats") {
  localStorage.setItem(dataKey(id), JSON.stringify(defaultResume));
  localStorage.setItem(templateKey(id), templateId);
}

export function loadGuestResume(id: string): ResumeData {
  const raw = localStorage.getItem(dataKey(id));
  if (!raw) return defaultResume;

  try {
    const obj = JSON.parse(raw);
    const parsed = ResumeDataSchema.safeParse(obj);
    return parsed.success ? parsed.data : defaultResume;
  } catch {
    return defaultResume;
  }
}

export function saveGuestResume(id: string, data: ResumeData) {
  localStorage.setItem(dataKey(id), JSON.stringify(data));
}

export function loadGuestTemplate(id: string): TemplateId {
  const raw = localStorage.getItem(templateKey(id));
  if (raw && isTemplateId(raw)) return raw;
  return "classic-ats";
}

export function saveGuestTemplate(id: string, templateId: TemplateId) {
  localStorage.setItem(templateKey(id), templateId);
}