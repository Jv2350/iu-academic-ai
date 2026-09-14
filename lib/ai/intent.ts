export const intents = [
  "exam",
  "timetable",
  "attendance",
  "assignment",
  "notice",
  "event",
  "library",
  "syllabus",
  "academic_policy",
  "study_help",
  "general_academic",
  "unsupported",
] as const;

export type AcademicIntent = (typeof intents)[number];

const rules: Array<{ intent: AcademicIntent; terms: string[] }> = [
  { intent: "exam", terms: ["exam", "examination", "test", "assessment", "hall ticket", "venue"] },
  { intent: "timetable", terms: ["timetable", "schedule", "class", "lecture", "next class"] },
  { intent: "attendance", terms: ["attendance", "absent", "presence", "attended"] },
  { intent: "assignment", terms: ["assignment", "coursework", "submission", "deadline", "due"] },
  { intent: "notice", terms: ["notice", "announcement", "latest update", "circular"] },
  { intent: "event", terms: ["event", "workshop", "seminar", "club", "calendar"] },
  { intent: "library", terms: ["library", "book", "journal", "catalogue", "catalog"] },
  { intent: "syllabus", terms: ["syllabus", "module", "course content", "curriculum"] },
  { intent: "academic_policy", terms: ["policy", "guideline", "regulation", "rules", "procedure"] },
  { intent: "study_help", terms: ["explain", "study", "revise", "prepare", "sql injection", "help me understand"] },
];

export function classifyIntent(message: string): AcademicIntent {
  const normalized = message.toLowerCase();
  for (const rule of rules) {
    if (rule.terms.some((term) => normalized.includes(term))) return rule.intent;
  }
  if (/\b(academic|university|course|student|semester|grade|learn)\b/.test(normalized)) {
    return "general_academic";
  }
  return "unsupported";
}
