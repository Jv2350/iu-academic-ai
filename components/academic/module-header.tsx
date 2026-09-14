import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModuleHeader({
  eyebrow,
  title,
  description,
  action,
  href,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  href: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <Link href="/dashboard" className="mb-5 inline-flex items-center gap-2 text-xs text-slate-400 hover:text-slate-700"><ArrowLeft className="size-3.5" /> Dashboard</Link>
        <p className="text-sm font-medium text-indigo-600">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
        <p className="mt-2 text-slate-500">{description}</p>
      </div>
      <Link href={href}><Button className="gap-2 bg-slate-950 text-white hover:bg-slate-800"><Sparkles className="size-4" /> {action} <ArrowRight className="size-4" /></Button></Link>
    </div>
  );
}
