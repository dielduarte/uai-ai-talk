import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Cpu, MessageText, ShieldCheck, Xmark } from "iconoir-react";
import { FlowInput, FlowNode, STROKE, type Tone } from "../../components/Flow";
import type { StepProps } from "../../slides";
import { runForStep } from "./examples";

// Nodes are anchored by their icon center, in the same coordinate space as the
// SVG wires, so the wires stay attached to the HTML nodes at any slide size.
const VIEW = { width: 1200, height: 420 };

const NODES = {
  input: { x: 150, y: 180 },
  guard: { x: 580, y: 180 },
  proceed: { x: 1050, y: 50 },
  block: { x: 1050, y: 310 },
};

const PATHS = {
  toGuard: "M 210 180 L 520 180",
  toProceed: "M 640 180 C 780 180, 840 50, 990 50",
  toBlock: "M 640 180 C 780 180, 840 310, 990 310",
};

const HOP_SECONDS = 0.5;

function Wire({ d, lit, color, delay }: { d: string; lit: boolean; color: string; delay: number }) {
  return (
    <>
      <path d={d} fill="none" stroke="var(--border-muted)" strokeWidth={2} />
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: lit ? 1 : 0 }}
        transition={{ duration: HOP_SECONDS, delay, ease: "easeInOut" }}
      />
    </>
  );
}

function Positioned({ at, children }: { at: { x: number; y: number }; children: ReactNode }) {
  return (
    // -translate-y-10 = half the FlowNode icon box (size-20), centering the icon on the point.
    <div
      className="absolute -translate-x-1/2 -translate-y-10"
      style={{ left: `${(at.x / VIEW.width) * 100}%`, top: `${(at.y / VIEW.height) * 100}%` }}
    >
      {children}
    </div>
  );
}

export function GuardPattern({ step }: StepProps) {
  const run = runForStep(step);
  const blocked = run?.outcome === "blocked";
  const color = blocked ? STROKE.danger : STROKE.safe;
  const runTone: Tone = blocked ? "danger" : "safe";

  const tone = (reachedInRun: boolean): Tone => (run === null ? "idle" : reachedInRun ? runTone : "dim");

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <FlowInput input={run?.input ?? null} danger={blocked} id={step} />

      <div key={step} className="relative w-full max-w-5xl" style={{ aspectRatio: `${VIEW.width} / ${VIEW.height}` }}>
        <svg viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} className="absolute inset-0 size-full overflow-visible">
          <Wire d={PATHS.toGuard} lit={run !== null} color={color} delay={0} />
          <Wire d={PATHS.toProceed} lit={run !== null && !blocked} color={color} delay={HOP_SECONDS * 2} />
          <Wire d={PATHS.toBlock} lit={blocked} color={color} delay={HOP_SECONDS * 2} />
        </svg>

        <Positioned at={NODES.input}>
          <FlowNode label="Input" Icon={MessageText} tone={tone(true)} />
        </Positioned>
        <Positioned at={NODES.guard}>
          <FlowNode
            label="LLM guard"
            detail="julga se há tentativa de prompt injection"
            Icon={ShieldCheck}
            tone={tone(true)}
            delay={HOP_SECONDS}
            shake={blocked}
          />
        </Positioned>
        <Positioned at={NODES.proceed}>
          <FlowNode
            label="Continua"
           
            Icon={Cpu}
            tone={tone(!blocked)}
            delay={HOP_SECONDS * 3}
            mark={run && !blocked ? "check" : undefined}
          />
        </Positioned>
        <Positioned at={NODES.block}>
          <FlowNode
            label="Bloqueia"
           
            Icon={Xmark}
            tone={tone(blocked)}
            delay={HOP_SECONDS * 3}
            mark={blocked ? "cross" : undefined}
          />
        </Positioned>
      </div>
    </div>
  );
}
