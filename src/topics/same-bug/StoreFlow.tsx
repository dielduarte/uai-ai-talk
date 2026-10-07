import { motion } from "motion/react";
import { Cube, Database, MessageText, Server } from "iconoir-react";
import { FlowCanvas, FlowInput, FlowNode, Positioned, STROKE, Wire, type Tone } from "../../components/Flow";
import type { StepProps } from "../../slides";
import { SAFARI_EXISTING } from "./examples";

// The path follows maestrio.ai: dashboard → dedup worker (apps/workers/src/dedup.ts)
// → OpenRouter embeddings → callback that saves requests.embedding.
const VIEW = { width: 1200, height: 240 };

const NODES = [
  { id: "request", label: "Novo request", detail: "título + descrição", Icon: MessageText, at: { x: 110, y: 80 } },
  { id: "worker", label: "Worker de dedup", detail: "Cloudflare Worker", Icon: Server, at: { x: 430, y: 80 } },
  { id: "model", label: "Embedding", detail: "text-embedding-3-small", Icon: Cube, at: { x: 750, y: 80 } },
  { id: "db", label: "Postgres", detail: "requests.embedding", Icon: Database, at: { x: 1070, y: 80 } },
] as const;

const HOP_SECONDS = 0.5;
const VECTOR_PREVIEW = "[0.021, -0.113, 0.087, …]";

export function StoreFlow({ step }: StepProps) {
  const running = step >= 1;
  const tone: Tone = running ? "safe" : "idle";
  const stored = NODES.length * HOP_SECONDS;

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <FlowInput input={running ? SAFARI_EXISTING.title : null} danger={false} id={step} />

      <FlowCanvas
        key={step}
        view={VIEW}
        wires={NODES.slice(1).map(({ id, at }, i) => {
          const from = NODES[i].at;
          return (
            <Wire
              key={id}
              d={`M ${from.x + 60} ${from.y} L ${at.x - 60} ${at.y}`}
              color={STROKE.safe}
              lit={running}
              delay={i * HOP_SECONDS}
            />
          );
        })}
      >
        {NODES.map(({ id, label, detail, Icon, at }, i) => (
          <Positioned key={id} view={VIEW} at={at}>
            <FlowNode
              label={label}
              detail={detail}
              Icon={Icon}
              tone={tone}
              delay={running ? i * HOP_SECONDS : 0}
              mark={running && id === "db" ? "check" : undefined}
            />
          </Positioned>
        ))}
      </FlowCanvas>

      <motion.table
        initial={false}
        animate={{ opacity: running ? 1 : 0, y: running ? 0 : 12 }}
        transition={{ delay: running ? stored : 0, duration: 0.35 }}
        className="w-full max-w-5xl border-separate border-spacing-0 overflow-hidden rounded-xl border border-muted-border bg-muted-bg font-mono text-[clamp(0.85rem,1.2vw,1.15rem)]"
      >
        <thead>
          <tr className="text-left text-sm uppercase tracking-widest text-fg-muted">
            <th className="border-b border-muted-border px-6 py-3 font-normal">id</th>
            <th className="border-b border-muted-border px-6 py-3 font-normal">title</th>
            <th className="border-b border-muted-border px-6 py-3 font-normal">embedding</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 text-fg-secondary">req_42</td>
            <td className="px-6 py-4">{SAFARI_EXISTING.title}</td>
            <td className="px-6 py-4 text-brand">{VECTOR_PREVIEW}</td>
          </tr>
        </tbody>
      </motion.table>
    </div>
  );
}
