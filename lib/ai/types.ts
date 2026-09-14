export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type GenerateTextInput = {
  messages: ChatMessage[];
  context?: string;
};

export interface LlmProvider {
  generateText(input: GenerateTextInput): Promise<string>;
}
