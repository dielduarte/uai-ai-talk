import { CodeBlock } from "../../components/CodeBlock";

// The schema is maestrio.ai's intent classifier (packages/chat-bot/src/classify.ts),
// written with the current Output.object API instead of the older generateObject.
export function StructuredOutput() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-[3fr_2fr] items-center gap-6">
      <CodeBlock
        emphasize={["Output.object"]}
        code={`import { generateText, Output } from "ai";
import { z } from "zod";

const { output } = await generateText({
  model,
  output: Output.object({
    schema: z.object({
      intent: z.enum(["question", "fix"]),
    }),
  }),
  prompt: userMessage,
});`}
      />
      <CodeBlock
        label="output (tipado)"
        code={`{ intent: "fix" }`}
      />
    </div>
  );
}
