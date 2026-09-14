"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw, ThumbsDown, ThumbsUp, Sparkles, User } from "lucide-react";
import type { ChatMessage } from "@/lib/ai/types";
import { SourceCard } from "./source-card";

function renderContent(content: string) {
  return content.split("\n").map((line, index) => {
    if (line.startsWith("```")) return null;
    if (line.startsWith("- ")) return <li key={index} className="ml-4 list-disc">{line.slice(2)}</li>;
    if (line.startsWith("|")) return <div key={index} className="font-mono text-xs">{line}</div>;
    return <p key={index} className={index ? "mt-2" : ""}>{line || "\u00a0"}</p>;
  });
}

export function MessageBubble({ message, onRegenerate }: { message: ChatMessage; onRegenerate?: () => void }) {
  const [copied, setCopied] = useState(false);
  const user = message.role === "user";

  async function copy() {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className={`flex gap-3 ${user ? "justify-end" : "justify-start"}`}>
      {!user && <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white"><Sparkles className="size-4" /></span>}
      <div className={`max-w-[85%] ${user ? "order-first" : ""}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-6 ${user ? "rounded-tr-sm bg-indigo-600 text-white" : "rounded-tl-sm border border-slate-200 bg-white text-slate-700 shadow-sm"}`}>
          {renderContent(message.content)}
          {!user && message.sources?.map((source) => <SourceCard key={`${source.title}-${source.section}`} source={source} />)}
        </div>
        {!user && (
          <div className="mt-2 flex items-center gap-1 text-slate-400">
            <button onClick={copy} className="rounded p-1.5 hover:bg-slate-100" aria-label="Copy response">{copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}</button>
            <button className="rounded p-1.5 hover:bg-slate-100" aria-label="Helpful"><ThumbsUp className="size-3.5" /></button>
            <button className="rounded p-1.5 hover:bg-slate-100" aria-label="Not helpful"><ThumbsDown className="size-3.5" /></button>
            {onRegenerate && <button onClick={onRegenerate} className="rounded p-1.5 hover:bg-slate-100" aria-label="Regenerate response"><RefreshCw className="size-3.5" /></button>}
          </div>
        )}
      </div>
      {user && <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700"><User className="size-4" /></span>}
    </div>
  );
}
