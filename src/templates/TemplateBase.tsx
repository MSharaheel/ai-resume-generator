import type { ResumeData } from "@/lib/resume-zod";

interface TemplateBaseProps {
  data: ResumeData;
  children: React.ReactNode;
}

export function TemplateBase({ data, children }: TemplateBaseProps) {
  return (
    <div className="bg-white text-black min-h-[29.7cm] w-full max-w-[21cm] mx-auto shadow-lg p-8 font-sans">
      {children}
    </div>
  );
}