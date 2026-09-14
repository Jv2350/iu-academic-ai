"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Question = { question: string; options: string[]; answer: string; explanation: string };
const questions: Question[] = [
  { question: "Which protocol is commonly used for secure remote administration?", options: ["FTP", "SSH", "HTTP", "Telnet"], answer: "SSH", explanation: "SSH provides encrypted remote administration." },
  { question: "What does CIA commonly represent in information security?", options: ["Control, Identity, Access", "Confidentiality, Integrity, Availability", "Cyber, Internet, Authentication", "Compliance, Inspection, Auditing"], answer: "Confidentiality, Integrity, Availability", explanation: "The CIA triad describes the three core goals of information security." },
  { question: "Which attack attempts to make a service unavailable?", options: ["Phishing", "Denial of service", "Privilege escalation", "SQL injection"], answer: "Denial of service", explanation: "A denial-of-service attack overwhelms or disrupts a service." },
  { question: "Which control adds a second verification factor?", options: ["MFA", "DNS", "TLS", "NAT"], answer: "MFA", explanation: "Multi-factor authentication requires two or more independent verification factors." },
  { question: "What is the primary purpose of encryption?", options: ["Compress data", "Protect confidentiality", "Remove malware", "Increase bandwidth"], answer: "Protect confidentiality", explanation: "Encryption transforms readable data so only authorized parties can read it." },
];

const studyActions = ["Explain Topic", "Summarize", "Exam Ready", "Generate MCQs", "Flashcards"];

export function StudyMode() {
  const [topic, setTopic] = useState("Network Security");
  const [action, setAction] = useState("Explain Topic");
  const [level, setLevel] = useState("Simple Explanation");
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0), [answers]);

  function reset() {
    setStarted(false); setAnswers({}); setSubmitted(false);
  }

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="outline" className="border-indigo-200 bg-indigo-50 text-indigo-600"><Sparkles className="mr-1 size-3" /> STUDY MODE</Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">AI Study Mode</h1>
        <p className="mt-2 text-slate-500">Turn your syllabus into a personalized study assistant.</p>
      </div>
      {!started ? (
        <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
          <Card className="border-slate-200/80 shadow-sm"><CardContent className="space-y-5 p-6">
            <label className="block text-sm font-medium text-slate-700">Topic<input value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-300" placeholder="e.g. Network Security" /></label>
            <div><p className="text-sm font-medium text-slate-700">Study action</p><div className="mt-2 grid grid-cols-2 gap-2">{studyActions.map((item) => <button key={item} onClick={() => setAction(item)} className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${action === item ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{item}</button>)}</div></div>
            <div><p className="text-sm font-medium text-slate-700">Format</p><div className="mt-2 flex flex-wrap gap-2">{["Simple Explanation", "Detailed Explanation", "Exam Ready"].map((item) => <button key={item} onClick={() => setLevel(item)} className={`rounded-full border px-3 py-2 text-xs ${level === item ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600"}`}>{item}</button>)}</div></div>
            <Button onClick={() => setStarted(true)} className="w-full bg-slate-950 text-white hover:bg-slate-800">Start {action} <ChevronRight className="ml-2 size-4" /></Button>
          </CardContent></Card>
          <Card className="border-slate-200/80 bg-slate-950 text-white shadow-sm"><CardContent className="p-8"><Sparkles className="size-6 text-indigo-300" /><h2 className="mt-6 text-2xl font-semibold">Study with more intention.</h2><p className="mt-3 max-w-md leading-7 text-slate-300">Choose a topic and let Academic AI explain the essentials, summarize your material, or get you exam-ready with focused practice.</p><div className="mt-8 flex flex-wrap gap-2 text-xs text-slate-300"><span className="rounded-full bg-white/10 px-3 py-2">Personalized</span><span className="rounded-full bg-white/10 px-3 py-2">Focused</span><span className="rounded-full bg-white/10 px-3 py-2">Academic</span></div></CardContent></Card>
        </div>
      ) : action === "Generate MCQs" ? (
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-6 sm:p-8"><div className="flex items-start justify-between"><div><Badge variant="outline" className="border-indigo-200 text-indigo-600">AI EXAM PRACTICE</Badge><h2 className="mt-3 text-2xl font-semibold text-slate-950">{topic}</h2><p className="mt-1 text-sm text-slate-500">Medium difficulty · {questions.length} questions</p></div><Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="mr-2 size-4" /> New practice</Button></div><div className="mt-8 space-y-7">{questions.map((item, index) => <div key={item.question} className="border-b border-slate-100 pb-6 last:border-0"><p className="font-medium text-slate-900">{index + 1}. {item.question}</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{item.options.map((option) => <button key={option} disabled={submitted} onClick={() => setAnswers({ ...answers, [index]: option })} className={`rounded-lg border px-4 py-3 text-left text-sm ${answers[index] === option ? "border-indigo-400 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{option}{submitted && option === item.answer && <CheckCircle2 className="float-right size-4 text-emerald-600" />}</button>)}</div>{submitted && <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600"><strong>Explanation:</strong> {item.explanation}</p>}</div>)}</div>{!submitted ? <Button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < questions.length} className="mt-2 bg-slate-950 text-white hover:bg-slate-800">Submit answers</Button> : <div className="mt-4 rounded-xl bg-indigo-50 p-5"><p className="text-sm font-medium text-indigo-700">Your score</p><p className="mt-1 text-3xl font-semibold text-indigo-950">{score}/{questions.length} <span className="text-base font-normal">· {score * 20}%</span></p><p className="mt-2 text-sm text-indigo-800">{score >= 4 ? "Strong performance. Keep reviewing the explanations." : "Review the explanations and try another practice set."}</p></div>}</CardContent></Card>
      ) : <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-8"><Badge variant="outline" className="border-indigo-200 text-indigo-600">{level}</Badge><h2 className="mt-5 text-2xl font-semibold text-slate-950">{topic}</h2><p className="mt-4 max-w-2xl leading-7 text-slate-600">Your {action.toLowerCase()} session is ready. Use the Academic Copilot to generate a grounded explanation from the available academic knowledge base, then return here to practice what you learned.</p><Button onClick={reset} variant="outline" className="mt-6">Choose another study action</Button></CardContent></Card>}
    </div>
  );
}
