import type { ComponentType } from "react";

export type StepProps = { step: number };

export type TopicSlide = {
  id: string;
  title?: string;
  steps?: number;
  Body?: ComponentType<StepProps>;
};

export type Topic = {
  id: string;
  title: string;
  slides: TopicSlide[];
  whenToUse?: Omit<TopicSlide, "id" | "title">;
  bridge?: TopicSlide;
};

export type Slide =
  | { kind: "intro"; id: string; title: string; steps: number }
  | { kind: "section"; id: string; topic: Topic; number: number; steps: number }
  | {
      kind: "content";
      id: string;
      topic: Topic;
      number: number;
      title?: string;
      steps: number;
      Body?: ComponentType<StepProps>;
    };

export function buildSlides(topics: Topic[]): Slide[] {
  return [
    { kind: "intro", id: "intro", title: "O que é o Maestrio?", steps: 1 },
    ...topics.flatMap((topic, i): Slide[] => {
      const number = i + 1;
      const closing: TopicSlide = { id: `${topic.id}-when`, title: "Quando usar?", ...topic.whenToUse };
      return [
        { kind: "section", id: topic.id, topic, number, steps: 1 },
        ...[...topic.slides, closing, ...(topic.bridge ? [topic.bridge] : [])].map(
          ({ steps = 1, ...slide }): Slide => ({ kind: "content", topic, number, steps, ...slide }),
        ),
      ];
    }),
  ];
}
