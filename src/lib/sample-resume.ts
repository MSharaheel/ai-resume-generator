import { ResumeDataSchema } from "@/lib/resume-zod";

export const sampleResume = ResumeDataSchema.parse({
  fullName: "Alex Johnson",
  headline: "Frontend Developer (React / Next.js)",
  email: "alex.johnson@email.com",
  phone: "+1 555 0101",
  location: "New York, USA",
  linkedin: "linkedin.com/in/alexjohnson",
  website: "alexjohnson.dev",
  summary: "Frontend developer with 4+ years building high-performance web apps.",
  skills: "React, Next.js, TypeScript, Tailwind CSS",
  projects: [
  {
    name: "AI Resume Generator",
    link: "https://github.com/yourname/ai-resume-generator",
    dates: "2026",
    tech: "Next.js, TypeScript, Tailwind, Groq",
    description:
      "• Built a multi-template resume builder with AI assistance.\n• Added one-click PDF export and guest + account flows.",
  },
],

  // 👇 YE DUMMY DATA AB TEMPLATE MEIN SHOW HOGA
  experience: [
    {
      role: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      dates: "Jan 2022 — Present",
      description: "• Led a team of 5 developers to rebuild the company dashboard.\n• Improved page load speed by 40% using Next.js SSR.",
    },
    {
      role: "Web Developer",
      company: "Creative Agency",
      dates: "Jun 2020 — Dec 2021",
      description: "• Developed responsive websites for 20+ clients using React and Tailwind.",
    }
  ],

  education: [
    {
      degree: "BS Computer Science",
      school: "University of Technology",
      dates: "2016 — 2020",
    }
  ],
});