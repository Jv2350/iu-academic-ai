"use client";

import { FormEvent, useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ChatInput({ disabled, onSubmit }: { disabled?: boolean; onSubmit: (content: string) => void }) {
  const [value, setValue] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = value.trim();
    if (!content || disabled) return;
    onSubmit(content);
    setValue("");
  }
  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100">
      <Textarea value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder="Ask anything about your academics..." disabled={disabled} rows={2} className="resize-none border-0 shadow-none focus-visible:ring-0" aria-label="Message" />
      <div className="flex items-center justify-between px-1 pt-1">
        <input ref={fileRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" />
        <Button type="button" variant="ghost" size="sm" onClick={() => fileRef.current?.click()} className="gap-2 text-slate-500"><Paperclip className="size-4" /> Attach</Button>
        <Button type="submit" size="sm" disabled={disabled || !value.trim()} className="gap-2 bg-slate-950 text-white hover:bg-slate-800"><Send className="size-4" /> Send</Button>
      </div>
    </form>
  );
}
