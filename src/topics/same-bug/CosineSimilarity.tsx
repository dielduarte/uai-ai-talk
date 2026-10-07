import { motion } from "motion/react";
import type { StepProps } from "../../slides";
import { TOY_EMBEDDINGS, cosineSimilarity } from "./examples";

const SIZE = 400;
// Extra width on the right so arrow labels fit beside the tips.
const VIEW_WIDTH = 580;
const PADDING = 40;
const toPx = (v: number) => PADDING + v * (SIZE - PADDING * 2);
const ORIGIN = { x: toPx(0), y: toPx(1) };
const ARC_RADIUS = 110;

type Embedding = (typeof TOY_EMBEDDINGS)[number];

const [existing, query, other] = TOY_EMBEDDINGS;
const RANKING = [existing, other]
  .map((candidate) => ({ text: candidate.text, score: cosineSimilarity(query.vector, candidate.vector) }))
  .sort((a, b) => b.score - a.score);

const tip = ({ vector: [x, y] }: Embedding) => ({ x: toPx(x), y: toPx(1 - y) });

function pointOnArc({ vector: [x, y] }: Embedding) {
  const angle = Math.atan2(y, x);
  return { x: ORIGIN.x + ARC_RADIUS * Math.cos(angle), y: ORIGIN.y - ARC_RADIUS * Math.sin(angle) };
}

const ARC_FROM = pointOnArc(existing);
const ARC_TO = pointOnArc(query);
const ARC = `M ${ARC_FROM.x} ${ARC_FROM.y} A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 0 ${ARC_TO.x} ${ARC_TO.y}`;

// Label placement per arrow so the two close Safari arrows don't overlap.
const LABEL_OFFSET: Record<string, { dx: number; dy: number; anchor: "start" | "end" }> = {
  [existing.text]: { dx: 16, dy: 8, anchor: "start" },
  [query.text]: { dx: 16, dy: 8, anchor: "start" },
  [other.text]: { dx: 16, dy: 6, anchor: "start" },
};

function Arrow({ embedding, color, labelColor }: { embedding: Embedding; color: string; labelColor: string }) {
  const end = tip(embedding);
  const label = LABEL_OFFSET[embedding.text];
  return (
    <g>
      <line x1={ORIGIN.x} y1={ORIGIN.y} x2={end.x} y2={end.y} stroke={color} strokeWidth={3} />
      <circle cx={end.x} cy={end.y} r={8} fill={color} />
      <text
        x={end.x + label.dx}
        y={end.y + label.dy}
        textAnchor={label.anchor}
        fill={labelColor}
        fontSize={20}
        fontFamily="DM Mono, monospace"
      >
        {embedding.short}
      </text>
    </g>
  );
}

export function CosineSimilarity({ step }: StepProps) {
  const searched = step >= 1;

  return (
    <div className="grid w-full max-w-6xl grid-cols-[auto_1fr] items-center gap-10">
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${SIZE}`}
        className="h-[min(52vh,32rem)] overflow-visible"
        style={{ aspectRatio: `${VIEW_WIDTH} / ${SIZE}` }}
      >
        <Arrow embedding={existing} color="var(--fg-secondary)" labelColor="var(--fg-fg1)" />
        <Arrow embedding={other} color="var(--fg-secondary)" labelColor="var(--fg-fg1)" />
        <motion.g initial={false} animate={{ opacity: searched ? 1 : 0 }} transition={{ duration: 0.4 }}>
          <Arrow embedding={query} color="var(--fg-brand)" labelColor="var(--fg-brand)" />
          <path d={ARC} fill="none" stroke="var(--fg-brand)" strokeWidth={3} />
        </motion.g>
      </svg>

      <div className="flex flex-col gap-6">
        <motion.div
          initial={false}
          animate={{ opacity: searched ? 1 : 0, y: searched ? 0 : 12 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-1"
        >
          <span className="font-mono text-sm uppercase tracking-widest text-fg-muted">novo</span>
          <span className="text-[clamp(1.1rem,1.6vw,1.5rem)] text-brand">{query.text}</span>
        </motion.div>
        <motion.ol
          initial={false}
          animate={{ opacity: searched ? 1 : 0 }}
          transition={{ duration: 0.35, delay: searched ? 0.4 : 0 }}
          className="flex flex-col gap-3 border-t border-muted-border pt-6"
        >
          {RANKING.map(({ text, score }, i) => {
            const match = i === 0;
            return (
              <li key={text} className="flex items-baseline justify-between gap-6">
                <span className={match ? "text-fg1" : "text-fg-secondary"}>{text}</span>
                <span className={`font-mono text-[clamp(1.1rem,1.6vw,1.5rem)] ${match ? "text-brand" : "text-fg-secondary"}`}>
                  {score.toFixed(2)}
                </span>
              </li>
            );
          })}
        </motion.ol>
      </div>
    </div>
  );
}
