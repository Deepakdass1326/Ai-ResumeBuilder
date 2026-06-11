"use client";

import Link from "next/link";
import {
  useParams,
  usePathname,
} from "next/navigation";

const steps = [
  {
    title: "Personal Info",
    path: "personal-info",
  },
  {
    title: "Education",
    path: "education",
  },
  {
    title: "Skills",
    path: "skills",
  },
  {
    title: "Projects",
    path: "projects",
  },
  {
    title: "Experience",
    path: "experience",
  },
  {
    title: "Summary",
    path: "summary",
  },
  {
    title: "Preview",
    path: "preview",
  },
];

export default function ResumeSidebar() {
  const pathname = usePathname();

  const { resumeId } = useParams<{
    resumeId: string;
  }>();

  return (
    <aside className="w-72 min-h-screen border-r bg-white">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">
          Resume Builder
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Complete all sections
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {steps.map((step) => {
          const href = `/resume/${resumeId}/${step.path}`;

          const active =
            pathname === href;

          return (
            <Link
              key={step.path}
              href={href}
              className={`block px-4 py-3 rounded-xl transition ${
                active
                  ? "bg-black text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              {step.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}