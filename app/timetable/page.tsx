import { Clock3, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleHeader } from "@/components/academic/module-header";
import { timetable } from "@/data/timetable";

export default function TimetablePage() {
  return <main className="mx-auto w-full max-w-6xl space-y-8 p-5 sm:p-8"><ModuleHeader eyebrow="Weekly schedule" title="Timetable" description="Your Monday to Friday teaching schedule at a glance." action="Ask AI about this timetable" href="/chat?prompt=Which%20class%20do%20I%20have%20tomorrow%3F" /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => <Card key={day} className="border-slate-200/80 shadow-sm"><CardContent className="p-4"><h2 className="mb-4 font-semibold text-slate-900">{day}</h2><div className="space-y-3">{timetable.filter((item) => item.day === day).map((item) => <div key={`${day}-${item.time}`} className="rounded-lg bg-slate-50 p-3"><p className="text-sm font-medium text-indigo-700">{item.subject}</p><p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500"><Clock3 className="size-3.5" />{item.time}</p><p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><MapPin className="size-3.5" />{item.room}</p><p className="mt-2 text-xs text-slate-400">{item.faculty}</p></div>)}</div></CardContent></Card>)}</div></main>;
}
