"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, LoaderCircle } from "lucide-react";
import { registerUser } from "@/apis/auth.api";
import { AuthShell, authButtonClass, authInputClass } from "@/components/auth-shell";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); try { setLoading(true); setError(""); await registerUser(formData); router.push("/auth/login"); } catch (err: unknown) { const axiosError = err as { response?: { data?: { message?: string } } }; setError(axiosError?.response?.data?.message || "We couldn't create your account. Please try again."); } finally { setLoading(false); } };
  return <AuthShell title="Create your account" description="Start free and build a professional resume in a few focused steps.">
    <form onSubmit={handleSubmit} className="space-y-5">
      <div><label htmlFor="name" className="text-sm font-medium text-slate-700">Full name</label><input id="name" type="text" autoComplete="name" required value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} placeholder="Your name" className={authInputClass}/></div>
      <div><label htmlFor="email" className="text-sm font-medium text-slate-700">Email address</label><input id="email" type="email" autoComplete="email" required value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} placeholder="you@example.com" className={authInputClass}/></div>
      <div><div className="flex items-center justify-between"><label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label><span className="text-xs text-slate-400">Use 8+ characters</span></div><input id="password" type="password" autoComplete="new-password" minLength={8} required value={formData.password} onChange={e=>setFormData({...formData,password:e.target.value})} placeholder="Create a password" className={authInputClass}/></div>
      {error&&<div role="alert" className="flex gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700"><AlertCircle className="mt-0.5 size-4 shrink-0"/>{error}</div>}
      <button disabled={loading} className={authButtonClass}>{loading?<><LoaderCircle className="mr-2 size-4 animate-spin"/>Creating account…</>:<>Create account <ArrowRight className="ml-2 size-4"/></>}</button>
    </form>
    <p className="mt-7 text-center text-sm text-slate-500">Already have an account? <Link href="/auth/login" className="font-semibold text-[#5d51d6] hover:text-[#5145cd]">Sign in</Link></p>
    <p className="mt-10 text-center text-xs leading-5 text-slate-400">By creating an account, you agree to use ATSReady responsibly and keep your information accurate.</p>
  </AuthShell>;
}
