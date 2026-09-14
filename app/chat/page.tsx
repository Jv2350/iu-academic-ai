import { ChatWindow } from "@/components/chat/chat-window";

export default function ChatPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-2xl font-semibold">Academic assistant</h1>
        <p className="mt-1 text-muted-foreground">
          Get help with your courses, assignments, and academic documents.
        </p>
      </div>
      <ChatWindow />
    </main>
  );
}