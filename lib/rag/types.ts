export type DocumentChunk = {
  id: string;
  documentId: string;
  content: string;
  similarity: number;
  metadata: Record<string, unknown>;
};

export interface DocumentRetriever {
  search(query: string, limit?: number): Promise<DocumentChunk[]>;
}
