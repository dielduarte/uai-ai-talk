import { describe, expect, it } from "vitest";
import { buildSlides, type Topic } from "./slides";

const topics: Topic[] = [
  { id: "a", title: "Topic A" },
  { id: "b", title: "Topic B" },
];

describe("buildSlides", () => {
  const slides = buildSlides(topics);

  it("opens with the Maestrio intro", () => {
    expect(slides[0]).toMatchObject({ kind: "intro", title: "O que é o Maestrio?" });
  });

  it("gives every topic a section slide and closes it with when to use", () => {
    expect(slides.slice(1).map((s) => (s.kind === "intro" ? s.kind : `${s.topic.id}:${s.kind}`))).toEqual([
      "a:section",
      "a:when",
      "b:section",
      "b:when",
    ]);
  });

  it("numbers topics from 1", () => {
    expect(slides.filter((s) => s.kind === "section").map((s) => s.number)).toEqual([1, 2]);
  });

  it("gives every slide a unique id", () => {
    expect(new Set(slides.map((s) => s.id)).size).toBe(slides.length);
  });
});
