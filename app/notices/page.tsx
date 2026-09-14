import { Bell, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleHeader } from "@/components/academic/module-header";
import { notices } from "@/data/notices";

export default function NoticesPage() {
  return <main className="mx-auto w-full max-w-5xl space-y-8 p-5 sm:p-8"><ModuleHeader eyebrow="University communication" title="Notices" description="The latest academic updates relevant to your student workspace." action="Ask AI: What changed recently?" href="/chat?prompt=What%20changed%20recently%3F" /><div className="space-y-4">{notices.map((notice) => <Card key={notice.title} className="border-slate-200/80 shadow-sm"><CardContent className="flex gap-4 p-5"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Bell className="size-5" /></span><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold text-slate-900">{notice.title}</h2><Badge variant="outline" className="text-xs">{notice.category}</Badge></div><p className="mt-2 text-sm text-slate-500">{notice.description}</p><p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400"><CalendarDays className="size-3.5" />{notice.date}</p></div></CardContent></Card>)}</div></main>;
}
