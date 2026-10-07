import { CodeBlock } from "../../components/CodeBlock";

// Shape of the call in maestrio.ai packages/chat-bot/src/handlers/mention.ts, with a placeholder prompt.
export function AutoRouter() {
  return (
    <div className="flex w-full max-w-5xl flex-col gap-8">
      <p className="max-w-[40ch] font-display text-[clamp(1.15rem,2vw,2rem)] font-bold leading-tight">
        Classifica o prompt em um tipo de tarefa e <span className="text-brand">escolhe o modelo</span> mais otimizado
        pra essa tarefa.
      </p>
      <CodeBlock
        code={`const { text } = await generateText({
  model: openrouter("openrouter/auto"),
  prompt: "seu prompt aqui",
});`}
      />
    </div>
  );
}
