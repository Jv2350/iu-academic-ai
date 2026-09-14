import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, ClipboardCheck, MessageCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quickActions = [
  { title: "Ask the Academic Copilot", description: "Find answers from your academic information.", href: "/chat", icon: MessageCircle, tone: "bg-indigo-50 text-indigo-600" },
  { title: "Review your timetable", description: "See what is coming up in your week.", href: "/timetable", icon: CalendarDays, tone: "bg-emerald-50 text-emerald-600" },
  { title: "Prepare for an exam", description: "Turn your study material into a focused plan.", href: "/chat?mode=study", icon: BookOpen, tone: "bg-amber-50 text-amber-600" },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] space-y-8 p-5 sm:p-8">
      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-sm font-medium text-indigo-600">Monday, 14 September 2026</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Good afternoon, Demo Student.</h1>
          <p className="mt-2 max-w-xl text-slate-500">Stay ahead of your semester with a clearer view of what matters next.</p>
        </div>
        <Link href="/chat">
          <Button className="gap-2 rounded-lg bg-slate-950 px-4 text-white hover:bg-slate-800">
            <Sparkles className="size-4" /> Open Academic Copilot <ArrowRight className="size-4" />
          </Button>
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {quickActions.map(({ title, description, href, icon: Icon, tone }) => (
          <Link key={title} href={href} className="group">
            <Card className="h-full border-slate-200/80 shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-slate-300 group-hover:shadow-md">
              <CardContent className="flex gap-4 p-5">
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${tone}`}><Icon className="size-5" /></span>
                <div><h2 className="font-semibold text-slate-900">{title}</h2><p className="mt-1 text-sm leading-5 text-slate-500">{description}</p></div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div><CardTitle className="text-lg">Coming up</CardTitle><p className="mt-1 text-sm text-slate-500">Your next academic milestones</p></div>
            <Badge variant="outline" className="border-slate-200 text-slate-500">This week</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["18 Sep", "Cyber Security examination", "10:30 AM · Room 204", ClipboardCheck],
              ["19 Sep", "Network Security assignment", "Due by 11:59 PM", BookOpen],
            ].map(([date, title, detail, Icon]) => (
              <div key={title as string} className="flex items-center gap-4 rounded-xl border border-slate-100 p-4">
                <div className="w-12 text-center"><p className="text-xs font-semibold uppercase text-indigo-600">{(date as string).split(" ")[1]}</p><p className="text-lg font-semibold text-slate-900">{(date as string).split(" ")[0]}</p></div>
                <div className="h-9 w-px bg-slate-200" />
                <Icon className="size-5 text-slate-400" />
                <div><p className="font-medium text-slate-900">{title as string}</p><p className="mt-0.5 text-sm text-slate-500">{detail as string}</p></div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-slate-200/80 bg-slate-950 text-white shadow-sm">
          <CardContent className="flex h-full flex-col justify-between p-6">
            <div><Badge className="border-0 bg-white/10 text-indigo-200">Academic Copilot</Badge><h2 className="mt-5 text-2xl font-semibold tracking-tight">Answers grounded in your academic information.</h2><p className="mt-3 text-sm leading-6 text-slate-300">Ask about exams, deadlines, attendance, or study plans. When reliable information is unavailable, we will tell you.</p></div>
            <Link href="/chat" className="mt-8"><Button variant="secondary" className="w-full justify-between bg-white text-slate-950 hover:bg-slate-100">Start a conversation <ArrowRight className="size-4" /></Button></Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
