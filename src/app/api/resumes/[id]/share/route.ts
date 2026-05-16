import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function makeShareId() {
  return crypto.randomUUID().replace(/-/g, "");
}

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const user = await currentUser();
  const userId = user?.id;
  return NextResponse.json({ success: true });
}
