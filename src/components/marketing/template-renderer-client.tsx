"use client";

import { useEffect, useState } from "react";
import type { ResumeData } from "@/lib/resume-zod";

export default function TemplateRendererClient({
  templateId,
  data,
}: {
  templateId: any;
  data: ResumeData;
}) {
  const [Comp, setComp] = useState<React.ComponentType<{ data: ResumeData }> | null>(null);

  useEffect(() => {
    import("@/templates/registry").then((mod) => {
      const components = mod.TEMPLATE_COMPONENTS;
      const found = components[templateId as keyof typeof components];
      if (found) setComp(() => found);
    });
  }, [templateId]);

  if (!Comp) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
        Loading preview...
      </div>
    );
  }

  return <Comp data={data} />;
}