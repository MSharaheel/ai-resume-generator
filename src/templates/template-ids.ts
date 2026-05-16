export const TEMPLATE_IDS = [
  "classic-ats",
  "modern-ats",
  "executive",
  "sidebar",
  "minimal",
  "tech",
  "elegant",
  "compact",
  "creative",
  "bold",
  "samira-dark",
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export function isTemplateId(x: string): x is TemplateId {
  return (TEMPLATE_IDS as readonly string[]).includes(x);
}