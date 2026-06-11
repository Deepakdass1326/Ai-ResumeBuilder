"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getResumeById, updateResume } from "@/apis/resume.api";
import { generateProjectDescription } from "@/apis/ai.api";
import { Iprojects } from "@/types/resume.types";

export default function ProjectsPage() {
  const router = useRouter();
  const { resumeId } = useParams<{ resumeId: string }>();

  const [loading, setLoading] = useState(false);
  const [generatingIndexes, setGeneratingIndexes] = useState<{ [key: number]: boolean }>({});
  const [projects, setProjects] = useState<Iprojects[]>([
    {
      title: "",
      description: "",
      githubUrl: "",
      liveUrl: "",
      techStack: [],
    },
  ]);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const resume = await getResumeById(resumeId);
      if (resume.projects && resume.projects.length > 0) {
        setProjects(resume.projects);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (index: number, field: keyof Iprojects, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const handleTechStackChange = (index: number, value: string) => {
    const updated = [...projects];
    // Split by comma to allow easy tag creation
    const tags = value.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
    updated[index].techStack = tags;
    setProjects(updated);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        githubUrl: "",
        liveUrl: "",
        techStack: [],
      },
    ]);
  };

  const removeProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  const handleGenerateDescription = async (index: number) => {
    const proj = projects[index];
    if (!proj.title.trim()) {
      alert("Please provide a Project Title first so the AI knows what to write about.");
      return;
    }

    setGeneratingIndexes((prev) => ({ ...prev, [index]: true }));
    try {
      const generated = await generateProjectDescription({
        projectName: proj.title,
        techStack: proj.techStack,
        projectType: "software project",
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
      for (let i = 0; i < projects.length; i++) {
        const proj = projects[i];
        if (!proj.title.trim() || !proj.description.trim()) {
          alert(`Please fill at least the Title and Description for Project ${i + 1}`);
          return;
        }
      }

      setLoading(true);

      await updateResume(resumeId, {
        projects,
      });

      router.push(`/resume/${resumeId}/experience`);
    } catch (error) {
      console.error(error);
      alert("Failed to save projects information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border shadow-sm p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-slate-500 mt-2">
              Add your relevant projects to showcase your skills.
            </p>
          </div>
          <button
            onClick={addProject}
            className="px-5 py-3 bg-black text-white rounded-xl"
          >
            + Add Project
          </button>
        </div>

        <div className="space-y-8 mt-10">
          {projects.map((item, index) => (
            <div key={index} className="border rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Project {index + 1}</h3>
                {projects.length > 1 && (
                  <button
                    onClick={() => removeProject(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium">Project Title<span className="text-red-500 ml-1">*</span></label>
                  <input
                    type="text"
                    value={item.title || ""}
                    required
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">
                      Description
                      <span className="text-red-500 ml-1">*</span>
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
                    required
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">GitHub URL</label>
                  <input
                    type="text"
                    value={item.githubUrl || ""}
                    onChange={(e) => handleChange(index, "githubUrl", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Live URL</label>
                  <input
                    type="text"
                    value={item.liveUrl || ""}
                    onChange={(e) => handleChange(index, "liveUrl", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={(item.techStack || []).join(", ")}
                    onChange={(e) => handleTechStackChange(index, e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
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
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
      />
    </div>
  );
}
