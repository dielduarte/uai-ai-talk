import { Cpu, MessageText, ShieldCheck, Xmark } from "iconoir-react";
import { FlowCanvas, FlowInput, FlowNode, Positioned, STROKE, Wire, type Tone } from "../../components/Flow";
import type { StepProps } from "../../slides";
import { runForStep } from "./examples";

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

export function GuardPattern({ step }: StepProps) {
  const run = runForStep(step);
  const blocked = run?.outcome === "blocked";
  const color = blocked ? STROKE.danger : STROKE.safe;
  const runTone: Tone = blocked ? "danger" : "safe";

  const tone = (reachedInRun: boolean): Tone => (run === null ? "idle" : reachedInRun ? runTone : "dim");

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <FlowInput input={run?.input ?? null} danger={blocked} id={step} />

      <FlowCanvas
        key={step}
        view={VIEW}
        wires={
          <>
            <Wire d={PATHS.toGuard} lit={run !== null} color={color} />
            <Wire d={PATHS.toProceed} lit={run !== null && !blocked} color={color} delay={HOP_SECONDS * 2} />
            <Wire d={PATHS.toBlock} lit={blocked} color={color} delay={HOP_SECONDS * 2} />
          </>
        }
      >
        <Positioned view={VIEW} at={NODES.input}>
          <FlowNode label="Input" Icon={MessageText} tone={tone(true)} />
        </Positioned>
        <Positioned view={VIEW} at={NODES.guard}>
          <FlowNode
            label="LLM guard"
            detail="julga se há tentativa de prompt injection"
            Icon={ShieldCheck}
            tone={tone(true)}
            delay={HOP_SECONDS}
            shake={blocked}
          />
        </Positioned>
        <Positioned view={VIEW} at={NODES.proceed}>
          <FlowNode
            label="Continua"
            Icon={Cpu}
            tone={tone(!blocked)}
            delay={HOP_SECONDS * 3}
            mark={run && !blocked ? "check" : undefined}
          />
        </Positioned>
        <Positioned view={VIEW} at={NODES.block}>
          <FlowNode
            label="Bloqueia"
            Icon={Xmark}
            tone={tone(blocked)}
            delay={HOP_SECONDS * 3}
            mark={blocked ? "cross" : undefined}
          />
        </Positioned>
      </FlowCanvas>
    </div>
  );
}
