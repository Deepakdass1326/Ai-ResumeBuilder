"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getResumeById } from "@/apis/resume.api";
import { getAtsScore } from "@/apis/ai.api";
import { IResume } from "@/types/resume.types";

export default function PreviewPage() {
  const { resumeId } = useParams<{ resumeId: string }>();

  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState<IResume | null>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [isScoring, setIsScoring] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const data = await getResumeById(resumeId);
      setResume(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCheckAtsScore = async () => {
    if (!resume) return;
    setIsScoring(true);
    try {
      const text = `
      ${resume.personalInfo?.name || ""}
      ${resume.personalInfo?.email || ""} ${resume.personalInfo?.phone || ""}
      Summary:
      ${resume.summary || ""}
      Experience:
      ${resume.workExperience?.map(e => `${e.position} at ${e.company} - ${e.description}`).join("\n")}
      Projects:
      ${resume.projects?.map(p => `${p.title} - ${p.description}`).join("\n")}
      Skills:
      ${resume.skills?.join(", ")}
      Education:
      ${resume.education?.map(e => `${e.degree} at ${e.institute}`).join("\n")}
      `;

      const score = await getAtsScore({ resumeText: text });
      setAtsScore(score);
    } catch (error) {
      console.error(error);
      alert("Failed to calculate ATS score");
    } finally {
      setIsScoring(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading preview...</div>;
  }

  if (!resume) {
    return <div className="text-center mt-20">Resume not found</div>;
  }

  const { personalInfo, summary, workExperience, projects, education, skills } = resume;

  return (
    <div className="max-w-4xl mx-auto mb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resume Preview</h1>
        <div className="flex items-center gap-4">
          {atsScore !== null && (
            <div className={`font-bold px-4 py-2 rounded-xl print:hidden ${atsScore >= 80 ? 'bg-green-100 text-green-700' : atsScore >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
              ATS Score: {atsScore}/100
            </div>
          )}
          <button
            onClick={handleCheckAtsScore}
            disabled={isScoring}
            className="border border-slate-300 text-slate-700 px-6 py-2 rounded-xl print:hidden hover:bg-slate-50 disabled:opacity-50"
          >
            {isScoring ? "Scoring..." : "✨ Check ATS Score"}
          </button>
          <button
            onClick={handlePrint}
            className="bg-black text-white px-6 py-2 rounded-xl print:hidden hover:opacity-90"
          >
            Print / Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white border shadow-sm p-10 min-h-[1056px] print:shadow-none print:border-none print:p-0 print:m-0">
        {/* Header / Personal Info */}
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 uppercase tracking-wide">
            {personalInfo?.name || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-slate-900">
            {personalInfo?.email && <span>{personalInfo.email}</span>}
            {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo?.location && <span>• {personalInfo.location}</span>}
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-slate-900 mt-2">
            {personalInfo?.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn
              </a>
            )}
            {personalInfo?.github && (
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">
                GitHub
              </a>
            )}
            {personalInfo?.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="hover:underline">
                Portfolio
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-900 pb-1 mb-3 uppercase">
              Professional Summary
            </h2>
            <p className="text-sm text-slate-900 leading-relaxed whitespace-pre-wrap">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {workExperience && workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-900 pb-1 mb-4 uppercase">
              Experience
            </h2>
            <div className="space-y-5">
              {workExperience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-slate-900 text-base">
                      {exp.position}
                    </h3>
                    <span className="text-sm text-slate-900 font-medium">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-sm text-slate-900 font-medium mb-2">
                    {exp.company}
                  </div>
                  {exp.description && (
                    <p className="text-sm text-slate-900 leading-relaxed whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-900 pb-1 mb-4 uppercase">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-slate-900 text-base">
                      {proj.title}
                    </h3>
                    <div className="flex gap-2 text-xs text-slate-900">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline">
                          [Live]
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">
                          [GitHub]
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.description && (
                    <p className="text-sm text-slate-900 mb-1 leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="text-sm text-slate-900">
                      <span className="font-medium text-slate-900">Tech Stack: </span>
                      <span>{proj.techStack.join(", ")}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-900 pb-1 mb-4 uppercase">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base">
                      {edu.institute}
                    </h3>
                    <div className="text-sm text-slate-900">
                      {edu.degree}
                    </div>
                  </div>
                  <span className="text-sm text-slate-900 font-medium">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-900 pb-1 mb-3 uppercase">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-slate-200 text-slate-900 text-sm font-medium rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
