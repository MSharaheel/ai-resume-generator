import Link from "next/link";
import { TEMPLATE_META } from "@/templates/registry";
import { TemplateRenderer } from "@/templates/renderer";
import { sampleResume } from "@/lib/sample-resume";

export const dynamic = "force-dynamic";

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Resume Templates</h1>
        <p className="mt-2 text-sm text-gray-600">
          Choose a professional template and start building your resume.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEMPLATE_META.map((t) => (
            <div key={t.id} className="rounded-xl border bg-white overflow-hidden">
              {/* Thumbnail */}
              <div className="h-[320px] bg-gray-100 overflow-hidden">
                <div className="origin-top-left scale-[0.45] w-[900px] p-4">
                  <TemplateRenderer templateId={t.id} data={sampleResume} />
                </div>
              </div>

              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="mt-1 text-sm text-gray-600">{t.description}</p>
                  <p className="mt-2 text-xs text-gray-500">ID: {t.id}</p>
                </div>

                <Link
                  className="rounded-md bg-black px-4 py-2 text-white text-sm"
                  href={`/builder/new?template=${t.id}`}
                >
                  Use
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}