"use client";

import { useRouter } from "next/navigation";
import { Sparkles, FileText, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-100">
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              AI-Powered Resume Builder
            </span>
          </div>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
            Build Professional
            <span className="block">
              ATS-Friendly Resumes
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Create modern, recruiter-ready resumes in minutes.
            Use AI to generate summaries, improve content,
            optimize projects, and craft a resume that
            stands out from the crowd.
          </p>

          <button
            onClick={() => router.push("/resume")}
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-black text-white font-semibold hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Create Resume
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          <div className="bg-white rounded-3xl p-8 border shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <Sparkles />
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              AI Content Generation
            </h3>

            <p className="mt-3 text-slate-600">
              Generate professional summaries,
              project descriptions, and experience
              content instantly using AI.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <FileText />
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              ATS Optimized
            </h3>

            <p className="mt-3 text-slate-600">
              Create resumes designed to pass
              applicant tracking systems and reach
              recruiters effectively.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <ArrowRight />
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              Fast Workflow
            </h3>

            <p className="mt-3 text-slate-600">
              Move step-by-step through personal
              details, skills, projects, experience,
              and AI enhancements.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}