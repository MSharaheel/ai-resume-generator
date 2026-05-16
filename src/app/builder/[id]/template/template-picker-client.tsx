"use client";

import { useRouter } from "next/navigation";
import { TEMPLATE_META } from "@/templates/registry";
import type { TemplateId } from "@/templates/template-ids";

export default function TemplatePickerClient({
  resumeId,
  currentTemplateId,
}: {
  resumeId: string;
  currentTemplateId: string;
}) {
  const router = useRouter();

  const choose = async (templateId: TemplateId) => {
    const res = await fetch(`/api/resumes/${resumeId}/template`, {
      method: "PUT",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId }),
    });

    if (!res.ok) {
      alert("Template update failed");
      return;
    }

    router.push(`/builder/${resumeId}`);
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Choose a Template</h1>
        <p className="mt-2 text-sm text-gray-600">
          Current: <span className="font-medium">{currentTemplateId}</span>
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATE_META.map((t) => (
            <button
              key={t.id}
              onClick={() => choose(t.id)}
              className={`text-left rounded-lg border bg-white p-4 hover:border-black transition ${
                t.id === currentTemplateId ? "border-black" : "border-gray-200"
              }`}
            >
              <p className="font-semibold">{t.name}</p>
              <p className="mt-1 text-sm text-gray-600">{t.description}</p>
              <p className="mt-3 text-xs text-gray-500">ID: {t.id}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}