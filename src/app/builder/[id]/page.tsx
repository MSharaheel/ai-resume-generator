import { ResumeDataSchema } from "@/lib/resume-zod";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import BuilderAccountClient from "./builder-account-client";
import BuilderGuestClient from "./builder-guest-client";

export const dynamic = "force-dynamic";

export default async function BuilderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ mode?: string }> | { mode?: string };
}) {
  const { id } = await params;
  const sp = await Promise.resolve(searchParams);
  const mode = sp?.mode;

  // Guest mode => client loads from localStorage
  if (mode === "guest") {
    return <BuilderGuestClient id={id} />;
  }

  // Account mode => server loads from DB (no client fetch needed)
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const resume = await prisma.resume.findFirst({
    where: { id, userId },
    select: { id: true, data: true, templateId: true },
  });

  if (!resume) {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center">
        <div>
          <p className="font-semibold">Builder cannot load</p>
          <p className="mt-2 text-sm text-gray-600">Resume not found for this account.</p>
        </div>
      </div>
    );
  }

  return (
  <BuilderAccountClient
    id={resume.id}
    initialData={ResumeDataSchema.parse(resume.data)}
    initialTemplateId={resume.templateId}
  />
);
}
