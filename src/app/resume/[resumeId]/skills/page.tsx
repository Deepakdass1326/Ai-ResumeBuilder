"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getResumeById, updateResume } from "@/apis/resume.api";
import { generateSkills } from "@/apis/ai.api";

export default function SkillsPage() {
  const router = useRouter();
  const { resumeId } = useParams<{ resumeId: string }>();

  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const resume = await getResumeById(resumeId);
      if (resume.skills && resume.skills.length > 0) {
        setSkills(resume.skills);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSkillChange = (index: number, value: string) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  const handleSuggestSkills = async () => {
    const jobTitle = prompt("What is your target job title? (e.g. Frontend Developer)");
    if (!jobTitle) return;

    const experience = prompt("How many years of experience do you have? (e.g. 3)");
    if (!experience) return;

    setIsGenerating(true);
    try {
      const generatedSkills = await generateSkills({
        jobTitle,
        experiance: experience,
      });

      let newSkills: string[] = [];
      if (typeof generatedSkills === 'string') {
        newSkills = (generatedSkills as string).split(",").map(s => s.trim());
      } else if (Array.isArray(generatedSkills)) {
        newSkills = generatedSkills;
      }
      
      const filteredNew = newSkills.filter(s => s.length > 0 && !skills.includes(s));
      const currentSkills = skills.filter(s => s.trim().length > 0);
      setSkills([...currentSkills, ...filteredNew, ""]);

    } catch (error) {
      console.error(error);
      alert("Failed to suggest skills");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    try {
      const filteredSkills = skills.map((s) => s.trim()).filter((s) => s.length > 0);

      if (filteredSkills.length === 0) {
        alert("Please add at least one skill.");
        return;
      }

      setLoading(true);

      await updateResume(resumeId, {
        skills: filteredSkills,
      });

      router.push(`/resume/${resumeId}/projects`);
    } catch (error) {
      console.error(error);
      alert("Failed to save skills");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border shadow-sm p-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">Skills</h1>
            <p className="text-slate-500 mt-2">
              Highlight your top skills and proficiencies.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSuggestSkills}
              disabled={isGenerating}
              className="px-5 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? "Generating..." : "✨ Suggest AI Skills"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 bg-slate-100 text-slate-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
              {skill}
              <button 
                onClick={() => removeSkill(index)} 
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
          {skills.length === 0 && (
            <div className="text-slate-400 text-sm italic">No skills added yet.</div>
          )}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Add a skill (e.g. React) and press Enter"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
          />
          <button
            onClick={handleAddSkill}
            className="px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
          >
            Add
          </button>
        </div>

        <div className="flex justify-end mt-12">
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
