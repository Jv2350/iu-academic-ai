import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleHeader } from "@/components/academic/module-header";
import { assignments } from "@/data/assignment";

export default function AssignmentsPage() {
  return <main className="mx-auto w-full max-w-6xl space-y-8 p-5 sm:p-8"><ModuleHeader eyebrow="Coursework" title="Assignments" description="Stay ahead of submissions with a clear view of your pending work." action="Ask AI what to do first" href="/chat?prompt=Which%20assignment%20should%20I%20complete%20first%3F" /><div className="flex flex-wrap gap-2"><Badge variant="outline" className="border-indigo-200 bg-indigo-50 text-indigo-700">All</Badge><Badge variant="outline">Pending</Badge><Badge variant="outline">Completed</Badge><Badge variant="outline">Overdue</Badge><span className="ml-auto flex items-center gap-2 text-xs text-slate-400"><Filter className="size-3.5" /> Demo data</span></div><Card className="border-slate-200/80 shadow-sm"><CardContent className="p-0">{assignments.map((item) => <div key={item.assignment} className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 last:border-0 sm:flex-row sm:items-center"><div className="flex-1"><p className="font-semibold text-slate-900">{item.assignment}</p><p className="mt-1 text-sm text-slate-500">{item.subject} · Due {item.deadline}</p></div><Badge variant="outline" className={item.priority === "High" ? "border-red-200 text-red-700" : "border-amber-200 text-amber-700"}>{item.priority}</Badge><Badge className={item.status === "Completed" ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50" : "bg-slate-100 text-slate-700 hover:bg-slate-100"}>{item.status}</Badge></div>)}</CardContent></Card></main>;
}
