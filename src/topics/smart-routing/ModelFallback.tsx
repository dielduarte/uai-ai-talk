import { CodeBlock } from "../../components/CodeBlock";

// Request shape from OpenRouter's model fallbacks docs.
export function ModelFallback() {
  return (
    <CodeBlock
      label="se o primeiro modelo falhar, tenta o próximo"
      emphasize={['"models"']}
      code={`await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: { Authorization: \`Bearer \${apiKey}\` },
  body: JSON.stringify({
    "models": [
      "anthropic/claude-haiku-4.5",
      "google/gemini-2.5-flash",
      "deepseek/deepseek-chat-v3-0324",
    ],
    messages,
  }),
});`}
    />
  );
}
