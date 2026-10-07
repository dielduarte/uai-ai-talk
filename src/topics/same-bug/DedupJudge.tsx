import { CodeBlock } from "../../components/CodeBlock";

// Prompt trimmed from maestrio.ai packages/llm/src/tasks/dedup-judge.ts.
// The answer is illustrative for the same-area pair on the previous slide.
export function DedupJudge() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-[3fr_2fr] items-start gap-4">
      <CodeBlock
        dense
        label="prompt"
        emphasize={["isSame=true", "isSame=false"]}
        code={`You are deciding whether two product feedback
submissions describe the SAME underlying issue.

Existing request: {title, description}
New request: {title, description}

Rules:
- Return isSame=true ONLY if both report the same
  underlying problem, even if worded differently.
- Return isSame=false if they touch the same area but
  describe different specific issues.`}
      />
      <CodeBlock
        dense
        label="resposta"
        code={`{
  "isSame": false,
  "reason": "Login ≠ logout."
}`}
      />
    </div>
  );
}
