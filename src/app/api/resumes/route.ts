import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { ResumeDataSchema } from "@/lib/resume-zod";



const defaultData = ResumeDataSchema.parse({
  fullName: "Your Name",
  headline: "Your Role / Title",
  email: "you@example.com",
  summary: "",
  skills: "Communication, Teamwork",
});
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const resumes = await prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: { id: true, title: true, templateId: true, updatedAt: true },
    });

    return NextResponse.json({ resumes });
  } catch (error) {
    console.error("Auth Error:", error);
    return NextResponse.json({ error: "Auth Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as { templateId?: string };

  const templateId = body.templateId && isTemplateId(body.templateId)
    ? body.templateId
    : "classic-ats";

  const resume = await prisma.resume.create({
    data: {
      userId,
      title: "New Resume",
      templateId,
      data: defaultData,
    },
    select: { id: true },
  });

  return NextResponse.json({ id: resume.id });
}