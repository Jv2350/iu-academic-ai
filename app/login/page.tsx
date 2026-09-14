import { GraduationCap } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fb] p-5">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 lg:grid-cols-[1fr_0.9fr]">
        <div className="hidden flex-col justify-between bg-slate-950 p-10 text-white lg:flex">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white text-slate-950"><GraduationCap className="size-5" /></span>
            <span><strong className="block text-sm">IU Academic AI</strong><span className="text-xs text-slate-400">Student workspace</span></span>
          </div>
          <div><p className="max-w-sm text-3xl font-semibold leading-tight">Your academic information, in one conversation.</p><p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">A focused copilot for exams, deadlines, attendance, and your everyday academic decisions.</p></div>
          <p className="text-xs text-slate-500">Secure student access · Supabase Authentication</p>
        </div>
        <div className="p-7 sm:p-12">
          <div className="mb-8 flex items-center gap-3 lg:hidden"><span className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-white"><GraduationCap className="size-5" /></span><strong>IU Academic AI</strong></div>
          <p className="text-sm font-medium text-indigo-600">STUDENT PORTAL</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Welcome back</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Sign in to continue to your academic assistant.</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
