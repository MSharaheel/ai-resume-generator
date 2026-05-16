import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function normalizeBullets(text: string) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // Ensure bullets
  const bulletLines = lines.map((l) => (l.startsWith("•") ? l : `• ${l.replace(/^[-*]\s*/, "")}`));
  return bulletLines.join("\n");
}

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
    }

    const body = (await req.json()) as {
      role?: string;
      company?: string;
      dates?: string;
      skills?: string;
      current?: string;
    };

    const role = (body.role ?? "").trim();
    const company = (body.company ?? "").trim();
    const dates = (body.dates ?? "").trim();
    const skills = (body.skills ?? "").trim();
    const current = (body.current ?? "").trim();

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `
Write 3–5 ATS-friendly resume bullet points for this work experience.

Rules:
- Each line must start with "• "
- Use action verbs + measurable impact where reasonable
- Do NOT invent unrealistic metrics
- Keep concise and professional
Return ONLY the bullet list text.

Role: ${role || "N/A"}
Company: ${company || "N/A"}
Dates: ${dates || "N/A"}
Skills: ${skills || "N/A"}

Existing notes (if any):
${current || "N/A"}
`.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are an expert resume writer." },
        { role: "user", content: prompt },
      ],
      temperature: 0.35,
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    const description = normalizeBullets(raw);

    return NextResponse.json({ description });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}