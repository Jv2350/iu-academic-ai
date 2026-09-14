"use client";

import { useState } from "react";
import { ChatInput } from "./chat-input";
import { MessageBubble } from "./message-bubble";
import type { ChatMessage } from "@/lib/ai/types";

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(content: string) {
    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const payload = (await response.json()) as {
        answer?: string;
        error?: string;
      };
      if (!response.ok || !payload.answer) {
        throw new Error(payload.error || "The assistant could not respond.");
      }
      setMessages([...nextMessages, { role: "assistant", content: payload.answer }]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The assistant could not respond.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <div className="flex min-h-80 flex-col gap-3 rounded-lg border p-4">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Ask a question to get started.
          </p>
        ) : (
          messages.map((message, index) => (
            <MessageBubble
              key={`${message.role}-${index}`}
              role={message.role === "user" ? "user" : "assistant"}
              content={message.content}
            />
          ))
        )}
        {loading && <p className="text-sm text-muted-foreground">Thinking...</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <ChatInput disabled={loading} onSubmit={sendMessage} />
    </section>
  );
}