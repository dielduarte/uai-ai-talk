import type { ReactNode } from "react";

const RUNS = [
  { output: "fix(onboarding): corrige typo em Receive", valid: true },
  { output: "fix: typo no passo 3 do onboarding", valid: true },
  { output: "Corrigido erro de digitação.", valid: false },
];

function Card({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-muted-border bg-muted-bg p-8">
      <span className="font-mono text-sm uppercase tracking-widest text-fg-muted">{label}</span>
      {children}
    </div>
  );
}

export function NotDeterministic() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-2 gap-4 font-mono text-[clamp(0.95rem,1.3vw,1.3rem)]">
      <Card label="função">
        <code>{"expect(soma(2, 2)).toBe(4)"}</code>
        <ul className="flex flex-col gap-2 text-fg-secondary">
          {[1, 2, 3].map((run) => (
            <li key={run}>
              chamada {run} → <span className="text-brand">4</span>
            </li>
          ))}
        </ul>
      </Card>
      <Card label="LLM">
        <code>{"gerarTituloDoPR(diff)"}</code>
        <ul className="flex flex-col gap-2 text-fg-secondary">
          {RUNS.map(({ output, valid }, i) => (
            <li key={output}>
              chamada {i + 1} → <span className={valid ? "text-fg1" : "text-sev-high"}>{output}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
