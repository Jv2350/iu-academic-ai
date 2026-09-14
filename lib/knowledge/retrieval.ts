import { chunkDocument } from "./chunker";
import { loadKnowledgeDocuments } from "./documents";
import type { KnowledgeChunk } from "./types";

const stopWords = new Set(["about", "what", "when", "where", "with", "this", "that", "from", "your", "have"]);

function terms(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 2 && !stopWords.has(term));
}

export async function searchKnowledge(
  query: string,
  limit = 3,
): Promise<KnowledgeChunk[]> {
  const documents = await loadKnowledgeDocuments();
  const queryTerms = new Set(terms(query));
  if (queryTerms.size === 0) return [];

  return documents
    .flatMap((document) => chunkDocument(document))
    .map((chunk) => {
      const contentTerms = new Set(terms(`${chunk.section} ${chunk.content}`));
      const matches = [...queryTerms].filter((term) => contentTerms.has(term)).length;
      return { ...chunk, score: matches / queryTerms.size };
    })
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function formatKnowledgeContext(chunks: KnowledgeChunk[]) {
  return chunks
    .map((chunk) => `[${chunk.title} — ${chunk.section}]\n${chunk.content}`)
    .join("\n\n");
}
