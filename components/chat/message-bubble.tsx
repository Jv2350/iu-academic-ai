export function MessageBubble({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  return (
    <div
      className={`rounded-lg p-3 text-sm ${
        role === "user"
          ? "ml-8 bg-primary text-primary-foreground"
          : "mr-8 bg-muted"
      }`}
    >
      {content}
    </div>
  );
}