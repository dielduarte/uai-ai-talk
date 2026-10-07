import { Brain, ChatLines, Github, MessageText, Wrench } from "iconoir-react";
import type { ReactNode } from "react";
import { FlowCanvas, FlowInput, FlowNode, Positioned, STROKE, Wire, type Tone } from "../../components/Flow";
import type { StepProps } from "../../slides";

// Mirrors maestrio.ai packages/chat-bot: onNewMention → classifyIntent (llama-3.1-8b)
// → question answered with openrouter/auto, or a fix handed to the coding agent.
const VIEW = { width: 1200, height: 460 };

type NodeId = "mention" | "bot" | "classify" | "answer" | "fix";
type EdgeId = "toBot" | "toClassify" | "toAnswer" | "toFix";

const NODES: Record<NodeId, { x: number; y: number }> = {
  mention: { x: 100, y: 200 },
  bot: { x: 380, y: 200 },
  classify: { x: 680, y: 200 },
  answer: { x: 1060, y: 70 },
  fix: { x: 1060, y: 350 },
};

const EDGES: Record<EdgeId, string> = {
  toBot: "M 160 200 L 320 200",
  toClassify: "M 440 200 L 620 200",
  toAnswer: "M 740 200 C 860 200, 900 70, 1000 70",
  toFix: "M 740 200 C 860 200, 900 350, 1000 350",
};

type Run = { intent: "question" | "fix"; message: string };

// Messages are illustrative.
const RUNS: Record<number, Run> = {
  1: { intent: "question", message: "@maestrio por que você mudou esse arquivo?" },
  2: { intent: "fix", message: "@maestrio renomeia essa variável pra userId" },
};

const ROUTES: Record<Run["intent"], EdgeId[]> = {
  question: ["toBot", "toClassify", "toAnswer"],
  fix: ["toBot", "toClassify", "toFix"],
};

const EDGE_TARGET: Record<EdgeId, NodeId> = {
  toBot: "bot",
  toClassify: "classify",
  toAnswer: "answer",
  toFix: "fix",
};

const HOP_SECONDS = 0.5;

export function BotFlow({ step }: StepProps) {
  const run = RUNS[step] ?? null;
  const route = run ? ROUTES[run.intent] : [];
  const arrival = new Map<NodeId, number>(route.map((edge, i) => [EDGE_TARGET[edge], (i + 1) * HOP_SECONDS]));
  if (run) arrival.set("mention", 0);

  const tone = (id: NodeId): Tone => (run === null ? "idle" : arrival.has(id) ? "safe" : "dim");
  const delay = (id: NodeId) => arrival.get(id) ?? 0;

  const classifyDetail: ReactNode = run ? (
    <span className="text-brand">intent: "{run.intent}"</span>
  ) : (
    "question ou fix?"
  );

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <FlowInput input={run?.message ?? null} danger={false} id={step} />
      <FlowCanvas
        key={step}
        view={VIEW}
        wires={(Object.keys(EDGES) as EdgeId[]).map((edge) => (
          <Wire
            key={edge}
            d={EDGES[edge]}
            color={STROKE.safe}
            lit={route.includes(edge)}
            delay={route.indexOf(edge) * HOP_SECONDS}
          />
        ))}
      >
        <Positioned view={VIEW} at={NODES.mention}>
          <FlowNode label="Menção no PR" Icon={Github} tone={tone("mention")} />
        </Positioned>
        <Positioned view={VIEW} at={NODES.bot}>
          <FlowNode label="Chat SDK" detail="onNewMention" Icon={ChatLines} tone={tone("bot")} delay={delay("bot")} />
        </Positioned>
        <Positioned view={VIEW} at={NODES.classify}>
          <FlowNode label="Classifica" detail={classifyDetail} Icon={Brain} tone={tone("classify")} delay={delay("classify")} />
        </Positioned>
        <Positioned view={VIEW} at={NODES.answer}>
          <FlowNode
            label="Responde na thread"
            detail="openrouter/auto"
            Icon={MessageText}
            tone={tone("answer")}
            delay={delay("answer")}
            mark={run?.intent === "question" ? "check" : undefined}
          />
        </Positioned>
        <Positioned view={VIEW} at={NODES.fix}>
          <FlowNode
            label="Agente corrige o PR"
            detail="coding agent"
            Icon={Wrench}
            tone={tone("fix")}
            delay={delay("fix")}
            mark={run?.intent === "fix" ? "check" : undefined}
          />
        </Positioned>
      </FlowCanvas>
    </div>
  );
}
