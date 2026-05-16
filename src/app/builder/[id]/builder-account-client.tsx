"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import NeonAnimatedBackground from "@/components/ui/neon-animated-background";
import GlassPanel from "@/components/ui/glass-panel";

import type { ResumeData } from "@/lib/resume-zod";
import type { TemplateId } from "@/templates/template-ids";
import { TemplateRenderer } from "@/templates/renderer";

export default function BuilderAccountClient({
  id,
  initialData,
  initialTemplateId,
}: {
  id: string;
  initialData: ResumeData;
  initialTemplateId: TemplateId;
}) {
  const [data, setData] = useState<ResumeData>(initialData);
  const templateId = initialTemplateId;

  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );

  // AI loading states
  const [aiSummaryLoading, setAiSummaryLoading] = useState(false);
  const [aiExpIndex, setAiExpIndex] = useState<number | null>(null);
  const [aiEduIndex, setAiEduIndex] = useState<number | null>(null);
  const [aiProjIndex, setAiProjIndex] = useState<number | null>(null);

  // Full resume generator states
  const [genJobTitle, setGenJobTitle] = useState("");
  const [genYears, setGenYears] = useState("");
  const [genSkills, setGenSkills] = useState("");
  const [genJD, setGenJD] = useState("");
  const [genLoading, setGenLoading] = useState(false);

  // PDF loading state
  const [pdfLoading, setPdfLoading] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-fuchsia-300";
  const textareaClass =
    "w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-fuchsia-300";

  const onChange = (patch: Partial<ResumeData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setState("idle");
  };

  const onSave = async () => {
    setState("saving");

    const res = await fetch(`/api/resumes/${id}`, {
      method: "PUT",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      setState("error");
      return;
    }

    setState("saved");
    setTimeout(() => setState("idle"), 1200);
  };

  const improveSummaryAI = async () => {
    setAiSummaryLoading(true);
    try {
      const res = await fetch("/api/ai/improve-summary", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: data.summary ?? "",
          headline: data.headline ?? "",
        }),
      });

      if (!res.ok) {
        alert("AI failed. Check GROQ_API_KEY and server logs.");
        return;
      }

      const json = (await res.json()) as { summary?: string };
      onChange({ summary: json.summary ?? "" });
    } finally {
      setAiSummaryLoading(false);
    }
  };

  const generateExperienceAI = async (idx: number) => {
    setAiExpIndex(idx);
    try {
      const exp = (data.experience ?? [])[idx];

      const res = await fetch("/api/ai/generate-experience", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: exp?.role ?? "",
          company: exp?.company ?? "",
          dates: exp?.dates ?? "",
          skills: data.skills ?? "",
          current: exp?.description ?? "",
        }),
      });

      if (!res.ok) {
        alert("AI failed. Check GROQ_API_KEY and server logs.");
        return;
      }

      const json = (await res.json()) as { description?: string };
      const next = [...(data.experience ?? [])];
      next[idx] = { ...next[idx], description: json.description ?? "" };
      onChange({ experience: next });
    } finally {
      setAiExpIndex(null);
    }
  };

  const improveEducationAI = async (idx: number) => {
    setAiEduIndex(idx);
    try {
      const ed = (data.education ?? [])[idx];

      const res = await fetch("/api/ai/improve-education", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          degree: ed?.degree ?? "",
          school: ed?.school ?? "",
          dates: ed?.dates ?? "",
        }),
      });

      if (!res.ok) {
        alert("AI failed. Check GROQ_API_KEY and server logs.");
        return;
      }

      const json = (await res.json()) as {
        degree?: string;
        school?: string;
        dates?: string;
      };

      const next = [...(data.education ?? [])];
      next[idx] = {
        ...next[idx],
        degree: json.degree ?? next[idx].degree,
        school: json.school ?? next[idx].school,
        dates: json.dates ?? next[idx].dates,
      };
      onChange({ education: next });
    } finally {
      setAiEduIndex(null);
    }
  };

  const generateProjectAI = async (idx: number) => {
    setAiProjIndex(idx);
    try {
      const proj = (data.projects ?? [])[idx];

      const res = await fetch("/api/ai/generate-project", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: proj?.name ?? "",
          tech: proj?.tech ?? "",
          link: proj?.link ?? "",
          targetRole: data.headline ?? "",
          current: proj?.description ?? "",
        }),
      });

      if (!res.ok) {
        alert("AI failed. Check GROQ_API_KEY and server logs.");
        return;
      }

      const json = (await res.json()) as { description?: string };
      const next = [...(data.projects ?? [])];
      next[idx] = { ...next[idx], description: json.description ?? "" };
      onChange({ projects: next });
    } finally {
      setAiProjIndex(null);
    }
  };

  const generateFullResumeAI = async () => {
    if (!genJobTitle.trim()) return alert("Please enter a target job title.");
    if (!genSkills.trim()) return alert("Please enter skills.");

    setGenLoading(true);
    try {
      const res = await fetch("/api/ai/generate-resume", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone ?? "",
          location: data.location ?? "",
          linkedin: data.linkedin ?? "",
          website: data.website ?? "",
          jobTitle: genJobTitle,
          years: genYears,
          skills: genSkills,
          jobDescription: genJD,
        }),
      });

      if (!res.ok) {
        alert("AI full resume generation failed.");
        return;
      }

      const json = (await res.json()) as { data?: ResumeData };
      if (!json.data) return alert("AI returned empty data.");

      setData(json.data);
      setState("idle");
      alert("Resume generated. Review and click Save.");
    } finally {
      setGenLoading(false);
    }
  };

  const downloadPdf = async () => {
    setPdfLoading(true);
    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "account", resumeId: id }),
      });

      if (!res.ok) {
        alert("PDF failed. Check server logs.");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `resume-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <NeonAnimatedBackground />

      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <GlassPanel className="p-6 text-slate-900">
            {/* header */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Resume Builder (Account)
                </h2>
                <p className="text-xs text-slate-600 mt-1">Template: {templateId}</p>
              </div>

              <div className="flex gap-2 flex-wrap justify-end">
                <Link
                  className="rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold hover:bg-white transition"
                  href={`/builder/${id}/template`}
                >
                  Templates
                </Link>

                <button
                  type="button"
                  onClick={downloadPdf}
                  disabled={pdfLoading}
                  className="rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold hover:bg-white transition disabled:opacity-50"
                >
                  {pdfLoading ? "Downloading..." : "Download PDF"}
                </button>

                <button
                  onClick={onSave}
                  className="rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#FF4D94] px-4 py-2 text-sm font-bold text-black hover:opacity-95 transition"
                >
                  {state === "saving" ? "Saving..." : "Save"}
                </button>
              </div>
            </div>

            {state === "saved" ? (
              <p className="mt-3 text-sm text-emerald-700 font-semibold">Saved.</p>
            ) : null}
            {state === "error" ? (
              <p className="mt-3 text-sm text-red-700 font-semibold">Save failed.</p>
            ) : null}

            {/* generator */}
            <details className="mt-6 rounded-2xl border border-black/10 bg-black/5 p-4">
              <summary className="cursor-pointer font-bold text-sm">
                Full AI Resume Generator
              </summary>

              <div className="mt-4 grid gap-3">
                <input
                  className={inputClass}
                  value={genJobTitle}
                  onChange={(e) => setGenJobTitle(e.target.value)}
                  placeholder="Target Job Title (e.g., Frontend Developer)"
                />
                <input
                  className={inputClass}
                  value={genYears}
                  onChange={(e) => setGenYears(e.target.value)}
                  placeholder="Years of Experience (optional)"
                />
                <input
                  className={inputClass}
                  value={genSkills}
                  onChange={(e) => setGenSkills(e.target.value)}
                  placeholder="Skills (comma separated)"
                />
                <textarea
                  className={textareaClass}
                  rows={4}
                  value={genJD}
                  onChange={(e) => setGenJD(e.target.value)}
                  placeholder="Job Description (optional)"
                />
                <button
                  type="button"
                  onClick={generateFullResumeAI}
                  disabled={genLoading}
                  className="rounded-xl bg-black px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                >
                  {genLoading ? "Generating..." : "Generate Resume"}
                </button>
              </div>
            </details>

            {/* fields */}
            <div className="mt-6 grid gap-3">
              <input
                className={inputClass}
                value={data.fullName}
                onChange={(e) => onChange({ fullName: e.target.value })}
                placeholder="Full Name"
              />
              <input
                className={inputClass}
                value={data.headline ?? ""}
                onChange={(e) => onChange({ headline: e.target.value })}
                placeholder="Headline / Job Title"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className={inputClass}
                  value={data.email}
                  onChange={(e) => onChange({ email: e.target.value })}
                  placeholder="Email"
                />
                <input
                  className={inputClass}
                  value={data.phone ?? ""}
                  onChange={(e) => onChange({ phone: e.target.value })}
                  placeholder="Phone"
                />
              </div>

              <input
                className={inputClass}
                value={data.location ?? ""}
                onChange={(e) => onChange({ location: e.target.value })}
                placeholder="Location"
              />
              <input
                className={inputClass}
                value={data.linkedin ?? ""}
                onChange={(e) => onChange({ linkedin: e.target.value })}
                placeholder="LinkedIn"
              />
              <input
                className={inputClass}
                value={data.website ?? ""}
                onChange={(e) => onChange({ website: e.target.value })}
                placeholder="Website"
              />

              {/* Summary AI */}
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-bold">Summary</p>
                <button
                  type="button"
                  onClick={improveSummaryAI}
                  disabled={aiSummaryLoading}
                  className="text-xs font-bold text-fuchsia-700 hover:underline disabled:opacity-50"
                >
                  {aiSummaryLoading ? "Improving..." : "Improve with AI"}
                </button>
              </div>

              <textarea
                className={textareaClass}
                rows={5}
                value={data.summary ?? ""}
                onChange={(e) => onChange({ summary: e.target.value })}
                placeholder="Professional summary..."
              />

              <input
                className={inputClass}
                value={data.skills ?? ""}
                onChange={(e) => onChange({ skills: e.target.value })}
                placeholder="Skills (comma separated)"
              />
            </div>

            {/* Experience */}
            <div className="mt-8 border-t border-black/10 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Experience</h3>
                <button
                  type="button"
                  className="rounded-xl bg-black px-3 py-2 text-xs font-bold text-white"
                  onClick={() =>
                    onChange({
                      experience: [
                        ...(data.experience ?? []),
                        { role: "", company: "", dates: "", description: "" },
                      ],
                    })
                  }
                >
                  + Add
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {(data.experience ?? []).map((e, idx) => (
                  <div key={idx} className="rounded-2xl border border-black/10 bg-white/60 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold">Entry #{idx + 1}</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => generateExperienceAI(idx)}
                          disabled={aiExpIndex === idx}
                          className="rounded-lg border border-black/10 bg-white px-3 py-1 text-xs font-bold hover:bg-white/80 disabled:opacity-50"
                        >
                          {aiExpIndex === idx ? "Generating..." : "AI Bullets"}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onChange({
                              experience: (data.experience ?? []).filter((_, i) => i !== idx),
                            })
                          }
                          className="text-xs font-bold text-red-700 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-2">
                      <input
                        className={inputClass}
                        value={e.role}
                        onChange={(ev) => {
                          const next = [...(data.experience ?? [])];
                          next[idx] = { ...next[idx], role: ev.target.value };
                          onChange({ experience: next });
                        }}
                        placeholder="Role"
                      />
                      <input
                        className={inputClass}
                        value={e.company}
                        onChange={(ev) => {
                          const next = [...(data.experience ?? [])];
                          next[idx] = { ...next[idx], company: ev.target.value };
                          onChange({ experience: next });
                        }}
                        placeholder="Company"
                      />
                      <input
                        className={inputClass}
                        value={e.dates}
                        onChange={(ev) => {
                          const next = [...(data.experience ?? [])];
                          next[idx] = { ...next[idx], dates: ev.target.value };
                          onChange({ experience: next });
                        }}
                        placeholder="Dates"
                      />
                      <textarea
                        className={textareaClass}
                        rows={4}
                        value={e.description}
                        onChange={(ev) => {
                          const next = [...(data.experience ?? [])];
                          next[idx] = { ...next[idx], description: ev.target.value };
                          onChange({ experience: next });
                        }}
                        placeholder="Achievements (bullets)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mt-8 border-t border-black/10 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Education</h3>
                <button
                  type="button"
                  className="rounded-xl bg-black px-3 py-2 text-xs font-bold text-white"
                  onClick={() =>
                    onChange({
                      education: [
                        ...(data.education ?? []),
                        { degree: "", school: "", dates: "" },
                      ],
                    })
                  }
                >
                  + Add
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {(data.education ?? []).map((ed, idx) => (
                  <div key={idx} className="rounded-2xl border border-black/10 bg-white/60 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold">Entry #{idx + 1}</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => improveEducationAI(idx)}
                          disabled={aiEduIndex === idx}
                          className="rounded-lg border border-black/10 bg-white px-3 py-1 text-xs font-bold hover:bg-white/80 disabled:opacity-50"
                        >
                          {aiEduIndex === idx ? "Improving..." : "Improve with AI"}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onChange({
                              education: (data.education ?? []).filter((_, i) => i !== idx),
                            })
                          }
                          className="text-xs font-bold text-red-700 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-2">
                      <input
                        className={inputClass}
                        value={ed.degree}
                        onChange={(ev) => {
                          const next = [...(data.education ?? [])];
                          next[idx] = { ...next[idx], degree: ev.target.value };
                          onChange({ education: next });
                        }}
                        placeholder="Degree"
                      />
                      <input
                        className={inputClass}
                        value={ed.school}
                        onChange={(ev) => {
                          const next = [...(data.education ?? [])];
                          next[idx] = { ...next[idx], school: ev.target.value };
                          onChange({ education: next });
                        }}
                        placeholder="School"
                      />
                      <input
                        className={inputClass}
                        value={ed.dates}
                        onChange={(ev) => {
                          const next = [...(data.education ?? [])];
                          next[idx] = { ...next[idx], dates: ev.target.value };
                          onChange({ education: next });
                        }}
                        placeholder="Dates"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="mt-8 border-t border-black/10 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Projects</h3>
                <button
                  type="button"
                  className="rounded-xl bg-black px-3 py-2 text-xs font-bold text-white"
                  onClick={() =>
                    onChange({
                      projects: [
                        ...(data.projects ?? []),
                        { name: "", link: "", dates: "", tech: "", description: "" },
                      ],
                    })
                  }
                >
                  + Add
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {(data.projects ?? []).map((p, idx) => (
                  <div key={idx} className="rounded-2xl border border-black/10 bg-white/60 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold">Entry #{idx + 1}</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => generateProjectAI(idx)}
                          disabled={aiProjIndex === idx}
                          className="rounded-lg border border-black/10 bg-white px-3 py-1 text-xs font-bold hover:bg-white/80 disabled:opacity-50"
                        >
                          {aiProjIndex === idx ? "Generating..." : "AI Bullets"}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onChange({
                              projects: (data.projects ?? []).filter((_, i) => i !== idx),
                            })
                          }
                          className="text-xs font-bold text-red-700 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-2">
                      <input
                        className={inputClass}
                        value={p.name}
                        onChange={(ev) => {
                          const next = [...(data.projects ?? [])];
                          next[idx] = { ...next[idx], name: ev.target.value };
                          onChange({ projects: next });
                        }}
                        placeholder="Project name"
                      />
                      <input
                        className={inputClass}
                        value={p.link}
                        onChange={(ev) => {
                          const next = [...(data.projects ?? [])];
                          next[idx] = { ...next[idx], link: ev.target.value };
                          onChange({ projects: next });
                        }}
                        placeholder="Link"
                      />
                      <input
                        className={inputClass}
                        value={p.dates}
                        onChange={(ev) => {
                          const next = [...(data.projects ?? [])];
                          next[idx] = { ...next[idx], dates: ev.target.value };
                          onChange({ projects: next });
                        }}
                        placeholder="Dates"
                      />
                      <input
                        className={inputClass}
                        value={p.tech}
                        onChange={(ev) => {
                          const next = [...(data.projects ?? [])];
                          next[idx] = { ...next[idx], tech: ev.target.value };
                          onChange({ projects: next });
                        }}
                        placeholder="Tech stack"
                      />
                      <textarea
                        className={textareaClass}
                        rows={4}
                        value={p.description}
                        onChange={(ev) => {
                          const next = [...(data.projects ?? [])];
                          next[idx] = { ...next[idx], description: ev.target.value };
                          onChange({ projects: next });
                        }}
                        placeholder="Bullets / impact"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* PREVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <GlassPanel className="p-0 overflow-hidden sticky top-10">
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between text-white">
              <span className="text-xs font-bold uppercase tracking-widest">
                Live Preview
              </span>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#FF4D94] text-black">
                A4 READY
              </span>
            </div>

            <div className="bg-white max-h-[85vh] overflow-y-auto">
              <TemplateRenderer templateId={templateId} data={data} />
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </main>
  );
}