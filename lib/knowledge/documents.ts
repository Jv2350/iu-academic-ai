import { readFile } from "node:fs/promises";
import path from "node:path";
import type { KnowledgeDocument } from "./types";

const documentFiles = [
  ["exam-guidelines", "Exam Guidelines"],
  ["examination-rules", "Examination Rules"],
  ["attendance-policy", "Attendance Policy"],
  ["library-rules", "Library Rules"],
  ["assignment-policy", "Assignment Policy"],
  ["academic-calendar", "Academic Calendar"],
] as const;

export async function loadKnowledgeDocuments(): Promise<KnowledgeDocument[]> {
  return Promise.all(
    documentFiles.map(async ([id, title]) => ({
      id,
      title,
      content: await readFile(
        path.join(process.cwd(), "knowledge", `${id}.md`),
        "utf8",
      ),
      href: `/knowledge/${id}`,
    })),
  );
}
