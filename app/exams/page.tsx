import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleHeader } from "@/components/academic/module-header";
import { exams } from "@/data/exams";

export default function ExamsPage() {
  return <main className="mx-auto w-full max-w-6xl space-y-8 p-5 sm:p-8"><ModuleHeader eyebrow="Academic calendar" title="Upcoming Exams" description="Keep your assessment schedule close and arrive prepared." action="Ask AI about my exams" href="/chat?prompt=When%20is%20my%20next%20exam%3F" /><Card className="border-slate-200/80 shadow-sm"><CardContent className="p-0"><div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_0.8fr] gap-4 border-b border-slate-100 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 md:grid"><span>Subject</span><span>Date</span><span>Time</span><span>Venue</span><span>Status</span></div>{exams.map((exam) => <div key={exam.subject} className="grid gap-3 border-b border-slate-100 px-6 py-5 last:border-0 md:grid-cols-[1.5fr_1fr_1fr_1fr_0.8fr] md:items-center md:gap-4"><div className="font-semibold text-slate-900">{exam.subject}</div><div className="flex items-center gap-2 text-sm text-slate-600"><CalendarDays className="size-4 text-indigo-500 md:hidden" />{exam.date}</div><div className="flex items-center gap-2 text-sm text-slate-600"><Clock3 className="size-4 text-indigo-500 md:hidden" />{exam.time}</div><div className="flex items-center gap-2 text-sm text-slate-600"><MapPin className="size-4 text-indigo-500 md:hidden" />{exam.venue}</div><Badge className="w-fit bg-emerald-50 text-emerald-700 hover:bg-emerald-50">{exam.status}</Badge></div>)}</CardContent></Card></main>;
}
