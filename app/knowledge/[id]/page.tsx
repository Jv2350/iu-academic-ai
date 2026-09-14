import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

const allowedDocuments = new Set([
  "exam-guidelines",
  "examination-rules",
  "attendance-policy",
  "library-rules",
  "assignment-policy",
  "academic-calendar",
]);

export default async function KnowledgeDocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!allowedDocuments.has(id)) notFound();

  const content = await readFile(
    path.join(process.cwd(), "knowledge", `${id}.md`),
    "utf8",
  );

  return (
    <main className="mx-auto w-full max-w-3xl p-5 sm:p-10">
      <Link href="/chat" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900">
        <ArrowLeft className="size-4" /> Back to Academic Copilot
      </Link>
      <article className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex items-center gap-3 text-indigo-600">
          <BookOpen className="size-5" />
          <span className="text-xs font-semibold uppercase tracking-widest">Academic knowledge base</span>
        </div>
        <div className="mt-7 space-y-4 text-sm leading-7 text-slate-600">
          {content.split(/\r?\n/).map((line, index) =>
            line.startsWith("# ") ? (
              <h1 key={index} className="text-3xl font-semibold tracking-tight text-slate-950">{line.slice(2)}</h1>
            ) : line.startsWith("* ") ? (
              <li key={index} className="ml-5 list-disc">{line.slice(2)}</li>
            ) : line ? (
              <p key={index}>{line}</p>
            ) : null,
          )}
        </div>
      </article>
    </main>
  );
}
