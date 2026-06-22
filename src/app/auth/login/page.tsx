"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, LoaderCircle } from "lucide-react";
import { loginUser } from "@/apis/auth.api";
import { AuthShell, authButtonClass, authInputClass } from "@/components/auth-shell";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); try { setLoading(true); setError(""); await loginUser(formData); router.push("/dashboard"); } catch (err: unknown) { const axiosError = err as { response?: { data?: { message?: string } } }; setError(axiosError?.response?.data?.message || "We couldn't sign you in. Check your details and try again."); } finally { setLoading(false); } };
  return <AuthShell title="Welcome back" description="Sign in to continue building your strongest resume.">
    <form onSubmit={handleSubmit} className="space-y-5">
      <div><label htmlFor="email" className="text-sm font-medium text-slate-700">Email address</label><input id="email" type="email" name="email" autoComplete="email" required value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} placeholder="you@example.com" className={authInputClass}/></div>
      <div><div className="flex items-center justify-between"><label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label><span className="text-xs text-slate-400">8+ characters</span></div><input id="password" type="password" name="password" autoComplete="current-password" required value={formData.password} onChange={e=>setFormData({...formData,password:e.target.value})} placeholder="Enter your password" className={authInputClass}/></div>
      {error&&<div role="alert" className="flex gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700"><AlertCircle className="mt-0.5 size-4 shrink-0"/>{error}</div>}
      <button disabled={loading} className={authButtonClass}>{loading?<><LoaderCircle className="mr-2 size-4 animate-spin"/>Signing in…</>:<>Sign in <ArrowRight className="ml-2 size-4"/></>}</button>
    </form>
    <p className="mt-7 text-center text-sm text-slate-500">New to ATSReady? <Link href="/auth/register" className="font-semibold text-[#5d51d6] hover:text-[#5145cd]">Create a free account</Link></p>
    <p className="mt-10 text-center text-xs leading-5 text-slate-400">By continuing, you agree to use ATSReady responsibly and keep your account secure.</p>
  </AuthShell>;
}
