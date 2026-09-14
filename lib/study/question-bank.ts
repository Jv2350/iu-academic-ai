export type PracticeQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

const networkSecurity: PracticeQuestion[] = [
  {
    question: "Which protocol is commonly used for secure remote administration?",
    options: ["FTP", "SSH", "HTTP", "Telnet"],
    answer: "SSH",
    explanation: "SSH provides encrypted remote administration.",
  },
  {
    question: "What does CIA commonly represent in information security?",
    options: [
      "Control, Identity, Access",
      "Confidentiality, Integrity, Availability",
      "Cyber, Internet, Authentication",
      "Compliance, Inspection, Auditing",
    ],
    answer: "Confidentiality, Integrity, Availability",
    explanation: "The CIA triad describes the three core goals of information security.",
  },
  {
    question: "Which attack attempts to make a service unavailable?",
    options: ["Phishing", "Denial of service", "Privilege escalation", "SQL injection"],
    answer: "Denial of service",
    explanation: "A denial-of-service attack overwhelms or disrupts a service.",
  },
];

export function getPracticeQuestions(subject: string, count: number) {
  const source = subject.toLowerCase().includes("network")
    ? networkSecurity
    : networkSecurity;
  return source.slice(0, count);
}
