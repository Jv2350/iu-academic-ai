"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = ["Examination", "Attendance", "Assignment", "Technical Issue", "General Academic"];

export function SupportForm() {
  const [category, setCategory] = useState(categories[0]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading"); setError("");
    try {
      const response = await fetch("/api/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category, subject, description }) });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Unable to submit your request.");
      setStatus("success"); setSubject(""); setDescription("");
    } catch (submitError) {
      setStatus("error"); setError(submitError instanceof Error ? submitError.message : "Unable to submit your request.");
    }
  }

  if (status === "success") return <Card className="border-emerald-200 bg-emerald-50/60"><CardContent className="flex flex-col items-center p-10 text-center"><CheckCircle2 className="size-10 text-emerald-600" /><h2 className="mt-4 text-lg font-semibold text-emerald-950">Request submitted</h2><p className="mt-2 text-sm text-emerald-800">Your support request has been sent to the academic team.</p><Button variant="outline" className="mt-6 border-emerald-200" onClick={() => setStatus("idle")}>Submit another request</Button></CardContent></Card>;

  return <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-6 sm:p-8"><form onSubmit={submit} className="space-y-5"><label className="block text-sm font-medium text-slate-700">Category<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100">{categories.map((item) => <option key={item}>{item}</option>)}</select></label><label className="block text-sm font-medium text-slate-700">Subject<input required value={subject} onChange={(event) => setSubject(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100" placeholder="What do you need help with?" /></label><label className="block text-sm font-medium text-slate-700">Description<textarea required minLength={10} maxLength={3000} value={description} onChange={(event) => setDescription(event.target.value)} className="mt-2 min-h-32 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100" placeholder="Share the relevant details..." /></label>{error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}<Button disabled={status === "loading"} className="gap-2 bg-slate-950 text-white hover:bg-slate-800">{status === "loading" ? <Loader2 className="animate-spin" /> : <Send className="size-4" />} Submit request</Button></form></CardContent></Card>;
}
