"use client";

import { Bell, Bot, Lock, Settings2, Shield, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { demoStudent } from "@/data/student";

export default function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 p-5 sm:p-8">
      <div><p className="text-sm font-medium text-indigo-600">Preferences</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Settings</h1><p className="mt-2 text-slate-500 dark:text-slate-400">Personalize your IU Academic AI workspace.</p></div>
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400"><UserRound className="size-4" /> Profile</h2>
        <Card className="border-slate-200/80 shadow-sm dark:border-slate-800 dark:bg-slate-900"><CardContent className="grid gap-4 p-6 sm:grid-cols-2"><div><p className="text-xs text-slate-400">Name</p><p className="mt-1 font-medium text-slate-900 dark:text-white">{demoStudent.name}</p></div><div><p className="text-xs text-slate-400">Programme</p><p className="mt-1 font-medium text-slate-900 dark:text-white">{demoStudent.program}</p></div><div><p className="text-xs text-slate-400">Semester / Division</p><p className="mt-1 font-medium text-slate-900 dark:text-white">{demoStudent.semester} · {demoStudent.division}</p></div><div><p className="text-xs text-slate-400">Email</p><p className="mt-1 font-medium text-slate-900 dark:text-white">{demoStudent.email}</p></div></CardContent></Card>
      </section>
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400"><Settings2 className="size-4" /> Appearance</h2>
        <Card className="border-slate-200/80 shadow-sm dark:border-slate-800 dark:bg-slate-900"><CardContent className="flex items-center justify-between gap-5 p-6"><div><h3 className="font-medium text-slate-900 dark:text-white">Theme</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose light, dark, or follow your system preference.</p></div><ThemeSwitcher /></CardContent></Card>
      </section>
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400"><Bot className="size-4" /> AI Preferences</h2>
        <Card className="border-slate-200/80 shadow-sm dark:border-slate-800 dark:bg-slate-900"><CardContent className="space-y-4 p-6"><div><h3 className="font-medium text-slate-900 dark:text-white">Response style</h3><div className="mt-3 flex flex-wrap gap-2">{["Concise", "Balanced", "Detailed"].map((style) => <button key={style} className={`rounded-full border px-3 py-2 text-xs ${style === "Balanced" ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"}`}>{style}</button>)}</div></div></CardContent></Card>
      </section>
      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="border-slate-200/80 shadow-sm dark:border-slate-800 dark:bg-slate-900"><CardContent className="p-5"><Bell className="size-5 text-indigo-500" /><h3 className="mt-3 font-medium text-slate-900 dark:text-white">Notifications</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage academic reminders and updates.</p></CardContent></Card>
        <Card className="border-slate-200/80 shadow-sm dark:border-slate-800 dark:bg-slate-900"><CardContent className="p-5"><div className="flex gap-3"><Lock className="size-5 text-indigo-500" /><Shield className="size-5 text-emerald-500" /></div><h3 className="mt-3 font-medium text-slate-900 dark:text-white">Privacy</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your student data is protected by Supabase Auth and RLS.</p></CardContent></Card>
      </section>
      <p className="text-xs text-slate-400">Prototype • Demo Academic Data</p>
    </main>
  );
}
