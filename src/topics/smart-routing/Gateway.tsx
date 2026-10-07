import { Laptop, Network } from "iconoir-react";
import { FlowCanvas, FlowNode, Positioned, Wire } from "../../components/Flow";
import { Chip } from "../../components/Chip";

const VIEW = { width: 1200, height: 420 };

const PROVIDERS = ["Anthropic", "OpenAI", "Google", "+ dezenas"];
const providerAt = (i: number) => ({ x: 980, y: 60 + i * 100 });

export function Gateway() {
  return (
    <div className="flex w-full flex-col gap-8">
      <p className="max-w-[40ch] font-display text-[clamp(1.15rem,2vw,2rem)] font-bold leading-tight">
        Um <span className="text-brand">gateway</span>: uma API única para centenas de modelos, de dezenas de
        provedores.
      </p>
      <FlowCanvas
        view={VIEW}
        wires={
          <>
            <Wire d="M 190 210 L 440 210" />
            {PROVIDERS.map((name, i) => {
              const at = providerAt(i);
              return <Wire key={name} d={`M 560 210 C 700 210, 740 ${at.y}, ${at.x - 130} ${at.y}`} />;
            })}
          </>
        }
      >
        <Positioned view={VIEW} at={{ x: 130, y: 210 }}>
          <FlowNode label="Seu app" Icon={Laptop} tone="idle" />
        </Positioned>
        <Positioned view={VIEW} at={{ x: 500, y: 210 }}>
          <FlowNode label="OpenRouter" Icon={Network} tone="safe" />
        </Positioned>
        {PROVIDERS.map((name, i) => (
          <Positioned key={name} view={VIEW} at={providerAt(i)} anchor="center">
            <Chip name={name} state="idle" />
          </Positioned>
        ))}
      </FlowCanvas>
    </div>
  );
}
