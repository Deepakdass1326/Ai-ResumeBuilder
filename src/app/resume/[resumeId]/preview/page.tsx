"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckCircle2, Download, FileCheck2, LoaderCircle } from "lucide-react";
import { getResumeById } from "@/apis/resume.api";
import { getAtsScore } from "@/apis/ai.api";
import { IResume } from "@/types/resume.types";
import { ResumeDocument } from "@/components/resume-document";

export default function PreviewPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState<IResume | null>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [isScoring, setIsScoring] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { void fetchResume(); }, []);

  const fetchResume = async () => {
    try { setLoading(true); setError(""); setResume(await getResumeById(resumeId)); }
    catch { setError("We couldn't load this resume. Please return to the previous step and try again."); }
    finally { setLoading(false); }
  };

  const handlePrint = () => {
    if (!resume) return;
    const originalTitle = document.title;
    const filename = `${resume.personalInfo?.name || "Resume"} - Resume`;
    document.title = filename;
    const restoreTitle = () => { document.title = originalTitle; window.removeEventListener("afterprint", restoreTitle); };
    window.addEventListener("afterprint", restoreTitle);
    window.print();
  };

  const handleCheckAtsScore = async () => {
    if (!resume) return;
    setIsScoring(true);
    try {
      const text = `${resume.personalInfo?.name || ""}\n${resume.personalInfo?.email || ""} ${resume.personalInfo?.phone || ""}\nSummary:\n${resume.summary || ""}\nExperience:\n${resume.workExperience?.map(e => `${e.position} at ${e.company} - ${e.description}`).join("\n") || ""}\nProjects:\n${resume.projects?.map(p => `${p.title} - ${p.description}`).join("\n") || ""}\nSkills:\n${resume.skills?.join(", ") || ""}\nEducation:\n${resume.education?.map(e => `${e.degree} at ${e.institute}`).join("\n") || ""}`;
      setAtsScore(await getAtsScore({ resumeText: text }));
    } catch { setError("ATS scoring is temporarily unavailable. Your resume is still ready to export."); }
    finally { setIsScoring(false); }
  };

  if (loading) return <div className="grid min-h-[55vh] place-items-center"><div className="text-center"><LoaderCircle className="mx-auto size-6 animate-spin text-[#6558e8]"/><p className="mt-3 text-sm text-slate-500">Preparing your resume preview…</p></div></div>;
  if (!resume) return <div className="grid min-h-[55vh] place-items-center rounded-2xl border border-red-100 bg-white p-8 text-center text-sm text-red-700">{error || "Resume not found."}</div>;

  return <div className="resume-preview-shell">
    <div className="resume-preview-toolbar print:hidden">
      <div><p className="text-xs font-semibold uppercase tracking-[.1em] text-[#6558e8]">Final review</p><h1 className="mt-1 text-2xl font-semibold tracking-[-.03em]">Your resume is ready.</h1><p className="mt-1 text-sm text-slate-500">A4 format · ATS-friendly · Text remains selectable</p></div>
      <div className="flex flex-wrap items-center gap-2">
        {atsScore !== null && <div className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${atsScore >= 80 ? "bg-emerald-50 text-emerald-700" : atsScore >= 60 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`}><CheckCircle2 className="size-4"/>ATS {atsScore}/100</div>}
        <button onClick={handleCheckAtsScore} disabled={isScoring} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">{isScoring?<LoaderCircle className="size-4 animate-spin"/>:<FileCheck2 className="size-4"/>}{isScoring ? "Checking…" : "Check ATS"}</button>
        <button onClick={handlePrint} className="inline-flex items-center gap-2 rounded-xl bg-[#6558e8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#5145cd]"><Download className="size-4"/>Download PDF</button>
      </div>
    </div>
    {error && <p role="alert" className="mb-4 rounded-xl border border-amber-100 bg-amber-50 p-3 text-sm text-amber-800 print:hidden">{error}</p>}
    <div className="resume-paper-stage"><ResumeDocument resume={resume}/></div>
    <p className="mt-4 text-center text-xs leading-5 text-slate-400 print:hidden">In the print dialog, choose “Save as PDF”, A4 paper, 100% scale, and disable browser headers and footers.</p>
  </div>;
}
