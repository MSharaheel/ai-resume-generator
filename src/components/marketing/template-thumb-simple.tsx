"use client";

import { useEffect, useState } from "react";
import { TemplateRenderer } from "@/templates/renderer";
import { sampleResume } from "@/lib/sample-resume";

export function TemplateThumbSimple({ templateId }: { templateId: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white overflow-hidden" style={{ transform: "scale(0.5)", transformOrigin: "top left", width: "200%", height: "200%" }}>
      <TemplateRenderer templateId={templateId} data={sampleResume} />
    </div>
  );
}