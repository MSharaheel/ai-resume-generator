"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ResumeData } from "@/lib/resume-zod";

const TemplateRenderer = dynamic(
  () => import("@/templates/renderer").then((m) => m.TemplateRenderer),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-gradient-to-br from-black/10 via-black/5 to-black/10" />
    ),
  }
);

class PreviewErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full grid place-items-center text-xs text-gray-600">
          Preview unavailable
        </div>
      );
    }
    return this.props.children;
  }
}

export function TemplatePreview({
  templateId,
  data,
}: {
  templateId: any;
  data: ResumeData;
}) {
  return (
    <PreviewErrorBoundary>
      <div className="h-full w-full bg-white">
        <TemplateRenderer templateId={templateId} data={data} />
      </div>
    </PreviewErrorBoundary>
  );
}