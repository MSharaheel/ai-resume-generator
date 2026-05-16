import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
    }

    const body = (await req.json()) as { summary?: string; headline?: string };
    const summary = (body.summary ?? "").trim();
    const headline = (body.headline ?? "").trim();

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `
Improve this resume summary for an ATS-friendly resume.

Rules:
- Professional English only
- 3–5 lines max
- No clichés (hardworking, passionate, etc.)
- Use impact-oriented wording, keep it realistic
Return ONLY the improved summary text. No headings, no quotes.

Role/Headline: ${headline || "N/A"}

Summary:
${summary || "N/A"}
`.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are an expert resume writer." },
        { role: "user", content: prompt },
      ],
      temperature: 0.35,
    });

    const improved = completion.choices[0]?.message?.content?.trim() ?? "";
    return NextResponse.json({ summary: improved });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}