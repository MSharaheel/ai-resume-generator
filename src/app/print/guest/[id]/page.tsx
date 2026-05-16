"use client";

import { use, useEffect, useState } from "react";
import type { ResumeData } from "@/lib/resume-zod";
import type { TemplateId } from "@/templates/template-ids";
import { loadGuestResume, loadGuestTemplate } from "@/lib/guest";
import { TemplateRenderer } from "@/templates/renderer";
import PrintClient from "@/components/print-client";

export default function GuestPrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [data, setData] = useState<ResumeData | null>(null);
  const [templateId, setTemplateId] = useState<TemplateId>("classic-ats");

  useEffect(() => {
    setData(loadGuestResume(id));
    setTemplateId(loadGuestTemplate(id));
  }, [id]);

  if (!data) return <div className="min-h-screen grid place-items-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen">
      <style>{`
  @page { size: A4; margin: 12mm; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none !important; }
  }
`}</style>

      <PrintClient />

      <div className="mx-auto w-[210mm]">
        <TemplateRenderer templateId={templateId} data={data} />
      </div>
    </div>
  );
}