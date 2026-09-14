export type KnowledgeDocument = {
  id: string;
  title: string;
  content: string;
  href: string;
};

export type KnowledgeChunk = {
  id: string;
  documentId: string;
  title: string;
  section: string;
  content: string;
  href: string;
  score: number;
};
