import { ReactNode } from "react";
import ResumeSidebar from "@/app/resume/slidbar";

interface ResumeLayoutProps {
  children: ReactNode;
}

export default function ResumeLayout({
  children,
}: ResumeLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f7f8fb]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <ResumeSidebar />
        <main className="builder-content min-w-0 flex-1 px-3 py-5 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
