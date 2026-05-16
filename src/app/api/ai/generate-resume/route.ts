import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { ResumeDataSchema } from "@/lib/resume-zod";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function extractJson(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  const slice = text.slice(start, end + 1);
  try {
    return JSON.parse(slice);
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
    }

    const body = (await req.json()) as {
      fullName?: string;
      email?: string;

      // contact fields (IMPORTANT: do not hallucinate)
      phone?: string;
      location?: string;
      linkedin?: string;
      website?: string;

      jobTitle?: string;
      years?: string;
      skills?: string;
      jobDescription?: string;
    };

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `
Generate an ATS-friendly resume JSON for the given candidate details.

Return ONLY valid JSON (no markdown, no extra text).
Must match this shape:
{
  "fullName": string,
  "headline": string,
  "email": string,
  "phone": string,
  "location": string,
  "linkedin": string,
  "website": string,
  "summary": string,
  "skills": string,
  "experience": [
    { "role": string, "company": string, "dates": string, "description": string }
  ],
  "education": [
    { "degree": string, "school": string, "dates": string }
  ]
}

CRITICAL CONTACT RULES:
- Do NOT invent phone, location, linkedin, or website.
- Use the provided contact fields exactly as given.
- If any contact field is empty/missing, output an empty string "" for it.

CONTENT RULES:
- Professional English only
- Keep it realistic; don't invent huge metrics
- Experience description must be bullet points separated by \\n and each line starts with "• "
- Skills must be a comma-separated string

Candidate info:
Full name: ${body.fullName ?? ""}
Email: ${body.email ?? ""}

Provided contact fields (use exactly; otherwise empty):
Phone: ${body.phone ?? ""}
Location: ${body.location ?? ""}
LinkedIn: ${body.linkedin ?? ""}
Website: ${body.website ?? ""}

Target job title: ${body.jobTitle ?? ""}
Years of experience: ${body.years ?? ""}
Skills (raw): ${body.skills ?? ""}

Job description (optional):
${body.jobDescription ?? ""}
`.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are an expert resume writer." },
        { role: "user", content: prompt },
      ],
      temperature: 0.35,
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? "{}";
    const json = extractJson(text);

    if (!json) {
      return NextResponse.json({ error: "Could not parse AI JSON output" }, { status: 500 });
    }

    // Validate & fill defaults
    const parsed = ResumeDataSchema.parse(json);

    // HARD OVERRIDE contact fields so AI can't hallucinate them
    parsed.phone = (body.phone ?? "").trim();
    parsed.location = (body.location ?? "").trim();
    parsed.linkedin = (body.linkedin ?? "").trim();
    parsed.website = (body.website ?? "").trim();

    return NextResponse.json({ data: parsed });
  } catch (err: any) {
    console.error("AI generate-resume error:", err);
    return NextResponse.json(
      { error: "AI failed", details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}