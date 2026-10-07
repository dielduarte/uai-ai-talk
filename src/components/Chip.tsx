import { Check, Xmark } from "iconoir-react";

export type ChipState = "idle" | "dim" | "failed" | "served";

const STYLE: Record<ChipState, string> = {
  idle: "border-muted-border text-fg1",
  dim: "border-muted-border text-fg-muted",
  failed: "border-orange-border bg-sev-high-10 text-sev-high",
  served: "border-brand-border bg-brand-10 text-brand",
};

export function Chip({ name, state, delay = 0 }: { name: string; state: ChipState; delay?: number }) {
  return (
    <div
      className={`flex w-56 items-center justify-between gap-3 rounded-xl border bg-muted-bg px-5 py-3 font-mono transition-colors duration-300 ${STYLE[state]}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {name}
      {state === "failed" && <Xmark className="size-5" />}
      {state === "served" && <Check className="size-5" />}
    </div>
  );
}
