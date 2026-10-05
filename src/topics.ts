import { buildSlides, type Topic } from "./slides";
import { promptInjection } from "./topics/prompt-injection";

const topics: Topic[] = [
  promptInjection,
  { id: "evals", title: "Evals", slides: [] },
  { id: "same-bug-twice", title: "Como evitar resolver o mesmo bug duas vezes", slides: [] },
  { id: "redundancy", title: "Como a gente garante redundância", slides: [] },
  { id: "chat-sdk", title: "Chat SDK", slides: [] },
];

export const slides = buildSlides(topics);
