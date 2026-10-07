import { AnimatePresence, motion } from "motion/react";
import type { StepProps } from "../../slides";

const MODELS = [
  { provider: "anthropic", id: '"claude-haiku-4-5"' },
  { provider: "google", id: '"gemini-2.5-flash"' },
  { provider: "openrouter", id: '"meta-llama/llama-3.1-8b-instruct"' },
];

export const SWAP_PROVIDER_STEPS = MODELS.length;

const Str = ({ children }: { children: string }) => <span className="text-brand">{children}</span>;

export function SwapProvider({ step }: StepProps) {
  const active = MODELS[step];

  return (
    <div className="grid w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-6">
      <pre className="overflow-hidden rounded-xl border border-muted-border bg-muted-bg px-8 py-6 font-mono text-[clamp(0.85rem,1.2vw,1.25rem)] leading-normal text-fg1">
        <div>
          import {"{ generateText }"} from <Str>"ai"</Str>;
        </div>
        <div className="min-h-[1lh]" />
        <div>const {"{ text }"} = await generateText({"{"}</div>
        <div className="flex">
          <span className="whitespace-pre">{"  model: "}</span>
          <span className="inline-flex overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={active.provider}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-brand"
              >
                {active.provider}({active.id})
              </motion.span>
            </AnimatePresence>
          </span>
          ,
        </div>
        <div>
          {"  prompt: "}
          <Str>"seu prompt aqui"</Str>,
        </div>
        <div>{"});"}</div>
      </pre>
      <ul className="flex flex-col gap-3 whitespace-nowrap font-mono text-[clamp(0.8rem,1.1vw,1.1rem)]">
        {MODELS.map(({ provider, id }, i) => (
          <li
            key={provider}
            className={`transition-colors duration-300 ${i === step ? "text-brand" : "text-fg-muted"}`}
          >
            model: {provider}({id})
          </li>
        ))}
      </ul>
    </div>
  );
}
