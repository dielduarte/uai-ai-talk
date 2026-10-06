const TOOLS = [
  { name: "vitest-evals", details: ["testes no Vitest, roda local ou no CI", "só o estado atual, sem histórico"] },
  { name: "Braintrust", details: ["SaaS", "self-host só no plano Enterprise", "histórico de cada execução"] },
  { name: "Langfuse", details: ["SaaS", "open source (MIT), self-host gratuito", "histórico de cada execução"] },
];

export function OtherTools() {
  return (
    <ul className="grid w-full max-w-6xl grid-cols-3 gap-x-12">
      {TOOLS.map(({ name, details }) => (
        <li key={name} className="flex flex-col gap-2">
          <span className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold">{name}</span>
          <ul className="flex list-disc flex-col gap-1 pl-6 text-[clamp(1rem,1.5vw,1.4rem)] text-fg-secondary marker:text-brand">
            {details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
