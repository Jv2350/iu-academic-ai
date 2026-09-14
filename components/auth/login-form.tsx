"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      router.push("/dashboard");
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }

  async function demoSignIn() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/demo", { method: "POST" });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Unable to sign in.");
      router.push("/dashboard");
    } catch (demoError) {
      setError(demoError instanceof Error ? demoError.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8">
      <form className="space-y-5" onSubmit={signIn}>
        <label className="block text-sm font-medium text-slate-700">Email
          <span className="relative mt-2 block"><Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="h-11 pl-10" placeholder="you@university.edu" /></span>
        </label>
        <label className="block text-sm font-medium text-slate-700">Password
          <span className="relative mt-2 block"><LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><Input type={showPassword ? "text" : "password"} required value={password} onChange={(event) => setPassword(event.target.value)} className="h-11 pl-10 pr-10" placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></span>
        </label>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <Button disabled={busy} type="submit" className="h-11 w-full bg-slate-950 text-white hover:bg-slate-800">{busy && <Loader2 className="animate-spin" />} Sign In</Button>
      </form>
      <div className="my-6 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />or<span className="h-px flex-1 bg-slate-200" /></div>
      <Button disabled={busy} variant="outline" onClick={demoSignIn} className="h-11 w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">Continue with demo account</Button>
      <p className="mt-4 text-center text-xs leading-5 text-slate-400">Demo access is configured securely by the deployment administrator. No demo password is stored in the application.</p>
    </div>
  );
}
