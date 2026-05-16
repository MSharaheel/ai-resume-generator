import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function normalizeBullets(text: string) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const bulletLines = lines.map((l) => (l.startsWith("•") ? l : `• ${l.replace(/^[-*]\s*/, "")}`));
  return bulletLines.join("\n");
}

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
    }

    const body = (await req.json()) as {
      name?: string;
      tech?: string;
      link?: string;
      current?: string;
      targetRole?: string;
    };

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `
Write 2–4 ATS-friendly resume bullet points for this project.

Rules:
- Each line must start with "• "
- Focus on impact, features, and technical decisions
- Keep realistic, no fake metrics
Return ONLY bullet list text.

Project name: ${body.name ?? ""}
Tech: ${body.tech ?? ""}
Link: ${body.link ?? ""}
Target role (optional): ${body.targetRole ?? ""}

Existing notes:
${body.current ?? ""}
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
    return NextResponse.json({ description: normalizeBullets(raw) });
  } catch (err) {
    console.error("AI generate-project error:", err);
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}