import { NextResponse } from "next/server";
import Groq from "groq-sdk";

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

    const body = (await req.json()) as { degree?: string; school?: string; dates?: string };

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `
Improve/standardize this education entry for an ATS-friendly resume.

Return ONLY valid JSON exactly in this shape:
{
  "degree": "...",
  "school": "...",
  "dates": "..."
}

Input:
degree: ${body.degree ?? ""}
school: ${body.school ?? ""}
dates: ${body.dates ?? ""}
`.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You write clean, ATS-friendly resumes." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? "{}";
    const parsed = extractJson(text) ?? {};

    return NextResponse.json({
      degree: String(parsed.degree ?? body.degree ?? ""),
      school: String(parsed.school ?? body.school ?? ""),
      dates: String(parsed.dates ?? body.dates ?? ""),
    });
  } catch (err) {
    console.error("AI improve-education error:", err);
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}