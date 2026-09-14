import { getLlmProvider } from "./provider";
import { ACADEMIC_ASSISTANT_SYSTEM_PROMPT } from "./system-prompt";

export async function generateStudyResponse(
  action: "explain" | "summarize",
  topic: string,
  level?: string,
) {
  const provider = getLlmProvider();
  return provider.generateText({
    messages: [
      {
        role: "system",
        content: `${ACADEMIC_ASSISTANT_SYSTEM_PROMPT}

This is a study request. Do not invent university-specific facts. Clearly label general subject knowledge as explanatory content.`,
      },
      {
        role: "user",
        content:
          action === "explain"
            ? `Explain "${topic}" at the ${level || "simple"} level.`
            : `Summarize "${topic}" into concise study notes.`,
      },
    ],
  });
}
