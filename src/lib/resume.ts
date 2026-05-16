import { ResumeDataSchema, type ResumeData } from "@/lib/resume-zod";
export type { ResumeData };

export const defaultResume: ResumeData = ResumeDataSchema.parse({
  fullName: "Your Name",
  headline: "Your Role / Title",
  email: "you@example.com",
  phone: "",
  location: "",
  linkedin: "",
  website: "",
  summary: "",
  skills: "Communication, Teamwork",
  projects: [],

  // 👇 YE DUMMY DATA BUILDER OPEN HOTE HI SHOW HOGA
  experience: [
    {
      role: "Your Job Title",
      company: "Company Name",
      dates: "2022 — Present",
      description: "Write your achievements here...\n• Increased sales by 20%\n• Managed a team of 3 people",
    }
  ],

  education: [
    {
      degree: "Your Degree (e.g., BS CS)",
      school: "University Name",
      dates: "2018 — 2022",
    }
  ],
});