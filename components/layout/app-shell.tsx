"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search, Sparkles } from "lucide-react";
import { Sidebar } from "./sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#f7f8fb] text-slate-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu />
            </Button>
            <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
              <Sparkles className="size-4 text-indigo-500" />
              <span>Your academic information, in one conversation.</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Search />
            </Button>
            <Button variant="ghost" size="icon" className="relative text-slate-500">
              <Bell />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-indigo-500" />
            </Button>
            <ThemeSwitcher compact />
            <Avatar size="sm" className="ml-2 bg-indigo-100 text-indigo-700">
              <AvatarFallback className="bg-indigo-100 text-xs font-semibold text-indigo-700">DS</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-slate-200/80 bg-white px-5 py-3 text-center text-[11px] text-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-500">
          Prototype • Demo Academic Data
        </footer>
      </div>
    </div>
  );
}
