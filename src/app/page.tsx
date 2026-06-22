import Link from "next/link";
import { ArrowRight, Check, ChevronRight, FileCheck2, LayoutTemplate, Sparkles, WandSparkles, Zap, ShieldCheck, Quote } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const features = [
  { icon: WandSparkles, title: "Write with confidence", body: "Turn rough notes into clear, achievement-led bullet points with practical AI guidance." },
  { icon: FileCheck2, title: "Built for ATS", body: "Use recruiter-friendly structure and get a focused score before you send your application." },
  { icon: LayoutTemplate, title: "Designed to be read", body: "Professional templates keep the hierarchy sharp, polished, and easy to scan." },
];

const faqs = [
  ["Is Careerly really free to start?", "Yes. You can create an account and build your first resume without a credit card."],
  ["Will my resume work with applicant tracking systems?", "Careerly uses clean, predictable structure designed for ATS parsing while staying readable for hiring teams."],
  ["Does the AI invent experience for me?", "No. It helps you express the information you provide more clearly. You stay in control and can edit every word."],
  ["Can I update my resume later?", "Absolutely. Your resume remains editable, so you can tailor it for each role as your career grows."],
];

function ResumeMockup({ accent = "#6558e8", className = "" }: { accent?: string; className?: string }) {
  return (
    <div className={`aspect-[4/5.2] rounded-[14px] border border-slate-200 bg-white p-[9%] shadow-[0_20px_50px_-28px_rgba(23,32,51,.45)] ${className}`}>
      <div className="mb-[8%] flex items-start justify-between">
        <div><div className="h-2.5 w-24 rounded" style={{ background: accent }} /><div className="mt-2 h-1.5 w-16 rounded bg-slate-200" /></div>
        <div className="size-8 rounded-full bg-slate-100" />
      </div>
      {[72, 92, 84].map((width, i) => <div key={i} className="mb-[8%]"><div className="mb-2 h-1.5 w-12 rounded" style={{ background: accent, opacity: .72 }} /><div className="space-y-1.5"><div className="h-1 rounded bg-slate-200" style={{ width: `${width}%` }} /><div className="h-1 w-full rounded bg-slate-100" /><div className="h-1 w-4/5 rounded bg-slate-100" /></div></div>)}
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#fbfcfe] text-slate-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="container-shell flex h-16 items-center justify-between">
          <BrandLogo />
          <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex" aria-label="Main navigation">
            <a href="#features" className="hover:text-slate-950">Features</a><a href="#templates" className="hover:text-slate-950">Templates</a><a href="#how" className="hover:text-slate-950">How it works</a><a href="#faq" className="hover:text-slate-950">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:px-4">Sign in</Link>
            <Link href="/auth/register" className="rounded-xl bg-[#6558e8] px-3.5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_-10px_#6558e8] hover:-translate-y-0.5 hover:bg-[#5145cd] sm:px-5">Create free</Link>
          </div>
        </div>
      </header>

      <section className="relative pb-24 pt-32 sm:pt-40 lg:pb-32">
        <div className="soft-grid absolute inset-0" /><div className="absolute left-1/2 top-28 size-[420px] -translate-x-1/2 rounded-full bg-violet-200/45 blur-[100px]" />
        <div className="container-shell relative grid items-center gap-16 lg:grid-cols-[1.02fr_.98fr]">
          <div className="max-w-2xl animate-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#5d51d6] shadow-sm"><Sparkles className="size-3.5" /> Smarter resumes. Stronger applications.</div>
            <h1 className="text-balance text-[clamp(2.7rem,7vw,5.25rem)] font-semibold leading-[.98] tracking-[-.06em]">Your experience,<br/><span className="bg-gradient-to-r from-[#6558e8] to-[#9b67e8] bg-clip-text text-transparent">made impossible to miss.</span></h1>
            <p className="mt-7 max-w-xl text-[17px] leading-7 text-slate-600 sm:text-lg">Build an ATS-ready resume that sounds like you—only sharper. Guided steps, thoughtful AI, and clean templates get you application-ready in minutes.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/auth/register" className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#6558e8] px-6 py-3.5 font-semibold text-white shadow-[0_14px_28px_-14px_#6558e8] hover:-translate-y-0.5 hover:bg-[#5145cd]">Create resume free <ArrowRight className="size-4" /></Link><a href="#templates" className="inline-flex items-center justify-center rounded-[14px] border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50">Explore templates</a></div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500"><span className="flex items-center gap-1.5"><Check className="size-3.5 text-emerald-600"/>No credit card</span><span className="flex items-center gap-1.5"><Check className="size-3.5 text-emerald-600"/>ATS-friendly</span><span className="flex items-center gap-1.5"><Check className="size-3.5 text-emerald-600"/>Edit anytime</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-[560px] animate-up delay-2">
            <div className="absolute -inset-5 rotate-2 rounded-[32px] bg-gradient-to-br from-violet-100 to-blue-100" />
            <div className="premium-shadow relative rounded-[24px] border border-white/80 bg-white/85 p-4 backdrop-blur sm:p-6">
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4"><div className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[#6558e8]"/><span className="text-sm font-semibold">Product designer resume</span></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">Saved</span></div>
              <div className="grid grid-cols-[.85fr_1.15fr] gap-4"><div className="space-y-3"><div className="rounded-xl border border-violet-100 bg-violet-50 p-3"><div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#5d51d6]"><Sparkles className="size-3.5"/>AI suggestion</div><p className="text-[10px] leading-4 text-slate-600">Strengthen this bullet with a measurable outcome.</p></div>{["Personal details","Experience","Skills","Education"].map((x,i)=><div key={x} className={`flex items-center gap-2 rounded-lg px-2 py-2 text-[11px] ${i===1?"bg-slate-900 text-white":"text-slate-500"}`}><span className={`grid size-4 place-items-center rounded-full text-[8px] ${i<2?"bg-violet-500 text-white":"bg-slate-100"}`}>{i<2?"✓":i+1}</span>{x}</div>)}</div><ResumeMockup accent="#6558e8" className="animate-float" /></div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-slate-200/70 bg-white py-24"><div className="container-shell"><div className="max-w-2xl"><p className="eyebrow">Built for the job search</p><h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Every detail working toward your next interview.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-3">{features.map(({icon:Icon,title,body})=><article key={title} className="rounded-[20px] border border-slate-200 bg-[#fbfcfe] p-6 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"><span className="grid size-10 place-items-center rounded-xl bg-[#efedff] text-[#6558e8]"><Icon className="size-5"/></span><h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></article>)}</div></div></section>

      <section id="templates" className="py-24"><div className="container-shell grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Professional templates</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.045em]">A polished first impression, by default.</h2><p className="mt-5 leading-7 text-slate-600">Our layouts balance personality with restraint—clear hierarchy, generous whitespace, and formatting that holds up from screen to print.</p><Link href="/auth/register" className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-[#5d51d6]">Choose your template <ChevronRight className="size-4"/></Link></div><div className="grid grid-cols-3 items-end gap-3 rounded-[28px] bg-[#f0effb] p-5 sm:gap-5 sm:p-9"><ResumeMockup accent="#172033" className="-rotate-3"/><ResumeMockup accent="#6558e8" className="relative z-10 scale-105"/><ResumeMockup accent="#16845b" className="rotate-3"/></div></div></section>

      <section className="bg-slate-950 py-24 text-white"><div className="container-shell grid items-center gap-14 lg:grid-cols-2"><div className="rounded-[24px] border border-white/10 bg-white/[.06] p-5 sm:p-8"><div className="mb-6 flex items-center justify-between"><span className="text-sm font-semibold">AI writing studio</span><span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs text-violet-200">Powered by AI</span></div><div className="rounded-2xl bg-white p-5 text-slate-900"><p className="text-xs font-semibold text-slate-400">YOUR DRAFT</p><p className="mt-2 text-sm text-slate-500">Worked on the checkout experience and improved the product.</p><div className="my-4 h-px bg-slate-100"/><p className="text-xs font-semibold text-[#6558e8]">ATSReady SUGGESTION</p><p className="mt-2 text-sm leading-6">Redesigned the checkout journey, reducing cart abandonment by 18% across mobile and desktop.</p><button className="mt-5 rounded-lg bg-[#6558e8] px-3 py-2 text-xs font-semibold text-white">Use suggestion</button></div></div><div><p className="eyebrow !text-violet-300">AI that edits with you</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Better words.<br/>Still your story.</h2><p className="mt-5 max-w-lg leading-7 text-slate-400">Generate summaries, clarify achievements, discover relevant skills, and check your ATS readiness—all without losing your voice.</p><div className="mt-7 grid grid-cols-2 gap-3 text-sm text-slate-300">{["Smart summaries","Stronger bullet points","Skill suggestions","ATS scoring"].map(x=><span key={x} className="flex items-center gap-2"><Zap className="size-4 text-violet-300"/>{x}</span>)}</div></div></div></section>

      <section id="how" className="py-24"><div className="container-shell text-center"><p className="eyebrow">How it works</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.045em]">From blank page to ready to apply.</h2><div className="mt-14 grid gap-5 text-left md:grid-cols-3">{[["01","Add your experience","Follow a focused, step-by-step flow. No formatting decisions required."],["02","Refine it with AI","Turn your details into concise, role-relevant content you can edit."],["03","Review and apply","Preview your finished resume, check the details, and get application-ready."]].map(([n,t,b])=><div key={n} className="relative rounded-[20px] border border-slate-200 bg-white p-7"><span className="text-sm font-semibold text-[#6558e8]">{n}</span><h3 className="mt-7 text-xl font-semibold">{t}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{b}</p></div>)}</div></div></section>

      <section className="bg-white py-24"><div className="container-shell"><div className="mx-auto max-w-3xl text-center"><Quote className="mx-auto size-8 text-violet-300"/><blockquote className="mt-7 text-balance text-2xl font-medium leading-10 tracking-[-.025em] sm:text-3xl">ATSReady helped me turn years of scattered experience into a resume that finally felt focused. I started getting better responses within two weeks.”</blockquote><div className="mt-7"><p className="font-semibold">Maya R.</p><p className="text-sm text-slate-500">Product Designer · Bengaluru</p></div></div><div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[.12em] text-slate-400"><span>Clear writing</span><span>ATS-ready</span><span>Thoughtful AI</span><span>Professional design</span></div></div></section>

      <section id="faq" className="py-24"><div className="container-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">Questions, answered</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.045em]">Everything you need to get started.</h2></div><div className="divide-y divide-slate-200">{faqs.map(([q,a])=><details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold">{q}<span className="text-xl font-light text-slate-400 group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-3 text-sm leading-6 text-slate-600">{a}</p></details>)}</div></div></section>

      <section className="px-3 pb-3"><div className="mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-[#6558e8] px-6 py-16 text-center text-white sm:py-20"><ShieldCheck className="mx-auto size-7 text-violet-200"/><h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Your next opportunity deserves your best resume.</h2><p className="mt-5 text-violet-100">Start free. Build with confidence. Apply when you’re ready.</p><Link href="/auth/register" className="mt-8 inline-flex items-center gap-2 rounded-[14px] bg-white px-6 py-3.5 font-semibold text-[#5145cd] hover:-translate-y-0.5">Create resume free <ArrowRight className="size-4"/></Link></div></section>

      <footer className="py-10"><div className="container-shell flex flex-col items-center justify-between gap-5 text-sm text-slate-500 sm:flex-row"><BrandLogo/><p>© {new Date().getFullYear()} ATSReady. Built for your next move.</p><div className="flex gap-5"><a href="#features">Features</a><a href="#faq">FAQ</a><Link href="/auth/login">Sign in</Link></div></div></footer>
    </main>
  );
}
