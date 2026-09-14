export interface EmbeddingProvider {
  embed(text: string): Promise<number[]>;
}

export class OpenAiEmbeddingProvider implements EmbeddingProvider {
  constructor(
    private readonly apiKey: string,
    private readonly model = "text-embedding-3-small",
    private readonly baseUrl = "https://api.openai.com/v1",
  ) {}

  async embed(text: string) {
    const response = await fetch(`${this.baseUrl.replace(/\/$/, "")}/embeddings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: this.model, input: text }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Embedding request failed with status ${response.status}`);
    }

    const payload: unknown = await response.json();
    const embedding = (payload as {
      data?: Array<{ embedding?: unknown }>;
    }).data?.[0]?.embedding;

    if (
      !Array.isArray(embedding) ||
      !embedding.every((value) => typeof value === "number")
    ) {
      throw new Error("Embedding response did not contain a vector");
    }

    return embedding;
  }
}
