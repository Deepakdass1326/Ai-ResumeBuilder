"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getResumeById, updateResume } from "@/apis/resume.api";
import { generateSummary } from "@/apis/ai.api";
import { IResume } from "@/types/resume.types";

export default function SummaryPage() {
  const router = useRouter();
  const { resumeId } = useParams<{ resumeId: string }>();

  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resume, setResume] = useState<IResume | null>(null);
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState(""); // Optionally allow setting resume title here

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const data = await getResumeById(resumeId);
      setResume(data);
      if (data.summary) {
        setSummary(data.summary);
      }
      if (data.title) {
        setTitle(data.title);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateAI = async () => {
    if (!title.trim()) {
      alert("Please provide a Resume Title first, so the AI knows your target role.");
      return;
    }
    
    setIsGenerating(true);
    try {
      // Calculate years of experience roughly
      const years = resume?.workExperience ? resume.workExperience.length * 2 + " years" : "Entry Level";
      
      const generated = await generateSummary({
        experiance: years,
        skills: resume?.skills || [],
        jobTitle: title
      });
      setSummary(generated);
    } catch (error) {
      console.error(error);
      alert("Failed to generate summary with AI");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!summary.trim()) {
        alert("Please provide a professional summary.");
        return;
      }

      setLoading(true);

      await updateResume(resumeId, {
        summary,
        title: title || "Untitled Resume", // Set a default title if not provided
      });

      router.push(`/resume/${resumeId}/preview`);
    } catch (error) {
      console.error(error);
      alert("Failed to save summary information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border shadow-sm p-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Professional Summary</h1>
          <p className="text-slate-500 mt-2">
            Write a brief summary highlighting your key qualifications, experience, and goals.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Resume Title
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
            <p className="text-xs text-slate-400 mt-2">
              This title is for your own reference to distinguish multiple resumes.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">
                Professional Summary
                <span className="text-red-500 ml-1">*</span>
              </label>
              <button
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="text-sm flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 disabled:opacity-50"
              >
                {isGenerating ? "Generating..." : "✨ Generate with AI"}
              </button>
            </div>
            <textarea
              value={summary || ""}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="A highly motivated..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all min-h-[200px]"
            />
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-black text-white px-8 py-3 rounded-xl disabled:opacity-50 hover:opacity-90 transition"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
