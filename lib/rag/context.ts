import type { DocumentRetriever } from "./types";

export async function retrieveContext(
  retriever: DocumentRetriever,
  query: string,
) {
  const chunks = await retriever.search(query);
  return chunks
    .map((chunk) => `[${chunk.documentId}]\n${chunk.content}`)
    .join("\n\n");
}
