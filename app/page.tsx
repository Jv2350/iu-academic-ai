import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, LayoutDashboard, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  ["AI Academic Assistant", "Ask grounded questions about exams, attendance, deadlines, and notices.", MessageCircle],
  ["Personalized Dashboard", "See your academic overview and what needs your attention next.", LayoutDashboard],
  ["Smart Study Mode", "Turn a topic into explanations, summaries, flashcards, or exam practice.", Sparkles],
  ["Academic Knowledge Base", "Find clear answers from curated university guidance and policies.", BookOpen],
] as const;

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-white text-slate-950"><GraduationCap className="size-5" /></span><span className="text-sm font-semibold tracking-tight">IU Academic AI</span></div>
        <Link href="/login" className="text-sm text-slate-300 transition-colors hover:text-white">Sign in</Link>
      </nav>
      <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 sm:pt-28"><div className="pointer-events-none absolute -right-32 -top-24 size-96 rounded-full bg-indigo-500/10 blur-3xl" /><div className="max-w-3xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-indigo-200"><Sparkles className="size-3.5" /> Built for focused academic progress</div><h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">Your academic information, <span className="text-indigo-300">in one conversation.</span></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">An intelligent academic assistant that helps students find academic information, prepare for exams, track assignments, understand attendance, and study smarter.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/login"><Button className="h-11 gap-2 bg-white px-5 text-slate-950 hover:bg-slate-100">Get Started <ArrowRight className="size-4" /></Button></Link><Link href="/login"><Button variant="outline" className="h-11 border-white/20 bg-white/5 px-5 text-white hover:bg-white/10">Explore Demo</Button></Link></div></div></section>
      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-20 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">{features.map(([title, description, Icon]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-indigo-300/30 hover:bg-white/[0.07]"><Icon className="size-5 text-indigo-300" /><h2 className="mt-5 font-medium">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p></div>)}</section>
      <footer className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-500">Prototype • Demo Academic Data</footer>
    </main>
  );
}
