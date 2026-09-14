import type { GenerateTextInput, LlmProvider } from "./types";

const DEFAULT_BASE_URL = "https://api.openai.com/v1";

export class OpenAiCompatibleProvider implements LlmProvider {
  constructor(
    private readonly apiKey: string,
    private readonly model: string,
    private readonly baseUrl = DEFAULT_BASE_URL,
  ) {}

  async generateText({ messages, context }: GenerateTextInput) {
    const requestMessages = context
      ? [
          {
            role: "system" as const,
            content: `Use the following academic document context when it is relevant. If it does not answer the question, say so.\n\n${context}`,
          },
          ...messages,
        ]
      : messages;

    const response = await fetch(`${this.baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        messages: requestMessages,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`LLM request failed with status ${response.status}`);
    }

    const payload: unknown = await response.json();
    const content = (payload as {
      choices?: Array<{ message?: { content?: unknown } }>;
    }).choices?.[0]?.message?.content;

    if (typeof content !== "string" || !content.trim()) {
      throw new Error("LLM response did not contain text");
    }

    return content;
  }
}

export function getLlmProvider(): LlmProvider {
  const apiKey = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL;

  if (!apiKey || !model) {
    throw new Error("Missing LLM_API_KEY or LLM_MODEL");
  }

  return new OpenAiCompatibleProvider(
    apiKey,
    model,
    process.env.LLM_BASE_URL || DEFAULT_BASE_URL,
  );
}
