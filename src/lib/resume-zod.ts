import { z } from "zod";

// 1. Pehle ProjectSchema define karo
const ProjectSchema = z.object({
  name: z.string().default(""),
  link: z.string().default(""),
  dates: z.string().default(""),
  description: z.string().default(""),
  tech: z.string().default(""),
});

// 2. Phir Experience aur Education schemas
const ExperienceSchema = z.object({
  role: z.string().default(""),
  company: z.string().default(""),
  dates: z.string().default(""),
  description: z.string().default(""),
});

const EducationSchema = z.object({
  degree: z.string().default(""),
  school: z.string().default(""),
  dates: z.string().default(""),
});

// 3. Ab ResumeDataSchema mein sab use karo
export const ResumeDataSchema = z.object({
  fullName: z.string().min(1),
  headline: z.string().optional().default(""),
  email: z.string().email(),

  phone: z.string().optional().default(""),
  location: z.string().optional().default(""),
  linkedin: z.string().optional().default(""),
  website: z.string().optional().default(""),

  summary: z.string().optional().default(""),
  skills: z.string().optional().default(""),

  experience: z.array(ExperienceSchema).default([]),
  education: z.array(EducationSchema).default([]),
  projects: z.array(ProjectSchema).default([]),   // ← ab sahi hai
});

export type ResumeData = z.infer<typeof ResumeDataSchema>;