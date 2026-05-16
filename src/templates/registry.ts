import type { TemplateId } from "./template-ids";
import type { ResumeData } from "@/lib/resume-zod";

import { TemplateClassicATS } from "./t-classic-ats";
import { TemplateModernATS } from "./t-modern-ats";
import { TemplateExecutive } from "./t-executive";
import { TemplateSidebar } from "./t-sidebar";
import { TemplateMinimal } from "./t-minimal";
import { TemplateTech } from "./t-tech";
import { TemplateElegant } from "./t-elegant";
import { TemplateCompact } from "./t-compact";
import { TemplateCreative } from "./t-creative";
import { TemplateBold } from "./t-bold";
import { TemplateSamiraDark } from "./t-samira-dark";

export type TemplateMeta = {
  id: TemplateId;
  name: string;
  description: string;
};

export const TEMPLATE_META: TemplateMeta[] = [
  { id: "classic-ats", name: "Classic ATS", description: "Clean, ATS-friendly single column." },
  { id: "modern-ats", name: "Modern ATS", description: "Modern header, still ATS-safe." },
  { id: "executive", name: "Executive", description: "Strong typography for senior roles." },
  { id: "sidebar", name: "Sidebar", description: "Two-column layout with sidebar." },
  { id: "minimal", name: "Minimal", description: "Minimal and elegant whitespace." },
  { id: "tech", name: "Tech", description: "Great for engineering profiles." },
  { id: "elegant", name: "Elegant", description: "Serif accent, premium look." },
  { id: "compact", name: "Compact", description: "Tight 1-page feel." },
  { id: "creative", name: "Creative", description: "Modern gradient header." },
  { id: "bold", name: "Bold", description: "Black sidebar with high contrast." },
  { id: "samira-dark", name: "Samira Dark (Premium)", description: "Bold header + 2-column designer style." },
];

export const TEMPLATE_COMPONENTS: Record<
  TemplateId,
  React.ComponentType<{ data: ResumeData }>
> = {
  "classic-ats": TemplateClassicATS,
  "modern-ats": TemplateModernATS,
  executive: TemplateExecutive,
  sidebar: TemplateSidebar,
  minimal: TemplateMinimal,
  tech: TemplateTech,
  elegant: TemplateElegant,
  compact: TemplateCompact,
  creative: TemplateCreative,
  bold: TemplateBold,
  "samira-dark": TemplateSamiraDark,
};