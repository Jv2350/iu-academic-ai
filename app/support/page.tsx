import { SupportForm } from "@/components/support/support-form";

export default function SupportPage() {
  return <main className="mx-auto w-full max-w-3xl space-y-8 p-5 sm:p-8"><div><p className="text-sm font-medium text-indigo-600">Student services</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Contact Support</h1><p className="mt-2 text-slate-500">Tell the academic team what you need help with and we&apos;ll route it to the right place.</p></div><SupportForm /></main>;
}
