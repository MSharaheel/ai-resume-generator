import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function makeShareId() {
  // simple unique id (safe enough for demo)
  return crypto.randomUUID().replace(/-/g, "");
}

// Enable share (creates shareId if missing)
export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  