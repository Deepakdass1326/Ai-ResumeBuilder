"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createResume } from "@/apis/resume.api";

export default function ResumePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateResume = async () => {
    try {
      setLoading(true);

      const response = await createResume();

      if (!response.data?._id) {
        throw new Error("Resume ID not found");
      }

      router.push(
        `/resume/${response.data._id}/personal-info`
      );
    } catch (error) {
      console.error("Create Resume Error:", error);
      alert("Failed to create resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full bg-white border rounded-3xl shadow-xl p-10">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-black text-white flex items-center justify-center text-4xl">
            📄
          </div>

          <h1 className="mt-6 text-4xl font-bold text-slate-900">
            Create a New Resume
          </h1>

          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Generate a professional ATS-friendly resume
            using AI. Add your personal details,
            education, experience, projects, skills,
            and achievements through a guided workflow.
          </p>

          <button
            onClick={handleCreateResume}
            disabled={loading}
            className="mt-10 px-8 py-4 bg-black text-white rounded-2xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? "Creating Resume..."
              : "Start Building Resume"}
          </button>
        </div>
      </div>
    </main>
  );
}