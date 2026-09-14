export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
  sources?: import("@/lib/rag/types").SourceCitation[];
};

export type ChatResponse = {
  message: string;
  sources: import("@/lib/rag/types").SourceCitation[];
  intent: string;
  sessionId?: string;
};

export type GenerateTextInput = {
  messages: ChatMessage[];
  context?: string;
};

export interface LlmProvider {
  generateText(input: GenerateTextInput): Promise<string>;
}
