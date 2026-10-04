export type Slide = {
  id: string;
  title: string;
};

export const slides: Slide[] = [
  { id: "prompt-injection", title: "Prompt injection" },
  { id: "evals", title: "Evals" },
  { id: "same-bug-twice", title: "Como evitar resolver o mesmo bug duas vezes" },
  { id: "redundancy", title: "Como a gente garante redundância" },
  { id: "chat-sdk", title: "Chat SDK" },
];
