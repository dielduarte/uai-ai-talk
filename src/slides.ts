import type { ComponentType } from "react";

export type StepProps = { step: number };

// A titled slide always shows the topic eyebrow; only untitled slides may be centered.
export type TopicSlide = {
  id: string;
  steps?: number;
  Body?: ComponentType<StepProps>;
} & ({ title: string; centered?: never } | { title?: never; centered?: boolean });

export type Part = {
  id: string;
  title: string;
  slides: TopicSlide[];
};

// A topic is either a flat list of slides or a sequence of parts, never both.
export type Topic = {
  id: string;
  title: string;
  whenToUse?: Pick<TopicSlide, "steps" | "Body">;
  bridge?: TopicSlide;
} & ({ slides: TopicSlide[]; parts?: never } | { parts: Part[]; slides?: never });

export type Slide =
  | { kind: "intro"; id: string; title: string; steps: number }
  | { kind: "outro"; id: string; title: string; steps: number }
  | { kind: "section"; id: string; topic: Topic; number: number; steps: number }
  | { kind: "part"; id: string; topic: Topic; number: number; title: string; steps: number }
  | {
      kind: "content";
      id: string;
      topic: Topic;
      number: number;
      part?: string;
      title?: string;
      centered: boolean;
      steps: number;
      Body?: ComponentType<StepProps>;
    };

export function buildSlides(topics: Topic[]): Slide[] {
  return [
    { kind: "intro", id: "intro", title: "O que é o Maestrio?", steps: 1 },
    ...topics.flatMap((topic, i): Slide[] => {
      const number = i + 1;
      const toContent =
        (part?: string) =>
        ({ steps = 1, centered = false, ...slide }: TopicSlide): Slide => ({
          kind: "content",
          topic,
          number,
          steps,
          centered,
          ...(part ? { part } : {}),
          ...slide,
        });
      const body: Slide[] = topic.parts
        ? topic.parts.flatMap((part): Slide[] => [
            { kind: "part", id: part.id, topic, number, title: part.title, steps: 1 },
            ...part.slides.map(toContent(part.title)),
          ])
        : topic.slides.map(toContent());
      const closing: TopicSlide[] = topic.whenToUse
        ? [{ id: `${topic.id}-when`, title: "Quando usar?", ...topic.whenToUse }]
        : [];
      return [
        { kind: "section", id: topic.id, topic, number, steps: 1 },
        ...body,
        ...[...closing, ...(topic.bridge ? [topic.bridge] : [])].map(toContent()),
      ];
    }),
    { kind: "outro", id: "outro", title: "Obrigado", steps: 1 },
  ];
}
