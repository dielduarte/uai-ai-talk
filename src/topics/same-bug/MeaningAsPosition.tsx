import { TOY_EMBEDDINGS } from "./examples";

const SIZE = 400;
const PADDING = 40;
const toPx = (v: number) => PADDING + v * (SIZE - PADDING * 2);

export function MeaningAsPosition() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-[1fr_auto_auto] items-center gap-12">
      <ol className="flex flex-col gap-5">
        {TOY_EMBEDDINGS.map(({ text, vector }, i) => (
          <li key={text} className="flex items-baseline gap-5">
            <span className="font-mono text-brand">{i + 1}</span>
            <div className="flex flex-col gap-1">
              <span className="text-[clamp(1.1rem,1.6vw,1.5rem)]">{text}</span>
              <code className="font-mono text-fg-secondary">[{vector.map((v) => v.toFixed(2)).join(", ")}]</code>
            </div>
          </li>
        ))}
      </ol>
      <div className="flex flex-col items-center gap-2 font-mono text-sm text-fg-secondary">
        <span>modelo que gera vetores de 2 dimensões</span>
        <span className="text-3xl text-brand">→</span>
      </div>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-[min(40vh,26rem)] overflow-visible">
        <rect x={PADDING} y={PADDING} width={SIZE - PADDING * 2} height={SIZE - PADDING * 2} fill="none" stroke="var(--border-muted)" />
        {TOY_EMBEDDINGS.map(({ text, vector: [x, y] }, i) => (
          <g key={text}>
            <circle cx={toPx(x)} cy={toPx(1 - y)} r={10} fill="var(--fg-brand)" />
            <text x={toPx(x) + 18} y={toPx(1 - y) + 7} fill="var(--fg-fg1)" fontSize={22} fontFamily="DM Mono, monospace">
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
