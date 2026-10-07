export function WhatIsLlmJudge() {
  return (
    <div className="flex max-w-[40ch] flex-col gap-6 font-display text-[clamp(1.15rem,2vw,2rem)] font-bold leading-tight">
      <p>
        Usar um LLM pra <span className="text-brand">avaliar ou decidir</span> sobre um resultado, com critérios escritos
        em linguagem natural.
      </p>
      <p className="text-fg-secondary">Entra onde um número ou uma regra fixa não captura a nuance.</p>
    </div>
  );
}
