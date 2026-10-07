import { describe, expect, it } from "vitest";
import { buildSlides, type Topic } from "./slides";

const topics: Topic[] = [
  { id: "a", title: "Topic A", slides: [{ id: "a-1", title: "A one", steps: 2 }] },
  { id: "b", title: "Topic B", slides: [], whenToUse: { steps: 3 }, bridge: { id: "b-bridge", title: "Hook" } },
];

const describeSlide = (s: ReturnType<typeof buildSlides>[number]) =>
  s.kind === "intro" || s.kind === "outro"
    ? s.kind
    : s.kind === "section"
      ? `${s.topic.id}:section`
      : `${s.topic.id}:${s.title}`;

describe("buildSlides with parts", () => {
  const slides = buildSlides([
    {
      id: "c",
      title: "Topic C",
      parts: [
        { id: "p1", title: "Part 1", slides: [{ id: "c-1", title: "C one" }] },
        { id: "p2", title: "Part 2", slides: [] },
      ],
    },
  ]);

  it("opens each part with a divider slide, followed by its slides", () => {
    expect(slides.map((s) => (s.kind === "part" ? `part:${s.title}` : s.kind === "content" ? s.title : s.kind))).toEqual([
      "intro",
      "section",
      "part:Part 1",
      "C one",
      "part:Part 2",
      "outro",
    ]);
  });

  it("labels each content slide with the part it belongs to", () => {
    expect(slides.find((s) => s.id === "c-1")).toMatchObject({ kind: "content", part: "Part 1" });
  });
});

describe("buildSlides", () => {
  const slides = buildSlides(topics);

  it("opens with the Maestrio intro", () => {
    expect(slides[0]).toMatchObject({ kind: "intro", title: "O que é o Maestrio?" });
  });

  it("closes with a single thanks slide", () => {
    expect(slides.at(-1)).toMatchObject({ kind: "outro", title: "Obrigado" });
  });

  it("puts each topic's slides after its section slide, then when-to-use and the bridge only when defined", () => {
    expect(slides.map(describeSlide)).toEqual([
      "intro",
      "a:section",
      "a:A one",
      "b:section",
      "b:Quando usar?",
      "b:Hook",
      "outro",
    ]);
  });

  it("numbers topics from 1", () => {
    expect(slides.filter((s) => s.kind === "section").map((s) => s.number)).toEqual([1, 2]);
  });

  it("keeps each slide's animation step count, defaulting to a single step", () => {
    expect(slides.map((s) => s.steps)).toEqual([1, 1, 2, 1, 3, 1, 1]);
  });

  it("gives every slide a unique id", () => {
    expect(new Set(slides.map((s) => s.id)).size).toBe(slides.length);
  });
});
