import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import TemplatePickerClient from "./template-picker-client";
import GuestTemplatePickerClient from "./guest-template-picker-client";

export const dynamic = "force-dynamic";

export default async function TemplatePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ mode?: string }> | { mode?: string };
}) {
  const { id } = await params;
  const sp = await Promise.resolve(searchParams);
  const mode = sp?.mode;

  // Guest mode
  if (mode === "guest") {
    return <GuestTemplatePickerClient id={id} />;
  }

  // Account mode
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const resume = await prisma.resume.findFirst({
    where: { id, userId },
    select: { id: true, templateId: true },
  });

  if (!resume) {
    return <div className="min-h-screen grid place-items-center">Resume not found.</div>;
  }

  return (
    <TemplatePickerClient
      resumeId={resume.id}
      currentTemplateId={resume.templateId}
    />
  );
}