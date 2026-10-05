import { AnimatePresence, motion } from "motion/react";
import { Check, Xmark } from "iconoir-react";
import type { ComponentType, ReactNode } from "react";

export type Tone = "idle" | "dim" | "safe" | "danger";

const NODE_TONE: Record<Tone, string> = {
  idle: "border-muted-border bg-muted-bg text-fg-secondary",
  dim: "border-muted-border bg-muted-bg text-fg-secondary",
  safe: "border-brand-border bg-brand-10 text-brand",
  danger: "border-orange-border bg-sev-high-10 text-sev-high",
};

export const STROKE: Record<"safe" | "danger", string> = {
  safe: "var(--fg-brand)",
  danger: "var(--fg-sev-high)",
};

type FlowNodeProps = {
  label: string;
  detail?: ReactNode;
  Icon: ComponentType<{ className?: string }>;
  tone: Tone;
  delay?: number;
  mark?: "check" | "cross";
  shake?: boolean;
};

export function FlowNode({ label, detail, Icon, tone, delay = 0, mark, shake = false }: FlowNodeProps) {
  return (
    <div className="flex w-52 shrink-0 flex-col items-center gap-3 text-center">
      <motion.div
        initial={{ opacity: 0.35 }}
        animate={{ opacity: tone === "dim" ? 0.35 : 1, x: shake ? [0, -6, 6, -4, 4, 0] : 0 }}
        transition={{ duration: 0.4, delay }}
        className={`relative flex size-20 items-center justify-center rounded-2xl border transition-colors ${NODE_TONE[tone]}`}
        style={{ transitionDelay: `${delay}s` }}
      >
        <Icon className="size-9" />
        {mark && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.3, type: "tween", duration: 0.2 }}
            className={`absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full text-level1 ${
              mark === "cross" ? "bg-sev-high" : "bg-brand"
            }`}
          >
            {mark === "cross" ? <Xmark className="size-5" /> : <Check className="size-5" />}
          </motion.span>
        )}
      </motion.div>
      <span className="font-display text-xl font-bold">{label}</span>
      {detail && <span className="font-mono text-sm text-fg-secondary">{detail}</span>}
    </div>
  );
}

export function FlowInput({ input, danger, id }: { input: string | null; danger: boolean; id: number }) {
  return (
    <div className="h-20">
      <AnimatePresence mode="wait">
        {input && (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className={`inline-flex items-center gap-4 rounded-xl border px-6 py-4 text-[clamp(1rem,1.6vw,1.5rem)] ${
              danger ? "border-orange-border bg-sev-high-10 text-sev-high" : "border-brand-border bg-brand-10 text-fg1"
            }`}
          >
            <span className="font-mono text-sm uppercase tracking-widest opacity-70">input</span>
            {input}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
