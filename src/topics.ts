import { buildSlides, type Topic } from "./slides";
import { evals } from "./topics/evals";
import { promptInjection } from "./topics/prompt-injection";
import { sameBug } from "./topics/same-bug";

const topics: Topic[] = [
  promptInjection,
  evals,
  sameBug,
  { id: "redundancy", title: "Como a gente garante redundância", slides: [] },
  { id: "chat-sdk", title: "Chat SDK", slides: [] },
];

export const slides = buildSlides(topics);
