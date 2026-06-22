"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Check, ChevronLeft, CircleUserRound, GraduationCap, Wrench, FolderKanban, BriefcaseBusiness, AlignLeft, Eye } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const steps = [
  { title:"Personal", label:"Personal info", path:"personal-info", icon:CircleUserRound },
  { title:"Education", label:"Education", path:"education", icon:GraduationCap },
  { title:"Skills", label:"Skills", path:"skills", icon:Wrench },
  { title:"Projects", label:"Projects", path:"projects", icon:FolderKanban },
  { title:"Experience", label:"Experience", path:"experience", icon:BriefcaseBusiness },
  { title:"Summary", label:"Summary", path:"summary", icon:AlignLeft },
  { title:"Preview", label:"Preview", path:"preview", icon:Eye },
];

export default function ResumeSidebar(){
  const pathname=usePathname(); const {resumeId}=useParams<{resumeId:string}>(); const activeIndex=Math.max(0,steps.findIndex(s=>pathname.endsWith(`/${s.path}`))); const progress=Math.round(((activeIndex+1)/steps.length)*100);
  return <>
    <aside className="hidden w-[260px] shrink-0 border-r border-slate-200 bg-white lg:flex lg:min-h-screen lg:flex-col">
      <div className="border-b border-slate-100 p-5"><BrandLogo href="/dashboard"/><Link href="/dashboard" className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900"><ChevronLeft className="size-3.5"/>Back to dashboard</Link></div>
      <div className="px-5 pb-4 pt-5"><div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[.1em] text-slate-400">Resume progress</p><span className="text-xs font-semibold text-[#6558e8]">{progress}%</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#6558e8] transition-all" style={{width:`${progress}%`}}/></div></div>
      <nav className="flex-1 space-y-1 px-3 py-2">{steps.map((step,index)=>{const href=`/resume/${resumeId}/${step.path}`;const active=pathname===href;const complete=index<activeIndex;const Icon=step.icon;return <Link key={step.path} href={href} aria-current={active?"step":undefined} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${active?"bg-violet-50 font-semibold text-[#5d51d6]":"text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}><span className={`grid size-7 place-items-center rounded-lg ${active?"bg-white shadow-sm":complete?"bg-emerald-50 text-emerald-600":"bg-slate-50 text-slate-400"}`}>{complete?<Check className="size-3.5"/>:<Icon className="size-3.5"/>}</span>{step.label}</Link>})}</nav>
      <div className="m-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-xs font-semibold">Your changes are saved per step</p><p className="mt-1 text-[11px] leading-4 text-slate-500">Use “Save & Continue” before moving on.</p></div>
    </aside>
    <div className="border-b border-slate-200 bg-white lg:hidden"><div className="flex h-14 items-center justify-between px-4"><BrandLogo href="/dashboard" compact/><span className="text-sm font-semibold">{steps[activeIndex].label}</span><span className="text-xs font-semibold text-[#6558e8]">{activeIndex+1}/{steps.length}</span></div><div className="overflow-x-auto px-3 pb-3"><nav className="flex min-w-max gap-1">{steps.map((step,index)=>{const href=`/resume/${resumeId}/${step.path}`;const active=pathname===href;return <Link key={step.path} href={href} className={`rounded-lg px-3 py-2 text-xs font-medium ${active?"bg-[#6558e8] text-white":"bg-slate-50 text-slate-500"}`}>{index+1}. {step.title}</Link>})}</nav></div><div className="h-1 bg-slate-100"><div className="h-full bg-[#6558e8]" style={{width:`${progress}%`}}/></div></div>
  </>;
}
