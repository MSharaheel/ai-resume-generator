"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { createGuestResume } from "@/lib/guest";
import { isTemplateId } from "@/templates/template-ids";

export default function NewResumePage() {
  const router = useRouter();
  const sp = useSearchParams();
  const template = sp.get("template") ?? undefined;

  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    const run = async () => {
      const templateId = template && isTemplateId(template) ? template : "classic-ats";

      // Logged-in => create in DB with templateId
      if (isSignedIn) {
        const res = await fetch("/api/resumes", {
          method: "POST",
          credentials: "include",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ templateId }),
        });

        if (res.ok) {
          const json = (await res.json()) as { id: string };
          router.replace(`/builder/${json.id}`);
          return;
        }
      }

      // Guest fallback
      const id = crypto.randomUUID();
      createGuestResume(id, templateId);
      router.replace(`/builder/${id}?mode=guest`);
    };

    run();
  }, [isLoaded, isSignedIn, router, template]);

  return <div className="min-h-screen grid place-items-center">Creating...</div>;
}