
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

  // Pages without the application shell
  if (pathname === "/login" || pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="h-screen overflow-hidden bg-[#f7f8fb] text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main application area */}
      <div className="flex h-screen flex-col lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </Button>

            <div className="hidden items-center gap-2 text-sm text-slate-500 dark:text-slate-400 sm:flex">
              <Sparkles className="size-4 text-indigo-500" />
              <span>
                Your academic information, in one conversation.
              </span>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-slate-500 dark:text-slate-400"
              aria-label="Search"
            >
              <Search className="size-5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative text-slate-500 dark:text-slate-400"
              aria-label="Notifications"
            >
              <Bell className="size-5" />

              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-indigo-500" />
            </Button>

            <ThemeSwitcher compact />

            <Avatar
              size="sm"
              className="ml-2 bg-indigo-100 text-indigo-700"
            >
              <AvatarFallback className="bg-indigo-100 text-xs font-semibold text-indigo-700">
                DS
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          {children}

          {/* Footer */}
          <footer className="border-t border-slate-200/80 bg-white px-5 py-3 text-center text-[11px] text-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-500">
            Prototype • Demo Academic Data
          </footer>
        </main>
      </div>
    </div>
  );
}
