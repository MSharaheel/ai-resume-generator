import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { isTemplateId } from "@/templates/template-ids";

export const dynamic = "force-dynamic";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as { templateId?: string };
  if (!body.templateId || !isTemplateId(body.templateId)) {
    return NextResponse.json({ error: "Invalid templateId" }, { status: 400 });
  }

  const updated = await prisma.resume.updateMany({
    where: { id, userId },
    data: { templateId: body.templateId },
  });

  if (updated.count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}