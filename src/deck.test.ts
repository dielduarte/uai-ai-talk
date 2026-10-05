import { describe, expect, it } from "vitest";
import { navigate, slideFromHash } from "./deck";

// Three slides: the middle one has three animation steps.
const steps = [1, 3, 1];

describe("navigate", () => {
  it("plays every step of a slide before moving to the next slide", () => {
    expect(navigate({ slide: 0, step: 0 }, "next", steps)).toEqual({ slide: 1, step: 0 });
    expect(navigate({ slide: 1, step: 0 }, "next", steps)).toEqual({ slide: 1, step: 1 });
    expect(navigate({ slide: 1, step: 2 }, "next", steps)).toEqual({ slide: 2, step: 0 });
  });

  it("steps back through a slide and lands on the last step of the previous slide", () => {
    expect(navigate({ slide: 1, step: 2 }, "prev", steps)).toEqual({ slide: 1, step: 1 });
    expect(navigate({ slide: 2, step: 0 }, "prev", steps)).toEqual({ slide: 1, step: 2 });
  });

  it("stays on the edges instead of wrapping", () => {
    expect(navigate({ slide: 2, step: 0 }, "next", steps)).toEqual({ slide: 2, step: 0 });
    expect(navigate({ slide: 0, step: 0 }, "prev", steps)).toEqual({ slide: 0, step: 0 });
  });

  it("jumps to the start and to the final step of the deck", () => {
    expect(navigate({ slide: 1, step: 1 }, "first", steps)).toEqual({ slide: 0, step: 0 });
    expect(navigate({ slide: 0, step: 0 }, "last", [1, 3])).toEqual({ slide: 1, step: 2 });
  });
});

describe("slideFromHash", () => {
  it("reads a 1-based slide number from the hash", () => {
    expect(slideFromHash("#3", 5)).toBe(2);
  });

  it("falls back to the first slide for missing or invalid hashes", () => {
    expect(slideFromHash("", 5)).toBe(0);
    expect(slideFromHash("#abc", 5)).toBe(0);
    expect(slideFromHash("#99", 5)).toBe(0);
  });
});
