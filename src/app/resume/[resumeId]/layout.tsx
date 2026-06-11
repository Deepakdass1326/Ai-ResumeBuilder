import { ReactNode } from "react";
import ResumeSidebar from "@/app/resume/slidbar";

interface ResumeLayoutProps {
  children: ReactNode;
}

export default function ResumeLayout({
  children,
}: ResumeLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <ResumeSidebar />

        <main className="flex justify-center items-center w-full">
          {children}
        </main>
      </div>
    </div>
  );
}