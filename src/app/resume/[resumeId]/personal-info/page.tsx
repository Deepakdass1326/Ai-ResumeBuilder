"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getResumeById,
  updateResume,
} from "@/apis/resume.api";

import { IpersonalInfo } from "@/types/resume.types";

const initialFormData: IpersonalInfo = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  portfolio: "",
  location: "",
};

export default function PersonalInfoPage() {
  const router = useRouter();

  const { resumeId } = useParams<{
    resumeId: string;
  }>();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState<IpersonalInfo>(initialFormData);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const resume =
        await getResumeById(resumeId);

      if (resume?.personalInfo) {
        setFormData(resume.personalInfo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const requiredFields = ["name", "email", "phone", "linkedin", "github", "portfolio", "location"] as const;
      const missingFields = requiredFields.filter((field) => !formData[field as keyof IpersonalInfo]?.trim());

      if (missingFields.length > 0) {
        alert("Please fill in all required fields.");
        return;
      }

      setLoading(true);

      await updateResume(resumeId, {
        personalInfo: formData,
      });

      router.push(
        `/resume/${resumeId}/education`
      );
    } catch (error) {
      console.error(error);
      alert("Failed to save personal information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Personal Information
          </h1>

          <p className="text-slate-500 mt-2">
            Add your contact information so
            recruiters can reach you easily.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <InputField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <InputField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <InputField
            label="LinkedIn URL"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            required
          />

          <InputField
            label="GitHub URL"
            name="github"
            value={formData.github}
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2">
            <InputField
              label="Portfolio Website"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-black text-white font-medium hover:opacity-90 disabled:opacity-50"
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

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function InputField({
  label,
  name,
  value,
  required,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
      />
    </div>
  );
}