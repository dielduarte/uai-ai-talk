import { Laptop, Network } from "iconoir-react";
import { FlowCanvas, FlowInput, FlowNode, Positioned, STROKE, Wire } from "../../components/Flow";
import type { StepProps } from "../../slides";
import { Chip, type ChipState } from "../../components/Chip";

// Provider names are generic on purpose: the failure is illustrative.
const VIEW = { width: 1200, height: 440 };
const MODEL = "meta-llama/llama-3.1-8b-instruct";
const HOP = 0.5;

const PROVIDERS = ["Provedor A", "Provedor B", "Provedor C"];
const providerAt = (i: number) => ({ x: 980, y: 80 + i * 140 });
const providerWire = (i: number) => {
  const at = providerAt(i);
  return `M 560 220 C 700 220, 740 ${at.y}, ${at.x - 130} ${at.y}`;
};

export function ProviderFallback({ step }: StepProps) {
  const running = step >= 1;
  const state = (i: number): ChipState => (!running ? "idle" : i === 0 ? "failed" : i === 1 ? "served" : "dim");

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <FlowInput input={running ? `modelo: ${MODEL}` : null} danger={false} id={step} />
      <FlowCanvas
        key={step}
        view={VIEW}
        wires={
          <>
            <Wire d="M 190 220 L 440 220" color={STROKE.safe} lit={running} />
            <Wire d={providerWire(0)} color={STROKE.danger} lit={running} delay={HOP} />
            <Wire d={providerWire(1)} color={STROKE.safe} lit={running} delay={HOP * 3} />
            <Wire d={providerWire(2)} />
          </>
        }
      >
        <Positioned view={VIEW} at={{ x: 130, y: 220 }}>
          <FlowNode label="Seu app" Icon={Laptop} tone={running ? "safe" : "idle"} />
        </Positioned>
        <Positioned view={VIEW} at={{ x: 500, y: 220 }}>
          <FlowNode label="OpenRouter" Icon={Network} tone={running ? "safe" : "idle"} delay={running ? HOP : 0} />
        </Positioned>
        {PROVIDERS.map((name, i) => (
          <Positioned key={name} view={VIEW} at={providerAt(i)} anchor="center">
            <Chip name={name} state={state(i)} delay={running ? (i === 0 ? HOP * 2 : HOP * 4) : 0} />
          </Positioned>
        ))}
      </FlowCanvas>
    </div>
  );
}
