const CONCEPTS = ["Embeddings", "Vector DB", "Similarity search", "LLM as a judge"];

export function Concepts() {
  return (
    <ol className="grid w-full max-w-5xl grid-cols-2 gap-x-16 gap-y-8">
      {CONCEPTS.map((concept, i) => (
        <li key={concept} className="flex items-baseline gap-6">
          <span className="font-mono text-xl text-brand">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-display text-[clamp(1.75rem,3.5vw,3.25rem)] font-bold">{concept}</span>
        </li>
      ))}
    </ol>
  );
}
