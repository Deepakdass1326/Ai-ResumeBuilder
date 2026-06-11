"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getResumeById, updateResume } from "@/apis/resume.api";
import { generateExperienceDescription } from "@/apis/ai.api";
import { IworkExperience } from "@/types/resume.types";

export default function ExperiencePage() {
  const router = useRouter();
  const { resumeId } = useParams<{ resumeId: string }>();

  const [loading, setLoading] = useState(false);
  const [generatingIndexes, setGeneratingIndexes] = useState<{ [key: number]: boolean }>({});
  const [experience, setExperience] = useState<IworkExperience[]>([
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const resume = await getResumeById(resumeId);
      if (resume.workExperience && resume.workExperience.length > 0) {
        setExperience(resume.workExperience);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (index: number, field: keyof IworkExperience, value: string) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
  };

  const handleGenerateDescription = async (index: number) => {
    const exp = experience[index];
    if (!exp.position.trim()) {
      alert("Please provide a Position/Title first.");
      return;
    }

    const techStackInput = prompt("What key technologies or skills did you use in this role? (comma separated)");
    if (techStackInput === null) return;

    const techStack = techStackInput.split(",").map(s => s.trim()).filter(s => s.length > 0);

    let years = 1;
    if (exp.startDate) {
      const startYear = parseInt(exp.startDate.replace(/\D/g, '')) || new Date().getFullYear();
      const endYear = exp.endDate ? (parseInt(exp.endDate.replace(/\D/g, '')) || new Date().getFullYear()) : new Date().getFullYear();
      years = Math.max(1, endYear - startYear);
    }

    setGeneratingIndexes((prev) => ({ ...prev, [index]: true }));
    try {
      const generated = await generateExperienceDescription({
        jobTitle: exp.position,
        experiance: years,
        techStack: techStack,
      });
      handleChange(index, "description", generated);
    } catch (error) {
      console.error(error);
      alert("Failed to generate description");
    } finally {
      setGeneratingIndexes((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleSave = async () => {
    try {
      for (let i = 0; i < experience.length; i++) {
        const exp = experience[i];
        if (!exp.company.trim() || !exp.position.trim() || !exp.startDate.trim()) {
          alert(`Please fill Company, Position, and Start Date for Experience ${i + 1}`);
          return;
        }
      }

      setLoading(true);

      await updateResume(resumeId, {
        workExperience: experience,
      });

      router.push(`/resume/${resumeId}/summary`);
    } catch (error) {
      console.error(error);
      alert("Failed to save experience information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border shadow-sm p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Work Experience</h1>
            <p className="text-slate-500 mt-2">
              Add your past and current professional roles.
            </p>
          </div>
          <button
            onClick={addExperience}
            className="px-5 py-3 bg-black text-white rounded-xl"
          >
            + Add Experience
          </button>
        </div>

        <div className="space-y-8 mt-10">
          {experience.map((item, index) => (
            <div key={index} className="border rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Experience {index + 1}</h3>
                {experience.length > 1 && (
                  <button
                    onClick={() => removeExperience(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Input
                  label="Company Name"
                  value={item.company}
                  required
                  onChange={(value) => handleChange(index, "company", value)}
                />

                <Input
                  label="Position/Title"
                  value={item.position}
                  required
                  onChange={(value) => handleChange(index, "position", value)}
                />

                <Input
                  label="Start Date"
                  value={item.startDate}
                  required
                  onChange={(value) => handleChange(index, "startDate", value)}
                />

                <Input
                  label="End Date"
                  value={item.endDate}
                  onChange={(value) => handleChange(index, "endDate", value)}
                />

                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">
                      Description / Responsibilities
                    </label>
                    <button
                      onClick={() => handleGenerateDescription(index)}
                      disabled={generatingIndexes[index]}
                      className="text-sm flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 disabled:opacity-50"
                    >
                      {generatingIndexes[index] ? "Generating..." : "✨ Generate Description"}
                    </button>
                  </div>
                  <textarea
                    value={item.description || ""}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          ))}
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

interface InputProps {
  label: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

function Input({ label, value, required, onChange }: InputProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        value={value || ""}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
      />
    </div>
  );
}
