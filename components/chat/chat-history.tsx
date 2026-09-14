"use client";

import { useEffect, useState } from "react";
import { MessageSquarePlus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Session = { id: string; title: string | null; created_at: string };

export function ChatHistory({
  activeId,
  onNew,
  onSelect,
}: {
  activeId?: string;
  onNew: () => void;
  onSelect: (id: string) => void;
}) {
  const [sessions, setSessions] = useState<Session[]>([]);

  async function load() {
    const response = await fetch("/api/chat/sessions");
    if (response.ok) {
      const payload = (await response.json()) as { data?: Session[] };
      setSessions(payload.data ?? []);
    }
  }

  // The history list is synchronized with the authenticated session on mount.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, []);

  async function rename(session: Session) {
    const title = window.prompt("Rename conversation", session.title ?? "Conversation");
    if (!title?.trim()) return;
    await fetch(`/api/chat/sessions/${session.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title }) });
    void load();
  }

  async function remove(id: string) {
    await fetch(`/api/chat/sessions/${id}`, { method: "DELETE" });
    void load();
  }

  return (
    <aside className="hidden w-56 shrink-0 border-r border-slate-200/80 pr-4 lg:block">
      <Button variant="outline" className="mb-5 w-full justify-start gap-2" onClick={onNew}><MessageSquarePlus className="size-4" /> New chat</Button>
      <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Recent conversations</p>
      <div className="space-y-1">
        {sessions.map((session) => (
          <div key={session.id} className={`group flex items-center gap-1 rounded-lg ${activeId === session.id ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}>
            <button onClick={() => onSelect(session.id)} className="min-w-0 flex-1 truncate px-2 py-2 text-left text-xs">{session.title || "Conversation"}</button>
            <details className="relative mr-1">
              <summary className="list-none rounded p-1 hover:bg-white" aria-label="Conversation actions"><MoreHorizontal className="size-3.5" /></summary>
              <div className="absolute right-0 top-7 z-10 w-32 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                <button onClick={() => void rename(session)} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-slate-50"><Pencil className="size-3" /> Rename</button>
                <button onClick={() => void remove(session.id)} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-red-600 hover:bg-red-50"><Trash2 className="size-3" /> Delete</button>
              </div>
            </details>
          </div>
        ))}
      </div>
    </aside>
  );
}
