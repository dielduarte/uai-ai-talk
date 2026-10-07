import type { Topic } from "../../slides";
import { EvalIngredients } from "./EvalIngredients";
import { EvalRun } from "./EvalRun";
import { NotDeterministic } from "./NotDeterministic";
import { OtherTools } from "./OtherTools";
import {
  AllTogether,
  DatasetStep,
  EachExampleStep,
  HarnessStep,
  JudgeStep,
  ThresholdStep,
  VitestEvalsIntro,
} from "./VitestEvals";
import { WhenToEval } from "./WhenToEval";

export const evals: Topic = {
  id: "evals",
  title: "Evals",
  slides: [
    { id: "not-deterministic", title: "LLMs não são determinísticos como funções puras", Body: NotDeterministic },
    { id: "eval-ingredients", title: "Como um eval funciona", Body: EvalIngredients },
    { id: "vitest-evals", title: "vitest-evals", Body: VitestEvalsIntro },
    { id: "vitest-dataset", title: "Dataset", Body: DatasetStep },
    { id: "vitest-harness", title: "Harness", Body: HarnessStep },
    { id: "vitest-judge", title: "Judges", Body: JudgeStep },
    { id: "vitest-each-example", title: "Testes", Body: EachExampleStep },
    { id: "vitest-threshold", title: "judgeThreshold", Body: ThresholdStep },
    { id: "vitest-all-together", centered: true, Body: AllTogether },
    { id: "vitest-run", centered: true, Body: EvalRun },
    { id: "other-tools", title: "Outras opções", Body: OtherTools },
  ],
  whenToUse: { Body: WhenToEval },
};
