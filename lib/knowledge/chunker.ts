import type { KnowledgeChunk, KnowledgeDocument } from "./types";

export function chunkDocument(
  document: KnowledgeDocument,
  maxLines = 8,
): KnowledgeChunk[] {
  const lines = document.content.split(/\r?\n/);
  const chunks: KnowledgeChunk[] = [];
  let section = document.title;
  let buffer: string[] = [];

  const flush = () => {
    const content = buffer.join("\n").trim();
    if (!content) return;
    chunks.push({
      id: `${document.id}-${chunks.length + 1}`,
      documentId: document.id,
      title: document.title,
      section,
      content,
      href: document.href,
      score: 0,
    });
    buffer = [];
  };

  for (const line of lines) {
    if (line.startsWith("#")) {
      flush();
      section = line.replace(/^#+\s*/, "").trim() || document.title;
      continue;
    }
    buffer.push(line);
    if (buffer.length >= maxLines) flush();
  }
  flush();
  return chunks;
}
