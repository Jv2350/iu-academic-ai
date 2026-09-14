export type DocumentChunk = {
  id: string;
  documentId: string;
  content: string;
  similarity: number;
  metadata: Record<string, unknown>;
};

export type SourceCitation = {
  title: string;
  section?: string;
  href?: string;
  type: "academic_document" | "student_record";
};

export interface DocumentRetriever {
  search(query: string, limit?: number): Promise<DocumentChunk[]>;
}
