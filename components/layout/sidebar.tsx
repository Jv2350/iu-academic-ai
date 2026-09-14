
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AlarmClock,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  MessageCircle,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { demoStudent } from "@/data/student";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "AI Assistant",
    href: "/chat",
    icon: MessageCircle,
  },
  {
    label: "Study Mode",
    href: "/study",
    icon: BookOpen,
  },
  {
    label: "Exams",
    href: "/exams",
    icon: ClipboardCheck,
  },
  {
    label: "Timetable",
    href: "/timetable",
    icon: CalendarDays,
  },
  {
    label: "Attendance",
    href: "/attendance",
    icon: AlarmClock,
  },
  {
    label: "Assignments",
    href: "/assignments",
    icon: FileText,
  },
  {
    label: "Notices",
    href: "/notices",
    icon: Sparkles,
  },
  {
    label: "Events",
    href: "/events",
    icon: Users,
  },
  {
    label: "Library",
    href: "/library",
    icon: BookOpen,
  },
  {
    label: "Contact Support",
    href: "/support",
    icon: LifeBuoy,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleClose = () => {
    onClose?.();
  };

  const logout = async () => {
    try {
      setLoggingOut(true);

      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col border-r border-slate-200 bg-white px-4 py-5 shadow-xl transition-transform duration-200 ease-in-out dark:border-slate-800 dark:bg-slate-900 ${open ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:shadow-none`}
      >
        {/* Logo / Header */}
        <div className="mb-7 flex items-center justify-between px-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
            onClick={handleClose}
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
              <GraduationCap className="size-5" />
            </span>

            <span>
              <span className="block text-sm font-semibold tracking-tight text-slate-950 dark:text-slate-100">
                IU Academic AI
              </span>

              <span className="block text-xs text-slate-400">
                Student workspace
              </span>
            </span>
          </Link>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={handleClose}
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav
          className="min-h-0 flex-1 space-y-1 overflow-y-auto"
          aria-label="Main navigation"
        >
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Workspace
          </p>

          {navigation.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={handleClose}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${active
                  ? "bg-slate-950 font-medium text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-[17px] shrink-0" />

                <span className="flex-1">{label}</span>

                {label === "AI Assistant" && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${active
                      ? "bg-white/15 text-white"
                      : "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300"
                      }`}
                  >
                    AI
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Student Profile */}
        <div className="mt-5 shrink-0 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70">
            <Avatar className="size-9 bg-indigo-100 text-indigo-700">
              <AvatarFallback className="bg-indigo-100 text-xs font-semibold text-indigo-700">
                {demoStudent.name
                  ?.split(" ")
                  .map((name) => name[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase() || "ST"}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                {demoStudent.name}
              </p>

              <p className="truncate text-xs text-slate-400">
                {demoStudent.program} · Sem {demoStudent.semester}
              </p>
            </div>

            <Badge
              variant="outline"
              className="hidden border-indigo-200 bg-white text-[10px] text-indigo-600 dark:border-indigo-800 dark:bg-slate-900 dark:text-indigo-300 sm:inline-flex"
            >
              Student
            </Badge>
          </div>

          {/* Logout */}
          <Button
            type="button"
            variant="ghost"
            disabled={loggingOut}
            onClick={logout}
            className="mt-2 w-full justify-start gap-3 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <LogOut className="size-4" />

            <span>{loggingOut ? "Logging out..." : "Log out"}</span>
          </Button>
        </div>
      </aside>
    </>
  );
}