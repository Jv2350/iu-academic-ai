import { BookOpen, ExternalLink, FileText } from "lucide-react";
import type { SourceCitation } from "@/lib/rag/types";

export function SourceCard({ source }: { source: SourceCitation }) {
  const content = (
    <>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        {source.type === "student_record" ? <FileText className="size-4" /> : <BookOpen className="size-4" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">Source</span>
        <span className="block truncate font-medium text-slate-700">{source.title}</span>
        {source.section && <span className="block truncate text-xs text-slate-500">Section: {source.section}</span>}
      </span>
      {source.href && <ExternalLink className="size-3.5 shrink-0 text-slate-400" />}
    </>
  );

  return source.href ? (
    <a href={source.href} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-left transition-colors hover:border-indigo-200 hover:bg-indigo-50/50">
      {content}
    </a>
  ) : (
    <div className="mt-3 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-left">
      {content}
    </div>
  );
}
