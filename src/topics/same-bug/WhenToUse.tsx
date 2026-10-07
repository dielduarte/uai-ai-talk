const CONCEPTS = [
  { name: "Embeddings", use: "transformar qualquer tipo de dado em um vetor, pra comparar depois" },
  { name: "Vector DB", use: "persistir esses vetores, otimizado pra buscas por proximidade" },
  { name: "Similarity search", use: "o algoritmo que encontra os vetores mais parecidos" },
  { name: "LLM as a judge", use: "decidir a nuance que um número ou algo mais determinístico não captura, no produto ou nos seus evals" },
];

export function WhenToUse() {
  return (
    <ul className="grid w-full max-w-7xl grid-cols-[auto_1fr] gap-x-10 gap-y-6">
      {CONCEPTS.map(({ name, use }) => (
        <li key={name} className="col-span-2 grid grid-cols-subgrid items-baseline">
          <span className="whitespace-nowrap font-display text-[clamp(1.4rem,2.4vw,2.25rem)] font-bold text-brand">{name}</span>
          <span className="text-[clamp(1.1rem,1.7vw,1.6rem)] text-fg-secondary">{use}</span>
        </li>
      ))}
    </ul>
  );
}
