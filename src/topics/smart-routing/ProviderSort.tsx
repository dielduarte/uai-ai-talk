import { CodeBlock } from "../../components/CodeBlock";

// Options from OpenRouter's provider routing docs (provider.sort and the :floor/:nitro shortcuts).
const OPTIONS = [
  { sort: '"price"', meaning: "o provedor mais barato primeiro", shortcut: ":floor" },
  { sort: '"throughput"', meaning: "mais tokens por segundo", shortcut: ":nitro" },
  { sort: '"latency"', meaning: "a primeira resposta mais rápida", shortcut: null },
];

export function ProviderSort() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-[3fr_2fr] items-start gap-6">
      <ul className="flex flex-col divide-y divide-muted-border rounded-xl border border-muted-border bg-muted-bg">
        <li className="grid grid-cols-[11rem_1fr_auto] gap-6 px-6 py-3 font-mono text-sm uppercase tracking-widest text-fg-muted">
          <span>sort</span>
          <span>otimiza</span>
          <span>atalho</span>
        </li>
        {OPTIONS.map(({ sort, meaning, shortcut }) => (
          <li key={sort} className="grid grid-cols-[11rem_1fr_auto] items-baseline gap-6 px-6 py-5 text-[clamp(1rem,1.4vw,1.3rem)]">
            <span className="font-mono text-brand">{sort}</span>
            <span>{meaning}</span>
            <span className="font-mono text-fg-secondary">{shortcut ?? "-"}</span>
          </li>
        ))}
      </ul>
      <CodeBlock
        dense
        emphasize={['"latency"']}
        code={`{
  model: "meta-llama/llama-3.1-8b-instruct",
  provider: {
    sort: "latency",
  },
  messages,
}`}
      />
    </div>
  );
}
