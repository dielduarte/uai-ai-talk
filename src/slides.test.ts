import { describe, expect, it } from "vitest";
import { buildSlides, type Topic } from "./slides";

const topics: Topic[] = [
  { id: "a", title: "Topic A", slides: [{ id: "a-1", title: "A one", steps: 2 }] },
  { id: "b", title: "Topic B", slides: [], whenToUse: { steps: 3 }, bridge: { id: "b-bridge", title: "Hook" } },
];

const describeSlide = (s: ReturnType<typeof buildSlides>[number]) =>
  s.kind === "intro" ? "intro" : s.kind === "section" ? `${s.topic.id}:section` : `${s.topic.id}:${s.title}`;

describe("buildSlides", () => {
  const slides = buildSlides(topics);

  it("opens with the Maestrio intro", () => {
    expect(slides[0]).toMatchObject({ kind: "intro", title: "O que é o Maestrio?" });
  });

  it("puts each topic's slides between its section slide and when-to-use, then the bridge to the next topic", () => {
    expect(slides.map(describeSlide)).toEqual([
      "intro",
      "a:section",
      "a:A one",
      "a:Quando usar?",
      "b:section",
      "b:Quando usar?",
      "b:Hook",
    ]);
  });

  it("numbers topics from 1", () => {
    expect(slides.filter((s) => s.kind === "section").map((s) => s.number)).toEqual([1, 2]);
  });

  it("keeps each slide's animation step count, defaulting to a single step", () => {
    expect(slides.map((s) => s.steps)).toEqual([1, 1, 2, 1, 1, 3, 1]);
  });

  it("gives every slide a unique id", () => {
    expect(new Set(slides.map((s) => s.id)).size).toBe(slides.length);
  });
});
