import OpenAI from "openai";
import type { GenerateTextInput, LlmProvider } from "./types";

const DEFAULT_BASE_URL = "https://router.huggingface.co/v1";
const DEFAULT_MODEL = "openai/gpt-oss-120b";

export class HuggingFaceProvider implements LlmProvider {
  private readonly client: OpenAI;

  constructor(
    private readonly apiKey: string,
    private readonly model: string = DEFAULT_MODEL,
    private readonly baseUrl: string = DEFAULT_BASE_URL,
  ) {
    this.client = new OpenAI({
      apiKey: this.apiKey,
      baseURL: this.baseUrl,
    });
  }

  async generateText({ messages, context }: GenerateTextInput) {
    const systemInstruction = `
You are IU Academic AI, a domain-specific academic assistant for students.

Your primary purpose is to help students with academic and university-related questions.

You can help with:
- Examinations
- Examination guidelines
- Timetables
- Attendance
- Assignments
- Syllabus
- Academic calendar
- University notices
- Academic events
- Library information
- Academic policies
- Study assistance
- Exam preparation
- Academic subject explanations

IMPORTANT RULES:

1. You are NOT a general-purpose chatbot.

2. For university-specific information, only use information provided
   by the application's academic data or knowledge base.

3. Never invent:
   - Exam dates
   - Exam venues
   - Assignment deadlines
   - Attendance policies
   - Faculty information
   - University notices
   - University events
   - Student records

4. If university-specific information is not available, say:
   "I couldn't find reliable information about that in the available
   academic data."

5. You may explain general academic concepts such as:
   - Cybersecurity
   - Networking
   - Database systems
   - Programming
   - Digital forensics
   - Cloud computing
   - Other academic subjects

6. For questions unrelated to academics or university activities,
   politely explain that you are focused on academic assistance.

7. Keep answers clear, concise, student-friendly and professional.

${
  context
    ? `

ACADEMIC KNOWLEDGE CONTEXT:

${context}

Use this context when relevant. Do not invent information that is
not supported by the context.`
    : ""
}
`;

    const requestMessages = [
      {
        role: "system" as const,
        content: systemInstruction,
      },
      ...messages.filter((message) => message.role !== "system"),
    ];

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: requestMessages,
    });

    const content = response.choices[0]?.message?.content;

    if (typeof content !== "string" || !content.trim()) {
      throw new Error("Hugging Face response did not contain text");
    }

    return content;
  }
}

export function getLlmProvider(): LlmProvider {
  const apiKey = process.env.HF_TOKEN;
  const model = process.env.LLM_MODEL || DEFAULT_MODEL;
  const baseUrl = process.env.LLM_BASE_URL || DEFAULT_BASE_URL;

  if (!apiKey) {
    throw new Error("Missing HF_TOKEN");
  }

  return new HuggingFaceProvider(apiKey, model, baseUrl);
}
