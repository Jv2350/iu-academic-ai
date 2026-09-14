import type { SupabaseClient } from "@supabase/supabase-js";
import type { EmbeddingProvider } from "./embedding";
import type { DocumentChunk, DocumentRetriever } from "./types";

type SearchRow = {
  id: string;
  document_id: string;
  content: string;
  similarity: number;
  metadata: Record<string, unknown> | null;
};

export class SupabaseDocumentRetriever implements DocumentRetriever {
  constructor(
    private readonly client: SupabaseClient,
    private readonly embeddings: EmbeddingProvider,
  ) {}

  async search(query: string, limit = 5) {
    const queryEmbedding = await this.embeddings.embed(query);
    const { data, error } = await this.client.rpc("match_document_chunks", {
      query_embedding: queryEmbedding,
      match_count: limit,
    });

    if (error) {
      throw new Error(`Document search failed: ${error.message}`);
    }

    return ((data ?? []) as SearchRow[]).map(
      ({ id, document_id, content, similarity, metadata }) => ({
        id,
        documentId: document_id,
        content,
        similarity,
        metadata: metadata ?? {},
      }),
    ) satisfies DocumentChunk[];
  }
}
