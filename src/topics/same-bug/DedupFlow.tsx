import { Brain, Cube, Database, Link, MessageText, Plus } from "iconoir-react";
import type { ReactNode } from "react";
import { FlowCanvas, FlowInput, FlowNode, Positioned, STROKE, Wire, type Tone } from "../../components/Flow";
import type { StepProps } from "../../slides";
import { LOGOUT_BUG, SAFARI_NEW, SIMILARITY_THRESHOLD } from "./examples";

// Mirrors maestrio.ai: dedup worker embeds the request, applyDedupResult finds the
// nearest one in pgvector, and the dedup judge only runs above the threshold.
const VIEW = { width: 1200, height: 460 };

type NodeId = "request" | "embed" | "search" | "judge" | "linked" | "fresh";
type EdgeId = "toEmbed" | "toSearch" | "toJudge" | "toLinked" | "judgeToFresh" | "searchToFresh";

const NODES: Record<NodeId, { x: number; y: number }> = {
  request: { x: 90, y: 200 },
  embed: { x: 320, y: 200 },
  search: { x: 550, y: 200 },
  judge: { x: 800, y: 200 },
  linked: { x: 1090, y: 70 },
  fresh: { x: 1090, y: 350 },
};

const EDGES: Record<EdgeId, string> = {
  toEmbed: "M 150 200 L 260 200",
  toSearch: "M 380 200 L 490 200",
  toJudge: "M 610 200 L 740 200",
  toLinked: "M 860 200 C 960 200, 980 70, 1030 70",
  judgeToFresh: "M 860 200 C 960 200, 980 350, 1030 350",
  searchToFresh: "M 600 240 C 660 430, 920 430, 1030 360",
};

const EDGE_TARGET: Record<EdgeId, NodeId> = {
  toEmbed: "embed",
  toSearch: "search",
  toJudge: "judge",
  toLinked: "linked",
  judgeToFresh: "fresh",
  searchToFresh: "fresh",
};

type Run = { outcome: "linked" | "rejected" | "no_match"; title: string; similarity: number };

// Same reports and similarities as the earlier slides (illustrative values).
const RUNS: Record<number, Run> = {
  1: { outcome: "linked", title: SAFARI_NEW.title, similarity: 0.98 },
  2: { outcome: "rejected", title: LOGOUT_BUG.title, similarity: 0.94 },
  3: { outcome: "no_match", title: "Adicionar dark mode", similarity: 0.29 },
};

const ROUTES: Record<Run["outcome"], EdgeId[]> = {
  linked: ["toEmbed", "toSearch", "toJudge", "toLinked"],
  rejected: ["toEmbed", "toSearch", "toJudge", "judgeToFresh"],
  no_match: ["toEmbed", "toSearch", "searchToFresh"],
};

const HOP_SECONDS = 0.45;

export function DedupFlow({ step }: StepProps) {
  const run = RUNS[step] ?? null;
  const route = run ? ROUTES[run.outcome] : [];
  const arrival = new Map<NodeId, number>(route.map((edge, i) => [EDGE_TARGET[edge], (i + 1) * HOP_SECONDS]));
  if (run) arrival.set("request", 0);

  const tone = (id: NodeId): Tone => (run === null ? "idle" : arrival.has(id) ? "safe" : "dim");
  const delay = (id: NodeId) => arrival.get(id) ?? 0;
  const similarity = run?.similarity.toFixed(2);

  const searchDetail: ReactNode =
    run?.outcome === "no_match" ? (
      <span className="text-fg1">
        {similarity} {"<"} {SIMILARITY_THRESHOLD}
      </span>
    ) : run ? (
      <span className="text-fg1">similaridade {similarity}</span>
    ) : (
      `top 1 · ≥ ${SIMILARITY_THRESHOLD}`
    );

  const judgeDetail: ReactNode =
    run?.outcome === "rejected" ? (
      <span className="text-sev-high">isSame: false</span>
    ) : run?.outcome === "linked" ? (
      <span className="text-brand">isSame: true</span>
    ) : (
      "é o mesmo bug?"
    );

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <FlowInput input={run?.title ?? null} danger={false} id={step} />
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
        <Positioned view={VIEW} at={NODES.request}>
          <FlowNode label="Novo request" Icon={MessageText} tone={tone("request")} />
        </Positioned>
        <Positioned view={VIEW} at={NODES.embed}>
          <FlowNode label="Embedding" detail="text-embedding-3-small" Icon={Cube} tone={tone("embed")} delay={delay("embed")} />
        </Positioned>
        <Positioned view={VIEW} at={NODES.search}>
          <FlowNode label="Postgres" detail={searchDetail} Icon={Database} tone={tone("search")} delay={delay("search")} />
        </Positioned>
        <Positioned view={VIEW} at={NODES.judge}>
          <FlowNode label="LLM judge" detail={judgeDetail} Icon={Brain} tone={tone("judge")} delay={delay("judge")} />
        </Positioned>
        <Positioned view={VIEW} at={NODES.linked}>
          <FlowNode
            label="Duplicado"
            detail="linka ao original"
            Icon={Link}
            tone={tone("linked")}
            delay={delay("linked")}
            mark={run?.outcome === "linked" ? "check" : undefined}
          />
        </Positioned>
        <Positioned view={VIEW} at={NODES.fresh}>
          <FlowNode
            label="Request novo"
            detail="segue pra triage"
            Icon={Plus}
            tone={tone("fresh")}
            delay={delay("fresh")}
            mark={run && run.outcome !== "linked" ? "check" : undefined}
          />
        </Positioned>
      </FlowCanvas>
    </div>
  );
}
