"use client";

import { useState } from "react";
import { Eraser, Sparkles } from "lucide-react";
import { ChatInput } from "./chat-input";
import { MessageBubble } from "./message-bubble";
import type { ChatMessage } from "@/lib/ai/types";
import { Button } from "@/components/ui/button";

const suggestions = ["When is my next exam?", "What are the exam guidelines?", "What is my attendance?", "What assignments are pending?", "What are the latest notices?", "Help me prepare for my exam"];

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(content: string) {
    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages); setLoading(true); setError(null);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nextMessages }) });
      const payload = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !payload.answer) throw new Error(payload.error || "The assistant could not respond.");
      setMessages([...nextMessages, { role: "assistant", content: payload.answer }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The assistant could not respond.");
    } finally { setLoading(false); }
  }

  function regenerate() {
    const lastUser = [...messages].reverse().find((message) => message.role === "user");
    if (lastUser) void sendMessage(lastUser.content);
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-190px)] w-full max-w-4xl flex-col">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600"><span className="size-2 rounded-full bg-emerald-500" /> Academic Copilot <span className="text-slate-400">• Online</span></div>
        {messages.length > 0 && <Button variant="ghost" size="sm" onClick={() => setMessages([])} className="gap-2 text-slate-500"><Eraser className="size-4" /> Clear conversation</Button>}
      </div>
      <div className="flex flex-1 flex-col justify-end gap-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 sm:p-7">
        {messages.length === 0 ? (
          <div className="m-auto max-w-xl text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10"><Sparkles className="size-7" /></span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">Ask me anything about your academics.</h2>
            <p className="mt-2 text-sm text-slate-500">I can help you find reliable information about your exams, schedule, attendance, and study plans.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-2">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => void sendMessage(suggestion)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">{suggestion}</button>)}</div>
          </div>
        ) : messages.map((message, index) => <MessageBubble key={`${message.role}-${index}`} message={message} onRegenerate={message.role === "assistant" && index === messages.length - 1 ? regenerate : undefined} />)}
        {loading && <div className="flex items-center gap-3 text-sm text-slate-500"><span className="flex size-8 items-center justify-center rounded-lg bg-slate-950 text-white"><Sparkles className="size-4" /></span><span>Academic AI is thinking<span className="thinking-dots">...</span></span></div>}
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      </div>
      <div className="mt-4"><ChatInput disabled={loading} onSubmit={sendMessage} /><p className="mt-2 text-center text-[11px] text-slate-400">Academic AI can make mistakes. Verify important information with official university sources.</p></div>
    </section>
  );
}
