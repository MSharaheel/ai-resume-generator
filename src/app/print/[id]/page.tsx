import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { ResumeDataSchema } from "@/lib/resume-zod";
import { TemplateRenderer } from "@/templates/renderer";
import { isTemplateId } from "@/templates/template-ids";
import PrintClient from "@/components/print-client";

export const dynamic = "force-dynamic";

export default async function PrintPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ template?: string }> | { template?: string };
}) {
  const { id } = await params;
  const sp = await Promise.resolve(searchParams);
  const templateFromQuery = sp?.template;

  const { userId } = await auth();
  if (!userId) return <div className="p-6">Please sign in.</div>;

  const resume = await prisma.resume.findFirst({
    where: { id, userId },
    select: { data: true, templateId: true },
  });

  if (!resume) return <div className="p-6">Resume not found.</div>;

  const data = ResumeDataSchema.parse(resume.data);

  const templateId =
    templateFromQuery && isTemplateId(templateFromQuery)
      ? templateFromQuery
      : (resume.templateId as any);

  return (
    <div className="bg-white min-h-screen">
      {/* Print settings */}
      <style>{`
        @page { size: A4; margin: 12mm; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* Button (screen only) */}
      <PrintClient />

      {/* A4 container */}
      <div className="mx-auto w-[210mm]">
        <TemplateRenderer templateId={templateId} data={data} />
      </div>
    </div>
  );
}