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

export type View = { width: number; height: number };
export type Point = { x: number; y: number };

const WIRE_SECONDS = 0.5;

export function Wire({ d, color, lit = true, delay = 0 }: { d: string; color?: string; lit?: boolean; delay?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke="var(--border-muted)" strokeWidth={2} />
      {color && (
        <motion.path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: lit ? 1 : 0 }}
          transition={{ duration: WIRE_SECONDS, delay, ease: "easeInOut" }}
        />
      )}
    </>
  );
}

// Children are placed in the same coordinate space as the SVG wires, so the
// wires stay attached to the HTML nodes at any slide size.
export function FlowCanvas({ view, wires, children }: { view: View; wires: ReactNode; children: ReactNode }) {
  return (
    <div className="relative w-full max-w-5xl" style={{ aspectRatio: `${view.width} / ${view.height}` }}>
      <svg viewBox={`0 0 ${view.width} ${view.height}`} className="absolute inset-0 size-full overflow-visible">
        {wires}
      </svg>
      {children}
    </div>
  );
}

const ANCHOR = {
  center: "-translate-y-1/2",
  // Half the FlowNode icon box (size-20), so the icon sits on the point.
  icon: "-translate-y-10",
};

export function Positioned({
  at,
  view,
  anchor = "icon",
  children,
}: {
  at: Point;
  view: View;
  anchor?: keyof typeof ANCHOR;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute -translate-x-1/2 ${ANCHOR[anchor]}`}
      style={{ left: `${(at.x / view.width) * 100}%`, top: `${(at.y / view.height) * 100}%` }}
    >
      {children}
    </div>
  );
}
