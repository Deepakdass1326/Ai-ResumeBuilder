"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getResumeById,
  updateResume,
} from "@/apis/resume.api";

import { Ieducation } from "@/types/resume.types";

export default function EducationPage() {
  const router = useRouter();

  const { resumeId } = useParams<{
    resumeId: string;
  }>();

  const [loading, setLoading] = useState(false);

  const [education, setEducation] = useState<
    Ieducation[]
  >([
    {
      institute: "",
      degree: "",
      startDate: "",
      endDate: "",
    },
  ]);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const resume =
        await getResumeById(resumeId);

      if (
        resume.education &&
        resume.education.length > 0
      ) {
        setEducation(
          resume.education
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    index: number,
    field: keyof Ieducation,
    value: string
  ) => {
    const updated =
      [...education];

    updated[index][field] =
      value;

    setEducation(updated);
  };

  const addEducation =
    () => {
      setEducation([
        ...education,
        {
          institute: "",
          degree: "",
          startDate: "",
          endDate: "",
        },
      ]);
    };

  const removeEducation = (
    index: number
  ) => {
    const updated =
      education.filter(
        (_, i) =>
          i !== index
      );

    setEducation(updated);
  };

  const handleSave = async () => {
    try {
      for (let i = 0; i < education.length; i++) {
        const edu = education[i];
        if (!edu.institute.trim() || !edu.degree.trim() || !edu.startDate.trim() || !edu.endDate.trim()) {
          alert(`Please fill all required fields in Education ${i + 1}`);
          return;
        }
      }

      setLoading(true);

      await updateResume(resumeId, {
        education,
      });

      router.push(`/resume/${resumeId}/skills`);
    } catch (error) {
      console.error(error);
      alert("Failed to save education information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border shadow-sm p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Education
            </h1>

            <p className="text-slate-500 mt-2">
              Add your educational background.
            </p>
          </div>

          <button
            onClick={
              addEducation
            }
            className="px-5 py-3 bg-black text-white rounded-xl"
          >
            + Add Education
          </button>
        </div>

        <div className="space-y-8 mt-10">
          {education.map(
            (
              item,
              index
            ) => (
              <div
                key={
                  index
                }
                className="border rounded-2xl p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">
                    Education{" "}
                    {index +
                      1}
                  </h3>

                  {education.length >
                    1 && (
                    <button
                      onClick={() =>
                        removeEducation(
                          index
                        )
                      }
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    label="Institution"
                    value={item.institute}
                    required
                    onChange={(value) => handleChange(index, "institute", value)}
                  />

                  <Input
                    label="Degree"
                    value={item.degree}
                    required
                    onChange={(value) => handleChange(index, "degree", value)}
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
                    required
                    onChange={(value) => handleChange(index, "endDate", value)}
                  />
                </div>
              </div>
            )
          )}
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={
              handleSave
            }
            disabled={
              loading
            }
            className="bg-black text-white px-8 py-3 rounded-xl"
          >
            {loading
              ? "Saving..."
              : "Save & Continue"}
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

function Input({
  label,
  value,
  required,
  onChange,
}: InputProps) {
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