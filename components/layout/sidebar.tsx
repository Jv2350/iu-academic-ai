"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
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
  PanelLeftClose,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Assistant", href: "/chat", icon: MessageCircle },
  { label: "Study Mode", href: "/study", icon: BookOpen },
  { label: "Exams", href: "/exams", icon: ClipboardCheck },
  { label: "Timetable", href: "/timetable", icon: CalendarDays },
  { label: "Attendance", href: "/attendance", icon: AlarmClock },
  { label: "Assignments", href: "/assignments", icon: FileText },
  { label: "Notices", href: "/notices", icon: Sparkles },
  { label: "Events", href: "/events", icon: Users },
  { label: "Library", href: "/library", icon: BookOpen },
  { label: "Contact Support", href: "/support", icon: LifeBuoy },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({
  open,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) {
      setLoggingOut(false);
      return;
    }
    router.push("/login");
  }

  return (
    <>
      {open && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white px-4 py-5 shadow-xl transition-transform duration-200 lg:static lg:translate-x-0 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-7 flex items-center justify-between px-2">
          <Link href="/dashboard" className="flex items-center gap-3" onClick={onClose}>
            <span className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
              <GraduationCap className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight text-slate-950">
                IU Academic AI
              </span>
              <span className="block text-xs text-slate-500">Student workspace</span>
            </span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
            <X />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Workspace
          </p>
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href === "/chat" && pathname === "/chat");
            return (
              <Link
                key={label}
                href={href}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-slate-950 font-medium text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <Icon className="size-[17px]" />
                {label}
                {label === "AI Assistant" && (
                  <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${active ? "bg-white/15 text-white" : "bg-indigo-50 text-indigo-600"}`}>
                    AI
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <Avatar className="size-9 bg-indigo-100 text-indigo-700">
              <AvatarFallback className="bg-indigo-100 text-xs font-semibold text-indigo-700">
                DS
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">Demo Student</p>
              <p className="truncate text-xs text-slate-500">MSc Cyber Security · Sem 1</p>
            </div>
            <Badge variant="outline" className="hidden border-indigo-200 bg-white text-[10px] text-indigo-600 sm:inline-flex">
              Student
            </Badge>
          </div>
          <Button variant="ghost" disabled={loggingOut} onClick={logout} className="mt-2 w-full justify-start gap-3 text-slate-500 hover:text-slate-900">
            <LogOut className="size-4" />
            Log out
          </Button>
        </div>
      </aside>
    </>
  );
}

export { PanelLeftClose };
