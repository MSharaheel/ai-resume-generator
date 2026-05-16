import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { ResumeDataSchema } from "@/lib/resume-zod";
import { isTemplateId, type TemplateId } from "@/templates/template-ids";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body =
  | { mode: "account"; resumeId: string }
  | { mode: "guest"; templateId: string; data: unknown };

// Simple HTML generator (template-1: classic-ats only for now)
function buildHtml(templateId: TemplateId, data: any) {
  const d = ResumeDataSchema.parse(data);
  const skills = (d.skills ?? "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  // We'll build minimal HTML for PDF; you can extend later
  const content = `
    <div style="font-family: system-ui, -apple-system, sans-serif; padding: 24px;">
      <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
        <h1 style="margin:0;font-size:24px;font-weight:bold">${escapeHtml(d.fullName)}</h1>
        <p style="margin:4px 0 0;color:#374151">${escapeHtml(d.headline ?? "")}</p>
        <p style="margin:6px 0 0;font-size:12px;color:#6b7280">
          ${escapeHtml(d.email)}
          ${d.phone ? " • " + escapeHtml(d.phone) : ""}
          ${d.location ? " • " + escapeHtml(d.location) : ""}
          ${d.linkedin ? " • " + escapeHtml(d.linkedin) : ""}
          ${d.website ? " • " + escapeHtml(d.website) : ""}
        </p>
      </div>

      ${d.summary ? `
      <div style="margin-top: 16px;">
        <h3 style="font-size:12px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#374151">Summary</h3>
        <p style="margin-top:6px;font-size:14px;white-space:pre-wrap">${escapeHtml(d.summary)}</p>
      </div>` : ""}

      ${skills.length ? `
      <div style="margin-top: 16px;">
        <h3 style="font-size:12px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#374151">Skills</h3>
        <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:6px">
          ${skills.map((s: string) => `<span style="font-size:12px;border:1px solid #e5e7eb;border-radius:4px;padding:2px 8px">${escapeHtml(s)}</span>`).join("")}
        </div>
      </div>` : ""}

      ${d.experience?.length ? `
      <div style="margin-top: 16px;">
        <h3 style="font-size:12px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#374151">Experience</h3>
        <div style="margin-top:8px">
          ${d.experience.map((e: any) => `
            <div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between">
                <strong>${escapeHtml(e.role || "Role")}</strong>
                <span style="color:#6b7280;font-size:12px">${escapeHtml(e.dates || "")}</span>
              </div>
              <div style="color:#374151">${escapeHtml(e.company || "")}</div>
              ${e.description ? `<div style="margin-top:4px;font-size:14px;white-space:pre-wrap">${escapeHtml(e.description)}</div>` : ""}
            </div>
          `).join("")}
        </div>
      </div>` : ""}

      ${d.education?.length ? `
      <div style="margin-top: 16px;">
        <h3 style="font-size:12px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#374151">Education</h3>
        <div style="margin-top:8px">
          ${d.education.map((e: any) => `
            <div style="margin-bottom:8px">
              <div style="display:flex;justify-content:space-between">
                <strong>${escapeHtml(e.degree || "Degree")}</strong>
                <span style="color:#6b7280;font-size:12px">${escapeHtml(e.dates || "")}</span>
              </div>
              <div style="color:#374151">${escapeHtml(e.school || "")}</div>
            </div>
          `).join("")}
        </div>
      </div>` : ""}
    </div>
  `;

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Resume PDF</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @page { size: A4; margin: 12mm; }
    body { margin: 0; background: white; }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
}

function escapeHtml(text: string) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let browser: any;
  try {
    const body = (await req.json()) as Body;

    let templateId: TemplateId = "classic-ats";
    let data: unknown;

    if (body.mode === "account") {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const resume = await prisma.resume.findFirst({
        where: { id: body.resumeId, userId },
        select: { data: true, templateId: true },
      });

      if (!resume) return NextResponse.json({ error: "Not found" }, { status: 404 });

      templateId = isTemplateId(resume.templateId) ? resume.templateId : "classic-ats";
      data = resume.data;
    } else {
      if (!isTemplateId(body.templateId)) {
        return NextResponse.json({ error: "Invalid templateId" }, { status: 400 });
      }
      templateId = body.templateId;
      data = body.data;
    }

    const html = buildHtml(templateId, data);

    const { chromium } = await import("playwright");
    browser = await chromium.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
    });

    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume.pdf"`,
      },
    });
  } catch (err: any) {
    console.error("PDF error:", err);
    try {
      if (browser) await browser.close();
    } catch {}
    return NextResponse.json(
      { error: "PDF failed", details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}