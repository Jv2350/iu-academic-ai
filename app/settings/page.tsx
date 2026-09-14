import { Settings2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export default function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-8 p-5 sm:p-8">
      <div><p className="text-sm font-medium text-indigo-600">Preferences</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Settings</h1><p className="mt-2 text-slate-500 dark:text-slate-400">Personalize your IU Academic AI workspace.</p></div>
      <Card className="border-slate-200/80 shadow-sm dark:border-slate-800 dark:bg-slate-900"><CardContent className="flex items-center justify-between gap-5 p-6"><div className="flex items-start gap-3"><Settings2 className="mt-0.5 size-5 text-indigo-500" /><div><h2 className="font-medium text-slate-900 dark:text-white">Theme</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose light, dark, or follow your system preference.</p></div></div><ThemeSwitcher /></CardContent></Card>
      <p className="text-xs text-slate-400">Prototype • Demo Academic Data</p>
    </main>
  );
}
