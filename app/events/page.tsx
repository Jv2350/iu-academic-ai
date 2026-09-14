import { Clock3, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleHeader } from "@/components/academic/module-header";
import { events } from "@/data/events";

export default function EventsPage() {
  return <main className="mx-auto w-full max-w-6xl space-y-8 p-5 sm:p-8"><ModuleHeader eyebrow="Campus life" title="Events" description="Discover upcoming academic events, workshops, and opportunities." action="Ask AI about events" href="/chat?prompt=What%20academic%20events%20are%20coming%20up%3F" /><div className="grid gap-5 md:grid-cols-3">{events.map((event) => <Card key={event.name} className="overflow-hidden border-slate-200/80 shadow-sm"><div className="h-2 bg-indigo-600" /><CardContent className="p-5"><div className="mb-5 flex size-12 flex-col items-center justify-center rounded-xl bg-indigo-50 text-indigo-700"><span className="text-[10px] font-semibold uppercase">{event.date.split(" ")[1]}</span><span className="text-xl font-semibold">{event.date.split(" ")[0]}</span></div><h2 className="font-semibold text-slate-900">{event.name}</h2><p className="mt-2 text-sm leading-5 text-slate-500">{event.description}</p><div className="mt-5 space-y-2 text-xs text-slate-500"><p className="flex items-center gap-2"><Clock3 className="size-3.5 text-indigo-500" />{event.time}</p><p className="flex items-center gap-2"><MapPin className="size-3.5 text-indigo-500" />{event.location}</p></div></CardContent></Card>)}</div></main>;
}
