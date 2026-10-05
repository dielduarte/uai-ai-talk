import { Typewriter } from "../../components/Typewriter";
import type { StepProps } from "../../slides";
import { ATTACK, SAFE_REPORT } from "./examples";

const SYSTEM = "Você é um agente de código. Corrija o bug descrito pelo usuário.";

function Role({ children }: { children: string }) {
  return <span className="w-28 shrink-0 font-mono text-sm uppercase tracking-widest text-fg-muted">{children}</span>;
}

export function EverythingIsText({ step }: StepProps) {
  return (
    <div className="flex max-w-5xl flex-col gap-5 rounded-xl border border-muted-border bg-muted-bg p-8 text-[clamp(1.1rem,1.8vw,1.75rem)]">
      <div className="flex items-baseline gap-6">
        <Role>system</Role>
        <span>{SYSTEM}</span>
      </div>
      <div className="border-t border-dashed border-muted-border" />
      <div className="flex items-baseline gap-6">
        <Role>usuário</Role>
        <span>
          {SAFE_REPORT}{" "}
          {step >= 1 && (
            <span className="text-sev-high">
              <Typewriter text={ATTACK} />
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
