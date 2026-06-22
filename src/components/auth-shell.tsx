import { ReactNode } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { BrandLogo } from "./brand-logo";

export function AuthShell({ children, title, description }: { children: ReactNode; title: string; description: string }) {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col">
        <div className="absolute inset-0 opacity-30 soft-grid" /><div className="absolute -right-24 top-1/3 size-96 rounded-full bg-violet-600/30 blur-[100px]" />
        <div className="relative"><BrandLogo href="/" inverse /></div>
        <div className="relative my-auto max-w-xl">
          <div className="mb-7 grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/10"><Sparkles className="size-5 text-violet-300"/></div>
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-[-.045em]">Build a resume that makes your value clear.</h2>
          <p className="mt-5 max-w-lg leading-7 text-slate-400">A focused writing flow, recruiter-ready templates, and thoughtful AI—together in one calm workspace.</p>
          <div className="mt-9 space-y-3 text-sm text-slate-300">{["ATS-friendly structure","AI-assisted writing","Professional, readable layouts"].map(x=><div key={x} className="flex items-center gap-3"><CheckCircle2 className="size-4 text-violet-300"/>{x}</div>)}</div>
        </div>
        <p className="relative text-xs text-slate-500">Your career story, presented at its best.</p>
      </section>
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[440px]">
          <div className="mb-10 lg:hidden"><BrandLogo /></div>
          <div className="mb-8"><h1 className="text-3xl font-semibold tracking-[-.035em] text-slate-900">{title}</h1><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></div>
          {children}
        </div>
      </section>
    </main>
  );
}

export const authInputClass = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100";
export const authButtonClass = "flex w-full items-center justify-center rounded-xl bg-[#6558e8] py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_-14px_#6558e8] hover:-translate-y-0.5 hover:bg-[#5145cd] disabled:translate-y-0 disabled:opacity-60";
