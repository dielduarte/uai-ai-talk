export type Topic = {
  id: string;
  title: string;
};

export type Slide =
  | { kind: "intro"; id: string; title: string }
  | { kind: "section"; id: string; topic: Topic; number: number }
  | { kind: "when"; id: string; topic: Topic; number: number };

export const topics: Topic[] = [
  { id: "prompt-injection", title: "Prompt injection" },
  { id: "evals", title: "Evals" },
  { id: "same-bug-twice", title: "Como evitar resolver o mesmo bug duas vezes" },
  { id: "redundancy", title: "Como a gente garante redundância" },
  { id: "chat-sdk", title: "Chat SDK" },
];

export function buildSlides(topics: Topic[]): Slide[] {
  return [
    { kind: "intro", id: "intro", title: "O que é o Maestrio?" },
    ...topics.flatMap((topic, i): Slide[] => [
      { kind: "section", id: topic.id, topic, number: i + 1 },
      { kind: "when", id: `${topic.id}-when`, topic, number: i + 1 },
    ]),
  ];
}

export const slides = buildSlides(topics);
