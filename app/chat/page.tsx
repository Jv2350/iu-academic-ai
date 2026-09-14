import { ChatWindow } from "@/components/chat/chat-window";
import { Badge } from "@/components/ui/badge";

export default async function ChatPage({ searchParams }: { searchParams: Promise<{ prompt?: string }> }) {
  const { prompt } = await searchParams;
  return (
    <main className="flex flex-1 flex-col gap-8 p-5 sm:p-8">
      <div className="mx-auto w-full max-w-4xl">
        <Badge variant="outline" className="border-indigo-200 bg-indigo-50 text-indigo-600">ACADEMIC COPILOT</Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">AI Assistant</h1>
        <p className="mt-2 text-slate-500">Ask about your academic information, or use Study Mode to turn your material into a plan.</p>
      </div>
      <ChatWindow initialPrompt={prompt} />
    </main>
  );
}