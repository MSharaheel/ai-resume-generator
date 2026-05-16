import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function makeShareId() {
  return crypto.randomUUID().replace(/-/g, "");
}

export async function POST(req: Request, context: any) {
  try {
    const { id } = context.params;

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const resume = await prisma.resume.findUnique({
      where: { id },
    });

    if (!resume) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      );
    }

    const shareId = resume.shareId || makeShareId();

    const updated = await prisma.resume.update({
      where: { id },
      data: {
        shareId,
      },
    });

    return NextResponse.json({
      success: true,
      shareId: updated.shareId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}