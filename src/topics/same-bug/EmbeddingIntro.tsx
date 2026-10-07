import { motion } from "motion/react";
import type { StepProps } from "../../slides";
import { SAFARI_EXISTING } from "./examples";

// Illustrative values: a real text-embedding-3-small vector has 1536 of these.
const SAMPLE = [0.021, -0.113, 0.087, 0.004, -0.062, 0.145, -0.019, 0.071];
const DIMENSIONS = 1536;

export function EmbeddingIntro({ step }: StepProps) {
  const embedded = step >= 1;

  return (
    <div className="flex w-full max-w-6xl items-center gap-8">
      <div className="flex-1 rounded-xl border border-muted-border bg-muted-bg p-8 text-[clamp(1.1rem,1.8vw,1.6rem)]">
        {SAFARI_EXISTING.title}
      </div>
      <div className="flex flex-col items-center gap-2 font-mono text-sm text-fg-secondary">
        <span>text-embedding-3-small</span>
        <span className="text-3xl text-brand">→</span>
      </div>
      <div className="flex-1 rounded-xl border border-brand-border bg-muted-bg p-8 font-mono text-[clamp(1rem,1.5vw,1.4rem)]">
        <span className="text-fg-secondary">[</span>
        {SAMPLE.map((value, i) => (
          <motion.span
            key={i}
            initial={false}
            animate={{ opacity: embedded ? 1 : 0 }}
            transition={{ delay: embedded ? i * 0.08 : 0, duration: 0.2 }}
            className="text-brand"
          >
            {value.toFixed(3)},{" "}
          </motion.span>
        ))}
        <motion.span
          initial={false}
          animate={{ opacity: embedded ? 1 : 0 }}
          transition={{ delay: embedded ? SAMPLE.length * 0.08 : 0 }}
          className="text-fg-secondary"
        >
          … ]
          <span className="mt-4 block text-sm uppercase tracking-widest text-fg-muted">{DIMENSIONS} números</span>
        </motion.span>
      </div>
    </div>
  );
}
