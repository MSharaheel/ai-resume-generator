"use client"; // Client component is liye kyunki dynamic data load karta hai

import type { ResumeData } from "@/lib/resume-zod";

export function TemplateSamiraDark({ data }: { data: ResumeData }) {
  // Hardcoded fonts/colors to match your design request
  const bgBody = "#0d6651";
  const bgContainer = "#3b06d8";
  const bgHeader = "#1a072a";
  const textWhite = "#ffffff";
  
  // Helper: Convert empty string to placeholder if needed
  const val = (v?: string) => v?.trim() || "";

  return (
    // Wrapper: Full screen gray background
    <div className="min-h-screen p-8 flex justify-center items-start">
      
      {/* Resumee Container (Fixed width like your HTML) */}
      <div 
        style={{ 
          backgroundColor: bgContainer, 
          width: "100%", 
          maxWidth: "210mm", // A4 width approx
          boxShadow: "0 4px 10px rgb(255, 255, 255)"
        }}
      >
        
        {/* HEADER SECTION */}
        <div 
          style={{ 
            backgroundColor: bgHeader, 
            color: textWhite,
            padding: "25px 40px",
            display: "flex",
            alignItems: "center",
            gap: "25px"
          }}
        >
          {/* Profile Placeholder (Initials) */}
          <div className="relative w-[90px] h-[90px] rounded-full border-[3px] border-white/40 overflow-hidden flex items-center justify-center">
             <span className="text-3xl font-bold tracking-tighter">
               {val(data.fullName)[0]?.toUpperCase() || "U"}
             </span>
          </div>

          {/* Text Info */}
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-wide">
              {val(data.fullName)}
            </h1>
            <p className="text-xs tracking-[0.2em] mt-1 opacity-90">
              {val(data.headline)}
            </p>
          </div>
        </div>

        {/* MAIN LAYOUT (Split 35% / 65%) */}
        <div className="grid grid-cols-[35%_1fr] min-h-[calc(100vh-250px)]">
          
          {/* --- LEFT COLUMN (Sidebar) --- */}
          <aside className="bg-[#DB9528] p-8 border-r border-gray-300">
            
            {/* CONTACT */}
            <div>
              <h3 className="text-sm font-extrabold mb-3 uppercase tracking-wider">Contact</h3>
              <p className="text-sm leading-relaxed">{val(data.phone)}</p>
              <p className="text-sm leading-relaxed">{val(data.location)}</p>
              <p className="text-sm leading-relaxed">{val(data.email)}</p>
              <p className="text-sm leading-relaxed">{val(data.website)}</p>
              <p className="text-sm leading-relaxed">{val(data.linkedin)}</p>
            </div>

            {/* EDUCATION (From DB) */}
            <div className="mt-8">
              <h3 className="text-sm font-extrabold mb-3 uppercase tracking-wider">Education</h3>
              <ul className="text-sm space-y-4">
                {data.education.map((edu, i) => (
                  <li key={i}>
                    <strong className="block text-sm">{val(edu.school)}</strong>
                    <div>{val(edu.degree)}</div>
                    <div className="text-xs opacity-70">{val(edu.dates)}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* SKILLS */}
            {data.skills && val(data.skills).length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-extrabold mb-3 uppercase tracking-wider">Skills</h3>
                <ul className="text-sm list-disc pl-5 space-y-1">
                   {val(data.skills).split(",").map((skill, i) => (
                     <li key={i}>{skill.trim()}</li>
                   ))}
                </ul>
              </div>
            )}
          </aside>

          {/* --- RIGHT COLUMN (Main Content) --- */}
          <main className="bg-white p-8">
            
            {/* ABOUT ME / SUMMARY */}
            {val(data.summary) && (
              <section className="mb-8">
                <h3 className="text-sm font-extrabold mb-3 uppercase tracking-wider">About Me</h3>
                <p className="text-sm leading-6 opacity-80 whitespace-pre-wrap">
                  {val(data.summary)}
                </p>
              </section>
            )}

            {/* WORK EXPERIENCE */}
            {data.experience && data.experience.length > 0 && (
              <section>
                <h3 className="text-sm font-extrabold mb-6 uppercase tracking-wider">Work Experience</h3>
                <div className="space-y-8">
                  {data.experience.map((exp, i) => {
                    // Clean bullets description
                    const desc = exp.description || "";
                    const bullets = desc.split("\n").filter(l => l.trim());

                    return (
                      <div key={i} className="mb-6">
                        <h4 className="text-sm font-extrabold uppercase">{val(exp.role)}</h4>
                        <p className="text-xs opacity-80 mt-1">
                          <strong>{val(exp.company)}</strong> — {val(exp.dates)}
                        </p>
                        
                        {bullets.length > 0 && (
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                            {bullets.map((b, idx) => (
                              <li key={idx}>{b.replace(/^[-*•]\s*/, "")}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
            
            {/* PROJECTS (Added below Experience automatically) */}
             {data.projects && data.projects.length > 0 && (
              <section>
                 <h3 className="text-sm font-extrabold mb-6 uppercase tracking-wider">Projects</h3>
                 <div className="space-y-8">
                  {data.projects.map((proj, i) => (
                    <div key={i} className="mb-4">
                      <h4 className="text-sm font-extrabold uppercase">{val(proj.name)}</h4>
                      <p className="text-xs opacity-80">{val(proj.link)}</p>
                       <p className="text-sm mt-2 whitespace-pre-wrap opacity-90">{val(proj.description)}</p>
                    </div>
                  ))}
                 </div>
              </section>
             )}

          </main>
        </div>

      </div>
    </div>
  );
}