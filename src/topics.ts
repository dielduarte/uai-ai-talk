import { buildSlides, type Topic } from "./slides";
import { evals } from "./topics/evals";
import { promptInjection } from "./topics/prompt-injection";
import { sameBug } from "./topics/same-bug";
import { agnostic } from "./topics/agnostic";

const topics: Topic[] = [
  promptInjection,
  evals,
  sameBug,
  agnostic,
];

export const slides = buildSlides(topics);
